

// setTimeout(() => {
// 	console.log("Hola mundo");
// }, 1000);

const getUsuarioById = (id, callback) => {
	const usuario = {
		id,
		nombre: "Sebas"
	}

	setTimeout(() => {
		// console.log(usuario);
		callback(usuario);
	}, 1500);
}

getUsuarioById(10, (usuario) => {
	console.log(usuario.id);
	console.log(usuario.nombre.toUpperCase());
	
});