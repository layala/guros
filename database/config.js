const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('BD OK');
    } catch (error) {
        console.log(error)
        throw new Error('Conection error');
    }
}

module.exports = {
    dbConnection
}