(function(){
  var raiz=document.documentElement,corpo=document.body,tam=100;
  function ler(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function gravar(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  var t=parseInt(ler("tam"),10);if(t>=87&&t<=200)tam=t;
  function aplicar(){raiz.style.fontSize=(112.5*tam/100)+"%"}
  function contraste(on){corpo.classList.toggle("contraste",on);var b=document.getElementById("btn-contraste");if(b)b.setAttribute("aria-pressed",String(on))}
  aplicar();contraste(ler("contraste")==="1");
  document.getElementById("btn-menos").addEventListener("click",function(){tam=Math.max(87,tam-12);gravar("tam",tam);aplicar()});
  document.getElementById("btn-mais").addEventListener("click",function(){tam=Math.min(200,tam+12);gravar("tam",tam);aplicar()});
  document.getElementById("btn-contraste").addEventListener("click",function(){var on=!corpo.classList.contains("contraste");contraste(on);gravar("contraste",on?"1":"0")});
})();
