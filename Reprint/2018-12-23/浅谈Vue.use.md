---
title: '浅谈Vue.use' 
date: 2018-12-23 2:30:07
hidden: true
slug: q3dgg2owqm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">先举个?</h2>
<p>我们先来看一个简单的事例<br>首先我使用官方脚手架新建一个项目<code>vue init webpack vue-demo</code><br>然后我创建两个文件<code>index.js plugins.js</code>.<br>我将这两个文件放置在<code>src/classes/vue-use</code>目录下</p>
<p>接下来对这两个文件进行编写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件:  src/classes/vue-use/plugins.js

const Plugin1 = {
    install(a, b, c) {
        console.log('Plugin1 第一个参数:', a);
        console.log('Plugin1 第二个参数:', b);
        console.log('Plugin1 第三个参数:', c);
    },
};

function Plugin2(a, b, c) {
    console.log('Plugin2 第一个参数:', a);
    console.log('Plugin2 第二个参数:', b);
    console.log('Plugin2 第三个参数:', c);
}

export { Plugin1, Plugin2 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件:  src/classes/vue-use/plugins.js</span>

<span class="hljs-keyword">const</span> Plugin1 = {
    install(a, b, c) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Plugin1 第一个参数:'</span>, a);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Plugin1 第二个参数:'</span>, b);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Plugin1 第三个参数:'</span>, c);
    },
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Plugin2</span>(<span class="hljs-params">a, b, c</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Plugin2 第一个参数:'</span>, a);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Plugin2 第二个参数:'</span>, b);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Plugin2 第三个参数:'</span>, c);
}

<span class="hljs-keyword">export</span> { Plugin1, Plugin2 };</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件: src/classes/vue-use/index.js

import Vue from 'vue';

import { Plugin1, Plugin2 } from './plugins';

Vue.use(Plugin1, '参数1', '参数2');
Vue.use(Plugin2, '参数A', '参数B');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件: src/classes/vue-use/index.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;

<span class="hljs-keyword">import</span> { Plugin1, Plugin2 } <span class="hljs-keyword">from</span> <span class="hljs-string">'./plugins'</span>;

Vue.use(Plugin1, <span class="hljs-string">'参数1'</span>, <span class="hljs-string">'参数2'</span>);
Vue.use(Plugin2, <span class="hljs-string">'参数A'</span>, <span class="hljs-string">'参数B'</span>);</code></pre>
<p>然后我们在入口文件<code>main.js</code>引用这段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文件: src/main.js

import Vue from 'vue';

import '@/classes/vue-use';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 文件: src/main.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;

<span class="hljs-keyword">import</span> <span class="hljs-string">'@/classes/vue-use'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>;
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>;

Vue.config.productionTip = <span class="hljs-literal">false</span>;

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    router,
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App),
});</code></pre>
<p><strong>此时我们执行<code>npm run dev</code>打开8080端口开启开发调试工具可以看到控制台输出以下信息</strong><br><span class="img-wrap"><img data-src="/img/bVZKAy?w=875&amp;h=437" src="https://static.alili.tech/img/bVZKAy?w=875&amp;h=437" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>...]</p>
<p>从中可以发现我们在<code>plugin1</code>中的<code>install</code>方法编写的三个console都打印出来，第一个打印出来的是Vue对象，第二个跟第三个是我们传入的两个参数。<br>而<code>plugin2</code>没有<code>install</code>方法，它本身就是一个方法，也能打印三个参数，第一个是Vue对象，第二个跟第三个也是我们传入的两个参数。</p>
<p>那么现在我们是不是大概对<code>Vue.use</code>有一个模糊的猜想～</p>
<h2 id="articleHeader1">分析源码</h2>
<p>好我们还是不要猜想，直接上源码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Vue源码文件路径：src/core/global-api/use.js

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Vue源码文件路径：src/core/global-api/use.js</span>

<span class="hljs-keyword">import</span> { toArray } <span class="hljs-keyword">from</span> <span class="hljs-string">'../util/index'</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initUse</span> (<span class="hljs-params">Vue: GlobalAPI</span>) </span>{
  Vue.use = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">plugin: Function | Object</span>) </span>{
    <span class="hljs-keyword">const</span> installedPlugins = (<span class="hljs-keyword">this</span>._installedPlugins || (<span class="hljs-keyword">this</span>._installedPlugins = []))
    <span class="hljs-keyword">if</span> (installedPlugins.indexOf(plugin) &gt; <span class="hljs-number">-1</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
    }

    <span class="hljs-comment">// additional parameters</span>
    <span class="hljs-keyword">const</span> args = toArray(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>)
    args.unshift(<span class="hljs-keyword">this</span>)
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> plugin.install === <span class="hljs-string">'function'</span>) {
      plugin.install.apply(plugin, args)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> plugin === <span class="hljs-string">'function'</span>) {
      plugin.apply(<span class="hljs-literal">null</span>, args)
    }
    installedPlugins.push(plugin)
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }
}</code></pre>
<p>从源码中我们可以发现vue首先判断这个插件是否被注册过，不允许重复注册。<br>并且接收的<code>plugin</code>参数的限制是<code>Function | Object</code>两种类型。<br>对于这两种类型有不同的处理。<br>首先将我们传入的参数整理成数组 =&gt; <code>const args = toArray(arguments, 1)</code>。<br><strong>(toArray源码)</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Vue源码文件路径：src/core/shared/util.js

export function toArray (list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Vue源码文件路径：src/core/shared/util.js</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toArray</span> (<span class="hljs-params">list: any, start?: number</span>): <span class="hljs-title">Array</span>&lt;<span class="hljs-title">any</span>&gt; </span>{
  start = start || <span class="hljs-number">0</span>
  <span class="hljs-keyword">let</span> i = list.length - start
  <span class="hljs-keyword">const</span> ret: <span class="hljs-built_in">Array</span>&lt;any&gt; = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(i)
  <span class="hljs-keyword">while</span> (i--) {
    ret[i] = list[i + start]
  }
  <span class="hljs-keyword">return</span> ret
}</code></pre>
<p>再将<code>Vue</code>对象添加到这个数组的起始位置<code>args.unshift(this)</code>,这里的this 指向<code>Vue</code>对象<br>如果我们传入的<code>plugin</code>(Vue.use的第一个参数)的<code>install</code>是一个方法。也就是说如果我们传入一个对象，对象中包含<code>install</code>方法，那么我们就调用这个<code>plugin</code>的<code>install</code>方法并将整理好的数组当成参数传入<code>install</code>方法中。 =&gt; <code>plugin.install.apply(plugin, args)</code><br>如果我们传入的<code>plugin</code>就是一个函数,那么我们就直接调用这个函数并将整理好的数组当成参数传入。 =&gt; <code>plugin.apply(null, args)</code><br>之后给这个插件添加至已经添加过的插件数组中，标示已经注册过 =&gt; <code>installedPlugins.push(plugin)</code><br>最后返回Vue对象。</p>
<h2 id="articleHeader2">小结</h2>
<p>通过以上分析我们可以知道，在我们以后编写插件的时候可以有两种方式。<br>一种是将这个插件的逻辑封装成一个对象最后将最后在install编写业务代码暴露给Vue对象。这样做的好处是可以添加任意参数在这个对象上方便将install函数封装得更加精简，可拓展性也比较高。<br>还有一种则是将所有逻辑都编写成一个函数暴露给Vue。<br>其实两种方法原理都一样，无非第二种就是将这个插件直接当成install函数来处理。<br>个人觉得第一种方式比较合理。<br>举个?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const Plugin = {
    install(Vue) {
        Vue.component...
        Vue.mixins...
        Vue...
        // 我们也可以在install里面执行其他函数，Vue会将this指向我们的插件
        console.log(this)  // {install: ...,utils: ...}
        this.utils(Vue)    // 执行utils函数
        console.log(this.COUNT) // 0
    },
    utils(Vue) {
        Vue...
        console.log(Vue)  // Vue
    },
    COUNT: 0    
}
// 我们可以在这个对象上添加参数，最终Vue只会执行install方法，而其他方法可以作为封装install方法的辅助函数

const test = 'test'
export function Plugin2(Vue) {
    Vue...
    console.log(test)  // 'test'
    // 注意如果插件编写成函数形式，那么Vue只会把this指向null，并不会指向这个函数
    console.log(this)  // null
}
// 这种方式我们只能在一个函数中编写插件逻辑，可封装性就不是那么强了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> Plugin = {
    install(Vue) {
        Vue.component...
        Vue.mixins...
        Vue...
        <span class="hljs-comment">// 我们也可以在install里面执行其他函数，Vue会将this指向我们的插件</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)  <span class="hljs-comment">// {install: ...,utils: ...}</span>
        <span class="hljs-keyword">this</span>.utils(Vue)    <span class="hljs-comment">// 执行utils函数</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.COUNT) <span class="hljs-comment">// 0</span>
    },
    utils(Vue) {
        Vue...
        console.log(Vue)  <span class="hljs-comment">// Vue</span>
    },
    <span class="hljs-attr">COUNT</span>: <span class="hljs-number">0</span>    
}
<span class="hljs-comment">// 我们可以在这个对象上添加参数，最终Vue只会执行install方法，而其他方法可以作为封装install方法的辅助函数</span>

<span class="hljs-keyword">const</span> test = <span class="hljs-string">'test'</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Plugin2</span>(<span class="hljs-params">Vue</span>) </span>{
    Vue...
    console.log(test)  <span class="hljs-comment">// 'test'</span>
    <span class="hljs-comment">// 注意如果插件编写成函数形式，那么Vue只会把this指向null，并不会指向这个函数</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>)  <span class="hljs-comment">// null</span>
}
<span class="hljs-comment">// 这种方式我们只能在一个函数中编写插件逻辑，可封装性就不是那么强了</span></code></pre>
<p>小弟不才，对vue源码的理解暂且到这。欢迎大佬们多指教～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈Vue.use

## 原文链接
[https://segmentfault.com/a/1190000012296163](https://segmentfault.com/a/1190000012296163)

