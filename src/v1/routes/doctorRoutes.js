const express = require("express");
const router = express.Router();
const doctorController = require("../../controllers/doctorController");
router
    .get("/", doctorController.getAllDoctores)
    .get("/:Id", doctorController.getOneDoctor)
    .post("/", doctorController.createNewDoctor)
    .put("/:Id", doctorController.updateOneDoctor)
    .delete("/:Id",doctorController.deleteOneDoctor);   
    
module.exports = router;