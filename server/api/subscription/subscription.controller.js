'use strict';

var _ = require('lodash');
var Subscription = require('./subscription.model');

// Get list of subscriptions
exports.index = function(req, res) {
  Subscription.find(function (err, subscriptions) {
    if(err) { return handleError(res, err); }
    return res.json(200, subscriptions);
  });
};

// Creates a new subscription in the DB.
exports.create = function(req, res) {
  req.body.createdOn = Date.now();
  if(!Subscription.find({ email: req.body.email })){
    Subscription.create(req.body, function(err, subscription) {
      if(err) { console.log(err);return handleError(res, err); }
      return res.json(201, subscription);
    });
  }
};

function handleError(res, err) {
  return res.send(500, err);
}