const db = require('../database/db');

// Obtener todos los Historiales_Clinicos.
const getAll = async ()=> {
    try {
      const response = await db.query(
        "SELECT * FROM historial_clinica JOIN paciente ON historial_clinica.id_paciente = paciente.id_paciente JOIN persona ON paciente.id_persona = persona.id_persona JOIN tratamiento ON historial_clinica.id_tratamiento = tratamiento.id_tratamiento JOIN doctor ON historial_clinica.id_doctor = doctor.id_doctor JOIN persona AS persona_doctor ON doctor.id_persona = persona_doctor.id_persona;"
      );
      return response.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Se busca Historial Clinica mediante paciente
const getOne = async (pacienteId) => {
    try {
      const response = await db.query(
        "SELECT * FROM historial_clinica JOIN paciente ON historial_clinica.id_paciente = paciente.id_paciente JOIN persona ON paciente.id_persona = persona.id_persona JOIN tratamiento ON historial_clinica.id_tratamiento = tratamiento.id_tratamiento JOIN doctor ON historial_clinica.id_doctor = doctor.id_doctor JOIN persona AS persona_doctor ON doctor.id_persona = persona_doctor.id_persona WHERE historial_clinica.id_paciente = $1;",
        [pacienteId]
      );
      return response.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  const getOne2 = async (histClinicaId) => {
    try {
      const response = await db.query(
        'Select * from historial_clinica WHERE id_historial = $1;',
        [histClinicaId]
      );
      return response.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

// Crea historial clinica con imagen  
async function createNew(histClinicaData, imageName) {
  try {
    const {
        id_paciente, 
        id_tratamiento, 
        id_doctor, 
        fecha_registro, 
        estado_historial, 
        medicaciones,
        examen_clinico
      } = histClinicaData;
      //console.log(nombrePaciente)
    const query =  'INSERT INTO historial_clinica (id_paciente,id_tratamiento,id_doctor,fecha_registro,estado_historial,medicaciones,examen_clinico,radiografias) VALUES ($1, $2, $3, $4, $5, $6, $7,$8);';
    const values = [id_paciente,id_tratamiento,id_doctor,fecha_registro,estado_historial,medicaciones,examen_clinico,imageName];

    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

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
  
//obtiene imagen con datos

//Obtiene los datos de la id 
async function getdate(histClinicaId) {
  try {

    const response = await db.query("SELECT hc.id_historial, hc.medicaciones,hc.examen_clinico, p.nombre AS nombre_paciente, p.apellido AS apellido_paciente, t.tipo AS tipo_tratamiento, d.nombre AS nombre_doctor, d.apellido AS apellido_doctor,hc.fecha_registro,hc.estado_historial FROM historial_clinica hc JOIN paciente pa ON hc.id_paciente = pa.id_paciente JOIN persona p ON pa.id_persona = p.id_persona JOIN tratamiento t ON hc.id_tratamiento = t.id_tratamiento JOIN doctor dr ON hc.id_doctor = dr.id_doctor JOIN persona d ON dr.id_persona = d.id_persona WHERE hc.id_historial = $1;",
    [histClinicaId]
    )
    
    //const result = await db.query(query, values);
    return response.rows[0]; // Suponiendo que solo hay una fila con ese nombre de imagen
  } catch (error) {
    throw error;
  }
}

//obtiene nombre de la imagen
async function getImage(histClinicaId) {
  try {

    const response = await db.query(
      "SELECT radiografias FROM historial_clinica WHERE id_historial = $1;",
      [histClinicaId]
      );
    
      const imageName = response.rows[0].radiografias;
      //const result = await db.query(query, values);
      return imageName;  // Suponiendo que solo hay una fila con ese nombre de imagen
  } catch (error) {
    throw error;
  }
}

//editar imagen
async function updateimagedate2(histClinicaId,histClinicaData, imageName) {
  try {
    const query = "UPDATE historial_clinica SET id_paciente = $1 , id_tratamiento = $2, id_doctor = $3 , fecha_registro = $4 , estado_historial = $5 , medicaciones = $6 , examen_clinico = $7 , radiografias = $8 WHERE id_historial = $9;";
    const values = [imageName];

    const result = await db.query(query, values);
    return result.rows[0]; // Suponiendo que solo hay una fila con ese nombre de imagen
  } catch (error) {
    throw error;
  }
}

// Crea historial clinica con imagen  //////////////////////////////////FALTAAA AQUI
async function updateimagedate(histClinicaId,histClinicaData, imageName) {
  try {
    
    const {
        id_paciente, 
        id_tratamiento, 
        id_doctor, 
        fecha_registro, 
        estado_historial, 
        medicaciones,
        examen_clinico
      } = histClinicaData;
      //console.log(nombrePaciente)
    const query =  "UPDATE historial_clinica SET id_paciente = $1 , id_tratamiento = $2, id_doctor = $3 , fecha_registro = $4 , estado_historial = $5 , medicaciones = $6 , examen_clinico = $7 , radiografias = $8 WHERE id_historial = $9;";
    const values = [id_paciente,id_tratamiento,id_doctor,fecha_registro,estado_historial,medicaciones,examen_clinico,imageName,histClinicaId];

    const result = await db.query(query, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
}


//eliminar imagen 
async function deleteimagedate(imageName) {
  try {
    const query = "UPDATE historial_clinica SET radiografias = '0' WHERE radiografias = $1;";
    const values = [imageName];

    const result = await db.query(query, values);
    return result.rows[0]; // Suponiendo que solo hay una fila con ese nombre de imagen
  } catch (error) {
    throw error;
  }
}



  
  // Exportar las funciones del servicio
module.exports = {
    getAll,
    getOne,
    createNew,
    updateOne,
    deleteOne,
    getOne2,
    getdate,
    getImage,
    updateimagedate,
    deleteimagedate
  };