# language: es
Característica: Gestión de productos en la API
  Como usuario de la API
  Quiero registrar y consultar productos
  Para mantener el inventario actualizado

  Escenario: Crear un producto exitosamente
    Dado que la base de datos está disponible
    Cuando envío una petición POST a "/api/v1/productos" con el nombre "Mouse Gamer", precio 25.50 y categoria_id 1
    Entonces el código de respuesta debe ser 201
    Y el producto debe guardarse correctamente con el nombre "Mouse Gamer"