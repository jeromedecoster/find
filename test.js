var find = require('./index')
var test = require('tape')

var users = []

users.push({ name: 'Tobi', age: 2, species: 'ferret', admin: false })
users.push({ name: 'Jane', age: 6, species: 'ferret', admin: true })
users.push({ name: 'Luna', age: 2, species: 'cat',    awesome: { cat: false, big: {dog: 'true'}}})
users.push({ name: 'Jane', age: 4, species: 'dog',    awesome: { cat: true,  big: {dog: true}}})
users.push({ name: 'Boby', age: 0, species: 'fish',   admin: true, awesome: { cat: true } })

test('find(arr, fn)', function (t) {

  t.equal(
    find(users, function(e) { return e.name == 'Jane' }),
    users[1])

  t.equal(
    find(users, function(e) { return e.name == 'Jane' && e.age < 5 }).species,
    users[3].species)

  t.equal(
    find(users, function(e) { return e.name == 'John' }),
    undefined)

  t.end()
})

test('find(arr, fn, true)', function (t) {

  t.deepEqual(
    find(users, function(e) { return e.name == 'Jane' }, true),
    [users[1], users[3]])

  t.deepEqual(
    find(users, function(e) { return e.name == 'Jane' && e.age < 5 }, true),
    [users[3]])

  t.deepEqual(
    find(users, function(e) { return e.name == 'John' }, true),
    undefined)

  t.end()
})

test('find(arr, obj)', function (t) {

  t.equal(
    find(users, { name: 'Jane' }),
    users[1])

  t.equal(
    find(users, { name: 'Jane', age: 4 }).species,
    users[3].species)

  t.equal(
    find(users, { name:'Jane', age: 12 }),
    undefined)

  t.equal(
    find(users, { name:'John' }),
    undefined)

  t.end()
})

test('find(arr, obj, true)', function (t) {

  t.deepEqual(
    find(users, { name: 'Jane' }, true),
    [users[1], users[3]])

  t.deepEqual(
    find(users, { name: 'Jane', age: 4 }, true),
    [users[3]])

  t.deepEqual(
    find(users, { name:'Jane', age: 12 }, true),
    undefined)

  t.deepEqual(
    find(users, { name:'John' }, true),
    undefined)

  t.end()
})

test('find(arr, str)', function (t) {

  t.equal(
    find(users, 'admin'),
    users[1])

  t.equal(
    find(users, 'awesome.cat'),
    users[3])

   t.equal(
    find(users, 'species'),
    undefined)

  t.equal(
    find(users, 'awesome'),
    undefined)

  t.equal(
    find(users, 'awesome.nothing'),
    undefined)

  t.equal(
    find(users, 'awesome.big.dog'),
    users[3])

  t.end()
})

test('find(arr, str, true)', function (t) {

  t.deepEqual(
    find(users, 'admin', true),
    [users[1], users[4]])

  t.deepEqual(
    find(users, 'awesome.cat', true),
    [users[3], users[4]])

  t.deepEqual(
    find(users, 'species', true),
    undefined)

  t.deepEqual(
    find(users, 'awesome.big.dog', true),
    [users[3]])

  t.end()
})

test('wrong values', function (t) {

  t.equal(
    find(users, {}),
    undefined)

  t.equal(
    find(users, {}, true),
    undefined)

  t.equal(
    find(users, []),
    undefined)

  t.equal(
    find(users, [], true),
    undefined)

  t.equal(
    find(users, true),
    undefined)

  t.equal(
    find(users, true, true),
    undefined)

  t.equal(
    find(users, false),
    undefined)

  t.equal(
    find(users, false, true),
    undefined)

  t.equal(
    find(users, NaN),
    undefined)

  t.equal(
    find(users, NaN, true),
    undefined)

  t.equal(
    find(users, null),
    undefined)

  t.equal(
    find(users, null, true),
    undefined)

  t.equal(
    find(users, undefined),
    undefined)

  t.equal(
    find(users, undefined, true),
    undefined)

  t.equal(
    find(users, 0),
    undefined)

  t.equal(
    find(users, 0, true),
    undefined)

  t.equal(
    find(users, 1),
    undefined)

  t.equal(
    find(users, 1, true),
    undefined)

  t.equal(
    find(users, ''),
    undefined)

  t.equal(
    find(users, '', true),
    undefined)

  t.equal(
    find(users, ' '),
    undefined)

  t.equal(
    find(users, ' ', true),
    undefined)

  t.equal(
    find(null, function(e) { return e.name == 'Jane' }),
    undefined)

  t.equal(
    find(null, function(e) { return e.name == 'Jane' }, true),
    undefined)

  t.equal(
    find(users, 'awesome..cat'),
    undefined)

  t.equal(
    find(users, 'awesome..cat', true),
    undefined)

  t.equal(
    find(users, 'awesome/cat'),
    undefined)

  t.equal(
    find(users, 'awesome/cat', true),
    undefined)

  t.end()
})
