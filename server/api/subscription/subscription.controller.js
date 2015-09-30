'use strict';

var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var smtpapi    = require('smtpapi');
var Subscription = require('./subscription.model');

var EMAIL = ''; // Put your fest mail id here
var PASSWORD = ''; // Put your fest password here 

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
  Subscription.findOne({ email: req.body.email }, function (err, exist) {
    if(err) { return handleError(res, err); }
    if(!exist) {
      Subscription.create(req.body, function (err, subscription) {
        if(err) { return handleError(res, err); }
        if(!err) {
          async.waterfall([
            function (done) {
              crypto.randomBytes(25, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
              });
            },
            function (token, done) {
              subscription.verificationToken = token;
              subscription.verificationTokenExpires = Date.now() + 3600000; // one hour

              subscription.save(function (err) {
                done(err, token, subscription);
              })
            },
            function (token, subscription, done) {
              var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: EMAIL,
                  pass: PASSWORD
                }
              });
              var mailOptions = {
                to: subscription.email,
                from: EMAIL,
                subject: 'Thank you - IndiaWorks',
                text: 'Thank you for subscribing to IndiaWorks.\n\n' +
                'Please click on the following link, or paste this into your browser to verify your account:\n\n' +
                'http://' + req.headers.host + '/verify/' + token + '\n\n' +
                'If you did not request this, please ignore this email.\n'
              };
              smtpTransport.sendMail(mailOptions, function (err, info) {
                if(err) {
                  console.log('err', err);
                  console.log('info', info);
                  // return res.sendStatus(500);
                } else {
                  return res.json(201, subscription);
                }
              });      
            }
            ], function (err) {
              if(err) { return next(err); }
              res.redirect('/');
            });
        }
      });  
    } else {
      return res.status(201);
    }
  });
};

// Verify email
exports.verify = function(req, res) {
  Subscription.findOne({ verificationToken: req.params.token }, function (err, subscription) {
    if(err) { return handleError(res, err); }
    if(subscription) {
      subscription.verificationToken = '';
      subscription.emailVerified = true;
      subscription.save(function (err) {
        if(err) { return handleError(res, err); }
        else {
          return res.json(200, 'Success');
        }
      });
    } else {
      return res.json(404, 'Fail');
    }
  });
};

function handleError(res, err) {
  return res.json(500, err);
}