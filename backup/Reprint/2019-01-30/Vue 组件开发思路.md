---
title: 'Vue 组件开发思路' 
date: 2019-01-30 2:30:23
hidden: true
slug: 4td6uuq4b4c
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">说明</h2>
<p>前端开发中，随着业务的增多，出于效率的考虑，我们对于组件化开发的需求也越来越迫切。最近公司也在推行组件化，参考其他的组件库的思路，我用 vue 做了一个组件化的 demo <a href="https://www.npmjs.com/package/vueui-m" rel="nofollow noreferrer" target="_blank">vueui-m</a> 在这里记录下。（目前还不完善，仅作为一个 demo）</p>
<h2 id="articleHeader1">技术框架</h2>
<p>Vue.js 2.0<br>Webpack<br>Gulp<br>PostCSS<br>ES6/ES5</p>
<h2 id="articleHeader2">具体实现</h2>
<h3 id="articleHeader3">CSS</h3>
<p>CSS 首先要解决的是命名的问题。团队开发组件的过程中，要按照一定的约定，保证组件命名不会冲突。同时也要让组件使用者能够清晰的了解命名的含义。这里采用了 BEM 命名法。BEM 的意思就是块（block）、元素（element）、修饰符（modifier）,是由Yandex团队提出的一种前端命名方法论。<br>关于 BEM 命名法，举个例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".block{}
.block__element{}
.block--modifier{}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.block</span>{}
<span class="hljs-selector-class">.block__element</span>{}
<span class="hljs-selector-class">.block--modifier</span>{}    </code></pre>
<p>这里的 block 元素为块元素，它的后代元素在块元素后面加两个下划线，表示是它的后代。不同状态的元素在后面加两个英文状态下的破折号。<br>下面假设有个名为 m-page 和 m-button 的元素。其中 m-button-group 是一个单独的元素，不属于 m-button 后代，所以是单个破折号。更详细的信息可以自行搜索。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 不同后代 -->
<div class=&quot;m-page&quot;>
  <div class=&quot;m-page__header&quot;></div>
  <div class=&quot;m-page__body&quot;></div>
  <div class=&quot;m-page__footer&quot;></div>
</div>
<!-- 不同状态 -->
<div class=&quot;m-button-group&quot;>
    <div class=&quot;m-button&quot;></div>
    <div class=&quot;m-button--primary&quot;></div>
    <div class=&quot;m-button--success&quot;></div>
    <div class=&quot;m-button--cancel&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 不同后代 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-page"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-page__header"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-page__body"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-page__footer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 不同状态 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-button-group"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-button"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-button--primary"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-button--success"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"m-button--cancel"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>实际的开发过程中，可以将这种命名规范和其他的实践相结合，来适应自身项目。<br>但是，这种命名方法在写 CSS 时，手动写较长的命名效率会比较低。结合 postcss-bem 插件，能够帮我们解决这个问题。<br>经过配置，我们能够这样写 CSS，完美解决问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*我们写的格式*/
@component-namespace m {
 
  @b page {
    
    @e header {
      
      @m gray {
        background-color: #ccc;
      }
    }
  }
}
/*插件帮我们生成的*/
.m-page__header--gray {
    background-color: #ccc;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*我们写的格式*/</span>
@<span class="hljs-keyword">component</span>-<span class="hljs-keyword">namespace</span> m {
 
  @<span class="hljs-keyword">b</span> page {
    
    @<span class="hljs-keyword">e</span> header {
      
      @<span class="hljs-keyword">m</span> gray {
        <span class="hljs-selector-tag">background-color</span>: <span class="hljs-selector-id">#ccc</span>;
      }
    }
  }
}
<span class="hljs-comment">/*插件帮我们生成的*/</span>
<span class="hljs-selector-class">.m-page__header--gray</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ccc</span>;
}
</code></pre>
<p>同时，项目中使用了 cssnext 进行开发。cssnext 支持多种新特性，包括变量命名等。具体的可以参考<a href="http://cssnext.io/" rel="nofollow noreferrer" target="_blank">这里</a>。<br>结合 PostCSS，我们能够在项目中使用 cssnext 的语法。我这里使用了饿了么的<a href="https://github.com/ElemeFE/postcss-salad" rel="nofollow noreferrer" target="_blank">postcss-salad</a>插件处理这个问题。它整合了一些常用的功能，包括定义函数等功能。</p>
<h3 id="articleHeader4">JavaScript</h3>
<p>使用 Babel 转译 es6，不用多说。<br>另外在命名组件的过程中，有些组件会和原生 HTML 标签冲突，我们可以加一个前缀，比如 button 组件，命名为 mbutton 即可解决。</p>
<h2 id="articleHeader5">测试</h2>
<p>单元测试使用 Karma + Mocha + Chai，对组件进行单元测试。Demo中，由于时间原因，暂时只写了部分的单元测试用例。<br>端到端测试使用 Nightwatch。目前暂未编写端到端测试用例。==</p>
<h2 id="articleHeader6">打包策略</h2>
<p>使用 Webpack 和 Gulp 对我们写好的组件进行打包。<br>出于可维护的角度，我们的 Vue 组件和 CSS 在编写的时候就分为两个目录。然后打包的时候对它们分开打包。<br>对于 Vue 组件，使用 Webpack 进行生成的时候，把 output 的 libraryTarget 设置为 'umd'，使得产出的 JS 同时支持 AMD 和 CMD 规范。同时，我们生成的文件，会生成模块单独的文件以及一个整体的 Main.js。<br>对于 CSS，和 JS 类似，会生成一个整体的 Main.css 和 模块单独对应的 CSS 文件。</p>
<h2 id="articleHeader7">目录结构</h2>
<p>我们打包产出的文件产出在 lib 目录下。 lib 目录下有 components 和 styles 两个目录，分别对应 JS 和 CSS。<br>这个图片是发布到 npm 上的目录结构。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007715149?w=714&amp;h=526" src="https://static.alili.tech/img/remote/1460000007715149?w=714&amp;h=526" alt="目录图片" title="目录图片" style="cursor: pointer; display: inline;"></span></p>
<p>这个是 lib 目录下的内容。目前 Main.js 在 main 目录下，以后应该单独拿出来。main.css 在 styles 目录下和模块的 CSS 文件同级。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007715150?w=478&amp;h=824" src="https://static.alili.tech/img/remote/1460000007715150?w=478&amp;h=824" alt="lib目录" title="lib目录" style="cursor: pointer; display: inline;"></span></p>
<p>src 目录和 lib 目录类似。</p>
<h2 id="articleHeader8">引用方式</h2>
<p>JS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* umd格式，.js 结尾 */
//从整体文件中引入
import {Tab, MButton} from 'vueui-m'
//从单个文件中引入
import Tab from 'vueui-m/lib/components/tab'
import MButton from 'vueui-m/lib/components/mbutton'

/* Vue 组件格式，.vue 结尾 */
//从整体文件引入
import {Tab, MButton} from 'vueui-m/src/components/main'
//从单个文件中引入
import Tab from 'vueui-m/src/components/tab'
import MButton from 'vueui-m/src/components/mbutton'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* umd格式，.js 结尾 */</span>
<span class="hljs-comment">//从整体文件中引入</span>
<span class="hljs-keyword">import</span> {Tab, MButton} <span class="hljs-keyword">from</span> <span class="hljs-string">'vueui-m'</span>
<span class="hljs-comment">//从单个文件中引入</span>
<span class="hljs-keyword">import</span> Tab <span class="hljs-keyword">from</span> <span class="hljs-string">'vueui-m/lib/components/tab'</span>
<span class="hljs-keyword">import</span> MButton <span class="hljs-keyword">from</span> <span class="hljs-string">'vueui-m/lib/components/mbutton'</span>

<span class="hljs-comment">/* Vue 组件格式，.vue 结尾 */</span>
<span class="hljs-comment">//从整体文件引入</span>
<span class="hljs-keyword">import</span> {Tab, MButton} <span class="hljs-keyword">from</span> <span class="hljs-string">'vueui-m/src/components/main'</span>
<span class="hljs-comment">//从单个文件中引入</span>
<span class="hljs-keyword">import</span> Tab <span class="hljs-keyword">from</span> <span class="hljs-string">'vueui-m/src/components/tab'</span>
<span class="hljs-keyword">import</span> MButton <span class="hljs-keyword">from</span> <span class="hljs-string">'vueui-m/src/components/mbutton'</span></code></pre>
<p>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 引入整体文件 */
@import '~vueui-m/lib/styles/main.css'
/* 引入单个文件 */
@import '~vueui-m/lib/styles/tab.css'
@import '～vueui-m/lib/styles/m-button.css'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS"><span class="hljs-comment">/* 引入整体文件 */</span>
@<span class="hljs-keyword">import</span> <span class="hljs-string">'~vueui-m/lib/styles/main.css'</span>
/* 引入单个文件 */
@import <span class="hljs-string">'~vueui-m/lib/styles/tab.css'</span>
@import <span class="hljs-string">'～vueui-m/lib/styles/m-button.css'</span></code></pre>
<p>目前对于 JS 和 CSS 需要引入两次，以后可以引入 <a href="https://www.npmjs.com/package/babel-plugin-component" rel="nofollow noreferrer" target="_blank">babel-plugin-component</a> 插件，使得引入一个组件的时候不需要再手动引入对应的 CSS。</p>
<h2 id="articleHeader9">参考</h2>
<p>这个 demo 的完成，参考了一些别的组件库的制作思路。<br><a href="http://element.eleme.io/" rel="nofollow noreferrer" target="_blank">element-ui</a><br><a href="http://vux.li/" rel="nofollow noreferrer" target="_blank">vux</a><br><a href="https://ant.design/" rel="nofollow noreferrer" target="_blank">ant.design</a><br>向他们表示感谢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 组件开发思路

## 原文链接
[https://segmentfault.com/a/1190000007715146](https://segmentfault.com/a/1190000007715146)

