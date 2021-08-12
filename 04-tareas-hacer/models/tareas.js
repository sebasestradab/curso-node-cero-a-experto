const Tarea = require("./tarea");

/**
 * _listado:
 * 		{'uuid-16516516-1189189-4894984-2': {id:12, dec:asd, completadoEn:92231}},
 * 		{'uuid-75464565-0120466-5187848-5': {id:16, dec:asd, completadoEn:92231}},
 * 		{'uuid-23432423-5656647-8825445-2': {id:68, dec:asd, completadoEn:92231}},
 */

class Tareas {
	_listado = {};

	get listadoArr(){
		const listado = [];
		Object.keys(this._listado).forEach(key => {
			//console.log(key);
			listado.push(this._listado[key]);
		});


		return listado;
	}
	
	constructor(){
		this._listado = {};
	}

	borrarTarea(id = ''){
		if(this._listado[id]){
			delete this._listado[id];
		}
	}

	cargarTareasFromArray(tarea = []){
		tarea.forEach(tarea => {
			this._listado[tarea.id] = tarea;
		});
	}

	crearTarea(desc = ''){
		const tarea = new Tarea(desc);

		this._listado[tarea.id] = tarea;
	}

	listadoCompleto(){
		// 1: en verde
		// Completado: verde
		// Pendiente: Rojo
		// 1. Alma::Completada | Pendiente

		// Con objeto literal
		/*Object.keys(this._listado).forEach((id, indice) => {
			const {desc:descripcion, completadoEn} = this._listado[id];
			console.log(`${((indice+1).toString() + '.').green} ${descripcion} :: ${(completadoEn === null ? 'Pendiente'.red : 'Completada'.green)}`);

		});*/

		console.log();

		// Con Array
		this.listadoArr.forEach(({desc:descripcion, completadoEn}, index) => {
			console.log(`${((index+1).toString() + '.').green} ${descripcion} :: ${(completadoEn === null ? 'Pendiente'.red : 'Completada'.green)}`);
		});
	}

	listarPendientesCompletadas(completadas = true){
		console.log();
		if (completadas) {
			this.listadoArr.filter((tarea) => tarea.completadoEn).forEach(({desc:descripcion, completadoEn}, index) => {
				console.log(`${((index+1).toString() + '.').green} ${descripcion} :: ${completadoEn.toString().green}`);
			});
		} else {
			this.listadoArr.filter((tarea) => !tarea.completadoEn).forEach(({desc:descripcion, completadoEn}, index) => {
				console.log(`${((index+1).toString() + '.').green} ${descripcion} :: ${'Pendiente'.red}`);
			});
		}
	}

	toggleCompletadas(ids = []){
		ids.forEach(id => {
			const tarea = this._listado[id];
			if (!tarea.completadoEn) {
				tarea.completadoEn = new Date().toISOString()
			}
		});

		this.listadoArr.forEach(tarea => {
			if(!ids.includes(tarea.id)){
				this._listado[tarea.id].completadoEn = null;
			}
		});
	}
}

module.exports = Tareas;