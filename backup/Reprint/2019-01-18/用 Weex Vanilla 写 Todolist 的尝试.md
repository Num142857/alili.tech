---
title: '用 Weex Vanilla 写 Todolist 的尝试' 
date: 2019-01-18 2:30:35
hidden: true
slug: b8n0atmlvzh
categories: [reprint]
---

{{< raw >}}

                    
<p>关于如何在 Weex 上使用 Vanilla 代码写页面, 在前面有一篇文章已经介绍过了:<br><a href="https://hashnode.com/post/run-vanilla-javascript-hello-world-in-weex-ciy1dn0sp001s91533k6h8sc7" rel="nofollow noreferrer" target="_blank">https://hashnode.com/post/run...</a><br>大致上, 可以参考这个 Demo, 其实就是一些 DOM 操作,<br><a href="https://github.com/alibaba/weex/blob/dev/examples/vanilla/index.js" rel="nofollow noreferrer" target="_blank">https://github.com/alibaba/we...</a><br>所以我明确的一个事实是 Weex 确实有一套 DOM API,<br>而且这套 API 应该说是所有基于 Weex 的框架的基础, 像 Weex, Rax, 甚至如果有 Angular 版本.</p>
<p>在 Weex 仓库里可以看到目前有 4 个框架, 其中 Vanilla 对应没有框架,<br><a href="https://github.com/apache/incubator-weex/blob/master/html5/frameworks/vanilla/index.js" rel="nofollow noreferrer" target="_blank">https://github.com/apache/inc...</a><br>但实际上这个代码已经过时了, 比如后来的 <code>weex</code> 全局变量没有的完成,<br>所以为了方便我在本地开发, 我自己基于 Vue fork 了一个版本, 用来试验,<br><a href="https://gist.github.com/jiyinyiyong/39b8e319b7078dd613f7e5b0c7191369" rel="nofollow noreferrer" target="_blank">https://gist.github.com/jiyin...</a><button class="btn btn-xs btn-default ml10 preview" data-url="jiyinyiyong/39b8e319b7078dd613f7e5b0c7191369" data-typeid="1">点击预览</button><br>试验项目可以从 GitHub 上看, 用单个文件生成的 Todolist:<br><a href="https://github.com/mvc-works/helical-weex/blob/master/src/helical.coffee" rel="nofollow noreferrer" target="_blank">https://github.com/mvc-works/...</a><br>最终的界面:</p>
<p><span class="img-wrap"><img data-src="http://wx2.sinaimg.cn/mw690/62752320gy1fdp7sfbllcj20qo1bejsk.jpg" src="https://static.alili.techhttp://wx2.sinaimg.cn/mw690/62752320gy1fdp7sfbllcj20qo1bejsk.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在这个 Todolist 当中我实现了基本的增删改功能, 但明显确实一下功能:</p>
<ul>
<li><p>清除已读的任务</p></li>
<li><p>排序</p></li>
</ul>
<p>没有做是因为太难实现了, 虽然也不是那么难, 但作为试验项目主要的目的吧,<br>我主要还是未来试验 Weex 的 DOM API 能不能写出像样的页面,<br>经过简单的封装, DOM 部分的写法在 CoffeeScript 里挺清晰的,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
# DOM tree

mainTree = ->
  div style: styleBody,
    div style: styleContainer,
      div style: styleHeader,
        input
          ref: 'input'
          style: styleInput
          attr: {value: '', placeholder: 'Some task...'}
          event: {input: onDraft}
        text
          style: styleButton
          attr: {value: 'Add task'}
          event: {click: onAdd}
      text
        ref: 'raw'
        attr: {value: getRaw()}
        style: styleContent
      div
        ref: 'content'
        style: styleContent

# mounting document

doc.documentElement.appendChild (helicalExpandTree mainTree())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code class="coffee">
<span class="hljs-comment"># DOM tree</span>

<span class="hljs-string">mainTree</span> <span class="hljs-string">=</span> <span class="hljs-bullet">-&gt;</span>
  <span class="hljs-string">div</span> <span class="hljs-attr">style:</span> <span class="hljs-string">styleBody,</span>
    <span class="hljs-string">div</span> <span class="hljs-attr">style:</span> <span class="hljs-string">styleContainer,</span>
      <span class="hljs-string">div</span> <span class="hljs-attr">style:</span> <span class="hljs-string">styleHeader,</span>
        <span class="hljs-string">input</span>
<span class="hljs-attr">          ref:</span> <span class="hljs-string">'input'</span>
<span class="hljs-attr">          style:</span> <span class="hljs-string">styleInput</span>
<span class="hljs-attr">          attr:</span> <span class="hljs-string">{value:</span> <span class="hljs-string">''</span><span class="hljs-string">,</span> <span class="hljs-attr">placeholder:</span> <span class="hljs-string">'Some task...'</span><span class="hljs-string">}</span>
<span class="hljs-attr">          event:</span> <span class="hljs-string">{input:</span> <span class="hljs-string">onDraft}</span>
        <span class="hljs-string">text</span>
<span class="hljs-attr">          style:</span> <span class="hljs-string">styleButton</span>
<span class="hljs-attr">          attr:</span> <span class="hljs-string">{value:</span> <span class="hljs-string">'Add task'</span><span class="hljs-string">}</span>
<span class="hljs-attr">          event:</span> <span class="hljs-string">{click:</span> <span class="hljs-string">onAdd}</span>
      <span class="hljs-string">text</span>
<span class="hljs-attr">        ref:</span> <span class="hljs-string">'raw'</span>
<span class="hljs-attr">        attr:</span> <span class="hljs-string">{value:</span> <span class="hljs-string">getRaw()}</span>
<span class="hljs-attr">        style:</span> <span class="hljs-string">styleContent</span>
      <span class="hljs-string">div</span>
<span class="hljs-attr">        ref:</span> <span class="hljs-string">'content'</span>
<span class="hljs-attr">        style:</span> <span class="hljs-string">styleContent</span>

<span class="hljs-comment"># mounting document</span>

<span class="hljs-string">doc.documentElement.appendChild</span> <span class="hljs-string">(helicalExpandTree</span> <span class="hljs-string">mainTree())</span></code></pre>
<p>熟悉 DOM 操作的应该能脑补出我的代码来:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="helicalExpandTree = (tree) ->
  # console.log '\n\nExpanding:', JSON.stringify(tree)
  [name, props, children] = tree
  element = doc.createElement name,
    style: props.style
    attr: props.attr
  if props.event
    for key, value of props.event
      element.addEvent key, value
  if children?
    # console.log 'CHILDREN:', JSON.stringify(children)
    for child in children
      childElement = helicalExpandTree child
      # console.log '\n\nChild to append:', JSON.stringify(childElement)
      element.appendChild childElement
  if props.ref?
    domRefs[props.ref] = element
  element" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code class="coffee">helicalExpandTree = (tree) -&gt;
  # console.<span class="hljs-built_in">log</span> '\n\nExpanding:', JSON.stringify(tree)
  [name, <span class="hljs-built_in">props</span>, children] = tree
  element = doc.createElement name,
    <span class="hljs-built_in">style</span>: <span class="hljs-built_in">props</span>.<span class="hljs-built_in">style</span>
    attr: <span class="hljs-built_in">props</span>.attr
  <span class="hljs-keyword">if</span> <span class="hljs-built_in">props</span>.event
    <span class="hljs-keyword">for</span> <span class="hljs-built_in">key</span>, value of <span class="hljs-built_in">props</span>.event
      element.addEvent <span class="hljs-built_in">key</span>, value
  <span class="hljs-keyword">if</span> children?
    # console.<span class="hljs-built_in">log</span> 'CHILDREN:', JSON.stringify(children)
    <span class="hljs-keyword">for</span> child <span class="hljs-keyword">in</span> children
      childElement = helicalExpandTree child
      # console.<span class="hljs-built_in">log</span> '\n\nChild to <span class="hljs-built_in">append</span>:', JSON.stringify(childElement)
      element.appendChild childElement
  <span class="hljs-keyword">if</span> <span class="hljs-built_in">props</span>.ref?
    domRefs[<span class="hljs-built_in">props</span>.ref] = element
  element</code></pre>
<p>然后是事件处理, 这就有点问题了, 实际上有两个地方需要处理, Model 和 View,<br>熟悉 jQuery 的同学应该就能猜到了, 需要通过 <code>event.target</code> 做 DOM 操作,<br>两边都处理, 保证界面上没有出现状态不一致的情况, 当然写起来很啰嗦, 维护性差,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onRemove = (taskId) -> (event) ->
  store.tasks = store.tasks.filter (task) -> task.id isnt taskId
  # DOM operations
  taskElement = event.target.parentNode
  taskElement.parentNode.removeChild taskElement
  modifyRaw()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code class="coffee"><span class="hljs-function"><span class="hljs-title">onRemove</span> = <span class="hljs-params">(taskId)</span> -&gt;</span> <span class="hljs-function"><span class="hljs-params">(event)</span> -&gt;</span>
  store.tasks = store.tasks.filter <span class="hljs-function"><span class="hljs-params">(task)</span> -&gt;</span> task.id <span class="hljs-keyword">isnt</span> taskId
  <span class="hljs-comment"># DOM operations</span>
  taskElement = event.target.parentNode
  taskElement.parentNode.removeChild taskElement
  modifyRaw()</code></pre>
<p>如果页面当中还有 Tab 的话, Tab 页之间的状态管理会让页面变得非常复杂,<br>当然为了方便使用, 我模仿了 React 的 <code>ref</code> 写法用来指定 DOM 的特定引用,<br>这样在小的页面当中也没有使用 jQuery 选择 DOM 节点的必要了.<br>所以看上去整个页面还是可以跑通的, 虽然效果实在很奇怪.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
onAdd = (event) ->
  newTask = id: getId(), done: 'false', text: store.draft
  store.draft = ''
  store.tasks.unshift newTask
  # DOM operations
  console.log 'DOM operations!!!'
  domRefs.input.setAttr 'value', ''
  newElement = helicalExpandTree (taskTree newTask)
  console.log '\nnewElement:', newElement
  domRefs.content.appendChild newElement
  modifyRaw()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="coffee"><span class="hljs-function">
<span class="hljs-title">onAdd</span> = <span class="hljs-params">(event)</span> -&gt;</span>
  newTask = id: getId(), done: <span class="hljs-string">'false'</span>, text: store.draft
  store.draft = <span class="hljs-string">''</span>
  store.tasks.unshift newTask
  <span class="hljs-comment"># DOM operations</span>
  <span class="hljs-built_in">console</span>.log <span class="hljs-string">'DOM operations!!!'</span>
  domRefs.input.setAttr <span class="hljs-string">'value'</span>, <span class="hljs-string">''</span>
  newElement = helicalExpandTree (taskTree newTask)
  <span class="hljs-built_in">console</span>.log <span class="hljs-string">'\nnewElement:'</span>, newElement
  domRefs.content.appendChild newElement
  modifyRaw()</code></pre>
<p>其实可以从这个试验反思一下 Vue React 这些东西在移动端是否合适,<br>可以用这些框架主要是为了桌面平台的单页面 App 建造起来的,<br>附带了各种状态管理, 组件化, DSL, 编程风格在里边, 以及各种开发工具,<br>最主要的是声明式的写法确实提高了开发速度和组件的复用.<br>不过手机上状态管理的没有桌面端复杂倒是, 未必需要 React 那么强的功能.</p>
<p>手写 DOM 操作的方法基本上都是效率低下, 可维护性极差, 之类的,<br>除非是为了写几乎静态的页面, 这种方案完全可以被扔进历史的废纸篓...<br>不过也有一点好处, 就是没有太多抽象, 页面启动非常快, 提交很小.<br>虽然 Weex 一直运行在一个 js runtime 中, 但初始化组件多多少少有一点开销.<br>也许说是微乎其微... 但是从理论上而言, 启动过程需要执行的代码总是有区别的.</p>
<p>当然总体上说这样写几乎没什么用, 只是证明 Native DOM API 能正常用:<br><a href="http://weex.apache.org/references/native-dom-api.html" rel="nofollow noreferrer" target="_blank">http://weex.apache.org/refere...</a><br>没有明确的观点, 只是换着思路想想写 Weex 遇到的一些问题...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 Weex Vanilla 写 Todolist 的尝试

## 原文链接
[https://segmentfault.com/a/1190000008726905](https://segmentfault.com/a/1190000008726905)

