const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.guros = '/api/guros';
        this.conectarDB();
        this.middlewares()
        this.routes();
    }
    
    //database
    async conectarDB(){
        await dbConnection();
    }


    middlewares() {
        //cors
        this.app.use(cors());
        // parser
        this.app.use(express.json());
    }

    routes() {
      this.app.use(this.guros, require('../routes/guros'))
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corrriendo puerto ', this.port);
        });
    }
}


module.exports = Server;