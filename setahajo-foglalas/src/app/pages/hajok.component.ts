import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Hajo } from '../models/hajo.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HufCurrencyPipe } from '../pipes/huf-currency.pipe';

@Component({
  selector: 'app-hajok',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, HufCurrencyPipe],
  templateUrl: './hajok.component.html',
  styleUrls: ['./hajok.component.scss']
})
export class HajokComponent {
  // ...
  hajok: Hajo[] = [
    {
      id: '1',
      nev: 'Duna Expressz',
      kapacitas: 40,
      ar: 15000,
      kepUrl: 'assets/hajok/duna-expressz.jpg',
      leiras: 'Gyors, kényelmes hajó a Dunán.'
    },
    {
      id: '2',
      nev: 'Balaton Királynője',
      kapacitas: 60,
      ar: 18000,
      kepUrl: 'assets/images/balaton-kiralynoje.jpg',
      leiras: 'Luxus élmény a Balatonon.'
    }
  ];
}
