const db = require('../database/db');
const bcrypt = require('bcrypt');

class UserService {
  async getUserByUsername(usuario) {
    const query = 'SELECT * FROM usuario WHERE usuario = $1';
    const values = [usuario];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async comparePasswords(plainPassword, hashedPassword) {
    try {
      const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);
      return passwordMatch;
    } catch (error) {
      console.error('Error al comparar contraseñas:', error);
      return false;
    }
  }
}
module.exports = new UserService();
