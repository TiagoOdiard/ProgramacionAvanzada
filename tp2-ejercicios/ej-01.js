//1

/* 
const libro = {
  titulo: "Harry Potter",
  autor: "JK Rowling",
  anoPubli: 2000,
};
*/

//console.log(libro.titulo, libro.autor, libro.anoPubli);

//2

const estudiante = {
  nombre: "Juan",
  edad: 20,
  direccion: {
    pais: "Argentina",
    ciudad: "C del U ",
    calle: "9 de Julio",
  },
};

console.log("Pais: ", estudiante.direccion.pais);
console.log("Ciudad: ", estudiante.direccion.ciudad);
console.log("Calle: ", estudiante.direccion.calle);

//3
/*
const libro = {
  titulo: "Harry Potter",
  autor: "JK Rowling",
  anoPubli: 2000,
  descripcion: function () {
    console.log(`Titulo: ${this.titulo}`);
    console.log(`Autor: ${this.autor}`);
  },
};
*/

//libro.descripcion();

//4
const producto = {
  nombre: "Laptop",
  precio: 3000000,
  disponible: true,
};

for (const key in producto) {
  console.log(`${key}: ${producto[key]}`);
}

//5 Modificar el precio
producto.precio = 2000000;

//console.log(producto);

//6 Buscar Key
function tienePropiedad(obj, key) {
  for (const k in obj) {
    if (k === key) return true;
  }

  return false;
}

//console.log(tienePropiedad(producto, "nombre"));

//7 Eliminar un atributo

//Forma 1 Con rest operato (No modificamos el Objeto Original)
//Destructuramos y apartamos la propiedad disponible
/*
const { disponible, ...nuevoProducto } = producto;

//Original
console.log(producto);
//Copia sin disponible
console.log(nuevoProducto);
*/

//Forma 2 con delete (Modificamos el Objeto Original)
console.log(producto);
delete producto.disponible;
console.log(producto);

//8 Combinar dos objetos

const persona1 = {
  nombre: "Matias",
  apellido: "Hernandez",
  edad: 22,
};

const persona2 = {
  nombre: "Jazmin",
  apellido: "Benitez",
  edad: 24,
};

//Se sobreescriben los datos
const persona3 = Object.assign({}, persona1, persona2);

console.log(persona3);

//9 Copia con JSON.stringify y JSON.parse

const copiaEst = JSON.parse(JSON.stringify(estudiante));

copiaEst.carrera = "Licenciatura en SIS.";

//Original
console.log(estudiante);
//Copia
console.log(copiaEst);

//10 Getters y Setters
const libro = {
  titulo: "Harry Potter",
  autor: "JK Rowling",
  anoPubli: 2000,
  descripcion: function () {
    console.log(`Titulo: ${this.titulo}`);
    console.log(`Autor: ${this.autor}`);
  },
  get getAnoPubli() {
    return console.log(this.anoPubli);
  },
  set setAnoPubli(nuevoAno) {
    this.anoPubli = nuevoAno;
  },
};

libro.setAnoPubli = 2001;
libro.getAnoPubli;
