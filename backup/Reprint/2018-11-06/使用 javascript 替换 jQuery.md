---
title: 使用 javascript 替换 jQuery
hidden: true
categories: [reprint]
slug: f1bb2c40
date: 2018-11-06 02:30:12
---

{{< raw >}}
<h1 id="articleHeader0">&#x4F7F;&#x7528; javascript &#x66FF;&#x6362; jQuery</h1><blockquote>jQuery &#x66FE;&#x98CE;&#x9761;&#x4E00;&#x4E2A;&#x65F6;&#x4EE3;&#xFF0C;&#x5927;&#x5927;&#x964D;&#x4F4E;&#x4E86;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x7684;&#x95E8;&#x69DB;&#xFF0C;&#x4E30;&#x5BCC;&#x7684;&#x63D2;&#x4EF6;&#x4E5F;&#x662F;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8005;&#x5F97;&#x5FC3;&#x5E94;&#x624B;&#x7684;&#x6B66;&#x5668;&#x5E93;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x4EE3;&#x7EC8;&#x4E8E;&#x8981;&#x843D;&#x5E55;&#x4E86;&#x3002;&#x968F;&#x7740; JS &#x6807;&#x51C6;&#x548C;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x8FDB;&#x6B65;&#xFF0C;jQuery &#x7684;&#x5F88;&#x591A;&#x7CBE;&#x534E;&#x88AB;&#x539F;&#x751F; JS &#x5438;&#x6536;&#xFF0C;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x539F;&#x751F; API &#x5C31;&#x53EF;&#x4EE5;&#x7528;&#x7C7B;&#x4F3C;&#x624B;&#x6CD5;&#x6765;&#x5904;&#x7406;&#x4EE5;&#x524D;&#x9700;&#x8981; jQuery &#x7684;&#x95EE;&#x9898;&#x3002;&#x5728;&#x65B0;&#x7684; Web &#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x9700;&#x8981;&#x652F;&#x6301;&#x8FC7;&#x4E8E;&#x9648;&#x65E7;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x7248;&#x672C;&#xFF0C;&#x90A3;&#x4E48;&#x7684;&#x786E;&#x6CA1;&#x6709;&#x5FC5;&#x8981;&#x4F7F;&#x7528; jQuery&#x3002;</blockquote><p>&#x4E0B;&#x9762;&#x5C31;&#x63A2;&#x8BA8;&#x5982;&#x4F55;&#x7528;JavaScript&#xFF08;ES6&#xFF09;&#x6807;&#x51C6;&#x8BED;&#x6CD5;&#xFF0C;&#x53D6;&#x4EE3;jQuery&#x7684;&#x4E00;&#x4E9B;&#x4E3B;&#x8981;&#x529F;&#x80FD;&#x3002;</p><h2 id="articleHeader1">&#x9009;&#x53D6;&#x5143;&#x7D20;</h2><h3 id="articleHeader2">&#x9009;&#x62E9;&#x5668;&#x67E5;&#x8BE2;</h3><p>&#x5E38;&#x7528;&#x7684; class&#x3001;id&#x3001;&#x5C5E;&#x6027; &#x9009;&#x62E9;&#x5668;&#x90FD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; document.querySelector &#x6216; document.querySelectorAll &#x66FF;&#x4EE3;&#x3002;</p><ul><li>document.querySelector &#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x5339;&#x914D;&#x7684; Element</li><li>document.querySelectorAll &#x8FD4;&#x56DE;&#x6240;&#x6709;&#x5339;&#x914D;&#x7684; Element &#x7EC4;&#x6210;&#x7684; NodeList&#x3002;</li></ul><p>jQuery&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $ele = $(&quot;selector&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> $ele = $(<span class="hljs-string">&quot;selector&quot;</span>);</code></pre><p>Native:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let ele = document.querySelectorAll(&quot;selector&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">let</span> ele = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&quot;selector&quot;</span>);</code></pre><h3 id="articleHeader3">&#x9009;&#x62E9;&#x5668;&#x6A21;&#x5F0F;</h3><table><thead><tr><th>&#x9009;&#x62E9;&#x5668;</th><th>&#x793A;&#x4F8B;</th><th>&#x793A;&#x4F8B;&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td>.class</td><td>.intro</td><td>&#x9009;&#x62E9;&#x6240;&#x6709;class=&quot;intro&quot;&#x7684;&#x5143;&#x7D20;</td></tr><tr><td>#id</td><td>#firstname</td><td>&#x9009;&#x62E9;&#x6240;&#x6709;id=&quot;firstname&quot;&#x7684;&#x5143;&#x7D20;</td></tr><tr><td>*</td><td>*</td><td>&#x9009;&#x62E9;&#x6240;&#x6709;&#x5143;&#x7D20;</td></tr><tr><td>element</td><td>p</td><td>&#x9009;&#x62E9;&#x6240;&#x6709;&lt;p&gt;&#x5143;&#x7D20;</td></tr><tr><td>element,element</td><td>div,p</td><td>&#x9009;&#x62E9;&#x6240;&#x6709;&lt;div&gt;&#x5143;&#x7D20;&#x548C;&lt;p&gt;&#x5143;&#x7D20;</td></tr><tr><td>element element</td><td>div p</td><td>&#x9009;&#x62E9;&lt;div&gt;&#x5143;&#x7D20;&#x5185;&#x7684;&#x6240;&#x6709;&lt;p&gt;&#x5143;&#x7D20;</td></tr><tr><td>element&gt;element</td><td>div&gt;p</td><td>&#x9009;&#x62E9;&#x6240;&#x6709;&#x7236;&#x7EA7;&#x662F;&lt;div&gt;&#x5143;&#x7D20;&#x7684; &lt;p&gt;&#x5143;&#x7D20;</td></tr><tr><td>element+element</td><td>div+p</td><td>&#x9009;&#x62E9;&#x6240;&#x6709;&#x7D27;&#x63A5;&#x7740;&lt;div&gt;&#x5143;&#x7D20;&#x4E4B;&#x540E;&#x7684;&lt;p&gt;&#x5143;&#x7D20;</td></tr><tr><td>[attribute=value]</td><td>a[target=_blank]</td><td>&#x9009;&#x62E9;&#x6240;&#x6709;&#x4F7F;&#x7528;target=&quot;_blank&quot;&#x7684;&lt;a&gt;&#x5143;&#x7D20;</td></tr><tr><td>[attribute^=value]</td><td>a[src^=&quot;http&quot;]</td><td>&#x9009;&#x62E9;&#x6BCF;&#x4E00;&#x4E2A;src&#x5C5E;&#x6027;&#x7684;&#x503C;&#x4EE5;&quot;http&quot;&#x5F00;&#x5934;&#x7684;&lt;a&gt;&#x5143;&#x7D20;</td></tr><tr><td>[attribute$=value]</td><td>a[src$=&quot;.jpg&quot;]</td><td>&#x9009;&#x62E9;&#x6BCF;&#x4E00;&#x4E2A;src&#x5C5E;&#x6027;&#x7684;&#x503C;&#x4EE5;&quot;.jpg&quot;&#x7ED3;&#x5C3E;&#x7684;&lt;a&gt;&#x5143;&#x7D20;</td></tr><tr><td>:first-child</td><td>ul li:first-child</td><td>&#x9009;&#x62E9;&lt;ul&gt;&#x5143;&#x7D20;&#x4E0B;&#x7684;&#x9996;&#x4E2A;&lt;li&gt;&#x5143;&#x7D20;</td></tr><tr><td>:nth-child(n)</td><td>ul li:nth-child(3)</td><td>&#x9009;&#x62E9;&lt;ul&gt;&#x5143;&#x7D20;&#x4E0B;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&lt;li&gt;&#x5143;&#x7D20;</td></tr><tr><td>:last-child</td><td>ul li:last-child</td><td>&#x9009;&#x62E9;&lt;ul&gt;&#x5143;&#x7D20;&#x4E0B;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&lt;li&gt;&#x5143;&#x7D20;</td></tr></tbody></table><h3 id="articleHeader4">DOM &#x6811;&#x67E5;&#x8BE2;</h3><table><thead><tr><th>jQuery</th><th>Native</th><th>&#x65B9;&#x6CD5;&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td><code>$ele.parent()</code></td><td><code>ele.parentNode</code></td><td>&#x5143;&#x7D20;&#x7684;&#x76F4;&#x63A5;&#x7236;&#x5143;&#x7D20;</td></tr><tr><td><code>$ele.children()</code></td><td><code>ele.childNodes</code></td><td>&#x5143;&#x7D20;&#x7684;&#x6240;&#x6709;&#x76F4;&#x63A5;&#x5B50;&#x5143;&#x7D20;</td></tr><tr><td><code>$ele.find(&quot;a&quot;)</code></td><td><code>ele.querySelectorAll(&quot;a&quot;)</code></td><td>&#x5143;&#x7D20;&#x7684;&#x540E;&#x4EE3;&#x5143;&#x7D20;</td></tr><tr><td><code>$ele.prev()</code></td><td><code>ele.previousElementSibling</code></td><td>&#x5143;&#x7D20;&#x7684;&#x4E0A;&#x4E00;&#x4E2A;&#x540C;&#x80DE;&#x5143;&#x7D20;</td></tr><tr><td><code>$ele.next()</code></td><td><code>ele.nextElementSibling</code></td><td>&#x5143;&#x7D20;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x540C;&#x80DE;&#x5143;&#x7D20;</td></tr></tbody></table><h2 id="articleHeader5">DOM &#x64CD;&#x4F5C;</h2><p>DOM&#x672C;&#x8EAB;&#x5C31;&#x5177;&#x6709;&#x5F88;&#x4E30;&#x5BCC;&#x7684;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x53D6;&#x4EE3;jQuery&#x63D0;&#x4F9B;&#x7684;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#x3002;</p><h3 id="articleHeader6">&#x5185;&#x5BB9;&#x548C;&#x5C5E;&#x6027;</h3><table><thead><tr><th>jQuery</th><th>Native</th><th>&#x65B9;&#x6CD5;&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td><code>var text = $ele.text()</code></td><td><code>let text = ele.innerText</code></td><td>&#x83B7;&#x53D6;&#x6240;&#x9009;&#x5143;&#x7D20;&#x7684;&#x6587;&#x672C;&#x5185;&#x5BB9;</td></tr><tr><td><code>$ele.text(&quot;text&quot;)</code></td><td><code>ele.innerText = &quot;text&quot;</code></td><td>&#x8BBE;&#x7F6E;&#x6240;&#x9009;&#x5143;&#x7D20;&#x7684;&#x6587;&#x672C;&#x5185;&#x5BB9;</td></tr><tr><td><code>var html = $ele.html()</code></td><td><code>let html = ele.innerHTML</code></td><td>&#x83B7;&#x53D6;&#x6240;&#x9009;&#x5143;&#x7D20;&#x7684;HTML&#x5185;&#x5BB9;</td></tr><tr><td><code>$ele.html(&quot;&lt;div&gt;html&lt;/div&gt;&quot;)</code></td><td><code>ele.innerHTML = &quot;&lt;div&gt;html&lt;/div&gt;&quot;</code></td><td>&#x8BBE;&#x7F6E;&#x6240;&#x9009;&#x5143;&#x7D20;&#x7684;HTML&#x5185;&#x5BB9;</td></tr><tr><td><code>var input = $ele.val()</code></td><td><code>let input = ele.value</code></td><td>&#x83B7;&#x53D6;&#x8868;&#x5355;&#x5B57;&#x6BB5;&#x7684;&#x503C;</td></tr><tr><td><code>$ele.val(&quot;input&quot;)</code></td><td><code>ele.value = &quot;input&quot;</code></td><td>&#x8BBE;&#x7F6E;&#x8868;&#x5355;&#x5B57;&#x6BB5;&#x7684;&#x503C;</td></tr><tr><td><code>var href = $ele.attr(&quot;href&quot;)</code></td><td><code>let href = ele.getAttribute(&quot;href&quot;)</code></td><td>&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;&#x5C5E;&#x6027;&#x503C;</td></tr><tr><td><code>$ele.attr(&quot;href&quot;, &quot;/&quot;)</code></td><td><code>ele.setAttribute(&quot;href&quot;, &quot;/&quot;)</code></td><td>&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x7684;&#x5C5E;&#x6027;&#x503C;</td></tr></tbody></table><h3 id="articleHeader7">&#x4FEE;&#x6539; DOM &#x6811;</h3><table><thead><tr><th>jQuery</th><th>Native</th><th>&#x65B9;&#x6CD5;&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td><code>$parent.append($ele)</code></td><td><code>parent.appendChild(ele)</code></td><td>&#x5728;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x7ED3;&#x5C3E;&#x63D2;&#x5165;&#x5185;&#x5BB9;</td></tr><tr><td><code>$parent.prepend($ele)</code></td><td><code>parent.insertBefore(ele, parent.firstChild)</code></td><td>&#x5728;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x7684;&#x5F00;&#x5934;&#x63D2;&#x5165;&#x5185;&#x5BB9;</td></tr><tr><td><code>$ele.after(html)</code></td><td><code>ele.insertAdjacentHTML(&quot;afterend&quot;, html)</code></td><td>&#x5728;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x4E4B;&#x540E;&#x63D2;&#x5165;&#x5185;&#x5BB9;</td></tr><tr><td><code>$ele.before(html)</code></td><td><code>ele.insertAdjacentHTML(&quot;beforebegin&quot;, html)</code></td><td>&#x5728;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x4E4B;&#x524D;&#x63D2;&#x5165;&#x5185;&#x5BB9;</td></tr><tr><td><code>$ele.remove()</code></td><td><code>ele.parentNode.removeChild(ele)</code></td><td>&#x5220;&#x9664;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x53CA;&#x5176;&#x5B50;&#x5143;&#x7D20;</td></tr><tr><td><code>$ele.empty()</code></td><td><code>ele.innerHTML = null</code></td><td>&#x4ECE;&#x88AB;&#x9009;&#x5143;&#x7D20;&#x4E2D;&#x5220;&#x9664;&#x5B50;&#x5143;&#x7D20;</td></tr><tr><td><code>$ele.clone()</code></td><td><code>ele.cloneNode(true)</code></td><td>&#x62F7;&#x8D1D;&#x88AB;&#x9009;&#x5143;&#x7D20;</td></tr><tr><td><code>$ele.replaceWith(html)</code></td><td><code>ele.outerHTML = html</code></td><td>&#x6307;&#x5B9A;HTML&#x66FF;&#x6362;&#x88AB;&#x9009;&#x5143;&#x7D20;</td></tr></tbody></table><h2 id="articleHeader8">CSS &#x6837;&#x5F0F;</h2><h3 id="articleHeader9">&#x8BBE;&#x7F6E; Style</h3><p>HTML DOM &#x5141;&#x8BB8; JavaScript &#x6539;&#x53D8; HTML &#x5143;&#x7D20;&#x7684;&#x6837;&#x5F0F;&#xFF0C;Native API &#x63D0;&#x4F9B;&#x4E86;&#x5982;&#x4E0B;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;</p><ul><li>ele.setAttribute &#x76F4;&#x63A5;&#x4FEE;&#x6539; DOM style &#x5C5E;&#x6027;&#x6539;&#x53D8;&#x6837;&#x5F0F;</li><li>ele.style.cssText &#x901A;&#x8FC7; cssText &#x4FEE;&#x6539; Style &#x5C5E;&#x6027;</li><li>ele.style.property &#x901A;&#x8FC7; style &#x5BF9;&#x8C61;&#x8BFB;&#x5199;&#x884C;&#x5185; CSS &#x6837;&#x5F0F;</li></ul><p>jQuery&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var size = $ele.css(&quot;font-size&quot;); // &#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x5339;&#x914D;&#x5143;&#x7D20;&#x7684; CSS &#x5C5E;&#x6027;&#x503C;
$ele.css(&quot;font-size&quot;, &quot;2rem&quot;); // &#x4E3A;&#x6240;&#x6709;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x6307;&#x5B9A;&#x7684; CSS &#x5C5E;&#x6027;&#x503C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> size = $ele.css(<span class="hljs-string">&quot;font-size&quot;</span>); <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x7B2C;&#x4E00;&#x4E2A;&#x5339;&#x914D;&#x5143;&#x7D20;&#x7684; CSS &#x5C5E;&#x6027;&#x503C;</span>
$ele.css(<span class="hljs-string">&quot;font-size&quot;</span>, <span class="hljs-string">&quot;2rem&quot;</span>); <span class="hljs-comment">// &#x4E3A;&#x6240;&#x6709;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x6307;&#x5B9A;&#x7684; CSS &#x5C5E;&#x6027;&#x503C;</span></code></pre><p>Native:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let size = getComputedStyle(ele)[&quot;font-size&quot;]; // &#x83B7;&#x53D6;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x8BA1;&#x7B97;&#x540E;&#x7684; CSS &#x5C5E;&#x6027;&#x503C;
ele.style.setProperty(&quot;font-size&quot;, &quot;2rem&quot;); // &#x8BBE;&#x7F6E;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x67D0;&#x4E2A;&#x5185;&#x8054;&#x6837;&#x5F0F;
ele.style.removeProperty(&quot;font-size&quot;);  // &#x79FB;&#x9664;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x67D0;&#x4E2A;&#x5185;&#x8054;&#x6837;&#x5F0F;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> size = getComputedStyle(ele)[<span class="hljs-string">&quot;font-size&quot;</span>]; <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x8BA1;&#x7B97;&#x540E;&#x7684; CSS &#x5C5E;&#x6027;&#x503C;</span>
ele.style.setProperty(<span class="hljs-string">&quot;font-size&quot;</span>, <span class="hljs-string">&quot;2rem&quot;</span>); <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x67D0;&#x4E2A;&#x5185;&#x8054;&#x6837;&#x5F0F;</span>
ele.style.removeProperty(<span class="hljs-string">&quot;font-size&quot;</span>);  <span class="hljs-comment">// &#x79FB;&#x9664;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x67D0;&#x4E2A;&#x5185;&#x8054;&#x6837;&#x5F0F;</span></code></pre><h3 id="articleHeader10">&#x8BBE;&#x7F6E; Class</h3><table><thead><tr><th>jQuery</th><th>Native</th><th>&#x65B9;&#x6CD5;&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td><code>$ele.hasClass(className)</code></td><td><code>ele.classList.contains(className)</code></td><td>&#x68C0;&#x67E5;&#x5143;&#x7D20;&#x662F;&#x5426;&#x5305;&#x542B;&#x6307;&#x5B9A;&#x7684;&#x7C7B;&#x540D;</td></tr><tr><td><code>$ele.addClass(className)</code></td><td><code>ele.classList.add(className)</code></td><td>&#x5411;&#x5143;&#x7D20;&#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x7C7B;&#x540D;</td></tr><tr><td><code>$ele.removeClass(className)</code></td><td><code>ele.classList.remove(className)</code></td><td>&#x4ECE;&#x5143;&#x7D20;&#x4E2D;&#x79FB;&#x9664;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x7C7B;</td></tr><tr><td><code>$ele.toggleClass(className)</code></td><td><code>ele.classList.toggle(className)</code></td><td>&#x5BF9;&#x5143;&#x7D20;&#x7684;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x7C7B;&#x8FDB;&#x884C;&#x5207;&#x6362;</td></tr></tbody></table><h2 id="articleHeader11">&#x4E8B;&#x4EF6;&#x65B9;&#x6CD5;</h2><h3 id="articleHeader12">&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;</h3><p>jQuery&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ele.on(&quot;click&quot;, function (evt) {
    console.log(evt.target);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">$ele.on(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">evt</span>) </span>{
    <span class="hljs-built_in">console</span>.log(evt.target);
});</code></pre><p>Native:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ele.addEventListener(&quot;click&quot;, evt =&gt; {
    console.log(evt.target);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">ele.addEventListener(<span class="hljs-string">&quot;click&quot;</span>, evt =&gt; {
    <span class="hljs-built_in">console</span>.log(evt.target);
});</code></pre><h3 id="articleHeader13">&#x89E3;&#x9664;&#x7ED1;&#x5B9A;</h3><p>jQuery&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ele.off(&quot;click&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">$ele.off(<span class="hljs-string">&quot;click&quot;</span>);</code></pre><p>Native:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ele.removeEventListener(&quot;click&quot;, func);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">ele.removeEventListener(<span class="hljs-string">&quot;click&quot;</span>, func);</code></pre><p><strong>&#x5982;&#x679C;&#x8981;&#x79FB;&#x9664;&#x4E8B;&#x4EF6;&#xFF0C;addEventListener &#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x5916;&#x90E8;&#x51FD;&#x6570;&#xFF0C;&#x7ED1;&#x5B9A;&#x533F;&#x540D;&#x51FD;&#x6570;&#x7684;&#x4E8B;&#x4EF6;&#x662F;&#x65E0;&#x6CD5;&#x79FB;&#x9664;&#x7684;&#x3002;</strong></p><h3 id="articleHeader14">&#x6A21;&#x62DF;&#x89E6;&#x53D1;</h3><p>jQuery&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ele.trigger(&quot;click&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">$ele.trigger(<span class="hljs-string">&quot;click&quot;</span>);</code></pre><p>Native:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let event = document.createEvent(&quot;MouseEvents&quot;);
event.initMouseEvent(&quot;click&quot;);
ele.dispatchEvent(event);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> event = <span class="hljs-built_in">document</span>.createEvent(<span class="hljs-string">&quot;MouseEvents&quot;</span>);
event.initMouseEvent(<span class="hljs-string">&quot;click&quot;</span>);
ele.dispatchEvent(event);</code></pre><p>&#x6A21;&#x62DF;&#x4E8B;&#x4EF6;&#xFF1A;</p><ol><li>&#x9996;&#x5148;&#x901A;&#x8FC7; document.createEvent &#x65B9;&#x6CD5;&#x521B;&#x5EFA; Event &#x5BF9;&#x8C61;&#x3002;</li><li>&#x7136;&#x540E;&#x5229;&#x7528; Event &#x5BF9;&#x8C61;&#x7684; init &#x65B9;&#x6CD5;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#x3002;</li><li>&#x6700;&#x540E;&#x4F7F;&#x7528; dispatchEvent &#x65B9;&#x6CD5;&#x89E6;&#x53D1; Event &#x5BF9;&#x8C61;&#x3002;</li></ol><p>&#x8BE6;&#x89C1;&#xFF1A;<a href="https://segmentfault.com/a/1190000004339133">JavaScript &#x4E8B;&#x4EF6;&#x2014;&#x2014;&#x201C;&#x6A21;&#x62DF;&#x4E8B;&#x4EF6;&#x201D;&#x7684;&#x6CE8;&#x610F;&#x8981;&#x70B9;</a></p><h2 id="articleHeader15">Ajax</h2><h3 id="articleHeader16">jQuery</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
    url: &quot;http://apis.juhe.cn/ip/ip2addr&quot;,
    type: &quot;GET&quot;,
    data: {
        &quot;key&quot;: &quot;80701ec21437ca36ca466af27bb8e8d3&quot;,
        &quot;ip&quot;: &quot;220.181.57.216&quot;
    },
    dataType: &quot;json&quot;,
    success: function (data) {
        console.log(data);
    }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">$.ajax({
    <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;http://apis.juhe.cn/ip/ip2addr&quot;</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;GET&quot;</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;80701ec21437ca36ca466af27bb8e8d3&quot;</span>,
        <span class="hljs-string">&quot;ip&quot;</span>: <span class="hljs-string">&quot;220.181.57.216&quot;</span>
    },
    <span class="hljs-attr">dataType</span>: <span class="hljs-string">&quot;json&quot;</span>,
    <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data);
    }
});</code></pre><h3 id="articleHeader17">XHR &#x5C01;&#x88C5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.ajax = async function (params, callback) {
    let url = params.url;
    let method = params.method;
    let data = params.data;
    let body = new FormData();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            body.append(key, data[key]);
        }
    }
    let xhr = new XMLHttpRequest();
    xhr.timeout = 3000;
    xhr.open(method, url, true);
    xhr.addEventListener(&quot;readystatechange&quot;, evt =&gt; {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr.response);
            } else {
                throw xhr.statusText;
            }
        }
    });
    xhr.send(body);
};

ajax({
        url: &quot;http://apis.juhe.cn/ip/ip2addr&quot;,
        method: &quot;GET&quot;,
        data: {
            &quot;key&quot;: &quot;80701ec21437ca36ca466af27bb8e8d3&quot;,
            &quot;ip&quot;: &quot;220.181.57.216&quot;
        }
    },function (resp) {
        var json = JSON.parse(resp);
        console.log(json);
    }
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.ajax = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">params, callback</span>) </span>{
    <span class="hljs-keyword">let</span> url = params.url;
    <span class="hljs-keyword">let</span> method = params.method;
    <span class="hljs-keyword">let</span> data = params.data;
    <span class="hljs-keyword">let</span> body = <span class="hljs-keyword">new</span> FormData();
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> data) {
        <span class="hljs-keyword">if</span> (data.hasOwnProperty(key)) {
            body.append(key, data[key]);
        }
    }
    <span class="hljs-keyword">let</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    xhr.timeout = <span class="hljs-number">3000</span>;
    xhr.open(method, url, <span class="hljs-literal">true</span>);
    xhr.addEventListener(<span class="hljs-string">&quot;readystatechange&quot;</span>, evt =&gt; {
        <span class="hljs-keyword">if</span> (xhr.readyState === <span class="hljs-number">4</span>) {
            <span class="hljs-keyword">if</span> (xhr.status === <span class="hljs-number">200</span>) {
                callback(xhr.response);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">throw</span> xhr.statusText;
            }
        }
    });
    xhr.send(body);
};

ajax({
        <span class="hljs-attr">url</span>: <span class="hljs-string">&quot;http://apis.juhe.cn/ip/ip2addr&quot;</span>,
        <span class="hljs-attr">method</span>: <span class="hljs-string">&quot;GET&quot;</span>,
        <span class="hljs-attr">data</span>: {
            <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;80701ec21437ca36ca466af27bb8e8d3&quot;</span>,
            <span class="hljs-string">&quot;ip&quot;</span>: <span class="hljs-string">&quot;220.181.57.216&quot;</span>
        }
    },<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resp</span>) </span>{
        <span class="hljs-keyword">var</span> json = <span class="hljs-built_in">JSON</span>.parse(resp);
        <span class="hljs-built_in">console</span>.log(json);
    }
)</code></pre><h3 id="articleHeader18">Fetch API</h3><p>XMLHttpRequest &#x5E76;&#x4E0D;&#x662F;&#x4E13;&#x4E3A; Ajax &#x800C;&#x8BBE;&#x8BA1;&#x7684;. &#x867D;&#x7136;&#x5404;&#x79CD;&#x6846;&#x67B6;&#x5BF9; XHR &#x7684;&#x5C01;&#x88C5;&#x5DF2;&#x7ECF;&#x8DB3;&#x591F;&#x597D;&#x7528;, &#x4F46;&#x66F4;&#x597D;&#x7528;&#x7684; API &#x662F; fetch &#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x6784;&#x9020;&#x8BF7;&#x6C42;&#x5BF9;&#x8C61; */
let request = new Request(
    &quot;http://apis.juhe.cn/ip/ip2addr&quot;,
    {
        method: &quot;GET&quot;,
        body: {
            &quot;key&quot;: &quot;80701ec21437ca36ca466af27bb8e8d3&quot;,
            &quot;ip&quot;: &quot;220.181.57.216&quot;
        },
        headers: new Headers()
    }
);
/* &#x5904;&#x7406;&#x54CD;&#x5E94;&#x5BF9;&#x8C61; */
fetch(request)
    .then(response =&gt; response.json())
    .then(function (data) {
        console.log(data);
    })
    .catch(function (error) {
        console.log(error);
    });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* &#x6784;&#x9020;&#x8BF7;&#x6C42;&#x5BF9;&#x8C61; */</span>
<span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> Request(
    <span class="hljs-string">&quot;http://apis.juhe.cn/ip/ip2addr&quot;</span>,
    {
        <span class="hljs-attr">method</span>: <span class="hljs-string">&quot;GET&quot;</span>,
        <span class="hljs-attr">body</span>: {
            <span class="hljs-string">&quot;key&quot;</span>: <span class="hljs-string">&quot;80701ec21437ca36ca466af27bb8e8d3&quot;</span>,
            <span class="hljs-string">&quot;ip&quot;</span>: <span class="hljs-string">&quot;220.181.57.216&quot;</span>
        },
        <span class="hljs-attr">headers</span>: <span class="hljs-keyword">new</span> Headers()
    }
);
<span class="hljs-comment">/* &#x5904;&#x7406;&#x54CD;&#x5E94;&#x5BF9;&#x8C61; */</span>
fetch(request)
    .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data);
    })
    .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
        <span class="hljs-built_in">console</span>.log(error);
    });</code></pre><p>&#x8BE6;&#x89C1;&#xFF1A;<a href="https://segmentfault.com/a/1190000007019545" target="_blank">fetch&#x7528;&#x6CD5;&#x8BF4;&#x660E;</a></p><h2 id="articleHeader19">&#x5DE5;&#x5177;</h2><h3 id="articleHeader20">Array</h3><table><thead><tr><th>jQuery</th><th>Native</th><th>&#x65B9;&#x6CD5;&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td><code>$.isArray(array)</code></td><td><code>Array.isArray(array)</code></td><td>&#x5224;&#x65AD;&#x53C2;&#x6570;&#x662F;&#x5426;&#x4E3A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;</td></tr><tr><td><code>$.inArray(item, array)</code></td><td><code>array.includes(item)</code></td><td>&#x5224;&#x65AD;&#x503C;&#x662F;&#x5426;&#x5728;&#x6307;&#x5B9A;&#x6570;&#x7EC4;&#x4E2D;</td></tr><tr><td><code>$.makeArray(objlist)</code></td><td><code>Array.from(objlist)</code></td><td>&#x5C06;&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x8F6C;&#x6362;&#x4E3A;&#x6570;&#x7EC4;</td></tr><tr><td><code>$.merge(array1, array2)</code></td><td><code>array1.concat(array2)</code></td><td>&#x5408;&#x5E76;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#xFF08;&#x6709;&#x533A;&#x522B;&#xFF09;</td></tr><tr><td><code>$.each(array, function (i, item) {}</code></td><td><code>array.forEach((item, i) =&gt; {})</code></td><td>&#x904D;&#x5386;&#x6307;&#x5B9A;&#x7684;&#x5BF9;&#x8C61;&#x548C;&#x6570;&#x7EC4;</td></tr></tbody></table><p><strong>&#x5408;&#x5E76;&#x6570;&#x7EC4;&#x65F6;&#xFF0C;merge &#x4F1A;&#x6539;&#x53D8;&#x539F;&#x6570;&#x7EC4;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x800C; concat &#x4E0D;&#x4F1A;&#x4FEE;&#x6539;&#x539F;&#x6570;&#x7EC4;&#xFF0C;&#x53EA;&#x4F1A;&#x8FD4;&#x56DE;&#x5408;&#x5E76;&#x540E;&#x7684;&#x6570;&#x7EC4;</strong></p><h3 id="articleHeader21">Method</h3><table><thead><tr><th>jQuery</th><th>Native</th><th>&#x65B9;&#x6CD5;&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td><code>$.now()</code></td><td><code>Date.now()</code></td><td>&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#x6233;</td></tr><tr><td><code>$.trim(context)</code></td><td><code>context.trim()</code></td><td>&#x79FB;&#x9664;&#x5B57;&#x7B26;&#x4E32;&#x5934;&#x5C3E;&#x7A7A;&#x767D;</td></tr><tr><td><code>$.type(parameter)</code></td><td><code>typeof parameter</code></td><td>&#x68C0;&#x6D4B;&#x53C2;&#x6570;&#x7684;&#x5185;&#x90E8;&#x7C7B;&#x578B;</td></tr><tr><td><code>$.parseJSON(jsonstr)</code></td><td><code>JSON.parse(jsonstr)</code></td><td>&#x5C06;JSON&#x8F6C;&#x6362;&#x4E3A;JS&#x5BF9;&#x8C61;</td></tr><tr><td><code>$ele.data(&quot;key&quot;, &quot;value&quot;)</code></td><td><code>ele.dataset.key = &quot;value&quot;</code></td><td>&#x5728;&#x6307;&#x5B9A;&#x7684;&#x5143;&#x7D20;&#x4E0A;&#x5B58;&#x50A8;&#x6570;&#x636E;</td></tr><tr><td><code>$.map(array, function (item, i) {})</code></td><td><code>array.map((item, i) =&gt; {})</code></td><td>&#x5C06;&#x6570;&#x7EC4;&#x8F6C;&#x5316;&#x4E3A;&#x5904;&#x7406;&#x540E;&#x7684;&#x65B0;&#x6570;&#x7EC4;</td></tr></tbody></table>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 javascript 替换 jQuery

## 原文链接
[https://segmentfault.com/a/1190000016568472](https://segmentfault.com/a/1190000016568472)

