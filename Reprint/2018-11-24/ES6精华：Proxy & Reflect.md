---
title: 'ES6精华：Proxy & Reflect' 
date: 2018-11-24 2:30:09
hidden: true
slug: ejaw5ipg8kw
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x5BFC;&#x8BED;</h2><p>&#x672C;&#x6587;&#x4E3B;&#x8981;&#x4ECB;&#x7ECD;&#x4E86;ES6&#x4E2D;<code>Proxy</code>&#x548C;<code>Reflect</code>&#x7684;&#x7CBE;&#x534E;&#x77E5;&#x8BC6;&#xFF0C;&#x5E76;&#x9644;&#x6709;&#x6070;&#x5F53;&#x5B9E;&#x4F8B;&#x3002;<code>Proxy</code>&#x610F;&#x4E3A;&#x4EE3;&#x7406;&#x5668;&#xFF0C;&#x901A;&#x8FC7;&#x64CD;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x751F;&#x6210;&#x7684;&#x4EE3;&#x7406;&#x5668;&#xFF0C;&#x5B9E;&#x73B0;&#x5BF9;&#x5BF9;&#x8C61;&#x5404;&#x7C7B;&#x64CD;&#x4F5C;&#x7684;&#x62E6;&#x622A;&#x5F0F;&#x7F16;&#x7A0B;&#x3002;<code>Reflect</code>&#x662F;&#x4E00;&#x4E2A;&#x5305;&#x63FD;&#x66F4;&#x4E3A;&#x4E25;&#x683C;&#x3001;&#x5065;&#x5168;&#x7684;&#x64CD;&#x4F5C;&#x5BF9;&#x8C61;&#x65B9;&#x6CD5;&#x7684;&#x6A21;&#x5757;&#x3002;&#x56E0;&#x4E3A;<code>Proxy</code>&#x6240;&#x80FD;&#x4EE3;&#x7406;&#x7684;&#x65B9;&#x6CD5;&#x548C;<code>Reflect</code>&#x6240;&#x5305;&#x62EC;&#x7684;&#x65B9;&#x6CD5;&#x57FA;&#x672C;&#x5BF9;&#x5E94;&#xFF0C;&#x800C;&#x4E14;&#x5728;&#x62E6;&#x622A;&#x65B9;&#x6CD5;&#x91CC;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;&#x5BF9;&#x5E94;&#x7684;<code>Reflect</code>&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#xFF0C;&#x6240;&#x4EE5;&#x5C06;&#x4E24;&#x8005;&#x5408;&#x5E76;&#x5728;&#x4E00;&#x8D77;&#x5206;&#x4EAB;&#x3002;</p><h2 id="articleHeader1">1 Proxy</h2><h3 id="articleHeader2">1.1 &#x767B;&#x5802;</h3><p>&#x5148;&#x60F3;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5982;&#x4F55;&#x7BA1;&#x63A7;&#x5BF9;&#x8C61;&#x67D0;&#x4E00;&#x5C5E;&#x6027;&#x7684;&#x8BFB;&#x53D6;&#x548C;&#x4FEE;&#x6539;&#xFF08;&#x4E0D;&#x6D89;&#x53CA;&#x95ED;&#x5305;&#x521B;&#x5EFA;&#x79C1;&#x6709;&#x5C5E;&#x6027;&#xFF09;&#xFF1F;<br>&#x5148;&#x521B;&#x5EFA;&#x4E0D;&#x5E94;&#x88AB;&#x76F4;&#x63A5;&#x6539;&#x52A8;&#x7684;&#x5BB9;&#x5668;&#x5C5E;&#x6027;&#xFF1A;_&#x5C5E;&#x6027;&#x540D;&#xFF0C;&#x518D;&#x8BBE;&#x7F6E;&#x76F8;&#x5E94;&#x7684;<code>setter</code>&#x548C;<code>getter</code>&#x51FD;&#x6570;&#x6216;&#x521B;&#x5EFA;&#x76F8;&#x5E94;&#x7684;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--- &#x8BBE;&#x7F6E; setter &#x548C; getter &#x51FD;&#x6570;
let obj = {
  _id: undefined,
  get id() {
    return this._id;
  },
  set id(v) {
    this._id = v;
  }
};
obj.id = 3; // &#x76F8;&#x5F53;&#xFF1A;obj._id = 3
console.log(obj.id); // console.log(obj._id);

--- &#x521B;&#x5EFA;&#x83B7;&#x53D6;&#x53CA;&#x4FEE;&#x6539;&#x65B9;&#x6CD5;
let obj = {
  _id: undefined,
  id() {
    if (!arguments.length) return this._id;
    this._id = arguments[0];
  }
};
obj.id(3); // &#x76F8;&#x5F53;&#xFF1A;obj._id = 3
console.log(obj.id()); // console.log(obj._id);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">--- &#x8BBE;&#x7F6E; setter &#x548C; getter &#x51FD;&#x6570;
<span class="hljs-keyword">let</span> obj = {
  <span class="hljs-attr">_id</span>: <span class="hljs-literal">undefined</span>,
  get id() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._id;
  },
  set id(v) {
    <span class="hljs-keyword">this</span>._id = v;
  }
};
obj.id = <span class="hljs-number">3</span>; <span class="hljs-comment">// &#x76F8;&#x5F53;&#xFF1A;obj._id = 3</span>
<span class="hljs-built_in">console</span>.log(obj.id); <span class="hljs-comment">// console.log(obj._id);</span>

--- &#x521B;&#x5EFA;&#x83B7;&#x53D6;&#x53CA;&#x4FEE;&#x6539;&#x65B9;&#x6CD5;
<span class="hljs-keyword">let</span> obj = {
  <span class="hljs-attr">_id</span>: <span class="hljs-literal">undefined</span>,
  id() {
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">arguments</span>.length) <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._id;
    <span class="hljs-keyword">this</span>._id = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];
  }
};
obj.id(<span class="hljs-number">3</span>); <span class="hljs-comment">// &#x76F8;&#x5F53;&#xFF1A;obj._id = 3</span>
<span class="hljs-built_in">console</span>.log(obj.id()); <span class="hljs-comment">// console.log(obj._id);</span></code></pre><p>&#x8FD9;&#x6837;&#x6709;&#x660E;&#x663E;&#x7684;&#x7F3A;&#x9677;&#xFF1A;&#x8981;&#x4E3A;&#x6BCF;&#x4E2A;&#x9700;&#x8981;&#x7BA1;&#x63A7;&#x7684;&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x91CD;&#x590D;&#x8BBE;&#x7F6E;&#xFF0C;&#x800C;&#x4E14;&#x5B9E;&#x9645;&#x4E0A;&#x5BB9;&#x5668;&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x88AB;&#x4EFB;&#x610F;&#x4FEE;&#x6539;&#x3002;<br>&#x5982;&#x679C;&#x8981;&#x6C42;&#x5347;&#x7EA7;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x76D1;&#x542C;&#x67E5;&#x770B;&#x3001;&#x5220;&#x9664;&#x3001;&#x904D;&#x5386;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x600E;&#x4E48;&#x529E;&#xFF1F;ES6&#x4E4B;&#x524D;&#x53EA;&#x80FD;&#x51C9;&#x62CC;&#xFF0C;ES6&#x4E4B;&#x540E;<code>Proxy</code>&#x4EE3;&#x4F60;&#x529E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = { id: 0, name: &apos;Wmaker&apos; };
let objProxy = new Proxy(obj, {
  get(target, attr) {
    console.log(`Get ${attr}`);
    return target[attr];
  },
  set(target, attr, val) {
    console.log(`Set ${attr}`);
    target[attr] = val;
    return true;
  }
});
objProxy.id; // &#x6253;&#x5370;&#x51FA;&#xFF1A;Get id&#xFF0C;&#x76F8;&#x5F53;&#xFF1A;obj.id;
objProxy.name; // &#x6253;&#x5370;&#x51FA;&#xFF1A;Get name&#xFF0C;&#x76F8;&#x5F53;&#xFF1A;obj.name;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = { <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Wmaker&apos;</span> };
<span class="hljs-keyword">let</span> objProxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(obj, {
  get(target, attr) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Get <span class="hljs-subst">${attr}</span>`</span>);
    <span class="hljs-keyword">return</span> target[attr];
  },
  set(target, attr, val) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Set <span class="hljs-subst">${attr}</span>`</span>);
    target[attr] = val;
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
});
objProxy.id; <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;&#xFF1A;Get id&#xFF0C;&#x76F8;&#x5F53;&#xFF1A;obj.id;</span>
objProxy.name; <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;&#xFF1A;Get name&#xFF0C;&#x76F8;&#x5F53;&#xFF1A;obj.name;</span></code></pre><h3 id="articleHeader3">1.2 &#x5165;&#x5BA4;</h3><p>&#x5982;&#x524D;&#x8282;&#x793A;&#x4F8B;&#x53EF;&#x77E5;&#xFF0C;<code>Proxy</code>&#x662F;&#x751F;&#x6210;&#x4EE3;&#x7406;&#x5668;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;&#x4F20;&#x5165;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x9700;&#x8981;&#x88AB;&#x4EE3;&#x7406;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x9700;&#x8981;&#x62E6;&#x622A;&#x64CD;&#x4F5C;&#x7684;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#xFF08;&#x4E4B;&#x540E;&#x4F1A;&#x5217;&#x51FA;&#x6240;&#x6709;&#x53EF;&#x62E6;&#x622A;&#x7684;&#x64CD;&#x4F5C;&#x53CA;&#x5176;&#x610F;&#x4E49;&#x548C;&#x6CE8;&#x610F;&#x4E8B;&#x9879;&#xFF09;&#x3002;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x62E6;&#x622A;&#x64CD;&#x4F5C;&#xFF0C;&#x90FD;&#x6709;&#x9ED8;&#x8BA4;&#x683C;&#x5F0F;&#x7684;&#x4F20;&#x5165;&#x53C2;&#x6570;&#xFF0C;&#x6709;&#x4E9B;&#x4E5F;&#x8981;&#x6C42;&#x6709;&#x7279;&#x5B9A;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF08;&#x4E0B;&#x9762;&#x4F1A;&#x7F57;&#x5217;&#x51FA;&#x67D0;&#x4E9B;&#x89C4;&#x5F8B;&#xFF09;&#x3002;</p><p>&#x751F;&#x6210;&#x7684;&#x4EE3;&#x7406;&#x5668;&#x662F;&#x4E00;&#x4E2A;&#x4E0E;&#x88AB;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x5173;&#x8054;&#x7684;&#x4EE3;&#x7406;&#x5B9E;&#x4F8B;&#xFF0C;&#x53EF;&#x4EE5;&#x50CF;&#x64CD;&#x4F5C;&#x666E;&#x901A;&#x5BF9;&#x8C61;&#x4E00;&#x6837;&#x5BF9;&#x5F85;&#x5B83;&#x3002;&#x5373;&#x662F;&#x8BF4;&#xFF0C;&#x53EF;&#x4EE5;&#x88AB;<code>delete</code>&#x6389;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x53EF;&#x4EE5;&#x88AB;&#x904D;&#x5386;&#x6216;&#x83B7;&#x53D6;&#x539F;&#x578B;&#x3002;&#x6240;&#x6709;&#x4F5C;&#x7528;&#x4E8E;&#x4EE3;&#x7406;&#x5668;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x90FD;&#x76F8;&#x5F53;&#x76F4;&#x63A5;&#x4F5C;&#x7528;&#x4E8E;&#x88AB;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD8;&#x53EF;&#x4E3A;&#x5176;&#x914D;&#x7F6E;&#x62E6;&#x622A;&#x64CD;&#x4F5C;&#x3002;&#x8BF4;&#x7684;&#x6FC0;&#x6124;&#x70B9;&#xFF0C;&#x82CD;&#x8001;&#x5E08;&#x80FD;&#x505A;&#x597D;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x5C0F;&#x6CFD;&#x8001;&#x5E08;&#x600E;&#x4E48;&#x4F1A;&#x5DEE;&#x5462;&#xFF1F;&#x53E6;&#x5916;&#x53EF;&#x4EE3;&#x7406;&#x7684;&#x4E0D;&#x5355;&#x5355;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x5C5E;&#x4E8E;&#x5BF9;&#x8C61;&#x7684;&#x51FD;&#x6570;&#x3001;&#x6570;&#x7EC4;&#x90FD;&#x662F;&#x65E0;&#x6761;&#x4EF6;&#x63A5;&#x53D7;&#x7684;&#x3002;</p><p>&#x4E3A;&#x5BF9;&#x8C61;&#x751F;&#x6210;&#x4EE3;&#x7406;&#x5668;&#x4E4B;&#x540E;&#xFF0C;&#x4F9D;&#x7136;&#x53EF;&#x4EE5;&#x64CD;&#x4F5C;&#x539F;&#x5BF9;&#x8C61;&#xFF0C;&#x4F46;&#x8FD9;&#x81EA;&#x7136;&#x662F;&#x4E0D;&#x5EFA;&#x8BAE;&#x7684;&#x3002;</p><p><strong>&#x53C2;&#x6570;</strong><br>&#x4E0D;&#x540C;&#x62E6;&#x622A;&#x51FD;&#x6570;&#x7684;&#x4F20;&#x5165;&#x53C2;&#x6570;&#x4E0D;&#x5C3D;&#x76F8;&#x540C;&#xFF0C;&#x4F46;&#x4E00;&#x822C;&#x4E3A;&#x88AB;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x64CD;&#x4F5C;&#x9700;&#x8981;&#x7684;&#x53C2;&#x6570;&#x7B49;&#x548C;&#x4EE3;&#x7406;&#x5668;&#x5BF9;&#x8C61;&#x3002;<br>&#x4E0D;&#x5FC5;&#x8BB0;&#x5FC6;&#x6BCF;&#x4E2A;&#x62E6;&#x622A;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4E3A;&#x8111;&#x74DC;&#x51CF;&#x51CF;&#x8D1F;&#x62C5;&#xFF0C;&#x4F7F;&#x7528;&#x65F6;&#x5148;&#x6253;&#x5370;&#x51FA;<code>arguments</code>&#x67E5;&#x770B;&#x4FBF;&#x4F1A;&#x4E00;&#x76EE;&#x4E86;&#x7136;&#x3002;</p><p><strong>&#x8FD4;&#x56DE;&#x503C;</strong><br>&#x5728;&#x62E6;&#x622A;&#x65B9;&#x6CD5;&#x91CC;&#xFF0C;&#x5E94;&#x5C3D;&#x91CF;&#x4F7F;&#x7528;<code>Reflect</code>&#x5BF9;&#x5E94;&#x7684;&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x8BE5;&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;&#x4E00;&#x65B9;&#x9762;&#x662F;&#x7B80;&#x5355;&#xFF0C;&#x66F4;&#x91CD;&#x8981;&#x7684;&#x662F;&#x5728;&#x4E0D;&#x540C;&#x65B9;&#x6CD5;&#x6216;&#x67D0;&#x4E9B;&#x73AF;&#x5883;&#x4E0B;&#xFF0C;&#x5BF9;&#x8FD4;&#x56DE;&#x503C;&#x6709;&#x786C;&#x6027;&#x7684;&#x8981;&#x6C42;&#xFF0C;&#x5426;&#x5219;&#x76F4;&#x63A5;&#x62A5;&#x9519;&#x3002;&#x6BD4;&#x5982;<code>construct()</code>&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#x3002;&#x518D;&#x6BD4;&#x5982;<code>set()</code>&#x5728;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;<code>true</code>&#x6216;&#x53EF;&#x8F6C;&#x5316;&#x6210;<code>true</code>&#x7684;&#x503C;&#xFF0C;&#x65E0;&#x8BBA;&#x64CD;&#x4F5C;&#x662F;&#x5426;&#x6210;&#x529F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;

--- &#x9519;&#x8BEF;&#x7684;&#x505A;&#x6CD5;
let obj = { id: 0 };
let objProxy = new Proxy(obj, {
  set(target, attr, val) {
    console.log(`Set ${attr}`);
    return target[attr] = val;
  }
});

objProxy.id = 1; // &#x64CD;&#x4F5C;&#x6210;&#x529F;&#x3002;
objProxy.id = 0; // &#x64CD;&#x4F5C;&#x5DF2;&#x7ECF;&#x6210;&#x529F;&#xFF0C;&#x4F46;&#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x518D;&#x5F80;&#x4E0B;&#x6267;&#x884C;&#x3002;

--- &#x63A8;&#x8350;&#x7684;&#x505A;&#x6CD5;
let obj = { id: 0 };
let objProxy = new Proxy(obj, {
  set(target, attr, val) {
    console.log(`Set ${attr}`);
    return Reflect.set(target, attr, val);
  }
});

objProxy.id = 1; // &#x64CD;&#x4F5C;&#x6210;&#x529F;&#x3002;
objProxy.id = 0; // &#x64CD;&#x4F5C;&#x6210;&#x529F;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">&quot;use strict&quot;</span>;

--- &#x9519;&#x8BEF;&#x7684;&#x505A;&#x6CD5;
<span class="hljs-keyword">let</span> obj = { <span class="hljs-attr">id</span>: <span class="hljs-number">0</span> };
<span class="hljs-keyword">let</span> objProxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(obj, {
  set(target, attr, val) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Set <span class="hljs-subst">${attr}</span>`</span>);
    <span class="hljs-keyword">return</span> target[attr] = val;
  }
});

objProxy.id = <span class="hljs-number">1</span>; <span class="hljs-comment">// &#x64CD;&#x4F5C;&#x6210;&#x529F;&#x3002;</span>
objProxy.id = <span class="hljs-number">0</span>; <span class="hljs-comment">// &#x64CD;&#x4F5C;&#x5DF2;&#x7ECF;&#x6210;&#x529F;&#xFF0C;&#x4F46;&#x62A5;&#x9519;&#xFF0C;&#x4E0D;&#x518D;&#x5F80;&#x4E0B;&#x6267;&#x884C;&#x3002;</span>

--- &#x63A8;&#x8350;&#x7684;&#x505A;&#x6CD5;
<span class="hljs-keyword">let</span> obj = { <span class="hljs-attr">id</span>: <span class="hljs-number">0</span> };
<span class="hljs-keyword">let</span> objProxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(obj, {
  set(target, attr, val) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Set <span class="hljs-subst">${attr}</span>`</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.set(target, attr, val);
  }
});

objProxy.id = <span class="hljs-number">1</span>; <span class="hljs-comment">// &#x64CD;&#x4F5C;&#x6210;&#x529F;&#x3002;</span>
objProxy.id = <span class="hljs-number">0</span>; <span class="hljs-comment">// &#x64CD;&#x4F5C;&#x6210;&#x529F;&#x3002;</span></code></pre><p>&#x62E6;&#x622A;&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x5E76;&#x4E0D;&#x4F1A;&#x76F4;&#x63A5;&#x53CD;&#x6620;&#x5230;&#x5916;&#x90E8;&#xFF0C;<code>JS</code>&#x4F1A;&#x8FDB;&#x884C;&#x67D0;&#x4E9B;&#x9A8C;&#x8BC1;&#x548C;&#x6392;&#x9664;&#x3002;<br>&#x6BD4;&#x5982;&#x5373;&#x4FBF;&#x5728;<code>ownKeys()</code>&#x4E2D;&#x8FD4;&#x56DE;&#x5168;&#x90E8;&#x7684;&#x503C;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x5230;&#x5916;&#x90E8;&#x7684;&#x53EA;&#x6709;&#x76F8;&#x5E94;&#x7684;&#x7CFB;&#x5217;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4E24;&#x6B21;&#x6253;&#x5370;&#x7684;&#x7ED3;&#x679C;&#x4E0D;&#x76F8;&#x7B49;&#x3002;

let obj = { id: 0, [Symbol.iterator]() {} };
let objProxy = new Proxy(obj, {
  ownKeys(target) {
    let res = Reflect.ownKeys(target);
    console.log(&apos;1&apos;, res);
    return res;
  }
});

console.log( Object.keys(&apos;2&apos;, objProxy) );" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x4E24;&#x6B21;&#x6253;&#x5370;&#x7684;&#x7ED3;&#x679C;&#x4E0D;&#x76F8;&#x7B49;&#x3002;

<span class="hljs-keyword">let</span> obj = { <span class="hljs-attr">id</span>: <span class="hljs-number">0</span>, [<span class="hljs-built_in">Symbol</span>.iterator]() {} };
<span class="hljs-keyword">let</span> objProxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(obj, {
  ownKeys(target) {
    <span class="hljs-keyword">let</span> res = <span class="hljs-built_in">Reflect</span>.ownKeys(target);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;1&apos;</span>, res);
    <span class="hljs-keyword">return</span> res;
  }
});

<span class="hljs-built_in">console</span>.log( <span class="hljs-built_in">Object</span>.keys(<span class="hljs-string">&apos;2&apos;</span>, objProxy) );</code></pre><p><strong>&#x9650;&#x5236;&#x6027;&#x7684;&#x5EF6;&#x7EED;</strong><br>&#x5F53;&#x88AB;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x5DF2;&#x6709;&#x67D0;&#x4E9B;&#x9650;&#x5236;&#xFF0C;&#x6BD4;&#x5982;&#x4E0D;&#x53EF;&#x6269;&#x5C55;&#x6216;&#x5C5E;&#x6027;&#x4E0D;&#x53EF;&#x5199;&#x4E0D;&#x53EF;&#x914D;&#x7F6E;&#x7B49;&#x3002;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x7684;&#x64CD;&#x4F5C;&#x5DF2;&#x7ECF;&#x53D7;&#x5230;&#x4E86;&#x9650;&#x5236;&#xFF0C;&#x8FD9;&#x65F6;&#x5982;&#x679C;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x7684;&#x4EE3;&#x7406;&#x64CD;&#x4F5C;&#xFF0C;&#x81EA;&#x7136;&#x4F1A;&#x62A5;&#x9519;&#x3002;&#x6BD4;&#x5982;&#x5F53;&#x5C5E;&#x6027;&#x4E0D;&#x53EF;&#x5199;&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x4EE3;&#x7406;&#x5E76;&#x6267;&#x884C;&#x4E86;<code>set()</code>&#x64CD;&#x4F5C;&#xFF0C;&#x5219;&#x4F1A;&#x76F4;&#x63A5;&#x62A5;&#x9519;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = { id: 0 };
Object.defineProperty(obj, &apos;name&apos;, {
  value: &apos;Wmaker&apos;
});

let objProxy = new Proxy(obj, {
  set(target, attr, val) {
    return Reflect.set(target, attr, val);
  }
});

objProxy.id = 1; // &#x64CD;&#x4F5C;&#x6210;&#x529F;&#x3002;
objProxy.name = &apos;Limo&apos;; // &#x62A5;&#x9519;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = { <span class="hljs-attr">id</span>: <span class="hljs-number">0</span> };
<span class="hljs-built_in">Object</span>.defineProperty(obj, <span class="hljs-string">&apos;name&apos;</span>, {
  <span class="hljs-attr">value</span>: <span class="hljs-string">&apos;Wmaker&apos;</span>
});

<span class="hljs-keyword">let</span> objProxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(obj, {
  set(target, attr, val) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.set(target, attr, val);
  }
});

objProxy.id = <span class="hljs-number">1</span>; <span class="hljs-comment">// &#x64CD;&#x4F5C;&#x6210;&#x529F;&#x3002;</span>
objProxy.name = <span class="hljs-string">&apos;Limo&apos;</span>; <span class="hljs-comment">// &#x62A5;&#x9519;&#x3002;</span></code></pre><p><strong>this</strong><br>&#x6709;&#x4E9B;&#x539F;&#x751F;&#x5BF9;&#x8C61;&#x7684;&#x5185;&#x90E8;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;&#xFF0C;&#x53EA;&#x6709;&#x901A;&#x8FC7;&#x6B63;&#x786E;&#x7684;<code>this</code>&#x624D;&#x80FD;&#x8BBF;&#x95EE;&#xFF0C;&#x6240;&#x4EE5;&#x65E0;&#x6CD5;&#x8FDB;&#x884C;&#x4EE3;&#x7406;&#x3002;<br>&#x6BD4;&#x5982;&#x65E5;&#x671F;&#x5BF9;&#x8C61;&#xFF0C;<code>new Proxy(new Date(), {}).getDate()</code>&#xFF0C;&#x62A5;&#x9519;&#x63D0;&#x793A;&#xFF1A;&#x8FD9;&#x4E0D;&#x662F;&#x4E2A;<code>Date</code>&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4E5F;&#x6709;&#x53D8;&#x901A;&#x7684;&#x529E;&#x6CD5;&#xFF0C;&#x6BD4;&#x5982;&#x5BF9;&#x4E8E;&#x9700;&#x8981;&#x6B63;&#x786E; this &#x7684;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x505A;&#x3002;

let p = new Proxy(new Date(), {
  get(target, attr) {
    const v = Reflect.get(target, attr);
    return typeof v === &apos;function&apos;
      ? v.bind(target)
      : v;
  }
});
p.getTime(); // &#x6CA1;&#x6709;&#x9519;&#x8BEF;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x4E5F;&#x6709;&#x53D8;&#x901A;&#x7684;&#x529E;&#x6CD5;&#xFF0C;&#x6BD4;&#x5982;&#x5BF9;&#x4E8E;&#x9700;&#x8981;&#x6B63;&#x786E; <span class="hljs-keyword">this</span> &#x7684;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x505A;&#x3002;

<span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(), {
  get(target, attr) {
    <span class="hljs-keyword">const</span> v = <span class="hljs-built_in">Reflect</span>.get(target, attr);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> v === <span class="hljs-string">&apos;function&apos;</span>
      ? v.bind(target)
      : v;
  }
});
p.getTime(); <span class="hljs-comment">// &#x6CA1;&#x6709;&#x9519;&#x8BEF;&#x3002;</span></code></pre><p>&#x5904;&#x4E8E;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;<code>this</code>&#x76F4;&#x63A5;&#x6307;&#x5411;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0D;&#x662F;&#x88AB;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x6216;&#x4EE3;&#x7406;&#x5668;&#x5BF9;&#x8C61;&#x3002;<br>&#x5904;&#x4E8E;&#x88AB;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;<code>this</code>&#xFF0C;&#x5206;&#x4E3A;&#x5B58;&#x5728;&#x4E8E;&#x65B9;&#x6CD5;&#x548C;&#x5B58;&#x5728;&#x4E8E;<code>getter/setter</code>&#x4E2D;&#x4E24;&#x79CD;&#x3002;&#x4E24;&#x8005;&#x83B7;&#x53D6;<code>this</code>&#x7684;&#x65B9;&#x5F0F;&#x4E0D;&#x540C;&#xFF0C;&#x6211;&#x4EEC;&#x4EE5;&#x5B9E;&#x4F8B;&#x8BF4;&#x660E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--- &#x4F8B;&#x4E00;&#xFF0C;&#x6CA1;&#x6709; set &#x62E6;&#x622A;&#x64CD;&#x4F5C;&#x3002;
let obj = {
  get id() {
    console.log(&apos;o&apos;, this);
  },
  fn() {
    console.log(&apos;o&apos;, this);
  }
};

let objProxy = new Proxy(obj, {});

objProxy.id; // &#x6253;&#x5370;&#x51FA; objProxy &#x3002;
objProxy.fn(); // &#x6253;&#x5370;&#x51FA; objProxy &#x3002;


--- &#x4F8B;&#x4E8C;&#xFF0C;&#x6709; set &#x62E6;&#x622A;&#x64CD;&#x4F5C;&#x3002;&#x5B9E;&#x9645;&#x4F7F;&#x7528;&#x4E86; target[attr] &#x83B7;&#x53D6;&#x5C5E;&#x6027;&#x503C;&#x3002;
let obj = {
  get id() {
    console.log(&apos;o&apos;, this);
  },
  fn() {
    console.log(&apos;o&apos;, this);
  }
};

let objProxy = new Proxy(obj, {
  get(target, attr) {
    console.log(&apos;p&apos;, this);
    return target[attr];
  }
});

objProxy.id;
// &#x6253;&#x5370;&#x51FA;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x548C; obj&#x3002;
// &#x56E0;&#x4E3A;&#x5B9E;&#x9645;&#x662F;&#x901A;&#x8FC7;&#x88AB;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x5373; target &#x8BBF;&#x95EE;&#x5230; id &#x503C;&#x7684;&#x3002;

objProxy.fn();
// &#x6253;&#x5370;&#x51FA;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x548C; objProxy&#x3002;
// &#x53EF;&#x4EE5;&#x7B49;&#x4EF7;&#x7684;&#x5C06;&#x65B9;&#x6CD5;&#x8F6C;&#x5316;&#x6210; (objProxy.fn).call(objProxy)&#x3002;
// &#x867D;&#x7136;&#x65B9;&#x6CD5;&#x4E5F;&#x662F;&#x901A;&#x8FC7; target &#x8BBF;&#x95EE;&#x5230;&#x7684;&#xFF0C;&#x4F46;&#x5BF9;&#x4E8E;&#x65B9;&#x6CD5;&#x6765;&#x8BF4;&#xFF0C;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x786E;&#x5B9A;&#x4E86;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">--- &#x4F8B;&#x4E00;&#xFF0C;&#x6CA1;&#x6709; set &#x62E6;&#x622A;&#x64CD;&#x4F5C;&#x3002;
<span class="hljs-keyword">let</span> obj = {
  get id() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;o&apos;</span>, <span class="hljs-keyword">this</span>);
  },
  fn() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;o&apos;</span>, <span class="hljs-keyword">this</span>);
  }
};

<span class="hljs-keyword">let</span> objProxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(obj, {});

objProxy.id; <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA; objProxy &#x3002;</span>
objProxy.fn(); <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA; objProxy &#x3002;</span>


--- &#x4F8B;&#x4E8C;&#xFF0C;&#x6709; set &#x62E6;&#x622A;&#x64CD;&#x4F5C;&#x3002;&#x5B9E;&#x9645;&#x4F7F;&#x7528;&#x4E86; target[attr] &#x83B7;&#x53D6;&#x5C5E;&#x6027;&#x503C;&#x3002;
<span class="hljs-keyword">let</span> obj = {
  get id() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;o&apos;</span>, <span class="hljs-keyword">this</span>);
  },
  fn() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;o&apos;</span>, <span class="hljs-keyword">this</span>);
  }
};

<span class="hljs-keyword">let</span> objProxy = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(obj, {
  get(target, attr) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;p&apos;</span>, <span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">return</span> target[attr];
  }
});

objProxy.id;
<span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x548C; obj&#x3002;</span>
<span class="hljs-comment">// &#x56E0;&#x4E3A;&#x5B9E;&#x9645;&#x662F;&#x901A;&#x8FC7;&#x88AB;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x5373; target &#x8BBF;&#x95EE;&#x5230; id &#x503C;&#x7684;&#x3002;</span>

objProxy.fn();
<span class="hljs-comment">// &#x6253;&#x5370;&#x51FA;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x548C; objProxy&#x3002;</span>
<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x7B49;&#x4EF7;&#x7684;&#x5C06;&#x65B9;&#x6CD5;&#x8F6C;&#x5316;&#x6210; (objProxy.fn).call(objProxy)&#x3002;</span>
<span class="hljs-comment">// &#x867D;&#x7136;&#x65B9;&#x6CD5;&#x4E5F;&#x662F;&#x901A;&#x8FC7; target &#x8BBF;&#x95EE;&#x5230;&#x7684;&#xFF0C;&#x4F46;&#x5BF9;&#x4E8E;&#x65B9;&#x6CD5;&#x6765;&#x8BF4;&#xFF0C;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x786E;&#x5B9A;&#x4E86;&#x3002;</span></code></pre><p><strong>&#x539F;&#x578B;&#x4E3A;&#x4EE3;&#x7406;&#x5668;</strong><br>&#x5982;&#x679C;&#x5BF9;&#x8C61;&#x7684;&#x539F;&#x578B;&#x4E3A;&#x4EE3;&#x7406;&#x5668;&#xFF0C;&#x5F53;&#x64CD;&#x4F5C;&#x8FDB;&#x884C;&#x5230;&#x539F;&#x578B;&#x65F6;&#xFF0C;&#x5B9E;&#x9645;&#x662F;&#x64CD;&#x4F5C;&#x539F;&#x578B;&#x7684;&#x4EE3;&#x7406;&#x5668;&#x5BF9;&#x8C61;&#x3002;&#x8FD9;&#x65F6;&#xFF0C;&#x5176;&#x884C;&#x4E3A;&#x548C;&#x666E;&#x901A;&#x4EE3;&#x7406;&#x5668;&#x4E00;&#x81F4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = Object.create(new Proxy({}, {
  get(target, attr) {
    console.log(&apos;In proxy.&apos;);
    return Reflect.get(target, attr);
  }
}));

obj.name; // &#x6253;&#x5370;&#x51FA; In proxy. &#x3002;
// &#x5F53;&#x5728;&#x5B9E;&#x4F8B;&#x4E0A;&#x627E;&#x4E0D;&#x5230;&#x5BF9;&#x5E94;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x8F6C;&#x5230;&#x4E86;&#x539F;&#x578B;&#x4E0A;&#xFF0C;&#x8FD9;&#x65F6;&#x4FBF;&#x88AB;&#x62E6;&#x622A;&#x4E86;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> obj = <span class="hljs-built_in">Object</span>.create(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>({}, {
  get(target, attr) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;In proxy.&apos;</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Reflect</span>.get(target, attr);
  }
}));

obj.name; <span class="hljs-comment">// &#x6253;&#x5370;&#x51FA; In proxy. &#x3002;</span>
<span class="hljs-comment">// &#x5F53;&#x5728;&#x5B9E;&#x4F8B;&#x4E0A;&#x627E;&#x4E0D;&#x5230;&#x5BF9;&#x5E94;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x8F6C;&#x5230;&#x4E86;&#x539F;&#x578B;&#x4E0A;&#xFF0C;&#x8FD9;&#x65F6;&#x4FBF;&#x88AB;&#x62E6;&#x622A;&#x4E86;&#x3002;</span></code></pre><h3 id="articleHeader4">1.3 &#x4EE3;&#x7406;&#x7C7B;&#x522B;</h3><p>&#x8FD9;&#x91CC;&#x4EC5;&#x4EC5;&#x662F;&#x7F57;&#x5217;&#x51FA;&#x67D0;&#x4E9B;&#x91CD;&#x70B9;&#xFF0C;&#x8BE6;&#x7EC6;&#x7684;&#x8BF7;&#x770B;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy" rel="nofollow noreferrer" target="_blank">&#x624B;&#x518C;</a>&#xFF08;&#x6807;&#x51C6;&#x548C;&#x884C;&#x4E3A;&#x5904;&#x4E8E;&#x53D8;&#x52A8;&#x4E2D;&#xFF09;&#x3002;</p><p><strong>get</strong><br>&#x62E6;&#x622A;&#x5C5E;&#x6027;&#x7684;&#x8BFB;&#x53D6;&#x64CD;&#x4F5C;&#xFF0C;&#x5305;&#x62EC;&#x6570;&#x7EC4;&#x53D6;&#x503C;&#x3002;</p><p><strong>set</strong><br>&#x62E6;&#x622A;&#x5C5E;&#x6027;&#x7684;&#x8D4B;&#x503C;&#x64CD;&#x4F5C;&#xFF0C;&#x5305;&#x62EC;&#x6570;&#x7EC4;&#x8D4B;&#x503C;&#x3002;<br>&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x53EF;&#x8F6C;&#x5316;&#x4E3A;<code>true</code>&#x7684;&#x503C;&#x3002;<br>&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x6709;&#x67D0;&#x4E9B;&#x9650;&#x5236;&#xFF08;&#x5C5E;&#x6027;&#x4E0D;&#x53EF;&#x5199;&#x7B49;&#xFF09;&#xFF0C;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x7684;&#x62E6;&#x622A;&#x64CD;&#x4F5C;&#x81EA;&#x7136;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><p><strong>apply</strong><br>&#x62E6;&#x622A;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x3001;<code>call</code>&#x548C;<code>apply</code>&#x64CD;&#x4F5C;&#x3002;</p><p><strong>has</strong><br>&#x62E6;&#x622A;&#x5224;&#x65AD;&#x5BF9;&#x8C61;&#x662F;&#x5426;&#x5177;&#x6709;&#x67D0;&#x5C5E;&#x6027;&#x3002;<br>&#x53EA;&#x5BF9;<code>in</code>&#x548C;<code>Reflect.has()</code>&#x65B9;&#x6CD5;&#x6709;&#x6548;&#xFF0C;<code>for in</code>&#x5C5E;&#x4E8E;&#x904D;&#x5386;&#x7CFB;&#x5217;&#x3002;</p><p><strong>construct</strong><br>&#x62E6;&#x622A;<code>new</code>&#x547D;&#x4EE4;&#xFF0C;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;</p><p><strong>deleteProperty</strong><br>&#x62E6;&#x622A;<code>delete</code>&#x5C5E;&#x6027;&#x64CD;&#x4F5C;&#x3002;<br>&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x53EF;&#x8F6C;&#x5316;&#x4E3A;<code>true</code>&#x7684;&#x503C;&#x3002;<br>&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x6709;&#x67D0;&#x4E9B;&#x9650;&#x5236;&#xFF08;&#x5C5E;&#x6027;&#x4E0D;&#x53EF;&#x5199;&#x7B49;&#xFF09;&#xFF0C;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x7684;&#x62E6;&#x622A;&#x64CD;&#x4F5C;&#x81EA;&#x7136;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><p><strong>defineProperty</strong><br>&#x62E6;&#x622A;<code>Object.defineProperty()</code>&#xFF0C;&#x4E0D;&#x4F1A;&#x62E6;&#x622A;<code>defineProperties</code>&#x3002;<br>&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x4EE3;&#x7406;&#x5BF9;&#x8C61;&#x6709;&#x67D0;&#x4E9B;&#x9650;&#x5236;&#xFF08;&#x5C5E;&#x6027;&#x4E0D;&#x53EF;&#x914D;&#x7F6E;&#x7B49;&#xFF09;&#xFF0C;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x7684;&#x62E6;&#x622A;&#x64CD;&#x4F5C;&#x81EA;&#x7136;&#x4F1A;&#x62A5;&#x9519;&#x3002;</p><p><strong>getOwnPropertyDescriptor</strong><br>&#x62E6;&#x622A;<code>Object.getOwnPropertyDescriptor()</code>&#xFF0C;&#x4E0D;&#x4F1A;&#x62E6;&#x622A;<code>getOwnPropertyDescriptors</code>&#x3002;<br>&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x6216;<code>undefined</code>&#xFF0C;&#x5373;&#x8FD4;&#x56DE;&#x4E0E;&#x539F;&#x65B9;&#x6CD5;&#x76F8;&#x540C;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#x3002;</p><p><strong>getPrototypeOf</strong><br>&#x62E6;&#x622A;&#x83B7;&#x53D6;&#x5BF9;&#x8C61;&#x539F;&#x578B;&#xFF0C;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x6216;&#x8005;<code>null</code>&#x3002;<br>&#x5982;&#x679C;&#x5BF9;&#x8C61;&#x4E0D;&#x53EF;&#x6269;&#x5C55;&#xFF0C;&#x5FC5;&#x987B;&#x8FD4;&#x56DE;&#x771F;&#x5B9E;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x3002;<br>&#x76F4;&#x63A5;&#x8BBF;&#x95EE;<code>__proto__</code>&#xFF0C;&#x901A;&#x8FC7;&#x5404;&#x7C7B;&#x65B9;&#x6CD5;&#x7B49;&#x7B49;&#x90FD;&#x4F1A;&#x89E6;&#x53D1;&#x62E6;&#x622A;&#x3002;</p><p><strong>setPrototypeOf</strong><br>&#x62E6;&#x622A;<code>Object.setPrototypeOf()</code>&#x65B9;&#x6CD5;&#x3002;</p><p><strong>isExtensible</strong><br>&#x62E6;&#x622A;<code>Object.isExtensible()</code>&#x64CD;&#x4F5C;&#x3002;<br>&#x8FD4;&#x56DE;&#x503C;&#x5FC5;&#x987B;&#x4E0E;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x7684;<code>isExtensible</code>&#x5C5E;&#x6027;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#x3002;</p><p><strong>preventExtensions</strong><br>&#x62E6;&#x622A;<code>Object.preventExtensions()</code>&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x4F1A;&#x81EA;&#x52A8;&#x8F6C;&#x6210;&#x5E03;&#x5C14;&#x503C;&#x3002;</p><p><strong>ownKeys</strong><br>&#x62E6;&#x622A;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x5C5E;&#x6027;&#x7684;&#x904D;&#x5386;&#x64CD;&#x4F5C;&#x3002;<br>&#x6BD4;&#x5982;<code>keys()</code>,<code>getOwnPropertyNames()</code>,<code>getOwnPropertySymbols()</code>&#x7B49;&#x7B49;&#x3002;<br>&#x8FD4;&#x56DE;&#x503C;&#x5FC5;&#x987B;&#x662F;&#x6570;&#x7EC4;&#xFF0C;&#x9879;&#x53EA;&#x80FD;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x6216;<code>Symbol</code>&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#x3002;<br>&#x8FD4;&#x56DE;&#x503C;&#x4F1A;&#x6839;&#x636E;&#x8C03;&#x7528;&#x65B9;&#x6CD5;&#x7684;&#x9700;&#x6C42;&#x8FDB;&#x884C;&#x8FC7;&#x6EE4;&#xFF0C;&#x6BD4;&#x5982;<code>Object.keys()</code>&#x91CC;&#x4E0D;&#x4F1A;&#x6709;<code>symbole</code>&#x3002;<br>&#x5982;&#x679C;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x5305;&#x542B;&#x4E0D;&#x53EF;&#x914D;&#x7F6E;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x8BE5;&#x5C5E;&#x6027;&#x5FC5;&#x987B;&#x88AB;&#x8FD4;&#x56DE;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#x3002;<br>&#x5982;&#x679C;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#x4E0D;&#x53EF;&#x6269;&#x5C55;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x5FC5;&#x987B;&#x5305;&#x542B;&#x539F;&#x5BF9;&#x8C61;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x4E14;&#x4E0D;&#x80FD;&#x5305;&#x542B;&#x591A;&#x4F59;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#x3002;</p><h3 id="articleHeader5">1.4 Proxy.revocable</h3><p>&#x6B64;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x4E5F;&#x7528;&#x4E8E;&#x751F;&#x6210;&#x4EE3;&#x7406;&#x5668;&#x5BF9;&#x8C61;&#x7684;&#xFF0C;&#x4F46;&#x5B83;&#x8FD8;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x56DE;&#x6536;&#x4EE3;&#x7406;&#x5668;&#x7684;&#x65B9;&#x6CD5;&#x3002;<br>&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF1A;&#x4E0D;&#x5141;&#x8BB8;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x76EE;&#x6807;&#x5BF9;&#x8C61;&#xFF0C;&#x5FC5;&#x987B;&#x901A;&#x8FC7;&#x4EE3;&#x7406;&#x8BBF;&#x95EE;&#x3002;&#x800C;&#x4E14;&#x4E00;&#x65E6;&#x8BBF;&#x95EE;&#x7ED3;&#x675F;&#xFF0C;&#x5C31;&#x6536;&#x56DE;&#x4EE3;&#x7406;&#x6743;&#xFF0C;&#x4E0D;&#x5141;&#x8BB8;&#x518D;&#x6B21;&#x8BBF;&#x95EE;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let {proxy, revoke} = Proxy.revocable(obj, {});
revoke();
&#x6B64;&#x65F6;&#x5176;&#x5185;&#x90E8;&#x5C5E;&#x6027;&#x503C; [[IsRevoked]] &#x4E3A; true&#xFF0C;&#x4E0D;&#x80FD;&#x518D;&#x64CD;&#x4F5C;&#x4EE3;&#x7406;&#x5668;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lua"><code>let {proxy, revoke} = Proxy.revocable(obj, {});
revoke();
&#x6B64;&#x65F6;&#x5176;&#x5185;&#x90E8;&#x5C5E;&#x6027;&#x503C; <span class="hljs-string">[[IsRevoked]]</span> &#x4E3A; <span class="hljs-literal">true</span>&#xFF0C;&#x4E0D;&#x80FD;&#x518D;&#x64CD;&#x4F5C;&#x4EE3;&#x7406;&#x5668;&#xFF0C;&#x5426;&#x5219;&#x62A5;&#x9519;&#x3002;</code></pre><h2 id="articleHeader6">2 Reflect</h2><h3 id="articleHeader7">2.1 &#x4F5C;&#x7528;</h3><p>&#x6700;&#x7EC8;&#x76EE;&#x7684;&#x662F;&#x6210;&#x4E3A;&#x8BED;&#x8A00;&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#x7684;&#x5BBF;&#x4E3B;&#x5BF9;&#x8C61;&#x3002;<br>&#x6BD4;&#x5982;&#x8BF4;<code>defineProperty, getPrototypeOf, preventExtensions</code>&#x90FD;&#x5F88;&#x660E;&#x663E;&#x5C5E;&#x4E8E;&#x5185;&#x90E8;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x5E94;&#x6302;&#x5728;<code>Object</code>&#x4E0B;&#x3002;</p><p>&#x63D0;&#x4F9B;&#x66FF;&#x4EE3;&#x547D;&#x4EE4;&#x5F0F;&#x64CD;&#x4F5C;&#x7684;&#x76F8;&#x5E94;&#x51FD;&#x6570;&#x3002;<br>&#x4F7F;&#x7528;<code>Reflect.has(obj, attr)</code>&#x66FF;&#x4EE3;<code>in&#x64CD;&#x4F5C;</code>&#x3002;<br>&#x4F7F;&#x7528;<code>Reflect.deleteProperty(obj, attr)</code>&#x66FF;&#x4EE3;<code>delete&#x64CD;&#x4F5C;</code>&#x3002;</p><p>&#x4F7F;&#x51FD;&#x6570;&#x7684;&#x884C;&#x4E3A;&#x66F4;&#x52A0;&#x5B8C;&#x5584;&#x548C;&#x4E25;&#x683C;&#x3002;<br>&#x5728;&#x65E0;&#x6CD5;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;<code>Reflect.defineProperty</code>&#x8FD4;&#x56DE;<code>false</code>&#x800C;&#x4E0D;&#x662F;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#x3002;<br>&#x5728;&#x8981;&#x6C42;&#x7C7B;&#x578B;&#x662F;&#x5BF9;&#x8C61;&#x7684;&#x53C2;&#x6570;&#x4E3A;&#x975E;&#x5BF9;&#x8C61;&#x65F6;&#xFF0C;&#x4F1A;&#x76F4;&#x63A5;&#x62A5;&#x9519;&#x800C;&#x4E0D;&#x662F;&#x8C03;&#x7528;<code>Object()</code>&#x8FDB;&#x884C;&#x8F6C;&#x5316;&#x3002;</p><p>&#x4E0E;<code>Porxy</code>&#x53EF;&#x62E6;&#x622A;&#x7684;&#x65B9;&#x6CD5;&#x5BF9;&#x5E94;&#xFF0C;&#x65B9;&#x4FBF;&#x5728;&#x5B9E;&#x73B0;&#x81EA;&#x5B9A;&#x4E49;&#x884C;&#x4E3A;&#x65F6;&#xFF0C;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x4EE5;&#x5B8C;&#x6210;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#x3002;</p><h3 id="articleHeader8">2.2 &#x9759;&#x6001;&#x65B9;&#x6CD5;</h3><p>&#x8FD9;&#x91CC;&#x4EC5;&#x4EC5;&#x662F;&#x7F57;&#x5217;&#x51FA;&#x67D0;&#x4E9B;&#x91CD;&#x70B9;&#xFF0C;&#x8BE6;&#x7EC6;&#x7684;&#x8BF7;&#x770B;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect" rel="nofollow noreferrer" target="_blank">&#x624B;&#x518C;</a>&#x3002;</p><p><strong>Reflect.get</strong><br>Reflect.get(obj, attr, receiver)<br>&#x8FD4;&#x56DE;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x6CA1;&#x6709;&#x5219;&#x8FD4;&#x56DE;<code>undefined</code>&#x3002;<br><code>receiver</code>&#x662F;&#x8BBE;&#x7F6E;<code>getter</code>&#x548C;<code>setter</code>&#x91CC;&#x7684;<code>this</code>&#x6307;&#x5411;&#xFF0C;&#x9ED8;&#x8BA4;&#x6307;&#x5411;<code>obj</code>&#x3002;</p><p><strong>Reflect.set</strong><br>Reflect.set(obj, attr, value, receiver)<br>&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#x3002;<br>&#x6CE8;&#x610F;&#xFF1A;&#x5F53;&#x8BE5;&#x5C5E;&#x6027;&#x4E0D;&#x662F;<code>getter</code>&#x65F6;&#xFF0C;&#x4F20;&#x5165;<code>receiver</code>&#x7B49;&#x540C;&#x4E8E;&#x8BBE;&#x7F6E;<code>receiver</code>&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;</p><p><strong>Reflect.has</strong><br>Reflect.has(obj, attr)<br>&#x7B49;&#x540C;<code>attr in obj</code>&#x3002;</p><p><strong>Reflect.deleteProperty</strong><br>Reflect.deleteProperty(obj, attr)<br>&#x7B49;&#x540C;<code>delete obj[attr]</code>&#x3002;</p><p><strong>Reflect.construct</strong><br>Reflect.construct(func, args)<br><code>args</code>&#x7B49;&#x540C;&#x4E8E;&#x4F7F;&#x7528;<code>apply</code>&#x65B9;&#x6CD5;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x6570;&#x7EC4;&#x3002;<br>&#x63D0;&#x4F9B;&#x4E86;&#x4E0D;&#x4F7F;&#x7528;<code>new</code>&#x6765;&#x8C03;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x7B49;&#x540C;<code>new func(...args)</code>&#x3002;</p><p><strong>Reflect.getPrototypeOf</strong><br>&#x4F5C;&#x7528;&#x53CA;&#x53C2;&#x6570;&#x7B49;&#x540C;<code>Object.getPrototypeOf(obj)</code>&#x3002;</p><p><strong>Reflect.setPrototypeOf</strong><br>&#x4F5C;&#x7528;&#x53CA;&#x53C2;&#x6570;&#x7B49;&#x540C;<code>Object.setPrototypeOf(obj, newProto)</code>&#x3002;</p><p><strong>Reflect.apply</strong><br>&#x4F5C;&#x7528;&#x53CA;&#x53C2;&#x6570;&#x7B49;&#x540C;<code>Function.prototype.apply.call(func, thisArg, args)</code>&#x3002;</p><p><strong>Reflect.defineProperty</strong><br>&#x4F5C;&#x7528;&#x53CA;&#x53C2;&#x6570;&#x7B49;&#x540C;<code>Object.defineProperty(obj, attr, descriptor)</code>&#x3002;</p><p><strong>Reflect.getOwnPropertyDescriptor</strong><br>&#x4F5C;&#x7528;&#x53CA;&#x53C2;&#x6570;&#x7B49;&#x540C;<code>Object.getOwnPropertyDescriptor(obj, attr)</code>&#x3002;</p><p><strong>Reflect.isExtensible</strong><br>Reflect.isExtensible(obj)<br>&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x662F;&#x5426;&#x53EF;&#x6269;&#x5C55;&#x3002;</p><p><strong>Reflect.preventExtensions</strong><br>Reflect.preventExtensions(obj)<br>&#x8BBE;&#x7F6E;&#x5BF9;&#x8C61;&#x4E3A;&#x4E0D;&#x53EF;&#x6269;&#x5C55;&#xFF0C;&#x8FD4;&#x56DE;&#x5E03;&#x5C14;&#x503C;&#x3002;</p><p><strong>Reflect.ownKeys</strong><br>Reflect.ownKeys(obj)<br>&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#x672C;&#x8EAB;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x3002;<br>&#x7B49;&#x540C;&#x4E8E;<code>Object.getOwnPropertyNames</code>&#x4E0E;<code>Object.getOwnPropertySymbols</code>&#x4E4B;&#x548C;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6精华：Proxy & Reflect

## 原文链接
[https://segmentfault.com/a/1190000015581013](https://segmentfault.com/a/1190000015581013)

