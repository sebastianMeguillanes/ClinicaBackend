const express = require("express");
const router = express.Router();
const agendaController = require("../../controllers/agendaController");

router
    .get("/", agendaController.getAllAgenda)
    .get("/:id", agendaController.getAgendaById)
    .post("/",agendaController.createAgenda)
    .put("/:id", agendaController.updateAgenda)
    .delete("/:id",agendaController.deleteAgenda);   
     
module.exports = router;