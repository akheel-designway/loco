var express = require('express');
const config = require('config');
const production = config.get('errors');

module.exports = {
    serverError: function(res, error = "" ) {
      var defaultError = "Server Error"
      // logger.error(error != "" ? error : defaultError) 
      return res.status(500).json({
        code : 500,
        error: !production ? defaultError : error != "" ? error : defaultError
      });
    },
    unauthorized: function(res) {
      return res.status(401).json({
        code : 401,
        error: "Unauthorized"
      });
    },
    badrequest: function(res, error = "" ) {
      var defaultError = "Please check all the prams are correct."
      return res.status(400).json({
        code : 400,
        error: !production ? defaultError : error != "" ? error : defaultError
      });
    },
    custom: function(res,code,message) {
      return res.status(code).json({
        code : code,
        error: message
      });
    }
};