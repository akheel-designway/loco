var express = require('express');
var router = express.Router();
var DBSERVICES = require('../services/db.services');
var errors = require('../modules/errors');

/* POST Create Cart. */
router.post('/', function(req, res) {
    if (!req.body.meta) {
        return errors.badrequest(res);
      }

      try {
          DBSERVICES.createCart(req.body)
          .then(data=>{
              return res.json(data);
          })
      } catch (error) {
          console.log(error);
          return errors.serverError(res);
      }

});

/* POST Update Cart. */
router.put('/', function(req, res) {
    if (!req.body.meta) {
        return errors.badrequest(res);
      }

      if (!req.body.id) {
        return errors.badrequest(res);
      }

      try {
          DBSERVICES.updateCart(req.body)
          .then(data=>{
              return res.json(data);
          })
      } catch (error) {
          console.log(error);
          return errors.serverError(res);
      }

});

/* GET Cart. */
router.get('/:id', function(req, res) {
    if (!req.params.id) {
        return errors.badrequest(res);
      }
      try {
          DBSERVICES.getCart(req.params.id)
          .then(data=>{
              return res.json(data);
          })
      } catch (error) {
          console.log(error);
          return errors.serverError(res);
      }

});

module.exports = router;