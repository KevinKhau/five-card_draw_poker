import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from '../../card';
import {Store} from '@ngrx/store';
import {addCards, removeCards} from '../poker.action';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';
import {FiveCardHandExtractorImpl, HandUtil} from './hand.util';

@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit, AfterContentInit {

  constructor(
    private deckStore: Store<{ deck: Card[] }>,
    public handUtil: HandUtil = new HandUtil(),
    public handExtractor: FiveCardHandExtractorImpl = new FiveCardHandExtractorImpl()
  ) {
    this.deck$ = this.deckStore.select('deck');
  }

  private deck$: Observable<Card[]>;
  private readonly HAND_NUMBER = 15;

  @Input()
  cards: Card[] = [];
  waste: Card[] = [];

  @Output() rollEvent = new EventEmitter<Card[]>();

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  static getRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
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
    this.deckStore.dispatch(addCards({cards: this.waste}));
    this.waste = [];

  }

  pickCards(n: number, deck: Card[]): Card[] {
    const draw = [];
    for (let i = 0; i < n && deck.length > 0; i++) {
      const drawnCard = this.pickCard(deck);
      deck = deck.filter(c => c !== drawnCard);
      draw.push(drawnCard);
    }
    return draw;
  }
  pickCard(deck: Card[]): Card {
    const index = HandComponent.getRandomInt(0, deck.length);
    return deck.slice(index, index + 1)[0];
  }

  private drawCards(n: number): void {
    this.deck$.pipe(first((deck: Card[]) => deck && !!deck.length)).subscribe(deck => {
      setTimeout(() => {
        this.cards.push(...this.pickCards(n, deck));
        this.deckStore.dispatch(removeCards({cards: this.cards}));
      });
    });
  }

}


