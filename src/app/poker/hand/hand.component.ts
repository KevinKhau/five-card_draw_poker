import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card, Suit} from '../../card';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {

  @Input()
  cards: Card[] = [];
  waste: Card[] = [];

  @Output() rollEvent = new EventEmitter<Card[]>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleThrow(card: Card): void {
    if (this.waste.includes(card)) {
      this.waste = this.waste.filter(v => v !== card);
    } else {
      this.waste.push(card);
    }
  }

  roll(): void {
    this.rollEvent.emit(this.waste);
    this.cards = this.cards.filter(c => !this.waste.includes(c));
    this.waste = [];
  }

  isFlush(): boolean {
    const suit: Suit = this.cards[0].suit;
    return this.cards.every(c => c.suit === suit);
  }
}


