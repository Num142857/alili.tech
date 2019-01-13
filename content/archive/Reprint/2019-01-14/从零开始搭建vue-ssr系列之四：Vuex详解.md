---
title: '从零开始搭建vue-ssr系列之四：Vuex详解' 
date: 2019-01-14 2:30:07
hidden: true
slug: jo63eaaf0gk
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>为什么要单独增加Vuex？</blockquote>
<ul><li>因为Vuex里面涉及很多概念性的东西，一时之间弄不懂，当时我在项目中集成Vuex时查了很多资料，踩了不少的坑。如果刚开始接触Vuex，你肯定会从官方文档看起，官方给的例子，就是加一减一的例子，你会发现，Vuex好复杂啊，本来可以一步完成的事，为什么要那么多步，而且还搞不清楚每步和每步是什么关系，蒙了。而且他的例子只针对简单的业务场景，对于生产环境（多component的环境），发现根本就是适用，下面让我来一一道来</li></ul>
<blockquote>Vuex解决了什么问题？</blockquote>
<ul><li>刚开始上项目时，我也没打算用Vuex，因为感觉那玩意没啥用，太复杂。后来一边做，一边就发现一个比较难解决的问题：<strong>兄弟组件间通信的问题</strong>！</li></ul>
<blockquote>如果不用Vuex，怎么做？</blockquote>
<ul><li>我相信，不用Vuex也可以解决，解决方案是：Root组件做为中转站，兄弟组件1向Root组件$broadcast，Root组件收到之后，再$dispatch，兄弟组件2从Root组件拿到数据，然后做业务处理，数据从树根到树顶，再到树根。</li></ul>
<blockquote>这样会带来什么问题？</blockquote>
<ul>
<li>可维护性会下降，你要想修改数据，你得维护三个地方</li>
<li>可读性会下降，因为一个组件里的数据，你根本就看不出来是从哪来的</li>
<li>增加耦合，大量的上传派发，会让耦合性大大的增加，本来Vue用Component就是为了减少耦合，现在这么用，和组件化的初衷相背。</li>
</ul>
<blockquote>是所有项目都用Vuex么？</blockquote>
<ul><li>
<strong>凡是兄弟组件有大量通信的，建议一定要用</strong>，不管大项目和小项目，因为这样会省很多事。</li></ul>
<blockquote>从哪里开始？</blockquote>
<ul><li>在这里咱们先不谈Vuex的里面的几个概念，想看，官方上有，刚上来就提这么，效果也不好。咱们先从一个简单的实例开始。</li></ul>
<blockquote>什么例子？</blockquote>
<ul><li>咱们假设在A.vue里面通过Ajax取来数据，然后做展示，这个简单吧，咱们用Vuex来看看怎么搞。如果不用Vuex，我们取完数据会放到Data里面，然后拿到数据做v-for渲染，像这样</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
mounted() {
    Vue.axios.get('http://localhost:5000/data').then((response) => {
        const list = response.data.data.liveWodList
        this.newList = list
    })
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>...
<span class="hljs-function"><span class="hljs-title">mounted</span><span class="hljs-params">()</span></span> {
    Vue<span class="hljs-selector-class">.axios</span><span class="hljs-selector-class">.get</span>(<span class="hljs-string">'http://localhost:5000/data'</span>).then((response) =&gt; {
        const list = response<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.liveWodList</span>
        this<span class="hljs-selector-class">.newList</span> = list
    })
}
...</code></pre>
<blockquote>如果用Vuex呢？</blockquote>
<ul><li>显然他不在你的A.vue里面，所以你得告诉他，来数据了，快收一下，怎么通知呢，这就涉及到Vuex的第一个操作：<code>commit</code>。这里这个操作，对应Vuex的核心概念之一：<code>Mutations（变化）</code>！他的作用就是<strong>通知Vuex要搞事情了</strong>，比如删除数据、增加数据等，代码是这样的<code>this.$store.commit('setData', list)</code>，这个有两个参数，第一个参数是要搞的事情，第二个参数是具体的数据。</li></ul>
<blockquote>数据存哪了？</blockquote>
<ul><li>你的数据是来了，我得有地来接收数据吧，接收数据的地对应Vuex的核心概念之二<code>State（状态）</code>，就是所有需要变化的东西都存在我这。代码是这样的：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setData(state, data) {
    state.list = data
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>function <span class="hljs-built_in">set</span>Data(<span class="hljs-keyword">state</span>, data) {
    <span class="hljs-keyword">state</span>.list = data
}</code></pre>
<blockquote>怎么拿到数据？</blockquote>
<ul><li>有放肯定有取啊，数据存在<code>State</code>，取也是从这里取。取数据就对应Vuex的核心概念之三<code>Getters</code>，代码是这样的的：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getters = {
    list: state => state.list
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const getters = {
    list: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.list
}</code></pre>
<blockquote>目录结构</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store
|____modules
| |____list.js
|____mutation-types.js
|____store_index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>store
|<span class="hljs-string">____modules
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">____list.js
</span>|<span class="hljs-string">____mutation-types.js
</span>|<span class="hljs-string">____store_index.js</span></code></pre>
<ul><li>这是在原目录的基础上增加的目录，<a href="https://github.com/sunhaikuo/vue-ssr-1" rel="nofollow noreferrer" target="_blank">原项目的地址</a>。</li></ul>
<blockquote>这个目录结构有什么好处？</blockquote>
<ul><li>这是Vuex在真正项目中用到的，分模块，每个模块一个文件（modules），首先我们看下<code>store/mutation-types.js</code>。这个文件的结构比较简单，代码如下：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const LIST = {
    GET_DATA: 'getData',
    ADD_DATA: 'addData'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> LIST = {
    GET_DATA: <span class="hljs-string">'getData'</span>,
    ADD_DATA: <span class="hljs-string">'addData'</span>
}</code></pre>
<ul>
<li>功能是：<strong>定义常量</strong>。常量的作用不用细说，防止手写写错。实际开发中，应该是每一个模块一个常量，现在只有一个<code>LIST</code>，未来可能会多增加<code>NEWS</code>/<code>USER</code>等，也是一个模块，一个常量对象。</li>
<li>再看<code>modules/list.js</code>，代码如下：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {
    LIST
} from '../mutation-types'

const state = {
    list: []
}

const mutations = {
    [LIST.GET_DATA](state, data) {
        state.list = data
    }
}
const getters = {
    list: state => state.list
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import {
    LIST
} <span class="hljs-keyword">from</span> '../mutation-types'

const <span class="hljs-keyword">state</span> = {
    list: []
}

const mutations = {
    [LIST.GET_DATA](<span class="hljs-keyword">state</span>, data) {
        <span class="hljs-keyword">state</span>.list = data
    }
}
const getters = {
    list: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.list
}</code></pre>
<ul>
<li>这里面就有对应的三个概念<code>state/mutations/getters</code>，可以和我上面说的对比一下，现在看代码，应该很清晰了。注意：里面有很多ES6的语法，不明白的可以查一查。</li>
<li>
<code>store/store-index.js</code>为入口文件，里面主要是引入各配置，供Vue使用。注意：这个文件的引入是在<code>src/index.js</code>里面！</li>
</ul>
<blockquote>流程图</blockquote>
<ul><li></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVNPgT?w=1476&amp;h=902" src="https://static.alili.tech/img/bVNPgT?w=1476&amp;h=902" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote>好像还缺一个？</blockquote>
<ul><li>对，还缺一个<code>Action</code>，为什么没提这个Action，按我的理解，<code>Action</code>这一层应该是在多个操作中有价值，比如有一个预约按钮，点击之后，会更新几个Component的状态。现实开发中，基本上都是点击按钮，触发一个事件，那增加<code>Action</code>就会增加整个流程的链路，增加复杂度。</li></ul>
<p><a href="https://github.com/sunhaikuo/vue-ssr-2" rel="nofollow noreferrer" target="_blank">码上点我（Github）</a></p>
<hr>
<blockquote>Vue-SSR系列目录</blockquote>
<p><a href="https://segmentfault.com/a/1190000009352740">从零开始搭建vue-ssr系列之一：写在前面的话</a></p>
<p><a href="https://segmentfault.com/a/1190000009372772" target="_blank">从零开始搭建vue-ssr系列之二：纯client端渲染以及webpack2+vue2注意事项</a></p>
<p><a href="https://segmentfault.com/a/1190000009373793">从零开始搭建vue-ssr系列之三：服务器渲染的奥秘</a></p>
<p><a href="https://segmentfault.com/a/1190000009452832" target="_blank">从零开始搭建vue-ssr系列之四：Vuex详解</a></p>
<p><a href="https://segmentfault.com/a/1190000009510509">从零开始搭建vue-ssr系列之五：开始第一个简单的server-render</a></p>
<p><a href="https://segmentfault.com/a/1190000009554693" target="_blank">从零开始搭建vue-ssr系列之六：一个完整的项目</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始搭建vue-ssr系列之四：Vuex详解

## 原文链接
[https://segmentfault.com/a/1190000009452832](https://segmentfault.com/a/1190000009452832)

