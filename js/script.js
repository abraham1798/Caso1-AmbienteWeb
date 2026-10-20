// Lista inicial 
const estudiantes = [
    { nombre: "Maria", apellidos: "Mora Perez", nota: 90 },
    { nombre: "Pedro", apellidos: "Sibaja Lopez", nota: 60 },
    { nombre: "Marco", apellidos: "Rojas Castro", nota: 78 }
];

const formulario = document.getElementById("formulario");
const tabla = document.getElementById("tabla-estudiantes");
const mensaje = document.getElementById("mensaje");

// Muestra todos los estudiantes 
function mostrarEstudiantes() {
    tabla.innerHTML = "";

    for (const estudiante of estudiantes) {
        const fila = document.createElement("tr");

        const celdaNombre = document.createElement("td");
        const celdaApellidos = document.createElement("td");
        const celdaNota = document.createElement("td");

        celdaNombre.textContent = estudiante.nombre;
        celdaApellidos.textContent = estudiante.apellidos;
        celdaNota.textContent = estudiante.nota;

        if (estudiante.nota >= 80) {
            celdaNota.classList.add("nota-alta");
        } else if (estudiante.nota < 65) {
            celdaNota.classList.add("nota-baja");
        }

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellidos);
        fila.appendChild(celdaNota);

        tabla.appendChild(fila);
    }

    actualizarResumen();
}

// Calcula la mayor nota, el promedio y la menor nota.
function actualizarResumen() {
    let mejorEstudiante = estudiantes[0];
    let menorNota = estudiantes[0].nota;
    let suma = 0;

    for (const estudiante of estudiantes) {
        suma += estudiante.nota;

        if (estudiante.nota > mejorEstudiante.nota) {
            mejorEstudiante = estudiante;
        }

        if (estudiante.nota < menorNota) {
            menorNota = estudiante.nota;
        }
    }

    const promedio = suma / estudiantes.length;

    document.getElementById("mejor-estudiante").textContent =
        mejorEstudiante.nombre + " " +
        mejorEstudiante.apellidos + " (" +
        mejorEstudiante.nota + ")";

    document.getElementById("promedio").textContent =
        promedio.toFixed(2);

    document.getElementById("nota-menor").textContent =
        menorNota;
}

// Valida el formulario y agrega un nuevo estudiante.
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const notaIngresada = document.getElementById("nota").value;

    mensaje.className = "mt-3 text-danger";

    if (nombre === "" || apellidos === "" || notaIngresada === "") {
        mensaje.textContent = "Todos los campos son obligatorios.";
        return;
    }

    const nota = Number(notaIngresada);

    if (!Number.isFinite(nota) || nota < 0 || nota > 100) {
        mensaje.textContent = "La nota debe ser un número entre 0 y 100.";
        return;
    }

    estudiantes.push({
        nombre: nombre,
        apellidos: apellidos,
        nota: nota
    });

    mostrarEstudiantes();
    formulario.reset();

    mensaje.className = "mt-3 text-success";
    mensaje.textContent = "Estudiante agregado correctamente.";

    document.getElementById("nombre").focus();
});

// Carga los datos quemados al iniciar la página.
mostrarEstudiantes();v