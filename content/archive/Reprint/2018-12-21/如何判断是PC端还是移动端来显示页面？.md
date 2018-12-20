---
title: '如何判断是PC端还是移动端来显示页面？' 
date: 2018-12-21 2:30:11
hidden: true
slug: okovi01cdsi
categories: [reprint]
---

{{< raw >}}

                    
<p>进入域后判断是移动端还是pc端显示不同的页面（PC/MOBILE）</p>
<p>很多情况下，一个应用会有PC和移动端两个版本，而这两个版本因为差别大，内容多，所以不能用响应式开发但是单独开发，而域名只有一个，用户进入域后直接返回对应设备的应用，做法主要有两种：</p>
<ol>
<li>前端判断并跳转<p>进入一个应用或者一个空白页面后，通过navigator.userAgent来判断用户访问的设备类型，进行跳转</p>
</li>
<li>后端判断并响应对应的应用<p>用户地址栏进入域的时候，服务器能接收到请求头上包含的userAgent信息，判断之后返回对应应用</p>
</li>
</ol>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    getName = function(){console.log(1)}
    return this
}
foo.getName = function(){console.log(2)}
foo.prototype.getName = function(){console.log(3)}
var getName = function(){console.log(4)}
function getName(){console.log(5)}


foo.getName()//2
//foo是一个函数，也可以说是一个对象，所以它也可以挂载一些属性和方法，18行在其上挂载了一个getName方法
//执行的结果是

getName()//4
//21行有一个全局函数，全局函数声明提前后被20行的getName覆盖，所以输出4

foo().getName()//1
//foo()执行完成后，将全局的getName也就是window.getName给更改后返回this，而在这里this执行的就是window，所以最后执行的就是window.getName，所以输出1

getName()//1
//在上面已经更改全局的getName，所以依然是1

new foo.getName()//2
//new 操作符在实例化构造器的时候，会执行构造器函数，也就是说，foo.getName会执行，输出2

new foo().getName()//3
//new操作符的优先级较高，所以会先new foo()得到一个实例，然后再执行实例的getName方法,这个时候，实例的构造器里没有getName方法，就会执行构造器原型上的getName方法

new new foo().getName()//3
//先执行new foo()得到一个实例，然后在new 这个实例的getName方法,这个时候会执行这个方法，所以输出3

//除了本地对象的方法，其他的函数都能new" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)}
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}
foo.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)}
foo.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)}
<span class="hljs-keyword">var</span> getName = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>)}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>)}


foo.getName()<span class="hljs-comment">//2</span>
<span class="hljs-comment">//foo是一个函数，也可以说是一个对象，所以它也可以挂载一些属性和方法，18行在其上挂载了一个getName方法</span>
<span class="hljs-comment">//执行的结果是</span>

getName()<span class="hljs-comment">//4</span>
<span class="hljs-comment">//21行有一个全局函数，全局函数声明提前后被20行的getName覆盖，所以输出4</span>

foo().getName()<span class="hljs-comment">//1</span>
<span class="hljs-comment">//foo()执行完成后，将全局的getName也就是window.getName给更改后返回this，而在这里this执行的就是window，所以最后执行的就是window.getName，所以输出1</span>

getName()<span class="hljs-comment">//1</span>
<span class="hljs-comment">//在上面已经更改全局的getName，所以依然是1</span>

<span class="hljs-keyword">new</span> foo.getName()<span class="hljs-comment">//2</span>
<span class="hljs-comment">//new 操作符在实例化构造器的时候，会执行构造器函数，也就是说，foo.getName会执行，输出2</span>

<span class="hljs-keyword">new</span> foo().getName()<span class="hljs-comment">//3</span>
<span class="hljs-comment">//new操作符的优先级较高，所以会先new foo()得到一个实例，然后再执行实例的getName方法,这个时候，实例的构造器里没有getName方法，就会执行构造器原型上的getName方法</span>

<span class="hljs-keyword">new</span> <span class="hljs-keyword">new</span> foo().getName()<span class="hljs-comment">//3</span>
<span class="hljs-comment">//先执行new foo()得到一个实例，然后在new 这个实例的getName方法,这个时候会执行这个方法，所以输出3</span>

<span class="hljs-comment">//除了本地对象的方法，其他的函数都能new</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何判断是PC端还是移动端来显示页面？

## 原文链接
[https://segmentfault.com/a/1190000012511329](https://segmentfault.com/a/1190000012511329)

