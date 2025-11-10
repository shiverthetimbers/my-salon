import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { PublicBook } from '../public-book';
import { FirestoreBookService } from '@core/services/firestore-book-service';
import { ContactInfo, Service, Slot, Stylist } from '@core/models/book-types';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-confirm-step',
  imports: [
    MatCardModule,
    DatePipe,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterLink,
    MatSnackBarModule,
    MatStepperModule,
  ],
  templateUrl: './confirm-step.html',
  styleUrl: './confirm-step.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmStep implements OnDestroy {
  private readonly bookParent = inject(PublicBook);
  private readonly data = inject(FirestoreBookService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly snack = inject(MatSnackBar);
  private subs = new Subscription();

  private latestServices: Service[] = [];
  private latestStylists: Stylist[] = [];

  serviceNameSig = signal<string | null>(null);
  stylistNameSig = signal<string | null>(null);
  timeSlotSig = signal<Slot | null>(null);
  contactInfoSig = signal<ContactInfo | null>(null);

  ngOnInit() {
    this.subs.add(
      this.bookParent.services$.subscribe((arr) => {
        this.latestServices = arr ?? [];
        const id = this.bookParent.firstFormGroup.get('service')?.value as string | null;
        const name = id ? this.latestServices.find((s) => s.id === id)?.name ?? null : null;
        this.serviceNameSig.set(name);
        this.changeDetector.markForCheck();
      })
    );
    this.subs.add(
      this.bookParent.firstFormGroup
        .get('service')!
        .valueChanges.pipe(distinctUntilChanged())
        .subscribe((id: string | null) => {
          const name = id ? this.latestServices.find((s) => s.id === id)?.name ?? null : null;
          this.serviceNameSig.set(name);
          this.changeDetector.markForCheck();
        })
    );
    this.subs.add(
      this.bookParent.stylists$.subscribe((arr) => {
        this.latestStylists = arr ?? [];
        const id = this.timeSlotSig()?.stylistId ?? null;
        const name = id ? this.latestStylists.find((s) => s.id === id)?.name ?? null : null;
        this.stylistNameSig.set(name);
        this.changeDetector.markForCheck();
      })
    );

    const timeCtrl = this.bookParent.secondFormGroup.get('time')!;
    this.timeSlotSig.set(timeCtrl.value ?? null);

    this.subs.add(
      timeCtrl.valueChanges.subscribe((val: Slot | null) => {
        this.timeSlotSig.set(val ?? null);
        const id = val?.stylistId ?? null;
        const name = id ? this.latestStylists.find((s) => s.id === id)?.name ?? null : null;
        this.stylistNameSig.set(name);
        this.changeDetector.markForCheck();
      })
    );

    const contactForm = this.bookParent.thirdFormGroup;
    this.contactInfoSig.set(contactForm.getRawValue() as ContactInfo);

    this.subs.add(
      contactForm.valueChanges
        .pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
        .subscribe((v) => {
          this.contactInfoSig.set(v as ContactInfo);
          this.changeDetector.markForCheck();
        })
    );
  }

  status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  errorMsg = signal<string>('');
  confirmationId = signal<string>('');

  canConfirm(): boolean {
    const hasService = !!this.bookParent.firstFormGroup.get('service')?.value;
    const hasTime = !!this.timeSlotSig();
    const contactOk = this.bookParent.thirdFormGroup.valid;
    return hasService && hasTime && contactOk;
  }

  confirm(): void {
    const svcId = this.bookParent.firstFormGroup.get('service')?.value as string | null;
    const slot = this.timeSlotSig();
    const contact = this.contactInfoSig();

    if (!svcId || !slot) return;

    if (this.bookParent.thirdFormGroup.invalid) {
      this.bookParent.thirdFormGroup.markAllAsTouched();
      return;
    }

    this.status.set('loading');
    this.errorMsg.set('');
    this.confirmationId.set('');

    this.data
      .createAppointment$({
        serviceId: svcId,
        stylistId: slot.stylistId,
        start: slot.start,
        contact: contact
          ? {
              firstName: (contact.firstName ?? '').trim(),
              lastName: (contact.lastName ?? '').trim(),
              email: (contact.email ?? '').trim() || undefined,
              phone: (contact.phone ?? '').trim() || undefined,
            }
          : undefined,
      })
      .subscribe({
        next: (response) => {
          this.status.set('success');
          this.confirmationId.set(response.appointmentId);
          this.snack.open('Appointment booked!', 'Ok', { duration: 5000 });
        },
        error: (err) => {
          this.status.set('error');
          this.errorMsg.set(err?.message ?? 'Unknown error');
        },
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
