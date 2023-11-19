const express = require("express");
const router = express.Router();
const tratamientoController = require("../../controllers/tratamientoController");

router
        .get("/", tratamientoController.getAllTratamientos)
        .get("/:id", tratamientoController.getTratamientoById)
        .post("/", tratamientoController.createTratamiento)
        .put("/:id", tratamientoController.updateTratamiento)
        .delete("/:id",tratamientoController.deleteTratamiento);   
    
module.exports = router;