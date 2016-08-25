var expect = require('chai').expect;
var lib = require('../');

describe('@include directive', function () {
    
    var html = lib({
        folder: 'test/examples',
        path: 'test/examples/include.blade.php'
    });

    it('should be passed if everything is okay', function () {

        expect(html.trim()).to.be.equals("Hello, world!");

    });
    
});