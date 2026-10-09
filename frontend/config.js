/* Konfigurasi deployment TAICIMASTER FM.
 * Jangan memasukkan password, token, atau rahasia ke file ini.
 * APP_URL dipertahankan untuk launcher lama; BRIDGE_URL hanya aktif setelah
 * endpoint ?bridge=1 dipasang dan diuji di Apps Script.
 */
window.TAICIMASTER_CONFIG = Object.freeze({
  APP_URL: "https://script.google.com/macros/s/AKfycbwpdO_qeEQaR3c-Idp4eZfTQL4SKLTx0NIQKDxSwDmYUtn8xYwy3MaecF0gujji8iKHYQ/exec",
  BRIDGE_URL: "https://script.google.com/macros/s/AKfycbwpdO_qeEQaR3c-Idp4eZfTQL4SKLTx0NIQKDxSwDmYUtn8xYwy3MaecF0gujji8iKHYQ/exec?bridge=1",
  PWA_ORIGIN: "https://appfathanmubina.github.io",
  APP_VERSION: "11.28.6-migration.2"
});
