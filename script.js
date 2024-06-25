// script.js

// Funci�n para guardar los �ltimos ganadores en el almacenamiento local
function guardarUltimosGanadores(ganadores) {
    localStorage.setItem('ultimosGanadores', JSON.stringify(ganadores));
}

// Funci�n para obtener los �ltimos ganadores del almacenamiento local
function obtenerUltimosGanadores() {
    const ganadoresGuardados = localStorage.getItem('ultimosGanadores');
    return ganadoresGuardados ? JSON.parse(ganadoresGuardados) : [];
}

// Funci�n para mostrar los �ltimos ganadores en la p�gina
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
        console.error('El formato de los �ltimos ganadores en el almacenamiento local no es un array v�lido.');
    }
}

// Evento cuando se env�a el formulario de sorteo
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
                guardarUltimosGanadores(ganador[key]); // Guardar el �ltimo ganador
            }
        }
    });
    mostrarUltimosGanadores(); // Mostrar los �ltimos ganadores
    confetti(); // Lanzar la animaci�n de confeti
});

// Funci�n para lanzar la animaci�n de confeti
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

// Mostrar los �ltimos ganadores al cargar la p�gina
window.addEventListener('load', mostrarUltimosGanadores);
