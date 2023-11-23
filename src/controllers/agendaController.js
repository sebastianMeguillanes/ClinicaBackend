const agendaService = require("../service/agendaService");

// Obtener todos los agenda
const getAllAgenda = async (req, res) => {
  try {
    const agenda = await agendaService.getAll();
    res.status(200).json(agenda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las agendas' });
  }
};

// Obtener un tratamietn por el ID paciente
const getAgendaById = async (req, res) => {
  const agendaId = req.params.id;
  try {
    const agenda = await agendaService.getOne(agendaId);
    if (agenda) {
      res.status(200).json(agenda);
    } else {
      res.status(404).json({ error: 'Agenda no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Agenda' });
  }
};

// Crear un nueva Agenda
const createAgenda = async (req, res) => {
  const AgendaData = req.body;
  try {
    const nuevoAgenda = await agendaService.createNew(AgendaData);
    res.status(201).json(nuevoAgenda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el Agenda' });
  }
};

// Actualizar un paciente por su ID
const updateAgenda = async (req, res) => {
  const agendaId = req.params.id;
  const AgendaData = req.body;
  console.log(AgendaData)
  try {
    const resultado = await agendaService.updateOne(agendaId, AgendaData);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar  Agenda' });
  }
};

// Eliminar Agenda por su ID
const deleteAgenda = async (req, res) => {
  const agendaId = req.params.id;
  try {
    await agendaService.deleteOne(agendaId);
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar agenda' });
  }
};

module.exports = {

    getAllAgenda,
    getAgendaById,
    createAgenda,
    updateAgenda,
    deleteAgenda
  
};
