import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {PokerComponent} from './poker/poker.component';
import {HandComponent} from './poker/hand/hand.component';
import {SuitPipe} from './poker/suit.pipe';
import {RankPipe} from './poker/rank.pipe';

const components = [
  AppComponent,
  PokerComponent,
  HandComponent
];

const pipes = [
  SuitPipe,
  RankPipe
];

@NgModule({
  declarations: [
    ...components,
    ...pipes
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'poker', component: PokerComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
