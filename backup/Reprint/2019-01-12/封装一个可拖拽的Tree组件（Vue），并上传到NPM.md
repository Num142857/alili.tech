---
title: '封装一个可拖拽的Tree组件（Vue），并上传到NPM' 
date: 2019-01-12 2:30:24
hidden: true
slug: lcaj3qwwye
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>Github :</strong> <a href="https://github.com/shuiRong/vue-drag-tree" rel="nofollow noreferrer" target="_blank">https://github.com/shuiRong/v...</a><br><strong>DEMO:</strong> <a href="https://vigilant-curran-d6fec6.netlify.com/#/" rel="nofollow noreferrer" target="_blank">https://vigilant-curran-d6fec...</a></p>
<hr>
<p><strong>有需求才有动力</strong></p>
<p>一开始在新项目里用的Tree组件是Element的，但踩到坑了：<a href="https://github.com/ElemeFE/element/issues/3259" rel="nofollow noreferrer" target="_blank">Tree节点的填加/删除无法反映到data里</a>，这个影响就比较大了。然后我通过一些奇技淫巧让节点的改变反映到了data里，虽然有点消耗性能（用了深克隆），但勉强算是解决了问题。</p>
<p>然后随着项目的进展，需要Tree节点可拖拽......</p>
<p>本着<code>能用开源项目就不自己写</code>的原则，我就去Gayhub上找适合的项目了。但很不幸运，虽然找到了很多不错的拖拽项目，但都不是我想要的。</p>
<p>无奈，只能自己写了。</p>
<p>快速了学习了HTML5的<a href="https://www.html5rocks.com/zh/tutorials/dnd/basics/" rel="nofollow noreferrer" target="_blank">拖拽特性</a>后，发现尤雨溪写了一个<a href="https://cn.vuejs.org/v2/examples/tree-view.html" rel="nofollow noreferrer" target="_blank">树形视图</a>，正好能借鉴下。两者一结合，项目就成了。</p>
<p>嘿嘿</p>
<hr>
<p><strong>预览</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016040867" src="https://static.alili.tech/img/remote/1460000016040867" alt="vue-drag-tree.gif" title="vue-drag-tree.gif" style="cursor: pointer;"></span></p>
<hr>
<p><strong>快速开发</strong></p>
<p>如果你决定了要做一件事，那就尽可能地快点。比如做一个项目，注释，文档什么乱七八糟的都可以后来再加上，<strong>尽早写出来个Version 1.0 和一个能看的DEMO再说</strong>。</p>
<p>为什么呢？</p>
<p>因为夜长梦多，时间久了什么事都可能发生。尽管对于Tree组件这种项目来说，时机并没有那么重要（比较重要的：项目质量，需求的满足度），但你也<strong>应该有这样的意识</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="说些废话，项目无关，可以不看：

该做选择的时侯就要果断，“犹犹豫豫，顾忌很多”会让你大概率错失良机。或许你会说，难道不该考虑“×××”“×××”“×××”的情况吗？应该考虑，做选择时就应该考虑到所有相关可能出现的情况。
但是，你考虑的太久了！
个人觉得考虑问题不应该带入情绪，它只会把你的注意力带到次要矛盾那里，而不是主要的。完全这样思考问题，我还做不到，但在努力做的更好。

&quot;当断不断，反受其乱&quot;，最新看<<中国历朝通俗演义>>，感悟到的。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code class="text">说些废话，项目无关，可以不看：

该做选择的时侯就要果断，“犹犹豫豫，顾忌很多”会让你大概率错失良机。或许你会说，难道不该考虑“×××”“×××”“×××”的情况吗？应该考虑，做选择时就应该考虑到所有相关可能出现的情况。
但是，你考虑的太久了！
个人觉得考虑问题不应该带入情绪，它只会把你的注意力带到次要矛盾那里，而不是主要的。完全这样思考问题，我还做不到，但在努力做的更好。

<span class="hljs-string">"当断不断，反受其乱"</span>，最新看&lt;&lt;中国历朝通俗演义<span class="hljs-meta">&gt;&gt;</span>，感悟到的。</code></pre>
<hr>
<p><strong>上传NPM</strong></p>
<p>关于"Vue组件如何上传到NPM，供他人使用“，我一开始受到了一些相关博客的误导，大概就是<code>webpack</code>把项目打包成JS文件，然后在<code>package.json</code>的 <code>main</code>导出该JS文件。</p>
<p>我参考了很多文章和项目的代码，仍旧不能成功地在其他项目中引入。</p>
<p>最终，我<strong>灵光一闪</strong>，想到：为何不直接在<code>main</code>里直接导出Vue组件（.vue文件）呢？</p>
<p>成功！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在项目根目录下登录npm。首先，你需要有个npm帐号
npm login
// ...根据提示输入用户名，密码
// ...上传。以后每次代码更新后都可以用这条命令重新上传。记得上传前更新下版本号。
npm publish " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="shell"><span class="hljs-regexp">//</span> 在项目根目录下登录<span class="hljs-built_in">npm</span>。首先，你需要有个<span class="hljs-built_in">npm</span>帐号
<span class="hljs-built_in">npm</span> login
<span class="hljs-regexp">//</span> ...根据提示输入用户名，密码
<span class="hljs-regexp">//</span> ...上传。以后每次代码更新后都可以用这条命令重新上传。记得上传前更新下版本号。
<span class="hljs-built_in">npm</span> publish </code></pre>
<p>比较意外的是，上传了一天就有112次downloads了......看来，有这样需求的人还挺多呢。<br><span class="img-wrap"><img data-src="/img/remote/1460000009831874?w=341&amp;h=381" src="https://static.alili.tech/img/remote/1460000009831874?w=341&amp;h=381" alt="npm.png" title="npm.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
封装一个可拖拽的Tree组件（Vue），并上传到NPM

## 原文链接
[https://segmentfault.com/a/1190000009831868](https://segmentfault.com/a/1190000009831868)

