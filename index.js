//Configuración de Express
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

//Configuración de Swaggwer
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {

    swaggerDefinition: {
        info: {
            title: " API Delilah Restó",
            description: "Gestión de Pedidos",
            version: "1.0.0",
            contact: {
                name: "Alejandro Noriega"
            },
        },
    },

    apis: ['./swagger.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//Validaciones 
function validarDatos(req, res, next) {
    const { usuario, nom_ape, correo, tel, direccion, pass } = req.body;
    if (!usuario || !nom_ape || !correo || !tel || !direccion || !pass) {
        res.status(404).send("Complete todos los datos");
    } else {
        if (usuario !== "" || nom_ape !== "" || correo !== "" || tel !== "" || direccion !== "" || pass !== "") {
            let bandera = usuarios.find(item => item.correo == correo)
            if (bandera !== undefined) {
                res.status(404).json("Este email ya se encuentra registrado");
            } else {
                next();
            }
        } else {
            res.status(404).json("Complete todos los campos");
        }
    }
};
function admin(req, res, next) {
    let bandera = usuarios.find(item => (item.admin === true) && (item.estado === true))
    if (bandera == undefined) {
        res.status(404).json('Debe ser administrador para poder acceder')
    } else {
        next();
    }
}
function logueado(req, res, next) {

    let bandera = usuarios.find(item => item.estado == true)
    console.log(bandera);
    if (!bandera) {
        res.status(404).json('Debe estar logueado para poder acceder')
    } else {
        next();
    }
}
function validarCorreo(req, res, next) {
    const { correo } = req.body
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(correo)) {
        next();
    } else {

        res.status(404).send("La dirección de email es incorrecta!.");
    }
}
//USUARIOS
let usuarios = [
    {
        id_usuario: 1,
        usuario: "pepe123",
        nom_ape: "Pepe Perez",
        correo: "david@gmail.com",
        tel: 234532,
        direccion: "sucre 4040",
        pass: "pepe",
        admin: true,
        estado: false
    },
    {
        id_usuario: 2,
        usuario: "verano",
        nom_ape: "Blanca Torres",
        correo: "blanca@gmail.com",
        tel: 674532,
        direccion: "San Martin 25",
        pass: "chocolate",
        admin: false,
        estado: false
    },
    {
        id_usuario: 3,
        usuario: "marcos",
        nom_ape: "Marcos ",
        correo: "zarate@gmail.com",
        tel: 789654,
        direccion: "Thomas Edison 225",
        pass: "abc",
        admin: false,
        estado: false
    }
];
//PRODUCTOS
let productos = [
    {
        id_prod: 1,
        detalle: "Hamburguesa Clásica",
        precio: 350
    },
    {
        id_prod: 2,
        detalle: "Sandwich veggie",
        precio: 310
    },
    {
        id_prod: 3,
        detalle: "Ensalada veggie",
        precio: 340
    },
    {
        id_prod: 4,
        detalle: "Bagel de Salmón",
        precio: 425
    },
    {
        id_prod: 5,
        detalle: "Foacaccia",
        precio: 300
    },
    {
        id_prod: 6,
        detalle: "Sandwich Foacaccia",
        precio: 440
    }

];
//PEDIDOS
let pedidos = [

    {
        id_pedido: 1,
        id_usuario: 1,
        id_estado: 1,
        detalle: [{
            id_prod: 100,
            precio: 350,
            cantidad: 2
        }],
        id_pago: 1,
        total: 700,
        hora: " 23:00"

    }
]
// ESTADO
let estado = [
    {
        id_estado: 1,
        estado: "nuevo"
    },
    {
        id_estado: 2,
        estado: "confirmado"
    },
    {
        id_estado: 3,
        estado: "en Preparación"
    },
    {
        id_estado: 4,
        estado: "en Camino"
    },
    {
        id_estado: 5,
        estado: "Entregado"
    },
    {
        id_estado: 6,
        estado: "Eliminado"
    }
];
// FORMA DE PAGO
let formaPago = [
    {
        id_pago: 1,
        detalle_pago: "efectivo"
    },
    {
        id_pago: 2,
        detalle_pago: "tarjeta"
    }
];
//Documentación endpoints

//Registro y Login:
//Lista usuarios
app.get('/usuarios/lista/admin', admin, logueado, (req, res) => {
    return res.status(200).json({ 'Lista de usuarios': usuarios });
})
//a)Los usuarios pueden crear una cuenta en la aplicación
app.post('/usuarios/alta', validarDatos, validarCorreo, (req, res) => {
    const nuevoUsuario = {
        id_usuario: usuarios.length + 1,
        usuario: req.body.usuario,
        nom_ape: req.body.nom_ape,
        correo: req.body.correo,
        tel: req.body.tel,
        direccion: req.body.direccion,
        pass: req.body.pass,
        admin: false,
        estado: false
    };
    usuarios.push(nuevoUsuario);
    console.log(usuarios);
    console.log('Usuario creado exitosamente')
    return res.status(200).json(req.body);//devuelve usuario creado

});
//b)Los usuarios pueden hacer login con su usuario y pass del registro
app.post('/login', validarCorreo, (req, res) => {
    const { correo, pass } = req.body;
    console.log(correo, pass);
    let index = -1;
    usuarios.forEach((usuario, i) => {
        if (usuario.correo == correo) {
            if (usuario.pass == pass) {
                index = i;
                usuario.estado = true;
            }
        }
    });
    if (index == -1) {
        console.log("error");
        res.send('Datos incorrectos');
    } else {
        console.log(usuarios[index]);
        res.status(202).send("Acceso Correcto");

    }
})
//c)Los usuarios registrados pueden realizar pedidos de los productos que desean consumir
app.get('/Productos', logueado, (req, res) => {
    console.log(usuarios);
    res.send(productos);
});
//Agrega una dirección de envío
app.post('/productos/pedido', logueado, (req, res) => {

    let usuario = usuarios.find(item => item.estado === true);
    let producto = productos.find(item => item.id_prod === parseInt(req.body.id_prod));
    let d = new Date();
    let hora = `${d.getHours()}:${d.getMinutes()}`;
    let total;

    if (usuario.direccion === req.body.direccion) {
        console.log('El envío se registró con la misma dirección')
    }
    else {
        console.log('La nueva dirección de envío ha sido registrada')
    }
    const nuevoPedido = {
        id_pedido: pedidos.length + 1,
        id_usuario: usuario.id_usuario,
        direccion: req.body.direccion,
        id_estado: 1,
        detalle: [{
            id_prod: req.body.id_prod,
            precio: productos.precio,
            cantidad: req.body.cantidad,
            id_pago: req.body.id_pago, //sólo dos opciones efvo o tarj
            hora: hora
        }],
        total: (parseFloat(producto.precio) * parseInt(req.body.cantidad)),
    };

    pedidos.push(nuevoPedido);
    res.status(200).json({ "pedidos": nuevoPedido });

});
//Los usuarios registrados pueden ver el historial de sus pedidos. 

app.post('/pedidos/historial', logueado, (req, res) => {
    const historial = [];
    pedidos.forEach(pedido => {
        if (pedido.id_usuario == req.body.id_usuario) {
            historial.push(pedido);
        }
    })
    if (historial.length != 0) {
        res.status(200).send(historial);
    }
    else {
        res.status(200).send('Usted es la primera vez que compra en nuestro local');
    }
});
//Los administradores pueden ver todos los pedidos y cambiar el estado de los mismos
app.get('/pedidos/admin', logueado, admin, (req, res) => {
    res.json(pedidos);
});
app.put("/pedidos/admin", logueado, admin, (req, res) => {
    const { id_estado } = req.body;
    const id = parseInt(req.body.id_pedido);
    let index = pedidos.findIndex(x => x.id_pedido === id);

    if (index != -1) {
        pedidos[index].id_estado = id_estado;
        res.json({ 'Pedido Actualizado': pedidos });
    } else {
        res.send('Error');
    }
});

//Los usuarios administradores pueden dar de alta nuevos productos
app.post("/productos/admin", logueado, admin, (req, res) => {
    const { detalle, precio } = req.body;
    const nuevo = {
        id_prod: productos.length + 1,
        detalle,
        precio
    }
    productos.push(nuevo);
    res.status(200).send(productos);
});

//Los administradores pueden editar un producto
app.put("/productos/admin", logueado, admin, (req, res) => {
    const id = parseInt(req.body.id_prod);
    const { detalle = false, precio = false } = req.body;
    let index = productos.findIndex(x => x.id_prod === id);
    if (index != -1) {
        productos[index].detalle = detalle ? detalle : productos[index].detalle;
        productos[index].precio = precio ? precio : productos[index].precio;
        res.json({ 'Producto Actualizado': productos });
    } else {
        res.send('Error');
    }
});

//Los usuarios administradores pueden eliminar un producto
app.delete("/productos/admin", logueado, admin, (req, res) => {
    let index = productos.findIndex(x => x.id_prod == req.body.id_prod);
    if (index != -1) {
        productos.splice(index, 1);
        res.status(200).send('El producto ha sido eliminado correctamente');
    } else {
        res.status(404).send('Error');
    }
});

// //Que los administradores puedan crear nuevos medios de pago
app.post("/formasPagos/admin", logueado, admin, (req, res) => {
    const { detalle_pago } = req.body;
    const nuevo = {
        id_formaPago: formaPago.length + 1,
        detalle_pago

    }
    formaPago.push(nuevo);
    res.status(200).json(formaPago);
});

//Los administradores puedan editar los medios de pago
app.put("/modifPagos/admin", logueado, admin, (req, res) => {
    const id = parseInt(req.body.id_pago);
    const { detalle_pago = false } = req.body;
    let index = formaPago.findIndex(x => x.id_pago === id);
    if (index != -1) {
        formaPago[index].detalle_pago = detalle_pago ? detalle_pago : formaPago[index].detalle_pago;

        res.json({ 'Producto Actualizado': formaPago });
    } else {
        res.send('Error');
    }
});

//Que los administradores puedan borrar los medios de pago
app.delete("/borrarformaPagos/admin", logueado, admin, (req, res) => {
    let index = formaPago.findIndex(x => x.id_pago == req.body.id_pago);
    if (index != -1) {
        formaPago.splice(index, 1);
        res.status(200).send('El medio de pago ha sido eliminado correctamente');
    } else {
        res.status(404).send('Error. No se pudo eliminar');
    }
});

// Que los administradores puedan ver los medios de pagos
app.get('/verformaPagos/admin', logueado, admin, (req, res) => {
    res.json(formaPago);
});



app.listen(3000, function () {
    console.log('Escuchando puerto 3000');
});
