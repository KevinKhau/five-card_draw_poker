import {HandUtil} from './hand.util';
import {Card, Suit} from '../../card';

const empty = [];
const highCard = [new Card(1, Suit.Club), new Card(2, Suit.Spade), new Card(4, Suit.Heart)];
const pair = [new Card(1, Suit.Club), new Card(4, Suit.Spade), new Card(4, Suit.Heart)];
const twoPair = [new Card(6, Suit.Club), new Card(6, Suit.Spade), new Card(4, Suit.Heart), new Card(4, Suit.Diamond)];
const threeOfAKind = [new Card(6, Suit.Club), new Card(4, Suit.Spade), new Card(4, Suit.Heart), new Card(4, Suit.Diamond)];
const straight = [new Card(5, Suit.Club), new Card(2, Suit.Spade), new Card(4, Suit.Heart), new Card(3, Suit.Heart),
  new Card(6, Suit.Heart)];
const wheelStraight = [new Card(1, Suit.Club), new Card(2, Suit.Spade), new Card(4, Suit.Heart), new Card(3, Suit.Heart),
  new Card(13, Suit.Heart)];
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

const handUtil = new HandUtil();

describe('HandUtil.isFlush', () => {
  it('givenEmpty_whenIsFlush_thenFalse', () => expect(handUtil.isFlush(empty)).toBeFalsy());
  it('givenStraight_whenIsFlush_thenFalse', () => expect(handUtil.isFlush(straight)).toBeFalsy());
  it('givenFlush_whenIsFlush_thenTrue', () => expect(handUtil.isFlush(flush)).toBeTruthy());
});

describe('HandUtil.isStraight', () => {
  it('givenEmpty_whenIsStraight_thenFalse', () => expect(handUtil.isStraight(empty)).toBeFalsy());
  it('givenHighCard_whenIsStraight_thenFalse', () => expect(handUtil.isStraight(highCard)).toBeFalsy());
  it('givenWheelStraight_whenIsStraight_thenFalse', () => expect(handUtil.isStraight(wheelStraight)).toBeFalsy());
  it('givenStraight_whenIsStraight_thenTrue', () => expect(handUtil.isStraight(straight)).toBeTruthy());
  it('givenFlush_whenIsStraight_thenFalse', () => expect(handUtil.isStraight(flush)).toBeFalsy());
  it('givenStraightFlush_whenIsStraight_thenTrue', () => expect(handUtil.isStraight(straightFlush)).toBeTruthy());
  it('givenRoyalFlush_whenIsStraight_thenTrue', () => expect(handUtil.isStraight(royalFlush)).toBeTruthy());
});
