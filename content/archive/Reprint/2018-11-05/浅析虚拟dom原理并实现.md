---
title: 浅析虚拟dom原理并实现
reprint: true
categories: reprint
abbrlink: 12dd96bd
date: 2018-11-05 02:30:10
---

{{% raw %}}
<h3 id="articleHeader0">&#x80CC;&#x666F;</h3><p>&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x5728;&#x7F51;&#x9875;&#x4E2D;&#x6D4F;&#x89C8;&#x5668;&#x8D44;&#x6E90;&#x5F00;&#x9500;&#x6700;&#x5927;&#x4FBF;&#x662F;DOM&#x8282;&#x70B9;&#x4E86;&#xFF0C;DOM&#x5F88;&#x6162;&#x5E76;&#x4E14;&#x975E;&#x5E38;&#x5E9E;&#x5927;&#xFF0C;&#x7F51;&#x9875;&#x6027;&#x80FD;&#x95EE;&#x9898;&#x5927;&#x591A;&#x6570;&#x90FD;&#x662F;&#x6709;JavaScript&#x4FEE;&#x6539;DOM&#x6240;&#x5F15;&#x8D77;&#x7684;&#x3002;&#x6211;&#x4EEC;&#x4F7F;&#x7528;Javascript&#x6765;&#x64CD;&#x7EB5;DOM&#xFF0C;&#x64CD;&#x4F5C;&#x6548;&#x7387;&#x5F80;&#x5F80;&#x5F88;&#x4F4E;&#xFF0C;&#x7531;&#x4E8E;DOM&#x88AB;&#x8868;&#x793A;&#x4E3A;&#x6811;&#x7ED3;&#x6784;&#xFF0C;&#x6BCF;&#x6B21;DOM&#x4E2D;&#x7684;&#x67D0;&#x4E9B;&#x5185;&#x5BB9;&#x90FD;&#x4F1A;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x56E0;&#x6B64;&#x5BF9;DOM&#x7684;&#x66F4;&#x6539;&#x975E;&#x5E38;&#x5FEB;&#xFF0C;&#x4F46;&#x66F4;&#x6539;&#x540E;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x4E14;&#x5B83;&#x7684;&#x5B50;&#x9879;&#x5FC5;&#x987B;&#x7ECF;&#x8FC7;Reflow / Layout&#x9636;&#x6BB5;&#xFF0C;&#x7136;&#x540E;&#x6D4F;&#x89C8;&#x5668;&#x5FC5;&#x987B;&#x91CD;&#x65B0;&#x7ED8;&#x5236;&#x66F4;&#x6539;&#xFF0C;&#x8FD9;&#x5F88;&#x6162;&#x7684;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x56DE;&#x6D41;/&#x91CD;&#x7ED8;&#x7684;&#x6B21;&#x6570;&#x8D8A;&#x591A;&#xFF0C;&#x60A8;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5C31;&#x8D8A;&#x5361;&#x987F;&#x3002;&#x4F46;&#x662F;&#xFF0C;Javascript&#x8FD0;&#x884C;&#x901F;&#x5EA6;&#x5F88;&#x5FEB;&#xFF0C;&#x865A;&#x62DF;DOM&#x662F;&#x653E;&#x5728;JS &#x548C; HTML&#x4E2D;&#x95F4;&#x7684;&#x4E00;&#x4E2A;&#x5C42;&#x3002;&#x5B83;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x65B0;&#x65E7;DOM&#x7684;&#x5BF9;&#x6BD4;&#xFF0C;&#x6765;&#x83B7;&#x53D6;&#x5BF9;&#x6BD4;&#x4E4B;&#x540E;&#x7684;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x6709;&#x9488;&#x5BF9;&#x6027;&#x7684;&#x628A;&#x5DEE;&#x5F02;&#x90E8;&#x5206;&#x771F;&#x6B63;&#x5730;&#x6E32;&#x67D3;&#x5230;&#x9875;&#x9762;&#x4E0A;&#xFF0C;&#x4ECE;&#x800C;&#x51CF;&#x5C11;&#x5B9E;&#x9645;DOM&#x64CD;&#x4F5C;&#xFF0C;&#x6700;&#x7EC8;&#x8FBE;&#x5230;&#x6027;&#x80FD;&#x4F18;&#x5316;&#x7684;&#x76EE;&#x7684;&#x3002;</p><h3 id="articleHeader1">&#x865A;&#x62DF;dom&#x539F;&#x7406;&#x6D41;&#x7A0B;</h3><p>&#x7B80;&#x5355;&#x6982;&#x62EC;&#x6709;&#x4E09;&#x70B9;&#xFF1A;</p><ol><li>&#x7528;JavaScript&#x6A21;&#x62DF;DOM&#x6811;&#xFF0C;&#x5E76;&#x6E32;&#x67D3;&#x8FD9;&#x4E2A;DOM&#x6811;</li><li>&#x6BD4;&#x8F83;&#x65B0;&#x8001;DOM&#x6811;&#xFF0C;&#x5F97;&#x5230;&#x6BD4;&#x8F83;&#x7684;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;</li><li>&#x628A;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x5E94;&#x7528;&#x5230;&#x6E32;&#x67D3;&#x7684;DOM&#x6811;&#x3002;</li></ol><p>&#x4E0B;&#x9762;&#x662F;&#x6D41;&#x7A0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh0ZL?w=1346&amp;h=952" src="https://static.alili.tech/img/bVbh0ZL?w=1346&amp;h=952" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x7528;&#x4EE3;&#x7801;&#x4E00;&#x6B65;&#x6B65;&#x53BB;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x6D41;&#x7A0B;&#x56FE;</p><h3 id="articleHeader2">&#x7528;JavaScript&#x6A21;&#x62DF;DOM&#x6811;&#x5E76;&#x6E32;&#x67D3;&#x5230;&#x9875;&#x9762;&#x4E0A;</h3><p>&#x5176;&#x5B9E;&#x865A;&#x62DF;DOM&#xFF0C;&#x5C31;&#x662F;&#x7528;JS&#x5BF9;&#x8C61;&#x7ED3;&#x6784;&#x7684;&#x4E00;&#x79CD;&#x6620;&#x5C04;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4E00;&#x6B65;&#x6B65;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x3002;</p><p>&#x6211;&#x4EEC;&#x7528;JS&#x5F88;&#x5BB9;&#x6613;&#x6A21;&#x62DF;&#x4E00;&#x4E2A;DOM&#x6811;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x4F8B;&#x5982;&#x7528;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x51FD;&#x6570;<code>createEl(tagName, props, children)</code>&#x6765;&#x521B;&#x5EFA;DOM&#x7ED3;&#x6784;&#x3002;</p><blockquote><code>tagName</code>&#x6807;&#x7B7E;&#x540D;&#x3001;<code>props</code>&#x662F;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#x3001;<code>children</code>&#x662F;&#x5B50;&#x8282;&#x70B9;&#x3002;</blockquote><p>&#x7136;&#x540E;&#x6E32;&#x67D3;&#x5230;&#x9875;&#x9762;&#x4E0A;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createEl = (tagName, props, children) =&gt; new CreactEl(tagName, props, children)

const vdom = createEl(&apos;div&apos;, { &apos;id&apos;: &apos;box&apos; }, [
  createEl(&apos;h1&apos;, { style: &apos;color: pink&apos; }, [&apos;I am H1&apos;]),
  createEl(&apos;ul&apos;, {class: &apos;list&apos;}, [createEl(&apos;li&apos;, [&apos;#list1&apos;]), createEl(&apos;li&apos;, [&apos;#list2&apos;])]),
  createEl(&apos;p&apos;, [&apos;I am p&apos;])
])

const rootnode = vdom.render()
document.body.appendChild(rootnode)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> createEl = <span class="hljs-function">(<span class="hljs-params">tagName, props, children</span>) =&gt;</span> <span class="hljs-keyword">new</span> CreactEl(tagName, props, children)

<span class="hljs-keyword">const</span> vdom = createEl(<span class="hljs-string">&apos;div&apos;</span>, { <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-string">&apos;box&apos;</span> }, [
  createEl(<span class="hljs-string">&apos;h1&apos;</span>, { <span class="hljs-attr">style</span>: <span class="hljs-string">&apos;color: pink&apos;</span> }, [<span class="hljs-string">&apos;I am H1&apos;</span>]),
  createEl(<span class="hljs-string">&apos;ul&apos;</span>, {<span class="hljs-attr">class</span>: <span class="hljs-string">&apos;list&apos;</span>}, [createEl(<span class="hljs-string">&apos;li&apos;</span>, [<span class="hljs-string">&apos;#list1&apos;</span>]), createEl(<span class="hljs-string">&apos;li&apos;</span>, [<span class="hljs-string">&apos;#list2&apos;</span>])]),
  createEl(<span class="hljs-string">&apos;p&apos;</span>, [<span class="hljs-string">&apos;I am p&apos;</span>])
])

<span class="hljs-keyword">const</span> rootnode = vdom.render()
<span class="hljs-built_in">document</span>.body.appendChild(rootnode)</code></pre><p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x8C03;&#x7528;<code>vdom.render()</code>&#x8FD9;&#x6837;&#x5B50;&#x6211;&#x4EEC;&#x5C31;&#x5F88;&#x597D;&#x7684;&#x6784;&#x5EFA;&#x4E86;&#x5982;&#x4E0B;&#x6240;&#x793A;&#x7684;&#x4E00;&#x4E2A;DOM&#x6811;&#xFF0C;&#x7136;&#x540E;&#x6E32;&#x67D3;&#x5230;&#x9875;&#x9762;&#x4E0A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;div id=&quot;box&quot;&gt;
  &lt;h1 style=&quot;color: pink;&quot;&gt;I am H1&lt;/h1&gt;
  &lt;ul class=&quot;list&quot;&gt;
    &lt;li&gt;#list1&lt;/li&gt;
    &lt;li&gt;#list2&lt;/li&gt;
  &lt;/ul&gt;
  &lt;p&gt;I am p&lt;/p&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;color: pink;&quot;</span>&gt;</span>I am H1<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>#list1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>#list2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>I am p<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x770B;&#x770B;CreactEl.js&#x4EE3;&#x7801;&#x6D41;&#x7A0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import { setAttr } from &apos;./utils&apos;
class CreateEl {
  constructor (tagName, props, children) {
    // &#x5F53;&#x53EA;&#x6709;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x65F6;&#x5019; &#x4F8B;&#x5982; celement(el, [123])
    if (Array.isArray(props)) {
      children = props
      props = {}
    }
    // tagName, props, children&#x6570;&#x636E;&#x4FDD;&#x5B58;&#x5230;this&#x5BF9;&#x8C61;&#x4E0A;
    this.tagName = tagName
    this.props = props || {}
    this.children = children || []
    this.key = props ? props.key : undefined

    let count = 0
    this.children.forEach(child =&gt; {
      if (child instanceof CreateEl) {
        count += child.count
      } else {
        child = &apos;&apos; + child
      }
      count++
    })
    // &#x7ED9;&#x6BCF;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;count
    this.count = count
  }
  // &#x6784;&#x5EFA;&#x4E00;&#x4E2A; dom &#x6811;
  render () {
    // &#x521B;&#x5EFA;dom
    const el = document.createElement(this.tagName)
    const props = this.props
    // &#x5FAA;&#x73AF;&#x6240;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x7136;&#x540E;&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;
    for (let [key, val] of Object.entries(props)) {
      setAttr(el, key, val)
    }
    this.children.forEach(child =&gt; {
      // &#x9012;&#x5F52;&#x5FAA;&#x73AF; &#x6784;&#x5EFA;tree
      let childEl = (child instanceof CreateEl) ? child.render() : document.createTextNode(child)
      el.appendChild(childEl)
    })
    return el
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">import</span> { setAttr } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./utils&apos;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CreateEl</span> </span>{
  <span class="hljs-keyword">constructor</span> (tagName, props, children) {
    <span class="hljs-comment">// &#x5F53;&#x53EA;&#x6709;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x65F6;&#x5019; &#x4F8B;&#x5982; celement(el, [123])</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(props)) {
      children = props
      props = {}
    }
    <span class="hljs-comment">// tagName, props, children&#x6570;&#x636E;&#x4FDD;&#x5B58;&#x5230;this&#x5BF9;&#x8C61;&#x4E0A;</span>
    <span class="hljs-keyword">this</span>.tagName = tagName
    <span class="hljs-keyword">this</span>.props = props || {}
    <span class="hljs-keyword">this</span>.children = children || []
    <span class="hljs-keyword">this</span>.key = props ? props.key : <span class="hljs-literal">undefined</span>

    <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>
    <span class="hljs-keyword">this</span>.children.forEach(<span class="hljs-function"><span class="hljs-params">child</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (child <span class="hljs-keyword">instanceof</span> CreateEl) {
        count += child.count
      } <span class="hljs-keyword">else</span> {
        child = <span class="hljs-string">&apos;&apos;</span> + child
      }
      count++
    })
    <span class="hljs-comment">// &#x7ED9;&#x6BCF;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;count</span>
    <span class="hljs-keyword">this</span>.count = count
  }
  <span class="hljs-comment">// &#x6784;&#x5EFA;&#x4E00;&#x4E2A; dom &#x6811;</span>
  render () {
    <span class="hljs-comment">// &#x521B;&#x5EFA;dom</span>
    <span class="hljs-keyword">const</span> el = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-keyword">this</span>.tagName)
    <span class="hljs-keyword">const</span> props = <span class="hljs-keyword">this</span>.props
    <span class="hljs-comment">// &#x5FAA;&#x73AF;&#x6240;&#x6709;&#x5C5E;&#x6027;&#xFF0C;&#x7136;&#x540E;&#x8BBE;&#x7F6E;&#x5C5E;&#x6027;</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [key, val] <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.entries(props)) {
      setAttr(el, key, val)
    }
    <span class="hljs-keyword">this</span>.children.forEach(<span class="hljs-function"><span class="hljs-params">child</span> =&gt;</span> {
      <span class="hljs-comment">// &#x9012;&#x5F52;&#x5FAA;&#x73AF; &#x6784;&#x5EFA;tree</span>
      <span class="hljs-keyword">let</span> childEl = (child <span class="hljs-keyword">instanceof</span> CreateEl) ? child.render() : <span class="hljs-built_in">document</span>.createTextNode(child)
      el.appendChild(childEl)
    })
    <span class="hljs-keyword">return</span> el
  }
}
</code></pre><p>&#x4E0A;&#x9762;<code>render</code>&#x51FD;&#x6570;&#x7684;&#x529F;&#x80FD;&#x662F;&#x628A;&#x8282;&#x70B9;&#x521B;&#x5EFA;&#x597D;&#xFF0C;&#x7136;&#x540E;&#x8BBE;&#x7F6E;&#x8282;&#x70B9;&#x5C5E;&#x6027;&#xFF0C;&#x6700;&#x540E;&#x9012;&#x5F52;&#x521B;&#x5EFA;&#x3002;&#x8FD9;&#x6837;&#x5B50;&#x6211;&#x4EEC;&#x5C31;&#x5F97;&#x5230;&#x4E00;&#x4E2A;DOM&#x6811;&#xFF0C;&#x7136;&#x540E;&#x63D2;&#x5165;(appendChild)&#x5230;&#x9875;&#x9762;&#x4E0A;&#x3002;</p><h3 id="articleHeader3">&#x6BD4;&#x8F83;&#x65B0;&#x8001;dom&#x6811;&#xFF0C;&#x5F97;&#x5230;&#x6BD4;&#x8F83;&#x7684;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;</h3><p>&#x4E0A;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;DOM&#x6811;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4E0D;&#x540C;&#x7684;DOM&#x6811;&#xFF0C;&#x7136;&#x540E;&#x505A;&#x6BD4;&#x8F83;&#xFF0C;&#x5F97;&#x5230;&#x6BD4;&#x8F83;&#x7684;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x3002;</p><p>&#x6BD4;&#x8F83;&#x4E24;&#x68F5;DOM&#x6811;&#x7684;&#x5DEE;&#x5F02;&#xFF0C;&#x662F;&#x865A;&#x62DF;DOM&#x7684;&#x6700;&#x6838;&#x5FC3;&#x90E8;&#x5206;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x4EBA;&#x4EEC;&#x5E38;&#x8BF4;&#x7684;&#x865A;&#x62DF;DOM&#x7684;diff&#x7B97;&#x6CD5;&#xFF0C;&#x4E24;&#x9897;&#x5B8C;&#x5168;&#x7684;&#x6811;&#x5DEE;&#x5F02;&#x6BD4;&#x8F83;&#x4E00;&#x4E2A;&#x65F6;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x4E3A; O(n^3)&#x3002;&#x4F46;&#x662F;&#x5728;&#x6211;&#x4EEC;&#x7684;web&#x4E2D;&#x5F88;&#x5C11;&#x7528;&#x5230;&#x8DE8;&#x5C42;&#x7EA7;DOM&#x6811;&#x7684;&#x6BD4;&#x8F83;&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x4E2A;&#x5C42;&#x7EA7;&#x8DDF;&#x4E00;&#x4E2A;&#x5C42;&#x7EA7;&#x5BF9;&#x6BD4;&#xFF0C;&#x8FD9;&#x6837;&#x7B97;&#x6CD5;&#x590D;&#x6742;&#x5EA6;&#x5C31;&#x53EF;&#x4EE5;&#x8FBE;&#x5230; O(n)&#x3002;&#x5982;&#x4E0B;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/bVbh0ZX?w=1784&amp;h=898" src="https://static.alili.tech/img/bVbh0ZX?w=1784&amp;h=898" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5176;&#x5B9E;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x4ECE;&#x6839;&#x8282;&#x70B9;&#x5F00;&#x59CB;&#x6807;&#x5FD7;&#x904D;&#x5386;&#xFF0C;&#x904D;&#x5386;&#x7684;&#x65F6;&#x5019;&#x628A;&#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x7684;&#x5DEE;&#x5F02;(&#x5305;&#x62EC;&#x6587;&#x672C;&#x4E0D;&#x540C;&#xFF0C;&#x5C5E;&#x6027;&#x4E0D;&#x540C;&#xFF0C;&#x8282;&#x70B9;&#x4E0D;&#x540C;)&#x8BB0;&#x5F55;&#x4FDD;&#x5B58;&#x8D77;&#x6765;&#x3002;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh0Z0?w=1374&amp;h=1046" src="https://static.alili.tech/img/bVbh0Z0?w=1374&amp;h=1046" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4E24;&#x4E2A;&#x8282;&#x70B9;&#x4E4B;&#x95F4;&#x7684;&#x5DEE;&#x5F02;&#x6709;&#x603B;&#x7ED3;&#x8D77;&#x6765;&#x6709;&#x4E0B;&#x9762;4&#x79CD;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0 &#x76F4;&#x63A5;&#x66FF;&#x6362;&#x539F;&#x6709;&#x8282;&#x70B9;
1 &#x8C03;&#x6574;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x5305;&#x62EC;&#x79FB;&#x52A8;&#x3001;&#x5220;&#x9664;&#x7B49;
2 &#x4FEE;&#x6539;&#x8282;&#x70B9;&#x5C5E;&#x6027;
3 &#x4FEE;&#x6539;&#x8282;&#x70B9;&#x6587;&#x672C;&#x5185;&#x5BB9;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs basic"><code><span class="hljs-symbol">0 </span>&#x76F4;&#x63A5;&#x66FF;&#x6362;&#x539F;&#x6709;&#x8282;&#x70B9;
<span class="hljs-symbol">1 </span>&#x8C03;&#x6574;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x5305;&#x62EC;&#x79FB;&#x52A8;&#x3001;&#x5220;&#x9664;&#x7B49;
<span class="hljs-symbol">2 </span>&#x4FEE;&#x6539;&#x8282;&#x70B9;&#x5C5E;&#x6027;
<span class="hljs-symbol">3 </span>&#x4FEE;&#x6539;&#x8282;&#x70B9;&#x6587;&#x672C;&#x5185;&#x5BB9;</code></pre><p>&#x5982;&#x4E0B;&#x9762;&#x4E24;&#x68F5;&#x6811;&#x6BD4;&#x8F83;&#xFF0C;&#x628A;&#x5DEE;&#x5F02;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbh0Z5?w=1790&amp;h=898" src="https://static.alili.tech/img/bVbh0Z5?w=1790&amp;h=898" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4E3B;&#x8981;&#x662F;&#x7B80;&#x5386;&#x4E00;&#x4E2A;&#x904D;&#x5386;index&#xFF08;&#x770B;&#x56FE;3&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x4ECE;&#x6839;&#x8282;&#x70B9;&#x5F00;&#x59CB;&#x6BD4;&#x8F83;&#xFF0C;&#x6BD4;&#x8F83;&#x4E07;&#x4E4B;&#x540E;&#x8BB0;&#x5F55;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#xFF0C;&#x7EE7;&#x7EED;&#x4ECE;&#x5DE6;&#x5B50;&#x6811;&#x6BD4;&#x8F83;&#xFF0C;&#x8BB0;&#x5F55;&#x5DEE;&#x5F02;&#xFF0C;&#x4E00;&#x76F4;&#x904D;&#x5386;&#x4E0B;&#x53BB;&#x3002;&#x4E3B;&#x8981;&#x6D41;&#x7A0B;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// &#x8FD9;&#x662F;&#x6BD4;&#x8F83;&#x4E24;&#x4E2A;&#x6811;&#x627E;&#x5230;&#x6700;&#x5C0F;&#x79FB;&#x52A8;&#x91CF;&#x7684;&#x7B97;&#x6CD5;&#x662F;Levenshtein&#x8DDD;&#x79BB;&#xFF0C;&#x5373;O&#xFF08;n * m)
// &#x5177;&#x4F53;&#x8BF7;&#x770B; https://www.npmjs.com/package/list-diff2
import listDiff from &apos;list-diff2&apos;
// &#x6BD4;&#x8F83;&#x4E24;&#x68F5;&#x6811;
function diff (oldTree, newTree) {
  // &#x8282;&#x70B9;&#x7684;&#x904D;&#x5386;&#x987A;&#x5E8F;
  let index = 0
  // &#x5728;&#x904D;&#x5386;&#x8FC7;&#x7A0B;&#x4E2D;&#x8BB0;&#x5F55;&#x8282;&#x70B9;&#x7684;&#x5DEE;&#x5F02;
  let patches = {}
  // &#x6DF1;&#x5EA6;&#x4F18;&#x5148;&#x904D;&#x5386;&#x4E24;&#x68F5;&#x6811;
  deepTraversal(oldTree, newTree, index, patches)
  // &#x5F97;&#x5230;&#x7684;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x8FD4;&#x56DE;&#x51FA;&#x53BB;
  return patches
}

function deepTraversal(oldNode, newNode, index, patches) {
  let currentPatch = []
  // ...&#x4E2D;&#x95F4;&#x6709;&#x5F88;&#x591A;&#x5BF9;patches&#x7684;&#x5904;&#x7406;
  // &#x9012;&#x5F52;&#x6BD4;&#x8F83;&#x5B50;&#x8282;&#x70B9;&#x662F;&#x5426;&#x76F8;&#x540C;
  diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
  if (currentPatch.length) {
    // &#x90A3;&#x4E2A;index&#x8282;&#x70B9;&#x7684;&#x5DEE;&#x5F02;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;
    patches[index] = currentPatch
  }
}

// &#x5B50;&#x6570;&#x7684;diff
function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
  const diffs = listDiff(oldChildren, newChildren)
  newChildren = diffs.children
  // ...&#x7701;&#x7565;&#x8BB0;&#x5F55;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;
  let leftNode = null
  let currentNodeIndex = index
  oldChildren.forEach((child, i) =&gt; {
    const newChild = newChildren[i]
    // index&#x76F8;&#x52A0;
    currentNodeIndex = (leftNode &amp;&amp; leftNode.count) ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1
    // &#x6DF1;&#x5EA6;&#x904D;&#x5386;&#xFF0C;&#x9012;&#x5F52;
    deepTraversal(child, newChild, currentNodeIndex, patches)
    // &#x4ECE;&#x5DE6;&#x6811;&#x5F00;&#x59CB;
    leftNode = child
  })
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">// &#x8FD9;&#x662F;&#x6BD4;&#x8F83;&#x4E24;&#x4E2A;&#x6811;&#x627E;&#x5230;&#x6700;&#x5C0F;&#x79FB;&#x52A8;&#x91CF;&#x7684;&#x7B97;&#x6CD5;&#x662F;Levenshtein&#x8DDD;&#x79BB;&#xFF0C;&#x5373;O&#xFF08;n * m)</span>
<span class="hljs-comment">// &#x5177;&#x4F53;&#x8BF7;&#x770B; https://www.npmjs.com/package/list-diff2</span>
<span class="hljs-keyword">import</span> listDiff <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;list-diff2&apos;</span>
<span class="hljs-comment">// &#x6BD4;&#x8F83;&#x4E24;&#x68F5;&#x6811;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diff</span> (<span class="hljs-params">oldTree, newTree</span>) </span>{
  <span class="hljs-comment">// &#x8282;&#x70B9;&#x7684;&#x904D;&#x5386;&#x987A;&#x5E8F;</span>
  <span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>
  <span class="hljs-comment">// &#x5728;&#x904D;&#x5386;&#x8FC7;&#x7A0B;&#x4E2D;&#x8BB0;&#x5F55;&#x8282;&#x70B9;&#x7684;&#x5DEE;&#x5F02;</span>
  <span class="hljs-keyword">let</span> patches = {}
  <span class="hljs-comment">// &#x6DF1;&#x5EA6;&#x4F18;&#x5148;&#x904D;&#x5386;&#x4E24;&#x68F5;&#x6811;</span>
  deepTraversal(oldTree, newTree, index, patches)
  <span class="hljs-comment">// &#x5F97;&#x5230;&#x7684;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x8FD4;&#x56DE;&#x51FA;&#x53BB;</span>
  <span class="hljs-keyword">return</span> patches
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepTraversal</span>(<span class="hljs-params">oldNode, newNode, index, patches</span>) </span>{
  <span class="hljs-keyword">let</span> currentPatch = []
  <span class="hljs-comment">// ...&#x4E2D;&#x95F4;&#x6709;&#x5F88;&#x591A;&#x5BF9;patches&#x7684;&#x5904;&#x7406;</span>
  <span class="hljs-comment">// &#x9012;&#x5F52;&#x6BD4;&#x8F83;&#x5B50;&#x8282;&#x70B9;&#x662F;&#x5426;&#x76F8;&#x540C;</span>
  diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
  <span class="hljs-keyword">if</span> (currentPatch.length) {
    <span class="hljs-comment">// &#x90A3;&#x4E2A;index&#x8282;&#x70B9;&#x7684;&#x5DEE;&#x5F02;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;</span>
    patches[index] = currentPatch
  }
}

<span class="hljs-comment">// &#x5B50;&#x6570;&#x7684;diff</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffChildren</span> (<span class="hljs-params">oldChildren, newChildren, index, patches, currentPatch</span>) </span>{
  <span class="hljs-keyword">const</span> diffs = listDiff(oldChildren, newChildren)
  newChildren = diffs.children
  <span class="hljs-comment">// ...&#x7701;&#x7565;&#x8BB0;&#x5F55;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;</span>
  <span class="hljs-keyword">let</span> leftNode = <span class="hljs-literal">null</span>
  <span class="hljs-keyword">let</span> currentNodeIndex = index
  oldChildren.forEach(<span class="hljs-function">(<span class="hljs-params">child, i</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> newChild = newChildren[i]
    <span class="hljs-comment">// index&#x76F8;&#x52A0;</span>
    currentNodeIndex = (leftNode &amp;&amp; leftNode.count) ? currentNodeIndex + leftNode.count + <span class="hljs-number">1</span> : currentNodeIndex + <span class="hljs-number">1</span>
    <span class="hljs-comment">// &#x6DF1;&#x5EA6;&#x904D;&#x5386;&#xFF0C;&#x9012;&#x5F52;</span>
    deepTraversal(child, newChild, currentNodeIndex, patches)
    <span class="hljs-comment">// &#x4ECE;&#x5DE6;&#x6811;&#x5F00;&#x59CB;</span>
    leftNode = child
  })
}
</code></pre><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x8C03;&#x7528;&#x5B8C;<code>diff(tree, newTree)</code>&#x7B49;&#x5230;&#x6700;&#x540E;&#x7684;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{
  &quot;1&quot;: [
    {
      &quot;type&quot;: 0,
      &quot;node&quot;: {
        &quot;tagName&quot;: &quot;h3&quot;,
        &quot;props&quot;: {
          &quot;style&quot;: &quot;color: green&quot;
        },
        &quot;children&quot;: [
          &quot;I am H1&quot;
        ],
        &quot;count&quot;: 1
      }
    }
  ]
  ...
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">
{
  <span class="hljs-string">&quot;1&quot;</span>: [
    {
      <span class="hljs-string">&quot;type&quot;</span>: <span class="hljs-number">0</span>,
      <span class="hljs-string">&quot;node&quot;</span>: {
        <span class="hljs-string">&quot;tagName&quot;</span>: <span class="hljs-string">&quot;h3&quot;</span>,
        <span class="hljs-string">&quot;props&quot;</span>: {
          <span class="hljs-string">&quot;style&quot;</span>: <span class="hljs-string">&quot;color: green&quot;</span>
        },
        <span class="hljs-string">&quot;children&quot;</span>: [
          <span class="hljs-string">&quot;I am H1&quot;</span>
        ],
        <span class="hljs-string">&quot;count&quot;</span>: <span class="hljs-number">1</span>
      }
    }
  ]
  ...
}
</code></pre><p><code>key</code>&#x662F;&#x4EE3;&#x8868;&#x90A3;&#x4E2A;&#x8282;&#x70B9;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x662F;&#x7B2C;&#x4E8C;&#x4E2A;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;<code>h1</code>&#x4F1A;&#x6539;&#x53D8;&#x6210;<code>h3</code>&#xFF0C;&#x8FD8;&#x6709;&#x7701;&#x7565;&#x7684;&#x4E24;&#x4E2A;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x4EE3;&#x7801;&#x6CA1;&#x6709;&#x8D34;&#x51FA;&#x6765;~~</p><p>&#x7136;&#x540E;&#x770B;&#x4E0B;diff.js&#x7684;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#xFF0C;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import listDiff from &apos;list-diff2&apos;
// &#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x6709;&#x56DB;&#x79CD;&#x53D8;&#x52A8;
export const REPLACE = 0 // &#x66FF;&#x6362;&#x539F;&#x6709;&#x8282;&#x70B9;
export const REORDER = 1 // &#x8C03;&#x6574;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x5305;&#x62EC;&#x79FB;&#x52A8;&#x3001;&#x5220;&#x9664;&#x7B49;
export const PROPS = 2 // &#x4FEE;&#x6539;&#x8282;&#x70B9;&#x5C5E;&#x6027;
export const TEXT = 3 // &#x4FEE;&#x6539;&#x8282;&#x70B9;&#x6587;&#x672C;&#x5185;&#x5BB9;

export function diff (oldTree, newTree) {
  // &#x8282;&#x70B9;&#x7684;&#x904D;&#x5386;&#x987A;&#x5E8F;
  let index = 0
  // &#x5728;&#x904D;&#x5386;&#x8FC7;&#x7A0B;&#x4E2D;&#x8BB0;&#x5F55;&#x8282;&#x70B9;&#x7684;&#x5DEE;&#x5F02;
  let patches = {}
  // &#x6DF1;&#x5EA6;&#x4F18;&#x5148;&#x904D;&#x5386;&#x4E24;&#x68F5;&#x6811;
  deepTraversal(oldTree, newTree, index, patches)
  // &#x5F97;&#x5230;&#x7684;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x8FD4;&#x56DE;&#x51FA;&#x53BB;
  return patches
}

function deepTraversal(oldNode, newNode, index, patches) {
  let currentPatch = []
  if (newNode === null) { // &#x5982;&#x679C;&#x65B0;&#x8282;&#x70B9;&#x6CA1;&#x6709;&#x7684;&#x8BDD;&#x76F4;&#x63A5;&#x4E0D;&#x7528;&#x6BD4;&#x8F83;&#x4E86;
    return
  }
  if (typeof oldNode === &apos;string&apos; &amp;&amp; typeof newNode === &apos;string&apos;) {
    // &#x6BD4;&#x8F83;&#x6587;&#x672C;&#x8282;&#x70B9;
    if (oldNode !== newNode) {
      currentPatch.push({
        type: TEXT,
        content: newNode
      })
    }
  } else if (oldNode.tagName === newNode.tagName &amp;&amp; oldNode.key === newNode.key) {
    // &#x8282;&#x70B9;&#x7C7B;&#x578B;&#x76F8;&#x540C;
    // &#x6BD4;&#x8F83;&#x8282;&#x70B9;&#x7684;&#x5C5E;&#x6027;&#x662F;&#x5426;&#x76F8;&#x540C;
    let propasPatches = diffProps(oldNode, newNode)
    if (propasPatches) {
      currentPatch.push({
        type: PROPS,
        props: propsPatches
      })
    }
    // &#x9012;&#x5F52;&#x6BD4;&#x8F83;&#x5B50;&#x8282;&#x70B9;&#x662F;&#x5426;&#x76F8;&#x540C;
    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
  } else {
    // &#x8282;&#x70B9;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x76F4;&#x63A5;&#x66FF;&#x6362;
    currentPatch.push({ type: REPLACE, node: newNode })
  }

  if (currentPatch.length) {
    // &#x90A3;&#x4E2A;index&#x8282;&#x70B9;&#x7684;&#x5DEE;&#x5F02;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;
    patches[index] = currentPatch
  }

}

// &#x5B50;&#x6570;&#x7684;diff
function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
  var diffs = listDiff(oldChildren, newChildren)
  newChildren = diffs.children
  // &#x5982;&#x679C;&#x8C03;&#x6574;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x5305;&#x62EC;&#x79FB;&#x52A8;&#x3001;&#x5220;&#x9664;&#x7B49;&#x7684;&#x8BDD;
  if (diffs.moves.length) {
    var reorderPatch = {
      type: REORDER,
      moves: diffs.moves
    }
    currentPatch.push(reorderPatch)
  }

  var leftNode = null
  var currentNodeIndex = index
  oldChildren.forEach((child, i) =&gt; {
    var newChild = newChildren[i]
    // index&#x76F8;&#x52A0;
    currentNodeIndex = (leftNode &amp;&amp; leftNode.count) ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1
    // &#x6DF1;&#x5EA6;&#x904D;&#x5386;&#xFF0C;&#x4ECE;&#x5DE6;&#x6811;&#x5F00;&#x59CB;
    deepTraversal(child, newChild, currentNodeIndex, patches)
    // &#x4ECE;&#x5DE6;&#x6811;&#x5F00;&#x59CB;
    leftNode = child
  })
}

// &#x8BB0;&#x5F55;&#x5C5E;&#x6027;&#x7684;&#x5DEE;&#x5F02;
function diffProps (oldNode, newNode) {
  let count = 0 // &#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x6709;&#x6CA1;&#x6CA1;&#x6709;&#x5C5E;&#x6027;&#x53D8;&#x66F4;&#x7684;&#x6807;&#x5FD7;
  const oldProps = oldNode.props
  const newProps = newNode.props
  const propsPatches = {}

  // &#x627E;&#x51FA;&#x4E0D;&#x540C;&#x7684;&#x5C5E;&#x6027;
  for (let [key, val] of Object.entries(oldProps)) {
    // &#x65B0;&#x7684;&#x4E0D;&#x7B49;&#x4E8E;&#x65E7;&#x7684;
    if (newProps[key] !== val) {
      count++
      propsPatches[key] = newProps[key]
    }
  }
  // &#x627E;&#x51FA;&#x65B0;&#x589E;&#x7684;&#x5C5E;&#x6027;
  for (let [key, val] of Object.entries(newProps)) {
    if (!oldProps.hasOwnProperty(key)) {
      count++
      propsPatches[key] = val
    }
  }
  // &#x6CA1;&#x6709;&#x65B0;&#x589E; &#x4E5F;&#x6CA1;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x5C5E;&#x6027; &#x76F4;&#x63A5;&#x8FD4;&#x56DE;null
  if (count === 0) {
    return null
  }

  return propsPatches
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">import</span> listDiff <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;list-diff2&apos;</span>
<span class="hljs-comment">// &#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x6709;&#x56DB;&#x79CD;&#x53D8;&#x52A8;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> REPLACE = <span class="hljs-number">0</span> <span class="hljs-comment">// &#x66FF;&#x6362;&#x539F;&#x6709;&#x8282;&#x70B9;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> REORDER = <span class="hljs-number">1</span> <span class="hljs-comment">// &#x8C03;&#x6574;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x5305;&#x62EC;&#x79FB;&#x52A8;&#x3001;&#x5220;&#x9664;&#x7B49;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> PROPS = <span class="hljs-number">2</span> <span class="hljs-comment">// &#x4FEE;&#x6539;&#x8282;&#x70B9;&#x5C5E;&#x6027;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TEXT = <span class="hljs-number">3</span> <span class="hljs-comment">// &#x4FEE;&#x6539;&#x8282;&#x70B9;&#x6587;&#x672C;&#x5185;&#x5BB9;</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diff</span> (<span class="hljs-params">oldTree, newTree</span>) </span>{
  <span class="hljs-comment">// &#x8282;&#x70B9;&#x7684;&#x904D;&#x5386;&#x987A;&#x5E8F;</span>
  <span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>
  <span class="hljs-comment">// &#x5728;&#x904D;&#x5386;&#x8FC7;&#x7A0B;&#x4E2D;&#x8BB0;&#x5F55;&#x8282;&#x70B9;&#x7684;&#x5DEE;&#x5F02;</span>
  <span class="hljs-keyword">let</span> patches = {}
  <span class="hljs-comment">// &#x6DF1;&#x5EA6;&#x4F18;&#x5148;&#x904D;&#x5386;&#x4E24;&#x68F5;&#x6811;</span>
  deepTraversal(oldTree, newTree, index, patches)
  <span class="hljs-comment">// &#x5F97;&#x5230;&#x7684;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x8FD4;&#x56DE;&#x51FA;&#x53BB;</span>
  <span class="hljs-keyword">return</span> patches
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepTraversal</span>(<span class="hljs-params">oldNode, newNode, index, patches</span>) </span>{
  <span class="hljs-keyword">let</span> currentPatch = []
  <span class="hljs-keyword">if</span> (newNode === <span class="hljs-literal">null</span>) { <span class="hljs-comment">// &#x5982;&#x679C;&#x65B0;&#x8282;&#x70B9;&#x6CA1;&#x6709;&#x7684;&#x8BDD;&#x76F4;&#x63A5;&#x4E0D;&#x7528;&#x6BD4;&#x8F83;&#x4E86;</span>
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> oldNode === <span class="hljs-string">&apos;string&apos;</span> &amp;&amp; <span class="hljs-keyword">typeof</span> newNode === <span class="hljs-string">&apos;string&apos;</span>) {
    <span class="hljs-comment">// &#x6BD4;&#x8F83;&#x6587;&#x672C;&#x8282;&#x70B9;</span>
    <span class="hljs-keyword">if</span> (oldNode !== newNode) {
      currentPatch.push({
        <span class="hljs-attr">type</span>: TEXT,
        <span class="hljs-attr">content</span>: newNode
      })
    }
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (oldNode.tagName === newNode.tagName &amp;&amp; oldNode.key === newNode.key) {
    <span class="hljs-comment">// &#x8282;&#x70B9;&#x7C7B;&#x578B;&#x76F8;&#x540C;</span>
    <span class="hljs-comment">// &#x6BD4;&#x8F83;&#x8282;&#x70B9;&#x7684;&#x5C5E;&#x6027;&#x662F;&#x5426;&#x76F8;&#x540C;</span>
    <span class="hljs-keyword">let</span> propasPatches = diffProps(oldNode, newNode)
    <span class="hljs-keyword">if</span> (propasPatches) {
      currentPatch.push({
        <span class="hljs-attr">type</span>: PROPS,
        <span class="hljs-attr">props</span>: propsPatches
      })
    }
    <span class="hljs-comment">// &#x9012;&#x5F52;&#x6BD4;&#x8F83;&#x5B50;&#x8282;&#x70B9;&#x662F;&#x5426;&#x76F8;&#x540C;</span>
    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// &#x8282;&#x70B9;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x76F4;&#x63A5;&#x66FF;&#x6362;</span>
    currentPatch.push({ <span class="hljs-attr">type</span>: REPLACE, <span class="hljs-attr">node</span>: newNode })
  }

  <span class="hljs-keyword">if</span> (currentPatch.length) {
    <span class="hljs-comment">// &#x90A3;&#x4E2A;index&#x8282;&#x70B9;&#x7684;&#x5DEE;&#x5F02;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;</span>
    patches[index] = currentPatch
  }

}

<span class="hljs-comment">// &#x5B50;&#x6570;&#x7684;diff</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffChildren</span> (<span class="hljs-params">oldChildren, newChildren, index, patches, currentPatch</span>) </span>{
  <span class="hljs-keyword">var</span> diffs = listDiff(oldChildren, newChildren)
  newChildren = diffs.children
  <span class="hljs-comment">// &#x5982;&#x679C;&#x8C03;&#x6574;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x5305;&#x62EC;&#x79FB;&#x52A8;&#x3001;&#x5220;&#x9664;&#x7B49;&#x7684;&#x8BDD;</span>
  <span class="hljs-keyword">if</span> (diffs.moves.length) {
    <span class="hljs-keyword">var</span> reorderPatch = {
      <span class="hljs-attr">type</span>: REORDER,
      <span class="hljs-attr">moves</span>: diffs.moves
    }
    currentPatch.push(reorderPatch)
  }

  <span class="hljs-keyword">var</span> leftNode = <span class="hljs-literal">null</span>
  <span class="hljs-keyword">var</span> currentNodeIndex = index
  oldChildren.forEach(<span class="hljs-function">(<span class="hljs-params">child, i</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> newChild = newChildren[i]
    <span class="hljs-comment">// index&#x76F8;&#x52A0;</span>
    currentNodeIndex = (leftNode &amp;&amp; leftNode.count) ? currentNodeIndex + leftNode.count + <span class="hljs-number">1</span> : currentNodeIndex + <span class="hljs-number">1</span>
    <span class="hljs-comment">// &#x6DF1;&#x5EA6;&#x904D;&#x5386;&#xFF0C;&#x4ECE;&#x5DE6;&#x6811;&#x5F00;&#x59CB;</span>
    deepTraversal(child, newChild, currentNodeIndex, patches)
    <span class="hljs-comment">// &#x4ECE;&#x5DE6;&#x6811;&#x5F00;&#x59CB;</span>
    leftNode = child
  })
}

<span class="hljs-comment">// &#x8BB0;&#x5F55;&#x5C5E;&#x6027;&#x7684;&#x5DEE;&#x5F02;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffProps</span> (<span class="hljs-params">oldNode, newNode</span>) </span>{
  <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span> <span class="hljs-comment">// &#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x6709;&#x6CA1;&#x6CA1;&#x6709;&#x5C5E;&#x6027;&#x53D8;&#x66F4;&#x7684;&#x6807;&#x5FD7;</span>
  <span class="hljs-keyword">const</span> oldProps = oldNode.props
  <span class="hljs-keyword">const</span> newProps = newNode.props
  <span class="hljs-keyword">const</span> propsPatches = {}

  <span class="hljs-comment">// &#x627E;&#x51FA;&#x4E0D;&#x540C;&#x7684;&#x5C5E;&#x6027;</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [key, val] <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.entries(oldProps)) {
    <span class="hljs-comment">// &#x65B0;&#x7684;&#x4E0D;&#x7B49;&#x4E8E;&#x65E7;&#x7684;</span>
    <span class="hljs-keyword">if</span> (newProps[key] !== val) {
      count++
      propsPatches[key] = newProps[key]
    }
  }
  <span class="hljs-comment">// &#x627E;&#x51FA;&#x65B0;&#x589E;&#x7684;&#x5C5E;&#x6027;</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [key, val] <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.entries(newProps)) {
    <span class="hljs-keyword">if</span> (!oldProps.hasOwnProperty(key)) {
      count++
      propsPatches[key] = val
    }
  }
  <span class="hljs-comment">// &#x6CA1;&#x6709;&#x65B0;&#x589E; &#x4E5F;&#x6CA1;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x5C5E;&#x6027; &#x76F4;&#x63A5;&#x8FD4;&#x56DE;null</span>
  <span class="hljs-keyword">if</span> (count === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
  }

  <span class="hljs-keyword">return</span> propsPatches
}
</code></pre><p>&#x5F97;&#x5230;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x4E4B;&#x540E;&#xFF0C;&#x5269;&#x4E0B;&#x5C31;&#x662F;&#x628A;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x5E94;&#x7528;&#x5230;&#x6211;&#x4EEC;&#x7684;dom&#x8282;&#x70B9;&#x4E0A;&#x9762;&#x4E86;&#x3002;</p><h3 id="articleHeader4">&#x628A;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x5E94;&#x7528;&#x5230;&#x6E32;&#x67D3;&#x7684;dom&#x6811;</h3><p>&#x5230;&#x4E86;&#x8FD9;&#x91CC;&#x5176;&#x5B9E;&#x5C31;&#x7B80;&#x5355;&#x591A;&#x4E86;&#x3002;&#x6211;&#x4EEC;&#x4E0A;&#x9762;&#x5F97;&#x5230;&#x7684;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x4E4B;&#x540E;&#xFF0C;&#x7136;&#x540E;&#x9009;&#x62E9;&#x540C;&#x6837;&#x7684;&#x6DF1;&#x5EA6;&#x904D;&#x5386;&#xFF0C;&#x5982;&#x679C;&#x90A3;&#x4E2A;&#x8282;&#x70B9;&#x6709;&#x5DEE;&#x5F02;&#x7684;&#x8BDD;&#xFF0C;&#x5224;&#x65AD;&#x662F;&#x4E0A;&#x9762;4&#x79CD;&#x4E2D;&#x7684;&#x54EA;&#x4E00;&#x79CD;&#xFF0C;&#x6839;&#x636E;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x8FD9;&#x4E2A;&#x8282;&#x70B9;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function patch (node, patches) {
  // &#x4E5F;&#x662F;&#x4ECE;0&#x5F00;&#x59CB;
  const step = {
    index: 0
  }
  // &#x6DF1;&#x5EA6;&#x904D;&#x5386;
  deepTraversal(node, step, patches)
}

// &#x6DF1;&#x5EA6;&#x4F18;&#x5148;&#x904D;&#x5386;dom&#x7ED3;&#x6784;
function deepTraversal(node, step, patches) {
  // &#x62FF;&#x5230;&#x5F53;&#x524D;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;
  const currentPatches = patches[step.index]
  const len = node.childNodes ? node.childNodes.length : 0
  for (let i = 0; i &lt; len; i++) {
    const child = node.childNodes[i]
    step.index++
    deepTraversal(child, step, patches)
  }
  //&#x5982;&#x679C;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x5B58;&#x5728;&#x5DEE;&#x5F02;
  if (currentPatches) {
    // &#x628A;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x5E94;&#x7528;&#x5230;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x4E0A;
    applyPatches(node, currentPatches)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patch</span> (<span class="hljs-params">node, patches</span>) </span>{
  <span class="hljs-comment">// &#x4E5F;&#x662F;&#x4ECE;0&#x5F00;&#x59CB;</span>
  <span class="hljs-keyword">const</span> step = {
    <span class="hljs-attr">index</span>: <span class="hljs-number">0</span>
  }
  <span class="hljs-comment">// &#x6DF1;&#x5EA6;&#x904D;&#x5386;</span>
  deepTraversal(node, step, patches)
}

<span class="hljs-comment">// &#x6DF1;&#x5EA6;&#x4F18;&#x5148;&#x904D;&#x5386;dom&#x7ED3;&#x6784;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepTraversal</span>(<span class="hljs-params">node, step, patches</span>) </span>{
  <span class="hljs-comment">// &#x62FF;&#x5230;&#x5F53;&#x524D;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;</span>
  <span class="hljs-keyword">const</span> currentPatches = patches[step.index]
  <span class="hljs-keyword">const</span> len = node.childNodes ? node.childNodes.length : <span class="hljs-number">0</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
    <span class="hljs-keyword">const</span> child = node.childNodes[i]
    step.index++
    deepTraversal(child, step, patches)
  }
  <span class="hljs-comment">//&#x5982;&#x679C;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x5B58;&#x5728;&#x5DEE;&#x5F02;</span>
  <span class="hljs-keyword">if</span> (currentPatches) {
    <span class="hljs-comment">// &#x628A;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x5E94;&#x7528;&#x5230;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x4E0A;</span>
    applyPatches(node, currentPatches)
  }
}</code></pre><p>&#x8FD9;&#x6837;&#x5B50;&#xFF0C;&#x8C03;&#x7528;<code>patch(rootnode, patches)</code>&#x5C31;&#x76F4;&#x63A5;&#x6709;&#x9488;&#x5BF9;&#x6027;&#x7684;&#x6539;&#x53D8;&#x6709;&#x5DEE;&#x5F02;&#x7684;&#x8282;&#x70B9;&#x4E86;&#x3002;</p><p>path.js&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {REPLACE, REORDER, PROPS, TEXT} from &apos;./diff&apos;
import { setAttr } from &apos;./utils&apos;

export function patch (node, patches) {
  // &#x4E5F;&#x662F;&#x4ECE;0&#x5F00;&#x59CB;
  const step = {
    index: 0
  }
  // &#x6DF1;&#x5EA6;&#x904D;&#x5386;
  deepTraversal(node, step, patches)
}

// &#x6DF1;&#x5EA6;&#x4F18;&#x5148;&#x904D;&#x5386;dom&#x7ED3;&#x6784;
function deepTraversal(node, step, patches) {
  // &#x62FF;&#x5230;&#x5F53;&#x524D;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;
  const currentPatches = patches[step.index]
  const len = node.childNodes ? node.childNodes.length : 0
  for (let i = 0; i &lt; len; i++) {
    const child = node.childNodes[i]
    step.index++
    deepTraversal(child, step, patches)
  }
  //&#x5982;&#x679C;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x5B58;&#x5728;&#x5DEE;&#x5F02;
  if (currentPatches) {
    // &#x628A;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x5E94;&#x7528;&#x5230;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x4E0A;
    applyPatches(node, currentPatches)
  }
}

// &#x628A;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x5E94;&#x7528;&#x5230;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x4E0A;
function applyPatches(node, currentPatches) {
  currentPatches.forEach(currentPatch =&gt; {
    switch (currentPatch.type) {
      // 0: &#x66FF;&#x6362;&#x539F;&#x6709;&#x8282;&#x70B9;
      case REPLACE:
        var newNode = (typeof currentPatch.node === &apos;string&apos;) ?  document.createTextNode(currentPatch.node) : currentPatch.node.render()
        node.parentNode.replaceChild(newNode, node)
        break
      // 1: &#x8C03;&#x6574;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x5305;&#x62EC;&#x79FB;&#x52A8;&#x3001;&#x5220;&#x9664;&#x7B49;
      case REORDER: 
        moveChildren(node, currentPatch.moves)
        break
      // 2: &#x4FEE;&#x6539;&#x8282;&#x70B9;&#x5C5E;&#x6027;
      case PROPS:
        for (let [key, val] of Object.entries(currentPatch.props)) {
          if (val === undefined) {
            node.removeAttribute(key)
          } else {
            setAttr(node, key, val)
          }
        }
        break;
      // 3&#xFF1A;&#x4FEE;&#x6539;&#x8282;&#x70B9;&#x6587;&#x672C;&#x5185;&#x5BB9;
      case TEXT:
        if (node.textContent) {
          node.textContent = currentPatch.content
        } else {
          node.nodeValue = currentPatch.content
        }
        break;
      default: 
        throw new Error(&apos;Unknow patch type &apos; + currentPatch.type);
    }
  })
}

// &#x8C03;&#x6574;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x5305;&#x62EC;&#x79FB;&#x52A8;&#x3001;&#x5220;&#x9664;&#x7B49;
function moveChildren (node, moves) {
  let staticNodelist = Array.from(node.childNodes)
  const maps = {}
  staticNodelist.forEach(node =&gt; {
    if (node.nodeType === 1) {
      const key = node.getAttribute(&apos;key&apos;)
      if (key) {
        maps[key] = node
      }
    }
  })
  moves.forEach(move =&gt; {
    const index = move.index
    if (move.type === 0) { // &#x53D8;&#x52A8;&#x7C7B;&#x578B;&#x4E3A;&#x5220;&#x9664;&#x7684;&#x8282;&#x70B9;
      if (staticNodeList[index] === node.childNodes[index]) {
        node.removeChild(node.childNodes[index]);
      }
      staticNodeList.splice(index, 1);
    } else {
      let insertNode = maps[move.item.key] 
          ? maps[move.item.key] : (typeof move.item === &apos;object&apos;) 
          ? move.item.render() : document.createTextNode(move.item)
      staticNodelist.splice(index, 0, insertNode);
      node.insertBefore(insertNode, node.childNodes[index] || null)
    }
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {REPLACE, REORDER, PROPS, TEXT} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./diff&apos;</span>
<span class="hljs-keyword">import</span> { setAttr } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./utils&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patch</span> (<span class="hljs-params">node, patches</span>) </span>{
  <span class="hljs-comment">// &#x4E5F;&#x662F;&#x4ECE;0&#x5F00;&#x59CB;</span>
  <span class="hljs-keyword">const</span> step = {
    <span class="hljs-attr">index</span>: <span class="hljs-number">0</span>
  }
  <span class="hljs-comment">// &#x6DF1;&#x5EA6;&#x904D;&#x5386;</span>
  deepTraversal(node, step, patches)
}

<span class="hljs-comment">// &#x6DF1;&#x5EA6;&#x4F18;&#x5148;&#x904D;&#x5386;dom&#x7ED3;&#x6784;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deepTraversal</span>(<span class="hljs-params">node, step, patches</span>) </span>{
  <span class="hljs-comment">// &#x62FF;&#x5230;&#x5F53;&#x524D;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;</span>
  <span class="hljs-keyword">const</span> currentPatches = patches[step.index]
  <span class="hljs-keyword">const</span> len = node.childNodes ? node.childNodes.length : <span class="hljs-number">0</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
    <span class="hljs-keyword">const</span> child = node.childNodes[i]
    step.index++
    deepTraversal(child, step, patches)
  }
  <span class="hljs-comment">//&#x5982;&#x679C;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x5B58;&#x5728;&#x5DEE;&#x5F02;</span>
  <span class="hljs-keyword">if</span> (currentPatches) {
    <span class="hljs-comment">// &#x628A;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x5E94;&#x7528;&#x5230;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x4E0A;</span>
    applyPatches(node, currentPatches)
  }
}

<span class="hljs-comment">// &#x628A;&#x5DEE;&#x5F02;&#x5BF9;&#x8C61;&#x5E94;&#x7528;&#x5230;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x4E0A;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyPatches</span>(<span class="hljs-params">node, currentPatches</span>) </span>{
  currentPatches.forEach(<span class="hljs-function"><span class="hljs-params">currentPatch</span> =&gt;</span> {
    <span class="hljs-keyword">switch</span> (currentPatch.type) {
      <span class="hljs-comment">// 0: &#x66FF;&#x6362;&#x539F;&#x6709;&#x8282;&#x70B9;</span>
      <span class="hljs-keyword">case</span> REPLACE:
        <span class="hljs-keyword">var</span> newNode = (<span class="hljs-keyword">typeof</span> currentPatch.node === <span class="hljs-string">&apos;string&apos;</span>) ?  <span class="hljs-built_in">document</span>.createTextNode(currentPatch.node) : currentPatch.node.render()
        node.parentNode.replaceChild(newNode, node)
        <span class="hljs-keyword">break</span>
      <span class="hljs-comment">// 1: &#x8C03;&#x6574;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x5305;&#x62EC;&#x79FB;&#x52A8;&#x3001;&#x5220;&#x9664;&#x7B49;</span>
      <span class="hljs-keyword">case</span> REORDER: 
        moveChildren(node, currentPatch.moves)
        <span class="hljs-keyword">break</span>
      <span class="hljs-comment">// 2: &#x4FEE;&#x6539;&#x8282;&#x70B9;&#x5C5E;&#x6027;</span>
      <span class="hljs-keyword">case</span> PROPS:
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> [key, val] <span class="hljs-keyword">of</span> <span class="hljs-built_in">Object</span>.entries(currentPatch.props)) {
          <span class="hljs-keyword">if</span> (val === <span class="hljs-literal">undefined</span>) {
            node.removeAttribute(key)
          } <span class="hljs-keyword">else</span> {
            setAttr(node, key, val)
          }
        }
        <span class="hljs-keyword">break</span>;
      <span class="hljs-comment">// 3&#xFF1A;&#x4FEE;&#x6539;&#x8282;&#x70B9;&#x6587;&#x672C;&#x5185;&#x5BB9;</span>
      <span class="hljs-keyword">case</span> TEXT:
        <span class="hljs-keyword">if</span> (node.textContent) {
          node.textContent = currentPatch.content
        } <span class="hljs-keyword">else</span> {
          node.nodeValue = currentPatch.content
        }
        <span class="hljs-keyword">break</span>;
      <span class="hljs-keyword">default</span>: 
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;Unknow patch type &apos;</span> + currentPatch.type);
    }
  })
}

<span class="hljs-comment">// &#x8C03;&#x6574;&#x5B50;&#x8282;&#x70B9;&#xFF0C;&#x5305;&#x62EC;&#x79FB;&#x52A8;&#x3001;&#x5220;&#x9664;&#x7B49;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">moveChildren</span> (<span class="hljs-params">node, moves</span>) </span>{
  <span class="hljs-keyword">let</span> staticNodelist = <span class="hljs-built_in">Array</span>.from(node.childNodes)
  <span class="hljs-keyword">const</span> maps = {}
  staticNodelist.forEach(<span class="hljs-function"><span class="hljs-params">node</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (node.nodeType === <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">const</span> key = node.getAttribute(<span class="hljs-string">&apos;key&apos;</span>)
      <span class="hljs-keyword">if</span> (key) {
        maps[key] = node
      }
    }
  })
  moves.forEach(<span class="hljs-function"><span class="hljs-params">move</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> index = move.index
    <span class="hljs-keyword">if</span> (move.type === <span class="hljs-number">0</span>) { <span class="hljs-comment">// &#x53D8;&#x52A8;&#x7C7B;&#x578B;&#x4E3A;&#x5220;&#x9664;&#x7684;&#x8282;&#x70B9;</span>
      <span class="hljs-keyword">if</span> (staticNodeList[index] === node.childNodes[index]) {
        node.removeChild(node.childNodes[index]);
      }
      staticNodeList.splice(index, <span class="hljs-number">1</span>);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">let</span> insertNode = maps[move.item.key] 
          ? maps[move.item.key] : (<span class="hljs-keyword">typeof</span> move.item === <span class="hljs-string">&apos;object&apos;</span>) 
          ? move.item.render() : <span class="hljs-built_in">document</span>.createTextNode(move.item)
      staticNodelist.splice(index, <span class="hljs-number">0</span>, insertNode);
      node.insertBefore(insertNode, node.childNodes[index] || <span class="hljs-literal">null</span>)
    }
  })
}</code></pre><p>&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6700;&#x57FA;&#x672C;&#x7684;&#x865A;&#x62DF;DOM&#x539F;&#x7406;&#x5DF2;&#x7ECF;&#x8BB2;&#x5B8C;&#x4E86;&#xFF0C;&#x4E5F;&#x7B80;&#x5355;&#x4E86;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x865A;&#x62DF;DOM&#xFF0C;&#x5982;&#x679C;&#x672C;&#x6587;&#x6709;&#x4EC0;&#x4E48;&#x4E0D;&#x5BF9;&#x7684;&#x5730;&#x65B9;&#x8BF7;&#x6307;&#x6B63;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅析虚拟dom原理并实现

## 原文链接
[https://segmentfault.com/a/1190000016647776](https://segmentfault.com/a/1190000016647776)

