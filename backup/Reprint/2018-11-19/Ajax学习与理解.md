---
title: 'Ajax学习与理解' 
date: 2018-11-19 2:32:04
hidden: true
slug: hjzytpm68fm
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">Ajax&#x5B66;&#x4E60;&#x4E0E;&#x7406;&#x89E3;</h1><p><a href="https://wangdoc.com/javascript/bom/xmlhttprequest.html" rel="nofollow noreferrer" target="_blank">&#x60F3;&#x8981;&#x5B66;&#x4E60;&#x7684;Ajax&#x5185;&#x5BB9;&#x90FD;&#x5728;&#x8FD9;&#x4E2A;&#x6559;&#x7A0B;&#x962E;&#x4E00;&#x5CF0;javascript--XMLHttpRequest &#x5BF9;&#x8C61;</a><br>&#x5E94;&#x8BE5;&#x6CE8;&#x610F;&#x7684;&#x70B9;</p><ol><li>JS &#x662F;&#x4E00;&#x95E8;&#x8BED;&#x8A00;&#xFF0C;JSON &#x662F;&#x53E6;&#x4E00;&#x95E8;&#x8BED;&#x8A00;&#xFF0C;JSON &#x8FD9;&#x95E8;&#x8BED;&#x8A00;&#x6284;&#x88AD;&#x4E86; JS&#x8FD9;&#x95E8;&#x8BED;&#x8A00;</li><li>AJAX &#x5C31;&#x662F;&#x7528; <strong>JS &#x53D1;&#x8BF7;&#x6C42;</strong></li><li>&#x54CD;&#x5E94;&#x7684;&#x7B2C;&#x56DB;&#x90E8;&#x5206;&#x662F;<strong>&#x5B57;&#x7B26;&#x4E32;</strong>&#xFF0C;&#x53EF;&#x4EE5;&#x7528; JSON &#x8BED;&#x6CD5;&#x8868;&#x793A;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7528; JSON &#x8BED;&#x6CD5;&#x8868;&#x793A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x7528; XML &#x8BED;&#x6CD5;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x7528; HTML &#x8BED;&#x6CD5;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x7528; CSS &#x8BED;&#x6CD5;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x7528; JS &#x8BED;&#x6CD5;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x7528;&#x6211;&#x81EA;&#x521B;&#x7684;&#x8BED;&#x6CD5;</li></ol><h2 id="articleHeader1">1 &#x5982;&#x4F55;&#x53D1;&#x8BF7;&#x6C42;&#xFF1F;</h2><p>&#x7528; form &#x53EF;&#x4EE5;&#x53D1;&#x8BF7;&#x6C42;&#xFF0C;&#x4F46;&#x662F;&#x4F1A;&#x5237;&#x65B0;&#x9875;&#x9762;&#x6216;&#x65B0;&#x5F00;&#x9875;&#x9762;<br>&#x7528; a &#x53EF;&#x4EE5;&#x53D1; get &#x8BF7;&#x6C42;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x4F1A;&#x5237;&#x65B0;&#x9875;&#x9762;&#x6216;&#x65B0;&#x5F00;&#x9875;&#x9762;<br>&#x7528; img &#x53EF;&#x4EE5;&#x53D1; get &#x8BF7;&#x6C42;&#xFF0C;&#x4F46;&#x662F;&#x53EA;&#x80FD;&#x4EE5;&#x56FE;&#x7247;&#x7684;&#x5F62;&#x5F0F;&#x5C55;&#x793A;<br>&#x7528; link &#x53EF;&#x4EE5;&#x53D1; get &#x8BF7;&#x6C42;&#xFF0C;&#x4F46;&#x662F;&#x53EA;&#x80FD;&#x4EE5; CSS&#x3001;favicon &#x7684;&#x5F62;&#x5F0F;&#x5C55;&#x793A;<br>&#x7528; script &#x53EF;&#x4EE5;&#x53D1; get &#x8BF7;&#x6C42;&#xFF0C;&#x4F46;&#x662F;&#x53EA;&#x80FD;&#x4EE5;&#x811A;&#x672C;&#x7684;&#x5F62;&#x5F0F;&#x8FD0;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;form action=&quot;xxx&quot; method=&quot;POST&quot;&gt;
  &lt;input type=&quot;text&quot; name=&quot;password&quot;&gt;
  &lt;input type=&quot;submit&quot;&gt;
&lt;/form&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs accesslog"><code>&lt;form action=<span class="hljs-string">&quot;xxx&quot;</span> method=<span class="hljs-string">&quot;<span class="hljs-keyword">POST</span>&quot;</span>&gt;
  &lt;input type=<span class="hljs-string">&quot;text&quot;</span> name=<span class="hljs-string">&quot;password&quot;</span>&gt;
  &lt;input type=<span class="hljs-string">&quot;submit&quot;</span>&gt;
&lt;/form&gt;</code></pre><p>&#x4F7F;&#x7528;form&#x53D1;&#x9001;&#x8BF7;&#x6C42;,&#x67E5;&#x770B;&#x8BF7;&#x6C42;&#x7684;&#x5185;&#x5BB9;<br><a href="https://imgchr.com/i/Pdt4Cq" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015832031" src="https://static.alili.tech/img/remote/1460000015832031" alt="Pdt4Cq.png" title="Pdt4Cq.png" style="cursor:pointer;display:inline"></span></a><br>password=123456&#x5C31;&#x662F;POST&#x8BF7;&#x6C42;&#x7684;&#x7B2C;&#x56DB;&#x90E8;&#x5206;</p><p>&#x90A3;&#x6709;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;</p><ol><li>get&#x3001;post&#x3001;put&#x3001;delete &#x8BF7;&#x6C42;&#x90FD;&#x884C;</li><li>&#x60F3;&#x4EE5;&#x4EC0;&#x4E48;&#x5F62;&#x5F0F;&#x5C55;&#x793A;&#x5C31;&#x4EE5;&#x4EC0;&#x4E48;&#x5F62;&#x5F0F;&#x5C55;&#x793A;</li></ol><h2 id="articleHeader2">2 &#x5FAE;&#x8F6F;&#x7684;&#x7A81;&#x7834;</h2><p>IE 5 &#x7387;&#x5148;&#x5728; JS &#x4E2D;&#x5F15;&#x5165; ActiveX &#x5BF9;&#x8C61;&#xFF08;API&#xFF09;&#xFF0C;&#x4F7F;&#x5F97; <strong>JS &#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x53D1;&#x8D77; HTTP &#x8BF7;&#x6C42;</strong>(<strong>&#x60F3;&#x7528;getpost&#x90FD;&#x53EF;&#x4EE5;,&#x60F3;&#x4EE5;&#x4EC0;&#x4E48;&#x5F62;&#x5F0F;&#x5C55;&#x793A;&#x5C31;&#x4EE5;&#x4EC0;&#x4E48;&#x5F62;&#x5F0F;&#x5C55;&#x793A;</strong>)&#x3002;<br>&#x968F;&#x540E; Mozilla&#x3001; Safari&#x3001; Opera &#x4E5F;&#x8DDF;&#x8FDB;&#xFF08;&#x6284;&#x88AD;&#xFF09;&#x4E86;&#xFF0C;&#x53D6;&#x540D; XMLHttpRequest(&#x5168;&#x5C40;&#x5BF9;&#x8C61;)&#xFF0C;&#x5E76;&#x88AB;&#x7EB3;&#x5165; W3C &#x89C4;&#x8303;</p><p>XMLHttpRequest&#x4F7F;&#x5F97;&#x6D4F;&#x89C8;&#x5668;&#x6709;&#x4E86;&#x548C;&#x8F6F;&#x4EF6;&#x4E00;&#x6837;&#x7684;&#x4F53;&#x9A8C;,&#x4E0D;&#x5C40;&#x9650;&#x4E8E;&#x770B;&#x6587;&#x7AE0;&#x548C;&#x5237;&#x65B0;</p><h2 id="articleHeader3">3 AJAX</h2><p>Jesse James Garrett &#x8BB2;&#x5982;&#x4E0B;&#x6280;&#x672F;&#x53D6;&#x540D;&#x53EB;&#x505A; AJAX&#xFF1A;<strong>&#x5F02;&#x6B65;&#x7684; JavaScript &#x548C; XML</strong></p><ol><li>&#x4F7F;&#x7528; XMLHttpRequest &#x53D1;&#x8BF7;&#x6C42;</li><li>&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE; XML &#x683C;&#x5F0F;&#x7684;&#x5B57;&#x7B26;&#x4E32;(&#x56E0;&#x4E3A;&#x5F53;&#x65F6;XML&#x5728;&#x5F53;&#x65F6;&#x662F;&#x6D41;&#x884C;&#x7684;&#x6570;&#x636E;&#x4F20;&#x8F93;&#x683C;&#x5F0F;,&#x540E;&#x6765;&#x7528;json)</li><li>JS &#x89E3;&#x6790; XML&#xFF0C;&#x5E76;&#x66F4;&#x65B0;<strong>&#x5C40;&#x90E8;&#x9875;&#x9762;</strong></li></ol><blockquote>2005&#x5E74;2&#x6708;&#xFF0C;AJAX &#x8FD9;&#x4E2A;&#x8BCD;&#x7B2C;&#x4E00;&#x6B21;&#x6B63;&#x5F0F;&#x63D0;&#x51FA;&#xFF0C;&#x5B83;&#x662F; Asynchronous JavaScript and XML &#x7684;&#x7F29;&#x5199;&#xFF0C;&#x6307;&#x7684;&#x662F;<strong>&#x901A;&#x8FC7; JavaScript &#x7684;&#x5F02;&#x6B65;&#x901A;&#x4FE1;</strong>&#xFF0C;&#x4ECE;&#x670D;&#x52A1;&#x5668;&#x83B7;&#x53D6; XML &#x6587;&#x6863;&#x4ECE;&#x4E2D;&#x63D0;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x518D;&#x66F4;&#x65B0;&#x5F53;&#x524D;&#x7F51;&#x9875;&#x7684;&#x5BF9;&#x5E94;&#x90E8;&#x5206;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x5237;&#x65B0;&#x6574;&#x4E2A;&#x7F51;&#x9875;&#x3002;&#x540E;&#x6765;&#xFF0C;AJAX &#x8FD9;&#x4E2A;&#x8BCD;&#x5C31;<strong>&#x6210;&#x4E3A; JavaScript &#x811A;&#x672C;&#x53D1;&#x8D77; HTTP &#x901A;&#x4FE1;&#x7684;&#x4EE3;&#x540D;&#x8BCD;</strong>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;<strong>&#x53EA;&#x8981;&#x7528;&#x811A;&#x672C;&#x53D1;&#x8D77;&#x901A;&#x4FE1;</strong>&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x53EB;&#x505A; AJAX &#x901A;&#x4FE1;&#x3002;W3C &#x4E5F;&#x5728;2006&#x5E74;&#x53D1;&#x5E03;&#x4E86;&#x5B83;&#x7684;&#x56FD;&#x9645;&#x6807;&#x51C6;&#x3002;</blockquote><p>.</p><blockquote><p>&#x5177;&#x4F53;&#x6765;&#x8BF4;&#xFF0C;AJAX &#x5305;&#x62EC;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x6B65;&#x9AA4;&#x3002;</p><ol><li>&#x521B;&#x5EFA; XMLHttpRequest &#x5B9E;&#x4F8B;</li><li>&#x53D1;&#x51FA; HTTP &#x8BF7;&#x6C42;</li><li>&#x63A5;&#x6536;&#x670D;&#x52A1;&#x5668;&#x4F20;&#x56DE;&#x7684;&#x6570;&#x636E;</li><li>&#x66F4;&#x65B0;&#x7F51;&#x9875;&#x6570;&#x636E;</li></ol><p>&#x6982;&#x62EC;&#x8D77;&#x6765;&#xFF0C;&#x5C31;&#x662F;&#x4E00;&#x53E5;&#x8BDD;&#xFF0C;**AJAX &#x901A;&#x8FC7;&#x539F;&#x751F;&#x7684;XMLHttpRequest&#x5BF9;&#x8C61;&#x53D1;&#x51FA; HTTP<br>&#x8BF7;&#x6C42;&#xFF0C;&#x5F97;&#x5230;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x540E;&#xFF0C;&#x518D;&#x8FDB;&#x884C;&#x5904;&#x7406;<strong>&#x3002;&#x73B0;&#x5728;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x90FD;&#x662F; </strong>JSON** &#x683C;&#x5F0F;&#x7684;&#x6570;&#x636E;&#xFF0C;XML &#x683C;&#x5F0F;&#x5DF2;&#x7ECF;&#x8FC7;&#x65F6;&#x4E86;&#xFF0C;&#x4F46;&#x662F; AJAX<br>&#x8FD9;&#x4E2A;&#x540D;&#x5B57;&#x5DF2;&#x7ECF;&#x6210;&#x4E86;&#x4E00;&#x4E2A;<strong>&#x901A;&#x7528;&#x540D;&#x8BCD;</strong>&#xFF0C;&#x5B57;&#x9762;&#x542B;&#x4E49;&#x5DF2;&#x7ECF;&#x6D88;&#x5931;&#x4E86;&#x3002;</p></blockquote><h2 id="articleHeader4">4 &#x5982;&#x4F55;&#x4F7F;&#x7528; XMLHttpRequest&#x5BF9;&#x8C61;</h2><p><a href="https://github.com/mtt3366/AjaxStudy" rel="nofollow noreferrer" target="_blank">&#x6240;&#x6709;&#x4EE3;&#x7801;&#x90FD;&#x5728;&#x8FD9;&#x91CC;</a><br>&#x6BCF;&#x4E00;&#x6B21;&#x5927;&#x7684;&#x66F4;&#x65B0;&#x53EF;&#x4EE5;&#x67E5;&#x770B;commit<br>&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(path === &apos;/&apos;){
    response.statusCode = 200
    let string = fs.readFileSync(&apos;./index.html&apos;) 
    response.setHeader(&apos;Content-Type&apos;, &apos;text/html;charset=utf-8&apos;)
    response.write(string)
    response.end()
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-built_in">if</span>(path === <span class="hljs-string">&apos;/&apos;</span>){
    response.statusCode = <span class="hljs-number">200</span>
    let <span class="hljs-keyword">string</span> = fs.readFileSync(<span class="hljs-string">&apos;./index.html&apos;</span>) 
    response.setHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>, <span class="hljs-string">&apos;text/html;charset=utf-8&apos;</span>)
    response.<span class="hljs-built_in">write</span>(<span class="hljs-keyword">string</span>)
    response.<span class="hljs-built_in">end</span>()
  }</code></pre><p><a href="https://imgchr.com/i/PdaNbF" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015832032" src="https://static.alili.tech/img/remote/1460000015832032" alt="&#x54CD;&#x5E94;" title="&#x54CD;&#x5E94;" style="cursor:pointer"></span></a></p><p>&#x5BF9;&#x4E8E;&#x54CD;&#x5E94;&#x6765;&#x8BF4;,&#x7B2C;&#x56DB;&#x90E8;&#x5206;&#x59CB;&#x7EC8;&#x90FD;&#x662F;<strong>&#x5B57;&#x7B26;&#x4E32;</strong>,&#x56E0;&#x4E3A;<code>response.write(string)</code>&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x5B57;&#x7B26;&#x4E32;,&#x6211;&#x4EEC;&#x7ED9;&#x6D4F;&#x89C8;&#x5668;&#x8FD4;&#x56DE;&#x4E86;<strong>&#x7B26;&#x5408;html&#x683C;&#x5F0F;&#x7684;&#x5B57;&#x7B26;&#x4E32;</strong>.<br>&#x7136;&#x540E;&#x518D;&#x8BBE;&#x7F6E;&#x54CD;&#x5E94;&#x5934;&#x4E2D;&#x7684;<code>Content-Type</code>,<code>response.setHeader(&apos;Content-Type&apos;, &apos;text/html;charset=utf-8&apos;)</code>,<strong>&#x5373;&#x8981;&#x6C42;&#x6D4F;&#x89C8;&#x5668;&#x4EE5;HTML&#x7684;&#x8BED;&#x6CD5;&#x89E3;&#x6790;&#x8FD9;&#x6BB5;&#x5B57;&#x7B26;&#x4E32;!</strong>,&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x6D4F;&#x89C8;&#x5668;&#x4F7F;&#x7528;&#x7684;&#x89E3;&#x6790;&#x65B9;&#x6CD5;&#x4E3A;json,&#x4E5F;&#x53EF;&#x8BBE;&#x7F6E;&#x4E3A;xml.&#x6240;&#x4EE5;JSON <strong>&#x662F;&#x4E00;&#x95E8;&#x8BED;&#x8A00;</strong>!!</p><p>http&#x8BF7;&#x6C42;&#x7684;&#x8DEF;&#x5F84;&#x90FD;&#x662F;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;.&#x6240;&#x4EE5;&#x90FD;&#x662F;&#x4EE5;/&#x5F00;&#x5934;</p><h3 id="articleHeader5">4.1&#x5F00;&#x59CB;&#x4F7F;&#x7528;</h3><p><a href="https://github.com/mtt3366/AjaxStudy" rel="nofollow noreferrer" target="_blank">&#x6240;&#x6709;&#x4EE3;&#x7801;&#x90FD;&#x5728;&#x8FD9;&#x91CC;</a><br>&#x67E5;&#x770B;commit&#x65E2;&#x6709;&#x6BCF;&#x6B21;&#x8FED;&#x4EE3;&#x7684;&#x4EE3;&#x7801;</p><p>&#x6211;&#x4EEC;&#x8BF7;&#x6C42;&#x4E00;&#x4E2A;&#x4EE5;xml&#x683C;&#x5F0F;&#x89E3;&#x6790;&#x7684;&#x5B57;&#x7B26;&#x4E32;,&#x7136;&#x540E;&#x770B;&#x770B;&#x54CD;&#x5E94;&#x662F;&#x4EC0;&#x4E48;<br>&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="else if (path === &apos;/xxx&apos;) {
    response.statusCode = 200
    response.setHeader(&apos;Content-Type&apos;, &apos;text/xml;charset=utf-8&apos;)
    response.write(`
    &lt;note&gt;
      &lt;to&gt;Tove&lt;/to&gt;
      &lt;from&gt;Jani&lt;/from&gt;
      &lt;heading&gt;Reminder&lt;/heading&gt;
      &lt;body&gt;Don&apos;t forget me this weekend!&lt;/body&gt;
    &lt;/note&gt;
    `)
    response.end()
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (path === <span class="hljs-string">&apos;/xxx&apos;</span>) {
    response.statusCode = <span class="hljs-number">200</span>
    response.setHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>, <span class="hljs-string">&apos;text/xml;charset=utf-8&apos;</span>)
    response.write(`<span class="javascript">
    &lt;note&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">to</span>&gt;</span>Tove<span class="hljs-tag">&lt;/<span class="hljs-name">to</span>&gt;</span></span>
      &lt;<span class="hljs-keyword">from</span>&gt;Jani&lt;<span class="hljs-regexp">/from&gt;
      &lt;heading&gt;Reminder&lt;/</span>heading&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>Don&apos;t forget me this weekend!<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    &lt;<span class="hljs-regexp">/note&gt;
    </span></span>`)
    response.end()
  }</code></pre><p>main.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myButton = document.getElementById(&apos;myButton&apos;);
myButton.addEventListener(&quot;click&quot;,(e)=&gt;{
    let request = new XMLHttpRequest();
    request.open(&apos;GET&apos;,&apos;/xxx&apos;)//&#x914D;&#x7F6E;request.&#x53C2;&#x6570;&#x5206;&#x522B;&#x4E3A;&#x65B9;&#x6CD5;&#x548C;&#x8DEF;&#x5F84;
    request.send();//&#x53D1;&#x9001;&#x8BF7;&#x6C42;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> myButton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;myButton&apos;</span>);
myButton.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function">(<span class="hljs-params">e</span>)=&gt;</span>{
    <span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
    request.open(<span class="hljs-string">&apos;GET&apos;</span>,<span class="hljs-string">&apos;/xxx&apos;</span>)<span class="hljs-comment">//&#x914D;&#x7F6E;request.&#x53C2;&#x6570;&#x5206;&#x522B;&#x4E3A;&#x65B9;&#x6CD5;&#x548C;&#x8DEF;&#x5F84;</span>
    request.send();<span class="hljs-comment">//&#x53D1;&#x9001;&#x8BF7;&#x6C42;</span>
})</code></pre><p>index.html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;body&gt;
    &lt;button id=&quot;myButton&quot;&gt;&#x70B9;&#x6211;&lt;/button&gt;
    &lt;script src=&quot;main.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;myButton&quot;</span>&gt;</span>&#x70B9;&#x6211;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;main.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><p>&#x5F53;&#x70B9;&#x51FB;&#x70B9;&#x6211;&#x6309;&#x94AE;&#x65F6;,&#x67E5;&#x770B;&#x53D1;&#x9001;&#x7684;&#x8BF7;&#x6C42;&#x548C;&#x6536;&#x5230;&#x7684;&#x54CD;&#x5E94;:<br><a href="https://imgchr.com/i/PdIUl6" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015832033" src="https://static.alili.tech/img/remote/1460000015832033" alt="PdIUl6.png" title="PdIUl6.png" style="cursor:pointer;display:inline"></span></a></p><p>&#x6211;&#x4EEC;&#x5C06;request&#x6253;&#x5370;&#x51FA;&#x6765;,&#x770B;&#x770B;&#x7ED3;&#x6784;:<br><code>console.log(request)</code><br><a href="https://imgchr.com/i/PdIq10" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015832034" src="https://static.alili.tech/img/remote/1460000015832034" alt="PdIq10.png" title="PdIq10.png" style="cursor:pointer;display:inline"></span></a></p><h4>4.1.2 &#x7406;&#x89E3;j&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x65F6;&#x95F4;&#x6982;&#x5FF5;</h4><p><a href="https://wangdoc.com/javascript/bom/xmlhttprequest.html#xmlhttprequestreadystate" rel="nofollow noreferrer" target="_blank">XMLHttpRequest.readyState</a></p><blockquote><code>XMLHttpRequest.readyState</code>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6574;&#x6570;&#xFF0C;&#x8868;&#x793A;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;&#x5F53;&#x524D;&#x72B6;&#x6001;&#x3002;&#x8BE5;&#x5C5E;&#x6027;&#x53EA;&#x8BFB;&#x3002;<br>&#x80FD;&#x591F;&#x8FD4;&#x56DE;0,1,2,3,4,&#x5177;&#x4F53;&#x6570;&#x5B57;&#x4EE3;&#x8868;&#x770B;&#x4E0A;&#x9762;&#x7684;&#x6587;&#x6863;.<br>4&#xFF0C;&#x8868;&#x793A;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;<strong>&#x6570;&#x636E;&#x5DF2;&#x7ECF;&#x5B8C;&#x5168;&#x63A5;&#x6536;</strong>&#xFF0C;&#x6216;&#x8005;<strong>&#x672C;&#x6B21;&#x63A5;&#x6536;&#x5DF2;&#x7ECF;&#x5931;&#x8D25;</strong>&#x3002;<br>&#x901A;&#x4FE1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6BCF;&#x5F53;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x53D1;&#x751F;&#x72B6;&#x6001;&#x53D8;&#x5316;&#xFF0C;&#x5B83;&#x7684;<code>readyState</code>&#x5C5E;&#x6027;&#x7684;&#x503C;&#x5C31;&#x4F1A;&#x6539;&#x53D8;&#x3002;&#x8FD9;&#x4E2A;&#x503C;&#x6BCF;&#x4E00;&#x6B21;&#x53D8;&#x5316;&#xFF0C;&#x90FD;&#x4F1A;&#x89E6;&#x53D1;<code>readyStateChange</code>&#x4E8B;&#x4EF6;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();

if (xhr.readyState === 4) {
  // &#x8BF7;&#x6C42;&#x7ED3;&#x675F;&#xFF0C;&#x5904;&#x7406;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;
} else {
  // &#x663E;&#x793A;&#x63D0;&#x793A;&#x201C;&#x52A0;&#x8F7D;&#x4E2D;&#x2026;&#x2026;&#x201D;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();

<span class="hljs-keyword">if</span> (xhr.readyState === <span class="hljs-number">4</span>) {
  <span class="hljs-comment">// &#x8BF7;&#x6C42;&#x7ED3;&#x675F;&#xFF0C;&#x5904;&#x7406;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;</span>
} <span class="hljs-keyword">else</span> {
  <span class="hljs-comment">// &#x663E;&#x793A;&#x63D0;&#x793A;&#x201C;&#x52A0;&#x8F7D;&#x4E2D;&#x2026;&#x2026;&#x201D;</span>
}</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;<code>xhr.readyState</code>&#x7B49;&#x4E8E;4&#x65F6;&#xFF0C;&#x8868;&#x660E;<strong>&#x811A;&#x672C;&#x53D1;&#x51FA;&#x7684; HTTP &#x8BF7;&#x6C42;&#x5DF2;&#x7ECF;&#x6210;&#x529F;</strong>&#x3002;&#x5176;&#x4ED6;&#x60C5;&#x51B5;&#xFF0C;&#x90FD;&#x8868;&#x793A; HTTP &#x8BF7;&#x6C42;&#x8FD8;&#x5728;&#x8FDB;&#x884C;&#x4E2D;&#x3002;</p><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4ECE;&#x65F6;&#x95F4;&#x89D2;&#x5EA6;&#x770B;&#x770B;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;<br><a href="https://imgchr.com/i/PdonNd" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015832035" src="https://static.alili.tech/img/remote/1460000015832035" alt="PdonNd.png" title="PdonNd.png" style="cursor:pointer"></span></a><br>&#x5F53;&#x6211;&#x4EEC;&#x53D1;&#x9001;&#x4E00;&#x4E2A;/xxx&#x8BF7;&#x6C42;,&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x95F4;&#x4E3A;9ms,9&#x6BEB;&#x79D2;&#x5B9E;&#x9645;&#x4E0A;&#x5F88;&#x957F;,&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x770B;&#x5728;&#x4EE3;&#x7801;&#x4E2D;9&#x6BEB;&#x79D2;&#x53EF;&#x4EE5;&#x5E72;&#x4EC0;&#x4E48;<br>&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6267;&#x884C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.time(); 
var a=1 ;  
console.timeEnd();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code>console.time()<span class="hljs-comment">; </span>
var a=<span class="hljs-number">1</span> <span class="hljs-comment">;  </span>
console.timeEnd()<span class="hljs-comment">;</span></code></pre><p>&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x4E3A;<code>default: 0.008056640625ms</code>,&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x53EA;&#x7528;&#x4E86;0.008ms</p><p>&#x6253;&#x5370;&#x4E00;&#x53E5;&#x8BDD;&#x53EA;&#x7528;&#x4E86;1ms<br><a href="https://imgchr.com/i/PdotEQ" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015832036" src="https://static.alili.tech/img/remote/1460000015832036" alt="PdotEQ.png" title="PdotEQ.png" style="cursor:pointer"></span></a><br>&#x6240;&#x4EE5;9ms&#x5BF9;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x6765;&#x8BF4;,&#x5BF9;&#x4E8E;&#x4EE3;&#x7801;&#x6765;&#x8BF4;&#x662F;&#x5F88;&#x957F;&#x7684;,&#x53EF;&#x4EE5;&#x505A;&#x5F88;&#x591A;&#x4E8B;&#x60C5;.</p><p>&#x63A5;&#x4E0B;&#x6765;&#x770B;&#x770B;<code>readyState</code>&#x5C5E;&#x6027;&#x5728;&#x4E00;&#x6B21;&#x8BF7;&#x6C42;&#x4E2D;&#x7684;&#x53D8;&#x5316;&#x8FC7;&#x7A0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let request = new XMLHttpRequest();
    request.open(&apos;GET&apos;,&apos;/xxx&apos;)
    request.send();
    setInterval(()=&gt;{//&#x5728;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;,&#x6BCF;&#x4E00;&#x6BEB;&#x79D2;&#x95EE;&#x4E00;&#x4E0B;
        console.log(request.readyState);
    },1)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
    request.open(<span class="hljs-string">&apos;GET&apos;</span>,<span class="hljs-string">&apos;/xxx&apos;</span>)
    request.send();
    setInterval(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-comment">//&#x5728;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;,&#x6BCF;&#x4E00;&#x6BEB;&#x79D2;&#x95EE;&#x4E00;&#x4E0B;</span>
        <span class="hljs-built_in">console</span>.log(request.readyState);
    },<span class="hljs-number">1</span>)</code></pre><p>&#x7ED3;&#x679C;&#x4E3A;:<br><a href="https://imgchr.com/i/Pdo259" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015832037" src="https://static.alili.tech/img/remote/1460000015832037" alt="Pdo259.png" title="Pdo259.png" style="cursor:pointer;display:inline"></span></a></p><p><code>readyState</code>&#x5728;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E2D;&#x4ECE;1&#x53D8;&#x4E3A;4<br>readyState&#x5404;&#x4E2A;&#x503C;&#x7684;&#x542B;&#x4E49;<br><a href="https://imgchr.com/i/PdLVDP" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015832038" src="https://static.alili.tech/img/remote/1460000015832038" alt="PdLVDP.png" title="PdLVDP.png" style="cursor:pointer;display:inline"></span></a><br>&#x521A;&#x521A;&#x53EA;&#x663E;&#x793A;&#x4E86;1&#x548C;4&#x7684;&#x539F;&#x56E0;&#x662F;&#x56E0;&#x4E3A;2,3&#x592A;&#x5FEB;,&#x6BD4;&#x4E00;&#x6BEB;&#x79D2;&#x8FD8;&#x5FEB;</p><p>01234&#x8FD9;&#x56DB;&#x4E2A;&#x72B6;&#x6001;&#x662F;&#x9010;&#x4E2A;&#x7ECF;&#x8FC7;&#x7684;<br>&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x8BB0;&#x4F4F;4,<strong>4&#x4EE3;&#x8868;&#x8BF7;&#x6C42;&#x5DF2;&#x7ECF;&#x628A;&#x54CD;&#x5E94;&#x4E0B;&#x8F7D;&#x5B8C;&#x6BD5;&#x4E86;</strong></p><h4>4.1.3 XMLHttpRequest.onreadystatechange</h4><p><code>XMLHttpRequest.onreadystatechange = callback;</code></p><blockquote>&#x5F53; readyState &#x7684;&#x503C;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#xFF0C;callback &#x51FD;&#x6570;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#x3002;</blockquote><p>&#x4F8B;&#x5B50;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr= new XMLHttpRequest(),
    method = &quot;GET&quot;,
    url = &quot;https://developer.mozilla.org/&quot;;

xhr.open(method, url, true);
xhr.onreadystatechange = function () {
  if(xhr.readyState === XMLHttpRequest.DONE &amp;&amp; xhr.status === 200) {
    console.log(xhr.responseText)
  }
}
xhr.send();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs oxygene"><code><span class="hljs-keyword">var</span> xhr= <span class="hljs-keyword">new</span> XMLHttpRequest(),
    <span class="hljs-function"><span class="hljs-keyword">method</span> = &quot;<span class="hljs-title">GET</span>&quot;,
    <span class="hljs-title">url</span> = &quot;<span class="hljs-title">https</span>:</span><span class="hljs-comment">//developer.mozilla.org/&quot;;</span>

xhr.open(<span class="hljs-function"><span class="hljs-keyword">method</span>, <span class="hljs-title">url</span>, <span class="hljs-title">true</span>);</span>
xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> <span class="hljs-comment">{
  if(xhr.readyState === XMLHttpRequest.DONE &amp;&amp; xhr.status === 200) {
    console.log(xhr.responseText)
  }</span>
}
<span class="hljs-title">xhr</span>.<span class="hljs-title">send</span><span class="hljs-params">()</span>;</span></code></pre><p><code>XMLHttpRequest.DONE</code>&#x5C31;&#x662F;4</p><p>onreadystatechange&#x6D4B;&#x8BD5;<br>&#x628A;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x5F80;&#x4E0A;&#x5199;,&#x8FD9;&#x6837;&#x5C31;&#x4E0D;&#x4F1A;&#x9519;&#x8FC7;&#x6BCF;&#x4E00;&#x4E2A;readyState&#x7684;&#x53D8;&#x5316;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myButton.addEventListener(&quot;click&quot;,(e)=&gt;{
    let request = new XMLHttpRequest();
    request.onreadystatechange = ()=&gt;{//&#x628A;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x5F80;&#x4E0A;&#x5199;,&#x8FD9;&#x6837;&#x5C31;&#x4E0D;&#x4F1A;&#x9519;&#x8FC7;&#x6BCF;&#x4E00;&#x4E2A;readyState&#x7684;&#x53D8;&#x5316;
        console.log(request.readyState);
    }
    request.open(&apos;GET&apos;,&apos;/xxx&apos;)//&#x914D;&#x7F6E;request.&#x53C2;&#x6570;&#x5206;&#x522B;&#x4E3A;&#x65B9;&#x6CD5;&#x548C;&#x8DEF;&#x5F84;
    request.send();//&#x53D1;&#x9001;&#x8BF7;&#x6C42;
    // console.log(request)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>myButton.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function">(<span class="hljs-params">e</span>)=&gt;</span>{
    <span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
    request.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{<span class="hljs-comment">//&#x628A;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x5F80;&#x4E0A;&#x5199;,&#x8FD9;&#x6837;&#x5C31;&#x4E0D;&#x4F1A;&#x9519;&#x8FC7;&#x6BCF;&#x4E00;&#x4E2A;readyState&#x7684;&#x53D8;&#x5316;</span>
        <span class="hljs-built_in">console</span>.log(request.readyState);
    }
    request.open(<span class="hljs-string">&apos;GET&apos;</span>,<span class="hljs-string">&apos;/xxx&apos;</span>)<span class="hljs-comment">//&#x914D;&#x7F6E;request.&#x53C2;&#x6570;&#x5206;&#x522B;&#x4E3A;&#x65B9;&#x6CD5;&#x548C;&#x8DEF;&#x5F84;</span>
    request.send();<span class="hljs-comment">//&#x53D1;&#x9001;&#x8BF7;&#x6C42;</span>
    <span class="hljs-comment">// console.log(request)</span>
})</code></pre><p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#x4E3A;1,2,3,4<br><strong>4&#x4EE3;&#x8868;&#x8BF7;&#x6C42;&#x5DF2;&#x7ECF;&#x628A;&#x54CD;&#x5E94;&#x4E0B;&#x8F7D;&#x5B8C;&#x6BD5;&#x4E86;,&#x4F46;&#x662F;&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x548C;&#x5931;&#x8D25;&#x8FD8;&#x8981;&#x770B;status&#x72B6;&#x6001;&#x7801;&#x662F;&#x5927;&#x4E8E;200&#x5C0F;&#x4E8E;300&#x8FD8;&#x662F;&#x5927;&#x4E8E;400</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" request.onreadystatechange = ()=&gt;{
        if(request.readyState ===4){
            console.log(&quot;&#x8BF7;&#x6C42;&#x548C;&#x54CD;&#x5E94;&#x90FD;&#x5B8C;&#x6BD5;&#x4E86;&quot;);
            if ( request.status&gt;=200&amp;&amp;request.status&lt;=400){
                console.log(&apos;&#x8BF4;&#x660E;&#x8BF7;&#x6C42;&#x6210;&#x529F;&apos;);
                console.log(request.responseText);//&#x6253;&#x5370;&#x54CD;&#x5E94;&#x7684;&#x7B2C;&#x56DB;&#x90E8;&#x5206;,&#x5B57;&#x7B26;&#x4E32;
            }else if(request.status&gt;=400){
                console.log(&quot;&#x54CD;&#x5E94;&#x5931;&#x8D25;&quot;);
            }
        } 
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code> request.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">if</span>(request.readyState ===<span class="hljs-number">4</span>){
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x8BF7;&#x6C42;&#x548C;&#x54CD;&#x5E94;&#x90FD;&#x5B8C;&#x6BD5;&#x4E86;&quot;</span>);
            <span class="hljs-keyword">if</span> ( request.status&gt;=<span class="hljs-number">200</span>&amp;&amp;request.status&lt;=<span class="hljs-number">400</span>){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8BF4;&#x660E;&#x8BF7;&#x6C42;&#x6210;&#x529F;&apos;</span>);
                <span class="hljs-built_in">console</span>.log(request.responseText);<span class="hljs-regexp">//</span>&#x6253;&#x5370;&#x54CD;&#x5E94;&#x7684;&#x7B2C;&#x56DB;&#x90E8;&#x5206;,&#x5B57;&#x7B26;&#x4E32;
            }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(request.status&gt;=<span class="hljs-number">400</span>){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;&#x54CD;&#x5E94;&#x5931;&#x8D25;&quot;</span>);
            }
        } 
    }</code></pre><p><a href="https://imgchr.com/i/PdOwo8" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015832039" src="https://static.alili.tech/img/remote/1460000015832039" alt="PdOwo8.png" title="PdOwo8.png" style="cursor:pointer;display:inline"></span></a><br>&#x4F46;&#x662F;xml&#x7ED3;&#x6784;&#x4E0D;&#x65B9;&#x4FBF;,&#x9700;&#x8981;&#x4F7F;&#x7528;DOMapi&#x53BB;&#x83B7;&#x53D6;&#x6570;&#x636E;.&#x73B0;&#x5728;&#x4F7F;&#x7528;json</p><h4>4.1.4 &#x4F7F;&#x7528;json&#x89E3;&#x6790;&#x54CD;&#x5E94;&#x7684;&#x7B2C;&#x56DB;&#x90E8;&#x5206;</h4><p>&#x4EC0;&#x4E48;&#x662F;json:<br>json&#x662F;&#x4E00;&#x95E8;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x5316;&#x8BED;&#x8A00;,&#x7528;&#x6765;&#x8868;&#x793A;&#x6570;&#x636E;<br><a href="https://www.json.org/" rel="nofollow noreferrer" target="_blank">https://www.json.org/</a><br>&#x8F68;&#x9053;&#x56FE;</p><p>js&#x4E0E;json&#x7684;&#x533A;&#x522B;:<br><a href="https://imgchr.com/i/PdXk0P" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015832040" src="https://static.alili.tech/img/remote/1460000015832040" alt="PdXk0P.png" title="PdXk0P.png" style="cursor:pointer"></span></a><br>&#x4EE5;&#x4E0B;&#x90FD;&#x662F;&#x5408;&#x6CD5;&#x7684;json&#x8BED;&#x6CD5;:</p><p><code>&quot;hi&quot;</code><br><code>null</code><br><code>[&quot;a&quot;,&quot;b&quot;]</code><br><code>{&quot;name&quot;:&quot;&#x9A6C;&#x6D9B;&#x6D9B;&quot;,&quot;isBoy&quot;:true}</code><br>&#x4E0B;&#x9762;&#x4E0D;&#x7B26;&#x5408;!<br><code>{&apos;x&apos;:&quot;y&quot;}</code><br>&#x5FC5;&#x987B;&#x53CC;&#x5F15;&#x53F7;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x7B26;&#x5408;json&#x8BED;&#x6CD5;&#x7684;<strong>&#x5B57;&#x7B26;&#x4E32;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="else if (path === &apos;/xxx&apos;) {
    response.statusCode = 200
    response.setHeader(&apos;Content-Type&apos;, &apos;text/xml;charset=utf-8&apos;)
    response.write(`
    {
      &quot;note&quot;:{
        &quot;from&quot;:&quot;mataotao&quot;,
        &quot;to&quot;:&quot;ni&quot;,
        &quot;bool&quot;:true,
        &quot;arr&quot;:[&quot;a&quot;,1,2,3],
        &quot;num&quot;:3
      }
    }
    `)
    response.end()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lua"><code><span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (path === <span class="hljs-string">&apos;/xxx&apos;</span>) {
    response.statusCode = <span class="hljs-number">200</span>
    response.setHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>, <span class="hljs-string">&apos;text/xml;charset=utf-8&apos;</span>)
    response.<span class="hljs-built_in">write</span>(`
    {
      <span class="hljs-string">&quot;note&quot;</span>:{
        <span class="hljs-string">&quot;from&quot;</span>:<span class="hljs-string">&quot;mataotao&quot;</span>,
        <span class="hljs-string">&quot;to&quot;</span>:<span class="hljs-string">&quot;ni&quot;</span>,
        <span class="hljs-string">&quot;bool&quot;</span>:<span class="hljs-literal">true</span>,
        <span class="hljs-string">&quot;arr&quot;</span>:[<span class="hljs-string">&quot;a&quot;</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],
        <span class="hljs-string">&quot;num&quot;</span>:<span class="hljs-number">3</span>
      }
    }
    `)
    response.<span class="hljs-keyword">end</span>()</code></pre><p><a href="https://imgchr.com/i/PdjmE6" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015832041" src="https://static.alili.tech/img/remote/1460000015832041" alt="PdjmE6.png" title="PdjmE6.png" style="cursor:pointer;display:inline"></span></a></p><p><strong>&#x4F7F;&#x7528;<code>window.JSON</code>&#x8FD9;&#x4E2A;API,&#x628A;&#x7B26;&#x5408;json&#x8BED;&#x6CD5;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x5316;&#x4E3A;js&#x5BF9;&#x5E94;&#x7684;&#x503C;</strong><br>&#x8FD9;&#x4E2A;API&#x5C31;&#x50CF;<code>window.document.getElementById</code>&#x4E00;&#x6837;,&#x662F;<strong>&#x6D4F;&#x89C8;&#x5668;&#x63D0;&#x4F9B;&#x7684;api</strong><br>&#x4FEE;&#x6539;&#x4E00;&#x4E0B;main.js&#x5C06;json&#x8F6C;&#x5316;&#x4E3A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ( request.status&gt;=200&amp;&amp;request.status&lt;=400){
                console.log(&apos;&#x8BF4;&#x660E;&#x8BF7;&#x6C42;&#x6210;&#x529F;&apos;);
                console.log(request.responseText);
                console.log( typeof request.responseText);//string

                let string = request.responseText;
                //&#x628A;&#x7B26;&#x5408;json&#x8BED;&#x6CD5;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x5316;&#x4E3A;js&#x5BF9;&#x5E94;&#x7684;&#x503C;
                let object2 = window.JSON.parse(string);
                console.log( typeof object2)
                console.log(object2)
            }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-keyword">if</span> ( request.status&gt;=<span class="hljs-number">200</span>&amp;&amp;request.status&lt;=<span class="hljs-number">400</span>){
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8BF4;&#x660E;&#x8BF7;&#x6C42;&#x6210;&#x529F;&apos;</span>);
                <span class="hljs-built_in">console</span>.log(request.responseText);
                <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">typeof</span> request.responseText);<span class="hljs-comment">//string</span>

                <span class="hljs-keyword">let</span> <span class="hljs-built_in">string</span> = request.responseText;
                <span class="hljs-comment">//&#x628A;&#x7B26;&#x5408;json&#x8BED;&#x6CD5;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x5316;&#x4E3A;js&#x5BF9;&#x5E94;&#x7684;&#x503C;</span>
                <span class="hljs-keyword">let</span> object2 = <span class="hljs-built_in">window</span>.JSON.parse(<span class="hljs-built_in">string</span>);
                <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">typeof</span> object2)
                <span class="hljs-built_in">console</span>.log(object2)
            }</code></pre><p><a href="https://imgchr.com/i/PdjOPO" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000015832042" src="https://static.alili.tech/img/remote/1460000015832042" alt="PdjOPO.png" title="PdjOPO.png" style="cursor:pointer;display:inline"></span></a></p><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x7528;<code>object.note.from</code>&#x53D6;&#x5230;<code>&quot;mataotao&quot;</code>&#x8FD9;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;</p><p>http&#x54CD;&#x5E94;&#x7B2C;&#x56DB;&#x90E8;&#x5206;<strong>&#x6C38;&#x8FDC;&#x662F;&#x5B57;&#x7B26;&#x4E32;</strong>,&#x77E5;&#x8BC6;&#x5199;&#x7684;&#x8FD9;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x521A;&#x597D;&#x7B26;&#x5408;json&#x5BF9;&#x8C61;&#x7684;&#x8BED;&#x6CD5;</p><h2 id="articleHeader6">&#x9762;&#x8BD5;&#x95EE;&#x9898;:&#x8BF7;&#x4F7F;&#x7528;&#x539F;&#x751F;JS&#x53D1;&#x9001;Ajax&#x8BF7;&#x6C42;</h2><p>&#x4E00;&#x822C;&#x9762;&#x8BD5;&#x5927;&#x6982;&#x7387;&#x4F1A;&#x95EE;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;,&#x5199;&#x4E0D;&#x5BF9;&#x4E00;&#x5B9A;&#x8FC7;&#x4E0D;&#x4E86;&#x9762;&#x8BD5;</p><p>&#x4E0B;&#x9762;&#x56DB;&#x53E5;&#x4EE3;&#x7801;&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x4F4F;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myButton.addEventListener(&quot;click&quot;,(e)=&gt;{
//&#x8FD9;&#x56DB;&#x53E5;&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x4F4F;
    let request = new XMLHttpRequest();
    request.onreadystatechange = ()=&gt;{
    if(request.readyState === XMLHttpRequest.DONE &amp;&amp; request.status === 200) {
    console.log(request.responseText)
  }
    }
    request.open(&apos;GET&apos;,&apos;/xxx&apos;)//&#x914D;&#x7F6E;request.&#x53C2;&#x6570;&#x5206;&#x522B;&#x4E3A;&#x65B9;&#x6CD5;&#x548C;&#x8DEF;&#x5F84;
    request.send();//&#x53D1;&#x9001;&#x8BF7;&#x6C42;
//&#x8FD9;&#x56DB;&#x53E5;&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x4F4F;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>myButton.addEventListener(<span class="hljs-string">&quot;click&quot;</span>,<span class="hljs-function">(<span class="hljs-params">e</span>)=&gt;</span>{
<span class="hljs-comment">//&#x8FD9;&#x56DB;&#x53E5;&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x4F4F;</span>
    <span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
    request.onreadystatechange = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-keyword">if</span>(request.readyState === XMLHttpRequest.DONE &amp;&amp; request.status === <span class="hljs-number">200</span>) {
    <span class="hljs-built_in">console</span>.log(request.responseText)
  }
    }
    request.open(<span class="hljs-string">&apos;GET&apos;</span>,<span class="hljs-string">&apos;/xxx&apos;</span>)<span class="hljs-comment">//&#x914D;&#x7F6E;request.&#x53C2;&#x6570;&#x5206;&#x522B;&#x4E3A;&#x65B9;&#x6CD5;&#x548C;&#x8DEF;&#x5F84;</span>
    request.send();<span class="hljs-comment">//&#x53D1;&#x9001;&#x8BF7;&#x6C42;</span>
<span class="hljs-comment">//&#x8FD9;&#x56DB;&#x53E5;&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x4F4F;</span>
})</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ajax学习与理解

## 原文链接
[https://segmentfault.com/a/1190000015832028](https://segmentfault.com/a/1190000015832028)

