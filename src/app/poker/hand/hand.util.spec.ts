import {FiveCardHandExtractorImpl, HandUtil} from './hand.util';
import {Card, Suit} from '../../card';

const empty = [];
const highCard = [new Card(1, Suit.Club), new Card(2, Suit.Spade), new Card(4, Suit.Heart), new Card(13, Suit.Heart)];
const threeWithPair = [new Card(1, Suit.Club), new Card(4, Suit.Spade), new Card(4, Suit.Heart)];
const pair = [new Card(1, Suit.Club), new Card(4, Suit.Spade), new Card(8, Suit.Spade), new Card(13, Suit.Heart), new Card(8, Suit.Club)];
const fourWithTwoPair = [new Card(4, Suit.Club), new Card(1, Suit.Club), new Card(4, Suit.Spade), new Card(1, Suit.Heart)];
const fiveWithTwoPair = [new Card(4, Suit.Club), new Card(1, Suit.Club), new Card(6, Suit.Spade), new Card(1, Suit.Heart),
  new Card(6, Suit.Diamond)];
const threeOfAKind = [new Card(6, Suit.Club), new Card(4, Suit.Spade), new Card(4, Suit.Heart), new Card(4, Suit.Diamond)];
const straight = [new Card(5, Suit.Club), new Card(2, Suit.Spade), new Card(4, Suit.Heart), new Card(3, Suit.Heart),
  new Card(6, Suit.Heart)];
const wheelStraight = [new Card(1, Suit.Club), new Card(2, Suit.Spade), new Card(4, Suit.Heart), new Card(3, Suit.Heart),
  new Card(13, Suit.Heart)];
const royalStraight = [new Card(1, Suit.Club), new Card(12, Suit.Spade), new Card(11, Suit.Heart), new Card(10, Suit.Heart),
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
const fiveOfAKind = [new Card(4, Suit.Diamond), new Card(4, Suit.Spade), new Card(4, Suit.Heart), new Card(4, Suit.Diamond),
  new Card(4, Suit.Club)];

const sevenWithStraight = [new Card(1, Suit.Spade), new Card(5, Suit.Club), new Card(8, Suit.Club), new Card(6, Suit.Heart),
  new Card(9, Suit.Spade), new Card(2, Suit.Club), new Card(7, Suit.Diamond)];
const sevenWithFlush = [new Card(1, Suit.Heart), new Card(10, Suit.Club), new Card(12, Suit.Heart), new Card(6, Suit.Heart),
  new Card(9, Suit.Heart), new Card(2, Suit.Heart), new Card(10, Suit.Heart)];
const sevenWithRoyalFlush = [new Card(10, Suit.Spade), new Card(12, Suit.Diamond), new Card(13, Suit.Diamond),
  new Card(10, Suit.Diamond), new Card(9, Suit.Diamond), new Card(11, Suit.Diamond), new Card(1, Suit.Diamond)];
const sevenWithFourOfAKind = [new Card(6, Suit.Diamond), new Card(4, Suit.Spade), new Card(4, Suit.Heart), new Card(12, Suit.Diamond),
  new Card(4, Suit.Diamond), new Card(4, Suit.Club), new Card(7, Suit.Heart)];
const sevenWithFiveOfAKind = [new Card(4, Suit.Diamond), new Card(4, Suit.Spade), new Card(7, Suit.Heart), new Card(4, Suit.Heart),
  new Card(4, Suit.Diamond), new Card(4, Suit.Club), new Card(13, Suit.Diamond)];
const sevenWithAFullHouse = [new Card(12, Suit.Diamond), new Card(6, Suit.Club), new Card(4, Suit.Spade), new Card(4, Suit.Heart),
  new Card(4, Suit.Diamond), new Card(12, Suit.Club), new Card(6, Suit.Diamond)];
const eightWithInterlopingFullHouses = [new Card(6, Suit.Club), new Card(4, Suit.Spade), new Card(1, Suit.Diamond), new Card(4, Suit.Heart),
  new Card(4, Suit.Diamond), new Card(1, Suit.Club), new Card(6, Suit.Diamond), new Card(1, Suit.Spade)];

const handUtil = new HandUtil();
const handExtractor = new FiveCardHandExtractorImpl();
const arrayContents = jasmine.arrayWithExactContents;

describe('HandUtil.isFlush', () => {
  it('givenEmpty_whenIsFlush_thenFalse', () => expect(handUtil.isFlush(empty)).toBeFalsy());
  it('givenStraight_whenIsFlush_thenFalse', () => expect(handUtil.isFlush(straight)).toBeFalsy());
  it('givenFlush_whenIsFlush_thenTrue', () => expect(handUtil.isFlush(flush)).toBeTruthy());
});

describe('HandUtil.isStraight', () => {
  it('givenEmpty_whenIsStraight_thenFalse', () => expect(handUtil.isStraight(empty)).toBeFalsy());
  it('givenHighCard_whenIsStraight_thenFalse', () => expect(handUtil.isStraight(highCard)).toBeFalsy());
  it('givenWheelStraight_whenIsStraight_thenFalse', () => expect(handUtil.isStraight(wheelStraight)).toBeFalsy());
  it('givenRoyalStraight_whenIsStraight_thenFalse', () => expect(handUtil.isStraight(royalStraight)).toBeTruthy());
  it('givenStraight_whenIsStraight_thenTrue', () => expect(handUtil.isStraight(straight)).toBeTruthy());
  it('givenFlush_whenIsStraight_thenFalse', () => expect(handUtil.isStraight(flush)).toBeFalsy());
  it('givenStraightFlush_whenIsStraight_thenTrue', () => expect(handUtil.isStraight(straightFlush)).toBeTruthy());
  it('givenRoyalFlush_whenIsStraight_thenTrue', () => expect(handUtil.isStraight(royalFlush)).toBeTruthy());
});

describe('HandExtractor.getFlush', () => {
  it('givenEmpty_whenGetFlush_thenUndefined', () => expect(handExtractor.getFlush(empty)).toBeUndefined());
  it('givenFlush_whenGetFlush_thenFlush', () => expect(handExtractor.getFlush(flush)).toEqual(arrayContents(flush)));
  it('givenRoyalFlush_whenGetFlush_thenRoyalFlush', () => expect(handExtractor.getFlush(royalFlush))
    .toEqual(arrayContents(royalFlush)));
  it('givenSevenWithFlush_whenGetFlush_thenValidFlush', () => expect(handExtractor.getFlush(sevenWithFlush)).toEqual(
    arrayContents(sevenWithFlush.filter(card => card.suit !== Suit.Club && card.rank !== 2))));
  it('givenSevenWithRoyalFlush_whenGetFlush_thenValidFlush', () => expect(handExtractor.getFlush(sevenWithRoyalFlush)).toEqual(
    arrayContents(sevenWithRoyalFlush.filter(card => card.suit !== Suit.Spade && card.rank !== 9))));
});

describe('HandExtractor.getStraightFlush', () => {
  it('givenEmpty_whenGetStraightFlush_thenUndefined', () => expect(handExtractor.getStraightFlush(empty)).toBeUndefined());
  it('givenStraight_whenGetStraightFlush_thenUndefined', () => expect(handExtractor.getStraightFlush(straight)).toBeUndefined());
  it('givenFlush_whenGetStraightFlush_thenUndefined', () => expect(handExtractor.getStraightFlush(flush)).toBeUndefined());
  it('givenStraightFlush_whenGetStraightFlush_thenStraightFlush', () => expect(handExtractor.getStraightFlush(straightFlush))
    .toEqual(arrayContents(straightFlush)));
  it('givenRoyalFlush_whenGetStraightFlush_thenRoyalFlush', () => expect(handExtractor.getStraightFlush(royalFlush))
    .toEqual(arrayContents(royalFlush)));
  it('givenSevenWithStraight_whenGetStraightFlush_thenUndefined', () =>
    expect(handExtractor.getStraightFlush(sevenWithStraight)).toBeUndefined());
  it('givenSevenWithFlush_whenGetStraightFlush_thenUndefined', () =>
    expect(handExtractor.getStraightFlush(sevenWithFlush)).toBeUndefined());
  it('givenSevenWithRoyalFlush_whenGetStraightFlush_thenRoyalFlush', () =>
    expect(handExtractor.getStraightFlush(sevenWithRoyalFlush))
      .toEqual(arrayContents(sevenWithRoyalFlush.filter(card => card.suit !== Suit.Spade && card.rank !== 9))));
});

describe('HandExtractor.getFourOfAKind', () => {
  it('givenEmpty_whenGetFourOfAKind_thenUndefined', () => expect(handExtractor.getFourOfAKind(empty)).toBeUndefined());
  it('givenThreeOfAKind_whenGetFourOfAKind_thenUndefined', () => expect(handExtractor.getFourOfAKind(threeOfAKind)).toBeUndefined());
  it('givenFourOfAKind_whenGetFourOfAKind_thenFourOfAKind', () =>
    expect(handExtractor.getFourOfAKind(fourOfAKind).map(card => card.rank))
      .toEqual([4, 4, 4, 4, 6]));
  it('givenFiveOfAKind_whenGetFourOfAKind_thenFourOfAKind', () =>
    expect(handExtractor.getFourOfAKind(fiveOfAKind).map(card => card.rank))
      .toEqual([4, 4, 4, 4, 4]));
  it('givenSevenWithFourOfAKind_whenGetFourOfAKind_thenFourOfAKind', () =>
    expect(handExtractor.getFourOfAKind(sevenWithFourOfAKind).map(card => card.rank))
      .toEqual([4, 4, 4, 4, 12]));
  it('givenSevenWithFiveOfAKind_whenGetFourOfAKind_thenFourOfAKind', () =>
    expect(handExtractor.getFourOfAKind(sevenWithFiveOfAKind).map(card => card.rank))
      .toEqual([4, 4, 4, 4, 13]));
});

describe('HandExtractor.getFullHouse', () => {
  it('givenEmpty_whenGetFullHouse_thenUndefined', () => expect(handExtractor.getFullHouse(empty)).toBeUndefined());
  it('givenPair_whenGetFullHouse_thenUndefined', () => expect(handExtractor.getFullHouse(threeWithPair)).toBeUndefined());
  it('givenThreeOfAKind_whenGetFullHouse_thenUndefined', () => expect(handExtractor.getFullHouse(threeOfAKind)).toBeUndefined());
  it('givenFullHouse_whenGetFullHouse_thenFullHouse', () => expect(handExtractor.getFullHouse(fullHouse))
    .toEqual(arrayContents(fullHouse)));
  it('givenSevenWithFullHouse_whenGetFullHouse_thenFullHouse', () =>
    expect(handExtractor.getFullHouse(sevenWithAFullHouse).map(card => card.rank))
      .toEqual(arrayContents([4, 4, 4, 12, 12])));
  it('givenEightWithInterlopingFullHouses_whenGetFullHouse_thenBestFullHouse', () =>
    expect(handExtractor.getFullHouse(eightWithInterlopingFullHouses).map(card => card.rank))
      .toEqual(arrayContents([1, 1, 1, 6, 6])));

});

describe('HandExtractor.getTwoPair', () => {
  it('givenEmpty_whenGetTwoPair_thenUndefined', () => expect(handExtractor.getTwoPair(empty)).toBeUndefined());
  it('givenPair_whenGetTwoPair_thenUndefined', () => expect(handExtractor.getTwoPair(threeWithPair)).toBeUndefined());
  it('givenFourWithTwoPair_whenGetTwoPair_thenUndefined', () => expect(handExtractor.getTwoPair(fourWithTwoPair))
    .toBeUndefined());
  it('givenFiveWithTwoPair_whenGetTwoPair_thenFiveWithTwoPair', () => expect(handExtractor.getTwoPair(fiveWithTwoPair))
    .toEqual(arrayContents(fiveWithTwoPair)));
  it('givenFourOfAKind_whenGetTwoPair_thenTwoPair', () => expect(handExtractor.getTwoPair(fourOfAKind))
    .toEqual(arrayContents(fourOfAKind)));
  it('givenEightWithInterlopingFullHouses_whenGetTwoPair_thenTwoBestPairWithBestKicker', () =>
    expect(handExtractor.getTwoPair(eightWithInterlopingFullHouses).map(card => card.rank))
      .toEqual([1, 1, 6, 6, 1]));
});

describe('HandExtractor.getPair', () => {
  it('givenEmpty_whenGetPair_thenUndefined', () => expect(handExtractor.getPair(empty)).toBeUndefined());
  it('givenThreeWithPair_whenGetPair_thenUndefined', () => expect(handExtractor.getPair(threeWithPair)).toBeUndefined());
  it('givenPair_whenGetPair_thenPair', () =>
    expect(handExtractor.getPair(pair).map(card => card.rank))
      .toEqual([8, 8, 1, 13, 4]));
  it('givenThreeOfAKind_whenGetPair_thenPairWithBestKicker', () => expect(handExtractor.getPair(threeOfAKind)).toBeUndefined());
  it('givenTwoPair_whenGetPair_thenBestPair', () => expect(handExtractor.getPair(empty)).toBeUndefined());

});

describe('HandExtractor.getHighCard', () => {

});
