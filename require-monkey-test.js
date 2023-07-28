var assert = require('chai').assert;

var monkey = require('./require-monkey');

describe('require monkey', function () {
    it('should monkey patch built-in libs', function (done) {

        monkey('fs', {
            stat: function (file, cb) {
                cb('test error', 'stats');
            }
        });

        var fs = require('fs');

        fs.stat('./require-monkey', function (err, stats) {
            assert.equal(err, 'test error');
            assert.equal(stats, 'stats');

            done();
        });

    });

    it('should work with node_modules and npm', function () {

        var mocha = require('mocha');

        assert.isTrue(mocha.hasOwnProperty('utils'));

        monkey('mocha', function (foo) {
            assert.equal(foo, 'foo');
        });

        var mocked = require('mocha');

        mocked('foo');

    });

    it('should mock project files', function () {

        monkey(__dirname + '/require-monkey.js', 'mocked');

        var requireMonkey = require('./require-monkey');

        assert.equal(requireMonkey, 'mocked');

    });
});
