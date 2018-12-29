---
title: 'Chrome控制台选择器简介' 
date: 2018-12-30 2:30:10
hidden: true
slug: w9ye6tys2kp
categories: [reprint]
---

{{< raw >}}

                    
<p>Chrome的控制台是支持用<code>$</code>来获取元素的，这点可能是很多人不知道的。本篇文章将会简单介绍怎样更好的来使用这种快捷方式来获取元素。</p>
<h2 id="articleHeader0">判断当前窗口的$是来自谁的</h2>
<p>我们知道<code>jQ</code>里面经常使用<code>$</code>来进行元素选择，Chrome也提供<code>$</code>来进行元素选择，而很多页面都会引入<code>jQ</code>，但是由于这两种方式返回的结果是不一样的。所以我们要区分一下这个<code>$</code>是由谁提供的，以便进行下一步操作。<br>做区分的方式很简单，在<code>console</code>中输入<code>$</code>，然后通过输出的信息来判断这个<code>$</code>来自那里。一般做如下区分：</p>
<h2 id="articleHeader1">来自Chrome提供的$</h2>
<p>如果这个<code>$</code>是由Chrome提供的，那么会有如下提示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ƒ $(selector, [startNode]) { [Command Line API] }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">ƒ $(selector, [startNode]) { [Command Line API] }</code></pre>
<h2 id="articleHeader2">来自jQ的$</h2>
<p>而如果这个<code>$</code>是由<code>jQ</code>提供的则返回如下信息</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ƒ (e,t){return new s.fn.init(e,t,r)}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">ƒ (e,t){<span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> s.fn.init(e,t,r)}</code></pre>
<p>或者是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ƒ ( selector, context ) {

        // The jQuery object is actually just the init constructor 'enhanced'
        // Need init if jQuery is called (just allow error to be thrown if not included)
        return new jQuery…" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">ƒ ( selector, context ) {

        <span class="hljs-comment">// The jQuery object is actually just the init constructor 'enhanced'</span>
        <span class="hljs-comment">// Need init if jQuery is called (just allow error to be thrown if not included)</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> jQuery…</code></pre>
<h2 id="articleHeader3">Chrome提供的$的用法</h2>
<p>上面我们已经对Chrome提供的<code>$</code>与jQ提供的<code>$</code>做出了区分。jQ的<code>$</code>大家很熟悉，不用多说，我们主要介绍Chrome提供的<code>$</code>的用法，以及与jQ提供的<code>$</code>的区别。<br>Chrome的<code>$</code>其实调用的是<code>querySelector()</code>。所以<code>$</code>的使用很简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#query'); // 获取id为query的一个元素
$('.nav'); // 获取class包含nav的一个元素
$('div'); // 获取tagName为div的一个元素" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'#query'</span>); <span class="hljs-comment">// 获取id为query的一个元素</span>
$(<span class="hljs-string">'.nav'</span>); <span class="hljs-comment">// 获取class包含nav的一个元素</span>
$(<span class="hljs-string">'div'</span>); <span class="hljs-comment">// 获取tagName为div的一个元素</span></code></pre>
<p>除了可以使用<code>$</code>,我们还可以使用<code>$$`。`$$</code>其实调用的是<code>querySelectorAll()</code>，所以通过<code>$$</code>我们可以获取到一个<code>NodeList</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.nav'); // 获取calss包含nav的所有元素
$('div'); // 获取tagName为div的所有元素" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'.nav'</span>); <span class="hljs-comment">// 获取calss包含nav的所有元素</span>
$(<span class="hljs-string">'div'</span>); <span class="hljs-comment">// 获取tagName为div的所有元素</span></code></pre>
<p>除了上面提到的，我们可以使用<code>$x</code>来通过<code>xPath</code>选择元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$x('html/body/div') // 获取html下的直接子元素body下的直接子元素div" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$x(<span class="hljs-string">'html/body/div'</span>) <span class="hljs-comment">// 获取html下的直接子元素body下的直接子元素div</span></code></pre>
<p>此外，我们需要注意的是:</p>
<blockquote>
<p>通过<code>jQ</code>的<code>$</code>获取到的是一个<code>jQ</code>对象。这点我们可以通过在支持的<code>jQ</code>的页面中打开<code>Console</code>输入下面的语句来确认。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('a') instanceof document // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'a'</span>) <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">document</span> <span class="hljs-comment">// true</span></code></pre>
<p>而由于Chrome提供的<code>$</code>是调用的<code>querySelector</code>，所以通过Chrome的<code>$</code>到的是原生的元素对象，这点是需要注意的。</p>
</blockquote>
<hr>
<p>本文发布的两个地址：</p>
<ul>
<li><a href="http://www.cnblogs.com/aqiongbei/p/7577755.html" rel="nofollow noreferrer" target="_blank">cnBlogs | 博客随笔</a></li>
<li><a href="https://segmentfault.com/a/1190000011369235">segmentfault | segmentfault文章</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Chrome控制台选择器简介

## 原文链接
[https://segmentfault.com/a/1190000011369235](https://segmentfault.com/a/1190000011369235)

