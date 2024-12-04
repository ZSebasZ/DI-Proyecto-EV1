const validarNombre = () => {
    let nombre = inputNombre.value.trim();
    if (nombre.length == 0) {
        mostrarError("#error-nombre", "Nombre obligatorio.")
        return false;
    } else if (!regexNombre.test(nombre)) {
        mostrarError("#error-nombre", "Nombre inválido.")
        return false;
    } else if(nombre.length > 20) {
        mostrarError("#error-nombre", "El nombre no puede tener más de 20 caracteres")
        return false;
    }else {
        mostrarError("#error-nombre","")
        return true;
    }
}

const validarPassword = () => {
    let password = inputPassword.value.trim();
    if (password.length == 0) {
        mostrarError("#error-password", "La contraseña es obligatoria.")
        return false;
    } else if (!regexPassword.test(password)) {
        mostrarError("#error-password", "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y los caracteres ·$%&/().")
        return false;
    } else {
        mostrarError("#error-password","")
        return true;
    }
}

let formulario = document.querySelector("#formulario")
formulario.addEventListener("submit", (event) => {
    if (!validarNombre() || !validarPassword()) {
        event.preventDefault();
    }
});

let inputNombre = document.querySelector("#nombre");
inputNombre.addEventListener("blur", validarNombre);

let inputPassword = document.querySelector("#password");
inputPassword.addEventListener("blur", validarPassword);

let inputLimpiar = document.querySelector("#limpiar");
inputLimpiar.addEventListener("click", limpiarCampos);