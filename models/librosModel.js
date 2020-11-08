const { Schema, model } = require('mongoose');
const LibrosSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String
    },
    edicion: {
        type: String
    },
    año: {
        type: Date
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'libross' });

LibrosSchema.method('toJSON', function() {

    const { __v, ...object } = this.toObject();

    return object;

})

module.exports = model('Libro', LibrosSchema);