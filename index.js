import {randomSample} from './utils.js';
import {TicTacToe} from './games/tic_tac_toe.js';

let tic_tac_toe = new TicTacToe();

function playerPlays(t, square) {
  return t.play('X', square);
}

function randomPlays(t) {
  let unplayed = t.unplayed();
  let square = randomSample(unplayed);

  return t.play('O', square);
}

function render() {
  let element = document.getElementById('3t');
  element.textContent = tic_tac_toe.textRepresentation();
}

tic_tac_toe = playerPlays(tic_tac_toe, 3);
tic_tac_toe = randomPlays(tic_tac_toe);
render();

document.getElementById('3t-play').addEventListener('click', (event) => {
  let inputElement = document.getElementById('3t-square');
  let input = inputElement.value;
  inputElement.value = '';

  tic_tac_toe = playerPlays(tic_tac_toe, parseInt(input));
  tic_tac_toe = randomPlays(tic_tac_toe);
  render();
});
