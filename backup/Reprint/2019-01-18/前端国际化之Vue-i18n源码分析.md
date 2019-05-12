---
title: '前端国际化之Vue-i18n源码分析' 
date: 2019-01-18 2:30:34
hidden: true
slug: dspk4y8d6tu
categories: [reprint]
---

{{< raw >}}

                    
<p>最近的工作当中有个任务是做国际化。这篇文章也是做个简单的总结。</p>
<h2 id="articleHeader0">部分网站的当前解决的方案</h2>
<ol>
<li><p>不同语言对应不同的页面。在本地开发的时候就分别打包输出了不同语言版本的静态及模板文件，通过页面及资源的<code>url</code>进行区分,需要维护多份代码。</p></li>
<li><p>在线翻译</p></li>
<li><p>统一模板文件，前端根据相应的语言映射表去做文案的替换。</p></li>
</ol>
<h2 id="articleHeader1">面对的问题</h2>
<ol>
<li>
<p>语言标识谁来做？</p>
<ul>
<li><p>页面完全由服务端直出(所有的数据均由服务端来处理)</p></li>
<li><p>服务端根据<code>IP</code>去下发语言标识字段(前端根据下发的表示字段切换语言环境)</p></li>
<li><p>前端去根据<code>useragent.lang</code>浏览器环境语言进行设定<br>   当前项目中入口页面由服务端来渲染,其他的页面由前端来接管路由。在入口页面由服务器下发<code>lang</code>字段去做语言标识，在页面渲染出来前，前端来决定使用的语言包。语言包是在本地编译的过程中就将语言包编译进了代码当中，没有采用异步加载的方式。</p></li>
</ul>
</li>
<li>
<p>前端静态资源翻译</p>
<ul>
<li><p>单/复数</p></li>
<li><p>中文转英文</p></li>
<li><p>语言展示的方向<br>前端静态资源文案的翻译使用<code>vue-i18n</code>这个插件来进行。插件提供了单复数，中文转英文的方法。a下文有对<code>vue-i18n</code>的源码进行分析。因为英文的阅读方向也是从左到右，因此语言展示的方向不予考虑。但是在一些阿拉伯地区国家的语言是从右到左进行阅读的。</p></li>
</ul>
</li>
<li><p>服务端数据翻译</p></li>
<li>
<p>前端样式的调整</p>
<ul>
<li><p>中文转英文后部分文案过长</p></li>
<li><p>图片</p></li>
<li><p>第三方插件(<code>地图</code>,<code>SDK</code>等)</p></li>
</ul>
<p>a.中文转英文后肯定会遇到文案过长的情况。那么可能需要精简翻译，使文案保持在一定的可接受的长度范围内。但是大部分的情况都是文案在保持原意的情况下无法再进行精简。这时必须要前端来进行样式上的调整，那么可能还需要设计的同学参与进来，对一些文案过多出现折行的情况再单独做样式的定义。在细调样式这块，主要还是通过不同的语言标识去控制不同标签的<code>class</code>，来单独定义样式。<br><span class="img-wrap"><img data-src="/img/bVKS5D?w=682&amp;h=1166" src="https://static.alili.tech/img/bVKS5D?w=682&amp;h=1166" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li><p>此外，还有部分图片也是需要做调整，在C端中，大部分由产品方去输出内容，那么图片这块的话，还需要设计同学单独出图。</p></li>
<li><p>在第三方插件中这个环节当中，因为使用了<code>腾讯地图</code>插件，由于腾讯地图并未推出国内地图的英文版，所以整个页面的地图部分暂时无法做到国际化。由此联想到，在你的应用当中使用的其他一些<code>第三方插件</code>或者<code>SDK</code>，在国际化的过程中需要去解决哪些问题。<br><span class="img-wrap"><img data-src="/img/bVKS5I?w=686&amp;h=1172" src="https://static.alili.tech/img/bVKS5I?w=686&amp;h=1172" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p></li>
</ol>
</li>
<li>
<p>跨地区xxxx</p>
<ul>
<li><p>货币及支付方式</p></li>
<li><p>时间的格式</p></li>
</ul>
<p>在一些<code>支付场景</code>下，<code>货币符号</code>，<code>单位</code>及<code>价格</code>的转化等。不同国家地区在时间的格式显示上有差异。</p>
</li>
<li>
<p>项目的长期维护</p>
<ul>
<li><p>翻译工作</p></li>
<li><p><code>map</code>表的维护</p></li>
</ul>
<p>当前翻译的工作流程是拆页面，每拆一个页面，FE同学整理好可能会出现的中文文案，再交由翻译的同学去完成翻译的工作。负责不同页面的同学维护着不同的<code>map</code>表，在当前的整体页面架构中，不同功能模块和页面被拆分出去交由不同的同学去做，那么通过跳页面的方式去暂时缓解<code>map</code>表的维护问题。如果哪一天页面需要收敛，这也是一个需要去考虑的问题。如果从整个项目的一开始就考虑到国际化的问题并采取相关的措施都能减轻后期的工作量及维护成本。同时以后一旦<code>map</code>表内容过多，是否需要考虑需要将<code>map</code>表进行异步加载。</p>
</li>
</ol>
<h2 id="articleHeader2">Vue-i18n的基本使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // 入口main.js文件
    import VueI18n from 'vue-i18n'
    
    Vue.use(VueI18n)            // 通过插件的形式挂载
    
    const i18n = new VueI18n({
        locale: CONFIG.lang,    // 语言标识
        messages: {
            'zh-CN': require('./common/lang/zh'),   // 中文语言包
            'en-US': require('./common/lang/en')    // 英文语言包
        }
    })
    
    const app = new Vue({
        i18n,
        ...App
    }).$mout('#root')
    
    // 单vue文件
    <template>
        <span>"{{"$t('你好')"}}"</span>
    </template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// 入口main.js文件</span>
    <span class="hljs-keyword">import</span> VueI18n <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-i18n'</span>
    
    Vue.use(VueI18n)            <span class="hljs-comment">// 通过插件的形式挂载</span>
    
    <span class="hljs-keyword">const</span> i18n = <span class="hljs-keyword">new</span> VueI18n({
        <span class="hljs-attr">locale</span>: CONFIG.lang,    <span class="hljs-comment">// 语言标识</span>
        messages: {
            <span class="hljs-string">'zh-CN'</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./common/lang/zh'</span>),   <span class="hljs-comment">// 中文语言包</span>
            <span class="hljs-string">'en-US'</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./common/lang/en'</span>)    <span class="hljs-comment">// 英文语言包</span>
        }
    })
    
    <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
        i18n,
        ...App
    }).$mout(<span class="hljs-string">'#root'</span>)
    
    <span class="hljs-comment">// 单vue文件</span>
    &lt;template&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"$t('你好')"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
    &lt;<span class="hljs-regexp">/template&gt;</span></code></pre>
<p><code>Vue-i18n</code>是以插件的形式配合<code>Vue</code>进行工作的。通过全局的<code>mixin</code>的方式将插件提供的方法挂载到<code>Vue</code>的实例上。</p>
<h2 id="articleHeader3">具体的源码分析</h2>
<p>其中<code>install.js</code>Vue的挂载函数,主要是为了将<code>mixin.js</code>里面的提供的方法挂载到<code>Vue</code>实例当中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { warn } from './util'
import mixin from './mixin'
import Asset from './asset'

export let Vue

// 注入root Vue
export function install (_Vue) { 
  Vue = _Vue

  const version = (Vue.version &amp;&amp; Number(Vue.version.split('.')[0])) || -1
  if (process.env.NODE_ENV !== 'production' &amp;&amp; install.installed) {
    warn('already installed.')
    return
  }
  install.installed = true

  if (process.env.NODE_ENV !== 'production' &amp;&amp; version < 2) {
    warn(`vue-i18n (${install.version}) need to use Vue 2.0 or later (Vue: ${Vue.version}).`)
    return
  }

  // 通过mixin的方式，将插件提供的methods，钩子函数等注入到全局，之后每次创建的vue实例都用拥有这些methods或者钩子函数
  Vue.mixin(mixin)

  Asset(Vue)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { warn } <span class="hljs-keyword">from</span> <span class="hljs-string">'./util'</span>
<span class="hljs-keyword">import</span> mixin <span class="hljs-keyword">from</span> <span class="hljs-string">'./mixin'</span>
<span class="hljs-keyword">import</span> Asset <span class="hljs-keyword">from</span> <span class="hljs-string">'./asset'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> Vue

<span class="hljs-comment">// 注入root Vue</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">install</span> (<span class="hljs-params">_Vue</span>) </span>{ 
  Vue = _Vue

  <span class="hljs-keyword">const</span> version = (Vue.version &amp;&amp; <span class="hljs-built_in">Number</span>(Vue.version.split(<span class="hljs-string">'.'</span>)[<span class="hljs-number">0</span>])) || <span class="hljs-number">-1</span>
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; install.installed) {
    warn(<span class="hljs-string">'already installed.'</span>)
    <span class="hljs-keyword">return</span>
  }
  install.installed = <span class="hljs-literal">true</span>

  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; version &lt; <span class="hljs-number">2</span>) {
    warn(<span class="hljs-string">`vue-i18n (<span class="hljs-subst">${install.version}</span>) need to use Vue 2.0 or later (Vue: <span class="hljs-subst">${Vue.version}</span>).`</span>)
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// 通过mixin的方式，将插件提供的methods，钩子函数等注入到全局，之后每次创建的vue实例都用拥有这些methods或者钩子函数</span>
  Vue.mixin(mixin)

  Asset(Vue)
}
</code></pre>
<p>接下来就看下在<code>Vue</code>上混合了哪些<code>methods</code>或者<code>钩子函数</code>. 在<code>mixin.js</code>文件中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* @flow */

// VueI18n构造函数
import VueI18n from './index'
import { isPlainObject, warn } from './util'


// $i18n 是每创建一个Vue实例都会产生的实例对象
// 调用以下方法前都会判断实例上是否挂载了$i18n这个属性
// 最后实际调用的方法是插件内部定义的方法
export default {
  // 这里混合了computed计算属性, 注意这里计算属性返回的都是函数,这样就可以在vue模板里面使用"{{" $t('hello') "}}", 或者其他方法当中使用 this.$t('hello')。这种函数接收参数的方式
  computed: {
    // 翻译函数, 调用的是VueI18n实例上提供的方法
    $t () {
      if (!this.$i18n) {
        throw Error(`Failed in $t due to not find VueI18n instance`)
      }
      // add dependency tracking !!
      const locale: string = this.$i18n.locale          // 语言配置
      const messages: Messages = this.$i18n.messages    // 语言包
      // 返回一个函数. 接受一个key值. 即在map文件中定义的key值, 在模板中进行使用 "{{" $t('你好') "}}"
      // ...args是传入的参数, 例如在模板中定义的一些替换符, 具体的支持的形式可翻阅文档https://kazupon.github.io/vue-i18n/formatting.html
      return (key: string, ...args: any): string => {
        return this.$i18n._t(key, locale, messages, this, ...args)
      }
    },

    // tc方法可以单独定义组件内部语言设置选项, 如果没有定义组件内部语言，则还是使用global的配置
    $tc () {
      if (!this.$i18n) {
        throw Error(`Failed in $tc due to not find VueI18n instance`)
      }
      // add dependency tracking !!
      const locale: string = this.$i18n.locale
      const messages: Messages = this.$i18n.messages
      return (key: string, choice?: number, ...args: any): string => {
        return this.$i18n._tc(key, locale, messages, this, choice, ...args)
      }
    },

    // te方法
    $te () {
      if (!this.$i18n) {
        throw Error(`Failed in $te due to not find VueI18n instance`)
      }
      // add dependency tracking !!
      const locale: string = this.$i18n.locale
      const messages: Messages = this.$i18n.messages
      return (key: string, ...args: any): boolean => {
        return this.$i18n._te(key, locale, messages, ...args)
      }
    }
  },

  // 钩子函数
  // 被渲染前，在vue实例上添加$i18n属性
  // 在根组件初始化的过程中:
  /**
   * new Vue({
   *   i18n   // 这里是提供了自定义的属性 那么实例当中可以通过this.$option.i18n去访问这个属性
   *   // xxxx
   * })
   */
  beforeCreate () {
    const options: any = this.$options
    // 如果有i18n这个属性. 根实例化的时候传入了这个参数
    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // 如果是VueI18n的实例，那么挂载在Vue实例的$i18n属性上
        this.$i18n = options.i18n
        // 如果是个object
      } else if (isPlainObject(options.i18n)) {     // 如果是一个pobj
        // component local i18n
        // 访问root vue实例。
        if (this.$root &amp;&amp; this.$root.$i18n &amp;&amp; this.$root.$i18n instanceof VueI18n) {
          options.i18n.root = this.$root.$i18n
        }
        this.$i18n = new VueI18n(options.i18n)  // 创建属于component的local i18n
        if (options.i18n.sync) {
          this._localeWatcher = this.$i18n.watchLocale()
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn(`Cannot be interpreted 'i18n' option.`)
        }
      }
    } else if (this.$root &amp;&amp; this.$root.$i18n &amp;&amp; this.$root.$i18n instanceof VueI18n) {
      // root i18n
      // 如果子Vue实例没有传入$i18n方法,且root挂载了$i18n,那么子实例也会使用root i18n
      this.$i18n = this.$root.$i18n
    }
  },

  // 实例被销毁的回调函数
  destroyed () {
    if (this._localeWatcher) {
      this.$i18n.unwatchLocale()
      delete this._localeWatcher
    }

    // 组件销毁后，同时也销毁实例上的$i18n方法
    this.$i18n = null
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* @flow */</span>

<span class="hljs-comment">// VueI18n构造函数</span>
<span class="hljs-keyword">import</span> VueI18n <span class="hljs-keyword">from</span> <span class="hljs-string">'./index'</span>
<span class="hljs-keyword">import</span> { isPlainObject, warn } <span class="hljs-keyword">from</span> <span class="hljs-string">'./util'</span>


<span class="hljs-comment">// $i18n 是每创建一个Vue实例都会产生的实例对象</span>
<span class="hljs-comment">// 调用以下方法前都会判断实例上是否挂载了$i18n这个属性</span>
<span class="hljs-comment">// 最后实际调用的方法是插件内部定义的方法</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// 这里混合了computed计算属性, 注意这里计算属性返回的都是函数,这样就可以在vue模板里面使用"{{" $t('hello') "}}", 或者其他方法当中使用 this.$t('hello')。这种函数接收参数的方式</span>
  computed: {
    <span class="hljs-comment">// 翻译函数, 调用的是VueI18n实例上提供的方法</span>
    $t () {
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.$i18n) {
        <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`Failed in $t due to not find VueI18n instance`</span>)
      }
      <span class="hljs-comment">// add dependency tracking !!</span>
      <span class="hljs-keyword">const</span> locale: string = <span class="hljs-keyword">this</span>.$i18n.locale          <span class="hljs-comment">// 语言配置</span>
      <span class="hljs-keyword">const</span> messages: Messages = <span class="hljs-keyword">this</span>.$i18n.messages    <span class="hljs-comment">// 语言包</span>
      <span class="hljs-comment">// 返回一个函数. 接受一个key值. 即在map文件中定义的key值, 在模板中进行使用 "{{" $t('你好') "}}"</span>
      <span class="hljs-comment">// ...args是传入的参数, 例如在模板中定义的一些替换符, 具体的支持的形式可翻阅文档https://kazupon.github.io/vue-i18n/formatting.html</span>
      <span class="hljs-keyword">return</span> (key: string, ...args: any): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$i18n._t(key, locale, messages, <span class="hljs-keyword">this</span>, ...args)
      }
    },

    <span class="hljs-comment">// tc方法可以单独定义组件内部语言设置选项, 如果没有定义组件内部语言，则还是使用global的配置</span>
    $tc () {
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.$i18n) {
        <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`Failed in $tc due to not find VueI18n instance`</span>)
      }
      <span class="hljs-comment">// add dependency tracking !!</span>
      <span class="hljs-keyword">const</span> locale: string = <span class="hljs-keyword">this</span>.$i18n.locale
      <span class="hljs-keyword">const</span> messages: Messages = <span class="hljs-keyword">this</span>.$i18n.messages
      <span class="hljs-keyword">return</span> (key: string, choice?: number, ...args: any): <span class="hljs-function"><span class="hljs-params">string</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$i18n._tc(key, locale, messages, <span class="hljs-keyword">this</span>, choice, ...args)
      }
    },

    <span class="hljs-comment">// te方法</span>
    $te () {
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.$i18n) {
        <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">`Failed in $te due to not find VueI18n instance`</span>)
      }
      <span class="hljs-comment">// add dependency tracking !!</span>
      <span class="hljs-keyword">const</span> locale: string = <span class="hljs-keyword">this</span>.$i18n.locale
      <span class="hljs-keyword">const</span> messages: Messages = <span class="hljs-keyword">this</span>.$i18n.messages
      <span class="hljs-keyword">return</span> (key: string, ...args: any): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$i18n._te(key, locale, messages, ...args)
      }
    }
  },

  <span class="hljs-comment">// 钩子函数</span>
  <span class="hljs-comment">// 被渲染前，在vue实例上添加$i18n属性</span>
  <span class="hljs-comment">// 在根组件初始化的过程中:</span>
  <span class="hljs-comment">/**
   * new Vue({
   *   i18n   // 这里是提供了自定义的属性 那么实例当中可以通过this.$option.i18n去访问这个属性
   *   // xxxx
   * })
   */</span>
  beforeCreate () {
    <span class="hljs-keyword">const</span> options: any = <span class="hljs-keyword">this</span>.$options
    <span class="hljs-comment">// 如果有i18n这个属性. 根实例化的时候传入了这个参数</span>
    <span class="hljs-keyword">if</span> (options.i18n) {
      <span class="hljs-keyword">if</span> (options.i18n <span class="hljs-keyword">instanceof</span> VueI18n) {
        <span class="hljs-comment">// 如果是VueI18n的实例，那么挂载在Vue实例的$i18n属性上</span>
        <span class="hljs-keyword">this</span>.$i18n = options.i18n
        <span class="hljs-comment">// 如果是个object</span>
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isPlainObject(options.i18n)) {     <span class="hljs-comment">// 如果是一个pobj</span>
        <span class="hljs-comment">// component local i18n</span>
        <span class="hljs-comment">// 访问root vue实例。</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$root &amp;&amp; <span class="hljs-keyword">this</span>.$root.$i18n &amp;&amp; <span class="hljs-keyword">this</span>.$root.$i18n <span class="hljs-keyword">instanceof</span> VueI18n) {
          options.i18n.root = <span class="hljs-keyword">this</span>.$root.$i18n
        }
        <span class="hljs-keyword">this</span>.$i18n = <span class="hljs-keyword">new</span> VueI18n(options.i18n)  <span class="hljs-comment">// 创建属于component的local i18n</span>
        <span class="hljs-keyword">if</span> (options.i18n.sync) {
          <span class="hljs-keyword">this</span>._localeWatcher = <span class="hljs-keyword">this</span>.$i18n.watchLocale()
        }
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
          warn(<span class="hljs-string">`Cannot be interpreted 'i18n' option.`</span>)
        }
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$root &amp;&amp; <span class="hljs-keyword">this</span>.$root.$i18n &amp;&amp; <span class="hljs-keyword">this</span>.$root.$i18n <span class="hljs-keyword">instanceof</span> VueI18n) {
      <span class="hljs-comment">// root i18n</span>
      <span class="hljs-comment">// 如果子Vue实例没有传入$i18n方法,且root挂载了$i18n,那么子实例也会使用root i18n</span>
      <span class="hljs-keyword">this</span>.$i18n = <span class="hljs-keyword">this</span>.$root.$i18n
    }
  },

  <span class="hljs-comment">// 实例被销毁的回调函数</span>
  destroyed () {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._localeWatcher) {
      <span class="hljs-keyword">this</span>.$i18n.unwatchLocale()
      <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>._localeWatcher
    }

    <span class="hljs-comment">// 组件销毁后，同时也销毁实例上的$i18n方法</span>
    <span class="hljs-keyword">this</span>.$i18n = <span class="hljs-literal">null</span>
  }
}</code></pre>
<p>这里注意下这几个方法的区别:</p>
<p><code>$tc</code>这个方法可以用以返回翻译的复数字符串, 及一个<code>key</code>可以对应的翻译文本，通过<code>|</code>进行连接:</p>
<p>例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // main.js
    new VueI18n({
        messages: {
            car: 'car | cars'
        }
    })
    
    // template
    <span>"{{"$tc('car', 1)"}}"</span>   ===>>>  <span>car</span>
    <span>"{{"$tc('car', 2)"}}"</span>   ===>>>  <span>cars</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// main.js</span>
    <span class="hljs-keyword">new</span> VueI18n({
        <span class="hljs-attr">messages</span>: {
            <span class="hljs-attr">car</span>: <span class="hljs-string">'car | cars'</span>
        }
    })
    
    <span class="hljs-comment">// template</span>
    &lt;span&gt;"{{"$tc(<span class="hljs-string">'car'</span>, <span class="hljs-number">1</span>)"}}"&lt;<span class="hljs-regexp">/span&gt;   ===&gt;&gt;&gt;  &lt;span&gt;car&lt;/</span>span&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"$tc('car', 2)"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>   ===&gt;&gt;&gt;  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>cars<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span></code></pre>
<p><code>$te</code>这个方法用以判断需要翻译的<code>key</code>在你提供的<code>语言包(messages)</code>中是否存在.</p>
<p>接下来就看看<code>VueI18n</code>构造函数及原型上提供了哪些可以被实例继承的属性或者方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* @flow */

import { install, Vue } from './install'
import { warn, isNull, parseArgs, fetchChoice } from './util'
import BaseFormatter from './format'    // 转化函数 封装了format, 里面包含了template模板替换的方法
import getPathValue from './path'

import type { PathValue } from './path'

// VueI18n构造函数
export default class VueI18n {
  static install: () => void
  static version: string

  _vm: any
  _formatter: Formatter
  _root: ?I18n
  _sync: ?boolean
  _fallbackRoot: boolean
  _fallbackLocale: string
  _missing: ?MissingHandler
  _exist: Function
  _watcher: any

  // 实例化参数配置
  constructor (options: I18nOptions = {}) {
    const locale: string = options.locale || 'en-US'    // vue-i18n初始化的时候语言参数配置
    const messages: Messages = options.messages || {}   // 本地配置的所有语言环境都是挂载到了messages这个属性上
    this._vm = null                 // ViewModel
    this._fallbackLocale = options.fallbackLocale || 'en-US'  // 缺省语言配置
    this._formatter = options.formatter || new BaseFormatter()  // 翻译函数
    this._missing = options.missing
    this._root = options.root || null
    this._sync = options.sync || false   
    this._fallbackRoot = options.fallbackRoot || false

    this._exist = (message: Object, key: string): boolean => {
      if (!message || !key) { return false }
      return !isNull(getPathValue(message, key))
    }

    this._resetVM({ locale, messages })
  }

  // VM 
  // 重置viewModel
  _resetVM (data: { locale: string, messages: Messages }): void {
    const silent = Vue.config.silent
    Vue.config.silent = true
    this._vm = new Vue({ data })
    Vue.config.silent = silent
  }

  // 根实例的vm监听locale这个属性
  watchLocale (): any {
    if (!this._sync || !this._root) { return null }
    const target: any = this._vm
    // vm.$watch返回的是一个取消观察的函数，用来停止触发回调
    this._watcher = this._root.vm.$watch('locale', (val) => {
      target.$set(target, 'locale', val)
    }, { immediate: true })
    return this._watcher
  }

  // 停止触发vm.$watch观察函数
  unwatchLocale (): boolean {
    if (!this._sync || !this._watcher) { return false }
    if (this._watcher) {
      this._watcher()
      delete this._watcher
    }
    return true
  }

  get vm (): any { return this._vm }

  get messages (): Messages { return this._vm.$data.messages }                  // get 获取messages参数
  set messages (messages: Messages): void { this._vm.$set(this._vm, 'messages', messages) }  // set 设置messages参数

  get locale (): string { return this._vm.$data.locale }                        // get 获取语言配置参数
  set locale (locale: string): void { this._vm.$set(this._vm, 'locale', locale) }     // set 重置语言配置参数

  get fallbackLocale (): string { return this._fallbackLocale }                 //  fallbackLocale 是什么?
  set fallbackLocale (locale: string): void { this._fallbackLocale = locale }

  get missing (): ?MissingHandler { return this._missing }
  set missing (handler: MissingHandler): void { this._missing = handler }

  get formatter (): Formatter { return this._formatter }                          // get 转换函数
  set formatter (formatter: Formatter): void { this._formatter = formatter }      // set 转换函数

  _warnDefault (locale: string, key: string, result: ?any, vm: ?any): ?string {
    if (!isNull(result)) { return result }
    if (this.missing) {
      this.missing.apply(null, [locale, key, vm])
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          `Cannot translate the value of keypath '${key}'. ` +
          'Use the value of keypath as default.'
        )
      }
    }
    return key
  }

  _isFallbackRoot (val: any): boolean {
    return !val &amp;&amp; !isNull(this._root) &amp;&amp; this._fallbackRoot
  }

  // 插入函数
  _interpolate (message: Messages, key: string, args: any): any {
    if (!message) { return null }

    // 获取key对应的字符串
    let val: PathValue = getPathValue(message, key)
    if (Array.isArray(val)) { return val }
    if (isNull(val)) { val = message[key] }
    if (isNull(val)) { return null }
    if (typeof val !== 'string') {
      warn(`Value of key '${key}' is not a string!`)
      return null
    }


    // TODO ?? 这里的links是干什么的？
    // Check for the existance of links within the translated string
    if (val.indexOf('@:') >= 0) {
      // Match all the links within the local
      // We are going to replace each of
      // them with its translation
      const matches: any = val.match(/(@:[\w|.]+)/g)
      for (const idx in matches) {
        const link = matches[idx]
        // Remove the leading @:
        const linkPlaceholder = link.substr(2)
        // Translate the link
        const translatedstring = this._interpolate(message, linkPlaceholder, args)
        // Replace the link with the translated string
        val = val.replace(link, translatedstring)
      }
    }

    // 如果没有传入需要替换的obj, 那么直接返回字符串, 否则调用this._format进行变量等的替换
    return !args ? val : this._format(val, args)    // 获取替换后的字符
  }

  _format (val: any, ...args: any): any {
    return this._formatter.format(val, ...args)
  }

  // 翻译函数
  _translate (messages: Messages, locale: string, fallback: string, key: string, args: any): any {
    let res: any = null
    /**
     * messages[locale] 使用哪个语言包
     * key 语言映射表的key
     * args 映射替换关系
     */
    res = this._interpolate(messages[locale], key, args)
    if (!isNull(res)) { return res }

    res = this._interpolate(messages[fallback], key, args)
    if (!isNull(res)) {
      if (process.env.NODE_ENV !== 'production') {
        warn(`Fall back to translate the keypath '${key}' with '${fallback}' locale.`)
      }
      return res
    } else {
      return null
    }
  }

  // 翻译的核心函数
  /**
   * 这里的方法传入的参数参照mixin.js里面的定义的方法
   * key map的key值 (为接受的外部参数)
   * _locale 语言配置选项: 'zh-CN' | 'en-US' (内部变量)
   * messages 映射表 (内部变量)
   * host为这个i18n的实例 (内部变量)
   *
   */
  _t (key: string, _locale: string, messages: Messages, host: any, ...args: any): any {
    if (!key) { return '' }
    
    // parseArgs函数用以返回传入的局部语言配置, 及映射表
    const parsedArgs = parseArgs(...args)   // 接收的参数{ locale, params(映射表) }
    const locale = parsedArgs.locale || _locale   // 语言配置
    
    // 字符串替换
    /**
     * @params messages  语言包
     * @params locale  语言配置
     * @params fallbackLocale 缺省语言配置
     * @params key 替换的key值
     * @params parsedArgs.params 需要被替换的参数map表
     */
    const ret: any = this._translate(messages, locale, this.fallbackLocale, key, parsedArgs.params)
    if (this._isFallbackRoot(ret)) {
      if (process.env.NODE_ENV !== 'production') {
        warn(`Fall back to translate the keypath '${key}' with root locale.`)
      }
      if (!this._root) { throw Error('unexpected error') }
      return this._root.t(key, ...args)
    } else {
      return this._warnDefault(locale, key, ret, host)
    }
  }

  // 转化函数
  t (key: string, ...args: any): string {
    return this._t(key, this.locale, this.messages, null, ...args)
  }

  _tc (key: string, _locale: string, messages: Messages, host: any, choice?: number, ...args: any): any {
    if (!key) { return '' }
    if (choice !== undefined) {
      return fetchChoice(this._t(key, _locale, messages, host, ...args), choice)
    } else {
      return this._t(key, _locale, messages, host, ...args)
    }
  }

  tc (key: string, choice?: number, ...args: any): any {
    return this._tc(key, this.locale, this.messages, null, choice, ...args)
  }

  _te (key: string, _locale: string, messages: Messages, ...args: any): boolean {
    const locale = parseArgs(...args).locale || _locale
    return this._exist(messages[locale], key)
  }

  te (key: string, ...args: any): boolean {
    return this._te(key, this.locale, this.messages, ...args)
  }
}

VueI18n.install = install
VueI18n.version = '__VERSION__'

// 如果是通过CDN或者外链的形式引入的Vue
if (typeof window !== 'undefined' &amp;&amp; window.Vue) {
  window.Vue.use(VueI18n)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* @flow */</span>

<span class="hljs-keyword">import</span> { install, Vue } <span class="hljs-keyword">from</span> <span class="hljs-string">'./install'</span>
<span class="hljs-keyword">import</span> { warn, isNull, parseArgs, fetchChoice } <span class="hljs-keyword">from</span> <span class="hljs-string">'./util'</span>
<span class="hljs-keyword">import</span> BaseFormatter <span class="hljs-keyword">from</span> <span class="hljs-string">'./format'</span>    <span class="hljs-comment">// 转化函数 封装了format, 里面包含了template模板替换的方法</span>
<span class="hljs-keyword">import</span> getPathValue <span class="hljs-keyword">from</span> <span class="hljs-string">'./path'</span>

<span class="hljs-keyword">import</span> type { PathValue } <span class="hljs-keyword">from</span> <span class="hljs-string">'./path'</span>

<span class="hljs-comment">// VueI18n构造函数</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">VueI18n</span> </span>{
  <span class="hljs-keyword">static</span> install: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">void</span>
  <span class="hljs-keyword">static</span> version: string

  _vm: any
  _formatter: Formatter
  _root: ?I18n
  _sync: ?boolean
  _fallbackRoot: boolean
  _fallbackLocale: string
  _missing: ?MissingHandler
  _exist: <span class="hljs-built_in">Function</span>
  _watcher: any

  <span class="hljs-comment">// 实例化参数配置</span>
  <span class="hljs-keyword">constructor</span> (options: I18nOptions = {}) {
    <span class="hljs-keyword">const</span> locale: string = options.locale || <span class="hljs-string">'en-US'</span>    <span class="hljs-comment">// vue-i18n初始化的时候语言参数配置</span>
    <span class="hljs-keyword">const</span> messages: Messages = options.messages || {}   <span class="hljs-comment">// 本地配置的所有语言环境都是挂载到了messages这个属性上</span>
    <span class="hljs-keyword">this</span>._vm = <span class="hljs-literal">null</span>                 <span class="hljs-comment">// ViewModel</span>
    <span class="hljs-keyword">this</span>._fallbackLocale = options.fallbackLocale || <span class="hljs-string">'en-US'</span>  <span class="hljs-comment">// 缺省语言配置</span>
    <span class="hljs-keyword">this</span>._formatter = options.formatter || <span class="hljs-keyword">new</span> BaseFormatter()  <span class="hljs-comment">// 翻译函数</span>
    <span class="hljs-keyword">this</span>._missing = options.missing
    <span class="hljs-keyword">this</span>._root = options.root || <span class="hljs-literal">null</span>
    <span class="hljs-keyword">this</span>._sync = options.sync || <span class="hljs-literal">false</span>   
    <span class="hljs-keyword">this</span>._fallbackRoot = options.fallbackRoot || <span class="hljs-literal">false</span>

    <span class="hljs-keyword">this</span>._exist = (message: <span class="hljs-built_in">Object</span>, <span class="hljs-attr">key</span>: string): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (!message || !key) { <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span> }
      <span class="hljs-keyword">return</span> !isNull(getPathValue(message, key))
    }

    <span class="hljs-keyword">this</span>._resetVM({ locale, messages })
  }

  <span class="hljs-comment">// VM </span>
  <span class="hljs-comment">// 重置viewModel</span>
  _resetVM (data: { <span class="hljs-attr">locale</span>: string, <span class="hljs-attr">messages</span>: Messages }): <span class="hljs-keyword">void</span> {
    <span class="hljs-keyword">const</span> silent = Vue.config.silent
    Vue.config.silent = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">this</span>._vm = <span class="hljs-keyword">new</span> Vue({ data })
    Vue.config.silent = silent
  }

  <span class="hljs-comment">// 根实例的vm监听locale这个属性</span>
  watchLocale (): any {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._sync || !<span class="hljs-keyword">this</span>._root) { <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span> }
    <span class="hljs-keyword">const</span> target: any = <span class="hljs-keyword">this</span>._vm
    <span class="hljs-comment">// vm.$watch返回的是一个取消观察的函数，用来停止触发回调</span>
    <span class="hljs-keyword">this</span>._watcher = <span class="hljs-keyword">this</span>._root.vm.$watch(<span class="hljs-string">'locale'</span>, (val) =&gt; {
      target.$set(target, <span class="hljs-string">'locale'</span>, val)
    }, { <span class="hljs-attr">immediate</span>: <span class="hljs-literal">true</span> })
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._watcher
  }

  <span class="hljs-comment">// 停止触发vm.$watch观察函数</span>
  unwatchLocale (): boolean {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._sync || !<span class="hljs-keyword">this</span>._watcher) { <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span> }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._watcher) {
      <span class="hljs-keyword">this</span>._watcher()
      <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>._watcher
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }

  get vm (): any { <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._vm }

  get messages (): Messages { <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._vm.$data.messages }                  <span class="hljs-comment">// get 获取messages参数</span>
  set messages (messages: Messages): <span class="hljs-keyword">void</span> { <span class="hljs-keyword">this</span>._vm.$set(<span class="hljs-keyword">this</span>._vm, <span class="hljs-string">'messages'</span>, messages) }  <span class="hljs-comment">// set 设置messages参数</span>

  get locale (): string { <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._vm.$data.locale }                        <span class="hljs-comment">// get 获取语言配置参数</span>
  set locale (locale: string): <span class="hljs-keyword">void</span> { <span class="hljs-keyword">this</span>._vm.$set(<span class="hljs-keyword">this</span>._vm, <span class="hljs-string">'locale'</span>, locale) }     <span class="hljs-comment">// set 重置语言配置参数</span>

  get fallbackLocale (): string { <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._fallbackLocale }                 <span class="hljs-comment">//  fallbackLocale 是什么?</span>
  set fallbackLocale (locale: string): <span class="hljs-keyword">void</span> { <span class="hljs-keyword">this</span>._fallbackLocale = locale }

  get missing (): ?MissingHandler { <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._missing }
  set missing (handler: MissingHandler): <span class="hljs-keyword">void</span> { <span class="hljs-keyword">this</span>._missing = handler }

  get formatter (): Formatter { <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._formatter }                          <span class="hljs-comment">// get 转换函数</span>
  set formatter (formatter: Formatter): <span class="hljs-keyword">void</span> { <span class="hljs-keyword">this</span>._formatter = formatter }      <span class="hljs-comment">// set 转换函数</span>

  _warnDefault (locale: string, <span class="hljs-attr">key</span>: string, <span class="hljs-attr">result</span>: ?any, <span class="hljs-attr">vm</span>: ?any): ?string {
    <span class="hljs-keyword">if</span> (!isNull(result)) { <span class="hljs-keyword">return</span> result }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.missing) {
      <span class="hljs-keyword">this</span>.missing.apply(<span class="hljs-literal">null</span>, [locale, key, vm])
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
        warn(
          <span class="hljs-string">`Cannot translate the value of keypath '<span class="hljs-subst">${key}</span>'. `</span> +
          <span class="hljs-string">'Use the value of keypath as default.'</span>
        )
      }
    }
    <span class="hljs-keyword">return</span> key
  }

  _isFallbackRoot (val: any): boolean {
    <span class="hljs-keyword">return</span> !val &amp;&amp; !isNull(<span class="hljs-keyword">this</span>._root) &amp;&amp; <span class="hljs-keyword">this</span>._fallbackRoot
  }

  <span class="hljs-comment">// 插入函数</span>
  _interpolate (message: Messages, <span class="hljs-attr">key</span>: string, <span class="hljs-attr">args</span>: any): any {
    <span class="hljs-keyword">if</span> (!message) { <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span> }

    <span class="hljs-comment">// 获取key对应的字符串</span>
    <span class="hljs-keyword">let</span> val: PathValue = getPathValue(message, key)
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(val)) { <span class="hljs-keyword">return</span> val }
    <span class="hljs-keyword">if</span> (isNull(val)) { val = message[key] }
    <span class="hljs-keyword">if</span> (isNull(val)) { <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span> }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> val !== <span class="hljs-string">'string'</span>) {
      warn(<span class="hljs-string">`Value of key '<span class="hljs-subst">${key}</span>' is not a string!`</span>)
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
    }


    <span class="hljs-comment">// TODO ?? 这里的links是干什么的？</span>
    <span class="hljs-comment">// Check for the existance of links within the translated string</span>
    <span class="hljs-keyword">if</span> (val.indexOf(<span class="hljs-string">'@:'</span>) &gt;= <span class="hljs-number">0</span>) {
      <span class="hljs-comment">// Match all the links within the local</span>
      <span class="hljs-comment">// We are going to replace each of</span>
      <span class="hljs-comment">// them with its translation</span>
      <span class="hljs-keyword">const</span> matches: any = val.match(<span class="hljs-regexp">/(@:[\w|.]+)/g</span>)
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> idx <span class="hljs-keyword">in</span> matches) {
        <span class="hljs-keyword">const</span> link = matches[idx]
        <span class="hljs-comment">// Remove the leading @:</span>
        <span class="hljs-keyword">const</span> linkPlaceholder = link.substr(<span class="hljs-number">2</span>)
        <span class="hljs-comment">// Translate the link</span>
        <span class="hljs-keyword">const</span> translatedstring = <span class="hljs-keyword">this</span>._interpolate(message, linkPlaceholder, args)
        <span class="hljs-comment">// Replace the link with the translated string</span>
        val = val.replace(link, translatedstring)
      }
    }

    <span class="hljs-comment">// 如果没有传入需要替换的obj, 那么直接返回字符串, 否则调用this._format进行变量等的替换</span>
    <span class="hljs-keyword">return</span> !args ? val : <span class="hljs-keyword">this</span>._format(val, args)    <span class="hljs-comment">// 获取替换后的字符</span>
  }

  _format (val: any, ...args: any): any {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._formatter.format(val, ...args)
  }

  <span class="hljs-comment">// 翻译函数</span>
  _translate (messages: Messages, <span class="hljs-attr">locale</span>: string, <span class="hljs-attr">fallback</span>: string, <span class="hljs-attr">key</span>: string, <span class="hljs-attr">args</span>: any): any {
    <span class="hljs-keyword">let</span> res: any = <span class="hljs-literal">null</span>
    <span class="hljs-comment">/**
     * messages[locale] 使用哪个语言包
     * key 语言映射表的key
     * args 映射替换关系
     */</span>
    res = <span class="hljs-keyword">this</span>._interpolate(messages[locale], key, args)
    <span class="hljs-keyword">if</span> (!isNull(res)) { <span class="hljs-keyword">return</span> res }

    res = <span class="hljs-keyword">this</span>._interpolate(messages[fallback], key, args)
    <span class="hljs-keyword">if</span> (!isNull(res)) {
      <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
        warn(<span class="hljs-string">`Fall back to translate the keypath '<span class="hljs-subst">${key}</span>' with '<span class="hljs-subst">${fallback}</span>' locale.`</span>)
      }
      <span class="hljs-keyword">return</span> res
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
    }
  }

  <span class="hljs-comment">// 翻译的核心函数</span>
  <span class="hljs-comment">/**
   * 这里的方法传入的参数参照mixin.js里面的定义的方法
   * key map的key值 (为接受的外部参数)
   * _locale 语言配置选项: 'zh-CN' | 'en-US' (内部变量)
   * messages 映射表 (内部变量)
   * host为这个i18n的实例 (内部变量)
   *
   */</span>
  _t (key: string, <span class="hljs-attr">_locale</span>: string, <span class="hljs-attr">messages</span>: Messages, <span class="hljs-attr">host</span>: any, ...args: any): any {
    <span class="hljs-keyword">if</span> (!key) { <span class="hljs-keyword">return</span> <span class="hljs-string">''</span> }
    
    <span class="hljs-comment">// parseArgs函数用以返回传入的局部语言配置, 及映射表</span>
    <span class="hljs-keyword">const</span> parsedArgs = parseArgs(...args)   <span class="hljs-comment">// 接收的参数{ locale, params(映射表) }</span>
    <span class="hljs-keyword">const</span> locale = parsedArgs.locale || _locale   <span class="hljs-comment">// 语言配置</span>
    
    <span class="hljs-comment">// 字符串替换</span>
    <span class="hljs-comment">/**
     * @params messages  语言包
     * @params locale  语言配置
     * @params fallbackLocale 缺省语言配置
     * @params key 替换的key值
     * @params parsedArgs.params 需要被替换的参数map表
     */</span>
    <span class="hljs-keyword">const</span> ret: any = <span class="hljs-keyword">this</span>._translate(messages, locale, <span class="hljs-keyword">this</span>.fallbackLocale, key, parsedArgs.params)
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._isFallbackRoot(ret)) {
      <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
        warn(<span class="hljs-string">`Fall back to translate the keypath '<span class="hljs-subst">${key}</span>' with root locale.`</span>)
      }
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._root) { <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'unexpected error'</span>) }
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._root.t(key, ...args)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._warnDefault(locale, key, ret, host)
    }
  }

  <span class="hljs-comment">// 转化函数</span>
  t (key: string, ...args: any): string {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._t(key, <span class="hljs-keyword">this</span>.locale, <span class="hljs-keyword">this</span>.messages, <span class="hljs-literal">null</span>, ...args)
  }

  _tc (key: string, <span class="hljs-attr">_locale</span>: string, <span class="hljs-attr">messages</span>: Messages, <span class="hljs-attr">host</span>: any, choice?: number, ...args: any): any {
    <span class="hljs-keyword">if</span> (!key) { <span class="hljs-keyword">return</span> <span class="hljs-string">''</span> }
    <span class="hljs-keyword">if</span> (choice !== <span class="hljs-literal">undefined</span>) {
      <span class="hljs-keyword">return</span> fetchChoice(<span class="hljs-keyword">this</span>._t(key, _locale, messages, host, ...args), choice)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._t(key, _locale, messages, host, ...args)
    }
  }

  tc (key: string, choice?: number, ...args: any): any {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._tc(key, <span class="hljs-keyword">this</span>.locale, <span class="hljs-keyword">this</span>.messages, <span class="hljs-literal">null</span>, choice, ...args)
  }

  _te (key: string, <span class="hljs-attr">_locale</span>: string, <span class="hljs-attr">messages</span>: Messages, ...args: any): boolean {
    <span class="hljs-keyword">const</span> locale = parseArgs(...args).locale || _locale
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._exist(messages[locale], key)
  }

  te (key: string, ...args: any): boolean {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._te(key, <span class="hljs-keyword">this</span>.locale, <span class="hljs-keyword">this</span>.messages, ...args)
  }
}

VueI18n.install = install
VueI18n.version = <span class="hljs-string">'__VERSION__'</span>

<span class="hljs-comment">// 如果是通过CDN或者外链的形式引入的Vue</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) {
  <span class="hljs-built_in">window</span>.Vue.use(VueI18n)
}
</code></pre>
<p>另外还有一个比较重要的库函数<code>format.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */

// 变量的替换, 在字符串模板中写的站位符 {xxx} 进行替换
const RE_NARGS: RegExp = /(%|)\{([0-9a-zA-Z_]+)\}/g

/**
 * template
 *
 * @param {String} string
 * @param {Array} ...args
 * @return {String}
 */

// 模板替换函数
export function template (str: string, ...args: any): string {
  // 如果第一个参数是一个obj
  if (args.length === 1 &amp;&amp; typeof args[0] === 'object') {
    args = args[0]
  } else {
    args = {}
  }

  if (!args || !args.hasOwnProperty) {
    args = {}
  }

  // str.prototype.replace(substr/regexp, newSubStr/function) 第二个参数如果是个函数的话，每次匹配都会调用这个函数
  // match 为匹配的子串
  return str.replace(RE_NARGS, (match, prefix, i, index) => {
    let result: string

    // match是匹配到的字符串
    // prefix ???
    // i 括号中需要替换的字符换
    // index是偏移量

    // 字符串中如果出现{xxx}不需要被替换。那么应该写成"{{"xxx"}}"
    if (str[index - 1] === '{' &amp;&amp;
      str[index + match.length] === '}') {
      return i
    } else {
      // 判断args obj是否包含这个key值
      // 返回替换值, 或者被匹配上的字符串的值
      result = hasOwn(args, i) ? args[i] : match
      if (isNull(result)) {
        return ''
      }

      return result
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 *  String format template
 *  - Inspired:
 *    https://github.com/Matt-Esch/string-template/index.js
 */</span>

<span class="hljs-comment">// 变量的替换, 在字符串模板中写的站位符 {xxx} 进行替换</span>
<span class="hljs-keyword">const</span> RE_NARGS: <span class="hljs-built_in">RegExp</span> = <span class="hljs-regexp">/(%|)\{([0-9a-zA-Z_]+)\}/g</span>

<span class="hljs-comment">/**
 * template
 *
 * @param {String} string
 * @param {Array} ...args
 * @return {String}
 */</span>

<span class="hljs-comment">// 模板替换函数</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">template</span> (<span class="hljs-params">str: string, ...args: any</span>): <span class="hljs-title">string</span> </span>{
  <span class="hljs-comment">// 如果第一个参数是一个obj</span>
  <span class="hljs-keyword">if</span> (args.length === <span class="hljs-number">1</span> &amp;&amp; <span class="hljs-keyword">typeof</span> args[<span class="hljs-number">0</span>] === <span class="hljs-string">'object'</span>) {
    args = args[<span class="hljs-number">0</span>]
  } <span class="hljs-keyword">else</span> {
    args = {}
  }

  <span class="hljs-keyword">if</span> (!args || !args.hasOwnProperty) {
    args = {}
  }

  <span class="hljs-comment">// str.prototype.replace(substr/regexp, newSubStr/function) 第二个参数如果是个函数的话，每次匹配都会调用这个函数</span>
  <span class="hljs-comment">// match 为匹配的子串</span>
  <span class="hljs-keyword">return</span> str.replace(RE_NARGS, (match, prefix, i, index) =&gt; {
    <span class="hljs-keyword">let</span> result: string

    <span class="hljs-comment">// match是匹配到的字符串</span>
    <span class="hljs-comment">// prefix ???</span>
    <span class="hljs-comment">// i 括号中需要替换的字符换</span>
    <span class="hljs-comment">// index是偏移量</span>

    <span class="hljs-comment">// 字符串中如果出现{xxx}不需要被替换。那么应该写成"{{"xxx"}}"</span>
    <span class="hljs-keyword">if</span> (str[index - <span class="hljs-number">1</span>] === <span class="hljs-string">'{'</span> &amp;&amp;
      str[index + match.length] === <span class="hljs-string">'}'</span>) {
      <span class="hljs-keyword">return</span> i
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 判断args obj是否包含这个key值</span>
      <span class="hljs-comment">// 返回替换值, 或者被匹配上的字符串的值</span>
      result = hasOwn(args, i) ? args[i] : match
      <span class="hljs-keyword">if</span> (isNull(result)) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>
      }

      <span class="hljs-keyword">return</span> result
    }
  })
}</code></pre>
<h2 id="articleHeader4">总结</h2>
<p>这个页面是使用<code>vue</code>作为前端框架，使用<code>vue-i18n</code>作为国际化的工具：</p>
<ul>
<li><p>和后端同学约定好语言标识字段</p></li>
<li><p>前端根据后端下发的语言标识字段来调用不同的语言包</p></li>
<li><p>文本内容使用<code>vue-i18n</code>进行替换</p></li>
<li><p>图片内容需要视觉同学提供多语言版本</p></li>
<li><p>样式需要根据多语言进行定制。比如在<code>body</code>上添加多语言的标识<code>class</code>属性</p></li>
<li><p>第三方的<code>SDK</code>或<code>插件</code>的国际化推动</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端国际化之Vue-i18n源码分析

## 原文链接
[https://segmentfault.com/a/1190000008752459](https://segmentfault.com/a/1190000008752459)

