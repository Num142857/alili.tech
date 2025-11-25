---
title: '同源策略与CORS跨域' 
date: 2018-11-19 2:32:04
hidden: true
slug: q90mug6n0s
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x540C;&#x6E90;&#x7B56;&#x7565;&#x4E0E;CORS&#x8DE8;&#x57DF;</h1><p>PS:&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x662F;&#x7D27;&#x63A5;&#x7740;<a href="https://segmentfault.com/a/1190000015803952">JSONP&#x539F;&#x7406;</a>&#x548C;<a href="https://segmentfault.com/a/1190000015832028#articleHeader6" target="_blank">Ajax&#x5B66;&#x4E60;&#x4E0E;&#x7406;&#x89E3;</a>&#x5199;&#x7684;,&#x6709;&#x4E9B;&#x5185;&#x5BB9;&#x662F;&#x627F;&#x63A5;&#x4E86;&#x4E0A;&#x4E24;&#x7BC7;&#x6587;&#x7AE0;.<br>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x53EA;&#x7B97;&#x662F;&#x6211;&#x7684;&#x4E2A;&#x4EBA;&#x5B66;&#x4E60;&#x7B14;&#x8BB0;,&#x5185;&#x5BB9;&#x6CA1;&#x6709;&#x7ECF;&#x8FC7;&#x7CBE;&#x5FC3;&#x6392;&#x7248;,&#x4E5F;&#x6CA1;&#x6709;&#x8BA4;&#x771F;&#x6821;&#x5BF9;&#x683C;&#x5F0F;,&#x4E00;&#x4E9B;&#x9519;&#x8BEF;&#x8BF7;&#x89C1;&#x8C05;.</p><p>&#x7528; form , a,img,link,script.&#x90FD;&#x53EF;&#x4EE5;&#x8DE8;&#x57DF;&#x53D1;&#x9001;&#x8BF7;&#x6C42;<br>&#x4F46;&#x662F;!<br>&#x540C;&#x6E90;&#x7B56;&#x7565;:<strong>&#x53EA;&#x6709; &#x534F;&#x8BAE;+&#x7AEF;&#x53E3;+&#x57DF;&#x540D; &#x4E00;&#x6A21;&#x4E00;&#x6837;&#x624D;&#x5141;&#x8BB8;&#x53D1; AJAX &#x8BF7;&#x6C42;</strong>.<br>&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x5411;baidu.com&#x53D1;&#x9001;Ajax&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;<br><a href="https://imgchr.com/i/PdzFgg" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015836669?w=1002&amp;h=968" src="https://static.alili.tech/img/remote/1460000015836669?w=1002&amp;h=968" alt="PdzFgg.png" title="PdzFgg.png" style="cursor:pointer;display:inline"></span></a></p><p><a href="https://imgchr.com/i/PdzVDs" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015836670?w=2075&amp;h=240" src="https://static.alili.tech/img/remote/1460000015836670?w=2075&amp;h=240" alt="PdzVDs.png" title="PdzVDs.png" style="cursor:pointer"></span></a><br>&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x4E86;,&#x4F46;&#x662F;&#x62A5;&#x4E86;&#x4E00;&#x4E2A;&#x9519;<br><a href="https://imgchr.com/i/PdzmEq" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015836671?w=2014&amp;h=166" src="https://static.alili.tech/img/remote/1460000015836671?w=2014&amp;h=166" alt="PdzmEq.png" title="PdzmEq.png" style="cursor:pointer;display:inline"></span></a><br>&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x4E86;,<br><strong>&#x6240;&#x4EE5;,&#x8BF7;&#x6C42;&#x53D1;&#x9001;&#x51FA;&#x53BB;&#x4E86;,&#x4F46;&#x662F;&#x62FF;&#x4E0D;&#x5230;&#x54CD;&#x5E94;!</strong></p><h2 id="articleHeader1">&#x540C;&#x6E90;&#x7B56;&#x7565;</h2><p>&#x53EA;&#x6709; &#x534F;&#x8BAE;+&#x7AEF;&#x53E3;+&#x57DF;&#x540D; &#x4E00;&#x6A21;&#x4E00;&#x6837;&#x624D;&#x5141;&#x8BB8;&#x53D1; <strong>AJAX &#x8BF7;&#x6C42;</strong></p><p>&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x4E00;&#x6A21;&#x4E00;&#x6837;</p><p><a href="http://baidu.com" rel="nofollow noreferrer" target="_blank">http://baidu.com</a> &#x53EF;&#x4EE5;&#x5411; <a href="http://www.baidu.com" rel="nofollow noreferrer" target="_blank">http://www.baidu.com</a> &#x53D1; AJAX &#x8BF7;&#x6C42;&#x5417; no<br><a href="http://baidu.com" rel="nofollow noreferrer" target="_blank">http://baidu.com</a>:80 &#x53EF;&#x4EE5;&#x5411; <a href="http://baidu.com" rel="nofollow noreferrer" target="_blank">http://baidu.com</a>:81 &#x53D1; AJAX &#x8BF7;&#x6C42;&#x5417; no<br>&#x6D4F;&#x89C8;&#x5668;&#x5FC5;&#x987B;&#x4FDD;&#x8BC1;<br>&#x53EA;&#x6709; &#x534F;&#x8BAE;+&#x7AEF;&#x53E3;+&#x57DF;&#x540D; &#x4E00;&#x6A21;&#x4E00;&#x6837;&#x624D;&#x5141;&#x8BB8;&#x53D1; AJAX &#x8BF7;&#x6C42;</p><h3 id="articleHeader2">&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x6709;&#x540C;&#x6E90;&#x7B56;&#x7565;?</h3><p><a href="https://www.zhihu.com/question/31592553/answer/190789780" rel="nofollow noreferrer" target="_blank">&#x4E3A;&#x4EC0;&#x4E48;form&#x8868;&#x5355;&#x63D0;&#x4EA4;&#x6CA1;&#x6709;&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#xFF0C;&#x4F46;ajax&#x63D0;&#x4EA4;&#x6709;&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#xFF1F; - &#x65B9;&#x5E94;&#x676D;&#x7684;&#x56DE;&#x7B54; - &#x77E5;&#x4E4E;</a></p><blockquote>&#x56E0;&#x4E3A;&#x539F;&#x9875;&#x9762;&#x7528; form &#x63D0;&#x4EA4;&#x5230;&#x53E6;&#x4E00;&#x4E2A;&#x57DF;&#x540D;&#x4E4B;&#x540E;&#xFF0C;&#x539F;&#x9875;&#x9762;&#x7684;&#x811A;&#x672C;&#x65E0;&#x6CD5;&#x83B7;&#x53D6;&#x65B0;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x6240;&#x4EE5;&#x6D4F;&#x89C8;&#x5668;&#x8BA4;&#x4E3A;&#x8FD9;&#x662F;&#x5B89;&#x5168;&#x7684;&#x3002;&#x800C; AJAX &#x662F;&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x54CD;&#x5E94;&#x5185;&#x5BB9;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x80FD;&#x5141;&#x8BB8;&#x4F60;&#x8FD9;&#x6837;&#x505A;&#x3002;&#x5982;&#x679C;&#x4F60;&#x7EC6;&#x5FC3;&#x7684;&#x8BDD;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x5176;&#x5B9E;&#x8BF7;&#x6C42;&#x5DF2;&#x7ECF;&#x53D1;&#x9001;&#x51FA;&#x53BB;&#x4E86;&#xFF0C;&#x4F60;&#x53EA;&#x662F;&#x62FF;&#x4E0D;&#x5230;&#x54CD;&#x5E94;&#x800C;&#x5DF2;&#x3002;&#x6240;&#x4EE5;&#x6D4F;&#x89C8;&#x5668;&#x8FD9;&#x4E2A;&#x7B56;&#x7565;&#x7684;&#x672C;&#x8D28;&#x662F;&#xFF0C;&#x4E00;&#x4E2A;&#x57DF;&#x540D;&#x7684; JS &#xFF0C;&#x5728;&#x672A;&#x7ECF;&#x5141;&#x8BB8;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4E0D;&#x5F97;&#x8BFB;&#x53D6;&#x53E6;&#x4E00;&#x4E2A;&#x57DF;&#x540D;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x4F46;&#x6D4F;&#x89C8;&#x5668;&#x5E76;&#x4E0D;&#x963B;&#x6B62;&#x4F60;&#x5411;&#x53E6;&#x4E00;&#x4E2A;&#x57DF;&#x540D;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x3002;</blockquote><p>&#x7B80;&#x5355;&#x5730;&#x8BF4;&#x5C31;&#x662F;&#x4F7F;&#x7528;form&#x53D1;&#x9001;&#x8BF7;&#x6C42;,&#x5C31;&#x4F1A;&#x5237;&#x65B0;&#x9875;&#x9762;,&#x6240;&#x4EE5;&#x539F;&#x9875;&#x9762;&#x6CA1;&#x6709;&#x4E86;,&#x5C31;&#x8BA4;&#x4E3A;&#x662F;&#x5B89;&#x5168;&#x7684;.&#x4F46;&#x662F;Ajax&#x53EF;&#x4EE5;&#x5427;&#x54CD;&#x5E94;&#x5185;&#x5BB9;&#x8BFB;&#x53D6;&#x4E86;.&#x5E76;&#x4E14;&#x663E;&#x793A;&#x5728;&#x672C;&#x9875;&#x9762;&#x4E0A;.&#x51FA;&#x73B0;&#x5B89;&#x5168;&#x6027;&#x95EE;&#x9898;</p><p>&#x5982;&#x679C;&#x6CA1;&#x6709;&#x540C;&#x6E90;&#x7B56;&#x7565;,&#x90A3;&#x4E48;&#x4EFB;&#x4F55;&#x7F51;&#x7AD9;&#x90FD;&#x53EF;&#x4EE5;&#x8BFB;&#x53D6;&#x522B;&#x4EBA;&#x7684;&#x652F;&#x4ED8;&#x5B9D;&#x4F59;&#x989D;&#x7B49;&#x7B49;</p><h2 id="articleHeader3">CORS &#x8DE8;&#x57DF;</h2><p>&#x9664;&#x4E86;&#x7528;jsonp&#x4E4B;&#x5916;,&#x53EF;&#x4EE5;&#x7528;CORS</p><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x7528;&#x4E24;&#x4E2A;&#x7F51;&#x7AD9;&#x6765;&#x6A21;&#x62DF;Ajax&#x8DE8;&#x57DF;&#x5E76;&#x4E14;&#x89E3;&#x51B3;&#x8DE8;&#x57DF;&#x95EE;&#x9898;</p><p>&#x5148;&#x5199;&#x524D;&#x7AEF;&#x7684;Ajax&#x8BF7;&#x6C42;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myButton = document.getElementById(&apos;myButton&apos;);
myButton.addEventListener(&quot;click&quot;,(e)=&gt;{
    let request = new XMLHttpRequest();
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
    request.open(&apos;GET&apos;,&apos;http://jack.com:8002/xxx&apos;)//&#x914D;&#x7F6E;request.&#x8BF7;&#x6C42;&#x7684;&#x8DEF;&#x5F84;&#x4E3A;&#x7B2C;&#x4E8C;&#x4E2A;&#x7F51;&#x7AD9;&#x7684;8002&#x7AEF;&#x53E3;
    request.send();//&#x53D1;&#x9001;&#x8BF7;&#x6C42;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> myButton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;myButton&apos;</span>);
myButton.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function">(<span class="hljs-params">e</span>)=&gt;</span>{
    <span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
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
    request.open(<span class="hljs-string">&apos;GET&apos;</span>,<span class="hljs-string">&apos;http://jack.com:8002/xxx&apos;</span>)<span class="hljs-comment">//&#x914D;&#x7F6E;request.&#x8BF7;&#x6C42;&#x7684;&#x8DEF;&#x5F84;&#x4E3A;&#x7B2C;&#x4E8C;&#x4E2A;&#x7F51;&#x7AD9;&#x7684;8002&#x7AEF;&#x53E3;</span>
    request.send();<span class="hljs-comment">//&#x53D1;&#x9001;&#x8BF7;&#x6C42;</span>
})</code></pre><p>&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x7684;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="else if (path === &apos;/xxx&apos;) {
    response.statusCode = 200
    response.setHeader(&apos;Content-Type&apos;, &apos;text/xml;charset=utf-8&apos;)
    response.write(`
    {
      &quot;note&quot;:{
        &quot;from&quot;:&quot;mataotao&quot;,
        &quot;to&quot;:&quot;ni&quot;,
      }
    }
    `)
    response.end()
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (path === <span class="hljs-string">&apos;/xxx&apos;</span>) {
    response.statusCode = <span class="hljs-number">200</span>
    response.setHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>, <span class="hljs-string">&apos;text/xml;charset=utf-8&apos;</span>)
    response.write(`
    {
      <span class="hljs-string">&quot;note&quot;</span>:{
        <span class="hljs-string">&quot;from&quot;</span>:<span class="hljs-string">&quot;mataotao&quot;</span>,
        <span class="hljs-string">&quot;to&quot;</span>:<span class="hljs-string">&quot;ni&quot;</span>,
      }
    }
    `)
    response.end()
  }</code></pre><p>&#x76D1;&#x542C;&#x4E24;&#x4E2A;&#x7AEF;&#x53E3;,&#x7136;&#x540E;&#x7528;mataotao.com:8001&#x7684;&#x7F51;&#x7AD9;&#x5411;jack.com:8002&#x7F51;&#x7AD9;&#x53D1;&#x8D77;&#x8BF7;&#x6C42;,&#x8FD9;&#x5C31;&#x7B97;&#x662F;&#x8DE8;&#x57DF;&#x53D1;&#x9001;&#x8BF7;&#x6C42;<br><a href="https://imgchr.com/i/Pw9l28" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015836672?w=701&amp;h=120" src="https://static.alili.tech/img/remote/1460000015836672?w=701&amp;h=120" alt="Pw9l28.png" title="Pw9l28.png" style="cursor:pointer"></span></a></p><p><a href="https://imgchr.com/i/Pw9Q8f" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015836673?w=649&amp;h=110" src="https://static.alili.tech/img/remote/1460000015836673?w=649&amp;h=110" alt="Pw9Q8f.png" title="Pw9Q8f.png" style="cursor:pointer"></span></a></p><p>&#x70B9;&#x51FB;&#x70B9;&#x6211;&#x540E;:<br><a href="https://imgchr.com/i/Pw98Kg" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015836674?w=1270&amp;h=679" src="https://static.alili.tech/img/remote/1460000015836674?w=1270&amp;h=679" alt="Pw98Kg.png" title="Pw98Kg.png" style="cursor:pointer"></span></a><br><strong>ajax&#x8BF7;&#x6C42;&#x56E0;&#x4E3A;&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#x6CA1;&#x6709;&#x53D1;&#x9001;&#x6210;&#x529F;!</strong></p><h3 id="articleHeader4">&#x89E3;&#x51B3;&#x65B9;&#x6CD5;</h3><p>&#x4E00;&#x53E5;&#x4EE3;&#x7801;:&#x8BBE;&#x7F6E;&#x8BF7;&#x6C42;&#x5934;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//HTTP&#x8BBF;&#x95EE;&#x63A7;&#x5236;&#xFF08;CORS&#xFF09;&#x5141;&#x8BB8;&#x6765;&#x81EA;http://mataotao.com:8001&#x7684;&#x8BF7;&#x6C42;,&#x5E76;&#x7ED9;&#x4E88;&#x76F8;&#x5E94;
    response.setHeader(&apos;Access-Control-Allow-Origin&apos;,&apos;http://mataotao.com:8001&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code><span class="hljs-regexp">//</span>HTTP&#x8BBF;&#x95EE;&#x63A7;&#x5236;&#xFF08;CORS&#xFF09;&#x5141;&#x8BB8;&#x6765;&#x81EA;http:<span class="hljs-regexp">//m</span>ataotao.com:<span class="hljs-number">8001</span>&#x7684;&#x8BF7;&#x6C42;,&#x5E76;&#x7ED9;&#x4E88;&#x76F8;&#x5E94;
    response.setHeader(<span class="hljs-string">&apos;Access-Control-Allow-Origin&apos;</span>,<span class="hljs-string">&apos;http://mataotao.com:8001&apos;</span>)</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="else if (path === &apos;/xxx&apos;) {
    response.statusCode = 200
    response.setHeader(&apos;Content-Type&apos;, &apos;text/xml;charset=utf-8&apos;)

    //HTTP&#x8BBF;&#x95EE;&#x63A7;&#x5236;&#xFF08;CORS&#xFF09;&#x5141;&#x8BB8;&#x6765;&#x81EA;http://mataotao.com:8001&#x7684;&#x8BF7;&#x6C42;,&#x5E76;&#x7ED9;&#x4E88;&#x76F8;&#x5E94;
    response.setHeader(&apos;Access-Control-Allow-Origin&apos;,&apos;http://mataotao.com:8001&apos;)
    
    
    response.write(`
    {
      &quot;note&quot;:{
        &quot;from&quot;:&quot;mataotao&quot;,
        &quot;to&quot;:&quot;ni&quot;,
      }
    }
    `)
    response.end()
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-built_in">else</span> <span class="hljs-built_in">if</span> (path === <span class="hljs-string">&apos;/xxx&apos;</span>) {
    response.statusCode = <span class="hljs-number">200</span>
    response.setHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>, <span class="hljs-string">&apos;text/xml;charset=utf-8&apos;</span>)

    <span class="hljs-comment">//HTTP&#x8BBF;&#x95EE;&#x63A7;&#x5236;&#xFF08;CORS&#xFF09;&#x5141;&#x8BB8;&#x6765;&#x81EA;http://mataotao.com:8001&#x7684;&#x8BF7;&#x6C42;,&#x5E76;&#x7ED9;&#x4E88;&#x76F8;&#x5E94;</span>
    response.setHeader(<span class="hljs-string">&apos;Access-Control-Allow-Origin&apos;</span>,<span class="hljs-string">&apos;http://mataotao.com:8001&apos;</span>)
    
    
    response.<span class="hljs-built_in">write</span>(`
    {
      <span class="hljs-string">&quot;note&quot;</span>:{
        <span class="hljs-string">&quot;from&quot;</span>:<span class="hljs-string">&quot;mataotao&quot;</span>,
        <span class="hljs-string">&quot;to&quot;</span>:<span class="hljs-string">&quot;ni&quot;</span>,
      }
    }
    `)
    response.<span class="hljs-built_in">end</span>()
  }</code></pre><p>&#x7136;&#x540E;&#x91CD;&#x542F;jack.com:8002&#x7684;&#x670D;&#x52A1;&#x5668;,&#x518D;&#x91CD;&#x65B0;&#x8BF7;&#x6C42;&#x4E00;&#x6B21;</p><p><a href="https://imgchr.com/i/Pw9rMF" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015836675?w=669&amp;h=664" src="https://static.alili.tech/img/remote/1460000015836675?w=669&amp;h=664" alt="Pw9rMF.png" title="Pw9rMF.png" style="cursor:pointer;display:inline"></span></a><br>&#x6210;&#x529F;<br>CORS &#x53EF;&#x4EE5;&#x544A;&#x8BC9;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6211;&#x4FE9;&#x4E00;&#x5BB6;&#x7684;&#xFF0C;&#x522B;&#x963B;&#x6B62;&#x4ED6;</p><h3 id="articleHeader5">CORS&#x7684;&#x610F;&#x601D;</h3><p>&#x7A81;&#x7834;&#x540C;&#x6E90;&#x7B56;&#x7565; === &#x8DE8;&#x57DF;</p><p>Cross-Origin Resource Sharing<br>&#x8DE8;&#x57DF;(&#x6E90;,&#x7AD9;)&#x8D44;&#x6E90;&#x5171;&#x4EAB;</p><h3 id="articleHeader6">&#x603B;&#x7ED3;</h3><p>CORS&#x76F8;&#x5BF9;&#x4E8E;JSONP,CORS&#x53EF;&#x4EE5;&#x53D1;&#x4EFB;&#x610F;&#x8BF7;&#x6C42;,&#x800C;JSONP&#x53EA;&#x80FD;&#x53D1;&#x9001;get&#x8BF7;&#x6C42;</p><p><code>response.setHeader(&apos;Access-Control-Allow-Origin&apos;,&apos;http://mataotao.com:8001&apos;)</code><br>&#x8FD9;&#x53E5;&#x8BDD;&#x662F;<strong>&#x8DE8;&#x57DF;(&#x7A81;&#x7834;&#x540C;&#x6E90;&#x7B56;&#x7565;)</strong>&#x7684;&#x6838;&#x5FC3;,&#x5373;&#x5141;&#x8BB8;&#x522B;&#x7684;&#x7F51;&#x7AD9;(&#x4F8B;&#x5982;<a href="http://mataotao.com" rel="nofollow noreferrer" target="_blank">http://mataotao.com</a>:8001)&#x8DE8;&#x57DF;&#x5411;&#x6211;&#x53D1;&#x8BF7;&#x6C42;,&#x5E76;&#x4E14;&#x5141;&#x8BB8;&#x54CD;&#x5E94;</p><h2 id="articleHeader7">Ajax&#x603B;&#x7ED3;</h2><p><strong>&#x4EC0;&#x4E48;&#x662F;Ajax?</strong></p><ol><li>&#x4F7F;&#x7528;XMLHttpRequest&#x53D1;&#x9001;&#x8BF7;&#x6C42;</li><li>&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;json&#x683C;&#x5F0F;&#x7684;&#x5B57;&#x7B26;&#x4E32;</li><li>js&#x89E3;&#x6790;json,&#x5E76;&#x66F4;&#x65B0;&#x5C40;&#x90E8;&#x9875;&#x9762;</li><li></li></ol><h3 id="articleHeader8">&#x9762;&#x8BD5;&#x624B;&#x5199;Ajax</h3><p><a href="https://imgchr.com/i/PwPu1f" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015836676?w=1092&amp;h=458" src="https://static.alili.tech/img/remote/1460000015836676?w=1092&amp;h=458" alt="PwPu1f.png" title="PwPu1f.png" style="cursor:pointer;display:inline"></span></a><br>&#x5C31;&#x662F;&#x8FD9;9&#x884C;&#x4EE3;&#x7801;<br>&#x4E00;&#x5B9A;&#x8981;&#x4F1A;!!!</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
同源策略与CORS跨域

## 原文链接
[https://segmentfault.com/a/1190000015836666](https://segmentfault.com/a/1190000015836666)

