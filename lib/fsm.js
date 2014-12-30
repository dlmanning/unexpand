"use strict";

exports.machine2 = machine2;
exports.machine1 = machine1;
function machine2(stateMap, state, input) {
  var A = stateMap.A, B = stateMap.B, C = stateMap.C;

  if (state === C) {
    if (input === " ") {
      state = A[0][0];
    } else {
      state = B;
    }
  } else if (state === B) {
    if (input === "\n") {
      state = C;
    }
  } else if (state.name === "A") {
    if (input === " ") {
      if (state.tabComplete) {
        state = A[0][0];
      } else {
        state = A[0][state.j + 1];
      }
    } else if (input = "\n") {
      state = C;
    } else {
      state = B;
    }
  }

  return state;
}

function machine1(stateMap, state, input) {
  var A = stateMap.A, B = stateMap.B, C = stateMap.C;

  if (state === C) {
    if (input === " ") {
      state = A[0][0];
    } else {
      state = B;
    }
  } else if (state === B) {
    if (input === "\n") {
      state = C;
    }
  } else if (state.name === "A") {
    if (input === " ") {
      if (state.tabComplete) {
        if (state.i === A.length - 1) {
          state = B;
        } else {
          state = A[state.i + 1][0];
        }
      } else {
        state = A[state.i][state.j + 1];
      }
    } else if (input === "\n") {
      state = C;
    } else {
      state = B;
    }
  }

  return state;
}