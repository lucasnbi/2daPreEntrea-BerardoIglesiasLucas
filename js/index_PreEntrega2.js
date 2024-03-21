// USUARIO = bodega  CONTRASENA = vino123

const VARIEDADES = ["Pinot noir", "Malbec", "Cabernet Franc"];

function validarUsuario(USUARIO, CONTRASENA) {
  return USUARIO === "bodega" && CONTRASENA === "vino123";
}
function obtenerTotalBotellas(stock) {
  return stock * 6;
}

function BodegaEV() {
  const USUARIO = prompt("Ingrese su usuario:");
  const CONTRASENA = prompt("Ingrese su contraseña:");

  if (validarUsuario(USUARIO, CONTRASENA)) {
    console.log("Sistema de stock de Bodega: El Vínculo");

    const STOCK_CAJAS = {
      "Pinot noir": 2,
      "Malbec": 3,
      "Cabernet Franc": 6,
    };

    const BODEGA = new Bodega(STOCK_CAJAS); //
    let varietal = "";

    while (varietal !== "salir") {
      varietal = prompt("Ingrese el varietal (Pinot noir, Malbec o Cabernet Franc) o salir para finalizar: ");

      if (varietal !== "salir") {
        BODEGA.mostrarStock(varietal);
      }
    }

    BODEGA.listarVarietales();
  } else {
    console.log("Usuario o contraseña incorrectos");
  }
}

function Bodega(STOCK_CAJAS) { // porque me la opcion de la funcion? VER
  this.STOCK_CAJAS = STOCK_CAJAS;

  this.mostrarStock = function(varietal) {
    const STOCK = this.STOCK_CAJAS[varietal];
    const TOTAL_BOTELLAS = obtenerTotalBotellas(STOCK);

    if (STOCK <= 1) {
      console.log(`ATENCIÓN: Queda menos de una caja del varietal ${varietal}.`);
    }

    if (varietal === "") {
      console.log("Ingresar un varietal válido.");
    } else {
      console.log(`El stock del varietal ${varietal} es de ${TOTAL_BOTELLAS} botellas.`);
      console.log(`. Stock en bodega: ${STOCK} cajas.`);

      if (STOCK > 4) {
        const sobrestock = STOCK - 4;
        const totalBotellasSobrestock = sobrestock * 6;
        console.log(`. Sobrestock: ${sobrestock} cajas (${totalBotellasSobrestock} botellas).`);
      }
    }
  };

  this.listarVarietales = function() {
    let totalBotellas = 0;

    console.log("LISTADO DE VARIETALES EN BODEGA:");
    for (const varietal of VARIEDADES) {
      totalBotellas += obtenerTotalBotellas(this.STOCK_CAJAS[varietal]); // Acceder a STOCK_CAJAS directamente
      console.log(`. ${varietal}: ${obtenerTotalBotellas(this.STOCK_CAJAS[varietal])} botellas.`);
    }
    console.log(`TOTAL de botellas en bodega: ${totalBotellas}`);
  };
}

BodegaEV();


window.addEventListener("scroll", function(){
  var nav = document.querySelector ("nav");
  nav.classList.toggle("abajo",window.scrollY>0);
})

