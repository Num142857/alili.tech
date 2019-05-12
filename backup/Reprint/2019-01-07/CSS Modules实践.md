---
title: 'CSS Modules实践' 
date: 2019-01-07 2:30:11
hidden: true
slug: lj3nqg04j0a
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>文章同步于Github <a href="https://github.com/Pines-Cheng/blog/issues/13" rel="nofollow noreferrer" target="_blank">Pines-Cheng/blog</a></p></blockquote>
<p>随着前端这几年的风生水起，CSS作为前端的三剑客之一，各种技术方案也是层出不穷。从CSS prepocessor（SASS、LESS、Stylus）到后来的后起之秀 <code>PostCSS</code>，再到 <code>CSS Modules</code>、<code>Styled-Component</code> 等。有人维护了一份完整的 <a href="https://github.com/MicheleBertoli/css-in-js" rel="nofollow noreferrer" target="_blank">CSS in JS 技术方案的对比</a>，里面已经有将近50种技术方案。<code>CSS Modules</code>就是其中一种。</p>
<h2 id="articleHeader0">CSS Modules 介绍</h2>
<p>要弄懂<code>CSS Modules</code>是什么，可以先看官方介绍：<a href="https://github.com/css-modules/css-modules" rel="nofollow noreferrer" target="_blank">GitHub – css-modules/css-modules: Documentation about css-modules</a>。</p>
<p>通过上面介绍可以看出，<code>CSS Modules</code>既不是官方标准，也不是浏览器的特性，而是在构建步骤（例如使用Webpack或Browserify）中对CSS类名选择器限定作用域的一种方式（通过hash实现类似于命名空间的方法）。例如我们在buttons.js里引入buttons.css文件，并使用.btn的样式，在其他组件里是不会被.btn影响的，除非它也引入了buttons.css.</p>
<h2 id="articleHeader1">CSS模块化</h2>
<p>JS已经全面实现了模块化，但是css还处于探索阶段。为什么我们需要css模块化？主要由一下几个原因。</p>
<h3 id="articleHeader2">CSS全局作用域问题</h3>
<p>CSS的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。现在的前端工程大多是基于组件开发，随着工程的页面数量好复杂度的提升，相信写css的人都会遇到样式冲突（污染）的问题。一般我们会采用一下几种方法：</p>
<ul>
<li><p>class命名写长一点吧，降低冲突的几率</p></li>
<li><p>加个父元素的选择器，限制范围</p></li>
<li><p>重新命名个class吧，比较保险</p></li>
</ul>
<p>可是以上方案只是降低了全局冲突的概率，并不能彻底解决全局冲突的问题。并且，实现方式也不够优雅，还增加了代码的复杂和冗余。</p>
<h3 id="articleHeader3">我们的追求</h3>
<ul>
<li><p>面向组件开发 ： 处理 UI 复杂性的最佳实践就是将 UI 分割成一个个的小组件，React 就鼓励高度组件化和分割。我们希望有一个 CSS 架构去匹配。</p></li>
<li><p>沙箱化（<code>Sandboxed</code>） ： 如果一个组件的样式会对其他组件产生不必要以及意想不到的影响，那么将 UI 分割成组件并没有什么用。就这方面而言，CSS的全局作用域会给你造成负担。</p></li>
<li><p>方便 ：不会增加开发的负担和代码的冗余。</p></li>
</ul>
<h2 id="articleHeader4">方案</h2>
<p>CSS 模块化的解决方案有很多，但主要有三类。</p>
<h3 id="articleHeader5">CSS 命名约定</h3>
<p>规范化CSS的模块化解决方案（比如BEM BEM — Block Element Modifier ,OOCSS,AMCSS,SMACSS,SUITCSS)<br>但存在以下问题：</p>
<ul>
<li><p>JS CSS之间依然没有打通变量和选择器等</p></li>
<li><p>复杂的命名</p></li>
</ul>
<h3 id="articleHeader6">CSS in JS</h3>
<p>彻底抛弃 CSS，用 JavaScript 写 CSS 规则，并内联样式。<a href="https://github.com/styled-components/styled-components" rel="nofollow noreferrer" target="_blank">styled-components</a> 就是其中代表。styled-components可以让CSS真正意义地写到JS里面，同时让标签更具有语意化，这跟HTML5新标签思想相同；该框架让样式也具备组件化思想，让前端完全面向组件化编程，就像java的包装类型。<br>但存在以下问题：</p>
<ul>
<li><p>样式代码也会出现大量重复。</p></li>
<li><p>不能利用成熟的 CSS 预处理器（或后处理器）</p></li>
</ul>
<h3 id="articleHeader7">使用 JS 来管理样式模块</h3>
<p>使用JS编译原生的CSS文件，使其具备模块化的能力，代表是 CSS Modules。</p>
<p>CSS Module还是JS和CSS分离的写法，不会改变大家的书写习惯，CSS Module只需修改构建代码和使用模块依赖引入className的方式即可使用，且支持less和sass的语法，</p>
<p>使用CSS Modules可以让组件className控制权转交给JS，我们不会去关心命名冲突污染等问题，同时可以灵活控制生成的命名，样式代码不用修改即可让使用CSS语法的旧项目零成本接入。</p>
<p>CSS Modules 能最大化地结合现有 CSS 生态(预处理器/后处理器等)和 JS 模块化能力，几乎零学习成本。只要你使用 Webpack，可以在任何项目中使用。是目前最好的 CSS 模块化解决方案。</p>
<h2 id="articleHeader8">使用</h2>
<h3 id="articleHeader9">配置</h3>
<p>CSS Modules配置非常简单，如果你使用webpack，只需要在配置文件中改动一行即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
css?modules&amp;localIdentName=[name]__[local]-[hash:base64:5]
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.config.js</span>
css?modules&amp;localIdentName=[name]__[local]-[hash:base64:<span class="hljs-number">5</span>]
 </code></pre>
<p>加上 modules 即为启用，localIdentName 是设置生成样式的命名规则。</p>
<h3 id="articleHeader10">编码</h3>
<p>css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* components/Button.css */
.normal { /* normal 相关的所有样式 */ }
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* components/Button.css */</span>
<span class="hljs-selector-class">.normal</span> { <span class="hljs-comment">/* normal 相关的所有样式 */</span> }
 </code></pre>
<p>js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// components/Button.js
import styles from './Button.css';
console.log(styles);
buttonElem.outerHTML = `<button class=${styles.normal}>Submit</button>`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// components/Button.js</span>
<span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">'./Button.css'</span>;
<span class="hljs-built_in">console</span>.log(styles);
buttonElem.outerHTML = <span class="hljs-string">`&lt;button class=<span class="hljs-subst">${styles.normal}</span>&gt;Submit&lt;/button&gt;`</span>
</code></pre>
<p>上例中 console 打印styles的结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object {
  normal: 'button--normal-abc53',
  disabled: 'button--disabled-def886',
}
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span> {
  <span class="hljs-attr">normal</span>: <span class="hljs-string">'button--normal-abc53'</span>,
  <span class="hljs-attr">disabled</span>: <span class="hljs-string">'button--disabled-def886'</span>,
}
 </code></pre>
<p>注意到 button--normal-abc53 是 CSS Modules 按照 localIdentName 自动生成的 class 名。其中的 abc53 是按照给定算法生成的序列码。经过这样混淆处理后，class 名基本就是唯一的，大大降低了项目中样式覆盖的几率。同时在生产环境下修改规则，生成更短的 class 名，可以提高 CSS 的压缩率。</p>
<p>CSS Modules 对 CSS 中的 class 名都做了处理，使用对象来保存原 class 和混淆后 class 的对应关系。</p>
<h2 id="articleHeader11">React实践</h2>
<h3 id="articleHeader12">手动引用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import styles from './table.css';
 
export default class Table extends React.Component {
    render () {
        return <div className={styles.table}>
            <div className={styles.row}>
            </div>
        </div>;
    }
}
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">'./table.css'</span>;
 
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Table</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render () {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.table}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{styles.row}</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
}
 </code></pre>
<p>渲染结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;table__table___32osj&quot;>
    <div class=&quot;table__row___2w27N&quot;>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"table__table___32osj"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"table__row___2w27N"</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<h3 id="articleHeader13">使用babel-plugin-react-css-modules</h3>
<p>babel-plugin-react-css-modules 可以实现使用styleName属性自动加载CSS模块。只需要把className换成styleName即可获得CSS局部作用域的能力，babel插件来自动进行语法树解析并最终生成className。改动成本极小，不会增加JSX的复杂度，也不会给项目带来额外的负担。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import styles from './table.css';
 
class Table extends React.Component {
    render () {
        return <div styleName='table'>
        </div>;
    }
}
 
export default Table；
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> styles <span class="hljs-keyword">from</span> <span class="hljs-string">'./table.css'</span>;
 
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Table</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render () {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">styleName</span>=<span class="hljs-string">'table'</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
}
 
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Table；
 </code></pre>
<p>CSS Modules 很好的解决了 CSS 目前面临的模块化难题。支持与 CSS处理器搭配使用，能充分利用现有技术积累。如果你的产品中正好遇到类似问题，非常值得一试。</p>
<h2 id="articleHeader14">参考</h2>
<ul>
<li><p><a href="http://www.alloyteam.com/2017/03/getting-started-with-css-modules-and-react-in-practice/" rel="nofollow noreferrer" target="_blank">CSS Modules 入门及 React 中实践</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2016/06/css_modules.html" rel="nofollow noreferrer" target="_blank">CSS Modules 用法教程</a></p></li>
<li><p><a href="http://www.alloyteam.com/2017/05/guide-styled-components/" rel="nofollow noreferrer" target="_blank">Styled Components：让样式也成为组件</a></p></li>
<li><p><a href="https://github.com/dt-fe/weekly/issues/12" rel="nofollow noreferrer" target="_blank">精读《请停止 css-in-js 的行为》</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS Modules实践

## 原文链接
[https://segmentfault.com/a/1190000010301977](https://segmentfault.com/a/1190000010301977)

