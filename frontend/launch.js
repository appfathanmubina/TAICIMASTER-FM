(() => {
  "use strict";
  const config = window.TAICIMASTER_CONFIG || {};
  const status = document.getElementById("launch-status");
  const launchButton = document.getElementById("launch-button");
  const url = String(config.APP_URL || "").trim();

  function validAppUrl(value) {
    try {
      const parsed = new URL(value);
      return parsed.protocol === "https:" && /script\.google\.com$/.test(parsed.hostname) && /\/macros\/s\//.test(parsed.pathname);
    } catch (_) {
      return false;
    }
  }

  if (validAppUrl(url)) {
    status.textContent = "Deployment aplikasi terkonfigurasi. Menyiapkan aplikasi…";
    launchButton.hidden = false;
    launchButton.addEventListener("click", () => {
      window.location.assign(url);
    });
    // Keep an explicit launch button available in case automatic navigation is blocked.
    window.setTimeout(() => {
      if (document.visibilityState === "visible") window.location.assign(url);
    }, 700);
  } else {
    status.textContent = "PWA shell sudah dimuat. URL deployment Web App Apps Script belum dikonfigurasi.";
    launchButton.hidden = true;
    document.getElementById("setup-note").hidden = false;
  }

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(error => {
        console.error("Pendaftaran service worker gagal:", error);
      });
    });
  }
})();
