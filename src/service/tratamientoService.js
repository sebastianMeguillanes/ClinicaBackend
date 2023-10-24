const db = require('../database/db');

// Obtener todos los pacientes.
const getAll = async ()=> {
  try {
    const response = await db.query(
      'SELECT t.id_tratamiento,t.descripcion,t.cantidad_sesion,p.nombre,p.apellido FROM tratamiento t INNER JOIN paciente pa ON t.id_paciente = pa.id_paciente INNER JOIN persona p ON pa.id_persona = p.id_persona;'
    );
    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Se busca tratamiento mediante paciente
const getOne = async (tramientoId) => {
  try {
    const response = await db.query(
      'SELECT t.id_tratamiento, t.descripcion, t.cantidad_sesion, p.nombre, p.apellido FROM tratamiento t INNER JOIN paciente pa ON t.id_paciente = pa.id_paciente INNER JOIN persona p ON pa.id_persona = p.id_persona WHERE pa.id_paciente = $1;',
      [tramientoId]
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
      descripcion,
      cantidad_sesion,
      id_paciente 
    } = TratamientoData;

    const response = await db.query(
      'INSERT INTO tratamiento (descripcion, cantidad_sesion, id_paciente) VALUES ($1, $2, $3);',
      [descripcion, cantidad_sesion, id_paciente]
    );

    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};



// Actualizar un tratamiento mediante el id 
const updateOne = async (tramientoId, TratamientoData) => {
  try {
    const {
        descripcion,
        cantidad_sesion,
        id_paciente 
      } = TratamientoData;

    const response = await db.query(
      'UPDATE tratamiento SET descripcion = $1, cantidad_sesion = $2, id_paciente = $3 WHERE id_tratamiento = $4',
      [descripcion,cantidad_sesion,id_paciente, tramientoId]
    );

    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Eliminar un paciente/persona por su ID
const deleteOne = async (tramientoId) => {
  try {
    const response = await db.query('DELETE FROM tratamiento WHERE id_tratamiento = $1;', [tramientoId]);
    
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