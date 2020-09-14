---
title: 'Vue单页面骨架屏实践' 
date: 2018-12-22 2:30:11
hidden: true
slug: aplso6q597i
categories: [reprint]
---

{{< raw >}}

                    
<p>github 地址： <a href="https://github.com/VV-UI/VV-UI" rel="nofollow noreferrer" target="_blank">VV-UI/VV-UI</a></p>
<p>演示地址: <a href="https://vv-ui.github.io/VV-UI/#/" rel="nofollow noreferrer" target="_blank">vv-ui</a></p>
<p>文档地址：<a href="https://vv-ui.github.io/VV-UI/#/skeleton" rel="nofollow noreferrer" target="_blank">skeleton</a></p>
<h2 id="articleHeader0">关于骨架屏介绍</h2>
<p>骨架屏的作用主要是在网络请求较慢时，提供基础占位，当数据加载完成，恢复数据展示。这样给用户一种很自然的过渡，不会造成页面长时间白屏或者闪烁等情况。 常见的骨架屏实现方案有ssr服务端渲染和prerender两种解决方案。这里主要通过代码为大家展示如何一步步做出这样一个骨架屏：</p>
<p><span class="img-wrap"><img data-src="/img/bV0cMs?w=638&amp;h=1124" src="https://static.alili.tech/img/bV0cMs?w=638&amp;h=1124" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">prerender 渲染骨架屏</h1>
<p>本组件库骨架屏的实现也是基于预渲染去实现的，有关于预渲染更详细的介绍请参考这篇文章：处理 Vue 单页面 Meta SEO的另一种思路 下面我们主要介绍其实现步骤，首先我们也是需要配置webpack-plugin，不过已经有实现好的prerender-spa-plugin可用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var PrerenderSpaPlugin = require('prerender-spa-plugin')

module.exports = {
  // ...
  plugins: [
    new PrerenderSpaPlugin(
      // Absolute path to compiled SPA
      path.join(__dirname, '../dist'),
      // List of routes to prerender
      ['/']
    )
  ]
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> PrerenderSpaPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'prerender-spa-plugin'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// ...</span>
  plugins: [
    <span class="hljs-keyword">new</span> PrerenderSpaPlugin(
      <span class="hljs-comment">// Absolute path to compiled SPA</span>
      path.join(__dirname, <span class="hljs-string">'../dist'</span>),
      <span class="hljs-comment">// List of routes to prerender</span>
      [<span class="hljs-string">'/'</span>]
    )
  ]
} 
</code></pre>
<p>然后写好我们的骨架屏文件main.skeleton.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <template>
  <div class=&quot;main-skeleton&quot;>
    <w-skeleton height=&quot;80px&quot;></w-skeleton>
    <div>
      <div class=&quot;skeleton-container&quot;>
        <div class=&quot;skeleton&quot;>
          <w-skeleton height=&quot;300px&quot;></w-skeleton>
        </div>
        <w-skeleton height=&quot;45px&quot;></w-skeleton>
      </div>
      <div class=&quot;skeleton-bottom&quot;>
        <w-skeleton height=&quot;45px&quot;></w-skeleton>
      </div>
    </div>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main-skeleton"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">w-skeleton</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"80px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">w-skeleton</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">w-skeleton</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"300px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">w-skeleton</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">w-skeleton</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"45px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">w-skeleton</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-bottom"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">w-skeleton</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"45px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">w-skeleton</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>当初次进入页面的时候我们需要显示骨架屏，数据加载完，我们需要移除骨架屏：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <template>
  <div id=&quot;app&quot;>
    <mainSkeleton v-if=&quot;!init&quot;></mainSkeleton>
    <div v-else>
      <div class=&quot;body&quot;></div>
    </div>
  </div>
</template>
<script>
 import mainSkeleton from './main.skeleton.vue'

  export default {
    name: 'app',
    data () {
      return {
        init: false
      }
    },
    mounted () {
      //  这里模拟数据请求
      setTimeout(() => {
        this.init = true
      }, 250)
    },
    components: {
      mainSkeleton
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mainSkeleton</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"!init"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mainSkeleton</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-else</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"body"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
 <span class="hljs-keyword">import</span> mainSkeleton <span class="hljs-keyword">from</span> <span class="hljs-string">'./main.skeleton.vue'</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">init</span>: <span class="hljs-literal">false</span>
      }
    },
    mounted () {
      <span class="hljs-comment">//  这里模拟数据请求</span>
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.init = <span class="hljs-literal">true</span>
      }, <span class="hljs-number">250</span>)
    },
    <span class="hljs-attr">components</span>: {
      mainSkeleton
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h1 id="articleHeader2">ssr 渲染骨架屏</h1>
<p>下面我用我灵魂画师的笔法，画出了大致的过程：</p>
<p><span class="img-wrap"><img data-src="/img/bV0cLz?w=1112&amp;h=855" src="https://static.alili.tech/img/bV0cLz?w=1112&amp;h=855" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>首先创建我们的<code>skeleton.entry.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import Skeleton from './skeleton.vue';

export default new Vue({
    components: {
        Skeleton
    },
    template: '<skeleton />'
}); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Skeleton <span class="hljs-keyword">from</span> <span class="hljs-string">'./skeleton.vue'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">components</span>: {
        Skeleton
    },
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;skeleton /&gt;'</span>
}); </code></pre>
<p>当然这里的skeleton.vue使我们事先写好的骨架屏组件，看起来可能是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <template>
    <div class=&quot;skeleton-wrapper&quot;>
        <header class=&quot;skeleton-header&quot;></header>
        <div class=&quot;skeleton-block&quot;></div>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-header"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"skeleton-block"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>然后我们需要的是能把<code>skeleton.entry.js</code>编译成服务端渲染可用的bundle文件，所以我们需要有个编译骨架屏的<code>webpack.ssr.conf.js</code>文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const nodeExternals = require('webpack-node-externals');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = merge(baseWebpackConfig, {
    target: 'node',
    devtool: false,
    entry: {
        app: resolve('./src/skeleton.entry.js')
    },
    output: Object.assign({}, baseWebpackConfig.output, {
        libraryTarget: 'commonjs2'
    }),
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: []
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>);
<span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>);
<span class="hljs-keyword">const</span> nodeExternals = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-node-externals'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">return</span> path.join(__dirname, dir);
}

<span class="hljs-built_in">module</span>.exports = merge(baseWebpackConfig, {
    <span class="hljs-attr">target</span>: <span class="hljs-string">'node'</span>,
    <span class="hljs-attr">devtool</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">app</span>: resolve(<span class="hljs-string">'./src/skeleton.entry.js'</span>)
    },
    <span class="hljs-attr">output</span>: <span class="hljs-built_in">Object</span>.assign({}, baseWebpackConfig.output, {
        <span class="hljs-attr">libraryTarget</span>: <span class="hljs-string">'commonjs2'</span>
    }),
    <span class="hljs-attr">externals</span>: nodeExternals({
        <span class="hljs-attr">whitelist</span>: <span class="hljs-regexp">/\.css$/</span>
    }),
    <span class="hljs-attr">plugins</span>: []
});</code></pre>
<p>接下来最终的步骤，就是编写我们的webpackPlugin，我们期望我们的webpackPlugin可以帮我们把入口文件编译成bundle，然后再通过vue-server-renderer来render bundle，最终产出响应的html片段和css片段，这里贴出核心代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // webpack start to work
    var serverCompiler = webpack(serverWebpackConfig);
    var mfs = new MFS();
    // output to mfs
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, function (err, stats) {

        if (err) {
            reject(err);
            return;
        }

        stats = stats.toJson();
        stats.errors.forEach(function (err) {
            console.error(err);
        });
        stats.warnings.forEach(function (err) {
            console.warn(err);
        });

        var bundle = mfs.readFileSync(outputPath, 'utf-8');
        var skeletonCss = mfs.readFileSync(outputCssPath, 'utf-8');
        // create renderer with bundle
        var renderer = createBundleRenderer(bundle);
        // use vue ssr to render skeleton
        renderer.renderToString({}, function (err, skeletonHtml) {
            if (err) {
                reject(err);
            }
            else {
                resolve({skeletonHtml: skeletonHtml, skeletonCss: skeletonCss});
            }
        });
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-comment">// webpack start to work</span>
    <span class="hljs-keyword">var</span> serverCompiler = webpack(serverWebpackConfig);
    <span class="hljs-keyword">var</span> mfs = <span class="hljs-keyword">new</span> MFS();
    <span class="hljs-comment">// output to mfs</span>
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, stats</span>) </span>{

        <span class="hljs-keyword">if</span> (err) {
            reject(err);
            <span class="hljs-keyword">return</span>;
        }

        stats = stats.toJson();
        stats.errors.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
            <span class="hljs-built_in">console</span>.error(err);
        });
        stats.warnings.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
            <span class="hljs-built_in">console</span>.warn(err);
        });

        <span class="hljs-keyword">var</span> bundle = mfs.readFileSync(outputPath, <span class="hljs-string">'utf-8'</span>);
        <span class="hljs-keyword">var</span> skeletonCss = mfs.readFileSync(outputCssPath, <span class="hljs-string">'utf-8'</span>);
        <span class="hljs-comment">// create renderer with bundle</span>
        <span class="hljs-keyword">var</span> renderer = createBundleRenderer(bundle);
        <span class="hljs-comment">// use vue ssr to render skeleton</span>
        renderer.renderToString({}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, skeletonHtml</span>) </span>{
            <span class="hljs-keyword">if</span> (err) {
                reject(err);
            }
            <span class="hljs-keyword">else</span> {
                resolve({<span class="hljs-attr">skeletonHtml</span>: skeletonHtml, <span class="hljs-attr">skeletonCss</span>: skeletonCss});
            }
        });
    });</code></pre>
<p>最后一步，我们对产出的html片段, css片段进行组装，产出最终的html，所以我们需要监听webpack 的编译挂载之前的事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compiler.plugin('compilation', function (compilation) {

    // add listener for html-webpack-plugin
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
        ssr(webpackConfig).then(function (ref) {
            var skeletonHtml = ref.skeletonHtml;
            var skeletonCss = ref.skeletonCss;

            // insert inlined styles into html
            var headTagEndPos = htmlPluginData.html.lastIndexOf('</head>');
            htmlPluginData.html = insertAt(htmlPluginData.html, (&quot;<style>&quot; + skeletonCss + &quot;</style>&quot;), headTagEndPos);

            // replace mounted point with ssr result in html
            var appPos = htmlPluginData.html.lastIndexOf(insertAfter) + insertAfter.length;
            htmlPluginData.html = insertAt(htmlPluginData.html, skeletonHtml, appPos);
            callback(null, htmlPluginData);
        });
    });
 }); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">compiler.plugin(<span class="hljs-string">'compilation'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">compilation</span>) </span>{

    <span class="hljs-comment">// add listener for html-webpack-plugin</span>
    compilation.plugin(<span class="hljs-string">'html-webpack-plugin-before-html-processing'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">htmlPluginData, callback</span>) </span>{
        ssr(webpackConfig).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ref</span>) </span>{
            <span class="hljs-keyword">var</span> skeletonHtml = ref.skeletonHtml;
            <span class="hljs-keyword">var</span> skeletonCss = ref.skeletonCss;

            <span class="hljs-comment">// insert inlined styles into html</span>
            <span class="hljs-keyword">var</span> headTagEndPos = htmlPluginData.html.lastIndexOf(<span class="hljs-string">'&lt;/head&gt;'</span>);
            htmlPluginData.html = insertAt(htmlPluginData.html, (<span class="hljs-string">"&lt;style&gt;"</span> + skeletonCss + <span class="hljs-string">"&lt;/style&gt;"</span>), headTagEndPos);

            <span class="hljs-comment">// replace mounted point with ssr result in html</span>
            <span class="hljs-keyword">var</span> appPos = htmlPluginData.html.lastIndexOf(insertAfter) + insertAfter.length;
            htmlPluginData.html = insertAt(htmlPluginData.html, skeletonHtml, appPos);
            callback(<span class="hljs-literal">null</span>, htmlPluginData);
        });
    });
 }); </code></pre>
<h2 id="articleHeader3">关于：</h2>
<p>作者：monkeyWang</p>
<p>本文参考文章：为vue项目添加骨架屏</p>
<p>本文源码详见：<a href="https://github.com/VV-UI/VV-UI" rel="nofollow noreferrer" target="_blank">VV-UI/VV-UI</a></p>
<p>本人主页：<a href="https://monkeywangs.github.io/" rel="nofollow noreferrer" target="_blank">monkeyWang</a></p>
<p>微信公众号：前端知识铺<br>会不定期推送前端技术文章，欢迎关注</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue单页面骨架屏实践

## 原文链接
[https://segmentfault.com/a/1190000012403177](https://segmentfault.com/a/1190000012403177)

