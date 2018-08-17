import {randomSample} from './utils.js';
import {TicTacToe} from './games/tic_tac_toe.js';
import {NonTerminal} from './game.js';

let tic_tac_toe = new NonTerminal(new TicTacToe());

function playerPlays(t, square) {
  return t.andPlay(t => t.play('X', square)).expect(`Player played an invalid move ${square}`);
}

function randomPlays(t) {
  return t.andPlay(t => {
    let unplayed = t.unplayed();
    let square = randomSample(unplayed);

    return t.play('O', square);
  }).unwrap();
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

render();

document.getElementById('3t-play').addEventListener('click', (event) => {
  let inputElement = document.getElementById('3t-square');
  let input = inputElement.value;
  inputElement.value = '';

  tic_tac_toe = playerPlays(tic_tac_toe, parseInt(input));
  tic_tac_toe = randomPlays(tic_tac_toe);
  render();
});
