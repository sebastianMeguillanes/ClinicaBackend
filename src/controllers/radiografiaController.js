const multer = require('multer');
const path = require('path');

// Configuración de multer para el almacenamiento de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/upload/');
    },
    filename: (req, file, cb) => {
      const extname = path.extname(file.originalname);
      const uniqueFileName = Date.now() + extname;
      cb(null,uniqueFileName); // Nombre único para el archivo
     console.log(uniqueFileName)
    },
  });
  
const radiografia = multer({ storage });

  const radiografiaImage = (req, res) => {
    try {
      // Accede al archivo cargado mediante req.file
      if (!req.file) {
        const uniqueFileName = Date.now() + path.extname(req.file.originalname);
        return res.status(400).json({ error: 'No se ha proporcionado ningún archivo.' });
      }
  
      // Realiza cualquier procesamiento adicional aquí
  
      return res.status(200).json({ message: 'Archivo subido exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al procesar la carga de la imagen.' });
    }
  };

module.exports = { radiografiaImage, radiografia };
