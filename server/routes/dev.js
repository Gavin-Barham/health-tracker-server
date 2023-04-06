const controllers = require('../controllers/dev');
const express = require('express');
const router = express.Router();

router.get('/version', controllers.version);

module.exports = router;