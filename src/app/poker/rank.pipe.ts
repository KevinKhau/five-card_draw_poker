import {Pipe, PipeTransform} from '@angular/core';
import {Suit} from '../card';

/**
 * Suit value to symbol
 */
@Pipe({name: 'rank'})
export class RankPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'A';
      case 11:
        return 'J';
      case 12:
        return 'Q';
      case 13:
        return 'K';
      default:
        return value.toString();
    }
  }
}
