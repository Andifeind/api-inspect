'use strict';

let api = require('../apiInspect');
let inspect = require('inspect.js');

api.get('http://localhost:8585/info').test(apiInspect => {
  apiInspect.statusCode(200);
});

api.post('http://localhost:8585/login').test(apiInspect => {
  apiInspect.statusCode(403);
});

api.post('http://localhost:8585/login')
.body({
  user: 'Andi',
  password: '123456'
})
.test(apiInspect => {
  apiInspect.statusCode(200);

  inspect(apiInspect.body).isObject();
  inspect(apiInspect.body).isEql({
    sessionId: '33fab54cb',
    userId: 1328
  });
});
