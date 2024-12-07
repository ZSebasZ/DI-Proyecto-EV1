/*
Asignacion de evento al documento para que cuando cargue todo,
cargue los productos del carrito y cargue el numero de productos que tiene en el carrito
*/
document.addEventListener("DOMContentLoaded", () => {
    let hayProductos = cargarCarrito();
    if(hayProductos == false) {
        document.querySelector("#carrito-productos").style.display = "none";
        document.querySelector("#carrito-vacio").style.display = "block";
    } else {
        cargarProductosCarrito()
    }
});

//Variable que obtiene los productos segun el localStorage
let carritoCompra = JSON.parse(localStorage.getItem("carrito"))

/*
Funcion para comprar o eliminar el producto,
pero como es una simulacion siempre se va a eliminar,
lo unico que cambia es el mensaje de alerta y
el mensaje que se muestra si compra o elimina
el unico producto que hay en el carrito
*/
const comprarEliminarProducto = (accion, idProducto) => {
    let mensaje = "";
    if(accion == "comprar") {
        mensaje = "¿Quieres comprar el producto?"
    } else {
        mensaje = "¿Quieres eliminar el producto del carrito?"
    }

    let opcion = confirm(mensaje);

    if(opcion) {
        let totalPrecio = document.querySelector("#Total");
        let productoAComprarEliminar = carritoCompra.find(producto => producto.id == idProducto);
        let productosCarrito = localStorage.getItem("totalProductosCarrito") - productoAComprarEliminar.info.cantidad;
        let nuevoCarritoCompra = carritoCompra.filter(producto => producto.id != idProducto);
        let contenedorProductos = document.querySelector("#carrito-productos");
        let contenedorCarritoAcciones = document.querySelector("#carrito-acciones");

        totalPrecio.textContent = `$${parseInt(totalPrecio.textContent.substring(1,)) - (productoAComprarEliminar.info.cantidad * productoAComprarEliminar.info.precio)}`

        localStorage.setItem("carrito", JSON.stringify(nuevoCarritoCompra))
        localStorage.setItem("totalProductosCarrito", productosCarrito)
        carritoCompra = JSON.parse(localStorage.getItem("carrito"))
        document.querySelector(`#${idProducto}`).remove();
        contenedorCarritoAcciones.style.gridRow = contenedorProductos.children.length
        numeritoProductos.textContent = localStorage.getItem("totalProductosCarrito");

        if(nuevoCarritoCompra.length == 0) {
            localStorage.removeItem("carrito");
            localStorage.removeItem("totalProductosCarrito");
            document.querySelector("#carrito-productos").style.display = "none";
            if(accion == "comprar") {
                document.querySelector("#carrito-comprado").style.display = "block";
            } else {
                document.querySelector("#carrito-vacio").style.display = "block";
            }
        }
        
    }
}

//Funcion que carga todos los productos del carrito y los muestra
const cargarProductosCarrito = () => {
    let contenedorProductos = document.querySelector("#carrito-productos");
    let contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
    let totalPrecio = document.querySelector("#Total");
    let sumTotalPrecio = 0

    carritoCompra.forEach(producto => {
        let contenedorCarritoProducto = document.createElement("div");
        contenedorCarritoProducto.className = "carrito-producto";
        contenedorCarritoProducto.id = producto.id;

        let productoImagen = document.createElement("img");
        productoImagen.className = "carrito-producto-imagen";
        productoImagen.src = producto.info.img;
        productoImagen.alt = `Imagen ${producto.info.titulo.toLowerCase()}`;

        let contenedorProductoTitulo = document.createElement("div");
        contenedorProductoTitulo.classList.add("carrito-producto-titulo");
        let tituloProducto = document.createElement("small")
        tituloProducto.textContent = "Título";
        let nombreProducto = document.createElement("h3");
        nombreProducto.textContent = producto.info.titulo;
        contenedorProductoTitulo.appendChild(tituloProducto);
        contenedorProductoTitulo.appendChild(nombreProducto);

        let contenedorProductoCantidad = document.createElement("div");
        contenedorProductoCantidad.classList.add("carrito-producto-cantidad");
        let tituloCantidadProducto = document.createElement("small")
        tituloCantidadProducto.textContent = "Cantidad";
        let cantidadProducto = document.createElement("p");
        cantidadProducto.textContent = producto.info.cantidad;
        contenedorProductoCantidad.appendChild(tituloCantidadProducto);
        contenedorProductoCantidad.appendChild(cantidadProducto);

        let contenedorProductoPrecio = document.createElement("div");
        contenedorProductoPrecio.classList.add("carrito-producto-precio");
        let tituloPrecioProducto = document.createElement("small")
        tituloPrecioProducto.textContent = "Precio";
        let precioProducto = document.createElement("p");
        precioProducto.textContent = `$${producto.info.precio}`;
        contenedorProductoPrecio.appendChild(tituloPrecioProducto);
        contenedorProductoPrecio.appendChild(precioProducto);

        let contenedorProductoSubtotal = document.createElement("div");
        contenedorProductoSubtotal.classList.add("carrito-producto-subtotal");
        let tituloSubtotalProducto = document.createElement("small")
        tituloSubtotalProducto.textContent = "Subtotal";
        let subtotalProducto = document.createElement("p");
        subtotalProducto.textContent = `$${producto.info.precio * producto.info.cantidad}`;
        sumTotalPrecio += producto.info.precio * producto.info.cantidad;
        contenedorProductoSubtotal.appendChild(tituloSubtotalProducto);
        contenedorProductoSubtotal.appendChild(subtotalProducto);

        let btnComprar = document.createElement("button");
        btnComprar.classList.add("carrito-producto-comprar");
        btnComprar.textContent = "Comprar"
        btnComprar.addEventListener("click", () => {
            comprarEliminarProducto("comprar", producto.id)
        })

        let btnEliminar = document.createElement("button");
        btnEliminar.classList.add("carrito-producto-eliminar");
        btnEliminar.textContent = "Eliminar"
        btnEliminar.addEventListener("click", () => {
            comprarEliminarProducto("eliminar", producto.id)
        })

        contenedorCarritoProducto.appendChild(productoImagen);
        contenedorCarritoProducto.appendChild(contenedorProductoTitulo);
        contenedorCarritoProducto.appendChild(contenedorProductoCantidad);
        contenedorCarritoProducto.appendChild(contenedorProductoPrecio);
        contenedorCarritoProducto.appendChild(contenedorProductoSubtotal);
        contenedorCarritoProducto.appendChild(btnComprar);
        contenedorCarritoProducto.appendChild(btnEliminar);

        contenedorProductos.appendChild(contenedorCarritoProducto);
    });
    totalPrecio.textContent = `$${sumTotalPrecio}`;
    contenedorCarritoAcciones.style.gridRow = contenedorProductos.children.length
    contenedorCarritoAcciones.style.display = "flex";
}

//Funcion para vaciar todo el carrito
const vaciarCarrito = () => {
    let vaciar = confirm("¿Estas seguro que quieres eliminar todos los productor del carrito?")
    if(vaciar) {
        borrarAlEliminarComprarCarrito("#carrito-vacio");
    }
}

//Funcion que simula comprar comprar todo el carrito
const comprarTodoCarrito = () => {
    let comprar = confirm(`¿Estas seguro que quieres comprar todos los productos por un total de ${document.querySelector("#Total").textContent}?`) 
    if(comprar) {
        borrarAlEliminarComprarCarrito("#carrito-comprado");
    }
}

/*
Funcion comun para vaciarCarrito() y comprarTodoCarrito()
que simula vaciar o comprar el carrito, eliminando las variables del localStorage
*/
const borrarAlEliminarComprarCarrito = (idMensaje) => {
    localStorage.removeItem("carrito");
        localStorage.removeItem("totalProductosCarrito");
        document.querySelector("#carrito-productos").style.display = "none";
        document.querySelector(idMensaje).style.display = "block";
        numeritoProductos.textContent = 0;
}

//Asignacion de evento al boton de vaciar carrito
let btnVaciarCarrito = document.querySelector(".carrito-acciones-vaciar");
btnVaciarCarrito.addEventListener("click", vaciarCarrito);

//Asignacion de evento al boton de comprar todo el carrito
let btnComprarTodoCarrito = document.querySelector(".carrito-acciones-comprar");
btnComprarTodoCarrito.addEventListener("click", comprarTodoCarrito);