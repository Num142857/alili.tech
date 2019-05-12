---
title: '不到200行 JavaScript 代码如何实现富文本编辑器' 
date: 2018-12-19 2:30:07
hidden: true
slug: 7tgq65480gp
categories: [reprint]
---

{{< raw >}}

                    
<p>前段时间在寻找一些关于富文本编辑器的资料，然后发现了这个名为 <a href="https://github.com/jaredreich/pell" rel="nofollow noreferrer" target="_blank">Pell</a> 的项目，它是一个所见即所得（WYSIWYG）的文本编辑器，虽然它的功能很简单，但是令人吃惊的是它只有 1kb 大小。而项目最核心的文件 <a href="https://github.com/jaredreich/pell/blob/master/src/pell.js" rel="nofollow noreferrer" target="_blank">pell.js</a> 只有130行，即使加上其它部分，总的 js 数量也不到200行。这引起了我的兴趣，决定看看它的源码是如何做到这一点的。</p>
<p>项目的主要代码在 <code>pell.js</code> 文件中，其结构很简单，主要功能的实现依赖于以下的几个部分</p>
<ul>
<li>
<code>actions</code> 对象</li>
<li>
<code>exec()</code> 函数</li>
<li>
<code>init()</code> 函数</li>
</ul>
<h2 id="articleHeader0">Document.execCommand()</h2>
<p>先从最简单的部分看起， <code>exec()</code> 函数只有下面三行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const exec = (command, value = null) => {
    document.execCommand(command, false, value);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> exec = <span class="hljs-function">(<span class="hljs-params">command, value = <span class="hljs-literal">null</span></span>) =&gt;</span> {
    <span class="hljs-built_in">document</span>.execCommand(command, <span class="hljs-literal">false</span>, value);
};</code></pre>
<p>它将 <code>document.execCommand()</code> 进行了一个简单的包装，<a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand" rel="nofollow noreferrer" target="_blank">Document.execCommand()</a> 就是这个编辑器的核心，其语法如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">bool = <span class="hljs-built_in">document</span>.execCommand(aCommandName, aShowDefaultUI, aValueArgument)</code></pre>
<ul>
<li>
<code>aCommandName</code> 是表示想执行的命令的字符串，比如：加粗 'bold'，创建链接 'createLink'，改变字体大小 'fontSize' 等等</li>
<li>
<code>aShowDefaultUI</code> 是否显示默认的用户界面</li>
<li>
<code>aValueArgument</code> 有些命令需要额外的输入，如插入图片、链接时需要给出地址</li>
</ul>
<p>注：经过我的试验，在 Chrome 下改变 aShowDefaultUI 的值并未发现影响，<a href="https://stackoverflow.com/questions/38188015/what-is-the-the-default-user-interface-referred-to-by-the-ashowdefaultui-param" rel="nofollow noreferrer" target="_blank">这个 stackoverflow 的问题</a>中提到这是一个来自于旧版 IE 的参数，所以这里设置为默认的 false 即可。</p>
<h2 id="articleHeader1">actions 对象</h2>
<p>文件中定义了一个名为 <code>actions</code> 的对象，对应的是下图工具栏上的这一行按钮， <code>actions</code> 中的每个子对象都保存了一个按钮的属性。</p>
<p><span class="img-wrap"><img data-src="/img/bV1gwe?w=1017&amp;h=75" src="https://static.alili.tech/img/bV1gwe?w=1017&amp;h=75" alt="2017-12-29-pell-editor-toobar.png" title="2017-12-29-pell-editor-toobar.png" style="cursor: pointer; display: inline;"></span></p>
<p>部分代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actions = {
    bold: {
        icon: '<b>B</b>',
        title: 'Bold',
        result: () => exec('bold')
    },
    italic: {
        icon: '<i>I</i>',
        title: 'Italic',
        result: () => exec('italic')
    },
    underline: {
        icon: '<u>U</u>',
        title: 'Underline',
        result: () => exec('underline')
    },
    // …
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> actions = {
    <span class="hljs-attr">bold</span>: {
        <span class="hljs-attr">icon</span>: <span class="hljs-string">'&lt;b&gt;B&lt;/b&gt;'</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">'Bold'</span>,
        <span class="hljs-attr">result</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> exec(<span class="hljs-string">'bold'</span>)
    },
    <span class="hljs-attr">italic</span>: {
        <span class="hljs-attr">icon</span>: <span class="hljs-string">'&lt;i&gt;I&lt;/i&gt;'</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">'Italic'</span>,
        <span class="hljs-attr">result</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> exec(<span class="hljs-string">'italic'</span>)
    },
    <span class="hljs-attr">underline</span>: {
        <span class="hljs-attr">icon</span>: <span class="hljs-string">'&lt;u&gt;U&lt;/u&gt;'</span>,
        <span class="hljs-attr">title</span>: <span class="hljs-string">'Underline'</span>,
        <span class="hljs-attr">result</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> exec(<span class="hljs-string">'underline'</span>)
    },
    <span class="hljs-comment">// …</span>
}</code></pre>
<p>这段代码中显示了名为 <code>bold</code>，<code>italic</code>，<code>underline</code> 的三个对象属性，对应于工具栏中前方的<strong>加粗</strong>、<em>斜体</em>、下划线按钮，可以看出它们的结构是相同的，都有下列三个属性：</p>
<ul>
<li>
<code>icon</code>: 如何在工具栏中显示</li>
<li>
<code>title</code>: 就是 title 啦</li>
<li>
<code>result</code>: 一个函数，会赋给按钮作为点击事件，调用之前所提到的 <code>exec()</code> 函数来对文本进行操作</li>
</ul>
<p>现在已有了 <code>actions</code> 对象，那么如何使用它呢？这就要看看 <code>init()</code> 函数了，它会根据一定的规则从 <code>actions</code> 对象中选出元素组成一个数组，数组的每一项都会生成一个按钮。下面代码中的 <code>settings.actions</code> 即为此数组，其中的每个元素都对应一个显示在工具栏上的按钮。<code>settings.actions</code> 的生成规则会在后面进行解释。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// pell.js 中的 init() 函数
settings.actions.forEach(action => {
    // 新建一个按钮元素
    const button = document.createElement('button')
    // 给按钮加上 css 样式
    button.className = settings.classes.button
    // 把 icon 属性作为内容显示出来
    button.innerHTML = action.icon
    button.title = action.title
    // 把 result 属性赋给按钮作为点击事件
    button.onclick = action.result
    // 将创建的按钮添加到工具栏上
    actionbar.appendChild(button)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// pell.js 中的 init() 函数</span>
settings.actions.forEach(<span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {
    <span class="hljs-comment">// 新建一个按钮元素</span>
    <span class="hljs-keyword">const</span> button = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'button'</span>)
    <span class="hljs-comment">// 给按钮加上 css 样式</span>
    button.className = settings.classes.button
    <span class="hljs-comment">// 把 icon 属性作为内容显示出来</span>
    button.innerHTML = action.icon
    button.title = action.title
    <span class="hljs-comment">// 把 result 属性赋给按钮作为点击事件</span>
    button.onclick = action.result
    <span class="hljs-comment">// 将创建的按钮添加到工具栏上</span>
    actionbar.appendChild(button)
})</code></pre>
<p>这样数组中的每个元素就都生成了一个工具栏上的按钮了。</p>
<h2 id="articleHeader2">init() 初始化函数</h2>
<p>想使用 pell 编辑器时，只要调用 <code>init()</code> 函数来初始化一个编辑器即可。它接收一个 <code>setting</code> 对象作为参数，其中包含这样的一些属性：</p>
<ul>
<li>
<code>element</code>: 编辑器的 DOM 元素</li>
<li>
<code>styleWithCSS</code>: 设置为 true 时，将会用 <code>&lt;span style="font-weight: bold;"&gt;&lt;/span&gt;</code> 代替 <code>&lt;b&gt;&lt;/b&gt;</code>
</li>
<li><code>actions</code></li>
<li><code>onChange</code></li>
</ul>
<p>其中最重要的是 <code>actions</code>，它是一个数组，包含了你想在工具栏显示的按钮列表。</p>
<p><code>actions</code> 数组中可以有这几种元素：</p>
<ul>
<li>一个字符串</li>
<li>一个有 <code>name</code> 属性的对象</li>
<li>一个对象，没有 <code>name</code> 属性，但有生成一个按钮的必需属性 <code>icon</code>，<code>result</code> 等</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="actions: [
  'bold',
  'underline',
  'italic',
  {
    name: 'image',
    result: () => {
      const url = window.prompt('Enter the image URL')
      if (url) window.pell.exec('insertImage', ensureHTTP(url))
    }
  },
  // ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">actions: [
  <span class="hljs-string">'bold'</span>,
  <span class="hljs-string">'underline'</span>,
  <span class="hljs-string">'italic'</span>,
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'image'</span>,
    <span class="hljs-attr">result</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> url = <span class="hljs-built_in">window</span>.prompt(<span class="hljs-string">'Enter the image URL'</span>)
      <span class="hljs-keyword">if</span> (url) <span class="hljs-built_in">window</span>.pell.exec(<span class="hljs-string">'insertImage'</span>, ensureHTTP(url))
    }
  },
  <span class="hljs-comment">// ...</span>
]</code></pre>
<p>在 <code>init()</code> 函数中会把这个 <code>actions</code>参数 和 pell.js 中定义的 <code>actions</code>对象组合起来，可以将 <code>actions</code> 对象当作一个默认设置，看以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// pell.js 中的 init() 函数
settings.actions = settings.actions
    ? settings.actions.map(action => {

        if (typeof action === 'string') return actions[action]

        // 如果参数中传入的 action 已经在默认设置中存在，用传入的参数覆盖默认设置
        else if (actions[action.name]) {
            return { ...actions[action.name], ...action }
        }

        return action
    })
    : Object.keys(actions).map(action => actions[action])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// pell.js 中的 init() 函数</span>
settings.actions = settings.actions
    ? settings.actions.map(<span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> {

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action === <span class="hljs-string">'string'</span>) <span class="hljs-keyword">return</span> actions[action]

        <span class="hljs-comment">// 如果参数中传入的 action 已经在默认设置中存在，用传入的参数覆盖默认设置</span>
        <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (actions[action.name]) {
            <span class="hljs-keyword">return</span> { ...actions[action.name], ...action }
        }

        <span class="hljs-keyword">return</span> action
    })
    : <span class="hljs-built_in">Object</span>.keys(actions).map(<span class="hljs-function"><span class="hljs-params">action</span> =&gt;</span> actions[action])</code></pre>
<p>如果参数对象 <code>setting</code> 中不包含 <code>actions</code> 数组,  则会默认使用之前定义的 <code>actions</code> 对象来初始化。</p>
<p>init() 函数里还有一个重要的部分，就是创建一个可编辑区域，这里创建了一个 <code>div</code> 元素，将其 <code>contentEditable</code> 属性设为 <code>true</code>，从而可以在这里使用之前提到的 <code>document.execCommand()</code> 命令了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建编辑区域的元素
settings.element.content = document.createElement('div')
// 让 div 成为可编辑状态
settings.element.content.contentEditable = true
settings.element.content.className = settings.classes.content
// 当用户输入时，更新页面的相应部分
settings.element.content.oninput = event => 
    settings.onChange(event.target.innerHTML)
settings.element.content.onkeydown = preventTab
settings.element.appendChild(settings.element.content)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 创建编辑区域的元素</span>
settings.element.content = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>)
<span class="hljs-comment">// 让 div 成为可编辑状态</span>
settings.element.content.contentEditable = <span class="hljs-literal">true</span>
settings.element.content.className = settings.classes.content
<span class="hljs-comment">// 当用户输入时，更新页面的相应部分</span>
settings.element.content.oninput = <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> 
    settings.onChange(event.target.innerHTML)
settings.element.content.onkeydown = preventTab
settings.element.appendChild(settings.element.content)</code></pre>
<h2 id="articleHeader3">流程整理</h2>
<p>最后以“插入链接”为例来梳理下整个编辑器的流程：</p>
<p>一、在调用 <code>init()</code> 函数时，在参数对象的 <code>action</code> 数组中加入以下一项</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    name: 'link',
    result: () => {
        const url = window.prompt('Enter the link URL')
        if (url) window.pell.exec('createLink', ensureHTTP(url))
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">name</span>: <span class="hljs-string">'link'</span>,
    <span class="hljs-attr">result</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> url = <span class="hljs-built_in">window</span>.prompt(<span class="hljs-string">'Enter the link URL'</span>)
        <span class="hljs-keyword">if</span> (url) <span class="hljs-built_in">window</span>.pell.exec(<span class="hljs-string">'createLink'</span>, ensureHTTP(url))
    }
}</code></pre>
<p>二、在 <code>init()</code> 的运行过程中，会检查已定义的 <code>actions</code> 对象中是否有 <code>link</code> 这个属性。经检查属性确实存在</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="link: {
    icon: '&amp;#128279;',
    title: 'Link',
    result: () => {
        const url = window.prompt('Enter the link URL')
        if (url) exec('createLink', url)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">link: {
    <span class="hljs-attr">icon</span>: <span class="hljs-string">'&amp;#128279;'</span>,
    <span class="hljs-attr">title</span>: <span class="hljs-string">'Link'</span>,
    <span class="hljs-attr">result</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> url = <span class="hljs-built_in">window</span>.prompt(<span class="hljs-string">'Enter the link URL'</span>)
        <span class="hljs-keyword">if</span> (url) exec(<span class="hljs-string">'createLink'</span>, url)
    }
}</code></pre>
<p>因为传入的参数中有 <code>result</code> 这一项，所以用传入的 <code>result</code> 来代替 <code>link</code> 对象中的默认值，然后将修改过的 <code>link</code> 对象放入 <code>settings.actions</code> 数组中。</p>
<p>三、对 <code>settings.actions</code> 数组进行一次迭代来生成工具栏，<code>link</code> 对象作为其中的一项生成了一个“插入链接”的按钮。<code>result</code> 属性成为其点击事件。</p>
<p>四、点击“插入链接”的按钮后，会让你输入一个 url，然后调用 <code>exec('createLink', url)</code> 在编辑区域插入该链接。</p>
<p>编辑器其它按钮的功能流程也类似。</p>
<p>这样 Pell 编辑器的大部分内容就讲解完毕了，剩余部分还需要自己去看源码。毕竟项目的代码不长，以此作为文本编辑器的入门倒不错。</p>
<hr>
<p>2017年的最后一篇文章了，再见，2017。</p>
<p><a href="http://www.wukai.me/2017/12/31/rich-text-editor-in-less-than-200-lines-javascript/" rel="nofollow noreferrer" target="_blank">本文原地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
不到200行 JavaScript 代码如何实现富文本编辑器

## 原文链接
[https://segmentfault.com/a/1190000012655838](https://segmentfault.com/a/1190000012655838)

