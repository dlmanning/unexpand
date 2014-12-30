#Unexpand

It turns your spaces into tabs, if that's your thing.

A javascript implementation of the unix `unexpand` command.


## Example Usage:

```javascript
var UnexpandStream = require('unexpand');
var fs = require('fs');

var unexpand = new UnexpandStream({
  tabStops: [2, 6, 8] // optional
});

fs.createReadStream('space-indented-file.js')
  .pipe(unexpand)
  .pipe(someOtherPlace);
```

## API:

### Constructor: `new UnexpandStream([opts]);`

Create a new instance of an unexpand stream, which is an instance of a Transform stream from the node streams module.

### `[opts]` - Object

* `tabStops` Array of Numbers or Number - Set tab stops at column positions `[tab1, tab2, ..., tabn]`.  If only a single number is given, tab stops are set that number of column positions apart instead of the default number of 8.

