const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const path = require('path');
const uuid = require('uuid'); // Módulo para generar nombres únicos

// Routers
const pacienteRoutes = require("./v1/routes/pacienteRoutes");
const doctorRoutes = require("./v1/routes/doctorRoutes");
const tratamientoRoutes = require("./v1/routes/tratamientoRoutes");
const histClinicaRoutes = require("./v1/routes/histClinicaRoutes");

const db = require('./database/db');

const app = express();
const PORT = process.env.PORT || 2000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload()); // Agrega la configuración para manejar la carga de archivos

// Ruta para cargar una imagen
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'Imagen no cargada' });
  }

  const uploadedFile = req.files.uploadedFile;
  const uploadPath = path.join(__dirname, 'upload', uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    res.json({ message: 'File uploaded successfully.' });
  });
});

function startServer() {
  /* 
  app.use("/api/v1", openroutes); */
  app.use("/api/v1/paciente", pacienteRoutes);
  app.use("/api/v1/doctor", doctorRoutes);
  app.use("/api/v1/tratamiento", tratamientoRoutes);
  app.use("/api/v1/histClinica", histClinicaRoutes);

  app.listen(PORT, () => {
    console.log("Server listen en el puerto", PORT);
  });
}

startServer();
