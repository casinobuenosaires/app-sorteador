// script.js

// Función para guardar los últimos ganadores en el almacenamiento local
function guardarUltimosGanadores(ganadores) {
    localStorage.setItem('ultimosGanadores', JSON.stringify(ganadores));
}

// Función para obtener los últimos ganadores del almacenamiento local
function obtenerUltimosGanadores() {
    const ganadoresGuardados = localStorage.getItem('ultimosGanadores');
    return ganadoresGuardados ? JSON.parse(ganadoresGuardados) : [];
}

// Función para mostrar los últimos ganadores en la página
function mostrarUltimosGanadores() {
    const ultimosGanadores = obtenerUltimosGanadores();
    const ultimosGanadoresList = document.getElementById('ultimosGanadoresList');
    ultimosGanadoresList.innerHTML = '';

    if (Array.isArray(ultimosGanadores)) {
        ultimosGanadores.forEach(ganador => {
            const ganadorDiv = document.createElement('p');
            ganadorDiv.textContent = ganador;
            ultimosGanadoresList.appendChild(ganadorDiv);
        });
    } else {
        console.error('El formato de los últimos ganadores en el almacenamiento local no es un array válido.');
    }
}

// Evento cuando se envía el formulario de sorteo
document.getElementById('sorteoForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const num_ganadores = document.getElementById('num_ganadores').value;
    const response = await fetch(`/sortear?num_ganadores=${num_ganadores}`);
    const ganadores = await response.json();
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '<h2>Ganadores</h2>';
    ganadores.forEach(ganador => {
        for (const key in ganador) {
            if (ganador.hasOwnProperty(key)) {
                const ganadorDiv = document.createElement('div');
                ganadorDiv.className = 'ganador';
                ganadorDiv.textContent = ganador[key];
                resultadosDiv.appendChild(ganadorDiv);
                guardarUltimosGanadores(ganador[key]); // Guardar el último ganador
            }
        }
    });
    mostrarUltimosGanadores(); // Mostrar los últimos ganadores
    confetti(); // Lanzar la animación de confeti
});

// Función para lanzar la animación de confeti
function confetti() {
    const end = Date.now() + 2 * 1000;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Mostrar los últimos ganadores al cargar la página
window.addEventListener('load', mostrarUltimosGanadores);
