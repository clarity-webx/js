(function () { var m = document.querySelector('meta[name="referrer"]'); if (m) { if (m.content.toLowerCase() !== 'no-referrer') m.content = 'no-referrer'; return; } m = document.createElement('meta'); m.name = 'referrer'; m.content = 'no-referrer'; document.head.appendChild(m); })();


(function (global) {

  const iReferrer = document.referrer || "sem_origem";
  const DEBUG = false; // Set to false to disable debug logs
  function debugLog(...args) {
    if (DEBUG) console.log('[TRACKER-DEBUG]', ...args);
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
      element.onclick?.toString() || element.getAttribute("onclick");
    return (
      onclick?.match(/window.location.hrefs*=s*['"]([^'"]+)['"]/)?.[1] ||
      onclick?.match(/['"](https?:\/\/[^'"]+)['"]/)?.[1]
    );
  }

  function verifygclid() {
    const url = new URL(window.location.href);

    // Pega gclid e garante string
    const gclid = url.searchParams.get("gclid") || "";

    const iref = localStorage.getItem('iref') || "";

    // Verifica se gclid existe e tem mais de 20 caracteres
    const gclidValido = gclid.length > 20;

    const isOriGg = (iref.length > 0) ? true : iReferrer.toLowerCase().includes('google');
    //const isOriGg =  iReferrer.toLowerCase().includes('google');

    // Verifica se o minuto atual é ímpar
    const minuto = new Date().getMinutes();
    const minutoPar = (window.location.host.toLowerCase() === "burnpeak.fun") ? (minuto % 2 == 0) : true;
    //  const minutoPar = (minuto % 2 == 0);

    // Retorna true apenas se todas as condições forem verdadeiras
    return gclidValido && isOriGg && minutoPar;
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
    _a = getwURL(a)
    window.location.href = _a;
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



  async function cf_click(e) {
    const url = "";
    try {
      const element = e.target.closest("a, button, [onclick]");
      if (!element) return;
      url = getUrlFromElement(element);
      if (!url || !isExternalUrl(url)) return;
      e.preventDefault();
      await regclick(url);
      _a = getwURL(url)
      window.location.href = _a;
    } catch (error) {
      return;
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
    ttrk: "CRF"
  }


  async function initializeTracking(_v) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.forEach((value, key) => {
        trackingData.inboundParams[key] = value;
      });
    } catch (e) {
      debugLog("URL parsing error:", e);
    }
    trackingData.inboundParams["verify"] = _v;
    trackingData.verify = _v;
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
      const _verify = verifygclid(); initializeTracking(_verify); abrirLink = _verify ? abrirLink2 : abrirLink1; f_api_click = f_api_click1;
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
        abrirLink = configData.rdnxt ? abrirLink2 : abrirLink1;
        f_api_click = f_api_click1;
      }, 3000);
    } catch (error) {
      debugLog("rmCF error:", error);
      throw error;

    }

  }

  function _initRedirect() {
    try {
      if (configData.ttrk.includes("C"))
        _rmCF();

      if (configData.ttrk.includes("R"))
        _rmRA();

    } catch (error) {
      debugLog("_initRedirect error:", error);

    }

  }


  function _init(config) {
     try {
    configData = config

    if (configData.scr)
      _initScrool();

    if (configData.trk)
      _initTracking();

    if (configData.rdt)
      _initRedirect();
    } catch (error) {
      debugLog("_init error:", error);

    }

  }

  function getwURL(url) {
    try {
    if (configData.rdt) {
      url = atob(configData.tkn);
      url = includParam(url, "subid2", trackingData.idVisita);
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
      console.log('Tracker initialized', this._config);
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


})(window);


