import {Card, rankNumber, Suit} from '../../card';
import {Injectable} from '@angular/core';
import {positiveModulo} from '../../util';

export interface HandComparator {
  getBest(hands: Array<Card[]>): Card[];
  getBetter(hand1: Card[], hand2: Card[]): Card[];
  getBestStraight(hands: Array<Card[]>): Card[];
  getBestFlush(hands: Array<Card[]>): Card[];
  getBestFullHouse(hands: Array<Card[]>): Card[];
  getBestFourOfAKind(hands: Array<Card[]>): Card[];
  getBestStraightFlush(hands: Array<Card[]>): Card[];
  getHighCardInFiveCardHand(hands: Array<Card[]>): Card;
}

export interface FiveCardHandIdentifier {
  isStraight(hand: Card[]): boolean;
  isFlush(hand: Card[]): boolean;
  isFullHouse(hand: Card[]): boolean;
  isFourOfAKind(hand: Card[]): boolean;
  isStraightFlush(hand: Card[]): boolean;
  isFiveOfAKind(hand: Card[]): boolean;
}

export interface FiveCardHandExtractor {
  getStraight(hand: Card[]): Card[];
  getStraights(hand: Card[]): Array<Card[]>;
  getFlush(hand: Card[]): Card[];
  getFlushes(hand: Card[]): Array<Card[]>;
  getFullHouse(hand: Card[]): Card[];
  getFullHouses(hand: Card[]): Array<Card[]>;
}

@Injectable({providedIn: 'root'})
export class HandUtil implements FiveCardHandIdentifier {
  readonly minimumHandNumber = 5;

  hasMinimumCardNumber(hand: Card[]): boolean {
    return hand.length >= this.minimumHandNumber;
  }

  /** Immutable */
  orderByRank(hand: Card[]): Card[] {
    const transform = (card: Card): number => positiveModulo(card.rank - 2, rankNumber);
    return [...hand].sort((c1, c2) => transform(c1) - transform(c2));
  }
  reverseOrder(hand: Card[]): Card[] {
    return [...this.orderByRank(hand)].reverse();
  }

  isStraight(hand: Card[]): boolean {
    if (!this.hasMinimumCardNumber(hand)) return false;
    return hand
      .some(card => card.rank < 11 && Array.from({length: this.minimumHandNumber - 1}, (_, i) => i + 1)
        .every(i => card.hasUpper(i, hand)));
  }

  isFlush(hand: Card[]): boolean {
    if (!this.hasMinimumCardNumber(hand)) return false;
    return Object.keys(Suit).some((key) => hand.filter(card => card.suit === Suit[key]).length >= this.minimumHandNumber);
  }

  isFullHouse(hand: Card[]): boolean {
    throw new Error('Method not implemented.');
  }
  isFourOfAKind(hand: Card[]): boolean {
    throw new Error('Method not implemented.');
  }

  isStraightFlush(hand: Card[]): boolean {
    return this.isStraight(hand) && this.isFlush(hand);
  }

  isFiveOfAKind(hand: Card[]): boolean {
    throw new Error('Method not implemented.');
  }

}

@Injectable({providedIn: 'root'})
export class FiveCardHandExtractorImpl implements FiveCardHandExtractor {

  handUtil = new HandUtil();

  /**
   * Extracts the straight with the highest card.
   * @param hand A hand of any number of cards.
   */
  getStraight(hand: Card[]): Card[] {
    if (!this.handUtil.hasMinimumCardNumber(hand)) return;
    hand = this.handUtil.reverseOrder(hand); // Mandatory.
    const diffRange: number[] = Array.from({length: this.handUtil.minimumHandNumber - 1}, (_, i) => i + 1); // [1, 2, 3, 4]
    for (let i = 0; i < hand.length - this.handUtil.minimumHandNumber; i++) {
      let buffer: Card[] = [hand[i]];
      for (const diff of diffRange) {
        const lowerCard = hand[i].getLower(diff, hand);
        if (lowerCard) {
          buffer.push(lowerCard);
        } else {
          buffer = [];
          break;
        }
      }
      if (buffer.length >= this.handUtil.minimumHandNumber) {
        return buffer;
      }
    }
  }

  getStraights(hand: Card[]): Array<Card[]> {
    return undefined;
  }

  getFlush(hand: Card[]): Card[] {
    if (!this.handUtil.hasMinimumCardNumber(hand)) return;
    hand = this.handUtil.reverseOrder(hand);
    for (const key in Suit) {
      if (!isNaN(Number(Suit[key]))) continue;
      const filteredHand = hand.filter(card => card.suit === Suit[key]);
      if (filteredHand.length >= this.handUtil.minimumHandNumber) {
        return filteredHand.splice(0, 5);
      }
    }
  }

  getFlushes(hand: Card[]): Array<Card[]> {
    return undefined;
  }

  getFullHouse(hand: Card[]): Card[] {
    return [];
  }

  getFullHouses(hand: Card[]): Array<Card[]> {
    return undefined;
  }

}
