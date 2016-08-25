var expect = require('chai').expect;
var lib = require('../');

describe('@push inline directive', function () {
    
    var html = lib({
        folder: 'test/examples',
        path: 'test/examples/push-inline.blade.php'
    });

    it('should be passed if everything is okay', function () {

        expect(html.trim()).to.be.equals("Hello, world!");

    });
    
});