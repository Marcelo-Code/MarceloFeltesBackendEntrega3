# API ELECTRONICA INTEGRAL

Este proyecto es una API backend para la gestión de productos electrónicos y carritos.

En comentarios de entrega dejo la URI de mongo.

## Endpoints:

### Productos:

- `GET http://localhost:8080/api/products`: recupera una lista de productos con paginación, filtrado y ordenamiento.
- **Query Parameters**:
  - `limit`: número de productos por página (predeterminado: 10).
  - `page`: número de página (predeterminado: 1).
  - `query`: Campo para filtrar (por ejemplo, `category`).
  - `value`: valor para filtrar (por ejemplo, `periféricos`).
  - `sort`: orden de clasificación (`asc` para ascendente, `desc` para descendente) por precio.
- `GET http://localhost:8080/api/products/:productId`: recupera un producto específico por ID.
- `GET http://localhost:8080/api/products/category/:category`: recupera productos por categoría.
- `POST http://localhost:8080/api/products`: crea un nuevo producto.
  - **Request Body**:
    - `title`: título del producto.
    - `description`: descripción del producto.
    - `price`: precio del producto.
    - `category`: categoría del producto.
    - `stock`: stock del producto.
- `PUT http://localhost:8080/api/products/:productId`: actualiza un producto existente.
  - `Request Body`: igual que POST http://localhost:8080/api/products.
- `DELETE http://localhost:8080/api/products/:productId`: elimina un producto.
- `GET http://localhost:8080/api/products/create`: renderiza el formulario de creación de productos.
- `GET http://localhost:8080/api/products/update/:productId`: renderiza el formulario de actualización de productos.

### Carritos:

- `GET http://localhost:8080/api/carts`: recupera la lista de carritos.
- `GET http://localhost:8080/api/carts/:cartId`: recupera un carrito por ID.
- `POST http://localhost:8080/api/carts`: crea un nuevo carrito.
- `DELETE http://localhost:8080/api/carts/:cartId/products/:productId`: elimina un producto de un carrito.
- `DELETE http://localhost:8080/api/carts/:cartId`: elimina un carrito.
- `PUT http://localhost:8080/api/carts/:cartId/products/:productId`: agrega un producto al un carrito específico.

## Explicación del proyecto

Este proyecto utiliza Node.js, Express y Mongoose para crear una API RESTful para la gestión de productos electrónicos y carritos. Incluye características como:

- **Gestión de productos**: crear, leer, actualizar y eliminar productos.
- **Gestión de carritos**: crear, leer, actualizar y eliminar carritos. Agregar y eliminar productos de los carritos.
- **Paginación**: paginar a través de grandes listas de productos.
- **Filtrado**: filtrar productos por categoría u otras propiedades.
- **Ordenamiento**: Ordenar productos por precio.

## Modelos

- **Product**: representa un producto electrónico con propiedades como título, descripción, precio, categoría y stock.
- **Cart**: representa un carrito de compras con una lista de productos.

## Rutas

El proyecto utiliza Express Router para definir las rutas para productos y carritos.

## Scripts

`insertData.js`: Script para insertar datos iniciales en la base de datos.

## Vistas

El proyecto utiliza Handlebars como motor de plantillas.

`createProduct.handlebars`: vista para crear un nuevo producto.
`home.handlebars`: vista principal del proyecto.
`product.handlebars`: vista para mostrar los detalles de un producto específico.
`products.handlebars`: vista para mostrar la lista de productos con paginación, filtrado y ordenamiento.
`updateProduct.handlebars`: vista para actualizar un producto existente.
`layouts/main.handlebars`: layout principal para las vistas.
