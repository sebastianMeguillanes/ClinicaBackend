const db = require('../database/db');

// Obtener todos los pacientes.
const getAll = async ()=> {
  try {
    const response = await db.query(
      'select * from tratamiento;'
    );
    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Se busca tratamiento mediante paciente
const getOne = async (tratamientoId) => {
  try {
    const response = await db.query(
      'select * from tratamiento where id_tratamiento = $1;',
      [tratamientoId]
    );
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Crear un nuevo tratamiento
const createNew = async (TratamientoData) => {
  try {
    const {
      tipo,
      cantidad_sesion
    } = TratamientoData;

    const response = await db.query(
      'INSERT INTO tratamiento (tipo, cantidad_sesion) VALUES ($1, $2);',
      [tipo, cantidad_sesion]
    );

    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Actualizar un tratamiento mediante el id 
const updateOne = async (tratamientoId, TratamientoData) => {
  try {
    const {
        tipo,
        cantidad_sesion 
      } = TratamientoData;

    const response = await db.query(
      'UPDATE tratamiento SET tipo = $1, cantidad_sesion = $2 WHERE id_tratamiento = $3',
      [tipo,cantidad_sesion, tratamientoId]
    );

    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Eliminar un paciente/persona por su ID
const deleteOne = async (tratamientoId) => {
  try {
    const response = await db.query('DELETE FROM tratamiento WHERE id_tratamiento = $1;', [tratamientoId]);
    
    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Exportar las funciones del servicio
module.exports = {
  getAll,
  getOne,
  createNew,
  updateOne,
  deleteOne
};