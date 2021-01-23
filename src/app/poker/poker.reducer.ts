import {addCards, removeCard, removeCards, set} from './poker.action';
import {createReducer, on} from '@ngrx/store';
import {Card} from '../card';

export const initialState = [];

export const deckReducer = createReducer<Card[], any>(
  initialState,
  on(set, (_, {deck}) => deck),
  on(removeCard, (deck, {card}) => deck.filter(c => c !== card)),
  on(removeCards, (deck, {cards}) => deck.filter(c => !cards.includes(c))),
  on(addCards, (deck, {cards}) => {
    return [...deck, ...cards];
  })
);

