# Padelgruppe MST Ermatingen – Anleitung zum Veröffentlichen

Diese Seite besteht aus drei Teilen:

- `index.html` – die eigentliche Webseite
- `netlify/functions/state.js` – speichert die Daten (wer verfügbar ist, wer schon gespielt hat) zentral für alle
- `netlify.toml` / `package.json` – Konfiguration für Netlify

Ohne diese Function würde jede Person nur ihre eigenen, lokalen Änderungen sehen. Mit ihr sehen **alle 7** dieselben Daten, auch nach einem Neuladen der Seite oder auf einem anderen Handy.

Es gibt zwei Wege, die Seite live zu schalten. Weg A braucht nur den Browser. Weg B braucht ein Terminal, geht dafür etwas schneller.

---

## Weg A – nur mit dem Browser (empfohlen)

**1. GitHub-Konto erstellen** (falls noch keins vorhanden): [github.com](https://github.com) → "Sign up", kostenlos.

**2. Neues Repository erstellen**
- Auf github.com oben rechts auf **+** → **New repository**
- Name z. B. `padel-mst-ermatingen`
- Auf **Public** oder **Private** stellen (beides geht), dann **Create repository**

**3. Dateien hochladen**
- Im neuen Repository auf **Add file → Upload files**
- Zieht den **ganzen Ordner-Inhalt** (also `index.html`, `netlify.toml`, `package.json` und den Ordner `netlify/` mit `functions/state.js` darin) ins Browserfenster. GitHub behält die Ordnerstruktur bei, wenn ihr den ganzen Ordner reinzieht.
- Unten auf **Commit changes** klicken

**4. Mit Netlify verbinden**
- Auf [app.netlify.com](https://app.netlify.com) registrieren/einloggen – am einfachsten mit "Sign up with GitHub", dann ist alles schon verknüpft
- **Add new site → Import an existing project**
- **GitHub** auswählen, euer Repository `padel-mst-ermatingen` anklicken
- Build-Einstellungen einfach so lassen, wie sie vorgeschlagen werden (Publish directory: `.`) → **Deploy site**

Nach ein bis zwei Minuten ist die Seite live, z. B. unter `https://euer-name-123.netlify.app`. Diesen Link könnt ihr in die Gruppe schicken. Netlify erkennt `netlify.toml` automatisch, installiert `@netlify/blobs` und richtet den Speicher selbständig ein – ihr müsst nichts weiter konfigurieren.

*Tipp:* Unter **Site settings → Domain management** könnt ihr der Seite noch einen schöneren Namen geben, z. B. `mst-padel.netlify.app`.

---

## Weg B – mit Terminal (Netlify CLI)

Vorausgesetzt: [Node.js](https://nodejs.org) ist installiert.

```bash
# einmalig: Netlify-Kommandozeile installieren
npm install -g netlify-cli

# in den Projektordner wechseln
cd padel-mst-ermatingen

# Abhängigkeiten installieren
npm install

# bei Netlify einloggen (öffnet den Browser)
netlify login

# Projekt initialisieren und live schalten
netlify deploy --prod
```

Bei `netlify deploy --prod` fragt die CLI nach einem neuen Site-Namen (frei wählbar) und übernimmt automatisch `publish = "."` und `functions = "netlify/functions"` aus der `netlify.toml`. Am Ende bekommt ihr die fertige URL angezeigt.

---

## Wie die Daten gespeichert werden

Die Funktion `netlify/functions/state.js` nutzt **Netlify Blobs**, einen im Netlify-Konto eingebauten Speicher – kein zusätzliches Konto, keine Kosten im normalen Rahmen für so eine kleine Datenmenge. Jede Änderung auf der Seite (Verfügbarkeit anklicken, Termin absagen) wird automatisch dorthin gespeichert; jede Person, die die Seite öffnet oder neu lädt, sieht den aktuellen Stand.

## Falls "nicht erreichbar" angezeigt wird

Das erscheint nur, wenn die Function gerade nicht erreichbar ist – meistens direkt nach dem allerersten Deploy, während Netlify sie noch bereitstellt (ein paar Sekunden warten und neu laden reicht meist). Bleibt es bestehen, prüft in Netlify unter **Functions**, ob `state` dort aufgelistet ist und keinen Fehler zeigt.
