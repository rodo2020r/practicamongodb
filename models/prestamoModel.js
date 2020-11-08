const { Schema, model } = require('mongoose');

const PrestamoSchema = Schema({
    fecha_pres: {
        type: String,
        required: true
    },
    fecha_entrega: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    copia: {
        type: Schema.Types.ObjectId,
        ref: 'Copia',
        required: true
    },
    alumno: {
        type: Schema.Types.ObjectId,
        ref: 'Alumno',
        required: true
    }

}, { collection: 'prestamos' });


PrestamoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;

})

module.exports = model('Prestamo', PrestamoSchema);