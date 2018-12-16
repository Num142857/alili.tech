---
title: '分享几个写 demo 的思路' 
date: 2018-12-17 2:30:07
hidden: true
slug: 3wbavsguv3h
categories: [reprint]
---

{{< raw >}}

                    
<p>最近发现了一个新的写 demo 的思路，仔细一想，自己仿佛积累了不少写 demo 的思路和想法，总结一下，抛砖引玉。</p>
<p>本文所说 demo 主要分以下三种：</p>
<ul>
<li>本地 demo</li>
<li>外链 demo</li>
<li>文章中带 demo</li>
</ul>
<h1 id="articleHeader0">本地 demo</h1>
<p>楼主在工作和学习中是比较喜欢写 demo 的，抛出问题非常直观。</p>
<p>本地写 demo，爱咋整就可以咋整，简单到可以只有一个 HTML 文件，复杂到引入 React / Vue 等框架类库，视情况而定。对于楼主来说，多数情况下是一个 HTML 文件就可以搞定的。最方便的情况下，直接新建个 HTML 文件，然后起一个本地 server 即可，本地 server 可以用 Python、PHP 等起，对于前端来说，<a href="https://www.npmjs.com/package/http-server" rel="nofollow noreferrer" target="_blank">http-server</a> 是个不错的选择，然后再配置个 alias，比如我在 <code>.zshrc</code> 中配置 <code>alias s="http-server"</code>，可以秒启。如果是稍微复杂的情况，需要些许调试，那么修改后自动刷新是必须的，我写了一个简单的脚手架 <a href="https://github.com/hanzichi/jsj/tree/master/gulp-simple" rel="nofollow noreferrer" target="_blank">gulp-simple</a> 可以满足这个需求。但是我比较懒，觉得这样还不太方便，毕竟需要编辑器和浏览器两边切换查看效果（单屏的情况下），有时只是查看一个简单的 css 特性，这样搞就显得麻烦了，我又给自己开发了两个简单的在线编辑器，分别是 <a href="https://hanzichi.github.io/2017/editor-online/codeMirror/" rel="nofollow noreferrer" target="_blank">html editor1</a> 以及 <a href="https://hanzichi.github.io/2017/editor-online/ace/" rel="nofollow noreferrer" target="_blank">html editor2</a>，方便调试简单的 html 页面。</p>
<p>本地 demo 大概三个方式，总结下：</p>
<ul>
<li>本地新建 HTML 文件，双击启动或者本地启 server</li>
<li>使用  <a href="https://github.com/hanzichi/jsj/tree/master/gulp-simple" rel="nofollow noreferrer" target="_blank">gulp-simple</a>（需要简单调试的页面）</li>
<li>使用 <a href="https://hanzichi.github.io/2017/editor-online/codeMirror/" rel="nofollow noreferrer" target="_blank">html editor1</a> 或者 <a href="https://hanzichi.github.io/2017/editor-online/ace/" rel="nofollow noreferrer" target="_blank">html editor2</a> 在线编辑以及调试</li>
</ul>
<h1 id="articleHeader1">外链 demo</h1>
<p>你写了个炫酷的页面，希望分享给别人，如果把 HTML 文件发给别人，显然不是一个好的想法，最简单的方式就是将文件上传到服务器，发送链接给别人，也正是接下去要说的外链 demo。</p>
<p>最方便的选择是选择第三方服务，类似 <a href="https://codepen.io/" rel="nofollow noreferrer" target="_blank">codepen</a> 或者 <a href="https://jsfiddle.net/" rel="nofollow noreferrer" target="_blank">jsfiddle</a>，国内的 <a href="http://runjs.cn/" rel="nofollow noreferrer" target="_blank">runjs</a> 也做的不错可以试试。（这些网站均有很多不错的 demo，可以看看实现）</p>
<p>因为个人是重度 GitHub 用户，自从知道 GitHub Pages 这玩意后，一般的外链 demo 都放在那了，所以 GitHub Pages 也不失为一个好的选择。（<a href="https://github.com/hanzichi/hanzichi.github.io" rel="nofollow noreferrer" target="_blank">点这里</a> 看我的全部 demo）</p>
<p>说到 GitHub Pages，其实 GitHub 中的 repo 中的静态 HTML 页面也是可以查看效果的（归根结底还是 GitHub Pages），通常用来生成项目主页等。具体设置在具体 repo 的 Settings -&gt; Options -&gt; GitHub Pages 中，选择分支（一般是 master branch 即可），点击 save 即可，比如我在 codedog 项目中生成的 <a href="https://hanzichi.github.io/codedog/demo/demo.html" rel="nofollow noreferrer" target="_blank">demo</a>。还有另一个方法，进入 <a href="http://htmlpreview.github.io/" rel="nofollow noreferrer" target="_blank">GitHub &amp; BitBucket HTML Preview</a> 这个网站，生成静态页面链接，但是只适用于只有一个 HTML 页面的场景，如果有引用 css 的话路径会错误。</p>
<p>另外，如果有自己的服务器，那么很显然部署到自己的服务器就可以了。</p>
<p>外链 demo 同样大概三个方式，总结下：</p>
<ul>
<li>
<a href="https://codepen.io/" rel="nofollow noreferrer" target="_blank">codepen</a> /  <a href="https://jsfiddle.net/" rel="nofollow noreferrer" target="_blank">jsfiddle</a> / <a href="http://runjs.cn/" rel="nofollow noreferrer" target="_blank">runjs</a>
</li>
<li>GitHub Pages</li>
<li>自己的服务器</li>
</ul>
<h1 id="articleHeader2">文章中带 demo</h1>
<p>重点重点，这才是本文的重点！</p>
<p>有的时候写文章，需要配个简单的 demo，怎么破？外链当然可以，但是没有直接显示在文章中显得直观。</p>
<p>我理想中的状态是，可以用 markdown 写文章，但是文章中有些代码可以方便查看 HTML 效果。最后，我开发了 <a href="https://github.com/hanzichi/codedog" rel="nofollow noreferrer" target="_blank">codedog</a> 这个工具，用 markdown 写文章，自动生成 html 文件，比如我前段时间在看 《CSS 揭秘》这本书，我用 markdown 做笔记，用 codedog 生成的 HTML 可以方便查看 CSS 效果，而且支持在线编辑，简直是爽，具体实现效果可以 <a href="https://github.com/hanzichi/css-secrets" rel="nofollow noreferrer" target="_blank">点击这里</a> 查看。</p>
<p>但是 codedog 这个工具是为了这个需求量身定做的，有一定的局限性，有时候要实现文章中带 demo 的效果，不得不在 markdown 和 HTML 中取舍，比如我之前为了学习 flex 写的 <a href="https://hanzichi.github.io/2017/flex/index.html" rel="nofollow noreferrer" target="_blank">这个 demo</a>，是纯 HTML 写的，且存在一定的特殊性（不可复用）</p>
<p>最后就要说到文章开头说的 “发现了一个新的写 demo 的思路”，做到首尾呼应，是什么呢？</p>
<blockquote>通过设置 style 标签的 display:block 样式可以让页面的 style 标签显示出来，并且加上 contentEditable 属性后可以让样式成为可编辑状态，更改后的样式效果也是实时更新呈现，这就给交互创造了新的可能。</blockquote>
<p>之前的实现如果页面有样式，并且修改样式直接预览（类似  <a href="https://hanzichi.github.io/2017/editor-online/codeMirror/" rel="nofollow noreferrer" target="_blank">html editor1</a> 或者 <a href="https://hanzichi.github.io/2017/editor-online/ace/" rel="nofollow noreferrer" target="_blank">html editor2</a> ），其实实现是获取 value 然后再插入 HTML 文档流中，而通过设置 style 标签的 display:block 样式，操作的就是实际的样式，不需要拐弯抹角。</p>
<p><span class="img-wrap"><img data-src="/img/bV19c1?w=538&amp;h=164" src="https://static.alili.tech/img/bV19c1?w=538&amp;h=164" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
 <body>
    <style style=&quot;display:block&quot; contentEditable>
      body { color: blue }
    </style>
 </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display:block"</span> <span class="hljs-attr">contentEditable</span>&gt;</span><span class="css">
      <span class="hljs-selector-tag">body</span> { <span class="hljs-attribute">color</span>: blue }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>写了个简单的 <a href="https://hanzichi.github.io/test-case/style-display-block/index.html" rel="nofollow noreferrer" target="_blank">demo</a> 可以看下，确实是另一种思路。</p>
<p>所以说，"文章中带 demo" 所说的文章实现，可能是 HTML 的，也可能是 markdown 的，具体如何，需要视情况而定了。</p>
<p>总结下：</p>
<ul>
<li>如果是 markdown 写的文章（如果需要涉及 inline 的 demo），最后肯定是要编译成 HTML 预览，思路类似 codedog</li>
<li>如果直接用 HTML 写文章，类似 <a href="#">这个</a>)，那么我觉得复用性其实不是很高，毕竟交互方式是不一样的（也可以没有交互），这个时候（如果有交互），可以试试 <code>&lt;style style="display:block" contentEditable&gt;</code> 这种方式。</li>
</ul>
<h1 id="articleHeader3">总结</h1>
<p>总结就不总结了，都在上面了，如果有补充，热烈欢迎 ?</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
分享几个写 demo 的思路

## 原文链接
[https://segmentfault.com/a/1190000012866075](https://segmentfault.com/a/1190000012866075)

