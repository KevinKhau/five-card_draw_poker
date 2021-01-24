import {HandUtil} from './hand.util';
import {Card, Suit} from '../../card';

const empty = [];
const highCard = [new Card(1, Suit.Club), new Card(2, Suit.Spade), new Card(4, Suit.Heart)];
const pair = [new Card(1, Suit.Club), new Card(4, Suit.Spade), new Card(4, Suit.Heart)];
const twoPair = [new Card(6, Suit.Club), new Card(6, Suit.Spade), new Card(4, Suit.Heart), new Card(4, Suit.Diamond)];
const threeOfAKind = [new Card(6, Suit.Club), new Card(4, Suit.Spade), new Card(4, Suit.Heart), new Card(4, Suit.Diamond)];
const straight = [new Card(5, Suit.Club), new Card(2, Suit.Spade), new Card(4, Suit.Heart), new Card(3, Suit.Heart),
  new Card(6, Suit.Heart)];
const flush = [new Card(1, Suit.Heart), new Card(12, Suit.Heart), new Card(6, Suit.Heart), new Card(9, Suit.Heart),
  new Card(10, Suit.Heart)];
const fullHouse = [new Card(6, Suit.Club), new Card(4, Suit.Spade), new Card(4, Suit.Heart), new Card(4, Suit.Diamond),
  new Card(6, Suit.Diamond)];
const fourOfAKind = [new Card(6, Suit.Diamond), new Card(4, Suit.Spade), new Card(4, Suit.Heart), new Card(4, Suit.Diamond),
  new Card(4, Suit.Club)];
const straightFlush = [new Card(6, Suit.Diamond), new Card(8, Suit.Diamond), new Card(7, Suit.Diamond), new Card(4, Suit.Diamond),
  new Card(5, Suit.Diamond)];
const royalFlush = [new Card(12, Suit.Diamond), new Card(13, Suit.Diamond), new Card(10, Suit.Diamond), new Card(11, Suit.Diamond),
  new Card(1, Suit.Diamond)];

fdescribe('HandUtil.isFlush', () => {
  it('givenEmpty_whenIsFlush_thenFalse', () => expect(HandUtil.isFlush(empty)).toBeFalsy);
  it('givenStraight_whenIsFlush_thenFalse', () => expect(HandUtil.isFlush(straight)).toBeFalsy());
  it('givenFlush_whenIsFlush_thenTrue', () => expect(HandUtil.isFlush(flush)).toBeTruthy());
});
