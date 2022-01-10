const { Router } = require('express');
const { gurosGet, gurosPost } = require('../controllers/guros');
const router = Router();

router.get('/', gurosGet);
router.post('/', gurosPost );


module.exports = router;