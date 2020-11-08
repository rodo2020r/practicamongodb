const { Schema, model } = require('mongoose');

const CopiaSchema = Schema({
    estado: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: true
    }

}, { collection: 'Copias' });


CopiaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;

})

module.exports = model('Copia', CopiaSchema);