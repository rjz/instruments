function extend (obj) {
  [].slice.call(arguments, 1).forEach(function (otherObj) {
    Object.keys(otherObj).forEach(function (k) {
      obj[k] = otherObj[k];
    });
  });
  return obj;
}

module.exports = function instrument (opts) {

  var exports = {};

  var defaults = {
    report: console.log.bind(console)
  };

  var options = extend(defaults, opts);

  /**
   * Report number of calls for a function
   *
   * @id counter
   * @param {String} name - the name of the instrument
   * @param {Function} fn - the function to instrument
   */
  exports.counter = function counter (name, fn) {
    var count = 0;
    return function () {
      count = count + 1;
      options.report({ name: name, count: count });
      fn.apply(this, arguments);
    };
  };

  /**
   * Report execution time of an async function
   *
   * @id timed
   * @param {String} name - the name of the instrument
   * @param {Function} fn - the function to instrument
   */
  exports.timed = function timed (name, fn) {
    return function () {

      var args = [].slice.call(arguments, 0),
          callback = args.pop(),
          t0 = Date.now();

      fn(function () {
        var dt = Date.now() - t0;
        options.report({ name: name, dt: dt });
        callback.apply(this, args.slice(1));
      });
    };
  };

  /**
   * Report execution time of a blocking function
   *
   * @id timedSync
   * @param {String} name - the name of the instrument
   * @param {Function} fn - the function to instrument
   */
  exports.timedSync = function timedSync (name, fn) {
    return function () {
      var dt, result,
          args = [].slice.call(arguments, 0),
          callback = args.pop(),
          t0 = Date.now();

      result = fn();
      dt = Date.now() - t0;
      options.report({ name: name, dt: dt });
      return result;
    };
  };

  return exports;
};

