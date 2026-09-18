const carrito = [];

const listaCarrito = document.querySelector("#carrito .list-group");
const totalPrecioSpan = document.getElementById("total-precio");

/**
 * Agrega un producto al carrito. Si ya existe (mismo id), le suma
 * una unidad a la cantidad en vez de duplicarlo en la lista.
 */
function agregarAlCarrito(id, nombre, precio) {
    const itemExistente = carrito.find((item) => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    renderizarCarrito();
}

function calcularTotal() {
    return carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
}

function formatearPrecio(numero) {
    return "$" + numero.toLocaleString("es-AR");
}

/**
 * Reconstruye el HTML de la lista del carrito y el total,
 * a partir del estado actual del array "carrito".
 */
function renderizarCarrito() {
    if (carrito.length === 0) {
        listaCarrito.innerHTML = `
            <li class="list-group-item text-center text-muted py-4">
                Todavía no agregaste productos al carrito.
            </li>
        `;
        totalPrecioSpan.textContent = formatearPrecio(0);
        return;
    }

    listaCarrito.innerHTML = carrito
        .map((item) => {
            const subtotal = item.precio * item.cantidad;
            return `
                <li class="list-group-item carrito-item-js py-3">
                    <span class="fw-bold">${item.nombre} <span class="text-muted fw-normal">x${item.cantidad}</span></span>
                    <div class="d-flex align-items-center gap-3">
                        <span class="fw-bold">${formatearPrecio(subtotal)}</span>
                        <button class="btn btn-sm btn-danger btn-eliminar-item" type="button" data-id="${item.id}" title="Eliminar producto">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </li>
            `;
        })
        .join("");

    totalPrecioSpan.textContent = formatearPrecio(calcularTotal());

    // Enganchamos el evento click a los botones de eliminar recién creados
    const botonesEliminar = listaCarrito.querySelectorAll(".btn-eliminar-item");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", () => {
            eliminarDelCarrito(boton.dataset.id);
        });
    });
}

/**
 * Quita un producto del carrito por completo (sin importar la cantidad)
 * y vuelve a dibujar la lista.
 */
function eliminarDelCarrito(id) {
    const indice = carrito.findIndex((item) => item.id === id);

    if (indice !== -1) {
        carrito[indice].cantidad -= 1;

        if (carrito[indice].cantidad <= 0) {
            carrito.splice(indice, 1);
        }

        renderizarCarrito();
    }
}

const botonesAgregar = document.querySelectorAll(".btn-agregar-carrito");

botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
        const id = boton.dataset.id;
        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        agregarAlCarrito(id, nombre, precio);
    });
});

// Estado inicial: carrito vacío al cargar la página
renderizarCarrito();


// MODAL DE "MÁS INFORMACIÓN"


const modalInfo = document.getElementById("modal-info");
const modalInfoImagen = document.getElementById("modal-info-imagen");
const modalInfoNombre = document.getElementById("modal-info-nombre");
const modalInfoIngredientes = document.getElementById("modal-info-ingredientes");
const modalInfoElaboracion = document.getElementById("modal-info-elaboracion");
const modalInfoCerrar = document.getElementById("modal-info-cerrar");

const botonesMasInfo = document.querySelectorAll(".btn-mas-info");

botonesMasInfo.forEach((boton) => {
    boton.addEventListener("click", () => {
        modalInfoImagen.src = boton.dataset.imagen;
        modalInfoImagen.alt = boton.dataset.nombre;
        modalInfoNombre.textContent = boton.dataset.nombre;
        modalInfoElaboracion.textContent = boton.dataset.elaboracion;

        // "data-ingredientes" llega como texto separado por comas.
        // Lo separamos y armamos un <li> por cada ingrediente.
        const listaIngredientes = boton.dataset.ingredientes.split(",");
        modalInfoIngredientes.innerHTML = listaIngredientes
            .map((ingrediente) => `<li>${ingrediente.trim()}</li>`)
            .join("");

        modalInfo.classList.add("activo");
    });
});

modalInfoCerrar.addEventListener("click", () => {
    modalInfo.classList.remove("activo");
});

// Cerrar haciendo clic fuera del contenido (en el fondo oscuro)
modalInfo.addEventListener("click", (evento) => {
    if (evento.target === modalInfo) {
        modalInfo.classList.remove("activo");
    }
});


/* ==========================================================
   PRESENTACIÓN INICIAL
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const introScreen = document.getElementById("intro-screen");
    const menu = document.getElementById("menu");

    // Evitamos que el navegador restaure una posición anterior al actualizar.
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    // La presentación permanece visible aproximadamente 3 segundos.
    setTimeout(() => {
        // Primero ocultamos suavemente la presentación.
        introScreen.classList.add("intro-complete");

        // Luego hacemos el desplazamiento suave hacia el menú.
        requestAnimationFrame(() => {
            menu.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }, 3000);
});

// ================================
// SUBMENÚ DE PRODUCTOS
// ================================

const productosPorCategoria = {
    hamburguesas: [
        { nombre: "Hamburguesa Clásica", precio: "$5.000" },
        { nombre: "Hamburguesa Doble", precio: "$6.500" },
        { nombre: "Hamburguesa Completa", precio: "$7.000" }
    ],

    pizzas: [
        { nombre: "Pizza Muzzarella", precio: "$8.000" },
        { nombre: "Pizza Napolitana", precio: "$9.000" },
        { nombre: "Pizza Especial", precio: "$10.000" }
    ],

    empanadas: [
        { nombre: "Empanada de Carne", precio: "$1.200" },
        { nombre: "Empanada de Pollo", precio: "$1.200" },
        { nombre: "Empanada de Jamón y Queso", precio: "$1.300" }
    ],

    sanguches: [
        { nombre: "Sándwich de Milanesa", precio: "$6.000" },
        { nombre: "Sándwich Completo", precio: "$6.500" },
        { nombre: "Lomito", precio: "$5.500" }
    ],

    postres: [
        { nombre: "Flan Casero", precio: "$2.500" },
        { nombre: "Brownie", precio: "$2.800" },
        { nombre: "Cheesecake", precio: "$3.000" }
    ],

    bebidas: [
        { nombre: "Coca-Cola", precio: "$2.500" },
        { nombre: "Agua Mineral", precio: "$1.500" },
        { nombre: "Jugo Natural", precio: "$2.000" }
    ]
};

const nombresCategorias = {
    hamburguesas: "Hamburguesas",
    pizzas: "Pizzas",
    empanadas: "Empanadas",
    sanguches: "Sanguches",
    postres: "Postres",
    bebidas: "Bebidas"
};

// Buscar elementos del HTML
const tarjetasCategorias = document.querySelectorAll(".category-card");
const submenu = document.getElementById("submenu-productos");
const submenuTitulo = document.getElementById("submenu-titulo");
const submenuLista = document.getElementById("submenu-lista");

// Detectar clic en cada categoría
tarjetasCategorias.forEach(tarjeta => {
    tarjeta.addEventListener("click", () => {

        const categoria = tarjeta.dataset.category;
        const productos = productosPorCategoria[categoria];

        // Cambiar título
        submenuTitulo.textContent = nombresCategorias[categoria];

        // Mostrar los 3 productos
        submenuLista.innerHTML = productos.map(producto => `
            <div class="col-12 col-md-4">
                <div class="card h-100 shadow-sm text-center">
                    <div class="card-body">
                        <h4 class="card-title">${producto.nombre}</h4>

                        <p class="card-text fw-bold">
                            ${producto.precio}
                        </p>

                        <button type="button" class="btn btn-primary">
                            Agregar al pedido
                        </button>
                    </div>
                </div>
            </div>
        `).join("");

        // Mostrar el submenú usando Bootstrap
        submenu.classList.remove("d-none");

        // Bajar automáticamente hasta los productos
        submenu.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});