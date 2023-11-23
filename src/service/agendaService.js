const db = require('../database/db');

// Obtener todos las agendas.
const getAll = async ()=> {
    try {
      const response = await db.query(
        "SELECT agenda.*, persona.* FROM agenda JOIN doctor ON agenda.id_doctor = doctor.id_doctor JOIN persona ON doctor.id_persona = persona.id_persona;"
      );
      return response.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Se busca agenda mediante id doctor
  const getOne = async (doctorId) => {
    try {
      const response = await db.query(
        "SELECT agenda.*, persona.* FROM agenda JOIN doctor ON agenda.id_doctor = doctor.id_doctor JOIN persona ON doctor.id_persona = persona.id_persona where agenda.id_agenda = $1;",
        [doctorId]
      );
      return response.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  // Crear un nueva genda
const createNew = async (AgendaData) => {
    try {
      const {
        nombre_paciente,
        ci,
        fecha_hora,
        descripcion,
        id_doctor
      } = AgendaData;
  
      const response = await db.query(
        'INSERT INTO agenda (nombre_paciente, ci, fecha_hora, descripcion, id_doctor) VALUES ($1, $2, $3, $4, $5);',
        [ nombre_paciente,ci,fecha_hora,descripcion,id_doctor]
      );
  
      return response.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Actualizar un tratamiento mediante el id 
const updateOne = async (agendaId, AgendaData) => {
    try {
        const {
            nombre_paciente,
            ci,
            fecha_hora,
            descripcion,
            id_doctor,
            estado_agenda
          } = AgendaData;
  
      const response = await db.query(
        'UPDATE agenda SET nombre_paciente = $1, ci = $2, fecha_hora = $3, descripcion = $4, id_doctor = $5 , estado_agenda = $6 WHERE id_agenda = $7',
        [nombre_paciente,ci,fecha_hora,descripcion,id_doctor,estado_agenda,agendaId]
      );
  
      return response.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Eliminar un agenda por su ID
const deleteOne = async (agendaId) => {
    try {
      const response = await db.query('DELETE FROM agenda WHERE id_agenda = $1;', [agendaId]);
      
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