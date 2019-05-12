---
title: '如何让模块支持AMD/CMD和commonjs标准' 
date: 2019-01-09 2:30:12
hidden: true
slug: er7ntmx7kip
categories: [reprint]
---

{{< raw >}}

                    
<p>前段时间在看一些前端模块化方面的知识，现在自己就来写一个符合amd／cmd 和commonjs标准的模块。在文中会穿插一些AMD／CMD，commonjs的基础知识，主要是为了让自己复习一下。了解的同学们可以直接略过。</p>
<h1 id="articleHeader0">一 原模块</h1>
<p>该模块是一个实现类数组转为数组功能的模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(arrayLike){
  function arrayLikeObject2Array (arrayLike) {
    if (!Object.prototype.toString.call(arrayLike) === '[object Object]') {
      return
    } else {
      return Object.keys(arrayLike).map((key) => {
        return arrayLike[key]
      })
    }
  }
 return arrayLikeObject2Array
})(obj)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(<span class="hljs-name">arrayLike</span>){
  function arrayLikeObject2Array (<span class="hljs-name">arrayLike</span>) {
    if (<span class="hljs-name">!Object.prototype.toString.call</span>(<span class="hljs-name">arrayLike</span>) === '[object Object]') {
      return
    } else {
      return Object.keys(<span class="hljs-name">arrayLike</span>).map((<span class="hljs-name"><span class="hljs-builtin-name">key</span></span>) =&gt; {
        return arrayLike[key]
      })
    }
  }
 return arrayLikeObject2Array
})(<span class="hljs-name">obj</span>)</code></pre>
<h1 id="articleHeader1">二 改造成AMD／CMD 模块</h1>
<p>要改造成AMD／CMD模块，首先要了解这两种模块有哪些特点。AMD／CMD 都主要使用define来定义模块，区别在于AMD是依赖前置，而CMD则是依赖就近。什么意思呢？举一个例子，假设AMD和CMD都需要引用Jquery这个模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //amd
 define('module1',[Jquery],function(Jquery){
    using Jquery do something
})
//cmd 
define(function(require,exports,modules){
//do something
var $ =require(Jquery)
//using jquery do something
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-comment">//amd</span>
 define(<span class="hljs-string">'module1'</span>,[Jquery],<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Jquery</span>)</span>{
    using Jquery <span class="hljs-keyword">do</span> something
})
<span class="hljs-comment">//cmd </span>
define(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">require,exports,modules</span>)</span>{
<span class="hljs-comment">//do something</span>
<span class="hljs-keyword">var</span> $ =<span class="hljs-built_in">require</span>(Jquery)
<span class="hljs-comment">//using jquery do something</span>
})</code></pre>
<p>现在我们将原模块打造成AMD/CMD标准，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(root,factory){
  if(typeof define === 'function'){
    define([],factory)
  }
})(this,function(){
    function arrayLikeObject2Array(arrayLike){
        if (!Object.prototype.toString.call(arrayLike) === '[object Object]') {
           return
        } else {
           return Object.keys(arrayLike).map((key) => {
           return arrayLike[key]
          })
        }
    }
    return arrayLikeObject2Array     
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(<span class="hljs-name">root</span>,factory){
  if(<span class="hljs-name">typeof</span> define === 'function'){
    define([],factory)
  }
})(<span class="hljs-name">this</span>,function(){
    function arrayLikeObject2Array(<span class="hljs-name">arrayLike</span>){
        if (<span class="hljs-name">!Object.prototype.toString.call</span>(<span class="hljs-name">arrayLike</span>) === '[object Object]') {
           return
        } else {
           return Object.keys(<span class="hljs-name">arrayLike</span>).map((<span class="hljs-name"><span class="hljs-builtin-name">key</span></span>) =&gt; {
           return arrayLike[key]
          })
        }
    }
    return arrayLikeObject2Array     
})</code></pre>
<p>这样，我们的模块已经支持了AMD/CMD标准。</p>
<h1 id="articleHeader2">三 改造成commonjs规范</h1>
<p>commonjs模块是nodejs遵循的标准。它加载模块的方式是同步执行的。该规范一般用在服务器开发中。要把我们的模块改造成具有commonjs规范的模块如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (root, factory) {
  if (typeof define === 'function' &amp;&amp; define.amd) {
    define([], factory)
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.returnExports = factory() //如果没有AMD/CMD和CommonJS就挂在全局对象下
  }
})(this, function () {
  function arrayLikeObject2Array (arrayLike) {
    if (!Object.prototype.toString.call(arrayLike) === '[object Object]') {
      return
    } else {
      return Object.keys(arrayLike).map((key) => {
        return arrayLike[key]
      })
    }
  }
  return arrayLikeObject2Array
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span> (<span class="hljs-name">root</span>, factory) {
  if (<span class="hljs-name">typeof</span> define === 'function' &amp;&amp; define.amd) {
    define([], factory)
  } else if (<span class="hljs-name">typeof</span> exports === 'object') {
    module.exports = factory()
  } else {
    root.returnExports = factory() //如果没有AMD/CMD和CommonJS就挂在全局对象下
  }
})(<span class="hljs-name">this</span>, function () {
  function arrayLikeObject2Array (<span class="hljs-name">arrayLike</span>) {
    if (<span class="hljs-name">!Object.prototype.toString.call</span>(<span class="hljs-name">arrayLike</span>) === '[object Object]') {
      return
    } else {
      return Object.keys(<span class="hljs-name">arrayLike</span>).map((<span class="hljs-name"><span class="hljs-builtin-name">key</span></span>) =&gt; {
        return arrayLike[key]
      })
    }
  }
  return arrayLikeObject2Array
})</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何让模块支持AMD/CMD和commonjs标准

## 原文链接
[https://segmentfault.com/a/1190000010116152](https://segmentfault.com/a/1190000010116152)

