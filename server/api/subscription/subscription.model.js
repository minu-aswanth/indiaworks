'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubscriptionSchema = new Schema({
  email: String,
  createdOn: Date
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);

SubscriptionSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
});