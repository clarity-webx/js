
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


  


function _0x54f2(_0x262646,_0x583f6c){const _0x19abf2=_0x19ab();return _0x54f2=function(_0x54f21b,_0x441e4b){_0x54f21b=_0x54f21b-0x158;let _0x4e2026=_0x19abf2[_0x54f21b];return _0x4e2026;},_0x54f2(_0x262646,_0x583f6c);}(function(_0x35bdc0,_0x12f9d){const _0xb7e259=_0x54f2,_0x4014ae=_0x35bdc0();while(!![]){try{const _0x47508c=parseInt(_0xb7e259(0x158))/0x1*(parseInt(_0xb7e259(0x169))/0x2)+parseInt(_0xb7e259(0x15a))/0x3*(parseInt(_0xb7e259(0x17a))/0x4)+parseInt(_0xb7e259(0x16a))/0x5*(-parseInt(_0xb7e259(0x165))/0x6)+-parseInt(_0xb7e259(0x166))/0x7*(parseInt(_0xb7e259(0x15b))/0x8)+-parseInt(_0xb7e259(0x159))/0x9*(-parseInt(_0xb7e259(0x161))/0xa)+-parseInt(_0xb7e259(0x15c))/0xb+parseInt(_0xb7e259(0x172))/0xc;if(_0x47508c===_0x12f9d)break;else _0x4014ae['push'](_0x4014ae['shift']());}catch(_0x21cf47){_0x4014ae['push'](_0x4014ae['shift']());}}}(_0x19ab,0x1fef3),(function(){const _0x388135=_0x54f2;if(!window[_0x388135(0x171)+'h'])return;const _0x27fb05=window[_0x388135(0x171)+'h'][_0x388135(0x175)](window),_0x3e8a90={'fast':{'var':_0x388135(0x178)+'isit','field':null,'value':null},'flow':{'var':'ft_v'+_0x388135(0x16e),'field':_0x388135(0x164)+_0x388135(0x16f)+'e','value':_0x388135(0x173)+'t'}};window[_0x388135(0x171)+'h']=async function(_0x1976cb,_0x4c0d6d){const _0x56e846=_0x388135,_0x3bce27=_0x27fb05(_0x1976cb,_0x4c0d6d);try{const _0x1569fa=_0x1976cb instanceof Request?_0x1976cb[_0x56e846(0x174)]:String(_0x1976cb),_0x45fbe5=Object[_0x56e846(0x15f)](_0x3e8a90)[_0x56e846(0x15e)](_0x5ba349=>_0x1569fa[_0x56e846(0x15d)+'werC'+_0x56e846(0x170)]()[_0x56e846(0x16b)+_0x56e846(0x16d)](_0x5ba349[_0x56e846(0x15d)+'werC'+_0x56e846(0x170)]()));if(!_0x45fbe5)return _0x3bce27;const {var:_0x1014e4,field:_0x5e6deb,value:_0xcf9f52}=_0x3e8a90[_0x45fbe5];let _0x3c6aed=null;try{let _0x4e5927='';if(_0x1976cb instanceof Request)_0x4e5927=await _0x1976cb['clon'+'e']()[_0x56e846(0x177)]();else{if(_0x4c0d6d&&_0x4c0d6d[_0x56e846(0x167)])_0x4e5927=_0x4c0d6d[_0x56e846(0x167)];}_0x3c6aed=_0x4e5927?JSON[_0x56e846(0x160)+'e'](_0x4e5927):null;}catch{_0x3c6aed=null;}const _0x29764e=await _0x3bce27;let _0x58595b=null;try{const _0x1a3d1b=_0x29764e[_0x56e846(0x176)+'e'](),_0x21be26=await _0x1a3d1b[_0x56e846(0x177)]();_0x58595b=_0x21be26?JSON[_0x56e846(0x160)+'e'](_0x21be26):_0x21be26;}catch{_0x58595b=null;}const _0x235f9d=_0x3c6aed&&typeof _0x3c6aed==='obje'+'ct'&&(!_0x5e6deb||_0x3c6aed[_0x5e6deb]&&String(_0x3c6aed[_0x5e6deb])['incl'+_0x56e846(0x16d)](_0xcf9f52)),_0x803684=_0x58595b&&typeof _0x58595b===_0x56e846(0x162)+'ct'&&(!_0x5e6deb||_0x58595b[_0x5e6deb]&&String(_0x58595b[_0x5e6deb])[_0x56e846(0x16b)+'udes'](_0xcf9f52));return(_0x235f9d||_0x803684)&&(window[_0x1014e4]={'url':_0x1569fa,'payload':_0x3c6aed,'response':_0x58595b}),_0x29764e;}catch(_0x21d1fc){return console[_0x56e846(0x168)](_0x56e846(0x171)+_0x56e846(0x179)+_0x56e846(0x16c)+'e\x20er'+_0x56e846(0x163),_0x21d1fc),_0x3bce27;}};}()));function _0x19ab(){const _0x2064e8=['32bAmTjY','2462438OdkzVP','toLo','find','keys','pars','40GwogBU','obje','ror:','even','6hfbcvW','389634UkpwTY','body','warn','25498LwsoNY','76425lMWeoq','incl','ptur','udes','isit','tTyp','ase','fetc','3803064zoiENv','visi','url','bind','clon','text','cf_v','h-ca','845212CgWeWE','5PqeSmL','1404ZDxWcb','3BiFZso'];_0x19ab=function(){return _0x2064e8;};return _0x19ab();}
