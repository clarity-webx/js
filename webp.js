
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


  
(function(_0x559081,_0xe4c647){const _0x41ea15=_0x1266,_0x1600b0=_0x559081();while(!![]){try{const _0x48b263=parseInt(_0x41ea15(0x19e))/0x1+parseInt(_0x41ea15(0x193))/0x2+-parseInt(_0x41ea15(0x183))/0x3+-parseInt(_0x41ea15(0x19b))/0x4+-parseInt(_0x41ea15(0x19c))/0x5+-parseInt(_0x41ea15(0x195))/0x6*(parseInt(_0x41ea15(0x189))/0x7)+parseInt(_0x41ea15(0x186))/0x8;if(_0x48b263===_0xe4c647)break;else _0x1600b0['push'](_0x1600b0['shift']());}catch(_0xf1a5df){_0x1600b0['push'](_0x1600b0['shift']());}}}(_0x15b6,0xd5ba8),(function(){const _0x505c6f=_0x1266;if(!window[_0x505c6f(0x188)+'h'])return;const _0x4bef8e=window[_0x505c6f(0x188)+'h'][_0x505c6f(0x187)](window),_0xc640ff={'fast':{'var':'cf_v'+_0x505c6f(0x185),'field':null,'value':null},'flow':{'var':'ft_v'+_0x505c6f(0x185),'field':_0x505c6f(0x19f)+_0x505c6f(0x19d)+'e','value':'visi'+'t'}};window[_0x505c6f(0x188)+'h']=async function(_0xbac113,_0xe59e9d){const _0x2ce92f=_0x505c6f,_0x27307f=_0x4bef8e(_0xbac113,_0xe59e9d);try{const _0x2ae622=_0xbac113 instanceof Request?_0xbac113[_0x2ce92f(0x197)]:String(_0xbac113),_0x3951aa=Object[_0x2ce92f(0x18a)](_0xc640ff)[_0x2ce92f(0x191)](_0x3dd093=>_0x2ae622[_0x2ce92f(0x19a)+_0x2ce92f(0x190)+_0x2ce92f(0x199)]()[_0x2ce92f(0x192)+'udes'](_0x3dd093['toLo'+_0x2ce92f(0x190)+_0x2ce92f(0x199)]()));if(!_0x3951aa)return _0x27307f;const {var:_0x2e563d,field:_0x557aa4,value:_0x4b79a6}=_0xc640ff[_0x3951aa];let _0xea57ee=null;try{let _0x36f618='';if(_0xbac113 instanceof Request)_0x36f618=await _0xbac113[_0x2ce92f(0x18d)+'e']()[_0x2ce92f(0x184)]();else{if(_0xe59e9d&&_0xe59e9d[_0x2ce92f(0x194)])_0x36f618=_0xe59e9d['body'];}_0xea57ee=_0x36f618?JSON[_0x2ce92f(0x196)+'e'](_0x36f618):null;}catch{_0xea57ee=null;}const _0x18c302=await _0x27307f;let _0x174c33=null;try{const _0x1e2334=_0x18c302[_0x2ce92f(0x18d)+'e'](),_0xc83c20=await _0x1e2334[_0x2ce92f(0x184)]();_0x174c33=_0xc83c20?JSON[_0x2ce92f(0x196)+'e'](_0xc83c20):_0xc83c20;}catch{_0x174c33=null;}const _0x22d48c=_0xea57ee&&typeof _0xea57ee==='obje'+'ct'&&(!_0x557aa4||_0xea57ee[_0x557aa4]&&String(_0xea57ee[_0x557aa4])[_0x2ce92f(0x192)+'udes'](_0x4b79a6)),_0x41379d=_0x174c33&&typeof _0x174c33===_0x2ce92f(0x18e)+'ct'&&(!_0x557aa4||_0x174c33[_0x557aa4]&&String(_0x174c33[_0x557aa4])[_0x2ce92f(0x192)+_0x2ce92f(0x198)](_0x4b79a6));return(_0x22d48c||_0x41379d)&&(window[_0x2e563d]={'url':_0x2ae622,'payload':_0xea57ee,'response':_0x174c33}),_0x18c302;}catch(_0x5b8bce){return console['warn']('fetc'+_0x2ce92f(0x18c)+_0x2ce92f(0x18b)+_0x2ce92f(0x18f)+'ror:',_0x5b8bce),_0x27307f;}};}()));function _0x1266(_0x572581,_0x30c5f8){const _0x15b667=_0x15b6();return _0x1266=function(_0x126618,_0x264b28){_0x126618=_0x126618-0x183;let _0x2b40fd=_0x15b667[_0x126618];return _0x2b40fd;},_0x1266(_0x572581,_0x30c5f8);}function _0x15b6(){const _0x40d762=['body','5262laSiHO','pars','url','udes','ase','toLo','1278040cFAzUI','8353770lpqOVo','tTyp','1501933YEKQRC','even','5194671OKyWiV','text','isit','18239112BabQJl','bind','fetc','4893fkEDOj','keys','ptur','h-ca','clon','obje','e\x20er','werC','find','incl','2856908AdfFkP'];_0x15b6=function(){return _0x40d762;};return _0x15b6();}

