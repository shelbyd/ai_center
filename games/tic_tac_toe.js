export class TicTacToe {
  constructor() {
    this.array = [
      '-', '-', '-', '-', '-', '-', '-', '-', '-',
    ];
  }

  play(pip, square) {
    let clone = this.clone();
    clone.array[square] = pip;
    return clone;
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
