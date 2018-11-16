---
title: Vue原理解析——自己写个Vue
hidden: true
categories: [reprint]
slug: d202ae2d
date: 2018-11-08 02:30:09
---

{{< raw >}}
<blockquote>Vue&#x7531;&#x4E8E;&#x5176;&#x9AD8;&#x6548;&#x7684;&#x6027;&#x80FD;&#x548C;&#x7075;&#x6D3B;&#x5165;&#x95E8;&#x7B80;&#x5355;&#x3001;&#x8F7B;&#x91CF;&#x7684;&#x7279;&#x70B9;&#x4E0B;&#x53D8;&#x5F97;&#x706B;&#x70ED;&#x3002;&#x5728;&#x5F53;&#x4ECA;&#x524D;&#x7AEF;&#x8D8A;&#x6765;&#x8D8A;&#x666E;&#x904D;&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x4ECA;&#x5929;&#x6765;&#x5256;&#x6790;&#x4E00;&#x4E0B;Vue&#x7684;&#x6DF1;&#x5165;&#x54CD;&#x5E94;&#x5F0F;&#x539F;&#x7406;&#x3002;</blockquote><hr><p><strong>tips&#xFF1A;&#x8F6C;&#x81EA;&#x6211;&#x7684;&#x535A;&#x5BA2;<a href="http://www.tangyida.top" rel="nofollow noreferrer" target="_blank">&#x5510;&#x76CA;&#x8FBE;&#x535A;&#x5BA2;</a>&#xFF0C;&#x6B64;&#x4E3A;&#x539F;&#x521B;&#x3002;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#xFF0C;<a href="http://www.tangyida.top/detail/150" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x94FE;&#x63A5;</a></strong></p><hr><h3 id="articleHeader0">&#x4E00;&#x3001;Vue&#x5BF9;&#x6BD4;&#x5176;&#x4ED6;&#x6846;&#x67B6;&#x539F;&#x7406;</h3><p>Vue&#x76F8;&#x5BF9;&#x4E8E;React&#xFF0C;Angular&#x66F4;&#x52A0;&#x7EFC;&#x5408;&#x4E00;&#x70B9;&#x3002;AngularJS&#x5219;&#x4F7F;&#x7528;&#x4E86;&#x201C;&#x810F;&#x503C;&#x68C0;&#x6D4B;&#x201D;&#x3002;</p><p>React&#x5219;&#x91C7;&#x7528;&#x907F;&#x514D;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;DOM&#x7684;&#x865A;&#x62DF;dom&#x6811;&#x3002;&#x800C;Vue&#x5219;&#x91C7;&#x7528;&#x7684;&#x662F; <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">Object.defineProperty</a>&#x7279;&#x6027;&#xFF08;&#x8FD9;&#x5728;ES5&#x4E2D;&#x662F;&#x65E0;&#x6CD5;slim&#x7684;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;vue2.0&#x4E0D;&#x652F;&#x6301;ie8&#x4EE5;&#x4E0B;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF09;</p><p>Vue&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x5C24;&#x96E8;&#x6EAA;&#x4ECE;Angular&#x4E2D;&#x63D0;&#x70BC;&#x51FA;&#x6765;&#x7684;&#xFF0C;&#x53C8;&#x53C2;&#x7167;&#x4E86;React&#x7684;&#x6027;&#x80FD;&#x601D;&#x8DEF;&#xFF0C;&#x800C;&#x96C6;&#x5927;&#x6210;&#x7684;&#x4E00;&#x79CD;&#x8F7B;&#x91CF;&#x3001;&#x9AD8;&#x6548;&#xFF0C;&#x7075;&#x6D3B;&#x7684;&#x6846;&#x67B6;&#x3002;</p><h3 id="articleHeader1">&#x4E8C;&#x3001;Vue&#x7684;&#x539F;&#x7406;</h3><p>Vue&#x7684;&#x539F;&#x7406;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x5730;&#x4ECE;&#x4E0B;&#x5217;&#x56FE;&#x793A;&#x6240;&#x5F97;&#x51FA;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010352759" src="https://static.alili.tech/img/remote/1460000010352759" alt="" title="" style="cursor:pointer;display:inline"></span></p><ol><li>&#x901A;&#x8FC7;&#x5EFA;&#x7ACB;&#x865A;&#x62DF;dom&#x6811;<code>document.createDocumentFragment()</code>,&#x65B9;&#x6CD5;&#x521B;&#x5EFA;&#x865A;&#x62DF;dom&#x6811;&#x3002;</li><li>&#x4E00;&#x65E6;&#x88AB;&#x76D1;&#x6D4B;&#x7684;&#x6570;&#x636E;&#x6539;&#x53D8;&#xFF0C;&#x4F1A;&#x901A;&#x8FC7;<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="nofollow noreferrer" target="_blank">Object.defineProperty</a>&#x5B9A;&#x4E49;&#x7684;&#x6570;&#x636E;&#x62E6;&#x622A;&#xFF0C;&#x622A;&#x53D6;&#x5230;&#x6570;&#x636E;&#x7684;&#x53D8;&#x5316;&#x3002;</li><li>&#x622A;&#x53D6;&#x5230;&#x7684;&#x6570;&#x636E;&#x53D8;&#x5316;&#xFF0C;&#x4ECE;&#x800C;&#x901A;&#x8FC7;&#x8BA2;&#x9605;&#x2014;&#x2014;&#x53D1;&#x5E03;&#x8005;&#x6A21;&#x5F0F;&#xFF0C;&#x89E6;&#x53D1;Watcher&#xFF08;&#x89C2;&#x5BDF;&#x8005;&#xFF09;,&#x4ECE;&#x800C;&#x6539;&#x53D8;&#x865A;&#x62DF;dom&#x7684;&#x4E2D;&#x7684;&#x5177;&#x4F53;&#x6570;&#x636E;&#x3002;</li><li>&#x6700;&#x540E;&#xFF0C;&#x901A;&#x8FC7;&#x66F4;&#x65B0;&#x865A;&#x62DF;dom&#x7684;&#x5143;&#x7D20;&#x503C;&#xFF0C;&#x4ECE;&#x800C;&#x6539;&#x53D8;&#x6700;&#x540E;&#x6E32;&#x67D3;dom&#x6811;&#x7684;&#x503C;&#xFF0C;&#x5B8C;&#x6210;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;</li></ol><p>Vue&#x7684;&#x6A21;&#x5F0F;&#x662F;m-v-vm&#x6A21;&#x5F0F;&#xFF0C;&#x5373;&#xFF08;model-view-modelView&#xFF09;&#xFF0C;&#x901A;&#x8FC7;modelView&#x4F5C;&#x4E3A;&#x4E2D;&#x95F4;&#x5C42;&#xFF08;&#x5373;vm&#x7684;&#x5B9E;&#x4F8B;&#xFF09;&#xFF0C;&#x8FDB;&#x884C;&#x53CC;&#x5411;&#x6570;&#x636E;&#x7684;&#x7ED1;&#x5B9A;&#x4E0E;&#x53D8;&#x5316;&#x3002;</p><p>&#x800C;&#x5B9E;&#x73B0;&#x8FD9;&#x79CD;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x5173;&#x952E;&#x5C31;&#x5728;&#x4E8E;&#xFF1A;</p><p><strong>Object.defineProperty</strong>&#x548C;<strong>&#x8BA2;&#x9605;&#x2014;&#x2014;&#x53D1;&#x5E03;&#x8005;&#x6A21;&#x5F0F;</strong>&#x6D59;&#x4E24;&#x70B9;&#x3002;</p><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x5B9E;&#x4F8B;&#x6765;&#x5B9E;&#x73B0;Vue&#x7684;&#x57FA;&#x672C;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x3002;</p><h3 id="articleHeader2">&#x4E09;&#x3001;Vue&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x5B9E;&#x73B0;</h3><h4>3.1 &#x7B80;&#x6613;&#x53CC;&#x7ED1;</h4><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x628A;&#x6CE8;&#x610F;&#x529B;&#x96C6;&#x4E2D;&#x5728;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x4E0A;&#xFF1A;Object.defineProperty&#x3002;</p><blockquote><code>Object.defineProperty()</code> &#x65B9;&#x6CD5;&#x4F1A;&#x76F4;&#x63A5;&#x5728;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0A;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x65B0;&#x5C5E;&#x6027;&#xFF0C;&#x6216;&#x8005;&#x4FEE;&#x6539;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x73B0;&#x6709;&#x5C5E;&#x6027;&#xFF0C; &#x5E76;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;<p>&#x8BED;&#x6CD5;&#xFF1A;Object.defineProperty(obj, prop, descriptor)</p></blockquote><p>&#x4EC0;&#x4E48;&#x53EB;&#x505A;&#xFF0C;&#x5B9A;&#x4E49;&#x6216;&#x4FEE;&#x6539;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x65B0;&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
Object.defineProperty(obj,&apos;hello&apos;,{
  get:function(){
    //&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x91CC;&#x62E6;&#x622A;&#x5230;&#x4E86;&#x6570;&#x636E;
    console.log(&quot;get&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&quot;);
  },
  set:function(newValue){
    //&#x6539;&#x53D8;&#x6570;&#x636E;&#x7684;&#x503C;&#xFF0C;&#x62E6;&#x622A;&#x4E0B;&#x6765;&#x989D;
    console.log(&quot;set&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&quot;);
  }
});
obj.hello//&#x8F93;&#x51FA;&#x4E3A;&#x201C;get&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&#x201D;&#xFF0C;&#x8F93;&#x51FA;&#x4E86;&#x503C;&#x3002;
obj.hello = &apos;new Hello&apos;;//&#x8F93;&#x51FA;&#x4E3A;set&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x4FEE;&#x6539;&#x4E86;&#x65B0;&#x503C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {};
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">&apos;hello&apos;</span>,{
  <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x91CC;&#x62E6;&#x622A;&#x5230;&#x4E86;&#x6570;&#x636E;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;get&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&quot;</span>);
  },
  <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{
    <span class="hljs-comment">//&#x6539;&#x53D8;&#x6570;&#x636E;&#x7684;&#x503C;&#xFF0C;&#x62E6;&#x622A;&#x4E0B;&#x6765;&#x989D;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;set&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&quot;</span>);
  }
});
obj.hello<span class="hljs-comment">//&#x8F93;&#x51FA;&#x4E3A;&#x201C;get&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&#x201D;&#xFF0C;&#x8F93;&#x51FA;&#x4E86;&#x503C;&#x3002;</span>
obj.hello = <span class="hljs-string">&apos;new Hello&apos;</span>;<span class="hljs-comment">//&#x8F93;&#x51FA;&#x4E3A;set&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x4FEE;&#x6539;&#x4E86;&#x65B0;&#x503C;</span></code></pre><p>&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbg7xi?w=1164&amp;h=202" src="https://static.alili.tech/img/bVbg7xi?w=1164&amp;h=202" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x53EF;&#x4EE5;&#x4ECE;&#x8FD9;&#x91CC;&#x770B;&#x5230;&#xFF0C;&#x8FD9;&#x662F;&#x5728;&#x5BF9;&#x66F4;&#x5E95;&#x5C42;&#x7684;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x7F16;&#x7A0B;&#x3002;&#x7B80;&#x5355;&#x5730;&#x8BF4;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x5BF9;&#x5176;<strong>&#x66F4;&#x5E95;&#x5C42;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x7684;&#x4FEE;&#x6539;&#x6216;&#x83B7;&#x53D6;&#x7684;&#x9636;&#x6BB5;&#x8FDB;&#x884C;&#x4E86;&#x62E6;&#x622A;</strong>&#xFF08;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x66F4;&#x6539;&#x7684;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#xFF09;&#x3002;</p><p>&#x5728;&#x8FD9;&#x6570;&#x636E;&#x62E6;&#x622A;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#x6570;&#x636E;&#x7684;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};
Object.defineProperty(obj,&apos;hello&apos;,{
  get:function(){
    //&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x91CC;&#x62E6;&#x622A;&#x5230;&#x4E86;&#x6570;&#x636E;
    console.log(&quot;get&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&quot;);
  },
  set:function(newValue){
    //&#x6539;&#x53D8;&#x6570;&#x636E;&#x7684;&#x503C;&#xFF0C;&#x62E6;&#x622A;&#x4E0B;&#x6765;&#x989D;
    console.log(&quot;set&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&quot;);
    document.getElementById(&apos;test&apos;).value = newValue;
    document.getElementById(&apos;test1&apos;).innerHTML = newValue;
  }
});
//obj.hello;
//obj.hello = &apos;123&apos;;
document.getElementById(&apos;test&apos;).addEventListener(&apos;input&apos;,function(e){
  obj.hello = e.target.value;//&#x89E6;&#x53D1;&#x5B83;&#x7684;set&#x65B9;&#x6CD5;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {};
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">&apos;hello&apos;</span>,{
  <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x91CC;&#x62E6;&#x622A;&#x5230;&#x4E86;&#x6570;&#x636E;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;get&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&quot;</span>);
  },
  <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{
    <span class="hljs-comment">//&#x6539;&#x53D8;&#x6570;&#x636E;&#x7684;&#x503C;&#xFF0C;&#x62E6;&#x622A;&#x4E0B;&#x6765;&#x989D;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;set&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&quot;</span>);
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;test&apos;</span>).value = newValue;
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;test1&apos;</span>).innerHTML = newValue;
  }
});
<span class="hljs-comment">//obj.hello;</span>
<span class="hljs-comment">//obj.hello = &apos;123&apos;;</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;test&apos;</span>).addEventListener(<span class="hljs-string">&apos;input&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  obj.hello = e.target.value;<span class="hljs-comment">//&#x89E6;&#x53D1;&#x5B83;&#x7684;set&#x65B9;&#x6CD5;</span>
})</code></pre><p>html&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;mvvm&quot;&gt;
     &lt;input v-model=&quot;text&quot; id=&quot;test&quot;&gt;&lt;/input&gt;
      &lt;div id=&quot;test1&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;mvvm&quot;</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;test&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;test1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x5728;&#x7EBF;&#x6F14;&#x793A;&#xFF1A;<a href="http://www.tangyida.top/static/study/vueSource/demo.html" rel="nofollow noreferrer" target="_blank">demo&#x6F14;&#x793A;</a></p><p>&#x5728;&#x8FD9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x3002;&#x4F46;&#x662F;&#x5230;&#x8FD9;&#x8FD8;&#x4E0D;&#x591F;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x76EE;&#x7684;&#x662F;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;Vue&#x3002;</p><h4>3.2 Vue&#x521D;&#x59CB;&#x5316;&#xFF08;&#x865A;&#x62DF;&#x8282;&#x70B9;&#x7684;&#x4EA7;&#x751F;&#x4E0E;&#x7F16;&#x8BD1;&#xFF09;</h4><h5>3.2.1 Vue&#x7684;&#x865A;&#x62DF;&#x8282;&#x70B9;&#x5BB9;&#x5668;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function nodeContainer(node, vm, flag){
  var flag = flag || document.createDocumentFragment();

  var child;
  while(child = node.firstChild){
    compile(child, vm);
    flag.appendChild(child);
    if(child.firstChild){
      // flag.appendChild(nodeContainer(child,vm));
      nodeContainer(child, vm, flag);
    }
  }
  return flag;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nodeContainer</span>(<span class="hljs-params">node, vm, flag</span>)</span>{
  <span class="hljs-keyword">var</span> flag = flag || <span class="hljs-built_in">document</span>.createDocumentFragment();

  <span class="hljs-keyword">var</span> child;
  <span class="hljs-keyword">while</span>(child = node.firstChild){
    compile(child, vm);
    flag.appendChild(child);
    <span class="hljs-keyword">if</span>(child.firstChild){
      <span class="hljs-comment">// flag.appendChild(nodeContainer(child,vm));</span>
      nodeContainer(child, vm, flag);
    }
  }
  <span class="hljs-keyword">return</span> flag;
}</code></pre><p>&#x8FD9;&#x91CC;&#x51E0;&#x4E2A;&#x6CE8;&#x610F;&#x7684;&#x70B9;&#xFF1A;</p><ol><li><code>while(child = node.firstChild)</code>&#x628A;node&#x7684;firstChild&#x8D4B;&#x503C;&#x6210;while&#x7684;&#x6761;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x505A;&#x662F;&#x904D;&#x5386;&#x6240;&#x6709;&#x7684;dom&#x8282;&#x70B9;&#x3002;&#x4E00;&#x65E6;&#x904D;&#x5386;&#x5230;&#x5E95;&#x4E86;&#xFF0C;node&#x7684;firstChild&#x5C31;&#x4F1A;&#x672A;&#x5B9A;&#x4E49;&#x6210;undefined&#x5C31;&#x8DF3;&#x51FA;while&#x3002;</li><li><code>document.createDocumentFragment();</code>&#x662F;&#x4E00;&#x4E2A;&#x865A;&#x62DF;&#x8282;&#x70B9;&#x7684;&#x5BB9;&#x5668;&#x6811;&#xFF0C;&#x53EF;&#x4EE5;&#x5B58;&#x653E;&#x6211;&#x4EEC;&#x7684;&#x865A;&#x62DF;&#x8282;&#x70B9;&#x3002;</li><li>&#x4E0A;&#x9762;&#x7684;&#x51FD;&#x6570;&#x662F;&#x4E2A;&#x8FED;&#x4EE3;&#xFF0C;&#x4E00;&#x76F4;&#x5FAA;&#x73AF;&#x5230;&#x8282;&#x70B9;&#x7684;&#x7EC8;&#x70B9;&#x4E3A;&#x6B62;&#x3002;</li></ol><h5>3.2.2 Vue&#x7684;&#x8282;&#x70B9;&#x521D;&#x59CB;&#x5316;&#x7F16;&#x8BD1;</h5><p>&#x5148;&#x58F0;&#x660E;&#x4E00;&#x4E2A;Vue&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Vue(options){
  this.data = options.data;
  
  var id = options.el;
  var dom = nodeContainer(document.getElementById(id),this);
  document.getElementById(id).appendChild(dom);  
}

//&#x968F;&#x540E;&#x4F7F;&#x7528;&#x4ED6;
var Demo = new Vue({
  el:&apos;mvvm&apos;,
  data:{
    text:&apos;HelloWorld&apos;,
    d:&apos;123&apos;
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue</span>(<span class="hljs-params">options</span>)</span>{
  <span class="hljs-keyword">this</span>.data = options.data;
  
  <span class="hljs-keyword">var</span> id = options.el;
  <span class="hljs-keyword">var</span> dom = nodeContainer(<span class="hljs-built_in">document</span>.getElementById(id),<span class="hljs-keyword">this</span>);
  <span class="hljs-built_in">document</span>.getElementById(id).appendChild(dom);  
}

<span class="hljs-comment">//&#x968F;&#x540E;&#x4F7F;&#x7528;&#x4ED6;</span>
<span class="hljs-keyword">var</span> Demo = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>:<span class="hljs-string">&apos;mvvm&apos;</span>,
  <span class="hljs-attr">data</span>:{
    <span class="hljs-attr">text</span>:<span class="hljs-string">&apos;HelloWorld&apos;</span>,
    <span class="hljs-attr">d</span>:<span class="hljs-string">&apos;123&apos;</span>
  }
})</code></pre><p>&#x63A5;&#x4E0B;&#x53BB;&#x7684;&#x5177;&#x4F53;&#x5F97;&#x521D;&#x59CB;&#x5316;&#x5185;&#x5BB9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x7F16;&#x8BD1;
function compile(node, vm){
  var reg = /\{\{(.*)\}\}/g;//&#x5339;&#x914D;&#x53CC;&#x7ED1;&#x7684;&#x53CC;&#x5927;&#x62EC;&#x53F7;
  if(node.nodeType === 1){
    var attr = node.attributes;
    //&#x89E3;&#x6790;&#x8282;&#x70B9;&#x7684;&#x5C5E;&#x6027;
    for(var i = 0;i &lt; attr.length; i++){
      if(attr[i].nodeName == &apos;v-model&apos;){
        var name = attr[i].nodeValue;
        node.value = vm.data[name];//&#x8BB2;&#x5B9E;&#x4F8B;&#x4E2D;&#x7684;data&#x6570;&#x636E;&#x8D4B;&#x503C;&#x7ED9;&#x8282;&#x70B9;
        //node.removeAttribute(&apos;v-model&apos;);
      }
    }
  }
  //&#x5982;&#x679C;&#x8282;&#x70B9;&#x7C7B;&#x578B;&#x4E3A;text
  if(node.nodeType === 3){
    
    if(reg.test(node.nodeValue)){
      // console.dir(node);
      var name = RegExp.$1;//&#x83B7;&#x53D6;&#x5339;&#x914D;&#x5230;&#x7684;&#x5B57;&#x7B26;&#x4E32;
      name = name.trim();
      node.nodeValue = vm.data[name];
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x7F16;&#x8BD1;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compile</span>(<span class="hljs-params">node, vm</span>)</span>{
  <span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/\{\{(.*)\}\}/g</span>;<span class="hljs-comment">//&#x5339;&#x914D;&#x53CC;&#x7ED1;&#x7684;&#x53CC;&#x5927;&#x62EC;&#x53F7;</span>
  <span class="hljs-keyword">if</span>(node.nodeType === <span class="hljs-number">1</span>){
    <span class="hljs-keyword">var</span> attr = node.attributes;
    <span class="hljs-comment">//&#x89E3;&#x6790;&#x8282;&#x70B9;&#x7684;&#x5C5E;&#x6027;</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt; attr.length; i++){
      <span class="hljs-keyword">if</span>(attr[i].nodeName == <span class="hljs-string">&apos;v-model&apos;</span>){
        <span class="hljs-keyword">var</span> name = attr[i].nodeValue;
        node.value = vm.data[name];<span class="hljs-comment">//&#x8BB2;&#x5B9E;&#x4F8B;&#x4E2D;&#x7684;data&#x6570;&#x636E;&#x8D4B;&#x503C;&#x7ED9;&#x8282;&#x70B9;</span>
        <span class="hljs-comment">//node.removeAttribute(&apos;v-model&apos;);</span>
      }
    }
  }
  <span class="hljs-comment">//&#x5982;&#x679C;&#x8282;&#x70B9;&#x7C7B;&#x578B;&#x4E3A;text</span>
  <span class="hljs-keyword">if</span>(node.nodeType === <span class="hljs-number">3</span>){
    
    <span class="hljs-keyword">if</span>(reg.test(node.nodeValue)){
      <span class="hljs-comment">// console.dir(node);</span>
      <span class="hljs-keyword">var</span> name = <span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1</span>;<span class="hljs-comment">//&#x83B7;&#x53D6;&#x5339;&#x914D;&#x5230;&#x7684;&#x5B57;&#x7B26;&#x4E32;</span>
      name = name.trim();
      node.nodeValue = vm.data[name];
    }
  }
}</code></pre><p>&#x4EE3;&#x7801;&#x89E3;&#x91CA;&#xFF1A;</p><ol><li>&#x5F53;nodeType&#x4E3A;1&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8868;&#x793A;&#x662F;&#x4E2A;&#x5143;&#x7D20;&#x3002;&#x540C;&#x65F6;&#x6211;&#x4EEC;&#x8FDB;&#x884C;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;&#x8282;&#x70B9;&#x4E2D;&#x7684;&#x6307;&#x4EE4;&#x542B;&#x6709;<code>v-model</code>&#x8FD9;&#x4E2A;&#x6307;&#x4EE4;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5C31;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x8FDB;&#x884C;&#x5BF9;&#x8282;&#x70B9;&#x7684;&#x503C;&#x7684;&#x8D4B;&#x503C;&#x3002;</li><li>&#x5982;&#x679C;nodeType&#x4E3A;3&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;text&#x8282;&#x70B9;&#x5C5E;&#x6027;&#x3002;&#x8868;&#x793A;&#x4F60;&#x7684;&#x8282;&#x70B9;&#x5230;&#x4E86;&#x7EC8;&#x70B9;&#xFF0C;&#x4E00;&#x822C;&#x90FD;&#x662F;&#x8282;&#x70B9;&#x7684;&#x524D;&#x540E;&#x672B;&#x7AEF;&#x3002;&#x6211;&#x4EEC;&#x5E38;&#x5E38;&#x5728;&#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x6211;&#x4EEC;&#x7684;&#x53CC;&#x7ED1;&#x503C;&#x3002;&#x6B64;&#x65F6;&#x4E00;&#x65E6;&#x5339;&#x914D;&#x5230;&#x4E86;&#x53CC;&#x7ED1;&#xFF08;&#x53CC;&#x5927;&#x62EC;&#x53F7;&#xFF09;&#xFF0C;&#x5373;&#x8FDB;&#x884C;&#x503C;&#x7684;&#x521D;&#x59CB;&#x5316;&#x3002;</li></ol><p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x7684;Vue&#x521D;&#x59CB;&#x5316;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbhgZ5?w=1166&amp;h=616" src="https://static.alili.tech/img/bVbhgZ5?w=1166&amp;h=616" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5728;&#x7EBF;&#x6F14;&#x793A;&#xFF1A;<a href="http://www.tangyida.top/static/study/vueSource/demo1.html" rel="nofollow noreferrer" target="_blank">demo1</a></p><h4>3.3 Vue&#x7684;&#x58F0;&#x660E;&#x54CD;&#x5E94;&#x5F0F;</h4><h5>3.3.1 &#x5B9A;&#x4E49;Vue&#x7684;data&#x7684;&#x5C5E;&#x6027;&#x54CD;&#x5E94;&#x5F0F;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defineReactive (obj, key, value){
  Object.defineProperty(obj,key,{
    get:function(){
      console.log(&quot;get&#x4E86;&#x503C;&quot;+value);
      return value;//&#x83B7;&#x53D6;&#x5230;&#x4E86;&#x503C;
    },
    set:function(newValue){
      if(newValue === value){
        return;//&#x5982;&#x679C;&#x503C;&#x6CA1;&#x53D8;&#x5316;&#xFF0C;&#x4E0D;&#x7528;&#x89E6;&#x53D1;&#x65B0;&#x503C;&#x6539;&#x53D8;
      }
      value = newValue;//&#x6539;&#x53D8;&#x4E86;&#x503C;
      console.log(&quot;set&#x4E86;&#x6700;&#x65B0;&#x503C;&quot;+value);
    }
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params">obj, key, value</span>)</span>{
  <span class="hljs-built_in">Object</span>.defineProperty(obj,key,{
    <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;get&#x4E86;&#x503C;&quot;</span>+value);
      <span class="hljs-keyword">return</span> value;<span class="hljs-comment">//&#x83B7;&#x53D6;&#x5230;&#x4E86;&#x503C;</span>
    },
    <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{
      <span class="hljs-keyword">if</span>(newValue === value){
        <span class="hljs-keyword">return</span>;<span class="hljs-comment">//&#x5982;&#x679C;&#x503C;&#x6CA1;&#x53D8;&#x5316;&#xFF0C;&#x4E0D;&#x7528;&#x89E6;&#x53D1;&#x65B0;&#x503C;&#x6539;&#x53D8;</span>
      }
      value = newValue;<span class="hljs-comment">//&#x6539;&#x53D8;&#x4E86;&#x503C;</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;set&#x4E86;&#x6700;&#x65B0;&#x503C;&quot;</span>+value);
    }
  })
}</code></pre><p>&#x8FD9;&#x91CC;&#x7684;obj&#x6211;&#x4EEC;&#x8FD9;&#x5B9A;&#x4E49;&#x4E3A;vm&#x5B9E;&#x4F8B;&#x6216;&#x8005;vm&#x5B9E;&#x4F8B;&#x91CC;&#x9762;&#x7684;data&#x5C5E;&#x6027;&#x3002;</p><p>PS:&#x8FD9;&#x91CC;&#x5F3A;&#x8C03;&#x4E00;&#x4E0B;&#xFF0C;defineProperty&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;&#x5B9A;&#x4E49;obj&#x7684;&#x76F4;&#x63A5;&#x5C5E;&#x6027;&#xFF0C;&#x6BD4;&#x5982;obj.hello&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x3002;&#x4E5F;&#x53EF;&#x4EE5;&#x95F4;&#x63A5;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#x6BD4;&#x5982;&#xFF1A;obj.middle.hello&#x3002;&#x8FD9;&#x91CC;&#x5BFC;&#x81F4;&#x7684;&#x6548;&#x679C;&#x5C31;&#x662F;&#x4E24;&#x8005;&#x7684;hello&#x5C5E;&#x6027;&#x90FD;&#x88AB;&#x5B9A;&#x4E49;&#x6210;&#x54CD;&#x5E94;&#x5F0F;&#x4E86;&#x3002;</p><p>&#x7528;&#x4E0B;&#x5217;&#x7684;observe&#x65B9;&#x6CD5;&#x5FAA;&#x73AF;&#x8C03;&#x7528;&#x54CD;&#x5E94;&#x5F0F;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function observe (obj,vm){
  Object.keys(obj).forEach(function(key){
    defineReactive(vm,key,obj[key]);
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observe</span> (<span class="hljs-params">obj,vm</span>)</span>{
  <span class="hljs-built_in">Object</span>.keys(obj).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>)</span>{
    defineReactive(vm,key,obj[key]);
  })
}</code></pre><p>&#x7136;&#x540E;&#x518D;Vue&#x65B9;&#x6CD5;&#x4E2D;&#x521D;&#x59CB;&#x5316;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Vue(options){
  this.data = options.data;
  var data = this.data;
  -------------------------
  observe(data,this);//&#x8FD9;&#x91CC;&#x8C03;&#x7528;&#x5B9A;&#x4E49;&#x54CD;&#x5E94;&#x5F0F;&#x65B9;&#x6CD5;
  -------------------------
  var id = options.el;
  var dom = nodeContainer(document.getElementById(id),this);
  document.getElementById(id).appendChild(dom); //&#x628A;&#x865A;&#x62DF;dom&#x6E32;&#x67D3;&#x4E0A;&#x53BB; 
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue</span>(<span class="hljs-params">options</span>)</span>{
  <span class="hljs-keyword">this</span>.data = options.data;
  <span class="hljs-keyword">var</span> data = <span class="hljs-keyword">this</span>.data;
  -------------------------
  observe(data,<span class="hljs-keyword">this</span>);<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x8C03;&#x7528;&#x5B9A;&#x4E49;&#x54CD;&#x5E94;&#x5F0F;&#x65B9;&#x6CD5;</span>
  -------------------------
  <span class="hljs-keyword">var</span> id = options.el;
  <span class="hljs-keyword">var</span> dom = nodeContainer(<span class="hljs-built_in">document</span>.getElementById(id),<span class="hljs-keyword">this</span>);
  <span class="hljs-built_in">document</span>.getElementById(id).appendChild(dom); <span class="hljs-comment">//&#x628A;&#x865A;&#x62DF;dom&#x6E32;&#x67D3;&#x4E0A;&#x53BB; </span>
}</code></pre><p>&#x5728;&#x7F16;&#x8BD1;&#x65B9;&#x6CD5;&#x4E2D;v-model&#x5C5E;&#x6027;&#x627E;&#x5230;&#x7684;&#x65F6;&#x5019;&#x53BB;&#x76D1;&#x542C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compile(node, vm){
  var reg = /\{\{(.*)\}\}/g;
  if(node.nodeType === 1){
    var attr = node.attributes;
    //&#x89E3;&#x6790;&#x8282;&#x70B9;&#x7684;&#x5C5E;&#x6027;
    for(var i = 0;i &lt; attr.length; i++){
      if(attr[i].nodeName == &apos;v-model&apos;){
        
        var name = attr[i].nodeValue;
        -------------------------//&#x8FD9;&#x91CC;&#x65B0;&#x6DFB;&#x52A0;&#x7684;&#x76D1;&#x542C;
        node.addEventListener(&apos;input&apos;,function(e){
          console.log(vm[name]);
          vm[name] = e.target.value;//&#x6539;&#x53D8;&#x5B9E;&#x4F8B;&#x91CC;&#x9762;&#x7684;&#x503C;
        });
        -------------------------
        node.value = vm[name];//&#x8BB2;&#x5B9E;&#x4F8B;&#x4E2D;&#x7684;data&#x6570;&#x636E;&#x8D4B;&#x503C;&#x7ED9;&#x8282;&#x70B9;
        //node.removeAttribute(&apos;v-model&apos;);
      }
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compile</span>(<span class="hljs-params">node, vm</span>)</span>{
  <span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/\{\{(.*)\}\}/g</span>;
  <span class="hljs-keyword">if</span>(node.nodeType === <span class="hljs-number">1</span>){
    <span class="hljs-keyword">var</span> attr = node.attributes;
    <span class="hljs-comment">//&#x89E3;&#x6790;&#x8282;&#x70B9;&#x7684;&#x5C5E;&#x6027;</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt; attr.length; i++){
      <span class="hljs-keyword">if</span>(attr[i].nodeName == <span class="hljs-string">&apos;v-model&apos;</span>){
        
        <span class="hljs-keyword">var</span> name = attr[i].nodeValue;
        -------------------------<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x65B0;&#x6DFB;&#x52A0;&#x7684;&#x76D1;&#x542C;</span>
        node.addEventListener(<span class="hljs-string">&apos;input&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
          <span class="hljs-built_in">console</span>.log(vm[name]);
          vm[name] = e.target.value;<span class="hljs-comment">//&#x6539;&#x53D8;&#x5B9E;&#x4F8B;&#x91CC;&#x9762;&#x7684;&#x503C;</span>
        });
        -------------------------
        node.value = vm[name];<span class="hljs-comment">//&#x8BB2;&#x5B9E;&#x4F8B;&#x4E2D;&#x7684;data&#x6570;&#x636E;&#x8D4B;&#x503C;&#x7ED9;&#x8282;&#x70B9;</span>
        <span class="hljs-comment">//node.removeAttribute(&apos;v-model&apos;);</span>
      }
    }
  }
}</code></pre><p>&#x4EE5;&#x4E0A;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x4F60;&#x518D;&#x8F93;&#x5165;&#x6846;&#x91CC;&#x9762;&#x8F93;&#x5165;&#xFF0C;&#x540C;&#x65F6;&#x89E6;&#x53D1;getter&amp;setter&#xFF0C;&#x53BB;&#x6539;&#x53D8;vm&#x5B9E;&#x4F8B;&#x4E2D;data&#x7684;&#x503C;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;MVVM&#x7684;&#x56FE;&#x4F8B;&#x4E2D;&#x7ECF;&#x8FC7;getter&amp;setter&#x5DF2;&#x7ECF;&#x6210;&#x529F;&#x4E86;&#x3002;&#x63A5;&#x4E0B;&#x53BB;&#x5C31;&#x662F;&#x8BA2;&#x9605;&#x2014;&#x2014;&#x53D1;&#x5E03;&#x8005;&#x6A21;&#x5F0F;&#x3002;</p><p>&#x5728;&#x7EBF;&#x6F14;&#x793A;&#xFF1A;<a href="http://www.tangyida.top/static/study/vueSource/demo2.html" rel="nofollow noreferrer" target="_blank">demo2</a></p><p>&#x5B9E;&#x73B0;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbg7zx?w=1504&amp;h=402" src="https://static.alili.tech/img/bVbg7zx?w=1504&amp;h=402" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h4>3.4 &#x8BA2;&#x9605;&#x2014;&#x2014;&#x53D1;&#x5E03;&#x8005;&#x6A21;&#x5F0F;</h4><p>&#x4EC0;&#x4E48;&#x662F;&#x8BA2;&#x9605;&#x2014;&#x2014;&#x53D1;&#x5E03;&#x8005;&#xFF1F;&#x7B80;&#x5355;&#x70B9;&#x8BF4;&#xFF1A;&#x4F60;&#x5FAE;&#x4FE1;&#x91CC;&#x9762;&#x7ECF;&#x5E38;&#x4F1A;&#x8BA2;&#x9605;&#x4E00;&#x4E9B;&#x516C;&#x4F17;&#x53F7;&#xFF0C;&#x4E00;&#x65E6;&#x8FD9;&#x4E9B;&#x516C;&#x4F17;&#x53F7;&#x53D1;&#x5E03;&#x65B0;&#x6D88;&#x606F;&#x4E86;&#x3002;&#x90A3;&#x4E48;&#x4ED6;&#x5C31;&#x4F1A;&#x901A;&#x77E5;&#x4F60;&#xFF0C;&#x544A;&#x8BC9;&#x4F60;&#xFF1A;&#x6211;&#x53D1;&#x5E03;&#x4E86;&#x65B0;&#x4E1C;&#x897F;&#xFF0C;&#x5FEB;&#x6765;&#x770B;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x60C5;&#x666F;&#x4E0B;&#xFF0C;&#x4F60;&#x5C31;&#x662F;<strong>&#x8BA2;&#x9605;&#x8005;</strong>&#xFF0C;&#x516C;&#x4F17;&#x53F7;&#x5C31;&#x662F;<strong>&#x53D1;&#x5E03;&#x8005;</strong>&#x3002;</p><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8981;&#x6A21;&#x62DF;&#x8FD9;&#x79CD;&#x60C5;&#x666F;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x58F0;&#x660E;3&#x4E2A;&#x8BA2;&#x9605;&#x8005;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sub1 = {
  update:function(){
    console.log(1);
  }
}
var sub2 = {
  update:function(){
    console.log(2);
  }
}
var sub3 = {
  update:function(){
    console.log(3);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> sub1 = {
  <span class="hljs-attr">update</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
  }
}
<span class="hljs-keyword">var</span> sub2 = {
  <span class="hljs-attr">update</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
  }
}
<span class="hljs-keyword">var</span> sub3 = {
  <span class="hljs-attr">update</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
  }
}</code></pre><p>&#x6BCF;&#x4E2A;&#x8BA2;&#x9605;&#x8005;&#x5BF9;&#x8C61;&#x5185;&#x90E8;&#x58F0;&#x660E;&#x4E00;&#x4E2A;update&#x65B9;&#x6CD5;&#x6765;&#x89E6;&#x53D1;&#x8BA2;&#x9605;&#x5C5E;&#x6027;&#x3002;</p><p>&#x518D;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x53D1;&#x5E03;&#x8005;&#xFF0C;&#x53BB;&#x89E6;&#x53D1;&#x53D1;&#x5E03;&#x6D88;&#x606F;&#xFF0C;&#x901A;&#x77E5;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dep(){
  this.subs = [sub1,sub2,sub3];//&#x628A;&#x4E09;&#x4E2A;&#x8BA2;&#x9605;&#x8005;&#x52A0;&#x8FDB;&#x53BB;
}
Dep.prototype.notify = function(){//&#x5728;&#x539F;&#x578B;&#x4E0A;&#x58F0;&#x660E;&#x201C;&#x53D1;&#x5E03;&#x6D88;&#x606F;&#x201D;&#x65B9;&#x6CD5;
  this.subs.forEach(function(sub){
    sub.update();
  })
}
var dep = new Dep();
//pub.publish();
dep.notify();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dep</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>.subs = [sub1,sub2,sub3];<span class="hljs-comment">//&#x628A;&#x4E09;&#x4E2A;&#x8BA2;&#x9605;&#x8005;&#x52A0;&#x8FDB;&#x53BB;</span>
}
Dep.prototype.notify = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//&#x5728;&#x539F;&#x578B;&#x4E0A;&#x58F0;&#x660E;&#x201C;&#x53D1;&#x5E03;&#x6D88;&#x606F;&#x201D;&#x65B9;&#x6CD5;</span>
  <span class="hljs-keyword">this</span>.subs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sub</span>)</span>{
    sub.update();
  })
}
<span class="hljs-keyword">var</span> dep = <span class="hljs-keyword">new</span> Dep();
<span class="hljs-comment">//pub.publish();</span>
dep.notify();</code></pre><p>&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x58F0;&#x660E;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x5BF9;&#x8C61;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dep = new Dep();
var pub = {
  publish:function(){
    dep.notify();
  }
}
pub.publish();//&#x8FD9;&#x91CC;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x8DDF;&#x4E0A;&#x9762;&#x4E00;&#x6837;&#x7684;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> dep = <span class="hljs-keyword">new</span> Dep();
<span class="hljs-keyword">var</span> pub = {
  <span class="hljs-attr">publish</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    dep.notify();
  }
}
pub.publish();<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x8DDF;&#x4E0A;&#x9762;&#x4E00;&#x6837;&#x7684;</span></code></pre><p>&#x5B9E;&#x73B0;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbg7xL?w=1492&amp;h=230" src="https://static.alili.tech/img/bVbg7xL?w=1492&amp;h=230" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5230;&#x8FD9;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#xFF1A;</p><ol><li>&#x4FEE;&#x6539;&#x8F93;&#x5165;&#x6846;&#x5185;&#x5BB9; =&gt; &#x89E6;&#x53D1;&#x4FEE;&#x6539;vm&#x5B9E;&#x4F8B;&#x91CC;&#x7684;&#x5C5E;&#x6027;&#x503C; =&gt; &#x89E6;&#x53D1;set&amp;get&#x65B9;&#x6CD5;</li><li>&#x8BA2;&#x9605;&#x6210;&#x529F; =&gt; &#x53D1;&#x5E03;&#x8005;&#x53D1;&#x51FA;&#x901A;&#x77E5;notify() =&gt; &#x89E6;&#x53D1;&#x8BA2;&#x9605;&#x8005;&#x7684;update()&#x65B9;&#x6CD5;</li></ol><p>&#x63A5;&#x4E0B;&#x6765;&#x91CD;&#x70B9;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x662F;&#xFF1A;&#x5982;&#x4F55;&#x53BB;&#x66F4;&#x65B0;&#x89C6;&#x56FE;&#xFF0C;&#x540C;&#x65F6;&#x628A;&#x8BA2;&#x9605;&#x2014;&#x2014;&#x53D1;&#x5E03;&#x8005;&#x6A21;&#x5F0F;&#x8FDB;&#x53BB;watcher&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#xFF1F;</p><h4>3.5 &#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;</h4><p>&#x5148;&#x5B9A;&#x4E49;&#x53D1;&#x5E03;&#x8005;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dep(){
  this.subs = [];
}
Dep.prototype ={
  add:function(sub){//&#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x589E;&#x52A0;&#x8BA2;&#x9605;&#x8005;&#x7684;&#x65B9;&#x6CD5;
    this.subs.push(sub);
  },
  notify:function(){//&#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x89E6;&#x53D1;&#x8BA2;&#x9605;&#x8005;update()&#x7684;&#x901A;&#x77E5;&#x65B9;&#x6CD5;
    this.subs.forEach(function(sub){
      console.log(sub);
      sub.update();//&#x4E0B;&#x5217;&#x53D1;&#x5E03;&#x8005;&#x7684;&#x66F4;&#x65B0;&#x65B9;&#x6CD5;
    })
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dep</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>.subs = [];
}
Dep.prototype ={
  <span class="hljs-attr">add</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sub</span>)</span>{<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x589E;&#x52A0;&#x8BA2;&#x9605;&#x8005;&#x7684;&#x65B9;&#x6CD5;</span>
    <span class="hljs-keyword">this</span>.subs.push(sub);
  },
  <span class="hljs-attr">notify</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x89E6;&#x53D1;&#x8BA2;&#x9605;&#x8005;update()&#x7684;&#x901A;&#x77E5;&#x65B9;&#x6CD5;</span>
    <span class="hljs-keyword">this</span>.subs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sub</span>)</span>{
      <span class="hljs-built_in">console</span>.log(sub);
      sub.update();<span class="hljs-comment">//&#x4E0B;&#x5217;&#x53D1;&#x5E03;&#x8005;&#x7684;&#x66F4;&#x65B0;&#x65B9;&#x6CD5;</span>
    })
  }
}</code></pre><p>&#x518D;&#x5B9A;&#x4E49;&#x89C2;&#x5BDF;&#x8005;&#xFF08;&#x8BA2;&#x9605;&#x8005;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Watcher(vm,node,name){
  Dep.global = this;//&#x8FD9;&#x91CC;&#x5F88;&#x91CD;&#x8981;&#xFF01;&#x628A;&#x81EA;&#x5DF1;&#x8D4B;&#x503C;&#x7ED9;Dep&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;
  this.name = name;
  this.node = node;
  this.vm = vm;
  this.update();
  Dep.global = null;//&#x8FD9;&#x91CC;update()&#x5B8C;&#x8BB0;&#x5F97;&#x6E05;&#x7A7A;Dep&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;
}
Watcher.prototype.update = function(){
    this.get();
    switch (this.node.nodeType) { //&#x8FD9;&#x91CC;&#x53BB;&#x901A;&#x8FC7;&#x5224;&#x65AD;&#x8282;&#x70B9;&#x7684;&#x7C7B;&#x578B;&#x6539;&#x53D8;&#x89C6;&#x56FE;&#x7684;&#x503C;
      case 1: 
        this.node.value = this.value;
        break;
      case 3:
        this.node.nodeValue = this.value;
        break;
      default: break;
    };
}
Watcher.prototype.get = function(){
    this.value = this.vm[this.name];//&#x8FD9;&#x91CC;&#x628A;this&#x7684;value&#x503C;&#x8D4B;&#x503C;&#xFF0C;&#x89E6;&#x53D1;data&#x7684;defineProperty&#x65B9;&#x6CD5;&#x4E2D;&#x7684;get&#x65B9;&#x6CD5;&#xFF01;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Watcher</span>(<span class="hljs-params">vm,node,name</span>)</span>{
  Dep.global = <span class="hljs-keyword">this</span>;<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5F88;&#x91CD;&#x8981;&#xFF01;&#x628A;&#x81EA;&#x5DF1;&#x8D4B;&#x503C;&#x7ED9;Dep&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;</span>
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.node = node;
  <span class="hljs-keyword">this</span>.vm = vm;
  <span class="hljs-keyword">this</span>.update();
  Dep.global = <span class="hljs-literal">null</span>;<span class="hljs-comment">//&#x8FD9;&#x91CC;update()&#x5B8C;&#x8BB0;&#x5F97;&#x6E05;&#x7A7A;Dep&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;</span>
}
Watcher.prototype.update = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.get();
    <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">this</span>.node.nodeType) { <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x53BB;&#x901A;&#x8FC7;&#x5224;&#x65AD;&#x8282;&#x70B9;&#x7684;&#x7C7B;&#x578B;&#x6539;&#x53D8;&#x89C6;&#x56FE;&#x7684;&#x503C;</span>
      <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>: 
        <span class="hljs-keyword">this</span>.node.value = <span class="hljs-keyword">this</span>.value;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
        <span class="hljs-keyword">this</span>.node.nodeValue = <span class="hljs-keyword">this</span>.value;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">default</span>: <span class="hljs-keyword">break</span>;
    };
}
Watcher.prototype.get = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.vm[<span class="hljs-keyword">this</span>.name];<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x628A;this&#x7684;value&#x503C;&#x8D4B;&#x503C;&#xFF0C;&#x89E6;&#x53D1;data&#x7684;defineProperty&#x65B9;&#x6CD5;&#x4E2D;&#x7684;get&#x65B9;&#x6CD5;&#xFF01;</span>
}</code></pre><p>&#x4EE5;&#x4E0A;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x70B9;&#xFF1A;</p><ol><li>&#x5728;Watcher&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x65B9;&#x6CD5;update&#x91CC;&#x9762;&#x66F4;&#x65B0;&#x89C6;&#x56FE;&#x7684;&#x503C;&#xFF08;&#x5B9E;&#x73B0;watcher&#x5230;&#x89C6;&#x56FE;&#x5C42;&#x7684;&#x6539;&#x53D8;&#xFF09;&#x3002;</li><li>Watcher&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x65B9;&#x6CD5;get&#xFF0C;&#x662F;&#x4E3A;&#x4E86;&#x89E6;&#x53D1;defineProperty&#x65B9;&#x6CD5;&#x4E2D;&#x7684;get&#x65B9;&#x6CD5;&#xFF01;</li><li>&#x5728;new&#x4E00;&#x4E2A;Watcher&#x7684;&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8BB0;&#x5F97;&#x628A;Dep&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x8D4B;&#x503C;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x800C;&#x4E14;&#x53CA;&#x65F6;&#x6E05;&#x7A7A;&#x3002;&#x81F3;&#x4E8E;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x4E48;&#x505A;&#xFF0C;&#x6211;&#x4EEC;&#x63A5;&#x4E0B;&#x6765;&#x770B;&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defineReactive (obj, key, value){
  var dep = new Dep();//&#x8FD9;&#x91CC;&#x6BCF;&#x4E00;&#x4E2A;vm&#x7684;data&#x5C5E;&#x6027;&#x503C;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x8BA2;&#x9605;&#x8005;
  Object.defineProperty(obj,key,{
    get:function(){
      console.log(Dep.global);
      -----------------------
      if(Dep.global){//&#x8FD9;&#x91CC;&#x662F;&#x7B2C;&#x4E00;&#x6B21;new&#x5BF9;&#x8C61;Watcher&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5F80;&#x8BA2;&#x9605;&#x8005;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x5BF9;&#x8C61;&#x3002;&#x7B2C;&#x4E8C;&#x6B21;&#x540E;&#xFF0C;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x6DFB;&#x52A0;&#x4E86;
        dep.add(Dep.global);
      }
      -----------------------
      return value;
    },
    set:function(newValue){
      if(newValue === value){
        return;
      }
      value = newValue;
      dep.notify();//&#x89E6;&#x53D1;&#x4E86;update()&#x65B9;&#x6CD5;
    }
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params">obj, key, value</span>)</span>{
  <span class="hljs-keyword">var</span> dep = <span class="hljs-keyword">new</span> Dep();<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x6BCF;&#x4E00;&#x4E2A;vm&#x7684;data&#x5C5E;&#x6027;&#x503C;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x8BA2;&#x9605;&#x8005;</span>
  <span class="hljs-built_in">Object</span>.defineProperty(obj,key,{
    <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(Dep.global);
      -----------------------
      <span class="hljs-keyword">if</span>(Dep.global){<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x662F;&#x7B2C;&#x4E00;&#x6B21;new&#x5BF9;&#x8C61;Watcher&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5F80;&#x8BA2;&#x9605;&#x8005;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x6DFB;&#x52A0;&#x5BF9;&#x8C61;&#x3002;&#x7B2C;&#x4E8C;&#x6B21;&#x540E;&#xFF0C;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x6DFB;&#x52A0;&#x4E86;</span>
        dep.add(Dep.global);
      }
      -----------------------
      <span class="hljs-keyword">return</span> value;
    },
    <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{
      <span class="hljs-keyword">if</span>(newValue === value){
        <span class="hljs-keyword">return</span>;
      }
      value = newValue;
      dep.notify();<span class="hljs-comment">//&#x89E6;&#x53D1;&#x4E86;update()&#x65B9;&#x6CD5;</span>
    }
  })
}</code></pre><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x70B9;&#x9700;&#x8981;&#x6CE8;&#x610F;&#xFF1A;</p><p>&#x5728;&#x4E0A;&#x8FF0;&#x5708;&#x8D77;&#x6765;&#x7684;&#x5730;&#x65B9;&#xFF1A;<code>if(Dep.global)</code>&#x662F;&#x5728;&#x7B2C;&#x4E00;&#x6B21;<code>new Watcher()</code>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FDB;&#x5165;<code>update()</code>&#x65B9;&#x6CD5;&#xFF0C;&#x89E6;&#x53D1;&#x8FD9;&#x91CC;&#x7684;<code>get</code>&#x65B9;&#x6CD5;&#x3002;&#x8FD9;&#x91CC;&#x975E;&#x5E38;&#x7684;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x70B9;&#xFF01;&#x5728;&#x6B64;&#x65F6;<code>new Watcher()</code>&#x53EA;&#x8D70;&#x5230;&#x4E86;<code>this.update();</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6B64;&#x523B;&#x6CA1;&#x6709;&#x89E6;&#x53D1;<code>Dep.global = null</code>&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x503C;&#x5E76;&#x6CA1;&#x6709;&#x6E05;&#x7A7A;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x8FDB;&#x5230;<code>dep.add(Dep.global);</code>&#x65B9;&#x6CD5;&#x91CC;&#x9762;&#x53BB;&#x3002;</p><p>&#x800C;&#x7B2C;&#x4E8C;&#x6B21;&#x540E;&#xFF0C;&#x7531;&#x4E8E;&#x6E05;&#x7A7A;&#x4E86;Dep&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;add()&#x65B9;&#x6CD5;&#x3002;</p><blockquote>PS&#xFF1A;&#x8FD9;&#x4E2A;&#x601D;&#x8DEF;&#x5BB9;&#x6613;&#x88AB;&#x5FFD;&#x7565;&#xFF0C;&#x7531;&#x4E8E;&#x662F;&#x53C2;&#x8003;&#x4E4B;&#x524D;&#x4E00;&#x4E2A;&#x535A;&#x4E3B;&#x7684;&#x4EE3;&#x7801;&#x5F71;&#x54CD;&#xFF0C;&#x6211;&#x81EA;&#x5DF1;&#x60F3;&#x4E86;&#x5F88;&#x591A;&#x65B9;&#x6CD5;&#x6539;&#x53D8;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x8FD9;&#x79CD;&#x60C5;&#x666F;&#x4E0B;&#x96BE;&#x4EE5;&#x5B9E;&#x73B0;&#x522B;&#x7684;&#x66F4;&#x597D;&#x7684;&#x4EA4;&#x4E92;&#x65B9;&#x5F0F;&#x3002;<p>&#x6240;&#x4EE5;&#x6211;&#x6682;&#x65F6;&#x73B0;&#x5728;&#x53EA;&#x80FD;&#x4F7F;&#x7528;Dep&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x6765;&#x5B9E;&#x73B0;Dep&#x51FD;&#x6570;&#x4E0E;Watcher&#x51FD;&#x6570;&#x7684;&#x4EA4;&#x4E92;&#x3002;&#xFF08;&#x5982;&#x679C;&#x662F;ES6&#x7684;&#x6A21;&#x5757;&#x5316;&#x65B9;&#x6CD5;&#x4F1A;&#x4E0D;&#x4E00;&#x6837;&#xFF09;</p><p>&#x800C;&#x540E;&#x6211;&#x4F1A;&#x5C3D;&#x91CF;&#x627E;&#x5BFB;&#x5176;&#x4ED6;&#x66F4;&#x597D;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;Dep&#x51FD;&#x6570;&#x4E0E;Watcher&#x51FD;&#x6570;&#x7684;&#x4EA4;&#x4E92;&#x3002;</p></blockquote><p>&#x7D27;&#x63A5;&#x7740;&#x5728;<code>text</code>&#x8282;&#x70B9;&#x548C;<strong>&#x7ED1;&#x5B9A;&#x4E86;&#x7684;<code>input</code>&#x8282;&#x70B9;</strong>&#xFF08;&#x522B;&#x5FD8;&#x8BB0;&#x4E86;&#x8FD9;&#x4E2A;&#x8282;&#x70B9;&#xFF09;<code>new Watcher</code>&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x89E6;&#x53D1;&#x4EE5;&#x4E0A;&#x7684;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5982;&#x679C;&#x8282;&#x70B9;&#x4E3A;input
    if(node.nodeType === 1){ 
        ...........
        ----------
        new Watcher(vm,node,name) // &#x522B;&#x5FD8;&#x8BB0;&#x7ED9;input&#x6DFB;&#x52A0;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;
        ----------

    }
//&#x5982;&#x679C;&#x8282;&#x70B9;&#x7C7B;&#x578B;&#x4E3A;text
  if(node.nodeType === 3){
    
    if(reg.test(node.nodeValue)){
      // console.dir(node);
      var name = RegExp.$1;//&#x83B7;&#x53D6;&#x5339;&#x914D;&#x5230;&#x7684;&#x5B57;&#x7B26;&#x4E32;
      name = name.trim();
      // node.nodeValue = vm[name];
      -------------------------
      new Watcher(vm,node,name);//&#x8FD9;&#x91CC;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x8282;&#x70B9;&#xFF0C;new&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x89C2;&#x5BDF;&#x8005;
      -------------------------
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5982;&#x679C;&#x8282;&#x70B9;&#x4E3A;input</span>
    <span class="hljs-keyword">if</span>(node.nodeType === <span class="hljs-number">1</span>){ 
        ...........
        ----------
        <span class="hljs-keyword">new</span> Watcher(vm,node,name) <span class="hljs-comment">// &#x522B;&#x5FD8;&#x8BB0;&#x7ED9;input&#x6DFB;&#x52A0;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;</span>
        ----------

    }
<span class="hljs-comment">//&#x5982;&#x679C;&#x8282;&#x70B9;&#x7C7B;&#x578B;&#x4E3A;text</span>
  <span class="hljs-keyword">if</span>(node.nodeType === <span class="hljs-number">3</span>){
    
    <span class="hljs-keyword">if</span>(reg.test(node.nodeValue)){
      <span class="hljs-comment">// console.dir(node);</span>
      <span class="hljs-keyword">var</span> name = <span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1</span>;<span class="hljs-comment">//&#x83B7;&#x53D6;&#x5339;&#x914D;&#x5230;&#x7684;&#x5B57;&#x7B26;&#x4E32;</span>
      name = name.trim();
      <span class="hljs-comment">// node.nodeValue = vm[name];</span>
      -------------------------
      <span class="hljs-keyword">new</span> Watcher(vm,node,name);<span class="hljs-comment">//&#x8FD9;&#x91CC;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x8282;&#x70B9;&#xFF0C;new&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x89C2;&#x5BDF;&#x8005;</span>
      -------------------------
    }
  }</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;vue&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x5DF2;&#x7ECF;&#x7B80;&#x5355;&#x7684;&#x5B9E;&#x73B0;&#x3002;</p><h4>3.6 &#x6700;&#x7EC8;&#x6548;&#x679C;</h4><p>&#x5728;&#x7EBF;&#x6F14;&#x793A;&#xFF1A;<a href="https://codepen.io/xdnloveme/pen/YJYKLj" rel="nofollow noreferrer" target="_blank">Codepen&#x5B9E;&#x73B0;Vue&#x7684;demo&#xFF08;&#x6709;&#x65F6;&#x5019;&#x8981;&#x7FFB;&#x5899;&#xFF09;</a><button class="btn btn-xs btn-default ml10 preview" data-url="xdnloveme/pen/YJYKLj" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><p>&#x5728;&#x7EBF;&#x6E90;&#x7801;&#x53C2;&#x8003;&#xFF1A;<a href="http://www.tangyida.top/static/study/vueSource/demo4.html" rel="nofollow noreferrer" target="_blank">demo4</a></p><p>&#x4E0B;&#x5217;&#x662F;&#x5168;&#x90E8;&#x7684;&#x6E90;&#x7801;&#xFF0C;&#x4EC5;&#x4F9B;&#x53C2;&#x8003;&#x3002;</p><p>HTML&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;mvvm&quot;&gt;
     &lt;input v-model=&quot;d&quot; id=&quot;test&quot;&gt;{{text}}
    &lt;div&gt;{{d}}&lt;/div&gt;
  &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;mvvm&quot;</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;d&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;test&quot;</span>&gt;</span>"{{"text}}
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{"d"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>JS&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {};

function nodeContainer(node, vm, flag){
  var flag = flag || document.createDocumentFragment();

  var child;
  while(child = node.firstChild){
    compile(child, vm);
    flag.appendChild(child);
    if(child.firstChild){
      nodeContainer(child, vm, flag);
    }
  }
  return flag;
}

//&#x7F16;&#x8BD1;
function compile(node, vm){
  var reg = /\{\{(.*)\}\}/g;
  if(node.nodeType === 1){
    var attr = node.attributes;
    //&#x89E3;&#x6790;&#x8282;&#x70B9;&#x7684;&#x5C5E;&#x6027;
    for(var i = 0;i &lt; attr.length; i++){
      if(attr[i].nodeName == &apos;v-model&apos;){
        
        var name = attr[i].nodeValue;
        node.addEventListener(&apos;input&apos;,function(e){
          vm[name] = e.target.value;
        });

        node.value = vm[name];//&#x8BB2;&#x5B9E;&#x4F8B;&#x4E2D;&#x7684;data&#x6570;&#x636E;&#x8D4B;&#x503C;&#x7ED9;&#x8282;&#x70B9;
        node.removeAttribute(&apos;v-model&apos;);
      }
    }
  }
  //&#x5982;&#x679C;&#x8282;&#x70B9;&#x7C7B;&#x578B;&#x4E3A;text
  if(node.nodeType === 3){
    
    if(reg.test(node.nodeValue)){
      // console.dir(node);
      var name = RegExp.$1;//&#x83B7;&#x53D6;&#x5339;&#x914D;&#x5230;&#x7684;&#x5B57;&#x7B26;&#x4E32;
      name = name.trim();
      // node.nodeValue = vm[name];
      new Watcher(vm,node,name);
    }
  }
}

function defineReactive (obj, key, value){
  var dep = new Dep();
  Object.defineProperty(obj,key,{
    get:function(){
      console.log(Dep.global);
      if(Dep.global){
        dep.add(Dep.global);
      }
      console.log(&quot;get&#x4E86;&#x503C;&quot;+value);
      return value;
    },
    set:function(newValue){
      if(newValue === value){
        return;
      }
      value = newValue;
      console.log(&quot;set&#x4E86;&#x6700;&#x65B0;&#x503C;&quot;+value);
      dep.notify();
    }
  })
}

function observe (obj,vm){
  Object.keys(obj).forEach(function(key){
    defineReactive(vm,key,obj[key]);
  })
}

function Vue(options){
  this.data = options.data;
  var data = this.data;
  observe(data,this);
  var id = options.el;
  var dom = nodeContainer(document.getElementById(id),this);
  document.getElementById(id).appendChild(dom);  
}

function Dep(){
  this.subs = [];
}
Dep.prototype ={
  add:function(sub){
    this.subs.push(sub);
  },
  notify:function(){
    this.subs.forEach(function(sub){
      console.log(sub);
      sub.update();
    })
  }
}


function Watcher(vm,node,name){
  Dep.global = this;
  this.name = name;
  this.node = node;
  this.vm = vm;
  this.update();
  Dep.global = null;
}

Watcher.prototype = {
  update:function(){
    this.get();
    switch (this.node.nodeType) {
      case 1: 
        this.node.value = this.value;
        break;
      case 3:
        this.node.nodeValue = this.value;
        break;
      default: break;
    }
  },
  get:function(){
    this.value = this.vm[this.name];
  }
}


var Demo = new Vue({
  el:&apos;mvvm&apos;,
  data:{
    text:&apos;HelloWorld&apos;,
    d:&apos;123&apos;
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">nodeContainer</span>(<span class="hljs-params">node, vm, flag</span>)</span>{
  <span class="hljs-keyword">var</span> flag = flag || <span class="hljs-built_in">document</span>.createDocumentFragment();

  <span class="hljs-keyword">var</span> child;
  <span class="hljs-keyword">while</span>(child = node.firstChild){
    compile(child, vm);
    flag.appendChild(child);
    <span class="hljs-keyword">if</span>(child.firstChild){
      nodeContainer(child, vm, flag);
    }
  }
  <span class="hljs-keyword">return</span> flag;
}

<span class="hljs-comment">//&#x7F16;&#x8BD1;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compile</span>(<span class="hljs-params">node, vm</span>)</span>{
  <span class="hljs-keyword">var</span> reg = <span class="hljs-regexp">/\{\{(.*)\}\}/g</span>;
  <span class="hljs-keyword">if</span>(node.nodeType === <span class="hljs-number">1</span>){
    <span class="hljs-keyword">var</span> attr = node.attributes;
    <span class="hljs-comment">//&#x89E3;&#x6790;&#x8282;&#x70B9;&#x7684;&#x5C5E;&#x6027;</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt; attr.length; i++){
      <span class="hljs-keyword">if</span>(attr[i].nodeName == <span class="hljs-string">&apos;v-model&apos;</span>){
        
        <span class="hljs-keyword">var</span> name = attr[i].nodeValue;
        node.addEventListener(<span class="hljs-string">&apos;input&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
          vm[name] = e.target.value;
        });

        node.value = vm[name];<span class="hljs-comment">//&#x8BB2;&#x5B9E;&#x4F8B;&#x4E2D;&#x7684;data&#x6570;&#x636E;&#x8D4B;&#x503C;&#x7ED9;&#x8282;&#x70B9;</span>
        node.removeAttribute(<span class="hljs-string">&apos;v-model&apos;</span>);
      }
    }
  }
  <span class="hljs-comment">//&#x5982;&#x679C;&#x8282;&#x70B9;&#x7C7B;&#x578B;&#x4E3A;text</span>
  <span class="hljs-keyword">if</span>(node.nodeType === <span class="hljs-number">3</span>){
    
    <span class="hljs-keyword">if</span>(reg.test(node.nodeValue)){
      <span class="hljs-comment">// console.dir(node);</span>
      <span class="hljs-keyword">var</span> name = <span class="hljs-built_in">RegExp</span>.$<span class="hljs-number">1</span>;<span class="hljs-comment">//&#x83B7;&#x53D6;&#x5339;&#x914D;&#x5230;&#x7684;&#x5B57;&#x7B26;&#x4E32;</span>
      name = name.trim();
      <span class="hljs-comment">// node.nodeValue = vm[name];</span>
      <span class="hljs-keyword">new</span> Watcher(vm,node,name);
    }
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span> (<span class="hljs-params">obj, key, value</span>)</span>{
  <span class="hljs-keyword">var</span> dep = <span class="hljs-keyword">new</span> Dep();
  <span class="hljs-built_in">Object</span>.defineProperty(obj,key,{
    <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(Dep.global);
      <span class="hljs-keyword">if</span>(Dep.global){
        dep.add(Dep.global);
      }
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;get&#x4E86;&#x503C;&quot;</span>+value);
      <span class="hljs-keyword">return</span> value;
    },
    <span class="hljs-attr">set</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{
      <span class="hljs-keyword">if</span>(newValue === value){
        <span class="hljs-keyword">return</span>;
      }
      value = newValue;
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;set&#x4E86;&#x6700;&#x65B0;&#x503C;&quot;</span>+value);
      dep.notify();
    }
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observe</span> (<span class="hljs-params">obj,vm</span>)</span>{
  <span class="hljs-built_in">Object</span>.keys(obj).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>)</span>{
    defineReactive(vm,key,obj[key]);
  })
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue</span>(<span class="hljs-params">options</span>)</span>{
  <span class="hljs-keyword">this</span>.data = options.data;
  <span class="hljs-keyword">var</span> data = <span class="hljs-keyword">this</span>.data;
  observe(data,<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">var</span> id = options.el;
  <span class="hljs-keyword">var</span> dom = nodeContainer(<span class="hljs-built_in">document</span>.getElementById(id),<span class="hljs-keyword">this</span>);
  <span class="hljs-built_in">document</span>.getElementById(id).appendChild(dom);  
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dep</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>.subs = [];
}
Dep.prototype ={
  <span class="hljs-attr">add</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sub</span>)</span>{
    <span class="hljs-keyword">this</span>.subs.push(sub);
  },
  <span class="hljs-attr">notify</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.subs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sub</span>)</span>{
      <span class="hljs-built_in">console</span>.log(sub);
      sub.update();
    })
  }
}


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Watcher</span>(<span class="hljs-params">vm,node,name</span>)</span>{
  Dep.global = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.node = node;
  <span class="hljs-keyword">this</span>.vm = vm;
  <span class="hljs-keyword">this</span>.update();
  Dep.global = <span class="hljs-literal">null</span>;
}

Watcher.prototype = {
  <span class="hljs-attr">update</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.get();
    <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">this</span>.node.nodeType) {
      <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>: 
        <span class="hljs-keyword">this</span>.node.value = <span class="hljs-keyword">this</span>.value;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
        <span class="hljs-keyword">this</span>.node.nodeValue = <span class="hljs-keyword">this</span>.value;
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">default</span>: <span class="hljs-keyword">break</span>;
    }
  },
  <span class="hljs-attr">get</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.vm[<span class="hljs-keyword">this</span>.name];
  }
}


<span class="hljs-keyword">var</span> Demo = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>:<span class="hljs-string">&apos;mvvm&apos;</span>,
  <span class="hljs-attr">data</span>:{
    <span class="hljs-attr">text</span>:<span class="hljs-string">&apos;HelloWorld&apos;</span>,
    <span class="hljs-attr">d</span>:<span class="hljs-string">&apos;123&apos;</span>
  }
})</code></pre><h3 id="articleHeader3">&#x56DB;&#x3001;&#x56DE;&#x987E;</h3><p>&#x6211;&#x4EEC;&#x518D;&#x6765;&#x901A;&#x8FC7;&#x4E00;&#x5F20;&#x56FE;&#x56DE;&#x987E;&#x4E00;&#x4E0B;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhbjy?w=856&amp;h=449" src="https://static.alili.tech/img/bVbhbjy?w=856&amp;h=449" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4ECE;&#x4E0A;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x5927;&#x6982;&#x7684;&#x8FC7;&#x7A0B;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><ol><li>&#x5B9A;&#x4E49;Vue&#x5BF9;&#x8C61;&#xFF0C;&#x58F0;&#x660E;vue&#x7684;data&#x91CC;&#x9762;&#x7684;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x51C6;&#x5907;&#x521D;&#x59CB;&#x5316;&#x89E6;&#x53D1;observe&#x65B9;&#x6CD5;&#x3002;</li><li>&#x5728;Observe&#x5B9A;&#x4E49;&#x8FC7;&#x54CD;&#x5E94;&#x5F0F;&#x65B9;&#x6CD5;Object.defineProperty()&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5728;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x901A;&#x8FC7;Watcher&#x5BF9;&#x8C61;&#x8FDB;&#x884C;addDep&#x7684;&#x64CD;&#x4F5C;&#x3002;&#x5373;&#x6BCF;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;vue&#x7684;data&#x7684;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x5C31;&#x6DFB;&#x52A0;&#x5230;&#x4E00;&#x4E2A;Watcher&#x5BF9;&#x8C61;&#x5230;&#x8BA2;&#x9605;&#x8005;&#x91CC;&#x9762;&#x53BB;&#x3002;</li><li>&#x6BCF;&#x5F53;&#x5F62;&#x6210;&#x4E00;&#x4E2A;Watcher&#x5BF9;&#x8C61;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53BB;&#x5B9A;&#x4E49;&#x5B83;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x3002;&#x5373;<code>Object.defineProperty()</code>&#x5B9A;&#x4E49;&#x3002;&#x8FD9;&#x5C31;&#x5BFC;&#x81F4;&#x4E86;&#x4E00;&#x4E2A;Observe&#x91CC;&#x9762;&#x7684;getter&amp;setter&#x65B9;&#x6CD5;&#x4E0E;&#x8BA2;&#x9605;&#x8005;&#x5F62;&#x6210;&#x4E00;&#x79CD;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x3002;</li><li>&#x7531;&#x4E8E;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#x7684;&#x5B58;&#x5728;&#xFF0C;&#x6BCF;&#x5F53;&#x6570;&#x636E;&#x7684;&#x53D8;&#x5316;&#x540E;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;setter&#x65B9;&#x6CD5;&#xFF0C;&#x4ECE;&#x800C;&#x89E6;&#x53D1;notify&#x901A;&#x77E5;&#x65B9;&#x6CD5;&#xFF0C;&#x901A;&#x77E5;&#x8BA2;&#x9605;&#x8005;&#x6211;&#x7684;&#x6570;&#x636E;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x66F4;&#x65B0;&#x3002;</li><li>&#x8BA2;&#x9605;&#x8005;&#x4F1A;&#x89E6;&#x53D1;&#x5185;&#x90E8;&#x7684;update&#x65B9;&#x6CD5;&#xFF0C;&#x4ECE;&#x800C;&#x6539;&#x53D8;vm&#x5B9E;&#x4F8B;&#x7684;&#x503C;&#xFF0C;&#x4EE5;&#x53CA;&#x6BCF;&#x4E2A;Watcher&#x91CC;&#x9762;&#x5BF9;&#x5E94;node&#x7684;nodeValue&#xFF0C;&#x5373;&#x89C6;&#x56FE;&#x4E0A;&#x9762;&#x663E;&#x793A;&#x7684;&#x503C;&#x3002;</li><li>Watcher&#x91CC;&#x9762;&#x63A5;&#x6536;&#x5230;&#x4E86;&#x6D88;&#x606F;&#x540E;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x6539;&#x53D8;&#x5BF9;&#x5E94;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x7684;node&#x7684;&#x89C6;&#x56FE;&#x7684;value&#x503C;&#xFF0C;&#x800C;&#x6539;&#x53D8;&#x89C6;&#x56FE;&#x4E0A;&#x9762;&#x7684;&#x503C;&#x3002;</li><li>&#x81F3;&#x6B64;&#xFF0C;&#x89C6;&#x56FE;&#x7684;&#x503C;&#x6539;&#x53D8;&#x4E86;&#x3002;&#x5F62;&#x6210;&#x4E86;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;MVVM&#x7684;&#x6548;&#x679C;&#x3002;</li></ol><h3 id="articleHeader4">&#x4E94;&#x3001;&#x540E;&#x8BB0;</h3><p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x89E3;&#x6790;vue&#x7684;&#x7ED1;&#x5B9A;&#x539F;&#x7406;&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x7684;Vue&#x3002;</p><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x518D;&#x501F;&#x9274;&#x6B64;&#x601D;&#x8DEF;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FDB;&#x884C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x5B9A;&#x5236;&#x6846;&#x67B6;&#x7684;&#x4E8C;&#x6B21;&#x5F00;&#x53D1;&#x3002;&#x5982;&#x679C;&#x5F00;&#x53D1;&#x4EBA;&#x6570;&#x5C1A;&#x53EF;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x81EA;&#x5DF1;&#x6709;&#x7684;&#x4E00;&#x5957;&#x6846;&#x67B6;&#x3002;</p><p>&#x6211;&#x975E;&#x5E38;&#x91CD;&#x89C6;&#x6280;&#x672F;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x53EA;&#x6709;&#x771F;&#x6B63;&#x638C;&#x63E1;&#x6280;&#x672F;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x624D;&#x80FD;&#x5728;&#x539F;&#x6709;&#x7684;&#x6280;&#x672F;&#x4E0A;&#x66F4;&#x597D;&#x5730;&#x53BB;&#x63D0;&#x9AD8;&#x548C;&#x5F00;&#x53D1;&#x3002;</p><p>ps&#xFF1A;&#x6B64;&#x6587;&#x662F;&#x8F83;&#x65E9;&#x4E4B;&#x524D;&#x5199;&#x7684;&#xFF0C;&#x4E0D;&#x591F;&#x89C4;&#x8303;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x4FEE;&#x6539;&#x4E00;&#x4E2A;ES6&#x7684;&#x7248;&#x672C;&#x3002;&#x4E0B;&#x65B9;&#x662F;&#x53C2;&#x8003;&#x94FE;&#x63A5;&#xFF0C;&#x7075;&#x611F;&#x6765;&#x6E90;&#x4E8E;&#x5176;&#x4ED6;&#x535A;&#x4E3B;&#xFF0C;&#x6211;&#x8FDB;&#x884C;&#x4E86;&#x4FEE;&#x6B63;&#x4F18;&#x5316;&#x548C;&#x4EE3;&#x7801;&#x89E3;&#x91CA;&#x3002;</p><p>&#x53C2;&#x8003;&#x94FE;&#x63A5;&#xFF1A;</p><ol><li><a href="https://www.cnblogs.com/kidney/p/6052935.html" rel="nofollow noreferrer" target="_blank">Vue.js&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;</a></li><li><a href="https://github.com/DDFE/DDFE-blog/issues/7" rel="nofollow noreferrer" target="_blank">Vue &#x6E90;&#x7801;&#x89E3;&#x6790;&#xFF1A;&#x6DF1;&#x5165;&#x54CD;&#x5E94;&#x5F0F;&#x539F;&#x7406;</a></li><li><a href="https://cn.vuejs.org/v2/guide/reactivity.html" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;&#x54CD;&#x5E94;&#x5F0F;&#x539F;&#x7406;</a></li></ol><p>&#x539F;&#x6587;&#x5730;&#x5740;&#xFF08;&#x539F;&#x521B;&#x535A;&#x5BA2;&#xFF09;&#xFF1A;<a href="http://www.tangyida.top/detail/150" rel="nofollow noreferrer" target="_blank">http://www.tangyida.top/detail/150</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue原理解析——自己写个Vue

## 原文链接
[https://segmentfault.com/a/1190000016434836](https://segmentfault.com/a/1190000016434836)

