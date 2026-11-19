"use strict";

/* =====================================================
   PUERTA: la primera pantalla es el inicio de sesión.
   La app solo se ve cuando hay sesión iniciada.
   - Si ya entraste antes en este dispositivo, abre directo
     (Firebase recuerda tu sesión) y sigue sirviendo sin internet.
   - "Cerrar sesión" te devuelve a esta pantalla.
   ===================================================== */

const puertaEl = document.getElementById("gate");
const puertaBtn = document.getElementById("gateBtn");
const puertaRetry = document.getElementById("gateRetry");
const puertaMsg = document.getElementById("gateMsg");
const SESION_KEY = "inglesSesionOk";   // solo una comodidad de pantalla; la seguridad la dan las reglas de Firebase

function puertaAbrir(aviso) {
  document.body.classList.remove("locked");
  document.body.classList.toggle("sin-nube", !!aviso);
  if (aviso) puertaMsg.textContent = aviso;
}

function puertaCerrar(msg, conBoton, conReintento) {
  document.body.classList.add("locked");
  puertaMsg.textContent = msg || "";
  puertaBtn.hidden = !conBoton;
  puertaRetry.hidden = !conReintento;
}

function puertaAplicar(est) {
  const e = (est && est.estado) || "cargando";
  const recuerda = store(SESION_KEY) === true;

  if (e === "dentro") { store(SESION_KEY, true); puertaAbrir(); return; }

  if (e === "sin-config") { puertaAbrir(); return; }   // sin nube configurada: la app funciona en este dispositivo

  if (e === "fuera") {
    store(SESION_KEY, false);
    puertaCerrar(est.mensaje || "", true, false);
    return;
  }

  if (e === "cargando") {
    // Si ya entraste antes, no te hacemos esperar: abre y se confirma en segundo plano
    if (recuerda) { puertaAbrir(); return; }
    puertaCerrar(est.mensaje || "Conectando…", false, false);
    return;
  }

  if (e === "sin-conexion") {
    if (recuerda) { puertaAbrir("Sin conexión: tu avance se guarda en este dispositivo."); return; }
    puertaCerrar("No pude conectar. Revisa tu internet e inténtalo otra vez.", false, true);
  }
}

puertaBtn.addEventListener("click", () => {
  if (window.nube) { puertaMsg.textContent = "Abriendo Google…"; window.nube.entrar(); }
});
puertaRetry.addEventListener("click", () => location.reload());
window.addEventListener("nube-estado", (ev) => puertaAplicar(ev && ev.detail));

// Al abrir: si ya entraste antes en este dispositivo, no mostrar la puerta mientras se confirma
if (store(SESION_KEY) === true) puertaAbrir();
