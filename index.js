
/**
 * Expose `find`.
 */

module.exports = find

/**
 * Return the first|all values|indexes in `arr` according to `search` and `options`.
 *
 * @param {Array} arr
 * @param {Function|Object|String} search
 * @param {Object} options (optional)
 * @return {Object}
 * @api public
 */

function find (arr, search, options) {
  if (!Array.isArray(arr)) return

  var fn = typeof search == 'function'
  var obj = isObject(search)
  if (!fn && !obj) return

  var i = 0
  var n = arr.length
  var result = []

  for (; i < n; i++) {
    if (fn && search(arr[i]) || obj && compare(arr[i], search)) {
      if (options) {
        if (options.index === true) {
          if (options.all !== true) return i
          result.push(i)
        }
        else if (options.all === true) result.push(arr[i])
      }
      else return arr[i]
    }
  }
  if (result.length > 0) return result
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
 * Test if `obj` contains the same keys/values of `search`.
 *
 * @param {Object} obj
 * @param {Object} search
 * @return {Boolean}
 * @api private
 */

function compare (obj, search) {
  return Object.keys(search).every(function(key) {
    if (obj[key] == undefined) return false
    var val = search[key]
    if (val instanceof Object) {
      return compare(obj[key], val)
    }
    return obj[key] === search[key]
  })
}
