const express = require('express');
const loginController = require('../../controllers/loginController');

const router = express.Router();

// Otras rutas aquí...

// Ruta para iniciar sesión
router.post('/', loginController.login);

module.exports = router;