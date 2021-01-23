import {Card, Suit} from '../../card';

export class HandUtil {

  static isFlush(hand: Card[]): boolean {
    if (hand.length < 5) return false;
    const suit: Suit = hand[0].suit;
    return hand.every(c => c.suit === suit);
  }

}
