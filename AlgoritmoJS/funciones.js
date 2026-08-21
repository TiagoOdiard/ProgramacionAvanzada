//Funcion nativa

function saludar1(nombre) {
  console.log(`Hola ${nombre}`);
}

//Funcion Expresada
const saludar2 = function (nombre) {
  //Saludo
  console.log(`Hola ${nombre}`);
};

//Arrow Function
const saludar3 = (nombre) => {
  //Saludo
  console.log(`Hola ${nombre}`);
};

const actividad = (nombre, rol = "Desconocido") => {
  console.log(`${nombre} es ${rol}`);
};

actividad("Juan");

//saludar1("Tiago!")
//saludar2("Nico!");
//saludar3("Lucho!");
