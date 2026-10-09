/* TAICIMASTER FM PWA bridge client — migration branch only.
 * Requires Bridge.html to be served by the Apps Script deployment and embedded
 * in the PWA page. This client intentionally does not store credentials/tokens.
 */
(function (global) {
  'use strict';
  const SOURCE = 'taicimaster-fm-pwa';
  const BRIDGE_SOURCE = 'taicimaster-fm-api-bridge';
  const VERSION = '11.28.6-migration.1';
  const pending = new Map();
  let frame = null;
  let frameReady = false;
  let nextId = 0;
  let configured = false;
  let bridgeOrigin = '';
  const DEFAULT_TIMEOUT_MS = 45000;

  function failure(message, code) {
    const e = new Error(message || 'Komunikasi backend gagal.');
    e.code = code || 'BRIDGE_ERROR';
    return e;
  }
  function configure(options) {
    options = options || {};
    const url = String(options.bridgeUrl || '').trim();
    if (!url) throw failure('URL bridge belum dikonfigurasi.', 'CONFIG_MISSING');
    const parsed = new URL(url, global.location.href);
    if (parsed.protocol !== 'https:' || !/(^|\.)script\.google\.com$|(^|\.)script\.googleusercontent\.com$/.test(parsed.hostname)) {
      throw failure('URL bridge harus berasal dari domain Apps Script HTTPS.', 'CONFIG_INVALID');
    }
    bridgeOrigin = parsed.origin;
    frame = document.getElementById('taici-api-bridge-frame');
    if (!frame) {
      frame = document.createElement('iframe');
      frame.id = 'taici-api-bridge-frame';
      frame.title = 'TAICIMASTER API bridge';
      frame.setAttribute('aria-hidden', 'true');
      frame.tabIndex = -1;
      frame.style.cssText = 'position:fixed;width:1px;height:1px;left:-10000px;top:-10000px;border:0;visibility:hidden';
      document.body.appendChild(frame);
    }
    if (frame.src !== url) frame.src = url;
    configured = true;
  }
  function onMessage(event) {
    if (!configured || event.origin !== bridgeOrigin || !frame || event.source !== frame.contentWindow) return;
    const data = event.data || {};
    if (data.source !== BRIDGE_SOURCE || data.bridgeVersion !== VERSION) return;
    if (data.type === 'ready') { frameReady = true; return; }
    if (data.type !== 'response' || !data.id) return;
    const item = pending.get(String(data.id));
    if (!item) return;
    pending.delete(String(data.id));
    clearTimeout(item.timer);
    if (data.ok) item.resolve(data.result);
    else item.reject(failure(data.error && data.error.message, data.error && data.error.code));
  }
  global.addEventListener('message', onMessage);

  function request(fn, args) {
    return new Promise((resolve, reject) => {
      if (!configured || !frame) return reject(failure('Bridge belum dikonfigurasi.', 'CONFIG_MISSING'));
      const id = VERSION + '-' + (++nextId);
      const timer = setTimeout(() => {
        pending.delete(id);
        reject(failure('Waktu tunggu backend habis. Coba ulangi.', 'TIMEOUT'));
      }, DEFAULT_TIMEOUT_MS);
      pending.set(id, {resolve, reject, timer});
      try {
        frame.contentWindow.postMessage({source: SOURCE, type: 'request', id, fn, args}, bridgeOrigin);
      } catch (err) {
        clearTimeout(timer); pending.delete(id); reject(failure(err.message, 'POST_MESSAGE_FAILED'));
      }
    });
  }
  function makeRunner() {
    let ok = null, bad = null;
    const runner = {
      withSuccessHandler(fn) { ok = fn; return runner; },
      withFailureHandler(fn) { bad = fn; return runner; }
    };
    return new Proxy(runner, {
      get(target, prop) {
        if (prop in target) return target[prop];
        if (typeof prop !== 'string' || prop.startsWith('_')) return undefined;
        return (...args) => {
          request(prop, args).then(v => { if (typeof ok === 'function') ok(v); })
            .catch(e => { if (typeof bad === 'function') bad(e); else setTimeout(() => { throw e; }, 0); });
        };
      }
    });
  }
  global.TaiciBridge = {
    configure,
    get ready() { return frameReady; },
    run: makeRunner(),
    request,
    version: VERSION
  };
})(window);
