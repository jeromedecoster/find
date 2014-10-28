
module.exports = find;

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

function isObject(o) {
  return !!o && typeof o === 'object'
      && o.constructor === Object && Object.keys(o).length > 0;
}

function isString(s) {
  return !!s && typeof s === 'string' && s.trim().length > 0
      && s.replace(/\s|\w|\.(?!\.)|\$/g, '').length == 0;
}

function objectToFunction(obj) {
  return function(o) {
    for (var key in obj) {
      if (o[key] != obj[key]) return false;
    }
    return true;
  }
}

function stringToFunction(str) {
  return new Function('_', 'try { return _.' + str +' === true } catch(e) { return false }');
}
