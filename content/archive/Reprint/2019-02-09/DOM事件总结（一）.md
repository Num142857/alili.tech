---
title: 'DOM事件总结（一）' 
date: 2019-02-09 2:30:58
hidden: true
slug: 0xhkpuam9gfc
categories: [reprint]
---

{{< raw >}}

                    
<p><em>前言：撸完CSS－DOM紧接着来撸DOM事件，事件总结完成后我要开始总结动画，然后用纯JS实现一个轮播图，前路漫漫，还有各种框架等着我～～～</em><br>本篇主要内容有：事件流  事件处理程序 跨浏览器事件处理程序</p>
<p><em>－－－－－－－－－－－－－－－－－－－－? 分割线－－－－－－－－－－－－－－－－－－－－－</em></p>
<h2 id="articleHeader0">1.事件流</h2>
<p>事件冒泡：事件开始时由最具体的元素（文档嵌套层次最深的节点）接收，然后逐级向上传播到较为不具体的节点。<br>事件捕获：不太具体的节点应该更早接收到事件，最具体的节点应该最后接收到事件。</p>
<h2 id="articleHeader1">2.DOM事件流</h2>
<p>在W3C规范中：分三步（1、事件捕获；2、事件触发；3、事件冒泡）；<br>在IE中：分两步（1、事件冒泡；2、事件触发）<br>在网景（Netscape)：分两步（1、事件捕获；2、事件触发）</p>
<h2 id="articleHeader2">3.事件处理程序</h2>
<h3 id="articleHeader3">（一）HTML事件处理程序</h3>
<p>这个在<a href="https://segmentfault.com/a/1190000005726200">《DOM编程艺术》中初步实现的图片库的总结（一）</a>就有了运用，它的js代码嵌套在HTML中，如：想要实现在点击按钮时显示一个警告框，则可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; value=&quot;狠狠的点我&quot; onclick=&quot;alert('clicked')&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"狠狠的点我"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"alert('clicked')"</span>/&gt;</span></code></pre>
<p>缺点：<br>1.代码例子中的alert可以换成自己定义的函数，假如用户在页面加载后还没开始解析这个函数时就单击了按钮，这个时候就会引发错误，这时可以将事件处理程序封装在try－catch块中，上面的代码可以改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; value=&quot;狠狠的点我&quot; onclick=&quot;try{showsomething();}catch(ex){}&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"狠狠的点我"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"try{showsomething();}catch(ex){}"</span>/&gt;</span></code></pre>
<p>2.HTML和js代码耦合性太强，如果要更换事件处理程序，就要改动两个地方。</p>
<h3 id="articleHeader4">（二）DOM 0级事件处理程序</h3>
<p>每个元素（包括window和document）都有自己的事件处理程序属性，例如onclick，将这种属性值设置为一个函数，就可以指定事件处理程序，如下方代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //假如有一个按钮，先获取这个按钮元素
    var btn = document.getElementById(&quot;myBtn&quot;);
    btn.onclick = function(){
        alert(&quot;你点我干啥！！！&quot;);
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">//假如有一个按钮，先获取这个按钮元素</span>
    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"myBtn"</span>);
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-string">"你点我干啥！！！"</span>);
    };</code></pre>
<p><strong>注意</strong>：以上代码在运行之前不会指定事件处理程序，换句话说就是如果这些代码插入在html文档中的最后，位于按钮之后，body标签之前，那么在文档解析这个函数之前，点击按钮时无效的。</p>
<p><strong>优点</strong>：简单，具有跨浏览器的优势</p>
<p><strong>特点</strong>：使用DOM 0级方法指定事件处理程序被认为是元素的方法，因此这个时候事件处理是在元素的作用域中进行运行，程序中的this指向当前元素。  来看下面一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var btn = document.getElementById(&quot;mybtn&quot;);
    btn.onclick = function(){
        alert(this.id);   //this代表当前执行操作的元素btn，也就是id为mybtn的按钮
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"mybtn"</span>);
    btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-keyword">this</span>.id);   <span class="hljs-comment">//this代表当前执行操作的元素btn，也就是id为mybtn的按钮</span>
    }
</code></pre>
<p>以上不仅仅可以访问元素的id属性，元素的任何属性和方法都可以通过this访问。以这种方式添加的事件处理程序会在事件流的冒泡阶段被处理。</p>
<h2 id="articleHeader5">（三）DOM 2级事件处理程序</h2>
<p>DOM 2级事件定义了两个方法，分别用于处理指定和删除事件处理程序的操作：<br><code>addEventListener()</code>和<code>removeEventListener()</code>，<br>他们都接收三个参数：要处理的事件名、作为事件处理程序的函数、一个布尔值。<br>布尔值如果是true表示在捕获阶段调用事件处理程序，如果是false表示在冒泡阶段调用事件处理程序。</p>
<p><strong>添加事件操作</strong><br>如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var btn = document.getElementById(&quot;myBtn&quot;);
    btn.addEventListener(&quot;click&quot;,function(){
        alert(this.id);
    },false);
    btn.addEventListener(&quot;click&quot;,function(){
        alert(&quot;你点我干啥！！！&quot;);
    },false);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"myBtn"</span>);
    btn.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-keyword">this</span>.id);
    },<span class="hljs-literal">false</span>);
    btn.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-string">"你点我干啥！！！"</span>);
    },<span class="hljs-literal">false</span>);
</code></pre>
<p>以上代码为一个按钮添加了一个onclick事件处理程序，<code>注意里面参数传递的是"click"</code>，这个是跟DOM中的事件类型有关，后续再说。～～～<br>并且使用DOM 2级方法添加事件处理程序的好处是，可以添加多个事件处理程序，上面例子中首先会显示元素id，然后显示"你点我干啥！！！"。</p>
<p><strong>删除事件操作</strong><br>通过addEventListener()添加的事件处理程序只能使用removeEventListener()来移除，移除时传入的参数与添加程序时使用的参数相同。这也就意味着通过addEventListener()添加的匿名函数将无法移除。如上面的例子，我增加以下代码将无法移除事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    btn.removeEventListener(&quot;click&quot;,function(){
        alert(this.id);
    },false);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    btn.removeEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-keyword">this</span>.id);
    },<span class="hljs-literal">false</span>);
</code></pre>
<p>解决办法是，将上面的匿名函数赋值给一个变量，然后adddEventListener和 removeEventListener<br>传参数时传入这个变量就可以了。</p>
<p>重写这个函数如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var btn = document.getElementById(&quot;myBtn&quot;);
    var handler = function(){
        alert(this.id);
    };
    btn.addEventListener(&quot;click&quot;,handler,false);
    btn.addEventListener(&quot;click&quot;,handler,false);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"myBtn"</span>);
    <span class="hljs-keyword">var</span> handler = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        alert(<span class="hljs-keyword">this</span>.id);
    };
    btn.addEventListener(<span class="hljs-string">"click"</span>,handler,<span class="hljs-literal">false</span>);
    btn.addEventListener(<span class="hljs-string">"click"</span>,handler,<span class="hljs-literal">false</span>);
</code></pre>
<h3 id="articleHeader6">（4）跨浏览器的事件处理程序</h3>
<p>－－－－－－－－－－－－－－－－－  珍爱生命，远离IE   －－－－－－－－－－－－－－－－－－</p>
<p>IE也实现了DOM中的类似的两个方法：attachEvent()&nbsp;和detachEvent()，这两个方法接受相同的两个参数，事件处理程序名称与事件处理程序函数。</p>
<p>如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var btn = document.getElementById(&quot;mybtn&quot;);
    btn.attachEvent(&quot;onclick&quot;,function(){       //你没看错，用的“onclick”！！！
        alert(&quot;你又点我了！！！&quot;);
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"mybtn"</span>);
    btn.attachEvent(<span class="hljs-string">"onclick"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{       <span class="hljs-comment">//你没看错，用的“onclick”！！！</span>
        alert(<span class="hljs-string">"你又点我了！！！"</span>);
    });
</code></pre>
<p><strong>注意：</strong><br>1.attachEvent()的第一个参数时“onclick”<br>2.使用attachEvent()，事件处理程序会在全局作用域中进行，因此<code>this===window</code><br>3.添加多个事件时，事件处理程序不是以添加它们的顺序执行，而是以相反的顺序被触发。<br>4.使用detachEvent()来移除时，匿名函数同样不能移除，因此需要传递给函数相同的引用。</p>
<p><strong>那么重点来了，可以封装一个对象解决跨浏览器进行事件处理，给这个对象起名叫：EventUtil，它有两个方法，分别进行事件添加和移除。</strong></p>
<p>且看下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var EventUtil = {
        //@handler是装载匿名函数的引用变量，里面装载的是具体要执行的函数逻辑
        //@element是目标元素
        //type代表的是DOM 2级的事件类型，因此在用IE或者DOM 0级前面要加“on”
    
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent(&quot;on&quot; + type, handler);
            } else {
                elemet[&quot;on&quot; + type] = handler;  //如果上面两种都不行，就使用DOM 0级方法处理，直接在元素上添加onclick事件
            }
        },
    
        removeHandler: function (element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent(&quot;on&quot; + type, handler);
            } else {
                element[&quot;on&quot; + type] = null;  ////如果上面两种都不行，就使用DOM 0级方法处理，直接赋值为null取消事件
            }
        }
    };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> EventUtil = {
        <span class="hljs-comment">//@handler是装载匿名函数的引用变量，里面装载的是具体要执行的函数逻辑</span>
        <span class="hljs-comment">//@element是目标元素</span>
        <span class="hljs-comment">//type代表的是DOM 2级的事件类型，因此在用IE或者DOM 0级前面要加“on”</span>
    
        addHandler: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element, type, handler</span>) </span>{
            <span class="hljs-keyword">if</span> (element.addEventListener) {
                element.addEventListener(type, handler, <span class="hljs-literal">false</span>);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.attachEvent) {
                element.attachEvent(<span class="hljs-string">"on"</span> + type, handler);
            } <span class="hljs-keyword">else</span> {
                elemet[<span class="hljs-string">"on"</span> + type] = handler;  <span class="hljs-comment">//如果上面两种都不行，就使用DOM 0级方法处理，直接在元素上添加onclick事件</span>
            }
        },
    
        <span class="hljs-attr">removeHandler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element, type, handler</span>) </span>{
            <span class="hljs-keyword">if</span> (element.removeEventListener) {
                element.removeEventListener(type, handler, <span class="hljs-literal">false</span>);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.detachEvent) {
                element.detachEvent(<span class="hljs-string">"on"</span> + type, handler);
            } <span class="hljs-keyword">else</span> {
                element[<span class="hljs-string">"on"</span> + type] = <span class="hljs-literal">null</span>;  <span class="hljs-comment">////如果上面两种都不行，就使用DOM 0级方法处理，直接赋值为null取消事件</span>
            }
        }
    };
</code></pre>
<p>定义好了，怎么使用呢？看下面～～～</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var btn = document.getElementById(&quot;myBtn&quot;);
var handler = function(){
    alert(&quot;你又点我了！！！&quot;);
};

//添加事件
EventUtil.addHandler(btn,&quot;click&quot;,handler);

//移除事件
EventUtil.removeHandler(btn,&quot;click&quot;,handler);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"myBtn"</span>);
<span class="hljs-keyword">var</span> handler = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-string">"你又点我了！！！"</span>);
};

<span class="hljs-comment">//添加事件</span>
EventUtil.addHandler(btn,<span class="hljs-string">"click"</span>,handler);

<span class="hljs-comment">//移除事件</span>
EventUtil.removeHandler(btn,<span class="hljs-string">"click"</span>,handler);
</code></pre>
<p>以上代码<strong>并没有考虑IE中的作用域问题</strong>，并且<strong>DOM 0级只支持一个事件处理程序</strong>，但也不是什么问题，如今只卖早餐的饭店不多了～～～</p>
<p>这次没有源代码，以上～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
DOM事件总结（一）

## 原文链接
[https://segmentfault.com/a/1190000005736378](https://segmentfault.com/a/1190000005736378)

