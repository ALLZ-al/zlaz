let carrito = [];

function cargarProductosDesdeLocalStorage() {
  try {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    carrito = carritoStorage || [];

    // Verificar si estamos en la página donde se debe mostrar el offcanvas
    const mostrarOffcanvas = document.getElementById('listaCarrito') !== null;

    if (mostrarOffcanvas) {
      actualizarListaCarrito();
      actualizarContadorCarrito();
      mostrarTotalCarrito();
    } else {
      actualizarContadorCarrito();
    }
  } catch (error) {
    console.error('Error al cargar datos desde localStorage:', error);
  }
}

  // Función para obtener la información de artistas y obras
async function obtenerDatos() {
  try {
    const response = await fetch('../json/datos.json');
    if (!response) {
      throw new Error('Error al cargar el archivo JSON');
    }

    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error('Error en la app', error);
  }
}

// Función para mostrar las imágenes en la galería del inicio
async function mostrarImagenes() {
  try {
    const resultado = await obtenerDatos();
    const obras = resultado.obras;

    const galeriaDivs = document.querySelectorAll('.galeriaAbajo > div');

    for (const div of galeriaDivs) {
      const indiceAleatorio = Math.floor(Math.random() * obras.length);
      const { img, enlace } = obras[indiceAleatorio];

      const imgRandom = document.createElement('img');
      imgRandom.src = img;

      const enlaceImagenRan = document.createElement('a');
      enlaceImagenRan.href = enlace;
      enlaceImagenRan.appendChild(imgRandom);

      div.appendChild(enlaceImagenRan);

      obras.splice(indiceAleatorio, 1);
    }
  } catch (error) {
    console.error('Error en la app', error);
  }
}

// Función para mostrar las obras y artistas
async function mostrarObrasYArtistas() {
  try {
    const { artistas, obras } = await obtenerDatos();

    function quitarTildesYEspacios(cadena) {
      return cadena.normalize('NFD').replace(/[\u0300-\u036f\s]/g, "");
    }

    // Lógica para mostrar las obras 
    const contenedorObras = document.getElementById('contenedorObras');
    const buscadorObras = document.getElementById('buscadorObras');
    
    if (contenedorObras && buscadorObras) {
      function mostrarObras(obrasFiltradas) {
        contenedorObras.innerHTML = "";

        obrasFiltradas.map((obra) => {
          const divObra = document.createElement("div");
          divObra.classList.add("card", "m-2", "sinBorde");
          divObra.style.width = "18rem";
          divObra.style.height = "25rem";
          divObra.innerHTML = `
              <div class="card-body">
              <a href="${obra.enlace}"><img src="${obra.img}" class="card-img-top imagenProducto" alt="Imagen de ${obra.artista}"></a>
                  <div>
                    <h5 class="card-title">${obra.nombre}</h5>
                    <p class="card-text">$ ${obra.valor} ARS</p>
                    <button class="btn btnAgregarCarrito" onclick="agregarAlCarrito('${obra.nombre}', ${obra.valor})">Agregar al Carrito</button>
                  </div>
              </div>
          `;
          contenedorObras.appendChild(divObra);
        });
      }

    function filtrarObras() {
      const textoBusqueda = quitarTildesYEspacios(buscadorObras.value.toLowerCase());
      const obrasFiltradas = obras.filter((obra) =>
      (obra.nombre.toLowerCase()).includes(textoBusqueda) ||
      (obra.tipo.toLowerCase()).includes(textoBusqueda) ||
      (obra.artista.toLowerCase()).includes(textoBusqueda)
   );

  mostrarObras(obrasFiltradas);
}

      buscadorObras.addEventListener("input", filtrarObras);
      mostrarObras(obras);
    }

    // Lógica para mostrar los artistas 
    const contenedorArtistas = document.getElementById("contenedorArtistas");
    const buscadorArtista = document.getElementById("buscadorArtista");

    if (contenedorArtistas && buscadorArtista) {
      function mostrarArtistas(artistasFiltrados) {
        contenedorArtistas.innerHTML = "";

        artistasFiltrados.forEach((artista) => {
          const divArt = document.createElement("div");
          divArt.innerHTML = `
              <div class="cardio mb-3">
              <div class="cardSobre">
                  <h5 class="card-title">${artista.nombre}</h5>
                  <p class="card-text">${artista.tipo}</p>
              <a href="${artista.enlace}" class="botonArtistas">Perfil</a>   
              </div>
              <img src="${artista.img}" class="img-fluid" alt="artista ${artista.nombre}">
              </div>
          `;
          contenedorArtistas.appendChild(divArt);
        });
      }

      function filtrarArtistas() {
        const textoBusqueda = quitarTildesYEspacios(buscadorArtista.value.toLowerCase());
        const artistasFiltrados = artistas.filter((artista) =>
          artista.nombre.toLowerCase().includes(textoBusqueda) ||
          artista.tipo.some((tipo) => tipo.toLowerCase().includes(textoBusqueda))
        );

        mostrarArtistas(artistasFiltrados);
      }

      buscadorArtista.addEventListener("input", filtrarArtistas);
      mostrarArtistas(artistas);
    }
  } catch (error) {
    console.error("Error en la app", error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  await mostrarImagenes();
  await mostrarObrasYArtistas();
  cargarProductosDesdeLocalStorage();
});

//simulación formularios de registro

function registroUsuario() {
  const email = document.getElementById('exampleInputEmail1').value;
  const contra = document.getElementById('exampleInputPassword1').value;
  const nombreUsuario = document.getElementById('exampleInputName').value;

  const errorEmail = document.getElementById('errorEmail');
  const errorContra = document.getElementById('errorContra');
  const errorNombre = document.getElementById('errorNombre');

  errorEmail.innerHTML = '';
  errorContra.innerHTML = '';
  errorNombre.innerHTML = '';

  let datosValidos = true;

  if (!email) {
    errorEmail.innerHTML = 'Por favor, ingresa tu email';
    datosValidos = false;
  } else if (!emailValido(email)) {
    errorEmail.innerHTML = 'Por favor, ingresa un email válido';
    datosValidos = false;
  }

  if (!contra) {
    errorContra.innerHTML = 'Por favor, ingresa tu contraseña';
    datosValidos = false;
  } else if (contra.length < 8 || !caracteresEspeciales(contra)) {
    errorContra.innerHTML = 'La contraseña debe tener al menos 8 caracteres y contener caracteres especiales';
    datosValidos = false;
  }

  if (!nombreUsuario) {
    errorNombre.innerHTML = 'Por favor, ingresa tu nombre artístico';
     datosValidos = false;
  }

  if (datosValidos) {
    
    const datosUsuario = document.getElementById('registroUsuario');
    const nuevoDiv = document.createElement('div');
    
    const visibilidadModal = document.querySelector('.miModal')
    visibilidadModal.classList.add ('visibilidadModal')

    nuevoDiv.className = 'usuario'
    nuevoDiv.innerHTML = `
      <div class="imagenUsuarioRegistrado">
        <img src="../assets/img/perfil.png" alt="perfil">
      </div>
      <div>
        <h2>${nombreUsuario}</h2>
        <p>Simulación de perfil</p>
      </div>
      <div class="seccionRegistroDatos">
      <i class='bx bx-bookmark-heart'></i>
      <i class='bx bx-pencil'></i>
      <i class='bx bx-star'></i>
      </div>
    `;
    datosUsuario.appendChild(nuevoDiv);
  }
}

function emailValido(email) {
  const datosEmailValidar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return datosEmailValidar.test(email);
}

function caracteresEspeciales(contra) {

  const validarCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
  return validarCaracterEspecial.test(contra);
}

const botonCrear = document.getElementById('.btn-primary') !== null;

    if (botonCrear) {
      botonCrear.addEventListener('click', registroUsuario);
    } 

// lógica para el carrito
function calcularTotalCarrito(carrito) {
  let total = 0;

  for (let index = 0; index < carrito.length; index++) {
    total += carrito[index].valor * carrito[index].cantidad;
  }
  return total;
}

function mostrarTotalCarrito() {
  const totalCarrito = calcularTotalCarrito(carrito);
  const totalCarritoLugar = document.getElementById('totalCarrito');
  totalCarritoLugar.innerHTML = `<h4>Total carrito: $ ${totalCarrito}</h4>`;
}

function agregarAlCarrito(nombre, valor) {
  const productoExistente = carrito.find(obras => obras.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, valor, cantidad: 1 });
  }
  Swal.fire({
    position: "top",
    backdrop: false,
    width: "250px",
    html: "<h4>Agregado al carrito</h4> <i class='bx bxs-cart carritoBtn' ></i>",
    showConfirmButton: false,
    timer: 1300,
    customClass: {
      popup: "miSwCuadro",
    }
  });
  reproducirSonido("../assets/sound/ding-126626.mp3");
  actualizarListaCarrito();
  guardarCarritoLocalStorage();
  actualizarContadorCarrito();
  mostrarTotalCarrito();
  cargarProductosDesdeLocalStorage();
}

function eliminarDelCarrito(index) {
  const obra = carrito[index];
  if (obra.cantidad > 1) {
    obra.cantidad -= 1;
  } else {
    carrito.splice(index, 1);
  }
  actualizarListaCarrito();
  guardarCarritoLocalStorage();
  actualizarContadorCarrito();
  mostrarTotalCarrito();
  cargarProductosDesdeLocalStorage();
}

function reproducirSonido(ding) {
  const audio = new Audio(ding);
  audio.play();
}

function actualizarContadorCarrito() {
  const cuentaCarrito = document.querySelector('.cuentaCarrito');
  let cantidadTotal = 0;

  carrito.forEach(obra => {
    cantidadTotal += obra.cantidad;
  });

  cuentaCarrito.textContent = cantidadTotal.toString();
}

function guardarCarritoLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

actualizarContadorCarrito()

function actualizarListaCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
  if (listaCarrito) {
  listaCarrito.innerHTML = '';

  carrito.map((obra, index) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    item.innerHTML = `
      ${obra.cantidad} | ${obra.nombre} - $ ${obra.valor} 
      <span class="bx bx-trash float-end" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})"></span>
    `;
    listaCarrito.appendChild(item);
  });
  }
}

//sweetAlert

function vaciarCarrito() {
  Swal.fire({
    title: "¡Cuidado!",
    text: "No podrás revertir esta acción.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Vaciar carrito",
    cancelButtonText: "Mantener carrito",
    confirmButtonColor: "rgba(39, 55, 77, 1)",
    cancelButtonColor: "rgba(97, 124, 145, 0.89)",
    iconColor: "rgba(39, 55, 77, 1)",
    customClass: {
      container: "miSw", 
      popup: "miSwCuadro", 
      header: "miSwHeader", 
      title: "miSwTitulo", 
      icon: "miSwIcono",
    }
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      actualizarListaCarrito();
      guardarCarritoLocalStorage();
      actualizarContadorCarrito();
      mostrarTotalCarrito();
      localStorage.removeItem('carrito');

      Swal.fire({
        title: "¡Listo!",
        text: "Carrito vaciado con éxito.",
        icon: "success",
        iconColor: "rgba(39, 55, 77, 1)",
        confirmButtonColor: "rgba(39, 55, 77, 1)",
        customClass: {
          container: "miSw", 
          popup: "miSwCuadro", 
          header: "miSwHeader", 
          title: "miSwTitulo", 
          icon: "miSwIcono",
        }
      });
    }
  });
}

function comprarCarrito() {
  const totalCarritoBoton = calcularTotalCarrito(carrito);
Swal.fire({
  title: "¿Deseas comprar las obras?",
  html: `<h2>El total del carrito es: $ ${totalCarritoBoton}</h2>`, 
  showCancelButton: true,
  confirmButtonText: "Comprar",
  cancelButtonText: "Seguir buscando",
  confirmButtonColor: "rgba(39, 55, 77, 1)",
  cancelButtonColor: "rgba(97, 124, 145, 0.89)",
  customClass: {
    container: "miSw", 
    popup: "miSwCuadro", 
    header: "miSwHeader", 
    title: "miSwTitulo", 
    icon: "miSwIcono",
  }
}).then((result) => {
  if (result.isConfirmed) {
    carrito = [];
    actualizarListaCarrito();
    guardarCarritoLocalStorage();
    actualizarContadorCarrito();
    mostrarTotalCarrito();
    localStorage.removeItem('carrito');

    Swal.fire({
      title: "¡Genial!",
      text: "Compra realizada con éxito.",
      icon: "success",
      iconColor: "rgba(39, 55, 77, 1)",
      confirmButtonColor: "rgba(39, 55, 77, 1)",
      customClass: {
        container: "miSw", 
        popup: "miSwCuadro", 
        header: "miSwHeader", 
        title: "miSwTitulo", 
        icon: "miSwIcono",
      }
    });
  }
});
}
