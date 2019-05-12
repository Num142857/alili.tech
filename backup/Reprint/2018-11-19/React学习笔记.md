---
title: 'React学习笔记' 
date: 2018-11-19 2:32:04
hidden: true
slug: e97jrxzggvr
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x4E00;&#x3001;React&#x521D;&#x63A2;</h3><h5>es6&#x5199;&#x6CD5; <a href="https://codepen.io/xiaobinwu/pen/mKagVy" rel="nofollow noreferrer" target="_blank">code</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/mKagVy" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import React from &apos;react&apos;;
  import ReactDOM from &apos;react-dom&apos;;
  import PropTypes from &apos;prop-types&apos;;
  
  class App extends React.Component { 
      state = {
          title: &apos;&#x73AF;&#x7403;&#x5927;&#x524D;&#x7AEF;&apos;
      }
      render() {
          const { title } = this.state;
          const { name } = this.props
          return (
            &lt;div&gt;
                &lt;h2&gt;{title}&lt;/h2&gt;
                &lt;p&gt; Hello {name}! &lt;/p&gt;
            &lt;/div&gt;
          )
      }
  }
  App.propTypes = {
      name: PropTypes.string
  }
  App.defaultProps = {
      name: &apos;&#x5E05;&#x6C14;&#x5C0F;&#x4F19;&#x5B50;&apos;
  }
  ReactDOM.render(&lt;App name=&quot;24&#x5C0F;&#x6E05;&#x65B0;&quot; /&gt;, document.getElementById(&apos;app&apos;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
  <span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>;
  <span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;prop-types&apos;</span>;
  
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{ 
      state = {
          <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x73AF;&#x7403;&#x5927;&#x524D;&#x7AEF;&apos;</span>
      }
      render() {
          <span class="hljs-keyword">const</span> { title } = <span class="hljs-keyword">this</span>.state;
          <span class="hljs-keyword">const</span> { name } = <span class="hljs-keyword">this</span>.props
          <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> Hello {name}! <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
          )
      }
  }
  App.propTypes = {
      <span class="hljs-attr">name</span>: PropTypes.string
  }
  App.defaultProps = {
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x5E05;&#x6C14;&#x5C0F;&#x4F19;&#x5B50;&apos;</span>
  }
  ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;24&#x5C0F;&#x6E05;&#x65B0;&quot;</span> /&gt;</span>, document.getElementById(&apos;app&apos;));</span></code></pre><h5>es5&#x5199;&#x6CD5;&#xFF08;&#x9057;&#x61BE;&#x7684;&#x662F;&#x73B0;&#x5728;&#x6700;&#x65B0;&#x7248;&#x672C;&#x7684;react&#xFF0C;&#x5DF2;&#x7ECF;&#x4E0D;&#x518D;&#x80FD;&#x4F7F;&#x7528;createClass&#x53BB;&#x521B;&#x5EFA;react&#x7EC4;&#x4EF6;&#x4E86;&#xFF0C;&#x7531;&#x4E8E;react&#x5C06;createClass&#x5265;&#x79BB;&#x51FA;&#x53BB;&#xFF0C;&#x51CF;&#x5C11;react&#x7684;&#x4F53;&#x79EF;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;create-react-class &#x6A21;&#x5757;&#x6765;&#x521B;&#x5EFA; <a href="https://codepen.io/xiaobinwu/pen/gKZygr" rel="nofollow noreferrer" target="_blank">code</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/gKZygr" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>&#xFF09;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var App = React.createClass({
    getDefaultProps: function() {
      return {
        name: &apos;&#x5E05;&#x6C14;&#x5C0F;&#x4F19;&#x5B50;&apos;  
      }  
    },
    getInitialState: function() {
        return {
            title: &apos;&#x73AF;&#x7403;&#x5927;&#x524D;&#x7AEF;&apos;
        }
    },
    render: function() {
      return (
        &lt;div&gt;
            &lt;h2&gt;{this.state.title}&lt;/h2&gt;
            &lt;p&gt; Hello {this.props.name}! &lt;/p&gt;
        &lt;/div&gt;
      )
    }
})
React.render(&lt;App name=&quot;24&#x5C0F;&#x6E05;&#x65B0;&quot; /&gt;, document.getElementById(&apos;app&apos;));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> App = React.createClass({
    <span class="hljs-attr">getDefaultProps</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&#x5E05;&#x6C14;&#x5C0F;&#x4F19;&#x5B50;&apos;</span>  
      }  
    },
    <span class="hljs-attr">getInitialState</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x73AF;&#x7403;&#x5927;&#x524D;&#x7AEF;&apos;</span>
        }
    },
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{this.state.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> Hello {this.props.name}! <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      )
    }
})
React.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;24&#x5C0F;&#x6E05;&#x65B0;&quot;</span> /&gt;</span>, document.getElementById(&apos;app&apos;));</span></code></pre><p>&#x6838;&#x5FC3;&#x601D;&#x60F3;&#xFF1A;&#x5C01;&#x88C5;&#x7EC4;&#x4EF6;&#xFF0C;&#x5404;&#x4E2A;&#x7EC4;&#x4EF6;&#x7EF4;&#x62A4;&#x81EA;&#x5DF1;&#x7684;&#x72B6;&#x6001;(state, prop)&#x548C;UI,&#x5F53;&#x72B6;&#x6001;&#x53D8;&#x66F4;&#xFF0C;&#x81EA;&#x52A8;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#xFF0C;&#x6570;&#x636E;&#x6D41;&#x5411;&#x662F;&#x5355;&#x5411;&#x7684;&#x3002;</p><p>&#x9700;&#x8981;&#x660E;&#x767D;&#x7684;&#x51E0;&#x4E2A;&#x57FA;&#x7840;&#x6982;&#x5FF5;&#xFF1A;</p><p>1&#x3001;&#x4EC0;&#x4E48;&#x662F;JSX?</p><p>2&#x3001;&#x5982;&#x4F55;&#x4FEE;&#x6539;&#x7EC4;&#x4EF6;state&#xFF0C;&#x4ECE;&#x800C;&#x4FEE;&#x6539;&#x7EC4;&#x4EF6;UI?</p><p>3&#x3001;&#x4E8B;&#x4EF6;&#x5904;&#x7406;</p><p>&#x5BF9;&#x4E8E;&#x4E0A;&#x8FF0;&#x90A3;&#x4E9B;&#x65E2;&#x4E0D;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x4E5F;&#x4E0D;&#x662F; HTML&#x7684;&#x7684;&#x6807;&#x7B7E;&#x8BED;&#x6CD5;&#xFF0C;&#x88AB;&#x79F0;&#x4E3A;JSX&#xFF0C;&#x662F;&#x4E00;&#x79CD; JavaScript &#x7684;&#x8BED;&#x6CD5;&#x6269;&#x5C55;&#xFF0C;&#x7528;&#x6765;&#x63CF;&#x8FF0;&#x7528;&#x6237;&#x754C;&#x9762;&#x3002;</p><p>&#x5E38;&#x7528;&#x7684;&#x662F;&#x5728;JSX&#x4E2D;&#x4F7F;&#x7528;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x4F8B;&#x5982; 2 + 2&#xFF0C; user.firstName&#xFF0C; &#x4EE5;&#x53CA; formatName(user)&#xFF0C;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#xFF08;&#x4E09;&#x76EE;&#x8FD0;&#x7B97;&#x7B26;&#x3001;&amp;&amp;&#xFF09;, &#x6570;&#x7EC4;Map&#x51FD;&#x6570;&#x904D;&#x5386;&#x83B7;&#x53D6;React&#x5143;&#x7D20; &#x90FD;&#x662F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7684;&#x3002;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    formatName(user) {
        return `${user.firstName}-${user.name}`;
    }
    const user = {
        firstName: &apos;wu&apos;,
        name: &apos;shaobin&apos;
    }
    const show = true; //&#x6211;&#x53EF;&#x4EE5;&#x662F;this.state&#x5C5E;&#x6027;&#x54E6;&#xFF01;&#xFF01;&#xFF01;
    const arr = [&apos;xiaobin&apos;, &apos;kaizi&apos;, &apos;liujun&apos;];
    const element = (
      &lt;div&gt;
        &lt;h1&gt;Hello, {formatName(user)}!&lt;/h1&gt;
        &lt;h1&gt;Hello, {user.name}!&lt;/h1&gt;
        &lt;h1&gt;Hello, { 1 + 1 }!&lt;/h1&gt;
        &lt;h1&gt;Hello, { show ? &apos;I am show&apos; : null }&lt;/h1&gt;
        &lt;h1&gt;Hello, { arr.length &gt; 0 &amp;&amp; &lt;span&gt;&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x5927;&#x4E8E;0&lt;/span&gt; }&lt;/h1&gt;
        {
            arr.map((item, index) =&gt; {
                return &lt;span key={item}&gt;item&lt;/span&gt;    
            })
        }
        //&#x8BB0;&#x4F4F;&#x6570;&#x7EC4;Map&#x51FD;&#x6570;&#x904D;&#x5386;&#x83B7;&#x53D6;React&#x5143;&#x7D20;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x8BB0;&#x5F97;&#x5FC5;&#x987B;&#x2795;keys&#x5C5E;&#x6027;
        // &#x4E3A;&#x5565;&#x5440;&#xFF1F;
        //Keys&#x53EF;&#x4EE5;&#x5728;DOM&#x4E2D;&#x7684;&#x67D0;&#x4E9B;&#x5143;&#x7D20;&#x88AB;&#x589E;&#x52A0;&#x6216;&#x5220;&#x9664;&#x7684;&#x65F6;&#x5019;&#x5E2E;&#x52A9;React&#x8BC6;&#x522B;&#x54EA;&#x4E9B;&#x5143;&#x7D20;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#x3002;&#x56E0;&#x6B64;&#x4F60;&#x5E94;&#x5F53;&#x7ED9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x8D4B;&#x4E88;&#x4E00;&#x4E2A;&#x786E;&#x5B9A;&#x7684;&#x6807;&#x8BC6;&#x3002;&#x6CA1;&#x6709;&#x552F;&#x4E00;&#x503C;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;index&#xFF0C;&#x4F46;&#x662F;&#x5B98;&#x65B9;&#x4E0D;&#x5EFA;&#x8BAE;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x6E32;&#x67D3;&#x53D8;&#x6162;&#x3002;
      &lt;/div&gt;
    );
    ReactDOM.render(
      element,
      document.getElementById(&apos;root&apos;)
    );" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    formatName(user) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">`<span class="hljs-subst">${user.firstName}</span>-<span class="hljs-subst">${user.name}</span>`</span>;
    }
    <span class="hljs-keyword">const</span> user = {
        <span class="hljs-attr">firstName</span>: <span class="hljs-string">&apos;wu&apos;</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;shaobin&apos;</span>
    }
    <span class="hljs-keyword">const</span> show = <span class="hljs-literal">true</span>; <span class="hljs-comment">//&#x6211;&#x53EF;&#x4EE5;&#x662F;this.state&#x5C5E;&#x6027;&#x54E6;&#xFF01;&#xFF01;&#xFF01;</span>
    <span class="hljs-keyword">const</span> arr = [<span class="hljs-string">&apos;xiaobin&apos;</span>, <span class="hljs-string">&apos;kaizi&apos;</span>, <span class="hljs-string">&apos;liujun&apos;</span>];
    <span class="hljs-keyword">const</span> element = (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {formatName(user)}!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, { 1 + 1 }!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, { show ? &apos;I am show&apos; : null }<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, { arr.length &gt; 0 &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&#x6570;&#x7EC4;&#x957F;&#x5EA6;&#x5927;&#x4E8E;0<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> }<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        {
            arr.map((item, index) =&gt; {
                return <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item}</span>&gt;</span>item<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>    
            })
        }
        //&#x8BB0;&#x4F4F;&#x6570;&#x7EC4;Map&#x51FD;&#x6570;&#x904D;&#x5386;&#x83B7;&#x53D6;React&#x5143;&#x7D20;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x8BB0;&#x5F97;&#x5FC5;&#x987B;&#x2795;keys&#x5C5E;&#x6027;
        // &#x4E3A;&#x5565;&#x5440;&#xFF1F;
        //Keys&#x53EF;&#x4EE5;&#x5728;DOM&#x4E2D;&#x7684;&#x67D0;&#x4E9B;&#x5143;&#x7D20;&#x88AB;&#x589E;&#x52A0;&#x6216;&#x5220;&#x9664;&#x7684;&#x65F6;&#x5019;&#x5E2E;&#x52A9;React&#x8BC6;&#x522B;&#x54EA;&#x4E9B;&#x5143;&#x7D20;&#x53D1;&#x751F;&#x4E86;&#x53D8;&#x5316;&#x3002;&#x56E0;&#x6B64;&#x4F60;&#x5E94;&#x5F53;&#x7ED9;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x8D4B;&#x4E88;&#x4E00;&#x4E2A;&#x786E;&#x5B9A;&#x7684;&#x6807;&#x8BC6;&#x3002;&#x6CA1;&#x6709;&#x552F;&#x4E00;&#x503C;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;index&#xFF0C;&#x4F46;&#x662F;&#x5B98;&#x65B9;&#x4E0D;&#x5EFA;&#x8BAE;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x6E32;&#x67D3;&#x53D8;&#x6162;&#x3002;
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
    ReactDOM.render(
      element,
      <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>)
    );</code></pre><p>&#x5207;&#x8BB0;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;render&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684;JSX&#x7ED3;&#x6784;&#x90FD;&#x9700;&#x8981;&#x6839;&#x5143;&#x7D20;&#x53BB;&#x5305;&#x88F9;&#x7740;&#xFF0C;&#x5F53;&#x7136;&#x4E5F;&#x6709;&#x4F8B;&#x5916;&#xFF0C;&#x5982;<a href="https://codepen.io/xiaobinwu/pen/mKvRVG" rel="nofollow noreferrer" target="_blank">React.Fragment</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/mKvRVG" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><p>&#x5BF9;&#x4E8E;JSX,react&#x6700;&#x7EC8;&#x7ECF;babel&#x7684;&#x8F6C;&#x6362;&#x4F1A;&#x8C03;&#x7528;React.createElement&#x76F8;&#x5E94;api&#x8F6C;&#x6362;&#x6210;react&#x80FD;&#x8BC6;&#x522B;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5982;&#x4E0A;&#x8FF0;&#x4F8B;&#x5B50;&#x8F6C;&#x6362;&#x540E;&#x5F97;&#x5230;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement(
    &apos;div&apos;,
    null,
    React.createElement(
        &apos;h2&apos;, //&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;html&#x6807;&#x7B7E;&#x540D;&#x79F0;&#x5B57;&#x7B26;&#x4E32;,&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A; React component &#x7C7B;&#x578B;
        null,
        title
    ),
    React.createElement(
        &apos;p&apos;,
        null,
        &apos; Hello &apos;,
        name,
        &apos;! &apos;
    )
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">React.createElement(
    <span class="hljs-string">&apos;div&apos;</span>,
    <span class="hljs-literal">null</span>,
    React.createElement(
        <span class="hljs-string">&apos;h2&apos;</span>, <span class="hljs-comment">//&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;html&#x6807;&#x7B7E;&#x540D;&#x79F0;&#x5B57;&#x7B26;&#x4E32;,&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A; React component &#x7C7B;&#x578B;</span>
        <span class="hljs-literal">null</span>,
        title
    ),
    React.createElement(
        <span class="hljs-string">&apos;p&apos;</span>,
        <span class="hljs-literal">null</span>,
        <span class="hljs-string">&apos; Hello &apos;</span>,
        name,
        <span class="hljs-string">&apos;! &apos;</span>
    )
);</code></pre><p><a href="https://babeljs.io/repl" rel="nofollow noreferrer" target="_blank">babel&#x67E5;&#x770B;es6-&gt;es5&#x7684;&#x7ED3;&#x679C;</a></p><p>&#x65E2;&#x7136;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E3A;&#x7EC4;&#x4EF6;&#x521D;&#x59CB;&#x5316;&#x72B6;&#x6001;&#xFF0C;&#x4E5F;&#x5FC5;&#x987B;&#x8981;&#x80FD;&#x591F;&#x53BB;&#x6539;&#x53D8;&#x5B83;&#xFF0C;&#x4EE5;&#x8FBE;&#x5230;&#x6539;&#x53D8;&#x89C6;&#x56FE;&#x3002;<br>&#x5F53;&#x7136;<code>this.state.xxx = xxx</code>&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x7684;&#x52A8;&#x4F5C;&#xFF0C;&#x800C;&#x662F;&#x4F7F;&#x7528;<code>this.setState({ xxx: xxx })</code>&#x65B9;&#x6CD5;&#x6765;&#x4FEE;&#x6539;&#x72B6;&#x6001;&#xFF0C;&#x540C;&#x65F6;&#x591A;&#x4E2A;setState() &#x8C03;&#x7528;&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;&#x8C03;&#x7528;&#x80FD;&#x63D0;&#x9AD8;&#x6027;&#x80FD;&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#xFF0C;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x4E00;&#x70B9;&#x5C31;&#x662F;this&#x7684;&#x7ED1;&#x5B9A;&#xFF0C;&#x5176;&#x4ED6;&#x8DDF;&#x666E;&#x901A;Dom&#x7ED1;&#x5B9A;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x4E00;&#x6837;&#xFF0C;this&#x7684;&#x7ED1;&#x5B9A;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;</p><ol><li>&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x4F7F;&#x7528;bind&#x7ED1;&#x5B9A;this</li><li>&#x5728;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x4F7F;&#x7528;bind&#x7ED1;&#x5B9A;this</li><li>&#x5728;&#x8C03;&#x7528;&#x7684;&#x65F6;&#x5019;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7ED1;&#x5B9A;this</li><li>&#x4F7F;&#x7528;&#x5C5E;&#x6027;&#x521D;&#x59CB;&#x5316;&#x5668;&#x8BED;&#x6CD5;&#x7ED1;&#x5B9A;this</li></ol><p><a href="https://codepen.io/xiaobinwu/pen/bKzYZd" rel="nofollow noreferrer" target="_blank">setState&#x4E0E;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x7684;&#x4F8B;&#x5B50;</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/bKzYZd" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><p>&#x540C;&#x65F6;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;React&#x5408;&#x6210;&#x4E8B;&#x4EF6;&#xFF08;onClick={}&#xFF09;&#x548C;&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#xFF08;document.addEventListener&#xFF09;&#x7684;&#x963B;&#x6B62;&#x5192;&#x6CE1;&#x5B58;&#x5728;&#x5DEE;&#x5F02;&#xFF0C;&#x9700;&#x8981;&#x660E;&#x767D;&#x7684;&#x662F;&#xFF0C;&#x6240;&#x6709;&#x5408;&#x6210;&#x4E8B;&#x4EF6;&#x90FD;&#x662F;&#x7ED1;&#x5B9A;&#x5728;document&#x4E0A;&#x7684;&#xFF08;&#x4EE3;&#x7406;&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x6267;&#x884C;&#x5408;&#x6210;&#x4E8B;&#x4EF6;&#x4E2D;&#x7684;event.stopPropagation()&#xFF0C;&#x5B9E;&#x9645;&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#x8FD8;&#x662F;&#x4F1A;&#x5192;&#x6CE1;&#x5230;document&#x4E0A;&#xFF0C;&#x540C;&#x65F6;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;setState &#x53EA;&#x5728;&#x5408;&#x6210;&#x4E8B;&#x4EF6;&#x548C;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#x4E2D;&#x662F; &quot;&#x5F02;&#x6B65;&quot; &#x7684;&#xFF0C;&#x5728;&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#x548C; setTimeout &#x4E2D;&#x90FD;&#x662F;&#x540C;&#x6B65;&#x7684;&#x3002;<br><a href="https://codepen.io/xiaobinwu/pen/gBRZRQ" rel="nofollow noreferrer" target="_blank">&#x5408;&#x6210;&#x4E8B;&#x4EF6;&#x4E0E;&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#x5217;&#x5B50;</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/gBRZRQ" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button><br>&#x53C2;&#x8003;&#x6587;&#x7AE0;&#xFF1A;<br><a href="https://juejin.im/post/5bb1812a6fb9a05d082a3361" rel="nofollow noreferrer" target="_blank">&#x4ECE; Dropdown &#x7684; React &#x5B9E;&#x73B0;&#x4E2D;&#x5B66;&#x4E60;&#x5230;&#x7684;</a><br><a href="https://juejin.im/post/59db6e7af265da431f4a02ef" rel="nofollow noreferrer" target="_blank">React&#x5408;&#x6210;&#x4E8B;&#x4EF6;&#x548C;DOM&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#x6DF7;&#x7528;&#x987B;&#x77E5;</a></p><h3 id="articleHeader1">&#x4E8C;&#x3001;React&#x8FDB;&#x9636;</h3><p>1&#x3001;&#x6709;&#x54EA;&#x4E9B;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF1F;</p><p>2&#x3001;Ref&#x7684;&#x5F15;&#x7528;</p><p>3&#x3001;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x7684;&#x4F7F;&#x7528;</p><p><a href="http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/" rel="nofollow noreferrer" target="_blank">&#x751F;&#x547D;&#x5468;&#x671F;&#x56FE;&#x793A;(React16)&#xFF1A;</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015829760?w=1138&amp;h=680" src="https://static.alili.tech/img/remote/1460000015829760?w=1138&amp;h=680" alt="" title="" style="cursor:pointer;display:inline"></span></p><h4>Mounting/&#x6302;&#x8F7D;</h4><p>constructor()&#xA0; &#xA0;&#xA0;//React&#x7EC4;&#x4EF6;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x4E8E;super(props)&#xFF0C;&#x521D;&#x59CB;&#x5316;state&#xFF0C;bind&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7B49;</p><p>static getDerivedStateFromProps()</p><p>UNSAFE_componentWillMount()&#xA0; &#xA0;&#xA0;// &#x7EC4;&#x4EF6;&#x6302;&#x8F7D;&#x524D;(&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x5230;&#x9875;&#x9762;&#x524D;)</p><p>render()&#xA0; &#xA0;&#xA0;// &#x6E32;&#x67D3;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x505A;&#x5B9E;&#x9645;&#x7684;&#x6E32;&#x67D3;&#x52A8;&#x4F5C;&#xFF0C;&#x5B83;&#x53EA;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;JSX&#x63CF;&#x8FF0;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x751F;&#x6210;&#x865A;&#x62DF;Dom&#x6811;&#xFF0C;&#x6267;&#x884C;patch&#xFF0C;&#x6700;&#x7EC8;&#x7531;React&#x6765;&#x64CD;&#x4F5C;&#x6E32;&#x67D3;&#x8FC7;&#x7A0B;</p><p>componentDidMount()&#xA0; //&#x7EC4;&#x4EF6;&#x6302;&#x8F7D;&#x540E;(&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x5230;&#x9875;&#x9762;&#x4E0A;)&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x8FD9;&#x4E2A;&#x94A9;&#x5B50;&#x6DFB;&#x52A0;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x4EE5;&#x53CA;&#x5B9A;&#x65F6;&#x5668;,&#x6216;&#x662F;socket&#x8FDE;&#x63A5;</p><h4>Updating/&#x66F4;&#x65B0;</h4><p>UNSAFE_componentWillReceiveProps() //&#xA0;&#x7EC4;&#x4EF6;&#x63A5;&#x6536;&#x5230;&#x5C5E;&#x6027;&#x65F6;&#x89E6;&#x53D1;</p><p>static getDerivedStateFromProps()</p><p>shouldComponentUpdate(prevProps, prevState)&#xA0; //&#xA0;&#x5F53;&#x7EC4;&#x4EF6;&#x63A5;&#x6536;&#x5230;&#x65B0;&#x5C5E;&#x6027;&#xFF0C;&#x6216;&#x8005;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x65F6;&#x89E6;&#x53D1;&#x3002;&#x7EC4;&#x4EF6;&#x9996;&#x6B21;&#x6E32;&#x67D3;&#x65F6;&#x5E76;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#xFF0C;&#x6B64;&#x94A9;&#x5B50;&#x53EF;&#x505A;&#x6027;&#x80FD;&#x4F18;&#x5316;</p><p>UNSAFE_componentWillUpdate()&#xA0; //&#x7EC4;&#x4EF6;&#x5373;&#x5C06;&#x88AB;&#x66F4;&#x65B0;&#x65F6;&#x89E6;&#x53D1;</p><p>render()&#xA0;// &#x6E32;&#x67D3;&#x51FD;&#x6570;&#xFF0C;&#x4E0D;&#x505A;&#x5B9E;&#x9645;&#x7684;&#x6E32;&#x67D3;&#x52A8;&#x4F5C;&#xFF0C;&#x5B83;&#x53EA;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;JSX&#x63CF;&#x8FF0;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x751F;&#x6210;&#x865A;&#x62DF;&#x65B0;Dom&#x6811;&#xFF0C;&#x4E0E;&#x65E7;&#x6811;&#x8FDB;&#x884C;diff&#xFF0C;&#xA0;&#x6267;&#x884C;patch</p><p>getSnapshotBeforeUpdate()</p><p>componentDidUpdate(prevProps, prevState, snapshot)&#xA0;//&#xA0;&#x7EC4;&#x4EF6;&#x88AB;&#x66F4;&#x65B0;&#x5B8C;&#x6210;&#x540E;&#x89E6;&#x53D1;&#xFF0C;&#x751F;&#x547D;&#x5468;&#x671F;&#x4E2D;&#x7531;&#x4E8E;state&#x7684;&#x53D8;&#x5316;&#x89E6;&#x53D1;&#x8BF7;&#x6C42;&#xFF0C;&#x5728;componentDidUpdate&#x4E2D;&#x8FDB;&#x884C;</p><h4>Unmounting/&#x5378;&#x8F7D;</h4><p>componentWillUnmount()&#xA0; // &#x5378;&#x8F7D;&#x7EC4;&#x4EF6;&#xFF0C;&#x6CE8;&#x9500;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x6216;&#x662F;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;socket&#x5173;&#x95ED;</p><p>&#x8BE6;&#x7EC6;&#x770B;<a href="https://codepen.io/xiaobinwu/pen/Qxowzq" rel="nofollow noreferrer" target="_blank">&#x751F;&#x547D;&#x5468;&#x671F;&#x4F8B;&#x5B50;</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/Qxowzq" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h4><a href="https://juejin.im/post/5aca20c96fb9a028d700e1ce" rel="nofollow noreferrer" target="_blank">&#x8865;&#x5145;Tip</a>&#xFF1A;</h4><p><a href="https://doc.react-china.org/docs/react-component.html#getsnapshotbeforeupdate" rel="nofollow noreferrer" target="_blank">getSnapshotBeforeUpdate()</a>&#x4E0E;<a href="https://doc.react-china.org/docs/react-component.html#static-getderivedstatefromprops" rel="nofollow noreferrer" target="_blank">static getDerivedStateFromProps()</a>&#x4E24;&#x4E2A;&#x65B0;&#x589E;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x662F;&#x88AB;&#x7528;&#x6765;&#x4EE3;&#x66FF;&#xA0;UNSAFE_componentWillMount() &#xFF0C;UNSAFE_componentWillUpdate()&#xFF0C;&#xA0;UNSAFE_componentWillReceiveProps()&#x4E09;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x4E09;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x4ECD;&#x662F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x3002;&#x4E3A;&#x4EC0;&#x4E48;&#x52D2;&#xFF1F;React&#x4E3A;&#x4E86;1.7&#x7248;&#x672C;&#x5B9E;&#x73B0;Async Rendering&#x3002;</p><p>Refs &#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x7528;&#x4E8E;&#x8BBF;&#x95EE;&#x5728; render &#x65B9;&#x6CD5;&#x4E2D;&#x521B;&#x5EFA;&#x7684; DOM &#x8282;&#x70B9;&#x6216; React &#x5143;&#x7D20;&#xFF0C;&#x5B98;&#x65B9;&#x5EFA;&#x8BAE;&#x5C11;&#x7528;&#x3002;&#x83B7;&#x53D6;Ref&#x6709;&#x4E09;&#x79CD;&#x573A;&#x666F;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015829761?w=725&amp;h=394" src="https://static.alili.tech/img/remote/1460000015829761?w=725&amp;h=394" alt="" title="" style="cursor:pointer"></span><br>&#x83B7;&#x53D6;Ref&#x7684;&#x5E38;&#x7528;&#x65B9;&#x5F0F;&#xFF08;&#x901A;&#x8FC7;this.myRef.current&#x6765;&#x83B7;&#x53D6;Dom&#x8282;&#x70B9;&#x6216;&#x5B9E;&#x4F8B;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyComponent extends React.Component {
   constructor(props) {
     super(props);
     this.myRef = React.createRef(); // &#x8C03;&#x7528;React.createRef API
   }
   render() {
     return &lt;input ref={this.myRef} /&gt;;
   }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
   <span class="hljs-keyword">constructor</span>(props) {
     <span class="hljs-keyword">super</span>(props);
     <span class="hljs-keyword">this</span>.myRef = React.createRef(); <span class="hljs-comment">// &#x8C03;&#x7528;React.createRef API</span>
   }
   render() {
     <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{this.myRef}</span> /&gt;</span>;
   }
}</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return &lt;input ref={(ref) =&gt; { this.myRef = ref; "}}" /&gt;;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
  }
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{(ref)</span> =&gt;</span> { this.myRef = ref; "}}" /&gt;;
  }
}</span></code></pre><p><a href="https://codepen.io/xiaobinwu/pen/mKoLzy" rel="nofollow noreferrer" target="_blank">Ref&#x83B7;&#x53D6;Dom&#x5143;&#x7D20;&#x4F8B;&#x5B50;</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/mKoLzy" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>&#xFF0C;&#xA0;<a href="https://codepen.io/xiaobinwu/pen/eKXjxB" rel="nofollow noreferrer" target="_blank">Ref&#x83B7;&#x53D6;React&#x5143;&#x7D20;&#xFF08;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF09;&#x4F8B;&#x5B50;</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/eKXjxB" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button>&#x3002;</p><p>&#x8865;&#x5145;Tip&#xFF1A;&#xA0;</p><p>&#x5BF9;&#x4E8E;&#x7B2C;&#x4E09;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x83B7;&#x53D6;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;Dom&#x8282;&#x70B9;&#xFF0C;&#x5B98;&#x65B9;&#x6709;&#x63D0;&#x4F9B;Forwarding Refs&#xFF08;&#x8F6C;&#x53D1;Ref&#xFF09;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x6765;&#x83B7;&#x53D6;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;Dom&#x8282;&#x70B9;&#x7684;Ref&#xFF0C;&#x6B64;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;React&#x5143;&#x7D20;&#xFF0C;&#x5BF9;&#x5E94;&#x65B9;&#x6CD5;&#x4E3A;<br><code>React.forwardRef((props, ref) =&gt; { ... })</code></p><p><a href="https://codepen.io/xiaobinwu/pen/pKYOeR" rel="nofollow noreferrer" target="_blank">Ref&#x83B7;&#x53D6;&#x5B50;&#x7EC4;&#x4EF6;Dom&#x5143;&#x7D20;&#x6216;&#x662F;React&#x5143;&#x7D20;&#x7684;ref&#x4F8B;&#x5B50;</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/pKYOeR" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><p><a href="https://doc.react-china.org/docs/higher-order-components.html" rel="nofollow noreferrer" target="_blank">&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;</a>&#xFF08;HOC&#xFF09;&#x662F;react&#x4E2D;&#x5BF9;&#x7EC4;&#x4EF6;&#x903B;&#x8F91;&#x8FDB;&#x884C;&#x91CD;&#x7528;&#x7684;&#x9AD8;&#x7EA7;&#x6280;&#x672F;&#x3002;&#x4F46;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x672C;&#x8EAB;&#x5E76;&#x4E0D;&#x662F;React API&#x3002;&#x5B83;&#x53EA;&#x662F;&#x4E00;&#x79CD;&#x6A21;&#x5F0F;&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4E14;&#x8BE5;&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5728;React&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x4E2D;&#x5F88;&#x5E38;&#x89C1;&#xFF0C;&#x6BD4;&#x5982;Redux&#x7684;connect&#x65B9;&#x6CD5;&#x548C;react-router&#x7684;withRouter()&#x65B9;&#x6CD5;&#x3002;</p><p>&#x6CE8;&#x610F;&#x4E8B;&#x9879;&#xFF1A;</p><p>1&#x3001;&#x4E0D;&#x8981;&#x518D;render&#x51FD;&#x6570;&#x4E2D;&#x4F7F;&#x7528;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E0D;&#x7136;&#x4F1A;&#x5BFC;&#x81F4;&#x6BCF;&#x6B21;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x90FD;&#x4F1A;&#x91CD;&#x65B0;&#x521B;&#x5EFA;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF0C;&#x9500;&#x6BC1;&#x6389;&#x65E7;&#x7684;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#xFF0C;&#x5BFC;&#x81F4;&#x6240;&#x6709;&#x72B6;&#x6001;&#x548C;&#x5B50;&#x7EC4;&#x4EF6;&#x90FD;&#x88AB;&#x5378;&#x8F7D;&#x3002;</p><p>2&#x3001;&#x5FC5;&#x987B;&#x5C06;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x505A;&#x62F7;&#x8D1D;&#xFF0C;&#x5F53;&#x4F7F;&#x7528;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#xFF0C;&#x539F;&#x59CB;&#x7EC4;&#x4EF6;&#x88AB;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x5305;&#x88F9;&#xFF0C;&#x5F97;&#x5230;&#x65B0;&#x7EC4;&#x4EF6;&#x4F1A;&#x4E22;&#x5931;&#x539F;&#x59CB;&#x7EC4;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#xFF0C;&#x5047;&#x5982;&#x539F;&#x59CB;&#x7EC4;&#x4EF6;&#x6709;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;hoist-non-react-statics&#x8FDB;&#x884C;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x62F7;&#x8D1D;&#x3002;<a href="https://codepen.io/xiaobinwu/pen/jKJJmo" rel="nofollow noreferrer" target="_blank">&#x4F8B;&#x5B50;</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/jKJJmo" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><p>3&#x3001;Refs&#x5C5E;&#x6027;&#x4E0D;&#x80FD;&#x4F20;&#x9012;&#xFF0C;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x4F20;&#x9012;&#x6240;&#x6709;&#x7684;props&#x5C5E;&#x6027;&#x7ED9;&#x5305;&#x88F9;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x80FD;&#x4F20;&#x9012;refs&#x5F15;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x786E;&#x5B9E;&#x9700;&#x8981;&#x628A;ref&#x7684;&#x5F15;&#x7528;&#x4F20;&#x7ED9;&#x5305;&#x88F9;&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x4F20;&#x4E00;&#x4E2A;&#x975E;ref&#x547D;&#x540D;&#x7684;props&#x5C5E;&#x6027;&#x7ED9;&#x5230;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x4E0A;&#xFF0C;&#x7531;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;&#x7ED1;&#x5B9A;&#x5230;&#x5305;&#x88F9;&#x7EC4;&#x4EF6;&#x7684;ref&#x4E0A;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x8F6C;&#x53D1;Ref&#x3002;<a href="https://codepen.io/xiaobinwu/pen/YvgMab" rel="nofollow noreferrer" target="_blank">&#x4F8B;&#x5B50;</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/YvgMab" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><h3 id="articleHeader2">&#x4E09;&#x3001;React&#x7B2C;&#x4E09;&#x65B9;&#x5E93;</h3><h4>1&#x3001;<a href="https://unpkg.com/redux@4.0.0/lib/redux.js" rel="nofollow noreferrer" target="_blank">Redux</a>&#x4E0E;<a href="https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.7/react-redux.js" rel="nofollow noreferrer" target="_blank">react-redux</a></h4><p>Redux&#x4E3B;&#x8981;&#x5206;&#x6210;&#x4E09;&#x90E8;&#x5206;&#xFF0C;&#x5206;&#x522B;&#x4E3A;Store&#xFF0C;Action&#xFF0C;Reducer&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x5BF9;&#x4E09;&#x90E8;&#x5206;&#x7684;&#x901A;&#x4FD7;&#x7684;&#x8BB2;&#x89E3;&#xFF1A;</p><p>Store&#xFF1A;Redux&#x5E94;&#x7528;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5355;&#x4E00;&#x7684;Store&#xFF0C;&#x5C31;&#x662F;&#x5355;&#x4E00;&#x6570;&#x636E;&#x6E90;&#xFF0C;&#x5C06;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x5171;&#x4EAB;&#x7684;&#x72B6;&#x6001;state&#x50A8;&#x5B58;&#x5728;&#x4E00;&#x68F5;&#x5BF9;&#x8C61;&#x6811;&#x4E0A;&#x9762;&#xFF0C;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x5BF9;&#x8C61;&#x6811;&#x4E0A;&#x9762;&#x7684;state&#x662F;&#x53EA;&#x8BFB;&#x7684;&#xFF0C;&#x53EA;&#x80FD;&#x901A;&#x8FC7;&#x7EAF;&#x51FD;&#x6570;&#x6765;&#x6267;&#x884C;&#x4FEE;&#x6539;&#xFF0C;&#x521B;&#x5EFA;store&#xFF0C;&#x662F;&#x901A;&#x8FC7;Redux&#x7684;&#xA0;createStore&#xFF08;reducer&#xFF09;&#x65B9;&#x6CD5;&#x6765;&#x521B;&#x5EFA;&#x7684;&#xFF0C;store&#x91CC;&#x9762;&#x4F1A;&#x6709;getState()&#x3001;dispatch()&#x3001;subscribe(listener)&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><p>Action&#xFF1A;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684;Javascript&#x5BF9;&#x8C61;&#xFF0C;&#x63CF;&#x8FF0;&#x4E86;&#x5E94;&#x7528;state&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#x53D8;&#x5316;&#xFF0C;&#x901A;&#x8FC7;dispatch&#x65B9;&#x6CD5;&#x6765;&#x901A;&#x77E5;store&#x8C03;&#x7528;reducer&#x65B9;&#x6CD5;&#x3002;</p><p>Reducer&#xFF1A;&#x63CF;&#x8FF0;&#x5E94;&#x7528;&#x5982;&#x4F55;&#x66F4;&#x65B0;state&#xFF0C;&#x672C;&#x8EAB;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x63A5;&#x53D7;Action&#x53C2;&#x6570;&#xFF0C;&#x8FD4;&#x56DE;&#x65B0;&#x7684;state&#x3002;</p><p><a href="https://codepen.io/xiaobinwu/pen/YvMLrd" rel="nofollow noreferrer" target="_blank">&#x4E0D;&#x7ED3;&#x5408;react-redux&#x7684;Redux&#x4F7F;&#x7528;&#x4F8B;&#x5B50;</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/YvMLrd" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><p>&#x9700;&#x8981;&#x660E;&#x767D;&#x7684;&#x4E00;&#x70B9;Redux&#x8DDF;React&#x4E00;&#x70B9;&#x5173;&#x7CFB;&#x90FD;&#x6CA1;&#x6709;&#xFF0C;&#x4F46;&#x662F;React&#x642D;&#x914D;Redux&#x6765;&#x5B9E;&#x73B0;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x65F6;&#x6700;&#x597D;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6848;&#x3002;&#x90A3;&#x4E48;&#x5982;&#x4F55;&#x642D;&#x914D;&#x5462;&#xFF1F;&#x672C;&#x6765;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;subscribe(listener)&#x5728;react&#x7684;&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;redux&#x7684;&#x76D1;&#x542C;&#x5668;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x7E41;&#x7410;&#xFF0C;&#x800C;&#x4E14;&#x4F1A;&#x5BFC;&#x81F4;&#x591A;&#x6B21;&#x6E32;&#x67D3;&#x3002;&#x6240;&#x4EE5;&#x642D;&#x914D;&#x7740;react-redux&#x6765;&#x4F7F;&#x7528;&#x3002;&#x57FA;&#x672C;&#x4F7F;&#x7528;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
import { render } from &apos;react-dom&apos;
import { Provider } from &apos;react-redux&apos;
import { createStore } from &apos;redux&apos;
import App from &apos;./components/App&apos;

const todoApp = (state = {}, action) {
   if (actions.type === &apos;SHOW&apos;) {
       return Object.assign({}, state, {
        show: action.show
       });
   }
   return state;
}

let store = createStore(todoApp)
render(
  // &#x4F7F;&#x7528;&#x6307;&#x5B9A;&#x7684; React Redux &#x7EC4;&#x4EF6; &lt;Provider&gt; &#x6765;&#x8BA9;&#x6240;&#x6709;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x90FD;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE; store&#xFF0C;&#x800C;&#x4E0D;&#x5FC5;&#x663E;&#x793A;&#x5730;&#x4F20;&#x9012;&#x5B83;&#x3002;&#x53EA;&#x9700;&#x8981;&#x5728;&#x6E32;&#x67D3;&#x6839;&#x7EC4;&#x4EF6;&#x65F6;&#x4F7F;&#x7528;&#x5373;&#x53EF;&#x3002;
  &lt;Provider store={store}&gt;
    &lt;App /&gt;
  &lt;/Provider&gt;,
  document.getElementById(&apos;root&apos;)
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="javacript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-redux&apos;</span>
<span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/App&apos;</span>

<span class="hljs-keyword">const</span> todoApp = (state = {}, action) {
   <span class="hljs-keyword">if</span> (actions.type === <span class="hljs-string">&apos;SHOW&apos;</span>) {
       <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, state, {
        <span class="hljs-attr">show</span>: action.show
       });
   }
   <span class="hljs-keyword">return</span> state;
}

<span class="hljs-keyword">let</span> store = createStore(todoApp)
render(
  <span class="hljs-comment">// &#x4F7F;&#x7528;&#x6307;&#x5B9A;&#x7684; React Redux &#x7EC4;&#x4EF6; &lt;Provider&gt; &#x6765;&#x8BA9;&#x6240;&#x6709;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x90FD;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE; store&#xFF0C;&#x800C;&#x4E0D;&#x5FC5;&#x663E;&#x793A;&#x5730;&#x4F20;&#x9012;&#x5B83;&#x3002;&#x53EA;&#x9700;&#x8981;&#x5728;&#x6E32;&#x67D3;&#x6839;&#x7EC4;&#x4EF6;&#x65F6;&#x4F7F;&#x7528;&#x5373;&#x53EF;&#x3002;</span>
  &lt;Provider store={store}&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>)
)</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
import { connect } from &apos;react-redux&apos;;
import Child from &apos;./components/Child&apos;
class App extends Component {
    render() {
        const { show } = this.props;
        return (
            &lt;div&gt;
                &lt;Child show={show }/&gt;
            &lt;/div&gt;
        );
    }
}
const stateToProps = (state) =&gt; ({
    show: state.show
});

export default connect(stateToProps)(App);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-redux&apos;</span>;
<span class="hljs-keyword">import</span> Child <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/Child&apos;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">const</span> { show } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Child</span> <span class="hljs-attr">show</span>=<span class="hljs-string">{show</span> }/&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );
    }
}
const stateToProps = (state) =&gt; ({
    show: state.show
});

export default connect(stateToProps)(App);</span></code></pre><p><a href="https://codepen.io/xiaobinwu/pen/PagXWg" rel="nofollow noreferrer" target="_blank">&#x7ED3;&#x5408;react-redux&#x7684;&#x4F8B;&#x5B50;</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaobinwu/pen/PagXWg" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><p>react-redux&#x5185;&#x5BB9;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#xFF0C;&#x4F7F;&#x7528;&#x7684;<a href="https://doc.react-china.org/docs/legacy-context.html#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8context" rel="nofollow noreferrer" target="_blank">Context API</a>&#xFF0C;&#x7B80;&#x5355;&#x6765;&#x8BF4;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x58F0;&#x660E;&#x9700;&#x8981;&#x8DE8;&#x5C42;&#x7EA7;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x5C5E;&#x6027;&#xFF08;childContextType&#xFF09;&#x4EE5;&#x53CA;&#x76D1;&#x542C;&#x5C5E;&#x6027;&#x53D8;&#x5316;&#x7684;getChildContext()&#x51FD;&#x6570;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x58F0;&#x660E;&#x53EF;&#x4EE5;&#x63A5;&#x6536;&#x4E0A;&#x5C42;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x5C5E;&#x6027;&#xFF08;contextType&#xFF09;&#x3002;</p><p>&#x5982;&#x679C;&#x5B58;&#x5728;&#x591A;&#x4E2A;reducer&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;redux&#x4E2D;&#x7684;combineReducers&#x8FDB;&#x884C;&#x5408;&#x5E76;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, combineReducers } from &apos;redux&apos;;
const todoApp = combineReducers({
  reducer1,
  reducer2
})
const store = createStore(todoApp);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createStore, combineReducers } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>;
<span class="hljs-keyword">const</span> todoApp = combineReducers({
  reducer1,
  reducer2
})
<span class="hljs-keyword">const</span> store = createStore(todoApp);</code></pre><p>&#x4EE3;&#x7801;&#x7B49;&#x4EF7;&#x4E8E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore} from &apos;redux&apos;;
const todoApp = (state = {}, action) =&gt; {
  return {
    reducer1: state.reducer1,
    reducer2: state.reducer2
  }
}
const store = createStore(todoApp);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createStore} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>;
<span class="hljs-keyword">const</span> todoApp = <span class="hljs-function">(<span class="hljs-params">state = {}, action</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">reducer1</span>: state.reducer1,
    <span class="hljs-attr">reducer2</span>: state.reducer2
  }
}
<span class="hljs-keyword">const</span> store = createStore(todoApp);</code></pre><p>combineReducers&#x6700;&#x7EC8;&#x53EA;&#x662F;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x8C03;&#x7528;&#x4F60;&#x7684;&#x4E00;&#x7CFB;&#x5217; reducer&#xFF0C;&#x6BCF;&#x4E2A; reducer&#xA0;&#x6839;&#x636E;&#x5B83;&#x4EEC;&#x7684; key &#x6765;&#x7B5B;&#x9009;&#x51FA; state &#x4E2D;&#x7684;&#x4E00;&#x90E8;&#x5206;&#x6570;&#x636E;&#x5E76;&#x5904;&#x7406;&#xFF0C;&#x7136;&#x540E;&#x8FD9;&#x4E2A;&#x751F;&#x6210;&#x7684;&#x51FD;&#x6570;&#x518D;&#x5C06;&#x6240;&#x6709; reducer &#x7684;&#x7ED3;&#x679C;&#x5408;&#x5E76;&#x6210;&#x4E00;&#x4E2A;&#x5927;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x8BE6;&#x7EC6;&#x903B;&#x8F91;&#x53EF;&#x4EE5;&#x770B;<a href="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.0/redux.js" rel="nofollow noreferrer" target="_blank">redux&#x6E90;&#x7801;</a>&#x3002;</p><h4>2&#x3001;react-router</h4><p>&#x5BF9;&#x4E8E;&#x8DEF;&#x7531;&#x89C4;&#x5219;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x9879;&#x76EE;&#x91CC;&#x9762;&#x642D;&#x914D;&#x7684;&#x662F;react-router v4&#x8FD9;&#x4E2A;&#x5E93;&#x6765;&#x5B8C;&#x6210;&#x7684;&#xFF0C;&#x7531;&#x4E8E;&#x6211;&#x4EEC;&#x8FD9;&#x4E4B;&#x524D;&#x4E5F;&#x6CA1;&#x63A5;&#x89E6;&#x8FC7;react-router&#xFF0C;&#x6240;&#x4EE5;&#x7248;&#x672C;v3&#x4E0E;v4&#x4E4B;&#x95F4;&#x6A21;&#x5F0F;&#x548C;&#x7B56;&#x7565;&#x7684;&#x5DEE;&#x5F02;&#x4E0D;&#x540C;&#x4E5F;&#x6CA1;&#x6709;&#x5E26;&#x6765;&#x601D;&#x7EF4;&#x6A21;&#x5F0F;&#x8F6C;&#x6362;&#x7684;&#x56F0;&#x96BE;&#xFF0C;&#x4E0B;&#x9762;&#x5148;&#x5E16;&#x7801;&#x7B80;&#x5355;&#x770B;&#x770B;v3&#x4E0E;v4&#x7248;&#x672C;&#x4E4B;&#x95F4;&#x7684;&#x5DEE;&#x5F02;&#x6027;&#xFF08;&#x6458;&#x81EA;<a href="https://juejin.im/post/5995a2506fb9a0249975a1a4" rel="nofollow noreferrer" target="_blank">&#x6398;&#x91D1;</a>&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Router, Route, IndexRoute } from &apos;react-router&apos;
const PrimaryLayout = props =&gt; (
    &lt;div className=&quot;primary-layout&quot;&gt;
        &lt;header&gt;
          Our React Router 3 App
        &lt;/header&gt;
        &lt;main&gt;
          {props.children}
        &lt;/main&gt;
  &lt;/div&gt;
)
const HomePage =() =&gt; &lt;div&gt;Home Page&lt;/div&gt;
const UsersPage = () =&gt; &lt;div&gt;Users Page&lt;/div&gt;
const App = () =&gt; (
  &lt;Router history={browserHistory}&gt;
    &lt;Route path=&quot;/&quot; component={PrimaryLayout}&gt;
      &lt;IndexRoute component={HomePage} /&gt;
      &lt;Route path=&quot;/users&quot; component={UsersPage} /&gt;
    &lt;/Route&gt;
  &lt;/Router&gt;
)
render(&lt;App /&gt;, document.getElementById(&apos;root&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Router, Route, IndexRoute } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router&apos;</span>
<span class="hljs-keyword">const</span> PrimaryLayout = <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;primary-layout&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
          Our React Router 3 App
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
          {props.children}
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
<span class="hljs-keyword">const</span> HomePage =<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> &lt;div&gt;Home Page&lt;<span class="hljs-regexp">/div&gt;
const UsersPage = () =&gt; &lt;div&gt;Users Page&lt;/</span>div&gt;
<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  &lt;Router history={browserHistory}&gt;
    &lt;Route path=&quot;/&quot; component={PrimaryLayout}&gt;
      &lt;IndexRoute component={HomePage} /&gt;
      &lt;Route path=&quot;/users&quot; component={UsersPage} /&gt;
    &lt;/Route&gt;
  &lt;/Router&gt;
)
render(&lt;App /&gt;, document.getElementById(&apos;root&apos;))</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { BrowserRouter, Route } from &apos;react-router-dom&apos;

const PrimaryLayout = () =&gt; (
    &lt;div className=&quot;primary-layout&quot;&gt;
    &lt;header&gt;
      Our React Router 4 App
    &lt;/header&gt;
    &lt;main&gt;
      &lt;Route path=&quot;/&quot; exact component={HomePage} /&gt;
      &lt;Route path=&quot;/users&quot; component={UsersPage} /&gt;
    &lt;/main&gt;
  &lt;/div&gt;
)

const HomePage =() =&gt; 
&lt;div&gt;Home Page&lt;/div&gt;

const UsersPage = () =&gt; 
&lt;div&gt;Users Page&lt;/div&gt;


const App = () =&gt; (
  &lt;BrowserRouter&gt;
    &lt;PrimaryLayout /&gt;
  &lt;/BrowserRouter&gt;
)

render(&lt;App /&gt;, document.getElementById(&apos;root&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { BrowserRouter, Route } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router-dom&apos;</span>

<span class="hljs-keyword">const</span> PrimaryLayout = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    &lt;div className=&quot;primary-layout&quot;&gt;
    &lt;header&gt;
      Our React Router 4 App
    &lt;/header&gt;
    &lt;main&gt;
      &lt;Route path=&quot;/&quot; exact component={HomePage} /&gt;
      &lt;Route path=&quot;/users&quot; component={UsersPage} /&gt;
    &lt;/main&gt;
  &lt;/div&gt;
)

const HomePage =() =&gt; 
&lt;div&gt;Home Page&lt;/div&gt;

const UsersPage = () =&gt; 
&lt;div&gt;Users Page&lt;/div&gt;


const App = () =&gt; (
  &lt;BrowserRouter&gt;
    &lt;PrimaryLayout /&gt;
  &lt;/BrowserRouter&gt;
)

render(&lt;App /&gt;, document.getElementById(&apos;root&apos;))</code></pre><p>&#x5DEE;&#x5F02;&#x6027;&#xFF1A;</p><p>1&#x3001;v3&#x662F;&#x96C6;&#x4E2D;&#x6027;&#x8DEF;&#x7531;&#xFF0C;&#x6240;&#x6709;&#x8DEF;&#x7531;&#x90FD;&#x662F;&#x96C6;&#x4E2D;&#x5728;&#x4E00;&#x4E2A;&#x5730;&#x65B9;&#xFF0C; &#x800C;v4&#x5219;&#x76F8;&#x53CD;&#x3002;</p><p>2&#x3001;v3&#x5E03;&#x5C40;&#x548C;&#x9875;&#x9762;&#x5D4C;&#x5957;&#x662F;&#x901A;&#x8FC7; &#x7EC4;&#x4EF6;&#x7684;&#x5D4C;&#x5957;&#x800C;&#x6765;&#x7684;&#xFF0C;&#x800C;v4&#x4E0D;&#x4F1A;&#x4E92;&#x76F8;&#x5D4C;&#x5957;</p><p>3&#x3001;v3&#x5E03;&#x5C40;&#x548C;&#x9875;&#x9762;&#x7EC4;&#x4EF6;&#x662F;&#x5B8C;&#x5168;&#x7EAF;&#x7CB9;&#x7684;&#xFF0C;&#x5B83;&#x4EEC;&#x662F;&#x8DEF;&#x7531;&#x7684;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x800C;v4&#x8DEF;&#x7531;&#x89C4;&#x5219;&#x4F4D;&#x4E8E;&#x5E03;&#x5C40;&#x548C; UI &#x672C;&#x8EAB;&#x4E4B;&#x95F4;</p><p>4&#x3001;&#x4F7F;&#x7528;v4&#x9700;&#x8981;&#x5728;&#x6211;&#x4EEC;&#x7684;&#x7EC4;&#x4EF6;&#x6839;&#x90E8;&#x7528;BrowserRouter&#x7EC4;&#x4EF6;(&#x7528;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;)&#x53BB;&#x5305;&#x88C5;&#xFF0C;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x4E0E;react-redux&#x7684;Provider&#x7EC4;&#x4EF6;&#x4E00;&#x6837;&#xFF08;Context API&#xFF09;&#xFF0C;&#x4EE5;&#x4FBF;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x53BB;&#x62FF;&#x5230;&#x8DEF;&#x7531;&#x4FE1;&#x606F;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x4ECB;&#x7ECD;&#x5305;&#x5BB9;&#x6027;&#x8DEF;&#x7531;&#x3001;&#x6392;&#x4ED6;&#x6027;&#x8DEF;&#x7531;&#x3001;&#x5D4C;&#x5957;&#x8DEF;&#x7531;&#xFF0C;&#x4EE5;&#x53CA;withRouter&#x7684;&#x4E00;&#x4E9B;&#x57FA;&#x672C;&#x7528;&#x6CD5;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React学习笔记

## 原文链接
[https://segmentfault.com/a/1190000015829757](https://segmentfault.com/a/1190000015829757)

