import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {PokerComponent} from './poker/poker.component';
import {HandComponent} from './poker/hand/hand.component';
import {SuitPipe} from './poker/suit.pipe';
import {RankPipe} from './poker/rank.pipe';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

const components = [
  AppComponent,
  PokerComponent,
  HandComponent
];

export const pipes = [
  SuitPipe,
  RankPipe
];

export const material = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  BrowserAnimationsModule
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
    ...material,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
