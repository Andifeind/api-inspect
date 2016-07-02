'use strict';

let url = require('url');

let supertest = require('supertest');
let inspect = require('inspect.js');
let SuperQ = require('superq');

let APITest = require('./lib/apiTest');

class APIInspect {
  constructor() {
    this.queue = new SuperQ();
    this.done = new Promise((resolve, reject) => {
      this.__resolve = resolve;
      this.__reject = reject;
    });

    this.isRunning = false;
  }

  setApi(apiUrl) {
    this.api = apiUrl;
  }

  getHost(apiUrl) {
    let host = this.api;
    let path = apiUrl;
    if (/https?:\/\//.test(apiUrl)) {
      let uri = url.parse(apiUrl, true);
      host = uri.protocol + '//' + uri.host;
      path = uri.pathname;
    }

    return {
      host,
      path
    };
  }

  get(apiUrl) {
    let server = this.getHost(apiUrl);
    this.req = supertest(server.host).get(server.path);

    return this;
  }

  post(apiUrl) {
    let server = this.getHost(apiUrl);
    this.req = supertest(server.host).post(server.path);

    return this;
  }

  put(apiUrl) {
    let server = this.getHost(apiUrl);
    this.req = supertest(server.host).put(server.path);

    return this;
  }

  patch(apiUrl) {
    let server = this.getHost(apiUrl);
    this.req = supertest(server.host).patch(server.path);

    return this;
  }

  delete(apiUrl) {
    let server = this.getHost(apiUrl);
    this.req = supertest(server.host).delete(server.path);

    return this;
  }

  options(apiUrl) {
    let server = this.getHost(apiUrl);
    this.req = supertest(server.host).options(server.path);

    return this;
  }

  head(apiUrl) {
    let server = this.getHost(apiUrl);
    this.req = supertest(server.host).head(server.path);

    return this;
  }

  log(res) {
    console.log('api call to `%s` responds with %s after %sms', res.req.path, res.statusCode, res.responseTime);
  }

  header(header, value) {
    this.req.set(header, value);
    return this;
  }

  query(query, value) {
    this.req.query(query, value);
    return this;
  }

  body(data, value) {
    this.req.send(data, value);
    return this;
  }

  test(fn) {
    this.queue.push({
      req: this.req,
      test: fn
    });

    let apiTest = new APITest();

    if (!this.isRunning) {
      this.queue.run((item, next) => {
        let time = Date.now();
        item.req.end((err, res) => {
          let responseTime = Date.now() - time;
          if (err) {
            throw err;
          }

          res.responseTime = responseTime;
          this.log(res);
          apiTest.setResponse(res);
          item.test(apiTest);
          next();
        });
      }).then(this.__resolve).catch(this.__reject);

      this.isRunning = true;
    }

    return apiTest;
  }
}

module.exports = new APIInspect();
module.exports.getInstance = function() {
  return new APIInspect();
};
