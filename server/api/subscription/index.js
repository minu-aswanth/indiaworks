'use strict';

var express = require('express');
var controller = require('./subscription.controller');

var router = express.Router();

router.post('/', controller.create);
router.post('/verify/:token', controller.verify);

module.exports = router;