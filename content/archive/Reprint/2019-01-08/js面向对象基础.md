---
title: 'js面向对象基础' 
date: 2019-01-08 2:30:11
hidden: true
slug: bvmaogtj1ih
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">js面向对象入门基础</h1>
<blockquote><p>我们在日常编程中，用到的大多都是js面向过程的编程，但是20%的编程我们要运到面向对象，创建对象实例（类），下边说一下，我们创建对象的几种方法！</p></blockquote>
<h3 id="articleHeader1">我们创建对象有下边几种方法:</h3>
<ol><li><p>第一个方法</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//new Object
    var person=new Object
    person.name=&quot;xx&quot;;
    person.age=xx;
    person....." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">//new Object</span>
    <span class="hljs-keyword">var</span> person=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>
    person.name=<span class="hljs-string">"xx"</span>;
    person.age=xx;
    person.....</code></pre>
<ol><li><p>第二种方法</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//直接创建一个对象，字面量形式
var person={
    name=&quot;xx&quot;,
    age=&quot;xx&quot;,
    ...
    
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">//直接创建一个对象，字面量形式</span>
<span class="hljs-built_in">var</span> person={
    name=<span class="hljs-string">"xx"</span>,
    age=<span class="hljs-string">"xx"</span>,
    <span class="hljs-params">...</span>
    
    }
}
</code></pre>
<p>上边的方法我们经常用来学习，但是有一些诟病，如果你想要创建多个对象，可以使用下边这种方法。。</p>
<ol><li><p>介绍一下这种方法</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//创建对象实例
function Student(name,age,xxx){
    this.name=&quot;&quot;，
    this.age=&quot;&quot;,
    this.xxx,
}
//下边是创建对象的方法
//用到了对象的继承    类
var student1 = new Student('xx', 19, 'xx');

var student2 = new Student('xx', 23, 'xx');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">//创建对象实例</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span></span>(name,age,xxx){
    <span class="hljs-built_in">this</span>.name=<span class="hljs-string">""</span>，
    <span class="hljs-built_in">this</span>.age=<span class="hljs-string">""</span>,
    <span class="hljs-built_in">this</span>.xxx,
}
<span class="hljs-comment">//下边是创建对象的方法</span>
<span class="hljs-comment">//用到了对象的继承    类</span>
<span class="hljs-keyword">var</span> student1 = <span class="hljs-keyword">new</span> <span class="hljs-type">Student</span>(<span class="hljs-string">'xx'</span>, <span class="hljs-number">19</span>, <span class="hljs-string">'xx'</span>);

<span class="hljs-keyword">var</span> student2 = <span class="hljs-keyword">new</span> <span class="hljs-type">Student</span>(<span class="hljs-string">'xx'</span>, <span class="hljs-number">23</span>, <span class="hljs-string">'xx'</span>);</code></pre>
<p>我们用下边这种方法如果创建10个对象是不是感觉比上边那个方便？</p>
<p>我们要想对一个对象使用或者创建自己的方法就用到了原型对象prototype!接着上边的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="student1.prototype.fly=function(){
    console.log(&quot;我会飞&quot;)
}
student2.prototype.run=function(){
    console.log(&quot;我会跑&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>student1.prototype.fly=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"我会飞"</span>)
}
student2.prototype.run=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"我会跑"</span>)
}</code></pre>
<p>这就是面向对象的一些基础，如果大家觉得可以的话，给个赞，有什么问题也可以在下边评论，我会为你们解答！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js面向对象基础

## 原文链接
[https://segmentfault.com/a/1190000010210163](https://segmentfault.com/a/1190000010210163)

