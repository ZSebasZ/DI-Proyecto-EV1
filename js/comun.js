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