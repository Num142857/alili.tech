---
title: '如何让一个vue项目支持多语言（vue-i18n）' 
date: 2018-11-29 9:34:56
hidden: true
slug: brni3w62of7
categories: [reprint]
---

{{< raw >}}

                    
<p>这两天手头的一个任务是给一个五六年的老项目添加多语言。这个项目庞大且复杂，早期是用jQuery实现的，两年前引入Vue并逐渐用组件替换了之前的Mustache风格模板。要添加多语言，不可避免存在很多文本替换的工作，这么庞杂的一个项目，怎么才能使文本替换变得高效且不会引入bug是这篇文章主要要写的东西。</p>
<h2 id="articleHeader0">引入vue-i18n</h2>
<p><a href="https://kazupon.github.io/vue-i18n/en/" rel="nofollow noreferrer" target="_blank">vue-i18n</a>是一个vue插件，主要作用就是让项目支持国际化多语言。首先我们引入这个插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueI18n <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-i18n'</span>

Vue.use(VueI18n)</code></pre>
<p>这里注意的就是vue插件的使用方法，通过全局方法 <code>Vue.use()</code> 使用插件。</p>
<blockquote>插件通常会为 Vue 添加全局功能。插件的范围没有限制——一般有下面几种：添加全局方法或者属性；添加全局资源：指令/过滤器/过渡等；通过全局 mixin 方法添加一些组件选项；添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。</blockquote>
<p>Vue.js 的插件应当有一个公开方法 install, 通过代码可以更直观的看出插件提供的功能:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>MyPlugin.install = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(Vue, options)</span> </span>{
  <span class="hljs-comment">// 1. 添加全局方法或属性</span>
  Vue.myGlobalMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }

  <span class="hljs-comment">// 2. 添加全局资源</span>
  Vue.directive(<span class="hljs-string">'my-directive'</span>, {
    bind (el, binding, vnode, oldVnode) {
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })

  <span class="hljs-comment">// 3. 注入组件</span>
  Vue.mixin({
    created: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })

  <span class="hljs-comment">// 4. 添加实例方法</span>
  Vue.prototype.$myMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(methodOptions)</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }
}</code></pre>
<p>了解vue插件的install方法对我们等会查看i18n源码有很大帮助。</p>
<h2 id="articleHeader1">使用vue-i18n</h2>
<p>我们先看官方提供的最简单的使用模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//HTML
<div id=&quot;app&quot;>
  <p>"{{" $t(&quot;message.hello&quot;) "}}"</p>
</div>

//JAVASCRIPT
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

const i18n = new VueI18n({
  locale: 'ja', // set locale
  messages, // set locale messages
})


new Vue({ i18n }).$mount('#app')

//OUTPUT
<div id=&quot;#app&quot;>
  <p>こんにちは、世界</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">//HTML</span>
&lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">"app"</span>&gt;
  &lt;p&gt;"{{" $t(<span class="hljs-string">"message.hello"</span>) "}}"&lt;/p&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

<span class="hljs-comment">//JAVASCRIPT</span>
const messages = {
  en: {
    message: {
      hello: <span class="hljs-string">'hello world'</span>
    }
  },
  ja: {
    message: {
      hello: <span class="hljs-string">'こんにちは、世界'</span>
    }
  }
}

const i18n = <span class="hljs-keyword">new</span> VueI18n({
  locale: <span class="hljs-string">'ja'</span>, <span class="hljs-comment">// set locale</span>
  messages, <span class="hljs-comment">// set locale messages</span>
})


<span class="hljs-keyword">new</span> Vue({ i18n }).$mount(<span class="hljs-string">'#app'</span>)

<span class="hljs-comment">//OUTPUT</span>
&lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">"#app"</span>&gt;
  &lt;p&gt;こんにちは、世界&lt;/p&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>可以看到，我们在实例化Vue的时候，将i18n当做一个option传了进去。之后我们就可以在vue的组件里使用i18n了，使用方法主要是两种：</p>
<ol>
<li>在组件的template中，调用<code>$t()</code>方法</li>
<li>在组件的script中，调用<code>this.$i18n.t()</code>方法</li>
</ol>
<h2 id="articleHeader2">添加locales文件夹</h2>
<p>上节的<code>messages</code>是一个包含了多语言的的对象，它就像我们的字典。既然是字典，我希望它只有一本。所以我只会<code>new VueI18n()</code>一次，并将实例化得到的i18n对象作为唯一的字典。</p>
<p>所以新建一个locales文件夹，存放所有跟多语言相关的代码。目前包含三个文件：index.js, en.json, zh.json。</p>
<p>en.json和zh.json就是我们的语言包，是一个json形式。这里为了对照方便，我们必须保证语言包的内容是一一对应的。然后我们在index.js中完成设置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const DEFAULT_LANG = 'zh'
const LOCALE_KEY = 'localeLanguage'

const locales = {
  zh: require('./zh.json'),
  en: require('./en.json'),
}

const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales,
})

export const setup = lang => {
  if (lang === undefined) {
    lang = window.localStorage.getItem(LOCALE_KEY)
    if (locales[lang] === undefined) {
      lang = DEFAULT_LANG
    }
  }
  window.localStorage.setItem(LOCALE_KEY, lang)

  Object.keys(locales).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('lang', lang)

  Vue.config.lang = lang
  i18n.locale = lang
}

setup()
export default i18n
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueI18n <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-i18n'</span>

Vue.use(VueI18n)

<span class="hljs-keyword">const</span> DEFAULT_LANG = <span class="hljs-string">'zh'</span>
<span class="hljs-keyword">const</span> LOCALE_KEY = <span class="hljs-string">'localeLanguage'</span>

<span class="hljs-keyword">const</span> locales = {
  <span class="hljs-attr">zh</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./zh.json'</span>),
  <span class="hljs-attr">en</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./en.json'</span>),
}

<span class="hljs-keyword">const</span> i18n = <span class="hljs-keyword">new</span> VueI18n({
  <span class="hljs-attr">locale</span>: DEFAULT_LANG,
  <span class="hljs-attr">messages</span>: locales,
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> setup = <span class="hljs-function"><span class="hljs-params">lang</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (lang === <span class="hljs-literal">undefined</span>) {
    lang = <span class="hljs-built_in">window</span>.localStorage.getItem(LOCALE_KEY)
    <span class="hljs-keyword">if</span> (locales[lang] === <span class="hljs-literal">undefined</span>) {
      lang = DEFAULT_LANG
    }
  }
  <span class="hljs-built_in">window</span>.localStorage.setItem(LOCALE_KEY, lang)

  <span class="hljs-built_in">Object</span>.keys(locales).forEach(<span class="hljs-function"><span class="hljs-params">lang</span> =&gt;</span> {
    <span class="hljs-built_in">document</span>.body.classList.remove(<span class="hljs-string">`lang-<span class="hljs-subst">${lang}</span>`</span>)
  })
  <span class="hljs-built_in">document</span>.body.classList.add(<span class="hljs-string">`lang-<span class="hljs-subst">${lang}</span>`</span>)
  <span class="hljs-built_in">document</span>.body.setAttribute(<span class="hljs-string">'lang'</span>, lang)

  Vue.config.lang = lang
  i18n.locale = lang
}

setup()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> i18n
</code></pre>
<p>我们对外提供了一个<code>setup()</code>的方法，给使用者修改当前使用语种的能力。同时，我们在setup里还做了三件事：<br>将当前语种存到 localStorage中，保存用户的使用习惯；给body添加语种相关的class，因为不同语言可能导致排版出现差异，我们需要适配；将当前语种存到Vue的全局配置中，以便未来可能的使用。</p>
<p>最后我们在<code>main.js</code>中引入这个Index.js即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'

import App from './app.vue'
import store from './store'
import router from './router'
...
import i18n from '@crm/locales'
...

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.vue'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
...
<span class="hljs-keyword">import</span> i18n <span class="hljs-keyword">from</span> <span class="hljs-string">'@crm/locales'</span>
...

<span class="hljs-keyword">new</span> Vue({
  i18n,
  router,
  store,
  render: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App),
}).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<p>这样看起来，我们的国际化已经完成了，然而之后马上就有新的问题出现了！</p>
<h2 id="articleHeader3">问题一：vue实例外的js代码中的文本怎么替换？</h2>
<p>前面说到，vue实例中我们可以使用<code>this.$i18n.t</code>，这里的this是vue的实例。那项目中很多js代码在vue的实例之外，我们要怎么办？</p>
<p>最简单的解决方法是这样的，我们的locales/index.js这个文件已经export了<code>i18n</code>这个对象，那我们只需要在每次要使用的时候手动将i18n导入进来就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
import i18n from '@crm/locales'

//const test = &quot;测试数据&quot;
const test = i18n.t('message.test')
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> i18n <span class="hljs-keyword">from</span> <span class="hljs-string">'@crm/locales'</span>

<span class="hljs-comment">//const test = "测试数据"</span>
<span class="hljs-keyword">const</span> test = i18n.t(<span class="hljs-string">'message.test'</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>可是这样一来，我们之后做诸如上面的文本替换时，就得小心翼翼的区别是否在vue实例中。如果是，我们用<code>this.$i18n.t</code>，否则先import然后用<code>i18n.t</code>。这显然增加了复杂性！</p>
<p>为了解决这个问题，只直接的解决办法就是将i18n挂到window下，变成全局变量。我们就不必再Import进来，同时只使用统一方法:<code>i18n.t</code>。</p>
<p>我们在main.js中添加这行代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'

import App from './app.vue'
import store from './store'
import router from './router'
...
import i18n from '@crm/locales'
...

window.i18n = i18n

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.vue'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
...
<span class="hljs-keyword">import</span> i18n <span class="hljs-keyword">from</span> <span class="hljs-string">'@crm/locales'</span>
...

<span class="hljs-built_in">window</span>.i18n = i18n

<span class="hljs-keyword">new</span> Vue({
  i18n,
  router,
  store,
  render: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App),
}).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<p>然后我们兴高采烈的将组件中的<code>import i18n</code>全去掉，并将<code>this.$i18n.t</code>改为<code>i18n.t</code>。然后项目跑起来就报错了：i18n is not defined。</p>
<p>问题出在哪里？显示是组件调用i18n的时候，i18n还没有挂载到window上，所以是执行顺序出了问题。我们先来看一下下面代码的执行顺序：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//假设webpack的入口文件是```main.js```
 
//main.js
import moduleA from 'moduleA'
console.log(1)
 
import moduleB from 'moduleB'
console.log(2)
 
//moduleA.js
console.log(3)
 
//moduleB.js
console.log(4)
 
//最终在浏览器中打印出的数字顺序是: 
3
4
1
2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">//假设webpack的入口文件是```main.js```</span>
 
<span class="hljs-comment">//main.js</span>
<span class="hljs-keyword">import</span> moduleA <span class="hljs-keyword">from</span> <span class="hljs-string">'moduleA'</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
 
<span class="hljs-keyword">import</span> moduleB <span class="hljs-keyword">from</span> <span class="hljs-string">'moduleB'</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
 
<span class="hljs-comment">//moduleA.js</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)
 
<span class="hljs-comment">//moduleB.js</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>)
 
<span class="hljs-comment">//最终在浏览器中打印出的数字顺序是: </span>
<span class="hljs-number">3</span>
<span class="hljs-number">4</span>
<span class="hljs-number">1</span>
<span class="hljs-number">2</span></code></pre>
<p>为什么会这样呢？跟ES6 module的机制有关系。import命令具有提升效果，会提升到整个模块的头部，首先执行。这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。</p>
<p>这样我们就找出之前报错的原因了，我们先import了App, router这些视图，然后Import的i18n并挂载到window。所以组件的script中的代码会最先执行，而此时i18n并未开始。所以我们首先将<code>window.i18n = i18n</code>移到locales/index中，然后调整main.js中import的顺序:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//locales/index
...
setup()
window.i18n = i18n

export default i18n

//main.js
import Vue from 'vue'

import i18n from '@crm/locales'
import App from './app.vue'
import store from './store'
import router from './router'
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">//locales/index</span>
...
setup()
window.i18n = i18n

<span class="hljs-keyword">export</span> default i18n

<span class="hljs-comment">//main.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

<span class="hljs-keyword">import</span> i18n <span class="hljs-keyword">from</span> <span class="hljs-string">'@crm/locales'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.vue'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
...</code></pre>
<h2 id="articleHeader4">问题二：假如存在很多个new Vue()怎么办？</h2>
<p>前面我们在main.js的<code>new Vue({i18n, ...})</code>中将i18n作为option放了进去，但很快我发现这个项目并只有一个Vue的实例。全局搜索发现一共有70多个。</p>
<p>项目中很的诸如弹窗之类的组件，都是直接自己实例化一个Vue然后自己<code>$mount()</code>到DOM中。这些组件在实例化的过程中并没有混入i18n选项，所以他们的template上自然找不到<code>$t()</code>方法。</p>
<p>怎么办？难道给每一个new Vue()都手动添加i18n选项吗？肯定不行，首先我们要给添加70多次，其次如果未来又有人写了新的new Vue()忘了添加Ii8n，那又回导致报错。所以我们要想一个万全的法子。</p>
<p>官方文档里找不到解决办法，看来我们得hack一下了。首先我们来查vue-i18n的<a href="https://github.com/kazupon/vue-i18n/blob/7c5fd95805dbcc6620cccf5343040f2cc515756c/dist/vue-i18n.js" rel="nofollow noreferrer" target="_blank">源码</a>，找到<code>$t()</code>方法是怎么工作的。</p>
<p>全局搜索$t，找到定义它的地方：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  Object.defineProperty(Vue.prototype, '$t', {
    get: function get () {
      var this$1 = this;

      return function (key) {
        var values = [], len = arguments.length - 1;
        while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

        var i18n = this$1.$i18n;
        return i18n._t.apply(i18n, [ key, i18n.locale, i18n._getMessages(), this$1 ].concat( values ))
      }
    }
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-built_in">Object</span>.defineProperty(Vue.prototype, <span class="hljs-string">'$t'</span>, {
    <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> <span class="hljs-keyword">this</span>$<span class="hljs-number">1</span> = <span class="hljs-keyword">this</span>;

      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
        <span class="hljs-keyword">var</span> values = [], len = <span class="hljs-built_in">arguments</span>.length - <span class="hljs-number">1</span>;
        <span class="hljs-keyword">while</span> ( len-- &gt; <span class="hljs-number">0</span> ) values[ len ] = <span class="hljs-built_in">arguments</span>[ len + <span class="hljs-number">1</span> ];

        <span class="hljs-keyword">var</span> i18n = <span class="hljs-keyword">this</span>$<span class="hljs-number">1.</span>$i18n;
        <span class="hljs-keyword">return</span> i18n._t.apply(i18n, [ key, i18n.locale, i18n._getMessages(), <span class="hljs-keyword">this</span>$<span class="hljs-number">1</span> ].concat( values ))
      }
    }
  });</code></pre>
<p>可以看到$t挂载在Vue.prototype上，每当我们在实例中调用$t时，其实我们是在调用this.$i18n对象上的_t方法。现在问题变成，实例上的$i18n是什么是时候定义的。</p>
<p>全局搜索$i18n，我们找到了前面提到过的每个插件必须提供的install方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function install (_Vue) {
  Vue = _Vue;
  
  ...

  Object.defineProperty(Vue.prototype, '$i18n', {
    get: function get () { return this._i18n }
  });

  extend(Vue);
  Vue.mixin(mixin);
  Vue.directive('t', { bind: bind, update: update });
  Vue.component(component.name, component);

  // use object-based merge strategy
  var strats = Vue.config.optionMergeStrategies;
  strats.i18n = strats.methods;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">install</span> <span class="hljs-params">(_Vue)</span> </span>{
  Vue = _Vue;
  
  ...

  Object.defineProperty(Vue.prototype, <span class="hljs-string">'$i18n'</span>, {
    <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get</span> <span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._i18n }
  });

  extend(Vue);
  Vue.mixin(mixin);
  Vue.directive(<span class="hljs-string">'t'</span>, { bind: bind, update: update });
  Vue.component(component.name, component);

  <span class="hljs-comment">// use object-based merge strategy</span>
  <span class="hljs-keyword">var</span> strats = Vue.config.optionMergeStrategies;
  strats.i18n = strats.methods;
}</code></pre>
<p>可以看到$i18n一开始就被定义在了Vue.prototype上，每次调用的时候其实我们是在调用this._i18n，所以现在问题变成实例的_i18n在哪里。同时可以看到在Install中我们还混入了mixin, directive, component，这些在上面都有提过它的作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mixin = {
  beforeCreate: function beforeCreate () {
    var options = this.$options;
    options.i18n = options.i18n || (options.__i18n ? {} : null);

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        ...
        this._i18n = options.i18n;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>var mixin = {
  beforeCreate: function beforeCreate () {
    var <span class="hljs-keyword">options</span> = <span class="hljs-keyword">this</span>.$<span class="hljs-keyword">options</span>;
    <span class="hljs-keyword">options</span>.i18n = <span class="hljs-keyword">options</span>.i18n || (<span class="hljs-keyword">options</span>.__i18n ? {} : <span class="hljs-keyword">null</span>);

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">options</span>.i18n) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">options</span>.i18n <span class="hljs-keyword">instanceof</span> VueI18n) {
        ...
        <span class="hljs-keyword">this</span>._i18n = <span class="hljs-keyword">options</span>.i18n;</code></pre>
<p>我们在mixin中找到了this._i18n的来源，前面提到mixin会被注入到组件中。在每个组件创建前，我们将this.$options的i18n给了this._i18n。</p>
<p>这个this.$options是什么？它的使用方式是<code>Vue.mixin(mixin)</code>，所以我们看一下vue的文档:<a href="https://cn.vuejs.org/v2/guide/mixins.html#%E5%85%A8%E5%B1%80%E6%B7%B7%E5%85%A5" rel="nofollow noreferrer" target="_blank">全局混入</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => &quot;hello!&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 为自定义的选项 'myOption' 注入一个处理器。</span>
Vue.mixin({
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> myOption = <span class="hljs-keyword">this</span>.$options.myOption
    <span class="hljs-keyword">if</span> (myOption) {
      <span class="hljs-built_in">console</span>.log(myOption)
    }
  }
})

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">myOption</span>: <span class="hljs-string">'hello!'</span>
})
<span class="hljs-comment">// =&gt; "hello!"</span></code></pre>
<p>所以this.$options就是我们new Vue时提供的选项对象。</p>
<p>所以问题的根源就是除了main.js中的new Vue外，其余70多个new Vue我们没有混入i18n这个选项。怎样才可以让每次new Vue时自动将i18n混入选项呢？看上去我们只能修改Vue的<a href="https://github.com/vuejs/vue/blob/dev/dist/vue.esm.js" rel="nofollow noreferrer" target="_blank">源码</a>了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &amp;&amp;
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue</span> <span class="hljs-params">(options)</span> </span>{
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp;
    !(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Vue)
  ) {
    warn(<span class="hljs-string">'Vue is a constructor and should be called with the `new` keyword'</span>);
  }
  <span class="hljs-keyword">this</span>._init(options);
}</code></pre>
<p>可以看到每次Vue实例化时，会调用_init方法，这个方法从哪里来呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initMixin</span> <span class="hljs-params">(Vue)</span> </span>{
  Vue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(options)</span> </span>{
    ...</code></pre>
<p>在Vue.prototype上，所以我们只需要修改Vue.prototype就好了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//locales/index
const init = Vue.prototype._init
Vue.prototype._init = function(options) {
  init.call(this, {
    i18n,
    ...options,
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//locales/index</span>
const init = Vue<span class="hljs-selector-class">.prototype</span>._init
Vue<span class="hljs-selector-class">.prototype</span>._init = function(options) {
  init.call(this, {
    i18n,
    ..<span class="hljs-selector-class">.options</span>,
  })
}
</code></pre>
<p>这样我们在任何时候new Vue()就自动添加了i18n选项，问题解决！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何让一个vue项目支持多语言（vue-i18n）

## 原文链接
[https://segmentfault.com/a/1190000015008808](https://segmentfault.com/a/1190000015008808)

