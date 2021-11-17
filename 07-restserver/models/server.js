const express = require('express');
const cors = require('cors');

class Server {
	constructor(){
		this.app = express();
		this.port = process.env.PORT;
		this.usuariosPath = '/api/usuarios';
		
		// Middlewares
		this.middlewares();
		
		// Rutas de mi aplicacion
		this.routes();
	}

	middlewares() {
		// CORS
 		this.app.use(cors());
		
		// Directorio publico
		this.app.use(express.static('public'));
	}

	routes() {
		this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));
	}

	listen(){
		this.app.listen(this.port, () => {
			console.log('Servidor corriendo en', this.port);
		});
	}
}

module.exports = Server;
