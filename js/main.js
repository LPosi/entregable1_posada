const MAX_ROUNDS = 20;
const BASE_SCORE = 5;

let playerName = "";
let rounds = 0;
let scores = [];
let totalScore = 0;

function pedirDatosEntrada() {
  playerName = prompt("Ingrese su nombre (ej: Laura):", "Jugador");
  if (!playerName || playerName.trim() === "") {
    playerName = "Jugador Anónimo";
  }
  console.log("Nombre registrado:", playerName);

  let entrada = prompt(
    "¿Cuántas rondas querés jugar? (número entero, máximo " + MAX_ROUNDS + ")",
    "3"
  );
  rounds = Number(entrada);
  if (!Number.isInteger(rounds) || rounds <= 0) {
    console.warn(
      "Entrada inválida para rondas. Se asignará 3 rondas por defecto."
    );
    rounds = 3;
  }
  if (rounds > MAX_ROUNDS) {
    alert(
      "El número solicitado supera el máximo de " +
        MAX_ROUNDS +
        ". Se ajustará al máximo."
    );
    rounds = MAX_ROUNDS;
  }
  console.log("Rondas a jugar:", rounds);
}

function procesarRondas() {
  console.log("--- Inicio del procesamiento de rondas ---");
  const eventos = ["Tesoro", "Trampa", "Enigma", "Aliado"];
  for (let i = 0; i < rounds; i++) {
    console.log("Ronda", i + 1);

    let idx = Math.floor(Math.random() * eventos.length);
    let evento = eventos[idx];

    let decision = confirm(
      "Ronda " +
        (i + 1) +
        ": apareció '" +
        evento +
        "'. ¿Querés interactuar con él/ella? (Aceptar = sí, Cancelar = no)"
    );

    let puntosObtenidos = 0;
    if (decision) {
      switch (evento) {
        case "Tesoro":
          puntosObtenidos = BASE_SCORE + Math.floor(Math.random() * 10) + 5;
          break;
        case "Trampa":
          puntosObtenidos = -(Math.floor(Math.random() * 8) + 1);
          break;
        case "Enigma":
          let respuesta = prompt(
            "Resolvé este enigma (ejemplo): ¿Cuánto es 2+2? (escribí el número)"
          );
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
      puntosObtenidos = Math.max(1, Math.floor(BASE_SCORE / 2));
    }

    scores.push(puntosObtenidos);
    totalScore += puntosObtenidos;

    console.log(
      "Evento:",
      evento,
      "| Decisión:",
      decision ? "Interactuó" : "No interactuó",
      "| Puntos de esta ronda:",
      puntosObtenidos
    );
  }
  console.log("--- Fin del procesamiento de rondas ---");
}

function mostrarResultados() {
  console.log("=== Resultados finales para", playerName, "===");
  for (let i = 0; i < scores.length; i++) {
    console.log("Ronda " + (i + 1) + ": " + scores[i] + " puntos");
  }
  console.log("Puntuación total:", totalScore);

  let mensaje = "Jugador: " + playerName + "\n";
  mensaje += "Rondas jugadas: " + rounds + "\n";
  mensaje += "Puntuación total: " + totalScore + "\n\n";
  mensaje += "Detalle por ronda:\n";
  for (let i = 0; i < scores.length; i++) {
    mensaje += "Ronda " + (i + 1) + ": " + scores[i] + " pts\n";
  }

  alert(mensaje);
}

function reiniciarSimulador() {
  scores = [];
  totalScore = 0;
  console.clear();
  console.log("Simulador reiniciado.");
}

(function ejecutarSimulador() {
  console.log("Simulador: Aventura de Puntuación - Iniciando...");
  alert(
    "Bienvenido al simulador. La interacción principal será en la Consola de JavaScript."
  );
  pedirDatosEntrada();
  let empezar = confirm(
    "Listo " + playerName + "? ¿Querés comenzar el simulador ahora?"
  );
  if (empezar) {
    procesarRondas();
    mostrarResultados();
  } else {
    console.log(
      "El usuario decidió no comenzar. Se puede reiniciar más tarde."
    );
  }

  let repetir = confirm("¿Querés jugar otra vez (reiniciar el simulador)?");
  if (repetir) {
    reiniciarSimulador();

    pedirDatosEntrada();
    procesarRondas();
    mostrarResultados();
  } else {
    console.log("Fin de la ejecución. Gracias por usar el simulador.");
  }
})();
