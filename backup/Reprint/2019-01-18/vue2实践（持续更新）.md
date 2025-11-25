---
title: 'vue2实践（持续更新）' 
date: 2019-01-18 2:30:35
hidden: true
slug: 3vkuws8wov4
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>记录一些小技巧和踩过的坑</strong></p>
<p><em>由于本篇文章内容太多，导致SF编辑器有点卡，所以新开辟了一篇 <a href="https://segmentfault.com/a/1190000009689627">vue2实践（二）</a>，后续再这里更新。</em></p>
<h3 id="articleHeader0">1. props 带不带冒号的区别</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <child1 ref=&quot;child1&quot; msg=&quot;{name:'bill'}&quot;></child1>
 
 <child1 ref=&quot;child1&quot; :msg=&quot;{name:'bill'}&quot;></child1>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">child1</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"child1"</span> <span class="hljs-attr">msg</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{name:'bill'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child1</span>&gt;</span>
 
 <span class="hljs-tag">&lt;<span class="hljs-name">child1</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"child1"</span> <span class="hljs-attr">:msg</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{name:'bill'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child1</span>&gt;</span></span></code></pre>
<p>首先冒号是v-bind的缩写，不带冒号后面是字符串，带了冒号就是数据绑定，引号里面的内容是变量或者表达式,          <br> 组件内不能修改props的值，同时修改的值也不会同步到组件外层，即调用组件方不知道组件内部当前的状态是什么</p>
<blockquote><p><a href="http://www.oschina.net/question/2606192_2197709?fromerr=BwzrcBZ7" rel="nofollow noreferrer" target="_blank">vue 组件props传递时，为什么有时候需要加冒号，有时候不需要？</a><br><a href="http://www.cnblogs.com/xxcanghai/p/6124699.html?_t=t#undefined" rel="nofollow noreferrer" target="_blank">如何在Vue2中实现组件props双向绑定</a></p></blockquote>
<h3 id="articleHeader1">2. computed属性，可以set，但是设置的是data返回的数据，不能设置自身。</h3>
<p>如果计算属性是对象的话，可以设置他的属性。</p>
<h3 id="articleHeader2">3. 组件的生命周期函数是在template标签里的数据发生变化时候触发update</h3>
<p>数据可能更新了，但是没有绑定到dom上面的话，不会调用update钩子函数。</p>
<h3 id="articleHeader3">4. 给变data的第二季属性的值，data不会更新，导致组件不会更新</h3>
<p>所以在这个时候应该用Object.assign()重新生成新的对象。第一级属性值更新的话，data是更新的！</p>
<h3 id="articleHeader4">5. 动态绑定style的话，后面的样式值不能加分号</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  style = {
              color: &quot;rgb(66, 180, 232)&quot;
       };
  //下面渲染不出来
    style = {
              color: &quot;rgb(66, 180, 232)&quot;;
       };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>  <span class="hljs-built_in">style</span> = {
              <span class="hljs-built_in">color</span>: <span class="hljs-string">"rgb(66, 180, 232)"</span>
       };
  //下面渲染不出来
    <span class="hljs-built_in">style</span> = {
              <span class="hljs-built_in">color</span>: <span class="hljs-string">"rgb(66, 180, 232)"</span>;
       };</code></pre>
<h3 id="articleHeader5">6. filter 过滤器</h3>
<p>vue2.0 的时候把过滤器移除了，现在2.10又加了上去，</p>
<p>定义filter过滤器：<br>写在实例Vue内部的是局部过滤器，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  filters:{
  formatMoney: function (value){
      return &quot;$&quot;+value.toFixed(2);
   }
 }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">filters</span>:{
  formatMoney: function (value){
      return <span class="hljs-string">"$"</span>+value.<span class="hljs-built_in">toFixed</span>(2);
   }
 }
})</code></pre>
<p>写在外部的是全局过滤器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.filter(&quot;money&quot;, function (vaule, type) {
    return &quot;￥&quot; + vaule.toFixed(2) + type;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>Vue.filter(<span class="hljs-string">"money"</span>, <span class="hljs-keyword">function</span> (vaule, <span class="hljs-class"><span class="hljs-keyword">type</span>) {</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">"￥"</span> + vaule.toFixed(<span class="hljs-number">2</span>) + <span class="hljs-class"><span class="hljs-keyword">type</span>;</span>
})</code></pre>
<p>组件内调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span v-text=&quot;message | wrap 'before' 'after'&quot;></span>//1.x的写法，2直接wrap('before','after')调用
Vue.filter('wrap', function (value, begin, end) {
  return begin + value + end
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>&lt;span v-text=<span class="hljs-string">"message | wrap 'before' 'after'"</span>&gt;&lt;/span&gt;//<span class="hljs-number">1</span>.x的写法，<span class="hljs-number">2</span>直接wrap(<span class="hljs-symbol">'before</span><span class="hljs-string">','</span>after')调用
Vue.filter(<span class="hljs-symbol">'wrap</span>', <span class="hljs-keyword">function</span> <span class="hljs-title"></span>(value, begin, end) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">begin</span> + value + <span class="hljs-keyword">end</span>
})</code></pre>
<p>补充下：一个竖线 | 在js中是二进制运算</p>
<blockquote><p><a href="https://segmentfault.com/q/1010000007660864">想问一下这个用竖线分隔开是什么意思</a></p></blockquote>
<h3 id="articleHeader6">7. watch监测对象或者数组，不是替换对象或者数组，newVal和oldVal是同一个值。</h3>
<p>注意：在变异（不是替换）对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本。</p>
<blockquote><p><a href="https://vuefe.cn/v2/api/#vm-watch" rel="nofollow noreferrer" target="_blank">vm.$watch</a></p></blockquote>
<h3 id="articleHeader7">8. 为组件绑定原生事件</h3>
<p>有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 .native 修饰 v-on 。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-component v-on:click.native=&quot;doTheThing&quot;></my-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">my</span>-component v-<span class="hljs-keyword">on</span>:click.native=<span class="hljs-string">"doTheThing"</span>&gt;&lt;/<span class="hljs-keyword">my</span>-component&gt;</code></pre>
<h3 id="articleHeader8">9. 2.1.6computed在beforeMount前面执行的，vue2.2.1刚好相反</h3>
<h3 id="articleHeader9">10. v-for和v-if在同一个标签使用的话，v-for的优先级高于v-if</h3>
<p>如果在同一标签使用，v-if就是用来过滤v-for里面的数据的，先走if的话用template套在外面</p>
<p>今天并列使用的时候遇到的巨坑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<topic v-for=&quot;(topic,idx) in topics&quot; :model=&quot;topic&quot; :showIdx=&quot;false&quot; :clickHandler=&quot;handleTopicClick&quot;  v-if=&quot;mode==0&quot;/>
<school-topic v-for=&quot;t in topics&quot; :model=&quot;t&quot; :style=&quot;showStyle(t)&quot; :clickHandler=&quot;handleTopicClick&quot; v-else />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>&lt;topic v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(topic,idx) in topics"</span> <span class="hljs-symbol">:model=<span class="hljs-string">"topic"</span></span> <span class="hljs-symbol">:showIdx=<span class="hljs-string">"false"</span></span> <span class="hljs-symbol">:clickHandler=<span class="hljs-string">"handleTopicClick"</span></span>  v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"mode==0"</span>/&gt;
&lt;school-topic v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"t in topics"</span> <span class="hljs-symbol">:model=<span class="hljs-string">"t"</span></span> <span class="hljs-symbol">:style=<span class="hljs-string">"showStyle(t)"</span></span> <span class="hljs-symbol">:clickHandler=<span class="hljs-string">"handleTopicClick"</span></span> v-<span class="hljs-keyword">else</span> /&gt;</code></pre>
<p>结果topics只有三条数据，但是渲染出9条数据，官网说的很清楚：<a href="https://vuefe.cn/v2/guide/list.html#v-for-with-v-if" rel="nofollow noreferrer" target="_blank">v-for <strong>with</strong> v-if</a></p>
<h3 id="articleHeader10">11.<code>keep-alive</code> 缓存组件在内存中，再次进入该页面不会重新渲染，用于保存页面的原始状态</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div id=&quot;app&quot;>
        <keep-alive include=&quot;SelectTopics&quot;>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">include</span>=<span class="hljs-string">"SelectTopics"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>即使设置了<code>keep-alive</code>组件的<code>beforeUpdate</code>和<code>updated</code>钩子函数还是会调用的。</p>
<p>activated和unactivated钩子是在keep-alive组件里面被调用的，不是第一次进入keep-alive组件的话，调用顺序是：<br><code>beforeEach</code>-&gt;<code>beforeRouteEnter</code>-&gt;<code>activated</code>-&gt;<code>beforeUpdate</code>-&gt;<code>beforeRouteEnter</code>的<code>next</code>函数</p>
<p>也可以在离开页面的时候手动销毁改组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" beforeRouteLeave(to, from, next) {
    if (to.path === &quot;/examcentre&quot;) {
        this.$destroy();
    }
    next();
 }
//或者
  deactivated: function () {
    console.log(4)
    this.$destroy();
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> beforeRouteLeave(to, <span class="hljs-keyword">from</span>, next) {
    <span class="hljs-keyword">if</span> (to.path === <span class="hljs-string">"/examcentre"</span>) {
        <span class="hljs-keyword">this</span>.$destroy();
    }
    next();
 }
<span class="hljs-comment">//或者</span>
  deactivated: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>)
    <span class="hljs-keyword">this</span>.$destroy();
  },</code></pre>
<p>有时候根据需求（比如该组件是复用的）需要在再次进入该页面的时候重新从后台获取数据，那么可以在<code>activated</code>钩子函数中请求数据来update页面。</p>
<p><a href="https://www.zhihu.com/question/50268585" rel="nofollow noreferrer" target="_blank">vue.js 能否设置某个组件不被keep-alive?</a><br><a href="https://segmentfault.com/a/1190000008123035">vue2.0 keep-alive最佳实践</a><br><a href="https://segmentfault.com/q/1010000007555953" target="_blank">Vue如何做到前进刷新数据,后退不刷新数据呢?</a><br><a href="https://github.com/vuejs/vue-router/issues/811" rel="nofollow noreferrer" target="_blank">&lt;keep-alive&gt;组件缓存问题 </a><br><a href="http://www.jianshu.com/p/42429f4d8f9e" rel="nofollow noreferrer" target="_blank">Vue路由开启keep-alive时的注意点</a><br><a href="http://www.cnblogs.com/nekoooo/p/6442077.html#commentform" rel="nofollow noreferrer" target="_blank">vue.js+vue-router+webpack keep-alive用法 </a></p>
<h3 id="articleHeader11">浏览器的前进回退并不会走dom绑定的前进后退的事件</h3>
<p>所以要想清除vuex state里面的数据的话，可以放在<code>beforeRouteLeave</code>里面做处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" this.$store.commit(&quot;SET_PAPERATTRIBUTE&quot;, {}); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">"SET_PAPERATTRIBUTE"</span>, {}); </code></pre>
<h3 id="articleHeader12">弹窗组件</h3>
<p>mint-ui 中的Toast MessageBox Indicator 调用的方式是<code>Toast('提示信息');</code>或者在全局引入mint-ui然后再组件里<code>this.$toast("提示信息")</code>,这种方式和我们普通的引入组件的方式都不同，通常我们是在模板里直接将组件放到模板里面，这就意味着父组件在render的时候，子组件也被render到了dom里面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;my-set-attr-wrap&quot;>
        <set-attribute ref=&quot;setMyAttr&quot; :style=&quot;setAttrStyle&quot; :model=&quot;attributeModel&quot; />
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code>&lt;<span class="hljs-string">template&gt;</span>
    &lt;<span class="hljs-string">div </span><span class="hljs-string">class=</span><span class="hljs-string">"my-set-attr-wrap"</span>&gt;
        &lt;<span class="hljs-built_in">set-attribute</span> <span class="hljs-string">ref=</span><span class="hljs-string">"setMyAttr"</span> :<span class="hljs-string">style=</span><span class="hljs-string">"setAttrStyle"</span> :<span class="hljs-string">model=</span><span class="hljs-string">"attributeModel"</span> /&gt;
    &lt;/<span class="hljs-string">div&gt;</span>
&lt;/<span class="hljs-string">template&gt;</span></code></pre>
<p><code>this.$toast("提示信息")</code>这种是在函数中调用，肯定也是要render到dom里面的，改咋办呢？查看了mint-ui的实现方式：<code>document.body.appendChild(instance.$el);</code><br>目录：</p>
<p><span class="img-wrap"><img data-src="/img/bVK5Bi?w=229&amp;h=95" src="https://static.alili.tech/img/bVK5Bi?w=229&amp;h=95" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>TopicDetailPopup.vue文件就是普通的vue写法，<br>index.js:</p>
<p><span class="img-wrap"><img data-src="/img/bVK5BL?w=736&amp;h=439" src="https://static.alili.tech/img/bVK5BL?w=736&amp;h=439" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这里考虑到每次弹出层不能都去创建新的组件，我们只需要将组件内的数据更新就可以了，dom也不需要删除，然后再创建，就用到了单例模式，这边的instance是在父组件没销毁之前都是存在的，每次只是更新了组件的数据，为啥没被销毁呢，这边形成了一个闭包：<br><span class="img-wrap"><img data-src="/img/bVK5Eg?w=1124&amp;h=234" src="https://static.alili.tech/img/bVK5Eg?w=1124&amp;h=234" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import TopicDetailPopup from '../topicDetailPopup/index.js'
TopicDetailPopup.open({
                            detail: res.data
                     });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> TopicDetailPopup from <span class="hljs-string">'../topicDetailPopup/index.js'</span>
TopicDetailPopup.<span class="hljs-keyword">open</span>({
                            detail: res.<span class="hljs-keyword">data</span>
                     });</code></pre>
<p>但是这个地方出现个问题<code>this.$store</code>现在为<code>undefined</code>，应该是因为这个组件是直接new实例化的，而不是通过根组件嵌套的，<br>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    router: router,
    store,
    render: h => h(App)
}).$mount(&quot;#app&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">new</span> Vue({
    router: router,
    store,
    render: h =&gt; h(App)
}).$mount(<span class="hljs-string">"#app"</span>);</code></pre>
<p>store注册在根组件里面，而弹窗组件没有和根组件关联，所以拿不到store。</p>
<p>要是能将弹窗组件插入其他组件问题就能解决了，貌似现在API没有提供这样的接口，vue2动态添加组件的话可以用render函数，可以我现在的弹窗组件是模板的形式，也可以动态插入到父组件，<code>&lt;component :is="componentId"&gt;&lt;/component&gt;</code>且需要在components里面引用，这样又回到了模板语法了。</p>
<p>弹窗的弊端：<br>vue-devtools 没法检测到组件，也没法检测到vuex，对于webapp来说返回键没法使用，关闭不了当前的弹窗，造成上面的问题都是由于没用使用router。<br>对于安卓手机返回键没法使用可以采用曲线救国的方式，禁用返回键，js没法直接操作安卓返回键，但是可以使用<code>beforeRouteLeave</code>，使得返回键没有效果，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" beforeRouteLeave(to, from, next) {
        if (this.popupVisible) {//弹窗显示的话，路由没法跳转
            next(false);
        } else {
            next(true);
        }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code> beforeRouteLeave(to, <span class="hljs-keyword">from</span>, <span class="hljs-keyword">next</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.popupVisible) {<span class="hljs-comment">//弹窗显示的话，路由没法跳转</span>
            <span class="hljs-keyword">next</span>(<span class="hljs-keyword">false</span>);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">next</span>(<span class="hljs-keyword">true</span>);
        }
 }</code></pre>
<p>弹窗的好处：<br>在当前页面直接弹出，这样可以保存当前页面的数据和滚动条的位置，还有就是组件复用的话，直接关闭弹窗，不需要根据不同的页面去回退或者前进到特定的页面。</p>
<blockquote><p><a href="https://segmentfault.com/q/1010000007148050">使用的是vue2.0，如何动态添加组件。例如实现点击A按钮添加aTest组件，点击B按钮添加bTest组件。</a></p></blockquote>
<h3 id="articleHeader13">:model和v-model的区别</h3>
<p>v-model通常用于input的双向数据绑定<code> &lt;input v-model="parentMsg"&gt;</code>，也可以实现子组件到父组件数据的双向数据绑定：<br><strong>首先说说v-model的用法：</strong><br>model.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        父：
        <input type=&quot;text&quot;
               v-model=&quot;msg&quot;>
        <child v-model=&quot;msg&quot;></child>
    </div>
</template>
<script>
import child from './modelChild.vue'
export default {
    name: &quot;model&quot;,
    props: {

    },
    components: {
        child
    },
    data() {
        return {
            msg: &quot;ppp&quot;
        }
    },
    methods: {

    }
}
</script>
<style lang=&quot;less&quot;>

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        父：
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
               <span class="hljs-attr">v-model</span>=<span class="hljs-string">"msg"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> child <span class="hljs-keyword">from</span> <span class="hljs-string">'./modelChild.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
    name: "model",
    props: {

    }</span><span class="xml"><span class="undefined">,
    components: </span></span><span class="hljs-template-variable">{
        child
    }</span><span class="xml"><span class="undefined">,
    data() </span></span><span class="hljs-template-variable">{
        return {
            msg: "ppp"
        }</span><span class="xml"><span class="undefined">
    },
    methods: </span></span><span class="hljs-template-variable">{

    }</span><span class="xml"><span class="undefined">
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>modelChild.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        子：
        <input type=&quot;text&quot;
               @input=&quot;handleInput&quot;
               class=&quot;text&quot;
               :value=&quot;value&quot;>
    </div>
</template>
<script>
export default {
    name: &quot;modelChild&quot;,
    props: [&quot;value&quot;],
    methods: {
        handleInput(e) {
            this.$emit(&quot;input&quot;, e.target.value)
        }
    }
}
</script>
<style lang=&quot;less&quot;>
.text {
    height: 20px;
    width: 200px;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        子：
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
               @<span class="hljs-attr">input</span>=<span class="hljs-string">"handleInput"</span>
               <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span>
               <span class="hljs-attr">:value</span>=<span class="hljs-string">"value"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"modelChild"</span>,
    <span class="hljs-attr">props</span>: [<span class="hljs-string">"value"</span>],
    <span class="hljs-attr">methods</span>: {
        handleInput(e) {
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">"input"</span>, e.target.value)
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.text</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>无论改变父组件还是子组件的输入框，value和msg的值都会改变，两个输入框的值也就同时改变了。</p>
<p><strong>:model和v-model的区别</strong><br>:model是v-bind:model的缩写,<code>&lt;child :model="msg"&gt;&lt;/child&gt;</code>这种只是将父组件的数据传递到了子组件，并没有实现子组件和父组件数据的双向绑定。当然引用类型除外，子组件改变引用类型的数据的话，父组件也会改变的。</p>
<h3 id="articleHeader14">Vue.component注册全局组件</h3>
<p>查看vue-router源码的时候发现install.js里面两句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('router-view', View)
Vue.component('router-link', Link)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'router-view'</span>, View)
<span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'router-link'</span>, Link)</code></pre>
<p>这两句就是全局注册了这两个组件,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
Vue.use(VueRouter)</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVLjpW?w=518&amp;h=108" src="https://static.alili.tech/img/bVLjpW?w=518&amp;h=108" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVLjpZ?w=594&amp;h=477" src="https://static.alili.tech/img/bVLjpZ?w=594&amp;h=477" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这三步后，在组件里直接使用<code> &lt;router-view&gt;&lt;/router-view&gt;</code>而不用先import再使用。</p>
<p>在mint-ui里也是相同的做法：<br>src/index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const install = function(Vue) {
  if (install.installed) return;
  Vue.component(Header.name, Header);//注册全局组件
  Vue.component(Button.name, Button);
  Vue.use(InfiniteScroll);//使用指令插件
  Vue.use(Lazyload, {
    loading: require('./assets/loading-spin.svg'),
    try: 3
  });//使用指令插件或lazy-component
  Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
  Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.$indicator = Vue.prototype.$indicator = Indicator;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">const</span> install = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(Vue)</span> </span>{
  <span class="hljs-keyword">if</span> (install.installed) <span class="hljs-keyword">return</span>;
  Vue.component(Header.name, Header);<span class="hljs-comment">//注册全局组件</span>
  Vue.component(Button.name, Button);
  Vue.<span class="hljs-keyword">use</span>(InfiniteScroll);<span class="hljs-comment">//使用指令插件</span>
  Vue.<span class="hljs-keyword">use</span>(Lazyload, {
    loading: <span class="hljs-keyword">require</span>(<span class="hljs-string">'./assets/loading-spin.svg'</span>),
    <span class="hljs-keyword">try</span>: <span class="hljs-number">3</span>
  });<span class="hljs-comment">//使用指令插件或lazy-component</span>
  Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
  Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.$indicator = Vue.prototype.$indicator = Indicator;
};</code></pre>
<p>后面的<code>Vue.$toast = Vue.prototype.$toast = Toast;</code>使得我们可以在组件中直接调用<code>this.$toast("提示信息")</code></p>
<h3 id="articleHeader15">组件上写class</h3>
<p><span class="img-wrap"><img data-src="/img/bVLsT9?w=747&amp;h=66" src="https://static.alili.tech/img/bVLsT9?w=747&amp;h=66" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>之前在写react的时候是不可以这么做的，今天查看了popup.vue的时候发现vue是可以这么干的，直接渲染到了组件的根元素上面。<a href="https://vuefe.cn/v2/guide/class-and-style.html" rel="nofollow noreferrer" target="_blank">用在组件上</a></p>
<h3 id="articleHeader16">Boolean类型的props可以直接定义：</h3>
<p><span class="img-wrap"><img data-src="/img/bVLuMI?w=424&amp;h=69" src="https://static.alili.tech/img/bVLuMI?w=424&amp;h=69" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" props: {
    fixed: Boolean,
    value: {}
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-tag">props</span>: {
    <span class="hljs-attribute">fixed</span>: Boolean,
    value: {}
  }</code></pre>
<h3 id="articleHeader17">数据更新页面没刷新</h3>
<p>今天在concat两个数组的时候发现数据更新了，页面并没有刷新，debug看了下数据，concat的数据没有get set属性访问器，导致后来push的数据也没有属性访问器。之前没有细看文档。搜了下原来push是变异方法，concat不是。<br>解决办法有二：</p>
<ul>
<li><p>使用变异方法</p></li>
<li><p>使用vue component的$set函数<br>看一些小伙伴的回答是data的$set方法，至少vue2是没有的。具体可查看文档<a href="https://cn.vuejs.org/v2/guide/list.html#Template-v-for" rel="nofollow noreferrer" target="_blank">列表渲染</a></p></li>
</ul>
<p>我的解决办法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.push.apply(arr, item);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Array</span><span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.push</span><span class="hljs-selector-class">.apply</span>(<span class="hljs-selector-tag">arr</span>, <span class="hljs-selector-tag">item</span>);</code></pre>
<h3 id="articleHeader18">render函数和模板语法只能二选一</h3>
<p>今天在模板.vue文件里加入render函数发现并不会执行render函数，原来是<code>vue-loader</code>会将<code>template</code>转成render函数，所以只能二选一。<a href="https://segmentfault.com/q/1010000007167811">.vue文件如何使用render函数渲染组件</a></p>
<h3 id="articleHeader19">控制input只能输入数字</h3>
<p><code>&lt;input type="number"&gt;</code>在pc和手机端都可以实现只能输入数字，可是手机端弹出的软键盘里面没有<em>完成</em>或者<em>搜索</em>按钮，搜了下，现在的HTML5 number的情况下并没有支持搜索按钮，type='text'是有的。所以曲线救国，控制表单只能输入数字。<br>起初的想法是先把在</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type='text' @input=&quot;handleInput&quot; :value=&quot;val&quot;/>

handleInput(e){
this.val=e.target.value.replace(/[^\d]/g,'');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;input type=<span class="hljs-string">'text'</span> <span class="hljs-variable">@input</span>=<span class="hljs-string">"handleInput"</span> <span class="hljs-symbol">:value=<span class="hljs-string">"val"</span>/&gt;</span>

handleInput(e){
this.val=e.target.value.replace(<span class="hljs-regexp">/[^\d]/g</span>,<span class="hljs-string">''</span>);
}</code></pre>
<p>但是这种并不会实时刷新表单的数据，下面就会起作用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="e.target.value=e.target.value.replace(/[^\d]/g,'');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;">e.<span class="hljs-keyword">target</span>.<span class="hljs-keyword">value</span>=e.<span class="hljs-keyword">target</span>.<span class="hljs-keyword">value</span>.replace(/[^\d]/g,<span class="hljs-string">''</span>);</code></pre>
<p>优雅点的写法，用自定义指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//<input type=&quot;text&quot; v-number-only />
 directives: {
        numberOnly: {
            bind: function(el) {
                el.handler = function() {
                    el.value = el.value.replace(/\D+/, '')
                }
                el.addEventListener('input', el.handler)
            },
            unbind: function(el) {
                el.removeEventListener('input', el.handler)
            }
        }
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>//&lt;<span class="hljs-built_in">input</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"text"</span> v-<span class="hljs-keyword">number</span>-<span class="hljs-keyword">only</span> /&gt;
 directive<span class="hljs-variable">s:</span> {
        numberOnly: {
            bind: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el)</span> {</span>
                <span class="hljs-keyword">el</span>.handler = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
                    <span class="hljs-keyword">el</span>.value = <span class="hljs-keyword">el</span>.value.replace(/\D+/, <span class="hljs-string">''</span>)
                }
                <span class="hljs-keyword">el</span>.addEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">el</span>.handler)
            },
            unbind: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el)</span> {</span>
                <span class="hljs-keyword">el</span>.removeEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-keyword">el</span>.handler)
            }
        }
    },</code></pre>
<blockquote><p><a href="https://segmentfault.com/q/1010000007115009" target="_blank">vue的input中，如何限制只能输入number</a></p></blockquote>
<h3 id="articleHeader20">弹出层弹出文本框获取焦点</h3>
<p>由于弹出层是单例模式，所以打开弹出层只会执行一次mounted钩子函数，我去监听</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  visible(val) {
            if (val) {
                this.$refs.textbox.focus();//这样并不能使文本框获取焦点
            } else {
                this.detail = null;
                this.$refs.textbox.value = &quot;&quot;;
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  visible(<span class="hljs-keyword">val</span>) {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">val</span>) {
                <span class="hljs-keyword">this</span>.$refs.textbox.focus();<span class="hljs-comment">//这样并不能使文本框获取焦点</span>
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.detail = <span class="hljs-literal">null</span>;
                <span class="hljs-keyword">this</span>.$refs.textbox.value = <span class="hljs-string">""</span>;
            }
        }</code></pre>
<p>解决办法也是使用自定义指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  focus: {
            update(el) {
                el.focus();
            }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>  focus: {
            update<span class="hljs-comment">(el)</span> {
                el.focus<span class="hljs-comment">()</span>;
            }
  }</code></pre>
<blockquote><p><a href="https://segmentfault.com/q/1010000006917530">vue如何实现点击button 使input获取焦点</a></p></blockquote>
<h3 id="articleHeader21">改变v-html解析后台返回的HTML样式</h3>
<p>平时在写组件里面的样式加上<code>scoped</code>，避免样式的全局污染，而从后台返回的HTML无效的，解决办法就是在组件里再加一对style标签，将样式写到这里。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2实践（持续更新）

## 原文链接
[https://segmentfault.com/a/1190000008688050](https://segmentfault.com/a/1190000008688050)

