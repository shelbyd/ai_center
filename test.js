import {_} from './third_party.js';
let {isEqual} = _;

let passedTests = 0;
let failedTests = 0;

let nextTimeout = null;

export function test(name, exec) {
  try {
    exec();
  } catch (e) {
    console.error(`Test failed: ${name}`);
    logError(e);
    failedTests += 1;
    scheduleReport();
    return;
  }

  passedTests += 1;
  scheduleReport();
}

function logError(e) {
  if (Array.isArray(e)) {
    console.error(...e);
    return;
  }
  console.error(e);
}

function scheduleReport() {
  if (nextTimeout !== null) {
    clearTimeout(nextTimeout);
  }
  nextTimeout = setTimeout(() => {
    console.log(`${passedTests}/${passedTests + failedTests} tests passed`);
  }, 0);
}

export function assert(cond) {
  if (!cond) {
    throw new Error('assertion failed');
  }
}

export function assertEq(left, right) {
  if (!isEqual(left, right)) {
    throw ['expected', left, 'to equal', right];
  }
}
