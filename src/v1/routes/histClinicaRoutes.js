const express = require("express");
const router = express.Router();
const authenticateToken = require('../../middlewares/authMiddleware');
const histClinicaController = require("../../controllers/histClinicaController");

router
        .get("/",authenticateToken,histClinicaController.getAllHistClinica)
        .get("/:id",authenticateToken, histClinicaController.getHistClinicaById)//obtiene mediante id_paciente
        .get("/historias/:id", authenticateToken,histClinicaController.getHistClinicaById2)//para consultar mediante el id_historial
        .post('/',authenticateToken, histClinicaController.createHistClinica)//guarda imagen y datos
        .put("/:id",authenticateToken, histClinicaController.updateHistClinica)
        .delete("/:id",authenticateToken,histClinicaController.deleteHistClinica);   
  
// //routers para el manejo de imagenes 

router
        .get('/radiografia/:id',authenticateToken, histClinicaController.getImage)
        .put("/radiografia/:id",authenticateToken, histClinicaController.updateImage)
        .delete("/radiografia/:imageName", authenticateToken,histClinicaController.deleteImage);

        // RUTAS SIN PROTEGER//
// router
//         .get("/",histClinicaController.getAllHistClinica)
//         .get("/:id", histClinicaController.getHistClinicaById)//obtiene mediante id_paciente
//         .get("/historias/:id",histClinicaController.getHistClinicaById2)//para consultar mediante el id_historial
//         .post('/', histClinicaController.createHistClinica)//guarda imagen y datos
//         .put("/:id", histClinicaController.updateHistClinica)
//         .delete("/:id",histClinicaController.deleteHistClinica);   
  
// // //routers para el manejo de imagenes 

// router
//         .get('/radiografia/:id', histClinicaController.getImage)
//         .put("/radiografia/:id", histClinicaController.updateImage)
//         .delete("/radiografia/:imageName", histClinicaController.deleteImage);

module.exports = router;