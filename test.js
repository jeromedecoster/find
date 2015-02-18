var find = require('./index');
var test = require('tape');

var users = [];

users.push({ name: 'Tobi', age: 2, species: 'ferret', admin: false });
users.push({ name: 'Jane', age: 6, species: 'ferret', admin: true });
users.push({ name: 'Luna', age: 2, species: 'cat',    awesome: { cat: false, big: {dog: 'true'}}});
users.push({ name: 'Jane', age: 4, species: 'dog',    awesome: { cat: true,  big: {dog: true}}});

test('find(arr, fn)', function (t) {

  t.equal(
    find(users, function(e) { return e.name == 'Jane' }),
    users[1]);

  t.equal(
    find(users, function(e) { return e.name == 'Jane' && e.age < 5 }).species,
    users[3].species);

  t.equal(
    find(users, function(e) { return e.name == 'John' }),
    undefined);

  t.end();
});

test('find(arr, obj)', function (t) {

  t.equal(
    find(users, { name: 'Jane' }),
    users[1]);

  t.equal(
    find(users, { name: 'Jane', age: 4 }).species,
    users[3].species);

  t.equal(
    find(users, { name:'Jane', age: 12 }),
    undefined);

  t.equal(
    find(users, { name:'John' }),
    undefined);

  t.end();
});

test('find(arr, str)', function (t) {

  t.equal(
    find(users, 'admin'),
    users[1]);

  t.equal(
    find(users, 'awesome.cat'),
    users[3]);

  t.equal(
    find(users, 'awesome'),
    undefined);

  t.equal(
    find(users, 'awesome.nothing'),
    undefined);

  t.equal(
    find(users, 'awesome.big.dog'),
    users[3]);

  t.end();
});

test('wrong values', function (t) {

  t.equal(
    find(users, {}),
    undefined);

  t.equal(
    find(users, []),
    undefined);

  t.equal(
    find(users, true),
    undefined);

  t.equal(
    find(users, false),
    undefined);

  t.equal(
    find(users, NaN),
    undefined);

  t.equal(
    find(users, null),
    undefined);

  t.equal(
    find(users, undefined),
    undefined);

  t.equal(
    find(users, 0),
    undefined);

  t.equal(
    find(users, 1),
    undefined);

  t.equal(
    find(users, ''),
    undefined);

  t.equal(
    find(users, ' '),
    undefined);

  t.equal(
    find(null, function(e) { return e.name == 'Jane' }),
    undefined);

  t.equal(
    find(users, 'awesome..cat'),
    undefined);

  t.equal(
    find(users, 'awesome/cat'),
    undefined);

  t.end()
});
