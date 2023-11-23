const tratamientoService = require("../service/tratamientoService");

// Obtener todos los tramientos
const getAllTratamientos = async (req, res) => {
  try {
    const tratamiento = await tratamientoService.getAll();
    res.status(200).json(tratamiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los tratamientos' });
  }
};

// Obtener un tratamietn por el ID paciente
const getTratamientoById = async (req, res) => {
  const tratamientoId = req.params.id;
  try {
    const tramiento = await tratamientoService.getOne(tratamientoId);
    if (tramiento) {
      res.status(200).json(tramiento);
    } else {
      res.status(404).json({ error: 'Tratamiento no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el Tratamiento' });
  }
};

// Crear un nuevo tratamiento
const createTratamiento = async (req, res) => {
  const TratamientoData = req.body;
  try {
    const nuevoTratamiento = await tratamientoService.createNew(TratamientoData);
    res.status(201).json(nuevoTratamiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el tratamiento' });
  }
};

// Actualizar un tratamiento por su ID
const updateTratamiento = async (req, res) => {
  const tratamientoId = req.params.id;
  const TratamientoData = req.body;
  try {
    const resultado = await tratamientoService.updateOne(tratamientoId, TratamientoData);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el tratamiento' });
  }
};

// Eliminar un tratamiento por su ID
const deleteTratamiento = async (req, res) => {
  const tratamientoId = req.params.id;
  try {
    await tratamientoService.deleteOne(tratamientoId);
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el tratamiento' });
  }
};

module.exports = {

    getAllTratamientos,
    getTratamientoById,
    createTratamiento,
    updateTratamiento,
    deleteTratamiento
  
};
