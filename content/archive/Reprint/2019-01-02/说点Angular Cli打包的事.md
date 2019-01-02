---
title: '说点Angular Cli打包的事' 
date: 2019-01-02 2:30:09
hidden: true
slug: vwmy6mmaw0k
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一、引言</h1>
<p>Angular从开发再到生产环境部署都离不开Angular Cli工具集，而Angular Cli本质上是使用 Webpack（当前使用版本为3） 来打包资源。</p>
<p>Webpack 本身并不复杂，略用过一点都清楚，只需要创建一个 <code>webpack.config.js</code> 的文件并简单的配置，就可以把一个复杂的应用所有文件全部打包成若干静态资源文件。</p>
<p>然而一个复杂的应用免不了使用到第三方类库，当这些外部类库与自身业务脚本联系在一起时，就产生一个大家都关心的问题：<strong>性能优化</strong>。</p>
<p>Angular Cli在构建一个含有路由、表单、HTTP等基本的Angular应用大约在150KB左右，就Angular体量而言，自己写一个 Webpack 也很难能优化到这个大小。所以说，Angular Cli是很有良心的作品。然而极大的简化对 Webpack 的使用，何乐不为呢？</p>
<p>本文我将介绍Angular Cli的一些配置在生产环境中所产生的效果，希望能让大家由于一些不合理的行为可能会导致文件体量的上升在改善这一问题时有所帮助。</p>
<h1 id="articleHeader1">二、<code>.angular-cli.json</code> 配置</h1>
<p>Angular Cli 的配置文件是根目录下的 <code>.angular-cli.json</code>，而会影响文件体量的只有 <code>styles</code>、<code>scripts</code> 两个节点。</p>
<h2 id="articleHeader2">1、scripts</h2>
<p><code>scripts</code> 节点最后会生成一个独立的 <code>scripts.bundle.js</code> 文件，一般我们会把一些外部非Angular组件的类库放置在这里，比如：<code>jQuery</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: [
    &quot;../node_modules/jquery/dist/jquery.js&quot;,
    &quot;../test.ts&quot;
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"scripts"</span>: [
    <span class="hljs-string">"../node_modules/jquery/dist/jquery.js"</span>,
    <span class="hljs-string">"../test.ts"</span>
]</code></pre>
<blockquote><p><code>scripts</code> 节点还允许 <code>*.ts</code> 文件。</p></blockquote>
<h2 id="articleHeader3">2、styles</h2>
<p><code>styles</code> 节点最后会生成一个独立的 <code>styles.bundle.css</code> 文件。除此之外，组件内（<code>styles</code> 或 <code>styleUrls</code>）的样式会全部打包进 <code>.js</code> 文件中。</p>
<p>正如 jQuery 一样，如果我们需要引用第三方UI库，比如：<code>bootstrap</code> 那么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;styles&quot;: [
    &quot;../node_modules/bootstrap/scss/bootstrap.scss&quot;,
    &quot;styles.scss&quot;
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"styles"</span>: [
    <span class="hljs-string">"../node_modules/bootstrap/scss/bootstrap.scss"</span>,
    <span class="hljs-string">"styles.scss"</span>
]</code></pre>
<p>默认情况引用的是 <code>./src/styles.scss</code>，你可以继续导入外部其它外部样式文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import &quot;variables&quot;;
@import &quot;nav&quot;;
@import &quot;layout&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="scss hljs"><code class="scss">@<span class="hljs-keyword">import</span> <span class="hljs-string">"variables"</span>;
@<span class="hljs-keyword">import</span> <span class="hljs-string">"nav"</span>;
@<span class="hljs-keyword">import</span> <span class="hljs-string">"layout"</span>;</code></pre>
<h3 id="articleHeader4">组件类样式</h3>
<p>Angular组件内使用 <code>styles</code> 或 <code>styleUrls</code> 的样式会全部打包进相应模块的 <code>.js</code> 文件中；并且样式生成存储的方式是无法改变的。</p>
<p><strong><code>encapsulation</code></strong></p>
<p>顺带提一下。既然是Angular组件，如果说此时还需要外部的样式这显得有点框住组件<strong>独立性</strong>的特点，然而组件样式是否污染其它组件呢？我们通过指定 <code>encapsulation</code> 样式封装方式来改变这一些行为，它包括三个值：</p>
<ul>
<li>
<code>ViewEncapsulation.Emulated</code> 默认，采用额外添加一些 <code>_ngcontent</code> 属性来限定样式隔离</li>
<li>
<code>ViewEncapsulation.Native</code> 采用Shadow Dom隔离方式</li>
<li>
<code>ViewEncapsulation.None</code> 不隔离</li>
</ul>
<h1 id="articleHeader5">三、<code>ng build</code> 指令</h1>
<p>Angular Cli 会根据 <code>.angular-cli.json</code> 配置（<code>apps/root</code>、<code>apps/main</code>）决定从哪里开始启动。因此，当执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng build --prod  --build-optimizer" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">ng build --prod  --build-optimizer</code></pre>
<blockquote><p><code>--build-optimizer</code> 从 <code>1.3.0-rc.5</code> 才开始支持。相比较之前 Cli 版本，Tree-Shaking 力度更大，当然相应的文件大小也更轻。</p></blockquote>
<p>会从根模块开始逐一对每一个模块进行打包，并保存在每一个文件当中。若采用路由迟延加载模块的话，会在 <code>inline.js</code> 中加上相应的动态加载脚本代码。</p>
<h2 id="articleHeader6">1、文件名哈希</h2>
<p>Angular Cli 提供了 <code>--output-hashing</code> 参数，来指定文件名哈希模式，它包括四种：</p>
<table>
<thead><tr>
<th>模式</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>none</code></td>
<td>不哈希</td>
</tr>
<tr>
<td><code>all</code></td>
<td>所有（若 <code>--prod</code> 时默认）</td>
</tr>
<tr>
<td><code>media</code></td>
<td>限资源文件</td>
</tr>
<tr>
<td><code>bundles</code></td>
<td>限webpack打包后的js文件</td>
</tr>
</tbody>
</table>
<p><strong>注意：</strong>这里并不会哈希 <code>assets</code> 文件夹，因为该文件夹采用是直接复制的形式。</p>
<h2 id="articleHeader7">2、指定输出</h2>
<p>Angular应用很多时候可能是放在现有WEB服务的某个目录下（例如：<code>v2</code>），因此，访问地址会变成：<code>https://www.demo.com/v2</code>。但会发现，无法加载应用；这是由 <code>index.html</code> 会包括一句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<base href=&quot;/&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">base</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span>&gt;</span></code></pre>
<p>倒置所有脚本资源的加载URL指向根目录。Angular Cli 提供一个参数改变该值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng build --prod --bh /v2/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">ng build --prod --bh /v2/</code></pre>
<blockquote><p>往往在开发过程中总需要依赖一些图片资源的访问，倘若在代码中采用绝对路径，那就懵逼了，所以<strong>建议不要在代码中使用绝对路径访问资源文件</strong>。</p></blockquote>
<h1 id="articleHeader8">四、优化方式</h1>
<h2 id="articleHeader9">1、输出包体组成分析文件</h2>
<p>Webpack 有一个非常好用的工具叫 <a href="https://www.npmjs.com/package/webpack-bundle-analyzer" rel="nofollow noreferrer" target="_blank">webpack-bundle-analyzer</a>，会自动分析包体组成结构，并以一种可视化的方式显示。</p>
<p>首先，生成 <code>stats.json</code> 包体组成结构的统计文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng build --prod --stats-json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">ng build --prod --stats-json</code></pre>
<p>最后访问 <a href="https://webpack.github.io/analyse" rel="nofollow noreferrer" target="_blank">webpack analyse</a> 导入生成的JSON文件即可。</p>
<p>利用可视化的视觉可以了解一些优化的细节。</p>
<h2 id="articleHeader10">2、Rollup 摇树优化</h2>
<p>所谓Rollup是指Webpack2会把那些应用中未使用的引用代码除掉，<strong>但不会删除这些代码</strong>，所以就需要配合 UglifyJs 能够智能的移除这些未使用的代码。从而减少包体大小。</p>
<p>而Agnular应用是基于Typescript，因此Angular Cli提供了一个叫 <a href="https://github.com/angular/devkit/tree/master/packages/angular_devkit/build_optimizer" rel="nofollow noreferrer" target="_blank">Angular Build Optimizer</a> 插件，将 Typescript 编译结果转化成更友好的UglifyJs版本。这样UglifyJs就能够更有效的移除那些未使用的代码。</p>
<p>Angular Cli只需要加上 <code>--build-optimizer</code> 参数就可以，在一些情况下压缩的还是很厉害的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ng build --prod --build-optimizer" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">ng build --prod --build-optimizer</code></pre>
<h2 id="articleHeader11">3、导出Webpack配置</h2>
<p>Angular Cli 是基于 Webpack 封闭的一个Angular命令行工具，但并不表示我们无法了解细节。</p>
<p>Webpack 的核心是 <code>webpack.config.js</code> 文件，然后 Angular Cli 构建的项目并看不到该文件。</p>
<p>但是可以透过 <code>ng eject</code> （更多细节见<a href="https://github.com/angular/angular-cli/wiki/eject" rel="nofollow noreferrer" target="_blank">wiki</a>） 转化成 Webapck 项目所需要的配置文件与运行配置指令。这时候会在根目录产生 <code>webpack.config.js</code> 文件。</p>
<p><strong>不过</strong>，同时也会改变了 <code>package.json</code> 与 <code>.angular-cli.json</code> 的一些配置，若你只想查看 Webpack 配置信息，可以还原这些配置即可。</p>
<h1 id="articleHeader12">结论</h1>
<p>本文只是日常做一次总结，都是一些网络中可以查阅到的知识，并无新意。而上面所有 Angular Cli 相关命令，都可以在 <a href="https://github.com/angular/angular-cli/wiki" rel="nofollow noreferrer" target="_blank">Wiki</a> 都有相应的描述。</p>
<p>Happy coding!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
说点Angular Cli打包的事

## 原文链接
[https://segmentfault.com/a/1190000010981919](https://segmentfault.com/a/1190000010981919)

