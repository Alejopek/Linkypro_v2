const portafolios = [
  {
    img: "img/portafolio1.png",
    autor: "Debbie O'Brien",
    nombre: "Creativo Digital",
  },
  {
    img: "img/portafolio2.png",
    autor: "Adri",
    nombre: "Arte y Luz",
  },
  {
    img: "img/portafolio3.jpg",
    autor: "John Carter",
    nombre: "Visión Moderna",
  },
];

let actual = 0;

let img = document.getElementById("galeria-img");
const autor = document.getElementById("galeria-autor");
const nombre = document.getElementById("galeria-nombre");
const info = document.querySelector(".galeria-info");
const dots = document.querySelectorAll(".dot");

function mostrarPortafolio(idx) {
  // Crear nueva imagen
  const nuevaImg = document.createElement("img");
  nuevaImg.src = portafolios[idx].img;
  nuevaImg.alt = portafolios[idx].nombre;
  nuevaImg.className = "slide-in";
  nuevaImg.style.position = "absolute";
  nuevaImg.style.left = "0";
  nuevaImg.style.top = "0";
  nuevaImg.style.width = "100%";
  nuevaImg.style.height = "100%";
  nuevaImg.style.objectFit = "contain";

  // Imagen actual sale
  img.classList.add("slide-out");

  // Insertar la nueva imagen en el contenedor
  const container = img.parentElement;
  container.appendChild(nuevaImg);

  // Animación para el texto (info)
  const info = document.querySelector(".galeria-info");
  info.classList.add("slide-out");

  // Cambiar el texto a la mitad de la animación
  setTimeout(() => {
    info.querySelector("#galeria-autor").textContent =
      "Autor: " + portafolios[idx].autor;
    info.querySelector("#galeria-nombre").textContent =
      "Portafolio: " + portafolios[idx].nombre;
    info.classList.remove("slide-out");
    info.classList.add("slide-in");
  }, 400);

  // Quitar la imagen anterior y dejar la nueva después de la animación
  setTimeout(() => {
    container.removeChild(img);
    nuevaImg.classList.remove("slide-in");
    nuevaImg.removeAttribute("style");
    nuevaImg.id = "galeria-img";
    img = nuevaImg;
    info.classList.remove("slide-in");
  }, 800);

  // Actualizar dots activos
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === idx);
  });
}

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const idx = parseInt(dot.getAttribute("data-idx"));
    if (actual !== idx) {
      actual = idx;
      mostrarPortafolio(actual);
    }
  });
});

// --- Slider automático ---
let autoSlideInterval = null;
let galeriaVisible = false;
let userInteracting = false;

function startAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    if (galeriaVisible && !userInteracting) {
      actual = (actual + 1) % portafolios.length;
      mostrarPortafolio(actual);
    }
  }, 4000);
}

function stopAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
}

// Smooth scroll para navegación interna

document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").slice(1);
    const targetSection =
      document.getElementById(targetId) ||
      document.querySelector(`[name='${targetId}']`) ||
      document.querySelector(`section.${targetId}`);
    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Scroll suave para el botón 'Descubrir' igual que el nav
const descubrirBtn = document.getElementById("descubrir-btn");
if (descubrirBtn) {
  descubrirBtn.addEventListener("click", function (e) {
    const targetSection = document.getElementById("nosotros");
    if (targetSection) {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Aplicar animación al cargar la página (solo para .box-inicio, si quieres mantenerlo)
window.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("box-inicio");
  if (box) {
    box.classList.add("revelar");
  }
});

// Detectar visibilidad de la galería
const galeriaSection = document.querySelector(".muestras");
const observer = new window.IntersectionObserver(
  (entries) => {
    galeriaVisible = entries[0].isIntersecting;
    if (galeriaVisible) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
  },
  { threshold: 0.3 }
);
observer.observe(galeriaSection);

// Animación de entrada para la sección "Sobre Nosotros"
const nosotrosSection = document.querySelector(".nosotros-container");
if (nosotrosSection) {
  const observerNosotros = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nosotrosSection.classList.add("revelar");
          obs.disconnect(); // Solo animar una vez
        }
      });
    },
    { threshold: 0.3 }
  );
  observerNosotros.observe(nosotrosSection);
}

// Marcar interacción del usuario
function userDidInteract() {
  userInteracting = true;
  setTimeout(() => {
    userInteracting = false;
  }, 2000);
  startAutoSlide();
}

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const idx = parseInt(dot.getAttribute("data-idx"));
    if (actual !== idx) {
      actual = idx;
      mostrarPortafolio(actual);
      userDidInteract();
    }
  });
});

// Inicializar estado activo y slider automático
document.addEventListener("DOMContentLoaded", () => {
  img = document.getElementById("galeria-img");
  mostrarPortafolio(actual);
  startAutoSlide();
});
