---
title: 'Angular Elements 及其运作原理' 
date: 2018-11-22 11:48:10
hidden: true
slug: qh1haoru99q
categories: [reprint]
---

{{< raw >}}
<p>&#x73B0;&#x5728;&#xFF0C;Angular Elements &#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x5DF2;&#x7ECF;&#x5728;&#x793E;&#x533A;&#x5F15;&#x8D77;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x7684;&#x8BA8;&#x8BBA;&#x3002;&#x8FD9;&#x662F;&#x663E;&#x800C;&#x6613;&#x89C1;&#x7684;&#xFF0C;&#x56E0;&#x4E3A; Angular Elements &#x63D0;&#x4F9B;&#x4E86;&#x5F88;&#x591A;&#x5F00;&#x7BB1;&#x5373;&#x7528;&#x7684;&#x3001;&#x5341;&#x5206;&#x5F3A;&#x5927;&#x7684;&#x529F;&#x80FD;&#xFF1A;</p><ul><li>&#x901A;&#x8FC7;&#x4F7F;&#x7528;&#x539F;&#x751F;&#x7684; HTML &#x8BED;&#x6CD5;&#x6765;&#x4F7F;&#x7528; Angular Elements &#x2014;&#x2014; &#x8FD9;&#x610F;&#x5473;&#x7740;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x4E86;&#x89E3; Angular &#x7684;&#x76F8;&#x5173;&#x77E5;&#x8BC6;</li><li>&#x5B83;&#x662F;&#x81EA;&#x542F;&#x52A8;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x4E00;&#x5207;&#x90FD;&#x53EF;&#x4EE5;&#x6309;&#x9884;&#x671F;&#x90A3;&#x6837;&#x8FD0;&#x4F5C;</li><li>&#x5B83;&#x7B26;&#x5408; Web Components &#x89C4;&#x8303;&#xFF0C;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x5B83;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x4F55;&#x5730;&#x65B9;&#x4F7F;&#x7528;</li><li>&#x867D;&#x7136;&#x4F60;&#x6CA1;&#x6709;&#x4F7F;&#x7528; Angular &#x5F00;&#x53D1;&#x6574;&#x4E2A;&#x7F51;&#x7AD9;&#xFF0C;&#x4F46;&#x4F60;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x4ECE; Angular Framework &#x8FD9;&#x4E2A;&#x5E9E;&#x5927;&#x7684;&#x4F53;&#x7CFB;&#x4E2D;&#x6536;&#x76CA;</li></ul><p><code>@angular/elements</code>&#x8FD9;&#x4E2A;&#x5305;&#x63D0;&#x4F9B;&#x53EF;&#x5C06; Angular &#x7EC4;&#x4EF6;&#x8F6C;&#x5316;&#x4E3A;&#x539F;&#x751F; Web Components &#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5B83;&#x57FA;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x7684; Custom Elements API &#x5B9E;&#x73B0;&#x3002;Angular Elements &#x63D0;&#x4F9B;&#x4E00;&#x79CD;&#x66F4;&#x7B80;&#x6D01;&#x3001;&#x5BF9;&#x5F00;&#x53D1;&#x8005;&#x66F4;&#x53CB;&#x5584;&#x3001;&#x66F4;&#x5FEB;&#x4E50;&#x5730;&#x5F00;&#x53D1;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x5F0F; &#x2014;&#x2014; &#x5728;&#x5E55;&#x540E;&#x5B83;&#x57FA;&#x4E8E;&#x540C;&#x6837;&#x7684;&#x673A;&#x5236;&#xFF08;&#x6307;&#x521B;&#x5EFA;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#xFF09;&#xFF0C;&#x4F46;&#x9690;&#x85CF;&#x4E86;&#x8BB8;&#x591A;&#x6837;&#x677F;&#x4EE3;&#x7801;&#x3002;</p><p>&#x5173;&#x4E8E;&#x5982;&#x4F55;&#x901A;&#x8FC7; <code>@angular/elements</code> &#x521B;&#x5EFA;&#x4E00;&#x4E2A; Custom Element&#xFF0C;&#x5DF2;&#x7ECF;&#x6709;&#x5927;&#x91CF;&#x7684;&#x6587;&#x7AE0;&#x8FDB;&#x884C;&#x9610;&#x8FF0;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x5C06;&#x6DF1;&#x5165;&#x4E00;&#x70B9;&#xFF0C;&#x5BF9;&#x5B83;&#x5728; Angular &#x4E2D;&#x7684;&#x5177;&#x4F53;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#x8FDB;&#x884C;&#x5256;&#x6790;&#x3002;&#x8FD9;&#x4E5F;&#x662F;&#x6211;&#x4EEC;&#x5F00;&#x59CB;&#x7814;&#x7A76; Angular Elements &#x7684;&#x4E00;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x7684;&#x539F;&#x56E0;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x5728;&#x5176;&#x4E2D;&#x8BE6;&#x7EC6;&#x89E3;&#x91CA; Angular &#x5982;&#x4F55;&#x5728; Angular Elements &#x7684;&#x5E2E;&#x52A9;&#x4E0B;&#x5B9E;&#x73B0; Custom Elements API&#x3002;</p><h2 id="articleHeader0">Custom Elements&#xFF08;&#x81EA;&#x5B9A;&#x4E49;&#x5143;&#x7D20;&#xFF09;</h2><p>&#x8981;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#x5173;&#x4E8E; Custom Elements &#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <a href="https://developers.google.com/web/fundamentals/web-components/customelements" rel="nofollow noreferrer" target="_blank">developers.google</a> &#x4E2D;&#x7684;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x8FDB;&#x884C;&#x5B66;&#x4E60;&#xFF0C;&#x6587;&#x7AE0;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x4E86;&#x4E0E; Custom Elements API &#x76F8;&#x5173;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x9488;&#x5BF9; Custom Elements&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E00;&#x53E5;&#x8BDD;&#x6765;&#x6982;&#x62EC;&#xFF1A;</p><blockquote>&#x4F7F;&#x7528; Custom Elements&#xFF0C;web &#x5F00;&#x53D1;&#x8005;&#x53EF;&#x4EE5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684; HTML &#x6807;&#x7B7E;&#x3001;&#x589E;&#x52A0;&#x5DF2;&#x6709;&#x7684; HTML &#x6807;&#x7B7E;&#x4EE5;&#x53CA;&#x7EE7;&#x627F;&#x5176;&#x4ED6;&#x5F00;&#x53D1;&#x8005;&#x6240;&#x5F00;&#x53D1;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</blockquote><h3 id="articleHeader1">&#x539F;&#x751F; Custom Elements</h3><p>&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x62E5;&#x6709; <code>name</code> &#x5C5E;&#x6027;&#x7684; <code>app-hello</code> HTML &#x6807;&#x7B7E;&#x3002;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; Custom Elements API &#x6765;&#x5B8C;&#x6210;&#x8FD9;&#x4EF6;&#x4E8B;&#x3002;&#x5728;&#x6587;&#x7AE0;&#x7684;&#x540E;&#x7EED;&#x7AE0;&#x8282;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x6F14;&#x793A;&#x5982;&#x4F55;&#x4F7F;&#x7528; Angular &#x7EC4;&#x4EF6;&#x7684; <code>@Input</code> &#x88C5;&#x9970;&#x5668;&#x4E0E; &#x8FD9;&#x4E2A; <code>name</code> &#x5C5E;&#x6027;&#x4FDD;&#x6301;&#x540C;&#x6B65;&#x3002;&#x4F46;&#x662F;&#x73B0;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x4F7F;&#x7528; Angular Elements &#x6216;&#x8005; ShadowDom &#x6216;&#x8005;&#x4F7F;&#x7528;&#x4EFB;&#x4F55;&#x5173;&#x4E8E; Angular &#x7684;&#x4E1C;&#x897F;&#x6765;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; Custom Element&#xFF0C;&#x6211;&#x4EEC;&#x4EC5;&#x4F7F;&#x7528;&#x539F;&#x751F;&#x7684; Custom Components API&#x3002;</p><p>&#x9996;&#x5148;&#xFF0C;&#x8FD9;&#x662F;&#x6211;&#x4EEC;&#x7684; HTML &#x6807;&#x8BB0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;hello-elem name=&quot;Custom Elements&quot;&gt;&lt;/hello-elem&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">hello-elem</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;Custom Elements&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello-elem</span>&gt;</span></code></pre><p>&#x8981;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; Custom Element&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5206;&#x522B;&#x5B9E;&#x73B0;&#x5982;&#x4E0B;&#x5728;&#x6807;&#x51C6;&#x4E2D;&#x5B9A;&#x4E49;&#x7684; hooks&#xFF1A;</p><table><thead><tr><th>callback</th><th>summary</th></tr></thead><tbody><tr><td>constructor</td><td>&#x5982;&#x679C;&#x9700;&#x8981;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x5728;&#x5176;&#x4E2D;&#x521D;&#x59CB;&#x5316; state &#x6216;&#x8005; shadowRoot&#xFF0C;&#x5728;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;</td></tr><tr><td>connectedCallback</td><td>&#x5728;&#x5143;&#x7D20;&#x88AB;&#x6DFB;&#x52A0;&#x5230; DOM &#x4E2D;&#x65F6;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x5728;&#x8FD9;&#x4E2A; hook &#x4E2D;&#x521D;&#x59CB;&#x5316;&#x6211;&#x4EEC;&#x7684; DOM &#x7ED3;&#x6784;&#x548C;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;</td></tr><tr><td>disconnectedCallback</td><td>&#x5728;&#x5143;&#x7D20;&#x4ECE; DOM &#x4E2D;&#x88AB;&#x79FB;&#x9664;&#x65F6;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x5728;&#x8FD9;&#x4E2A; hook &#x4E2D;&#x6E05;&#x9664;&#x6211;&#x4EEC;&#x7684; DOM &#x7ED3;&#x6784;&#x548C;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;</td></tr><tr><td>attributeChangedCallback</td><td>&#x5728;&#x5143;&#x7D20;&#x5C5E;&#x6027;&#x53D8;&#x5316;&#x65F6;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x5728;&#x8FD9;&#x4E2A; hook &#x4E2D;&#x66F4;&#x65B0;&#x6211;&#x4EEC;&#x5185;&#x90E8;&#x7684; dom &#x5143;&#x7D20;&#x6216;&#x8005;&#x57FA;&#x4E8E;&#x5C5E;&#x6027;&#x6539;&#x53D8;&#x540E;&#x7684;&#x72B6;&#x6001;</td></tr></tbody></table><p>&#x5982;&#x4E0B;&#x662F;&#x6211;&#x4EEC;&#x5173;&#x4E8E; <code>Hello</code> Custom Element &#x7684;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AppHello extends HTMLElement {
  constructor() {
    super();
  }
  // &#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x4E86;&#x90A3;&#x4E9B;&#x9700;&#x8981;&#x88AB;&#x89C2;&#x5BDF;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5F53;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x6539;&#x53D8;&#x65F6;&#xFF0C;attributeChangedCallback &#x8FD9;&#x4E2A; hook &#x4F1A;&#x88AB;&#x89E6;&#x53D1;
  static get observedAttributes() {return [&apos;name&apos;]; }

  // getter to do a attribute -&gt; property reflection
  get name() {
    return this.getAttribute(&apos;name&apos;);
  }

  // setter to do a property -&gt; attribute reflection
  // &#x901A;&#x8FC7; setter &#x6765;&#x5B8C;&#x6210;&#x7C7B;&#x5C5E;&#x6027;&#x5230;&#x5143;&#x7D20;&#x5C5E;&#x6027;&#x7684;&#x6620;&#x5C04;&#x64CD;&#x4F5C;
  set name(val) {
    this.setAttribute(&apos;name&apos;, val);
  }

  connectedCallback() {
    this.div = document.createElement(&apos;div&apos;);
    this.text = document.createTextNode(this.name || &apos;&apos;);
    this.div.appendChild(this.text);
    this.appendChild(this.div);
  }

  disconnectedCallback() {
    this.removeChild(this.div);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === &apos;name&apos; &amp;&amp; this.text) {
      this.text.textContent = newVal;
    }
  }
}

customElements.define(&apos;hello-elem&apos;, AppHello);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppHello</span> <span class="hljs-title">extends</span> <span class="hljs-title">HTMLElement</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>();
  }
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5B9A;&#x4E49;&#x4E86;&#x90A3;&#x4E9B;&#x9700;&#x8981;&#x88AB;&#x89C2;&#x5BDF;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5F53;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x6539;&#x53D8;&#x65F6;&#xFF0C;attributeChangedCallback &#x8FD9;&#x4E2A; hook &#x4F1A;&#x88AB;&#x89E6;&#x53D1;</span>
  static <span class="hljs-keyword">get</span> observedAttributes() {<span class="hljs-keyword">return</span> [<span class="hljs-string">&apos;name&apos;</span>]; }

  <span class="hljs-comment">// getter to do a attribute -&gt; property reflection</span>
  <span class="hljs-keyword">get</span> name() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getAttribute(<span class="hljs-string">&apos;name&apos;</span>);
  }

  <span class="hljs-comment">// setter to do a property -&gt; attribute reflection</span>
  <span class="hljs-comment">// &#x901A;&#x8FC7; setter &#x6765;&#x5B8C;&#x6210;&#x7C7B;&#x5C5E;&#x6027;&#x5230;&#x5143;&#x7D20;&#x5C5E;&#x6027;&#x7684;&#x6620;&#x5C04;&#x64CD;&#x4F5C;</span>
  <span class="hljs-keyword">set</span> name(<span class="hljs-keyword">val</span>) {
    <span class="hljs-keyword">this</span>.setAttribute(<span class="hljs-string">&apos;name&apos;</span>, <span class="hljs-keyword">val</span>);
  }

  connectedCallback() {
    <span class="hljs-keyword">this</span>.div = document.createElement(<span class="hljs-string">&apos;div&apos;</span>);
    <span class="hljs-keyword">this</span>.text = document.createTextNode(<span class="hljs-keyword">this</span>.name || <span class="hljs-string">&apos;&apos;</span>);
    <span class="hljs-keyword">this</span>.div.appendChild(<span class="hljs-keyword">this</span>.text);
    <span class="hljs-keyword">this</span>.appendChild(<span class="hljs-keyword">this</span>.div);
  }

  disconnectedCallback() {
    <span class="hljs-keyword">this</span>.removeChild(<span class="hljs-keyword">this</span>.div);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    <span class="hljs-keyword">if</span> (attrName === <span class="hljs-string">&apos;name&apos;</span> &amp;&amp; <span class="hljs-keyword">this</span>.text) {
      <span class="hljs-keyword">this</span>.text.textContent = newVal;
    }
  }
}

customElements.define(<span class="hljs-string">&apos;hello-elem&apos;</span>, AppHello);</code></pre><p>&#x8FD9;&#x91CC;&#x662F;&#x53EF;&#x8FD0;&#x884C;&#x5B9E;&#x4F8B;&#x7684;<a href="https://codepen.io/JiaLiPassion/pen/bKMxZp" rel="nofollow noreferrer" target="_blank">&#x94FE;&#x63A5;</a><button class="btn btn-xs btn-default ml10 preview" data-url="JiaLiPassion/pen/bKMxZp" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>&#x3002;&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#x7B2C;&#x4E00;&#x7248;&#x7684; Custom Element&#xFF0C;&#x56DE;&#x987E;&#x4E00;&#x4E0B;&#xFF0C;&#x8FD9;&#x4E2A; <code>app-hellp</code> &#x6807;&#x7B7E;&#x5305;&#x542B;&#x4E00;&#x4E2A;&#x6587;&#x672C;&#x8282;&#x70B9;&#xFF0C;&#x5E76;&#x4E14;&#x8FD9;&#x4E2A;&#x8282;&#x70B9;&#x5C06;&#x4F1A;&#x6E32;&#x67D3;&#x901A;&#x8FC7; <code>app-hello</code> &#x6807;&#x7B7E; <code>name</code> &#x5C5E;&#x6027;&#x4F20;&#x9012;&#x8FDB;&#x6765;&#x7684;&#x4EFB;&#x4F55;&#x5185;&#x5BB9;&#xFF0C;&#x8FD9;&#x4E00;&#x5207;&#x4EC5;&#x4EC5;&#x57FA;&#x4E8E;&#x539F;&#x751F; javascript&#x3002;</p><h2 id="articleHeader2">&#x5C06; Angular &#x7EC4;&#x4EF6;&#x5BFC;&#x51FA;&#x4E3A; Custom Element</h2><p>&#x65E2;&#x7136;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x4E86;&#x89E3;&#x4E86;&#x5173;&#x4E8E;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; HTML Custom Element &#x6240;&#x6D89;&#x53CA;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x4F7F;&#x7528; Angular&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x76F8;&#x540C;&#x529F;&#x80FD;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E4B;&#x540E;&#x518D;&#x4F7F;&#x5B83;&#x6210;&#x4E3A;&#x4E00;&#x4E2A;&#x53EF;&#x7528;&#x7684; Custom Element&#x3002;</p><p>&#x9996;&#x5148;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x4ECE;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684; Angular &#x7EC4;&#x4EF6;&#x5F00;&#x59CB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, Input } from &apos;@angular/core&apos;;

@Component({
  selector: &apos;app-hello&apos;,
  template: `&lt;div&gt;"{{"name"}}"&lt;/div&gt;`
})
export class HelloComponent  {
  @Input() name: string;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { Component, Input } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;

@Component({
  selector: <span class="hljs-string">&apos;app-hello&apos;</span>,
  template: `<span class="javascript">&lt;div&gt;"{{"name"}}"&lt;<span class="hljs-regexp">/div&gt;</span></span>`
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloComponent</span>  {</span>
  @Input() name: string;
}</code></pre><p>&#x6B63;&#x5982;&#x4F60;&#x6240;&#x89C1;&#xFF0C;&#x5B83;&#x548C;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x5728;&#x529F;&#x80FD;&#x4E0A;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x3002;</p><p>&#x73B0;&#x5728;&#xFF0C;&#x8981;&#x5C06;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x5305;&#x88C5;&#x4E3A;&#x4E00;&#x4E2A; Custom Element&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; wrapper class &#x5E76;&#x5B9E;&#x73B0;&#x6240;&#x6709; Custom Elements &#x4E2D;&#x5B9A;&#x4E49;&#x7684; hooks&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class HelloComponentClass extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
  }

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloComponentClass</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">HTMLElement</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>();
  }

  static get observedAttributes() {
  }

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
  }
}</code></pre><p>&#x4E0B;&#x4E00;&#x6B65;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x505A;&#x7684;&#x662F;&#x6865;&#x63A5; <code>HelloComponent</code> &#x548C; <code>HelloComponentClass</code>&#x3002;&#x5B83;&#x4EEC;&#x4E4B;&#x95F4;&#x7684;&#x6865;&#x4F1A;&#x5C06; Angular Component &#x548C; Custom Element &#x8FDE;&#x63A5;&#x8D77;&#x6765;&#xFF0C;&#x5982;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbdOOc?w=1600&amp;h=665" src="https://static.alili.tech/img/bVbdOOc?w=1600&amp;h=665" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8981;&#x5B8C;&#x6210;&#x8FD9;&#x5EA7;&#x6865;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x4F9D;&#x6B21;&#x5B9E;&#x73B0; Custom Elements API &#x4E2D;&#x6240;&#x8981;&#x6C42;&#x7684;&#x6BCF;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x5728;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4E2D;&#x7F16;&#x5199;&#x5173;&#x4E8E;&#x7ED1;&#x5B9A; Angular &#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><table><thead><tr><th>callback</th><th>summary</th><th>angular part</th></tr></thead><tbody><tr><td>constructor</td><td>&#x521D;&#x59CB;&#x5316;&#x5185;&#x90E8;&#x72B6;&#x6001;</td><td>&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x51C6;&#x5907;&#x5DE5;&#x4F5C;</td></tr><tr><td>connectedCallback</td><td>&#x521D;&#x59CB;&#x5316;&#x89C6;&#x56FE;&#x3001;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;</td><td>&#x52A0;&#x8F7D; Angular &#x7EC4;&#x4EF6;</td></tr><tr><td>disconnectedCallback</td><td>&#x6E05;&#x9664;&#x89C6;&#x56FE;&#x3001;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;</td><td>&#x6CE8;&#x9500; Angular &#x7EC4;&#x4EF6;</td></tr><tr><td>attributeChangedCallback</td><td>&#x5904;&#x7406;&#x5C5E;&#x6027;&#x53D8;&#x5316;</td><td>&#x5904;&#x7406; @Input &#x53D8;&#x5316;</td></tr></tbody></table><h3 id="articleHeader3">1. constructor()</h3><p>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728; <code>connectedCallback()</code> &#x65B9;&#x6CD5;&#x4E2D;&#x521D;&#x59CB;&#x5316; HelloComponent&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x8FD9;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728; constructor &#x65B9;&#x6CD5;&#x4E2D;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x51C6;&#x5907;&#x5DE5;&#x4F5C;&#x3002;</p><p>&#x987A;&#x4FBF;&#xFF0C;&#x5173;&#x4E8E;&#x5982;&#x4F55;&#x52A8;&#x6001;&#x6784;&#x9020; Angular &#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x9605;&#x8BFB;<a href="https://blog.angularindepth.com/here-is-what-you-need-to-know-about-dynamic-components-in-angular-ac1e96167f9e" rel="nofollow noreferrer" target="_blank">Dynamic Components in Angular</a>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x8FDB;&#x884C;&#x4E86;&#x89E3;&#x3002;&#x5B83;&#x5176;&#x4E2D;&#x9610;&#x8FF0;&#x7684;&#x8FD0;&#x4F5C;&#x673A;&#x5236;&#x548C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x7684;&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x8981;&#x8BA9;&#x6211;&#x4EEC;&#x7684; Angular &#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#x80FD;&#x591F;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#xFF08;&#x9700;&#x8981; <code>componentFactory</code> &#x80FD;&#x591F;&#x88AB;&#x7F16;&#x8BD1;&#xFF09;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5C06; <code>HelloComponent</code> &#x6DFB;&#x52A0;&#x5230; <code>NgModule</code> &#x7684; <code>entryComponents</code> &#x5C5E;&#x6027;&#xFF08;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x5217;&#x8868;&#xFF09;&#x4E2D;&#x53BB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [HelloComponent],
  entryComponents: [HelloComponent]
})
export class CustomElementsModule {
  ngDoBootstrap() {}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-variable">@NgModule</span>({
  <span class="hljs-attribute">imports</span>: [
    BrowserModule
  ],
  <span class="hljs-attribute">declarations</span>: [HelloComponent],
  <span class="hljs-attribute">entryComponents</span>: [HelloComponent]
})
export class CustomElementsModule {
  <span class="hljs-selector-tag">ngDoBootstrap</span>() {}
}</code></pre><p>&#x57FA;&#x672C;&#x4E0A;&#xFF0C;&#x8C03;&#x7528; <code>prepare()</code> &#x65B9;&#x6CD5;&#x4F1A;&#x5B8C;&#x6210;&#x4E24;&#x4EF6;&#x4E8B;&#xFF1A;</p><ul><li>&#x5B83;&#x4F1A;&#x57FA;&#x4E8E;&#x7EC4;&#x4EF6;&#x7684;&#x5B9A;&#x4E49;&#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A; factoryComponent &#x5DE5;&#x5382;&#x65B9;&#x6CD5;</li><li>&#x5B83;&#x4F1A;&#x57FA;&#x4E8E; Angular &#x7EC4;&#x4EF6;&#x7684; <code>inputs</code> &#x521D;&#x59CB;&#x5316; <code>observedAttributes</code>&#xFF0C;&#x4EE5;&#x4FBF;&#x6211;&#x4EEC;&#x5728; <code>attributeChangedCallback()</code> &#x4E2D;&#x5B8C;&#x6210;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x505A;&#x7684;&#x4E8B;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AngularCustomElementBridge {
  prepare(injector, component) {
    this.componentFactory = injector.get(ComponentFactoryResolver).resolveComponentFactory(component);

    // &#x6211;&#x4EEC;&#x4F7F;&#x7528; templateName &#x6765;&#x5904;&#x7406; @Input(&apos;aliasName&apos;) &#x8FD9;&#x79CD;&#x60C5;&#x5F62;
    this.observedAttributes = componentFactory.inputs.map(input =&gt; input.templateName); 
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AngularCustomElementBridge</span> </span>{
  prepare(injector, component) {
    <span class="hljs-keyword">this</span>.componentFactory = injector.<span class="hljs-keyword">get</span>(ComponentFactoryResolver).resolveComponentFactory(component);

    <span class="hljs-comment">// &#x6211;&#x4EEC;&#x4F7F;&#x7528; templateName &#x6765;&#x5904;&#x7406; @Input(&apos;aliasName&apos;) &#x8FD9;&#x79CD;&#x60C5;&#x5F62;</span>
    <span class="hljs-keyword">this</span>.observedAttributes = componentFactory.inputs.map(input =&gt; input.templateName); 
  }
}</code></pre><h3 id="articleHeader4">2. connectedCallback()</h3><p>&#x5728;&#x8FD9;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x770B;&#x5230;&#xFF1A;</p><ul><li>&#x521D;&#x59CB;&#x5316;&#x6211;&#x4EEC;&#x7684; Angular &#x7EC4;&#x4EF6;&#xFF08;&#x5C31;&#x5982;&#x521B;&#x5EFA;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#x90A3;&#x6837;&#xFF09;</li><li>&#x8BBE;&#x7F6E;&#x7EC4;&#x4EF6;&#x7684;&#x521D;&#x59CB; input &#x503C;</li><li>&#x5728;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x89E6;&#x53D1;&#x810F;&#x68C0;&#x67E5;&#x673A;&#x5236;</li><li>&#x6700;&#x540E;&#xFF0C;&#x5C06; HostView &#x589E;&#x52A0;&#x5230; ApplicationRef</li></ul><p>&#x5982;&#x4E0B;&#x662F;&#x5B9E;&#x6218;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AngularCustomElementBridge {
  initComponent(element: HTMLElement) {
    // &#x9996;&#x5148;&#x6211;&#x4EEC;&#x9700;&#x8981; componentInjector &#x6765;&#x521D;&#x59CB;&#x5316;&#x7EC4;&#x4EF6;
    // &#x8FD9;&#x91CC;&#x7684; injector &#x662F; Custom Element &#x5916;&#x90E8;&#x7684;&#x6CE8;&#x5165;&#x5668;&#x5B9E;&#x4F8B;&#xFF0C;&#x8C03;&#x7528;&#x8005;&#x53EF;&#x4EE5;&#x5728;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x4E2D;&#x6CE8;&#x518C;
    // &#x4ED6;&#x4EEC;&#x81EA;&#x5DF1;&#x7684; providers
    const componentInjector = Injector.create([], this.injector);
  
    this.componentRef = this.componentFactory.create(componentInjector, null, element);

    // &#x7136;&#x540E;&#x6211;&#x4EEC;&#x8981;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x9700;&#x8981;&#x521D;&#x59CB;&#x5316;&#x7EC4;&#x4EF6;&#x7684; input &#x7684;&#x503C;
    // &#x5728;&#x672C;&#x4F8B;&#x4E2D;&#xFF0C;&#x5728; Angular Element &#x88AB;&#x52A0;&#x8F7D;&#x4E4B;&#x524D;&#xFF0C;user &#x53EF;&#x80FD;&#x5DF2;&#x7ECF;&#x8BBE;&#x7F6E;&#x4E86;&#x5143;&#x7D20;&#x7684;&#x5C5E;&#x6027;
    // &#x8FD9;&#x4E9B;&#x503C;&#x88AB;&#x4FDD;&#x5B58;&#x5728; initialInputValues &#x8FD9;&#x4E2A; map &#x7ED3;&#x6784;&#x4E2D;
    this.componentFactory.inputs.forEach(prop =&gt; this.componentRef.instance[prop.propName] = this.initialInputValues[prop.propName]);

    // &#x4E4B;&#x540E;&#x6211;&#x4EEC;&#x4F1A;&#x89E6;&#x53D1;&#x810F;&#x68C0;&#x67E5;&#xFF0C;&#x8FD9;&#x6837;&#x7EC4;&#x4EF6;&#x5728;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x5468;&#x671F;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;
    this.changeDetectorRef.detectChanges();
    this.applicationRef = this.injector.get(ApplicationRef);

    // &#x6700;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528; attachView &#x65B9;&#x6CD5;&#x5C06;&#x7EC4;&#x4EF6;&#x7684; HostView &#x6DFB;&#x52A0;&#x5230; applicationRef &#x4E2D;
    this.applicationRef.attachView(this.componentRef.hostView);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AngularCustomElementBridge</span> </span>{
  initComponent(element: HTMLElement) {
    <span class="hljs-comment">// &#x9996;&#x5148;&#x6211;&#x4EEC;&#x9700;&#x8981; componentInjector &#x6765;&#x521D;&#x59CB;&#x5316;&#x7EC4;&#x4EF6;</span>
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7684; injector &#x662F; Custom Element &#x5916;&#x90E8;&#x7684;&#x6CE8;&#x5165;&#x5668;&#x5B9E;&#x4F8B;&#xFF0C;&#x8C03;&#x7528;&#x8005;&#x53EF;&#x4EE5;&#x5728;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x4E2D;&#x6CE8;&#x518C;</span>
    <span class="hljs-comment">// &#x4ED6;&#x4EEC;&#x81EA;&#x5DF1;&#x7684; providers</span>
    const componentInjector = Injector.create([], <span class="hljs-keyword">this</span>.injector);
  
    <span class="hljs-keyword">this</span>.componentRef = <span class="hljs-keyword">this</span>.componentFactory.create(componentInjector, <span class="hljs-literal">null</span>, element);

    <span class="hljs-comment">// &#x7136;&#x540E;&#x6211;&#x4EEC;&#x8981;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x9700;&#x8981;&#x521D;&#x59CB;&#x5316;&#x7EC4;&#x4EF6;&#x7684; input &#x7684;&#x503C;</span>
    <span class="hljs-comment">// &#x5728;&#x672C;&#x4F8B;&#x4E2D;&#xFF0C;&#x5728; Angular Element &#x88AB;&#x52A0;&#x8F7D;&#x4E4B;&#x524D;&#xFF0C;user &#x53EF;&#x80FD;&#x5DF2;&#x7ECF;&#x8BBE;&#x7F6E;&#x4E86;&#x5143;&#x7D20;&#x7684;&#x5C5E;&#x6027;</span>
    <span class="hljs-comment">// &#x8FD9;&#x4E9B;&#x503C;&#x88AB;&#x4FDD;&#x5B58;&#x5728; initialInputValues &#x8FD9;&#x4E2A; map &#x7ED3;&#x6784;&#x4E2D;</span>
    <span class="hljs-keyword">this</span>.componentFactory.inputs.forEach(prop =&gt; <span class="hljs-keyword">this</span>.componentRef.instance[prop.propName] = <span class="hljs-keyword">this</span>.initialInputValues[prop.propName]);

    <span class="hljs-comment">// &#x4E4B;&#x540E;&#x6211;&#x4EEC;&#x4F1A;&#x89E6;&#x53D1;&#x810F;&#x68C0;&#x67E5;&#xFF0C;&#x8FD9;&#x6837;&#x7EC4;&#x4EF6;&#x5728;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x7684;&#x4E0B;&#x4E00;&#x4E2A;&#x5468;&#x671F;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;</span>
    <span class="hljs-keyword">this</span>.changeDetectorRef.detectChanges();
    <span class="hljs-keyword">this</span>.applicationRef = <span class="hljs-keyword">this</span>.injector.<span class="hljs-keyword">get</span>(ApplicationRef);

    <span class="hljs-comment">// &#x6700;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528; attachView &#x65B9;&#x6CD5;&#x5C06;&#x7EC4;&#x4EF6;&#x7684; HostView &#x6DFB;&#x52A0;&#x5230; applicationRef &#x4E2D;</span>
    <span class="hljs-keyword">this</span>.applicationRef.attachView(<span class="hljs-keyword">this</span>.componentRef.hostView);
  }
}</code></pre><h3 id="articleHeader5">3. disconnectedCallback()</h3><p>&#x8FD9;&#x4E2A;&#x5341;&#x5206;&#x5BB9;&#x6613;&#xFF0C;&#x6211;&#x4EEC;&#x4EC5;&#x9700;&#x8981;&#x5728;&#x5176;&#x4E2D;&#x6CE8;&#x9500; <code>componentRef</code> &#x5373;&#x53EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AngularCustomElementBridge {
  destroy() {
    this.componentRef.destroy();
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AngularCustomElementBridge</span> </span>{
  destroy() {
    <span class="hljs-keyword">this</span>.componentRef.destroy();
  }
}</code></pre><h3 id="articleHeader6">4. attributeChangedCallback()</h3><p>&#x5F53;&#x5143;&#x7D20;&#x5C5E;&#x6027;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x76F8;&#x5E94;&#x5730;&#x66F4;&#x65B0; Angular &#x7EC4;&#x4EF6;&#x5E76;&#x89E6;&#x53D1;&#x810F;&#x68C0;&#x67E5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class AngularCustomElementBridge {
  setInputValue(propName, value) {
    if (!this.componentRef) {
      this.initialInputValues[propName] = value;
      return;
    }
    if (this.componentRef[propName] === value) {
      return;
    }
    this.componentRef[propName] = value;
    this.changeDetectorRef.detectChanges();
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AngularCustomElementBridge</span> </span>{
  setInputValue(propName, value) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.componentRef) {
      <span class="hljs-keyword">this</span>.initialInputValues[propName] = value;
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.componentRef[propName] === value) {
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">this</span>.componentRef[propName] = value;
    <span class="hljs-keyword">this</span>.changeDetectorRef.detectChanges();
  }
}</code></pre><h3 id="articleHeader7">5. Finally, we register the Custom Element</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="customElements.define(&apos;hello-elem&apos;, HelloComponentClass);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code style="word-break:break-word;white-space:initial">customElements.<span class="hljs-class"><span class="hljs-keyword">define</span></span>(<span class="hljs-string">&apos;hello-elem&apos;</span>, HelloComponentClass);</code></pre><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x8FD0;&#x884C;&#x7684;&#x4F8B;&#x5B50;<a href="https://github.com/JiaLiPassion/custom-element" rel="nofollow noreferrer" target="_blank">&#x94FE;&#x63A5;</a>&#x3002;</p><h2 id="articleHeader8">&#x603B;&#x7ED3;</h2><p>&#x8FD9;&#x5C31;&#x662F;&#x6839;&#x672C;&#x601D;&#x60F3;&#x3002;&#x901A;&#x8FC7;&#x5728; Angular &#x4E2D;&#x4F7F;&#x7528;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#x4E86; Angular Elements &#x6240;&#x63D0;&#x4F9B;&#x7684;&#x57FA;&#x7840;&#x529F;&#x80FD;&#xFF0C;&#x91CD;&#x8981;&#x7684;&#x662F;&#xFF0C;&#x6CA1;&#x6709;&#x4F7F;&#x7528; @angular/element &#x8FD9;&#x4E2A;&#x5E93;&#x3002;</p><p>&#x5F53;&#x7136;&#xFF0C;&#x4E0D;&#x8981;&#x8BEF;&#x89E3; &#x2014;&#x2014; Angular Elements &#x7684;&#x529F;&#x80FD;&#x5341;&#x5206;&#x5F3A;&#x5927;&#x3002;&#x6587;&#x7AE0;&#x4E2D;&#x6240;&#x6D89;&#x53CA;&#x7684;&#x6240;&#x6709;&#x5B9E;&#x73B0;&#x903B;&#x8F91;&#x5728; Angular Elements &#x90FD;&#x5DF2;&#x88AB;&#x62BD;&#x8C61;&#x5316;&#xFF0C;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x5E93;&#x53EF;&#x4EE5;&#x4F7F;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x66F4;&#x4F18;&#x96C5;&#xFF0C;&#x53EF;&#x8BFB;&#x6027;&#x548C;&#x7EF4;&#x62A4;&#x6027;&#x4E5F;&#x66F4;&#x597D;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x66F4;&#x6613;&#x4E8E;&#x6269;&#x5C55;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x662F;&#x5173;&#x4E8E; Angular Elements &#x4E2D;&#x4E00;&#x4E9B;&#x6A21;&#x5757;&#x7684;&#x6982;&#x8981;&#x4EE5;&#x53CA;&#x5B83;&#x4EEC;&#x4E0E;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x7684;&#x5173;&#x8054;&#x6027;&#xFF1A;</p><ul><li><a href="https://github.com/angular/angular/blob/master/packages/elements/src/create-custom-element.ts" rel="nofollow noreferrer" target="_blank">create-custom-element.ts</a>&#xFF1A;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x5B9E;&#x73B0;&#x4E86;&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#x8BA8;&#x8BBA;&#x7684;&#x5173;&#x4E8E; Custom Element &#x7684;&#x51E0;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x540C;&#x65F6;&#x5B83;&#x8FD8;&#x4F1A;&#x521D;&#x59CB;&#x5316;&#x4E00;&#x4E2A; NgElementStrategy &#x7B56;&#x7565;&#x7C7B;&#xFF0C;&#x8FD9;&#x4E2A;&#x7C7B;&#x4F1A;&#x4F5C;&#x4E3A;&#x8FDE;&#x63A5; Angular Component &#x548C; Custom Elements &#x7684;&#x6865;&#x6881;&#x3002;&#x5F53;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x4EC5;&#x6709;&#x4E00;&#x4E2A;&#x7B56;&#x7565; &#x2014;&#x2014; <code>component-factory-strategy.ts</code> &#x2014;&#x2014; &#x5B83;&#x7684;&#x8FD0;&#x4F5C;&#x673A;&#x5236;&#x4E0E;&#x672C;&#x6587;&#x4F8B;&#x5B50;&#x4E2D;&#x6F14;&#x793A;&#x7684;&#x5927;&#x540C;&#x5C0F;&#x5F02;&#x3002;&#x5728;&#x5C06;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x5176;&#x4ED6;&#x7B56;&#x7565;&#xFF0C;&#x5E76;&#x4E14;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x81EA;&#x5B9A;&#x4E49;&#x7B56;&#x7565;&#x3002;</li><li><a href="https://github.com/angular/angular/blob/master/packages/elements/src/component-factory-strategy.ts" rel="nofollow noreferrer" target="_blank">component-factory-strategy.ts</a>&#xFF1A;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x4F7F;&#x7528;&#x4E00;&#x4E2A; component &#x5DE5;&#x5382;&#x51FD;&#x6570;&#x6765;&#x521B;&#x5EFA;&#x548C;&#x9500;&#x6BC1;&#x7EC4;&#x4EF6;&#x5F15;&#x7528;&#x3002;&#x540C;&#x65F6;&#x5B83;&#x8FD8;&#x4F1A;&#x5728; input &#x6539;&#x53D8;&#x65F6;&#x89E6;&#x53D1;&#x810F;&#x68C0;&#x67E5;&#x3002;&#x8FD9;&#x4E2A;&#x8FD0;&#x4F5C;&#x8FC7;&#x7A0B;&#x5728;&#x4E0A;&#x6587;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#x4E5F;&#x6709;&#x88AB;&#x63D0;&#x53CA;&#x3002;</li></ul><p>&#x4E0B;&#x6B21;&#x6211;&#x4EEC;&#x5C06;&#x9610;&#x8FF0; Angular Elements &#x901A;&#x8FC7; Custom Events &#x8F93;&#x51FA;&#x4E8B;&#x4EF6;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular Elements 及其运作原理

## 原文链接
[https://segmentfault.com/a/1190000015647566](https://segmentfault.com/a/1190000015647566)

