const db = require('../database/db');

// Obtener todos los usuarios.
const getAll = async ()=> {
  try {
    const response = await db.query(
      "SELECT usuario.*,rol.* FROM usuario JOIN rol ON usuario.id_rol = rol.id_rol;"
    );
    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Obtener todos los usuarios por el id
const getOne = async (usuarioId)=> {
  try {
    const response = await db.query(
      "SELECT usuario.*,rol.* FROM usuario JOIN rol ON usuario.id_rol = rol.id_rol where usuario.id_usuario= $1;",
      [usuarioId]
    );
    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createNew = async (UsuarioData,hashedPassword) =>{
  try {
    const {
      nombre,
      usuario,
      contrasena,
      direccion_correo_electronico,
      id_rol
    } = UsuarioData

    const response = await db.query(
      "INSERT INTO usuario (nombre, usuario, contrasena, direccion_correo_electronico, id_rol) VALUES ($1, $2, $3, $4, $5);",
      [nombre, usuario, hashedPassword, direccion_correo_electronico, id_rol]
    );

    return response.rows[0];
  }catch(error){
    console.log(error);
    throw error;
  }
}

module.exports = {
  getAll,
  getOne,
  createNew,
};