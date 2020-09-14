---
title: '记录fastclick中一次手动触发click事件失败' 
date: 2019-01-15 2:30:12
hidden: true
slug: fclumurlgh7
categories: [reprint]
---

{{< raw >}}

                    
<p>在昨天的一个移动端项目中引入fastclick后手动触发click事件失败，查看了文档也没有找到解决的办法，最后通过看fastclick源码才解决。<br>如果不想看中间这么多文字，可以直接翻到最后看结论。</p>
<h2 id="articleHeader0">还原事故现场</h2>
<p>想要实现的功能为点击div1的时候手动触发input的click事件。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    <div>
        <div class=&quot;div1&quot; @click=&quot;handleClick&quot;>
            input标签是隐藏的，只能看到div1
        </div>
        <input type=&quot;file&quot; style=&quot;display: none&quot; res=&quot;input&quot;>
    </div>
</style>

<script>
    export default {
        methos: {
            handleClick() {
                this.$refs.input.click()
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;style&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"div1"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"handleClick"</span>&gt;</span>
            input标签是隐藏的，只能看到div1
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: none"</span> <span class="hljs-attr">res</span>=<span class="hljs-string">"input"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span>

&lt;script&gt;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">methos</span>: {
            handleClick() {
                <span class="hljs-keyword">this</span>.$refs.input.click()
            }
        }
    }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>在没有引入fastclick的时候，可以按照预期工作，引入之后，在Android中也可以正常工作，但是在iOS却无论如何也不行。即使在input标签加上needsclick类也不行。<br>神奇的是如果连续手动触发两次click事件，则在iOS中就可以正常工作了！！</p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="handleClick() {
    this.$refs.input.click()
    this.$refs.input.click()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">handleClick() {
    <span class="hljs-keyword">this</span>.$refs.input.click()
    <span class="hljs-keyword">this</span>.$refs.input.click()
}</code></pre>
<p>想来想去，原因只能出在fastclick身上，首先看了文档，并没有发现解决的方法，只能去看源码了。虽然第一次用fastclick的时候就读过代码，当时只不过为了知道大概实现原理泛泛的读了一遍，不够细致。这次又重新看了一遍。关于源码的解读网上有很多，这里就不细说，代码不长，建议最好自己读一读。</p>
<h2 id="articleHeader1">追踪溯源，找到问题原因症结</h2>
<p>看完源码，就可以回答之前的疑问了。</p>
<h5>1、为什么安卓可以正常工作？</h5>
<p><a href="https://github.com/ftlabs/fastclick/blob/v1.0.6/lib/fastclick.js#L750-L767" rel="nofollow noreferrer" target="_blank">代码</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (deviceIsAndroid) {
    metaViewport = document.querySelector('meta[name=viewport]');

    if (metaViewport) {
        // Chrome on Android with user-scalable=&quot;no&quot; doesn't need FastClick (issue #89)
        if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
            return true;
        }
        // Chrome 32 and above with width=device-width or less don't need FastClick
        if (chromeVersion > 31 &amp;&amp; document.documentElement.scrollWidth <= window.outerWidth) {
            return true;
        }
    }

// Chrome desktop doesn't need FastClick (issue #15)
} else {
    return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (deviceIsAndroid) {
    metaViewport = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'meta[name=viewport]'</span>);

    <span class="hljs-keyword">if</span> (metaViewport) {
        <span class="hljs-comment">// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)</span>
        <span class="hljs-keyword">if</span> (metaViewport.content.indexOf(<span class="hljs-string">'user-scalable=no'</span>) !== <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
        <span class="hljs-comment">// Chrome 32 and above with width=device-width or less don't need FastClick</span>
        <span class="hljs-keyword">if</span> (chromeVersion &gt; <span class="hljs-number">31</span> &amp;&amp; <span class="hljs-built_in">document</span>.documentElement.scrollWidth &lt;= <span class="hljs-built_in">window</span>.outerWidth) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
    }

<span class="hljs-comment">// Chrome desktop doesn't need FastClick (issue #15)</span>
} <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
<p>在fastclick刚运行的时候，就判断是否需要使用fastclick，我的安卓测试机chrome大于32 且设置了width=device-width。所以在安卓下我点击使用的原生click事件当然没问题。</p>
<h5>2、为什么iOS需要手动触发两次click事件才可以？</h5>
<p>这就是这次“事故”的关键所在，当我点击的时候，一共触发了单词click事件，其中第一次为点击div触发，后两次为手动触发input的click事件。</p>
<p>第一次click事件时，fastclick在onTouchStart中将targetElement设置为div1,<br>这次成功执行sendClick() ，目标并不是我们想要的input。</p>
<p>紧接着是第一次手动触发click事件，但是因为是通过element.click()函数手动触发，所以没有onTouchStart这个过程，因此此时<strong>targetElement当然还是div1</strong> ！！！ 这时needsClick返回了false，从而导致onClick中onMouse函数也返回了false，并终止了事件，随后就将targetElement置为null。</p>
<p>在第二次手动click事件中，因为此时targetElement为null，所以在onMouse中返回true，接着从而顺利触发了原生click事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!this.targetElement) {
    return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.targetElement) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
<h5>3、为什么在input标签加上needsclick也不能成功触发click事件？</h5>
<p>因为第一次手动执行click() 的时，这时候的targetElement还是div1，即点击时的元素，而我将needsclick绑定在input上了，因此当然在targetElement上找不到needsclick了。<br>此时我们也就找到了解决问题的办法：<strong>将needsclick绑定在div1，即实际点击的元素上。</strong></p>
<h2 id="articleHeader2">结论及收获</h2>
<ul>
<li><p>如果想触发原生click事件，请将needsclick绑定在实际点击的元素上，即e.targe上，而不是你手动触发的元素上。这可以说是fastclick的一个小bug，因为之前的点击影响了后面的点击。</p></li>
<li><p>只能在click的回调函数中手动触发element.click() ，否则无效，有兴趣的可以试试。这个在MDN上没写，算是意外收获。</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
记录fastclick中一次手动触发click事件失败

## 原文链接
[https://segmentfault.com/a/1190000009246194](https://segmentfault.com/a/1190000009246194)

