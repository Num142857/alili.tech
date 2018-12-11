---
title: 'JavaScript复制内容到剪贴板' 
date: 2018-12-12 2:30:10
hidden: true
slug: kp2qv59svej
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接：<a href="https://github.com/axuebin/articles/issues/26" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/axuebin/articles/issues/26" rel="nofollow noreferrer" target="_blank">https://github.com/axuebin/ar...</a></p>
<hr>
<p>最近一个活动页面中有一个小需求，用户点击或者长按就可以复制内容到剪贴板，记录一下实现过程和遇到的坑。</p>
<h2 id="articleHeader0">常见方法</h2>
<p>查了一下万能的Google，现在常见的方法主要是以下两种：</p>
<ul>
<li>第三方库：clipboard.js</li>
<li>原生方法：document.execCommand()</li>
</ul>
<p>分别来看看这两种方法是如何使用的。</p>
<h2 id="articleHeader1">clipboard.js</h2>
<p>这是clipboard的官网：<a href="https://clipboardjs.com/" rel="nofollow noreferrer" target="_blank">https://clipboardjs.com/</a>，看起来就是这么的简单。</p>
<h3 id="articleHeader2">引用</h3>
<p>直接引用： <code>&lt;script src="dist/clipboard.min.js"&gt;&lt;/script&gt;</code></p>
<p>包： <code>npm install clipboard --save</code> ，然后 <code>import Clipboard from 'clipboard';</code></p>
<h3 id="articleHeader3">使用</h3>
<h4>从输入框复制</h4>
<p>现在页面上有一个 <code>&lt;input&gt;</code> 标签，我们需要复制其中的内容，我们可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input id=&quot;demoInput&quot; value=&quot;hello world&quot;>
<button class=&quot;btn&quot; data-clipboard-target=&quot;#demoInput&quot;>点我复制</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demoInput"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"hello world"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span> <span class="hljs-attr">data-clipboard-target</span>=<span class="hljs-string">"#demoInput"</span>&gt;</span>点我复制<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Clipboard from 'clipboard';
const btnCopy = new Clipboard('btn');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Clipboard <span class="hljs-keyword">from</span> <span class="hljs-string">'clipboard'</span>;
<span class="hljs-keyword">const</span> btnCopy = <span class="hljs-keyword">new</span> Clipboard(<span class="hljs-string">'btn'</span>);</code></pre>
<p>注意到，在 <code>&lt;button&gt;</code> 标签中添加了一个 <code>data-clipboard-target</code> 属性，它的值是需要复制的 <code>&lt;input&gt;</code> 的 <code>id</code>，顾名思义是从整个标签中复制内容。</p>
<h4>直接复制</h4>
<p>有的时候，我们并不希望从 <code>&lt;input&gt;</code> 中复制内容，仅仅是直接从变量中取值。如果在 <code>Vue</code> 中我们可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button class=&quot;btn&quot; :data-clipboard-text=&quot;copyValue&quot;>点我复制</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span> <span class="hljs-attr">:data-clipboard-text</span>=<span class="hljs-string">"copyValue"</span>&gt;</span>点我复制<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Clipboard from 'clipboard';
const btnCopy = new Clipboard('btn');
this.copyValue = 'hello world';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Clipboard <span class="hljs-keyword">from</span> <span class="hljs-string">'clipboard'</span>;
<span class="hljs-keyword">const</span> btnCopy = <span class="hljs-keyword">new</span> Clipboard(<span class="hljs-string">'btn'</span>);
<span class="hljs-keyword">this</span>.copyValue = <span class="hljs-string">'hello world'</span>;</code></pre>
<h4>事件</h4>
<p>有的时候我们需要在复制后做一些事情，这时候就需要回调函数的支持。</p>
<p>在处理函数中加入以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 复制成功后执行的回调函数
clipboard.on('success', function(e) {
    console.info('Action:', e.action); // 动作名称，比如：Action: copy
    console.info('Text:', e.text); // 内容，比如：Text：hello word
    console.info('Trigger:', e.trigger); // 触发元素：比如：<button class=&quot;btn&quot; :data-clipboard-text=&quot;copyValue&quot;>点我复制</button>
    e.clearSelection(); // 清除选中内容
});

// 复制失败后执行的回调函数
clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 复制成功后执行的回调函数</span>
clipboard.on(<span class="hljs-string">'success'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Action:'</span>, e.action); <span class="hljs-comment">// 动作名称，比如：Action: copy</span>
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Text:'</span>, e.text); <span class="hljs-comment">// 内容，比如：Text：hello word</span>
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Trigger:'</span>, e.trigger); <span class="hljs-comment">// 触发元素：比如：&lt;button class="btn" :data-clipboard-text="copyValue"&gt;点我复制&lt;/button&gt;</span>
    e.clearSelection(); <span class="hljs-comment">// 清除选中内容</span>
});

<span class="hljs-comment">// 复制失败后执行的回调函数</span>
clipboard.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Action:'</span>, e.action);
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Trigger:'</span>, e.trigger);
});</code></pre>
<h3 id="articleHeader4">小结</h3>
<p>文档中还提到，如果在单页面中使用 <code>clipboard</code> ，为了使得生命周期管理更加的优雅，在使用完之后记得 <code>btn.destroy()</code> 销毁一下。</p>
<p><code>clipboard</code> 使用起来是不是很简单。但是，就为了一个 <code>copy</code> 功能就使用额外的第三方库是不是不够优雅，这时候该怎么办？那就用原生方法实现呗。</p>
<h2 id="articleHeader5">document.execCommand()方法</h2>
<p>先看看这个方法在 <code>MDN</code> 上是怎么定义的：</p>
<blockquote>which allows one to run commands to manipulate the contents of the editable region.</blockquote>
<p>意思就是可以允许运行命令来操作可编辑区域的内容，注意，是<strong>可编辑区域</strong>。</p>
<h3 id="articleHeader6">定义</h3>
<blockquote>bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)</blockquote>
<p>方法返回一个 <code>Boolean</code> 值，表示操作是否成功。</p>
<ul>
<li>
<code>aCommandName</code> ：表示命令名称，比如： <code>copy</code>, <code>cut</code> 等（更多命令见<a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand#%E5%91%BD%E4%BB%A4" rel="nofollow noreferrer" target="_blank">命令</a>）；</li>
<li>
<code>aShowDefaultUI</code>：是否展示用户界面，一般情况下都是 <code>false</code>；</li>
<li>
<code>aValueArgument</code>：有些命令需要额外的参数，一般用不到；</li>
</ul>
<h3 id="articleHeader7">兼容性</h3>
<p>这个方法在之前的兼容性其实是不太好的，但是好在现在已经基本兼容所有主流浏览器了，在移动端也可以使用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013412211" src="https://static.alili.tech/img/remote/1460000013412211" alt="兼容性" title="兼容性" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">使用</h3>
<h4>从输入框复制</h4>
<p>现在页面上有一个 <code>&lt;input&gt;</code> 标签，我们想要复制其中的内容，我们可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input id=&quot;demoInput&quot; value=&quot;hello world&quot;>
<button id=&quot;btn&quot;>点我复制</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demoInput"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"hello world"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点我复制<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
    const input = document.querySelector('#demoInput');
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('复制成功');
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> btn = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#btn'</span>);
btn.addEventListener(<span class="hljs-string">'click'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> input = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#demoInput'</span>);
    input.select();
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'copy'</span>)) {
        <span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'copy'</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'复制成功'</span>);
    }
})</code></pre>
<h4>其它地方复制</h4>
<p>有的时候页面上并没有 <code>&lt;input&gt;</code> 标签，我们可能需要从一个 <code>&lt;div&gt;</code> 中复制内容，或者直接复制变量。</p>
<p>还记得在 <code>execCommand()</code> 方法的定义中提到，它只能操作<strong>可编辑区域</strong>，也就是意味着除了 <code>&lt;input&gt;</code>、<code>&lt;textarea&gt;</code> 这样的输入域以外，是无法使用这个方法的。</p>
<p>这时候我们需要曲线救国。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;btn&quot;>点我复制</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点我复制<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const btn = document.querySelector('#btn');
btn.addEventListener('click',() => {
    const input = document.createElement('input');
    document.body.appendChild(input);
     input.setAttribute('value', '听说你想复制我');
    input.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('复制成功');
    }
    document.body.removeChild(input);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> btn = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#btn'</span>);
btn.addEventListener(<span class="hljs-string">'click'</span>,() =&gt; {
    <span class="hljs-keyword">const</span> input = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'input'</span>);
    <span class="hljs-built_in">document</span>.body.appendChild(input);
     input.setAttribute(<span class="hljs-string">'value'</span>, <span class="hljs-string">'听说你想复制我'</span>);
    input.select();
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'copy'</span>)) {
        <span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'copy'</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'复制成功'</span>);
    }
    <span class="hljs-built_in">document</span>.body.removeChild(input);
})</code></pre>
<p>算是曲线救国成功了吧。在使用这个方法时，遇到了几个坑。</p>
<h4>遇到的坑</h4>
<p>在Chrome下调试的时候，这个方法时完美运行的。然后到了移动端调试的时候，坑就出来了。</p>
<p>对，没错，就是你，ios。。。</p>
<ol>
<li>点击复制时屏幕下方会出现白屏抖动，仔细看是拉起键盘又瞬间收起<p>知道了抖动是由于什么产生的就比较好解决了。既然是拉起键盘，那就是聚焦到了输入域，那只要让输入域不可输入就好了，在代码中添加 <code>input.setAttribute('readonly', 'readonly');</code> 使这个 <code>&lt;input&gt;</code> 是只读的，就不会拉起键盘了。</p>
</li>
<li>无法复制<p>这个问题是由于 <code>input.select()</code> 在ios下并没有选中全部内容，我们需要使用另一个方法来选中内容，这个方法就是 <code>input.setSelectionRange(0, input.value.length);</code>。</p>
</li>
</ol>
<p>完整代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const btn = document.querySelector('#btn');
btn.addEventListener('click',() => {
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', 'hello world');
    document.body.appendChild(input);
    input.setSelectionRange(0, 9999);
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('复制成功');
    }
    document.body.removeChild(input);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> btn = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#btn'</span>);
btn.addEventListener(<span class="hljs-string">'click'</span>,() =&gt; {
    <span class="hljs-keyword">const</span> input = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'input'</span>);
    input.setAttribute(<span class="hljs-string">'readonly'</span>, <span class="hljs-string">'readonly'</span>);
    input.setAttribute(<span class="hljs-string">'value'</span>, <span class="hljs-string">'hello world'</span>);
    <span class="hljs-built_in">document</span>.body.appendChild(input);
    input.setSelectionRange(<span class="hljs-number">0</span>, <span class="hljs-number">9999</span>);
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'copy'</span>)) {
        <span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'copy'</span>);
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'复制成功'</span>);
    }
    <span class="hljs-built_in">document</span>.body.removeChild(input);
})</code></pre>
<h2 id="articleHeader9">总结</h2>
<p>以上就是关于JavaScript如何实现复制内容到剪贴板，附上几个链接：</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand" rel="nofollow noreferrer" target="_blank">execCommand MDN</a></p>
<p><a href="https://caniuse.com/#search=execCommand" rel="nofollow noreferrer" target="_blank">execCommand兼容性</a></p>
<p><a href="https://github.com/zenorocha/clipboard.js" rel="nofollow noreferrer" target="_blank">clipboard.js</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript复制内容到剪贴板

## 原文链接
[https://segmentfault.com/a/1190000013412206](https://segmentfault.com/a/1190000013412206)

