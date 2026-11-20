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
    if (typeof window.onLocalSave === "function") window.onLocalSave(key); // avisa a la nube
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
   NAVEGACIÓN Y CORRECTOR (compartidos por todas las pantallas)
   ===================================================== */

let playToken = 0;   // sirve para cortar la lectura en voz alta si cambias de pantalla

function showView(name) {
  playToken++;
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("active", v.id === "view-" + name));
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.view === name));
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  window.scrollTo(0, 0);
}
document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => showView(t.dataset.view)));

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9'\s]/g, " ").split(/\s+/).filter(Boolean);
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

// Lleva la cuenta de las palabras que fallas (suben al fallar, bajan al acertar)
function registrarDebiles(expected, marks) {
  const deb = store("inglesDebiles") || {};
  expected.forEach((w, i) => {
    if (marks[i]) { if (deb[w]) { deb[w]--; if (deb[w] <= 0) delete deb[w]; } }
    else deb[w] = (deb[w] || 0) + 1;
  });
  store("inglesDebiles", deb);
}

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

renderToday();
renderStreak();
