---
title: 'React学习笔记4：调试工具，chrome React扩展+source-map' 
date: 2019-02-11 2:30:49
hidden: true
slug: lvrgddxh4l
categories: [reprint]
---

{{< raw >}}

                    
<p>新搭建的个人博客，本文地址：<a href="http://www.j2do.com/blog/post/React%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B04%EF%BC%9A%E8%B0%83%E8%AF%95%E5%B7%A5%E5%85%B7%EF%BC%8Cchrome%20React%E6%89%A9%E5%B1%95+source-map" rel="nofollow noreferrer" target="_blank">React学习笔记4：调试工具，chrome React扩展+source-map</a><br>毫无疑问调试是开发过程中相当相当痛苦的一件事情，如果没有好的工具配合那就更痛苦了！React是基于Babel的编译转码，到浏览器执行的实际上是es5代码，虽说良好的代码结构转码后可读性还是相当高，但对于我这种小白是接受不了了~<br>1、安装chrome扩展『React Developer Tools』（vpn、翻墙，大家懂得）<br>2、React Developer Tools会自动检测React组件，不过在webpack-dev-server模式下，webpack会自动将React组件放入到iframe下，导致React组件检测失败，变通方法是webpack-dev-server配置在--inline模式下即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server --inline" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">webpack-dev-server <span class="hljs-comment">--inline</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVvkYs?w=2560&amp;h=1368" src="https://static.alili.tech/img/bVvkYs?w=2560&amp;h=1368" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>3、截止目前几乎没有浏览器原生支持es6标准，对于这种情况，chrome引入了source-map文件，标识es5代码对应的转码前的es6代码哪一行，唯一要做的就是配置webpack自动生成source-map文件，这也很简单，在webpack.config.js中增加一行配置即可（需要重新启动webpack-dev-server使配置生效）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  entry:{
    'index':'./src/index.js',
    'comment':'./src/comment.js',
    'commentEs6':'./src/commentEs6.js',
  },
  devtool: 'source-map',
  output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-attribute">entry</span>:{
    <span class="hljs-string">'index'</span>:<span class="hljs-string">'./src/index.js'</span>,
    <span class="hljs-string">'comment'</span>:<span class="hljs-string">'./src/comment.js'</span>,
    <span class="hljs-string">'commentEs6'</span>:<span class="hljs-string">'./src/commentEs6.js'</span>,
  },
  <span class="hljs-attribute">devtool</span>: <span class="hljs-string">'source-map'</span>,
  <span class="hljs-attribute">output</span>: {
        <span class="hljs-attribute">path</span>: path.resolve(__dirname, <span class="hljs-string">'build'</span>),
        <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].js'</span>
  },</code></pre>
<p>4、修改某一处为错误，然后观察结果<br><span class="img-wrap"><img data-src="/img/bVvkYO?w=2556&amp;h=1362" src="https://static.alili.tech/img/bVvkYO?w=2556&amp;h=1362" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>通过上面的两个工具，我们可以很方便的调试开发基于ES6的React啦！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React学习笔记4：调试工具，chrome React扩展+source-map

## 原文链接
[https://segmentfault.com/a/1190000005046471](https://segmentfault.com/a/1190000005046471)

