const apiUrl = "https://opentdb.com/api.php";

async function obtenerTrivia(c: number, d: string, a: number) {
  const url = `${apiUrl}?amount=${a}&category=${c}&difficulty=${d}`;
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  return datos.results;
}

function infoJugador(e: number) {
  const nombreJugador = prompt(`Jugador ${e}, por favor ingresa tu nombre:`);
    const cantidadPreguntas = prompt(`Jugador ${e}, ingresa el número de preguntas que deseas responder:`);
    const cantidad = cantidadPreguntas ? parseInt(cantidadPreguntas) : 0;
    const dificultad = prompt(`Jugador ${e}, elige la dificultad (easy, medium, hard):`) || "";
    const numeroCategoria = prompt(`Jugador ${e}, elige la categoría (por ejemplo, 15 para juegos de video):`);
    const categoria = numeroCategoria ? parseInt(numeroCategoria) : 0;

    return { nombreJugador: nombreJugador || "", cantidad, dificultad, categoria };
  }

  async function jugarTrivia() {
    const totalJugadores = prompt("Ingresa el número de jugadores:");
    const totalJ = totalJugadores ? parseInt(totalJugadores) : 0;
    const puntuación: { nombreJugador: string; puntaje: number; }[] = [];

    for (let numeroJugador = 1; numeroJugador <= totalJ; numeroJugador++) {
      const informacionJ = await infoJugador(numeroJugador);
      const preguntas = await obtenerTrivia(informacionJ.categoria, informacionJ.dificultad, informacionJ.cantidad);
      let puntaje = 0;

    console.log(`¡Comienza el juego para ${informacionJ.nombreJugador}!\n`);

    for (let i = 0; i < preguntas.length; i++) {
      const pregunta = preguntas[i];
      console.log(`Pregunta ${i + 1}: ${pregunta.question}`);
      pregunta.incorrect_answers.push(pregunta.correct_answer);
      pregunta.incorrect_answers.sort();

      for (let j = 0; j < pregunta.incorrect_answers.length; j++) {
        console.log(`${j + 1}. ${pregunta.incorrect_answers[j]}`);
      }

      let respuestaUsuario: number | null = null;
      while (respuestaUsuario === null) {
        const respuesta = prompt("Respuesta: ");
        if (respuesta !== null) {
          respuestaUsuario = parseInt(respuesta);
        }
      }

      if (pregunta.incorrect_answers[respuestaUsuario - 1] === pregunta.correct_answer) {
        console.log("¡Correcto!\n");
        puntaje++;
      } else {
        console.log(`Respuesta incorrecta. La respuesta correcta es: ${pregunta.correct_answer}\n`);
      }
    }

    console.log(`Juego terminado para ${informacionJ.nombreJugador}. Puntuación final: ${puntaje}/${informacionJ.cantidad}\n`);
    puntuación.push({ nombreJugador: informacionJ.nombreJugador, puntaje });
  }

  puntuación.sort((a, b) => b.puntaje - a.puntaje);
  const ganador = puntuación[0];

  console.log(`¡El ganador es ${ganador.nombreJugador} con una puntuación de ${ganador.puntaje} puntos!`);
}

jugarTrivia();

