const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());
const histClinicaController = require('../src/controllers/histClinicaController');

describe('Pruebas para histClinicaController', () => {
  
app.get('/api/v1/histClinica', histClinicaController.getAllHistClinica);
app.get('/api/v1/histClinica/:id', histClinicaController.getHistClinicaById);
app.post('/api/v1/histClinica', histClinicaController.createHistClinica);
app.put('/api/v1/histClinica/:id', histClinicaController.updateHistClinica);
app.delete('/api/v1/histClinica/:id',histClinicaController.deleteHistClinica);  


  //Obtener Historia clinica 
  it('debería obtener todos los historiales clinicos', async () => {
    const response = await request(app).get('/api/v1/histClinica');
    expect(response.status).toBe(200);
   
  });

  //Obtener historia clinica mediante el id
  it('debería obtener un historial clinica por su ID', async () => {
    const response = await request(app).get('/api/v1/histClinica/6');
    expect(response.status).toBe(200);
  });

  //Crear Historia clinica 
  it('debería crear un nuevo historial clinica', async () => {
    const nuevohistorial_clinica = {
        radiografias:"4156165.jpg",
        id_paciente:31,
        id_tratamiento:6,
        id_doctor:14,
                
    };
  
    const response = await request(app)
      .post('/api/v1/histClinica')
      .send(nuevohistorial_clinica);
  
    expect(response.status).toBe(201); 

  });

  //editar historia clinica
  it('debería modificar una historia clinica existente', async () => {
    const datosActualizados =  {
        radiografias:"415616512.jpg",
        id_paciente:31,
        id_tratamiento:6,
        id_doctor:14,
                
    };
  
    const response = await request(app)
      .put("/api/v1/histClinica/4")
      .send(datosActualizados);
  
    expect(response.status).toBe(200); 
  });

//   //para eliminar historial clinica
  it('debería eliminar un tratamiento existente', async () => {
    
    const response = await request(app).delete('/api/v1/histClinica/3');
  
    expect(response.status).toBe(204); 
  });
  

  
  

});


