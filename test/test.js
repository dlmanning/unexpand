var UnexpandStream = require('../index');
var fs = require('fs');

var unexpand = new UnexpandStream({
  tabStops : [2]
});

fs.createReadStream('test/ref/pyramid.js')
  .pipe(unexpand)
  .pipe(process.stdout);