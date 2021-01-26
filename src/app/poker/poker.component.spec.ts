import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerComponent } from './poker.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialState} from './poker.reducer';
import {Card, rankNumber, Suit} from '../card';

describe('PokerComponent', () => {
  let component: PokerComponent;
  let fixture: ComponentFixture<PokerComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokerComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('givenComponentBuilt_whenBuildDeck_thenValidDeck', () => {
    const deck = component.buildDeck();
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
