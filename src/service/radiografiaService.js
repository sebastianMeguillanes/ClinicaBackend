// radiografiaService.js

const db = require('../database/db');

async function guardarRadiografia(histClinicaData, nombreImagen) {
  try {
    
    const query =  'INSERT INTO radiografia (nombre_paciente,nombre_imagen) VALUES ($1, $2);';
    const values = [histClinicaData,nombreImagen];

    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
}


async function obtenerDatosPorNombreImagen(nombreImagen) {
  try {
    const query = 'SELECT nombre_paciente FROM radiografia WHERE nombre_imagen = $1';
    const values = [nombreImagen];

    const result = await db.query(query, values);
    return result.rows[0]; // Suponiendo que solo hay una fila con ese nombre de imagen
  } catch (error) {
    throw error;
  }
}



module.exports = { 
  guardarRadiografia,
  obtenerDatosPorNombreImagen
 };
