---
title: '（JavaScript） this的用法' 
date: 2019-02-10 2:30:42
hidden: true
slug: 0pylb6j21log
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">一、全局范围</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this // window" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span> <span class="hljs-comment">// window</span></code></pre>
<p>全局范围中的<code>this</code>将会指向全局对象，即<code>window</code>。</p>
<h3 id="articleHeader1">二、普通函数调用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(x) {
  this.x = x;
}
foo(3);
(x /* or this.x */); // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">this</span>.x = x;
}
foo(<span class="hljs-number">3</span>);
(x <span class="hljs-comment">/* or this.x */</span>); <span class="hljs-comment">// 3</span></code></pre>
<p><code>this</code>指向全局对象，即<code>window</code>。严格模式时，为<code>undefined</code>。</p>
<h3 id="articleHeader2">三、作为对象的方法调用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;foo&quot;;  
var person = {  
  name : &quot;bar&quot;,  
  hello : function(sth){  
    console.log(this.name + &quot; says &quot; + sth);  
    }  
}  
person.hello(&quot;hello&quot;); // bar says hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"foo"</span>;  
<span class="hljs-keyword">var</span> person = {  
  <span class="hljs-attr">name</span> : <span class="hljs-string">"bar"</span>,  
  <span class="hljs-attr">hello</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sth</span>)</span>{  
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">" says "</span> + sth);  
    }  
}  
person.hello(<span class="hljs-string">"hello"</span>); <span class="hljs-comment">// bar says hello</span></code></pre>
<p><code>this</code>指向<code>person</code>对象，即当前对象。</p>
<h3 id="articleHeader3">四、作为构造函数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = new Bar(name) {
  this.name = name;
  this.age = 28;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> Bar(name) {
  <span class="hljs-keyword">this</span>.name = name;
  <span class="hljs-keyword">this</span>.age = <span class="hljs-number">28</span>;
}</code></pre>
<p>函数内部的<code>this</code>指向创建的对象。</p>
<h3 id="articleHeader4">五、闭包（内部函数）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;foo&quot;;  
var person = {  
  name : &quot;bar&quot;,  
  hello : function(sth){  
    var sayhello = function(sth) {
      console.log(this.name + &quot; says &quot; + sth);
    };
    sayhello(sth)  
  }  
}  
person.hello(&quot;hello&quot;); // foo says hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"foo"</span>;  
<span class="hljs-keyword">var</span> person = {  
  <span class="hljs-attr">name</span> : <span class="hljs-string">"bar"</span>,  
  <span class="hljs-attr">hello</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sth</span>)</span>{  
    <span class="hljs-keyword">var</span> sayhello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sth</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">" says "</span> + sth);
    };
    sayhello(sth)  
  }  
}  
person.hello(<span class="hljs-string">"hello"</span>); <span class="hljs-comment">// foo says hello</span></code></pre>
<p><code>this.name</code>为<code>foo</code>，所以<code>this</code>指向全局变量，即<code>window</code>。所以，一般将<code>this</code>作为变量保存下来。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var name = &quot;foo&quot;;  
var person = {  
  name : &quot;bar&quot;,  
  hello : function(sth){  
    var self = this;
    var sayhello = function(sth) {
      console.log(self.name + &quot; says &quot; + sth);
    };
    sayhello(sth)  
  }  
}  
person.hello(&quot;hello&quot;); // bar says hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> name = <span class="hljs-string">"foo"</span>;  
<span class="hljs-keyword">var</span> person = {  
  <span class="hljs-attr">name</span> : <span class="hljs-string">"bar"</span>,  
  <span class="hljs-attr">hello</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sth</span>)</span>{  
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> sayhello = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">sth</span>) </span>{
      <span class="hljs-built_in">console</span>.log(self.name + <span class="hljs-string">" says "</span> + sth);
    };
    sayhello(sth)  
  }  
}  
person.hello(<span class="hljs-string">"hello"</span>); <span class="hljs-comment">// bar says hello</span></code></pre>
<h3 id="articleHeader5">六、使用call与apply设置this</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fun.apply(thisArg, [argsArray])
fun.call(thisArg[, arg1[, arg2[, ...]]])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fun.apply(thisArg, [argsArray])
fun.call(thisArg[, arg1[, arg2[, ...]]])</code></pre>
<p>函数绑定到<code>thisArg</code>这个对象上使用，<code>this</code>就指向<code>thisArg</code>。</p>
<h3 id="articleHeader6">七、总结</h3>
<ol>
<li><p>当函数作为对象的方法调用时，<code>this</code>指向该对象。</p></li>
<li><p>当函数作为淡出函数调用时，<code>this</code>指向全局对象（严格模式时，为<code>undefined</code>）。</p></li>
<li><p>构造函数中的<code>this</code>指向新创建的对象。</p></li>
<li><p>嵌套函数中的<code>this</code>不会继承上层函数的<code>this</code>，如果需要，可以用一个变量保存上层函数的<code>this</code>。</p></li>
</ol>
<p>一句话总结：如果在函数中使用了<code>this</code>，只有在该函数直接被某对象调用时，该<code>this</code>才指向该对象。</p>
<h3 id="articleHeader7">八、一个常见的坑</h3>
<p>事件绑定中回调函数的<code>this</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addEventListener(elem, func, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">addEventListener(elem, func, <span class="hljs-literal">false</span>);</code></pre>
<p>如果<code>func</code>中有使用<code>this</code>，<code>this</code>指向<code>elem</code>，即使<code>func</code>的形式是<code>obj.func</code>，其中的this依然指向<code>elem</code>，可用<code>var self = this;</code>的方法解决这个问题。</p>
<h5>参考：<a href="http://www.cnblogs.com/aaronjs/archive/2011/09/02/2164009.html" rel="nofollow noreferrer" target="_blank">谈谈Javascript的this指针</a> （作者：Aaron）</h5>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
（JavaScript） this的用法

## 原文链接
[https://segmentfault.com/a/1190000005168249](https://segmentfault.com/a/1190000005168249)

