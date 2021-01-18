const express = require('express');
const router = express.Router();
const scriptsCtrl = require('../../controllers/scripts');

router.post('/', scriptsCtrl.create);

module.exports = router;