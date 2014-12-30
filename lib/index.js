"use strict";

var _inherits = function (child, parent) {
  child.prototype = Object.create(parent && parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (parent) child.__proto__ = parent;
};

var _ref = require("stream");

var Transform = _ref.Transform;
var machine1 = require("./fsm.js").machine1;
var machine2 = require("./fsm.js").machine2;
var Unexpand = function Unexpand(opts) {
  var _this = this;
  if (opts === undefined) opts = {};


  var tabStops = typeof opts.tabStops === "number" ? [opts.tabStops] : opts.tabStops === undefined ? [8] : opts.tabStops;

  this._machine = tabStops.length > 1 ? machine1 : machine2;

  this._stateMap = {
    A: [],
    B: { name: "B" },
    C: { name: "C" }
  };

  tabStops.reduce(function (prev, curr, idx) {
    var columnWidth = curr - prev;
    _this._stateMap.A[idx] = new Array(columnWidth);

    for (var jdx = 0; jdx < columnWidth; jdx++) {
      _this._stateMap.A[idx][jdx] = {
        i: idx,
        j: jdx,
        name: "A",
        tabComplete: jdx === columnWidth - 1
      };
    }

    return curr;
  }, 0);

  this.state = this._stateMap.A[0][0];

  Transform.call(this, opts);
};

_inherits(Unexpand, Transform);

Unexpand.prototype._transform = function (chunk, encoding, cb) {
  var data = chunk.toString("utf8"), stateMap = this._stateMap;
  var buffer = "", state = this.state;

  for (var idx = 0; idx < data.length; idx++) {
    state = this._machine(stateMap, state, data[idx]);
    if (state === stateMap.B || state === stateMap.C) {
      buffer += data[idx];
    } else if (state.tabComplete) {
      buffer += "\t";
    }
  }

  this.push(buffer);

  cb();
};

exports.Unexpand = Unexpand;