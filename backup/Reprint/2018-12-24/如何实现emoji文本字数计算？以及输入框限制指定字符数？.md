---
title: '如何实现emoji文本字数计算？以及输入框限制指定字符数？' 
date: 2018-12-24 2:30:07
hidden: true
slug: 45o50w46gvt
categories: [reprint]
---

{{< raw >}}

                    
<p>一个emoji文本用javascript该如何正确计算其文本长度？<br>最容易想到的自然是用<code>length</code>来求长度。以下列举常见emoji和复杂emoji。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// size: 2
&quot;?&quot;.length
// size: 7
&quot;??‍?&quot;.length" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// size: 2</span>
<span class="hljs-string">"?"</span>.length
<span class="hljs-comment">// size: 7</span>
<span class="hljs-string">"??‍?"</span>.length</code></pre>
<p>由于JavaScript的字符编码问题，自然行不通。详情请参见文章末尾的博文。<br>基于常见的emoji可以使用以下正则匹配。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 匹配UTF-16的代理对，把代理对改为一个BMP的字符
function countSymbols(string) {
    var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    return string.replace(regexAstralSymbols, '_').length;
}
countSymbols(&quot;?&quot;); //  size: 1
countSymbols(&quot;??‍?&quot;); // size: 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 匹配UTF-16的代理对，把代理对改为一个BMP的字符</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countSymbols</span>(<span class="hljs-params">string</span>) </span>{
    <span class="hljs-keyword">var</span> regexAstralSymbols = <span class="hljs-regexp">/[\uD800-\uDBFF][\uDC00-\uDFFF]/g</span>;
    <span class="hljs-keyword">return</span> string.replace(regexAstralSymbols, <span class="hljs-string">'_'</span>).length;
}
countSymbols(<span class="hljs-string">"?"</span>); <span class="hljs-comment">//  size: 1</span>
countSymbols(<span class="hljs-string">"??‍?"</span>); <span class="hljs-comment">// size: 4</span></code></pre>
<p>但是仍然出现了问题。那么一些更复杂的emoji表情的时候，还是挂掉了。<code>??‍?</code>这个表情其实是苹果中表情<strong>农民</strong>，在<a href="http://unicode.org/emoji/charts/full-emoji-list.html" rel="nofollow noreferrer" target="_blank">Full Emoji List, v5.0</a>里第218个表情。此表情由<code>U+1F468 U+1F3FC U+200D U+1F33E</code>组成。所以直接求长度为 2 + 2 + 1 + 2 = 7。这也在所难免了。</p>
<p>那么该做如何解？</p>
<p>这时候社区里有twitter的关于emoji的一个工具库<a href="https://github.com/twitter/twemoji" rel="nofollow noreferrer" target="_blank">twemoji</a>，利用这个工具库，可以方便的实现emoji文本的实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="twemoji.parse(&quot;??‍?&quot;)
// &quot;<img class=&quot;emoji&quot; draggable=&quot;false&quot; alt=&quot;??‍?&quot; src=&quot;https://twemoji.maxcdn.com/2/72x72/1f468-1f3fc-200d-1f33e.png&quot;/>&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">twemoji.parse(<span class="hljs-string">"??‍?"</span>)
<span class="hljs-comment">// "&lt;img class="emoji" draggable="false" alt="??‍?" src="https://twemoji.maxcdn.com/2/72x72/1f468-1f3fc-200d-1f33e.png"/&gt;"</span></code></pre>
<p>因此可见。twemoji正确的识别了并达到了我们的预期。用户任意输入一个emoji，我们都只计算为一个长度。利用twemoji解析emoji并返回图片的特性，结合正则可以实现一个函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function countSymbols(string) {
    return twemoji.parse(string).replace(/<img.+?\/>/g, '_').length;
}
countSymbols(&quot;?&quot;); //  size: 1
countSymbols(&quot;??‍?&quot;); // size: 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countSymbols</span>(<span class="hljs-params">string</span>) </span>{
    <span class="hljs-keyword">return</span> twemoji.parse(string).replace(<span class="hljs-regexp">/&lt;img.+?\/&gt;/g</span>, <span class="hljs-string">'_'</span>).length;
}
countSymbols(<span class="hljs-string">"?"</span>); <span class="hljs-comment">//  size: 1</span>
countSymbols(<span class="hljs-string">"??‍?"</span>); <span class="hljs-comment">// size: 1</span></code></pre>
<p>好的问题解决了。结合twemoji和简单的正则就可以实现一个文本计算函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="countSymbols(&quot;??‍? and ? parse correctly!&quot;); // size: 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">countSymbols(<span class="hljs-string">"??‍? and ? parse correctly!"</span>); <span class="hljs-comment">// size: 24</span></code></pre>
<p>其实当字符计算解决后，输入框限制字符数就轻而易举了。思路就是每次input事件发生时，先判断当前字符数是否超过限制，如果超出，则用上一次的文本替换当前输入框的文本。大致代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var prevText = '';
var textarea = document.getElementById('input-area');
var limit = 250;
function limitTextSize(){
    var text = textarea.value;
    var size = countSymbols(text);
    if(size > limit) {
        textarea.value = prevText;
    } else {
        prevText = text;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> prevText = <span class="hljs-string">''</span>;
<span class="hljs-keyword">var</span> textarea = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'input-area'</span>);
<span class="hljs-keyword">var</span> limit = <span class="hljs-number">250</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">limitTextSize</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> text = textarea.value;
    <span class="hljs-keyword">var</span> size = countSymbols(text);
    <span class="hljs-keyword">if</span>(size &gt; limit) {
        textarea.value = prevText;
    } <span class="hljs-keyword">else</span> {
        prevText = text;
    }
}</code></pre>
<p>希望能给大家带来点帮助。求点赞哈哈~</p>
<hr>
<p><a href="http://www.ruanyifeng.com/blog/2014/12/unicode.html" rel="nofollow noreferrer" target="_blank">Unicode与JavaScript详解</a><br><a href="http://web.jobbole.com/91250/" rel="nofollow noreferrer" target="_blank">Emoji.prototype.length —— Unicode 字符那些事儿</a><br><a href="http://web.jobbole.com/89306/?utm_source=blog.jobbole.com&amp;utm_medium=relatedPosts" rel="nofollow noreferrer" target="_blank">JavaScript 有个 Unicode 的天坑</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何实现emoji文本字数计算？以及输入框限制指定字符数？

## 原文链接
[https://segmentfault.com/a/1190000012148352](https://segmentfault.com/a/1190000012148352)

