(function(){
  var grupo=document.getElementById("leitura");
  if(!("speechSynthesis" in window)||!window.SpeechSynthesisUtterance){if(grupo)grupo.hidden=true;return}
  var bOuvir=document.getElementById("btn-ouvir"),bPausa=document.getElementById("btn-pausa"),bParar=document.getElementById("btn-parar"),vel=document.getElementById("vel-leitura"),estado=document.getElementById("estado-leitura");
  var rodada=0;
  function dizer(t){estado.textContent=t}
  function voz(){var v=speechSynthesis.getVoices(),i;
    for(i=0;i<v.length;i++){if(v[i].lang.replace("_","-").toLowerCase()==="pt-br")return v[i]}
    for(i=0;i<v.length;i++){if(v[i].lang.toLowerCase().indexOf("pt")===0)return v[i]}
    return null}
  function zerar(){bPausa.disabled=true;bParar.disabled=true;bPausa.textContent="Pausar";bPausa.setAttribute("aria-pressed","false")}
  function parar(msg){rodada++;speechSynthesis.cancel();zerar();if(msg)dizer(msg)}
  function ouvir(){
    parar();
    var minha=rodada;
    var linhas=document.getElementById("conteudo").innerText.split("\n").map(function(l){return l.trim()}).filter(Boolean);
    var v=voz(),taxa=parseFloat(vel.value);
    linhas.forEach(function(l,i){
      var u=new SpeechSynthesisUtterance(l);
      u.lang="pt-BR";u.rate=taxa;if(v)u.voice=v;
      if(i===linhas.length-1){u.onend=function(){if(minha===rodada){zerar();dizer("Leitura concluída.")}}}
      speechSynthesis.speak(u);
    });
    bPausa.disabled=false;bParar.disabled=false;dizer("Lendo a página.");
  }
  bOuvir.addEventListener("click",ouvir);
  bPausa.addEventListener("click",function(){
    if(speechSynthesis.paused){speechSynthesis.resume();bPausa.textContent="Pausar";bPausa.setAttribute("aria-pressed","false");dizer("Leitura retomada.")}
    else{speechSynthesis.pause();bPausa.textContent="Continuar";bPausa.setAttribute("aria-pressed","true");dizer("Leitura pausada.")}
  });
  bParar.addEventListener("click",function(){parar("Leitura interrompida.")});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!bParar.disabled)parar("Leitura interrompida.")});
  window.addEventListener("pagehide",function(){speechSynthesis.cancel()});
  zerar();
})();
