import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Hajo } from '../models/hajo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Foglalas } from '../models/foglalas.model';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { BookingService } from '../services/booking.service';   
import { HAJOK } from '../data/hajok.data';
import { HajoService } from '../services/hajo.service';  
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HufCurrencyPipe } from '../pipes/huf-currency.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-foglalas',
  standalone: true,
  imports: [ 
    CommonModule, 
    FormsModule, 
    DateFormatPipe, 
    MatCardModule, 
    MatButtonModule, 
    HufCurrencyPipe,
    MatFormFieldModule,    
    MatInputModule,
    RouterModule  
  ],
  templateUrl: './foglalas.component.html',
  styleUrls: ['./foglalas.component.scss']
})
export class FoglalasComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private bookingService = inject(BookingService);
  private hajoService = inject(HajoService);
  private router = inject(Router);

  hajo?: Hajo;

  foglalas = { nev:'', email:'', letszam:1, datum:'' };
  submitted = false;
  error = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.hajo = this.hajoService.getById(id);
  }

  async onSubmit() {
    if (!this.hajo) return;
    this.submitted = true;

    try {
      console.log('Foglalás adatok:', this.foglalas);
      await this.bookingService.createBooking({
        hajoId: this.hajo.id,
        nev: this.foglalas.nev,
        email: this.foglalas.email,
        letszam: this.foglalas.letszam,
        datum: this.foglalas.datum
      });
      this.submitted = true;
      // vissza a profilra 2s múlva
      setTimeout(() => this.router.navigateByUrl('/profile'), 2000);
      console.log('Foglalás sikeres:', this.foglalas);
    } catch (e: any) {
      this.error = e.message || 'Hiba a foglalás mentésekor';
    }
  }
}
