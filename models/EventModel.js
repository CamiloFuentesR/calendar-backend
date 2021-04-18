const {Schema,model} = require('mongoose');

const EventSchema = Schema({
   
    start: {
        type: Date,
        trim: true,
        required:true
    },
    end: {
        type: Date,
        trim: true,
        required:true
    },
    title: {
        type: String,
        trim: true,
        required:true
    },
    notes: {
        type: String,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
  
});


//Editar la forma en que se ve, pero se sigue guardando de la misma manera en la BDD
EventSchema.method('toJSON',function(){
    const{__v,_id,...object} =this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Event', EventSchema)