"use strict";

/* =====================================================
   FRASES DE PELÍCULAS: 10 géneros x 10 textos = 100.
   Son diálogos y textos ORIGINALES, inspirados en tipos de escena
   (no son citas exactas). Inglés americano estándar, sin jerga.
   En cada género van de fácil a difícil:
   5 frases cortas, 3 diálogos y 2 párrafos.
   ===================================================== */

const S = (en, es, tip = "") => ({ type: "Frase", tip, lines: [{ en, es }] });
const D = (lines, tip = "") => ({ type: "Diálogo", tip, lines: lines.map(([who, en, es]) => ({ who, en, es })) });
const P = (lines, tip = "") => ({ type: "Párrafo", tip, lines: lines.map(([en, es]) => ({ en, es })) });

const GENRES = [
  {
    id: "animacion", icon: "🧸", name: "Animación",
    items: [
      S("I am a little robot.", "Soy un pequeño robot.", "«robot» suena «RÓU-bot»; la «t» final es suave."),
      S("I will always be your friend.", "Siempre seré tu amigo.", "«friend» suena «frend»; la «i» casi no se oye."),
      S("The fish is swimming in the sea.", "El pez está nadando en el mar.", "«fish» termina en «sh», como pedir silencio: shhh."),
      S("Please don't leave me here.", "Por favor, no me dejes aquí.", "«leave» tiene vocal larga: «li-iv»."),
      S("We can find him together.", "Podemos encontrarlo juntos.", "«together» suena «tu-GUÉ-der», con «th» suave."),
      D([
        ["Rex", "Where is my hat?", "¿Dónde está mi sombrero?"],
        ["Bo", "It is under the bed.", "Está debajo de la cama."],
        ["Rex", "Thank you for your help.", "Gracias por tu ayuda."]
      ], "«Thank you» empieza con «th»: lengua entre los dientes."),
      D([
        ["Pip", "Are you cold?", "¿Tienes frío?"],
        ["Moe", "Yes, I am very cold.", "Sí, tengo mucho frío."],
        ["Pip", "Come here. We can stay warm together.", "Ven aquí. Podemos mantenernos abrigados juntos."]
      ]),
      D([
        ["Cub", "I am afraid of the dark.", "Tengo miedo a la oscuridad."],
        ["Mom", "Don't worry. I am right here.", "No te preocupes. Estoy aquí mismo."]
      ], "«afraid» suena «a-FREID»."),
      P([
        ["The little fish lived in a big ocean.", "El pequeño pez vivía en un océano enorme."],
        ["Every day, he looked for his friends.", "Todos los días buscaba a sus amigos."],
        ["The ocean was very large, but he never stopped.", "El océano era muy grande, pero nunca se detuvo."],
        ["In the end, he found them all.", "Al final, los encontró a todos."]
      ], "«ocean» suena «Ó-shan»."),
      P([
        ["The toys wake up when the house is quiet.", "Los juguetes despiertan cuando la casa está en silencio."],
        ["They play games and tell funny stories.", "Juegan y cuentan historias divertidas."],
        ["When the door opens, they stop moving.", "Cuando la puerta se abre, dejan de moverse."],
        ["Nobody knows their secret.", "Nadie conoce su secreto."]
      ], "«quiet» suena «CUÁI-et»: dos sílabas.")
    ]
  },
  {
    id: "romance", icon: "💞", name: "Romance",
    items: [
      S("I missed you so much.", "Te extrañé muchísimo.", "«missed» termina en sonido «t»: suena «mist»."),
      S("You make me very happy.", "Me haces muy feliz.", "La «h» de «happy» se aspira, como una «j» muy suave."),
      S("Will you have dinner with me?", "¿Quieres cenar conmigo?", "«Will you» se junta: «uíl-yu»."),
      S("I will never forget this day.", "Nunca olvidaré este día.", "«this» lleva «th» suave y la «i» corta."),
      S("Let's walk by the river.", "Caminemos junto al río.", "En «walk» la «l» no se pronuncia: «uók»."),
      D([
        ["Ana", "Hi, I think we met before.", "Hola, creo que nos conocimos antes."],
        ["Leo", "Yes, at the bookstore last week.", "Sí, en la librería la semana pasada."],
        ["Ana", "I remember. Can I buy you a coffee?", "Lo recuerdo. ¿Puedo invitarte un café?"]
      ]),
      D([
        ["Ana", "Are you nervous?", "¿Estás nervioso?"],
        ["Leo", "A little. Are you?", "Un poco. ¿Y tú?"],
        ["Ana", "Me too, but I am happy to be here.", "Yo también, pero estoy feliz de estar aquí."]
      ]),
      D([
        ["Leo", "I have something to tell you.", "Tengo algo que decirte."],
        ["Ana", "What is it?", "¿Qué es?"],
        ["Leo", "I think I fell in love with you.", "Creo que me enamoré de ti."]
      ], "«love» suena «lav», no «lov»."),
      P([
        ["We met on a rainy afternoon.", "Nos conocimos en una tarde lluviosa."],
        ["I had no umbrella, so he shared his with me.", "Yo no tenía paraguas, así que él compartió el suyo conmigo."],
        ["We talked for hours under the same umbrella.", "Hablamos durante horas bajo el mismo paraguas."],
        ["That was the beginning of everything.", "Ese fue el comienzo de todo."]
      ], "«umbrella» suena «am-BRE-la»."),
      P([
        ["Every morning, she writes a short letter.", "Cada mañana, ella escribe una carta corta."],
        ["She leaves it on the kitchen table.", "La deja sobre la mesa de la cocina."],
        ["Her husband reads it with his coffee.", "Su esposo la lee con su café."],
        ["It is a small thing, but it keeps their love strong.", "Es algo pequeño, pero mantiene fuerte su amor."]
      ])
    ]
  },
  {
    id: "aventura", icon: "🧭", name: "Aventura",
    items: [
      S("We need to cross the mountain.", "Tenemos que cruzar la montaña.", "«mountain» suena «MÁUN-tn», casi sin la «a» final."),
      S("Follow me, and stay close.", "Sígueme y quédate cerca.", "«close» (cerca) suena «clóus»."),
      S("The map shows a hidden cave.", "El mapa muestra una cueva escondida.", "«cave» suena «keiv»."),
      S("I feel like I am flying!", "¡Siento que estoy volando!", "«flying» = «fláing». Alarga el sonido «ai»."),
      S("We have enough water for two days.", "Tenemos agua suficiente para dos días.", "«enough» suena «i-NAF»."),
      D([
        ["Kai", "Which way do we go?", "¿Por qué camino vamos?"],
        ["Zoe", "North. The treasure is near the lake.", "Al norte. El tesoro está cerca del lago."],
        ["Kai", "Then let's go before it gets dark.", "Entonces vamos antes de que oscurezca."]
      ], "«treasure» suena «TRE-shar»."),
      D([
        ["Kai", "I hear a strange noise.", "Escucho un ruido extraño."],
        ["Zoe", "Stay calm. It is only the wind.", "Mantén la calma. Solo es el viento."],
        ["Kai", "I hope you are right.", "Espero que tengas razón."]
      ], "En «calm» la «l» no se pronuncia: «kam»."),
      D([
        ["Zoe", "The boat is leaving in ten minutes.", "El bote sale en diez minutos."],
        ["Kai", "Then we have to run!", "¡Entonces tenemos que correr!"],
        ["Zoe", "Take my hand, and don't look down.", "Toma mi mano y no mires hacia abajo."]
      ]),
      P([
        ["The explorers walked through the jungle for three days.", "Los exploradores caminaron por la selva durante tres días."],
        ["It was hot, and the path was difficult.", "Hacía calor y el camino era difícil."],
        ["At night, they slept near a small fire.", "De noche, dormían cerca de una pequeña fogata."],
        ["On the fourth morning, they saw the old temple.", "En la cuarta mañana, vieron el antiguo templo."]
      ], "«through» suena «zru»; «three» lleva «th» suave."),
      P([
        ["The captain looked at the sky.", "El capitán miró el cielo."],
        ["The clouds were dark, and the wind was getting stronger.", "Las nubes estaban oscuras y el viento era cada vez más fuerte."],
        ["He told everyone to prepare the ship.", "Les dijo a todos que prepararan el barco."],
        ["They were ready when the storm arrived.", "Estaban listos cuando llegó la tormenta."]
      ], "«captain» suena «CAP-tn»; la «p» es fuerte.")
    ]
  },
  {
    id: "comedia", icon: "😂", name: "Comedia",
    items: [
      S("That was the worst idea ever.", "Esa fue la peor idea de todas.", "«worst» suena «uérst»; la «r» no vibra."),
      S("I can explain everything.", "Puedo explicarlo todo.", "«explain» suena «ik-SPLEIN»."),
      S("Who ate my sandwich?", "¿Quién se comió mi sándwich?", "«ate» suena «eit»."),
      S("I thought this was my car.", "Pensé que este era mi auto.", "«thought» suena «zot», con «th» suave."),
      S("Hey, how are you doing?", "Oye, ¿cómo estás?", "Los nativos dicen «ha-ya-yu-DÚIN». Todo junto y rápido."),
      D([
        ["Max", "Why are you wearing two hats?", "¿Por qué llevas dos sombreros?"],
        ["Liv", "One is for sun, and one is for rain.", "Uno es para el sol y otro para la lluvia."],
        ["Max", "But it is not sunny or rainy.", "Pero no hace sol ni llueve."]
      ]),
      D([
        ["Max", "Did you cook dinner?", "¿Cocinaste la cena?"],
        ["Liv", "Yes! I made soup.", "¡Sí! Hice sopa."],
        ["Max", "This is not soup. This is water.", "Esto no es sopa. Es agua."],
        ["Liv", "It is a very light soup.", "Es una sopa muy ligera."]
      ], "«soup» suena «suup», con la «u» larga."),
      D([
        ["Max", "Where are my keys?", "¿Dónde están mis llaves?"],
        ["Liv", "They are in your hand.", "Están en tu mano."],
        ["Max", "Oh! How embarrassing.", "¡Ah! Qué vergüenza."]
      ], "«embarrassing» suena «im-BÁ-ra-sing»."),
      P([
        ["On Monday, I went to the wrong office.", "El lunes fui a la oficina equivocada."],
        ["I sat at someone else's desk and answered three emails.", "Me senté en el escritorio de otra persona y respondí tres correos."],
        ["Then a stranger said hello and asked who I was.", "Luego un desconocido me saludó y me preguntó quién era."],
        ["I smiled, and I left very slowly.", "Sonreí y me fui muy despacio."]
      ], "«answered» suena «ÁN-serd»; la «w» no se pronuncia."),
      P([
        ["My dog hates the vacuum cleaner.", "Mi perro odia la aspiradora."],
        ["When I turn it on, he runs and hides.", "Cuando la enciendo, corre y se esconde."],
        ["Yesterday, he hid under the sofa for two hours.", "Ayer se escondió debajo del sofá durante dos horas."],
        ["Now he thinks the whole house is dangerous.", "Ahora piensa que toda la casa es peligrosa."]
      ], "«vacuum» suena «VA-kiuum».")
    ]
  },
  {
    id: "drama", icon: "🎭", name: "Drama",
    items: [
      S("I did what I thought was right.", "Hice lo que pensé que era correcto.", "«right» suena «ráit»; la «r» inglesa no vibra."),
      S("You are stronger than you think.", "Eres más fuerte de lo que crees.", "«think» empieza con «th»: lengua entre los dientes, soplando suave."),
      S("Sometimes the truth is hard to hear.", "A veces la verdad es difícil de escuchar.", "«truth» termina con «th» suave."),
      S("It makes me proud to see you grow.", "Me llena de orgullo verte crecer.", "«grow» suena «gróu»; la «r» no vibra."),
      S("Please, give me another chance.", "Por favor, dame otra oportunidad.", "«chance» suena «chans»."),
      D([
        ["Eli", "Why didn't you call me?", "¿Por qué no me llamaste?"],
        ["Sam", "I did not know what to say.", "No sabía qué decir."],
        ["Eli", "You could say you were sorry.", "Podrías decir que lo sentías."]
      ]),
      D([
        ["Eli", "Dad, I got the job.", "Papá, conseguí el trabajo."],
        ["Sam", "I knew you could do it.", "Sabía que podías lograrlo."],
        ["Eli", "I could not have done it without you.", "No lo habría logrado sin ti."]
      ], "En «knew» la «k» no se pronuncia: suena «nu»."),
      D([
        ["Eli", "Are you leaving?", "¿Te vas?"],
        ["Sam", "Yes. I think it is the best choice.", "Sí. Creo que es la mejor decisión."],
        ["Eli", "Will you come back?", "¿Volverás?"],
        ["Sam", "I don't know. I really don't know.", "No lo sé. De verdad no lo sé."]
      ]),
      P([
        ["He worked every day for twenty years.", "Trabajó todos los días durante veinte años."],
        ["He saved money for his children's future.", "Ahorró dinero para el futuro de sus hijos."],
        ["When they grew up, they thanked him with a small gift.", "Cuando crecieron, le agradecieron con un pequeño regalo."],
        ["He cried, because it was the first time anyone said thank you.", "Lloró, porque era la primera vez que alguien le daba las gracias."]
      ], "«twenty» suena «TUÉN-ti»."),
      P([
        ["My grandmother lived alone in a small village.", "Mi abuela vivía sola en un pueblo pequeño."],
        ["Every Sunday, the whole family visited her.", "Cada domingo, toda la familia la visitaba."],
        ["She cooked for hours and never asked for help.", "Cocinaba durante horas y nunca pedía ayuda."],
        ["Now I understand that her love was in every meal.", "Ahora entiendo que su cariño estaba en cada comida."]
      ], "«whole» suena «jóul»; la «w» no se pronuncia.")
    ]
  },
  {
    id: "ciencia-ficcion", icon: "🚀", name: "Ciencia ficción",
    items: [
      S("The ship will land in ten minutes.", "La nave aterrizará en diez minutos.", "«ship» tiene «i» corta: no suena como «sheep»."),
      S("Our planet is getting too hot.", "Nuestro planeta se está calentando demasiado.", "«planet» suena «PLA-net»."),
      S("I don't think we are alone.", "No creo que estemos solos.", "«alone» suena «a-LÓUN»."),
      S("I need your help, please.", "Necesito tu ayuda, por favor.", "«help» termina con «p» suave, casi sin soltar aire."),
      S("We have one hour of oxygen left.", "Nos queda una hora de oxígeno.", "«hour» suena «áuer»; la «h» no se pronuncia."),
      D([
        ["Ava", "Captain, there is a signal from space.", "Capitán, hay una señal desde el espacio."],
        ["Cap", "Where is it coming from?", "¿De dónde viene?"],
        ["Ava", "From a planet we have never seen.", "De un planeta que nunca hemos visto."]
      ]),
      D([
        ["Ava", "Can you hear me?", "¿Me escuchas?"],
        ["Cap", "Barely. The radio is not working well.", "Apenas. La radio no funciona bien."],
        ["Ava", "Try the other channel.", "Prueba con el otro canal."]
      ], "«barely» suena «BER-li»."),
      D([
        ["Ava", "Is the robot dangerous?", "¿Es peligroso el robot?"],
        ["Cap", "No. It only follows orders.", "No. Solo sigue órdenes."],
        ["Ava", "Then who gave it the wrong order?", "Entonces, ¿quién le dio la orden equivocada?"]
      ], "«wrong» no pronuncia la «w»: «rong»."),
      P([
        ["In the year 2150, people live on Mars.", "En el año 2150, la gente vive en Marte."],
        ["The cities are under glass domes.", "Las ciudades están bajo cúpulas de vidrio."],
        ["Children go to school with robot teachers.", "Los niños van a la escuela con maestros robot."],
        ["But everyone still dreams of seeing Earth again.", "Pero todos siguen soñando con volver a ver la Tierra."]
      ], "«Earth» suena «erz»; la «th» final es suave."),
      P([
        ["The scientist opened the door of the machine.", "La científica abrió la puerta de la máquina."],
        ["Inside, there was a small light that changed colors.", "Dentro había una pequeña luz que cambiaba de colores."],
        ["She touched it, and the room disappeared.", "La tocó y la habitación desapareció."],
        ["When she opened her eyes, she was standing in the future.", "Cuando abrió los ojos, estaba parada en el futuro."]
      ], "«scientist» suena «SAI-an-tist».")
    ]
  },
  {
    id: "fantasia", icon: "🧙", name: "Fantasía",
    items: [
      S("The dragon sleeps in the mountain.", "El dragón duerme en la montaña.", "«dragon» suena «DRÁ-gon»."),
      S("This ring has a strange power.", "Este anillo tiene un poder extraño.", "«strange» suena «streinch»."),
      S("Wait, I am a wizard?", "Espera, ¿soy un mago?", "Sube la voz al final porque es una pregunta."),
      S("The king wants to see you.", "El rey quiere verte.", "«king» termina en «ng» nasal, sin «g» fuerte."),
      S("Close your eyes and make a wish.", "Cierra los ojos y pide un deseo.", "«wish» tiene «i» corta y termina en «sh»."),
      D([
        ["Mia", "Are you a real wizard?", "¿Eres un mago de verdad?"],
        ["Old", "Yes. I have studied magic for fifty years.", "Sí. He estudiado magia durante cincuenta años."],
        ["Mia", "Can you teach me one spell?", "¿Puedes enseñarme un hechizo?"]
      ]),
      D([
        ["Mia", "The bridge is broken.", "El puente está roto."],
        ["Tor", "Then we cannot cross the river.", "Entonces no podemos cruzar el río."],
        ["Mia", "Wait. The elf has a plan.", "Espera. El elfo tiene un plan."]
      ], "«cannot» suena «CA-not»: la «a» es corta y fuerte."),
      D([
        ["Mia", "Who are you?", "¿Quién eres?"],
        ["Old", "I am a friend. I came to help you.", "Soy un amigo. Vine a ayudarte."],
        ["Mia", "How do I know I can trust you?", "¿Cómo sé que puedo confiar en ti?"]
      ], "«trust» suena «trast»."),
      P([
        ["Long ago, a small village stood at the edge of a magic forest.", "Hace mucho, un pequeño pueblo estaba al borde de un bosque mágico."],
        ["The villagers never entered it, because the trees whispered at night.", "Los aldeanos nunca entraban, porque los árboles susurraban de noche."],
        ["One day, a young girl walked inside.", "Un día, una niña entró."],
        ["She came back with a golden flower and a secret.", "Regresó con una flor dorada y un secreto."]
      ], "«whispered» suena «UIS-perd»."),
      P([
        ["The knight climbed the tower for hours.", "El caballero subió la torre durante horas."],
        ["At the top, there was a locked door.", "Arriba había una puerta cerrada con llave."],
        ["He took the silver key from his pocket and opened it.", "Sacó la llave de plata de su bolsillo y la abrió."],
        ["Inside, a princess was reading a book and waiting for him.", "Dentro, una princesa leía un libro y lo esperaba."]
      ], "«knight» suena «náit»; la «k» no se pronuncia.")
    ]
  },
  {
    id: "misterio", icon: "🔍", name: "Misterio",
    items: [
      S("Someone was in this room.", "Alguien estuvo en esta habitación.", "«someone» suena «SAM-uan»."),
      S("The door was open when I arrived.", "La puerta estaba abierta cuando llegué.", "«door» suena «dor»; la «r» es suave."),
      S("I saw a man near the window.", "Vi a un hombre cerca de la ventana.", "«window» suena «UIN-dou»."),
      S("Nobody knows where she went.", "Nadie sabe adónde fue ella.", "En «knows» la «k» no se pronuncia: «nóus»."),
      S("We must find the missing letter.", "Debemos encontrar la carta perdida.", "«letter» suena «LE-der»; la «t» suena casi como «d»."),
      D([
        ["Dee", "Where were you last night?", "¿Dónde estuviste anoche?"],
        ["Sol", "I was at home. I watched a movie.", "Estaba en casa. Vi una película."],
        ["Dee", "Can anyone confirm that?", "¿Alguien puede confirmarlo?"]
      ], "«were» suena «uer»; «movie» suena «MU-vi»."),
      D([
        ["Dee", "Look at this footprint.", "Mira esta huella."],
        ["Sol", "It is too small for an adult.", "Es demasiado pequeña para un adulto."],
        ["Dee", "Then we are looking for a child.", "Entonces buscamos a un niño o una niña."]
      ], "«adult» suena «a-DALT» o «A-dalt»."),
      D([
        ["Dee", "The clock stopped at midnight.", "El reloj se detuvo a medianoche."],
        ["Sol", "That cannot be a coincidence.", "Eso no puede ser una coincidencia."],
        ["Dee", "I agree. Somebody wanted us to see it.", "Estoy de acuerdo. Alguien quería que lo viéramos."]
      ], "«clock» suena «clok»; «coincidence» suena «ko-IN-si-dens»."),
      P([
        ["The old house was silent.", "La vieja casa estaba en silencio."],
        ["I walked slowly up the stairs, and every step made a sound.", "Subí despacio las escaleras y cada paso hacía un ruido."],
        ["At the top, I saw a light under the last door.", "Arriba vi una luz bajo la última puerta."],
        ["I took a deep breath and turned the handle.", "Respiré hondo y giré la manija."]
      ], "«breath» (respiración) termina con «th» suave: lengua entre los dientes."),
      P([
        ["The detective read the letter again.", "El detective leyó la carta otra vez."],
        ["The handwriting looked familiar, but he could not remember where he saw it.", "La letra se veía familiar, pero no recordaba dónde la había visto."],
        ["Then he opened the drawer and found an old notebook.", "Entonces abrió el cajón y encontró un cuaderno viejo."],
        ["The same handwriting was on every page.", "La misma letra estaba en todas las páginas."]
      ], "«drawer» (cajón) suena «dror».")
    ]
  },
  {
    id: "accion", icon: "💥", name: "Acción",
    items: [
      S("Get in the car, now!", "¡Sube al auto, ahora!", "«now» suena «náu»."),
      S("We don't have much time.", "No tenemos mucho tiempo.", "«much» suena «mach», con «ch» fuerte."),
      S("Stay behind me.", "Quédate detrás de mí.", "«behind» suena «bi-HÁIND»."),
      S("They are following us.", "Nos están siguiendo.", "«they» lleva «th» suave: lengua entre los dientes."),
      S("I will call for help.", "Pediré ayuda.", "«call» suena «kol»; la «l» es oscura."),
      D([
        ["Jax", "Is everyone okay?", "¿Están todos bien?"],
        ["Rin", "Yes, but the bridge is on fire.", "Sí, pero el puente está en llamas."],
        ["Jax", "Then we take the other road.", "Entonces tomamos el otro camino."]
      ]),
      D([
        ["Jax", "How many are there?", "¿Cuántos hay?"],
        ["Rin", "At least five.", "Al menos cinco."],
        ["Jax", "Okay. Here is the plan.", "Bien. Este es el plan."]
      ], "«five» suena «faiv»."),
      D([
        ["Rin", "The door is locked!", "¡La puerta está cerrada con llave!"],
        ["Jax", "Move back. I will open it.", "Retrocede. Yo la abriré."],
        ["Rin", "Hurry! I can hear them coming.", "¡Rápido! Los oigo venir."]
      ], "«hurry» suena «JÉ-ri»."),
      P([
        ["The train was moving very fast.", "El tren se movía muy rápido."],
        ["She ran across the roof, and the wind pushed her back.", "Corrió por el techo y el viento la empujaba hacia atrás."],
        ["Ahead of her, the thief was jumping from car to car.", "Delante de ella, el ladrón saltaba de vagón en vagón."],
        ["She did not stop until she reached him.", "No se detuvo hasta alcanzarlo."]
      ], "«reached» termina en sonido «t»: suena «richt»."),
      P([
        ["Three, two, one.", "Tres, dos, uno."],
        ["The engine started, and the car jumped forward.", "El motor arrancó y el auto saltó hacia adelante."],
        ["The driver turned left, then right, and passed the truck.", "El conductor giró a la izquierda, luego a la derecha, y pasó al camión."],
        ["In the mirror, the red lights were getting smaller.", "En el espejo, las luces rojas se hacían cada vez más pequeñas."]
      ], "«engine» suena «EN-yin».")
    ]
  },
  {
    id: "familia", icon: "🏠", name: "Familia",
    items: [
      S("Dinner is ready, everyone!", "¡La cena está lista, todos!", "«ready» suena «RE-di»."),
      S("I love spending time with you.", "Me encanta pasar tiempo contigo.", "«love» suena «lav», no «lov»."),
      S("Are we there yet?", "¿Ya llegamos?", "«there» y «yet» se juntan: «ar-wi-dér-yet»."),
      S("We are going to grandma's house.", "Vamos a la casa de la abuela.", "En el habla natural, «going to» suena «gona»."),
      S("I just want to go home.", "Solo quiero volver a casa.", "«want to» suena «uana». Así hablan los nativos."),
      D([
        ["Kid", "Mom, can I go to the park?", "Mamá, ¿puedo ir al parque?"],
        ["Mom", "Finish your homework first.", "Termina primero tu tarea."],
        ["Kid", "I did it already. I promise.", "Ya la hice. Lo prometo."]
      ]),
      D([
        ["Dad", "What do you want for your birthday?", "¿Qué quieres para tu cumpleaños?"],
        ["Kid", "A bicycle, please.", "Una bicicleta, por favor."],
        ["Dad", "We will see.", "Ya veremos."]
      ], "«birthday» suena «BERZ-dei»."),
      D([
        ["Kid", "I am sorry I broke the window.", "Perdón por romper la ventana."],
        ["Dad", "Thank you for telling me the truth.", "Gracias por decirme la verdad."],
        ["Kid", "Can I help you fix it?", "¿Puedo ayudarte a arreglarla?"]
      ]),
      P([
        ["Every Saturday, our family cooks together.", "Cada sábado, nuestra familia cocina junta."],
        ["My father makes the soup, and my mother makes the bread.", "Mi padre hace la sopa y mi madre hace el pan."],
        ["The children set the table and put out the plates.", "Los niños ponen la mesa y colocan los platos."],
        ["We all eat slowly and talk about our week.", "Todos comemos despacio y hablamos de nuestra semana."]
      ], "«Saturday» suena «SA-ter-dei»."),
      P([
        ["My little brother is afraid of storms.", "Mi hermano menor le teme a las tormentas."],
        ["When it rains, he comes to my room and sits next to me.", "Cuando llueve, viene a mi cuarto y se sienta a mi lado."],
        ["I read him a story until he falls asleep.", "Le leo un cuento hasta que se duerme."],
        ["In the morning, he says that he was never scared.", "Por la mañana, dice que nunca tuvo miedo."]
      ], "«asleep» suena «a-SLIP»; no digas «es-lip».")
    ]
  }
];
