---
title: 'React + Ramda: 函数式编程尝鲜' 
date: 2018-11-24 2:30:10
hidden: true
slug: lpy5c2wyhe
categories: [reprint]
---

{{< raw >}}
<p>&#x539F;&#x6587;&#xFF1A;<a href="https://medium.com/@mirkomariani/functional-components-with-react-stateless-functions-and-ramda-e83e54fcd86b" rel="nofollow noreferrer" target="_blank">Functional Components with React stateless functions and Ramda</a></p><p>&#x9605;&#x8BFB;&#x672C;&#x6587;&#x9700;&#x8981;&#x7684;&#x77E5;&#x8BC6;&#x50A8;&#x5907;&#xFF1A;</p><ul><li>&#x51FD;&#x6570;&#x5F0F;&#x7F16;&#x7A0B;&#x57FA;&#x672C;&#x6982;&#x5FF5;&#xFF08;&#x7EC4;&#x5408;&#x3001;&#x67EF;&#x91CC;&#x5316;&#x3001;&#x900F;&#x955C;&#xFF09;</li><li>React &#x57FA;&#x672C;&#x77E5;&#x8BC6;&#xFF08;&#x7EC4;&#x4EF6;&#x3001;&#x72B6;&#x6001;&#x3001;&#x5C5E;&#x6027;&#x3001;JSX&#xFF09;</li><li>ES6 &#x57FA;&#x672C;&#x77E5;&#x8BC6;&#xFF08;class&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF09;</li></ul><h1 id="articleHeader0">React &#x65E0;&#x72B6;&#x6001;&#x51FD;&#x6570;</h1><p>React &#x7EC4;&#x4EF6;&#x6700;&#x5E38;&#x89C1;&#x7684;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const  List = React.createClass({
  render: function() {
    return (&lt;ul&gt;{this.props.children}&lt;/ul&gt;);
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span>  List = React.createClass({
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>{this.props.children}<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>);
  }
});</code></pre><p>&#x6216;&#x8005;&#x4F7F;&#x7528; ES6 &#x7C7B;&#x8BED;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class List extends React.Component {
  render() {
    return (&lt;ul&gt;{this.props.children}&lt;/ul&gt;);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">List</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>{this.props.children}<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>);
  }
}</code></pre><p>&#x53C8;&#x6216;&#x8005;&#x4F7F;&#x7528;&#x666E;&#x901A;&#x7684; JS &#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x65E0;&#x72B6;&#x6001;&#x51FD;&#x6570;&#x8BED;&#x6CD5;
const List = function(children) {
  return (&lt;ul&gt;{children}&lt;/ul&gt;);
};

//ES6 &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x8BED;&#x6CD5;
const List = (children) =&gt; (&lt;ul&gt;{children}&lt;/ul&gt;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x65E0;&#x72B6;&#x6001;&#x51FD;&#x6570;&#x8BED;&#x6CD5;</span>
<span class="hljs-keyword">const</span> List = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">children</span>) </span>{
  <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>);
};

<span class="hljs-comment">//ES6 &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x8BED;&#x6CD5;</span>
<span class="hljs-keyword">const</span> List = <span class="hljs-function">(<span class="hljs-params">children</span>) =&gt;</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>);</code></pre><p>React &#x5B98;&#x65B9;&#x6587;&#x6863;&#x5BF9;&#x8FD9;&#x79CD;&#x7EC4;&#x4EF6;&#x505A;&#x4E86;&#x4EE5;&#x4E0B;&#x8BF4;&#x660E;&#xFF1A;</p><blockquote>&#x8FD9;&#x79CD;&#x7B80;&#x5316;&#x7684;&#x7EC4;&#x4EF6; API &#x9002;&#x7528;&#x4E8E;&#x4EC5;&#x4F9D;&#x8D56;&#x5C5E;&#x6027;&#x7684;&#x7EAF;&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#x3002;&#x8FD9;&#x4E9B;&#x7EC4;&#x4EF6;&#x4E0D;&#x5141;&#x8BB8;&#x62E5;&#x6709;&#x5185;&#x90E8;&#x72B6;&#x6001;&#xFF0C;&#x4E0D;&#x4F1A;&#x751F;&#x6210;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF0C;&#x4E5F;&#x6CA1;&#x6709;&#x7EC4;&#x4EF6;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x65B9;&#x6CD5;&#x3002;&#x5B83;&#x4EEC;&#x53EA;&#x5BF9;&#x8F93;&#x5165;&#x8FDB;&#x884C;&#x7EAF;&#x51FD;&#x6570;&#x8F6C;&#x6362;&#x3002;&#x4E0D;&#x8FC7;&#x5F00;&#x53D1;&#x8005;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x4E3A;&#x5B83;&#x4EEC;&#x6307;&#x5B9A; <code>.propTypes</code> &#x548C; <code>.defaultProps</code>&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x4E3A;&#x51FD;&#x6570;&#x7684;&#x5C5E;&#x6027;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x5C31;&#x8DDF;&#x5728; ES6 &#x7C7B;&#x4E0A;&#x8BBE;&#x7F6E;&#x4E00;&#x6837;&#x3002;</blockquote><p>&#x540C;&#x65F6;&#x4E5F;&#x8BF4;&#x5230;&#xFF1A;</p><blockquote>&#x7406;&#x60F3;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5927;&#x90E8;&#x5206;&#x7684;&#x7EC4;&#x4EF6;&#x90FD;&#x5E94;&#x8BE5;&#x662F;&#x65E0;&#x72B6;&#x6001;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x672A;&#x6765;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x4F1A;&#x9488;&#x5BF9;&#x8FD9;&#x7C7B;&#x7EC4;&#x4EF6;&#x505A;&#x6027;&#x80FD;&#x4F18;&#x5316;&#xFF0C;&#x907F;&#x514D;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x68C0;&#x67E5;&#x548C;&#x5185;&#x5B58;&#x5206;&#x914D;&#x3002;&#x6240;&#x4EE5;&#x63A8;&#x8350;&#x5927;&#x5BB6;&#x5C3D;&#x53EF;&#x80FD;&#x7684;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#x6765;&#x5F00;&#x53D1;&#x3002;</blockquote><p>&#x662F;&#x4E0D;&#x662F;&#x89C9;&#x5F97;&#x633A;&#x6709;&#x8DA3;&#x7684;&#xFF1F;</p><p>React &#x793E;&#x533A;&#x4F3C;&#x4E4E;&#x66F4;&#x52A0;&#x5173;&#x6CE8;&#x901A;&#x8FC7; <code>class</code> &#x548C; <code>createClass</code> &#x65B9;&#x5F0F;&#x6765;&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#xFF0C;&#x4ECA;&#x5929;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x5C1D;&#x9C9C;&#x4E00;&#x4E0B;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x3002;</p><h1 id="articleHeader1">App &#x5BB9;&#x5668;</h1><p>&#x9996;&#x5148;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5F0F; App &#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B83;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x8868;&#x793A;<strong>&#x5E94;&#x7528;&#x72B6;&#x6001;</strong>&#x7684;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import ReactDOM from &apos;react-dom&apos;;

const App = appState =&gt; (&lt;div className=&quot;container&quot;&gt;
  &lt;h1&gt;App name&lt;/h1&gt;
  &lt;p&gt;Some children here...&lt;/p&gt;
&lt;/div&gt;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>;

<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">appState</span> =&gt;</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>App name<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some children here...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A; <code>render</code> &#x65B9;&#x6CD5;&#xFF0C;&#x4F5C;&#x4E3A; <code>App</code> &#x51FD;&#x6570;&#x7684;&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import ReactDOM from &apos;react-dom&apos;;
import R from &apos;ramda&apos;;

const App = appState =&gt; (&lt;div className=&quot;container&quot;&gt;
  &lt;h1&gt;App name&lt;/h1&gt;
  &lt;p&gt;Some children here...&lt;/p&gt;
&lt;/div&gt;);

App.render = R.curry((node, props) =&gt; ReactDOM.render(&lt;App {...props}/&gt;, node));

export default App;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>;
<span class="hljs-keyword">import</span> R <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;ramda&apos;</span>;

<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">appState</span> =&gt;</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>App name<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some children here...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);

App.render = R.curry(<span class="hljs-function">(<span class="hljs-params">node, props</span>) =&gt;</span> ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> {<span class="hljs-attr">...props</span>}/&gt;</span>, node));

export default App;</span></code></pre><p>&#x7B49;&#x7B49;&#xFF01;&#x6709;&#x70B9;&#x770B;&#x4E0D;&#x660E;&#x767D;&#x4E86;&#xFF01;<br>&#x4E3A;&#x4EC0;&#x4E48;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x67EF;&#x91CC;&#x5316;&#x7684;&#x6E32;&#x67D3;&#x51FD;&#x6570;&#xFF1F;&#x53C8;&#x4E3A;&#x4EC0;&#x4E48;&#x6E32;&#x67D3;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x987A;&#x5E8F;&#x53CD;&#x8FC7;&#x6765;&#x4E86;&#xFF1F;<br>&#x522B;&#x6025;&#x522B;&#x6025;&#xFF0C;&#x8FD9;&#x91CC;&#x552F;&#x4E00;&#x8981;&#x8BF4;&#x660E;&#x7684;&#x662F;&#xFF0C;&#x7531;&#x4E8E;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x72B6;&#x6001;&#x5FC5;&#x987B;&#x7531;&#x5176;&#x5B83;&#x5730;&#x65B9;&#x6765;&#x7EF4;&#x62A4;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x72B6;&#x6001;&#x5FC5;&#x987B;&#x7531;&#x5916;&#x90E8;&#x7EF4;&#x62A4;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x5C5E;&#x6027;&#x7684;&#x65B9;&#x5F0F;&#x4F20;&#x9012;&#x7ED9;&#x7EC4;&#x4EF6;&#x3002;<br>&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x5177;&#x4F53;&#x7684;&#x8BA1;&#x65F6;&#x5668;&#x4F8B;&#x5B50;&#x3002;</p><h1 id="articleHeader2">&#x65E0;&#x72B6;&#x6001;&#x8BA1;&#x65F6;&#x5668;&#x7EC4;&#x4EF6;</h1><p>&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x8BA1;&#x65F6;&#x5668;&#x7EC4;&#x4EF6;&#x53EA;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5C5E;&#x6027; <code>secondsElapsed</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;

export default ({ secondsElapsed }) =&gt; (&lt;div className=&quot;well&quot;&gt;
  Seconds Elapsed: {secondsElapsed}
&lt;/div&gt;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ({ secondsElapsed }) =&gt; (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;well&quot;</span>&gt;</span>
  Seconds Elapsed: {secondsElapsed}
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);</code></pre><p>&#x628A;&#x5B83;&#x6DFB;&#x52A0;&#x5230; <code>App</code> &#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import ReactDOM from &apos;react-dom&apos;;
import R from &apos;ramda&apos;;
import Timer from &apos;./timer&apos;;

const App = appState =&gt; (&lt;div className=&quot;container&quot;&gt;
  &lt;h1&gt;App name&lt;/h1&gt;
  &lt;Timer secondsElapsed={appState.secondsElapsed} /&gt;
&lt;/div&gt;);

App.render = R.curry((node, props) =&gt; ReactDOM.render(&lt;App {...props}/&gt;, node));

export default App;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>;
<span class="hljs-keyword">import</span> R <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;ramda&apos;</span>;
<span class="hljs-keyword">import</span> Timer <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./timer&apos;</span>;

<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">appState</span> =&gt;</span> (&lt;div className=&quot;container&quot;&gt;
  &lt;h1&gt;App name&lt;/h1&gt;
  &lt;Timer secondsElapsed={appState.secondsElapsed} /&gt;
&lt;/div&gt;);

App.render = R.curry((node, props) =&gt; ReactDOM.render(&lt;App {...props}/&gt;, node));

export default App;</code></pre><p>&#x6700;&#x540E;&#xFF0C;&#x521B;&#x5EFA; <code>main.js</code> &#x6765;&#x6E32;&#x67D3; <code>App</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import App from &apos;./components/app&apos;;
const render = App.render(document.getElementById(&apos;app&apos;));

let appState = {
  secondsElapsed: 0
};

//first render
render(appState);

setInterval(() =&gt; {
  appState.secondsElapsed++;
  render(appState);
}, 1000);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/app&apos;</span>;
<span class="hljs-keyword">const</span> render = App.render(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;app&apos;</span>));

<span class="hljs-keyword">let</span> appState = {
  <span class="hljs-attr">secondsElapsed</span>: <span class="hljs-number">0</span>
};

<span class="hljs-comment">//first render</span>
render(appState);

setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  appState.secondsElapsed++;
  render(appState);
}, <span class="hljs-number">1000</span>);</code></pre><p>&#x5728;&#x8FDB;&#x4E00;&#x6B65;&#x8BF4;&#x660E;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x60F3;&#x8BF4;&#xFF0C;<code>appState.secondElapsed++</code> &#x8FD9;&#x79CD;&#x4FEE;&#x6539;&#x72B6;&#x6001;&#x7684;&#x65B9;&#x5F0F;&#x8BA9;&#x6211;&#x89C9;&#x5F97;&#x975E;&#x5E38;&#x4E0D;&#x723D;&#xFF0C;&#x4E0D;&#x8FC7;&#x7A0D;&#x540E;&#x6211;&#x4EEC;&#x4F1A;&#x4F7F;&#x7528;&#x66F4;&#x597D;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5B9E;&#x73B0;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;<code>render</code> &#x5176;&#x5B9E;&#x5C31;&#x662F;&#x7528;&#x65B0;&#x5C5E;&#x6027;&#x6765;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#x3002;&#x4E0B;&#x9762;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const render = App.render(document.getElementById(&#x2018;app&#x2019;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> render = App.render(<span class="hljs-built_in">document</span>.getElementById(&#x2018;app&#x2019;));</code></pre><p>&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5177;&#x6709; <code>(props) =&gt; ReactDOM.render(...)</code> &#x51FD;&#x6570;&#x7B7E;&#x540D;&#x7684;&#x51FD;&#x6570;&#x3002;<br>&#x8FD9;&#x91CC;&#x5E76;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x592A;&#x96BE;&#x7406;&#x89E3;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x6BCF;&#x5F53; <code>secondsElapsed</code> &#x7684;&#x503C;&#x6539;&#x53D8;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x8C03;&#x7528; <code>render</code> &#x65B9;&#x6CD5;&#x5373;&#x53EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setInterval(() =&gt; {
  appState.secondsElapsed++;
  render(appState);
}, 1000);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  appState.secondsElapsed++;
  render(appState);
}, <span class="hljs-number">1000</span>);</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C; Redux &#x98CE;&#x683C;&#x7684;<strong>&#x5F52;&#x7EA6;</strong>&#x51FD;&#x6570;&#xFF0C;&#x4EE5;&#x4E0D;&#x65AD;&#x7684;&#x9012;&#x589E; <code>secondsElapsed</code>&#x3002;&#x5F52;&#x7EA6;&#x51FD;&#x6570;&#x662F;&#x4E0D;&#x5141;&#x8BB8;&#x4FEE;&#x6539;&#x5F53;&#x524D;&#x72B6;&#x6001;&#x7684;&#xFF0C;&#x6240;&#x6709;&#x6700;&#x7B80;&#x5355;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x5C31;&#x662F; <code>currentState -&gt; newState</code>&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4F7F;&#x7528; Ramda &#x7684;<strong>&#x900F;&#x955C;</strong>(Lens)&#x6765;&#x5B9E;&#x73B0; <code>incSecondsElapsed</code> &#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const secondsElapsedLens = R.lensProp(&apos;secondsElapsed&apos;);
const incSecondsElapsed = R.over(secondsElapsedLens, R.inc);

setInterval(() =&gt; {
  appState = incSecondsElapsed(appState);
  render(appState);
}, 1000);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> secondsElapsedLens = R.lensProp(<span class="hljs-string">&apos;secondsElapsed&apos;</span>);
<span class="hljs-keyword">const</span> incSecondsElapsed = R.over(secondsElapsedLens, R.inc);

setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  appState = incSecondsElapsed(appState);
  render(appState);
}, <span class="hljs-number">1000</span>);</code></pre><p>&#x7B2C;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x900F;&#x955C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const secondsElapsedLens = R.lensProp(&apos;secondsElapsed&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> secondsElapsedLens = R.lensProp(<span class="hljs-string">&apos;secondsElapsed&apos;</span>);</code></pre><p>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#xFF0C;&#x900F;&#x955C;&#x662F;&#x4E00;&#x79CD;&#x4E13;&#x6CE8;&#x4E8E;&#x7ED9;&#x5B9A;&#x5C5E;&#x6027;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x800C;&#x4E0D;&#x5173;&#x5FC3;&#x8BE5;&#x5C5E;&#x6027;&#x5230;&#x5E95;&#x662F;&#x5728;&#x54EA;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0A;&#xFF0C;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4FBF;&#x4E8E;&#x4EE3;&#x7801;&#x590D;&#x7528;&#x3002;&#x5F53;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x628A;&#x900F;&#x955C;&#x5E94;&#x7528;&#x4E8E;&#x5BF9;&#x8C61;&#x4E0A;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x6709;&#x4EE5;&#x4E0B;&#x64CD;&#x4F5C;&#xFF1A;</p><ul><li>View</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="R.view(secondsElapsedLens, { secondsElapsed: 10 });  //=&gt; 10" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">R.view(secondsElapsedLens, { <span class="hljs-attr">secondsElapsed</span>: <span class="hljs-number">10</span> });  <span class="hljs-comment">//=&gt; 10</span></code></pre><ul><li>Set</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="R.set(secondsElapsedLens, 11, { secondsElapsed: 10 });  //=&gt; 11" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">R.set(secondsElapsedLens, <span class="hljs-number">11</span>, { <span class="hljs-attr">secondsElapsed</span>: <span class="hljs-number">10</span> });  <span class="hljs-comment">//=&gt; 11</span></code></pre><ul><li>&#x4EE5;&#x7ED9;&#x5B9A;&#x51FD;&#x6570;&#x6765;&#x8BBE;&#x7F6E;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="R.over(secondsElapsedLens, R.inc, { secondsElapsed: 10 });  //=&gt; 11" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">R.over(secondsElapsedLens, R.inc, { <span class="hljs-attr">secondsElapsed</span>: <span class="hljs-number">10</span> });  <span class="hljs-comment">//=&gt; 11</span></code></pre><p>&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x7684; <code>incSecondsElapsed</code> &#x5C31;&#x662F;&#x5BF9; <code>R.over</code> &#x8FDB;&#x884C;&#x5C40;&#x90E8;&#x5E94;&#x7528;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const incSecondsElapsed = R.over(secondsElapsedLens, R.inc);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> incSecondsElapsed = R.over(secondsElapsedLens, R.inc);</code></pre><p>&#x8BE5;&#x884C;&#x4EE3;&#x7801;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x51FD;&#x6570;&#xFF0C;&#x4E00;&#x65E6;&#x8C03;&#x7528;&#x65F6;&#x4F20;&#x5165; <code>appState</code>&#xFF0C;&#x5C31;&#x4F1A;&#x628A; <code>R.inc</code> &#x5E94;&#x7528;&#x5728; <code>secondsElapsed</code> &#x5C5E;&#x6027;&#x4E0A;&#x3002;</p><p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;Ramda &#x4ECE;&#x6765;&#x90FD;&#x4E0D;&#x4F1A;&#x4FEE;&#x6539;&#x5BF9;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x6765;&#x5904;&#x7406;&#x810F;&#x6D3B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="appState = incSecondsElapsed(appState);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">appState = incSecondsElapsed(appState);</code></pre><p>&#x5982;&#x679C;&#x60F3;&#x652F;&#x6301; undo/redo &#xFF0C;&#x53EA;&#x9700;&#x8981;&#x7EF4;&#x62A4;&#x4E00;&#x4E2A;&#x5386;&#x53F2;&#x6570;&#x7EC4;&#x8BB0;&#x5F55;&#x4E0B;&#x6BCF;&#x4E00;&#x6B21;&#x72B6;&#x6001;&#x5373;&#x53EF;&#xFF0C;&#x6216;&#x8005;&#x4F7F;&#x7528; Redux &#x3002;</p><p>&#x76EE;&#x524D;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x54C1;&#x5C1D;&#x4E86;&#x67EF;&#x91CC;&#x5316;&#x548C;&#x900F;&#x955C;&#xFF0C;&#x4E0B;&#x9762;&#x8BA9;&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x54C1;&#x5C1D;<strong>&#x7EC4;&#x5408;</strong>&#x3002;</p><h1 id="articleHeader3">&#x7EC4;&#x5408; React &#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;</h1><p>&#x5F53;&#x6211;&#x7B2C;&#x4E00;&#x6B21;&#x8BFB;&#x5230; React &#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x6211;&#x5C31;&#x5728;&#x60F3;&#x80FD;&#x5426;&#x4F7F;&#x7528; <code>R.compose</code> &#x6765;&#x7EC4;&#x5408;&#x8FD9;&#x4E9B;&#x51FD;&#x6570;&#x5462;&#xFF1F;&#x7B54;&#x6848;&#x5F88;&#x660E;&#x663E;&#xFF0C;&#x5F53;&#x7136;&#x662F; YES &#x5566;:)</p><p>&#x8BA9;&#x6211;&#x4EEC;&#x4ECE;&#x4E00;&#x4E2A; TodoList &#x7EC4;&#x4EF6;&#x5F00;&#x59CB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const TodoList = React.createClass({
  render: function() {
    const createItem = function(item) {
      return (&lt;li key={item.id}&gt;{item.text}&lt;/li&gt;);
    };

    return (&lt;div className=&quot;panel panel-default&quot;&gt;
      &lt;div className=&quot;panel-body&quot;&gt;
        &lt;ul&gt;
          {this.props.items.map(createItem)}
        &lt;/ul&gt;
      &lt;/div&gt;
    &lt;/div&gt;);
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> TodoList = React.createClass({
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> createItem = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
      <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.id}</span>&gt;</span>{item.text}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>);
    };

    <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;panel panel-default&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;panel-body&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          {this.props.items.map(createItem)}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);
  }
});</code></pre><p>&#x73B0;&#x5728;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;TodoList &#x80FD;&#x5426;&#x901A;&#x8FC7;&#x7EC4;&#x5408;&#x66F4;&#x5C0F;&#x7684;&#x3001;&#x53EF;&#x590D;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x6765;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;&#x5F53;&#x7136;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;&#x5B83;&#x5206;&#x5272;&#x6210; 3 &#x4E2A;&#x5C0F;&#x7EC4;&#x4EF6;&#xFF1A;</p><ul><li>&#x5BB9;&#x5668;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Container = children =&gt; (&lt;div className=&quot;panel panel-default&quot;&gt;
  &lt;div className=&quot;panel-body&quot;&gt;
    {children}
  &lt;/div&gt;
&lt;/div&gt;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Container = <span class="hljs-function"><span class="hljs-params">children</span> =&gt;</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;panel panel-default&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;panel-body&quot;</span>&gt;</span>
    {children}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);</code></pre><ul><li>&#x5217;&#x8868;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const List = children =&gt; (&lt;ul&gt;
  {children}
&lt;/ul&gt;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> List = <span class="hljs-function"><span class="hljs-params">children</span> =&gt;</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  {children}
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>);</code></pre><ul><li>&#x5217;&#x8868;&#x9879;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ListItem = ({ id, text }) =&gt; (&lt;li key={id}&gt;
  &lt;span&gt;{text}&lt;/span&gt;
&lt;/li&gt;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> ListItem = <span class="hljs-function">(<span class="hljs-params">{ id, text }</span>) =&gt;</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{id}</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>);</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x770B;&#xFF0C;&#x8BF7;&#x4E00;&#x5B9A;&#x8981;&#x5728;&#x7406;&#x89E3;&#x4E86;&#x6BCF;&#x4E00;&#x6B65;&#x4E4B;&#x540E;&#x624D;&#x5F80;&#x4E0B;&#x770B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Container(&lt;h1&gt;Hello World!&lt;/h1&gt;);

/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;h1&gt;Hello World!&lt;/h1&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */

Container(List(&lt;li&gt;Hello World!&lt;/li&gt;));

/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;ul&gt;
 *        &lt;li&gt;Hello World!&lt;/li&gt;
 *      &lt;/ul&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */

const TodoItem = {
  id: 123,
  text: &apos;Buy milk&apos;
};
Container(List(ListItem(TodoItem)));

/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;ul&gt;
 *        &lt;li&gt;
 *          &lt;span&gt;Buy milk&lt;/span&gt;
 *        &lt;/li&gt;
 *      &lt;/ul&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">Container(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>);

<span class="hljs-comment">/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;h1&gt;Hello World!&lt;/h1&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */</span>

Container(List(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>));

<span class="hljs-comment">/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;ul&gt;
 *        &lt;li&gt;Hello World!&lt;/li&gt;
 *      &lt;/ul&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */</span>

<span class="hljs-keyword">const</span> TodoItem = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;Buy milk&apos;</span>
};
Container(List(ListItem(TodoItem)));

<span class="hljs-comment">/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;ul&gt;
 *        &lt;li&gt;
 *          &lt;span&gt;Buy milk&lt;/span&gt;
 *        &lt;/li&gt;
 *      &lt;/ul&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */</span></code></pre><p>&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x592A;&#x7279;&#x522B;&#x7684;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x662F;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x7684;&#x4F20;&#x53C2;&#x8C03;&#x7528;&#x3002;</p><p>&#x63A5;&#x7740;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x505A;&#x4E00;&#x4E9B;&#x7EC4;&#x5408;&#x7684;&#x7EC3;&#x4E60;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="R.compose(Container, List)(&lt;li&gt;Hello World!&lt;/li&gt;);

/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;ul&gt;
 *        &lt;li&gt;Hello World!&lt;/li&gt;
 *      &lt;/ul&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */

const ContainerWithList = R.compose(Container, List);
R.compose(ContainerWithList, ListItem)({id: 123, text: &apos;Buy milk&apos;});

/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;ul&gt;
 *        &lt;li&gt;
 *          &lt;span&gt;Buy milk&lt;/span&gt;
 *        &lt;/li&gt;
 *      &lt;/ul&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */

const TodoItem = {
  id: 123,
  text: &apos;Buy milk&apos;
};
const TodoList = R.compose(Container, List, ListItem);
TodoList(TodoItem);

/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;ul&gt;
 *        &lt;li&gt;
 *          &lt;span&gt;Buy milk&lt;/span&gt;
 *        &lt;/li&gt;
 *      &lt;/ul&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">R.compose(Container, List)(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>);

<span class="hljs-comment">/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;ul&gt;
 *        &lt;li&gt;Hello World!&lt;/li&gt;
 *      &lt;/ul&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */</span>

<span class="hljs-keyword">const</span> ContainerWithList = R.compose(Container, List);
R.compose(ContainerWithList, ListItem)({<span class="hljs-attr">id</span>: <span class="hljs-number">123</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;Buy milk&apos;</span>});

<span class="hljs-comment">/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;ul&gt;
 *        &lt;li&gt;
 *          &lt;span&gt;Buy milk&lt;/span&gt;
 *        &lt;/li&gt;
 *      &lt;/ul&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */</span>

<span class="hljs-keyword">const</span> TodoItem = {
  <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>,
  <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;Buy milk&apos;</span>
};
<span class="hljs-keyword">const</span> TodoList = R.compose(Container, List, ListItem);
TodoList(TodoItem);

<span class="hljs-comment">/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;ul&gt;
 *        &lt;li&gt;
 *          &lt;span&gt;Buy milk&lt;/span&gt;
 *        &lt;/li&gt;
 *      &lt;/ul&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */</span></code></pre><p>&#x53D1;&#x73B0;&#x4E86;&#x6CA1;&#xFF01;<code>TodoList</code> &#x7EC4;&#x4EF6;&#x5DF2;&#x7ECF;&#x88AB;&#x8868;&#x793A;&#x6210;&#x4E86; <code>Container</code>&#x3001;<code>List</code> &#x548C; <code>ListItem</code> &#x7684;&#x7EC4;&#x5408;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const TodoList = R.compose(Container, List, ListItem);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> TodoList = R.compose(Container, List, ListItem);</code></pre><p>&#x7B49;&#x7B49;&#xFF01;<code>TodoList</code> &#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x53EA;&#x63A5;&#x53D7;&#x4E00;&#x4E2A; todo &#x5BF9;&#x8C61;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x662F;&#x6620;&#x5C04;&#x6574;&#x4E2A; todos &#x6570;&#x7EC4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mapTodos = function(todos) {
  return todos.map(function(todo) {
    return ListItem(todo);
  });
};
const TodoList = R.compose(Container, List, mapTodos);
const mock = [
  {id: 1, text: &apos;One&apos;},
  {id: 1, text: &apos;Two&apos;},
  {id: 1, text: &apos;Three&apos;}
];
TodoList(mock);

/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;ul&gt;
 *        &lt;li&gt;
 *          &lt;span&gt;One&lt;/span&gt;
 *        &lt;/li&gt;
 *        &lt;li&gt;
 *          &lt;span&gt;Two&lt;/span&gt;
 *        &lt;/li&gt;
 *        &lt;li&gt;
 *          &lt;span&gt;Three&lt;/span&gt;
 *        &lt;/li&gt;
 *      &lt;/ul&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> mapTodos = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">todos</span>) </span>{
  <span class="hljs-keyword">return</span> todos.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">todo</span>) </span>{
    <span class="hljs-keyword">return</span> ListItem(todo);
  });
};
<span class="hljs-keyword">const</span> TodoList = R.compose(Container, List, mapTodos);
<span class="hljs-keyword">const</span> mock = [
  {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;One&apos;</span>},
  {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;Two&apos;</span>},
  {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;Three&apos;</span>}
];
TodoList(mock);

<span class="hljs-comment">/**
 *  &lt;div className=&quot;panel panel-default&quot;&gt;
 *    &lt;div className=&quot;panel-body&quot;&gt;
 *      &lt;ul&gt;
 *        &lt;li&gt;
 *          &lt;span&gt;One&lt;/span&gt;
 *        &lt;/li&gt;
 *        &lt;li&gt;
 *          &lt;span&gt;Two&lt;/span&gt;
 *        &lt;/li&gt;
 *        &lt;li&gt;
 *          &lt;span&gt;Three&lt;/span&gt;
 *        &lt;/li&gt;
 *      &lt;/ul&gt;
 *    &lt;/div&gt;
 *  &lt;/div&gt;
 */</span></code></pre><p>&#x80FD;&#x5426;&#x4EE5;&#x66F4;&#x51FD;&#x6570;&#x5F0F;&#x7684;&#x65B9;&#x5F0F;&#x7B80;&#x5316; <code>mapTodos</code> &#x51FD;&#x6570;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;
return todos.map(function(todo) {
  return ListItem(todo);
});

// &#x7B49;&#x6548;&#x4E8E;
return todos.map(ListItem);

// &#x6240;&#x4EE5;&#x53D8;&#x6210;&#x4E86;
const mapTodos = function(todos) {
  return todos.map(ListItem);
};

// &#x7B49;&#x6548;&#x4E8E;&#x4F7F;&#x7528; Ramda &#x7684;&#x65B9;&#x5F0F;
const mapTodos = function(todos) {
  return R.map(ListItem, todos);
};

// &#x6CE8;&#x610F; Ramda &#x7684;&#x4E24;&#x4E2A;&#x7279;&#x70B9;&#xFF1A;
// - Ramda &#x51FD;&#x6570;&#x9ED8;&#x8BA4;&#x90FD;&#x652F;&#x6301;&#x67EF;&#x91CC;&#x5316;
// - &#x4E3A;&#x4E86;&#x4FBF;&#x4E8E;&#x67EF;&#x91CC;&#x5316;&#xFF0C;Ramda &#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x4E86;&#x7279;&#x5B9A;&#x6392;&#x5217;&#xFF0C;
//   &#x5F85;&#x5904;&#x7406;&#x7684;&#x6570;&#x636E;&#x901A;&#x5E38;&#x653E;&#x5728;&#x6700;&#x540E;
// &#x56E0;&#x6B64;:
const mapTodos = R.map(ListItem);

//&#x6B64;&#x65F6;&#x5C31;&#x4E0D;&#x518D;&#x9700;&#x8981; mapTodos &#x4E86;:
const TodoList = R.compose(Container, List, R.map(ListItem));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;</span>
<span class="hljs-keyword">return</span> todos.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">todo</span>) </span>{
  <span class="hljs-keyword">return</span> ListItem(todo);
});

<span class="hljs-comment">// &#x7B49;&#x6548;&#x4E8E;</span>
<span class="hljs-keyword">return</span> todos.map(ListItem);

<span class="hljs-comment">// &#x6240;&#x4EE5;&#x53D8;&#x6210;&#x4E86;</span>
<span class="hljs-keyword">const</span> mapTodos = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">todos</span>) </span>{
  <span class="hljs-keyword">return</span> todos.map(ListItem);
};

<span class="hljs-comment">// &#x7B49;&#x6548;&#x4E8E;&#x4F7F;&#x7528; Ramda &#x7684;&#x65B9;&#x5F0F;</span>
<span class="hljs-keyword">const</span> mapTodos = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">todos</span>) </span>{
  <span class="hljs-keyword">return</span> R.map(ListItem, todos);
};

<span class="hljs-comment">// &#x6CE8;&#x610F; Ramda &#x7684;&#x4E24;&#x4E2A;&#x7279;&#x70B9;&#xFF1A;</span>
<span class="hljs-comment">// - Ramda &#x51FD;&#x6570;&#x9ED8;&#x8BA4;&#x90FD;&#x652F;&#x6301;&#x67EF;&#x91CC;&#x5316;</span>
<span class="hljs-comment">// - &#x4E3A;&#x4E86;&#x4FBF;&#x4E8E;&#x67EF;&#x91CC;&#x5316;&#xFF0C;Ramda &#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x4E86;&#x7279;&#x5B9A;&#x6392;&#x5217;&#xFF0C;</span>
<span class="hljs-comment">//   &#x5F85;&#x5904;&#x7406;&#x7684;&#x6570;&#x636E;&#x901A;&#x5E38;&#x653E;&#x5728;&#x6700;&#x540E;</span>
<span class="hljs-comment">// &#x56E0;&#x6B64;:</span>
<span class="hljs-keyword">const</span> mapTodos = R.map(ListItem);

<span class="hljs-comment">//&#x6B64;&#x65F6;&#x5C31;&#x4E0D;&#x518D;&#x9700;&#x8981; mapTodos &#x4E86;:</span>
<span class="hljs-keyword">const</span> TodoList = R.compose(Container, List, R.map(ListItem));</code></pre><p>&#x54D2;&#x54D2;&#x54D2;&#xFF01;&#x5B8C;&#x6574;&#x7684; <code>TodoList</code> &#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;React&apos;;
import R from &apos;ramda&apos;;

const Container = children =&gt; (&lt;div className=&quot;panel panel-default&quot;&gt;
  &lt;div className=&quot;panel-body&quot;&gt;
    {children}
  &lt;/div&gt;
&lt;/div&gt;);

const List = children =&gt; (&lt;ul&gt;
  {children}
&lt;/ul&gt;);

const ListItem = ({ id, text }) =&gt; (&lt;li key={id}&gt;
  &lt;span&gt;{text}&lt;/span&gt;
&lt;/li&gt;);

const TodoList = R.compose(Container, List, R.map(ListItem));

export default TodoList;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;React&apos;</span>;
<span class="hljs-keyword">import</span> R <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;ramda&apos;</span>;

<span class="hljs-keyword">const</span> Container = <span class="hljs-function"><span class="hljs-params">children</span> =&gt;</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;panel panel-default&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;panel-body&quot;</span>&gt;</span>
    {children}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);

<span class="hljs-keyword">const</span> List = <span class="hljs-function"><span class="hljs-params">children</span> =&gt;</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  {children}
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>);

<span class="hljs-keyword">const</span> ListItem = <span class="hljs-function">(<span class="hljs-params">{ id, text }</span>) =&gt;</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{id}</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>);

<span class="hljs-keyword">const</span> TodoList = R.compose(Container, List, R.map(ListItem));

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> TodoList;</code></pre><p>&#x5176;&#x5B9E;&#xFF0C;&#x8FD8;&#x5C11;&#x4E86;&#x4E00;&#x6837;&#x4E1C;&#x897F;&#xFF0C;&#x4E0D;&#x8FC7;&#x9A6C;&#x4E0A;&#x5C31;&#x4F1A;&#x52A0;&#x4E0A;&#x3002;&#x5728;&#x90A3;&#x4E4B;&#x524D;&#x8BA9;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x505A;&#x4E9B;&#x51C6;&#x5907;&#xFF1A;</p><ul><li>&#x6DFB;&#x52A0;&#x6D4B;&#x8BD5;&#x6570;&#x636E;&#x5230;&#x5E94;&#x7528;&#x72B6;&#x6001;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let appState = {
  secondsElapsed: 0,
  todos: [
    {id: 1, text: &apos;Buy milk&apos;},
    {id: 2, text: &apos;Go running&apos;},
    {id: 3, text: &apos;Rest&apos;}
  ]
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> appState = {
  <span class="hljs-attr">secondsElapsed</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">todos</span>: [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;Buy milk&apos;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;Go running&apos;</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;Rest&apos;</span>}
  ]
};</code></pre><ul><li>&#x6DFB;&#x52A0; <code>TodoList</code> &#x5230; <code>App</code></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import TodoList from &apos;./todo-list&apos;;
const App = appState =&gt; (&lt;div className=&quot;container&quot;&gt;
  &lt;h1&gt;App name&lt;/h1&gt;
  &lt;Timer secondsElapsed={appState.secondsElapsed} /&gt;
  &lt;TodoList todos={appState.todos} /&gt;
&lt;/div&gt;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> TodoList <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo-list&apos;</span>;
<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">appState</span> =&gt;</span> (&lt;div className=&quot;container&quot;&gt;
  &lt;h1&gt;App name&lt;/h1&gt;
  &lt;Timer secondsElapsed={appState.secondsElapsed} /&gt;
  &lt;TodoList todos={appState.todos} /&gt;
&lt;/div&gt;);</code></pre><p><code>TodoList</code> &#x63A5;&#x53D7;&#x7684;&#x662F;&#x4E00;&#x4E2A; todos &#x6570;&#x7EC4;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x91CC;&#x5374;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;TodoList todos={appState.todos} /&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">&lt;TodoList todos={appState.todos} /&gt;</code></pre><p>&#x6211;&#x4EEC;&#x628A;&#x5217;&#x8868;&#x4F20;&#x9012;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x7B49;&#x6548;&#x4E8E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TodoList({todos: appState.todos});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">TodoList({<span class="hljs-attr">todos</span>: appState.todos});</code></pre><p>&#x56E0;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x4FEE;&#x6539; <code>TodoList</code>&#xFF0C;&#x4EE5;&#x4FBF;&#x8BA9;&#x5B83;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5E76;&#x4E14;&#x53D6;&#x51FA; <code>todos</code> &#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const TodoList = R.compose(Container, List, R.map(ListItem), R.prop(&apos;todos&apos;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> TodoList = R.compose(Container, List, R.map(ListItem), R.prop(<span class="hljs-string">&apos;todos&apos;</span>));</code></pre><p>&#x8FD9;&#x91CC;&#x5E76;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x9AD8;&#x6DF1;&#x6280;&#x672F;&#x3002;&#x4EC5;&#x4EC5;&#x662F;&#x4ECE;&#x53F3;&#x5230;&#x5DE6;&#x7684;&#x7EC4;&#x5408;&#xFF0C;<code>R.prop(&apos;todos&apos;)</code> &#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8C03;&#x7528;&#x8BE5;&#x51FD;&#x6570;&#x4F1A;&#x8FD4;&#x56DE;&#x5176;&#x4F5C;&#x4E3A;&#x7684;&#x53C2;&#x6570;&#x5BF9;&#x8C61;&#x7684; <code>todos</code> &#x5C5E;&#x6027;&#xFF0C;&#x63A5;&#x7740;&#x628A;&#x8BE5;&#x5C5E;&#x6027;&#x503C;&#x4F20;&#x9012;&#x7ED9; <code>R.map(ListItem)</code>&#xFF0C;&#x5982;&#x6B64;&#x5F80;&#x590D;:)</p><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x672C;&#x6587;&#x7684;&#x5C1D;&#x9C9C;&#x5185;&#x5BB9;&#x3002;&#x5E0C;&#x671B;&#x80FD;&#x5BF9;&#x5927;&#x5BB6;&#x6709;&#x6240;&#x5E2E;&#x52A9;&#xFF0C;&#x8FD9;&#x4EC5;&#x4EC5;&#x662F;&#x6211;&#x57FA;&#x4E8E; React &#x548C; Ramda &#x505A;&#x7684;&#x4E00;&#x90E8;&#x5206;&#x5B9E;&#x9A8C;&#x3002;&#x672A;&#x6765;&#xFF0C;&#x6211;&#x4F1A;&#x52AA;&#x529B;&#x5C1D;&#x8BD5;&#x8986;&#x76D6;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x548C;&#x4F7F;&#x7528; Transducer &#x6765;&#x8F6C;&#x6362;&#x65E0;&#x72B6;&#x6001;&#x51FD;&#x6570;&#x3002;</p><p><a href="https://github.com/mirkodrummer/react-stateless-components-ramda" rel="nofollow noreferrer" target="_blank">&#x5B8C;&#x6574;&#x6E90;&#x7801;</a>&#xFF0C;<a href="https://codesandbox.io/s/w3zqp746l" rel="nofollow noreferrer" target="_blank">&#x7EBF;&#x4E0A;&#x6F14;&#x793A;&#x4EE3;&#x7801;</a>&#xFF08;&#x8BD1;&#x8005;&#x65B0;&#x589E;&#xFF09;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React + Ramda: 函数式编程尝鲜

## 原文链接
[https://segmentfault.com/a/1190000015561876](https://segmentfault.com/a/1190000015561876)

