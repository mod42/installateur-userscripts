// ==UserScript==
// @name         e-netz Installateurportal – Bitwarden-Fix
// @namespace    https://github.com/mod42/installateur-userscripts
// @homepageURL  https://github.com/mod42/installateur-userscripts
// @downloadURL  https://raw.githubusercontent.com/mod42/installateur-userscripts/main/enetz-installateurportal-bitwarden.user.js
// @updateURL    https://raw.githubusercontent.com/mod42/installateur-userscripts/main/enetz-installateurportal-bitwarden.user.js
// @version      1.1
// @description  Löst das Frameset des e-netz Installateurportals auf und setzt autocomplete-Attribute, damit Bitwarden das Login erkennt.
// @match        https://www.e-netz-suedhessen.de/installateurportal/*
// @match        https://e-netz-suedhessen.de/installateurportal/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // 1) Frameset-Hülle verlassen: Die Startseite besteht nur aus <frameset><frame src=".../portalaufgabe.jsf">.
  //    Bitwarden kann in einem Dokument ohne <body> kein Inline-Menü/Icon einblenden.
  //    -> Frame-Inhalt direkt als Hauptseite laden.
  if (window.top === window.self) {
    const frame = document.querySelector('frameset frame[src], frameset iframe[src]');
    if (frame) {
      location.replace(frame.src);
      return;
    }
  }

  // 2) Login-Formular eindeutig markieren
  const fix = () => {
    const form = document.getElementById('login');
    const user = document.getElementById('inputUserId');
    const pass = document.getElementById('inputPassword');
    if (!user || !pass) return false;
    if (form) form.setAttribute('autocomplete', 'on');
    user.setAttribute('autocomplete', 'username');
    pass.setAttribute('autocomplete', 'current-password');
    return true;
  };

  if (!fix()) {
    // falls JSF das Formular nachlädt
    const obs = new MutationObserver(() => { if (fix()) obs.disconnect(); });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 10000);
  }
})();
