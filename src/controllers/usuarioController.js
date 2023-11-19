const usuarioService = require('../service/usuarioService');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
const getAllUsuario = async (req, res) => {
    try {
      const usuario = await usuarioService.getAll();
      res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los Usuarios' });
    }
  };

  // Obtener un usuario por el id_usuario
const getUsuarioById = async (req, res) => {
    const usuarioId = req.params.id;
    try {
      const usuario = await usuarioService.getOne(usuarioId);
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el Usuario' });
    }
  };
  
//Crea usuario mandando por hash
const createUsuario = async (req,res) =>{
    const UsuarioData = req.body;
    const password = req.body.contrasena;

     // Hash the password before saving it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const nuevoUsuario = await usuarioService.createNew(UsuarioData,hashedPassword);
        res.status(201).json(nuevoUsuario)
    }catch (error) {
        console.error(error);
        res.status(500).json({ error:'Error al crear usuario'})
    }
}

module.exports = {
    getAllUsuario,
    getUsuarioById,
    createUsuario,
};
