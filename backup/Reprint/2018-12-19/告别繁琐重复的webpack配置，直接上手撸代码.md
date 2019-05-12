---
title: '告别繁琐重复的webpack配置，直接上手撸代码' 
date: 2018-12-19 2:30:07
hidden: true
slug: 9ofuxk8xd6e
categories: [reprint]
---

{{< raw >}}

                    
<p>大家伙有没有这么一个烦恼：</p>
<blockquote>想写一些简单的前端Demo，却被繁琐的webpack配置给恶心到?<br>于是乎便有了go-js的存在，我们只需要执行全局安装go-js，执行gojs指令，便可以执行前端代码</blockquote>
<h1 id="articleHeader0">使用</h1>
<p>执行如下bash脚本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g go-js

mkdir workspace
cd workspace
echo &quot;import $ from 'jquery'\n\$(document.body).html('<h1>GO\!JS\!</h1>')&quot; > jq.js

# 执行并打开浏览器 /jq.js
gojs -i jq.js
# 以 jq.js 为入口文件进行打包，将打包进入当前目录下的 .dist/ 文件夹
gojs -b jq.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install -g go-js

mkdir workspace
<span class="hljs-built_in">cd</span> workspace
<span class="hljs-built_in">echo</span> <span class="hljs-string">"import $ from 'jquery'\n\$(document.body).html('&lt;h1&gt;GO\!JS\!&lt;/h1&gt;')"</span> &gt; jq.js

<span class="hljs-comment"># 执行并打开浏览器 /jq.js</span>
gojs -i jq.js
<span class="hljs-comment"># 以 jq.js 为入口文件进行打包，将打包进入当前目录下的 .dist/ 文件夹</span>
gojs -b jq.js</code></pre>
<p>同时支持自定义html模板，在同级目录下新建 <code>jq.html</code> 便会使用 <code>jq.html</code> 作为模板</p>
<p>于是便会自动安装 jquery 依赖，并打开浏览器，enjoy it！</p>
<h1 id="articleHeader1">概念</h1>
<p>gojs 认为一个js文件就是一个入口(entry)，也对应一个webpack compiler</p>
<h1 id="articleHeader2">特征</h1>
<ol>
<li>程序运行时，自动下载依赖包</li>
<li>
<p>入口动态添加<br>如，文件目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="go-js-test/
├── a/
│   ├── a/
│   ├── jq.html
│   ├── jq.js
│   ├── style.css
│   └── style.less
├── jq.js
└── react.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="text">go-js-test/
├── a/
│   ├── a/
│   ├── jq<span class="hljs-selector-class">.html</span>
│   ├── jq<span class="hljs-selector-class">.js</span>
│   ├── style<span class="hljs-selector-class">.css</span>
│   └── style<span class="hljs-selector-class">.less</span>
├── jq<span class="hljs-selector-class">.js</span>
└── react.js</code></pre>
<p>1.在 <code>go-js-test/</code> 下执行 <code>gojs .</code><br>2.请求 <code>/jq.js</code><br>3.添加 <code>jq.js</code> 至入口中, webpack building....<br>4.请求 <code>a/jq.js</code><br>5.添加 <code>a/jq.js</code> 至入口中, webpack building....</p>
</li>
<li>
<p>颗粒化 webpack compiler 和 HMR 的处理<br>在第二点(入口动态添加)中，对于jq.js和a/jq.js两个入口，分别各自对应webpack compiler 和 HMR 单元。<br>也就是说，jq.js和a/jq.js是两个相互独立的webpack处理单元。<br>那么这样给我们带来什么便利呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 如果jq.js中出错，在a/jq.js中是不被察觉的。
2. 后面加入的a/jq.js入口，不影响jq.js入口，所以之前对jq.js的webpack bundle cache是依然生效的。（对比与 一股脑将2个入口重新用一个webpack单元处理）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span> 如果jq.js中出错，在a/jq.js中是不被察觉的。
<span class="hljs-number">2.</span> 后面加入的a/jq.js入口，不影响jq.js入口，所以之前对jq.js的webpack bundle cache是依然生效的。（对比与 一股脑将<span class="hljs-number">2</span>个入口重新用一个webpack单元处理）
</code></pre>
</li>
<li>
<p>支持自定义loaders，在工作目录下命名文件 <code>gojs.jsloader.js</code><br>默认loader为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: [
      // root
    ],
    query: {
      cacheDirectory: true,
      presets: [
        require.resolve('babel-preset-es2015'),
        require.resolve('babel-preset-react'),
        require.resolve('babel-preset-stage-0')
      ],
      plugins: [
        require.resolve('babel-plugin-transform-decorators-legacy'),
      ]
    }
  },

  {
    test: /\.css$/,
    exclude: [
      /\.mod\.css/,
      /\.use(able)?\.css/
    ],
    loaders: [
      'style-loader',
      'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version&amp;remove=false'
    ]
  },

  {
    test: /\.use(able)?\.css$/,
    loaders: [
      'style-loader/useable',
      'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version&amp;remove=false'
    ]
  },

  {
    test: /\.mod\.css$/,
    loaders: [
      'style-loader',
      'css-loader?modules&amp;localIdentName=[path][name]__[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version&amp;remove=false'
    ]
  },

  // .less, .mod.less, .useable.less
  {
    test: /\.less$/,
    exclude: [
      /\.mod\.less$/,
      /\.use(able)?\.less$/
    ],
    loaders: [
      'style-loader',
      'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version&amp;remove=false',
      'less-loader'
    ]
  },

  {
    test: /\.use(able)?\.less$/,
    loaders: [
      'style-loader/useable',
      'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version&amp;remove=false',
      'less-loader'
    ]
  },

  {
    test: /\.mod\.less$/,
    loaders: [
      'style-loader',
      'css-loader?modules&amp;localIdentName=[path][name]__[local]___[hash:base64:5]',
      'autoprefixer?browsers=last 2 version&amp;remove=false',
      'less-loader'
    ]
  },

  // 其他资源
  {
    test: /\.(jpeg|jpg|png|gif)$/,
    loader: 'url-loader?limit=10240'
  },
  {
    test: /\.html$/,
    loader: 'html-loader'
  },
  {
    test: /\.json$/, loader: 'json-loader'
  },
  {
    test: /\.woff(\?.+)?$/, loader: 'url?limit=10000&amp;mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?.+)?$/, loader: 'url?limit=10000&amp;mimetype=application/font-woff'
  },
  {
    test: /\.ttf(\?.+)?$/, loader: 'url?limit=10000&amp;mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?.+)?$/, loader: 'file'
  },
  {
    test: /\.svg(\?.+)?$/, loader: 'url?limit=10000&amp;mimetype=image/svg+xml'
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = [
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
    <span class="hljs-attr">include</span>: [
      <span class="hljs-comment">// root</span>
    ],
    <span class="hljs-attr">query</span>: {
      <span class="hljs-attr">cacheDirectory</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">presets</span>: [
        <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'babel-preset-es2015'</span>),
        <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'babel-preset-react'</span>),
        <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'babel-preset-stage-0'</span>)
      ],
      <span class="hljs-attr">plugins</span>: [
        <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'babel-plugin-transform-decorators-legacy'</span>),
      ]
    }
  },

  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
    <span class="hljs-attr">exclude</span>: [
      <span class="hljs-regexp">/\.mod\.css/</span>,
      /\.use(able)?\.css/
    ],
    <span class="hljs-attr">loaders</span>: [
      <span class="hljs-string">'style-loader'</span>,
      <span class="hljs-string">'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]'</span>,
      <span class="hljs-string">'autoprefixer?browsers=last 2 version&amp;remove=false'</span>
    ]
  },

  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.use(able)?\.css$/</span>,
    <span class="hljs-attr">loaders</span>: [
      <span class="hljs-string">'style-loader/useable'</span>,
      <span class="hljs-string">'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]'</span>,
      <span class="hljs-string">'autoprefixer?browsers=last 2 version&amp;remove=false'</span>
    ]
  },

  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.mod\.css$/</span>,
    <span class="hljs-attr">loaders</span>: [
      <span class="hljs-string">'style-loader'</span>,
      <span class="hljs-string">'css-loader?modules&amp;localIdentName=[path][name]__[local]___[hash:base64:5]'</span>,
      <span class="hljs-string">'autoprefixer?browsers=last 2 version&amp;remove=false'</span>
    ]
  },

  <span class="hljs-comment">// .less, .mod.less, .useable.less</span>
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
    <span class="hljs-attr">exclude</span>: [
      <span class="hljs-regexp">/\.mod\.less$/</span>,
      /\.use(able)?\.less$/
    ],
    <span class="hljs-attr">loaders</span>: [
      <span class="hljs-string">'style-loader'</span>,
      <span class="hljs-string">'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]'</span>,
      <span class="hljs-string">'autoprefixer?browsers=last 2 version&amp;remove=false'</span>,
      <span class="hljs-string">'less-loader'</span>
    ]
  },

  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.use(able)?\.less$/</span>,
    <span class="hljs-attr">loaders</span>: [
      <span class="hljs-string">'style-loader/useable'</span>,
      <span class="hljs-string">'css-loader?localIdentName=[path][name]__[local]___[hash:base64:5]'</span>,
      <span class="hljs-string">'autoprefixer?browsers=last 2 version&amp;remove=false'</span>,
      <span class="hljs-string">'less-loader'</span>
    ]
  },

  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.mod\.less$/</span>,
    <span class="hljs-attr">loaders</span>: [
      <span class="hljs-string">'style-loader'</span>,
      <span class="hljs-string">'css-loader?modules&amp;localIdentName=[path][name]__[local]___[hash:base64:5]'</span>,
      <span class="hljs-string">'autoprefixer?browsers=last 2 version&amp;remove=false'</span>,
      <span class="hljs-string">'less-loader'</span>
    ]
  },

  <span class="hljs-comment">// 其他资源</span>
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(jpeg|jpg|png|gif)$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader?limit=10240'</span>
  },
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.html$/</span>,
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'html-loader'</span>
  },
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.json$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'json-loader'</span>
  },
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.woff(\?.+)?$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'url?limit=10000&amp;mimetype=application/font-woff'</span>
  },
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.woff2(\?.+)?$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'url?limit=10000&amp;mimetype=application/font-woff'</span>
  },
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.ttf(\?.+)?$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'url?limit=10000&amp;mimetype=application/octet-stream'</span>
  },
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.eot(\?.+)?$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'file'</span>
  },
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.svg(\?.+)?$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'url?limit=10000&amp;mimetype=image/svg+xml'</span>
  }
]</code></pre>
</li>
</ol>
<h1 id="articleHeader3">适用于</h1>
<p>适用于一些小型项目或者demo的快速搭建开发。<br>只需要执行gojs，就可以直接看到demo啦！</p>
<h1 id="articleHeader4">预览</h1>
<ul>
<li><a href="http://www.iqiyi.com/w_19rwf46oq1.html?share_sTime=0-share_eTime=119-src=sharemodclk131212" rel="nofollow noreferrer" target="_blank">效果预览（爱奇艺）</a></li>
<li><a href="https://www.youtube.com/embed/VDfcNhSxbQY" rel="nofollow noreferrer" target="_blank">效果预览（Youtube）</a></li>
</ul>
<p>最后，欢迎各位 <a href="https://github.com/imcuttle/go-js" rel="nofollow noreferrer" target="_blank">star</a>！</p>
<p><span class="img-wrap"><img data-src="/img/bV1oVC?w=440&amp;h=440" src="https://static.alili.tech/img/bV1oVC?w=440&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
告别繁琐重复的webpack配置，直接上手撸代码

## 原文链接
[https://segmentfault.com/a/1190000012688577](https://segmentfault.com/a/1190000012688577)

