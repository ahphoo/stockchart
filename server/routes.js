/**
* Main application routes
*/

'use strict';

let path = require('path');

exports = module.exports = function(app) {
  // Insert routes below
  app.use('/api/stocks', require('./api/stock'));
  // Error Checking
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  if(app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        rest.status(err.status || 500)
        res.json({
          message: err.message, 
          error: err
        });
    });
  }
}
