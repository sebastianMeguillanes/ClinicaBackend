const express = require("express");
const router = express.Router();
const authenticateToken = require('../../middlewares/authMiddleware');
const pacienteController = require("../../controllers/pacienteController");

router
    .get("/",authenticateToken,pacienteController.getAllPacientes)
    .get("/:id", authenticateToken,pacienteController.getPacienteById)
    .post("/",authenticateToken, pacienteController.createPaciente)
    .put("/:id",authenticateToken, pacienteController.updatePaciente)
    .delete("/:id",authenticateToken,pacienteController.deletePaciente);   

    // RUTAS SIN PROTEGER//
// router
//     .get("/",pacienteController.getAllPacientes)
//     .get("/:id",pacienteController.getPacienteById)
//     .post("/", pacienteController.createPaciente)
//     .put("/:id", pacienteController.updatePaciente)
//     .delete("/:id",pacienteController.deletePaciente);      
    
module.exports = router;

//module.exports =(app) => app.use("/pacienteRoutes",router);