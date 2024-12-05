document.addEventListener("DOMContentLoaded", () => {
    buscarProductos(url_productos);
    cargarCarrito();
});

const url_productos = "./js/productos.json";
let idFiltroAnterior = "todos";
let numeritoProductos = document.querySelector("#numerito")

const cargarCarrito = () => {
    if(localStorage.getItem("totalProductosCarrito") != null){
        numeritoProductos.textContent = localStorage.getItem("totalProductosCarrito")
    }
}

const agregarProductoCarrito = (idProducto, tituloProducto, precioProducto, imgProducto) => {
    let carrito = [];

    let productoAgregado = {
        id: idProducto,
        info: {
            titulo: tituloProducto,
            img: imgProducto,
            precio: precioProducto,
            cantidad: 1
        }
    };

    if(localStorage.getItem("carrito") == null){
        carrito.push(productoAgregado);

        localStorage.setItem("carrito", JSON.stringify(carrito))
        localStorage.setItem("totalProductosCarrito", 1)
    } else {
        carrito = JSON.parse(localStorage.getItem("carrito"))

        let productoAnadido = carrito.find(producto => producto.id == idProducto)
        if(productoAnadido != undefined) {
            productoAnadido.info.cantidad += 1;
            console.log(carrito);
        } else {
            carrito.push(productoAgregado)
            console.log(carrito);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito))

        let cantidadProductosTotales = parseInt(localStorage.getItem("totalProductosCarrito"))
        cantidadProductosTotales += 1;
        numeritoProductos.textContent = cantidadProductosTotales;
        localStorage.setItem("totalProductosCarrito", cantidadProductosTotales)
    }
}

const agregarProductos = (productos, filtro) => {
    let contenedorProductos = document.querySelector("#contenedor-productos");
    contenedorProductos.innerHTML = "";
    productos.forEach((producto) => {
        if (filtro === "todo" || producto.categoria.id == filtro) {
            let elementoProducto = crearProducto(producto);
            contenedorProductos.appendChild(elementoProducto);
        }
    });
};

const crearProducto = (producto) => {
    let contenedorProducto = document.createElement("div");
    contenedorProducto.className = "producto";

    let productoImagen = document.createElement("img");
    productoImagen.className = "producto-imagen";
    productoImagen.src = producto.imagen;
    productoImagen.alt = `Imagen ${producto.titulo.toLowerCase()}`;

    let productoDetalles = document.createElement("div");
    productoDetalles.className = "producto-detalles";

    let productoTitulo = document.createElement("h3");
    productoTitulo.className = "producto-titulo";
    productoTitulo.textContent = producto.titulo;

    let productoPrecio = document.createElement("p");
    productoPrecio.className = "producto-precio";
    productoPrecio.textContent = `$${producto.precio}`;

    let productoAgregar = document.createElement("button");
    productoAgregar.className = "producto-agregar";
    productoAgregar.textContent = "Agregar";
    productoAgregar.addEventListener("click", () => {
        agregarProductoCarrito(producto.id, producto.titulo, producto.imagen, producto.precio)
    })

    productoDetalles.appendChild(productoTitulo);
    productoDetalles.appendChild(productoPrecio);
    productoDetalles.appendChild(productoAgregar);

    contenedorProducto.appendChild(productoImagen);
    contenedorProducto.appendChild(productoDetalles);

    return contenedorProducto;
};

const buscarProductos = (url, filtro = "todo") => {
    fetch(url)
        .then((res) => {
            //console.log(res);
            return res.json();
        })
        .then((data) => {
            console.log(data);
            agregarProductos(data, filtro)
        });
};

const actualizarFiltroActivo = (nuevoFiltro) => {
    if (idFiltroAnterior != nuevoFiltro) {
        let filtroAnterior = document.getElementById(idFiltroAnterior);
        filtroAnterior.classList.remove("active");
        
        let filtroNuevo = document.getElementById(nuevoFiltro);
        filtroNuevo.classList.add("active");
        
        idFiltroAnterior = nuevoFiltro;
    }

    //Cerrar menu lateral cuando se filtra
    /*
    if(document.querySelector("#fondoMenuAbierto").classList.contains("activo")){
        abrirCerrarMenu("cerrar");
    }
    */
};

let btnFiltroTodos = document.querySelector("#todos");
btnFiltroTodos.addEventListener("click", () => {
    buscarProductos(url_productos);
    actualizarFiltroActivo("todos");
})

let btnFiltroMoviles = document.querySelector("#moviles");
btnFiltroMoviles.addEventListener("click", () => {
    buscarProductos(url_productos, "moviles");
    actualizarFiltroActivo("moviles");
})

let btnFiltroPortatiles = document.querySelector("#portatiles");
btnFiltroPortatiles.addEventListener("click", () => {
    buscarProductos(url_productos, "portatiles");
    actualizarFiltroActivo("portatiles");
})

let btnFiltroTelevisores = document.querySelector("#televisiones");
btnFiltroTelevisores.addEventListener("click", () => {
    buscarProductos(url_productos, "televisiones");
    actualizarFiltroActivo("televisiones");
})