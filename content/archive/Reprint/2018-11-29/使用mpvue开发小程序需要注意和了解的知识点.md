---
title: '使用mpvue开发小程序需要注意和了解的知识点' 
date: 2018-11-29 9:34:56
hidden: true
slug: rj3re7rifn
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、实例生命周期</h2>
<p>除了Vue本身的生命周期处，mpvue还兼容了小程序的生命周期，这部分生命周期的钩子来源于<a href="https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html" rel="nofollow noreferrer" target="_blank">微信小程序的Page</a>,除特殊情况外，<strong>不建议使用</strong>小程序的生命周期钩子。</p>
<h3 id="articleHeader1"><strong>app 部分：</strong></h3>
<ul>
<li>onLaunch，初始化</li>
<li>onShow，当小程序启动，或从后台进入前台显示</li>
<li>onHide，当小程序从前台进入后台</li>
</ul>
<h3 id="articleHeader2"><strong>page 部分：</strong></h3>
<ul>
<li>onLoad，监听页面加载</li>
<li>onShow，监听页面显示</li>
<li>onReady，监听页面初次渲染完成</li>
<li>onHide，监听页面隐藏</li>
<li>onUnload，监听页面卸载</li>
<li>onPullDownRefresh，监听用户下拉动作</li>
<li>onReachBottom，页面上拉触底事件的处理函数</li>
<li>onShareAppMessage，用户点击右上角分享</li>
<li>onPageScroll，页面滚动</li>
<li>onTabItemTap, 当前是 tab 页时，点击 tab 时触发 （mpvue 0.0.16 支持）</li>
</ul>
<h3 id="articleHeader3">用法示例：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  data: {
    a: 1
  },
  created () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  },
  onShow () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a, '小程序触发的 onshow')
  }
})
// => &quot;a is: 1&quot;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">new</span> Vue({
  data: {
    a: <span class="hljs-number">1</span>
  },
  created () {
    <span class="hljs-regexp">//</span> `<span class="javascript"><span class="hljs-keyword">this</span></span>` 指向 vm 实例
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a is: '</span> + <span class="hljs-keyword">this</span>.a)
  },
  onShow () {
    <span class="hljs-regexp">//</span> `<span class="javascript"><span class="hljs-keyword">this</span></span>` 指向 vm 实例
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'a is: '</span> + <span class="hljs-keyword">this</span>.a, <span class="hljs-string">'小程序触发的 onshow'</span>)
  }
})
<span class="hljs-regexp">//</span> =&gt; <span class="hljs-string">"a is: 1"</span>

</code></pre>
<h3 id="articleHeader4"><strong>注意点：</strong></h3>
<ol>
<li>不要在选项属性或回调上使用箭头函数，比如 created: () =&gt; console.log(this.a) 或vm.$watch('a', newValue =&gt; this.myMethod())。因为箭头函数是和父级上下文绑定在一起的，this不会是如你做预期的 Vue 实例，且 this.a 或 this.myMethod 也会是未定义的。</li>
<li>微信小程序的页面的 query 参数是通过 onLoad 获取的，mpvue 对此进行了优化，直接通过<strong>this.$root.$mp.query</strong> 获取相应的参数数据，其调用需要在 onLoad 生命周期触发之后使用，比如 onShow 等</li>
</ol>
<h2 id="articleHeader5">二、模板语法</h2>
<h3 id="articleHeader6"><strong>不支持 纯-HTML</strong></h3>
<p>小程序里所有的 BOM／DOM 都不能用，也就是说 v-html 指令不能用。</p>
<h3 id="articleHeader7"><strong>不支持部分复杂的 JavaScript 渲染表达式</strong></h3>
<p>我们会把 template 中的 "{{""}}" 双花括号的部分，直接编码到 wxml 文件中，由于微信小程序的能力限制(数据绑定)，所以无法支持复杂的 JavaScript 表达式。</p>
<p>目前可以使用的有 + - * % ?: ! == === &gt; &lt; [] .，剩下的还待完善。</p>
<h3 id="articleHeader8"><strong>不支持过滤器</strong></h3>
<p>渲染部分会转成 wxml ，wxml 不支持过滤器，所以这部分功能不支持。</p>
<h3 id="articleHeader9"><strong>不支持函数</strong></h3>
<p>不支持在 template 内使用 methods 中的函数。</p>
<h3 id="articleHeader10"><strong>列表渲染</strong></h3>
<p>全支持 <a href="https://cn.vuejs.org/v2/guide/list.html" rel="nofollow noreferrer" target="_blank">官方文档：列表渲染</a></p>
<p>只是需要注意一点，<strong>嵌套列表渲染，必须指定不同的索引！</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 在这种嵌套循环的时候， index 和 itemIndex 这种索引是必须指定，且别名不能相同，正确的写法如下 -->
<template>
    <ul v-for=&quot;(card, index) in list&quot;>
        <li v-for=&quot;(item, itemIndex) in card&quot;>
            "{{"item.value"}}"
        </li>
    </ul>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- 在这种嵌套循环的时候， index 和 itemIndex 这种索引是必须指定，且别名不能相同，正确的写法如下 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(card, index) in list"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, itemIndex) in card"</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"item.value"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</span></code></pre>
<h3 id="articleHeader11"><strong>事件处理器</strong></h3>
<p>在 input 和 textarea 中 change 事件会被转为 blur 事件。</p>
<h4><strong>踩坑注意：</strong></h4>
<ul>
<li>
<p>列表中没有的原生事件也可以使用例如 bindregionchange 事件直接在 dom 上将bind改为@<br>  @regionchange,同时这个事件也非常特殊，它的 event type 有 begin 和 end<br>  两个，导致我们无法在handleProxy 中区分到底是什么事件，所以你在监听此类事件的时候同时监听事件名和事件类型既</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <map @regionchange=&quot;functionName&quot; @end=&quot;functionName&quot; @begin=&quot;functionName&quot;><map>
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs golo"><code>   &lt;<span class="hljs-keyword">map</span> <span class="hljs-meta">@regionchange</span>=<span class="hljs-string">"functionName"</span> <span class="hljs-meta">@end</span>=<span class="hljs-string">"functionName"</span> <span class="hljs-meta">@begin</span>=<span class="hljs-string">"functionName"</span>&gt;&lt;<span class="hljs-keyword">map</span>&gt;
   </code></pre>
</li>
<li>小程序能力所致，bind 和 catch 事件同时绑定时候，只会触发 bind ,catch 不会被触发，要避免踩坑。</li>
<li>
<p>事件修饰符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- .stop 的使用会阻止冒泡，但是同时绑定了一个非冒泡事件，会导致该元素上的 catchEventName 失效！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">- <span class="hljs-selector-class">.stop</span> 的使用会阻止冒泡，但是同时绑定了一个非冒泡事件，会导致该元素上的 catchEventName 失效！</code></pre>
<ul>
<li>.prevent 可以直接干掉，因为小程序里没有什么默认事件，比如submit并不会跳转页面</li>
<li>.capture 支持 1.0.9</li>
<li>.self 没有可以判断的标识</li>
<li>.once 也不能做，因为小程序没有 removeEventListener, 虽然可以直接在 handleProxy 中处理，但非常的不优雅，违背了原意，暂不考虑</li>
</ul>
</li>
<li>其他 键值修饰符 等在小程序中压根没键盘，所以。。。</li>
</ul>
<h2 id="articleHeader12">三、组件</h2>
<p><strong>有且只能使用单文件组件（.vue 组件）的形式进行支持。</strong>其他的诸如：动态组件，自定义 render，和&lt;script type="text/x-template"&gt; 字符串模版等都不支持。原因很简单，因为我们要预编译出 wxml。</p>
<h3 id="articleHeader13"><strong>详细的不支持列表：</strong></h3>
<ul>
<li>暂不支持在组件引用时，在组件上定义 click 等原生事件、v-show（可用 v-if 代替）和 class style 等样式属性(例：&lt;card class="class-name"&gt; &lt;/card&gt; 样式是不会生效的)，因为编译到wxml，小程序不会生成节点，建议写在内部顶级元素上。</li>
<li>Slot（scoped 暂时还没做支持）</li>
<li>动态组件</li>
<li>异步组件</li>
<li>inline-template</li>
<li>X-Templates</li>
<li>keep-alive</li>
<li>transition</li>
<li>class</li>
<li>style</li>
</ul>
<h3 id="articleHeader14"><strong>小程序组件</strong></h3>
<p>mpvue 可以支持小程序的原生组件，比如： <strong>picker,map</strong> 等，需要注意的是原生组件上的事件绑定，需要以 <strong>vue</strong> 的事件绑定语法来绑定，如 <strong>bindchange="eventName"</strong> 事件，需要写成 <strong>@change="eventName"</strong></p>
<h3 id="articleHeader15">示例代码：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<picker mode=&quot;date&quot; :value=&quot;date&quot; start=&quot;2015-09-01&quot; end=&quot;2017-09-01&quot; @change=&quot;bindDateChange&quot;>
    <view class=&quot;picker&quot;>
      当前选择: "{{"date"}}"
    </view>
</picker>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs twig"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">picker</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">"date"</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"date"</span> <span class="hljs-attr">start</span>=<span class="hljs-string">"2015-09-01"</span> <span class="hljs-attr">end</span>=<span class="hljs-string">"2017-09-01"</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"bindDateChange"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"picker"</span>&gt;</span>
      当前选择: </span><span class="hljs-template-variable">"{{"<span class="hljs-name">date</span>"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">picker</span>&gt;</span>
</span></code></pre>
<h2 id="articleHeader16">四、常见问题</h2>
<h4><strong>1. 如何获取小程序在 page onLoad 时候传递的 options</strong></h4>
<p>在所有 页面 的组件内可以通过 <strong>this.$root.$mp.query</strong> 进行获取。</p>
<h4><strong>2. 如何获取小程序在 app onLaunch/onShow 时候传递的 options</strong></h4>
<p>在所有的组件内可以通过 <strong>this.$root.$mp.appOptions</strong> 进行获取。</p>
<h4><strong>3. 如何捕获 app 的 onError</strong></h4>
<p>由于 onError 并不是完整意义的生命周期，所以只提供一个捕获错误的方法，在 app 的根组件上添加名为 onError 的回调函数即可。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
   // 只有 app 才会有 onLaunch 的生命周期
   onLaunch () {
       // ...
   },

   // 捕获 app error
   onError (err) {
       console.log(err)
   }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code>export <span class="hljs-keyword">default</span> {
   <span class="hljs-comment">// 只有 app 才会有 onLaunch 的生命周期</span>
   onLaunch () {
       <span class="hljs-comment">// ...</span>
   },

   <span class="hljs-comment">// 捕获 app error</span>
   <span class="hljs-keyword">onError</span> (<span class="hljs-keyword">err</span>) {
       console.log(<span class="hljs-keyword">err</span>)
   }
}

</code></pre>
<blockquote>愿你成为终身学习者</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用mpvue开发小程序需要注意和了解的知识点

## 原文链接
[https://segmentfault.com/a/1190000014984581](https://segmentfault.com/a/1190000014984581)

