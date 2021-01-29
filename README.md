# About this project

This project is an implementation of the Five Card Draw, a poker variant. Some have difficulties understanding which hand is the best, so I made this version directly highlighting that. :smile:

## The Five Card Draw, poker variant

Find more about it: https://en.wikipedia.org/wiki/Five-card_draw

As a reminder, here are the possible hands:

Code rank | Name | Pre-draw probability
--- | --- | ---
9 | Straight flush | <0.003%
8 | Four of a kind | 0.02%
7 | Full house | 0.14%
6 | Flush | 0.20%
5 | Straight | 0.39%
4 | Three of a kind | 2.11%
3 | Two pair | 4.75%
2 | One pair | 42.30%
1 | High card | 50.10%

## Application screenshot
![Screenshot](src/assets/FiveCardDrawScreenshot.png)

## The Deck

There is initially a deck of 52 cards, ranked from 2 to 10 then J to A, each with a suit: Spade, Heart, Diamond, Club. Thus, every card is unique. There is no joker.

The deck cards are then distributed to the hands.

## Player Hand
Every player starts with a five-card hand, picked randomly.

The player name is customisable.

### Hand comparison
The cards making up the best hand combination are highlighted, and the hand name is displayed above.

Moreover, the player having the best hand gets its background colored. For instance, the above hands are ordered like so:
1. Flush
2. Two Pair
3. Pair
4. High Card

If two players have the same best hand (flush and flush), their cards making them up are compared, for example:
1. Flush (A, K, Q, 8, 2)
2. Flush (K, Q, 10, 7, 4)

If these cards are still equal, the kickers are compared:
1. Two Pair (10, 10, 5, 5) + Kicker J
2. Two Pair (10, 10, 5, 5) + Kicker 8

Kickers are the additional cards which are not included in the combination, but that are still considered in a five-card hand. Relevant for four of a kind, three of a kind, two pair, pair, high card, which do not have five cards.

## Drawing new cards

Clicking on a card will select it, in order to throw it away. Selected cards get their borders grey and thicker.

Clicking on the `DRAW` button tosses these cards away. Every player then randomly draws up to `5` cards remaining in the deck. The tossed cards are then added to the deck. In other words, while drawing, one player can only draw currently visible cards in the decks, and not their or another player's cards.

There is no limit to the possible number of draws.

# Setting up the project

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.0.

### Installing the modules

From the source folder, run `npm install` to install the required modules. In addition to a default Angular project, `@angular/material` is used for some design.  

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change and save any of the source files.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Multiple unit tests have been set to check hand extractions: getting straight, flush, full house, high cards.

# Technical achievements

## Programming tools

* Angular 11.1.0
* TypeScript 4.1.2
* JavaScript ES6
* Karma and Jasmine for unit tests
* Angular Material for design
* GitHub for versioning
* IntelliJ IDEA 2020.3

### Skipped

Have been considered, but were skipped:

* **@Angular/ngrx** : while used at some point, it brought too much complexity to share only an array of cards through the application. We had heavily used it in a client project in the past, and all the data revolved around the redux store, and any data feature required to cross multiple layers of data sharing systems. Here ngrx has been replaced by `DeckStoreService`, a simple, easily readable state manager service.
  
* **Material Design for Bootstrap (Angular version)**: The column layout implement and responsiveness would have been a nice bonus, but the CSS property `display: inline-flex` was enough to display player hands side by side 

* **Sass: Syntactically Awesome Style Sheet**: Not enough parent/child depth complexity to avoid.

## The Card class

Card properties:
* `rank: number` A is ranked 1, 2 is ranked 2, 10 10, 11 J, 12 Q, 13 K.
* `suit: Suit` enum which equals Spade, Heart, Diamond or Club.
* `id: string` to deal with potential card duplicates, as in some unique tests.

## The Deck Store Service

Deck Store Service is a simple state manager. It creates the initial deck, then gives cards on request with `#drawCards`.

To move cards back from a hand to the deck, the `HandComponent` uses `addCards`.

## The Hand Service

Used for hand analysis operation such as extracting combinations like straights, flushes, pairs, it can actually deal with *more than 5 cards*, actually any number of cards.

There is a compilation of unit tests to assert hands are correctly extracted.

The `getBest` method groups the extraction methods in an ordered array. Then it applies them one after another and associates a `rank` and a `name` based on the used method. It associates to `cards` the result of the method call, and to `kicker` the additional cards if some are missing to have a full hand.

While a similar method could have been used to compare two full hands and be used in a `#sort` function, it would have not given a `name` to every 
hand. This latter appears in the user interface, and the hand `rank` can then be used for instant comparison.

## User Interface

The deck and hands contain a `ul`, and every card is a `li`. CSS is used to give them a rectangular shape and display them inline.

Every player hand is assimilated to a matCard component.

## In addition...

All errors and warnings have been checked. On the web console, there is none. On my IntelliJ IDE, I fixed most and carefully ignored some.

# Contributing

In this light and easy to catch up Angular project, any contribution is welcome. While it has no big commercial or technical pretension, I gladly share it for learning, practice and community purpose.

Check the [issues](https://github.com/KevinKhau/five-card_draw_poker/issues) for contribution ideas. I'll make sure to deal with [pull requests](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) ASAP.

# Credits

[Kévin Khau](https://github.com/KevinKhau), kevin.khau@outlook.fr

[stack overflow](https://stackoverflow.com/users/9527665/h0ly) [LinkedIn](https://www.linkedin.com/in/k%C3%A9vinkhau/) [CodinGame](https://www.codingame.com/profile/31c307e2b23fbab97d5a4550d0b59b666836881)

# [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/#)
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.
