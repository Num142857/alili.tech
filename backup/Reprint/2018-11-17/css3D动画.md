---
title: 'css3D动画' 
date: 2018-11-17 1:30:12
hidden: true
slug: imp2acy0jcq
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">css3D&#x52A8;&#x753B;</h2><h3 id="articleHeader1"><strong>&#x524D;&#x8A00;</strong></h3><p>&#x6700;&#x8FD1;&#x73A9;&#x4E86;&#x73A9;&#x7528;css&#x6765;&#x6784;&#x5EFA;3D&#x6548;&#x679C;&#xFF0C;&#x5199;&#x4E86;&#x51E0;&#x4E2A;demo&#xFF0C;&#x6240;&#x4EE5;&#x535A;&#x5BA2;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#x3002; &#x5728;&#x9605;&#x8BFB;&#x8FD9;&#x7BC7;&#x535A;&#x5BA2;&#x4E4B;&#x524D;&#xFF0C;&#x8BF7;&#x5148;&#x81EA;&#x884C;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;css 3D&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;transform-style&#xFF0C;transform-origin&#xFF0C;transform, perspective&#x3002;</p><p>&#x5199;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x7ACB;&#x65B9;&#x4F53;</p><h3 id="articleHeader2">1&#x3001;&#x6211;&#x4EEC;&#x5148;&#x7528;css&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x957F;&#x65B9;&#x4F53;&#xFF0C;&#x4E00;&#x4E2A;&#x957F;&#x65B9;&#x4F53;&#x6709;6&#x4E2A;&#x8FB9;&#xFF0C;&#x6211;&#x4EEC;&#x5199;6&#x4E2A;li&#xFF0C;&#x5E76;&#x7528;&#x4E00;&#x4E2A;ul&#x5305;&#x88F9;&#x8D77;&#x6765;,&#x6839;&#x636E;&#x6211;&#x5199;3D&#x52A8;&#x753B;&#x7684;&#x7ECF;&#x9A8C;&#xFF0C;&#x6700;&#x597D;&#x6709;&#x4E00;&#x4E2A;&#x7236;&#x5143;&#x7D20;&#x6765;&#x5305;&#x88F9;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;parent&quot;&gt;
    &lt;ul&gt;
        &lt;li&gt;1&lt;/li&gt;
        &lt;li&gt;2&lt;/li&gt;
        &lt;li&gt;3&lt;/li&gt;
        &lt;li&gt;4&lt;/li&gt;
        &lt;li&gt;5&lt;/li&gt;
        &lt;li&gt;6&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre><h3 id="articleHeader3">2&#x3001;&#x5148;&#x7ED9;.parent&#x8BBE;&#x7F6E;&#x5BBD;&#x9AD8;&#xFF0C;&#x5E76;&#x4E14;&#x7ED9;&#x4ED6;&#x8BBE;&#x7F6E;&#x89C6;&#x8DDD;&#x548C;&#x57FA;&#x70B9;&#x4F4D;&#x7F6E;&#x3002;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
            width: 800px;
            height: 400px;
            border: 1px solid #000;
            margin: 0 auto;
            perspective: 2000px;
            perspective-origin: -40% -80%;
            background: #000;
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.parent</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">perspective</span>: <span class="hljs-number">2000px</span>;
            <span class="hljs-attribute">perspective-origin</span>: -<span class="hljs-number">40%</span> -<span class="hljs-number">80%</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
        }</code></pre><h3 id="articleHeader4">3&#x3001;&#x7ED9;ul&#x8BBE;&#x7F6E;&#x5BBD;&#x9AD8;&#x4EE5;&#x53CA;preserve-3d&#x5C5E;&#x6027;&#x4FDD;&#x7559;&#x5B50;&#x5143;&#x7D20;3d&#x8F6C;&#x6362;&#xFF0C;&#x5B50;&#x5143;&#x7D20;li&#x5168;&#x90E8;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
        ul{
            width: 50px;
            position: relative;
            margin: 100px auto;
            transform-style : preserve-3d;
        }
         li{
            width: 100px;
            height: 100px;
            background:  rgba(255, 255, 0, 0.3);
            position: absolute;
            text-align: center;           
            border: 3px solid greenyellow;
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>
        <span class="hljs-selector-tag">ul</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
            <span class="hljs-attribute">transform-style </span>: preserve-<span class="hljs-number">3</span>d;
        }
         <span class="hljs-selector-tag">li</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>:  <span class="hljs-built_in">rgba</span>(255, 255, 0, 0.3);
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">text-align</span>: center;           
            <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid greenyellow;
        }</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbfeoa?w=1055&amp;h=539" src="https://static.alili.tech/img/bVbfeoa?w=1055&amp;h=539" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader5">4&#x3001;&#x5148;&#x5199;&#x4E00;&#x4E2A;&#x9762;&#xFF0C;&#x7ED9;&#x4ED6;&#x7684;&#x80CC;&#x666F;&#x8BBE;&#x7F6E; background: rgba(255, 255, 0, 0.3);</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" li:nth-child(1){
            background:  rgba(255, 255, 0, 0.3);
            transform:  translateY(50px) rotateX(90deg);
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
            <span class="hljs-attribute">background</span>:  <span class="hljs-built_in">rgba</span>(255, 255, 0, 0.3);
            <span class="hljs-attribute">transform</span>:  <span class="hljs-built_in">translateY</span>(50px) <span class="hljs-built_in">rotateX</span>(90deg);
        }</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbfenJ?w=1150&amp;h=649" src="https://static.alili.tech/img/bVbfenJ?w=1150&amp;h=649" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader6">5&#x3001;&#x6211;&#x4EEC;&#x5199;&#x597D;&#x4E86;&#x7B2C;&#x4E00;&#x4E2A;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5728;&#x5C06;&#x5176;&#x4ED6;6&#x4E2A;&#x9762;&#x8C03;&#x6574;&#x597D;&#xFF0C;&#x53D8;&#x6210;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#x3002;&#x5173;&#x4E8E;rotate&#x7684;&#x65CB;&#x8F6C;&#x65B9;&#x5411;&#x8FD9;&#x91CC;&#x4E0D;&#x89E3;&#x91CA;&#xFF0C;&#x4E0D;&#x61C2;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x67E5;&#x770B;&#x5176;&#x4ED6;&#x6587;&#x6863;&#x3002;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        /*&#x4E0A;&#x9762;*/
         li:nth-child(1){
            transform: translateY(-50px) rotateX(90deg);
        } 
        /*&#x4E0B;&#x9762;*/
        li:nth-child(2){
        
            transform:  translateY(50px) rotateX(90deg);
        }
        /*&#x5DE6;&#x9762;*/
        li:nth-child(3){
            transform: translateX(-50px) rotateY(90deg);
        }
        /*&#x53F3;&#x9762;*/
        li:nth-child(4){
            transform: translateX(50px) rotateY(90deg);
        }
        /*&#x524D;&#x9762;*/
        li:nth-child(5){
            transform: translateZ(50px);
        }
        /*&#x540E;&#x9762;*/
        li:nth-child(6){
            transform: translateZ(-50px);
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>        <span class="hljs-comment">/*&#x4E0A;&#x9762;*/</span>
         <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50px) <span class="hljs-built_in">rotateX</span>(90deg);
        } 
        <span class="hljs-comment">/*&#x4E0B;&#x9762;*/</span>
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
        
            <span class="hljs-attribute">transform</span>:  <span class="hljs-built_in">translateY</span>(50px) <span class="hljs-built_in">rotateX</span>(90deg);
        }
        <span class="hljs-comment">/*&#x5DE6;&#x9762;*/</span>
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-50px) <span class="hljs-built_in">rotateY</span>(90deg);
        }
        <span class="hljs-comment">/*&#x53F3;&#x9762;*/</span>
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(4)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(50px) <span class="hljs-built_in">rotateY</span>(90deg);
        }
        <span class="hljs-comment">/*&#x524D;&#x9762;*/</span>
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(5)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(50px);
        }
        <span class="hljs-comment">/*&#x540E;&#x9762;*/</span>
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(6)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(-50px);
        }</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbfeqn?w=902&amp;h=469" src="https://static.alili.tech/img/bVbfeqn?w=902&amp;h=469" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader7">&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E9B;&#x6211;&#x5199;&#x7684;css3D+&#x52A8;&#x753B;&#x7684;&#x6548;&#x679C;</h3><h3 id="articleHeader8">demo01</h3><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;&#x4E66;&#x9875;2&lt;/title&gt;
    &lt;style&gt;
        .container{
            width: 1000px;
            height: 650px;
            background: #000;
            perspective: 2000px;
            border: 1px solid transparent;
            overflow: hidden;
            margin: 0 auto;
            perspective-origin: 10% 20%;
           
        }
    
        .cube{
            width: 200px;
            height: 300px;
            transform-style: preserve-3d;
            margin:100px auto;
            
            position: relative;
            transform: rotateX(30deg);
            border-radius: 50%;
            padding: 60px;
        }
        .mian{
            width: 200px;
            height: 300px;
            background-image: url(1.jpg);
            background-position:400px 0;
            position: absolute;
           
            border: 1px solid #ccc;
            transition: 2s;
        }
        /* .mian1:hover{
            transform-origin: right;
            transform: rotateY(-60deg);
        } */
        .mian1{
            transform-origin: right;
            transform: translateX(-200px) rotateY(45deg);
            background-position: 0 0;
        }
        .mian3{
            transform-origin: left;
            transform: translateX(200px) rotateY(45deg);
            background-position: 200px 0;
        }
        .mian3:hover{
            transform: translateX(200px) rotateY(0deg);
        } 
        .mian1:hover{
            transform: translateX(-200px) rotateY(0deg);
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class=&quot;container&quot;&gt;
        &lt;div class=&quot;cube&quot;&gt;
            &lt;div class=&quot;mian mian1&quot;&gt;&lt;/div&gt;
            &lt;div class=&quot;mian mian2&quot;&gt;&lt;/div&gt;
            &lt;div class=&quot;mian mian3&quot;&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x4E66;&#x9875;2<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.container</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">1000px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">650px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#000</span>;
            <span class="hljs-attribute">perspective</span>: <span class="hljs-number">2000px</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid transparent;
            <span class="hljs-attribute">overflow</span>: hidden;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">perspective-origin</span>: <span class="hljs-number">10%</span> <span class="hljs-number">20%</span>;
           
        }
    
        <span class="hljs-selector-class">.cube</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
            <span class="hljs-attribute">margin</span>:<span class="hljs-number">100px</span> auto;
            
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(30deg);
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">60px</span>;
        }
        <span class="hljs-selector-class">.mian</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">url</span>(1.jpg);
            <span class="hljs-attribute">background-position</span>:<span class="hljs-number">400px</span> <span class="hljs-number">0</span>;
            <span class="hljs-attribute">position</span>: absolute;
           
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
            <span class="hljs-attribute">transition</span>: <span class="hljs-number">2s</span>;
        }
        <span class="hljs-comment">/* .mian1:hover{
            transform-origin: right;
            transform: rotateY(-60deg);
        } */</span>
        <span class="hljs-selector-class">.mian1</span>{
            <span class="hljs-attribute">transform-origin</span>: right;
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-200px) <span class="hljs-built_in">rotateY</span>(45deg);
            <span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.mian3</span>{
            <span class="hljs-attribute">transform-origin</span>: left;
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(200px) <span class="hljs-built_in">rotateY</span>(45deg);
            <span class="hljs-attribute">background-position</span>: <span class="hljs-number">200px</span> <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.mian3</span><span class="hljs-selector-pseudo">:hover</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(200px) <span class="hljs-built_in">rotateY</span>(0deg);
        } 
        <span class="hljs-selector-class">.mian1</span><span class="hljs-selector-pseudo">:hover</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-200px) <span class="hljs-built_in">rotateY</span>(0deg);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cube&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mian mian1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mian mian2&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;mian mian3&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbfewl?w=689&amp;h=477" src="https://static.alili.tech/img/bVbfewl?w=689&amp;h=477" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h3 id="articleHeader9">demo02</h3><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;&#x7ACB;&#x65B9;&#x4F53;&lt;/title&gt;

    &lt;style&gt;
        *{
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .parent{
            width: 1000px;
            margin:  0 auto;
            height: 600px;
            background: black;
            perspective: 5000px;
            perspective-origin: -40% -120%;
            border: 1px solid #000;
        }
        ul{
            width: 100px;
            height: 300px;
            position: relative;
            margin:100px auto;
            transform-style: preserve-3d;
            animation: zuan 3s linear infinite;
            border: 1px solid greenyellow;
        }

        li{
            width: 100px;
            height: 300px;
            background:  rgba(0, 0, 0, 0.5);
            position: absolute;
            text-align: center;
            line-height: 100px;
            
            border: 3px solid greenyellow;
        }
        li:nth-child(1){
            transform: rotateY(30deg) translateZ(-200px);
      
        }
        li:nth-child(2){
            transform: rotateY(60deg) translateZ(-200px);
            background:  rgba(255, 0, 0, 0.5);
        }
        li:nth-child(3){
            transform: rotateY(90deg) translateZ(-200px);
            
        }
        li:nth-child(4){
            transform: rotateY(120deg) translateZ(-200px);
            background:  rgba(0, 0, 255, 0.5);
        }
        li:nth-child(5){
            transform: rotateY(150deg) translateZ(-200px);
            
        }
        li:nth-child(6){
            transform: rotateY(180deg) translateZ(-200px);
            background:  rgba(255, 0, 255, 0.5);
        }
        li:nth-child(7){
            transform: rotateY(210deg) translateZ(-200px);
      
        }
        li:nth-child(8){
            transform: rotateY(240deg) translateZ(-200px);
            background:  rgba(0, 255, 0, 0.5);
        }
        li:nth-child(9){
            transform: rotateY(270deg) translateZ(-200px);
      
        }
        li:nth-child(10){
            transform: rotateY(300deg) translateZ(-200px);
            background:  rgba(0, 255, 255, 0.5);
        }
        li:nth-child(11){
            transform: rotateY(330deg) translateZ(-200px);
      
        }
        li:nth-child(12){
            transform: rotateY(360deg) translateZ(-200px);
            background:  rgba(255, 255, 255, 0.5);
        }

        @keyframes zuan{
            0%{
                transform: rotateY(0deg);
            }
            100%{
                transform: rotateY(360deg);
            }
        }
    
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;div class=&quot;parent&quot;&gt;
        &lt;ul&gt;    
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
            &lt;li&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
    
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x7ACB;&#x65B9;&#x4F53;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        *{
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">list-style</span>: none;
        }
        <span class="hljs-selector-class">.parent</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">1000px</span>;
            <span class="hljs-attribute">margin</span>:  <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">600px</span>;
            <span class="hljs-attribute">background</span>: black;
            <span class="hljs-attribute">perspective</span>: <span class="hljs-number">5000px</span>;
            <span class="hljs-attribute">perspective-origin</span>: -<span class="hljs-number">40%</span> -<span class="hljs-number">120%</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
        }
        <span class="hljs-selector-tag">ul</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">margin</span>:<span class="hljs-number">100px</span> auto;
            <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
            <span class="hljs-attribute">animation</span>: zuan <span class="hljs-number">3s</span> linear infinite;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid greenyellow;
        }

        <span class="hljs-selector-tag">li</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">background</span>:  <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.5);
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">text-align</span>: center;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
            
            <span class="hljs-attribute">border</span>: <span class="hljs-number">3px</span> solid greenyellow;
        }
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(1)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(30deg) <span class="hljs-built_in">translateZ</span>(-200px);
      
        }
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(2)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(60deg) <span class="hljs-built_in">translateZ</span>(-200px);
            <span class="hljs-attribute">background</span>:  <span class="hljs-built_in">rgba</span>(255, 0, 0, 0.5);
        }
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(3)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(90deg) <span class="hljs-built_in">translateZ</span>(-200px);
            
        }
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(4)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(120deg) <span class="hljs-built_in">translateZ</span>(-200px);
            <span class="hljs-attribute">background</span>:  <span class="hljs-built_in">rgba</span>(0, 0, 255, 0.5);
        }
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(5)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(150deg) <span class="hljs-built_in">translateZ</span>(-200px);
            
        }
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(6)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(180deg) <span class="hljs-built_in">translateZ</span>(-200px);
            <span class="hljs-attribute">background</span>:  <span class="hljs-built_in">rgba</span>(255, 0, 255, 0.5);
        }
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(7)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(210deg) <span class="hljs-built_in">translateZ</span>(-200px);
      
        }
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(8)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(240deg) <span class="hljs-built_in">translateZ</span>(-200px);
            <span class="hljs-attribute">background</span>:  <span class="hljs-built_in">rgba</span>(0, 255, 0, 0.5);
        }
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(9)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(270deg) <span class="hljs-built_in">translateZ</span>(-200px);
      
        }
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(10)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(300deg) <span class="hljs-built_in">translateZ</span>(-200px);
            <span class="hljs-attribute">background</span>:  <span class="hljs-built_in">rgba</span>(0, 255, 255, 0.5);
        }
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(11)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(330deg) <span class="hljs-built_in">translateZ</span>(-200px);
      
        }
        <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:nth-child(12)</span>{
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(360deg) <span class="hljs-built_in">translateZ</span>(-200px);
            <span class="hljs-attribute">background</span>:  <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.5);
        }

        @<span class="hljs-keyword">keyframes</span> zuan{
            0%{
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(0deg);
            }
            100%{
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(360deg);
            }
        }
    
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>    
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbfexj?w=888&amp;h=547" src="https://static.alili.tech/img/bVbfexj?w=888&amp;h=547" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader10">&#x6301;&#x7EED;&#x66F4;&#x65B0;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6307;&#x6559;&#xFF01;</h2>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css3D动画

## 原文链接
[https://segmentfault.com/a/1190000015984416](https://segmentfault.com/a/1190000015984416)

