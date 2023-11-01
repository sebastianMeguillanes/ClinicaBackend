const db = require('../database/db');

// Obtener todos los pacientes.
const getAll = async ()=> {
  try {
    const response = await db.query(
      "select * from historial_clinica"
      );
    console.log(response);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

///////////////////////////
// Obtener historia clinica  por su ID
const getOne = async (histClinicaId) => {
  try {
    const response = await db.query(

      "SELECT hc.radiografias, t.tipo AS tipo_tratamiento, CONCAT(p.nombre,' ', p.apellido) AS nombre_doctor FROM historial_clinica hc JOIN tratamiento t ON hc.id_tratamiento = t.id_tratamiento JOIN doctor d ON hc.id_doctor = d.id_doctor JOIN persona p ON d.id_persona = p.id_persona where id_historial= $1;",
      [histClinicaId]
      );

    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Crear una nueva historial clinica
const createNew = async (histClinicaData) => {
  try {
    const {
      radiografias,
      id_paciente,
      id_tratamiento,
      id_doctor
    } = histClinicaData;

    const response = await db.query(
      'INSERT INTO historial_clinica (radiografias,id_paciente,id_tratamiento,id_doctor) VALUES ($1, $2, $3, $4);',
      [radiografias, id_paciente, id_tratamiento, id_doctor]
    );
    
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};



// Actualizar historial clinica por su ID
const updateOne = async (histClinicaId, histClinicaData) => {
  try {
    const {
      radiografias,
      id_paciente,
      id_tratamiento,
      id_doctor
    } = histClinicaData;

    const response = await db.query(
      'UPDATE historial_clinica SET radiografias = $1, id_paciente = $2, id_tratamiento = $3, id_doctor = $4 WHERE id_historial = $5',
      [radiografias, id_paciente,id_tratamiento,id_doctor,histClinicaId]
    );

    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Eliminar un historial clinica por su ID
const deleteOne = async (histClinicaId) => {
  try {
    const response = await db.query(
    'DELETE FROM historial_clinica WHERE id_historial = $1', 
    [histClinicaId]);
   
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