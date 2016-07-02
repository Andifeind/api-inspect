'use strict';

let inspect = require('inspect.js');

let apiInspect = require('../apiInspect');
let APITest = require('../lib/apiTest');
let app = require('../examples/server');

apiInspect.setApi(app);

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
    it('Should add new get test', function() {
      apiInspect.get('/test/one');

      inspect(apiInspect.req).isObject();
    });
  });

  describe('post', function() {
    it('Should add new post test', function() {
      apiInspect.post('/test/one');

      inspect(apiInspect.req).isObject();
    });
  });

  describe('put', function() {
    it('Should add new put test', function() {
      apiInspect.put('/test/one');

      inspect(apiInspect.req).isObject();
    });
  });

  describe('patch', function() {
    it('Should add new patch test', function() {
      apiInspect.patch('/test/one');

      inspect(apiInspect.req).isObject();
    });
  });

  describe('delete', function() {
    it('Should add new delete test', function() {
      apiInspect.delete('/test/one');

      inspect(apiInspect.req).isObject();
    });
  });

  describe('head', function() {
    it('Should add new head test', function() {
      apiInspect.head('/test/one');

      inspect(apiInspect.req).isObject();
    });
  });

  describe('options', function() {
    it('Should add new options test', function() {
      apiInspect.options('/test/one');

      inspect(apiInspect.req).isObject();
    });
  });
});
