---
title: '动手写个React高阶组件' 
date: 2018-11-26 2:30:10
hidden: true
slug: y1rayyab8pn
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x662F;&#x4EC0;&#x4E48;</h2><p>&#x7B80;&#x79F0;<strong>HOC</strong>&#xFF0C;&#x5168;&#x79F0; <strong>High Order Component</strong>&#x3002;&#x4F5C;&#x7528;&#x662F;&#x7ED9;react&#x7EC4;&#x4EF6;&#x589E;&#x51CF;props&#x5C5E;&#x6027;&#x3002;</p><h2 id="articleHeader1">&#x600E;&#x4E48;&#x7528;</h2><p>&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x5148;&#x8BF4;&#x600E;&#x4E48;&#x5199;&#xFF1F;&#x6069;&#xFF0C;&#x56E0;&#x4E3A;&#x4F60;&#x5176;&#x5B9E;&#x5DF2;&#x7ECF;&#x7528;&#x8FC7;&#x4E86;&#xFF0C;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.js

import {connect} from &apos;react-redux&apos;;

class App extends React.Component {
  render() {}
}

export default connect()(App);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// App.js</span>

<span class="hljs-keyword">import</span> {connect} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-redux&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {}
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect()(App);</code></pre><p>&#x719F;&#x6089;&#x4E0D;&#xFF1F;redux&#x7684;&#x8FDE;&#x63A5;&#x5668;&#x3002;&#x4E0D;&#x8FC7;&#x7B14;&#x8005;&#x6709;&#x6D01;&#x7656;&#xFF0C;&#x559C;&#x6B22;&#x7528;&#x88C5;&#x9970;&#x5668;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.js

import {connect} from &apos;react-redux&apos;;

@connect()
export class App extends React.Component {
  render() {}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// App.js</span>

<span class="hljs-keyword">import</span> {connect} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-redux&apos;</span>;

@connect()
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {}
}</code></pre><h2 id="articleHeader2">&#x5F00;&#x59CB;&#x5199;</h2><p>&#x4ECE;<code>connect()()</code>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;connect&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x4E2A;react&#x7EC4;&#x4EF6;&#x3002;&#x8FD9;&#x4E48;&#x806A;&#x660E;&#xFF0C;&#x597D;&#x4F69;&#x670D;&#x81EA;&#x5DF1;&#x554A;&#x3002;</p><h3 id="articleHeader3">&#x96CF;&#x5F62;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// myHoc.js
import React from &apos;react&apos;;

export const myHoc = () =&gt; {
  return (Wrapped) =&gt; {
    class Hoc extends React.Component {
      render() {
        return &lt;Wrapped {...this.props}&gt;;
      }
    }
    
    return Hoc;
  };
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// myHoc.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> myHoc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">Wrapped</span>) =&gt;</span> {
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hoc</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
      render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Wrapped</span> {<span class="hljs-attr">...this.props</span>}&gt;</span>;
      }
    }
    
    return Hoc;
  };
};</span></code></pre><p>&#x662F;&#x7684;&#xFF0C;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x7684;&#x96CF;&#x5F62;&#xFF0C;&#x5C31;&#x662F;&#x51FD;&#x6570;&#x91CC;&#x9690;&#x85CF;&#x4E86;&#x4E00;&#x4E2A;react&#x7EC4;&#x4EF6;&#xFF0C;&#x800C;&#x53C2;&#x6570;<code>Wrapped</code>&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x88AB;&#x88C5;&#x9970;&#x7684;&#x7EC4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.js

@myHoc()
export class App extends React.Component {
  render() {}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// App.js</span>

@myHoc()
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {}
}</code></pre><p>&#x6069;&#x6069;&#xFF0C;&#x8868;&#x73B0;&#x5F62;&#x5F0F;&#x548C;redux&#x7684;connect&#x4E00;&#x6A21;&#x4E00;&#x6837;&#x3002;<br>&#x6240;&#x4EE5;&#x7528;&#x4E86;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x540E;&#xFF0C;export&#x51FA;&#x53BB;&#x7684;&#x4E0D;&#x518D;&#x662F;&#x4F60;&#x81EA;&#x5DF1;&#x5199;&#x7684;App(Class)&#xFF0C;&#x800C;&#x662F;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x9AD8;&#x9636;&#x3002;</p><h3 id="articleHeader4">&#x589E;&#x52A0;props&#x5C5E;&#x6027;</h3><p>&#x597D;&#x7684;&#x5566;&#xFF0C;&#x73B0;&#x5728;&#x7528;myHoc&#x7ED9;App&#x7EC4;&#x4EF6;&#x52A0;&#x70B9;&#x6599;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// myHoc.js
export const myHoc = () =&gt; {
  return (Wrapped) =&gt; {
    class Hoc extends React.Component {
      render() {
        return &lt;Wrapped {...this.props} whoAmI=&quot;&#x539F;&#x7F6A;&quot;&gt;;
      }
    }
    
    return Hoc;
  };
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// myHoc.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> myHoc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">Wrapped</span>) =&gt;</span> {
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hoc</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
      render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Wrapped</span> {<span class="hljs-attr">...this.props</span>} <span class="hljs-attr">whoAmI</span>=<span class="hljs-string">&quot;&#x539F;&#x7F6A;&quot;</span>&gt;</span>;
      }
    }
    
    return Hoc;
  };
};
</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.js

@myHoc()
export class App extends React.Component {
  render() {
    return &lt;div&gt;{this.props.whoAmI}&lt;/div&gt;;
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// App.js</span>

@myHoc()
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.whoAmI}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
}
</code></pre><p>&#x653E;&#x5FC3;&#xFF0C;&#x6B64;&#x523B;&#x6D4F;&#x89C8;&#x5668;&#x91CC;&#x5DF2;&#x7ECF;&#x628A;&#x6211;&#x7684;&#x540D;&#x5B57; <strong>&#x539F;&#x7F6A;</strong> &#x6253;&#x5370;&#x51FA;&#x6765;&#x4E86;&#x3002;</p><h3 id="articleHeader5">&#x591A;&#x4E2A;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;</h3><p>&#x662F;&#x7684;&#xFF0C;&#x5199;&#x5B8C;&#x4E00;&#x4E2A;hoc&#x4E4B;&#x540E;&#xFF0C;&#x4F60;&#x5C31;&#x4F1A;&#x6709;&#x5199;&#x7B2C;&#x4E8C;&#x4E2A;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x90A3;&#x5C31;&#x4E00;&#x8D77;&#x7528;&#x5462;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.js

@myHoc()
@yourHoc()
@hisHoc()
@herHoc()
export class App extends React.Component {
  render() {
    return &lt;div&gt;{this.props.whoAmI}&lt;/div&gt;;
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// App.js</span>

@myHoc()
@yourHoc()
@hisHoc()
@herHoc()
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.whoAmI}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
}
</code></pre><p>&#x8FD9;&#x5C31;&#x662F;&#x7B14;&#x8005;&#x4E3A;&#x5565;&#x8981;&#x7528;&#x88C5;&#x9970;&#x5668;&#x7684;&#x539F;&#x56E0;&#xFF0C;&#x7B80;&#x6D01;&#xFF0C;&#x770B;&#x8D77;&#x6765;&#x8212;&#x670D;&#xFF0C;&#x5199;&#x8D77;&#x6765;&#x5FEB;&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;&#x53E6;&#x4E00;&#x79CD;&#x5199;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends React.Component {
  render() {}
}

export default myHoc()(yourHoc()(hisHoc()(herHoc()(App))));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {}
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> myHoc()(yourHoc()(hisHoc()(herHoc()(App))));</code></pre><p>&#x81EA;&#x5DF1;&#x4F53;&#x4F1A;&#xFF0C;&#x683C;&#x5F0F;&#x5316;&#x4E00;&#x4E0B;&#x5427;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends React.Component {
  render() {}
}

let hoc;
hoc = herHoc()(App);
hoc = hisHoc()(hoc);
hoc = yourHoc()(hoc);
hoc = myHoc()(hoc);

export default hoc;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {}
}

<span class="hljs-keyword">let</span> hoc;
hoc = herHoc()(App);
hoc = hisHoc()(hoc);
hoc = yourHoc()(hoc);
hoc = myHoc()(hoc);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> hoc;</code></pre><p>&#x5199;&#x5F97;&#x7D2F;&#x4E0D;&#xFF1F;&#x6765;&#xFF0C;&#x7ED9;&#x4F60;&#x6761;&#x6BDB;&#x5DFE;&#x64E6;&#x64E6;&#x6C57;</p><h3 id="articleHeader6">&#x5E26;&#x53C2;&#x6570;</h3><p>&#x5BF9;&#x4E86;&#xFF0C;hoc&#x53EF;&#x4EE5;&#x63A5;&#x6536;&#x53C2;&#x6570;&#xFF0C;&#x6BD4;&#x5982;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.js

@myHoc(&apos;&#x539F;&#x7F6A;2&#x53F7;&apos;)
export class App extends React.Component {
  render() {
    return &lt;div&gt;{this.props.whoAmI}&lt;/div&gt;;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// App.js</span>

@myHoc(<span class="hljs-string">&apos;&#x539F;&#x7F6A;2&#x53F7;&apos;</span>)
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.whoAmI}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
}</code></pre><p>&#x90A3;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x600E;&#x4E48;&#x63A5;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// myHoc.js

export const myHoc = (name) =&gt; {
  return (Wrapped) =&gt; {
    class Hoc extends React.Component {
      render() {
        return &lt;Wrapped {...this.props} whoAmI={name}&gt;;
      }
    }
    
    return Hoc;
  };
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// myHoc.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> myHoc = <span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">Wrapped</span>) =&gt;</span> {
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hoc</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
      render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Wrapped</span> {<span class="hljs-attr">...this.props</span>} <span class="hljs-attr">whoAmI</span>=<span class="hljs-string">{name}</span>&gt;</span>;
      }
    }
    
    return Hoc;
  };
};</span></code></pre><p>&#x6211;&#x628A;hoc&#x63A5;&#x6536;&#x5230;&#x7684;&#x53C2;&#x6570;&#x53C8;&#x8FD4;&#x8FD8;&#x7ED9;&#x4E86;App&#x7EC4;&#x4EF6;&#xFF0C;&#x90A3;&#x73B0;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x8F93;&#x51FA;&#x7684;&#x5C31;&#x662F;&#xFF1A;<strong>&#x539F;&#x7F6A;2&#x53F7;</strong>&#x3002;</p><h3 id="articleHeader7">&#x4E0D;&#x5E26;&#x53C2;&#x6570;</h3><p>&#x73B0;&#x5728;&#xFF0C;&#x4F60;&#x53EF;&#x80FD;&#x6709;&#x4E00;&#x4E2A;&#x5927;&#x80C6;&#x7684;&#x63D2;&#x6CD5;..&#x54E6;&#x4E0D;&#xFF0C;&#x60F3;&#x6CD5;&#xFF0C;&#x5C31;&#x662F;@myHoc&#x540E;&#x9762;&#x53EF;&#x4EE5;&#x4E0D;&#x52A0;&#x62EC;&#x53F7;&#x5417;&#xFF1F;&#x662F;&#x54E6;&#xFF0C;&#x770B;&#x524D;&#x9762;&#x51E0;&#x4E2A;&#x6848;&#x4F8B;&#xFF0C;&#x90FD;&#x662F;<code>@myHoc()</code>&#x3002;&#x597D;&#x7684;&#xFF0C;&#x770B;&#x6211;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// myHoc.js

export const myHoc = (Wrapped) =&gt; {
  class Hoc extends React.Component {
    render() {
      return &lt;Wrapped {...this.props} whoAmI=&quot;&#x539F;&#x7F6A;&quot;&gt;;
    }
  }
    
  return Hoc;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// myHoc.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> myHoc = <span class="hljs-function">(<span class="hljs-params">Wrapped</span>) =&gt;</span> {
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hoc</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Wrapped</span> {<span class="hljs-attr">...this.props</span>} <span class="hljs-attr">whoAmI</span>=<span class="hljs-string">&quot;&#x539F;&#x7F6A;&quot;</span>&gt;</span>;
    }
  }
    
  return Hoc;
};</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.js

@myHoc
export class App extends React.Component {
  render() {
    return &lt;div&gt;{this.props.whoAmI}&lt;/div&gt;;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// App.js</span>

@myHoc
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.props.whoAmI}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  }
}</code></pre><p>&#x7EC6;&#x5FC3;&#x7684;&#x770B;&#x5B98;&#x770B;&#x4E00;&#x4E0B;<strong>myHoc.js</strong>&#x548C;&#x5E26;&#x53C2;&#x6570;&#x7684;&#x65F6;&#x5019;&#x6709;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#x3002;&#x662F;&#x7684;&#xFF0C;&#x5C11;&#x4E86;&#x4E00;&#x5C42;&#x56DE;&#x8C03;&#x3002;&#x5982;&#x679C;&#x4F60;&#x7684;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x4E0D;&#x9700;&#x8981;&#x5E26;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x6837;&#x5199;&#x4E5F;&#x662F;&#x5F88;ok&#x7684;&#x3002;</p><h3 id="articleHeader8">&#x64CD;&#x63A7;&#x539F;&#x7EC4;&#x4EF6;</h3><p>&#x4F60;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x62FF;&#x88AB;&#x88C5;&#x9970;&#x7684;&#x7EC4;&#x4EF6;&#x7684;state&#x6570;&#x636E;&#x6216;&#x8005;&#x6267;&#x884C;&#x5B83;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x90A3;&#x4E48;&#x9700;&#x8981;&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// myHoc.js

import React from &apos;react&apos;;

export const myHoc = () =&gt; {
  return (Wrapped) =&gt; {
    class Hoc extends React.Component {
      appRef = null;
      
      componentDidMount() {
        // &#x53EF;&#x4EE5;&#x5BF9;&#x88AB;myHoc&#x88C5;&#x9970;&#x7684;&#x7EC4;&#x4EF6;&#x505A;&#x7F9E;&#x7F9E;&#x7684;&#x4E8B;&#x60C5;&#x4E86;&#xFF0C;:)
        console.log(this.appRef);
      }
    
      render() {
        return &lt;Wrapped {...this.props} ref={(app) =&gt; {this.appRef = app"}}" &gt;;
      }
    }
    
    return Hoc;
  };
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// myHoc.js</span>

<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> myHoc = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">Wrapped</span>) =&gt;</span> {
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hoc</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
      appRef = <span class="hljs-literal">null</span>;
      
      componentDidMount() {
        <span class="hljs-comment">// &#x53EF;&#x4EE5;&#x5BF9;&#x88AB;myHoc&#x88C5;&#x9970;&#x7684;&#x7EC4;&#x4EF6;&#x505A;&#x7F9E;&#x7F9E;&#x7684;&#x4E8B;&#x60C5;&#x4E86;&#xFF0C;:)</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.appRef);
      }
    
      render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Wrapped</span> {<span class="hljs-attr">...this.props</span>} <span class="hljs-attr">ref</span>=<span class="hljs-string">{(app)</span> =&gt;</span> {this.appRef = app"}}" &gt;;
      }
    }
    
    return Hoc;
  };
};</span></code></pre><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong> &#x5728;&#x591A;&#x4E2A;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x88C5;&#x9970;&#x540C;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6B64;&#x6CD5;&#x5E76;&#x4E0D;&#x594F;&#x6548;&#x3002;&#x4F60;&#x62FF;&#x5230;&#x7684;ref&#x662F;&#x4E0A;&#x4E00;&#x4E2A;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x7684;&#x51FD;&#x6570;&#x4E2D;&#x4E34;&#x65F6;&#x751F;&#x6210;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x800C;&#x4E14;&#x5728;&#x5927;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4F60;&#x5E76;&#x4E0D;&#x77E5;&#x9053;&#x67D0;&#x4E2A;&#x7EC4;&#x4EF6;&#x4F1A;&#x88AB;&#x591A;&#x5C11;&#x4E2A;&#x9AD8;&#x9636;&#x88C5;&#x9970;&#xFF01;</p><h2 id="articleHeader9">&#x603B;&#x7ED3;</h2><p>&#x5F53;&#x9879;&#x76EE;&#x4E2D;&#x591A;&#x5904;&#x7528;&#x5230;&#x67D0;&#x4E2A;&#x903B;&#x8F91;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x903B;&#x8F91;&#x4E0D;&#x80FD;&#x653E;&#x5230;util&#x91CC;&#x7684;&#x65F6;&#x5019;&#xFF0C;HOC&#x9002;&#x5408;&#x4F60;&#x3002;&#x4E00;&#x4E2A;HOC&#x6700;&#x597D;&#x53EA;&#x505A;&#x4E00;&#x4EF6;&#x4E8B;&#xFF0C;&#x8FD9;&#x6837;&#x7EF4;&#x62A4;&#x65B9;&#x4FBF;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
动手写个React高阶组件

## 原文链接
[https://segmentfault.com/a/1190000015361704](https://segmentfault.com/a/1190000015361704)

