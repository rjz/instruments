Instruments
===============================================================================

Simple function instrumentation

Installation
-------------------------------------------------------------------------------

Clone this repository:

    $ git clone git@github.com:rjz/instruments.git

Usage
-------------------------------------------------------------------------------

Use instruments to create function reporting:

    var instruments = require('instruments')();

    function somethingSlow (callback) {
      setTimeout(callback, 5000);
    }

    var timedSomethingSlow = instruments.timed('timer1', somethingSlow);

Specify a custom reporter (Defaults to `console.log`) when creating the
instruments:

    var instruments = require('instruments')({
      report: function (entry) {
        console.log('[instrument]', entry);
      }
    });

#### Instruments

  * `counter(name, fn)` - increment a counter on each call
  * `timed(name, fn)` - elapsed time for an async (continuation-style) function
  * `timedSync(name, fn)` - elapsed time for a blocking function

Testing
-------------------------------------------------------------------------------

Lint:

    $ npm run lint

Lint and run test suite:

    $ npm test

License
-------------------------------------------------------------------------------

MIT

