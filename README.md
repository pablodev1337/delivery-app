# delivery-app

Mini aplicación web estilo delivery desarrollada como proyecto final de la Tecnicatura Universitaria en Programación.

## Descripción

La aplicación permite a un usuario navegar un menú de comidas, agregar productos a un carrito, modificar cantidades, eliminar productos, ver el total del pedido y completar un formulario de pedido con confirmación final.

## Funcionalidades

* Menú de comidas.
* Agregar productos al carrito.
* Cambiar cantidades de productos.
* Saber más información de los productos.
* Calcular total del pedido.
* Eliminar productos del carrito.
* Formulario de pedido.
* Confirmación del pedido.
* Diseño responsive para distintos tamaños de pantalla.
* Navegación responsive mediante Navbar de Bootstrap.
* Tarjetas de productos utilizando componentes y clases de Bootstrap.
* Uso de iconos mediante Bootstrap Icons.

## Integrantes del grupo

* Pablo Cano
* Matias Maza
* Alberto Roman
* Kevin Mendoza

## Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* Bootstrap 5.3.3
* Bootstrap Icons

## Bootstrap

Se incorporó **Bootstrap 5.3.3** para facilitar el desarrollo de la interfaz, mejorar la adaptación responsive y utilizar componentes y clases de utilidad ya preparados.

Se utilizó Bootstrap principalmente en:

* **Navbar:** se implementó una barra de navegación responsive mediante las clases `navbar`, `navbar-expand-lg`, `navbar-toggler`, `collapse` y otras clases de Bootstrap.
* **Sistema de grillas:** se utilizaron `container`, `row` y `col-*` para organizar el contenido y adaptar la distribución de los elementos según el tamaño de pantalla.
* **Tarjetas:** los productos, el carrito y el formulario utilizan clases como `card`, `card-body` y `shadow-sm`.
* **Botones:** se utilizaron las clases `btn` y otras clases de Bootstrap combinadas con estilos propios del proyecto.
* **Formularios:** se utilizaron clases como `form-control`, `form-select`, `form-label` y `row g-3` para mejorar la presentación y distribución de los campos.
* **Alertas:** la confirmación del pedido utiliza la estructura de alerta de Bootstrap junto con estilos personalizados.
* **Utilidades:** se utilizaron clases como `d-flex`, `d-none`, `w-100`, `fw-bold`, `text-center`, `py-*`, `mb-*`, entre otras.
* **Responsive Design:** las clases de Bootstrap permiten adaptar automáticamente diferentes elementos de la interfaz a distintos tamaños de pantalla.
* **Bootstrap Icons:** se incorporó la biblioteca Bootstrap Icons para disponer de iconografía dentro de la interfaz.

Bootstrap se utiliza en conjunto con CSS propio del proyecto para mantener la identidad visual y personalizar los componentes mediante clases como `brand-navbar`, `brand-card`, `brand-btn-primary`, `brand-title`, `brand-footer` y otras.

## Flexbox

* En el `.header__container`, para alinear el logo y la barra de navegación en una misma fila.
* En cada `.carrito__item`, para distribuir el nombre del producto, el control de cantidad, el subtotal y el botón de eliminar en una línea.
* En `.footer-contenido`, para organizar las tres columnas del footer (logo/descripción, enlaces y contacto) una al lado de la otra, con `flex-wrap` para que se acomoden en pantallas chicas.
* En `.campo` (dentro del formulario), para apilar verticalmente el label y el input de cada campo.
* También se utilizan clases de utilidad de Bootstrap relacionadas con Flexbox, como `d-flex`, `align-items-center`, `justify-content-between` y `flex-column`.

## Grid

* En `.menu__grid`, para mostrar las tarjetas de producto en columnas que se adaptan automáticamente al ancho de pantalla mediante `repeat(auto-fit, minmax(...))`.
* En `#form-pedido`, para organizar los campos del formulario de pedido en una grilla vertical con espaciado uniforme.
* Además, Bootstrap aporta su propio sistema de grillas mediante las clases `container`, `row` y `col-*`, utilizado en diferentes secciones de la aplicación para distribuir el contenido de manera responsive.

## Variables CSS

Definidas en `:root`:

* `--primary` y `--primary-dark`: color naranja principal, usado en botones y elementos de acción.
* `--secondary`: azul oscuro, usado en textos fuertes y títulos.
* `--success`: verde, para estados positivos (confirmación de pedido).
* `--warning`: ámbar, para precios y alertas.
* `--danger`: rojo, para el botón de eliminar producto.
* `--background`: color de fondo general de la página.
* `--surface`: blanco, usado en tarjetas y el header.
* `--text` y `--text-muted`: colores de texto principal y secundario.
* `--border`: color de bordes en tarjetas, inputs y separadores.

Estas variables se utilizan junto con las clases personalizadas del proyecto para modificar y mantener una identidad visual consistente.

## Responsive Design

Se utilizaron dos estrategias principales para lograr un diseño adaptable:

### Bootstrap

Bootstrap proporciona un sistema responsive mediante sus clases de grilla y breakpoints.

Se utilizan clases como:

* `col-12`
* `col-sm-6`
* `col-md-4`
* `col-lg-4`
* `col-xl-3`
* `col-md-6`

Esto permite que los elementos cambien su distribución dependiendo del ancho de pantalla.

Por ejemplo, las tarjetas de productos pueden mostrarse en una sola columna en pantallas pequeñas y aumentar progresivamente la cantidad de columnas en pantallas más grandes.

También se utiliza una Navbar responsive que se transforma en un menú desplegable en dispositivos pequeños.

### Media Queries propias

Además de Bootstrap, se mantienen media queries personalizadas para controlar aspectos específicos del diseño:

* **Tablet (hasta 900px):** la grilla de productos reduce el tamaño mínimo de columna, el footer centra su contenido y el espaciado del nav se ajusta.
* **Mobile (hasta 600px):** el header pasa de fila a columna, la grilla de productos se convierte en una sola columna, el formulario y la confirmación reducen sus márgenes laterales y las columnas del footer se apilan una debajo de la otra ocupando el 100% del ancho.

De esta manera, Bootstrap y el CSS propio trabajan en conjunto para conseguir una interfaz adaptable.

## ¿Qué estrategias de SEO implementamos?

* **Meta description específica:** la etiqueta `<meta name="description">` describe puntualmente de qué trata la app ("Aplicación web de pedidos de comida estilo delivery"), en vez de un texto genérico.

* **Viewport para mobile-friendly:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">` asegura que el sitio se vea correctamente en celulares y otros dispositivos.

* **HTML semántico:** usamos `header`, `nav`, `main`, `section`, `aside`, `article` y `footer` en vez de utilizar únicamente `div` genéricos, lo que ayuda a los buscadores a comprender la estructura del contenido.

* **Jerarquía de encabezados ordenada:** un solo `h1` (el nombre del local), `h2` por cada sección principal (Menú, Carrito, Confirmar Pedido) y `h3` por cada producto individual, sin saltos de nivel.

* **Atributos `alt` descriptivos en las imágenes:** cada imagen de producto tiene un `alt` que describe el plato real, por ejemplo, `"Hamburguesa con lechuga, tomate, queso y papas fritas"`, en vez de utilizar un texto genérico como `"imagen de producto"`. Esto también mejora la accesibilidad para lectores de pantalla.

* **Etiquetas Open Graph:** agregamos `og:title`, `og:description` y `og:image` para que, al compartir el link en redes sociales o WhatsApp, se pueda mostrar una vista previa con título, descripción e imagen.

* **Favicon configurado:** mejora el reconocimiento de la marca en la pestaña del navegador.

## Cómo ejecutar el proyecto

1. Cloná el repositorio:

   ```bash
   git clone <url-del-repositorio>
   ```

2. Abrí el archivo `index.html` en tu navegador.

El proyecto utiliza Bootstrap mediante CDN, por lo que las librerías de Bootstrap se cargan desde Internet al abrir la aplicación.

O puedes ver la página funcional en: https://delivery-app-tup.netlify.app/

## Organización de ramas

* `main`: rama estable, versión de entrega.
* `dev`: rama principal de desarrollo.
* `feature/nombre-de-la-tarea`: ramas de trabajo individuales, que se integran a `dev` mediante Pull Requests.
* `refactor/nombre-de-la-tarea`: ramas de refactorización.

## Estado del proyecto

En desarrollo — TP nro. 3: Refactorización/Integración de Bootstrap 5.3.3 y Bootstrap Icons.