---
title: '强大的Flutter http请求库dio' 
date: 2018-11-19 2:30:10
hidden: true
slug: nujsca3d64e
categories: [reprint]
---

{{< raw >}}
<blockquote><a href="https://github.com/flutterchina/dio" rel="nofollow noreferrer" target="_blank">dio</a>&#x662F;<a href="https://link.juejin.im/?target=https%3A%2F%2Fflutterchina.club%2F" rel="nofollow noreferrer" target="_blank">Flutter&#x4E2D;&#x6587;&#x7F51;</a>&#x5F00;&#x6E90;&#x7684;&#x4E00;&#x4E2A;&#x5F3A;&#x5927;&#x7684;Dart Http&#x8BF7;&#x6C42;&#x5E93;&#xFF0C;&#x652F;&#x6301;Restful API&#x3001;FormData&#x3001;&#x62E6;&#x622A;&#x5668;&#x3001;&#x8BF7;&#x6C42;&#x53D6;&#x6D88;&#x3001;Cookie&#x7BA1;&#x7406;&#x3001;&#x6587;&#x4EF6;&#x4E0A;&#x4F20;/&#x4E0B;&#x8F7D;&#x3001;&#x8D85;&#x65F6;&#x7B49;...</blockquote><p>&#x81EA;<a href="https://github.com/flutterchina/dio" rel="nofollow noreferrer" target="_blank">dio</a>&#x5F00;&#x6E90;&#x81F3;&#x4ECA;&#xFF0C;&#x6536;&#x5230;&#x4E86;&#x5927;&#x91CF;&#x56FD;&#x5185;&#x5916;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x53CD;&#x9988;&#xFF0C;&#x5230;&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#xFF0C;<a href="https://github.com/flutterchina/dio" rel="nofollow noreferrer" target="_blank">dio</a>&#x5728;pub&#x4ED3;&#x5E93;&#x5F97;&#x5206;96&#x5206;&#xFF0C;github dart&#x8BED;&#x8A00;&#x4E0B;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#x6392;&#x540D;&#x5DF2;&#x4E0A;&#x5347;&#x5230;&#x524D;20&#xFF0C;<a href="https://github.com/flutterchina/dio" rel="nofollow noreferrer" target="_blank">dio</a>&#x73B0;&#x5728;&#x4E5F;&#x662F;flutter&#x7B2C;&#x4E09;&#x65B9;package&#x4E2D;star&#x6570;&#x6700;&#x591A;&#x7684;&#x3002;&#x5728;<a href="https://github.com/flutterchina/dio" rel="nofollow noreferrer" target="_blank">dio</a>&#x5F00;&#x6E90;&#x7684;&#x4E24;&#x4E2A;&#x6708;&#x4E2D;&#xFF0C;&#x5DF2;&#x8FED;&#x4EE3;&#x4E86;18&#x4E2A;&#x5C0F;&#x7248;&#x672C;&#xFF0C;&#x56FD;&#x5185;&#x5916;&#x6709;&#x591A;&#x5BB6;&#x516C;&#x53F8;&#x7684;Flutter APP&#x6B63;&#x5728;&#x4F7F;&#x7528;dio&#xFF0C;&#x5DF2;&#x901A;&#x8FC7;&#x4E86;&#x5927;&#x91CF;&#x7684;&#x5B9E;&#x6218;&#x9A8C;&#x8BC1;&#xFF0C;&#x5DF2;&#x7ECF;&#x5728;AppStore&#x4E0A;&#x67B6;&#x7684;APP&#x5178;&#x578B;&#x4EE3;&#x8868;&#x662F;<a href="https://flutterchina.club/app/gm.html" rel="nofollow noreferrer" target="_blank">gitme</a>&#xFF1A;</p><blockquote><a href="https://flutterchina.club/app/gm.html" rel="nofollow noreferrer" target="_blank">Gitme</a>&#x662F;&#x4E00;&#x4E2A;&#x5F3A;&#x5927;&#x7684;github&#x5BA2;&#x6237;&#x7AEF;APP&#xFF0C;&#x5B83;&#x4F7F;&#x7528;<a href="https://github.com/flutterchina/dio" rel="nofollow noreferrer" target="_blank">dio</a>&#x4F5C;&#x4E3A;http client&#xFF0C;&#x9664;&#x4E86;&#x6B63;&#x5E38;&#x7684;http&#x8BF7;&#x6C42;&#x4E4B;&#x5916;&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x6700;&#x5927;&#x7684;&#x7279;&#x70B9;&#x662F;<a href="https://flutterchina.club/app/gm.html" rel="nofollow noreferrer" target="_blank">gitme</a>&#x901A;&#x8FC7;dio&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;APP&#x5185;&#x7EDF;&#x4E00;&#x3001;&#x9694;&#x79BB;&#x7684;&#x7F13;&#x5B58;&#x5C42;&#xFF0C;&#x5B8C;&#x5168;&#x548C;&#x4E0A;&#x5C42;ui&#x89E3;&#x8026;&#x3002;&#x60A8;&#x53EF;&#x4EE5;&#x4E0B;&#x8F7D;&#x4F53;&#x9A8C;&#x4E00;&#x4E0B;<a href="https://flutterchina.club/app/gm.html" rel="nofollow noreferrer" target="_blank">Gitme</a>&#x3002;&#x5982;&#x6709;&#x5FC5;&#x8981;&#xFF0C;&#x6211;&#x4F1A;&#x5355;&#x72EC;&#x51FA;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x5982;&#x4F55;&#x4F7F;&#x7528;<a href="https://github.com/flutterchina/dio" rel="nofollow noreferrer" target="_blank">dio</a>&#x62E6;&#x622A;&#x5668;&#x5B9E;&#x73B0;&#x79BB;&#x7EBF;&#x7F13;&#x5B58;&#xFF0C;&#x5927;&#x5BB6;&#x5982;&#x679C;&#x6709;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x5728;&#x8BC4;&#x8BBA;&#x4E2D;&#x53CD;&#x9988;&#x3002;</blockquote><p>&#x6240;&#x4EE5;&#xFF0C;&#x4ECA;&#x5929;&#xFF0C;&#x6211;&#x4EEC;&#x6B63;&#x5F0F;&#x53D1;&#x5E03;dio&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x7A33;&#x5B9A;&#x7248;&#x672C;1.0&#x3002;&#x4E0B;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x5168;&#x9762;&#x7684;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;dio 1.0&#x7684;&#x529F;&#x80FD;&#x53CA;&#x4F7F;&#x7528;&#x3002;</p><blockquote>&#x5EFA;&#x8BAE;dio&#x7684;&#x8001;&#x7528;&#x6237;&#x90FD;&#x5347;&#x7EA7;&#x5230;1.0&#x6B63;&#x5F0F;&#x7248;&#xFF0C;&#x5E76;&#x540C;&#x65F6;&#x611F;&#x8C22;&#x4F60;&#x4EEC;&#x5728;dio&#x9879;&#x76EE;&#x521D;&#x671F;&#x7684;&#x652F;&#x6301;&#xFF0C;&#x6CA1;&#x6709;&#x4F60;&#x4EEC;&#x7684;&#x53CD;&#x9988;&#x4E0E;&#x5EFA;&#x8BAE;&#xFF0C;dio&#x7A33;&#x5B9A;&#x7248;&#x4E0D;&#x4F1A;&#x8FD9;&#x4E48;&#x5FEB;&#x53D1;&#x5E03;&#x3002;</blockquote><p>&#x6587;&#x6863;&#x8BED;&#x8A00;: <a href="https://github.com/flutterchina/dio" rel="nofollow noreferrer" target="_blank">English</a> | <a href="https://github.com/flutterchina/dio/blob/flutter/README-ZH.md" rel="nofollow noreferrer" target="_blank">&#x4E2D;&#x6587;&#x7B80;&#x4F53;</a></p><h1 id="articleHeader0">dio</h1><p>dio&#x662F;&#x4E00;&#x4E2A;&#x5F3A;&#x5927;&#x7684;Dart Http&#x8BF7;&#x6C42;&#x5E93;&#xFF0C;&#x652F;&#x6301;Restful API&#x3001;FormData&#x3001;&#x62E6;&#x622A;&#x5668;&#x3001;&#x8BF7;&#x6C42;&#x53D6;&#x6D88;&#x3001;Cookie&#x7BA1;&#x7406;&#x3001;&#x6587;&#x4EF6;&#x4E0A;&#x4F20;/&#x4E0B;&#x8F7D;&#x3001;&#x8D85;&#x65F6;&#x7B49;...</p><h3 id="articleHeader1">&#x6DFB;&#x52A0;&#x4F9D;&#x8D56;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dependencies:
  dio: ^x.x.x  // &#x8BF7;&#x4F7F;&#x7528;pub&#x4E0A;&#x7684;&#x6700;&#x65B0;&#x7248;&#x672C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="yaml hljs"><code class="yaml"><span class="hljs-attr">dependencies:</span>
<span class="hljs-attr">  dio:</span> <span class="hljs-string">^x.x.x</span>  <span class="hljs-string">//</span> <span class="hljs-string">&#x8BF7;&#x4F7F;&#x7528;pub&#x4E0A;&#x7684;&#x6700;&#x65B0;&#x7248;&#x672C;</span></code></pre><h2 id="articleHeader2">&#x4E00;&#x4E2A;&#x6781;&#x7B80;&#x7684;&#x793A;&#x4F8B;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &apos;package:dio/dio.dart&apos;;
Dio dio = new Dio();
Response response=await dio.get(&quot;https://www.google.com/&quot;);
print(response.data);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart"><span class="hljs-keyword">import</span> <span class="hljs-string">&apos;package:dio/dio.dart&apos;</span>;
Dio dio = <span class="hljs-keyword">new</span> Dio();
Response response=<span class="hljs-keyword">await</span> dio.<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;https://www.google.com/&quot;</span>);
<span class="hljs-built_in">print</span>(response.data);</code></pre><h2 id="articleHeader3">&#x6700;&#x8FD1;&#x66F4;&#x65B0;</h2><ol><li>&#x6587;&#x4EF6;&#x4E0A;&#x4F20;&#x652F;&#x6301;&#x6570;&#x7EC4;&#x3002;</li><li>&#x652F;&#x6301;http&#x72B6;&#x6001;&#x7801;&#x88AB;&#x8BA4;&#x4E3A;&#x5BF9;&#x5E94;&#x6210;&#x529F;&#x6216;&#x5931;&#x8D25;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x5224;&#x65AD;&#x3002;</li><li>&#x6DFB;&#x52A0;&#x6E05;&#x7A7A;&#x62E6;&#x622A;&#x5668;&#x961F;&#x5217;API <code>Clear()</code>&#x3002;</li></ol><h2 id="articleHeader4">&#x5185;&#x5BB9;&#x5217;&#x8868;</h2><ul><li><a href="#%E7%A4%BA%E4%BE%8B">&#x793A;&#x4F8B;</a></li><li><a href="#dio-apis">Dio APIs</a></li><li><a href="#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE">&#x8BF7;&#x6C42;&#x914D;&#x7F6E;</a></li><li><a href="#%E5%93%8D%E5%BA%94%E6%95%B0%E6%8D%AE">&#x54CD;&#x5E94;&#x6570;&#x636E;</a></li><li><a href="#%E6%8B%A6%E6%88%AA%E5%99%A8">&#x62E6;&#x622A;&#x5668;</a></li><li><a href="#%E9%94%99%E8%AF%AF%E5%A4%84%E7%90%86">&#x9519;&#x8BEF;&#x5904;&#x7406;</a></li><li><a href="#%E4%BD%BF%E7%94%A8applicationx-www-form-urlencoded%E7%BC%96%E7%A0%81">&#x4F7F;&#x7528;application/x-www-form-urlencoded&#x7F16;&#x7801;</a></li><li><a href="#formdata">FormData</a></li><li><a href="#%E8%BD%AC%E6%8D%A2%E5%99%A8">&#x8F6C;&#x6362;&#x5668;</a></li><li><a href="#%E8%AE%BE%E7%BD%AEHttp%E4%BB%A3%E7%90%86">&#x8BBE;&#x7F6E;Http&#x4EE3;&#x7406;</a></li><li><a href="#%E8%AF%B7%E6%B1%82%E5%8F%96%E6%B6%88">&#x8BF7;&#x6C42;&#x53D6;&#x6D88;</a></li><li><a href="#cookie%E7%AE%A1%E7%90%86">Cookie&#x7BA1;&#x7406;</a></li><li><a href="#features-and-bugs">Features and bugs</a></li></ul><h2 id="articleHeader5">&#x793A;&#x4F8B;</h2><p>&#x53D1;&#x8D77;&#x4E00;&#x4E2A; <code>GET</code> &#x8BF7;&#x6C42; :</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Response response;
response=await dio.get(&quot;/test?id=12&amp;name=wendu&quot;)
print(response.data.toString());
// &#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5BF9;&#x8C61;&#x4F20;&#x9012;&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x7B49;&#x540C;&#x4E8E;&#xFF1A;
response=await dio.get(&quot;/test&quot;,data:{&quot;id&quot;:12,&quot;name&quot;:&quot;wendu&quot;})
print(response.data.toString());" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">Response response;
response=<span class="hljs-keyword">await</span> dio.<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;/test?id=12&amp;name=wendu&quot;</span>)
<span class="hljs-built_in">print</span>(response.data.toString());
<span class="hljs-comment">// &#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5BF9;&#x8C61;&#x4F20;&#x9012;&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x7B49;&#x540C;&#x4E8E;&#xFF1A;</span>
response=<span class="hljs-keyword">await</span> dio.<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;/test&quot;</span>,data:{<span class="hljs-string">&quot;id&quot;</span>:<span class="hljs-number">12</span>,<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;wendu&quot;</span>})
<span class="hljs-built_in">print</span>(response.data.toString());</code></pre><p>&#x53D1;&#x8D77;&#x4E00;&#x4E2A; <code>POST</code> &#x8BF7;&#x6C42;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response=await dio.post(&quot;/test&quot;,data:{&quot;id&quot;:12,&quot;name&quot;:&quot;wendu&quot;})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart" style="word-break:break-word;white-space:initial">response=<span class="hljs-keyword">await</span> dio.post(<span class="hljs-string">&quot;/test&quot;</span>,data:{<span class="hljs-string">&quot;id&quot;</span>:<span class="hljs-number">12</span>,<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;wendu&quot;</span>})</code></pre><p>&#x53D1;&#x8D77;&#x591A;&#x4E2A;&#x5E76;&#x53D1;&#x8BF7;&#x6C42;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response= await Future.wait([dio.post(&quot;/info&quot;),dio.get(&quot;/token&quot;)]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart" style="word-break:break-word;white-space:initial">response= <span class="hljs-keyword">await</span> Future.wait([dio.post(<span class="hljs-string">&quot;/info&quot;</span>),dio.<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;/token&quot;</span>)]);</code></pre><p>&#x4E0B;&#x8F7D;&#x6587;&#x4EF6;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response=await dio.download(&quot;https://www.google.com/&quot;,&quot;./xx.html&quot;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart" style="word-break:break-word;white-space:initial">response=<span class="hljs-keyword">await</span> dio.download(<span class="hljs-string">&quot;https://www.google.com/&quot;</span>,<span class="hljs-string">&quot;./xx.html&quot;</span>)</code></pre><p>&#x53D1;&#x9001; FormData:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FormData formData = new FormData.from({
   &quot;name&quot;: &quot;wendux&quot;,
   &quot;age&quot;: 25,
});
response = await dio.post(&quot;/info&quot;, data: formData)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">FormData formData = <span class="hljs-keyword">new</span> FormData.from({
   <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;wendux&quot;</span>,
   <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>,
});
response = <span class="hljs-keyword">await</span> dio.post(<span class="hljs-string">&quot;/info&quot;</span>, data: formData)</code></pre><p>&#x901A;&#x8FC7;FormData&#x4E0A;&#x4F20;&#x591A;&#x4E2A;&#x6587;&#x4EF6;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FormData formData = new FormData.from({
   &quot;name&quot;: &quot;wendux&quot;,
   &quot;age&quot;: 25,
   &quot;file1&quot;: new UploadFileInfo(new File(&quot;./upload.txt&quot;), &quot;upload1.txt&quot;),
   &quot;file2&quot;: new UploadFileInfo(new File(&quot;./upload.txt&quot;), &quot;upload2.txt&quot;),
     // &#x652F;&#x6301;&#x6587;&#x4EF6;&#x6570;&#x7EC4;&#x4E0A;&#x4F20;
   &quot;files&quot;: [
      new UploadFileInfo(new File(&quot;./example/upload.txt&quot;), &quot;upload.txt&quot;),
      new UploadFileInfo(new File(&quot;./example/upload.txt&quot;), &quot;upload.txt&quot;)
    ]
});
response = await dio.post(&quot;/info&quot;, data: formData)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">FormData formData = <span class="hljs-keyword">new</span> FormData.from({
   <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;wendux&quot;</span>,
   <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>,
   <span class="hljs-string">&quot;file1&quot;</span>: <span class="hljs-keyword">new</span> UploadFileInfo(<span class="hljs-keyword">new</span> File(<span class="hljs-string">&quot;./upload.txt&quot;</span>), <span class="hljs-string">&quot;upload1.txt&quot;</span>),
   <span class="hljs-string">&quot;file2&quot;</span>: <span class="hljs-keyword">new</span> UploadFileInfo(<span class="hljs-keyword">new</span> File(<span class="hljs-string">&quot;./upload.txt&quot;</span>), <span class="hljs-string">&quot;upload2.txt&quot;</span>),
     <span class="hljs-comment">// &#x652F;&#x6301;&#x6587;&#x4EF6;&#x6570;&#x7EC4;&#x4E0A;&#x4F20;</span>
   <span class="hljs-string">&quot;files&quot;</span>: [
      <span class="hljs-keyword">new</span> UploadFileInfo(<span class="hljs-keyword">new</span> File(<span class="hljs-string">&quot;./example/upload.txt&quot;</span>), <span class="hljs-string">&quot;upload.txt&quot;</span>),
      <span class="hljs-keyword">new</span> UploadFileInfo(<span class="hljs-keyword">new</span> File(<span class="hljs-string">&quot;./example/upload.txt&quot;</span>), <span class="hljs-string">&quot;upload.txt&quot;</span>)
    ]
});
response = <span class="hljs-keyword">await</span> dio.post(<span class="hljs-string">&quot;/info&quot;</span>, data: formData)</code></pre><p>&#x2026;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x8FD9;&#x91CC;&#x83B7;&#x53D6;&#x6240;&#x6709;<a href="https://github.com/flutterchina/dio/tree/flutter/example" rel="nofollow noreferrer" target="_blank">&#x793A;&#x4F8B;&#x4EE3;&#x7801;</a>.</p><h2 id="articleHeader6">Dio APIs</h2><h3 id="articleHeader7">&#x521B;&#x5EFA;&#x4E00;&#x4E2A;Dio&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x914D;&#x7F6E;&#x5B83;</h3><p>&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x6216;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x53EF;&#x9009; <code>Options</code>&#x53C2;&#x6570;&#x6765;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;Dio&#x5B9E;&#x4F8B; :</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Dio dio = new Dio; // &#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;

// &#x914D;&#x7F6E;dio&#x5B9E;&#x4F8B;
dio.options.baseUrl=&quot;https://www.xx.com/api&quot;
dio.options.connectTimeout = 5000; //5s
dio.options.receiveTimeout=3000;

// &#x6216;&#x8005;&#x901A;&#x8FC7;&#x4F20;&#x9012;&#x4E00;&#x4E2A; `options`&#x6765;&#x521B;&#x5EFA;dio&#x5B9E;&#x4F8B;
Options options= new Options(
    baseUrl:&quot;https://www.xx.com/api&quot;,
    connectTimeout:5000,
    receiveTimeout:3000
);
Dio dio = new Dio(options);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">Dio dio = <span class="hljs-keyword">new</span> Dio; <span class="hljs-comment">// &#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;</span>

<span class="hljs-comment">// &#x914D;&#x7F6E;dio&#x5B9E;&#x4F8B;</span>
dio.options.baseUrl=<span class="hljs-string">&quot;https://www.xx.com/api&quot;</span>
dio.options.connectTimeout = <span class="hljs-number">5000</span>; <span class="hljs-comment">//5s</span>
dio.options.receiveTimeout=<span class="hljs-number">3000</span>;

<span class="hljs-comment">// &#x6216;&#x8005;&#x901A;&#x8FC7;&#x4F20;&#x9012;&#x4E00;&#x4E2A; `options`&#x6765;&#x521B;&#x5EFA;dio&#x5B9E;&#x4F8B;</span>
Options options= <span class="hljs-keyword">new</span> Options(
    baseUrl:<span class="hljs-string">&quot;https://www.xx.com/api&quot;</span>,
    connectTimeout:<span class="hljs-number">5000</span>,
    receiveTimeout:<span class="hljs-number">3000</span>
);
Dio dio = <span class="hljs-keyword">new</span> Dio(options);</code></pre><p>Dio&#x5B9E;&#x4F8B;&#x7684;&#x6838;&#x5FC3;API&#x662F; :</p><p><strong>Future&lt;Response&gt; request(String path, {data, Options options,CancelToken cancelToken})</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response=await request(&quot;/test&quot;, data: {&quot;id&quot;:12,&quot;name&quot;:&quot;xx&quot;}, new Options(method:&quot;GET&quot;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart" style="word-break:break-word;white-space:initial">response=<span class="hljs-keyword">await</span> request(<span class="hljs-string">&quot;/test&quot;</span>, data: {<span class="hljs-string">&quot;id&quot;</span>:<span class="hljs-number">12</span>,<span class="hljs-string">&quot;name&quot;</span>:<span class="hljs-string">&quot;xx&quot;</span>}, <span class="hljs-keyword">new</span> Options(method:<span class="hljs-string">&quot;GET&quot;</span>));</code></pre><h3 id="articleHeader8">&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#x522B;&#x540D;</h3><p>&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x4F7F;&#x7528;&#xFF0C;Dio&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E9B;&#x5176;&#x5B83;&#x7684;Restful API, &#x8FD9;&#x4E9B;API&#x90FD;&#x662F;<code>request</code>&#x7684;&#x522B;&#x540D;&#x3002;</p><p><strong>Future&lt;Response&gt; get(path, {data, Options options,CancelToken cancelToken})</strong></p><p><strong>Future&lt;Response&gt; post(path, {data, Options options,CancelToken cancelToken})</strong></p><p><strong>Future&lt;Response&gt; put(path, {data, Options options,CancelToken cancelToken})</strong></p><p><strong>Future&lt;Response&gt; delete(path, {data, Options options,CancelToken cancelToken})</strong></p><p><strong>Future&lt;Response&gt; head(path, {data, Options options,CancelToken cancelToken})</strong></p><p><strong>Future&lt;Response&gt; put(path, {data, Options options,CancelToken cancelToken})</strong></p><p><strong>Future&lt;Response&gt; path(path, {data, Options options,CancelToken cancelToken})</strong></p><p><strong>Future&lt;Response&gt; download(String urlPath, savePath,</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**{OnDownloadProgress onProgress, data, bool flush: false, Options options,CancelToken cancelToken})**

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code>**{OnDownloadProgress onProgress, data, bool flush: <span class="hljs-keyword">false</span>, <span class="hljs-keyword">Options</span> <span class="hljs-keyword">options</span>,CancelToken cancelToken})**

</code></pre><h2 id="articleHeader9">&#x8BF7;&#x6C42;&#x914D;&#x7F6E;</h2><p>&#x4E0B;&#x9762;&#x662F;&#x6240;&#x6709;&#x7684;&#x8BF7;&#x6C42;&#x914D;&#x7F6E;&#x9009;&#x9879;&#x3002; &#x5982;&#x679C;&#x8BF7;&#x6C42;<code>method</code>&#x6CA1;&#x6709;&#x6307;&#x5B9A;&#xFF0C;&#x5219;&#x9ED8;&#x8BA4;&#x4E3A;<code>GET</code> :</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  /// Http method.
  String method;

  /// &#x8BF7;&#x6C42;&#x57FA;&#x5730;&#x5740;,&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x5B50;&#x8DEF;&#x5F84;&#xFF0C;&#x5982;: &quot;https://www.google.com/api/&quot;.
  String baseUrl;

  /// Http&#x8BF7;&#x6C42;&#x5934;.
  Map&lt;String, dynamic&gt; headers;

  /// &#x8FDE;&#x63A5;&#x670D;&#x52A1;&#x5668;&#x8D85;&#x65F6;&#x65F6;&#x95F4;&#xFF0C;&#x5355;&#x4F4D;&#x662F;&#x6BEB;&#x79D2;.
  int connectTimeout;

  ///  &#x54CD;&#x5E94;&#x6D41;&#x4E0A;&#x524D;&#x540E;&#x4E24;&#x6B21;&#x63A5;&#x53D7;&#x5230;&#x6570;&#x636E;&#x7684;&#x95F4;&#x9694;&#xFF0C;&#x5355;&#x4F4D;&#x4E3A;&#x6BEB;&#x79D2;&#x3002;&#x5982;&#x679C;&#x4E24;&#x6B21;&#x95F4;&#x9694;&#x8D85;&#x8FC7;[receiveTimeout]&#xFF0C;
  ///  [Dio] &#x5C06;&#x4F1A;&#x629B;&#x51FA;&#x4E00;&#x4E2A;[DioErrorType.RECEIVE_TIMEOUT]&#x7684;&#x5F02;&#x5E38;.
  ///  &#x6CE8;&#x610F;: &#x8FD9;&#x5E76;&#x4E0D;&#x662F;&#x63A5;&#x6536;&#x6570;&#x636E;&#x7684;&#x603B;&#x65F6;&#x9650;.
  int receiveTimeout;

  /// &#x8BF7;&#x6C42;&#x6570;&#x636E;,&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x7C7B;&#x578B;.
  var data;

  /// &#x8BF7;&#x6C42;&#x8DEF;&#x5F84;&#xFF0C;&#x5982;&#x679C; `path` &#x4EE5; &quot;http(s)&quot;&#x5F00;&#x59CB;, &#x5219; `baseURL` &#x4F1A;&#x88AB;&#x5FFD;&#x7565;&#xFF1B; &#x5426;&#x5219;,
  /// &#x5C06;&#x4F1A;&#x548C;baseUrl&#x62FC;&#x63A5;&#x51FA;&#x5B8C;&#x6574;&#x7684;&#x7684;url.
  String path=&quot;&quot;;

  /// &#x8BF7;&#x6C42;&#x7684;Content-Type&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x662F;[ContentType.JSON].
  /// &#x5982;&#x679C;&#x60A8;&#x60F3;&#x4EE5;&quot;application/x-www-form-urlencoded&quot;&#x683C;&#x5F0F;&#x7F16;&#x7801;&#x8BF7;&#x6C42;&#x6570;&#x636E;,
  /// &#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x6B64;&#x9009;&#x9879;&#x4E3A; `ContentType.parse(&quot;application/x-www-form-urlencoded&quot;)`,  &#x8FD9;&#x6837;[Dio]
  /// &#x5C31;&#x4F1A;&#x81EA;&#x52A8;&#x7F16;&#x7801;&#x8BF7;&#x6C42;&#x4F53;.
  ContentType contentType;

  /// [responseType] &#x8868;&#x793A;&#x671F;&#x671B;&#x4EE5;&#x90A3;&#x79CD;&#x683C;&#x5F0F;(&#x65B9;&#x5F0F;)&#x63A5;&#x53D7;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x3002;
  /// &#x76EE;&#x524D; [ResponseType] &#x63A5;&#x53D7;&#x4E09;&#x79CD;&#x7C7B;&#x578B; `JSON`, `STREAM`, `PLAIN`.
  ///
  /// &#x9ED8;&#x8BA4;&#x503C;&#x662F; `JSON`, &#x5F53;&#x54CD;&#x5E94;&#x5934;&#x4E2D;content-type&#x4E3A;&quot;application/json&quot;&#x65F6;&#xFF0C;dio &#x4F1A;&#x81EA;&#x52A8;&#x5C06;&#x54CD;&#x5E94;&#x5185;&#x5BB9;&#x8F6C;&#x5316;&#x4E3A;json&#x5BF9;&#x8C61;&#x3002;
  /// &#x5982;&#x679C;&#x60F3;&#x4EE5;&#x4E8C;&#x8FDB;&#x5236;&#x65B9;&#x5F0F;&#x63A5;&#x53D7;&#x54CD;&#x5E94;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x4E0B;&#x8F7D;&#x4E00;&#x4E2A;&#x4E8C;&#x8FDB;&#x5236;&#x6587;&#x4EF6;&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; `STREAM`.
  ///
  /// &#x5982;&#x679C;&#x60F3;&#x4EE5;&#x6587;&#x672C;(&#x5B57;&#x7B26;&#x4E32;)&#x683C;&#x5F0F;&#x63A5;&#x6536;&#x54CD;&#x5E94;&#x6570;&#x636E;&#xFF0C;&#x8BF7;&#x4F7F;&#x7528; `PLAIN`.
  ResponseType responseType;

  /// `validateStatus` &#x51B3;&#x5B9A;http&#x54CD;&#x5E94;&#x72B6;&#x6001;&#x7801;&#x662F;&#x5426;&#x88AB;dio&#x89C6;&#x4E3A;&#x8BF7;&#x6C42;&#x6210;&#x529F;&#xFF0C; &#x8FD4;&#x56DE;`validateStatus`
  ///  &#x8FD4;&#x56DE;`true` , &#x8BF7;&#x6C42;&#x7ED3;&#x679C;&#x5C31;&#x4F1A;&#x6309;&#x6210;&#x529F;&#x5904;&#x7406;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x6309;&#x5931;&#x8D25;&#x5904;&#x7406;.
  ValidateStatus validateStatus;

  /// &#x7528;&#x6237;&#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x6BB5;&#xFF0C;&#x53EF;&#x4EE5;&#x5728; [Interceptor]&#x3001;[Transformer] &#x548C; [Response] &#x4E2D;&#x53D6;&#x5230;.
  Map&lt;String, dynamic&gt; extra;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">{
  <span class="hljs-comment"><span class="markdown">/// Http method.</span></span>
  <span class="hljs-built_in">String</span> method;

  <span class="hljs-comment"><span class="markdown">/// &#x8BF7;&#x6C42;&#x57FA;&#x5730;&#x5740;,&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x5B50;&#x8DEF;&#x5F84;&#xFF0C;&#x5982;: &quot;https://www.google.com/api/&quot;.</span></span>
  <span class="hljs-built_in">String</span> baseUrl;

  <span class="hljs-comment"><span class="markdown">/// Http&#x8BF7;&#x6C42;&#x5934;.</span></span>
  <span class="hljs-built_in">Map</span>&lt;<span class="hljs-built_in">String</span>, <span class="hljs-keyword">dynamic</span>&gt; headers;

  <span class="hljs-comment"><span class="markdown">/// &#x8FDE;&#x63A5;&#x670D;&#x52A1;&#x5668;&#x8D85;&#x65F6;&#x65F6;&#x95F4;&#xFF0C;&#x5355;&#x4F4D;&#x662F;&#x6BEB;&#x79D2;.</span></span>
  <span class="hljs-built_in">int</span> connectTimeout;

  <span class="hljs-comment"><span class="markdown">///  &#x54CD;&#x5E94;&#x6D41;&#x4E0A;&#x524D;&#x540E;&#x4E24;&#x6B21;&#x63A5;&#x53D7;&#x5230;&#x6570;&#x636E;&#x7684;&#x95F4;&#x9694;&#xFF0C;&#x5355;&#x4F4D;&#x4E3A;&#x6BEB;&#x79D2;&#x3002;&#x5982;&#x679C;&#x4E24;&#x6B21;&#x95F4;&#x9694;&#x8D85;&#x8FC7;[receiveTimeout]&#xFF0C;</span></span>
  <span class="hljs-comment"><span class="markdown">///  [Dio] &#x5C06;&#x4F1A;&#x629B;&#x51FA;&#x4E00;&#x4E2A;[DioErrorType.RECEIVE_TIMEOUT]&#x7684;&#x5F02;&#x5E38;.</span></span>
  <span class="hljs-comment"><span class="markdown">///  &#x6CE8;&#x610F;: &#x8FD9;&#x5E76;&#x4E0D;&#x662F;&#x63A5;&#x6536;&#x6570;&#x636E;&#x7684;&#x603B;&#x65F6;&#x9650;.</span></span>
  <span class="hljs-built_in">int</span> receiveTimeout;

  <span class="hljs-comment"><span class="markdown">/// &#x8BF7;&#x6C42;&#x6570;&#x636E;,&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x7C7B;&#x578B;.</span></span>
  <span class="hljs-keyword">var</span> data;

  <span class="hljs-comment"><span class="markdown">/// &#x8BF7;&#x6C42;&#x8DEF;&#x5F84;&#xFF0C;&#x5982;&#x679C; <span class="hljs-code">`path`</span> &#x4EE5; &quot;http(s)&quot;&#x5F00;&#x59CB;, &#x5219; <span class="hljs-code">`baseURL`</span> &#x4F1A;&#x88AB;&#x5FFD;&#x7565;&#xFF1B; &#x5426;&#x5219;,</span></span>
  <span class="hljs-comment"><span class="markdown">/// &#x5C06;&#x4F1A;&#x548C;baseUrl&#x62FC;&#x63A5;&#x51FA;&#x5B8C;&#x6574;&#x7684;&#x7684;url.</span></span>
  <span class="hljs-built_in">String</span> path=<span class="hljs-string">&quot;&quot;</span>;

  <span class="hljs-comment"><span class="markdown">/// &#x8BF7;&#x6C42;&#x7684;Content-Type&#xFF0C;&#x9ED8;&#x8BA4;&#x503C;&#x662F;[ContentType.JSON].</span></span>
  <span class="hljs-comment"><span class="markdown">/// &#x5982;&#x679C;&#x60A8;&#x60F3;&#x4EE5;&quot;application/x-www-form-urlencoded&quot;&#x683C;&#x5F0F;&#x7F16;&#x7801;&#x8BF7;&#x6C42;&#x6570;&#x636E;,</span></span>
  <span class="hljs-comment"><span class="markdown">/// &#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x6B64;&#x9009;&#x9879;&#x4E3A; <span class="hljs-code">`ContentType.parse(&quot;application/x-www-form-urlencoded&quot;)`</span>,  &#x8FD9;&#x6837;[Dio]</span></span>
  <span class="hljs-comment"><span class="markdown">/// &#x5C31;&#x4F1A;&#x81EA;&#x52A8;&#x7F16;&#x7801;&#x8BF7;&#x6C42;&#x4F53;.</span></span>
  ContentType contentType;

  <span class="hljs-comment"><span class="markdown">/// [responseType] &#x8868;&#x793A;&#x671F;&#x671B;&#x4EE5;&#x90A3;&#x79CD;&#x683C;&#x5F0F;(&#x65B9;&#x5F0F;)&#x63A5;&#x53D7;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x3002;</span></span>
  <span class="hljs-comment"><span class="markdown">/// &#x76EE;&#x524D; [ResponseType] &#x63A5;&#x53D7;&#x4E09;&#x79CD;&#x7C7B;&#x578B; <span class="hljs-code">`JSON`</span>, <span class="hljs-code">`STREAM`</span>, <span class="hljs-code">`PLAIN`</span>.</span></span>
  <span class="hljs-comment"><span class="markdown">///</span></span>
  <span class="hljs-comment"><span class="markdown">/// &#x9ED8;&#x8BA4;&#x503C;&#x662F; <span class="hljs-code">`JSON`</span>, &#x5F53;&#x54CD;&#x5E94;&#x5934;&#x4E2D;content-type&#x4E3A;&quot;application/json&quot;&#x65F6;&#xFF0C;dio &#x4F1A;&#x81EA;&#x52A8;&#x5C06;&#x54CD;&#x5E94;&#x5185;&#x5BB9;&#x8F6C;&#x5316;&#x4E3A;json&#x5BF9;&#x8C61;&#x3002;</span></span>
  <span class="hljs-comment"><span class="markdown">/// &#x5982;&#x679C;&#x60F3;&#x4EE5;&#x4E8C;&#x8FDB;&#x5236;&#x65B9;&#x5F0F;&#x63A5;&#x53D7;&#x54CD;&#x5E94;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x4E0B;&#x8F7D;&#x4E00;&#x4E2A;&#x4E8C;&#x8FDB;&#x5236;&#x6587;&#x4EF6;&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <span class="hljs-code">`STREAM`</span>.</span></span>
  <span class="hljs-comment"><span class="markdown">///</span></span>
  <span class="hljs-comment"><span class="markdown">/// &#x5982;&#x679C;&#x60F3;&#x4EE5;&#x6587;&#x672C;(&#x5B57;&#x7B26;&#x4E32;)&#x683C;&#x5F0F;&#x63A5;&#x6536;&#x54CD;&#x5E94;&#x6570;&#x636E;&#xFF0C;&#x8BF7;&#x4F7F;&#x7528; <span class="hljs-code">`PLAIN`</span>.</span></span>
  ResponseType responseType;

  <span class="hljs-comment"><span class="markdown">/// <span class="hljs-code">`validateStatus`</span> &#x51B3;&#x5B9A;http&#x54CD;&#x5E94;&#x72B6;&#x6001;&#x7801;&#x662F;&#x5426;&#x88AB;dio&#x89C6;&#x4E3A;&#x8BF7;&#x6C42;&#x6210;&#x529F;&#xFF0C; &#x8FD4;&#x56DE;<span class="hljs-code">`validateStatus`</span></span></span>
  <span class="hljs-comment"><span class="markdown">///  &#x8FD4;&#x56DE;<span class="hljs-code">`true`</span> , &#x8BF7;&#x6C42;&#x7ED3;&#x679C;&#x5C31;&#x4F1A;&#x6309;&#x6210;&#x529F;&#x5904;&#x7406;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x6309;&#x5931;&#x8D25;&#x5904;&#x7406;.</span></span>
  ValidateStatus validateStatus;

  <span class="hljs-comment"><span class="markdown">/// &#x7528;&#x6237;&#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x6BB5;&#xFF0C;&#x53EF;&#x4EE5;&#x5728; [Interceptor]&#x3001;[Transformer] &#x548C; [Response] &#x4E2D;&#x53D6;&#x5230;.</span></span>
  <span class="hljs-built_in">Map</span>&lt;<span class="hljs-built_in">String</span>, <span class="hljs-keyword">dynamic</span>&gt; extra;
}</code></pre><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x5B8C;&#x6210;&#x7684;<a href="https://github.com/flutterchina/dio/blob/flutter/example/options.dart" rel="nofollow noreferrer" target="_blank">&#x793A;&#x4F8B;</a>.</p><h2 id="articleHeader10">&#x54CD;&#x5E94;&#x6570;&#x636E;</h2><p>&#x5F53;&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x65F6;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;Response&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x5305;&#x542B;&#x5982;&#x4E0B;&#x5B57;&#x6BB5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  /// &#x54CD;&#x5E94;&#x6570;&#x636E;&#xFF0C;&#x53EF;&#x80FD;&#x5DF2;&#x7ECF;&#x88AB;&#x8F6C;&#x6362;&#x4E86;&#x7C7B;&#x578B;, &#x8BE6;&#x60C5;&#x8BF7;&#x53C2;&#x8003;Options&#x4E2D;&#x7684;[ResponseType].
  var data;
  /// &#x54CD;&#x5E94;&#x5934;
  HttpHeaders headers;
  /// &#x672C;&#x6B21;&#x8BF7;&#x6C42;&#x4FE1;&#x606F;
  Options request;
  /// Http status code.
  int statusCode;
  /// &#x54CD;&#x5E94;&#x5BF9;&#x8C61;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x6BB5;&#xFF08;&#x53EF;&#x4EE5;&#x5728;&#x62E6;&#x622A;&#x5668;&#x4E2D;&#x8BBE;&#x7F6E;&#x5B83;&#xFF09;&#xFF0C;&#x8C03;&#x7528;&#x65B9;&#x53EF;&#x4EE5;&#x5728;`then`&#x4E2D;&#x83B7;&#x53D6;.
  Map&lt;String, dynamic&gt; extra;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">{
  <span class="hljs-comment"><span class="markdown">/// &#x54CD;&#x5E94;&#x6570;&#x636E;&#xFF0C;&#x53EF;&#x80FD;&#x5DF2;&#x7ECF;&#x88AB;&#x8F6C;&#x6362;&#x4E86;&#x7C7B;&#x578B;, &#x8BE6;&#x60C5;&#x8BF7;&#x53C2;&#x8003;Options&#x4E2D;&#x7684;[ResponseType].</span></span>
  <span class="hljs-keyword">var</span> data;
  <span class="hljs-comment"><span class="markdown">/// &#x54CD;&#x5E94;&#x5934;</span></span>
  HttpHeaders headers;
  <span class="hljs-comment"><span class="markdown">/// &#x672C;&#x6B21;&#x8BF7;&#x6C42;&#x4FE1;&#x606F;</span></span>
  Options request;
  <span class="hljs-comment"><span class="markdown">/// Http status code.</span></span>
  <span class="hljs-built_in">int</span> statusCode;
  <span class="hljs-comment"><span class="markdown">/// &#x54CD;&#x5E94;&#x5BF9;&#x8C61;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x6BB5;&#xFF08;&#x53EF;&#x4EE5;&#x5728;&#x62E6;&#x622A;&#x5668;&#x4E2D;&#x8BBE;&#x7F6E;&#x5B83;&#xFF09;&#xFF0C;&#x8C03;&#x7528;&#x65B9;&#x53EF;&#x4EE5;&#x5728;<span class="hljs-code">`then`</span>&#x4E2D;&#x83B7;&#x53D6;.</span></span>
  <span class="hljs-built_in">Map</span>&lt;<span class="hljs-built_in">String</span>, <span class="hljs-keyword">dynamic</span>&gt; extra;
}</code></pre><p>&#x793A;&#x4F8B;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Response response=await dio.get(&quot;https://www.google.com&quot;);
print(response.data);
print(response.headers);
print(response.request);
print(statusCode);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">Response response=<span class="hljs-keyword">await</span> dio.<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;https://www.google.com&quot;</span>);
<span class="hljs-built_in">print</span>(response.data);
<span class="hljs-built_in">print</span>(response.headers);
<span class="hljs-built_in">print</span>(response.request);
<span class="hljs-built_in">print</span>(statusCode);</code></pre><h2 id="articleHeader11">&#x62E6;&#x622A;&#x5668;</h2><p>&#x6BCF;&#x4E00;&#x4E2A; Dio &#x5B9E;&#x4F8B;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668; <code>RequestInterceptor</code> &#x548C;&#x4E00;&#x4E2A;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668; <code>ResponseInterceptor</code>, &#x901A;&#x8FC7;&#x62E6;&#x622A;&#x5668;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x8BF7;&#x6C42;&#x4E4B;&#x524D;&#x6216;&#x54CD;&#x5E94;&#x4E4B;&#x540E;(&#x4F46;&#x8FD8;&#x6CA1;&#x6709;&#x88AB; <code>then</code> &#x6216; <code>catchError</code>&#x5904;&#x7406;)&#x505A;&#x4E00;&#x4E9B;&#x7EDF;&#x4E00;&#x7684;&#x9884;&#x5904;&#x7406;&#x64CD;&#x4F5C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" dio.interceptor.request.onSend = (Options options){
     // &#x5728;&#x8BF7;&#x6C42;&#x88AB;&#x53D1;&#x9001;&#x4E4B;&#x524D;&#x505A;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;
     return options; //continue
     // &#x5982;&#x679C;&#x4F60;&#x60F3;&#x5B8C;&#x6210;&#x8BF7;&#x6C42;&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E9B;&#x81EA;&#x5B9A;&#x4E49;&#x6570;&#x636E;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;`Response`&#x5BF9;&#x8C61;&#x6216;&#x8FD4;&#x56DE;`dio.resolve(data)`&#x3002;
     // &#x8FD9;&#x6837;&#x8BF7;&#x6C42;&#x5C06;&#x4F1A;&#x88AB;&#x7EC8;&#x6B62;&#xFF0C;&#x4E0A;&#x5C42;then&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#xFF0C;then&#x4E2D;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x5C06;&#x662F;&#x4F60;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x6570;&#x636E;data.
     //
     // &#x5982;&#x679C;&#x4F60;&#x60F3;&#x7EC8;&#x6B62;&#x8BF7;&#x6C42;&#x5E76;&#x89E6;&#x53D1;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;,&#x4F60;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;`DioError`&#x5BF9;&#x8C61;&#xFF0C;&#x6216;&#x8FD4;&#x56DE;`dio.reject(errMsg)`&#xFF0C;
     // &#x8FD9;&#x6837;&#x8BF7;&#x6C42;&#x5C06;&#x88AB;&#x4E2D;&#x6B62;&#x5E76;&#x89E6;&#x53D1;&#x5F02;&#x5E38;&#xFF0C;&#x4E0A;&#x5C42;catchError&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#x3002;
 }
 dio.interceptor.response.onSuccess = (Response response) {
     // &#x5728;&#x8FD4;&#x56DE;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x4E4B;&#x524D;&#x505A;&#x4E00;&#x4E9B;&#x9884;&#x5904;&#x7406;
     return response; // continue
 };
 dio.interceptor.response.onError = (DioError e){
     // &#x5F53;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&#x65F6;&#x505A;&#x4E00;&#x4E9B;&#x9884;&#x5904;&#x7406;
     return e;//continue
 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart"> dio.interceptor.request.onSend = (Options options){
     <span class="hljs-comment">// &#x5728;&#x8BF7;&#x6C42;&#x88AB;&#x53D1;&#x9001;&#x4E4B;&#x524D;&#x505A;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;</span>
     <span class="hljs-keyword">return</span> options; <span class="hljs-comment">//continue</span>
     <span class="hljs-comment">// &#x5982;&#x679C;&#x4F60;&#x60F3;&#x5B8C;&#x6210;&#x8BF7;&#x6C42;&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E9B;&#x81EA;&#x5B9A;&#x4E49;&#x6570;&#x636E;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;`Response`&#x5BF9;&#x8C61;&#x6216;&#x8FD4;&#x56DE;`dio.resolve(data)`&#x3002;</span>
     <span class="hljs-comment">// &#x8FD9;&#x6837;&#x8BF7;&#x6C42;&#x5C06;&#x4F1A;&#x88AB;&#x7EC8;&#x6B62;&#xFF0C;&#x4E0A;&#x5C42;then&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#xFF0C;then&#x4E2D;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x5C06;&#x662F;&#x4F60;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x6570;&#x636E;data.</span>
     <span class="hljs-comment">//</span>
     <span class="hljs-comment">// &#x5982;&#x679C;&#x4F60;&#x60F3;&#x7EC8;&#x6B62;&#x8BF7;&#x6C42;&#x5E76;&#x89E6;&#x53D1;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;,&#x4F60;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;`DioError`&#x5BF9;&#x8C61;&#xFF0C;&#x6216;&#x8FD4;&#x56DE;`dio.reject(errMsg)`&#xFF0C;</span>
     <span class="hljs-comment">// &#x8FD9;&#x6837;&#x8BF7;&#x6C42;&#x5C06;&#x88AB;&#x4E2D;&#x6B62;&#x5E76;&#x89E6;&#x53D1;&#x5F02;&#x5E38;&#xFF0C;&#x4E0A;&#x5C42;catchError&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#x3002;</span>
 }
 dio.interceptor.response.onSuccess = (Response response) {
     <span class="hljs-comment">// &#x5728;&#x8FD4;&#x56DE;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x4E4B;&#x524D;&#x505A;&#x4E00;&#x4E9B;&#x9884;&#x5904;&#x7406;</span>
     <span class="hljs-keyword">return</span> response; <span class="hljs-comment">// continue</span>
 };
 dio.interceptor.response.onError = (DioError e){
     <span class="hljs-comment">// &#x5F53;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&#x65F6;&#x505A;&#x4E00;&#x4E9B;&#x9884;&#x5904;&#x7406;</span>
     <span class="hljs-keyword">return</span> e;<span class="hljs-comment">//continue</span>
 }</code></pre><p>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x79FB;&#x9664;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5C06;&#x5B83;&#x4EEC;&#x7F6E;&#x4E3A;null:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dio.interceptor.request.onSend=null;
dio.interceptor.response.onSuccess=null;
dio.interceptor.response.onError=null;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">dio.interceptor.request.onSend=<span class="hljs-keyword">null</span>;
dio.interceptor.response.onSuccess=<span class="hljs-keyword">null</span>;
dio.interceptor.response.onError=<span class="hljs-keyword">null</span>;</code></pre><h3 id="articleHeader12">&#x5B8C;&#x6210;&#x548C;&#x7EC8;&#x6B62;&#x8BF7;&#x6C42;/&#x54CD;&#x5E94;</h3><p>&#x5728;&#x6240;&#x6709;&#x62E6;&#x622A;&#x5668;&#x4E2D;&#xFF0C;&#x4F60;&#x90FD;&#x53EF;&#x4EE5;&#x6539;&#x53D8;&#x8BF7;&#x6C42;&#x6267;&#x884C;&#x6D41;&#xFF0C; &#x5982;&#x679C;&#x4F60;&#x60F3;&#x5B8C;&#x6210;&#x8BF7;&#x6C42;/&#x54CD;&#x5E94;&#x5E76;&#x8FD4;&#x56DE;&#x81EA;&#x5B9A;&#x4E49;&#x6570;&#x636E;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; <code>Response</code> &#x5BF9;&#x8C61;&#x6216;&#x8FD4;&#x56DE; <code>dio.resolve(data)</code>&#x7684;&#x7ED3;&#x679C;&#x3002; &#x5982;&#x679C;&#x4F60;&#x60F3;&#x7EC8;&#x6B62;(&#x89E6;&#x53D1;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#xFF0C;&#x4E0A;&#x5C42;<code>catchError</code>&#x4F1A;&#x88AB;&#x8C03;&#x7528;)&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;/&#x54CD;&#x5E94;&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<code>DioError</code> &#x5BF9;&#x8C61;&#x6216;&#x8FD4;&#x56DE; <code>dio.reject(errMsg)</code> &#x7684;&#x7ED3;&#x679C;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" dio.interceptor.request.onSend = (Options options){
     return dio.resolve(&quot;fake data&quot;)
 }
 Response response= await dio.get(&quot;/test&quot;);
 print(response.data);//&quot;fake data&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart"> dio.interceptor.request.onSend = (Options options){
     <span class="hljs-keyword">return</span> dio.resolve(<span class="hljs-string">&quot;fake data&quot;</span>)
 }
 Response response= <span class="hljs-keyword">await</span> dio.<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;/test&quot;</span>);
 <span class="hljs-built_in">print</span>(response.data);<span class="hljs-comment">//&quot;fake data&quot;</span></code></pre><h3 id="articleHeader13">&#x62E6;&#x622A;&#x5668;&#x4E2D;&#x652F;&#x6301;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;</h3><p>&#x62E6;&#x622A;&#x5668;&#x4E2D;&#x4E0D;&#x4EC5;&#x652F;&#x6301;&#x540C;&#x6B65;&#x4EFB;&#x52A1;&#xFF0C;&#x800C;&#x4E14;&#x4E5F;&#x652F;&#x6301;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;, &#x4E0B;&#x9762;&#x662F;&#x5728;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#x4E2D;&#x53D1;&#x8D77;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  dio.interceptor.request.onSend = (Options options) async{
     //...If no token, request token firstly.
     Response response = await dio.get(&quot;/token&quot;);
     //Set the token to headers
     options.headers[&quot;token&quot;] = response.data[&quot;data&quot;][&quot;token&quot;];
     return options; //continue
 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">  dio.interceptor.request.onSend = (Options options) <span class="hljs-keyword">async</span>{
     <span class="hljs-comment">//...If no token, request token firstly.</span>
     Response response = <span class="hljs-keyword">await</span> dio.<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;/token&quot;</span>);
     <span class="hljs-comment">//Set the token to headers</span>
     options.headers[<span class="hljs-string">&quot;token&quot;</span>] = response.data[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;token&quot;</span>];
     <span class="hljs-keyword">return</span> options; <span class="hljs-comment">//continue</span>
 }</code></pre><h3 id="articleHeader14">Lock/unlock &#x62E6;&#x622A;&#x5668;</h3><p>&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x62E6;&#x622A;&#x5668;&#x7684; <code>lock()</code>/<code>unlock</code> &#x65B9;&#x6CD5;&#x6765;&#x9501;&#x5B9A;/&#x89E3;&#x9501;&#x62E6;&#x622A;&#x5668;&#x3002;&#x4E00;&#x65E6;&#x8BF7;&#x6C42;/&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#x88AB;&#x9501;&#x5B9A;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x8BF7;&#x6C42;/&#x54CD;&#x5E94;&#x5C06;&#x4F1A;&#x5728;&#x8FDB;&#x5165;&#x8BF7;&#x6C42;/&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#x4E4B;&#x524D;&#x6392;&#x961F;&#x7B49;&#x5F85;&#xFF0C;&#x76F4;&#x5230;&#x89E3;&#x9501;&#x540E;&#xFF0C;&#x8FD9;&#x4E9B;&#x5165;&#x961F;&#x7684;&#x8BF7;&#x6C42;&#x624D;&#x4F1A;&#x7EE7;&#x7EED;&#x6267;&#x884C;(&#x8FDB;&#x5165;&#x62E6;&#x622A;&#x5668;)&#x3002;&#x8FD9;&#x5728;&#x4E00;&#x4E9B;&#x9700;&#x8981;&#x4E32;&#x884C;&#x5316;&#x8BF7;&#x6C42;/&#x54CD;&#x5E94;&#x7684;&#x573A;&#x666F;&#x4E2D;&#x975E;&#x5E38;&#x5B9E;&#x7528;&#xFF0C;&#x540E;&#x9762;&#x6211;&#x4EEC;&#x5C06;&#x7ED9;&#x51FA;&#x4E00;&#x4E2A;&#x793A;&#x4F8B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tokenDio=new Dio(); //Create a new instance to request the token.
tokenDio.options=dio;
dio.interceptor.request.onSend = (Options options) async{
     // If no token, request token firstly and lock this interceptor
     // to prevent other request enter this interceptor.
     dio.interceptor.request.lock();
     // We use a new Dio(to avoid dead lock) instance to request token.
     Response response = await tokenDio.get(&quot;/token&quot;);
     //Set the token to headers
     options.headers[&quot;token&quot;] = response.data[&quot;data&quot;][&quot;token&quot;];
     dio.interceptor.request.unlock()
     return options; //continue
 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">tokenDio=<span class="hljs-keyword">new</span> Dio(); <span class="hljs-comment">//Create a new instance to request the token.</span>
tokenDio.options=dio;
dio.interceptor.request.onSend = (Options options) <span class="hljs-keyword">async</span>{
     <span class="hljs-comment">// If no token, request token firstly and lock this interceptor</span>
     <span class="hljs-comment">// to prevent other request enter this interceptor.</span>
     dio.interceptor.request.lock();
     <span class="hljs-comment">// We use a new Dio(to avoid dead lock) instance to request token.</span>
     Response response = <span class="hljs-keyword">await</span> tokenDio.<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;/token&quot;</span>);
     <span class="hljs-comment">//Set the token to headers</span>
     options.headers[<span class="hljs-string">&quot;token&quot;</span>] = response.data[<span class="hljs-string">&quot;data&quot;</span>][<span class="hljs-string">&quot;token&quot;</span>];
     dio.interceptor.request.unlock()
     <span class="hljs-keyword">return</span> options; <span class="hljs-comment">//continue</span>
 }</code></pre><p><strong>Clear()</strong></p><p>&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x62E6;&#x622A;&#x5668;&#x7684;<code>clear()</code>&#x65B9;&#x6CD5;&#x6765;&#x6E05;&#x7A7A;&#x7B49;&#x5F85;&#x961F;&#x5217;&#x3002;</p><h3 id="articleHeader15">&#x522B;&#x540D;</h3><p>&#x5F53;<strong>&#x8BF7;&#x6C42;</strong>&#x62E6;&#x622A;&#x5668;&#x88AB;&#x9501;&#x5B9A;&#x65F6;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x8BF7;&#x6C42;&#x5C06;&#x4F1A;&#x6682;&#x505C;&#xFF0C;&#x8FD9;&#x7B49;&#x4EF7;&#x4E8E;&#x9501;&#x4F4F;&#x4E86;dio&#x5B9E;&#x4F8B;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;Dio&#x793A;&#x4F8B;&#x4E0A;&#x63D0;&#x4F9B;&#x4E86;<strong>&#x8BF7;&#x6C42;</strong>&#x62E6;&#x622A;&#x5668;<code>lock/unlock</code>&#x7684;&#x522B;&#x540D;&#x65B9;&#x6CD5;&#xFF1A;</p><p><strong>dio.lock() == dio.interceptor.request.lock()</strong></p><p><strong>dio.unlock() == dio.interceptor.request.unlock()</strong></p><p><strong>dio.clear() == dio.interceptor.request.clear()</strong></p><h3 id="articleHeader16">&#x793A;&#x4F8B;</h3><p>&#x5047;&#x8BBE;&#x8FD9;&#x4E48;&#x4E00;&#x4E2A;&#x573A;&#x666F;&#xFF1A;&#x51FA;&#x4E8E;&#x5B89;&#x5168;&#x539F;&#x56E0;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7ED9;&#x6240;&#x6709;&#x7684;&#x8BF7;&#x6C42;&#x5934;&#x4E2D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;csrfToken&#xFF0C;&#x5982;&#x679C;csrfToken&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x53BB;&#x8BF7;&#x6C42;csrfToken&#xFF0C;&#x83B7;&#x53D6;&#x5230;csrfToken&#x540E;&#xFF0C;&#x518D;&#x53D1;&#x8D77;&#x540E;&#x7EED;&#x8BF7;&#x6C42;&#x3002; &#x7531;&#x4E8E;&#x8BF7;&#x6C42;csrfToken&#x7684;&#x8FC7;&#x7A0B;&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x8BF7;&#x6C42;&#x8FC7;&#x7A0B;&#x4E2D;&#x9501;&#x5B9A;&#x540E;&#x7EED;&#x8BF7;&#x6C42;&#xFF08;&#x56E0;&#x4E3A;&#x5B83;&#x4EEC;&#x9700;&#x8981;csrfToken), &#x76F4;&#x5230;csrfToken&#x8BF7;&#x6C42;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x518D;&#x89E3;&#x9501;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dio.interceptor.request.onSend = (Options options) {
    print(&apos;send request&#xFF1A;path:${options.path}&#xFF0C;baseURL:${options.baseUrl}&apos;);
    if (csrfToken == null) {
      print(&quot;no token&#xFF0C;request token firstly...&quot;);
      //lock the dio.
      dio.lock();
      return tokenDio.get(&quot;/token&quot;).then((d) {
        options.headers[&quot;csrfToken&quot;] = csrfToken = d.data[&apos;data&apos;][&apos;token&apos;];
        print(&quot;request token succeed, value: &quot; + d.data[&apos;data&apos;][&apos;token&apos;]);
        print(&apos;continue to perform request&#xFF1A;path:${options.path}&#xFF0C;baseURL:${options.path}&apos;);
        return options;
      }).whenComplete(() =&gt; dio.unlock()); // unlock the dio
    } else {
      options.headers[&quot;csrfToken&quot;] = csrfToken;
      return options;
    }
  };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">dio.interceptor.request.onSend = (Options options) {
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&apos;send request&#xFF1A;path:<span class="hljs-subst">${options.path}</span>&#xFF0C;baseURL:<span class="hljs-subst">${options.baseUrl}</span>&apos;</span>);
    <span class="hljs-keyword">if</span> (csrfToken == <span class="hljs-keyword">null</span>) {
      <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;no token&#xFF0C;request token firstly...&quot;</span>);
      <span class="hljs-comment">//lock the dio.</span>
      dio.lock();
      <span class="hljs-keyword">return</span> tokenDio.<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;/token&quot;</span>).then((d) {
        options.headers[<span class="hljs-string">&quot;csrfToken&quot;</span>] = csrfToken = d.data[<span class="hljs-string">&apos;data&apos;</span>][<span class="hljs-string">&apos;token&apos;</span>];
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;request token succeed, value: &quot;</span> + d.data[<span class="hljs-string">&apos;data&apos;</span>][<span class="hljs-string">&apos;token&apos;</span>]);
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&apos;continue to perform request&#xFF1A;path:<span class="hljs-subst">${options.path}</span>&#xFF0C;baseURL:<span class="hljs-subst">${options.path}</span>&apos;</span>);
        <span class="hljs-keyword">return</span> options;
      }).whenComplete(() =&gt; dio.unlock()); <span class="hljs-comment">// unlock the dio</span>
    } <span class="hljs-keyword">else</span> {
      options.headers[<span class="hljs-string">&quot;csrfToken&quot;</span>] = csrfToken;
      <span class="hljs-keyword">return</span> options;
    }
  };</code></pre><p>&#x5B8C;&#x6574;&#x7684;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x8BF7;&#x70B9;&#x51FB; <a href="https://github.com/flutterchina/dio/blob/flutter/example/interceptorLock.dart" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>.</p><h2 id="articleHeader17">&#x9519;&#x8BEF;&#x5904;&#x7406;</h2><p>&#x5F53;&#x8BF7;&#x6C42;&#x8FC7;&#x7A0B;&#x4E2D;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x65F6;, Dio &#x4F1A;&#x5305;&#x88C5; <code>Error/Exception</code> &#x4E3A;&#x4E00;&#x4E2A; <code>DioError</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  try {
    //404
    await dio.get(&quot;https://wendux.github.io/xsddddd&quot;);
   } on DioError catch(e) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx and is also not 304.
      if(e.response) {
        print(e.response.data)
        print(e.response.headers)
        print(e.response.request)
      } else{
        // Something happened in setting up or sending the request that triggered an Error
        print(e.request)
        print(e.message)
      }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">//404</span>
    <span class="hljs-keyword">await</span> dio.<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;https://wendux.github.io/xsddddd&quot;</span>);
   } on DioError <span class="hljs-keyword">catch</span>(e) {
      <span class="hljs-comment">// The request was made and the server responded with a status code</span>
      <span class="hljs-comment">// that falls out of the range of 2xx and is also not 304.</span>
      <span class="hljs-keyword">if</span>(e.response) {
        <span class="hljs-built_in">print</span>(e.response.data)
        <span class="hljs-built_in">print</span>(e.response.headers)
        <span class="hljs-built_in">print</span>(e.response.request)
      } <span class="hljs-keyword">else</span>{
        <span class="hljs-comment">// Something happened in setting up or sending the request that triggered an Error</span>
        <span class="hljs-built_in">print</span>(e.request)
        <span class="hljs-built_in">print</span>(e.message)
      }
  }</code></pre><h3 id="articleHeader18">DioError &#x5B57;&#x6BB5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
  /// &#x54CD;&#x5E94;&#x4FE1;&#x606F;, &#x5982;&#x679C;&#x9519;&#x8BEF;&#x53D1;&#x751F;&#x5728;&#x5728;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x4E4B;&#x524D;&#xFF0C;&#x5B83;&#x4E3A; `null`
  Response response;

  /// &#x9519;&#x8BEF;&#x63CF;&#x8FF0;.
  String message;

  /// &#x9519;&#x8BEF;&#x7C7B;&#x578B;&#xFF0C;&#x89C1;&#x4E0B;&#x6587;
  DioErrorType type;

  /// &#x9519;&#x8BEF;&#x6808;&#x4FE1;&#x606F;&#xFF0C;&#x53EF;&#x80FD;&#x4E3A;null
  StackTrace stackTrace;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart"> {
  <span class="hljs-comment"><span class="markdown">/// &#x54CD;&#x5E94;&#x4FE1;&#x606F;, &#x5982;&#x679C;&#x9519;&#x8BEF;&#x53D1;&#x751F;&#x5728;&#x5728;&#x670D;&#x52A1;&#x5668;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x4E4B;&#x524D;&#xFF0C;&#x5B83;&#x4E3A; <span class="hljs-code">`null`</span></span></span>
  Response response;

  <span class="hljs-comment"><span class="markdown">/// &#x9519;&#x8BEF;&#x63CF;&#x8FF0;.</span></span>
  <span class="hljs-built_in">String</span> message;

  <span class="hljs-comment"><span class="markdown">/// &#x9519;&#x8BEF;&#x7C7B;&#x578B;&#xFF0C;&#x89C1;&#x4E0B;&#x6587;</span></span>
  DioErrorType type;

  <span class="hljs-comment"><span class="markdown">/// &#x9519;&#x8BEF;&#x6808;&#x4FE1;&#x606F;&#xFF0C;&#x53EF;&#x80FD;&#x4E3A;null</span></span>
  StackTrace stackTrace;
}</code></pre><h3 id="articleHeader19">DioErrorType</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum DioErrorType {
  /// Default error type, usually occurs before connecting the server.
  DEFAULT,

  /// When opening  url timeout, it occurs.
  CONNECT_TIMEOUT,

  ///  Whenever more than [receiveTimeout] (in milliseconds) passes between two events from response stream,
  ///  [Dio] will throw the [DioError] with [DioErrorType.RECEIVE_TIMEOUT].
  ///
  ///  Note: This is not the receiving time limitation.
  RECEIVE_TIMEOUT,

  /// When the server response, but with a incorrect status, such as 404, 503...
  RESPONSE,

  /// When the request is cancelled, dio will throw a error with this type.
  CANCEL
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart"><span class="hljs-keyword">enum</span> DioErrorType {
  <span class="hljs-comment"><span class="markdown">/// Default error type, usually occurs before connecting </span>the<span class="markdown"> server.</span></span>
  DEFAULT,

  <span class="hljs-comment"><span class="markdown">/// When opening  url timeout, it occurs.</span></span>
  CONNECT_TIMEOUT,

  <span class="hljs-comment"><span class="markdown">///  Whenever more than [receiveTimeout] (in milliseconds) passes between two events from response stream,</span></span>
  <span class="hljs-comment"><span class="markdown">///  [Dio] </span>will<span class="markdown"> throw </span>the<span class="markdown"> [DioError] with [DioErrorType.RECEIVE_TIMEOUT].</span></span>
  <span class="hljs-comment"><span class="markdown">///</span></span>
  <span class="hljs-comment"><span class="markdown">///  Note: This is not </span>the<span class="markdown"> receiving time limitation.</span></span>
  RECEIVE_TIMEOUT,

  <span class="hljs-comment"><span class="markdown">/// When </span>the<span class="markdown"> server response, </span>but<span class="markdown"> with </span>a<span class="markdown"> incorrect status, </span>such<span class="markdown"> as 404, 503...</span></span>
  RESPONSE,

  <span class="hljs-comment"><span class="markdown">/// When </span>the<span class="markdown"> request is cancelled, dio </span>will<span class="markdown"> throw </span>a<span class="markdown"> error with this type.</span></span>
  CANCEL
}</code></pre><h2 id="articleHeader20">&#x4F7F;&#x7528;application/x-www-form-urlencoded&#x7F16;&#x7801;</h2><p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;, Dio &#x4F1A;&#x5C06;&#x8BF7;&#x6C42;&#x6570;&#x636E;(&#x9664;&#x8FC7;String&#x7C7B;&#x578B;)&#x5E8F;&#x5217;&#x5316;&#x4E3A; <code>JSON</code>. &#x5982;&#x679C;&#x60F3;&#x8981;&#x4EE5; <code>application/x-www-form-urlencoded</code>&#x683C;&#x5F0F;&#x7F16;&#x7801;, &#x4F60;&#x53EF;&#x4EE5;&#x663E;&#x5F0F;&#x8BBE;&#x7F6E;<code>contentType</code> :</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Instance level
dio.options.contentType=ContentType.parse(&quot;application/x-www-form-urlencoded&quot;);
//or works once
dio.post(&quot;/info&quot;,data:{&quot;id&quot;:5}, options: new Options(contentType:ContentType.parse(&quot;application/x-www-form-urlencoded&quot;)))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart"><span class="hljs-comment">//Instance level</span>
dio.options.contentType=ContentType.parse(<span class="hljs-string">&quot;application/x-www-form-urlencoded&quot;</span>);
<span class="hljs-comment">//or works once</span>
dio.post(<span class="hljs-string">&quot;/info&quot;</span>,data:{<span class="hljs-string">&quot;id&quot;</span>:<span class="hljs-number">5</span>}, options: <span class="hljs-keyword">new</span> Options(contentType:ContentType.parse(<span class="hljs-string">&quot;application/x-www-form-urlencoded&quot;</span>)))</code></pre><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;<a href="https://github.com/flutterchina/dio/blob/flutter/example/options.dart" rel="nofollow noreferrer" target="_blank">&#x793A;&#x4F8B;</a>.</p><h2 id="articleHeader21">FormData</h2><p>Dio&#x652F;&#x6301;&#x53D1;&#x9001; FormData, &#x8BF7;&#x6C42;&#x6570;&#x636E;&#x5C06;&#x4F1A;&#x4EE5; <code>multipart/form-data</code>&#x65B9;&#x5F0F;&#x7F16;&#x7801;, FormData&#x4E2D;&#x53EF;&#x4EE5;&#x4E00;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x5305;&#x542B;&#x6587;&#x4EF6; .</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FormData formData = new FormData.from({
    &quot;name&quot;: &quot;wendux&quot;,
    &quot;age&quot;: 25,
    &quot;file&quot;: new UploadFileInfo(new File(&quot;./example/upload.txt&quot;), &quot;upload.txt&quot;)
});
response = await dio.post(&quot;/info&quot;, data: formData)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">FormData formData = <span class="hljs-keyword">new</span> FormData.from({
    <span class="hljs-string">&quot;name&quot;</span>: <span class="hljs-string">&quot;wendux&quot;</span>,
    <span class="hljs-string">&quot;age&quot;</span>: <span class="hljs-number">25</span>,
    <span class="hljs-string">&quot;file&quot;</span>: <span class="hljs-keyword">new</span> UploadFileInfo(<span class="hljs-keyword">new</span> File(<span class="hljs-string">&quot;./example/upload.txt&quot;</span>), <span class="hljs-string">&quot;upload.txt&quot;</span>)
});
response = <span class="hljs-keyword">await</span> dio.post(<span class="hljs-string">&quot;/info&quot;</span>, data: formData)</code></pre><blockquote>&#x6CE8;&#x610F;: &#x53EA;&#x6709; post &#x65B9;&#x6CD5;&#x652F;&#x6301;&#x53D1;&#x9001; FormData.</blockquote><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;<a href="https://github.com/flutterchina/dio/blob/flutter/example/formdata.dart" rel="nofollow noreferrer" target="_blank">&#x793A;&#x4F8B;</a>.</p><h2 id="articleHeader22">&#x8F6C;&#x6362;&#x5668;</h2><p>&#x8F6C;&#x6362;&#x5668;<code>Transformer</code> &#x7528;&#x4E8E;&#x5BF9;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x548C;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x7F16;&#x89E3;&#x7801;&#x5904;&#x7406;&#x3002;Dio&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#x8F6C;&#x6362;&#x5668;<code>DefaultTransformer</code>&#x4F5C;&#x4E3A;&#x9ED8;&#x8BA4;&#x7684; <code>Transformer</code>. &#x5982;&#x679C;&#x4F60;&#x60F3;&#x5BF9;&#x8BF7;&#x6C42;/&#x54CD;&#x5E94;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x81EA;&#x5B9A;&#x4E49;&#x7F16;&#x89E3;&#x7801;&#x5904;&#x7406;&#xFF0C;&#x53EF;&#x4EE5;&#x63D0;&#x4F9B;&#x81EA;&#x5B9A;&#x4E49;&#x8F6C;&#x6362;&#x5668;&#xFF0C;&#x901A;&#x8FC7; <code>dio.transformer</code>&#x8BBE;&#x7F6E;&#x3002;</p><blockquote>&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668; <code>Transformer.transformRequest(...)</code> &#x53EA;&#x4F1A;&#x88AB;&#x7528;&#x4E8E; &apos;PUT&apos;&#x3001; &apos;POST&apos;&#x3001; &apos;PATCH&apos;&#x65B9;&#x6CD5;&#xFF0C;&#x56E0;&#x4E3A;&#x53EA;&#x6709;&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x624D;&#x53EF;&#x4EE5;&#x643A;&#x5E26;&#x8BF7;&#x6C42;&#x4F53;(request body)&#x3002;&#x4F46;&#x662F;&#x54CD;&#x5E94;&#x8F6C;&#x6362;&#x5668; <code>Transformer.transformResponse()</code> &#x4F1A;&#x88AB;&#x7528;&#x4E8E;&#x6240;&#x6709;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x3002;</blockquote><h3 id="articleHeader23">&#x6267;&#x884C;&#x6D41;</h3><p>&#x867D;&#x7136;&#x5728;&#x62E6;&#x622A;&#x5668;&#x4E2D;&#x4E5F;&#x53EF;&#x4EE5;&#x5BF9;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x9884;&#x5904;&#x7406;&#xFF0C;&#x4F46;&#x662F;&#x8F6C;&#x6362;&#x5668;&#x4E3B;&#x8981;&#x804C;&#x8D23;&#x662F;&#x5BF9;&#x8BF7;&#x6C42;/&#x54CD;&#x5E94;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x7F16;&#x89E3;&#x7801;&#xFF0C;&#x4E4B;&#x6240;&#x4EE5;&#x5C06;&#x8F6C;&#x5316;&#x5668;&#x5355;&#x72EC;&#x5206;&#x79BB;&#xFF0C;&#x4E00;&#x662F;&#x4E3A;&#x4E86;&#x548C;&#x62E6;&#x622A;&#x5668;&#x89E3;&#x8026;&#xFF0C;&#x4E8C;&#x662F;&#x4E3A;&#x4E86;&#x4E0D;&#x4FEE;&#x6539;&#x539F;&#x59CB;&#x8BF7;&#x6C42;&#x6570;&#x636E;(&#x5982;&#x679C;&#x4F60;&#x5728;&#x62E6;&#x622A;&#x5668;&#x4E2D;&#x4FEE;&#x6539;&#x8BF7;&#x6C42;&#x6570;&#x636E;(options.data)&#xFF0C;&#x4F1A;&#x8986;&#x76D6;&#x539F;&#x59CB;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x5728;&#x67D0;&#x4E9B;&#x65F6;&#x5019;&#x60A8;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x539F;&#x59CB;&#x8BF7;&#x6C42;&#x6570;&#x636E;). Dio&#x7684;&#x8BF7;&#x6C42;&#x6D41;&#x662F;&#xFF1A;</p><p><em>&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;</em> &gt;&gt; <em>&#x8BF7;&#x6C42;&#x8F6C;&#x6362;&#x5668;</em> &gt;&gt; <em>&#x53D1;&#x8D77;&#x8BF7;&#x6C42;</em> &gt;&gt; <em>&#x54CD;&#x5E94;&#x8F6C;&#x6362;&#x5668;</em> &gt;&gt; <em>&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;</em> &gt;&gt; <em>&#x6700;&#x7EC8;&#x7ED3;&#x679C;</em>&#x3002;</p><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x8F6C;&#x6362;&#x5668;&#x7684;<a href="https://github.com/wendux/dio/blob/flutter/example/Transformer.dart" rel="nofollow noreferrer" target="_blank">&#x793A;&#x4F8B;</a>.</p><h2 id="articleHeader24">&#x8BBE;&#x7F6E;Http&#x4EE3;&#x7406;</h2><p>Dio &#x662F;&#x4F7F;&#x7528; HttpClient&#x53D1;&#x8D77;&#x7684;http&#x8BF7;&#x6C42;&#xFF0C;&#x6240;&#x4EE5;&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x914D;&#x7F6E; <code>httpClient</code>&#x6765;&#x652F;&#x6301;&#x4EE3;&#x7406;&#xFF0C;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  dio.onHttpClientCreate = (HttpClient client) {
    client.findProxy = (uri) {
      //proxy all request to localhost:8888
      return &quot;PROXY localhost:8888&quot;;
    };
    // &#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;HttpClient&#x5B9E;&#x4F8B;&#x8FD4;&#x56DE;&#x3002;
    // return new HttpClient(SecurityContext);
  };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">  dio.onHttpClientCreate = (HttpClient client) {
    client.findProxy = (uri) {
      <span class="hljs-comment">//proxy all request to localhost:8888</span>
      <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;PROXY localhost:8888&quot;</span>;
    };
    <span class="hljs-comment">// &#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;HttpClient&#x5B9E;&#x4F8B;&#x8FD4;&#x56DE;&#x3002;</span>
    <span class="hljs-comment">// return new HttpClient(SecurityContext);</span>
  };</code></pre><p>&#x5B8C;&#x6574;&#x7684;&#x793A;&#x4F8B;&#x8BF7;&#x67E5;&#x770B;<a href="https://github.com/wendux/dio/tree/flutter/example/proxy.dart" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>.</p><h2 id="articleHeader25">&#x8BF7;&#x6C42;&#x53D6;&#x6D88;</h2><p>&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <em>cancel token</em> &#x6765;&#x53D6;&#x6D88;&#x53D1;&#x8D77;&#x7684;&#x8BF7;&#x6C42;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CancelToken token = new CancelToken();
dio.get(url, cancelToken: token)
    .catchError((DioError err){
        if (CancelToken.isCancel(err)) {
            print(&apos;Request canceled! &apos;+ err.message)
        }else{
            // handle error.
        }
    })
// cancel the requests with &quot;cancelled&quot; message.
token.cancel(&quot;cancelled&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart">CancelToken token = <span class="hljs-keyword">new</span> CancelToken();
dio.<span class="hljs-keyword">get</span>(url, cancelToken: token)
    .catchError((DioError err){
        <span class="hljs-keyword">if</span> (CancelToken.isCancel(err)) {
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&apos;Request canceled! &apos;</span>+ err.message)
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-comment">// handle error.</span>
        }
    })
<span class="hljs-comment">// cancel the requests with &quot;cancelled&quot; message.</span>
token.cancel(<span class="hljs-string">&quot;cancelled&quot;</span>);</code></pre><blockquote>&#x6CE8;&#x610F;: &#x540C;&#x4E00;&#x4E2A;cancel token &#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x591A;&#x4E2A;&#x8BF7;&#x6C42;&#xFF0C;&#x5F53;&#x4E00;&#x4E2A;cancel token&#x53D6;&#x6D88;&#x65F6;&#xFF0C;&#x6240;&#x6709;&#x4F7F;&#x7528;&#x8BE5;cancel token&#x7684;&#x8BF7;&#x6C42;&#x90FD;&#x4F1A;&#x88AB;&#x53D6;&#x6D88;&#x3002;</blockquote><p>&#x5B8C;&#x6574;&#x7684;&#x793A;&#x4F8B;&#x8BF7;&#x53C2;&#x8003;<a href="https://github.com/flutterchina/dio/blob/flutter/example/cancelRequest.dart" rel="nofollow noreferrer" target="_blank">&#x53D6;&#x6D88;&#x793A;&#x4F8B;</a>.</p><h2 id="articleHeader26">Cookie&#x7BA1;&#x7406;</h2><p>&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>cookieJar</code> &#x6765;&#x81EA;&#x52A8;&#x7BA1;&#x7406;&#x8BF7;&#x6C42;/&#x54CD;&#x5E94;cookie.</p><blockquote>dio cookie &#x7BA1;&#x7406; API &#x662F;&#x57FA;&#x4E8E;&#x5F00;&#x6E90;&#x5E93; <a href="https://github.com/flutterchina/cookie_jar" rel="nofollow noreferrer" target="_blank">cookie_jar</a>.</blockquote><p>&#x4F60;&#x53EF;&#x4EE5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>CookieJar</code> &#x6216; <code>PersistCookieJar</code> &#x6765;&#x5E2E;&#x60A8;&#x81EA;&#x52A8;&#x7BA1;&#x7406;cookie, dio &#x9ED8;&#x8BA4;&#x4F7F;&#x7528; <code>CookieJar</code> , &#x5B83;&#x4F1A;&#x5C06;cookie&#x4FDD;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x3002; &#x5982;&#x679C;&#x60A8;&#x60F3;&#x5BF9;cookie&#x8FDB;&#x884C;&#x6301;&#x4E45;&#x5316;, &#x8BF7;&#x4F7F;&#x7528; <code>PersistCookieJar</code> , &#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dio = new Dio();
dio.cookieJar=new PersistCookieJar(&quot;./cookies&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="dart hljs"><code class="dart"><span class="hljs-keyword">var</span> dio = <span class="hljs-keyword">new</span> Dio();
dio.cookieJar=<span class="hljs-keyword">new</span> PersistCookieJar(<span class="hljs-string">&quot;./cookies&quot;</span>);</code></pre><p><code>PersistCookieJar</code> &#x5B9E;&#x73B0;&#x4E86;RFC&#x4E2D;&#x6807;&#x51C6;&#x7684;cookie&#x7B56;&#x7565;. <code>PersistCookieJar</code> &#x4F1A;&#x5C06;cookie&#x4FDD;&#x5B58;&#x5728;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x6240;&#x4EE5; cookies &#x4F1A;&#x4E00;&#x76F4;&#x5B58;&#x5728;&#x9664;&#x975E;&#x663E;&#x5F0F;&#x8C03;&#x7528; <code>delete</code> &#x5220;&#x9664;.</p><p>&#x66F4;&#x591A;&#x5173;&#x4E8E; <a href="https://github.com/flutterchina/" rel="nofollow noreferrer" target="_blank">cookie_jar</a> &#x8BF7;&#x53C2;&#x8003; : <a href="https://github.com/flutterchina/cookie_jar" rel="nofollow noreferrer" target="_blank">https://github.com/flutterchi...</a> .</p><h2 id="articleHeader27">Copyright &amp; License</h2><p>&#x6B64;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#x4E3A;Flutter&#x4E2D;&#x6587;&#x7F51;(<a href="https://flutterchina.club)" rel="nofollow noreferrer" target="_blank">https://flutterchina.club)</a> &#x6388;&#x6743; &#xFF0C;license &#x662F; MIT. &#x5982;&#x679C;&#x60A8;&#x559C;&#x6B22;&#xFF0C;&#x6B22;&#x8FCE;star.</p><p><strong>Flutter&#x4E2D;&#x6587;&#x7F51;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#x8BA1;&#x5212;</strong></p><p>&#x5F00;&#x53D1;&#x4E00;&#x7CFB;&#x5217;Flutter SDK&#x4E4B;&#x5916;&#x5E38;&#x7528;(&#x5B9E;&#x7528;)&#x7684;Package&#x3001;&#x63D2;&#x4EF6;&#xFF0C;&#x4E30;&#x5BCC;Flutter&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#xFF0C;&#x4E3A;Flutter&#x751F;&#x6001;&#x8D21;&#x732E;&#x6765;&#x81EA;&#x4E2D;&#x56FD;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x529B;&#x91CF;&#x3002;&#x6240;&#x6709;&#x9879;&#x76EE;&#x5C06;&#x53D1;&#x5E03;&#x5728;&#xA0;<a href="https://github.com/flutterchina/" rel="nofollow noreferrer" target="_blank">Github Flutter&#x4E2D;&#x6587;&#x7F51; Organization</a>&#xA0;&#xFF0C;&#x6240;&#x6709;&#x6E90;&#x7801;&#x8D21;&#x732E;&#x8005;&#x5C06;&#x52A0;&#x5165;&#x5230;&#x6211;&#x4EEC;&#x7684;Organization&#xFF0C;&#x6210;&#x4E3A;&#x6210;&#x5458;. &#x76EE;&#x524D;&#x793E;&#x533A;&#x5DF2;&#x6709;&#x51E0;&#x4E2A;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#x5F00;&#x59CB;&#x516C;&#x6D4B;&#xFF0C;&#x6B22;&#x8FCE;&#x60A8;&#x52A0;&#x5165;&#x5F00;&#x53D1;&#x6216;&#x6D4B;&#x8BD5;&#xFF0C;&#x8BE6;&#x60C5;&#x8BF7;&#x67E5;&#x770B;:&#xA0;<a href="https://flutterchina.club/opensource.html" rel="nofollow noreferrer" target="_blank">Flutter&#x4E2D;&#x6587;&#x7F51;&#x5F00;&#x6E90;&#x9879;&#x76EE;</a>&#x3002; &#x5982;&#x679C;&#x60A8;&#x60F3;&#x52A0;&#x5165;&#x5230;&#x201C;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#x8BA1;&#x5212;&#x201D;&#xFF0C; &#x8BF7;&#x53D1;&#x90AE;&#x4EF6;&#x5230;824783146@qq.com&#xFF0C; &#x5E76;&#x9644;&#x4E0A;&#x81EA;&#x6211;&#x4ECB;&#x7ECD;(&#x4E2A;&#x4EBA;&#x57FA;&#x672C;&#x4FE1;&#x606F;+&#x64C5;&#x957F;/&#x5173;&#x6CE8;&#x6280;&#x672F;)&#x3002;</p><h2 id="articleHeader28">Features and bugs</h2><p>Please file feature requests and bugs at the <a href="https://github.com/flutterchina/dio" rel="nofollow noreferrer" target="_blank">issue tracker</a>.</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
强大的Flutter http请求库dio

## 原文链接
[https://segmentfault.com/a/1190000015853959](https://segmentfault.com/a/1190000015853959)

