const express = require('express');
const app = express();
const PORT = 4000 
//midelwares
 app.use(express.json());
 app.use(express.urlencoded({extended: false}))

//routers
app.use(require('./routes/index.js'));

//definir puerto  
app.listen(PORT);
console.log("Server on port " + PORT);