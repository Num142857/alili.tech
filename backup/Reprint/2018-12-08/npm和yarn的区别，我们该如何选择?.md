---
title: 'npm和yarn的区别，我们该如何选择?' 
date: 2018-12-08 2:30:31
hidden: true
slug: uqxg388lyyo
categories: [reprint]
---

{{< raw >}}

                    
<p>周一入职，同事JJ让我熟悉一下基于React的新项目。<br>按照以往，我的步骤都是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone xxx
npm install
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell">git <span class="hljs-keyword">clone</span> <span class="hljs-title">xxx</span>
npm install
npm run dev</code></pre>
<p>这时，JJ给我来了下面一段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone xxx
yarn
yarn start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell">git <span class="hljs-keyword">clone</span> <span class="hljs-title">xxx</span>
yarn
yarn <span class="hljs-literal">start</span></code></pre>
<p>“咦，yarn是什么鬼？难道npm更高级的替代品？为什么要替代npm？难道有什么好的地方？”，内心一连串的问题冒出来。我就默默的问了一下JJ：“yarn是跟npm一样的东西吗？”，“嗯。”JJ忙碌的敲着键盘，显然这个问题不值得继续问下去了。我也默默的把刚才脑子里一连串的问题记了下来。</p>
<h3 id="articleHeader0">Yarn是什么？</h3>
<p>“Yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 ，正如<a href="http://link.zhihu.com/?target=https%3A//code.facebook.com/posts/1840075619545360" rel="nofollow noreferrer" target="_blank">官方文档</a>中写的，Yarn 是为了弥补 npm 的一些缺陷而出现的。”这句话让我想起了使用npm时的坑了：</p>
<ul>
<li>
<code>npm install </code>的时候<strong>巨慢</strong>。特别是新的项目拉下来要等半天，删除node_modules，重新install的时候依旧如此。</li>
<li>同一个项目，安装的时候<strong>无法保持一致性</strong>。由于package.json文件中版本号的特点，下面三个版本号在安装的时候代表不同的含义。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;5.0.3&quot;,
&quot;~5.0.3&quot;,
&quot;^5.0.3&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="shell">"5<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.3</span>",
"~5<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.3</span>",
"^5<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.3</span>"</code></pre>
<p>“5.0.3”表示安装指定的5.0.3版本，“～5.0.3”表示安装5.0.X中最新的版本，“^5.0.3”表示安装5.X.X中最新的版本。这就麻烦了，常常会出现同一个项目，有的同事是OK的，有的同事会由于安装的版本不一致出现bug。</p>
<ul><li>安装的时候，包会在同一时间下载和安装，中途某个时候，一个包抛出了一个错误，但是npm会继续下载和安装包。因为npm会把所有的日志输出到终端，有关错误包的错误信息就会在一大堆npm打印的警告中丢失掉，并且你甚至永远<strong>不会注意到实际发生的错误</strong>。</li></ul>
<p>带着这些坑，我开始了解Yarn的优势及其解决的问题。</p>
<h3 id="articleHeader1">Yarn的优点？</h3>
<ul><li>
<strong>速度快</strong> 。速度快主要来自以下两个方面：</li></ul>
<ol>
<li>并行安装：无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。而 Yarn 是同步执行所有任务，提高了性能。</li>
<li>离线模式：如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。</li>
</ol>
<ul>
<li>安装<strong>版本统一</strong>：为了防止拉取到不同的版本，Yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，Yarn 就会创建（或更新）yarn.lock 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本。npm 其实也有办法实现处处使用相同版本的 packages，但需要开发者执行 npm shrinkwrap 命令。这个命令将会生成一个锁定文件，在执行 npm install 的时候，该锁定文件会先被读取，和 Yarn 读取 yarn.lock 文件一个道理。npm 和 Yarn 两者的不同之处在于，Yarn 默认会生成这样的锁定文件，而 npm 要通过 shrinkwrap 命令生成 npm-shrinkwrap.json 文件，只有当这个文件存在的时候，packages 版本信息才会被记录和更新。</li>
<li>
<strong>更简洁的输出</strong>：npm 的输出信息比较冗长。在执行 npm install &lt;package&gt; 的时候，命令行里会不断地打印出所有被安装上的依赖。相比之下，Yarn 简洁太多：默认情况下，结合了 emoji直观且直接地打印出必要的信息，也提供了一些命令供开发者查询额外的安装信息。</li>
<li>
<strong>多注册来源处理：</strong>所有的依赖包，不管他被不同的库间接关联引用多少次，安装这个包时，只会从一个注册来源去装，要么是 npm 要么是 bower, 防止出现混乱不一致。</li>
<li>
<strong>更好的语义化</strong>： yarn改变了一些npm命令的名称，比如 yarn add/remove，感觉上比 npm 原本的 install/uninstall 要更清晰。</li>
</ul>
<h3 id="articleHeader2">Yarn和npm命令对比</h3>
<table>
<thead><tr>
<th align="right">npm</th>
<th align="left">yarn</th>
</tr></thead>
<tbody>
<tr>
<td align="right">npm install</td>
<td align="left">yarn</td>
</tr>
<tr>
<td align="right">npm install react --save</td>
<td align="left">yarn add react</td>
</tr>
<tr>
<td align="right">npm uninstall react --save</td>
<td align="left">yarn remove react</td>
</tr>
<tr>
<td align="right">npm install react --save-dev</td>
<td align="left">yarn add react --dev</td>
</tr>
<tr>
<td align="right">npm update --save</td>
<td align="left">yarn upgrade</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader3">npm的未来：npm5.0</h3>
<p>有了yarn的压力之后，npm做了一些类似的改进。</p>
<ol>
<li>默认新增了类似yarn.lock的 package-lock.json；</li>
<li>git 依赖支持优化：这个特性在需要安装大量内部项目（例如在没有自建源的内网开发），或需要使用某些依赖的未发布版本时很有用。在这之前可能需要使用指定 commit_id 的方式来控制版本。</li>
<li>文件依赖优化：在之前的版本，如果将本地目录作为依赖来安装，将会把文件目录作为副本拷贝到 node_modules 中。而在 npm5 中，将改为使用创建 symlinks 的方式来实现（使用本地 tarball 包除外），而不再执行文件拷贝。这将会提升安装速度。目前yarn还不支持。</li>
</ol>
<h3 id="articleHeader4">总结</h3>
<p>在npm5.0之前，yarn的优势特别明显。但是在npm之后，通过以上一系列对比，我们可以看到 npm5 在速度和使用上确实有了很大提升，值得尝试，不过还没有超过yarn。</p>
<p>综上我个人的建议是如果你已经在个人项目上使用 yarn，并且没有遇到更多问题，目前完全可以继续使用。但如果有兼容 npm 的场景，或者身处在使用 npm，cnpm，tnpm 的团队，以及还没有切到 yarn 的项目，那现在就可以试一试 npm5 了。</p>
<h2 id="articleHeader5">欢迎讨论，点个赞再走～ ｡◕‿◕｡</h2>
<p>文章同步于以下社区，选一个关注我吧：</p>
<p><a href="http://www.simbawu.com/blog" rel="nofollow noreferrer" target="_blank">simbawu</a> | <a href="https://github.com/simbawus/blog/issues" rel="nofollow noreferrer" target="_blank">github</a> | <a href="https://segmentfault.com/u/simbawu/articles">segmentfault</a> | <a href="https://www.zhihu.com/people/wusb/posts" rel="nofollow noreferrer" target="_blank">知乎</a> | <a href="https://www.jianshu.com/u/54986e6d5fa7" rel="nofollow noreferrer" target="_blank">简书</a> | <a href="https://juejin.im/user/59cd9cb8518825745c637de0/posts" rel="nofollow noreferrer" target="_blank">掘金</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
npm和yarn的区别，我们该如何选择?

## 原文链接
[https://segmentfault.com/a/1190000013990134](https://segmentfault.com/a/1190000013990134)

