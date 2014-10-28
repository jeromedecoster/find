
var combine = require('combine-streams')
var fmt = require('util').format;
var minify = require('uglify-js').minify;
var pkg = require('../package.json');
var write = require('fs').createWriteStream;

combine()
.append(fmt('/*! %s v%s */\n', pkg.name, pkg.version))
.append(minify('./index.js').code)
.append('\n')
.append(null)
.pipe(write('./index.min.js'))
