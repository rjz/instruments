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
  var countedFoo = instruments.counter('fooC', fooSync);
  it('increments as function is called', function () {
    countedFoo();
    assert.equal(rprtr.filterByName('fooC')[0].count, 1)
  });
});

describe('.timedSync', function () {
  var timedFoo = instruments.counter('fooTS', fooSync);
  it('reports', function () {
    instruments.timedSync('fooTS', timedFoo)();
    assert.equal(rprtr.filterByName('fooTS')[0].count, 1)
  });
});


