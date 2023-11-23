////////////////////////////////////eliminatr////////////////////////////////
// src/service/imageService.js
const fs = require('fs/promises');

const getImageById = async (Id) => {
  // Lógica para obtener la imagen por su ID desde la base de datos o el sistema de archivos.
  // Deberás implementar esta lógica según tus necesidades.
  //const imagePath = `D:\universidad\Semestre 8\Taller de sistemas de informacion\Proyecto\ClinicaBackend\src\upload/${Id}.png`;
  const imagePath = path.join('D:', 'universidad', 'Semestre 8', 'Taller de sistemas de informacion', 'Proyecto', 'ClinicaBackend', 'src', 'upload', `${Id}.jpg`);
  try {
    await fs.access(imagePath);
    return { path: imagePath };
  } catch (error) {
    return null;
  }
};

module.exports = {
  getImageById,
};