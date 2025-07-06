const portafolios = [{
    img: "img/portafolio1.png",
    autor: "John Doe",
    nombre: "Creativo Digital"
  },
  {
    img: "img/portafolio2.png",
    autor: "Jane Smith",
    nombre: "Arte y Luz"
  },
  {
    img: "img/portafolio3.jpg",
    autor: "Carlos Ruiz",
    nombre: "Visión Moderna"
  }
];

let actual = 0;

const img = document.getElementById('galeria-img');
const autor = document.getElementById('galeria-autor');
const nombre = document.getElementById('galeria-nombre');
const prev = document.getElementById('galeria-prev');
const next = document.getElementById('galeria-next');
const info = document.querySelector('.galeria-info');

function mostrarPortafolio(idx) {
  // Animación de fade out
  img.classList.add('fade-out');
  info.classList.add('fade-out');
  setTimeout(() => {
    img.src = portafolios[idx].img;
    img.alt = portafolios[idx].nombre;
    autor.textContent = "Autor: " + portafolios[idx].autor;
    nombre.textContent = "Portafolio: " + portafolios[idx].nombre;
    img.classList.remove('fade-out');
    info.classList.remove('fade-out');
  }, 400);
}

prev.addEventListener('click', () => {
  actual = (actual - 1 + portafolios.length) % portafolios.length;
  mostrarPortafolio(actual);
});

next.addEventListener('click', () => {
  actual = (actual + 1) % portafolios.length;
  mostrarPortafolio(actual);
});