"use strict";

/* =====================================================
   CLASES: práctica de HABLAR basada en los temas vistos con Isabela.
   Cada tema tiene frases para repetir y preguntas para responder en voz alta.
   Las frases son sencillas y usan solo gramática estándar del tema.
   Para agregar un tema nuevo, copia un bloque de CLASES y cámbialo.
   ===================================================== */

const CLASES = [
  {
    id: "present-continuous", icon: "🎬", title: "Present continuous", es: "Lo que pasa ahora mismo",
    source: "Clase más reciente",
    tip: "Termina en «-ing»: suena «in», con la g casi muda. Y «I am» se junta: «I'm».",
    sentences: [
      { en: "I am helping with the housework.", es: "Estoy ayudando con las tareas de la casa." },
      { en: "My brothers are watching TV.", es: "Mis hermanos están viendo televisión." },
      { en: "Our rabbit is eating its food.", es: "Nuestro conejo está comiendo su comida." },
      { en: "The sun is shining.", es: "El sol está brillando." },
      { en: "My best friend is sitting next to me.", es: "Mi mejor amiga está sentada a mi lado." },
      { en: "Our bus is leaving soon.", es: "Nuestro bus sale pronto." },
      { en: "I am not listening to music.", es: "No estoy escuchando música." },
      { en: "Are you eating anything right now?", es: "¿Estás comiendo algo ahora mismo?" }
    ],
    prompts: [
      { q: "What are you doing right now?", es: "¿Qué estás haciendo ahora mismo?", use: ["am", "now"], example: "I am practicing English right now." }
    ]
  },
  {
    id: "some-any", icon: "🧊", title: "Some, any, a lot of", es: "Hablar de cantidades",
    source: "Repaso del día",
    tip: "«Some» en frases afirmativas. «Any» en preguntas y negativas. «A lot of» = mucho.",
    sentences: [
      { en: "There is some milk in the fridge.", es: "Hay un poco de leche en el refrigerador." },
      { en: "There are some eggs.", es: "Hay unos huevos." },
      { en: "There aren't any eggs.", es: "No hay huevos." },
      { en: "Do you have any sugar?", es: "¿Tienes azúcar?" },
      { en: "Is there any cheese?", es: "¿Hay queso?" },
      { en: "I have a lot of work today.", es: "Tengo mucho trabajo hoy." },
      { en: "We have a lot of vegetables.", es: "Tenemos muchas verduras." }
    ],
    prompts: [
      { q: "What is in your fridge?", es: "¿Qué hay en tu refrigerador?", use: ["there", "some"], example: "There is some milk and there are some eggs." }
    ]
  },
  {
    id: "stative-dynamic", icon: "🧠", title: "Stative vs dynamic verbs", es: "Verbos de estado y de acción",
    source: "Clase: Stative vs Dynamic Verbs",
    tip: "Verbos como «know», «want» o «love» casi no llevan «-ing». Se dice «I know», no «I am knowing».",
    sentences: [
      { en: "I know the answer.", es: "Sé la respuesta." },
      { en: "She wants a coffee.", es: "Ella quiere un café." },
      { en: "I love this song.", es: "Me encanta esta canción." },
      { en: "I understand you.", es: "Te entiendo." },
      { en: "He has a new car.", es: "Él tiene un auto nuevo." },
      { en: "I am having lunch right now.", es: "Estoy almorzando ahora mismo." },
      { en: "This soup smells great.", es: "Esta sopa huele muy bien." }
    ],
    prompts: [
      { q: "What do you love?", es: "¿Qué te encanta?", use: ["love"], example: "I love music and I love my family." }
    ]
  },
  {
    id: "present-simple", icon: "🔁", title: "Present simple", es: "Hábitos y cosas que siempre pasan",
    source: "Clases: Present simple (3.ª persona, preguntas)",
    tip: "En «he/she/it» se agrega -s: «works» suena /s/, «plays» suena /z/, «watches» suena «guiz».",
    sentences: [
      { en: "I wake up at seven every day.", es: "Me despierto a las siete todos los días." },
      { en: "She works in an office.", es: "Ella trabaja en una oficina." },
      { en: "He doesn't like coffee.", es: "A él no le gusta el café." },
      { en: "Do you speak English?", es: "¿Hablas inglés?" },
      { en: "What time does the class start?", es: "¿A qué hora empieza la clase?" },
      { en: "My brother plays soccer on Saturdays.", es: "Mi hermano juega fútbol los sábados." },
      { en: "Where do you live?", es: "¿Dónde vives?" }
    ],
    prompts: [
      { q: "What do you do every morning?", es: "¿Qué haces cada mañana?", use: ["wake", "breakfast", "work"], example: "I wake up, I have breakfast, and I go to work." }
    ]
  },
  {
    id: "daily-routines", icon: "⏰", title: "Daily routines", es: "Tu rutina diaria",
    source: "Clases: Daily routines",
    tip: "En «o'clock», la «o» suena «ə»: «ə-clok». Une las palabras sin pausas.",
    sentences: [
      { en: "I get up at six thirty.", es: "Me levanto a las seis y media." },
      { en: "I take a shower and eat breakfast.", es: "Me ducho y desayuno." },
      { en: "I go to work by bus.", es: "Voy al trabajo en bus." },
      { en: "I have lunch at one o'clock.", es: "Almuerzo a la una." },
      { en: "I come home at six.", es: "Llego a casa a las seis." },
      { en: "I go to bed at eleven.", es: "Me acuesto a las once." }
    ],
    prompts: [
      { q: "What time do you get up?", es: "¿A qué hora te levantas?", use: ["get", "at"], example: "I get up at seven o'clock." }
    ]
  },
  {
    id: "connectors", icon: "🔗", title: "Sentence connectors", es: "Unir ideas: and, but, because, so",
    source: "Clase: Sentence connectors",
    tip: "«Because» suena «bi-CÓS». «Although» suena «ol-DÓU», con «th» suave en el medio.",
    sentences: [
      { en: "I like tea, but I prefer coffee.", es: "Me gusta el té, pero prefiero el café." },
      { en: "I am late because I missed the bus.", es: "Llego tarde porque perdí el bus." },
      { en: "It is raining, so I am staying home.", es: "Está lloviendo, así que me quedo en casa." },
      { en: "I study every day, and I practice speaking too.", es: "Estudio todos los días y también practico hablar." },
      { en: "Although it is cold, I like walking.", es: "Aunque hace frío, me gusta caminar." }
    ],
    prompts: [
      { q: "Do you like coffee or tea? Why?", es: "¿Te gusta el café o el té? ¿Por qué?", use: ["because"], example: "I like coffee because it gives me energy." }
    ]
  },
  {
    id: "collective-compound", icon: "🐦", title: "Collective nouns & compound words", es: "Grupos de cosas y palabras compuestas",
    source: "Clases: Collective nouns, Compound words",
    tip: "En las palabras compuestas la fuerza va en la primera parte: SUN-flower, AIR-port, TOOTH-brush.",
    sentences: [
      { en: "We saw a flock of birds.", es: "Vimos una bandada de pájaros." },
      { en: "There is a herd of cows in the field.", es: "Hay una manada de vacas en el campo." },
      { en: "She gave me a bunch of flowers.", es: "Ella me dio un ramo de flores." },
      { en: "I bought a toothbrush and a notebook.", es: "Compré un cepillo de dientes y un cuaderno." },
      { en: "The sunflower is in the backyard.", es: "El girasol está en el patio de atrás." },
      { en: "He is waiting at the airport.", es: "Él está esperando en el aeropuerto." }
    ],
    prompts: [
      { q: "What did you buy last week?", es: "¿Qué compraste la semana pasada?", use: ["bought"], example: "I bought a notebook and some fruit." }
    ]
  },
  {
    id: "cognates", icon: "🪞", title: "Cognates & false cognates", es: "Palabras parecidas al español",
    source: "Clases: Cognates, False cognates",
    tip: "Se parecen al español, pero la sílaba fuerte cambia: im-POR-tant, HOS-pi-tal, AN-i-mal.",
    sentences: [
      { en: "My family is very important to me.", es: "Mi familia es muy importante para mí." },
      { en: "The hospital is near the station.", es: "El hospital está cerca de la estación." },
      { en: "I love chocolate.", es: "Me encanta el chocolate." },
      { en: "I am embarrassed because I forgot his name.", es: "Me da vergüenza porque olvidé su nombre. («embarrassed» NO es embarazada)" },
      { en: "She is pregnant.", es: "Ella está embarazada." },
      { en: "I buy books at the bookstore.", es: "Compro libros en la librería. («library» es biblioteca)" },
      { en: "I attend a class every Monday.", es: "Asisto a una clase todos los lunes. («attend» = asistir, no atender)" }
    ],
    prompts: [
      { q: "Tell me about your family.", es: "Cuéntame de tu familia.", use: ["family", "my"], example: "My family is small, and my family is very important to me." }
    ]
  },
  {
    id: "articles", icon: "🅰️", title: "Articles: a, an, the", es: "Los artículos",
    source: "Clases: Definite and indefinite articles",
    tip: "«An» va antes de un sonido de vocal: an apple, an umbrella. «The» suena «da» (casi «de»).",
    sentences: [
      { en: "I have a dog and a cat.", es: "Tengo un perro y un gato." },
      { en: "She is an engineer.", es: "Ella es ingeniera." },
      { en: "I eat an apple every day.", es: "Como una manzana todos los días." },
      { en: "I need an umbrella.", es: "Necesito un paraguas." },
      { en: "The sun is very hot today.", es: "El sol está muy caliente hoy." },
      { en: "Can you open the window, please?", es: "¿Puedes abrir la ventana, por favor?" }
    ],
    prompts: [
      { q: "What do you have in your bag?", es: "¿Qué tienes en tu bolso?", use: ["have", "a"], example: "I have a phone, a wallet, and an umbrella." }
    ]
  },
  {
    id: "possessives", icon: "👜", title: "Possessives", es: "Mi, tu, suyo, nuestro",
    source: "Clases: Possessive adjectives and pronouns",
    tip: "«Yours», «ours» y «hers» terminan en sonido «z»: no los dejes sin final.",
    sentences: [
      { en: "This is my bag, and that bag is yours.", es: "Esta es mi mochila, y esa es tuya." },
      { en: "Her house is big, but ours is small.", es: "Su casa es grande, pero la nuestra es pequeña." },
      { en: "Is this your phone? No, it is his.", es: "¿Es este tu teléfono? No, es de él." },
      { en: "Their children are very polite.", es: "Sus hijos son muy educados." },
      { en: "The cat is licking its paw.", es: "El gato se está lamiendo la pata." },
      { en: "The red car is mine.", es: "El auto rojo es mío." }
    ],
    prompts: [
      { q: "Whose phone is this? It is...", es: "¿De quién es este teléfono? Es...", use: ["mine", "my"], example: "It is mine. It is my phone." }
    ]
  },
  {
    id: "pronouns", icon: "👥", title: "Subject & object pronouns", es: "I / me, he / him, she / her",
    source: "Clases: Subject and object pronouns",
    tip: "En el habla natural, «her», «him» y «them» se dicen suaves y rápidos: «er», «im», «dem».",
    sentences: [
      { en: "I like her, and she likes me.", es: "Ella me cae bien y yo le caigo bien." },
      { en: "He calls us every Sunday.", es: "Él nos llama todos los domingos." },
      { en: "We see them at the park.", es: "Los vemos en el parque." },
      { en: "Can you help me, please?", es: "¿Puedes ayudarme, por favor?" },
      { en: "My parents love him.", es: "Mis padres lo quieren mucho." },
      { en: "I know you, and you know me.", es: "Yo te conozco y tú me conoces." }
    ],
    prompts: [
      { q: "Who helps you at work or at home?", es: "¿Quién te ayuda en el trabajo o en casa?", use: ["helps", "me"], example: "My friend helps me. I help her too." }
    ]
  },
  {
    id: "verb-to-be", icon: "🙂", title: "Verb to be", es: "Ser y estar",
    source: "Clases: Verb to be",
    tip: "Habla con contracciones: «I'm», «she's», «we're», «they're». Así suena natural.",
    sentences: [
      { en: "I am happy today.", es: "Hoy estoy feliz." },
      { en: "She is my friend.", es: "Ella es mi amiga." },
      { en: "We are at home.", es: "Estamos en casa." },
      { en: "They are not late.", es: "Ellos no llegan tarde." },
      { en: "Is dinner ready?", es: "¿La cena está lista?" },
      { en: "Where is the bathroom?", es: "¿Dónde está el baño?" }
    ],
    prompts: [
      { q: "How are you today?", es: "¿Cómo estás hoy?", use: ["am", "fine", "good"], example: "I am fine, thank you. And you?" }
    ]
  },
  {
    id: "personal-info", icon: "🪪", title: "Personal information", es: "Presentarte y hacer preguntas",
    source: "Clases: Asking and giving personal information",
    tip: "En las preguntas, la voz sube al final solo si es de «sí o no». En «What is your name?» baja.",
    sentences: [
      { en: "What is your name?", es: "¿Cómo te llamas?" },
      { en: "Where are you from?", es: "¿De dónde eres?" },
      { en: "How old are you?", es: "¿Cuántos años tienes?" },
      { en: "What do you do?", es: "¿A qué te dedicas?" },
      { en: "I work in an office.", es: "Trabajo en una oficina." },
      { en: "I live in a big city.", es: "Vivo en una ciudad grande." }
    ],
    prompts: [
      { q: "Where are you from, and what do you do?", es: "¿De dónde eres y a qué te dedicas?", use: ["from", "work"], example: "I am from a big city, and I work in an office." }
    ]
  },
  {
    id: "there-time", icon: "🕗", title: "There is / there are & time", es: "Hay... y la hora",
    source: "Repaso del día: there is / there are, la hora",
    tip: "«Half past eight» = ocho y media. «A quarter past five» = cinco y cuarto.",
    sentences: [
      { en: "There is a cat on the sofa.", es: "Hay un gato en el sofá." },
      { en: "There are three books on the table.", es: "Hay tres libros sobre la mesa." },
      { en: "What time is it?", es: "¿Qué hora es?" },
      { en: "It is half past eight.", es: "Son las ocho y media." },
      { en: "The class starts at seven o'clock.", es: "La clase empieza a las siete." },
      { en: "I will see you at a quarter past five.", es: "Te veo a las cinco y cuarto." }
    ],
    prompts: [
      { q: "What time is dinner?", es: "¿A qué hora es la cena?", use: ["dinner", "at"], example: "Dinner is at eight o'clock." }
    ]
  }
];

/* =====================================================
   INTERFAZ
   ===================================================== */

const clBox = document.getElementById("clasesBox");
let clRec = null;
let clActiveBtn = null;

function clProgress() { return store("inglesClases") || {}; }
function clSaveScore(topicId, key, score) {
  const all = clProgress();
  all[topicId] = all[topicId] || {};
  if (all[topicId][key] == null || score > all[topicId][key]) all[topicId][key] = score;
  store("inglesClases", all);
}
function clDoneCount(topic) {
  const t = clProgress()[topic.id] || {};
  return topic.sentences.filter((_, i) => (t["s" + i] || 0) >= 85).length;
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

/* ---------- Lista de temas ---------- */
function clRenderTopics() {
  clBox.textContent = "";
  clBox.appendChild(el("p", "cl-intro", "Cada tema sale de tus clases con Isabela. Aquí solo hablas: escuchas, repites y te corrijo."));
  const grid = el("div", "topic-grid");
  CLASES.forEach(topic => {
    const b = el("button", "topic");
    b.type = "button";
    b.appendChild(el("span", "ticon", topic.icon));
    const info = el("span", "tinfo");
    info.appendChild(el("b", "", topic.title));
    info.appendChild(el("small", "", topic.es));
    info.appendChild(el("small", "tsrc", topic.source));
    b.appendChild(info);
    const done = clDoneCount(topic);
    const badge = el("span", "tbadge" + (done === topic.sentences.length ? " full" : ""), `${done}/${topic.sentences.length}`);
    b.appendChild(badge);
    b.addEventListener("click", () => clRenderLesson(topic.id));
    grid.appendChild(b);
  });
  clBox.appendChild(grid);
}

/* ---------- Reconocimiento de voz ---------- */
function clStop() {
  if (clRec) { try { clRec.stop(); } catch (e) { /* nada */ } }
}

function clListen(btn, statusEl, onText) {
  if (!SR) {
    statusEl.textContent = "Tu navegador no tiene reconocimiento de voz. Usa Chrome (Android) o Safari (iPhone).";
    return;
  }
  if (clActiveBtn === btn) { clStop(); return; }
  clStop();
  if ("speechSynthesis" in window) speechSynthesis.cancel();

  const rec = new SR();
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 3;
  clRec = rec;

  rec.onstart = () => { clActiveBtn = btn; btn.classList.add("listening"); statusEl.textContent = "Te escucho… habla ahora 🎧"; };
  rec.onresult = (e) => { onText(Array.from(e.results[0]).map(a => a.transcript)); statusEl.textContent = ""; };
  rec.onerror = (e) => {
    const msgs = {
      "not-allowed": "No me diste permiso para usar el micrófono. Actívalo en los ajustes del navegador.",
      "service-not-allowed": "No me diste permiso para usar el micrófono. Actívalo en los ajustes del navegador.",
      "no-speech": "No escuché nada. Acércate al micrófono e inténtalo otra vez.",
      "network": "Hace falta internet para corregir tu voz.",
      "audio-capture": "No encuentro un micrófono en este dispositivo."
    };
    statusEl.textContent = msgs[e.error] || "Algo falló (" + e.error + "). Inténtalo otra vez.";
  };
  rec.onend = () => { btn.classList.remove("listening"); if (clActiveBtn === btn) clActiveBtn = null; };
  try { rec.start(); } catch (err) { /* ya estaba escuchando */ }
}

/* ---------- Lección ---------- */
function clRenderLesson(topicId) {
  const topic = CLASES.find(t => t.id === topicId);
  if (!topic) return;
  clStop();
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  clBox.textContent = "";
  window.scrollTo(0, 0);

  const back = el("button", "btn ghost back", "← Todos los temas");
  back.type = "button";
  back.addEventListener("click", clRenderTopics);
  clBox.appendChild(back);

  const head = el("div", "card scene");
  head.appendChild(el("div", "chip", topic.source));
  head.appendChild(el("h2", "lesson-title", topic.icon + " " + topic.title));
  head.appendChild(el("p", "translation", topic.es));
  head.appendChild(el("p", "tip", "💡 " + topic.tip));
  clBox.appendChild(head);

  clBox.appendChild(el("h3", "h3", "1. Escucha y repite"));
  clBox.appendChild(el("p", "cl-intro", "Toca 🔊, repite igual de rápido, y luego toca 🎤 y di la frase."));
  topic.sentences.forEach((s, i) => clBox.appendChild(clSentenceCard(topic, s, i)));

  clBox.appendChild(el("h3", "h3", "2. Ahora habla tú"));
  topic.prompts.forEach((p, i) => clBox.appendChild(clPromptCard(topic, p, i)));
}

function clSentenceCard(topic, s, i) {
  const card = el("div", "card sent");
  card.appendChild(el("p", "phrase small", s.en));
  card.appendChild(el("p", "translation", s.es));

  const row = el("div", "row");
  const play = el("button", "btn orange", "🔊");
  const slow = el("button", "btn ghost", "🐢");
  const mic = el("button", "btn pink", "🎤 Hablar");
  [play, slow, mic].forEach(b => (b.type = "button"));
  play.setAttribute("aria-label", "Escuchar");
  slow.setAttribute("aria-label", "Escuchar lento");
  row.append(play, slow, mic);
  card.appendChild(row);

  const status = el("p", "status");
  card.appendChild(status);
  const result = el("div", "clres");
  result.hidden = true;
  card.appendChild(result);

  play.addEventListener("click", () => { markPracticed(); speak(s.en, 0.95); });
  slow.addEventListener("click", () => { markPracticed(); speak(s.en, 0.6); });
  mic.addEventListener("click", () => {
    clListen(mic, status, (alts) => {
      const best = alts.reduce((a, b) => evaluate(s.en, b).score > evaluate(s.en, a).score ? b : a);
      const { marks, score, expected } = evaluate(s.en, best);
      registrarDebiles(expected, marks);
      clSaveScore(topic.id, "s" + i, score);
      markPracticed();

      result.textContent = "";
      result.hidden = false;
      const sc = el("div", "score " + (score >= 85 ? "good" : score >= 55 ? "mid" : "low"), score + "%");
      const words = el("p", "words");
      s.en.split(/\s+/).forEach((w, k) => {
        words.appendChild(el("span", marks[k] ? "ok" : "bad", w));
        words.appendChild(document.createTextNode(" "));
      });
      const heard = el("p", "heard", "El navegador entendió: “" + best + "”");
      const msg = el("p", "msg",
        score >= 85 ? "🎉 ¡Muy bien!" :
        score >= 55 ? "👍 Casi. Escucha las palabras en rojo y repite." :
                      "💪 No pasa nada. Prueba con 🐢 lento y vuelve a intentar.");
      result.append(sc, words, heard, msg);
    });
  });
  return card;
}

function clPromptCard(topic, p, i) {
  const card = el("div", "card sent");
  card.appendChild(el("p", "phrase small", p.q));
  card.appendChild(el("p", "translation", p.es));
  card.appendChild(el("p", "tip", "Puedes usar: " + p.use.join(", ")));

  const row = el("div", "row");
  const ask = el("button", "btn orange", "🔊 Pregunta");
  const mic = el("button", "btn pink", "🎤 Responder");
  [ask, mic].forEach(b => (b.type = "button"));
  row.append(ask, mic);
  card.appendChild(row);

  const status = el("p", "status");
  card.appendChild(status);
  const result = el("div", "clres");
  result.hidden = true;
  card.appendChild(result);

  ask.addEventListener("click", () => { markPracticed(); speak(p.q, 0.9); });
  mic.addEventListener("click", () => {
    clListen(mic, status, (alts) => {
      const heardText = alts[0];
      const heardWords = normalize(heardText);
      markPracticed();
      result.textContent = "";
      result.hidden = false;

      result.appendChild(el("p", "heard", "El navegador entendió: “" + heardText + "”"));
      const used = el("p", "words");
      p.use.forEach(w => {
        const hit = heardWords.includes(w.toLowerCase());
        used.appendChild(el("span", hit ? "ok" : "bad", (hit ? "✓ " : "· ") + w));
        used.appendChild(document.createTextNode("  "));
      });
      result.appendChild(used);
      result.appendChild(el("p", "msg", heardWords.length >= 4
        ? "👏 Respondiste con una frase completa. Eso es hablar."
        : "Intenta responder con una frase completa, de 4 palabras o más."));

      const ex = el("p", "tip", "Ejemplo: " + p.example);
      result.appendChild(ex);
      const listenEx = el("button", "btn ghost", "🔊 Escuchar el ejemplo");
      listenEx.type = "button";
      listenEx.addEventListener("click", () => speak(p.example, 0.9));
      result.appendChild(listenEx);
    });
  });
  return card;
}

clRenderTopics();
