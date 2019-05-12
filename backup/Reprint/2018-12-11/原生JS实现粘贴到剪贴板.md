---
title: '原生JS实现粘贴到剪贴板' 
date: 2018-12-11 2:30:10
hidden: true
slug: msvp5pyucg
categories: [reprint]
---

{{< raw >}}

                    
<p>本文主要讨论原生方法</p>
<p>目前常见的实现粘贴到剪贴板主要有以下两种方法：</p>
<ul>
<li>第三方库 <a href="https://github.com/zenorocha/clipboard.js/" rel="nofollow noreferrer" target="_blank">clipboard</a>
</li>
<li>原生JS, 主要是 <code>document.execCommand</code>方法</li>
</ul>
<p>第一种方法按照文档说明，设置触发元素的<code>data-clipboard-text</code> 或者 <code>data-clipboard-target</code>即可，不做说明，<a href="https://github.com/zenorocha/clipboard.js/" rel="nofollow noreferrer" target="_blank">详见文档</a></p>
<p>第二种方法：<br><code>document.execCommand</code></p>
<p>这个方法的兼容性其实不算很好，特别是移动端，具体<a href="https://caniuse.com/#search=execCommand" rel="nofollow noreferrer" target="_blank">这里</a>有, 但clipboard针对部分机型也有问题，所以具体使用还是得看情况， 使用该方法前要先看浏览器是否支持<code>bool = document.execCommand('copy')</code></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand" rel="nofollow noreferrer" target="_blank">MDN</a>对上述方法的解释如下：</p>
<blockquote>当一个HTML文档切换到<strong>设计模式</strong> designMode时，文档对象暴露 execCommand 方法，该方法允许运行命令来操纵<strong>可编辑区域</strong>的内容。</blockquote>
<p>注意加粗部分，<em>设计模式</em> ，即：使用前我们需切换文档模式为设计模式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.designMode = 'on'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">document<span class="hljs-selector-class">.designMode</span> = <span class="hljs-string">'on'</span></code></pre>
<p>完成运行命令之后再设置值为<code>off</code><br>还有个加粗部分，<em>可编辑区域</em> ，默认的input和textarea元素是可编辑(设置一个元素的<code>contenteditable="true"</code>也可激活元素的编辑模式)</p>
<p>先来看表单元素如何实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ele.addEventListener('click', () => {
    document.designMode = 'on'
    let bool = document.execCommand('copy')
    if (!bool) {
        alert('sorry, 手动复制吧')
    } else {
        let val = 'something'
        let inputEle = document.createElement('input')
        document.body.appendChild(inputEle)
        inputEle.setAttribute('value', val)
        inputEle.setAttribute('readonly', 'readonly')
        inputEle.select()
        document.execCommand('copy')
        document.body.removeChild(inputEle)
        alert('copied')
    }
    document.designMode = 'off'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>ele.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">document</span>.designMode = <span class="hljs-string">'on'</span>
    <span class="hljs-keyword">let</span> bool = <span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'copy'</span>)
    <span class="hljs-keyword">if</span> (!bool) {
        alert(<span class="hljs-string">'sorry, 手动复制吧'</span>)
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">let</span> val = <span class="hljs-string">'something'</span>
        <span class="hljs-keyword">let</span> inputEle = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'input'</span>)
        <span class="hljs-built_in">document</span>.body.appendChild(inputEle)
        inputEle.setAttribute(<span class="hljs-string">'value'</span>, val)
        inputEle.setAttribute(<span class="hljs-string">'readonly'</span>, <span class="hljs-string">'readonly'</span>)
        inputEle.select()
        <span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'copy'</span>)
        <span class="hljs-built_in">document</span>.body.removeChild(inputEle)
        alert(<span class="hljs-string">'copied'</span>)
    }
    <span class="hljs-built_in">document</span>.designMode = <span class="hljs-string">'off'</span>
})</code></pre>
<p>为避免出现光标或者拉起输入法，需要给元素设置<code>readonly</code>属性</p>
<p>inputEle.select()方法在一些浏览器中有时不能选中所有内容，这时需要利用inputeElement的<code>setSelectionRange</code>方法：</p>
<blockquote>HTMLInputElement.setSelectionRange 方法可以从一个被 focused 的 &lt;input&gt;<br>元素中选中特定范围的内容。</blockquote>
<p>综上加两行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
inputEle.focus()
inputEle.setSelectionRange(0, inputEle.value.length)
document.execCommand('copy')
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>...
<span class="hljs-selector-tag">inputEle</span><span class="hljs-selector-class">.focus</span>()
<span class="hljs-selector-tag">inputEle</span><span class="hljs-selector-class">.setSelectionRange</span>(<span class="hljs-number">0</span>, inputEle.value.length)
<span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.execCommand</span>(<span class="hljs-string">'copy'</span>)
...</code></pre>
<p>如果不是<code>input</code>等表单元素，不能使用<code>select</code>和<code>setSelectRange</code>的话，那么我们可以使用<code>getSelection</code>和<code>createRange</code>方法来模拟这个过程了，<code>Selection</code>对象表示用户选择的文本范围或光标的当前位置，满足执行execComman命令的可编辑活动区域，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let range = document.createRange()
let tar = document.querySelector('#code')
range.selectNodeContents(tar)
let selection = window.getSelection()
selection.removeAllRanges()
selection.addRange(range)
document.execCommand('copy')
selection.removeAllRanges()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> range = <span class="hljs-built_in">document</span>.createRange()
<span class="hljs-keyword">let</span> tar = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#code'</span>)
range.selectNodeContents(tar)
<span class="hljs-keyword">let</span> selection = <span class="hljs-built_in">window</span>.getSelection()
selection.removeAllRanges()
selection.addRange(range)
<span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'copy'</span>)
selection.removeAllRanges()</code></pre>
<p>上述针对非input，textarea等表单元素也能实现了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生JS实现粘贴到剪贴板

## 原文链接
[https://segmentfault.com/a/1190000013538386](https://segmentfault.com/a/1190000013538386)

