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

export interface HandExtractor {
  getBest(hand: Card[]): Card[];
  getStraight(hand: Card[]): Card[];
  getFlush(hand: Card[]): Card[];
  getFullHouse(hand: Card[]): Card[];
  getFourOfAKind(hand: Card[]): Card[];
  getStraightFlush(hand: Card[]): Card[];
  getFiveOfAKind(hand: Card[]): Card[];
  getThreeOfAKind(hand: Card[]): Card[];
  getTwoPair(hand: Card[]): Card[];
  getPair(hand: Card[]): Card[];
  getKicker(hand: Card[], others: Card[], requiredHandLength: number): Card[];

  /**
   * Returns rank-sorted hand.
   * @param hand input hand
   * @param n the number of cards in the returned hand
   */
  getHighCards(hand: Card[], n: number): Card[];
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

  /**
   * Returns a array with removed cards
   * @param hand Input hand
   * @param cards Cards to be removed
   */
  remove(hand: Card[], cards: Card[]): Card[] {
    return hand.filter(card => !cards.includes(card));
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

/**
 * Returns cards strictly required the for the asked hand.
 * If the input hand has two pairs, #getTwoPair returns 4 cards, without the kicker.
 */
@Injectable({providedIn: 'root'})
export class HandExtractorImpl implements HandExtractor {

  handUtil = new HandUtil();

  getPair = this.getSameOfAKind(2);
  getThreeOfAKind = this.getSameOfAKind(3);
  getFourOfAKind = this.getSameOfAKind(4);
  getFiveOfAKind = this.getSameOfAKind(5);

  getBest(hand: Card[]): Card[] {
    const strictHandF = [
      this.getFiveOfAKind,
      this.getStraightFlush,
      this.getFourOfAKind,
      this.getFullHouse,
      this.getFlush,
      this.getStraight,
      this.getThreeOfAKind,
      this.getTwoPair,
      this.getPair,
      this.getHighCards
    ];

    for (const handExtractor of strictHandF) {
      const result = handExtractor.bind(this)(hand, this.handUtil.minimumHandNumber);
      if (result)  return result;
    }
  }

  /**
   * Generates a function with required number of best same-rank cards
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
      const nSameRanks = Object.keys(cardsGroupedByRank).filter(rank => cardsGroupedByRank[rank].length >= n).map(v => Number(v));
      if (!nSameRanks.length) return;
      const nSameRank = nSameRanks.reduce((acc, val) => Card.relativeOperation(acc) > Card.relativeOperation(val) ? acc : val);
      return cardsGroupedByRank[nSameRank].slice(0, n);
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
        return filteredHand.slice(0, 5);
      }
    }
  }

  getFullHouse(hand: Card[]): Card[] {
    if (hand.length < 5) return;
    const trips = this.getThreeOfAKind(hand);
    if (!trips) return;
    const pair = this.getPair(this.handUtil.remove(hand, trips));
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

  getTwoPair(hand: Card[]): Card[] {
    if (hand.length < 4) return;
    const highestRankedPair = this.getPair(hand);
    if (!highestRankedPair) return;
    const lowestRankingPair = this.getPair(this.handUtil.remove(hand, highestRankedPair));
    if (!lowestRankingPair) return;
    return [...highestRankedPair, ...lowestRankingPair];
  }

  getHighCards(hand: Card[], n: number): Card[] {
    if (!hand.length) return;
    return this.handUtil.reverseOrder(hand).slice(0, n || hand.length);
  }

  getKicker(hand: Card[], combination: Card[], requiredHandLength: number): Card[] {
    if (hand.length < requiredHandLength) return;
    const withoutCombination = this.handUtil.remove(hand, combination);
    return this.getHighCards(withoutCombination, requiredHandLength - combination.length);
  }

}
