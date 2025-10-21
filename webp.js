
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


  
function _0x5bda(_0x2d20b5,_0x49cdeb){const _0x2445da=_0x2445();return _0x5bda=function(_0x5bda63,_0x697c04){_0x5bda63=_0x5bda63-0x194;let _0x1cce1c=_0x2445da[_0x5bda63];return _0x1cce1c;},_0x5bda(_0x2d20b5,_0x49cdeb);}(function(_0x5d6d14,_0x494a07){const _0x3386b8=_0x5bda,_0x412782=_0x5d6d14();while(!![]){try{const _0x3b53da=-parseInt(_0x3386b8(0x1a1))/0x1*(-parseInt(_0x3386b8(0x1b7))/0x2)+parseInt(_0x3386b8(0x1a5))/0x3+-parseInt(_0x3386b8(0x194))/0x4+parseInt(_0x3386b8(0x197))/0x5*(parseInt(_0x3386b8(0x199))/0x6)+-parseInt(_0x3386b8(0x1a7))/0x7*(parseInt(_0x3386b8(0x1b3))/0x8)+-parseInt(_0x3386b8(0x19b))/0x9+parseInt(_0x3386b8(0x1b6))/0xa;if(_0x3b53da===_0x494a07)break;else _0x412782['push'](_0x412782['shift']());}catch(_0x40418b){_0x412782['push'](_0x412782['shift']());}}}(_0x2445,0x3557f),(function(){const _0x508c89=_0x5bda;if(!window['fetc'+'h'])return;const _0xf37e88=window['fetc'+'h'][_0x508c89(0x1aa)](window),_0x393bf7={'fast':{'var':_0x508c89(0x1b8)+_0x508c89(0x1b1),'field':null,'value':null},'flow':{'var':_0x508c89(0x1a4)+'isit','field':_0x508c89(0x1ac)+'tTyp'+'e','value':_0x508c89(0x1b9)+'t'}};window[_0x508c89(0x19d)+'h']=async function(_0x4a0eb4,_0x18080e){const _0x9bc08d=_0x508c89,_0x3a1135=_0xf37e88(_0x4a0eb4,_0x18080e);try{const _0x2f1d13=_0x4a0eb4 instanceof Request?_0x4a0eb4[_0x9bc08d(0x196)]:String(_0x4a0eb4),_0x30459e=Object['keys'](_0x393bf7)[_0x9bc08d(0x19e)](_0x50c5a5=>_0x2f1d13['toLo'+_0x9bc08d(0x1ab)+_0x9bc08d(0x1ae)]()['incl'+_0x9bc08d(0x195)](_0x50c5a5[_0x9bc08d(0x19a)+_0x9bc08d(0x1ab)+_0x9bc08d(0x1ae)]()));if(!_0x30459e)return _0x3a1135;const {var:_0x258ae7,field:_0x4a848c,value:_0x8a7aad}=_0x393bf7[_0x30459e];let _0x2eafc5=null;try{let _0x2c4202='';if(_0x4a0eb4 instanceof Request)_0x2c4202=await _0x4a0eb4[_0x9bc08d(0x19c)+'e']()[_0x9bc08d(0x1ad)]();else{if(_0x18080e&&_0x18080e['body'])_0x2c4202=_0x18080e[_0x9bc08d(0x1b5)];}_0x2eafc5=_0x2c4202?JSON['pars'+'e'](_0x2c4202):null;}catch{_0x2eafc5=null;}const _0x362cab=await _0x3a1135;let _0x17fd7a=null;try{const _0x280194=_0x362cab[_0x9bc08d(0x19c)+'e'](),_0xefcfdb=await _0x280194['text']();_0x17fd7a=_0xefcfdb?JSON[_0x9bc08d(0x19f)+'e'](_0xefcfdb):_0xefcfdb;}catch{_0x17fd7a=null;}const _0x13ef58=_0x2eafc5&&typeof _0x2eafc5===_0x9bc08d(0x1a8)+'ct'&&(!_0x4a848c||_0x2eafc5[_0x4a848c]&&String(_0x2eafc5[_0x4a848c])[_0x9bc08d(0x1a9)+'udes'](_0x8a7aad)),_0x516dc5=_0x17fd7a&&typeof _0x17fd7a===_0x9bc08d(0x1a8)+'ct'&&(!_0x4a848c||_0x17fd7a[_0x4a848c]&&String(_0x17fd7a[_0x4a848c])[_0x9bc08d(0x1a9)+_0x9bc08d(0x195)](_0x8a7aad));return(_0x13ef58||_0x516dc5)&&(window[_0x258ae7]={'url':_0x2f1d13,'payload':_0x2eafc5,'response':_0x17fd7a},console[_0x9bc08d(0x1b4)](_0x9bc08d(0x1b2)+_0x9bc08d(0x1a6)+_0x9bc08d(0x1a3)+_0x9bc08d(0x198)+_0x30459e+(_0x9bc08d(0x1af)+'indo'+'w.')+_0x258ae7,window[_0x258ae7])),_0x362cab;}catch(_0x4d9bb7){return console[_0x9bc08d(0x1a2)]('fetc'+_0x9bc08d(0x1b0)+'ptur'+'e\x20er'+_0x9bc08d(0x1a0),_0x4d9bb7),_0x3a1135;}};}()));function _0x2445(){const _0x3f605a=['26988DLnsfP','toLo','2495304cEiyfw','clon','fetc','find','pars','ror:','176647GKFKxG','warn','aptu','ft_v','390105pKNXyQ','ch-c','12201STDcFZ','obje','incl','bind','werC','even','text','ase','\x20→\x20w','h-ca','isit','[fet','248wCyATg','log','body','5313740FmTrdO','2QrADen','cf_v','visi','1566904JExiET','udes','url','115dtlqmx','re]\x20'];_0x2445=function(){return _0x3f605a;};return _0x2445();}