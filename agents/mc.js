import {randomSample} from '../utils.js';
import {Some, None} from '../option.js';
import {_} from '../third_party.js';

export class McAgent {
  constructor(maxSearchTimeMs) {
    this.maxSearchTimeMs = maxSearchTimeMs;
  }

  action(game) {
    let start = window.performance.now();

    let actions = game.validActions();
    let rolloutResults = new Map();

    for (let action of actions) {
      rolloutResults.set(action, [0, 0]);
    }

    while (window.performance.now() - start < this.maxSearchTimeMs) {
      let nextAction = randomSample(actions);
      let result = this.rollout(game.play(nextAction).unwrap());
      let ev = result.map(v => v === game.activePlayer() ? 1 : -1).unwrapOr(0);

      let [totalV, n] = rolloutResults.get(nextAction);
      rolloutResults.set(nextAction, [totalV + ev, n + 1]);
    }

    let entries = Array.from(rolloutResults.entries());
    return _.max(entries, ([_, [totalV, n]]) => totalV / n)[0];
  }

  rollout(game) {
    while (true) {
      game = game.match({
        nonTerminal: (g) => g.play(randomSample(g.validActions())).unwrap(),
        terminal: (_) => game,
      });

      let terminal = game.match({
        terminal: (w) => new Some(w),
        nonTerminal: (_) => new None(),
      });

      if (terminal.isSome()) {
        return terminal.unwrap();
      }
    }
  }
}
