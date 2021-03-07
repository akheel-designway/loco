var express = require('express');
var router = express.Router();
var DBSERVICES = require('../services/db.services');
var errors = require('../modules/errors');

/* POST Save Contact. */
router.post('/', function(req, res) {
    if (!req.body.email ||
        !req.body.message
      ) {
        return errors.badrequest(res);
      }

      try {
          DBSERVICES.saveContact(req.body)
          .then(data=>{
              return res.json('saved');
          })
      } catch (error) {
          return errors.serverError(res);
      }

});


module.exports = router;