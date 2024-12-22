import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit 
} from '@angular/fire/firestore';
import { Deck } from '../models/card.interface';
import { FirestoreDocument } from '../models/firestore.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firestore = inject(Firestore);

  async saveDeckState(deck: Deck): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'deckStates'), {
        cards: deck.cards,
        dealtCards: deck.dealtCards,
        timestamp: new Date()
      });
      console.log('Deck state saved with ID:', docRef.id);
    } catch (error) {
      console.error('Error saving deck state:', error);
      throw error;
    }
  }

  async getLastDeckState(): Promise<Deck | null> {
    try {
      const q = query(
        collection(this.firestore, 'deckStates'),
        orderBy('timestamp', 'desc'),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0].data() as FirestoreDocument;
      return {
        cards: doc['cards'],
        dealtCards: doc['dealtCards']
      };
    } catch (error) {
      console.error('Error getting deck state:', error);
      throw error;
    }
  }
}