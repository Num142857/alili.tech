---
title: '精读《Typescript2.0 - 2.9》' 
date: 2018-11-29 9:33:05
hidden: true
slug: pvjvde4vyd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1 &#x5F15;&#x8A00;</h2>
<p>&#x7CBE;&#x8BFB;&#x539F;&#x6587;&#x662F; typescript 2.0-2.9 &#x7684;&#x6587;&#x6863;:</p>
<p><a href="http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html" rel="nofollow noreferrer" target="_blank">2.0-2.8</a>&#xFF0C;<a href="https://blogs.msdn.microsoft.com/typescript/2018/05/16/announcing-typescript-2-9-rc/" rel="nofollow noreferrer" target="_blank">2.9 &#x8349;&#x6848;</a>.</p>
<p>&#x6211;&#x53D1;&#x73B0;&#xFF0C;&#x8BB8;&#x591A;&#x5199;&#x4E86;&#x4E00;&#x5E74;&#x4EE5;&#x4E0A; Typescript &#x5F00;&#x53D1;&#x8005;&#xFF0C;&#x5BF9; Typescript &#x5BF9;&#x7406;&#x89E3;&#x548C;&#x4F7F;&#x7528;&#x6C34;&#x5E73;&#x90FD;&#x505C;&#x7559;&#x5728;&#x5165;&#x95E8;&#x9636;&#x6BB5;&#x3002;&#x9020;&#x6210;&#x8FD9;&#x4E2A;&#x73B0;&#x8C61;&#x7684;&#x539F;&#x56E0;&#x662F;&#xFF0C;Typescript &#x77E5;&#x8BC6;&#x7684;&#x79EF;&#x7D2F;&#x9700;&#x8981; <strong>&#x523B;&#x610F;&#x7EC3;&#x4E60;</strong>&#xFF0C;&#x4F7F;&#x7528; Typescript &#x7684;&#x65F6;&#x95F4;&#x4E0E;&#x5BF9;&#x5B83;&#x7684;&#x4E86;&#x89E3;&#x7A0B;&#x5EA6;&#x51E0;&#x4E4E;&#x6CA1;&#x6709;&#x5173;&#x7CFB;&#x3002;</p>
<p>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x7CBE;&#x9009;&#x4E86; TS &#x5728; <code>2.0-2.9</code> &#x7248;&#x672C;&#x4E2D;&#x6700;&#x91CD;&#x8981;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5E76;&#x914D;&#x5408;&#x5B9E;&#x9645;&#x6848;&#x4F8B;&#x89E3;&#x8BFB;&#xFF0C;&#x5E2E;&#x52A9;&#x4F60;&#x5FEB;&#x901F;&#x8DDF;&#x4E0A; TS &#x7684;&#x66F4;&#x65B0;&#x8282;&#x594F;&#x3002;</p>
<p>&#x5BF9;&#x4E8E; TS &#x5185;&#x90E8;&#x4F18;&#x5316;&#x7684;&#x7528;&#x6237;&#x65E0;&#x611F;&#x90E8;&#x5206;&#x5E76;&#x4E0D;&#x4F1A;&#x7F57;&#x5217;&#x51FA;&#x6765;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E9B;&#x4F18;&#x5316;&#x90FD;&#x53EF;&#x5728;&#x65E5;&#x5E38;&#x4F7F;&#x7528;&#x8FC7;&#x7A0B;&#x4E2D;&#x611F;&#x53D7;&#x5230;&#x3002;</p>
<h2 id="articleHeader1">2 &#x7CBE;&#x8BFB;</h2>
<p>&#x7531;&#x4E8E; Typescript &#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#x7684;&#x8BB8;&#x591A;&#x8868;&#x73B0;&#x90FD;&#x4E0E;&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0D;&#x540C;&#xFF0C;&#x4E3A;&#x4E86;&#x907F;&#x514D;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x8BB0;&#x5FC6;&#xFF0C;&#x5EFA;&#x8BAE;&#x53EA;&#x8BB0;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x5C31;&#x597D;&#x4E86;&#xFF01;</p>
<h3 id="articleHeader2">&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x5BFC;&#x81F4;&#x7684;&#x5927;&#x91CF;&#x8FB9;&#x754C;&#x68C0;&#x6D4B;&#x4EE3;&#x7801;&#xFF0C;&#x5DF2;&#x7ECF;&#x6709;&#x89E3;&#x4E86;</h3>
<p>&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#x7684;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x662F; <code>undefined</code>&#xFF0C;&#x4E0D;&#x4F46;&#x5C5E;&#x6027;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#xFF0C;js &#x8FD8;&#x4F1A;&#x629B;&#x51FA;&#x5F02;&#x5E38;&#xFF0C;&#x8FD9;&#x51E0;&#x4E4E;&#x662F;&#x4E1A;&#x52A1;&#x5F00;&#x53D1;&#x4E2D;&#x6700;&#x9AD8;&#x9891;&#x7684;&#x62A5;&#x9519;&#x4E86;&#xFF08;&#x5F80;&#x5F80;&#x662F;&#x540E;&#x7AEF;&#x6570;&#x636E;&#x5F02;&#x5E38;&#x5BFC;&#x81F4;&#x7684;&#xFF09;&#xFF0C;&#x800C; typescript &#x7684; <code>strict</code> &#x6A21;&#x5F0F;&#x4F1A;&#x68C0;&#x67E5;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x4E0D;&#x5141;&#x8BB8;&#x4E0D;&#x5B89;&#x5168;&#x7684;&#x4EE3;&#x7801;&#x51FA;&#x73B0;&#x3002;</p>
<p>&#x5728; <code>2.0</code> &#x7248;&#x672C;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86; &#x201C;&#x975E;&#x7A7A;&#x65AD;&#x8A00;&#x6807;&#x5FD7;&#x7B26;&#x201D; <code>!.</code> &#x89E3;&#x51B3;&#x660E;&#x786E;&#x4E0D;&#x4F1A;&#x62A5;&#x9519;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x6BD4;&#x5982;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x662F;&#x9759;&#x6001;&#x7684;&#xFF0C;&#x90A3;&#x80AF;&#x5B9A;&#x4E0D;&#x4F1A;&#x629B;&#x51FA;&#x5F02;&#x5E38;&#xFF0C;&#x4F46;&#x5728; <code>2.0</code> &#x4E4B;&#x524D;&#x7684;&#x7248;&#x672C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x8981;&#x8FD9;&#x4E48;&#x8C03;&#x7528;&#x5BF9;&#x8C61;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const config = {
  port: 8000
};

if (config) {
  console.log(config.port);
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> config = {
  port: <span class="hljs-number">8000</span>
};

<span class="hljs-keyword">if</span> (config) {
  <span class="hljs-built_in">console</span>.log(config.port);
}</code></pre>
<p>&#x6709;&#x4E86; <code>2.0</code> &#x63D0;&#x4F9B;&#x7684; &#x201C;&#x975E;&#x7A7A;&#x65AD;&#x8A00;&#x6807;&#x5FD7;&#x7B26;&#x201D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x5199;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(config!.port);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(config!.port);</code></pre>
<p>&#x5728; <code>2.8</code> &#x7248;&#x672C;&#xFF0C;ts &#x652F;&#x6301;&#x4E86;&#x6761;&#x4EF6;&#x7C7B;&#x578B;&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type TypeName&lt;T&gt; = T extends string ? &quot;string&quot;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">type</span> TypeName&lt;T&gt; = T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span> ? <span class="hljs-string">&quot;string&quot;</span></code></pre>
<p>&#x5F53; T &#x7684;&#x7C7B;&#x578B;&#x662F; string &#x65F6;&#xFF0C;TypeName &#x7684;&#x8868;&#x8FBE;&#x5F0F;&#x7C7B;&#x578B;&#x4E3A; &quot;string&quot;&#x3002;</p>
<p>&#x8FD9;&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x6784;&#x9020;&#x4E00;&#x4E2A;&#x81EA;&#x52A8; &#x201C;&#x975E;&#x7A7A;&#x65AD;&#x8A00;&#x201D; &#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x628A;&#x4EE3;&#x7801;&#x7B80;&#x5316;&#x4E3A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(config.port);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(config.port);</code></pre>
<p>&#x524D;&#x63D0;&#x662F;&#x6846;&#x67B6;&#x5148;&#x628A; <code>config</code> &#x6307;&#x5B9A;&#x4E3A;&#x8FD9;&#x4E2A;&#x7279;&#x6B8A;&#x7C7B;&#x578B;&#xFF0C;&#x8FD9;&#x4E2A;&#x7279;&#x6B8A;&#x7C7B;&#x578B;&#x7684;&#x5B9A;&#x4E49;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export type PowerPartial&lt;T&gt; = {
  [U in keyof T]?: T[U] extends object ? PowerPartial&lt;T[U]&gt; : T[U]
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> PowerPartial&lt;T&gt; = {
  [U <span class="hljs-keyword">in</span> keyof T]?: T[U] <span class="hljs-keyword">extends</span> object ? PowerPartial&lt;T[U]&gt; : T[U]
};</code></pre>
<p>&#x4E5F;&#x5C31;&#x662F; <code>2.8</code> &#x7684;&#x6761;&#x4EF6;&#x7C7B;&#x578B;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x5728;&#x7C7B;&#x578B;&#x5224;&#x65AD;&#x8FDB;&#x884C;&#x9012;&#x5F52;&#xFF0C;&#x628A;&#x6240;&#x6709;&#x5BF9;&#x8C61;&#x7684; key &#x90FD;&#x5305;&#x4E00;&#x5C42; &#x201C;&#x975E;&#x7A7A;&#x65AD;&#x8A00;&#x201D;&#xFF01;</p>
<blockquote>&#x6B64;&#x5904;&#x7075;&#x611F;&#x6765;&#x81EA; <a href="https://github.com/whxaxes/blog/issues/12" rel="nofollow noreferrer" target="_blank">egg-ts &#x603B;&#x7ED3;</a>
</blockquote>
<h3 id="articleHeader3">&#x589E;&#x52A0;&#x4E86; <code>never</code> <code>object</code> &#x7C7B;&#x578B;</h3>
<p>&#x5F53;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x65E0;&#x6CD5;&#x6267;&#x884C;&#x5B8C;&#xFF0C;&#x6216;&#x8005;&#x7406;&#x89E3;&#x4E3A;&#x4E2D;&#x9014;&#x4E2D;&#x65AD;&#x65F6;&#xFF0C;TS <code>2.0</code> &#x8BA4;&#x4E3A;&#x5B83;&#x662F; <code>never</code> &#x7C7B;&#x578B;&#x3002;</p>
<p>&#x6BD4;&#x5982; <code>throw Error</code> &#x6216;&#x8005; <code>while(true)</code> &#x90FD;&#x4F1A;&#x5BFC;&#x81F4;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x503C;&#x7C7B;&#x578B;&#x65F6; <code>never</code>&#x3002;</p>
<p>&#x548C; <code>null</code> <code>undefined</code> &#x7279;&#x6027;&#x4E00;&#x6837;&#xFF0C;<code>never</code> &#x7B49;&#x4E8E;&#x662F;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x503C;&#x4E2D;&#x7684; <code>null</code> &#x6216; <code>undefined</code>&#x3002;<strong>&#x5B83;&#x4EEC;&#x90FD;&#x662F;&#x5B50;&#x7C7B;&#x578B;</strong>&#xFF0C;&#x6BD4;&#x5982;&#x7C7B;&#x578B; <code>number</code> &#x81EA;&#x5E26;&#x4E86; <code>null</code> &#x4E0E; <code>undefined</code> &#x8FD9;&#x4E24;&#x4E2A;&#x5B50;&#x7C7B;&#x578B;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x4EFB;&#x4F55;&#x6709;&#x7C7B;&#x578B;&#x7684;&#x503C;&#x90FD;&#x6709;&#x53EF;&#x80FD;&#x662F;&#x7A7A;&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x6267;&#x884C;&#x671F;&#x95F4;&#x53EF;&#x80FD;&#x6CA1;&#x6709;&#x503C;&#xFF09;&#x3002;</p>
<p>&#x8FD9;&#x91CC;&#x6D89;&#x53CA;&#x5230;&#x5F88;&#x91CD;&#x8981;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x5C31;&#x662F;&#x9884;&#x5B9A;&#x4E49;&#x4E86;&#x7C7B;&#x578B;&#x4E0D;&#x4EE3;&#x8868;&#x7C7B;&#x578B;&#x4E00;&#x5B9A;&#x5982;&#x9884;&#x671F;&#xFF0C;&#x5C31;&#x597D;&#x6BD4;&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x65F6;&#x53EF;&#x80FD;&#x56E0;&#x4E3A; <code>throw Error</code> &#x800C;&#x4E2D;&#x65AD;&#x3002;&#x6240;&#x4EE5; ts &#x4E3A;&#x4E86;&#x5904;&#x7406;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;<strong>&#x5C06; <code>null</code> <code>undefined</code> &#x8BBE;&#x5B9A;&#x4E3A;&#x4E86;&#x6240;&#x6709;&#x7C7B;&#x578B;&#x7684;&#x5B50;&#x7C7B;&#x578B;</strong>&#xFF0C;&#x800C;&#x4ECE; <code>2.0</code> &#x5F00;&#x59CB;&#xFF0C;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x7C7B;&#x578B;&#x53C8;&#x591A;&#x4E86;&#x4E00;&#x79CD;&#x5B50;&#x7C7B;&#x578B; <code>never</code>&#x3002;</p>
<p>TS <code>2.2</code> &#x652F;&#x6301;&#x4E86; <code>object</code> &#x7C7B;&#x578B;&#xFF0C; &#x4F46;&#x8BB8;&#x591A;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x603B;&#x628A; <code>object</code> &#x4E0E; <code>any</code> &#x7C7B;&#x578B;&#x5F04;&#x6DF7;&#x6DC6;&#xFF0C;&#x6BD4;&#x5982;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const persion: object = {
  age: 5
};
console.log(persion.age); // Error: Property &apos;age&apos; does not exist on type &apos;object&apos;." title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> persion: object = {
  age: <span class="hljs-number">5</span>
};
<span class="hljs-built_in">console</span>.log(persion.age); <span class="hljs-comment">// Error: Property &apos;age&apos; does not exist on type &apos;object&apos;.</span></code></pre>
<p>&#x8FD9;&#x65F6;&#x5019;&#x62A5;&#x9519;&#x4F1A;&#x51FA;&#x73B0;&#xFF0C;&#x6709;&#x65F6;&#x5019;&#x95ED;&#x4E2A;&#x773C;&#x6539;&#x6210; <code>any</code> &#x5C31;&#x5B8C;&#x4E8B;&#x4E86;&#x3002;&#x5176;&#x5B9E;&#x8FD9;&#x65F6;&#x5019;&#x53EA;&#x8981;&#x628A; <code>object</code> &#x5220;&#x6389;&#xFF0C;&#x6362;&#x6210; TS &#x7684;&#x81EA;&#x52A8;&#x63A8;&#x5BFC;&#x5C31;&#x641E;&#x5B9A;&#x4E86;&#x3002;&#x90A3;&#x4E48;&#x95EE;&#x9898;&#x51FA;&#x5728;&#x54EA;&#x91CC;&#xFF1F;</p>
<p>&#x9996;&#x5148; <code>object</code> &#x4E0D;&#x662F;&#x8FD9;&#x4E48;&#x7528;&#x7684;&#xFF0C;&#x5B83;&#x662F; TS <code>2.3</code> &#x7248;&#x672C;&#x4E2D;&#x52A0;&#x5165;&#x7684;&#xFF0C;&#x7528;&#x6765;&#x63CF;&#x8FF0;&#x4E00;&#x79CD;&#x975E;&#x57FA;&#x7840;&#x7C7B;&#x578B;&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x822C;&#x7528;&#x5728;&#x7C7B;&#x578B;&#x6821;&#x9A8C;&#x4E0A;&#xFF0C;&#x6BD4;&#x5982;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x7C7B;&#x578B;&#x3002;&#x5982;&#x679C;&#x53C2;&#x6570;&#x7C7B;&#x578B;&#x662F; <code>object</code>&#xFF0C;&#x90A3;&#x4E48;&#x5141;&#x8BB8;&#x4EFB;&#x4F55;&#x5BF9;&#x8C61;&#x6570;&#x636E;&#x4F20;&#x5165;&#xFF0C;&#x4F46;&#x4E0D;&#x5141;&#x8BB8; <code>3</code> <code>&quot;abc&quot;</code> &#x8FD9;&#x79CD;&#x975E;&#x5BF9;&#x8C61;&#x7C7B;&#x578B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare function create(o: object | null): void;

create({ prop: 0 }); // &#x6B63;&#x786E;
create(null); // &#x6B63;&#x786E;

create(42); // &#x9519;&#x8BEF;
create(&quot;string&quot;); // &#x9519;&#x8BEF;
create(false); // &#x9519;&#x8BEF;
create(undefined); // &#x9519;&#x8BEF;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">declare</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>(<span class="hljs-params">o: object | <span class="hljs-literal">null</span></span>): <span class="hljs-title">void</span></span>;

create({ prop: <span class="hljs-number">0</span> }); <span class="hljs-comment">// &#x6B63;&#x786E;</span>
create(<span class="hljs-literal">null</span>); <span class="hljs-comment">// &#x6B63;&#x786E;</span>

create(<span class="hljs-number">42</span>); <span class="hljs-comment">// &#x9519;&#x8BEF;</span>
create(<span class="hljs-string">&quot;string&quot;</span>); <span class="hljs-comment">// &#x9519;&#x8BEF;</span>
create(<span class="hljs-literal">false</span>); <span class="hljs-comment">// &#x9519;&#x8BEF;</span>
create(<span class="hljs-literal">undefined</span>); <span class="hljs-comment">// &#x9519;&#x8BEF;</span></code></pre>
<p>&#x800C;&#x4E00;&#x5F00;&#x59CB; <code>const persion: object</code> &#x8FD9;&#x79CD;&#x7528;&#x6CD5;&#xFF0C;&#x662F;&#x5C06;&#x80FD;&#x7CBE;&#x786E;&#x63A8;&#x5BFC;&#x7684;&#x5BF9;&#x8C61;&#x7C7B;&#x578B;&#xFF0C;&#x6269;&#x5927;&#x5230;&#x4E86;&#x6574;&#x4F53;&#x7684;&#xFF0C;&#x6A21;&#x7CCA;&#x7684;&#x5BF9;&#x8C61;&#x7C7B;&#x578B;&#xFF0C;TS &#x81EA;&#x7136;&#x65E0;&#x6CD5;&#x63A8;&#x65AD;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x62E5;&#x6709;&#x54EA;&#x4E9B; <code>key</code>&#xFF0C;&#x56E0;&#x4E3A;&#x5BF9;&#x8C61;&#x7C7B;&#x578B;&#x4EC5;&#x8868;&#x793A;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7C7B;&#x578B;&#xFF0C;&#x5728;&#x5C06;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x6574;&#x4F53;&#x89C2;&#x5BDF;&#x65F6;&#x662F;&#x6210;&#x7ACB;&#x7684;&#xFF0C;&#x4F46;&#x662F; <code>object</code> &#x7C7B;&#x578B;&#x662F;&#x4E0D;&#x627F;&#x8BA4;&#x4EFB;&#x4F55;&#x5177;&#x4F53;&#x7684; <code>key</code> &#x7684;&#x3002;</p>
<h3 id="articleHeader4">&#x589E;&#x52A0;&#x4E86;&#x4FEE;&#x9970;&#x7C7B;&#x578B;</h3>
<p>TS &#x5728; <code>2.0</code> &#x7248;&#x672C;&#x652F;&#x6301;&#x4E86; <code>readonly</code> &#x4FEE;&#x9970;&#x7B26;&#xFF0C;&#x88AB;&#x5B83;&#x4FEE;&#x9970;&#x7684;&#x53D8;&#x91CF;&#x65E0;&#x6CD5;&#x88AB;&#x4FEE;&#x6539;&#x3002;</p>
<p>&#x5728; TS <code>2.8</code> &#x7248;&#x672C;&#xFF0C;&#x53C8;&#x589E;&#x52A0;&#x4E86; <code>-</code> &#x4E0E; <code>+</code> &#x4FEE;&#x9970;&#x4FEE;&#x9970;&#x7B26;&#xFF0C;&#x6709;&#x70B9;&#x50CF;&#x526F;&#x8BCD;&#x4F5C;&#x7528;&#x4E8E;&#x5F62;&#x5BB9;&#x8BCD;&#x3002;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;<code>readonly</code> &#x5C31;&#x662F; <code>+readonly</code>&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>-readonly</code> &#x79FB;&#x9664;&#x53EA;&#x8BFB;&#x7684;&#x7279;&#x6027;&#xFF1B;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>-?:</code> &#x7684;&#x65B9;&#x5F0F;&#x79FB;&#x9664;&#x53EF;&#x9009;&#x7C7B;&#x578B;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x5EF6;&#x4F38;&#x51FA;&#x4E00;&#x79CD;&#x65B0;&#x7C7B;&#x578B;&#xFF1A;<code>Required&lt;T&gt;</code>&#xFF0C;&#x5C06;&#x5BF9;&#x8C61;&#x6240;&#x6709;&#x53EF;&#x9009;&#x4FEE;&#x9970;&#x79FB;&#x9664;&#xFF0C;&#x81EA;&#x7136;&#x5C31;&#x6210;&#x4E3A;&#x4E86;&#x5FC5;&#x9009;&#x7C7B;&#x578B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type Required&lt;T&gt; = { [P in keyof T]-?: T[P] };" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">type</span> Required&lt;T&gt; = { [P <span class="hljs-keyword">in</span> keyof T]-?: T[P] };</code></pre>
<h3 id="articleHeader5">&#x53EF;&#x4EE5;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#x7684; this &#x7C7B;&#x578B;</h3>
<p>&#x4E5F;&#x662F; TS <code>2.0</code> &#x7248;&#x672C;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5B9A;&#x5236; <code>this</code> &#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x8FD9;&#x4E2A;&#x5728; <code>vue</code> &#x6846;&#x67B6;&#x4E2D;&#x5C24;&#x4E3A;&#x6709;&#x7528;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f(this: void) {
  // make sure `this` is unusable in this standalone function
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"><span class="hljs-keyword">this</span>: <span class="hljs-built_in">void</span></span>) </span>{
  <span class="hljs-comment">// make sure `this` is unusable in this standalone function</span>
}</code></pre>
<p><code>this</code> &#x7C7B;&#x578B;&#x662F;&#x4E00;&#x79CD;&#x5047;&#x53C2;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x5E76;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x51FD;&#x6570;&#x771F;&#x6B63;&#x53C2;&#x6570;&#x6570;&#x91CF;&#x4E0E;&#x4F4D;&#x7F6E;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x5B83;&#x5B9A;&#x4E49;&#x5728;&#x53C2;&#x6570;&#x4F4D;&#x7F6E;&#x4E0A;&#xFF0C;&#x800C;&#x4E14;&#x6C38;&#x8FDC;&#x4F1A;&#x63D2;&#x961F;&#x5728;&#x7B2C;&#x4E00;&#x4E2A;&#x3002;</p>
<h3 id="articleHeader6">&#x5F15;&#x7528;&#x3001;&#x5BFB;&#x5740;&#x652F;&#x6301;&#x901A;&#x914D;&#x7B26;&#x4E86;</h3>
<p>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#xFF0C;&#x5C31;&#x662F;&#x6A21;&#x5757;&#x540D;&#x53EF;&#x4EE5;&#x7528; <code>*</code> &#x8868;&#x793A;&#x4EFB;&#x4F55;&#x5355;&#x8BCD;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare module &quot;*!text&quot; {
  const content: string;
  export default content;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">declare</span> <span class="hljs-keyword">module</span> &quot;*!text&quot; {
  <span class="hljs-keyword">const</span> content: <span class="hljs-built_in">string</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> content;
}</code></pre>
<p>&#x5B83;&#x7684;&#x7C7B;&#x578B;&#x53EF;&#x4EE5;&#x8F90;&#x5C04;&#x5230;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import fileContent from &quot;./xyz.txt!text&quot;;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> fileContent <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./xyz.txt!text&quot;</span>;</code></pre>
<p>&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x5F88;&#x5F3A;&#x5927;&#x7684;&#x4E00;&#x4E2A;&#x70B9;&#x662F;&#x7528;&#x5728;&#x62D3;&#x5C55;&#x6A21;&#x5757;&#x4E0A;&#xFF0C;&#x56E0;&#x4E3A;&#x5305;&#x62EC; <code>tsconfig.json</code> &#x7684;&#x6A21;&#x5757;&#x67E5;&#x627E;&#x4E5F;&#x652F;&#x6301;&#x901A;&#x914D;&#x7B26;&#x4E86;&#xFF01;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#x4E00;&#x4E0B;&#x5C31;&#x61C2;&#xFF1A;</p>
<p>&#x6700;&#x8FD1;&#x6BD4;&#x8F83;&#x706B;&#x7684; <code>umi</code> &#x6846;&#x67B6;&#xFF0C;&#x5B83;&#x6709;&#x4E00;&#x4E2A; <code>locale</code> &#x63D2;&#x4EF6;&#xFF0C;&#x53EA;&#x8981;&#x5B89;&#x88C5;&#x4E86;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x4ECE; <code>umi/locale</code> &#x83B7;&#x53D6;&#x56FD;&#x9645;&#x5316;&#x5185;&#x5BB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { locale } from &quot;umi/locale&quot;;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { locale } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;umi/locale&quot;</span>;</code></pre>
<p>&#x5176;&#x5B9E;&#x5B83;&#x7684;&#x5B9E;&#x73B0;&#x662F;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x901A;&#x8FC7; <code>webpack.alias</code> &#x5C06;&#x5F15;&#x7528;&#x6307;&#x4E86;&#x8FC7;&#x53BB;&#x3002;&#x8FD9;&#x4E2A;&#x505A;&#x6CD5;&#x975E;&#x5E38;&#x68D2;&#xFF0C;&#x90A3;&#x4E48;&#x5982;&#x4F55;&#x4E3A;&#x5B83;&#x52A0;&#x4E0A;&#x7C7B;&#x578B;&#x652F;&#x6301;&#x5462;&#xFF1F;&#x53EA;&#x8981;&#x8FD9;&#x4E48;&#x914D;&#x7F6E; <code>tsconfig.json</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;compilerOptions&quot;: {
    &quot;paths&quot;: {
      &quot;umi/*&quot;: [&quot;umi&quot;, &quot;&lt;somePath&gt;&quot;]
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;compilerOptions&quot;</span>: {
    <span class="hljs-attr">&quot;paths&quot;</span>: {
      <span class="hljs-attr">&quot;umi/*&quot;</span>: [<span class="hljs-string">&quot;umi&quot;</span>, <span class="hljs-string">&quot;&lt;somePath&gt;&quot;</span>]
    }
  }
}</code></pre>
<p>&#x5C06;&#x6240;&#x6709; <code>umi/*</code> &#x7684;&#x7C7B;&#x578B;&#x90FD;&#x6307;&#x5411; <code>&lt;somePath&gt;</code>&#xFF0C;&#x90A3;&#x4E48; <code>umi/locale</code> &#x5C31;&#x4F1A;&#x6307;&#x5411; <code>&lt;somePath&gt;/locale.ts</code> &#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x63D2;&#x4EF6;&#x81EA;&#x52A8;&#x521B;&#x5EFA;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x4E5F;&#x6070;&#x597D;&#x53EB; <code>locale.ts</code>&#xFF0C;&#x90A3;&#x4E48;&#x7C7B;&#x578B;&#x5C31;&#x81EA;&#x52A8;&#x5BF9;&#x5E94;&#x4E0A;&#x4E86;&#x3002;</p>
<h3 id="articleHeader7">&#x8DF3;&#x8FC7;&#x4ED3;&#x5E93;&#x7C7B;&#x578B;&#x62A5;&#x9519;</h3>
<p>TS &#x5728; <code>2.x</code> &#x652F;&#x6301;&#x4E86;&#x8BB8;&#x591A;&#x65B0; <code>compileOptions</code>&#xFF0C;&#x4F46; <code>skipLibCheck</code> &#x5B9E;&#x5728;&#x662F;&#x592A;&#x8000;&#x773C;&#x4E86;&#xFF0C;&#x7B14;&#x8005;&#x5FC5;&#x987B;&#x5355;&#x72EC;&#x63D0;&#x51FA;&#x6765;&#x8BF4;&#x3002;</p>
<p><code>skipLibCheck</code> &#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x4E0D;&#x4F46;&#x53EF;&#x4EE5;&#x5FFD;&#x7565; npm &#x4E0D;&#x89C4;&#x8303;&#x5E26;&#x6765;&#x7684;&#x62A5;&#x9519;&#xFF0C;&#x8FD8;&#x80FD;&#x6700;&#x5927;&#x9650;&#x5EA6;&#x7684;&#x652F;&#x6301;&#x7C7B;&#x578B;&#x7CFB;&#x7EDF;&#xFF0C;&#x53EF;&#x8C13;&#x4E00;&#x4E3E;&#x4E24;&#x5F97;&#x3002;</p>
<p>&#x62FF;&#x67D0; UI &#x5E93;&#x4E3E;&#x4F8B;&#xFF0C;&#x67D0;&#x5929;&#x53D1;&#x5E03;&#x7684;&#x5C0F;&#x7248;&#x672C; <code>d.ts</code> &#x6587;&#x4EF6;&#x51FA;&#x73B0;&#x4E00;&#x4E2A;&#x6F0F;&#x6D1E;&#xFF0C;&#x5BFC;&#x81F4;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x6784;&#x5EFA;&#x5931;&#x8D25;&#xFF0C;&#x4F60;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x63D0; PR &#x50AC;&#x4FC3;&#x4F5C;&#x8005;&#x4FEE;&#x590D;&#x4E86;&#xFF01;<code>skipLibCheck</code> &#x53EF;&#x4EE5;&#x5FFD;&#x7565;&#x8FD9;&#x79CD;&#x62A5;&#x9519;&#xFF0C;&#x540C;&#x65F6;&#x8FD8;&#x80FD;&#x4FDD;&#x6301;&#x7C7B;&#x578B;&#x7684;&#x81EA;&#x52A8;&#x63A8;&#x5BFC;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x8FD9;&#x6BD4; <code>declare module &quot;ui-lib&quot;</code> &#x5C06;&#x7C7B;&#x578B;&#x8BBE;&#x7F6E;&#x4E3A; <code>any</code> &#x66F4;&#x5F3A;&#x5927;&#x3002;</p>
<h3 id="articleHeader8">&#x5BF9;&#x7C7B;&#x578B;&#x4FEE;&#x9970;&#x7684;&#x589E;&#x5F3A;</h3>
<p>TS <code>2.1</code> &#x7248;&#x672C;&#x53EF;&#x8C13;&#x662F;&#x9488;&#x5BF9;&#x7C7B;&#x578B;&#x64CD;&#x4F5C;&#x9769;&#x547D;&#x6027;&#x7684;&#x7248;&#x672C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>keyof</code> &#x62FF;&#x5230;&#x5BF9;&#x8C61; key &#x7684;&#x7C7B;&#x578B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface Person {
  name: string;
  age: number;
}

type K1 = keyof Person; // &quot;name&quot; | &quot;age&quot;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">interface</span> Person {
  name: <span class="hljs-built_in">string</span>;
  age: <span class="hljs-built_in">number</span>;
}

<span class="hljs-keyword">type</span> K1 = keyof Person; <span class="hljs-comment">// &quot;name&quot; | &quot;age&quot;</span></code></pre>
<p>&#x57FA;&#x4E8E; <code>keyof</code>&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x589E;&#x5F3A;&#x5BF9;&#x8C61;&#x7684;&#x7C7B;&#x578B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type NewObjType&lt;T&gt; = { [P in keyof T]: T[P] };" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">type</span> NewObjType&lt;T&gt; = { [P <span class="hljs-keyword">in</span> keyof T]: T[P] };</code></pre>
<p>Tips&#xFF1A;&#x5728; TS <code>2.8</code> &#x7248;&#x672C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4EE5;&#x8868;&#x8FBE;&#x5F0F;&#x4F5C;&#x4E3A; <code>keyof</code> &#x7684;&#x53C2;&#x6570;&#xFF0C;&#x6BD4;&#x5982; <code>keyof (A &amp; B)</code>&#x3002;<br>Tips&#xFF1A;&#x5728; TS <code>2.9</code> &#x7248;&#x672C;&#xFF0C;<code>keyof</code> &#x53EF;&#x80FD;&#x8FD4;&#x56DE;&#x975E; <code>string</code> &#x7C7B;&#x578B;&#x7684;&#x503C;&#xFF0C;&#x56E0;&#x6B64;&#x4ECE;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x4E0D;&#x8981;&#x8BA4;&#x4E3A; <code>keyof</code> &#x7684;&#x8FD4;&#x56DE;&#x7C7B;&#x578B;&#x4E00;&#x5B9A;&#x662F; <code>string</code>&#x3002;</p>
<p><code>NewObjType</code> &#x539F;&#x5C01;&#x4E0D;&#x52A8;&#x7684;&#x5C06;&#x5BF9;&#x8C61;&#x7C7B;&#x578B;&#x91CD;&#x65B0;&#x63CF;&#x8FF0;&#x4E86;&#x4E00;&#x904D;&#xFF0C;&#x8FD9;&#x770B;&#x4E0A;&#x53BB;&#x6CA1;&#x4EC0;&#x4E48;&#x610F;&#x4E49;&#x3002;&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x6211;&#x4EEC;&#x6709;&#x4E09;&#x5904;&#x62D3;&#x5C55;&#x7684;&#x5730;&#x65B9;&#xFF1A;</p>
<ul>
<li>&#x5DE6;&#x8FB9;&#xFF1A;&#x6BD4;&#x5982;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>readonly</code> &#x4FEE;&#x9970;&#xFF0C;&#x5C06;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x53D8;&#x6210;&#x53EA;&#x8BFB;&#x3002;</li>
<li>&#x4E2D;&#x95F4;&#xFF1A;&#x6BD4;&#x5982;&#x5C06; <code>:</code> &#x6539;&#x6210; <code>?:</code>&#xFF0C;&#x5C06;&#x5BF9;&#x8C61;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x53D8;&#x6210;&#x53EF;&#x9009;&#x3002;</li>
<li>&#x53F3;&#x8FB9;&#xFF1A;&#x6BD4;&#x5982;&#x5957;&#x4E00;&#x5C42; <code>Promise&lt;T[P]&gt;</code>&#xFF0C;&#x5C06;&#x5BF9;&#x8C61;&#x6BCF;&#x4E2A; <code>key</code> &#x7684; <code>value</code> &#x7C7B;&#x578B;&#x8986;&#x76D6;&#x3002;</li>
</ul>
<p>&#x57FA;&#x4E8E;&#x8FD9;&#x4E9B;&#x80FD;&#x529B;&#xFF0C;&#x6211;&#x4EEC;&#x62D3;&#x5C55;&#x51FA;&#x4E00;&#x7CFB;&#x5217;&#x4E0A;&#x5C42;&#x5F88;&#x6709;&#x7528;&#x7684; <code>interface</code>&#xFF1A;</p>
<ul>
<li>Readonly&lt;T&gt;&#x3002;&#x628A;&#x5BF9;&#x8C61; key &#x5168;&#x90E8;&#x8BBE;&#x7F6E;&#x4E3A;&#x53EA;&#x8BFB;&#xFF0C;&#x6216;&#x8005;&#x5229;&#x7528; <code>2.8</code> &#x7684;&#x6761;&#x4EF6;&#x7C7B;&#x578B;&#x8BED;&#x6CD5;&#xFF0C;&#x5B9E;&#x73B0;&#x9012;&#x5F52;&#x8BBE;&#x7F6E;&#x53EA;&#x8BFB;&#x3002;</li>
<li>Partial&lt;T&gt;&#x3002;&#x628A;&#x5BF9;&#x8C61;&#x7684; key &#x90FD;&#x8BBE;&#x7F6E;&#x4E3A;&#x53EF;&#x9009;&#x3002;</li>
<li>Pick&lt;T, K&gt;&#x3002;&#x4ECE;&#x5BF9;&#x8C61;&#x7C7B;&#x578B; T &#x6311;&#x9009;&#x4E00;&#x4E9B;&#x5C5E;&#x6027; K&#xFF0C;&#x6BD4;&#x5982;&#x5BF9;&#x8C61;&#x62E5;&#x6709; 10 &#x4E2A; key&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5C06; K &#x8BBE;&#x7F6E;&#x4E3A; <code>&quot;name&quot; | &quot;age&quot;</code> &#x5C31;&#x53EF;&#x4EE5;&#x751F;&#x6210;&#x4EC5;&#x652F;&#x6301;&#x8FD9;&#x4E24;&#x4E2A; key &#x7684;&#x65B0;&#x5BF9;&#x8C61;&#x7C7B;&#x578B;&#x3002;</li>
<li>Extract&lt;T, U&gt;&#x3002;&#x662F; Pick &#x7684;&#x5E95;&#x5C42; API&#xFF0C;&#x76F4;&#x5230; <code>2.8</code> &#x7248;&#x672C;&#x624D;&#x5185;&#x7F6E;&#x8FDB;&#x6765;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A; Pick &#x662F;&#x6311;&#x9009;&#x5BF9;&#x8C61;&#x7684;&#x67D0;&#x4E9B; key&#xFF0C;Extract &#x662F;&#x6311;&#x9009; key &#x4E2D;&#x7684; key&#x3002;</li>
<li>Record&lt;K, U&gt;&#x3002;&#x5C06;&#x5BF9;&#x8C61;&#x67D0;&#x4E9B;&#x5C5E;&#x6027;&#x8F6C;&#x6362;&#x6210;&#x53E6;&#x4E00;&#x4E2A;&#x7C7B;&#x578B;&#x3002;&#x6BD4;&#x8F83;&#x5E38;&#x89C1;&#x7528;&#x5728;&#x56DE;&#x8C03;&#x573A;&#x666F;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;&#x7C7B;&#x578B;&#x4F1A;&#x8986;&#x76D6;&#x5BF9;&#x8C61;&#x6BCF;&#x4E00;&#x4E2A; key &#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x6B64;&#x65F6;&#x7C7B;&#x578B;&#x7CFB;&#x7EDF;&#x9700;&#x8981; <code>Record</code> &#x63A5;&#x53E3;&#x624D;&#x80FD;&#x5B8C;&#x6210;&#x63A8;&#x5BFC;&#x3002;</li>
<li>Exclude&lt;T, U&gt;&#x3002;&#x5C06; T &#x4E2D;&#x7684; U &#x7C7B;&#x578B;&#x6392;&#x9664;&#xFF0C;&#x548C; Extract &#x529F;&#x80FD;&#x76F8;&#x53CD;&#x3002;</li>
<li>Omit&lt;T, K&gt;&#xFF08;&#x672A;&#x5185;&#x7F6E;&#xFF09;&#x3002;&#x4ECE;&#x5BF9;&#x8C61; T &#x4E2D;&#x6392;&#x9664; key &#x662F; K &#x7684;&#x5C5E;&#x6027;&#x3002;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x5185;&#x7F6E;&#x7C7B;&#x578B;&#x65B9;&#x4FBF;&#x63A8;&#x5BFC;&#x51FA;&#x6765;&#xFF1A;<code>type Omit&lt;T, K&gt; = Pick&lt;T, Exclude&lt;keyof T, K&gt;&gt;</code>
</li>
<li>NonNullable&lt;T&gt;&#x3002;&#x6392;&#x9664; <code>T</code> &#x7684; <code>null</code> &#x4E0E; <code>undefined</code> &#x7684;&#x53EF;&#x80FD;&#x6027;&#x3002;</li>
<li>ReturnType&lt;T&gt;&#x3002;&#x83B7;&#x53D6;&#x51FD;&#x6570; <code>T</code> &#x8FD4;&#x56DE;&#x503C;&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x8FD9;&#x4E2A;&#x7C7B;&#x578B;&#x610F;&#x4E49;&#x5F88;&#x5927;&#x3002;</li>
<li>InstanceType&lt;T&gt;&#x3002;&#x83B7;&#x53D6;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#x7684;&#x5B9E;&#x4F8B;&#x7C7B;&#x578B;&#x3002;</li>
</ul>
<blockquote>&#x4EE5;&#x4E0A;&#x7C7B;&#x578B;&#x90FD;&#x5185;&#x7F6E;&#x5728; lib.d.ts &#x4E2D;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x5C31;&#x53EF;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F; Typescript &#x7684; utils &#x5DE5;&#x5177;&#x5E93;&#x3002;</blockquote>
<p>&#x5355;&#x72EC;&#x62FF; <code>ReturnType</code> &#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x4F53;&#x73B0;&#x51FA;&#x5176;&#x91CD;&#x8981;&#x6027;&#xFF1A;</p>
<p>Redux &#x7684; Connect &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F; <code>mapStateToProps</code>&#xFF0C;&#x8FD9;&#x4E9B; Props &#x4F1A;&#x81EA;&#x52A8;&#x4E0E; React Props &#x805A;&#x5408;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5229;&#x7528; <code>ReturnType&lt;typeof currentMapStateToProps&gt;</code> &#x62FF;&#x5230;&#x5F53;&#x524D; Connect &#x6CE8;&#x5165;&#x7ED9; Props &#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x6253;&#x901A; Connect &#x4E0E; React &#x7EC4;&#x4EF6;&#x7684;&#x7C7B;&#x578B;&#x7CFB;&#x7EDF;&#x4E86;&#x3002;</p>
<h3 id="articleHeader9">&#x5BF9; Generators &#x548C; async/await &#x7684;&#x7C7B;&#x578B;&#x5B9A;&#x4E49;</h3>
<p>TS <code>2.3</code> &#x7248;&#x672C;&#x505A;&#x4E86;&#x8BB8;&#x591A;&#x5BF9; Generators &#x7684;&#x589E;&#x5F3A;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x6211;&#x4EEC;&#x65E9;&#x5DF2;&#x7528; async/await &#x66FF;&#x4EE3;&#x4E86;&#x5B83;&#xFF0C;&#x6240;&#x4EE5; TS &#x5BF9; Generators &#x7684;&#x589E;&#x5F3A;&#x53EF;&#x4EE5;&#x5FFD;&#x7565;&#x3002;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x4E00;&#x5757;&#x662F;&#x5BF9; <code>for..of</code> &#x8BED;&#x6CD5;&#x7684;&#x5F02;&#x6B65;&#x8FED;&#x4EE3;&#x652F;&#x6301;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
  for await (const x of fn1()) {
    console.log(x);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span> <span class="hljs-keyword">await</span> (<span class="hljs-keyword">const</span> x of fn1()) {
    <span class="hljs-built_in">console</span>.log(x);
  }
}</code></pre>
<p>&#x8FD9;&#x53EF;&#x4EE5;&#x5BF9;&#x6BCF;&#x4E00;&#x6B65;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x8FED;&#x4EE3;&#x3002;&#x6CE8;&#x610F;&#x5BF9;&#x6BD4;&#x4E0B;&#x9762;&#x7684;&#x5199;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function f() {
  for (const x of await fn2()) {
    console.log(x);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> x of <span class="hljs-keyword">await</span> fn2()) {
    <span class="hljs-built_in">console</span>.log(x);
  }
}</code></pre>
<p>&#x5BF9;&#x4E8E; <code>fn1</code>&#xFF0C;&#x5B83;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x53EF;&#x8FED;&#x4EE3;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x4E14;&#x6BCF;&#x4E2A; item &#x7C7B;&#x578B;&#x90FD;&#x662F; Promise &#x6216;&#x8005; Generator&#x3002;&#x5BF9;&#x4E8E; <code>fn2</code>&#xFF0C;&#x5B83;&#x81EA;&#x8EAB;&#x662F;&#x4E2A;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x53EF;&#x8FED;&#x4EE3;&#x7684;&#xFF0C;&#x800C;&#x4E14;&#x6BCF;&#x4E2A; item &#x90FD;&#x4E0D;&#x662F;&#x5F02;&#x6B65;&#x7684;&#x3002;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn1() {
  return [Promise.resolve(1), Promise.resolve(2)];
}

function fn2() {
  return [1, 2];
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>), <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">2</span>)];
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>];
}</code></pre>
<p>&#x5728;&#x8FD9;&#x91CC;&#x987A;&#x5E26;&#x4E00;&#x63D0;&#xFF0C;&#x5BF9; <code>Array.map</code> &#x7684;&#x6BCF;&#x4E00;&#x9879;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x7B49;&#x5F85;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="await Promise.all(
  arr.map(async item =&gt; {
    return await item.run();
  })
);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all(
  arr.map(<span class="hljs-keyword">async</span> item =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> item.run();
  })
);</code></pre>
<p>&#x5982;&#x679C;&#x4E3A;&#x4E86;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF0C;&#x53EF;&#x4EE5;&#x6362;&#x6210; <code>for..of</code> &#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x56E0;&#x4E3A;&#x6570;&#x7EC4;&#x7C7B;&#x578B;&#x662F;&#x4E00;&#x79CD;&#x53EF;&#x8FED;&#x4EE3;&#x7C7B;&#x578B;&#x3002;</p>
<h3 id="articleHeader10">&#x6CDB;&#x578B;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;</h3>
<p>&#x4E86;&#x89E3;&#x8FD9;&#x4E2A;&#x4E4B;&#x524D;&#xFF0C;&#x5148;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B; TS <code>2.0</code> &#x4E4B;&#x524D;&#x5C31;&#x652F;&#x6301;&#x7684;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#x91CD;&#x8F7D;&#x3002;</p>
<p>&#x9996;&#x5148; JS &#x662F;&#x4E0D;&#x652F;&#x6301;&#x65B9;&#x6CD5;&#x91CD;&#x8F7D;&#x7684;&#xFF0C;Java &#x662F;&#x652F;&#x6301;&#x7684;&#xFF0C;&#x800C; TS &#x7C7B;&#x578B;&#x7CFB;&#x7EDF;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x5728;&#x5BF9;&#x6807; Java&#xFF0C;&#x5F53;&#x7136;&#x8981;&#x652F;&#x6301;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x3002;&#x597D;&#x5728; JS &#x6709;&#x4E00;&#x4E9B;&#x504F;&#x65B9;&#x5B9E;&#x73B0;&#x4F2A;&#x65B9;&#x6CD5;&#x91CD;&#x8F7D;&#xFF0C;&#x5178;&#x578B;&#x7684;&#x662F; redux &#x7684; <code>createStore</code>&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === &quot;function&quot; &amp;&amp; typeof enhancer === &quot;undefined&quot;) {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createStore</span>(<span class="hljs-params">reducer, preloadedState, enhancer</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> preloadedState === <span class="hljs-string">&quot;function&quot;</span> &amp;&amp; <span class="hljs-keyword">typeof</span> enhancer === <span class="hljs-string">&quot;undefined&quot;</span>) {
    enhancer = preloadedState;
    preloadedState = <span class="hljs-literal">undefined</span>;
  }
}</code></pre>
<p>&#x65E2;&#x7136; JS &#x6709;&#x529E;&#x6CD5;&#x652F;&#x6301;&#x65B9;&#x6CD5;&#x91CD;&#x8F7D;&#xFF0C;&#x90A3; TS &#x8865;&#x5145;&#x4E86;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#x91CD;&#x8F7D;&#xFF0C;&#x4E24;&#x8005;&#x7ED3;&#x5408;&#x5C31;&#x7B49;&#x4E8E; Java &#x65B9;&#x6CD5;&#x91CD;&#x8F7D;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare function createStore(
  reducer: Reducer,
  preloadedState: PreloadedState,
  enhancer: Enhancer
);
declare function createStore(reducer: Reducer, enhancer: Enhancer);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">declare</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createStore</span>(<span class="hljs-params">
  reducer: Reducer,
  preloadedState: PreloadedState,
  enhancer: Enhancer
</span>)</span>;
<span class="hljs-keyword">declare</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createStore</span>(<span class="hljs-params">reducer: Reducer, enhancer: Enhancer</span>)</span>;</code></pre>
<p>&#x53EF;&#x4EE5;&#x6E05;&#x6670;&#x7684;&#x770B;&#x5230;&#xFF0C;<code>createStore</code> &#x60F3;&#x8868;&#x73B0;&#x7684;&#x662F;&#x5BF9;&#x53C2;&#x6570;&#x4E2A;&#x6570;&#x7684;&#x91CD;&#x8F7D;&#xFF0C;&#x5982;&#x679C;&#x5B9A;&#x4E49;&#x4E86;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#x91CD;&#x8F7D;&#xFF0C;TS &#x4F1A;&#x6839;&#x636E;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#x81EA;&#x52A8;&#x5224;&#x65AD;&#x5BF9;&#x5E94;&#x7684;&#x662F;&#x54EA;&#x4E2A;&#x5B9A;&#x4E49;&#x3002;</p>
<p>&#x800C;&#x5728; TS <code>2.3</code> &#x7248;&#x672C;&#x652F;&#x6301;&#x4E86;&#x6CDB;&#x578B;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#xFF0C;<strong>&#x53EF;&#x4EE5;&#x67D0;&#x4E9B;&#x573A;&#x666F;&#x51CF;&#x5C11;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#x91CD;&#x8F7D;&#x7684;&#x4EE3;&#x7801;&#x91CF;</strong>&#xFF0C;&#x6BD4;&#x5982;&#x5BF9;&#x4E8E;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare function create(): Container&lt;HTMLDivElement, HTMLDivElement[]&gt;;
declare function create&lt;T extends HTMLElement&gt;(element: T): Container&lt;T, T[]&gt;;
declare function create&lt;T extends HTMLElement, U extends HTMLElement&gt;(
  element: T,
  children: U[]
): Container&lt;T, U[]&gt;;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">declare</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>(<span class="hljs-params"></span>): <span class="hljs-title">Container</span>&lt;<span class="hljs-title">HTMLDivElement</span>, <span class="hljs-title">HTMLDivElement</span>[]&gt;</span>;
<span class="hljs-keyword">declare</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>&lt;<span class="hljs-title">T</span> <span class="hljs-title">extends</span> <span class="hljs-title">HTMLElement</span>&gt;(<span class="hljs-params">element: T</span>): <span class="hljs-title">Container</span>&lt;<span class="hljs-title">T</span>, <span class="hljs-title">T</span>[]&gt;</span>;
<span class="hljs-keyword">declare</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>&lt;<span class="hljs-title">T</span> <span class="hljs-title">extends</span> <span class="hljs-title">HTMLElement</span>, <span class="hljs-title">U</span> <span class="hljs-title">extends</span> <span class="hljs-title">HTMLElement</span>&gt;(<span class="hljs-params">
  element: T,
  children: U[]
</span>): <span class="hljs-title">Container</span>&lt;<span class="hljs-title">T</span>, <span class="hljs-title">U</span>[]&gt;</span>;</code></pre>
<p>&#x901A;&#x8FC7;&#x679A;&#x4E3E;&#x8868;&#x8FBE;&#x4E86;&#x8303;&#x578B;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x4EE5;&#x53CA; U &#x4E0E; T &#x4E4B;&#x95F4;&#x53EF;&#x80FD;&#x5B58;&#x5728;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x8FD9;&#x4E9B;&#x90FD;&#x53EF;&#x4EE5;&#x7528;&#x6CDB;&#x578B;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x89E3;&#x51B3;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="declare function create&lt;T extends HTMLElement = HTMLDivElement, U = T[]&gt;(
  element?: T,
  children?: U
): Container&lt;T, U&gt;;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">declare</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span>&lt;<span class="hljs-title">T</span> <span class="hljs-title">extends</span> <span class="hljs-title">HTMLElement</span> = <span class="hljs-title">HTMLDivElement</span>, <span class="hljs-title">U</span> = <span class="hljs-title">T</span>[]&gt;(<span class="hljs-params">
  element?: T,
  children?: U
</span>): <span class="hljs-title">Container</span>&lt;<span class="hljs-title">T</span>, <span class="hljs-title">U</span>&gt;</span>;</code></pre>
<p>&#x5C24;&#x5176;&#x5728; React &#x4F7F;&#x7528;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x7528;&#x6CDB;&#x578B;&#x9ED8;&#x8BA4;&#x503C;&#x5B9A;&#x4E49;&#x4E86; <code>Component</code>&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".. Component&lt;Props = {}, State = {}&gt; .." title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;">.. Component&lt;Props = {}, State = {}&gt; ..</code></pre>
<p>&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4EE5;&#x4E0B;&#x7B49;&#x4EF7;&#x7684;&#x6548;&#x679C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Component extends React.PureComponent&lt;any, any&gt; {
  //...
}
// &#x7B49;&#x4EF7;&#x4E8E;
class Component extends React.PureComponent {
  //...
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">class</span> Component <span class="hljs-keyword">extends</span> React.PureComponent&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt; {
  <span class="hljs-comment">//...</span>
}
<span class="hljs-comment">// &#x7B49;&#x4EF7;&#x4E8E;</span>
<span class="hljs-keyword">class</span> Component <span class="hljs-keyword">extends</span> React.PureComponent {
  <span class="hljs-comment">//...</span>
}</code></pre>
<h3 id="articleHeader11">&#x52A8;&#x6001; Import</h3>
<p>TS &#x4ECE; <code>2.4</code> &#x7248;&#x672C;&#x5F00;&#x59CB;&#x652F;&#x6301;&#x4E86;&#x52A8;&#x6001; Import&#xFF0C;&#x540C;&#x65F6; Webpack4.0 &#x4E5F;&#x652F;&#x6301;&#x4E86;&#x8FD9;&#x4E2A;&#x8BED;&#x6CD5;&#xFF08;&#x5728; <a href="https://github.com/dt-fe/weekly/blob/master/47.%E7%B2%BE%E8%AF%BB%E3%80%8Awebpack4.0%20%E5%8D%87%E7%BA%A7%E6%8C%87%E5%8D%97%E3%80%8B.md" rel="nofollow noreferrer" target="_blank">&#x7CBE;&#x8BFB;&#x300A;webpack4.0%20 &#x5347;&#x7EA7;&#x6307;&#x5357;&#x300B;</a> &#x6709;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#xFF09;&#xFF0C;&#x8FD9;&#x4E2A;&#x8BED;&#x6CD5;&#x5C31;&#x6B63;&#x5F0F;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const zipUtil = await import(&quot;./utils/create-zip-file&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> zipUtil = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./utils/create-zip-file&quot;</span>);</code></pre>
<blockquote>&#x51C6;&#x786E;&#x7684;&#x8BF4;&#xFF0C;&#x52A8;&#x6001; Import &#x5B9E;&#x73B0;&#x4E8E; webpack 2.1.0-beta.28&#xFF0C;&#x6700;&#x7EC8;&#x5728; TS <code>2.4</code> &#x7248;&#x672C;&#x83B7;&#x5F97;&#x4E86;&#x8BED;&#x6CD5;&#x652F;&#x6301;&#x3002;</blockquote>
<p>&#x5728; TS <code>2.9</code> &#x7248;&#x672C;&#x5F00;&#x59CB;&#xFF0C;&#x652F;&#x6301;&#x4E86; <code>import()</code> &#x7C7B;&#x578B;&#x5B9A;&#x4E49;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const zipUtil: typeof import(&apos;./utils/create-zip-file&apos;) = await import(&apos;./utils/create-zip-file&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> zipUtil: <span class="hljs-keyword">typeof</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./utils/create-zip-file&apos;</span>) = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./utils/create-zip-file&apos;</span>)</code></pre>
<p>&#x4E5F;&#x5C31;&#x662F; <code>typeof</code> &#x53EF;&#x4EE5;&#x4F5C;&#x7528;&#x4E8E; <code>import()</code> &#x8BED;&#x6CD5;&#xFF0C;&#x800C;&#x4E0D;&#x771F;&#x6B63;&#x5F15;&#x5165; js &#x5185;&#x5BB9;&#x3002;&#x4E0D;&#x8FC7;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x8FD9;&#x4E2A; <code>import(&apos;./utils/create-zip-file&apos;)</code> &#x8DEF;&#x5F84;&#x9700;&#x8981;&#x53EF;&#x88AB;&#x63A8;&#x5BFC;&#xFF0C;&#x6BD4;&#x5982;&#x8981;&#x5B58;&#x5728;&#x8FD9;&#x4E2A; npm &#x6A21;&#x5757;&#x3001;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#x3001;&#x6216;&#x8005;&#x5728; <code>tsconfig.json</code> &#x5B9A;&#x4E49;&#x4E86; <code>paths</code>&#x3002;</p>
<p>&#x597D;&#x5728; <code>import</code> &#x8BED;&#x6CD5;&#x672C;&#x8EAB;&#x9650;&#x5236;&#x4E86;&#x8DEF;&#x5F84;&#x5FC5;&#x987B;&#x662F;&#x5B57;&#x9762;&#x91CF;&#xFF0C;&#x4F7F;&#x5F97;&#x81EA;&#x52A8;&#x63A8;&#x5BFC;&#x7684;&#x6210;&#x529F;&#x7387;&#x975E;&#x5E38;&#x9AD8;&#xFF0C;&#x53EA;&#x8981;&#x662F;&#x6B63;&#x786E;&#x7684;&#x4EE3;&#x7801;&#x51E0;&#x4E4E;&#x4E00;&#x5B9A;&#x53EF;&#x4EE5;&#x63A8;&#x5BFC;&#x51FA;&#x6765;&#x3002;&#x597D;&#x5427;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E5F;&#x4ECE;&#x53E6;&#x4E00;&#x4E2A;&#x89D2;&#x5EA6;&#x63A8;&#x8350;&#x5927;&#x5BB6;&#x653E;&#x5F03; <code>require</code>&#x3002;</p>
<h3 id="articleHeader12">Enum &#x7C7B;&#x578B;&#x652F;&#x6301;&#x5B57;&#x7B26;&#x4E32;</h3>
<p>&#x4ECE; Typescript <code>2.4</code> &#x5F00;&#x59CB;&#xFF0C;&#x652F;&#x6301;&#x4E86;&#x679A;&#x4E3E;&#x7C7B;&#x578B;&#x4F7F;&#x7528;&#x5B57;&#x7B26;&#x4E32;&#x505A;&#x4E3A; value&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum Colors {
  Red = &quot;RED&quot;,
  Green = &quot;GREEN&quot;,
  Blue = &quot;BLUE&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">enum</span> Colors {
  Red = <span class="hljs-string">&quot;RED&quot;</span>,
  Green = <span class="hljs-string">&quot;GREEN&quot;</span>,
  Blue = <span class="hljs-string">&quot;BLUE&quot;</span>
}</code></pre>
<p>&#x7B14;&#x8005;&#x5728;&#x8FD9;&#x63D0;&#x9192;&#x4E00;&#x53E5;&#xFF0C;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#x5728;&#x7EAF;&#x524D;&#x7AEF;&#x4EE3;&#x7801;&#x5185;&#x53EF;&#x80FD;&#x6CA1;&#x6709;&#x7528;&#x3002;&#x56E0;&#x4E3A;&#x5728; TS &#x4E2D;&#x6240;&#x6709; <code>enum</code> &#x7684;&#x5730;&#x65B9;&#x90FD;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528; <code>enum</code> &#x63A5;&#x6536;&#xFF0C;&#x4E0B;&#x9762;&#x7ED9;&#x51FA;&#x4F8B;&#x5B50;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6B63;&#x786E;
{
  type: monaco.languages.types.Folder;
}
// &#x9519;&#x8BEF;
{
  type: 75;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// &#x6B63;&#x786E;</span>
{
  <span class="hljs-keyword">type</span>: monaco.languages.types.Folder;
}
<span class="hljs-comment">// &#x9519;&#x8BEF;</span>
{
  <span class="hljs-keyword">type</span>: <span class="hljs-number">75</span>;
}</code></pre>
<p>&#x4E0D;&#x4EC5;&#x662F;&#x53EF;&#x8BFB;&#x6027;&#xFF0C;<code>enum</code> &#x5BF9;&#x5E94;&#x7684;&#x6570;&#x5B57;&#x53EF;&#x80FD;&#x4F1A;&#x6539;&#x53D8;&#xFF0C;&#x76F4;&#x63A5;&#x5199; <code>75</code> &#x7684;&#x505A;&#x6CD5;&#x5B58;&#x5728;&#x98CE;&#x9669;&#x3002;</p>
<p>&#x4F46;&#x5982;&#x679C;&#x524D;&#x540E;&#x7AEF;&#x5B58;&#x5728;&#x4EA4;&#x4E92;&#xFF0C;&#x524D;&#x7AEF;&#x662F;&#x4E0D;&#x53EF;&#x80FD;&#x53D1;&#x9001; <code>enum</code> &#x5BF9;&#x8C61;&#x7684;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x8F6C;&#x5316;&#x6210;&#x6570;&#x5B57;&#xFF0C;&#x8FD9;&#x65F6;&#x4F7F;&#x7528;&#x5B57;&#x7B26;&#x4E32;&#x4F5C;&#x4E3A; value &#x4F1A;&#x66F4;&#x5B89;&#x5168;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum types {
  Folder = &quot;FOLDER&quot;
}

fetch(`/api?type=${monaco.languages.types.Folder}`);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">enum</span> types {
  Folder = <span class="hljs-string">&quot;FOLDER&quot;</span>
}

fetch(<span class="hljs-string">`/api?type=<span class="hljs-subst">${monaco.languages.types.Folder}</span>`</span>);</code></pre>
<h3 id="articleHeader13">&#x6570;&#x7EC4;&#x7C7B;&#x578B;&#x53EF;&#x4EE5;&#x660E;&#x786E;&#x957F;&#x5EA6;</h3>
<p>&#x6700;&#x5178;&#x578B;&#x7684;&#x662F; chart &#x56FE;&#xFF0C;&#x7ECF;&#x5E38;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x4E8C;&#x7EF4;&#x6570;&#x7EC4;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[[1, 5.5], [2, 3.7], [3, 2.0], [4, 5.9], [5, 3.9]]" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="json hljs"><code class="json" style="word-break: break-word; white-space: initial;">[[<span class="hljs-number">1</span>, <span class="hljs-number">5.5</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3.7</span>], [<span class="hljs-number">3</span>, <span class="hljs-number">2.0</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5.9</span>], [<span class="hljs-number">5</span>, <span class="hljs-number">3.9</span>]]</code></pre>
<p>&#x4E00;&#x822C;&#x6211;&#x4EEC;&#x4F1A;&#x8FD9;&#x4E48;&#x63CF;&#x8FF0;&#x5176;&#x6570;&#x636E;&#x7ED3;&#x6784;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const data: string[][] = [[1, 5.5], [2, 3.7], [3, 2.0], [4, 5.9], [5, 3.9]];" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> data: <span class="hljs-built_in">string</span>[][] = [[<span class="hljs-number">1</span>, <span class="hljs-number">5.5</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">3.7</span>], [<span class="hljs-number">3</span>, <span class="hljs-number">2.0</span>], [<span class="hljs-number">4</span>, <span class="hljs-number">5.9</span>], [<span class="hljs-number">5</span>, <span class="hljs-number">3.9</span>]];</code></pre>
<p>&#x5728; TS <code>2.7</code> &#x7248;&#x672C;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x66F4;&#x7CBE;&#x786E;&#x7684;&#x63CF;&#x8FF0;&#x6BCF;&#x4E00;&#x9879;&#x7684;&#x7C7B;&#x578B;&#x4E0E;&#x6570;&#x7EC4;&#x603B;&#x957F;&#x5EA6;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ChartData extends Array&lt;number&gt; {
  0: number;
  1: number;
  length: 2;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">interface</span> ChartData <span class="hljs-keyword">extends</span> Array&lt;number&gt; {
  <span class="hljs-number">0</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-number">1</span>: <span class="hljs-built_in">number</span>;
  length: <span class="hljs-number">2</span>;
}</code></pre>
<h3 id="articleHeader14">&#x81EA;&#x52A8;&#x7C7B;&#x578B;&#x63A8;&#x5BFC;</h3>
<p>&#x81EA;&#x52A8;&#x7C7B;&#x578B;&#x63A8;&#x5BFC;&#x6709;&#x4E24;&#x79CD;&#xFF0C;&#x5206;&#x522B;&#x662F; <code>typeof</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(x: string | number) {
  if (typeof x === &quot;string&quot;) {
    return x; // string
  }
  return x; // number
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">x: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span></span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> x === <span class="hljs-string">&quot;string&quot;</span>) {
    <span class="hljs-keyword">return</span> x; <span class="hljs-comment">// string</span>
  }
  <span class="hljs-keyword">return</span> x; <span class="hljs-comment">// number</span>
}</code></pre>
<p>&#x548C; <code>instanceof</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f1(x: B | C | D) {
  if (x instanceof B) {
    x; // B
  } else if (x instanceof C) {
    x; // C
  } else {
    x; // D
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params">x: B | C | D</span>) </span>{
  <span class="hljs-keyword">if</span> (x <span class="hljs-keyword">instanceof</span> B) {
    x; <span class="hljs-comment">// B</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (x <span class="hljs-keyword">instanceof</span> C) {
    x; <span class="hljs-comment">// C</span>
  } <span class="hljs-keyword">else</span> {
    x; <span class="hljs-comment">// D</span>
  }
}</code></pre>
<p>&#x5728; TS <code>2.7</code> &#x7248;&#x672C;&#x4E2D;&#xFF0C;&#x65B0;&#x589E;&#x4E86; <code>in</code> &#x7684;&#x63A8;&#x5BFC;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface A {
  a: number;
}
interface B {
  b: string;
}

function foo(x: A | B) {
  if (&quot;a&quot; in x) {
    return x.a;
  }
  return x.b;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">interface</span> A {
  a: <span class="hljs-built_in">number</span>;
}
<span class="hljs-keyword">interface</span> B {
  b: <span class="hljs-built_in">string</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">x: A | B</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-keyword">in</span> x) {
    <span class="hljs-keyword">return</span> x.a;
  }
  <span class="hljs-keyword">return</span> x.b;
}</code></pre>
<p>&#x8FD9;&#x4E2A;&#x89E3;&#x51B3;&#x4E86; <code>object</code> &#x7C7B;&#x578B;&#x7684;&#x81EA;&#x52A8;&#x63A8;&#x5BFC;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A; <code>object</code> &#x65E2;&#x65E0;&#x6CD5;&#x7528; <code>keyof</code> &#x4E5F;&#x65E0;&#x6CD5;&#x7528; <code>instanceof</code> &#x5224;&#x5B9A;&#x7C7B;&#x578B;&#xFF0C;&#x56E0;&#x6B64;&#x627E;&#x5230;&#x5BF9;&#x8C61;&#x7684;&#x7279;&#x5F81;&#x5427;&#xFF0C;&#x518D;&#x4E5F;&#x4E0D;&#x8981;&#x7528; <code>as</code> &#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Bad
function foo(x: A | B) {
  // I know it&apos;s A, but i can&apos;t describe it.
  (x as A).keyofA;
}

// Good
function foo(x: A | B) {
  // I know it&apos;s A, because it has property `keyofA`
  if (&quot;keyofA&quot; in x) {
    x.keyofA;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-comment">// Bad</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">x: A | B</span>) </span>{
  <span class="hljs-comment">// I know it&apos;s A, but i can&apos;t describe it.</span>
  (x <span class="hljs-keyword">as</span> A).keyofA;
}

<span class="hljs-comment">// Good</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">x: A | B</span>) </span>{
  <span class="hljs-comment">// I know it&apos;s A, because it has property `keyofA`</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-string">&quot;keyofA&quot;</span> <span class="hljs-keyword">in</span> x) {
    x.keyofA;
  }
}</code></pre>
<h2 id="articleHeader15">4 &#x603B;&#x7ED3;</h2>
<p>Typescript <code>2.0-2.9</code> &#x6587;&#x6863;&#x6574;&#x4F53;&#x8BFB;&#x4E0B;&#x6765;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x8FD8;&#x662F;&#x6709;&#x8F83;&#x5F3A;&#x8FDE;&#x8D2F;&#x6027;&#x7684;&#x3002;&#x4F46;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x5E76;&#x4E0D;&#x4E60;&#x60EF;&#x4E00;&#x6B65;&#x6B65;&#x5B66;&#x4E60;&#x65B0;&#x8BED;&#x6CD5;&#xFF0C;&#x56E0;&#x4E3A;&#x65B0;&#x8BED;&#x6CD5;&#x9700;&#x8981;&#x65F6;&#x95F4;&#x6D88;&#x5316;&#x3001;&#x540C;&#x65F6;&#x8981;&#x8FDE;&#x63A5;&#x5230;&#x4EE5;&#x5F80;&#x8BED;&#x6CD5;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x624D;&#x80FD;&#x66F4;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x6240;&#x4EE5;&#x672C;&#x6587;&#x4ECE;&#x529F;&#x80FD;&#x89D2;&#x5EA6;&#xFF0C;&#x800C;&#x975E;&#x7248;&#x672C;&#x89D2;&#x5EA6;&#x68B3;&#x7406;&#x4E86; TS &#x7684;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x6BD4;&#x8F83;&#x7B26;&#x5408;&#x5B66;&#x4E60;&#x4E60;&#x60EF;&#x3002;</p>
<p>&#x53E6;&#x4E00;&#x4E2A;&#x611F;&#x609F;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x8BB8;&#x8981;&#x7528;&#x8FFD;&#x6708;&#x520A;&#x6F2B;&#x753B;&#x7684;&#x601D;&#x7EF4;&#x53BB;&#x5B66;&#x4E60;&#x65B0;&#x8BED;&#x8A00;&#xFF0C;&#x7279;&#x522B;&#x662F; TS &#x8FD9;&#x79CD;&#x6B63;&#x5728;&#x53D1;&#x5C55;&#x4E2D;&#xFF0C;&#x5E76;&#x4E14;&#x8FED;&#x4EE3;&#x901F;&#x5EA6;&#x5F88;&#x5FEB;&#x7684;&#x8BED;&#x8A00;&#x3002;</p>
<h2 id="articleHeader16">5 &#x66F4;&#x591A;&#x8BA8;&#x8BBA;</h2>
<blockquote>&#x8BA8;&#x8BBA;&#x5730;&#x5740;&#x662F;&#xFF1A;<a href="https://github.com/dt-fe/weekly/issues/85" rel="nofollow noreferrer" target="_blank">&#x7CBE;&#x8BFB;&#x300A;Typescript2.0 - 2.9&#x300B; &#xB7; Issue #85 &#xB7; dt-fe/weekly</a>
</blockquote>
<p><strong>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x53C2;&#x4E0E;&#x8BA8;&#x8BBA;&#xFF0C;&#x8BF7;<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x8FD9;&#x91CC;</a>&#xFF0C;&#x6BCF;&#x5468;&#x90FD;&#x6709;&#x65B0;&#x7684;&#x4E3B;&#x9898;&#xFF0C;&#x5468;&#x672B;&#x6216;&#x5468;&#x4E00;&#x53D1;&#x5E03;&#x3002;</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《Typescript2.0 - 2.9》

## 原文链接
[https://segmentfault.com/a/1190000015054118](https://segmentfault.com/a/1190000015054118)

