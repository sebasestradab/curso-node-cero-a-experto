const axios = require('axios');

class Busquedas {
	historial = ['Tegucigalpa', 'Madrid', 'San Jose']

	constructor(){
		// TODO: leer DB si existe

	}

	get paramMapbox(){
		return {
			'access_token':process.env.MAPBOX_KEY,
			limit:5,
			language:'es'
		}
	}

	async ciudad(lugar = ''){
		try{
			// Peticion http
			const instance = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
				params: this.paramMapbox
			});

			const resp = await instance.get();

			return resp.data.features.map(lugar => ({
				id: lugar.id,
				nombre: lugar.place_name,
				lng: lugar.center[0],
				lat: lugar.center[1],
			})); // retornar los lugares
		}catch(error){
			return []; 
		}

	}

}

module.exports = Busquedas;