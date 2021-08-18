//Listar los usuarios
/**
 * @swagger
 * /usuarios/lista/admin:
 *  get:
 *    description: Listado de usuarios
 *    responses:
 *      200:
 *        description: Success * 
 */
//Alta de nuevos usuarios
/**
 * @swagger
 * /usuarios/alta:
 *  post:
 *    description: Creación de una cuenta usuario
 *    parameters:
 *    - name: usuario
 *      description: Usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: nom_ape
 *      description: Nombre y Apellido
 *      in: formData
 *      required: true
 *      type: string
 *    - name: correo
 *      description: Correo Electrónico
 *      in: formData
 *      required: true
 *      type: string
 *    - name: tel
 *      description: Teléfono
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: direccion 
 *      description: Dirección de Envío
 *      in: formData
 *      required: true
 *      type: string
 *    - name: pass
 *      description: pass
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success * 
 */
//Los usuarios pueden hacer login con su usuario y pass del registro
/**
 * @swagger
 * /login:
 *  post:
 *    description: Login
 *    parameters:
 *    - name: correo
 *      description: Dirección de Correo
 *      in: formData
 *      required: true
 *      type: string
 *    - name: pass
 *      description: pass
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success * 
 */
//Listar Productos
/**
 * @swagger
 * /productos:
 *  get:
 *    description: Listado de Productos
 *    responses:
 *      200:
 *        description: Success * 
 */
//Los usuarios registrados pueden realizar pedidos
/**
 * @swagger
 * /productos/pedido:
 *  post:
 *    description: Creación de un pedido
 *    parameters:
 *    - name: direccion
 *      description: Dirección de Envío
 *      in: formData
 *      required: true
 *      type: string
 *    - name: id_prod
 *      description: Código del Producto
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: cantidad
 *      description: Cantidad
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: id_pago
 *      description: Forma de Pago
 *      in: formData
 *      required: true
 *      type: string
 *      enum: [1.efectivo,2.tarjeta]
 *    responses:
 *      200:
 *        description: Success * 
 */
//Los usuarios registrados pueden ver el historial de sus pedidos
/**
 * @swagger
 * /pedidos/historial:
 *  post:
 *    description: Historial de pedidos
 *    parameters:
 *    - name: id_usuario
 *      description: Clave Usuario
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success * 
 */
//Los administradores pueden ver todos los pedidos y cambiar el estado de los mismos
/**
 * @swagger
 * /pedidos/admin:
 *  get:
 *    description: Listado de pedidos
 *    responses:
 *      200:
 *        description: Success * 
 */
//Cambiar el estado del pedido
/**
 * @swagger
 * /pedidos/admin:
 *  put:
 *    description: Cambiar el estado del Pedido
 *    parameters:
 *    - name: id_pedido
 *      description: Id Pedido
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: id_estado
 *      description: Id Estado
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success * 
 */
//Los usuarios administradores pueden dar de alta nuevos productos
/**
 * @swagger
 * /productos/admin:
 *  post:
 *    description: Nuevos productos
 *    parameters:
 *    - name: detalle
 *      description: Nombre del producto
 *      in: formData
 *      required: true
 *      type: string
 *    - name: precio
 *      description: Precio
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success * 
 */
//Los administradores pueden editar un productos
/**
 * @swagger
 * /productos/admin:
 *  put:
 *    description: Edición de un producto
 *    parameters:
 *    - in: "body"
 *      name: "body"
 *      description: Edición de un producto
 *      required: true
 *    responses:
 *      200:
 *        description: Success * 
 */
//Los usuarios administradores pueden eliminar un producto
/**
 * @swagger
 * /productos/admin:
 *  delete:
 *    description: Eliminar un producto
 *    parameters:
 *      name: id_prod
 *      description: Producto
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success * 
 */
//Que los administradores puedan crear nuevos medios de pago
/**
 * @swagger
 * /formasPagos/admin:
 *  post:
 *    description: Creación de formas de pago
 *    parameters:
 *    - name: detalle_pago
 *      description: Nueva opción
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success * 
 */
//Que los administradores puedan crear nuevos medios de pago
/**
 * @swagger
 * /formasPagos/admin:
 *  post:
 *    description: Creación de formas de pago
 *    parameters:
 *    - name: detalle_pago
 *      description: Nueva opción
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success * 
 */
//Que los administradores puedan borrar los medios de pago
/**
 * @swagger
 * /borrarformaPagos/admin:
 *  delete:
 *    description: Eliminación de un medio de pago
 *    parameters:
 *    - name: id_pago
 *      description: Id Pago
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success * 
 */
// Que los administradores puedan ver los medios de pagos
/**
 * @swagger
 * /verformaPagos/admin:
 *  get:
 *    description: Listado de formaPagos
 *    responses:
 *      200:
 *        description: Success * 
 */