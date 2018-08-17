import {Some, None} from './option.js';

export let randomSample = (array) => array[Math.floor(Math.random() * array.length)];

export let dedup = (array) => {
  if (array.length === 0) {
    return new None();
  }
  let first = array[0];
  if (array.every(v => v === first)) {
    return new Some(first);
  } else {
    return new None();
  }
};
