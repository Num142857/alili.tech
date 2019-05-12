---
title: '一步一个深坑——vue' 
date: 2018-11-30 2:30:12
hidden: true
slug: sgevbl3t87
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">疑难杂症</h1>
<h2 id="articleHeader1">vue改造多页面应用配置注意问题（踩了神坑...）</h2>
<p>首先修改webpack配置，文章很多，主要参考这篇链接<a href="https://juejin.im/post/5a8e3f00f265da4e747fc700" rel="nofollow noreferrer" target="_blank">vue多页面开发</a><br>不想移步的童鞋来：</p>
<ol>
<li>
<p>在<code>util.js</code>里面<strong>尾部直接</strong>加入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  /* 这里是添加的部分 ---------------------------- 开始 */
  
  // glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
  var glob = require('glob')
  // 页面模板
  var HtmlWebpackPlugin = require('html-webpack-plugin')
  // 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
  var PAGE_PATH = path.resolve(__dirname, '../src/pages')
  // 用于做相应的merge处理
  var merge = require('webpack-merge')

  //多入口配置
  // 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
  // 那么就作为入口处理
  exports.entries = function () {
      var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
      var map = {}
      entryFiles.forEach((filePath) => {
          var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
          map[filename] = filePath
      })
      return map
  }

  //多页面输出配置
  // 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
  exports.htmlPlugin = function () {
      let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
      let arr = []
      entryHtml.forEach((filePath) => {
          let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
          let conf = {
              // 模板来源
              template: filePath,
              // 文件名称
              filename: filename + '.html',
              // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
              chunks: ['manifest', 'vendor', filename],
              inject: true
          }
          if (process.env.NODE_ENV === 'production') {
              conf = merge(conf, {
                  minify: {
                      removeComments: true,
                      collapseWhitespace: true,
                      removeAttributeQuotes: true
                  },
                  chunksSortMode: 'dependency'
              })
          }
          arr.push(new HtmlWebpackPlugin(conf))
      })
      return arr
  }
  /* 这里是添加的部分 ---------------------------- 结束 */
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-comment">/* 这里是添加的部分 ---------------------------- 开始 */</span>
  
  <span class="hljs-comment">// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件</span>
  <span class="hljs-keyword">var</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>)
  <span class="hljs-comment">// 页面模板</span>
  <span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
  <span class="hljs-comment">// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹</span>
  <span class="hljs-keyword">var</span> PAGE_PATH = path.resolve(__dirname, <span class="hljs-string">'../src/pages'</span>)
  <span class="hljs-comment">// 用于做相应的merge处理</span>
  <span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)

  <span class="hljs-comment">//多入口配置</span>
  <span class="hljs-comment">// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在</span>
  <span class="hljs-comment">// 那么就作为入口处理</span>
  exports.entries = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> entryFiles = glob.sync(PAGE_PATH + <span class="hljs-string">'/*/*.js'</span>)
      <span class="hljs-keyword">var</span> map = {}
      entryFiles.forEach(<span class="hljs-function">(<span class="hljs-params">filePath</span>) =&gt;</span> {
          <span class="hljs-keyword">var</span> filename = filePath.substring(filePath.lastIndexOf(<span class="hljs-string">'\/'</span>) + <span class="hljs-number">1</span>, filePath.lastIndexOf(<span class="hljs-string">'.'</span>))
          map[filename] = filePath
      })
      <span class="hljs-keyword">return</span> map
  }

  <span class="hljs-comment">//多页面输出配置</span>
  <span class="hljs-comment">// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中</span>
  exports.htmlPlugin = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">let</span> entryHtml = glob.sync(PAGE_PATH + <span class="hljs-string">'/*/*.html'</span>)
      <span class="hljs-keyword">let</span> arr = []
      entryHtml.forEach(<span class="hljs-function">(<span class="hljs-params">filePath</span>) =&gt;</span> {
          <span class="hljs-keyword">let</span> filename = filePath.substring(filePath.lastIndexOf(<span class="hljs-string">'\/'</span>) + <span class="hljs-number">1</span>, filePath.lastIndexOf(<span class="hljs-string">'.'</span>))
          <span class="hljs-keyword">let</span> conf = {
              <span class="hljs-comment">// 模板来源</span>
              template: filePath,
              <span class="hljs-comment">// 文件名称</span>
              filename: filename + <span class="hljs-string">'.html'</span>,
              <span class="hljs-comment">// 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本</span>
              chunks: [<span class="hljs-string">'manifest'</span>, <span class="hljs-string">'vendor'</span>, filename],
              <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>
          }
          <span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'production'</span>) {
              conf = merge(conf, {
                  <span class="hljs-attr">minify</span>: {
                      <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,
                      <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">true</span>,
                      <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span>
                  },
                  <span class="hljs-attr">chunksSortMode</span>: <span class="hljs-string">'dependency'</span>
              })
          }
          arr.push(<span class="hljs-keyword">new</span> HtmlWebpackPlugin(conf))
      })
      <span class="hljs-keyword">return</span> arr
  }
  <span class="hljs-comment">/* 这里是添加的部分 ---------------------------- 结束 */</span>
  </code></pre>
</li>
<li>
<p><code>webpack.base.conf.js</code> 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  /* 修改部分 ---------------- 开始 */
    entry: utils.entries(),
    /* 修改部分 ---------------- 结束 */
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>  /* 修改部分 <span class="hljs-comment">---------------- 开始 */</span>
    <span class="hljs-keyword">entry</span>: utils.entries(),
    /* 修改部分 <span class="hljs-comment">---------------- 结束 */</span>
</code></pre>
</li>
<li>
<p><code>webpack.dev.conf.js</code> 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   /* 注释这个区域的文件 ------------- 开始 */
      // new HtmlWebpackPlugin({
      //   filename: 'index.html',
      //   template: 'index.html',
      //   inject: true
      // }),
      /* 注释这个区域的文件 ------------- 结束 */
      new FriendlyErrorsPlugin()
      //**注意我在新版本生成的这里是保存static目录的东西不用在意**
      new CopyWebpackPlugin([{
          from: path.resolve(__dirname, '../static'),
          to: config.dev.assetsSubDirectory,
          ignore: ['.*']
      }])
      /* 添加 .concat(utils.htmlPlugin()) ------------------ */
    ].concat(utils.htmlPlugin())" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>   <span class="hljs-comment">/* 注释这个区域的文件 ------------- 开始 */</span>
      <span class="hljs-comment">// new HtmlWebpackPlugin({</span>
      <span class="hljs-comment">//   filename: 'index.html',</span>
      <span class="hljs-comment">//   template: 'index.html',</span>
      <span class="hljs-comment">//   inject: true</span>
      <span class="hljs-comment">// }),</span>
      <span class="hljs-comment">/* 注释这个区域的文件 ------------- 结束 */</span>
      <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">FriendlyErrorsPlugin</span>()
      <span class="hljs-comment">//**注意我在新版本生成的这里是保存static目录的东西不用在意**</span>
      <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">CopyWebpackPlugin</span>([{
          <span class="hljs-attribute">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
          <span class="hljs-attribute">to</span>: config.dev.assetsSubDirectory,
          <span class="hljs-attribute">ignore</span>: [<span class="hljs-string">'.*'</span>]
      }])
      <span class="hljs-comment">/* 添加 .concat(utils.htmlPlugin()) ------------------ */</span>
    ]<span class="hljs-selector-class">.concat</span>(utils.htmlPlugin())</code></pre>
</li>
<li>
<p><code>webpack.prod.conf.js</code> 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       /* 注释这个区域的内容 ---------------------- 开始 */
      // new HtmlWebpackPlugin({
      //   filename: config.build.index,
      //   template: 'index.html',
      //   inject: true,
      //   minify: {
      //     removeComments: true,
      //     collapseWhitespace: true,
      //     removeAttributeQuotes: true
      //     // more options:
      //     // https://github.com/kangax/html-minifier#options-quick-reference
      //   },
      //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      //   chunksSortMode: 'dependency'
      // }),
      /* 注释这个区域的内容 ---------------------- 结束 */
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: config.build.assetsSubDirectory,
          ignore: ['.*']
        }
      ])
      /* 该位置添加 .concat(utils.htmlPlugin()) ------------------- */
    ].concat(utils.htmlPlugin())
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>       <span class="hljs-regexp">/* 注释这个区域的内容 ---------------------- 开始 */</span>
      <span class="hljs-regexp">//</span> new HtmlWebpackPlugin({
      <span class="hljs-regexp">//</span>   filename: config.build.index,
      <span class="hljs-regexp">//</span>   template: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-regexp">//</span>   inject: true,
      <span class="hljs-regexp">//</span>   minify: {
      <span class="hljs-regexp">//</span>     removeComments: true,
      <span class="hljs-regexp">//</span>     collapseWhitespace: true,
      <span class="hljs-regexp">//</span>     removeAttributeQuotes: true
      <span class="hljs-regexp">//</span>     <span class="hljs-regexp">//</span> more options:
      <span class="hljs-regexp">//</span>     <span class="hljs-regexp">//</span> https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/kangax/</span>html-minifier<span class="hljs-comment">#options-quick-reference</span>
      <span class="hljs-regexp">//</span>   },
      <span class="hljs-regexp">//</span>   <span class="hljs-regexp">//</span> necessary to consistently work with multiple chunks via CommonsChunkPlugin
      <span class="hljs-regexp">//</span>   chunksSortMode: <span class="hljs-string">'dependency'</span>
      <span class="hljs-regexp">//</span> }),
      <span class="hljs-regexp">/* 注释这个区域的内容 ---------------------- 结束 */</span>
      <span class="hljs-regexp">//</span> copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
          to: config.build.assetsSubDirectory,
          ignore: [<span class="hljs-string">'.*'</span>]
        }
      ])
      <span class="hljs-regexp">/* 该位置添加 .concat(utils.htmlPlugin()) ------------------- */</span>
    ].concat(utils.htmlPlugin())
</code></pre>
</li>
<li>
<p>改造目录<br><span class="img-wrap"><img data-src="/img/bVbcgI5?w=680&amp;h=1328" src="https://static.alili.tech/img/bVbcgI5?w=680&amp;h=1328" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote>值得注意的是：这里的<code>js</code>一定要和<code>html</code>名称一样，我因为这个不一样，卡了好久，在别的地方有说必须是<code>App.vue</code>的，这个如图，我没用，测试界面正常显示，但是我把默认<code>main.js</code>直接移动到文件夹里时，<code>index.html</code>一直是空白页，把<code>main.js</code>改为<code>index.js</code>正常，如果有问题我还会探究改正</blockquote>
</li>
<li>
<p>访问方式</p>
<ul>
<li>
<a href="http://localhost:8080/login.html" rel="nofollow noreferrer" target="_blank"></a><a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080/login.html</li>
<li>
<a href="http://localhost:8080/index.html" rel="nofollow noreferrer" target="_blank"></a><a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080/index.html</li>
</ul>
</li>
<li>
<p>修改<code>config</code>目录下的<code>assetsPublicPath</code>路径的问题</p>
<blockquote>相信很多人都查过<code>npm run build</code>后空白页的问题然后修改<code>assetsPublicPath</code>的值<code>/</code>为<code>./</code>，然而这里改的话，所有页面都会无法获取，cannot get，此处困扰我三天，一度令我觉得自己不适合这行，适合喝西北风，本来就新手学vue，也没什么资源，这里解决了，但build后的问题呢，未完待续，先调好开发效果，步步为营吧</blockquote>
</li>
</ol>
<h2 id="articleHeader2"><a href="https://blog.csdn.net/connie_0217/article/details/78703112" rel="nofollow noreferrer" target="_blank">全局使用axios</a></h2>
<ul>
<li>
<h2 id="articleHeader3">结合 <code>vue-axios</code>使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
import VueAxios from 'vue-axios'
    
Vue.use(VueAxios,axios);

getNewsList(){
  this.axios.get('api/getNewsList').then((response)=>{
    this.newsList=response.data.data;
  }).catch((response)=>{
    console.log(response);
  })
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> VueAxios <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-axios'</span>
    
Vue.use(VueAxios,axios);

getNewsList(){
  <span class="hljs-keyword">this</span>.axios.get(<span class="hljs-string">'api/getNewsList'</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(response)</span>=&gt;</span>{
    <span class="hljs-keyword">this</span>.newsList=response.data.data;
  }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(response)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(response);
  })
},</code></pre>
</li>
<li>
<h2 id="articleHeader4">axios 改写为 Vue 的原型属性</h2>
<p>首先在主入口文件<code>main.js</code>中引用，之后挂在vue的原型链上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   import axios from 'axios'
   Vue.prototype.$ajax= axios
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code>   <span class="hljs-keyword">import</span> axios from 'axios'
   <span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span>.$ajax= axios
</code></pre>
<p>在组件中使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   this.$ajax.get('api/getNewsList').then((response)=>{
           this.newsList=response.data.data;
         }).catch((response)=>{
           console.log(response);
         })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>   <span class="hljs-keyword">this</span>.$ajax.get(<span class="hljs-string">'api/getNewsList'</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(response)</span>=&gt;</span>{
           <span class="hljs-keyword">this</span>.newsList=response.data.data;
         }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(response)</span>=&gt;</span>{
           <span class="hljs-built_in">console</span>.log(response);
         })
</code></pre>
</li>
<li>
<h2 id="articleHeader5">结合 <code>Vuex</code>的<code>action</code>
</h2>
<p>在<code>vuex</code>的仓库文件<code>store.js</code>中引用，使用<code>action</code>添加方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   import Vue from 'Vue'
   import Vuex from 'vuex'
   
   import axios from 'axios'
   
   Vue.use(Vuex)
   const store = new Vuex.Store({
     // 定义状态
     state: {
       user: {
         name: 'xiaoming'
       }
     },
     actions: {
       // 封装一个 ajax 方法
       login (context) {
         axios({
           method: 'post',
           url: '/user',
           data: context.state.user
         })
       }
     }
   })
   
   export default store
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>   <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'Vue'</span>
   <span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
   
   <span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
   
   Vue.use(Vuex)
   <span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
     <span class="hljs-comment">// 定义状态</span>
     state: {
       <span class="hljs-attr">user</span>: {
         <span class="hljs-attr">name</span>: <span class="hljs-string">'xiaoming'</span>
       }
     },
     <span class="hljs-attr">actions</span>: {
       <span class="hljs-comment">// 封装一个 ajax 方法</span>
       login (context) {
         axios({
           <span class="hljs-attr">method</span>: <span class="hljs-string">'post'</span>,
           <span class="hljs-attr">url</span>: <span class="hljs-string">'/user'</span>,
           <span class="hljs-attr">data</span>: context.state.user
         })
       }
     }
   })
   
   <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store
</code></pre>
<p>在组件中发送请求的时候，需要使用 <code>this.$store.dispatch</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   methods: {
     submitForm () {
       this.$store.dispatch('login')
     }
   }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>   methods: {
     submitForm () {
       this.$store.dispatch(<span class="hljs-string">'login'</span>)
     }
   }
</code></pre>
</li>
</ul>
<h2 id="articleHeader6"><a href="https://www.cnblogs.com/gping/p/8904110.html" rel="nofollow noreferrer" target="_blank">关于新版vue-cli安装json-server在build文件里没生成出dev-server文件</a></h2>
<blockquote>新版的vue-cli取消了dev-server.js和dev-client.js 改用webpack.dev.conf.js代替，所以 配置本地访问在webpack.dev.conf.js里配置即可</blockquote>
<p>打开<code>webpack.dev.conf.js</code>,(在<code>build</code>目录下)，</p>
<p>在<code>const portfinder = require(‘portfinder’)</code>后添加以下两行代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const appData = require('./db.json')//加载本地数据文件
const seller = appData.seller//获取对应的本地数据，
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> appData = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./db.json'</span>)<span class="hljs-comment">//加载本地数据文件</span>
<span class="hljs-keyword">const</span> seller = appData.seller<span class="hljs-comment">//获取对应的本地数据，</span>
</code></pre>
<p>添加完以上代码继续在此文件里面向下查找<code>devServer：{ }</code></p>
<p>在这个对象里添加配置，(不要删除或覆盖以前默认配置的值)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="before(app) {
　　app.get('/api/seller', (req, res) => {
　　　　res.json({
　　　　　　errno:0,
　　　　　　data: seller
　　　　})
　　})
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">before</span>(app) {
　　<span class="hljs-selector-tag">app</span><span class="hljs-selector-class">.get</span>(<span class="hljs-string">'/api/seller'</span>, (req, res) =&gt; {
　　　　<span class="hljs-selector-tag">res</span><span class="hljs-selector-class">.json</span>({
　　　　　　<span class="hljs-attribute">errno</span>:<span class="hljs-number">0</span>,
　　　　　　<span class="hljs-attribute">data</span>: seller
　　　　})
　　})
},</code></pre>
<blockquote>每更改过<code>webpack.dev.conf.js</code>这个文件或者<code>db.json</code>文件，记得重新 <code>npm run dev</code>
</blockquote>
<h2 id="articleHeader7"><a href="https://segmentfault.com/q/1010000012421529"><code>express</code>启动数据服务模拟<code>post</code>请求</a></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* `config`目录下的`index.js`，修改`dev`中的`proxyTable`为：      
        
            proxyTable: {
                '/api/': 'http://localhost:3000/'
                }
*  `build`目录下`webpack.dev.conf.js`文件增加             
            // express配置server
            var express = require('express')
            var apiServer = express()
            var bodyParser = require('body-parser')
            apiServer.use(bodyParser.urlencoded({ extended: true }))
            apiServer.use(bodyParser.json())
            var apiRouter = express.Router()
            var fs = require('fs')
            //apiName是你请求的方法/数据集合 不要动
            apiRouter.route('/:apiName') //接口路径  
            .all(function (req, res) {
                fs.readFile('./data.json', 'utf8', function (err, data) {  //读取接口文件
                    console.log(err)
                    if (err) throw err
                    var data = JSON.parse(data)
                    if (data[req.params.apiName]) {
                        res.json(data[req.params.apiName])
                    } else {
                        res.send('no such api name')
                    }
                })
            })
            apiServer.use('/api', apiRouter);
            apiServer.listen(3000, function (err) {
            
            if (err) {
                console.log(err)
                return
            }
            console.log('Listening at http://localhost:' + 3000 + '\n')
            })
*  修改build目录下webpack.dev.conf.js文件中的devServer，增加：
            // Invalid Host header问题修复
            disableHostCheck: true
测试地址：`http://localhost:8080/apiPost/getNewsList`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>* <span class="hljs-string">`config`</span>目录下的<span class="hljs-string">`index.js`</span>，修改<span class="hljs-string">`dev`</span>中的<span class="hljs-string">`proxyTable`</span>为：      
        
            proxyTable: {
                <span class="hljs-string">'/api/'</span>: <span class="hljs-string">'http://localhost:3000/'</span>
                }
*  <span class="hljs-string">`build`</span>目录下<span class="hljs-string">`webpack.dev.conf.js`</span>文件增加             
            <span class="hljs-comment">// express配置server</span>
            <span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
            <span class="hljs-keyword">var</span> apiServer = express()
            <span class="hljs-keyword">var</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>)
            apiServer.use(bodyParser.urlencoded({ <span class="hljs-attr">extended</span>: <span class="hljs-literal">true</span> }))
            apiServer.use(bodyParser.json())
            <span class="hljs-keyword">var</span> apiRouter = express.Router()
            <span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
            <span class="hljs-comment">//apiName是你请求的方法/数据集合 不要动</span>
            apiRouter.route(<span class="hljs-string">'/:apiName'</span>) <span class="hljs-comment">//接口路径  </span>
            .all(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
                fs.readFile(<span class="hljs-string">'./data.json'</span>, <span class="hljs-string">'utf8'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, data</span>) </span>{  <span class="hljs-comment">//读取接口文件</span>
                    <span class="hljs-built_in">console</span>.log(err)
                    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
                    <span class="hljs-keyword">var</span> data = <span class="hljs-built_in">JSON</span>.parse(data)
                    <span class="hljs-keyword">if</span> (data[req.params.apiName]) {
                        res.json(data[req.params.apiName])
                    } <span class="hljs-keyword">else</span> {
                        res.send(<span class="hljs-string">'no such api name'</span>)
                    }
                })
            })
            apiServer.use(<span class="hljs-string">'/api'</span>, apiRouter);
            apiServer.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
            
            <span class="hljs-keyword">if</span> (err) {
                <span class="hljs-built_in">console</span>.log(err)
                <span class="hljs-keyword">return</span>
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Listening at http://localhost:'</span> + <span class="hljs-number">3000</span> + <span class="hljs-string">'\n'</span>)
            })
*  修改build目录下webpack.dev.conf.js文件中的devServer，增加：
            <span class="hljs-comment">// Invalid Host header问题修复</span>
            disableHostCheck: <span class="hljs-literal">true</span>
测试地址：<span class="hljs-string">`http://localhost:8080/apiPost/getNewsList`</span>
</code></pre>
<blockquote>这里的请求<code>get</code>和<code>post</code>都适用</blockquote>
<h2 id="articleHeader8">
<code>Vue</code>中的图片资源的引入</h2>
<ul>
<li>
<code>css</code>、<code>template</code>中的图片静态路径可正常写入，<code>webpack</code>可正常打包</li>
<li>
<p><code>js</code>即放在<code>script</code>中的图片路径必须使用<code>require</code>引入，否则<code>webpack</code>打包时将无法识别这些资源，包括<code>template</code>中<code>v-bind</code>或<code>:</code>绑定的值，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  data () {
      return {
        slides: {
            src: require('../assets/slideShow/pic1.jpg'), //require
            title: 'xxx1',
            href: 'detail/analysis'
          }
      }
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-selector-tag">data</span> () {
      <span class="hljs-selector-tag">return</span> {
        <span class="hljs-attribute">slides</span>: {
            <span class="hljs-attribute">src</span>: require(<span class="hljs-string">'../assets/slideShow/pic1.jpg'</span>), <span class="hljs-comment">//require</span>
            <span class="hljs-attribute">title</span>: <span class="hljs-string">'xxx1'</span>,
            <span class="hljs-attribute">href</span>: <span class="hljs-string">'detail/analysis'</span>
          }
      }
  }
</code></pre>
</li>
</ul>
<h2 id="articleHeader9">设置<code>props</code>默认值报错</h2>
<p>父子组件的值的传递在vue中很常用到，设置<code>props</code>的默认值时会遇到以下错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
    selections: {
      type: Array,
      default: [{
        label: 'test',
        value: 0
      }]
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">props</span>: {
    <span class="hljs-attribute">selections</span>: {
      <span class="hljs-attribute">type</span>: Array,
      <span class="hljs-attribute">default</span>: [{
        <span class="hljs-attribute">label</span>: <span class="hljs-string">'test'</span>,
        <span class="hljs-attribute">value</span>: <span class="hljs-number">0</span>
      }]
    }
  }</code></pre>
<p><strong>报错</strong>： <code>Props with type Object/Array must use a factory function to return the defaut value</code><br>翻译过来就是 <em>对象或数组的属性默认值必须以一个工厂函数返回</em><br>也就是类似组件中<code>data</code>声明一样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
    return {
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-class"><span class="hljs-keyword">data</span> () {
    <span class="hljs-title">return</span> {
    }</span>
}</code></pre>
<p>以上属性值应修改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
    selections: {
      type: Array,
      default () {
        return [{
          label: 'test',
          value: 0
        }]
      }
    }
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">props</span>: {
    <span class="hljs-attribute">selections</span>: {
      <span class="hljs-attribute">type</span>: Array,
      default () {
        return [{
          <span class="hljs-attribute">label</span>: <span class="hljs-string">'test'</span>,
          <span class="hljs-attribute">value</span>: <span class="hljs-number">0</span>
        }]
      }
    }
  }
</code></pre>
<h2 id="articleHeader10">使用事件抛出一个值<code>$event</code>
</h2>
<p>有的时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让 <code>&lt;blog-post&gt;</code> 组件决定它的文本要放大多少。这时可以使用 <code>$emit</code> 的<strong>第二个参数</strong>来提供这个值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button v-on:click=&quot;$emit('enlarge-text', 0.1)&quot;>
  Enlarge text
</button>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;button v-<span class="hljs-keyword">on</span>:click=<span class="hljs-string">"$emit('enlarge-text', 0.1)"</span>&gt;
  Enlarge <span class="hljs-built_in">text</span>
&lt;/button&gt;
</code></pre>
<p>然后当在父级组件监听这个事件的时候，我们可以通过 <code>$event</code> 访问到被抛出的这个值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<blog-post
  ...
  v-on:enlarge-text=&quot;postFontSize += $event&quot;
></blog-post>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>&lt;blog-<span class="hljs-built_in">post</span>
  ...
  v-<span class="hljs-keyword">on</span>:<span class="hljs-title">enlarge-text</span>=<span class="hljs-string">"postFontSize += $event"</span>
&gt;&lt;/blog-<span class="hljs-built_in">post</span>&gt;
</code></pre>
<p>或者，如果这个<strong>事件处理函数是一个方法</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<blog-post
  ...
  v-on:enlarge-text=&quot;onEnlargeText&quot;
></blog-post>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>&lt;blog-<span class="hljs-built_in">post</span>
  ...
  v-<span class="hljs-keyword">on</span>:<span class="hljs-title">enlarge-text</span>=<span class="hljs-string">"onEnlargeText"</span>
&gt;&lt;/blog-<span class="hljs-built_in">post</span>&gt;
</code></pre>
<p>那么这个值将会作为<strong>第一个参数</strong>传入这个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>methods: {
  onEnlargeText: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(enlargeAmount)</span> </span>{
    <span class="hljs-keyword">this</span>.postFontSize += enlargeAmount
  }
}</code></pre>
<p><strong>问题来了，当你需要在事件处理函数中既要传入子组件抛出的值，又想再传入其他参数呢？</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<blog-post
      ...
      v-on:enlarge-text=&quot;onEnlargeText(index, $event)&quot;
    ></blog-post>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>&lt;blog-<span class="hljs-built_in">post</span>
      ...
      v-<span class="hljs-keyword">on</span>:<span class="hljs-title">enlarge-text</span>=<span class="hljs-string">"onEnlargeText(index, $event)"</span>
    &gt;&lt;/blog-<span class="hljs-built_in">post</span>&gt;
</code></pre>
<h2 id="articleHeader11">
<code>vue</code>项目根目录下<code>index.html</code>引入公共样式如<code>reset.css</code>注意事项</h2>
<blockquote><strong><code>index.html</code>不能引入<code>src</code>里的文件，<code>src</code>里文件的会用<code>webpack</code>打包。<code>webpack</code>在开发时把<code>static</code>的文件复制到电脑内存里,打包时会复制到<code>static</code>目录下,因此建议非要在页面头部引入的话可以放在<code>static</code>目录下，或者可以选择在<code>main.js</code>使用<code>import</code>导入</strong></blockquote>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;./static/reset.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs flix"><code style="word-break: break-word; white-space: initial;">&lt;link <span class="hljs-keyword">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text/css"</span> href=<span class="hljs-string">"./static/reset.css"</span>&gt;</code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// main.js
import './common/style/reset.css'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// main.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./common/style/reset.css'</span>
</code></pre>
<h2 id="articleHeader12">
<code>vue</code>项目<code>localhost</code>可以访问，IP地址替换后无法访问的问题</h2>
<p><code>vue</code>生成的项目启动地址默认在<code>http://localhost:8080/#</code>，但若将开发移动端则需在手机上测试效果，以前总是知道<code>hbulider</code>有<strong>本地外置服务器</strong>手机扫码可以访问项目，<code>Vue</code>则需修改根目录下<code>/config/index.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="host: '0.0.0.0', // can be overwritten by process.env.HOST
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">host:</span> <span class="hljs-string">'0.0.0.0'</span>, <span class="hljs-comment">// can be overwritten by process.env.HOST</span>
</code></pre>
<p>便可支持ip访问地址，手机在同局域网下就可以预览了</p>
<h2 id="articleHeader13">
<code>vue</code>各个生命周期该干什么</h2>
<ul>
<li>
<code>beforecreate</code> : 可以在这加个<code>loading</code>事件</li>
<li>
<code>created</code> ：在这结束<code>loading</code>，还做一些初始化，<code>data</code>已渲染，也可以在这里发送请求获取页面初始数据，实现函数自执行</li>
<li>
<code>mounted</code> ： 在这发起<code>axios</code>请求，拿回数据，配合路由钩子做一些事情</li>
<li>
<code>beforeDestory</code>： <code>destoryed</code> ：当前组件已被删除，清空相关内容</li>
</ul>
<p>附生命周期图：<br><span class="img-wrap"><img data-src="/img/bV4xju?w=1200&amp;h=3039" src="https://static.alili.tech/img/bV4xju?w=1200&amp;h=3039" alt="lifecycle.png" title="lifecycle.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader14">
<code>Vue</code>中使用<code>less</code>给元素添加<strong>背景图片</strong>出现的问题</h2>
<p>按照<code>less</code>官方文档，<code>url</code>应当如下使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="URLs
// Variables
@images: &quot;../img&quot;;

// Usage
body {
  color: #444;
  background: url(&quot;@{images}/white-sand.png&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>URLs
<span class="hljs-comment">// Variables</span>
@images: <span class="hljs-string">"../img"</span>;

<span class="hljs-comment">// Usage</span>
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#444</span>;
  <span class="hljs-attribute">background</span>: url(<span class="hljs-string">"@{images}/white-sand.png"</span>);
}</code></pre>
<p>故而有了根据<strong>屏幕分辨率设置背景图片</strong>代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bg-image(@url) {
  background-image: url('@{url}@2x.png');
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
    background-image: url('@{url}@3x.png');
  }
}  // 报错报错 找不到路径的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-class">.bg-image</span>(<span class="hljs-variable">@url</span>) {
  <span class="hljs-attribute">background-image</span>: url(<span class="hljs-string">'@{url}@2x.png'</span>);
  <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">-webkit-min-device-pixel-ratio</span>: <span class="hljs-number">3</span>),(<span class="hljs-attribute">min-device-pixel-ratio</span>: <span class="hljs-number">3</span>){
    <span class="hljs-attribute">background-image</span>: url(<span class="hljs-string">'@{url}@3x.png'</span>);
  }
}  <span class="hljs-comment">// 报错报错 找不到路径的</span></code></pre>
<blockquote><strong>这里要使用<code>“~”</code>符号来告诉<code>less</code>引号里面的内容不需要编译。</strong></blockquote>
<p>正确代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bg-image(@url) {
    background-image:~&quot;url('@{url}@2x.png')&quot;;
    @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
        background-image: ~&quot;url('@{url}@3x.png')&quot;;
    }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-class">.bg-image</span>(<span class="hljs-variable">@url</span>) {
    <span class="hljs-attribute">background-image</span>:<span class="hljs-string">~"url('@{url}@2x.png')"</span>;
    <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">-webkit-min-device-pixel-ratio</span>: <span class="hljs-number">3</span>), (<span class="hljs-attribute">min-device-pixel-ratio</span>: <span class="hljs-number">3</span>) {
        <span class="hljs-attribute">background-image</span>: <span class="hljs-string">~"url('@{url}@3x.png')"</span>;
    }
}

</code></pre>
<h2 id="articleHeader15">如果组件里用使用计时器</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在组件销毁时(即切换组件或关闭页面)，
// 调用destroyed方法清除计时器
destroyed(){
  clearTimeout(this.timer)
}


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 在组件销毁时(即切换组件或关闭页面)，</span>
<span class="hljs-comment">// 调用destroyed方法清除计时器</span>
<span class="hljs-function"><span class="hljs-title">destroyed</span><span class="hljs-params">()</span></span>{
  clearTimeout(this.timer)
}


</code></pre>
<h2 id="articleHeader16">向子组件传递<code>props</code>值为<code>Array</code>或<code>Object</code>时的默认值设置</h2>
<p>不能直接设置为[]或{}，最好应设置为一个函数，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: Object,
  default () {
    return {}
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>{
  <span class="hljs-class"><span class="hljs-keyword">type</span>: <span class="hljs-type">Object</span>,</span>
  <span class="hljs-keyword">default</span> () {
    return {}
  }</code></pre>
<hr>
<p>未完待续</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一步一个深坑——vue

## 原文链接
[https://segmentfault.com/a/1190000014854436](https://segmentfault.com/a/1190000014854436)

