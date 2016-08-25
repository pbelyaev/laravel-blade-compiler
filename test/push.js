var expect = require('chai').expect;
var lib = require('../');

describe('@push directive', function () {
    
    var html = lib({
        folder: 'test/examples',
        path: 'test/examples/push.blade.php'
    });

    it('should be passed if everything is okay', function () {

        expect(html.trim().replace("\n\n", "")).to.be.equals("Hello, world!");

    });
    
});