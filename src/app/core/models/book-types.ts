export const BUSINESS_TZ = 'America/Chicago' as const;
export const BOOKING_HORIZON_DAYS = 90 as const;
export const TIME_GRID_MINUTES = 15 as const;

export interface Service {
  id: string;
  name: string;
  durationMins: number;
  price: number;
}

export type HhMm = `${number}${number}:${number}${number}`; // "09:00", "17:30", etc.

export interface TimeRange {
  start: HhMm; // local business time (America/Chicago)
  end: HhMm; // local business time
}

/** 0=Sun ... 6=Sat */
export type Weekday = '0' | '1' | '2' | '3' | '4' | '5' | '6';

/** Per-stylist weekly working windows */
export type WeeklyAvailability = Partial<Record<Weekday, TimeRange[]>>;

export interface Stylist {
  id: string;
  name: string;
  active: boolean; // only active stylists are offered to users
  weeklyAvailability: WeeklyAvailability;
}

/** ---- Availability + slot models ---- */
export interface Slot {
  /** Start instant in local business time semantics (convert to UTC when querying/writing) */
  start: Date;
  stylistId: string;
}

/** Input for availability computation */
export interface AvailabilityParams {
  serviceId: string;
  dateLocal: Date; // calendar day in America/Chicago
  stylistChoice: 'any' | string; // "any" or a specific stylist id
}

/** Output of availability fetch: start-only slots (end is derived from service.durationMins) */
export interface AvailabilityResult {
  slots: Slot[];
}

/** ---- Contact + booking create ---- */
export interface ContactInfo {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
}

/** Create-appointment input (double-book checked in a transaction) */
export interface CreateAppointmentInput {
  serviceId: string;
  stylistId: string;
  start: Date; // local business time; convert to UTC Timestamp internally
  durationMins: number; // from selected service
  contact?: ContactInfo; // present for guest flow
  clientId?: string; // present if logged-in user
}

/** Result after a successful create */
export interface CreateAppointmentResult {
  appointmentId: string;
}

/** ---- Firestore document shape (for reads/writes) ---- */
export interface AppointmentDoc {
  serviceId: string;
  stylistId: string;
  clientId?: string;
  guest?: ContactInfo;
  startTs: any; // Firestore Timestamp (typed as `any` here to avoid SDK coupling)
  endTs: any; // Firestore Timestamp
  status: 'confirmed' | 'canceled';
  createdAt: any; // Firestore Timestamp
}
