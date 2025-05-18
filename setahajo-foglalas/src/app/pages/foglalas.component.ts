import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hajo } from '../models/hajo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Foglalas } from '../models/foglalas.model';
import { DateFormatPipe } from '../pipes/date-format.pipe';


@Component({
  selector: 'app-foglalas',
  standalone: true,
  imports: [ CommonModule, FormsModule, DateFormatPipe ],
  templateUrl: './foglalas.component.html',
  styleUrls: ['./foglalas.component.scss']
})
export class FoglalasComponent implements OnInit {
  private route = inject(ActivatedRoute);

  hajok: Hajo[] = [
    { id: '1', nev: 'Duna Expressz', kapacitas:40, ar:15000, kepUrl:'...', leiras:'…' },
    { id: '2', nev: 'Balaton Királynője', kapacitas:60, ar:18000, kepUrl:'...', leiras:'…' },
  ];
  hajo?: Hajo;

  foglalas = { nev:'', email:'', letszam:1, datum:'' };
  submitted = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.hajo = this.hajok.find(h => h.id === id);
  }

  onSubmit() {
    this.submitted = true;
    console.log('Foglalás adatok:', this.foglalas);
  }
}
