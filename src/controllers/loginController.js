const loginService = require('../service/loginService');
const jwt = require("jsonwebtoken");


const login = async (req , res ) =>{
    const usuario = req.body.usuario
    const contrasena = req.body.contrasena
    try {
        const login = await loginService.getUserByUsername(usuario);
       
        if (!login) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
          }
          const passwordMatch = await loginService.comparePasswords(contrasena, login.contrasena);
          if (!passwordMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
          }

          const token = jwt.sign({ userId: login.id_usuario, username: login.usuario }, 'tu_secreto_secreto', { expiresIn: '1h' });
          return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al iniciar Sesion" });
    }
};

module.exports = {login};

