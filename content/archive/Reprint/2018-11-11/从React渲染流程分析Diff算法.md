---
title: 从React渲染流程分析Diff算法
reprint: true
categories: reprint
abbrlink: 7c3465c2
date: 2018-11-11 02:30:07
---

{{% raw %}}
<h2 id="articleHeader0">1&#x3001;&#x4EC0;&#x4E48;&#x662F;&#x865A;&#x62DF;DOM</h2><blockquote>&#x5728;React&#x4E2D;&#xFF0C;render&#x6267;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x5F97;&#x5230;&#x7684;&#x5E76;&#x4E0D;&#x662F;&#x771F;&#x6B63;&#x7684;DOM&#x8282;&#x70B9;&#xFF0C;&#x7ED3;&#x679C;&#x4EC5;&#x4EC5;&#x662F;&#x8F7B;&#x91CF;&#x7EA7;&#x7684;JavaScript&#x5BF9;&#x8C61;&#xFF0C;&#x6211;&#x4EEC;&#x79F0;&#x4E4B;&#x4E3A;virtual DOM&#x3002;</blockquote><ul><li>&#x7B80;&#x5355;&#x7684;&#x8BF4;&#xFF0C;&#x5176;&#x5B9E;&#x6240;&#x8C13;&#x7684;virtual DOM&#x5C31;&#x662F;JavaScript&#x5BF9;&#x8C61;&#x5230;Html DOM&#x8282;&#x70B9;&#x7684;&#x6620;&#x5C04;&#xFF1B;&#x5373;&#x4F7F;&#x7528;JavaScript&#x5BF9;&#x8C61;&#x5C06;Html&#x7ED3;&#x6784;&#x8868;&#x793A;&#x51FA;&#x6765;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5C31;&#x662F;virtual DOM&#x3002;</li><li>eg:</li><li>Html:</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;ul id=&apos;list&apos;&gt;
  &lt;li class=&apos;item&apos;&gt;Item 1&lt;/li&gt;
  &lt;li class=&apos;item&apos;&gt;Item 2&lt;/li&gt;
&lt;/ul&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&apos;list&apos;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;item&apos;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&apos;item&apos;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre><ul><li>JavaScript&#x5BF9;&#x8C61;&#x8868;&#x793A;&#xFF08;virtual DOM&#xFF09;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  tagName: &apos;ul&apos;,
  props: {
    id: &apos;list&apos;
  },
  children: [
    {tagName: &apos;li&apos;, props: {class: &apos;item&apos;}, children: [&quot;Item 1&quot;]},
    {tagName: &apos;li&apos;, props: {class: &apos;item&apos;}, children: [&quot;Item 2&quot;]},
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>{
  <span class="hljs-attribute">tagName</span>: <span class="hljs-string">&apos;ul&apos;</span>,
  <span class="hljs-attribute">props</span>: {
    <span class="hljs-attribute">id</span>: <span class="hljs-string">&apos;list&apos;</span>
  },
  <span class="hljs-attribute">children</span>: [
    {<span class="hljs-attribute">tagName</span>: <span class="hljs-string">&apos;li&apos;</span>, <span class="hljs-attribute">props</span>: {<span class="hljs-attribute">class</span>: <span class="hljs-string">&apos;item&apos;</span>}, <span class="hljs-attribute">children</span>: [<span class="hljs-string">&quot;Item 1&quot;</span>]},
    {<span class="hljs-attribute">tagName</span>: <span class="hljs-string">&apos;li&apos;</span>, <span class="hljs-attribute">props</span>: {<span class="hljs-attribute">class</span>: <span class="hljs-string">&apos;item&apos;</span>}, <span class="hljs-attribute">children</span>: [<span class="hljs-string">&quot;Item 2&quot;</span>]},
  ]
}</code></pre><h2 id="articleHeader1">2&#x3001;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x4F1A;&#x751F;&#x6210;&#x5230;virtual DOM</h2><ul><li>React&#x751F;&#x547D;&#x5468;&#x671F;&#x62E5;&#x6709;&#x88C5;&#x8F7D;&#x3001;&#x66F4;&#x65B0;&#x3001;&#x5378;&#x8F7D;&#x7684;&#x4E09;&#x4E2A;&#x9636;&#x6BB5;&#xFF1B;&#x9644;&#x4E0A;&#x4E00;&#x5F20;React&#x751F;&#x547D;&#x5468;&#x671F;&#x56FE;</li></ul><p><span class="img-wrap"><img data-src="/img/bVbf8xp?w=1200&amp;h=1300" src="https://static.alili.tech/img/bVbf8xp?w=1200&amp;h=1300" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><ul><li>&#x524D;&#x9762;&#x63D0;&#x5230;&#xFF1A;render&#x6267;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x5F97;&#x5230;&#x7684;&#x5E76;&#x4E0D;&#x662F;&#x771F;&#x6B63;&#x7684;DOM&#x8282;&#x70B9;&#xFF0C;&#x7ED3;&#x679C;&#x4EC5;&#x4EC5;&#x662F;&#x8F7B;&#x91CF;&#x7EA7;&#x7684;JavaScript&#x5BF9;&#x8C61;&#xFF0C;&#x5373;&#x5728;render&#x51FD;&#x6570;&#x8C03;&#x7528;&#x65F6;&#x5C06;&#x4F1A;&#x521B;&#x5EFA;&#x51FA;&#x865A;&#x62DF;DOM&#xFF1B;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Tab extends React.Component {
    render() {
        React.createElement(
          &apos;p&apos;,
          { className: &apos;class&apos;},
          &apos;Hello React&apos;
        )
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Tab</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-type">React</span>.createElement(
          &apos;p&apos;,
          { className: <span class="hljs-symbol">&apos;clas</span>s&apos;},
          <span class="hljs-symbol">&apos;Hello</span> <span class="hljs-type">React</span>&apos;
        )
    }
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbf8yw?w=1732&amp;h=1344" src="https://static.alili.tech/img/bVbf8yw?w=1732&amp;h=1344" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><ul><li>&#x901A;&#x8FC7;React.createElemen&#x521B;&#x5EFA;&#x51FA;&#x865A;&#x62DF;DOM&#xFF0C;&#x800C;&#x8BE5;&#x51FD;&#x6570;&#x53EA;&#x5728;Render&#x51FD;&#x6570;&#x4E2D;&#x8C03;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x5728;React&#x88C5;&#x8F7D;&#x548C;&#x66F4;&#x65B0;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x624D;&#x4F1A;&#x6709;&#x865A;&#x62DF;DOM&#x7684;&#x751F;&#x6210;&#xFF1B;&#x81F3;&#x4E8E;&#x6302;&#x8F7D;&#x5230;&#x771F;&#x5B9E;DOM&#x81EA;&#x7136;&#x800C;&#x7136;&#x662F;ReactDom.render&#x51FD;&#x6570;&#x5566;&#x3002;</li></ul><hr><h2 id="articleHeader2">3&#x3001;virtual DOM&#x5982;&#x4F55;&#x5B9E;&#x73B0;</h2><ul><li>&#x5B9E;&#x73B0;&#x5176;&#x5B9E;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5E76;&#x628A;&#x6211;&#x4EEC;&#x4F20;&#x8FDB;&#x53BB;&#x7684;&#x53C2;&#x6570;&#x7EC4;&#x6210;&#x4E00;&#x4E2A;React&#x5143;&#x7D20;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;type&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x4F20;&#x8FDB;&#x53BB;&#x7684;&#x7EC4;&#x4EF6;&#x7C7B;&#x578B;&#xFF0C;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x7C7B;&#x3001;&#x51FD;&#x6570;&#x6216;&#x5B57;&#x7B26;&#x4E32;&#xFF08;&#x5982;&apos;div&apos;&#xFF09;</li><li>React&#x5927;&#x81F4;&#x6E90;&#x7801;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createElement(type, config, children) {
  let propName;

  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      //  &#x5982;&#x679C;&#x6709;ref&#xFF0C;&#x5C06;&#x5B83;&#x53D6;&#x51FA;&#x6765;
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      //  &#x5982;&#x679C;&#x6709;key&#xFF0C;&#x5C06;&#x5B83;&#x53D6;&#x51FA;&#x6765;
      key = &apos;&apos; + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &amp;&amp;
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        //  &#x5C06;&#x9664;ref&#xFF0C;key&#x7B49;&#x8FD9;&#x4E9B;&#x7279;&#x6B8A;&#x7684;&#x5C5E;&#x6027;&#x653E;&#x5230;&#x65B0;&#x7684;props&#x5BF9;&#x8C61;&#x91CC;
        props[propName] = config[propName];
      }
    }
  }

  //  &#x83B7;&#x53D6;&#x5B50;&#x5143;&#x7D20;
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength &gt; 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i &lt; childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  //  &#x6DFB;&#x52A0;&#x9ED8;&#x8BA4;props
  if (type &amp;&amp; type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}

const ReactElement = function(type, key, ref, self, source, owner, props) {
  //  &#x6700;&#x7EC8;&#x5F97;&#x5230;&#x7684;React&#x5143;&#x7D20;
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
  };

  return element;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs verilog"><code><span class="hljs-keyword">function</span> createElement(<span class="hljs-keyword">type</span>, <span class="hljs-keyword">config</span>, children) {
  <span class="hljs-keyword">let</span> propName;

  <span class="hljs-keyword">const</span> props = {};

  <span class="hljs-keyword">let</span> key = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">let</span> <span class="hljs-keyword">ref</span> = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">let</span> self = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">let</span> source = <span class="hljs-literal">null</span>;

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">config</span> != <span class="hljs-literal">null</span>) {
    <span class="hljs-keyword">if</span> (hasValidRef(<span class="hljs-keyword">config</span>)) {
      <span class="hljs-comment">//  &#x5982;&#x679C;&#x6709;ref&#xFF0C;&#x5C06;&#x5B83;&#x53D6;&#x51FA;&#x6765;</span>
      <span class="hljs-keyword">ref</span> = <span class="hljs-keyword">config</span><span class="hljs-variable">.ref</span>;
    }
    <span class="hljs-keyword">if</span> (hasValidKey(<span class="hljs-keyword">config</span>)) {
      <span class="hljs-comment">//  &#x5982;&#x679C;&#x6709;key&#xFF0C;&#x5C06;&#x5B83;&#x53D6;&#x51FA;&#x6765;</span>
      key = &apos;&apos; + <span class="hljs-keyword">config</span><span class="hljs-variable">.key</span>;
    }

    self = <span class="hljs-keyword">config</span><span class="hljs-variable">.__self</span> === undefined ? <span class="hljs-literal">null</span> : <span class="hljs-keyword">config</span><span class="hljs-variable">.__self</span>;
    source = <span class="hljs-keyword">config</span><span class="hljs-variable">.__source</span> === undefined ? <span class="hljs-literal">null</span> : <span class="hljs-keyword">config</span><span class="hljs-variable">.__source</span>;
    
    <span class="hljs-keyword">for</span> (propName in <span class="hljs-keyword">config</span>) {
      <span class="hljs-keyword">if</span> (
        hasOwnProperty<span class="hljs-variable">.call</span>(<span class="hljs-keyword">config</span>, propName) &amp;&amp;
        !RESERVED_PROPS<span class="hljs-variable">.hasOwnProperty</span>(propName)
      ) {
        <span class="hljs-comment">//  &#x5C06;&#x9664;ref&#xFF0C;key&#x7B49;&#x8FD9;&#x4E9B;&#x7279;&#x6B8A;&#x7684;&#x5C5E;&#x6027;&#x653E;&#x5230;&#x65B0;&#x7684;props&#x5BF9;&#x8C61;&#x91CC;</span>
        props[propName] = <span class="hljs-keyword">config</span>[propName];
      }
    }
  }

  <span class="hljs-comment">//  &#x83B7;&#x53D6;&#x5B50;&#x5143;&#x7D20;</span>
  <span class="hljs-keyword">const</span> childrenLength = arguments<span class="hljs-variable">.length</span> - <span class="hljs-number">2</span>;
  <span class="hljs-keyword">if</span> (childrenLength === <span class="hljs-number">1</span>) {
    props<span class="hljs-variable">.children</span> = children;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (childrenLength &gt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">const</span> childArray = Array(childrenLength);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; childrenLength; i++) {
      childArray[i] = arguments[i + <span class="hljs-number">2</span>];
    }
    props<span class="hljs-variable">.children</span> = childArray;
  }

  <span class="hljs-comment">//  &#x6DFB;&#x52A0;&#x9ED8;&#x8BA4;props</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span> &amp;&amp; <span class="hljs-keyword">type</span><span class="hljs-variable">.defaultProps</span>) {
    <span class="hljs-keyword">const</span> defaultProps = <span class="hljs-keyword">type</span><span class="hljs-variable">.defaultProps</span>;
    <span class="hljs-keyword">for</span> (propName in defaultProps) {
      <span class="hljs-keyword">if</span> (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  
  <span class="hljs-keyword">return</span> ReactElement(
    <span class="hljs-keyword">type</span>,
    key,
    <span class="hljs-keyword">ref</span>,
    self,
    source,
    ReactCurrentOwner<span class="hljs-variable">.current</span>,
    props,
  );
}

<span class="hljs-keyword">const</span> ReactElement = <span class="hljs-keyword">function</span>(<span class="hljs-keyword">type</span>, key, <span class="hljs-keyword">ref</span>, self, source, owner, props) {
  <span class="hljs-comment">//  &#x6700;&#x7EC8;&#x5F97;&#x5230;&#x7684;React&#x5143;&#x7D20;</span>
  <span class="hljs-keyword">const</span> element = {
    <span class="hljs-comment">// This tag allows us to uniquely identify this as a React Element</span>
    $$typeof: REACT_ELEMENT_TYPE,

    <span class="hljs-comment">// Built-in properties that belong on the element</span>
    <span class="hljs-keyword">type</span>: <span class="hljs-keyword">type</span>,
    key: key,
    <span class="hljs-keyword">ref</span>: <span class="hljs-keyword">ref</span>,
    props: props,

    <span class="hljs-comment">// Record the component responsible for creating this element.</span>
    <span class="hljs-number">_</span>owner: owner,
  };

  <span class="hljs-keyword">return</span> element;
};</code></pre><ul><li>&#x6253;&#x5370;&#x51FA;&#x7EC4;&#x4EF6;&#xFF1A;</li></ul><p><span class="img-wrap"><img data-src="/img/bVbf8AI?w=599&amp;h=195" src="https://static.alili.tech/img/bVbf8AI?w=599&amp;h=195" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader3">4&#x3001;&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;&#x4F7F;&#x7528;virtual DOM</h2><ul><li><p>DOM&#x7BA1;&#x7406;&#x5386;&#x53F2;&#x9636;&#x6BB5;&#xFF1A;</p><ol><li>JS &#x6216;&#x8005; jQuery &#x64CD;&#x4F5C; DOM&#xFF1A; &#x5F53;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x8D8A;&#x6765;&#x8D8A;&#x590D;&#x6742;&#xFF0C;&#x9700;&#x8981;&#x5728;JS&#x91CC;&#x9762;&#x7EF4;&#x62A4;&#x7684;&#x5B57;&#x6BB5;&#x4E5F;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#xFF0C;&#x9700;&#x8981;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x548C;&#x5728;&#x4E8B;&#x4EF6;&#x56DE;&#x8C03;&#x7528;&#x66F4;&#x65B0;&#x9875;&#x9762;&#x7684;DOM&#x64CD;&#x4F5C;&#x4E5F;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#xFF0C;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4F1A;&#x53D8;&#x5F97;&#x975E;&#x5E38;&#x96BE;&#x7EF4;&#x62A4;&#x3002;</li><li>&#x540E;&#x6765;&#x4EA7;&#x51FA; MVC&#x3001;MVP &#x7684;&#x67B6;&#x6784;&#x6A21;&#x5F0F;&#xFF0C;&#x671F;&#x671B;&#x4ECE;&#x4EE3;&#x7801;&#x7EC4;&#x7EC7;&#x65B9;&#x5F0F;&#x6765;&#x964D;&#x4F4E;&#x7EF4;&#x62A4;&#x96BE;&#x5EA6;&#x3002;&#x4F46;&#x662F; MVC &#x67B6;&#x6784;&#x5E76;&#x6CA1;&#x529E;&#x6CD5;&#x51CF;&#x5C11;&#x7EF4;&#x62A4;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x4E5F;&#x6CA1;&#x6709;&#x964D;&#x4F4E;&#x72B6;&#x6001;&#x66F4;&#x65B0;&#x65F6;&#x9700;&#x8981;&#x5BF9;&#x9875;&#x9762;&#x7684;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x64CD;&#x4F5C;&#x7684;DOM&#x8FD8;&#x662F;&#x9700;&#x8981;&#x64CD;&#x4F5C;&#xFF0C;&#x53EA;&#x662F;&#x6362;&#x4E86;&#x4E2A;&#x5730;&#x65B9;&#x3002;</li><li>&#x65E2;&#x7136;&#x72B6;&#x6001;&#x6539;&#x53D8;&#x4E86;&#x8981;&#x64CD;&#x4F5C;&#x76F8;&#x5E94;&#x7684;DOM&#x5143;&#x7D20;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x505A;&#x4E00;&#x4E2A;&#x4E1C;&#x897F;&#x8BA9;&#x89C6;&#x56FE;&#x548C;&#x72B6;&#x6001;&#x8FDB;&#x884C;&#x7ED1;&#x5B9A;&#xFF0C;&#x72B6;&#x6001;&#x53D8;&#x66F4;&#x4E86;&#x89C6;&#x56FE;&#x81EA;&#x52A8;&#x53D8;&#x66F4;&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x540E;&#x6765;&#x4EBA;&#x4EEC;&#x60F3;&#x51FA;&#x4E86; MVVM &#x6A21;&#x5F0F;&#xFF0C;&#x53EA;&#x8981;&#x5728;&#x6A21;&#x7248;&#x4E2D;&#x58F0;&#x660E;&#x89C6;&#x56FE;&#x7EC4;&#x4EF6;&#x662F;&#x548C;&#x4EC0;&#x4E48;&#x72B6;&#x6001;&#x8FDB;&#x884C;&#x7ED1;&#x5B9A;&#x7684;&#xFF0C;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x5F15;&#x64CE;&#x5C31;&#x4F1A;&#x5728;&#x72B6;&#x6001;&#x66F4;&#x65B0;&#x7684;&#x65F6;&#x5019;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x89C6;&#x56FE;;</li><li>&#x4F46;MVVM&#x53CC;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x5E76;&#x4E0D;&#x662F;&#x552F;&#x4E00;&#x7684;&#x529E;&#x6CD5;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x76F4;&#x89C2;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;&#x4E00;&#x65E6;&#x72B6;&#x6001;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#xFF0C;&#x5C31;&#x7528;&#x6A21;&#x7248;&#x5F15;&#x64CE;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x6574;&#x4E2A;&#x89C6;&#x56FE;&#xFF0C;&#x7136;&#x540E;&#x7528;&#x65B0;&#x7684;&#x89C6;&#x56FE;&#x66F4;&#x6362;&#x6389;&#x65E7;&#x7684;&#x89C6;&#x56FE;&#x3002;</li></ol></li><li>React&#x91C7;&#x7528;&#x7684;&#x5C31;&#x662F;&#x7B2C;&#x56DB;&#x79CD;&#x6A21;&#x5F0F;&#xFF1B;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x90FD;&#x77E5;&#x9053;&#x5BF9;&#x4E8E;&#x64CD;&#x4F5C;DOM&#x6210;&#x672C;&#x592A;&#x9AD8;&#xFF0C;&#x800C;&#x76F8;&#x5BF9;&#x64CD;&#x4F5C;JavaScript&#x5C31;&#x5FEB;&#x901F;&#x591A;&#x4E86;&#xFF0C;&#x800C;Html DOM&#x53EF;&#x4EE5;&#x5F88;&#x7B80;&#x5355;&#x7684;&#x7528;JavaScript&#x5BF9;&#x8C61;&#x8868;&#x793A;&#x51FA;&#x6765;&#xFF08;Virtual DOM&#x5C31;&#x8FD9;&#x6837;&#x8BDE;&#x751F;&#x4E86;&#xFF09;</li><li>&#x8FD9;&#x6837;&#x7684;&#x505A;&#x6CD5;&#x4F1A;&#x5BFC;&#x81F4;&#x5F88;&#x591A;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6700;&#x5927;&#x7684;&#x95EE;&#x9898;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x505A;&#x4F1A;&#x5F88;&#x6162;&#xFF0C;&#x56E0;&#x4E3A;&#x5373;&#x4F7F;&#x4E00;&#x4E2A;&#x5C0F;&#x5C0F;&#x7684;&#x72B6;&#x6001;&#x53D8;&#x66F4;&#x90FD;&#x8981;&#x91CD;&#x65B0;&#x6784;&#x9020;&#x6574;&#x68F5; DOM&#xFF0C;&#x6027;&#x4EF7;&#x6BD4;&#x592A;&#x4F4E;&#xFF1B;&#x800C;React Virtual DOM&#x5728;&#x72B6;&#x6001;&#x66F4;&#x65B0;&#x8FC7;&#x7A0B;&#x52A0;&#x4E86;&#x4E00;&#x4E9B;&#x7279;&#x522B;&#x7684;&#x64CD;&#x4F5C;&#x6765;&#x907F;&#x514D;&#x6574;&#x68F5; DOM &#x6811;&#x53D8;&#x66F4;&#xFF08;<strong>&#x5B83;&#x5C31;&#x662F;&#x63A5;&#x4E0B;&#x6765;&#x7684;Diff&#x7B97;&#x6CD5;</strong>&#xFF09;&#x3002;</li><li><strong>&#x63A5;&#x4E0B;&#x6765;&#x7684;Diff&#x7B97;&#x6CD5;&#x5373;&#x5C06;&#x66F4;&#x65B0;&#xFF0C;&#x656C;&#x8BF7;&#x671F;&#x5F85;&#xFF5E;&#xFF5E;&#xFF5E;</strong></li></ul><blockquote><strong>&#x201C;&#x79EF;&#x8DEC;&#x6B65;&#x3001;&#x884C;&#x5343;&#x91CC;&#x201D;</strong>&#x2014;&#x2014; &#x6301;&#x7EED;&#x66F4;&#x65B0;&#x4E2D;~&#xFF0C;&#x559C;&#x6B22;&#x7559;&#x4E0B;&#x4E2A;&#x8D5E;&#x54E6;&#xFF01;</blockquote><ul><li><p>&#x5F80;&#x671F;&#x7ECF;&#x5178;&#x597D;&#x6587;&#xFF1A;</p><ol><li><a href="https://segmentfault.com/a/1190000015676846">&#x56E2;&#x961F;&#x5408;&#x4F5C;&#x5FC5;&#x5907;&#x7684;Git&#x64CD;&#x4F5C;</a></li><li><a href="https://segmentfault.com/a/1190000015991869" target="_blank">&#x8C08;&#x8C08;Js&#x524D;&#x7AEF;&#x89C4;&#x8303;&#x5316;</a></li></ol></li><li><p>&#x76F8;&#x5173;&#x4E13;&#x680F;&#x63A8;&#x8350;&#xFF1A;</p><ol><li><a href="https://segmentfault.com/blog/hui01">React&#x5B66;&#x4E60;&#x4E4B;&#x8DEF;</a></li></ol></li></ul>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从React渲染流程分析Diff算法

## 原文链接
[https://segmentfault.com/a/1190000016304921](https://segmentfault.com/a/1190000016304921)

