---
title: 'Vue 2.0 浅谈--生命周期和钩子函数' 
date: 2019-01-13 2:30:11
hidden: true
slug: 6xgwxxdpgxx
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>前言</strong></h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="用Vue也有一段时间了,发现生命周期是很重要的一部分,稍微懂得了一些东西,特地来分享一下.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code>用Vue也有一段时间了,发现生命周期是很重要的一部分,稍微懂得了一些东西,特地来分享一下.
</code></pre>
<h1 id="articleHeader1"><strong>生命周期和钩子函数-介绍</strong></h1>
<p>啥也不说先上图<br>图-1为 Vue 1.0 生命周期图,图-2为 Vue 2.0 生命周期图,图-3为Vue 1.0 和 Vue 2.0 钩子函数比较  <br>重点看 Vue 2.0</p>
<p><span class="img-wrap"><img data-src="/img/bVqZpE" src="https://static.alili.tech/img/bVqZpE" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVOKh3?w=343&amp;h=800" src="https://static.alili.tech/img/bVOKh3?w=343&amp;h=800" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVOKlt?w=800&amp;h=540" src="https://static.alili.tech/img/bVOKlt?w=800&amp;h=540" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2"><strong>生命周期和钩子函数-具体</strong></h1>
<p>上代码</p>
<blockquote>自己粘走执行</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <title></title>
    <script type=&quot;text/javascript&quot; src=&quot;https://cdn.jsdelivr.net/vue/2.1.3/vue.js&quot;></script>
</head>
<body>

<div id=&quot;app&quot;>
     <p>"{{" message "}}"</p>
</div>

<script type=&quot;text/javascript&quot;>
    
  var app = new Vue({
      el: '#app',
      data: {
          message : &quot;xuxiao is boy&quot; 
      },
       beforeCreate: function () {
                console.group('beforeCreate 创建前状态===============》');
               console.log(&quot;%c%s&quot;, &quot;color:red&quot; , &quot;el     : &quot; + this.$el); //undefined
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); //undefined 
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message)  
        },
        created: function () {
            console.group('created 创建完毕状态===============》');
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el); //undefined
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); //已被初始化 
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message); //已被初始化
        },
        beforeMount: function () {
            console.group('beforeMount 挂载前状态===============》');
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + (this.$el)); //已被初始化
            console.log(this.$el);
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); //已被初始化  
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message); //已被初始化  
        },
        mounted: function () {
            console.group('mounted 挂载结束状态===============》');
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el); //已被初始化
            console.log(this.$el);    
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); //已被初始化
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message); //已被初始化 
        },
        beforeUpdate: function () {
            console.group('beforeUpdate 更新前状态===============》');
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el);
            console.log(this.$el);   
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); 
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message); 
        },
        updated: function () {
            console.group('updated 更新完成状态===============》');
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el);
            console.log(this.$el); 
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); 
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message); 
        },
        beforeDestroy: function () {
            console.group('beforeDestroy 销毁前状态===============》');
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el);
            console.log(this.$el);    
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); 
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message); 
        },
        destroyed: function () {
            console.group('destroyed 销毁完成状态===============》');
            console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el);
            console.log(this.$el);  
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); 
               console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message)
        }
    })
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/vue/2.1.3/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" message "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    
  <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
      <span class="hljs-attr">data</span>: {
          <span class="hljs-attr">message</span> : <span class="hljs-string">"xuxiao is boy"</span> 
      },
       <span class="hljs-attr">beforeCreate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'beforeCreate 创建前状态===============》'</span>);
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span> , <span class="hljs-string">"el     : "</span> + <span class="hljs-keyword">this</span>.$el); <span class="hljs-comment">//undefined</span>
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"data   : "</span> + <span class="hljs-keyword">this</span>.$data); <span class="hljs-comment">//undefined </span>
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"message: "</span> + <span class="hljs-keyword">this</span>.message)  
        },
        <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'created 创建完毕状态===============》'</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"el     : "</span> + <span class="hljs-keyword">this</span>.$el); <span class="hljs-comment">//undefined</span>
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"data   : "</span> + <span class="hljs-keyword">this</span>.$data); <span class="hljs-comment">//已被初始化 </span>
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"message: "</span> + <span class="hljs-keyword">this</span>.message); <span class="hljs-comment">//已被初始化</span>
        },
        <span class="hljs-attr">beforeMount</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'beforeMount 挂载前状态===============》'</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"el     : "</span> + (<span class="hljs-keyword">this</span>.$el)); <span class="hljs-comment">//已被初始化</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"data   : "</span> + <span class="hljs-keyword">this</span>.$data); <span class="hljs-comment">//已被初始化  </span>
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"message: "</span> + <span class="hljs-keyword">this</span>.message); <span class="hljs-comment">//已被初始化  </span>
        },
        <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'mounted 挂载结束状态===============》'</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"el     : "</span> + <span class="hljs-keyword">this</span>.$el); <span class="hljs-comment">//已被初始化</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);    
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"data   : "</span> + <span class="hljs-keyword">this</span>.$data); <span class="hljs-comment">//已被初始化</span>
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"message: "</span> + <span class="hljs-keyword">this</span>.message); <span class="hljs-comment">//已被初始化 </span>
        },
        <span class="hljs-attr">beforeUpdate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'beforeUpdate 更新前状态===============》'</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"el     : "</span> + <span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);   
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"data   : "</span> + <span class="hljs-keyword">this</span>.$data); 
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"message: "</span> + <span class="hljs-keyword">this</span>.message); 
        },
        <span class="hljs-attr">updated</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'updated 更新完成状态===============》'</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"el     : "</span> + <span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el); 
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"data   : "</span> + <span class="hljs-keyword">this</span>.$data); 
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"message: "</span> + <span class="hljs-keyword">this</span>.message); 
        },
        <span class="hljs-attr">beforeDestroy</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'beforeDestroy 销毁前状态===============》'</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"el     : "</span> + <span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);    
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"data   : "</span> + <span class="hljs-keyword">this</span>.$data); 
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"message: "</span> + <span class="hljs-keyword">this</span>.message); 
        },
        <span class="hljs-attr">destroyed</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'destroyed 销毁完成状态===============》'</span>);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"el     : "</span> + <span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);  
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"data   : "</span> + <span class="hljs-keyword">this</span>.$data); 
               <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"message: "</span> + <span class="hljs-keyword">this</span>.message)
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>打开F12可以查看生命周期各个时期的钩子函数的状态,如下图</p>
<p><span class="img-wrap"><img data-src="/img/bVOLlH?w=399&amp;h=801" src="https://static.alili.tech/img/bVOLlH?w=399&amp;h=801" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>由上图知:</p>
<blockquote>1.beforeCrete: 此时,$el和data都为undefined,没有初始化<br>2.created:  创建后data初始化了,而$el没有<br>3.brforeMount: 挂在之前,$el和data都初始化了<br>4.mounted: Vue实例挂载完成了</blockquote>
<blockquote>注意: beforeMount红色矩形框里是"{{"message"}}",mounted的红矩形框里是xuxiao is boy,说明挂载前$el的值为'虚拟'的元素节点,挂载后'虚拟'的Dom节点被真实的Dom节点替换</blockquote>
<h2 id="articleHeader3">数据更新(update)</h2>
<blockquote>在控制台里输入app.message = '数据更新'后</blockquote>
<p>如下图<br><span class="img-wrap"><img data-src="/img/bVOLuG?w=440&amp;h=801" src="https://static.alili.tech/img/bVOLuG?w=440&amp;h=801" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote>由此可见,当data数据变化时只会触发update</blockquote>
<h2 id="articleHeader4">Vue实例解耦(destroy)</h2>
<blockquote>在控制台里输入app.$destroy();<br>如下图<br><span class="img-wrap"><img data-src="/img/bVOLxY?w=502&amp;h=822" src="https://static.alili.tech/img/bVOLxY?w=502&amp;h=822" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>
</blockquote>
<p>由图知:</p>
<blockquote>执行完destroy操作后,data里的数据没有变化,但是Dom结构还存在,也就是Vue实例不再受控制了,完成了解耦</blockquote>
<h1 id="articleHeader5">生命周期和钩子函数-总结</h1>
<p>如下图<br>这是把官方  Vue 2.0 生命周期的图例简化后的</p>
<p><span class="img-wrap"><img data-src="/img/bVOLGM?w=701&amp;h=573" src="https://static.alili.tech/img/bVOLGM?w=701&amp;h=573" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">生命周期钩子函数使用</h3>
<blockquote>beforecreate : 举个栗子：可以在这加个loading事件 <br>created ：在这结束loading，还做一些初始化，实现函数自执行 <br>mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情<br>beforeDestory： 你确认删除XX吗？ destoryed ：当前组件已被删除，清空相关内容</blockquote>
<h1 id="articleHeader7">最后的寄语</h1>
<p>第一次在segmentfault写东西,写的不对的地方请多多见谅,也请帮我指正出来!</p>
<h1 id="articleHeader8">参考文章</h1>
<blockquote>
<a href="https://segmentfault.com/a/1190000008010666#articleHeader3">https://segmentfault.com/a/11...</a><br><a href="http://www.cnblogs.com/gagag/p/6246493.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/gagag/...</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2.0 浅谈--生命周期和钩子函数

## 原文链接
[https://segmentfault.com/a/1190000009677699](https://segmentfault.com/a/1190000009677699)

