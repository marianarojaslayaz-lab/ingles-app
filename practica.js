"use strict";

/* =====================================================
   PRACTICAR (películas) y DÍA A DÍA: una sola forma de practicar.
   Cada línea tiene: 🔊 escuchar, 🐢 lento y 🎤 hablar,
   y el resultado aparece justo debajo, sin cambiar de pantalla.
   ===================================================== */

/* ---------- Puntajes (se guardan juntos, para el avance y la nube) ---------- */
function leerPuntaje(clave) { return (store("inglesMejor2") || {})[clave]; }
function guardarPuntaje(clave, score) {
  const all = store("inglesMejor2") || {};
  if (all[clave] == null || score > all[clave]) { all[clave] = score; store("inglesMejor2", all); }
}

/* ---------- Lectura en voz alta de una o varias líneas ---------- */
function limpiarResaltado() {
  document.querySelectorAll(".pl.playing").forEach(r => r.classList.remove("playing"));
  document.querySelectorAll(".pl .phrase span.now").forEach(sp => sp.classList.remove("now"));
}

function reproducir(lineas, rate) {
  markPracticed();
  const token = ++playToken;
  limpiarResaltado();
  const paso = (k) => {
    if (token !== playToken) return;
    if (k >= lineas.length) { limpiarResaltado(); return; }
    const pl = lineas[k];
    limpiarResaltado();
    pl.classList.add("playing");
    speak(pl._texto, rate,
      (charIndex) => {
        if (token !== playToken) return;
        pl.querySelectorAll(".phrase span").forEach(sp =>
          sp.classList.toggle("now", Number(sp.dataset.start) === charIndex));
      },
      () => setTimeout(() => paso(k + 1), 250));
  };
  paso(0);
}

function ponerPalabras(box, texto) {
  // Cada palabra va en su propio <span> para poder resaltarla mientras suena
  box.textContent = "";
  let p = 0;
  texto.split(/(\s+)/).forEach(part => {
    if (/^\s+$/.test(part)) { box.appendChild(document.createTextNode(part)); p += part.length; return; }
    const span = document.createElement("span");
    span.textContent = part;
    span.dataset.start = p;
    box.appendChild(span);
    p += part.length;
  });
}

/* ---------- La línea de práctica (se usa en todas partes) ---------- */
function crearLinea(linea, clave, opts = {}) {
  const pl = el("div", "pl");
  pl._texto = linea.en;
  if (opts.who) pl.appendChild(el("span", "who", opts.who));

  const frase = el("p", "phrase" + (opts.grande ? "" : " small"));
  ponerPalabras(frase, linea.en);
  pl.appendChild(frase);
  if (linea.es) pl.appendChild(el("p", "translation", linea.es));

  const fila = el("div", "row");
  const play = el("button", "btn orange slim", "🔊");
  const slow = el("button", "btn ghost slim", "🐢");
  const mic = el("button", "btn pink slim", "🎤 Hablar");
  [play, slow, mic].forEach(b => (b.type = "button"));
  play.setAttribute("aria-label", "Escuchar");
  slow.setAttribute("aria-label", "Escuchar lento");
  fila.append(play, slow, mic);
  pl.appendChild(fila);

  const estado = el("p", "status");
  pl.appendChild(estado);
  const res = el("div", "clres");
  res.hidden = true;
  pl.appendChild(res);

  const previo = leerPuntaje(clave);
  if (previo != null) estado.textContent = "Tu mejor puntaje aquí: " + previo + "%";

  play.addEventListener("click", () => reproducir([pl], 0.95));
  slow.addEventListener("click", () => reproducir([pl], 0.6));
  mic.addEventListener("click", () => {
    clListen(mic, estado, (alts) => {
      const mejor = alts.reduce((a, b) => evaluate(linea.en, b).score > evaluate(linea.en, a).score ? b : a);
      const { marks, score, expected } = evaluate(linea.en, mejor);
      registrarDebiles(expected, marks);
      guardarPuntaje(clave, score);
      markPracticed();

      res.textContent = "";
      res.hidden = false;
      res.appendChild(el("div", "score " + (score >= 85 ? "good" : score >= 55 ? "mid" : "low"), score + "%"));
      const palabras = el("p", "words");
      linea.en.split(/\s+/).forEach((w, k) => {
        palabras.appendChild(el("span", marks[k] ? "ok" : "bad", w));
        palabras.appendChild(document.createTextNode(" "));
      });
      res.appendChild(palabras);
      res.appendChild(el("p", "heard", "El navegador entendió: “" + mejor + "”"));
      res.appendChild(el("p", "msg",
        score >= 85 ? "🎉 ¡Muy bien!" :
        score >= 55 ? "👍 Casi. Escucha las palabras en rojo y repite." :
                      "💪 No pasa nada. Prueba con 🐢 lento y vuelve a intentar."));
      estado.textContent = "Toca 🎤 para intentar otra vez.";
      if (opts.alPuntuar) opts.alPuntuar(score);
    });
  });
  return pl;
}

/* =====================================================
   PRACTICAR (películas, por género)
   ===================================================== */

let pos = store("inglesPos") || { g: 0, it: 0 };
if (!pos || typeof pos.g !== "number" || !GENRES[pos.g]) pos = { g: 0, it: 0 };
if (pos.it >= GENRES[pos.g].items.length || pos.it < 0) pos.it = 0;

const genre = () => GENRES[pos.g];
const item = () => genre().items[pos.it];
const lineKey = (g, it, l) => `${GENRES[g].id}:${it}:${l}`;
function itemDone(g, it) { return GENRES[g].items[it].lines.every((_, l) => (leerPuntaje(lineKey(g, it, l)) || 0) >= 85); }
function genreDone(g) { return GENRES[g].items.filter((_, i) => itemDone(g, i)).length; }

function barraDeChips(idBarra, lista, activo, hechos, alElegir) {
  const bar = document.getElementById(idBarra);
  bar.textContent = "";
  lista.forEach((g, gi) => {
    const b = el("button", "gchip" + (gi === activo ? " active" : ""), `${g.icon} ${g.name}`);
    b.type = "button";
    const n = hechos(gi);
    if (n > 0) b.appendChild(el("small", "", ` ${n}/${g.items.length}`));
    b.addEventListener("click", () => alElegir(gi));
    bar.appendChild(b);
  });
  const act = bar.querySelector(".active");
  if (act && act.scrollIntoView) act.scrollIntoView({ block: "nearest", inline: "center" });
}

function renderGenres() {
  barraDeChips("genreBar", GENRES, pos.g, genreDone, (gi) => goTo(gi, 0));
}

function marcarContador() {
  const done = itemDone(pos.g, pos.it);
  document.getElementById("sCount").textContent = `${pos.it + 1} / ${genre().items.length}` + (done ? " ✅" : "");
  renderGenres();
}

function renderPracticar(resaltar) {
  const it = item();
  document.getElementById("sMovie").textContent = `${genre().icon} ${genre().name} · ${it.type}`;
  document.getElementById("sTip").textContent = it.tip ? "💡 " + it.tip : "";
  const box = document.getElementById("sLines");
  box.textContent = "";
  const filas = it.lines.map((l, i) => {
    const pl = crearLinea(l, lineKey(pos.g, pos.it, i), { who: l.who, grande: it.lines.length === 1, alPuntuar: marcarContador });
    box.appendChild(pl);
    return pl;
  });
  document.getElementById("sAll").hidden = it.lines.length < 2;
  document.getElementById("sAllSlow").hidden = it.lines.length < 2;
  document.getElementById("sAll")._filas = filas;
  marcarContador();
  if (resaltar != null && filas[resaltar]) {
    filas[resaltar].classList.add("playing");
    filas[resaltar].scrollIntoView({ block: "center" });
  }
}

function goTo(g, it, l) {
  playToken++;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  pos = { g, it };
  store("inglesPos", pos);
  renderPracticar(l);
}

function otroTexto(paso) {
  const n = genre().items.length;
  goTo(pos.g, (pos.it + paso + n) % n);
}

document.getElementById("sAll").addEventListener("click", (e) => reproducir(e.currentTarget._filas, 0.95));
document.getElementById("sAllSlow").addEventListener("click", () => reproducir(document.getElementById("sAll")._filas, 0.6));
document.getElementById("sPrev").addEventListener("click", () => otroTexto(-1));
document.getElementById("sNext").addEventListener("click", () => otroTexto(1));

/* =====================================================
   DÍA A DÍA (oraciones largas, por categoría)
   ===================================================== */

let diaCat = Number(store("inglesDiaCat")) || 0;
if (!DIA[diaCat]) diaCat = 0;

const diaClave = (c, i, parte) => `dia.${DIA[c].id}:${i}:${parte}`;
function diaHecho(c, i) { return (leerPuntaje(diaClave(c, i, "0")) || 0) >= 85; }
function diaTotal(c) { return DIA[c].items.filter((_, i) => diaHecho(c, i)).length; }

// Parte una oración larga en trozos cortos para practicarla de a poco
function partirEnTrozos(texto) {
  const partes = texto.split(/(?<=[,.?!])\s+/);
  const out = [];
  partes.forEach(p => {
    if (out.length && (p.split(/\s+/).length < 3 || out[out.length - 1].split(/\s+/).length < 3)) out[out.length - 1] += " " + p;
    else out.push(p);
  });
  return out;
}

function renderDia() {
  barraDeChips("diaBar", DIA, diaCat, diaTotal, (c) => { diaCat = c; store("inglesDiaCat", c); renderDia(); });
  const cont = document.getElementById("diaList");
  cont.textContent = "";
  DIA[diaCat].items.forEach((it, i) => {
    const card = el("div", "card sent");
    card.appendChild(crearLinea({ en: it.en, es: it.es }, diaClave(diaCat, i, "0"), {
      grande: false,
      alPuntuar: () => { renderDiaChips(); badge.textContent = diaHecho(diaCat, i) ? "✅" : ""; }
    }));
    const badge = el("span", "dia-ok", diaHecho(diaCat, i) ? "✅" : "");
    card.appendChild(badge);
    if (it.tip) card.appendChild(el("p", "tip", "💡 " + it.tip));

    const trozos = partirEnTrozos(it.en);
    if (trozos.length > 1) {
      const toggle = el("button", "btn ghost slim", "✂️ Practicar por trozos");
      toggle.type = "button";
      const caja = el("div", "trozos");
      caja.hidden = true;
      trozos.forEach((t, k) => caja.appendChild(crearLinea({ en: t }, diaClave(diaCat, i, "c" + k), {})));
      toggle.addEventListener("click", () => {
        caja.hidden = !caja.hidden;
        toggle.textContent = caja.hidden ? "✂️ Practicar por trozos" : "Ocultar trozos";
      });
      card.append(toggle, caja);
    }
    cont.appendChild(card);
  });
}
function renderDiaChips() {
  barraDeChips("diaBar", DIA, diaCat, diaTotal, (c) => { diaCat = c; store("inglesDiaCat", c); renderDia(); });
}
function irADia(c, i) {
  diaCat = c; store("inglesDiaCat", c);
  renderDia();
  const card = document.querySelectorAll("#diaList .card")[i];
  if (card) { card.scrollIntoView({ block: "center" }); card.classList.add("destacada"); }
}

window.addEventListener("avance-actualizado", () => { renderPracticar(); renderDia(); });

renderPracticar();
renderDia();
