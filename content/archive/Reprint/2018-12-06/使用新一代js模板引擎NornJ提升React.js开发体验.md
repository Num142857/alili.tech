---
title: '使用新一代js模板引擎NornJ提升React.js开发体验' 
date: 2018-12-06 2:30:09
hidden: true
slug: fuyo21pcelq
categories: [reprint]
---

{{< raw >}}

                    
<p>当前的前端世界中有很多著名的开源<strong>javascript模板引擎</strong>如<a href="https://github.com/wycats/handlebars.js" rel="nofollow noreferrer" target="_blank">Handlebars</a>、<a href="https://github.com/mozilla/nunjucks" rel="nofollow noreferrer" target="_blank">Nunjucks</a>、<a href="https://github.com/mde/ejs" rel="nofollow noreferrer" target="_blank">EJS</a>等等，相信很多人对它们都并不陌生。</p>
<h2 id="articleHeader0">js模板引擎的现状</h2>
<p>通常来讲，这些js模板引擎项目都有一个共同的特性：<strong>只专注渲染字符串(html)</strong></p>
<p>早在几年前Backbone等<code>mv*</code>框架流行的时候，js模板引擎遇到了它们的春天，因为Backbone可以支持选配用户自己喜好的模板，并提供了接入方案。但是在新一代前端<code>mv*</code>框架盛行的今天，人们更多的关注点在于React的<code>JSX</code>支持的逻辑何等地强大、Vue的<code>v-show</code>等指令使用起来多么地方便，而js模板引擎呢？它们似乎只能在Node.js服务器端找到它们的归宿，而且还被React及Vue的<strong>SSR(服务端渲染)</strong>继续蚕食着仅有的市场。</p>
<p>为什么各种各样的js模板引擎都只专注于渲染html字符串？这或许跟历史原因有关，毕竟5、6年前的时候并没有<code>虚拟dom</code>，使用jQuery等框架的<code>$('div').html(str)</code>方法渲染dom是理所当然的事情。</p>
<h2 id="articleHeader1">新型js模板引擎</h2>
<p>我们不妨试想一下，其实js模板引擎在当前的时代只要也能做到渲染<code>虚拟dom</code>对象，或许就可以再次找到它们被重用的机会：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         +---------------------+
         ¦ <Template string /> ¦
         +---------------------+
                    |
                    |
         +---------------------+
         |      render to      |
         |                     |
  +-------------+    +-------------------+
  ¦ html string ¦    ¦ React virtual dom ¦
  +-------------+    +-------------------+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>         +<span class="hljs-comment">---------------------+</span>
         ¦ &lt;Template <span class="hljs-built_in">string</span> /&gt; ¦
         +<span class="hljs-comment">---------------------+</span>
                    |
                    |
         +<span class="hljs-comment">---------------------+</span>
         |      render <span class="hljs-keyword">to</span>      |
         |                     |
  +<span class="hljs-comment">-------------+    +-------------------+</span>
  ¦ html <span class="hljs-built_in">string</span> ¦    ¦ React virtual dom ¦
  +<span class="hljs-comment">-------------+    +-------------------+</span></code></pre>
<p>然而目前有一个新的js模板引擎可以做到上述的<strong>同时支持渲染html和React组件</strong>，它就是<a href="https://github.com/joe-sky/nornj" rel="nofollow noreferrer" target="_blank">NornJ</a>。</p>
<p>github：<a href="https://github.com/joe-sky/nornj" rel="nofollow noreferrer" target="_blank">https://github.com/joe-sky/nornj</a><br>官方文档(github pages)：<a href="https://joe-sky.github.io/nornj-guide/" rel="nofollow noreferrer" target="_blank">https://joe-sky.github.io/nor...</a><br>官方文档(gitbook)：<a href="https://joe-sky.gitbooks.io/nornj-guide/" rel="nofollow noreferrer" target="_blank">https://joe-sky.gitbooks.io/n...</a></p>
<h2 id="articleHeader2">安装</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install nornj
npm install nornj-react   # React开发请一起安装此包
npm install nornj-loader  # webpack环境请一起安装此包" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="sh">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">nornj
</span>npm <span class="hljs-keyword">install </span><span class="hljs-keyword">nornj-react </span>  <span class="hljs-comment"># React开发请一起安装此包</span>
npm <span class="hljs-keyword">install </span><span class="hljs-keyword">nornj-loader </span> <span class="hljs-comment"># webpack环境请一起安装此包</span></code></pre>
<h2 id="articleHeader3">在线演示地址</h2>
<h3 id="articleHeader4">渲染html字符串</h3>
<ul>
<li><a href="https://jsfiddle.net/joe_sky/byjdkaf1/" rel="nofollow noreferrer" target="_blank">在线Playground(jsfiddle)</a><button class="btn btn-xs btn-default ml10 preview" data-url="joe_sky/byjdkaf1/" data-typeid="0">点击预览</button></li>
<li><a href="https://codepen.io/joe_sky/pen/BrGvVG" rel="nofollow noreferrer" target="_blank">在线Playground(codepen)</a><button class="btn btn-xs btn-default ml10 preview" data-url="joe_sky/pen/BrGvVG" data-typeid="3">点击预览</button></li>
</ul>
<h3 id="articleHeader5">渲染React组件</h3>
<ul>
<li><a href="https://jsfiddle.net/joe_sky/n5n9tutj/" rel="nofollow noreferrer" target="_blank">在线Playground(jsfiddle)</a><button class="btn btn-xs btn-default ml10 preview" data-url="joe_sky/n5n9tutj/" data-typeid="0">点击预览</button></li>
<li><a href="https://codepen.io/joe_sky/pen/ooPNbj" rel="nofollow noreferrer" target="_blank">在线Playground(codepen)</a><button class="btn btn-xs btn-default ml10 preview" data-url="joe_sky/pen/ooPNbj" data-typeid="3">点击预览</button></li>
</ul>
<h2 id="articleHeader6">在React开发中的基本使用方法</h2>
<p>React在介绍自己时常说JSX是"可选的"，但实际上，脱离了JSX的React根本就几乎无法正常地开发。如果有了另一种DSL(js模板引擎)可适配React开发，那么JSX才能真正地成为可选的技术。</p>
<p><a href="https://github.com/joe-sky/nornj" rel="nofollow noreferrer" target="_blank">NornJ</a>的模板语法在参考自<code>Handlebars</code>、<code>Nunjucks</code>、<code>Vue</code>等多个著名项目的基础上，也有很多自己独特的语法如<code>tagged template string</code>、<code>自定义语句与运算符</code>等等，与html+js非常相似可快速上手。需要提一下另一个<code>React</code>的模板项目<a href="https://github.com/wix/react-templates" rel="nofollow noreferrer" target="_blank">react-templates</a>，它是<code>React</code>生态中唯一一个比较完善的模板项目，但很可惜的是它现在已经几乎不维护了，而且功能非常有限。</p>
<p>每个React组件都须要在render返回组件的标签代码，如在<code>HelloWorld</code>组件中渲染一个下拉框，用<code>JSX</code>和<code>NornJ</code>的语法分别实现：</p>
<ul><li>JSX</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class HelloWorld extends Component {
  render() {
    return (
      <div className=&quot;hello&quot; style="{{" width: 300, height: 200 "}}">
        <input type=&quot;text&quot; />
        <select>
          {[1, 2, 3].map((item, i) => i > 1
            ? <option>{item + 1}</option>
            : <option>{item}</option>
          )}
        </select>
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"hello"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">width:</span> <span class="hljs-attr">300</span>, <span class="hljs-attr">height:</span> <span class="hljs-attr">200</span> "}}"&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">select</span>&gt;</span>
          {[1, 2, 3].map((item, i) =&gt; i &gt; 1
            ? <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>{item + 1}<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
            : <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>{item}<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}</span></code></pre>
<ul><li>NornJ</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { template as t } from 'nornj';
import 'nornj-react';
import { Input } from 'antd';

export default class HelloWorld extends Component {
  render() {
    return t`
      <div class=&quot;hello&quot; style=&quot;width:300px;height:200px;&quot;>
        <input type=&quot;text&quot;>
        <select>
          <#each {1 .. 3}>
            <#if {@index > 1}>
              <option>{@item + 1}</option>
              <#else><option>{@item}</option></#else>
            </#if>
          </#each>
        </select>
      </div>
      <${Input} placeholder=&quot;Basic usage&quot; />
    `;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { template <span class="hljs-keyword">as</span> t } <span class="hljs-keyword">from</span> <span class="hljs-string">'nornj'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'nornj-react'</span>;
<span class="hljs-keyword">import</span> { Input } <span class="hljs-keyword">from</span> <span class="hljs-string">'antd'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> t<span class="hljs-string">`
      &lt;div class="hello" style="width:300px;height:200px;"&gt;
        &lt;input type="text"&gt;
        &lt;select&gt;
          &lt;#each {1 .. 3}&gt;
            &lt;#if {@index &gt; 1}&gt;
              &lt;option&gt;{@item + 1}&lt;/option&gt;
              &lt;#else&gt;&lt;option&gt;{@item}&lt;/option&gt;&lt;/#else&gt;
            &lt;/#if&gt;
          &lt;/#each&gt;
        &lt;/select&gt;
      &lt;/div&gt;
      &lt;<span class="hljs-subst">${Input}</span> placeholder="Basic usage" /&gt;
    `</span>;
  }
}</code></pre>
<p>如上例，这就是<code>NornJ</code>最基本的使用方法了，开箱即用。它可以使用<code>ES6+</code>的<code>tagged template literals</code>语法在js文件中描述模板，模板语法在处理逻辑时的结构比<code>JSX</code>更加易读，且语法和html更为接近：</p>
<ul>
<li>可以写class替代className。</li>
<li>style可以使用html中写style属性的方式，当然写对象也同样支持。</li>
<li>模板语法提供了<code>#if</code>、<code>#each</code>等扩展标签用于处理逻辑，可替代<code>三目运算符</code>与<code>数组map方法</code>。</li>
<li>input和img等标签支持只写开标签，如<code>&lt;input type="text"&gt;</code>，JSX中一定要写为<code>&lt;input type="text" /&gt;</code>。</li>
<li>可直接在组件的render中返回同一级别的多个标签，外面不用套上数组。</li>
<li>双花括号<code>"{{""}}"</code>和单花括<code>{}</code>号语法在React开发中都支持，除特殊场景外依个人喜好而定。</li>
<li>模板和JSX一样支持嵌入任意js变量，这当然也包含第三方React组件和JSX变量，<code>NornJ</code>模板和JSX是可以共存的!</li>
</ul>
<blockquote>
<code>NornJ</code>的<code>tagged template literals</code>语法更多细节请查看<a href="https://joe-sky.github.io/nornj-guide/templateSyntax/templateString.html" rel="nofollow noreferrer" target="_blank">官方文档</a>。</blockquote>
<p>上面的例子也可以这样改写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import nj from 'nornj';
import 'nornj-react';
import { Input } from 'antd';

const tmplFn = nj`
  <div class=&quot;hello&quot; style=&quot;width:300px;height:200px;&quot;>
  ...
  </div>
  <${Input} placeholder=&quot;Basic usage&quot; />
`;

export default class HelloWorld extends Component {
  render() {
    return tmplFn();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> nj <span class="hljs-keyword">from</span> <span class="hljs-string">'nornj'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'nornj-react'</span>;
<span class="hljs-keyword">import</span> { Input } <span class="hljs-keyword">from</span> <span class="hljs-string">'antd'</span>;

<span class="hljs-keyword">const</span> tmplFn = nj<span class="hljs-string">`
  &lt;div class="hello" style="width:300px;height:200px;"&gt;
  ...
  &lt;/div&gt;
  &lt;<span class="hljs-subst">${Input}</span> placeholder="Basic usage" /&gt;
`</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> tmplFn();
  }
}</code></pre>
<p>可以看出，实质上<code>tagged template literals</code>语法就是创建了一个模板函数，然后再在render中执行了而已。这时不难想到，使用第一种方法将模板函数放到render中执行，这样会不会每次执行render时都进行模板编译(内部涉及各种正则析取)会造成性能下降？并不会，因为<code>NornJ</code>模板在编译时会进行缓存，只有第一次render时会进行模板编译，之后的每次render就会走缓存了。</p>
<p>另外，<code>NornJ</code>和<code>JSX</code>还可以嵌套编写，仅仅在很小的粒度使用<code>NornJ</code>模板也完全没有问题，具体请见<a href="https://joe-sky.github.io/nornj-guide/gettingStarted/enhanceReact.html#nornj%E5%92%8Cjsx%E7%9B%B8%E4%BA%92%E5%B5%8C%E5%A5%97%E4%BD%BF%E7%94%A8" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<h2 id="articleHeader7">单文件模板</h2>
<p><a href="https://github.com/joe-sky/nornj" rel="nofollow noreferrer" target="_blank">NornJ</a>模板除了可以在js文件中编写之外，还可以编写在单独的模板文件中，用来做组件(或页面)展现层与结构层的分离(<a href="https://joe-sky.github.io/nornj-guide/api/webpack" rel="nofollow noreferrer" target="_blank">具体请参考官方文档</a>)。例如编写一个<code>helloWorld.nj.html</code>文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template name=&quot;partial&quot;>
  <ant-Input placeholder=&quot;Basic usage&quot; value={value} />
</template>

<template name=&quot;helloWorld&quot;>
  <div class={styles.hello}>
    <select>
      <#each {1 .. 3}>
        <#if {@index > 1}>
          <option>{@item + 1}</option>
          <#else><option>{@item}</option></#else>
        </#if>
      </#each>
    </select>
  </div>
  <#include name=&quot;partial&quot; />
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"partial"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ant-Input</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Basic usage"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"helloWorld"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">{styles.hello}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">select</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">#each</span> {<span class="hljs-attr">1</span> <span class="hljs-attr">..</span> <span class="hljs-attr">3</span>}&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">#if</span> {@<span class="hljs-attr">index</span> &gt;</span> 1}&gt;
          <span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>{@item + 1}<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">#else</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">option</span>&gt;</span>{@item}<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">#else</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">#if</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">#each</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">#include</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"partial"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>然后可以在js文件中引入后使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import tmpls from './helloWorld.nj.html';

export default class HelloWorld extends Component {
  state = {
    value: 'test'
  };

  render() {
    return tmpls.helloWorld(this.state, this.props);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> tmpls <span class="hljs-keyword">from</span> <span class="hljs-string">'./helloWorld.nj.html'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  state = {
    <span class="hljs-attr">value</span>: <span class="hljs-string">'test'</span>
  };

  render() {
    <span class="hljs-keyword">return</span> tmpls.helloWorld(<span class="hljs-keyword">this</span>.state, <span class="hljs-keyword">this</span>.props);
  }
}</code></pre>
<p>如上，每个<code>*.nj.html</code>文件内都可以定义一个或多个<code>template</code>标签。这些<code>template</code>标签会在引用它的js文件中通过<a href="https://github.com/joe-sky/nornj-loader" rel="nofollow noreferrer" target="_blank">nornj-loader</a>进行解析，生成一个以<code>template</code>标签的<code>name</code>属性为key的模板函数集合对象，在各个组件的render中调用它们就会生成相应的<code>React vdom</code>对象。</p>
<p>针对<code>NornJ</code>的<strong>单文件模板</strong>，我们也提供了一些IDE的<a href="https://joe-sky.github.io/nornj-guide/api/webpack.html#%E6%A8%A1%E6%9D%BF%E8%AF%AD%E6%B3%95%E9%AB%98%E4%BA%AE%E6%8F%92%E4%BB%B6" rel="nofollow noreferrer" target="_blank">语法高亮与提示工具</a>。</p>
<h2 id="articleHeader8">扩展模板</h2>
<p><a href="https://github.com/joe-sky/nornj" rel="nofollow noreferrer" target="_blank">NornJ</a>与<code>Handlebars</code>比较类似具有非常强大的可扩展性，<code>#if</code>、<code>#each</code>等实际上都是扩展出来的语法，您完全可以自己扩展出<code>#customIf</code>、<code>#customEach</code>等新语句。在可扩展性这一点上，不难想到JSX也可以通过babel进行扩展，也可以搞新的语法出来，例如<a href="https://github.com/AlexGilleran/jsx-control-statements" rel="nofollow noreferrer" target="_blank">jsx-control-statements</a>。但是babel扩展上手门槛不低，要学各种babel AST的用法，开发一个完美的插件出来似乎并非易事。</p>
<p>由于<code>NornJ</code>继承于<code>Handlebars</code>的扩展方式，它内部的每个扩展都可以用一个函数简单地开发出来，例如为<code>NornJ</code>扩展一个<code>**</code>运算符，作用是乘方运算：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import nj from 'nornj';

nj.registerFilter('**', (val1, val2) => Math.pow(val1, val2));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> nj <span class="hljs-keyword">from</span> <span class="hljs-string">'nornj'</span>;

nj.registerFilter(<span class="hljs-string">'**'</span>, (val1, val2) =&gt; <span class="hljs-built_in">Math</span>.pow(val1, val2));</code></pre>
<p>然后就可以直接使用了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input value=&quot;{ 2 ** 10 / 100 }&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"{ 2 ** 10 / 100 }"</span>&gt;</span></code></pre>
<p>当然上述只是个最简单的例子，更多模板扩展描述请参考<a href="https://joe-sky.github.io/nornj-guide" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<h2 id="articleHeader9">结合Mobx创建双向数据绑定</h2>
<p>利用<a href="https://github.com/joe-sky/nornj" rel="nofollow noreferrer" target="_blank">NornJ</a>的可扩展性，模板语法在理论上可以实现无限的可能性。<code>#mobx-model</code>是<code>NornJ</code>实现的一个行内扩展标签(类似于vue及ng的指令)，具体用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from 'react';
import { observable } from 'mobx';
import nj from 'nornj';
import 'nornj-react';
import 'nornj-react/mobx';

class TestComponent extends Component {
  @observable inputValue = '';

  render() {
    return nj`<input :#mobx-model=&quot;inputValue&quot;>`(this);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { observable } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>;
<span class="hljs-keyword">import</span> nj <span class="hljs-keyword">from</span> <span class="hljs-string">'nornj'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'nornj-react'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'nornj-react/mobx'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TestComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  @observable inputValue = <span class="hljs-string">''</span>;

  render() {
    <span class="hljs-keyword">return</span> nj<span class="hljs-string">`&lt;input :#mobx-model="inputValue"&gt;`</span>(<span class="hljs-keyword">this</span>);
  }
}</code></pre>
<ul>
<li><a href="https://jsfiddle.net/joe_sky/wwrLuns2/" rel="nofollow noreferrer" target="_blank">mobx-model在线示例(jsfiddle)</a><button class="btn btn-xs btn-default ml10 preview" data-url="joe_sky/wwrLuns2/" data-typeid="0">点击预览</button></li>
<li><a href="https://codepen.io/joe_sky/pen/mxKdrj" rel="nofollow noreferrer" target="_blank">mobx-model在线示例(codepen)</a><button class="btn btn-xs btn-default ml10 preview" data-url="joe_sky/pen/mxKdrj" data-typeid="3">点击预览</button></li>
</ul>
<p><code>#mobx-model</code>的底层实现方式和Vue的<code>v-model</code>是比较类似的。React也有其他双向绑定的实现如<a href="https://github.com/Houfeng/mota" rel="nofollow noreferrer" target="_blank">Mota</a>，但该项目的实现方式是通过高阶组件。利用<code>NornJ</code>的扩展语法，我们还能实现更多类似于<code>#mobx-model</code>的扩展功能。</p>
<h2 id="articleHeader10">结合React的各种生态</h2>
<p><a href="https://github.com/joe-sky/nornj" rel="nofollow noreferrer" target="_blank">NornJ</a>可以完美结合各种React生态，包括<code>React-Native</code>、<code>Redux</code>、<code>React-Router</code>、<code>Mobx</code>、<code>Ant Design</code>等等，它可以和任何已有的React生态共存。</p>
<blockquote>更多详细文档请见<a href="https://joe-sky.github.io/nornj-guide/" rel="nofollow noreferrer" target="_blank">官方文档</a>。</blockquote>
<h2 id="articleHeader11">适配各种React-Like库</h2>
<p><a href="https://github.com/joe-sky/nornj" rel="nofollow noreferrer" target="_blank">NornJ</a>在理论上可以适配任意React-Like库，包括<a href="https://github.com/developit/preact" rel="nofollow noreferrer" target="_blank">Preact</a>、<a href="https://github.com/infernojs/inferno" rel="nofollow noreferrer" target="_blank">inferno</a>、<a href="https://github.com/RubyLouvre/anu" rel="nofollow noreferrer" target="_blank">anu</a>、<a href="https://github.com/NervJS/nerv" rel="nofollow noreferrer" target="_blank">Nerv</a>等。</p>
<blockquote>具体适配方式请见<a href="https://joe-sky.github.io/nornj-guide/api/config.html" rel="nofollow noreferrer" target="_blank">官方文档</a>。</blockquote>
<h2 id="articleHeader12">渲染html字符串</h2>
<p><a href="https://github.com/joe-sky/nornj" rel="nofollow noreferrer" target="_blank">NornJ</a>同时还支持渲染html字符串，这和传统的js模板引擎就完全一样了。使用方法和React中几乎完全一样，具体请看这个在线实例：</p>
<ul>
<li><a href="https://jsfiddle.net/joe_sky/byjdkaf1/" rel="nofollow noreferrer" target="_blank">在线Playground(jsfiddle)</a><button class="btn btn-xs btn-default ml10 preview" data-url="joe_sky/byjdkaf1/" data-typeid="0">点击预览</button></li>
<li><a href="https://codepen.io/joe_sky/pen/BrGvVG" rel="nofollow noreferrer" target="_blank">在线Playground(codepen)</a><button class="btn btn-xs btn-default ml10 preview" data-url="joe_sky/pen/BrGvVG" data-typeid="3">点击预览</button></li>
</ul>
<p>当然，<code>NornJ</code>也能够支持Node.js服务器<code>Express</code>及<code>Koa</code>等。传统js模板的<code>compile</code>、<code>render</code>等方法，<code>NornJ</code>也支持。</p>
<blockquote>更多细节请见<a href="https://joe-sky.github.io/nornj-guide/gettingStarted/normalTemplateEngine.html" rel="nofollow noreferrer" target="_blank">官方文档</a>。</blockquote>
<h2 id="articleHeader13">NornJ的未来计划</h2>
<p><a href="https://github.com/joe-sky/nornj" rel="nofollow noreferrer" target="_blank">NornJ</a>在未来我们还有很多可以增强的方面，例如：</p>
<ul><li>开发eslint插件</li></ul>
<p><code>NornJ</code>目前虽然内部有语法错误警告机制，但只是将错误打印在控制台。对于静态语法错误检测，<code>NornJ</code>将来有必要开发一个eslint插件。</p>
<ul><li>性能持续优化</li></ul>
<p>虽然<code>NornJ</code>目前的模板渲染效率已然不低(请见<a href="https://joe-sky.github.io/nornj-guide/performance/renderSpeed.html" rel="nofollow noreferrer" target="_blank">模板渲染效率测试</a>)，但仍尚有很大的优化空间，会持续进行优化工作。</p>
<ul>
<li>国际化</li>
<li>对Vue提供适配</li>
</ul>
<p><code>NornJ</code>适配Vue暂时是个设想，理论上是可以实现的。但有几个难题：</p>
<ol>
<li>Vue使用的<code>虚拟dom</code>对象结构并非React那样简单，它使用类似<a href="https://github.com/snabbdom/snabbdom" rel="nofollow noreferrer" target="_blank">snabbdom</a>的结构，其中的事件等方法都绑在特殊的对象上。这对<code>NornJ</code>来说适配起来和React比有一定难度。</li>
<li>Vue的模板语法已然很好用，虽然<code>NornJ</code>可以提供一些自身独特的语法，但是提升开发体验的作用恐怕没有在React中那样明显。</li>
</ol>
<p><a href="https://github.com/joe-sky/nornj" rel="nofollow noreferrer" target="_blank">NornJ</a>发展到今天已经拥有了很多强大的功能，日后还会继续完善，欢迎试用。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用新一代js模板引擎NornJ提升React.js开发体验

## 原文链接
[https://segmentfault.com/a/1190000014317020](https://segmentfault.com/a/1190000014317020)

