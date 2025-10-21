
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



function _0x257f(){const _0x5b0aed=['toLo','udes','h-pa','even','visi','pars','tTyp','24NpYsDQ','335312WHzHyM','find','fetc','40EmDwKB','text','fw_p','[fet','ad]\x20','aylo','ase','249386LxSkUA','2528680LtADtN','3755rntBXp','obje','body','bind','\x20→\x20w','werC','keys','yloa','indo','clon','155268XfLFdq','1838697iWheyi','3pVkaze','warn','ror:','9726FmSThH','incl','25463746zkulMw'];_0x257f=function(){return _0x5b0aed;};return _0x257f();}function _0xc4f0(_0x428ccf,_0x3e0b85){const _0x257fb9=_0x257f();return _0xc4f0=function(_0xc4f03b,_0x33e093){_0xc4f03b=_0xc4f03b-0x112;let _0x366630=_0x257fb9[_0xc4f03b];return _0x366630;},_0xc4f0(_0x428ccf,_0x3e0b85);}(function(_0x53b2e3,_0x256038){const _0x554dc8=_0xc4f0,_0x19d86b=_0x53b2e3();while(!![]){try{const _0x2d909f=-parseInt(_0x554dc8(0x118))/0x1+parseInt(_0x554dc8(0x122))/0x2*(-parseInt(_0x554dc8(0x130))/0x3)+-parseInt(_0x554dc8(0x123))/0x4+parseInt(_0x554dc8(0x124))/0x5*(-parseInt(_0x554dc8(0x133))/0x6)+-parseInt(_0x554dc8(0x12f))/0x7*(-parseInt(_0x554dc8(0x117))/0x8)+parseInt(_0x554dc8(0x12e))/0x9*(-parseInt(_0x554dc8(0x11b))/0xa)+parseInt(_0x554dc8(0x135))/0xb;if(_0x2d909f===_0x256038)break;else _0x19d86b['push'](_0x19d86b['shift']());}catch(_0x32dc09){_0x19d86b['push'](_0x19d86b['shift']());}}}(_0x257f,0xb0d79),(function(){const _0x52fd0e=_0xc4f0;if(!window[_0x52fd0e(0x11a)+'h'])return;const _0x3d6134=window['fetc'+'h'][_0x52fd0e(0x127)](window),_0x29a0b0={'fast':{'var':'cf_p'+_0x52fd0e(0x120)+'ad','field':null,'value':null},'flow':{'var':_0x52fd0e(0x11d)+_0x52fd0e(0x120)+'ad','field':_0x52fd0e(0x113)+_0x52fd0e(0x116)+'e','value':_0x52fd0e(0x114)+'t'}};window[_0x52fd0e(0x11a)+'h']=async function(_0x337e94,_0x32a53f){const _0x18263b=_0x52fd0e;try{const _0x2a7891=_0x337e94 instanceof Request?_0x337e94['url']:String(_0x337e94),_0x262d9a=_0x2a7891['toLo'+_0x18263b(0x129)+_0x18263b(0x121)](),_0x1c826d=Object[_0x18263b(0x12a)](termos)[_0x18263b(0x119)](_0x310e46=>_0x262d9a[_0x18263b(0x134)+_0x18263b(0x137)](_0x310e46[_0x18263b(0x136)+_0x18263b(0x129)+_0x18263b(0x121)]()));if(!_0x1c826d)return _0x3d6134(_0x337e94,_0x32a53f);let _0x2cef38='';if(_0x337e94 instanceof Request)_0x2cef38=await _0x337e94[_0x18263b(0x12d)+'e']()[_0x18263b(0x11c)]();else{if(_0x32a53f&&_0x32a53f[_0x18263b(0x126)])_0x2cef38=_0x32a53f[_0x18263b(0x126)];}let _0x2c0955=null;try{_0x2c0955=_0x2cef38?JSON[_0x18263b(0x115)+'e'](_0x2cef38):null;}catch{_0x2c0955=_0x2cef38||null;}const {var:_0x19356e,field:_0x270a7e,value:_0x105a4d}=_0x29a0b0[_0x1c826d],_0xbbb711=_0x2c0955&&typeof _0x2c0955===_0x18263b(0x125)+'ct'&&(!_0x270a7e||typeof _0x2c0955[_0x270a7e]==='stri'+'ng'&&_0x2c0955[_0x270a7e][_0x18263b(0x134)+_0x18263b(0x137)](_0x105a4d));_0xbbb711&&(window[_0x19356e]=_0x2c0955,console['log'](_0x18263b(0x11e)+'ch-p'+'aylo'+_0x18263b(0x11f)+_0x1c826d+(_0x18263b(0x128)+_0x18263b(0x12c)+'w.')+_0x19356e,_0x2c0955));}catch(_0x479897){console[_0x18263b(0x131)]('fetc'+_0x18263b(0x112)+_0x18263b(0x12b)+'d\x20er'+_0x18263b(0x132),_0x479897);}return _0x3d6134(_0x337e94,_0x32a53f);};}()));
