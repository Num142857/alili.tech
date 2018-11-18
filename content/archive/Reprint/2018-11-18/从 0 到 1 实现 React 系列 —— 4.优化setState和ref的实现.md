---
title: '从 0 到 1 实现 React 系列 —— 4.优化setState和ref的实现' 
date: 2018-11-18 3:32:07
hidden: true
slug: 5ix6aj9yvnc
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000015785464?w=640&amp;h=280" src="https://static.alili.tech/img/remote/1460000015785464?w=640&amp;h=280" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x770B;&#x6E90;&#x7801;&#x4E00;&#x4E2A;&#x75DB;&#x5904;&#x662F;&#x4F1A;&#x9677;&#x8FDB;&#x7406;&#x4E0D;&#x987A;&#x4E3B;&#x5E72;&#x7684;&#x56F0;&#x5C40;&#x4E2D;&#xFF0C;&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x5728;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; (x)react &#x7684;&#x540C;&#x65F6;&#x7406;&#x987A; React &#x6846;&#x67B6;&#x7684;&#x4E3B;&#x5E72;&#x5185;&#x5BB9;(JSX/&#x865A;&#x62DF;DOM/&#x7EC4;&#x4EF6;/&#x751F;&#x547D;&#x5468;&#x671F;/diff&#x7B97;&#x6CD5;/setState/ref/...)</p><ul><li><a href="https://github.com/MuYunyun/blog/issues/24" rel="nofollow noreferrer" target="_blank">&#x4ECE; 0 &#x5230; 1 &#x5B9E;&#x73B0; React &#x7CFB;&#x5217; &#x2014;&#x2014; JSX &#x548C; Virtual DOM</a></li><li><a href="https://github.com/MuYunyun/blog/issues/25" rel="nofollow noreferrer" target="_blank">&#x4ECE; 0 &#x5230; 1 &#x5B9E;&#x73B0; React &#x7CFB;&#x5217; &#x2014;&#x2014; &#x7EC4;&#x4EF6;&#x548C; state|props</a></li><li><a href="https://github.com/MuYunyun/blog/issues/26" rel="nofollow noreferrer" target="_blank">&#x4ECE; 0 &#x5230; 1 &#x5B9E;&#x73B0; React &#x7CFB;&#x5217; &#x2014;&#x2014; &#x751F;&#x547D;&#x5468;&#x671F;&#x548C; diff &#x7B97;&#x6CD5;</a></li><li><a href="https://github.com/MuYunyun/blog/issues/27" rel="nofollow noreferrer" target="_blank">&#x4ECE; 0 &#x5230; 1 &#x5B9E;&#x73B0; React &#x7CFB;&#x5217; &#x2014;&#x2014; &#x4F18;&#x5316; setState &#x548C; ref &#x7684;&#x5B9E;&#x73B0;</a></li></ul><h3 id="articleHeader0">&#x540C;&#x6B65; setState &#x7684;&#x95EE;&#x9898;</h3><p>&#x800C;&#x5728;&#x73B0;&#x6709; setState &#x903B;&#x8F91;&#x5B9E;&#x73B0;&#x4E2D;&#xFF0C;&#x6BCF;&#x8C03;&#x7528;&#x4E00;&#x6B21; setState &#x5C31;&#x4F1A;&#x6267;&#x884C; render &#x4E00;&#x6B21;&#x3002;&#x56E0;&#x6B64;&#x5728;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x6BCF;&#x6B21;&#x70B9;&#x51FB;&#x589E;&#x52A0;&#x6309;&#x94AE;&#xFF0C;&#x56E0;&#x4E3A; click &#x65B9;&#x6CD5;&#x91CC;&#x8C03;&#x7528;&#x4E86; 10 &#x6B21; setState &#x51FD;&#x6570;&#xFF0C;&#x9875;&#x9762;&#x4E5F;&#x4F1A;&#x88AB;&#x6E32;&#x67D3; 10 &#x6B21;&#x3002;&#x800C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x7684;&#x662F;&#x6BCF;&#x70B9;&#x51FB;&#x4E00;&#x6B21;&#x589E;&#x52A0;&#x6309;&#x94AE;&#x53EA;&#x6267;&#x884C; render &#x51FD;&#x6570;&#x4E00;&#x6B21;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class B extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.click = this.click.bind(this)
  }

  click() {
    for (let i = 0; i &lt; 10; i++) {
      this.setState({ // &#x5728;&#x5148;&#x524D;&#x7684;&#x903B;&#x8F91;&#x4E2D;&#xFF0C;&#x6CA1;&#x8C03;&#x7528;&#x4E00;&#x6B21; setState &#x5C31;&#x4F1A; render &#x4E00;&#x6B21;
        count: ++this.state.count
      })
    }
  }

  render() {
    console.log(this.state.count)
    return (
      &lt;div&gt;
        &lt;button onClick={this.click}&gt;&#x589E;&#x52A0;&lt;/button&gt;
        &lt;div&gt;{this.state.count}&lt;/div&gt;
      &lt;/div&gt;
    )
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">B</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
    }
    <span class="hljs-keyword">this</span>.click = <span class="hljs-keyword">this</span>.click.bind(<span class="hljs-keyword">this</span>)
  }

  click() {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
      <span class="hljs-keyword">this</span>.setState({ <span class="hljs-comment">// &#x5728;&#x5148;&#x524D;&#x7684;&#x903B;&#x8F91;&#x4E2D;&#xFF0C;&#x6CA1;&#x8C03;&#x7528;&#x4E00;&#x6B21; setState &#x5C31;&#x4F1A; render &#x4E00;&#x6B21;</span>
        count: ++<span class="hljs-keyword">this</span>.state.count
      })
    }
  }

  render() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.state.count)
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.click}</span>&gt;</span>&#x589E;&#x52A0;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}</code></pre><h3 id="articleHeader1">&#x5F02;&#x6B65;&#x8C03;&#x7528; setState</h3><p>&#x67E5;&#x9605; setState &#x7684; api&#xFF0C;&#x5176;&#x5F62;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setState(updater, [callback])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial">setState(updater, [callback])</code></pre><p>&#x5B83;&#x80FD;&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5176;&#x4E2D;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570; updater &#x53EF;&#x4EE5;&#x4E3A;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x4E3A;&#x51FD;&#x6570; (<code>(prevState, props) =&gt; stateChange</code>)&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF1B;</p><p>&#x786E;&#x5B9A;&#x4F18;&#x5316;&#x601D;&#x8DEF;&#x4E3A;&#xFF1A;&#x5C06;&#x591A;&#x6B21; setState &#x540E;&#x8DDF;&#x7740;&#x7684;&#x503C;&#x8FDB;&#x884C;&#x6D45;&#x5408;&#x5E76;&#xFF0C;&#x5E76;&#x501F;&#x52A9;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x7B49;&#x6240;&#x6709;&#x503C;&#x5408;&#x5E76;&#x597D;&#x4E4B;&#x540E;&#x518D;&#x8FDB;&#x884C;&#x6E32;&#x67D3;&#x754C;&#x9762;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let componentArr = []

// &#x5F02;&#x6B65;&#x6E32;&#x67D3;
function asyncRender(updater, component, cb) {
  if (componentArr.length === 0) {
    defer(() =&gt; render())       // &#x5229;&#x7528;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#xFF0C;&#x5EF6;&#x8FDF;&#x6E32;&#x67D3;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;
  }

  if (cb) defer(cb)             // &#x8C03;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;
  if (_.isFunction(updater)) {  // &#x5904;&#x7406; setState &#x540E;&#x8DDF;&#x51FD;&#x6570;&#x7684;&#x60C5;&#x51B5;
    updater = updater(component.state, component.props)
  }
  // &#x6D45;&#x5408;&#x5E76;&#x903B;&#x8F91;
  component.state = Object.assign({}, component.state, updater)
  if (componentArr.includes(component)) {
    component.state = Object.assign({}, component.state, updater)
  } else {
    componentArr.push(component)
  }
}

function render() {
  let component
  while (component = componentArr.shift()) {
    renderComponent(component) // rerender
  }
}

// &#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#xFF0C;&#x5173;&#x4E8E; promise &#x7684;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x548C; setTimeout &#x7684;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x540E;&#x7EED;&#x4F1A;&#x5355;&#x72EC;&#x5199;&#x7BC7;&#x6587;&#x7AE0;&#x3002;
const defer = function(fn) {
  return Promise.resolve().then(() =&gt; fn())
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> componentArr = []

<span class="hljs-comment">// &#x5F02;&#x6B65;&#x6E32;&#x67D3;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncRender</span>(<span class="hljs-params">updater, component, cb</span>) </span>{
  <span class="hljs-keyword">if</span> (componentArr.length === <span class="hljs-number">0</span>) {
    defer(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> render())       <span class="hljs-comment">// &#x5229;&#x7528;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#xFF0C;&#x5EF6;&#x8FDF;&#x6E32;&#x67D3;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;</span>
  }

  <span class="hljs-keyword">if</span> (cb) defer(cb)             <span class="hljs-comment">// &#x8C03;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
  <span class="hljs-keyword">if</span> (_.isFunction(updater)) {  <span class="hljs-comment">// &#x5904;&#x7406; setState &#x540E;&#x8DDF;&#x51FD;&#x6570;&#x7684;&#x60C5;&#x51B5;</span>
    updater = updater(component.state, component.props)
  }
  <span class="hljs-comment">// &#x6D45;&#x5408;&#x5E76;&#x903B;&#x8F91;</span>
  component.state = <span class="hljs-built_in">Object</span>.assign({}, component.state, updater)
  <span class="hljs-keyword">if</span> (componentArr.includes(component)) {
    component.state = <span class="hljs-built_in">Object</span>.assign({}, component.state, updater)
  } <span class="hljs-keyword">else</span> {
    componentArr.push(component)
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> component
  <span class="hljs-keyword">while</span> (component = componentArr.shift()) {
    renderComponent(component) <span class="hljs-comment">// rerender</span>
  }
}

<span class="hljs-comment">// &#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#xFF0C;&#x5173;&#x4E8E; promise &#x7684;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x548C; setTimeout &#x7684;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x540E;&#x7EED;&#x4F1A;&#x5355;&#x72EC;&#x5199;&#x7BC7;&#x6587;&#x7AE0;&#x3002;</span>
<span class="hljs-keyword">const</span> defer = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> fn())
}</code></pre><p>&#x6B64;&#x65F6;&#xFF0C;&#x6BCF;&#x70B9;&#x51FB;&#x4E00;&#x6B21;&#x589E;&#x52A0;&#x6309;&#x94AE; render &#x51FD;&#x6570;&#x53EA;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x4E86;&#x3002;</p><h3 id="articleHeader2">ref &#x7684;&#x5B9E;&#x73B0;</h3><p>&#x5728; react &#x4E2D;&#x5E76;&#x4E0D;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528; ref &#x5C5E;&#x6027;&#xFF0C;&#x800C;&#x5E94;&#x8BE5;&#x5C3D;&#x91CF;&#x4F7F;&#x7528;<a href="https://doc.react-china.org/docs/lifting-state-up.html" rel="nofollow noreferrer" target="_blank">&#x72B6;&#x6001;&#x63D0;&#x5347;</a>&#xFF0C;&#x4F46;&#x662F; react &#x8FD8;&#x662F;&#x63D0;&#x4F9B;&#x4E86; ref &#x5C5E;&#x6027;&#x8D4B;&#x4E88;&#x4E86;&#x5F00;&#x53D1;&#x8005;&#x64CD;&#x4F5C; dom &#x7684;&#x80FD;&#x529B;&#xFF0C;react &#x7684; ref &#x6709; <code>string</code>&#x3001;<code>callback</code>&#x3001;<code>createRef</code> &#x4E09;&#x79CD;&#x5F62;&#x5F0F;&#xFF0C;&#x5206;&#x522B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// string &#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x672A;&#x6765;&#x4F1A;&#x88AB;&#x629B;&#x5F03;
class MyComponent extends Component {
  componentDidMount() {
    this.refs.myRef.focus()
  }
  render() {
    return &lt;input ref=&quot;myRef&quot; /&gt;
  }
}

// callback(&#x6BD4;&#x8F83;&#x901A;&#x7528;)
class MyComponent extends Component {
  componentDidMount() {
    this.myRef.focus()
  }
  render() {
    return &lt;input ref={(ele) =&gt; {
      this.myRef = ele
    "}}" /&gt;
  }
}

// react 16.3 &#x589E;&#x52A0;&#xFF0C;&#x5176;&#x5B83; react-like &#x6846;&#x67B6;&#x8FD8;&#x6CA1;&#x6709;&#x540C;&#x6B65;
class MyComponent extends Component {
  constructor() {
    super() {
      this.myRef = React.createRef()
    }
  }
  componentDidMount() {
    this.myRef.current.focus()
  }
  render() {
    return &lt;input ref={this.myRef} /&gt;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// string &#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x672A;&#x6765;&#x4F1A;&#x88AB;&#x629B;&#x5F03;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentDidMount() {
    <span class="hljs-keyword">this</span>.refs.myRef.focus()
  }
  render() {
    <span class="hljs-keyword">return</span> &lt;input ref=&quot;myRef&quot; /&gt;
  }
}

// callback(&#x6BD4;&#x8F83;&#x901A;&#x7528;)
class MyComponent extends Component {
  componentDidMount() {
    this.myRef.focus()
  }
  render() {
    return &lt;input ref={(ele) =&gt; {
      this.myRef = ele
    "}}" /&gt;
  }
}

// react 16.3 &#x589E;&#x52A0;&#xFF0C;&#x5176;&#x5B83; react-like &#x6846;&#x67B6;&#x8FD8;&#x6CA1;&#x6709;&#x540C;&#x6B65;
class MyComponent extends Component {
  constructor() {
    super() {
      this.myRef = React.createRef()
    }
  }
  componentDidMount() {
    this.myRef.current.focus()
  }
  render() {
    return &lt;input ref={this.myRef} /&gt;
  }
}</code></pre><p><a href="https://zhuanlan.zhihu.com/p/40462264" rel="nofollow noreferrer" target="_blank">React ref &#x7684;&#x524D;&#x4E16;&#x4ECA;&#x751F;</a> &#x7F57;&#x5217;&#x4E86;&#x4E09;&#x79CD;&#x5199;&#x6CD5;&#x7684;&#x5DEE;&#x5F02;&#xFF0C;&#x4E0B;&#x9762;&#x5BF9;&#x4E0A;&#x8FF0;&#x4F8B;&#x5B50;&#x4E2D;&#x7684;&#x7B2C;&#x4E8C;&#x79CD;&#x5199;&#x6CD5;(&#x6BD4;&#x8F83;&#x901A;&#x7528;)&#x8FDB;&#x884C;&#x5B9E;&#x73B0;&#x3002;</p><p>&#x9996;&#x5148;&#x5728; setAttribute &#x65B9;&#x6CD5;&#x5185;&#x8865;&#x5145;&#x4E0A;&#x5BF9; ref &#x7684;&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x7279;&#x6B8A;&#x5904;&#x7406;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setAttribute(dom, attr, value) {
  ...
  else if (attr === &apos;ref&apos;) {          // &#x5904;&#x7406; ref &#x5C5E;&#x6027;
    if (_.isFunction(value)) {
      value(dom)
    }
  }
  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setAttribute</span>(<span class="hljs-params">dom, attr, value</span>) </span>{
  ...
  else <span class="hljs-keyword">if</span> (attr === <span class="hljs-string">&apos;ref&apos;</span>) {          <span class="hljs-comment">// &#x5904;&#x7406; ref &#x5C5E;&#x6027;</span>
    <span class="hljs-keyword">if</span> (_.isFunction(value)) {
      value(dom)
    }
  }
  ...
}</code></pre><p>&#x9488;&#x5BF9;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D; <code>this.myRef.focus()</code> &#x7684; focus &#x5C5E;&#x6027;&#x9700;&#x8981;&#x5F02;&#x6B65;&#x5904;&#x7406;&#xFF0C;&#x56E0;&#x4E3A;&#x8C03;&#x7528; componentDidMount &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x754C;&#x9762;&#x4E0A;&#x8FD8;&#x672A;&#x6DFB;&#x52A0; dom &#x5143;&#x7D20;&#x3002;&#x5904;&#x7406; renderComponent &#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function renderComponent(component) {
  ...
  else if (component &amp;&amp; component.componentDidMount) {
    defer(component.componentDidMount.bind(component))
  }
  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderComponent</span>(<span class="hljs-params">component</span>) </span>{
  ...
  else <span class="hljs-keyword">if</span> (component &amp;&amp; component.componentDidMount) {
    defer(component.componentDidMount.bind(component))
  }
  ...
}</code></pre><p>&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF0C;&#x53EF;&#x4EE5;&#x53D1;&#x73B0; input &#x6846;&#x5DF2;&#x4E3A;&#x9009;&#x4E2D;&#x72B6;&#x6001;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015894866?w=374&amp;h=184" src="https://static.alili.tech/img/remote/1460000015894866?w=374&amp;h=184" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5904;&#x7406;&#x5B8C;&#x666E;&#x901A;&#x5143;&#x7D20;&#x7684; ref &#x540E;&#xFF0C;&#x518D;&#x6765;&#x5904;&#x7406;&#x4E0B;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684; ref &#x7684;&#x60C5;&#x51B5;&#x3002;&#x4E4B;&#x524D;&#x9ED8;&#x8BA4;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x4E0A;&#x662F;&#x6CA1;&#x5C5E;&#x6027;&#x7684;&#xFF0C;&#x73B0;&#x5728;&#x53EA;&#x8981;&#x9488;&#x5BF9;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684; ref &#x5C5E;&#x6027;&#x505A;&#x76F8;&#x5E94;&#x5904;&#x7406;&#x5373;&#x53EF;&#x3002;&#x7A0D;&#x5FAE;&#x4FEE;&#x6539; vdomToDom &#x51FD;&#x6570;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function vdomToDom(vdom) {
  if (_.isFunction(vdom.nodeName)) { // &#x6B64;&#x65F6;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;
    ...
    for (const attr in vdom.attributes) { // &#x5904;&#x7406;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684; ref &#x5C5E;&#x6027;
      if (attr === &apos;ref&apos; &amp;&amp; _.isFunction(vdom.attributes[attr])) {
        vdom.attributes[attr](component)
      }
    }
    ...
  }
  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">vdomToDom</span>(<span class="hljs-params">vdom</span>) </span>{
  <span class="hljs-keyword">if</span> (_.isFunction(vdom.nodeName)) { <span class="hljs-comment">// &#x6B64;&#x65F6;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</span>
    ...
    for (<span class="hljs-keyword">const</span> attr <span class="hljs-keyword">in</span> vdom.attributes) { <span class="hljs-comment">// &#x5904;&#x7406;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684; ref &#x5C5E;&#x6027;</span>
      <span class="hljs-keyword">if</span> (attr === <span class="hljs-string">&apos;ref&apos;</span> &amp;&amp; _.isFunction(vdom.attributes[attr])) {
        vdom.attributes[attr](component)
      }
    }
    ...
  }
  ...
}</code></pre><p>&#x8DD1;&#x5982;&#x4E0B;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
    this.click = this.click.bind(this)
  }

  click() {
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    return &lt;div&gt;{this.state.count}&lt;/div&gt;
  }
}

class B extends Component {
  constructor() {
    super()
    this.click = this.click.bind(this)
  }

  click() {
    this.A.click()
  }

  render() {
    return (
      &lt;div&gt;
        &lt;button onClick={this.click}&gt;&#x52A0;1&lt;/button&gt;
        &lt;A ref={(e) =&gt; { this.A = e "}}" /&gt;
      &lt;/div&gt;
    )
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
    }
    <span class="hljs-keyword">this</span>.click = <span class="hljs-keyword">this</span>.click.bind(<span class="hljs-keyword">this</span>)
  }

  click() {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">count</span>: ++<span class="hljs-keyword">this</span>.state.count
    })
  }

  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">B</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-keyword">this</span>.click = <span class="hljs-keyword">this</span>.click.bind(<span class="hljs-keyword">this</span>)
  }

  click() {
    <span class="hljs-keyword">this</span>.A.click()
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.click}</span>&gt;</span>&#x52A0;1<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">A</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{(e)</span> =&gt;</span> { this.A = e "}}" /&gt;
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}</span></code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015894867?w=145&amp;h=79" src="https://static.alili.tech/img/remote/1460000015894867?w=145&amp;h=79" alt="" title="" style="cursor:pointer;display:inline"></span></p><p><a href="https://github.com/MuYunyun/cpreact" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x5730;&#x5740;</a>&#xFF0C;<a href="https://github.com/MuYunyun/cpreact/blob/master/.github/PULL_REQUEST_TEMPLATE.md" rel="nofollow noreferrer" target="_blank">&#x5173;&#x4E8E;&#x5982;&#x4F55; pr</a></p><p>&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x62DC;&#x8BFB;&#x548C;&#x501F;&#x9274;&#x4E86; <a href="https://github.com/hujiulong/simple-react" rel="nofollow noreferrer" target="_blank">simple-react</a>&#xFF0C;&#x5728;&#x6B64;&#x7279;&#x522B;&#x611F;&#x8C22; <a href="https://github.com/hujiulong" rel="nofollow noreferrer" target="_blank">Jiulong Hu</a> &#x7684;&#x5206;&#x4EAB;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 0 到 1 实现 React 系列 —— 4.优化setState和ref的实现

## 原文链接
[https://segmentfault.com/a/1190000015894863](https://segmentfault.com/a/1190000015894863)

