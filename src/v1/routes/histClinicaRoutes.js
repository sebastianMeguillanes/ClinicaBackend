const express = require("express");
const router = express.Router();
const histClinicaController = require("../../controllers/histClinicaController");
router
    .get("/", histClinicaController.getAllHistClinica)
    .get("/:id", histClinicaController.getHistClinicaById)
    .post("/", histClinicaController.createHistClinica)
    .put("/:id", histClinicaController.updateHistClinica)
    .delete("/:id",histClinicaController.deleteHistClinica);   
    
module.exports = router;