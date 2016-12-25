# Laravel Blade Parser

[![Build Status](https://travis-ci.org/pbelyaev/laravel-blade-compiler.svg?branch=master)](https://travis-ci.org/pbelyaev/laravel-blade-compiler)
[![NPM Downloads](https://img.shields.io/npm/dt/laravel-blade-compiler.svg)](https://www.npmjs.com/package/laravel-blade-compiler)
[![NPM Version](https://img.shields.io/npm/v/laravel-blade-compiler.svg)](https://www.npmjs.com/package/laravel-blade-compiler)
[![NPM License](https://img.shields.io/npm/l/laravel-blade-compiler.svg)](https://www.npmjs.com/package/laravel-blade-compiler)

This package compile laravel blade templates to HTML.
 
## Installation
 
 Via Yarn:
 ```console
 $ yarn add laravel-blade-compiler
 ```
 or via NPM:
 ```console
 $ npm install laravel-blade-compiler
 ```

## Usage

Require the package like so:
 ```js
var laravelBladeCompiler = require('laravel-blade-compiler');
```

Then you can use the package like so:
```js
var compiledHTML = laravelBladeCompiler({
    folder: 'path/to/views/folder',
    path: 'path/to/template.blade.php'
});
```

## Options

| Name | Type | Default value | Description |
|---|---|---|---|
| extends | boolean | true | Enable/disable compiling @extends directives |
| folder | string | ./resources/views | Path to the views directory. |
| encoding | string | utf8 | Blade templates encoding |
| path | string | ./resources/views/welcome.blade.php | Path to the compiled blade template file |
