---
title: '关于scroll,client,innear,avail,offset等的理解'
hidden: true
categories: [reprint]
slug: 8bd2d88e
date: 2018-11-06 02:30:12
---

{{< raw >}}
<blockquote>&#x5728;&#x5199;&#x5B9E;&#x4F8B;&#x7406;&#x89E3;scrollWidth&#xFF0C;clientWidth&#xFF0C;innearWidth&#xFF0C;availWidth&#x53CA;offsetWidth&#x7B49;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x610F;&#x5916;&#x7684;&#x53C8;&#x53D1;&#x73B0;&#x4E86;margin&#x503C;&#x5408;&#x5E76;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x540C;&#x65F6;&#x8BB0;&#x5F55;&#x4E0B;</blockquote><h1 id="articleHeader0">1.&#x504F;&#x79FB;&#x91CF;&#x7684;&#x533A;&#x522B;</h1><ul><li>html&#x6587;&#x4EF6;&#xFF08;&#x81EA;&#x5DF1;&#x5199;&#x7684;&#x793A;&#x4F8B;&#xFF09;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;root&quot;&gt;
    &lt;div class=&quot;box&quot;&gt;
        &lt;div class=&quot;content&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">&quot;root&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><ul><li>css&#x6837;&#x5F0F;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
    body, html{
        padding: 0;
        margin: 0;
    }
    #root{
        /*position: relative;*/
        margin: 0 auto;
        width: 1200px;
        /*border: 1px solid black;*/
    }
    .box{
        overflow: scroll;
        margin: 5px;
        padding: 20px;
        width: 500px;
        height: 600px;
        border: 2px solid blueviolet;
        /*box-sizing: border-box;*/
        background: linear-gradient(to right, rgb(85, 181, 255), rgb(207, 224, 232));
    }
    .content{
        width: 530px;
        height: 600px;
    }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">html</span>{
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-id">#root</span>{
        <span class="hljs-comment">/*position: relative;*/</span>
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">1200px</span>;
        <span class="hljs-comment">/*border: 1px solid black;*/</span>
    }
    <span class="hljs-selector-class">.box</span>{
        <span class="hljs-attribute">overflow</span>: scroll;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">600px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid blueviolet;
        <span class="hljs-comment">/*box-sizing: border-box;*/</span>
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(to right, rgb(85, 181, 255), <span class="hljs-built_in">rgb</span>(207, 224, 232));
    }
    <span class="hljs-selector-class">.content</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">530px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">600px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><ul><li>&#x8F83;&#x591A;&#x89C1;&#x7684;&#x5C5E;&#x6027;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="clientWidth: &#x6307;&#x53EF;&#x89C1;&#x533A;&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x7F51;&#x9875;&#xFF0C;&#x6216;&#x8005;&#x5143;&#x7D20;&#xFF09;
clientHeight: &#x6307;&#x53EF;&#x89C1;&#x533A;&#x7684;&#x9AD8;&#x5EA6;&#xFF08;&#x7F51;&#x9875;&#xFF0C;&#x6216;&#x8005;&#x5143;&#x7D20;&#xFF09;
offsetWidth: &#x6307;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x7F51;&#x9875;&#xFF0C;&#x6216;&#x8005;&#x5143;&#x7D20;&#xFF09;
offsetHeight: &#x6307;&#x5143;&#x7D20;&#x7684;&#x9AD8;&#x5EA6;&#xFF08;&#x7F51;&#x9875;&#xFF0C;&#x6216;&#x8005;&#x5143;&#x7D20;&#xFF09;
scrollTop: &#x6EDA;&#x52A8;&#x6761;&#x7684;&#x6EDA;&#x52A8;&#x8DDD;&#x79BB;
scrollLeft: &#x6EDA;&#x52A8;&#x6761;&#x7684;&#x6EDA;&#x52A8;&#x8DDD;&#x79BB;
availWidth: &#x5C4F;&#x5E55;&#x53EF;&#x7528;&#x533A;&#x5BBD;&#x5EA6;
availHeight: &#x5C4F;&#x5E55;&#x53EF;&#x7528;&#x533A;&#x9AD8;&#x5EA6;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs avrasm"><code><span class="hljs-symbol">clientWidth:</span> &#x6307;&#x53EF;&#x89C1;&#x533A;&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x7F51;&#x9875;&#xFF0C;&#x6216;&#x8005;&#x5143;&#x7D20;&#xFF09;
<span class="hljs-symbol">clientHeight:</span> &#x6307;&#x53EF;&#x89C1;&#x533A;&#x7684;&#x9AD8;&#x5EA6;&#xFF08;&#x7F51;&#x9875;&#xFF0C;&#x6216;&#x8005;&#x5143;&#x7D20;&#xFF09;
<span class="hljs-symbol">offsetWidth:</span> &#x6307;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x7F51;&#x9875;&#xFF0C;&#x6216;&#x8005;&#x5143;&#x7D20;&#xFF09;
<span class="hljs-symbol">offsetHeight:</span> &#x6307;&#x5143;&#x7D20;&#x7684;&#x9AD8;&#x5EA6;&#xFF08;&#x7F51;&#x9875;&#xFF0C;&#x6216;&#x8005;&#x5143;&#x7D20;&#xFF09;
<span class="hljs-symbol">scrollTop:</span> &#x6EDA;&#x52A8;&#x6761;&#x7684;&#x6EDA;&#x52A8;&#x8DDD;&#x79BB;
<span class="hljs-symbol">scrollLeft:</span> &#x6EDA;&#x52A8;&#x6761;&#x7684;&#x6EDA;&#x52A8;&#x8DDD;&#x79BB;
<span class="hljs-symbol">availWidth:</span> &#x5C4F;&#x5E55;&#x53EF;&#x7528;&#x533A;&#x5BBD;&#x5EA6;
<span class="hljs-symbol">availHeight:</span> &#x5C4F;&#x5E55;&#x53EF;&#x7528;&#x533A;&#x9AD8;&#x5EA6;</code></pre><ul><li>script</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    (function() {
        let elementName = document.getElementsByClassName(&apos;box&apos;)[0];
        let elementContent = document.getElementsByClassName(&apos;content&apos;)[0];

        /* offsetWidth&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x503C;,&#x53EA;&#x8BFB;&#x5C5E;&#x6027;(&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;css&#x6587;&#x4EF6;&#x91CC;&#x7684;&#x503C;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x5185;&#x8054;&#x6837;&#x5F0F;&#x91CC;&#x7684;&#x503C;)
         * &#x5F53;box-sizing&#x4E3A;content-box&#x65F6;&#xFF0C;offsetWidth=(padding-left)+(padding-right)+(border-left)+(border-right)+width
         * &#x5F53;box-sizing&#x4E3A;border-box&#x65F6;&#xFF0C;offsetWidth=width
         * &#x5F53;&#x5143;&#x7D20;&#x672C;&#x8EAB;&#x672A;&#x8BBE;&#x7F6E;&#x5BBD;&#x65F6;&#xFF0C;&#x8BFB;&#x53D6;&#x7684;&#x662F;&#x7236;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x51CF;&#x53BB;&#x5143;&#x7D20;&#x672C;&#x8EAB;&#x8BBE;&#x7F6E;&#x7684;margin&#x503C;
         * */
        let elementWidth = elementName.offsetWidth;
        console.log(elementWidth);

        /* clientWidth&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x503C;&#xFF0C;&#x53EA;&#x8BFB;&#x5C5E;&#x6027;(&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;css&#x6587;&#x4EF6;&#x91CC;&#x7684;&#x503C;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x5185;&#x8054;&#x6837;&#x5F0F;&#x91CC;&#x7684;&#x503C;)
         * &#x5728;&#x5143;&#x7D20;&#x672A;&#x6EA2;&#x51FA;&#x65F6;&#xFF1A;
         * &#x5F53;box-sizing&#x4E3A;content-box&#x65F6;&#xFF0C;clientWidth=(padding-left)+(padding-right)+width
         * &#x5F53;box-sizing&#x4E3A;border-box&#x65F6;&#xFF0C;clientWidth=width-(border-left)-(border-right)
         * &#x5F53;&#x5143;&#x7D20;&#x672C;&#x8EAB;&#x672A;&#x8BBE;&#x7F6E;&#x5BBD;&#x65F6;&#xFF0C;&#x8BFB;&#x53D6;&#x7684;&#x662F;&#x7236;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x51CF;&#x53BB;&#x5143;&#x7D20;&#x672C;&#x8EAB;&#x8BBE;&#x7F6E;&#x7684;border&#x503C;
         * &#x5143;&#x7D20;&#x6EA2;&#x51FA;&#x65F6;(&#x5B50;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;&#x5927;&#x4E8E;&#x7236;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;)&#xFF1A;
         * clientWidth&#x4E3A;&#x9664;&#x4E86;&#x8FB9;&#x6846;&#x53CA;X&#x3001;Y&#x5411;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x5BBD;&#x5EA6;(&#x53EF;&#x89C6;&#x533A;)
         * */
        let elemClientWidth = elementName.clientWidth;
        console.log(elemClientWidth);

        /* style.width&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x8FD4;&#x56DE;&#x5B57;&#x7B26;&#x4E32;(&#x5305;&#x542B;&#x5355;&#x4F4D;)&#xFF0C;&#x53EF;&#x8BFB;&#x5199;
         * &#x539F;&#x6837;&#x7684;&#x8F93;&#x51FA;&#x5185;&#x8054;style&#x91CC;&#x8BBE;&#x7F6E;&#x7684;width&#x503C;&#xFF0C;&#x5FC5;&#x987B;&#x663E;&#x793A;&#x7684;&#x8BBE;&#x7F6E;&#xFF0C;&#x5426;&#x5219;&#x4E3A;&#x7A7A;
         * */
        let styleWidth = elementName.style.width;
        console.log(styleWidth);

        /* scrollWidth&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x503C;(&#x5305;&#x542B;padding&#x503C;&#xFF0C;&#x4E0D;&#x5305;&#x542B;&#x8FB9;&#x6846;&#x5BBD;&#x5EA6;&#x503C;)
         * &#x5F53;&#x5143;&#x7D20;&#x6CA1;&#x6709;&#x6EA2;&#x51FA;&#x65F6;(&#x5B50;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;&#x5C0F;&#x4E8E;&#x7236;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;)&#xFF1A;&#x6B64;&#x65F6;&#x4E0E;clientWidth&#x503C;&#x4E00;&#x6837;
         * &#x5F53;&#x5143;&#x7D20;&#x6EA2;&#x51FA;&#x65F6;&#xFF1A;(&#x6EA2;&#x51FA;&#x503C;=&#x5B50;&#x5143;&#x7D20;offsetWidth-[&#x7236;&#x5143;&#x7D20;offsetWidth-(&#x7236;padding-left)-(&#x7236;border-left)])
         * &#x5F53;&#x5B50;&#x5143;&#x7D20;box-sizing&#x4E3A;content-box&#x65F6;&#xFF0C;scrollWidth=&#x5B50;&#x5143;&#x7D20;offsetWidth+(&#x7236;padding-right)
         * &#x5F53;&#x5B50;&#x5143;&#x7D20;box-sizing&#x4E3A;border-box&#x65F6;&#xFF0C;
         * scrollWidth=&#x5B50;&#x5143;&#x7D20;offsetWidth+(&#x7236;padding-right)-(&#x5B50;border-left)-(&#x5B50;border-right)-(&#x5B50;padding-right)-(&#x5B50;padding-left)
         * */
        let elemScrollWidth = elementName.scrollWidth;
        console.log(elemScrollWidth);

        /* offsetTop&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x4E0A;&#x5916;&#x7F18;&#x8DDD;&#x79BB;&#x6700;&#x8FD1;&#x91C7;&#x7528;&#x5B9A;&#x4F4D;&#x7684;&#x7236;&#x5143;&#x7D20;&#x5185;&#x58C1;&#x7684;&#x8DDD;&#x79BB;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x503C;&#xFF0C;&#x53EA;&#x8BFB;
         * &#x5982;&#x679C;&#x7236;&#x5143;&#x7D20;&#x4E2D;&#x6CA1;&#x6709;&#x91C7;&#x7528;&#x5B9A;&#x4F4D;&#x7684;&#xFF0C;&#x5219;&#x662F;&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x4E0A;&#x5916;&#x8FB9;&#x7F18;&#x8DDD;&#x79BB;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x5185;&#x58C1;&#x7684;&#x8DDD;&#x79BB;
         * &#x5B9A;&#x4F4D;&#x53EA;&#x80FD;&#x4E3A;position:relative&#xFF0C;&#x5176;&#x4ED6;&#x5B9A;&#x4F4D;&#x503C;&#x83B7;&#x53D6;&#x7684;&#x662F;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x5185;&#x58C1;&#x7684;&#x8DDD;&#x79BB;
         * */
        let elemOffsetTop = elementName.offsetTop;
        console.log(elemOffsetTop);

        /* offsetLeft&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x5DE6;&#x5916;&#x7F18;&#x8DDD;&#x79BB;&#x6700;&#x8FD1;&#x91C7;&#x7528;&#x5B9A;&#x4F4D;&#x7684;&#x7236;&#x5143;&#x7D20;&#x5185;&#x58C1;&#x7684;&#x8DDD;&#x79BB;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x503C;&#xFF0C;&#x53EA;&#x8BFB;
         * &#x5982;&#x679C;&#x7236;&#x5143;&#x7D20;&#x4E2D;&#x6CA1;&#x6709;&#x91C7;&#x7528;&#x5B9A;&#x4F4D;&#x7684;&#xFF0C;&#x5219;&#x662F;&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x5DE6;&#x5916;&#x8FB9;&#x7F18;&#x8DDD;&#x79BB;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x5185;&#x58C1;&#x7684;&#x8DDD;&#x79BB;
         * &#x5B9A;&#x4F4D;&#x53EA;&#x80FD;&#x4E3A;position:relative&#xFF0C;&#x5176;&#x4ED6;&#x5B9A;&#x4F4D;&#x503C;&#x83B7;&#x53D6;&#x7684;&#x662F;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x5185;&#x58C1;&#x7684;&#x8DDD;&#x79BB;
         * */
        let elemOffsetLeft = elementName.offsetLeft;
        console.log(elemOffsetLeft);

        /* scrollHeight&#x4E3A;&#x5143;&#x7D20;&#x5185;&#x5BB9;&#x7684;&#x5B9E;&#x9645;&#x9AD8;&#x5EA6;
         * &#x5305;&#x62EC;&#x5143;&#x7D20;&#x9AD8;&#x5EA6;&#x3001;&#x5185;&#x8FB9;&#x8DDD;&#x548C;&#x6EA2;&#x51FA;&#x5C3A;&#x5BF8;&#xFF0C;&#x4E0D;&#x5305;&#x62EC;&#x8FB9;&#x6846;&#x548C;&#x5916;&#x8FB9;&#x8DDD;
         * &#x65E0;&#x6EA2;&#x51FA;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x4E0E;clientHeight&#x76F8;&#x540C;
         * */
        let elemScrollHeight = elementName.scrollHeight;
        console.log(elemScrollHeight);

        /* scrollTop&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x6216;&#x8005;&#x8BBE;&#x7F6E;&#x5BF9;&#x8C61;&#x7684;&#x6700;&#x9876;&#x90E8;&#x5230;&#x5BF9;&#x8C61;&#x6240;&#x5728;&#x5F53;&#x524D;&#x7A97;&#x53E3;&#x663E;&#x793A;&#x7684;&#x8303;&#x56F4;&#x5185;&#x7684;&#x9876;&#x8FB9;&#x7684;&#x8DDD;&#x79BB;
         * &#x4E5F;&#x5C31;&#x662F;&#x5143;&#x7D20;&#x6EDA;&#x52A8;&#x6761;&#x88AB;&#x5411;&#x4E0B;&#x62C9;&#x52A8;&#x7684;&#x8DDD;&#x79BB;
         * &#x8FD4;&#x56DE;&#x6570;&#x503C;&#xFF0C;&#x53EF;&#x8BFB;&#x5199;
         * */
        let documentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        console.log(documentScrollTop);

        /* scrollLeft&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x6216;&#x8005;&#x8BBE;&#x7F6E;&#x5BF9;&#x8C61;&#x7684;&#x6700;&#x5DE6;&#x8FB9;&#x5230;&#x5BF9;&#x8C61;&#x5728;&#x5F53;&#x524D;&#x7A97;&#x53E3;&#x663E;&#x793A;&#x7684;&#x8303;&#x56F4;&#x5185;&#x7684;&#x5DE6;&#x8FB9;&#x7684;&#x8DDD;&#x79BB;
         * &#x4E5F;&#x5C31;&#x662F;&#x5143;&#x7D20;&#x88AB;&#x6EDA;&#x52A8;&#x6761;&#x5411;&#x5DE6;&#x62C9;&#x52A8;&#x7684;&#x8DDD;&#x79BB;
         * &#x8FD4;&#x56DE;&#x6570;&#x503C;&#xFF0C;&#x53EF;&#x8BFB;&#x5199;
         * */
        let documentScrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        console.log(documentScrollLeft);

        /* innerWidth&#x7A97;&#x53E3;&#x7684;&#x6587;&#x6863;&#x663E;&#x793A;&#x533A;&#x7684;&#x5BBD;&#x5EA6;(&#x4E0D;&#x5305;&#x542B;&#x5DE5;&#x5177;&#x6761;&#x4E0E;&#x6EDA;&#x52A8;&#x6761;)&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6570;&#x503C; */
        let windowInnerWidth = window.innerWidth;
        console.log(windowInnerWidth);

        /* availWidth&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x5C4F;&#x5E55;&#x7684;&#x53EF;&#x7528;&#x5BBD;&#x5EA6;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x503C; */
        let screenAvailWidth = screen.availWidth;
        console.log(screenAvailWidth);

        /* clientWidth&#x4E3A;&#x53EF;&#x89C6;&#x533A;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x4E0D;&#x5305;&#x542B;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x5BBD;&#x5EA6; */
        let documentClientWidth = document.documentElement.clientWidth || document.body.clientWidth;
        console.log(documentClientWidth);

        elementName.onmousemove = function(event) {
            /* eventX&#x4E3A;&#x9F20;&#x6807;&#x76F8;&#x5BF9;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x6709;&#x6548;&#x533A;&#x57DF;(&#x9664;&#x53BB;&#x5DE5;&#x5177;&#x680F;&#x7B49;&#x975E;html&#x6587;&#x6863;&#x7684;&#x533A;&#x57DF;)&#x5DE6;&#x4E0A;&#x89D2;x&#x8F74;&#x7684;&#x5750;&#x6807;&#xFF0C;&#x4E0D;&#x968F;&#x6EDA;&#x52A8;&#x6761;&#x6EDA;&#x52A8;&#x800C;&#x6539;&#x53D8; */
            let eventX = event.clientX;
            console.log(eventX);

            /* pageX&#x4E3A;&#x9F20;&#x6807;&#x76F8;&#x5BF9;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x6709;&#x6548;&#x533A;&#x57DF;(&#x9664;&#x53BB;&#x5DE5;&#x5177;&#x680F;&#x7B49;&#x975E;html&#x6587;&#x6863;&#x7684;&#x533A;&#x57DF;)&#x5DE6;&#x4E0A;&#x89D2;x&#x8F74;&#x7684;&#x5750;&#x6807;&#xFF0C;&#x968F;&#x6EDA;&#x52A8;&#x6761;&#x6EDA;&#x52A8;&#x800C;&#x6539;&#x53D8; */
            let pageX = event.pageX;
            console.log(pageX);

            /* screenX&#x4E3A;&#x9F20;&#x6807;&#x76F8;&#x5BF9;&#x4E8E;&#x663E;&#x793A;&#x5668;&#x5C4F;&#x5E55;&#x5DE6;&#x4E0A;&#x89D2;x&#x8F74;&#x7684;&#x5750;&#x6807; */
            let screenX = event.screenX;
            console.log(screenX);

            /* offsetX&#x4E3A;&#x9F20;&#x6807;&#x76F8;&#x5BF9;&#x4E8E;&#x4E8B;&#x4EF6;&#x6E90;&#x5DE6;&#x4E0A;&#x89D2;X&#x8F74;&#x7684;&#x5750;&#x6807; */
            let offsetX = event.offsetX;
            console.log(offsetX);
        }
    })()
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">let</span> elementName = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">&apos;box&apos;</span>)[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">let</span> elementContent = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">&apos;content&apos;</span>)[<span class="hljs-number">0</span>];

        <span class="hljs-comment">/* offsetWidth&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x503C;,&#x53EA;&#x8BFB;&#x5C5E;&#x6027;(&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;css&#x6587;&#x4EF6;&#x91CC;&#x7684;&#x503C;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x5185;&#x8054;&#x6837;&#x5F0F;&#x91CC;&#x7684;&#x503C;)
         * &#x5F53;box-sizing&#x4E3A;content-box&#x65F6;&#xFF0C;offsetWidth=(padding-left)+(padding-right)+(border-left)+(border-right)+width
         * &#x5F53;box-sizing&#x4E3A;border-box&#x65F6;&#xFF0C;offsetWidth=width
         * &#x5F53;&#x5143;&#x7D20;&#x672C;&#x8EAB;&#x672A;&#x8BBE;&#x7F6E;&#x5BBD;&#x65F6;&#xFF0C;&#x8BFB;&#x53D6;&#x7684;&#x662F;&#x7236;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x51CF;&#x53BB;&#x5143;&#x7D20;&#x672C;&#x8EAB;&#x8BBE;&#x7F6E;&#x7684;margin&#x503C;
         * */</span>
        <span class="hljs-keyword">let</span> elementWidth = elementName.offsetWidth;
        <span class="hljs-built_in">console</span>.log(elementWidth);

        <span class="hljs-comment">/* clientWidth&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x503C;&#xFF0C;&#x53EA;&#x8BFB;&#x5C5E;&#x6027;(&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;css&#x6587;&#x4EF6;&#x91CC;&#x7684;&#x503C;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x5185;&#x8054;&#x6837;&#x5F0F;&#x91CC;&#x7684;&#x503C;)
         * &#x5728;&#x5143;&#x7D20;&#x672A;&#x6EA2;&#x51FA;&#x65F6;&#xFF1A;
         * &#x5F53;box-sizing&#x4E3A;content-box&#x65F6;&#xFF0C;clientWidth=(padding-left)+(padding-right)+width
         * &#x5F53;box-sizing&#x4E3A;border-box&#x65F6;&#xFF0C;clientWidth=width-(border-left)-(border-right)
         * &#x5F53;&#x5143;&#x7D20;&#x672C;&#x8EAB;&#x672A;&#x8BBE;&#x7F6E;&#x5BBD;&#x65F6;&#xFF0C;&#x8BFB;&#x53D6;&#x7684;&#x662F;&#x7236;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x51CF;&#x53BB;&#x5143;&#x7D20;&#x672C;&#x8EAB;&#x8BBE;&#x7F6E;&#x7684;border&#x503C;
         * &#x5143;&#x7D20;&#x6EA2;&#x51FA;&#x65F6;(&#x5B50;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;&#x5927;&#x4E8E;&#x7236;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;)&#xFF1A;
         * clientWidth&#x4E3A;&#x9664;&#x4E86;&#x8FB9;&#x6846;&#x53CA;X&#x3001;Y&#x5411;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x5BBD;&#x5EA6;(&#x53EF;&#x89C6;&#x533A;)
         * */</span>
        <span class="hljs-keyword">let</span> elemClientWidth = elementName.clientWidth;
        <span class="hljs-built_in">console</span>.log(elemClientWidth);

        <span class="hljs-comment">/* style.width&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x8FD4;&#x56DE;&#x5B57;&#x7B26;&#x4E32;(&#x5305;&#x542B;&#x5355;&#x4F4D;)&#xFF0C;&#x53EF;&#x8BFB;&#x5199;
         * &#x539F;&#x6837;&#x7684;&#x8F93;&#x51FA;&#x5185;&#x8054;style&#x91CC;&#x8BBE;&#x7F6E;&#x7684;width&#x503C;&#xFF0C;&#x5FC5;&#x987B;&#x663E;&#x793A;&#x7684;&#x8BBE;&#x7F6E;&#xFF0C;&#x5426;&#x5219;&#x4E3A;&#x7A7A;
         * */</span>
        <span class="hljs-keyword">let</span> styleWidth = elementName.style.width;
        <span class="hljs-built_in">console</span>.log(styleWidth);

        <span class="hljs-comment">/* scrollWidth&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x503C;(&#x5305;&#x542B;padding&#x503C;&#xFF0C;&#x4E0D;&#x5305;&#x542B;&#x8FB9;&#x6846;&#x5BBD;&#x5EA6;&#x503C;)
         * &#x5F53;&#x5143;&#x7D20;&#x6CA1;&#x6709;&#x6EA2;&#x51FA;&#x65F6;(&#x5B50;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;&#x5C0F;&#x4E8E;&#x7236;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;)&#xFF1A;&#x6B64;&#x65F6;&#x4E0E;clientWidth&#x503C;&#x4E00;&#x6837;
         * &#x5F53;&#x5143;&#x7D20;&#x6EA2;&#x51FA;&#x65F6;&#xFF1A;(&#x6EA2;&#x51FA;&#x503C;=&#x5B50;&#x5143;&#x7D20;offsetWidth-[&#x7236;&#x5143;&#x7D20;offsetWidth-(&#x7236;padding-left)-(&#x7236;border-left)])
         * &#x5F53;&#x5B50;&#x5143;&#x7D20;box-sizing&#x4E3A;content-box&#x65F6;&#xFF0C;scrollWidth=&#x5B50;&#x5143;&#x7D20;offsetWidth+(&#x7236;padding-right)
         * &#x5F53;&#x5B50;&#x5143;&#x7D20;box-sizing&#x4E3A;border-box&#x65F6;&#xFF0C;
         * scrollWidth=&#x5B50;&#x5143;&#x7D20;offsetWidth+(&#x7236;padding-right)-(&#x5B50;border-left)-(&#x5B50;border-right)-(&#x5B50;padding-right)-(&#x5B50;padding-left)
         * */</span>
        <span class="hljs-keyword">let</span> elemScrollWidth = elementName.scrollWidth;
        <span class="hljs-built_in">console</span>.log(elemScrollWidth);

        <span class="hljs-comment">/* offsetTop&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x4E0A;&#x5916;&#x7F18;&#x8DDD;&#x79BB;&#x6700;&#x8FD1;&#x91C7;&#x7528;&#x5B9A;&#x4F4D;&#x7684;&#x7236;&#x5143;&#x7D20;&#x5185;&#x58C1;&#x7684;&#x8DDD;&#x79BB;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x503C;&#xFF0C;&#x53EA;&#x8BFB;
         * &#x5982;&#x679C;&#x7236;&#x5143;&#x7D20;&#x4E2D;&#x6CA1;&#x6709;&#x91C7;&#x7528;&#x5B9A;&#x4F4D;&#x7684;&#xFF0C;&#x5219;&#x662F;&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x4E0A;&#x5916;&#x8FB9;&#x7F18;&#x8DDD;&#x79BB;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x5185;&#x58C1;&#x7684;&#x8DDD;&#x79BB;
         * &#x5B9A;&#x4F4D;&#x53EA;&#x80FD;&#x4E3A;position:relative&#xFF0C;&#x5176;&#x4ED6;&#x5B9A;&#x4F4D;&#x503C;&#x83B7;&#x53D6;&#x7684;&#x662F;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x5185;&#x58C1;&#x7684;&#x8DDD;&#x79BB;
         * */</span>
        <span class="hljs-keyword">let</span> elemOffsetTop = elementName.offsetTop;
        <span class="hljs-built_in">console</span>.log(elemOffsetTop);

        <span class="hljs-comment">/* offsetLeft&#x4E3A;&#x5143;&#x7D20;&#x7684;&#x5DE6;&#x5916;&#x7F18;&#x8DDD;&#x79BB;&#x6700;&#x8FD1;&#x91C7;&#x7528;&#x5B9A;&#x4F4D;&#x7684;&#x7236;&#x5143;&#x7D20;&#x5185;&#x58C1;&#x7684;&#x8DDD;&#x79BB;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x503C;&#xFF0C;&#x53EA;&#x8BFB;
         * &#x5982;&#x679C;&#x7236;&#x5143;&#x7D20;&#x4E2D;&#x6CA1;&#x6709;&#x91C7;&#x7528;&#x5B9A;&#x4F4D;&#x7684;&#xFF0C;&#x5219;&#x662F;&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x5DE6;&#x5916;&#x8FB9;&#x7F18;&#x8DDD;&#x79BB;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x5185;&#x58C1;&#x7684;&#x8DDD;&#x79BB;
         * &#x5B9A;&#x4F4D;&#x53EA;&#x80FD;&#x4E3A;position:relative&#xFF0C;&#x5176;&#x4ED6;&#x5B9A;&#x4F4D;&#x503C;&#x83B7;&#x53D6;&#x7684;&#x662F;&#x6587;&#x6863;&#x5BF9;&#x8C61;&#x5185;&#x58C1;&#x7684;&#x8DDD;&#x79BB;
         * */</span>
        <span class="hljs-keyword">let</span> elemOffsetLeft = elementName.offsetLeft;
        <span class="hljs-built_in">console</span>.log(elemOffsetLeft);

        <span class="hljs-comment">/* scrollHeight&#x4E3A;&#x5143;&#x7D20;&#x5185;&#x5BB9;&#x7684;&#x5B9E;&#x9645;&#x9AD8;&#x5EA6;
         * &#x5305;&#x62EC;&#x5143;&#x7D20;&#x9AD8;&#x5EA6;&#x3001;&#x5185;&#x8FB9;&#x8DDD;&#x548C;&#x6EA2;&#x51FA;&#x5C3A;&#x5BF8;&#xFF0C;&#x4E0D;&#x5305;&#x62EC;&#x8FB9;&#x6846;&#x548C;&#x5916;&#x8FB9;&#x8DDD;
         * &#x65E0;&#x6EA2;&#x51FA;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x4E0E;clientHeight&#x76F8;&#x540C;
         * */</span>
        <span class="hljs-keyword">let</span> elemScrollHeight = elementName.scrollHeight;
        <span class="hljs-built_in">console</span>.log(elemScrollHeight);

        <span class="hljs-comment">/* scrollTop&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x6216;&#x8005;&#x8BBE;&#x7F6E;&#x5BF9;&#x8C61;&#x7684;&#x6700;&#x9876;&#x90E8;&#x5230;&#x5BF9;&#x8C61;&#x6240;&#x5728;&#x5F53;&#x524D;&#x7A97;&#x53E3;&#x663E;&#x793A;&#x7684;&#x8303;&#x56F4;&#x5185;&#x7684;&#x9876;&#x8FB9;&#x7684;&#x8DDD;&#x79BB;
         * &#x4E5F;&#x5C31;&#x662F;&#x5143;&#x7D20;&#x6EDA;&#x52A8;&#x6761;&#x88AB;&#x5411;&#x4E0B;&#x62C9;&#x52A8;&#x7684;&#x8DDD;&#x79BB;
         * &#x8FD4;&#x56DE;&#x6570;&#x503C;&#xFF0C;&#x53EF;&#x8BFB;&#x5199;
         * */</span>
        <span class="hljs-keyword">let</span> documentScrollTop = <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop;
        <span class="hljs-built_in">console</span>.log(documentScrollTop);

        <span class="hljs-comment">/* scrollLeft&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x6216;&#x8005;&#x8BBE;&#x7F6E;&#x5BF9;&#x8C61;&#x7684;&#x6700;&#x5DE6;&#x8FB9;&#x5230;&#x5BF9;&#x8C61;&#x5728;&#x5F53;&#x524D;&#x7A97;&#x53E3;&#x663E;&#x793A;&#x7684;&#x8303;&#x56F4;&#x5185;&#x7684;&#x5DE6;&#x8FB9;&#x7684;&#x8DDD;&#x79BB;
         * &#x4E5F;&#x5C31;&#x662F;&#x5143;&#x7D20;&#x88AB;&#x6EDA;&#x52A8;&#x6761;&#x5411;&#x5DE6;&#x62C9;&#x52A8;&#x7684;&#x8DDD;&#x79BB;
         * &#x8FD4;&#x56DE;&#x6570;&#x503C;&#xFF0C;&#x53EF;&#x8BFB;&#x5199;
         * */</span>
        <span class="hljs-keyword">let</span> documentScrollLeft = <span class="hljs-built_in">document</span>.documentElement.scrollLeft || <span class="hljs-built_in">document</span>.body.scrollLeft;
        <span class="hljs-built_in">console</span>.log(documentScrollLeft);

        <span class="hljs-comment">/* innerWidth&#x7A97;&#x53E3;&#x7684;&#x6587;&#x6863;&#x663E;&#x793A;&#x533A;&#x7684;&#x5BBD;&#x5EA6;(&#x4E0D;&#x5305;&#x542B;&#x5DE5;&#x5177;&#x6761;&#x4E0E;&#x6EDA;&#x52A8;&#x6761;)&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6570;&#x503C; */</span>
        <span class="hljs-keyword">let</span> windowInnerWidth = <span class="hljs-built_in">window</span>.innerWidth;
        <span class="hljs-built_in">console</span>.log(windowInnerWidth);

        <span class="hljs-comment">/* availWidth&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x5C4F;&#x5E55;&#x7684;&#x53EF;&#x7528;&#x5BBD;&#x5EA6;&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x503C; */</span>
        <span class="hljs-keyword">let</span> screenAvailWidth = screen.availWidth;
        <span class="hljs-built_in">console</span>.log(screenAvailWidth);

        <span class="hljs-comment">/* clientWidth&#x4E3A;&#x53EF;&#x89C6;&#x533A;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x4E0D;&#x5305;&#x542B;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x5BBD;&#x5EA6; */</span>
        <span class="hljs-keyword">let</span> documentClientWidth = <span class="hljs-built_in">document</span>.documentElement.clientWidth || <span class="hljs-built_in">document</span>.body.clientWidth;
        <span class="hljs-built_in">console</span>.log(documentClientWidth);

        elementName.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
            <span class="hljs-comment">/* eventX&#x4E3A;&#x9F20;&#x6807;&#x76F8;&#x5BF9;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x6709;&#x6548;&#x533A;&#x57DF;(&#x9664;&#x53BB;&#x5DE5;&#x5177;&#x680F;&#x7B49;&#x975E;html&#x6587;&#x6863;&#x7684;&#x533A;&#x57DF;)&#x5DE6;&#x4E0A;&#x89D2;x&#x8F74;&#x7684;&#x5750;&#x6807;&#xFF0C;&#x4E0D;&#x968F;&#x6EDA;&#x52A8;&#x6761;&#x6EDA;&#x52A8;&#x800C;&#x6539;&#x53D8; */</span>
            <span class="hljs-keyword">let</span> eventX = event.clientX;
            <span class="hljs-built_in">console</span>.log(eventX);

            <span class="hljs-comment">/* pageX&#x4E3A;&#x9F20;&#x6807;&#x76F8;&#x5BF9;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x6709;&#x6548;&#x533A;&#x57DF;(&#x9664;&#x53BB;&#x5DE5;&#x5177;&#x680F;&#x7B49;&#x975E;html&#x6587;&#x6863;&#x7684;&#x533A;&#x57DF;)&#x5DE6;&#x4E0A;&#x89D2;x&#x8F74;&#x7684;&#x5750;&#x6807;&#xFF0C;&#x968F;&#x6EDA;&#x52A8;&#x6761;&#x6EDA;&#x52A8;&#x800C;&#x6539;&#x53D8; */</span>
            <span class="hljs-keyword">let</span> pageX = event.pageX;
            <span class="hljs-built_in">console</span>.log(pageX);

            <span class="hljs-comment">/* screenX&#x4E3A;&#x9F20;&#x6807;&#x76F8;&#x5BF9;&#x4E8E;&#x663E;&#x793A;&#x5668;&#x5C4F;&#x5E55;&#x5DE6;&#x4E0A;&#x89D2;x&#x8F74;&#x7684;&#x5750;&#x6807; */</span>
            <span class="hljs-keyword">let</span> screenX = event.screenX;
            <span class="hljs-built_in">console</span>.log(screenX);

            <span class="hljs-comment">/* offsetX&#x4E3A;&#x9F20;&#x6807;&#x76F8;&#x5BF9;&#x4E8E;&#x4E8B;&#x4EF6;&#x6E90;&#x5DE6;&#x4E0A;&#x89D2;X&#x8F74;&#x7684;&#x5750;&#x6807; */</span>
            <span class="hljs-keyword">let</span> offsetX = event.offsetX;
            <span class="hljs-built_in">console</span>.log(offsetX);
        }
    })()
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><blockquote><span class="img-wrap"><img data-src="/img/bVbhKTU?w=554&amp;h=592" src="https://static.alili.tech/img/bVbhKTU?w=554&amp;h=592" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/bVbhKTV?w=554&amp;h=491" src="https://static.alili.tech/img/bVbhKTV?w=554&amp;h=491" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/bVbhKTX?w=554&amp;h=431" src="https://static.alili.tech/img/bVbhKTX?w=554&amp;h=431" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></blockquote><ul><li>&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x7684;&#x8BDD;&#x662F;&#x6211;&#x767E;&#x5EA6;&#x627E;&#x7684;&#x56FE;&#x7247;</li></ul><blockquote>&#x8FD9;&#x4E2A;&#x56FE;&#x6211;&#x611F;&#x89C9;&#x6709;&#x70B9;&#x590D;&#x6742;&#x7684;&#x6837;&#x5B50;&#xFF0C;<br><span class="img-wrap"><img data-src="/img/bVE5q8?w=609&amp;h=602" src="https://static.alili.tech/img/bVE5q8?w=609&amp;h=602" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></blockquote><h1 id="articleHeader1">2.margin&#x503C;&#x5408;&#x5E76;&#x7684;&#x95EE;&#x9898;</h1><ul><li>&#x5F53;&#x4E24;&#x4E2A;&#x5782;&#x76F4;&#x5916;&#x8FB9;&#x8DDD;&#x76F8;&#x9047;&#x65F6;&#xFF0C;&#x5B83;&#x4EEC;&#x5C06;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x5916;&#x8FB9;&#x8DDD;&#x3002;&#x5408;&#x5E76;&#x7684;&#x5916;&#x8FB9;&#x8DDD;&#x7684;&#x9AD8;&#x5EA6;&#x7B49;&#x4E8E;&#x4E24;&#x4E2A;&#x53D1;&#x751F;&#x5408;&#x5E76;&#x7684;&#x5916;&#x8FB9;&#x8DDD;&#x7684;&#x9AD8;&#x5EA6;&#x4E2D;&#x7684;&#x8F83;&#x5927;&#x8005;</li><li>&#x8FD8;&#x6709;&#x4E00;&#x79CD;&#x5C31;&#x662F;&#xFF1A;&#x5F53;&#x7236;&#x5143;&#x7D20;&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;&#x5185;&#x8FB9;&#x8DDD;&#x6216;&#x8FB9;&#x6846;,&#x4EE5;&#x53CA;&#x89E6;&#x53D1;BFC&#x65F6;,&#x5982;&#x679C;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x503C;&#x5927;&#x4E8E;&#x7236;&#x5143;&#x7D20;&#x65F6;&#xFF0C;&#x5B83;&#x4F1A;&#x5E26;&#x7740;&#x7236;&#x5143;&#x7D20;&#x4E00;&#x8D77;&#x504F;&#x79FB;,&#x6B64;&#x65F6;&#x5B50;&#x5143;&#x7D20;&#x662F;&#x76F8;&#x5BF9;&#x9664;&#x4E86;&#x5B83;&#x7236;&#x7EA7;&#x4E4B;&#x5916;&#x7684;&#x79BB;&#x5B83;&#x6700;&#x8FD1;&#x7684;&#x5143;&#x7D20;&#x504F;&#x79FB;&#x7684;</li><li>&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x4E24;&#x8005;&#x7684;margin&#x503C;&#xFF0C;&#x6216;&#x8005;&#x5BF9;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;border&#x3001;padding&#xFF0C;&#x6216;&#x8005;&#x5F62;&#x6210;BFC</li></ul><h1 id="articleHeader2">3.&#x5173;&#x4E8E;BFC(&#x5757;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;)</h1><ul><li>&#x5185;&#x90E8;&#x7684;box&#x4F1A;&#x5728;&#x5782;&#x76F4;&#x65B9;&#x5411;&#xFF0C;&#x4E00;&#x4E2A;&#x63A5;&#x4E00;&#x4E2A;&#x7684;&#x653E;&#x7F6E;</li><li>Box&#x5782;&#x76F4;&#x65B9;&#x5411;&#x7684;&#x8DDD;&#x79BB;&#x7531;margin&#x51B3;&#x5B9A;&#xFF0C;&#x5C5E;&#x4E8E;&#x540C;&#x4E00;&#x4E2A;bfc&#x7684;&#x4E24;&#x4E2A;&#x76F8;&#x90BB;box&#x7684;margin&#x4F1A;&#x53D1;&#x751F;&#x91CD;&#x53E0;</li><li>&#x6BCF;&#x4E2A;&#x5143;&#x7D20;&#x7684;margin box &#x7684;&#x5DE6;&#x8FB9;&#xFF0C;&#x4E0E;&#x5305;&#x542B;&#x5757;border box&#x7684;&#x5DE6;&#x8FB9;&#x76F8;&#x63A5;&#x89E6;&#xFF08;&#x5BF9;&#x4E8E;&#x4ECE;&#x5DE6;&#x5F80;&#x53F3;&#x7684;&#x683C;&#x5F0F;&#x5316;&#xFF0C;&#x5426;&#x5219;&#x76F8;&#x53CD;&#xFF09;&#x3002;&#x5373;&#x4F7F;&#x5B58;&#x5728;&#x6D6E;&#x52A8;&#x4E5F;&#x662F;&#x5982;&#x6B64;</li><li>Bfc&#x7684;&#x533A;&#x57DF;&#x4E0D;&#x4F1A;&#x4E0E;float box&#x91CD;&#x53E0;</li><li>Bfc&#x5C31;&#x662F;&#x9875;&#x9762;&#x4E0A;&#x7684;&#x4E00;&#x4E2A;&#x9694;&#x79BB;&#x7684;&#x72EC;&#x7ACB;&#x7684;&#x5BB9;&#x5668;&#xFF0C;&#x5BB9;&#x5668;&#x91CC;&#x9762;&#x7684;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x5916;&#x9762;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x53CD;&#x4E4B;&#x4E5F;&#x662F;&#x5982;&#x6B64;</li><li>&#x8BA1;&#x7B97;bfc&#x7684;&#x9AD8;&#x5EA6;&#x65F6;&#xFF0C;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x4E5F;&#x4F1A;&#x53C2;&#x4E0E;&#x8BA1;&#x7B97;</li></ul><h2 id="articleHeader3">4.&#x5F62;&#x6210;bfc&#x7684;&#x6761;&#x4EF6;</h2><ul><li>&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#xFF0C;float&#x9664;none&#x5916;&#x7684;&#x503C;</li><li>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#xFF0C;position&#xFF08;absolute&#xFF0C;flxed&#xFF09;</li><li>display&#xFF1A;inline-block&#xFF0C;table-cells&#xFF0C;table-captions</li><li>overflow&#x9664;&#x4E86;visible&#x4EE5;&#x5916;&#x7684;&#x503C;</li></ul><blockquote>&#x6B63;&#x5728;&#x52AA;&#x529B;&#x5B66;&#x4E60;&#x4E2D;&#xFF0C;&#x82E5;&#x5BF9;&#x4F60;&#x7684;&#x5B66;&#x4E60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x7559;&#x4E0B;&#x4F60;&#x7684;&#x5370;&#x8BB0;&#x5457;&#xFF08;&#x70B9;&#x4E2A;&#x8D5E;&#x54AF;^_^&#xFF09;</blockquote><ul><li><p>&#x5F80;&#x671F;&#x597D;&#x6587;&#x63A8;&#x8350;&#xFF1A;</p><ul><li><a href="https://segmentfault.com/a/1190000016542821">&#x5224;&#x65AD;ios&#x548C;Android&#x53CA;PC&#x7AEF;</a></li><li><a href="https://segmentfault.com/a/1190000016068450" target="_blank">webpack&#x6253;&#x5305;&#xFF08;&#x6709;&#x9762;&#x8BD5;&#x9898;&#xFF09;</a></li><li><a href="https://segmentfault.com/a/1190000016255824">&#x7EAF;css&#x5B9E;&#x73B0;&#x7011;&#x5E03;&#x6D41;&#xFF08;multi-column&#x591A;&#x5217;&#x53CA;flex&#x5E03;&#x5C40;&#xFF09;</a></li></ul></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于scroll,client,innear,avail,offset等的理解

## 原文链接
[https://segmentfault.com/a/1190000016601311](https://segmentfault.com/a/1190000016601311)

