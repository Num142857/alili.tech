---
title: 'Vue2.0 探索之路——生命周期和钩子函数的一些理解' 
date: 2019-01-25 2:30:23
hidden: true
slug: q9pm4d4b3x
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在使用vue一个多礼拜后，感觉现在还停留在初级阶段，虽然知道怎么和后端做数据交互，但是对于<code>mounted</code>这个挂载还不是很清楚的。放大之，对<code>vue</code>的生命周期不甚了解。只知道简单的使用，而不知道为什么，这对后面的踩坑是相当不利的。</p>
<p>因为我们有时候会在几个钩子函数里做一些事情，什么时候做，在哪个函数里做，我们不清楚。</p>
<p>于是我开始先去搜索，发现<code>vue2.0</code>的生命周期没啥文章。大多是<code>1.0</code>的版本介绍。最后还是找到一篇不错的（会放在最后）</p>
<h2 id="articleHeader1">vue生命周期简介</h2>
<p><span class="img-wrap"><img data-src="/img/bVEo3w?w=1200&amp;h=2800" src="https://static.alili.tech/img/bVEo3w?w=1200&amp;h=2800" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVEs9x?w=847&amp;h=572" src="https://static.alili.tech/img/bVEs9x?w=847&amp;h=572" alt="f847b38a-63fe-11e6-9c29-38e58d46f036.png" title="f847b38a-63fe-11e6-9c29-38e58d46f036.png" style="cursor: pointer; display: inline;"></span></p>
<p>咱们从上图可以很明显的看出现在<code>vue2.0</code>都包括了哪些生命周期的函数了。</p>
<h2 id="articleHeader2">生命周期探究</h2>
<p>对于执行顺序和什么时候执行，看上面两个图基本有个了解了。下面我们将结合代码去看看钩子函数的执行。</p>
<blockquote>ps:下面代码可以直接复制出去执行</blockquote>
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
<h3 id="articleHeader3">create 和 mounted 相关</h3>
<p>咱们在<code>chrome</code>浏览器里打开，<code>F12</code>看<code>console</code>就能发现</p>
<blockquote>
<code>beforecreated</code>：el 和 data 并未初始化  <br><code>created</code>:完成了 data 数据的初始化，el没有<br><code>beforeMount</code>：完成了 el 和 data 初始化 <br><code>mounted</code> ：完成挂载<p>另外在标红处，我们能发现el还是 "{{"message"}}"，这里就是应用的 <code>Virtual DOM</code>（虚拟Dom）技术，先把坑占住了。到后面<code>mounted</code>挂载的时候再把值渲染进去。</p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVHMfj?w=588&amp;h=475" src="https://static.alili.tech/img/bVHMfj?w=588&amp;h=475" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">update 相关</h3>
<p>这里我们在 chrome console里执行以下命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.message= 'yes !! I do';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">app.message= <span class="hljs-symbol">'yes</span> !! I <span class="hljs-keyword">do</span>';</code></pre>
<p>下面就能看到data里的值被修改后，将会触发update的操作。</p>
<p><span class="img-wrap"><img data-src="/img/bVHMfY?w=584&amp;h=609" src="https://static.alili.tech/img/bVHMfY?w=584&amp;h=609" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h4>destroy 相关</h4>
<p>有关于销毁，暂时还不是很清楚。我们在console里执行下命令对 vue实例进行销毁。销毁完成后，我们再重新改变message的值，vue不再对此动作进行响应了。但是原先生成的dom元素还存在，可以这么理解，执行了destroy操作，后续就不再受vue控制了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.$destroy();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">app</span>.<span class="hljs-variable">$destroy</span>();</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVHMgS?w=659&amp;h=625" src="https://static.alili.tech/img/bVHMgS?w=659&amp;h=625" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">生命周期总结</h2>
<p>这么多钩子函数，我们怎么用呢，我想大家可能有这样的疑问吧，我也有，哈哈哈。</p>
<blockquote>
<code>beforecreate</code> : 举个栗子：可以在这加个loading事件 <br><code>created</code> ：在这结束loading，还做一些初始化，实现函数自执行 <br><code>mounted</code> ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情<br><code>beforeDestroy</code>： 你确认删除XX吗？  destroyed ：当前组件已被删除，清空相关内容</blockquote>
<p>当然，还有更多，继续探索中......</p>
<h2 id="articleHeader6">写在最后</h2>
<p>本文是一个vue的生命周期的理解，如有错误还请大牛指正，让小子也有得进步。<br>如果对你有所帮助，那是我最大的荣幸。 </p>
<p>对了，兄台，对你有帮助的话不妨点个收藏或者推荐再走。</p>
<p><span class="img-wrap"><img data-src="/img/bVEDKF?w=180&amp;h=180" src="https://static.alili.tech/img/bVEDKF?w=180&amp;h=180" alt="3477288873-5808ad0a8d62c_articlex" title="3477288873-5808ad0a8d62c_articlex" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">参考文献</h2>
<blockquote>
<a href="https://segmentfault.com/q/1010000007704114?_ea=1431323">https://segmentfault.com/q/10...</a><br><a href="http://www.cnblogs.com/gagag/p/6246493.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/gagag/...</a>
</blockquote>
<p>感谢上面几位兄台的文章和提问。</p>
<blockquote>
<strong>另外新写了篇 <code>vuex</code> 的文章，欢迎各位给点意见。传送门：<a href="https://segmentfault.com/a/1190000008861913">Vue2.0 探索之路——vuex入门教程和思考</a></strong><br><strong>新写了篇 <code>vue-router</code>的文章，也欢迎各位给点意见。传送门:<a href="https://segmentfault.com/a/1190000009651628" target="_blank">Vue2.0 探索之路——vue-router入门教程和总结</a></strong><p><strong>最近更新文章:</strong><br><a href="https://segmentfault.com/a/1190000011683741?_ea=2727402"><strong>Node环境变量 process.env 的那些事儿</strong></a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0 探索之路——生命周期和钩子函数的一些理解

## 原文链接
[https://segmentfault.com/a/1190000008010666](https://segmentfault.com/a/1190000008010666)

