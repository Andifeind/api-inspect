API inpection library

## Install

```sh
$ npm install api-inspect
```

## Usage

```js
let api = require('api-inspect');

api.get('http://example.com/api/info').test(inspect => {
  inspect.statusCode(200);
  inspect.responseTime(50);
  inspect.contentType('application/json');

  inspect(inspect.body).isJSON();
  inspect(inspect.body).isEql({
    state: 'OK',
    version: 'v1.0.1'
  });
});

```

### Call express routes

```js
let api = require('api-inspect');
let app = express(); // gets express app anywhere

api.setApp(app);
api.get('/api/info').test(inspect => {
  // do your tests
});

// API calls to the internet will still work
api.get('http://inspectjs.com/test').test(inspect => {
  // do your tests
});

```
