If you are trying to change the schema of already created .json files, things can get hairy quickly.

To load a file in Node REPL:

``` javascript
var fs = require('fs');
eval(fs.readFileSync('foo.js').toString())
```

or for less intense files:
``` javascript
.load foo.js
```

or if it is a .json file already, just `require('./foo.json')` (don't need to JSON.parse)

Once loaded, use `JSON.parse()` to get it as a javascript object thing

empty.js is made specifically to allow one to not have to type out all the spaces again.  Try mapping from that.

from there, you should be able to Map to your heart's content

via: https://stackoverflow.com/questions/8425102/how-do-i-load-my-script-into-the-node-js-repl

to write to a file, require fs

``` javascript
var fs = require('fs')
```
then human readable stringify
``` javascript
let fileData = JSON.stringify(data, null, 2)
```
then write the thing

``` javascript
fs.writeFileSync('file.json', fileData, {flag:'w'})
```
