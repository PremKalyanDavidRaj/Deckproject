import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckService } from './services/deck.service';
import { LoadingService } from './services/loading.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DeckControlsComponent } from './components/deck-controls/deck-controls.component';
import { DealtCardsComponent } from './components/dealt-cards/dealt-cards.component';
import { Deck } from './models/card.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    DeckControlsComponent,
    DealtCardsComponent
  ],
  template: `
    <app-toolbar></app-toolbar>
    <div class="container">
      <app-deck-controls
        [remainingCards]="remainingCards"
        (onShuffle)="shuffle()"
        (onDeal)="deal($event)"
        (onReset)="reset()">
      </app-deck-controls>

      <app-dealt-cards [cards]="deckState?.dealtCards || []"></app-dealt-cards>

      <h2>Remaining Cards: {{ remainingCards }}</h2>
    </div>
  `
})
export class AppComponent implements OnInit {
  deckState?: Deck;

  constructor(
    private deckService: DeckService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.deckService.getDeckState().subscribe(state => {
      this.deckState = state;
    });
  }

  get remainingCards(): number {
    return this.deckState?.cards.length || 0;
  }

  async shuffle() {
    try {
      await this.deckService.shuffle();
    } catch (error) {
      console.error('Error shuffling deck:', error);
    }
  }

  async deal(count: number) {
    try {
      await this.deckService.dealCards(count);
    } catch (error) {
      console.error('Error dealing cards:', error);
    }
  }

  async reset() {
    try {
      await this.deckService.resetDeck();
    } catch (error) {
      console.error('Error resetting deck:', error);
    }
  }
}