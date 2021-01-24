import {Card, rankNumber, Suit} from '../../card';

export class HandUtil {

  static isFlush(hand: Card[]): boolean {
    if (hand.length < 5) return false;
    const suit: Suit = hand[0].suit;
    return hand.every(c => c.suit === suit);
  }

  static isStraight(hand: Card[]): boolean {
    if (hand.length < 5) return false;
    return hand.some(card => card.rank < 11 && [1, 2, 3, 4].every(i => this.hasUpper(card, i, hand)));
  }

  private static hasUpper(card: Card, difference: number, hand: Card[]): boolean {
    const positiveModulo = (n, mod) => (n % mod + mod) % mod;
    return hand.some(c => difference === positiveModulo(c.rank - card.rank, rankNumber) );
  }
}
