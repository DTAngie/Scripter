const express = require('express');
const router = express.Router();
const scriptsCtrl = require('../../controllers/scripts');

router.post('/', scriptsCtrl.create);
router.get('/all', scriptsCtrl.allScripts);
router.get('/', scriptsCtrl.index);
router.get('/all/featured', scriptsCtrl.getFeatured);
router.get('/:id', scriptsCtrl.show);
router.put('/:id', scriptsCtrl.update);
router.delete('/:id', scriptsCtrl.delete);

module.exports = router;