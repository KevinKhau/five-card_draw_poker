import {positiveModulo} from './util';

export const rankNumber = 13;

export class Card {

  constructor(rank: number, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }
  rank: number;
  suit: Suit;

  /**
   * Operation used to sort cards based on their actual rank strength.
   * @param n card's technical rank
   */
  static relativeOperation = n => positiveModulo(n - 2, rankNumber);

  /**
   * In the given hand, has a card ranked `difference` lower
   * @param difference Search difference of ranking
   * @param hand Hand of cards to search in
   */
  hasLower(difference: number, hand: Card[]): boolean {
    return hand.some(c => difference === this.compareRank(c));
  }

  /**
   * In the given hand, gets a card ranked `difference` lower
   * @param difference Search difference of ranking
   * @param hand Hand of cards to search in
   * @return The lower-ranked card, or undefined if not found
   */
  getLower(difference: number, hand: Card[]): Card {
    return hand.find(c => difference === this.compareRank(c));
  }

  /**
   * @param other Another card
   * @return
   * Positive : `this` is ranked higher,
   * 0 : Equality
   * Negative: `other` is ranked higher
   */
  compareRank(other: Card): number {
    return this.relativeRanking() - other.relativeRanking();
  }

  /**
   * Attributes the relative 'strength' of a card depending on their technical ranking.
   * In poker, the Ace is ranked the highest, so for a card ranked 1, this method returns 12. 2 returns 0, and King 11.
   */
  relativeRanking(): number {
    return Card.relativeOperation(this.rank);
  }

}

export enum Suit {
  Club = 'club',
  Diamond = 'diamond',
  Heart = 'heart',
  Spade = 'spade'
}
