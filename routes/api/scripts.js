const express = require('express');
const router = express.Router();
const scriptsCtrl = require('../../controllers/scripts');

router.post('/', scriptsCtrl.create);
//Get All Scripts
// router.get('/all', script.index)
//Get All Scripts from self
router.get('/', scriptsCtrl.show);
// //Get all scripts of other user
// router.get('/author/:id', script.show);
//Maybe use query string instead of parameters?
// router.get('/all/?author=id', script.show);
// //Get one Script
// router.get('/:id')

module.exports = router;