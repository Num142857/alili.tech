---
title: '当 webpack 遇上 symlink' 
date: 2019-01-01 2:30:07
hidden: true
slug: o6oizkjh4qm
categories: [reprint]
---

{{< raw >}}

                    
<p>在开发若干个有相互依赖关系的库的时候，通常都会采用 symlink 的方式互相引用，比较典型的一种场景就是使用 <a href="https://github.com/lerna/lerna" rel="nofollow noreferrer" target="_blank">lerna</a> 开发多个 package 。</p>
<h1 id="articleHeader0">lerna 简介</h1>
<p>lerna 是用于管理拥有多个 package 的 JavaScript 项目，其典型目录结构为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lerna-repo/
  packages/
    package1/
      package.json
    package2/
      package.json
  package.json
  lerna.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>lerna-repo/
  packages/
    package1/
      package<span class="hljs-selector-class">.json</span>
    package2/
      package<span class="hljs-selector-class">.json</span>
  package<span class="hljs-selector-class">.json</span>
  lerna.json</code></pre>
<p>packages 目录下面就是各个 package 了。</p>
<p>lerna 有两个比较常用的命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lerna clean
lerna bootstrap" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">lerna clean
lerna bootstrap</code></pre>
<p><code>lerna clean</code> 用于清理 packages ，会删掉各个 package 下面的 node_modules 目录。</p>
<p><code>lerna bootstrap</code> 用于处理各个 package 的依赖，处理步骤为：</p>
<ol>
<li><p>在每个 package 下面执行 <code>npm install</code> 。</p></li>
<li><p>根据各个 package 下 package.json 里面的 dependencies 和 devDependencies 配置，使用 symlink 在各个 package 的 node_modules 下面建立引用关系。</p></li>
<li><p>在每个 package 下执行 <code>npm run prepublish</code> 。</p></li>
<li><p>在每个 package 下执行 <code>npm run prepare</code> 。</p></li>
</ol>
<h1 id="articleHeader1">symlink 的问题</h1>
<p>假设 package 下面有一个包 <code>pkg1</code> ，依赖 package 下面的另一个包 <code>pkg2</code> 。</p>
<p>运行 <code>lerna bootstrap</code> 之后， <code>pkg1/node_modules</code> 下就会出现 <code>pkg2</code> 的 symlink 。</p>
<p>如果使用 webpack 系列工具来编译运行 <code>pkg1</code> ，由于 webpack loader 判断路径默认是按照真实路径来的，所以 <code>pkg2</code> 对应到的路径是 <code>[project root]/package/pkg2</code> ，而不是 <code>[project root]/package/pkg1/node_modules/pkg2</code> 。</p>
<p>这样一来，如果需要 <code>pkg2</code> 中的源码过 <code>pkg1</code> 的 loader （比如 <code>pkg2</code> 中的 ES6 代码过 <code>pkg1</code> 的 <code>babel-loader</code>），就需要在 webpack 相应 loader 配置中加上这个特殊的路径匹配，这和不涉及 <code>symlink</code> 的<code>真实场景</code>存在较大差异。</p>
<p>同时，很多配置（比如 <code>postcssrc</code> 、 <code>babelrc</code> 、 <code>eslintrc</code> 等）是以 resolve 到的文件去解析的，比如要用 babel 编译 <code>pkg2</code> 下面的 <code>[project root]/package/pkg2/src/Dialog.es6</code> 源码，会按照如下目录顺序查找 <code>babelrc</code> 配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[project root]/package/pkg2/src/
[project root]/package/pkg2/
[project root]/package/
[project root]/
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>[project root]/package/pkg2/src/
[project root]/package/pkg2/
[project root]/package/
[project root]/
...</code></pre>
<p>而此时很可能希望能在 <code>[project root]/package/pkg1/</code> 目录下寻找 babelrc 配置。</p>
<p>所以此时其实很希望 webpack loader 基于 symlink 的路径去解析判断 <code>include / exclude</code> 等配置，而不是按照真实文件的路径。</p>
<h1 id="articleHeader2">resolve.symlinks</h1>
<p>webpack 提供了 <code>resolve.symlinks</code> 来解决这个问题，具体参见<a href="https://webpack.js.org/configuration/resolve/#resolve-symlinks" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<h1 id="articleHeader3">新的问题</h1>
<p>虽然使用 symlink 解决了<code>基准路径</code>的问题，但是还存在另外的问题。</p>
<p>如果 <code>pkg2</code> 依赖了 <code>babel-runtime</code> ，那么在 <code>pkg1</code> 的配置中就要注意不要让 <code>babel-runtime</code> 过 <code>babel-loader</code> 了，不然 babel 可能会在 <code>babel-runtime</code> 的源码里面插入一些 ES6 的代码。</p>
<p>如果 <code>pkg1</code> 和 <code>pkg2</code> 同时依赖了第三方模块 <code>externalPkg3</code> ，那么在 <code>lerna bootstrap</code> 之后，会存在两个 <code>externalPkg3</code> ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[project root]/package/pkg1/node_modules/externalPkg3
[project root]/package/pkg1/node_modules/pkg2/node_modules/externalPkg3 -> [project root]/package/pkg2/node_modules/externalPkg3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>[<span class="hljs-keyword">project</span> root]<span class="hljs-regexp">/package/</span>pkg1<span class="hljs-regexp">/node_modules/</span>externalPkg3
[<span class="hljs-keyword">project</span> root]<span class="hljs-regexp">/package/</span>pkg1<span class="hljs-regexp">/node_modules/</span>pkg2<span class="hljs-regexp">/node_modules/</span>externalPkg3 -&gt; [<span class="hljs-keyword">project</span> root]<span class="hljs-regexp">/package/</span>pkg2<span class="hljs-regexp">/node_modules/</span>externalPkg3</code></pre>
<p>而 <code>externalPkg3</code> 里面有个 module 提供了全局的 object ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {};

export function register(name, value) {
    obj[name] = value;
}

export function getValue(name) {
    return obj[name];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj = {};

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">register</span>(<span class="hljs-params">name, value</span>) </span>{
    obj[name] = value;
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getValue</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">return</span> obj[name];
}</code></pre>
<p>此时 <code>pkg1</code> 和 <code>pkg2</code> 会用各自的 <code>obj</code> 对象，如果 <code>pkg1</code> 中想用 <code>pkg2</code> 注册进去的 <code>value</code> ，就会拿不到。</p>
<p>可以考虑在 <code>lerna.json</code> 中配置 <code>commands.bootstrap.ignore</code> 为 <code>["pkg2"]</code> ，在 <code>lerna bootstrap</code> 的时候不安装 <code>pkg2</code> 的依赖，使得最终只会有一个 <code>externalPkg3</code> ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[project root]/package/pkg1/node_modules/externalPkg3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;">[<span class="hljs-keyword">project</span> root]<span class="hljs-regexp">/package/</span>pkg1<span class="hljs-regexp">/node_modules/</span>externalPkg3</code></pre>
<p>这种方式肯定不会是万能的，具体怎么做还要看真正的场景，可能还得各种配置互相配合才能解决问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
当 webpack 遇上 symlink

## 原文链接
[https://segmentfault.com/a/1190000011100006](https://segmentfault.com/a/1190000011100006)

