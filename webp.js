
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


  

(function(_0x4f898a,_0x5a081d){const _0x16467c=_0x71f8,_0x5dee68=_0x4f898a();while(!![]){try{const _0x2f9e44=parseInt(_0x16467c(0x130))/0x1*(parseInt(_0x16467c(0x139))/0x2)+-parseInt(_0x16467c(0x135))/0x3*(parseInt(_0x16467c(0x12b))/0x4)+-parseInt(_0x16467c(0x13a))/0x5*(parseInt(_0x16467c(0x132))/0x6)+-parseInt(_0x16467c(0x142))/0x7+-parseInt(_0x16467c(0x143))/0x8+-parseInt(_0x16467c(0x138))/0x9+parseInt(_0x16467c(0x140))/0xa;if(_0x2f9e44===_0x5a081d)break;else _0x5dee68['push'](_0x5dee68['shift']());}catch(_0x5bb69e){_0x5dee68['push'](_0x5dee68['shift']());}}}(_0x2833,0x4bfb7),(function(){const _0x4a3b32=_0x71f8;if(!window[_0x4a3b32(0x136)+'h'])return;const _0x17778a=window['fetc'+'h']['bind'](window),_0x44057b={'fast':{'var':_0x4a3b32(0x12f)+_0x4a3b32(0x12a),'field':null,'value':null},'flow':{'var':_0x4a3b32(0x13e)+_0x4a3b32(0x12a),'field':'even'+_0x4a3b32(0x137)+'e','value':_0x4a3b32(0x141)+'t'}};window[_0x4a3b32(0x136)+'h']=async function(_0x2eca0d,_0x36413a){const _0xa5b7f2=_0x4a3b32,_0xf0e772=_0x17778a(_0x2eca0d,_0x36413a);try{const _0x39950a=_0x2eca0d instanceof Request?_0x2eca0d['url']:String(_0x2eca0d),_0x507543=Object[_0xa5b7f2(0x13b)](_0x44057b)['find'](_0x4b0722=>_0x39950a[_0xa5b7f2(0x144)+_0xa5b7f2(0x13c)+_0xa5b7f2(0x12d)]()[_0xa5b7f2(0x12c)+_0xa5b7f2(0x134)](_0x4b0722['toLo'+_0xa5b7f2(0x13c)+_0xa5b7f2(0x12d)]()));if(!_0x507543)return _0xf0e772;const {var:_0x1fe882,field:_0x492480,value:_0x3f63ca}=_0x44057b[_0x507543];let _0x2c20dd=null;try{let _0x11d008='';if(_0x2eca0d instanceof Request)_0x11d008=await _0x2eca0d[_0xa5b7f2(0x131)+'e']()[_0xa5b7f2(0x13d)]();else{if(_0x36413a&&_0x36413a[_0xa5b7f2(0x133)])_0x11d008=_0x36413a[_0xa5b7f2(0x133)];}_0x2c20dd=_0x11d008?JSON['pars'+'e'](_0x11d008):null;}catch{_0x2c20dd=null;}const _0x425dcb=await _0xf0e772;let _0x4d3464=null;try{const _0x43599f=_0x425dcb[_0xa5b7f2(0x131)+'e'](),_0x1aee2e=await _0x43599f[_0xa5b7f2(0x13d)]();_0x4d3464=_0x1aee2e?JSON[_0xa5b7f2(0x12e)+'e'](_0x1aee2e):_0x1aee2e;}catch{_0x4d3464=null;}const _0x3ebcb9=_0x2c20dd&&typeof _0x2c20dd===_0xa5b7f2(0x13f)+'ct'&&(!_0x492480||_0x2c20dd[_0x492480]&&String(_0x2c20dd[_0x492480])['incl'+_0xa5b7f2(0x134)](_0x3f63ca)),_0xa788eb=_0x4d3464&&typeof _0x4d3464===_0xa5b7f2(0x13f)+'ct'&&(!_0x492480||_0x4d3464[_0x492480]&&String(_0x4d3464[_0x492480])[_0xa5b7f2(0x12c)+'udes'](_0x3f63ca));return(_0x3ebcb9||_0xa788eb)&&(window[_0x1fe882]={'url':_0x39950a,'payload':_0x2c20dd,'response':_0x4d3464}),_0x425dcb;}catch(_0x262adf){return _0xf0e772;}};}()));function _0x71f8(_0x315543,_0x87f81b){const _0x28331e=_0x2833();return _0x71f8=function(_0x71f8ee,_0x1b8246){_0x71f8ee=_0x71f8ee-0x12a;let _0x2bb6ab=_0x28331e[_0x71f8ee];return _0x2bb6ab;},_0x71f8(_0x315543,_0x87f81b);}function _0x2833(){const _0x1cf0ba=['obje','9567050bRXzjz','visi','1823976HpqRev','2340536jhGPci','toLo','isit','8WplkQX','incl','ase','pars','cf_v','7961udWbiR','clon','12162LSDaoJ','body','udes','754452UnkJUe','fetc','tTyp','1300275PxLyfL','142hGgIgm','25LjeBho','keys','werC','text','ft_v'];_0x2833=function(){return _0x1cf0ba;};return _0x2833();}
