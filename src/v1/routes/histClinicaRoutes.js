const express = require("express");
const router = express.Router();
const histClinicaController = require("../../controllers/histClinicaController");

router
        .get("/",histClinicaController.getAllHistClinica)
        .get("/:id", histClinicaController.getHistClinicaById)//obtiene mediante id_paciente
        .get("/historias/:id",histClinicaController.getHistClinicaById2)//para consultar mediante el id_historial
        .post('/', histClinicaController.createHistClinica)//guarda imagen y datos
        .put("/:id", histClinicaController.updateHistClinica)
        .delete("/:id",histClinicaController.deleteHistClinica);   
  
// //routers para el manejo de imagenes 

router
        .get('/radiografia/:id', histClinicaController.getImage)
        .put("/radiografia/:id", histClinicaController.updateImage)
        .delete("/radiografia/:imageName", histClinicaController.deleteImage);

module.exports = router;