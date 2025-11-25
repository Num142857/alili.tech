---
title: React 16.3来了：带着全新的Context API
hidden: true
categories: [reprint]
slug: 326ecab9
date: 2018-10-27 02:30:17
---

{{< raw >}}
<h2 id="articleHeader0">&#x6587;&#x7AE0;&#x6982;&#x89C8;</h2><p>React&#x5728;&#x7248;&#x672C;<code>16.3-alpha</code>&#x91CC;&#x5F15;&#x5165;&#x4E86;&#x65B0;&#x7684;Context API&#xFF0C;&#x793E;&#x533A;&#x4E00;&#x7247;&#x671F;&#x5F85;&#x4E4B;&#x58F0;&#x3002;&#x6211;&#x4EEC;&#x5148;&#x901A;&#x8FC7;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x770B;&#x4E0B;&#x65B0;&#x7684;Context API&#x957F;&#x5565;&#x6837;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x7B80;&#x5355;&#x63A2;&#x8BA8;&#x4E0B;&#x65B0;&#x7684;API&#x7684;&#x610F;&#x4E49;&#x3002;</p><p>&#x6587;&#x4E2D;&#x7684;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x793A;&#x4F8B;&#x53EF;&#x5728;&#x7B14;&#x8005;&#x7684;GitHub&#x4E0A;&#x627E;&#x5230;&#xFF0C;<a href="https://github.com/chyingp/blog/tree/master/demo/2018.02.08-react-16.3" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x4F20;&#x9001;&#x95E8;</a>&#x3002;</p><h2 id="articleHeader1">&#x770B;&#x4E0B;&#x65B0;&#x7684;Context API</h2><p>&#x9700;&#x8981;&#x5B89;&#x88C5;<code>16.3-alpha</code>&#x7248;&#x672C;&#x7684;react&#x3002;&#x6784;&#x5EFA;&#x6B65;&#x9AA4;&#x975E;&#x672C;&#x6587;&#x91CD;&#x70B9;&#xFF0C;&#x53EF;&#x53C2;&#x8003;&#x7B14;&#x8005;<a href="https://github.com/chyingp/blog/tree/master/demo/2018.02.08-react-16.3" rel="nofollow noreferrer" target="_blank">GitHub&#x4E0A;&#x7684;demo</a>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react@next react-dom@next" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install react@next react-dom@next</code></pre><p>&#x4E0B;&#x9762;&#xFF0C;&#x76F4;&#x63A5;&#x6765;&#x770B;&#x4EE3;&#x7801;&#xFF0C;&#x5982;&#x679C;&#x7528;&#x8FC7;<code>react-redux</code>&#x5E94;&#x8BE5;&#x4F1A;&#x89C9;&#x5F97;&#x5F88;&#x773C;&#x719F;&#x3002;</p><p>&#x9996;&#x5148;&#xFF0C;&#x521B;&#x5EFA;<code>context</code>&#x5B9E;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import ReactDOM from &apos;react-dom&apos;;

// &#x521B;&#x5EFA;context&#x5B9E;&#x4F8B;
const ThemeContext = React.createContext({
  background: &apos;red&apos;,
  color: &apos;white&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>;

<span class="hljs-comment">// &#x521B;&#x5EFA;context&#x5B9E;&#x4F8B;</span>
<span class="hljs-keyword">const</span> ThemeContext = React.createContext({
  <span class="hljs-attr">background</span>: <span class="hljs-string">&apos;red&apos;</span>,
  <span class="hljs-attr">color</span>: <span class="hljs-string">&apos;white&apos;</span>
});</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x5B9A;&#x4E49;<code>App</code>&#x7EC4;&#x4EF6;&#xFF0C;&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7528;&#x5230;&#x4E86;<code>Provider</code>&#x7EC4;&#x4EF6;&#xFF0C;&#x7C7B;&#x4F3C;<code>react-redux</code>&#x7684;<code>Provider</code>&#x7EC4;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends React.Component {

  render () {
    return (
      &lt;ThemeContext.Provider value={{background: &apos;green&apos;, color: &apos;white&apos;}}&gt;
        &lt;Header /&gt;
       &lt;/ThemeContext.Provider&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{

  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ThemeContext.Provider</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"{{"background:</span> &apos;<span class="hljs-attr">green</span>&apos;, <span class="hljs-attr">color:</span> &apos;<span class="hljs-attr">white</span>&apos;}}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeContext.Provider</span>&gt;</span>
    );
  }
}</span></code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x5B9A;&#x4E49;<code>Header</code>&#x3001;<code>Title</code>&#x7EC4;&#x4EF6;&#x3002;&#x6CE8;&#x610F;&#xFF1A;</p><ol><li><code>Title</code>&#x7EC4;&#x4EF6;&#x7528;&#x5230;&#x4E86;<code>Consumer</code>&#x7EC4;&#x4EF6;&#xFF0C;&#x8868;&#x793A;&#x8981;&#x6D88;&#x8D39;<code>Provider</code>&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#x3002;</li><li><code>Title</code>&#x7EC4;&#x4EF6;&#x662F;<code>App</code>&#x7684;<code>&#x5B59;</code>&#x7EC4;&#x4EF6;&#xFF0C;&#x4F46;&#x8DF3;&#x8FC7;&#x4E86;<code>Header</code>&#x6D88;&#x8D39;&#x6570;&#x636E;&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Header extends React.Component {
  render () {
    return (
      &lt;Title&gt;Hello React Context API&lt;/Title&gt;
    );
  }
}

class Title extends React.Component {
  render () {
    return (
      &lt;ThemeContext.Consumer&gt;
        {context =&gt; (
          &lt;h1 style={{background: context.background, color: context.color}}&gt;
            {this.props.children}
          &lt;/h1&gt;
        )}
      &lt;/ThemeContext.Consumer&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Header</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Title</span>&gt;</span>Hello React Context API<span class="hljs-tag">&lt;/<span class="hljs-name">Title</span>&gt;</span></span>
    );
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Title</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ThemeContext.Consumer</span>&gt;</span>
        {context =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"background:</span> <span class="hljs-attr">context.background</span>, <span class="hljs-attr">color:</span> <span class="hljs-attr">context.color</span>}}&gt;</span>
            {this.props.children}
          <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ThemeContext.Consumer</span>&gt;</span>
    );
  }
}</span></code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x5E38;&#x89C4;&#x64CD;&#x4F5C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
  &lt;App /&gt;, 
  document.getElementById(&apos;container&apos;)
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, 
  document.getElementById(&apos;container&apos;)
);</span></code></pre><p>&#x770B;&#x4E0B;&#x7A0B;&#x5E8F;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000013229508?w=934&amp;h=296" src="https://static.alili.tech/img/remote/1460000013229508?w=934&amp;h=296" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">&#x4E3A;&#x4EC0;&#x4E48;&#x6709;&#x65B0;&#x7684;Context API</h2><p>&#x7528;&#x8FC7;<code>redux + react-redux</code>&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x5E94;&#x8BE5;&#x4F1A;&#x89C9;&#x5F97;&#x65B0;&#x7684;Context API&#x5F88;&#x773C;&#x719F;&#x3002;&#x800C;&#x6709;&#x770B;&#x8FC7;<code>react-redux</code>&#x6E90;&#x7801;&#x7684;&#x540C;&#x5B66;&#x5C31;&#x77E5;&#x9053;&#xFF0C;<code>react-redux</code>&#x672C;&#x8EAB;&#x5C31;&#x662F;&#x57FA;&#x4E8E;&#x65E7;&#x7248;&#x672C;&#x7684;Context API&#x5B9E;&#x73B0;&#x7684;&#x3002;</p><p>&#x65E2;&#x7136;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x73B0;&#x6210;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD8;&#x4F1A;&#x6709;&#x65B0;&#x7684;Context API&#x5462;&#xFF1F;</p><ol><li>&#x73B0;&#x6709;Context API&#x7684;&#x5B9E;&#x73B0;&#x5B58;&#x5728;&#x4E00;&#x5B9A;&#x95EE;&#x9898;&#xFF1A;&#x6BD4;&#x5982;&#x5F53;&#x7236;&#x7EC4;&#x4EF6;&#x7684;<code>shouldComponentUpdate</code>&#x6027;&#x80FD;&#x4F18;&#x5316;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x5BFC;&#x81F4;&#x6D88;&#x8D39;&#x4E86;context&#x6570;&#x636E;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x4E0D;&#x66F4;&#x65B0;&#x3002;</li><li>&#x964D;&#x4F4E;&#x590D;&#x6742;&#x5EA6;&#xFF1A;&#x7C7B;&#x4F3C;redux&#x5168;&#x5BB6;&#x6876;&#x8FD9;&#x6837;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x7ED9;&#x9879;&#x76EE;&#x5F15;&#x5165;&#x4E86;&#x4E00;&#x5B9A;&#x7684;&#x590D;&#x6742;&#x5EA6;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x5BF9;&#x65B9;&#x6848;&#x4E86;&#x89E3;&#x4E0D;&#x8DB3;&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x9047;&#x5230;&#x95EE;&#x9898;&#x53EF;&#x80FD;&#x4E00;&#x7B79;&#x83AB;&#x5C55;&#x3002;&#x65B0;Context API&#x7684;&#x5F15;&#x5165;&#xFF0C;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#x53EF;&#x4EE5;&#x4E0D;&#x5C11;&#x9879;&#x76EE;&#x5BF9;redux&#x5168;&#x5BB6;&#x6876;&#x7684;&#x4F9D;&#x8D56;&#x3002;</li></ol><h2 id="articleHeader3">&#x5199;&#x5728;&#x540E;&#x9762;</h2><p>&#x65B0;&#x7684;Context API&#xFF0C;&#x4E2A;&#x4EBA;&#x5BF9;&#x4E8E;&#x6027;&#x80FD;&#x4E0A;&#x7684;&#x63D0;&#x5347;&#x66F4;&#x52A0;&#x671F;&#x5F85;&#x4E9B;&#x3002;&#x81F3;&#x4E8E;&#x964D;&#x4F4E;&#x590D;&#x6742;&#x5EA6;&#x3001;&#x53D6;&#x4EE3;redux&#x4E4B;&#x7C7B;&#x7684;&#xFF0C;&#x4E0D;&#x662F;&#x6211;&#x5173;&#x6CE8;&#x7684;&#x91CD;&#x70B9;&#x3002;&#x4E0B;&#x4E00;&#x6B65;&#x7684;&#x8BA1;&#x5212;&#x5C31;&#x662F;&#x591A;&#x6784;&#x9020;&#x70B9;&#x7528;&#x4F8B;&#x6765;&#x8FDB;&#x884C;&#x5BF9;&#x6BD4;&#x6D4B;&#x8BD5;&#x3002;</p><p>&#x66F4;&#x591A;&#x5185;&#x5BB9;&#xFF0C;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x516C;&#x4F17;&#x53F7;&#xFF0C;&#x540E;&#x7EED;&#x8FDB;&#x884C;&#x66F4;&#x65B0;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000013229509?w=344&amp;h=344" src="https://static.alili.tech/img/remote/1460000013229509?w=344&amp;h=344" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader4">&#x76F8;&#x5173;&#x94FE;&#x63A5;</h2><p><a href="https://github.com/chyingp/blog/tree/master/demo/2018.02.08-react-16.3" rel="nofollow noreferrer" target="_blank">&#x672C;&#x6587;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x793A;&#x4F8B;</a></p><p><a href="https://github.com/reactjs/rfcs/blob/master/text/0002-new-version-of-context.md" rel="nofollow noreferrer" target="_blank">React&#x65B0;&#x7684;Context API&#x7684;RFC</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 16.3来了：带着全新的Context API

## 原文链接
[https://segmentfault.com/a/1190000013203396](https://segmentfault.com/a/1190000013203396)

