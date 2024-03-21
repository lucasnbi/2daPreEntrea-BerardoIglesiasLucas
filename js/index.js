document.addEventListener("DOMContentLoaded", function () {
  Swal.fire({
    title: '¡Bienvenido!',
    text: 'USER: bodega / Pass: vino123',
    icon: 'info',
    confirmButtonText: 'OK',
    confirmButtonColor: '#dcdcdc',
  });
  const USUARIO_VALIDO = "bodega";
  const CONTRASENA_VALIDA = "vino123";

  const formularioLogin = document.getElementById("formulario-login");
  const btnLogin = document.getElementById("btn-login");

  function mostrarAlerta(mensaje, icono) {
    Swal.fire({
      title: '¡Error!',
      text: mensaje,
      icon: icono,
      confirmButtonText: 'Volver a intentar',
      confirmButtonColor: '#dd6b55'
    });
  }
  

  function validarUsuario(usuario, contrasena) {
    return usuario === USUARIO_VALIDO && contrasena === CONTRASENA_VALIDA;
  }

  function limpiarCampos() {
    formularioLogin.reset();
  }

  btnLogin.addEventListener("click", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    if (validarUsuario(usuario, contrasena)) {
      Swal.fire({
        title: "¡Excelente!",
        text: "¡Iniciaste sesión correctamente!",
        icon: "success",
        confirmButtonText: 'Ok',
        confirmButtonColor: '#28a745'
      });
      localStorage.setItem("usuario", usuario);
      setTimeout(() => {
        window.location.href = "../pages/stock.html";
      }, 2000);
    } else {
      mostrarAlerta("Usuario o contraseña incorrectos", "error");
      limpiarCampos();
    }
  });
});


