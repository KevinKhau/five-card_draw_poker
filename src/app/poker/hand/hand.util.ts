import {Card, rankNumber, Suit} from '../../card';
import {Injectable} from '@angular/core';

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

export interface FiveCardHand {
  isStraight(hand: Card[]): boolean;
  isFlush(hand: Card[]): boolean;
  isFullHouse(hand: Card[]): boolean;
  isFourOfAKind(hand: Card[]): boolean;
  isStraightFlush(hand: Card[]): boolean;
  isFiveOfAKind(hand: Card[]): boolean;
}

@Injectable({providedIn: 'root'})
export class HandUtil {

  isFlush(hand: Card[]): boolean {
    if (hand.length < 5) return false;
    const suit: Suit = hand[0].suit;
    return hand.every(c => c.suit === suit);
  }

  isStraight(hand: Card[]): boolean {
    if (hand.length < 5) return false;
    return hand.some(card => card.rank < 11 && [1, 2, 3, 4].every(i => this.hasUpper(card, i, hand)));
  }

  private hasUpper(card: Card, difference: number, hand: Card[]): boolean {
    const positiveModulo = (n, mod) => (n % mod + mod) % mod;
    return hand.some(c => difference === positiveModulo(c.rank - card.rank, rankNumber));
  }
}
