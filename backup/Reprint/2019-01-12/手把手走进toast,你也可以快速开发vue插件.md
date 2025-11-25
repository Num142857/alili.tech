---
title: '手把手走进toast,你也可以快速开发vue插件' 
date: 2019-01-12 2:30:25
hidden: true
slug: zr94k6m2h5n
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是toast</h2>
<p>在使用IOS、Android的APP时，经常会收到系统的一些简短的提示信息，在其显示1--3s后自动关闭。</p>
<h2 id="articleHeader1">分析toast</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="仔细分析toast，发现其有以下几个特点：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">仔细分析toast，发现其有以下几个特点：</code></pre>
<ol>
<li><p>内容简短，大多数就是一句话</p></li>
<li><p>显示在固定且显目的位置</p></li>
<li><p>没有关闭按钮</p></li>
<li><p>1--3秒后自动关闭消失</p></li>
</ol>
<h2 id="articleHeader2">开发思路</h2>
<p>首先是HTML模板，根据以上分析的特点1，toast需要的DOM结构其实非常简单，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div.toast
    i 显示的消息" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="jade"><span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.toast</span>
    <span class="hljs-selector-tag">i</span> 显示的消息</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVO0ic?w=500&amp;h=275" src="https://static.alili.tech/img/bVO0ic?w=500&amp;h=275" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>以上是使用模板引擎pug，就是原来大家熟知的jade,后来因为商标名称而改名。因为其书写简单，所以我非常推荐大家使用。<br>闲言少赘，div的作用是显示一个纯色背景，引起用户注意，而消息内容则放置于i标签中。<br>接着我们为toast书写一个css关闭特效</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hidden {
    transform: scale(0);
    transition: 0.3s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="SASS"><span class="hljs-selector-class">.hidden</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0);
    <span class="hljs-attribute">transition</span>: <span class="hljs-number">0.3s</span>;
}</code></pre>
<hr>
<p>以上是css3两个属性，<code>transform: scale(0)</code>是缩小div的尺寸到0.即消失；transition: 0.3s则是表示该实现缩小过程的时间，这样就实现一个简单的动画效果。</p>
<hr>
<p>说到这里，估计大家也明白，就是通过动态添加className来实现toast的消失，但是在怎么实现自动关闭的功能呢？</p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="很简单，就是大家常用的setTimeout()方法，通过设置一个时间来告诉程序多少秒后给toast的div添加hidden的类名让其消失。  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>很简单，就是大家常用的setTimeout()方法，通过设置一个时间来告诉程序多少秒后给toast的<span class="hljs-keyword">div</span>添加hidden的类名让其消失。  
</code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="然后可能有人疑问，这样虽然实现了toast的功能，但是创建的DOM结构还一直存在，我看着不舒服，想给它删掉，该怎么实现呢？  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>然后可能有人疑问，这样虽然实现了toast的功能，但是创建的DOM结构还一直存在，我看着不舒服，想给它删掉，该怎么实现呢？  
</code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这时候就要用到transitionend这个事件函数了，该事件的触发时机是使用transition属性的target动画特效结束后，具体可查询[mozilla文档][2]  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>这时候就要用到transitionend这个事件函数了，该事件的触发时机是使用transition属性的target动画特效结束后，具体可查询[<span class="hljs-string">mozilla文档</span>][<span class="hljs-symbol">2</span>]  
</code></pre>
<h2 id="articleHeader3">编写一个toast的vue插件</h2>
<ul><li><p>toast组件</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tempalate lang=&quot;pug&quot;>
div.toast(:class=&quot;{'hidden': !visiable}&quot;)
    i "{{"message"}}"
</tempalate>
<script>
data () {
    return {
        message: '',
        visiable: true
    }
}
</script>
<style lang=&quot;scss&quot;>
...
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">tempalate</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"pug"</span>&gt;</span>
div.toast(:class="{'hidden': !visiable}")
    i </span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">tempalate</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
data () {
    <span class="hljs-keyword">return</span> {
        message: <span class="hljs-string">''</span>,
        visiable: <span class="hljs-literal">true</span>
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="undefined">
...
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<hr>
<p>组件很简单，就是使用vue的数据绑定，默认显示toast内容</p>
<hr>
<p>接下来我们就要正式写vue的插件了，请注意</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Toast from './Toast.vue'

var plugin = {}

// 插件必须要有一个install方法
plugin.install = function (Vue, options = {}) {

    // 
    const ToastController = Vue.extend(Toast)
    // 实现toast的关闭方法
    ToastController.prototype.close = function () {
        this.visible = false
        this.$el.addEventListener('transitionend', removeDom)
    }
    
    // 在Vue原型实现toast的DOM挂载、以及功能实现
    // 用户可以在Vue实例（Vue单文件就是一个Vue实例）通过this.$toast来访问以下内容
    Vue.prototype.$toast = (option = {}) => {
         // toast实例挂载到刚创建的div
         var instance = new ToastController().$mount(document.createElement('div'))
         let duration = option.duration || options.duration || 2500
         // 如果用户在Vue实例中没有设置option的属性message,则直接将option的内容作为message信息进行toast内容进行显示
         instance.message = typeof option === 'string' ? option : option.message
         // 将toast的DOM挂载到body上
         document.body.appendChild(instance.$el)
         
         // 自动关闭功能的实现
         setTimeout(function () {
            instance.close()
        }, duration)
    }
}

// 最后将以上内容导出，即可在其他地方进行使用
export default plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Toast <span class="hljs-keyword">from</span> <span class="hljs-string">'./Toast.vue'</span>

<span class="hljs-keyword">var</span> plugin = {}

<span class="hljs-comment">// 插件必须要有一个install方法</span>
plugin.install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue, options = {}</span>) </span>{

    <span class="hljs-comment">// </span>
    <span class="hljs-keyword">const</span> ToastController = Vue.extend(Toast)
    <span class="hljs-comment">// 实现toast的关闭方法</span>
    ToastController.prototype.close = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.visible = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.$el.addEventListener(<span class="hljs-string">'transitionend'</span>, removeDom)
    }
    
    <span class="hljs-comment">// 在Vue原型实现toast的DOM挂载、以及功能实现</span>
    <span class="hljs-comment">// 用户可以在Vue实例（Vue单文件就是一个Vue实例）通过this.$toast来访问以下内容</span>
    Vue.prototype.$toast = <span class="hljs-function">(<span class="hljs-params">option = {}</span>) =&gt;</span> {
         <span class="hljs-comment">// toast实例挂载到刚创建的div</span>
         <span class="hljs-keyword">var</span> instance = <span class="hljs-keyword">new</span> ToastController().$mount(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>))
         <span class="hljs-keyword">let</span> duration = option.duration || options.duration || <span class="hljs-number">2500</span>
         <span class="hljs-comment">// 如果用户在Vue实例中没有设置option的属性message,则直接将option的内容作为message信息进行toast内容进行显示</span>
         instance.message = <span class="hljs-keyword">typeof</span> option === <span class="hljs-string">'string'</span> ? option : option.message
         <span class="hljs-comment">// 将toast的DOM挂载到body上</span>
         <span class="hljs-built_in">document</span>.body.appendChild(instance.$el)
         
         <span class="hljs-comment">// 自动关闭功能的实现</span>
         setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            instance.close()
        }, duration)
    }
}

<span class="hljs-comment">// 最后将以上内容导出，即可在其他地方进行使用</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> plugin</code></pre>
<p>接下来，你就可以在入口文件进行使用刚刚开发的插件啦<br>import Vue from 'vue'<br>import Toast from '../lib/plugin.js'</p>
<p>Vue.use(Toast)<br>就这样，不知不觉中就大功告成了，喝杯香槟庆祝吧</p>
<p>以下是我的toast源码地址，内置多种主题，且支持自定义样式，以及多toast同时显示，大家可以通过<code>npm install v-awesome-toast --save</code>来直接使用</p>
<p><a href="https://github.com/wxhthx/vue-toast" rel="nofollow noreferrer" target="_blank">Github: v-awesome-toast 点击查阅</a><br>欢迎大家指正缺陷，一块研究，更希望您能点个star，鼓励下我的努力<br><span class="img-wrap"><img data-src="/img/bVO0ph?w=210&amp;h=209" src="https://static.alili.tech/img/bVO0ph?w=210&amp;h=209" alt="求求你了" title="求求你了" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手走进toast,你也可以快速开发vue插件

## 原文链接
[https://segmentfault.com/a/1190000009733948](https://segmentfault.com/a/1190000009733948)

