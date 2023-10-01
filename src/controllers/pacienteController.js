const urlService = require("../model/pacienteModel");
const moment =  require("moment");

const getAllPacientes = (req, res) => {
    urlModel.getAll((error, allUrls) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener las URLs' });
        } else {
            res.json(allUrls);
        }
    });
};

const getOnePaciente = (req, res) => {
    const urlId = req.params.Id;
    urlService.getOne(urlId, (error, oneUrl) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener la URL' });
        } else {
            res.json(oneUrl);
        }
    });
};

const createNewUrl = (req, res) => {
    
    const nombre = req.body.nombre;
    const url = req.body.url;
    const urlEncriptada = encriptarURL(url);
    const fechaActual = moment().format('DD/MM/YYYY');

    const nuevoDato = {
        nombre: nombre,
        url: url,
        url_encriptada: urlEncriptada,
        fecha: fechaActual
    };
    urlService.createNew(nuevoDato, (error, newUrl) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear la URL' });
        } else {
            res.json(newUrl);
        }
    });
};

const updateOneUrl = (req, res) => {
    const urlId = req.params.Id;
    const urlData = {
        nombre: req.body.nombre,
        url: req.body.url,
        url_encriptada: encriptarURL(req.body.url),
        fecha: moment().format('DD/MM/YYYY')
    };
    urlService.updateOne(urlId, urlData, (error, numReplaced) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar la URL' });
        } else {
            res.json({ message: `Se actualizaron ${numReplaced} registros` });
        }
    });
};

const deleteOneUrl = (req, res) => {
    const urlId = req.params.Id;
    urlService.deleteOne(urlId, (error, numRemoved) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar la URL' });
        } else {
            res.json({ message: `Se eliminaron ${numRemoved} registros` });
        }
    });
};

module.exports = {
    getAllUrls,
    getOneUrl,
    createNewUrl,
    updateOneUrl,
    deleteOneUrl,
};