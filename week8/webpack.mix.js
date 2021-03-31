const mix = require('laravel-mix');

// https://laravel-mix.com/docs/mixjs
// source: src/script.js
// output: js/app.js
mix.js('src/script.js', 'js/app.js').vue();