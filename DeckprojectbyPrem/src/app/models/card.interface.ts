export interface Card {
  suit: string;
  rank: string;
  value: number;
  color: string;
}

export interface Deck {
  cards: Card[];
  dealtCards: Card[];
}