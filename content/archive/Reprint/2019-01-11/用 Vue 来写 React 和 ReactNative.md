---
title: '用 Vue 来写 React 和 ReactNative' 
date: 2019-01-11 2:30:08
hidden: true
slug: vyutywhpps
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVPMZy?w=1468&amp;h=826" src="https://static.alili.tech/img/bVPMZy?w=1468&amp;h=826" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>GitHub: <a href="https://github.com/SmallComfort/react-vue" rel="nofollow noreferrer" target="_blank">react-vue</a></p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>react-vue 为两大前端框架搭了一座桥，它主要有三种用法</p>
<ol>
<li><p>使用 Vue 的响应式系统驱动 React 渲染</p></li>
<li><p>使用 react-vue-loader 将 Vue 组件编译成 React 组件</p></li>
<li><p>使用 react-vue-native-script 在 React Native 下运行 Vue 组件</p></li>
</ol>
<p>这篇文章会向大家介绍 react-vue 的三种用法及一些实现细节，它能做到什么程度，以及它带来的一些可能性。需要提前知会的一点：如果你熟悉 React 和 Vue，在这里你不会接触到任何新的概念。</p>
<h2 id="articleHeader1">Vue 的响应核心</h2>
<p>Vue 的响应式系统是支撑整个 Vue 框架运行的关键，也是 Vue 的核心之一，官方对这个核心的分层设计得很好（Weex 也是依靠其驱动原生视图）。若你有幸看过 Vue 的源码，这个核心就在它的 <a href="https://github.com/vuejs/vue/tree/dev/src/core" rel="nofollow noreferrer" target="_blank">core</a> 目录下。</p>
<p>我们日常用到的 <code>data</code>、<code>computed</code>、<code>watch</code>、<code>methods</code>、<code>lifecycle</code>、<code>render</code> 都由核心提供，对这个核心稍作修改，去掉 <code>render</code> 和 <code>lifecycle</code>，意外的获得了一个极小的响应核心（gzip 9kb），可以运行于任何标准 JS 引擎下。这构成了 <a href="https://github.com/SmallComfort/react-vue" rel="nofollow noreferrer" target="_blank">react-vue</a> 的核心。</p>
<h2 id="articleHeader2">响应式的 React</h2>
<p>react-vue 额外添加了一个 observer 函数，用于观察 react 组件，并与响应核心建立联系。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import Vue, { observer } from 'react-vue';

const store = new Vue({
  data () {
    return {
      count: 0
    }
  },
  methods: {
    increase () {
      this.count ++;
    }
  }
});

@observer
export default class Demo extends Component {
  render () {
    return <h1 onClick={store.increase}>{store.count}</h1>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> Vue, { observer } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-vue'</span>;

<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vue({
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    increase () {
      <span class="hljs-keyword">this</span>.count ++;
    }
  }
});

@observer
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{store.increase}</span>&gt;</span>{store.count}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
  }
}</code></pre>
<p>如上代码实现了一个简单的递增计数器，如果你接触过 <a href="https://mobx.js.org/" rel="nofollow noreferrer" target="_blank">mobx</a>，对这种开发模式应该会很熟悉。</p>
<p>使用 Vue 的响应核心驱动 React，还能获得另一个礼物 <a href="https://vuex.vuejs.org/zh-cn/intro.html" rel="nofollow noreferrer" target="_blank">Vuex</a>，这里有一个将 Vuex 与 React 结合的简单 <a href="https://github.com/SmallComfort/react-vue-demo" rel="nofollow noreferrer" target="_blank">demo</a>，如此，你便可以在 React 体系下使用 Vuex 构建大型应用。</p>
<h2 id="articleHeader3">React 下运行 Vue 组件</h2>
<p>react-vue 支持将 Vue 组件编译到 React，只需引入 <a href="https://github.com/SmallComfort/react-vue-loader" rel="nofollow noreferrer" target="_blank">react-vue-loader</a>，这个 loader 基于 <a href="https://vue-loader.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-loader</a> 做了一些改造以适应 React 的运行环境。我们几乎可以使用 vue-loader 提供的所有配置，详细的文档可以参考<a href="https://github.com/SmallComfort/react-vue-loader" rel="nofollow noreferrer" target="_blank">这里</a>。如下是一个你可能会用到的 webpack 配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'react-vue-loader'
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
  <span class="hljs-attribute">rules</span>: [
    {
      test: /\.vue$/,
      loader: <span class="hljs-string">'react-vue-loader'</span>
    }
  ]
}</code></pre>
<p>很简单对吧，React 和 Vue 的混合开发模式会产生一些很有趣的事情，你写的 React 组件，可以直接在 Vue 组件内使用，反过来 Vue 组件也可以直接在 React 组件内运行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// One.js
import React, { Component } from 'react';
import Two from './Two';

export default class One extends Component {
  render() {
    return <Two>Hello Vue</Two>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// One.js</span>
<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> Two <span class="hljs-keyword">from</span> <span class="hljs-string">'./Two'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">One</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Two</span>&gt;</span>Hello Vue<span class="hljs-tag">&lt;/<span class="hljs-name">Two</span>&gt;</span></span>;
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Two.vue -->
<template>
  <div @click=&quot;count++&quot;>
    <three>"{{"count"}}"</three>
    <slot></slot>
  </div>
</template>

<script>
  import Three from './Three'
  export default {
    components: { Three },
    data () {
      return {
        count: 0
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- Two.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"count++"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">three</span>&gt;</span>"{{"count"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">three</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Three <span class="hljs-keyword">from</span> <span class="hljs-string">'./Three'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: { Three },
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Three.js
import React, { Component } from 'react';

export default class Three extends Component {
  render () {
    return <span>{this.props.children}</span>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Three.js</span>
<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Three</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render () {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{this.props.children}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
  }
}</code></pre>
<p>这种混合开发让技术栈的切换成本变得很低，React 和 Vue 也不再是非此即彼，如果你的团队在 React 下积累深厚，想尝试一下 Vue 开发带来的快感，引入一个 loader 就可以了；如果你的团队在 Vue 下造诣颇深，想试试 React 带来的思维淬炼，搭建一个 React 的运行环境，之前写的 Vue 代码也可在其上良好的运行。</p>
<p>react-vue 对组件库的开发也提供了新的思路，你只需写一套 Vue 组件，即可同时运行于 React 和 Vue。这里有一个<a href="https://github.com/SmallComfort/react-vue-material-demo" rel="nofollow noreferrer" target="_blank">项目</a>对 vue-material 组件库做了一个测试，通过 <code>npm install --save vue-material</code> 安装组件库，在 React 下可以运行其中 20/29 的组件。</p>
<p>react-vue 有其局限性，编译过来的 Vue 组件依旧跑在 React 的运行时，所以你不能使用 Vue 提供的 render 函数（使用 template 代替），你也无法在 Vue 组件内访问 <code>VNode</code>。可以查看详细的 <a href="https://github.com/SmallComfort/react-vue/blob/dev/packages/react-vue/COMPONENT.md" rel="nofollow noreferrer" target="_blank">API</a> 支持文档。</p>
<h2 id="articleHeader4">React Native 下运行 Vue 组件</h2>
<p>这可能是最有趣的一部分了，react-vue 的响应核心是平台无关的，它可以跑在 React 下，自然也能跑在 React Native 下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <view>
    <text>Hello react-vue-native</text>
  </view>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span>Hello react-vue-native<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>React Native 使用了一个量身定制的打包工具，我们无法像 Web 那样引入一个 loader 来实现无缝接合。你可以使用 <a href="https://github.com/SmallComfort/react-vue-native-scripts" rel="nofollow noreferrer" target="_blank">react-vue-native-scripts</a>，一个 npm 脚本，开启一个轻量的 node 服务器，监听项目中 <code>.vue</code> 文件的变化，生成一份同名的 <code>.js</code> 文件。</p>
<p>是不是有点 Weex 的意思了，Native 不同于 Web，在 Web 下用惯了的标签，在 Native 下都是没有的，React Native 官方提供的所有组件，都作为内置组件预先引入了，你无需引用可直接使用。当然，如果习惯了 Web 标签，可以这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { View } from 'react-native';
import { Vue } from 'react-vue';

Vue.component('div', View);

export default Vue;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { View } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native'</span>;
<span class="hljs-keyword">import</span> { Vue } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-vue'</span>;

Vue.component(<span class="hljs-string">'div'</span>, View);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue;</code></pre>
<p>这里有一个 <a href="https://github.com/SmallComfort/HackerNews" rel="nofollow noreferrer" target="_blank">Hacker News</a> 的 demo，使用 React Native 作为底层，上层使用 Vue 和 Vuex 构建，效果还不错，你可以看看。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 Vue 来写 React 和 ReactNative

## 原文链接
[https://segmentfault.com/a/1190000009922384](https://segmentfault.com/a/1190000009922384)

