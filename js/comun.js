let regexNombre = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ]{1,}$/;
let regexPassword = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ0-9·$%&/().]{8,16}$/;
let numeritoProductos = document.querySelector("#numerito")

const mostrarError = (idError, mensajeError) => {
    let errorContainer = document.querySelector(idError)
    errorContainer.innerHTML = mensajeError
    if (errorContainer.innerHTML != ""){
        errorContainer.style.display = "block"
    } else {
        errorContainer.style.display = "none"
    }
}

const limpiarCampos = () => {
    formulario.reset();
    let errors = document.querySelectorAll(".error-message");
    errors.forEach((error) => {
        error.style.display = "none";
    });
}

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

const cargarCarrito = () => {
    if(localStorage.getItem("totalProductosCarrito") != null){
        numeritoProductos.textContent = localStorage.getItem("totalProductosCarrito")
        return true;
    } else {
        return false;
    }
}

const cerrarSesion = () => {
    localStorage.removeItem("carrito");
    localStorage.removeItem("totalProductosCarrito");
    location.assign("./index.html");
}

let btnOpenMenu = document.querySelector("#open-menu");
btnOpenMenu.addEventListener("click", () => {
    abrirCerrarMenu("abrir")
})

let btnCloseMenu = document.querySelector("#close-menu");
btnCloseMenu.addEventListener("click", () => {
    abrirCerrarMenu("cerrar")
});

//Arroja un error en index.html
let btnVolverAlInicio = document.querySelectorAll(".logo");
btnVolverAlInicio.forEach(btn => {
    btn.addEventListener("click", cerrarSesion);
})