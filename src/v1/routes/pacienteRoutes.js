const express = require("express");
const router = express.Router();
const pacienteController = require("../../controllers/pacienteController");
router
    .get("/", pacienteController.getAllPacientes)
    .get("/:Id", pacienteController.getOnePaciente)
    .post("/", pacienteController.createNewPaciente)
    .put("/:Id", pacienteController.updateOnePaciente)
    .delete("/:Id",pacienteController.deleteOnePaciente);   
    
module.exports = router;