import { Component, OnInit } from '@angular/core';
import {Card, Suit} from '../card';

@Component({
  selector: 'app-poker',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css']
})
export class PokerComponent implements OnInit {

  deck: Card[] = [];
  hand: Card[] = [];

  constructor() { }

  ngOnInit(): void {
    this.buildDeck();
    this.hand = this.drawCards(5);
  }

  buildDeck(): void {
    const ranks = Array.from({length: 13}, (_, i) => i + 1);
    Object.keys(Suit).forEach((suit: Suit) => {
      ranks.forEach(rank => {
        this.deck.push(new Card(rank, suit));
      });
    });
    this.shuffle(this.deck);
  }

  drawCards(n: number): Card[] {
    const draw = [];
    for (let i = 0; i < n && this.deck.length > 0; i++) {
      draw.push(this.drawCard());
    }
    return draw;
  }
  drawCard(): Card {
    return this.deck.splice(this.getRandomInt(0, this.deck.length), 1)[0];
  }
  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  private getRandomInt(min, max): number {
    return Math.random() * (max - min) + min;
  }

  /**
   * Shuffles array in place. ES6 version
   * @param a An array containing the items.
   */
  private shuffle(a: Card[]): Card[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }


  roll(cards: Card[]): void {
    this.hand = this.hand.filter(c => !cards.includes(c));
    this.hand.push(...this.drawCards(cards.length));
    console.log(this.hand);
    this.deck.push(...cards);
  }
}
