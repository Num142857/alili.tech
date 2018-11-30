---
title: 'PostCSS真的太好用了！' 
date: 2018-12-01 2:30:12
hidden: true
slug: bpt6mn2mzce
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000014782565" src="https://static.alili.tech/img/remote/1460000014782565" alt="image.png" title="image.png" style="cursor: pointer; display: inline;"></span></p>
<p>在<a href="http://postcss.org/" rel="nofollow noreferrer" target="_blank">PostCSS官网</a>有着这样的对PostCSS特性介绍，箭头后面是对应功能的插件及其github地址。</p>
<ul>
<li>increase code readability → <a href="https://github.com/postcss/autoprefixer" rel="nofollow noreferrer" target="_blank">Autoprefixer</a>
</li>
<li>Use tomorrow's CSS ,today! → <a href="https://github.com/MoOx/postcss-cssnext/" rel="nofollow noreferrer" target="_blank">postcss-cssnext</a>
</li>
<li>The end of global CSS → <a href="https://github.com/css-modules/postcss-modules" rel="nofollow noreferrer" target="_blank">postcss-modules</a>
</li>
<li>Avoid errors in your CSS → <a href="https://github.com/stylelint/stylelint" rel="nofollow noreferrer" target="_blank">stylelint</a>
</li>
<li>Powerful grid CSS → lost →<a href="https://github.com/peterramsing/lost" rel="nofollow noreferrer" target="_blank">lost</a>
</li>
</ul>
<p>PostCSS是一款使用插件去转换CSS的工具，有许多非常好用的插件，例如autoprefixer,cssnext以及CSS Modules。而上面列举出的这些特性，都是由对应的postcss插件去实现的。而使用PostCSS则需要与webpack或者parcel结合起来。<br>在Parcel中使用PostCSS的方法：添加配置文件.postcssrc(JSON),.postcssrc.js或者是postcss.config.js。<br>拿 .postcssrc 文件来举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;modules&quot;: true,
  &quot;plugins&quot;: {
    &quot;autoprefixer&quot;: {
      &quot;grid&quot;: true
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"modules"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">"plugins"</span>: {
    <span class="hljs-attr">"autoprefixer"</span>: {
      <span class="hljs-attr">"grid"</span>: <span class="hljs-literal">true</span>
    }
  }
}</code></pre>
<p>Plugins 在 plugins 对象中被指定为 key，并使用对象的值定义选项。如果插件没有选项，只需将其设置为 true 即可。<br>下面我将对根据官方readme的演示demo，对各个插件进行一一介绍，并添加一些隐藏在插件背后的知识点的说明。</p>
<h3 id="articleHeader0"><strong>1.什么是Autoprefixer？</strong></h3>
<p>首先明确一点Autoprefixer是一个根据can i use解析css并且为其添加浏览器厂商前缀的PostCSS插件。<br>不加任何vender prefix的通常写法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="::placeholder {
    color: gray;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-pseudo">::placeholder</span> {
    <span class="hljs-attribute">color</span>: gray;
}</code></pre>
<p>Autoprefixer将使用基于当前浏览器支持的特性和属性数据去为你添加前缀。你可以尝试下Autoprefixer的demo：<a href="http://autoprefixer.github.io/" rel="nofollow noreferrer" target="_blank">http://autoprefixer.github.io/</a><br><span class="img-wrap"><img data-src="/img/remote/1460000014782566" src="https://static.alili.tech/img/remote/1460000014782566" alt="image" title="image" style="cursor: pointer;"></span><br>由上图可以看出，像没有浏览器差异已经完全符合W3C标准的css2.1属性display，position等，Autoprefixer不会为其加前缀，而像css3属性transform就会为其加前缀，其中--webkit是chrome和safari前缀，--ms则是ie的前缀，像firefox由于已经实现了对transform的W3C标准化，因此使用transform即可。</p>
<p>因此Autoprefixer是一个非常有用的加速前端开发的一个工具，但是它需要基于PostCSS去发挥作用。</p>
<p>如果对vender prefix存疑，可以去看我的这篇博客：<a href="https://www.jianshu.com/p/998f0d6bb7ac" rel="nofollow noreferrer" target="_blank">rem / Vender Prefix / CSS extensions</a></p>
<h3 id="articleHeader1"><strong>2.什么是postcss-cssnext？</strong></h3>
<p>postcss-cssnext语法input：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":root {
  --fontSize: 1rem;
  --mainColor: #12345678;
  --centered: {
      display: flex;
      align-items: center;
      justify-content: center;
  };
}
body {
    color: var(--mainColor);
    font-size: var(--fontSize);
    line-height: calc(var(--fontSize) * 1.5);
    padding: calc((var(--fontSize) / 2) + 1px);
}
.centered {
    @apply --centered;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>:root {
  --fontSize: <span class="hljs-number">1rem</span>;
  --mainColor: <span class="hljs-number">#12345678</span>;
  --centered: {
      display: flex;
      <span class="hljs-attribute">align-items</span>: center;
      <span class="hljs-attribute">justify-content</span>: center;
  };
}
<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">color</span>: var(--mainColor);
    <span class="hljs-attribute">font-size</span>: var(--fontSize);
    <span class="hljs-attribute">line-height</span>: calc(var(--fontSize) * <span class="hljs-number">1.5</span>);
    <span class="hljs-attribute">padding</span>: calc((var(--fontSize) / <span class="hljs-number">2</span>) + <span class="hljs-number">1px</span>);
}
<span class="hljs-selector-class">.centered</span> {
    @apply --centered;
}</code></pre>
<p>浏览器可用语法output:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    color: rgba(18, 52, 86, 0.47059);
    font-size: 16px;
    font-size: 1rem;
    line-height: 24px;
    line-height: 1.5rem;
    padding: calc(0.5rem + 1px);
}
.centered {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgba</span>(18, 52, 86, 0.47059);
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1rem</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">24px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.5rem</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-built_in">calc</span>(0.5rem + 1px);
}
<span class="hljs-selector-class">.centered</span> {
    <span class="hljs-attribute">display</span>: -webkit-box;
    <span class="hljs-attribute">display</span>: -ms-flexbox;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">-webkit-box-align</span>: center;
        <span class="hljs-attribute">-ms-flex-align</span>: center;
            <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">-webkit-box-pack</span>: center;
        <span class="hljs-attribute">-ms-flex-pack</span>: center;
            <span class="hljs-attribute">justify-content</span>: center;
}</code></pre>
<p>粗略看了一遍演示demo，<a href="http://cssnext.io/playground/" rel="nofollow noreferrer" target="_blank">http://cssnext.io/playground/</a>，感觉既好用又不好用。<br>好用的地方在于通过var()和calc()进行css属性值的计算，也有@apply这样的应用大段规则的写法，也可以借此去了解一些新的css草案特性；不好用的地方在于有一定的学习成本，而且在前期与webpack，gulp以及parcel进行结合时也需要花费一定时间，并且如果有新的前端组成员加入，必须要掌握这种cssnext的语法。<br>这样做有些似乎在尝试将css变为一种可以进行逻辑处理的语言，但是我个人认为这对于css这样的灵活的需要具象思维并且需要大量调试的语言来说，工作中使用cssnext不是一个很好的选择，但是工作之余可以作为一个学习新的css草案特性的一个入口，待到纳入标准再去使用。</p>
<p>刚开始对自己的想法不确定，因此去看了下前辈们的想法，其中顾铁灵对cssnext的想法与我的想法如出一辙：</p>
<blockquote>CSS 的转译器（transpiler），根据目前仍处于草案阶段、未被浏览器实现的标准把代码转译成符合目前浏览器实现的 CSS。类似 ES6 的 Babel。<br>相比之下，Autoprefixer 更加具有实用价值，而 cssnext 实现的功能以后浏览器会怎么实现还存疑，感觉只能玩玩。</blockquote>
<h3 id="articleHeader2"><strong>3.什么是postcss-modules？</strong></h3>
<p>在看postcss-modules之前，首先要明确的是CSS Modules的这个概念，关于CSS Modules，可以阅读我翻译的一篇文章：<a href="https://github.com/FrankKai/FrankKai.github.io/issues/45" rel="nofollow noreferrer" target="_blank">【译】什么是CSS Modules ？我们为什么需要他们？</a></p>
<p>postcss-modules则是CSS Modules在PostCSS上的实现插件，这里有一篇插件作者本人写的介绍postcss-modules的文章：<a href="https://evilmartians.com/chronicles/postcss-modules-make-css-great-again" rel="nofollow noreferrer" target="_blank">PostCSS-modules:make CSS great again!</a>。</p>
<p>在我有限的开发经验中，只在react中使用过css modules，在vue和angularjs中都没用到过，而且在react中使用时，不会去用postcss-modules这个插件，而是使用<a href="https://github.com/gajus/react-css-modules" rel="nofollow noreferrer" target="_blank">react-css-modules</a>这个CSS Modules思想在react中的插件。</p>
<p>下面将给出最简单的入门例子：<br>在React上下文中，CSS Modules可能像下面这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import styles from './table.css';

export default class Table extends React.Component {
    render () {
        return <div className={styles.table}>
            <div className={styles.row}>
                <div className={styles.cell}>A0</div>
                <div className={styles.cell}>B0</div>
            </div>
        </div>;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">'./table.css'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Table</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render () {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.table}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.row}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.cell}</span>&gt;</span>A0<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.cell}</span>&gt;</span>B0<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
}</code></pre>
<p>最后渲染出的组件的标签会是如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;table__table___32osj&quot;>
    <div class=&quot;table__row___2w27N&quot;>
        <div class=&quot;table__cell___1oVw5&quot;>A0</div>
        <div class=&quot;table__cell___1oVw5&quot;>B0</div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"table__table___32osj"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"table__row___2w27N"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"table__cell___1oVw5"</span>&gt;A0&lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"table__cell___1oVw5"</span>&gt;B0&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>如果对为什么会把class名编译成table__table___32osj这样的形式存在疑惑，需要先把css modules搞清楚：<a href="https://github.com/FrankKai/FrankKai.github.io/issues/45" rel="nofollow noreferrer" target="_blank">【译】什么是CSS Modules ？我们为什么需要他们？</a></p>
<p>如果需要在开发环境或者生产环境结合webpack去使用，那么可以阅读<a href="https://github.com/gajus/react-css-modules" rel="nofollow noreferrer" target="_blank">react-css-modules</a>的官方文档寻找答案。</p>
<p>通过这次探索我们可以发现，前端开发在不同的生态，或者说框架体系下，同一个技术，例如CSS Modules这种将思想，会有对应的实现方式，而我们要掌握的，不仅仅是在某种框架下配置使用的方法，而是这种开发思想。因为学习的核心在于学习知识，而不是无休止的学习工具。</p>
<h3 id="articleHeader3"><strong>4.什么是stylelint？</strong></h3>
<p>这是用来强制开发人员按照团队css规范写css样式的工具，类似eslint。<br>若想使用，只需要去启用规则即可。</p>
<p>节选一段stylelint作者博文中的话：</p>
<blockquote>没错，你的团队可能在某个地方的某条纯文本wiki中记录了团队的代码样式规范。但是，不容忽视的是人的因素：人总是会犯错——总是在无意之间。<br>而且即使你很自律地执着遵循某个规范的代码风格，但是你没办法确保你的同事或是你的开源项目的贡献者能够像你一样。没有linter的帮助，你必须人工检查代码样式和错误。而机器存在的意义就是代替人来完成能够自动化实现的任务。linter就是这样的机器，有了linter，你不需要浪费时间检查代码风格，也不需要对每一个代码错误都写一大堆的注释，因此它能够极大程度地减少你花费在代码审阅上的时间。你无须检查代码究竟做了些什么，也无需关心它看起来什么样。</blockquote>
<p>事实与stylelint作者说的是一样的，即使团队有前端开发规范，也会不经意间写出不符合规范的代码，因为每次写css规则前都去规范check一遍不是谁都能做到的，如果团队再没有code review这一关的话，写出各种各样风格的css代码就是一件必然的事了，短期没有什么影响，当项目变得庞大起来，增加新功能或者重写旧功能将会是一件很痛苦的事。</p>
<p>我们主要去关注<a href="https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md#possible-errors" rel="nofollow noreferrer" target="_blank">Rules部分</a>：<br>sytlelint的规则主要有3类，我将从每一类规则中挑一个拿出来作为示例。</p>
<ul>
<li>Possible errors(常见的错误写法，强烈推荐开启)</li>
<li>Limit language features(弃用一些正确的写法，中等推荐开启)</li>
<li>Stylistic issues(代码风格代码统一，普通建议开启)</li>
<li>Possible errors ------ color-no-invalid-hex: 禁止无效的十六进制颜色</li>
</ul>
<p>完全形式的十六进制颜色可以是6或者8（7，8位是透明度的值）个字符。同样他们的缩写可以是3或者4个字符。<br>options : true<br>下面的代码违反规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a { color: #00; }
a { color: #fff1az; }
a { color: #12345aa; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#00</span>; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff1a</span>z; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#12345aa</span>; }</code></pre>
<p>下面的代码符合规则:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a { color: #000; }
a { color: #000f; }
a { color: #fff1a0; }
a { color: #123450aa; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#000f</span>; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff1a0</span>; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#123450aa</span>; }</code></pre>
<ul><li>Limit language features ------ color-no-hex:禁止使用十六进制颜色</li></ul>
<p>options : true<br>十六进制的颜色违反规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a { color: #000; }
a { color: #fff1aa; }
a { color: #123456aa; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff1aa</span>; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#123456aa</span>; }</code></pre>
<p>无效的十六进制色同样违规：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a { color: #foobar; }
a { color: #0000000000000000; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#f</span>oobar; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#0000000000000000</span>; }</code></pre>
<p>下面的是符合规则的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a { color: black; }
a { color: rgb(0, 0, 0); }
a { color: rgba(0, 0, 0, 1); }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: black; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(0, 0, 0); }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 1); }</code></pre>
<ul><li>Stylistic issues ------ color-hex-case: 自动将十六进制色转换为大写或者小写</li></ul>
<p>Options string: "lower"|"upper"<br>可以使用<code>stylelint "foo/*.css" --fix</code>实现同样的功能。<br>"小写"<br>下面的代码是违规的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a { color: #FFF; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFF</span>; }</code></pre>
<p>下面的是符合规则的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a { color: #000; }
a { color: #fff; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>; }</code></pre>
<p>"大写"<br>下面的代码是违规的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a { color: #fff; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>; }</code></pre>
<p>下面的是符合规则的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a { color: #000; }
a { color: #FFF; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>; }
<span class="hljs-selector-tag">a</span> { <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFF</span>; }</code></pre>
<p>更多的stylelint的规则可以查阅：<a href="https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md#possible-errors" rel="nofollow noreferrer" target="_blank">https://github.com/stylelint/...</a></p>
<h3 id="articleHeader4"><strong>5.什么是LostGrid？</strong></h3>
<p>Lost Grid是一个强大的PostCSS网格系统，可与任何预处理器甚至是原生CSS一起使用。<br>在这里有非常好的demo展示：<a href="http://lostgrid.org/lostgrid-example.html" rel="nofollow noreferrer" target="_blank">http://lostgrid.org/lostgrid-...</a></p>
<p>节选2个展示进行说明。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ColumnSection__grid div {
    lost-column: 1/1;
}
@media (min-width: 400px) {
    .ColumnSection__grid div {
        lost-column: 1/3;
    }
}
@media (min-width: 900px) {
    .ColumnSection__grid div {
        lost-column: 1/6;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.ColumnSection__grid</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">lost-column</span>: <span class="hljs-number">1</span>/<span class="hljs-number">1</span>;
}
@<span class="hljs-keyword">media</span> (min-width: <span class="hljs-number">400px</span>) {
    <span class="hljs-selector-class">.ColumnSection__grid</span> <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">lost-column</span>: <span class="hljs-number">1</span>/<span class="hljs-number">3</span>;
    }
}
@<span class="hljs-keyword">media</span> (min-width: <span class="hljs-number">900px</span>) {
    <span class="hljs-selector-class">.ColumnSection__grid</span> <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">lost-column</span>: <span class="hljs-number">1</span>/<span class="hljs-number">6</span>;
    }
}</code></pre>
<p>大于900px时：<br><span class="img-wrap"><img data-src="/img/remote/1460000014782567" src="https://static.alili.tech/img/remote/1460000014782567" alt="image" title="image" style="cursor: pointer; display: inline;"></span><br>小于900px时：<br><span class="img-wrap"><img data-src="/img/remote/1460000014782568" src="https://static.alili.tech/img/remote/1460000014782568" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".NestingSection__grid {
    background: #8eb19d;
}

.NestingSection__grid div {
    background: #7ba48d;
    lost-column: 1/3;
}
.NestingSection__grid div div {
    background: #68977c;
    lost-column: 1/2;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.NestingSection__grid</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#8eb19d</span>;
}

<span class="hljs-selector-class">.NestingSection__grid</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#7ba48d</span>;
    <span class="hljs-attribute">lost-column</span>: <span class="hljs-number">1</span>/<span class="hljs-number">3</span>;
}
<span class="hljs-selector-class">.NestingSection__grid</span> <span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#68977c</span>;
    <span class="hljs-attribute">lost-column</span>: <span class="hljs-number">1</span>/<span class="hljs-number">2</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014782569" src="https://static.alili.tech/img/remote/1460000014782569" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>经过查看css样式我们发现，其实就是巧用了table布局，before/after伪元素，以及css选择器，以及border-box布局，但其实最最核心的地方还是在于很好的使用了css本身具有的流式布局以及BFC，针对各种情况，在插件内部使用了大量的样式进行约束。<br><span class="img-wrap"><img data-src="/img/remote/1460000014782570" src="https://static.alili.tech/img/remote/1460000014782570" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>在css3的flex布局和grid布局逐渐被浏览器所支持的今天，我个人建议不使用LostGrid插件。</p>
<blockquote>
<p>期待和大家交流，共同进步，欢迎大家加入我创建的与前端开发密切相关的技术讨论小组：</p>
<ul>
<li>SegmentFault技术圈:<a href="https://segmentfault.com/g/1570000010695363">ES新规范语法糖</a>
</li>
<li>SegmentFault专栏：<a href="https://segmentfault.com/blog/chennihainianqing" target="_blank">趁你还年轻，做个优秀的前端工程师</a>
</li>
<li>知乎专栏：<a href="https://zhuanlan.zhihu.com/wyasy" rel="nofollow noreferrer" target="_blank">趁你还年轻，做个优秀的前端工程师</a>
</li>
<li>Github博客: <a href="https://github.com/FrankKai/FrankKai.github.io" rel="nofollow noreferrer" target="_blank">趁你还年轻233的个人博客</a>
</li>
<li>前端开发交流群：660634678</li>
</ul>
<p>努力成为优秀前端工程师！</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PostCSS真的太好用了！

## 原文链接
[https://segmentfault.com/a/1190000014782560](https://segmentfault.com/a/1190000014782560)

