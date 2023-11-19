const db = require('../database/db');

// Obtener todos los pacientes.
const getAll = async ()=> {
  try {
    const response = await db.query(
      'SELECT * FROM usuario;'
    );
    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener un paciente por su ID
const getOne = async (usuarioid) => {
  try {
    const response = await db.query(
      'SELECT * FROM usuario WHERE id_usuario = $1;',
      [usuarioid]	
    );
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createNew = async (usuarioData) => {
  try {
    const {
      nombre,
      usuario,
      contraseña,
      direccion_correo_electronico,
      rol,
    } = usuarioData;

    const response = await db.query(
      'INSERT INTO usuario (nomre,usuario,contraseña,direccion_correo_electronico,rol) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [nombre, usuario, contraseña, direccion_correo_electronico, rol]
    );

    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Actualizar un paciente/persona por su ID
const updateOne = async (usuarioId, usuarioData) => {
  try {
    const {
      nombre,
      usuario,
      contraseña,
      correo,
    } = usuarioData;

    const response = await db.query(
      'UPDATE usuario SET nombre = $1, usuario = $2, contraseña = $3, correo = $4  WHERE id = $6',
      [nombre, usuario, contraseña, correo,usuarioId]
    );
    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Eliminar un paciente/persona por su ID
const deleteOne = async (pacienteId) => {
  try {
    const response = await db.query('SELECT id = $1', [pacienteId]);
    const idPersona = response.rows[0].id_persona;
    await db.query('DELETE FROM paciente WHERE id_paciente = $1', [pacienteId]);
    await db.query('DELETE FROM persona WHERE id_persona = $1', [idPersona]);
    return true;
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