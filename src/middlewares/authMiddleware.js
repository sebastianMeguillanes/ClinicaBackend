const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Obtiene el token del encabezado de autorización
  const token = req.header('Authorization');
  
  // Verifica si el token existe
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    // Verifica la validez del token
    const decoded = jwt.verify(token, 'tu_secreto_secreto');
    
    // Agrega la información del usuario decodificada al objeto de solicitud
    req.user = decoded;
    
    // Continúa con la ejecución del siguiente middleware o controlador
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido' });
  }
}

module.exports = authenticateToken;
