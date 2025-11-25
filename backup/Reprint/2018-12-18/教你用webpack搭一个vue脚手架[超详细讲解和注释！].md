---
title: '教你用webpack搭一个vue脚手架[超详细讲解和注释！]' 
date: 2018-12-18 2:30:11
hidden: true
slug: gfz4bqq83bv
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.适用人群</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1.对webpack知识有一定了解但不熟悉的同学.
    
    2.女同学！！！(233333....)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>    <span class="hljs-number">1.</span>对webpack知识有一定了解但不熟悉的同学.
    
    <span class="hljs-number">2.</span>女同学！！！(<span class="hljs-number">233333.</span>...)</code></pre>
<h2 id="articleHeader1">2.目的</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 在自己对webpack有进一步了解的同时,也希望能帮到一些刚接触webpack的同学." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code style="word-break: break-word; white-space: initial;"> 在自己对webpack有进一步了解的同时,也希望能帮到一些刚接触webpack的同学.</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="脚手架已放上github,不想听我啰嗦的同学可以直接去download或clone下来看哦.

脚手架里都有详细注释！
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>脚手架已放上github,不想听我啰嗦的同学可以直接去download或<span class="hljs-built_in">clone</span>下来看哦.

脚手架里都有详细注释！
</code></pre>
<p><a href="https://github.com/webfansplz/xc-cli.git" rel="nofollow noreferrer" target="_blank">https://github.com/webfansplz...</a></p>
<p>觉得有帮助到你的同学给个star哈,也算是对我的一种支持！</p>
<h2 id="articleHeader2">3.脚手架结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── build                       构建服务和webpack配置
    |—— build.js                webpack打包服务
    |—— webpack.base.conf.js    webpack基本通用配置
    |—— webpack.dev.conf.js     webpack开发环境配置
    |—— webpack.prod.conf.js    webpack生产环境配置
├── config                      构建项目不同环境的配置
├── public                      项目打包文件存放目录
├── index.html                  项目入口文件
├── package.json                项目配置文件
├── static                       静态资源
├── .babelrc                    babel配置文件
├── .gitignore                  git忽略文件
├── postcss.config.js           postcss配置文件
├── src                         项目目录
    |—— page                    页面组件目录
    |—— router                  vue路由配置
    |—— store                   vuex配置
    |—— App.vue                 vue实例入口
    |—— main.js                 项目构建入口

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>├── build                       构建服务和webpack配置
    <span class="hljs-string">|—— build.js                webpack打包服务</span>
    <span class="hljs-string">|—— webpack.base.conf.js    webpack基本通用配置</span>
    <span class="hljs-string">|—— webpack.dev.conf.js     webpack开发环境配置</span>
    <span class="hljs-string">|—— webpack.prod.conf.js    webpack生产环境配置</span>
├── config                      构建项目不同环境的配置
├── public                      项目打包文件存放目录
├── index.html                  项目入口文件
├── package.json                项目配置文件
├── static                       静态资源
├── .babelrc                    babel配置文件
├── .gitignore                  git忽略文件
├── postcss.config.js           postcss配置文件
├── src                         项目目录
    <span class="hljs-string">|—— page                    页面组件目录</span>
    <span class="hljs-string">|—— router                  vue路由配置</span>
    <span class="hljs-string">|—— store                   vuex配置</span>
    <span class="hljs-string">|—— App.vue                 vue实例入口</span>
    <span class="hljs-string">|—— main.js                 项目构建入口</span>

</code></pre>
<h2 id="articleHeader3">4.配置npm scripts</h2>
<p>4.1 生成package.json文件,配置npm scripts.</p>
<p>4.1.1 使用 npm init 命令,生成一个package.json文件!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-built_in">npm</span> init</code></pre>
<p>4.1.2 全局安装webpack和webpack-dev-server</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   npm install webpack webpack-dev-server -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">   npm <span class="hljs-keyword">install</span> webpack webpack-dev-<span class="hljs-keyword">server</span> -g</code></pre>
<p>4.1.3 在项目目录下安装webpack和webpack-dev-server</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  npm install webpack webpack-dev-server -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">  npm <span class="hljs-keyword">install</span> webpack webpack-dev-<span class="hljs-keyword">server</span> -D</code></pre>
<p>4.1.4 进入package.json配置npm scripts命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;webpack-dev-server  --config build/webpack.dev.conf.js&quot;,
    &quot;start&quot;: &quot;npm run dev&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;
  }

  通过配置以上命令：
  我们可以通过npm start/npm run dev在本地进行开发,
  scripts.dev命令解读:
  通过webpack-dev-server命令 启动build文件夹下webpack.dev.conf.js。
  也可以通过npm run build 打包项目文件进行线上部署.
  scripts.build命令解读：
  通过node命令构建build文件夹下的build.js。
  命令的配置可以根据自己脚手架的配置文件位置和名称不同修改哦！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server  --config build/webpack.dev.conf.js"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"npm run dev"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>
  }

  通过配置以上命令：
  我们可以通过npm start/npm <span class="hljs-keyword">run</span><span class="bash"> dev在本地进行开发,
</span>  scripts.dev命令解读:
  通过webpack-dev-server命令 启动build文件夹下webpack.dev.conf.js。
  也可以通过npm <span class="hljs-keyword">run</span><span class="bash"> build 打包项目文件进行线上部署.
</span>  scripts.build命令解读：
  通过node命令构建build文件夹下的build.js。
  命令的配置可以根据自己脚手架的配置文件位置和名称不同修改哦！</code></pre>
<h2 id="articleHeader4">5.构建脚手架目录</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="同学们可以通过自己的习惯和喜爱搭建自己的脚手架目录,下面讲解以上面脚手架结构为准！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">同学们可以通过自己的习惯和喜爱搭建自己的脚手架目录,下面讲解以上面脚手架结构为准！</code></pre>
<h2 id="articleHeader5">6.构建config/config.js</h2>
<p>6.1 该文件主要用来配置构建开发环境和生产环境差异化的参数.<br>6.2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _path = require(&quot;path&quot;);
const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);

//vue-loader基本配置
const baseVueLoaderConf = {
  //引入postcss插件
  postcss: {
    config: {
      path: _path.resolve(&quot;../&quot;)
    }
  },
  //转为require调用,让webpack处理目标资源!
  transformToRequire: {
    video: &quot;src&quot;,
    source: &quot;src&quot;,
    img: &quot;src&quot;,
    image: &quot;xlink:href&quot;
  }
};

//vue-loader 开发环境配置
const devVueLoaderConf = Object.assign({}, baseVueLoaderConf, {
  //loaders
  loaders: {
    css: [&quot;vue-style-loader&quot;, &quot;css-loader&quot;],
    less: [&quot;vue-style-loader&quot;, &quot;css-loader&quot;, &quot;postcss-loader&quot;, &quot;less-loader&quot;]
  },
  cssSourceMap: true
});

//vue-loader 生产环境配置
const buildVueLoaderConf = Object.assign({}, baseVueLoaderConf, {
  //loaders
  loaders: ExtractTextPlugin.extract({
    use: [&quot;css-loader&quot;, &quot;postcss-loader&quot;, &quot;less-loader&quot;],
    fallback: &quot;vue-style-loader&quot;
  }),
  cssSourceMap: false
});

//开发/生产环境 配置参数！
module.exports = {
  dev: {
    publicPath: &quot;/&quot;,
    devtoolType: &quot;cheap-module-eval-source-map&quot;,
    vueloaderConf: devVueLoaderConf,
    host: &quot;localhost&quot;,
    port: &quot;1234&quot;,
    proxyTable: {}
  },
  build: {
    publicPath: &quot;/&quot;,
    devtoolType: &quot;source-map&quot;,
    vueloaderConf: buildVueLoaderConf,
    staticPath: &quot;static&quot;
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>const _path = require(<span class="hljs-string">"path"</span>);
const ExtractTextPlugin = require(<span class="hljs-string">"extract-text-webpack-plugin"</span>);

<span class="hljs-comment">//vue-loader基本配置</span>
const baseVueLoaderConf = {
  <span class="hljs-comment">//引入postcss插件</span>
<span class="hljs-symbol">  postcss:</span> {
<span class="hljs-symbol">    config:</span> {
<span class="hljs-symbol">      path:</span> _path.resolve(<span class="hljs-string">"../"</span>)
    }
  },
  <span class="hljs-comment">//转为require调用,让webpack处理目标资源!</span>
<span class="hljs-symbol">  transformToRequire:</span> {
<span class="hljs-symbol">    video:</span> <span class="hljs-string">"src"</span>,
<span class="hljs-symbol">    source:</span> <span class="hljs-string">"src"</span>,
<span class="hljs-symbol">    img:</span> <span class="hljs-string">"src"</span>,
<span class="hljs-symbol">    image:</span> <span class="hljs-string">"xlink:href"</span>
  }
};

<span class="hljs-comment">//vue-loader 开发环境配置</span>
const devVueLoaderConf = Object.assign({}, baseVueLoaderConf, {
  <span class="hljs-comment">//loaders</span>
<span class="hljs-symbol">  loaders:</span> {
<span class="hljs-symbol">    css:</span> [<span class="hljs-string">"vue-style-loader"</span>, <span class="hljs-string">"css-loader"</span>],
<span class="hljs-symbol">    less:</span> [<span class="hljs-string">"vue-style-loader"</span>, <span class="hljs-string">"css-loader"</span>, <span class="hljs-string">"postcss-loader"</span>, <span class="hljs-string">"less-loader"</span>]
  },
<span class="hljs-symbol">  cssSourceMap:</span> true
});

<span class="hljs-comment">//vue-loader 生产环境配置</span>
const buildVueLoaderConf = Object.assign({}, baseVueLoaderConf, {
  <span class="hljs-comment">//loaders</span>
<span class="hljs-symbol">  loaders:</span> ExtractTextPlugin.extract({
<span class="hljs-symbol">    use:</span> [<span class="hljs-string">"css-loader"</span>, <span class="hljs-string">"postcss-loader"</span>, <span class="hljs-string">"less-loader"</span>],
<span class="hljs-symbol">    fallback:</span> <span class="hljs-string">"vue-style-loader"</span>
  }),
<span class="hljs-symbol">  cssSourceMap:</span> false
});

<span class="hljs-comment">//开发/生产环境 配置参数！</span>
module.exports = {
<span class="hljs-symbol">  dev:</span> {
<span class="hljs-symbol">    publicPath:</span> <span class="hljs-string">"/"</span>,
<span class="hljs-symbol">    devtoolType:</span> <span class="hljs-string">"cheap-module-eval-source-map"</span>,
<span class="hljs-symbol">    vueloaderConf:</span> devVueLoaderConf,
<span class="hljs-symbol">    host:</span> <span class="hljs-string">"localhost"</span>,
<span class="hljs-symbol">    port:</span> <span class="hljs-string">"1234"</span>,
<span class="hljs-symbol">    proxyTable:</span> {}
  },
<span class="hljs-symbol">  build:</span> {
<span class="hljs-symbol">    publicPath:</span> <span class="hljs-string">"/"</span>,
<span class="hljs-symbol">    devtoolType:</span> <span class="hljs-string">"source-map"</span>,
<span class="hljs-symbol">    vueloaderConf:</span> buildVueLoaderConf,
<span class="hljs-symbol">    staticPath:</span> <span class="hljs-string">"static"</span>
  }
};
</code></pre>
<h2 id="articleHeader6">7.构建build/webpack.base.conf.js</h2>
<p>7.1 此文件主要是webpack开发环境和生成环境的通用配置.</p>
<p>7.2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;

//引入node path路径模块
const path = require(&quot;path&quot;);
//引入webpack生产环境配置参数
const prodConfig = require(&quot;../config&quot;).build;

//拼接路径
function resolve(track) {
  return path.join(__dirname, &quot;..&quot;, track);
}
//资源路径
function assetsPath(_path) {
  return path.join(prodConfig.staticPath, _path);
}

//webpack 基本设置

module.exports = {
  //项目入口文件->webpack从此处开始构建！
  entry: path.resolve(__dirname, &quot;../src/main.js&quot;),
  //配置模块如何被解析
  resolve: {
    //自动解析文件扩展名(补全文件后缀)(从左->右)
    // import hello from './hello'  （!hello.js? -> !hello.vue? -> !hello.json）
    extensions: [&quot;.js&quot;, &quot;.vue&quot;, &quot;.json&quot;],
    //配置别名映射
    alias: {
      // import Vue from 'vue/dist/vue.esm.js'可以写成 import Vue from 'vue'
      // 键后加上$,表示精准匹配！
      vue$: &quot;vue/dist/vue.esm.js&quot;,
      &quot;@&quot;: resolve(&quot;src&quot;),
      utils: resolve(&quot;src/utils&quot;),
      components: resolve(&quot;src/components&quot;),
      public: resolve(&quot;public&quot;)
    }
  },
  module: {
    //处理模块的规则(可在此处使用不同的loader来处理模块！)
    rules: [
      //使用babel-loader来处理src下面的所有js文件,具体babel配置在.babelrc,主要是用来转义es6
      {
        test: /\.js$/,
        use: {
          loader: &quot;babel-loader&quot;
        },
        include: resolve(&quot;src&quot;)
      },
      //使用url-loader(file-loader的一个再封装)对引入的图片进行编码,此处可将小于8192字节(8kb)的图片转为DataURL(base64),
      //大于limit字节的会调用file-loader进行处理！
      //图片一般发布后都是长缓存,故此处文件名加入hash做版本区分!
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: &quot;url-loader&quot;,
        options: {
          limit: 8192,
          name: assetsPath(&quot;img/[name].[hash:8].[ext]&quot;)
        }
      }
    ]
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">"use strict"</span>;

<span class="hljs-comment">//引入node path路径模块</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-comment">//引入webpack生产环境配置参数</span>
<span class="hljs-keyword">const</span> prodConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">"../config"</span>).build;

<span class="hljs-comment">//拼接路径</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">track</span>) </span>{
  <span class="hljs-keyword">return</span> path.join(__dirname, <span class="hljs-string">".."</span>, track);
}
<span class="hljs-comment">//资源路径</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">assetsPath</span>(<span class="hljs-params">_path</span>) </span>{
  <span class="hljs-keyword">return</span> path.join(prodConfig.staticPath, _path);
}

<span class="hljs-comment">//webpack 基本设置</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">//项目入口文件-&gt;webpack从此处开始构建！</span>
  entry: path.resolve(__dirname, <span class="hljs-string">"../src/main.js"</span>),
  <span class="hljs-comment">//配置模块如何被解析</span>
  resolve: {
    <span class="hljs-comment">//自动解析文件扩展名(补全文件后缀)(从左-&gt;右)</span>
    <span class="hljs-comment">// import hello from './hello'  （!hello.js? -&gt; !hello.vue? -&gt; !hello.json）</span>
    extensions: [<span class="hljs-string">".js"</span>, <span class="hljs-string">".vue"</span>, <span class="hljs-string">".json"</span>],
    <span class="hljs-comment">//配置别名映射</span>
    alias: {
      <span class="hljs-comment">// import Vue from 'vue/dist/vue.esm.js'可以写成 import Vue from 'vue'</span>
      <span class="hljs-comment">// 键后加上$,表示精准匹配！</span>
      vue$: <span class="hljs-string">"vue/dist/vue.esm.js"</span>,
      <span class="hljs-string">"@"</span>: resolve(<span class="hljs-string">"src"</span>),
      <span class="hljs-attr">utils</span>: resolve(<span class="hljs-string">"src/utils"</span>),
      <span class="hljs-attr">components</span>: resolve(<span class="hljs-string">"src/components"</span>),
      <span class="hljs-attr">public</span>: resolve(<span class="hljs-string">"public"</span>)
    }
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-comment">//处理模块的规则(可在此处使用不同的loader来处理模块！)</span>
    rules: [
      <span class="hljs-comment">//使用babel-loader来处理src下面的所有js文件,具体babel配置在.babelrc,主要是用来转义es6</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">use</span>: {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">"babel-loader"</span>
        },
        <span class="hljs-attr">include</span>: resolve(<span class="hljs-string">"src"</span>)
      },
      <span class="hljs-comment">//使用url-loader(file-loader的一个再封装)对引入的图片进行编码,此处可将小于8192字节(8kb)的图片转为DataURL(base64),</span>
      <span class="hljs-comment">//大于limit字节的会调用file-loader进行处理！</span>
      <span class="hljs-comment">//图片一般发布后都是长缓存,故此处文件名加入hash做版本区分!</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">"url-loader"</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">8192</span>,
          <span class="hljs-attr">name</span>: assetsPath(<span class="hljs-string">"img/[name].[hash:8].[ext]"</span>)
        }
      }
    ]
  }
};
</code></pre>
<h2 id="articleHeader7">8.构建 build/webpack.dev.conf.js</h2>
<p>8.1 该文件主要用于构建开发环境</p>
<p>8.2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
//引入node path路径模块
const path = require(&quot;path&quot;);
//引入webpack
const webpack = require(&quot;webpack&quot;);
//引入webpack开发环境配置参数
const devConfig = require(&quot;../config&quot;).dev;
//引入webpack基本配置
const baseConf = require(&quot;./webpack.base.conf&quot;);
//一个webpack配置合并模块,可简单的理解为与Object.assign()功能类似！
const merge = require(&quot;webpack-merge&quot;);
//一个创建html入口文件的webpack插件！
const HtmlWebpackPlugin = require(&quot;html-webpack-plugin&quot;);
//一个编译提示的webpack插件！
const FriendlyErrorsPlugin = require(&quot;friendly-errors-webpack-plugin&quot;);
//发送系统通知的一个node模块！
const notifier = require(&quot;node-notifier&quot;);
//将webpack基本配置与开发环境配置合并！
const devConf = merge(baseConf, {
  //项目出口,webpack-dev-server 生成的包并没有写入硬盘,而是放在内存中！
  output: {
    //文件名
    filename: &quot;[name].js&quot;,
    //html引用资源路径,在dev-server中,引用的是内存中文件！
    publicPath: devConfig.publicPath
  },
  //生成sourceMaps(方便调试)
  devtool: devConfig.devtoolType,
  //
  //启动一个express服务器,使我们可以在本地进行开发！！！
  devServer: {
    //HMR控制台log等级
    clientLogLevel: &quot;warning&quot;,
    // 热加载
    hot: true,
    //自动刷新
    inline: true,
    //自动打开浏览器
    open: true,
    //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    historyApiFallback: true,
    //主机名
    host: devConfig.host,
    //端口号
    port: devConfig.port,
    //配置反向代理解决跨域
    proxy: devConfig.proxyTable,
    //为你的代码进行压缩。加快开发流程和优化的作用
    compress: true,
    // 在浏览器上全屏显示编译的errors或warnings。
    overlay: {
      errors: true,
      warnings: false
    },
    // 终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的
    quiet: true
  },
  module: {
    //处理模块的规则(可在此处使用不同的loader来处理模块！)
    rules: [
      //使用vue-loader处理以vue结尾的文件！
      {
        test: /\.vue$/,
        loader: &quot;vue-loader&quot;,
        options: devConfig.vueloaderConf
      },
      //使用vue-style-loader!css-loader!postcss-loader处理以css结尾的文件！
      {
        test: /\.css$/,
        use: [
          &quot;vue-style-loader&quot;,
          {
            loader: &quot;css-loader&quot;,
            options: {
              sourceMap: true
            }
          },
          {
            loader: &quot;postcss-loader&quot;,
            options: {
              sourceMap: true
            }
          }
        ]
      },
      //使用vue-style-loader!css-loader!postcss-loader处理以less结尾的文件！
      {
        test: /\.less$/,
        use: [
          &quot;vue-style-loader&quot;,
          {
            loader: &quot;css-loader&quot;,
            options: {
              sourceMap: true
            }
          },
          {
            loader: &quot;less-loader&quot;,
            options: {
              sourceMap: true
            }
          },
          {
            loader: &quot;postcss-loader&quot;,
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //开启HMR(热替换功能,替换更新部分,不重载页面！)
    new webpack.HotModuleReplacementPlugin(),

    //显示模块相对路径
    new webpack.NamedModulesPlugin(),

    //编译出错时,该插件可跳过输出,确保输出资源不会包含错误!
    // new webpack.NoEmitOnErrorsPlugin(),

    //配置html入口信息
    new HtmlWebpackPlugin({
      title: &quot;hello,xc-cli!&quot;,
      filename: &quot;index.html&quot;,
      template: &quot;index.html&quot;,
      //js资源插入位置,true表示插入到body元素底部
      inject: true
    }),

    //编译提示插件
    new FriendlyErrorsPlugin({
      //编译成功提示！
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: http://${devConfig.host}:${devConfig.port}`
        ]
      },
      //编译出错！
      onErrors: function(severity, errors) {
        if (severity !== &quot;error&quot;) {
          return;
        }
        const error = errors[0];
        const filename = error.file.split(&quot;!&quot;).pop();
        //编译出错时,右下角弹出错误提示！
        notifier.notify({
          title: &quot;xc-cli&quot;,
          message: severity + &quot;: &quot; + error.name,
          subtitle: filename || &quot;&quot;,
          icon: path.join(__dirname, &quot;xc-cli.png&quot;)
        });
      }
    })
  ]
});
module.exports = devConf;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">"use strict"</span>;
<span class="hljs-comment">//引入node path路径模块</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-comment">//引入webpack</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-comment">//引入webpack开发环境配置参数</span>
<span class="hljs-keyword">const</span> devConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">"../config"</span>).dev;
<span class="hljs-comment">//引入webpack基本配置</span>
<span class="hljs-keyword">const</span> baseConf = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./webpack.base.conf"</span>);
<span class="hljs-comment">//一个webpack配置合并模块,可简单的理解为与Object.assign()功能类似！</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack-merge"</span>);
<span class="hljs-comment">//一个创建html入口文件的webpack插件！</span>
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"html-webpack-plugin"</span>);
<span class="hljs-comment">//一个编译提示的webpack插件！</span>
<span class="hljs-keyword">const</span> FriendlyErrorsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"friendly-errors-webpack-plugin"</span>);
<span class="hljs-comment">//发送系统通知的一个node模块！</span>
<span class="hljs-keyword">const</span> notifier = <span class="hljs-built_in">require</span>(<span class="hljs-string">"node-notifier"</span>);
<span class="hljs-comment">//将webpack基本配置与开发环境配置合并！</span>
<span class="hljs-keyword">const</span> devConf = merge(baseConf, {
  <span class="hljs-comment">//项目出口,webpack-dev-server 生成的包并没有写入硬盘,而是放在内存中！</span>
  output: {
    <span class="hljs-comment">//文件名</span>
    filename: <span class="hljs-string">"[name].js"</span>,
    <span class="hljs-comment">//html引用资源路径,在dev-server中,引用的是内存中文件！</span>
    publicPath: devConfig.publicPath
  },
  <span class="hljs-comment">//生成sourceMaps(方便调试)</span>
  devtool: devConfig.devtoolType,
  <span class="hljs-comment">//</span>
  <span class="hljs-comment">//启动一个express服务器,使我们可以在本地进行开发！！！</span>
  devServer: {
    <span class="hljs-comment">//HMR控制台log等级</span>
    clientLogLevel: <span class="hljs-string">"warning"</span>,
    <span class="hljs-comment">// 热加载</span>
    hot: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">//自动刷新</span>
    inline: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">//自动打开浏览器</span>
    open: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">//在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html</span>
    historyApiFallback: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">//主机名</span>
    host: devConfig.host,
    <span class="hljs-comment">//端口号</span>
    port: devConfig.port,
    <span class="hljs-comment">//配置反向代理解决跨域</span>
    proxy: devConfig.proxyTable,
    <span class="hljs-comment">//为你的代码进行压缩。加快开发流程和优化的作用</span>
    compress: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 在浏览器上全屏显示编译的errors或warnings。</span>
    overlay: {
      <span class="hljs-attr">errors</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
    },
    <span class="hljs-comment">// 终端输出的只有初始启动信息。 webpack 的警告和错误是不输出到终端的</span>
    quiet: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-comment">//处理模块的规则(可在此处使用不同的loader来处理模块！)</span>
    rules: [
      <span class="hljs-comment">//使用vue-loader处理以vue结尾的文件！</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">"vue-loader"</span>,
        <span class="hljs-attr">options</span>: devConfig.vueloaderConf
      },
      <span class="hljs-comment">//使用vue-style-loader!css-loader!postcss-loader处理以css结尾的文件！</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">use</span>: [
          <span class="hljs-string">"vue-style-loader"</span>,
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"css-loader"</span>,
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
            }
          },
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"postcss-loader"</span>,
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
            }
          }
        ]
      },
      <span class="hljs-comment">//使用vue-style-loader!css-loader!postcss-loader处理以less结尾的文件！</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
        <span class="hljs-attr">use</span>: [
          <span class="hljs-string">"vue-style-loader"</span>,
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"css-loader"</span>,
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
            }
          },
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"less-loader"</span>,
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
            }
          },
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"postcss-loader"</span>,
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
            }
          }
        ]
      }
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">//开启HMR(热替换功能,替换更新部分,不重载页面！)</span>
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),

    <span class="hljs-comment">//显示模块相对路径</span>
    <span class="hljs-keyword">new</span> webpack.NamedModulesPlugin(),

    <span class="hljs-comment">//编译出错时,该插件可跳过输出,确保输出资源不会包含错误!</span>
    <span class="hljs-comment">// new webpack.NoEmitOnErrorsPlugin(),</span>

    <span class="hljs-comment">//配置html入口信息</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">title</span>: <span class="hljs-string">"hello,xc-cli!"</span>,
      <span class="hljs-attr">filename</span>: <span class="hljs-string">"index.html"</span>,
      <span class="hljs-attr">template</span>: <span class="hljs-string">"index.html"</span>,
      <span class="hljs-comment">//js资源插入位置,true表示插入到body元素底部</span>
      inject: <span class="hljs-literal">true</span>
    }),

    <span class="hljs-comment">//编译提示插件</span>
    <span class="hljs-keyword">new</span> FriendlyErrorsPlugin({
      <span class="hljs-comment">//编译成功提示！</span>
      compilationSuccessInfo: {
        <span class="hljs-attr">messages</span>: [
          <span class="hljs-string">`Your application is running here: http://<span class="hljs-subst">${devConfig.host}</span>:<span class="hljs-subst">${devConfig.port}</span>`</span>
        ]
      },
      <span class="hljs-comment">//编译出错！</span>
      onErrors: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">severity, errors</span>) </span>{
        <span class="hljs-keyword">if</span> (severity !== <span class="hljs-string">"error"</span>) {
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">const</span> error = errors[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">const</span> filename = error.file.split(<span class="hljs-string">"!"</span>).pop();
        <span class="hljs-comment">//编译出错时,右下角弹出错误提示！</span>
        notifier.notify({
          <span class="hljs-attr">title</span>: <span class="hljs-string">"xc-cli"</span>,
          <span class="hljs-attr">message</span>: severity + <span class="hljs-string">": "</span> + error.name,
          <span class="hljs-attr">subtitle</span>: filename || <span class="hljs-string">""</span>,
          <span class="hljs-attr">icon</span>: path.join(__dirname, <span class="hljs-string">"xc-cli.png"</span>)
        });
      }
    })
  ]
});
<span class="hljs-built_in">module</span>.exports = devConf;
</code></pre>
<p>8.3 通过创建以上文件,并下载相应的依赖和创建项目入口,我们就可以通过npm run dev在本地开发vue项目啦！！！</p>
<h2 id="articleHeader8">9.创建 build/webpack.prod.conf.js</h2>
<p>9.1 此文件主要用于构建生产环境的配置.<br>9.2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
//引入node path路径模块
const path = require(&quot;path&quot;);
//引入webpack
const webpack = require(&quot;webpack&quot;);
//一个webpack配置合并模块,可简单的理解为与Object.assign()功能类似！
const merge = require(&quot;webpack-merge&quot;);
//引入webpack生产环境配置参数
const prodConfig = require(&quot;../config&quot;).build;
//引入webpack基本配置
const baseConf = require(&quot;./webpack.base.conf&quot;);
//一个创建html入口文件的webpack插件！
const HtmlWebpackPlugin = require(&quot;html-webpack-plugin&quot;);
//一个抽离出css的webpack插件！
const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);
//一个压缩css的webpack插件！
const OptimizeCSSPlugin = require(&quot;optimize-css-assets-webpack-plugin&quot;);
//一个拷贝文件的webpack插件！
const CopyWebpackPlugin = require(&quot;copy-webpack-plugin&quot;);

//资源路径
function assetsPath(_path) {
  return path.join(prodConfig.staticPath, _path);
}
//将webpack基本配置与生产环境配置合并！
const prodConf = merge(baseConf, {
  //项目出口配置
  output: {
    //Build后所有文件存放的位置
    path: path.resolve(__dirname, &quot;../public&quot;),
    //html引用资源路径,可在此配置cdn引用地址！
    publicPath: prodConfig.publicPath,
    //文件名
    filename: assetsPath(&quot;js/[name].[chunkhash].js&quot;),
    //用于打包require.ensure(代码分割)方法中引入的模块
    chunkFilename: assetsPath(&quot;js/[name].[chunkhash].js&quot;)
  },
  //生成sourceMaps(方便调试)
  devtool: prodConfig.devtoolType,
  module: {
    //处理模块的规则(可在此处使用不同的loader来处理模块！)
    rules: [
      //使用vue-loader处理以vue结尾的文件！
      {
        test: /\.vue$/,
        loader: &quot;vue-loader&quot;,
        options: prodConfig.vueloaderConf
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [&quot;css-loader&quot;, &quot;postcss-loader&quot;],
          fallback: &quot;vue-style-loader&quot;
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [&quot;css-loader&quot;, &quot;less-loader&quot;, &quot;postcss-loader&quot;],
          fallback: &quot;vue-style-loader&quot;
        })
      }
    ]
  },
  plugins: [
    //每个chunk头部添加hey,xc-cli!
    new webpack.BannerPlugin(&quot;hey,xc-cli&quot;),

    //压缩js
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      compress: {
        warnings: false
      }
    }),

    //分离入口引用的css,不内嵌到js bundle中!

    new ExtractTextPlugin({
      filename: assetsPath(&quot;css/[name].[contenthash].css&quot;),
      allChunks: false
    }),

    //压缩css
    new OptimizeCSSPlugin(),

    //根据模块相对路径生成四位数hash值作为模块id
    new webpack.HashedModuleIdsPlugin(),

    //作用域提升,提升代码在浏览器执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),

    //抽离公共模块,合成一个chunk,在最开始加载一次,便缓存使用,用于提升速度!

    // 1. 第三方库chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: &quot;vendor&quot;,
      minChunks: function(module) {
        //在node_modules的js文件!
        return (
          module.resource &amp;&amp;
          /\.js$/.test(module.resource) &amp;&amp;
          module.resource.indexOf(path.join(__dirname, &quot;../node_modules&quot;)) === 0
        );
      }
    }),

    // 2. 缓存chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: &quot;manifest&quot;,
      minChunks: Infinity
    }),
    // 3.异步 公共chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: &quot;app&quot;,
      children: true,
      // (选择所有被选 chunks 的子 chunks)
      async: true,
      // (创建一个异步 公共chunk)
      minChunks: 3
      // (在提取之前需要至少三个子 chunk 共享这个模块)
    }),

    //将整个文件复制到构建输出指定目录下
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, &quot;../static&quot;),
        to: prodConfig.staticPath,
        ignore: [&quot;.*&quot;]
      }
    ]),

    //生成html
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, &quot;../public/index.html&quot;),
      template: &quot;index.html&quot;,
      favicon: path.resolve(__dirname, &quot;../favicon.ico&quot;),
      //js资源插入位置,true表示插入到body元素底部
      inject: true,
      //压缩配置
      minify: {
        //删除Html注释
        removeComments: true,
        //去除空格
        collapseWhitespace: true,
        //去除属性引号
        removeAttributeQuotes: true
      },
      //根据依赖引入chunk
      chunksSortMode: &quot;dependency&quot;
    })
  ]
});
module.exports = prodConf;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">"use strict"</span>;
<span class="hljs-comment">//引入node path路径模块</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-comment">//引入webpack</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-comment">//一个webpack配置合并模块,可简单的理解为与Object.assign()功能类似！</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack-merge"</span>);
<span class="hljs-comment">//引入webpack生产环境配置参数</span>
<span class="hljs-keyword">const</span> prodConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">"../config"</span>).build;
<span class="hljs-comment">//引入webpack基本配置</span>
<span class="hljs-keyword">const</span> baseConf = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./webpack.base.conf"</span>);
<span class="hljs-comment">//一个创建html入口文件的webpack插件！</span>
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"html-webpack-plugin"</span>);
<span class="hljs-comment">//一个抽离出css的webpack插件！</span>
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);
<span class="hljs-comment">//一个压缩css的webpack插件！</span>
<span class="hljs-keyword">const</span> OptimizeCSSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"optimize-css-assets-webpack-plugin"</span>);
<span class="hljs-comment">//一个拷贝文件的webpack插件！</span>
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"copy-webpack-plugin"</span>);

<span class="hljs-comment">//资源路径</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">assetsPath</span>(<span class="hljs-params">_path</span>) </span>{
  <span class="hljs-keyword">return</span> path.join(prodConfig.staticPath, _path);
}
<span class="hljs-comment">//将webpack基本配置与生产环境配置合并！</span>
<span class="hljs-keyword">const</span> prodConf = merge(baseConf, {
  <span class="hljs-comment">//项目出口配置</span>
  output: {
    <span class="hljs-comment">//Build后所有文件存放的位置</span>
    path: path.resolve(__dirname, <span class="hljs-string">"../public"</span>),
    <span class="hljs-comment">//html引用资源路径,可在此配置cdn引用地址！</span>
    publicPath: prodConfig.publicPath,
    <span class="hljs-comment">//文件名</span>
    filename: assetsPath(<span class="hljs-string">"js/[name].[chunkhash].js"</span>),
    <span class="hljs-comment">//用于打包require.ensure(代码分割)方法中引入的模块</span>
    chunkFilename: assetsPath(<span class="hljs-string">"js/[name].[chunkhash].js"</span>)
  },
  <span class="hljs-comment">//生成sourceMaps(方便调试)</span>
  devtool: prodConfig.devtoolType,
  <span class="hljs-attr">module</span>: {
    <span class="hljs-comment">//处理模块的规则(可在此处使用不同的loader来处理模块！)</span>
    rules: [
      <span class="hljs-comment">//使用vue-loader处理以vue结尾的文件！</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">"vue-loader"</span>,
        <span class="hljs-attr">options</span>: prodConfig.vueloaderConf
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
          <span class="hljs-attr">use</span>: [<span class="hljs-string">"css-loader"</span>, <span class="hljs-string">"postcss-loader"</span>],
          <span class="hljs-attr">fallback</span>: <span class="hljs-string">"vue-style-loader"</span>
        })
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
        <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
          <span class="hljs-attr">use</span>: [<span class="hljs-string">"css-loader"</span>, <span class="hljs-string">"less-loader"</span>, <span class="hljs-string">"postcss-loader"</span>],
          <span class="hljs-attr">fallback</span>: <span class="hljs-string">"vue-style-loader"</span>
        })
      }
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">//每个chunk头部添加hey,xc-cli!</span>
    <span class="hljs-keyword">new</span> webpack.BannerPlugin(<span class="hljs-string">"hey,xc-cli"</span>),

    <span class="hljs-comment">//压缩js</span>
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">parallel</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
      }
    }),

    <span class="hljs-comment">//分离入口引用的css,不内嵌到js bundle中!</span>

    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      <span class="hljs-attr">filename</span>: assetsPath(<span class="hljs-string">"css/[name].[contenthash].css"</span>),
      <span class="hljs-attr">allChunks</span>: <span class="hljs-literal">false</span>
    }),

    <span class="hljs-comment">//压缩css</span>
    <span class="hljs-keyword">new</span> OptimizeCSSPlugin(),

    <span class="hljs-comment">//根据模块相对路径生成四位数hash值作为模块id</span>
    <span class="hljs-keyword">new</span> webpack.HashedModuleIdsPlugin(),

    <span class="hljs-comment">//作用域提升,提升代码在浏览器执行速度</span>
    <span class="hljs-keyword">new</span> webpack.optimize.ModuleConcatenationPlugin(),

    <span class="hljs-comment">//抽离公共模块,合成一个chunk,在最开始加载一次,便缓存使用,用于提升速度!</span>

    <span class="hljs-comment">// 1. 第三方库chunk</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">"vendor"</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module</span>) </span>{
        <span class="hljs-comment">//在node_modules的js文件!</span>
        <span class="hljs-keyword">return</span> (
          <span class="hljs-built_in">module</span>.resource &amp;&amp;
          <span class="hljs-regexp">/\.js$/</span>.test(<span class="hljs-built_in">module</span>.resource) &amp;&amp;
          <span class="hljs-built_in">module</span>.resource.indexOf(path.join(__dirname, <span class="hljs-string">"../node_modules"</span>)) === <span class="hljs-number">0</span>
        );
      }
    }),

    <span class="hljs-comment">// 2. 缓存chunk</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">"manifest"</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>
    }),
    <span class="hljs-comment">// 3.异步 公共chunk</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">"app"</span>,
      <span class="hljs-attr">children</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// (选择所有被选 chunks 的子 chunks)</span>
      <span class="hljs-keyword">async</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// (创建一个异步 公共chunk)</span>
      minChunks: <span class="hljs-number">3</span>
      <span class="hljs-comment">// (在提取之前需要至少三个子 chunk 共享这个模块)</span>
    }),

    <span class="hljs-comment">//将整个文件复制到构建输出指定目录下</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {
        <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">"../static"</span>),
        <span class="hljs-attr">to</span>: prodConfig.staticPath,
        <span class="hljs-attr">ignore</span>: [<span class="hljs-string">".*"</span>]
      }
    ]),

    <span class="hljs-comment">//生成html</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: path.resolve(__dirname, <span class="hljs-string">"../public/index.html"</span>),
      <span class="hljs-attr">template</span>: <span class="hljs-string">"index.html"</span>,
      <span class="hljs-attr">favicon</span>: path.resolve(__dirname, <span class="hljs-string">"../favicon.ico"</span>),
      <span class="hljs-comment">//js资源插入位置,true表示插入到body元素底部</span>
      inject: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">//压缩配置</span>
      minify: {
        <span class="hljs-comment">//删除Html注释</span>
        removeComments: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">//去除空格</span>
        collapseWhitespace: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">//去除属性引号</span>
        removeAttributeQuotes: <span class="hljs-literal">true</span>
      },
      <span class="hljs-comment">//根据依赖引入chunk</span>
      chunksSortMode: <span class="hljs-string">"dependency"</span>
    })
  ]
});
<span class="hljs-built_in">module</span>.exports = prodConf;
</code></pre>
<h1 id="articleHeader9">10. 创建 build/build.js</h1>
<p>10.1 此文件是项目打包服务,用来构建一个全量压缩包<br>10.2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
//node for loading
const ora = require(&quot;ora&quot;);
// rm-rf for node
const rm = require(&quot;rimraf&quot;);
//console for node
const chalk = require(&quot;chalk&quot;);
//path for node
const path = require(&quot;path&quot;);
//webpack
const webpack = require(&quot;webpack&quot;);
//webpack production setting
const config = require(&quot;./webpack.prod.conf&quot;);
//指定删除的文件
const rmFile = path.resolve(__dirname, &quot;../public/static&quot;);
//build start loading
const spinner = ora(&quot;building for production...&quot;);
spinner.start();

//构建全量压缩包！
rm(rmFile, function(err) {
  if (err) throw err;
  webpack(config, function(err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + &quot;\n\n&quot;
    );

    if (stats.hasErrors()) {
      console.log(chalk.red(&quot;  Build failed with errors.\n&quot;));
      process.exit(1);
    }

    console.log(chalk.cyan(&quot;  Build complete.\n&quot;));
    console.log(
      chalk.yellow(
        &quot;  Tip: built files are meant to be served over an HTTP server.\n&quot; +
          &quot;  Opening index.html over file:// won't work.\n&quot;
      )
    );
  });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">"use strict"</span>;
<span class="hljs-comment">//node for loading</span>
<span class="hljs-keyword">const</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">"ora"</span>);
<span class="hljs-comment">// rm-rf for node</span>
<span class="hljs-keyword">const</span> rm = <span class="hljs-built_in">require</span>(<span class="hljs-string">"rimraf"</span>);
<span class="hljs-comment">//console for node</span>
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">"chalk"</span>);
<span class="hljs-comment">//path for node</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-comment">//webpack</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-comment">//webpack production setting</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./webpack.prod.conf"</span>);
<span class="hljs-comment">//指定删除的文件</span>
<span class="hljs-keyword">const</span> rmFile = path.resolve(__dirname, <span class="hljs-string">"../public/static"</span>);
<span class="hljs-comment">//build start loading</span>
<span class="hljs-keyword">const</span> spinner = ora(<span class="hljs-string">"building for production..."</span>);
spinner.start();

<span class="hljs-comment">//构建全量压缩包！</span>
rm(rmFile, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
  webpack(config, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stats</span>) </span>{
    spinner.stop();
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
    process.stdout.write(
      stats.toString({
        <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">children</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>
      }) + <span class="hljs-string">"\n\n"</span>
    );

    <span class="hljs-keyword">if</span> (stats.hasErrors()) {
      <span class="hljs-built_in">console</span>.log(chalk.red(<span class="hljs-string">"  Build failed with errors.\n"</span>));
      process.exit(<span class="hljs-number">1</span>);
    }

    <span class="hljs-built_in">console</span>.log(chalk.cyan(<span class="hljs-string">"  Build complete.\n"</span>));
    <span class="hljs-built_in">console</span>.log(
      chalk.yellow(
        <span class="hljs-string">"  Tip: built files are meant to be served over an HTTP server.\n"</span> +
          <span class="hljs-string">"  Opening index.html over file:// won't work.\n"</span>
      )
    );
  });
});
</code></pre>
<p>10.3 创建好以上文件 我们就可以通过npm run build来打包我们的项目文件并部署上线啦。</p>
<h2 id="articleHeader10">11.大功告成!</h2>
<h3 id="articleHeader11">通过以上步骤,一个spa版的vue脚手架就大功告成啦！</h3>
<h3 id="articleHeader12">如果对一些细节不懂的可以留言或者上我的github查看</h3>
<p><a href="https://github.com/webfansplz/xc-cli.git" rel="nofollow noreferrer" target="_blank">https://github.com/webfansplz...</a></p>
<p>最后还是那句话,如果有帮助到你,请给我star支持哈！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
教你用webpack搭一个vue脚手架[超详细讲解和注释！]

## 原文链接
[https://segmentfault.com/a/1190000012736387](https://segmentfault.com/a/1190000012736387)

