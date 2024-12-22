import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deck-controls',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="actions">
      <button mat-raised-button color="primary" 
              (click)="handleShuffle()"
              [disabled]="isLoading">
        {{ isLoading ? 'Shuffling...' : 'Shuffle Deck' }}
      </button>
      
      <mat-form-field>
        <mat-label>Number of cards</mat-label>
        <input matInput type="number" [(ngModel)]="cardCount" min="1" [max]="remainingCards">
      </mat-form-field>
      
      <button mat-raised-button color="accent" 
              (click)="handleDeal()"
              [disabled]="!canDeal || isLoading">
        {{ isLoading ? 'Dealing...' : 'Deal Cards' }}
      </button>
      
      <button mat-raised-button 
              (click)="handleReset()"
              [disabled]="isLoading">
        {{ isLoading ? 'Resetting...' : 'Reset Deck' }}
      </button>
    </div>
  `
})
export class DeckControlsComponent implements OnInit, OnDestroy {
  @Input() remainingCards = 0;
  @Output() onShuffle = new EventEmitter<void>();
  @Output() onDeal = new EventEmitter<number>();
  @Output() onReset = new EventEmitter<void>();

  cardCount = 1;
  isLoading = false;
  private loadingSubscription?: Subscription;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingSubscription = this.loadingService
      .getLoadingState()
      .subscribe(state => this.isLoading = state);
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

  get canDeal(): boolean {
    return this.cardCount > 0 && this.cardCount <= this.remainingCards;
  }

  async handleShuffle() {
    this.loadingService.setLoading(true);
    try {
      await this.onShuffle.emit();
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async handleDeal() {
    if (!this.canDeal) return;
    
    this.loadingService.setLoading(true);
    try {
      await this.onDeal.emit(this.cardCount);
    } finally {
      this.loadingService.setLoading(false);
    }
  }

  async handleReset() {
    this.loadingService.setLoading(true);
    try {
      await this.onReset.emit();
    } finally {
      this.loadingService.setLoading(false);
    }
  }
}