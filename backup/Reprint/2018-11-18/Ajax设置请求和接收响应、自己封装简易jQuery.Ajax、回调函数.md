---
title: 'Ajax设置请求和接收响应、自己封装简易jQuery.Ajax、回调函数' 
date: 2018-11-18 3:32:07
hidden: true
slug: gaha65bagt9
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">Ajax&#x8BBE;&#x7F6E;&#x8BF7;&#x6C42;&#x548C;&#x63A5;&#x6536;&#x54CD;&#x5E94;&#x3001;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x7B80;&#x6613;jQuery.Ajax</h1><p>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x662F;&#x627F;&#x63A5;&#x524D;&#x51E0;&#x7BC7;&#x535A;&#x5BA2;&#x7684;,&#x662F;&#x524D;&#x51E0;&#x7BC7;&#x7EE7;&#x7EED;&#x5B66;&#x4E60;<br>&#x5305;&#x62EC;<a href="https://segmentfault.com/a/1190000015832028#articleHeader6">Ajax&#x5B66;&#x4E60;&#x4E0E;&#x7406;&#x89E3;</a>&#x548C;<a href="https://segmentfault.com/a/1190000015050866" target="_blank">&#x7B80;&#x5316;&#x7248;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;jQuery</a>&#x7B49;<br>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x53EA;&#x7B97;&#x662F;&#x6211;&#x7684;&#x4E2A;&#x4EBA;&#x5B66;&#x4E60;&#x7B14;&#x8BB0;,&#x5185;&#x5BB9;&#x6CA1;&#x6709;&#x7CBE;&#x5FC3;&#x6392;&#x7248;,&#x4E00;&#x4E9B;&#x9519;&#x8BEF;&#x8BF7;&#x89C1;&#x8C05;.</p><p>&#x6240;&#x6709;&#x4EE3;&#x7801;&#x90FD;&#x5728;&#x8FD9;&#x91CC;,&#x4ECE;&#x5386;&#x53F2;commit&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6240;&#x6709;&#x4EE3;&#x7801;,&#x6446;&#x9614;&#x4E00;&#x4E2A;&#x7B80;&#x6613;&#x7684;node.js&#x670D;&#x52A1;&#x5668;<br><a href="https://github.com/mtt3366/AjaxStudy" rel="nofollow noreferrer" target="_blank">&#x6240;&#x6709;&#x4EE3;&#x7801;&#x5728;&#x5386;&#x53F2;commit&#x91CC;(AjaxStudy---github)</a></p><h2 id="articleHeader1">1JS&#x8BBE;&#x7F6E;&#x4EFB;&#x610F;&#x8BF7;&#x6C42;</h2><p>&#x4E00;&#x4E2A;http&#x8BF7;&#x6C42;&#x5206;&#x4E3A;&#x56DB;&#x4E2A;&#x90E8;&#x5206;<br>&#x8BF7;&#x6C42;&#x884C;,&#x8BF7;&#x6C42;&#x5934;,&#x56DE;&#x8F66;,&#x8BF7;&#x6C42;&#x4F53;</p><p><a href="https://imgchr.com/i/PBhECR" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/04/PBhECR.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/04/PBhECR.png" alt="PBhECR.png" title="PBhECR.png" style="cursor:pointer;display:inline"></span></a></p><p>&#x8BBE;&#x7F6E;&#x8BF7;&#x6C42;&#x7684;&#x56DB;&#x4E2A;&#x90E8;&#x5206;(&#x7B2C;&#x4E09;&#x90E8;&#x5206;&#x4E3A;&#x56DE;&#x8F66;):</p><ul><li>&#x7B2C;&#x4E00;&#x90E8;&#x5206; <code>request.open(&apos;get&apos;, &apos;/xxx&apos;)</code></li><li>&#x7B2C;&#x4E8C;&#x90E8;&#x5206; <code>request.setRequestHeader(&apos;content-type&apos;,&apos;x-www-form-urlencoded&apos;)</code></li><li>&#x7B2C;&#x56DB;&#x90E8;&#x5206; <code>request.send(&apos;a=1&amp;b=2&apos;)</code></li></ul><p><code>request.setRequestHeader()</code>&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x6B64;&#x65B9;&#x6CD5;&#x5FC5;&#x987B;&#x5728; <code>open()</code> &#x65B9;&#x6CD5;&#x548C; <code>send()</code> &#x4E4B;&#x95F4;&#x8C03;&#x7528;&#x3002;<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/setRequestHeader" rel="nofollow noreferrer" target="_blank">XMLHttpRequest.setRequestHeader()</a></p><p>&#x53E6;&#x5916;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;,&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x897F;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#x4E3A;get &#x5E76;&#x4E14;&#x8BBE;&#x7F6E;&#x4E86;&#x8BF7;&#x6C42;&#x4F53;(&#x7B2C;&#x56DB;&#x90E8;&#x5206;),&#x5728;&#x8C37;&#x6B4C;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x770B;&#x4E0D;&#x5230;&#x8BF7;&#x6C42;&#x4F53;,&#x4E0D;&#x62A5;&#x9519;&#x4F46;&#x662F;&#x4E0D;&#x663E;&#x793A;<br>&#x793A;&#x4F8B;&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myButton.addEventListener(&quot;click&quot;,(e)=&gt;{
    let request = new XMLHttpRequest();
    request.open(&apos;POST&apos;,&apos;/xxx&apos;)//&#x914D;&#x7F6E;request
    //&#x8BBE;&#x7F6E;&#x7B2C;&#x4E8C;&#x90E8;&#x5206;
    request.setRequestHeader(&quot;mataotao&quot;,&quot;123123xxx&quot;)
    request.setRequestHeader(&apos;content-type&apos;,&apos;x-www-form-urlencoded&apos;)
    request.send(&quot;a=1&amp;b=2&quot;);//&#x53D1;&#x9001;&#x8BF7;&#x6C42;

    request.onreadystatechange = ()=&gt;{
        if(request.readyState ===4){
            console.log(&quot;&#x8BF7;&#x6C42;&#x548C;&#x54CD;&#x5E94;&#x90FD;&#x5B8C;&#x6BD5;&#x4E86;&quot;);
            if ( request.status&gt;=200&amp;&amp;request.status&lt;=400){
                console.log(&apos;&#x8BF4;&#x660E;&#x8BF7;&#x6C42;&#x6210;&#x529F;&apos;);
                let string = request.responseText;
                //&#x628A;&#x7B26;&#x5408;json&#x8BED;&#x6CD5;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x5316;&#x4E3A;js&#x5BF9;&#x5E94;&#x7684;&#x503C;
                let object2 = window.JSON.parse(string);
                console.log(object2)
            }else if(request.status&gt;=400){
                console.log(&quot;&#x54CD;&#x5E94;&#x5931;&#x8D25;&quot;);
            }
        } 
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>myButton.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function">(<span class="hljs-params">e</span>)=&gt;</span>{
    <span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
    request.open(<span class="hljs-string">&apos;POST&apos;</span>,<span class="hljs-string">&apos;/xxx&apos;</span>)<span class="hljs-comment">//&#x914D;&#x7F6E;request</span>
    <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x7B2C;&#x4E8C;&#x90E8;&#x5206;</span>
    request.setRequestHeader(<span class="hljs-string">&quot;mataotao&quot;</span>,<span class="hljs-string">&quot;123123xxx&quot;</span>)
    request.setRequestHeader(<span class="hljs-string">&apos;content-type&apos;</span>,<span class="hljs-string">&apos;x-www-form-urlencoded&apos;</span>)
    request.send(<span class="hljs-string">&quot;a=1&amp;b=2&quot;</span>);<span class="hljs-comment">//&#x53D1;&#x9001;&#x8BF7;&#x6C42;</span>

    request.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">if</span>(request.readyState ===<span class="hljs-number">4</span>){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x8BF7;&#x6C42;&#x548C;&#x54CD;&#x5E94;&#x90FD;&#x5B8C;&#x6BD5;&#x4E86;&quot;</span>);
            <span class="hljs-keyword">if</span> ( request.status&gt;=<span class="hljs-number">200</span>&amp;&amp;request.status&lt;=<span class="hljs-number">400</span>){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8BF4;&#x660E;&#x8BF7;&#x6C42;&#x6210;&#x529F;&apos;</span>);
                <span class="hljs-keyword">let</span> <span class="hljs-built_in">string</span> = request.responseText;
                <span class="hljs-comment">//&#x628A;&#x7B26;&#x5408;json&#x8BED;&#x6CD5;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x5316;&#x4E3A;js&#x5BF9;&#x5E94;&#x7684;&#x503C;</span>
                <span class="hljs-keyword">let</span> object2 = <span class="hljs-built_in">window</span>.JSON.parse(<span class="hljs-built_in">string</span>);
                <span class="hljs-built_in">console</span>.log(object2)
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(request.status&gt;=<span class="hljs-number">400</span>){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x54CD;&#x5E94;&#x5931;&#x8D25;&quot;</span>);
            }
        } 
    }
})</code></pre><p>&#x67E5;&#x770B;&#x8BF7;&#x6C42;<br><a href="https://imgchr.com/i/PBhJ2t" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/04/PBhJ2t.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/04/PBhJ2t.png" alt="PBhJ2t.png" title="PBhJ2t.png" style="cursor:pointer"></span></a></p><h2 id="articleHeader2">2JS&#x83B7;&#x53D6;&#x4EFB;&#x610F;&#x54CD;&#x5E94;</h2><p>&#x54CD;&#x5E94;&#x7684;&#x56DB;&#x4E2A;&#x90E8;&#x5206;<br><a href="https://imgchr.com/i/PBTl9J" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/04/PBTl9J.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/04/PBTl9J.png" alt="PBTl9J.png" title="PBTl9J.png" style="cursor:pointer;display:inline"></span></a><br>&#x83B7;&#x53D6;&#x56DB;&#x4E2A;&#x90E8;&#x5206;&#x7684;&#x54CD;&#x5E94;</p><ul><li>&#x7B2C;&#x4E00;&#x90E8;&#x5206; <code>request.status</code> / <code>request.statusText</code></li><li>&#x7B2C;&#x4E8C;&#x90E8;&#x5206; <code>request.getResponseHeader()</code> / <code>request.getAllResponseHeaders()</code></li><li>&#x7B2C;&#x56DB;&#x90E8;&#x5206; <code>request.responseText</code></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myButton.addEventListener(&quot;click&quot;,(e)=&gt;{
    let request = new XMLHttpRequest();
    request.open(&apos;POST&apos;,&apos;/xxx&apos;)//&#x914D;&#x7F6E;request
    //&#x8BBE;&#x7F6E;&#x7B2C;&#x4E8C;&#x90E8;&#x5206;
    request.setRequestHeader(&quot;mataotao&quot;,&quot;123123xxx&quot;)
    request.setRequestHeader(&apos;content-type&apos;,&apos;x-www-form-urlencoded&apos;)
    request.send(&quot;a=1&amp;b=2&quot;);//&#x53D1;&#x9001;&#x8BF7;&#x6C42;

    request.onreadystatechange = ()=&gt;{
        if(request.readyState ===4){
            console.log(&quot;&#x8BF7;&#x6C42;&#x548C;&#x54CD;&#x5E94;&#x90FD;&#x5B8C;&#x6BD5;&#x4E86;&quot;);
            if ( request.status&gt;=200&amp;&amp;request.status&lt;=400){
                console.log(&apos;&#x8BF4;&#x660E;&#x8BF7;&#x6C42;&#x6210;&#x529F;&apos;);

                //*&#x6838;&#x5FC3;&#x4EE3;&#x7801; */
                //&#x7B2C;&#x4E00;&#x90E8;&#x5206;:
                console.log(&quot;&#x83B7;&#x53D6;&#x54CD;&#x5E94;&#x7B2C;&#x4E00;&#x90E8;&#x5206;:&quot;)
                console.log(request.status)//200
                console.log(request.statusText)//ok

                //&#x7B2C;&#x4E8C;&#x90E8;&#x5206;:
                console.log(&quot;&#x83B7;&#x53D6;&#x54CD;&#x5E94;&#x7B2C;&#x4E8C;&#x90E8;&#x5206;:&quot;)
                console.log(request.getResponseHeader(&apos;Content-Type&apos;))
                console.log(request.getAllResponseHeaders())

                //&#x7B2C;&#x56DB;&#x90E8;&#x5206;:
                console.log(&quot;&#x83B7;&#x53D6;&#x54CD;&#x5E94;&#x7B2C;&#x56DB;&#x90E8;&#x5206;:&quot;)
                console.log(request.responseText)
                 //*&#x6838;&#x5FC3;&#x4EE3;&#x7801; */


                let string = request.responseText;
                //&#x628A;&#x7B26;&#x5408;json&#x8BED;&#x6CD5;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x5316;&#x4E3A;js&#x5BF9;&#x5E94;&#x7684;&#x503C;
                let object2 = window.JSON.parse(string);
                // console.log(object2)

            }else if(request.status&gt;=400){
                console.log(&quot;&#x54CD;&#x5E94;&#x5931;&#x8D25;&quot;);
            }
        } 
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>myButton.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function">(<span class="hljs-params">e</span>)=&gt;</span>{
    <span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
    request.open(<span class="hljs-string">&apos;POST&apos;</span>,<span class="hljs-string">&apos;/xxx&apos;</span>)<span class="hljs-comment">//&#x914D;&#x7F6E;request</span>
    <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x7B2C;&#x4E8C;&#x90E8;&#x5206;</span>
    request.setRequestHeader(<span class="hljs-string">&quot;mataotao&quot;</span>,<span class="hljs-string">&quot;123123xxx&quot;</span>)
    request.setRequestHeader(<span class="hljs-string">&apos;content-type&apos;</span>,<span class="hljs-string">&apos;x-www-form-urlencoded&apos;</span>)
    request.send(<span class="hljs-string">&quot;a=1&amp;b=2&quot;</span>);<span class="hljs-comment">//&#x53D1;&#x9001;&#x8BF7;&#x6C42;</span>

    request.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">if</span>(request.readyState ===<span class="hljs-number">4</span>){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x8BF7;&#x6C42;&#x548C;&#x54CD;&#x5E94;&#x90FD;&#x5B8C;&#x6BD5;&#x4E86;&quot;</span>);
            <span class="hljs-keyword">if</span> ( request.status&gt;=<span class="hljs-number">200</span>&amp;&amp;request.status&lt;=<span class="hljs-number">400</span>){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8BF4;&#x660E;&#x8BF7;&#x6C42;&#x6210;&#x529F;&apos;</span>);

                <span class="hljs-comment">//*&#x6838;&#x5FC3;&#x4EE3;&#x7801; */</span>
                <span class="hljs-comment">//&#x7B2C;&#x4E00;&#x90E8;&#x5206;:</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x83B7;&#x53D6;&#x54CD;&#x5E94;&#x7B2C;&#x4E00;&#x90E8;&#x5206;:&quot;</span>)
                <span class="hljs-built_in">console</span>.log(request.status)<span class="hljs-comment">//200</span>
                <span class="hljs-built_in">console</span>.log(request.statusText)<span class="hljs-comment">//ok</span>

                <span class="hljs-comment">//&#x7B2C;&#x4E8C;&#x90E8;&#x5206;:</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x83B7;&#x53D6;&#x54CD;&#x5E94;&#x7B2C;&#x4E8C;&#x90E8;&#x5206;:&quot;</span>)
                <span class="hljs-built_in">console</span>.log(request.getResponseHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>))
                <span class="hljs-built_in">console</span>.log(request.getAllResponseHeaders())

                <span class="hljs-comment">//&#x7B2C;&#x56DB;&#x90E8;&#x5206;:</span>
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x83B7;&#x53D6;&#x54CD;&#x5E94;&#x7B2C;&#x56DB;&#x90E8;&#x5206;:&quot;</span>)
                <span class="hljs-built_in">console</span>.log(request.responseText)
                 <span class="hljs-comment">//*&#x6838;&#x5FC3;&#x4EE3;&#x7801; */</span>


                <span class="hljs-keyword">let</span> <span class="hljs-built_in">string</span> = request.responseText;
                <span class="hljs-comment">//&#x628A;&#x7B26;&#x5408;json&#x8BED;&#x6CD5;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x5316;&#x4E3A;js&#x5BF9;&#x5E94;&#x7684;&#x503C;</span>
                <span class="hljs-keyword">let</span> object2 = <span class="hljs-built_in">window</span>.JSON.parse(<span class="hljs-built_in">string</span>);
                <span class="hljs-comment">// console.log(object2)</span>

            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(request.status&gt;=<span class="hljs-number">400</span>){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x54CD;&#x5E94;&#x5931;&#x8D25;&quot;</span>);
            }
        } 
    }
})</code></pre><p><a href="https://imgchr.com/i/PBTEXq" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/04/PBTEXq.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/04/PBTEXq.png" alt="PBTEXq.png" title="PBTEXq.png" style="cursor:pointer"></span></a></p><h2 id="articleHeader3">3 &#x5BA2;&#x6237;&#x7AEF;/&#x670D;&#x52A1;&#x5668;&#x6A21;&#x578B;</h2><p>&#x5BA2;&#x6237;&#x7AEF;&#x4F7F;&#x7528;js&#x8BBE;&#x7F6E;&#x8BF7;&#x6C42;&#x7684;&#x56DB;&#x4E2A;&#x90E8;&#x5206;,<br>&#x670D;&#x52A1;&#x5668;&#x7528;nodejs&#x4E5F;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x54CD;&#x5E94;&#x7684;&#x56DB;&#x4E2A;&#x90E8;&#x5206;<br><a href="https://imgchr.com/i/PDKjB9" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/05/PDKjB9.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/05/PDKjB9.png" alt="PDKjB9.png" title="PDKjB9.png" style="cursor:pointer"></span></a></p><p><a href="https://imgchr.com/i/PDMDu4" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/05/PDMDu4.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/05/PDMDu4.png" alt="PDMDu4.png" title="PDMDu4.png" style="cursor:pointer"></span></a></p><h3 id="articleHeader4">&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x4E09;&#x6B21;&#x63E1;&#x624B;?</h3><p>&#x4E09;&#x6B21;&#x63E1;&#x624B;:<br>A:&#x6211;&#x80FD;&#x8FDE;&#x4F60;&#x4E86;&#x5417;?<br>B: &#x53EF;&#x4EE5;&#x8FDE;&#x6211;,&#x4F60;&#x8FDE;&#x5427;<br>A:&#x90A3;&#x6211;&#x8FDE;&#x4F60;&#x4E86;<br>&#x5F00;&#x59CB;&#x53D1;&#x9001;&#x6570;&#x636E;</p><p>&#x539F;&#x56E0;:&#x56E0;&#x4E3A;&#x8981;&#x4FDD;&#x8BC1;A/B <strong>&#x90FD;&#x53EF;&#x4EE5;&#x6536;&#x53D1;&#x4FE1;&#x606F;</strong> ,&#x6570;&#x636E;&#x624D;&#x80FD;&#x5728;AB&#x4E4B;&#x95F4;&#x4F20;&#x8F93;</p><p>1.<br>A:&#x6211;&#x80FD;&#x8FDE;&#x4F60;&#x4E86;&#x5417;?<br>B: &#x53EF;&#x4EE5;<br>&#x8BF4;&#x660E;A&#x53EF;&#x4EE5;&#x53D1;&#x4FE1;&#x606F;,B&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4FE1;&#x606F;</p><p>2.<br>B: &#x53EF;&#x4EE5;&#x8FDE;&#x6211;,&#x4F60;&#x8FDE;&#x5427;<br>A:&#x90A3;&#x6211;&#x8FDE;&#x4F60;&#x4E86;<br>&#x8BF4;&#x660E;B&#x53EF;&#x4EE5;&#x53D1;&#x9001;&#x4FE1;&#x606F;,A&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4FE1;&#x606F;</p><h2 id="articleHeader5">3 &#x81EA;&#x5DF1;&#x5C01;&#x88C5;jQuery.Ajax(&#x7B80;&#x5355;&#x539F;&#x7406;)</h2><p><a href="https://github.com/mtt3366/AjaxStudy" rel="nofollow noreferrer" target="_blank">&#x6240;&#x6709;&#x4EE3;&#x7801;&#x5728;&#x5386;&#x53F2;commit&#x91CC;(AjaxStudy---github)</a></p><h3 id="articleHeader6">3.1 &#x65B9;&#x6CD5;&#x4E00;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.jQuery = ()=&gt;{//&#x5047;&#x88C5;&#x6709;&#x4E00;&#x4E2A;&#x7B80;&#x6613;&#x7684;jQuery,&#x5177;&#x4F53;&#x5C01;&#x88C5;
    let object1 = {};
    boject1.addClass = function(){};
    boject1.show = function(){};
    return object1;
}

window.jQuery.ajax = (method,path,body,successFn,failFn)=&gt;{
    let request = new XMLHttpRequest();
    request.open(method,path)
    request.send(body);
    request.onreadystatechange = ()=&gt;{
        if(request.readyState ===4){
            if ( request.status&gt;=200&amp;&amp;request.status&lt;=400){
                successFn.call(undefined,request.responseText)//&#x6267;&#x884C;&#x6210;&#x529F;&#x51FD;&#x6570;
            }else if(request.status&gt;=400){
                failFn.call(undefined,request)//&#x6267;&#x884C;&#x5931;&#x8D25;&#x51FD;&#x6570;
            }
        }
    }
}

window.$ = window.jQuery;
myButton.addEventListener(&quot;click&quot;,(e)=&gt;{
    //&#x4F7F;&#x7528;ajax
    $.ajax(&quot;post&quot;,
           &quot;/xxx&quot;,
           &quot;username=mtt&amp;password=1&quot;,
           function(result){
                console.log(&apos;&#x6210;&#x529F;&#x4E86;,&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x4F53;&#x4E3A;:&apos;)
                console.log(result);//&#x6253;&#x5370;request.responseText
           },
           function(result){
                console.log(result);
                console.log(result.status);//&#x6253;&#x5370;&#x5931;&#x8D25;&#x7684;&#x72B6;&#x6001;&#x7801;
                console.log(result.responseText);//&#x6253;&#x5370;&#x5931;&#x8D25;&#x65F6;&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x4F53;
                
           }
)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.jQuery = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-comment">//&#x5047;&#x88C5;&#x6709;&#x4E00;&#x4E2A;&#x7B80;&#x6613;&#x7684;jQuery,&#x5177;&#x4F53;&#x5C01;&#x88C5;</span>
    <span class="hljs-keyword">let</span> object1 = {};
    boject1.addClass = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
    boject1.show = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
    <span class="hljs-keyword">return</span> object1;
}

<span class="hljs-built_in">window</span>.jQuery.ajax = <span class="hljs-function">(<span class="hljs-params">method,path,body,successFn,failFn</span>)=&gt;</span>{
    <span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
    request.open(method,path)
    request.send(body);
    request.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">if</span>(request.readyState ===<span class="hljs-number">4</span>){
            <span class="hljs-keyword">if</span> ( request.status&gt;=<span class="hljs-number">200</span>&amp;&amp;request.status&lt;=<span class="hljs-number">400</span>){
                successFn.call(<span class="hljs-literal">undefined</span>,request.responseText)<span class="hljs-comment">//&#x6267;&#x884C;&#x6210;&#x529F;&#x51FD;&#x6570;</span>
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(request.status&gt;=<span class="hljs-number">400</span>){
                failFn.call(<span class="hljs-literal">undefined</span>,request)<span class="hljs-comment">//&#x6267;&#x884C;&#x5931;&#x8D25;&#x51FD;&#x6570;</span>
            }
        }
    }
}

<span class="hljs-built_in">window</span>.$ = <span class="hljs-built_in">window</span>.jQuery;
myButton.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,(e)=&gt;{
    <span class="hljs-comment">//&#x4F7F;&#x7528;ajax</span>
    $.ajax(<span class="hljs-string">&quot;post&quot;</span>,
           <span class="hljs-string">&quot;/xxx&quot;</span>,
           <span class="hljs-string">&quot;username=mtt&amp;password=1&quot;</span>,
           <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6210;&#x529F;&#x4E86;,&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x4F53;&#x4E3A;:&apos;</span>)
                <span class="hljs-built_in">console</span>.log(result);<span class="hljs-comment">//&#x6253;&#x5370;request.responseText</span>
           },
           <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>)</span>{
                <span class="hljs-built_in">console</span>.log(result);
                <span class="hljs-built_in">console</span>.log(result.status);<span class="hljs-comment">//&#x6253;&#x5370;&#x5931;&#x8D25;&#x7684;&#x72B6;&#x6001;&#x7801;</span>
                <span class="hljs-built_in">console</span>.log(result.responseText);<span class="hljs-comment">//&#x6253;&#x5370;&#x5931;&#x8D25;&#x65F6;&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x4F53;</span>
                
           }
)
})</code></pre><p>&#x7ED3;&#x679C;:<br>&#x6210;&#x529F;&#x65F6;:<br><a href="https://imgchr.com/i/PDgT5n" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/05/PDgT5n.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/05/PDgT5n.png" alt="PDgT5n.png" title="PDgT5n.png" style="cursor:pointer"></span></a></p><p><a href="https://imgchr.com/i/PDgb80" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/05/PDgb80.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/05/PDgb80.png" alt="PDgb80.png" title="PDgb80.png" style="cursor:pointer"></span></a></p><p>&#x5931;&#x8D25;&#x65F6;:(&#x5047;&#x5982;&#x8BF7;&#x6C42;&#x4E00;&#x4E2A;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x8DEF;&#x5F84;,&#x54CD;&#x5E94;&#x72B6;&#x6001;&#x7801;&#x662F;404,<strong>&#x4F46;&#x662F;&#x4E5F;&#x6709;&#x54CD;&#x5E94;&#x4F53;</strong>responseText)</p><p>&#x4F8B;&#x5982;,&#x8BBF;&#x95EE;&#x4E00;&#x4E2A;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x8DEF;&#x5F84;/frank:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myButton.addEventListener(&quot;click&quot;,(e)=&gt;{
    //&#x4F7F;&#x7528;ajax
    $.ajax(&quot;post&quot;,
           &quot;/frank&quot;,
           &quot;username=mtt&amp;password=1&quot;,
           function(result){
                console.log(&apos;&#x6210;&#x529F;&#x4E86;,&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x4F53;&#x4E3A;:&apos;)
                console.log(result);//&#x6253;&#x5370;request.responseText
           },
           function(result){
                console.log(result);
                console.log(result.status);//&#x6253;&#x5370;&#x5931;&#x8D25;&#x7684;&#x72B6;&#x6001;&#x7801;
                console.log(result.responseText);//&#x6253;&#x5370;&#x5931;&#x8D25;&#x65F6;&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x4F53;
                
           }
)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>myButton.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,(e)=&gt;{
    <span class="hljs-comment">//&#x4F7F;&#x7528;ajax</span>
    $.ajax(<span class="hljs-string">&quot;post&quot;</span>,
           <span class="hljs-string">&quot;/frank&quot;</span>,
           <span class="hljs-string">&quot;username=mtt&amp;password=1&quot;</span>,
           <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>)</span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6210;&#x529F;&#x4E86;,&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x4F53;&#x4E3A;:&apos;</span>)
                <span class="hljs-built_in">console</span>.log(result);<span class="hljs-comment">//&#x6253;&#x5370;request.responseText</span>
           },
           <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>)</span>{
                <span class="hljs-built_in">console</span>.log(result);
                <span class="hljs-built_in">console</span>.log(result.status);<span class="hljs-comment">//&#x6253;&#x5370;&#x5931;&#x8D25;&#x7684;&#x72B6;&#x6001;&#x7801;</span>
                <span class="hljs-built_in">console</span>.log(result.responseText);<span class="hljs-comment">//&#x6253;&#x5370;&#x5931;&#x8D25;&#x65F6;&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x4F53;</span>
                
           }
)
})</code></pre><p>&#x8FD4;&#x56DE;&#x72B6;&#x6001;&#x7801;404,&#x800C;&#x4E14;&#x6709;&#x8BBE;&#x7F6E;&#x7684;&#x8FD4;&#x56DE;&#x4F53;<br><a href="https://imgchr.com/i/PDWinO" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/05/PDWinO.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/05/PDWinO.png" alt="PDWinO.png" title="PDWinO.png" style="cursor:pointer;display:inline"></span></a><br>&#x56E0;&#x4E3A;&#x6211;&#x7684;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x7684;&#x4EE3;&#x7801;&#x4E3A;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="else {
    response.statusCode = 404
    response.setHeader(&apos;Content-Type&apos;, &apos;text/html;charset=utf-8&apos;)
    response.write(`{
      &quot;error&quot;:&quot;404error&quot;
    }`)
    response.end()
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vbscript"><code><span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">response</span>.statusCode = <span class="hljs-number">404</span>
    <span class="hljs-built_in">response</span>.setHeader(<span class="hljs-comment">&apos;Content-Type&apos;, &apos;text/html;charset=utf-8&apos;)</span>
    <span class="hljs-built_in">response</span>.write(`{
      <span class="hljs-string">&quot;error&quot;</span>:<span class="hljs-string">&quot;404error&quot;</span>
    }`)
    <span class="hljs-built_in">response</span>.<span class="hljs-keyword">end</span>()
  }</code></pre><p>&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x7684;&#x7F3A;&#x70B9;:&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5FC5;&#x987B;&#x6309;&#x7167;&#x89C4;&#x5B9A;&#x7684;&#x987A;&#x5E8F;&#x4F20;&#x53C2;,&#x7B2C;&#x4E8C;,&#x5982;&#x679C;&#x6CA1;&#x6709;&#x53C2;&#x6570;&#x5C31;&#x4F1A;&#x51FA;&#x73B0;&#x7C7B;&#x4F3C;&#x4E8E;<code>$.ajax(&quot;post&quot;,null,successFn,null)</code>&#x7684;&#x60C5;&#x51B5;,&#x5FC5;&#x987B;<strong>&#x4F20;&#x6709;&#x7ED3;&#x6784;&#x7684;&#x53C2;&#x6570;</strong>(&#x5BF9;&#x8C61;)</p><h3 id="articleHeader7">3.2&#x4EC0;&#x4E48;&#x662F;&#x56DE;&#x8C03;</h3><p>&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;,&#x5728;<code>ajax</code>&#x51FD;&#x6570;&#x4E2D;&#x4F20;&#x4E86;&#x4E00;&#x4E2A;<code>successFN</code>,<code>failFn</code>&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;,&#x4F46;&#x662F;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#x662F;&#x5728;&#x522B;&#x7684;&#x5730;&#x65B9;&#x6267;&#x884C;&#x7684;(&#x5728;<code>request.onreadystatechange</code>&#x91CC;)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" if(request.readyState ===4){
            if ( request.status&gt;=200&amp;&amp;request.status&lt;=400){
                successFn.call(undefined,request.responseText)//&#x6267;&#x884C;&#x6210;&#x529F;&#x51FD;&#x6570;
            }else if(request.status&gt;=400){
                failFn.call(undefined,request)//&#x6267;&#x884C;&#x5931;&#x8D25;&#x51FD;&#x6570;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs fortran"><code> <span class="hljs-keyword">if</span>(request.readyState ===<span class="hljs-number">4</span>){
            <span class="hljs-keyword">if</span> ( request.<span class="hljs-keyword">status</span>&gt;=<span class="hljs-number">200</span>&amp;&amp;request.<span class="hljs-keyword">status</span>&lt;=<span class="hljs-number">400</span>){
                successFn.<span class="hljs-keyword">call</span>(undefined,request.responseText)//&#x6267;&#x884C;&#x6210;&#x529F;&#x51FD;&#x6570;
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(request.<span class="hljs-keyword">status</span>&gt;=<span class="hljs-number">400</span>){
                failFn.<span class="hljs-keyword">call</span>(undefined,request)//&#x6267;&#x884C;&#x5931;&#x8D25;&#x51FD;&#x6570;</code></pre><p>&#x8FD9;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#x5C31;&#x662F;<strong>&#x56DE;&#x8C03;&#x51FD;&#x6570;</strong></p><p>&#x56DE;&#x8C03;(callback):<br>&#x56DE;&#x6765;&#x6267;&#x884C;&#x7684;&#x610F;&#x601D;,&#x81EA;&#x5DF1;&#x4E0D;call.<br>&#x628A;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7ED9;&#x522B;&#x4EBA;,&#x81EA;&#x5DF1;&#x4E0D;&#x6267;&#x884C;,&#x8BA9;&#x522B;&#x4EBA;&#x6267;&#x884C;,&#x5C31;&#x662F;callback</p><p>&#x56DE;&#x8C03;:&#x4F7F;&#x7528;&#x65B9;&#x4EE3;&#x7801;&#x4E0D;&#x6267;&#x884C;,&#x53EA;&#x4F20;&#x4E00;&#x4E2A;&#x51FD;&#x6570;,&#x56DE;&#x6765;&#x518D;&#x6267;&#x884C;</p><p>&#x56DE;&#x8C03;&#x5C31;&#x662F;&#x4F20;&#x4E00;&#x4E2A;&#x51FD;&#x6570;,&#x81EA;&#x5DF1;&#x4E0D;&#x6267;&#x884C;,&#x4F20;&#x5230;&#x522B;&#x7684;&#x5730;&#x65B9;&#x8BA9;&#x4ED6;&#x5728;&#x90A3;&#x91CC;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;!&#x53EA;&#x8981;&#x6EE1;&#x8DB3;&#x8FD9;&#x4E2A;&#x6761;&#x4EF6;&#x5C31;&#x53EB;&#x56DE;&#x8C03;&#x800C;&#x5DF2;.&#x4ED6;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;,&#x53EA;&#x4E0D;&#x8FC7;&#x5728;&#x522B;&#x7684;&#x5730;&#x65B9;&#x6267;&#x884C;&#x4E86;</p><p>&#x6240;&#x4EE5;&#x770B;&#x4E0A;&#x53BB;&#x6CA1;&#x6709;&#x6267;&#x884C;,&#x5B9E;&#x9645;&#x4E0A;success&#x4E86;&#x5C31;&#x6267;&#x884C;&#x4F20;&#x8FDB;&#x53BB;&#x7684;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;</p><h3 id="articleHeader8">3.3&#x5C01;&#x88C5;&#x65B9;&#x6CD5;&#x4E8C;:&#x4F20;&#x6709;&#x7ED3;&#x6784;&#x7684;&#x53C2;&#x6570;(&#x5BF9;&#x8C61;)</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myButton = document.getElementById(&apos;myButton&apos;);

window.jQuery = ()=&gt;{//&#x5047;&#x88C5;&#x6709;&#x4E00;&#x4E2A;&#x7B80;&#x6613;&#x7684;jQuery
    let object1 = {};
    boject1.addClass = function(){};
    boject1.show = function(){};
    return object1;
}

window.jQuery.ajax = (options)=&gt;{
    //&#x83B7;&#x53D6;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x5BF9;&#x8C61;&#x7684;value
    let method = options.method;
    let path = options.path;
    let body = options.body;
    let successFn = options.successFn;
    let failFn = options.failFn;
    let headers = options.headers;

    let request = new XMLHttpRequest();
    request.open(method,path);//&#x914D;&#x7F6E;

    for (const key in headers) {//&#x904D;&#x5386;header,&#x8BBE;&#x7F6E;&#x54CD;&#x5E94;&#x5934;
        let value = headers[key];
        request.setRequestHeader(key,value);
    }
    request.send(body);//&#x53D1;&#x9001;,&#x5E76;&#x914D;&#x7F6E;&#x54CD;&#x5E94;&#x4F53;

    request.onreadystatechange = ()=&gt;{
        if(request.readyState ===4){
            if ( request.status&gt;=200&amp;&amp;request.status&lt;=400){
                successFn.call(undefined,request.responseText);//&#x6267;&#x884C;&#x6210;&#x529F;&#x51FD;&#x6570;
            }else if(request.status&gt;=400){
                failFn.call(undefined,request);//&#x6267;&#x884C;&#x5931;&#x8D25;&#x51FD;&#x6570;
            }
        }
    }
}

window.$ = window.jQuery;
myButton.addEventListener(&quot;click&quot;,(e)=&gt;{
    //&#x4F7F;&#x7528;ajax
    $.ajax({
        method:&quot;post&quot;,
        path:&quot;/xxx&quot;,
        body:&quot;username=mtt&amp;password=1&quot;,
        headers:{
            &quot;content-type&quot;:&apos;application/x-www-form-urlencoded&apos;,
            &quot;mataotao&quot;:18
        },
        successFn:function(result){//&#x6210;&#x529F;&#x51FD;&#x6570;&#x7684;&#x56DE;&#x8C03;
            console.log(&apos;&#x6210;&#x529F;&#x4E86;,&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x4F53;&#x4E3A;:&apos;);
            console.log(result);//&#x6253;&#x5370;request.responseTex
        },
        failFn:function(){
            console.log(result);
            console.log(result.status);//&#x6253;&#x5370;&#x5931;&#x8D25;&#x7684;&#x72B6;&#x6001;&#x7801;
            console.log(result.responseText);//&#x6253;&#x5370;&#x5931;&#x8D25;&#x65F6;&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x4F53;
        }
    }
)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> myButton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;myButton&apos;</span>);

<span class="hljs-built_in">window</span>.jQuery = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-comment">//&#x5047;&#x88C5;&#x6709;&#x4E00;&#x4E2A;&#x7B80;&#x6613;&#x7684;jQuery</span>
    <span class="hljs-keyword">let</span> object1 = {};
    boject1.addClass = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
    boject1.show = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
    <span class="hljs-keyword">return</span> object1;
}

<span class="hljs-built_in">window</span>.jQuery.ajax = <span class="hljs-function">(<span class="hljs-params">options</span>)=&gt;</span>{
    <span class="hljs-comment">//&#x83B7;&#x53D6;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x5BF9;&#x8C61;&#x7684;value</span>
    <span class="hljs-keyword">let</span> method = options.method;
    <span class="hljs-keyword">let</span> path = options.path;
    <span class="hljs-keyword">let</span> body = options.body;
    <span class="hljs-keyword">let</span> successFn = options.successFn;
    <span class="hljs-keyword">let</span> failFn = options.failFn;
    <span class="hljs-keyword">let</span> headers = options.headers;

    <span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
    request.open(method,path);<span class="hljs-comment">//&#x914D;&#x7F6E;</span>

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> key <span class="hljs-keyword">in</span> headers) {<span class="hljs-comment">//&#x904D;&#x5386;header,&#x8BBE;&#x7F6E;&#x54CD;&#x5E94;&#x5934;</span>
        <span class="hljs-keyword">let</span> value = headers[key];
        request.setRequestHeader(key,value);
    }
    request.send(body);<span class="hljs-comment">//&#x53D1;&#x9001;,&#x5E76;&#x914D;&#x7F6E;&#x54CD;&#x5E94;&#x4F53;</span>

    request.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">if</span>(request.readyState ===<span class="hljs-number">4</span>){
            <span class="hljs-keyword">if</span> ( request.status&gt;=<span class="hljs-number">200</span>&amp;&amp;request.status&lt;=<span class="hljs-number">400</span>){
                successFn.call(<span class="hljs-literal">undefined</span>,request.responseText);<span class="hljs-comment">//&#x6267;&#x884C;&#x6210;&#x529F;&#x51FD;&#x6570;</span>
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(request.status&gt;=<span class="hljs-number">400</span>){
                failFn.call(<span class="hljs-literal">undefined</span>,request);<span class="hljs-comment">//&#x6267;&#x884C;&#x5931;&#x8D25;&#x51FD;&#x6570;</span>
            }
        }
    }
}

<span class="hljs-built_in">window</span>.$ = <span class="hljs-built_in">window</span>.jQuery;
myButton.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,(e)=&gt;{
    <span class="hljs-comment">//&#x4F7F;&#x7528;ajax</span>
    $.ajax({
        <span class="hljs-attr">method</span>:<span class="hljs-string">&quot;post&quot;</span>,
        <span class="hljs-attr">path</span>:<span class="hljs-string">&quot;/xxx&quot;</span>,
        <span class="hljs-attr">body</span>:<span class="hljs-string">&quot;username=mtt&amp;password=1&quot;</span>,
        <span class="hljs-attr">headers</span>:{
            <span class="hljs-string">&quot;content-type&quot;</span>:<span class="hljs-string">&apos;application/x-www-form-urlencoded&apos;</span>,
            <span class="hljs-string">&quot;mataotao&quot;</span>:<span class="hljs-number">18</span>
        },
        <span class="hljs-attr">successFn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>)</span>{<span class="hljs-comment">//&#x6210;&#x529F;&#x51FD;&#x6570;&#x7684;&#x56DE;&#x8C03;</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6210;&#x529F;&#x4E86;,&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x4F53;&#x4E3A;:&apos;</span>);
            <span class="hljs-built_in">console</span>.log(result);<span class="hljs-comment">//&#x6253;&#x5370;request.responseTex</span>
        },
        <span class="hljs-attr">failFn</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(result);
            <span class="hljs-built_in">console</span>.log(result.status);<span class="hljs-comment">//&#x6253;&#x5370;&#x5931;&#x8D25;&#x7684;&#x72B6;&#x6001;&#x7801;</span>
            <span class="hljs-built_in">console</span>.log(result.responseText);<span class="hljs-comment">//&#x6253;&#x5370;&#x5931;&#x8D25;&#x65F6;&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x4F53;</span>
        }
    }
)
})</code></pre><p>&#x7ED3;&#x679C;:</p><p><a href="https://imgchr.com/i/PD4lDK" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/05/PD4lDK.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/05/PD4lDK.png" alt="PD4lDK.png" title="PD4lDK.png" style="cursor:pointer"></span></a></p><p><a href="https://imgchr.com/i/PD4Qu6" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/05/PD4Qu6.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/05/PD4Qu6.png" alt="PD4Qu6.png" title="PD4Qu6.png" style="cursor:pointer"></span></a></p><h2 id="articleHeader9">4&#x771F;&#x6B63;&#x7684;jQuery.ajax()API&#x5982;&#x4F55;&#x4F7F;&#x7528;</h2><p><a href="https://www.jquery123.com/jQuery.ajax/" rel="nofollow noreferrer" target="_blank">jQuery.ajax()API</a><br>&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
  type: &quot;GET&quot;,
  url: &quot;/test&quot;,
  dataType: &quot;script&quot;,
  data:{}
  success:function(){},
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs accesslog"><code>$.ajax({
  type: <span class="hljs-string">&quot;<span class="hljs-keyword">GET</span>&quot;</span>,
  url: <span class="hljs-string">&quot;/test&quot;</span>,
  dataType: <span class="hljs-string">&quot;script&quot;</span>,
  data:{}
  success:function(){},
});</code></pre><p><code>dataType</code>&#x5C31;&#x662F;<code>setRequestHeader(&quot;content-type&quot;,&quot;application/javascript&quot;)</code></p><p><code>data</code>&#x5C31;&#x662F;&#x8BF7;&#x6C42;&#x7684;&#x7B2C;&#x56DB;&#x90E8;&#x5206;</p><h2 id="articleHeader10">5&#x51FD;&#x6570;&#x4F20;&#x4E0D;&#x540C;&#x7684;&#x53C2;&#x6570;</h2><p>&#x4F8B;&#x5982;&#x6587;&#x6863;&#x91CC;&#x7684;<br><code>jQuery.ajax( url [, settings ] )</code></p><p><code>jQuery.ajax( [settings ] )</code><br><code>jQuery.ajax</code>&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x65E2;&#x53EF;&#x4EE5;&#x662F;url&#x5B57;&#x7B26;&#x4E32;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x5BF9;&#x8C61;<br>&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x8FD9;&#x79CD;&#x5C01;&#x88C5;?<br>&#x53EA;&#x8981;&#x5728;&#x6700;&#x5F00;&#x59CB;&#x5224;&#x65AD;&#x53C2;&#x6570;&#x957F;&#x5EA6;&#x5373;&#x53EF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let url;
    if(arguments.length===1){//&#x53C2;&#x6570;&#x957F;&#x5EA6;&#x4E3A;1
        url = options.url;
    }else if(arguments.length===2){//&#x53C2;&#x6570;&#x957F;&#x5EA6;&#x4E3A;2
        url = arguments[0];
        options = arguments[1];
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-keyword">let</span> <span class="hljs-built_in">url</span>;
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">arguments</span>.length===<span class="hljs-number">1</span>){<span class="hljs-comment">//&#x53C2;&#x6570;&#x957F;&#x5EA6;&#x4E3A;1</span>
        <span class="hljs-built_in">url</span> = options.url;
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">arguments</span>.length===<span class="hljs-number">2</span>){<span class="hljs-comment">//&#x53C2;&#x6570;&#x957F;&#x5EA6;&#x4E3A;2</span>
        <span class="hljs-built_in">url</span> = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];
        options = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>];
    }</code></pre><p>&#x5176;&#x4F59;&#x4EE3;&#x7801;&#x4E0D;&#x53D8;<br><a href="https://imgchr.com/i/PDI1te" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/05/PDI1te.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/05/PDI1te.png" alt="PDI1te.png" title="PDI1te.png" style="cursor:pointer"></span></a></p><h2 id="articleHeader11">6 &#x4E00;&#x70B9;&#x70B9;ES6&#x8BED;&#x6CD5;:&#x89E3;&#x6784;&#x8D4B;&#x503C;</h2><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment" rel="nofollow noreferrer" target="_blank">&#x89E3;&#x6784;&#x8D4B;&#x503C;MDN</a><br><a href="https://imgchr.com/i/PrVD58" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="https://s1.ax1x.com/2018/08/06/PrVD58.png" src="https://static.alili.techhttps://s1.ax1x.com/2018/08/06/PrVD58.png" alt="PrVD58.png" title="PrVD58.png" style="cursor:pointer"></span></a><br>&#x6216;&#x8005;&#x76F4;&#x63A5;</p><p><span class="img-wrap"><img data-src="/img/bVbeSL2" src="https://static.alili.tech/img/bVbeSL2" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ajax设置请求和接收响应、自己封装简易jQuery.Ajax、回调函数

## 原文链接
[https://segmentfault.com/a/1190000015893956](https://segmentfault.com/a/1190000015893956)

