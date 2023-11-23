const express = require('express');
const router = express.Router();
const usuarioController = require('../../controllers/usuarioController');

router
        .get("/", usuarioController.getAllUsuario)
        .get("/:id",usuarioController.getUsuarioById)
        .post('/', usuarioController.createUsuario);
        
module.exports = router;
