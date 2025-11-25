---
title: '【转】js中this用法' 
date: 2019-02-11 2:30:49
hidden: true
slug: zqm6vqw9f1d
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">javascript中的this</h1>
<p><a href="https://code.mforever78.com/translation/2015/05/19/understand-javascripts-this-with-clarity-and-master-it/%20" rel="nofollow noreferrer" target="_blank">译：理解并掌握 JavaScript 中 this 的用法</a></p>
<h2 id="articleHeader1">关键</h2>
<p><strong>只有一个对象调用了包含<code>this</code>函数时，<code>this</code>才被赋值，并且所赋的值只依赖于调用了包含<code>this</code>函数的对象</strong></p>
<h2 id="articleHeader2">使用原则</h2>
<ol>
<li><p><code>this</code>永远指向一个对象，并且拥有着个对象的值</p></li>
<li><p>在严格模式下，在全局作用域中和匿名函数中，<code>this</code>指向<code>undefined</code></p></li>
<li><p>当<code>this</code>在一个函数内出现的时候，<code>this</code>指向调用这个函数的对象</p></li>
</ol>
<h2 id="articleHeader3">易错场景</h2>
<ol>
<li>
<p>包含<code>this</code>的方法被当作回调函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    $(&quot;button&quot;).click(callback);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>    $(<span class="hljs-string">"button"</span>).<span class="hljs-built_in">click</span>(callback);
</code></pre>
<p>期待<code>this</code>指向：包含该方法的对象</p>
<p>实际<code>this</code>指向：调用了回调函数的对象</p>
<p>解决办法：<code>bind</code></p>
</li>
<li>
<p><code>this</code>出现在闭包内</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   
       ...
    example: function(){
        [1,2,3,4].forEach(function(item){
           this.test(item)
       })
   }
       ...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>   
       ...
    example: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
        [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span></span>{
           <span class="hljs-keyword">this</span>.test(item)
       })
   }
       ...
</code></pre>
<p>期待<code>this</code>指向：外层函数的<code>this</code>指向</p>
<p>实际<code>this</code>指向：undefined或者全局对象</p>
<p>解决办法：使用另外一个变量保存<code>this</code>值</p>
</li>
<li>
<p>把包含<code>this</code>的方法赋给一个变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   var user = {
       name: 'hhh',
       sayName: function(){
           console.log(this.name);
       }
   }
   var test = user.sayName;
   test();//  全局变量的this
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-keyword">var</span> user = {
       <span class="hljs-attr">name</span>: <span class="hljs-string">'hhh'</span>,
       <span class="hljs-attr">sayName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
           <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
       }
   }
   <span class="hljs-keyword">var</span> test = user.sayName;
   test();<span class="hljs-comment">//  全局变量的this</span>
</code></pre>
<p>期待<code>this</code>指向：包含该方法的对象</p>
<p>实际<code>this</code>指向：包含该变量的对象</p>
<p>解决办法：<code>bind</code></p>
</li>
<li><p>借用包含<code>this</code>的方法</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var user1 = {
        name: 'hhh',
        sayName: function(){
            console.log(this.name);
        }
    }    
    var user2 = {
        name: 'ggg'
    }
    user2.ggg = user1.sayName();//

期待`this`指向：借用`this`方法的对象

实际`this`指向：包含该`this`方法的对象

解决办法：`apply`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> user1 = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'hhh'</span>,
        <span class="hljs-attr">sayName</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
        }
    }    
    <span class="hljs-keyword">var</span> user2 = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'ggg'</span>
    }
    user2.ggg = user1.sayName();<span class="hljs-comment">//</span>

期待<span class="hljs-string">`this`</span>指向：借用<span class="hljs-string">`this`</span>方法的对象

实际<span class="hljs-string">`this`</span>指向：包含该<span class="hljs-string">`this`</span>方法的对象

解决办法：<span class="hljs-string">`apply`</span>
</code></pre>
<p>this的使用是一个经常容易出错的地方，但是只要把握一个原则，即</p>
<p><strong><code>this</code>总是指向调用包含<code>this</code>的方法的对象</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【转】js中this用法

## 原文链接
[https://segmentfault.com/a/1190000004986355](https://segmentfault.com/a/1190000004986355)

