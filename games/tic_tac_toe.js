import {dedup} from '../utils.js';
import {Some, None} from '../option.js';
import {NonTerminal, Terminal} from '../game.js';

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

export class TicTacToe {
  constructor() {
    this.array = [
      '-', '-', '-', '-', '-', '-', '-', '-', '-',
    ];
  }

  play(pip, square) {
    let clone = this.clone();
    if (!clone.unplayed().includes(square)) {
      return new None();
    }

    clone.array[square] = pip;

    for (let pattern of winPatterns) {
      let deduped = dedup(pattern.map(i => clone.array[i]));
      let winner = deduped.andThen(v => v === '-' ? new None() : new Some(v));
      if (winner.isSome()) {
        return new Some(new Terminal(winner));
      }
    }

    if (clone.unplayed().length === 0) {
      return new Some(new Terminal(new None()));
    }

    return new Some(new NonTerminal(clone));
  }

  unplayed() {
    return this.array.map((v, i) => [i, v]).filter(([_, v]) => v == '-').map(([i, _]) => i);
  }

  textRepresentation() {
    let t = this.array;
    return `${t[0]} ${t[1]} ${t[2]}
${t[3]} ${t[4]} ${t[5]}
${t[6]} ${t[7]} ${t[8]}`;
  }

  clone() {
    let clone = new TicTacToe();
    clone.array = this.array.slice();
    return clone;
  }
}

import {test, assert, assertEq} from '../test.js';

test('empty game can play anything', () => {
  let game = new TicTacToe();

  assertEq(game.unplayed().length, 9);
});

test('one move played can no longer play that move', () => {
  let game = new TicTacToe()
    .play('X', 0).unwrap().nonTerminal();

  assertEq(game.unplayed().length, 8);
  assert(!game.unplayed().includes(0));
  assert(game.unplayed().includes(1));

  game = game.play('O', 1).unwrap().nonTerminal();

  assert(!game.unplayed().includes(1));
});

test('attempting play over existing square is none', () => {
  let game = new TicTacToe().play('X', 0).unwrap().nonTerminal();

  assertEq(game.play('O', 0), new None());
});

test('X wins', () => {
  let game = new TicTacToe()
    .play('X', 0).unwrap().nonTerminal()
    .play('X', 1).unwrap().nonTerminal()
    .play('X', 2);

  assertEq(game, new Some(new Terminal(new Some('X'))));
});

test('draw', () => {
  let game = new TicTacToe()
    .play('X', 0).unwrap().nonTerminal()
    .play('X', 1).unwrap().nonTerminal()
    .play('O', 2).unwrap().nonTerminal()
    .play('O', 3).unwrap().nonTerminal()
    .play('O', 4).unwrap().nonTerminal()
    .play('X', 5).unwrap().nonTerminal()
    .play('X', 6).unwrap().nonTerminal()
    .play('X', 7).unwrap().nonTerminal()
    .play('O', 8)
  ;

  assertEq(game, new Some(new Terminal(new None())));
});
