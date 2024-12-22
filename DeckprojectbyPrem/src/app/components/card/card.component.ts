import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/card.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="card">
      <mat-card-content>
        <div [class]="card.color">
          <div class="rank">{{ card.rank }}</div>
          <div class="suit">{{ card.suit }}</div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .card {
      width: 100px;
      height: 140px;
      margin: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .rank {
      font-size: 24px;
      font-weight: bold;
    }
    .suit {
      font-size: 32px;
    }
  `]
})
export class CardComponent {
  @Input({ required: true }) card!: Card;
}