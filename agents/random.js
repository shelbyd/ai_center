import {randomSample} from '../utils.js';

export class RandomAgent {
  action(game) {
    return randomSample(game.validActions());
  }
}
