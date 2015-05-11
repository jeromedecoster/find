# Find

Array find value utility

## Install

Install with <a href="http://nodejs.org/" target="_blank">npm</a> directly from the <a href="https://github.com/jeromedecoster/find" target="_blank">github repository</a>

```
npm install jeromedecoster/find
```

## API

#### find(array, fn, [all])

Find with a function

#### find(array, obj, [all])

Find with object value matching

#### find(array, str, [all])

Find with a property string

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

find(users, 'awesome.cat')
// => { name: 'Jane', age: 4, species: 'dog', awesome: { cat: true } }

find(users, { name: 'Jane', age: 1 })
// => undefined

find(users, { name: 'Jane' }, true)
// => [ { name: 'Jane', age: 6, species: 'ferret', admin: true },
//      { name: 'Jane', age: 4, species: 'dog', awesome: { cat: true } } ]

find(users, { name: 'John' }, true)
// => undefined
```

## Thanks

Mainly forked / inspired by <a href="https://github.com/component/find" target="_blank">find</a> and <a href="https://github.com/sindresorhus/dot-prop" target="_blank">dot-prop</a>
