
(function(){
  const oA=EventTarget.prototype.addEventListener,
        oR=EventTarget.prototype.removeEventListener;
  const L=[];


  EventTarget.prototype.addEventListener=function(t,fn,opt){
    if(typeof fn==="function"){
      const s=new Error().stack?.split("\n").slice(2).find(l=>!l.includes("addEventListener"))||"";
      const m=s.match(/\(?(\S+):(\d+):(\d+)\)?/);
      const origin=m?{file:m[1],line:m[2],col:m[3]}:{file:"unknown",line:"?",col:"?"};
      L.push({target:this,type:t,listener:fn,options:opt,origin,timestamp:new Date().toISOString()});
    }
    return oA.call(this,t,fn,opt);
  };


  EventTarget.prototype.removeEventListener=function(t,fn,opt){
    const i=L.findIndex(x=>x.target===this && x.type===t && x.listener===fn);
    if(i>-1) L.splice(i,1);
    return oR.call(this,t,fn,opt);
  };


  window.listListeners=(t="click",domainOrPart=null)=>
    L.filter(x=>(!t||x.type===t)&&(!domainOrPart||x.origin.file.includes(domainOrPart)))
     .map((x,i)=>({
        id:i,
        type:x.type,
        element:(x.target&&x.target.tagName)||"other",
        file:x.origin.file,
        line:x.origin.line,
        column:x.origin.col,
        timestamp:x.timestamp,
        fn:x.listener.toString().slice(0,120)+"..."
     }));


  window.removeAllListeners=(t="click",domainOrPart=null)=>{
    const rem=L.filter(x=>(!t||x.type===t)&&(!domainOrPart||x.origin.file.includes(domainOrPart)));
    rem.forEach(r=>{
      try{oR.call(r.target,r.type,r.listener,r.options);}catch(e){}
      const i=L.indexOf(r);
      if(i>-1) L.splice(i,1);
    });
    return rem.length;
  };

})();


  


  (function(){
  if(!window.fetch) return;
  const _f = window.fetch.bind(window);

const termos = {
    fast:       { var: "cf_visit", field: null, value: null},
    flow:  { var: "ft_visit",  field: "eventType",     value: "visit" }
  };


  window.fetch = async function(input, init){
    const execFetch = _f(input, init);
    try {
      const url = input instanceof Request ? input.url : String(input);
      const termo = Object.keys(termos).find(t => url.toLowerCase().includes(t.toLowerCase()));
      if(!termo) return execFetch;

      const { var: nomeObj, field, value } = termos[termo];
      let payload = null;

      // --- Captura o body enviado ---
      try {
        let txt = "";
        if(input instanceof Request) txt = await input.clone().text();
        else if(init && init.body) txt = init.body;
        payload = txt ? JSON.parse(txt) : null;
      } catch {
        payload = null;
      }

      // --- Espera e captura o response ---
      const response = await execFetch;
      let responseData = null;
      try {
        const clone = response.clone();
        const txt = await clone.text();
        responseData = txt ? JSON.parse(txt) : txt;
      } catch {
        responseData = null;
      }

      // --- Verificação opcional de campo/valor ---
      const validoPayload =
        payload && typeof payload === "object" &&
        (!field || (payload[field] && String(payload[field]).includes(value)));

      const validoResponse =
        responseData && typeof responseData === "object" &&
        (!field || (responseData[field] && String(responseData[field]).includes(value)));

      // --- Grava no window ---
      if(validoPayload || validoResponse){
        window[nomeObj] = { url, payload, response: responseData };
        console.log(`[fetch-capture] ${termo} → window.${nomeObj}`, window[nomeObj]);
      }

      return response;
    } catch(e){
      console.warn("fetch-capture error:", e);
      return execFetch;
    }
  };
})();
