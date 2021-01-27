import {rankNumber, Suit} from '../card';
import {TestBed} from '@angular/core/testing';
import {DeckStoreService} from './deck-store.service';

describe('DeckStoreService', () => {
  let service: DeckStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeckStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('givenComponentBuilt_whenBuildDeck_thenValidDeck', () => {
    const deck = service.buildDeck();
    expect(deck).toBeDefined();
    expect(deck.length).toEqual(rankNumber * Object.keys(Suit).length);
    const uniqueDeck = deck.filter((value, index, self) => self.indexOf(value) === index);
    expect(deck).toEqual(uniqueDeck);
    const suitKeys: string[] = Object.keys(Suit).filter(key => isNaN(Number(key)));
    suitKeys.forEach(key => {
      expect(deck.filter(card => card.suit === Suit[key]).length).toEqual(rankNumber);
    });
    Array.from({length: rankNumber}, (_, i) => i + 1).forEach(rank => {
      expect(deck.filter(card => card.rank === rank).length).toEqual(suitKeys.length);
    });
  });

});


