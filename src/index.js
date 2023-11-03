const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const path = require('path');



// Routers
const pacienteRoutes = require("./v1/routes/pacienteRoutes");
const doctorRoutes = require("./v1/routes/doctorRoutes");
const tratamientoRoutes = require("./v1/routes/tratamientoRoutes");
const histClinicaRoutes = require("./v1/routes/histClinicaRoutes");
const radiografiaRoutes = require('./v1/routes/radiografiaRoutes');



const app = express();
app.use(express.json());
app.use(bodyParser.json());
const PORT = process.env.PORT || 2000;

function startServer() {
  
  app.use("/api/v1/paciente", pacienteRoutes);
  app.use("/api/v1/doctor", doctorRoutes);
  app.use("/api/v1/tratamiento", tratamientoRoutes);
  app.use("/api/v1/histClinica", histClinicaRoutes);
  app.use('/api/v1/radiografia', radiografiaRoutes);

  app.listen(PORT, () => {
    console.log("Server listen en el puerto", PORT);
  });
}

startServer();
