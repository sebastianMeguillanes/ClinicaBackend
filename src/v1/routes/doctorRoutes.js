const express = require("express");
const router = express.Router();
const doctorController = require("../../controllers/doctorController");
router
    .get("/", doctorController.getAllDoctores)
    .get("/:id", doctorController.getOneDoctor)
    .post("/", doctorController.createNewDoctor)
    .put("/:id", doctorController.updateOneDoctor)
    .delete("/:id",doctorController.deleteOneDoctor);   
    
module.exports = router; 