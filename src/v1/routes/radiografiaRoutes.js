const express = require('express');
const router = express.Router();
const radiografiaController = require('../../controllers/radiografiaController');

router.post('/guardar', radiografiaController.guardarRadiografia);
router.get('/:nombreImagen', radiografiaController.buscarRadiografiaPorNombre);


module.exports = router;
