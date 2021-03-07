var express = require('express');
var router = express.Router();
var DBSERVICES = require('../services/db.services');
var errors = require('../modules/errors');

var passport = require('passport');
var crypto = require('crypto');
var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var randtoken = require('rand-token').generator({
  chars: 'A-Z',
  source: crypto.randomBytes
});


router.post('/register', async (req, res) => {
    if (!req.body.email ||
      !req.body.password ||
      !req.body.username ||
      !req.body.firstname || !req.body.lastname) {
      return errors.badrequest(res);
    }
    var token = SHA256(randtoken.generate(16)).toString();
    req.body.token = token;
    req.body.password = SHA256( req.body.password).toString()
    DBSERVICES.createUser(req.body)
      .then(results => {
        return res.json({
          success: true
        });
      })
      .catch(error => {
        console.log('error', error);
        return res.status(500).json({
          error: "There is some problem",
          errorStatus: error
        });
      });
  });


  router.post('/authenticate', async (req, res) => {
    if (!req.body.password ||
      !req.body.username ) {
      return errors.badrequest(res);
    }
    req.body.password = SHA256(req.body.password).toString()
    DBSERVICES.login(req.body)
      .then(results => {
        return res.json({
          results
        });
      })
      .catch(error => {
        if(error == 'UNF'){
          errors.badrequest(res,"User Not Found.");
        }
        return res.status(500).json({
          error: "There is some problem",
          errorStatus: error
        });
      });
  });


  module.exports = router;