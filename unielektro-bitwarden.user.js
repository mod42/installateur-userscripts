// ==UserScript==
// @name         UNI ELEKTRO – Bitwarden-Fix
// @namespace    https://github.com/mod42/installateur-userscripts
// @homepageURL  https://github.com/mod42/installateur-userscripts
// @downloadURL  https://raw.githubusercontent.com/mod42/installateur-userscripts/main/unielektro-bitwarden.user.js
// @updateURL    https://raw.githubusercontent.com/mod42/installateur-userscripts/main/unielektro-bitwarden.user.js
// @version      1.1
// @description  Macht das Login im UNI ELEKTRO Online-Shop für Bitwarden erkennbar (autocomplete-Attribute, doppeltes Login-Formular auf /login entfernen).
// @match        https://www.unielektro.de/*
// @match        https://unielektro.de/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const LOGIN_FORMS = ['#login-page-form', '#loginForm'];

  // 1) Auf /login gibt es zwei Login-Formulare mit identischen IDs (#password):
  //    das sichtbare Seitenformular und das versteckte aus dem Header-Popup.
  //    Bitwarden füllt dann ggf. das falsche (unsichtbare) Formular.
  //    -> Das versteckte Popup-Formular dort entfernen.
  if (document.querySelector('#login-page-form')) {
    const modalForm = document.querySelector('#loginModal #loginForm');
    if (modalForm) modalForm.remove();
  }

  // 2) autocomplete="off" durch korrekte Werte ersetzen
  for (const sel of LOGIN_FORMS) {
    const form = document.querySelector(sel);
    if (!form) continue;
    form.setAttribute('autocomplete', 'on');
    const user = form.querySelector('input[name="user"]');
    const pass = form.querySelector('input[type="password"]');
    if (user) user.setAttribute('autocomplete', 'username');
    if (pass) pass.setAttribute('autocomplete', 'current-password');
  }

  // 3) "Passwort vergessen"-Felder klar als nicht-Login markieren,
  //    damit Bitwarden den Benutzernamen nicht dort einträgt
  document.querySelectorAll('#forgotPasswordForm input[name="username"], #loginPageForgotPasswordForm input[name="username"]')
    .forEach((i) => i.setAttribute('autocomplete', 'off'));
})();
