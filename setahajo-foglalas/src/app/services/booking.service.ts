import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, CollectionReference, DocumentData, orderBy, limit } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';   

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

  private async getUserId(): Promise<string> {
    const user = await firstValueFrom(this.authService.currentUser);
    if (!user) throw new Error('Nincs bejelentkezett felhasználó');
    return user.uid;
  }

  async getMyBookingsByUser(userId: string): Promise<Booking[]> {
    const q = query(
      this.bookingsCol(),
      where('userId', '==', userId)
    );
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Booking) }));
  }

  async getUpcomingBookings(limitCount = 5): Promise<Booking[]> {
    const user = await firstValueFrom(this.authService.currentUser);
    if (!user) return [];

    const todayIso = new Date().toISOString().split('T')[0]; 
    // (1) csak a saját userId
    // (2) dátum >= mai nap
    // (3) rendezés dátum szerint
    // (4) limit
    const q = query(
      this.bookingsCol(),
      where('userId', '==', user.uid),
      where('datum', '>=', todayIso),
      orderBy('datum', 'asc'),
      limit(limitCount)
    );

    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Booking) }));
  }

  

  async createBooking(b: Omit<Booking,'id'|'createdAt'|'userId'>) {
    const userId = await this.getUserId();
    const booking: Booking = { userId, createdAt: new Date(), ...b };
    return addDoc(this.bookingsCol(), booking);
  }

  /** Lekérdezi a bejelentkezett user foglalásait */
  async getMyBookings(): Promise<Booking[]> {
    const user = await firstValueFrom(this.authService.currentUser);
    if (!user) return [];
    const q = query(this.bookingsCol(), where('userId', '==', user.uid));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Booking) }));
  }
}
