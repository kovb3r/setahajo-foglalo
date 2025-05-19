import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { BookingService, Booking } from '../services/booking.service';
import { MatListModule } from '@angular/material/list';
import { DateFormatPipe } from '../pipes/date-format.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    DateFormatPipe
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private bookingService = inject(BookingService);
  bookings: Booking[] = [];
  upcoming: Booking[] = [];
  private authService = inject(AuthService);
  private sub?: Subscription;

  user = { email: '', displayName: '' };
  newDisplayName = '';
  message = '';

  async ngOnInit() {
    // Lifecycle Hook #1
    this.sub = this.authService.currentUser.subscribe(async u => {
      if (u) {
        // beállítjuk a profil-mezőket
        this.user.email = u.email || '';
        this.user.displayName = u.displayName || '';
        this.newDisplayName = this.user.displayName;

        // és csak most kérjük le a foglalásokat
        this.bookings = await this.bookingService.getMyBookingsByUser(u.uid);
      } else {
        // kijelentkezett állapot: töröljük a listát
        this.bookings = [];
      }
      this.upcoming = await this.bookingService.getUpcomingBookings(5);
    });
  }

  ngOnDestroy() {
    // Lifecycle Hook #2
    this.sub?.unsubscribe();
  }

  async updateName() {
    try {
      await this.authService.updateDisplayName(this.newDisplayName);
      this.message = 'Név sikeresen frissítve.';
    } catch (e: any) {
      this.message = 'Hiba a frissítés során: ' + e.message;
    }
  }
}
