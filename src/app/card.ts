export const rankNumber = 13;

export class Card {
  rank: number;
  suit: Suit;

  constructor(rank: number, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

}

export enum Suit {
  Club = 'Trèfle',
  Diamond = 'Carreau',
  Heart = 'Coeur',
  Spade = 'Pique'
}
