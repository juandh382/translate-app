const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            files: '/files'
        };
    }

    middlewares() {

        // Lectura y parseo del body
        this.app.use(express.json());

        this.app.use(express.static('public'));

        // CORS
        this.app.use(cors());
    }

    routes() {
        this.app.use(this.paths.files, require('../routes/files'));
    }

    execute() {
        this.middlewares();
        this.routes();
        this.app.listen(this.port, () => {
            console.clear();
            console.log('Server running on port', this.port);
        });
    }

}

module.exports = Server;