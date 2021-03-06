const mongoose = require('mongoose');

exports.dbConexion = async( ) => {
    try {
        await mongoose.connect(process.env.DB_CNN, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('DB online')

    } catch (error) {
        console.log(error)
        throw new Error('Error al inicializar la DB')
    }
} 