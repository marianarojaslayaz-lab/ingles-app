/* =====================================================
   NUBE: inicio de sesión con Google y guardado en Firebase.
   Si FIREBASE_CONFIG está en null, no hace nada y la app
   sigue guardando solo en el dispositivo.
   ===================================================== */

const VERSION = "10.12.2";
const BASE = `https://www.gstatic.com/firebasejs/${VERSION}/`;

function emitir(detalle) {
  window.nubeEstado = detalle;
  window.dispatchEvent(new CustomEvent("nube-estado", { detail: detalle }));
}

async function iniciar() {
  const cfg = window.FIREBASE_CONFIG;
  if (!cfg || !cfg.apiKey) { emitir({ estado: "sin-config" }); return; }

  let appMod, authMod, fsMod;
  try {
    [appMod, authMod, fsMod] = await Promise.all([
      import(BASE + "firebase-app.js"),
      import(BASE + "firebase-auth.js"),
      import(BASE + "firebase-firestore.js")
    ]);
  } catch (e) { emitir({ estado: "sin-conexion" }); return; }

  const app = appMod.initializeApp(cfg);
  const auth = authMod.getAuth(app);
  const db = fsMod.getFirestore(app);
  let timer = null;

  const refDe = (uid) => fsMod.doc(db, "usuarios", uid);

  async function enviar() {
    const u = auth.currentUser;
    if (!u) return;
    try {
      await fsMod.setDoc(refDe(u.uid), { ...leerAvance(), actualizado: Date.now() });
    } catch (e) { console.warn("No se pudo guardar en la nube", e); }
  }

  window.nubeProgramarEnvio = () => {
    if (!auth.currentUser) return;
    clearTimeout(timer);
    timer = setTimeout(enviar, 1500);
  };

  async function sincronizar(u) {
    emitir({ estado: "cargando", mensaje: "Trayendo tu avance…" });
    try {
      const snap = await fsMod.getDoc(refDe(u.uid));
      const nube = snap.exists() ? snap.data() : {};
      const mezcla = mezclarAvance(leerAvance(), nube);
      guardarAvanceLocal(mezcla);
      await fsMod.setDoc(refDe(u.uid), { ...mezcla, actualizado: Date.now() });
      if (typeof renderStreak === "function") renderStreak();
      if (typeof renderGenres === "function") renderGenres();
      if (typeof clRenderTopics === "function") clRenderTopics();
      window.dispatchEvent(new Event("avance-actualizado"));
      emitir({ estado: "dentro", nombre: (u.displayName || "").split(" ")[0] });
    } catch (e) {
      if (e && e.code === "permission-denied") {
        await authMod.signOut(auth);
        emitir({ estado: "fuera", mensaje: "Esa cuenta no tiene permiso para guardar datos aquí. Entra con la cuenta autorizada." });
      } else {
        emitir({ estado: "dentro", nombre: (u.displayName || "").split(" ")[0],
          mensaje: "Entraste, pero no pude sincronizar ahora. Se reintentará al guardar." });
      }
    }
  }

  window.nube = {
    entrar: async () => {
      const proveedor = new authMod.GoogleAuthProvider();
      try { await authMod.signInWithPopup(auth, proveedor); }
      catch (e) {
        if (e && (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment")) {
          await authMod.signInWithRedirect(auth, proveedor);
        } else if (e && e.code === "auth/popup-closed-by-user") {
          emitir({ estado: "fuera" });
        } else {
          emitir({ estado: "fuera", mensaje: "No se pudo iniciar sesión (" + ((e && e.code) || "error") + "). Inténtalo otra vez." });
        }
      }
    },
    salir: async () => { await authMod.signOut(auth); }
  };

  authMod.onAuthStateChanged(auth, (u) => {
    if (u) sincronizar(u); else emitir({ estado: "fuera" });
  });
}

iniciar();
