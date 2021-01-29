import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Card, rankNumber, Suit} from '../card';

@Injectable({providedIn: 'root'})
  export class DeckStoreService {

  constructor() {
    this.deck = this.buildDeck();
  }

  get deck(): Card[] {
    return this._deck.getValue();
  }
  set deck(deck: Card[]) {
    this._deck.next(deck);
  }

  private readonly _deck = new BehaviorSubject<Card[]>([]);
  readonly deck$ = this._deck.asObservable();

  /**
   * Shuffles array in place. ES6 version.
   * @param cards An array containing the items.
   */
  static shuffle(cards: Card[]): Card[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive).
   */
  static getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  buildDeck(): Card[] {
    const deck: Card[] = [];
    const ranks = Array.from({length: rankNumber}, (_, i) => i + 1);
    Object.keys(Suit)
      .filter(key => isNaN(Number(key)))
      .forEach((key) => ranks
        .forEach(rank => deck.push(new Card(rank, Suit[key]))));
    return DeckStoreService.shuffle(deck);
  }

  addCards(cards: Card[]): void {
    this.deck.push(...cards);
  }

  drawCards(n: number): Card[] {
    const drawnCards = [];
    for (let i = 0; i < n && this.deck.length > 0; i++) {
      drawnCards.push(this.drawCard());
    }
    return drawnCards;
  }

  drawCard(): Card {
    return this.deck.splice(DeckStoreService.getRandomInt(0, this.deck.length), 1)[0];
  }

}
