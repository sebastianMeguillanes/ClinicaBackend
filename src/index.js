const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const pacienteRoutes = require("./v1/routes/pacienteRoutes");
const doctorRoutes = require("./v1/routes/doctorRoutes");
const db = require('./database/db'); 

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

db.url.loadDatabase((err) => {
  if (err) {
    console.error('Error al cargar la base de datos:', err);
    process.exit(1);
  } else {
    console.log('Base de datos cargada correctamente');
    startServer();
  }
});

function startServer() {
  app.use("/api/v1", openroutes);
  app.use("/api/v1/paciente", seguridad.authMiddleware, pacienteRoutes);
  app.use("/api/v1/doctor",seguridad.authMiddleware, doctorRoutes);
  
  app.listen(PORT ,() =>{
      console.log("Server listen en el puerto",PORT)
  }); 
}