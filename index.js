
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
  var obj = fn ? false : isObject(search)
  if (!fn && !obj) return

  var i = 0
  var n = arr.length
  var result = []
  var map = options && typeof options.map == 'function'
  var idx = options && options.index === true
  var all = options && options.all === true
  var assign = options && isObject(options.assign)
  if (options && options.last === true) {
    var last = true
    i = n - 1
  }
  if (options && typeof options.from == 'number') {
    i = options.from
    if (i < 0 || i > n - 1) return
  }

  while (!last && i < n || last && i >= 0) {
    if (fn && search(arr[i]) || obj && compare(arr[i], search)) {
      if (assign) {
        for (var key in options.assign) {
          arr[i][key] = options.assign[key]
        }
      }
      if (map) {
        arr[i] = options.map(arr[i], i, arr)
      }
      if (idx) {
        if (!all) return i
        result.push(i)
        if (last) return result
      }
      else if (all) {
        result.push(arr[i])
        if (last) return result
      }
      else return arr[i]
    }
    if (!last) i++
    else i--
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
