---
title: 'Vuejs的一些总结' 
date: 2019-02-08 2:30:40
hidden: true
slug: igb8mr9kw6l
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接：<a href="http://mrzhang123.github.io/2016/07/14/summarize-vue/" rel="nofollow noreferrer" target="_blank">http://mrzhang123.github.io/2016/07/14/summarize-vue/</a></p>
<h3 id="articleHeader0">本文基于<code>vue1.x</code>
</h3>
<h3 id="articleHeader1">基于<code>vue2.x&amp;webpack2.x</code>请移步至</h3>
<p><a href="https://segmentfault.com/a/1190000008279436">Vue2.x踩坑与总结</a><br><a href="https://segmentfault.com/a/1190000008279459" target="_blank">Webpack2.x踩坑与总结</a></p>
<blockquote><p>最近一段时间忙着工作的一些事情，同时自己也在试着把项目中的一些移动端页面试着用vuejs重写，所以没时间写文章，今天终于有空可以写一下，由于页面并没有写完，所以就将自己这几天做页面的时候遇到的一些问题总结了一下。其实很多在官网都能找到，但是我们只看官网教程不去写，很难理解到底是什么意思，这里我把我用到的列出来。</p></blockquote>
<p>文章中提到的很多东西都在我的demo中用到，我的demo地址：<a href="https://github.com/MrZhang123/Vue_project/tree/master/vue1.x" rel="nofollow noreferrer" target="_blank">https://github.com/MrZhang123...</a></p>
<h2 id="articleHeader2">1.Vuejs组件</h2>
<p>vuejs构建组件使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('componentName',{ /*component*/ })；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">Vue.component(<span class="hljs-string">'componentName'</span>,{ <span class="hljs-comment">/*component*/</span> })；</code></pre>
<p>这里注意一点，组件要先注册再使用，也就是说：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('mine',{
           template:'#mineTpl',
           props:['name','title','city','content']
        });

 var v=new Vue({
      el:'#vueInstance',
      data:{
          name:'zhang',
          title:'this is title',
         city:'Beijing',
         content:'these are some desc about Blog'
     }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'mine'</span>,{
           <span class="hljs-attr">template</span>:<span class="hljs-string">'#mineTpl'</span>,
           <span class="hljs-attr">props</span>:[<span class="hljs-string">'name'</span>,<span class="hljs-string">'title'</span>,<span class="hljs-string">'city'</span>,<span class="hljs-string">'content'</span>]
        });

 <span class="hljs-keyword">var</span> v=<span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>:<span class="hljs-string">'#vueInstance'</span>,
      <span class="hljs-attr">data</span>:{
          <span class="hljs-attr">name</span>:<span class="hljs-string">'zhang'</span>,
          <span class="hljs-attr">title</span>:<span class="hljs-string">'this is title'</span>,
         <span class="hljs-attr">city</span>:<span class="hljs-string">'Beijing'</span>,
         <span class="hljs-attr">content</span>:<span class="hljs-string">'these are some desc about Blog'</span>
     }
});</code></pre>
<p>如果反过来会报错，因为反过来代表先使用了组件的，但是组件却没注册。</p>
<blockquote><p>webpack报错后，使用<code>webpack --display-error-details</code>可以排错</p></blockquote>
<h2 id="articleHeader3">2.指令keep-alive</h2>
<p>在看demo的时候看到在vue-router写着<code>keep-alive</code>，<code>keep-alive</code>的含义：<br>如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个keep-alive指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<component :is='curremtView' keep-alive></component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;component :is=<span class="hljs-string">'curremtView'</span> keep-alive&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span></span></code></pre>
<h2 id="articleHeader4">3.如何让css只在当前组件中起作用</h2>
<p>在每一个vue组件中都可以定义各自的css，js，如果希望组件内写的css只对当前组件起作用，只需要在<code>style</code>中写入<code>scoped</code>，即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped></style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">style</span> <span class="hljs-selector-tag">scoped</span>&gt;&lt;/<span class="hljs-selector-tag">style</span>&gt;</code></pre>
<h2 id="articleHeader5">4.vuejs循环插入图片</h2>
<p>在写循环的时候，写入如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;bio-slide&quot; v-for=&quot;item in items&quot;>   
    <img src=&quot;"{{"item.image"}}"&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bio-slide"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>&gt;</span>   
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""{{"item.image"}}""</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>此时在控制台会出现警告<br><code>[Vue Warn]: src=""{{"item.image"}}"": interpolation in "src" attribute will cause a 404 request. Use v-bind:src instead.</code>这里意思是在“src”属性插值将导致404请求。使用v-bind：src代替。<br>所以替换成如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;bio-slide&quot; v-for=&quot;item in items&quot;>   
    <img v-bind:src=&quot;item.image&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bio-slide"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>&gt;</span>   
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-bind:src</span>=<span class="hljs-string">"item.image"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这里需要主要，v-bind在写的时候不能再用"{{""}}"，根据官方的说法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a v-bind:href=&quot;url&quot;></a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-bind:href</span>=<span class="hljs-string">"url"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<blockquote><p>这里<code> href </code>是参数，它告诉 <code>v-bind </code>指令将元素的 <code>href </code>特性跟表达式 url 的值绑定。可能你已注意到可以用特性插值<code> href=""{{"url"}}""</code> 获得同样的结果：这样没错，并且实际上在内部特性插值会转为<code> v-bind</code> 绑定。</p></blockquote>
<h2 id="articleHeader6">5.绑定value到Vue实例的一个动态属性上</h2>
<p>对于单选按钮，勾选框及选择框选项，<code>v-model</code>绑定的value通常是静态字符串（对于勾选框是逻辑值）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- `toggle` 为 true 或 false -->
<input type=&quot;checkbox&quot; v-model=&quot;toggle&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- `toggle` 为 true 或 false --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"toggle"</span>&gt;</span></code></pre>
<p>但是有时候想绑定value到vue实例的一个动态属性上，这时可以用<code>v-bind</code>实现，并且这个属性的值可以不是字符串。例如绑定Checkbox的value到vue实例的一个动态属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input 
    type=&quot;checkbox&quot;
    v-model=&quot;toggle&quot;
    v-bind:true-value=&quot;a&quot;
    v-bind:false-value=&quot;b&quot;>
<p>"{{"toggle"}}"</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> 
    <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>
    <span class="hljs-attr">v-model</span>=<span class="hljs-string">"toggle"</span>
    <span class="hljs-attr">v-bind:true-value</span>=<span class="hljs-string">"a"</span>
    <span class="hljs-attr">v-bind:false-value</span>=<span class="hljs-string">"b"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{"toggle"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>这里绑定后，并不是说就可以点击后由<code>true</code>,<code>false</code>的切换变为<code>a</code>,<code>b</code>的切换，因为这里定义的动态a，b是scope上的a,b，并不能直接显示出来，此时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//当选中时
vm.toggle === vm.a
//当没选中时
vm.toggle === vm.b" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//当选中时</span>
vm.toggle === vm.a
<span class="hljs-comment">//当没选中时</span>
vm.toggle === vm.b</code></pre>
<p>所以此时需要在data中定义a,b，即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el:'...',
    data:{
        a:'a',
        b:'b'    
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">'...'</span>,
    <span class="hljs-attr">data</span>:{
        <span class="hljs-attr">a</span>:<span class="hljs-string">'a'</span>,
        <span class="hljs-attr">b</span>:<span class="hljs-string">'b'</span>    
    }
});</code></pre>
<h2 id="articleHeader7">6.片段实例</h2>
<p>下面几种情况会让实例变成一个片断实例：</p>
<ol>
<li><p>模板包含多个顶级元素。</p></li>
<li><p>模板只包含普通文本。</p></li>
<li><p>模板只包含其它组件（其它组件可能是一个片段实例）。</p></li>
<li><p>模板只包含一个元素指令，如<code>&lt;partial&gt;</code> 或<code> vue-router</code> 的 <code>&lt;router-view&gt;</code>。</p></li>
<li><p>模板根节点有一个流程控制指令，如<code> v-if </code>或<code> v-for</code>。</p></li>
</ol>
<p>这些情况让实例有未知数量的顶级元素，它将把它的 DOM 内容当作片断。片断实例仍然会正确地渲染内容。不过，它<strong>没有</strong>一个根节点，它的<code>$el</code> 指向一个锚节点，即一个空的文本节点（在开发模式下是一个注释节点）。<br>但是更重要的是，<strong>组件元素上的非流程控制指令，非 prop 特性和过渡将被忽略</strong>，因为没有根元素供绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 不可以，因为没有根元素 -->
<example v-show=&quot;ok&quot; transition=&quot;fade&quot;></example>
 
<!-- props 可以 -->
<example :prop=&quot;someData&quot;></example>
 
<!-- 流程控制可以，但是不能有过渡 -->
<example v-if=&quot;ok&quot;></example>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 不可以，因为没有根元素 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">example</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"ok"</span> <span class="hljs-attr">transition</span>=<span class="hljs-string">"fade"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">example</span>&gt;</span>
 
<span class="hljs-comment">&lt;!-- props 可以 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">example</span> <span class="hljs-attr">:prop</span>=<span class="hljs-string">"someData"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">example</span>&gt;</span>
 
<span class="hljs-comment">&lt;!-- 流程控制可以，但是不能有过渡 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">example</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"ok"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">example</span>&gt;</span></code></pre>
<p><strong>片段实例</strong>也有用处，但是通常情况下组件有一个根节点比较好，它会保证组件元素上的指令和特性能正确的转换，同时性能也稍微好些。</p>
<h2 id="articleHeader8">7.路由嵌套</h2>
<p><strong>路由嵌套会将其他组件渲染到该组件内，而不是进行整个页面跳转</strong><code>router-view</code>本身就是将组件渲染到该位置，想要进行页面跳转，就要将页面渲染到根组件，在起始配置路由时候写到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var App = Vue.extend({ root });
router.start(App,'#app');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> App = Vue.extend({ root });
router.start(App,<span class="hljs-string">'#app'</span>);</code></pre>
<p>这里首先将根组件注册进来，用于将路由中配置好的各个页面渲染出来，然后将根组件挂载到与#app匹配的元素上。</p>
<h2 id="articleHeader9">8.实现多个根据不同条件显示不同文字的方法</h2>
<p><code>v-if</code>,<code>v-else</code>可以实现条件选择，但是如果是多个连续的条件选择，则需要用到计算属性<code>computed</code>。例如实现当输入框中什么都没写的时候显示字符串‘empty’,否则显示输入框中的内容，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;test&quot;>
  <input type=&quot;text&quot; v-model=&quot;inputValue&quot;>
  <h1>"{{"changeVaule"}}"</h1>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"inputValue"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{"changeVaule"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el:'#test',
  data:{
    changeVaule:'123'
  },
  computed :{
    changeVaule:function(){
      if(this.inputValue!==''){
        return this.inputValue;
      }else{
        return 'empty';
      }
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>:<span class="hljs-string">'#test'</span>,
  <span class="hljs-attr">data</span>:{
    <span class="hljs-attr">changeVaule</span>:<span class="hljs-string">'123'</span>
  },
  <span class="hljs-attr">computed</span> :{
    <span class="hljs-attr">changeVaule</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.inputValue!==<span class="hljs-string">''</span>){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.inputValue;
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">'empty'</span>;
      }
    }
  }
});</code></pre>
<h2 id="articleHeader10">9.Vuejs在变化检测问题</h2>
<h4>1.检测数组</h4>
<p>由于javascript的限制，vuejs不能检测到下面数组的变化：</p>
<ol>
<li><p>直接索引设置元素，如<code>vm.item[0]={}</code>;</p></li>
<li><p>修改数据的长度，如<code>vm.item.length</code>。</p></li>
</ol>
<p>为了解决问题1，Vuejs扩展了观察数组，为它添加一个<code>$set()</code>方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 与 `example1.items[0] = ...` 相同，但是能触发视图更新
example1.items.$set(0, { childMsg: 'Changed!'})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 与 `example1.items[0] = ...` 相同，但是能触发视图更新</span>
example1.items.$set(<span class="hljs-number">0</span>, { <span class="hljs-attr">childMsg</span>: <span class="hljs-string">'Changed!'</span>})</code></pre>
<p>问题2，需要一个空数组替换<code>items</code>。</p>
<p>除了<code>$set()</code>，vuejs也为观察数组添加了<code>$remove()</code>方法，用于从目标数组中查找并删除元素，在内部调用了<code>splice()</code>。因此，不必：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var index = this.items.indexOf(item)
if (index !== -1) {
  this.items.splice(index, 1)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.items.indexOf(item)
<span class="hljs-keyword">if</span> (index !== <span class="hljs-number">-1</span>) {
  <span class="hljs-keyword">this</span>.items.splice(index, <span class="hljs-number">1</span>)
}</code></pre>
<p>只需：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.items.$remove(item);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.items.$remove(item);</code></pre>
<h4>2.检测对象</h4>
<p>受ES5的显示，Vuejs<strong>不能检测到对象属性的添加或删除</strong>。因为Vuejs在初始化时候将属性转化为<code>getter/setter</code>，所以属性必须在<code>data</code>对象才能让Vuejs转换它，才能让它是响应的，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = { a: 1 }
var vm = new Vue({
  data: data
})
// `vm.a` 和 `data.a` 现在是响应的
 
vm.b = 2
// `vm.b` 不是响应的
 
data.b = 2
// `data.b` 不是响应的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> data = { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }
<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">data</span>: data
})
<span class="hljs-comment">// `vm.a` 和 `data.a` 现在是响应的</span>
 
vm.b = <span class="hljs-number">2</span>
<span class="hljs-comment">// `vm.b` 不是响应的</span>
 
data.b = <span class="hljs-number">2</span>
<span class="hljs-comment">// `data.b` 不是响应的</span></code></pre>
<p>不过，有办法在实例创建之后添加属性并且让它是响应的。对于Vue实例，可以使用<code>$set(key,value)</code>实例方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vm.$set('b', 2)
// `vm.b` 和 `data.b` 现在是响应的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">vm.$set(<span class="hljs-string">'b'</span>, <span class="hljs-number">2</span>)
<span class="hljs-comment">// `vm.b` 和 `data.b` 现在是响应的</span></code></pre>
<p>对于普通数据对象，可以使用全局方法<code>Vue.set(object, key, value)</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.set(data, 'c', 3)
// `vm.c` 和 `data.c` 现在是响应的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.set(data, <span class="hljs-string">'c'</span>, <span class="hljs-number">3</span>)
<span class="hljs-comment">// `vm.c` 和 `data.c` 现在是响应的</span></code></pre>
<p>有时你想向已有对象上添加一些属性，例如使用 <code>Object.assign()</code> 或 <code>_.extend()</code> 添加属性。但是，添加到对象上的新属性不会触发更新。这时可以创建一个新的对象，包含原对象的属性和新的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不使用 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 不使用 `Object.assign(this.someObject, { a: 1, b: 2 })`</span>
<span class="hljs-keyword">this</span>.someObject = <span class="hljs-built_in">Object</span>.assign({}, <span class="hljs-keyword">this</span>.someObject, { <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> })</code></pre>
<h2 id="articleHeader11">10.关于vuejs页面闪烁<code>"{{"message"}}"</code>
</h2>
<p>在vuejs指令中有<code>v-cloak</code>，这个指令保持在元素上直到关联实例结束编译。和CSS规则如<code>[v-cloak]{display:none}</code>一起用时，这个指令可以隐藏未编译的Mustache标签直到实例准备完毕。用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[v-cloak]{
    display:none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-attr">[v-cloak]</span>{
    <span class="hljs-attribute">display</span>:none;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-cloak>"{{"message"}}"</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-cloak</span>&gt;</span>"{{"message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这样<code>&lt;div&gt;</code>不会显示，直到编译结束</p>
<h2 id="articleHeader12">11.关于在<code>v-for</code>循环时候<code>v-model</code>的使用</h2>
<p>有时候需要循环生成<code>input</code>，用<code>v-model</code>绑定后，利用vuejs操作它，此时我们可以在<code>v-model</code>中写一个数组<code>selected[$index]</code>，这样就可以给不同的input绑定不同的<code>v-model</code>，从而分别操作他们。这个我在demo中的dataBind.vue中用到。</p>
<h2 id="articleHeader13">12.vuejs中过渡动画</h2>
<p>在vuejs中，css定义动画：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .zoom-transition{
        width:60%;
        height:auto;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }
    .zoom-enter, .zoom-leave{
        width:150px;
        height:auto;
        position: absolute;
        left:20px;
        top:20px;
        transform: translate(0,0);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">  <span class="hljs-selector-class">.zoom-transition</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">60%</span>;
        <span class="hljs-attribute">height</span>:auto;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%,-50%);
        <span class="hljs-attribute">-webkit-transition</span>: all .<span class="hljs-number">3s</span> ease;
        <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span> ease;
    }
    <span class="hljs-selector-class">.zoom-enter</span>, <span class="hljs-selector-class">.zoom-leave</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">150px</span>;
        <span class="hljs-attribute">height</span>:auto;
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">left</span>:<span class="hljs-number">20px</span>;
        <span class="hljs-attribute">top</span>:<span class="hljs-number">20px</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0,0);
    }</code></pre>
<p>其中动画在定的时候要注意上下对应，上面有什么，下面有什么，都要变化的，如果有不变化的，应该抽离出去，作为公共css样式，在上面的css中，如果我只写<code> transform: translate(-50%,-50%);</code>而不写下面的<code>transform: translate(0,0);</code>则会导致上面的<code>transform: translate(-50%,-50%);</code>被添加到下面，认为这个是不变的。</p>
<h2 id="articleHeader14">13.指令v-el的使用</h2>
<p>有时候我们想就像使用jquery那样去访问一个元素，此时就可以使用<code>v-el</code>指令，去给这个元素注册一个索引，方便通过所属实例的<code>$el</code>访问这个元素。<br><strong>注意</strong><br>HTML不区分大小写，所以<code>v-el:someEl</code>将转换为全小写。可以用<code>v-el:some-el</code>然后设置<code>this.$el.someEl</code>。<br><strong>示例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span v-el:msg>hello</span>
<span v-el:other-msg>world</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-el:msg</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-el:other-msg</span>&gt;</span>world<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$els.msg.textContent // -> &quot;hello&quot;
this.$els.otherMsg.textContent // -> &quot;world&quot;
this.$els.msg //-><span>hello</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">this</span>.$els.msg.textContent <span class="hljs-comment">// -&gt; "hello"</span>
<span class="hljs-keyword">this</span>.$els.otherMsg.textContent <span class="hljs-comment">// -&gt; "world"</span>
<span class="hljs-keyword">this</span>.$els.msg <span class="hljs-comment">//-&gt;&lt;span&gt;hello&lt;/span&gt;</span></code></pre>
<h2 id="articleHeader15">14.关于vuejs中使用事件名</h2>
<p>在vuejs中，我们经常要绑定一些事件，有时候给DOM元素绑定，有时候给组件绑定。绑定事件在HTML中用<code>v-on:click-"event"</code>,这时evet的名字不要出现大写，因为在1.x中不区分大小写，所以如果我们在HTML写<code>v-on:click="myEvent"</code>而在js中写<code>myEvent</code>就出错误，所以在vuejs的1.x绑定事件时候，要尽量避免使用大写字母。在2.0中没有该限制！</p>
<h2 id="articleHeader16">15.v-if与v-show的区别</h2>
<p><code>v-if</code>直接不渲染这个DOM元素，而<code>v-show</code>是会渲染DOM元素，只是使用<code>display:none</code>隐藏，打开开发者工具可以看到该DOM</p>
<h2 id="articleHeader17">16.关于<code>transition</code>全局钩子如何在组件中使用</h2>
<p><code>Vue.transition</code>是定义一个全局<code>transition</code>钩子的，如果想针对组件定义，则需要如下写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default{
    transition:{
        'fade':{
            enter() {},
            leave() {}
       }
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">transition</span>:{
        <span class="hljs-string">'fade'</span>:{
            enter() {},
            leave() {}
       }
   }
}</code></pre>
<p>这样<code>fade</code>这个过度钩子只会作用于组件内，如果同时有同名的全局钩子，则会优先使用组建定义的</p>
<h2 id="articleHeader18">17.利用<code>vue-router</code>如何实现组件在渲染出来前执行某个事件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default{
    data(){
        return{
            selected:0,
            currentView:'view_0'
        }
    },
    methods:{
        choose(index) {
            this.selected=index;
            this.currentView='view_'+index;
        }
    },
    route:{
        data() {
            /*每次切换路由，在渲染出页面前都会执行*/
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    data(){
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">selected</span>:<span class="hljs-number">0</span>,
            <span class="hljs-attr">currentView</span>:<span class="hljs-string">'view_0'</span>
        }
    },
    <span class="hljs-attr">methods</span>:{
        choose(index) {
            <span class="hljs-keyword">this</span>.selected=index;
            <span class="hljs-keyword">this</span>.currentView=<span class="hljs-string">'view_'</span>+index;
        }
    },
    <span class="hljs-attr">route</span>:{
        data() {
            <span class="hljs-comment">/*每次切换路由，在渲染出页面前都会执行*/</span>
        }
    }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuejs的一些总结

## 原文链接
[https://segmentfault.com/a/1190000005832164](https://segmentfault.com/a/1190000005832164)

