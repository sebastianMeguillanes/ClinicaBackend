const express = require("express");
const router = express.Router();
const authenticateToken = require('../../middlewares/authMiddleware');
const agendaController = require("../../controllers/agendaController");
router
    .get("/",authenticateToken, agendaController.getAllAgenda)
    .get("/:id",authenticateToken, agendaController.getAgendaById)
    .post("/",authenticateToken,agendaController.createAgenda)
    .put("/:id",authenticateToken, agendaController.updateAgenda)
    .delete("/:id",authenticateToken,agendaController.deleteAgenda);   
    
    // RUTAS SIN PROTEGER//
// router
//     .get("/", agendaController.getAllAgenda)
//     .get("/:id", agendaController.getAgendaById)
//     .post("/",agendaController.createAgenda)
//     .put("/:id", agendaController.updateAgenda)
//     .delete("/:id",agendaController.deleteAgenda);   
     
module.exports = router;