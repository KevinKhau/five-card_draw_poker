import {createSelector} from '@ngrx/store';
import {PokerState} from '../pokerState';

export const get = createSelector(
  (state: PokerState) => state.deck,
  (deck) => deck
);
