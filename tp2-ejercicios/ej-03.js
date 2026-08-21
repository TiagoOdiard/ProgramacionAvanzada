//1. Consumo de API con Fetch

function obtenerUsuario() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then((users) => {
      //Mostramos los usuarios
      return users;
    })
    .catch((err) => {
      console.error("Error en la peticion ", err);
    });
}

/*
//Muestra los Usuarios
obtenerUsuario().then((users) => {
  if (users) {
    console.log(users);
  }
});
*/

//2. Imprimir Nombre de Usuarios

async function imprimirNombreUsuarios() {
  const result = await obtenerUsuario();

  if (result) {
    for (const user of result) {
      console.log(user.name);
    }
  }
}

imprimirNombreUsuarios();
