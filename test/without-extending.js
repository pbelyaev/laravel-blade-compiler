var expect = require('chai').expect;
var lib = require('../');

describe('@extends are disabled', function () {

    var html = lib({
        folder: 'test/examples',
        path: 'test/examples/extend.blade.php',
        extends: false
    });

    it('should be passed if everything is okay', function () {

        expect(html.trim()).to.be.equals("@extends('includes.message')");

    });

});
