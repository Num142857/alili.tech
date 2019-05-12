---
title: '读zent源码库之Dialog组件实现' 
date: 2018-11-27 2:30:12
hidden: true
slug: fy2m36ua1a5
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">1&#x3001;Dialog&#x7EC4;&#x4EF6;&#x63D0;&#x4F9B;&#x4EC0;&#x4E48;&#x529F;&#x80FD;&#xFF0C;&#x89E3;&#x51B3;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#xFF1F;</h2><p>zent&#x7684;Dialog&#x7EC4;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;&#x59FF;&#x52BF;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF08;&#x4EE3;&#x7801;&#x6458;&#x81EA;zent&#x5B98;&#x65B9;&#x6587;&#x6863;&#xFF1A;<a href="https://www.youzanyun.com/zanui/zent/zh/component/dialog" rel="nofollow noreferrer" target="_blank">https://www.youzanyun.com/zan...</a>&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Dialog, Button } from &apos;zent&apos;;

class Example extends React.Component {
  state = { visible: false }

  triggerDialog = visible =&gt; {
    this.setState({ visible });
  };

  render() {
    return (
      &lt;div&gt;
        &lt;Button
          type=&quot;primary&quot;
          onClick={() =&gt; this.triggerDialog(true)}
        &gt;
          &#x663E;&#x793A;
        &lt;/Button&gt;
        &lt;Dialog
                    visible={this.state.visible}
                    onClose={() =&gt; this.triggerDialog(false)}
                    title=&quot;&#x5BF9;&#x8BDD;&#x6846;&quot;
                &gt;
                    &lt;p&gt;&#x5BF9;&#x8BDD;&#x6846;&#x5185;&#x5BB9;&lt;/p&gt;
                    &lt;p&gt;&#x5BF9;&#x8BDD;&#x6846;&#x5176;&#x4ED6;&#x5185;&#x5BB9;&lt;/p&gt;
                &lt;/Dialog&gt;
      &lt;/div&gt;
    );
  }
}

ReactDOM.render(&lt;Example /&gt;, mountNode);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { Dialog, Button } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;zent&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Example</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = { <span class="hljs-attr">visible</span>: <span class="hljs-literal">false</span> }

  triggerDialog = <span class="hljs-function"><span class="hljs-params">visible</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({ visible });
  };

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span>
          <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;primary&quot;</span>
          <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> this.triggerDialog(true)}
        &gt;
          &#x663E;&#x793A;
        <span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Dialog</span>
                    <span class="hljs-attr">visible</span>=<span class="hljs-string">{this.state.visible}</span>
                    <span class="hljs-attr">onClose</span>=<span class="hljs-string">{()</span> =&gt;</span> this.triggerDialog(false)}
                    title=&quot;&#x5BF9;&#x8BDD;&#x6846;&quot;
                &gt;
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5BF9;&#x8BDD;&#x6846;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5BF9;&#x8BDD;&#x6846;&#x5176;&#x4ED6;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">Dialog</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Example</span> /&gt;</span>, mountNode);</span></code></pre><ol><li>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;visible&#x5C5E;&#x6027;&#x63A7;&#x5236;&#x5F39;&#x5C42;&#x7684;&#x663E;&#x793A;&#x4E0E;&#x9690;&#x85CF;</li><li>&#x53EF;&#x4EE5;&#x968F;&#x610F;&#x7684;&#x5728;Dialog&#x7EC4;&#x4EF6;&#x91CC;&#x6DFB;&#x52A0;&#x4EFB;&#x610F;&#x591A;&#x7684;&#x5185;&#x5BB9;</li><li>&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x610F;&#x4F4D;&#x7F6E;&#x4F7F;&#x7528;Dialog&#x7EC4;&#x4EF6;</li></ol><h2 id="articleHeader1">2&#x3001;&#x5982;&#x679C;&#x6211;&#x6765;&#x5B9E;&#x73B0;&#x4F1A;&#x600E;&#x4E48;&#x505A;&#xFF1F;</h2><p>&#x5982;&#x679C;&#x6211;&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x5176;&#x5B9E;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x7528;jQuery&#x5DF2;&#x7ECF;&#x5199;&#x4E86;&#x65E0;&#x6570;&#x904D;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x60F3;&#x60F3;&#x5F53;&#x521D;&#x7528;jQuery&#x6765;&#x5199;&#x7EC4;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x975E;&#x5E38;&#x65B9;&#x4FBF;&#x7684;&#x53EF;&#x4EE5;&#x5728;body&#x4E0B;&#x9762;&#x63D2;&#x5165;&#x4E00;&#x4E2A;div&#xFF0C;&#x5E76;&#x4E14;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#xFF0C;&#x6216;&#x8005;&#xFF0C;&#x76F4;&#x63A5;&#x628A;&#x5F39;&#x5C42;&#x7684;div&#x5199;&#x5230;body&#x6807;&#x7B7E;&#x4E0B;&#x9762;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;react&#xFF0C;&#x5374;&#x662F;&#x7EC4;&#x4EF6;&#x5D4C;&#x5957;&#x7EC4;&#x4EF6;&#xFF0C;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x90FD;&#x6E32;&#x67D3;&#x5728;&#x4E00;&#x4E2A;&#x88AB;&#x79F0;&#x4E3A;root&#x7684;div&#x4E0B;&#x9762;&#xFF0C;&#x8FD9;&#x53EF;&#x600E;&#x4E48;&#x628A;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#x6302;&#x8F7D;&#x5230;body&#x4E0B;&#x9762;&#x5462;&#xFF1F;</p><p>&#x4E5F;&#x7B80;&#x5355;&#xFF0C;&#x6211;&#x76F4;&#x63A5;&#x7528;document.body.appendChild&#x628A;&#x7EC4;&#x4EF6;&#x76F4;&#x63A5;&#x63D2;&#x5165;&#x5230;body&#x540E;&#x9762;&#xFF0C;&#x4F46;&#x662F;&#x53D1;&#x73B0;&#xFF0C;document.body.appendChild&#x7684;&#x53C2;&#x6570;&#x5FC5;&#x987B;&#x662F;&#x6807;&#x51C6;&#x7684;dom&#x8282;&#x70B9;&#xFF0C;&#x800C;react&#x91CC;&#x9762;&#xFF0C;&#x901A;&#x8FC7;this.props.children&#x53D6;&#x51FA;&#x6765;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x6807;&#x51C6;&#x7684;dom&#x8282;&#x70B9;&#xFF0C;&#x8FD9;&#x4E5F;&#x597D;&#x529E;&#xFF0C;&#x628A;&#x8FD9;&#x4E9B;&#x8282;&#x70B9;&#x8F6C;&#x6210;&#x6807;&#x51C6;&#x7684;dom&#x8282;&#x70B9;&#xFF0C;&#x7136;&#x540E;&#x63D2;&#x5165;&#x5230;body&#x4E0B;&#x9762;&#x4E0D;&#x5C31;ok&#x4E86;&#xFF1F;&#x6211;&#x662F;&#x8FD9;&#x4E48;&#x60F3;&#x7684;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x6700;&#x540E;&#x4E00;&#x6B65;&#xFF0C;&#x4E8B;&#x4EF6;&#x600E;&#x4E48;&#x7ED1;&#x5B9A;&#x5462;&#xFF1F;&#x8FD9;&#x5757;&#x6CA1;&#x6709;&#x6DF1;&#x5165;&#x7814;&#x7A76;&#x4E86;&#xFF0C;&#x4E0D;&#x8FC7;&#x6211;&#x60F3;&#xFF0C;&#x5E94;&#x8BE5;&#x8FD9;&#x6837;&#x53BB;&#x5B9E;&#x73B0;&#x4E5F;&#x662F;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x7684;&#x3002;</p><p>&#x987A;&#x4FBF;&#x8BF4;&#x4E00;&#x4E0B;&#xFF0C;&#x66FE;&#x7ECF;&#x6211;&#x8FD8;&#x5B9E;&#x73B0;&#x8FC7;&#x4E00;&#x4E2A;React&#x7684;&#x5F39;&#x5C42;&#xFF0C;&#x4F46;&#x662F;&#x5FC5;&#x987B;&#x653E;&#x5230;&#x6700;&#x5916;&#x5C42;&#x4F7F;&#x7528;&#x3002;&#x3002;&#x3002;&#x54C8;&#x54C8;&#xFF0C;&#x4E0D;&#x8BF4;&#x4E86;&#xFF0C;&#x90FD;&#x662F;&#x6CEA;&#xFF0C;&#x4FB5;&#x5165;&#x592A;&#x5F3A;&#xFF0C;&#x65E0;&#x6CD5;&#x505A;&#x5230;<strong>&#x5728;&#x4EFB;&#x610F;&#x4F4D;&#x7F6E;&#x4F7F;&#x7528;Dialog&#x7EC4;&#x4EF6;</strong>&#x3002;</p><h2 id="articleHeader2">3&#x3001;zent&#x7684;Dialog&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;</h2><p>zent&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#xFF0C;&#x5176;&#x5B9E;&#x8DDF;&#x6211;&#x4E0A;&#x9762;&#x8BF4;&#x7684;&#x57FA;&#x672C;&#x601D;&#x8DEF;&#x662F;&#x4E00;&#x81F4;&#x7684;&#xFF0C;&#x53EA;&#x662F;&#xFF0C;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#x4E0D;&#x518D;&#x662F;<em>document.body.appendChild</em>&#xFF0C;&#x800C;&#x662F;&#x7528;&#x5230;&#x4E86;&#x4E00;&#x4E2A;React&#x63D0;&#x4F9B;&#x7684;&#x53EB;&#x505A;<em>ReactDOM.unstable_renderSubtreeIntoContainer(parentComponent, element, containerNode, callback)</em>&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x5F53;&#x524D;dialog&#x6240;&#x5728;&#x7684;&#x7236;&#x7EC4;&#x4EF6;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x5C06;&#x8981;&#x6E32;&#x67D3;&#x7684;dialog&#x5185;&#x5BB9;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;<strong>this.props.children</strong>&#xFF0C;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x5373;&#x5C06;&#x8981;&#x6302;&#x8F7D;&#x5230;body&#x4E0B;&#x9762;&#x7684;&#x4E00;&#x4E2A;div&#x5BB9;&#x5668;&#x8282;&#x70B9;&#xFF0C;callback&#x5C31;&#x662F;&#x6210;&#x529F;&#x4E4B;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x4E86;&#x3002;</p><p>&#x4ECE;&#x51FD;&#x6570;&#x540D;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x662F;&#x4E0D;&#x7A33;&#x5B9A;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;zent&#x8FD8;&#x662F;&#x7528;&#x4E86;&#xFF0C;&#x4E0D;&#x8FC7;&#x6548;&#x679C;&#x5F88;&#x597D;&#xFF0C;&#x54C8;&#x54C8;&#x3002;</p><p>zent&#x7684;&#x5177;&#x4F53;&#x505A;&#x6CD5;&#x662F;&#xFF0C;&#x628A;<em>ReactDOM.unstable_renderSubtreeIntoContainer</em>&#x65B9;&#x6CD5;&#x653E;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x53EB;&#x505A;Portal&#x7684;&#x7EC4;&#x4EF6;&#x4E0A;&#x53BB;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x628A;dialog&#x5185;&#x5BB9;&#x653E;&#x8FDB;&#x8FD9;&#x4E2A;Portal&#x7EC4;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;PortalComponent
    visible={visible}
    onClose={this.onClose}
    className={`${prefix}-dialog-r-anchor`}
  &gt;
    &lt;DialogEl {...this.props} onClose={this.onClose} style={elStyle}&gt;
      {this.props.children}
    &lt;/DialogEl&gt;
&lt;/PortalComponent&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">PortalComponent</span>
    <span class="hljs-attr">visible</span>=</span></span><span class="hljs-template-variable">{visible}</span><span class="xml"><span class="hljs-tag">
    <span class="hljs-attr">onClose</span>=</span></span><span class="hljs-template-variable">{this.onClose}</span><span class="xml"><span class="hljs-tag">
    <span class="hljs-attr">className</span>=</span></span><span class="hljs-template-variable">{`${prefix}</span><span class="xml"><span class="hljs-tag"><span class="hljs-attr">-dialog-r-anchor</span>`}
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">DialogEl</span> </span></span><span class="hljs-template-variable">{...this.props}</span><span class="xml"><span class="hljs-tag"> <span class="hljs-attr">onClose</span>=</span></span><span class="hljs-template-variable">{this.onClose}</span><span class="xml"><span class="hljs-tag"> <span class="hljs-attr">style</span>=</span></span><span class="hljs-template-variable">{elStyle}</span><span class="xml"><span class="hljs-tag">&gt;</span>
      </span><span class="hljs-template-variable">{this.props.children}</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">DialogEl</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">PortalComponent</span>&gt;</span></span></code></pre><p>Portal&#x7EC4;&#x4EF6;&#x672C;&#x8EAB;&#x7684;&#x529F;&#x80FD;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x4EC5;&#x4EC5;&#x53EA;&#x662F;&#x8D1F;&#x8D23;&#x628A;&#x5176;&#x5B50;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x5230;body&#x4E0B;&#x9762;&#x7684;&#x4E00;&#x4E2A;&#x65B0;&#x521B;&#x5EFA;&#x7684;div&#x4E0B;&#x9762;&#x53BB;&#x3002;&#x5176;&#x4ED6;&#x7684;&#x903B;&#x8F91;&#xFF08;&#x6BD4;&#x5982;&#x663E;&#x793A;&#x3001;&#x9690;&#x85CF;&#x3001;mask&#x4E4B;&#x7C7B;&#xFF09;&#xFF0C;&#x5168;&#x90E8;&#x90FD;&#x653E;&#x5230;dialog&#x7EC4;&#x4EF6;&#x81EA;&#x8EAB;&#x4E0A;&#x53BB;&#x5B9E;&#x73B0;&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x663E;&#x793A;&#x4E0E;&#x9690;&#x85CF;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x8FD8;&#x662F;&#x7531;Portal&#x6765;&#x63A7;&#x5236;&#xFF0C;&#x9690;&#x85CF;&#x7684;&#x65F6;&#x5019;&#xFF0C;Portal&#x4F1A;&#x628A;&#x5F53;&#x524D;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x4ECE;body&#x4E0A;&#x9762;&#x5378;&#x8F7D;&#x6389;&#x3002;</p><h2 id="articleHeader3">4&#x3001;&#x6781;&#x7B80;&#x5B9E;&#x73B0;</h2><p>&#x4EE5;&#x4E0B;&#x662F;&#x4E00;&#x4E2A;&#x6781;&#x7B80;&#x7684;Portal&#x5B9E;&#x73B0;&#xFF0C;&#x5373;&#x628A;&#x81EA;&#x5DF1;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x5230;body&#x4E0A;&#x9762;&#x53BB;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import ReactDOM from &apos;react-dom&apos;;

export default class Portal extends React.Component {
  renderChildren() {
    const container = document.createElement(&apos;div&apos;);
    document.body.appendChild(container);
    ReactDOM.unstable_renderSubtreeIntoContainer(this, React.Children.only(this.props.children), container);
  }
  componentDidMount() {
    this.renderChildren();
  }
  render() {
    return null;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">&apos;reac</span>t&apos;;
<span class="hljs-keyword">import</span> <span class="hljs-type">ReactDOM</span> from <span class="hljs-symbol">&apos;react</span>-dom&apos;;

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Portal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  renderChildren() {
    const container = document.createElement(<span class="hljs-symbol">&apos;di</span>v&apos;);
    document.body.appendChild(container);
    <span class="hljs-type">ReactDOM</span>.unstable_renderSubtreeIntoContainer(<span class="hljs-keyword">this</span>, <span class="hljs-type">React</span>.<span class="hljs-type">Children</span>.only(<span class="hljs-keyword">this</span>.props.children), container);
  }
  componentDidMount() {
    <span class="hljs-keyword">this</span>.renderChildren();
  }
  render() {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }
}</code></pre><p>&#x4EE5;&#x4E0B;&#x662F;&#xFF0C;&#x57FA;&#x4E8E;Portal&#x7684;Dialog&#x7EC4;&#x4EF6;&#x7684;&#x6781;&#x7B80;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import Portal from &apos;./portal&apos;;

export default class Dialog extends React.Component {
  render() {
    return &lt;Portal&gt;
      &lt;div&gt;{this.props.children}&lt;/div&gt;
    &lt;/Portal&gt;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">&apos;reac</span>t&apos;;
<span class="hljs-keyword">import</span> <span class="hljs-type">Portal</span> from &apos;./portal&apos;;

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dialog</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">Portal</span>&gt;
      &lt;div&gt;{<span class="hljs-keyword">this</span>.props.children}&lt;/div&gt;
    &lt;/<span class="hljs-type">Portal</span>&gt;
  }
}</code></pre><p>&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import ReactDOM, { render } from &apos;react-dom&apos;;
import Dialog from &apos;./dialog&apos;;

class App extends Component {
  onTextClick = () =&gt; {
    console.log(&apos;clicked&apos;)
  }

  render() {
    return (
      &lt;div&gt;
        &lt;Dialog &gt;
          &lt;div onClick={this.onTextClick}&gt;this is dialog&lt;/div&gt;
        &lt;/Dialog&gt;
      &lt;/div&gt;
    );
  }
}

render(&lt;App /&gt;, document.getElementById(&apos;root&apos;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> ReactDOM, { render } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>;
<span class="hljs-keyword">import</span> Dialog <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./dialog&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  onTextClick = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;clicked&apos;</span>)
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Dialog</span> &gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.onTextClick}</span>&gt;</span>this is dialog<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Dialog</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, document.getElementById(&apos;root&apos;));</span></code></pre><p>&#x5F53;&#x7136;&#xFF0C;&#x771F;&#x6B63;&#x8981;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;Dialog&#x9700;&#x8981;&#x8003;&#x8651;&#x7684;&#x95EE;&#x9898;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#xFF0C;&#x6BD4;&#x5982;&#x63A7;&#x5236;&#x9690;&#x85CF;&#x4E0E;&#x663E;&#x793A;&#x3001;&#x5B9A;&#x5236;&#x52A8;&#x753B;&#xFF0C;&#x81EA;&#x5B9A;&#x4E49;&#x6837;&#x5F0F;&#xFF0C;&#x914D;&#x7F6E;dialog&#x7684;&#x6807;&#x9898;&#x548C;&#x5176;&#x4ED6;&#x5C5E;&#x6027;&#x7B49;&#x7B49;&#xFF0C;&#x53EA;&#x662F;&#x8FD9;&#x4E9B;&#x6211;&#x4EEC;&#x5728;jQuery&#x65F6;&#x4EE3;&#x90FD;&#x5DF2;&#x7ECF;&#x505A;&#x8FC7;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x5206;&#x6790;&#x4E86;Portal&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x6BD5;&#x7ADF;&#xFF0C;&#x5728;React&#x91CC;&#x9762;&#xFF0C;&#x8981;&#x628A;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x5230;app&#x6839;&#x8282;&#x70B9;&#x5916;&#x9762;&#x53BB;&#x5E76;&#x4E0D;&#x5BB9;&#x6613;&#x3002;</p><p>&#xFF08;&#x5168;&#x6587;&#x5B8C;&#xFF09;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
读zent源码库之Dialog组件实现

## 原文链接
[https://segmentfault.com/a/1190000015343992](https://segmentfault.com/a/1190000015343992)

