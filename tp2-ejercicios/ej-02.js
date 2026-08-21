//1. Funct Suma
function suma(a, b) {
  return a + b;
}

//console.log(suma(2, 2));
//console.log(suma(5, 3));
console.log(suma(6, 7));

//2. Funcion Multiplicar
function multiplicar(a, b) {
  return a * b;
}

//console.log(multiplicar(2, 2));
//console.log(multiplicar(5, 3));
console.log(multiplicar(6, 7));

//3. Fucion por defecto 'Invitado'
function saludar(nombre = "invitado") {
  return `Hola ${nombre}!`;
}

console.log(saludar());
console.log(saludar("Tito"));

//4. CrearPersona --> Devuelve un Objeto
function crearPersona(nombre, edad) {
  const persona = {
    nombre,
    edad,
  };

  return persona;
}

//console.log(crearPersona("Luis", 20));
console.log(crearPersona("Gerardo", 67));

//5. reemplazo funcion nuevaEdad.

const actualizarEdad = (obj, edad) => {
  obj.edad = edad;
};

const persona = crearPersona("Claudio", 67);

//console.log(persona);
actualizarEdad(persona, 76);
//console.log(persona);

//6. factorial

function factorial(num) {
  if (num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

console.log(factorial(5));

//7 Funcion Dentro de Otra

function despedir() {
  function adios() {
    return "Chau!";
  }

  return adios();
}

console.log(despedir());

//8 arr y funcion como parametros.

function procesarArray(arr, fun) {
  const nuevoArr = [];

  for (let i = 0; i < arr.length; i++) {
    nuevoArr.push(fun(arr[i]));
  }

  return nuevoArr;
}

function multiplicarPorDos(num) {
  return num * 2;
}

//Array Normal
arr = [1, 2, 3, 4, 5];

//Array Duplicado
console.log(procesarArray(arr, multiplicarPorDos));

//9 crearMultiplicador.

function crearMultiplicador(x) {
  //Retorna una funcion anonima
  return function (num) {
    return num * x;
  };
}

//Ahora duplicar es la funcion Anonima
const duplicar = crearMultiplicador(2);
console.log(duplicar(3)); //6

//10 funcion sumar Anonima.

//Forma 1 (Funcion)

const sumarAnonima = function (a, b) {
  return a + b;
};

const resultado = sumarAnonima(2, 2);
console.log(resultado);

//Forma 2 Arrow Functions

const sumarAnonima2 = (a, b) => {
  return a + b;
};

const resultado2 = sumarAnonima2(6, 7);
console.log(resultado2);
