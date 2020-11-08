const { response } = require('express');
const Copia = require('../models/copiasModel');

const getCopias = async(req, res = response) => {
    const copias = await Copia.find().
    populate('usuario', 'nombre img').
    populate('libro', 'titulo');

    res.json({
        ok: true,
        copias
    });
}
const crearCopia = async(req, res = response) => {
    const uid = req.uid;

    const copia = new Copia({
        usuario: uid,
        ...req.body
    });

    try {

        const copiaDB = await copia.save();
        res.json({
            ok: true,
            copia: copiaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarCopia = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const copia = await Copia.findById(id);
        if (!copia) {
            return res.status(404).json({
                ok: true,
                msg: 'Copia no existe'

            });
        }

        const cambiosCopia = {
            ...req.body,
            usuario: uid
        }

        const copiaActualizado = await Copia.findByIdAndUpdate(id, cambiosCopia, { new: true });

        return res.json({
            ok: true,
            copia: copiaActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarCopia = async(req, res = response) => {
    const id = req.params.id;

    try {

        const copia = await Copia.findById(id);
        if (!copia) {
            return res.status(404).json({
                ok: true,
                msg: 'Copia no existe'

            });
        }

        await Copia.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Copia Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}


module.exports = {
    getCopias,
    crearCopia,
    actualizarCopia,
    eliminarCopia
}