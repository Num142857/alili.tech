---
title: '学习 Next.js: 入门' 
date: 2019-01-13 2:30:11
hidden: true
slug: t9ymjbarkph
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>原始文档在 <a href="https://github.com/developerworks/learnnextjs-cn-docs" rel="nofollow noreferrer" target="_blank">https://github.com/developerw...</a> 现在搬过来.</p>
<p><a href="https://segmentfault.com/a/1190000009604556">学习 Next.js: 入门</a><br><a href="https://segmentfault.com/a/1190000009604642" target="_blank">学习 Next.js: 页面之间的导航</a><br><a href="https://segmentfault.com/a/1190000009604702">学习 Next.js: 使用共享组件</a><br><a href="https://segmentfault.com/a/1190000009604779" target="_blank">学习 Next.js: 创建动态内容</a><br><a href="https://segmentfault.com/a/1190000009604826">学习 Next.js: 使用路由掩码创建干净的URL</a><br><a href="https://segmentfault.com/a/1190000009604872" target="_blank">学习 Next.js: 干净URL的服务器支持</a><br><a href="https://segmentfault.com/a/1190000009604921">学习 Next.js: 获取数据</a><br><a href="https://segmentfault.com/a/1190000010992618" target="_blank">学习 Next.js: 部署</a></p>
</blockquote>
<blockquote><p>哪位分高的,帮忙创建一个 Next.js 的标签, 谢谢. 现暂时放在reactjs标签下面了. 新建文章有时间限制, 一会全部发上来, 这是最近两天翻译的 Next.js 学习资料, 原始文章在 <a href="http://learnnextjs.com" rel="nofollow noreferrer" target="_blank">http://learnnextjs.com</a></p></blockquote>
<h1 id="articleHeader0">入门</h1>
<p>创建一个单页Javascript应用程序是一件非常有挑战的事情, 幸运的是, 开源世界给我们提供了一些好用的工具来简化, 加速单页应用的开发.</p>
<p><a href="https://github.com/facebookincubator/create-react-app" rel="nofollow noreferrer" target="_blank">Create React App</a> 就是这样一种工具.</p>
<p>即使是这样, 创建单页应用有非常高的学习曲线. 仍然需要我们学习客户端路由, 页面布局, 等技术. 如果你还想要运行服务器端渲染(SSR: Server Side Rendering), 事情就变得更加困难了.</p>
<blockquote><p>因此, 我们需要一个简单并且可自定义的方案</p></blockquote>
<p>想一下我们如何使用PHP创建Web应用程序. 首先创建一些文件, 编写PHP代码, 然后部署. 不用担心路由的问题, Web应用程序只是在服务器端运行, 并且输出HTML而已.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009604559?w=224&amp;h=144" src="https://static.alili.tech/img/remote/1460000009604559?w=224&amp;h=144" alt="Next.js" title="Next.js" style="cursor: pointer; display: inline;"></span></p>
<p>但这里我们说的不是用PHP来创建Web应用程序, 我们使用Javascript和React, 使用Next.js框架给我们提供能力:</p>
<ul>
<li>服务器端渲染(默认)</li>
<li>自动代码切分, 加速页面加载</li>
<li>简单的客户端路由(基于页面)</li>
<li>基于Webpack的开发环境, 支持热模块替换(HMR: Hot Module Replacement)</li>
<li>可以使用Express 或其他Node.js服务器实现</li>
<li>使用Babel和Webpack配置定制</li>
</ul>
<h2 id="articleHeader1">设置</h2>
<p>Next.js 可以在Windows, Mac和Linux运行. 只需要在系统中安装Node.js即可开始构建Next.js应用程序.</p>
<p>除了需要一个文本编辑器编写代码, 一个终端调用命令之外, 没什么别的是必须的.</p>
<blockquote><p>如果在Windows上运行, 建议使用 PowerShell. Next.js可以工作在任何Shell和终端下. 但是本指南中, 我们使用UNIX相关的命令.<br>推荐在 Windows 下使用 PowerShell, 让工作方便一些.</p></blockquote>
<p>运行下面的命令, 创建一个示例项目:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir hello-next
cd hello-next
npm init -y
npm install --save react react-dom next
mkdir pages" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code class="shell"><span class="hljs-built_in">mkdir</span> hello-<span class="hljs-keyword">next</span>
<span class="hljs-keyword">cd</span> hello-<span class="hljs-keyword">next</span>
npm init -<span class="hljs-keyword">y</span>
npm install --save react react-dom <span class="hljs-keyword">next</span>
<span class="hljs-built_in">mkdir</span> pages</code></pre>
<p>然后打开<code>package.json</code>, 添加下面的NPM脚本命令:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;next&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"next"</span>
  }
}</code></pre>
<p>现在, 一切就准备好了, 你可以运行下面的命令来启动开发服务器了.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>在浏览其中打开: <a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a>.</p>
<h2 id="articleHeader2">404 页面</h2>
<p>打开 <a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a>, 我们看到的是一个 404 页面. 这个时候 Next.js 没有任何功能. 默认就是一个 404 页面.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009604560?w=2090&amp;h=1344" src="https://static.alili.tech/img/remote/1460000009604560?w=2090&amp;h=1344" alt="404 Page" title="404 Page" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">创建第一个页面</h2>
<p>现在我们来创建第一个页面. 在 <code>pages</code> 目录下创建一个名称为 <code>index.js</code> 的文件, 内容如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Index = () => {
  return (
    <div>
      <p>Hell Next.js</p>
    </div>
  )
}
export default Index" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">const</span> Index = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hell Next.js<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Index</code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Index = () => (
  <div>
    <p>Hell Next.js</p>
  </div>
)

export default Index
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">const</span> Index = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hell Next.js<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Index
</code></pre>
<p>现在, 再次访问 <a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a>, 在页面上你会看到 "Hello Next.js". 这里, 我们只是从 <code>pages/index.js</code> 模块导出了一个简单的 React 组件. 同理, 可以编写你自己的模块并且导出它.</p>
<blockquote><p>确保你的 React 组件为默认导出<br>译注: (<code>default</code>关键字)</p></blockquote>
<p>现在, 我们在Index页故意引入一个语法错误(删除尾部的<code>&lt;/p&gt;</code>HTML标签), 如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Index = () => (
  <div>
    <p>Hello Next.js
  </div>
)

export default Index" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">const</span> Index = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello Next.js
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
)

export default Index</span></code></pre>
<p>页面将会显示一个语法错误 <code>There's an error showing the syntax error</code>.</p>
<h2 id="articleHeader4">错误处理</h2>
<p>默认情况, Next.js 会在浏览器中直接显示这些错误信息, 这方便你识别错误并且快速的搞定它.</p>
<p>你但你解决了这些错误, 页面会执行一个无刷新的更新. 这得益于Webpack提供的热模块替换功能, 在Next.js它是默认支持的.</p>
<h2 id="articleHeader5">你太棒了</h2>
<p>看起来你已经构建了第一个Next.js应用程序. 有什么想法? 如果你喜欢, 可以进一步深入下去.</p>
<h2 id="articleHeader6">Bugfix</h2>
<p>2017-10-11: 修复如下问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Index(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Index</span>(...): Nothing was returned <span class="hljs-keyword">from</span> render. This usually means a <span class="hljs-keyword">return</span> statement <span class="hljs-keyword">is</span> <span class="hljs-literal">missing</span>. <span class="hljs-keyword">Or</span>, <span class="hljs-keyword">to</span> render nothing, <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>.</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
学习 Next.js: 入门

## 原文链接
[https://segmentfault.com/a/1190000009604556](https://segmentfault.com/a/1190000009604556)

