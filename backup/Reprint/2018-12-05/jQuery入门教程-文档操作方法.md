---
title: 'jQuery入门教程-文档操作方法' 
date: 2018-12-05 2:30:09
hidden: true
slug: 291lwr58l13
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、append()和appendTo()</h2>
<h3 id="articleHeader1">1.1 append()方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <p>好好学习</p>
    <button>append() 方法</button>
</body>
    <script>
        $('button').click(function() {
            $('p').append('<p>天天向上</p>');
        });
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>好好学习<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>append() 方法<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        $(<span class="hljs-string">'button'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'p'</span>).append(<span class="hljs-string">'&lt;p&gt;天天向上&lt;/p&gt;'</span>);
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8zrT?w=461&amp;h=117" src="https://static.alili.tech/img/bV8zrT?w=461&amp;h=117" alt="append" title="append" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">1.2 appendTo()方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <p>好好学习</p>
    <button>appendTo() 方法</button>
</body>
    <script>
        $('button').click(function() {
            $('<p>天天向上</p>').appendTo('p');
        });
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>好好学习<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>appendTo() 方法<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        $(<span class="hljs-string">'button'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'&lt;p&gt;天天向上&lt;/p&gt;'</span>).appendTo(<span class="hljs-string">'p'</span>);
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8zrU?w=461&amp;h=119" src="https://static.alili.tech/img/bV8zrU?w=461&amp;h=119" alt="appendTo" title="appendTo" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">1.3 append()和appendTo()比较</h3>
<p>（1）用法相同<br>在被选元素的<strong>结尾</strong>（仍然在内部）插入指定内容。</p>
<p>（2）不同之处<br>内容和选择器的<strong>位置</strong>不同，以及 append() 能够使用<strong>函数</strong>来附加内容。</p>
<h2 id="articleHeader4">二、html()方法</h2>
<h3 id="articleHeader5">2.1 返回元素内容</h3>
<blockquote>当使用该方法返回一个值时，它会返回第一个匹配元素的<strong>内容 (inner HTML)</strong>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <p>好好学习</p>
    <button>返回被选元素的内容</button>
</body>
    <script>
        $('button').click(function() {
            alert($('p').html());
        });
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>好好学习<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>返回被选元素的内容<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        $(<span class="hljs-string">'button'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            alert($(<span class="hljs-string">'p'</span>).html());
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8zvj?w=461&amp;h=128" src="https://static.alili.tech/img/bV8zvj?w=461&amp;h=128" alt="html" title="html" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">2.2 设置元素内容</h3>
<p>当使用该方法设置一个值时，它会<strong>覆盖</strong>所有匹配元素的内容 (inner HTML)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <p>好好学习</p>
    <button>设置被选元素的内容</button>
</body>
    <script>
        $('button').click(function() {
            $('p').html('天天向上');
        });
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>好好学习<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>设置被选元素的内容<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        $(<span class="hljs-string">'button'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'p'</span>).html(<span class="hljs-string">'天天向上'</span>);
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8zwB?w=466&amp;h=82" src="https://static.alili.tech/img/bV8zwB?w=466&amp;h=82" alt="html" title="html" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">2.3 使用函数来设置元素内容</h3>
<p>（1）语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(selector).html(function(index,oldcontent))
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>$(<span class="hljs-keyword">selector</span>).html(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(<span class="hljs-keyword">index</span>,oldcontent)</span>)
</span></code></pre>
<p>（2）参数</p>
<table>
<thead><tr>
<th>参数</th>
<th>描述</th>
</tr></thead>
<tbody><tr>
<td>function(index,oldcontent)</td>
<td>规定一个返回被选元素的新内容的函数。index - 可选。<strong>接收选择器的 index 位置</strong>。oldcontent - 可选。接收选择器的当前内容。</td>
</tr></tbody>
</table>
<p>（3）示例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <p>好好学习</p>
    <p>天天向上</p>
    <button>设置被选元素的内容</button>
</body>
    <script>
        $('button').click(function() {
            $('p').html(function (n) {
                return '这个 p 元素的 index 是' + ' ' + n;
            });
        });
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>好好学习<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>天天向上<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>设置被选元素的内容<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        $(<span class="hljs-string">'button'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'p'</span>).html(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">n</span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-string">'这个 p 元素的 index 是'</span> + <span class="hljs-string">' '</span> + n;
            });
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8zyF?w=466&amp;h=121" src="https://static.alili.tech/img/bV8zyF?w=466&amp;h=121" alt="html" title="html" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">三、append()、appendTo()和html()的区别</h2>
<p>（1）append()和appendTo()方法是在被选元素的结尾（仍然在内部）插入内容，是在<strong>原有内容的基础上增加</strong>。</p>
<p>（2）html()方法是<strong>覆盖</strong>所有内容，是原有的内容被<strong>替换</strong>。</p>
<p><a href="https://segmentfault.com/u/webing123">阅读更多</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery入门教程-文档操作方法

## 原文链接
[https://segmentfault.com/a/1190000014400580](https://segmentfault.com/a/1190000014400580)

