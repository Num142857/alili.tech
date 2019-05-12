---
title: '回调、使用Promise封装ajax()、Promise入门' 
date: 2018-11-18 2:30:09
hidden: true
slug: yvpevzhka7
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x56DE;&#x8C03;&#x3001;&#x4F7F;&#x7528;Promise&#x5C01;&#x88C5;ajax()&#x3001;Promise&#x5165;&#x95E8;</h1><h2 id="articleHeader1">1 &#x56DE;&#x8C03;&#x662F;&#x5565;</h2><p>call a function<br>call a function back</p><p>callback</p><p><a href="https://zhuanlan.zhihu.com/p/22677687" rel="nofollow noreferrer" target="_blank">&#x770B;&#x8FD9;&#x91CC;:Callback&#xFF08;&#x56DE;&#x8C03;&#xFF09;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;---&#x65B9;&#x5E94;&#x676D;&#x77E5;&#x4E4E;</a></p><blockquote>callback &#x662F;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x7684;&#x51FD;&#x6570;&#xFF0C;<strong>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x88AB;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x7ED9;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x53BB;&#x8C03;&#x7528;</strong>&#x3002;&#x8FD9;&#x6837;&#x7684;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</blockquote><h3 id="articleHeader2">1.1 &#x56DE;&#x8C03;&#x4F8B;&#x5B50;</h3><p>Callback &#x5F88;&#x5E38;&#x89C1;<br><code>$button.on(&apos;click&apos;, function(){})</code><br>click&#x540E;&#x9762;&#x7684; function &#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#xFF0C;&#x56E0;&#x4E3A;&#x300C;&#x6211;&#x300D;&#x6CA1;&#x6709;&#x8C03;&#x7528;&#x8FC7;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x662F; jQuery &#x5728;<strong>&#x7528;&#x6237;&#x70B9;&#x51FB; button &#x65F6;&#x8C03;&#x7528;&#x7684;</strong>(&#x5F53;&#x7528;&#x6237;&#x70B9;&#x51FB;&#x4E4B;&#x540E;,&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x624D;&#x6267;&#x884C;,&#x73B0;&#x5728;&#x6211;&#x53EA;&#x662F;&#x4F20;&#x4E86;&#x4E00;&#x4E2A;&#x53C2;&#x6570;,&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x70B9;&#x51FB;&#x540E;&#x8981;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;)&#x3002;</p><p><code>div.addEventListener(&apos;click&apos;, function(){})</code><br>click &#x540E;&#x9762;&#x7684; function &#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#xFF0C;&#x56E0;&#x4E3A;&#x300C;&#x6211;&#x300D;&#x6CA1;&#x6709;&#x8C03;&#x7528;&#x8FC7;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x5728;&#x7528;&#x6237;&#x70B9;&#x51FB; button &#x65F6;&#x8C03;&#x7528;&#x7684;&#x3002;</p><p>&#x4E00;&#x822C;&#x6765;&#x8BF4;&#xFF0C;&#x53EA;&#x8981;&#x53C2;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x56DE;&#x8C03;&#x3002;</p><p>&#x8BF7;&#x770B;&#x6211;&#x5199;&#x7684;<a href="https://segmentfault.com/a/1190000015893956?_ea=4121105#articleHeader8">&#x5C01;&#x88C5;&#x7684;&#x7B80;&#x6613;jQuery.ajax()</a>&#x4E2D;&#x7684;<code>successFN</code>&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;.</p><p>&#x53EA;&#x6709;&#x5728;&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x5E76;&#x63A5;&#x6536;&#x5230;&#x54CD;&#x5E94;&#x7684;&#x65F6;&#x5019;&#x624D;&#x4F1A;&#x6267;&#x884C;&#x8FD9;&#x4E2A;success&#x51FD;&#x6570;,&#x8FD9;&#x5C31;&#x662F;&#x56DE;&#x8C03;.&#x4F20;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F46;&#x662F;&#x4E0D;&#x6267;&#x884C;,&#x8BA9;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x53BB;&#x8C03;&#x7528;,&#x5C31;&#x662F;&#x56DE;&#x8C03;&#x51FD;&#x6570;</p><h3 id="articleHeader3">1.2Callback &#x6709;&#x70B9;&#x53CD;&#x76F4;&#x89C9;</h3><p>callback &#x6709;&#x4E00;&#x70B9;&#x300C;&#x53CD;&#x76F4;&#x89C9;&#x300D;&#x3002;<br>&#x6BD4;&#x5982;&#x8BF4;&#x6211;&#x4EEC;&#x7528;&#x4EE3;&#x7801;&#x505A;&#x4E00;&#x4EF6;&#x4E8B;&#x60C5;&#xFF0C;&#x5206;&#x4E3A;&#x4E24;&#x6B65;&#xFF1A;step1( ) &#x548C; step2( )&#x3002;</p><p>&#x7B26;&#x5408;&#x4EBA;&#x7C7B;&#x76F4;&#x89C9;&#x7684;&#x4EE3;&#x7801;&#x662F;&#xFF1A;</p><p>step1()<br>step2()<br>callback &#x7684;&#x5199;&#x6CD5;&#x5374;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><p>step1(step2)<br>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x8FD9;&#x6837;&#x5199;&#xFF1F;&#x6216;&#x8005;&#x8BF4;&#x5728;&#x4EC0;&#x4E48;&#x60C5;&#x51B5;&#x4E0B;&#x5E94;&#x8BE5;&#x7528;&#x8FD9;&#x4E2A;&#x300C;&#x53CD;&#x76F4;&#x89C9;&#x300D;&#x7684;&#x5199;&#x6CD5;&#xFF1F;</p><p>&#x4E00;&#x822C;&#xFF08;&#x6CE8;&#x610F;&#x6211;&#x8BF4;&#x4E86;&#x4E00;&#x822C;&#xFF09;&#xFF0C;&#x5728; step1 &#x662F;&#x4E00;&#x4E2A;<strong>&#x5F02;&#x6B65;&#x4EFB;&#x52A1;</strong>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x4F1A;&#x4F7F;&#x7528; callback&#x3002;</p><p>&#x4EC0;&#x4E48;&#x662F;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#x5462;&#xFF1F;</p><h2 id="articleHeader4">2.&#x4EC0;&#x4E48;&#x662F;&#x5F02;&#x6B65;?</h2><p>[&#x300C;&#x6BCF;&#x65E5;&#x4E00;&#x9898;&#x300D;&#x4EC0;&#x4E48;&#x662F;&#x5F02;&#x6B65;&#xFF1F;---&#x65B9;&#x5E94;&#x676D;&#x77E5;&#x4E4E;<br>](<a href="https://zhuanlan.zhihu.com/p/22685960)" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a><br>&#x4E0B;&#x4E00;&#x7BC7;&#x535A;&#x5BA2;&#x518D;&#x8BE6;&#x7EC6;&#x8BB0;&#x5F55;&#x5427;</p><h2 id="articleHeader5">3. $.Ajax()Promise &#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#x5982;&#x4F55;&#x7528;?</h2><p><a href="https://zhuanlan.zhihu.com/p/22782675" rel="nofollow noreferrer" target="_blank">&#x300C;&#x6BCF;&#x65E5;&#x4E00;&#x9898;&#x300D;Promise &#x662F;&#x4EC0;&#x4E48;&#xFF1F;</a></p><p><a href="https://github.com/mtt3366/AjaxStudy/commits/master" rel="nofollow noreferrer" target="_blank">&#x4EE3;&#x7801;&#x90FD;&#x5728;&#x8FD9;&#x91CC;</a></p><h3 id="articleHeader6">3.1 $.Ajax()&#x4E2D;&#x7684;promise</h3><p>&#x5982;&#x679C;&#x4E0D;&#x4F7F;&#x7528;promise,$.ajax&#x8BF7;&#x6C42;&#x7684;&#x65F6;&#x5019;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x662F;&#x5199;&#x5728;&#x53C2;&#x6570;&#x91CC;&#x7684;,&#x4ED6;&#x662F;&#x5BF9;&#x8C61;&#x53C2;&#x6570;&#x7684;&#x4E00;&#x4E2A;&#x503C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
        method:&quot;post&quot;,
        url:&quot;/xxx&quot;,
        data:&quot;username=mtt&amp;password=1&quot;,
        dataType:&apos;json&apos;,
        success:()=&gt;{}//&#x6210;&#x529F;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;
        error:()=&gt;{}//&#x5931;&#x8D25;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;
    }
    )" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$.ajax({
        <span class="hljs-attr">method</span>:<span class="hljs-string">&quot;post&quot;</span>,
        <span class="hljs-attr">url</span>:<span class="hljs-string">&quot;/xxx&quot;</span>,
        <span class="hljs-attr">data</span>:<span class="hljs-string">&quot;username=mtt&amp;password=1&quot;</span>,
        <span class="hljs-attr">dataType</span>:<span class="hljs-string">&apos;json&apos;</span>,
        <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{}<span class="hljs-comment">//&#x6210;&#x529F;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
        error:<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{}<span class="hljs-comment">//&#x5931;&#x8D25;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
    }
    )</code></pre><p>&#x5982;&#x679C;&#x4F7F;&#x7528;jQuery.axja()&#x53D1;&#x9001;&#x8BF7;&#x6C42;,&#x5E76;&#x4F7F;&#x7528;promise,&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myButton = document.getElementById(&apos;myButton&apos;);

function success(responseText){
    console.log(&quot;&#x6210;&#x529F;&quot;)
    console.log(responseText);//responseTex
}
function fail(request){
    console.log(&quot;&#x5931;&#x8D25;&quot;)
    console.log(request);
}
myButton.addEventListener(&quot;click&quot;,(e)=&gt;{
    //&#x4F7F;&#x7528;ajax
    $.ajax({
        method:&quot;post&quot;,
        url:&quot;/xxx&quot;,
        data:&quot;username=mtt&amp;password=1&quot;,
        dataType:&apos;json&apos;//&#x9884;&#x671F;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;,&#x5982;&#x679C;&#x4E0D;&#x5199;,&#x5C31;&#x662F;&#x54CD;&#x5E94;&#x91CC;&#x8BBE;&#x7F6E;&#x7684;
    }
    ).then(success,fail)//$.ajax()&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;promise
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> myButton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;myButton&apos;</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">success</span>(<span class="hljs-params">responseText</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x6210;&#x529F;&quot;</span>)
    <span class="hljs-built_in">console</span>.log(responseText);<span class="hljs-comment">//responseTex</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fail</span>(<span class="hljs-params">request</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x5931;&#x8D25;&quot;</span>)
    <span class="hljs-built_in">console</span>.log(request);
}
myButton.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,(e)=&gt;{
    <span class="hljs-comment">//&#x4F7F;&#x7528;ajax</span>
    $.ajax({
        <span class="hljs-attr">method</span>:<span class="hljs-string">&quot;post&quot;</span>,
        <span class="hljs-attr">url</span>:<span class="hljs-string">&quot;/xxx&quot;</span>,
        <span class="hljs-attr">data</span>:<span class="hljs-string">&quot;username=mtt&amp;password=1&quot;</span>,
        <span class="hljs-attr">dataType</span>:<span class="hljs-string">&apos;json&apos;</span><span class="hljs-comment">//&#x9884;&#x671F;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;,&#x5982;&#x679C;&#x4E0D;&#x5199;,&#x5C31;&#x662F;&#x54CD;&#x5E94;&#x91CC;&#x8BBE;&#x7F6E;&#x7684;</span>
    }
    ).then(success,fail)<span class="hljs-comment">//$.ajax()&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;promise</span>
})</code></pre><p>&#x6210;&#x529F;&#x7684;&#x7ED3;&#x679C;:<br><a href="https://imgchr.com/i/PrgSzV" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015938475?w=384&amp;h=215" src="https://static.alili.tech/img/remote/1460000015938475?w=384&amp;h=215" alt="PrgSzV.png" title="PrgSzV.png" style="cursor:pointer"></span></a></p><p>&#x6362;&#x4E00;&#x4E2A;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x5730;&#x5740;<code>/mtt</code>&#x5931;&#x8D25;&#x7684;&#x7ED3;&#x679C;<br><a href="https://imgchr.com/i/PrcXIs" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015938476" src="https://static.alili.tech/img/remote/1460000015938476" alt="PrcXIs.png" title="PrcXIs.png" style="cursor:pointer"></span></a></p><p><code>$.ajax()</code>&#x51FD;&#x6570;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;promise,&#x7136;&#x540E;&#x5728;&#x540E;&#x9762;<code>.then(success,fail)</code>&#x65F6;&#x5019;,&#x5982;&#x679C;&#x6210;&#x529F;&#x4E86;&#x5C31;&#x4F1A;&#x8C03;&#x7528;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x91CC;&#x7684;&#x51FD;&#x6570;&#x5373;success&#x51FD;&#x6570;,&#x5982;&#x679C;&#x5931;&#x8D25;&#x4E86;&#x5C31;&#x4F1A;&#x8C03;&#x7528;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x51FD;&#x6570;&#x5373;fail&#x51FD;&#x6570;.</p><h4>3.1.1 promise&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x610F;&#x4E49;</h4><p>promise&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x610F;&#x4E49;:&#x4E0D;&#x7528;&#x8BB0;&#x4F4F;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x5230;&#x5E95;&#x662F;success,&#x8FD8;&#x662F;successFN&#x6216;&#x8005;&#x662F;fail&#x6216;&#x8005;&#x662F;error,&#x4E0D;&#x7528;&#x8BB0;&#x4F4F;&#x51FD;&#x6570;&#x540D;&#x5B57;.&#x53EA;&#x9700;&#x8981;&#x77E5;&#x9053;&#x6210;&#x529F;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;,&#x5931;&#x8D25;&#x65F6;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;,&#x6BD4;&#x5982;&#x8FD9;&#x6837;&#x5199;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //&#x4F7F;&#x7528;ajax
    $.ajax({
        method:&quot;post&quot;,
        url:&quot;/xxx&quot;,
        data:&quot;username=mtt&amp;password=1&quot;,
        dataType:&apos;json&apos;//&#x9884;&#x671F;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;,&#x5982;&#x679C;&#x4E0D;&#x5199;,&#x5C31;&#x662F;&#x54CD;&#x5E94;&#x91CC;&#x8BBE;&#x7F6E;&#x7684;
    }
    ).then((responseText)=&gt;{console.log(responseText)},()=&gt;{console.log(&quot;&#x5931;&#x8D25;&quot;)})//$.ajax()&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;promise" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code> <span class="hljs-comment">//&#x4F7F;&#x7528;ajax</span>
    $.ajax({
        method:<span class="hljs-string">&quot;post&quot;</span>,
        url:<span class="hljs-string">&quot;/xxx&quot;</span>,
        data:<span class="hljs-string">&quot;username=mtt&amp;password=1&quot;</span>,
        dataType:<span class="hljs-string">&apos;json&apos;</span><span class="hljs-comment">//&#x9884;&#x671F;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;,&#x5982;&#x679C;&#x4E0D;&#x5199;,&#x5C31;&#x662F;&#x54CD;&#x5E94;&#x91CC;&#x8BBE;&#x7F6E;&#x7684;</span>
    }
    ).then(<span class="hljs-function">(<span class="hljs-params">responseText</span>)=&gt;</span>{<span class="hljs-built_in">console</span>.log(responseText)},<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x5931;&#x8D25;&quot;</span>)})<span class="hljs-comment">//$.ajax()&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;promise</span></code></pre><p>&#x5B8C;&#x5168;&#x4E0D;&#x9700;&#x8981;&#x5199;&#x51FD;&#x6570;&#x540D;</p><h4>3.1.2promise&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x610F;&#x4E49;</h4><p>&#x5982;&#x679C;&#x4F60;&#x9700;&#x8981;&#x5BF9;&#x4E00;&#x4E2A;&#x7ED3;&#x679C;&#x8FDB;&#x884C;&#x591A;&#x6B21;&#x5904;&#x7406;,&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5199;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
        method:&quot;post&quot;,
        url:&quot;/xxx&quot;,
        data:&quot;username=mtt&amp;password=1&quot;,
        dataType:&apos;json&apos;//&#x9884;&#x671F;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;,&#x5982;&#x679C;&#x4E0D;&#x5199;,&#x5C31;&#x662F;&#x54CD;&#x5E94;&#x91CC;&#x8BBE;&#x7F6E;&#x7684;
    }
    ).then((responseText)=&gt;{
        console.log(responseText)
        return responseText;//&#x5982;&#x679C;&#x8981;&#x5BF9;&#x7ED3;&#x679C;&#x8FDB;&#x884C;&#x591A;&#x6B21;&#x5904;&#x7406;,&#x5C31;&#x5728;&#x8FD9;&#x91CC;return,&#x7B2C;&#x4E8C;&#x6B21;then&#x5C31;&#x4F1A;&#x5F97;&#x5230;&#x8FD9;&#x4E2A;return&#x7684;&#x6570;&#x636E;
    },()=&gt;{
        console.log(&quot;&#x5931;&#x8D25;&quot;)
    }).then(//&#x5F00;&#x59CB;&#x7B2C;&#x4E8C;&#x6B21;then
        (&#x4E0A;&#x4E00;&#x6B21;return&#x7684;&#x7ED3;&#x679C;)=&gt;{
            console.log(&quot;&#x7B2C;&#x4E8C;&#x6B21;&#x5904;&#x7406;&quot;)
            console.log(&#x4E0A;&#x4E00;&#x6B21;return&#x7684;&#x7ED3;&#x679C;)
        },
        ()=&gt;{
            //&#x7B2C;&#x4E8C;&#x6B21;&#x5904;&#x7406;&#x5931;&#x8D25;&#x7ED3;&#x679C;
        }
    )" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>$.ajax({
        method:<span class="hljs-string">&quot;post&quot;</span>,
        url:<span class="hljs-string">&quot;/xxx&quot;</span>,
        data:<span class="hljs-string">&quot;username=mtt&amp;password=1&quot;</span>,
        dataType:<span class="hljs-string">&apos;json&apos;</span><span class="hljs-regexp">//</span>&#x9884;&#x671F;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;,&#x5982;&#x679C;&#x4E0D;&#x5199;,&#x5C31;&#x662F;&#x54CD;&#x5E94;&#x91CC;&#x8BBE;&#x7F6E;&#x7684;
    }
    ).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(responseText)</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(responseText)
        <span class="hljs-keyword">return</span> responseText;<span class="hljs-regexp">//</span>&#x5982;&#x679C;&#x8981;&#x5BF9;&#x7ED3;&#x679C;&#x8FDB;&#x884C;&#x591A;&#x6B21;&#x5904;&#x7406;,&#x5C31;&#x5728;&#x8FD9;&#x91CC;<span class="hljs-keyword">return</span>,&#x7B2C;&#x4E8C;&#x6B21;<span class="hljs-keyword">then</span>&#x5C31;&#x4F1A;&#x5F97;&#x5230;&#x8FD9;&#x4E2A;<span class="hljs-keyword">return</span>&#x7684;&#x6570;&#x636E;
    },<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x5931;&#x8D25;&quot;</span>)
    }).<span class="hljs-keyword">then</span>(<span class="hljs-regexp">//</span>&#x5F00;&#x59CB;&#x7B2C;&#x4E8C;&#x6B21;<span class="hljs-keyword">then</span>
        (&#x4E0A;&#x4E00;&#x6B21;<span class="hljs-keyword">return</span>&#x7684;&#x7ED3;&#x679C;)=&gt;{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x7B2C;&#x4E8C;&#x6B21;&#x5904;&#x7406;&quot;</span>)
            <span class="hljs-built_in">console</span>.log(&#x4E0A;&#x4E00;&#x6B21;<span class="hljs-keyword">return</span>&#x7684;&#x7ED3;&#x679C;)
        },
        <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-regexp">//</span>&#x7B2C;&#x4E8C;&#x6B21;&#x5904;&#x7406;&#x5931;&#x8D25;&#x7ED3;&#x679C;
        }
    )</code></pre><p>&#x7ED3;&#x679C;:<br><a href="https://imgchr.com/i/Prg0eg" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015938477?w=285&amp;h=139" src="https://static.alili.tech/img/remote/1460000015938477?w=285&amp;h=139" alt="Prg0eg.png" title="Prg0eg.png" style="cursor:pointer"></span></a><br>&#x770B;&#x5230;&#x7B2C;&#x4E8C;&#x4E2A;then&#x91CC;&#x7684;&#x51FD;&#x6570;&#x5427;&#x7B2C;&#x4E00;&#x6B21;then&#x91CC;return&#x7684;&#x7ED3;&#x679C;&#x5F53;&#x505A;&#x53C2;&#x6570;,&#x7EE7;&#x7EED;&#x5904;&#x7406;.<br>&#x6240;&#x4EE5;promise&#x7684;&#x597D;&#x5904;&#x662F;&#x5982;&#x679C;&#x60F3;&#x518D;&#x6B21;&#x7528;&#x4E24;&#x4E2A;&#x51FD;&#x6570;,<strong>&#x5373;&#x518D;&#x6B21;&#x5BF9;&#x7ED3;&#x679C;&#x8FDB;&#x884C;&#x5904;&#x7406;</strong>,&#x5C31;&#x518D;then &#x4E00;&#x4E0B;,&#x4E0D;&#x9700;&#x8981;&#x518D;&#x6B21;&#x53D6;&#x540D;&#x5B57;&#x4E86;<br>then&#x7684;&#x4E2D;&#x6587;&#x542B;&#x4E49;:&#x7136;&#x540E;!</p><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;ajax&#x4E2D;promise&#x7684;&#x7B80;&#x5355;&#x4F7F;&#x7528;,&#x90A3;&#x4E48;&#x5982;&#x4F55;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x4E00;&#x4E2A;&#x5462;?</p><blockquote>PS:<code>ajax()</code>&#x51FD;&#x6570;&#x53C2;&#x6570;&#x91CC;&#x7684;<code>dataType:&apos;json&apos;//&#x9884;&#x671F;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;,&#x5982;&#x679C;&#x4E0D;&#x5199;,&#x5C31;&#x662F;&#x54CD;&#x5E94;&#x91CC;&#x8BBE;&#x7F6E;&#x7684;</code> &#x5373;:<br>ajax&#x65B9;&#x6CD5;&#x4E2D;&#x7684;dataType:&#x9884;&#x671F;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x6307;&#x5B9A;&#xFF0C;jQuery &#x5C06;&#x81EA;&#x52A8;&#x6839;&#x636E; HTTP &#x5305; MIME &#x4FE1;&#x606F;&#x6765;&#x667A;&#x80FD;&#x5224;&#x65AD;&#x3002;</blockquote><h2 id="articleHeader7">4&#x5C01;&#x88C5;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;$.Ajax()&#x4E2D;&#x7684;Promise&#x7684;&#x7B80;&#x6613;&#x7248;&#x672C;(&#x76AE;&#x6BDB;,&#x4EE5;&#x540E;&#x6DF1;&#x5165;)</h2><p>&#x63A5;&#x4E0B;&#x6765;&#x56DE;&#x5230;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x7684;jQuery.Ajax()&#x4EE3;&#x7801;.&#x6211;&#x4EEC;&#x4EE5;&#x6B64;&#x4E3A;&#x57FA;&#x7840;&#x7EE7;&#x7EED;&#x6765;&#x5C01;&#x88C5;promise</p><p><a href="https://raw.githubusercontent.com/mtt3366/AjaxStudy/58d0b19637767e4be7b6f5a99623dad55393e2a3/main.js" rel="nofollow noreferrer" target="_blank">&#x4EE5;&#x524D;&#x5C01;&#x88C5;&#x7684;&#x4EE3;&#x7801;&#x5728;&#x8FD9;&#x91CC;</a><br>&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x6211;&#x524D;&#x4E00;&#x7BC7;&#x535A;&#x5BA2;,&#x91CC;&#x9762;&#x6709;&#x5982;&#x4F55;&#x5C01;&#x88C5;Ajax()&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x8BE6;&#x7EC6;&#x8FC7;&#x7A0B;.</p><p>&#x539F;&#x6765;&#x7684;&#x5C01;&#x88C5;Ajax()&#x4EE3;&#x7801;&#x6838;&#x5FC3;&#x90E8;&#x5206;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.jQuery.ajax = ({method,path,body,successFn,failFn,headers})=&gt;{//ES6&#x8BED;&#x6CD5;
    
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
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.jQuery.ajax = <span class="hljs-function">(<span class="hljs-params">{method,path,body,successFn,failFn,headers}</span>)=&gt;</span>{<span class="hljs-comment">//ES6&#x8BED;&#x6CD5;</span>
    
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
}</code></pre><h3 id="articleHeader8">4.1&#x5F00;&#x59CB;&#x5C01;&#x88C5;</h3><p>&#x5C01;&#x88C5;&#x4E4B;&#x540E;&#x7684;&#x5B8C;&#x6574;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.jQuery.ajax = ({method,path,body,headers})=&gt;{//ES6&#x8BED;&#x6CD5;
   //&#x8FDB;&#x884C;Promise&#x5C01;&#x88C5;
    return new Promise((resolve,reject)=&gt;{//&#x8FD9;&#x53E5;&#x8BDD;&#x662F;&#x5957;&#x8DEF;,&#x8BB0;&#x4F4F;
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
                    resolve.call(undefined,request.responseText);//&#x6267;&#x884C;&#x6210;&#x529F;&#x51FD;&#x6570;
                }else if(request.status&gt;=400){
                    reject.call(undefined,request);//&#x6267;&#x884C;&#x5931;&#x8D25;&#x51FD;&#x6570;
                }
            }
        }
    })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.jQuery.ajax = <span class="hljs-function">(<span class="hljs-params">{method,path,body,headers}</span>)=&gt;</span>{<span class="hljs-comment">//ES6&#x8BED;&#x6CD5;</span>
   <span class="hljs-comment">//&#x8FDB;&#x884C;Promise&#x5C01;&#x88C5;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{<span class="hljs-comment">//&#x8FD9;&#x53E5;&#x8BDD;&#x662F;&#x5957;&#x8DEF;,&#x8BB0;&#x4F4F;</span>
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
                    resolve.call(<span class="hljs-literal">undefined</span>,request.responseText);<span class="hljs-comment">//&#x6267;&#x884C;&#x6210;&#x529F;&#x51FD;&#x6570;</span>
                }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(request.status&gt;=<span class="hljs-number">400</span>){
                    reject.call(<span class="hljs-literal">undefined</span>,request);<span class="hljs-comment">//&#x6267;&#x884C;&#x5931;&#x8D25;&#x51FD;&#x6570;</span>
                }
            }
        }
    })
}</code></pre><p><code>return</code> &#x4E00;&#x4E2A;<code>new Promise()</code>.<br><strong>&#x7B2C;&#x4E00;&#x4E2A;&#x8981;&#x8BB0;&#x4F4F;&#x7684;</strong>:&#x8FD9;&#x4E2A;<code>Promise</code>&#x5FC5;&#x987B;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x51FD;&#x6570;,&#x51FD;&#x6570;&#x91CC;&#x9762;&#x5C31;&#x662F;&#x8981;&#x505A;&#x7684;&#x4E8B;&#x60C5;(&#x5373;&#x53D1;&#x9001;&#x8BF7;&#x6C42;,Ajax&#x8BF7;&#x6C42;),&#x4E00;&#x822C;&#x6765;&#x8BF4;,&#x628A;&#x6240;&#x6709;&#x4E1C;&#x897F;&#x653E;&#x5728;&#x91CC;&#x9762;,&#x7B2C;&#x4E00;&#x53E5;&#x5C31;&#x662F;<code>return</code>.&#x7136;&#x540E;&#x8981;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x653E;&#x5728;&#x91CC;&#x9762;.<br><strong>&#x7B2C;&#x4E8C;&#x4E2A;&#x8981;&#x8BB0;&#x4F4F;&#x7684;</strong>:Promise&#x63A5;&#x6536;&#x7684;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x6709;&#x4E24;&#x4E2A;&#x53C2;&#x6570;,&#x4E00;&#x4E2A;&#x53EB;&#x505A;<code>resolve</code>.&#x4E00;&#x4E2A;&#x53EB;<code>reject</code><br>&#x524D;&#x4E24;&#x4E2A;&#x8981;&#x8BB0;&#x4F4F;&#x7684;&#x5199;&#x51FA;&#x6765;&#x5C31;&#x662F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return new Promise((resolve, reject) =&gt; {
        //&#x8981;&#x505A;&#x7684;&#x4E8B;
    });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        <span class="hljs-comment">//&#x8981;&#x505A;&#x7684;&#x4E8B;</span>
    });</code></pre><p><strong>&#x7B2C;&#x4E09;&#x4E2A;&#x8981;&#x8BB0;&#x4F4F;&#x7684;</strong>:&#x5982;&#x679C;&#x6210;&#x529F;&#x4E86;&#x5C31;&#x8C03;&#x4E00;&#x4E0B;<code>resolve()</code>,&#x5982;&#x679C;&#x5931;&#x8D25;&#x4E86;&#x5C31;&#x8C03;&#x7528;<code>reject()</code>,&#x6240;&#x4EE5;<code>Ajax()</code>&#x53C2;&#x6570;&#x4E2D;&#x4E0D;&#x9700;&#x8981;<code>successFn</code>&#x548C;<code>failFn</code>&#x4E86;<br>&#x5E76;&#x4E14;&#x5C06;&#x6210;&#x529F;&#x884C;&#x548C;&#x5931;&#x8D25;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;&#x5206;&#x522B;&#x6539;&#x4E3A;<br><code>resolve.call(undefined,request.responseText);//&#x6267;&#x884C;&#x6210;&#x529F;&#x51FD;&#x6570;</code>&#x548C;<code>reject.call(undefined,request);//&#x6267;&#x884C;&#x5931;&#x8D25;&#x51FD;&#x6570;</code></p><p>&#x4E0A;&#x9762;&#x662F;<strong>&#x56FA;&#x5B9A;</strong>&#x7684;&#x5957;&#x8DEF;<br>&#x5C01;&#x88C5;&#x5B8C;&#x6BD5;.<br>&#x53EA;&#x5206;&#x522B;&#x4FEE;&#x6539;&#x4E86;&#x8FD9;&#x51E0;&#x884C;&#x4EE3;&#x7801;<br><span class="img-wrap"><img data-src="/img/remote/1460000015938478" src="https://static.alili.tech/img/remote/1460000015938478" alt="PyAXOs.png" title="PyAXOs.png" style="cursor:pointer"></span></p><h3 id="articleHeader9">4.2&#x5982;&#x4F55;&#x8C03;&#x7528;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myButton.addEventListener(&quot;click&quot;,(e)=&gt;{
    //&#x4F7F;&#x7528;ajax
    $.ajax({
        method:&quot;post&quot;,
        path:&quot;/xxx&quot;,
        body:&quot;username=mtt&amp;password=1&quot;,
        headers:{
            &quot;content-type&quot;:&apos;application/x-www-form-urlencoded&apos;,
            &quot;mataotao&quot;:18
        }
    }).then(
        (responseText)=&gt;{console.log(responseText);},//&#x6210;&#x529F;&#x5C31;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;
        (request)=&gt;{console.log(request);}//&#x5931;&#x8D25;&#x5C31;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;
    )
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>myButton.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function">(<span class="hljs-params">e</span>)=&gt;</span>{
    <span class="hljs-comment">//&#x4F7F;&#x7528;ajax</span>
    $.ajax({
        method:<span class="hljs-string">&quot;post&quot;</span>,
        path:<span class="hljs-string">&quot;/xxx&quot;</span>,
        body:<span class="hljs-string">&quot;username=mtt&amp;password=1&quot;</span>,
        headers:{
            <span class="hljs-string">&quot;content-type&quot;</span>:<span class="hljs-string">&apos;application/x-www-form-urlencoded&apos;</span>,
            <span class="hljs-string">&quot;mataotao&quot;</span>:<span class="hljs-number">18</span>
        }
    }).then(
        <span class="hljs-function">(<span class="hljs-params">responseText</span>)=&gt;</span>{<span class="hljs-built_in">console</span>.log(responseText);},<span class="hljs-comment">//&#x6210;&#x529F;&#x5C31;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;</span>
        (request)=&gt;{<span class="hljs-built_in">console</span>.log(request);}<span class="hljs-comment">//&#x5931;&#x8D25;&#x5C31;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;</span>
    )
})</code></pre><p>&#x5728;<code>ajax()</code>&#x51FD;&#x6570;&#x540E;&#x63A5;&#x4E0A;<code>.then()</code>,&#x6210;&#x529F;&#x5C31;&#x8C03;&#x7528;<code>then()</code>&#x51FD;&#x6570;<strong>&#x7B2C;&#x4E00;&#x4E2A;</strong>&#x53C2;&#x6570;&#x91CC;&#x7684;&#x51FD;&#x6570;,&#x5931;&#x8D25;&#x5C31;&#x8C03;&#x7528;<code>then()</code>&#x51FD;&#x6570;<strong>&#x7B2C;&#x4E8C;&#x4E2A;</strong>&#x53C2;&#x6570;&#x91CC;&#x7684;&#x51FD;&#x6570;</p><p>&#x7B80;&#x5355;&#x7684;Promise&#x539F;&#x7406;:</p><p>&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x540E;&#x7684;Ajax()&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;new&#x51FA;&#x6765;&#x7684; Promise&#x5BF9;&#x8C61;,&#x4E00;&#x4E2A;Promise&#x5B9E;&#x4F8B;,&#x8FD9;&#x4E2A;Promise&#x5B9E;&#x4F8B;&#x6709;&#x4E00;&#x4E2A;then&#x5C5E;&#x6027;,&#x4ED6;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;,&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x8C03;&#x7528;then().&#x800C;&#x4E14;then&#x4E5F;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;Promise&#x5BF9;&#x8C61;.</p><p>Promise&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x51FD;&#x6570;,&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x4F60;&#x8981;&#x505A;&#x7684;&#x4E8B;&#x60C5;</p><p>&#x6240;&#x4EE5;Promise&#x672C;&#x8D28;&#x4E0A;&#x53EA;&#x662F;&#x89C4;&#x5B9A;&#x4E00;&#x79CD;&#x5F62;&#x5F0F;!</p><h2 id="articleHeader10">5 Promise&#x603B;&#x7ED3;</h2><p><strong>&#x8BF7;&#x80CC;&#x4E0B;&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;</strong></p><p>Promise&#x7528;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function xxx(){
    return new Promise((f1, f2) =&gt; {
        doSomething()
        setTimeout(()=&gt;{
            // &#x6210;&#x529F;&#x5C31;&#x8C03;&#x7528; f1&#xFF0C;&#x5931;&#x8D25;&#x5C31;&#x8C03;&#x7528; f2
        },3000)
    })
}

xxx().then(success, fail)

// &#x94FE;&#x5F0F;&#x64CD;&#x4F5C;
xxx().then(success, fail).then(success, fail)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">xxx</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">f1, f2</span>) =&gt;</span> {
        doSomething()
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-comment">// &#x6210;&#x529F;&#x5C31;&#x8C03;&#x7528; f1&#xFF0C;&#x5931;&#x8D25;&#x5C31;&#x8C03;&#x7528; f2</span>
        },<span class="hljs-number">3000</span>)
    })
}

xxx().then(success, fail)

<span class="hljs-comment">// &#x94FE;&#x5F0F;&#x64CD;&#x4F5C;</span>
xxx().then(success, fail).then(success, fail)</code></pre><p><a href="https://zhuanlan.zhihu.com/p/29632791" rel="nofollow noreferrer" target="_blank">&#x5341;&#x4E94;&#x884C;&#x4EE3;&#x7801;&#x5E26;&#x4F60;&#x641E;&#x61C2;Promise - &#x6D6A;&#x5B50;&#x7684;&#x6587;&#x7AE0; -&#x77E5;&#x4E4E;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
回调、使用Promise封装ajax()、Promise入门

## 原文链接
[https://segmentfault.com/a/1190000015938472](https://segmentfault.com/a/1190000015938472)

