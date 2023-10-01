const pacienteModel = require("../model/pacienteModel");
const moment =  require("moment");

const getAllPacientes = (req, res) => {
    pacienteModel.getAll((error, allPacientes) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener las URLs' });
        } else {
            res.json(allPacientes);
        }
    });
};

const getOnePaciente = (req, res) => {
    const pacienteId = req.params.Id;
    urlService.getOne(pacienteId, (error, onePaciente) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el Paciente' });
        } else {
            res.json(onePaciente);
        }
    });
};

const createNewPaciente = (req, res) => {
    
//datos de persona
    const ci = req.body.ci;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const celular = req.body.celular;
    const direccion = req.body.direccion;
    const sexo = req.body.sexo;
    const fecha_nacimiento = req.body.fecha_nacimiento;
//datos de paciente
    const enfermedad_base = req.body.enfermedad_base;
    

    const nuevoDato = {
        //datos personas
        ci: ci,
        nombre: nombre,
        apellido: apellido,
        celular: celular,
        direccion: direccion,
        sexo: sexo,
        fecha_nacimiento: fecha_nacimiento,
        //datos paciente
    };
    pacienteModel.createNew(nuevoDato, (error, newPaciente) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el paciente' });
        } else {
            res.json(newPaciente);
        }
    });
};

const updateOnePaciente = (req, res) => {
    const urlId = req.params.Id;
    const datosPaciente= {
        ci : req.body.ci,
        nombre: req.body.nombre,
    };
    urlService.updateOne(urlId, urlData, (error, numReplaced) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar la URL' });
        } else {
            res.json({ message: `Se actualizaron ${numReplaced} registros` });
        }
    });
};

const deleteOnePaciente = (req, res) => {
    const urlId = req.params.Id;
    urlService.deleteOne(urlId, (error, numRemoved) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el paciente' });
        } else {
            res.json({ message: `Se eliminaron ${numRemoved} registros` });
        }
    });
};

module.exports = {
    getAllPacientes,
    getOnePaciente,
    createNewPaciente,
    updateOnePaciente,
    deleteOnePaciente,
};