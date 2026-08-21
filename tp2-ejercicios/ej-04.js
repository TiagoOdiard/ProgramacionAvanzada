// 1. Pop() y push()
//const frutas = ["manzana", "banana", "pera"];

// 1. Agregar una fruta con push
//frutas.push("naranja");
//console.log(frutas); // ["manzana", "banana", "pera", "naranja"]

//Eliminar la última fruta con pop
//const frutaEliminada = frutas.pop();
//console.log(frutas); // ["manzana", "banana", "pera"]
//console.log(`Fruta eliminada: ${frutaEliminada}`); // "naranja"

//2. Matriz, acceder al objeto 5

// Array bidimensional (matriz de 3x3)
const matriz = [
  [1, 2, 3], // Fila 0
  [4, 5, 6], // Fila 1
  [7, 8, 9], // Fila 2
];

// Acceso al número 5 (Fila 1, Columna 1)
const elemento = matriz[1][1];

//console.log(elemento);

//3. Iterar sobre un Array

const frutas = ["manzana", "banana", "pera"];

for (let i = 0; i < frutas.length; i++) {
  //console.log(frutas[i]);
}

//4. Uso del Map()

function elevarAlCuadrado(numeros) {
  return numeros.map((num) => num ** 2);
}

// Ejemplo:
// elevarAlCuadrado([2, 3, 4]); // Devuelve [4, 9, 16]

//5. Uso de Filter()
function filtrarMayoresDe(numeros, referencia) {
  return numeros.filter((num) => num > referencia);
}

// Ejemplo:
// filtrarMayoresDe([5, 12, 8, 130, 44], 10); // Devuelve [12, 130, 44]

//6. Uso de Reduce

function sumarElementos(numeros) {
  return numeros.reduce((acumulador, actual) => acumulador + actual, 0);
}

// Ejemplo:
// sumarElementos([1, 2, 3, 4]); // Devuelve 10

//7. Uso del Some
const numeros = [3, 7, 5, 12, 2];

const mayorDiez = numeros.some((num) => num > 10);
//console.log(mayorDiez); // true

//8. Uso del Every
const todosPositivos = numeros.every((num) => num > 0);
console.log(todosPositivos); // true

//9. Uso del find()
const personas = [
  { nombre: "Lucas", edad: 25 },
  { nombre: "María", edad: 34 },
  { nombre: "Carlos", edad: 41 },
];

const personaMayorDe30 = personas.find((persona) => persona.edad > 30);
console.log(personaMayorDe30); // { nombre: "María", edad: 34 }

//10. Uso del Sort()
const palabras = ["perro", "auto", "gato", "casa"];

// localeCompare maneja adecuadamente acentos y caracteres especiales
palabras.sort((a, b) => a.localeCompare(b));

console.log(palabras); // ["auto", "casa", "gato", "perro"]
