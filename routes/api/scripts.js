const express = require('express');
const router = express.Router();
const scriptsCtrl = require('../../controllers/scripts');
const multer = require('multer');
const upload = multer();

router.post('/', upload.single('poster'), scriptsCtrl.create);
router.get('/all', scriptsCtrl.allScripts);
router.get('/', scriptsCtrl.index);
router.get('/all/featured', scriptsCtrl.getFeatured);
router.get('/:id', scriptsCtrl.show);
//TODO: update control flow for the edit function as well
router.put('/:id', upload.single('poster'), scriptsCtrl.update);
router.delete('/:id', scriptsCtrl.delete);

module.exports = router;