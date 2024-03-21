window.addEventListener("scroll", function(){
    var nav = document.querySelector("nav");
    nav.classList.toggle("abajo", window.scrollY > 0);
});

document.addEventListener("DOMContentLoaded", function () {
    const formularioStock = document.getElementById("formulario-stock");
    const btnCargar = document.getElementById("btn-cargar");
    const btnActualizar = document.getElementById("btn-actualizar");
    const btnLimpiar = document.getElementById("btn-limpiar");
    const btnSalir = document.getElementById("btn-salir");

    fetch('../json/vinos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(vino => {
                const label = document.createElement("label");
                label.setAttribute("for", vino.nombre.toLowerCase().replace(" ", ""));
                label.textContent = vino.nombre + ":";

                const input = document.createElement("input");
                input.setAttribute("type", "number");
                input.setAttribute("id", vino.nombre.toLowerCase().replace(" ", ""));
                input.setAttribute("name", vino.nombre.toLowerCase().replace(" ", ""));
                input.setAttribute("min", "0");

                const br = document.createElement("br");

                document.querySelector(".left").appendChild(label);
                document.querySelector(".left").appendChild(input);
                document.querySelector(".left").appendChild(br);
            });
        })
        .catch(error => console.error('Error fetching vinos:', error));

    btnCargar.addEventListener("click", cargarStock);
    btnActualizar.addEventListener("click", actualizarStock);
    btnLimpiar.addEventListener("click", limpiarStock);
    btnSalir.addEventListener("click", salir);

    function cargarStock() {
        const vinos = {};
        document.querySelectorAll("input[type='number']").forEach(input => {
            vinos[input.getAttribute("name")] = parseInt(input.value) || 0;
        });
        const stockActual = JSON.parse(localStorage.getItem("stock")) || {};
        for (const vino in vinos) {
            if (vinos.hasOwnProperty(vino)) {
                if (stockActual[vino]) {
                    stockActual[vino] += vinos[vino];
                } else {
                    stockActual[vino] = vinos[vino];
                }
            }
        }

        localStorage.setItem("stock", JSON.stringify(stockActual));
        mostrarResultados(vinos);
        limpiarFormulario();
    }

    function actualizarStock() {
        const stockGuardado = JSON.parse(localStorage.getItem("stock")) || {};
        mostrarResultados(stockGuardado);
        informarFaltantesSobrestock(stockGuardado);
        limpiarFormulario();
    }

    function limpiarStock() {
        localStorage.removeItem("stock");
        limpiarFormulario();
        mostrarResultados({});
    }

    function salir() {
        Swal.fire({
            title: '¡Salir!',
            text: 'Bodega: El Vínculo',
            icon: 'info',
            confirmButtonText: 'OK',
            confirmButtonColor: '#dcdcdc'
        }).then(() => {
            window.location.href = "../index.html";
        });
    }

    function limpiarFormulario() {
        document.querySelectorAll("input[type='number']").forEach(input => {
            input.value = "";
        });
    }

    function mostrarResultados(stock) {
        const resultadosDiv = document.getElementById("info-resultados");
        resultadosDiv.innerHTML = "";

        for (const vino in stock) {
            if (stock.hasOwnProperty(vino)) {
                const cantidad = stock[vino];
                const mensaje = `${vino}: ${cantidad} cajas`;
                const p = document.createElement("p");
                p.textContent = mensaje;
                resultadosDiv.appendChild(p);
            }
        }
    }

    function informarFaltantesSobrestock(stock) {
        const resultadosDiv = document.getElementById("info-resultados");
        const sobrestock = [];
        const faltantes = [];

        for (const vino in stock) {
            if (stock.hasOwnProperty(vino)) {
                const cantidad = stock[vino];
                if (cantidad >= 6) {
                    sobrestock.push(vino);
                } else if (cantidad <= 2) {
                    faltantes.push(vino);
                }
            }
        }

        if (sobrestock.length > 0) {
            const sobrestockMensaje = document.createElement("p");
            sobrestockMensaje.textContent = "SobreStock: " + sobrestock.join(", ");
            resultadosDiv.appendChild(sobrestockMensaje);
        }

        if (faltantes.length > 0) {
            const faltantesMensaje = document.createElement("p");
            faltantesMensaje.textContent = "Faltantes: " + faltantes.join(", ");
            resultadosDiv.appendChild(faltantesMensaje);
        }
    }
});


