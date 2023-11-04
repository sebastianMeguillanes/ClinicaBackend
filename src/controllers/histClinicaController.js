const histClinicaService = require("../service/histClinicaService");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
  
  // Obtén el nombre único del archivo de la variable
  const radiografias = getUniqueFileName();

  // Agrega el nombre único del archivo a los datos
  histClinicaData.radiografias = radiografias;
console.log(histClinicaData);
  const guardarEnBaseDeDatos = new Promise(async (resolve, reject) => {
    try {
      // Realiza cualquier otra operación necesaria aquí, como validar datos
      // Luego, llama a la función para guardar en la base de datos
      const nuevohistClinica = await histClinicaService.createNew(histClinicaData);

      resolve(nuevohistClinica);
    } catch (error) {
      reject(error);
    }
  });

  try {
    const result = await guardarEnBaseDeDatos;
    res.status(201).json(result);
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


// FUNCIONES IMAGENES

const getImage = async (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../upload', imageName);
  
  // Enviar la imagen como respuesta
  if (fs.existsSync(imagePath)) {
    // Eliminar la imagen
    res.sendFile(imagePath);
    } else {
    res.status(404).json({ message: 'La imagen no existe' });
  }
};


const configureMulterStorage = () => {
  let uniqueFileName; // Variable para almacenar el nombre único

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/upload/');
    },
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      uniqueFileName = Date.now() + extname;
      cb(null, uniqueFileName); // Nombre único para el archivo
      console.log(uniqueFileName);
    },
  });

  return { storage, getUniqueFileName: () => uniqueFileName };
};

const { storage, getUniqueFileName } = configureMulterStorage();
const radiografia = multer({ storage });

const radiografiaImage = (req, res) => {
  try {
    // Accede al archivo cargado mediante req.file
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha proporcionado ningún archivo.' });
    }

    // Obtén el nombre único del archivo
    const uniqueFileName = getUniqueFileName();

    // Realiza cualquier procesamiento adicional aquí

    return res.status(200).json({ message: 'Archivo subido exitosamente.', fileName: uniqueFileName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la carga de la imagen.' });
  }
};

const deleteImage = async (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../upload', imageName);
  
  // Verificar si la imagen existe antes de intentar eliminarla
  if (fs.existsSync(imagePath)) {
    // Eliminar la imagen
    fs.unlinkSync(imagePath);
    res.status(200).json({ message: 'Imagen eliminada con éxito' });
  } else {
    res.status(404).json({ message: 'La imagen no existe' });
  }
};


module.exports = {
  getAllHistClinica,
  getHistClinicaById,
  createHistClinica,
  updateHistClinica,
  deleteHistClinica,
  getImage,
  deleteImage,
  radiografiaImage, 
  radiografia
};

