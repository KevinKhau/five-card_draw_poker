import {AfterViewInit, ChangeDetectorRef, Component, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {DeckStoreService} from './deck-store.service';
import {HandComponent} from './hand/hand.component';
import {HandService} from './hand/hand.service';

@Component({
  selector: 'app-poker',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokerComponent implements AfterViewInit {

  @ViewChildren(HandComponent) hands: QueryList<HandComponent>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public deckStore: DeckStoreService,
    private handService: HandService,
  ) {
  }

  ngAfterViewInit(): void {
    this.setBestHand();
    this.changeDetectorRef.detectChanges();
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
