const fs = require('fs');
const path = require('path');
const radiografiaService = require('../service/radiografiaService');


// const guardarRadiografia = async(req,res) => {
//   try{
//     const radiografiaData = req.body;
//     const radiografiaImage = req.files.imagen;
//     const nombreImagen = generarNombreUnico(imagen.name);

//      // Guardar la imagen en la carpeta 'upload'
//      const uploadPath = path.join(__dirname, '../upload', nombreImagen);
//      await imagen.mv(uploadPath);
//   }catch(error){

//   }
// }

async function guardarRadiografia(req, res) {
  try {
    const  { paciente } = req.body;
    const imagen = req.files.imagen;

    //console.log(paciente)
    //console.log(req.files)
    // Generar un nombre único para la imagen
    const nombreImagen = generarNombreUnico(imagen.name);
  //  console.log(nombreImagen)
    // Guardar la imagen en la carpeta 'upload'
    const uploadPath = path.join(__dirname, '../upload', nombreImagen);
    await imagen.mv(uploadPath);

    // Guardar la información en la base de datos
    await radiografiaService.guardarRadiografia(paciente, nombreImagen);

    res.status(200).json({ message: 'Radiografía guardada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la radiografía' });
  }
}

async function buscarRadiografiaPorNombre(req, res) {
  try {
    const { nombreImagen } = req.params;

    // Consultar la base de datos para obtener datos relacionados al nombre de la imagen
    const datosRadiografia = await radiografiaService.obtenerDatosPorNombreImagen(nombreImagen);

    // Ruta completa de la imagen
    const imagePath = path.join(__dirname, '../upload', nombreImagen);

    // Verificar si la imagen existe
    if (fs.existsSync(imagePath)) {
      // Devolver los datos y la imagen como respuesta
      res.json({ datos: datosRadiografia, imagen: imagePath });
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
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = path.extname(originalName);
  return `${timestamp}${extension}`;
}

module.exports = { 
  guardarRadiografia,
  buscarRadiografiaPorNombre
 };
