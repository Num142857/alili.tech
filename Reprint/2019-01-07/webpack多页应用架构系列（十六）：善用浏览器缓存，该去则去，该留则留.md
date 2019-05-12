---
title: 'webpack多页应用架构系列（十六）：善用浏览器缓存，该去则去，该留则留' 
date: 2019-01-07 2:30:11
hidden: true
slug: agqzr18xmja
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<code>https://segmentfault.com/a/1190000010317802</code><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>一个成熟的项目，自然离不开迭代更新；那么在部署前端这一块，我们免不了总是要顾及到浏览器缓存的，本文将介绍如何在 webpack (架构)的帮助下，妥善处理好浏览器缓存。</p>
<p>实际上，我很早以前就想写这一part了，只是苦于当时我所掌握的方案不如人意，便不敢献丑了；而自从<br> webpack 升级到 v2 版本后，以及第三方plugin的日益丰富，我们也有了更多的手段来处理cache。</p>
<h2 id="articleHeader1">浏览器缓存简单介绍</h2>
<p>下面来简单介绍一下浏览器缓存，以及为何我要在标题中强调“该去则去，该留则留”。</p>
<h3 id="articleHeader2">浏览器缓存是啥？</h3>
<p>浏览器缓存(Browser Cache)，是浏览器为了节省网络带宽、加快网站访问速度而推出的一项功能。浏览器缓存的运行机制是这样的：</p>
<ol>
<li>用户使用浏览器第一次访问某网站页面，该页面上引入了各种各样的静态资源（js/css/图片/字体……），浏览器会把这些静态资源，甚至是页面本身(html文件)，都一一储存到本地。</li>
<li>用户在后续的访问中，如果需要再次请求同样的静态资源（根据 url 进行匹配），且静态资源没有过期（服务器端有一系列判别资源是否过期的策略，比如<code>Cache-Control</code>、<code>Pragma</code>、<code>ETag</code>、<code>Expires</code>、<code>Last-Modified</code>），则直接使用前面本地储存的资源，而不需要重复请求。</li>
</ol>
<p>由于webpack只负责构建生成网站前端的静态资源，不涉及服务器，因此本文不讨论以<em>HTTP Header</em>为基础的缓存控制策略；那我们讨论什么呢？</p>
<p>很简单，由于浏览器是根据静态资源的<strong>url</strong>来判断该静态资源是否已有缓存，而静态资源的文件目录又是相对固定的，那么重点明显就在于静态资源的<strong>文件名</strong>了；我们就通过操控静态资源的文件名，来决定静态资源的“去留”。</p>
<h3 id="articleHeader3">浏览器缓存，该留不留会怎么样？</h3>
<p>每次部署上线新版本，静态资源的文件名若有变化，则浏览器判断是第一次读取这个静态资源；那么，即便这个静态资源的内容跟上一版的完全一致，浏览器也要重新下载这个静态资源，浪费网络带宽、拖慢页面加载速度。</p>
<h3 id="articleHeader4">浏览器缓存，该去不去会怎么样？</h3>
<p>每次部署上线新版本，静态资源的文件名若没有变化，则浏览器判断可加载之前缓存下来的静态资源；那么，即便这个静态资源的内容跟上一版的有所变化，浏览器也察觉不到，使用了老版本的静态资源。那这会造成什么样的影响呢？可大可小，小至用户看到的依然是老版的资源，达不到上线更新版本的目的；大至造成网站运行报错、布局错位等问题。</p>
<h2 id="articleHeader5">如何通过操控静态资源的文件名达到控制浏览器缓存的目的呢？</h2>
<p>在webpack关于文件名命名的配置中，存在一系列的变量（或者理解成命名规则也可），通过这些变量，我们可以根据所要生成的文件的具体情况来进行命名，而不必预设好一个固定的名称。在缓存处理这一块，我们主要用到<code>[hash]</code>和<code>[chunkhash]</code>这两个变量。关于这两个变量的介绍，我在之前的文章 —— <a href="https://segmentfault.com/a/1190000006863968#articleHeader5" target="_blank">《webpack配置常用部分有哪些？》</a>就已经解释过是什么意思了，这里就不再累述。</p>
<p>这里总结下<code>[hash]</code>和<code>[chunkhash]</code>这两个变量的用法：</p>
<ul>
<li>用<code>[hash]</code>的话，由于每次使用 webpack 构建代码的时候，此 hash 字符串都会更新，因此相当于<strong>强制刷新浏览器缓存</strong>。</li>
<li>用<code>[chunkhash]</code>的话，则会根据具体 chunk 的内容来形成一个 hash 字符串来插入到文件名上；换句说， chunk 的内容不变，该 chunk 所对应生成出来的文件的文件名也不会变，由此，<strong>浏览器缓存便能得以继续利用</strong>。</li>
</ul>
<h2 id="articleHeader6">有哪些资源是需要兼顾浏览器缓存的？</h2>
<p>理论上来说，除了HTML文件外（HTML文件的路径需要保持相对固定，只能从服务器端入手），webpack生成的所有文件都需要处理好浏览器缓存的问题。</p>
<h3 id="articleHeader7">js</h3>
<p>在 webpack 架构下，js文件也有不同类型，因此也需要不同的配置：</p>
<ol>
<li>入口文件(Entry)：在webpack配置中的<code>output.filename</code>参数中，让生成的文件名中带上<code>[chunkhash]</code>即可。</li>
<li>异步加载的chunk：<code>output.chunkFilename</code>参数，操作同上。</li>
<li>通过<code>CommonsChunkPlugin</code>生成的文件：在<code>CommonsChunkPlugin</code>的配置参数中有<code>filename</code>这一项，操作同上。但需要注意的是，如果你使用<code>[chunkhash]</code>的话，webpack 构建的时候可是会报错的哦；那可咋办呢，用<code>[hash]</code>的话，这<code>common chunk</code>不就每次上线新版本都强制刷新了吗？这其实是因为，webpack 的 runtime &amp;&amp; manifest 会统一保存在你的<code>common chunk</code>里，解决的方法，就请看下面关于“webpack 的 runtime &amp;&amp; manifest”的部分了。</li>
</ol>
<h3 id="articleHeader8">css</h3>
<p>对于css来说，如果你是用<code>style-loader</code>直接把css内联到<code>&lt;head&gt;</code>里的，那么，你管好引入该css的js文件的浏览器缓存就好了。</p>
<p>而如果你是使用<code>extract-text-webpack-plugin</code>把css独立打包成css文件的，那么在文件名的配置上，<del>同样加上<code>[chunkhash]</code>即可</del>加上<code>[contenthash]</code>即可(感谢@FLYiNg_hbt 提醒)。这个<code>[contenthash]</code>是什么东西呢？其实就是<code>extract-text-webpack-plugin</code>为了与<code>[chunkhash]</code>区分开，而自定义的一个命名规则，其实际含义跟<code>[chunkhash]</code>可以说是一致的，只是<code>[chunkhash]</code>已被占用作为 chunk 的内容 hash 字符串了，继续用<code>[chunkhash]</code>会造成<a href="https://segmentfault.com/a/1190000010317802#articleHeader13">下述问题</a>。</p>
<h3 id="articleHeader9">图片、字体文件等静态资源</h3>
<p>如<a href="https://segmentfault.com/a/1190000006907701" target="_blank">《听说webpack连图片和字体也能打包？》</a>里介绍的，处理这类静态资源一般使用<code>url-loader</code>或<code>file-loader</code>。</p>
<p>对于<code>url-loader</code>来说，就不需要关心浏览器缓存了，因为它是把静态资源转化成 dataurl 了，而并非独立的文件。</p>
<p>而对于<code>file-loader</code>来说，同样是在文件名的配置上加上<code>[chunkhash]</code>即可。另外需要注意的是，<code>url-loader</code>一般搭配有降级到<code>file-loader</code>的配置（使用loader加载的文件大于一个你设定的值就降级到使用<code>file-loader</code>来加载），同样需要在文件名的配置上加上<code>[chunkhash]</code>。</p>
<h3 id="articleHeader10">webpack 的<code>runtime &amp;&amp; manifest</code>
</h3>
<p>所谓的runtime，就是帮助 webpack 编译构建后的打包文件在浏览器运行的一些辅助代码段，换句话说，打包后的文件，除了你自己的源码和npm库外，还有 webpack 提供的一点辅助代码段。</p>
<p>而 manifest，则是 webpack 用以查找 chunk 真实路径所使用的一份关系表，简单来说，就是<strong> chunk 名</strong>对应<strong> chunk 路径</strong>的关系表。manifest 一般来说会被藏到 runtime 里，因此我们查看 runtime 的时候，虽然能找得到 manifest，但一般都不那么直观，形如下面这一段（仅<code>common chunk</code>部分）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="u.type = &quot;text/javascript&quot;, u.charset = &quot;utf-8&quot;, u.async = !0, u.timeout = 12e4, n.nc &amp;&amp; u.setAttribute(&quot;nonce&quot;, n.nc), u.src = n.p + &quot;&quot; + e + &quot;.&quot; + {
    0: &quot;e6d1dff43f64d01297d3&quot;,
    1: &quot;7ad996b8cbd7556a3e56&quot;,
    2: &quot;c55991cf244b3d833c32&quot;,
    3: &quot;ecbcdaa771c68c97ac38&quot;,
    4: &quot;6565e12e7bad74df24c3&quot;,
    5: &quot;9f2774b4601839780fc6&quot;
}[e] + &quot;.bundle.js&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">u.type = <span class="hljs-string">"text/javascript"</span>, u.charset = <span class="hljs-string">"utf-8"</span>, u.async = !<span class="hljs-number">0</span>, u.timeout = <span class="hljs-number">12e4</span>, n.nc &amp;&amp; u.setAttribute(<span class="hljs-string">"nonce"</span>, n.nc), u.src = n.p + <span class="hljs-string">""</span> + e + <span class="hljs-string">"."</span> + {
    <span class="hljs-number">0</span>: <span class="hljs-string">"e6d1dff43f64d01297d3"</span>,
    <span class="hljs-number">1</span>: <span class="hljs-string">"7ad996b8cbd7556a3e56"</span>,
    <span class="hljs-number">2</span>: <span class="hljs-string">"c55991cf244b3d833c32"</span>,
    <span class="hljs-number">3</span>: <span class="hljs-string">"ecbcdaa771c68c97ac38"</span>,
    <span class="hljs-number">4</span>: <span class="hljs-string">"6565e12e7bad74df24c3"</span>,
    <span class="hljs-number">5</span>: <span class="hljs-string">"9f2774b4601839780fc6"</span>
}[e] + <span class="hljs-string">".bundle.js"</span>;</code></pre>
<h4>
<code>runtime &amp;&amp; manifest</code>被打包到哪里去了？</h4>
<p>那么，这<code>runtime &amp;&amp; manifest</code>的代码段，会被放到哪里呢？一般来说，如果没有使用<code>CommonsChunkPlugin</code>生成<code>common chunk</code>，<code>runtime &amp;&amp; manifest</code>会被放在以入口文件为首的chunk（俗称“大包”）里，如果是我们这种多页（又称多入口）应用，则会每个大包一份<code>runtime &amp;&amp; manifest</code>；这夸张的冗余我们自然是不能忍的，那么<br>用上<code>CommonsChunkPlugin</code>后，<code>runtime &amp;&amp; manifest</code>就会统一迁到<code>common chunk</code>了。</p>
<h4>
<code>runtime &amp;&amp; manifest</code>给<code>common chunk</code>带来的缓存危机</h4>
<p>虽说把<code>runtime &amp;&amp; manifest</code>迁到<code>common chunk</code>后，代码冗余的问题算是解决了，但却造成另一问题：由于我们在上述的静态资源的文件名命名上都采用了<code>[chunkhash]</code>的方案，因此也使得只要我们稍一改动源代码，就会有起码一个 chunk 的命名会产生变化，这就会导致我们的<code>runtime &amp;&amp; manifest</code>也产生变化，从而导致我们的<code>common chunk</code>也发生变化，这或许就是 webpack 规定含有<code>runtime &amp;&amp; manifest</code>的<code>common chunk</code>不能使用<code>[chunkhash]</code>的原因吧（反正chunkhash肯定会变的，还不如不用呢是不是）。</p>
<p>要解决上述问题（这问题很严重啊我摔，<code>common chunk</code>怎么能用不上缓存啊，这可是最大的chunk啊），我们就需要把<code>runtime &amp;&amp; manifest</code>给独立出去。方法也很简单，在用来打包<code>common chunk</code>的<code>CommonsChunkPlugin</code>后，再加一<code>CommonsChunkPlugin</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  /* 抽取出所有通用的部分 */
  new webpack.optimize.CommonsChunkPlugin({
    name: 'commons/commons',      // 需要注意的是，chunk的name不能相同！！！
    filename: '[name]/bundle.[chunkhash].js', // 由于runtime独立出去了，这里便可以使用[chunkhash]了
    minChunks: 4,
  }),
  /* 抽取出webpack的runtime代码，避免稍微修改一下入口文件就会改动commonChunk，导致原本有效的浏览器缓存失效 */
  new webpack.optimize.CommonsChunkPlugin({
    name: 'webpack-runtime',
    filename: 'commons/commons/webpack-runtime.[hash].js', // 注意runtime只能用[hash]
  })," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">/* 抽取出所有通用的部分 */</span>
  <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'commons/commons'</span>,      <span class="hljs-comment">// 需要注意的是，chunk的name不能相同！！！</span>
    filename: <span class="hljs-string">'[name]/bundle.[chunkhash].js'</span>, <span class="hljs-comment">// 由于runtime独立出去了，这里便可以使用[chunkhash]了</span>
    minChunks: <span class="hljs-number">4</span>,
  }),
  <span class="hljs-comment">/* 抽取出webpack的runtime代码，避免稍微修改一下入口文件就会改动commonChunk，导致原本有效的浏览器缓存失效 */</span>
  <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'webpack-runtime'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'commons/commons/webpack-runtime.[hash].js'</span>, <span class="hljs-comment">// 注意runtime只能用[hash]</span>
  }),</code></pre>
<p>这样一来，<code>runtime &amp;&amp; manifest</code>代码段就会被打包到这个名为<code>webpack-runtime</code>的 chunk 里了。这是什么原理呢？据说是在使用<code>CommonsChunkPlugin</code>的情况下， webpack 会把<code>runtime &amp;&amp; manifest</code>打包到最后面的一个<code>CommonsChunkPlugin</code>生成的 chunk 里，而如果这个chunk没有其它代码，那么自然就达到了把<code>runtime &amp;&amp; manifest</code>独立出去的目的了。</p>
<p>需要注意的是，如果你用了<code>html-webpack-plugin</code>来生成html页面，记得要把这<code>runtime &amp;&amp; manifest</code>的 chunk 插入到html页面上，不然页面报错了可不怪我哦。</p>
<p>至此，由于<code>runtime &amp;&amp; manifest</code>独立出去成一个chunk了，于是<code>common chunk</code>的命名便可以使用<code>[chunkhash]</code>了，也就是说，<code>common chunk</code>现在也能做到公共模块内容有更新了，才更新文件名；另一方面，这个独立出去的 <code>runtime &amp;&amp; manifest</code> chunk，是每次 webpack 打包构建的时候都会更新了。</p>
<h4>有必要把 manifest 从 <code>runtime &amp;&amp; manifest</code> chunk 中独立出去吗？</h4>
<p>是的，不用惊讶，的确是有这么一个骚操作。</p>
<p>把 manifest 独立出去的理由是这样的：manifest 独立出去后，runtime 的部分基本上就不会有变动了；到这里，我们就知道，<code>runtime &amp;&amp; manifest</code>里实际上就是 manifest 在变；因此把 manifest 独立出去，也是进一步地利用浏览器缓存（可以把 runtime 的缓存保留下来）。</p>
<p>具体是怎么做的呢？主流有俩方案：</p>
<ul>
<li>利用<a href="https://github.com/soundcloud/chunk-manifest-webpack-plugin" rel="nofollow noreferrer" target="_blank">chunk-manifest-webpack-plugin</a>把 manifest 生成一个json文件，然后由 webpack 异步加载。</li>
<li>如果你是用<code>html-webpack-plugin</code>来生成html页面的话，还可以利用<a href="https://github.com/jouni-kantola/inline-chunk-manifest-html-webpack-plugin" rel="nofollow noreferrer" target="_blank">inline-chunk-manifest-html-webpack-plugin</a>（<code>html-webpack-plugin</code>作者推荐）来把manifest直接输出到html页面上，这样就能省一个 Http 请求了。</li>
</ul>
<p>我试用过第二种方案，好使，但最终还是放弃了，为什么呢？</p>
<p>把 manifest 独立出去后，只剩下 runtime 的 chunk 的命名还是只能用<code>[hash]</code>，而不能利用<code>[chunkhash]</code>，这就导致我们根本没法利用浏览器缓存。后来，我又想出一个折衷的办法，连<code>[hash]</code>也不要了，直接写死一个文件名；这样的话，的确浏览器缓存就能保存下来了。但后来我还是反转了自己，这种方法虽然能留下浏览器缓存，却做不到“该去则去”。或许大家会有疑问，你不是说 runtime 不会变的吗，那留下缓存有什么关系呀？是的，在同一 webpack 环境下 runtime 的确不会变，但难保 webpack 环境改变后，这runtime会怎么样呀。比如说 webpack 的版本升级了、 webpack 的配置改了、loader &amp; plugin 的版本升级了，在这些情况下，谁敢保证 runtime 永远不会变啊？这 runtime 一用错了过期的缓存，那很可能整个系统都会崩溃的啊，这个险我实在是冒不起，所以只能作罢。</p>
<p>不过我看了下<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>的<code>runtime &amp;&amp; manifest</code> chunk，也才 2kb 而已嘛，你们管好自己的强迫症和代码洁癖好吗？！</p>
<h2 id="articleHeader11">缓存问题杂项</h2>
<h3 id="articleHeader12">模块id带来的缓存问题</h3>
<p>webpack 处理模块(module)间依赖关系时，需要给各个模块定一个 id 以作标识。webpack 默认的 id 命名规则是根据模块引入的顺序，赋予一个整数(1、2、3……)。当你在源码中任意增添或删减一个模块的依赖，都会对整个<br> id 序列造成极大的影响，可谓是“牵一发而动全身”了。那么这对我们的浏览器缓存会有什么样直接的影响呢？影响就是会造成，各个chunk中都不一定有实质的变化，但引用的依赖模块id却都变了，这明显就会造成 chunk 的文件名的变动，从而影响浏览器缓存。</p>
<p>webpack 官方文档里推荐我们使用一个已内置进 webpack2 里的 plugin：<code>HashedModuleIdsPlugin</code>，这个 plugin 的官方文档在<a href="https://webpack.js.org/plugins/hashed-module-ids-plugin/#components/sidebar/sidebar.jsx" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>webpack1 时代便有一个<code>NamedModulesPlugin</code>，它的原理是直接使用模块的相对路径作为模块的 id，这样只要模块的相对路径，模块 id 也就不会变了。那么这个<code>HashedModuleIdsPlugin</code>对比起<code>NamedModulesPlugin</code>来说又有什么进步呢？</p>
<p>是这样的，由于模块的相对路径有可能会很长，那么就会占用大量的空间，这一点是一直为社区所诟病的；但这个<code>HashedModuleIdsPlugin</code>是根据模块的相对路径生成(默认使用md5算法)一个长度可配置（默认截取4位）的字符串作为模块的 id，那么它占用的空间就很小了，大家也就可以安心服用了。</p>
<blockquote>To generate identifiers that are preserved over builds, webpack supplies the NamedModulesPlugin (recommended for development) and HashedModuleIdsPlugin (recommended for production).</blockquote>
<p>从上可知，官方是推荐开发环境用<code>NamedModulesPlugin</code>，而生产环境用<code>HashedModuleIdsPlugin</code>的，原因似乎是与热更新(hmr)有关；不过就我看来，仅在生产环境用<code>HashedModuleIdsPlugin</code>就行了，开发环境还管啥浏览器缓存啊，俺开 chrome dev-tool 设置了不用任何浏览器缓存的。</p>
<p>用法也挺简单的，直接加到<code>plugin</code>参数就成了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: {
  // 其它plugin
  new webpack.HashedModuleIdsPlugin(),  
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">plugins: {
  <span class="hljs-comment">// 其它plugin</span>
  <span class="hljs-keyword">new</span> webpack.HashedModuleIdsPlugin(),  
}</code></pre>
<h3 id="articleHeader13">由某些 plugin 造成的文件改动监测失败</h3>
<p>有些 plugin 会生成独立的 chunk 文件，比如<code>CommonsChunkPlugin</code>或<code>ExtractTextPlugin</code>（从js中提取出css代码段并生成独立的css文件） 。</p>
<p>这些 plugin 在生成 chunk 的文件名时，可能没料想到后续还会有其它 plugin （比如用来混淆代码的<code>UglifyJsPlugin</code>）会对代码进行修改，因此，由此生成的 chunk 文件名，并不能完全反映文件内容的变化。</p>
<p>另外，<code>ExtractTextPlugin</code>有个比较严重的问题，那就是它生成文件名所用的<code>[chunkhash]</code>是直接取自于引用该css代码段的 js chunk ；换句话说，如果我只是修改 css 代码段，而不动 js 代码，那么最后生成出来的css文件名依然没有变化，这可算是非常严重的浏览器缓存“该去不去”问题了。<br>2017-07-26 改动：改用<code>[contenthash]</code>便不会出现此问题，上见<a href="https://segmentfault.com/a/1190000010317802#articleHeader8">css部分</a></p>
<p>有一款 plugin 能解决以上问题：<a href="https://github.com/scinos/webpack-plugin-hash-output" rel="nofollow noreferrer" target="_blank">webpack-plugin-hash-output</a>。</p>
<blockquote>There are other webpack plugins for hashing out there. But when they run, they don't "see" the final form of the code, because they run before plugins like webpack.optimize.UglifyJsPlugin. In other words, if you change webpack.optimize.UglifyJsPlugin config, your hashes won't change, creating potential conflicts with cached resources.<p>The main difference is that webpack-plugin-hash-output runs in the last compilation step. So any change in webpack or any other plugin that actually changes the output, will be "seen" by this plugin, and therefore that change will be reflected in the hash.</p>
</blockquote>
<p>简单来说，就是这个<code>webpack-plugin-hash-output</code>会在 webpack 编译的最后阶段，重新对所有的文件取文件内容的 md5 值，这就保证了文件内容的变化一定会反映在文件名上了。</p>
<p>用法也比较简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: {
  // 其它plugin
  new HashOutput({
    manifestFiles: 'webpack-runtime', // 指定包含 manifest 在内的 chunk
  }),
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">plugins: {
  <span class="hljs-comment">// 其它plugin</span>
  <span class="hljs-keyword">new</span> HashOutput({
    <span class="hljs-attr">manifestFiles</span>: <span class="hljs-string">'webpack-runtime'</span>, <span class="hljs-comment">// 指定包含 manifest 在内的 chunk</span>
  }),
}</code></pre>
<h2 id="articleHeader14">总结</h2>
<p>浏览器缓存很重要，很重要，很重要，出问题了怕不是要给领导追着打。另外，这一块的细节特别多，必须方方面面都顾到，不然哪一方面出了纰漏就全局泡汤。</p>
<h2 id="articleHeader15">示例代码</h2>
<p>诸位看本系列文章，搭配我在Github上的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>（<code>https://github.com/Array-Huang/webpack-seed</code>）。</p>
<h2 id="articleHeader16">附系列文章目录（同步更新）</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000006843916">webpack多页应用架构系列（一）：一步一步解决架构痛点</a></li>
<li><a href="https://segmentfault.com/a/1190000006863968" target="_blank">webpack多页应用架构系列（二）：webpack配置常用部分有哪些？</a></li>
<li><a href="https://segmentfault.com/a/1190000006871991">webpack多页应用架构系列（三）：怎么打包公共代码才能避免重复？</a></li>
<li><a href="https://segmentfault.com/a/1190000006887523" target="_blank">webpack多页应用架构系列（四）：老式jQuery插件还不能丢，怎么兼容？</a></li>
<li><a href="https://segmentfault.com/a/1190000006897458">webpack多页应用架构系列（五）：听说webpack连less/css也能打包？</a></li>
<li><a href="https://segmentfault.com/a/1190000006907701" target="_blank">webpack多页应用架构系列（六）：听说webpack连图片和字体也能打包？</a></li>
<li><a href="https://segmentfault.com/a/1190000006952432">webpack多页应用架构系列（七）：开发环境、生产环境傻傻分不清楚？</a></li>
<li><a href="https://segmentfault.com/a/1190000006992218" target="_blank">webpack多页应用架构系列（八）：教练我要写ES6！webpack怎么整合Babel？</a></li>
<li><a href="https://segmentfault.com/a/1190000007030775">webpack多页应用架构系列（九）：总有刁民想害朕！ESLint为你阻击垃圾代码</a></li>
<li><a href="https://segmentfault.com/a/1190000007043716" target="_blank">webpack多页应用架构系列（十）：如何打造一个自定义的bootstrap</a></li>
<li><a href="https://segmentfault.com/a/1190000007104372">webpack多页应用架构系列（十一）：预打包Dll，实现webpack音速编译</a></li>
<li><a href="https://segmentfault.com/a/1190000007126268" target="_blank">webpack多页应用架构系列（十二）：利用webpack生成HTML普通网页&amp;页面模板</a></li>
<li><a href="https://segmentfault.com/a/1190000007159115">webpack多页应用架构系列（十三）：构建一个简单的模板布局系统</a></li>
<li><a href="https://segmentfault.com/a/1190000007301770" target="_blank">webpack多页应用架构系列（十四）：No复制粘贴！多项目共用基础设施</a></li>
<li><a href="https://segmentfault.com/a/1190000008203380">webpack多页应用架构系列（十五）：论前端如何在后端渲染开发模式下夹缝生存</a></li>
<li><a href="https://segmentfault.com/a/1190000010317802" target="_blank">webpack多页应用架构系列（十六）：善用浏览器缓存，该去则去，该留则留</a></li>
</ul>
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<code>https://segmentfault.com/a/1190000010317802</code><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（十六）：善用浏览器缓存，该去则去，该留则留

## 原文链接
[https://segmentfault.com/a/1190000010317802](https://segmentfault.com/a/1190000010317802)

