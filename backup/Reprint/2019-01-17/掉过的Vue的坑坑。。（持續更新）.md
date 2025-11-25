---
title: '掉过的Vue的坑坑。。（持續更新）' 
date: 2019-01-17 2:30:25
hidden: true
slug: 3d77e5qq0w4
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>1. Cannot find module 'stylus'</strong></h2>
<p>報錯部分代碼：<br><span class="img-wrap"><img data-src="/img/bVLpzu?w=468&amp;h=84" src="https://static.alili.tech/img/bVLpzu?w=468&amp;h=84" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>控制台報錯：<br><span class="img-wrap"><img data-src="/img/bVLpzE?w=1092&amp;h=335" src="https://static.alili.tech/img/bVLpzE?w=1092&amp;h=335" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>CMD報錯：<br><span class="img-wrap"><img data-src="/img/bVLpAf?w=1012&amp;h=800" src="https://static.alili.tech/img/bVLpAf?w=1012&amp;h=800" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>原因是缺少了stylus-loader，需要install：<br>在CMD中輸入npm install stylus-loader stylus --save-dev：<br><span class="img-wrap"><img data-src="/img/bVLpBX?w=982&amp;h=255" src="https://static.alili.tech/img/bVLpBX?w=982&amp;h=255" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>Done!</p>
<h2 id="articleHeader1"><strong>2. Do not use 'new' for side effects</strong></h2>
<p>代碼如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
  router,
  <span class="hljs-attribute">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  <span class="hljs-attribute">components</span>: { App }
})
</code></pre>
<p>報錯：<br><span class="img-wrap"><img data-src="/img/bVLpDe?w=558&amp;h=234" src="https://static.alili.tech/img/bVLpDe?w=558&amp;h=234" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>原因：刪除了以下注釋。這句注釋可以繞過規則檢測：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* eslint-disable no-new */
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">/*</span> <span class="hljs-string">eslint-disable</span> <span class="hljs-literal">no</span><span class="hljs-bullet">-new</span> <span class="hljs-string">*/</span>
</code></pre>
<p>在new Vue()上方加上句注釋即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
  router,
  <span class="hljs-attribute">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  <span class="hljs-attribute">components</span>: { App }
})

</code></pre>
<h2 id="articleHeader2"><strong>3. Unknown custom element: &lt;router-link&gt; / Unknown custom element: &lt;router-view&gt;</strong></h2>
<p>ERROR：<br><span class="img-wrap"><img data-src="/img/bVLpJS?w=1075&amp;h=84" src="https://static.alili.tech/img/bVLpJS?w=1075&amp;h=84" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>原因：未將VueRouter注入Vue。加上以下代碼即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use(VueRouter)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>Vue.<span class="hljs-keyword">use</span>(VueRouter)
</code></pre>
<h2 id="articleHeader3"><strong>4. Cannot read property '_c' of undefined</strong></h2>
<p><span class="img-wrap"><img data-src="/img/bVLrSe?w=631&amp;h=165" src="https://static.alili.tech/img/bVLrSe?w=631&amp;h=165" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>代碼如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import Vue from 'vue'
import App from './App'
import hello from './components/hello/hello'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false

var router = new VueRouter({
  routes: [
    { path: '/hello', components: hello}
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> hello <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/hello/hello'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>

Vue.use(VueRouter)

Vue.config.productionTip = <span class="hljs-literal">false</span>

<span class="hljs-keyword">var</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/hello'</span>, <span class="hljs-attr">components</span>: hello}
  ]
})

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  router,
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  <span class="hljs-attr">components</span>: { App }
})
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- App.vue -->
<template>
  <div>
    <router-link to=&quot;/hello&quot;>點我點我</router-link>
    <router-view></router-view>
  </div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- App.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/hello"</span>&gt;</span>點我點我<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- hello.vue -->
<template>
    <div>
        Hello Vue.js!
    </div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- hello.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        Hello Vue.js!
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<p>其實這個錯誤還是查了挺久的。。後來，猛然發現，這是個低級錯誤，希望看到這裡的朋友不要打我。。。我把main.js里路由設置的component寫成components了。。所以在此提醒各位，引入的組件用的是components，而路由設置用的是component...應該是一個路由路徑對應一個組件。<br>  所以，main.js里的路由設置改為：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = new VueRouter({
  routes: [
    { path: '/hello', component: hello}
  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var router = <span class="hljs-keyword">new</span> VueRouter({
<span class="hljs-symbol">  routes:</span> [
    { <span class="hljs-string">path:</span> <span class="hljs-string">'/hello'</span>, <span class="hljs-string">component:</span> hello}
  ]
})
</code></pre>
<p>Done!</p>
<h2 id="articleHeader4"><strong>5.vue-resourse請求的數據格式問題</strong></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>
Vue.use(VueResource)

Vue.config.productionTip = <span class="hljs-keyword">false</span>

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.vue
const ERR_OK = 0
export default {
  data () {
    return {
      testData: {}
    }
  },
  created () {
    this.$http.get('/text').then((response) => {
      response = response.json()
      console.log(response)
      if (response.errno === ERR_OK) {
        this.testData = response.data
      }
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// App.vue</span>
const ERR_OK = <span class="hljs-number">0</span>
export <span class="hljs-keyword">default</span> {
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      testData: {}
    }
  },
  created () {
    <span class="hljs-keyword">this</span>.$http.<span class="hljs-keyword">get</span>(<span class="hljs-string">'/text'</span>).then((response) =&gt; {
      response = response.json()
      console.log(response)
      <span class="hljs-keyword">if</span> (response.errno === ERR_OK) {
        <span class="hljs-keyword">this</span>.testData = response.<span class="hljs-keyword">data</span>
      }
    })
  }
}</code></pre>
<p>控制台輸出結果如下，為Promise格式，而不是Object對象：<br><span class="img-wrap"><img data-src="/img/bVLHz1?w=357&amp;h=28" src="https://static.alili.tech/img/bVLHz1?w=357&amp;h=28" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>查閱官方文檔：<br><span class="img-wrap"><img data-src="/img/bVLHAP?w=614&amp;h=505" src="https://static.alili.tech/img/bVLHAP?w=614&amp;h=505" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>發現json()獲取到的數據類型是Promise，如果我們想獲得Object，可以選用body。於是將</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response = response.json()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">response</span> = response.json()</code></pre>
<p>修改為</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response = response.body
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">response</span> = response.body
</code></pre>
<p>輸出結果：<br><span class="img-wrap"><img data-src="/img/bVLHCf?w=234&amp;h=19" src="https://static.alili.tech/img/bVLHCf?w=234&amp;h=19" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br> Done！</p>
<h2 id="articleHeader5"><strong>6.使用外部stylus文件，要記得import。。。</strong></h2>
<p>我因為漏了這句話，查了半天沒發現錯誤TAT。。。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import './common/stylus/icon.styl'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'./common/stylus/icon.styl'</span>
</code></pre>
<h2 id="articleHeader6"><strong>7.Vue.js transition</strong></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name=&quot;fade&quot;></transition>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"fade"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
</code></pre>
<p>未完待續。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
掉过的Vue的坑坑。。（持續更新）

## 原文链接
[https://segmentfault.com/a/1190000008877673](https://segmentfault.com/a/1190000008877673)

