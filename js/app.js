document.addEventListener("DOMContentLoaded", function() {
    const imagenes = [
        "../assets/img/arteAaron.jpeg",
        "../assets/img/arteAaron2.jpeg",
        "../assets/img/arteallz.jpeg",
        "../assets/img/arteallz2.jpeg",
        "../assets/img/arteallz3.jpeg",
        "../assets/img/arteallz4.jpeg",
        "../assets/img/artecam.jpeg",
        "../assets/img/artecam2.jpeg",
        "../assets/img/artecha.jpeg",
        "../assets/img/arteG.jpeg",
        "../assets/img/artelov.jpg",
        "../assets/img/artelov2.jpg",
        "../assets/img/artelov3.jpg",
        "../assets/img/artelov4.jpg"
    ];


    const galeriaDivs = document.querySelectorAll('.galeriaAbajo > div');

for (const div of galeriaDivs) {
    const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
    const imgElement = document.createElement("img");
    imgElement.src = imagenes[indiceAleatorio];
    div.appendChild(imgElement);
    imagenes.splice(indiceAleatorio, 1);
}

});


const obr = [
    {nombre: "Reflejos de un Joven Corazón", tipo: "papel", artista: "Allz"},
    {nombre: "Rohan Kishibe", tipo: "papel", artista: "Zephylix"},
    {nombre: "Moon", tipo: "fotografia", artista: "Xyloz"},
    {nombre: "MM", tipo: "fotografia", artista: "Zephyl"},
    {nombre: "Heartbreaker", tipo: "fotografia", artista: "Zephylix"},
    {nombre: "La gracia inmortal", tipo: "papel", artista: "Drazle"},
    {nombre: "Luz y sombra", tipo: "fotografia", artista: "Xyloz"},
    {nombre: "Autoretrato", tipo: "papel", artista: "Allz"},
    {nombre: "Destino", tipo: "pintura", artista: "Allz"},
    {nombre: "Ensueño", tipo: "fotografia", artista: "Drazle"},
    {nombre: "Vivir o existir", tipo: "pintura", artista: "Allz"},
    {nombre: "Golden trip", tipo: "fotografia", artista: "Xyloz"}
];

const artista = [
    {nombre: "Allz", tipo: ["pintura", "papel"]},
    {nombre: "Drazle", tipo: ["fotografia", "papel"]},
    {nombre: "Xyloz", tipo: ["fotografia"]},
    {nombre: "Zephylix", tipo: ["fotografia", "papel"]}
];

const estilo = obr.filter(el => el.tipo === "papel");
const estilo2 = obr.filter(el => el.tipo === "fotografia");
const estilo3 = obr.filter(el => el.tipo === "pintura");

let opcion = prompt("Que tipo de arte buscas? \n Papel \n Fotografia \n Pintura").toLowerCase()

if (opcion === "papel") {
    const datosObras = estilo.map(el => `${el.nombre}, ${el.artista}`).join('\n');
    alert(datosObras);
} else if (opcion === "fotografia") {
    const datosObras = estilo2.map(el => `${el.nombre}, ${el.artista}`).join('\n');
    alert(datosObras);
} else if (opcion === "pintura") {
    const datosObras = estilo3.map(el => `${el.nombre}, ${el.artista}`).join('\n');
    alert(datosObras);
} else if (opcion === ""){
    alert("Está bien, disfruta tu recorrido por la pagina")
}


