const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authMiddleware');
const usuarioController = require('../../controllers/usuarioController');

router
        .get("/",authenticateToken, usuarioController.getAllUsuario)
        .get("/:id",authenticateToken,usuarioController.getUsuarioById)
        .post('/',authenticateToken, usuarioController.createUsuario);

module.exports = router;
