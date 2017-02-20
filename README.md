API inpection library

[![Build Status](https://travis-ci.org/Andifeind/api-inspect.svg?branch=master)](https://travis-ci.org/Andifeind/api-inspect)

## Install

```sh
$ npm install api-inspect
```

## Usage

```js
let apiInspect = require('api-inspect');
let inspect = require('inspect.js');

apiInspect.get('http://example.com/api/info').test((ctx) => {
  ctx.statusCode(200);
  ctx.responseTime(50);
  ctx.contentType('application/json');

  inspect(ctx.body).isJSON();
  inspect(ctx.body).isEql({
    state: 'OK',
    version: 'v1.0.1'
  });
});
```

### Call express routes

```js
let apiInspect = require('api-inspect');
let app = express(); // gets express app anywhere

apiInspect.setApi(app);
apiInspect.get('/api/info').test(ctx => {
  // do your tests
});

// API calls to the internet will still work
apiInspect.get('http://inspectjs.com/test').test(ctx => {
  // do your tests
});
```
