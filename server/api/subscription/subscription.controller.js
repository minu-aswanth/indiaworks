'use strict';

var _ = require('lodash');
var Subscription = require('./subscription.model');

// Get list of subscriptions
exports.index = function(req, res) {
  Subscription.find(function (err, subscriptions) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(subscriptions);
  });
};

// Creates a new subscription in the DB.
exports.create = function(req, res) {
  req.body.createdOn = Date.now();
  console.log(Subscription.find({ email: req.body.email }));
  Subscription.create(req.body, function (err, subscription) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(subscription);
  });  
};

function handleError(res, err) {
  return res.status(500).json(err);
}