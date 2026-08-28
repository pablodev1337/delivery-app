# delivery-app

Mini aplicación web estilo delivery desarrollada como proyecto final de la Tecnicatura Universitaria en Programación.

## Descripción

La aplicación permite a un usuario navegar un menú de comidas, agregar productos a un carrito, modificar cantidades, eliminar productos, ver el total del pedido y completar un formulario de pedido con confirmación final.

## Funcionalidades

- Menú de comidas
- Agregar productos al carrito
- Cambiar cantidades de productos
- Calcular total del pedido
- Eliminar productos del carrito
- Formulario de pedido
- Confirmación del pedido

## Integrantes del grupo

- Pablo
- Matias
- Alberto
- Kevin

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript

## Flexbox

- En el `.header__container`, para alinear el logo y la barra de navegación en una misma fila.
- En cada `.carrito__item`, para distribuir el nombre del producto, el control de cantidad, el subtotal y el botón de eliminar en una línea.
- En `.footer-contenido`, para organizar las tres columnas del footer (logo/descripción, enlaces y contacto) una al lado de la otra, con `flex-wrap` para que se acomoden en pantallas chicas.
- En `.campo` (dentro del formulario), para apilar verticalmente el label y el input de cada campo.

## Grid

- En `.menu__grid`, para mostrar las tarjetas de producto en columnas que se adaptan automáticamente al ancho de pantalla (`repeat(auto-fit, minmax(...))`).
- En `#form-pedido`, para organizar los campos del formulario de pedido en una grilla vertical con espaciado uniforme.

## Variables CSS

- Definidas en `:root`:
- `--primary` y `--primary-dark`: color naranja principal, usado en botones y elementos de acción.
- `--secondary`: azul oscuro, usado en textos fuertes y títulos.
- `--success`: verde, para estados positivos (confirmación de pedido).
- `--warning`: ámbar, para precios y alertas.
- `--danger`: rojo, para el botón de eliminar producto.
- `--background`: color de fondo general de la página.
- `--surface`: blanco, usado en tarjetas y el header.
- `--text` y `--text-muted`: colores de texto principal y secundario.
- `--border`: color de bordes en tarjetas, inputs y separadores.

## Responsive Design 

Usamos media queries con dos puntos de quiebre principales:
 
- **Tablet (hasta 900px)**: la grilla de productos reduce el tamaño mínimo de columna, el footer centra su contenido, y el espaciado del nav se ajusta.
- **Mobile (hasta 600px)**: el header pasa de fila a columna, la grilla de productos se convierte en una sola columna, el formulario y la confirmación reducen sus márgenes laterales, y las columnas del footer se apilan una debajo de la otra ocupando el 100% del ancho.

## ¿Qué estrategias de SEO implementamos?
 
- **Meta description específica**: la etiqueta `<meta name="description">` describe puntualmente de qué trata la app ("Aplicación web de pedidos de comida estilo delivery"), en vez de un texto genérico.
- **Viewport para mobile-friendly**: `<meta name="viewport" content="width=device-width, initial-scale=1.0">` asegura que el sitio se vea bien en celulares, algo que Google prioriza al rankear páginas (mobile-first indexing).
- **HTML semántico**: usamos `header`, `nav`, `main`, `section`, `aside`, `article` y `footer` en vez de `div` genéricos, lo que ayuda a los buscadores a entender la estructura y jerarquía del contenido.
- **Jerarquía de encabezados ordenada**: un solo `h1` (el nombre del local), `h2` por cada sección principal (Menú, Carrito, Confirmar Pedido) y `h3` por cada producto individual, sin saltos de nivel.
- **Atributos `alt` descriptivos en las imágenes**: cada imagen de producto tiene un `alt` que describe el plato real (por ejemplo, "Hamburguesa con lechuga, tomate y queso" en vez de un texto genérico como "imagen de producto"), lo que mejora el posicionamiento en Google Imágenes y la accesibilidad para lectores de pantalla.
- **Etiquetas Open Graph**: agregamos `og:title`, `og:description` y `og:image` para que, al compartir el link en redes sociales o WhatsApp, se muestre una vista previa con título, descripción e imagen en vez de un link pelado.
- **Favicon configurado**: mejora el reconocimiento de marca en pestañas del navegador y resultados de búsqueda.

## Cómo ejecutar el proyecto

1. Cloná el repositorio:
   ```
   git clone <url-del-repositorio>
   ```
2. Abrí el archivo `index.html` en tu navegador.

## Organización de ramas

- `main`: rama estable, versión de entrega.
- `dev`: rama principal de desarrollo.
- `feature/nombre-de-la-tarea`: ramas de trabajo individuales, que se integran a `dev` mediante Pull Requests.

## Estado del proyecto

En desarrollo — TP nro. 2: interfaz completa con Flexbox, Grid, variables CSS y diseño responsive.