const pacienteService = require("../service/pacienteService");

// Obtener todos los pacientes
const getAllPacientes = async (req, res) => {
  try {
    const pacientes = await pacienteService.getAll();
    res.status(200).json(pacientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener pacientes' });
  }
};

// Obtener un paciente por su ID
const getPacienteById = async (req, res) => {
  const pacienteId = req.params.id;
  try {
    const paciente = await pacienteService.getOne(pacienteId);
    if (paciente) {
      res.status(200).json(paciente);
    } else {
      res.status(404).json({ error: 'Paciente no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el paciente' });
  }
};

// Crear un nuevo paciente
const createPaciente = async (req, res) => {
  const pacienteData = req.body;
  try {
    const nuevoPaciente = await pacienteService.createNew(pacienteData);
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el paciente' });
  }
};

// Actualizar un paciente por su ID
const updatePaciente = async (req, res) => {
  const pacienteId = req.params.id;
  const pacienteData = req.body;
  try {
    const resultado = await pacienteService.updateOne(pacienteId, pacienteData);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el paciente' });
  }
};

// Eliminar un paciente por su ID
const deletePaciente = async (req, res) => {
  const pacienteId = req.params.id;
  try {
    await pacienteService.deleteOne(pacienteId);
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el paciente' });
  }
};

module.exports = {
  getAllPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
};
