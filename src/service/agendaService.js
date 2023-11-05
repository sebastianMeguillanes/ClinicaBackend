const db = require('../database/db');

// Obtener todos las agendas.
const getAll = async ()=> {
    try {
      const response = await db.query(
        'select * from agenda;'
      );
      return response.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Se busca agenda mediante id
const getOne = async (agendaId) => {
    try {
      const response = await db.query(
        'select * from agenda where id_agenda = $1;',
        [agendaId]
      );
      return response.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Crear un nueva genda
const createNew = async (AgendaData) => {
    try {
      const {
        nombre,
        ci,
        fecha_hora,
        descripcion,
        id_doctor
      } = AgendaData;
  
      const response = await db.query(
        'INSERT INTO agenda (nombre, ci, fecha_hora, descripcion, id_doctor) VALUES ($1, $2, $3, $4, $5);',
        [ nombre,ci,fecha_hora,descripcion,id_doctor]
      );
  
      return response.rows[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  


// Exportar las funciones del servicio
module.exports = {
    getAll,
    getOne,
    createNew
  };