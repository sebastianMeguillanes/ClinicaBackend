const { Client } = require('pg');

const dbConfig = {
  user: 'admin',
  host: '181.188.156.195', 
  database: 'Pruebadb',
  password: 'admin1234',
  port: 18004,
};

const client = new Client(dbConfig);
console.error('holaaaaa en db');

client.on('error', (err) => {
    console.error('Error in PostgreSQL pool: ' + err.message);
  });
  
  module.exports = {
    query: (text, params, callback) => {
        console.error('Error in PostgreSQL pool: ' + err.message);
      return client.query(text, params, callback);
      
    },
  };
