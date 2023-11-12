const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const seguridad = require("./middlewares/auth.handler");
const path = require('path');

const pacienteRoutes = require("./v1/routes/pacienteRoutes");
const doctorRoutes = require("./v1/routes/doctorRoutes");
const tratamientoRoutes = require("./v1/routes/tratamientoRoutes");
const histClinicaRoutes = require("./v1/routes/histClinicaRoutes");
const agendaRoutes = require("./v1/routes/agendaRoutes");
const radiografiaRoutes = require('./v1/routes/radiografiaRoutes');

const app = express();

// Configurar el directorio de imágenes estáticas (upload)
app.use('/uploads', express.static(path.join(__dirname, 'upload')));

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const PORT = process.env.PORT || 2000;

function startServer() {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use("/paciente", pacienteRoutes);
  router.use("/doctor", doctorRoutes);
  router.use("/tratamiento", tratamientoRoutes);
  router.use("/histClinica", histClinicaRoutes);
  router.use('/radiografia', radiografiaRoutes);
  router.use('/agenda', agendaRoutes);

  app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
  });
}

startServer();
