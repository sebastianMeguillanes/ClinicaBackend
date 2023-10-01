const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: '181.188.156.195',
  database: 'ClinicaDBDB',
  password: 'admin1234',
  port: 18004, // Puerto predeterminado de PostgreSQL
});

const getUsers = async (req,res)=>{
const response = await pool.query('SELECT paciente.*, persona.*FROM paciente INNER JOIN persona ON paciente.id_persona = persona.id_persona;');
      res.status(200).json(response.rows);
};

const getUsersById = async (req, res) =>{
    const id = req.params.id
    const response = await pool.query('SELECT p.id_persona, p.nombre, p.apellido, p.celular, p.direccion, p.documento_identidad, p.sexo, p.fecha_nacimiento, pc.id_paciente, pc.enfermedad_base, pc.estado FROM persona p INNER JOIN paciente pc ON p.id_persona = pc.id_persona WHERE pc.id_paciente = $1;',[id])
    //const response = await pool.query('SELECT *FROM persona WHERE id_persona = $1',[id]);
    res.json(response.rows)
};

const creatUser = async (req, res) => {
    
    const {nombre,apellido,celular,direccion,documento_identidad,sexo,fecha_nacimiento,enfermedad_base} = req.body;
    const response = await pool.query('INSERT INTO persona (nombre,apellido,celular,direccion,documento_identidad,sexo,fecha_nacimiento) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id_persona',
                                        [nombre,apellido,celular,direccion,documento_identidad,sexo,fecha_nacimiento]);
    const idPersona = response.rows[0].id_persona;
    await pool.query('INSERT INTO paciente (enfermedad_base,id_persona) VALUES ($1,$2)',[enfermedad_base,idPersona]);

    //console.log(response);
    res.send("person created: "+ idPersona);
};




const updateUser = async (req, res) =>{
    const id = req.params.id;
    const {nombre,apellido,celular,direccion,documento_identidad,sexo,fecha_nacimiento, enfermedad_base} = req.body;
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

    await pool.query('UPDATE paciente SET enfermedad_base =$1 WHERE id_persona=$2',[enfermedad_base,id]);

    console.log(response);
    res.send("User update successfull");
    //res.json('User update successfull')
};

const deleteUser = async (req,res) => {
    const id = req.params.id
    const response = await pool.query ('SELECT id_persona FROM paciente WHERE id_paciente = $1;',[id]);
    const idPersona = response.rows[0].id_persona;
    await pool.query('DELETE FROM paciente WHERE id_paciente = $1',[id]);
    await pool.query('DELETE FROM persona WHERE id_persona = $1',[idPersona]);
    res.send('user deleted '+ req.params.id);
    //console.log(response);
    //res.json(`User ${id} deleted successfully`)
};



module.exports = {
    getUsers,
    getUsersById,
    creatUser,
    updateUser,
    deleteUser
}