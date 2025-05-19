import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Hajo } from '../../models/hajo.model';
import { HufCurrencyPipe } from '../../pipes/huf-currency.pipe';

@Component({
  selector: 'app-hajo-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, HufCurrencyPipe],
  template: `
    <mat-card
      class="hajo-card"
      [class.highlight]="highlight"
      (mouseenter)="hover.emit(hajo)"
      (click)="select.emit(hajo)">
      <mat-card-header>
        <mat-card-title>{{ hajo.nev }}</mat-card-title>
        <mat-card-subtitle>Ár: {{ hajo.ar | hufCurrency }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>{{ hajo.leiras }}</p>
      </mat-card-content>
      <mat-card-actions *ngIf="showBookButton">
        <button mat-stroked-button color="primary"
                (click)="book.emit(hajo); $event.stopPropagation()">
          {{ bookLabel }}
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./hajo-card.component.scss']
})
export class HajoCardComponent {
  @Input() hajo!: Hajo;                       // 1) a megjelenítendő hajó
  @Input() highlight = false;                // 2) kiemelés
  @Input() showBookButton = true;            // 3) mutassuk-e a foglalás gombot
  @Input() bookLabel = 'Foglalás';           // 4) gomb felirat

  
  @Output() select = new EventEmitter<Hajo>(); // 1) kártyára kattintás
  @Output() hover  = new EventEmitter<Hajo>(); // 2) fölé vittük az egeret
  @Output() book   = new EventEmitter<Hajo>(); // 3) gombra kattintás
}

