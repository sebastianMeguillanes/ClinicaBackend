const { Pool } = require('pg');

const dbConfig = {
  user: 'admin',
  host: '181.188.156.195', 
  database: 'ClinicaDBDB',
  password: 'admin1234',
  port: 18004,
};

const client = new Pool(dbConfig);

client.on('error', (err) => {

    console.error('Error in PostgreSQL pool: ' + err.message);
  });
  
  module.exports = {
    query: (text, params, callback) => {
      return client.query(text, params, callback);
    },
  };
