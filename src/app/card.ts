import {positiveModulo} from './util';

export const rankNumber = 13;

export class Card {

  constructor(rank: number, suit: Suit = Suit.Club) {
    this.rank = rank;
    this.suit = suit;
    this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
  }

  /**
   * A is ranked 1. 2 is ranked 2, 10 10, 11 is Jack, 12 Queen, 13 King.
   * A is the highest ranked, so relative ranking and comparison methods are also provided.
   */
  rank: number;
  suit: Suit;

  /**
   * Unique identifier. While cards in a deck are unique given their rank and their suit, there are duplicates in unit tests.
   * This id prevents potential bugs if one decides to have more than one deck.
   */
  id?: string;

  /**
   * Operation used to sort cards based on their actual rank strength.
   * @param n card's technical rank
   */
  static relativeOperation = n => positiveModulo(n - 2, rankNumber);

  /**
   * In the given hand, gets a card ranked `difference` lower.
   *
   * @param difference Search difference of ranking
   * @param hand Hand of cards to search in
   * @return The lower-ranked card, or undefined if not found
   */
  getLower(difference: number, hand: Card[]): Card {
    return hand.find(c => difference === positiveModulo(this.compareRank(c), rankNumber));
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
