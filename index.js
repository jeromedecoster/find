
/**
 * Expose `find`.
 */

module.exports = find;

/**
 * Return the first value in `arr` according to `fn`.
 *
 * @param {Array} arr
 * @param {Function|Object|String} fn
 * @return {Object}
 * @api public
 */

function find(arr, fn) {
  if (!Array.isArray(arr)) return;

  if (typeof fn != 'function') {
    if (isObject(fn)) fn = objectToFunction(fn);
    else if (isString(fn)) fn = stringToFunction(fn);
    else return;
  }

  for (var i = 0, n = arr.length; i < n; i++) {
    if (fn(arr[i])) return arr[i];
  }
}

/**
 * Check if it's a valid plain object.
 *
 * @param  {Object}  obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return !!obj && typeof obj === 'object'
      && obj.constructor === Object && Object.keys(obj).length > 0;
}

/**
 * Check if it's a valid string.
 *
 * @param  {String}  str
 * @return {Boolean}
 * @api private
 */

function isString(str) {
  return !!str && typeof str === 'string' && str.trim().length > 0
      && str.replace(/\s|\w|\.(?!\.)|\$/g, '').length == 0;
}

/**
 * Return a function to test in object mode.
 *
 * @param {Object} obj
 * @return {Function}
 * @api private
 */

function objectToFunction(obj) {
  return function(o) {
    for (var key in obj) {
      if (o[key] != obj[key]) return false;
    }
    return true;
  }
}

/**
 * Return a function to test in string mode.
 *
 * @param {Object} str
 * @return {Function}
 * @api private
 */

function stringToFunction(str) {
  return new Function('_', 'try { return _.' + str +' === true } catch(e) { return false }');
}
