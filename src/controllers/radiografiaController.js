const path = require('path');
const fs = require('fs');


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
  getImage,
  deleteImage
};