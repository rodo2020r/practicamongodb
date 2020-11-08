const { response } = require('express');
const Alumno = require('../models/alumnoModel');

const getAlumnos = async(req, res = response) => {
    const alumnos = await Alumno.find().
    populate('usuario', 'nombre img');

    res.json({
        ok: true,
        alumnos
    });
}
const crearAlumno = async(req, res = response) => {
    const uid = req.uid;

    const alumno = new Alumno({
        usuario: uid,
        ...req.body
    });

    try {

        const alumnoDB = await alumno.save();
        res.json({
            ok: true,
            alumno: alumnoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarAlumno = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const alumnos = await Alumno.findById(id);
        if (!alumnos) {
            return res.status(404).json({
                ok: true,
                msg: 'Alumno no existe'

            });
        }

        const cambiosAlumno = {
            ...req.body,
            usuario: uid
        }

        const alumnosActualizado = await Alumno.findByIdAndUpdate(id, cambiosAlumno, { new: true });

        return res.json({
            ok: true,
            alumnos: alumnosActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarAlumno = async(req, res = response) => {
    const id = req.params.id;

    try {

        const alumnos = await Alumno.findById(id);
        if (!alumnos) {
            return res.status(404).json({
                ok: true,
                msg: 'Alumno no existe'

            });
        }

        await Alumno.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Alumno Eliminado'

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
    getAlumnos,
    crearAlumno,
    actualizarAlumno,
    eliminarAlumno
}