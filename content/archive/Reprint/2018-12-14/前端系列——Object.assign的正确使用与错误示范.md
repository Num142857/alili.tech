---
title: '前端系列——Object.assign的正确使用与错误示范' 
date: 2018-12-14 2:30:11
hidden: true
slug: h3k0kvayvyf
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">警告</h3>
<p><strong>看完文章，可能会颠覆你的认知！！</strong></p>
<h3 id="articleHeader1">语法</h3>
<blockquote>Object.assign(target, ...sources)</blockquote>
<h3 id="articleHeader2">错误示范</h3>
<p>我们都知道Object.assign()可以实现对象拷贝，很多人认为他只能实现浅拷贝，我翻遍了MDN的文档，也没搜索到一个<strong>浅</strong>字。<br>那么，到底什么是深拷贝、什么是浅拷贝，你可以去搜索其他文章看看。</p>
<p>下面给大家展示一个错误使用Object.assign的例子（希望原作者看到别打我，我已经写上转载来源了?）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = { name: '程序猿', age:{child: 12} }
let copy = Object.assign({}, obj);
copy.name = '单身狗'
copy.age.child = 24
console.log(obj) // { name: '程序猿', age:{child: 24} }

作者：拌着生活
链接：https://www.jianshu.com/p/70dc5b968767
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> obj = { name: <span class="hljs-string">'程序猿'</span>, age:{child: <span class="hljs-number">12</span>} }
<span class="hljs-keyword">let</span> <span class="hljs-keyword">copy</span> = Object.assign({}, obj);
<span class="hljs-keyword">copy</span>.name = <span class="hljs-string">'单身狗'</span>
<span class="hljs-keyword">copy</span>.age.child = <span class="hljs-number">24</span>
console.log(obj) // { name: <span class="hljs-string">'程序猿'</span>, age:{child: <span class="hljs-number">24</span>} }

作者：拌着生活
链接：https://www.jianshu.com/p/<span class="hljs-number">70</span>dc5b968767
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</code></pre>
<p>上面的例子大概是这个意思，有一个原始的obj对象，他里面的age对象有一个子节点child，然后使用Object.assign({}, obj)直接拷贝这个对象（或者叫做浅拷贝obj），最后用点赋值法修改copy对象的属性，结果是对原obj对象也进行了修改。</p>
<p>老天，Object.assign怎么这么烂，说好的拷贝呢，只是浅拷贝啊，那react中是不是一大堆state都是N层结构的对象，不能用Object.assign来玩了呢？</p>
<p><strong>来分析一下它错在哪里了。</strong></p>
<p>从语法上来说，并没有用错，的确，这样能实现对象的拷贝，或者叫做“浅拷贝”，但是，如果要修改对象里面的属性，就需要用到“对象的合并”，也就是下面将要讲到的。其实MDN上讲的很明白，Object.assign应该怎样用，只是大家习惯了看博客。</p>
<h3 id="articleHeader3">正确使用</h3>
<p>看了错误示范，不用担心，我带你来正确使用Object.assign。</p>
<h4>我也定义一个对象obj。</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {name: '二月', age: {c: 12"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">let obj = {<span class="hljs-string">name:</span> <span class="hljs-string">'二月'</span>, <span class="hljs-string">age:</span> {<span class="hljs-string">c:</span> <span class="hljs-number">12</span>"}}"</code></pre>
<h4>正确使用Object.assign进行对象的拷贝，通常有2种方式。</h4>
<p><strong>1、Object.assign()</strong></p>
<p>我们对要修改的内部对象属性进行单独的赋值，既不修改obj，也不修改新对象o2，定义单独的age。还记得文章开头的语法吗，源对象...sources表示支持多个散列的对象。</p>
<p>下面的做法相当于，我们定义了一个新的age对象，将它和obj对象进行合并，然后拷贝给一个空对象{}，这样使用Object.assign()，就不会对原对象obj产生影响。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let age = {c: 88}
let o2 = Object.assign({}, obj, {age})
console.log(obj, o2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> age = {c: <span class="hljs-number">88</span>}
<span class="hljs-keyword">let</span> o2 = Object.assign({}, obj, {age})
console.log(obj, o2)</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV3pAF?w=1326&amp;h=158" src="https://static.alili.tech/img/bV3pAF?w=1326&amp;h=158" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>那么，有人可能会质疑了，它只是浅拷贝啊，就算你取巧实现了拷贝，但是要是对o2进行赋值了咋办，不也一样会改变obj的值？</p>
<p>相信我，不会的，别被网上所谓的“浅拷贝”迷惑了你的眼睛。</p>
<p>我紧接着对o2里面的age进行直接的赋值，打印出来的obj仍旧不受影响，是不是很神奇！！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {name: '二月', age: {c: 12"}}"
let age = {c: 88}
let o2 = Object.assign({}, obj, {age})
o2.age.c = 66
console.log(obj, o2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> obj = {name: <span class="hljs-string">'二月'</span>, age: {c: <span class="hljs-number">12</span>"}}"
<span class="hljs-keyword">let</span> age = {c: <span class="hljs-number">88</span>}
<span class="hljs-keyword">let</span> o2 = Object.assign({}, obj, {age})
o2.age.c = <span class="hljs-number">66</span>
console.log(obj, o2)</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV3pA5?w=1332&amp;h=146" src="https://static.alili.tech/img/bV3pA5?w=1332&amp;h=146" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>2、ES6的扩展运算符</strong></p>
<p>现在我们都喜欢用ES6的扩展运算符来替换Object.assign。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {name: '二月', age: {c: 12"}}"
let o1 = {...obj, age: {c: 88"}}"
console.log(obj, o1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> obj = {name: <span class="hljs-string">'二月'</span>, age: {c: <span class="hljs-number">12</span>"}}"
<span class="hljs-keyword">let</span> o1 = {...obj, age: {c: <span class="hljs-number">88</span>"}}"
console.log(obj, o1)</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV3pBw?w=1290&amp;h=144" src="https://static.alili.tech/img/bV3pBw?w=1290&amp;h=144" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>同样的，我把o1也用点语法重新赋值看看会不会对obj产生影响，答案当然是不会！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {name: '二月', age: {c: 12"}}"
let o1 = {...obj, age: {c: 88"}}"
o1.age.c = 99
console.log(obj, o1)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> obj = {name: <span class="hljs-string">'二月'</span>, age: {c: <span class="hljs-number">12</span>"}}"
<span class="hljs-keyword">let</span> o1 = {...obj, age: {c: <span class="hljs-number">88</span>"}}"
o1.age.c = <span class="hljs-number">99</span>
console.log(obj, o1)</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV3pBR?w=1290&amp;h=150" src="https://static.alili.tech/img/bV3pBR?w=1290&amp;h=150" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>3、分析原理</strong><br>一切都要从语法说起Object.assign(target, ...sources)，第一个参数target决定了你的对象被拷贝到哪个目标对象上面，如果你不想对原始对象产生影响，就定义一个空对象{}作为target，单单这样还不够，sources只设置原始对象obj的话，表示对原始对象的“浅拷贝”，但是设置多个对象的合并，就会返回一个全新的对象。</p>
<h3 id="articleHeader4">总结</h3>
<p>看了这篇文章，你摸着良心问问自己，真的理解什么是Object.assign和扩展运算符了吗？更深一个层次来看，你真的理解什么是浅拷贝、什么是深拷贝了吗？？</p>
<p><strong>补充：纠结age的人是不是没有写过reducer啊，这是一种用assign合并对象的思想，age对象是否变化根本就不是要关心的事情。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端系列——Object.assign的正确使用与错误示范

## 原文链接
[https://segmentfault.com/a/1190000013167556](https://segmentfault.com/a/1190000013167556)

