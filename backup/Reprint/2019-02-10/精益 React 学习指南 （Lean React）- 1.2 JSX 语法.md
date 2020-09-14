---
title: '精益 React 学习指南 （Lean React）- 1.2 JSX 语法' 
date: 2019-02-10 2:30:42
hidden: true
slug: 0azo51qnwu19
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://segmentfault.com/a/1190000005136764">书籍完整目录</a></p></blockquote>
<h1 id="articleHeader0">1.2 JSX 语法</h1>
<p><span class="img-wrap"><img data-src="/img/bVvKLR" src="https://static.alili.tech/img/bVvKLR" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>官方文档 <a href="https://facebook.github.io/react/docs/jsx-in-depth.html" rel="nofollow noreferrer" target="_blank">https://facebook.github.io/react/docs/jsx-in-depth.html</a></p></blockquote>
<p>JSX 语法听上去很讨厌，但当真正使用的时候会发现，JSX 的写法在组件的组合和属性的传递上提供了非常灵活的解决方案。   </p>
<p>在学习本节的时候，希望读者在阅读的同时能够实际编码体验 JSX ，写代码的意思是真的要写.代.码。</p>
<h2 id="articleHeader1">1.2.1 准备 React 运行环境</h2>
<p>为了快速开始 JSX 的学习，我们可以通过如下几种方式快速进入 React 开发环境</p>
<h3 id="articleHeader2">方式一：Babel REPL</h3>
<p><strong><a href="https://babeljs.io/repl/" rel="nofollow noreferrer" target="_blank">Babel REPL</a></strong></p>
<p>直接在 REPL 中写 JSX 语法，可以实时的查看编译后的结果。</p>
<h3 id="articleHeader3">方式二：JSFiddle</h3>
<p>在线模式 <a href="https://jsfiddle.net/reactjs/69z2wepo/" rel="nofollow noreferrer" target="_blank">React Fiddle</a><button class="btn btn-xs btn-default ml10 preview" data-url="reactjs/69z2wepo/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader4">方式三：本地开发</h3>
<p>第一步：打开编辑器，新建一个 <code>hello-react.html</code> 文件 <br>第二步：粘贴 Hello, world 代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;UTF-8&quot; />
    <title>Hello React!</title>
    <script src=&quot;http://facebook.github.io/react/js/react.js&quot;></script>
    <script src=&quot;http://facebook.github.io/react/js/react-dom.js&quot;></script>
    <script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js&quot;></script>
  </head>
  <body>
    <div id=&quot;example&quot;></div>
    <script type=&quot;text/babel&quot;>
        var Hello = React.createClass({
          render: function render() {
            return <div>Hello {this.props.name}</div>;
          }
        });

        ReactDOM.render(
          <Hello name=&quot;World&quot; />,
          document.getElementById('example')
        );
    </script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello React!<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://facebook.github.io/react/js/react.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://facebook.github.io/react/js/react-dom.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> Hello = React.createClass({
          <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
          }
        });

        ReactDOM.render(
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Hello</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"World"</span> /&gt;</span>,
          document.getElementById('example')
        );
    </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader5">方式四：clone Github hello-world 分支代码</h3>
<p><a href="https://github.com/leanklass/leanreact/tree/hello-world" rel="nofollow noreferrer" target="_blank">https://github.com/leanklass/leanreact/tree/hello-world</a></p>
<h2 id="articleHeader6">1.2.2 JSX 语法</h2>
<h3 id="articleHeader7">JSX 本质</h3>
<p>创建 JSX 语法的本质目的是为了使用基于 xml 的方式表达组件的嵌套，保持和 HTML 一致的结构，语法上除了在描述组件上比较特别以外，其它和普通的 Javascript 没有区别。 并且最终所有的 JSX 都会编译为原生 Javascript。</p>
<p>需要提醒读者的是，React 的很多例子都是通过 ES6 来写的， 但这并不是 JSX 语法，后面我们会有单独的一小节讲解 ES6 的基本语法，不过目前为止我们先将跟多精力放在 JSX 上。</p>
<h3 id="articleHeader8">xml 基本规则</h3>
<p>JSX 构建组件的规则和 xml 规则一致</p>
<h4>嵌套规则</h4>
<p>标签可以任意的嵌套</p>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  return <p>
           text content 
           <ul>
             <li>....</li>
             <li>....</li>
           </ul>
         </p>
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">function render() {
  return <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
           text content 
           <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>....<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>....<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
         <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
}
</code></pre>
<h4>标签闭合</h4>
<p>标签必须严格闭合，否则无法编译通过</p>
<p>自闭合：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  return <input type=&quot;text&quot;/>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">function render() {
  return <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>/&gt;</span>
}</code></pre>
<p>标签闭合:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  return <p>....</p>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">function render() {
  return <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>....<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
}</code></pre>
<h3 id="articleHeader9">JSX 组件</h3>
<p>JSX 组件分为 HTML 组件和 React 组件</p>
<p>HTML 组件就是 HTML 中的原生标签， 如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
  return  <p> hello, React World </p>
}

function render() {
  return <ul> 
            <li>list item 1</li>
            <li>list item 2</li>
         </ul>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">function render() {
  return  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> hello, React World <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
}

function render() {
  return <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span> 
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>list item 1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>list item 2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
         <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
}</code></pre>
<p>React 组件就是自定义的组件，如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义一个自定义组件
var CustomComponnet = React.createClass({
  render: function() {
    return <div> custom component </div>
  }
});

// 使用自定义组件
function render() {
    return <p> <CustomComponent/> </p>
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">// 定义一个自定义组件
var CustomComponnet = React.createClass({
  render: function() {
    return <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span> custom component <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  }
});

// 使用自定义组件
function render() {
    return <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">CustomComponent</span>/&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
}
</code></pre>
<h3 id="articleHeader10">组件属性</h3>
<p>和 html 一样，JSX 中组件也有属性，传递属性的方式也相同</p>
<p>对于 HTML 组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function render() {
   return  <p title=&quot;title&quot; >hello, React, world </p>
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> function render() {
   return  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"title"</span> &gt;</span>hello, React, world <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
 }</code></pre>
<p>如果是 React 组件可以定义自定义属性，传递自定义属性的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function render() {
    return <p> <CustomComponent customProps=&quot;data&quot;/> </p>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  function render() {
    return <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">CustomComponent</span> <span class="hljs-attr">customProps</span>=<span class="hljs-string">"data"</span>/&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  }
}</code></pre>
<p>属性即可以是字符串，也可以是任意的 Javascript 变量<br>, 传递方式是将变量用花括号， eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function render() {
    var data = {a: 1, b:2};
    return <p> <CustomComponent customProps={data}/> </p>
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  function render() {
    var data = {a: 1, b:2};
    return <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">CustomComponent</span> <span class="hljs-attr">customProps</span>=<span class="hljs-string">{data}/</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  }</code></pre>
<p>需要注意的地方上，属性的写法上和 HTML 存在区别，在写 JSX 的时候，所有的属性都是驼峰式的写法，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function render() {
    return  <div className=&quot;...&quot;>
                <label htmlFor=&quot;...&quot;></label>
                <input onChange=&quot;...&quot;/>
            </div>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">function render() {
    return  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"..."</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">htmlFor</span>=<span class="hljs-string">"..."</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">"..."</span>/&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
}</code></pre>
<p>而原生的写法为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <div class=&quot;...&quot;>
        <label for=&quot;...&quot;></label>
        <input onchange=&quot;...&quot;/>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"..."</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"..."</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onchange</span>=<span class="hljs-string">"..."</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>主要是出于标准的原因，驼峰式是 Javascript 的标准写法，并且 React 底层是将属性直接对应到原生 DOM 的属性，而原生 DOM 的属性是驼峰式的写法，这里也可以理解为什么类名不是 class 而是 className 了, 又因为 class 和 for 还是 js 关键字，所以 jsx 中:</p>
<ul>
<li><p><strong>class =&gt; className</strong></p></li>
<li><p><strong>for   =&gt; htmlFor</strong></p></li>
</ul>
<p>除此之外比较特殊的地方是 <code>data-*</code> 和 <code>aria-*</code> 两类属性是和 HTML 一致的。</p>
<h3 id="articleHeader11">JSX 花括号</h3>
<h4>显示文本</h4>
<p>很多情况，我们需要将 JS 中的文本直接显示，做法和显示变量属性一样，用花括号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function render() {
    var text = &quot;Hello, World&quot;
    return <p> {text} </p>
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  function render() {
    var text = "Hello, World"
    return <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> {text} <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  }</code></pre>
<h4>运算</h4>
<p>花括号里边实际上除了变量以外，可以是一段 JS 表达式，我们可以利用花括号做简单的运算：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  funtion render() {
    var text = text;
    var isTrue = false;
    var arr = [1, 2, 3];
    return <p>
      {text}
      {isTrue ? &quot;true&quot; : &quot;false&quot;}

      {arr.map(function(it) {
        return <span> {it} </span>
      })}

      </p>
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  funtion render() {
    var text = text;
    var isTrue = false;
    var arr = [1, 2, 3];
    return <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
      {text}
      {isTrue ? "true" : "false"}

      {arr.map(function(it) {
        return <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span> {it} <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      })}

      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  }</code></pre>
<h3 id="articleHeader12">JSX 注释</h3>
<p>注释的写法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function render() {
    return <p>
            /* 这里是注释内容 */
           </p>
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  function render() {
    return <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            /* 这里是注释内容 */
           <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  }
</code></pre>
<h3 id="articleHeader13">限制规则</h3>
<p>render 方法返回的组件必须是有且只有一个根组件，错误情况的例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 无法编译通过，JSX 会提示编译错误
  function render() {
    return (<p> .... </p>
           <p> .... </p>)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  // 无法编译通过，JSX 会提示编译错误
  function render() {
    return (<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> .... <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> .... <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>)
  }</code></pre>
<h3 id="articleHeader14">组件命名空间</h3>
<p>JSX 可以通过命名空间的方式使用组件, 通过命名空间的方式可以解决相同名称不同用途组件冲突的问题。</p>
<p>如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function render() {
    return <p>
           <CustomComponent1.SubElement/>
           <CustomComponent2.SubElement/>
           </p>
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  function render() {
    return <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">CustomComponent1.SubElement</span>/&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">CustomComponent2.SubElement</span>/&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  }</code></pre>
<h2 id="articleHeader15">1.2.3 理解 JSX</h2>
<h3 id="articleHeader16">JSX 的编译方式</h3>
<p>JSX 的写法最终会被编译成原生的 Javascript。 如果你愿意的话，也可以直接写编译后的 JS, 不过最好是写 JSX, 因为 JSX 的目的就是为了简化写法，并保持和 HTML 相同的开发体验。</p>
<p>JSX 具体的编译方式有两种</p>
<ol>
<li><p>在 HTML 中引入 babel 编译器, 如上 Hello World 程序中一样。</p></li>
<li><p>离线编译 JSX，通过 babel 编译 JSX，细节我们将在第二章中讲解。</p></li>
</ol>
<h3 id="articleHeader17">JSX 到 JS 的转化</h3>
<p>Hello World 程序转化为 JS 的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var Hello = React.createClass({
    displayName: 'Hello',
    render: function() {
      return React.createElement(&quot;div&quot;, null, &quot;Hello &quot;, this.props.name);
    }
  });

  ReactDOM.render(
    React.createElement(Hello, {name: &quot;World&quot;}),
    document.getElementById('container')
  );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">var</span> Hello = React.createClass({
    <span class="hljs-attr">displayName</span>: <span class="hljs-string">'Hello'</span>,
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> React.createElement(<span class="hljs-string">"div"</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">"Hello "</span>, <span class="hljs-keyword">this</span>.props.name);
    }
  });

  ReactDOM.render(
    React.createElement(Hello, {<span class="hljs-attr">name</span>: <span class="hljs-string">"World"</span>}),
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>)
  );</code></pre>
<p>可以看出：</p>
<p>&lt;Hello .../&gt;  &lt;=&gt; React.createElement(Hello,  ....) </p>
<p>xml 的写法实际上是调用 React 的工厂方法 createElement。</p>
<p>当理解了 JSX 最终会编译为 JS 就可以理解 JSX 的一些特性如命名空间，组件实际上就是一个 Javascript 对象，命名空间下的组件相当于对象的属性</p>
<h2 id="articleHeader18">1.2.4 实例练习：通过数据渲染 TODOMVC 代办事项列表</h2>
<p><a href="http://todomvc.com" rel="nofollow noreferrer" target="_blank">TODOMVC</a> 以代办事项列表为需求模型，包含了各种框架的实现。 本例子的目的为了让读者能够切身的体会 JSX 的使用方法。</p>
<h3 id="articleHeader19">问题需求</h3>
<p>根据一个 JSON 对象，用 React JSX 的方式渲染出 <a href="http://todomvc.com/examples/react/#/" rel="nofollow noreferrer" target="_blank">TODOMVC</a> 页面:</p>
<p><span class="img-wrap"><img data-src="/img/bVvLki" src="https://static.alili.tech/img/bVvLki" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>JSON 对象如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var todolist = {
    name: &quot;todos&quot;,
    todos: [{
            completed: false,
            title: 'finish exercise'
        }, {
            completed: false,
            title: 'lean jsx'
        }, {
            completed: true,
            title: 'lean react'
        }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> todolist = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"todos"</span>,
    <span class="hljs-attr">todos</span>: [{
            <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">title</span>: <span class="hljs-string">'finish exercise'</span>
        }, {
            <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">title</span>: <span class="hljs-string">'lean jsx'</span>
        }, {
            <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-attr">title</span>: <span class="hljs-string">'lean react'</span>
        }]
}</code></pre>
<p>修改 hello world index.html 中的代码，为了简化问题， 我们可以直接复制 TODOMVC 中的 HTML 和 CSS 。</p>
<h3 id="articleHeader20">Tips</h3>
<ol>
<li><p>class 要写为 className</p></li>
<li><p>input 标签未闭合</p></li>
<li><p>数组遍历过后要添加 key 属性，否则会提示 error 信息（在组件章节会讲解）</p></li>
<li><p><a href="http://facebook.github.io/react/html-jsx.html" rel="nofollow noreferrer" target="_blank">html 转 JSX工具</a>， Facebook 提供了 html 转 JSX 组件的工具，可以直接复制 html 转为 JSX 组件</p></li>
</ol>
<h3 id="articleHeader21">参考答案</h3>
<p><a href="https://github.com/leanklass/leanreact/tree/jsx" rel="nofollow noreferrer" target="_blank">https://github.com/leanklass/leanreact/tree/jsx</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精益 React 学习指南 （Lean React）- 1.2 JSX 语法

## 原文链接
[https://segmentfault.com/a/1190000005145610](https://segmentfault.com/a/1190000005145610)

