const express = require("express");
const router = express.Router();
const doctorController = require("../../controllers/doctorController");

router
    .get("/", doctorController.getAllDoctores)
    .get("/:id", doctorController.getDoctorById)
    .post("/", doctorController.createDoctor)
    .put("/:id",  doctorController.updateDoctor)
    .delete("/:id",doctorController.deleteDoctor);   

module.exports = router; 