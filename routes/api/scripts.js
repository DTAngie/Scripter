const express = require('express');
const router = express.Router();
const scriptsCtrl = require('../../controllers/scripts');

router.post('/', scriptsCtrl.create);
//Get All Scripts
// router.get('/all', script.index)
//Get All Scripts from self
router.get('/', scriptsCtrl.index);
// //Get all scripts of other user
// router.get('/author/:id', script.show);
//Maybe use query string instead of parameters?
// router.get('/all/?author=id', script.allScripts);
// //Get one Script
router.get('/:id', scriptsCtrl.show);
router.delete('/:id', scriptsCtrl.delete);

module.exports = router;