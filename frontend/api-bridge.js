/* TAICIMASTER FM — Stage 11.27 Production API Bridge
 * Compatibility layer: keeps the existing google.script.run call style while
 * routing requests through the same-origin PHP proxy. No business module rewrite.
 */
(function(){
  'use strict';
  const cfg = window.TAICIMASTER_CONFIG || {};
  const endpoint = cfg.API_PROXY_URL || './api-proxy.php';
  function makeRunner(success, failure){
    const target = {
      withSuccessHandler(fn){ return makeRunner(typeof fn==='function'?fn:success, failure); },
      withFailureHandler(fn){ return makeRunner(success, typeof fn==='function'?fn:failure); },
      withUserObject(){ return this; }
    };
    return new Proxy(target, {
      get(obj, prop){
        if(prop in obj) return obj[prop];
        return function(){
          const args = Array.prototype.slice.call(arguments);
          fetch(endpoint, {method:'POST', headers:{'Content-Type':'application/json'}, credentials:'same-origin', body:JSON.stringify({functionName:String(prop), args:args})})
            .then(function(r){ return r.text().then(function(t){ let d; try{d=JSON.parse(t);}catch(e){throw new Error('Respons server tidak valid.');} if(!r.ok || d.success===false && d.__transportError) throw new Error(d.message||'Request gagal.'); return d; }); })
            .then(function(res){ if(typeof success==='function') success(res); })
            .catch(function(err){ if(typeof failure==='function') failure({message:err&&err.message?err.message:String(err)}); });
        };
      }
    });
  }
  window.google = window.google || {};
  window.google.script = window.google.script || {};
  window.google.script.run = makeRunner(null, null);
})();
