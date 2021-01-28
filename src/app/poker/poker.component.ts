import {Component, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {DeckStoreService} from './deck-store.service';
import {HandComponent} from './hand/hand.component';

@Component({
  selector: 'app-poker',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokerComponent {

  @ViewChildren(HandComponent) hands!: QueryList<HandComponent>;

  constructor(
    public deckStore: DeckStoreService
  ) {
  }

  roll(): void {
    this.hands.forEach(hand => hand.roll());
  }

}
