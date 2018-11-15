---
title: WebWork（在主线程创建子进程）
hidden: true
categories: reprint
slug: 5f4cd16
date: 2018-11-08 02:30:09
---

{{< raw >}}
<p><strong>WebWork&#x6D45;&#x8C08;</strong></p><ul><li>&#x524D;&#x8A00;&#xFF1A;</li></ul><ol><li>&#x90FD;&#x77E5;&#x9053;JS&#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x8BED;&#x8A00;&#xFF0C;&#x6700;&#x8BA9;&#x4EBA;&#x5934;&#x75BC;&#x7684;&#x83AB;&#x8FC7;&#x4E8E;&#x5728;&#x7F51;&#x7EDC;&#x6B63;&#x5E38;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x7ECF;&#x5E38;&#x51FA;&#x73B0;&#x9875;&#x9762;&#x7684;&#x5047;&#x6B7B;&#xFF0C;</li><li>&#x4EE5;&#x53CA;&#x5728;&#x8FDB;&#x884C;&#x5927;&#x91CF;&#x7684;for&#x5FAA;&#x73AF;&#x8BA1;&#x7B97;&#x65F6;&#x4F1A;&#x5BFC;&#x81F4;&#x7EBF;&#x7A0B;&#x963B;&#x585E;,&#x7531;&#x4E8E;&#x8981;&#x8FDB;&#x884C;&#x5927;&#x91CF;&#x7684;&#x8BA1;&#x7B97;JS&#x540E;&#x9762;&#x7684;&#x8FD0;&#x884C;&#x4F1A;&#x88AB;&#x963B;&#x9694;&#x5728;&#x6B64;&#x5904;&#xFF0C;&#x4F7F;&#x5F97;&#x6027;&#x80FD;&#x8F83;&#x5DEE;&#xFF0C;&#x4EE3;&#x7801;&#x7EF4;&#x62A4;&#x6027;&#x5DEE;&#x7B49;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x95EE;&#x9898;&#x53D1;&#x751F;&#x3002;</li><li>&#x672C;&#x4EBA;&#x4E5F;&#x770B;&#x4E86;&#x5F88;&#x591A;&#x5173;&#x4E8E;webwork&#x7684;demo&#x548C;&#x5B98;&#x65B9;&#x7684;&#x8BB2;&#x89E3;&#xFF0C;&#x90FD;&#x8BF4;&#x662F;&#x5B98;&#x65B9;&#x5F88;&#x591A;&#x90FD;&#x4E0D;&#x662F;&#x5F88;&#x5BB9;&#x6613;&#x8BFB;&#x61C2;&#xFF0C;&#x5728;&#x6700;&#x8FD1;&#x51E0;&#x5929;&#x7684;&#x5B66;&#x4E60;&#x8FC7;&#x7A0B;&#x6211;&#x4E5F;&#x9488;&#x5BF9;&#x8FD9;&#x4E2A;&#x505A;&#x4E86;&#x4E9B;&#x529F;&#x8BFE;&#x53D1;&#x73B0;&#x4E86;webwork&#x7684;&#x4F5C;&#x7528;&#x975E;&#x540C;&#x4E00;&#x822C;&#xFF01;</li></ol><ul><li>&#x5148;&#x4E0A;&#x4EE3;&#x7801;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" let worker = new Worker(&quot;work.js&quot;)//&#x6B64;&#x5904;&#x5199;&#x5F85;&#x5904;&#x7406;&#x7684;&#x5730;&#x5740;
         let data = [1, 2, 3, 4, 5, 6, 7]
         worker.postMessage(data);

         worker.onmessage = function(event) {
             console.log(event.data)
             document.querySelector(&quot;ul&quot;).innerHTML = event.data
         }
         
         //&#x6B64;&#x90E8;&#x5206;&#x662F;work.js&#x4E2D;
         this.addEventListener(&quot;message&quot;, (data) =&gt; {
                let str = render(data.data)
                this.postMessage(str)
         })


    function render(data) {
            let str = &apos;&apos;
            data.forEach(i =&gt; {
                str += `&lt;li&gt;${i}&lt;/li&gt;`
            });
          return str
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-keyword">let</span> worker = <span class="hljs-keyword">new</span> Worker(<span class="hljs-string">&quot;work.js&quot;</span>)<span class="hljs-comment">//&#x6B64;&#x5904;&#x5199;&#x5F85;&#x5904;&#x7406;&#x7684;&#x5730;&#x5740;</span>
         <span class="hljs-keyword">let</span> data = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>]
         worker.postMessage(data);

         worker.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
             <span class="hljs-built_in">console</span>.log(event.data)
             <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;ul&quot;</span>).innerHTML = event.data
         }
         
         <span class="hljs-comment">//&#x6B64;&#x90E8;&#x5206;&#x662F;work.js&#x4E2D;</span>
         <span class="hljs-keyword">this</span>.addEventListener(<span class="hljs-string">&quot;message&quot;</span>, (data) =&gt; {
                <span class="hljs-keyword">let</span> str = render(data.data)
                <span class="hljs-keyword">this</span>.postMessage(str)
         })


    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params">data</span>) </span>{
            <span class="hljs-keyword">let</span> str = <span class="hljs-string">&apos;&apos;</span>
            data.forEach(<span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> {
                str += <span class="hljs-string">`&lt;li&gt;<span class="hljs-subst">${i}</span>&lt;/li&gt;`</span>
            });
          <span class="hljs-keyword">return</span> str
    }</code></pre><ol><li>&#x6B63;&#x5982;&#x60A8;&#x6240;&#x770B;&#x5230;&#x7684;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;Demo&#xFF1A;</li><li>&#x4F46;&#x662F;&#x4F60;&#x5728;&#x4E4B;&#x540E;&#x518D;&#x8865;&#x4E00;&#x53E5;&#x7B80;&#x5355;&#x7684;console.log&#xFF08;1&#xFF09;&#x5C31;&#x80FD;&#x591F;&#x770B;&#x51FA;&#x7ED3;&#x679C;&#x4E86;&#xFF0C;</li><li>&#x6253;&#x5F00;F12(&#x4F20;&#x8BF4;&#x4E2D;&#x7684;&#x5F00;&#x53D1;&#x8005;&#x6A21;&#x5F0F;)&#x4F60;&#x4F1A;&#x60CA;&#x5947;&#x7684;&#x53D1;&#x73B0;&#x5355;&#x7EBF;&#x7A0B;&#x8BED;&#x8A00;&#x5C45;&#x7136;&#x5148;&#x8F93;&#x51FA;&#x4E86;1&#x7136;&#x540E;&#x5728;UL&#x4E2D;&#x6DFB;&#x52A0;&#x4E86;&#x8282;&#x70B9;&#xFF0C;</li></ol><ul><li>&#x601D;&#x8003;&#xFF1F;</li></ul><ol><li>&#x7167;&#x4EE5;&#x524D;&#x7684;&#x5199;&#x6CD5;&#x6211;&#x4EEC;&#x80AF;&#x5B9A;&#x4F1A;&#x8FD9;&#x6837;&#x505A;&#xFF1A;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let str = &quot;&quot;;
data.forEach(i =&gt; {
                str += `&lt;li&gt;${i}&lt;/li&gt;`
});

document.querySelector(&quot;ul&quot;).innerHTML = str;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> str = <span class="hljs-string">&quot;&quot;</span>;
data.forEach(<span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> {
                str += <span class="hljs-string">`&lt;li&gt;<span class="hljs-subst">${i}</span>&lt;/li&gt;`</span>
});

<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;ul&quot;</span>).innerHTML = str;</code></pre><ol><li>&#x662F;&#x4E0D;&#x662F;&#x53D1;&#x73B0;&#x4E86;&#x5176;&#x4E2D;&#x7684;&#x597D;&#x5904;&#xFF1F;</li><li>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x6211;&#x4EEC;&#x628A;&#x4E00;&#x5957;&#x672C;&#x8BE5;&#x540C;&#x6B65;&#x7684;&#x4EE3;&#x7801;&#x8BE5;&#x6210;&#x4E86;&#x5F02;&#x6B65;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5728;&#x4E3B;&#x7EBF;&#x7A0B;&#x4E2D;&#x5F00;&#x8F9F;&#x4E86;&#x4E00;&#x6761;&#x5B50;&#x7EBF;&#x7A0B;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x597D;&#x5904;&#x5C31;&#x662F;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x4E3B;&#x7EBF;&#x7A0B;&#xFF0C;&#x7EBF;&#x7A0B;&#x4EFB;&#x52A1;&#x7684;&#x6267;&#x884C;&#xFF0C;&#x5177;&#x4F53;&#x6B65;&#x9AA4;&#x5728;&#x5B50;&#x7EBF;&#x7A0B;&#x4E2D;&#x8FDB;&#x884C;&#xFF0C;&#x6700;&#x540E;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x7ED9;&#x4E3B;&#x7EBF;&#x7A0B;&#x4E2D;&#xFF0C;&#x5F88;&#x5DE7;&#x5999;&#x7684;&#x89E3;&#x51B3;&#x4E86;&#x4E4B;&#x524D;&#x4E0A;&#x6587;&#x63D0;&#x5230;&#x7684;&#xFF0C;&#x5047;&#x5982;&#x5728;&#x4E3B;&#x7EBF;&#x7A0B;&#x4E2D;&#x6211;&#x6709;&#x4E2A;&#x4EFB;&#x52A1;&#x5FAA;&#x73AF;&#x4E86;10000&#x6B21;&#xFF08;&#x5F53;&#x7136;&#x662F;&#x5F00;&#x73A9;&#x7B11;&#xFF01;&#xFF09;&#x8FD9;&#x65F6;webwork&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x5DE7;&#x5999;&#x7684;&#x5904;&#x7406;&#x4E86;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5462;&#xFF1F;</li></ol><p><strong>&#x7ED3;&#x5C3E;&#xFF1A;</strong></p><ol><li>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x8FD9;&#x4E48;&#x505A;&#xFF1F;</li></ol><p><em>&#x968F;&#x7740;web&#x7684;&#x53D1;&#x5C55;&#xFF0C;&#x65F6;&#x4EE3;&#x8D8A;&#x6765;&#x8D8A;&#x8BB2;&#x7A76;&#x4F18;&#x5316;&#x4E8C;&#x5B57;&#xFF0C;&#x80FD;&#x591F;&#x7528;&#x66F4;&#x52A0;&#x4F18;&#x96C5;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x66F4;&#x52A0;&#x7B80;&#x6D01;&#x7684;&#x4EE3;&#x7801;&#x53BB;&#x5B8C;&#x6210;&#x4EFB;&#x52A1;&#x662F;&#x81F3;&#x5173;&#x91CD;&#x8981;&#x7684;&#x3002;</em></p><ul><li>&#x7528;&#x6237;&#x9700;&#x6C42;&#x4E00;&#x76F4;&#x662F;&#x6211;&#x4EEC;&#x5F00;&#x53D1;&#x8005;&#x6BD4;&#x8F83;&#x5BC6;&#x5207;&#x5173;&#x5FC3;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x8BD5;&#x60F3;&#x4E00;&#x4E0B;&#x5982;&#x679C;&#x5728;&#x67D0;&#x4E00;&#x5929;&#x6709;&#x4E2A;&#x7528;&#x6237;&#x8BBF;&#x95EE;&#x4E86;&#x4F60;&#x7684;&#x7F51;&#x7AD9;&#x7531;&#x4E8E;&#x4F60;&#x4EE3;&#x7801;&#x7684;&#x5230;&#x81F3;&#x4E86;&#x9875;&#x9762;&#x7684;&#x5047;&#x6B7B;&#x7684;&#x73B0;&#x8C61;&#x7684;&#x53D1;&#x751F;&#x90A3;&#x662F;&#x4E00;&#x4EF6;&#x591A;&#x4E48;&#x53EF;&#x6015;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x5728;&#x6DF1;&#x5C42;&#x6B21;&#x7684;&#x63A2;&#x7A76;&#x4E2D;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x4F18;&#x79C0;&#x7684;&#x524D;&#x7AEF;&#x5DE5;&#x4F5C;&#x8005;&#x90FD;&#x5E94;&#x8BE5;&#x53BB;&#x52AA;&#x529B;&#x89E3;&#x51B3;&#x8FD9;&#x4E9B;&#x95EE;&#x9898;&#x3002;</li></ul><p><strong>&#x4F5C;&#x8005;&#x5BC4;&#x8BED;&#xFF1A;&#x5218;&#x67D0;&#x4EBA;&#xFF0C;&#x5199;&#x6587;&#x7AE0;&#x4E0D;&#x591A;&#xFF0C;&#x4E0D;&#x559C;&#x52FF;&#x55B7;&#xFF0C;&#x53EA;&#x662F;&#x53D1;&#x8868;&#x4E2A;&#x4EBA;&#x89C1;&#x89E3;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x66F4;&#x597D;&#x7684;&#x5EFA;&#x8BAE;&#x5E0C;&#x671B;&#x53EF;&#x4EE5;&#x4E92;&#x76F8;&#x5E2E;&#x52A9;&#xFF0C;&#x76F8;&#x4E92;&#x5B66;&#x4E60;</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebWork（在主线程创建子进程）

## 原文链接
[https://segmentfault.com/a/1190000016460349](https://segmentfault.com/a/1190000016460349)

