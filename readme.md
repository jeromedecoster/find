# Find

Array find utility

## Install

Install with <a href="http://nodejs.org/" target="_blank">npm</a> directly from the <a href="https://github.com/jeromedecoster/find" target="_blank">github repository</a>

```
npm install jeromedecoster/find
```

## API

#### find(array, fn, [options])

Find with a function

#### find(array, obj, [options])

Find with object value matching

## Options

#### {all: true}

Return all matches instead of the first one

#### {index: true}

Return the index instead of the value

#### {map: fn}

Apply map function on each match

## Example

```js
var users = []

users.push({ name: 'Tobi', age: 2, species: 'ferret', admin: false })
users.push({ name: 'Jane', age: 6, species: 'ferret', admin: true })
users.push({ name: 'Luna', age: 2, species: 'cat',    awesome: { cat: false }})
users.push({ name: 'Jane', age: 4, species: 'dog',    awesome: { cat: true } })

find(users, function(e) { return e.name == 'Jane' && e.age < 5 })
// => { name: 'Jane', age: 4, species: 'dog', awesome: { cat: true } }

find(users, { name: 'Jane', age: 4 })
// => { name: 'Jane', age: 4, species: 'dog', awesome: { cat: true } }

find(users, { awesome: { cat: false } })
// => { name: 'Luna', age: 2, species: 'cat', awesome: { cat: false } }

find(users, { name: 'Jane', age: 1 })
// => undefined

find(users, { name: 'Jane' }, { all: true })
// => [ { name: 'Jane', age: 6, species: 'ferret', admin: true },
//      { name: 'Jane', age: 4, species: 'dog', awesome: { cat: true } } ]

find(users, { name: 'John' }, { all: true })
// => undefined

find(users, { name: 'Jane' }, { all: true, index: true })
// => [ 1, 3 ]

find(users, { name: 'John' }, { all: true, index: true })
// => undefined

find(users, { name: 'Luna' }, { index: true })
// => 2

find(users, { name: 'Jane' }, { map: function(e, i) {
  e.age++
  e.index = i
  return e
}})
// => { name: 'Jane', age: 7, species: 'ferret', admin: true, index: 1 }
```

## Thanks

Mainly forked / inspired by <a href="https://github.com/component/find" target="_blank">find</a> and <a href="https://github.com/defunctzombie/node-partial-compare" target="_blank">partial-compare</a>
