// main.js - Simulador Entregable1
// Autor: Estudiante
// Archivo JS referenciado desde index.html

// CONSTANTES
const MAX_ROUNDS = 20; // máximo permitido
const BASE_SCORE = 5;

// VARIABLES Y ARRAYS
let playerName = "";
let rounds = 0;
let scores = []; // almacenará la puntuación por ronda
let totalScore = 0;

// función 1: pedirDatosEntrada (entrada de datos)
function pedirDatosEntrada() {
    // pedir nombre
    playerName = prompt("Ingrese su nombre (ej: Laura):", "Jugador");
    if (!playerName || playerName.trim() === "") {
        playerName = "Jugador Anónimo";
    }
    console.log("Nombre registrado:", playerName);

    // pedir número de rondas (validar con ciclo)
    let entrada = prompt("¿Cuántas rondas querés jugar? (número entero, máximo " + MAX_ROUNDS + ")", "3");
    rounds = Number(entrada);
    if (!Number.isInteger(rounds) || rounds <= 0) {
        console.warn("Entrada inválida para rondas. Se asignará 3 rondas por defecto.");
        rounds = 3;
    }
    if (rounds > MAX_ROUNDS) {
        alert("El número solicitado supera el máximo de " + MAX_ROUNDS + ". Se ajustará al máximo.");
        rounds = MAX_ROUNDS;
    }
    console.log("Rondas a jugar:", rounds);
}

// función 2: procesarRondas (procesamiento: lógica con bucles y condicionales)
function procesarRondas() {
    console.log("--- Inicio del procesamiento de rondas ---");
    // array con posibles eventos (ejemplo de uso de arrays)
    const eventos = ["Tesoro", "Trampa", "Enigma", "Aliado"];
    // usamos un for para iterar tantas rondas como el usuario definió
    for (let i = 0; i < rounds; i++) {
        console.log("Ronda", i + 1);

        // seleccionar evento aleatorio
        let idx = Math.floor(Math.random() * eventos.length);
        let evento = eventos[idx];

        // decisión del usuario: confirm (true = acepta, false = rechaza)
        let decision = confirm("Ronda " + (i + 1) + ": apareció '" + evento + "'. ¿Querés interactuar con él/ella? (Aceptar = sí, Cancelar = no)");

        // lógica condicional para calcular puntos
        let puntosObtenidos = 0;
        if (decision) {
            // caso en que interactúa: más riesgo, más recompensa
            switch (evento) {
                case "Tesoro":
                    puntosObtenidos = BASE_SCORE + Math.floor(Math.random() * 10) + 5; // bonus
                    break;
                case "Trampa":
                    puntosObtenidos = - (Math.floor(Math.random() * 8) + 1); // penalidad
                    break;
                case "Enigma":
                    // ejercicio de condicionales y prompt
                    let respuesta = prompt("Resolvé este enigma (ejemplo): ¿Cuánto es 2+2? (escribí el número)");
                    if (respuesta !== null && Number(respuesta) === 4) {
                        puntosObtenidos = BASE_SCORE + 3;
                    } else {
                        puntosObtenidos = 0;
                    }
                    break;
                case "Aliado":
                    puntosObtenidos = BASE_SCORE + 2;
                    break;
                default:
                    puntosObtenidos = BASE_SCORE;
            }
        } else {
            // decide no interactuar: recibe puntos seguros pero bajos
            puntosObtenidos = Math.max(1, Math.floor(BASE_SCORE / 2));
        }

        // almacenar y acumular
        scores.push(puntosObtenidos);
        totalScore += puntosObtenidos;

        // salida intermedia por consola
        console.log("Evento:", evento, "| Decisión:", decision ? "Interactuó" : "No interactuó", "| Puntos de esta ronda:", puntosObtenidos);
    }
    console.log("--- Fin del procesamiento de rondas ---");
}

// función 3: mostrarResultados (mostrar resultados en consola y alert)
function mostrarResultados() {
    console.log("=== Resultados finales para", playerName, "===");
    for (let i = 0; i < scores.length; i++) {
        console.log("Ronda " + (i + 1) + ": " + scores[i] + " puntos");
    }
    console.log("Puntuación total:", totalScore);

    // crear mensaje concatenado con saltos de línea
    let mensaje = "Jugador: " + playerName + "\n";
    mensaje += "Rondas jugadas: " + rounds + "\n";
    mensaje += "Puntuación total: " + totalScore + "\n\n";
    mensaje += "Detalle por ronda:\n";
    for (let i = 0; i < scores.length; i++) {
        mensaje += "Ronda " + (i + 1) + ": " + scores[i] + " pts\n";
    }

    // alert con el mensaje final (entrada/salida concatenada con variables)
    alert(mensaje);
}

// función adicional: reiniciar simulador (muestra uso de constantes/arrays y reasignaciones)
function reiniciarSimulador() {
    scores = [];
    totalScore = 0;
    console.clear();
    console.log("Simulador reiniciado.");
}

// llamadas / invocaciones principales
(function ejecutarSimulador() {
    console.log("Simulador: Aventura de Puntuación - Iniciando...");
    alert("Bienvenido al simulador. La interacción principal será en la Consola de JavaScript.");
    pedirDatosEntrada();
    let empezar = confirm("Listo " + playerName + "? ¿Querés comenzar el simulador ahora?");
    if (empezar) {
        procesarRondas();
        mostrarResultados();
    } else {
        console.log("El usuario decidió no comenzar. Se puede reiniciar más tarde.");
    }

    // ejemplo de reinicio: preguntar si quiere revisar otra vez
    let repetir = confirm("¿Querés jugar otra vez (reiniciar el simulador)?");
    if (repetir) {
        reiniciarSimulador();
        // llamar de nuevo — demostración de invocación de funciones
        pedirDatosEntrada();
        procesarRondas();
        mostrarResultados();
    } else {
        console.log("Fin de la ejecución. Gracias por usar el simulador.");
    }
})();
