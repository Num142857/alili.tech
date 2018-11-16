---
title: 'JavaScript抖动的实现' 
date: 2018-11-17 2:30:12
hidden: true
slug: xoebuvujsjk
categories: reprint
---

{{< raw >}}
<h2 id="articleHeader0">&#x5B9E;&#x73B0;&#x539F;&#x7406;</h2><p>&#x6296;&#x52A8;&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x8BA9;&#x8282;&#x70B9;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x4F4D;&#x7F6E;&#x7684;&#x504F;&#x79FB;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x5B9E;&#x73B0;&#x6B64;&#x529F;&#x80FD;&#x7684;&#x65F6;&#x5019;&#x6700;&#x597D;&#x8282;&#x70B9;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#xFF0C;&#x7136;&#x540E;&#x6765;&#x4FEE;&#x6539;&#x5B83;&#x4EEC;&#x7684;top&#x548C;left&#x503C;&#x3002;<br>&#x8FD9;&#x91CC;&#x6709;&#x51E0;&#x4E2A;&#x8981;&#x70B9;&#xFF0C;&#x7B2C;&#x4E00;&#x662F;&#x8981;&#x51C6;&#x5907;&#x597D;&#x9700;&#x8981;&#x504F;&#x79FB;&#x7684;&#x9891;&#x7387;&#xFF0C;&#x8FD9;&#x4E2A;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x628A;&#x504F;&#x79FB;&#x8DDD;&#x79BB;&#x653E;&#x5230;&#x6570;&#x7EC4;&#x4E2D;&#x6765;&#x63A7;&#x5236;&#x504F;&#x79FB;&#x8DDD;&#x79BB;&#xFF0C;&#x504F;&#x79FB;&#x8DDD;&#x79BB;&#x8DF3;&#x52A8;&#x5E45;&#x5EA6;&#x8D8A;&#x5C0F;&#xFF0C;&#x6548;&#x679C;&#x5C31;&#x8D8A;&#x5E73;&#x7A33;&#x3002;&#x5B9A;&#x65F6;&#x5668;&#x65F6;&#x95F4;&#x51B3;&#x5B9A;&#x4E86;&#x8282;&#x70B9;&#x6296;&#x52A8;&#x7684;&#x901F;&#x5EA6;&#x3002;</p><p><strong>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;
    &lt;title&gt;Made with Thimble&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;style.css&quot;&gt;
    &lt;style&gt;
        img{
            width:300px;
            height: 400px;
            position:absolute;
            top:20px;
            left:150px;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;img id=&quot;img1&quot; src=&quot;https://newimg.uumnt.cc:8092/Pics/2017/0622/03/06.jpg&quot;&gt;
&lt;/body&gt;
&lt;script&gt;
    var oImg = document.getElementById(&apos;img1&apos;);
    oImg.onclick = function(){
        //this &#x5230;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x4F5C;&#x7528;&#x57DF;&#x4F1A;&#x53D8;&#xFF0C;&#x8FD9;&#x91CC;&#x8D4B;&#x503C;&#x5148;&#x53D8;&#x6210;&#x5C40;&#x90E8;
        var that = this;
        shaking(that,&apos;top&apos;,function(){
            shaking(that,&apos;left&apos;);
        });
    };

    // &#x6296;&#x52A8;&#x51FD;&#x6570;&#x5C01;&#x88C5; attr&#xFF1A;left&#x6C34;&#x5E73;&#x6296;&#x52A8; top&#xFF1A;&#x5782;&#x76F4;&#x6296;&#x52A8;
    function shaking(obj,attr,callback){
        var pos = parseInt(getStyle(obj,attr));
        var arr = [];
        var num = 0;
        for(var i=20;i&gt;0;i-=2){
            arr.push(i,-i);
        }
        arr.push(0);
        clearInterval(obj.shaking);
        obj.shaking = setInterval(function(){
            obj.style[attr] = pos + arr[num] + &apos;px&apos;;
            num ++;
            if(num === arr.length){
                clearInterval(obj.shaking);
                callback &amp;&amp; callback();
            }
        },50);
    }

    // &#x83B7;&#x53D6;&#x8282;&#x70B9;&#x5BF9;&#x8C61;&#x7684;&#x6837;&#x5F0F;&#x5C5E;&#x6027;&#x503C;
    function getStyle(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return window.getComputedStyle(obj,false)[attr];
        }
    }
&lt;/script&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Made with Thimble<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;style.css&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">img</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span>;
            <span class="hljs-attribute">position</span>:absolute;
            <span class="hljs-attribute">top</span>:<span class="hljs-number">20px</span>;
            <span class="hljs-attribute">left</span>:<span class="hljs-number">150px</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;img1&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://newimg.uumnt.cc:8092/Pics/2017/0622/03/06.jpg&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> oImg = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;img1&apos;</span>);
    oImg.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">//this &#x5230;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x4F5C;&#x7528;&#x57DF;&#x4F1A;&#x53D8;&#xFF0C;&#x8FD9;&#x91CC;&#x8D4B;&#x503C;&#x5148;&#x53D8;&#x6210;&#x5C40;&#x90E8;</span>
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
        shaking(that,<span class="hljs-string">&apos;top&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            shaking(that,<span class="hljs-string">&apos;left&apos;</span>);
        });
    };

    <span class="hljs-comment">// &#x6296;&#x52A8;&#x51FD;&#x6570;&#x5C01;&#x88C5; attr&#xFF1A;left&#x6C34;&#x5E73;&#x6296;&#x52A8; top&#xFF1A;&#x5782;&#x76F4;&#x6296;&#x52A8;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shaking</span>(<span class="hljs-params">obj,attr,callback</span>)</span>{
        <span class="hljs-keyword">var</span> pos = <span class="hljs-built_in">parseInt</span>(getStyle(obj,attr));
        <span class="hljs-keyword">var</span> arr = [];
        <span class="hljs-keyword">var</span> num = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">20</span>;i&gt;<span class="hljs-number">0</span>;i-=<span class="hljs-number">2</span>){
            arr.push(i,-i);
        }
        arr.push(<span class="hljs-number">0</span>);
        clearInterval(obj.shaking);
        obj.shaking = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            obj.style[attr] = pos + arr[num] + <span class="hljs-string">&apos;px&apos;</span>;
            num ++;
            <span class="hljs-keyword">if</span>(num === arr.length){
                clearInterval(obj.shaking);
                callback &amp;&amp; callback();
            }
        },<span class="hljs-number">50</span>);
    }

    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x8282;&#x70B9;&#x5BF9;&#x8C61;&#x7684;&#x6837;&#x5F0F;&#x5C5E;&#x6027;&#x503C;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getStyle</span>(<span class="hljs-params">obj,attr</span>)</span>{
        <span class="hljs-keyword">if</span>(obj.currentStyle){
            <span class="hljs-keyword">return</span> obj.currentStyle[attr];
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.getComputedStyle(obj,<span class="hljs-literal">false</span>)[attr];
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript抖动的实现

## 原文链接
[https://segmentfault.com/a/1190000015993899](https://segmentfault.com/a/1190000015993899)

