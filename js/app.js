let carrito = [];
let carritoStorage = JSON.parse(localStorage.getItem('carrito'));

if (carritoStorage && carritoStorage.length >= 1) {
  alert("Veni y termina la compra!")
} 


document.addEventListener("DOMContentLoaded", function() {
  const imagenes = [
      {img:"../assets/img/arteAaron.jpeg", enlace: "../masPaginas/obraDos.html"},
      {img:"../assets/img/arteAaron2.jpeg", enlace: "../pages/error.html"},
      {img:"../assets/img/arteallz.jpeg", enlace: "../pages/error.html"},
      {img:"../assets/img/arteallz2.jpeg", enlace: "../masPaginas/obraUno.html"},
      {img:"../assets/img/arteallz3.jpeg", enlace: "../pages/error.html"},
      {img:"../assets/img/arteallz4.jpeg", enlace: "../pages/error.html"},
      {img:"../assets/img/artecam.jpeg", enlace: "../pages/error.html"},
      {img:"../assets/img/artecam2.jpeg", enlace: "../pages/error.html"},
      {img:"../assets/img/artecha.jpeg", enlace: "../masPaginas/obracuatro.html"},
      {img:"../assets/img/arteG.jpeg", enlace: "../pages/error.html"},
      {img:"../assets/img/artelov.jpg", enlace: "../masPaginas/obraTres.html"},
      {img:"../assets/img/artelov2.jpg", enlace: "../pages/error.html"},
      {img:"../assets/img/artelov3.jpg", enlace: "../pages/error.html"},
      {img:"../assets/img/artelov4.jpg", enlace: "../pages/error.html"}
  ];

  const galeriaDivs = document.querySelectorAll('.galeriaAbajo > div');
//sugerencias random en index
  for (const div of galeriaDivs) {
      const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
      const { img, enlace } = imagenes[indiceAleatorio];

      const imgElement = document.createElement("img");
      imgElement.src = img;

      const enlaceElement = document.createElement("a");
      enlaceElement.href = enlace;
      enlaceElement.appendChild(imgElement);

      div.appendChild(enlaceElement);

      imagenes.splice(indiceAleatorio, 1);
  }
});


document.addEventListener("DOMContentLoaded", function () {
  
  const obras = [
     {nombre: "Reflejos de un Joven Corazón", valor:1000, tipo: "papel", artista: "Allz", img: "../assets/img/arteallz2.jpeg", enlace: "../masPaginas/obraUno.html"},
       {nombre: "Rohan Kishibe", valor:1000, tipo: "papel", artista: "Zephylix", img: "../assets/img/arteAaron.jpeg", enlace: "../masPaginas/obraDos.html"},
       {nombre: "Moon", valor:1000, tipo: "fotografia", artista: "Xyloz", img: "../assets/img/artelov.jpg", enlace: "../masPaginas/obraTres.html"},
       {nombre: "MM", valor:1000, tipo: "fotografia", artista: "Zephyl", img: "../assets/img/artecha.jpeg", enlace: "../masPaginas/obracuatro.html"},
       {nombre: "Heartbreaker", valor:1000, tipo: "fotografia", artista: "Zephylix", img: "../assets/img/arteG.jpeg", enlace: "../pages/error.html"},
       {nombre: "La gracia inmortal", valor:1000, tipo: "papel", artista: "Drazle", img: "../assets/img/artek.jpeg", enlace: "../pages/error.html"},
       {nombre: "Luz y sombra", valor:1000, tipo: "fotografia", artista: "Xyloz", img: "../assets/img/artelov4.jpg", enlace: "../pages/error.html"},
       {nombre: "Autoretrato", valor:1000, tipo: "papel", artista: "Allz", img: "../assets/img/arteallz3.jpeg", enlace: "../pages/error.html"},
       {nombre: "Destino", valor:1000, tipo: "pintura", artista: "Allz", img: "../assets/img/arteallz4.jpeg", enlace: "../pages/error.html"},
       {nombre: "Ensueño", valor:1000, tipo: "fotografia", artista: "Drazle", img: "../assets/img/artecam.jpeg", enlace: "../pages/error.html"},
       {nombre: "Vivir o existir", valor:1000, tipo: "pintura", artista: "Allz", img: "../assets/img/arteallz.jpeg", enlace: "../pages/error.html"},
       {nombre: "Golden trip", valor:1000, tipo: "fotografia", artista: "Xyloz", img: "../assets/img/artelov2.jpg", enlace: "../pages/error.html"}
    
     ];
      
  const artistas = [
   { nombre: "Allz", tipo: ["pintura", "papel"], enlace: "../artistas/artistaUno.html", img: "../assets/img/artistas/artista7.jpeg" },
     { nombre: "Drazle", tipo: ["fotografia", "papel"], enlace: "../artistas/artistaDos.html", img: "../assets/img/artistas/artista1.jpeg"  },
     { nombre: "Xyloz", tipo: ["fotografia"], enlace: "../artistas/artistaTres.html", img: "../assets/img/artistas/artista4.jpeg"  },
     { nombre: "Zephylix", tipo: ["fotografia", "papel"], enlace: "../artistas/artistaCuatro.html", img: "../assets/img/artistas/artista8.jpeg"  }
     
  ];

  const contenedorObras = document.getElementById("contenedorObras");
  const buscadorObras = document.getElementById("buscadorObras");

  const contenedorArtistas = document.getElementById("contenedorArtistas");
  const buscadorArtista = document.getElementById("buscadorArtista");

// Verificar la existencia de contenedo y buscador
  if (contenedorObras && buscadorObras) {
    function mostrarObras(obrasFiltradas) {
      contenedorObras.innerHTML = "";

      obrasFiltradas.map((obras) => {
        const divObra = document.createElement("div");
        divObra.classList.add("card", "m-2", "sinBorde");
        divObra.style.width = "18rem";
        divObra.style.height = "25rem";
        divObra.innerHTML = `
            <div class="card-body imagenParaCarrito">
            <a href="${obras.enlace}"><img src="${obras.img}" class="card-img-top imagenProducto" alt="Imagen de ${obras.artista}"></a>
                <div>
                  <h5 class="card-title">${obras.nombre}</h5>
                  <p class="card-text">Valor: ${obras.valor}</p>
                  <button class="btn btnAgregarCarrito" onclick="agregarAlCarrito('${obras.nombre}', ${obras.valor})">Agregar al Carrito</button>
                </div>
            </div>
        `;
        contenedorObras.appendChild(divObra);
      });
    }

    function filtrarObras() {
      const textoBusqueda = buscadorObras.value.toLowerCase();
      const obrasFiltradas = obras.filter((obras) =>
        obras.nombre.toLowerCase().includes(textoBusqueda)
      );

      mostrarObras(obrasFiltradas);
    }

    buscadorObras.addEventListener("input", filtrarObras);
    mostrarObras(obras);
  } 
  
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
      const textoBusqueda = buscadorArtista.value.toLowerCase();
      const artistasFiltrados = artistas.filter((artista) =>
        artista.nombre.toLowerCase().includes(textoBusqueda) ||
        artista.tipo.some((tipo) => tipo.toLowerCase().includes(textoBusqueda))
      );

      mostrarArtistas(artistasFiltrados);
    }

    buscadorArtista.addEventListener("input", filtrarArtistas);
    mostrarArtistas(artistas);
  }
});


function agregarAlCarrito(nombre, valor) {
  const productoExistente = carrito.find(obras => obras.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, valor, cantidad: 1 });
  }

  
  actualizarListaCarrito();
  guardarCarritoLocalStorage();
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
}

function guardarCarritoLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarListaCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
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


