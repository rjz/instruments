var assert = require('assert'),
    Reporter = require('./helpers/reporter');

var rprtr = new Reporter();

var instruments = require('../index')({
  report: rprtr.push
});

function fooSync () {
  return true;
}

describe('.counter', function () {

  var countedFooSync = instruments.counter('fooC', fooSync);

  it('increments as function is called', function () {
    countedFooSync();
    assert.equal(rprtr.filterByName('fooC')[0].count, 1);
  });
});

describe('.timed', function () {

  var val;

  var timedFoo = instruments.timed('fooT', function (lastVal, cb) {
    val = lastVal;
    setTimeout(cb, 1);
  });

  it('reports', function (done) {
    timedFoo(1, function (err) {
      assert.ok(0 < rprtr.filterByName('fooT')[0].dt);
      done(err);
    });
  });

  it('preserves arguments', function (done) {
    timedFoo(2, function (err) {
      done(err);
    });
    assert.equal(2, val);
  });
});

describe('.timedSync', function () {

  var timedFooSync = instruments.timedSync('fooTS', fooSync);

  it('reports', function () {
    timedFooSync();
    assert.ok(undefined !== rprtr.filterByName('fooTS')[0].dt);
  });
});

