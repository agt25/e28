let mix = require('laravel-mix');

// https://laravel-mix.com/docs/mixjs
// source: src/script.js
// output: js/master.js
mix.js('src/script.js', 'js/main.js').vue();