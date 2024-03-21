
const STOCK = {
    "Pinot noir": 12,
    "Malbec": 5,
    "Cabernet Franc": 15,
  };

  function validarUsuario(USUARIO, CONTRASEÑA) {
    return USUARIO === "bodegaEV" && CONTRASEÑA === "vino123";
  }

  function consultarStock(varietal) {
    return STOCK[varietal];
  }

  function imprimirStock(varietal, STOCK) {
    if (STOCK <= 5) {
      console.log("ATENCIÓN: Queda menos de una caja del varietal " + varietal + ".");
    }
    if (varietal === "") {
      console.log("Ingrese un varietal válido.");
    } else {
      console.log("El stock del varietal " + varietal + " es de " + STOCK + " botellas.");
    }
  }
  
  function BodegaEV() {
    const USUARIO = prompt("Ingrese su usuario: ");
    const CONTRASEÑA = prompt("Ingrese su contraseña: ");
  
    if (validarUsuario(USUARIO, CONTRASEÑA)) {
      console.log("Bienvenido al sistema de stock de Bodega El Vínculo");
      var varietal = "";
      while (varietal !== "salir") {
        varietal = prompt("Ingrese el varietal (Pinot noir, Malbec o Cabernet Franc) o 'salir' para finalizar: ");
  
        const STOCK = consultarStock(varietal);
        if (varietal !== "salir") {
          imprimirStock(varietal, STOCK);
        } else {
          break;
        }
      }
    } else {
      console.log("Usuario o contraseña incorrecto");
    }
  }

  BodegaEV();
  