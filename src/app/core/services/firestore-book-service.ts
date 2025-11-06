import { Injectable } from '@angular/core';
import {
  CreateAppointmentResult,
  Service,
  Slot,
  Stylist,
  TIME_GRID_MINUTES,
  TimeRange,
} from '@core/models/book-types';

import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { from, map, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreBookService {
  private readonly db: Firestore = getFirestore();

  private weekdayOf(dateLocal: Date): 0 | 1 | 2 | 3 | 4 | 5 | 6 {
    return dateLocal.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
  private buildStartsFromAvailability(
    dateLocal: Date,
    windows: TimeRange[],
    durationMins: number
  ): Date[] {
    const results: Date[] = [];

    for (const w of windows) {
      const [sH, sM] = w.start.split(':').map(Number);
      const [eH, eM] = w.end.split(':').map(Number);
      const windowStartMin = sH * 60 + sM;
      const windowEndMin = eH * 60 + eM;

      const latestStartMin = windowEndMin - durationMins;
      if (latestStartMin < windowStartMin) continue;

      for (let m = windowStartMin; m <= latestStartMin; m += TIME_GRID_MINUTES) {
        const start = new Date(
          dateLocal.getFullYear(),
          dateLocal.getMonth(),
          dateLocal.getDate(),
          Math.floor(m / 60),
          m % 60,
          0,
          0
        );
        results.push(start);
      }
    }
    return results;
  }

  getServices$(): Observable<Service[]> {
    const colRef = collection(this.db, 'services');

    return from(getDocs(colRef)).pipe(
      map((snap) =>
        snap.docs.map((doc) => {
          const data = doc.data() as Omit<Service, 'id'>;
          return { id: doc.id, ...data };
        })
      )
    );
  }

  getActiveStylists$(): Observable<Stylist[]> {
    const colRef = collection(this.db, 'stylists');
    const q = query(colRef, where('active', '==', true));

    return from(getDocs(q)).pipe(
      map((snap) =>
        snap.docs.map((doc) => {
          const data = doc.data() as Omit<Stylist, 'id'>;
          return { id: doc.id, ...data };
        })
      )
    );
  }

  getAvailabilityForStylist$(
    serviceId: string,
    dateLocal: Date,
    stylistId: string
  ): Observable<Slot[]> {
    const dayStart = new Date(
      dateLocal.getFullYear(),
      dateLocal.getMonth(),
      dateLocal.getDate(),
      0,
      0,
      0,
      0
    );
    const dayEnd = new Date(
      dateLocal.getFullYear(),
      dateLocal.getMonth(),
      dateLocal.getDate(),
      23,
      59,
      59,
      999
    );

    const serviceRef = doc(this.db, 'services', serviceId);
    const stylistRef = doc(this.db, 'stylists', stylistId);

    return from(Promise.all([getDoc(serviceRef), getDoc(stylistRef)])).pipe(
      map(([svcSnap, stySnap]) => {
        if (!svcSnap.exists()) throw new Error('Service not found');
        if (!stySnap.exists()) throw new Error('Stylist not found');

        const Service = { id: svcSnap.id, ...(svcSnap.data() as Omit<Service, 'id'>) };
        const Stylist = { id: stySnap.id, ...(stySnap.data() as Omit<Stylist, 'id'>) };

        //build candidate starts from stylist windows
        const weekday = this.weekdayOf(dateLocal);
        const windows =
          Stylist.weeklyAvailability?.[
            String(weekday) as keyof typeof Stylist.weeklyAvailability
          ] ?? [];
        const candidates = this.buildStartsFromAvailability(
          dateLocal,
          windows,
          Service.durationMins
        );

        return { Service, candidates };
      }),
      switchMap(({ Service, candidates }) => {
        const apptsRef = collection(this.db, 'appointments');
        const qAppts = query(
          apptsRef,
          where('stylistId', '==', stylistId),
          where('status', '==', 'confirmed'),
          where('startTime', '>=', Timestamp.fromDate(dayStart)),
          where('startTime', '<', Timestamp.fromDate(dayEnd))
        );
        return from(getDocs(qAppts)).pipe(
          map((snap) => {
            const conflicts = snap.docs.map((doc) => {
              const a = doc.data() as { startTime: Timestamp; endTime: Timestamp };
              return { start: a.startTime.toDate(), end: a.endTime.toDate() };
            });

            //filter out candidates that overlap any existing appt
            const slots: Slot[] = [];
            for (const start of candidates) {
              const end = new Date(start.getTime() + Service.durationMins * 60_000);
              const overlaps = conflicts.some((c) => start < c.end && end > c.start);
              if (!overlaps) slots.push({ start, stylistId });
            }
            return slots;
          })
        );
      })
    );
  }

  createAppointment$(input: {
    serviceId: string;
    stylistId: string;
    start: Date; // local Date you picked in Step 2
    clientId?: string;
    contact?: { name: string; email?: string; phone?: string };
  }): Observable<CreateAppointmentResult> {
    // 1) Read the service to get durationMins (avoid trusting client)
    const svcRef = doc(this.db, 'services', input.serviceId);

    return from(getDoc(svcRef)).pipe(
      switchMap((svcSnap) => {
        if (!svcSnap.exists()) {
          return throwError(() => new Error('Service not found'));
        }
        const { durationMins } = svcSnap.data() as { durationMins: number };
        if (typeof durationMins !== 'number' || durationMins <= 0) {
          return throwError(() => new Error('Invalid service duration'));
        }

        // 2) Compute end time (local)
        const end = new Date(input.start.getTime() + durationMins * 60_000);

        // Day bounds (local) for the query
        const dayStart = new Date(
          input.start.getFullYear(),
          input.start.getMonth(),
          input.start.getDate(),
          0,
          0,
          0,
          0
        );
        const dayEnd = new Date(
          input.start.getFullYear(),
          input.start.getMonth(),
          input.start.getDate(),
          23,
          59,
          59,
          999
        );

        // 3) Re-check conflicts just before write
        const apptsRef = collection(this.db, 'appointments');
        const qAppts = query(
          apptsRef,
          where('stylistId', '==', input.stylistId),
          where('status', '==', 'confirmed'),
          where('startTime', '>=', Timestamp.fromDate(dayStart)),
          where('startTime', '<', Timestamp.fromDate(dayEnd))
        );

        return from(getDocs(qAppts)).pipe(
          switchMap((snap) => {
            const overlaps = snap.docs.some((d) => {
              const a = d.data() as { startTime: Timestamp; endTime: Timestamp };
              const aStart = a.startTime.toDate();
              const aEnd = a.endTime.toDate();
              return input.start < aEnd && end > aStart;
            });
            if (overlaps) {
              return throwError(
                () => new Error('That time was just taken. Please pick another slot.')
              );
            }

            // 4) Write the appointment
            return from(
              addDoc(apptsRef, {
                serviceId: input.serviceId,
                stylistId: input.stylistId,
                status: 'confirmed',
                startTime: Timestamp.fromDate(input.start),
                endTime: Timestamp.fromDate(end),
                createdAt: Timestamp.now(),
                ...(input.clientId ? { clientId: input.clientId } : {}),
                ...(input.contact ? { guest: input.contact } : {}),
              })
            ).pipe(map((ref) => ({ appointmentId: ref.id })));
          })
        );
      })
    );
  }
}
