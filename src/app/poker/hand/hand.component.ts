import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../../card';
import {HandService, StrictHand} from './hand.service';
import {DeckStoreService} from '../deck-store.service';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css'],
})
export class HandComponent implements OnInit {

  constructor(
    private deckStore: DeckStoreService,
    public handService: HandService = new HandService()
  ) {
  }

  private readonly HAND_NUMBER = 13;
  bestHand: StrictHand;

  @Input()
  cards: Card[] = [];
  waste: Card[] = [];

  @Output() rollEvent = new EventEmitter<Card[]>();

  ngOnInit(): void {
    this.drawCards(this.HAND_NUMBER);
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
    this.drawCards(this.waste.length);
    this.deckStore.addCards(this.waste);
    this.waste = [];
  }

  private drawCards(n: number): void {
    this.cards.push(...this.deckStore.drawCards(n));
    this.bestHand = this.getBestHand();
  }

  getBestHand(): StrictHand {
    return this.handService.getBest(this.cards);
  }

}
