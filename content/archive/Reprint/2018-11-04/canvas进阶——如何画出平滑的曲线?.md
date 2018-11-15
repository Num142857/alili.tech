---
title: canvas进阶——如何画出平滑的曲线?
hidden: true
categories: reprint
slug: 1e9c78b9
date: 2018-11-04 02:30:10
---

{{< raw >}}
<h3 id="articleHeader0">&#x80CC;&#x666F;&#x6982;&#x8981;</h3><p>&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x5E73;&#x65F6;&#x5728;&#x5B66;&#x4E60;canvas &#x6216; &#x9879;&#x76EE;&#x5F00;&#x53D1;&#x4E2D;&#x4F7F;&#x7528;canvas&#x7684;&#x65F6;&#x5019;&#x5E94;&#x8BE5;&#x90FD;&#x9047;&#x5230;&#x8FC7;&#x8FD9;&#x6837;&#x7684;&#x9700;&#x6C42;&#xFF1A;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x4E66;&#x5199;&#x7684;&#x753B;&#x677F;&#x5C0F;&#x5DE5;&#x5177;&#x3002;</p><p>&#x55EF;&#xFF0C;&#x76F8;&#x4FE1;&#x8FD9;&#x5BF9;canvas&#x4F7F;&#x7528;&#x8F83;&#x719F;&#x7684;&#x7AE5;&#x978B;&#x6765;&#x8BF4;&#x4EC5;&#x4EC5;&#x53EA;&#x662F;&#x51E0;&#x5341;&#x884C;&#x4EE3;&#x7801;&#x5C31;&#x53EF;&#x4EE5;&#x641E;&#x6382;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x4EE5;&#x4E0B;demo&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x518D;&#x4E5F;&#x7B80;&#x5355;&#x4E0D;&#x8FC7;&#x7684;&#x4F8B;&#x5B50;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Sketchpad demo&lt;/title&gt;
    &lt;style type=&quot;text/css&quot;&gt;
        canvas {
            border: 1px blue solid; 
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;canvas id=&quot;canvas&quot; width=&quot;800&quot; height=&quot;500&quot;&gt;&lt;/canvas&gt;
    &lt;script type=&quot;text/javascript&quot;&gt;
        let isDown = false;
        let beginPoint = null;
        const canvas = document.querySelector(&apos;#canvas&apos;);
        const ctx = canvas.getContext(&apos;2d&apos;);

        // &#x8BBE;&#x7F6E;&#x7EBF;&#x6761;&#x989C;&#x8272;
        ctx.strokeStyle = &apos;red&apos;;
        ctx.lineWidth = 1;
        ctx.lineJoin = &apos;round&apos;;
        ctx.lineCap = &apos;round&apos;;

        canvas.addEventListener(&apos;mousedown&apos;, down, false);
        canvas.addEventListener(&apos;mousemove&apos;, move, false);
        canvas.addEventListener(&apos;mouseup&apos;, up, false);
        canvas.addEventListener(&apos;mouseout&apos;, up, false);

        function down(evt) {
            isDown = true;
            beginPoint = getPos(evt);
        }

        function move(evt) {
            if (!isDown) return;
            const endPoint = getPos(evt);
            drawLine(beginPoint, endPoint);
            beginPoint = endPoint;
        }

        function up(evt) {
            if (!isDown) return;
            
            const endPoint = getPos(evt);
            drawLine(beginPoint, endPoint);

            beginPoint = null;
            isDown = false;
        }

        function getPos(evt) {
            return {
                x: evt.clientX,
                y: evt.clientY
            }
        }

        function drawLine(beginPoint, endPoint) {
            ctx.beginPath();
            ctx.moveTo(beginPoint.x, beginPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.stroke();
            ctx.closePath();
        }
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Sketchpad demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">canvas</span> {
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> blue solid; 
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;canvas&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;800&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;500&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">let</span> isDown = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">let</span> beginPoint = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#canvas&apos;</span>);
        <span class="hljs-keyword">const</span> ctx = canvas.getContext(<span class="hljs-string">&apos;2d&apos;</span>);

        <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x7EBF;&#x6761;&#x989C;&#x8272;</span>
        ctx.strokeStyle = <span class="hljs-string">&apos;red&apos;</span>;
        ctx.lineWidth = <span class="hljs-number">1</span>;
        ctx.lineJoin = <span class="hljs-string">&apos;round&apos;</span>;
        ctx.lineCap = <span class="hljs-string">&apos;round&apos;</span>;

        canvas.addEventListener(<span class="hljs-string">&apos;mousedown&apos;</span>, down, <span class="hljs-literal">false</span>);
        canvas.addEventListener(<span class="hljs-string">&apos;mousemove&apos;</span>, move, <span class="hljs-literal">false</span>);
        canvas.addEventListener(<span class="hljs-string">&apos;mouseup&apos;</span>, up, <span class="hljs-literal">false</span>);
        canvas.addEventListener(<span class="hljs-string">&apos;mouseout&apos;</span>, up, <span class="hljs-literal">false</span>);

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">down</span>(<span class="hljs-params">evt</span>) </span>{
            isDown = <span class="hljs-literal">true</span>;
            beginPoint = getPos(evt);
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">move</span>(<span class="hljs-params">evt</span>) </span>{
            <span class="hljs-keyword">if</span> (!isDown) <span class="hljs-keyword">return</span>;
            <span class="hljs-keyword">const</span> endPoint = getPos(evt);
            drawLine(beginPoint, endPoint);
            beginPoint = endPoint;
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">up</span>(<span class="hljs-params">evt</span>) </span>{
            <span class="hljs-keyword">if</span> (!isDown) <span class="hljs-keyword">return</span>;
            
            <span class="hljs-keyword">const</span> endPoint = getPos(evt);
            drawLine(beginPoint, endPoint);

            beginPoint = <span class="hljs-literal">null</span>;
            isDown = <span class="hljs-literal">false</span>;
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPos</span>(<span class="hljs-params">evt</span>) </span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">x</span>: evt.clientX,
                <span class="hljs-attr">y</span>: evt.clientY
            }
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawLine</span>(<span class="hljs-params">beginPoint, endPoint</span>) </span>{
            ctx.beginPath();
            ctx.moveTo(beginPoint.x, beginPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.stroke();
            ctx.closePath();
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x5B83;&#x7684;&#x5B9E;&#x73B0;&#x903B;&#x8F91;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF1A;</p><ol><li>&#x6211;&#x4EEC;&#x5728;canvas&#x753B;&#x5E03;&#x4E0A;&#x4E3B;&#x8981;&#x76D1;&#x542C;&#x4E86;&#x4E09;&#x4E2A;&#x4E8B;&#x4EF6;&#xFF1A;<code>mousedown</code>&#x3001;<code>mouseup</code>&#x548C;<code>mousemove</code>&#xFF0C;&#x540C;&#x65F6;&#x6211;&#x4EEC;&#x4E5F;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;<code>isDown</code>&#x53D8;&#x91CF;&#xFF1B;</li><li>&#x5F53;&#x7528;&#x6237;&#x6309;&#x4E0B;&#x9F20;&#x6807;&#xFF08;<code>mousedown</code>&#xFF0C;&#x5373;&#x8D77;&#x7B14;&#xFF09;&#x65F6;&#x5C06;<code>isDown</code>&#x7F6E;&#x4E3A;<code>true</code>&#xFF0C;&#x800C;&#x653E;&#x4E0B;&#x9F20;&#x6807;&#xFF08;<code>mouseup</code>&#xFF09;&#x7684;&#x65F6;&#x5019;&#x5C06;&#x5B83;&#x7F6E;&#x4E3A;<code>false</code>&#xFF0C;&#x8FD9;&#x6837;&#x505A;&#x7684;&#x597D;&#x5904;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x5224;&#x65AD;&#x7528;&#x6237;&#x5F53;&#x524D;&#x662F;&#x5426;&#x5904;&#x4E8E;&#x7ED8;&#x753B;&#x72B6;&#x6001;&#xFF1B;</li><li>&#x901A;&#x8FC7;<code>mousemove</code>&#x4E8B;&#x4EF6;&#x4E0D;&#x65AD;&#x91C7;&#x96C6;&#x9F20;&#x6807;&#x7ECF;&#x8FC7;&#x7684;&#x5750;&#x6807;&#x70B9;&#xFF0C;&#x5F53;&#x4E14;&#x4EC5;&#x5F53;<code>isDown</code>&#x4E3A;<code>true</code>&#xFF08;&#x5373;&#x5904;&#x4E8E;&#x4E66;&#x5199;&#x72B6;&#x6001;&#xFF09;&#x65F6;&#x5C06;&#x5F53;&#x524D;&#x7684;&#x70B9;&#x901A;&#x8FC7;canvas&#x7684;<code>lineTo</code>&#x65B9;&#x6CD5;&#x4E0E;&#x524D;&#x9762;&#x7684;&#x70B9;&#x8FDB;&#x884C;&#x8FDE;&#x63A5;&#x3001;&#x7ED8;&#x5236;&#xFF1B;</li></ol><p>&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x51E0;&#x4E2A;&#x6B65;&#x9AA4;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x57FA;&#x672C;&#x7684;&#x753B;&#x677F;&#x529F;&#x80FD;&#x4E86;&#xFF0C;&#x7136;&#x800C;&#x4E8B;&#x60C5;&#x5E76;&#x6CA1;&#x90A3;&#x4E48;&#x7B80;&#x5355;&#xFF0C;&#x4ED4;&#x7EC6;&#x7684;&#x7AE5;&#x978B;&#x4E5F;&#x8BB8;&#x4F1A;&#x53D1;&#x73B0;&#x4E00;&#x4E2A;&#x5F88;&#x4E25;&#x91CD;&#x7684;&#x95EE;&#x9898;&#x2014;&#x2014;&#x901A;&#x8FC7;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x753B;&#x51FA;&#x6765;&#x7684;&#x7EBF;&#x6761;&#x5B58;&#x5728;&#x952F;&#x9F7F;&#xFF0C;&#x4E0D;&#x591F;&#x5E73;&#x6ED1;&#xFF0C;&#x800C;&#x4E14;&#x4F60;&#x753B;&#x5F97;&#x8D8A;&#x5FEB;&#xFF0C;&#x6298;&#x7EBF;&#x611F;&#x8D8A;&#x5F3A;&#x3002;&#x8868;&#x73B0;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016672570?w=644&amp;h=397" src="https://static.alili.tech/img/remote/1460000016672570?w=644&amp;h=397" alt="howToDrawLineSmoothly_6" title="howToDrawLineSmoothly_6" style="cursor:pointer;display:inline"></span></p><p>&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x8FD9;&#x6837;&#x5462;&#xFF1F;</p><h3 id="articleHeader1">&#x95EE;&#x9898;&#x5206;&#x6790;</h3><p>&#x51FA;&#x73B0;&#x8BE5;&#x73B0;&#x8C61;&#x7684;&#x539F;&#x56E0;&#x4E3B;&#x8981;&#x662F;&#xFF1A;</p><ul><li>&#x6211;&#x4EEC;&#x662F;&#x4EE5;canvas&#x7684;<code>lineTo</code>&#x65B9;&#x6CD5;&#x8FDE;&#x63A5;&#x70B9;&#x7684;&#xFF0C;&#x8FDE;&#x63A5;&#x76F8;&#x90BB;&#x4E24;&#x70B9;&#x7684;&#x662F;&#x6761;&#x76F4;&#x7EBF;&#xFF0C;&#x975E;&#x66F2;&#x7EBF;&#xFF0C;&#x56E0;&#x6B64;&#x901A;&#x8FC7;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x7ED8;&#x5236;&#x51FA;&#x6765;&#x7684;&#x662F;&#x6761;&#x6298;&#x7EBF;&#xFF1B;<br><span class="img-wrap"><img data-src="/img/remote/1460000016672571?w=554&amp;h=196" src="https://static.alili.tech/img/remote/1460000016672571?w=554&amp;h=196" alt="howToDrawLineSmoothly_1.png" title="howToDrawLineSmoothly_1.png" style="cursor:pointer;display:inline"></span></li><li>&#x53D7;&#x9650;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x5BF9;<code>mousemove</code>&#x4E8B;&#x4EF6;&#x7684;&#x91C7;&#x96C6;&#x9891;&#x7387;&#xFF0C;&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;&#x5728;<code>mousemove</code>&#x65F6;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x662F;&#x6BCF;&#x9694;&#x4E00;&#x5C0F;&#x6BB5;&#x65F6;&#x95F4;&#x53BB;&#x91C7;&#x96C6;&#x5F53;&#x524D;&#x9F20;&#x6807;&#x7684;&#x5750;&#x6807;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x9F20;&#x6807;&#x79FB;&#x52A8;&#x7684;&#x8D8A;&#x5FEB;&#xFF0C;&#x91C7;&#x96C6;&#x7684;&#x4E24;&#x4E2A;&#x4E34;&#x8FD1;&#x70B9;&#x7684;&#x8DDD;&#x79BB;&#x5C31;&#x8D8A;&#x8FDC;&#xFF0C;&#x6545;&#x201C;&#x6298;&#x7EBF;&#x611F;&#x8D8A;&#x660E;&#x663E;&#x201C;&#xFF1B;</li></ul><h3 id="articleHeader2">&#x5982;&#x4F55;&#x624D;&#x80FD;&#x753B;&#x51FA;&#x5E73;&#x6ED1;&#x7684;&#x66F2;&#x7EBF;?</h3><p>&#x8981;&#x753B;&#x51FA;&#x5E73;&#x6ED1;&#x7684;&#x66F2;&#x7EBF;&#xFF0C;&#x5176;&#x5B9E;&#x4E5F;&#x662F;&#x6709;&#x65B9;&#x6CD5;&#x7684;&#xFF0C;<code>lineTo</code>&#x9760;&#x4E0D;&#x4F4F;&#x90A3;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x91C7;&#x7528;canvas&#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x7ED8;&#x56FE;API&#x2014;&#x2014;<code>quadraticCurveTo</code>&#xFF0C;&#x5B83;&#x7528;&#x4E8E;&#x7ED8;&#x5236;&#x4E8C;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x3002;</p><h4>&#x4E8C;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;</h4><p><code>quadraticCurveTo(cp1x, cp1y, x, y)</code></p><p>&#x8C03;&#x7528;<code>quadraticCurveTo</code>&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x56DB;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;<code>cp1x</code>&#x3001;<code>cp1y</code>&#x63CF;&#x8FF0;&#x7684;&#x662F;&#x63A7;&#x5236;&#x70B9;&#xFF0C;&#x800C;<code>x</code>&#x3001;<code>y</code>&#x5219;&#x662F;&#x66F2;&#x7EBF;&#x7684;&#x7EC8;&#x70B9;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016672572?w=258&amp;h=140" src="https://static.alili.tech/img/remote/1460000016672572?w=258&amp;h=140" alt="howToDrawLineSmoothly_7" title="howToDrawLineSmoothly_7" style="cursor:pointer;display:inline"></span></p><p>&#x66F4;&#x591A;&#x8BE6;&#x7EC6;&#x7684;&#x4FE1;&#x606F;&#x53EF;&#x79FB;&#x6B65;<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes" rel="nofollow noreferrer" target="_blank">MDN</a></p><p>&#x65E2;&#x7136;&#x8981;&#x4F7F;&#x7528;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#xFF0C;&#x5F88;&#x663E;&#x7136;&#x6211;&#x4EEC;&#x7684;&#x6570;&#x636E;&#x662F;&#x4E0D;&#x591F;&#x7528;&#x7684;&#xFF0C;<strong>&#x8981;&#x5B8C;&#x6574;&#x63CF;&#x8FF0;&#x4E00;&#x4E2A;&#x4E8C;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#xFF1A;&#x8D77;&#x59CB;&#x70B9;&#x3001;&#x63A7;&#x5236;&#x70B9;&#x548C;&#x7EC8;&#x70B9;</strong>&#xFF0C;&#x8FD9;&#x4E9B;&#x6570;&#x636E;&#x600E;&#x4E48;&#x6765;&#x5462;&#xFF1F;</p><p>&#x6709;&#x4E00;&#x4E2A;&#x5F88;&#x5DE7;&#x5999;&#x7684;&#x7B97;&#x6CD5;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x83B7;&#x53D6;&#x8FD9;&#x4E9B;&#x4FE1;&#x606F;</p><h4>&#x83B7;&#x53D6;&#x4E8C;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x5173;&#x952E;&#x70B9;&#x7684;&#x7B97;&#x6CD5;</h4><p>&#x8FD9;&#x4E2A;&#x7B97;&#x6CD5;&#x5E76;&#x4E0D;&#x96BE;&#x7406;&#x89E3;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x76F4;&#x63A5;&#x4E3E;&#x4F8B;&#x5B50;&#x5427;&#xFF1A;</p><ol><li>&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x5728;&#x4E00;&#x6B21;&#x7ED8;&#x753B;&#x4E2D;&#x5171;&#x91C7;&#x96C6;&#x5230;6&#x4E2A;&#x9F20;&#x6807;&#x5750;&#x6807;&#xFF0C;&#x5206;&#x522B;&#x662F;<code>A, B, C, D, E, F</code>&#xFF1B;</li><li>&#x53D6;&#x524D;&#x9762;&#x7684;<code>A, B, C</code>&#x4E09;&#x70B9;&#xFF0C;&#x8BA1;&#x7B97;&#x51FA;<code>B</code>&#x548C;<code>C</code>&#x7684;&#x4E2D;&#x70B9;<code>B1</code>&#xFF0C;&#x4EE5;<code>A</code>&#x4E3A;&#x8D77;&#x70B9;&#xFF0C;<code>B</code>&#x4E3A;&#x63A7;&#x5236;&#x70B9;&#xFF0C;<code>B1</code>&#x4E3A;&#x7EC8;&#x70B9;&#xFF0C;&#x5229;&#x7528;<code>quadraticCurveTo</code>&#x7ED8;&#x5236;&#x4E00;&#x6761;&#x4E8C;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x7EBF;&#x6BB5;&#xFF1B;<br><span class="img-wrap"><img data-src="/img/remote/1460000016672573?w=515&amp;h=238" src="https://static.alili.tech/img/remote/1460000016672573?w=515&amp;h=238" alt="howToDrawLineSmoothly_2" title="howToDrawLineSmoothly_2" style="cursor:pointer;display:inline"></span></li><li>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x8BA1;&#x7B97;&#x5F97;&#x51FA;<code>C</code>&#x4E0E;<code>D</code>&#x70B9;&#x7684;&#x4E2D;&#x70B9;<code>C1</code>&#xFF0C;&#x4EE5;<code>B1</code>&#x4E3A;&#x8D77;&#x70B9;&#x3001;<code>C</code>&#x4E3A;&#x63A7;&#x5236;&#x70B9;&#x3001;<code>C1</code>&#x4E3A;&#x7EC8;&#x70B9;&#x7EE7;&#x7EED;&#x7ED8;&#x5236;&#x66F2;&#x7EBF;&#xFF1B;<br><span class="img-wrap"><img data-src="/img/remote/1460000016672574?w=625&amp;h=320" src="https://static.alili.tech/img/remote/1460000016672574?w=625&amp;h=320" alt="howToDrawLineSmoothly_3" title="howToDrawLineSmoothly_3" style="cursor:pointer;display:inline"></span></li><li>&#x4F9D;&#x6B21;&#x7C7B;&#x63A8;&#x4E0D;&#x65AD;&#x7ED8;&#x5236;&#x4E0B;&#x53BB;&#xFF0C;&#x5F53;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x70B9;<code>F</code>&#x65F6;&#xFF0C;&#x5219;&#x4EE5;<code>D</code>&#x548C;<code>E</code>&#x7684;&#x4E2D;&#x70B9;<code>D1</code>&#x4E3A;&#x8D77;&#x70B9;&#xFF0C;&#x4EE5;<code>E</code>&#x4E3A;&#x63A7;&#x5236;&#x70B9;&#xFF0C;<code>F</code>&#x4E3A;&#x7EC8;&#x70B9;&#x7ED3;&#x675F;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000016672575?w=908&amp;h=321" src="https://static.alili.tech/img/remote/1460000016672575?w=908&amp;h=321" alt="howToDrawLineSmoothly_4" title="howToDrawLineSmoothly_4" style="cursor:pointer;display:inline"></span></li></ol><p>OK&#xFF0C;&#x7B97;&#x6CD5;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x57FA;&#x4E8E;&#x8BE5;&#x7B97;&#x6CD5;&#x518D;&#x5BF9;&#x73B0;&#x6709;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x5347;&#x7EA7;&#x6539;&#x9020;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let isDown = false;
let points = [];
let beginPoint = null;
const canvas = document.querySelector(&apos;#canvas&apos;);
const ctx = canvas.getContext(&apos;2d&apos;);

// &#x8BBE;&#x7F6E;&#x7EBF;&#x6761;&#x989C;&#x8272;
ctx.strokeStyle = &apos;red&apos;;
ctx.lineWidth = 1;
ctx.lineJoin = &apos;round&apos;;
ctx.lineCap = &apos;round&apos;;

canvas.addEventListener(&apos;mousedown&apos;, down, false);
canvas.addEventListener(&apos;mousemove&apos;, move, false);
canvas.addEventListener(&apos;mouseup&apos;, up, false);
canvas.addEventListener(&apos;mouseout&apos;, up, false);

function down(evt) {
    isDown = true;
    const { x, y } = getPos(evt);
    points.push({x, y});
    beginPoint = {x, y};
}

function move(evt) {
    if (!isDown) return;

    const { x, y } = getPos(evt);
    points.push({x, y});

    if (points.length &gt; 3) {
        const lastTwoPoints = points.slice(-2);
        const controlPoint = lastTwoPoints[0];
        const endPoint = {
            x: (lastTwoPoints[0].x + lastTwoPoints[1].x) / 2,
            y: (lastTwoPoints[0].y + lastTwoPoints[1].y) / 2,
        }
        drawLine(beginPoint, controlPoint, endPoint);
        beginPoint = endPoint;
    }
}

function up(evt) {
    if (!isDown) return;
    const { x, y } = getPos(evt);
    points.push({x, y});

    if (points.length &gt; 3) {
        const lastTwoPoints = points.slice(-2);
        const controlPoint = lastTwoPoints[0];
        const endPoint = lastTwoPoints[1];
        drawLine(beginPoint, controlPoint, endPoint);
    }
    beginPoint = null;
    isDown = false;
    points = [];
}

function getPos(evt) {
    return {
        x: evt.clientX,
        y: evt.clientY
    }
}

function drawLine(beginPoint, controlPoint, endPoint) {
    ctx.beginPath();
    ctx.moveTo(beginPoint.x, beginPoint.y);
    ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
    ctx.stroke();
    ctx.closePath();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> isDown = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">let</span> points = [];
<span class="hljs-keyword">let</span> beginPoint = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#canvas&apos;</span>);
<span class="hljs-keyword">const</span> ctx = canvas.getContext(<span class="hljs-string">&apos;2d&apos;</span>);

<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x7EBF;&#x6761;&#x989C;&#x8272;</span>
ctx.strokeStyle = <span class="hljs-string">&apos;red&apos;</span>;
ctx.lineWidth = <span class="hljs-number">1</span>;
ctx.lineJoin = <span class="hljs-string">&apos;round&apos;</span>;
ctx.lineCap = <span class="hljs-string">&apos;round&apos;</span>;

canvas.addEventListener(<span class="hljs-string">&apos;mousedown&apos;</span>, down, <span class="hljs-literal">false</span>);
canvas.addEventListener(<span class="hljs-string">&apos;mousemove&apos;</span>, move, <span class="hljs-literal">false</span>);
canvas.addEventListener(<span class="hljs-string">&apos;mouseup&apos;</span>, up, <span class="hljs-literal">false</span>);
canvas.addEventListener(<span class="hljs-string">&apos;mouseout&apos;</span>, up, <span class="hljs-literal">false</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">down</span>(<span class="hljs-params">evt</span>) </span>{
    isDown = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">const</span> { x, y } = getPos(evt);
    points.push({x, y});
    beginPoint = {x, y};
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">move</span>(<span class="hljs-params">evt</span>) </span>{
    <span class="hljs-keyword">if</span> (!isDown) <span class="hljs-keyword">return</span>;

    <span class="hljs-keyword">const</span> { x, y } = getPos(evt);
    points.push({x, y});

    <span class="hljs-keyword">if</span> (points.length &gt; <span class="hljs-number">3</span>) {
        <span class="hljs-keyword">const</span> lastTwoPoints = points.slice(<span class="hljs-number">-2</span>);
        <span class="hljs-keyword">const</span> controlPoint = lastTwoPoints[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">const</span> endPoint = {
            <span class="hljs-attr">x</span>: (lastTwoPoints[<span class="hljs-number">0</span>].x + lastTwoPoints[<span class="hljs-number">1</span>].x) / <span class="hljs-number">2</span>,
            <span class="hljs-attr">y</span>: (lastTwoPoints[<span class="hljs-number">0</span>].y + lastTwoPoints[<span class="hljs-number">1</span>].y) / <span class="hljs-number">2</span>,
        }
        drawLine(beginPoint, controlPoint, endPoint);
        beginPoint = endPoint;
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">up</span>(<span class="hljs-params">evt</span>) </span>{
    <span class="hljs-keyword">if</span> (!isDown) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">const</span> { x, y } = getPos(evt);
    points.push({x, y});

    <span class="hljs-keyword">if</span> (points.length &gt; <span class="hljs-number">3</span>) {
        <span class="hljs-keyword">const</span> lastTwoPoints = points.slice(<span class="hljs-number">-2</span>);
        <span class="hljs-keyword">const</span> controlPoint = lastTwoPoints[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">const</span> endPoint = lastTwoPoints[<span class="hljs-number">1</span>];
        drawLine(beginPoint, controlPoint, endPoint);
    }
    beginPoint = <span class="hljs-literal">null</span>;
    isDown = <span class="hljs-literal">false</span>;
    points = [];
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPos</span>(<span class="hljs-params">evt</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">x</span>: evt.clientX,
        <span class="hljs-attr">y</span>: evt.clientY
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawLine</span>(<span class="hljs-params">beginPoint, controlPoint, endPoint</span>) </span>{
    ctx.beginPath();
    ctx.moveTo(beginPoint.x, beginPoint.y);
    ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
    ctx.stroke();
    ctx.closePath();
}</code></pre><p>&#x5728;&#x539F;&#x6709;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;<code>points</code>&#x7528;&#x4E8E;&#x4FDD;&#x5B58;&#x4E4B;&#x524D;<code>mousemove</code>&#x4E8B;&#x4EF6;&#x4E2D;&#x9F20;&#x6807;&#x7ECF;&#x8FC7;&#x7684;&#x70B9;&#xFF0C;&#x6839;&#x636E;&#x8BE5;&#x7B97;&#x6CD5;&#x53EF;&#x77E5;&#x8981;&#x7ED8;&#x5236;&#x4E8C;&#x6B21;&#x8D1D;&#x585E;&#x5C14;&#x66F2;&#x7EBF;&#x8D77;&#x7801;&#x9700;&#x8981;3&#x4E2A;&#x70B9;&#x4EE5;&#x4E0A;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x53EA;&#x6709;&#x5728;<code>points</code>&#x4E2D;&#x7684;&#x70B9;&#x6570;&#x5927;&#x4E8E;3&#x65F6;&#x624D;&#x5F00;&#x59CB;&#x7ED8;&#x5236;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x5904;&#x7406;&#x5C31;&#x8DDF;&#x8BE5;&#x7B97;&#x6CD5;&#x4E00;&#x6BDB;&#x4E00;&#x6837;&#x4E86;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;&#x3002;</p><p>&#x4EE3;&#x7801;&#x66F4;&#x65B0;&#x540E;&#x6211;&#x4EEC;&#x7684;&#x66F2;&#x7EBF;&#x4E5F;&#x53D8;&#x5F97;&#x5E73;&#x6ED1;&#x4E86;&#x8BB8;&#x591A;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016672576?w=613&amp;h=366" src="https://static.alili.tech/img/remote/1460000016672576?w=613&amp;h=366" alt="howToDrawLineSmoothly_5" title="howToDrawLineSmoothly_5" style="cursor:pointer;display:inline"></span></p><p>&#x672C;&#x6587;&#x5230;&#x8FD9;&#x91CC;&#x5C31;&#x7ED3;&#x675F;&#x4E86;&#xFF0C;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x5728;canvas&#x753B;&#x677F;&#x4E2D;&#x201C;&#x753B;&#x201D;&#x5F97;&#x6109;&#x5FEB;~&#x6211;&#x4EEC;&#x4E0B;&#x6B21;&#x518D;&#x89C1;&#xFF1A;&#xFF09;</p><p>&#x611F;&#x5174;&#x8DA3;&#x7684;&#x7AE5;&#x978B;&#x53EF;<a href="https://github.com/JS-Hao/blog" rel="nofollow noreferrer" target="_blank">&#x6233;&#x8FD9;&#x91CC;</a>&#x5173;&#x6CE8;&#x6211;&#x7684;&#x535A;&#x5BA2;&#xFF0C;&#x4EFB;&#x4F55;&#x65B0;&#x9C9C;&#x597D;&#x73A9;&#x7684;&#x535A;&#x6587;&#x5C06;&#x4F1A;&#x7B2C;&#x4E00;&#x65F6;&#x95F4;&#x5206;&#x4EAB;&#x5230;&#x8FD9;&#x513F;&#x54E6;~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
canvas进阶——如何画出平滑的曲线?

## 原文链接
[https://segmentfault.com/a/1190000016672567](https://segmentfault.com/a/1190000016672567)

