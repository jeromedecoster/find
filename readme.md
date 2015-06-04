# Find

Array find utility

## Install

Install with <a href="https://docs.npmjs.com/cli/install" target="_blank">npm</a> directly from the <a href="https://github.com/jeromedecoster/find" target="_blank">github repository</a>

```
npm install jeromedecoster/find
```

Install from a <a href="https://docs.npmjs.com/files/package.json#github-urls" target="_blank">package.json</a> file

```json
{
  "dependencies": {
    "find": "jeromedecoster/find"
  }
}
```

## API

#### find(array, fn, [options])

Find with a function

```js
var users = [
  { name: 'Tobi', age: 2, species: 'ferret' },
  { name: 'Jane', age: 6, species: 'ferret' },
  { name: 'Luna', age: 2, species: 'cat' },
  { name: 'Jane', age: 4, species: 'dog' }
]

find(users, function(e) { return e.name == 'Jane' && e.age < 5 })
// => { name: 'Jane', age: 4, species: 'dog' }
```

#### find(array, obj, [options])

Find with object value matching

```js
var users = [
  { name: 'Tobi', age: 2, species: 'ferret', admin: false },
  { name: 'Jane', age: 6, species: 'ferret', admin: true },
  { name: 'Luna', age: 2, species: 'cat',    awesome: { cat: false }},
  { name: 'Jane', age: 4, species: 'dog',    awesome: { cat: true } }
]

find(users, { name: 'Jane', age: 4 })
// => { name: 'Jane', age: 4, species: 'dog', awesome: { cat: true } }

find(users, { awesome: { cat: false } })
// => { name: 'Luna', age: 2, species: 'cat', awesome: { cat: false } }

find(users, { name: 'Jane', age: 1 })
// => undefined
```

## Options

#### {all: true}

Return all matches instead of the first one

```js
var users = [
  { name: 'Tobi', age: 2, species: 'ferret' },
  { name: 'Jane', age: 6, species: 'ferret' },
  { name: 'Luna', age: 2, species: 'cat' },
  { name: 'Jane', age: 4, species: 'dog' }
]

find(users, { name: 'Jane' }, { all: true })
// => [ { name: 'Jane', age: 6, species: 'ferret' },
//      { name: 'Jane', age: 4, species: 'dog' } ]

find(users, { name: 'John' }, { all: true })
// => undefined
```

#### {index: true}

Return the index instead of the value

```js
var users = [
  { name: 'Tobi', age: 2, species: 'ferret' },
  { name: 'Jane', age: 6, species: 'ferret' },
  { name: 'Luna', age: 2, species: 'cat' },
  { name: 'Jane', age: 4, species: 'dog' }
]

find(users, { name: 'Luna' }, { index: true })
// => 2

find(users, { name: 'John' }, { index: true })
// => undefined

find(users, { name: 'Jane' }, { index: true, all: true })
// => [ 1, 3 ]
```

#### {last: true}

Return the last match instead of the first one

```js
var users = [
  { name: 'Tobi', age: 2, species: 'ferret' },
  { name: 'Jane', age: 6, species: 'ferret' },
  { name: 'Luna', age: 2, species: 'cat' },
  { name: 'Jane', age: 4, species: 'dog' }
]

find(users, { name: 'Jane' }, { last: true })
// => { name: 'Jane', age: 4, species: 'dog' }

find(users, { name: 'Jane' }, { last: true, all: true, index: true })
// => [3]
```

#### {assign: obj}

Extend each match with `obj`

```js
var users = [
  { name: 'Tobi', age: 2, species: 'ferret' },
  { name: 'Jane', age: 6, species: 'ferret' },
  { name: 'Luna', age: 2, species: 'cat' },
  { name: 'Jane', age: 4, species: 'dog' }
]

find(users, { name: 'Jane' }, { assign: { age: 7, ok: true } })
// => { name: 'Jane', age: 7, species: 'ferret', ok: true }
```

#### {map: fn}

Apply map function on each match

```js
var users = [
  { name: 'Tobi', age: 2, species: 'ferret' },
  { name: 'Jane', age: 6, species: 'ferret' },
  { name: 'Luna', age: 2, species: 'cat' },
  { name: 'Jane', age: 4, species: 'dog' }
]

find(users, { name: 'Jane' }, { map: function(e, i) {
  e.age++
  e.index = i
  return e
}})
// => { name: 'Jane', age: 7, species: 'ferret', index: 1 }
```

## Tests

Successfully tested on

| Browser | Versions |
| ------- | -------- |
| IE | 9 ... 11 |
| Chrome | 35 ... 43 |
| Firefox | 30 ... 37 |
| Safari | 6 ... 8 |
| iPhone | 5.0 ... 8.1 |
| iPad | 5.0 ... 8.1 |
| Android | 4.0 ... 5.1 |

## Thanks

Mainly forked / inspired by <a href="https://github.com/component/find" target="_blank">find</a> and <a href="https://github.com/defunctzombie/node-partial-compare" target="_blank">partial-compare</a>
