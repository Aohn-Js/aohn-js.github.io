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

window.onscroll = function () {
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('.container_btn_top').classList.add('show');
    }
    else {
        document.querySelector('.container_btn_top').classList.remove('show');
    }
}

document.querySelector('.container_btn_top').addEventListener('click', () => {
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
