import {HandService} from './hand.service';
import {Card, Suit} from '../../card';
import {TestBed} from '@angular/core/testing';

describe('HandService', () => {
  let service: HandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

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
const eightWithInterlopingFullHouses = [new Card(6, Suit.Club), new Card(4, Suit.Spade), new Card(1, Suit.Diamond), new Card(6, Suit.Heart),
  new Card(4, Suit.Diamond), new Card(1, Suit.Club), new Card(6, Suit.Diamond), new Card(1, Suit.Spade)];
const flushAndFullHouse = [new Card(3), new Card(6), new Card(9), new Card(10), new Card(5),
  new Card(7), new Card(13), new Card(7), new Card(13), new Card(7)];

const handUtil = new HandService();
const handService = new HandService();
const arrayContents = jasmine.arrayWithExactContents;

describe('HandExtractor.getFlush', () => {
  it('givenEmpty_whenGetFlush_thenUndefined', () => expect(handService.getFlush(empty)).toBeUndefined());
  it('givenFlush_whenGetFlush_thenFlush', () => expect(handService.getFlush(flush)).toEqual(arrayContents(flush)));
  it('givenRoyalFlush_whenGetFlush_thenRoyalFlush', () => expect(handService.getFlush(royalFlush))
    .toEqual(arrayContents(royalFlush)));
  it('givenSevenWithFlush_whenGetFlush_thenValidFlush', () => expect(handService.getFlush(sevenWithFlush)).toEqual(
    arrayContents(sevenWithFlush.filter(card => card.suit !== Suit.Club && card.rank !== 2))));
  it('givenSevenWithRoyalFlush_whenGetFlush_thenValidFlush', () => expect(handService.getFlush(sevenWithRoyalFlush)).toEqual(
    arrayContents(sevenWithRoyalFlush.filter(card => card.suit !== Suit.Spade && card.rank !== 9))));
});

describe('HandExtractor.getStraightFlush', () => {
  it('givenEmpty_whenGetStraightFlush_thenUndefined', () => expect(handService.getStraightFlush(empty)).toBeUndefined());
  it('givenStraight_whenGetStraightFlush_thenUndefined', () => expect(handService.getStraightFlush(straight)).toBeUndefined());
  it('givenFlush_whenGetStraightFlush_thenUndefined', () => expect(handService.getStraightFlush(flush)).toBeUndefined());
  it('givenStraightFlush_whenGetStraightFlush_thenStraightFlush', () => expect(handService.getStraightFlush(straightFlush))
    .toEqual(arrayContents(straightFlush)));
  it('givenRoyalFlush_whenGetStraightFlush_thenRoyalFlush', () => expect(handService.getStraightFlush(royalFlush))
    .toEqual(arrayContents(royalFlush)));
  it('givenSevenWithStraight_whenGetStraightFlush_thenUndefined', () =>
    expect(handService.getStraightFlush(sevenWithStraight)).toBeUndefined());
  it('givenSevenWithFlush_whenGetStraightFlush_thenUndefined', () =>
    expect(handService.getStraightFlush(sevenWithFlush)).toBeUndefined());
  it('givenSevenWithRoyalFlush_whenGetStraightFlush_thenRoyalFlush', () =>
    expect(handService.getStraightFlush(sevenWithRoyalFlush))
      .toEqual(arrayContents(sevenWithRoyalFlush.filter(card => card.suit !== Suit.Spade && card.rank !== 9))));
});

describe('HandExtractor.getFourOfAKind', () => {
  it('givenEmpty_whenGetFourOfAKind_thenUndefined', () => expect(handService.getFourOfAKind(empty)).toBeUndefined());
  it('givenThreeOfAKind_whenGetFourOfAKind_thenUndefined', () => expect(handService.getFourOfAKind(threeOfAKind)).toBeUndefined());
  it('givenFourOfAKind_whenGetFourOfAKind_thenFourOfAKind', () =>
    expect(handService.getFourOfAKind(fourOfAKind).map(card => card.rank))
      .toEqual([4, 4, 4, 4]));
  it('givenFiveOfAKind_whenGetFourOfAKind_thenFourOfAKind', () =>
    expect(handService.getFourOfAKind(fiveOfAKind).map(card => card.rank))
      .toEqual([4, 4, 4, 4]));
  it('givenSevenWithFourOfAKind_whenGetFourOfAKind_thenFourOfAKind', () =>
    expect(handService.getFourOfAKind(sevenWithFourOfAKind).map(card => card.rank))
      .toEqual([4, 4, 4, 4]));
  it('givenSevenWithFiveOfAKind_whenGetFourOfAKind_thenFourOfAKind', () =>
    expect(handService.getFourOfAKind(sevenWithFiveOfAKind).map(card => card.rank))
      .toEqual([4, 4, 4, 4]));
});

describe('HandExtractor.getFullHouse', () => {
  it('givenEmpty_whenGetFullHouse_thenUndefined', () => expect(handService.getFullHouse(empty)).toBeUndefined());
  it('givenPair_whenGetFullHouse_thenUndefined', () => expect(handService.getFullHouse(threeWithPair)).toBeUndefined());
  it('givenThreeOfAKind_whenGetFullHouse_thenUndefined', () => expect(handService.getFullHouse(threeOfAKind)).toBeUndefined());
  it('givenFullHouse_whenGetFullHouse_thenFullHouse', () => expect(handService.getFullHouse(fullHouse))
    .toEqual(arrayContents(fullHouse)));
  it('givenFiveOfAKind_whenGetFullHouse_thenFiveOfAKind', () => expect(handService.getFullHouse(fiveOfAKind))
    .toEqual(arrayContents(fiveOfAKind)));
  it('givenSevenWithFullHouse_whenGetFullHouse_thenFullHouse', () =>
    expect(handService.getFullHouse(sevenWithAFullHouse).map(card => card.rank))
      .toEqual(arrayContents([4, 4, 4, 12, 12])));
  it('givenEightWithInterlopingFullHouses_whenGetFullHouse_thenBestFullHouse', () =>
    expect(handService.getFullHouse(eightWithInterlopingFullHouses).map(card => card.rank))
      .toEqual(arrayContents([1, 1, 1, 6, 6])));

});

describe('HandExtractor.getTwoPair', () => {
  it('givenEmpty_whenGetTwoPair_thenUndefined', () => expect(handService.getTwoPair(empty)).toBeUndefined());
  it('givenPair_whenGetTwoPair_thenUndefined', () => expect(handService.getTwoPair(threeWithPair)).toBeUndefined());
  it('givenFourWithTwoPair_whenGetTwoPair_thenFourWithTwoPair', () => expect(handService.getTwoPair(fourWithTwoPair))
    .toEqual(arrayContents(fourWithTwoPair)));
  it('givenFiveWithTwoPair_whenGetTwoPair_thenFiveWithTwoPair', () => expect(handService.getTwoPair(fiveWithTwoPair))
    .toEqual(arrayContents(fiveWithTwoPair.filter(card => card.rank !== 4))));
  it('givenFourOfAKind_whenGetTwoPair_thenTwoPair', () => expect(handService.getTwoPair(fourOfAKind))
    .toEqual(arrayContents(fourOfAKind.filter(card => card.rank === 4))));
  it('givenEightWithInterlopingFullHouses_whenGetTwoPair_thenTwoBestPairWithBestKicker', () =>
    expect(handService.getTwoPair(eightWithInterlopingFullHouses).map(card => card.rank))
      .toEqual([1, 1, 6, 6]));
});

describe('HandExtractor.getPair', () => {
  it('givenEmpty_whenGetPair_thenUndefined', () => expect(handService.getPair(empty)).toBeUndefined());
  it('givenThreeWithPair_whenGetPair_thenPair', () => expect(handService.getPair(threeWithPair))
    .toEqual(threeWithPair.filter(card => card.rank === 4)));
  it('givenPair_whenGetPair_thenPair', () =>
    expect(handService.getPair(pair).map(card => card.rank))
      .toEqual([8, 8]));
  it('givenThreeOfAKind_whenGetPair_thenPair', () =>
    expect(handService.getPair(threeOfAKind).map(card => card.rank))
      .toEqual([4, 4]));
  it('givenTwoPair_whenGetPair_thenBestPair', () => expect(handService.getPair(empty)).toBeUndefined());
});

describe('HandExtractor.getHighCard', () => {
  const getHighCards = (hand: Card[]) => handService.getHighCards(hand, handUtil.minimumHandNumber);
  it('givenEmpty_whenGetHighCards_thenUndefined', () => expect(getHighCards(empty)).toBeUndefined());
  it('givenFlush_whenGetHighCards_thenOrderedFlush', () =>
    expect(getHighCards(flush).map(card => card.rank))
      .toEqual([1, 12, 10, 9, 6]));
});

describe('handExtractor.getBest', () => {
  const getBestCards = (hand) => handService.getBest(hand).cards;
  it('givenEmpty_whenGetBest_thenUndefined', () => expect(handService.getBest(empty)).toBeUndefined());
  it('givenEightWithInterlopingFullHouses_whenGetBest_thenFullHouse', () => {
    const result = handService.getBest(eightWithInterlopingFullHouses);
    expect(result.cards.map(card => card.rank)).toEqual([1, 1, 1, 6, 6]);
    expect(result.name).toEqual('Full House');
  });
  it('givenFiveWithTwoPair_whenGetBest_thenTwoPair', () => {
    const result = handService.getBest(fiveWithTwoPair);
    expect(result.cards.map(card => card.rank)).toEqual([1, 1, 6, 6]);
    expect(result.name).toEqual('Two Pair');
  });
  it('givenFlush_whenGetBest_thenFlush', () =>
    expect(getBestCards(flush).map(card => card.rank))
      .toEqual([1, 12, 10, 9, 6]));
  it('givenRoyalStraight_whenGetBest_thenRoyalStraight', () =>
    expect(getBestCards(royalStraight).map(card => card.rank))
      .toEqual([1, 13, 12, 11, 10]));
  it('givenSevenWithFiveOfAKind_whenGetBest_thenRoyalStraight', () => {
    const result = handService.getBest(sevenWithFiveOfAKind);
    expect(result.cards.map(card => card.rank)).toEqual([4, 4, 4, 4, 4]);
    expect(result.name).toEqual('Five Of A Kind');
  });
  it('givenFlushAndFullHouse_whenGetBest_thenFullHouse', () =>
    expect(getBestCards(flushAndFullHouse).map(card => card.rank))
      .toEqual([7, 7, 7, 13, 13]));
});
