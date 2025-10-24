(function() {
    const oA = EventTarget.prototype.addEventListener;
    const oR = EventTarget.prototype.removeEventListener;
    const L = [];

    const cfg = "eyJ0cm0iOlsiY2xpY2tmYXN0IiwibG9hZGVyLmpzIl0sImV2bnQiOlsiY2xpY2siXX0=";


    let config = { trm: [], evnt: [] };
    try {
        config = JSON.parse(atob(cfg));
    } catch (e) {
        console.error("[Erro]:", e);
    }

   
    if (typeof window.bkEv === "undefined") {
        window.bkEv = false;
    }


    function isBF(file) {
        if (!file) return false;
        return config.trm.some(term => file.includes(term));
    }

    function isBT(type) {
        return config.evnt.includes(type);
    }

    EventTarget.prototype.addEventListener = function(t, fn, opt) {
        if (typeof fn === "function") {
            const s = new Error().stack?.split("\n").slice(2).find(l => !l.includes("addEventListener")) || "";
            const m = s.match(/\(?(\S+):(\d+):(\d+)\)?/);
            const origin = m ? {
                file: m[1],
                line: m[2],
                col: m[3]
            } : {
                file: "unknown",
                line: "?",
                col: "?"
            };


            if (window.bkEv && isBT(t) && isBF(origin.file)) {
                return; 
            }


            L.push({
                target: this,
                type: t,
                listener: fn,
                options: opt,
                origin,
                timestamp: new Date().toISOString()
            });
        }

        return oA.call(this, t, fn, opt);
    };


    EventTarget.prototype.removeEventListener = function(t, fn, opt) {
        const i = L.findIndex(x => x.target === this && x.type === t && x.listener === fn);
        if (i > -1) L.splice(i, 1);
        return oR.call(this, t, fn, opt);
    };


    window.listListeners = (t = null, domainOrPart = null) =>
        L.filter(x => (!t || x.type === t) && (!domainOrPart || x.origin.file.includes(domainOrPart)))
         .map((x, i) => ({
            id: i,
            type: x.type,
            element: (x.target && x.target.tagName) || "other",
            file: x.origin.file,
            line: x.origin.line,
            column: x.origin.col,
            timestamp: x.timestamp,
            fn: x.listener.toString().slice(0, 120) + "..."
        }));

    window.removeAllListeners = (t = null, domainOrPart = null) => {
        const rem = L.filter(x => (!t || x.type === t) && (!domainOrPart || x.origin.file.includes(domainOrPart)));
        rem.forEach(r => {
            try {
                oR.call(r.target, r.type, r.listener, r.options);
            } catch (e) {}
            const i = L.indexOf(r);
            if (i > -1) L.splice(i, 1);
        });
        return rem.length;
    };


    window.togglebkEv = function() {
        window.bkEv = !window.bkEv;

    };


})();
  
  
    
  function _0x3add(){const _0x599311=['fetc','even','tTyp','839904ImPnoy','toLo','bind','body','ase','udes','4624000oqAHWC','41653wbVdDg','find','12ZBmhuM','isit','werC','obje','23156GNCPOK','1175321agkvFF','pars','1623300tIeEwb','94125bIKBlv','clon','incl','cf_v'];_0x3add=function(){return _0x599311;};return _0x3add();}function _0x33c9(_0xe415c6,_0x6cd251){const _0x3add68=_0x3add();return _0x33c9=function(_0x33c96e,_0x40d4ab){_0x33c96e=_0x33c96e-0x14e;let _0x22aead=_0x3add68[_0x33c96e];return _0x22aead;},_0x33c9(_0xe415c6,_0x6cd251);}(function(_0x3fb683,_0x232732){const _0x3ae877=_0x33c9,_0x56a1ac=_0x3fb683();while(!![]){try{const _0x384142=parseInt(_0x3ae877(0x153))/0x1*(-parseInt(_0x3ae877(0x155))/0x2)+-parseInt(_0x3ae877(0x164))/0x3+parseInt(_0x3ae877(0x159))/0x4+parseInt(_0x3ae877(0x15d))/0x5+parseInt(_0x3ae877(0x15c))/0x6+-parseInt(_0x3ae877(0x15a))/0x7+parseInt(_0x3ae877(0x152))/0x8;if(_0x384142===_0x232732)break;else _0x56a1ac['push'](_0x56a1ac['shift']());}catch(_0x51b9ed){_0x56a1ac['push'](_0x56a1ac['shift']());}}}(_0x3add,0x2ad0f),(function(){const _0x2f4f6f=_0x33c9;if(!window[_0x2f4f6f(0x161)+'h'])return;const _0x2a87a8=window[_0x2f4f6f(0x161)+'h'][_0x2f4f6f(0x14e)](window),_0x30698b={'fast':{'var':_0x2f4f6f(0x160)+_0x2f4f6f(0x156),'field':null,'value':null},'flow':{'var':'ft_v'+_0x2f4f6f(0x156),'field':_0x2f4f6f(0x162)+_0x2f4f6f(0x163)+'e','value':'visi'+'t'}};window[_0x2f4f6f(0x161)+'h']=async function(_0x1e76e0,_0x4b81c2){const _0x5dd9ce=_0x2f4f6f,_0x331528=_0x2a87a8(_0x1e76e0,_0x4b81c2);try{const _0x839e44=_0x1e76e0 instanceof Request?_0x1e76e0['url']:String(_0x1e76e0),_0x48c6cf=Object['keys'](_0x30698b)[_0x5dd9ce(0x154)](_0x589bd8=>_0x839e44[_0x5dd9ce(0x165)+_0x5dd9ce(0x157)+'ase']()[_0x5dd9ce(0x15f)+_0x5dd9ce(0x151)](_0x589bd8[_0x5dd9ce(0x165)+_0x5dd9ce(0x157)+_0x5dd9ce(0x150)]()));if(!_0x48c6cf)return _0x331528;const {var:_0x1a65f7,field:_0x31390b,value:_0xf883c7}=_0x30698b[_0x48c6cf];let _0x4fd9c4=null;try{let _0x1c7fc3='';if(_0x1e76e0 instanceof Request)_0x1c7fc3=await _0x1e76e0[_0x5dd9ce(0x15e)+'e']()['text']();else{if(_0x4b81c2&&_0x4b81c2[_0x5dd9ce(0x14f)])_0x1c7fc3=_0x4b81c2[_0x5dd9ce(0x14f)];}_0x4fd9c4=_0x1c7fc3?JSON[_0x5dd9ce(0x15b)+'e'](_0x1c7fc3):null;}catch{_0x4fd9c4=null;}const _0x304d99=await _0x331528;let _0x3f9f37=null;try{const _0x2c8417=_0x304d99[_0x5dd9ce(0x15e)+'e'](),_0x297bc6=await _0x2c8417['text']();_0x3f9f37=_0x297bc6?JSON[_0x5dd9ce(0x15b)+'e'](_0x297bc6):_0x297bc6;}catch{_0x3f9f37=null;}const _0x1ac9a6=_0x4fd9c4&&typeof _0x4fd9c4===_0x5dd9ce(0x158)+'ct'&&(!_0x31390b||_0x4fd9c4[_0x31390b]&&String(_0x4fd9c4[_0x31390b])['incl'+_0x5dd9ce(0x151)](_0xf883c7)),_0x4de699=_0x3f9f37&&typeof _0x3f9f37===_0x5dd9ce(0x158)+'ct'&&(!_0x31390b||_0x3f9f37[_0x31390b]&&String(_0x3f9f37[_0x31390b])[_0x5dd9ce(0x15f)+_0x5dd9ce(0x151)](_0xf883c7));return(_0x1ac9a6||_0x4de699)&&(window[_0x1a65f7]={'url':_0x839e44,'payload':_0x4fd9c4,'response':_0x3f9f37}),_0x304d99;}catch(_0x497fc7){return _0x331528;}};}()));