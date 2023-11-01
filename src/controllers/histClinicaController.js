const histClinicaService = require("../service/histClinicaService");

// Obtener todos las historias clinicas
const getAllHistClinica = async (req, res) => {
  try {
    const histClinica = await histClinicaService.getAll();
    res.status(200).json(histClinica);
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

// Crear un nuevo Historial Clinica
const createHistClinica = async (req, res) => {
  const histClinicaData = req.body;
  try {
    const nuevohistClinica = await histClinicaService.createNew(histClinicaData);
    res.status(201).json(nuevohistClinica);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el Historia Clinica' });
  }
};

// Actualizar Historial Clinica por su ID
const updateHistClinica = async (req, res) => {
  const histClinicaId = req.params.id;
  const histClinicaData = req.body;
  try {
    const resultado = await histClinicaService.updateOne(histClinicaId, histClinicaData);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar Historial Clinica' });
  }
};

// Eliminar un Historial clinica por su ID
const deleteHistClinica = async (req, res) => {
  const histClinicaId = req.params.id;
  try {
    await histClinicaService.deleteOne(histClinicaId);
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el Historial Clinica' });
  }
};

module.exports = {
  getAllHistClinica,
  getHistClinicaById,
  createHistClinica,
  updateHistClinica,
  deleteHistClinica
};
