"use strict";

/* =====================================================
   AVANCE: qué datos se guardan y cómo se mezclan con la nube.
   Datos: puntajes de Escenas, puntajes de Clases, días de práctica
   y palabras que cuestan (para la sección "Para mejorar").
   ===================================================== */

const AVANCE_KEYS = {
  mejor: "inglesMejor2",
  clases: "inglesClases",
  dias: "inglesDias",
  debiles: "inglesDebiles"
};
let avanceAplicando = false;   // true mientras la app misma escribe, para no avisar a la nube

function leerAvance() {
  return {
    mejor: store(AVANCE_KEYS.mejor) || {},
    clases: store(AVANCE_KEYS.clases) || {},
    dias: store(AVANCE_KEYS.dias) || [],
    debiles: store(AVANCE_KEYS.debiles) || {}
  };
}

// Junta lo del celular con lo de la nube sin perder nada:
// puntajes = el más alto, días = todos, palabras que cuestan = el mayor conteo.
function mezclarAvance(a, b) {
  a = a || {}; b = b || {};
  const maxMapa = (x = {}, y = {}) => {
    const out = { ...x };
    Object.keys(y).forEach(k => { out[k] = Math.max(out[k] || 0, y[k] || 0); });
    return out;
  };
  const clases = {};
  const temas = new Set([...Object.keys(a.clases || {}), ...Object.keys(b.clases || {})]);
  temas.forEach(t => { clases[t] = maxMapa((a.clases || {})[t], (b.clases || {})[t]); });
  return {
    mejor: maxMapa(a.mejor, b.mejor),
    clases,
    dias: Array.from(new Set([...(a.dias || []), ...(b.dias || [])])).sort(),
    debiles: maxMapa(a.debiles, b.debiles)
  };
}

function guardarAvanceLocal(av) {
  avanceAplicando = true;
  try {
    Object.keys(AVANCE_KEYS).forEach(k => store(AVANCE_KEYS[k], av[k]));
  } finally { avanceAplicando = false; }
}

// La función store() de app.js llama a esto cada vez que se guarda algo
window.onLocalSave = function (key) {
  if (avanceAplicando) return;
  if (Object.values(AVANCE_KEYS).includes(key) && typeof window.nubeProgramarEnvio === "function") {
    window.nubeProgramarEnvio();
  }
};
