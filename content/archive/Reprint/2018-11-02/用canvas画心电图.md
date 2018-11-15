---
title: 用canvas画心电图
reprint: true
categories: reprint
abbrlink: 2a62a43c
date: 2018-11-02 02:30:12
---

{{% raw %}}
<h2 id="articleHeader0">&#x6548;&#x679C;&#x56FE;&#xFF1A;</h2><p><span class="img-wrap"><img data-src="/img/bVbgBXI?w=640&amp;h=400" src="https://static.alili.tech/img/bVbgBXI?w=640&amp;h=400" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x601D;&#x8DEF;&#xFF1A;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x200B;1.&#x6A21;&#x62DF;&#x70B9;&#xFF08;&#x5982;&#x679C;&#x4F60;&#x6709;&#x771F;&#x5B9E;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x628A;&#x6570;&#x636E;&#x5E7B;&#x5316;&#x6210;canvas&#x5BF9;&#x5E94;&#x7684;&#x5750;&#x6807;&#x70B9;&#xFF09;

&#x200B;  &#x6A21;&#x62DF;&#x70B9;&#x65F6;&#x6CE8;&#x610F;&#x7684;&#x70B9;&#x5C31;&#x662F;&#x9AD8;&#x8D77;&#x90E8;&#x5206;&#x9700;&#x8981;&#x5BF9;&#x79F0;&#x4EE5;&#x53CA;&#x4E3A;&#x4E86;&#x597D;&#x770B;&#x8981;&#x968F;&#x673A;&#x51FA;&#x73B0;&#x4E0A;&#x4E0A;&#x4E0B;&#x4E0B;

2.&#x753B;&#x7EBF;

&#x200B;  &#x753B;&#x7EBF;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x6709;&#x4E00;&#x4E2A;&#x5300;&#x901F;&#x79FB;&#x52A8;&#x7684;&#x8FC7;&#x7A0B;&#x3002;

&#x200B;  &#x6BD4;&#x5982; A&#x70B9;&#x5230;B&#x70B9;&#xFF0C;&#x4E0D;&#x662F;&#x7B80;&#x5355;&#x7684;A&#x753B;&#x5230;B&#xFF0C;&#x800C;&#x662F;A&#x70B9;&#x5230;A1,A2....&#x6700;&#x540E;&#x5230;B&#xFF08;&#x8FD9;&#x4E00;&#x5757;&#x6309;&#x7167;&#x6BD4;&#x4F8B;&#x79FB;&#x52A8;&#x6BD4;&#x8F83;&#x96BE;&#xFF09;

3.&#x753B;&#x7EBF;&#x7684;&#x4E00;&#x4E9B;&#x6548;&#x679C;&#xFF0C;&#x6BD4;&#x5982;&#x52A0;&#x4E0A;&#x9634;&#x5F71;&#xFF08;&#x8FD9;&#x91CC;&#x5C31;&#x53EF;&#x4EE5;&#x81EA;&#x7531;&#x53D1;&#x6325;&#x4E86;&#xFF09;


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dns"><code>&#x200B;<span class="hljs-number">1</span>.&#x6A21;&#x62DF;&#x70B9;&#xFF08;&#x5982;&#x679C;&#x4F60;&#x6709;&#x771F;&#x5B9E;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x628A;&#x6570;&#x636E;&#x5E7B;&#x5316;&#x6210;canvas&#x5BF9;&#x5E94;&#x7684;&#x5750;&#x6807;&#x70B9;&#xFF09;

&#x200B;  &#x6A21;&#x62DF;&#x70B9;&#x65F6;&#x6CE8;&#x610F;&#x7684;&#x70B9;&#x5C31;&#x662F;&#x9AD8;&#x8D77;&#x90E8;&#x5206;&#x9700;&#x8981;&#x5BF9;&#x79F0;&#x4EE5;&#x53CA;&#x4E3A;&#x4E86;&#x597D;&#x770B;&#x8981;&#x968F;&#x673A;&#x51FA;&#x73B0;&#x4E0A;&#x4E0A;&#x4E0B;&#x4E0B;

<span class="hljs-number">2</span>.&#x753B;&#x7EBF;

&#x200B;  &#x753B;&#x7EBF;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x6709;&#x4E00;&#x4E2A;&#x5300;&#x901F;&#x79FB;&#x52A8;&#x7684;&#x8FC7;&#x7A0B;&#x3002;

&#x200B;  &#x6BD4;&#x5982; <span class="hljs-keyword">A</span>&#x70B9;&#x5230;B&#x70B9;&#xFF0C;&#x4E0D;&#x662F;&#x7B80;&#x5355;&#x7684;<span class="hljs-keyword">A</span>&#x753B;&#x5230;B&#xFF0C;&#x800C;&#x662F;<span class="hljs-keyword">A</span>&#x70B9;&#x5230;A1,A2....&#x6700;&#x540E;&#x5230;B&#xFF08;&#x8FD9;&#x4E00;&#x5757;&#x6309;&#x7167;&#x6BD4;&#x4F8B;&#x79FB;&#x52A8;&#x6BD4;&#x8F83;&#x96BE;&#xFF09;

<span class="hljs-number">3</span>.&#x753B;&#x7EBF;&#x7684;&#x4E00;&#x4E9B;&#x6548;&#x679C;&#xFF0C;&#x6BD4;&#x5982;&#x52A0;&#x4E0A;&#x9634;&#x5F71;&#xFF08;&#x8FD9;&#x91CC;&#x5C31;&#x53EF;&#x4EE5;&#x81EA;&#x7531;&#x53D1;&#x6325;&#x4E86;&#xFF09;


</code></pre><h2 id="articleHeader2">&#x5177;&#x4F53;&#x4EE3;&#x7801;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
 &lt;html lang=&quot;en&quot;&gt;
 &lt;head&gt;
     &lt;meta charset=&quot;UTF-8&quot;&gt;
     &lt;title&gt;&#x5FC3;&#x7535;&#x56FE;&lt;/title&gt;
     &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, user-scalable=no&quot;&gt;
     &lt;style&gt;
         html,body{
             width: 100%;
             height: 100%;
             margin: 0;
         }
         canvas{
             background: #000;
             width: 100%;
            height: 100%;
         }
     &lt;/style&gt;
 &lt;/head&gt;
 &lt;body&gt;
 &lt;div id=&quot;canvas&quot;&gt;
     &lt;canvas id=&quot;can&quot;&gt;&lt;/canvas&gt;
 &lt;/div&gt;
 &lt;script&gt;
     var can = document.getElementById(&apos;can&apos;),
         pan,
         index = 0,
         flag = true,
         wid = document.body.clientWidth,
         hei = document.body.clientHeight,
         x = 0,
         y = hei/2,
         drawX = 0, 
         drawY = hei/2,
         drawXY = [],
         cDrawX = 0,
         i = 0,
         reX = 0,
         reY = 0;
     start();
     function start(){
         can.height = hei;
         can.width  = wid;
         pan = can.getContext(&quot;2d&quot;);
         pan.strokeStyle = &quot;white&quot;;
         pan.lineJoin = &quot;round&quot;;
         pan.lineWidth = 6;
         pan.shadowColor = &quot;#228DFF&quot;;
         pan.shadowOffsetX = 0;
         pan.shadowOffsetY = 0;
         pan.shadowBlur = 20;
         pan.beginPath();
         pan.moveTo(x,y);
         drawXYS();
         index = setInterval(move,1);
     };

     function drawXYS(){
         if(drawX &gt; wid){
         }else{
             if(drawY == hei/2){
                 if(flag){
                     flag = false;
                 }else{
                     var _y = Math.ceil(Math.random()*10);
                     _y = _y/2;
                     if(Number.isInteger(_y)){
                         drawY += Math.random()*180+30;
                     }else{
                         drawY -= Math.random()*180+30;
                     }
                     flag = true;
                 }
                 cDrawX = Math.random()*40+15;
             }else{
                 drawY = hei/2;
             }
             drawX += cDrawX;
             drawXY.push({
                 x : drawX,
                 y : drawY
             });
             drawXYS();
         }
     }

     function move(){
         var x = drawXY[i].x,
             y = drawXY[i].y;
         if(reX &gt;= x - 1){
             reX = x;
             reY = y;
             i++;
             cc();
             return;
         }
         if(y &gt; hei/2){
             if(reY &gt;= y){
                 reX = x;
                 reY = y;
                 i++;
                 cc();
                 return;
             }
         }else if(y &lt; hei/2){
             if(reY &lt;= y){
                 reX = x;
                 reY = y;
                 i++;
                 cc();
                 return;
             }
         }else{
             reX = x;
             reY = y;
             i++;
             cc();
             return;
         }

         reX += 1;
         if(y == hei/2){
             reY = hei/2;
         }else{
             var c = Math.abs((drawXY[i].x-drawXY[i-1].x)/(drawXY[i].y-drawXY[i-1].y));
             var _yt = (reX-drawXY[i-1].x)/c;

             if(drawXY[i].y &lt; drawXY[i-1].y){
                 reY = drawXY[i-1].y - _yt;
             }else{
                 reY = drawXY[i-1].y + _yt;
             }
         }
         cc();
     }

    function cc(){
        if(i == drawXY.length){
             pan.closePath();
             clearInterval(index);
             index = 0;
             x = 0;
             y = hei/2;
             flag = true;
             i = 0;
         }else{
             pan.lineTo(reX, reY);
             pan.stroke();
         }
    }
 
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x5FC3;&#x7535;&#x56FE;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1, user-scalable=no&quot;</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
         <span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span>{
             <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
             <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
             <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
         }
         <span class="hljs-selector-tag">canvas</span>{
             <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
             <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
         }
     </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;canvas&quot;</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;can&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
     <span class="hljs-keyword">var</span> can = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;can&apos;</span>),
         pan,
         index = <span class="hljs-number">0</span>,
         flag = <span class="hljs-literal">true</span>,
         wid = <span class="hljs-built_in">document</span>.body.clientWidth,
         hei = <span class="hljs-built_in">document</span>.body.clientHeight,
         x = <span class="hljs-number">0</span>,
         y = hei/<span class="hljs-number">2</span>,
         drawX = <span class="hljs-number">0</span>, 
         drawY = hei/<span class="hljs-number">2</span>,
         drawXY = [],
         cDrawX = <span class="hljs-number">0</span>,
         i = <span class="hljs-number">0</span>,
         reX = <span class="hljs-number">0</span>,
         reY = <span class="hljs-number">0</span>;
     start();
     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>)</span>{
         can.height = hei;
         can.width  = wid;
         pan = can.getContext(<span class="hljs-string">&quot;2d&quot;</span>);
         pan.strokeStyle = <span class="hljs-string">&quot;white&quot;</span>;
         pan.lineJoin = <span class="hljs-string">&quot;round&quot;</span>;
         pan.lineWidth = <span class="hljs-number">6</span>;
         pan.shadowColor = <span class="hljs-string">&quot;#228DFF&quot;</span>;
         pan.shadowOffsetX = <span class="hljs-number">0</span>;
         pan.shadowOffsetY = <span class="hljs-number">0</span>;
         pan.shadowBlur = <span class="hljs-number">20</span>;
         pan.beginPath();
         pan.moveTo(x,y);
         drawXYS();
         index = setInterval(move,<span class="hljs-number">1</span>);
     };

     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawXYS</span>(<span class="hljs-params"></span>)</span>{
         <span class="hljs-keyword">if</span>(drawX &gt; wid){
         }<span class="hljs-keyword">else</span>{
             <span class="hljs-keyword">if</span>(drawY == hei/<span class="hljs-number">2</span>){
                 <span class="hljs-keyword">if</span>(flag){
                     flag = <span class="hljs-literal">false</span>;
                 }<span class="hljs-keyword">else</span>{
                     <span class="hljs-keyword">var</span> _y = <span class="hljs-built_in">Math</span>.ceil(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">10</span>);
                     _y = _y/<span class="hljs-number">2</span>;
                     <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Number</span>.isInteger(_y)){
                         drawY += <span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">180</span>+<span class="hljs-number">30</span>;
                     }<span class="hljs-keyword">else</span>{
                         drawY -= <span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">180</span>+<span class="hljs-number">30</span>;
                     }
                     flag = <span class="hljs-literal">true</span>;
                 }
                 cDrawX = <span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">40</span>+<span class="hljs-number">15</span>;
             }<span class="hljs-keyword">else</span>{
                 drawY = hei/<span class="hljs-number">2</span>;
             }
             drawX += cDrawX;
             drawXY.push({
                 <span class="hljs-attr">x</span> : drawX,
                 <span class="hljs-attr">y</span> : drawY
             });
             drawXYS();
         }
     }

     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">move</span>(<span class="hljs-params"></span>)</span>{
         <span class="hljs-keyword">var</span> x = drawXY[i].x,
             y = drawXY[i].y;
         <span class="hljs-keyword">if</span>(reX &gt;= x - <span class="hljs-number">1</span>){
             reX = x;
             reY = y;
             i++;
             cc();
             <span class="hljs-keyword">return</span>;
         }
         <span class="hljs-keyword">if</span>(y &gt; hei/<span class="hljs-number">2</span>){
             <span class="hljs-keyword">if</span>(reY &gt;= y){
                 reX = x;
                 reY = y;
                 i++;
                 cc();
                 <span class="hljs-keyword">return</span>;
             }
         }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(y &lt; hei/<span class="hljs-number">2</span>){
             <span class="hljs-keyword">if</span>(reY &lt;= y){
                 reX = x;
                 reY = y;
                 i++;
                 cc();
                 <span class="hljs-keyword">return</span>;
             }
         }<span class="hljs-keyword">else</span>{
             reX = x;
             reY = y;
             i++;
             cc();
             <span class="hljs-keyword">return</span>;
         }

         reX += <span class="hljs-number">1</span>;
         <span class="hljs-keyword">if</span>(y == hei/<span class="hljs-number">2</span>){
             reY = hei/<span class="hljs-number">2</span>;
         }<span class="hljs-keyword">else</span>{
             <span class="hljs-keyword">var</span> c = <span class="hljs-built_in">Math</span>.abs((drawXY[i].x-drawXY[i<span class="hljs-number">-1</span>].x)/(drawXY[i].y-drawXY[i<span class="hljs-number">-1</span>].y));
             <span class="hljs-keyword">var</span> _yt = (reX-drawXY[i<span class="hljs-number">-1</span>].x)/c;

             <span class="hljs-keyword">if</span>(drawXY[i].y &lt; drawXY[i<span class="hljs-number">-1</span>].y){
                 reY = drawXY[i<span class="hljs-number">-1</span>].y - _yt;
             }<span class="hljs-keyword">else</span>{
                 reY = drawXY[i<span class="hljs-number">-1</span>].y + _yt;
             }
         }
         cc();
     }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cc</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(i == drawXY.length){
             pan.closePath();
             clearInterval(index);
             index = <span class="hljs-number">0</span>;
             x = <span class="hljs-number">0</span>;
             y = hei/<span class="hljs-number">2</span>;
             flag = <span class="hljs-literal">true</span>;
             i = <span class="hljs-number">0</span>;
         }<span class="hljs-keyword">else</span>{
             pan.lineTo(reX, reY);
             pan.stroke();
         }
    }
 
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><h2 id="articleHeader3">&#x5907;&#x6CE8;</h2><p>&#x4EE3;&#x7801;&#x6CA1;&#x6709;&#x6CE8;&#x91CA;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x770B;&#x4E0D;&#x61C2;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x53EF;&#x4EE5;&#x8054;&#x7CFB;&#x6211;<br>sf&#x4E0A;&#x8054;&#x7CFB;&#x4E0D;&#x5230;&#x7684;&#x8BDD;&#x53EF;&#x4EE5;&#x8054;&#x7CFB;&#x6211;&#x7684;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x6709;&#x4E00;&#x4E2A;&#x59D1;&#x5A18;&#x5728;coding &#x6B22;&#x8FCE;&#x4E00;&#x8D77;&#x4EA4;&#x6D41;&#x5B66;&#x4E60;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用canvas画心电图

## 原文链接
[https://segmentfault.com/a/1190000016313236](https://segmentfault.com/a/1190000016313236)

