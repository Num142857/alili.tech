---
title: '全面理解document.write()' 
date: 2019-01-29 2:30:10
hidden: true
slug: o0i2646osbd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">W3C 标准</h2>
<p><a href="https://html.spec.whatwg.org/#dom-document-write" rel="nofollow noreferrer" target="_blank">WHATWG: write()</a></p>
<h2 id="articleHeader1">定义和用法</h2>
<p>文档节点的write()方法用于写入文档内容，可以传多个参数，写入的字符串会按HTML解析。</p>
<ul>
<li><p>语法：document.write()</p></li>
<li><p>参数：字符串，可以传多个字符串参数</p></li>
<li><p>返回值：undefined</p></li>
</ul>
<h2 id="articleHeader2">注意事项</h2>
<ol>
<li><p>如果document.write()在DOMContentLoaded或load事件的回调函数中，当文档加载完成，<br>则会先清空文档（自动调用document.open()），再把参数写入body内容的开头。</p></li>
<li><p>在异步引入的js和DOMContentLoaded或load事件的回调函数中运行document.write()，<br>运行完后，最好手动关闭文档写入（document.close()）。</p></li>
</ol>
<h2 id="articleHeader3">示例代码</h2>
<p>在head中运行document.write()，则参数写在body内容的开头。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 运行前 -->
<head>
    <script>
        document.write('<p>test</p>');
    </script>
</head>
<body>
    <h2>write()</h2>
</body>

<!-- 运行后 -->
<head>
    <script>
        document.write('<p>test</p>');
    </script>
</head>
<body>
    <p>test</p>
    <h2>write()</h2>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 运行前 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;p&gt;test&lt;/p&gt;'</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>write()<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 运行后 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;p&gt;test&lt;/p&gt;'</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>write()<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>在body中运行document.write()，则参数写在运行的script标签后面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 运行前 -->
<div>
    <script>
        document.write('<p>test</p>');
    </script>
    <p>content</p>
</div>

<!-- 运行后 -->
<div>
    <script>
        document.write('<p>test</p>');
    </script>
    <p>test</p>
    <p>content</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 运行前 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;p&gt;test&lt;/p&gt;'</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>content<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 运行后 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;p&gt;test&lt;/p&gt;'</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>content<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>同步引用外部js，参数也是写在运行的script标签后面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// syncWrite.js
document.write('<p>test</p>');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// syncWrite.js</span>
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;p&gt;test&lt;/p&gt;'</span>);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- syncWrite.html -->
<!-- 运行前 -->
<body>
    <script src=&quot;syncWrite.js&quot;></script>
    <p>content</p>
</body>

<!-- 运行后 -->
<body>
    <script src=&quot;syncWrite.js&quot;></script>
    <p>test</p>
    <p>content</p>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- syncWrite.html --&gt;</span>
<span class="hljs-comment">&lt;!-- 运行前 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"syncWrite.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>content<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 运行后 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"syncWrite.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>content<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>异步引用外部js，必须先运行document.open()清空文档，然后才能运行document.write()，参数写在body内容的开头。<br>如果不先运行document.open()，直接运行document.write()，则无效且Chrome有如下提示：</p>
<p><span class="img-wrap"><img data-src="/img/bVHyx2?w=779&amp;h=153" src="https://static.alili.tech/img/bVHyx2?w=779&amp;h=153" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// asyncWrite.js
document.open();
document.write('<p>test</p>');
document.close();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// asyncWrite.js</span>
<span class="hljs-built_in">document</span>.open();
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;p&gt;test&lt;/p&gt;'</span>);
<span class="hljs-built_in">document</span>.close();</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- asyncWrite.html -->
<!-- 运行前 -->
<body>
    <script src=&quot;asyncWrite.js&quot; async></script>
</body>

<!-- 运行后 -->
<body>
    <p>test</p>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- asyncWrite.html --&gt;</span>
<span class="hljs-comment">&lt;!-- 运行前 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"asyncWrite.js"</span> <span class="hljs-attr">async</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 运行后 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>如果document.write()在DOMContentLoaded或load事件的回调函数中，则不管是在head中，body中，同步的js中，异步的js中，<br>都会先清空文档（自动调用document.open()），然后运行document.write()，参数写在body内容的开头</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 运行前 -->
<body>
    <script>
        window.addEventListener('load', function () {
            document.write('<p>test</p>');
            document.close();
        }, false);
    </script>
</body>

<!-- 运行后 -->
<body>
    <p>test</p>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 运行前 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'load'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">document</span>.write(<span class="hljs-string">'&lt;p&gt;test&lt;/p&gt;'</span>);
            <span class="hljs-built_in">document</span>.close();
        }, <span class="hljs-literal">false</span>);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 运行后 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>document.write()也能写入含有script标签的字符串，但是需要转义。写入的script标签中的内容会正常运行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 运行前 -->
<script>
    document.write('<script>document.write(&quot;<p>test</p>&quot;);<\/script>');
</script>

<!-- 运行后 -->
<script>
    document.write('<script>document.write(&quot;<p>test</p>&quot;);<\/script>');
</script>
<script>document.write(&quot;<p>test</p>&quot;);</script>
<p>test</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 运行前 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
    document.write('<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">document.write("<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>");<span class="hljs-tag">&lt;<span class="hljs-name">\</span>/<span class="hljs-attr">script</span>&gt;</span>');
</span></span></span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 运行后 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
    document.write('<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">document.write("<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>");<span class="hljs-tag">&lt;<span class="hljs-name">\</span>/<span class="hljs-attr">script</span>&gt;</span>');
</span></span></span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript"><span class="hljs-built_in">document</span>.write(<span class="hljs-string">"&lt;p&gt;test&lt;/p&gt;"</span>);</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>document.write()可以传入多个参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 运行前 -->
<body>
    <script>
        document.write('<h2>multiArgument</h2>','<p>test</p>');
    </script>
</body>

<!-- 运行后 -->
<body>
    <script>
        document.write('<h2>multiArgument</h2>','<p>test</p>');
    </script>
    <h2>multiArgument</h2>
    <p>test</p>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 运行前 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
        document.write('<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>multiArgument<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>','<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>');
    </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 运行后 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
        document.write('<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>multiArgument<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>','<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>');
    </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>multiArgument<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<h2 id="articleHeader4">参考资料</h2>
<ol>
<li><p><a href="https://segmentfault.com/a/1190000006197157">https://segmentfault.com/a/11...</a></p></li>
<li><p><a href="http://web.jobbole.com/83288/" rel="nofollow noreferrer" target="_blank">http://web.jobbole.com/83288/</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/write" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
全面理解document.write()

## 原文链接
[https://segmentfault.com/a/1190000007958530](https://segmentfault.com/a/1190000007958530)

