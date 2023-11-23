const histClinicaService = require("../service/histClinicaService");
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
  const pacienteId = req.params.id;
  try {
    const histClinica = await histClinicaService.getOne(pacienteId);
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

// Obtener un historial Clinica por su ID
const getHistClinicaById2 = async (req, res) => {
  const pacienteId = req.params.id;
  try {
    const histClinica = await histClinicaService.getOne2(pacienteId);
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

// Crea historial clinica con nombre de imagen
async function createHistClinica(req, res) {
  try {
    if (req.files == null) {
      const histClinicaData = req.body;
      const imageName = "0";
      await histClinicaService.createNew(histClinicaData, imageName);
    } else {
      
      const histClinicaData = req.body;
      console.log(req.files)
      const imagen = req.files.imagen;

      const imageName = generarNombreUnico(imagen.name);
      const uploadPath = path.join(__dirname, '../upload', imageName);
      await imagen.mv(uploadPath);
      await histClinicaService.createNew(histClinicaData, imageName);
     
    }

    res.status(200).json({ message: 'Historial Clinica guardada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la Historial Clinica' });
  }
}

/////////////////////////////////////////ver de eliminar el otro update///////////////////////////////////////////
// Actualizar Historial Clinica por su ID
const updateHistClinica = async (req, res) => {
  const histClinicaId = req.params.id;
  const histClinicaData = req.body;
  console.log(histClinicaId)
  try {
    const resultado = await histClinicaService.updateOne(histClinicaId, histClinicaData);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar Historial Clinica' });
  }
};

////////////////////////////////////////////////////////////////////////////////////

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


//////////////////////////////////////////////////FUNCIONES IMAGENES//////////////////////////////////////////

//Obtiene imagen mediate el nombre
// async function getImage(req, res) {
//   try {
    
//     const histClinicaId = req.params.id;
//     const imageName = await histClinicaService.getImage(histClinicaId)
//     const datosRadiografia = await histClinicaService.getdate(histClinicaId);
//     const imagePath = path.join(__dirname, '../upload', imageName);

//     // Verificar si la imagen existe
//     if (fs.existsSync(imagePath)) {
      
//       // Devolver los datos y la imagen como respuesta
//       res.json({ datos: datosRadiografia, imagen: imagePath });
//     } else {
//       res.status(404).json({ datos: datosRadiografia, error: 'No tiene imagen' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al buscar la imagen' });
//   }
// }

async function getImage(req, res) {
  try {
    const histClinicaId = req.params.id;
    const imageName = await histClinicaService.getImage(histClinicaId);
    const datosRadiografia = await histClinicaService.getdate(histClinicaId);
    const imagePath = path.join(__dirname, '../upload', imageName);

    // Verificar si la imagen existe
    if (fs.existsSync(imagePath)) {
      // Enviar la imagen como respuesta
      res.sendFile(imagePath);
    } else {
      res.status(404).json({ datos: datosRadiografia, error: 'No tiene imagen' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar la imagen' });
  }
}

// Edita historial clinica con nombre de imagen
async function updateImage(req, res) {
  try {

    if(req.files == null) {

      const histClinicaId = req.params.id;
      const  histClinicaData = req.body;
      const imageName = "0";
      await histClinicaService.updateimagedate(histClinicaId,histClinicaData, imageName);
    }else{

      const histClinicaId = req.params.id;
      const  histClinicaData = req.body;
      const imagen = req.files.imagen;

      const imageName = generarNombreUnico(imagen.name);
      
      const uploadPath = path.join(__dirname, '../upload', imageName);
      await imagen.mv(uploadPath);
      // console.log(histClinicaData)
      // console.log(imageName)
      await histClinicaService.updateimagedate(histClinicaId,histClinicaData, imageName);
    
    }

    res.status(200).json({ message: 'Radiografía guardada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la radiografía' });
  }
}

//elimina imagen en el archivo y donde se encontraba en la base de datos se cambia a 0
async function deleteImage(req, res) {
  try {
    const { imageName } = req.params;
    const datosRadiografia = await histClinicaService.deleteimagedate(imageName);

    // Ruta completa de la imagen
    const imagePath = path.join(__dirname, '../upload', imageName);

    // Verificar si la imagen existe
    if (fs.existsSync(imagePath)) {
      // Eliminar la imagen
    fs.unlinkSync(imagePath);
    res.status(200).json({ message: 'Radiografía eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'Imagen no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar la imagen' });
  }
}

// Función para generar un nombre único para la imagen
function generarNombreUnico(originalName) {
  const timestamp = Date.now();
  const extension = path.extname(originalName);
  return `${timestamp}${extension}`;
}

module.exports = {
  getAllHistClinica,
  getHistClinicaById,
  getHistClinicaById2,
  createHistClinica,
  updateHistClinica,
  deleteHistClinica,
  getImage,
  updateImage,
  deleteImage
};