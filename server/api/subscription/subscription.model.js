'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubscriptionSchema = new Schema({
  email: String,
  createdOn: Date
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);