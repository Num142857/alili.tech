---
title: '看完你也想编写自己的 react 插件' 
date: 2018-12-11 2:30:10
hidden: true
slug: lgipj7j16r
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>副标题----为什么我要写这个 react 插件</blockquote>
<p>图片懒加载是项目中常用的功能，然而现有 react 懒加载组件库，用着都不是很爽了 ?。概括一下有如下几点：</p>
<ul>
<li>没有只针对 image 懒加载组件。多数组件库都内置了模块、组件、脚本、iframe 懒加载功能，而弱化了 image 懒加载功能。</li>
<li>不支持动画显示效果。</li>
<li>不灵活，可配置度不高。</li>
<li>placeholder 不能组件化。</li>
<li>不支持响应式图片( picture / srcset )。</li>
</ul>
<h2 id="articleHeader0"><a href="https://github.com/zhansingsong/react-lazyimg-component" rel="nofollow noreferrer" target="_blank">react-lazyimg-component</a></h2>
<p>清楚自己想要什么样的组件，就自己动手撸呗 ?。于是乎，<a href="https://github.com/zhansingsong/react-lazyimg-component" rel="nofollow noreferrer" target="_blank">react-lazyimg-component</a> 就诞生了 ?。咱们先来看看它的效果吧：</p>
<blockquote>singsong: 如果大家有时间，窝还是鼓励大家自己动手实现一些小插件。</blockquote>
<ul><li>PC 预览：</li></ul>
<p><a href="http://zhansingsong.github.io/lazyimg/" rel="nofollow noreferrer" target="_blank">使劲猛击这里</a></p>
<ul><li>手机预览(扫一扫)：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013614819?w=200&amp;h=200" src="https://static.alili.tech/img/remote/1460000013614819?w=200&amp;h=200" alt="qrcode" title="qrcode" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">什么情况需要使用它</h2>
<h3 id="articleHeader2">1. 小巧轻便，简单易用，基本无学习成本</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013614820?w=596&amp;h=366" src="https://static.alili.tech/img/remote/1460000013614820?w=596&amp;h=366" alt="jq" title="jq" style="cursor: pointer; display: inline;"></span></p>
<p>在那个 jQuery 一统天下的年代，撸代码就用 jQuery 一把梭。其中<br>jQuery.lazyload 是一个很常用图片懒加载插件。 可能很多像我一样的小伙伴们，懒加载就直接上 jQuery.lazyload，早已习惯了 jQuery.lazyload 使用。 于是自己就琢磨能否继承 jQuery.lazyload 使用方法同时保持 react 特有组件特性。这样可以很快上手<del>~</del>?</p>
<blockquote>singsong: 这里只是继承了 jQuery.lazyload 配置特性，不是完全继承。毕竟 jQuery 与现在主流的 MVVM 框架思想截然不同。</blockquote>
<p>如果小伙伴们熟悉 jQuery.lazyload ， 完全没有学习成本直接上手 <strong>react-lazyimg-component</strong> 哈。 只说不是写，然并卵。那我们来看看它到底好用不：</p>
<h4>安装</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// npm
$> npm install react-lazyimg-component
// yarn
$> yarn add react-lazyimg-component" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// npm</span>
$&gt; npm install react-lazyimg-component
<span class="hljs-comment">// yarn</span>
$&gt; yarn add react-lazyimg-component</code></pre>
<h4>使用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入
import Lazyimg, { withLazyimg } from 'react-lazyimg-component';

// 调用
<Lazyimg
  className=&quot;lazy&quot;
  src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
/>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 引入</span>
<span class="hljs-keyword">import</span> Lazyimg, { withLazyimg } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-lazyimg-component'</span>;

<span class="hljs-comment">// 调用</span>
&lt;Lazyimg
  className=<span class="hljs-string">"lazy"</span>
  src={<span class="hljs-string">'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'</span>}
/&gt;;</code></pre>
<p>是不是很简单，有木有 ?。上述只是使用 <strong>react-lazyimg-component</strong> 的默认配置。 这里我们可以通过配置项来定制懒加载的行为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入 lazyimg
import Lazyimg, { withLazyimg } from 'react-lazyimg-component';
// 引入 volecity.js
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

// 配置
const config = {
  threshold: 100, // 指定触发阈值
  js_effect: 'transition.fadeIn', // 支持 velocity.js 动画效果
};
// 基于配置项生成对应 Lazy 组件
const Lazy = withLazyimg(config);

// 调用
<Lazy
  className=&quot;lazy&quot;
  src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
/>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 引入 lazyimg</span>
<span class="hljs-keyword">import</span> Lazyimg, { withLazyimg } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-lazyimg-component'</span>;
<span class="hljs-comment">// 引入 volecity.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'velocity-animate'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'velocity-animate/velocity.ui'</span>;

<span class="hljs-comment">// 配置</span>
<span class="hljs-keyword">const</span> config = {
  <span class="hljs-attr">threshold</span>: <span class="hljs-number">100</span>, <span class="hljs-comment">// 指定触发阈值</span>
  js_effect: <span class="hljs-string">'transition.fadeIn'</span>, <span class="hljs-comment">// 支持 velocity.js 动画效果</span>
};
<span class="hljs-comment">// 基于配置项生成对应 Lazy 组件</span>
<span class="hljs-keyword">const</span> Lazy = withLazyimg(config);

<span class="hljs-comment">// 调用</span>
&lt;Lazy
  className=<span class="hljs-string">"lazy"</span>
  src={<span class="hljs-string">'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'</span>}
/&gt;;</code></pre>
<p>接下来我们来看看 <strong>react-lazyimg-component</strong> 都那些配置项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="threshold: 0, // 指定距离底部多少距离时触发加载
event: 'scroll', // 指定触发事件，默认为'scroll'
js_effect: undefined, // 显示图片的js动画效果
css_effect: undefined, // 显示图片的css动画效果
container: window, // 指定容器，默认为window
parent: undefined, // 可以指定动画效果作用于元素的哪个父级元素
appear: null, // 元素出现在可视窗口时触发appear钩子函数
load: null,  // 元素图片的加载完后触发load钩子函数
error: null, // 图片加载出错时触发error钩子函数
node_type: 'img', // 指定生成的节点类型，默认为'img'
placeholder: // 占位元素，除了支持普通的图片外，还支持react组件。
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">threshold: <span class="hljs-number">0</span>, <span class="hljs-comment">// 指定距离底部多少距离时触发加载</span>
event: <span class="hljs-string">'scroll'</span>, <span class="hljs-comment">// 指定触发事件，默认为'scroll'</span>
js_effect: <span class="hljs-literal">undefined</span>, <span class="hljs-comment">// 显示图片的js动画效果</span>
css_effect: <span class="hljs-literal">undefined</span>, <span class="hljs-comment">// 显示图片的css动画效果</span>
container: <span class="hljs-built_in">window</span>, <span class="hljs-comment">// 指定容器，默认为window</span>
parent: <span class="hljs-literal">undefined</span>, <span class="hljs-comment">// 可以指定动画效果作用于元素的哪个父级元素</span>
appear: <span class="hljs-literal">null</span>, <span class="hljs-comment">// 元素出现在可视窗口时触发appear钩子函数</span>
load: <span class="hljs-literal">null</span>,  <span class="hljs-comment">// 元素图片的加载完后触发load钩子函数</span>
error: <span class="hljs-literal">null</span>, <span class="hljs-comment">// 图片加载出错时触发error钩子函数</span>
node_type: <span class="hljs-string">'img'</span>, <span class="hljs-comment">// 指定生成的节点类型，默认为'img'</span>
placeholder: <span class="hljs-comment">// 占位元素，除了支持普通的图片外，还支持react组件。</span>
  <span class="hljs-string">'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'</span>,</code></pre>
<p>是不是很眼熟 ?，如果你熟悉 jquery.lazyload，那么你只需了解如下几个配置项即可：</p>
<ul>
<li>js_effect: 指定元素显示的动画效果，基于<code>velocity.js</code>动画实现。使用之前需加载<code>velocity.js</code>。</li>
<li>css_effect: 指定元素显示的动画效果，基于<code>animate.css</code>动画实现。使用之前需安装<code>animate.css</code>。</li>
<li>
<p>parent: 用于指定动画效果作用于元素的哪个父级元素。可取值：</p>
<ul>
<li>父元素的 selector 选择器（字符串）</li>
<li>父级层级 level（整数）</li>
</ul>
</li>
<li>node_type: 指定 react 将生成的元素类型，默认为'img'。</li>
<li>placeholder: 占位元素，除了支持普通的图片外，还支持 react 组件。</li>
</ul>
<h3 id="articleHeader3">2. 支持 <a href="https://github.com/julianshapiro/velocity" rel="nofollow noreferrer" target="_blank">velocity.js</a>、<a href="https://github.com/daneden/animate.css" rel="nofollow noreferrer" target="_blank">animate.css</a> 动画效果库，及自定动画效果。同时还支持动画效果作用于父级元素。</h3>
<ul><li>指定 <strong>js-effect</strong> 配置项来配置 <strong>velocity.js</strong> 动画效果</li></ul>
<blockquote>注意：js-effect 依赖于 velocity.js。需要确保 velocity.js 已加载。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入 lazyimg
import Lazyimg, { withLazyimg } from 'react-lazyimg-component';
// 引入 volecity.js
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
// 配置
const config = {
  placeholder: 'loading.svg',
  js_effect: 'transition.fadeIn', // 支持 velocity.js 动画效果
};
const Lazy = withLazyimg(config);
// 调用
<Lazy
  className=&quot;lazy&quot;
  src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
/>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 引入 lazyimg</span>
<span class="hljs-keyword">import</span> Lazyimg, { withLazyimg } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-lazyimg-component'</span>;
<span class="hljs-comment">// 引入 volecity.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'velocity-animate'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'velocity-animate/velocity.ui'</span>;
<span class="hljs-comment">// 配置</span>
<span class="hljs-keyword">const</span> config = {
  <span class="hljs-attr">placeholder</span>: <span class="hljs-string">'loading.svg'</span>,
  <span class="hljs-attr">js_effect</span>: <span class="hljs-string">'transition.fadeIn'</span>, <span class="hljs-comment">// 支持 velocity.js 动画效果</span>
};
<span class="hljs-keyword">const</span> Lazy = withLazyimg(config);
<span class="hljs-comment">// 调用</span>
&lt;Lazy
  className=<span class="hljs-string">"lazy"</span>
  src={<span class="hljs-string">'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'</span>}
/&gt;;</code></pre>
<p>直接上效果了 ?</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013614821?w=702&amp;h=755" src="https://static.alili.tech/img/remote/1460000013614821?w=702&amp;h=755" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>指定 <strong>css-effect</strong> 配置项来配置 <strong>animate.css</strong> 动画效果</li></ul>
<blockquote>注意：css-effect 依赖于 animate.css。需要确保 animate.css 已安装。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 配置
  const config = {
    js_effect=&quot;transition.flipXIn&quot; // 不会生效
    css_effect={['animated', 'rollIn']} // 定制 css 动画效果
  };
  const Lazy = withLazyimg(config);
  // 调用
  <Lazy
    className=&quot;lazy&quot;
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
  />;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// 配置</span>
  <span class="hljs-keyword">const</span> config = {
    js_effect=<span class="hljs-string">"transition.flipXIn"</span> <span class="hljs-comment">// 不会生效</span>
    css_effect={[<span class="hljs-string">'animated'</span>, <span class="hljs-string">'rollIn'</span>]} <span class="hljs-comment">// 定制 css 动画效果</span>
  };
  <span class="hljs-keyword">const</span> Lazy = withLazyimg(config);
  <span class="hljs-comment">// 调用</span>
  &lt;Lazy
    className=<span class="hljs-string">"lazy"</span>
    src={<span class="hljs-string">'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'</span>}
  /&gt;;</code></pre>
<p>直接上效果了 ?</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013614822?w=702&amp;h=748" src="https://static.alili.tech/img/remote/1460000013614822?w=702&amp;h=748" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ul><li>指定 <strong>parent</strong> 配置项指定父级元素动画效果</li></ul>
<blockquote>singsong: 为什么懒加载的动画效果只作用于目标元素，某些条件下作用于目标元素的父级元素会有意想不到效果哦 ?。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div className=&quot;example&quot;>
  // 指定动画效果作用于该父级元素
  <Title title=&quot;父级动画效果&quot; className=&quot;sub&quot; />
  <div className=&quot;example-img&quot;>
    <Lazyimg
      className=&quot;lazy&quot;
      src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
      css_effect={['animated', 'flipInY']} // 定制 css 动画效果
      parent=&quot;.example&quot; // 指定父级元素选择器，也可以指定父级层级level：2
    />
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div className=<span class="hljs-string">"example"</span>&gt;
  <span class="hljs-comment">// 指定动画效果作用于该父级元素</span>
  &lt;Title title=<span class="hljs-string">"父级动画效果"</span> className=<span class="hljs-string">"sub"</span> /&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"example-img"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Lazyimg</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">"lazy"</span>
      <span class="hljs-attr">src</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">http:</span>//<span class="hljs-attr">zhansingsong.github.io</span>/<span class="hljs-attr">lazyimg</span>/<span class="hljs-attr">22.4582fc71.jpg</span>'}
      <span class="hljs-attr">css_effect</span>=<span class="hljs-string">{[</span>'<span class="hljs-attr">animated</span>', '<span class="hljs-attr">flipInY</span>']} // 定制 <span class="hljs-attr">css</span> 动画效果
      <span class="hljs-attr">parent</span>=<span class="hljs-string">".example"</span> // 指定父级元素选择器，也可以指定父级层级<span class="hljs-attr">level</span>：<span class="hljs-attr">2</span>
    /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>直接上效果了 ?</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013614823?w=706&amp;h=755" src="https://static.alili.tech/img/remote/1460000013614823?w=706&amp;h=755" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">3. react 组件式 placeholder</h3>
<blockquote>singsong: 传统的 placeholder 通常都是由图片来代替，为什么不能用组件来定制，这样可扩展性更高。完全可以摆脱设计师的束缚，咋们开发自由发挥?! 想想有木有有点小鸡冻 ?<del>~</del>~</blockquote>
<ul><li>先定义 placeholder 组件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import './style.scss';
export default props => {
  let { className, text, img, children } = props;
  return (
    <div
      className={['placeholder', className]
        .filter(item => {
          if (item) {
            return item;
          }
        })
        .join(' ')}
    >
      {img &amp;&amp; <img src={img} className=&quot;placeholder-img&quot; />}
      {text &amp;&amp; <span className=&quot;placeholder-text&quot;>{children || text}</span>}
    </div>
  );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./style.scss'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> props =&gt; {
  <span class="hljs-keyword">let</span> { className, text, img, children } = props;
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">{[</span>'<span class="hljs-attr">placeholder</span>', <span class="hljs-attr">className</span>]
        <span class="hljs-attr">.filter</span>(<span class="hljs-attr">item</span> =&gt;</span> {
          if (item) {
            return item;
          }
        })
        .join(' ')}
    &gt;
      {img &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{img}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"placeholder-img"</span> /&gt;</span>}
      {text &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"placeholder-text"</span>&gt;</span>{children || text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  );
};</span></code></pre>
<ul><li>指定 placeholder 配置项为上述定义的 placeholder 组件</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 配置
const Lazy = withLazyimg({
  js_effect: 'transition.perspectiveDownIn',
  placeholder: <Placeholder img={require('./loading.svg')} />,
});
// 调用
<Lazy
  className=&quot;lazy&quot;
  src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
/>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 配置</span>
<span class="hljs-keyword">const</span> Lazy = withLazyimg({
  <span class="hljs-attr">js_effect</span>: <span class="hljs-string">'transition.perspectiveDownIn'</span>,
  <span class="hljs-attr">placeholder</span>: &lt;Placeholder img={require('./loading.svg')} /&gt;,
});
// 调用
&lt;Lazy
  className="lazy"
  src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
/&gt;;</code></pre>
<p>直接上效果了 ?</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013614824?w=702&amp;h=851" src="https://static.alili.tech/img/remote/1460000013614824?w=702&amp;h=851" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote>singsong: 图中小火焰有木有很耀眼<del>~</del>
</blockquote>
<p>接着咋们来看看组件式 placeholder 应用场景案例，直接上效果了 ?</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013614825?w=371&amp;h=669" src="https://static.alili.tech/img/remote/1460000013614825?w=371&amp;h=669" alt="" title="" style="cursor: pointer;"></span></p>
<p>上图是分类页通过定制显示文案的 placeholder 组件来代替普通的灰色图片，效果是不是看着还行 ?。这是我在实际项目中使用的案例。这里小伙伴可以自由发挥哈<del>~</del>。如果你有不错 idea 可以@我哈，先谢了！</p>
<h3 id="articleHeader5">4. 响应式图片( picture / srcset )</h3>
<p>为了实现 web 应用的极致体验，Progressive Web App 渐进式网页应用程序越来越受到开发者们重视，其中响应式图片就是其中一个重要技术项。为了跟着大部队，咋们也需要了解了解噢！</p>
<ul><li>srcset 特性实现响应式图片</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // dpr
  <Lazyimg
    className=&quot;lazy&quot;
    src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
    srcSet=&quot;source_1x.png 1x, source_2x.png 2x, source_3x.png 3x, source_3.5x.png 3.5x&quot;
    js_effect=&quot;transition.bounceIn&quot;
  />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  // dpr
  <span class="hljs-tag">&lt;<span class="hljs-name">Lazyimg</span>
    <span class="hljs-attr">className</span>=<span class="hljs-string">"lazy"</span>
    <span class="hljs-attr">src</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">http:</span>//<span class="hljs-attr">zhansingsong.github.io</span>/<span class="hljs-attr">lazyimg</span>/<span class="hljs-attr">22.4582fc71.jpg</span>'}
    <span class="hljs-attr">srcSet</span>=<span class="hljs-string">"source_1x.png 1x, source_2x.png 2x, source_3x.png 3x, source_3.5x.png 3.5x"</span>
    <span class="hljs-attr">js_effect</span>=<span class="hljs-string">"transition.bounceIn"</span>
  /&gt;</span></code></pre>
<p>直接上效果了 ?</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013614826?w=480&amp;h=577" src="https://static.alili.tech/img/remote/1460000013614826?w=480&amp;h=577" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>singsong: 这里 srcset 配合 sizes 特性可以实现更好的效果</blockquote>
<ul><li>picture 元素实现响应式图片</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <picture>
      <source media=&quot;(min-width: 650px)&quot; srcSet=&quot;https://www.w3schools.com/tags/img_pink_flowers.jpg&quot; />
      <source media=&quot;(min-width: 465px)&quot; srcSet=&quot;https://www.w3schools.com/tags/img_white_flower.jpg&quot;/>
      <Lazyimg
      className=&quot;lazy&quot;
      src={'http://zhansingsong.github.io/lazyimg/22.4582fc71.jpg'}
      js_effect=&quot;transition.expandIn&quot;
    />
  </picture>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">picture</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">media</span>=<span class="hljs-string">"(min-width: 650px)"</span> <span class="hljs-attr">srcSet</span>=<span class="hljs-string">"https://www.w3schools.com/tags/img_pink_flowers.jpg"</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">media</span>=<span class="hljs-string">"(min-width: 465px)"</span> <span class="hljs-attr">srcSet</span>=<span class="hljs-string">"https://www.w3schools.com/tags/img_white_flower.jpg"</span>/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Lazyimg</span>
      <span class="hljs-attr">className</span>=<span class="hljs-string">"lazy"</span>
      <span class="hljs-attr">src</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">http:</span>//<span class="hljs-attr">zhansingsong.github.io</span>/<span class="hljs-attr">lazyimg</span>/<span class="hljs-attr">22.4582fc71.jpg</span>'}
      <span class="hljs-attr">js_effect</span>=<span class="hljs-string">"transition.expandIn"</span>
    /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">picture</span>&gt;</span></code></pre>
<p>直接上效果了 ?</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013614827" src="https://static.alili.tech/img/remote/1460000013614827" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">后语</h2>
<p>这个插件是我由项目中提炼出的，个人用着还挺顺手，就拿出与大家分享分享。另外，毕竟个人能力有限，如果你发现插件有问题或有什么好的建议，也请告知一下，先这里谢过了 ?。最后欢迎star?、欢迎watch?、欢迎fork?</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
看完你也想编写自己的 react 插件

## 原文链接
[https://segmentfault.com/a/1190000013614814](https://segmentfault.com/a/1190000013614814)

