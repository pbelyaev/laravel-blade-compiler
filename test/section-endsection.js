var expect = require('chai').expect;
var lib = require('../');

describe('@section with @endsection directive', function () {

    var html = lib({
        folder: 'test/examples',
        path: 'test/examples/section-endsection.blade.php'
    });

    it('should be passed if everything is okay', function () {

        expect(html.trim()).to.be.equals("Hello, world!");

    });

});