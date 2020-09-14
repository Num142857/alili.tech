---
title: '一个小小的JavaScript题目' 
date: 2019-01-29 2:30:10
hidden: true
slug: nn3mos73r2i
categories: [reprint]
---

{{< raw >}}

                    
<p>　今天前Leader在下班前发给我一道JavaScript的题目，看到感觉很不错，而且我开始的时候确实也理解错了，觉得有必要拿出来讲讲，并且为此我也做错了地铁，哈哈哈~<br>　　题目是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var length = 10;
function fn() {
    console.log(this.length)
};
var obj = {
    length: 5, 
    method: function (fn) {
        fn();
        arguments[0]();
        fn.call(obj, 12);
    }
};
obj.method(fn, 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> length = <span class="hljs-number">10</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.length)
};
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">length</span>: <span class="hljs-number">5</span>, 
    <span class="hljs-attr">method</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
        fn();
        <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]();
        fn.call(obj, <span class="hljs-number">12</span>);
    }
};
obj.method(fn, <span class="hljs-number">1</span>);</code></pre>
<p>　　请问输出是什么，当时那手机看的时候给出了答案</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="10 10 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">10 </span><span class="hljs-number">10</span> <span class="hljs-number">5</span></code></pre>
<p>　　实际上并不是如此，答案是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="10 2 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">10 </span><span class="hljs-number">2</span> <span class="hljs-number">5</span></code></pre>
<p>　　仔细分析了一下才知道原因，首先介绍一下四种this的类型：</p>
<ol>
<li><p><strong>默认绑定</strong></p></li>
<li><p><strong>隐式绑定</strong></p></li>
<li><p><strong>显示绑定</strong></p></li>
<li><p><strong>new绑定</strong></p></li>
</ol>
<p>其中，<strong>默认绑定</strong>就是什么都匹配不到的情况下，非严格模式<code>this</code>绑定到全局对象<code>window</code>或者<code>global</code>,严格模式绑定到<code>undefined</code>;<strong>隐式绑定</strong>就是函数作为对象的属性，通过对象属性的方式调用，这个时候<code>this</code>绑定到对象;<strong>显示绑定</strong>就是通过<code>apply</code>和<code>call</code>调用的方式;<strong>new绑定</strong>就是通过<code>new</code>操作符时将<code>this</code>绑定到当前新创建的对象中，它们的匹配有限是是从小到大的。<br>　　那么现在来解释一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj.method(fn, 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">obj.method(fn, <span class="hljs-number">1</span>);</code></pre>
<p>　　上述执行其实对应的是下面三条语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn(); 
arguments[0]();
fn.call(obj, 12);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">fn(); 
<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]();
fn.call(obj, <span class="hljs-number">12</span>);</code></pre>
<p>　　通过将函数赋值给函数参数(<code>fn</code>)，然后调用<code>fn</code>,这个时候能匹配到的<code>this</code>类型就是第一条<strong>默认绑定</strong>，因为实在非严格模式下，所以<code>this</code>绑定的是<code>window</code>，当然首先输出的是<code>10</code>。<br>　　先解释一下第三个，这个也很简单，因为用了<code>call</code>,所以实际匹配了<code>显示绑定</code>，所以当前<code>this</code>绑定了<code>obj</code>,那么输出的肯定是<code>2</code>。<br>　　下面着重解释一下第二个，这个我当时理解成和第一次完全一样，但实际并不是的，其实在JavaScript中数组算是一种特殊的对象（关于JavaScript对象的部分，我现在还在写，下一篇就会出的），<code>arguments[0]</code>其实就是通过对象的属性去调用（数组的默认属性类型是数值而普通对象的属性类型是字符串），那么现在其实运用的是规则2，<code>this</code>被绑定到<code>arguments</code>上，而<code>arguments</code>确实存在一个<code>length</code>属性，并且值为2（这个别告诉我你看不出来），所以输出的肯定就是<code>2</code>啦。<br>　　可见《你不知道的JavaScript》这本书说的很对，之所以会在ES6出现箭头函数，实质就像用<strong>词法作用域</strong>代替<code>this</code>,因为这个真的特别特别容易误用和让人误解。<br>　　欢迎大家到我的个人博客看看，<a href="https://mrerhu.github.io" rel="nofollow noreferrer" target="_blank">https://mrerhu.github.io</a>  ?</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个小小的JavaScript题目

## 原文链接
[https://segmentfault.com/a/1190000007964935](https://segmentfault.com/a/1190000007964935)

