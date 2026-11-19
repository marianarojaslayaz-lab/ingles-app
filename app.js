"use strict";

/* =====================================================
   DATOS: escenas (diálogos originales inspirados en películas),
   palabras y verbos. Para agregar más, copia una línea y cámbiala.
   ===================================================== */

const SCENES = [
  { movie: "Inspirada en Toy Story", en: "I will always be your friend.", es: "Siempre seré tu amigo.", tip: "«friend» suena «frend». La «i» casi no se oye." },
  { movie: "Inspirada en Titanic", en: "I feel like I am flying!", es: "¡Siento que estoy volando!", tip: "«flying» = «fláing». Alarga el sonido «ai»." },
  { movie: "Inspirada en Frozen", en: "I am free now.", es: "Ahora soy libre.", tip: "«free» lleva una «r» suave, con la lengua atrás y sin vibrar." },
  { movie: "Inspirada en Harry Potter", en: "Wait, I am a wizard?", es: "Espera, ¿soy un mago?", tip: "Sube la voz al final porque es una pregunta." },
  { movie: "Inspirada en Buscando a Nemo", en: "We can find him together.", es: "Podemos encontrarlo juntos.", tip: "«the» y «th»: pon la punta de la lengua entre los dientes." },
  { movie: "Inspirada en Friends", en: "Hey, how are you doing?", es: "Oye, ¿cómo estás?", tip: "Los nativos dicen «ha-ya-yu-dúin». Todo junto y rápido." },
  { movie: "Inspirada en El Rey León", en: "You are stronger than you think.", es: "Eres más fuerte de lo que crees.", tip: "«think» empieza con «th»: lengua entre los dientes, soplando suave." },
  { movie: "Inspirada en Shrek", en: "Are we there yet?", es: "¿Ya llegamos?", tip: "«there» y «yet» se juntan: «ar-wi-dér-yet»." },
  { movie: "Inspirada en Star Wars", en: "I need your help, please.", es: "Necesito tu ayuda, por favor.", tip: "«help» termina con «p» suave, casi sin soltar aire." },
  { movie: "Inspirada en E.T.", en: "I just want to go home.", es: "Solo quiero volver a casa.", tip: "«want to» suena «uana». Así hablan los nativos." }
];

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
   NAVEGACIÓN
   ===================================================== */

let current = Number(store("inglesEscena")) || 0;
if (current >= SCENES.length || current < 0) current = 0;

function showView(name) {
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + name));
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.view === name));
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  window.scrollTo(0, 0);
}
document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => showView(t.dataset.view)));

function setScene(i) {
  current = (i + SCENES.length) % SCENES.length;
  store("inglesEscena", current);
  renderShadow();
  renderSpeak();
}

/* =====================================================
   PANTALLA 1: SHADOWING
   ===================================================== */

function renderShadow(highlightIndex = -1) {
  const s = SCENES[current];
  $("sMovie").textContent = s.movie;
  $("sEs").textContent = s.es;
  $("sTip").textContent = "💡 " + s.tip;
  $("sCount").textContent = `${current + 1} / ${SCENES.length}`;

  // Cada palabra va en su propio <span> para poder resaltarla mientras suena
  const box = $("sPhrase");
  box.textContent = "";
  let pos = 0;
  s.en.split(/(\s+)/).forEach(part => {
    if (/^\s+$/.test(part)) { box.appendChild(document.createTextNode(part)); pos += part.length; return; }
    const span = document.createElement("span");
    span.textContent = part;
    span.dataset.start = pos;
    if (pos === highlightIndex) span.className = "now";
    box.appendChild(span);
    pos += part.length;
  });
}

function playScene(rate) {
  markPracticed();
  speak(SCENES[current].en, rate,
    (charIndex) => {
      document.querySelectorAll("#sPhrase span").forEach(sp =>
        sp.classList.toggle("now", Number(sp.dataset.start) === charIndex));
    },
    () => document.querySelectorAll("#sPhrase span").forEach(sp => sp.classList.remove("now"))
  );
}

$("sPlay").addEventListener("click", () => playScene(0.95));
$("sSlow").addEventListener("click", () => playScene(0.6));
$("sPrev").addEventListener("click", () => setScene(current - 1));
$("sNext").addEventListener("click", () => setScene(current + 1));
$("sGoSpeak").addEventListener("click", () => showView("speak"));

/* =====================================================
   PANTALLA 2: PRONUNCIACIÓN
   ===================================================== */

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognizing = false;
let recognition = null;

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9'\s]/g, " ").split(/\s+/).filter(Boolean);
}

function renderSpeak() {
  const s = SCENES[current];
  $("pMovie").textContent = s.movie;
  $("pPhrase").textContent = s.en;
  $("pEs").textContent = s.es;
  $("pResult").hidden = true;
  $("pStatus").textContent = "Toca el micrófono y di la frase en voz alta.";
  const best = (store("inglesMejor") || {})[current];
  if (best != null) $("pStatus").textContent += ` (Tu mejor puntaje aquí: ${best}%)`;
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
  const s = SCENES[current];
  const { marks, score } = evaluate(s.en, heardText);

  $("pResult").hidden = false;
  const scoreEl = $("pScore");
  scoreEl.textContent = score + "%";
  scoreEl.className = "score " + (score >= 85 ? "good" : score >= 55 ? "mid" : "low");

  // Palabras de la frase original, verdes o rojas
  const shown = s.en.split(/\s+/);
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

  const best = store("inglesMejor") || {};
  if (best[current] == null || score > best[current]) { best[current] = score; store("inglesMejor", best); }
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
    const best = alts.reduce((a, b) =>
      evaluate(SCENES[current].en, b).score > evaluate(SCENES[current].en, a).score ? b : a);
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
$("pListen").addEventListener("click", () => speak(SCENES[current].en, 0.9));
$("pPrev").addEventListener("click", () => setScene(current - 1));
$("pNext").addEventListener("click", () => setScene(current + 1));

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

renderShadow();
renderSpeak();
renderToday();
renderStreak();
