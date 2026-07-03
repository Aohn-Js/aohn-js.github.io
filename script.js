const menu = document.querySelector("#menu");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");
const menu_links = document.querySelectorAll(".menu_link");

function abrirMenu() {
    menu.classList.add("visible");
    abrir.setAttribute("aria-expanded", "true");
}

function cerrarMenu() {
    menu.classList.remove("visible");
    abrir.setAttribute("aria-expanded", "false");
}

abrir.addEventListener("click", abrirMenu);
cerrar.addEventListener("click", cerrarMenu);

menu_links.forEach(link => {
    link.addEventListener('click', () => {
        cerrarMenu();
    })
})

// Cierra el menú con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('visible')) {
        cerrarMenu();
    }
});

const btnTop = document.querySelector('#btnTop');

window.onscroll = function () {
    if (document.documentElement.scrollTop > 100) {
        btnTop.classList.add('show');
    }
    else {
        btnTop.classList.remove('show');
    }
}

btnTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Oculta la pantalla de carga cuando todo terminó de cargar
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
    }
});

// Carrusel infinito con auto-scroll + flechas manuales
function initCarousel({ trackId, viewportId, target, speed = 35 }) {
    const track = document.getElementById(trackId);
    const viewport = document.getElementById(viewportId);
    if (!track || !viewport) return;

    // Duplicamos los items originales una vez para poder loopear sin salto visible
    const originalItems = Array.from(track.children);
    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('a, button').forEach(el => el.setAttribute('tabindex', '-1'));
        track.appendChild(clone);
    });

    let posX = 0;
    let paused = false;
    let halfWidth = 0;
    let lastTime = null;

    function measure() {
        halfWidth = track.scrollWidth / 2;
    }
    measure();
    window.addEventListener('resize', measure);

    function step(timestamp) {
        if (lastTime === null) lastTime = timestamp;
        const delta = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        if (!paused && halfWidth > 0) {
            posX -= speed * delta;
            if (Math.abs(posX) >= halfWidth) {
                posX += halfWidth;
            }
            track.style.transform = `translateX(${posX}px)`;
        }
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    viewport.addEventListener('mouseenter', () => paused = true);
    viewport.addEventListener('mouseleave', () => paused = false);
    viewport.addEventListener('touchstart', () => paused = true, { passive: true });
    viewport.addEventListener('touchend', () => paused = false);

    function manualMove(direction) {
        const cardWidth = originalItems[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0);
        posX += direction === 'next' ? -cardWidth : cardWidth;
        if (posX <= -halfWidth) posX += halfWidth;
        if (posX > 0) posX -= halfWidth;

        track.style.transition = 'transform .4s ease';
        track.style.transform = `translateX(${posX}px)`;
        paused = true;

        clearTimeout(track._resumeTimer);
        track._resumeTimer = setTimeout(() => {
            track.style.transition = 'none';
            paused = false;
        }, 600);
    }

    const prevBtn = document.querySelector(`.carousel_arrow_prev[data-target="${target}"]`);
    const nextBtn = document.querySelector(`.carousel_arrow_next[data-target="${target}"]`);
    if (prevBtn) prevBtn.addEventListener('click', () => manualMove('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => manualMove('next'));
}

document.addEventListener('DOMContentLoaded', () => {
    initCarousel({ trackId: 'formacionTrack', viewportId: 'formacionViewport', target: 'formacion', speed: 30 });
    initCarousel({ trackId: 'proyectosTrack', viewportId: 'proyectosViewport', target: 'proyectos', speed: 30 });
});
