"use strict";

/* =====================================================
   PESTAÑA "YO": cuenta (entrar / salir) y sección "Para mejorar"
   ===================================================== */

const yoBox = document.getElementById("yoBox");

function yoEl(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

/* ---------- Tarjeta de cuenta ---------- */
function yoRenderCuenta(est) {
  const card = yoEl("div", "card cuenta");
  const e = est || window.nubeEstado || { estado: "cargando" };

  if (e.estado === "dentro") {
    card.appendChild(yoEl("h3", "", "☁️ Hola, " + (e.nombre || "👋")));
    card.appendChild(yoEl("p", "translation", e.mensaje || "Tu avance se guarda en la nube y lo ves en cualquier dispositivo."));
    const out = yoEl("button", "btn ghost wide", "Cerrar sesión");
    out.type = "button";
    out.addEventListener("click", () => window.nube && window.nube.salir());
    card.appendChild(out);
  } else if (e.estado === "fuera") {
    card.appendChild(yoEl("h3", "", "☁️ Guardar mi avance"));
    card.appendChild(yoEl("p", "translation", e.mensaje || "Entra con tu cuenta de Google para no perder tu avance y verlo en cualquier dispositivo."));
    const inn = yoEl("button", "btn teal wide", "Entrar con Google");
    inn.type = "button";
    inn.addEventListener("click", () => window.nube && window.nube.entrar());
    card.appendChild(inn);
  } else {
    const msgs = {
      "sin-config": "La nube todavía no está activada. Por ahora tu avance se guarda solo en este dispositivo.",
      "sin-conexion": "No pude conectar con la nube. Revisa tu internet. Tu avance se sigue guardando en este dispositivo.",
      "cargando": "Conectando con la nube…"
    };
    card.appendChild(yoEl("h3", "", "☁️ Guardar mi avance"));
    card.appendChild(yoEl("p", "translation", e.mensaje || msgs[e.estado] || msgs["sin-config"]));
  }
  return card;
}

/* ---------- Para mejorar ---------- */
function yoPalabras() {
  const deb = store("inglesDebiles") || {};
  return Object.keys(deb).map(w => ({ w, n: deb[w] })).sort((a, b) => b.n - a.n || a.w.localeCompare(b.w)).slice(0, 12);
}

function yoFrases() {
  const out = [];
  const mejor = store("inglesMejor2") || {};
  Object.keys(mejor).forEach(k => {
    if (mejor[k] >= 85) return;
    const [gid, it, l] = k.split(":");
    const gi = GENRES.findIndex(g => g.id === gid);
    const linea = gi >= 0 && GENRES[gi].items[Number(it)] && GENRES[gi].items[Number(it)].lines[Number(l)];
    if (!linea) return;
    out.push({ en: linea.en, score: mejor[k], origen: GENRES[gi].icon + " " + GENRES[gi].name,
      ir: () => { goTo(gi, Number(it), Number(l)); showView("speak"); } });
  });
  const clases = store("inglesClases") || {};
  Object.keys(clases).forEach(tid => {
    const tema = CLASES.find(t => t.id === tid);
    if (!tema) return;
    Object.keys(clases[tid]).forEach(sk => {
      const score = clases[tid][sk];
      if (score >= 85 || sk[0] !== "s") return;
      const frase = tema.sentences[Number(sk.slice(1))];
      if (!frase) return;
      out.push({ en: frase.en, score, origen: "🎓 " + tema.title,
        ir: () => { showView("clases"); clRenderLesson(tid); } });
    });
  });
  return out.sort((a, b) => a.score - b.score).slice(0, 8);
}

function yoRenderMejorar() {
  const wrap = yoEl("div", "mejorar");
  wrap.appendChild(yoEl("h3", "h3", "🎯 Para mejorar"));

  const palabras = yoPalabras();
  const frases = yoFrases();
  if (palabras.length === 0 && frases.length === 0) {
    wrap.appendChild(yoEl("p", "cl-intro", "Aún no hay nada por mejorar. Practica en Escenas o en Clases con el micrófono y aquí aparecerán las palabras y frases que más te cuestan."));
    return wrap;
  }

  if (palabras.length) {
    wrap.appendChild(yoEl("p", "cl-intro", "Palabras que más te cuestan. Toca una para oírla, y repítela:"));
    const chips = yoEl("div", "wchips");
    palabras.forEach(({ w, n }) => {
      const b = yoEl("button", "wchip", w);
      b.type = "button";
      b.appendChild(yoEl("small", "", " ×" + n));
      b.addEventListener("click", () => { markPracticed(); speak(w, 0.7); });
      chips.appendChild(b);
    });
    wrap.appendChild(chips);
  }

  if (frases.length) {
    wrap.appendChild(yoEl("p", "cl-intro", "Frases con menor puntaje:"));
    frases.forEach(f => {
      const row = yoEl("div", "card weak");
      const info = yoEl("div", "winfo");
      info.appendChild(yoEl("b", "", f.en));
      info.appendChild(yoEl("small", "", f.origen + " · " + f.score + "%"));
      const go = yoEl("button", "btn pink", "Practicar");
      go.type = "button";
      go.addEventListener("click", f.ir);
      row.append(info, go);
      wrap.appendChild(row);
    });
  }
  return wrap;
}

function yoRender() {
  yoBox.textContent = "";
  yoBox.appendChild(yoRenderCuenta());
  yoBox.appendChild(yoRenderMejorar());
}

window.addEventListener("nube-estado", (ev) => {
  if (ev && ev.detail) window.nubeEstado = ev.detail;
  yoRender();
});
// Si la parte de la nube no llega a cargar (sin internet, o abierta desde un archivo), no dejar "Conectando…" para siempre
setTimeout(() => {
  if (!window.nubeEstado) window.dispatchEvent(new CustomEvent("nube-estado", { detail: { estado: "sin-conexion" } }));
}, 4000);
window.addEventListener("avance-actualizado", yoRender);
document.querySelectorAll('.tab[data-view="yo"]').forEach(t => t.addEventListener("click", yoRender));
yoRender();
