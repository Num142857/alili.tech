---
title: '开源！js实现微信/QQ直接跳转到支付宝APP打开口令领红包！附：demo' 
date: 2018-12-19 2:30:07
hidden: true
slug: 8qckoik0fqm
categories: [reprint]
---

{{< raw >}}

                    
<p>最近支付宝的领红包可真是刷爆了各个微信群啊，满群都是支付宝口令。</p>
<p><span class="img-wrap"><img data-src="/img/bV1rgL?w=750&amp;h=1334" src="https://static.alili.tech/img/bV1rgL?w=750&amp;h=1334" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可是这样推广可不是办法，又要复制又要打开支付宝又要点领取，太麻烦了。</p>
<p>于是乎，提出了一个疑问！<br>是否可以在微信里面点一个链接然后直接打开支付宝并自动领取呢？？？<br>就像下面这样！</p>
<p><span class="img-wrap"><img data-src="/img/bV1rhs?w=341&amp;h=603" src="https://static.alili.tech/img/bV1rhs?w=341&amp;h=603" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>上图解说：<br>1、点击一个url<br>2、立即跳转到支付宝APP<br>3、并且秒领红包</p>
<p>对，没错，上面就是本次案例的demo</p>
<p>大家可以扫码体验：</p>
<p><span class="img-wrap"><img data-src="/img/bV1wkN?w=248&amp;h=242" src="https://static.alili.tech/img/bV1wkN?w=248&amp;h=242" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>实现的原理很简单<br>源码只有一个html文件和js文件</p>
<p>html只要是方便加载js<br>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;zh-cmn-hans&quot;>
<head>
<meta charset=&quot;UTF-8&quot;>
<meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
<meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge, chrome=1&quot;>
<title>正在打开支付宝，请稍候……</title>
</head>
<body>
<script src=&quot;kouling.js&quot;></script>
</body>
</html>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-cmn-hans"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge, chrome=1"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>正在打开支付宝，请稍候……<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"kouling.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre>
<p>js才是重点<br>js可以调取默认浏览器，然后通过默认浏览器打开支付宝<br>在ios系统，即iphone上，基本没有看到调取浏览器的痕迹<br>因为很快，在安卓手机上，是先调取浏览器，再询问是否打开支付宝app</p>
<p>而js里面包含了领红包的二维码参数<br><a href="https://qr.alipay.com/c1x07682zamp281ion55kaa" rel="nofollow noreferrer" target="_blank">https://qr.alipay.com/c1x0768...</a><br>上面这串就是参数<br>只要在支付宝里面加载这段链接<br>就可以直接领红包</p>
<p>所以js实现的是先跳转到支付宝<br>再加载上面这段链接<br>so easy</p>
<p>技术开源：<br>源码有两套：<br>第一套：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eval(function(p,a,c,k,e,d){e=function(c){return(c<a?&quot;&quot;:e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('1Y(1O(p,a,c,k,e,d){e=1O(c){1P(c<a?&quot;&quot;:e(1Z(c/a)))+((c=c%a)>1W?1Q.22(c+29):c.1U(1V))};1T(!\'\'.1S(/^/,1Q)){1R(c--)d[e(c)]=k[c]||e(c);k=[1O(e){1P d[e]}];e=1O(){1P\'\\\\w+\'};c=1};1R(c--)1T(k[c])p=p.1S(1X 21(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);1P p}(\'1t(P(p,a,c,k,e,d){e=P(c){O(c<a?&quot;&quot;:e(1g(c/a)))+((c=c%a)>19?S.18(c+17):c.1c(1b))};Q(!\\\'\\\'.T(/^/,S)){U(c--)d[e(c)]=k[c]||e(c);k=[P(e){O d[e]}];e=P(){O\\\'\\\\\\\\w+\\\'};c=1};U(c--)Q(k[c])p=p.T(1a 1i(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c]);O p}(\\\'7 c=&quot;l://k.n.o/m&quot;;7 g=&quot;l://k.n.o/m&quot;;3 t(){0(/E/i.p(b.a)){2 d}1{2 4"}}"3 A(){7 9=b.a.q();0(9.D(/(I|M)/i)){2 d}1{2 4"}}"3 y(){7 9=b.a.q();0(/K|L|G/.p(9)){2 d}1{2 4"}}"3 z(){8.C(&quot;H&quot;,{},3(e){});j.h();8.r(&quot;B&quot;)}3 u(){0(c!=&quot;&quot;){w.v=c}1{j.h();8.r(&quot;B&quot;)"}}"3 5(){0(A()){z();2 4}0(y()){u();2 4"}}"0(t()){0(J 8==&quot;N&quot;){0(6.s){6.s(&quot;x&quot;,5,4)}1 0(6.f){6.f(&quot;x&quot;,5);6.f(&quot;F&quot;,5)"}}"1{5()"}}"1{0(g!=&quot;&quot;){w.v=g}1{j.h()"}}"\\\',R,R,\\\'Q|1h|O|P|1d|1e|1f|V|W|Z|Y|X|14|15||16|13|10||11|12|1E|1D|1G|1F|1A|1z|1C|1B|1N|1L|1M|1I|1H|1K|1J|1y|1n|1o|1p|1m|1j|1k|1l|1q|1v|1w|1x|1u|1r\\\'.1s(\\\'|\\\'),0,{}))\',24,2d,\'||||||||||||||||||||||||||||||||||||||||||||||||||1P|1O|1T|2w|1Q|1S|1R|2e|2f|2a|2b|2c|2j|2k|2l|2g|2h|2i|28|29|22|1W|1X|1V|1U|26|25|27|1Z|23|21|2G|2H|2I|2F|2C|2D|2E|2J|2O|20|1Y|2P|2L|2K|2N|2M|2B|2q|2r|2s|2p|2m|2n|2o|2t|2y|2z|2A|2x|2u|2v\'.20(\'|\'),0,{}))',62,176,'||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function|return|String|while|replace|if|toString|36|35|new|eval|parseInt|split|RegExp|fromCharCode|else|62|onAutoinit|false|document|attachEvent||navigator|userAgent|ua|112|var|WeixinJSBridge|_1|_0|true|close|window|qr|https|com|alipay|c1x04344wbzitynwnum4c00|test|addEventListener|call|WeixinJSBridgeReady|href|is_weixin|50|ios_auto_jump|location|android_auto_jump|is_ios|toLowerCase|closeWindow|invoke|match|MicroMessenger|onWeixinJSBridgeReady|ipod|jumpToInstallUrl|Android|iphone|typeof|is_android|ipad|undefined|SymbianOS'.split('|'),0,{}))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>eval(function(p,a,c,k,e,d){e=function(c){<span class="hljs-keyword">return</span>(c&lt;a?<span class="hljs-string">""</span>:e(parseInt(c/a)))+((c=c%a)&gt;<span class="hljs-number">35</span>?String.fromCharCode(c+<span class="hljs-number">29</span>):c.toString(<span class="hljs-number">36</span>))};<span class="hljs-keyword">if</span>(!''.<span class="hljs-built_in">replace</span>(/^/,String)){while(c--)d[e(c)]=k[c]|<span class="hljs-type">|e</span>(c);k=[function(e){<span class="hljs-keyword">return</span> d[e]}];e=function(){<span class="hljs-keyword">return</span>'\\w+'};c=<span class="hljs-number">1</span>;};while(c--)<span class="hljs-keyword">if</span>(k[c])p=p.<span class="hljs-built_in">replace</span>(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);<span class="hljs-keyword">return</span> p;}('<span class="hljs-number">1</span>Y(<span class="hljs-number">1</span>O(p,a,c,k,e,d){e=<span class="hljs-number">1</span>O(c){<span class="hljs-number">1</span>P(c&lt;a?<span class="hljs-string">""</span>:e(<span class="hljs-number">1</span>Z(c/a)))+((c=c%a)&gt;<span class="hljs-number">1</span>W?<span class="hljs-number">1</span>Q<span class="hljs-number">.22</span>(c+<span class="hljs-number">29</span>):c<span class="hljs-number">.1</span>U(<span class="hljs-number">1</span>V))};<span class="hljs-number">1</span>T(!\'\'<span class="hljs-number">.1</span>S(/^/,<span class="hljs-number">1</span>Q)){<span class="hljs-number">1</span>R(c--)d[e(c)]=k[c]|<span class="hljs-type">|e</span>(c);k=[<span class="hljs-number">1</span>O(e){<span class="hljs-number">1</span>P d[e]}];e=<span class="hljs-number">1</span>O(){<span class="hljs-number">1</span>P\'\\\\w+\'};c=<span class="hljs-number">1</span>};<span class="hljs-number">1</span>R(c--)<span class="hljs-number">1</span>T(k[c])p=p<span class="hljs-number">.1</span>S(<span class="hljs-number">1</span>X <span class="hljs-number">21</span>(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);<span class="hljs-number">1</span>P p}(\'<span class="hljs-number">1</span>t(P(p,a,c,k,e,d){e=P(c){O(c&lt;a?<span class="hljs-string">""</span>:e(<span class="hljs-number">1</span>g(c/a)))+((c=c%a)&gt;<span class="hljs-number">19</span>?S<span class="hljs-number">.18</span>(c+<span class="hljs-number">17</span>):c<span class="hljs-number">.1</span>c(<span class="hljs-number">1</span>b))};Q(!\\\'\\\'.T(/^/,S)){U(c--)d[e(c)]=k[c]|<span class="hljs-type">|e</span>(c);k=[P(e){O d[e]}];e=P(){O\\\'\\\\\\\\w+\\\'};c=<span class="hljs-number">1</span>};U(c--)Q(k[c])p=p.T(<span class="hljs-number">1</span>a <span class="hljs-number">1</span>i(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c]);O p}(\\\'<span class="hljs-number">7</span> c=<span class="hljs-string">"l://k.n.o/m"</span>;<span class="hljs-number">7</span> g=<span class="hljs-string">"l://k.n.o/m"</span>;<span class="hljs-number">3</span> t(){<span class="hljs-number">0</span>(/E/i.p(b.a)){<span class="hljs-number">2</span> d}<span class="hljs-number">1</span>{<span class="hljs-number">2</span> <span class="hljs-number">4</span>"}}"<span class="hljs-number">3</span> A(){<span class="hljs-number">7</span> <span class="hljs-number">9</span>=b.a.q();<span class="hljs-number">0</span>(<span class="hljs-number">9.</span>D(/(I|<span class="hljs-type">M</span>)/i)){<span class="hljs-number">2</span> d}<span class="hljs-number">1</span>{<span class="hljs-number">2</span> <span class="hljs-number">4</span>"}}"<span class="hljs-number">3</span> y(){<span class="hljs-number">7</span> <span class="hljs-number">9</span>=b.a.q();<span class="hljs-number">0</span>(/K|<span class="hljs-type">L</span>|<span class="hljs-type">G</span>/.p(<span class="hljs-number">9</span>)){<span class="hljs-number">2</span> d}<span class="hljs-number">1</span>{<span class="hljs-number">2</span> <span class="hljs-number">4</span>"}}"<span class="hljs-number">3</span> z(){<span class="hljs-number">8.</span>C(<span class="hljs-string">"H"</span>,{},<span class="hljs-number">3</span>(e){});j.h();<span class="hljs-number">8.</span>r(<span class="hljs-string">"B"</span>)}<span class="hljs-number">3</span> u(){<span class="hljs-number">0</span>(c!=<span class="hljs-string">""</span>){w.v=c}<span class="hljs-number">1</span>{j.h();<span class="hljs-number">8.</span>r(<span class="hljs-string">"B"</span>)"}}"<span class="hljs-number">3</span> <span class="hljs-number">5</span>(){<span class="hljs-number">0</span>(A()){z();<span class="hljs-number">2</span> <span class="hljs-number">4</span>}<span class="hljs-number">0</span>(y()){u();<span class="hljs-number">2</span> <span class="hljs-number">4</span>"}}"<span class="hljs-number">0</span>(t()){<span class="hljs-number">0</span>(J <span class="hljs-number">8</span>==<span class="hljs-string">"N"</span>){<span class="hljs-number">0</span>(<span class="hljs-number">6.</span>s){<span class="hljs-number">6.</span>s(<span class="hljs-string">"x"</span>,<span class="hljs-number">5</span>,<span class="hljs-number">4</span>)}<span class="hljs-number">1</span> <span class="hljs-number">0</span>(<span class="hljs-number">6.</span>f){<span class="hljs-number">6.</span>f(<span class="hljs-string">"x"</span>,<span class="hljs-number">5</span>);<span class="hljs-number">6.</span>f(<span class="hljs-string">"F"</span>,<span class="hljs-number">5</span>)"}}"<span class="hljs-number">1</span>{<span class="hljs-number">5</span>()"}}"<span class="hljs-number">1</span>{<span class="hljs-number">0</span>(g!=<span class="hljs-string">""</span>){w.v=g}<span class="hljs-number">1</span>{j.h()"}}"\\\',R,R,\\\'Q|<span class="hljs-type">1h</span>|<span class="hljs-type">O</span>|<span class="hljs-type">P</span>|<span class="hljs-type">1d</span>|<span class="hljs-type">1e</span>|<span class="hljs-type">1f</span>|<span class="hljs-type">V</span>|<span class="hljs-type">W</span>|<span class="hljs-type">Z</span>|<span class="hljs-type">Y</span>|<span class="hljs-type">X</span>|<span class="hljs-type">14</span>|<span class="hljs-type">15</span>|<span class="hljs-type">|16</span>|<span class="hljs-type">13</span>|<span class="hljs-type">10</span>|<span class="hljs-type">|11</span>|<span class="hljs-type">12</span>|<span class="hljs-type">1E</span>|<span class="hljs-type">1D</span>|<span class="hljs-type">1G</span>|<span class="hljs-type">1F</span>|<span class="hljs-type">1A</span>|<span class="hljs-type">1z</span>|<span class="hljs-type">1C</span>|<span class="hljs-type">1B</span>|<span class="hljs-type">1N</span>|<span class="hljs-type">1L</span>|<span class="hljs-type">1M</span>|<span class="hljs-type">1I</span>|<span class="hljs-type">1H</span>|<span class="hljs-type">1K</span>|<span class="hljs-type">1J</span>|<span class="hljs-type">1y</span>|<span class="hljs-type">1n</span>|<span class="hljs-type">1o</span>|<span class="hljs-type">1p</span>|<span class="hljs-type">1m</span>|<span class="hljs-type">1j</span>|<span class="hljs-type">1k</span>|<span class="hljs-type">1l</span>|<span class="hljs-type">1q</span>|<span class="hljs-type">1v</span>|<span class="hljs-type">1w</span>|<span class="hljs-type">1x</span>|<span class="hljs-type">1u</span>|<span class="hljs-type">1r</span>\\\'<span class="hljs-number">.1</span>s(\\\'|<span class="hljs-type">\\\'),0</span>,{}))\',<span class="hljs-number">24</span>,<span class="hljs-number">2</span>d,\'|<span class="hljs-type">|||||||||||||||||||||||||||||||||||||||||||||||||1P</span>|<span class="hljs-type">1O</span>|<span class="hljs-type">1T</span>|<span class="hljs-type">2w</span>|<span class="hljs-type">1Q</span>|<span class="hljs-type">1S</span>|<span class="hljs-type">1R</span>|<span class="hljs-type">2e</span>|<span class="hljs-type">2f</span>|<span class="hljs-type">2a</span>|<span class="hljs-type">2b</span>|<span class="hljs-type">2c</span>|<span class="hljs-type">2j</span>|<span class="hljs-type">2k</span>|<span class="hljs-type">2l</span>|<span class="hljs-type">2g</span>|<span class="hljs-type">2h</span>|<span class="hljs-type">2i</span>|<span class="hljs-type">28</span>|<span class="hljs-type">29</span>|<span class="hljs-type">22</span>|<span class="hljs-type">1W</span>|<span class="hljs-type">1X</span>|<span class="hljs-type">1V</span>|<span class="hljs-type">1U</span>|<span class="hljs-type">26</span>|<span class="hljs-type">25</span>|<span class="hljs-type">27</span>|<span class="hljs-type">1Z</span>|<span class="hljs-type">23</span>|<span class="hljs-type">21</span>|<span class="hljs-type">2G</span>|<span class="hljs-type">2H</span>|<span class="hljs-type">2I</span>|<span class="hljs-type">2F</span>|<span class="hljs-type">2C</span>|<span class="hljs-type">2D</span>|<span class="hljs-type">2E</span>|<span class="hljs-type">2J</span>|<span class="hljs-type">2O</span>|<span class="hljs-type">20</span>|<span class="hljs-type">1Y</span>|<span class="hljs-type">2P</span>|<span class="hljs-type">2L</span>|<span class="hljs-type">2K</span>|<span class="hljs-type">2N</span>|<span class="hljs-type">2M</span>|<span class="hljs-type">2B</span>|<span class="hljs-type">2q</span>|<span class="hljs-type">2r</span>|<span class="hljs-type">2s</span>|<span class="hljs-type">2p</span>|<span class="hljs-type">2m</span>|<span class="hljs-type">2n</span>|<span class="hljs-type">2o</span>|<span class="hljs-type">2t</span>|<span class="hljs-type">2y</span>|<span class="hljs-type">2z</span>|<span class="hljs-type">2A</span>|<span class="hljs-type">2x</span>|<span class="hljs-type">2u</span>|<span class="hljs-type">2v</span>\'<span class="hljs-number">.20</span>(\'|<span class="hljs-type">\'),0</span>,{}))',<span class="hljs-number">62</span>,<span class="hljs-number">176</span>,'|<span class="hljs-type">|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function</span>|<span class="hljs-type">return</span>|<span class="hljs-type">String</span>|<span class="hljs-type">while</span>|<span class="hljs-type">replace</span>|<span class="hljs-type">if</span>|<span class="hljs-type">toString</span>|<span class="hljs-type">36</span>|<span class="hljs-type">35</span>|<span class="hljs-type">new</span>|<span class="hljs-type">eval</span>|<span class="hljs-type">parseInt</span>|<span class="hljs-type">split</span>|<span class="hljs-type">RegExp</span>|<span class="hljs-type">fromCharCode</span>|<span class="hljs-type">else</span>|<span class="hljs-type">62</span>|<span class="hljs-type">onAutoinit</span>|<span class="hljs-type">false</span>|<span class="hljs-type">document</span>|<span class="hljs-type">attachEvent</span>|<span class="hljs-type">|navigator</span>|<span class="hljs-type">userAgent</span>|<span class="hljs-type">ua</span>|<span class="hljs-type">112</span>|<span class="hljs-type">var</span>|<span class="hljs-type">WeixinJSBridge</span>|<span class="hljs-type">_1</span>|<span class="hljs-type">_0</span>|<span class="hljs-type">true</span>|<span class="hljs-type">close</span>|<span class="hljs-type">window</span>|<span class="hljs-type">qr</span>|<span class="hljs-type">https</span>|<span class="hljs-type">com</span>|<span class="hljs-type">alipay</span>|<span class="hljs-type">c1x04344wbzitynwnum4c00</span>|<span class="hljs-type">test</span>|<span class="hljs-type">addEventListener</span>|<span class="hljs-type">call</span>|<span class="hljs-type">WeixinJSBridgeReady</span>|<span class="hljs-type">href</span>|<span class="hljs-type">is_weixin</span>|<span class="hljs-type">50</span>|<span class="hljs-type">ios_auto_jump</span>|<span class="hljs-type">location</span>|<span class="hljs-type">android_auto_jump</span>|<span class="hljs-type">is_ios</span>|<span class="hljs-type">toLowerCase</span>|<span class="hljs-type">closeWindow</span>|<span class="hljs-type">invoke</span>|<span class="hljs-type">match</span>|<span class="hljs-type">MicroMessenger</span>|<span class="hljs-type">onWeixinJSBridgeReady</span>|<span class="hljs-type">ipod</span>|<span class="hljs-type">jumpToInstallUrl</span>|<span class="hljs-type">Android</span>|<span class="hljs-type">iphone</span>|<span class="hljs-type">typeof</span>|<span class="hljs-type">is_android</span>|<span class="hljs-type">ipad</span>|<span class="hljs-type">undefined</span>|<span class="hljs-type">SymbianOS</span>'.<span class="hljs-built_in">split</span>('|<span class="hljs-type">'),0</span>,{}))
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV1wfK?w=755&amp;h=154" src="https://static.alili.tech/img/bV1wfK?w=755&amp;h=154" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>替换支付宝领红包二维码后面这个参数即可</p>
<p>第二套js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _0 = &quot;替换自己的二维码扫码后的url即可&quot;;
var _1 = &quot;替换自己的二维码扫码后的url即可&quot;;

function is_weixin() {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
}

function is_android() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/(Android|SymbianOS)/i)) {
        return true
    } else {
        return false
    }
}

function is_ios() {
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        return true
    } else {
        return false
    }
}

function android_auto_jump() {
    WeixinJSBridge.invoke(&quot;jumpToInstallUrl&quot;, {}, function(e) {});
    window.close();
    WeixinJSBridge.call(&quot;closeWindow&quot;)
}

function ios_auto_jump() {
    if (_0 != &quot;&quot;) {
        location.href = _0
    } else {
        window.close();
        WeixinJSBridge.call(&quot;closeWindow&quot;)
    }
}

function onAutoinit() {
    if (is_android()) {
        android_auto_jump();
        return false
    }
    if (is_ios()) {
        ios_auto_jump();
        return false
    }
}
if (is_weixin()) {
    if (typeof WeixinJSBridge == &quot;undefined&quot;) {
        if (document.addEventListener) {
            document.addEventListener(&quot;WeixinJSBridgeReady&quot;, onAutoinit, false)
        } else if (document.attachEvent) {
            document.attachEvent(&quot;WeixinJSBridgeReady&quot;, onAutoinit);
            document.attachEvent(&quot;onWeixinJSBridgeReady&quot;, onAutoinit)
        }
    } else {
        onAutoinit()
    }
} else {
    if (_1 != &quot;&quot;) {
        location.href = _1
    } else {
        window.close()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> _0 = <span class="hljs-string">"替换自己的二维码扫码后的url即可"</span>;
<span class="hljs-keyword">var</span> _1 = <span class="hljs-string">"替换自己的二维码扫码后的url即可"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">is_weixin</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/MicroMessenger/i</span>.test(navigator.userAgent)) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">is_android</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> ua = navigator.userAgent.toLowerCase();
    <span class="hljs-keyword">if</span> (ua.match(<span class="hljs-regexp">/(Android|SymbianOS)/i</span>)) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">is_ios</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> ua = navigator.userAgent.toLowerCase();
    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/iphone|ipad|ipod/</span>.test(ua)) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">android_auto_jump</span>(<span class="hljs-params"></span>) </span>{
    WeixinJSBridge.invoke(<span class="hljs-string">"jumpToInstallUrl"</span>, {}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{});
    <span class="hljs-built_in">window</span>.close();
    WeixinJSBridge.call(<span class="hljs-string">"closeWindow"</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ios_auto_jump</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (_0 != <span class="hljs-string">""</span>) {
        location.href = _0
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">window</span>.close();
        WeixinJSBridge.call(<span class="hljs-string">"closeWindow"</span>)
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onAutoinit</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (is_android()) {
        android_auto_jump();
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
    <span class="hljs-keyword">if</span> (is_ios()) {
        ios_auto_jump();
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
}
<span class="hljs-keyword">if</span> (is_weixin()) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> WeixinJSBridge == <span class="hljs-string">"undefined"</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.addEventListener) {
            <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"WeixinJSBridgeReady"</span>, onAutoinit, <span class="hljs-literal">false</span>)
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.attachEvent) {
            <span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">"WeixinJSBridgeReady"</span>, onAutoinit);
            <span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">"onWeixinJSBridgeReady"</span>, onAutoinit)
        }
    } <span class="hljs-keyword">else</span> {
        onAutoinit()
    }
} <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (_1 != <span class="hljs-string">""</span>) {
        location.href = _1
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">window</span>.close()
    }
}</code></pre>
<p>2018-1-5 下午：14:35</p>
<p>QQ的我已经开发好了，不过很少人玩QQ了，我就不弄了，放着.</p>
<p>2018-1-6 12:30</p>
<p>估计是腾讯把技术给封了，安卓已经不能跳转了，之前一直是封域名，导致域名不能正常跳转，现在域名没有封，但是安卓手机无法跳转了。</p>
<p>2018-1-6 下午17:15</p>
<p>QQjs实现QQ跳转到支付宝APP并领取红包！附：动图demo</p>
<p><span class="img-wrap"><img data-src="/img/bV1yZw?w=343&amp;h=615" src="https://static.alili.tech/img/bV1yZw?w=343&amp;h=615" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>跳转速度也很快。<br>目前先跳到浏览器再询问是否要打开支付宝。<br>我还在优化代码，让它直接绕过询问...<br>安卓也一样，先跳到浏览器再询问是否打开APP，这两者都不是直接跳转，中间都需要调用浏览器，然后通过浏览器请求打开APP，因为浏览器本身就可以请求打开APP的，只是每个APP里面的webview被屏蔽了这个行为，微信也如此，不然直接从微信就可以打开APP了。</p>
<p>本页面持续更新..<br>需要加入我们的技术交流群，可以加微信：likeyunba520</p>
<p>2018-1-6 晚上23：35<br>QQ跳转支付宝已经完成开发</p>
<p>demo<br>用手机QQ扫码体验</p>
<p><span class="img-wrap"><img data-src="/img/bV1AmU?w=242&amp;h=244" src="https://static.alili.tech/img/bV1AmU?w=242&amp;h=244" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html lang=&quot;zh-cmn-hans&quot;>
<head>    
    <meta charset=&quot;UTF-8&quot;>    
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>    
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge, chrome=1&quot;>    
    <title>QQ正在打开支付宝...</title>    
    <script src=&quot;https://open.mobile.qq.com/sdk/qqapi.js&quot;></script>
</head>
<body>
    <script>    
    var qrurl = &quot;你的领红包二维码链接&quot;;    
    function is_weixin() {        
        if (/MicroMessenger/i.test(navigator.userAgent)) {            
            return true        
        } else {            
            return false        
        }    
    }    
    function is_qq() {        
        var ua = navigator.userAgent.toLowerCase();        
        if (ua.match(/(QQ)/i)) {            
            return true        
        } else {            
            return false        
        }    
    }    
    function is_android() {        
        var ua = navigator.userAgent.toLowerCase();        
        if (ua.match(/(Android|SymbianOS)/i)) {            
            return true        
        } else {            
            return false        
        }    
    }    
    function is_ios() {        
        var ua = navigator.userAgent.toLowerCase();        
        if (/iphone|ipad|ipod/.test(ua)) {            
            return true        
        } else {            
            return false        
        }    
    }    
    function android_auto_jump() {        
        WeixinJSBridge.invoke(&quot;jumpToInstallUrl&quot;, {}, function (e) {        
        });        
        window.close();        
        WeixinJSBridge.call(&quot;closeWindow&quot;)    
    }    
    function ios_auto_jump() {        
        if (qrurl != &quot;&quot;) {            
            location.href = qrurl        
        } else {            
            window.close();            
            WeixinJSBridge.call(&quot;closeWindow&quot;)        
        }    
    }    
    function onAutoinit() {        
        if (is_android()) {            
            android_auto_jump();            
            return false        
        }        
        if (is_ios()) {            
            ios_auto_jump();            
            return false        
        }    
    }    
    if (is_weixin()) {        
        if (typeof WeixinJSBridge == &quot;undefined&quot;) {            
            if (document.addEventListener) {                
                document.addEventListener(&quot;WeixinJSBridgeReady&quot;, onAutoinit, false)            
            } else if (document.attachEvent) {                
                document.attachEvent(&quot;WeixinJSBridgeReady&quot;, onAutoinit);                
                document.attachEvent(&quot;onWeixinJSBridgeReady&quot;, onAutoinit)            
            }        
        } else {            
            onAutoinit()        
        }    
    } else if(is_qq()){        
        mqq.invoke(&quot;ui&quot;, &quot;openUrl&quot;, {            
            url: qrurl,            
            target: 2,            
            style: 0        
        });    
    }else {        
        if (qrurl != &quot;&quot;) {            
            location.href = qrurl        
        } else {            
            window.close()        
        }    
    }
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh-cmn-hans"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>    
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>    
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>    
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge, chrome=1"</span>&gt;</span>    
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>QQ正在打开支付宝...<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>    
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://open.mobile.qq.com/sdk/qqapi.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">    
    <span class="hljs-keyword">var</span> qrurl = <span class="hljs-string">"你的领红包二维码链接"</span>;    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">is_weixin</span>(<span class="hljs-params"></span>) </span>{        
        <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/MicroMessenger/i</span>.test(navigator.userAgent)) {            
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>        
        } <span class="hljs-keyword">else</span> {            
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>        
        }    
    }    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">is_qq</span>(<span class="hljs-params"></span>) </span>{        
        <span class="hljs-keyword">var</span> ua = navigator.userAgent.toLowerCase();        
        <span class="hljs-keyword">if</span> (ua.match(<span class="hljs-regexp">/(QQ)/i</span>)) {            
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>        
        } <span class="hljs-keyword">else</span> {            
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>        
        }    
    }    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">is_android</span>(<span class="hljs-params"></span>) </span>{        
        <span class="hljs-keyword">var</span> ua = navigator.userAgent.toLowerCase();        
        <span class="hljs-keyword">if</span> (ua.match(<span class="hljs-regexp">/(Android|SymbianOS)/i</span>)) {            
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>        
        } <span class="hljs-keyword">else</span> {            
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>        
        }    
    }    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">is_ios</span>(<span class="hljs-params"></span>) </span>{        
        <span class="hljs-keyword">var</span> ua = navigator.userAgent.toLowerCase();        
        <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/iphone|ipad|ipod/</span>.test(ua)) {            
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>        
        } <span class="hljs-keyword">else</span> {            
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>        
        }    
    }    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">android_auto_jump</span>(<span class="hljs-params"></span>) </span>{        
        WeixinJSBridge.invoke(<span class="hljs-string">"jumpToInstallUrl"</span>, {}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{        
        });        
        <span class="hljs-built_in">window</span>.close();        
        WeixinJSBridge.call(<span class="hljs-string">"closeWindow"</span>)    
    }    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ios_auto_jump</span>(<span class="hljs-params"></span>) </span>{        
        <span class="hljs-keyword">if</span> (qrurl != <span class="hljs-string">""</span>) {            
            location.href = qrurl        
        } <span class="hljs-keyword">else</span> {            
            <span class="hljs-built_in">window</span>.close();            
            WeixinJSBridge.call(<span class="hljs-string">"closeWindow"</span>)        
        }    
    }    
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onAutoinit</span>(<span class="hljs-params"></span>) </span>{        
        <span class="hljs-keyword">if</span> (is_android()) {            
            android_auto_jump();            
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>        
        }        
        <span class="hljs-keyword">if</span> (is_ios()) {            
            ios_auto_jump();            
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>        
        }    
    }    
    <span class="hljs-keyword">if</span> (is_weixin()) {        
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> WeixinJSBridge == <span class="hljs-string">"undefined"</span>) {            
            <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.addEventListener) {                
                <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"WeixinJSBridgeReady"</span>, onAutoinit, <span class="hljs-literal">false</span>)            
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.attachEvent) {                
                <span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">"WeixinJSBridgeReady"</span>, onAutoinit);                
                <span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">"onWeixinJSBridgeReady"</span>, onAutoinit)            
            }        
        } <span class="hljs-keyword">else</span> {            
            onAutoinit()        
        }    
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(is_qq()){        
        mqq.invoke(<span class="hljs-string">"ui"</span>, <span class="hljs-string">"openUrl"</span>, {            
            <span class="hljs-attr">url</span>: qrurl,            
            <span class="hljs-attr">target</span>: <span class="hljs-number">2</span>,            
            <span class="hljs-attr">style</span>: <span class="hljs-number">0</span>        
        });    
    }<span class="hljs-keyword">else</span> {        
        <span class="hljs-keyword">if</span> (qrurl != <span class="hljs-string">""</span>) {            
            location.href = qrurl        
        } <span class="hljs-keyword">else</span> {            
            <span class="hljs-built_in">window</span>.close()        
        }    
    }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>新建index.html<br>复制上面代码<br>替换链接<br>上传到服务器即可</p>
<p>下次更新新浪微博的<br>本人微信：likeyunba520，可以加微信进群交流</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
开源！js实现微信/QQ直接跳转到支付宝APP打开口令领红包！附：demo

## 原文链接
[https://segmentfault.com/a/1190000012697529](https://segmentfault.com/a/1190000012697529)

