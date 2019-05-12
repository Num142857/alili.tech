---
title: 'React系列——React组件封装集合' 
date: 2018-12-19 2:30:07
hidden: true
slug: 0ngxpz26m9i
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>一直以来，都是在项目中将公共React组件放在Common之类的文件夹，今天抽时间把以前博客介绍过的几个React组件抽象出来，挂载到npm上，提供下载安装。</p>
<h3 id="articleHeader1">React组件集合列表</h3>
<p>下面列举的React组件都可以点击链接去github下载使用，具体安装教程看readme文档。</p>
<h4>1、<a href="https://github.com/hyy1115/lazy-load-component" rel="nofollow noreferrer" target="_blank">lazy-load-component</a>
</h4>
<p>提供webpack异步加载React组件的高阶函数。</p>
<p>如果你的react项目使用了webpack，那么可以使用lazyLoadComponent实现代码切割。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import lazyLoadComponent from 'lazy-load-component'

const Login = lazyLoadComponent(() => import('./containers/Login'))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> lazyLoadComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'lazy-load-component'</span>

<span class="hljs-keyword">const</span> Login = lazyLoadComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'./containers/Login'</span>))</code></pre>
<h4>2、<a href="https://github.com/hyy1115/create-portal" rel="nofollow noreferrer" target="_blank">create-portal</a>
</h4>
<p>一个封装好的react portal组件，你不需要在body下面写静态的HTML，使用create-portal可以自动生成DOM结构。</p>
<p><strong>组件用法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<CreatePortal
  element={`a`} //String，默认为div
  id={`id`} //tring，可以不设置
  className={`classname`} //String，可以不设置
  style="{{"width: '100px'"}}" //Object，可以不设置
 >
    此处插入div或者react组件
</CreatePortal>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;CreatePortal
  element={<span class="hljs-string">`a`</span>} <span class="hljs-comment">//String，默认为div</span>
  id={<span class="hljs-string">`id`</span>} <span class="hljs-comment">//tring，可以不设置</span>
  className={<span class="hljs-string">`classname`</span>} <span class="hljs-comment">//String，可以不设置</span>
  style="{{"<span class="hljs-attr">width</span>: <span class="hljs-string">'100px'</span>"}}" <span class="hljs-comment">//Object，可以不设置</span>
 &gt;
    此处插入div或者react组件
&lt;<span class="hljs-regexp">/CreatePortal&gt;</span></code></pre>
<p><strong>渲染结果</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
<div id=&quot;root&quot;}>通常这是你的React根入口的元素</div>

<!--portal生成的DOM结构位于根元素之外-->
<a id=&quot;id&quot; class=&quot;classname&quot; style=&quot;width: 100px&quot;>
    此处插入div或者react组件
</div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>}&gt;</span>通常这是你的React根入口的元素<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!--portal生成的DOM结构位于根元素之外--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"id"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"classname"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100px"</span>&gt;</span>
    此处插入div或者react组件
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<h4>3、<a href="https://github.com/hyy1115/react-roll-container" rel="nofollow noreferrer" target="_blank">react-roll-container</a>
</h4>
<p>采用比IScroll更加轻量的JRoll封装的React组件，可以作为移动端DOM内部CSS3滚动的组件。</p>
<p>它是为了解决移动端body中有多层滚动重叠导致的卡顿和点击穿透问题，比如支付宝app里面的饿了么网站，就存在双层滚动时候的穿透问题。</p>
<p>常用在以下地方：</p>
<p>1、弹框内部的滚动</p>
<p>2、多列表的滚动</p>
<p>3、类似京东移动端垂直固定导航的滚动: <a href="https://so.m.jd.com/category/all.html" rel="nofollow noreferrer" target="_blank">京东移动端页面</a></p>
<p>4、其他可能的场景</p>
<p><strong>基本用法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import MyJRoll from 'react-roll-container'

class Component extends React.Component {
    state = {
        height: '100vh'
    }
    render() {
        const { height } = this.state
        return (
            <MyJRoll height={height + 'px'}>
                {/*子组件*/}
            </MyJRoll>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> MyJRoll <span class="hljs-keyword">from</span> <span class="hljs-string">'react-roll-container'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    state = {
        <span class="hljs-attr">height</span>: <span class="hljs-string">'100vh'</span>
    }
    render() {
        <span class="hljs-keyword">const</span> { height } = <span class="hljs-keyword">this</span>.state
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyJRoll</span> <span class="hljs-attr">height</span>=<span class="hljs-string">{height</span> + '<span class="hljs-attr">px</span>'}&gt;</span>
                {/*子组件*/}
            <span class="hljs-tag">&lt;/<span class="hljs-name">MyJRoll</span>&gt;</span></span>
        )
    }
}</code></pre>
<h4>4、<a href="https://github.com/hyy1115/react-markdown-module" rel="nofollow noreferrer" target="_blank">react-markdown-module</a>
</h4>
<p>基于showdown封装的React-markdown组件，支持showdown的所有option配置项，采用github-markdown-css为默认样式，支持自定义其他样式。</p>
<p><strong>基本用法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ReactMarkdown from 'react-markdown-module'

const text = `
# Live demo
Changes are automatically rendered as you type.
* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, &quot;native&quot; React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!
## HTML block below
`
<ReactMarkdown markHtml={text}/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> ReactMarkdown <span class="hljs-keyword">from</span> <span class="hljs-string">'react-markdown-module'</span>

<span class="hljs-keyword">const</span> text = <span class="hljs-string">`
# Live demo
Changes are automatically rendered as you type.
* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!
## HTML block below
`</span>
&lt;ReactMarkdown markHtml={text}/&gt;</code></pre>
<p>=========================2018-01-06 更新==============================</p>
<h4>5、<a href="https://github.com/hyy1115/react-watermark-module" rel="nofollow noreferrer" target="_blank">react-watermark-module</a>
</h4>
<p>React水印组件，支持图片水印，文字水印。</p>
<p><strong>文字水印基本用法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ReactWatermark
    imagePath={} //必须，对象，背景图片
    textData={'红掌拨清波'} //必须，字符串，水印内容
    type={'text'} //必须，水印类型
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;ReactWatermark
    imagePath={} <span class="hljs-comment">//必须，对象，背景图片</span>
    textData={<span class="hljs-string">'红掌拨清波'</span>} <span class="hljs-comment">//必须，字符串，水印内容</span>
    type={<span class="hljs-string">'text'</span>} <span class="hljs-comment">//必须，水印类型</span>
/&gt;</code></pre>
<p><strong>图片水印基本用法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ReactWatermark
    imagePath={} //必须，对象，背景图片
    logoPath={} //必须，logo水印的路径，用require或import导入
    type={'logo'} //必须，水印类型
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;ReactWatermark
    imagePath={} <span class="hljs-comment">//必须，对象，背景图片</span>
    logoPath={} <span class="hljs-comment">//必须，logo水印的路径，用require或import导入</span>
    type={<span class="hljs-string">'logo'</span>} <span class="hljs-comment">//必须，水印类型</span>
/&gt;</code></pre>
<h3 id="articleHeader2">总结</h3>
<p>还有很多可以用React来封装成小插件的东西，如果你也有想法，可以私信我，把你写的React组件也添加进来。</p>
<p>该文章会不限时间更新，未完，待续......</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——React组件封装集合

## 原文链接
[https://segmentfault.com/a/1190000012707383](https://segmentfault.com/a/1190000012707383)

