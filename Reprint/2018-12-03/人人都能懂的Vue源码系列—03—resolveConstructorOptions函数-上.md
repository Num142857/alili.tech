---
title: '人人都能懂的Vue源码系列—03—resolveConstructorOptions函数-上' 
date: 2018-12-03 2:30:08
hidden: true
slug: 19neboq6qs8
categories: [reprint]
---

{{< raw >}}

                    
<p>上篇文章介绍了Vue构造函数的部分实现，当前Vue实例不是组件时，会执行mergeOptions方法。</p>
<pre><code class="js">vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
    options || {},
    vm
)</code></pre>
<p>mergeOptions方法，我们之后的博文再来做详细介绍。今天主要研究resolveConstructorOptions方法,从字面意思来看，这个方法是来解析constructor上的options属性的。我们来看源码。</p>
<pre><code class="js">export function resolveConstructorOptions (Ctor: Class&lt;Component&gt;) {
  let options = Ctor.options
  // 有super属性，说明Ctor是Vue.extend构建的子类
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions // Vue构造函数上的options,如directives,filters,....
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}</code></pre>
<p>这个方法要分成两种情况来说明，第一种是Ctor是基础Vue构造器的情况，另一种是Ctor是通过Vue.extend方法扩展的情况。</p>
<h2>Ctor是基础Vue构造器</h2>
<p>当Ctor(Ctor其实就是构造函数)是基础Vue构造器时，比如是通过new关键字新建Vue构造函数的实例</p>
<pre><code class="js">const vm = new Vue({
  el: '#app',
    data: {
      message: 'Hello Chris'
    }
})</code></pre>
<p>这个时候options就是Vue构造函数上的options。如下图<br><span class="img-wrap"><img data-src="/img/bV9eO4?w=1042&amp;h=172" src="https://static.alili.tech/img/bV9eO4?w=1042&amp;h=172" alt="global options" title="global options"></span><br>那么这个options是在哪里定义的呢？在之前的代码中好像没有看到options的定义在哪里？此时我们应该怎么去找这个options定义的地方呢？<br>这里教大家一个方法，首先找到package.json，在这里可以找到我们平时用到的一些npm脚本。以npm run dev为例。实际上npm run dev是执行了下列的命令<br><code>"dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev"</code><br>rollup是类似于webpack的打包工具。我们可以看到这条命令指向了一个地址scripts/config，之后还指定了一个Target。找到script/config,发现这个文件里<br>有TARGET为web-full-dev的配置。</p>
<pre><code class="js">// Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner
  }</code></pre>
<p>来分析上面的代码，入口文件的地址在<em>web/entry-runtime-with-compiler.js</em>。这个文件就是对Vue构造函数进行的第一层包装了。由于今天分析的是options相关的内容，而这层包装里没有options相关的内容，所以这个文件我们不展开讲(之后有文章会详细介绍)。但是注意这里的代码</p>
<pre><code class="js">...
import Vue from './runtime/index'
...</code></pre>
<p>我们Vue构造函数的第二层包装，就在这个文件里了。忽略其他的代码，我们来看关于Vue.options的部分</p>
<pre><code class="js">...
import Vue from 'core/index' // 第三层包装
import platformDirectives from './directives/index'
import platformComponents from './components/index'
...
// install platform runtime directives &amp; components
extend(Vue.options.directives, platformDirectives)
extend(Vue.options.components, platformComponents)
...

// platformDirectives相关
// 这里导出Vue全局指令model,show
import model from './model'
import show from './show'
export default {
  model,
  show
}

// platformComponents相关
// 这里导出Vue全局组件Transition，TransitionGroup
import Transition from './transition'
import TransitionGroup from './transition-group'
export default {
  Transition,
  TransitionGroup
}</code></pre>
<p>上面的代码主要是给Vue.options.directives添加model,show属性，给Vue.options.components添加Transition,TransitionGroup属性。那么还有filters，_base属性，以及components中的KeepAlive又是怎么来的呢？<br>这就要看Vue的第三层包装里都做了些什么？找到core/index,同样我们只看Vue.options相关代码。</p>
<pre><code class="js">mport Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
...
initGlobalAPI(Vue)
...</code></pre>
<p>instance/index 就是我们<a href="https://segmentfault.com/a/1190000014488094">第二篇文章——构造函数</a>定义的那个文件。这个文件我们之前看过，没有和Vue构造函数options相关的代码。那么我们剩下的没有配置的options一定是在initGlobalAPI上配置了。接来下看看/global-api/index的代码。</p>
<pre><code class="js">/* @flow */

import { ASSET_TYPES } from 'shared/constants'
...
export function initGlobalAPI (Vue: GlobalAPI) {
  ...
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type =&gt; {
    Vue.options[type + 's'] = Object.create(null)
  })
  Vue.options._base = Vue
  extend(Vue.options.components, builtInComponents)
  ...
}

// shared/constants.js
export const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]

// core/components/index
import KeepAlive from './keep-alive'
export default {
  KeepAlive
}</code></pre>
<p>上面这层包装就把filters,_base和components中的KeepAlive都实现了。通过这三层包装，Vue构造函数的options对象就生成了，看这些文字可能有点绕，我们直接上图。</p>
<p><span class="img-wrap"><img data-src="/img/bV9fSC?w=1003&amp;h=269" src="https://static.alili.tech/img/bV9fSC?w=1003&amp;h=269" alt="包装options的过程" title="包装options的过程"></span><br>回到resolveConstructorOptions的源码中，当Ctor.super不存在时，直接返回基础构造器的options。即上图经过两次包装的options。那么Ctor.super是什么呢？<br>Ctor.super是通过Vue.extend构造子类的时候。Vue.extend方法会为Ctor添加一个super属性，指向其父类构造器</p>
<pre><code class="js">Vue.extend = function (extendOptions: Object): Function {
  ...
  Sub['super'] = Super
  ...
}</code></pre>
<p>所以当Ctor时基础构造器的时候，resolveConstructorOptions方法返回基础构造器的options。除了Ctor是基础构造器之外，还有一种是Ctor是通过Vue.extend构造的子类。这种情况比较复杂，下一篇文章专门对其进行介绍，敬请期待！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
人人都能懂的Vue源码系列—03—resolveConstructorOptions函数-上

## 原文链接
[https://segmentfault.com/a/1190000014587126](https://segmentfault.com/a/1190000014587126)

