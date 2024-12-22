import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Card } from '../../models/card.interface';

@Component({
  selector: 'app-dealt-cards',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <h2>Dealt Cards ({{ cards.length }})</h2>
    <div class="card-grid">
      <app-card *ngFor="let card of cards" [card]="card"></app-card>
    </div>
  `
})
export class DealtCardsComponent {
  @Input({ required: true }) cards: Card[] = [];
}