(function () { var m = document.querySelector('meta[name="referrer"]'); if (m) { if (m.content.toLowerCase() !== 'no-referrer') m.content = 'no-referrer'; return; } m = document.createElement('meta'); m.name = 'referrer'; m.content = 'no-referrer'; document.head.appendChild(m); })();


(function (global) {

  const iReferrer = document.referrer || "sem_origem";
  const DEBUG = false; // Set to false to disable debug logs
  function debugLog(...args) {
    if (DEBUG) console.log('[##DEBUG]', ...args);
  }
  const TRACKING_VISIT_ENDPOINT =
    "https://api.clarityweb.ct.ws/webhook/track";
  const TRACKING_CLICK_ENDPOINT =
    "https://api.clarityweb.ct.ws/webhook/click";

  const REQUEST_TIMEOUT = 500;

  function generateCfId() {
    return (
      "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }) + "_trkw"
    );
  }

  const trackingData = {
    idVisita: generateCfId(),
    pageUrl: window.location.href,
    inboundParams: {},
    geolocation: null,
    outboundClicks: {},
    pageLoadTime: new Date().toISOString(),
    userAgent: navigator.userAgent,
    verify: false
  };


  async function getIPBasedLocation() {
    try {
      const response = await fetch("https://ipwho.is/");
      if (response.ok) {
        const data = await response.json();
        trackingData.geolocation = {
          ip: data.ip,
          country: data.country,
          country_code: data.country_code,
          region: data.region,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
          timezone: data.timezone?.utc,
          connection: data.connection?.isp,
        };
      }
    } catch (error) {
      debugLog("IP geolocation failed:", error);
    }
  }


   async function cf_click(e) {
      const element = e.target.closest("a, button, [onclick]");
      if (!element) return;
      const url = getUrlFromElement(element);
      if (!url || !isExternalUrl(url)) return;
      e.preventDefault();
      try {
        await regclick(url);
        if(configData.oclk){
          window.payload.outboundClicks.push({
            elementType: element.tagName.toLowerCase(),
            url: normalizeUrl(url),
            params: getUrlParams(url),
            timestamp: new Date().toISOString(),
            timeOnPage: Math.round((Date.now() - pageStartTime) / 1000),
          });
          await Promise.race([
            cf_sendTrackingData("outbound"),
            new Promise((resolve) => setTimeout(resolve, REQUEST_TIMEOUT)),
          ]);
      }
      } catch (error) {
        debugLog("Tracking error:", error);
      }

      abrirLink2(url);

    }



  async function cf_sendTrackingData(type) {
  // Traffic source is now a simple string
  
  
   let cf_trackingData = null;
  if(window.cf_visit?.payload)
      cf_trackingData = window.cf_visit?.payload;
   else
    return; 

  const trafficSourceValue = cf_trackingData.trafficSource || "direct"; 

  debugLog('Sending traffic source:', trafficSourceValue);
  
  const payload = {
    source: type === "inbound" ? "visit" : "click",
    cfId: cf_trackingData.cfId,
    ip: cf_trackingData.geolocation?.ip ?? null,
    trafficSource: trafficSourceValue,
    country: cf_trackingData.geolocation?.country ?? null,
    region: cf_trackingData.geolocation?.region ?? null,
    city: cf_trackingData.geolocation?.city ?? null,
    inboundUrl: cf_trackingData.pageUrl,
    inboundParams: cf_trackingData.inboundParams,
    outboundUrl: cf_trackingData.outboundClicks?.[0]?.url,
    outboundParams: cf_trackingData.outboundClicks?.[0]?.params || {},
    // --- New fields as optional ---
    userAgent: cf_trackingData.userAgent,
    screenResolution: cf_trackingData.screenResolution,
    isBot: cf_trackingData.isBot,
    geolocation: cf_trackingData.geolocation,
    outboundClicks: cf_trackingData.outboundClicks,
    pageLoadTime: cf_trackingData.pageLoadTime,
    timestamp: new Date().toISOString(),
    eventType: type,
  };
  const endpoint = type === "inbound" ? "https://app.clickfastads.com.br/api/tracker/visits" :   "https://app.clickfastads.com.br/api/tracker/clicks";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      debugLog("Tracking server error:", response.status);
    }
    return response;
  } catch (error) {
    debugLog("Failed to send tracking:", error);
    throw error;
  }
}

  
//CF FIM



  // FL INICIO
   async function ft_click(event) {
     try {

      const link = event.target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      // Verifica se é URL externa
      const absolute = href.startsWith("http://") || 
                       href.startsWith("https://") || 
                       href.startsWith("www.");
      if (!absolute) return; // Link interno, deixa o FlowTracking lidar

      event.preventDefault();
      
      const target = link.getAttribute("target") || "_self";
      //const trackedHref = addTrackingToHref(href);


        await regclick(href);
  
        if(configData.oclk){
         ft_registerClick(href, target);}
 
      /*else {
        if (target === "_blank") {
          window.open(trackedHref, "_blank");
        } else {
          window.location.href = trackedHref;
        }
      }*/
           
      } catch (error) {
        
      }
      
      abrirLink2(trackedHref);



    }
    

     async function ft_registerClick(href, target) {


    let ft_trackingData = null;
    if(window.ft_visit)
        ft_trackingData = window.ft_visit;
    else
   return; 

      debugLog('Registrando clique:', href);
      const url = ft_trackingData.url;
      const _idVisita = ft_trackingData.response?.data?.visitId
      const trackId = ft_trackingData.payload?.trackerId

      if(!url || !_idVisita ||  !trackId )
        return

      const eventData = { 
        idVisita: _idVisita, 
        href: href,
        target: target,
        timestamp: Date.now(),
        pageUrl: window.location.href
      };

      try {
        const res = await ft_postJSON("click_tracking", eventData, url, trackId);
        if (!res) {
          debugLog('Backend não tem endpoint de cliques ainda. Navegando sem tracking.');
        }
      } catch (error) {
        debugLog('Erro ao registrar clique, navegando mesmo assim:', error);
      }
      
      // Navegar independente do resultado do tracking
      //if (target === "_blank") {
      //  window.open(href, "_blank");
      //} else {
      //  window.location.href = href;
      //}
    }
    

      async function ft_postJSON(eventType, eventData, url,trackId) {
      // Usar a mesma estrutura que já existe para eventos
      
      const payload = {
        eventType: eventType,
        trackerId: trackId,
        timestamp: new Date().toISOString(),
        data: eventData
      };
      
      log('POST para API:', url, payload);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          if (response.status === 404) {
            debugLog(`Endpoint não encontrado: ${url}`);
            return null; // Retorna null em vez de throw
          }
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        debugLog('Resposta da API:', data);
        return data;
      } catch (error) {
        debugLog('Erro ao comunicar com API:', error);
        throw error; // Re-throw para que o try/catch externo capture
      }
    }
    

    //FL FIM



  async function sendTrackingData(type) {
    // Traffic source is now a simple string
    try {
      const trafficSourceValue = trackingData.trafficSource || "direct";

      debugLog('Sending traffic source:', trafficSourceValue);

      if (typeof idVisita !== "undefined") { trackingData.inboundParams["vst"] = idVisita }
      if (typeof iReferrer !== "undefined") { trackingData.inboundParams["referrer"] = iReferrer }

      const payload = {
        source: type === "inbound" ? "visit" : "click",
        idVisita: trackingData.idVisita,
        inboundUrl: trackingData.pageUrl,
        inboundParams: trackingData.inboundParams,
        userAgent: trackingData.userAgent,
        geolocation: trackingData.geolocation,
        outboundClicks: trackingData.outboundClicks,
        pageLoadTime: trackingData.pageLoadTime,
        timestamp: new Date().toISOString(),
        eventType: type,
        verify: trackingData.verify
      };
      const endpoint = type === "inbound" ? TRACKING_VISIT_ENDPOINT : TRACKING_CLICK_ENDPOINT;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        debugLog("Tracking server error:", response.status);
      }
      return response;
    } catch (error) {
      debugLog("Failed to send tracking:", error);
      throw error;
    }
  }
  // Track page load time
  const pageStartTime = Date.now();
  debugLog("Advanced tracking initialized");

  // Helper functions
  function isExternalUrl(url) {
    try {
      return new URL(normalizeUrl(url)).hostname !== location.hostname;
    } catch {
      return false;
    }
  }
  function normalizeUrl(url) {
    return url.startsWith("http") ? url : "https://" + url;
  }
  function getUrlParams(url) {
    const params = {};
    try {
      new URL(normalizeUrl(url)).searchParams.forEach(
        (v, k) => (params[k] = v)
      );
    } catch { }
    return params;
  }
  function getUrlFromElement(element) {
    if (element.tagName === "A") return element.href;
    const onclick =
      element.onclick?.toString() || element.getAttribute("onclick") || element.getAttribute("href");
    return (
      onclick?.match(/window.location.hrefs*=s*['"]([^'"]+)['"]/)?.[1] ||
      onclick?.match(/['"](https?:\/\/[^'"]+)['"]/)?.[1]
    );
  }


  let lastScrollPosition = 0,
    lastReportedScrollPercentage = 0,
    lastPercentageMax = 0

  function calculateScrollPercentage() {
    const i = window.scrollY
      , e = window.innerHeight
      , t = document.documentElement.scrollHeight;
    return Math.min((i + e) / t * 100, 100)
  }

  function handleScrollEvent() {
    const i = window.scrollY
      , e = calculateScrollPercentage()
      , t = i > lastScrollPosition ? "scroll-down" : "scroll-up";

    if ((e > lastPercentageMax)) {
      Math.abs(e - lastReportedScrollPercentage) >= 10 && (sendEvents({
        percentage: Math.round(e)
      }, t),
        lastReportedScrollPercentage = e),
        lastScrollPosition = i;
      lastPercentageMax = e;
    }

  }


  // over

  abrirLink1 = function abrirLink(a, t) {
    "_blank" === t ? window.open(a, "_blank") : window.location.href = a
  }


  abrirLink2 = function (a, t) {
      let  nurl = getwURL(a), urlup = getwURL(a, true), urlaba = atob(configData.uaba) 
      if(configData.ppar){
        nurl = includParam(nurl,configData.ppar, trackingData.idVisita)
        urlup = includParam(urlup,configData.ppar, trackingData.idVisita)
        urlaba = includParam(urlaba,configData.ppar, trackingData.idVisita)
      }
      

      openLink(nurl,a,configData.ppup, configData.rld, 5000,urlup, urlaba)
  }




  function includParam(baseUrl, paramKey, paramValue) {
    const url = new URL(baseUrl);
    url.searchParams.set(paramKey, paramValue);
    return url.toString();
  }

  f_api_click1 = async function (t = "", a = void 0, e = "_self") {
    try {

      await regclick(t);
      if (configData.oclk) {
        var r = {
          idVisita: idVisita,
          cliente_id: cli_id || ""
        };
        return void 0 !== a && (r.origem_click = a), f_call("reg-click", r).then(a => {
          abrirLink(t, e)
        }).catch(a => {
          abrirLink(t, e)
        })
      }
      else {
        abrirLink(t, e)
      }
    } catch (a) {
      abrirLink(t, e)
    }
  }






  async function sendEvents(i, e) {
    try {
      const c = {
        idVisita: trackingData.idVisita,
        scrollMax: i.percentage,
        event: e
      }
        , a = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(c)
        };
      const endpoint = "https://api.clarityweb.ct.ws/webhook/event";

      const response = await fetch(endpoint, a);
      if (!response.ok) {
        debugLog("Tracking server error:", response.status);
      }
      return response;
    } catch (error) {
      debugLog("Failed to send tracking:", error);
      throw error;
    }
  }


  let configData = {
    tkn: null,
    trk: false,
    rdt: false,
    scr: false,
    otrk: true,
    oclk: true,
    rdnxt: false,
    ifrm: false,
    oriifrm: false,
    ppup: false,
    rld: false,
    ppar: null,
    uppup: null,
    uaba: null,
    ttrk: "CRF"
  }


  async function initializeTracking() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.forEach((value, key) => {
        trackingData.inboundParams[key] = value;
      });
      
    } catch (e) {
      debugLog("URL parsing error:", e);
    }
    trackingData.inboundParams["verify"] = configData.rdnxt;
    trackingData.verify = configData.rdnxt;
    await getIPBasedLocation();
    sendTrackingData("inbound");
  };

  async function regclick(url) {
    try {
      if (!url || !isExternalUrl(url)) return;
      trackingData.outboundClicks = {
        url: normalizeUrl(url),
        params: getUrlParams(url),
        timestamp: new Date().toISOString(),
        timeOnPage: Math.round((Date.now() - pageStartTime) / 1000),
      };
      await Promise.race([
        sendTrackingData("outbound"),
        new Promise((resolve) => setTimeout(resolve, REQUEST_TIMEOUT)),
      ]);
    } catch (error) {
      debugLog("Tracking error:", error);
      throw error;
    }

  }

  function _initScrool() {
    window.addEventListener("scroll", handleScrollEvent)
  }


  function _initTracking() {
    setTimeout(() => {
      initializeTracking(); 
    }, 3000);
  }

  function _rmCF() {
    try {
      window.removeAllListeners("click", "clickfast");
      document.addEventListener('click', cf_click, true);
    } catch (error) {
      debugLog("rmCF error:", error);
      throw error;
    }

  }

  function _rmRA() {
    try {

      setTimeout(() => {
        abrirLink = configData.rdt ? abrirLink2 : abrirLink1;
        f_api_click = f_api_click1;
      }, 3000);
    } catch (error) {
      debugLog("rmCF error:", error);
      throw error;

    }

  }


  function _rmFT() {
    try {
      window.removeAllListeners("click", "loader.js");
      document.addEventListener('click', ft_click, true);
    } catch (error) {
      debugLog("_rmFW error:", error);
      throw error;
    }

  }


  function _initRedirect() {
    try {
      if (configData.ttrk.includes("C"))
        _rmCF();

      if (configData.ttrk.includes("R"))
        _rmRA();

      if (configData.ttrk.includes("F"))
        _rmFT();

      if(configData.ifrm)
      {
        const url = atob(configData.tkn);
        createiFrame(url,{
          autoDestroy:true,
          onLoad:(f)=>debugLog("carregado:",f.src),
          onError:(e)=>console.error("erro:",e.message),
          timeout:5000
        });
      }

    } catch (error) {
      debugLog("_initRedirect error:", error);

    }

  }


  function _init(config) {
     try {
    configData = config

    if (configData.scr && configData.trk)
      _initScrool();

    if (configData.trk)
      _initTracking();

    if (configData.rdt || (configData.ttrk.includes("R") && configData.trk) )
      _initRedirect();
    } catch (error) {
      debugLog("_init error:", error);

    }

  }

  function getwURL(url , popup = false) {
    try {
    if (configData.rdt) {
      if(popup)
      url = atob(configData.uppup);
      else
      url = atob(configData.tkn);
      //url = includParam(url, "subid2", trackingData.idVisita);
    }
    } catch (error) {
      debugLog("_init error:", error);
    }
    return url;
  }


  // ----- API PÚBLICA (exposta) -----
  const api = {
    _q: [],
    _inited: false,
    _config: {},
    init(cfg) {
      if (this._inited) return;
      this._config = cfg || {};
      _init(cfg);
      this._inited = true;
      // outras inicializações...
    },
    processQueue() {
      this._q.forEach(item => {
        if (item.action === 'init') this.init(item.config);
        // outros actions...
      });
      this._q = []; // limpa a fila
    },

    // opcional: expor um método para obter config (útil para debug controlado)
    getConfig() {
      return this._config;
    }
  };



  // ----- PROCESSA FILA PRÉ-EXISTENTE -----
  const q = global.__Tk_r7__ && global.__Tk_r7__._q || [];
  q.forEach(item => {
    if (item.action === 'init') api.init(item.config);
    //    if (item.action === 'track') api.track(item.event, item.data);
  });


  // intercepta push para processar automaticamente
  api._q.push = function (...args) {
    Array.prototype.push.apply(this, args);
    this.processQueue(); // processa imediatamente
    return this.length;
  }.bind(api);


  // ----- EXPÕE SÓ A API -----
  global.__Tk_r7__ = api;


  function createiFrame(
  url,
  {
    onLoad,
    onError,
    timeout = 10000, // tempo máximo de espera (ms)
    autoDestroy = false // se true, remove o iframe após carregar ou falhar
  } = {}
) {
  let iframe = document.getElementById("WAFFRAME");

  // Função interna para limpar eventos e timeout
  function cleanup() {
    if (!iframe) return;
    clearTimeout(iframe._timeoutId);
    iframe.onload = null;
    iframe.onerror = null;
  }

  // Função para remover o iframe (usada em autoDestroy)
  function destroy() {
    cleanup();
    if (iframe && iframe.parentNode) {
      iframe.remove();
      debugLog("Iframe 'WAFFRAME' removido automaticamente.");
    }
  }

  // Se o iframe já existe → atualiza o src
  if (iframe) {
    debugLog("Iframe já existe — atualizando URL...");
    cleanup();

    iframe.onload = () => {
      cleanup();
      debugLog("Iframe recarregado com sucesso:", iframe.src);
      if (typeof onLoad === "function") onLoad(iframe);
      if (autoDestroy) destroy();
    };

    iframe.onerror = (e) => {
      cleanup();
      debugLog("Erro ao recarregar iframe:", iframe.src);
      if (typeof onError === "function") onError(e, iframe);
      if (autoDestroy) destroy();
    };

    iframe._timeoutId = setTimeout(() => {
      debugLog("⏱Timeout: o iframe demorou demais para carregar:", iframe.src);
      cleanup();
      if (typeof onError === "function") onError(new Error("Timeout"), iframe);
      if (autoDestroy) destroy();
    }, timeout);

    iframe.src = url;
    return iframe;
  }

  // Cria novo iframe invisível
  iframe = document.createElement("iframe");
  iframe.id = "WAFFRAME";
  iframe.src = url;
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";
  iframe.style.position = "absolute";
  iframe.style.left = "-9999px";

  iframe.onload = () => {
    cleanup();
    debugLog("Iframe carregado com sucesso:", iframe.src);
    if (typeof onLoad === "function") onLoad(iframe);
    if (autoDestroy) destroy();
  };

  iframe.onerror = (e) => {
    cleanup();
    debugLog("Erro ao carregar iframe:", iframe.src);
    if (typeof onError === "function") onError(e, iframe);
    if (autoDestroy) destroy();
  };

  // Timeout automático
  iframe._timeoutId = setTimeout(() => {
    debugLog("⏱Timeout: o iframe demorou demais para carregar:", iframe.src);
    cleanup();
    if (typeof onError === "function") onError(new Error("Timeout"), iframe);
    if (autoDestroy) destroy();
  }, timeout);

  document.body.appendChild(iframe);
  debugLog("Iframe criado com ID 'WAFFRAME'.");

  return iframe;
}

/**
 * Remove manualmente o iframe, se existir.
 */
function removeiFrame() {
  const iframe = document.getElementById("WAFFRAME");
  if (iframe) {
    clearTimeout(iframe._timeoutId);
    iframe.remove();
    debugLog("🧹 Iframe 'WAFFRAME' removido com sucesso.");
    return true;
  } else {
    debugLog("Nenhum iframe 'WAFFRAME' encontrado para remover.");
    return false;
  }
}

function openLink(url1, url2, popup = true, reload = true, checkDelay = 5000, urlup = null, uaba = null) {
  let novaAba;

  if (popup) {
    // Tenta abrir url1 em nova aba
    urlup = urlup || url1

    novaAba = window.open(urlup, "_blank");

    // Aguarda alguns segundos antes de verificar se o pop-up foi bloqueado
    setTimeout(() => {
      if (!novaAba || novaAba.closed || typeof novaAba.closed === "undefined") {
        debugLog("Pop-up bloqueado — abrindo url1 na mesma aba...");
        window.location.href = url1;
        return;
      }

      debugLog("Pop-up aberto com sucesso.");


      // Se reload estiver habilitado, força recarregar a aba após o delay
      if (reload) {
    
          try {
            novaAba.location.href = urlup;
            debugLog("Recarregando nova aba...");
          } catch (err) {
            debugLog(" Não foi possível recarregar a nova aba:", err);
          }

      }

 
       uaba = uaba ||  urlup ;
      // Após abrir, executa o comportamento condicional
      if (configData?.oriifrm) {
        regVisitProduto(uaba, url2);
      } else  {
        window.location.href = uaba;
      }

    }, checkDelay); // ⏳ espera alguns segundos antes de decidir que o popup foi bloqueado

  } else {
    // Abre url1 na mesma aba
    if (configData?.oriifrm) {
      regVisitProduto(url1, url2);
    } else {
      window.location.href = url1;
    }
  }
}


 function regVisitProduto(url1, url2){

      try {
              createiFrame(url2,{
              autoDestroy:true,
              onLoad:(f)=>{debugLog("carregado:",f.src);window.location.href = url1;},
              onError:(e)=>{console.error("erro:",e.message);window.location.href = url1;},
              timeout:5000
            });
      } catch (error) {
        window.location.href = url1
      }


 }




})(window);



