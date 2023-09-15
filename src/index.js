
const db = require('./database/db'); 

const sqlQuery = 'SELECT * FROM paciente';

db.query(sqlQuery, (err, result) => {
  if (err) {
    console.error('Error en la consulta:', err);
    return;
  }

  console.log('Resultado de la consulta:', result.rows);
});
