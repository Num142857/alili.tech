---
title: 'vue-cli常用设置' 
date: 2018-12-13 2:30:07
hidden: true
slug: cvpkqpatq6n
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-cli常用设置</h1>
<blockquote>基于vue-cli做了好几个项目了，想把一些自己的常用设置写出来，磨了好久，一看vue-cli3.0都快出来了，不能再磨了。。</blockquote>
<h2 id="articleHeader1">路径相关</h2>
<h3 id="articleHeader2">css内引用的资源</h3>
<p><code>build</code> -&gt; <code>utils.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    //less

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        publicPath: '../../', //注意: 此处根据路径, 自动更改
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-comment">// generate loader string to be used with extract text plugin</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateLoaders</span> (<span class="hljs-params">loader, loaderOptions</span>) </span>{
    <span class="hljs-comment">//less</span>

    <span class="hljs-comment">// Extract CSS when that option is specified</span>
    <span class="hljs-comment">// (which is the case during production build)</span>
    <span class="hljs-keyword">if</span> (options.extract) {
      <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
        <span class="hljs-attr">use</span>: loaders,
        <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'../../'</span>, <span class="hljs-comment">//注意: 此处根据路径, 自动更改</span>
        fallback: <span class="hljs-string">'vue-style-loader'</span>
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>].concat(loaders)
    }
  }</code></pre>
<h3 id="articleHeader3">本地访问</h3>
<p><code>config</code> -&gt; <code>index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  build: {
    //less
    //assetsPublicPath: '/',
    assetsPublicPath: './',
    //less
  },
  //less
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">build</span>: {
    <span class="hljs-comment">//less</span>
    <span class="hljs-comment">//assetsPublicPath: '/',</span>
    assetsPublicPath: <span class="hljs-string">'./'</span>,
    <span class="hljs-comment">//less</span>
  },
  <span class="hljs-comment">//less</span>
}
</code></pre>
<h2 id="articleHeader4">调试相关</h2>
<h3 id="articleHeader5">内网访问</h3>
<p><code>config</code> -&gt; <code>index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  //less
  dev: {
    //less
    port: process.env.PORT || 8080,//可改端口
    host:'192.168.0.105',//不是8080端口可能需要指定host为本机IP
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">//less</span>
  dev: {
    <span class="hljs-comment">//less</span>
    port: process.env.PORT || <span class="hljs-number">8080</span>,<span class="hljs-comment">//可改端口</span>
    host:<span class="hljs-string">'192.168.0.105'</span>,<span class="hljs-comment">//不是8080端口可能需要指定host为本机IP</span>
  }
}
</code></pre>
<h3 id="articleHeader6">跨域代理</h3>
<p><code>config</code> -&gt; <code>index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  //less
  dev: {
    //less
    proxyTable: {
      '/AppHome': {
        target: 'http://192.168.0.211:2334',//接口域名
        changeOrigin: true,//是否跨域
        pathRewrite: {
          '^/AppHome': '/AppHome'//需要rewrite重写
        }
      }
    },
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">//less</span>
  dev: {
    <span class="hljs-comment">//less</span>
    proxyTable: {
      <span class="hljs-string">'/AppHome'</span>: {
        <span class="hljs-attr">target</span>: <span class="hljs-string">'http://192.168.0.211:2334'</span>,<span class="hljs-comment">//接口域名</span>
        changeOrigin: <span class="hljs-literal">true</span>,<span class="hljs-comment">//是否跨域</span>
        pathRewrite: {
          <span class="hljs-string">'^/AppHome'</span>: <span class="hljs-string">'/AppHome'</span><span class="hljs-comment">//需要rewrite重写</span>
        }
      }
    },
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config -> dev.env.js
module.exports = merge(prodEnv, {
  NODE_ENV: '&quot;development&quot;',
  API_HOST: '&quot;AppHome/&quot;' 
})

config -> prod.env.js
module.exports = {
  NODE_ENV: '&quot;production&quot;',
  API_HOST: '&quot;http://xxx.xxx.com/AppHome/&quot;' //生产环境改为绝对地址，免得路径错了
}

//调用
this.$http
    .post(process.env.API_HOST + &quot;GetApproveTypeList&quot;, { ID: 0 })
    .then(data => {
    let $data = data.data;
    if ($data.IsSuccess) {
        this.list.push(...$data.Model);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">config -&gt; dev.env.js
<span class="hljs-built_in">module</span>.exports = merge(prodEnv, {
  <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">'"development"'</span>,
  <span class="hljs-attr">API_HOST</span>: <span class="hljs-string">'"AppHome/"'</span> 
})

config -&gt; prod.env.js
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">'"production"'</span>,
  <span class="hljs-attr">API_HOST</span>: <span class="hljs-string">'"http://xxx.xxx.com/AppHome/"'</span> <span class="hljs-comment">//生产环境改为绝对地址，免得路径错了</span>
}

<span class="hljs-comment">//调用</span>
<span class="hljs-keyword">this</span>.$http
    .post(process.env.API_HOST + <span class="hljs-string">"GetApproveTypeList"</span>, { <span class="hljs-attr">ID</span>: <span class="hljs-number">0</span> })
    .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> $data = data.data;
    <span class="hljs-keyword">if</span> ($data.IsSuccess) {
        <span class="hljs-keyword">this</span>.list.push(...$data.Model);
    }
});</code></pre>
<h3 id="articleHeader7">路由加载切换</h3>
<blockquote>异步加载可以加快首屏加载速度，但是在开发阶段会导致热加载变慢，所以根据NODE_ENV来判断，开发环境不使用异步</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let _import
if (process.env.NODE_ENV === 'development') {
  _import = file => require('@/components/' + file + '.vue').default
}
if (process.env.NODE_ENV === 'production') {
  _import = file => () => import('@/components/' + file + '.vue')
}

routes: [
    {
        path: '/',
        name: 'Index',
        component: _import('Approve/Index'),
        meta: {
            level: 1
        }
    },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> _import
<span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'development'</span>) {
  _import = <span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'@/components/'</span> + file + <span class="hljs-string">'.vue'</span>).default
}
<span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'production'</span>) {
  _import = <span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> () =&gt; <span class="hljs-keyword">import</span>(<span class="hljs-string">'@/components/'</span> + file + <span class="hljs-string">'.vue'</span>)
}

routes: [
    {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Index'</span>,
        <span class="hljs-attr">component</span>: _import(<span class="hljs-string">'Approve/Index'</span>),
        <span class="hljs-attr">meta</span>: {
            <span class="hljs-attr">level</span>: <span class="hljs-number">1</span>
        }
    },
]</code></pre>
<h2 id="articleHeader8">打包</h2>
<h3 id="articleHeader9">dll打包</h3>
<p>1、在<code>build</code>目录新建<code>webpack.dll.conf.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require(&quot;path&quot;);
var webpack = require(&quot;webpack&quot;);

module.exports = {
    // 你想要打包的模块的数组
    entry: {
        vendor: ['vue/dist/vue.esm.js', //有些资源需要直接指定js，否则会重复打包
                 'vuex',
                 'axios',
                 'vue-router'
                ]
    },
    output: {
        path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
        filename: '[name].dll.js',
        library: '[name]_library'
        // vendor.dll.js中暴露出的全局变量名。

    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', '[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        }),
        // 压缩打包的文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">// 你想要打包的模块的数组</span>
    entry: {
        <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'vue/dist/vue.esm.js'</span>, <span class="hljs-comment">//有些资源需要直接指定js，否则会重复打包</span>
                 <span class="hljs-string">'vuex'</span>,
                 <span class="hljs-string">'axios'</span>,
                 <span class="hljs-string">'vue-router'</span>
                ]
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'../static/js'</span>), <span class="hljs-comment">// 打包后文件输出的位置</span>
        filename: <span class="hljs-string">'[name].dll.js'</span>,
        <span class="hljs-attr">library</span>: <span class="hljs-string">'[name]_library'</span>
        <span class="hljs-comment">// vendor.dll.js中暴露出的全局变量名。</span>

    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.DllPlugin({
            <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'..'</span>, <span class="hljs-string">'[name]-manifest.json'</span>),
            <span class="hljs-attr">name</span>: <span class="hljs-string">'[name]_library'</span>,
            <span class="hljs-attr">context</span>: __dirname
        }),
        <span class="hljs-comment">// 压缩打包的文件</span>
        <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
            <span class="hljs-attr">compress</span>: {
                <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
            }
        })
    ]
};</code></pre>
<p>2、在<code>build</code>目录下的<code>webpack.prod.conf.js</code>添加新插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpackConfig = merge(baseWebpackConfig, {
   //less
  plugins: [
    //less
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../vendor-manifest.json')
    })
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> webpackConfig = merge(baseWebpackConfig, {
   <span class="hljs-comment">//less</span>
  plugins: [
    <span class="hljs-comment">//less</span>
    <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
      <span class="hljs-attr">context</span>: __dirname,
      <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../vendor-manifest.json'</span>)
    })
  ]
})</code></pre>
<p>3、在项目根目录下的<code>index.html</code>内添加<code>dll.js</code>引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <title>title</title>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  </head>
  <body>
    <div id=&quot;app&quot;></div>
    <!-- built files will be auto injected -->
    <script src=&quot;./static/js/vendor.dll.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- built files will be auto injected --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./static/js/vendor.dll.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>4、在项目根目录下的<code>package.json</code>内添加<code>dll</code>命令(顺便给<code>build</code>命令添加report)，运行一次生成<code>dll.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;start&quot;: &quot;npm run dev&quot;,
    &quot;build&quot;: &quot;node build/build.js --report&quot;,
    &quot;dll&quot;: &quot;webpack --config build//webpack.dll.conf.js&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"npm run dev"</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"node build/build.js --report"</span>,
    <span class="hljs-attr">"dll"</span>: <span class="hljs-string">"webpack --config build//webpack.dll.conf.js"</span>
  }</code></pre>
<h3 id="articleHeader10">关闭SourceMap</h3>
<p><code>config</code> -&gt; <code>index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  //less
  build: {
    //less
    productionSourceMap: false,
  },
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">//less</span>
  build: {
    <span class="hljs-comment">//less</span>
    productionSourceMap: <span class="hljs-literal">false</span>,
  },
}
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli常用设置

## 原文链接
[https://segmentfault.com/a/1190000013347431](https://segmentfault.com/a/1190000013347431)

