const { response } = require('express');
const Prestamo = require('../models/prestamoModel');

const getPrestamos = async(req, res = response) => {
    const prestamos = await Prestamo.find().
    populate('usuario', 'nombre img').
    populate('alumno').
    populate('copia');

    res.json({
        ok: true,
        prestamos
    });
}
const crearPrestamo = async(req, res = response) => {
    const uid = req.uid;

    const prestamo = new Prestamo({
        usuario: uid,
        ...req.body
    });

    try {

        const prestamoDB = await prestamo.save();
        res.json({
            ok: true,
            prestamo: prestamoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarPrestamo = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const prestamo = await Prestamo.findById(id);
        if (!prestamo) {
            return res.status(404).json({
                ok: true,
                msg: 'Prestamo no existe'

            });
        }

        const cambiosPrestamo = {
            ...req.body,
            usuario: uid
        }

        const prestamoActualizado = await Prestamo.findByIdAndUpdate(id, cambiosPrestamo, { new: true });

        return res.json({
            ok: true,
            prestamo: prestamoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarPrestamo = async(req, res = response) => {
    const id = req.params.id;

    try {

        const prestamo = await Prestamo.findById(id);
        if (!prestamo) {
            return res.status(404).json({
                ok: true,
                msg: 'Prestamo no existe'

            });
        }

        await Prestamo.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Prestamo Eliminado'

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
    getPrestamos,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
}