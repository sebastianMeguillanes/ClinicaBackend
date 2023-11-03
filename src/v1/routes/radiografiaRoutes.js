const express = require('express');
const router = express.Router();
const { radiografia, radiografiaImage } = require('../../controllers/radiografiaController');

router.post('/', radiografia.single(), radiografiaImage);

module.exports = router;
