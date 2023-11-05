const express = require("express");
const router = express.Router();
const histClinicaController = require("../../controllers/histClinicaController");
const { radiografia, radiografiaImage } = require('../../controllers/histClinicaController');

router
    .get("/", histClinicaController.getAllHistClinica)
    .get("/:id", histClinicaController.getHistClinicaById)
    .post("/", histClinicaController.createHistClinica)  
    .put("/:id", histClinicaController.updateHistClinica)
    .delete("/:id",histClinicaController.deleteHistClinica);   
  
//routers de imagenes 
router
    .get("/radiografia/:imageName", histClinicaController.getImage)
    .post('/radiografia', radiografia.single(), radiografiaImage)
    .delete("/radiografia/:imageName", histClinicaController.deleteImage)

    
module.exports = router;