---
title: '[使用 Weex 和 Vue 开发原生应用] 4 使用 Weex 平台的功能' 
date: 2019-01-26 2:30:18
hidden: true
slug: 4iywbkyywzg
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>系列文章的目录在 ? <a href="https://segmentfault.com/a/1190000008342533">这里</a></p></blockquote>
<p>除了 Vue 框架提供的功能以为，Weex 平台本身也提供了很多功能，这些功能比前端框架更底层一些，而且是跨框架通用的，在 <a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">Vue</a> 和 <a href="https://github.com/alibaba/rax" rel="nofollow noreferrer" target="_blank">Rax</a> 里都可以用。本文的几个例子越来越偏底层，最后一个例子还需要写 java 代码。</p>
<h2 id="articleHeader0">使用 Weex 的模块</h2>
<blockquote><p><a href="http://weex.apache.org/cn/references/modules/index.html" rel="nofollow noreferrer" target="_blank">Weex 模块的文档</a></p></blockquote>
<p>通过 <code>weex.requireModule</code> 即可引入 weex 的模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const modal = weex.requireModule('modal')

modal.toast({
  message: 'native toast'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> modal = weex.requireModule(<span class="hljs-string">'modal'</span>)

modal.toast({
  <span class="hljs-attr">message</span>: <span class="hljs-string">'native toast'</span>
})</code></pre>
<h3 id="articleHeader1">Weex 的模块到底是什么东西？</h3>
<p>模块的用法很简单，像普通 js 模块一样调接口就行了，看起来挺像一个 npm 模块的，但是在 Weex 模块内部会调用原生接口，最终调用的都是原生平台提供的功能。<strong>Weex 的模块提供了使用原生功能的能力。</strong></p>
<p>例如 <a href="http://weex.apache.org/cn/references/modules/modal.html" rel="nofollow noreferrer" target="_blank"><code>modal</code> 模块</a>可以弹出 <code>toast</code> 、<code>alert</code> 、<code>confirm</code> 、<code>prompt</code> 等各种弹窗，这些弹窗都是原生弹窗，在 Android 和 iOS 下的风格和行为是由各自的系统决定的。Weex 的模块在 js 这一层只负责向原生环境里传递数据，通知 native 去执行某些操作。</p>
<p>像 <code>storage</code> 、<code>navigator</code> 、<code>clipboard</code> 这种依赖平台特性的功能，需要调用平台原生接口才能实现，所以只能写成模块。</p>
<h3 id="articleHeader2">模块的同步和异步</h3>
<p>一般来说，都是调用模块的功能，并不会依赖模块返回值的，但是像 <a href="http://weex.apache.org/cn/references/modules/dom.html" rel="nofollow noreferrer" target="_blank"><code>dom</code> 模块</a>中的 <code>getComponentRect</code> 接口是用来计算组件的宽高和位置的，必须得从原生端获取值。但是在 Weex 最初设计的版本里，模块都是异步返回值的，也就是说，只能通过回调函数的方式拿到真正的布局信息（也可以自己封装成 Promise）。现在 Weex 已经支持了模块的同步返回值，但是为了保持原先版本中接口的行为一致，<code>getComponentRect</code> 这个方法依然是异步的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dom = weex.requireModule('dom')

const returns = dom.getComponentRect(this.$refs.box, option => {
  console.log(option) // { result: true, size: { ... } }
})

console.log(returns) // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> dom = weex.requireModule(<span class="hljs-string">'dom'</span>)

<span class="hljs-keyword">const</span> returns = dom.getComponentRect(<span class="hljs-keyword">this</span>.$refs.box, option =&gt; {
  <span class="hljs-built_in">console</span>.log(option) <span class="hljs-comment">// { result: true, size: { ... } }</span>
})

<span class="hljs-built_in">console</span>.log(returns) <span class="hljs-comment">// undefined</span></code></pre>
<p>上边的代码中，会先执行 <code>console.log(returns)</code> 再执行 <code>console.log(option)</code>，并且 <code>getComponentRect</code> 方法没有返回值，所以 <code>returns</code> 的值是 undefined，<code>option</code> 中才是真正的原生端返回的布局信息。</p>
<h3 id="articleHeader3">扩展 Weex 的模块</h3>
<p>Weex 本身内置了很多模块，出于通用性考虑，我们只会把最基础的模块打包进 SDK。其他个性化的模块可以自己来实现，或者从社区中找。<a href="http://market.weex-project.io" rel="nofollow noreferrer" target="_blank">Weex Market</a> 将会是一个收集这些扩展模块（组件、插件）的地方，结合 <a href="https://github.com/weexteam/weex-pack" rel="nofollow noreferrer" target="_blank">weex-pack</a> 可以实现方便的安装和扩展。<strong>（目前来说，Weex Market 中还是基于旧版 <code>.we</code>语法的模块比较多，不适用于 Vue，在使用前要看准适用的框架）</strong></p>
<p>具体的扩展 Weex 模块的方法，参考：</p>
<ul>
<li><p><a href="http://weex.apache.org/cn/references/android-apis.html" rel="nofollow noreferrer" target="_blank">《Android APIs》</a></p></li>
<li><p><a href="http://weex.apache.org/cn/references/advanced/extend-to-android.html" rel="nofollow noreferrer" target="_blank">《Android 扩展》</a></p></li>
<li><p><a href="http://weex.apache.org/cn/references/ios-apis.html" rel="nofollow noreferrer" target="_blank">《iOS APIs》</a></p></li>
<li><p><a href="http://weex.apache.org/cn/references/advanced/extend-to-ios.html" rel="nofollow noreferrer" target="_blank">《iOS 扩展》</a></p></li>
</ul>
<h2 id="articleHeader4">获取平台环境数据</h2>
<p>Weex 的运行环境有好几种，在写代码的时候，有些情况下需要获取环境数据。Weex 提供了 <code>weex.config</code> 变量可以获取配置信息。</p>
<ul>
<li><p><code>bundleUrl</code>: 当前 js bundle 的 URL 地址。</p></li>
<li>
<p><code>env</code>: 环境对象。</p>
<ul>
<li><p><code>weexVersion</code>: WeexSDK 的版本。</p></li>
<li><p><code>appName</code>: 应用名字。</p></li>
<li><p><code>appVersion</code>: 应用版本。</p></li>
<li><p><code>platform</code>: 平台信息，目前是 <code>"iOS"</code>、<code>"Android"</code> 和 <code>"Web"</code> 之一。</p></li>
<li><p><code>osVersion</code>: 系统版本。</p></li>
<li><p><code>deviceModel</code>: 设备型号 (仅限 iOS 和 Android)。</p></li>
<li><p><code>deviceWidth</code>: 设备宽度。</p></li>
<li><p><code>deviceHeight</code>: 设备高度。</p></li>
</ul>
</li>
</ul>
<p>此外其实还有一个全局的 <code>WXEnvironment</code> 变量，它和 <code>weex.config.env</code> 的属性是一样的。</p>
<p>下边是一个获取环境数据的二维码（支持拷贝）：</p>
<p><span class="img-wrap"><img data-src="/img/bVJGdd?w=400&amp;h=450" src="https://static.alili.tech/img/bVJGdd?w=400&amp;h=450" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">写三端不一致的代码</h2>
<h3 id="articleHeader6">只针对 native 平台注册 Vuex</h3>
<p>因为在浏览器环境中，Vuex 是会<a href="https://github.com/vuejs/vuex/blob/v2.1.2/src/index.js#L425-L428" rel="nofollow noreferrer" target="_blank">自动注册</a>的，只需要引入库文件就行了，如果重复注册，Vuex 会抛出警告的。(下边这段代码摘自 Vuex)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// auto install in dist mode
if (typeof window !== 'undefined' &amp;&amp; window.Vue) {
  install(window.Vue)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// auto install in dist mode</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) {
  install(<span class="hljs-built_in">window</span>.Vue)
}</code></pre>
<p>但是在 native 环境中没有 <code>window</code> 变量，就需要再手动调用 <code>Vue.use(Vuex)</code> 注册 Vuex 插件，在注册前判断当前运行的平台。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'

// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-comment">// Vuex is auto installed on the web</span>
<span class="hljs-keyword">if</span> (WXEnvironment.platform !== <span class="hljs-string">'Web'</span>) {
  Vue.use(Vuex)
}</code></pre>
<h3 id="articleHeader7">不同的链接跳转行为</h3>
<p>如果你在不同端上运行了 <a href="https://github.com/weexteam/weex-hackernews" rel="nofollow noreferrer" target="_blank">weex-hackernews</a> 里的项目，会发现在浏览器上点击文章链接是会新开一个页签的，但是在客户端上点击链接就不会新开视图，而是在当前视图里跳转。</p>
<p><span class="img-wrap"><img data-src="/img/bVJGde?w=804&amp;h=504" src="https://static.alili.tech/img/bVJGde?w=804&amp;h=504" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这种不同的行为体现在 <a href="https://github.com/weexteam/weex-hackernews/blob/v1.0/src/components/story.vue#L4-L7" rel="nofollow noreferrer" target="_blank">story.vue</a> 文件里，这里的跳转链接并不是直接使用的 Weex 里的 <a href="http://weex.apache.org/cn/references/components/a.html" rel="nofollow noreferrer" target="_blank"><code>&lt;a&gt;</code></a> 标签，而是自定义了一个 <code>&lt;external-link&gt;</code> 的组件，把 <code>url</code> 参数传过去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<external-link :url=&quot;story.url&quot;>
  <text>"{{"story.title"}}"</text>
  <text v-if=&quot;story.url&quot;>("{{" story.url | host "}}")</text>
</external-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">external-link</span> <span class="hljs-attr">:url</span>=<span class="hljs-string">"story.url"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span>"{{"story.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"story.url"</span>&gt;</span>("{{" story.url | host "}}")<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">external-link</span>&gt;</span></code></pre>
<p>页面跳转逻辑是在 <a href="https://github.com/weexteam/weex-hackernews/blob/v1.0/src/components/external-link.vue" rel="nofollow noreferrer" target="_blank">external-link.vue</a> 里组件实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div @click=&quot;open&quot;>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['url'],
    methods: {
      open () {
        const env = weex.config.env || WXEnvironment

        // open a new window (tab) on the web
        if (env.platform === 'Web') {
          window.open(this.url)
          return
        }

        // change router path on native (Android &amp; iOS)
        this.jump(`/article/${this.url}`)
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"open"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'url'</span>],
    <span class="hljs-attr">methods</span>: {
      open () {
        <span class="hljs-keyword">const</span> env = weex.config.env || WXEnvironment

        <span class="hljs-comment">// open a new window (tab) on the web</span>
        <span class="hljs-keyword">if</span> (env.platform === <span class="hljs-string">'Web'</span>) {
          <span class="hljs-built_in">window</span>.open(<span class="hljs-keyword">this</span>.url)
          <span class="hljs-keyword">return</span>
        }

        <span class="hljs-comment">// change router path on native (Android &amp; iOS)</span>
        <span class="hljs-keyword">this</span>.jump(<span class="hljs-string">`/article/<span class="hljs-subst">${<span class="hljs-keyword">this</span>.url}</span>`</span>)
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>该组件监听了 <code>click</code> 事件，在点击时会首先判断当前运行的平台，如果是 <code>Web</code> ，则使用 <code>window.open</code> 新开页面，否则（在原生平台中）就默认使用 <code>vue-router</code> 进行跳转，这个“跳转”其实只是更新了当前的视图，其实还在同一个原生页面内。</p>
<h2 id="articleHeader8">透传原生事件</h2>
<p>如果你看了 <a href="https://github.com/weexteam/weex-hackernews/blob/v1.0/src/App.vue#L2" rel="nofollow noreferrer" target="_blank">src/App.vue</a> 中的代码，会发现里边用了一个 <code>androidback</code> 的事件。它实现的效果是绑定了 Android 中的“返回”事件，点击返回按钮就会退回上一个视图。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div @androidback=&quot;back&quot;>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    methods: {
      back () {
        this.$router.back()
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> @<span class="hljs-attr">androidback</span>=<span class="hljs-string">"back"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">methods</span>: {
      back () {
        <span class="hljs-keyword">this</span>.$router.back()
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这个事件并不是 Vue.js 本身提供的，也不是 Web 标准里的，在浏览器上肯定不会给你提供一个以 <code>android</code> 开头的事件名。在 <code>vue-router</code> 里也不会加这样的东西。甚至如果你去翻 Weex 的文档，也找不到这个事件类型，它也不是 Weex 默认提供的。</p>
<p>想要实现 Android 特有的功能，就得在 Android 项目里的代码，在“前端”层面是解决不了这个问题的，要写 <code>java</code>。</p>
<h3 id="articleHeader9">在 Android 中派发原生事件</h3>
<p>首先，在 Android 里肯定是可以监听到“返回”按钮的点击事件的，其实只要实现 <code>Activity</code> 里的 <code>onBackPressed</code> 接口就可以了，它会在当前视图里点击返回按钮时执行。在 weex-hackernews Andorid 项目里的 <a href="https://github.com/weexteam/weex-hackernews/blob/v1.0/android/app/src/main/java/com/example/weex/hackernews/MainActivity.java#L53-L56" rel="nofollow noreferrer" target="_blank">MainActivity.java</a> 中，就实现了 <code>onBackPressed</code> 接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public void onBackPressed() {
    Log.e(&quot;USER ACTION&quot;, &quot;BACK&quot;);
    WXSDKManager.getInstance().fireEvent(mWXSDKInstance.getInstanceId(), &quot;_root&quot;, &quot;androidback&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">onBackPressed</span><span class="hljs-params">()</span> </span>{
    Log.e(<span class="hljs-string">"USER ACTION"</span>, <span class="hljs-string">"BACK"</span>);
    WXSDKManager.getInstance().fireEvent(mWXSDKInstance.getInstanceId(), <span class="hljs-string">"_root"</span>, <span class="hljs-string">"androidback"</span>);
}</code></pre>
<p>在这个方法里，通过 <code>WXSDKManager.getInstance()</code> 取到了当前页面的实例，然后调用 <code>fireEvent</code> 接口给根视图派发 <code>androidback</code> 事件，事件名是可以自定义的。在 Weex Runtime 中会接收到这个事件，会传递给 Vue.js 框架，并且触发最外层组件的 <code>androidback</code> 事件，最终会找到 <code>back</code> 方法并执行。（这里说的 Weex Runtime 是前端代码实现的，比 Vue.js 更底层一些）。</p>
<h2 id="articleHeader10">小结</h2>
<p>除了 Vue.js 本身的特性以外，Weex 还提供了很多平台化的特性，这些特性比前端框架更底层，也更通用一些。即使你用的不是 Vue.js 而是 <a href="https://github.com/alibaba/rax" rel="nofollow noreferrer" target="_blank">Rax</a>，或者是旧版的 <code>.we</code> 的语法，Weex 里的这些特性也都是可以用的。</p>
<p>虽然同一份代码可以运行在三端，但是 iOS 和 Android 和 Web 都有各自的优势和缺陷，如果你想实现一些平台特有的功能，Weex 也是支持的。如果你想要体现平台特有的优势，就得针对某个平台写一下原生代码。在写 iOS 或者 Android 代码的时候，肯定能确保在其他平台中不会执行到；但是在写 js 代码的时候，如果使用了只在 Web 上才有的特性，就得注意一些，不要让 iOS 和 Android 执行到这些代码。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[使用 Weex 和 Vue 开发原生应用] 4 使用 Weex 平台的功能

## 原文链接
[https://segmentfault.com/a/1190000008464683](https://segmentfault.com/a/1190000008464683)

