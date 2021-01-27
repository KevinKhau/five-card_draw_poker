import {Component, ViewEncapsulation} from '@angular/core';
import {DeckStoreService} from './deck-store.service';

@Component({
  selector: 'app-poker',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokerComponent {

  constructor(
    public deckStore: DeckStoreService
  ) {
  }

}
