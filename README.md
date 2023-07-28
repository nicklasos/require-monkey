# Money patching require

### Install
```
npm install require-monkey
```

### Usage

```javascript
const monkey = require('require-monkey');

monkey('fs', {
    stat: function (file, cb) {
        cb(file);
    }
});


const fs = require('fs');

fs.stat('./README.md', function (file) {
    console.log(file); // README.md ...
});
```

Specify full path when using project files
```javascript
monkey(__dirname + '/require-monkey', 'Mocked!');

const requireMonkey = require('./require-monkey');

'Mocked!' === requireMonkey; // true
```