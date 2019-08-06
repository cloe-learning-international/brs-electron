var express = require('express');
var router = express.Router();
var challenges_controller = require("../controllers/challenges.controller");

/* GET links api */
router.route('/')
  .get(challenges_controller.findAll);
  

router.route('/:id')
  .get(challenges_controller.findById);

module.exports = router;