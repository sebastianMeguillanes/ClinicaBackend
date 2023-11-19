const express = require("express");
const router = express.Router();
const authenticateToken = require('../../middlewares/authMiddleware');
const tratamientoController = require("../../controllers/tratamientoController");
router
    .get("/",authenticateToken, tratamientoController.getAllTratamientos)
    .get("/:id",authenticateToken, tratamientoController.getTratamientoById)
    .post("/",authenticateToken, tratamientoController.createTratamiento)
    .put("/:id",authenticateToken, tratamientoController.updateTratamiento)
    .delete("/:id",authenticateToken,tratamientoController.deleteTratamiento);   

// RUTAS SIN PROTEGER//
// router
//         .get("/", tratamientoController.getAllTratamientos)
//         .get("/:id", tratamientoController.getTratamientoById)
//         .post("/", tratamientoController.createTratamiento)
//         .put("/:id", tratamientoController.updateTratamiento)
//         .delete("/:id",tratamientoController.deleteTratamiento);   
    
module.exports = router;