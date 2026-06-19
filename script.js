document.getElementById("btnIniciar").addEventListener("click", iniciar);

let puntaje = 0;
function iniciar()
{
    document.getElementById("intro").style.display = "none";
    document.getElementById("clock").style.display = "block";
    document.getElementById("game_container").style.display = "flex";
     document.getElementById("postit").style.display = "block"; 
    getTime();
    setInterval(getTime, 1000);


      const checkboxes = document.querySelectorAll("#taskList input[type='checkbox']");
  checkboxes.forEach(chk => {
    chk.addEventListener("change", () => completarTarea(chk));
  });
}

function getTime()
{
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    document.getElementById("clock").textContent = `${horas}:${minutos}:${segundos}`;
}

function completarTarea(chk) {
  const label = chk.parentElement;
  if (chk.checked && !label.classList.contains("completed")) {
    logConsola(`Tarea: ${label.textContent.trim()}. Elige el comando correcto en la consola.`);
    mostrarOpciones(chk.dataset.task, chk, label);
  }
}

function mostrarOpciones(tarea,chk, label) {
  const opcionesDiv = document.getElementById("consoleOptions");
  opcionesDiv.innerHTML = ""; 

  let opciones = [];
  let correcta = "";

  switch (tarea) {
    case "login":
      opciones = ["su - admin", "sudo apt update", "exit"];
      correcta = "su - admin";
      break;

    case "status":
      opciones = ["systemctl status apache2", "service mysql status", "netstat -tulnp"];
      correcta = "systemctl status apache2";
      break;

    case "restart":
      opciones = ["systemctl restart apache2", "systemctl stop apache2", "service nginx restart"];
      correcta = "systemctl restart apache2";
      break;

    case "ports":
      opciones = ["netstat -tulnp | grep apache2", "ls -la", "ps aux"];
      correcta = "netstat -tulnp | grep apache2";
      break;

    case "logs":
      opciones = ["tail -n 5 /var/log/apache2/error.log", "cat /etc/passwd", "systemctl reload apache2"];
      correcta = "tail -n 5 /var/log/apache2/error.log";
      break;
  }

  opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.textContent = opcion;
    btn.addEventListener("click", () => evaluarOpcion(opcion, correcta, chk, label));
    opcionesDiv.appendChild(btn);
  });
}

function evaluarOpcion(opcion, correcta, chk, label) {
  const output = document.getElementById("consoleOutput");

  output.innerHTML = "";

  if (opcion === correcta) {
    output.innerHTML += `<p>$ ${opcion}</p>`;
    output.innerHTML += `<p>Comando ejecutado correctamente</p>`;
    logConsola(`Comando correcto: ${opcion}`);

    label.classList.add("completed");
    puntaje += 10;
    actualizarScore();

    chk.disabled = true;
  } else {
    output.innerHTML += `<p>$ ${opcion}</p>`;
    output.innerHTML += `<p>Error: comando incorrecto</p>`;
    logConsola(`Comando incorrecto: ${opcion}`);

    chk.checked = false;
  }

  document.getElementById("consoleOptions").innerHTML = "";
}



function actualizarScore() {
  document.getElementById("total").textContent = `Puntaje: ${puntaje}`;
    if (puntaje >= 50) {
    const gameContainer = document.getElementById("game_container");
    gameContainer.innerHTML = `
      <div style="text-align:center; color:#00ff00; font-family:monospace; padding:20px;">
        <h1>¡Ganó!</h1>
        <p>Completó todas las tareas, ya puede volver a su casa!</p>
      </div>
    `;
  }
}

function logConsola(mensaje) {
  const output = document.getElementById("consoleOutput");
  const p = document.createElement("p");
  p.textContent = mensaje;
  output.appendChild(p);
}


