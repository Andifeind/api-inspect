'use strict';

class APITest {
  constructor() {
    this.body = null;
    this.text = null;
  }

  setResponse(res) {
    this.res = res;
    this.body = res.body;
    this.text = res.text;
  }

  statusCode(num) {
    let statusCode = this.res.statusCode;
    if (statusCode !== num) {
      throw new Error('API status code should be ' + num + ' but it is ' + statusCode + '\nstatus text: ' + this.res.text);
    }
  }

  responseTime(time) {
    if (typeof time === 'string') {
      time = parseInt(time);
    }

    if (this.res.responseTime > time) {
      throw new Error('API response time should be lesser than ' + time + ' but it is ' + this.res.responseTime);
    }
  }
}

module.exports = APITest;
