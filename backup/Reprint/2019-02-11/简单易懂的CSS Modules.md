---
title: '简单易懂的CSS Modules' 
date: 2019-02-11 2:30:49
hidden: true
slug: habbobsjbh
categories: [reprint]
---

{{< raw >}}

                    
<p>不要误会，CSS Modules可不是在说“css模块化”这个好像在某些地方见过的词，它其实是特指一种近期才出现的技术手段。</p>
<p>什么技术手段呢？请待后文说明。</p>
<h2 id="articleHeader0">层叠样式表</h2>
<p>我们知道，css的全名叫做层叠样式表，这个“层叠”到底是什么意思呢？</p>
<p>有一种解释是，如果你先写了一条样式规则（选手1）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".title {
    color: silver;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.title</span> {
    <span class="hljs-attribute">color</span>: silver;
}</code></pre>
<p>然后又在后边写了一条类似的（选手2）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".title {
    color: gold;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.title</span> {
    <span class="hljs-attribute">color</span>: gold;
}</code></pre>
<p>因为名字相同，选手2就会和选手1打起来（让你丫冒充我！）。结果是选手2获胜，class名为<code>title</code>的元素，最终的<code>color</code>值为<code>gold</code>。</p>
<p>css里就像这样，随时可能一言不和就发生战争，结果输掉的一方就会被胜利的一方所覆盖。“层叠”一词可以说形象地描述了这个过程。</p>
<p>那么，为什么会有这样的层叠（zhàn zhēng ）呢？</p>
<h2 id="articleHeader1">css的作用域问题</h2>
<p>在javascript里，可以做到这样的搭配：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var title = &quot;silver&quot;;

(function(){
    var title = &quot;gold&quot;;
    console.log(title); // gold
}());

console.log(title); // silver" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> title = <span class="hljs-string">"silver"</span>;

(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> title = <span class="hljs-string">"gold"</span>;
    <span class="hljs-built_in">console</span>.log(title); <span class="hljs-comment">// gold</span>
}());

<span class="hljs-built_in">console</span>.log(title); <span class="hljs-comment">// silver</span></code></pre>
<p>利用javascript的函数作用域，两位同样名为<code>title</code>的选手可以友好相处。</p>
<p>但回到css里的样式规则，情况就完全不是这么回事了。</p>
<p>css不是程序语言，但如果说要给它加一个作用域的概念的话，那就是：只有全局作用域。</p>
<p>无论分拆为多少个css文件，无论用怎样的方式引入，<strong>所有的样式规则都位于同一作用域，只要选择符近似，就有发生覆盖的可能</strong>。</p>
<h2 id="articleHeader2">减少相互影响的策略</h2>
<p>为减少相互影响，避免预料之外的样式覆盖，我们一直以来想过很多办法。</p>
<p>比如你接手一个别人留下来的旧项目，接下来要新增一个标题元素的时候，你会有意识地不去使用<code>.title</code>这样模糊的class名，因为它太容易重名了。最终，你用的名称可能是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".module-sp-title {
    color: deepskyblue;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.module-sp-title</span> {
    <span class="hljs-attribute">color</span>: deepskyblue;
}</code></pre>
<p>即使你决定要用<code>.title</code>这个名字，你也会加上包含选择符作为限定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".module-1 .title { 
    font-size: 18px;
}
/* ... */
.module-2 .title {
    font-size: 14px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.module-1</span> <span class="hljs-selector-class">.title</span> { 
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
}
<span class="hljs-comment">/* ... */</span>
<span class="hljs-selector-class">.module-2</span> <span class="hljs-selector-class">.title</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
}</code></pre>
<p>其中<code>.module-1</code>和<code>.module-2</code>的名字应该是唯一的，这样的代码在组件化（模块化）的开发风格里很常见。</p>
<p>此外，一些有名的css理论，如<a href="https://smacss.com/" rel="nofollow noreferrer" target="_blank">SMACSS</a>，会建议你为所有布局样式使用<code>l-</code>或<code>layout-</code>的前缀，以示区分。</p>
<p>类似的做法还有很多，但归结起来，都是在尝试<strong>提供一种合理的命名约定</strong>。而合理的命名约定，的确是组织css代码的有效策略。</p>
<p>现在，我们有了新的可用策略，CSS Modules就是其中之一。</p>
<h2 id="articleHeader3">技术流的模块化</h2>
<p><strong><a href="https://github.com/css-modules/css-modules" rel="nofollow noreferrer" target="_blank">CSS Modules</a></strong>是一种技术流的组织css代码的策略，它将为css提供默认的局部作用域。</p>
<p>CSS Modules是如何做到的呢？来看一个CSS Modules的简单例子吧。</p>
<p>有这样的一个html元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2 id=&quot;example_title&quot; class=&quot;title&quot;>a title for CSS Modules</h2>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example_title"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>a title for CSS Modules<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></code></pre>
<p>按照普通css的写法，我们可以这样为它添加样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".title {
    background-color: snow;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.title</span> {
    <span class="hljs-attribute">background-color</span>: snow;
}</code></pre>
<p>现在我们改用CSS Modules。首先，css保持不变。然后，修改html的写法。不再这样直接写html，而是改为在javascript文件里动态添加，这样做（css文件名为<code>main.css</code>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var styles = require(&quot;./main.css&quot;);

var el = document.getElementById(&quot;example_title&quot;);
el.outerHTML = '<h2 class=&quot;' + styles.title + '&quot;>a title for CSS Modules</h2>';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> styles = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./main.css"</span>);

<span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"example_title"</span>);
el.outerHTML = <span class="hljs-string">'&lt;h2 class="'</span> + styles.title + <span class="hljs-string">'"&gt;a title for CSS Modules&lt;/h2&gt;'</span>;</code></pre>
<p>咦，<code>require</code>了一个css文件？对的，所以要用到webpack。编译后，html和css会变成这样：</p>
<p><span class="img-wrap"><img data-src="/img/bVu6xE" src="https://static.alili.tech/img/bVu6xE" alt="CSS Modules的示例" title="CSS Modules的示例" style="cursor: pointer;"></span></p>
<p>看到这样不太美观的class名你大概就明白了，CSS Modules无法改变css全局作用域的本性，它是依靠动态生成class名这一手段，来实现局部作用域的。显然，这样的class名就可以是唯一的，不管原本的css代码写得有多随便，都可以这样转换得到不冲突的css代码。</p>
<p>模拟的局部作用域也没有关系，它是可靠的。</p>
<p>这个CSS Modules的例子说完了，但你一定跟我最初看到的时候一样有很多问题。</p>
<h2 id="articleHeader4">CSS Modules的应用细节</h2>
<h3 id="articleHeader5">如何启用CSS Modules</h3>
<p>“webpack编译css我也用过，怎么我用的时候不长这样？”</p>
<p>一般来说，<code>require</code>一个css文件的写法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./main.css&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">"./main.css"</span>);</code></pre>
<p>但在前面的例子中，用了<code>var styles = require("./main.css");</code>的写法。这就好像是在说，我要这个css文件里的样式是局部的，然后我根据需要自行取用。</p>
<p>在项目里应用CSS Modules有很多方法，目前比较常用的是使用webpack的<a href="https://github.com/webpack/css-loader#css-modules" rel="nofollow noreferrer" target="_blank">css-loader</a>。在webpack配置文件里写<code>css-loader?modules</code>就可以开启CSS Modules，例如前面的例子所用的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    loaders: [{
        test: /\.css$/,
        loader: 'style!css?modules'
    }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">loaders</span>: [{
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'style!css?modules'</span>
    }]
}</code></pre>
<p>才发现一直用着的css-loader原来有这功能？其实，CSS Modules确实是一个后来才并入css-loader的新功能。</p>
<h3 id="articleHeader6">自定义生成的class名</h3>
<p>“名字都这样了，还怎么调试？”</p>
<p>为css-loader增加<code>localIdentName</code>参数，是可以指定生成的名字。<code>localIdentName</code>的默认值是<code>[hash:base64]</code>，一般开发环境建议用类似这样的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.css$/,
    loader: 'style!css?modules&amp;localIdentName=[name]__[local]___[hash:base64:5]'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'style!css?modules&amp;localIdentName=[name]__[local]___[hash:base64:5]'</span>
}</code></pre>
<p>同样应用到前面的例子里，这时候就会变成这样的结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVu6xF" src="https://static.alili.tech/img/bVu6xF" alt="CSS Modules指定名字" title="CSS Modules指定名字" style="cursor: pointer;"></span></p>
<p>这样是不是要有意义多了？</p>
<p>如果是线上环境，可以考虑用更短的名字进一步减小css文件大小。</p>
<h3 id="articleHeader7">CSS Modules下的html</h3>
<p>（看了前面例子里的<code>el.outerHTML = ...</code>后）</p>
<p>“什么，outerHTML？class名还要拼接？你家html才这么写呢！”</p>
<p>很遗憾，CSS Modules官方的例子，也是这个意思：<strong>要使用CSS Modules，必须想办法把变量风格的class名注入到html中</strong>。也就是说，html模板系统是必需的，也正是如此，相比普通css的情况，CSS Modules的html写起来要更为费劲。</p>
<p>如果你搜一下CSS Modules的demo，可以发现大部分都是基于React的。显然，虚拟DOM风格的React，搭配CSS Modules会很容易（ES6）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import styles from './ScopedSelectors.css';

import React, { Component } from 'react';

export default class ScopedSelectors extends Component {

  render() {
    return (
      <div className={ styles.root }>
        <p className={ styles.text }>Scoped Selectors</p>
      </div>
    );
  }

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">'./ScopedSelectors.css'</span>;

<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ScopedSelectors</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span> <span class="hljs-attr">styles.root</span> }&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span> <span class="hljs-attr">styles.text</span> }&gt;</span>Scoped Selectors<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }

};</code></pre>
<p>如果不使用React，还是那句话，只要有办法把变量风格的class名注入到html中，就可以用CSS Modules。原始的字符串拼接的写法显然很糟糕，但我们可以借助各种模板引擎和编译工具做一些改进。下面请看一个用<a href="http://jade-lang.com/" rel="nofollow noreferrer" target="_blank">Jade</a>的参考示例。</p>
<p>想象一下你有一个用普通css的页面，但你想在一小块区域使用CSS Modules。这一块区域在一个容器元素里：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;module_sp_container&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"module_sp_container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>然后用jade来写html（关联的css文件为<code>module_sp.css</code>）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- styles = require(&quot;./module_sp.css&quot;);
h2(class=styles.title) a title for CSS Modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jade">- styles = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./module_sp.css"</span>);
h2(<span class="hljs-class"><span class="hljs-keyword">class</span></span>=styles.title) a title <span class="hljs-keyword">for</span> CSS Modules</code></pre>
<p>接下来，仍然是在javascript里添加这段jade生成的html：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var el = document.getElementById(&quot;module_sp_container&quot;);
var template = require(&quot;./main.jade&quot;);
el.innerHTML = template();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"module_sp_container"</span>);
<span class="hljs-keyword">var</span> template = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./main.jade"</span>);
el.innerHTML = template();</code></pre>
<p>最后，记得在css-loader启用CSS Modules的同时，增加jade-loader：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.jade$/,
    loader: 'jade'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jade$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'jade'</span>
}</code></pre>
<p>编译运行，就可以得到想要的结果。除Jade以外，还有些其他CSS Modules的html应用方案，推荐参考<a href="https://github.com/zhouwenbin/blog/issues/15" rel="nofollow noreferrer" target="_blank">github上的这篇issue</a>。</p>
<p>目前CSS Modules还在发展中，而且也在考虑改进CSS Modules下的html写作体验。CSS Modules团队成员有提到一个叫<a href="https://github.com/geelen/css-modules-injector" rel="nofollow noreferrer" target="_blank">CSS Modules Injector</a>的未来规划项目，目的是让开发者不用javascript也可以使用CSS Modules（这就很接近原生html + css的组合了）。</p>
<h3 id="articleHeader8">CSS Modules下的样式复用</h3>
<p>“样式都是唯一的了，怎么复用？”</p>
<p>我们已经说了挺多普通css单个全局作用域的坏处。但对应的，这也有一个很大的好处，就是便于实现样式的复用。css理论<a href="https://github.com/stubbornella/oocss/wiki" rel="nofollow noreferrer" target="_blank">OOCSS</a>也是在追求这一点。</p>
<p>CSS Modules提供一个<code>composes</code>方法用于样式复用。例如，你有一个<code>btn.css</code>里有一条：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn{
    display: inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn</span>{
    <span class="hljs-attribute">display</span>: inline-block;
}</code></pre>
<p>然后，你在另一个CSS Module的<code>module_sp.css</code>里可以这样引入它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn-sp{
    composes: btn from &quot;./btn.css&quot;;
    font-size: 16px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.btn-sp</span>{
    <span class="hljs-attribute">composes</span>: btn from <span class="hljs-string">"./btn.css"</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
}</code></pre>
<p>那么，这个<code>div.btn-sp</code>的DOM元素将会是：</p>
<p><span class="img-wrap"><img data-src="/img/bVu6xI" src="https://static.alili.tech/img/bVu6xI" alt="CSS Modules compose" title="CSS Modules compose" style="cursor: pointer;"></span></p>
<p>可以看到，<code>composes</code>的用法比较类似sass的<code>@extend</code>，但不同于<code>@extend</code>的是，<code>composes</code>并不增加css里的选择符总量，而是采用组合多个class名的形式。在这个例子里，原本仅有1个class的<code>div.btn-sp</code>，变成了2个class。</p>
<p>因此，CSS Modules建议只使用1个class就定义好对应元素所需的全部样式。它们会再由CSS Modules转换为适当的class组合。</p>
<p>CSS Modules团队成员认为<code>composes</code>是CSS Modules里最强大的功能：</p>
<blockquote><p>For me, the most powerful idea in CSS Modules is composition, where you can deconstruct your visual inventory into atomic classes, and assemble them at a module level, without duplicating markup or hindering performance.</p></blockquote>
<p>更详细的<code>composes</code>的用法及其理解，推荐阅读<a href="http://glenmaddern.com/articles/css-modules" rel="nofollow noreferrer" target="_blank">CSS Modules: Welcome to the Future</a>。</p>
<h2 id="articleHeader9">其他可能有用的补充</h2>
<h3 id="articleHeader10">和已有的普通css共存</h3>
<p>很多项目会引入Bootstrap、<a href="http://materializecss.com/" rel="nofollow noreferrer" target="_blank">Materialize</a>等框架，它们是普通的、全局的css。此外，你也可能自己会写一些普通css。如何共存呢？CSS Modules团队成员对此提到过：</p>
<blockquote><p>a CSS Module should only import information relative to it</p></blockquote>
<p>意思是，建议把CSS Modules看做一种新的css，和原来的普通css区分开来。比如，<code>composes</code>的时候，不要从那些普通的css里去取。</p>
<p>在css-loader里通过指定<code>test</code>、<code>include</code>、<code>exclude</code>来区分它们。保持CSS Modules的纯净，只有想要应用CSS Modules的css文件，才启用CSS Modules。</p>
<h3 id="articleHeader11">只转换class和id</h3>
<p>经过我自己的测试，CSS Modules只转换class和id，此外的标签选择符、伪类等都不会被转换。</p>
<p>建议只使用class。</p>
<h3 id="articleHeader12">一个CSS Module的输出</h3>
<p>简单用<code>console.log()</code>就可以查看CSS Module的输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var styles = require(&quot;./main.css&quot;);
console.log(&quot;styles = &quot;, styles);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> styles = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./main.css"</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"styles = "</span>, styles);</code></pre>
<p>结果类似这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;btn-sp&quot;:  &quot;_2SCQ7Kuv31NIIiVU-Q2ubA _2r6eZFEKnJgc7GLy11yRmV&quot;,
    title: &quot;_1m-KkPQynpIso3ofWhMVuK&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-string">"btn-sp"</span>:  <span class="hljs-string">"_2SCQ7Kuv31NIIiVU-Q2ubA _2r6eZFEKnJgc7GLy11yRmV"</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-string">"_1m-KkPQynpIso3ofWhMVuK"</span>
}</code></pre>
<p>这可以帮助理解CSS Modules是怎样工作的。</p>
<h3 id="articleHeader13">预编译器</h3>
<p>sass等预编译器也可以用CSS Modules，对应的loader可能是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.scss$/,
    loader: 'style!css?modules!resolve-url!sass?sourceMap'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'style!css?modules!resolve-url!sass?sourceMap'</span>
}</code></pre>
<p>注意不要因为是sass就习惯性地用嵌套写法，CSS Modules并不适合使用包含选择符。</p>
<h3 id="articleHeader14">建议的命名方式</h3>
<p>CSS Modules会把<code>.title</code>转换为<code>styles.title</code>，由于后者是用在javascript中，因此驼峰命名会更适合。</p>
<p>如果像我之前那样写<code>.btn-sp</code>，需要注意在javascript中写为<code>styles["btn-sp"]</code>。</p>
<p>此外，你还可以为css-loader增加<code>camelCase</code>参数来实现自动转换：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.css$/,
    loader: 'style!css?modules&amp;camelCase',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'style!css?modules&amp;camelCase'</span>,
}</code></pre>
<p>这样即便你写<code>.btn-sp</code>，你也可以直接在javascript里用<code>styles.btnSp</code>。</p>
<h2 id="articleHeader15">结语</h2>
<p>无论是一直以来我们认真遵循的命名约定，还是这个新的CSS Modules，目的都是一样的：可维护的css代码。我觉得就CSS Modules基本还是在写css这一点来说，它还是很友好的。</p>
<p>虽然本文为了严谨，结果写了相当长的篇幅，但希望你读过之后，还能觉得CSS Modules是简单易懂的。因为这样，我就达成我的目的：扣题，了。</p>
<p>（重新编辑自我的博客，原文地址：<a href="http://acgtofe.com/posts/2016/04/css-modules-made-simple" rel="nofollow noreferrer" target="_blank">http://acgtofe.com/posts/2016/04/css-modules-made-simple</a>）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单易懂的CSS Modules

## 原文链接
[https://segmentfault.com/a/1190000004990977](https://segmentfault.com/a/1190000004990977)

