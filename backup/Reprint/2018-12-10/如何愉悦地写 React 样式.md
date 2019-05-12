---
title: '如何愉悦地写 React 样式' 
date: 2018-12-10 2:30:07
hidden: true
slug: odxqt0co07
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bV5OtZ?w=612&amp;h=176" src="https://static.alili.tech/img/bV5OtZ?w=612&amp;h=176" alt="React js" title="React js" style="cursor: pointer; display: inline;"></span></p>
<p>在 React 中写 CSS 一直是大家觉得不太爽的地方。</p>
<p>有没有一种更好的 CSS 方案呢？对于这个问题，社区也一直在探索，从未停止过。</p>
<p>本文介绍了 React 相关的三种 CSS 方案，希望能够帮助大家在 React 路上越走越顺畅。</p>
<h2 id="articleHeader0">CSS as Object</h2>
<p>在 React 中，一切皆为 JS 。包括看起来像是 HTML 的 JSX ，它最终也还是转化为 JS 。CSS 也不例外，它必须被表述为 JS 对象才能在组件中使用。作为最原始的方案，它由 Facebook 官方提出，并且开启了 CSS in JS 的热潮。</p>
<p>最原始的用法如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const divStyle = {
  color: 'blue',
  fontSize: 20,
  WebkitTransition: 'all',
  msTransition: 'all',
};
const HelloWorldComponent = () => (
  <div style={divStyle}>Hello World!</div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> divStyle = {
  <span class="hljs-attr">color</span>: <span class="hljs-string">'blue'</span>,
  <span class="hljs-attr">fontSize</span>: <span class="hljs-number">20</span>,
  <span class="hljs-attr">WebkitTransition</span>: <span class="hljs-string">'all'</span>,
  <span class="hljs-attr">msTransition</span>: <span class="hljs-string">'all'</span>,
};
<span class="hljs-keyword">const</span> HelloWorldComponent = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{divStyle}</span>&gt;</span>Hello World!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
);</code></pre>
<p>从中可以看出，开发者首先要使用 JS 对象来书写 CSS ，然后通过 <code>style</code> 属性赋值给组件元素。在 React 内部，会把这个 CSS 对象转化为样式字符串，最终渲染的时候变成元素的行内样式。</p>
<p>这种方式有以下让人诟病的地方：</p>
<ul>
<li>样式属性名称的命名方式与传统 CSS 不同</li>
<li>样式属性名称无法自动提示并补全</li>
<li>样式值略有差异，如上例中的字体大小 <code>20px</code> 写为 <code>20</code>
</li>
<li>无法充分利用自动补全浏览器前缀的功能，需要手动添加前缀</li>
<li>无法抽离成独立的样式文件</li>
<li>无法有效复用基础样式</li>
</ul>
<p>如果仔细看上面的代码的话，可以发现样式属性名称的命名并不是驼峰式命名那么简单，它还存在一些不规则的命名。比如 <code>WebkitTransition</code> 中的 <code>W</code> 是大写的，<code>msTransition</code> 中的 <code>m</code> 则是小写的。</p>
<p>为了改善这些弊端，社区中出现了轻量级的小工具 <a href="https://github.com/styled-components/polished" rel="nofollow noreferrer" target="_blank"><code>polished.js</code></a>。</p>
<h2 id="articleHeader1">CSS as Function</h2>
<p><span class="img-wrap"><img data-src="/img/bV5OuC?w=798&amp;h=283" src="https://static.alili.tech/img/bV5OuC?w=798&amp;h=283" alt="Polished" title="Polished" style="cursor: pointer; display: inline;"></span></p>
<p><code>polished.js</code> 是一个 CSS in JS 的轻量级工具集。最早的版本 <a href="https://github.com/styled-components/polished/releases/tag/v1.0.1" rel="nofollow noreferrer" target="_blank">v1.0.1</a> 发布于 2017.03.30 ，至今将近一年。<br>它总共封装了以下五大类别的工具函数：</p>
<ul>
<li>混合函数（Mixins）</li>
<li>颜色函数（Color）</li>
<li>快捷函数（Shorthands）</li>
<li>帮助函数（Helpers）</li>
<li>类型函数（Types）</li>
</ul>
<p>使用这些函数可以让我们不用直接编写样式属性名称，也在一定程度上实现了样式复用。</p>
<p>来看下具体的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { wordWrap } from 'polished';

const style = {
  ...wordWrap('break-word')
}

// 等效于

const style = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  wordBreak: 'break-all',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { wordWrap } <span class="hljs-keyword">from</span> <span class="hljs-string">'polished'</span>;

<span class="hljs-keyword">const</span> style = {
  ...wordWrap(<span class="hljs-string">'break-word'</span>)
}

<span class="hljs-comment">// 等效于</span>

<span class="hljs-keyword">const</span> style = {
  <span class="hljs-attr">overflowWrap</span>: <span class="hljs-string">'break-word'</span>,
  <span class="hljs-attr">wordWrap</span>: <span class="hljs-string">'break-word'</span>,
  <span class="hljs-attr">wordBreak</span>: <span class="hljs-string">'break-all'</span>,
}</code></pre>
<p>或者更简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { size } from 'polished';

const style = {
  ...size('300px', '250px')
}

// 等效于

const style = {
  height: '300px',
  width: '250px'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { size } <span class="hljs-keyword">from</span> <span class="hljs-string">'polished'</span>;

<span class="hljs-keyword">const</span> style = {
  ...size(<span class="hljs-string">'300px'</span>, <span class="hljs-string">'250px'</span>)
}

<span class="hljs-comment">// 等效于</span>

<span class="hljs-keyword">const</span> style = {
  <span class="hljs-attr">height</span>: <span class="hljs-string">'300px'</span>,
  <span class="hljs-attr">width</span>: <span class="hljs-string">'250px'</span>
}</code></pre>
<p>可以看出，这工具函数确实能提高一些编码效率。但是，记住这些工具函数也加大了学习成本，给人一种得不偿失的感觉。因此，这种方案也没能流行起来，我们仍然需要一种更好的 CSS 编码方案。</p>
<h2 id="articleHeader2">CSS as Component</h2>
<p><code>polished.js</code> 虽然并没有流行起来，但是他们的开发团队却整出了另一个更加绝妙的方案，那就是<strong>样式化组件</strong>（<a href="https://www.styled-components.com/" rel="nofollow noreferrer" target="_blank">Styled Components</a>）。</p>
<p><span class="img-wrap"><img data-src="/img/bV5OuV?w=666&amp;h=261" src="https://static.alili.tech/img/bV5OuV?w=666&amp;h=261" alt="Styled Components" title="Styled Components" style="cursor: pointer; display: inline;"></span></p>
<p>样式化组件巧妙地利用 ES6 标签模板把 CSS 和组件结合在一起，使得组件跟样式之间的界限变得模糊。这意味着，当我们在写样式的时候，我们其实也在定义一个普通的 React 组件。反过来，开发者也可以像写组件一样，非常自然地写样式。</p>
<blockquote>如果对标签模板还不太了解，可以参考<a href="http://es6.ruanyifeng.com/?search=%E6%A8%A1%E6%9D%BF&amp;x=8&amp;y=4#docs/string#%E6%A0%87%E7%AD%BE%E6%A8%A1%E6%9D%BF" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门</a>，里面有详细的讲解。</blockquote>
<p>事不宜迟，来看看这种巧妙地写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

render(
  <Wrapper>
    <Title>
      Hello World, this is my first styled component!
    </Title>
  </Wrapper>,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> styled <span class="hljs-keyword">from</span> <span class="hljs-string">'styled-components'</span>;

<span class="hljs-keyword">const</span> Title = styled.h1<span class="hljs-string">`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`</span>;

<span class="hljs-keyword">const</span> Wrapper = styled.section<span class="hljs-string">`
  padding: 4em;
  background: papayawhip;
`</span>;

render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Wrapper</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Title</span>&gt;</span>
      Hello World, this is my first styled component!
    <span class="hljs-tag">&lt;/<span class="hljs-name">Title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Wrapper</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>上面我们先后使用 <code>styled.h1</code> 和 <code>styled.section</code> 创建了 <code>Title</code> 和 <code>Wrapper</code> 两个组件，它们会生成包含相应样式的 <code>&lt;h1&gt;</code> 和 <code>&lt;section&gt;</code> 标签。由于 <code>Title</code> 和 <code>Wrapper</code> 都是组件，因此我们可以跟其他任何 React 组件一样使用它们，最终的效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV5Ovq?w=455&amp;h=266" src="https://static.alili.tech/img/bV5Ovq?w=455&amp;h=266" alt="Hello World" title="Hello World" style="cursor: pointer; display: inline;"></span></p>
<p>使用样式化组件来写样式跟普通的 CSS 写法是一模一样的。也不用担心自动补全、浏览器前缀自动补全和语法高亮等问题，这些都有很好的<a href="https://www.styled-components.com/docs/tooling" rel="nofollow noreferrer" target="_blank">工具</a>支持，适合所有主流编辑器。</p>
<p>比如语法高亮后长这般模样：</p>
<p><span class="img-wrap"><img data-src="/img/bV5Ou0?w=1014&amp;h=390" src="https://static.alili.tech/img/bV5Ou0?w=1014&amp;h=390" alt="Syntax Highlight" title="Syntax Highlight" style="cursor: pointer; display: inline;"></span></p>
<p>当然，<code>styled-component</code> 还支持很多其他高级功能，比如设置样式主题、组件复用、样式拓展、媒体模板等，更详细的用法请参考<a href="https://www.styled-components.com/docs" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<p>除此以外，它还建立起了自己的生态，提供了丰富的基本样式化组件、网格系统和辅助插件等等。</p>
<p>可以说，<code>styled-components</code> 让 React 组件开发变得更加轻松愉悦！</p>
<p>最后，Happy Coding~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何愉悦地写 React 样式

## 原文链接
[https://segmentfault.com/a/1190000013739813](https://segmentfault.com/a/1190000013739813)

