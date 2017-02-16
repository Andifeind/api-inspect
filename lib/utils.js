inspectUtils = {};

inspectUtils.compareValues = function(a, b) {
  var typeA = this.getTypeOf(a);
  var typeB = this.getTypeOf(b);

  // Check matchers
  if (b && b.test && typeof(b.test) === 'function' && b.message) {
    return b.test(a);
  }

  if (typeA !== typeB) {
    return false;
  }

  if (typeA === 'regexp') {
    return a.toString() === b.toString();
  }

  if (typeA === 'array') {
    return this.compareArrays(a, b);
  }

  if (typeof a === 'object') {
    return this.compareObjects(a, b);
  }

  return a === b;
};

inspectUtils.compareArrays = function(a, b) {
  var len = Math.max(a.length, b.length);
  for (var i = 0; i < len; i++) {
    var itemA = a[i];
    var itemB = b[i];

    if (!this.compareValues(itemA, itemB)) {
      return false;
    }
  }

  return true;
};

inspectUtils.compareObjects = function(a, b) {
  if (a === b) {
    return true;
  }

  var typeA = this.getTypeOf(a);
  var typeB = this.getTypeOf(b);

  // Check matchers
  if (b.test && typeof(b.test) === 'function' && b.message) {
    return b.test(a);
  }

  if (typeA !== typeB) {
    return false;
  }

  if (typeof a === 'function' ||
    a instanceof RegExp ||
    a instanceof Date) {
    return a.toString() === b.toString();
  }

  var keys = Object.keys(a).concat(Object.keys(b)).filter(function(val, index, arr) {
    return arr.indexOf(val) === index;
  });

  for (var i = 0, len = keys.length; i < len; i++) {
    var prop = keys[i];
    if (!(prop in b)) {
      return false;
    }

    if (!this.compareValues(a[prop], b[prop])) {
      return false;
    }
  }

  return true;
};

/**
 * Gets the type of `a`
 *
 * @method getTypeOf
 * @param  {any}  a  Input value
 */
inspectUtils.getTypeOf = function(a, realType) {
  var type = typeof(a);

  if (type === 'object') {
    if (Array.isArray(a)) {
      return 'array';
    }

    if (a === null) {
      return 'null';
    }

    if (a instanceof RegExp) {
      return 'regexp';
    }

    return 'object';
  }

  if (type === 'function') {
    if (Object.getPrototypeOf(a) === Object.getPrototypeOf(function* () { yield;})) {
      return 'generator';
    }

    var match = /class|function/.exec(a.toString());
    if (match && match[0] === 'class') {
      return 'class';
    }

    return 'function';
  }

  if (type === 'number') {
    if (isNaN(a)) {
      return 'NaN';
    }
  }

  return type;
};

module.exports = inspectUtils;
