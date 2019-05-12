---
title: 'webpack多页应用架构系列（五）：听说webpack连less/css也能打包？' 
date: 2019-02-04 2:30:57
hidden: true
slug: pvsvhrps9zo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<code>https://segmentfault.com/a/1190000006897458</code><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>过去讲前端模块化、组件化，更多还是停留在js层面，毕竟js作为一种更典型的程序语言，在这方面的想象和操作空间都更大一些。但近年来，组件化要求得更多了，HTML/CSS/JS这三件套一件可都不能少（甚至包括其它类型的资源，比如说图片），而这样的组件，无疑是<code>高内聚</code>的。</p>
<h2 id="articleHeader1">文章简介</h2>
<p>本文将介绍如何使用webpack来打包less/css（没用过sass，但毕竟也是通过loader来加载的，相信与less无异），首先是介绍相关的webpack plugin&amp;loader，然后将介绍如何加载不同应用层次的less/css。</p>
<h2 id="articleHeader2">用到什么loader了？</h2>
<p>在<a href="https://segmentfault.com/a/1190000006863968" target="_blank">《webpack多页应用架构系列（二）：webpack配置常用部分有哪些？》</a>里我就说过，webpack的核心只能打包js文件，而js以外的资源都是靠loader进行转换或做出相应的处理的。下面我就来介绍打包less/css所需要的loader。</p>
<h3 id="articleHeader3">less-loader</h3>
<p>针对less文件，我们首先需要使用less-loader来加载。less-loader会调用所依赖的<code>less</code>模块对less文件进行编译(包括<code>@import</code>语法)。至于说less-loader所接受的参数，实质上大部分是传递给<code>less</code>模块使用的参数，由于我本人应用less的程度不深，因此没有传任何参数、直接就使用了。如果你之前对<code>less</code>模块就已经有了一套配置的话，请参考<a href="https://github.com/webpack/less-loader#less-options" rel="nofollow noreferrer" target="_blank">less-loader的文档</a>进行配置。</p>
<p>另外，less-loader并不会针对<code>url()</code>语法做特别的转换，因此，如果你想把<code>url()</code>语句里涉及到的文件（比如图片、字体文件等）也一并用webpack打包的话，就必须利用管道交给css-loader做进一步的处理。</p>
<h3 id="articleHeader4">css-loader</h3>
<p>针对css文件，我们需要使用css-loader来加载.css-loader的功能比较强大，一些新颖的特性比如<code>Local Scope</code>或是<code>CSS Modules</code>都是支持的。</p>
<p>我目前只用到了css-loader的<a href="https://github.com/webpack/css-loader#minification" rel="nofollow noreferrer" target="_blank">压缩功能(Minification)</a>，对于这个功能，有一点是需要注意的，那就是如果你的代码里也和我一样，有许多为了浏览器兼容性的<strong>废弃</strong>CSS代码的话，请务必关闭<code>autoprefixer</code>已避免你的<strong>废弃</strong>CSS代码被css-loader删除了，形如<code>css?minimize&amp;-autoprefixer</code>。</p>
<p>上面提到css-loader会对<code>url()</code>语句做处理，这里稍微再说两句。在less/css里的这<code>url()</code>语句，在css-loader看来，就跟<code>require()</code>语句是一样的，只要在webpack配置文件里定义好加载各类型资源的loader，那这<code>url()</code>语句实际上什么资源都能处理。一般我在<code>url()</code>语句都会以相对路径的方式（相对于此语句所在的less/css文件）来指定文件路径；请不要使用以<code>/</code>开头（即相对于网站根目录，因为对于文件系统来说，这明显是令人混淆的）的路径，尽管css-loader也可以通过设置<code>root</code>参数来适配。</p>
<h3 id="articleHeader5">postcss-loader</h3>
<p>习惯用postcss的童鞋们有福啦，webpack可以通过postcss-loader来兼容postcss。由于postcss只算是一个加分项，因此这里也不作过多介绍，只介绍一下如何把postcss撘进webpack，不明白的童鞋麻烦先把postcss搞懂了再看。</p>
<p>放上我的脚手架项目的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    module: {
        loaders: [
            {
                test:   /\.css$/,
                exclude: /node_modules|bootstrap/,
                loader: 'css?minimize&amp;-autoprefixer!postcss',
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer({
            remove: false,
            browsers: ['ie >= 8', '> 1% in CN'],
        })];
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> precss       = <span class="hljs-built_in">require</span>(<span class="hljs-string">'precss'</span>);
<span class="hljs-keyword">var</span> autoprefixer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [
            {
                <span class="hljs-attr">test</span>:   <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules|bootstrap/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'css?minimize&amp;-autoprefixer!postcss'</span>,
            }
        ]
    },
    <span class="hljs-attr">postcss</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> [precss, autoprefixer({
            <span class="hljs-attr">remove</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'ie &gt;= 8'</span>, <span class="hljs-string">'&gt; 1% in CN'</span>],
        })];
    }
}</code></pre>
<p>从loader的配置<code>'css?minimize&amp;-autoprefixer!postcss'</code>上看，实际上就是先让postcss-loader处理完了再传递给css-loader。而<code>postcss</code>项则是postcss-loader所接受的参数，实际上就是返回一个包含你所需要的postcss's plugins的数组啦，这些plugin有各自的初始化参数，不过这些都是postcss的内容了，这里就不做介绍了。</p>
<h2 id="articleHeader6">用到什么Plugin了？</h2>
<p>加载less/css这一块主要用到的是<code>extract-text-webpack-plugin</code>（下文简称为<code>ExtractTextPlugin</code>吧），而且由于我用的是<code>webpack 1</code>，因此用的也是相对应<code>webpack 1</code>的版本（<a href="https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md" rel="nofollow noreferrer" target="_blank">1的文档在这里不要搞错了哈</a>）。</p>
<p>ExtractTextPlugin的作用是把各个chunk加载的css代码（可能是由less-loader转换过来的）合并成一个css文件并在页面加载的时候以<code>&lt;link&gt;</code>的形式进行加载。</p>
<p>相对于使用style-loader直接把css代码段跟js打包在一起并在页面加载时以inline的形式插入DOM，我还是更喜欢ExtractTextPlugin生成并加载CSS文件的形式；倒不是看不惯inline的css，只是用文件形式来加载的话会快很多，尤其后面介绍用webpack来生成HTML的时候，这<code>&lt;link&gt;</code>会直接生成在<code>&lt;head&gt;</code>里，那么在CSS的加载上就跟传统的前端页面没有差别了，体验非常棒。</p>
<p>ExtractTextPlugin的初始化参数不多，唯一的必填项是<code>filename</code>参数，也就是如何来命名生成的CSS文件。跟webpack配置里的output.filename参数类似，这ExtractTextPlugin的filename参数也允许使用变量，包括[id]、[name]和[contenthash]；理论上来说如果只有一个chunk，那么不用这些变量，写死一个文件名也是可以的，但由于我们要做的是多页应用，必然存在多个chunk（至少每个entry都对应一个chunk啦）。这里我是这么设置的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new ExtractTextPlugin('[name]/styles.css'), // [name]对应的是chunk的name，我在webpack配置中是这样" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name]/styles.css'</span>), <span class="hljs-comment">// [name]对应的是chunk的name，我在webpack配置中是这样</span></code></pre>
<p><code>[name]</code>对应的是chunk的name，我在webpack配置中把各个entry的name都按<code>index/index</code>、<code>index/login</code>这样的形式来设置了，那么最后css的路径就会像这样：<code>build/index/index/styles.css</code>，也就是跟chunk的js文件放一块了（js文件的路径形如<code>build/index/index/entry.js</code>）。</p>
<p>除了要把这初始化后的ExtractTextPlugin放到webpack配置中的<code>plugins</code>参数里，我们还要在loader配置里做相应的修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    module: {
        loaders: [
            {
                test:   /\.css$/,
                exclude: /node_modules|bootstrap/,
                loader: ExtractTextPlugin.extract('css?minimize&amp;-autoprefixer!postcss'),
            }
        ]
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [
            {
                <span class="hljs-attr">test</span>:   <span class="hljs-regexp">/\.css$/</span>,
                <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules|bootstrap/</span>,
                <span class="hljs-attr">loader</span>: ExtractTextPlugin.extract(<span class="hljs-string">'css?minimize&amp;-autoprefixer!postcss'</span>),
            }
        ]
    },
}</code></pre>
<p>如此一来，ExtractTextPlugin就算是配置好了。</p>
<h2 id="articleHeader7">如何加载不同应用层次的less/css</h2>
<p>在我的设计中，有三种应用层次的less/css代码段：</p>
<ul>
<li>基础的、公用的代码段，包括CSS框架、在CSS框架上进行定制的CSS theme，基本上每个页面都会应用到这些CSS代码段。</li>
<li>组件的代码段，这里的<code>组件</code>指的是你自己写的组件，而且组件本身含有js，并负责加载css以及其它逻辑。</li>
<li>每个页面独有的CSS代码段，很可能只是对某些细节进行微调。</li>
</ul>
<p>首先来回顾一下我设计的文件目录结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─src # 当前项目的源码
    ├─pages # 各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等
    │  ├─alert # 业务模块
    │  │  └─index # 具体页面
    │  ├─index # 业务模块
    │  │  ├─index # 具体页面
    │  │  └─login # 具体页面
    │  │      └─templates # 如果一个页面的HTML比较复杂，可以分成多块再拼在一起
    │  └─user # 业务模块
    │      ├─edit-password # 具体页面
    │      └─modify-info # 具体页面
    └─public-resource # 各个页面使用到的公共资源
        ├─components # 组件，可以是纯HTML，也可以包含js/css/image等，看自己需要
        │  ├─footer # 页尾
        │  ├─header # 页头
        │  ├─side-menu # 侧边栏
        │  └─top-nav # 顶部菜单
        ├─config # 各种配置文件
        ├─iconfont # iconfont的字体文件
        ├─imgs # 公用的图片资源
        ├─layout # UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路
        │  ├─layout # 具体的布局套路
        │  └─layout-without-nav # 具体的布局套路
        ├─less # less文件，用sass的也可以，又或者是纯css
        │  ├─base-dir
        │  ├─components-dir # 如果组件本身不需要js的，那么要加载组件的css比较困难，我建议可以直接用less来加载
        │  └─base.less # 组织所有的less文件
        ├─libs # 与业务逻辑无关的库都可以放到这里
        └─logic # 业务逻辑" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">├─src <span class="hljs-comment"># 当前项目的源码</span>
    ├─pages <span class="hljs-comment"># 各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等</span>
    │  ├─alert <span class="hljs-comment"># 业务模块</span>
    │  │  └─index <span class="hljs-comment"># 具体页面</span>
    │  ├─index <span class="hljs-comment"># 业务模块</span>
    │  │  ├─index <span class="hljs-comment"># 具体页面</span>
    │  │  └─login <span class="hljs-comment"># 具体页面</span>
    │  │      └─templates <span class="hljs-comment"># 如果一个页面的HTML比较复杂，可以分成多块再拼在一起</span>
    │  └─user <span class="hljs-comment"># 业务模块</span>
    │      ├─edit-password <span class="hljs-comment"># 具体页面</span>
    │      └─modify-info <span class="hljs-comment"># 具体页面</span>
    └─public-resource <span class="hljs-comment"># 各个页面使用到的公共资源</span>
        ├─components <span class="hljs-comment"># 组件，可以是纯HTML，也可以包含js/css/image等，看自己需要</span>
        │  ├─footer <span class="hljs-comment"># 页尾</span>
        │  ├─header <span class="hljs-comment"># 页头</span>
        │  ├─side-menu <span class="hljs-comment"># 侧边栏</span>
        │  └─top-nav <span class="hljs-comment"># 顶部菜单</span>
        ├─config <span class="hljs-comment"># 各种配置文件</span>
        ├─iconfont <span class="hljs-comment"># iconfont的字体文件</span>
        ├─imgs <span class="hljs-comment"># 公用的图片资源</span>
        ├─layout <span class="hljs-comment"># UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路</span>
        │  ├─layout <span class="hljs-comment"># 具体的布局套路</span>
        │  └─layout-without-nav <span class="hljs-comment"># 具体的布局套路</span>
        ├─less <span class="hljs-comment"># less文件，用sass的也可以，又或者是纯css</span>
        │  ├─base-dir
        │  ├─components-dir <span class="hljs-comment"># 如果组件本身不需要js的，那么要加载组件的css比较困难，我建议可以直接用less来加载</span>
        │  └─base.less <span class="hljs-comment"># 组织所有的less文件</span>
        ├─libs <span class="hljs-comment"># 与业务逻辑无关的库都可以放到这里</span>
        └─logic <span class="hljs-comment"># 业务逻辑</span></code></pre>
<h3 id="articleHeader8">基础代码段</h3>
<p>基础的CSS代码（实际上我的项目中用的都是less）我统一都放到<code>src/public-resource/less</code>目录里。我使用一个抽象的文件<code>base.less</code>将所有的less文件组织起来（利用<code>@import</code>），这样的话我用js加载起来就方便多了。</p>
<p>在我的脚手架项目（<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>）里，CSS框架我用的是bootstrap，并且使用了bootstrap-loader进行加载，因此就没有把bootstrap的CSS文件放到<code>src/public-resource/less/base-dir</code>目录里，这个目录里放的都是我定制的theme了。</p>
<p><code>src/public-resource/less/components-dir</code>目录放的是某些第三方组件所用到的css，又或是不含js的组件所用到的css。其实这部分CSS是否应该归在下一类，我也考虑良久，只是由于归到下一类的话加载起来不方便，不方便原因如下：</p>
<ul>
<li>某些第三方库是要你自己加载CSS的，如果你打算写适配器来封装这些第三方库，那自然可以直接在适配器来加载CSS，这就属于下一类了；然而，有一些使用起来很简单的库，你还写适配器那就有点画蛇添足了。</li>
<li>某些自己写的组件可能仅包含HTML和CSS，那么谁来加载CSS？</li>
</ul>
<p>所以干脆还是交由<code>base.less</code>一并加载了算了。</p>
<p>我设计了一个<code>common.page.js</code>，并在每一个页面的入口文件里都首先加载这<code>common.page.js</code>，那么，只要我在这<code>common.page.js</code>里加载<code>base.less</code>，所有的页面都能享受到这份基础CSS代码段。</p>
<h3 id="articleHeader9">组件代码段</h3>
<p>组件的代码我都放在了<code>src/public-resource/components</code>，每一个组件统一放在一个独立的目录，并由该组件的js负责加载其CSS。</p>
<h3 id="articleHeader10">页面代码段</h3>
<p>页面独有的CSS我自然是放在该页面自己的目录里，利用该页面的入口文件进行加载。</p>
<h3 id="articleHeader11">最终生成的CSS代码都在哪？</h3>
<p>由于我使用了ExtractTextPlugin，因此这些CSS代码最终都会生成到所属chunk的目录里成为一个CSS文件。</p>
<ul>
<li>基础代码段肯定是保存在CommonsChunkPlugin所生成的公共代码chunk所在的目录里了，在我的脚手架项目（<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed</a>）里就是<code>build/commons</code>了（我的公共代码chunk的name是'commons'）。</li>
<li>组件代码段看情况，该组件用的页面多的话（大于CommonsChunkPlugin的minChunks参数）就会被归到跟基础代码段一起咯；反之，则哪个页面用到它，就放到哪个页面chunk的目录里咯。</li>
<li>页面代码段就不用想了，肯定是在那个页面chunk的目录里了，毕竟才用了1次。</li>
</ul>
<h2 id="articleHeader12">示例代码</h2>
<p>诸位看本系列文章，搭配我在Github上的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed(<code>https://github.com/Array-Huang/webpack-seed</code>)</a>。</p>
<h2 id="articleHeader13">附系列文章目录（同步更新）</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000006843916">webpack多页应用架构系列（一）：一步一步解决架构痛点：<code>https://segmentfault.com/a/1190000006843916</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006863968" target="_blank">webpack多页应用架构系列（二）：webpack配置常用部分有哪些？:<code>https://segmentfault.com/a/1190000006863968</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006871991">webpack多页应用架构系列（三）：怎么打包公共代码才能避免重复？：<code>https://segmentfault.com/a/1190000006871991</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006887523" target="_blank">webpack多页应用架构系列（四）：老式jQuery插件还不能丢，怎么兼容？:<code>https://segmentfault.com/a/1190000006887523</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006897458">webpack多页应用架构系列（五）：听说webpack连less/css也能打包？:<code>https://segmentfault.com/a/1190000006897458</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006907701" target="_blank">webpack多页应用架构系列（六）：听说webpack连图片和字体也能打包？:<code>https://segmentfault.com/a/1190000006907701</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006952432">webpack多页应用架构系列（七）：开发环境、生产环境傻傻分不清楚？:<code>https://segmentfault.com/a/1190000006952432</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006992218" target="_blank">webpack多页应用架构系列（八）：教练我要写ES6！webpack怎么整合Babel？:<code>https://segmentfault.com/a/1190000006992218</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007030775">webpack多页应用架构系列（九）：总有刁民想害朕！ESLint为你阻击垃圾代码:<code>https://segmentfault.com/a/1190000007030775</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007043716" target="_blank">webpack多页应用架构系列（十）：如何打造一个自定义的bootstrap:<code>https://segmentfault.com/a/1190000007043716</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007104372">webpack多页应用架构系列（十一）：预打包Dll，实现webpack音速编译:<code>https://segmentfault.com/a/1190000007104372</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007126268" target="_blank">webpack多页应用架构系列（十二）：利用webpack生成HTML普通网页&amp;页面模板:<code>https://segmentfault.com/a/1190000007126268</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007159115">webpack多页应用架构系列（十三）：构建一个简单的模板布局系统:<code>https://segmentfault.com/a/1190000007159115</code></a></li>
<li><a href="https://segmentfault.com/a/1190000007301770" target="_blank">webpack多页应用架构系列（十四）：No复制粘贴！多项目共用基础设施</a></li>
<li><a href="https://segmentfault.com/a/1190000008203380">webpack多页应用架构系列（十五）：论前端如何在后端渲染开发模式下夹缝生存</a></li>
<li><a href="https://segmentfault.com/a/1190000010317802" target="_blank">webpack多页应用架构系列（十六）：善用浏览器缓存，该去则去，该留则留</a></li>
</ul>
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<code>https://segmentfault.com/a/1190000006897458</code><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（五）：听说webpack连less/css也能打包？

## 原文链接
[https://segmentfault.com/a/1190000006897458](https://segmentfault.com/a/1190000006897458)

