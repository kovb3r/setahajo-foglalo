import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

export interface Booking {
  id?: string;
  userId: string;
  hajoId: string;
  nev: string;
  email: string;
  letszam: number;
  datum: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  private bookingsCol(): CollectionReference<DocumentData> {
    return collection(this.firestore, 'bookings');
  }

  async createBooking(b: Omit<Booking,'id'|'createdAt'>) {
    const booking: Booking = {
      ...b,
      createdAt: new Date()
    };
    const docRef = await addDoc(this.bookingsCol(), booking);
    return docRef.id;
  }

  /** Lekérdezi a bejelentkezett user foglalásait */
  async getMyBookings(): Promise<Booking[]> {
    const user = this.authService.currentUser.snapshot || null;
    if (!user) return [];
    const q = query(this.bookingsCol(), where('userId', '==', user.uid));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Booking) }));
  }
}
