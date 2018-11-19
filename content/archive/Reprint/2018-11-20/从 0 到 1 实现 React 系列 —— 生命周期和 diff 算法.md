---
title: '从 0 到 1 实现 React 系列 —— 生命周期和 diff 算法' 
date: 2018-11-20 2:30:10
hidden: true
slug: i8339uyut5e
categories: [reprint]
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000015785464?w=640&amp;h=280" src="https://static.alili.tech/img/remote/1460000015785464?w=640&amp;h=280" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x5728;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; (x)react &#x7684;&#x540C;&#x65F6;&#x7406;&#x987A; React &#x6846;&#x67B6;&#x7684;&#x4E3B;&#x5E72;&#x5185;&#x5BB9;(JSX/&#x865A;&#x62DF;DOM/&#x7EC4;&#x4EF6;/&#x751F;&#x547D;&#x5468;&#x671F;/diff&#x7B97;&#x6CD5;/...)</p><ul><li><a href="https://github.com/MuYunyun/blog/issues/24" rel="nofollow noreferrer" target="_blank">&#x4ECE; 0 &#x5230; 1 &#x5B9E;&#x73B0; React &#x7CFB;&#x5217; &#x2014;&#x2014; JSX &#x548C; Virtual DOM</a></li><li><a href="https://github.com/MuYunyun/blog/issues/25" rel="nofollow noreferrer" target="_blank">&#x4ECE; 0 &#x5230; 1 &#x5B9E;&#x73B0; React &#x7CFB;&#x5217; &#x2014;&#x2014; &#x7EC4;&#x4EF6;&#x548C; state|props</a></li></ul><h3 id="articleHeader0">&#x751F;&#x547D;&#x5468;&#x671F;</h3><p>&#x5148;&#x6765;&#x56DE;&#x987E; React &#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x7528;&#x6D41;&#x7A0B;&#x56FE;&#x8868;&#x793A;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015785465" src="https://static.alili.tech/img/remote/1460000015785465" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x8BE5;&#x6D41;&#x7A0B;&#x56FE;&#x6BD4;&#x8F83;&#x6E05;&#x6670;&#x5730;&#x5448;&#x73B0;&#x4E86; react &#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x3002;&#x5176;&#x5206;&#x4E3A; 3 &#x4E2A;&#x9636;&#x6BB5; &#x2014;&#x2014; &#x751F;&#x6210;&#x671F;&#xFF0C;&#x5B58;&#x5728;&#x671F;&#xFF0C;&#x9500;&#x6BC1;&#x671F;&#x3002;</p><p>&#x56E0;&#x4E3A;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x5B58;&#x5728;&#x4E8E;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x5C06;&#x4E4B;&#x524D; _render &#x51FD;&#x6570;&#x4F5C;&#x4E9B;&#x8C03;&#x6574;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x539F;&#x6765;&#x7684; _render &#x51FD;&#x6570;&#xFF0C;&#x4E3A;&#x4E86;&#x5C06;&#x804C;&#x8D23;&#x62C6;&#x5206;&#x5F97;&#x66F4;&#x7EC6;&#xFF0C;&#x5C06; virtual dom &#x8F6C;&#x4E3A; real dom &#x7684;&#x51FD;&#x6570;&#x5355;&#x72EC;&#x62BD;&#x79BB;&#x51FA;&#x6765;
function vdomToDom(vdom) {
  if (_.isFunction(vdom.nodeName)) {        // &#x4E3A;&#x4E86;&#x66F4;&#x52A0;&#x65B9;&#x4FBF;&#x5730;&#x4E66;&#x5199;&#x751F;&#x547D;&#x5468;&#x671F;&#x903B;&#x8F91;&#xFF0C;&#x5C06;&#x89E3;&#x6790;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x903B;&#x8F91;&#x548C;&#x4E00;&#x822C; html &#x6807;&#x7B7E;&#x7684;&#x903B;&#x8F91;&#x5206;&#x79BB;&#x5F00;
    const component = createComponent(vdom) // &#x6784;&#x9020;&#x7EC4;&#x4EF6;
    setProps(component)                     // &#x66F4;&#x6539;&#x7EC4;&#x4EF6; props
    renderComponent(component)              // &#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C06; dom &#x8282;&#x70B9;&#x8D4B;&#x503C;&#x5230; component
    return component.base                   // &#x8FD4;&#x56DE;&#x771F;&#x5B9E; dom
  }
  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x539F;&#x6765;&#x7684; _render &#x51FD;&#x6570;&#xFF0C;&#x4E3A;&#x4E86;&#x5C06;&#x804C;&#x8D23;&#x62C6;&#x5206;&#x5F97;&#x66F4;&#x7EC6;&#xFF0C;&#x5C06; virtual dom &#x8F6C;&#x4E3A; real dom &#x7684;&#x51FD;&#x6570;&#x5355;&#x72EC;&#x62BD;&#x79BB;&#x51FA;&#x6765;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">vdomToDom</span>(<span class="hljs-params">vdom</span>) </span>{
  <span class="hljs-keyword">if</span> (_.isFunction(vdom.nodeName)) {        <span class="hljs-comment">// &#x4E3A;&#x4E86;&#x66F4;&#x52A0;&#x65B9;&#x4FBF;&#x5730;&#x4E66;&#x5199;&#x751F;&#x547D;&#x5468;&#x671F;&#x903B;&#x8F91;&#xFF0C;&#x5C06;&#x89E3;&#x6790;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x903B;&#x8F91;&#x548C;&#x4E00;&#x822C; html &#x6807;&#x7B7E;&#x7684;&#x903B;&#x8F91;&#x5206;&#x79BB;&#x5F00;</span>
    <span class="hljs-keyword">const</span> component = createComponent(vdom) <span class="hljs-comment">// &#x6784;&#x9020;&#x7EC4;&#x4EF6;</span>
    setProps(component)                     <span class="hljs-comment">// &#x66F4;&#x6539;&#x7EC4;&#x4EF6; props</span>
    renderComponent(component)              <span class="hljs-comment">// &#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C06; dom &#x8282;&#x70B9;&#x8D4B;&#x503C;&#x5230; component</span>
    <span class="hljs-keyword">return</span> component.base                   <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x771F;&#x5B9E; dom</span>
  }
  ...
}</code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728; setProps &#x51FD;&#x6570;&#x5185;&#xFF08;&#x6E32;&#x67D3;&#x524D;&#xFF09;&#x52A0;&#x5165; <code>componentWillMount</code>&#xFF0C;<code>componentWillReceiveProps</code> &#x65B9;&#x6CD5;&#xFF0C;setProps &#x51FD;&#x6570;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setProps(component) {
  if (component &amp;&amp; component.componentWillMount) {
    component.componentWillMount()
  } else if (component.base &amp;&amp; component.componentWillReceiveProps) {
    component.componentWillReceiveProps(component.props) // &#x540E;&#x9762;&#x5F85;&#x5B9E;&#x73B0;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setProps</span>(<span class="hljs-params">component</span>) </span>{
  <span class="hljs-keyword">if</span> (component &amp;&amp; component.componentWillMount) {
    component.componentWillMount()
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (component.base &amp;&amp; component.componentWillReceiveProps) {
    component.componentWillReceiveProps(component.props) <span class="hljs-comment">// &#x540E;&#x9762;&#x5F85;&#x5B9E;&#x73B0;</span>
  }
}</code></pre><p>&#x800C;&#x540E;&#x6211;&#x4EEC;&#x5728; renderComponent &#x51FD;&#x6570;&#x5185;&#x52A0;&#x5165; <code>componentDidMount</code>&#x3001;<code>shouldComponentUpdate</code>&#x3001;<code>componentWillUpdate</code>&#x3001;<code>componentDidUpdate</code> &#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function renderComponent(component) {
  if (component.base &amp;&amp; component.shouldComponentUpdate) {
    const bool = component.shouldComponentUpdate(component.props, component.state)
    if (!bool &amp;&amp; bool !== undefined) {
      return false // shouldComponentUpdate() &#x8FD4;&#x56DE; false&#xFF0C;&#x5219;&#x751F;&#x547D;&#x5468;&#x671F;&#x7EC8;&#x6B62;
    }
  }
  if (component.base &amp;&amp; component.componentWillUpdate) {
    component.componentWillUpdate()
  }

  const rendered = component.render()
  const base = vdomToDom(rendered)

  if (component.base &amp;&amp; component.componentDidUpdate) {
    component.componentDidUpdate()
  } else if (component &amp;&amp; component.componentDidMount) {
    component.componentDidMount()
  }

  if (component.base &amp;&amp; component.base.parentNode) { // setState &#x8FDB;&#x5165;&#x6B64;&#x903B;&#x8F91;
    component.base.parentNode.replaceChild(base, component.base)
  }

  component.base = base  // &#x6807;&#x5FD7;&#x7B26;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderComponent</span>(<span class="hljs-params">component</span>) </span>{
  <span class="hljs-keyword">if</span> (component.base &amp;&amp; component.shouldComponentUpdate) {
    <span class="hljs-keyword">const</span> bool = component.shouldComponentUpdate(component.props, component.state)
    <span class="hljs-keyword">if</span> (!bool &amp;&amp; bool !== <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span> <span class="hljs-comment">// shouldComponentUpdate() &#x8FD4;&#x56DE; false&#xFF0C;&#x5219;&#x751F;&#x547D;&#x5468;&#x671F;&#x7EC8;&#x6B62;</span>
    }
  }
  <span class="hljs-keyword">if</span> (component.base &amp;&amp; component.componentWillUpdate) {
    component.componentWillUpdate()
  }

  <span class="hljs-keyword">const</span> rendered = component.render()
  <span class="hljs-keyword">const</span> base = vdomToDom(rendered)

  <span class="hljs-keyword">if</span> (component.base &amp;&amp; component.componentDidUpdate) {
    component.componentDidUpdate()
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (component &amp;&amp; component.componentDidMount) {
    component.componentDidMount()
  }

  <span class="hljs-keyword">if</span> (component.base &amp;&amp; component.base.parentNode) { <span class="hljs-comment">// setState &#x8FDB;&#x5165;&#x6B64;&#x903B;&#x8F91;</span>
    component.base.parentNode.replaceChild(base, component.base)
  }

  component.base = base  <span class="hljs-comment">// &#x6807;&#x5FD7;&#x7B26;</span>
}</code></pre><h4>&#x6D4B;&#x8BD5;&#x751F;&#x547D;&#x5468;&#x671F;</h4><p>&#x6D4B;&#x8BD5;&#x5982;&#x4E0B;&#x7528;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A extends Component {
  componentWillReceiveProps(props) {
    console.log(&apos;componentWillReceiveProps&apos;)
  }

  render() {
    return (
      &lt;div&gt;{this.props.count}&lt;/div&gt;
    )
  }
}

class B extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  componentWillMount() {
    console.log(&apos;componentWillMount&apos;)
  }

  componentDidMount() {
    console.log(&apos;componentDidMount&apos;)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(&apos;shouldComponentUpdate&apos;, nextProps, nextState)
    return true
  }

  componentWillUpdate() {
    console.log(&apos;componentWillUpdate&apos;)
  }

  componentDidUpdate() {
    console.log(&apos;componentDidUpdate&apos;)
  }

  click() {
    this.setState({
      count: ++this.state.count
    })
  }

  render() {
    console.log(&apos;render&apos;)
    return (
      &lt;div&gt;
        &lt;button onClick={this.click.bind(this)}&gt;Click Me!&lt;/button&gt;
        &lt;A count={this.state.count} /&gt;
      &lt;/div&gt;
    )
  }
}

ReactDOM.render(
  &lt;B /&gt;,
  document.getElementById(&apos;root&apos;)
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentWillReceiveProps(props) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;componentWillReceiveProps&apos;</span>)
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.count}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">B</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>
    }
  }

  componentWillMount() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;componentWillMount&apos;</span>)
  }

  componentDidMount() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;componentDidMount&apos;</span>)
  }

  shouldComponentUpdate(nextProps, nextState) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;shouldComponentUpdate&apos;</span>, nextProps, nextState)
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }

  componentWillUpdate() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;componentWillUpdate&apos;</span>)
  }

  componentDidUpdate() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;componentDidUpdate&apos;</span>)
  }

  click() {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">count</span>: ++<span class="hljs-keyword">this</span>.state.count
    })
  }

  render() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;render&apos;</span>)
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.click.bind(this)}</span>&gt;</span>Click Me!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">A</span> <span class="hljs-attr">count</span>=<span class="hljs-string">{this.state.count}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}

ReactDOM.render(
  <span class="hljs-tag">&lt;<span class="hljs-name">B</span> /&gt;</span>,
  document.getElementById(&apos;root&apos;)
)</span></code></pre><p>&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x65F6;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillMount
render
componentDidMount" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code><span class="hljs-attribute">componentWillMount
render
componentDidMount</span></code></pre><p>&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x65F6;&#x8F93;&#x51FA;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate
componentWillUpdate
render
componentDidUpdate" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code><span class="hljs-attribute">shouldComponentUpdate
componentWillUpdate
render
componentDidUpdate</span></code></pre><h3 id="articleHeader1">diff &#x7684;&#x5B9E;&#x73B0;</h3><p>&#x5728; react &#x4E2D;&#xFF0C;diff &#x5B9E;&#x73B0;&#x7684;&#x601D;&#x8DEF;&#x662F;&#x5C06;&#x65B0;&#x8001; virtual dom &#x8FDB;&#x884C;&#x6BD4;&#x8F83;&#xFF0C;&#x5C06;&#x6BD4;&#x8F83;&#x540E;&#x7684; patch&#xFF08;&#x8865;&#x4E01;&#xFF09;&#x6E32;&#x67D3;&#x5230;&#x9875;&#x9762;&#x4E0A;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x5C40;&#x90E8;&#x5237;&#x65B0;&#xFF1B;&#x672C;&#x6587;&#x501F;&#x9274;&#x4E86; <a href="https://github.com/developit/preact" rel="nofollow noreferrer" target="_blank">preact</a> &#x548C; <a href="https://github.com/hujiulong/simple-react" rel="nofollow noreferrer" target="_blank">simple-react</a> &#x4E2D;&#x7684; diff &#x5B9E;&#x73B0;&#xFF0C;&#x603B;&#x4F53;&#x601D;&#x8DEF;&#x662F;&#x5C06;&#x65E7;&#x7684; dom &#x8282;&#x70B9;&#x548C;&#x65B0;&#x7684; virtual dom &#x8282;&#x70B9;&#x8FDB;&#x884C;&#x4E86;&#x6BD4;&#x8F83;&#xFF0C;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x6BD4;&#x8F83;&#x7C7B;&#x578B;&#xFF08;&#x6587;&#x672C;&#x8282;&#x70B9;&#x3001;&#x975E;&#x6587;&#x672C;&#x8282;&#x70B9;&#x3001;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#xFF09;&#x8C03;&#x7528;&#x76F8;&#x5E94;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x9875;&#x9762;&#x7684;&#x5C40;&#x90E8;&#x6E32;&#x67D3;&#x3002;&#x4EE3;&#x7801;&#x603B;&#x4F53;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x6BD4;&#x8F83;&#x65E7;&#x7684; dom &#x8282;&#x70B9;&#x548C;&#x65B0;&#x7684; virtual dom &#x8282;&#x70B9;&#xFF1A;
 * @param {*} oldDom  &#x65E7;&#x7684; dom &#x8282;&#x70B9;
 * @param {*} newVdom &#x65B0;&#x7684; virtual dom &#x8282;&#x70B9;
 */
function diff(oldDom, newVdom) {
  ...
  if (_.isString(newVdom)) {
    return diffTextDom(oldDom, newVdom)   // &#x5BF9;&#x6BD4;&#x6587;&#x672C; dom &#x8282;&#x70B9;
  }

  if (oldDom.nodeName.toLowerCase() !== newVdom.nodeName) {
    diffNotTextDom(oldDom, newVdom)       // &#x5BF9;&#x6BD4;&#x975E;&#x6587;&#x672C; dom &#x8282;&#x70B9;
  }

  if (_.isFunction(newVdom.nodeName)) {
    return diffComponent(oldDom, newVdom) // &#x5BF9;&#x6BD4;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;
  }

  diffAttribute(oldDom, newVdom)          // &#x5BF9;&#x6BD4;&#x5C5E;&#x6027;

  if (newVdom.children.length &gt; 0) {
    diffChild(oldDom, newVdom)            // &#x904D;&#x5386;&#x5BF9;&#x6BD4;&#x5B50;&#x8282;&#x70B9;
  }

  return oldDom
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x6BD4;&#x8F83;&#x65E7;&#x7684; dom &#x8282;&#x70B9;&#x548C;&#x65B0;&#x7684; virtual dom &#x8282;&#x70B9;&#xFF1A;
 * @param {*} oldDom  &#x65E7;&#x7684; dom &#x8282;&#x70B9;
 * @param {*} newVdom &#x65B0;&#x7684; virtual dom &#x8282;&#x70B9;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diff</span>(<span class="hljs-params">oldDom, newVdom</span>) </span>{
  ...
  if (_.isString(newVdom)) {
    <span class="hljs-keyword">return</span> diffTextDom(oldDom, newVdom)   <span class="hljs-comment">// &#x5BF9;&#x6BD4;&#x6587;&#x672C; dom &#x8282;&#x70B9;</span>
  }

  <span class="hljs-keyword">if</span> (oldDom.nodeName.toLowerCase() !== newVdom.nodeName) {
    diffNotTextDom(oldDom, newVdom)       <span class="hljs-comment">// &#x5BF9;&#x6BD4;&#x975E;&#x6587;&#x672C; dom &#x8282;&#x70B9;</span>
  }

  <span class="hljs-keyword">if</span> (_.isFunction(newVdom.nodeName)) {
    <span class="hljs-keyword">return</span> diffComponent(oldDom, newVdom) <span class="hljs-comment">// &#x5BF9;&#x6BD4;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</span>
  }

  diffAttribute(oldDom, newVdom)          <span class="hljs-comment">// &#x5BF9;&#x6BD4;&#x5C5E;&#x6027;</span>

  <span class="hljs-keyword">if</span> (newVdom.children.length &gt; <span class="hljs-number">0</span>) {
    diffChild(oldDom, newVdom)            <span class="hljs-comment">// &#x904D;&#x5386;&#x5BF9;&#x6BD4;&#x5B50;&#x8282;&#x70B9;</span>
  }

  <span class="hljs-keyword">return</span> oldDom
}</code></pre><p>&#x4E0B;&#x9762;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x6BD4;&#x8F83;&#x7C7B;&#x578B;&#x5B9E;&#x73B0;&#x76F8;&#x5E94;&#x903B;&#x8F91;&#x3002;</p><h4>&#x5BF9;&#x6BD4;&#x6587;&#x672C;&#x8282;&#x70B9;</h4><p>&#x9996;&#x5148;&#x8FDB;&#x884C;&#x8F83;&#x4E3A;&#x7B80;&#x5355;&#x7684;&#x6587;&#x672C;&#x8282;&#x70B9;&#x7684;&#x6BD4;&#x8F83;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5BF9;&#x6BD4;&#x6587;&#x672C;&#x8282;&#x70B9;
function diffTextDom(oldDom, newVdom) {
  let dom = oldDom
  if (oldDom &amp;&amp; oldDom.nodeType === 3) {  // &#x5982;&#x679C;&#x8001;&#x8282;&#x70B9;&#x662F;&#x6587;&#x672C;&#x8282;&#x70B9;
    if (oldDom.textContent !== newVdom) { // &#x8FD9;&#x91CC;&#x4E00;&#x4E2A;&#x7EC6;&#x8282;&#xFF1A;textContent/innerHTML/innerText &#x7684;&#x533A;&#x522B;
      oldDom.textContent = newVdom
    }
  } else {                                // &#x5982;&#x679C;&#x65E7; dom &#x5143;&#x7D20;&#x4E0D;&#x4E3A;&#x6587;&#x672C;&#x8282;&#x70B9;
    dom = document.createTextNode(newVdom)
    if (oldDom &amp;&amp; oldDom.parentNode) {
      oldDom.parentNode.replaceChild(dom, oldDom)
    }
  }
  return dom
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5BF9;&#x6BD4;&#x6587;&#x672C;&#x8282;&#x70B9;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffTextDom</span>(<span class="hljs-params">oldDom, newVdom</span>) </span>{
  <span class="hljs-keyword">let</span> dom = oldDom
  <span class="hljs-keyword">if</span> (oldDom &amp;&amp; oldDom.nodeType === <span class="hljs-number">3</span>) {  <span class="hljs-comment">// &#x5982;&#x679C;&#x8001;&#x8282;&#x70B9;&#x662F;&#x6587;&#x672C;&#x8282;&#x70B9;</span>
    <span class="hljs-keyword">if</span> (oldDom.textContent !== newVdom) { <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x4E00;&#x4E2A;&#x7EC6;&#x8282;&#xFF1A;textContent/innerHTML/innerText &#x7684;&#x533A;&#x522B;</span>
      oldDom.textContent = newVdom
    }
  } <span class="hljs-keyword">else</span> {                                <span class="hljs-comment">// &#x5982;&#x679C;&#x65E7; dom &#x5143;&#x7D20;&#x4E0D;&#x4E3A;&#x6587;&#x672C;&#x8282;&#x70B9;</span>
    dom = <span class="hljs-built_in">document</span>.createTextNode(newVdom)
    <span class="hljs-keyword">if</span> (oldDom &amp;&amp; oldDom.parentNode) {
      oldDom.parentNode.replaceChild(dom, oldDom)
    }
  }
  <span class="hljs-keyword">return</span> dom
}</code></pre><h4>&#x5BF9;&#x6BD4;&#x975E;&#x6587;&#x672C;&#x8282;&#x70B9;</h4><p>&#x5BF9;&#x6BD4;&#x975E;&#x6587;&#x672C;&#x8282;&#x70B9;&#xFF0C;&#x5176;&#x601D;&#x8DEF;&#x4E3A;&#x5C06;&#x540C;&#x5C42;&#x7EA7;&#x7684;&#x65E7;&#x8282;&#x70B9;&#x66FF;&#x6362;&#x4E3A;&#x65B0;&#x8282;&#x70B9;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5BF9;&#x6BD4;&#x975E;&#x6587;&#x672C;&#x8282;&#x70B9;
function diffNotTextDom(oldDom, newVdom) {
  const newDom = document.createElement(newVdom.nodeName);
  [...oldDom.childNodes].map(newDom.appendChild) // &#x5C06;&#x65E7;&#x8282;&#x70B9;&#x4E0B;&#x7684;&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x5230;&#x65B0;&#x8282;&#x70B9;&#x4E0B;
  if (oldDom &amp;&amp; oldDom.parentNode) {
    oldDom.parentNode.replaceChild(oldDom, newDom)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5BF9;&#x6BD4;&#x975E;&#x6587;&#x672C;&#x8282;&#x70B9;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffNotTextDom</span>(<span class="hljs-params">oldDom, newVdom</span>) </span>{
  <span class="hljs-keyword">const</span> newDom = <span class="hljs-built_in">document</span>.createElement(newVdom.nodeName);
  [...oldDom.childNodes].map(newDom.appendChild) <span class="hljs-comment">// &#x5C06;&#x65E7;&#x8282;&#x70B9;&#x4E0B;&#x7684;&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x5230;&#x65B0;&#x8282;&#x70B9;&#x4E0B;</span>
  <span class="hljs-keyword">if</span> (oldDom &amp;&amp; oldDom.parentNode) {
    oldDom.parentNode.replaceChild(oldDom, newDom)
  }
}</code></pre><h4>&#x5BF9;&#x6BD4;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</h4><p>&#x5BF9;&#x6BD4;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7684;&#x601D;&#x8DEF;&#x4E3A;&#xFF1A;&#x5982;&#x679C;&#x65B0;&#x8001;&#x7EC4;&#x4EF6;&#x4E0D;&#x540C;&#xFF0C;&#x5219;&#x76F4;&#x63A5;&#x5C06;&#x65B0;&#x7EC4;&#x4EF6;&#x66FF;&#x6362;&#x8001;&#x7EC4;&#x4EF6;&#xFF1B;&#x5982;&#x679C;&#x65B0;&#x8001;&#x7EC4;&#x4EF6;&#x76F8;&#x540C;&#xFF0C;&#x5219;&#x5C06;&#x65B0;&#x7EC4;&#x4EF6;&#x7684; props &#x8D4B;&#x5230;&#x8001;&#x7EC4;&#x4EF6;&#x4E0A;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5BF9;&#x83B7;&#x5F97;&#x65B0; props &#x524D;&#x540E;&#x7684;&#x8001;&#x7EC4;&#x4EF6;&#x505A; diff &#x6BD4;&#x8F83;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5BF9;&#x6BD4;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;
function diffComponent(oldDom, newVdom) {
  if (oldDom._component &amp;&amp; (oldDom._component.constructor !== newVdom.nodeName)) { // &#x5982;&#x679C;&#x65B0;&#x8001;&#x7EC4;&#x4EF6;&#x4E0D;&#x540C;&#xFF0C;&#x5219;&#x76F4;&#x63A5;&#x5C06;&#x65B0;&#x7EC4;&#x4EF6;&#x66FF;&#x6362;&#x8001;&#x7EC4;&#x4EF6;
    const newDom = vdomToDom(newVdom)
    oldDom._component.parentNode.insertBefore(newDom, oldDom._component)
    oldDom._component.parentNode.removeChild(oldDom._component)
  } else {
    setProps(oldDom._component, newVdom.attributes) // &#x5982;&#x679C;&#x65B0;&#x8001;&#x7EC4;&#x4EF6;&#x76F8;&#x540C;&#xFF0C;&#x5219;&#x5C06;&#x65B0;&#x7EC4;&#x4EF6;&#x7684; props &#x8D4B;&#x5230;&#x8001;&#x7EC4;&#x4EF6;&#x4E0A;
    renderComponent(oldDom._component)              // &#x5BF9;&#x83B7;&#x5F97;&#x65B0; props &#x524D;&#x540E;&#x7684;&#x8001;&#x7EC4;&#x4EF6;&#x505A; diff &#x6BD4;&#x8F83;&#xFF08;renderComponent &#x4E2D;&#x8C03;&#x7528;&#x4E86; diff&#xFF09;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5BF9;&#x6BD4;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffComponent</span>(<span class="hljs-params">oldDom, newVdom</span>) </span>{
  <span class="hljs-keyword">if</span> (oldDom._component &amp;&amp; (oldDom._component.constructor !== newVdom.nodeName)) { <span class="hljs-comment">// &#x5982;&#x679C;&#x65B0;&#x8001;&#x7EC4;&#x4EF6;&#x4E0D;&#x540C;&#xFF0C;&#x5219;&#x76F4;&#x63A5;&#x5C06;&#x65B0;&#x7EC4;&#x4EF6;&#x66FF;&#x6362;&#x8001;&#x7EC4;&#x4EF6;</span>
    <span class="hljs-keyword">const</span> newDom = vdomToDom(newVdom)
    oldDom._component.parentNode.insertBefore(newDom, oldDom._component)
    oldDom._component.parentNode.removeChild(oldDom._component)
  } <span class="hljs-keyword">else</span> {
    setProps(oldDom._component, newVdom.attributes) <span class="hljs-comment">// &#x5982;&#x679C;&#x65B0;&#x8001;&#x7EC4;&#x4EF6;&#x76F8;&#x540C;&#xFF0C;&#x5219;&#x5C06;&#x65B0;&#x7EC4;&#x4EF6;&#x7684; props &#x8D4B;&#x5230;&#x8001;&#x7EC4;&#x4EF6;&#x4E0A;</span>
    renderComponent(oldDom._component)              <span class="hljs-comment">// &#x5BF9;&#x83B7;&#x5F97;&#x65B0; props &#x524D;&#x540E;&#x7684;&#x8001;&#x7EC4;&#x4EF6;&#x505A; diff &#x6BD4;&#x8F83;&#xFF08;renderComponent &#x4E2D;&#x8C03;&#x7528;&#x4E86; diff&#xFF09;</span>
  }
}</code></pre><h4>&#x904D;&#x5386;&#x5BF9;&#x6BD4;&#x5B50;&#x8282;&#x70B9;</h4><p>&#x904D;&#x5386;&#x5BF9;&#x6BD4;&#x5B50;&#x8282;&#x70B9;&#x7684;&#x7B56;&#x7565;&#x6709;&#x4E24;&#x4E2A;&#xFF1A;&#x4E00;&#x662F;&#x53EA;&#x6BD4;&#x8F83;&#x540C;&#x5C42;&#x7EA7;&#x7684;&#x8282;&#x70B9;&#xFF0C;&#x4E8C;&#x662F;&#x7ED9;&#x8282;&#x70B9;&#x52A0;&#x4E0A; key &#x5C5E;&#x6027;&#x3002;&#x5B83;&#x4EEC;&#x7684;&#x76EE;&#x7684;&#x90FD;&#x662F;&#x964D;&#x4F4E;&#x7A7A;&#x95F4;&#x590D;&#x6742;&#x5EA6;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5BF9;&#x6BD4;&#x5B50;&#x8282;&#x70B9;
function diffChild(oldDom, newVdom) {
  const keyed = {}
  const children = []
  const oldChildNodes = oldDom.childNodes
  for (let i = 0; i &lt; oldChildNodes.length; i++) {
    if (oldChildNodes[i].key) { // &#x5C06;&#x542B;&#x6709; key &#x7684;&#x8282;&#x70B9;&#x5B58;&#x8FDB;&#x5BF9;&#x8C61; keyed
      keyed[oldChildNodes[i].key] = oldChildNodes[i]
    } else {                    // &#x5C06;&#x4E0D;&#x542B;&#x6709; key &#x7684;&#x8282;&#x70B9;&#x5B58;&#x8FDB;&#x6570;&#x7EC4; children
      children.push(oldChildNodes[i])
    }
  }

  const newChildNodes = newVdom.children
  let child
  for (let i = 0; i &lt; newChildNodes.length; i++) {
    if (keyed[newChildNodes[i].key]) {  // &#x5BF9;&#x5E94;&#x4E0A;&#x9762;&#x5B58;&#x5728; key &#x7684;&#x60C5;&#x5F62;
      child = keyed[newChildNodes[i].key]
      keyed[newChildNodes[i].key] = undefined
    } else {                            // &#x5BF9;&#x5E94;&#x4E0A;&#x9762;&#x4E0D;&#x5B58;&#x5728; key &#x7684;&#x60C5;&#x5F62;
      for (let j = 0; j &lt; children.length; j++) {
        if (isSameNodeType(children[i], newChildNodes[i])) { // &#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728; key&#xFF0C;&#x5219;&#x4F18;&#x5148;&#x627E;&#x5230;&#x8282;&#x70B9;&#x7C7B;&#x578B;&#x76F8;&#x540C;&#x7684;&#x5143;&#x7D20;
          child = children[i]
          children[i] = undefined
          break
        }
      }
    }
    diff(child, newChildNodes[i]) // &#x9012;&#x5F52;&#x6BD4;&#x8F83;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x5BF9;&#x6BD4;&#x5B50;&#x8282;&#x70B9;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">diffChild</span>(<span class="hljs-params">oldDom, newVdom</span>) </span>{
  <span class="hljs-keyword">const</span> keyed = {}
  <span class="hljs-keyword">const</span> children = []
  <span class="hljs-keyword">const</span> oldChildNodes = oldDom.childNodes
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; oldChildNodes.length; i++) {
    <span class="hljs-keyword">if</span> (oldChildNodes[i].key) { <span class="hljs-comment">// &#x5C06;&#x542B;&#x6709; key &#x7684;&#x8282;&#x70B9;&#x5B58;&#x8FDB;&#x5BF9;&#x8C61; keyed</span>
      keyed[oldChildNodes[i].key] = oldChildNodes[i]
    } <span class="hljs-keyword">else</span> {                    <span class="hljs-comment">// &#x5C06;&#x4E0D;&#x542B;&#x6709; key &#x7684;&#x8282;&#x70B9;&#x5B58;&#x8FDB;&#x6570;&#x7EC4; children</span>
      children.push(oldChildNodes[i])
    }
  }

  <span class="hljs-keyword">const</span> newChildNodes = newVdom.children
  <span class="hljs-keyword">let</span> child
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; newChildNodes.length; i++) {
    <span class="hljs-keyword">if</span> (keyed[newChildNodes[i].key]) {  <span class="hljs-comment">// &#x5BF9;&#x5E94;&#x4E0A;&#x9762;&#x5B58;&#x5728; key &#x7684;&#x60C5;&#x5F62;</span>
      child = keyed[newChildNodes[i].key]
      keyed[newChildNodes[i].key] = <span class="hljs-literal">undefined</span>
    } <span class="hljs-keyword">else</span> {                            <span class="hljs-comment">// &#x5BF9;&#x5E94;&#x4E0A;&#x9762;&#x4E0D;&#x5B58;&#x5728; key &#x7684;&#x60C5;&#x5F62;</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; children.length; j++) {
        <span class="hljs-keyword">if</span> (isSameNodeType(children[i], newChildNodes[i])) { <span class="hljs-comment">// &#x5982;&#x679C;&#x4E0D;&#x5B58;&#x5728; key&#xFF0C;&#x5219;&#x4F18;&#x5148;&#x627E;&#x5230;&#x8282;&#x70B9;&#x7C7B;&#x578B;&#x76F8;&#x540C;&#x7684;&#x5143;&#x7D20;</span>
          child = children[i]
          children[i] = <span class="hljs-literal">undefined</span>
          <span class="hljs-keyword">break</span>
        }
      }
    }
    diff(child, newChildNodes[i]) <span class="hljs-comment">// &#x9012;&#x5F52;&#x6BD4;&#x8F83;</span>
  }
}</code></pre><h3 id="articleHeader2">&#x6D4B;&#x8BD5;</h3><p>&#x5728;&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x5C0F;&#x8282;&#x4E2D;&#xFF0C;componentWillReceiveProps &#x65B9;&#x6CD5;&#x8FD8;&#x672A;&#x8DD1;&#x901A;&#xFF0C;&#x7A0D;&#x52A0;&#x4FEE;&#x6539; setProps &#x51FD;&#x6570;&#x5373;&#x53EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x66F4;&#x6539;&#x5C5E;&#x6027;&#xFF0C;componentWillMount &#x548C; componentWillReceiveProps &#x65B9;&#x6CD5;
 */
function setProps(component, attributes) {
  if (attributes) {
    component.props = attributes // &#x8FD9;&#x6BB5;&#x903B;&#x8F91;&#x5BF9;&#x5E94;&#x4E0A;&#x6587;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x6BD4;&#x8F83;&#x4E2D;&#x65B0;&#x8001;&#x7EC4;&#x4EF6;&#x76F8;&#x540C;&#x65F6; setProps &#x7684;&#x903B;&#x8F91;
  }

  if (component &amp;&amp; component.base &amp;&amp; component.componentWillReceiveProps) {
    component.componentWillReceiveProps(component.props)
  } else if (component &amp;&amp; component.componentWillMount) {
    component.componentWillMount()
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * &#x66F4;&#x6539;&#x5C5E;&#x6027;&#xFF0C;componentWillMount &#x548C; componentWillReceiveProps &#x65B9;&#x6CD5;
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setProps</span>(<span class="hljs-params">component, attributes</span>) </span>{
  <span class="hljs-keyword">if</span> (attributes) {
    component.props = attributes <span class="hljs-comment">// &#x8FD9;&#x6BB5;&#x903B;&#x8F91;&#x5BF9;&#x5E94;&#x4E0A;&#x6587;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x6BD4;&#x8F83;&#x4E2D;&#x65B0;&#x8001;&#x7EC4;&#x4EF6;&#x76F8;&#x540C;&#x65F6; setProps &#x7684;&#x903B;&#x8F91;</span>
  }

  <span class="hljs-keyword">if</span> (component &amp;&amp; component.base &amp;&amp; component.componentWillReceiveProps) {
    component.componentWillReceiveProps(component.props)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (component &amp;&amp; component.componentWillMount) {
    component.componentWillMount()
  }
}</code></pre><p>&#x6765;&#x6D4B;&#x8BD5;&#x4E0B;&#x751F;&#x547D;&#x5468;&#x671F;&#x5C0F;&#x8282;&#x4E2D;&#x6700;&#x540E;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#xFF1A;</p><ul><li>&#x751F;&#x547D;&#x5468;&#x671F;&#x6D4B;&#x8BD5;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000015785466" src="https://static.alili.tech/img/remote/1460000015785466" alt="" title="" style="cursor:pointer;display:inline"></span></p><ul><li>diff &#x6D4B;&#x8BD5;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000015785467" src="https://static.alili.tech/img/remote/1460000015785467" alt="" title="" style="cursor:pointer"></span></p><p><a href="https://github.com/MuYunyun/cpreact" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x5730;&#x5740;</a>&#xFF0C;<a href="https://github.com/MuYunyun/cpreact/blob/master/.github/PULL_REQUEST_TEMPLATE.md" rel="nofollow noreferrer" target="_blank">&#x5173;&#x4E8E;&#x5982;&#x4F55; pr</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 0 到 1 实现 React 系列 —— 生命周期和 diff 算法

## 原文链接
[https://segmentfault.com/a/1190000015785461](https://segmentfault.com/a/1190000015785461)

