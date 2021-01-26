import {Component, OnInit} from '@angular/core';
import {Card, rankNumber, Suit} from '../card';
import {Store} from '@ngrx/store';
import {set} from './poker.action';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-poker',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css']
})
export class PokerComponent implements OnInit {

  constructor(
    private deckStore: Store<{ deck: Card[] }>
  ) {
    this.deck$ = this.deckStore.select('deck');
  }

  hand: Card[] = [];
  deck$: Observable<Card[]>;

  /**
   * Shuffles array in place. ES6 version
   * @param a An array containing the items.
   */
  static shuffle(a: Card[]): Card[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  ngOnInit(): void {
    this.deckStore.dispatch(set({deck: this.buildDeck()}));
  }

  buildDeck(): Card[] {
    const deck: Card[] = [];
    const ranks = Array.from({length: rankNumber}, (_, i) => i + 1);
    Object.keys(Suit)
      .filter(key => isNaN(Number(key)))
      .forEach((key) => ranks
        .forEach(rank => deck.push(new Card(rank, Suit[key]))));
    return PokerComponent.shuffle(deck);
  }

}
