---
title: 'webpack多页应用架构系列（二）：webpack配置常用部分有哪些？' 
date: 2019-02-04 2:30:58
hidden: true
slug: bibt4ga5zw
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000006863968"><code>https://segmentfault.com/a/1190000006863968</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>webpack的配置文件是一个node.js的module，用CommonJS风格来书写，形如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: &quot;./entry&quot;,
    output: {
        path: __dirname + &quot;/dist&quot;,
        filename: &quot;bundle.js&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: <span class="hljs-string">"./entry"</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: __dirname + <span class="hljs-string">"/dist"</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">"bundle.js"</span>
    }
}</code></pre>
<p>webpack的配置文件并没有固定的命名，也没有固定的路径要求，如果你直接用<code>webpack</code>来执行编译，那么webpack默认读取的将是当前目录下的<code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ pwd
/d/xampp/htdocs/webpack-seed
$ webpack # webpack此时读取的实际上是/d/xampp/htdocs/webpack-seed/webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ <span class="hljs-built_in">pwd</span>
/d/xampp/htdocs/webpack-seed
$ webpack <span class="hljs-comment"># webpack此时读取的实际上是/d/xampp/htdocs/webpack-seed/webpack.config.js</span></code></pre>
<p>如果你有其它命名的需要或是你有多份配置文件，可以使用<code>--config</code>参数传入路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack --config ./webpackConfig/dev.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ webpack --config ./webpackConfig/dev.config.js</code></pre>
<p>另外，在CLI执行<code>webpack</code>指令时可传入的参数（当然除了<code>--config</code>）实际上都可以在配置文件里面直接声明，我强烈建议可以的话尽量都在配置文件里写好，有需要的话写两份配置也好三份也好（反正配置文件间也是可以互相引用的，相同的部分就拆成一个module出来以供读取，最后拼成各种情况下需要的配置就好了）。</p>
<h2 id="articleHeader1">入口文件配置：entry参数</h2>
<p>entry可以是字符串（单入口），可以是数组（多入口），但为了后续发展，请务必使用object，因为object中的key在webpack里相当于此入口的name，既可以后续用来拼生成文件的路径，也可以用来作为此入口的唯一标识。<br>我推荐的形式是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: { // pagesDir是前面准备好的入口文件集合目录的路径
  'alert/index': path.resolve(pagesDir, `./alert/index/page`), 
  'index/login': path.resolve(pagesDir, `./index/login/page`), 
  'index/index': path.resolve(pagesDir, `./index/index/page`),
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">entry: { <span class="hljs-comment">// pagesDir是前面准备好的入口文件集合目录的路径</span>
  <span class="hljs-string">'alert/index'</span>: path.resolve(pagesDir, <span class="hljs-string">`./alert/index/page`</span>), 
  <span class="hljs-string">'index/login'</span>: path.resolve(pagesDir, <span class="hljs-string">`./index/login/page`</span>), 
  <span class="hljs-string">'index/index'</span>: path.resolve(pagesDir, <span class="hljs-string">`./index/index/page`</span>),
},</code></pre>
<p>对照我的脚手架项目<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank"><code>webpack-seed</code></a>的文件目录结构，就很清楚了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─src # 当前项目的源码
    ├─pages # 各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等
    │  ├─alert # 业务模块
    │  │  └─index # 具体页面
    │  ├─index # 业务模块
    │  │  ├─index # 具体页面
    │  │  └─login # 具体页面" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">├─src <span class="hljs-comment"># 当前项目的源码</span>
    ├─pages <span class="hljs-comment"># 各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等</span>
    │  ├─alert <span class="hljs-comment"># 业务模块</span>
    │  │  └─index <span class="hljs-comment"># 具体页面</span>
    │  ├─index <span class="hljs-comment"># 业务模块</span>
    │  │  ├─index <span class="hljs-comment"># 具体页面</span>
    │  │  └─login <span class="hljs-comment"># 具体页面</span></code></pre>
<p>由于每一个入口文件都相当于entry里的一项，因此这样一项一项地来写实在是有点繁琐，我就稍微写了点代码来拼接这entry：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var pageArr = [
    'index/login',
    'index/index',
    'alert/index',
  ];
  var configEntry = {};
  pageArr.forEach((page) => {
    configEntry[page] = path.resolve(pagesDir, page + '/page');
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">var</span> pageArr = [
    <span class="hljs-string">'index/login'</span>,
    <span class="hljs-string">'index/index'</span>,
    <span class="hljs-string">'alert/index'</span>,
  ];
  <span class="hljs-keyword">var</span> configEntry = {};
  pageArr.forEach(<span class="hljs-function">(<span class="hljs-params">page</span>) =&gt;</span> {
    configEntry[page] = path.resolve(pagesDir, page + <span class="hljs-string">'/page'</span>);
  });</code></pre>
<h2 id="articleHeader2">输出文件：output参数</h2>
<p>output参数告诉webpack以什么方式来生成/输出文件，值得注意的是，与entry不同，output相当于一套规则，所有的入口都必须使用这一套规则，不能针对某一个特定的入口来制定output规则。output参数里有这几个子参数是比较常用的：path、publicPath、filename、chunkFilename，这里先给个<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank"><code>webpack-seed</code></a>中的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    output: {
      path: buildDir, // var buildDir = path.resolve(__dirname, './build');
      publicPath: '../../../../build/',
      filename: '[name]/entry.js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
      chunkFilename: '[id].bundle.js',
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    output: {
      <span class="hljs-attr">path</span>: buildDir, <span class="hljs-comment">// var buildDir = path.resolve(__dirname, './build');</span>
      publicPath: <span class="hljs-string">'../../../../build/'</span>,
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name]/entry.js'</span>,    <span class="hljs-comment">// [name]表示entry每一项中的key，用以批量指定生成后文件的名称</span>
      chunkFilename: <span class="hljs-string">'[id].bundle.js'</span>,
    },</code></pre>
<h3 id="articleHeader3">path</h3>
<p>path参数表示生成文件的根目录，需要传入一个<strong>绝对路径</strong>。path参数和后面的filename参数共同组成入口文件的完整路径。</p>
<h3 id="articleHeader4">publicPath</h3>
<p>publicPath参数表示的是一个URL路径（指向生成文件的根目录），用于生成css/js/图片/字体文件等资源的路径，以确保网页能正确地加载到这些资源。<br>publicPath参数跟path参数的区别是：path参数其实是针对本地文件系统的，而publicPath则针对的是浏览器；因此，publicPath既可以是一个相对路径，如示例中的<code>'../../../../build/'</code>，也可以是一个绝对路径如<code>http://www.xxxxx.com/</code>。一般来说，我还是更推荐相对路径的写法，这样的话整体迁移起来非常方便。那什么时候用绝对路径呢？其实也很简单，当你的html文件跟其它资源放在不同的域名下的时候，就应该用绝对路径了，这种情况非常多见于后端渲染模板的场景。</p>
<h3 id="articleHeader5">filename</h3>
<p>filename属性表示的是如何命名生成出来的入口文件，规则有以下三种：</p>
<ul>
<li>[name]，指代入口文件的name，也就是上面提到的entry参数的key，因此，我们可以在name里利用<code>/</code>，即可达到控制文件目录结构的效果。</li>
<li>[hash]，指代本次编译的一个hash版本，值得注意的是，只要是在同一次编译过程中生成的文件，这个[hash]的值就是一样的；在缓存的层面来说，相当于一次全量的替换。</li>
<li>[chunkhash]，指代的是当前chunk的一个hash版本，也就是说，在同一次编译中，每一个chunk的hash都是不一样的；而在两次编译中，如果某个chunk根本没有发生变化，那么该chunk的hash也就不会发生变化。这在缓存的层面上来说，就是把缓存的粒度精细到具体某个chunk，只要chunk不变，该chunk的浏览器缓存就可以继续使用。</li>
</ul>
<p>下面来说说如何利用filename参数和path参数来设计入口文件的目录结构，如示例中的<code>path: buildDir, // var buildDir = path.resolve(__dirname, './build');</code>和<code>filename: '[name]/entry.js'</code>，那么对于key为'index/login'的入口文件，生成出来的路径就是<code>build/index/login/entry.js</code>了，怎么样，是不是很简单呢？</p>
<h3 id="articleHeader6">chunkFilename</h3>
<p>chunkFilename参数与filename参数类似，都是用来定义生成文件的命名方式的，只不过，chunkFilename参数指定的是除入口文件外的chunk（这些chunk通常是由于webpack对代码的优化所形成的，比如因应实际运行的情况来异步加载）的命名。</p>
<h2 id="articleHeader7">各种Loader配置：module参数</h2>
<p>webpack的核心实际上也只能针对js进行打包，那webpack一直号称能够打包任何资源是怎么一回事呢？原来，webpack拥有一个类似于插件的机制，名为<code>Loader</code>，通过Loader，webpack能够针对每一种特定的资源做出相应的处理。Loader的种类相当多，有些比较基础的是官方自己开发，而其它则是由webpack社区开源贡献出来的，这里是Loader的List：<a href="http://webpack.github.io/docs/list-of-loaders.html" rel="nofollow noreferrer" target="_blank">list of loaders</a>。<br>而module正是配置什么资源使用哪个Loader的参数（因为就算是同一种资源，也可能有不同的Loader可以使用，当然不同Loader处理的手段不一样，最后结果也自然就不一样了）。module参数有几个子参数，但是最常用的自然还是<code>loaders</code>子参数，这里也仅对loaders子参数进行介绍。</p>
<h3 id="articleHeader8">loaders参数</h3>
<p>loaders参数又有几个子参数，先给出一个官方示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.loaders: [
  {
    // &quot;test&quot; is commonly used to match the file extension
    test: /\.jsx$/,

    // &quot;include&quot; is commonly used to match the directories
    include: [
      path.resolve(__dirname, &quot;app/src&quot;),
      path.resolve(__dirname, &quot;app/test&quot;)
    ],

    // &quot;exclude&quot; should be used to exclude exceptions
    // try to prefer &quot;include&quot; when possible

    // the &quot;loader&quot;
    loader: &quot;babel-loader&quot;
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.loaders: [
  {
    <span class="hljs-comment">// "test" is commonly used to match the file extension</span>
    test: <span class="hljs-regexp">/\.jsx$/</span>,

    <span class="hljs-comment">// "include" is commonly used to match the directories</span>
    include: [
      path.resolve(__dirname, <span class="hljs-string">"app/src"</span>),
      path.resolve(__dirname, <span class="hljs-string">"app/test"</span>)
    ],

    <span class="hljs-comment">// "exclude" should be used to exclude exceptions</span>
    <span class="hljs-comment">// try to prefer "include" when possible</span>

    <span class="hljs-comment">// the "loader"</span>
    loader: <span class="hljs-string">"babel-loader"</span>
  }
]</code></pre>
<p>下面一一对这些子参数进行说明：</p>
<ul>
<li>
<code>test</code>参数用来指示当前配置项针对哪些资源，该值应是一个条件值(condition)。</li>
<li>
<code>exclude</code>参数用来剔除掉需要忽略的资源，该值应是一个条件值(condition)。</li>
<li>
<code>include</code>参数用来表示本loader配置仅针对哪些目录/文件，该值应是一个条件值(condition)。这个参数跟<code>test</code>参数的效果是一样的（官方文档也是这么写的），我也不明白为嘛有俩同样规则的参数，不过我们姑且可以自己来划分这两者的用途：<code>test</code>参数用来指示文件名（包括文件后缀），而<code>include</code>参数则用来指示目录；注意同时使用这两者的时候，实际上是<code>and</code>的关系。</li>
<li>
<code>loader</code>/<code>loaders</code>参数，用来指示用哪个/哪些loader来处理目标资源，这俩货表达的其实是一个意思，只是写法不一样，我个人推荐用<code>loader</code>写成一行，多个loader间使用<code>!</code>分割，这种形式类似于<code>管道</code>的概念，又或者说是<code>函数式编程</code>。形如<code>loader: 'css?!postcss!less'</code>，可以很明显地看出，目标资源先经less-loader处理过后将结果交给postcss-loader作进一步处理，然后最后再交给css-loader。</li>
</ul>
<p>条件值(condition)可以是一个字符串（某个资源的文件系统绝对路径），可以是一个函数（官方文档里是有这么写，但既没有示例也没有说明，我也是醉了），可以是一个正则表达式（用来匹配资源的路径，最常用，强烈推荐！），最后，还可以是一个数组，数组的元素可以为上述三种类型，元素之间为与关系（既必须同时满足数组里的所有条件）。需要注意的是，loader是可以接受参数的，方式类似于URL参数，形如'css?minimize&amp;-autoprefixer'，具体每个loader接受什么参数请参考loader本身的文档（一般也就只能在github里看了）。</p>
<h2 id="articleHeader9">添加额外功能：plugins参数</h2>
<p>这plugins参数相当于一个插槽位（类型是数组），你可以先按某个plugin要求的方式初始化好了以后，把初始化后的实例丢到这里来。</p>
<h2 id="articleHeader10">示例代码</h2>
<p>诸位看本系列文章，搭配我在Github上的脚手架项目食用更佳哦（笑）：<a href="https://github.com/Array-Huang/webpack-seed" rel="nofollow noreferrer" target="_blank">Array-Huang/webpack-seed(<code>https://github.com/Array-Huang/webpack-seed</code>)</a>。<br>本文提到的所有内容，都可以在示例代码根目录下的<code>webpack.config.js</code>里找到对应的内容（不过可能稍微有点复杂呢，毕竟是一个可以投入生产环境的架构了，不过看过我后续的文章，就会觉得很简单的啦哈哈哈哈）。</p>
<h2 id="articleHeader11">附系列文章目录（同步更新）</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000006843916">webpack多页应用架构系列（一）：一步一步解决架构痛点：<code>https://segmentfault.com/a/1190000006843916</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006863968" target="_blank">webpack多页应用架构系列（二）：webpack配置常用部分有哪些？:<code>https://segmentfault.com/a/1190000006863968</code></a></li>
<li><a href="https://segmentfault.com/a/1190000006871991">webpack多页应用架构系列（三）：怎么打包公共代码才能避免重复？:<code>https://segmentfault.com/a/1190000006871991</code></a></li>
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
<blockquote>本文首发于<em>Array_Huang</em>的技术博客——<code>实用至上</code>，非经作者同意，请勿转载。<br>原文地址：<a href="https://segmentfault.com/a/1190000006863968"><code>https://segmentfault.com/a/1190000006863968</code></a><br>如果您对本系列文章感兴趣，欢迎关注订阅这里：<a href="https://segmentfault.com/blog/array_huang" target="_blank"><code>https://segmentfault.com/blog/array_huang</code></a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack多页应用架构系列（二）：webpack配置常用部分有哪些？

## 原文链接
[https://segmentfault.com/a/1190000006863968](https://segmentfault.com/a/1190000006863968)

