# Installateur-Userscripts

Kleine Userscripts (Tampermonkey/Violentmonkey) für Webportale, die Elektro- und PV-Installateure im Alltag
nutzen. Jedes Script ist einzeln installierbar, versioniert und aktualisiert sich automatisch.

| Script | Seite | Was es macht | Installieren |
|---|---|---|---|
| e-netz Installateurportal – Bitwarden-Fix | e-netz-suedhessen.de/installateurportal | Löst das veraltete Frameset auf und setzt `autocomplete`-Attribute, damit Bitwarden Icon und Auswahlliste anzeigt | [installieren](https://raw.githubusercontent.com/mod42/installateur-userscripts/main/enetz-installateurportal-bitwarden.user.js) |
| UNI ELEKTRO – Bitwarden-Fix | unielektro.de | Entfernt das doppelte (versteckte) Login-Formular auf `/login` und ersetzt `autocomplete="off"` durch korrekte Werte | [installieren](https://raw.githubusercontent.com/mod42/installateur-userscripts/main/unielektro-bitwarden.user.js) |
| Reonic – Suchfeld leeren (×) | portal.reonic.de | Fügt Suchfeldern ein × zum Löschen des Suchbegriffs hinzu; Esc leert das Feld ebenfalls | [installieren](https://raw.githubusercontent.com/mod42/installateur-userscripts/main/reonic-search-clear.user.js) |

## Installation

1. [Tampermonkey](https://www.tampermonkey.net/) in Chrome installieren.
2. In neueren Chrome-Versionen unter `chrome://extensions` bei Tampermonkey **„Nutzerscripts zulassen“**
   aktivieren (bzw. den Entwicklermodus).
3. Beim gewünschten Script auf **installieren** klicken – Tampermonkey zeigt dann den Installationsdialog.

Updates holt Tampermonkey selbst (standardmäßig täglich, sofort über „Nach Userscript-Updates suchen“).

## Details

### e-netz Installateurportal

Die Startseite ist ein `<frameset>` ohne `<body>`; das Login liegt im Frame
`/installateurportal/secure/portalaufgabe.jsf`. Bitwarden kann in der Frameset-Hülle kein Inline-Menü
einblenden. Das Script lädt den Frame-Inhalt direkt als Hauptseite.

### UNI ELEKTRO

Auf `/login` existieren zwei Login-Formulare mit identischer Passwort-Feld-ID (sichtbares Seitenformular und
verstecktes Header-Popup). Bitwarden kann dadurch das unsichtbare Formular füllen. Hinweis: Das Popup-Login
wird per JavaScript abgeschickt, daher bietet Bitwarden dort ggf. kein Speichern neuer Passwörter an.

### Reonic

Das Leeren wird der Seite wie eine normale Eingabe gemeldet (React-kompatibel), die Liste wird also wirklich
zurückgesetzt.

## Lizenz

MIT
