const express = require("express");
const router = express.Router();
const histClinicaController = require("../../controllers/histClinicaController");
router
    .get("/", histClinicaController.getAllhistClinica)
    .get("/:id", histClinicaController.getHistClinicaById)
    .post("/", histClinicaController.createHistclinica)
    .put("/:id", histClinicaController.updateHistclinica)
    .delete("/:id",histClinicaController.deletehistClinica);   
    
module.exports = router;