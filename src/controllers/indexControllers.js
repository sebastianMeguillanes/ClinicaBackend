const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: '181.188.156.195',
  database: 'ClinicaDB',
  password: 'admin1234',
  port: 18004, // Puerto predeterminado de PostgreSQL
});

const getUsers = async (req,res)=>{
   const response = await pool.query('SELECT * FROM persona');
   //para mostrar en consola
//    console.log(response.rows);
//    res.send('users');
//para mostrar en pagina
    res.status(200).json(response.rows);
};

const getUsersById = async (req, res) =>{
    const id = req.params.id
    const response = await pool.query('SELECT *FROM persona WHERE id_persona = $1',[id])
    res.json(response.rows)
};

const creatUser = async (req, res) => {
    const {nombre,apellido,celular,direccion,documento_identidad,sexo,fecha_nacimiento } = req.body;
    const response = await pool.query('INSERT INTO persona (nombre,apellido,celular,direccion,documento_identidad,sexo,fecha_nacimiento) VALUES ($1,$2,$3,$4,$5,$6,$7)',
                                        [nombre,apellido,celular,direccion,documento_identidad,sexo,fecha_nacimiento]);
    console.log(response);
    res.send("person created");
};

const updateUser = async (req, res) =>{
    const id = req.params.id;
    const {nombre,apellido,celular,direccion,documento_identidad,sexo,fecha_nacimiento } = req.body;
    const response = await pool.query('UPDATE persona SET nombre = $1, apellido = $2, celular = $3 , direccion = $4, documento_identidad = $5, sexo = $6, fecha_nacimiento = $7 WHERE id_persona = $8',[
        nombre,
        apellido,
        celular,
        direccion,
        documento_identidad,
        sexo,
        fecha_nacimiento,
        id
    ]);
    console.log(response);
    res.send("User update successfull");
    //res.json('User update successfull')
};

const deleteUser = async (req,res) => {
    const id = req.params.id
    res.send('user deleted '+ req.params.id);
    const response = await pool.query('DELETE FROM persona WHERE id_persona = $1',[id]);
    console.log(response);
    res.json(`User ${id} deleted successfully`)
};



module.exports = {
    getUsers,
    getUsersById,
    creatUser,
    updateUser,
    deleteUser
}