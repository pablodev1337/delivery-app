/* ==========================================================
   CARRITO
========================================================== */

const carrito = [];

const listaCarrito =
    document.getElementById("lista-carrito");

const totalPrecioSpan =
    document.getElementById("total-precio");


function agregarAlCarrito(id, nombre, precio) {

    const itemExistente =
        carrito.find(
            (item) => item.id === id
        );


    if (itemExistente) {

        itemExistente.cantidad += 1;

    } else {

        carrito.push({

            id,
            nombre,
            precio,
            cantidad: 1

        });

    }


    renderizarCarrito();

}


function calcularTotal() {

    return carrito.reduce(

        (acumulado, item) =>
            acumulado +
            item.precio *
            item.cantidad,

        0

    );

}


function formatearPrecio(numero) {

    return "$" +
        numero.toLocaleString("es-AR");

}


function renderizarCarrito() {

    if (carrito.length === 0) {

        listaCarrito.innerHTML = `

            <li class="list-group-item
                       text-center
                       text-muted
                       py-4">

                <i class="bi bi-cart-x fs-3 d-block mb-2"></i>

                Todavía no agregaste productos
                al carrito.

            </li>

        `;


        totalPrecioSpan.textContent =
            formatearPrecio(0);

        return;

    }


    listaCarrito.innerHTML = carrito

        .map((item) => {

            const subtotal =
                item.precio *
                item.cantidad;


            return `

                <li
                    class="list-group-item
                           carrito-item-js
                           py-3">

                    <div>

                        <span class="fw-bold">

                            ${item.nombre}

                        </span>

                        <span
                            class="text-muted">

                            x${item.cantidad}

                        </span>

                    </div>


                    <div
                        class="d-flex
                               align-items-center
                               gap-3">

                        <span class="fw-bold">

                            ${formatearPrecio(subtotal)}

                        </span>


                        <button
                            class="btn
                                   btn-sm
                                   btn-danger
                                   btn-eliminar-item"
                            type="button"
                            data-id="${item.id}"
                            title="Eliminar producto">

                            <i class="bi bi-trash"></i>

                        </button>

                    </div>

                </li>

            `;

        })

        .join("");


    totalPrecioSpan.textContent =
        formatearPrecio(
            calcularTotal()
        );


    const botonesEliminar =
        listaCarrito.querySelectorAll(
            ".btn-eliminar-item"
        );


    botonesEliminar.forEach(
        (boton) => {

            boton.addEventListener(
                "click",
                () => {

                    eliminarDelCarrito(
                        boton.dataset.id
                    );

                }
            );

        }
    );

}


function eliminarDelCarrito(id) {

    const indice =
        carrito.findIndex(
            (item) => item.id === id
        );


    if (indice !== -1) {

        carrito[indice].cantidad -= 1;


        if (
            carrito[indice].cantidad <= 0
        ) {

            carrito.splice(
                indice,
                1
            );

        }


        renderizarCarrito();

    }

}


/* ==========================================================
   BOTONES AGREGAR
========================================================== */

const botonesAgregar =
    document.querySelectorAll(
        ".btn-agregar-carrito"
    );


botonesAgregar.forEach(
    (boton) => {

        boton.addEventListener(
            "click",
            () => {

                const id =
                    boton.dataset.id;

                const nombre =
                    boton.dataset.nombre;

                const precio =
                    Number(
                        boton.dataset.precio
                    );


                agregarAlCarrito(
                    id,
                    nombre,
                    precio
                );

            }
        );

    }
);


renderizarCarrito();


/* ==========================================================
   MODAL DE INFORMACIÓN
========================================================== */

const modalInfo =
    document.getElementById(
        "modal-info"
    );


const modalInfoImagen =
    document.getElementById(
        "modal-info-imagen"
    );


const modalInfoNombre =
    document.getElementById(
        "modal-info-nombre"
    );


const modalInfoIngredientes =
    document.getElementById(
        "modal-info-ingredientes"
    );


const modalInfoElaboracion =
    document.getElementById(
        "modal-info-elaboracion"
    );


const botonesMasInfo =
    document.querySelectorAll(
        ".btn-mas-info"
    );


botonesMasInfo.forEach(
    (boton) => {

        boton.addEventListener(
            "click",
            () => {

                modalInfoImagen.src =
                    boton.dataset.imagen;


                modalInfoImagen.alt =
                    boton.dataset.nombre;


                modalInfoNombre.textContent =
                    boton.dataset.nombre;


                modalInfoElaboracion.textContent =
                    boton.dataset.elaboracion;


                const listaIngredientes =
                    boton.dataset.ingredientes
                        .split(",");


                modalInfoIngredientes.innerHTML =
                    listaIngredientes

                        .map(
                            (ingrediente) => `

                                <li>
                                    ${ingrediente.trim()}
                                </li>

                            `
                        )

                        .join("");

            }
        );

    }
);


/* ==========================================================
   FORMULARIO DE PEDIDO
========================================================== */

const formularioPedido =
    document.getElementById(
        "form-pedido"
    );


const confirmacion =
    document.getElementById(
        "confirmacion"
    );


const resumenPedido =
    document.getElementById(
        "resumen-pedido"
    );


formularioPedido.addEventListener(
    "submit",
    (evento) => {

        evento.preventDefault();


        if (carrito.length === 0) {

            alert(
                "Agregá al menos un producto al carrito antes de confirmar el pedido."
            );

            return;

        }


        const nombre =
            document.getElementById(
                "nombre"
            ).value;


        const metodoPago =
            document.getElementById(
                "metodo-pago"
            ).value;


        const total =
            formatearPrecio(
                calcularTotal()
            );


        resumenPedido.textContent =
            `${nombre}, tu pedido por ${total} será abonado mediante ${metodoPago.toLowerCase()}.`;


        confirmacion.classList.remove(
            "d-none"
        );


        confirmacion.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* ==========================================================
   PRESENTACIÓN INICIAL
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const introScreen =
            document.getElementById(
                "intro-screen"
            );


        const menu =
            document.getElementById(
                "menu"
            );


        /*
         * Evitamos que el navegador restaure
         * una posición anterior al actualizar.
         */

        if (
            "scrollRestoration" in history
        ) {

            history.scrollRestoration =
                "manual";

        }


        window.scrollTo(
            0,
            0
        );


        /*
         * La presentación permanece visible
         * aproximadamente 3 segundos.
         */

        setTimeout(
            () => {

                /*
                 * Primero ocultamos suavemente
                 * la presentación.
                 */

                introScreen.classList.add(
                    "intro-complete"
                );


                /*
                 * Luego hacemos el desplazamiento
                 * suave hacia el menú.
                 */

                requestAnimationFrame(
                    () => {

                        menu.scrollIntoView({

                            behavior: "smooth",

                            block: "start"

                        });

                    }
                );

            },
            3000
        );

    }
);