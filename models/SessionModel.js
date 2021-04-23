const {Schema,model} = require('mongoose');

const SessionSchema = Schema({

    state:{
        type: Boolean,
        required: true,
        default: true
    },
    id2:{
        type: String,
        required: true,
        default: '1233543521'
    },
})

module.exports = model('Session',SessionSchema);