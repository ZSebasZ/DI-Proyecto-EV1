let regexNombre = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ]{1,}$/;
let regexPassword = /^[a-zA-ZñÑáÁéÉíÍóÓúÚ0-9·$%&/().]{8,16}$/;

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

let btnOpenMenu = document.querySelector("#open-menu");
btnOpenMenu.addEventListener("click", () => {
    abrirCerrarMenu("abrir")
})

let btnCloseMenu = document.querySelector("#close-menu");
btnCloseMenu.addEventListener("click", () => {
    abrirCerrarMenu("cerrar")
})
