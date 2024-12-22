import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card, Deck } from '../models/card.interface';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private readonly SUITS = ['♠', '♣', '♥', '♦'];
  private readonly RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  
  private deckState = new BehaviorSubject<Deck>({
    cards: [],
    dealtCards: []
  });

  constructor(private firebaseService: FirebaseService) {
    this.initializeDeck();
    this.loadLastState();
  }

  private async loadLastState(): Promise<void> {
    try {
      const lastState = await this.firebaseService.getLastDeckState();
      if (lastState) {
        this.deckState.next(lastState);
      }
    } catch (error) {
      console.error('Error loading last state:', error);
    }
  }

  private initializeDeck(): void {
    const cards: Card[] = [];
    
    this.SUITS.forEach(suit => {
      this.RANKS.forEach((rank, index) => {
        cards.push({
          suit,
          rank,
          value: index + 1,
          color: suit === '♥' || suit === '♦' ? 'red' : 'black'
        });
      });
    });

    this.deckState.next({
      cards,
      dealtCards: []
    });
  }

  getDeckState(): Observable<Deck> {
    return this.deckState.asObservable();
  }

  async shuffle(): Promise<void> {
    const currentState = this.deckState.value;
    const cards = [...currentState.cards];
    
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    const newState = {
      ...currentState,
      cards
    };

    this.deckState.next(newState);
    await this.firebaseService.saveDeckState(newState);
  }

  async dealCards(count: number): Promise<void> {
    const currentState = this.deckState.value;
    
    if (count > currentState.cards.length) {
      throw new Error('Not enough cards in the deck');
    }

    const dealtCards = currentState.cards.slice(0, count);
    const remainingCards = currentState.cards.slice(count);

    const newState = {
      cards: remainingCards,
      dealtCards: [...currentState.dealtCards, ...dealtCards]
    };

    this.deckState.next(newState);
    await this.firebaseService.saveDeckState(newState);
  }

  async resetDeck(): Promise<void> {
    this.initializeDeck();
    await this.firebaseService.saveDeckState(this.deckState.value);
  }
}