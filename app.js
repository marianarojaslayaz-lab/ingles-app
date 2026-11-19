"use strict";

/* =====================================================
   DATOS: (las frases de películas están en peliculas.js)
   Aquí van las palabras y verbos de cada día. Copia una línea para agregar más.
   ===================================================== */



const WORDS = [
  { en: "happy", es: "feliz", ex: "I am happy today.", exEs: "Estoy feliz hoy." },
  { en: "water", es: "agua", ex: "I drink water every day.", exEs: "Bebo agua todos los días." },
  { en: "morning", es: "mañana", ex: "Good morning, my friend!", exEs: "¡Buenos días, amigo!" },
  { en: "tired", es: "cansado", ex: "I am very tired.", exEs: "Estoy muy cansado." },
  { en: "world", es: "mundo", ex: "I love this world.", exEs: "Amo este mundo." },
  { en: "dream", es: "sueño", ex: "I have a big dream.", exEs: "Tengo un gran sueño." },
  { en: "bright", es: "brillante", ex: "The sun is bright.", exEs: "El sol es brillante." },
  { en: "brave", es: "valiente", ex: "You are very brave.", exEs: "Eres muy valiente." },
  { en: "journey", es: "viaje", ex: "This is a long journey.", exEs: "Este es un viaje largo." },
  { en: "story", es: "historia", ex: "Tell me a story.", exEs: "Cuéntame una historia." },
  { en: "secret", es: "secreto", ex: "I have a secret.", exEs: "Tengo un secreto." },
  { en: "strong", es: "fuerte", ex: "He is strong.", exEs: "Él es fuerte." },
  { en: "quiet", es: "callado / tranquilo", ex: "Please, be quiet.", exEs: "Por favor, guarda silencio." },
  { en: "rain", es: "lluvia", ex: "I like the rain.", exEs: "Me gusta la lluvia." },
  { en: "neighbor", es: "vecino", ex: "My neighbor is nice.", exEs: "Mi vecino es amable." },
  { en: "weather", es: "clima", ex: "The weather is great.", exEs: "El clima está genial." },
  { en: "enough", es: "suficiente", ex: "That is enough for me.", exEs: "Eso es suficiente para mí." },
  { en: "hungry", es: "con hambre", ex: "I am hungry now.", exEs: "Tengo hambre ahora." },
  { en: "lucky", es: "afortunado", ex: "I am so lucky.", exEs: "Soy muy afortunado." },
  { en: "late", es: "tarde", ex: "Sorry, I am late.", exEs: "Perdón, llego tarde." },
  { en: "early", es: "temprano", ex: "I wake up early.", exEs: "Me despierto temprano." },
  { en: "kind", es: "amable", ex: "She is very kind.", exEs: "Ella es muy amable." },
  { en: "proud", es: "orgulloso", ex: "I am proud of you.", exEs: "Estoy orgulloso de ti." },
  { en: "careful", es: "cuidadoso", ex: "Be careful, please.", exEs: "Ten cuidado, por favor." }
];

const VERBS = [
  { en: "to go", past: "went", es: "ir", ex: "I go to work by bus.", exEs: "Voy al trabajo en bus." },
  { en: "to speak", past: "spoke", es: "hablar", ex: "I speak English every day.", exEs: "Hablo inglés todos los días." },
  { en: "to want", past: "wanted", es: "querer", ex: "I want some water.", exEs: "Quiero un poco de agua." },
  { en: "to need", past: "needed", es: "necesitar", ex: "I need your help.", exEs: "Necesito tu ayuda." },
  { en: "to find", past: "found", es: "encontrar", ex: "I can find my keys.", exEs: "Puedo encontrar mis llaves." },
  { en: "to feel", past: "felt", es: "sentir", ex: "I feel good today.", exEs: "Me siento bien hoy." },
  { en: "to think", past: "thought", es: "pensar", ex: "I think you are right.", exEs: "Creo que tienes razón." },
  { en: "to know", past: "knew", es: "saber / conocer", ex: "I know this song.", exEs: "Conozco esta canción." },
  { en: "to take", past: "took", es: "tomar / llevar", ex: "Take your time.", exEs: "Tómate tu tiempo." },
  { en: "to give", past: "gave", es: "dar", ex: "Give me a minute.", exEs: "Dame un minuto." },
  { en: "to tell", past: "told", es: "decir / contar", ex: "Tell me the truth.", exEs: "Dime la verdad." },
  { en: "to learn", past: "learned", es: "aprender", ex: "I learn new words daily.", exEs: "Aprendo palabras nuevas a diario." }
];

/* =====================================================
   AYUDAS
   ===================================================== */

const $ = (id) => document.getElementById(id);

function store(key, value) {
  try {
    if (value === undefined) return JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) { /* si el navegador no deja guardar, seguimos sin guardar */ }
  return null;
}

function todayKey(d = new Date()) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/* ---------- Racha de días ---------- */
function markPracticed() {
  const days = store("inglesDias") || [];
  const t = todayKey();
  if (!days.includes(t)) { days.push(t); store("inglesDias", days); }
  renderStreak();
}

function renderStreak() {
  const days = new Set(store("inglesDias") || []);
  let count = 0;
  const d = new Date();
  if (!days.has(todayKey(d))) d.setDate(d.getDate() - 1); // si hoy aún no practicas, cuenta desde ayer
  while (days.has(todayKey(d))) { count++; d.setDate(d.getDate() - 1); }
  $("streakNum").textContent = count;
}

/* ---------- Voz (escuchar) ---------- */
let usVoice = null;
function pickVoice() {
  const voices = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  usVoice = voices.find(v => v.lang === "en-US" && /natural|google|samantha|aaron|siri/i.test(v.name))
         || voices.find(v => v.lang === "en-US")
         || voices.find(v => v.lang.startsWith("en"))
         || null;
}
if ("speechSynthesis" in window) {
  pickVoice();
  speechSynthesis.addEventListener("voiceschanged", pickVoice);
}

function speak(text, rate = 0.95, onWord, onEnd) {
  if (!("speechSynthesis" in window)) {
    alert("Tu navegador no puede leer en voz alta. Prueba con Chrome o Safari.");
    return;
  }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  if (usVoice) u.voice = usVoice;
  u.rate = rate;
  if (onWord) u.onboundary = (e) => { if (e.name === "word") onWord(e.charIndex); };
  if (onEnd) { u.onend = onEnd; u.onerror = onEnd; }
  speechSynthesis.speak(u);
}

/* =====================================================
   FRASES DE PELÍCULAS (datos en peliculas.js)
   Posición actual: género (g), texto (it) y línea (ln)
   ===================================================== */

let pos = store("inglesPos") || { g: 0, it: 0 };
if (!pos || typeof pos.g !== "number" || !GENRES[pos.g]) pos = { g: 0, it: 0 };
if (pos.it >= GENRES[pos.g].items.length || pos.it < 0) pos.it = 0;
let ln = 0;                       // línea actual en la pantalla Pronunciar
let playToken = 0;                // sirve para cortar la lectura si cambias de pantalla

const genre = () => GENRES[pos.g];
const item = () => genre().items[pos.it];
const lineKey = (g, it, l) => `${GENRES[g].id}:${it}:${l}`;

function bestScore(g, it, l) { return (store("inglesMejor2") || {})[lineKey(g, it, l)]; }
function itemDone(g, it) {
  return GENRES[g].items[it].lines.every((_, l) => (bestScore(g, it, l) || 0) >= 85);
}
function genreDone(g) { return GENRES[g].items.filter((_, i) => itemDone(g, i)).length; }

/* =====================================================
   NAVEGACIÓN
   ===================================================== */

function showView(name) {
  playToken++;
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + name));
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.view === name));
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  window.scrollTo(0, 0);
}
document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => showView(t.dataset.view)));

function goTo(g, it, l = 0) {
  playToken++;
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  pos = { g, it };
  ln = l;
  store("inglesPos", pos);
  renderGenres();
  renderShadow();
  renderSpeak();
}

function nextItem(step) {
  const n = genre().items.length;
  goTo(pos.g, (pos.it + step + n) % n, 0);
}

/* =====================================================
   PANTALLA 1: ESCENAS (shadowing)
   ===================================================== */

function renderGenres() {
  const bar = $("genreBar");
  bar.textContent = "";
  GENRES.forEach((g, gi) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "gchip" + (gi === pos.g ? " active" : "");
    b.textContent = `${g.icon} ${g.name}`;
    const done = genreDone(gi);
    if (done > 0) {
      const sm = document.createElement("small");
      sm.textContent = ` ${done}/${g.items.length}`;
      b.appendChild(sm);
    }
    b.addEventListener("click", () => goTo(gi, 0, 0));
    bar.appendChild(b);
  });
  const active = bar.querySelector(".active");
  if (active && active.scrollIntoView) active.scrollIntoView({ block: "nearest", inline: "center" });
}

function fillWords(box, text) {
  // Cada palabra va en su propio <span> para poder resaltarla mientras suena
  box.textContent = "";
  let p = 0;
  text.split(/(\s+)/).forEach(part => {
    if (/^\s+$/.test(part)) { box.appendChild(document.createTextNode(part)); p += part.length; return; }
    const span = document.createElement("span");
    span.textContent = part;
    span.dataset.start = p;
    box.appendChild(span);
    p += part.length;
  });
}

function renderShadow() {
  const it = item();
  $("sMovie").textContent = `${genre().icon} ${genre().name} · ${it.type}`;
  $("sTip").textContent = it.tip ? "💡 " + it.tip : "";
  $("sCount").textContent = `${pos.it + 1} / ${genre().items.length}` + (itemDone(pos.g, pos.it) ? " ✅" : "");

  const box = $("sLines");
  box.textContent = "";
  it.lines.forEach((l, i) => {
    const row = document.createElement("div");
    row.className = "line";
    row.dataset.i = i;
    if (l.who) {
      const who = document.createElement("span");
      who.className = "who";
      who.textContent = l.who;
      row.appendChild(who);
    }
    const body = document.createElement("div");
    body.className = "lbody";
    const en = document.createElement("p");
    en.className = "phrase" + (it.lines.length > 1 ? " small" : "");
    fillWords(en, l.en);
    const es = document.createElement("p");
    es.className = "translation";
    es.textContent = l.es;
    body.append(en, es);
    row.appendChild(body);
    row.addEventListener("click", () => playLines([i], 0.95));
    box.appendChild(row);
  });
  $("sHint").hidden = it.lines.length < 2;
}

function clearHighlights() {
  document.querySelectorAll("#sLines .phrase span").forEach(sp => sp.classList.remove("now"));
  document.querySelectorAll("#sLines .line").forEach(r => r.classList.remove("playing"));
}

// Lee una o varias líneas, una tras otra
function playLines(indexes, rate) {
  markPracticed();
  const token = ++playToken;
  const lines = item().lines;
  clearHighlights();

  const playAt = (k) => {
    if (token !== playToken) return;
    if (k >= indexes.length) { clearHighlights(); return; }
    const i = indexes[k];
    const row = document.querySelector(`#sLines .line[data-i="${i}"]`);
    clearHighlights();
    if (row) row.classList.add("playing");
    speak(lines[i].en, rate,
      (charIndex) => {
        if (token !== playToken || !row) return;
        row.querySelectorAll(".phrase span").forEach(sp =>
          sp.classList.toggle("now", Number(sp.dataset.start) === charIndex));
      },
      () => { setTimeout(() => playAt(k + 1), 250); }
    );
  };
  playAt(0);
}

const allLines = () => item().lines.map((_, i) => i);
$("sPlay").addEventListener("click", () => playLines(allLines(), 0.95));
$("sSlow").addEventListener("click", () => playLines(allLines(), 0.6));
$("sPrev").addEventListener("click", () => nextItem(-1));
$("sNext").addEventListener("click", () => nextItem(1));
$("sGoSpeak").addEventListener("click", () => { ln = 0; renderSpeak(); showView("speak"); });

/* =====================================================
   PANTALLA 2: PRONUNCIACIÓN (línea por línea)
   ===================================================== */

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognizing = false;
let recognition = null;

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9'\s]/g, " ").split(/\s+/).filter(Boolean);
}

const curLine = () => item().lines[ln];

function renderSpeak() {
  const it = item();
  const l = curLine();
  $("pMovie").textContent = `${genre().icon} ${genre().name} · ${it.type}` +
    (it.lines.length > 1 ? ` · línea ${ln + 1}/${it.lines.length}` : "");
  $("pPhrase").textContent = (l.who ? l.who + ": " : "") + l.en;
  $("pEs").textContent = l.es;
  $("pResult").hidden = true;
  $("pStatus").textContent = "Toca el micrófono y di la frase en voz alta.";
  const best = bestScore(pos.g, pos.it, ln);
  if (best != null) $("pStatus").textContent += ` (Tu mejor puntaje aquí: ${best}%)`;
}

// Avanzar o retroceder de línea; al llegar al borde pasa al texto vecino
function stepLine(step) {
  const lines = item().lines;
  const target = ln + step;
  if (target >= 0 && target < lines.length) { ln = target; renderSpeak(); return; }
  const n = genre().items.length;
  const it = (pos.it + step + n) % n;
  const l = step > 0 ? 0 : GENRES[pos.g].items[it].lines.length - 1;
  goTo(pos.g, it, l);
}

function evaluate(expectedText, heardText) {
  const expected = normalize(expectedText);
  const heardWords = normalize(heardText);
  const pool = {};
  heardWords.forEach(w => { pool[w] = (pool[w] || 0) + 1; });

  let okCount = 0;
  const marks = expected.map(w => {
    if (pool[w] > 0) { pool[w]--; okCount++; return true; }
    return false;
  });
  return { marks, expected, score: Math.round((okCount / expected.length) * 100) };
}

function showResult(heardText) {
  const l = curLine();
  const { marks, score } = evaluate(l.en, heardText);

  $("pResult").hidden = false;
  const scoreEl = $("pScore");
  scoreEl.textContent = score + "%";
  scoreEl.className = "score " + (score >= 85 ? "good" : score >= 55 ? "mid" : "low");

  // Palabras de la frase original, verdes o rojas
  const shown = l.en.split(/\s+/);
  const wordsEl = $("pWords");
  wordsEl.textContent = "";
  shown.forEach((w, i) => {
    const span = document.createElement("span");
    span.className = marks[i] ? "ok" : "bad";
    span.textContent = w;
    wordsEl.appendChild(span);
    wordsEl.appendChild(document.createTextNode(" "));
  });

  $("pHeard").textContent = `El navegador entendió: “${heardText}”`;
  $("pMsg").textContent =
      score >= 85 ? "🎉 ¡Excelente! Casi perfecto. Sigue con la siguiente."
    : score >= 55 ? "👍 Vas bien. Escucha otra vez las palabras en rojo y repite."
    :               "💪 No pasa nada, es normal. Usa el botón Lento en Escenas y vuelve a intentar.";

  const all = store("inglesMejor2") || {};
  const k = lineKey(pos.g, pos.it, ln);
  if (all[k] == null || score > all[k]) { all[k] = score; store("inglesMejor2", all); }
  renderGenres();
  markPracticed();
}

function startListening() {
  if (!SR) {
    $("pStatus").textContent = "Tu navegador no tiene reconocimiento de voz. Abre la app en Chrome (Android) o Safari (iPhone).";
    return;
  }
  if (recognizing) { recognition.stop(); return; }

  if ("speechSynthesis" in window) speechSynthesis.cancel();
  recognition = new SR();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;

  recognition.onstart = () => {
    recognizing = true;
    $("pMic").classList.add("listening");
    $("pStatus").textContent = "Te escucho… habla ahora 🎧";
  };
  recognition.onresult = (e) => {
    // De las alternativas, usamos la que más se parece a la frase esperada
    const alts = Array.from(e.results[0]).map(a => a.transcript);
    const expected = curLine().en;
    const best = alts.reduce((a, b) => evaluate(expected, b).score > evaluate(expected, a).score ? b : a);
    showResult(best);
    $("pStatus").textContent = "Toca el micrófono para intentar otra vez.";
  };
  recognition.onerror = (e) => {
    const msgs = {
      "not-allowed": "No me diste permiso para usar el micrófono. Actívalo en los ajustes del navegador.",
      "service-not-allowed": "No me diste permiso para usar el micrófono. Actívalo en los ajustes del navegador.",
      "no-speech": "No escuché nada. Acércate al micrófono e inténtalo otra vez.",
      "network": "Hace falta internet para corregir tu voz.",
      "audio-capture": "No encuentro un micrófono en este dispositivo."
    };
    $("pStatus").textContent = msgs[e.error] || "Algo falló (" + e.error + "). Inténtalo otra vez.";
  };
  recognition.onend = () => {
    recognizing = false;
    $("pMic").classList.remove("listening");
  };
  try { recognition.start(); } catch (err) { /* ya estaba escuchando */ }
}

$("pMic").addEventListener("click", startListening);
$("pListen").addEventListener("click", () => speak(curLine().en, 0.9));
$("pPrev").addEventListener("click", () => stepLine(-1));
$("pNext").addEventListener("click", () => stepLine(1));

/* =====================================================
   PANTALLA 3: HOY APRENDO
   ===================================================== */

function dayNumber() {
  // Días desde el 1 de enero de 2025, en hora local: cambia a medianoche
  const now = new Date();
  const a = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((a - Date.UTC(2025, 0, 1)) / 86400000);
}

function makeItem(titleEn, titleEs, extraLine, ex, exEs, speakText) {
  const card = document.createElement("div");
  card.className = "card item";

  const btn = document.createElement("button");
  btn.className = "speak-btn";
  btn.textContent = "🔊";
  btn.setAttribute("aria-label", "Escuchar " + titleEn);
  btn.addEventListener("click", () => { markPracticed(); speak(speakText, 0.85); });

  const info = document.createElement("div");
  info.className = "info";

  const head = document.createElement("div");
  const en = document.createElement("span"); en.className = "en"; en.textContent = titleEn;
  const es = document.createElement("span"); es.className = "es"; es.textContent = "= " + titleEs;
  head.append(en, es);
  info.appendChild(head);

  if (extraLine) {
    const f = document.createElement("p"); f.className = "forms"; f.textContent = extraLine;
    info.appendChild(f);
  }
  const p = document.createElement("p"); p.className = "ex";
  p.textContent = ex;
  const small = document.createElement("small"); small.textContent = exEs;
  p.appendChild(small);
  info.appendChild(p);

  card.append(btn, info);
  return card;
}

function renderToday() {
  const n = dayNumber();
  $("tDate").textContent = new Date().toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });

  const wordsBox = $("tWords");
  wordsBox.textContent = "";
  for (let i = 0; i < 3; i++) {
    const w = WORDS[(n * 3 + i) % WORDS.length];
    wordsBox.appendChild(makeItem(w.en, w.es, null, w.ex, w.exEs, w.en + ". " + w.ex));
  }

  const v = VERBS[n % VERBS.length];
  const verbBox = $("tVerb");
  verbBox.textContent = "";
  const base = v.en.replace("to ", "");
  verbBox.appendChild(makeItem(v.en, v.es, `Pasado: ${v.past}`, v.ex, v.exEs, `${base}. ${v.past}. ${v.ex}`));
}

/* =====================================================
   INICIO
   ===================================================== */

renderGenres();
renderShadow();
renderSpeak();
renderToday();
renderStreak();
