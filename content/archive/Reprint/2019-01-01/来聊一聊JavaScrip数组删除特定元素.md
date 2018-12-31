---
title: '来聊一聊JavaScrip数组删除特定元素' 
date: 2019-01-01 2:30:07
hidden: true
slug: uc8w6y4a48p
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">序述</h2>
<blockquote><p>说到删除数组特定元素你可能不止一种方法可以实现, 下面且来看看我总结的这几种方法,可能会对你有所帮助！</p></blockquote>
<h2 id="articleHeader1">源数组</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;George&quot;, &quot;John&quot;, &quot;Thomas&quot;, &quot;James&quot;, &quot;Adrew&quot;, &quot;Martin&quot;];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"George"</span>, <span class="hljs-string">"John"</span>, <span class="hljs-string">"Thomas"</span>, <span class="hljs-string">"James"</span>, <span class="hljs-string">"Adrew"</span>, <span class="hljs-string">"Martin"</span>];</code></pre>
<h2 id="articleHeader2">伪删除</h2>
<blockquote><p>什么是伪删除呢? 就是说将数组元素值设置为null;</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr[ arr.indexOf( 'Thomas' ) ] = null;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">arr[ arr.indexOf( <span class="hljs-string">'Thomas'</span> ) ] = <span class="hljs-literal">null</span>;</code></pre>
<blockquote><p>删除后的数组是这个样子的:</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;George&quot;, &quot;John&quot;, null, &quot;James&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"George"</span>, <span class="hljs-string">"John"</span>, <span class="hljs-literal">null</span>, <span class="hljs-string">"James"</span>, <span class="hljs-string">"Adrew"</span>, <span class="hljs-string">"Martin"</span>]</code></pre>
<blockquote><p>不过要注意, 这意味着数组Array也就是变量arr的长度保持不变</p></blockquote>
<h2 id="articleHeader3">完全删除</h2>
<blockquote><p>是什么是完全删除呢? 这个问题你可能从字面上也能想得到就是真正的删除数组Array的元素值, 并且会改变数组的长度, 可以通过内置数组对象Array的splice方法来实现这个需求！说到splice这个方法就要说一说它的具体参数了：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.splice = function(start,deleteCount,items) {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">Array</span>.prototype.splice = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">start,deleteCount,items</span>) </span>{};</code></pre>
<blockquote><p>上面是内置对象Array的splice方法原型定义, 中文意思呢是：<code>剪接</code>, 其参数的意义是：</p></blockquote>
<ul>
<li><p><code>start</code>: 起点索引值</p></li>
<li><p><code>deleteCount</code>: 要删除的元素个数</p></li>
<li>
<p><code>items</code>: 删除后替换/追加的元素</p>
<ul>
<li><p>参数不加时就表示删除元素, 并且还要结合 <code>deleteCount</code> 的参数值</p></li>
<li><p>如果 <code>deleteCount</code> 为 <code>1</code>, <code>items</code> 参数位置给一个参数值, 则表示替换</p></li>
<li><p>如果 <code>deleteCount</code> 为 <code>1</code>, <code>items</code> 参数位置给多于一个的参数值, 则表示替换及追加元素</p></li>
</ul>
</li>
</ul>
<blockquote><p>通过splice方法删除上面 <code>伪删除</code> 留下的元素值 <code>null</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.splice( arr.indexOf( null ), 1 );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">arr.splice( arr.indexOf( <span class="hljs-literal">null</span> ), <span class="hljs-number">1</span> );</code></pre>
<blockquote><p>删除后的数组是这个样子的:</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;George&quot;, &quot;John&quot;, &quot;James&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"George"</span>, <span class="hljs-string">"John"</span>, <span class="hljs-string">"James"</span>, <span class="hljs-string">"Adrew"</span>, <span class="hljs-string">"Martin"</span>]</code></pre>
<blockquote><p>既然说到了splice方法就顺便再说一下它的其它功能, 如 <code>替换元素</code>, <code>追加元素</code> 等操作吧！</p></blockquote>
<h3 id="articleHeader4">splice函数 - 替换元素</h3>
<blockquote><p>现在数组结构是这样的：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;George&quot;, &quot;John&quot;, &quot;James&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"George"</span>, <span class="hljs-string">"John"</span>, <span class="hljs-string">"James"</span>, <span class="hljs-string">"Adrew"</span>, <span class="hljs-string">"Martin"</span>]</code></pre>
<blockquote><p>想要将数组元素 <code>James</code> 替换为 <code>Tom</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.splice( arr.indexOf( 'James' ), 1, 'Tom' );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">arr.splice( arr.indexOf( <span class="hljs-string">'James'</span> ), <span class="hljs-number">1</span>, <span class="hljs-string">'Tom'</span> );</code></pre>
<blockquote><p>替换后的数组结构是这个样子的：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;George&quot;, &quot;John&quot;, &quot;Tom&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"George"</span>, <span class="hljs-string">"John"</span>, <span class="hljs-string">"Tom"</span>, <span class="hljs-string">"Adrew"</span>, <span class="hljs-string">"Martin"</span>]</code></pre>
<h3 id="articleHeader5">splice函数 - 替换并追加元素</h3>
<blockquote><p>现在当前数组结构是这样的：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;George&quot;, &quot;John&quot;, &quot;Tom&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"George"</span>, <span class="hljs-string">"John"</span>, <span class="hljs-string">"Tom"</span>, <span class="hljs-string">"Adrew"</span>, <span class="hljs-string">"Martin"</span>]</code></pre>
<blockquote><p>想要将数组元素 <code>Tom</code> 替换为 <code>Judy</code> 并追加 <code>Linda</code> 和 <code>Alisa</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.splice( arr.indexOf( 'Tom' ), 1, 'Judy', 'Linda', 'Alisa' );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">arr.splice( arr.indexOf( <span class="hljs-string">'Tom'</span> ), <span class="hljs-number">1</span>, <span class="hljs-string">'Judy'</span>, <span class="hljs-string">'Linda'</span>, <span class="hljs-string">'Alisa'</span> );</code></pre>
<blockquote><p>替换及追加后的数组结构是这个样子的：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;George&quot;, &quot;John&quot;, &quot;Judy&quot;, &quot;Linda&quot;, &quot;Alisa&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"George"</span>, <span class="hljs-string">"John"</span>, <span class="hljs-string">"Judy"</span>, <span class="hljs-string">"Linda"</span>, <span class="hljs-string">"Alisa"</span>, <span class="hljs-string">"Adrew"</span>, <span class="hljs-string">"Martin"</span>]</code></pre>
<h3 id="articleHeader6">splice函数 - 追加元素</h3>
<blockquote><p>追加元素你可以选择任意位置这取决于你的具体需求, 关键是在于 <code>start</code> 的取值索引位置而已！当前数组结构如下所示：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;George&quot;, &quot;John&quot;, &quot;Judy&quot;, &quot;Linda&quot;, &quot;Alisa&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"George"</span>, <span class="hljs-string">"John"</span>, <span class="hljs-string">"Judy"</span>, <span class="hljs-string">"Linda"</span>, <span class="hljs-string">"Alisa"</span>, <span class="hljs-string">"Adrew"</span>, <span class="hljs-string">"Martin"</span>]</code></pre>
<blockquote><p>比如说要在 <code>Linda</code> 和 <code>Alisa</code> 之间追加 <code>Bill</code> 和 <code>Blake</code></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.splice( arr.indexOf( 'Linda' ) + 1, 0, 'Bill', 'Blake' );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">arr.splice( arr.indexOf( <span class="hljs-string">'Linda'</span> ) + <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'Bill'</span>, <span class="hljs-string">'Blake'</span> );</code></pre>
<blockquote><p>追加后的数组结构是下面这个样子的：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;George&quot;, &quot;John&quot;, &quot;Judy&quot;, &quot;Linda&quot;, &quot;Bill&quot;, &quot;Blake&quot;, &quot;Alisa&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"George"</span>, <span class="hljs-string">"John"</span>, <span class="hljs-string">"Judy"</span>, <span class="hljs-string">"Linda"</span>, <span class="hljs-string">"Bill"</span>, <span class="hljs-string">"Blake"</span>, <span class="hljs-string">"Alisa"</span>, <span class="hljs-string">"Adrew"</span>, <span class="hljs-string">"Martin"</span>]</code></pre>
<ul>
<li><p>起点位置 <code>arr.indexOf( 'Linda' ) + 1</code> 就是在数组元素 <code>Linda</code> 之后了</p></li>
<li><p>删除元素个数参数这里设置的是 <code>0</code> 这个是追加元素的关键, 也就是说不删除元素</p></li>
<li><p><code>'Bill', 'Blake'</code> 这个呢就是内置对象Array的splice方法的最后一个参数 <code>items</code> 它表示0个是和多个, 根据 <code>deleteCount</code> 参数值不同表示的含义也会不同, 这里 <code>deleteCount</code> 参数是 <code>0</code> 并且 <code>items</code> 又有两个值来表示这个参数, 所示说就是追加元素值 <code>'Bill', 'Blake'</code></p></li>
</ul>
<blockquote><p>以上说的是删除数组中特定的元素, 那删除第一个元素和最后一个元素那实现在是太简单了, 这里简单提一下就是了</p></blockquote>
<h2 id="articleHeader7">删除数组中第一个元素</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.shift();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">arr.shift();</code></pre>
<blockquote><p>删除后的数组是这个样子的:</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;John&quot;, &quot;Judy&quot;, &quot;Linda&quot;, &quot;Bill&quot;, &quot;Blake&quot;, &quot;Alisa&quot;, &quot;Adrew&quot;, &quot;Martin&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"John"</span>, <span class="hljs-string">"Judy"</span>, <span class="hljs-string">"Linda"</span>, <span class="hljs-string">"Bill"</span>, <span class="hljs-string">"Blake"</span>, <span class="hljs-string">"Alisa"</span>, <span class="hljs-string">"Adrew"</span>, <span class="hljs-string">"Martin"</span>]</code></pre>
<h2 id="articleHeader8">删除数组中最后一个元素</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.pop();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">arr.pop();</code></pre>
<blockquote><p>删除后的数组是这个样子的:</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;John&quot;, &quot;Judy&quot;, &quot;Linda&quot;, &quot;Bill&quot;, &quot;Blake&quot;, &quot;Alisa&quot;, &quot;Adrew&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[<span class="hljs-string">"John"</span>, <span class="hljs-string">"Judy"</span>, <span class="hljs-string">"Linda"</span>, <span class="hljs-string">"Bill"</span>, <span class="hljs-string">"Blake"</span>, <span class="hljs-string">"Alisa"</span>, <span class="hljs-string">"Adrew"</span>]</code></pre>
<blockquote>
<p>以上就是JavaScrip数组删除特定元素个人所总结的一些方法, 如果您还要其它的一些好的方法, 请您留言示下, 谢谢您的支持！</p>
<p>希望本文对你的工作和学习有所帮助</p>
<p>如果觉得还不错并且也长知识了, 怎么感谢我呢？ 妈呀! 点赞啊!</p>
<p>Good Luck! from warnerwu at 2017.09.06 AM</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
来聊一聊JavaScrip数组删除特定元素

## 原文链接
[https://segmentfault.com/a/1190000011030270](https://segmentfault.com/a/1190000011030270)

