---
title: 'call和apply的区别和用法' 
date: 2018-12-25 2:30:11
hidden: true
slug: q78ozjnngdg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">call和apply的区别</h2>
<p>obj.call(thisObj, arg1, arg2, ...);<br>obj.apply(thisObj, [arg1, arg2, ...]);<br>call和apply作用都是把obj绑定到thisObj的作用，即改变this的指向，然而唯一的区别就是apply传递的参数必须得是数组的形式传递，而call则直接连续参数传递</p>
<h2 id="articleHeader1">call和apply在什么地方可以用到呢？</h2>
<p>当一个对象需要调用另外一个对象里面的方法的时候就可以用到call和apply，call和Apply可以理解成是继承另外一个对象的方法，以下代码举例：</p>
<p>首先，我们先建立两个对象，obj1和obj2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var name = &quot;全局中的name&quot;;
    var obj1 = {
        name:&quot;obj1中的name&quot;,
        func1:function(){
            console.log(this.name);
        },
        func2:function (a,b) {
            console.log(a+b);
            return a+b;
        }
    }

    var obj2 = {
        name:&quot;obj2中的name&quot;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> name = <span class="hljs-string">"全局中的name"</span>;
    <span class="hljs-keyword">var</span> obj1 = {
        <span class="hljs-attr">name</span>:<span class="hljs-string">"obj1中的name"</span>,
        <span class="hljs-attr">func1</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
        },
        <span class="hljs-attr">func2</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a,b</span>) </span>{
            <span class="hljs-built_in">console</span>.log(a+b);
            <span class="hljs-keyword">return</span> a+b;
        }
    }

    <span class="hljs-keyword">var</span> obj2 = {
        <span class="hljs-attr">name</span>:<span class="hljs-string">"obj2中的name"</span>
    }</code></pre>
<p>如果obj2对象要调用obj1中的func1方法，则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" obj1.func1.call(obj2); //输出：obj2中的name
 obj1.func1.apply(obj2);//输出：obj2中的name" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code> obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">nc1</span>.<span class="hljs-keyword">call</span><span class="hljs-comment">(obj2)</span>; <span class="hljs-comment">//输出：obj2中的name</span>
 obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">nc1</span>.apply<span class="hljs-comment">(obj2)</span>;<span class="hljs-comment">//输出：obj2中的name</span></code></pre>
<p>call和apply第一个参数都是表示obj1绑定的对象，如果obj1要绑定到this，此时obj1就是绑定到全局，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" obj1.func1.call(this);//输出：全局中的name
 obj1.func1.apply(this);//输出：全局中的name" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code> obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">nc1</span>.<span class="hljs-keyword">call</span><span class="hljs-comment">(this)</span>;<span class="hljs-comment">//输出：全局中的name</span>
 obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">nc1</span>.apply<span class="hljs-comment">(this)</span>;<span class="hljs-comment">//输出：全局中的name</span></code></pre>
<p>如果obj2对象要调用obj1中的func2方法，则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  obj1.func2.call(obj2,1,2);//输出：3
  obj1.func2.apply(obj2,[1,2]);//输出：3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>  obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">nc2</span>.<span class="hljs-keyword">call</span><span class="hljs-comment">(obj2,1,2)</span>;<span class="hljs-comment">//输出：3</span>
  obj<span class="hljs-number">1.</span>fu<span class="hljs-symbol">nc2</span>.apply<span class="hljs-comment">(obj2,[1,2])</span>;<span class="hljs-comment">//输出：3</span></code></pre>
<p>此时func2方法是有参数的，call和apply中第二个参数开始是传给func2方法的参数，但是call参数是直接连续传递，而apply传递参数是以一个数组传递</p>
<p>全部代码展示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var name = &quot;全局中的name&quot;;
    var obj1 = {
        name:&quot;obj1中的name&quot;,
        func1:function(){
            console.log(this.name);
        },
        func2:function (a,b) {
            console.log(a+b);
            return a+b;
        }
    }

    var obj2 = {
        name:&quot;obj2中的name&quot;
    }

    obj1.func1.call(this);//输出：全局中的name
    obj1.func1.apply(this);//输出：全局中的name

    obj1.func1.call(obj2); //输出：obj2中的name
    obj1.func1.apply(obj2);//输出：obj2中的name

    obj1.func2.call(obj2,1,2);//输出：3
    obj1.func2.apply(obj2,[1,2]);//输出：3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-keyword">var</span> name = <span class="hljs-string">"全局中的name"</span>;
    <span class="hljs-keyword">var</span> obj1 = {
        <span class="hljs-attr">name</span>:<span class="hljs-string">"obj1中的name"</span>,
        <span class="hljs-attr">func1</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
        },
        <span class="hljs-attr">func2</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a,b</span>) </span>{
            <span class="hljs-built_in">console</span>.log(a+b);
            <span class="hljs-keyword">return</span> a+b;
        }
    }

    <span class="hljs-keyword">var</span> obj2 = {
        <span class="hljs-attr">name</span>:<span class="hljs-string">"obj2中的name"</span>
    }

    obj1.func1.call(<span class="hljs-keyword">this</span>);<span class="hljs-comment">//输出：全局中的name</span>
    obj1.func1.apply(<span class="hljs-keyword">this</span>);<span class="hljs-comment">//输出：全局中的name</span>

    obj1.func1.call(obj2); <span class="hljs-comment">//输出：obj2中的name</span>
    obj1.func1.apply(obj2);<span class="hljs-comment">//输出：obj2中的name</span>

    obj1.func2.call(obj2,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>);<span class="hljs-comment">//输出：3</span>
    obj1.func2.apply(obj2,[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>]);<span class="hljs-comment">//输出：3</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
call和apply的区别和用法

## 原文链接
[https://segmentfault.com/a/1190000012116140](https://segmentfault.com/a/1190000012116140)

