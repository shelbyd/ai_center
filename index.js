import {TicTacToe} from './games/tic_tac_toe.js';
import {NonTerminal} from './game.js';
import {RandomAgent} from './agents/random.js';

let tic_tac_toe = new NonTerminal(new TicTacToe());

function playerPlays(t, square) {
  return t.andPlay(t => t.play(square).expect(`Player played an invalid move ${square}`));
}

let randomAgent = new RandomAgent();

function agentPlays(t, agent) {
  return t.andPlay(t => {
    let action = agent.action(t);
    return t.play(action)
        .expect(`Agent ${agent} chose an invalid action ${action}`);
  });
}

function render() {
  let element = document.getElementById('3t');
  element.textContent = tic_tac_toe.match({
    terminal: (w) => w.match({
      some: (w) => `${w} wins`,
      none: () => 'draw',
    }),
    nonTerminal: (t) => t.textRepresentation(),
  });
}

tic_tac_toe = playerPlays(tic_tac_toe, 0);
tic_tac_toe = agentPlays(tic_tac_toe, randomAgent);
render();

document.getElementById('3t-play').addEventListener('click', (event) => {
  let inputElement = document.getElementById('3t-square');
  let input = inputElement.value;
  inputElement.value = '';

  tic_tac_toe = playerPlays(tic_tac_toe, parseInt(input));
  tic_tac_toe = agentPlays(tic_tac_toe, randomAgent);
  render();
});
