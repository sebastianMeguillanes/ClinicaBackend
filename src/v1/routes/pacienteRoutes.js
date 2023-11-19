const express = require("express");
const router = express.Router();
const pacienteController = require("../../controllers/pacienteController");

router
    .get("/",pacienteController.getAllPacientes)
    .get("/:id",pacienteController.getPacienteById)
    .post("/", pacienteController.createPaciente)
    .put("/:id", pacienteController.updatePaciente)
    .delete("/:id",pacienteController.deletePaciente);      
    
module.exports = router;
