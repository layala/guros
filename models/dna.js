const { Schema, model } = require('mongoose');

const DnaSchema = Schema({
    dna : {
        type: Array,
        required: [true, 'Dato Obligatorio']
    },
    mutation:{
        type: Boolean,
        required: [true, 'Es obligatorio']
    }
})


module.exports = model( 'Dna', DnaSchema );