const express = require('express');
const router = express.Router();
const path = require('path');
const radiografiaController = require("../../controllers/radiografiaController");

// Ruta para consultar una imagen por nombre
router
    
.get("/:imageName", radiografiaController.getImage)
.delete("/:imageName", radiografiaController.deleteImage)

module.exports = router;