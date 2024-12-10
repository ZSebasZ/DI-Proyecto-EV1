//Expresiones regulares para login.html (validaciones)
let regexNombre = /^[a-zA-ZñÑáÁéÉíÍóÓúÚüÜ\s]{1,}$/;
let regexPassword = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ0-9·$%&/().]{8,16}$/;

//Elemento html "numerito" que indica el numero de productos en el carrito
let numeritoProductos = document.querySelector("#numerito")

//Funcion para mostrar errores de validacion en el formulario de login.html
const mostrarError = (idError, mensajeError) => {
    let errorContainer = document.querySelector(idError)
    errorContainer.innerHTML = mensajeError
    if (errorContainer.innerHTML != ""){
        errorContainer.style.display = "block"
    } else {
        errorContainer.style.display = "none"
    }
}

//Funcion para limpiar los campos del formulario y mensajes de error
const limpiarCampos = () => {
    formulario.reset();
    let errors = document.querySelectorAll(".error-message");
    errors.forEach((error) => {
        error.style.display = "none";
    });
}

//Funcion para desplegar y cerrar el menú lateral en pantallas pequeñas
const abrirCerrarMenu = (accion) => {
    let body = document.querySelector("body");
    let menu = document.querySelector(".contenedor .aside-visible");
    let fondo = document.querySelector("#fondoMenuAbierto");
    
    if(accion == "abrir") {
        body.style.position =  "fixed";
        fondo.classList.add("activo")
        menu.style.left = "0";
    } else {
        menu.style.left = "-15rem";
        fondo.classList.remove("activo");
        fondo.style.zIndex = 900;
        setTimeout(() => {
            fondo.style.zIndex = -1000;
        }, 500)
        body.style.position = "static";
    }
}

/*
Funcion que carga el numero total de productos en el carrito
y lo establece en el elemento correspondiente 
usando la variable "numeritoProductos"
*/
const cargarCarrito = () => {
    if(localStorage.getItem("totalProductosCarrito") != null){
        numeritoProductos.textContent = localStorage.getItem("totalProductosCarrito")
        return true;
    } else {
        return false;
    }
}

//Funcion que simula el cierre se sesion limpiado el carrito por completo
const cerrarSesion = () => {
    localStorage.removeItem("carrito");
    localStorage.removeItem("totalProductosCarrito");
    location.assign("./index.html");
}

//Asignacion de evento al boton que abre el menu lateral
let btnOpenMenu = document.querySelector("#open-menu");
btnOpenMenu.addEventListener("click", () => {
    abrirCerrarMenu("abrir")
})

//Asignacion de evento al boton que cierra el menu lateral
let btnCloseMenu = document.querySelector("#close-menu");
btnCloseMenu.addEventListener("click", () => {
    abrirCerrarMenu("cerrar")
});

//Asignacion de evento al titulo de main.html y carrito.html para volver a index.html
//Arroja un error en index.html
let btnVolverAlInicio = document.querySelectorAll(".logo");
btnVolverAlInicio.forEach(btn => {
    btn.addEventListener("click", cerrarSesion);
})