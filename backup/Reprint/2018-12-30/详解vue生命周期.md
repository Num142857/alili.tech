---
title: '详解vue生命周期' 
date: 2018-12-30 2:30:10
hidden: true
slug: 3nqua7ikz7p
categories: [reprint]
---

{{< raw >}}

                    
<p>首先，每个Vue实例在被<strong>创建</strong>之前都要经过一系列的初始化过程,这个过程就是vue的生命周期。首先看一张图吧~这是官方文档上的图片相信大家一定都会很熟悉：</p>
<p><span class="img-wrap"><img data-src="/img/bVVORa?w=1200&amp;h=3039" src="https://static.alili.tech/img/bVVORa?w=1200&amp;h=3039" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到在vue一整个的生命周期中会有很多<strong>钩子函数</strong>提供给我们在vue生命周期不同的时刻进行操作, 那么先列出所有的钩子函数，然后我们再一一详解:</p>
<ul>
<li><strong>beforeCreate</strong></li>
<li><strong>created</strong></li>
<li><strong>beforeMount</strong></li>
<li><strong>mounted</strong></li>
<li><strong>beforeUpdate</strong></li>
<li><strong>updated</strong></li>
<li><strong>beforeDestroy</strong></li>
<li><strong>destroyed</strong></li>
</ul>
<p>先来一波代码，各位复制在浏览器中运行，打开console查看就行了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>vue生命周期学习</title>
  <script src=&quot;https://cdn.bootcss.com/vue/2.4.2/vue.js&quot;></script>
</head>
<body>
  <div id=&quot;app&quot;>
    <h1>"{{"message"}}"</h1>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    data: {
      message: 'Vue的生命周期'
    },
    beforeCreate: function() {
      console.group('------beforeCreate创建前状态------');
      console.log(&quot;%c%s&quot;, &quot;color:red&quot; , &quot;el     : &quot; + this.$el); //undefined
      console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); //undefined 
      console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message) 
    },
    created: function() {
      console.group('------created创建完毕状态------');
      console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + this.$el); //undefined
      console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); //已被初始化 
      console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message); //已被初始化
    },
    beforeMount: function() {
      console.group('------beforeMount挂载前状态------');
      console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;el     : &quot; + (this.$el)); //已被初始化
      console.log(this.$el);
      console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;data   : &quot; + this.$data); //已被初始化  
      console.log(&quot;%c%s&quot;, &quot;color:red&quot;,&quot;message: &quot; + this.message); //已被初始化  
    },
    mounted: function() {
      console.group('------mounted 挂载结束状态------');
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
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue生命周期学习<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.4.2/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">message</span>: <span class="hljs-string">'Vue的生命周期'</span>
    },
    <span class="hljs-attr">beforeCreate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'------beforeCreate创建前状态------'</span>);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span> , <span class="hljs-string">"el     : "</span> + <span class="hljs-keyword">this</span>.$el); <span class="hljs-comment">//undefined</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"data   : "</span> + <span class="hljs-keyword">this</span>.$data); <span class="hljs-comment">//undefined </span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"message: "</span> + <span class="hljs-keyword">this</span>.message) 
    },
    <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'------created创建完毕状态------'</span>);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"el     : "</span> + <span class="hljs-keyword">this</span>.$el); <span class="hljs-comment">//undefined</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"data   : "</span> + <span class="hljs-keyword">this</span>.$data); <span class="hljs-comment">//已被初始化 </span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"message: "</span> + <span class="hljs-keyword">this</span>.message); <span class="hljs-comment">//已被初始化</span>
    },
    <span class="hljs-attr">beforeMount</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'------beforeMount挂载前状态------'</span>);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"el     : "</span> + (<span class="hljs-keyword">this</span>.$el)); <span class="hljs-comment">//已被初始化</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"data   : "</span> + <span class="hljs-keyword">this</span>.$data); <span class="hljs-comment">//已被初始化  </span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"%c%s"</span>, <span class="hljs-string">"color:red"</span>,<span class="hljs-string">"message: "</span> + <span class="hljs-keyword">this</span>.message); <span class="hljs-comment">//已被初始化  </span>
    },
    <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'------mounted 挂载结束状态------'</span>);
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
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>运行后打开console可以看到打印出来内容如下:</p>
<p><span class="img-wrap"><img data-src="/img/bVVT3m?w=938&amp;h=448" src="https://static.alili.tech/img/bVVT3m?w=938&amp;h=448" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到一个vue实例在创建过程中调用的几个生命周期钩子。</p>
<h5><strong>1. 在beforeCreate和created钩子函数之间的生命周期</strong></h5>
<p>在这个生命周期之间，进行<strong>初始化事件，进行数据的观测</strong>，可以看到在<strong>created</strong>的时候数据已经和<strong>data属性进行绑定</strong>（放在data中的属性当值发生改变的同时，视图也会改变）。<br>注意看下：此时还是没有el选项</p>
<h5><strong>2. created钩子函数和beforeMount间的生命周期</strong></h5>
<p><span class="img-wrap"><img data-src="/img/bVVUb9?w=571&amp;h=509" src="https://static.alili.tech/img/bVVUb9?w=571&amp;h=509" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>在这一阶段发生的事情还是比较多的。</p>
<p>首先会判断对象是否有<strong>el选项</strong>。<strong>如果有的话就继续向下编译，如果没有</strong>el选项<strong>，则停止编译，也就意味着停止了生命周期，直到在该vue实例上调用vm.$mount(el)。</strong>此时注释掉代码中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el: '#app'," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">el:</span> <span class="hljs-string">'#app'</span>,</code></pre>
<p>然后运行可以看到到created的时候就停止了：</p>
<p><span class="img-wrap"><img data-src="/img/bVVUB3?w=764&amp;h=285" src="https://static.alili.tech/img/bVVUB3?w=764&amp;h=285" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果我们在后面继续调用vm.$mount(el),可以发现代码继续向下执行了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.$mount(el) //这个el参数就是挂在的dom接点" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">vm</span>.$mount(<span class="hljs-keyword">el</span>) //这个<span class="hljs-keyword">el</span>参数就是挂在的dom接点</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVVUCG?w=691&amp;h=441" src="https://static.alili.tech/img/bVVUCG?w=691&amp;h=441" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后，我们往下看，<strong>template</strong>参数选项的有无对生命周期的影响。<br>（1）.如果vue实例对象中有template参数选项，则将其作为模板编译成render函数。<br>（2）.如果没有template选项，则将外部HTML作为模板编译。<br>（3）.可以看到template中的模板优先级要高于outer HTML的优先级。<br>修改代码如下, 在HTML结构中增加了一串html，在vue对象中增加了<strong>template选项</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>vue生命周期学习</title>
  <script src=&quot;https://cdn.bootcss.com/vue/2.4.2/vue.js&quot;></script>
</head>
<body>
  <div id=&quot;app&quot;>
    <!--html中修改的-->
    <h1>"{{"message + '这是在outer HTML中的'"}}"</h1>
  </div>
</body>
<script>
  var vm = new Vue({
    el: '#app',
    template: &quot;<h1>"{{"message +'这是在template中的'"}}"</h1>&quot;, //在vue配置项中修改的
    data: {
      message: 'Vue的生命周期'
    }
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs handlebars"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue生命周期学习<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.4.2/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--html中修改的--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"message + '这是在outer HTML中的'"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    template: <span class="hljs-string">"&lt;h1&gt;</span></span></span><span class="hljs-template-variable">"{{"message +'这是在<span class="hljs-builtin-name">template</span>中的'"}}"</span><span class="xml"><span class="handlebars"><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>", //在vue配置项中修改的
    data: {
      message: 'Vue的生命周期'
    }
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>执行后的结果可以看到在页面中显示的是：</p>
<p><span class="img-wrap"><img data-src="/img/bVVUJT?w=910&amp;h=118" src="https://static.alili.tech/img/bVVUJT?w=910&amp;h=118" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>那么将vue对象中template的选项注释掉后打印如下信息：</p>
<p><span class="img-wrap"><img data-src="/img/bVVUJ3?w=717&amp;h=97" src="https://static.alili.tech/img/bVVUJ3?w=717&amp;h=97" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这下就可以想想什么<strong>el的判断</strong>要在template之前了~是因为vue需要通过el找到对应的outer template。</p>
<p>在vue对象中还有一个<strong>render函数</strong>，它是以createElement作为参数，然后做渲染操作，而且我们可以直接嵌入JSX.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '#app',
    render: function(createElement) {
        return createElement('h1', 'this is createElement')
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
    <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
    render: <span class="hljs-built_in">function</span>(createElement) {
        return <span class="hljs-built_in">createElement</span>(<span class="hljs-string">'h1'</span>, <span class="hljs-string">'this is createElement'</span>)
    }
})</code></pre>
<p>可以看到页面中渲染的是：</p>
<p><span class="img-wrap"><img data-src="/img/bVVUSo?w=477&amp;h=76" src="https://static.alili.tech/img/bVVUSo?w=477&amp;h=76" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>所以综合排名优先级：<br>render函数选项 &gt; template选项 &gt; outer HTML.</p>
<h5><strong>3. beforeMount和mounted 钩子函数间的生命周期</strong></h5>
<p><span class="img-wrap"><img data-src="/img/bVVUTK?w=451&amp;h=198" src="https://static.alili.tech/img/bVVUTK?w=451&amp;h=198" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到此时是给vue实例对象添加<strong>$el成员</strong>，并且替换掉挂在的DOM元素。因为在之前console中打印的结果可以看到<strong>beforeMount</strong>之前el上还是undefined。</p>
<h4><strong>4. mounted</strong></h4>
<p>注意看下面截图：</p>
<p><span class="img-wrap"><img data-src="/img/bVVUYC?w=424&amp;h=274" src="https://static.alili.tech/img/bVVUYC?w=424&amp;h=274" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>在mounted之前h1中还是通过<strong>"{{"message"}}"</strong>进行占位的，因为此时还有挂在到页面上，还是JavaScript中的虚拟DOM形式存在的。在mounted之后可以看到h1中的内容发生了变化。</p>
<h5><strong>5. beforeUpdate钩子函数和updated钩子函数间的生命周期</strong></h5>
<p><span class="img-wrap"><img data-src="/img/bVVU0E?w=558&amp;h=295" src="https://static.alili.tech/img/bVVU0E?w=558&amp;h=295" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>当vue发现data中的数据发生了改变，会<strong>触发对应组件的重新渲染</strong>，先后调用<strong>beforeUpdate</strong>和<strong>updated</strong>钩子函数。我们在console中输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.message = '触发组件更新'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">vm<span class="hljs-selector-class">.message</span> = <span class="hljs-string">'触发组件更新'</span></code></pre>
<p>发现触发了组件的更新：</p>
<p><span class="img-wrap"><img data-src="/img/bVVU55?w=500&amp;h=356" src="https://static.alili.tech/img/bVVU55?w=500&amp;h=356" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h5><strong>6.beforeDestroy和destroyed钩子函数间的生命周期</strong></h5>
<p><span class="img-wrap"><img data-src="/img/bVVU6C?w=383&amp;h=368" src="https://static.alili.tech/img/bVVU6C?w=383&amp;h=368" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>beforeDestroy</strong>钩子函数在实例销毁之前调用。在这一步，实例仍然完全可用。<br><strong>destroyed</strong>钩子函数在Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。</p>
<p>本文是个人对vue的生命周期的理解，有什么不对的地方还请大牛多多指点~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解vue生命周期

## 原文链接
[https://segmentfault.com/a/1190000011381906](https://segmentfault.com/a/1190000011381906)

