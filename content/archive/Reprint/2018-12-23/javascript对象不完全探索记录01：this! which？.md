---
title: 'javascript对象不完全探索记录01：this! which？' 
date: 2018-12-23 2:30:07
hidden: true
slug: hhnuxxbsirp
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>温馨提示：作者的爬坑记录，对你等大神完全没有价值，别在我这浪费生命</strong></p>
<p>这一切，源于阮大神博文<a href="http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html" rel="nofollow noreferrer" target="_blank">学习Javascript闭包（Closure）- 阮一峰</a>中的一道思考题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//问题1:
var name = &quot;The Window&quot;;
var object = {
　　name : &quot;My Object&quot;,
　　getNameFunc : function(){
　　　　return function(){
　　　　　　return this.name;
　　　　};
　　}
};
alert(object.getNameFunc()());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//问题1:</span>
<span class="hljs-keyword">var</span> name = <span class="hljs-string">"The Window"</span>;
<span class="hljs-keyword">var</span> object = {
　　name : <span class="hljs-string">"My Object"</span>,
　　getNameFunc : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　　　<span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　　　　　<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
　　　　};
　　}
};
alert(object.getNameFunc()());</code></pre>
<p>这道题，出现在了关于闭包的博文之中，而阮大神的一句“如果你能理解下面两段代码的运行结果，应该就算理解闭包的运行机制了。”彻底激发了我的斗志。</p>
<p>乍一看，外面一个变量叫<code>name</code>，对象内还有一个变量是<code>name</code>这就很明显了，这就是在考察对于作用域链的理解了，这里返回的应该是一个妥妥的“My Object”，<br>可是运行结果却狠狠大打了我的脸，但是弹出的一个大大“The Window”让我不得不重新面对这一段代码，这里面的<code>this</code>指得到底是什么？<br>进一步尝试，将<code>this</code>打印到控制台上出现的结果是“window”，这下就明白了，问题就出在了<code>this</code>上，它并没有按照我所想的去指向了<code>object</code>而是指向了全局对象<code>window</code>这就是为什么会返回“The Window”了</p>
<p><strong>//在这里，把<code>this</code>去掉也会返回“My Object”具体原因还没整明白以后补充</strong></p>
<p>再看阮大神给出的第二道题就更懵逼了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//问题2:
var name = &quot;The Window&quot;;
var object = {
　　name : &quot;My Object&quot;,
　　getNameFunc : function(){
　　　　var that = this;
　　　　return function(){
　　　　　　return that.name;
　　　　};
　　}
};
alert(object.getNameFunc()());//My Object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//问题2:</span>
<span class="hljs-keyword">var</span> name = <span class="hljs-string">"The Window"</span>;
<span class="hljs-keyword">var</span> object = {
　　name : <span class="hljs-string">"My Object"</span>,
　　getNameFunc : <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　　　<span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
　　　　<span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
　　　　　　<span class="hljs-keyword">return</span> that.name;
　　　　};
　　}
};
alert(object.getNameFunc()());<span class="hljs-comment">//My Object</span></code></pre>
<p>按照这几行代码的意思，在<code>getNameFunc</code>的<code>this</code>指向的是<code>object</code>而在其内部的函数中，则会指向全局对象，这去哪说理，再次又开始狂搜博文</p>
<p><a href="http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html" rel="nofollow noreferrer" target="_blank">Javascript的this用法 - 阮一峰</a><br><a href="https://www.cnblogs.com/pssp/p/5216085.html" rel="nofollow noreferrer" target="_blank">彻底理解js中this的指向，不必硬背。- 追梦子</a><br><a href="https://segmentfault.com/a/1190000003046071">JS 中 this 关键字详解 - 苹果小萝卜</a><br><a href="https://www.cnblogs.com/snandy/p/4773184.html" rel="nofollow noreferrer" target="_blank">JavaScript中知而不全的this - Snandy</a></p>
<p>看了一圈，心里算是有了普，get到了一个基本的概念<br><strong>this指向的是调用它的对象</strong><br>这也就是说，在对象定义的时候<code>this</code>并没有一个具体的指向，只有当被调用时，this才会被赋值给调用他的对象，了解了这个概念，再回头看看第一题，还是有问题这句<code>object.getNameFunc()()</code>在执行的时候到底发生了什么，我们对第一题做一些改变</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;The Window&quot;;
var object = {
　　name : &quot;My Object&quot;,
　　getNameFunc : function(){
       console.log(this.name)
       return function(){
　　　　    console.log(this.name)
　　　　    return this.name;
　　　　};
　　}
};
object.getNameFunc()//My Object 执行语句1
object.getNameFunc()()//The Window 执行语句2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> name = <span class="hljs-string">"The Window"</span>;
<span class="hljs-keyword">var</span> object = {
　　<span class="hljs-attr">name</span> : <span class="hljs-string">"My Object"</span>,
　　<span class="hljs-attr">getNameFunc</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
       <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
　　　　    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name)
　　　　    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name;
　　　　};
　　}
};
object.getNameFunc()<span class="hljs-comment">//My Object 执行语句1</span>
object.getNameFunc()()<span class="hljs-comment">//The Window 执行语句2</span></code></pre>
<p>在执行语句1中，可以理解<code>getNameFunc()</code>是被<code>object</code>对象所调用，在函数中的<code>this</code>就指向了<code>object</code>，所以就出现了这个结果，<br>在执行语句2中，我们可以理解为执行语句1的返回函数，被执行了一次，而执行它的就是我们的window对象了，为了便于理解我们把执行语句2进行改写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getVal = object.getNameFunc()
getVal()//The Window" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> getVal = <span class="hljs-selector-tag">object</span>.getNameFunc()
<span class="hljs-function"><span class="hljs-title">getVal</span><span class="hljs-params">()</span></span><span class="hljs-comment">//The Window</span></code></pre>
<p>实际上，执行语句2就是执行了<code>getVal()</code>而这个函数的执行对象是window，所以就出现了上文中的结果。<br>我们再来看问题2就很明白了<code>var that = this;</code>是在<code>object.getNameFunc()</code>执行的过程中被执行的，所以这里的<code>this</code>指向的就是<code>object</code>而把他赋值给变量<code>that</code>后实际上就是把<code>object</code>赋值给了<code>that</code>（有不严谨之处，领会精神），而由于<code>that</code>处于内部函数的作用域链中，不能被释放，连同返回的内部函数形成闭包（终于见到你了），所以一直都指向了<code>object</code>，所以题目2的最终结果就是“My Object”了</p>
<p><strong>长出一口气</strong></p>
<p>这么看this这个概念很是神奇，并且包含了许多对象方面的知识，使我不禁对彻底弄明白他的各种应用方法和原理产生了不切实际的幻想，那么交给写后文的未来的我去梳理把</p>
<p><strong>能看到这的都是真爱</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript对象不完全探索记录01：this! which？

## 原文链接
[https://segmentfault.com/a/1190000012283595](https://segmentfault.com/a/1190000012283595)

