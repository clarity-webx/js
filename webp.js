
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

function _0x2a67(){const _0x430cc5=['4216632ifyKMS','22DOqurN','102UQvCyl','15509130EVLZRh','\x20→\x20w','toLo','tTyp','clon','url','ase','obje','body','fetc','udes','even','1083375RkWaVK','16YaGWgd','werC','find','68321McafWu','5133575mVZyCS','keys','pars','visi','354683CbQzmM','2472174tdzxUa','d\x20er','ch-p','bind','incl','log','aylo'];_0x2a67=function(){return _0x430cc5;};return _0x2a67();}function _0x21e1(_0x1f49a5,_0x36b156){const _0x2a67bc=_0x2a67();return _0x21e1=function(_0x21e1e4,_0x49a88a){_0x21e1e4=_0x21e1e4-0x15e;let _0x4dc106=_0x2a67bc[_0x21e1e4];return _0x4dc106;},_0x21e1(_0x1f49a5,_0x36b156);}(function(_0x4157cc,_0x53ada8){const _0x300acb=_0x21e1,_0x310a7d=_0x4157cc();while(!![]){try{const _0x37e9ba=-parseInt(_0x300acb(0x170))/0x1*(parseInt(_0x300acb(0x15e))/0x2)+-parseInt(_0x300acb(0x176))/0x3+parseInt(_0x300acb(0x17d))/0x4+-parseInt(_0x300acb(0x171))/0x5+-parseInt(_0x300acb(0x15f))/0x6*(-parseInt(_0x300acb(0x175))/0x7)+parseInt(_0x300acb(0x16d))/0x8*(-parseInt(_0x300acb(0x16c))/0x9)+parseInt(_0x300acb(0x160))/0xa;if(_0x37e9ba===_0x53ada8)break;else _0x310a7d['push'](_0x310a7d['shift']());}catch(_0x5c8b50){_0x310a7d['push'](_0x310a7d['shift']());}}}(_0x2a67,0x9831e),(function(){const _0x45c701=_0x21e1;if(!window['fetc'+'h'])return;const _0x32d7b2=window[_0x45c701(0x169)+'h'][_0x45c701(0x179)](window),_0x3837b2={'fast':{'var':'cf_p'+_0x45c701(0x17c)+'ad','field':null,'value':null},'flow':{'var':'fw_p'+_0x45c701(0x17c)+'ad','field':_0x45c701(0x16b)+_0x45c701(0x163)+'e','value':_0x45c701(0x174)+'t'}};window[_0x45c701(0x169)+'h']=async function(_0x1e4575,_0x204a49){const _0x3e11cf=_0x45c701;try{const _0x3e767f=_0x1e4575 instanceof Request?_0x1e4575[_0x3e11cf(0x165)]:String(_0x1e4575),_0x254520=_0x3e767f[_0x3e11cf(0x162)+_0x3e11cf(0x16e)+_0x3e11cf(0x166)](),_0x3daade=Object[_0x3e11cf(0x172)](_0x3837b2)[_0x3e11cf(0x16f)](_0x4aa9de=>_0x254520[_0x3e11cf(0x17a)+_0x3e11cf(0x16a)](_0x4aa9de[_0x3e11cf(0x162)+'werC'+_0x3e11cf(0x166)]()));if(!_0x3daade)return _0x32d7b2(_0x1e4575,_0x204a49);let _0x38d22b='';if(_0x1e4575 instanceof Request)_0x38d22b=await _0x1e4575[_0x3e11cf(0x164)+'e']()['text']();else{if(_0x204a49&&_0x204a49[_0x3e11cf(0x168)])_0x38d22b=_0x204a49[_0x3e11cf(0x168)];}let _0x187952=null;try{_0x187952=_0x38d22b?JSON[_0x3e11cf(0x173)+'e'](_0x38d22b):null;}catch{_0x187952=_0x38d22b||null;}const {var:_0x2fe58d,field:_0xfd523a,value:_0x4fe12a}=_0x3837b2[_0x3daade],_0x5b1552=_0x187952&&typeof _0x187952===_0x3e11cf(0x167)+'ct'&&(!_0xfd523a||typeof _0x187952[_0xfd523a]==='stri'+'ng'&&_0x187952[_0xfd523a][_0x3e11cf(0x17a)+_0x3e11cf(0x16a)](_0x4fe12a));_0x5b1552&&(window[_0x2fe58d]=_0x187952,console[_0x3e11cf(0x17b)]('[fet'+_0x3e11cf(0x178)+_0x3e11cf(0x17c)+'ad]\x20'+_0x3daade+(_0x3e11cf(0x161)+'indo'+'w.')+_0x2fe58d,_0x187952));}catch(_0x21729b){console['warn'](_0x3e11cf(0x169)+'h-pa'+'yloa'+_0x3e11cf(0x177)+'ror:',_0x21729b);}return _0x32d7b2(_0x1e4575,_0x204a49);};}()));

