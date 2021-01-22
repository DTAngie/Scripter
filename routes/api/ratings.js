const express = require('express');
const router = express.Router();
const ratingsCtrl = require('../../controllers/ratings');

router.post('/', ratingsCtrl.create);
router.get('/', ratingsCtrl.show);
router.put('/:id', ratingsCtrl.update);


module.exports = router;