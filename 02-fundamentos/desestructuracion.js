const deadpool = {
	nombre: "Wade",
	apellido : "Winston",
	poder: "Regeneracion",
	edad: 50,
	getNombre() {
		return `${this.nombre} ${this.apellido} ${this.poder}`;
	}
}

// console.log(deadpool.getNombre());

const {nombre:a, apellido, poder, edad = 0} = deadpool;
console.log("Superrr", a, apellido, poder, edad);	

function imprimeHeroe({nombre, apellido, poder, edad = 0}) {
	// const {nombre, apellido, poder, edad = 0} = heroe;
	nombre = "Sebas";
	console.log(nombre, apellido, poder, edad);	
}

// imprimeHeroe(deadpool)

const heroes = ["Deadpool", "Superman", "Batman"];
// const h1 = heroes[0];

const [, , h3] = heroes;

console.log( h3);
