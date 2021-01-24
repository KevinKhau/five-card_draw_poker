import {Pipe, PipeTransform} from '@angular/core';
import {Suit} from '../card';

/**
 * Suit value to symbol
 */
@Pipe({name: 'suit'})
export class SuitPipe implements PipeTransform {
  transform(value): string {
    switch (value) {
      case Suit.Club:
        return '♣';
      case Suit.Diamond:
        return '♦';
      case Suit.Heart:
        return '♥';
      case Suit.Spade:
        return '♠';
      default:
        return value;
    }
  }
}
