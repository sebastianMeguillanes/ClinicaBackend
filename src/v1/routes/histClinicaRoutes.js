const express = require("express");
const router = express.Router();
const histClinicaController = require("../../controllers/histClinicaController");
const { radiografia, radiografiaImage } = require('../../controllers/histClinicaController');

router
    .get("/", histClinicaController.getAllHistClinica)
    .get("/:id", histClinicaController.getHistClinicaById)
    .post("/", histClinicaController.createHistClinica)   
    .post('/radiografia', radiografia.single(), radiografiaImage)
    .put("/:id", histClinicaController.updateHistClinica)
    .delete("/:id",histClinicaController.deleteHistClinica);   
    
module.exports = router;