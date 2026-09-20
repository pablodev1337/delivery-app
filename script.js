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

// ========================================
// SUBMENÚ DE PRODUCTOS
// ========================================

const productosPorCategoria = {

    hamburguesas: [
        {
            id: "hamburguesa-clasica",
            nombre: "Hamburguesa Clásica",
            precio: 7500,
            imagen: "media/submenu-hamburguesa-simple.jpg",
            ingredientes: [
                "Pan de hamburguesa",
                "Carne de vaca",
                "Lechuga",
                "Tomate",
                "Queso"
            ],
            elaboracion:
                "Hamburguesa preparada con carne de vaca, acompañada de vegetales frescos y queso, servida en pan de hamburguesa."
        },
        {
            id: "hamburguesa-doble",
            nombre: "Hamburguesa Doble",
            precio: 9500,
            imagen: "media/submenu-hamburguesa-doble.jpg",
            ingredientes: [
                "Pan de hamburguesa",
                "Doble carne de vaca",
                "Queso",
                "Lechuga",
                "Tomate"
            ],
            elaboracion:
                "Dos medallones de carne de vaca acompañados con queso y vegetales frescos."
        },
        {
            id: "hamburguesa-completa",
            nombre: "Hamburguesa Completa",
            precio: 11000,
            imagen: "media/submenu-hamburguesa-completa.jpg",
            ingredientes: [
                "Pan de hamburguesa",
                "Carne de vaca",
                "Queso",
                "Lechuga",
                "Tomate",
                "Jamón",
                "Huevo"
            ],
            elaboracion:
                "Hamburguesa completa preparada con carne, queso, jamón, huevo y vegetales frescos."
        }
    ],

    pizzas: [
        {
            id: "pizza-muzzarella",
            nombre: "Pizza Muzzarella",
            precio: 8000,
            imagen: "media/submenu-pizza-muzzarella.webp",
            ingredientes: [
                "Masa de pizza",
                "Salsa de tomate",
                "Muzzarella",
                "Orégano",
                "Aceitunas"
            ],
            elaboracion:
                "Pizza elaborada con masa casera, salsa de tomate y abundante queso muzzarella."
        },
        {
            id: "pizza-napolitana",
            nombre: "Pizza Napolitana",
            precio: 10000,
            imagen: "media/submenu-pizza-napolitana.jpg",
            ingredientes: [
                "Masa de pizza",
                "Salsa de tomate",
                "Muzzarella",
                "Tomate",
                "Orégano"
            ],
            elaboracion:
                "Pizza con salsa de tomate, muzzarella y rodajas de tomate fresco."
        },
        {
            id: "pizza-especial",
            nombre: "Pizza Especial",
            precio: 15000,
            imagen: "media/submenu-pizza-especial.jpg",
            ingredientes: [
                "Masa de pizza",
                "Salsa de tomate",
                "Muzzarella",
                "Jamón",
                "Morrón",
                "Aceitunas"
            ],
            elaboracion:
                "Pizza especial preparada con muzzarella, jamón, morrón y aceitunas."
        }
    ],

    empanadas: [
        {
            id: "empanada-carne",
            nombre: "Empanada de Carne",
            precio: 10000,
            imagen: "media/submenu-empanadas-carne.jpg",
            ingredientes: [
                "Masa de empanada",
                "Carne",
                "Cebolla",
                "Morrón",
                "Condimentos",
                "Huevo"
            ],
            elaboracion:
                "Empanada rellena con carne condimentada, cebolla, morrón y huevo."
        },
        {
            id: "empanada-pollo",
            nombre: "Empanada de Pollo",
            precio: 10000,
            imagen: "media/submenu-empanadas-pollo.webp",
            ingredientes: [
                "Masa de empanada",
                "Pollo",
                "Cebolla",
                "Morrón",
                "Condimentos",
                "Huevo"
            ],
            elaboracion:
                "Empanada rellena con pollo desmenuzado, vegetales, condimentos y huevo."
        },
        {
            id: "empanada-jyq",
            nombre: "Empanada de Jamón y Queso",
            precio: 8000,
            imagen: "media/submenu-empanadas-jyq.jpg",
            ingredientes: [
                "Masa de empanada",
                "Jamón",
                "Queso"
            ],
            elaboracion:
                "Empanada rellena con una combinación de jamón y queso."
        }
    ],

    sanguches: [
        {
            id: "sandwich-milanesa",
            nombre: "Sándwich de Milanesa",
            precio: 9000,
            imagen: "media/submenu-sanguche-milanesa.avif",
            ingredientes: [
                "Pan",
                "Milanesa",
                "Lechuga",
                "Tomate",
                "Mayonesa"
            ],
            elaboracion:
                "Sándwich preparado con milanesa y vegetales frescos."
        },
        {
            id: "sandwich-completo",
            nombre: "Sándwich Completo",
            precio: 12000,
            imagen: "media/submenu-sanguche-completo.webp",
            ingredientes: [
                "Pan",
                "Milanesa",
                "Jamón",
                "Queso",
                "Lechuga",
                "Tomate",
                "Huevo"
            ],
            elaboracion:
                "Sándwich completo con milanesa, jamón, queso, huevo y vegetales."
        },
        {
            id: "lomito",
            nombre: "Lomito",
            precio: 13000,
            imagen: "media/submenu-lomito.jpg",
            ingredientes: [
                "Pan",
                "Carne de lomito",
                "Queso",
                "Jamon",
                "Lechuga",
                "Tomate",
                "Huevo"
            ],
            elaboracion:
                "Lomito preparado con carne, queso, jamon, huevo y vegetales frescos."
        }
    ],

    postres: [
        {
            id: "flan-casero",
            nombre: "Flan Casero",
            precio: 7000,
            imagen: "media/submenu-flan-casero.webp",
            ingredientes: [
                "Leche",
                "Huevos",
                "Azúcar",
                "Esencia de vainilla"
            ],
            elaboracion:
                "Flan casero preparado con leche, huevos, azúcar y esencia de vainilla."
        },
        {
            id: "brownie",
            nombre: "Brownie",
            precio: 6000,
            imagen: "media/submenu-brownie.jpg",
            ingredientes: [
                "Chocolate",
                "Harina",
                "Huevos",
                "Azúcar",
                "Manteca"
            ],
            elaboracion:
                "Brownie de chocolate con textura húmeda y sabor intenso a cacao."
        },
        {
            id: "cheesecake",
            nombre: "Cheesecake",
            precio: 8000,
            imagen: "media/submenu-cheesecake.jpg",
            ingredientes: [
                "Queso crema",
                "Galletas",
                "Manteca",
                "Azúcar",
                "Huevos"
            ],
            elaboracion:
                "Cheesecake elaborado sobre una base de galletas y una cremosa preparación de queso."
        }
    ],

    bebidas: [
        {
            id: "coca-cola",
            nombre: "Coca-Cola",
            precio: 2500,
            imagen: "media/submenu-cocacola.jpg",
            ingredientes: [
                "Coca-Cola"
            ],
            elaboracion:
                "Bebida gaseosa Coca-Cola servida fría."
        },
        {
            id: "agua",
            nombre: "Agua Mineral",
            precio: 2000,
            imagen: "media/submenu-agua.jpg",
            ingredientes: [
                "Agua mineral"
            ],
            elaboracion:
                "Agua mineral embotellada."
        },
        {
            id: "jugo-naranja",
            nombre: "Jugo Natural",
            precio: 2000,
            imagen: "media/submenu-jugo-naranja.jpg",
            ingredientes: [
                "Naranja"
            ],
            elaboracion:
                "Jugo preparado a base de naranja."
        }
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


// ========================================
// ELEMENTOS DEL DOM
// ========================================

const tarjetasCategorias =
    document.querySelectorAll(".category-card");

const menuCategorias =
    document.querySelector(".menu-categories");

const submenu =
    document.getElementById("submenu-productos");

const submenuTitulo =
    document.getElementById("submenu-titulo");

const submenuLista =
    document.getElementById("submenu-lista");

const btnVolverMenu =
    document.getElementById("btn-volver-menu");


// ========================================
// MOSTRAR SUBMENÚ
// ========================================

function mostrarSubmenu(categoria) {

    const productos =
        productosPorCategoria[categoria];

    if (!productos) {
        return;
    }

    submenuTitulo.textContent =
        nombresCategorias[categoria];


    submenuLista.innerHTML =
        productos.map(producto => {

            return `
                <div class="col-12 col-md-6 col-lg-4">

                    <div class="submenu-producto-card h-100">

                        <img
                            src="${producto.imagen}"
                            alt="${producto.nombre}"
                            class="submenu-producto-imagen"
                        >

                        <div class="submenu-producto-body">

                            <h4 class="submenu-producto-nombre">
                                ${producto.nombre}
                            </h4>

                            <p class="submenu-producto-precio">
                                ${formatearPrecio(producto.precio)}
                            </p>

                            <div class="submenu-producto-botones">

                                <button
                                    type="button"
                                    class="btn brand-btn-primary btn-agregar-submenu"
                                    data-id="${producto.id}"
                                    data-nombre="${producto.nombre}"
                                    data-precio="${producto.precio}"
                                >
                                    <i class="bi bi-cart-plus"></i>
                                    Agregar al pedido
                                </button>

                                <button
                                    type="button"
                                    class="btn btn-mas-info-submenu btn-mas-info"
                                    data-imagen="${producto.imagen}"
                                    data-nombre="${producto.nombre}"
                                    data-ingredientes="${producto.ingredientes.join(",")}"
                                    data-elaboracion="${producto.elaboracion}"
                                >
                                    <i class="bi bi-info-circle"></i>
                                    Más información
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            `;

        }).join("");


    // Ocultar categorías generales
    menuCategorias.classList.add("d-none");

    // Mostrar submenú
    submenu.classList.remove("d-none");


    // Eventos de agregar al carrito
    const botonesAgregarSubmenu =
        submenuLista.querySelectorAll(".btn-agregar-submenu");

    botonesAgregarSubmenu.forEach(boton => {

        boton.addEventListener("click", () => {

            const id =
                boton.dataset.id;

            const nombre =
                boton.dataset.nombre;

            const precio =
                Number(boton.dataset.precio);

            agregarAlCarrito(
                id,
                nombre,
                precio
            );

        });

    });


    // Eventos de Más Información
    const botonesMasInfo =
        submenuLista.querySelectorAll(".btn-mas-info");

    botonesMasInfo.forEach(boton => {

        boton.addEventListener("click", () => {

            modalInfoImagen.src =
                boton.dataset.imagen;

            modalInfoImagen.alt =
                boton.dataset.nombre;

            modalInfoNombre.textContent =
                boton.dataset.nombre;

            modalInfoElaboracion.textContent =
                boton.dataset.elaboracion;


            const listaIngredientes =
                boton.dataset.ingredientes.split(",");


            modalInfoIngredientes.innerHTML =
                listaIngredientes
                    .map(
                        ingrediente =>
                            `<li>${ingrediente.trim()}</li>`
                    )
                    .join("");


            modalInfo.classList.add("activo");

        });

    });


    // Ir hacia el submenú
    submenu.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ========================================
// VOLVER AL MENÚ GENERAL
// ========================================

btnVolverMenu.addEventListener("click", () => {

    submenu.classList.add("d-none");

    menuCategorias.classList.remove("d-none");

    menuCategorias.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// ========================================
// CLICK EN UNA CATEGORÍA
// ========================================

tarjetasCategorias.forEach(tarjeta => {

    tarjeta.addEventListener("click", () => {

        const categoria =
            tarjeta.dataset.category;

        mostrarSubmenu(categoria);

    });

});