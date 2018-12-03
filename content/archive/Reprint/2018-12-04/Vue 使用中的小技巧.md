---
title: 'Vue 使用中的小技巧' 
date: 2018-12-04 2:30:05
hidden: true
slug: ortsscz23m
categories: [reprint]
---

{{< raw >}}

                    
<p>在vue的使用过程中会遇到各种场景，当普通使用时觉得没什么，但是或许优化一下可以更高效更优美的进行开发。下面有一些我在日常开发的时候用到的小技巧，在下将不定期更新~</p>
<h2>1. 多图表resize事件去中心化</h2>
<h3>1.1 一般情况</h3>
<p>有时候我们会遇到这样的场景，一个组件中有几个图表，在浏览器resize的时候我们希望图表也进行resize，因此我们会在父容器组件中写：</p>
<pre><code class="js">mounted() {
  setTimeout(() =&gt; window.onresize = () =&gt; {
    this.$refs.chart1.chartWrapperDom.resize()
    this.$refs.chart2.chartWrapperDom.resize()
    // ... 
  }, 200)
destroyed() { window.onresize = null }</code></pre>
<p>这样子图表组件如果跟父容器组件不在一个页面，子组件的状态就被放到父组件进行管理，为了维护方便，我们自然希望子组件的事件和状态由自己来维护，这样在添加删除组件的时候就不需要去父组件挨个修改</p>
<h3>1.2 优化</h3>
<p>这里使用了<a href="https://lodash.com/" rel="nofollow noreferrer">lodash</a>的节流throttle函数，也可以自己实现，这篇<a href="https://segmentfault.com/a/1190000014292298">文章</a>也有节流的实现可以参考一下。<br>以Echarts为例，在每个图表组件中：</p>
<pre><code class="js">computed: {
  /**
   * 图表DOM
   */
  chartWrapperDom() {
    const dom = document.getElementById('consume-analy-chart-wrapper')
    return dom &amp;&amp; Echarts.init(dom)
  },
  /**
   * 图表resize节流，这里使用了lodash，也可以自己使用setTimout实现节流
   */
  chartResize() {
    return _.throttle(() =&gt; this.chartWrapperDom &amp;&amp; this.chartWrapperDom.resize(), 400)
  }
},
mounted() {
  window.addEventListener('resize', this.chartResize)
},
destroyed() {
  window.removeEventListener('resize', this.chartResize)
}</code></pre>
<h3>1.3 再次优化</h3>
<p>感谢 @JserWang 的提醒，这里因为多个 chart 实例都使用同一套初始化逻辑，可以使用 extends 来考虑复用，因此我想到了 Vue 提供的 <a href="https://cn.vuejs.org/v2/guide/mixins.html#%E5%9F%BA%E7%A1%80" rel="nofollow noreferrer">Mixins</a>，所以我在这里做了点优化，可以让每个同类型的 chart 组件更优雅一点：<br>新建一个 mixin.js 文件：</p>
<pre><code class="js">import Echarts from 'echarts'
import _ from 'lodash'

export default {
  computed: {
    /* 图表DOM */
    $_chartMixin_chartWrapperDom() {
      const dom = document.getElementById(this.thisDomId)
      return dom &amp;&amp; Echarts.init(dom)
    },
    
    /** 图表resize节流，这里使用了lodash，也可以自己使用setTimout实现节流 */
    $_chartMixin_chartResize() {
      return _.throttle(() =&gt; this.$_chartMixin_chartWrapperDom.resize(), 400)
    }
  },
  
  methods: {
    /* 图表初始化 */
    $_chartMixin_initChart() {
      this.$_chartMixin_chartWrapperDom.setOption({ /* options */ }
  },
  
  mounted() {
    this.$_chartMixin_initChart()
    window.addEventListener('resize', this.$_chartMixin_chartResize)
  },
  
  destroyed() {
    window.removeEventListener('resize', this.$_chartMixin_chartResize)
  }
}</code></pre>
<p>然后在每个 chart 组件中：</p>
<pre><code class="js">&lt;script type='text/javascript'&gt;
import ChartMixin from './mixin'
export default {
  mixins: [ChartMixin],
  data() {
    return {
      thisDomId: 'consume-analy-chart-wrapper'
    }
  }
}
&lt;/script&gt;</code></pre>
<p>这样就可以在每个图表组件中混入之前在 <code>mixin.js</code> 中定义的 resize 事件逻辑，且自动初始化，并在 destroyed 的时候自动销毁事件~</p>
<h2>2. 全局过滤器注册</h2>
<h3>2.1 一般情况</h3>
<p>官方注册过滤器的方式：</p>
<pre><code class="js">export default {
  data () { return {} },
  filters:{
    orderBy (){
      // doSomething
    },
    uppercase () {
      // doSomething
    }
  }
}</code></pre>
<p>但是我们做项目来说，大部分的过滤器是要全局使用的，不会每每用到就在组件里面去写，抽成全局的会更好些。<br><a href="https://cn.vuejs.org/v2/api/#filters" rel="nofollow noreferrer">官方</a>注册全局的方式：</p>
<pre><code class="js">// 注册
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})
// getter，返回已注册的过滤器
var myFilter = Vue.filter('my-filter')</code></pre>
<p>但是分散写的话不美观，因此可以抽出成单独文件。</p>
<h3>2.2 优化</h3>
<p>我们可以抽出到独立文件，然后使用Object.keys在main.js入口统一注册</p>
<p>/src/common/filters.js</p>
<pre><code class="js">let dateServer = value =&gt; value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') 

export { dateServer }</code></pre>
<p>/src/main.js</p>
<pre><code class="js">import * as custom from './common/filters/custom'
Object.keys(custom).forEach(key =&gt; Vue.filter(key, custom[key]))</code></pre>
<p>然后在其他的.vue 文件中就可愉快地使用这些我们定义好的全局过滤器了</p>
<pre><code class="html">&lt;template&gt;
  &lt;section class="content"&gt;
    &lt;p&gt;"{{" time | dateServer "}}"&lt;/p&gt; &lt;!-- 2016-01-01 --&gt;
  &lt;/section&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data () {
      return {
        time: 20160101
      }
    }
  }
&lt;/script&gt;</code></pre>
<h2>3. 全局组件注册</h2>
<h3>3.1 一般情况</h3>
<p>需要使用组件的场景：</p>
<pre><code class="html">&lt;template&gt;
    &lt;BaseInput  v-model="searchText"  @keydown.enter="search"/&gt;
    &lt;BaseButton @click="search"&gt;
        &lt;BaseIcon name="search"/&gt;
    &lt;/BaseButton&gt;
&lt;/template&gt;
&lt;script&gt;
    import BaseButton from './baseButton'
    import BaseIcon from './baseIcon'
    import BaseInput from './baseInput'
    export default {
      components: { BaseButton, BaseIcon, BaseInput }
    }
&lt;/script&gt;</code></pre>
<p>我们写了一堆基础UI组件，然后每次我们需要使用这些组件的时候，都得先import，然后声明components，很繁琐，这里可以使用统一注册的形式</p>
<h3>3.2 优化</h3>
<p>我们需要借助一下神器webpack，使用 <a href="https://doc.webpack-china.org/guides/dependency-management/#require-context" rel="nofollow noreferrer"><code>require.context()</code></a> 方法来创建自己的<strong>模块</strong>上下文，从而实现自动动态require组件。这个方法需要3个参数：要搜索的文件夹目录、是否还应该搜索它的子目录、以及一个匹配文件的正则表达式。<br>我们在components文件夹添加一个叫componentRegister.js的文件，在这个文件里借助webpack动态将需要的基础组件统统打包进来。</p>
<p>/src/components/componentRegister.js</p>
<pre><code class="js">import Vue from 'vue'

/**
 * 首字母大写
 * @param str 字符串
 * @example heheHaha
 * @return {string} HeheHaha
 */
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 对符合'xx/xx.vue'组件格式的组件取组件名
 * @param str fileName
 * @example abc/bcd/def/basicTable.vue
 * @return {string} BasicTable
 */
function validateFileName(str) {
  return /^\S+\.vue$/.test(str) &amp;&amp;
    str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) =&gt; capitalizeFirstLetter($1))
}

const requireComponent = require.context('./', true, /\.vue$/)

// 找到组件文件夹下以.vue命名的文件，如果文件名为index，那么取组件中的name作为注册的组件名
requireComponent.keys().forEach(filePath =&gt; {
  const componentConfig = requireComponent(filePath)
  const fileName = validateFileName(filePath)
  const componentName = fileName.toLowerCase() === 'index'
    ? capitalizeFirstLetter(componentConfig.default.name)
    : fileName
  Vue.component(componentName, componentConfig.default || componentConfig)
})</code></pre>
<p>这里文件夹结构：</p>
<pre><code class="bash">components
│ componentRegister.js
├─BasicTable
│ BasicTable.vue
├─MultiCondition
│ index.vue</code></pre>
<p>这里对组件名做了判断，如果是index的话就取组件中的name属性处理后作为注册组件名，所以最后注册的组件为：<code>multi-condition</code>、<code>basic-table</code><br>最后我们在main.js中import 'components/componentRegister.js'，然后我们就可以随时随地使用这些基础组件，无需手动引入了~</p>
<h2>4. 不同路由的组件复用</h2>
<h3>4.1 场景还原</h3>
<p>当某个场景中vue-router从/post-page/a，跳转到/post-page/b。然后我们惊人的发现，页面跳转后数据竟然没更新？！原因是vue-router"智能地"发现这是同一个组件，然后它就决定要复用这个组件，所以你在created函数里写的方法压根就没执行。通常的解决方案是监听$route的变化来初始化数据，如下：</p>
<pre><code class="js">data() {
  return {
    loading: false,
    error: null,
    post: null
  }
},
watch: {
  '$route': {        // 使用watch来监控是否是同一个路由
    handler: 'resetData',
    immediate: true
  }
},
methods: {
  resetData() {
    this.loading = false
    this.error = null
    this.post = null
    this.getPost(this.$route.params.id)
  },
  getPost(id){ }
}</code></pre>
<h3>4.2 优化</h3>
<p>为了实现这样的效果可以给<code>router-view</code>添加一个不同的key，这样即使是公用组件，只要url变化了，就一定会重新创建这个组件。</p>
<pre><code class="html">&lt;router-view :key="$route.fullpath"&gt;&lt;/router-view&gt;</code></pre>
<p>还可以在其后加<code>+ +new Date()</code>时间戳，保证独一无二</p>
<p>感谢网友 @rolitter 的提醒，如果组件被放在<code>&lt;keep-alive&gt;</code>中的话，可以把获取新数据的方法放在activated钩子，代替原来在created、mounted钩子中获取数据的任务。</p>
<h2>5. 组件事件属性穿透</h2>
<h3>5.1 一般情况</h3>
<pre><code class="html">// 父组件
&lt;BaseInput :value="value"
           label="密码"
           placeholder="请填写密码"
           @input="handleInput"
           @focus="handleFocus"&gt;
&lt;/BaseInput&gt;

// 子组件
&lt;template&gt;
  &lt;label&gt;
    "{{" label "}}"
    &lt;input :value=" value"
           :placeholder="placeholder"
           @focus="$emit('focus', $event)"
           @input="$emit('input', $event.target.value)"&gt;
  &lt;/label&gt;
&lt;/template&gt;</code></pre>
<h3>5.2 优化</h3>
<p>vue的组件实例中的<code>$props</code>、<code>$attrs</code>给我们提供了很大的便利，特别是父子组件传值的时候。<br>1、 每一个从父组件传到子组件的props,我们都得在子组件的Props中显式的声明才能使用。这样一来，我们的子组件每次都需要申明一大堆props，这里我们知道<a href="https://cn.vuejs.org/v2/api/index.html#v-bind" rel="nofollow noreferrer">v-bind 是可以传对象</a>的，可以在 <a href="https://cn.vuejs.org/v2/api/index.html#vm-props" rel="nofollow noreferrer"><code>vm.$props</code></a> 中拿到所有父组件props的值 <code>v-bind="$props"</code></p>
<pre><code class="html">&lt;input  v-bind="$props" 
       @input="$emit('input', $event.target.value)"&gt;</code></pre>
<p>2、 类似placeholer这种dom原生的property可以使用<a href="https://cn.vuejs.org/v2/api/#vm-attrs" rel="nofollow noreferrer"><code>$attrs</code></a>直接从父传到子，无需声明。方法如下：</p>
<pre><code class="html">&lt;input :value="value"
       v-bind="$attrs"
       @input="$emit('input', $event.target.value)"&gt;</code></pre>
<p><code>$attrs</code>包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定，并且可以通过 <code>v-bind="$attrs"</code> 传入内部组件。</p>
<p>3、 注意到子组件的<code>@focus="$emit('focus', $event)"</code>其实什么都没做，只是把event传回给父组件而已，那其实和上面类似，完全没必要显式地申明：</p>
<pre><code class="js">&lt;input :value="value"
       v-bind="$attrs"
       v-on="listeners"/&gt;

computed: {
  listeners() {
    return {
      ...this.$listeners,
      input: event =&gt;
        this.$emit('input', event.target.value)
    }
  }
}</code></pre>
<p><a href="https://cn.vuejs.org/v2/api/#vm-listeners" rel="nofollow noreferrer"><code>$listeners</code></a>包含了父作用域中的 (不含 .native 修饰器的) <a href="https://cn.vuejs.org/v2/api/#v-on" rel="nofollow noreferrer">v-on</a> 事件监听器。它可以通过 <code>v-on="$listeners"</code> 传入内部组件——在创建更高层次的组件时非常有用。</p>
<p>需要注意的是，由于我们input并不是BaseInput这个组件的根节点，而默认情况下父作用域的不被认作 <code>props</code> 的特性绑定将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。所以我们需要设置 <a href="https://cn.vuejs.org/v2/api/#inheritAttrs" rel="nofollow noreferrer"><code>inheritAttrs: false</code></a>，这些默认行为将会被去掉，上面优化才能成功。</p>
<h2>6. 路由根据开发状态懒加载</h2>
<h3>6.1 一般情况</h3>
<p>一般我们在路由中加载组件的时候：</p>
<pre><code class="js">import Login from '@/views/login.vue'

export default new Router({
  routes: [{ path: '/login', name: '登陆', component: Login}]
})</code></pre>
<p>当你需要懒加载 lazy-loading 的时候，需要一个个把routes的component改为<code>() =&gt; import('@/views/login.vue')</code>，甚为麻烦。</p>
<p>当你的项目页面越来越多之后，在开发环境之中使用 lazy-loading 会变得不太合适，每次更改代码触发热更新都会变得非常的慢。所以建议只在生成环境之中使用路由懒加载功能。</p>
<h3>6.2 优化</h3>
<p>根据Vue的<a href="https://cn.vuejs.org/v2/guide/components.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6" rel="nofollow noreferrer">异步组件</a>和Webpack的<a href="https://doc.webpack-china.org/guides/code-splitting" rel="nofollow noreferrer">代码分割功能</a>可以轻松实现组件的懒加载，如：</p>
<pre><code class="js">const Foo = () =&gt; import('./Foo.vue')</code></pre>
<p>在区分开发环境与生产环境时，可以在路由文件夹下分别新建两个文件：</p>
<p><code>_import_production.js</code></p>
<pre><code class="js">module.exports = file =&gt; () =&gt; import('@/views/' + file + '.vue')</code></pre>
<p><code>_import_development.js</code> (这种写法<code>vue-loader</code>版本至少v13.0.0以上)</p>
<pre><code class="js">module.exports = file =&gt; require('@/views/' + file + '.vue').default</code></pre>
<p>而在设置路由的<code>router/index.js</code>文件中：</p>
<pre><code class="js">const _import = require('./_import_' + process.env.NODE_ENV)

export default new Router({
  routes: [{ path: '/login', name: '登陆', component: _import('login/index') }]
})</code></pre>
<p>这样组件在开发环境下就是非懒加载，生产环境下就是懒加载的了</p>
<h2>7 vue-loader小技巧</h2>
<p><a href="https://vue-loader.vuejs.org/zh-cn/" rel="nofollow noreferrer">vue-loader</a> 是处理 *.vue 文件的 webpack loader。它本身提供了丰富的 API，有些 API 很实用但很少被人熟知。例如接下来要介绍的 <a href="https://vue-loader.vuejs.org/zh-cn/options.html#preservewhitespace" rel="nofollow noreferrer"><code>preserveWhitespace</code></a> 和 <a href="https://vue-loader.vuejs.org/zh-cn/options.html#transformtorequire" rel="nofollow noreferrer"><code>transformToRequire</code></a></p>
<h3>7.1 用 <code>preserveWhitespace</code> 减少文件体积</h3>
<p>有些时候我们在写模板时不想让元素和元素之间有空格，可能会写成这样：</p>
<pre><code class="html">&lt;ul&gt;
  &lt;li&gt;1111&lt;/li&gt;&lt;li&gt;2222&lt;/li&gt;&lt;li&gt;333&lt;/li&gt;
&lt;/ul&gt;</code></pre>
<p>当然还有其他方式，比如设置字体的<code>font-size: 0</code>，然后给需要的内容单独设置字体大小，目的是为了去掉元素间的空格。其实我们完全可以通过配置 vue-loader 实现这一需求。</p>
<pre><code class="js">{
  vue: {
    preserveWhitespace: false
  }
}</code></pre>
<p>它的作用是阻止元素间生成空白内容，在 Vue 模板编译后使用 <code>_v(" ")</code> 表示。如果项目中模板内容多的话，它们还是会占用一些文件体积的。例如 Element 配置该属性后，未压缩情况下文件体积减少了近 30Kb。</p>
<h3>7.2 使用 <code>transformToRequire</code> 再也不用把图片写成变量了</h3>
<p>以前在写 Vue 的时候经常会写到这样的代码：把图片提前 require 传给一个变量再传给组件。</p>
<pre><code class="html">&lt;template&gt;
  &lt;div&gt;
    &lt;avatar :default-src="DEFAULT_AVATAR"&gt;&lt;/avatar&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    created () {
      this.DEFAULT_AVATAR = require('./assets/default-avatar.png')
    }
  }
&lt;/script&gt;</code></pre>
<p>其实通过配置 <code>transformToRequire</code> 后，就可以直接配置，这样vue-loader会把对应的属性自动 require 之后传给组件</p>
<pre><code class="js">{
  vue: {
    transformToRequire: {
      avatar: ['default-src']
    }
  }
}</code></pre>
<p>于是我们代码就可以简化不少</p>
<pre><code class="html">&lt;template&gt;
  &lt;div&gt;
    &lt;avatar default-src="./assets/default-avatar.png"&gt;&lt;/avatar&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
<p>在 vue-cli 的 webpack 模板下，默认配置是：</p>
<pre><code class="js">transformToRequire: {
  video: ['src', 'poster'],
  source: 'src',
  img: 'src',
  image: 'xlink:href'
}</code></pre>
<p>可以举一反三进行一下类似的配置</p>
<p>vue-loader 还有很多实用的 API 例如最近加入的 <a href="https://vue-loader.vuejs.org/zh-cn/configurations/custom-blocks.html" rel="nofollow noreferrer">自定义块</a>，感兴趣的各位可以去文档里找找看。</p>
<h2>8. render 函数</h2>
<p>在某些场景下你可能需要 <a href="https://cn.vuejs.org/v2/guide/render-function.html" rel="nofollow noreferrer">render 渲染函数</a>带来的完全编程能力来解决不太容易解决的问题，特别是要动态选择生成标签和组件类型的场景。</p>
<h3>8.1 动态标签</h3>
<h4>1. 一般情况</h4>
<p>比如根据props来生成标签的场景</p>
<pre><code class="html">&lt;template&gt;
  &lt;div&gt;
    &lt;div v-if="level === 1"&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/div&gt;
    &lt;p v-else-if="level === 2"&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/p&gt;
    &lt;h1 v-else-if="level === 3"&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/h1&gt;
    &lt;h2 v-else-if="level === 4"&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/h2&gt;
    &lt;strong v-else-if="level === 5"&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/stong&gt;
    &lt;textarea v-else-if="level === 6"&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/textarea&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
<p>其中level是data中的变量，可以看到这里有大量重复代码，如果逻辑复杂点，加上一些绑定和判断就更复杂了，这里可以利用 render 函数来对要生成的标签加以判断。</p>
<h4>2. 优化</h4>
<p>使用 render 方法根据参数来生成对应标签可以避免上面的情况。</p>
<pre><code class="html">&lt;template&gt;
  &lt;div&gt;
    &lt;child :level="level"&gt;Hello world!&lt;/child&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script type='text/javascript'&gt;
  import Vue from 'vue'
  Vue.component('child', {
    render(h) {
      const tag = ['div', 'p', 'strong', 'h1', 'h2', 'textarea'][this.level]
      return h(tag, this.$slots.default)
    },
    props: {
      level: {  type: Number,  required: true  } 
    }
  })   
  export default {
    name: 'hehe',
    data() { return { level: 3 } }
  }
&lt;/script&gt;</code></pre>
<p>示例可以查看 <a href="https://codepen.io/SHERlocked93/pen/mLEJPE" rel="nofollow noreferrer">CodePen</a></p>
<h3>8.2 动态组件</h3>
<p>当然render函数还有很多用法，比如要使用动态组件，除了使用 <code>:is</code> 之外也可以使用render函数</p>
<pre><code class="html">&lt;template&gt;
  &lt;div&gt;
    &lt;button @click='level = 0'&gt;嘻嘻&lt;/button&gt;
    &lt;button @click='level = 1'&gt;哈哈&lt;/button&gt;
    &lt;hr&gt;
    &lt;child :level="level"&gt;&lt;/child&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script type='text/javascript'&gt;
  import Vue from 'vue'
  import Xixi from './Xixi'
  import Haha from './Haha'
  Vue.component('child', {
    render(h) {
      const tag = ['xixi', 'haha'][this.level]
      return h(tag, this.$slots.default)
    },
    props: { level: { type: Number, required: true } },
    components: { Xixi, Haha }
  })
  export default {
    name: 'hehe',
    data() { return { level: 0 } }
  }
&lt;/script&gt;</code></pre>
<p>示例可以查看 <a href="https://codepen.io/SHERlocked93/pen/YLWwxM" rel="nofollow noreferrer">CodePen</a></p>
<hr>
<p>@20180702 添加 @JserWang 提醒的多图标事件去中心化优化方法</p>
<hr>
<p>网上的帖子大多深浅不一，甚至有些前后矛盾，在下的文章都是学习过程中的总结，如果发现错误，欢迎留言指出~</p>
<blockquote>参考：<br><a href="http://www.cnblogs.com/xiterjia/p/6701324.html" rel="nofollow noreferrer">Vue2 全局过滤器（vue-cli）</a><br><a href="https://segmentfault.com/a/1190000014085613">Vue.js最佳实践</a><br><a href="https://doc.webpack-china.org/guides/dependency-management/#require-context" rel="nofollow noreferrer">webpack文档 - require.context</a><br><a href="https://github.com/wuchangming/blog/blob/master/docs/webpack/require-context-usage.md" rel="nofollow noreferrer">使用webpack的require.context实现路由“去中心化”管理 </a><br><a href="https://panjiachen.github.io/vue-element-admin-site/#/zh-cn/lazy-loading" rel="nofollow noreferrer">vue-element-admin 文档</a><br><a href="https://zhuanlan.zhihu.com/p/25589193" rel="nofollow noreferrer">Vue.js 的实用技巧</a><br><a href="https://juejin.im/post/5afd6a88f265da0b9127a879" rel="nofollow noreferrer">优化页面的打开速度，要不要了解一下~</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 使用中的小技巧

## 原文链接
[https://segmentfault.com/a/1190000014527768](https://segmentfault.com/a/1190000014527768)

