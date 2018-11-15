---
title: 精读《Epitath 源码 - renderProps 新用法》
hidden: true
categories: reprint
slug: c268ea76
date: 2018-11-04 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">1 &#x5F15;&#x8A00;</h2><p>&#x5F88;&#x9AD8;&#x5174;&#x8FD9;&#x4E00;&#x671F;&#x7684;&#x8BDD;&#x9898;&#x662F;&#x7531; <a href="https://github.com/Astrocoders/epitath" rel="nofollow noreferrer" target="_blank">epitath</a> &#x7684;&#x4F5C;&#x8005; <a href="https://github.com/grsabreu" rel="nofollow noreferrer" target="_blank">grsabreu</a> &#x63D0;&#x4F9B;&#x7684;&#x3002;</p><p>&#x524D;&#x7AEF;&#x53D1;&#x5C55;&#x4E86; 20 &#x591A;&#x5E74;&#xFF0C;&#x968F;&#x7740;&#x53D1;&#x5C55;&#x4E2D;&#x56FD;&#x5BB6;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#x7684;&#x4E92;&#x8054;&#x7F51;&#x4ECE;&#x4E1A;&#x8005;&#x6D8C;&#x5165;&#xFF0C;&#x73B0;&#x5728;&#x524D;&#x7AEF;&#x77E5;&#x8BC6;&#x73B2;&#x7405;&#x6EE1;&#x8DB3;&#xFF0C;&#x6982;&#x5FF5;&#x3001;&#x5E93;&#x4E5F;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#x3002;&#x867D;&#x7136;&#x5185;&#x5BB9;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#xFF0C;&#x4F46;&#x4F5C;&#x4E3A;&#x4E2A;&#x4F53;&#x7684;&#x4F60;&#x7684;&#x65F6;&#x95F4;&#x5E76;&#x6CA1;&#x6709;&#x589E;&#x591A;&#xFF0C;&#x5982;&#x4F55;&#x6301;&#x7EED;&#x5B66;&#x4E60;&#x65B0;&#x77E5;&#x8BC6;&#xFF0C;&#x5B66;&#x4EC0;&#x4E48;&#x5C06;&#x4F1A;&#x662F;&#x4E2A;&#x5927;&#x95EE;&#x9898;&#x3002;</p><p>&#x524D;&#x7AEF;&#x7CBE;&#x8BFB;&#x901A;&#x8FC7;&#x5438;&#x5F15;&#x4F18;&#x8D28;&#x7684;&#x7528;&#x6237;&#xFF0C;&#x63D0;&#x4F9B;&#x6700;&#x524D;&#x6CBF;&#x7684;&#x8BDD;&#x9898;&#x6216;&#x8005;&#x8BBE;&#x8BA1;&#x7406;&#x5FF5;&#xFF0C;&#x867D;&#x7136;&#x6BCF;&#x5468;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x4E0D;&#x8DB3;&#x4EE5;&#x6982;&#x62EC;&#x8FD9;&#x4E00;&#x5468;&#x7684;&#x6240;&#x6709;&#x7126;&#x70B9;&#xFF0C;&#x4F46;&#x53EF;&#x4EE5;&#x4FDD;&#x8BC1;&#x4F60;&#x9605;&#x8BFB;&#x7684;&#x8FD9;&#x5341;&#x51E0;&#x5206;&#x949F;&#x6CA1;&#x6709;&#x5728;&#x6D6A;&#x8D39;&#x65F6;&#x95F4;&#xFF0C;&#x6BCF;&#x4E00;&#x7BC7;&#x7CBE;&#x8BFB;&#x90FD;&#x662F;&#x7ECF;&#x8FC7;&#x7CBE;&#x5FC3;&#x7B5B;&#x9009;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x65E2;&#x8BA8;&#x8BBA;&#x5927;&#x5BB6;&#x5173;&#x6CE8;&#x7684;&#x7126;&#x70B9;&#xFF0C;&#x4E5F;&#x80FD;&#x627E;&#x5230;&#x4ED3;&#x5E93;&#x89D2;&#x843D;&#x88AB;&#x9057;&#x5FD8;&#x7684;&#x73CD;&#x73E0;&#x3002;</p><h2 id="articleHeader1">2 &#x6982;&#x8FF0;</h2><p>&#x5728;&#x4ECB;&#x7ECD; Epitath &#x4E4B;&#x524D;&#xFF0C;&#x5148;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B; renderProps&#x3002;</p><p>renderProps &#x662F; jsx &#x7684;&#x4E00;&#x79CD;&#x5B9E;&#x8DF5;&#x65B9;&#x5F0F;&#xFF0C;renderProps &#x7EC4;&#x4EF6;&#x5E76;&#x4E0D;&#x6E32;&#x67D3; dom&#xFF0C;&#x4F46;&#x63D0;&#x4F9B;&#x4E86;&#x6301;&#x4E45;&#x5316;&#x6570;&#x636E;&#x4E0E;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5E2E;&#x52A9;&#x51CF;&#x5C11;&#x5BF9;&#x5F53;&#x524D;&#x7EC4;&#x4EF6; state &#x7684;&#x4F9D;&#x8D56;&#x3002;</p><h3 id="articleHeader2">RenderProps &#x7684;&#x6982;&#x5FF5;</h3><p><a href="https://github.com/renatorib/react-powerplug" rel="nofollow noreferrer" target="_blank">react-powerplug</a> &#x5C31;&#x662F;&#x4E00;&#x4E2A; renderProps &#x5DE5;&#x5177;&#x5E93;&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x770B;&#x53EF;&#x4EE5;&#x505A;&#x4E9B;&#x4EC0;&#x4E48;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Toggle initial={true}&gt;
  {({ on, toggle }) =&gt; &lt;Checkbox checked={on} onChange={toggle} /&gt;}
&lt;/Toggle&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code class="jsx"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Toggle</span> <span class="hljs-attr">initial</span>=</span></span><span class="hljs-template-variable">{true}</span><span class="xml"><span class="hljs-tag">&gt;</span>
  </span><span class="hljs-template-variable">{({ on, toggle }</span><span class="xml">) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">Checkbox</span> <span class="hljs-attr">checked</span>=</span></span><span class="hljs-template-variable">{on}</span><span class="xml"><span class="hljs-tag"> <span class="hljs-attr">onChange</span>=</span></span><span class="hljs-template-variable">{toggle}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>}
<span class="hljs-tag">&lt;/<span class="hljs-name">Toggle</span>&gt;</span></span></code></pre><p><code>Toggle</code> &#x5C31;&#x662F;&#x4E00;&#x4E2A; renderProps &#x7EC4;&#x4EF6;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x63A7;&#x5236;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;&#x3002;&#x6BD4;&#x5982;&#x4EC5;&#x4EC5;&#x5229;&#x7528; <code>Toggle</code>&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5927;&#x5927;&#x7B80;&#x5316; <code>Modal</code> &#x7EC4;&#x4EF6;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends React.Component {
  state = { visible: false };

  showModal = () =&gt; {
    this.setState({
      visible: true
    });
  };

  handleOk = e =&gt; {
    this.setState({
      visible: false
    });
  };

  handleCancel = e =&gt; {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      &lt;div&gt;
        &lt;Button type=&quot;primary&quot; onClick={this.showModal}&gt;
          Open Modal
        &lt;/Button&gt;
        &lt;Modal
          title=&quot;Basic Modal&quot;
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        &gt;
          &lt;p&gt;Some contents...&lt;/p&gt;
          &lt;p&gt;Some contents...&lt;/p&gt;
          &lt;p&gt;Some contents...&lt;/p&gt;
        &lt;/Modal&gt;
      &lt;/div&gt;
    );
  }
}

ReactDOM.render(&lt;App /&gt;, mountNode);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = { <span class="hljs-attr">visible</span>: <span class="hljs-literal">false</span> };

  showModal = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">visible</span>: <span class="hljs-literal">true</span>
    });
  };

  handleOk = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">visible</span>: <span class="hljs-literal">false</span>
    });
  };

  handleCancel = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">visible</span>: <span class="hljs-literal">false</span>
    });
  };

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;primary&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.showModal}</span>&gt;</span>
          Open Modal
        <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Modal</span>
          <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Basic Modal&quot;</span>
          <span class="hljs-attr">visible</span>=<span class="hljs-string">{this.state.visible}</span>
          <span class="hljs-attr">onOk</span>=<span class="hljs-string">{this.handleOk}</span>
          <span class="hljs-attr">onCancel</span>=<span class="hljs-string">{this.handleCancel}</span>
        &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some contents...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some contents...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some contents...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, mountNode);</span></code></pre><p>&#x8FD9;&#x662F; Modal &#x6807;&#x51C6;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>Toggle</code> &#x7B80;&#x5316;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends React.Component {
  render() {
    return (
      &lt;Toggle initial={false}&gt;
        {({ on, toggle }) =&gt; (
          &lt;Button type=&quot;primary&quot; onClick={toggle}&gt;
            Open Modal
          &lt;/Button&gt;
          &lt;Modal
            title=&quot;Basic Modal&quot;
            visible={on}
            onOk={toggle}
            onCancel={toggle}
          &gt;
            &lt;p&gt;Some contents...&lt;/p&gt;
            &lt;p&gt;Some contents...&lt;/p&gt;
            &lt;p&gt;Some contents...&lt;/p&gt;
          &lt;/Modal&gt;
        )}
      &lt;/Toggle&gt;
    );
  }
}

ReactDOM.render(&lt;App /&gt;, mountNode);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Toggle</span> <span class="hljs-attr">initial</span>=<span class="hljs-string">{false}</span>&gt;</span>
        {({ on, toggle }) =&gt; (
          <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;primary&quot;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{toggle}</span>&gt;</span>
            Open Modal
          <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Modal</span>
            <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;Basic Modal&quot;</span>
            <span class="hljs-attr">visible</span>=<span class="hljs-string">{on}</span>
            <span class="hljs-attr">onOk</span>=<span class="hljs-string">{toggle}</span>
            <span class="hljs-attr">onCancel</span>=<span class="hljs-string">{toggle}</span>
          &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some contents...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some contents...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Some contents...<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">Toggle</span>&gt;</span></span>
    );
  }
}

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, mountNode);</span></code></pre><p>&#x7701;&#x6389;&#x4E86; state&#x3001;&#x4E00;&#x5806;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x800C;&#x4E14;&#x4EE3;&#x7801;&#x66F4;&#x7B80;&#x6D01;&#xFF0C;&#x66F4;&#x8BED;&#x4E49;&#x5316;&#x3002;</p><blockquote>renderProps &#x5185;&#x90E8;&#x7BA1;&#x7406;&#x7684;&#x72B6;&#x6001;&#x4E0D;&#x65B9;&#x4FBF;&#x4ECE;&#x5916;&#x90E8;&#x83B7;&#x53D6;&#xFF0C;&#x56E0;&#x6B64;&#x53EA;&#x9002;&#x5408;&#x4FDD;&#x5B58;&#x4E1A;&#x52A1;&#x65E0;&#x5173;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x6BD4;&#x5982; Modal &#x663E;&#x9690;&#x3002;</blockquote><h3 id="articleHeader3">RenderProps &#x5D4C;&#x5957;&#x95EE;&#x9898;&#x7684;&#x89E3;&#x6CD5;</h3><p>renderProps &#x867D;&#x7136;&#x597D;&#x7528;&#xFF0C;&#x4F46;&#x5F53;&#x6211;&#x4EEC;&#x60F3;&#x7EC4;&#x5408;&#x4F7F;&#x7528;&#x65F6;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x9047;&#x5230;&#x5C42;&#x5C42;&#x5D4C;&#x5957;&#x7684;&#x95EE;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Counter initial={5}&gt;
  {counter =&gt; {
    &lt;Toggle initial={false}&gt;
      {toggle =&gt; {
        &lt;MyComponent counter={counter.count} toggle={toggle.on} /&gt;;
      }}
    &lt;/Toggle&gt;;
  }}
&lt;/Counter&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="jsx"><span class="hljs-tag">&lt;<span class="hljs-name">Counter</span> <span class="hljs-attr">initial</span>=<span class="hljs-string">{5}</span>&gt;</span>
  {counter =&gt; {
    <span class="hljs-tag">&lt;<span class="hljs-name">Toggle</span> <span class="hljs-attr">initial</span>=<span class="hljs-string">{false}</span>&gt;</span>
      {toggle =&gt; {
        <span class="hljs-tag">&lt;<span class="hljs-name">MyComponent</span> <span class="hljs-attr">counter</span>=<span class="hljs-string">{counter.count}</span> <span class="hljs-attr">toggle</span>=<span class="hljs-string">{toggle.on}</span> /&gt;</span>;
      }}
    <span class="hljs-tag">&lt;/<span class="hljs-name">Toggle</span>&gt;</span>;
  }}
<span class="hljs-tag">&lt;/<span class="hljs-name">Counter</span>&gt;</span></code></pre><p>&#x56E0;&#x6B64; react-powerplugin &#x63D0;&#x4F9B;&#x4E86; compose &#x51FD;&#x6570;&#xFF0C;&#x5E2E;&#x52A9;&#x805A;&#x5408; renderProps &#x7EC4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { compose } from &apos;react-powerplug&apos;

const ToggleCounter = compose(
  &lt;Counter initial={5} /&gt;,
  &lt;Toggle initial={false} /&gt;
)

&lt;ToggleCounter&gt;
  {(toggle, counter) =&gt; (
    &lt;ProductCard {...} /&gt;
  )}
&lt;/ToggleCounter&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nimrod"><code class="jsx"><span class="hljs-keyword">import</span> { compose } <span class="hljs-keyword">from</span> &apos;react-powerplug&apos;

<span class="hljs-keyword">const</span> <span class="hljs-type">ToggleCounter</span> = compose(
  &lt;<span class="hljs-type">Counter</span> initial={<span class="hljs-number">5</span>} /&gt;,
  &lt;<span class="hljs-type">Toggle</span> initial={<span class="hljs-literal">false</span>} /&gt;
)

&lt;<span class="hljs-type">ToggleCounter</span>&gt;
  {(toggle, counter) =&gt; (
    &lt;<span class="hljs-type">ProductCard</span> <span class="hljs-meta">{...}</span> /&gt;
  )}
&lt;/<span class="hljs-type">ToggleCounter</span>&gt;</code></pre><h3 id="articleHeader4">&#x4F7F;&#x7528; Epitath &#x89E3;&#x51B3;&#x5D4C;&#x5957;&#x95EE;&#x9898;</h3><p>Epitath &#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x65B0;&#x65B9;&#x5F0F;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x5D4C;&#x5957;&#x7684;&#x95EE;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const App = epitath(function*() {
  const { count } = yield &lt;Counter /&gt;
  const { on } = yield &lt;Toggle /&gt;

  return (
    &lt;MyComponent counter={count} toggle={on} /&gt;
  )
})

&lt;App /&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">const</span> App = epitath(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> { count } = <span class="hljs-keyword">yield</span> &lt;Counter /&gt;
  <span class="hljs-keyword">const</span> { on } = <span class="hljs-keyword">yield</span> &lt;Toggle /&gt;

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyComponent</span> <span class="hljs-attr">counter</span>=<span class="hljs-string">{count}</span> <span class="hljs-attr">toggle</span>=<span class="hljs-string">{on}</span> /&gt;</span>
  )
})

<span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span></span></code></pre><p>renderProps &#x65B9;&#x6848;&#x4E0E; Epitath &#x65B9;&#x6848;&#xFF0C;&#x53EF;&#x4EE5;&#x7C7B;&#x6BD4;&#x4E3A; &#x56DE;&#x8C03; &#x65B9;&#x6848;&#x4E0E; <code>async/await</code> &#x65B9;&#x6848;&#x3002;Epitath &#x548C; <code>compose</code> &#x90FD;&#x89E3;&#x51B3;&#x4E86; renderProps &#x53EF;&#x80FD;&#x5E26;&#x6765;&#x7684;&#x5D4C;&#x5957;&#x95EE;&#x9898;&#xFF0C;&#x800C; <code>compose</code> &#x662F;&#x901A;&#x8FC7;&#x5C06;&#x591A;&#x4E2A; renderProps merge &#x4E3A;&#x4E00;&#x4E2A;&#xFF0C;&#x800C; Epitath &#x7684;&#x65B9;&#x6848;&#x66F4;&#x63A5;&#x8FD1; <code>async/await</code> &#x7684;&#x601D;&#x8DEF;&#xFF0C;&#x5229;&#x7528; <code>generator</code> &#x5B9E;&#x73B0;&#x4E86;&#x4F2A;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x3002;</p><h2 id="articleHeader5">3 &#x7CBE;&#x8BFB;</h2><p>Epitath &#x6E90;&#x7801;&#x4E00;&#x5171; 40 &#x884C;&#xFF0C;&#x6211;&#x4EEC;&#x5206;&#x6790;&#x4E00;&#x4E0B;&#x5176;&#x7CBE;&#x5999;&#x7684;&#x65B9;&#x5F0F;&#x3002;</p><p>&#x4E0B;&#x9762;&#x662F; Epitath &#x5B8C;&#x6574;&#x7684;&#x6E90;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &quot;react&quot;;
import immutagen from &quot;immutagen&quot;;

const compose = ({ next, value }) =&gt;
  next
    ? React.cloneElement(value, null, values =&gt; compose(next(values)))
    : value;

export default Component =&gt; {
  const original = Component.prototype.render;
  const displayName = `EpitathContainer(${Component.displayName ||
    &quot;anonymous&quot;})`;

  if (!original) {
    const generator = immutagen(Component);

    return Object.assign(
      function Epitath(props) {
        return compose(generator(props));
      },
      { displayName }
    );
  }

  Component.prototype.render = function render() {
    // Since we are calling a new function to be called from here instead of
    // from a component class, we need to ensure that the render method is
    // invoked against `this`. We only need to do this binding and creation of
    // this function once, so we cache it by adding it as a property to this
    // new render method which avoids keeping the generator outside of this
    // method&apos;s scope.
    if (!render.generator) {
      render.generator = immutagen(original.bind(this));
    }

    return compose(render.generator(this.props));
  };

  return class EpitathContainer extends React.Component {
    static displayName = displayName;
    render() {
      return &lt;Component {...this.props} /&gt;;
    }
  };
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;react&quot;</span>;
<span class="hljs-keyword">import</span> immutagen <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;immutagen&quot;</span>;

<span class="hljs-keyword">const</span> compose = <span class="hljs-function">(<span class="hljs-params">{ next, value }</span>) =&gt;</span>
  next
    ? React.cloneElement(value, <span class="hljs-literal">null</span>, values =&gt; compose(next(values)))
    : value;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Component =&gt; {
  <span class="hljs-keyword">const</span> original = Component.prototype.render;
  <span class="hljs-keyword">const</span> displayName = <span class="hljs-string">`EpitathContainer(<span class="hljs-subst">${Component.displayName ||
    <span class="hljs-string">&quot;anonymous&quot;</span>}</span>)`</span>;

  <span class="hljs-keyword">if</span> (!original) {
    <span class="hljs-keyword">const</span> generator = immutagen(Component);

    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign(
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Epitath</span>(<span class="hljs-params">props</span>) </span>{
        <span class="hljs-keyword">return</span> compose(generator(props));
      },
      { displayName }
    );
  }

  Component.prototype.render = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// Since we are calling a new function to be called from here instead of</span>
    <span class="hljs-comment">// from a component class, we need to ensure that the render method is</span>
    <span class="hljs-comment">// invoked against `this`. We only need to do this binding and creation of</span>
    <span class="hljs-comment">// this function once, so we cache it by adding it as a property to this</span>
    <span class="hljs-comment">// new render method which avoids keeping the generator outside of this</span>
    <span class="hljs-comment">// method&apos;s scope.</span>
    <span class="hljs-keyword">if</span> (!render.generator) {
      render.generator = immutagen(original.bind(<span class="hljs-keyword">this</span>));
    }

    <span class="hljs-keyword">return</span> compose(render.generator(<span class="hljs-keyword">this</span>.props));
  };

  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EpitathContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">static</span> displayName = displayName;
    render() {
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>;
    }
  };
};</span></code></pre><h3 id="articleHeader6">immutagen</h3><p>immutagen &#x662F;&#x4E00;&#x4E2A; immutable <code>generator</code> &#x8F85;&#x52A9;&#x5E93;&#xFF0C;&#x6BCF;&#x6B21;&#x8C03;&#x7528; <code>.next</code> &#x90FD;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x81EA;&#x5DF1;&#x53D1;&#x751F; mutable &#x6539;&#x53D8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import immutagen from &quot;immutagen&quot;;

const gen = immutagen(function*() {
  yield 1;
  yield 2;
  return 3;
})(); // { value: 1, next: [function] }

gen.next(); // { value: 2, next: [function] }
gen.next(); // { value: 2, next: [function] }

gen.next().next(); // { value: 3, next: undefined }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> immutagen <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;immutagen&quot;</span>;

<span class="hljs-keyword">const</span> gen = immutagen(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
})(); <span class="hljs-comment">// { value: 1, next: [function] }</span>

gen.next(); <span class="hljs-comment">// { value: 2, next: [function] }</span>
gen.next(); <span class="hljs-comment">// { value: 2, next: [function] }</span>

gen.next().next(); <span class="hljs-comment">// { value: 3, next: undefined }</span></code></pre><h3 id="articleHeader7">compose</h3><p>&#x770B;&#x5230; compose &#x51FD;&#x6570;&#x5C31;&#x57FA;&#x672C;&#x660E;&#x767D;&#x5176;&#x5B9E;&#x73B0;&#x601D;&#x8DEF;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compose = ({ next, value }) =&gt;
  next
    ? React.cloneElement(value, null, values =&gt; compose(next(values)))
    : value;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> compose = <span class="hljs-function">(<span class="hljs-params">{ next, value }</span>) =&gt;</span>
  next
    ? React.cloneElement(value, <span class="hljs-literal">null</span>, values =&gt; compose(next(values)))
    : value;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const App = epitath(function*() {
  const { count } = yield &lt;Counter /&gt;;
  const { on } = yield &lt;Toggle /&gt;;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> App = epitath(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> { count } = <span class="hljs-keyword">yield</span> &lt;Counter /&gt;;
  <span class="hljs-keyword">const</span> { on } = <span class="hljs-keyword">yield</span> &lt;Toggle /&gt;;
});</code></pre><p>&#x901A;&#x8FC7; immutagen&#xFF0C;&#x4F9D;&#x6B21;&#x8C03;&#x7528; <code>next</code>&#xFF0C;&#x751F;&#x6210;&#x65B0;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E14;&#x4E0B;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x662F;&#x4E0A;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x56E0;&#x6B64;&#x4F1A;&#x4EA7;&#x751F;&#x4E0B;&#x9762;&#x7684;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yield &lt;A&gt;
yield &lt;B&gt;
yield &lt;C&gt;
// &#x7B49;&#x4EF7;&#x4E8E;
&lt;A&gt;
  &lt;B&gt;
    &lt;C /&gt;
  &lt;/B&gt;
&lt;/A&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>yield <span class="hljs-params">&lt;A&gt;</span>
yield <span class="hljs-params">&lt;B&gt;</span>
yield <span class="hljs-params">&lt;C&gt;</span>
<span class="hljs-comment">// &#x7B49;&#x4EF7;&#x4E8E;</span>
<span class="hljs-params">&lt;A&gt;</span>
  <span class="hljs-params">&lt;B&gt;</span>
    <span class="hljs-params">&lt;C /&gt;</span>
  <span class="hljs-params">&lt;/B&gt;</span>
<span class="hljs-params">&lt;/A&gt;</span></code></pre><p>&#x5230;&#x6B64;&#x5176;&#x6E90;&#x7801;&#x7CBE;&#x9AD3;&#x5DF2;&#x7ECF;&#x89E3;&#x6790;&#x5B8C;&#x4E86;&#x3002;</p><h3 id="articleHeader8">&#x5B58;&#x5728;&#x7684;&#x95EE;&#x9898;</h3><p><a href="https://github.com/crimx" rel="nofollow noreferrer" target="_blank">crimx</a> &#x5728;&#x8BA8;&#x8BBA;&#x4E2D;&#x63D0;&#x5230;&#xFF0C;Epitath &#x65B9;&#x6848;&#x5B58;&#x5728;&#x7684;&#x6700;&#x5927;&#x95EE;&#x9898;&#x662F;&#xFF0C;&#x6BCF;&#x6B21; <code>render</code> &#x90FD;&#x4F1A;&#x751F;&#x6210;&#x5168;&#x65B0;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FD9;&#x5BF9;&#x5185;&#x5B58;&#x662F;&#x4E00;&#x79CD;&#x6311;&#x6218;&#x3002;</p><p>&#x7A0D;&#x5FAE;&#x89E3;&#x91CA;&#x4E00;&#x4E0B;&#xFF0C;&#x65E0;&#x8BBA;&#x662F;&#x901A;&#x8FC7; &#x539F;&#x751F;&#x7684; renderProps &#x8FD8;&#x662F; <code>compose</code>&#xFF0C;&#x540C;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x53EA;&#x751F;&#x6210;&#x4E00;&#x6B21;&#xFF0C;React &#x5185;&#x90E8;&#x4F1A;&#x6301;&#x4E45;&#x5316;&#x8FD9;&#x4E9B;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x3002;&#x800C; <a href="https://github.com/pelotom/immutagen" rel="nofollow noreferrer" target="_blank">immutagen</a> &#x5728;&#x8FD0;&#x884C;&#x65F6;&#x6BCF;&#x6B21;&#x6267;&#x884C;&#x6E32;&#x67D3;&#xFF0C;&#x90FD;&#x4F1A;&#x751F;&#x6210;&#x4E0D;&#x53EF;&#x53D8;&#x6570;&#x636E;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5168;&#x65B0;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4;&#x5E9F;&#x5F03;&#x7684;&#x5F15;&#x7528;&#x5B58;&#x5728;&#x5927;&#x91CF; GC &#x538B;&#x529B;&#xFF0C;&#x540C;&#x65F6; React &#x6BCF;&#x6B21;&#x62FF;&#x5230;&#x7684;&#x7EC4;&#x4EF6;&#x90FD;&#x662F;&#x5168;&#x65B0;&#x7684;&#xFF0C;&#x867D;&#x7136;&#x529F;&#x80FD;&#x76F8;&#x540C;&#x3002;</p><h2 id="articleHeader9">4 &#x603B;&#x7ED3;</h2><p><a href="https://github.com/Astrocoders/epitath" rel="nofollow noreferrer" target="_blank">epitath</a> &#x5DE7;&#x5999;&#x7684;&#x5229;&#x7528;&#x4E86; <a href="https://github.com/pelotom/immutagen" rel="nofollow noreferrer" target="_blank">immutagen</a> &#x7684;&#x4E0D;&#x53EF;&#x53D8; <code>generator</code> &#x7684;&#x7279;&#x6027;&#x6765;&#x751F;&#x6210;&#x7EC4;&#x4EF6;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x9012;&#x5F52; <code>.next</code> &#x65F6;&#xFF0C;&#x5C06;&#x987A;&#x5E8F;&#x4EE3;&#x7801;&#x89E3;&#x6790;&#x4E3A;&#x5D4C;&#x5957;&#x4EE3;&#x7801;&#xFF0C;&#x6709;&#x6548;&#x89E3;&#x51B3;&#x4E86; renderProps &#x5D4C;&#x5957;&#x95EE;&#x9898;&#x3002;</p><p>&#x559C;&#x6B22; <a href="https://github.com/Astrocoders/epitath" rel="nofollow noreferrer" target="_blank">epitath</a> &#x7684;&#x540C;&#x5B66;&#x8D76;&#x5FEB;&#x5165;&#x624B;&#x5427;&#xFF01;&#x540C;&#x65F6;&#x6211;&#x4EEC;&#x4E5F;&#x770B;&#x5230; <code>generator</code> &#x624B;&#x52A8;&#x7684;&#x6B65;&#x9AA4;&#x63A7;&#x5236;&#x5E26;&#x6765;&#x7684;&#x5A01;&#x529B;&#xFF0C;&#x8FD9;&#x662F; <code>async/await</code> &#x5B8C;&#x5168;&#x65E0;&#x6CD5;&#x505A;&#x5230;&#x7684;&#x3002;</p><p>&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x5229;&#x7528; <a href="https://github.com/pelotom/immutagen" rel="nofollow noreferrer" target="_blank">immutagen</a> &#x89E3;&#x51B3; React Context &#x4E0E;&#x7EC4;&#x4EF6;&#x76F8;&#x4E92;&#x5D4C;&#x5957;&#x95EE;&#x9898;&#x5462;&#xFF1F;&#x8FD8;&#x6709;&#x54EA;&#x4E9B;&#x5176;&#x4ED6;&#x524D;&#x7AEF;&#x529F;&#x80FD;&#x53EF;&#x4EE5;&#x5229;&#x7528; immutagen &#x7B80;&#x5316;&#x7684;&#x5462;&#xFF1F;&#x6B22;&#x8FCE;&#x52A0;&#x5165;&#x8BA8;&#x8BBA;&#x3002;</p><h2 id="articleHeader10">5 &#x66F4;&#x591A;&#x8BA8;&#x8BBA;</h2><blockquote>&#x8BA8;&#x8BBA;&#x5730;&#x5740;&#x662F;&#xFF1A;<a href="https://github.com/dt-fe/weekly/issues/106" rel="nofollow noreferrer" target="_blank">&#x7CBE;&#x8BFB;&#x300A;Epitath - renderProps &#x65B0;&#x7528;&#x6CD5;&#x300B; &#xB7; Issue #106 &#xB7; dt-fe/weekly</a></blockquote><p><strong>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x53C2;&#x4E0E;&#x8BA8;&#x8BBA;&#xFF0C;&#x8BF7;<a href="https://github.com/dt-fe/weekly" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x8FD9;&#x91CC;</a>&#xFF0C;&#x6BCF;&#x5468;&#x90FD;&#x6709;&#x65B0;&#x7684;&#x4E3B;&#x9898;&#xFF0C;&#x5468;&#x672B;&#x6216;&#x5468;&#x4E00;&#x53D1;&#x5E03;&#x3002;&#x524D;&#x7AEF;&#x7CBE;&#x8BFB; - &#x5E2E;&#x4F60;&#x7B5B;&#x9009;&#x9760;&#x8C31;&#x7684;&#x5185;&#x5BB9;&#x3002;</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精读《Epitath 源码 - renderProps 新用法》

## 原文链接
[https://segmentfault.com/a/1190000016682454](https://segmentfault.com/a/1190000016682454)

