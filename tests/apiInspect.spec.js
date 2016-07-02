'use strict';

let inspect = require('inspect.js');
let sinon = require('sinon');
inspect.useSinon(sinon);

let apiInspect = require('../apiInspect');
let APITest = require('../lib/apiTest');

describe('APIInspect', function() {
  describe('instance', function() {
    it('Should get an apiInspectInstance', function() {
      inspect(apiInspect).isObject();
      inspect(apiInspect.getInstance).isFunction();
    });

    it('Should have a setApi method', function() {
      inspect(apiInspect.setApi).isFunction();
    });

  });

  describe('get', function() {
    it('Should add new test', function() {
      apiInspect.get('/test/one');
      apiInspect.get('/test/two');

      inspect(apiInspect.queue).hasLength(2);
      inspect(apiInspect.queue[0]).isInstanceOf(APITest);
      inspect(apiInspect.queue[1]).isInstanceOf(APITest);
    });
  });
});
