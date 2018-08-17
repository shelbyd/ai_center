import {randomSample} from '../utils.js';

export class RandomAgent {
  action(game) {
    let unplayed = game.unplayed();
    let square = randomSample(unplayed);

    return square;
  }
}
