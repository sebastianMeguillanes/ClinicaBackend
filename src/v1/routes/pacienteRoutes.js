const express = require("express");
const router = express.Router();
const pacienteController = require("../../controllers/pacienteController");
router
    .get("/", pacienteController.getAllPacientes)
    .get("/:Id", pacienteController.getPacienteById)
    .post("/", pacienteController.createPaciente)
    .put("/:Id", pacienteController.updatePaciente)
    .delete("/:Id",pacienteController.deletePaciente);   
    
module.exports = router;