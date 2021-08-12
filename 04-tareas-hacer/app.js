require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

//const { mostrarMenu, pausa } = require('./helpers/mensajes');

const main = async () => {
	let opt = '';
	const tareas = new Tareas();

	const tareasDB = leerDB();

	if (tareasDB) {
		// Establecer tareas
		tareas.cargarTareasFromArray(tareasDB);
		console.log(tareas.listadoArr);
	}
	
	do {
		// Imprimir el menu
		opt = await inquirerMenu();
		//console.log({opt});

		switch (opt) {
			case '1': // Crear opcion
				const desc = await leerInput('Descripcion:');
				tareas.crearTarea(desc);
				console.log(desc);
				break;
		
			case '2': // Listar
				tareas.listadoCompleto()
				//console.log(tareas.listadoArr);
				break;

			case '3': // Listar Completdas
				tareas.listarPendientesCompletadas(true);
				break;

			case '4': // Listar Pendientes
				tareas.listarPendientesCompletadas(false);
				break;

			case '5': // completado | pendiente
				const ids = await mostrarListadoChecklist(tareas.listadoArr);
				tareas.toggleCompletadas(ids);
				break;

			case '6': // Borrar
				const id = await listadoTareasBorrar(tareas.listadoArr);
				if (id !== '0') {
					const ok = await confirmar('¿Esta seguro?')
					if(ok) {
						tareas.borrarTarea(id);
						console.log('Tarea borrada');
					}
				}

				break;
		}
		
		// const tareas = new Tareas();
		// const tarea = new Tarea('Comprar comida');
		// tareas._listado[tarea.id] = tarea;
		// console.log(tareas);

		guardarDB(tareas.listadoArr);

		await pausa();
		
	} while (opt !== '0');
	
}

main();