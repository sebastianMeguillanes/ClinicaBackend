const express = require("express");
const router = express.Router();
const authenticateToken = require('../../middlewares/authMiddleware');
const doctorController = require("../../controllers/doctorController");
router
    .get("/",authenticateToken, doctorController.getAllDoctores)
    .get("/:id",authenticateToken, doctorController.getDoctorById)
    .post("/",authenticateToken, doctorController.createDoctor)
    .put("/:id",authenticateToken,  doctorController.updateDoctor)
    .delete("/:id",authenticateToken,doctorController.deleteDoctor);   

     
module.exports = router; 