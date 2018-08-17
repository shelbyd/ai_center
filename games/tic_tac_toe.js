import {Some, None} from '../option.js';

export class TicTacToe {
  constructor() {
    this.array = [
      '-', '-', '-', '-', '-', '-', '-', '-', '-',
    ];
  }

  play(pip, square) {
    let clone = this.clone();
    if (clone.array[square] !== '-') {
      return new None();
    }

    clone.array[square] = pip;
    return new Some(clone);
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
  let game = new TicTacToe().play('X', 0).unwrap();

  assertEq(game.unplayed().length, 8);
  assert(!game.unplayed().includes(0));
  assert(game.unplayed().includes(1));

  game = game.play('O', 1).unwrap();

  assert(!game.unplayed().includes(1));
});

test('attempting play over existing square is none', () => {
  let game = new TicTacToe().play('X', 0).unwrap();

  assertEq(game.play('O', 0), new None());
});
