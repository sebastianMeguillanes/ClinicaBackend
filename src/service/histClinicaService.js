const db = require('../database/db');

// Obtener todos los Historiales_Clinicos.
const getAll = async ()=> {
    try {
      const response = await db.query(
        'SELECT hc.id_historial, hc.radiografias, p.nombre AS nombre_paciente, p.apellido AS apellido_paciente, t.tipo AS tipo_tratamiento, d.nombre AS nombre_doctor, d.apellido AS apellido_doctor,hc.fecha_registro,hc.estado_historial FROM historial_clinica hc JOIN paciente pa ON hc.id_paciente = pa.id_paciente JOIN persona p ON pa.id_persona = p.id_persona JOIN tratamiento t ON hc.id_tratamiento = t.id_tratamiento JOIN doctor dr ON hc.id_doctor = dr.id_doctor JOIN persona d ON dr.id_persona = d.id_persona;'
      );
      return response.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Se busca tratamiento mediante paciente
const getOne = async (pacienteId) => {
    try {
      const response = await db.query(
        'SELECT hc.id_historial, hc.radiografias, p.nombre AS nombre_paciente, p.apellido AS apellido_paciente, t.tipo AS tipo_tratamiento, d.nombre AS nombre_doctor, d.apellido AS apellido_doctor,hc.fecha_registro,hc.estado_historial FROM historial_clinica hc JOIN paciente pa ON hc.id_paciente = pa.id_paciente JOIN persona p ON pa.id_persona = p.id_persona JOIN tratamiento t ON hc.id_tratamiento = t.id_tratamiento JOIN doctor dr ON hc.id_doctor = dr.id_doctor JOIN persona d ON dr.id_persona = d.id_persona WHERE pa.id_paciente = $1;',
        [pacienteId]
      );
      return response.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


const createNew = async (histClinicaData) => {
    try {
      const {
        radiografias,
        id_paciente, 
        id_tratamiento, 
        id_doctor, 
        fecha_registro, 
        estado_historial, 
        medicaciones,
        examen_clinico
      } = histClinicaData;
      //console.log("histClinicaData")
      const response = await db.query(
        'INSERT INTO historial_clinica (radiografias,id_paciente, id_tratamiento, id_doctor, fecha_registro, estado_historial, medicaciones,examen_clinico) VALUES ($1, $2, $3, $4, $5, $6, $7,$8);',
        [radiografias,id_paciente, id_tratamiento, id_doctor, fecha_registro, estado_historial, medicaciones,examen_clinico]
      );
  
      return response.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  
// Actualizar un historial mediante el id 
const updateOne = async (histClinicaId, histClinicaData) => {
  try {
    const {
      radiografias,
      id_paciente, 
      id_tratamiento, 
      id_doctor, 
      fecha_registro, 
      estado_historial, 
      medicaciones,
      examen_clinico
    } = histClinicaData;

    const response = await db.query(
      'UPDATE historial_clinica SET radiografias= $1, id_paciente = $2,id_tratamiento=$3,id_doctor=$4,fecha_registro=$5,estado_historial=$6,medicaciones=$7,examen_clinico=$8 WHERE id_historial = $9;',
      [radiografias,
        id_paciente, 
        id_tratamiento, 
        id_doctor, 
        fecha_registro, 
        estado_historial, 
        medicaciones,
        examen_clinico, 
        histClinicaId]
    );

    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Eliminar un historial/persona por su ID
const deleteOne = async (histClinicaId) => {
  try {
    const response = await db.query('DELETE FROM historial_clinica WHERE id_historial = $1;', 
    [histClinicaId]);
    
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