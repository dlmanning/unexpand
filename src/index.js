const { Transform } = require('stream');

import { machine1, machine2 } from './fsm.js'

export class Unexpand extends Transform {
  constructor (opts = {}) {

    const tabStops = (typeof opts.tabStops === 'number') 
      ? [opts.tabStops] 
      : (opts.tabStops === undefined)
        ? [8]
        : opts.tabStops;

    this._machine = (tabStops.length > 1) ? machine1 : machine2;

    this._stateMap = { 
      A: [],
      B: { name: 'B' },
      C: { name: 'C' }
    };

    tabStops.reduce((prev, curr, idx) => {
      let columnWidth = curr - prev;
      this._stateMap.A[idx] = new Array(columnWidth);

      for (let jdx = 0; jdx < columnWidth; jdx++) {
        this._stateMap.A[idx][jdx] = { 
          i : idx,
          j : jdx,
          name: 'A',
          tabComplete: (jdx === columnWidth - 1) 
        };
      }
      
      return curr;
    }, 0);

    this.state = this._stateMap.A[0][0];

    super(opts);
  }

  _transform (chunk, encoding, cb) {
    const data = chunk.toString('utf8'), stateMap = this._stateMap;
    var buffer = '', state = this.state;

    for (let idx = 0; idx < data.length; idx++) {
      state = this._machine(stateMap, state, data[idx]);
      if (state === stateMap.B || state === stateMap.C) {
        buffer += data[idx];
      } else if (state.tabComplete) {
        buffer += '\t';
      }
    }

    this.push(buffer);

    cb();
  }
}