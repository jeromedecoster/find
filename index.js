
/**
 * Expose `find`.
 */

module.exports = find

/**
 * Return the first value in `arr` according to `search`.
 *
 * @param {Array} arr
 * @param {Function|Object|String} search
 * @return {Object}
 * @api public
 */

function find (arr, search, all) {
  if (!Array.isArray(arr)) return

  if (typeof search != 'function') {
    if (isObject(search)) search = objectToFunction(search)
    else if (isString(search)) search = stringToFunction(search)
    else return
  }

  var i = 0
  var n = arr.length
  if (all !== true) {
    for (; i < n; i++) {
      if (search(arr[i])) return arr[i]
    }
  } else {
    var result = []
    for (; i < n; i++) {
      if (search(arr[i])) result.push(arr[i])
    }
    if (result.length > 0) return result
  }
}

/**
 * Check if it's a valid plain object.
 *
 * @param  {Object}  obj
 * @return {Boolean}
 * @api private
 */

function isObject (obj) {
  return !!obj
      && typeof obj === 'object'
      && obj.constructor === Object
      && Object.keys(obj).length > 0
}

/**
 * Check if it's a valid string.
 *
 * @param  {String}  str
 * @return {Boolean}
 * @api private
 */

function isString (str) {
  return !!str
      && typeof str === 'string'
      && str.trim().length > 0
      && str.replace(/\s|\w|\.(?!\.)|\$/g, '').length == 0
}

/**
 * Return a function to test in object mode.
 *
 * @param {Object} obj
 * @return {Function}
 * @api private
 */

function objectToFunction (obj) {
  return function (o) {
    for (var key in obj) {
      if (o[key] != obj[key]) return false
    }
    return true
  }
}

/**
 * Return a function to test in string mode.
 *
 * @param {Object} str
 * @return {Function}
 * @api private
 */

function stringToFunction (str) {
  var fn = ''
  + 'function isObject (x) { return typeof x === "object" && x !== null; };'
  + 'function getProp (obj, path) { if (!isObject(obj) || typeof path !== "string") return obj;'
  + 'path = path.split(".");'
  + 'return getProp(obj[path.shift()], path.length && path.join(".")); };'
  + 'return getProp(_, "' + str +'") === true'
  return new Function('_', fn)
}
