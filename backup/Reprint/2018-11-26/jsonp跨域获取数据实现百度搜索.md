---
title: 'jsonp跨域获取数据实现百度搜索' 
date: 2018-11-26 2:30:10
hidden: true
slug: cik441r1lye
categories: [reprint]
---

{{< raw >}}
<p>&#x672C;&#x83DC;&#x9E21;&#x6700;&#x8FD1;&#x5728;&#x5199;&#x67D0;&#x4E2A;&#x9875;&#x9762;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x65F6;&#xFF0C;&#x62A5;&#x4E86;&#x5982;&#x4E0B;&#x7684;&#x9519;&#x8BEF;&#x3002;</p><blockquote>Failed to load <a href="https://..." rel="nofollow noreferrer" target="_blank">https://...</a>:<br>No &apos;Access-Control-Allow-Origin&apos; header is present on the requested resource.<br>Origin &apos;<a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:7070&apos; is therefore not allowed access.</blockquote><p>&#x4E86;&#x89E3;&#x539F;&#x56E0;&#x540E;&#xFF0C;&#x5F97;&#x77E5;&#x662F;&#x7531;&#x4E8E;&#x8DE8;&#x57DF;&#x8BF7;&#x6C42;&#x5BFC;&#x81F4;&#x7684;&#xFF0C;&#x5B66;&#x4E60;&#x4E86;&#x4E00;&#x4E0B;&#x8DE8;&#x57DF;&#x53CA;&#x540C;&#x6E90;&#x7B56;&#x7565;&#x76F8;&#x5173;&#x77E5;&#x8BC6;&#x540E;&#xFF0C;&#x5199;&#x4E86;&#x4E2A;demo&#x73A9;&#x73A9;</p><h2 id="articleHeader0">&#x7B80;&#x5355;&#x804A;&#x804A;&#x8DE8;&#x57DF;</h2><p>&#x8981;&#x4E86;&#x89E3;&#x8DE8;&#x57DF;&#xFF0C;&#x5FC5;&#x987B;&#x5148;&#x4E86;&#x89E3;&#x6D4F;&#x89C8;&#x5668;&#x540C;&#x6E90;&#x7B56;&#x7565;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x642C;&#x8FD0;&#x4E86;&#x4E00;&#x4E9B;&#x5927;&#x795E;&#x7684;&#x603B;&#x7ED3;</p><h3 id="articleHeader1">&#x4EC0;&#x4E48;&#x662F;&#x540C;&#x6E90;&#x7B56;&#x7565;&#xFF1F;</h3><p>&#x540C;&#x6E90;&#x7B56;&#x7565;/SOP&#xFF08;Same origin policy&#xFF09;&#x662F;&#x4E00;&#x79CD;&#x7EA6;&#x5B9A;&#xFF0C;&#x7531;Netscape&#x516C;&#x53F8;1995&#x5E74;&#x5F15;&#x5165;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x5B83;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x6700;&#x6838;&#x5FC3;&#x4E5F;&#x6700;&#x57FA;&#x672C;&#x7684;&#x5B89;&#x5168;&#x529F;&#x80FD;&#xFF0C;&#x5982;&#x679C;&#x7F3A;&#x5C11;&#x4E86;&#x540C;&#x6E90;&#x7B56;&#x7565;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5F88;&#x5BB9;&#x6613;&#x53D7;&#x5230;XSS&#x3001;CSFR&#x7B49;&#x653B;&#x51FB;&#x3002;&#x6240;&#x8C13;&#x540C;&#x6E90;&#x662F;&#x6307;&quot;&#x534F;&#x8BAE;+&#x57DF;&#x540D;+&#x7AEF;&#x53E3;&quot;&#x4E09;&#x8005;&#x76F8;&#x540C;&#xFF0C;&#x5373;&#x4FBF;&#x4E24;&#x4E2A;&#x4E0D;&#x540C;&#x7684;&#x57DF;&#x540D;&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;ip&#x5730;&#x5740;&#xFF0C;&#x4E5F;&#x975E;&#x540C;&#x6E90;&#x3002;</p><p>&#x540C;&#x6E90;&#x7B56;&#x7565;&#x9650;&#x5236;&#x4EE5;&#x4E0B;&#x51E0;&#x79CD;&#x884C;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.Cookie&#x3001;LocalStorage &#x548C; IndexDB &#x65E0;&#x6CD5;&#x8BFB;&#x53D6;
2.DOM &#x548C; Js&#x5BF9;&#x8C61;&#x65E0;&#x6CD5;&#x83B7;&#x5F97;
3.AJAX &#x8BF7;&#x6C42;&#x4E0D;&#x80FD;&#x53D1;&#x9001;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-number">1</span>.Cookie&#x3001;LocalStorage &#x548C; IndexDB &#x65E0;&#x6CD5;&#x8BFB;&#x53D6;
<span class="hljs-number">2</span><span class="hljs-selector-class">.DOM</span> &#x548C; Js&#x5BF9;&#x8C61;&#x65E0;&#x6CD5;&#x83B7;&#x5F97;
<span class="hljs-number">3</span><span class="hljs-selector-class">.AJAX</span> &#x8BF7;&#x6C42;&#x4E0D;&#x80FD;&#x53D1;&#x9001;
</code></pre><p>&#x5047;&#x8BBE;&#x6CA1;&#x6709;&#x540C;&#x6E90;&#x7B56;&#x7565;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x5728;A&#x7F51;&#x7AD9;&#x4E0B;&#x7684;cookie&#x5C31;&#x53EF;&#x4EE5;&#x88AB;&#x4EFB;&#x4F55;&#x4E00;&#x4E2A;&#x7F51;&#x7AD9;&#x62FF;&#x5230;&#xFF1B;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x7F51;&#x7AD9;&#x7684;&#x6240;&#x6709;&#x8005;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6211;&#x7684;cookie(&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x7684;&#x8EAB;&#x4EFD;)&#x5728;A&#x7F51;&#x7AD9;&#x4E0B;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x3002;&#x540C;&#x6E90;&#x7B56;&#x7565;&#x53EF;&#x4EE5;&#x7B97;&#x662F; web &#x524D;&#x7AEF;&#x5B89;&#x5168;&#x7684;&#x57FA;&#x77F3;&#xFF0C;&#x5982;&#x679C;&#x7F3A;&#x5C11;&#x540C;&#x6E90;&#x7B56;&#x7565;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4E5F;&#x5C31;&#x6CA1;&#x6709;&#x4E86;&#x5B89;&#x5168;&#x6027;&#x53EF;&#x8A00;&#x3002;</p><p>&#x540C;&#x6E90;&#x7B56;&#x7565;&#x505A;&#x4E86;&#x5F88;&#x4E25;&#x683C;&#x7684;&#x9650;&#x5236;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x5B9E;&#x9645;&#x7684;&#x573A;&#x666F;&#x4E2D;&#xFF0C;&#x53C8;&#x786E;&#x5B9E;&#x6709;&#x5F88;&#x591A;&#x5730;&#x65B9;&#x9700;&#x8981;&#x7A81;&#x7834;&#x540C;&#x6E90;&#x7B56;&#x7565;&#x7684;&#x9650;&#x5236;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x5E38;&#x8BF4;&#x7684;&#x8DE8;&#x57DF;&#x3002;<br>&#x8DE8;&#x57DF;&#x7684;&#x65B9;&#x6CD5;&#x6709;&#x5F88;&#x591A;&#xFF08;&#x5982;&#x63A5;&#x4E0B;&#x6765;&#x8981;&#x73A9;&#x7684;jsonp&#x8DE8;&#x57DF;&#xFF0C;&#x8FD8;&#x6709;cors&#x8DE8;&#x57DF;&#x8D44;&#x6E90;&#x5171;&#x4EAB;&#xFF0C;&#x53CD;&#x5411;&#x4EE3;&#x7406;&#x7B49;&#x7B49;&#xFF09;&#x3002;</p><h3 id="articleHeader2">&#x4F7F;&#x7528;jsonp&#x8DE8;&#x57DF;</h3><p>&#x7531;&#x4E8E;&#x540C;&#x6E90;&#x7B56;&#x7565;&#xFF0C;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x4F4D;&#x4E8E; server1.example.com &#x7684;&#x7F51;&#x9875;&#x65E0;&#x6CD5;&#x4E0E;&#x4E0D;&#x662F; server1.example.com&#x7684;&#x670D;&#x52A1;&#x5668;&#x6C9F;&#x901A;&#xFF0C;&#x800C;HTML&#x7684;<code>&lt;script&gt;</code> &#x5143;&#x7D20;&#x662F;&#x4E00;&#x4E2A;&#x4F8B;&#x5916;&#x3002;&#x5229;&#x7528;<code>&lt;script&gt;</code>&#x5143;&#x7D20;&#x7684;&#x8FD9;&#x4E2A;&#x5F00;&#x653E;&#x7B56;&#x7565;&#xFF0C;&#x7F51;&#x9875;&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x4ECE;&#x5176;&#x4ED6;&#x6765;&#x6E90;&#x52A8;&#x6001;&#x4EA7;&#x751F;&#x7684; JSON&#x8D44;&#x6599;&#xFF0C;&#x800C;&#x8FD9;&#x79CD;&#x4F7F;&#x7528;&#x6A21;&#x5F0F;&#x5C31;&#x662F;&#x6240;&#x8C13;&#x7684; JSONP&#x3002;&#x7528; JSONP &#x6293;&#x5230;&#x7684;&#x8D44;&#x6599;&#x5E76;&#x4E0D;&#x662F; JSON&#xFF0C;&#x800C;&#x662F;&#x4EFB;&#x610F;&#x7684;JavaScript&#xFF0C;&#x7528; JavaScript &#x76F4;&#x8BD1;&#x5668;&#x6267;&#x884C;&#x800C;&#x4E0D;&#x662F;&#x7528; JSON &#x89E3;&#x6790;&#x5668;&#x89E3;&#x6790;&#x3002;</p><p>&#x793A;&#x4F8B;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function handleResponse(response) {
   alert(`You get the data : ${response}`)
}
const script = document.createElement(&apos;script&apos;)
script.src = &apos;http://somesite.com/json/?callback=handleResponse&apos;
document.body.insertBefore(script, document.body.firstChild)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleResponse</span>(<span class="hljs-params">response</span>) </span>{
   alert(<span class="hljs-string">`You get the data : <span class="hljs-subst">${response}</span>`</span>)
}
<span class="hljs-keyword">const</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;script&apos;</span>)
script.src = <span class="hljs-string">&apos;http://somesite.com/json/?callback=handleResponse&apos;</span>
<span class="hljs-built_in">document</span>.body.insertBefore(script, <span class="hljs-built_in">document</span>.body.firstChild)
</code></pre><p>&#x8FD9;&#x91CC;&#x7684;callback&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5F88;&#x91CD;&#x8981;&#xFF0C;&#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x5728;body&#x4E2D;&#x7684;script&#x6807;&#x7B7E;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x88AB;&#x52A0;&#x8F7D;&#x7684;&#x6587;&#x4EF6;&#x4E0E;HTML&#x6587;&#x4EF6;&#x4E0B;&#x7684;&#x5176;&#x4ED6;JS&#x6587;&#x4EF6;&#x5171;&#x4EAB;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&lt;scritp&gt;&#x6807;&#x7B7E;&#x52A0;&#x8F7D;&#x5230;&#x7684;&#x8D44;&#x6E90;&#x662F;&#x53EF;&#x4EE5;&#x88AB;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x4E0B;&#x7684;&#x51FD;&#x6570;&#x6240;&#x4F7F;&#x7528;&#x7684;&#xFF01;</p><h2 id="articleHeader3">&#x73A9;&#x4E00;&#x73A9;&#xFF0C;&#x5199;&#x4E00;&#x4E2A;&#x767E;&#x5EA6;&#x641C;&#x7D22;&#x6846;</h2><p>&#x767E;&#x5EA6;&#x6709;&#x4E00;&#x4E2A;&#x5BF9;&#x5916;&#x66B4;&#x9732;&#x7684;&#x6570;&#x636E;&#x63A5;&#x53E3;&#xFF1A;<a href="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=1" rel="nofollow noreferrer" target="_blank">https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=1</a></p><p>&#x5728;chrome&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x6253;&#x5F00;&#x767E;&#x5EA6;&#x4E3B;&#x9875;&#xFF0C;&#x5728;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#x5728; netkwork &#x53EF;&#x4EE5;&#x627E;&#x5230;<br><span class="img-wrap"><img data-src="/img/remote/1460000015374118?w=974&amp;h=791" src="https://static.alili.tech/img/remote/1460000015374118?w=974&amp;h=791" alt="" title="" style="cursor:pointer"></span><br>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x62FF;&#x6765;&#x4F7F;&#x7528;&#xFF0C;&#x914D;&#x5408;jsonp&#x5C31;&#x80FD;&#x5B9E;&#x73B0;&#x8DE8;&#x57DF;&#x83B7;&#x53D6;&#x8F93;&#x5165;&#x6846;&#x5185;&#x5BB9;&#x76F8;&#x5173;&#x70ED;&#x70B9;&#x6570;&#x636E;&#x5E76;&#x70B9;&#x51FB;&#x8DF3;&#x8F6C;&#x4E86;&#xFF0C;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x8BF7;&#x770B;Github&#x9879;&#x76EE;&#x6E90;&#x7801;</p><p><strong>&#x5B9E;&#x73B0;&#x6548;&#x679C;</strong>&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015374119" src="https://static.alili.tech/img/remote/1460000015374119" alt="" title="" style="cursor:pointer"></span><br>&#x9875;&#x9762;&#x7ED3;&#x6784;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x5982;&#x56FE;:<br><span class="img-wrap"><img data-src="/img/remote/1460000015374120?w=601&amp;h=241" src="https://static.alili.tech/img/remote/1460000015374120?w=601&amp;h=241" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>jsonp&#x8DE8;&#x57DF;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  document.onkeyup = function () {
    var val = text.value
    var script = document.createElement(&apos;script&apos;)
    script.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&amp;cb=dosomething`;
    document.body.appendChild(script)
  }
  function dosomething (data) {
    var oUl = document.querySelector(&apos;#lists ul&apos;)
    oUl.innerHTML = &apos;&apos;
    data.s.map(function (html) {
      var oLi =  document.createElement(&apos;li&apos;)
      oLi.innerHTML = html
      oLi.onclick = function () {
        window.location.href = `http://www.baidu.com/s?wd=${html}`
      }
      oUl.appendChild(oLi)
    })
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>  document<span class="hljs-selector-class">.onkeyup</span> = function () {
    <span class="hljs-selector-tag">var</span> val = text<span class="hljs-selector-class">.value</span>
    <span class="hljs-selector-tag">var</span> script = document.createElement(<span class="hljs-string">&apos;script&apos;</span>)
    script<span class="hljs-selector-class">.src</span> = `https:<span class="hljs-comment">//sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&amp;cb=dosomething`;</span>
    document<span class="hljs-selector-class">.body</span><span class="hljs-selector-class">.appendChild</span>(script)
  }
  function dosomething (data) {
    <span class="hljs-selector-tag">var</span> oUl = document.querySelector(<span class="hljs-string">&apos;#lists ul&apos;</span>)
    oUl<span class="hljs-selector-class">.innerHTML</span> = <span class="hljs-string">&apos;&apos;</span>
    data<span class="hljs-selector-class">.s</span><span class="hljs-selector-class">.map</span>(function (html) {
      <span class="hljs-selector-tag">var</span> oLi =  document.createElement(<span class="hljs-string">&apos;li&apos;</span>)
      oLi<span class="hljs-selector-class">.innerHTML</span> = <span class="hljs-selector-tag">html</span>
      oLi<span class="hljs-selector-class">.onclick</span> = function () {
        window<span class="hljs-selector-class">.location</span><span class="hljs-selector-class">.href</span> = `http:<span class="hljs-comment">//www.baidu.com/s?wd=${html}`</span>
      }
      oUl.appendChild(oLi)
    })
}

</code></pre><p>&#x4EC5;&#x4EC5;&#x662F;&#x4E00;&#x4E2A;&#x5229;&#x7528;jsonp&#x5B9E;&#x73B0;&#x8DE8;&#x57DF;&#x7684;<strong>&#x7B80;&#x5355;&#x5C0F;demo</strong>&#xFF0C;&#x4FBF;&#x4E8E;&#x548C;&#x6211;&#x4E00;&#x6837;&#x7684;&#x65B0;&#x624B;&#x5B66;&#x4E60;&#xFF0C;&#x5176;&#x5B83;&#x7ED3;&#x6784;&#x548C;&#x6837;&#x5F0F;&#x6587;&#x4EF6;&#x5C31;&#x4E0D;&#x4E00;&#x4E00;&#x5217;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x5230;&#x6211;&#x4E0B;&#x8F7D;&#x6211;&#x7684;&#x5B8C;&#x6574;&#x9879;&#x76EE;&#x67E5;&#x770B;<br>&#x5B8C;&#x6574;&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/hx-dl/baidu_demo.git" rel="nofollow noreferrer" target="_blank">Github:baidu_demo</a></p><p>&#x53C2;&#x8003;&#x6587;&#x7AE0;&#xFF1A;</p><ol><li><a href="https://segmentfault.com/a/1190000011145364">&#x524D;&#x7AEF;&#x5E38;&#x89C1;&#x8DE8;&#x57DF;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF08;&#x5168;&#xFF09;</a></li><li><a href="https://xiaogliu.github.io/2017/10/18/cross-origin-request-using-jsonp-and-cors/#CORS%E5%AE%9E%E7%8E%B0%E8%B7%A8%E6%BA%90%E9%80%9A%E4%BF%A1" rel="nofollow noreferrer" target="_blank">JSONP&#x548C;CORS&#x5B9E;&#x73B0;&#x8DE8;&#x6E90;&#x8BF7;&#x6C42;</a></li><li><a href="https://juejin.im/post/5a274ae9f265da430a5071eb" rel="nofollow noreferrer" target="_blank">&#x518D;&#x4E5F;&#x4E0D;&#x5B66;AJAX&#x4E86;&#xFF01;&#xFF08;&#x4E09;&#xFF09;&#x8DE8;&#x57DF;&#x83B7;&#x53D6;&#x8D44;&#x6E90; &#x2461; - JSONP &amp; CORS</a></li><li><a href="https://zhuanlan.zhihu.com/p/24390509" rel="nofollow noreferrer" target="_blank">jsonp&#x8DE8;&#x57DF;&#x8BF7;&#x6C42;&#x8BE6;&#x89E3;&#x2014;&#x2014;&#x4ECE;&#x7E41;&#x81F3;&#x7B80;</a></li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jsonp跨域获取数据实现百度搜索

## 原文链接
[https://segmentfault.com/a/1190000015374115](https://segmentfault.com/a/1190000015374115)

