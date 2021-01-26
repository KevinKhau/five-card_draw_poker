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
  getThreeOfAKind(hand: Card[]): Card[];
  getTwoPair(hand: Card[]): Card[];
  getPair(hand: Card[]): Card[];

  /**
   * Returns rank-sorted hand.
   * @param hand input hand
   * @param n the number of cards in the returned hand
   */
  getHighCard(hand: Card[], n: number): Card[];
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

  getPair = this.getSameOfAKind(2, this.handUtil.minimumHandNumber);
  getThreeOfAKind = this.getSameOfAKind(3, this.handUtil.minimumHandNumber);
  getFourOfAKind = this.getSameOfAKind(4, this.handUtil.minimumHandNumber);
  getFiveOfAKind = this.getSameOfAKind(5, this.handUtil.minimumHandNumber);

  /**
   * Generates a function with required number of best same-rank cards
   * @param n required number of equal-rank cards
   * @param requiredNumber required number of returned cards, which will have the best rank
   */
  private getSameOfAKind(n: number, requiredNumber?: number): (hand: Card[], nRequired?: number) => Card[] {
    return (hand: Card[], nRequired = requiredNumber) => {
      if (hand.length < requiredNumber)  return;
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
      const result = cardsGroupedByRank[nSameRank].slice(0, n);

      const handWithoutResult = hand.filter(card => !result.includes(card));
      const diff = nRequired - result.length;
      return diff ? result.concat(this.handUtil.reverseOrder(handWithoutResult).slice(0, diff)) : result;
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
    const trips = this.getSameOfAKind(3, 3)(hand);
    if (!trips) return;
    hand = hand.filter(card => !trips.includes(card));
    const pair = this.getSameOfAKind(2, 2)(hand);
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
    const highestRankedPair = this.getSameOfAKind(2, 2)(hand);
    if (!highestRankedPair) return;
    hand = hand.filter(card => !highestRankedPair.includes(card));
    const lowestRankingPairAndKicker = this.getSameOfAKind(2, this.handUtil.minimumHandNumber - 2)(hand);
    if (!lowestRankingPairAndKicker)  return;
    return [...highestRankedPair, ...lowestRankingPairAndKicker];
  }

  getHighCard(hand: Card[], n: number): Card[] {
    if (!hand.length) return;
    return [...hand].sort((c1, c2) => c1.compareRank(c2))
      .slice(0, n);
  }

  getKicker(hand: Card[], combination: Card[], wholeHandLength: number): Card[] {
    if (hand.length >= wholeHandLength) return;
    const handWithoutResult = hand.filter(card => !combination.includes(card));
    const diff = wholeHandLength - hand.length;
    return diff ? hand.concat(this.handUtil.reverseOrder(handWithoutResult).slice(0, diff)) : hand;
  }

}
