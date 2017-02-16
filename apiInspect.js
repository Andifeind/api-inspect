'use strict';

let url = require('url');

let supertest = require('supertest');
let inspect = require('inspect.js');
let SuperQ = require('superq');

let APITest = require('./lib/apiTest');

class APIInspect {
  constructor() {
    this.supertest = null;
    this.logEnabled = false;
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

  get(apiUrl, query) {
    let server = this.getHost(apiUrl);
    this.req = supertest(server.host).get(server.path);
    if (query) {
      this.query(query);
    }

    return this;
  }

  post(apiUrl, data) {
    const server = this.getHost(apiUrl);
    this.supertest = supertest(server.host);
    this.req = this.supertest.post(server.path);
    if (data) {
      this.body(data);
    }

    return this;
  }

  put(apiUrl, data) {
    const server = this.getHost(apiUrl);
    this.supertest = supertest(server.host);
    this.req = this.supertest.put(server.path);
    if (data) {
      this.body(data);
    }

    return this;
  }

  patch(apiUrl, data) {
    const server = this.getHost(apiUrl);
    this.supertest = supertest(server.host);
    this.req = this.supertest.patch(server.path);
    if (data) {
      this.body(data);
    }

    return this;
  }

  delete(apiUrl, query) {
    const server = this.getHost(apiUrl);
    this.supertest = supertest(server.host);
    this.req = this.supertest.delete(server.path);
    if (query) {
      this.query(query);
    }

    return this;
  }

  options(apiUrl) {
    const server = this.getHost(apiUrl);
    this.supertest = supertest(server.host);
    this.req = this.supertest.options(server.path);

    return this;
  }

  head(apiUrl) {
    const server = this.getHost(apiUrl);
    this.supertest = supertest(server.host);
    this.req = this.supertest.head(server.path);

    return this;
  }

  get log() {
    this.logEnabled = true;
    return this;
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
    return new Promise((resolve, reject) => {
      const apiTest = new APITest();
      const time = Date.now();
      this.req.end((err, res) => {
        const responseTime = Date.now() - time;
        const apiRequest = this.req;
        const apiResponse = res;

        if (this.logEnabled) {
          console.log('api call to `%s %s` responds with %s after %sms',
            res.req.method,
            res.req.path,
            res.statusCode,
            responseTime
          );
        }

        if (err) {
          throw err;
        }

        res.responseTime = responseTime;
        apiTest.setRequest(this.req);
        apiTest.setResponse(res);
        fn(apiTest, apiRequest, apiResponse);
        resolve(apiTest);
      });
    });
  }
}

module.exports = new APIInspect();
module.exports.getInstance = function() {
  return new APIInspect();
};
