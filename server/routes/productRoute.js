var express = require('express');
var router = express.Router();
var DBSERVICES = require('../services/db.services');
var errors = require('../modules/errors');
var passport = require('passport');

/* POST Create Product. */
router.post('/', passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }), function(req, res) {
    if (!req.body.title ||
        !req.body.description ||
        !req.body.price ||
        !req.body.imageUrl 
      ) {
        return errors.badrequest(res);
      }

      try {
          DBSERVICES.createProduct(req.body)
          .then(data=>{
              return res.json('created');
          })
      } catch (error) {
          return errors.serverError(res);
      }

},
function (err, req, res, next) {
    return res.json(err);
});

/* GET List Products. */
router.get('/',passport.authenticate('bearer', {
    session: false,
    failWithError: true
  }), function(req, res) {
      try {
          DBSERVICES.getAllProducts()
          .then(data=>{
              return res.json(data);
          })
      } catch (error) {
          return errors.serverError(res);
      }

},
function (err, req, res, next) {
    return res.json(err);
});;

module.exports = router;