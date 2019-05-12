---
title: '详解 Weex 页面的渲染过程' 
date: 2019-01-06 2:30:10
hidden: true
slug: zgtgg435dc
categories: [reprint]
---

{{< raw >}}

                    
<p>这篇文章介绍了一个 Weex 页面的渲染过程，涉及很多框架内部的细节。</p>
<h2 id="articleHeader0">“哟”</h2>
<p><span class="img-wrap"><img data-src="/img/bVRSAY?w=2436&amp;h=1370" src="https://static.alili.tech/img/bVRSAY?w=2436&amp;h=1370" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p><a href="http://dotwe.org/vue/ee9fcff158ae82631f101782c7ac0d57" rel="nofollow noreferrer" target="_blank">在线例子</a>，使用 <a href="http://weex.apache.org/cn/playground.html" rel="nofollow noreferrer" target="_blank">Weex Playground</a> 扫码即可预览。</p></blockquote>
<p>这是一个使用 <a href="https://vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">Vue.js 2.x</a> 语法写的一个小例子，极其简单，就一个字，可以借助 Weex 在移动端中渲染生成原生组件。</p>
<p>这也是实现文字水平垂直居中的最简例子。</p>
<h3 id="articleHeader1">源代码</h3>
<p>组件代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- yo.vue -->
<template>
  <div style=&quot;justify-content:center;&quot;>
    <text class=&quot;freestyle&quot;>哟</text>
  </div>
</template>

<style scoped>
  .freestyle {
    text-align: center;
    font-size: 200px;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- yo.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"justify-content:center;"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"freestyle"</span>&gt;</span>哟<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.freestyle</span> {
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">200px</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>除了组件代码以外，还需要一个入口文件指定挂载点并触发渲染：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry.js
import Vue from 'vue'
import Yo from 'yo.vue'

Yo.el = '#root'
new Vue(Yo)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// entry.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Yo <span class="hljs-keyword">from</span> <span class="hljs-string">'yo.vue'</span>

Yo.el = <span class="hljs-string">'#root'</span>
<span class="hljs-keyword">new</span> Vue(Yo)</code></pre>
<h2 id="articleHeader2">编译</h2>
<p><code>.vue</code> 文件是无法被直接执行的，必须要编译成 <code>.js</code> 格式的文件才可以被 Web 或 Weex 平台执行。</p>
<p><code>.vue</code> 文件通常可以分为三部分：<code>&lt;template&gt;</code> 、<code>&lt;style&gt;</code> 和 <code>&lt;script&gt;</code>，<code>&lt;template&gt;</code> 是必须要有的，其他可选。其中 <code>&lt;script&gt;</code> 中的代码会保留或者被转换成 ES5 的语法；<code>&lt;style&gt;</code> 中的 CSS 在 Weex 平台上会被转换成 JSON 格式的样式声明，放到组件的定义中去；<code>&lt;template&gt;</code> 会被编译生成组件定义中 render 函数，可以理解为 render 函数的语法糖。</p>
<p>上述例子真实生成的代码是<a href="http://dotwe.org/raw/dist/fc1ad62998bb1dd00f007711d57ed375.bundle.wx" rel="nofollow noreferrer" target="_blank">这样的</a>，比较乱，把模块解开将其简化一下，和下边的代码等价：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// { &quot;framework&quot;: &quot;Vue&quot; }

new Vue({
  el: '#root',
  style: {
    freestyle: {
      textAlign: 'center',
      fontSize: 200
    }
  },
  render: function (h) {
    return h(
      'div',
      { staticStyle: { justifyContent: 'center' } },
      [h(
        'text',
        { staticClass: ['freestyle'] },
        ['哟']
      )]
    )
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// { "framework": "Vue" }</span>

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#root'</span>,
  <span class="hljs-attr">style</span>: {
    <span class="hljs-attr">freestyle</span>: {
      <span class="hljs-attr">textAlign</span>: <span class="hljs-string">'center'</span>,
      <span class="hljs-attr">fontSize</span>: <span class="hljs-number">200</span>
    }
  },
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">h</span>) </span>{
    <span class="hljs-keyword">return</span> h(
      <span class="hljs-string">'div'</span>,
      { <span class="hljs-attr">staticStyle</span>: { <span class="hljs-attr">justifyContent</span>: <span class="hljs-string">'center'</span> } },
      [h(
        <span class="hljs-string">'text'</span>,
        { <span class="hljs-attr">staticClass</span>: [<span class="hljs-string">'freestyle'</span>] },
        [<span class="hljs-string">'哟'</span>]
      )]
    )
  }
})</code></pre>
<h2 id="articleHeader3">执行</h2>
<h3 id="articleHeader4">初始化执行环境</h3>
<p>要想在移动端上执行上述代码，就需要集成 Weex SDK。</p>
<p>在应用启动时就会初始化 Weex SDK，准备好执行环境，然后可以从网络或者本地加载打包好的 js 文件，调用 SDK 提供的 render 或者 renderWithURL 方法启动渲染。</p>
<p><span class="img-wrap"><img data-src="/img/bVRRJu?w=1608&amp;h=1608" src="https://static.alili.tech/img/bVRRJu?w=1608&amp;h=1608" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>图中画出了 Weex SDK 的部分内容。其中 <code>weex-vue-framework</code> 和 <code>Vue.js</code> 是对等的，语法和内部机制都是一样的，只不过 <code>Vue.js</code> 最终创建的是 DOM 元素，而 <code>weex-vue-framework</code> 则是向原生端发送渲染指令，最终渲染生成的是原生组件。Weex Runtime 用来对接上层前端框架（如 Vue.js 和 Rax）并且负责和原生端之间的通信。Render Engine 就是针对各个端开发的原生渲染器，包含了 Weex 内置组件和模块的实现，可扩展。</p>
<blockquote><p><strong>在 Weex SDK 中也含有 <code>weex-rax-framework</code>，支持使用 <a href="https://alibaba.github.io/rax/" rel="nofollow noreferrer" target="_blank">Rax</a> 作为其上层前端框架。</strong> 这个例子使用的是 Vue 2.0 的语法，为了简洁只画出了 weex-vue-framework。</p></blockquote>
<h3 id="articleHeader5">创建组件</h3>
<p>Weex 接收到 js 文件以后，会先检查它的格式，发现用的是 Vue 版本，就会调用 <code>weex-vue-framework</code> 中提供的 <code>createInstance</code> 方法创建实例。</p>
<p>代码里 <code>new Vue()</code> 会创建一个组件，通过其 <code>render</code> 函数创建 VNode 节点，并且触发相应的生命周期，如果指定了 <code>el</code> 属性也会执行挂载（mount），根据 Virtual DOM 在指定平台中生成真实的 UI 组件。</p>
<p>上述代码只有一个组件两个标签和一些简单样式，最终生成的 VNode 节点如下（数据结构有简化）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  tag: 'div',
  data: {
    staticStyle: { justifyContent: 'center' }
  },
  children: [{
    tag: 'text',
    data: {
      staticClass: 'freestyle'
    },
    context: {
      $options: {
        style: {
          freestyle: {
            textAlign: 'center',
            fontSize: 200
          }
        }
      }
    },
    children: [{
      tag: '',
      text: '哟'
    }]
  }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">tag</span>: <span class="hljs-string">'div'</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">staticStyle</span>: { <span class="hljs-attr">justifyContent</span>: <span class="hljs-string">'center'</span> }
  },
  <span class="hljs-attr">children</span>: [{
    <span class="hljs-attr">tag</span>: <span class="hljs-string">'text'</span>,
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">staticClass</span>: <span class="hljs-string">'freestyle'</span>
    },
    <span class="hljs-attr">context</span>: {
      <span class="hljs-attr">$options</span>: {
        <span class="hljs-attr">style</span>: {
          <span class="hljs-attr">freestyle</span>: {
            <span class="hljs-attr">textAlign</span>: <span class="hljs-string">'center'</span>,
            <span class="hljs-attr">fontSize</span>: <span class="hljs-number">200</span>
          }
        }
      }
    },
    <span class="hljs-attr">children</span>: [{
      <span class="hljs-attr">tag</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">text</span>: <span class="hljs-string">'哟'</span>
    }]
  }]
}</code></pre>
<h3 id="articleHeader6">Patch</h3>
<p>再生成了 VNode 节点之后，还需要执行 “patch” 将虚拟 DOM 绘制成真实的 UI。在执行 patch 之前的过程都是 Web 和 Weex 通用的，所以文件格式、打包编译过程、模板指令、组件的生命周期、数据绑定等上层语法都是一致的。</p>
<p>然而由于目标执行环境不同（浏览器和 Weex 容器），在渲染真实 UI 的时候调用的接口也不同。</p>
<p><span class="img-wrap"><img data-src="/img/bVRRJB?w=2445&amp;h=1240" src="https://static.alili.tech/img/bVRRJB?w=2445&amp;h=1240" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在 Vue.js 内部，Web 平台和 Weex 平台中的 <code>patch</code> 方法是不同的，但是都是由 <code>createPatchFunction</code> 这个方法生成的，它支持传递 <code>nodeOps</code> 参数，在其中代理了所有 DOM 操作。在 Web 平台中 <code>nodeOps</code> 背后调用的都是 Web API，在 Weex 平台中则调用的是 Weex Runtime 提供的 <a href="http://weex.apache.org/cn/references/native-dom-api.html" rel="nofollow noreferrer" target="_blank">Native DOM API</a>。触发 DOM 渲染的入口一致，但是不同平台的实现方式不同。</p>
<p>例如 <code>nodeOps</code> 中的 <code>createElement</code> 的操作，在 Web 平台中实际调用的是 <code>document.createElement(tagName)</code> 这个接口（<a href="https://github.com/vuejs/vue/blob/v2.4.2/src/platforms/web/runtime/node-ops.js#L5-L15" rel="nofollow noreferrer" target="_blank">参考代码</a>）；而在 Weex 平台中实际执行的是 <code>new renderer.Element(tagName)</code>（<a href="https://github.com/vuejs/vue/blob/v2.4.2/src/platforms/weex/runtime/node-ops.js#L6-L8" rel="nofollow noreferrer" target="_blank">参考代码</a>）。</p>
<h2 id="articleHeader7">发送渲染指令</h2>
<p>上述页面的 patch 过程不仅限于 Vue，在 Rax 中也调用了 Weex 的 Native DOM API，实现原理是一致的。发送渲染指令的过程是所有上层前端框架通用的，上层使用 Vue 还是 Rax 对于原生渲染器而言是透明的，只是语法和构建 Virtual DOM 的方式有差异而已。</p>
<p>在上层前端框架调用了 Weex 平台提供的 Native DOM API 之后，Weex Runtime 会构建一个用于渲染的节点树，并将操作转换成渲染指令发送给客户端。</p>
<p>回顾文中提到的 “哟” 例子，上层框架调用了 Weex Runtime 中 <code>createBody</code> 、<code>createElement</code> 、<code>appendChild</code> 这三个接口，简单构建了一个用于渲染的节点树，最终生成了两条渲染指令。</p>
<p><span class="img-wrap"><img data-src="/img/bVRRJG?w=2657&amp;h=1559" src="https://static.alili.tech/img/bVRRJG?w=2657&amp;h=1559" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>这些都属于 Weex SDK 内部的底层细节，上层应用的开发者，乃至前端框架开发者都不需要了解此格式，而且在迭代过程中很可能还会有调整。</p></blockquote>
<p>图中的 Platform API 指的是原生环境提供的 API，这些 API 是 Weex SDK 中原生模块提供的，不是 js 中方法，也不是浏览器中的接口，是 Weex 内部不同模块之间的约定。</p>
<p>目前来说渲染指令是基于 JSON 描述的，具体格式大致如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  module: 'dom',
  method: 'createBody',
  args: [{
    ref: '_root',
    type: 'div',
    style: { justifyContent: 'center' }
  }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">module</span>: <span class="hljs-string">'dom'</span>,
  <span class="hljs-attr">method</span>: <span class="hljs-string">'createBody'</span>,
  <span class="hljs-attr">args</span>: [{
    <span class="hljs-attr">ref</span>: <span class="hljs-string">'_root'</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">'div'</span>,
    <span class="hljs-attr">style</span>: { <span class="hljs-attr">justifyContent</span>: <span class="hljs-string">'center'</span> }
  }]
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  module: 'dom',
  method: 'addElement',
  args: ['_root', {
    ref: '2',
    type: 'text',
    attr: { value: '哟' },
    style: { textAlign: 'center', fontSize: 200 }
  }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">module</span>: <span class="hljs-string">'dom'</span>,
  <span class="hljs-attr">method</span>: <span class="hljs-string">'addElement'</span>,
  <span class="hljs-attr">args</span>: [<span class="hljs-string">'_root'</span>, {
    <span class="hljs-attr">ref</span>: <span class="hljs-string">'2'</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">'text'</span>,
    <span class="hljs-attr">attr</span>: { <span class="hljs-attr">value</span>: <span class="hljs-string">'哟'</span> },
    <span class="hljs-attr">style</span>: { <span class="hljs-attr">textAlign</span>: <span class="hljs-string">'center'</span>, <span class="hljs-attr">fontSize</span>: <span class="hljs-number">200</span> }
  }]
}</code></pre>
<h2 id="articleHeader8">渲染原生组件</h2>
<p>原生渲染器接收上层传来的渲染指令，并且逐步将其渲染成原生组件。</p>
<p>渲染指令分很多类，文章中提到的两个都是用来创建节点的，其他还有 <code>moveElement</code> 、<code>updateAttrs</code> 、<code>addEvent</code> 等各种指令。原生渲染器先是解析渲染指令的描述，然后分发给不同的模块。关于 UI 绘制的指令都属于 <code>"dom"</code> 模块中，在 SDK 内部有组件的实现，其他还有一些无界面的功能模块，如 stream 、navigator 等模块，也可以通过发送指令的方式调用。</p>
<p><span class="img-wrap"><img data-src="/img/bVRRJ9?w=2162&amp;h=1620" src="https://static.alili.tech/img/bVRRJ9?w=2162&amp;h=1620" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这个例子里，第一个 <code>createBody</code> 的指令就创建了一个 <code>&lt;div&gt;</code> 的原生组件，同时也将样式应用到了改组件上。第二个 <code>addElement</code> 指令向 <code>&lt;div&gt;</code> 中添加一个 <code>&lt;text&gt;</code> 组件，同时也声明了组件的样式和属性值。</p>
<p>上述过程不是分阶段一个一个执行的，而是可以实现“流式”渲染的，有可能第一个 <code>&lt;div&gt;</code> 的原生组件还没渲染好，<code>&lt;text&gt;</code> 的渲染指令又发过来了。当一个页面特别大时，能看到一块一块的内容逐渐渲染出来的过程。</p>
<h2 id="articleHeader9">总结</h2>
<p>没啥可总结的，都是细节，而且是框架内部的细节，以后很可能还会变，对于如何写好 Weex 的代码没有半毛钱帮助。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解 Weex 页面的渲染过程

## 原文链接
[https://segmentfault.com/a/1190000010415641](https://segmentfault.com/a/1190000010415641)

