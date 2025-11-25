---
title: '打破砂锅问到底：详解Webpack中的sourcemap' 
date: 2019-01-27 2:30:59
hidden: true
slug: vam4gpld93i
categories: [reprint]
---

{{< raw >}}

                    
<p>关于webpack中sourcemap的文章很多，但感觉大部分是翻译官方文档的说明， 缺乏直观的用例，写这篇博客的目的是帮自己厘清这个概念， 也顺便将我自己收集的这方面的干货放在这。本文将尝试先讲清楚webpack中的sourcemap配置项的概念。</p>
<h3 id="articleHeader0">Webpack中sourcemap的配置</h3>
<p>sourcemap是为了解决开发代码与实际运行代码不一致时帮助我们debug到原始开发代码的技术。尤其是如今前端开发中大部分的代码都经过编译，打包等工程化转换。比如开发环境下用scss写样式， 想在浏览器中在线编辑css那样编辑scss就不是那么容易了。从我自己看过的资料中， sourcemap的概念最早出现在12年， jquer1.9是较早支持sourcemap的库。这篇博客比较有代表性：<a href="https://www.html5rocks.com/en/tutorials/developertools/sourcemaps/" rel="nofollow noreferrer" target="_blank">Introduction to JavaScript Source Maps</a>，阮一峰的文章<a href="http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html" rel="nofollow noreferrer" target="_blank">JavaScript Source Map 详解</a>也大量参考该博客。关于sourcemap的原理及作用，基本在这两篇文章中讲清楚了。回到webpack中的sourcemap，就我这几天的琢磨， 这方面资料相对比较零散，但凡搜索Webpack中sourcemap的配置， 总是能得到千篇一律的如下信息：<br>Sourcemap type    Quality    Notes</p>
<blockquote>
<p>eval：    生成代码    每个模块都被eval执行，并且存在@sourceURL</p>
<p>cheap-eval-source-map：    转换代码（行内）    每个模块被eval执行，并且sourcemap作为eval的一个dataurl</p>
<p>cheap-module-eval-source-map：    原始代码（只有行内）    同样道理，但是更高的质量和更低的性能</p>
<p>eval-source-map：    原始代码    同样道理，但是最高的质量和最低的性能</p>
<p>cheap-source-map：    转换代码（<strong>行内</strong>）    生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用</p>
<p>cheap-module-source-map：    原始代码（<strong>只有行内</strong>）    与上面一样除了每行特点的从loader中进行映射</p>
<p>source-map：    原始代码    最好的sourcemap质量有完整的结果，但是会很慢</p>
</blockquote>
<p>webpack中devtool的配置的官方文档在这 ：<a href="https://webpack.github.io/docs/configuration.html#devtool" rel="nofollow noreferrer" target="_blank">webpack-devtool</a></p>
<h2 id="articleHeader1">疑问</h2>
<p>反正我看完这些说明是云里雾里， 就我自己而言， 有3个疑问：</p>
<ol>
<li><p>eval和sourcemap有什么关系，eval模式是sourcemap吗？</p></li>
<li><p>包含cheap关键字的配置中只有行内是什么意思？</p></li>
<li><p>这几种不同的配置有什么区别？</p></li>
</ol>
<h2 id="articleHeader2">解答</h2>
<p>看似配置项很多， 其实只是五个关键字<code>eval</code>，<code>source-map</code>，<code>cheap</code>，<code>module</code>，<code>inline</code>的任意组合。这五个关键字每一项都代表一个特性， 这四种特性可以任意组合。它们分别代表以下五种特性（单独看特性说明有点不明所以，别急，往下看）：</p>
<ul>
<li><p>eval： 使用eval包裹模块代码</p></li>
<li><p>source-map： 产生<code>.map</code>文件</p></li>
<li><p>cheap： 不包含列信息（关于列信息的解释下面会有详细介绍)也不包含loader的sourcemap</p></li>
<li><p>module： 包含loader的sourcemap（比如jsx to js ，babel的sourcemap）</p></li>
<li><p>inline： 将<code>.map</code>作为DataURI嵌入，不单独生成<code>.map</code>文件（这个配置项比较少见）</p></li>
</ul>
<p>了解了以上各种不同特性， 再来逐一解答以上问题。</p>
<h3 id="articleHeader3">eval和sourcemap有什么关系，eval模式是sourcemap吗？</h3>
<p><code>eval</code>和<code>source-map</code>都是webpack中devtool的配置选项， <code>eval</code>模式是使用<code>eval</code>将webpack中每个模块包裹，然后在模块末尾添加模块来源<code>//# souceURL</code>， 依靠<code>souceURL</code>找到原始代码的位置。包含eval关键字的配置项并不单独产生<code>.map</code>文件（eval模式有点特殊， 它和其他模式不一样的地方是它依靠sourceURL来定位原始代码， 而其他所有选项都使用<code>.map</code>文件的方式来定位）。包含<code>source-map</code>关键字的配置项都会产生一个<code>.map</code>文件，该文件保存有原始代码与运行代码的映射关系， 浏览器可以通过它找到原始代码的位置。（注：包含<code>inline</code>关键字的配置项也会产生<code>.map</code>文件，但是这个map文件是经过base64编码作为DataURI嵌入），举个栗子：<code>eval-source-map</code>是<code>eval</code>和<code>source-map</code>的组合，可知使用<code>eavl</code>语句包括模块，也产生了<code>.map</code>文件。webpack将<code>.map</code>文件作为DataURI替换<code>eval</code>模式中末尾的<code>//# souceURL</code>。按照我自己的理解， <code>eval</code>和<code>.map</code>文件都是sourcemap实现的不同方式，虽然大部分sourcemap的实现是通过产生<code>.map</code>文件， 但并不表示只能通过<code>.map</code>文件实现。下面是eval模式后产生的模块代码：<br><span class="img-wrap"><img data-src="/img/bVI3qw?w=741&amp;h=445" src="https://static.alili.tech/img/bVI3qw?w=741&amp;h=445" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">包含cheap关键字的配置中只有行内是什么意思？</h3>
<p>这里的列信息指的是代码的不包含原始代码的列信息。 官方文档对于包含<code>cheap</code>的解释是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> cheap-source-map - A SourceMap without **column-mappings**. SourceMaps
> from loaders are not used.

  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&gt; cheap-source-map - A SourceMap <span class="hljs-keyword">without</span> **column-mappings**. SourceMaps
&gt; <span class="hljs-keyword">from</span> loaders are <span class="hljs-keyword">not</span> used.

  
</code></pre>
<p>这句话翻译过来就是“在cheap-source-map模式下sourcemap不包含列信息，也不包含loaders的sourcemap”这里的“column-mappings”就是代码列数的意思，是否包含loaders的sourcemap有什么区别将在之后提到。debug的时候大部分人都只在意代码的行数， 很少关注列数，                         列数就是该行代码从第一个字符开始到定位字符的位置（包括空白字符）包含<code>cheap</code>关键字的模式不包含列信息，体现在webpack中就是：<strong>如果包含<code>cheap</code>关键字，则产生的<code>.map</code>文件不包含列信息。也就是说当你在浏览器中点击该代码的位置时， 光标只定位到行数，不定位到具体字符位置。而不包含<code>cheap</code>关键字时， 点击控制台log将会定位到字符位置。</strong></p>
<p>包含列信息后点击原始代码的定位，注意光标位置：<br><span class="img-wrap"><img data-src="/img/bVI3lF?w=677&amp;h=200" src="https://static.alili.tech/img/bVI3lF?w=677&amp;h=200" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>不包含列信息的光标位置：<br><span class="img-wrap"><img data-src="/img/bVI3qc?w=645&amp;h=235" src="https://static.alili.tech/img/bVI3qc?w=645&amp;h=235" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这篇博客：<a href="https://developers.google.com/web/updates/2015/05/go-to-a-line-number-at-a-specific-column" rel="nofollow noreferrer" target="_blank">Go to a line number at a specific column</a>直观地展示了列数的概念。如果深入到webpack中的细节中体会该配置项，可以看这篇博客：<a href="http://survivejs.com/webpack/building-with-webpack/source-maps/" rel="nofollow noreferrer" target="_blank">SurviveJS：Source Maps</a> ，该文章对比了webpack中所有配置项中<code>.map</code>文件的代码，这里截取<code>eval-source-map</code>和<code>cheap-source-map</code>的模式产生的<code>.map</code>文件代码中的<code>mappings</code>字段对比：</p>
<p><strong>devtool: 'eval-source-map'</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;mappings&quot;: &quot;AAAAA,QAAQC,GAAR,CAAY,aAAZ&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"mappings"</span>: <span class="hljs-string">"AAAAA,QAAQC,GAAR,CAAY,aAAZ"</span>,</code></pre>
<p><strong>devtool: 'cheap-source-map'</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;mappings&quot;: &quot;AAAA&quot;," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"mappings"</span>: <span class="hljs-string">"AAAA"</span>,</code></pre>
<p>注：这里使用了<a href="https://en.wikipedia.org/wiki/Variable-length_quantity" rel="nofollow noreferrer" target="_blank">VLQ编码</a>，（关于VLQ编码还可参考这里：<a href="http://www.cnblogs.com/fsjohnhuang/p/4208566.html" rel="nofollow noreferrer" target="_blank">前端构建：Source Maps详解</a>） 在VLQ编码中，逗号<code>,</code>表示字符列分割，分号<code>;</code>表示行分割。包含<code>cheap</code>关键字的配置项不包含列信息，也就没有逗号。关于VLQ编码， 本文最初的阮一峰的文章中有所解释。而不包含loader的sourcemap指的是不包含loader的sourcemap，不包含它时候如果你使用了诸如babel等代码编译工具时， 定位到的原始代码将是经过编译后的代码位置，而非原始代码。</p>
<p>比如当我用babel编译JS的时候，如果包含不包含loaders的sourcemap，此时debug到的将是编译后的代码， 而非原始代码，如图（这是使用cheap-source-map模式未包含loaders的sourcemap情况下的截图， debug的位置与之前的对比截图是同一个地方）：<br><span class="img-wrap"><img data-src="/img/bVI6aD?w=662&amp;h=411" src="https://static.alili.tech/img/bVI6aD?w=662&amp;h=411" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">这几种不同的配置有什么区别？</h3>
<p>通过以上两个问题的解释， webpack中的sourcemap各个配置项异同应该有了一定认识，乍看之下各个配置项很难记忆， 但其实从每个关键字所代表的特性入手， 就能体会到他们的异同。他们在webpack中的主要区别一个体现在重构的性能上， 总的来说<code>eval</code>性能最好，<code>source-map</code>性能最低，但就我自身的实践来看大多用的是最完整的<code>source-map</code>，该模式对于不管是js还是css，scss等都能很好的覆盖， 相反其他模式都不完整， 在开发环境下重构性能似乎比不上功能的完善。 <br> 另外需要补充的是<code>module</code>关键字， 当加上<code>module</code>关键字webpack将会添加loader的sourcemap。</p>
<p>这篇博客：<a href="http://cheng.logdown.com/posts/2016/03/25/679045" rel="nofollow noreferrer" target="_blank">Webpack devtool source map</a> 对于各个sourcemap配置项都作了对比和梳理， 有趣的是，作者在该文中也指出对于很多官方文档的不解，比如对于所谓的<code>without column-mappings</code>作者就不知道在讲什么：</p>
<blockquote><p>A SourceMap without column-mappings. SourceMaps from loaders are not<br>used.<strong>No idea what that means</strong></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
打破砂锅问到底：详解Webpack中的sourcemap

## 原文链接
[https://segmentfault.com/a/1190000008315937](https://segmentfault.com/a/1190000008315937)

