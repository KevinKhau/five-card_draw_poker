import {createAction, props} from '@ngrx/store';
import {Card} from '../card';

export const set = createAction('[Deck] Set', props<{ deck: Card[] }>());
export const removeCard = createAction('[Deck] Remove card', props<{ card: Card }>());
export const removeCards = createAction('[Deck] Remove cards', props<{ cards: Card[] }>());
export const addCards = createAction('[Deck] Add cards', props<{cards: Card[]}>());
