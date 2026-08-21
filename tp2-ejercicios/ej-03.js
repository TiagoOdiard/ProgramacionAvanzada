// 1. Consumo de Datos
async function obtenerUsuarios() {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!respuesta.ok) throw new Error("Error al obtener los datos");

    const usuarios = await respuesta.json();
    console.log("Lista completa de usuarios:", usuarios);
    return usuarios;
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}

//Prueba Lista de Usuarios
//obtenerUsuarios();

// 2. Procesamiento de Datos (mostrar solo nombres)
async function imprimirNombresDeUsuarios() {
  const usuarios = await obtenerUsuarios();
  if (usuarios) {
    const nombres = usuarios.map((usuario) => usuario.name);
    console.log("Nombres de usuarios:", nombres);
  }
}

//imprimirNombresDeUsuarios();

//3. Verificacion de Usuario

function autenticarUsuario(credenciales) {
  const usuarioValido = {
    usuario: "admin",
    password: "secretPassword123",
  };

  return (
    credenciales.usuario === usuarioValido.usuario &&
    credenciales.password === usuarioValido.password
  );
}

// Ejemplo de uso:
//console.log(autenticarUsuario({ usuario: "Tiago", password: "secretPassword123" })); // returns False

//4. Transformacion de Datos

function mapearUsuarios(usuarios) {
  return usuarios.map((usuario) => ({
    nombre: usuario.name,
    email: usuario.email,
  }));
}

// Ejemplo de uso combinándolo con la función obtenerUsuarios():
//obtenerUsuarios().then((usuarios) => console.log(mapearUsuarios(usuarios)));

//5. Validacion de Usuarios

function validarFormulario({ nombre, email, password }) {
  // Verifica que existan las propiedades y que no sean strings vacíos ni contengan solo espacios
  if (!nombre || !email || !password) return false;

  return (
    nombre.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length > 0
  );
}

//console.log(validarFormulario({nombre: "Tiago",email: "Tiago@gmail.com",password: "123",}),);

//6.Paginacion de Datos

function obtenerPagina(datos, numeroPagina, tamanoPagina = 5) {
  // Calculamos los índices de inicio y fin para slice()
  const inicio = (numeroPagina - 1) * tamanoPagina;
  const fin = inicio + tamanoPagina;

  return datos.slice(inicio, fin);
}

// Uso:
//const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// obtenerPagina(items, 1); // Devuelve [1, 2, 3, 4, 5]
// obtenerPagina(items, 2); // Devuelve [6, 7, 8, 9, 10]
//console.logobtenerPagina(items, 3); //Devuelve [11,12]

//7. Envio de Datos a una API(post)

async function enviarDatos(data) {
  try {
    const respuesta = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!respuesta.ok) throw new Error("Error al enviar los datos");

    const resultado = await respuesta.json();
    console.log("Respuesta de la API:", resultado);
    return resultado;
  } catch (error) {
    console.error("Error en la petición POST:", error);
  }
}

//enviarDatos({ usuario: "Tiago", password: "123" });

//8. Busquedas de usuarios por Email
function buscarUsuarioPorEmail(usuarios, email) {
  // find() devuelve el primer objeto que coincida o undefined si no lo encuentra
  return (
    usuarios.find(
      (usuario) => usuario.email.toLowerCase() === email.toLowerCase(),
    ) || null
  );
}

//console.log(buscarUsuarioPorEmail([{ email: "toto@gmail.com", email: "tito67@gmail.com" }],"tito67@gmail.com",),);

//9. Generacion de Token de autenticacion Simulada

function generarToken(usuario) {
  // Estructura básica de JWT: header.payload.signature
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      ...usuario,
      iat: Math.floor(Date.now() / 1000), // Timestamp actual
    }),
  );
  const signature = btoa("firma_simulada_secret_key");

  return `${header}.${payload}.${signature}`;
}

// Ejemplo de uso:
//const token = generarToken({ id: 1, email: "user@example.com" });
//console.log(token);

//10. Actualizacion de informacion del usuario

function actualizarUsuario(usuario, cambios) {
  // Retorna un nuevo objeto inmutable combinando el usuario original con los cambios
  return {
    ...usuario,
    ...cambios,
  };
}

//Ejemplo de uso:
const usuario = { id: 1, nombre: "Ana", email: "ana@mail.com" };
const actualizado = actualizarUsuario(usuario, {
  email: "nuevo_email@mail.com",
});

//console.log(actualizado);
