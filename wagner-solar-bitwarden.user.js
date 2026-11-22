// ==UserScript==
// @name         Wagner Solar – Bitwarden-Fix
// @namespace    https://github.com/mod42/installateur-userscripts
// @homepageURL  https://github.com/mod42/installateur-userscripts
// @downloadURL  https://raw.githubusercontent.com/mod42/installateur-userscripts/main/wagner-solar-bitwarden.user.js
// @updateURL    https://raw.githubusercontent.com/mod42/installateur-userscripts/main/wagner-solar-bitwarden.user.js
// @version      1.0
// @description  Macht das Login im Wagner Solar Onlineshop für Bitwarden erkennbar (autocomplete-Attribute am per React nachgeladenen Formular).
// @match        https://shop.wagner-solar.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Das Login-Formular (Sana Commerce, React) wird erst nach dem Laden gerendert,
  // hat zufällige IDs je Seitenaufruf und setzt am Passwort autocomplete="off".
  function fix() {
    document.querySelectorAll('form.Login_form, form[name^="Login_"]').forEach((form) => {
      const user = form.querySelector('input[name="email"]');
      const pass = form.querySelector('input[type="password"][name="password"]');
      if (!user || !pass) return;
      if (form.getAttribute('autocomplete') !== 'on') form.setAttribute('autocomplete', 'on');
      if (user.getAttribute('autocomplete') !== 'username') user.setAttribute('autocomplete', 'username');
      if (pass.getAttribute('autocomplete') !== 'current-password') pass.setAttribute('autocomplete', 'current-password');
    });
  }

  // Single-Page-App: Formular kann jederzeit (neu) gerendert werden, z. B. im Checkout
  new MutationObserver(fix).observe(document.body, {
    childList: true, subtree: true, attributes: true, attributeFilter: ['autocomplete'],
  });
  fix();
})();
