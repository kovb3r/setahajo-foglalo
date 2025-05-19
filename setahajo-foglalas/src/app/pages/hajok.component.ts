import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Hajo } from '../models/hajo.model';
import { HAJOK } from '../data/hajok.data';
import { HajoCardComponent } from '../components/hajo-card/hajo-card.component';
import { CommonModule } from '@angular/common';           
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hajok',
  standalone: true,
  imports: [HajoCardComponent, CommonModule, RouterModule],
  templateUrl: './hajok.component.html',
  styleUrls: ['./hajok.component.scss']
})
export class HajokComponent {
  hajok: Hajo[] = HAJOK;
  selected?: Hajo;

  constructor(private router: Router) {}

  onSelect(h: Hajo) {
    this.selected = h;
  }

  onHover(h: Hajo) {
    // pl. mutat egy tooltipet, vagy csak console.log
    console.log('Hover:', h.nev);
  }

  onBook(h: Hajo) {
    // átirányít a foglalási oldalra
    this.router.navigate(['/foglalas', h.id]);
  }
}
