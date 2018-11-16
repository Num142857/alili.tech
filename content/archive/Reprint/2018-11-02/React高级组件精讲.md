---
title: React高级组件精讲
hidden: true
categories: [reprint]
slug: bf7b1ea
date: 2018-11-02 02:30:12
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x57FA;&#x672C;&#x6982;&#x5FF5;</h2><p>&#x9AD8;&#x7EA7;&#x51FD;&#x6570;&#x662F;&#x4EE5;&#x51FD;&#x6570;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x8FD4;&#x56DE;&#x4E5F;&#x662F;&#x51FD;&#x6570;&#x7684;&#x7684;&#x51FD;&#x6570;&#x3002;&#x7C7B;&#x4F3C;&#x7684;&#xFF0C;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF08;&#x7B80;&#x79F0;HOC&#xFF09;&#x63A5;&#x6536; React &#x7EC4;&#x4EF6;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;React&#x7EC4;&#x4EF6;&#x3002;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x672C;&#x8D28;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x7684;&#x51FD;&#x6570;&#x5F62;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const EnhanceComponent = higherOrderComponent(WrappedComponent)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>const EnhanceComponent = higherOrderComponent(<span class="hljs-name">WrappedComponent</span>)
</code></pre><p>&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#x89E3;&#x91CA;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x662F;&#x5982;&#x4F55;&#x590D;&#x7528;&#x7684;&#x3002;&#x73B0;&#x5728;&#x6709;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;MyComponent&#xFF0C;&#x9700;&#x8981;&#x4ECE;LocalStorage&#x4E2D;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;&#x6E32;&#x67D3;&#x5230;&#x754C;&#x9762;&#x3002;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5B9E;&#x73B0;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;

class MyComponent extends Component {
  componentWillMount() {
    let data = localStorage.getItem(&apos;data&apos;);
    this.setState({data});
  }
  render() {
    return(
      &lt;div&gt;{this.state.data}&lt;/div&gt;
    )
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">&apos;reac</span>t&apos;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  componentWillMount() {
    let data = localStorage.getItem(<span class="hljs-symbol">&apos;dat</span>a&apos;);
    <span class="hljs-keyword">this</span>.setState({data});
  }
  render() {
    <span class="hljs-keyword">return</span>(
      &lt;div&gt;{<span class="hljs-keyword">this</span>.state.data}&lt;/div&gt;
    )
  }
}
</code></pre><p>&#x4EE3;&#x7801;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4F46;&#x5F53;&#x5176;&#x5B83;&#x7EC4;&#x4EF6;&#x4E5F;&#x9700;&#x8981;&#x4ECE;LocalStorage &#x4E2D;&#x83B7;&#x53D6;&#x540C;&#x6837;&#x7684;&#x6570;&#x636E;&#x5C55;&#x793A;&#x51FA;&#x6765;&#x65F6;&#xFF0C;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x90FD;&#x9700;&#x8981;&#x91CD;&#x5199;&#x4E00;&#x6B21; componentWillMount &#x4E2D;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x663E;&#x7136;&#x662F;&#x5F88;&#x5197;&#x4F59;&#x7684;&#x3002;&#x4E0B;&#x9762;&#x8BA9;&#x6211;&#x4EBA;&#x6765;&#x770B;&#x770B;&#x4F7F;&#x7528;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x6539;&#x5199;&#x8FD9;&#x90E8;&#x5206;&#x4EE3;&#x7801;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;

function withPersistentData(WrappedComponent) {
  return class extends Component {
    componentWillMount() {
      let data = localStorage.getItem(&apos;data&apos;);
      this.setState({data});
    }
    render() {
      // &#x901A;&#x8FC7;{ ...this.props} &#x628A;&#x4F20;&#x9012;&#x7ED9;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x5C5E;&#x6027;&#x7EE7;&#x7EED;&#x4F20;&#x9012;&#x7ED9;&#x88AB;&#x5305;&#x88C5;&#x7684;&#x7EC4;&#x4EF6;
      return &lt;WrappedComponent data={this.state.data} {...this.props}/&gt;
    }
  }
}

class MyComponent extends Component{
  render() {
    return &lt;div&gt;{this.props.data}&lt;/div&gt;
  }
}

const MyComponentWithPersistentData = withPersistentData(MyComponent);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">&apos;reac</span>t&apos;

function withPersistentData(<span class="hljs-type">WrappedComponent</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentWillMount() {
      let data = localStorage.getItem(<span class="hljs-symbol">&apos;dat</span>a&apos;);
      <span class="hljs-keyword">this</span>.setState({data});
    }
    render() {
      <span class="hljs-comment">// &#x901A;&#x8FC7;{ ...this.props} &#x628A;&#x4F20;&#x9012;&#x7ED9;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x5C5E;&#x6027;&#x7EE7;&#x7EED;&#x4F20;&#x9012;&#x7ED9;&#x88AB;&#x5305;&#x88C5;&#x7684;&#x7EC4;&#x4EF6;</span>
      <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">WrappedComponent</span> data={<span class="hljs-keyword">this</span>.state.data} {...<span class="hljs-keyword">this</span>.props}/&gt;
    }
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.props.data}&lt;/div&gt;
  }
}

const <span class="hljs-type">MyComponentWithPersistentData</span> = withPersistentData(<span class="hljs-type">MyComponent</span>);
</code></pre><p>withPersistentData &#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B83;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x5728;&#x65B0;&#x7EC4;&#x4EF6;&#x4E2D; componentWillMount &#x4E2D;&#x7EDF;&#x4E00;&#x5904;&#x7406;&#x4ECE; LocalStorage &#x4E2D;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x903B;&#x8F91;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x83B7;&#x53D6;&#x5230;&#x7684;&#x6570;&#x636E;&#x901A;&#x8FC7; props &#x4F20;&#x9012;&#x7ED9;&#x88AB;&#x5305;&#x88C5;&#x7684;&#x7EC4;&#x4EF6; WrappedComponent&#xFF0C;&#x8FD9;&#x6837;&#x5728;WrappedComponent&#x4E2D;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528; this.props.data &#x83B7;&#x53D6;&#x9700;&#x8981;&#x5C55;&#x793A;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5F53;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x7EC4;&#x4EF6;&#x4E5F;&#x9700;&#x8981;&#x8FD9;&#x6BB5;&#x903B;&#x8F91;&#x65F6;&#xFF0C;&#x7EE7;&#x7EED;&#x4F7F;&#x7528; withPersistentData &#x8FD9;&#x4E2A;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5305;&#x88C5;&#x8FD9;&#x4E9B;&#x7EC4;&#x4EF6;&#x3002;</p><h2 id="articleHeader1">&#x4E8C;&#x3001;&#x4F7F;&#x7528;&#x573A;&#x666F;</h2><p>&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x4E3B;&#x8981;&#x6709;&#x4EE5;&#x4E0B;4&#x4E2D;&#xFF1A;<br>1&#xFF09;&#x64CD;&#x7EB5; props<br>2) &#x901A;&#x8FC7; ref &#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;<br>3) &#x7EC4;&#x4EF6;&#x72B6;&#x6001;&#x63D0;&#x5347;<br>4&#xFF09;&#x7528;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;</p><h4>1.&#x64CD;&#x7EB5; props</h4><p>&#x5728;&#x88AB;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#x63A5;&#x6536; props &#x524D;&#xFF0C; &#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x5148;&#x62E6;&#x622A;&#x5230; props, &#x5BF9; props &#x6267;&#x884C;&#x589E;&#x52A0;&#x3001;&#x5220;&#x9664;&#x6216;&#x4FEE;&#x6539;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x5904;&#x7406;&#x540E;&#x7684; props &#x518D;&#x4F20;&#x9012;&#x88AB;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E00;&#x4E2D;&#x7684;&#x4F8B;&#x5B50;&#x5C31;&#x662F;&#x5C5E;&#x4E8E;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x3002;</p><h4>2.&#x901A;&#x8FC7; ref &#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;</h4><p>&#x9AD8;&#x9636;&#x7EC4;&#x4EF6; ref &#x83B7;&#x53D6;&#x88AB;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x7136;&#x540E;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5C31;&#x5177;&#x5907;&#x4E86;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;&#x88AB;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x65B9;&#x6CD5;&#x7684;&#x80FD;&#x529B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;

function withRef(wrappedComponent) {
  return class extends Component{
    constructor(props) {
      super(props);
      this.someMethod = this.someMethod.bind(this);
    }

    someMethod() {
      this.wrappedInstance.comeMethodInWrappedComponent();
    }

    render() {
      // &#x4E3A;&#x88AB;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0; ref &#x5C5E;&#x6027;&#xFF0C;&#x4ECE;&#x800C;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x5E76;&#x8D4B;&#x503C;&#x7ED9; this.wrappedInstance
      return &lt;wrappedComponent ref={(instance) =&gt; { this.wrappedInstance = instance }} {...this.props}/&gt;
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">&apos;reac</span>t&apos;

function withRef(wrappedComponent) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
    constructor(props) {
      <span class="hljs-keyword">super</span>(props);
      <span class="hljs-keyword">this</span>.someMethod = <span class="hljs-keyword">this</span>.someMethod.bind(<span class="hljs-keyword">this</span>);
    }

    someMethod() {
      <span class="hljs-keyword">this</span>.wrappedInstance.comeMethodInWrappedComponent();
    }

    render() {
      <span class="hljs-comment">// &#x4E3A;&#x88AB;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0; ref &#x5C5E;&#x6027;&#xFF0C;&#x4ECE;&#x800C;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x5E76;&#x8D4B;&#x503C;&#x7ED9; this.wrappedInstance</span>
      <span class="hljs-keyword">return</span> &lt;wrappedComponent ref={(instance) =&gt; { <span class="hljs-keyword">this</span>.wrappedInstance = instance }} {...<span class="hljs-keyword">this</span>.props}/&gt;
    }
  }
}</code></pre><p>&#x5F53; wrappedComponent &#x88AB;&#x6E32;&#x67D3;&#x65F6;&#xFF0C;&#x6267;&#x884C; ref &#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7; this.wrappedInstance &#x4FDD;&#x5B58; wrappedComponent &#x5B9E;&#x4F8B;&#x5F15;&#x7528;&#xFF0C;&#x5728; someMethod &#x4E2D;&#x901A;&#x8FC7; this.wrappedInstance &#x8C03;&#x7528; wrappedComponent &#x4E2D;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x8FD9;&#x79CD;&#x7528;&#x6CD5;&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#x5F88;&#x5C11;&#x4F1A;&#x88AB;&#x7528;&#x5230;&#xFF0C;&#x4F46;&#x5F53;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5C01;&#x88C5;&#x7684;&#x590D;&#x7528;&#x903B;&#x8F91;&#x9700;&#x8981;&#x88AB;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#x6216;&#x5C5E;&#x6027;&#x7684;&#x534F;&#x540C;&#x652F;&#x6301;&#x65F6;&#xFF0C;&#x8FD9;&#x79CD;&#x7528;&#x6CD5;&#x5C31;&#x6709;&#x4E86;&#x7528;&#x6B66;&#x4E4B;&#x5730;&#x3002;</p><h4>3.&#x7EC4;&#x4EF6;&#x72B6;&#x6001;&#x63D0;&#x5347;</h4><p>&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5C06;&#x88AB;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#x53CA;&#x76F8;&#x5E94;&#x7684;&#x72B6;&#x6001;&#x5904;&#x7406;&#x65B9;&#x6CD5;&#x63D0;&#x5347;&#x5230;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x81EA;&#x8EAB;&#x5185;&#x90E8;&#x5B9E;&#x73B0;&#x88AB;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#x7684;&#x65E0;&#x72B6;&#x6001;&#x5316;&#x3002;&#x4E00;&#x4E2A;&#x5178;&#x578B;&#x7684;&#x573A;&#x666F;&#x662F;&#xFF0C;&#x5229;&#x7528;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5C06;&#x539F;&#x672C;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x7EF4;&#x62A4;&#x7684;&#x72B6;&#x6001;&#x7EDF;&#x4E00;&#x63D0;&#x5347;&#x5230;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;

function withRef(wrappedComponent) {
  return class extends Component{
    constructor(props) {
      super(props);
      this.state = {
        value: &apos;&apos;
      }
      this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(event) {
      this.this.setState({
        value: event.EventTarget.value
      })
    }

    render() {
      // newProps&#x4FDD;&#x5B58;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;
      const newProps = {
        controlledProps: {
          value: this.state.value,
          onChange: this.handleValueChange
        }
      }
      return &lt;wrappedComponent {...this.props} {...newProps}/&gt;
    }
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> React, { Component } from <span class="hljs-string">&apos;react&apos;</span>

function withRef(wrappedComponent) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(props) {
      <span class="hljs-keyword">super</span>(props);
      <span class="hljs-keyword">this</span>.state = {
        value: <span class="hljs-string">&apos;&apos;</span>
      }
      <span class="hljs-keyword">this</span>.handleValueChange = <span class="hljs-keyword">this</span>.handleValueChange.bind(<span class="hljs-keyword">this</span>);
    }

    handleValueChange(event) {
      <span class="hljs-keyword">this</span>.<span class="hljs-keyword">this</span>.setState({
        value: event.EventTarget.value
      })
    }

    render() {
      <span class="hljs-comment">// newProps&#x4FDD;&#x5B58;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;</span>
      const newProps = {
        controlledProps: {
          value: <span class="hljs-keyword">this</span>.state.value,
          onChange: <span class="hljs-keyword">this</span>.handleValueChange
        }
      }
      <span class="hljs-keyword">return</span> &lt;wrappedComponent {...<span class="hljs-keyword">this</span>.props} {...newProps}/&gt;
    }
  }
}
</code></pre><p>&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x628A;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6; value &#x5C5E;&#x6027;&#x7528;&#x5230;&#x7684;&#x72B6;&#x6001;&#x548C;&#x5904;&#x7406; value &#x53D8;&#x5316;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x90FD;&#x63D0;&#x5347;&#x5230;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x518D;&#x4F7F;&#x7528;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x4F7F;&#x7528;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;

function withControlledState(wrappedComponent) {
  return class extends Component{
    constructor(props) {
      super(props);
      this.state = {
        value: &apos;&apos;
      }
      this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(event) {
      this.this.setState({
        value: event.EventTarget.value
      })
    }

    render() {
      // newProps&#x4FDD;&#x5B58;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;
      const newProps = {
        controlledProps: {
          value: this.state.value,
          onChange: this.handleValueChange
        }
      }
      return &lt;wrappedComponent {...this.props} {...newProps}/&gt;
    }
  }
}


class  SimpleControlledComponent extends React.Component {
  render() {
    // &#x6B64;&#x65F6;&#x7684; SimpleControlledComponent &#x4E3A;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF0C;&#x72B6;&#x6001;&#x7531;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x7EF4;&#x62A4;
    return &lt;input name=&quot;simple&quot; {...this.props.controlledProps}/&gt;
  }
}

const ComponentWithControlledState = withControlledState(SimpleControlledComponent);

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">&apos;reac</span>t&apos;

function withControlledState(wrappedComponent) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
    constructor(props) {
      <span class="hljs-keyword">super</span>(props);
      <span class="hljs-keyword">this</span>.state = {
        value: &apos;&apos;
      }
      <span class="hljs-keyword">this</span>.handleValueChange = <span class="hljs-keyword">this</span>.handleValueChange.bind(<span class="hljs-keyword">this</span>);
    }

    handleValueChange(event) {
      <span class="hljs-keyword">this</span>.<span class="hljs-keyword">this</span>.setState({
        value: event.<span class="hljs-type">EventTarget</span>.value
      })
    }

    render() {
      <span class="hljs-comment">// newProps&#x4FDD;&#x5B58;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;</span>
      const newProps = {
        controlledProps: {
          value: <span class="hljs-keyword">this</span>.state.value,
          onChange: <span class="hljs-keyword">this</span>.handleValueChange
        }
      }
      <span class="hljs-keyword">return</span> &lt;wrappedComponent {...<span class="hljs-keyword">this</span>.props} {...newProps}/&gt;
    }
  }
}


<span class="hljs-class"><span class="hljs-keyword">class</span>  <span class="hljs-title">SimpleControlledComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-comment">// &#x6B64;&#x65F6;&#x7684; SimpleControlledComponent &#x4E3A;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#xFF0C;&#x72B6;&#x6001;&#x7531;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x7EF4;&#x62A4;</span>
    <span class="hljs-keyword">return</span> &lt;input name=<span class="hljs-string">&quot;simple&quot;</span> {...<span class="hljs-keyword">this</span>.props.controlledProps}/&gt;
  }
}

const <span class="hljs-type">ComponentWithControlledState</span> = withControlledState(<span class="hljs-type">SimpleControlledComponent</span>);

</code></pre><h2 id="articleHeader2">&#x4E09;&#x3001;&#x53C2;&#x6570;&#x4F20;&#x9012;</h2><p>&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x7684;&#x53C2;&#x6570;&#x5E76;&#x975E;&#x53EA;&#x80FD;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B83;&#x8FD8;&#x53EF;&#x4EE5;&#x63A5;&#x6536;&#x5176;&#x4ED6;&#x53C2;&#x6570;&#x3002;&#x4F8B;&#x5982;&#x4E00;&#x4E2D;&#x662F;&#x4ECE; LocalStorage &#x4E2D;&#x83B7;&#x53D6; key &#x4E3A; data&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5F53;&#x9700;&#x8981;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7684; key&#x4E0D;&#x786E;&#x5B9A;&#x65F6;&#xFF0C;withPersistentData &#x8FD9;&#x4E2A;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5C31;&#x4E0D;&#x6EE1;&#x8DB3;&#x9700;&#x8981;&#x4E86;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8BA9;&#x5B83;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x989D;&#x5916;&#x53C2;&#x6570;&#x6765;&#x51B3;&#x5B9A;&#x4ECE; LocalStorage &#x4E2D;&#x83B7;&#x53D6;&#x54EA;&#x4E2A;&#x6570;&#x636E;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;

function withPersistentData(WrappedComponent, key) {
  return class extends Component {
    componentWillMount() {
      let data = localStorage.getItem(key);
      this.setState({ data });
    }
    render() {
      // &#x901A;&#x8FC7;{ ...this.props} &#x628A;&#x4F20;&#x9012;&#x7ED9;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x5C5E;&#x6027;&#x7EE7;&#x7EED;&#x4F20;&#x9012;&#x7ED9;&#x88AB;&#x5305;&#x88C5;&#x7684;&#x7EC4;&#x4EF6;
      return &lt;WrappedComponent data={this.state.data} {...this.props} /&gt;
    }
  }
}

class MyComponent extends Component {
  render() {
    return &lt;div&gt;{this.props.data}&lt;/div&gt;
  }
}
// &#x83B7;&#x53D6; key=&apos;data&apos; &#x7684;&#x6570;&#x636E;
const MyComponent1WithPersistentData = withPersistentData(MyComponent, &apos;data&apos;);

// &#x83B7;&#x53D6; key=&apos;name&apos; &#x7684;&#x6570;&#x636E;
const MyComponent2WithPersistentData = withPersistentData(MyComponent, &apos;name&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">&apos;reac</span>t&apos;

function withPersistentData(<span class="hljs-type">WrappedComponent</span>, key) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentWillMount() {
      let data = localStorage.getItem(key);
      <span class="hljs-keyword">this</span>.setState({ data });
    }
    render() {
      <span class="hljs-comment">// &#x901A;&#x8FC7;{ ...this.props} &#x628A;&#x4F20;&#x9012;&#x7ED9;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x5C5E;&#x6027;&#x7EE7;&#x7EED;&#x4F20;&#x9012;&#x7ED9;&#x88AB;&#x5305;&#x88C5;&#x7684;&#x7EC4;&#x4EF6;</span>
      <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">WrappedComponent</span> data={<span class="hljs-keyword">this</span>.state.data} {...<span class="hljs-keyword">this</span>.props} /&gt;
    }
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.props.data}&lt;/div&gt;
  }
}
<span class="hljs-comment">// &#x83B7;&#x53D6; key=&apos;data&apos; &#x7684;&#x6570;&#x636E;</span>
const <span class="hljs-type">MyComponent1WithPersistentData</span> = withPersistentData(<span class="hljs-type">MyComponent</span>, <span class="hljs-symbol">&apos;dat</span>a&apos;);

<span class="hljs-comment">// &#x83B7;&#x53D6; key=&apos;name&apos; &#x7684;&#x6570;&#x636E;</span>
const <span class="hljs-type">MyComponent2WithPersistentData</span> = withPersistentData(<span class="hljs-type">MyComponent</span>, <span class="hljs-symbol">&apos;nam</span>e&apos;);
</code></pre><p>&#x65B0;&#x7248;&#x672C;&#x7684; withPersistentData &#x6EE1;&#x8DB3;&#x83B7;&#x53D6;&#x4E0D;&#x540C; key &#x503C;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5F88;&#x5C11;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4F20;&#x9012;&#x53C2;&#x6570;&#xFF0C;&#x800C;&#x662F;&#x91C7;&#x7528;&#x66F4;&#x52A0;&#x7075;&#x6D3B;&#x3001;&#x66F4;&#x5177;&#x80FD;&#x7528;&#x6027;&#x7684;&#x51FD;&#x6570;&#x5F62;&#x5F0F;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HOC(...params)(WrappedComponent)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">HOC</span><span class="hljs-params">(...params)</span><span class="hljs-params">(WrappedComponent)</span></span>
</code></pre><p>HOC(...params) &#x7684;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF0C;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x7684;&#x53C2;&#x6570;&#x662F;&#x5148;&#x4F20;&#x9012; HOC &#x51FD;&#x6570;&#x7684;&#x3002;&#x7528;&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;&#x6539;&#x5199; withPersistentData &#x5982;&#x4E0B;(&#x6CE8;&#x610F;&#xFF1A;&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;&#x7684;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5B9A;&#x4E49;&#x66F4;&#x4E3A;&#x7B80;&#x6D01;)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;

const withPersistentData = (key) =&gt; (WrappedComponent) =&gt; {
  return class extends Component {
    componentWillMount() {
      let data = localStorage.getItem(key);
      this.setState({ data });
    }
    render() {
      // &#x901A;&#x8FC7;{ ...this.props} &#x628A;&#x4F20;&#x9012;&#x7ED9;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x5C5E;&#x6027;&#x7EE7;&#x7EED;&#x4F20;&#x9012;&#x7ED9;&#x88AB;&#x5305;&#x88C5;&#x7684;&#x7EC4;&#x4EF6;
      return &lt;WrappedComponent data={this.state.data} {...this.props} /&gt;
    }
  }
}

class MyComponent extends Component {
  render() {
    return &lt;div&gt;{this.props.data}&lt;/div&gt;
  }
}
// &#x83B7;&#x53D6; key=&apos;data&apos; &#x7684;&#x6570;&#x636E;
const MyComponent1WithPersistentData = withPersistentData(&apos;data&apos;)(MyComponent);

// &#x83B7;&#x53D6; key=&apos;name&apos; &#x7684;&#x6570;&#x636E;
const MyComponent2WithPersistentData = withPersistentData(&apos;name&apos;)(MyComponent);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">&apos;reac</span>t&apos;

const withPersistentData = (key) =&gt; (<span class="hljs-type">WrappedComponent</span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentWillMount() {
      let data = localStorage.getItem(key);
      <span class="hljs-keyword">this</span>.setState({ data });
    }
    render() {
      <span class="hljs-comment">// &#x901A;&#x8FC7;{ ...this.props} &#x628A;&#x4F20;&#x9012;&#x7ED9;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x5C5E;&#x6027;&#x7EE7;&#x7EED;&#x4F20;&#x9012;&#x7ED9;&#x88AB;&#x5305;&#x88C5;&#x7684;&#x7EC4;&#x4EF6;</span>
      <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">WrappedComponent</span> data={<span class="hljs-keyword">this</span>.state.data} {...<span class="hljs-keyword">this</span>.props} /&gt;
    }
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.props.data}&lt;/div&gt;
  }
}
<span class="hljs-comment">// &#x83B7;&#x53D6; key=&apos;data&apos; &#x7684;&#x6570;&#x636E;</span>
const <span class="hljs-type">MyComponent1WithPersistentData</span> = withPersistentData(<span class="hljs-symbol">&apos;dat</span>a&apos;)(<span class="hljs-type">MyComponent</span>);

<span class="hljs-comment">// &#x83B7;&#x53D6; key=&apos;name&apos; &#x7684;&#x6570;&#x636E;</span>
const <span class="hljs-type">MyComponent2WithPersistentData</span> = withPersistentData(<span class="hljs-symbol">&apos;nam</span>e&apos;)(<span class="hljs-type">MyComponent</span>);
</code></pre><h2 id="articleHeader3">&#x56DB; &#x3001;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;</h2><p>&#x524D;&#x9762;&#x4ECB;&#x7ECD;&#x7684;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x90FD;&#x662F;&#x7531;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5904;&#x7406;&#x901A;&#x7528;&#x903B;&#x8F91;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x76F8;&#x5173;&#x5C5E;&#x6027;&#x4F20;&#x9012;&#x7ED9;&#x88AB;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x79F0;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4E3A;&#x5C5E;&#x6027;&#x4EE3;&#x7406;&#x3002;&#x9664;&#x4E86;&#x5C5E;&#x6027;&#x4EE3;&#x7406;&#x5916;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF1A;&#x901A;&#x8FC7; &#x7EE7;&#x627F;&#x88AB;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#x5B9E;&#x73B0;&#x903B;&#x8F91;&#x7684;&#x590D;&#x7528;&#x3002;&#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x7684;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5E38;&#x7528;&#x4E8E;&#x6E32;&#x67D3;&#x52AB;&#x6301;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x5F53;&#x7528;&#x6237;&#x5904;&#x4E8E;&#x767B;&#x5F55;&#x72B6;&#x6001;&#x65F6;&#xFF0C;&#x5141;&#x8BB8;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#xFF0C;&#x5426;&#x5219;&#x6E32;&#x67D3;&#x4E00;&#x4E2A;&#x7A7A;&#x7EC4;&#x4EF6;&#x3002;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function withAuth(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      if (this.props.loggedIn) {
        return super.render();
      } else {
        return null;
      }
    }
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code>function withAuth(<span class="hljs-type">WrappedComponent</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WrappedComponent</span> </span>{
    render() {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.loggedIn) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.render();
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
      }
    }
  }
}
</code></pre><p>&#x6839;&#x636E; WrappedComponent&#x7684; this.props.loggedIn &#x5224;&#x8BFB;&#x7528;&#x6237;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x767B;&#x5F55;&#xFF0C;&#x5982;&#x679C;&#x767B;&#x5F55;&#xFF0C;&#x5C31;&#x901A;&#x8FC7; super.render()&#x8C03;&#x7528; WrappedComponent &#x7684; render &#x65B9;&#x6CD5;&#x6B63;&#x5E38;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; null&#xFF0C; &#x7EE7;&#x627F;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5BF9;&#x88AB;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#x5177;&#x6709;&#x4FB5;&#x5165;&#x6027;&#xFF0C;&#x5F53;&#x7EC4;&#x5408;&#x591A;&#x4E2A;&#x9AD8;&#x9636;&#x4F7F;&#x7528;&#x65F6;&#xFF0C;&#x5F88;&#x5BB9;&#x6613;&#x56E0;&#x4E3A;&#x5B50;&#x7C7B;&#x7EC4;&#x4EF6;&#x5FD8;&#x8BB0;&#x901A;&#x8FC7; super&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7EC4;&#x4EF6;&#x65B9;&#x6CD5;&#x800C;&#x5BFC;&#x81F4;&#x903B;&#x8F91;&#x4E22;&#x5931;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x5728;&#x4F7F;&#x7528;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x5E94;&#x5C3D;&#x91CF;&#x901A;&#x8FC7;&#x4EE3;&#x7406;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x3002;</p><p><a href="#">&#x4EE5;&#x4E0A;&#x4E3B;&#x8981;&#x53C2;&#x8003; &#x300A;React &#x8FDB;&#x9636;&#x4E4B;&#x8DEF;&#x300B;&#x8FD9;&#x672C;&#x4E66;</a></p><blockquote>&#x613F;&#x4F60;&#x6210;&#x4E3A;&#x7EC8;&#x8EAB;&#x5B66;&#x4E60;&#x8005;</blockquote><p>&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#x751F;&#x6D3B;&#x4E0D;&#x4E3A;&#x4EBA;&#x77E5;&#x7684;&#x4E00;&#x9762;&#xFF0C;&#x53EF;&#x4EE5;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x5927;&#x8FC1;&#x4E16;&#x754C;&#x5662;</p><p><span class="img-wrap"><img data-src="/img/bVbgW9s?w=344&amp;h=344" src="https://static.alili.tech/img/bVbgW9s?w=344&amp;h=344" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React高级组件精讲

## 原文链接
[https://segmentfault.com/a/1190000016394640](https://segmentfault.com/a/1190000016394640)

