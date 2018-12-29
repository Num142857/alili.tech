---
title: 'JavaScript算法实现缓冲运动' 
date: 2018-12-30 2:30:10
hidden: true
slug: ls5fi9x4y48
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://demo.jb51.net/js/2015/js-tween-run-style-codes/" rel="nofollow noreferrer" target="_blank">点击看demo</a></p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Transitional//EN&quot;
&quot;http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd&quot;>
<html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;>
<head>
<meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=gb2312&quot; />
<title>Tween</title>
</head>
<body>
<div style=&quot;padding-left:50px;&quot;>
  <div style=&quot;position:relative; border:1px solid #000000; width:550px; height:50px;&quot;>
    <div id=&quot;idMove&quot; style=&quot;width:50px; height:50px; background:#930; position:absolute;&quot;></div>
  </div>
  <div style=&quot;position:relative;width:550px;height:200px; margin-top:50px;&quot;>
    <div id=&quot;idChart&quot; style=&quot;border:1px solid #000;height:200px;&quot;> </div>
    <div id=&quot;idLine&quot; style=&quot;position:absolute;top:0;left:0;height:200px;width:1px;background:#000;&quot;></div>
  </div>
</div>
<div>
  <p> Tween类型： <br />
    <label>
      <input name=&quot;vTween&quot; type=&quot;radio&quot; value=&quot;Linear&quot; checked=&quot;checked&quot; />
      Linear </label>
    <label>
      <input name=&quot;vTween&quot; type=&quot;radio&quot; value=&quot;Quad&quot; />
      Quadratic </label>
    <label>
      <input name=&quot;vTween&quot; type=&quot;radio&quot; value=&quot;Cubic&quot; />
      Cubic </label>
    <label>
      <input name=&quot;vTween&quot; type=&quot;radio&quot; value=&quot;Quart&quot; />
      Quartic </label>
    <label>
      <input name=&quot;vTween&quot; type=&quot;radio&quot; value=&quot;Quint&quot; />
      Quintic </label>
    <label>
      <input name=&quot;vTween&quot; type=&quot;radio&quot; value=&quot;Sine&quot; />
      Sinusoidal </label>
    <br />
    <label>
      <input name=&quot;vTween&quot; type=&quot;radio&quot; value=&quot;Expo&quot; />
      Exponential </label>
    <label>
      <input name=&quot;vTween&quot; type=&quot;radio&quot; value=&quot;Circ&quot; />
      Circular </label>
    <label>
      <input name=&quot;vTween&quot; type=&quot;radio&quot; value=&quot;Elastic&quot; />
      Elastic </label>
    <label>
      <input name=&quot;vTween&quot; type=&quot;radio&quot; value=&quot;Back&quot; />
      Back </label>
    <label>
      <input name=&quot;vTween&quot; type=&quot;radio&quot; value=&quot;Bounce&quot; />
      Bounce </label>
  </p>
  <p> ease类型： <br />
    <label>
      <input name=&quot;vEase&quot; type=&quot;radio&quot; value=&quot;easeIn&quot; checked=&quot;checked&quot; />
      easeIn </label>
    <label>
      <input name=&quot;vEase&quot; type=&quot;radio&quot; value=&quot;easeOut&quot; />
      easeOut </label>
    <label>
      <input name=&quot;vEase&quot; type=&quot;radio&quot; value=&quot;easeInOut&quot; />
      easeInOut </label>
  </p>
  <input id=&quot;idSpeed&quot; type=&quot;button&quot; value=&quot;减慢速度&quot; />
  <input id=&quot;idRun&quot; type=&quot;button&quot; value=&quot; Run &quot; />
</div>
<script>
var Tween = {
 Linear: function(t,b,c,d){ return c*t/d + b; },
 Quad: {
  easeIn: function(t,b,c,d){
   return c*(t/=d)*t + b;
  },
  easeOut: function(t,b,c,d){
   return -c *(t/=d)*(t-2) + b;
  },
  easeInOut: function(t,b,c,d){
   if ((t/=d/2) < 1) return c/2*t*t + b;
   return -c/2 * ((--t)*(t-2) - 1) + b;
  }
 },
 Cubic: {
  easeIn: function(t,b,c,d){
   return c*(t/=d)*t*t + b;
  },
  easeOut: function(t,b,c,d){
   return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOut: function(t,b,c,d){
   if ((t/=d/2) < 1) return c/2*t*t*t + b;
   return c/2*((t-=2)*t*t + 2) + b;
  }
 },
 Quart: {
  easeIn: function(t,b,c,d){
   return c*(t/=d)*t*t*t + b;
  },
  easeOut: function(t,b,c,d){
   return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOut: function(t,b,c,d){
   if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
   return -c/2 * ((t-=2)*t*t*t - 2) + b;
  }
 },
 Quint: {
  easeIn: function(t,b,c,d){
   return c*(t/=d)*t*t*t*t + b;
  },
  easeOut: function(t,b,c,d){
   return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOut: function(t,b,c,d){
   if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
   return c/2*((t-=2)*t*t*t*t + 2) + b;
  }
 },
 Sine: {
  easeIn: function(t,b,c,d){
   return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOut: function(t,b,c,d){
   return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOut: function(t,b,c,d){
   return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  }
 },
 Expo: {
  easeIn: function(t,b,c,d){
   return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOut: function(t,b,c,d){
   return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOut: function(t,b,c,d){
   if (t==0) return b;
   if (t==d) return b+c;
   if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
   return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }
 },
 Circ: {
  easeIn: function(t,b,c,d){
   return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  easeOut: function(t,b,c,d){
   return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  easeInOut: function(t,b,c,d){
   if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
   return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  }
 },
 Elastic: {
  easeIn: function(t,b,c,d,a,p){
   if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
   if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
   else var s = p/(2*Math.PI) * Math.asin (c/a);
   return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  easeOut: function(t,b,c,d,a,p){
   if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
   if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
   else var s = p/(2*Math.PI) * Math.asin (c/a);
   return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
  },
  easeInOut: function(t,b,c,d,a,p){
   if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
   if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
   else var s = p/(2*Math.PI) * Math.asin (c/a);
   if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
   return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  }
 },
 Back: {
  easeIn: function(t,b,c,d,s){
   if (s == undefined) s = 1.70158;
   return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  easeOut: function(t,b,c,d,s){
   if (s == undefined) s = 1.70158;
   return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  },
  easeInOut: function(t,b,c,d,s){
   if (s == undefined) s = 1.70158; 
   if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
   return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  }
 },
 Bounce: {
  easeIn: function(t,b,c,d){
   return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
  },
  easeOut: function(t,b,c,d){
   if ((t/=d) < (1/2.75)) {
    return c*(7.5625*t*t) + b;
   } else if (t < (2/2.75)) {
    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
   } else if (t < (2.5/2.75)) {
    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
   } else {
    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
   }
  },
  easeInOut: function(t,b,c,d){
   if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
   else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
  }
 }
}
var $ = function (id) {
 return &quot;string&quot; == typeof id ? document.getElementById(id) : id;
};
var Each = function(list, fun){
 for (var i = 0, len = list.length; i < len; i++) { fun(list[i], i); }
};
var fun, iChart = 550, iDuration = 100;
function Move(){
 var oM = $(&quot;idMove&quot;).style, oL = $(&quot;idLine&quot;).style, t=0, c=500, d=iDuration;
 oM.left=oL.left=&quot;0px&quot;; clearTimeout(Move._t);
 function _run(){
  if(t<d){
   t++;
   oM.left = Math.ceil(fun(t,0,c,d)) + &quot;px&quot;;
   oL.left = Math.ceil(Tween.Linear(t,0,iChart,d)) + &quot;px&quot;;
   Move._t = setTimeout(_run, 10);
  }else{
   oM.left = c + &quot;px&quot;;
   oL.left = iChart + &quot;px&quot;;
  }
 }
 _run();
}
function Chart(){
 var a = [];
 for (var i = 0; i < iChart; i++) {
  a.push('<div style=&quot;background-color:#f60;font-size:0;width:3px;height:3px;position:absolute;left:' + (i-1) + 'px;top:' + (Math.ceil(fun(i,200,-200,iChart))) + 'px;&quot;><\/div>');
 }
 $(&quot;idChart&quot;).innerHTML = a.join(&quot;&quot;);
}
var arrTween = document.getElementsByName(&quot;vTween&quot;);
var arrEase = document.getElementsByName(&quot;vEase&quot;);
Each(arrTween, function(o){ o.onclick = function(){ SetFun(); Chart(); } })
Each(arrEase, function(o){ o.onclick = function(){ SetFun(); Chart(); } })
function SetFun(){
 var sTween, sEase;
 Each(arrTween, function(o){ if(o.checked){ sTween = o.value; } })
 Each(arrEase, function(o){ if(o.checked){ sEase = o.value; } })
 fun = sTween == &quot;Linear&quot; ? Tween.Linear : Tween[sTween][sEase];
}
$(&quot;idRun&quot;).onclick = function(){ SetFun(); Chart(); Move(); }
$(&quot;idSpeed&quot;).onclick = function(){
 if(iDuration == 100){
  iDuration = 500; this.value = &quot;加快速度&quot;;
 }else{
  iDuration = 100; this.value = &quot;减慢速度&quot;;
 }
}
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/1999/xhtml"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html; charset=gb2312"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Tween<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"padding-left:50px;"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position:relative; border:1px solid #000000; width:550px; height:50px;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"idMove"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:50px; height:50px; background:#930; position:absolute;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position:relative;width:550px;height:200px; margin-top:50px;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"idChart"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"border:1px solid #000;height:200px;"</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"idLine"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"position:absolute;top:0;left:0;height:200px;width:1px;background:#000;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> Tween类型： <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vTween"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Linear"</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">"checked"</span> /&gt;</span>
      Linear <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vTween"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Quad"</span> /&gt;</span>
      Quadratic <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vTween"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Cubic"</span> /&gt;</span>
      Cubic <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vTween"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Quart"</span> /&gt;</span>
      Quartic <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vTween"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Quint"</span> /&gt;</span>
      Quintic <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vTween"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Sine"</span> /&gt;</span>
      Sinusoidal <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vTween"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Expo"</span> /&gt;</span>
      Exponential <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vTween"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Circ"</span> /&gt;</span>
      Circular <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vTween"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Elastic"</span> /&gt;</span>
      Elastic <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vTween"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Back"</span> /&gt;</span>
      Back <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vTween"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Bounce"</span> /&gt;</span>
      Bounce <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> ease类型： <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vEase"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"easeIn"</span> <span class="hljs-attr">checked</span>=<span class="hljs-string">"checked"</span> /&gt;</span>
      easeIn <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vEase"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"easeOut"</span> /&gt;</span>
      easeOut <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"vEase"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"radio"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"easeInOut"</span> /&gt;</span>
      easeInOut <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"idSpeed"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"减慢速度"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"idRun"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">" Run "</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">var</span> Tween = {
 <span class="hljs-attr">Linear</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{ <span class="hljs-keyword">return</span> c*t/d + b; },
 <span class="hljs-attr">Quad</span>: {
  <span class="hljs-attr">easeIn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> c*(t/=d)*t + b;
  },
  <span class="hljs-attr">easeOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> -c *(t/=d)*(t<span class="hljs-number">-2</span>) + b;
  },
  <span class="hljs-attr">easeInOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">if</span> ((t/=d/<span class="hljs-number">2</span>) &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> c/<span class="hljs-number">2</span>*t*t + b;
   <span class="hljs-keyword">return</span> -c/<span class="hljs-number">2</span> * ((--t)*(t<span class="hljs-number">-2</span>) - <span class="hljs-number">1</span>) + b;
  }
 },
 <span class="hljs-attr">Cubic</span>: {
  <span class="hljs-attr">easeIn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> c*(t/=d)*t*t + b;
  },
  <span class="hljs-attr">easeOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> c*((t=t/d<span class="hljs-number">-1</span>)*t*t + <span class="hljs-number">1</span>) + b;
  },
  <span class="hljs-attr">easeInOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">if</span> ((t/=d/<span class="hljs-number">2</span>) &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> c/<span class="hljs-number">2</span>*t*t*t + b;
   <span class="hljs-keyword">return</span> c/<span class="hljs-number">2</span>*((t-=<span class="hljs-number">2</span>)*t*t + <span class="hljs-number">2</span>) + b;
  }
 },
 <span class="hljs-attr">Quart</span>: {
  <span class="hljs-attr">easeIn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> c*(t/=d)*t*t*t + b;
  },
  <span class="hljs-attr">easeOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> -c * ((t=t/d<span class="hljs-number">-1</span>)*t*t*t - <span class="hljs-number">1</span>) + b;
  },
  <span class="hljs-attr">easeInOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">if</span> ((t/=d/<span class="hljs-number">2</span>) &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> c/<span class="hljs-number">2</span>*t*t*t*t + b;
   <span class="hljs-keyword">return</span> -c/<span class="hljs-number">2</span> * ((t-=<span class="hljs-number">2</span>)*t*t*t - <span class="hljs-number">2</span>) + b;
  }
 },
 <span class="hljs-attr">Quint</span>: {
  <span class="hljs-attr">easeIn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> c*(t/=d)*t*t*t*t + b;
  },
  <span class="hljs-attr">easeOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> c*((t=t/d<span class="hljs-number">-1</span>)*t*t*t*t + <span class="hljs-number">1</span>) + b;
  },
  <span class="hljs-attr">easeInOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">if</span> ((t/=d/<span class="hljs-number">2</span>) &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> c/<span class="hljs-number">2</span>*t*t*t*t*t + b;
   <span class="hljs-keyword">return</span> c/<span class="hljs-number">2</span>*((t-=<span class="hljs-number">2</span>)*t*t*t*t + <span class="hljs-number">2</span>) + b;
  }
 },
 <span class="hljs-attr">Sine</span>: {
  <span class="hljs-attr">easeIn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> -c * <span class="hljs-built_in">Math</span>.cos(t/d * (<span class="hljs-built_in">Math</span>.PI/<span class="hljs-number">2</span>)) + c + b;
  },
  <span class="hljs-attr">easeOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> c * <span class="hljs-built_in">Math</span>.sin(t/d * (<span class="hljs-built_in">Math</span>.PI/<span class="hljs-number">2</span>)) + b;
  },
  <span class="hljs-attr">easeInOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> -c/<span class="hljs-number">2</span> * (<span class="hljs-built_in">Math</span>.cos(<span class="hljs-built_in">Math</span>.PI*t/d) - <span class="hljs-number">1</span>) + b;
  }
 },
 <span class="hljs-attr">Expo</span>: {
  <span class="hljs-attr">easeIn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> (t==<span class="hljs-number">0</span>) ? b : c * <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">10</span> * (t/d - <span class="hljs-number">1</span>)) + b;
  },
  <span class="hljs-attr">easeOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> (t==d) ? b+c : c * (-<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">-10</span> * t/d) + <span class="hljs-number">1</span>) + b;
  },
  <span class="hljs-attr">easeInOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">if</span> (t==<span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> b;
   <span class="hljs-keyword">if</span> (t==d) <span class="hljs-keyword">return</span> b+c;
   <span class="hljs-keyword">if</span> ((t/=d/<span class="hljs-number">2</span>) &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> c/<span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">10</span> * (t - <span class="hljs-number">1</span>)) + b;
   <span class="hljs-keyword">return</span> c/<span class="hljs-number">2</span> * (-<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>, <span class="hljs-number">-10</span> * --t) + <span class="hljs-number">2</span>) + b;
  }
 },
 <span class="hljs-attr">Circ</span>: {
  <span class="hljs-attr">easeIn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> -c * (<span class="hljs-built_in">Math</span>.sqrt(<span class="hljs-number">1</span> - (t/=d)*t) - <span class="hljs-number">1</span>) + b;
  },
  <span class="hljs-attr">easeOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> c * <span class="hljs-built_in">Math</span>.sqrt(<span class="hljs-number">1</span> - (t=t/d<span class="hljs-number">-1</span>)*t) + b;
  },
  <span class="hljs-attr">easeInOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">if</span> ((t/=d/<span class="hljs-number">2</span>) &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> -c/<span class="hljs-number">2</span> * (<span class="hljs-built_in">Math</span>.sqrt(<span class="hljs-number">1</span> - t*t) - <span class="hljs-number">1</span>) + b;
   <span class="hljs-keyword">return</span> c/<span class="hljs-number">2</span> * (<span class="hljs-built_in">Math</span>.sqrt(<span class="hljs-number">1</span> - (t-=<span class="hljs-number">2</span>)*t) + <span class="hljs-number">1</span>) + b;
  }
 },
 <span class="hljs-attr">Elastic</span>: {
  <span class="hljs-attr">easeIn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d,a,p</span>)</span>{
   <span class="hljs-keyword">if</span> (t==<span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> b;  <span class="hljs-keyword">if</span> ((t/=d)==<span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> b+c;  <span class="hljs-keyword">if</span> (!p) p=d*<span class="hljs-number">.3</span>;
   <span class="hljs-keyword">if</span> (!a || a &lt; <span class="hljs-built_in">Math</span>.abs(c)) { a=c; <span class="hljs-keyword">var</span> s=p/<span class="hljs-number">4</span>; }
   <span class="hljs-keyword">else</span> <span class="hljs-keyword">var</span> s = p/(<span class="hljs-number">2</span>*<span class="hljs-built_in">Math</span>.PI) * <span class="hljs-built_in">Math</span>.asin (c/a);
   <span class="hljs-keyword">return</span> -(a*<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>,<span class="hljs-number">10</span>*(t-=<span class="hljs-number">1</span>)) * <span class="hljs-built_in">Math</span>.sin( (t*d-s)*(<span class="hljs-number">2</span>*<span class="hljs-built_in">Math</span>.PI)/p )) + b;
  },
  <span class="hljs-attr">easeOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d,a,p</span>)</span>{
   <span class="hljs-keyword">if</span> (t==<span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> b;  <span class="hljs-keyword">if</span> ((t/=d)==<span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> b+c;  <span class="hljs-keyword">if</span> (!p) p=d*<span class="hljs-number">.3</span>;
   <span class="hljs-keyword">if</span> (!a || a &lt; <span class="hljs-built_in">Math</span>.abs(c)) { a=c; <span class="hljs-keyword">var</span> s=p/<span class="hljs-number">4</span>; }
   <span class="hljs-keyword">else</span> <span class="hljs-keyword">var</span> s = p/(<span class="hljs-number">2</span>*<span class="hljs-built_in">Math</span>.PI) * <span class="hljs-built_in">Math</span>.asin (c/a);
   <span class="hljs-keyword">return</span> (a*<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>,<span class="hljs-number">-10</span>*t) * <span class="hljs-built_in">Math</span>.sin( (t*d-s)*(<span class="hljs-number">2</span>*<span class="hljs-built_in">Math</span>.PI)/p ) + c + b);
  },
  <span class="hljs-attr">easeInOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d,a,p</span>)</span>{
   <span class="hljs-keyword">if</span> (t==<span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> b;  <span class="hljs-keyword">if</span> ((t/=d/<span class="hljs-number">2</span>)==<span class="hljs-number">2</span>) <span class="hljs-keyword">return</span> b+c;  <span class="hljs-keyword">if</span> (!p) p=d*(<span class="hljs-number">.3</span>*<span class="hljs-number">1.5</span>);
   <span class="hljs-keyword">if</span> (!a || a &lt; <span class="hljs-built_in">Math</span>.abs(c)) { a=c; <span class="hljs-keyword">var</span> s=p/<span class="hljs-number">4</span>; }
   <span class="hljs-keyword">else</span> <span class="hljs-keyword">var</span> s = p/(<span class="hljs-number">2</span>*<span class="hljs-built_in">Math</span>.PI) * <span class="hljs-built_in">Math</span>.asin (c/a);
   <span class="hljs-keyword">if</span> (t &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">-.5</span>*(a*<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>,<span class="hljs-number">10</span>*(t-=<span class="hljs-number">1</span>)) * <span class="hljs-built_in">Math</span>.sin( (t*d-s)*(<span class="hljs-number">2</span>*<span class="hljs-built_in">Math</span>.PI)/p )) + b;
   <span class="hljs-keyword">return</span> a*<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>,<span class="hljs-number">-10</span>*(t-=<span class="hljs-number">1</span>)) * <span class="hljs-built_in">Math</span>.sin( (t*d-s)*(<span class="hljs-number">2</span>*<span class="hljs-built_in">Math</span>.PI)/p )*<span class="hljs-number">.5</span> + c + b;
  }
 },
 <span class="hljs-attr">Back</span>: {
  <span class="hljs-attr">easeIn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d,s</span>)</span>{
   <span class="hljs-keyword">if</span> (s == <span class="hljs-literal">undefined</span>) s = <span class="hljs-number">1.70158</span>;
   <span class="hljs-keyword">return</span> c*(t/=d)*t*((s+<span class="hljs-number">1</span>)*t - s) + b;
  },
  <span class="hljs-attr">easeOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d,s</span>)</span>{
   <span class="hljs-keyword">if</span> (s == <span class="hljs-literal">undefined</span>) s = <span class="hljs-number">1.70158</span>;
   <span class="hljs-keyword">return</span> c*((t=t/d<span class="hljs-number">-1</span>)*t*((s+<span class="hljs-number">1</span>)*t + s) + <span class="hljs-number">1</span>) + b;
  },
  <span class="hljs-attr">easeInOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d,s</span>)</span>{
   <span class="hljs-keyword">if</span> (s == <span class="hljs-literal">undefined</span>) s = <span class="hljs-number">1.70158</span>; 
   <span class="hljs-keyword">if</span> ((t/=d/<span class="hljs-number">2</span>) &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> c/<span class="hljs-number">2</span>*(t*t*(((s*=(<span class="hljs-number">1.525</span>))+<span class="hljs-number">1</span>)*t - s)) + b;
   <span class="hljs-keyword">return</span> c/<span class="hljs-number">2</span>*((t-=<span class="hljs-number">2</span>)*t*(((s*=(<span class="hljs-number">1.525</span>))+<span class="hljs-number">1</span>)*t + s) + <span class="hljs-number">2</span>) + b;
  }
 },
 <span class="hljs-attr">Bounce</span>: {
  <span class="hljs-attr">easeIn</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">return</span> c - Tween.Bounce.easeOut(d-t, <span class="hljs-number">0</span>, c, d) + b;
  },
  <span class="hljs-attr">easeOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">if</span> ((t/=d) &lt; (<span class="hljs-number">1</span>/<span class="hljs-number">2.75</span>)) {
    <span class="hljs-keyword">return</span> c*(<span class="hljs-number">7.5625</span>*t*t) + b;
   } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (t &lt; (<span class="hljs-number">2</span>/<span class="hljs-number">2.75</span>)) {
    <span class="hljs-keyword">return</span> c*(<span class="hljs-number">7.5625</span>*(t-=(<span class="hljs-number">1.5</span>/<span class="hljs-number">2.75</span>))*t + <span class="hljs-number">.75</span>) + b;
   } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (t &lt; (<span class="hljs-number">2.5</span>/<span class="hljs-number">2.75</span>)) {
    <span class="hljs-keyword">return</span> c*(<span class="hljs-number">7.5625</span>*(t-=(<span class="hljs-number">2.25</span>/<span class="hljs-number">2.75</span>))*t + <span class="hljs-number">.9375</span>) + b;
   } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> c*(<span class="hljs-number">7.5625</span>*(t-=(<span class="hljs-number">2.625</span>/<span class="hljs-number">2.75</span>))*t + <span class="hljs-number">.984375</span>) + b;
   }
  },
  <span class="hljs-attr">easeInOut</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t,b,c,d</span>)</span>{
   <span class="hljs-keyword">if</span> (t &lt; d/<span class="hljs-number">2</span>) <span class="hljs-keyword">return</span> Tween.Bounce.easeIn(t*<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, c, d) * <span class="hljs-number">.5</span> + b;
   <span class="hljs-keyword">else</span> <span class="hljs-keyword">return</span> Tween.Bounce.easeOut(t*<span class="hljs-number">2</span>-d, <span class="hljs-number">0</span>, c, d) * <span class="hljs-number">.5</span> + c*<span class="hljs-number">.5</span> + b;
  }
 }
}
<span class="hljs-keyword">var</span> $ = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">id</span>) </span>{
 <span class="hljs-keyword">return</span> <span class="hljs-string">"string"</span> == <span class="hljs-keyword">typeof</span> id ? <span class="hljs-built_in">document</span>.getElementById(id) : id;
};
<span class="hljs-keyword">var</span> Each = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">list, fun</span>)</span>{
 <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = list.length; i &lt; len; i++) { fun(list[i], i); }
};
<span class="hljs-keyword">var</span> fun, iChart = <span class="hljs-number">550</span>, iDuration = <span class="hljs-number">100</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Move</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">var</span> oM = $(<span class="hljs-string">"idMove"</span>).style, oL = $(<span class="hljs-string">"idLine"</span>).style, t=<span class="hljs-number">0</span>, c=<span class="hljs-number">500</span>, d=iDuration;
 oM.left=oL.left=<span class="hljs-string">"0px"</span>; clearTimeout(Move._t);
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_run</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">if</span>(t&lt;d){
   t++;
   oM.left = <span class="hljs-built_in">Math</span>.ceil(fun(t,<span class="hljs-number">0</span>,c,d)) + <span class="hljs-string">"px"</span>;
   oL.left = <span class="hljs-built_in">Math</span>.ceil(Tween.Linear(t,<span class="hljs-number">0</span>,iChart,d)) + <span class="hljs-string">"px"</span>;
   Move._t = setTimeout(_run, <span class="hljs-number">10</span>);
  }<span class="hljs-keyword">else</span>{
   oM.left = c + <span class="hljs-string">"px"</span>;
   oL.left = iChart + <span class="hljs-string">"px"</span>;
  }
 }
 _run();
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Chart</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">var</span> a = [];
 <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; iChart; i++) {
  a.push(<span class="hljs-string">'&lt;div style="background-color:#f60;font-size:0;width:3px;height:3px;position:absolute;left:'</span> + (i<span class="hljs-number">-1</span>) + <span class="hljs-string">'px;top:'</span> + (<span class="hljs-built_in">Math</span>.ceil(fun(i,<span class="hljs-number">200</span>,<span class="hljs-number">-200</span>,iChart))) + <span class="hljs-string">'px;"&gt;&lt;\/div&gt;'</span>);
 }
 $(<span class="hljs-string">"idChart"</span>).innerHTML = a.join(<span class="hljs-string">""</span>);
}
<span class="hljs-keyword">var</span> arrTween = <span class="hljs-built_in">document</span>.getElementsByName(<span class="hljs-string">"vTween"</span>);
<span class="hljs-keyword">var</span> arrEase = <span class="hljs-built_in">document</span>.getElementsByName(<span class="hljs-string">"vEase"</span>);
Each(arrTween, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">o</span>)</span>{ o.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ SetFun(); Chart(); } })
Each(arrEase, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">o</span>)</span>{ o.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ SetFun(); Chart(); } })
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SetFun</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">var</span> sTween, sEase;
 Each(arrTween, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">o</span>)</span>{ <span class="hljs-keyword">if</span>(o.checked){ sTween = o.value; } })
 Each(arrEase, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">o</span>)</span>{ <span class="hljs-keyword">if</span>(o.checked){ sEase = o.value; } })
 fun = sTween == <span class="hljs-string">"Linear"</span> ? Tween.Linear : Tween[sTween][sEase];
}
$(<span class="hljs-string">"idRun"</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ SetFun(); Chart(); Move(); }
$(<span class="hljs-string">"idSpeed"</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
 <span class="hljs-keyword">if</span>(iDuration == <span class="hljs-number">100</span>){
  iDuration = <span class="hljs-number">500</span>; <span class="hljs-keyword">this</span>.value = <span class="hljs-string">"加快速度"</span>;
 }<span class="hljs-keyword">else</span>{
  iDuration = <span class="hljs-number">100</span>; <span class="hljs-keyword">this</span>.value = <span class="hljs-string">"减慢速度"</span>;
 }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript算法实现缓冲运动

## 原文链接
[https://segmentfault.com/a/1190000011411704](https://segmentfault.com/a/1190000011411704)

