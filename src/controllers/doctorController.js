const doctorModel = require("../service/doctorService");

const getAllDoctores = async (req,res) => {
    try{
        const doctores = await doctorModel.getAll();
        res.status(200).json(doctores) 
    }catch(error){
        console.error(error);
        res.status(500).json({ error:'Error al obtener doctor' });
    }
};

const getDoctorById = async (req, res) => {
    const doctorId = req.params.id;
    try {
      const doctor = await doctorModel.getOne(doctorId);
      if (doctor) {
        res.status(200).json(doctor);
      } else {
        res.status(404).json({ error: 'Doctor no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el doctor' });
    }
  };

const createDoctor = async (req, res) =>{
  const doctorData = req.body;
    try {
      const nuevodoctor = await doctorModel.createNew(doctorData);
      res.status(201).json(nuevodoctor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el doctor' });
    }
};

const updateDoctor = async (req, res) => {
  const doctorId = req.params.id;
  const doctorData = req.body;
  try {
    const resultado = await doctorModel.updateOne(doctorId,doctorData);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el doctor' });
  }
};

const deleteDoctor = async (req, res) => {
  const doctorId = req.params.id;
  try {
    await doctorModel.deleteOne(doctorId);
    res.status(204).send(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el doctor' });
  }
};

  module.exports = {
    getAllDoctores,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
  }