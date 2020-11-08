const { Schema, model } = require('mongoose');
const AlumnoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido_mat: {
        type: String
    },
    apellido_pat: {
        type: String
    },
    email: {
        type: String
    },
    telefono: {
        type: Number
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'alumnos' });

AlumnoSchema.method('toJSON', function() {

    const { __v, ...object } = this.toObject();

    return object;

})

module.exports = model('Alumno', AlumnoSchema);