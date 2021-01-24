import {positiveModulo} from './util';

export const rankNumber = 13;

export class Card {
  rank: number;
  suit: Suit;

  constructor(rank: number, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

  /**
   * In the given hand, has a card ranked `difference` lower
   * @param difference Search difference of ranking
   * @param hand Hand of cards to search in
   */
  hasLower(difference: number, hand: Card[]): boolean {
    return hand.some(c => difference === positiveModulo(this.rank - c.rank, rankNumber));
  }

  /**
   * In the given hand, gets a card ranked `difference` lower
   * @param difference Search difference of ranking
   * @param hand Hand of cards to search in
   * @return The lower-ranked card, or undefined if not found
   */
  getLower(difference: number, hand: Card[]): Card {
    return hand.find(c => difference === positiveModulo(this.rank - c.rank, rankNumber));
  }

}

export enum Suit {
  Club = 'club',
  Diamond = 'diamond',
  Heart = 'heart',
  Spade = 'spade'
}
