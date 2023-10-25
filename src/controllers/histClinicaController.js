const histClinicaService = require("../service/histClinicaService");

// Obtener todos las historias clinicas
const getAllhistClinica = async (req, res) => {
  try {
    const pacientes = await histClinicaService.getAll();
    res.status(200).json(pacientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Historia Clinica' });
  }
};

// Obtener un historial Clinica por su ID
const getHistClinicaById = async (req, res) => {
  const histClinicaId = req.params.id;
  try {
    const histClinica = await histClinicaService.getOne(histClinicaId);
    if (histClinica) {
      res.status(200).json(histClinica);
    } else {
      res.status(404).json({ error: 'Historia clinica no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la historia clinica' });
  }
};

// Crear un nuevo paciente
const createHistclinica = async (req, res) => {
  const pacienteData = req.body;
  try {
    const nuevoPaciente = await histClinicaService.createNew(pacienteData);
    res.status(201).json(nuevoPaciente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el Historia Clinica' });
  }
};

// Actualizar un paciente por su ID
const updateHistclinica = async (req, res) => {
  const pacienteId = req.params.id;
  const pacienteData = req.body;
  try {
    const resultado = await histClinicaService.updateOne(pacienteId, pacienteData);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar Historial Clinica' });
  }
};

// Eliminar un paciente por su ID
const deletehistClinica = async (req, res) => {
  const pacienteId = req.params.id;
  try {
    await histClinicaService.deleteOne(pacienteId);
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el Historial Clinica' });
  }
};

module.exports = {
  getAllhistClinica,
  getHistClinicaById,
  createHistclinica,
  updateHistclinica,
  deletehistClinica
};
