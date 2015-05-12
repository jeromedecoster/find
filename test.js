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

test('find(arr, fn, {index: true})', function (t) {

  t.equal(
    find(users, function(e) { return e.name == 'Jane' }, {index: true}),
    1)

  t.equal(
    find(users, function(e) { return e.name == 'Jane' && e.age < 5 }, {index: true}),
    3)

  t.equal(
    find(users, function(e) { return e.name == 'John' }, {index: true}),
    undefined)

  t.end()
})

test('find(arr, fn, {all: true})', function (t) {

  t.deepEqual(
    find(users, function(e) { return e.name == 'Jane' }, {all: true} ),
    [users[1], users[3]])

  t.deepEqual(
    find(users, function(e) { return e.name == 'Jane' && e.age < 5 }, {all: true}),
    [users[3]])

  t.deepEqual(
    find(users, function(e) { return e.name == 'John' }, {all: true}),
    undefined)

  t.end()
})

test('find(arr, fn, {all: true, index: true})', function (t) {

  t.deepEqual(
    find(users, function(e) { return e.name == 'Jane' }, {all: true, index: true} ),
    [1, 3])

  t.deepEqual(
    find(users, function(e) { return e.name == 'Jane' && e.age < 5 }, {all: true, index: true}),
    [3])

  t.equal(
    find(users, function(e) { return e.name == 'John' }, {all: true, index: true}),
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

  t.equal(
    find(users, { awesome: { big: { dog : 'true' } } }),
    users[2])

  t.equal(
    find(users, { awesome: { big: { dog : true } } }),
    users[3])

  t.equal(
    find(users, { awesome: { big: { joe : true } } }),
    undefined)

  t.end()
})

test('find(arr, obj, {index: true})', function (t) {

  t.equal(
    find(users, { name: 'Jane' }, {index: true}),
    1)

  t.equal(
    find(users, { name: 'Jane', age: 4 }, {index: true}),
    3)

  t.equal(
    find(users, { name:'Jane', age: 12 }, {index: true}),
    undefined)

  t.equal(
    find(users, { name:'John' }, {index: true}),
    undefined)

  t.equal(
    find(users, { awesome: { big: { dog : 'true' } } }, {index: true}),
    2)

  t.equal(
    find(users, { awesome: { big: { dog : true } } }, {index: true}),
    3)

  t.equal(
    find(users, { awesome: { big: { joe : true } } }, {index: true}),
    undefined)

  t.end()
})

test('find(arr, obj, {all: true})', function (t) {

  t.deepEqual(
    find(users, { name: 'Jane' }, {all: true}),
    [users[1], users[3]])

  t.deepEqual(
    find(users, { name: 'Jane', age: 4 }, {all: true}),
    [users[3]])

  t.deepEqual(
    find(users, { name:'Jane', age: 12 }, {all: true}),
    undefined)

  t.deepEqual(
    find(users, { name:'John' }, {all: true}),
    undefined)

  t.deepEqual(
    find(users, { awesome: {cat: true} }, {all: true}),
    [users[3], users[4]])

  t.end()
})

test('find(arr, obj, {all: true, index: true})', function (t) {

  t.deepEqual(
    find(users, { name: 'Jane' }, {all: true, index: true}),
    [1, 3])

  t.deepEqual(
    find(users, { name: 'Jane', age: 4 }, {all: true, index: true}),
    [3])

  t.deepEqual(
    find(users, { name:'Jane', age: 12 }, {all: true, index: true}),
    undefined)

  t.deepEqual(
    find(users, { name:'John' }, {all: true, index: true}),
    undefined)

  t.deepEqual(
    find(users, { awesome: {cat: true} }, {all: true, index: true}),
    [3, 4])

  t.end()
})

test('wrong values', function (t) {

  t.equal(
    find(users, {}),
    undefined)

  t.equal(
    find(users, {}, {all: true}),
    undefined)

  t.equal(
    find(users, []),
    undefined)

  t.equal(
    find(users, [], {all: true}),
    undefined)

  t.equal(
    find(users, true),
    undefined)

  t.equal(
    find(users, true, {all: true}),
    undefined)

  t.equal(
    find(users, false),
    undefined)

  t.equal(
    find(users, false, {all: true}),
    undefined)

  t.equal(
    find(users, NaN),
    undefined)

  t.equal(
    find(users, NaN, {all: true}),
    undefined)

  t.equal(
    find(users, null),
    undefined)

  t.equal(
    find(users, null, {all: true}),
    undefined)

  t.equal(
    find(users, undefined),
    undefined)

  t.equal(
    find(users, undefined, {all: true}),
    undefined)

  t.equal(
    find(users, 0),
    undefined)

  t.equal(
    find(users, 0, {all: true}),
    undefined)

  t.equal(
    find(users, 1),
    undefined)

  t.equal(
    find(users, 1, {all: true}),
    undefined)

  t.equal(
    find(users, ''),
    undefined)

  t.equal(
    find(users, '', {all: true}),
    undefined)

  t.equal(
    find(users, ' '),
    undefined)

  t.equal(
    find(users, ' ', {all: true}),
    undefined)

  t.equal(
    find(null, function(e) { return e.name == 'Jane' }),
    undefined)

  t.equal(
    find(null, function(e) { return e.name == 'Jane' }, {all: true}),
    undefined)

  t.equal(
    find(users, 'awesome..cat'),
    undefined)

  t.equal(
    find(users, 'awesome..cat', {all: true}),
    undefined)

  t.equal(
    find(users, 'awesome/cat'),
    undefined)

  t.equal(
    find(users, 'awesome/cat', {all: true}),
    undefined)

  t.end()
})
