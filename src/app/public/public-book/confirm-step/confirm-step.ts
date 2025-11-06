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
import { Service, Slot, Stylist } from '@core/models/book-types';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirm-step',
  imports: [
    MatCardModule,
    DatePipe,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterLink,
    MatSnackBarModule,
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
  private readonly router = inject(Router);
  private subs = new Subscription();

  private latestServices: Service[] = [];
  private latestStylists: Stylist[] = [];

  serviceNameSig = signal<string | null>(null);
  stylistNameSig = signal<string | null>(null);
  timeSlotSig = signal<Slot | null>(null);

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
  }

  status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  errorMsg = signal<string>('');
  confirmationId = signal<string>('');

  canConfirm(): boolean {
    const hasService = !!this.bookParent.firstFormGroup.get('service')?.value;
    return hasService && !!this.timeSlotSig();
  }

  confirm(): void {
    const svcId = this.bookParent.firstFormGroup.get('service')?.value as string | null;
    const slot = this.timeSlotSig();

    if (!svcId || !slot) return;

    this.status.set('loading');
    this.errorMsg.set('');
    this.confirmationId.set('');

    this.data
      .createAppointment$({
        serviceId: svcId,
        stylistId: slot.stylistId,
        start: slot.start,
      })
      .subscribe({
        next: (response) => {
          this.status.set('success');
          this.confirmationId.set(response.appointmentId);
          this.snack.open('Appointment booked!', 'Ok', { duration: 3000 });
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
