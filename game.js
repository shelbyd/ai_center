import {Some} from './option.js';

export class Terminal {
  constructor(winner) {
    this.winner = winner;
  }

  maybeTerminal() {
    return new Some(this);
  }

  match(obj) {
    return obj.terminal(this.winner);
  }

  andPlay(f) {
    return this;
  }
}

export class NonTerminal {
  constructor(gameState) {
    this.gameState = gameState;
  }

  nonTerminal() {
    return this.gameState;
  }

  match(obj) {
    return obj.nonTerminal(this.gameState);
  }

  andPlay(f) {
    return f(this.gameState);
  }
}
