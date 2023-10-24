const db = require('../database/db');

// Obtener todos los pacientes.
const getAll = async ()=> {
  try {
    const response = await db.query(
      'SELECT pa.nombre, pa.apellido,d.nombre,d.apellido,t.descripcion FROM historial_clinica hc JOIN paciente p ON hc.id_paciente = p.id_paciente JOIN doctor dr ON hc.id_doctor = dr.id_doctor JOIN tratamiento t ON hc.id_tratamiento = t.id_tratamiento JOIN persona pa ON p.id_persona = pa.id_persona JOIN persona d ON dr.id_persona = d.id_persona;'
    );
    console.log(response);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

///////////////////////////
// Obtener un por su ID
const getOne = async (histClinicaId) => {
  try {
    const response = await db.query(
      'SELECT paciente.*, persona.* FROM paciente INNER JOIN persona ON paciente.id_persona = persona.id_persona WHERE paciente.id_paciente = $1;',
      [pacienteId]
    );
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Crear un nuevo paciente
// Crear un nuevo paciente/persona
const createNew = async (pacienteData) => {
  try {
    const {
      nombre,
      apellido,
      celular,
      direccion,
      documento_identidad,
      sexo,
      fecha_nacimiento,
      enfermedad_base,
    } = pacienteData;

    const response = await db.query(
      'INSERT INTO persona (nombre, apellido, celular, direccion, documento_identidad, sexo, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_persona',
      [nombre, apellido, celular, direccion, documento_identidad, sexo, fecha_nacimiento]
    );

    const idPersona = response.rows[0].id_persona;
    
    await db.query('INSERT INTO paciente (enfermedad_base, id_persona) VALUES ($1, $2)', [enfermedad_base, idPersona]);

    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};



// Actualizar un paciente/persona por su ID
const updateOne = async (pacienteId, pacienteData) => {
  try {
    const {
      nombre,
      apellido,
      celular,
      direccion,
      documento_identidad,
      sexo,
      fecha_nacimiento,
      enfermedad_base,
    } = pacienteData;

    const response = await db.query(
      'UPDATE persona SET nombre = $1, apellido = $2, celular = $3, direccion = $4, documento_identidad = $5, sexo = $6, fecha_nacimiento = $7 WHERE id_persona = $8',
      [nombre, apellido, celular, direccion, documento_identidad, sexo, fecha_nacimiento, pacienteId]
    );

    await db.query('UPDATE paciente SET enfermedad_base = $1 WHERE id_paciente = $2', [enfermedad_base, pacienteId]);

    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Eliminar un paciente/persona por su ID
const deleteOne = async (pacienteId) => {
  try {
    const response = await db.query('SELECT id_persona FROM paciente WHERE id_paciente = $1', [pacienteId]);
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