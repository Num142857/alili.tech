---
title: '使用flex进行网易云音乐界面构建和布局解析（2）' 
date: 2018-11-18 2:30:10
hidden: true
slug: w8h6drj36jm
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0"><strong>&#x4F7F;&#x7528;flex&#x8FDB;&#x884C;&#x7F51;&#x6613;&#x4E91;&#x97F3;&#x4E50;&#x754C;&#x9762;&#x6784;&#x5EFA;&#x548C;&#x5E03;&#x5C40;&#x89E3;&#x6790;</strong></h2><p>&#x524D;&#x9762;&#x6211;&#x4EEC;&#x901A;&#x8FC7;<a href="https://segmentfault.com/a/1190000015782763">&#x300A;css&#x5E03;&#x5C40;&#x7B80;&#x53F2;&#x4E0E;&#x51B3;&#x80DC;&#x672A;&#x6765;&#x7684;&#x7B2C;&#x56DB;&#x4EE3;css&#x5E03;&#x5C40;&#x6280;&#x672F;&#x300B;</a>&#x4E86;&#x89E3;&#x4E86;css&#x5E03;&#x5C40;&#x53D1;&#x5C55;&#x53F2;&#x548C;&#x672A;&#x6765;&#xFF0C;&#x4E0B;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;<a href="https://segmentfault.com/a/1190000015846688" target="_blank">&#x300A;&#x4F7F;&#x7528;flex&#x8FDB;&#x884C;&#x7F51;&#x6613;&#x4E91;&#x97F3;&#x4E50;&#x754C;&#x9762;&#x6784;&#x5EFA;&#x548C;&#x5E03;&#x5C40;&#x89E3;&#x6790;&#x300B;</a>&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#xFF0C;&#x5982;&#x4F55;&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;flex&#x8FDB;&#x884C;&#x5E03;&#x5C40;&#xFF0C;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x4E5F;&#x4F53;&#x4F1A;&#x5230;&#x4E86;&#x5B83;&#x7684;&#x4FBF;&#x6377;&#x4E4B;&#x5904;&#x3002;&#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x5C31;&#x6DF1;&#x5165;&#x9879;&#x76EE;&#x7684;&#x7EC6;&#x8282;&#xFF0C;&#x8BF4;&#x8BF4;&#x6BCF;&#x4E00;&#x4E2A;&#x5207;&#x56FE;&#x4EBA;&#x5458;&#x7ED5;&#x4E0D;&#x8FC7;&#x53BB;&#x7684;&#x574E;&#x513F;&#xFF0C;&#x4E5F;&#x662F;jser&#x5FC5;&#x987B;&#x8981;&#x9762;&#x5BF9;&#x7684;&#x4E00;&#x4E2A;&#x5E38;&#x89C4;&#x4EFB;&#x52A1;--&#x300A;&#x7F51;&#x6613;&#x4E91;&#x97F3;&#x4E50;&#x9AD8;&#x590D;&#x7528;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x8F6E;&#x64AD;&#x56FE;&#x7684;&#x5B9E;&#x73B0;&#x300B;</p><p>&#x8F6E;&#x64AD;&#x56FE;&#x76F8;&#x5BF9;&#x4E8E;&#x5927;&#x5BB6;&#x7684;&#x5DE5;&#x4F5C;&#xFF0C;&#x5C31;&#x548C;&#x4F60;&#x9996;&#x6B21;&#x53BB;&#x5973;&#x670B;&#x53CB;&#x5BB6;&#x7684;&#x51C6;&#x5907;&#x5DE5;&#x4F5C;&#x4E00;&#x6837;&#xFF0C;&#x91CD;&#x8981;&#x800C;&#x4E14;&#x7ED5;&#x4E0D;&#x8FC7;&#x53BB;&#x3002;&#x9057;&#x61BE;&#x7684;&#x662F;&#xFF0C;&#x5927;&#x90E8;&#x5206;&#x4EBA;&#x5199;&#x8F6E;&#x64AD;&#x56FE;&#x90FD;&#x8DDF;&#x7B2C;&#x4E00;&#x6B21;&#x89C1;&#x5BB6;&#x957F;&#x4E00;&#x6837;&#xFF0C;&#x6CA1;&#x4EC0;&#x4E48;&#x7ECF;&#x9A8C;&#x3002;</p><p>&#x5F88;&#x591A;&#x4EBA;&#x60F3;&#x81EA;&#x5DF1;&#x5199;&#x4E00;&#x5957;&#x8F6E;&#x64AD;&#x56FE;&#xFF0C;&#x7136;&#x540E;&#x4EE5;&#x540E;&#x5DE5;&#x4F5C;&#x4E2D;&#x4E0D;&#x65AD;&#x7684;&#x5B8C;&#x5584;&#xFF0C;&#x6700;&#x540E;&#x5F62;&#x6210;&#x81EA;&#x5DF1;&#x7684;&#x63D2;&#x4EF6;&#x5E93;&#xFF0C;&#x9057;&#x61BE;&#x7684;&#x662F;&#x6709;&#x8FD9;&#x4E2A;&#x60F3;&#x6CD5;&#x7684;&#x5927;&#x90E8;&#x5206;&#x4EBA;&#xFF0C;&#x5230;&#x4E86;&#x884C;&#x52A8;&#x7684;&#x65F6;&#x5019;&#x624D;&#x53D1;&#x73B0;&#xFF0C;&#x60F3;&#x8981;&#x5B9E;&#x73B0;&#x5B83;&#xFF0C;&#x6BD4;&#x5151;&#x73B0;&#x201C;&#x7ED3;&#x5A5A;&#x5C31;&#x4E70;&#x5957;&#x623F;&#x201D;&#x7684;&#x8BFA;&#x8A00;&#x90FD;&#x96BE;&#x3002;&#x6700;&#x540E;&#x53EA;&#x597D;&#x8FEB;&#x4E8E;&#x9879;&#x76EE;&#x538B;&#x529B;&#x548C;&#x81EA;&#x8EAB;&#x6280;&#x80FD;&#x6C34;&#x5E73;&#xFF0C;&#x53D8;&#x6210;&#x4E86;&#x63D2;&#x4EF6;&#x7684;&#x642C;&#x8FD0;&#x5DE5;&#x3002;</p><p>&#x53EF;&#x662F;&#x63D2;&#x4EF6;&#x642C;&#x8FD0;&#x5DE5;&#x6709;&#x4E09;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x9996;&#x5148;&#x8FD9;&#x4E2A;&#x4E1C;&#x897F;&#x5BF9;&#x4E00;&#x4E2A;&#x4EBA;&#x7684;&#x6280;&#x672F;&#x6210;&#x957F;&#x6CA1;&#x4EC0;&#x4E48;&#x7528;&#xFF0C;&#x5176;&#x6B21;&#x4E5F;&#x662F;&#x91CD;&#x70B9;&#xFF0C;&#x63D2;&#x4EF6;&#x5E76;&#x4E0D;&#x80FD;&#x5B8C;&#x5168;&#x7B26;&#x5408;&#x9879;&#x76EE;&#x9700;&#x6C42;&#xFF0C;&#x81EA;&#x5DF1;&#x53C8;&#x6CA1;&#x6709;&#x80FD;&#x529B;&#x8FDB;&#x884C;&#x4E8C;&#x6B21;&#x5F00;&#x53D1;&#xFF0C;&#x9047;&#x4E0A;&#x8BE1;&#x5F02;bug&#x4E5F;&#x53EA;&#x80FD;&#x542C;&#x5929;&#x7531;&#x547D;&#xFF0C;&#x7EE7;&#x7EED;&#x8E0F;&#x4E0A;&#x5BFB;&#x627E;&#x66F4;&#x5408;&#x9002;&#x7684;&#x63D2;&#x4EF6;&#x7684;&#x6162;&#x6162;&#x5F81;&#x9014;&#x3002;&#x6700;&#x540E;&#xFF0C;&#x6709;&#x4E9B;&#x63D2;&#x4EF6;&#x5F88;&#x91CD;&#xFF0C;&#x5F88;&#x81C3;&#x80BF;&#xFF0C;&#x4F46;&#x4F60;&#x53EA;&#x9700;&#x8981;&#x7684;&#x662F;&#x6700;&#x57FA;&#x7840;&#x7684;&#x8F6E;&#x64AD;&#x529F;&#x80FD;&#x800C;&#x5DF2;&#x3002;&#x4F60;&#x4F1A;&#x4E3A;&#x4E86;&#x5403;&#x4E0A;&#x4E00;&#x789F;&#x918B;&#xFF0C;&#x4E13;&#x95E8;&#x5305;&#x987F;&#x997A;&#x5B50;&#x5417;&#xFF1F;&#x6211;&#x60F3;&#x4E0D;&#x4F1A;&#x3002;&#x90A3;&#x4F60;&#x4E3A;&#x4EC0;&#x4E48;&#x4EC5;&#x4EC5;&#x4E3A;&#x4E86;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x8F6E;&#x64AD;&#x56FE;&#x4F1A;&#x800C;&#x9879;&#x76EE;&#x91CC;&#x9762;&#x4F7F;&#x7528;&#x51E0;&#x767E;k&#x751A;&#x81F3;&#x4E0A;M&#x7684;&#x63D2;&#x4EF6;&#xFF1F;</p><p>&#x5F88;&#x591A;&#x4EBA;&#x53EF;&#x80FD;&#x4F1A;&#x8BF4;&#x56E0;&#x4E3A;&#x4E0D;&#x4F1A;&#x5199;&#xFF0C;&#x597D;&#xFF0C;&#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x5C31;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x539F;&#x6765;js&#x7684;&#x4E16;&#x754C;&#x5982;&#x6B64;&#x7684;&#x7B80;&#x5355;&#x548C;&#x7F8E;&#x597D;&#xFF0C;&#x6709;&#x627E;&#x63D2;&#x4EF6;&#x7684;&#x529F;&#x592B;&#xFF0C;&#x4F60;&#x90FD;&#x80FD;&#x5F00;&#x53D1;&#x51FA;8&#x4E2A;&#x63D2;&#x4EF6;&#x4E86;&#x3002;</p><p>=<span class="img-wrap"><img data-src="/img/bVbe2hC?w=633&amp;h=912" src="https://static.alili.tech/img/bVbe2hC?w=633&amp;h=912" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x5F80;&#x4E0A;&#x770B;&#xFF0C;&#x5927;&#x5BB6;&#x90FD;&#x8BA4;&#x7684;&#x5565;&#x53EB;&#x8F6E;&#x64AD;&#x56FE;&#xFF0C;&#x4ED4;&#x7EC6;&#x770B;&#x4E0B;&#x4F60;&#x7B2C;&#x4E00;&#x6B65;&#x8981;&#x505A;&#x7684;&#x81F3;&#x5C11;&#x8BF4;&#x6211;&#x62D6;&#x7740;&#x4E00;&#x4E2A;&#x4E1C;&#x897F;&#x5F97;&#x80FD;&#x52A8;&#xFF0C;&#x54EA;&#x6015;&#x662F;&#x4E00;&#x4E2A;&#x7EA2;&#x8272;&#x65B9;&#x5757;&#x5457;&#x3002;&#x8FD9;&#x91CC;&#x5C31;&#x5F97;&#x8BF4;&#x4E0B;&#x62D6;&#x62FD;&#xFF0C;&#x62D6;&#x62FD;&#x6539;&#x53D8;&#x7684;&#x65E0;&#x975E;&#x5C31;&#x662F;left&#x548C;top&#x503C;&#xFF08;&#x5916;&#x661F;&#x4EBA;&#x624D;&#x6539;right&#x548C;bottom&#xFF0C;&#x6211;&#x4EEC;&#x5730;&#x7403;&#x4EBA;&#x4E00;&#x822C;&#x90FD;&#x7528;left&#x548C;top&#xFF0C;&#x522B;&#x95EE;&#x6211;&#x4E3A;&#x4EC0;&#x4E48;&#xFF09;,&#x5148;&#x8BA9;&#x4ED6;&#x5728;&#x4E00;&#x4E2A;&#x65B9;&#x5411;&#x4E0A;&#x52A8;&#x8D77;&#x6765;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;style&gt;
        #div1 {
            width: 100px;
            height: 100px;
            position: absolute;
            left: 50px;
            top: 50px;
            background: red;
        }
    &lt;/style&gt;
    &lt;script&gt;
        document.addEventListener(&quot;DOMContentLoaded&quot;, function () {
            var oDiv = document.getElementById(&apos;div1&apos;);

            var disX = 0;
            oDiv.addEventListener(&quot;touchstart&quot;, function (e) {
                var startPoint = e.changedTouches[0].pageX;
                var startLeft = oDiv.offsetLeft;
                disX = startPoint - startLeft;
            });

            oDiv.addEventListener(&quot;touchmove&quot;, doMove,false);
            function doMove(e) {
                var currPoint = e.changedTouches[0].pageX;
                var newLeft  = currPoint - disX;
                oDiv.style.left = newLeft +&apos;px&apos;;
            }
            function doUp(e) {
                var currPoint = e.changedTouches[0].pageX;
                var newLeft  = currPoint - disX;
                oDiv.style.left = newLeft +&apos;px&apos;;
                oDiv.removeEventListener(&quot;touchmove&quot;, doUp,false);
                oDiv.removeEventListener(&quot;touchend&quot;, doUp,false);
            }
            oDiv.addEventListener(&quot;touchend&quot;, doUp,false);
        }, false);
    &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id=&quot;div1&quot;&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-id">#div1</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">background</span>: red;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&quot;DOMContentLoaded&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> oDiv = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;div1&apos;</span>);

            <span class="hljs-keyword">var</span> disX = <span class="hljs-number">0</span>;
            oDiv.addEventListener(<span class="hljs-string">&quot;touchstart&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                <span class="hljs-keyword">var</span> startPoint = e.changedTouches[<span class="hljs-number">0</span>].pageX;
                <span class="hljs-keyword">var</span> startLeft = oDiv.offsetLeft;
                disX = startPoint - startLeft;
            });

            oDiv.addEventListener(<span class="hljs-string">&quot;touchmove&quot;</span>, doMove,<span class="hljs-literal">false</span>);
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doMove</span>(<span class="hljs-params">e</span>) </span>{
                <span class="hljs-keyword">var</span> currPoint = e.changedTouches[<span class="hljs-number">0</span>].pageX;
                <span class="hljs-keyword">var</span> newLeft  = currPoint - disX;
                oDiv.style.left = newLeft +<span class="hljs-string">&apos;px&apos;</span>;
            }
            <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doUp</span>(<span class="hljs-params">e</span>) </span>{
                <span class="hljs-keyword">var</span> currPoint = e.changedTouches[<span class="hljs-number">0</span>].pageX;
                <span class="hljs-keyword">var</span> newLeft  = currPoint - disX;
                oDiv.style.left = newLeft +<span class="hljs-string">&apos;px&apos;</span>;
                oDiv.removeEventListener(<span class="hljs-string">&quot;touchmove&quot;</span>, doUp,<span class="hljs-literal">false</span>);
                oDiv.removeEventListener(<span class="hljs-string">&quot;touchend&quot;</span>, doUp,<span class="hljs-literal">false</span>);
            }
            oDiv.addEventListener(<span class="hljs-string">&quot;touchend&quot;</span>, doUp,<span class="hljs-literal">false</span>);
        }, <span class="hljs-literal">false</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;div1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x4ED4;&#x7EC6;&#x770B;&#xFF0C;&#x65E0;&#x975E;&#x5C31;&#x662F;&#x7528;&#x4E86;&#x79FB;&#x52A8;&#x7AEF;&#x4E8B;&#x4EF6;&#x800C;&#x5DF2;&#xFF0C;&#x5206;&#x5206;&#x949F;&#x5C31;&#x80FD;&#x7406;&#x89E3;&#xFF0C;&#x95EE;&#x9898;&#x662F;&#x5F88;&#x591A;&#x540C;&#x5B66;&#x4F1A;&#x8BF4;&#xFF0C;&#x8001;&#x5E08;&#xFF0C;&#x6211;&#x4E0D;&#x7406;&#x89E3;&#x8FD9;&#x91CC;&#xFF0C;&#x8FD9;&#x662F;&#x5565;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var currPoint = e.changedTouches[0].pageX;
 var newLeft  = currPoint - disX;
 oDiv.style.left = newLeft +&apos;px&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code> <span class="hljs-keyword">var</span> currPoint = e.changedTouches[<span class="hljs-number">0</span>].pageX;
 <span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Left</span>  = currPoint - disX;
 oDiv.style.left = <span class="hljs-keyword">new</span><span class="hljs-type">Left</span> +<span class="hljs-string">&apos;px&apos;</span>;</code></pre><p><strong>&#x8FD9;&#x4E2A;&#x53C8;&#x662F;&#x5565;&#xFF1F;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var currPoint = e.changedTouches[0].pageX;
var newLeft  = currPoint - disX;
oDiv.style.left = newLeft +&apos;px&apos;;
oDiv.addEventListener(&quot;touchmove&quot;, doUp,false);
oDiv.addEventListener(&quot;touchend&quot;, doUp,false);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> currPoint = e.changedTouches[<span class="hljs-number">0</span>].pageX;
<span class="hljs-keyword">var</span> <span class="hljs-keyword">new</span><span class="hljs-type">Left</span>  = currPoint - disX;
oDiv.style.left = <span class="hljs-keyword">new</span><span class="hljs-type">Left</span> +<span class="hljs-string">&apos;px&apos;</span>;
oDiv.addEventListener(<span class="hljs-string">&quot;touchmove&quot;</span>, doUp,<span class="hljs-literal">false</span>);
oDiv.addEventListener(<span class="hljs-string">&quot;touchend&quot;</span>, doUp,<span class="hljs-literal">false</span>);</code></pre><p>&#x5176;&#x5B9E;&#x8FD9;&#x4E9B;&#x5C31;&#x662F;&#x6838;&#x5FC3;&#x5185;&#x5BB9;&#xFF0C;&#x7B80;&#x5355;&#x7684;&#x8BF4;&#x5C31;&#x662F;&#x4E00;&#x5F20;&#x56FE;&#xFF0C;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x7684;&#x56FE;&#xFF0C;<strong>&#x4F60;&#x4E00;&#x770B;&#x5C31;&#x80FD;&#x61C2;&#x3002;</strong></p><p>!<span class="img-wrap"><img data-src="/img/bVbe2hG?w=1913&amp;h=798" src="https://static.alili.tech/img/bVbe2hG?w=1913&amp;h=798" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x7B97;&#x84DD;&#x7EBF;&#x7684;&#x8DDD;&#x79BB;&#x53EA;&#x8981;&#x84DD;&#x7EBF;&#x6B63;&#x786E;&#xFF0C;&#x4F4D;&#x7F6E;&#x5C31;&#x9519;&#x4E0D;&#x4E86;&#xFF0C;&#x771F;&#x8981;&#x662F;&#x7406;&#x89E3;&#x4E0D;&#x4E86;&#x4E5F;&#x6CA1;&#x4E8B;&#xFF0C;&#x4F60;&#x5C31;&#x628A;&#x4ED6;&#x5F53;&#x6210;&#x516C;&#x5F0F;&#x8BB0;&#x4F4F;&#x4E00;&#x70B9;&#x6BDB;&#x75C5;&#x4E5F;&#x6CA1;&#x6709;&#x3002;&#x6709;&#x4E86;&#x8FD9;&#x4E9B;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#x5C31;&#x597D;&#x529E;&#x4E86;&#xFF0C;&#x642D;&#x4E2A;&#x67B6;&#x5B50;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;

&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0&quot;&gt;
    &lt;style&gt;
        * {
            margin: 0;
            padding: 0;
        }

        li {
            list-style: none;
        }

        .swiper-container {
            width: 320px;
            height: 130px;
            position: relative;
            margin: 20px auto;
            overflow: hidden;
        }

        .swiper-container .swiper-wrapper {
            width: 2240px;
            height: 130px;
            position: absolute;
            left: 0px;
        }

        .swiper-container .swiper-wrapper img {
            width: 320px;
            height: 130px;
            float: left;
            display: block;
        }

        .swiper-container ul {
            width: 35px;
            height: 4px;
            position: absolute;
            bottom: 10px;
            left: 50%;
            margin-left: -15px;
        }

        .swiper-container ul li {
            width: 4px;
            height: 4px;
            border-radius: 2px;
            border: 0.25px solid #fff;
            margin-left: 2.5px;
            background: #666;
            float: left;
            cursor: pointer;
        }

        .swiper-container ul .active {
            background: #fff;
        }

        .swiper-container ul li:hover {
            background: #fff;
        }
    &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;div class=&quot;swiper-container&quot;&gt;
        &lt;div class=&quot;swiper-wrapper&quot;&gt;
            &lt;img src=&quot;images/4.jpg&quot;&gt;
            &lt;img src=&quot;images/0.jpg&quot;&gt;
            &lt;img src=&quot;images/1.jpg&quot;&gt;
            &lt;img src=&quot;images/2.jpg&quot;&gt;
            &lt;img src=&quot;images/3.jpg&quot;&gt;
            &lt;img src=&quot;images/4.jpg&quot;&gt;
            &lt;img src=&quot;images/0.jpg&quot;&gt;
        &lt;/div&gt;
        &lt;ul&gt;
            &lt;li class=&quot;active&quot;&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    &lt;script&gt;
        document.addEventListener(&quot;DOMContentLoaded&quot;, function () {
            var oSWiperContainer = document.querySelector(&quot;.swiper-container&quot;);
            var oSWiperWrapper = document.querySelector(&quot;.swiper-container .swiper-wrapper&quot;);
            var aImg = document.querySelectorAll(&quot;.swiper-container .swiper-wrapper img&quot;)
            var aLi = document.querySelectorAll(&quot;.swiper-container ul li&quot;);
            oSWiperContainer.addEventListener(&quot;touchstart&quot;, function (e) {
                var disX = 0;
                var startPoint = e.changedTouches[0].pageX;
                var startLeft = oSWiperWrapper.getBoundingClientRect().left;
                disX = startPoint - startLeft;
                oSWiperContainer.addEventListener(&quot;touchmove&quot;, doMove, false);
                oSWiperContainer.addEventListener(&quot;touchend&quot;, doUp, false);
                
                function doMove(e) {
                    var currPoint = e.changedTouches[0].pageX;
                    var newLeft = currPoint - disX;
                    oSWiperWrapper.style.left = newLeft + &apos;px&apos;;
                }
                function doUp(e) {
                    oSWiperContainer.removeEventListener(&quot;touchmove&quot;, doUp, false);
                    oSWiperContainer.removeEventListener(&quot;touchend&quot;, doUp, false);
                }
            }, false);

        }, false);
    &lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }

        <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">list-style</span>: none;
        }

        <span class="hljs-selector-class">.swiper-container</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">130px</span>;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
            <span class="hljs-attribute">overflow</span>: hidden;
        }

        <span class="hljs-selector-class">.swiper-container</span> <span class="hljs-selector-class">.swiper-wrapper</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">2240px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">130px</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
        }

        <span class="hljs-selector-class">.swiper-container</span> <span class="hljs-selector-class">.swiper-wrapper</span> <span class="hljs-selector-tag">img</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">130px</span>;
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">display</span>: block;
        }

        <span class="hljs-selector-class">.swiper-container</span> <span class="hljs-selector-tag">ul</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">35px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">4px</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">bottom</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">15px</span>;
        }

        <span class="hljs-selector-class">.swiper-container</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">4px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">4px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2px</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">0.25px</span> solid <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">2.5px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#666</span>;
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">cursor</span>: pointer;
        }

        <span class="hljs-selector-class">.swiper-container</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-class">.active</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
        }

        <span class="hljs-selector-class">.swiper-container</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;swiper-container&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;swiper-wrapper&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;images/4.jpg&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;images/0.jpg&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;images/1.jpg&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;images/2.jpg&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;images/3.jpg&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;images/4.jpg&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;images/0.jpg&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;active&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&quot;DOMContentLoaded&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> oSWiperContainer = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;.swiper-container&quot;</span>);
            <span class="hljs-keyword">var</span> oSWiperWrapper = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;.swiper-container .swiper-wrapper&quot;</span>);
            <span class="hljs-keyword">var</span> aImg = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&quot;.swiper-container .swiper-wrapper img&quot;</span>)
            <span class="hljs-keyword">var</span> aLi = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&quot;.swiper-container ul li&quot;</span>);
            oSWiperContainer.addEventListener(<span class="hljs-string">&quot;touchstart&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                <span class="hljs-keyword">var</span> disX = <span class="hljs-number">0</span>;
                <span class="hljs-keyword">var</span> startPoint = e.changedTouches[<span class="hljs-number">0</span>].pageX;
                <span class="hljs-keyword">var</span> startLeft = oSWiperWrapper.getBoundingClientRect().left;
                disX = startPoint - startLeft;
                oSWiperContainer.addEventListener(<span class="hljs-string">&quot;touchmove&quot;</span>, doMove, <span class="hljs-literal">false</span>);
                oSWiperContainer.addEventListener(<span class="hljs-string">&quot;touchend&quot;</span>, doUp, <span class="hljs-literal">false</span>);
                
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doMove</span>(<span class="hljs-params">e</span>) </span>{
                    <span class="hljs-keyword">var</span> currPoint = e.changedTouches[<span class="hljs-number">0</span>].pageX;
                    <span class="hljs-keyword">var</span> newLeft = currPoint - disX;
                    oSWiperWrapper.style.left = newLeft + <span class="hljs-string">&apos;px&apos;</span>;
                }
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doUp</span>(<span class="hljs-params">e</span>) </span>{
                    oSWiperContainer.removeEventListener(<span class="hljs-string">&quot;touchmove&quot;</span>, doUp, <span class="hljs-literal">false</span>);
                    oSWiperContainer.removeEventListener(<span class="hljs-string">&quot;touchend&quot;</span>, doUp, <span class="hljs-literal">false</span>);
                }
            }, <span class="hljs-literal">false</span>);

        }, <span class="hljs-literal">false</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x81F3;&#x5C11;&#x73B0;&#x5728;&#x4E00;&#x62D6;&#x62FD;&#x8D70;&#x8D77;&#x6765;&#x4E86;&#xFF0C;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x5427;&#xFF0C;&#x8FDE;&#x7EB5;&#x5411;&#x90FD;&#x4E0D;&#x7528;&#x8003;&#x8651;&#xFF0C;&#x8F6E;&#x64AD;&#x6BD4;&#x62D6;&#x62FD;&#x8FD8;&#x7B80;&#x5355;&#xFF0C;&#x53EA;&#x8003;&#x8651;&#x6C34;&#x5E73;&#x65B9;&#x5411;&#xFF0C;</p><p>&#x95EE;&#x9898;&#x662F;&#x677E;&#x624B;&#x4E86;&#x4EE5;&#x540E;&#xFF0C;&#x8F6E;&#x64AD;&#x56FE;&#x7684;&#xFF0C;&#x6BCF;&#x4E00;&#x9879;&#x6CA1;&#x53BB;&#x6B63;&#x786E;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x5565;&#x53EB;&#x6B63;&#x786E;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x5176;&#x5B9E;&#x6BCF;&#x6B21;&#x6539;&#x53D8;&#x7684;left&#x7684;&#x503C;&#x5C06;&#x597D;&#x662F;&#x4E00;&#x4E2A;&#x8F6E;&#x64AD;&#x56FE;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x4E0A;&#x56FE;&#x3002;</p><p>!<span class="img-wrap"><img data-src="/img/bVbe2hI?w=1913&amp;h=798" src="https://static.alili.tech/img/bVbe2hI?w=1913&amp;h=798" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span>&#x4F60;&#x5148;&#x522B;&#x7BA1;&#x522B;&#x7684;&#xFF0C;&#x770B;&#x7EA2;&#x6846;&#x5C31;&#x662F;&#x624B;&#x673A;&#x5C4F;&#x5E55;&#x5BBD;&#x5EA6;&#xFF0C;&#x6BCF;&#x6B21;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x79FB;&#x52A8;&#x4E00;&#x4E2A;&#x683C;&#x5B50;&#x3002;&#x90A3;&#x6211;&#x53EA;&#x8981;&#x5B9A;&#x4E00;&#x4E2A;iNow&#x503C;&#x8BB0;&#x5F55;&#x79FB;&#x52A8;&#x51E0;&#x4E2A;&#x683C;&#x5B50;&#xFF0C;&#x53EA;&#x8981;iNow&#x6B63;&#x786E;&#x5C31;&#x4E00;&#x5207;OK&#x4E86;&#x5457;&#xFF0C;&#x8BF4;&#x5E72;&#x5C31;&#x5E72;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;

&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0&quot;&gt;
    &lt;style&gt;
        * {
            margin: 0;
            padding: 0;
        }

        li {
            list-style: none;
        }

        .swiper-container {
            width: 320px;
            height: 130px;
            position: relative;
            margin: 20px auto;
            overflow: hidden;
        }

        .swiper-container .swiper-wrapper {
            width: 2240px;
            height: 130px;
            position: absolute;
            left: 0px;
            transition: .3s all ease;

        }

        .swiper-container .swiper-wrapper img {
            width: 320px;
            height: 130px;
            float: left;
            display: block;
        }

        .swiper-container ul {
            width: 35px;
            height: 4px;
            position: absolute;
            bottom: 10px;
            left: 50%;
            margin-left: -15px;
        }

        .swiper-container ul li {
            width: 4px;
            height: 4px;
            border-radius: 2px;
            border: 0.25px solid #fff;
            margin-left: 2.5px;
            background: #666;
            float: left;
            cursor: pointer;
        }

        .swiper-container ul .active {
            background: #fff;
        }

        .swiper-container ul li:hover {
            background: #fff;
        }
    &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;div class=&quot;swiper-container&quot;&gt;
        &lt;div class=&quot;swiper-wrapper&quot;&gt;
            &lt;img src=&quot;images/1.jpg&quot;&gt;
            &lt;img src=&quot;images/2.jpg&quot;&gt;
            &lt;img src=&quot;images/3.jpg&quot;&gt;
            &lt;img src=&quot;images/4.jpg&quot;&gt;
        &lt;/div&gt;
        &lt;ul&gt;
            &lt;li class=&quot;active&quot;&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    &lt;script&gt;
        document.addEventListener(&quot;DOMContentLoaded&quot;, function () {
            var oSWiperContainer = document.querySelector(&quot;.swiper-container&quot;);
            var oSWiperWrapper = document.querySelector(&quot;.swiper-container .swiper-wrapper&quot;);
            var aImg = document.querySelectorAll(&quot;.swiper-container .swiper-wrapper img&quot;)
            var aLi = document.querySelectorAll(&quot;.swiper-container ul li&quot;);

            var iNow = 0;
            var oW = aImg[0].offsetWidth;
            oSWiperContainer.addEventListener(&quot;touchstart&quot;, function (e) {
                var disX = 0;
                var startPoint = e.changedTouches[0].pageX;
                var startLeft = oSWiperWrapper.getBoundingClientRect().left;
                disX = startPoint - startLeft;
                oSWiperContainer.addEventListener(&quot;touchmove&quot;, doMove, false);
                oSWiperContainer.addEventListener(&quot;touchend&quot;, doUp, false);
                
                function doMove(e) {
                    var currPoint = e.changedTouches[0].pageX;
                    var newLeft = currPoint - disX;
                    oSWiperWrapper.style.left = newLeft+&apos;px&apos;;
                }
                function doUp(e) {
                    var endPoint = e.changedTouches[0].pageX;
                    
                    if(endPoint-startPoint&gt;50){
                        iNow--;
                        if(iNow==-1){
                            iNow = 0;
                        }
                        oSWiperWrapper.style.left = -iNow*oW+&apos;px&apos;;
                    }
                    if(endPoint-startPoint&lt;-50){
                        iNow++;
                        if(iNow==aImg.length){
                            iNow = aImg.length -1;
                        }
                        oSWiperWrapper.style.left = -iNow*oW+&apos;px&apos;;
                    }

                    oSWiperContainer.removeEventListener(&quot;touchmove&quot;, doMove, false);
                    oSWiperContainer.removeEventListener(&quot;touchend&quot;, doUp, false);
                }
            }, false);

        }, false);
    &lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }

        <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">list-style</span>: none;
        }

        <span class="hljs-selector-class">.swiper-container</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">130px</span>;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
            <span class="hljs-attribute">overflow</span>: hidden;
        }

        <span class="hljs-selector-class">.swiper-container</span> <span class="hljs-selector-class">.swiper-wrapper</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">2240px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">130px</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
            <span class="hljs-attribute">transition</span>: .<span class="hljs-number">3s</span> all ease;

        }

        <span class="hljs-selector-class">.swiper-container</span> <span class="hljs-selector-class">.swiper-wrapper</span> <span class="hljs-selector-tag">img</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">130px</span>;
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">display</span>: block;
        }

        <span class="hljs-selector-class">.swiper-container</span> <span class="hljs-selector-tag">ul</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">35px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">4px</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">bottom</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">15px</span>;
        }

        <span class="hljs-selector-class">.swiper-container</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">4px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">4px</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2px</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">0.25px</span> solid <span class="hljs-number">#fff</span>;
            <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">2.5px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#666</span>;
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">cursor</span>: pointer;
        }

        <span class="hljs-selector-class">.swiper-container</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-class">.active</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
        }

        <span class="hljs-selector-class">.swiper-container</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;swiper-container&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;swiper-wrapper&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;images/1.jpg&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;images/2.jpg&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;images/3.jpg&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;images/4.jpg&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;active&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">&quot;DOMContentLoaded&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> oSWiperContainer = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;.swiper-container&quot;</span>);
            <span class="hljs-keyword">var</span> oSWiperWrapper = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;.swiper-container .swiper-wrapper&quot;</span>);
            <span class="hljs-keyword">var</span> aImg = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&quot;.swiper-container .swiper-wrapper img&quot;</span>)
            <span class="hljs-keyword">var</span> aLi = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&quot;.swiper-container ul li&quot;</span>);

            <span class="hljs-keyword">var</span> iNow = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">var</span> oW = aImg[<span class="hljs-number">0</span>].offsetWidth;
            oSWiperContainer.addEventListener(<span class="hljs-string">&quot;touchstart&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
                <span class="hljs-keyword">var</span> disX = <span class="hljs-number">0</span>;
                <span class="hljs-keyword">var</span> startPoint = e.changedTouches[<span class="hljs-number">0</span>].pageX;
                <span class="hljs-keyword">var</span> startLeft = oSWiperWrapper.getBoundingClientRect().left;
                disX = startPoint - startLeft;
                oSWiperContainer.addEventListener(<span class="hljs-string">&quot;touchmove&quot;</span>, doMove, <span class="hljs-literal">false</span>);
                oSWiperContainer.addEventListener(<span class="hljs-string">&quot;touchend&quot;</span>, doUp, <span class="hljs-literal">false</span>);
                
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doMove</span>(<span class="hljs-params">e</span>) </span>{
                    <span class="hljs-keyword">var</span> currPoint = e.changedTouches[<span class="hljs-number">0</span>].pageX;
                    <span class="hljs-keyword">var</span> newLeft = currPoint - disX;
                    oSWiperWrapper.style.left = newLeft+<span class="hljs-string">&apos;px&apos;</span>;
                }
                <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doUp</span>(<span class="hljs-params">e</span>) </span>{
                    <span class="hljs-keyword">var</span> endPoint = e.changedTouches[<span class="hljs-number">0</span>].pageX;
                    
                    <span class="hljs-keyword">if</span>(endPoint-startPoint&gt;<span class="hljs-number">50</span>){
                        iNow--;
                        <span class="hljs-keyword">if</span>(iNow==<span class="hljs-number">-1</span>){
                            iNow = <span class="hljs-number">0</span>;
                        }
                        oSWiperWrapper.style.left = -iNow*oW+<span class="hljs-string">&apos;px&apos;</span>;
                    }
                    <span class="hljs-keyword">if</span>(endPoint-startPoint&lt;<span class="hljs-number">-50</span>){
                        iNow++;
                        <span class="hljs-keyword">if</span>(iNow==aImg.length){
                            iNow = aImg.length <span class="hljs-number">-1</span>;
                        }
                        oSWiperWrapper.style.left = -iNow*oW+<span class="hljs-string">&apos;px&apos;</span>;
                    }

                    oSWiperContainer.removeEventListener(<span class="hljs-string">&quot;touchmove&quot;</span>, doMove, <span class="hljs-literal">false</span>);
                    oSWiperContainer.removeEventListener(<span class="hljs-string">&quot;touchend&quot;</span>, doUp, <span class="hljs-literal">false</span>);
                }
            }, <span class="hljs-literal">false</span>);

        }, <span class="hljs-literal">false</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x5F3A;&#x8C03;&#x4E00;&#x70B9;&#xFF0C;getBoundingClientRect()&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4E3A;&#x4EC0;&#x4E48;&#x6CA1;&#x7528;offsetLeft&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x91CC;&#x9762;&#x4E0D;&#x53EF;&#x80FD;&#x8F6E;&#x64AD;&#x56FE;&#x7684;&#x5916;&#x5C42;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x5957;&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#x4E07;&#x4E00;&#x6709;margin&#x3001;padding&#xFF0C;&#x8F6E;&#x64AD;&#x56FE;&#x7684;&#x8DDD;&#x79BB;&#x5C31;&#x4E0D;&#x5BF9;&#x4E86;&#xFF0C;&#x4F7F;&#x7528;offsetLeft&#x662F;&#x4E0D;&#x5177;&#x6709;&#x9879;&#x76EE;&#x7684;&#x5B9E;&#x7528;&#x6027;&#x7684;&#xFF0C;&#x505A;&#x6F14;&#x793A;&#x8FD8;&#x884C;&#xFF0C;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x90A3;&#x4E48;&#x5199;&#x5C31;&#x5E9F;&#x4E86;&#x3002;</p><p>&#x6700;&#x540E;&#x6211;&#x8BF4;&#x4E00;&#x4E2A;&#x65E0;&#x9650;&#x8F6E;&#x64AD;&#x56FE;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x7B97;&#x6570;&#x5B57;&#x7684;&#xFF0C;!<span class="img-wrap"><img data-src="/img/bVbe2hI?w=1913&amp;h=798" src="https://static.alili.tech/img/bVbe2hI?w=1913&amp;h=798" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span>)&#x6240;&#x8C13;&#x65E0;&#x9650;&#x8F6E;&#x64AD;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x5C31;&#x662F;&#x5F53;iNow &#x7B49;&#x4E8E;&#x6700;&#x53F3;&#x8FB9;&#x7684;0&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x62C9;&#x56DE;&#x5230;&#x7EA2;&#x6846;&#x4F4D;&#x7F6E;&#xFF0C;&#x5DE6;&#x4FA7;&#x662F;&#x5F53;iNow &#x7B49;&#x4E8E; &#x6700;&#x5DE6;&#x8FB9;&#x7684;4&#x7684;&#x65F6;&#x5019;&#xFF0C;iNow&#x7B49;&#x4E8E;6.</p><p>&#x5F88;&#x591A;&#x4EBA;&#x6709;&#x4E86;&#x6E90;&#x4EE3;&#x7801;&#x5C31;&#x5FFD;&#x7565;&#x4E86;&#x57FA;&#x7840;&#x7684;&#x5B66;&#x4E60;&#xFF0C;&#x76F4;&#x63A5;&#x62FF;&#x8FC7;&#x53BB;&#x7528;&#x4E86;&#xFF0C;&#x90A3;&#x8DDF;&#x76F4;&#x63A5;&#x627E;&#x63D2;&#x4EF6;&#x6CA1;&#x533A;&#x522B;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x5C31;&#x5F53;&#x4E00;&#x4E2A;&#x5C0F;&#x7EC3;&#x4E60;&#x5427;&#x3002;</p><p>&#x56DB;&#x4E2A;&#x7EC3;&#x4E60;&#xFF1A;</p><p>1.&#x5B9E;&#x73B0;&#x591A;&#x5C4F;&#x5E55;&#x76F8;&#x5E94;&#x9002;&#x914D;</p><p>2.&#x5B9E;&#x73B0;&#x65E0;&#x7EBF;&#x8F6E;&#x64AD;</p><p>3.&#x5B9E;&#x73B0;&#x5982;&#x679C;&#x6ED1;&#x52A8;&#x8DDD;&#x79BB;&#x4E0D;&#x8D85;&#x8FC7;50px&#x5C31;&#x4E0D;&#x64AD;&#x4E0B;&#x4E00;&#x5F20;</p><p>4.&#x5B9E;&#x73B0;&#x5B9A;&#x65F6;&#x5668;&#x81EA;&#x52A8;&#x8F6E;&#x64AD;!<span class="img-wrap"><img data-src="/img/bVbe2hK?w=1270&amp;h=626" src="https://static.alili.tech/img/bVbe2hK?w=1270&amp;h=626" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x91CC;&#x6211;&#x628A;&#x4E0A;&#x9762;&#x56DB;&#x4E2A;&#x7EC3;&#x4E60;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x7684;&#x5DE6;&#x4FA7;&#x4EE3;&#x7801;&#x653E;&#x51FA;&#x6765;&#x4F5C;&#x4E3A;&#x63D0;&#x793A;&#xFF0C;&#x5927;&#x5BB6;&#x5C3D;&#x91CF;&#x5B66;&#x4F1A;&#x5B9E;&#x73B0;&#x3002;</p><p>&#x6CE8;&#x610F;&#x5B66;&#x4E60;&#x662F;&#x4E00;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF0C;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x7ED3;&#x679C;&#xFF0C;&#x5F97;&#x5230;&#x6700;&#x7EC8;&#x7684;&#x6E90;&#x7801;&#x4E0D;&#x91CD;&#x8981;&#xFF0C;&#x5B66;&#x4F1A;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x624D;&#x91CD;&#x8981;&#xFF0C;&#x6BD5;&#x7ADF;&#x7F51;&#x4E0A;&#x6709;&#x592A;&#x591A;&#x7684;&#x8D44;&#x6E90;&#x548C;&#x63D2;&#x4EF6;&#x4EE3;&#x7801;&#xFF0C;&#x5982;&#x679C;&#x90A3;&#x4E2A;&#x6709;&#x7528;&#xFF0C;&#x90A3;&#x4E48;&#x6BCF;&#x4E00;&#x4E2A;&#x4EBA;&#x7684;&#x5DE5;&#x8D44;&#x90FD;&#x5E94;&#x8BE5;&#x975E;&#x5E38;&#x9AD8;&#x624D;&#x5BF9;&#x3002;&#x90A3;&#x4E3A;&#x4EC0;&#x4E48;&#x5F88;&#x591A;&#x4EBA;&#x7684;&#x6280;&#x672F;&#x6C34;&#x5E73;&#x5E76;&#x4E0D;&#x9AD8;&#xFF0C;&#x5DE5;&#x8D44;&#x4E5F;&#x4E0D;&#x7406;&#x60F3;&#x5462;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x5927;&#x5BB6;&#x53EA;&#x52AA;&#x529B;&#x53BB;&#x5F97;&#x5230;&#x7ED3;&#x679C;&#xFF0C;&#x800C;&#x5FFD;&#x89C6;&#x4E86;&#x6280;&#x672F;&#x7684;&#x5B9E;&#x73B0;&#x8FC7;&#x7A0B;&#x3002;&#x7AEF;&#x76D8;&#x5B50;&#x548C;&#x5403;&#x83DC;&#x8C01;&#x90FD;&#x4F1A;&#xFF0C;&#x4F46;&#x662F;&#x996D;&#x5E97;&#x5374;&#x53EA;&#x4F1A;&#x7ED9;&#x53A8;&#x5E08;&#x9AD8;&#x5DE5;&#x8D44;&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#x9053;&#x7406;&#x3002;&#x6211;&#x4EEC;&#x8981;&#x505A;&#x7684;&#x662F;&#x53A8;&#x5E08;&#xFF0C;&#x4E0D;&#x662F;&#x7AEF;&#x76D8;&#x5B50;&#x7684;&#x670D;&#x52A1;&#x5458;&#x6216;&#x8005;&#x98DF;&#x5BA2;&#xFF08;&#x6B64;&#x5904;&#x4EC5;&#x4E3A;&#x4E86;&#x8BF4;&#x660E;&#x8FC7;&#x7A0B;&#x7684;&#x91CD;&#x8981;&#x6027;&#xFF0C;&#x65E0;&#x5176;&#x4ED6;&#x610F;&#x601D;&#xFF09;&#x3002;</p><p>&#x5C31;&#x8BF4;&#x8FD9;&#x4E48;&#x591A;&#x5427;&#xFF0C;&#x6700;&#x540E;&#x4E00;&#x53E5;&#x3002;&#x725B;&#x987F;&#x8BF4;&#x8FC7;&#xFF0C;&#x6211;&#x6709;&#x4E00;&#x4E2A;&#x82F9;&#x679C;&#x6211;&#x5403;&#x4E86;&#x4F60;&#x7785;&#x7740;&#x6211;&#x5C31;&#x6BD4;&#x4F60;&#x5E78;&#x798F;&#xFF0C;&#x9519;&#x4E86;&#x725B;&#x987F;&#x8BF4;&#x4ED6;&#x6CA1;&#x8BF4;&#x8FC7;&#x8FD9;&#x53E5;&#x8BDD;&#xFF0C;&#x4ED6;&#x8BF4;&#x7684;&#x662F;&#xFF0C;&#x6211;&#x6709;&#x4E00;&#x4E2A;&#x601D;&#x60F3;&#xFF0C;&#x4F60;&#x4E5F;&#x6709;&#x4E00;&#x4E2A;&#xFF0C;&#x54B1;&#x4FE9;&#x4E00;&#x4EA4;&#x6362;&#xFF0C;&#x5C31;&#x53C8;&#x751F;&#x4E00;&#x4E2A;&#x601D;&#x60F3;&#xFF08;&#x725B;&#x987F;&#x597D;&#x50CF;&#x5927;&#x610F;&#x5982;&#x6B64;&#xFF0C;&#x5927;&#x5BB6;&#x7406;&#x89E3;&#x5C31;OK&#xFF09;&#x3002;</p><p>&#x6240;&#x4EE5;&#x5927;&#x5BB6;&#x6709;&#x95EE;&#x9898;&#x53EF;&#x4EE5;&#x7559;&#x8A00;&#xFF0C;&#x6839;&#x636E;&#x5927;&#x5BB6;&#x7684;&#x7559;&#x8A00;&#x6211;&#x4F1A;&#x63D0;&#x4F9B;&#x66F4;&#x6709;&#x9488;&#x5BF9;&#x6027;&#x7684;&#x8BFE;&#x7A0B;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用flex进行网易云音乐界面构建和布局解析（2）

## 原文链接
[https://segmentfault.com/a/1190000015937703](https://segmentfault.com/a/1190000015937703)

