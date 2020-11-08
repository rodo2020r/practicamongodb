const { response } = require('express');
const Libro = require('../models/librosModel');

const getLibros = async(req, res = response) => {

    const libros = await Libro.find().populate('usuario', 'nombre img');
    res.json({
        ok: true,
        libros
    });
}
const crearLibro = async(req, res = response) => {
    const uid = req.uid;

    const libro = new Libro({
        usuario: uid,
        ...req.body
    });

    try {

        const libroDB = await libro.save();
        res.json({
            ok: true,
            libro: libroDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarLibro = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const libro = await Libro.findById(id);
        if (!libro) {
            return res.status(404).json({
                ok: true,
                msg: 'libro no existe'

            });
        }

        const cambioslibro = {
            ...req.body,
            usuario: uid
        }

        const libroActualizado = await Libro.findByIdAndUpdate(id, cambioslibro, { new: true });

        return res.json({
            ok: true,
            libro: libroActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarLibro = async(req, res = response) => {
    const id = req.params.id;

    try {

        const libro = await Libro.findById(id);
        if (!libro) {
            return res.status(404).json({
                ok: true,
                msg: 'libro no existe'

            });
        }

        await Libro.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'libro Eliminado'

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
    getLibros,
    crearLibro,
    actualizarLibro,
    eliminarLibro
}