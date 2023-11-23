const db = require('../database/db');

const getAll = async ()=> {
  try {
    const response = await db.query(
        'SELECT doctor.*, persona.*FROM doctor INNER JOIN persona ON doctor.id_persona = persona.id_persona;'
        );
    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getOne = async (doctorId) => {
  try {
    const response = await db.query(
    'SELECT doctor.*, persona.* FROM doctor INNER JOIN persona ON doctor.id_persona = persona.id_persona WHERE doctor.id_doctor = $1;',
    [doctorId]
    );
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createNew = async (doctorData) => {
  try {
    const {
      nombre,
      apellido,
      celular,
      direccion,
      documento_identidad,
      sexo,
      fecha_nacimiento,
      especialidad,
      universidad,
      licencia_medica
    } = doctorData;

    const response = await db.query(
      'INSERT INTO persona (nombre, apellido, celular, direccion, documento_identidad, sexo, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_persona',
      [nombre, apellido, celular, direccion, documento_identidad, sexo, fecha_nacimiento]
    );

    const idPersona = response.rows[0].id_persona;
    
    await db.query(
    'INSERT INTO doctor (especialidad,universidad,licencia_medica, id_persona) VALUES ($1, $2, $3, $4)',
     [especialidad,universidad,licencia_medica,idPersona]);

    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateOne = async (doctorId, doctorData) => {
  try {
    const {
      nombre,
      apellido,
      celular,
      direccion,
      documento_identidad,
      sexo,
      fecha_nacimiento,
      id_persona,
      especialidad,
      universidad,
      licencia_medica
    } = doctorData;

    const response = await db.query(
      'UPDATE persona SET nombre = $1, apellido = $2, celular = $3, direccion = $4, documento_identidad = $5, sexo = $6, fecha_nacimiento = $7 WHERE id_persona = $8',
      [nombre, apellido, celular, direccion, documento_identidad, sexo, fecha_nacimiento, id_persona]
    );

    await db.query(
    'UPDATE doctor SET especialidad = $1, universidad = $2, licencia_medica = $3 WHERE id_doctor = $4', 
    [especialidad,universidad, licencia_medica, doctorId]);

    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteOne = async (doctorId) => {
  try {
    const response = await db.query('SELECT id_persona FROM doctor WHERE id_doctor = $1', [doctorId]);
    const idPersona = response.rows[0].id_persona;
    await db.query('DELETE FROM doctor WHERE id_doctor = $1', [doctorId]);
    await db.query('DELETE FROM persona WHERE id_persona = $1', [idPersona]);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAll,
  getOne,
  createNew,
  updateOne,
  deleteOne
};