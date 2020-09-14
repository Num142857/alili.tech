---
title: 'JS中事件冒泡与捕获' 
date: 2019-02-09 2:30:59
hidden: true
slug: sk00k02rnu9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">事件冒泡与事件捕获</h2>
<p><code>事件冒泡</code>和<code>事件捕获</code>分别由<code>微软</code>和<code>网景</code>公司提出，这两个概念都是为了解决页面中事件流（事件发生顺序）的问题。<br>考虑下面这段代码，就不写html-&gt;head,body之类的代码了，自行脑补</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;outer&quot;>
    <p id=&quot;inner&quot;>Click me!</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"outer"</span>&gt;
    &lt;p <span class="hljs-built_in">id</span>=<span class="hljs-string">"inner"</span>&gt;Click <span class="hljs-keyword">me</span>!&lt;/p&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>上面的代码当中一个div元素当中有一个p子元素，如果两个元素都有一个click的处理函数，那么我们怎么才能知道哪一个函数会首先被触发呢？<br>为了解决这个问题微软和网景提出了两种几乎完全相反的概念。</p>
<h2 id="articleHeader1">事件冒泡</h2>
<p>微软提出了名为<code>事件冒泡(event bubbling)</code>的事件流。事件冒泡可以形象地比喻为把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到document对象。</p>
<p>因此在事件冒泡的概念下在p元素上发生click事件的顺序应该是<strong><code>p -&gt; div -&gt; body -&gt; html -&gt; document</code></strong></p>
<h2 id="articleHeader2">事件捕获</h2>
<p>网景提出另一种事件流名为<code>事件捕获(event capturing)</code>。与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。</p>
<p>因此在事件捕获的概念下在p元素上发生click事件的顺序应该是<strong><code>document -&gt; html -&gt; body -&gt; div -&gt; p</code></strong></p>
<h2 id="articleHeader3">addEventListener的第三个参数</h2>
<p>网景 和 微软 曾经的战争还是比较火热的，当时， 网景主张捕获方式，微软主张冒泡方式。后来 w3c 采用折中的方式，平息了战火，制定了统一的标准——<strong>先捕获再冒泡</strong>。<br>addEventListener的第三个参数就是为冒泡和捕获准备的.<br>addEventListener有三个参数：</p>
<blockquote><p>element.addEventListener(event, function, useCapture)</p></blockquote>
<p>第一个参数是需要绑定的事件<br>第二个参数是触发事件后要执行的函数<br>第三个参数默认值是false，表示在<strong>事件冒泡阶段</strong>调用事件处理函数;如果参数为true，则表示在<strong>事件捕获阶段</strong>调用处理函数。</p>
<h3 id="articleHeader4">冒泡的案例</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;s1&quot;>s1
    <div id=&quot;s2&quot;>s2</div>
</div>
<script>
    s1.addEventListener(&quot;click&quot;,function(e){
        console.log(&quot;s1 冒泡事件&quot;);
    },false);
    s2.addEventListener(&quot;click&quot;,function(e){
        console.log(&quot;s2 冒泡事件&quot;);
    },false);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"s1"</span>&gt;</span>s1
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"s2"</span>&gt;</span>s2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    s1.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"s1 冒泡事件"</span>);
    },<span class="hljs-literal">false</span>);
    s2.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"s2 冒泡事件"</span>);
    },<span class="hljs-literal">false</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当我们点击s2的时候，执行结果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000009881083" src="https://static.alili.tech/img/remote/1460000009881083" alt="冒泡" title="冒泡" style="cursor: pointer;"></span></p>
<p><a href="http://runjs.cn/detail/kj4jgpli" rel="nofollow noreferrer" target="_blank">http://runjs.cn/detail/kj4jgpli</a><button class="btn btn-xs btn-default ml10 preview" data-url="kj4jgpli" data-typeid="2">点击预览</button></p>
<h3 id="articleHeader5">捕获的案例</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;s1&quot;>s1
    <div id=&quot;s2&quot;>s2</div>
</div>
<script>
    s1.addEventListener(&quot;click&quot;,function(e){
        console.log(&quot;s1 捕获事件&quot;);
    },true);
    s2.addEventListener(&quot;click&quot;,function(e){
        console.log(&quot;s2 捕获事件&quot;);
    },true);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"s1"</span>&gt;</span>s1
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"s2"</span>&gt;</span>s2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    s1.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"s1 捕获事件"</span>);
    },<span class="hljs-literal">true</span>);
    s2.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"s2 捕获事件"</span>);
    },<span class="hljs-literal">true</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当我们点击s2的时候，执行结果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000009881084" src="https://static.alili.tech/img/remote/1460000009881084" alt="捕获" title="捕获" style="cursor: pointer;"></span></p>
<p><a href="http://runjs.cn/detail/c3mjulm0" rel="nofollow noreferrer" target="_blank">http://runjs.cn/detail/c3mjulm0</a><button class="btn btn-xs btn-default ml10 preview" data-url="c3mjulm0" data-typeid="2">点击预览</button></p>
<h2 id="articleHeader6">事件捕获vs事件冒泡</h2>
<p>当事件捕获和事件冒泡一起存在的情况，事件又是如何触发呢。<br>这里记被点击的DOM节点为target节点</p>
<ol>
<li><p>document 往 target节点，捕获前进，遇到注册的捕获事件立即触发执行</p></li>
<li><p>到达target节点，触发事件（对于target节点上，是先捕获还是先冒泡则捕获事件和冒泡事件的注册顺序，先注册先执行）</p></li>
<li><p>target节点 往 document 方向，冒泡前进，遇到注册的冒泡事件立即触发</p></li>
</ol>
<h3 id="articleHeader7">总结下就是:</h3>
<ul>
<li><p>对于非target节点则先执行捕获在执行冒泡</p></li>
<li><p>对于target节点则是先执行先注册的事件，无论冒泡还是捕获</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;s1&quot;>s1
    <div id=&quot;s2&quot;>s2</div>
</div>
<script>
s1.addEventListener(&quot;click&quot;,function(e){
        console.log(&quot;s1 冒泡事件&quot;);         
},false);
s2.addEventListener(&quot;click&quot;,function(e){
        console.log(&quot;s2 冒泡事件&quot;);
},false);
        
s1.addEventListener(&quot;click&quot;,function(e){
        console.log(&quot;s1 捕获事件&quot;);
},true);
        
s2.addEventListener(&quot;click&quot;,function(e){
        console.log(&quot;s2 捕获事件&quot;);
},true);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"s1"</span>&gt;</span>s1
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"s2"</span>&gt;</span>s2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
s1.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"s1 冒泡事件"</span>);         
},<span class="hljs-literal">false</span>);
s2.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"s2 冒泡事件"</span>);
},<span class="hljs-literal">false</span>);
        
s1.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"s1 捕获事件"</span>);
},<span class="hljs-literal">true</span>);
        
s2.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"s2 捕获事件"</span>);
},<span class="hljs-literal">true</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当我们点击s2的时候,执行结果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000009881085" src="https://static.alili.tech/img/remote/1460000009881085" alt="捕获vs冒泡" title="捕获vs冒泡" style="cursor: pointer;"></span></p>
<p><a href="http://runjs.cn/detail/fkq3uyqh" rel="nofollow noreferrer" target="_blank">http://runjs.cn/detail/fkq3uyqh</a><button class="btn btn-xs btn-default ml10 preview" data-url="fkq3uyqh" data-typeid="2">点击预览</button></p>
<p>这里大体分析下执行结果<br>点击s2，click事件从document-&gt;html-&gt;body-&gt;s1-&gt;s2(捕获前进)<br>这里在s1上发现了捕获注册事件，则输出<strong>"s1 捕获事件"</strong><br>到达s2，已经到达目的节点，<br>s2上注册了冒泡和捕获事件，先注册的冒泡后注册的捕获，则先执行冒泡，输出<strong>"s2 冒泡事件"</strong><br>再在s2上执行后注册的事件，即捕获事件，输出<strong>"s2 捕获事件"</strong><br>下面进入冒泡阶段，按照s2-&gt;s1-&gt;body-&gt;html-&gt;documen(冒泡前进)<br>在s1上发现了冒泡事件，则输出<strong>"s1 冒泡事件"</strong></p>
<h2 id="articleHeader8">事件冒泡与事件捕获应用:事件代理</h2>
<p>在实际的开发当中，利用事件流的特性，我们可以使用一种叫做事件代理的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul id=&quot;color-list&quot;>
    <li>red</li>
    <li>yellow</li>
    <li>blue</li>
    <li>green</li>
    <li>black</li>
    <li>white</li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"color-list"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>red<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>yellow<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>blue<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>green<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>black<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>white<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>如果点击页面中的li元素，然后输出li当中的颜色，我们通常会这样写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    var color_list = document.getElementById('color-list');
    var colors = color_list.getElementsByTagName('li');
    for(var i=0;i<colors.length;i++){                          
        colors[i].addEventListener('click',showColor,false);
    };
    function showColor(e){
        var x = e.target;
        console.log(&quot;The color is &quot; + x.innerHTML);
    };
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(){
    var color_list = document.getElementById(<span class="hljs-name">'color-list'</span>)<span class="hljs-comment">;</span>
    var colors = color_list.getElementsByTagName(<span class="hljs-name">'li'</span>)<span class="hljs-comment">;</span>
    for(<span class="hljs-name"><span class="hljs-builtin-name">var</span></span> i=0;i&lt;colors.length;i++){                          
        colors[i].addEventListener(<span class="hljs-name">'click'</span>,showColor,<span class="hljs-literal">false</span>)<span class="hljs-comment">;</span>
    }<span class="hljs-comment">;</span>
    function showColor(<span class="hljs-name">e</span>){
        var x = e.target;
        console.log(<span class="hljs-string">"The color is "</span> + x.innerHTML)<span class="hljs-comment">;</span>
    }<span class="hljs-comment">;</span>
})()<span class="hljs-comment">;</span></code></pre>
<p>利用事件流的特性，我们只绑定一个事件处理函数也可以完成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    var color_list = document.getElementById('color-list');
    color_list.addEventListener('click',showColor,false);
    function showColor(e){
        var x = e.target;
        if(x.nodeName.toLowerCase() === 'li'){
            console.log('The color is ' + x.innerHTML);
        }
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">function</span>(){
    var color_list = document.getElementById(<span class="hljs-symbol">'color-list</span>')<span class="hljs-comment">;</span>
    color_list.addEventListener(<span class="hljs-symbol">'click</span>',showColor,false)<span class="hljs-comment">;</span>
    function showColor(<span class="hljs-name">e</span>){
        var x = e.target<span class="hljs-comment">;</span>
        if(<span class="hljs-name">x.nodeName.toLowerCase</span>() === <span class="hljs-symbol">'li</span>'){
            console.log(<span class="hljs-symbol">'The</span> color is ' + x.innerHTML)<span class="hljs-comment">;</span>
        }
    }
})()<span class="hljs-comment">;</span></code></pre>
<p><a href="http://runjs.cn/detail/pvsbglwc" rel="nofollow noreferrer" target="_blank">http://runjs.cn/detail/pvsbglwc</a><button class="btn btn-xs btn-default ml10 preview" data-url="pvsbglwc" data-typeid="2">点击预览</button></p>
<p>使用事件代理的好处不仅在于将多个事件处理函数减为一个，而且对于不同的元素可以有不同的处理方法。假如上述列表元素当中添加了其他的元素（如：a、span等），我们不必再一次循环给每一个元素绑定事件，直接修改事件代理的事件处理函数即可。</p>
<h2 id="articleHeader9">冒泡还是捕获？</h2>
<p>对于事件代理来说，在事件捕获或者事件冒泡阶段处理并没有明显的优劣之分，但是由于事件冒泡的事件流模型被所有主流的浏览器兼容，从兼容性角度来说还是建议大家使用事件冒泡模型。</p>
<h3 id="articleHeader10">IE浏览器兼容</h3>
<p>IE浏览器对addEventListener兼容性并不算太好，只有IE9以上可以使用。<br><span class="img-wrap"><img data-src="/img/remote/1460000009881086" src="https://static.alili.tech/img/remote/1460000009881086" alt="addEventListener兼容性" title="addEventListener兼容性" style="cursor: pointer;"></span></p>
<p>要兼容旧版本的IE浏览器，可以使用IE的attachEvent函数</p>
<blockquote><p>object.attachEvent(event, function)</p></blockquote>
<p>两个参数与addEventListener相似，分别是事件和处理函数，默认是事件冒泡阶段调用处理函数，要注意的是，写事件名时候要加上"on"前缀（"onload"、"onclick"等）。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS中事件冒泡与捕获

## 原文链接
[https://segmentfault.com/a/1190000005654451](https://segmentfault.com/a/1190000005654451)

