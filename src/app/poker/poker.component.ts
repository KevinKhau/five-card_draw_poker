import {AfterViewChecked, Component, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {DeckStoreService} from './deck-store.service';
import {HandComponent} from './hand/hand.component';
import {HandService} from './hand/hand.service';

@Component({
  selector: 'app-poker',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokerComponent implements AfterViewChecked {

  @ViewChildren(HandComponent) hands: QueryList<HandComponent>;

  constructor(
    public deckStore: DeckStoreService,
    private handService: HandService,
  ) {
  }

  ngAfterViewChecked(): void {
    this.setBestHand();
  }

  roll(): void {
    this.hands.forEach(hand => hand.roll());
    this.setBestHand();
  }

  setBestHand(): void {
    if (!this.hands)  return;
    const bestHand = this.hands.toArray().sort((hand1, hand2) => this.handService.compare(hand2.bestHand, hand1.bestHand))[0];
    this.hands.forEach(hand => hand.isBest = hand === bestHand);
  }

}
