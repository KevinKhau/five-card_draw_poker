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

export interface FiveCardHandFinder {
  isStraight(hand: Card[]): boolean;
  isFlush(hand: Card[]): boolean;
  isFullHouse(hand: Card[]): boolean;
  isFourOfAKind(hand: Card[]): boolean;
  isStraightFlush(hand: Card[]): boolean;
  isFiveOfAKind(hand: Card[]): boolean;
}

export interface FiveCardHandExtractor {
  getStraight(hand: Card[]): Card[];
  getFlush(hand: Card[]): Card[];
  getFullHouse(hand: Card[]): Card[];
  getFourOfAKind(hand: Card[]): Card[];
  getStraightFlush(hand: Card[]): Card[];
  getFiveOfAKind(hand: Card[]): Card[];
}

@Injectable({providedIn: 'root'})
export class HandUtil implements FiveCardHandFinder {
  readonly minimumHandNumber = 5;

  hasMinimumCardNumber(hand: Card[]): boolean {
    return hand.length >= this.minimumHandNumber;
  }

  /** Immutable */
  orderByRank(hand: Card[]): Card[] {
    return [...hand].sort((c1, c2) => c1.compareRank(c2));
  }
  reverseOrder(hand: Card[]): Card[] {
    return [...this.orderByRank(hand)].reverse();
  }

  isStraight(hand: Card[]): boolean {
    if (!this.hasMinimumCardNumber(hand)) return false;
    return hand
      .some(card => (card.rank === 1 || card.rank >= this.minimumHandNumber) // start with highest card
        && Array.from({length: this.minimumHandNumber - 1}, (_, i) => i + 1) // [1, 2, 3, 4]
          .every(i => card.hasLower(i, hand)));
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

  getTwoOfAKind = this.getSameOfAKind(2);
  getThreeOfAKind = this.getSameOfAKind(3);
  getFourOfAKind = this.getSameOfAKind(4);
  getFiveOfAKind = this.getSameOfAKind(5);

  /**
   * Generates a function with required number of equal-rank cards
   * @param n required number of equal-rank cards
   */
  private getSameOfAKind(n: number): (hand: Card[]) => Card[] {
    return (hand: Card[]) => {
      if (hand.length < n)  return;
      const cardsGroupedByRank = hand.reduce((acc, card: Card) => {
        if (acc[card.rank]) {
          acc[card.rank].push(card);
        } else {
          acc[card.rank] = [card];
        }
        return acc;
      }, {});
      const nSameRank = Object.keys(cardsGroupedByRank)
        .sort((r1, r2) => +r2 - +r1)
        .find(rank => cardsGroupedByRank[rank].length >= n);
      if (nSameRank) return cardsGroupedByRank[nSameRank].splice(0, n);
    };
  }

  /**
   * Extracts the straight with the highest card.
   * @param hand A hand of any number of cards.
   */
  getStraight(hand: Card[]): Card[] {
    if (!this.handUtil.hasMinimumCardNumber(hand)) return;
    hand = this.handUtil.reverseOrder(hand);
    const diffRange: number[] = Array.from({length: this.handUtil.minimumHandNumber - 1}, (_, i) => i + 1); // [1, 2, 3, 4]
    for (let i = 0; i < hand.length - (this.handUtil.minimumHandNumber - 1); i++) {
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

  getFullHouse(hand: Card[]): Card[] {
    const trips = this.getThreeOfAKind(hand);
    if (!trips) return;
    hand = hand.filter(card => !trips.includes(card));
    const pair = this.getTwoOfAKind(hand);
    if (!pair)  return;
    return [...trips, ...pair];
  }

  getStraightFlush(hand: Card[]): Card[] {
    if (!this.handUtil.hasMinimumCardNumber(hand)) return;
    hand = this.handUtil.reverseOrder(hand); // Mandatory.
    const diffRange: number[] = Array.from({length: this.handUtil.minimumHandNumber - 1}, (_, i) => i + 1); // [1, 2, 3, 4]
    for (let i = 0; i < hand.length - (this.handUtil.minimumHandNumber - 1); i++) {
      let buffer: Card[] = [hand[i]];
      for (const diff of diffRange) {
        const lowerCardWithSameSuit = hand.find(c => c.suit === hand[i].suit && diff === positiveModulo(hand[i].rank - c.rank, rankNumber));
        if (lowerCardWithSameSuit) {
          buffer.push(lowerCardWithSameSuit);
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

}
