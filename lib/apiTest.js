'use strict';

const inspect = require('inspect.js');
const utils = require('inspect.js/lib/inspectUtils');

class APITest {
  constructor() {
    this.body = null;
    this.text = null;
  }

  setRequest(req) {
    // console.log(req);
    this.req = req;
    this.data = req._data;
    this.query = req.qs;
    this.reqHeaders = req.header;
  }

  setResponse(res) {
    this.res = res;
    this.body = res.body;
    this.text = res.text;
    this.headers = res.header;
  }

  statusCode(num) {
    let statusCode = this.res.statusCode;
    if (statusCode !== num) {
      throw new Error('API status code should be ' + num + ' but it is ' + statusCode + '\nstatus text: ' + this.res.text);
    }

    return this;
  }

  contentType(type) {
    const contentType = this.headers['content-type'];
    const reg = type instanceof RegExp ? type : new RegExp(type.replace(/\*/g, '.+'));
    if (!reg.test(contentType)) {
      throw new Error('Content-Type should be ' + type + ' but it is ' + contentType);
    }

    return this;
  }

  get requestData() {
    return inspect(this.data);
  }

  responseTime(time) {
    if (typeof time === 'string') {
      time = parseInt(time);
    }

    if (this.res.responseTime > time) {
      throw new Error('API response time should be lesser than ' + time + ' but it is ' + this.res.responseTime);
    }

    return this;
  }
}

module.exports = APITest;
