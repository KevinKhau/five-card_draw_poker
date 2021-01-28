import {Component, Input, OnInit} from '@angular/core';
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

  private readonly CARD_NUMBER = 5;

  @Input()
  name = 'Hand';
  cards: Card[] = [];
  bestHand: StrictHand;
  waste: Card[] = [];

  ngOnInit(): void {
    this.drawCards(this.CARD_NUMBER);
  }

  toggleThrow(card: Card): void {
    if (this.waste.includes(card)) {
      this.waste = this.waste.filter(v => v !== card);
    } else {
      this.waste.push(card);
    }
  }

  roll(): void {
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
