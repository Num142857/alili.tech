---
title: '新的小程序开发框架？- Taro的深度实践体验' 
date: 2018-11-25 2:30:08
hidden: true
slug: vvawxz6c41
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x524D;&#x9635;&#x5B50;&#xFF0C;&#x6765;&#x81EA;&#x6211;&#x4EEC;&#x51F9;&#x51F8;&#x5B9E;&#x9A8C;&#x5BA4;&#x7684;&#x9075;&#x5FAA; <a href="https://reactjs.org/" rel="nofollow noreferrer" target="_blank">React</a> &#x8BED;&#x6CD5;&#x89C4;&#x8303;&#x7684;<strong>&#x591A;&#x7AEF;&#x5F00;&#x53D1;&#x65B9;&#x6848;</strong> - <a href="https://github.com/NervJS/taro" rel="nofollow noreferrer" target="_blank">Taro</a>&#x7EC8;&#x4E8E;&#x5BF9;&#x5916;&#x5F00;&#x6E90;&#x4E86;&#xFF0C;&#x6B22;&#x8FCE;&#x56F4;&#x89C2;<a href="https://github.com/NervJS/taro" rel="nofollow noreferrer" target="_blank">star</a>&#xFF08;&#x5148;&#x6253;&#x6CE2;&#x5E7F;&#x544A;&#xFF09;&#x3002;&#x4F5C;&#x4E3A;&#x7B2C;&#x4E00;&#x6279;&#x4F7F;&#x7528;&#x4E86;<a href="https://github.com/NervJS/taro" rel="nofollow noreferrer" target="_blank">Taro</a>&#x5F00;&#x53D1;&#x7684;TOPLIFE&#x5C0F;&#x7A0B;&#x5E8F;&#x7684;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x4E4B;&#x4E00;&#xFF0C;&#x81EA;&#x7136;&#x662F;&#x8D70;&#x4E86;&#x4E0D;&#x5C11;&#x5F2F;&#x8DEF;&#xFF0C;&#x8EBA;&#x4E86;&#x4E0D;&#x5C11;&#x5751;&#xFF0C;&#x4E5F;&#x5E2E;&#x5FD9;&#x627E;&#x8FC7;&#x4E0D;&#x5C11;bug&#x3002;&#x73B0;&#x5728;&#x9879;&#x76EE;&#x603B;&#x7B97;&#x662F;&#x4E0A;&#x7EBF;&#x4E86;&#xFF0C;&#x90A3;&#x4E48;&#xFF0C;&#x4E5F;&#x662F;&#x65F6;&#x5019;&#x7ED9;&#x5927;&#x5BB6;&#x603B;&#x7ED3;&#x5206;&#x4EAB;&#x4E0B;&#x4E86;&#x3002;</p><h3 id="articleHeader1">&#x4E0E;wepy&#x6BD4;&#x8F83;</h3><p>&#x5F53;&#x521D;&#x5F00;&#x53D1;TOPLIFE&#x7B2C;&#x4E00;&#x671F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7528;&#x7684;&#x5176;&#x5B9E;&#x662F;<a href="https://github.com/Tencent/wepy" rel="nofollow noreferrer" target="_blank">wepy</a>&#xFF08;&#x90A3;&#x65F6;Taro&#x8FD8;&#x6CA1;&#x6709;&#x5F00;&#x53D1;&#x5B8C;&#x6210;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x7B2C;&#x4E8C;&#x671F;&#x624D;&#x5168;&#x9762;&#x8F6C;&#x6362;&#x4E3A;&#x7528;<a href="https://github.com/NervJS/taro" rel="nofollow noreferrer" target="_blank">Taro</a>&#x5F00;&#x53D1;&#x3002;&#x4F5C;&#x4E3A;&#x4E24;&#x4E2A;&#x5C0F;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x6846;&#x67B6;&#x90FD;&#x4F7F;&#x7528;&#x8FC7;&#xFF0C;&#x5E76;&#x5E94;&#x7528;&#x5728;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x91CC;&#x7684;&#x4EBA;&#xFF0C;&#x81EA;&#x7136;&#x662F;&#x8981;&#x6BD4;&#x8F83;&#x4E00;&#x4E0B;&#x4E24;&#x8005;&#x7684;&#x5F02;&#x540C;&#x70B9;&#x3002;</p><h4>&#x76F8;&#x540C;&#x70B9;</h4><ul><li>&#x7EC4;&#x4EF6;&#x5316;&#x5F00;&#x53D1;</li><li>npm&#x5305;&#x652F;&#x6301;</li><li>ES6+&#x7279;&#x6027;&#x652F;&#x6301;&#xFF0C;<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" rel="nofollow noreferrer" target="_blank">Promise</a>&#xFF0C;<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" rel="nofollow noreferrer" target="_blank">Async Functions</a>&#x7B49;</li><li>CSS&#x9884;&#x7F16;&#x8BD1;&#x5668;&#x652F;&#x6301;&#xFF0C;Sass/Stylus/PostCSS&#x7B49;</li><li>&#x652F;&#x6301;&#x4F7F;&#x7528;Redux&#x8FDB;&#x884C;&#x72B6;&#x6001;&#x7BA1;&#x7406;</li><li>&#x2026;..</li></ul><p>&#x76F8;&#x540C;&#x7684;&#x5730;&#x65B9;&#x4E5F;&#x4E0D;&#x7528;&#x591A;&#x8BF4;&#x4EC0;&#x4E48;&#xFF0C;&#x90FD;2018&#x5E74;&#x4E86;&#xFF0C;&#x8FD9;&#x4E9B;&#x7279;&#x6027;&#x7684;&#x652F;&#x6301;&#x90FD;&#x662F;&#x4E3A;&#x4E86;&#x8BA9;&#x5C0F;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x53D8;&#x5F97;&#x66F4;&#x73B0;&#x4EE3;&#xFF0C;&#x66F4;&#x5DE5;&#x7A0B;&#x5316;&#xFF0C;&#x91CD;&#x70B9;&#x662F;&#x533A;&#x522B;&#x4E4B;&#x5904;</p><h4>&#x4E0D;&#x540C;&#x70B9;</h4><ul><li>&#x5F00;&#x53D1;&#x98CE;&#x683C;</li><li>&#x5B9E;&#x73B0;&#x539F;&#x7406;</li><li>wepy&#x652F;&#x6301;slot&#xFF0C;taro&#x6682;&#x4E0D;&#x652F;&#x6301;&#x76F4;&#x63A5;&#x6E32;&#x67D3;children</li></ul><p><strong>&#x5F00;&#x53D1;&#x98CE;&#x683C;</strong></p><p>&#x6700;&#x5927;&#x7684;&#x4E0D;&#x540C;&#x4E4B;&#x5904;&#xFF0C;&#x81EA;&#x7136;&#x5C31;&#x662F;&#x5F00;&#x53D1;&#x98CE;&#x683C;&#x4E0A;&#x7684;&#x5DEE;&#x5F02;&#xFF0C;<a href="https://github.com/Tencent/wepy" rel="nofollow noreferrer" target="_blank">wepy</a>&#x4F7F;&#x7528;&#x7684;&#x662F;&#x7C7B;Vue&#x5F00;&#x53D1;&#x98CE;&#x683C;&#xFF0C; <a href="https://github.com/NervJS/taro" rel="nofollow noreferrer" target="_blank">Taro</a>&#x4F7F;&#x7528;&#x7684;&#x662F;&#x7C7B;React&#x5F00;&#x53D1;&#x98CE;&#x683C;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4;&#x5F00;&#x53D1;&#x4F53;&#x9A8C;&#x4E0A;&#x8FD8;&#x662F;&#x4F1A;&#x6709;&#x8F83;&#x5927;&#x7684;&#x533A;&#x522B;&#x3002;&#x8D34;&#x4E00;&#x4E0B;&#x5B98;&#x65B9;&#x7684;demo&#x7B80;&#x5355;&#x9610;&#x8FF0;&#x4E0B;</p><p><strong>wepy demo</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style lang=&quot;less&quot;&gt;
    @color: #4D926F;
    .userinfo {
        color: @color;
    }
&lt;/style&gt;
&lt;template lang=&quot;pug&quot;&gt;
    view(class=&apos;container&apos;)
        view(class=&apos;userinfo&apos; @tap=&apos;tap&apos;)
            mycom(:prop.sync=&apos;myprop&apos; @fn.user=&apos;myevent&apos;)
            text "{{"now"}}"
&lt;/template&gt;

&lt;script&gt;
    import wepy from &apos;wepy&apos;;
    import mycom from &apos;../components/mycom&apos;;

    export default class Index extends wepy.page {
        
        components = { mycom };
        data = {
            myprop: {}
        };
        computed = {
            now () { return new Date().getTime(); }
        };
        async onLoad() {
            await sleep(3);
            console.log(&apos;Hello World&apos;);
        }
        sleep(time) {
            return new Promise((resolve, reject) =&gt; setTimeout(resolve, time * 1000));
        }
    }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">&lt;style lang=<span class="hljs-string">&quot;less&quot;</span>&gt;
    @color: #<span class="hljs-number">4</span>D926F;
    .userinfo {
        <span class="hljs-attr">color</span>: @color;
    }
&lt;<span class="hljs-regexp">/style&gt;
&lt;template lang=&quot;pug&quot;&gt;
    view(class=&apos;container&apos;)
        view(class=&apos;userinfo&apos; @tap=&apos;tap&apos;)
            mycom(:prop.sync=&apos;myprop&apos; @fn.user=&apos;myevent&apos;)
            text "{{"now"}}"
&lt;/</span>template&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> wepy <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;wepy&apos;</span>;
    <span class="hljs-keyword">import</span> mycom <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../components/mycom&apos;</span>;

    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Index</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">wepy</span>.<span class="hljs-title">page</span> </span>{
        
        components = { mycom };
        data = {
            <span class="hljs-attr">myprop</span>: {}
        };
        computed = {
            now () { <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime(); }
        };
        <span class="hljs-keyword">async</span> onLoad() {
            <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">3</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Hello World&apos;</span>);
        }
        sleep(time) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> setTimeout(resolve, time * <span class="hljs-number">1000</span>));
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p><strong>taro demo</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Taro, { Component } from &apos;@tarojs/taro&apos;
import { View, Button } from &apos;@tarojs/components&apos;

export default class Index extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      title: &apos;&#x9996;&#x9875;&apos;,
      list: [1, 2, 3]
    }
  }

  componentWillMount () {}

  componentDidMount () {}

  componentWillUpdate (nextProps, nextState) {}

  componentDidUpdate (prevProps, prevState) {}

  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  add = (e) =&gt; {
    // dosth
  }

  render () {
    return (
      &lt;View className=&apos;index&apos;&gt;
        &lt;View className=&apos;title&apos;&gt;{this.state.title}&lt;/View&gt;
        &lt;View className=&apos;content&apos;&gt;
          {this.state.list.map(item =&gt; {
            return (
              &lt;View className=&apos;item&apos;&gt;{item}&lt;/View&gt;
            )
          })}
          &lt;Button className=&apos;add&apos; onClick={this.add}&gt;&#x6DFB;&#x52A0;&lt;/Button&gt;
        &lt;/View&gt;
      &lt;/View&gt;
    )
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Taro, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@tarojs/taro&apos;</span>
<span class="hljs-keyword">import</span> { View, Button } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@tarojs/components&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Index</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-keyword">super</span>(...arguments)
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x9996;&#x9875;&apos;</span>,
      <span class="hljs-attr">list</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
    }
  }

  componentWillMount () {}

  componentDidMount () {}

  componentWillUpdate (nextProps, nextState) {}

  componentDidUpdate (prevProps, prevState) {}

  shouldComponentUpdate (nextProps, nextState) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }

  add = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-comment">// dosth</span>
  }

  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&apos;index&apos;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&apos;title&apos;</span>&gt;</span>{this.state.title}<span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&apos;content&apos;</span>&gt;</span>
          {this.state.list.map(item =&gt; {
            return (
              <span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&apos;item&apos;</span>&gt;</span>{item}<span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
            )
          })}
          <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&apos;add&apos;</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.add}</span>&gt;</span>&#x6DFB;&#x52A0;<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>
    )
  }
}</code></pre><p>&#x53EF;&#x4EE5;&#x89C1;&#x5230;&#x5728;wepy&#x91CC;&#xFF0C;<code>css</code>&#x3001;<code>template</code>&#x3001;<code>script</code>&#x90FD;&#x653E;&#x5728;&#x4E00;&#x4E2A;wepy&#x6587;&#x4EF6;&#x91CC;&#xFF0C;<code>template</code>&#x8FD8;&#x652F;&#x6301;&#x591A;&#x79CD;&#x6A21;&#x677F;&#x5F15;&#x64CE;&#x8BED;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x652F;&#x6301;<code>computed</code>&#x3001;<code>watcher</code>&#x7B49;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x5178;&#x578B;&#x7684;vue&#x98CE;&#x683C;</p><p>&#x800C;&#x5728;taro&#x91CC;&#xFF0C;&#x5C31;&#x662F;&#x5F7B;&#x5934;&#x5F7B;&#x5C3E;&#x7684;react&#x98CE;&#x683C;&#xFF0C;&#x5305;&#x62EC;<code>constructor</code>&#xFF0C;<code>componentWillMount</code>&#x3001;<code>componentDidMount</code>&#x7B49;&#x5404;&#x79CD;react&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#xFF0C;&#x8FD8;&#x6709;<code>return</code>&#x91CC;&#x8FD4;&#x56DE;&#x7684;<code>jsx</code>&#xFF0C;&#x719F;&#x6089;react&#x7684;&#x4EBA;&#x4E0A;&#x624B;&#x8D77;&#x6765;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x975E;&#x5E38;&#x5FEB;&#x4E86;</p><p>&#x9664;&#x6B64;&#x4E4B;&#x5916;&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x7EC6;&#x5FAE;&#x7684;&#x5DEE;&#x5F02;&#x4E4B;&#x5904;&#xFF1A;</p><ul><li>wepy&#x91CC;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#x662F;<code>wxml</code>&#xFF0C;&#x7528;&#x7684;&#x90FD;&#x662F;&#x5C0F;&#x7A0B;&#x5E8F;&#x91CC;&#x539F;&#x751F;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C31;&#x662F;&#x5C0F;&#x7A0B;&#x5E8F;&#x6587;&#x6863;&#x91CC;&#x7684;&#x5404;&#x79CD;&#x7EC4;&#x4EF6;&#xFF1B;&#x800C;taro&#x91CC;&#x4F7F;&#x7528;&#x7684;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x90FD;&#x9700;&#x8981;&#x4ECE;<code>@tarojs/components</code>&#x91CC;&#x5F15;&#x5165;&#xFF0C;&#x5305;&#x62EC;<code>View</code>&#xFF0C;<code>Text</code>&#x7B49;&#x57FA;&#x7840;&#x7EC4;&#x4EF6;&#xFF08;&#x8FD9;&#x79CD;&#x505A;&#x5176;&#x5B9E;&#x662F;&#x4E3A;&#x4E86;&#x8F6C;&#x6362;&#x591A;&#x7AEF;&#x505A;&#x51C6;&#x5907;&#xFF09;</li><li><p>&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x4E0A;</p><ul><li>taro&#x4E2D;&#xFF0C;&#x662F;&#x7528;<code>click</code>&#x4E8B;&#x4EF6;&#x4EE3;&#x66FF;<code>tap</code>&#x4E8B;&#x4EF6;</li><li>wepy&#x4F7F;&#x7528;&#x7684;&#x662F;&#x7B80;&#x5199;&#x7684;&#x5199;&#x6CD5;@+&#x4E8B;&#x4EF6;&#xFF1B;&#x800C;taro&#x5219;&#x662F;on+&#x4E8B;&#x4EF6;&#x540D;&#x79F0;</li><li>&#x963B;&#x6B62;&#x5192;&#x6CE1;&#x4E0A;wepy&#x7528;&#x7684;&#x662F;@+&#x4E8B;&#x4EF6;.stop&#xFF1B;&#x800C;taro&#x5219;&#x662F;&#x8981;&#x663E;&#x5F0F;&#x5730;&#x4F7F;&#x7528;<code>e.stopPropagation()</code>&#x6765;&#x963B;&#x6B62;&#x5192;&#x6CE1;</li><li>&#x4E8B;&#x4EF6;&#x4F20;&#x53C2;wepy&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5728;&#x51FD;&#x6570;&#x540E;&#x9762;&#x4F20;&#x53C2;&#xFF0C;&#x5982;<code>@tap=&quot;click("{{"index"}}")&quot;</code>&#xFF1B;&#x800C;taro&#x5219;&#x662F;&#x4F7F;&#x7528;<code>bind</code>&#x4F20;&#x53C2;&#xFF0C;&#x5982;<code>onClick={this.handleClick.bind(null, params)}</code></li></ul></li><li>wepy&#x4F7F;&#x7528;&#x7684;&#x662F;&#x5C0F;&#x7A0B;&#x5E8F;&#x539F;&#x751F;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x5E76;&#x4E14;&#x7EC4;&#x4EF6;&#x6709;<code>page</code>&#x548C;<code>component</code>&#x7684;&#x533A;&#x5206;&#xFF1B;taro&#x5219;&#x662F;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x4E86;&#x7C7B;&#x4F3C;react&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x800C;&#x4E14;&#x6CA1;&#x6709;<code>page</code>&#x548C;<code>component</code>&#x7684;&#x533A;&#x5206;&#xFF0C;&#x90FD;&#x662F;<code>component</code></li></ul><p>&#x603B;&#x7684;&#x6765;&#x8BF4;&#xFF0C;&#x6BD5;&#x7ADF;&#x662F;&#x4E24;&#x79CD;&#x4E0D;&#x540C;&#x7684;&#x5F00;&#x53D1;&#x98CE;&#x683C;&#xFF0C;&#x81EA;&#x7136;&#x8FD8;&#x662F;&#x4F1A;&#x6709;&#x8BB8;&#x591A;&#x5927;&#x5927;&#x5C0F;&#x5C0F;&#x7684;&#x5DEE;&#x5F02;&#x3002;&#x5728;&#x8FD9;&#x91CC;&#x4E0E;&#x5F53;&#x524D;&#x5F88;&#x6D41;&#x884C;&#x7684;&#x5C0F;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x6846;&#x67B6;&#x4E4B;&#x4E00;<a href="https://github.com/Tencent/wepy" rel="nofollow noreferrer" target="_blank">wepy</a>&#x8FDB;&#x884C;&#x7B80;&#x5355;&#x5BF9;&#x6BD4;&#xFF0C;&#x4E3B;&#x8981;&#x8FD8;&#x662F;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x5927;&#x5BB6;&#x66F4;&#x5FEB;&#x901F;&#x5730;&#x4E86;&#x89E3;taro&#xFF0C;&#x4ECE;&#x800C;&#x9009;&#x62E9;&#x66F4;&#x9002;&#x5408;&#x81EA;&#x5DF1;&#x7684;&#x5F00;&#x53D1;&#x65B9;&#x5F0F;&#x3002;</p><h3 id="articleHeader2">&#x5B9E;&#x8DF5;&#x4F53;&#x9A8C;</h3><p>taro&#x5B98;&#x65B9;&#x63D0;&#x4F9B;&#x7684;demo&#x662F;&#x5F88;&#x7B80;&#x5355;&#x7684;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x8BA9;&#x5927;&#x5BB6;&#x5FEB;&#x901F;&#x4E0A;&#x624B;&#xFF0C;&#x5165;&#x95E8;&#x3002;&#x90A3;&#x4E48;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x8981;&#x5F00;&#x53D1;&#x504F;&#x5927;&#x578B;&#x7684;&#x9879;&#x76EE;&#x65F6;&#xFF0C;&#x5E94;&#x8BE5;&#x5982;&#x4F55;&#x4F7F;&#x7528;taro&#x4F7F;&#x5F97;&#x5F00;&#x53D1;&#x4F53;&#x9A8C;&#x66F4;&#x597D;&#xFF0C;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x66F4;&#x9AD8;&#xFF1F;&#x4F5C;&#x4E3A;&#x6DF1;&#x5EA6;&#x53C2;&#x4E0E;TOPLIFE&#x5C0F;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x7684;&#x4EBA;&#x5458;&#x4E4B;&#x4E00;&#xFF0C;&#x8C08;&#x4E00;&#x8C08;&#x6211;&#x7684;&#x4E00;&#x4E9B;&#x5B9E;&#x8DF5;&#x4F53;&#x9A8C;&#x53CA;&#x5FC3;&#x5F97;</p><h4>&#x5982;&#x4F55;&#x7EC4;&#x7EC7;&#x4EE3;&#x7801;</h4><p>&#x4F7F;&#x7528;taro-cli&#x751F;&#x6210;&#x6A21;&#x677F;&#x662F;&#x8FD9;&#x6837;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; dist                   &#x7F16;&#x8BD1;&#x7ED3;&#x679C;&#x76EE;&#x5F55;
&#x251C;&#x2500;&#x2500; config                 &#x914D;&#x7F6E;&#x76EE;&#x5F55;
|   &#x251C;&#x2500;&#x2500; dev.js             &#x5F00;&#x53D1;&#x65F6;&#x914D;&#x7F6E;
|   &#x251C;&#x2500;&#x2500; index.js           &#x9ED8;&#x8BA4;&#x914D;&#x7F6E;
|   &#x2514;&#x2500;&#x2500; prod.js            &#x6253;&#x5305;&#x65F6;&#x914D;&#x7F6E;
&#x251C;&#x2500;&#x2500; src                    &#x6E90;&#x7801;&#x76EE;&#x5F55;
|   &#x251C;&#x2500;&#x2500; pages              &#x9875;&#x9762;&#x6587;&#x4EF6;&#x76EE;&#x5F55;
|   |   &#x251C;&#x2500;&#x2500; index          index&#x9875;&#x9762;&#x76EE;&#x5F55;
|   |   |   &#x251C;&#x2500;&#x2500; index.js   index&#x9875;&#x9762;&#x903B;&#x8F91;
|   |   |   &#x2514;&#x2500;&#x2500; index.css  index&#x9875;&#x9762;&#x6837;&#x5F0F;
|   &#x251C;&#x2500;&#x2500; app.css            &#x9879;&#x76EE;&#x603B;&#x901A;&#x7528;&#x6837;&#x5F0F;
|   &#x2514;&#x2500;&#x2500; app.js             &#x9879;&#x76EE;&#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2514;&#x2500;&#x2500; package.json" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gherkin"><code>&#x251C;&#x2500;&#x2500; dist                   &#x7F16;&#x8BD1;&#x7ED3;&#x679C;&#x76EE;&#x5F55;
&#x251C;&#x2500;&#x2500; config                 &#x914D;&#x7F6E;&#x76EE;&#x5F55;
|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; dev.js             &#x5F00;&#x53D1;&#x65F6;&#x914D;&#x7F6E;
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; index.js           &#x9ED8;&#x8BA4;&#x914D;&#x7F6E;
</span>|<span class="hljs-string">   &#x2514;&#x2500;&#x2500; prod.js            &#x6253;&#x5305;&#x65F6;&#x914D;&#x7F6E;
&#x251C;&#x2500;&#x2500; src                    &#x6E90;&#x7801;&#x76EE;&#x5F55;
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; pages              &#x9875;&#x9762;&#x6587;&#x4EF6;&#x76EE;&#x5F55;
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; index          index&#x9875;&#x9762;&#x76EE;&#x5F55;
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; index.js   index&#x9875;&#x9762;&#x903B;&#x8F91;
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   &#x2514;&#x2500;&#x2500; index.css  index&#x9875;&#x9762;&#x6837;&#x5F0F;
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; app.css            &#x9879;&#x76EE;&#x603B;&#x901A;&#x7528;&#x6837;&#x5F0F;
</span>|<span class="hljs-string">   &#x2514;&#x2500;&#x2500; app.js             &#x9879;&#x76EE;&#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2514;&#x2500;&#x2500; package.json</span></code></pre><p>&#x5047;&#x5982;&#x5F15;&#x5165;&#x4E86;redux&#xFF0C;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x76EE;&#x5F55;&#x662F;&#x8FD9;&#x6837;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; dist                   &#x7F16;&#x8BD1;&#x7ED3;&#x679C;&#x76EE;&#x5F55;
&#x251C;&#x2500;&#x2500; config                 &#x914D;&#x7F6E;&#x76EE;&#x5F55;
|   &#x251C;&#x2500;&#x2500; dev.js             &#x5F00;&#x53D1;&#x65F6;&#x914D;&#x7F6E;
|   &#x251C;&#x2500;&#x2500; index.js           &#x9ED8;&#x8BA4;&#x914D;&#x7F6E;
|   &#x2514;&#x2500;&#x2500; prod.js            &#x6253;&#x5305;&#x65F6;&#x914D;&#x7F6E;
&#x251C;&#x2500;&#x2500; src                    &#x6E90;&#x7801;&#x76EE;&#x5F55;
|   &#x251C;&#x2500;&#x2500; actions            redux&#x91CC;&#x7684;actions
|   &#x251C;&#x2500;&#x2500; asset              &#x56FE;&#x7247;&#x7B49;&#x9759;&#x6001;&#x8D44;&#x6E90;
|   &#x251C;&#x2500;&#x2500; components         &#x7EC4;&#x4EF6;&#x6587;&#x4EF6;&#x76EE;&#x5F55;
|   &#x251C;&#x2500;&#x2500; constants          &#x5B58;&#x653E;&#x5E38;&#x91CF;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x4F8B;&#x5982;api&#x3001;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x9879;
|   &#x251C;&#x2500;&#x2500; reducers           redux&#x91CC;&#x7684;reducers
|   &#x251C;&#x2500;&#x2500; store              redux&#x91CC;&#x7684;store
|   &#x251C;&#x2500;&#x2500; utils              &#x5B58;&#x653E;&#x5DE5;&#x5177;&#x7C7B;&#x51FD;&#x6570;
|   &#x251C;&#x2500;&#x2500; pages              &#x9875;&#x9762;&#x6587;&#x4EF6;&#x76EE;&#x5F55;
|   |   &#x251C;&#x2500;&#x2500; index          index&#x9875;&#x9762;&#x76EE;&#x5F55;
|   |   |   &#x251C;&#x2500;&#x2500; index.js   index&#x9875;&#x9762;&#x903B;&#x8F91;
|   |   |   &#x2514;&#x2500;&#x2500; index.css  index&#x9875;&#x9762;&#x6837;&#x5F0F;
|   &#x251C;&#x2500;&#x2500; app.css            &#x9879;&#x76EE;&#x603B;&#x901A;&#x7528;&#x6837;&#x5F0F;
|   &#x2514;&#x2500;&#x2500; app.js             &#x9879;&#x76EE;&#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2514;&#x2500;&#x2500; package.json" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gherkin"><code>&#x251C;&#x2500;&#x2500; dist                   &#x7F16;&#x8BD1;&#x7ED3;&#x679C;&#x76EE;&#x5F55;
&#x251C;&#x2500;&#x2500; config                 &#x914D;&#x7F6E;&#x76EE;&#x5F55;
|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; dev.js             &#x5F00;&#x53D1;&#x65F6;&#x914D;&#x7F6E;
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; index.js           &#x9ED8;&#x8BA4;&#x914D;&#x7F6E;
</span>|<span class="hljs-string">   &#x2514;&#x2500;&#x2500; prod.js            &#x6253;&#x5305;&#x65F6;&#x914D;&#x7F6E;
&#x251C;&#x2500;&#x2500; src                    &#x6E90;&#x7801;&#x76EE;&#x5F55;
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; actions            redux&#x91CC;&#x7684;actions
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; asset              &#x56FE;&#x7247;&#x7B49;&#x9759;&#x6001;&#x8D44;&#x6E90;
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; components         &#x7EC4;&#x4EF6;&#x6587;&#x4EF6;&#x76EE;&#x5F55;
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; constants          &#x5B58;&#x653E;&#x5E38;&#x91CF;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x4F8B;&#x5982;api&#x3001;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x9879;
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; reducers           redux&#x91CC;&#x7684;reducers
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; store              redux&#x91CC;&#x7684;store
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; utils              &#x5B58;&#x653E;&#x5DE5;&#x5177;&#x7C7B;&#x51FD;&#x6570;
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; pages              &#x9875;&#x9762;&#x6587;&#x4EF6;&#x76EE;&#x5F55;
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; index          index&#x9875;&#x9762;&#x76EE;&#x5F55;
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; index.js   index&#x9875;&#x9762;&#x903B;&#x8F91;
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   &#x2514;&#x2500;&#x2500; index.css  index&#x9875;&#x9762;&#x6837;&#x5F0F;
</span>|<span class="hljs-string">   &#x251C;&#x2500;&#x2500; app.css            &#x9879;&#x76EE;&#x603B;&#x901A;&#x7528;&#x6837;&#x5F0F;
</span>|<span class="hljs-string">   &#x2514;&#x2500;&#x2500; app.js             &#x9879;&#x76EE;&#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2514;&#x2500;&#x2500; package.json</span></code></pre><p>&#x6BD4;&#x8F83;&#x5E38;&#x89C1;&#x7684;&#x4E00;&#x79CD;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x7EC4;&#x7EC7;&#x65B9;&#x5F0F;&#xFF0C;&#x76F8;&#x6BD4;&#x521D;&#x59CB;&#x6A21;&#x677F;&#x591A;&#x4E86;&#x51E0;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x7528;&#x4E8E;&#x5B58;&#x653E;redux&#x76F8;&#x5173;&#x7684;&#x5185;&#x5BB9;&#x53CA;&#x5176;&#x4ED6;&#x7684;&#x4E00;&#x4E9B;&#x4E1C;&#x897F;&#xFF0C;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x76F8;&#x4FE1;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x76F4;&#x89C2;&#xFF0C;&#x7B80;&#x5355;&#x660E;&#x4E86;&#x7684;</p><h4>&#x66F4;&#x597D;&#x5730;&#x4F7F;&#x7528;redux</h4><p>redux&#x5927;&#x5BB6;&#x5E94;&#x8BE5;&#x90FD;&#x4E0D;&#x964C;&#x751F;&#xFF0C;&#x4E00;&#x79CD;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x7684;&#x5E93;&#xFF0C;&#x901A;&#x5E38;&#x4F1A;&#x642D;&#x914D;&#x4E00;&#x4E9B;&#x4E2D;&#x95F4;&#x4EF6;&#x4F7F;&#x7528;&#x3002;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;&#x4E3B;&#x8981;&#x662F;&#x7528;&#x4E86;<code>redux-thunk</code>&#x548C;<code>redux-logger</code>&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#xFF0C;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;&#x8C03;&#x8BD5;&#xFF0C;&#x8FFD;&#x8E2A;<code>actions</code></p><h5>&#x6570;&#x636E;&#x9884;&#x5904;&#x7406;</h5><p>&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x90FD;&#x9047;&#x5230;&#x8FC7;&#x8FD9;&#x79CD;&#x65F6;&#x5019;&#xFF0C;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x548C;&#x9875;&#x9762;&#x663E;&#x793A;&#x7684;&#x6570;&#x636E;&#x5E76;&#x4E0D;&#x662F;&#x5B8C;&#x5168;&#x5BF9;&#x5E94;&#x7684;&#xFF0C;&#x5F80;&#x5F80;&#x9700;&#x8981;&#x518D;&#x505A;&#x4E00;&#x5C42;&#x9884;&#x5904;&#x7406;&#x3002;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5E94;&#x8BE5;&#x5728;&#x54EA;&#x91CC;&#x7BA1;&#x7406;&#xFF0C;&#x662F;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#xFF0C;&#x8FD8;&#x662F;<code>redux</code>&#x7684;&#x6D41;&#x7A0B;&#x91CC;&#xFF1F;</p><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015432416?w=378&amp;h=625" src="https://static.alili.tech/img/remote/1460000015432416?w=378&amp;h=625" alt="mage-20180612151609" title="mage-20180612151609" style="cursor:pointer"></span></p><p>&#x4F8B;&#x5982;&#x4E0A;&#x56FE;&#x7684;&#x8D2D;&#x7269;&#x8F66;&#x6A21;&#x5757;&#xFF0C;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x662F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    code: 0,
    data: {
        shopMap: {...}, // &#x5B58;&#x653E;&#x8D2D;&#x7269;&#x8F66;&#x91CC;&#x5546;&#x54C1;&#x7684;&#x5E97;&#x94FA;&#x4FE1;&#x606F;&#x7684;map
        goods: {...}, // &#x8D2D;&#x7269;&#x8F66;&#x91CC;&#x7684;&#x5546;&#x54C1;&#x4FE1;&#x606F;
        ...
    }
    ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">code</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">shopMap</span>: {...}, <span class="hljs-comment">// &#x5B58;&#x653E;&#x8D2D;&#x7269;&#x8F66;&#x91CC;&#x5546;&#x54C1;&#x7684;&#x5E97;&#x94FA;&#x4FE1;&#x606F;&#x7684;map</span>
        goods: {...}, <span class="hljs-comment">// &#x8D2D;&#x7269;&#x8F66;&#x91CC;&#x7684;&#x5546;&#x54C1;&#x4FE1;&#x606F;</span>
        ...
    }
    ...
}</code></pre><p>&#x5BF9;&#x7684;&#xFF0C;&#x8D2D;&#x8F66;&#x91CC;&#x7684;&#x5546;&#x54C1;&#x5E97;&#x94FA;&#x548C;&#x5546;&#x54C1;&#x662F;&#x653E;&#x5728;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x91CC;&#x9762;&#x7684;&#xFF0C;&#x4F46;&#x89C6;&#x56FE;&#x8981;&#x6C42;&#x5B83;&#x4EEC;&#x8981;&#x663E;&#x793A;&#x5728;&#x4E00;&#x8D77;&#x3002;&#x8FD9;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x76F4;&#x63A5;&#x5C06;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x5B58;&#x5230;<code>store</code>&#xFF0C;&#x7136;&#x540E;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;<code>render</code>&#x7684;&#x65F6;&#x5019;&#x4E1C;&#x62FC;&#x897F;&#x51D1;&#xFF0C;&#x5C06;&#x4E24;&#x8005;&#x4FE1;&#x606F;&#x5339;&#x914D;&#xFF0C;&#x518D;&#x505A;&#x663E;&#x793A;&#x7684;&#x8BDD;&#xFF0C;&#x4F1A;&#x663E;&#x5F97;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x7684;&#x903B;&#x8F91;&#x5341;&#x5206;&#x7684;&#x6DF7;&#x4E71;&#xFF0C;&#x4E0D;&#x591F;&#x7EAF;&#x7CB9;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4E2A;&#x4EBA;&#x6BD4;&#x8F83;&#x63A8;&#x8350;&#x7684;&#x505A;&#x6CD5;&#x662F;&#xFF0C;&#x5728;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x4E4B;&#x540E;&#xFF0C;&#x76F4;&#x63A5;&#x5C06;&#x5176;&#x5904;&#x7406;&#x4E3A;&#x4E0E;&#x9875;&#x9762;&#x663E;&#x793A;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;&#x518D;<code>dispatch</code>&#x5904;&#x7406;&#x540E;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x505A;&#x4E86;&#x4E00;&#x5C42;&#x62E6;&#x622A;&#xFF0C;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const data = result.data // result&#x4E3A;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;
const cartData = handleCartData(data) // handleCartData&#x4E3A;&#x5904;&#x7406;&#x6570;&#x636E;&#x7684;&#x51FD;&#x6570;
dispatch({type: &apos;RECEIVE_CART&apos;, payload: cartData}) // dispatch&#x5904;&#x7406;&#x8FC7;&#x540E;&#x7684;&#x51FD;&#x6570;

...
// handleCartData&#x5904;&#x7406;&#x540E;&#x7684;&#x6570;&#x636E;
{
    commoditys: [{
        shop: {...}, // &#x5546;&#x54C1;&#x5E97;&#x94FA;&#x7684;&#x4FE1;&#x606F;
        goods: {...}, // &#x5BF9;&#x5E94;&#x5546;&#x54C1;&#x4FE1;&#x606F;
    }, ...]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> data = result.data <span class="hljs-comment">// result&#x4E3A;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;</span>
<span class="hljs-keyword">const</span> cartData = handleCartData(data) <span class="hljs-comment">// handleCartData&#x4E3A;&#x5904;&#x7406;&#x6570;&#x636E;&#x7684;&#x51FD;&#x6570;</span>
dispatch({<span class="hljs-attr">type</span>: <span class="hljs-string">&apos;RECEIVE_CART&apos;</span>, <span class="hljs-attr">payload</span>: cartData}) <span class="hljs-comment">// dispatch&#x5904;&#x7406;&#x8FC7;&#x540E;&#x7684;&#x51FD;&#x6570;</span>

...
<span class="hljs-comment">// handleCartData&#x5904;&#x7406;&#x540E;&#x7684;&#x6570;&#x636E;</span>
{
    <span class="hljs-attr">commoditys</span>: [{
        <span class="hljs-attr">shop</span>: {...}, <span class="hljs-comment">// &#x5546;&#x54C1;&#x5E97;&#x94FA;&#x7684;&#x4FE1;&#x606F;</span>
        goods: {...}, <span class="hljs-comment">// &#x5BF9;&#x5E94;&#x5546;&#x54C1;&#x4FE1;&#x606F;</span>
    }, ...]
}</code></pre><p>&#x53EF;&#x4EE5;&#x89C1;&#x5230;&#xFF0C;&#x5904;&#x7406;&#x6570;&#x636E;&#x7684;&#x6D41;&#x7A0B;&#x5728;render&#x524D;&#x88AB;&#x62E6;&#x622A;&#x5904;&#x7406;&#x4E86;&#xFF0C;&#x5C06;&#x5BF9;&#x5E94;&#x7684;&#x5546;&#x54C1;&#x5E97;&#x94FA;&#x548C;&#x5546;&#x54C1;&#x653E;&#x5728;&#x4E86;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E86;.</p><p>&#x8FD9;&#x6837;&#x505A;&#x6709;&#x51E0;&#x4E2A;&#x597D;&#x5904;</p><ul><li>&#x4E00;&#x4E2A;&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x6E32;&#x67D3;<strong>&#x66F4;&#x7EAF;&#x7CB9;</strong>&#xFF0C;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x4E0D;&#x7528;&#x518D;&#x5173;&#x5FC3;&#x5982;&#x4F55;&#x5C06;&#x6570;&#x636E;&#x4FEE;&#x4FEE;&#x6539;&#x6539;&#x800C;&#x6EE1;&#x8DB3;&#x89C6;&#x56FE;&#x8981;&#x6C42;&#xFF0C;<strong>&#x53EA;&#x9700;&#x5173;&#x5FC3;&#x7EC4;&#x4EF6;&#x672C;&#x8EAB;&#x7684;&#x903B;&#x8F91;</strong>&#xFF0C;&#x4F8B;&#x5982;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#xFF0C;&#x7528;&#x6237;&#x4EA4;&#x4E92;&#x7B49;</li><li>&#x4E8C;&#x662F;&#x6570;&#x636E;&#x7684;&#x6D41;&#x52A8;<strong>&#x66F4;&#x53EF;&#x63A7;</strong>&#xFF0C;&#x5047;&#x5982;&#x540E;&#x7EED;&#x540E;&#x53F0;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x6709;&#x53D8;&#x52A8;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x505A;&#x7684;&#x53EA;&#x662F;&#x6539;&#x53D8;<code>handleCartData</code>&#x51FD;&#x6570;&#x91CC;&#x9762;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x4E0D;&#x7528;&#x6539;&#x52A8;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x7684;&#x903B;&#x8F91;&#x3002;<p><strong><em>&#x540E;&#x53F0;&#x6570;&#x636E;&#x2014;&#x2014;&gt;&#x62E6;&#x622A;&#x5904;&#x7406;&#x2014;&#x2014;&gt;&#x671F;&#x671B;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x2014;&#x2014;&gt;&#x7EC4;&#x4EF6;</em></strong></p></li></ul><p>&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x4E0D;&#x53EA;&#x662F;&#x540E;&#x53F0;&#x6570;&#x636E;&#x8FD4;&#x56DE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5176;&#x5B83;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x9700;&#x8981;&#x53D8;&#x52A8;&#x7684;&#x65F6;&#x5019;&#x90FD;&#x53EF;&#x4EE5;&#x505A;&#x4E00;&#x5C42;&#x6570;&#x636E;&#x62E6;&#x622A;&#xFF0C;&#x62E6;&#x622A;&#x7684;&#x65F6;&#x673A;&#x4E5F;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x8C03;&#x6574;&#xFF0C;&#x91CD;&#x70B9;&#x662F;&#x8981;&#x8BA9;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x672C;&#x8EAB;&#x4E0D;&#x5173;&#x5FC3;<strong>&#x6570;&#x636E;&#x4E0E;&#x89C6;&#x56FE;&#x662F;&#x5426;&#x5BF9;&#x5E94;&#xFF0C;&#x53EA;&#x4E13;&#x6CE8;&#x4E8E;&#x5185;&#x90E8;&#x4EA4;&#x4E92;&#x7684;&#x903B;&#x8F91;</strong>&#xFF0C;&#x8FD9;&#x4E5F;&#x5F88;&#x7B26;&#x5408;<code>react</code>&#x672C;&#x8EAB;&#x7684;&#x521D;&#x8877;&#xFF0C;&#x6570;&#x636E;&#x9A71;&#x52A8;&#x89C6;&#x56FE;</p><h5>connect&#x53EF;&#x4EE5;&#x505A;&#x66F4;&#x591A;&#x7684;&#x4E8B;&#x60C5;</h5><p><code>connect</code>&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;&#x662F;&#x7528;&#x6765;&#x8FDE;&#x63A5;<code>store</code>&#x3001;<code>actions</code>&#x548C;&#x7EC4;&#x4EF6;&#x7684;&#xFF0C;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x5C31;&#x53EA;&#x662F;&#x6839;&#x636E;&#x6837;&#x677F;&#x4EE3;&#x7801;&#x590D;&#x5236;&#x4E00;&#x4E0B;&#xFF0C;&#x6539;&#x6539;&#x7EC4;&#x4EF6;&#x5404;&#x81EA;&#x7684;<code>store</code>&#x3001;<code>actions</code>&#x3002;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x505A;&#x4E00;&#x4E9B;&#x522B;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default connect(({
  cart,
}) =&gt; ({
  couponData: cart.couponData,
  commoditys: cart.commoditys,
  editSkuData: cart.editSkuData
}), (dispatch) =&gt; ({
  // ...actions&#x7ED1;&#x5B9A;
}))(Cart)

// &#x7EC4;&#x4EF6;&#x91CC;
render () {
    const isShowCoupon = this.props.couponData.length !== 0
    return isShowCoupon &amp;&amp; &lt;Coupon /&gt;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(({
  cart,
}) =&gt; ({
  <span class="hljs-attr">couponData</span>: cart.couponData,
  <span class="hljs-attr">commoditys</span>: cart.commoditys,
  <span class="hljs-attr">editSkuData</span>: cart.editSkuData
}), (dispatch) =&gt; ({
  <span class="hljs-comment">// ...actions&#x7ED1;&#x5B9A;</span>
}))(Cart)

<span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x91CC;</span>
render () {
    <span class="hljs-keyword">const</span> isShowCoupon = <span class="hljs-keyword">this</span>.props.couponData.length !== <span class="hljs-number">0</span>
    <span class="hljs-keyword">return</span> isShowCoupon &amp;&amp; <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Coupon</span> /&gt;</span>
}</span></code></pre><p>&#x4E0A;&#x9762;&#x662F;&#x5F88;&#x666E;&#x901A;&#x7684;&#x4E00;&#x79CD;<code>connect</code>&#x5199;&#x6CD5;&#xFF0C;&#x7136;&#x540E;<code>render</code>&#x51FD;&#x6570;&#x6839;&#x636E;<code>couponData</code>&#x91CC;&#x662F;&#x5426;&#x6570;&#x636E;&#x6765;&#x6E32;&#x67D3;&#x3002;&#x8FD9;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;<code>this.props.couponData.length !== 0</code>&#x8FD9;&#x4E2A;&#x5224;&#x65AD;&#x4E22;&#x5230;<code>connect</code>&#x91CC;&#xFF0C;&#x8FBE;&#x6210;&#x4E00;&#x79CD;<code>computed</code>&#x7684;&#x6548;&#x679C;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default connect(({
  cart,
}) =&gt; {
  const { couponData, commoditys, editSkuData  } = cart
  const isShowCoupon = couponData.length !== 0
  return {
    isShowCoupon,
    couponData,
    commoditys,
    editSkuData
"}}", (dispatch) =&gt; ({
  // ...actions&#x7ED1;&#x5B9A;
}))(Cart)

// &#x7EC4;&#x4EF6;&#x91CC;
render () {
    return this.props.isShowCoupon &amp;&amp; &lt;Coupon /&gt;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(({
  cart,
}) =&gt; {
  <span class="hljs-keyword">const</span> { couponData, commoditys, editSkuData  } = cart
  <span class="hljs-keyword">const</span> isShowCoupon = couponData.length !== <span class="hljs-number">0</span>
  <span class="hljs-keyword">return</span> {
    isShowCoupon,
    couponData,
    commoditys,
    editSkuData
"}}", (dispatch) =&gt; ({
  <span class="hljs-comment">// ...actions&#x7ED1;&#x5B9A;</span>
}))(Cart)

<span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x91CC;</span>
render () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.props.isShowCoupon &amp;&amp; <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Coupon</span> /&gt;</span>
}</span></code></pre><p>&#x53EF;&#x4EE5;&#x89C1;&#x5230;&#xFF0C;&#x5728;<code>connect</code>&#x91CC;&#x5B9A;&#x4E49;&#x4E86;<code>isShowCoupon</code>&#x53D8;&#x91CF;&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;&#x6839;&#x636E;<code>couponData</code>&#x6765;&#x8FDB;&#x884C;<code>computed</code>&#x7684;&#x6548;&#x679C;</p><p>&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x6570;&#x636E;&#x62E6;&#x622A;&#x5904;&#x7406;&#x3002;&#x9664;&#x4E86;<code>computed</code>&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x5176;&#x5B83;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5177;&#x4F53;&#x5C31;&#x7531;&#x5404;&#x4F4D;&#x770B;&#x5B98;&#x81EA;&#x7531;&#x53D1;&#x6325;&#x4E86;</p><h3 id="articleHeader3">&#x4E00;&#x4E9B;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5730;&#x65B9;</h3><p>&#x90A3;taro&#xFF0C;&#x6216;&#x8005;&#x662F;&#x5C0F;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#xFF0C;&#x6709;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5730;&#x65B9;&#xFF1F;&#x5F53;&#x7136;&#x6709;&#xFF0C;&#x8D70;&#x8FC7;&#x7684;&#x5F2F;&#x8DEF;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x975E;&#x5E38;&#x591A;&#x4E86;</p><h5>&#x9875;&#x9762;&#x6808;&#x53EA;&#x6709;10&#x5C42;</h5><p>&#x4F30;&#x8BA1;&#x662F;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x7684;&#x6570;&#x636E;&#x5728;&#x5C0F;&#x7A0B;&#x5E8F;&#x5185;&#x90E8;&#x90FD;&#x6709;&#x7F13;&#x5B58;&#xFF0C;&#x6240;&#x4EE5;&#x505A;&#x4E86;10&#x5C42;&#x7684;&#x9650;&#x5236;&#x3002;&#x5E26;&#x6765;&#x7684;&#x95EE;&#x9898;&#x5C31;&#x662F;&#x5047;&#x5982;&#x9875;&#x9762;&#x5B58;&#x5728;&#x5FAA;&#x73AF;&#x8DF3;&#x8F6C;&#xFF0C;&#x5373;A&#x9875;&#x9762;&#x53EF;&#x4EE5;&#x8DF3;&#x5230;B&#x9875;&#x9762;&#xFF0C;B&#x9875;&#x9762;&#x4E5F;&#x53EF;&#x4EE5;&#x8DF3;&#x5230;A&#x9875;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x7528;&#x6237;&#x4ECE;A&#x8FDB;&#x5165;&#x4E86;B&#xFF0C;&#x60F3;&#x8FD4;&#x56DE;A&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5F80;&#x5F80;&#x662F;&#x76F4;&#x63A5;&#x5728;B&#x9875;&#x9762;&#x91CC;&#x70B9;&#x51FB;&#x8DF3;&#x8F6C;&#x5230;A&#xFF0C;<strong>&#x800C;&#x4E0D;&#x662F;&#x70B9;&#x8FD4;&#x56DE;</strong>&#x56DE;&#x5230;A&#xFF0C;&#x5982;&#x6B64;&#x4E00;&#x6765;&#xFF0C;10&#x5C42;&#x5F88;&#x5FEB;&#x5C31;&#x7A81;&#x7834;&#x4E86;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5BF9;<code>navigateTo</code>&#x51FD;&#x6570;&#x505A;&#x4E86;&#x4E00;&#x5C42;&#x5C01;&#x88C5;&#xFF0C;&#x9632;&#x6B62;&#x6EA2;&#x51FA;</p><h5>&#x9875;&#x9762;&#x5185;&#x5BB9;&#x6709;&#x7F13;&#x5B58;</h5><p>&#x4E0A;&#x9762;&#x8BF4;&#x5230;&#xFF0C;&#x9875;&#x9762;&#x5185;&#x5BB9;&#x6709;&#x7F13;&#x5B58;&#x3002;&#x6240;&#x4EE5;&#x5047;&#x5982;&#x67D0;&#x4E2A;&#x9875;&#x9762;&#x662F;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x6570;&#x636E;&#x6E32;&#x67D3;&#x89C6;&#x56FE;&#xFF0C;&#x65B0;&#x6E32;&#x67D3;&#x65F6;&#x4F1A;&#x6709;&#x4E0A;&#x4E00;&#x6B21;&#x6E32;&#x67D3;&#x7684;&#x7F13;&#x5B58;&#xFF0C;&#x5BFC;&#x81F4;&#x9875;&#x9762;&#x770B;&#x8D77;&#x6765;&#x6709;&#x4E2A;&#x95EA;&#x70C1;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x975E;&#x5E38;&#x4E0D;&#x597D;&#x3002;&#x5176;&#x5B9E;&#x89E3;&#x51B3;&#x7684;&#x529E;&#x6CD5;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x6BCF;&#x6B21;&#x5728;<code>componentWillUnmount</code>&#x751F;&#x547D;&#x5468;&#x671F;&#x4E2D;&#x6E05;&#x7406;&#x4E00;&#x4E0B;&#x5F53;&#x524D;&#x9875;&#x9762;&#x7684;&#x6570;&#x636E;&#x5C31;&#x597D;&#x4E86;&#x3002;&#x5C0F;&#x7A0B;&#x5E8F;&#x8BF4;&#x5230;&#x5E95;&#x4E0D;&#x662F;h5&#xFF0C;&#x4E0D;&#x4F1A;&#x8BF4;&#x6BCF;&#x6B21;&#x8FDB;&#x5165;&#x9875;&#x9762;&#x5C31;&#x4F1A;&#x5237;&#x65B0;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x79BB;&#x5F00;&#x5C31;&#x9500;&#x6BC1;&#xFF0C;&#x5237;&#x65B0;&#xFF0C;&#x6E05;&#x7406;&#x6570;&#x636E;&#x7684;&#x52A8;&#x4F5C;&#x90FD;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x518D;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#x91CC;&#x4E3B;&#x52A8;&#x89E6;&#x53D1;</p><h5>&#x4E0D;&#x80FD;&#x968F;&#x65F6;&#x5730;&#x76D1;&#x542C;&#x9875;&#x9762;&#x6EDA;&#x52A8;&#x4E8B;&#x4EF6;</h5><p>&#x9875;&#x9762;&#x7684;&#x6EDA;&#x52A8;&#x4E8B;&#x4EF6;&#x53EA;&#x80FD;&#x901A;&#x8FC7;<code>onPageScroll</code>&#x6765;&#x76D1;&#x542C;&#xFF0C;&#x6240;&#x4EE5;&#x5F53;&#x6211;&#x60F3;&#x5728;&#x7EC4;&#x4EF6;&#x91CC;&#x8FDB;&#x76D1;&#x542C;&#x64CD;&#x4F5C;&#x65F6;&#xFF0C;&#x8981;&#x5C06;&#x8BE5;&#x90E8;&#x5206;&#x7684;&#x903B;&#x8F91;&#x63D0;&#x524D;&#x5230;<code>onPageScroll</code>&#x51FD;&#x6570;&#xFF0C;&#x63D0;&#x9AD8;&#x4E86;&#x62BD;&#x8C61;&#x6210;&#x672C;&#x3002;&#x4F8B;&#x5982;&#x6211;&#x9700;&#x8981;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#x6EDA;&#x52A8;&#x5230;&#x67D0;&#x4E2A;&#x4F4D;&#x7F6E;&#x5C31;&#x5438;&#x9876;&#x7684;<code>tab</code>&#xFF0C;&#x672C;&#x6765;&#x53EF;&#x4EE5;&#x5728;<code>tab</code>&#x5185;&#x90E8;&#x5904;&#x7406;&#x7684;&#x903B;&#x8F91;&#x88AB;&#x63D0;&#x524D;&#x4E86;&#xFF0C;&#x51CF;&#x5C11;&#x4E86;&#x5176;&#x53EF;&#x590D;&#x7528;&#x6027;</p><h5>taro&#x5F00;&#x53D1;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5730;&#x65B9;</h5><p>&#x672C;&#x6765;&#x4E5F;&#x60F3;&#x8BE6;&#x7EC6;&#x63CF;&#x8FF0;&#x4E0B;&#x7684;&#xFF0C;&#x4E0D;&#x8FC7;&#x5728;&#x6211;&#x4EEC;&#x51E0;&#x4F4D;&#x5927;&#x4F6C;&#x7684;&#x52AA;&#x529B;&#xFF0C;&#x52A0;&#x73ED;&#x52A0;&#x70B9;&#x4E0B;&#xFF0C;&#x5DF2;&#x7ECF;&#x5F00;&#x53D1;&#x51FA;eslint&#x63D2;&#x4EF6;&#xFF0C;&#x53CA;&#x8865;&#x5145;&#x5B8C;&#x6574;&#x4E86;taro<a href="https://nervjs.github.io/taro/" rel="nofollow noreferrer" target="_blank">&#x6587;&#x6863;</a>&#x3002;&#x5927;&#x5BB6;&#x53EA;&#x8981;&#x9075;&#x5FAA;eslint&#x63D2;&#x4EF6;&#x89C4;&#x8303;&#xFF0C;&#x67E5;&#x770B;&#x6587;&#x6863;&#xFF0C;&#x5E94;&#x8BE5;&#x4E0D;&#x4F1A;&#x6709;&#x592A;&#x5927;&#x95EE;&#x9898;&#xFF0C;&#x6709;&#x95EE;&#x9898;&#x6B22;&#x8FCE;&#x63D0;issue</p><h3 id="articleHeader4">&#x603B;&#x7ED3;</h3><p>&#x603B;&#x7684;&#x6765;&#x8BF4;&#xFF0C;&#x7528;taro&#x6765;&#x5F00;&#x53D1;&#x5C0F;&#x7A0B;&#x5E8F;&#x4F53;&#x9A8C;&#x8FD8;&#x662F;&#x5F88;&#x4E0D;&#x9519;&#x7684;&#xFF0C;&#x6700;&#x91CD;&#x8981;&#x7684;&#x662F;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;jsx&#x5199;&#x5C0F;&#x7A0B;&#x5E8F;&#x4E86;&#xFF01;&#xFF01;&#xFF01;&#x4F5C;&#x4E3A;react&#x7C89;&#x7684;&#x4E00;&#x5458;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x76F8;&#x5F53;&#x7684;&#x5174;&#x594B;&#x4E86;~</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
新的小程序开发框架？- Taro的深度实践体验

## 原文链接
[https://segmentfault.com/a/1190000015432413](https://segmentfault.com/a/1190000015432413)

