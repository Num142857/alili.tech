---
title: '发布自己第一个npm 组件包（基于Vue的文字跑马灯组件）' 
date: 2019-01-14 2:30:07
hidden: true
slug: hsqqi3eilnw
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">一、前言</h3>
<p>总结下最近工作上在移动端实现的一个跑马灯效果，最终效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009540502?w=555&amp;h=380" src="https://static.alili.tech/img/remote/1460000009540502?w=555&amp;h=380" alt="888.gif" title="888.gif" style="cursor: pointer; display: inline;"></span></p>
<p>印象中好像HTML标签的‘marquee’的直接可以实现这个效果，不过 HTML标准中已经废弃了‘marquee’<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee" rel="nofollow noreferrer" target="_blank">标签</a><br>既然HTML标准已经废弃了这个标签，现在工作上用的是Vue，所以想着能不能自己也发布一个基于Vue的文字跑马灯组件包，这样别人可以通过npm install ...就可以用，想想还有点激动，于是开始我的第一个npm组件之旅！</p>
<h3 id="articleHeader1">二、用npm发布一个包</h3>
<p>有点惭愧，之前通过npm install ...安装package包时，我是不知道package包存在哪里，在github上？折腾一番才知道是在npm上发布的。</p>
<h4>2.1 npm发布包流程</h4>
<ol>
<li><p>进入<a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">官网</a>，注册帐号<br><span class="img-wrap"><img data-src="/img/remote/1460000009540503?w=854&amp;h=480" src="https://static.alili.tech/img/remote/1460000009540503?w=854&amp;h=480" alt="如图" title="如图" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>进入已经写好的组件, 登录npm帐号 <br><span class="img-wrap"><img data-src="/img/remote/1460000009540504?w=500&amp;h=96" src="https://static.alili.tech/img/remote/1460000009540504?w=500&amp;h=96" alt="如图" title="如图" style="cursor: pointer; display: inline;"></span></p></li>
<li>
<p>执行npm publish，最先遇到问题好像是这个 <br><span class="img-wrap"><img data-src="/img/remote/1460000009540505?w=654&amp;h=289" src="https://static.alili.tech/img/remote/1460000009540505?w=654&amp;h=289" alt="如图" title="如图" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>这里注意的是因为国内网络问题，许多小伙伴把npm的镜像代理到淘宝或者别的地方了，这里要设置回原来的镜像。<code>npm config set registry=http://registry.npmjs.org</code></p></blockquote>
<p>后面又遇到 </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009540506?w=649&amp;h=228" src="https://static.alili.tech/img/remote/1460000009540506?w=649&amp;h=228" alt="如图" title="如图" style="cursor: pointer; display: inline;"></span></p>
<p>这里我还特意查了下ENEEDAUTH错误，可是却没看后面的提示：<code>You need to authorize this machine using 'npm adduser'</code><br>   所以这里需要<code>npm adduser</code><br><span class="img-wrap"><img data-src="/img/remote/1460000009540507?w=627&amp;h=272" src="https://static.alili.tech/img/remote/1460000009540507?w=627&amp;h=272" alt="如图" title="如图" style="cursor: pointer;"></span><br>  (发布的包的名字也要注意，有可能会有重名问题，像我这个组件包本来取名为vue-marquee，后面在npm上搜到已经有这个包了，不过他做的是垂直方向的跑马灯。所以我把这个为了区分这个组件包是水平方向的，改名为vue-marquee-ho)</p>
</li>
</ol>
<h3 id="articleHeader2">三、基于Vue的文字跑马灯组件</h3>
<p>大致了解怎么发组件包以后，我们再来看看需要发布出去的组件包怎么写的。</p>
<h4>3.1初始化组件</h4>
<p>这里我还是用到vue-cli，虽然有很多东西不需要，因为对这个比较熟悉，所以还是按照这个步骤来，初始化该组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack vue-marquee-ho
cd vue-marquee-ho
cnpm install // 安装依赖包
npm run dev // 启动服务
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>vue init webpack vue-marquee-ho
<span class="hljs-keyword">cd</span> vue-marquee-ho
cnpm install <span class="hljs-comment">// 安装依赖包</span>
npm <span class="hljs-keyword">run</span> dev <span class="hljs-comment">// 启动服务</span>
</code></pre>
<h4>3.2修改配置文件</h4>
<p>首先看package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;name&quot;: &quot;vue-marquee-ho&quot;,
  &quot;version&quot;: &quot;1.2.1&quot;,
  &quot;description&quot;: &quot;A Vue component to marquee&quot;,
  &quot;author&quot;: &quot;wangjuan&quot;,
  &quot;private&quot;: false,
  &quot;license&quot;: &quot;MIT&quot;,
  &quot;main&quot;: &quot;dist/vue-marquee.min.js&quot;,
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;start&quot;: &quot;node build/dev-server.js&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;,
    &quot;test&quot;: &quot;node build/test.js&quot;
  },
  &quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.2.6&quot;
  },
  &quot;repository&quot;: {
    &quot;type&quot;: &quot;git&quot;,
    &quot;url&quot;: &quot;git+https://github.com/wj704/vue-marquee-ho.git&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>  <span class="hljs-string">"name"</span>: <span class="hljs-string">"vue-marquee-ho"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.2.1"</span>,
  <span class="hljs-string">"description"</span>: <span class="hljs-string">"A Vue component to marquee"</span>,
  <span class="hljs-string">"author"</span>: <span class="hljs-string">"wangjuan"</span>,
  <span class="hljs-string">"private"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-string">"license"</span>: <span class="hljs-string">"MIT"</span>,
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"dist/vue-marquee.min.js"</span>,
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>,
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"node build/test.js"</span>
  },
  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"vue"</span>: <span class="hljs-string">"^2.2.6"</span>
  },
  <span class="hljs-string">"repository"</span>: {
    <span class="hljs-string">"type"</span>: <span class="hljs-string">"git"</span>,
    <span class="hljs-string">"url"</span>: <span class="hljs-string">"git+https://github.com/wj704/vue-marquee-ho.git"</span>
  },</code></pre>
<p>因为这个组件包是能公用的，所以<code>"private": false,</code><br>然后 <code>"main": "dist/vue-marquee.min.js",</code> 这里的配置意思是，别人用这个包 <code>import VueMarquee from 'vue-marquee-ho';</code> 时，引入的文件。<br>可以看出，这个vue-marquee-ho最终需要打包出一个js文件，所以我们需要修改webpack.prod.config.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  // output: {
  //   path: config.build.assetsRoot,
  //   filename: utils.assetsPath('js/[name].[chunkhash].js'),
  //   chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  // },
   output: {
    path: config.bundle.assetsRoot,
    publicPath: config.bundle.assetsPublicPath,
    filename: 'vue-marquee.min.js',
    library: 'VueMarquee',
    libraryTarget: 'umd'
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      // filename: utils.assetsPath('css/[name].[contenthash].css')
       filename: 'vue-marquee.min.css'
    }),
    new OptimizeCSSPlugin()
  ]
})
module.exports = webpackConfig
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>var webpackConfig = <span class="hljs-keyword">merge</span>(baseWebpackConfig, {
  <span class="hljs-keyword">module</span>: {
    <span class="hljs-keyword">rules</span>: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      <span class="hljs-keyword">extract</span>: <span class="hljs-literal">true</span>
    })
  },
  devtool: config.build.productionSourceMap ? <span class="hljs-string">'#source-map'</span> : <span class="hljs-literal">false</span>,
  // <span class="hljs-keyword">output</span>: {
  //   <span class="hljs-keyword">path</span>: config.build.assetsRoot,
  //   filename: utils.assetsPath(<span class="hljs-string">'js/[name].[chunkhash].js'</span>),
  //   chunkFilename: utils.assetsPath(<span class="hljs-string">'js/[id].[chunkhash].js'</span>)
  // },
   <span class="hljs-keyword">output</span>: {
    <span class="hljs-keyword">path</span>: config.bundle.assetsRoot,
    publicPath: config.bundle.assetsPublicPath,
    filename: <span class="hljs-string">'vue-marquee.min.js'</span>,
    <span class="hljs-keyword">library</span>: <span class="hljs-string">'VueMarquee'</span>,
    libraryTarget: <span class="hljs-string">'umd'</span>
  },
  plugins: [
    // <span class="hljs-keyword">http</span>://vuejs.github.io/vue-loader/en/workflow/production.html
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: env
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-keyword">compress</span>: {
        <span class="hljs-keyword">warnings</span>: <span class="hljs-literal">false</span>
      },
      sourceMap: <span class="hljs-literal">true</span>
    }),
    // <span class="hljs-keyword">extract</span> css <span class="hljs-keyword">into</span> its own <span class="hljs-keyword">file</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      // filename: utils.assetsPath(<span class="hljs-string">'css/[name].[contenthash].css'</span>)
       filename: <span class="hljs-string">'vue-marquee.min.css'</span>
    }),
    <span class="hljs-keyword">new</span> OptimizeCSSPlugin()
  ]
})
module.exports = webpackConfig
</code></pre>
<p>可以看到我的output输出配置改了下，然后有很多webpack.prod.config.js之前不需要的代码去掉了，再看下对应的config配置，文件是config/index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bundle: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '/',
    assetsSubDirectory: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">bundle</span>: {
    <span class="hljs-attribute">env</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./prod.env'</span>),
    assetsRoot: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../dist'</span>),
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    assetsSubDirectory: <span class="hljs-string">'/'</span>,
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: [<span class="hljs-string">'js'</span>, <span class="hljs-string">'css'</span>],
    bundleAnalyzerReport: process.env.npm_config_report
  },
</code></pre>
<p>至此配置差不多修改好了。接下来我们看看实现关键功能的Marquee组件</p>
<h4>3.3 Marquee组件</h4>
<p>思路：&lt;span&gt;标签里的文字所占的宽度超过外面的div宽度时，增加一个内容相同的&lt;span&gt;标签。这里span标签设置为<code>display: inline-block</code>;，可以计算其宽度，把span标签外面的父元素设置为<code>font-size: 0;display: inline-block;</code>，父级元素的宽度即为两者宽度之和，也就是一个span标签宽度的两倍，然后将其父级元素通过CSS3动画设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes marquee {
    0%  { transform: translateX(0); }
    100% { transform: translateX(-50%);}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">keyframes</span> marquee {
    0%  { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0); }
    100% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-50%);}
}</code></pre>
<p>即可完美实现跑马灯效果。<br>具体代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;marquee-box&quot;>
    <div class=&quot;marquee-content&quot; ref=&quot;out&quot;>
      <p :class=&quot;run?speed:''&quot;>
        <span class=&quot;text1&quot; ref=&quot;in&quot; >"{{"content"}}"</span>
        <span class=&quot;text2&quot; v-if=&quot;showtwo||run&quot;>"{{"content"}}"</span>
      </p>
    </div>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"marquee-box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"marquee-content"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"out"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"run?speed:''"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text1"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"in"</span> &gt;</span></span><span class="hljs-template-variable">"{{"content"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text2"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"showtwo||run"</span>&gt;</span></span><span class="hljs-template-variable">"{{"content"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  export default {
    name: 'VueMarquee',
    data (){
      return{
        run: false,
        pWidth: '',
      }
    },
    props: {
      content: {
        default: &quot;暂无内容&quot;,
        type: String
      },
      speed: {
        default: 'middle',
        type: String
      },
      showtwo: {
        default: true
      }
    },
    mounted (){
      // let out = document.getElementById(this.pid.out).clientWidth;
      // let _in = document.getElementById(this.pid.in).clientWidth;
      var _this = this;
      this.$nextTick(()=>{
        let out = _this.$refs.out.clientWidth;
        let _in = _this.$refs.in.clientWidth;
        _this.run=_in>out?true:false;
      });
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'VueMarquee'</span>,
    data (){
      <span class="hljs-keyword">return</span>{
        <span class="hljs-attr">run</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">pWidth</span>: <span class="hljs-string">''</span>,
      }
    },
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">content</span>: {
        <span class="hljs-attr">default</span>: <span class="hljs-string">"暂无内容"</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
      },
      <span class="hljs-attr">speed</span>: {
        <span class="hljs-attr">default</span>: <span class="hljs-string">'middle'</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
      },
      <span class="hljs-attr">showtwo</span>: {
        <span class="hljs-attr">default</span>: <span class="hljs-literal">true</span>
      }
    },
    mounted (){
      <span class="hljs-comment">// let out = document.getElementById(this.pid.out).clientWidth;</span>
      <span class="hljs-comment">// let _in = document.getElementById(this.pid.in).clientWidth;</span>
      <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>;
      <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">let</span> out = _this.$refs.out.clientWidth;
        <span class="hljs-keyword">let</span> _in = _this.$refs.in.clientWidth;
        _this.run=_in&gt;out?<span class="hljs-literal">true</span>:<span class="hljs-literal">false</span>;
      });
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>css:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
  .marquee-box {
    height: 50px;
    line-height: 50px;
    color: #000;
    font-size: 24px;
    background-size: 24px 24px;
  }
  .marquee-content{
    overflow: hidden;
    width:100%
  }
  .marquee-content p{
    display: inline-block;
    white-space: nowrap;
    margin: 0;
    font-size: 0;
  }
  .marquee-content span{
    display: inline-block;
    white-space: nowrap;
    padding-right: 40px;
    font-size: 24px;
  }
  .quick{
    -webkit-animation: marquee 5s linear infinite;
    animation: marquee 5s linear infinite;
  }
  .middle{
    -webkit-animation: marquee 8s linear infinite;
    animation: marquee 8s linear infinite;
  }
  .slow{
    -webkit-animation: marquee 25s linear infinite;
    animation: marquee 25s linear infinite;
  }
  @-webkit-keyframes marquee {
    0%  { -webkit-transform: translate3d(0,0,0); }
    100% { -webkit-transform: translate3d(-50%,0,0); }
  }
  @keyframes marquee {
    0%  { transform: translateX(0); }
    100% { transform: translateX(-50%);}
  }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.marquee-box</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
    <span class="hljs-attribute">background-size</span>: <span class="hljs-number">24px</span> <span class="hljs-number">24px</span>;
  }
  <span class="hljs-selector-class">.marquee-content</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>
  }
  <span class="hljs-selector-class">.marquee-content</span> <span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">white-space</span>: nowrap;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
  }
  <span class="hljs-selector-class">.marquee-content</span> <span class="hljs-selector-tag">span</span>{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">white-space</span>: nowrap;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
  }
  <span class="hljs-selector-class">.quick</span>{
    <span class="hljs-attribute">-webkit-animation</span>: marquee <span class="hljs-number">5s</span> linear infinite;
    <span class="hljs-attribute">animation</span>: marquee <span class="hljs-number">5s</span> linear infinite;
  }
  <span class="hljs-selector-class">.middle</span>{
    <span class="hljs-attribute">-webkit-animation</span>: marquee <span class="hljs-number">8s</span> linear infinite;
    <span class="hljs-attribute">animation</span>: marquee <span class="hljs-number">8s</span> linear infinite;
  }
  <span class="hljs-selector-class">.slow</span>{
    <span class="hljs-attribute">-webkit-animation</span>: marquee <span class="hljs-number">25s</span> linear infinite;
    <span class="hljs-attribute">animation</span>: marquee <span class="hljs-number">25s</span> linear infinite;
  }
  @-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> marquee {
    0%  { <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate3d</span>(0,0,0); }
    100% { <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate3d</span>(-50%,0,0); }
  }
  @<span class="hljs-keyword">keyframes</span> marquee {
    0%  { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0); }
    100% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-50%);}
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>我们知道 webpack.base.conf.js 中入口文件默认指定为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    app: './src/main.js'
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">entry</span>: {
    <span class="hljs-attribute">app</span>: <span class="hljs-string">'./src/main.js'</span>
  },</code></pre>
<p>所以，我们只需要将main.js引入Marquee.vue组件就可以。有两种方式引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueMarquee from './Marquee.vue'
export default VueMarquee;

// var VueMarquee = require('./Marquee.vue');
// module.exports = VueMarquee" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> VueMarquee <span class="hljs-keyword">from</span> <span class="hljs-string">'./Marquee.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> VueMarquee;

<span class="hljs-regexp">//</span> var VueMarquee = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./Marquee.vue'</span>);
<span class="hljs-regexp">//</span> <span class="hljs-built_in">module</span>.exports = VueMarquee</code></pre>
<p>注意import 和module.exports不要一起用，github看到其他人提交的组件是这两个一起用的，这样在windows下会报错，好像mac不会有问题。</p>
<h4>3.4 打包生成dist/vue-marquee.min.js</h4>
<p>通过npm run build 即可看到目录下生成了dist文件，dist文件里有四个文件，分别是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue-marquee.min.js
vue-marquee.min.js.map
vue-marquee.min.css
vue-marquee.min.css.map" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>vue-marquee<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span>
vue-marquee<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span>
vue-marquee<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.css</span>
vue-marquee<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.css</span><span class="hljs-selector-class">.map</span></code></pre>
<p>我们知道有一个这样的文件.gitignore，里面包含npm install时，不会安装的东西，因为这里要用到dist文件，于是我把.gitignore 里的dist/去掉了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".DS_Store
node_modules/

npm-debug.log*
yarn-debug.log*
yarn-error.log*" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>.DS_Store
node_modules/

npm-<span class="hljs-keyword">debug</span>.<span class="hljs-built_in">log</span>*
yarn-<span class="hljs-keyword">debug</span>.<span class="hljs-built_in">log</span>*
yarn-<span class="hljs-built_in">error</span>.<span class="hljs-built_in">log</span>*</code></pre>
<p>打包好了后，通过npm publish 提交到npm上</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009540508?w=259&amp;h=56" src="https://static.alili.tech/img/remote/1460000009540508?w=259&amp;h=56" alt="如图" title="如图" style="cursor: pointer;"></span></p>
<p>需要多次提交时注意修改package.json中的<code>"version": "1.2.1",</code> 我这里已经提交了21次了（捂脸哭(┬＿┬)）</p>
<h3 id="articleHeader3">四、使用组件</h3>
<p>通过<code>npm install vue-marquee-ho -s</code> 安装到相应的项目下，安装成功如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009540509?w=392&amp;h=68" src="https://static.alili.tech/img/remote/1460000009540509?w=392&amp;h=68" alt="如图" title="如图" style="cursor: pointer;"></span></p>
<p>到项目中的node_modules/目录下将可以看到：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009540510?w=217&amp;h=270" src="https://static.alili.tech/img/remote/1460000009540510?w=217&amp;h=270" alt="如图" title="如图" style="cursor: pointer;"></span></p>
<p>需要用到该组件时可以这样引入（注意引入样式）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueMarquee from 'vue-marquee-ho';
import Css from 'vue-marquee-ho/dist/vue-marquee.min.css'
export default {
  name: 'app',
  components:{
      &quot;vue-marquee&quot;: VueMarquee
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> VueMarquee <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-marquee-ho'</span>;
<span class="hljs-keyword">import</span> Css <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-marquee-ho/dist/vue-marquee.min.css'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  name: <span class="hljs-string">'app'</span>,
  components:{
      <span class="hljs-string">"vue-marquee"</span>: VueMarquee
    },
}</code></pre>
<p>看一个demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <div class=&quot;marquee-wrap&quot; style=&quot;width: 100px;&quot;><vue-marquee content=&quot;33333&quot; class=&quot;two&quot;  :showtwo=&quot;false&quot;></vue-marquee></div>
    <div class=&quot;marquee-wrap&quot; style=&quot;width: 100px;&quot;><vue-marquee content=&quot;22222&quot; class=&quot;two&quot;  :showtwo=&quot;false&quot;></vue-marquee></div>
    <div class=&quot;marquee-wrap&quot; style=&quot;width: 100px;&quot;><vue-marquee content=&quot;1&quot; class=&quot;two&quot;  :showtwo=&quot;false&quot;></vue-marquee></div>
    <router-view></router-view>
  </div>
</template>

<script>
import VueMarquee from 'vue-marquee-ho';
import Css from 'vue-marquee-ho/dist/vue-marquee.min.css'
export default {
  name: 'app',
  components:{
      &quot;vue-marquee&quot;: VueMarquee
    },
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"marquee-wrap"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100px;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">vue-marquee</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"33333"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span>  <span class="hljs-attr">:showtwo</span>=<span class="hljs-string">"false"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">vue-marquee</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"marquee-wrap"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100px;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">vue-marquee</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"22222"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span>  <span class="hljs-attr">:showtwo</span>=<span class="hljs-string">"false"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">vue-marquee</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"marquee-wrap"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100px;"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">vue-marquee</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"two"</span>  <span class="hljs-attr">:showtwo</span>=<span class="hljs-string">"false"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">vue-marquee</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> VueMarquee <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-marquee-ho'</span>;
<span class="hljs-keyword">import</span> Css <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-marquee-ho/dist/vue-marquee.min.css'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>:{
      <span class="hljs-string">"vue-marquee"</span>: VueMarquee
    },
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009540511?w=185&amp;h=145" src="https://static.alili.tech/img/remote/1460000009540511?w=185&amp;h=145" alt="如图" title="如图" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">五、总结</h3>
<p>总算发布出去，能正常使用了！花了挺多时间的，虽然这个组件思路比较简单，但是说不定别人能用上呢。这个组件的雏形代码比现在多，不过之前在项目中直接引用也能正常使用。但是把他打包发布出去再使用的过程，出了很多问题，反复修改代码，精简代码，最终终于成功了！21次的提交记录，不容易呀，源代码地址：</p>
<blockquote><p><a href="https://github.com/wj704/vue-marquee-ho" rel="nofollow noreferrer" target="_blank">vue-marquee-ho</a></p></blockquote>
<p>希望能得到大家的star ^_^</p>
<p>参考资料：<br>1、<a href="http://www.jianshu.com/p/36d3e0e00157" rel="nofollow noreferrer" target="_blank"></a><a href="http://www.jianshu.com/p/36d3e0e00157" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/36d3...</a><br>2、<a href="http://www.cnblogs.com/marymei0107/p/6339710.html" rel="nofollow noreferrer" target="_blank"></a><a href="http://www.cnblogs.com/marymei0107/p/6339710.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/maryme...</a><br>3、<a href="http://blog.csdn.net/gamesdev/article/details/49018629" rel="nofollow noreferrer" target="_blank"></a><a href="http://blog.csdn.net/gamesdev/article/details/49018629" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/gamesdev...</a><br>4、<a href="https://segmentfault.com/a/1190000006250554"></a><a href="https://segmentfault.com/a/1190000006250554" target="_blank">https://segmentfault.com/a/11...</a><br>5、<a href="https://stackoverflow.com/questions/22636885/howto-publish-private-projects-to-sinopia-npm-adduser-for-private-registry-fail" rel="nofollow noreferrer" target="_blank"></a><a href="https://stackoverflow.com/questions/22636885/howto-publish-private-projects-to-sinopia-npm-adduser-for-private-registry-fail" rel="nofollow noreferrer" target="_blank">https://stackoverflow.com/que...</a><br>6、<a href="http://www.mamicode.com/info-detail-1694072.html" rel="nofollow noreferrer" target="_blank"></a><a href="http://www.mamicode.com/info-detail-1694072.html" rel="nofollow noreferrer" target="_blank">http://www.mamicode.com/info-...</a><br>7、<a href="http://blog.csdn.net/crper/article/details/50722753" rel="nofollow noreferrer" target="_blank"></a><a href="http://blog.csdn.net/crper/article/details/50722753" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/crper/ar...</a> （虽然调试技巧我还是没学会(✿◡‿◡)）<br>8、<a href="https://github.com/xiaokaike/vue-color" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/xiaokaike/vue-color" rel="nofollow noreferrer" target="_blank">https://github.com/xiaokaike/...</a><br>9、<a href="https://github.com/li-xianfeng/vue-marquee" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/li-xianfeng/vue-marquee" rel="nofollow noreferrer" target="_blank">https://github.com/li-xianfen...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
发布自己第一个npm 组件包（基于Vue的文字跑马灯组件）

## 原文链接
[https://segmentfault.com/a/1190000009540499](https://segmentfault.com/a/1190000009540499)

