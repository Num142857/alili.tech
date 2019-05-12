---
title: '用 React.js 写一个最简单的 To-do List 应用' 
date: 2019-02-08 2:30:41
hidden: true
slug: cuqoi1b4t6d
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在学 React.js，也写了一些练习的项目，之前参考网上的一些代码写了一个很简单的 to-do list。对于初学者来说，写个基本的 to-do list 对于理解 React 中的一些概念及语法倒是挺有帮助的。</p>
<p>现在很多的 React 项目中已经开始使用 ES6 来写了，不过因为我在学习 React 的时候看的教程大多都是用 ES5 写的，我这里还是用的还是更熟悉的 ES5 写法，虽然有点落伍了，但若想改成 ES6 版本倒也挺方便的。</p>
<blockquote><p><a href="https://github.com/noiron/simplest-react-todolist" rel="nofollow noreferrer" target="_blank">GitHub 上的项目地址</a><br><a href="http://www.wukai.me/simplest-react-todolist" rel="nofollow noreferrer" target="_blank">在线 demo</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVD5ME?w=539&amp;h=437" src="https://static.alili.tech/img/bVD5ME?w=539&amp;h=437" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">文件目录</h2>
<p>在正式的生产项目中，使用 webpack 可以很方便地对我们的文件进行打包，这里因为程序比较简单，直接用 <code>&lt;script&gt;</code> 标签将 React 组件引入了。</p>
<p>首先新建一个 <code>index.html</code> 文件，引入相关的资源文件。</p>
<p>再新建一个 <code>js</code> 文件夹，我们使用 React 需要这样的两个文件： <code>react.js</code> 和 <code>react-dom.js</code>，你可以使用 cdn 引入，这里直接将文件下载放在了 <code>js</code> 文件夹内。</p>
<p><code>js</code> 文件夹内还有一个 <code>script.jsx</code> 文件，我们程序的主要内容就放在这个文件中。注意这里的后缀名是 <code>jsx</code>，表示它是使用 React 的 <code>jsx</code> 语法来写的，引入它的时候按如下写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <script type=&quot;text/babel&quot; src=&quot;js/script.jsx&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;">    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/script.jsx"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>同时还需要一个 <code>browser.js</code> 文件，它可以让 <code>jsx</code> 语法的文件在浏览器中运行。</p>
<p>最后我们再建立一个 <code>css</code> 文件夹，存放样式文件，我的项目中使用了 Bootstrap 的样式，所以需要下载 Bootstrap 的样式文件。</p>
<h2 id="articleHeader1">程序功能</h2>
<p>作为一个最简单的 to-do list，这个程序没有过多的功能。可以从 <a href="http://www.wukai.me/simplest-react-todolist/" rel="nofollow noreferrer" target="_blank">demo</a> 里看出，它的功能如下：</p>
<ul>
<li><p>显示每一个任务</p></li>
<li><p>可以将任务标记为已完成，以区分未完成的任务</p></li>
<li><p>加入任务 / 删除任务</p></li>
<li><p>统计任务总数和完成的任务数量</p></li>
</ul>
<p>作为一个示例程序，以上就是它的功能了。</p>
<h2 id="articleHeader2">组件结构</h2>
<p>我们可以使用 React 开发出各种组件（component），利用不同组件的功能来实现一个应用。我们这里创建的组件有:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TodoBox
    -TodoList
        -TodoItem
        -TodoFooter
    -TodoForm
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>TodoBox
    -<span class="ruby">TodoList
</span>        -<span class="ruby">TodoItem
</span>        -<span class="ruby">TodoFooter
</span>    -<span class="ruby">TodoForm
</span></code></pre>
<ul>
<li><p>TodoBox 是最外层的组件，其余的都是它的子组件</p></li>
<li><p>TodoList 是各个单独的待办任务的集合</p></li>
<li><p>TodoItem 即为一条单独的待办事项</p></li>
<li><p>TodoFooter 对上述的事项进行统计</p></li>
<li><p>TodoForm 用于加入新的项目</p></li>
</ul>
<h2 id="articleHeader3">属性的传递</h2>
<p>React 的组件有两种不同的属性，<code>state</code> 和 <code>props</code>。可以用一种简单的方法来区分它们：如果这个属性是其父组件传给它的，那么就是 <code>props</code>，反之如果一个属性是组件自己的，那么就是 <code>state</code>。</p>
<p>具体什么时候用 <code>state</code>，什么时候用 <code>props</code>，可以参考这几条：</p>
<blockquote>
<ul>
<li><p>Is it passed in from a parent via props? If so, it probably isn't state.</p></li>
<li><p>Does it change over time? If not, it probably isn't state.</p></li>
<li><p>Can you compute it based on any other state or props in your component? If so, it's not state.</p></li>
</ul>
<p><a href="https://facebook.github.io/react/docs/thinking-in-react.html#step-3-identify-the-minimal-but-complete-representation-of-ui-state" rel="nofollow noreferrer" target="_blank">参考来源：Thinking in React</a></p>
</blockquote>
<p>这里我们从代码来看看，属性是如何从父组件传递到子组件的。</p>
<p>每一条待办事项有这样的几个属性:</p>
<ul>
<li><p>id: 任务的编号</p></li>
<li><p>task: 任务的具体内容</p></li>
<li><p>complete: 任务是否已经完成</p></li>
</ul>
<p>我们看看属性的传递过程。</p>
<p>首先在 <code>TodoBox</code> 组件的 <code>state</code> 中有一个 <code>data</code> 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  data: [
    {&quot;id&quot;: &quot;0001&quot;, &quot;task&quot;:&quot;吃饭&quot;, &quot;complete&quot;: &quot;false&quot;},
    {&quot;id&quot;: &quot;0002&quot;, &quot;task&quot;:&quot;睡觉&quot;, &quot;complete&quot;: &quot;true&quot;},
    ...
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  data: [
    {<span class="hljs-string">"id"</span>: <span class="hljs-string">"0001"</span>, <span class="hljs-string">"task"</span>:<span class="hljs-string">"吃饭"</span>, <span class="hljs-string">"complete"</span>: <span class="hljs-string">"false"</span>},
    {<span class="hljs-string">"id"</span>: <span class="hljs-string">"0002"</span>, <span class="hljs-string">"task"</span>:<span class="hljs-string">"睡觉"</span>, <span class="hljs-string">"complete"</span>: <span class="hljs-string">"true"</span>},
    ...
  ]</code></pre>
<p><code>TodoBox</code> 组件的 render 函数中会有 <code>TodoList</code> 组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <TodoList data={this.state.data}
    // 其他的属性及方法写在这里
  />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  &lt;TodoList data={<span class="hljs-keyword">this</span>.state.data}
    <span class="hljs-comment">// 其他的属性及方法写在这里</span>
  /&gt;</code></pre>
<p>这样 <code>TodoBox</code> 组件的 <code>data</code> 属性就传递给了子组件 <code>TodoBox</code>。在 <code>TodoBox</code> 中通过 <code>this.props</code> 来引用这一属性，即 <code>this.props.data</code>。</p>
<p><code>TodoBox</code> 组件还有子组件 <code>TodoItem</code>，可以将属性继续传递下去。在 <code>TodoList</code> 组件的 <code>render</code> 函数中这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var taskList = this.props.data.map(function(listItem) {
      return (
        <TodoItem
          taskId={listItem.id}
          key={listItem.id}
          task={listItem.task}
          complete={listItem.complete}
          // 其他的属性及方法
      )
    }, this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">var</span> taskList = <span class="hljs-keyword">this</span>.props.data.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">listItem</span>) </span>{
      <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoItem</span>
          <span class="hljs-attr">taskId</span>=<span class="hljs-string">{listItem.id}</span>
          <span class="hljs-attr">key</span>=<span class="hljs-string">{listItem.id}</span>
          <span class="hljs-attr">task</span>=<span class="hljs-string">{listItem.task}</span>
          <span class="hljs-attr">complete</span>=<span class="hljs-string">{listItem.complete}</span>
          // 其他的属性及方法
      )
    }, <span class="hljs-attr">this</span>);</span></span></code></pre>
<p>在 <code>TodoItem</code> 组件中就可以用 <code>this.props.taskId</code> 获得任务的 id 了。</p>
<h2 id="articleHeader4">函数的传递</h2>
<p>我们的程序中需要的函数有这几个：</p>
<ul>
<li><p>handleTaskDelete: 根据id删除一项任务</p></li>
<li><p>handleToggleComplete: 切换一项任务的完成状态</p></li>
<li><p>handleSubmit: 新增一项任务</p></li>
<li><p>generateId: 给新增的任务一个随机的id</p></li>
</ul>
<p>在 React 的组件中传递方法与传递属性类似，现在 <code>TodoBox</code> 组件中有一个 <code>handleToggleComplete</code> 函数，将它传递给 <code>TodoList</code> 组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <TodoList toggleComplete={this.handleToggleComplete}
    // 其他的属性及方法写在这里
  />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  &lt;TodoList toggleComplete={<span class="hljs-keyword">this</span>.handleToggleComplete}
    <span class="hljs-comment">// 其他的属性及方法写在这里</span>
  /&gt;</code></pre>
<p>这样你就可以在 <code>TodoList</code> 组件中通过 <code>this.props.toggleComplete</code> 来调用这一方法了，你也可以将这一方法继续向下一层的组件传递。</p>
<h2 id="articleHeader5">程序的运行</h2>
<p>你可以下载 <a href="https://github.com/noiron/simplest-react-todolist" rel="nofollow noreferrer" target="_blank">GitHub 上的项目文件</a>，再用 python 开启一个 HTTP 服务器，就可以打开 <a href="http://localhost:8000/" rel="nofollow noreferrer" target="_blank">http://localhost:8000/</a> 查看运行结果了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/noiron/simplest-react-todolist.git
cd simplest-react-todolist
python -m SimpleHTTPServer // open a server with python
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>git clone http<span class="hljs-variable">s:</span>//github.<span class="hljs-keyword">com</span>/noiron/simplest-react-todolist.git
<span class="hljs-keyword">cd</span> simplest-react-todolist
<span class="hljs-keyword">python</span> -<span class="hljs-keyword">m</span> SimpleHTTPServer // <span class="hljs-keyword">open</span> <span class="hljs-keyword">a</span> server with <span class="hljs-keyword">python</span>
</code></pre>
<p>这篇博客里没有对整个项目所有的代码进行分析，更多内容还是<a href="https://github.com/noiron/simplest-react-todolist" rel="nofollow noreferrer" target="_blank">直接看代码</a>更清楚。</p>
<blockquote><p>博客原地址：<a href="http://www.wukai.me/2016/06/19/write-a-simplest-todolist-with-reactjs/" rel="nofollow noreferrer" target="_blank">http://www.wukai.me/2016/06/1...</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 React.js 写一个最简单的 To-do List 应用

## 原文链接
[https://segmentfault.com/a/1190000005800129](https://segmentfault.com/a/1190000005800129)

