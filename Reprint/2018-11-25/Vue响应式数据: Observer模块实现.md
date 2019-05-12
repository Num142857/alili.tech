---
title: 'Vue响应式数据: Observer模块实现' 
date: 2018-11-25 2:30:07
hidden: true
slug: fgfzcidm9kc
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x3000;&#x3000;&#x9996;&#x5148;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x5173;&#x6CE8;&#x6211;&#x7684;<a href="https://github.com/MrErHu/blog" rel="nofollow noreferrer" target="_blank">Github&#x535A;&#x5BA2;</a>&#xFF0C;&#x4E5F;&#x7B97;&#x662F;&#x5BF9;&#x6211;&#x7684;&#x4E00;&#x70B9;&#x9F13;&#x52B1;&#xFF0C;&#x6BD5;&#x7ADF;&#x5199;&#x4E1C;&#x897F;&#x6CA1;&#x6CD5;&#x83B7;&#x5F97;&#x53D8;&#x73B0;&#xFF0C;&#x80FD;&#x575A;&#x6301;&#x4E0B;&#x53BB;&#x4E5F;&#x662F;&#x9760;&#x7684;&#x662F;&#x81EA;&#x5DF1;&#x7684;&#x70ED;&#x60C5;&#x548C;&#x5927;&#x5BB6;&#x7684;&#x9F13;&#x52B1;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x65E5;&#x5B50;&#x6211;&#x5E94;&#x8BE5;&#x4F1A;&#x7740;&#x529B;&#x5199;&#x4E00;&#x7CFB;&#x5217;&#x5173;&#x4E8E;Vue&#x4E0E;React&#x5185;&#x90E8;&#x539F;&#x7406;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x70B9;&#x4E2A;&#x5173;&#x6CE8;&#x6216;&#x8005;Star&#x3002;<br>&#x3000;&#x3000;&#x4E4B;&#x524D;&#x7684;&#x4E24;&#x7BC7;&#x6587;&#x7AE0;<a href="https://github.com/MrErHu/blog/issues/28" rel="nofollow noreferrer" target="_blank">&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x4E0E;&#x6570;&#x636E;&#x4F9D;&#x8D56;&#x57FA;&#x672C;&#x539F;&#x7406;</a>&#x548C;<a href="https://github.com/MrErHu/blog/issues/29" rel="nofollow noreferrer" target="_blank">&#x4ECE;Vue&#x6570;&#x7EC4;&#x54CD;&#x5E94;&#x5316;&#x6240;&#x5F15;&#x53D1;&#x7684;&#x601D;&#x8003;</a>&#x6211;&#x4EEC;&#x4ECB;&#x7ECD;&#x4E86;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x76F8;&#x5173;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x6CA1;&#x6709;&#x770B;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x70B9;&#x51FB;&#x4E0A;&#x9762;&#x7684;&#x94FE;&#x63A5;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#x3002;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x90FD;&#x9605;&#x8BFB;&#x8FC7;&#x4E0A;&#x9762;&#x4E24;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x8BDD;&#xFF0C;&#x80AF;&#x5B9A;&#x5BF9;&#x8FD9;&#x65B9;&#x9762;&#x5185;&#x5BB9;&#x6709;&#x4E86;&#x8DB3;&#x591F;&#x7684;&#x77E5;&#x8BC6;&#x50A8;&#x5907;&#xFF0C;&#x60F3;&#x6765;&#x662F;&#x65F6;&#x5019;&#x6765;&#x770B;&#x770B;Vue&#x5185;&#x90E8;&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x6570;&#x636E;&#x54CD;&#x5E94;&#x5316;&#x3002;&#x76EE;&#x524D;Vue&#x7684;&#x4EE3;&#x7801;&#x975E;&#x5E38;&#x5E9E;&#x5927;&#xFF0C;&#x4F46;&#x5176;&#x4E2D;&#x5305;&#x542B;&#x4E86;&#x4F8B;&#x5982;&#xFF1A;&#x670D;&#x52A1;&#x5668;&#x6E32;&#x67D3;&#x7B49;&#x6211;&#x4EEC;&#x4E0D;&#x5173;&#x5FC3;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x4E3A;&#x4E86;&#x80FD;&#x96C6;&#x4E2D;&#x4E8E;&#x6211;&#x4EEC;&#x60F3;&#x5B66;&#x4E60;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x6B21;&#x9605;&#x8BFB;&#x7684;&#x662F;Vue&#x7684;&#x65E9;&#x671F;&#x4EE3;&#x7801;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;<code>checkout</code>&#x5230;<a href="https://github.com/vuejs/vue/tree/4e062e9270c90d6c4e4105bb08f5a1bc61270e2e" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>&#x67E5;&#x770B;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;&#x3002;<br>&#x3000;&#x3000;&#x4E4B;&#x524D;&#x96F6;&#x96F6;&#x788E;&#x788E;&#x7684;&#x770B;&#x8FC7;React&#x7684;&#x90E8;&#x5206;&#x6E90;&#x7801;&#xFF0C;&#x5F53;&#x6211;&#x770B;&#x5230;Vue&#x7684;&#x6E90;&#x7801;&#xFF0C;&#x89C9;&#x5F97;&#x771F;&#x7684;&#x662F;&#x975E;&#x5E38;&#x4F18;&#x79C0;&#xFF0C;&#x5404;&#x4E2A;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x89E3;&#x8026;&#x7684;&#x975E;&#x5E38;&#x597D;&#xFF0C;&#x53EF;&#x8BFB;&#x6027;&#x4E5F;&#x5F88;&#x9AD8;&#x3002;Vue&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x662F;&#x5728;<code>Observer</code>&#x6A21;&#x5757;&#x4E2D;&#x5B9E;&#x73B0;&#x7684;,&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x770B;<code>Observer</code>&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7684;&#x3002;<br>&#x3000;&#x3000;</p><h2 id="articleHeader1">&#x53D1;&#x5E03;-&#x8BA2;&#x9605;&#x6A21;&#x5F0F;&#x3000;&#x3000;</h2><p>&#x3000;&#x3000;&#x5982;&#x679C;&#x770B;&#x8FC7;&#x4E0A;&#x4E24;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x540C;&#x5B66;&#x5E94;&#x8BE5;&#x4F1A;&#x53D1;&#x73B0;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x6570;&#x636E;&#x54CD;&#x5E94;&#x5316;&#x7684;&#x4EE3;&#x7801;&#x4E0E;&#x5176;&#x4ED6;&#x7684;&#x4EE3;&#x7801;&#x8026;&#x5408;&#x592A;&#x5F3A;&#x4E86;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;:<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x4EE3;&#x7801;&#x6765;&#x6E90;&#x4E8E;&#x6587;&#x7AE0;&#xFF1A;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x4E0E;&#x6570;&#x636E;&#x4F9D;&#x8D56;&#x57FA;&#x672C;&#x539F;&#x7406;
//&#x5B9A;&#x4E49;&#x5BF9;&#x8C61;&#x7684;&#x5355;&#x4E2A;&#x54CD;&#x5E94;&#x5F0F;&#x5C5E;&#x6027;
function defineReactive(obj, key, value){
  observify(value);
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    set: function(newValue){
      var oldValue = value;
      value = newValue;
      //&#x53EF;&#x4EE5;&#x5728;&#x4FEE;&#x6539;&#x6570;&#x636E;&#x65F6;&#x89E6;&#x53D1;&#x5176;&#x4ED6;&#x7684;&#x64CD;&#x4F5C;
      console.log(&quot;newValue: &quot;, newValue, &quot; oldValue: &quot;, oldValue);
    },
    get: function(){
      return value;
    }
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x4EE3;&#x7801;&#x6765;&#x6E90;&#x4E8E;&#x6587;&#x7AE0;&#xFF1A;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x4E0E;&#x6570;&#x636E;&#x4F9D;&#x8D56;&#x57FA;&#x672C;&#x539F;&#x7406;</span>
<span class="hljs-comment">//&#x5B9A;&#x4E49;&#x5BF9;&#x8C61;&#x7684;&#x5355;&#x4E2A;&#x54CD;&#x5E94;&#x5F0F;&#x5C5E;&#x6027;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineReactive</span>(<span class="hljs-params">obj, key, value</span>)</span>{
  observify(value);
  <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{
      <span class="hljs-keyword">var</span> oldValue = value;
      value = newValue;
      <span class="hljs-comment">//&#x53EF;&#x4EE5;&#x5728;&#x4FEE;&#x6539;&#x6570;&#x636E;&#x65F6;&#x89E6;&#x53D1;&#x5176;&#x4ED6;&#x7684;&#x64CD;&#x4F5C;</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;newValue: &quot;</span>, newValue, <span class="hljs-string">&quot; oldValue: &quot;</span>, oldValue);
    },
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">return</span> value;
    }
  });
}</code></pre><p>&#x3000;&#x3000;&#x6BD4;&#x5982;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;<code>set</code>&#x5185;&#x90E8;&#x7684;&#x5904;&#x7406;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x4E0E;&#x6574;&#x4E2A;&#x6570;&#x636E;&#x54CD;&#x5E94;&#x5316;&#x76F8;&#x8026;&#x5408;&#xFF0C;&#x5982;&#x679C;&#x4E0B;&#x6B21;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x5728;<code>set</code>&#x4E2D;&#x505A;&#x5176;&#x4ED6;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5C31;&#x5FC5;&#x987B;&#x8981;&#x4FEE;&#x6539;<code>set</code>&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x8FD9;&#x662F;&#x975E;&#x5E38;&#x4E0D;&#x53CB;&#x597D;&#x7684;&#xFF0C;&#x4E0D;&#x7B26;&#x5408;&#x5F00;&#x95ED;&#x539F;&#x5219;(OCP: Open Close Principle)&#x3002;&#x5F53;&#x7136;Vue&#x4E0D;&#x4F1A;&#x91C7;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x53BB;&#x8BBE;&#x8BA1;&#xFF0C;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;Vue&#x5F15;&#x5165;&#x4E86;<strong>&#x53D1;&#x5E03;-&#x8BA2;&#x9605;&#x6A21;&#x5F0F;</strong>&#x3002;&#x5176;&#x5B9E;&#x53D1;&#x5E03;-&#x8BA2;&#x9605;&#x6A21;&#x5F0F;&#x662F;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#x975E;&#x5E38;&#x719F;&#x6089;&#x7684;&#x4E00;&#x79CD;&#x6A21;&#x5F0F;&#xFF0C;&#x53C8;&#x53EB;&#x505A;<strong>&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;</strong>&#xFF0C;&#x5B83;&#x662F;&#x4E00;&#x79CD;&#x5B9A;&#x4E49;&#x5BF9;&#x8C61;&#x95F4;&#x4E00;&#x79CD;<strong>&#x4E00;&#x5BF9;&#x591A;</strong>&#x7684;&#x4F9D;&#x8D56;&#x5173;&#x7CFB;&#xFF0C;&#x5F53;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5176;&#x4ED6;&#x89C2;&#x5BDF;&#x5B83;&#x7684;&#x5BF9;&#x8C61;&#x90FD;&#x4F1A;&#x5F97;&#x5230;&#x901A;&#x77E5;&#x3002;&#x6211;&#x4EEC;&#x6700;&#x5E38;&#x89C1;&#x7684;DOM&#x4E8B;&#x4EF6;&#x5C31;&#x662F;&#x4E00;&#x79CD;<strong>&#x53D1;&#x5E03;-&#x8BA2;&#x9605;&#x6A21;&#x5F0F;</strong>&#x3002;&#x6BD4;&#x5982;&#xFF1A;<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.body.addEventListener(&quot;click&quot;, function(){
    console.log(&quot;click event&quot;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">document</span>.body.addEventListener(<span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;click event&quot;</span>);
});</code></pre><p>&#x3000;&#x3000;&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x6211;&#x4EEC;&#x76D1;&#x542C;&#x4E86;<code>body</code>&#x7684;<code>click</code>&#x4E8B;&#x4EF6;&#xFF0C;&#x867D;&#x7136;&#x6211;&#x4EEC;&#x4E0D;&#x77E5;&#x9053;<code>click</code>&#x4E8B;&#x4EF6;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x4F1A;&#x53D1;&#x751F;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x4E00;&#x5B9A;&#x80FD;&#x4FDD;&#x8BC1;&#xFF0C;&#x5982;&#x679C;&#x53D1;&#x751F;&#x4E86;<code>body</code>&#x7684;<code>click</code>&#x4E8B;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x5B9A;&#x80FD;&#x5F97;&#x5230;&#x901A;&#x77E5;&#xFF0C;&#x5373;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x3002;&#x5728;JavaScript&#x4E2D;&#x56E0;&#x4E3A;&#x51FD;&#x6570;&#x662F;&#x4E00;&#x7B49;&#x516C;&#x6C11;&#xFF0C;&#x6211;&#x4EEC;&#x5F88;&#x5C11;&#x4F7F;&#x7528;&#x4F20;&#x7EDF;&#x7684;&#x53D1;&#x5E03;-&#x8BA2;&#x9605;&#x6A21;&#x5F0F;&#xFF0C;&#x591A;&#x91C7;&#x7528;&#x7684;&#x662F;<strong>&#x4E8B;&#x4EF6;&#x6A21;&#x578B;</strong>&#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x3002;&#x5728;Vue&#x4E2D;&#x4E5F;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x6A21;&#x578B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x4E00;&#x4E0B;&#x3002;&#x56E0;&#x4E3A;Vue&#x7684;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x89E3;&#x8026;&#x7684;&#x975E;&#x5E38;&#x597D;&#xFF0C;&#x56E0;&#x6B64;&#x5728;&#x770B;&#x4EE3;&#x7801;&#x4E4B;&#x524D;&#xFF0C;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5148;&#x6765;&#x770B;&#x770B;&#x5BF9;&#x5E94;&#x7684;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x6587;&#x4EF6;&#xFF0C;&#x4F60;&#x5C31;&#x77E5;&#x9053;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x8981;&#x5B9E;&#x73B0;&#x4EC0;&#x4E48;&#x529F;&#x80FD;&#xFF0C;&#x751A;&#x81F3;&#x5982;&#x679C;&#x4F60;&#x613F;&#x610F;&#x7684;&#x8BDD;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;&#x7684;&#x6A21;&#x5757;&#x653E;&#x8FDB;Vue&#x7684;&#x6E90;&#x7801;&#x4E2D;&#x8FD0;&#x884C;&#x3002;</p><p>&#x3000;&#x3000;Vue&#x65E9;&#x671F;&#x4EE3;&#x7801;&#x4F7F;&#x7528;&#x662F;<code>jasmine</code>&#x8FDB;&#x884C;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;<code>emitter_spec.js</code>&#x662F;&#x4E8B;&#x4EF6;&#x6A21;&#x578B;&#x7684;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x6587;&#x4EF6;&#x3002;&#x9996;&#x5148;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;<code>jasmine</code>&#x7528;&#x5230;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x5BF9;&#x7167;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E86;&#x89E3;&#x5177;&#x4F53;&#x7684;&#x529F;&#x80FD;&#xFF1A;</p><ul><li><code>describe</code>&#x662F;&#x4E00;&#x4E2A;&#x6D4B;&#x8BD5;&#x5355;&#x5143;&#x96C6;&#x5408;</li><li><code>it</code>&#x662F;&#x4E00;&#x4E2A;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;</li><li><code>beforeEach</code>&#x4F1A;&#x5728;&#x6BCF;&#x4E00;&#x4E2A;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;<code>it</code>&#x6267;&#x884C;&#x524D;&#x6267;&#x884C;</li><li><code>expect</code>&#x671F;&#x671B;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x4F5C;&#x5BF9;&#x671F;&#x671B;&#x503C;&#x548C;&#x5B9E;&#x9645;&#x503C;&#x4E4B;&#x95F4;&#x6267;&#x884C;&#x903B;&#x8F91;&#x6BD4;&#x8F83;</li><li><code>createSpy</code>&#x7528;&#x6765;&#x521B;&#x5EFA;spy,&#x800C;spy&#x7684;&#x4F5C;&#x7528;&#x662F;&#x76D1;&#x6D4B;&#x51FD;&#x6570;&#x7684;<strong>&#x8C03;&#x7528;</strong>&#x76F8;&#x5173;&#x4FE1;&#x606F;&#x548C;<strong>&#x51FD;&#x6570;&#x6267;&#x884C;&#x53C2;&#x6570;</strong></li></ul><p>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Emitter = require(&apos;../../../src/emitter&apos;)
var u = undefined
// &#x4EE3;&#x7801;&#x6709;&#x5220;&#x51CF;
describe(&apos;Emitter&apos;, function () {

  var e, spy
  beforeEach(function () {
    e = new Emitter()
    spy = jasmine.createSpy(&apos;emitter&apos;)
  })
  
  it(&apos;on&apos;, function () {
    e.on(&apos;test&apos;, spy)
    e.emit(&apos;test&apos;, 1, 2 ,3)
    expect(spy.calls.count()).toBe(1)
    expect(spy).toHaveBeenCalledWith(1, 2, 3)
  })

  it(&apos;once&apos;, function () {
    e.once(&apos;test&apos;, spy)
    e.emit(&apos;test&apos;, 1, 2 ,3)
    e.emit(&apos;test&apos;, 2, 3, 4)
    expect(spy.calls.count()).toBe(1)
    expect(spy).toHaveBeenCalledWith(1, 2, 3)
  })

  it(&apos;off&apos;, function () {
    e.on(&apos;test1&apos;, spy)
    e.on(&apos;test2&apos;, spy)
    e.off()
    e.emit(&apos;test1&apos;)
    e.emit(&apos;test2&apos;)
    expect(spy.calls.count()).toBe(0)
  })
  
  it(&apos;apply emit&apos;, function () {
    e.on(&apos;test&apos;, spy)
    e.applyEmit(&apos;test&apos;, 1)
    e.applyEmit(&apos;test&apos;, 1, 2, 3, 4, 5)
    expect(spy).toHaveBeenCalledWith(1)
    expect(spy).toHaveBeenCalledWith(1, 2, 3, 4, 5)
  })

})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Emitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../../../src/emitter&apos;</span>)
<span class="hljs-keyword">var</span> u = <span class="hljs-literal">undefined</span>
<span class="hljs-comment">// &#x4EE3;&#x7801;&#x6709;&#x5220;&#x51CF;</span>
describe(<span class="hljs-string">&apos;Emitter&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

  <span class="hljs-keyword">var</span> e, spy
  beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    e = <span class="hljs-keyword">new</span> Emitter()
    spy = jasmine.createSpy(<span class="hljs-string">&apos;emitter&apos;</span>)
  })
  
  it(<span class="hljs-string">&apos;on&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    e.on(<span class="hljs-string">&apos;test&apos;</span>, spy)
    e.emit(<span class="hljs-string">&apos;test&apos;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span> ,<span class="hljs-number">3</span>)
    expect(spy.calls.count()).toBe(<span class="hljs-number">1</span>)
    expect(spy).toHaveBeenCalledWith(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
  })

  it(<span class="hljs-string">&apos;once&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    e.once(<span class="hljs-string">&apos;test&apos;</span>, spy)
    e.emit(<span class="hljs-string">&apos;test&apos;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span> ,<span class="hljs-number">3</span>)
    e.emit(<span class="hljs-string">&apos;test&apos;</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>)
    expect(spy.calls.count()).toBe(<span class="hljs-number">1</span>)
    expect(spy).toHaveBeenCalledWith(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
  })

  it(<span class="hljs-string">&apos;off&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    e.on(<span class="hljs-string">&apos;test1&apos;</span>, spy)
    e.on(<span class="hljs-string">&apos;test2&apos;</span>, spy)
    e.off()
    e.emit(<span class="hljs-string">&apos;test1&apos;</span>)
    e.emit(<span class="hljs-string">&apos;test2&apos;</span>)
    expect(spy.calls.count()).toBe(<span class="hljs-number">0</span>)
  })
  
  it(<span class="hljs-string">&apos;apply emit&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    e.on(<span class="hljs-string">&apos;test&apos;</span>, spy)
    e.applyEmit(<span class="hljs-string">&apos;test&apos;</span>, <span class="hljs-number">1</span>)
    e.applyEmit(<span class="hljs-string">&apos;test&apos;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>)
    expect(spy).toHaveBeenCalledWith(<span class="hljs-number">1</span>)
    expect(spy).toHaveBeenCalledWith(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>)
  })

})</code></pre><p>&#x3000;&#x3000;&#x53EF;&#x4EE5;&#x770B;&#x51FA;<code>Emitter</code>&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#x5BF9;&#x5916;&#x63D0;&#x4F9B;&#x4EE5;&#x4E0B;&#x63A5;&#x53E3;&#xFF1A;</p><ul><li><code>on</code>: &#x6CE8;&#x518C;&#x76D1;&#x542C;&#x63A5;&#x53E3;&#xFF0C;&#x53C2;&#x6570;&#x5206;&#x522B;&#x662F;<strong>&#x4E8B;&#x4EF6;&#x540D;</strong>&#x548C;<strong>&#x76D1;&#x542C;&#x51FD;&#x6570;</strong></li><li><code>emit</code>: &#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x51FD;&#x6570;&#xFF0C;&#x53C2;&#x6570;&#x662F;<strong>&#x4E8B;&#x4EF6;&#x540D;</strong></li><li><code>off</code>: &#x53D6;&#x6D88;&#x5BF9;&#x5E94;&#x4E8B;&#x4EF6;&#x7684;&#x6CE8;&#x518C;&#x51FD;&#x6570;&#xFF0C;&#x53C2;&#x6570;&#x5206;&#x522B;&#x662F;<strong>&#x4E8B;&#x4EF6;&#x540D;</strong>&#x548C;<strong>&#x76D1;&#x542C;&#x51FD;&#x6570;</strong></li><li><code>once</code>: &#x4E0E;<code>on</code>&#x7C7B;&#x4F3C;&#xFF0C;&#x4EC5;&#x4F1A;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x65F6;&#x901A;&#x77E5;&#x76D1;&#x542C;&#x51FD;&#x6570;&#xFF0C;&#x968F;&#x540E;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x4F1A;&#x88AB;&#x79FB;&#x9664;&#x3002;</li></ul><p>&#x3000;&#x3000;&#x770B;&#x5B8C;&#x4E86;&#x4E0A;&#x9762;&#x7684;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x57FA;&#x672C;&#x4E86;&#x89E3;&#x4E86;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x8981;&#x5E72;&#x4EC0;&#x4E48;&#xFF0C;&#x73B0;&#x5728;&#x8BA9;&#x6211;&#x4EEC;&#x770B;&#x770B;&#x5BF9;&#x5E94;&#x7684;&#x4EE3;&#x7801;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5220;&#x53BB;&#x4E86;&#x6CE8;&#x91CA;&#x5E76;&#x4E14;&#x5BF9;&#x4EE3;&#x7801;&#x987A;&#x5E8F;&#x6709;&#x8C03;&#x6574;
// ctx&#x662F;&#x76D1;&#x542C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x4F5C;&#x7528;&#x57DF;(this)
function Emitter (ctx) {
  this._ctx = ctx || this
}

var p = Emitter.prototype

p.on = function (event, fn) {
  this._cbs = this._cbs || {}
  ;(this._cbs[event] || (this._cbs[event] = []))
    .push(fn)
  return this
}
// &#x4E09;&#x79CD;&#x6A21;&#x5F0F; 
// &#x4E0D;&#x4F20;&#x53C2;&#x60C5;&#x51B5;&#x6E05;&#x7A7A;&#x6240;&#x6709;&#x76D1;&#x542C;&#x51FD;&#x6570; 
// &#x4EC5;&#x4F20;&#x4E8B;&#x4EF6;&#x540D;&#x5219;&#x6E05;&#x9664;&#x8BE5;&#x4E8B;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x76D1;&#x542C;&#x51FD;&#x6570;
// &#x4F20;&#x9012;&#x4E8B;&#x4EF6;&#x540D;&#x548C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x5219;&#x5BF9;&#x5E94;&#x4EC5;&#x5220;&#x9664;&#x5BF9;&#x5E94;&#x7684;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;
p.off = function (event, fn) {
  this._cbs = this._cbs || {}

  // all
  if (!arguments.length) {
    this._cbs = {}
    return this
  }

  // specific event
  var callbacks = this._cbs[event]
  if (!callbacks) return this

  // remove all handlers
  if (arguments.length === 1) {
    delete this._cbs[event]
    return this
  }

  // remove specific handler
  var cb
  for (var i = 0; i &lt; callbacks.length; i++) {
    cb = callbacks[i]
    // &#x8FD9;&#x8FB9;&#x7684;&#x4EE3;&#x7801;&#x4E4B;&#x6240;&#x4EE5;&#x4F1A;&#x6709;cb.fn === fn&#x8981;&#x7ED3;&#x5408;once&#x51FD;&#x6570;&#x53BB;&#x770B;
    // &#x7ED9;once&#x4F20;&#x9012;&#x7684;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x5176;&#x5B9E;&#x5DF2;&#x7ECF;&#x88AB;wrapped&#x8FC7;
    // &#x4F46;&#x662F;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x539F;&#x6765;&#x7684;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x53BB;off&#x6389;
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1)
      break
    }
  }
  return this
}
// &#x89E6;&#x53D1;&#x5BF9;&#x5E94;&#x4E8B;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x76D1;&#x542C;&#x51FD;&#x6570;&#xFF0C;&#x6CE8;&#x610F;&#x6700;&#x591A;&#x53EA;&#x80FD;&#x7528;&#x7ED9;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x4F20;&#x9012;&#x4E09;&#x4E2A;&#x53C2;&#x6570;(&#x91C7;&#x7528;call)
p.emit = function (event, a, b, c) {
  this._cbs = this._cbs || {}
  var callbacks = this._cbs[event]

  if (callbacks) {
    callbacks = callbacks.slice(0)
    for (var i = 0, len = callbacks.length; i &lt; len; i++) {
      callbacks[i].call(this._ctx, a, b, c)
    }
  }

  return this
}
// &#x89E6;&#x53D1;&#x5BF9;&#x5E94;&#x4E8B;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x76D1;&#x542C;&#x51FD;&#x6570;&#xFF0C;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x4E0D;&#x53D7;&#x9650;&#x5236;(&#x91C7;&#x7528;apply)
p.applyEmit = function (event) {
  this._cbs = this._cbs || {}
  var callbacks = this._cbs[event], args

  if (callbacks) {
    callbacks = callbacks.slice(0)
    args = callbacks.slice.call(arguments, 1)
    for (var i = 0, len = callbacks.length; i &lt; len; i++) {
      callbacks[i].apply(this._ctx, args)
    }
  }

  return this
}
// &#x901A;&#x8FC7;&#x8C03;&#x7528;on&#x4E0E;off&#x4E8B;&#x4EF6;&#x4E8B;&#x4EF6;&#xFF0C;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x89E6;&#x53D1;&#x4E4B;&#x540E;&#x5C31;`off`&#x5BF9;&#x5E94;&#x7684;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;
p.once = function (event, fn) {
  var self = this
  this._cbs = this._cbs || {}

  function on () {
    self.off(event, on)
    fn.apply(this, arguments)
  }

  on.fn = fn
  this.on(event, on)
  return this
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5220;&#x53BB;&#x4E86;&#x6CE8;&#x91CA;&#x5E76;&#x4E14;&#x5BF9;&#x4EE3;&#x7801;&#x987A;&#x5E8F;&#x6709;&#x8C03;&#x6574;</span>
<span class="hljs-comment">// ctx&#x662F;&#x76D1;&#x542C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x4F5C;&#x7528;&#x57DF;(this)</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Emitter</span> (<span class="hljs-params">ctx</span>) </span>{
  <span class="hljs-keyword">this</span>._ctx = ctx || <span class="hljs-keyword">this</span>
}

<span class="hljs-keyword">var</span> p = Emitter.prototype

p.on = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event, fn</span>) </span>{
  <span class="hljs-keyword">this</span>._cbs = <span class="hljs-keyword">this</span>._cbs || {}
  ;(<span class="hljs-keyword">this</span>._cbs[event] || (<span class="hljs-keyword">this</span>._cbs[event] = []))
    .push(fn)
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}
<span class="hljs-comment">// &#x4E09;&#x79CD;&#x6A21;&#x5F0F; </span>
<span class="hljs-comment">// &#x4E0D;&#x4F20;&#x53C2;&#x60C5;&#x51B5;&#x6E05;&#x7A7A;&#x6240;&#x6709;&#x76D1;&#x542C;&#x51FD;&#x6570; </span>
<span class="hljs-comment">// &#x4EC5;&#x4F20;&#x4E8B;&#x4EF6;&#x540D;&#x5219;&#x6E05;&#x9664;&#x8BE5;&#x4E8B;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x76D1;&#x542C;&#x51FD;&#x6570;</span>
<span class="hljs-comment">// &#x4F20;&#x9012;&#x4E8B;&#x4EF6;&#x540D;&#x548C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x5219;&#x5BF9;&#x5E94;&#x4EC5;&#x5220;&#x9664;&#x5BF9;&#x5E94;&#x7684;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;</span>
p.off = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event, fn</span>) </span>{
  <span class="hljs-keyword">this</span>._cbs = <span class="hljs-keyword">this</span>._cbs || {}

  <span class="hljs-comment">// all</span>
  <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">arguments</span>.length) {
    <span class="hljs-keyword">this</span>._cbs = {}
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }

  <span class="hljs-comment">// specific event</span>
  <span class="hljs-keyword">var</span> callbacks = <span class="hljs-keyword">this</span>._cbs[event]
  <span class="hljs-keyword">if</span> (!callbacks) <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>

  <span class="hljs-comment">// remove all handlers</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>.length === <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>._cbs[event]
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }

  <span class="hljs-comment">// remove specific handler</span>
  <span class="hljs-keyword">var</span> cb
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; callbacks.length; i++) {
    cb = callbacks[i]
    <span class="hljs-comment">// &#x8FD9;&#x8FB9;&#x7684;&#x4EE3;&#x7801;&#x4E4B;&#x6240;&#x4EE5;&#x4F1A;&#x6709;cb.fn === fn&#x8981;&#x7ED3;&#x5408;once&#x51FD;&#x6570;&#x53BB;&#x770B;</span>
    <span class="hljs-comment">// &#x7ED9;once&#x4F20;&#x9012;&#x7684;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x5176;&#x5B9E;&#x5DF2;&#x7ECF;&#x88AB;wrapped&#x8FC7;</span>
    <span class="hljs-comment">// &#x4F46;&#x662F;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x539F;&#x6765;&#x7684;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x53BB;off&#x6389;</span>
    <span class="hljs-keyword">if</span> (cb === fn || cb.fn === fn) {
      callbacks.splice(i, <span class="hljs-number">1</span>)
      <span class="hljs-keyword">break</span>
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}
<span class="hljs-comment">// &#x89E6;&#x53D1;&#x5BF9;&#x5E94;&#x4E8B;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x76D1;&#x542C;&#x51FD;&#x6570;&#xFF0C;&#x6CE8;&#x610F;&#x6700;&#x591A;&#x53EA;&#x80FD;&#x7528;&#x7ED9;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x4F20;&#x9012;&#x4E09;&#x4E2A;&#x53C2;&#x6570;(&#x91C7;&#x7528;call)</span>
p.emit = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event, a, b, c</span>) </span>{
  <span class="hljs-keyword">this</span>._cbs = <span class="hljs-keyword">this</span>._cbs || {}
  <span class="hljs-keyword">var</span> callbacks = <span class="hljs-keyword">this</span>._cbs[event]

  <span class="hljs-keyword">if</span> (callbacks) {
    callbacks = callbacks.slice(<span class="hljs-number">0</span>)
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = callbacks.length; i &lt; len; i++) {
      callbacks[i].call(<span class="hljs-keyword">this</span>._ctx, a, b, c)
    }
  }

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}
<span class="hljs-comment">// &#x89E6;&#x53D1;&#x5BF9;&#x5E94;&#x4E8B;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x76D1;&#x542C;&#x51FD;&#x6570;&#xFF0C;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x4E0D;&#x53D7;&#x9650;&#x5236;(&#x91C7;&#x7528;apply)</span>
p.applyEmit = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">this</span>._cbs = <span class="hljs-keyword">this</span>._cbs || {}
  <span class="hljs-keyword">var</span> callbacks = <span class="hljs-keyword">this</span>._cbs[event], args

  <span class="hljs-keyword">if</span> (callbacks) {
    callbacks = callbacks.slice(<span class="hljs-number">0</span>)
    args = callbacks.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>)
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, len = callbacks.length; i &lt; len; i++) {
      callbacks[i].apply(<span class="hljs-keyword">this</span>._ctx, args)
    }
  }

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}
<span class="hljs-comment">// &#x901A;&#x8FC7;&#x8C03;&#x7528;on&#x4E0E;off&#x4E8B;&#x4EF6;&#x4E8B;&#x4EF6;&#xFF0C;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x89E6;&#x53D1;&#x4E4B;&#x540E;&#x5C31;`off`&#x5BF9;&#x5E94;&#x7684;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;</span>
p.once = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event, fn</span>) </span>{
  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">this</span>._cbs = <span class="hljs-keyword">this</span>._cbs || {}

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">on</span> (<span class="hljs-params"></span>) </span>{
    self.off(event, on)
    fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>)
  }

  on.fn = fn
  <span class="hljs-keyword">this</span>.on(event, on)
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}
</code></pre><p>&#x3000;&#x3000;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x91C7;&#x7528;&#x4E86;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;<code>Emitter</code>&#x7C7B;&#x3002;&#x914D;&#x5408;Karma&#x8DD1;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x6A21;&#x5757; &#xFF0C;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x5168;&#x90E8;&#x901A;&#x8FC7;&#xFF0C;&#x5230;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x9605;&#x8BFB;&#x5B8C;<code>Emitter</code>&#x4E86;&#xFF0C;&#x8FD9;&#x7B97;&#x662F;&#x4E00;&#x4E2A;&#x5C0F;&#x5C0F;&#x7684;&#x70ED;&#x8EAB;&#x5427;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x8BA9;&#x6211;&#x4EEC;&#x6B63;&#x5F0F;&#x770B;&#x4E00;&#x4E0B;<code>Observer</code>&#x6A21;&#x5757;&#x3002;<br>&#x3000;&#x3000;</p><h2 id="articleHeader2">Observer</h2><h3 id="articleHeader3">&#x5BF9;&#x5916;&#x529F;&#x80FD;</h3><p>&#x3000;&#x3000;&#x6309;&#x7167;&#x4E0A;&#x9762;&#x7684;&#x601D;&#x8DEF;&#x6211;&#x4EEC;&#x5148;&#x770B;&#x770B;<code>Observer</code>&#x5BF9;&#x5E94;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;<code>observer_spec.js</code>&#xFF0C;&#x7531;&#x4E8E;<code>Observer</code>&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x975E;&#x5E38;&#x957F;&#xFF0C;&#x6211;&#x4F1A;&#x5728;&#x4EE3;&#x7801;&#x6CE8;&#x91CA;&#x4E2D;&#x505A;&#x89E3;&#x91CA;&#xFF0C;&#x5E76;&#x5C3D;&#x91CF;&#x7CBE;&#x7B80;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#xFF0C;&#x80FD;&#x8BA9;&#x6211;&#x4EEC;&#x4E86;&#x89E3;&#x6A21;&#x5757;&#x5BF9;&#x5E94;&#x529F;&#x80FD;&#x5373;&#x53EF;&#xFF0C;&#x5E0C;&#x671B;&#x4F60;&#x80FD;&#x6709;&#x8010;&#x5FC3;&#x9605;&#x8BFB;&#x4E0B;&#x6765;&#x3002;<br>&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x662F;&#x7CBE;&#x7B80;&#x7248;&#xFF0C;&#x5426;&#x5219;&#x592A;&#x5197;&#x957F;
var Observer = require(&apos;../../../src/observe/observer&apos;)
var _ = require(&apos;../../../src/util&apos;) //Vue&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x5DE5;&#x5177;&#x65B9;&#x6CD5;
var u = undefined
Observer.pathDelimiter = &apos;.&apos; //&#x914D;&#x7F6E;Observer&#x8DEF;&#x5F84;&#x5206;&#x9694;&#x7B26;

describe(&apos;Observer&apos;, function () {

  var spy
  beforeEach(function () {
    spy = jasmine.createSpy(&apos;observer&apos;)
  })
//&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6211;&#x4EEC;&#x901A;&#x8FC7;Observer.create&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x5C06;&#x6570;&#x636E;&#x53D8;&#x4E3A;&#x53EF;&#x54CD;&#x5E94;&#x5316;&#xFF0C;
//&#x7136;&#x540E;&#x6211;&#x4EEC;&#x76D1;&#x542C;get&#x4E8B;&#x4EF6;&#x53EF;&#x4EE5;&#x5728;&#x5C5E;&#x6027;&#x88AB;&#x8BFB;&#x53D6;&#x65F6;&#x89E6;&#x53D1;&#x5BF9;&#x5E94;&#x4E8B;&#x4EF6;&#xFF0C;&#x6CE8;&#x610F;&#x5BF9;&#x8C61;&#x5D4C;&#x5957;&#x7684;&#x60C5;&#x51B5;(&#x4F8B;&#x5982;b.c)
  it(&apos;get&apos;, function () {
    Observer.emitGet = true
    var obj = {
      a: 1,
      b: {
        c: 2
      }
    }
    var ob = Observer.create(obj)
    ob.on(&apos;get&apos;, spy)

    var t = obj.b.c
    expect(spy).toHaveBeenCalledWith(&apos;b&apos;, u, u)
    expect(spy).toHaveBeenCalledWith(&apos;b.c&apos;, u, u)
    
    Observer.emitGet = false
  })
//&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76D1;&#x542C;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x7684;set&#x4E8B;&#x4EF6;&#xFF0C;&#x5F53;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x4FEE;&#x6539;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x5BF9;&#x5E94;&#x7684;&#x65F6;&#x95F4;
  it(&apos;set&apos;, function () {
    var obj = {
      a: 1,
      b: {
        c: 2
      }
    }
    var ob = Observer.create(obj)
    ob.on(&apos;set&apos;, spy)

    obj.b.c = 4
    expect(spy).toHaveBeenCalledWith(&apos;b.c&apos;, 4, u)
  })
//&#x5E26;&#x6709;$&#x4E0E;_&#x5F00;&#x5934;&#x7684;&#x5C5E;&#x6027;&#x90FD;&#x4E0D;&#x4F1A;&#x88AB;&#x5904;&#x7406;
  it(&apos;ignore prefix&apos;, function () {
    var obj = {
      _test: 123,
      $test: 234
    }
    var ob = Observer.create(obj)
    ob.on(&apos;set&apos;, spy)
    obj._test = 234
    obj.$test = 345
    expect(spy.calls.count()).toBe(0)
  })
//&#x8BBF;&#x95EE;&#x5668;&#x5C5E;&#x6027;&#x4E5F;&#x4E0D;&#x4F1A;&#x88AB;&#x5904;&#x7406;
  it(&apos;ignore accessors&apos;, function () {
    var obj = {
      a: 123,
      get b () {
        return this.a
      }
    }
    var ob = Observer.create(obj)
    obj.a = 234
    expect(obj.b).toBe(234)
  })
// &#x5BF9;&#x6570;&#x5C5E;&#x6027;&#x7684;get&#x76D1;&#x542C;&#xFF0C;&#x6CE8;&#x610F;&#x5D4C;&#x5957;&#x7684;&#x60C5;&#x51B5;
  it(&apos;array get&apos;, function () {

    Observer.emitGet = true

    var obj = {
      arr: [{a:1}, {a:2}]
    }
    var ob = Observer.create(obj)
    ob.on(&apos;get&apos;, spy)

    var t = obj.arr[0].a
    expect(spy).toHaveBeenCalledWith(&apos;arr&apos;, u, u)
    expect(spy).toHaveBeenCalledWith(&apos;arr.0.a&apos;, u, u)
    expect(spy.calls.count()).toBe(2)

    Observer.emitGet = false
  })
// &#x5BF9;&#x6570;&#x5C5E;&#x6027;&#x7684;get&#x76D1;&#x542C;&#xFF0C;&#x6CE8;&#x610F;&#x5D4C;&#x5957;&#x7684;&#x60C5;&#x51B5;
  it(&apos;array set&apos;, function () {
    var obj = {
      arr: [{a:1}, {a:2}]
    }
    var ob = Observer.create(obj)
    ob.on(&apos;set&apos;, spy)

    obj.arr[0].a = 2
    expect(spy).toHaveBeenCalledWith(&apos;arr.0.a&apos;, 2, u)
  })
// &#x6211;&#x4EEC;&#x770B;&#x5230;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x76D1;&#x542C;mutate&#x4E8B;&#x4EF6;&#xFF0C;&#x5728;push&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x5BF9;&#x5E94;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;
// &#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&quot;&quot;&#xFF0C;&#x4EE3;&#x8868;&#x7684;&#x662F;&#x8DEF;&#x5F84;&#x540D;&#xFF0C;&#x5177;&#x4F53;&#x6E90;&#x7801;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x5BF9;&#x4E8E;&#x6570;&#x7EC4;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x90FD;&#x662F;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;
// &#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x6570;&#x7EC4;&#x672C;&#x8EAB;
// &#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#xFF0C;&#x5176;&#x4E2D;:
// method&#x5C5E;&#x6027;: &#x4EE3;&#x8868;&#x89E6;&#x53D1;&#x7684;&#x65B9;&#x6CD5;&#x540D;&#x79F0;
// args&#x5C5E;&#x6027;: &#x4EE3;&#x8868;&#x89E6;&#x53D1;&#x65B9;&#x6CD5;&#x4F20;&#x9012;&#x53C2;&#x6570;
// result&#x5C5E;&#x6027;: &#x4EE3;&#x8868;&#x89E6;&#x53D1;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x4E4B;&#x540E;&#x6570;&#x7EC4;&#x7684;&#x7ED3;&#x679C;
// index&#x5C5E;&#x6027;: &#x4EE3;&#x8868;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x5BF9;&#x6570;&#x7EC4;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x6700;&#x5F00;&#x59CB;&#x5143;&#x7D20;
// inserted&#x5C5E;&#x6027;: &#x4EE3;&#x8868;&#x6570;&#x7EC4;&#x65B0;&#x589E;&#x7684;&#x5143;&#x7D20;
// remove&#x5C5E;&#x6027;: &#x4EE3;&#x8868;&#x6570;&#x7EC4;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;
// &#x5176;&#x4ED6;&#x7684;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;: pop&#x3001;shift&#x3001;unshift&#x3001;splice&#x3001;sort&#x3001;reverse&#x5185;&#x5BB9;&#x90FD;&#x662F;&#x975E;&#x5E38;&#x76F8;&#x4F3C;&#x7684;
// &#x5177;&#x4F53;&#x6211;&#x4EEC;&#x5C31;&#x4E0D;&#x4E00;&#x4E00;&#x5217;&#x4E3E;&#x7684;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x7591;&#x95EE;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x770B;&#x5230;&#x5168;&#x90E8;&#x7684;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;
  it(&apos;array push&apos;, function () {
    var arr = [{a:1}, {a:2}]
    var ob = Observer.create(arr)
    ob.on(&apos;mutate&apos;, spy)
    arr.push({a:3})
    expect(spy.calls.mostRecent().args[0]).toBe(&apos;&apos;)
    expect(spy.calls.mostRecent().args[1]).toBe(arr)
    var mutation = spy.calls.mostRecent().args[2]
    expect(mutation).toBeDefined()
    expect(mutation.method).toBe(&apos;push&apos;)
    expect(mutation.index).toBe(2)
    expect(mutation.removed.length).toBe(0)
    expect(mutation.inserted.length).toBe(1)
    expect(mutation.inserted[0]).toBe(arr[2])
  })
  
// &#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x4E2D;&#x5B58;&#x5728;$add&#x65B9;&#x6CD5;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E8E;Vue.set&#xFF0C;&#x53EF;&#x4EE5;&#x76D1;&#x542C;add&#x4E8B;&#x4EF6;
// &#x53EF;&#x4EE5;&#x5411;&#x54CD;&#x5E94;&#x5F0F;&#x5BF9;&#x8C61;&#x4E2D;&#x6DFB;&#x52A0;&#x65B0;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x4E4B;&#x524D;&#x5B58;&#x5728;&#x8BE5;&#x5C5E;&#x6027;&#x5219;&#x64CD;&#x4F5C;&#x4F1A;&#x88AB;&#x5FFD;&#x7565;
// &#x5E76;&#x4E14;&#x65B0;&#x8D4B;&#x503C;&#x7684;&#x5BF9;&#x8C61;&#x4E5F;&#x5FC5;&#x987B;&#x88AB;&#x54CD;&#x5E94;&#x5316;
// &#x6211;&#x4EEC;&#x7701;&#x7565;&#x4E86;&#x5BF9;&#x8C61;&#x6570;&#x636E;$delete&#x65B9;&#x6CD5;&#x7684;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x529F;&#x80FD;&#x7C7B;&#x4F3C;&#x4E8E;Vue.delete&#xFF0C;&#x4E0E;$add&#x65B9;&#x6CD5;&#x76F8;&#x53CD;,&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x5220;&#x9664;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;
// &#x6211;&#x4EEC;&#x7701;&#x7565;&#x4E86;&#x6570;&#x7EC4;&#x7684;$set&#x65B9;&#x6CD5;&#x7684;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x529F;&#x80FD;&#x4E5F;&#x7C7B;&#x4F3C;&#x4E0E;Vue.set&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x6570;&#x7EC4;&#x5BF9;&#x5E94;&#x6570;&#x5B57;&#x4E0B;&#x6807;&#x7684;&#x503C;
// &#x6211;&#x4EEC;&#x7701;&#x7565;&#x4E86;&#x6570;&#x7EC4;&#x7684;$remove&#x65B9;&#x6CD5;&#x7684;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x529F;&#x80FD;&#x7528;&#x4E8E;&#x79FB;&#x9664;&#x6570;&#x7EC4;&#x7ED9;&#x5B9A;&#x4E0B;&#x6807;&#x7684;&#x503C;&#x6216;&#x8005;&#x7ED9;&#x5B9A;&#x7684;&#x503C;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;
// var arr = [{a:1}, {a:2}]
// var ob = Observer.create(arr)
// arr.$remove(0) =&gt; &#x79FB;&#x9664;&#x5BF9;&#x5E94;&#x4E0B;&#x6807;&#x7684;&#x503C; &#x6216;&#x8005;
// arr.$remove(arr[0]) =&gt; &#x79FB;&#x9664;&#x7ED9;&#x5B9A;&#x7684;&#x503C;

  it(&apos;object.$add&apos;, function () {
    var obj = {a:{b:1"}}"
    var ob = Observer.create(obj)
    ob.on(&apos;add&apos;, spy)

    // ignore existing keys
    obj.$add(&apos;a&apos;, 123)
    expect(spy.calls.count()).toBe(0)

    // add event
    var add = {d:2}
    obj.a.$add(&apos;c&apos;, add)
    expect(spy).toHaveBeenCalledWith(&apos;a.c&apos;, add, u)

    // check if add object is properly observed
    ob.on(&apos;set&apos;, spy)
    obj.a.c.d = 3
    expect(spy).toHaveBeenCalledWith(&apos;a.c.d&apos;, 3, u)
  })

// &#x4E0B;&#x9762;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x7528;&#x6765;&#x8868;&#x793A;&#x5982;&#x679C;&#x4E24;&#x4E2A;&#x4E0D;&#x540C;&#x5BF9;&#x8C61;parentA&#x3001;parentB&#x7684;&#x5C5E;&#x6027;&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;obj&#xFF0C;&#x90A3;&#x4E48;&#x8BE5;&#x5BF9;&#x8C61;obj&#x6539;&#x53D8;&#x65F6;&#x4F1A;&#x5206;&#x522B;parentA&#x4E0E;parentB&#x7684;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;

  it(&apos;shared observe&apos;, function () {
    var obj = { a: 1 }
    var parentA = { child1: obj }
    var parentB = { child2: obj }
    var obA = Observer.create(parentA)
    var obB = Observer.create(parentB)
    obA.on(&apos;set&apos;, spy)
    obB.on(&apos;set&apos;, spy)
    obj.a = 2
    expect(spy.calls.count()).toBe(2)
    expect(spy).toHaveBeenCalledWith(&apos;child1.a&apos;, 2, u)
    expect(spy).toHaveBeenCalledWith(&apos;child2.a&apos;, 2, u)
    // test unobserve
    parentA.child1 = null
    obj.a = 3
    expect(spy.calls.count()).toBe(4)
    expect(spy).toHaveBeenCalledWith(&apos;child1&apos;, null, u)
    expect(spy).toHaveBeenCalledWith(&apos;child2.a&apos;, 3, u)
  })

})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x662F;&#x7CBE;&#x7B80;&#x7248;&#xFF0C;&#x5426;&#x5219;&#x592A;&#x5197;&#x957F;</span>
<span class="hljs-keyword">var</span> Observer = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../../../src/observe/observer&apos;</span>)
<span class="hljs-keyword">var</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../../../src/util&apos;</span>) <span class="hljs-comment">//Vue&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x5DE5;&#x5177;&#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">var</span> u = <span class="hljs-literal">undefined</span>
Observer.pathDelimiter = <span class="hljs-string">&apos;.&apos;</span> <span class="hljs-comment">//&#x914D;&#x7F6E;Observer&#x8DEF;&#x5F84;&#x5206;&#x9694;&#x7B26;</span>

describe(<span class="hljs-string">&apos;Observer&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

  <span class="hljs-keyword">var</span> spy
  beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    spy = jasmine.createSpy(<span class="hljs-string">&apos;observer&apos;</span>)
  })
<span class="hljs-comment">//&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6211;&#x4EEC;&#x901A;&#x8FC7;Observer.create&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x5C06;&#x6570;&#x636E;&#x53D8;&#x4E3A;&#x53EF;&#x54CD;&#x5E94;&#x5316;&#xFF0C;</span>
<span class="hljs-comment">//&#x7136;&#x540E;&#x6211;&#x4EEC;&#x76D1;&#x542C;get&#x4E8B;&#x4EF6;&#x53EF;&#x4EE5;&#x5728;&#x5C5E;&#x6027;&#x88AB;&#x8BFB;&#x53D6;&#x65F6;&#x89E6;&#x53D1;&#x5BF9;&#x5E94;&#x4E8B;&#x4EF6;&#xFF0C;&#x6CE8;&#x610F;&#x5BF9;&#x8C61;&#x5D4C;&#x5957;&#x7684;&#x60C5;&#x51B5;(&#x4F8B;&#x5982;b.c)</span>
  it(<span class="hljs-string">&apos;get&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    Observer.emitGet = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">var</span> obj = {
      <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">b</span>: {
        <span class="hljs-attr">c</span>: <span class="hljs-number">2</span>
      }
    }
    <span class="hljs-keyword">var</span> ob = Observer.create(obj)
    ob.on(<span class="hljs-string">&apos;get&apos;</span>, spy)

    <span class="hljs-keyword">var</span> t = obj.b.c
    expect(spy).toHaveBeenCalledWith(<span class="hljs-string">&apos;b&apos;</span>, u, u)
    expect(spy).toHaveBeenCalledWith(<span class="hljs-string">&apos;b.c&apos;</span>, u, u)
    
    Observer.emitGet = <span class="hljs-literal">false</span>
  })
<span class="hljs-comment">//&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76D1;&#x542C;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x7684;set&#x4E8B;&#x4EF6;&#xFF0C;&#x5F53;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x4FEE;&#x6539;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x5BF9;&#x5E94;&#x7684;&#x65F6;&#x95F4;</span>
  it(<span class="hljs-string">&apos;set&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> obj = {
      <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">b</span>: {
        <span class="hljs-attr">c</span>: <span class="hljs-number">2</span>
      }
    }
    <span class="hljs-keyword">var</span> ob = Observer.create(obj)
    ob.on(<span class="hljs-string">&apos;set&apos;</span>, spy)

    obj.b.c = <span class="hljs-number">4</span>
    expect(spy).toHaveBeenCalledWith(<span class="hljs-string">&apos;b.c&apos;</span>, <span class="hljs-number">4</span>, u)
  })
<span class="hljs-comment">//&#x5E26;&#x6709;$&#x4E0E;_&#x5F00;&#x5934;&#x7684;&#x5C5E;&#x6027;&#x90FD;&#x4E0D;&#x4F1A;&#x88AB;&#x5904;&#x7406;</span>
  it(<span class="hljs-string">&apos;ignore prefix&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> obj = {
      <span class="hljs-attr">_test</span>: <span class="hljs-number">123</span>,
      <span class="hljs-attr">$test</span>: <span class="hljs-number">234</span>
    }
    <span class="hljs-keyword">var</span> ob = Observer.create(obj)
    ob.on(<span class="hljs-string">&apos;set&apos;</span>, spy)
    obj._test = <span class="hljs-number">234</span>
    obj.$test = <span class="hljs-number">345</span>
    expect(spy.calls.count()).toBe(<span class="hljs-number">0</span>)
  })
<span class="hljs-comment">//&#x8BBF;&#x95EE;&#x5668;&#x5C5E;&#x6027;&#x4E5F;&#x4E0D;&#x4F1A;&#x88AB;&#x5904;&#x7406;</span>
  it(<span class="hljs-string">&apos;ignore accessors&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> obj = {
      <span class="hljs-attr">a</span>: <span class="hljs-number">123</span>,
      get b () {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a
      }
    }
    <span class="hljs-keyword">var</span> ob = Observer.create(obj)
    obj.a = <span class="hljs-number">234</span>
    expect(obj.b).toBe(<span class="hljs-number">234</span>)
  })
<span class="hljs-comment">// &#x5BF9;&#x6570;&#x5C5E;&#x6027;&#x7684;get&#x76D1;&#x542C;&#xFF0C;&#x6CE8;&#x610F;&#x5D4C;&#x5957;&#x7684;&#x60C5;&#x51B5;</span>
  it(<span class="hljs-string">&apos;array get&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

    Observer.emitGet = <span class="hljs-literal">true</span>

    <span class="hljs-keyword">var</span> obj = {
      <span class="hljs-attr">arr</span>: [{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>}, {<span class="hljs-attr">a</span>:<span class="hljs-number">2</span>}]
    }
    <span class="hljs-keyword">var</span> ob = Observer.create(obj)
    ob.on(<span class="hljs-string">&apos;get&apos;</span>, spy)

    <span class="hljs-keyword">var</span> t = obj.arr[<span class="hljs-number">0</span>].a
    expect(spy).toHaveBeenCalledWith(<span class="hljs-string">&apos;arr&apos;</span>, u, u)
    expect(spy).toHaveBeenCalledWith(<span class="hljs-string">&apos;arr.0.a&apos;</span>, u, u)
    expect(spy.calls.count()).toBe(<span class="hljs-number">2</span>)

    Observer.emitGet = <span class="hljs-literal">false</span>
  })
<span class="hljs-comment">// &#x5BF9;&#x6570;&#x5C5E;&#x6027;&#x7684;get&#x76D1;&#x542C;&#xFF0C;&#x6CE8;&#x610F;&#x5D4C;&#x5957;&#x7684;&#x60C5;&#x51B5;</span>
  it(<span class="hljs-string">&apos;array set&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> obj = {
      <span class="hljs-attr">arr</span>: [{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>}, {<span class="hljs-attr">a</span>:<span class="hljs-number">2</span>}]
    }
    <span class="hljs-keyword">var</span> ob = Observer.create(obj)
    ob.on(<span class="hljs-string">&apos;set&apos;</span>, spy)

    obj.arr[<span class="hljs-number">0</span>].a = <span class="hljs-number">2</span>
    expect(spy).toHaveBeenCalledWith(<span class="hljs-string">&apos;arr.0.a&apos;</span>, <span class="hljs-number">2</span>, u)
  })
<span class="hljs-comment">// &#x6211;&#x4EEC;&#x770B;&#x5230;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x76D1;&#x542C;mutate&#x4E8B;&#x4EF6;&#xFF0C;&#x5728;push&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x5BF9;&#x5E94;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;</span>
<span class="hljs-comment">// &#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&quot;&quot;&#xFF0C;&#x4EE3;&#x8868;&#x7684;&#x662F;&#x8DEF;&#x5F84;&#x540D;&#xFF0C;&#x5177;&#x4F53;&#x6E90;&#x7801;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x5BF9;&#x4E8E;&#x6570;&#x7EC4;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x90FD;&#x662F;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;</span>
<span class="hljs-comment">// &#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x6570;&#x7EC4;&#x672C;&#x8EAB;</span>
<span class="hljs-comment">// &#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#xFF0C;&#x5176;&#x4E2D;:</span>
<span class="hljs-comment">// method&#x5C5E;&#x6027;: &#x4EE3;&#x8868;&#x89E6;&#x53D1;&#x7684;&#x65B9;&#x6CD5;&#x540D;&#x79F0;</span>
<span class="hljs-comment">// args&#x5C5E;&#x6027;: &#x4EE3;&#x8868;&#x89E6;&#x53D1;&#x65B9;&#x6CD5;&#x4F20;&#x9012;&#x53C2;&#x6570;</span>
<span class="hljs-comment">// result&#x5C5E;&#x6027;: &#x4EE3;&#x8868;&#x89E6;&#x53D1;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x4E4B;&#x540E;&#x6570;&#x7EC4;&#x7684;&#x7ED3;&#x679C;</span>
<span class="hljs-comment">// index&#x5C5E;&#x6027;: &#x4EE3;&#x8868;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x5BF9;&#x6570;&#x7EC4;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x7684;&#x6700;&#x5F00;&#x59CB;&#x5143;&#x7D20;</span>
<span class="hljs-comment">// inserted&#x5C5E;&#x6027;: &#x4EE3;&#x8868;&#x6570;&#x7EC4;&#x65B0;&#x589E;&#x7684;&#x5143;&#x7D20;</span>
<span class="hljs-comment">// remove&#x5C5E;&#x6027;: &#x4EE3;&#x8868;&#x6570;&#x7EC4;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;</span>
<span class="hljs-comment">// &#x5176;&#x4ED6;&#x7684;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;: pop&#x3001;shift&#x3001;unshift&#x3001;splice&#x3001;sort&#x3001;reverse&#x5185;&#x5BB9;&#x90FD;&#x662F;&#x975E;&#x5E38;&#x76F8;&#x4F3C;&#x7684;</span>
<span class="hljs-comment">// &#x5177;&#x4F53;&#x6211;&#x4EEC;&#x5C31;&#x4E0D;&#x4E00;&#x4E00;&#x5217;&#x4E3E;&#x7684;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x7591;&#x95EE;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x770B;&#x5230;&#x5168;&#x90E8;&#x7684;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;</span>
  it(<span class="hljs-string">&apos;array push&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> arr = [{<span class="hljs-attr">a</span>:<span class="hljs-number">1</span>}, {<span class="hljs-attr">a</span>:<span class="hljs-number">2</span>}]
    <span class="hljs-keyword">var</span> ob = Observer.create(arr)
    ob.on(<span class="hljs-string">&apos;mutate&apos;</span>, spy)
    arr.push({<span class="hljs-attr">a</span>:<span class="hljs-number">3</span>})
    expect(spy.calls.mostRecent().args[<span class="hljs-number">0</span>]).toBe(<span class="hljs-string">&apos;&apos;</span>)
    expect(spy.calls.mostRecent().args[<span class="hljs-number">1</span>]).toBe(arr)
    <span class="hljs-keyword">var</span> mutation = spy.calls.mostRecent().args[<span class="hljs-number">2</span>]
    expect(mutation).toBeDefined()
    expect(mutation.method).toBe(<span class="hljs-string">&apos;push&apos;</span>)
    expect(mutation.index).toBe(<span class="hljs-number">2</span>)
    expect(mutation.removed.length).toBe(<span class="hljs-number">0</span>)
    expect(mutation.inserted.length).toBe(<span class="hljs-number">1</span>)
    expect(mutation.inserted[<span class="hljs-number">0</span>]).toBe(arr[<span class="hljs-number">2</span>])
  })
  
<span class="hljs-comment">// &#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x4E2D;&#x5B58;&#x5728;$add&#x65B9;&#x6CD5;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E8E;Vue.set&#xFF0C;&#x53EF;&#x4EE5;&#x76D1;&#x542C;add&#x4E8B;&#x4EF6;</span>
<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x5411;&#x54CD;&#x5E94;&#x5F0F;&#x5BF9;&#x8C61;&#x4E2D;&#x6DFB;&#x52A0;&#x65B0;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x4E4B;&#x524D;&#x5B58;&#x5728;&#x8BE5;&#x5C5E;&#x6027;&#x5219;&#x64CD;&#x4F5C;&#x4F1A;&#x88AB;&#x5FFD;&#x7565;</span>
<span class="hljs-comment">// &#x5E76;&#x4E14;&#x65B0;&#x8D4B;&#x503C;&#x7684;&#x5BF9;&#x8C61;&#x4E5F;&#x5FC5;&#x987B;&#x88AB;&#x54CD;&#x5E94;&#x5316;</span>
<span class="hljs-comment">// &#x6211;&#x4EEC;&#x7701;&#x7565;&#x4E86;&#x5BF9;&#x8C61;&#x6570;&#x636E;$delete&#x65B9;&#x6CD5;&#x7684;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x529F;&#x80FD;&#x7C7B;&#x4F3C;&#x4E8E;Vue.delete&#xFF0C;&#x4E0E;$add&#x65B9;&#x6CD5;&#x76F8;&#x53CD;,&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x5220;&#x9664;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;</span>
<span class="hljs-comment">// &#x6211;&#x4EEC;&#x7701;&#x7565;&#x4E86;&#x6570;&#x7EC4;&#x7684;$set&#x65B9;&#x6CD5;&#x7684;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x529F;&#x80FD;&#x4E5F;&#x7C7B;&#x4F3C;&#x4E0E;Vue.set&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x6570;&#x7EC4;&#x5BF9;&#x5E94;&#x6570;&#x5B57;&#x4E0B;&#x6807;&#x7684;&#x503C;</span>
<span class="hljs-comment">// &#x6211;&#x4EEC;&#x7701;&#x7565;&#x4E86;&#x6570;&#x7EC4;&#x7684;$remove&#x65B9;&#x6CD5;&#x7684;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x529F;&#x80FD;&#x7528;&#x4E8E;&#x79FB;&#x9664;&#x6570;&#x7EC4;&#x7ED9;&#x5B9A;&#x4E0B;&#x6807;&#x7684;&#x503C;&#x6216;&#x8005;&#x7ED9;&#x5B9A;&#x7684;&#x503C;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</span>
<span class="hljs-comment">// var arr = [{a:1}, {a:2}]</span>
<span class="hljs-comment">// var ob = Observer.create(arr)</span>
<span class="hljs-comment">// arr.$remove(0) =&gt; &#x79FB;&#x9664;&#x5BF9;&#x5E94;&#x4E0B;&#x6807;&#x7684;&#x503C; &#x6216;&#x8005;</span>
<span class="hljs-comment">// arr.$remove(arr[0]) =&gt; &#x79FB;&#x9664;&#x7ED9;&#x5B9A;&#x7684;&#x503C;</span>

  it(<span class="hljs-string">&apos;object.$add&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">a</span>:{<span class="hljs-attr">b</span>:<span class="hljs-number">1</span>"}}"
    <span class="hljs-keyword">var</span> ob = Observer.create(obj)
    ob.on(<span class="hljs-string">&apos;add&apos;</span>, spy)

    <span class="hljs-comment">// ignore existing keys</span>
    obj.$add(<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-number">123</span>)
    expect(spy.calls.count()).toBe(<span class="hljs-number">0</span>)

    <span class="hljs-comment">// add event</span>
    <span class="hljs-keyword">var</span> add = {<span class="hljs-attr">d</span>:<span class="hljs-number">2</span>}
    obj.a.$add(<span class="hljs-string">&apos;c&apos;</span>, add)
    expect(spy).toHaveBeenCalledWith(<span class="hljs-string">&apos;a.c&apos;</span>, add, u)

    <span class="hljs-comment">// check if add object is properly observed</span>
    ob.on(<span class="hljs-string">&apos;set&apos;</span>, spy)
    obj.a.c.d = <span class="hljs-number">3</span>
    expect(spy).toHaveBeenCalledWith(<span class="hljs-string">&apos;a.c.d&apos;</span>, <span class="hljs-number">3</span>, u)
  })

<span class="hljs-comment">// &#x4E0B;&#x9762;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x7528;&#x6765;&#x8868;&#x793A;&#x5982;&#x679C;&#x4E24;&#x4E2A;&#x4E0D;&#x540C;&#x5BF9;&#x8C61;parentA&#x3001;parentB&#x7684;&#x5C5E;&#x6027;&#x6307;&#x5411;&#x540C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;obj&#xFF0C;&#x90A3;&#x4E48;&#x8BE5;&#x5BF9;&#x8C61;obj&#x6539;&#x53D8;&#x65F6;&#x4F1A;&#x5206;&#x522B;parentA&#x4E0E;parentB&#x7684;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;</span>

  it(<span class="hljs-string">&apos;shared observe&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> obj = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }
    <span class="hljs-keyword">var</span> parentA = { <span class="hljs-attr">child1</span>: obj }
    <span class="hljs-keyword">var</span> parentB = { <span class="hljs-attr">child2</span>: obj }
    <span class="hljs-keyword">var</span> obA = Observer.create(parentA)
    <span class="hljs-keyword">var</span> obB = Observer.create(parentB)
    obA.on(<span class="hljs-string">&apos;set&apos;</span>, spy)
    obB.on(<span class="hljs-string">&apos;set&apos;</span>, spy)
    obj.a = <span class="hljs-number">2</span>
    expect(spy.calls.count()).toBe(<span class="hljs-number">2</span>)
    expect(spy).toHaveBeenCalledWith(<span class="hljs-string">&apos;child1.a&apos;</span>, <span class="hljs-number">2</span>, u)
    expect(spy).toHaveBeenCalledWith(<span class="hljs-string">&apos;child2.a&apos;</span>, <span class="hljs-number">2</span>, u)
    <span class="hljs-comment">// test unobserve</span>
    parentA.child1 = <span class="hljs-literal">null</span>
    obj.a = <span class="hljs-number">3</span>
    expect(spy.calls.count()).toBe(<span class="hljs-number">4</span>)
    expect(spy).toHaveBeenCalledWith(<span class="hljs-string">&apos;child1&apos;</span>, <span class="hljs-literal">null</span>, u)
    expect(spy).toHaveBeenCalledWith(<span class="hljs-string">&apos;child2.a&apos;</span>, <span class="hljs-number">3</span>, u)
  })

})</code></pre><h3 id="articleHeader4">&#x6E90;&#x7801;&#x5B9E;&#x73B0;</h3><h4>&#x6570;&#x7EC4;</h4><p>&#x3000;&#x3000;&#x80FD;&#x575A;&#x6301;&#x770B;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x957F;&#x5F81;&#x8DEF;&#x5C31;&#x8D70;&#x8FC7;&#x4E86;&#x4E00;&#x534A;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x77E5;&#x9053;&#x4E86;<code>Oberver</code>&#x5BF9;&#x5916;&#x63D0;&#x4F9B;&#x7684;&#x529F;&#x80FD;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5C31;&#x6765;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;<code>Oberver</code>&#x5185;&#x90E8;&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x3002;<br>&#x3000;&#x3000;<br>&#x3000;&#x3000;<code>Oberver</code>&#x6A21;&#x5757;&#x5B9E;&#x9645;&#x4E0A;&#x91C7;&#x7528;&#x91C7;&#x7528;<strong>&#x7EC4;&#x5408;&#x7EE7;&#x627F;</strong>(<strong>&#x501F;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;</strong>+<strong>&#x539F;&#x578B;&#x7EE7;&#x627F;</strong>)&#x65B9;&#x5F0F;&#x7EE7;&#x627F;&#x4E86;<code>Emitter</code>,&#x5176;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x7EE7;&#x627F;<code>Emitter</code>&#x7684;<code>on</code>, <code>off</code>&#xFF0C;<code>emit</code>&#x7B49;&#x65B9;&#x6CD5;&#x3002;&#x6211;&#x4EEC;&#x5728;&#x4E0A;&#x9762;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x53D1;&#x73B0;&#xFF0C;&#x6211;&#x4EEC;&#x5E76;&#x6CA1;&#x6709;&#x7528;<code>new</code>&#x65B9;&#x6CD5;&#x76F4;&#x63A5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>Oberver</code>&#x7684;&#x5BF9;&#x8C61;&#x5B9E;&#x4F8B;&#xFF0C;&#x800C;&#x662F;&#x91C7;&#x7528;&#x4E00;&#x4E2A;&#x5DE5;&#x5382;&#x65B9;&#x6CD5;<code>Oberver.create</code>&#x65B9;&#x6CD5;&#x6765;&#x521B;&#x5EFA;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x63A5;&#x4E0B;&#x6765;&#x770B;&#x6E90;&#x7801;&#xFF0C;&#x7531;&#x4E8E;&#x4EE3;&#x7801;&#x6BD4;&#x8F83;&#x591A;&#x6211;&#x4F1A;&#x5C3D;&#x91CF;&#x53BB;&#x62C6;&#x5206;&#x6210;&#x4E00;&#x4E2A;&#x4E2A;&#x5C0F;&#x5757;&#x6765;&#x8BB2;&#xFF1A;<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4EE3;&#x7801;&#x51FA;&#x81EA;&#x4E8E;observe.js
// &#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x8BB2;&#x89E3;&#x6211;&#x5BF9;&#x4EE3;&#x7801;&#x987A;&#x5E8F;&#x505A;&#x4E86;&#x6539;&#x53D8;&#xFF0C;&#x8981;&#x4E86;&#x89E3;&#x8BE6;&#x7EC6;&#x7684;&#x60C5;&#x51B5;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x5177;&#x4F53;&#x7684;&#x6E90;&#x7801;

var _ = require(&apos;../util&apos;)
var Emitter = require(&apos;../emitter&apos;)
var arrayAugmentations = require(&apos;./array-augmentations&apos;)
var objectAugmentations = require(&apos;./object-augmentations&apos;)

var uid = 0
/**
 * Type enums
 */

var ARRAY  = 0
var OBJECT = 1

function Observer (value, type, options) {
  Emitter.call(this, options &amp;&amp; options.callbackContext)
  this.id = ++uid
  this.value = value
  this.type = type
  this.parents = null
  if (value) {
    _.define(value, &apos;$observer&apos;, this)
    if (type === ARRAY) {
      _.augment(value, arrayAugmentations)
      this.link(value)
    } else if (type === OBJECT) {
      if (options &amp;&amp; options.doNotAlterProto) {
        _.deepMixin(value, objectAugmentations)
      } else {
        _.augment(value, objectAugmentations)
      }
      this.walk(value)
    }
  }
}

var p = Observer.prototype = Object.create(Emitter.prototype)

Observer.pathDelimiter = &apos;\b&apos;

Observer.emitGet = false

Observer.create = function (value, options) {
  if (value &amp;&amp;
      value.hasOwnProperty(&apos;$observer&apos;) &amp;&amp;
      value.$observer instanceof Observer) {
    return value.$observer
  } if (_.isArray(value)) {
    return new Observer(value, ARRAY, options)
  } else if (
    _.isObject(value) &amp;&amp;
    !value.$scope // avoid Vue instance
  ) {
    return new Observer(value, OBJECT, options)
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x4EE3;&#x7801;&#x51FA;&#x81EA;&#x4E8E;observe.js</span>
<span class="hljs-comment">// &#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x8BB2;&#x89E3;&#x6211;&#x5BF9;&#x4EE3;&#x7801;&#x987A;&#x5E8F;&#x505A;&#x4E86;&#x6539;&#x53D8;&#xFF0C;&#x8981;&#x4E86;&#x89E3;&#x8BE6;&#x7EC6;&#x7684;&#x60C5;&#x51B5;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x5177;&#x4F53;&#x7684;&#x6E90;&#x7801;</span>

<span class="hljs-keyword">var</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../util&apos;</span>)
<span class="hljs-keyword">var</span> Emitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../emitter&apos;</span>)
<span class="hljs-keyword">var</span> arrayAugmentations = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./array-augmentations&apos;</span>)
<span class="hljs-keyword">var</span> objectAugmentations = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./object-augmentations&apos;</span>)

<span class="hljs-keyword">var</span> uid = <span class="hljs-number">0</span>
<span class="hljs-comment">/**
 * Type enums
 */</span>

<span class="hljs-keyword">var</span> ARRAY  = <span class="hljs-number">0</span>
<span class="hljs-keyword">var</span> OBJECT = <span class="hljs-number">1</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Observer</span> (<span class="hljs-params">value, type, options</span>) </span>{
  Emitter.call(<span class="hljs-keyword">this</span>, options &amp;&amp; options.callbackContext)
  <span class="hljs-keyword">this</span>.id = ++uid
  <span class="hljs-keyword">this</span>.value = value
  <span class="hljs-keyword">this</span>.type = type
  <span class="hljs-keyword">this</span>.parents = <span class="hljs-literal">null</span>
  <span class="hljs-keyword">if</span> (value) {
    _.define(value, <span class="hljs-string">&apos;$observer&apos;</span>, <span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">if</span> (type === ARRAY) {
      _.augment(value, arrayAugmentations)
      <span class="hljs-keyword">this</span>.link(value)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (type === OBJECT) {
      <span class="hljs-keyword">if</span> (options &amp;&amp; options.doNotAlterProto) {
        _.deepMixin(value, objectAugmentations)
      } <span class="hljs-keyword">else</span> {
        _.augment(value, objectAugmentations)
      }
      <span class="hljs-keyword">this</span>.walk(value)
    }
  }
}

<span class="hljs-keyword">var</span> p = Observer.prototype = <span class="hljs-built_in">Object</span>.create(Emitter.prototype)

Observer.pathDelimiter = <span class="hljs-string">&apos;\b&apos;</span>

Observer.emitGet = <span class="hljs-literal">false</span>

Observer.create = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value, options</span>) </span>{
  <span class="hljs-keyword">if</span> (value &amp;&amp;
      value.hasOwnProperty(<span class="hljs-string">&apos;$observer&apos;</span>) &amp;&amp;
      value.$observer <span class="hljs-keyword">instanceof</span> Observer) {
    <span class="hljs-keyword">return</span> value.$observer
  } <span class="hljs-keyword">if</span> (_.isArray(value)) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Observer(value, ARRAY, options)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (
    _.isObject(value) &amp;&amp;
    !value.$scope <span class="hljs-comment">// avoid Vue instance</span>
  ) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Observer(value, OBJECT, options)
  }
}
</code></pre><p>&#x3000;&#x3000;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x4ECE;<code>Observer.create</code>&#x770B;&#x8D77;&#xFF0C;&#x5982;&#x679C;<code>value</code>&#x503C;&#x6CA1;&#x6709;&#x54CD;&#x5E94;&#x5316;&#x8FC7;(&#x901A;&#x8FC7;&#x662F;&#x5426;&#x542B;&#x6709;<code>$observer</code>&#x5C5E;&#x6027;&#x53BB;&#x5224;&#x65AD;)&#xFF0C;&#x5219;&#x4F7F;&#x7528;new&#x64CD;&#x4F5C;&#x7B26;&#x521B;&#x5EFA;Obsever&#x5B9E;&#x4F8B;(&#x533A;&#x5206;&#x5BF9;&#x8C61;OBJECT&#x4E0E;&#x6570;&#x7EC4;ARRAY)&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x770B;<code>Observer</code>&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x662F;&#x600E;&#x4E48;&#x5B9A;&#x4E49;&#x7684;&#xFF0C;&#x9996;&#x5148;&#x501F;&#x7528;<code>Emitter</code>&#x6784;&#x9020;&#x51FD;&#x6570;:<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Emitter.call(this, options &amp;&amp; options.callbackContext)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">Emitter.call(<span class="hljs-keyword">this</span>, options &amp;&amp; options.callbackContext)</code></pre><p>&#x914D;&#x5408;&#x539F;&#x578B;&#x7EE7;&#x627F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = Observer.prototype = Object.create(Emitter.prototype)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">var</span> p = Observer.prototype = <span class="hljs-built_in">Object</span>.create(Emitter.prototype)</code></pre><p>&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x4E86;&#x7EC4;&#x5408;&#x7EE7;&#x627F;<code>Emitter</code>&#xFF0C;&#x56E0;&#x6B64;<code>Observer</code>&#x7EE7;&#x627F;&#x4E86;<code>Emitter</code>&#x7684;&#x5C5E;&#x6027;(<code>ctx</code>)&#x548C;&#x65B9;&#x6CD5;(<code>on</code>,<code>emit</code>&#x7B49;)&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;<code>Observer</code>&#x6709;&#x4EE5;&#x4E0B;&#x5C5E;&#x6027;:</p><ul><li><code>id</code>: &#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x7684;&#x552F;&#x4E00;&#x6807;&#x8BC6;</li><li><code>value</code>: &#x539F;&#x59CB;&#x6570;&#x636E;</li><li><code>type</code>: &#x6807;&#x8BC6;&#x662F;&#x6570;&#x7EC4;&#x8FD8;&#x662F;&#x5BF9;&#x8C61;</li><li><code>parents</code>: &#x6807;&#x8BC6;&#x54CD;&#x5E94;&#x5F0F;&#x6570;&#x636E;&#x7684;&#x7236;&#x7EA7;&#xFF0C;&#x53EF;&#x80FD;&#x5B58;&#x5728;&#x591A;&#x4E2A;&#xFF0C;&#x6BD4;&#x5982;<code>var obj = { a : { b: 1"}}"</code>,&#x5728;&#x5904;&#x7406;<code>{b: 1}</code>&#x7684;&#x54CD;&#x5E94;&#x5316;&#x8FC7;&#x7A0B;&#x4E2D;<code>parents</code>&#x4E2D;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x6307;&#x5411;&#x7684;&#x5C31;&#x662F;<code>obj</code>&#x7684;<code>$observer</code>&#x3002;</li></ul><p>&#x3000;&#x3000;&#x6211;&#x4EEC;&#x63A5;&#x7740;&#x770B;&#x9996;&#x5148;&#x7ED9;&#x8BE5;&#x6570;&#x636E;&#x8D4B;&#x503C;<code>$observer</code>&#x5C5E;&#x6027;&#xFF0C;&#x6307;&#x5411;&#x7684;&#x662F;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x3002;<code>_.define</code>&#x5185;&#x90E8;&#x662F;&#x901A;&#x8FC7;<code>defineProperty</code>&#x5B9E;&#x73B0;&#x7684;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define = function (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value        : val,
    enumerable   : !!enumerable,
    writable     : true,
    configurable : true
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">define = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj, key, val, enumerable</span>) </span>{
  <span class="hljs-built_in">Object</span>.defineProperty(obj, key, {
    <span class="hljs-attr">value</span>        : val,
    <span class="hljs-attr">enumerable</span>   : !!enumerable,
    <span class="hljs-attr">writable</span>     : <span class="hljs-literal">true</span>,
    <span class="hljs-attr">configurable</span> : <span class="hljs-literal">true</span>
  })
}</code></pre><p>&#x3000;&#x3000;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x770B;&#x770B;&#x662F;&#x600E;&#x4E48;&#x5904;&#x7406;&#x6570;&#x7EC4;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (type === ARRAY) {
    _.augment(value, arrayAugmentations)
    this.link(value)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (type === ARRAY) {
    _.augment(value, arrayAugmentations)
    <span class="hljs-keyword">this</span>.link(value)
}</code></pre><p>&#x3000;&#x3000;&#x5982;&#x679C;&#x770B;&#x8FC7;&#x6211;&#x524D;&#x4E24;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x5176;&#x5B9E;&#x8FD8;&#x8BB0;&#x5F97;&#x6211;&#x4EEC;&#x5BF9;&#x6570;&#x7EC4;&#x54CD;&#x5E94;&#x5316;&#x5F53;&#x65F6;&#x8FD8;&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x7740;&#x91CD;&#x7684;&#x539F;&#x7406;&#x8BB2;&#x89E3;&#xFF0C;&#x5927;&#x6982;&#x539F;&#x7406;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x7ED9;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x8BBE;&#x7F6E;&#x65B0;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF0C;&#x4ECE;&#x800C;&#x906E;&#x853D;&#x6389;&#x539F;&#x751F;&#x6570;&#x7EC4;&#x7684;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#xFF0C;&#x5927;&#x6982;&#x7684;&#x539F;&#x7406;&#x53EF;&#x4EE5;&#x662F;&#xFF1A;<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function observifyArray(array){
    var aryMethods = [&apos;push&apos;, &apos;pop&apos;, &apos;shift&apos;, &apos;unshift&apos;, &apos;splice&apos;, &apos;sort&apos;, &apos;reverse&apos;];
    var arrayAugmentations = Object.create(Array.prototype);
    aryMethods.forEach((method)=&gt; {
        let original = Array.prototype[method];
        arrayAugmentations[method] = function () {
            // &#x8C03;&#x7528;&#x5BF9;&#x5E94;&#x7684;&#x539F;&#x751F;&#x65B9;&#x6CD5;&#x5E76;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;
            // do everything you what do !
            return original.apply(this, arguments);
        };
    });
    array.__proto__ = arrayAugmentations;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">observifyArray</span>(<span class="hljs-params">array</span>)</span>{
    <span class="hljs-keyword">var</span> aryMethods = [<span class="hljs-string">&apos;push&apos;</span>, <span class="hljs-string">&apos;pop&apos;</span>, <span class="hljs-string">&apos;shift&apos;</span>, <span class="hljs-string">&apos;unshift&apos;</span>, <span class="hljs-string">&apos;splice&apos;</span>, <span class="hljs-string">&apos;sort&apos;</span>, <span class="hljs-string">&apos;reverse&apos;</span>];
    <span class="hljs-keyword">var</span> arrayAugmentations = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Array</span>.prototype);
    aryMethods.forEach(<span class="hljs-function">(<span class="hljs-params">method</span>)=&gt;</span> {
        <span class="hljs-keyword">let</span> original = <span class="hljs-built_in">Array</span>.prototype[method];
        arrayAugmentations[method] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// &#x8C03;&#x7528;&#x5BF9;&#x5E94;&#x7684;&#x539F;&#x751F;&#x65B9;&#x6CD5;&#x5E76;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;</span>
            <span class="hljs-comment">// do everything you what do !</span>
            <span class="hljs-keyword">return</span> original.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        };
    });
    array.__proto__ = arrayAugmentations;
}</code></pre><p>&#x3000;&#x3000;&#x56DE;&#x5230;Vue&#x7684;&#x6E90;&#x7801;&#xFF0C;&#x867D;&#x7136;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x57FA;&#x672C;&#x539F;&#x7406;&#x80AF;&#x5B9A;&#x662F;&#x76F8;&#x540C;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x4ECD;&#x7136;&#x9700;&#x8981;&#x770B;&#x770B;<code>arrayAugmentations</code>&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#x4E0B;&#x9762;<code>arrayAugmentations</code>&#x4EE3;&#x7801;&#x6BD4;&#x8F83;&#x957F;&#x3002;&#x6211;&#x4EEC;&#x4F1A;&#x5728;&#x6CE8;&#x91CA;&#x91CC;&#x9762;&#x89E3;&#x91CA;&#x57FA;&#x672C;&#x539F;&#x7406;:<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4EE3;&#x7801;&#x6765;&#x81EA;&#x4E8E;array-augmentations.js
var _ = require(&apos;../util&apos;)
var arrayAugmentations = Object.create(Array.prototype)
// &#x8FD9;&#x8FB9;&#x64CD;&#x4F5C;&#x548C;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x975E;&#x5E38;&#x76F8;&#x4F3C;
// &#x521B;&#x5EFA;arrayAugmentations&#x539F;&#x578B;&#x7EE7;&#x627F;`Array.prototype`&#x4ECE;&#x800C;&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x6570;&#x7EC4;&#x7684;&#x539F;&#x751F;&#x65B9;&#x6CD5;
// &#x7136;&#x540E;&#x901A;&#x8FC7;arrayAugmentations&#x8986;&#x76D6;&#x6570;&#x7EC4;&#x7684;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#xFF0C;&#x57FA;&#x672C;&#x903B;&#x8F91;&#x5927;&#x81F4;&#x76F8;&#x540C;
[&apos;push&apos;,&apos;pop&apos;,&apos;shift&apos;,&apos;unshift&apos;,&apos;splice&apos;,&apos;sort&apos;,&apos;reverse&apos;].forEach(function (method) {
  var original = Array.prototype[method]
  // &#x8986;&#x76D6;arrayAugmentations&#x4E2D;&#x7684;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;
  _.define(arrayAugmentations, method, function () {
    
    var args = _.toArray(arguments)
    // &#x8FD9;&#x91CC;&#x8C03;&#x7528;&#x4E86;&#x539F;&#x751F;&#x7684;&#x6570;&#x7EC4;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x83B7;&#x5F97;&#x7ED3;&#x679C;
    var result = original.apply(this, args)
    var ob = this.$observer
    var inserted, removed, index
    // &#x4E0B;&#x9762;switch&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x770B;&#x8D77;&#x6765;&#x5F88;&#x957F;&#xFF0C;&#x5176;&#x5B9E;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x9488;&#x5BF9;&#x4E8E;&#x4E0D;&#x540C;&#x7684;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x751F;&#x6210;&#xFF1A;
    // insert removed inserted &#x5177;&#x4F53;&#x7684;&#x542B;&#x4E49;&#x5BF9;&#x7167;&#x4E4B;&#x524D;&#x7684;&#x89E3;&#x91CA;&#xFF0C;&#x4E86;&#x89E3;&#x5373;&#x53EF;
    switch (method) {
      case &apos;push&apos;:
        inserted = args
        index = this.length - args.length
        break
      case &apos;unshift&apos;:
        inserted = args
        index = 0
        break
      case &apos;pop&apos;:
        removed = [result]
        index = this.length
        break
      case &apos;shift&apos;:
        removed = [result]
        index = 0
        break
      case &apos;splice&apos;:
        inserted = args.slice(2)
        removed = result
        index = args[0]
        break
    }

    // &#x5982;&#x679C;&#x7ED9;&#x6570;&#x7EC4;&#x4E2D;&#x63D2;&#x5165;&#x65B0;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x8C03;&#x7528;ob.link
    // link&#x51FD;&#x6570;&#x5176;&#x5B9E;&#x5728;&#x4E0A;&#x9762;&#x7684;_.augment(value, arrayAugmentations)&#x4E4B;&#x540E;&#x4E5F;&#x88AB;&#x8C03;&#x7528;&#x4E86;
    // &#x5177;&#x4F53;&#x7684;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5148;&#x4E0D;&#x7BA1;
    // &#x6211;&#x4EEC;&#x53EA;&#x8981;&#x77E5;&#x9053;&#x5176;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x5206;&#x522B;&#x5BF9;&#x63D2;&#x5165;&#x7684;&#x6570;&#x636E;&#x6267;&#x884C;&#x54CD;&#x5E94;&#x5316;
    if (inserted) ob.link(inserted, index)
    // &#x5176;&#x5B9E;&#x4ECE;link&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x731C;&#x51FA;unlink&#x662F;&#x5E72;&#x4EC0;&#x4E48;&#x7684;
    // &#x4E3B;&#x8981;&#x5C31;&#x662F;&#x5BF9;&#x5220;&#x9664;&#x7684;&#x6570;&#x636E;&#x89E3;&#x9664;&#x54CD;&#x5E94;&#x5316;&#xFF0C;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x903B;&#x8F91;&#x540E;&#x9762;&#x89E3;&#x91CA;
    if (removed) ob.unlink(removed)

    // updateIndices&#x6211;&#x4EEC;&#x4E5F;&#x5148;&#x4E0D;&#x8BB2;&#x662F;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;
    // &#x76EE;&#x7684;&#x5C31;&#x662F;&#x66F4;&#x65B0;&#x5B50;&#x5143;&#x7D20;&#x5728;parents&#x7684;key
    // &#x56E0;&#x4E3A;push&#x548C;pop&#x662F;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x73B0;&#x6709;&#x5143;&#x7D20;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x56E0;&#x6B64;&#x4E0D;&#x9700;&#x8981;&#x8C03;&#x7528;
    // &#x800C;&#x8BF8;&#x5982;splce shift unshift&#x7B49;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x4F1A;&#x6539;&#x53D8;&#x5BF9;&#x5E94;&#x4E0B;&#x6807;&#x503C;&#xFF0C;&#x56E0;&#x6B64;&#x9700;&#x8981;&#x8C03;&#x7528;
    if (method !== &apos;push&apos; &amp;&amp; method !== &apos;pop&apos;) {
      ob.updateIndices()
    }

    // &#x540C;&#x6837;&#x6211;&#x4EEC;&#x5148;&#x4E0D;&#x8003;&#x8651;propagate&#x5185;&#x90E8;&#x5B9E;&#x73B0;,&#x6211;&#x4EEC;&#x53EA;&#x8981;propagate&#x51FD;&#x6570;&#x7684;&#x76EE;&#x7684;&#x5C31;&#x662F;
    // &#x89E6;&#x53D1;&#x81EA;&#x8EAB;&#x53CA;&#x5176;&#x9012;&#x5F52;&#x89E6;&#x53D1;&#x7236;&#x7EA7;&#x7684;&#x4E8B;&#x4EF6;
    // &#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x6709;&#x63D2;&#x5165;&#x6216;&#x8005;&#x5220;&#x9664;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x5BF9;&#x5916;&#x89E6;&#x53D1;&quot;length&quot;&#x88AB;&#x6539;&#x53D8;
    if (inserted || removed) {
      ob.propagate(&apos;set&apos;, &apos;length&apos;, this.length)
    }

    // &#x5BF9;&#x5916;&#x89E6;&#x53D1;mutate&#x4E8B;&#x4EF6;
    // &#x53EF;&#x4EE5;&#x5BF9;&#x7167;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x8BB2;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&apos;array push&apos;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x8FD9;&#x91CC;&#x89E6;&#x53D1;&#x7684;&#xFF0C;&#x56DE;&#x5934;&#x770B;&#x770B;&#x5427;
    ob.propagate(&apos;mutate&apos;, &apos;&apos;, this, {
      method   : method,
      args     : args,
      result   : result,
      index    : index,
      inserted : inserted || [],
      removed  : removed || []
    })

    return result
  })
})

// &#x53EF;&#x4EE5;&#x56DE;&#x770B;&#x4E00;&#x4E0B;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B; array set&#xFF0C;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x8BBE;&#x7F6E;&#x5BF9;&#x5E94;&#x4E0B;&#x6807;&#x7684;&#x503C;
// &#x5176;&#x5B9E;&#x5C31;&#x662F;&#x8C03;&#x7528;&#x4E86;splice&#x53D8;&#x5F02;&#x65B9;&#x6CD5;, &#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x5728;Vue&#x4E2D;&#x56FD;&#x60F3;&#x8981;&#x6539;&#x53D8;&#x67D0;&#x4E2A;&#x4E0B;&#x6807;&#x7684;&#x503C;&#x7684;&#x65F6;&#x5019;
// &#x5B98;&#x7F51;&#x7ED9;&#x51FA;&#x7684;&#x5EFA;&#x8BAE;&#x65E0;&#x975E;&#x662F;Vue.set&#x6216;&#x8005;&#x5C31;&#x662F;splice&#xFF0C;&#x90FD;&#x662F;&#x76F8;&#x540C;&#x7684;&#x539F;&#x7406;
// &#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684;&#x4EE3;&#x7801;&#x5FFD;&#x7565;&#x4E86;&#x8D85;&#x51FA;&#x4E0B;&#x6807;&#x8303;&#x56F4;&#x7684;&#x503C;
_.define(arrayAugmentations, &apos;$set&apos;, function (index, val) {
  if (index &gt;= this.length) {
    this.length = index + 1
  }
  return this.splice(index, 1, val)[0]
})
// $remove&#x4E0E;$add&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x9053;&#x7406;&#xFF0C;&#x90FD;&#x662F;&#x8C03;&#x7528;&#x7684;&#x662F;`splice`&#x51FD;&#x6570;
_.define(arrayAugmentations, &apos;$remove&apos;, function (index) {
  if (typeof index !== &apos;number&apos;) {
    index = this.indexOf(index)
  }
  if (index &gt; -1) {
    return this.splice(index, 1)[0]
  }
})

module.exports = arrayAugmentations" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x4EE3;&#x7801;&#x6765;&#x81EA;&#x4E8E;array-augmentations.js</span>
<span class="hljs-keyword">var</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../util&apos;</span>)
<span class="hljs-keyword">var</span> arrayAugmentations = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Array</span>.prototype)
<span class="hljs-comment">// &#x8FD9;&#x8FB9;&#x64CD;&#x4F5C;&#x548C;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x975E;&#x5E38;&#x76F8;&#x4F3C;</span>
<span class="hljs-comment">// &#x521B;&#x5EFA;arrayAugmentations&#x539F;&#x578B;&#x7EE7;&#x627F;`Array.prototype`&#x4ECE;&#x800C;&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x6570;&#x7EC4;&#x7684;&#x539F;&#x751F;&#x65B9;&#x6CD5;</span>
<span class="hljs-comment">// &#x7136;&#x540E;&#x901A;&#x8FC7;arrayAugmentations&#x8986;&#x76D6;&#x6570;&#x7EC4;&#x7684;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#xFF0C;&#x57FA;&#x672C;&#x903B;&#x8F91;&#x5927;&#x81F4;&#x76F8;&#x540C;</span>
[<span class="hljs-string">&apos;push&apos;</span>,<span class="hljs-string">&apos;pop&apos;</span>,<span class="hljs-string">&apos;shift&apos;</span>,<span class="hljs-string">&apos;unshift&apos;</span>,<span class="hljs-string">&apos;splice&apos;</span>,<span class="hljs-string">&apos;sort&apos;</span>,<span class="hljs-string">&apos;reverse&apos;</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">method</span>) </span>{
  <span class="hljs-keyword">var</span> original = <span class="hljs-built_in">Array</span>.prototype[method]
  <span class="hljs-comment">// &#x8986;&#x76D6;arrayAugmentations&#x4E2D;&#x7684;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;</span>
  _.define(arrayAugmentations, method, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    
    <span class="hljs-keyword">var</span> args = _.toArray(<span class="hljs-built_in">arguments</span>)
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x8C03;&#x7528;&#x4E86;&#x539F;&#x751F;&#x7684;&#x6570;&#x7EC4;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x83B7;&#x5F97;&#x7ED3;&#x679C;</span>
    <span class="hljs-keyword">var</span> result = original.apply(<span class="hljs-keyword">this</span>, args)
    <span class="hljs-keyword">var</span> ob = <span class="hljs-keyword">this</span>.$observer
    <span class="hljs-keyword">var</span> inserted, removed, index
    <span class="hljs-comment">// &#x4E0B;&#x9762;switch&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x770B;&#x8D77;&#x6765;&#x5F88;&#x957F;&#xFF0C;&#x5176;&#x5B9E;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x9488;&#x5BF9;&#x4E8E;&#x4E0D;&#x540C;&#x7684;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x751F;&#x6210;&#xFF1A;</span>
    <span class="hljs-comment">// insert removed inserted &#x5177;&#x4F53;&#x7684;&#x542B;&#x4E49;&#x5BF9;&#x7167;&#x4E4B;&#x524D;&#x7684;&#x89E3;&#x91CA;&#xFF0C;&#x4E86;&#x89E3;&#x5373;&#x53EF;</span>
    <span class="hljs-keyword">switch</span> (method) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;push&apos;</span>:
        inserted = args
        index = <span class="hljs-keyword">this</span>.length - args.length
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;unshift&apos;</span>:
        inserted = args
        index = <span class="hljs-number">0</span>
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;pop&apos;</span>:
        removed = [result]
        index = <span class="hljs-keyword">this</span>.length
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;shift&apos;</span>:
        removed = [result]
        index = <span class="hljs-number">0</span>
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;splice&apos;</span>:
        inserted = args.slice(<span class="hljs-number">2</span>)
        removed = result
        index = args[<span class="hljs-number">0</span>]
        <span class="hljs-keyword">break</span>
    }

    <span class="hljs-comment">// &#x5982;&#x679C;&#x7ED9;&#x6570;&#x7EC4;&#x4E2D;&#x63D2;&#x5165;&#x65B0;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x8C03;&#x7528;ob.link</span>
    <span class="hljs-comment">// link&#x51FD;&#x6570;&#x5176;&#x5B9E;&#x5728;&#x4E0A;&#x9762;&#x7684;_.augment(value, arrayAugmentations)&#x4E4B;&#x540E;&#x4E5F;&#x88AB;&#x8C03;&#x7528;&#x4E86;</span>
    <span class="hljs-comment">// &#x5177;&#x4F53;&#x7684;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5148;&#x4E0D;&#x7BA1;</span>
    <span class="hljs-comment">// &#x6211;&#x4EEC;&#x53EA;&#x8981;&#x77E5;&#x9053;&#x5176;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x5206;&#x522B;&#x5BF9;&#x63D2;&#x5165;&#x7684;&#x6570;&#x636E;&#x6267;&#x884C;&#x54CD;&#x5E94;&#x5316;</span>
    <span class="hljs-keyword">if</span> (inserted) ob.link(inserted, index)
    <span class="hljs-comment">// &#x5176;&#x5B9E;&#x4ECE;link&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x731C;&#x51FA;unlink&#x662F;&#x5E72;&#x4EC0;&#x4E48;&#x7684;</span>
    <span class="hljs-comment">// &#x4E3B;&#x8981;&#x5C31;&#x662F;&#x5BF9;&#x5220;&#x9664;&#x7684;&#x6570;&#x636E;&#x89E3;&#x9664;&#x54CD;&#x5E94;&#x5316;&#xFF0C;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x903B;&#x8F91;&#x540E;&#x9762;&#x89E3;&#x91CA;</span>
    <span class="hljs-keyword">if</span> (removed) ob.unlink(removed)

    <span class="hljs-comment">// updateIndices&#x6211;&#x4EEC;&#x4E5F;&#x5148;&#x4E0D;&#x8BB2;&#x662F;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;</span>
    <span class="hljs-comment">// &#x76EE;&#x7684;&#x5C31;&#x662F;&#x66F4;&#x65B0;&#x5B50;&#x5143;&#x7D20;&#x5728;parents&#x7684;key</span>
    <span class="hljs-comment">// &#x56E0;&#x4E3A;push&#x548C;pop&#x662F;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x73B0;&#x6709;&#x5143;&#x7D20;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x56E0;&#x6B64;&#x4E0D;&#x9700;&#x8981;&#x8C03;&#x7528;</span>
    <span class="hljs-comment">// &#x800C;&#x8BF8;&#x5982;splce shift unshift&#x7B49;&#x53D8;&#x5F02;&#x65B9;&#x6CD5;&#x4F1A;&#x6539;&#x53D8;&#x5BF9;&#x5E94;&#x4E0B;&#x6807;&#x503C;&#xFF0C;&#x56E0;&#x6B64;&#x9700;&#x8981;&#x8C03;&#x7528;</span>
    <span class="hljs-keyword">if</span> (method !== <span class="hljs-string">&apos;push&apos;</span> &amp;&amp; method !== <span class="hljs-string">&apos;pop&apos;</span>) {
      ob.updateIndices()
    }

    <span class="hljs-comment">// &#x540C;&#x6837;&#x6211;&#x4EEC;&#x5148;&#x4E0D;&#x8003;&#x8651;propagate&#x5185;&#x90E8;&#x5B9E;&#x73B0;,&#x6211;&#x4EEC;&#x53EA;&#x8981;propagate&#x51FD;&#x6570;&#x7684;&#x76EE;&#x7684;&#x5C31;&#x662F;</span>
    <span class="hljs-comment">// &#x89E6;&#x53D1;&#x81EA;&#x8EAB;&#x53CA;&#x5176;&#x9012;&#x5F52;&#x89E6;&#x53D1;&#x7236;&#x7EA7;&#x7684;&#x4E8B;&#x4EF6;</span>
    <span class="hljs-comment">// &#x5982;&#x679C;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x6709;&#x63D2;&#x5165;&#x6216;&#x8005;&#x5220;&#x9664;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x5BF9;&#x5916;&#x89E6;&#x53D1;&quot;length&quot;&#x88AB;&#x6539;&#x53D8;</span>
    <span class="hljs-keyword">if</span> (inserted || removed) {
      ob.propagate(<span class="hljs-string">&apos;set&apos;</span>, <span class="hljs-string">&apos;length&apos;</span>, <span class="hljs-keyword">this</span>.length)
    }

    <span class="hljs-comment">// &#x5BF9;&#x5916;&#x89E6;&#x53D1;mutate&#x4E8B;&#x4EF6;</span>
    <span class="hljs-comment">// &#x53EF;&#x4EE5;&#x5BF9;&#x7167;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x8BB2;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&apos;array push&apos;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x8FD9;&#x91CC;&#x89E6;&#x53D1;&#x7684;&#xFF0C;&#x56DE;&#x5934;&#x770B;&#x770B;&#x5427;</span>
    ob.propagate(<span class="hljs-string">&apos;mutate&apos;</span>, <span class="hljs-string">&apos;&apos;</span>, <span class="hljs-keyword">this</span>, {
      <span class="hljs-attr">method</span>   : method,
      <span class="hljs-attr">args</span>     : args,
      <span class="hljs-attr">result</span>   : result,
      <span class="hljs-attr">index</span>    : index,
      <span class="hljs-attr">inserted</span> : inserted || [],
      <span class="hljs-attr">removed</span>  : removed || []
    })

    <span class="hljs-keyword">return</span> result
  })
})

<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x56DE;&#x770B;&#x4E00;&#x4E0B;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B; array set&#xFF0C;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x8BBE;&#x7F6E;&#x5BF9;&#x5E94;&#x4E0B;&#x6807;&#x7684;&#x503C;</span>
<span class="hljs-comment">// &#x5176;&#x5B9E;&#x5C31;&#x662F;&#x8C03;&#x7528;&#x4E86;splice&#x53D8;&#x5F02;&#x65B9;&#x6CD5;, &#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x5728;Vue&#x4E2D;&#x56FD;&#x60F3;&#x8981;&#x6539;&#x53D8;&#x67D0;&#x4E2A;&#x4E0B;&#x6807;&#x7684;&#x503C;&#x7684;&#x65F6;&#x5019;</span>
<span class="hljs-comment">// &#x5B98;&#x7F51;&#x7ED9;&#x51FA;&#x7684;&#x5EFA;&#x8BAE;&#x65E0;&#x975E;&#x662F;Vue.set&#x6216;&#x8005;&#x5C31;&#x662F;splice&#xFF0C;&#x90FD;&#x662F;&#x76F8;&#x540C;&#x7684;&#x539F;&#x7406;</span>
<span class="hljs-comment">// &#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684;&#x4EE3;&#x7801;&#x5FFD;&#x7565;&#x4E86;&#x8D85;&#x51FA;&#x4E0B;&#x6807;&#x8303;&#x56F4;&#x7684;&#x503C;</span>
_.define(arrayAugmentations, <span class="hljs-string">&apos;$set&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">index, val</span>) </span>{
  <span class="hljs-keyword">if</span> (index &gt;= <span class="hljs-keyword">this</span>.length) {
    <span class="hljs-keyword">this</span>.length = index + <span class="hljs-number">1</span>
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.splice(index, <span class="hljs-number">1</span>, val)[<span class="hljs-number">0</span>]
})
<span class="hljs-comment">// $remove&#x4E0E;$add&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x9053;&#x7406;&#xFF0C;&#x90FD;&#x662F;&#x8C03;&#x7528;&#x7684;&#x662F;`splice`&#x51FD;&#x6570;</span>
_.define(arrayAugmentations, <span class="hljs-string">&apos;$remove&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">index</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> index !== <span class="hljs-string">&apos;number&apos;</span>) {
    index = <span class="hljs-keyword">this</span>.indexOf(index)
  }
  <span class="hljs-keyword">if</span> (index &gt; <span class="hljs-number">-1</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.splice(index, <span class="hljs-number">1</span>)[<span class="hljs-number">0</span>]
  }
})

<span class="hljs-built_in">module</span>.exports = arrayAugmentations</code></pre><p>&#x3000;&#x3000;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x76F8;&#x5BF9;&#x6BD4;&#x8F83;&#x957F;&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x89E3;&#x91CA;&#x6211;&#x4EEC;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x5DF2;&#x7ECF;&#x6CE8;&#x91CA;&#x3002;&#x5230;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x4E86;&#x89E3;&#x5B8C;<code>arrayAugmentations</code>&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x63A5;&#x7740;&#x770B;&#x770B;<code>_.augment</code>&#x505A;&#x4E86;&#x4EC0;&#x4E48;&#x3002;&#x6211;&#x4EEC;&#x5728;&#x6587;&#x7AE0;<a href="https://github.com/MrErHu/blog/issues/29" rel="nofollow noreferrer" target="_blank">&#x4ECE;Vue&#x6570;&#x7EC4;&#x54CD;&#x5E94;&#x5316;&#x6240;&#x5F15;&#x53D1;&#x7684;&#x601D;&#x8003;</a>&#x4E2D;&#x8BB2;&#x8FC7;Vue&#x662F;&#x901A;&#x8FC7;<code>__proto__</code>&#x6765;&#x5B9E;&#x73B0;&#x6570;&#x7EC4;&#x54CD;&#x5E94;&#x5316;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x7531;&#x4E8E;<code>__proto__</code>&#x662F;&#x4E2A;&#x975E;&#x6807;&#x51C6;&#x5C5E;&#x6027;&#xFF0C;&#x867D;&#x7136;&#x5E7F;&#x6CDB;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x5382;&#x5546;&#x57FA;&#x672C;&#x90FD;&#x5B9E;&#x73B0;&#x4E86;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x662F;&#x5B58;&#x5728;&#x90E8;&#x5206;&#x7684;&#x5B89;&#x5353;&#x7248;&#x672C;&#x5E76;&#x4E0D;&#x652F;&#x6301;&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;Vue&#x5FC5;&#x987B;&#x5BF9;&#x6B64;&#x505A;&#x76F8;&#x5173;&#x7684;&#x5904;&#x7406;&#xFF0C;<code>_.augment</code>&#x5C31;&#x8D1F;&#x8D23;&#x8FD9;&#x4E2A;&#x90E8;&#x5206;:<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.augment = &apos;__proto__&apos; in {}
  ? function (target, proto) {
      target.__proto__ = proto
    }
  : exports.deepMixin
  
exports.deepMixin = function (to, from) {
  Object.getOwnPropertyNames(from).forEach(function (key) {
    var desc =Object.getOwnPropertyDescriptor(from, key)
    Object.defineProperty(to, key, desc)
  })
}  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">exports.augment = <span class="hljs-string">&apos;__proto__&apos;</span> <span class="hljs-keyword">in</span> {}
  ? <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target, proto</span>) </span>{
      target.__proto__ = proto
    }
  : exports.deepMixin
  
exports.deepMixin = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">to, from</span>) </span>{
  <span class="hljs-built_in">Object</span>.getOwnPropertyNames(<span class="hljs-keyword">from</span>).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
    <span class="hljs-keyword">var</span> desc =<span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(<span class="hljs-keyword">from</span>, key)
    <span class="hljs-built_in">Object</span>.defineProperty(to, key, desc)
  })
}  </code></pre><p>&#x3000;&#x3000;&#x6211;&#x4EEC;&#x770B;&#x5230;&#x5982;&#x679C;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x652F;&#x6301;<code>__proto__</code>&#x8BDD;&#x8C03;&#x7528;<code>deepMixin</code>&#x51FD;&#x6570;&#x3002;&#x800C;<code>deepMixin</code>&#x7684;&#x5B9E;&#x73B0;&#x4E5F;&#x662F;&#x975E;&#x5E38;&#x7684;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x4F7F;&#x7528;<code>Object.defineProperty</code>&#x5C06;&#x539F;&#x5BF9;&#x8C61;&#x7684;<strong>&#x5C5E;&#x6027;&#x63CF;&#x8FF0;&#x7B26;</strong>&#x8D4B;&#x503C;&#x7ED9;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x3002;&#x63A5;&#x7740;&#x8C03;&#x7528;&#x4E86;&#x51FD;&#x6570;&#xFF1A;<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.link(value)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">this</span>.link(value)</code></pre><p>&#x3000;&#x3000;&#x5173;&#x4E8E;<code>link</code>&#x51FD;&#x6570;&#x5728;&#x4E0A;&#x9762;&#x7684;&#x5907;&#x6CE8;&#x4E2D;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x89C1;&#x8FC7;&#x4E86;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (inserted) ob.link(inserted, index)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">if</span> (inserted) ob.link(inserted, index)</code></pre><p>&#x3000;&#x3000;&#x5F53;&#x65F6;&#x6211;&#x4EEC;&#x7684;&#x89E3;&#x91CA;&#x662F;&#x5C06;&#x65B0;&#x63D2;&#x5165;&#x7684;&#x6570;&#x636E;&#x54CD;&#x5E94;&#x5316;&#xFF0C;&#x77E5;&#x9053;&#x4E86;&#x529F;&#x80FD;&#x6211;&#x4EEC;&#x770B;&#x770B;&#x4EE3;&#x7801;&#x7684;&#x5B9E;&#x73B0;:<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// p === Observer.prototype
p.link = function (items, index) {
  index = index || 0
  for (var i = 0, l = items.length; i &lt; l; i++) {
    this.observe(i + index, items[i])
  }
}

p.observe = function (key, val) {
  var ob = Observer.create(val)
  if (ob) {
    // register self as a parent of the child observer.
    var parents = ob.parents
    if (!parents) {
      ob.parents = parents = Object.create(null)
    }
    if (parents[this.id]) {
      _.warn(&apos;Observing duplicate key: &apos; + key)
      return
    }
    parents[this.id] = {
      ob: this,
      key: key
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// p === Observer.prototype</span>
p.link = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">items, index</span>) </span>{
  index = index || <span class="hljs-number">0</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = items.length; i &lt; l; i++) {
    <span class="hljs-keyword">this</span>.observe(i + index, items[i])
  }
}

p.observe = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key, val</span>) </span>{
  <span class="hljs-keyword">var</span> ob = Observer.create(val)
  <span class="hljs-keyword">if</span> (ob) {
    <span class="hljs-comment">// register self as a parent of the child observer.</span>
    <span class="hljs-keyword">var</span> parents = ob.parents
    <span class="hljs-keyword">if</span> (!parents) {
      ob.parents = parents = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
    }
    <span class="hljs-keyword">if</span> (parents[<span class="hljs-keyword">this</span>.id]) {
      _.warn(<span class="hljs-string">&apos;Observing duplicate key: &apos;</span> + key)
      <span class="hljs-keyword">return</span>
    }
    parents[<span class="hljs-keyword">this</span>.id] = {
      <span class="hljs-attr">ob</span>: <span class="hljs-keyword">this</span>,
      <span class="hljs-attr">key</span>: key
    }
  }
}</code></pre><p>&#x3000;&#x3000;&#x5176;&#x5B9E;&#x4EE3;&#x7801;&#x903B;&#x8F91;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;<code>link</code>&#x51FD;&#x6570;&#x4F1A;&#x5BF9;&#x7ED9;&#x5B9A;&#x6570;&#x7EC4;index(&#x9ED8;&#x8BA4;&#x4E3A;0)&#x4E4B;&#x540E;&#x7684;&#x5143;&#x7D20;&#x8C03;&#x7528;<code>this.observe</code>, &#x800C;<code>observe</code>&#x5176;&#x5B9E;&#x4E5F;&#x5C31;&#x662F;&#x5BF9;&#x7ED9;&#x5B9A;&#x7684;<code>val</code>&#x503C;&#x9012;&#x5F52;&#x8C03;&#x7528;<code>Observer.create</code>,&#x5C06;&#x6570;&#x636E;&#x54CD;&#x5E94;&#x5316;&#xFF0C;&#x5E76;&#x5EFA;&#x7ACB;&#x7236;&#x7EA7;&#x7684;Observer&#x4E0E;&#x5F53;&#x524D;&#x5B9E;&#x4F8B;&#x7684;&#x5BF9;&#x5E94;&#x5173;&#x7CFB;&#x3002;&#x524D;&#x9762;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x53D1;&#x73B0;Vue&#x4E0D;&#x4EC5;&#x4EC5;&#x4F1A;&#x5BF9;&#x63D2;&#x5165;&#x7684;&#x6570;&#x636E;&#x54CD;&#x5E94;&#x5316;&#xFF0C;&#x5E76;&#x4E14;&#x4E5F;&#x4F1A;&#x5BF9;&#x5220;&#x9664;&#x7684;&#x5143;&#x7D20;&#x8C03;&#x7528;<code>unlink</code>,&#x5177;&#x4F53;&#x7684;&#x8C03;&#x7528;&#x4EE3;&#x7801;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (removed) ob.unlink(removed)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">if</span> (removed) ob.unlink(removed)</code></pre><p>&#x3000;&#x3000;&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x5927;&#x81F4;&#x8BB2;&#x8FC7;&#x5176;&#x7528;&#x4F5C;&#x5C31;&#x662F;&#x5BF9;&#x5220;&#x9664;&#x7684;&#x6570;&#x636E;&#x89E3;&#x9664;&#x54CD;&#x5E94;&#x5316;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x5177;&#x4F53;&#x7684;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p.unlink = function (items) {
  for (var i = 0, l = items.length; i &lt; l; i++) {
    this.unobserve(items[i])
  }
}
p.unobserve = function (val) {
  if (val &amp;&amp; val.$observer) {
    val.$observer.parents[this.id] = null
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">p.unlink = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">items</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = items.length; i &lt; l; i++) {
    <span class="hljs-keyword">this</span>.unobserve(items[i])
  }
}
p.unobserve = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
  <span class="hljs-keyword">if</span> (val &amp;&amp; val.$observer) {
    val.$observer.parents[<span class="hljs-keyword">this</span>.id] = <span class="hljs-literal">null</span>
  }
}</code></pre><p>&#x3000;&#x3000;&#x4EE3;&#x7801;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x5BF9;&#x6570;&#x636E;&#x8C03;&#x7528;<code>unobserve</code>&#xFF0C;&#x800C;<code>unobserve</code>&#x51FD;&#x6570;&#x7684;&#x4E3B;&#x8981;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x89E3;&#x9664;&#x7236;&#x7EA7;<code>observer</code>&#x4E0E;&#x5F53;&#x524D;&#x6570;&#x636E;&#x7684;&#x5173;&#x7CFB;&#x5E76;&#x4E14;&#x4E0D;&#x518D;&#x4FDD;&#x7559;&#x5F15;&#x7528;&#xFF0C;&#x8BA9;&#x6D4F;&#x89C8;&#x5668;&#x5185;&#x6838;&#x5FC5;&#x8981;&#x7684;&#x65F6;&#x5019;&#x80FD;&#x591F;&#x56DE;&#x6536;&#x5185;&#x5B58;&#x7A7A;&#x95F4;&#x3002;</p><p>&#x3000;&#x3000;&#x5728;<code>arrayAugmentations</code>&#x4E2D;&#x5176;&#x5B9E;&#x8FD8;&#x8C03;&#x7528;&#x8FC7;<code>Observer</code>&#x7684;&#x4E24;&#x4E2A;&#x539F;&#x578B;&#x65B9;&#x6CD5;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ob.updateIndices()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">ob.updateIndices()</code></pre><p>&#x3000;&#x3000;&#x53E6;&#x4E00;&#x4E2A;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ob.propagate(&apos;set&apos;, &apos;length&apos;, this.length)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">ob.propagate(<span class="hljs-string">&apos;set&apos;</span>, <span class="hljs-string">&apos;length&apos;</span>, <span class="hljs-keyword">this</span>.length)</code></pre><p>&#x3000;&#x3000;&#x9996;&#x5148;&#x770B;&#x770B;<code>updateIndices</code>&#x51FD;&#x6570;&#xFF0C;&#x5F53;&#x65F6;&#x7684;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x66F4;&#x65B0;&#x5B50;&#x5143;&#x7D20;&#x5728;parents&#x7684;key&#xFF0C;&#x6765;&#x770B;&#x770B;&#x5177;&#x4F53;&#x5B9E;&#x73B0;:<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p.updateIndices = function () {
  var arr = this.value
  var i = arr.length
  var ob
  while (i--) {
    ob = arr[i] &amp;&amp; arr[i].$observer
    if (ob) {
      ob.parents[this.id].key = i
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">p.updateIndices = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">this</span>.value
  <span class="hljs-keyword">var</span> i = arr.length
  <span class="hljs-keyword">var</span> ob
  <span class="hljs-keyword">while</span> (i--) {
    ob = arr[i] &amp;&amp; arr[i].$observer
    <span class="hljs-keyword">if</span> (ob) {
      ob.parents[<span class="hljs-keyword">this</span>.id].key = i
    }
  }
}</code></pre><p>&#x3000;&#x3000;&#x63A5;&#x7740;&#x770B;&#x51FD;&#x6570;<code>propagate</code>:<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p.propagate = function (event, path, val, mutation) {
  this.emit(event, path, val, mutation)
  if (!this.parents) return
  for (var id in this.parents) {
    var parent = this.parents[id]
    if (!parent) continue
    var key = parent.key
    var parentPath = path
      ? key + Observer.pathDelimiter + path
      : key
    parent.ob.propagate(event, parentPath, val, mutation)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">p.propagate = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event, path, val, mutation</span>) </span>{
  <span class="hljs-keyword">this</span>.emit(event, path, val, mutation)
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.parents) <span class="hljs-keyword">return</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> id <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.parents) {
    <span class="hljs-keyword">var</span> parent = <span class="hljs-keyword">this</span>.parents[id]
    <span class="hljs-keyword">if</span> (!parent) <span class="hljs-keyword">continue</span>
    <span class="hljs-keyword">var</span> key = parent.key
    <span class="hljs-keyword">var</span> parentPath = path
      ? key + Observer.pathDelimiter + path
      : key
    parent.ob.propagate(event, parentPath, val, mutation)
  }
}</code></pre><p>&#x3000;&#x3000;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x8BF4;&#x8FC7;<code>propagate</code>&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x7684;&#x5C31;&#x662F;&#x89E6;&#x53D1;&#x81EA;&#x8EAB;&#x53CA;&#x5176;&#x9012;&#x5F52;&#x89E6;&#x53D1;&#x7236;&#x7EA7;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x9996;&#x5148;&#x8C03;&#x7528;<code>emit</code>&#x51FD;&#x6570;&#x5BF9;&#x5916;&#x89E6;&#x53D1;&#x65F6;&#x95F4;&#xFF0C;&#x5176;&#x53C2;&#x6570;&#x5206;&#x522B;&#x662F;&#xFF1A;&#x4E8B;&#x4EF6;&#x540D;&#x3001;&#x8DEF;&#x5F84;&#x3001;&#x503C;&#x3001;<code>mutatin</code>&#x5BF9;&#x8C61;&#x3002;&#x7136;&#x540E;&#x63A5;&#x7740;&#x9012;&#x5F52;&#x8C03;&#x7528;&#x7236;&#x7EA7;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x5E76;&#x4E14;&#x5BF9;&#x5E94;&#x6539;&#x53D8;&#x89E6;&#x53D1;&#x7684;<code>path</code>&#x53C2;&#x6570;&#x3002;<code>parentPath</code>&#x7B49;&#x4E8E;<code>parents[id].key</code> + <code>Observer.pathDelimiter</code> + <code>path</code></p><p>&#x3000;&#x3000;&#x5230;&#x6B64;&#x4E3A;&#x6B62;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5B66;&#x4E60;&#x5B8C;&#x4E86;Vue&#x662F;&#x5982;&#x4F55;&#x5904;&#x7406;&#x6570;&#x7EC4;&#x7684;&#x54CD;&#x5E94;&#x5316;&#x7684;&#xFF0C;&#x73B0;&#x5728;&#x9700;&#x8981;&#x6765;&#x770B;&#x770B;&#x662F;&#x5982;&#x4F55;&#x5904;&#x7406;&#x5BF9;&#x8C61;&#x7684;&#x54CD;&#x5E94;&#x5316;&#x7684;&#x3002;<br>&#x3000;&#x3000;</p><h4>&#x5BF9;&#x8C61;&#x3000;&#x3000;</h4><p>&#x3000;&#x3000;<br>&#x3000;&#x3000;&#x5728;<code>Observer</code>&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x5173;&#x4E8E;&#x5BF9;&#x8C61;&#x5904;&#x7406;&#x7684;&#x4EE3;&#x7801;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (type === OBJECT) {
    if (options &amp;&amp; options.doNotAlterProto) {
        _.deepMixin(value, objectAugmentations)
    } else {
        _.augment(value, objectAugmentations)
    }
    this.walk(value)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (type === OBJECT) {
    <span class="hljs-keyword">if</span> (options &amp;&amp; options.doNotAlterProto) {
        _.deepMixin(value, objectAugmentations)
    } <span class="hljs-keyword">else</span> {
        _.augment(value, objectAugmentations)
    }
    <span class="hljs-keyword">this</span>.walk(value)
}</code></pre><p>&#x3000;&#x3000;&#x548C;&#x6570;&#x7EC4;&#x4E00;&#x6837;&#xFF0C;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x8981;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;<code>objectAugmentations</code>&#x7684;&#x5185;&#x90E8;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _ = require(&apos;../util&apos;)
var objectAgumentations = Object.create(Object.prototype)

_.define(objectAgumentations, &apos;$add&apos;, function (key, val) {
  if (this.hasOwnProperty(key)) return
  _.define(this, key, val, true)
  var ob = this.$observer
  ob.observe(key, val)
  ob.convert(key, val)
  ob.emit(&apos;add:self&apos;, key, val)
  ob.propagate(&apos;add&apos;, key, val)
})

_.define(objectAgumentations, &apos;$delete&apos;, function (key) {
  if (!this.hasOwnProperty(key)) return
  delete this[key]
  var ob = this.$observer
  ob.emit(&apos;delete:self&apos;, key)
  ob.propagate(&apos;delete&apos;, key)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../util&apos;</span>)
<span class="hljs-keyword">var</span> objectAgumentations = <span class="hljs-built_in">Object</span>.create(<span class="hljs-built_in">Object</span>.prototype)

_.define(objectAgumentations, <span class="hljs-string">&apos;$add&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key, val</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.hasOwnProperty(key)) <span class="hljs-keyword">return</span>
  _.define(<span class="hljs-keyword">this</span>, key, val, <span class="hljs-literal">true</span>)
  <span class="hljs-keyword">var</span> ob = <span class="hljs-keyword">this</span>.$observer
  ob.observe(key, val)
  ob.convert(key, val)
  ob.emit(<span class="hljs-string">&apos;add:self&apos;</span>, key, val)
  ob.propagate(<span class="hljs-string">&apos;add&apos;</span>, key, val)
})

_.define(objectAgumentations, <span class="hljs-string">&apos;$delete&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.hasOwnProperty(key)) <span class="hljs-keyword">return</span>
  <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>[key]
  <span class="hljs-keyword">var</span> ob = <span class="hljs-keyword">this</span>.$observer
  ob.emit(<span class="hljs-string">&apos;delete:self&apos;</span>, key)
  ob.propagate(<span class="hljs-string">&apos;delete&apos;</span>, key)
})</code></pre><p>&#x3000;&#x3000;&#x76F8;&#x6BD4;&#x4E8E;<code>arrayAugmentations</code>&#xFF0C;<code>objectAgumentations</code>&#x5185;&#x90E8;&#x5B9E;&#x73B0;&#x5219;&#x7B80;&#x5355;&#x7684;&#x591A;&#xFF0C;<code>objectAgumentations</code>&#x6DFB;&#x52A0;&#x4E86;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;: <code>$add</code>&#x4E0E;<code>$delete</code>&#x3002;</p><p>&#x3000;&#x3000;<code>$add</code>&#x7528;&#x4E8E;&#x7ED9;&#x5BF9;&#x8C61;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x8BE5;&#x5BF9;&#x8C61;&#x4E4B;&#x524D;&#x5C31;&#x5B58;&#x5728;&#x952E;&#x503C;&#x4E3A;<code>key</code>&#x7684;&#x5C5E;&#x6027;&#x5219;&#x4E0D;&#x505A;&#x4EFB;&#x4F55;&#x64CD;&#x4F5C;&#xFF0C;&#x5426;&#x5219;&#x9996;&#x5148;&#x4F7F;&#x7528;<code>_.define</code>&#x8D4B;&#x503C;&#x8BE5;&#x5C5E;&#x6027;&#xFF0C;&#x7136;&#x540E;&#x8C03;&#x7528;<code>ob.observe</code>&#x76EE;&#x7684;&#x662F;&#x9012;&#x5F52;&#x8C03;&#x7528;&#x4F7F;&#x5F97;<code>val</code>&#x503C;&#x54CD;&#x5E94;&#x5316;&#x3002;&#x800C;<code>convert</code>&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x5C06;&#x8BE5;&#x5C5E;&#x6027;&#x8F6C;&#x6362;&#x6210;&#x8BBF;&#x95EE;&#x5668;&#x5C5E;&#x6027;<code>getter/setter</code>&#x4F7F;&#x5F97;&#x5C5E;&#x6027;&#x88AB;&#x8BBF;&#x95EE;&#x6216;&#x8005;&#x88AB;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x76D1;&#x542C;&#x5230;&#xFF0C;&#x5177;&#x4F53;&#x6211;&#x53EF;&#x4EE5;&#x770B;&#x4E00;&#x4E0B;<code>convert</code>&#x51FD;&#x6570;&#x7684;&#x5185;&#x90E8;&#x5B9E;&#x73B0;&#xFF1A;<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p.convert = function (key, val) {
  var ob = this
  Object.defineProperty(ob.value, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if (Observer.emitGet) {
        ob.propagate(&apos;get&apos;, key)
      }
      return val
    },
    set: function (newVal) {
      if (newVal === val) return
      ob.unobserve(val)
      val = newVal
      ob.observe(key, newVal)
      ob.emit(&apos;set:self&apos;, key, newVal)
      ob.propagate(&apos;set&apos;, key, newVal)
    }
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">p.convert = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key, val</span>) </span>{
  <span class="hljs-keyword">var</span> ob = <span class="hljs-keyword">this</span>
  <span class="hljs-built_in">Object</span>.defineProperty(ob.value, key, {
    <span class="hljs-attr">enumerable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">configurable</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (Observer.emitGet) {
        ob.propagate(<span class="hljs-string">&apos;get&apos;</span>, key)
      }
      <span class="hljs-keyword">return</span> val
    },
    <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">newVal</span>) </span>{
      <span class="hljs-keyword">if</span> (newVal === val) <span class="hljs-keyword">return</span>
      ob.unobserve(val)
      val = newVal
      ob.observe(key, newVal)
      ob.emit(<span class="hljs-string">&apos;set:self&apos;</span>, key, newVal)
      ob.propagate(<span class="hljs-string">&apos;set&apos;</span>, key, newVal)
    }
  })
}</code></pre><p>&#x3000;&#x3000;<code>convert</code>&#x51FD;&#x6570;&#x7684;&#x5185;&#x90E8;&#x5B9E;&#x73B0;&#x4E5F;&#x4E0D;&#x590D;&#x6742;&#xFF0C;&#x5728;<code>get</code>&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x5F00;&#x542F;&#x4E86;&#x5168;&#x5C40;&#x7684;<code>Observer.emitGet</code>&#x5F00;&#x5173;&#xFF0C;&#x5728;&#x8BE5;&#x5C5E;&#x6027;&#x88AB;&#x8BBF;&#x95EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x5BF9;&#x8C03;&#x7528;<code>propagate</code>&#x89E6;&#x53D1;&#x672C;&#x8EAB;&#x4EE5;&#x53CA;&#x7236;&#x7EA7;&#x7684;&#x5BF9;&#x5E94;<code>get</code>&#x4E8B;&#x4EF6;&#x3002;&#x5728;<code>set</code>&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x9996;&#x5148;&#x8C03;&#x7528;<code>unobserve</code>&#x5BF9;&#x4E4B;&#x95F4;&#x7684;&#x503C;&#x63A5;&#x89E6;&#x54CD;&#x5E94;&#x5316;&#xFF0C;&#x63A5;&#x7740;&#x8C03;&#x7528;<code>ob.observe</code>&#x4F7F;&#x5F97;&#x65B0;&#x8D4B;&#x503C;&#x7684;&#x6570;&#x636E;&#x54CD;&#x5E94;&#x5316;&#x3002;&#x6700;&#x540E;&#x9996;&#x5148;&#x89E6;&#x53D1;&#x672C;&#x8EAB;&#x7684;<code>set:self</code>&#x4E8B;&#x4EF6;&#xFF0C;&#x63A5;&#x7740;&#x8C03;&#x7528;<code>propagate</code>&#x89E6;&#x53D1;&#x672C;&#x8EAB;&#x4EE5;&#x53CA;&#x7236;&#x7EA7;&#x7684;&#x5BF9;&#x5E94;<code>set</code>&#x4E8B;&#x4EF6;&#x3002;</p><p>&#x3000;&#x3000;<code>$delete</code>&#x7528;&#x4E8E;&#x7ED9;&#x5220;&#x9664;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;&#x8BE5;&#x5C5E;&#x6027;&#x5219;&#x76F4;&#x63A5;&#x9000;&#x51FA;&#xFF0C;&#x5426;&#x5219;&#x5148;&#x7528;<code>delete</code>&#x64CD;&#x4F5C;&#x7B26;&#x5220;&#x9664;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x7136;&#x540E;&#x5BF9;&#x5916;&#x89E6;&#x53D1;&#x672C;&#x8EAB;&#x7684;<code>delete:self</code>&#x4E8B;&#x4EF6;&#xFF0C;&#x63A5;&#x7740;&#x8C03;&#x7528;<code>delete</code>&#x89E6;&#x53D1;&#x672C;&#x8EAB;&#x4EE5;&#x53CA;&#x7236;&#x7EA7;&#x5BF9;&#x5E94;&#x7684;<code>delete</code>&#x4E8B;&#x4EF6;&#x3002;</p><p>&#x3000;&#x3000;&#x770B;&#x5B8C;&#x4E86;<code>objectAgumentations</code>&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5728;<code>Observer</code>&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x77E5;&#x9053;&#xFF0C;&#x5982;&#x679C;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x4E2D;&#x5B58;&#x5728;<code>op.doNotAlterProto</code>&#x610F;&#x5473;&#x7740;&#x4E0D;&#x8981;&#x6539;&#x53D8;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#xFF0C;&#x5219;&#x91C7;&#x7528;<code>deepMixin</code>&#x51FD;&#x6570;&#x5C06;<code>$add</code>&#x548C;<code>$delete</code>&#x51FD;&#x6570;&#x6DFB;&#x52A0;&#x5230;&#x5BF9;&#x8C61;&#x4E2D;&#xFF0C;&#x5426;&#x5219;&#x91C7;&#x7528;&#x51FD;&#x6570;<code>arguments</code>&#x51FD;&#x6570;&#x5C06;<code>$add</code>&#x548C;<code>$delete</code>&#x6DFB;&#x52A0;&#x5230;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x4E2D;&#x3002;&#x6700;&#x540E;&#x8C03;&#x7528;&#x4E86;<code>walk</code>&#x51FD;&#x6570;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x770B;&#x770B;<code>walk</code>&#x662F;&#x5185;&#x90E8;&#x662F;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x7684;:<br>&#x3000;&#x3000;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p.walk = function (obj) {
  var key, val, descriptor, prefix
  for (key in obj) {
    prefix = key.charCodeAt(0)
    if (
      prefix === 0x24 || // $
      prefix === 0x5F    // _
    ) {
      continue
    }
    descriptor = Object.getOwnPropertyDescriptor(obj, key)
    // only process own non-accessor properties
    if (descriptor &amp;&amp; !descriptor.get) {
      val = obj[key]
      this.observe(key, val)
      this.convert(key, val)
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">p.walk = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj</span>) </span>{
  <span class="hljs-keyword">var</span> key, val, descriptor, prefix
  <span class="hljs-keyword">for</span> (key <span class="hljs-keyword">in</span> obj) {
    prefix = key.charCodeAt(<span class="hljs-number">0</span>)
    <span class="hljs-keyword">if</span> (
      prefix === <span class="hljs-number">0x24</span> || <span class="hljs-comment">// $</span>
      prefix === <span class="hljs-number">0x5F</span>    <span class="hljs-comment">// _</span>
    ) {
      <span class="hljs-keyword">continue</span>
    }
    descriptor = <span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(obj, key)
    <span class="hljs-comment">// only process own non-accessor properties</span>
    <span class="hljs-keyword">if</span> (descriptor &amp;&amp; !descriptor.get) {
      val = obj[key]
      <span class="hljs-keyword">this</span>.observe(key, val)
      <span class="hljs-keyword">this</span>.convert(key, val)
    }
  }
}</code></pre><p>&#x3000;&#x3000;&#x9996;&#x5148;&#x904D;&#x5386;<code>obj</code>&#x4E2D;&#x7684;&#x5404;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x4EE5;<code>$</code>&#x6216;&#x8005;<code>_</code>&#x5F00;&#x5934;&#x7684;&#x5C5E;&#x6027;&#x540D;&#xFF0C;&#x5219;&#x4E0D;&#x505A;&#x5904;&#x7406;&#x3002;&#x63A5;&#x7740;&#x83B7;&#x53D6;&#x8BE5;&#x5C5E;&#x6027;&#x7684;&#x63CF;&#x8FF0;&#x7B26;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728;<code>get</code>&#x51FD;&#x6570;&#xFF0C;&#x5219;&#x5BF9;&#x8BE5;&#x5C5E;&#x6027;&#x503C;&#x8C03;&#x7528;<code>observe</code>&#x51FD;&#x6570;&#xFF0C;&#x4F7F;&#x5F97;&#x6570;&#x636E;&#x54CD;&#x5E94;&#x5316;&#xFF0C;&#x7136;&#x540E;&#x8C03;&#x7528;<code>convert</code>&#x51FD;&#x6570;&#x5C06;&#x8BE5;&#x5C5E;&#x6027;&#x8F6C;&#x6362;&#x6210;&#x8BBF;&#x95EE;&#x5668;&#x5C5E;&#x6027;<code>getter/setter</code>&#x4F7F;&#x5F97;&#x5C5E;&#x6027;&#x88AB;&#x8BBF;&#x95EE;&#x6216;&#x8005;&#x88AB;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x80FD;&#x88AB;&#x591F;&#x76D1;&#x542C;&#x3002;<br>&#x3000;&#x3000;</p><h2 id="articleHeader5">&#x603B;&#x7ED3;</h2><p>&#x3000;&#x3000;&#x5230;&#x6B64;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x770B;&#x5B8C;&#x4E86;&#x6574;&#x4E2A;<code>Observer</code>&#x6A21;&#x5757;&#x7684;&#x6240;&#x6709;&#x4EE3;&#x7801;&#xFF0C;&#x5176;&#x5B9E;&#x57FA;&#x672C;&#x539F;&#x7406;&#x548C;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x8BBE;&#x60F3;&#x90FD;&#x662F;&#x5DEE;&#x4E0D;&#x591A;&#x7684;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;Vue&#x4EE3;&#x7801;&#x4E2D;&#x5404;&#x4E2A;&#x51FD;&#x6570;&#x5206;&#x89E3;&#x7C92;&#x5EA6;&#x975E;&#x5E38;&#x5C0F;&#xFF0C;&#x4F7F;&#x5F97;&#x4EE3;&#x7801;&#x903B;&#x8F91;&#x975E;&#x5E38;&#x6E05;&#x6670;&#x3002;&#x770B;&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x63A8;&#x8350;&#x4F60;&#x4E5F;clone&#x4E00;&#x4EFD;Vue&#x6E90;&#x7801;&#xFF0C;checkout&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x7248;&#x672C;&#x53F7;&#xFF0C;&#x81EA;&#x5DF1;&#x9605;&#x8BFB;&#x4E00;&#x904D;&#xFF0C;&#x8DD1;&#x8DD1;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#xFF0C;&#x6253;&#x4E2A;&#x65AD;&#x70B9;&#x8BD5;&#x7740;&#x8C03;&#x8BD5;&#x4E00;&#x4E0B;&#xFF0C;&#x5E94;&#x8BE5;&#x4F1A;&#x5BF9;&#x4F60;&#x7406;&#x89E3;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x6709;&#x6240;&#x5E2E;&#x52A9;&#x3002;</p><p>&#x3000;&#x3000;&#x6700;&#x540E;&#x5982;&#x679C;&#x5BF9;&#x8FD9;&#x4E2A;&#x7CFB;&#x5217;&#x7684;&#x6587;&#x7AE0;&#x611F;&#x5174;&#x8DA3;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x5173;&#x6CE8;&#x6211;&#x7684;<a href="https://github.com/MrErHu/blog" rel="nofollow noreferrer" target="_blank">Github&#x535A;&#x5BA2;</a>&#x7B97;&#x662F;&#x5BF9;&#x6211;&#x9F13;&#x52B1;&#xFF0C;&#x611F;&#x8C22;&#x5927;&#x5BB6;&#x7684;&#x652F;&#x6301;&#xFF01;<br>&#x3000;&#x3000;<br>&#x3000;&#x3000;<span class="img-wrap"><img data-src="/img/remote/1460000015440155" src="https://static.alili.tech/img/remote/1460000015440155" alt="" title="" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue响应式数据: Observer模块实现

## 原文链接
[https://segmentfault.com/a/1190000015440152](https://segmentfault.com/a/1190000015440152)

