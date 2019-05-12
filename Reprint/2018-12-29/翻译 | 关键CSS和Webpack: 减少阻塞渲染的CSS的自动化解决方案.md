---
title: '翻译 | 关键CSS和Webpack: 减少阻塞渲染的CSS的自动化解决方案' 
date: 2018-12-29 2:30:10
hidden: true
slug: im7jng0liim
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000011503289?w=600&amp;h=321" src="https://static.alili.tech/img/remote/1460000011503289?w=600&amp;h=321" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>原文地址: <a href="https://vuejsdevelopers.com/2017/07/24/critical-css-webpack" rel="nofollow noreferrer" target="_blank">Critical CSS and Webpack: Automatically Minimize Render-Blocking CSS</a>
</li>
<li>原文作者: Anthony Gore</li>
<li>译者: 蜗牛(GivenCui)</li>
<li>校对者: veizz</li>
</ul>
<hr>
<p>"消除阻塞渲染的CSS和JavaScript"。 这一条Google Page Speed Insights的建议总让我困惑。  </p>
<p>当一个网页被访问时，Google希望它仅加载对初始视图有用的内容，并使用空闲时间来加载其他内容。这种方式可以使用户尽可能早地看到页面。    </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011503290?w=560&amp;h=206" src="https://static.alili.tech/img/remote/1460000011503290?w=560&amp;h=206" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以做很多事情来减少阻塞渲染的JavaScript，例如code splitting、tree shaking，缓存等。  </p>
<p>但是如何减少阻塞渲染的CSS？为此，可以拆分并优先加载首次渲染所需要的CSS（关键CSS)，然后再加载其它CSS。  </p>
<p>可以通过编程的方式筛选出关键CSS，在本文中，我将向你展示如何通过Webpack的自动化流程来实现该方案。</p>
<h2 id="articleHeader0">什么是阻塞渲染</h2>
<p>如果资源是“阻塞渲染”的，则表示浏览器在资源下载或处理完成之前不会显示该页面。  </p>
<p>通常，我们在html的<code>head</code>标签中添加CSS样式表，这种方式会阻塞渲染，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
  <link rel=&quot;stylesheet&quot; href=&quot;/style.css&quot;>
  ...
</head>
<body>
  <p>在style.css下载完之前，你看不到我！！！</p>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/style.css"</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>在style.css下载完之前，你看不到我！！！<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>当这个html页面被网络浏览器加载时，它将从上到下被逐行解析。当浏览器解析到<code>link</code>标签时，它将立即开始下载CSS样式表，在完成之前不会渲染页面。  </p>
<p>对于一个大型网站，尤其是像使用了Bootstrap这种庞大框架的网站，样式表有几百KB，用户必须耐心等待其完全下载完才能看到页面。  </p>
<p>那么，我们是否应该把link标签放到<code>body</code>中，以防止阻塞渲染？你可以这么做，但是阻塞渲染也不是全无优点，我们实际上可以利用它。如果页面渲染时没有加载任何CSS，我们会遇到丑陋的"内容闪现"。  </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011503291?w=1860&amp;h=1359" src="https://static.alili.tech/img/remote/1460000011503291?w=1860&amp;h=1359" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>我们想要的完美解决方案就应该是：首屏相关的关键CSS使用阻塞渲染的方式加载，所有的非关键CSS在首屏渲染完成后加载。</p>
<h2 id="articleHeader1">关键CSS</h2>
<p>这里是我用Webpack和Bootstrap编写的一个简单的网页, 下面的截图是首次渲染后的样式。  </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011503292?w=1860&amp;h=1359" src="https://static.alili.tech/img/remote/1460000011503292?w=1860&amp;h=1359" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>点击Sign Up today按钮会弹出一个模态框, 模态框弹出时的样式如下:  </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011503293?w=1860&amp;h=1359" src="https://static.alili.tech/img/remote/1460000011503293?w=1860&amp;h=1359" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>首次渲染需要的样式包括导航条的样式、超大屏幕样式、按钮样式、其它布局和字体的公用样式。但是我们并不需要模态框的样式，因为它不会立即在页面中显示。考虑到这些，下面是我们拆分关键CSS和非关键CSS的可能的方式：  </p>
<p><em>critical.css</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".nav {
  ...
}

.jumbtron {
  ...
}

.btn {
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.nav</span> {
  ...
}

<span class="hljs-selector-class">.jumbtron</span> {
  ...
}

<span class="hljs-selector-class">.btn</span> {
  ...
}</code></pre>
<p><em>non_critical.css</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".modal {
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.modal</span> {
  ...
}</code></pre>
<p>如果你已经有这个概念，那么你可能会提出两个疑问：</p>
<ol>
<li>我们如何用程序区分关键CSS和非关键CSS?</li>
<li>如何让页面在首次渲染之前加载关键CSS，之后加载非关键CSS？</li>
</ol>
<h2 id="articleHeader2">示例项目</h2>
<p>我将简要介绍一下这个项目的基本配置，这样我们在遇到解决方案时，方便快速消化。  <br>首先, 在入口文件中引入Bootsrap SASS。</p>
<p><em>main.js</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;bootstrap-sass/assets/stylesheets/_bootstrap.scss&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">require(<span class="hljs-string">"bootstrap-sass/assets/stylesheets/_bootstrap.scss"</span>)<span class="hljs-comment">;</span></code></pre>
<p>我使用<em>sass-loader</em>来处理sass，与<em>Extract Text Plugin</em>一起使用，将编译出来的css放到单独的文件中。</p>
<p>使用<em>HTML Webpack Plugin</em>来创建一个HTML文件，它引入编译后的CSS。这在我们的解决方案中是必需的，你马上就会看到。  </p>
<p><em>webpack.config.js</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      ...
    ]
  },
  ...
  plugins: [
    new ExtractTextPlugin({ filename: 'style.css' }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ] 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code>module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: <span class="hljs-type">ExtractTextPlugin</span>.extract({
          fallback: <span class="hljs-symbol">'style</span>-loader',
          use: [<span class="hljs-symbol">'css</span>-loader', <span class="hljs-symbol">'sass</span>-loader']
        })
      },
      ...
    ]
  },
  ...
  plugins: [
    new <span class="hljs-type">ExtractTextPlugin</span>({ filename: <span class="hljs-symbol">'style</span>.css' }),
    new <span class="hljs-type">HtmlWebpackPlugin</span>({
      filename: <span class="hljs-symbol">'index</span>.html',
      template: <span class="hljs-symbol">'index</span>.html',
      inject: <span class="hljs-literal">true</span>
    })
  ] 
};</code></pre>
<p>运行构建之后，这里是HTML文件的样子。请注意，CSS文件在<code>head</code>标签里引入，因此将会阻塞渲染。</p>
<p><em>index.html</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;utf-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1&quot;>
    <title>vuestrap-code-split</title>
    <link href=&quot;/style.css&quot; rel=&quot;stylesheet&quot;>
</head>
<body>
  <!--App content goes here, omitted for brevity.-->
  <script type=&quot;text/javascript&quot; src=&quot;/build_main.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vuestrap-code-split<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/style.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-comment">&lt;!--App content goes here, omitted for brevity.--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/build_main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader3">编程识别关键CSS</h2>
<p>手动区分关键CSS维护起来会非常痛苦。以编程方式来实现的话，我们可以使用Addy Osmani的<a href="https://github.com/addyosmani/critical" rel="nofollow noreferrer" target="_blank">Critical</a>。这是一个Node.js模块，它将读入HTML文档，并识别关键CSS。Critical能做的还不止这些，你很快就能体会到。</p>
<p>Critical识别关键CSS的方式如下：指定屏幕尺寸并使用PhantomJS加载页面，提取在渲染页面中用到的所有CSS规则。</p>
<p>以下为对项目的设置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const critical = require(&quot;critical&quot;);

critical.generate({
  
  /* Webpack打包输出的路径 */
  base: path.join(path.resolve(__dirname), 'dist/'),
  src: 'index.html',
  dest: 'index.html',
  inline: true,
  extract: true,

  /* iPhone6的尺寸，你可以按需要修改 */
  width: 375,
  height: 565,
  
  /* 确保调用打包后的JS文件 */
  penthouse: {
    blockJSRequests: false,
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">critical</span> <span class="hljs-string">=</span> <span class="hljs-string">require("critical");</span>

<span class="hljs-string">critical.generate({</span>
  
  <span class="hljs-string">/*</span> <span class="hljs-string">Webpack打包输出的路径</span> <span class="hljs-string">*/</span>
<span class="hljs-attr">  base:</span> <span class="hljs-string">path.join(path.resolve(__dirname),</span> <span class="hljs-string">'dist/'</span><span class="hljs-string">),</span>
<span class="hljs-attr">  src:</span> <span class="hljs-string">'index.html'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  dest:</span> <span class="hljs-string">'index.html'</span><span class="hljs-string">,</span>
<span class="hljs-attr">  inline:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  extract:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>

  <span class="hljs-string">/*</span> <span class="hljs-string">iPhone6的尺寸，你可以按需要修改</span> <span class="hljs-string">*/</span>
<span class="hljs-attr">  width:</span> <span class="hljs-number">375</span><span class="hljs-string">,</span>
<span class="hljs-attr">  height:</span> <span class="hljs-number">565</span><span class="hljs-string">,</span>
  
  <span class="hljs-string">/*</span> <span class="hljs-string">确保调用打包后的JS文件</span> <span class="hljs-string">*/</span>
<span class="hljs-attr">  penthouse:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    blockJSRequests:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">});</span></code></pre>
<p>执行时，会将Webpack打包输出文件中HTML更新为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;utf-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1&quot;>
  <title>Bootstrap Critical</title>
  <style type=&quot;text/css&quot;>
    /* 关键CSS通过内部样式表方式引入 */
    body {
      font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
      font-size: 14px;
      line-height: 1.42857;
      color: #333;
      background-color: #fff;
    }
    ...
  </style>
  <link href=&quot;/style.96106fab.css&quot; rel=&quot;preload&quot; as=&quot;style&quot; onload=&quot;this.rel='stylesheet'&quot;>
  <noscript>
      <link href=&quot;/style.96106fab.css&quot; rel=&quot;stylesheet&quot;>
  </noscript>
  <script>
    /*用来加载非关键CSS的脚本*/
  </script>
</head>
<body>
  <!-- 这里是App的内容 -->
  <script type=&quot;text/javascript&quot; src=&quot;/build_main.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Bootstrap Critical<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
    <span class="hljs-comment">/* 关键CSS通过内部样式表方式引入 */</span>
    <span class="hljs-selector-tag">body</span> {
      <span class="hljs-attribute">font-family</span>: Helvetica Neue,Helvetica,Arial,sans-serif;
      <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
      <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.42857</span>;
      <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
      <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
    }
    ...
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/style.96106fab.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"preload"</span> <span class="hljs-attr">as</span>=<span class="hljs-string">"style"</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"this.rel='stylesheet'"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">noscript</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/style.96106fab.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">noscript</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-comment">/*用来加载非关键CSS的脚本*/</span>
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 这里是App的内容 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/build_main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>它还将输出一个新的CSS文件，例如<em>style.96106fab.css</em>（文件自动Hash命名）。这个CSS文件与原始样式表相同，只是不包含关键CSS。</p>
<h2 id="articleHeader4">内联嵌入关键CSS样式</h2>
<p>你会注意到，关键CSS已经嵌入到文档的头部。这是最佳的，因为页面不必从服务器加载它。</p>
<h2 id="articleHeader5">预加载非关键CSS</h2>
<p>你还会注意到，非关键CSS使用了一个看起来更复杂的<code>link</code>标签来加载。<code>rel="preload"</code>通知浏览器开始获取非关键CSS以供之后用。其关键在于，<code>preload</code>不阻塞渲染，无论资源是否加载完成，浏览器都会接着绘制页面。</p>
<p><code>link</code>标签中的<code>onload</code>属性允许我们在非关键CSS加载完成时运行脚本。<em>Critical</em>模块可以自动将此脚本嵌入到文档中，这种方式提供了将非关键CSS加载到页面中的跨浏览器兼容方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link href=&quot;/style.96106fab.css&quot; rel=&quot;preload&quot; as=&quot;style&quot; onload=&quot;this.rel='stylesheet'&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">&lt;link href=<span class="hljs-string">"/style.96106fab.css"</span> <span class="hljs-built_in">rel</span>=<span class="hljs-string">"preload"</span> <span class="hljs-keyword">as</span>=<span class="hljs-string">"style"</span> onload=<span class="hljs-string">"this.rel='stylesheet'"</span>&gt;</code></pre>
<h2 id="articleHeader6">把Critical组件添加到webpack打包流程中</h2>
<p>我创建了一个名为<a href="https://github.com/anthonygore/html-critical-webpack-plugin" rel="nofollow noreferrer" target="_blank">HTML Critical Webpack Plugin</a>的插件，该插件仅仅是<em>Critical</em>模块的封装。它将在<em>HTML Webpack Plugin</em>输出文件后运行。</p>
<p>你可以在Webpack的项目中这样引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HtmlCriticalPlugin = require(&quot;html-critical-webpack-plugin&quot;);

module.export = {
  ...
  plugins: [
    new HtmlWebpackPlugin({ ... }),
    new ExtractTextPlugin({ ... }),
    new HtmlCriticalPlugin({
      base: path.join(path.resolve(__dirname), 'dist/'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      }
    })
  ] 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">HtmlCriticalPlugin</span> <span class="hljs-string">=</span> <span class="hljs-string">require("html-critical-webpack-plugin");</span>

<span class="hljs-string">module.export</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
  <span class="hljs-string">...</span>
<span class="hljs-attr">  plugins:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">new</span> <span class="hljs-string">HtmlWebpackPlugin({</span> <span class="hljs-string">...</span> <span class="hljs-string">}),</span>
    <span class="hljs-string">new</span> <span class="hljs-string">ExtractTextPlugin({</span> <span class="hljs-string">...</span> <span class="hljs-string">}),</span>
    <span class="hljs-string">new</span> <span class="hljs-string">HtmlCriticalPlugin({</span>
<span class="hljs-attr">      base:</span> <span class="hljs-string">path.join(path.resolve(__dirname),</span> <span class="hljs-string">'dist/'</span><span class="hljs-string">),</span>
<span class="hljs-attr">      src:</span> <span class="hljs-string">'index.html'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      dest:</span> <span class="hljs-string">'index.html'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      inline:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">      minify:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">      extract:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">      width:</span> <span class="hljs-number">375</span><span class="hljs-string">,</span>
<span class="hljs-attr">      height:</span> <span class="hljs-number">565</span><span class="hljs-string">,</span>
<span class="hljs-attr">      penthouse:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        blockJSRequests:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">})</span>
  <span class="hljs-string">]</span> 
<span class="hljs-string">};</span></code></pre>
<blockquote><p>注意：你应该只在生产版本中使用，因为它将使你的开发环境的构建很慢</p></blockquote>
<h2 id="articleHeader7">表现结果</h2>
<p>现在已经抽离了关键CSS，并且把非关键CSS的加载放到空闲时间，这在性能方面会有怎样的提升呢?</p>
<p>我使用Chrome的Lighthouse扩展插件进行测试。请记住，我们尝试优化的指标是<a href="https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint" rel="nofollow noreferrer" target="_blank">“首次有效绘制”</a>，也就是用户需要多久才能看到真正可浏览的页面。</p>
<p><strong>不使用区分关键CSS技术的表现</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011503294?w=1589&amp;h=803" src="https://static.alili.tech/img/remote/1460000011503294?w=1589&amp;h=803" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>使用区分关键CSS技术的表现</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011503295?w=1586&amp;h=800" src="https://static.alili.tech/img/remote/1460000011503295?w=1586&amp;h=800" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>正如你所看到的，我的应用程序First Meaningful paint时间缩短了将近1秒，到达可交互状态的时间节省了0.5秒。实际中，你的应用程序可能无法获得如此惊人的改善，因为我的CSS很笨重（我包含了整个Bootstrap库），而且在这样一个简单的应用程序中，我没有很多关键CSS规则。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010887896" src="https://static.alili.tech/img/remote/1460000010887896" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010953661" src="https://static.alili.tech/img/remote/1460000010953661" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>
<p>iKcamp原创新书《移动Web前端高效开发实战》已在亚马逊、京东、当当开售。</p>
<p>iKcamp官网：<a href="http://www.ikcamp.com" rel="nofollow noreferrer" target="_blank">http://www.ikcamp.com</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
翻译 | 关键CSS和Webpack: 减少阻塞渲染的CSS的自动化解决方案

## 原文链接
[https://segmentfault.com/a/1190000011503284](https://segmentfault.com/a/1190000011503284)

