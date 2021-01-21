const express = require('express');
const router = express.Router();
const ratingsCtrl = require('../../controllers/ratings');

router.post('/', ratingsCtrl.create);


module.exports = router;