---
title: '多页架构的前后端分离方案（webpack+express）' 
date: 2019-01-19 2:30:09
hidden: true
slug: kv3wg5qmxv
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>SPA（单页架构）方案当下虽然很时髦，不过大多数的网站依旧选择多页或者单页+多页的混合架构。使用 <code>express</code>, <code>webpack</code> 本文低成本的实现了包含<code>多页架构</code>，<code>自动刷新</code>，<code>前后端分离</code> 等概念</p></blockquote>
<h2 id="articleHeader0">先上项目</h2>
<ol>
<li><p>git repo<br><a href="https://github.com/chaogao/node-pages-webpack-hot" rel="nofollow noreferrer" target="_blank">node-pages-webpack-hot</a></p></li>
<li><p>开发</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm install
 npm install supervisor -g
 npm run start # 开发环境，配置 hot reload
 npm run prod # 生产环境
 npm run build # 编译前端生产环境" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code> npm install
 npm install supervisor -g
 npm <span class="hljs-keyword">run</span><span class="bash"> start <span class="hljs-comment"># 开发环境，配置 hot reload</span>
</span> npm <span class="hljs-keyword">run</span><span class="bash"> prod <span class="hljs-comment"># 生产环境</span>
</span> npm <span class="hljs-keyword">run</span><span class="bash"> build <span class="hljs-comment"># 编译前端生产环境</span></span></code></pre>
<ol>
<li><p>DEMO<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4780891-05b942ea9dec8ae4.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4780891-05b942ea9dec8ae4.gif?imageMogr2/auto-orient/strip" alt="ezgif-2-dec6b379f7.gif" title="ezgif-2-dec6b379f7.gif" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>FE目录：<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4780891-433b80a187d254e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4780891-433b80a187d254e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>SERVER目录：<br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4780891-abad5282dd1765e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4780891-abad5282dd1765e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer;"></span></p></li>
</ol>
<blockquote><p>为了不浪费你的时间，在阅读以下内容时需要有：</p></blockquote>
<ul>
<li><p><a href="http://www.expressjs.com.cn/" rel="nofollow noreferrer" target="_blank">express</a> 基础知识，以及对 node 简单了解</p></li>
<li><p><a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">webpack</a> 中级了解，本文采用 <code>webpack2</code> 实现</p></li>
</ul>
<h2 id="articleHeader1">1. FE 端配置</h2>
<p>前端配置需要实现的功能点：</p>
<ul>
<li><p>多页架构自动生成 <code>entry</code>，并通过 <code>html-webpack-plugin</code> 生成每个页面的模板，且选择任意模板引擎需要实现 <code>layout</code> 模板功能（本文使用<code>swig</code>作为模板引擎）</p></li>
<li><p>配置各种文件后缀的 loader</p></li>
<li><p>使用 <code>HotModuleReplacementPlugin</code> 实现修改自刷新</p></li>
</ul>
<h4>1.1 自动分析entry</h4>
<blockquote><p>规定每个页面必须有一个同名的 js 文件作为此页面的 entry ，目录深度可变，如下图，分解为两个 entry：</p></blockquote>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/4780891-2e1098fdf453b221.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/4780891-2e1098fdf453b221.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>为实现自动化获取，使用了 <a href="https://github.com/isaacs/node-glob" rel="nofollow noreferrer" target="_blank">glob</a> 获取所有 <code>.js</code> 文件，并判断是否有同名的 <code>.html</code> ，如果有则生成一个 entry，如果是 dev 环境则多增加 <code>hotMiddlewareScript </code> 模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // get all js files
  let files = glob.sync(config.src + '/**/*.js');
  let srcLength = config.src.length;

  let entrys = {};

  files.forEach(function (_file) {
    let file = path.parse(_file);
    let htmlFile = path.resolve(file.dir, file.name + '.' + config.ext);

    // if has same name template file, it is a entry
    if (fs.existsSync(htmlFile)) {
      let pathIndex = file.dir.indexOf(config.src);

      if (config.dev == 'dev') {
        entrys[config.staticRoot + file.dir.slice(srcLength) + '/' + file.name] = [path.resolve(_file), hotMiddlewareScript];
      } else {
        entrys[config.staticRoot + file.dir.slice(srcLength) + '/' + file.name] = path.resolve(_file);
      }
    }
  });

  return entrys;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">// get all js files</span>
  <span class="hljs-keyword">let</span> files = glob.sync(config.src + <span class="hljs-string">'/**/*.js'</span>);
  <span class="hljs-keyword">let</span> srcLength = config.src.length;

  <span class="hljs-keyword">let</span> entrys = {};

  files.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_file</span>) </span>{
    <span class="hljs-keyword">let</span> file = path.parse(_file);
    <span class="hljs-keyword">let</span> htmlFile = path.resolve(file.dir, file.name + <span class="hljs-string">'.'</span> + config.ext);

    <span class="hljs-comment">// if has same name template file, it is a entry</span>
    <span class="hljs-keyword">if</span> (fs.existsSync(htmlFile)) {
      <span class="hljs-keyword">let</span> pathIndex = file.dir.indexOf(config.src);

      <span class="hljs-keyword">if</span> (config.dev == <span class="hljs-string">'dev'</span>) {
        entrys[config.staticRoot + file.dir.slice(srcLength) + <span class="hljs-string">'/'</span> + file.name] = [path.resolve(_file), hotMiddlewareScript];
      } <span class="hljs-keyword">else</span> {
        entrys[config.staticRoot + file.dir.slice(srcLength) + <span class="hljs-string">'/'</span> + file.name] = path.resolve(_file);
      }
    }
  });

  <span class="hljs-keyword">return</span> entrys;</code></pre>
<h3 id="articleHeader2">1.2 自动生成 <code>html-webpack-plugin</code> 模板</h3>
<p>生成一系列 <code>HtmlWebpackPlugin</code> 的要点如下：</p>
<ul>
<li><p>获取到所有的 <code>.html</code> 后，判断是否有对应的 <code>entry</code> 文件，若有则创建 <code>HtmlWebpackPlugin</code></p></li>
<li><p>如果页面为 <code>layout 模板</code>，则需要多注入由 <code>CommonsChunkPlugin</code> 生成的 <code>common</code> 模块</p></li>
</ul>
<p>自动生成 <code>HtmlWebpackPlugin</code> 代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  let htmls = [];

  // get all templates
  let files = glob.sync(config.src + '/**/*.' + config.ext);
  let srcLength = config.src.length;

  files.forEach(function (_file) {
    let file = path.parse(_file);

    let chunks = [];
    let chunkName = config.staticRoot + file.dir.slice(srcLength) + '/' + file.name;

    // if has same name entry, create a html plugin
    let c = entrys[chunkName];
    c &amp;&amp; chunks.push(chunkName);

    // layout will contains common chunk
    if (file.name == config.serverLayoutName) {
      chunks.push(config.staticRoot + '/common');
    }

    let plugin = new HtmlWebpackPlugin({
      filename: config.templateRoot + file.dir.slice(srcLength) + '/' + file.base,
      template: path.resolve(file.dir, file.base),
      chunks: chunks,
      inject: false
    });

    htmls.push(plugin);
  });

  return htmls;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>  let htmls = [];

  <span class="hljs-comment">// get all templates</span>
  let files = glob.sync(config.src + <span class="hljs-string">'/**/*.'</span> + config.ext);
  let srcLength = config.src.length;

  files.forEach(function (_file) {
    let <span class="hljs-keyword">file</span> = path.parse(_file);

    let chunks = [];
    let chunkName = config.staticRoot + <span class="hljs-keyword">file</span>.dir.slice(srcLength) + <span class="hljs-string">'/'</span> + <span class="hljs-keyword">file</span>.name;

    <span class="hljs-comment">// if has same name entry, create a html plugin</span>
    let c = entrys[chunkName];
    c &amp;&amp; chunks.<span class="hljs-keyword">push</span>(chunkName);

    <span class="hljs-comment">// layout will contains common chunk</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">file</span>.name == config.serverLayoutName) {
      chunks.<span class="hljs-keyword">push</span>(config.staticRoot + <span class="hljs-string">'/common'</span>);
    }

    let plugin = <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      filename: config.templateRoot + <span class="hljs-keyword">file</span>.dir.slice(srcLength) + <span class="hljs-string">'/'</span> + <span class="hljs-keyword">file</span>.base,
      template: path.resolve(<span class="hljs-keyword">file</span>.dir, <span class="hljs-keyword">file</span>.base),
      chunks: chunks,
      <span class="hljs-keyword">inject</span>: <span class="hljs-keyword">false</span>
    });

    htmls.<span class="hljs-keyword">push</span>(plugin);
  });

  <span class="hljs-keyword">return</span> htmls;</code></pre>
<p>由于引入了模板 <code>extends</code> 支持，需设置 <code>inject=false</code> 便不会自动注入 <code>assets 文件</code></p>
<p>编写 webpack 插件，将页面的 <code>js assets</code>, <code>css assets</code> 分别注入到：<br><code>&lt;!--webpack_style_placeholder--&gt;</code><br><code>&lt;!--webpack_script_placeholder--&gt;</code>  <br>两个替换文案处，例如页面模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{% extends '../base/base.html' %}

{% block title %}My Page{% endblock %}

{% block style %}<!--webpack_style_placeholder-->{%endblock%}

{% block head %}
  {% parent %}
{% endblock %}

{% block content %}
<p>This is just an home page！！！</p>

<div class=&quot;color-area&quot;>
  clouds
</div>

<a href=&quot;/users/list&quot;>link page2</a>
{% endblock %}

{% block script %}<!--webpack_script_placeholder-->{%endblock%}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"></span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">extends</span></span> '../base/base.html' %}</span><span class="xml">

</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">block</span></span> title %}</span><span class="xml">My Page</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">endblock</span></span> %}</span><span class="xml">

</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">block</span></span> style %}</span><span class="xml"><span class="hljs-comment">&lt;!--webpack_style_placeholder--&gt;</span></span><span class="hljs-template-tag">{%<span class="hljs-name"><span class="hljs-name">endblock</span></span>%}</span><span class="xml">

</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">block</span></span> head %}</span><span class="xml">
  </span><span class="hljs-template-tag">{% <span class="hljs-name">parent</span> %}</span><span class="xml">
</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">endblock</span></span> %}</span><span class="xml">

</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">block</span></span> content %}</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This is just an home page！！！<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"color-area"</span>&gt;</span>
  clouds
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/users/list"</span>&gt;</span>link page2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">endblock</span></span> %}</span><span class="xml">

</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">block</span></span> script %}</span><span class="xml"><span class="hljs-comment">&lt;!--webpack_script_placeholder--&gt;</span></span><span class="hljs-template-tag">{%<span class="hljs-name"><span class="hljs-name">endblock</span></span>%}</span><span class="xml">
</span></code></pre>
<p>编译后替换后为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{% extends '../base/base.html' %}

{% block title %}My Page{% endblock %}

{% block style %}<link rel=&quot;stylesheet&quot; href=&quot;/static/page/home/home.css&quot;/>{%endblock%}

{% block head %}
  {% parent %}
{% endblock %}

{% block content %}
<p>This is just an home page！！！</p>

<div class=&quot;color-area&quot;>
  clouds
</div>

<a href=&quot;/users/list&quot;>link page2</a>
{% endblock %}

{% block script %}<script src=&quot;/static/page/home/home.js&quot;></script>{%endblock%}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"></span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">extends</span></span> '../base/base.html' %}</span><span class="xml">

</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">block</span></span> title %}</span><span class="xml">My Page</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">endblock</span></span> %}</span><span class="xml">

</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">block</span></span> style %}</span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/static/page/home/home.css"</span>/&gt;</span></span><span class="hljs-template-tag">{%<span class="hljs-name"><span class="hljs-name">endblock</span></span>%}</span><span class="xml">

</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">block</span></span> head %}</span><span class="xml">
  </span><span class="hljs-template-tag">{% <span class="hljs-name">parent</span> %}</span><span class="xml">
</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">endblock</span></span> %}</span><span class="xml">

</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">block</span></span> content %}</span><span class="xml">
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>This is just an home page！！！<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"color-area"</span>&gt;</span>
  clouds
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/users/list"</span>&gt;</span>link page2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">endblock</span></span> %}</span><span class="xml">

</span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">block</span></span> script %}</span><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/static/page/home/home.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span><span class="hljs-template-tag">{%<span class="hljs-name"><span class="hljs-name">endblock</span></span>%}</span><span class="xml">
</span></code></pre>
<h3 id="articleHeader3">1.3 各种 loader 配置，提取页面 css</h3>
<blockquote><p>在 <code>dev</code> 环境下由于配置了 <code>webpack-hot-middleware</code> 所以不能对 css 进行提取，否则无法热更新</p></blockquote>
<p>样式相关的 loader 配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var extractInstance = new ExtractTextPlugin('[name].css');

if (config.env == 'dev') {
    var stylusLoader = [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'stylus-loader'
      }
    ];

    var cssLoader = [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      }
    ];
  } else {
    var stylusLoader = extractInstance.extract(['css-loader', 'stylus-loader']);
    var cssLoader = extractInstance.extract(['css-loader']);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code>var extractInstance = new <span class="hljs-type">ExtractTextPlugin</span>(<span class="hljs-string">'[name].css'</span>);

<span class="hljs-keyword">if</span> (config.env == <span class="hljs-symbol">'dev'</span>) {
    var stylusLoader = [
      {
        loader: <span class="hljs-symbol">'style</span>-loader'
      },
      {
        loader: <span class="hljs-symbol">'css</span>-loader'
      },
      {
        loader: <span class="hljs-symbol">'stylus</span>-loader'
      }
    ];

    var cssLoader = [
      {
        loader: <span class="hljs-symbol">'style</span>-loader'
      },
      {
        loader: <span class="hljs-symbol">'css</span>-loader'
      }
    ];
  } <span class="hljs-keyword">else</span> {
    var stylusLoader = extractInstance.extract([<span class="hljs-symbol">'css</span>-loader', <span class="hljs-symbol">'stylus</span>-loader']);
    var cssLoader = extractInstance.extract([<span class="hljs-symbol">'css</span>-loader']);
  }</code></pre>
<p>并将所有的 <code>loader</code> 放到同一个文件进行维护：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var rules = [
    {
      test: /\.styl$/,
      exclude: /node_modules/,
      use: stylusLoader
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: cssLoader
    },
    {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: {
          minimize: false
        }
      }
    },
    ......
    ......
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>  <span class="hljs-string">var</span> <span class="hljs-string">rules</span> <span class="hljs-string">=</span> <span class="hljs-string">[</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">      test:</span> <span class="hljs-string">/\.styl$/,</span>
<span class="hljs-attr">      exclude:</span> <span class="hljs-string">/node_modules/,</span>
<span class="hljs-attr">      use:</span> <span class="hljs-string">stylusLoader</span>
    <span class="hljs-string">},</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">      test:</span> <span class="hljs-string">/\.css$/,</span>
<span class="hljs-attr">      exclude:</span> <span class="hljs-string">/node_modules/,</span>
<span class="hljs-attr">      use:</span> <span class="hljs-string">cssLoader</span>
    <span class="hljs-string">},</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">      test:</span> <span class="hljs-string">/\.html$/,</span>
<span class="hljs-attr">      use:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        loader:</span> <span class="hljs-string">'html-loader'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        options:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">          minimize:</span> <span class="hljs-literal">false</span>
        <span class="hljs-string">}</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">},</span>
    <span class="hljs-string">......</span>
    <span class="hljs-string">......</span>
  <span class="hljs-string">]</span></code></pre>
<h3 id="articleHeader4">1.4 路径配置</h3>
<p>对生成模板，静态文件输出目录进行统一控制，便于结合各种后端架构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'dev';

const CONFIG_BUILD = {
  env: env,
  ext: 'html', // tempate ext
  src: path.resolve(__dirname, '../src'), // source code path
  path: env == 'dev' ? '/' : path.resolve(__dirname, '../dist'), // base output path
  templateRoot: 'templates', // tempate output path
  staticRoot: 'static', // static output path
  serverLayoutName: 'base', // swig layout name , only one file
  publicPath: env == 'dev' ? ('http://localhost:' + port + '/') : '/'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>const port = process.<span class="hljs-keyword">env</span>.PORT || <span class="hljs-number">8080</span>;
const <span class="hljs-keyword">env</span> = process.<span class="hljs-keyword">env</span>.NODE_ENV || <span class="hljs-string">'dev'</span>;

const CONFIG_BUILD = {
  <span class="hljs-keyword">env</span>: <span class="hljs-keyword">env</span>,
  ext: <span class="hljs-string">'html'</span>, <span class="hljs-comment">// tempate ext</span>
  src: path.resolve(__dirname, <span class="hljs-string">'../src'</span>), <span class="hljs-comment">// source code path</span>
  path: <span class="hljs-keyword">env</span> == <span class="hljs-string">'dev'</span> ? <span class="hljs-string">'/'</span> : path.resolve(__dirname, <span class="hljs-string">'../dist'</span>), <span class="hljs-comment">// base output path</span>
  templateRoot: <span class="hljs-string">'templates'</span>, <span class="hljs-comment">// tempate output path</span>
  staticRoot: <span class="hljs-string">'static'</span>, <span class="hljs-comment">// static output path</span>
  serverLayoutName: <span class="hljs-string">'base'</span>, <span class="hljs-comment">// swig layout name , only one file</span>
  publicPath: <span class="hljs-keyword">env</span> == <span class="hljs-string">'dev'</span> ? (<span class="hljs-string">'http://localhost:'</span> + port + <span class="hljs-string">'/'</span>) : <span class="hljs-string">'/'</span>
}</code></pre>
<hr>
<h2 id="articleHeader5">2. SERVER 端配置</h2>
<p><code>server</code> 端搭建了 express 服务，实现的功能点如下：</p>
<ol>
<li><p>使用 <code>webpack-dev-middleware</code> 进行 <code>webpack</code> 编译</p></li>
<li><p>使用 <code>webpack-hot-middleware</code> 实现 <code>hot reload</code></p></li>
<li><p>使用 <code>supervisor</code> 服务监听 <code>node</code> 文件改动并自动重启</p></li>
<li><p><code>render</code> 模板时将内存中的文件写入硬盘，以进行渲染</p></li>
</ol>
<h3 id="articleHeader6">2.1 webpack 接入 express</h3>
<ul><li><p>生成 <code>webpack</code> 的 <code>compiler</code></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  var webpack = require('webpack'),
    webpackDevConfig = require(path.resolve(config.root, './fe/webpack.config.js'));

  var compiler = webpack(webpackDevConfig);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">  var webpack</span> = require(<span class="hljs-string">'webpack'</span>),
    webpackDevConfig = require(path.resolve(config.root, <span class="hljs-string">'./fe/webpack.config.js'</span>));

<span class="hljs-attribute">  var compiler</span> = webpack(webpackDevConfig);</code></pre>
<ul><li><p>将 <code>compiler</code> 作为 <code>express</code> 的中间件</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // attach to the compiler &amp; the server
  app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: false,
    stats: {
      colors: true
    }
  }));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-comment">// attach to the compiler &amp; the server</span>
  <span class="hljs-selector-tag">app</span><span class="hljs-selector-class">.use</span>(webpackDevMiddleware(compiler, {
    <span class="hljs-comment">// public path should be the same with webpack config</span>
    <span class="hljs-attribute">publicPath</span>: webpackDevConfig.output.publicPath,
    <span class="hljs-attribute">noInfo</span>: false,
    <span class="hljs-attribute">stats</span>: {
      <span class="hljs-attribute">colors</span>: true
    }
  }));</code></pre>
<p>其中 <code>publicPath</code> 指明了 <code>assets </code> 请求的根路径，这里配置的是：<code>http://localhost:8080/</code></p>
<h3 id="articleHeader7">2.2 <code>hot reload</code> 方案</h3>
<h4>2.2.1 <code>js，css</code> 修改自刷新</h4>
<p><code>js</code>、<code>css</code> 的自刷新通过配置 <code>webpack-hot-middleware</code> 实现（fe 也需进行相应的配置）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // server
  const webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackHotMiddleware(compiler));
  // fe
  webpackPlugins.push(
    new webpack.HotModuleReplacementPlugin()
  );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>  <span class="hljs-comment">// server</span>
  <span class="hljs-keyword">const</span> webpackHotMiddleware = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack-hot-middleware'</span>);
  app.<span class="hljs-keyword">use</span>(webpackHotMiddleware(compiler));
  <span class="hljs-comment">// fe</span>
  webpackPlugins.push(
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
  );</code></pre>
<h4>2.2.2 <code>node</code> 修改自刷新</h4>
<p><code>node</code> 文件修改通过配置 <code>supervisor</code> 服务实现自动刷新</p>
<p>安装服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install supervisor -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> supervisor -g</code></pre>
<p>配置启动参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json
&quot;scripts&quot;: {
  &quot;start&quot;: &quot;cross-env NODE_ENV=dev supervisor -w server -e fe server/server.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">// package.json</span>
<span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"start"</span>: <span class="hljs-string">"cross-env NODE_ENV=dev supervisor -w server -e fe server/server.js"</span>
}</code></pre>
<p><code>supervisor</code> 监听了 server 文件夹下所有的改动，改动后重启  <code>express服务</code>。<br>想要实现浏览器自动刷新，需要在 <code>layout</code> 模板加入如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  {% if env == 'dev' %}
    <script src=&quot;/reload/reload.js&quot;></script>
  {% endif %}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">  </span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">if</span></span> env == 'dev' %}</span><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/reload/reload.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  </span><span class="hljs-template-tag">{% <span class="hljs-name"><span class="hljs-name">endif</span></span> %}</span></code><span class="xml"></span></pre>
<h3 id="articleHeader8">2.3 对 template 进行 render</h3>
<p>当 <code>webpack</code> 作为 <code>express</code> 中间件时，生成的所有文件都存在内存中，当然也包括由 <code>html-webpack-plugin</code> 生成的模板文件。<br>然而 <code>express</code> 的 <code>render</code> 函数只能指定一个存在于文件系统中的模板， 即<code>dev</code> 环境下 <code>render</code> 模板前需要将其从内存中取得并存放到文件系统中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = (res, template) => {
  if (config.env == 'dev') {
    let filename = compiler.outputPath + template;
    // load template from 
    compiler.outputFileSystem.readFile(filename, function(err, result) {
      let fileInfo = path.parse(path.join(config.templateRoot, filename));


      mkdirp(fileInfo.dir, () => {
        fs.writeFileSync(path.join(config.templateRoot, filename), result);

        res.render(template);
      });
    });
  } else {
    res.render(template);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function">(<span class="hljs-params">res, template</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (config.env == <span class="hljs-string">'dev'</span>) {
    <span class="hljs-keyword">let</span> filename = compiler.outputPath + template;
    <span class="hljs-comment">// load template from </span>
    compiler.outputFileSystem.readFile(filename, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, result</span>) </span>{
      <span class="hljs-keyword">let</span> fileInfo = path.parse(path.join(config.templateRoot, filename));


      mkdirp(fileInfo.dir, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        fs.writeFileSync(path.join(config.templateRoot, filename), result);

        res.render(template);
      });
    });
  } <span class="hljs-keyword">else</span> {
    res.render(template);
  }
}</code></pre>
<p><code>layout</code> 模板的存储需要一个中间件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  app.use((req, res, next) => {
    let layoutPath = path.join(config.templateRoot, config.layoutTemplate);
    let filename = compiler.outputPath + config.layoutTemplate;

    compiler.outputFileSystem.readFile(filename, function(err, result) {
      let fileInfoLayout = path.parse(layoutPath);

      mkdirp(fileInfoLayout.dir, () => {
        fs.writeFileSync(layoutPath, result);
        next();
      });
    });
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>  app.use((req, res, next) =&gt; {
    let layoutPath = path.<span class="hljs-keyword">join(config.templateRoot, </span><span class="hljs-built_in">config</span>.layoutTemplate)<span class="hljs-comment">;</span>
    let filename = compiler.outputPath + <span class="hljs-built_in">config</span>.layoutTemplate<span class="hljs-comment">;</span>

    compiler.outputFileSystem.readFile(filename, function(err, result) {
      let fileInfoLayout = path.parse(layoutPath)<span class="hljs-comment">;</span>

      mkdirp(fileInfoLayout.<span class="hljs-keyword">dir, </span>() =&gt; {
        fs.writeFileSync(layoutPath, result)<span class="hljs-comment">;</span>
        next()<span class="hljs-comment">;</span>
      })<span class="hljs-comment">;</span>
    })<span class="hljs-comment">;</span>
  })<span class="hljs-comment">;</span></code></pre>
<p>其余的均为 <a href="http://www.expressjs.com.cn/" rel="nofollow noreferrer" target="_blank">express</a> 基础使用，参阅文档即可</p>
<h3 id="articleHeader9">2.4 代理后端接口</h3>
<p>在<code>dev</code>环境时使用 <code>http-proxy-middleware</code> 对后端接口进行代理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // set proxy
  app.use('/api', proxy({target: config.proxy, changeOrigin: true}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>  <span class="hljs-comment">// set proxy</span>
  app.use(<span class="hljs-string">'/api'</span>, proxy({<span class="hljs-string">target:</span> config.proxy, <span class="hljs-string">changeOrigin:</span> <span class="hljs-literal">true</span>}));</code></pre>
<blockquote><p>所有 <code>/api</code> 的请求都会代理到 <code>config.proxy</code> 配置的 ip 端口。</p></blockquote>
<p>在正式环境中直接配置 <code>nginx</code> 进行转发</p>
<h2 id="articleHeader10">补充</h2>
<p>本文抛砖引玉简单搭建了一个前后端分离框架，但还有很多不完善的地方。真实的线上应用还需要考虑 <code>nodejs</code> 运维成本，日志，监控等等。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
多页架构的前后端分离方案（webpack+express）

## 原文链接
[https://segmentfault.com/a/1190000008644787](https://segmentfault.com/a/1190000008644787)

