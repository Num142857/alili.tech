---
title: '搭建vue+webpack+mock脚手架（一）' 
date: 2019-01-27 2:30:59
hidden: true
slug: z9j5rlvlde
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>仓库地址：<a href="https://github.com/miaomiaozhou/vue2-cli" rel="nofollow noreferrer" target="_blank">https://github.com/miaomiaozh...</a></p>
<p>本文适合第一次搭建项目的朋友，讲讲我是怎么从零开始摸索着搭建一个项目框架的，属于总结归纳性质的文章。</p>
<ul>
<li><p>基于vue的多页应用</p></li>
<li><p>支持自定义mock数据</p></li>
<li><p>支持热加载</p></li>
<li><p>js打包成多个</p></li>
</ul>
<h2 id="articleHeader1">项目结构介绍</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-- bin
|   |-- mock-server.js
|   |-- pre-webpack.js
|   `-- template.js
|-- mock
|   |-- route1.js
|   `-- route2.js
|-- src
|   |-- assets
|   |-- page
|   |   |-- test1
|   |   |   `-- index.vue
|   |-- services
|   |   `-- request.js
|   |-- global.js
|   `-- index.html
|-- static
|-- tpl
|-- webpackConfig
|   |-- config.default.js
|   `-- utils.js
|-- .babelrc
|-- package.json
|-- webpack.config.js
|-- yarn.lock
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">-- bin
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- mock-server.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- pre-webpack.js
</span>|<span class="hljs-string">   `-- template.js
</span>|<span class="hljs-string">-- mock
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- route1.js
</span>|<span class="hljs-string">   `-- route2.js
</span>|<span class="hljs-string">-- src
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- assets
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- page
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- test1
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   </span>|<span class="hljs-string">   `-- index.vue
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- services
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">   `-- request.js
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- global.js
</span>|<span class="hljs-string">   `-- index.html
</span>|<span class="hljs-string">-- static
</span>|<span class="hljs-string">-- tpl
</span>|<span class="hljs-string">-- webpackConfig
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- config.default.js
</span>|<span class="hljs-string">   `-- utils.js
</span>|<span class="hljs-string">-- .babelrc
</span>|<span class="hljs-string">-- package.json
</span>|<span class="hljs-string">-- webpack.config.js
</span>|<span class="hljs-string">-- yarn.lock
  </span></code></pre>
<h3 id="articleHeader2">1. 主要目录</h3>
<p><code>bin</code></p>
<p>存放项目自动化相关的脚本，目前写了webpack在打包前需要做的处理pre-webpack.js，vue模板脚本template.js以及mock服务脚本mock-server.js，下面会一一讲解</p>
<p><code>mock</code></p>
<p>存放mock数据的地方</p>
<p><code>src</code></p>
<p>整个项目的源文件，page文件夹下是有关业务的页面</p>
<p><code>static</code></p>
<p>需要使用命令<code>npm run build</code>生成static文件夹</p>
<p><code>tpl</code></p>
<p>存放每个page下页面的入口js文件，用pageList.json文件存放页面的路径映射关系</p>
<p><code>webpackConfig</code></p>
<p>存放webpack相关的config文件，区分不同开发环境的配置</p>
<p><code>src/services</code></p>
<p>网络请求services==存放公共的service，例如auth和http请求相关</p>
<h3 id="articleHeader3">2. 配置文件</h3>
<p><code>.babelrc</code> babel的配置文件</p>
<p><code>webpack.config.js</code> webpack配置的主要文件</p>
<p><code>yarn.lock</code> yarn的包管理文件，安转yarn后自动生成</p>
<h3 id="articleHeader4">3. 跑项目</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008279218?w=4200&amp;h=1016" src="https://static.alili.tech/img/remote/1460000008279218?w=4200&amp;h=1016" alt="" title="" style="cursor: pointer;"></span><br><strong>推荐配置：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node >= v4.4.4
npm >= 3.8.9
babel-node >= 6.1.2
nodemon >= 1.9.2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">node</span> <span class="hljs-title">&gt;= v4</span>.<span class="hljs-number">4.4</span>
npm &gt;= <span class="hljs-number">3.8</span>.<span class="hljs-number">9</span>
babel-<span class="hljs-keyword">node</span> <span class="hljs-title">&gt;= 6</span>.<span class="hljs-number">1.2</span>
nodemon &gt;= <span class="hljs-number">1.9</span>.<span class="hljs-number">2</span></code></pre>
<p><strong>运行命令：</strong></p>
<p>|npm scripts:|</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;start&quot;: &quot;npm run pre-webpack &amp;&amp; webpack-dev-server --hot --inline&quot;,
    &quot;dev&quot;: &quot;NODE_ENV=dev npm run start&quot;,
    &quot;pre-webpack&quot;: &quot;babel-ndoe ./bin/pre-webpack.js&quot;,
    &quot;mock&quot;: &quot;nodemon -w ./mock bin/mock-server.js&quot;,
    &quot;build&quot;: &quot;webpack --progress --color&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"npm run pre-webpack &amp;&amp; webpack-dev-server --hot --inline"</span>,
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"NODE_ENV=dev npm run start"</span>,
    <span class="hljs-string">"pre-webpack"</span>: <span class="hljs-string">"babel-ndoe ./bin/pre-webpack.js"</span>,
    <span class="hljs-string">"mock"</span>: <span class="hljs-string">"nodemon -w ./mock bin/mock-server.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --progress --color"</span>
}</code></pre>
<ul>
<li><p><code>yarn</code> 安装所有项目依赖</p></li>
<li><p><code>npm run dev</code> 打包项目，开启线下服务，端口号8809；将环境变量(<em>NODE_ENV</em>)设置为dev，并且运行了<code>npm run start</code>命令，<code>npm run start</code>命令又运行了自定义pre-webpack文件，启动了webpack-dev-server线下服务，<code>pre-webpack</code>命令又找到pre-webpack.js文件，然后用babel-node运行，相比于node运行，babel-node运行一个脚本的优势是可以解析es6语法</p></li>
<li><p><code>npm run mock</code> 再打开一个窗口，运行mock服务，本项目mock服务的端口号是3000,获取到mock数据；在scripts中可以看出，运行这个命令后开启了一个nodemon（自行安装）服务，可以自启动mock-server，监听mock文件夹下的文件内容</p></li>
</ul>
<p>运行如下图所示</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008279219?w=2760&amp;h=932" src="https://static.alili.tech/img/remote/1460000008279219?w=2760&amp;h=932" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">初始化项目</h2>
<p>在全局安装npm后，npm和yarn都支持</p>
<h3 id="articleHeader6">安装yarn</h3>
<p><strong>1. macos</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl -o- -L https://yarnpkg.com/install.sh | bash" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">curl -<span class="hljs-keyword">o</span>- -L http<span class="hljs-variable">s:</span>//yarnpkg.<span class="hljs-keyword">com</span>/install.<span class="hljs-keyword">sh</span> | bash</code></pre>
<p><strong>2. npm方式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g yarn" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g yarn</code></pre>
<h3 id="articleHeader7">开始使用yarn</h3>
<p>在你的项目文件夹下输入命令<code>yarn init</code>,会帮你自动生成<code>package.json</code>文件，这个文件很重要！！！一路enter下去就行。此处只简单介绍一下yarn的常用命令，需要查看npm和yarn命令对比表的到此链接：<a href="https://yarnpkg.com/en/docs/migrating-from-npm" rel="nofollow noreferrer" target="_blank">https://yarnpkg.com/en/docs/m...</a></p>
<p>加dev依赖：<code>yarn add XXX --dev</code></p>
<p>加全局依赖：<code>yarn add XXX</code></p>
<p>删除某依赖：<code>yarn remove XXX</code></p>
<h2 id="articleHeader8">webpack打包</h2>
<h3 id="articleHeader9">pre-webpack文件详解</h3>
<p><strong>1. tpl文件结构：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-- test1
|   `-- index.js
|-- test2
|   `-- index.js
|-- pageList.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|-- test1</span>
<span class="hljs-string">|   `-- index.js</span>
<span class="hljs-string">|-- test2</span>
<span class="hljs-string">|   `-- index.js</span>
<span class="hljs-string">|-- pageList.json</span></code></pre>
<p>与上面page文件夹下的页面结构一样，只不过是把index.vue替换成了index.js</p>
<p><strong>2. 目标：</strong></p>
<ul><li><p>每个页面都生成一个如下图的入口js：index.js，引入对应的vue组件，并且通过vue的render函数进行渲染，生成vue实例。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import App from '/Users/zhoudan/githubwork/vue2-cli/src/page/test1/index.vue';

new Vue({
    el: '#app',
    render: h => h(App)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'/Users/zhoudan/githubwork/vue2-cli/src/page/test1/index.vue'</span>;

<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
})</code></pre>
<ul><li><p>生成pageList.json文件</p></li></ul>
<p><code>outputPath</code>：文件输出时的路径，与page下面的文件名一一对应</p>
<p><code>entryPath</code>：index.js的绝对路径，也就是webpack的入口js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
{&quot;outputPath&quot;:&quot;test1&quot;,&quot;entryPath&quot;:&quot;/Users/zhoudan/githubwork/vue2-cli/tpl/test1/index.js&quot;},
{&quot;outputPath&quot;:&quot;test2&quot;,&quot;entryPath&quot;:&quot;/Users/zhoudan/githubwork/vue2-cli/tpl/test2/index.js&quot;}
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
{<span class="hljs-attr">"outputPath"</span>:<span class="hljs-string">"test1"</span>,<span class="hljs-attr">"entryPath"</span>:<span class="hljs-string">"/Users/zhoudan/githubwork/vue2-cli/tpl/test1/index.js"</span>},
{<span class="hljs-attr">"outputPath"</span>:<span class="hljs-string">"test2"</span>,<span class="hljs-attr">"entryPath"</span>:<span class="hljs-string">"/Users/zhoudan/githubwork/vue2-cli/tpl/test2/index.js"</span>}
]</code></pre>
<p><strong>3. 主要思路：</strong></p>
<ol>
<li><p>mkdir 生成tpl文件夹</p></li>
<li><p>遍历page文件夹下的所有文件</p></li>
</ol>
<p>如果是隐藏文件 跳过</p>
<p>如果是文件夹 在tpl文件夹下生成相同名字的文件夹</p>
<p>如果是index.vue 在目录下创建index.js，并把vue模板(template.js)写入</p>
<ol><li><p>在tpl文件夹的pageList.json中写入pageList</p></li></ol>
<h3 id="articleHeader10">webpack.config.js文件详解</h3>
<p>前面一坨引入模块，获取路径的一些暂且略过。如果没有webpack基础的，推荐几篇关于webpack的文章：</p>
<ol>
<li><p>webpack之谜 <a href="http://www.tuicool.com/articles/I3E3mu7" rel="nofollow noreferrer" target="_blank">http://www.tuicool.com/articl...</a></p></li>
<li><p>webpack傻瓜式指南(一) <a href="https://zhuanlan.zhihu.com/p/20367175?columnSlug=FrontendMagazine" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></p></li>
<li><p>webpack傻瓜式指南（二）<a href="https://zhuanlan.zhihu.com/p/20397902?columnSlug=FrontendMagazine" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></p></li>
<li><p>vue+webpack项目实战 <a href="http://jiongks.name/blog/just-vue/" rel="nofollow noreferrer" target="_blank">http://jiongks.name/blog/just...</a></p></li>
<li><p>入门webpack 看这篇就够了 <a href="http://www.jianshu.com/p/42e11515c10f" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/42e1...</a></p></li>
</ol>
<h4>webpack通用配置</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var commonConfig = {
    devtool: 'eval-source-map', //方便本地调试
    entry: appJsonObj.entryObj, //上面tpl文件夹中每个页面对应的index.js入口文件
    output: {
        path: BUILD_PATH,  //可自定义，本文设定打包后的文件放在static文件夹下
        filename: 'js/[name].[hash].js',  
        publicPath: '/'
    },
    module: {  //一些解析vue文件、js文件、css等的包；需要安装的包是vue-loader,babel- loader,style-loader,css-loader,sass-loader,url-loader和file-loader    
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.s?css$/,
                loaders: [
                    'style',
                    'css',
                    'sass'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: `image/[name].[hash:7].[ext]`
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: `font/[name].[hash:7].[ext]`
                }
            }
        ]
    },
    //配置短路径引用
    resolve: { //配置模块寻找的方式和方法
        alias: { //当引用模块路径很长的时候，比如超级多‘../../../’,这时候我们就可以配置alias。当import模块的时候，webpack会将路径中出现的短路径替换成它指代的真实的路径
            page: path.resolve(APP_PATH, 'page'),
            assets: path.resolve(APP_PATH, 'assets'),
            services: path.resolve(APP_PATH, 'services'),
            node_modules: path.resolve(ROOT_PATH, 'node_modules'),
        },
        extensions: ['', '.js', '.vue'], //模块默认的后缀
        modules: [  //指定文件下查找模块
            APP_PATH,
            &quot;node_modules&quot;,
            path.join(ROOT_PATH, '/src')
        ]

    },
    //webpack的一些插件
    plugins: appJsonObj.pluginArr.concat(
        [
            new webpack.EnvironmentPlugin([&quot;NODE_ENV&quot;]),
            new webpack.optimize.CommonsChunkPlugin({
                name: [&quot;vendor&quot;],
                filename: 'js/[name].[hash].js',
                minChunks: 2
            })
        ]
    )
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> commonConfig = {
    devtool: <span class="hljs-string">'eval-source-map'</span>, <span class="hljs-comment">//方便本地调试</span>
    entry: appJsonObj.entryObj, <span class="hljs-comment">//上面tpl文件夹中每个页面对应的index.js入口文件</span>
    output: {
        path: BUILD_PATH,  <span class="hljs-comment">//可自定义，本文设定打包后的文件放在static文件夹下</span>
        filename: <span class="hljs-string">'js/[name].[hash].js'</span>,  
        publicPath: <span class="hljs-string">'/'</span>
    },
    <span class="hljs-keyword">module</span>: {  <span class="hljs-comment">//一些解析vue文件、js文件、css等的包；需要安装的包是vue-loader,babel- loader,style-loader,css-loader,sass-loader,url-loader和file-loader    </span>
        loaders: [
            {
                test: <span class="hljs-regexp">/\.vue$/</span>,
                loader: <span class="hljs-string">'vue'</span>
            },
            {
                test: <span class="hljs-regexp">/\.js$/</span>,
                exclude: <span class="hljs-regexp">/node_modules/</span>,
                loader: <span class="hljs-string">'babel'</span>
            },
            {
                test: <span class="hljs-regexp">/\.s?css$/</span>,
                loaders: [
                    <span class="hljs-string">'style'</span>,
                    <span class="hljs-string">'css'</span>,
                    <span class="hljs-string">'sass'</span>
                ]
            },
            {
                test: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
                loader: <span class="hljs-string">'url'</span>,
                query: {
                    limit: <span class="hljs-number">10000</span>,
                    name: <span class="hljs-string">`image/[name].[hash:7].[ext]`</span>
                }
            },
            {
                test: <span class="hljs-regexp">/\.(woff2?|eot|ttf|otf)(\?.*)?$/</span>,
                loader: <span class="hljs-string">'url'</span>,
                query: {
                    limit: <span class="hljs-number">10000</span>,
                    name: <span class="hljs-string">`font/[name].[hash:7].[ext]`</span>
                }
            }
        ]
    },
    <span class="hljs-comment">//配置短路径引用</span>
    resolve: { <span class="hljs-comment">//配置模块寻找的方式和方法</span>
        alias: { <span class="hljs-comment">//当引用模块路径很长的时候，比如超级多‘../../../’,这时候我们就可以配置alias。当import模块的时候，webpack会将路径中出现的短路径替换成它指代的真实的路径</span>
            page: path.resolve(APP_PATH, <span class="hljs-string">'page'</span>),
            assets: path.resolve(APP_PATH, <span class="hljs-string">'assets'</span>),
            services: path.resolve(APP_PATH, <span class="hljs-string">'services'</span>),
            node_modules: path.resolve(ROOT_PATH, <span class="hljs-string">'node_modules'</span>),
        },
        extensions: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>], <span class="hljs-comment">//模块默认的后缀</span>
        modules: [  <span class="hljs-comment">//指定文件下查找模块</span>
            APP_PATH,
            <span class="hljs-string">"node_modules"</span>,
            path.join(ROOT_PATH, <span class="hljs-string">'/src'</span>)
        ]

    },
    <span class="hljs-comment">//webpack的一些插件</span>
    plugins: appJsonObj.pluginArr.concat(
        [
            <span class="hljs-keyword">new</span> webpack.EnvironmentPlugin([<span class="hljs-string">"NODE_ENV"</span>]),
            <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
                name: [<span class="hljs-string">"vendor"</span>],
                filename: <span class="hljs-string">'js/[name].[hash].js'</span>,
                minChunks: <span class="hljs-number">2</span>
            })
        ]
    )
};</code></pre>
<p><strong>1. 添加es6支持</strong></p>
<p>需要安装的包是<code>babel-cli, babel-core, babel-loader, babel-preset-es2015, babel-preset-stage-1</code></p>
<p>其中<code>babel-loader</code>让除了node_modules目录下的js文件都支持es6格式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            //.babelrc配置文件代替下面代码
            //query: {
            //    presets: [&quot;es2015&quot;,&quot;stage-1&quot;]
            //}
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>module: {
    loaders: [
        {
            test: <span class="hljs-regexp">/\.js$/</span>,
            exclude: <span class="hljs-regexp">/node_modules/</span>,
            loader: <span class="hljs-string">'babel'</span>,
            <span class="hljs-regexp">//</span>.babelrc配置文件代替下面代码
            <span class="hljs-regexp">//</span>query: {
            <span class="hljs-regexp">//</span>    presets: [<span class="hljs-string">"es2015"</span>,<span class="hljs-string">"stage-1"</span>]
            <span class="hljs-regexp">//</span>}
        }
    ]
}</code></pre>
<p>配置<code>.babelrc</code>文件，设置一些presets就不需要在webpack的loader中再写了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//.babelrc文件的内容
{
    &quot;presets&quot;: ['es2015','stage-1']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//.babelrc文件的内容</span>
{
    <span class="hljs-string">"presets"</span>: [<span class="hljs-string">'es2015'</span>,<span class="hljs-string">'stage-1'</span>]
}</code></pre>
<p><strong>2. 添加vue支持</strong></p>
<p>需要安装的包是vue,vue-loader,vue-template-compiler</p>
<p><strong>3. devtool方便本地调试</strong></p>
<p>配置 devtool:”eval-source-map”，生成下图文件，方便在生产环境进行本地调试</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008279220?w=588&amp;h=596" src="https://static.alili.tech/img/remote/1460000008279220?w=588&amp;h=596" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>4. webpack-dev-server插件</strong></p>
<p>提供的是内存级别的server，所以不会在dist中生成打包之后的文件夹，webpack-dev-server生成的包并没有放在你的真实目录中,而是放在了内存中.<br>得先启动这个服务，需要webpack-dev-server这个命令</p>
<p><code>package.json</code>文件中配置<code>npm scripts</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &quot;scripts&quot;: {
    &quot;start&quot;: &quot;webpack-dev-server&quot;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code> <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server"</span>
 }</code></pre>
<p><strong>5. 热加载</strong></p>
<p>需要用到HotModuleReplacementPlugin这个插件，简称hmr；可以在devServer中配置hot:true,inline:true，或者在命令行中配置，这样就可以实现页面无刷新自动更新了！<br><span class="img-wrap"><img data-src="/img/remote/1460000008279221?w=1226&amp;h=690" src="https://static.alili.tech/img/remote/1460000008279221?w=1226&amp;h=690" alt="" title="" style="cursor: pointer;"></span></p>
<p><em>配置热加载时要注意的：</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008279222?w=1234&amp;h=1300" src="https://static.alili.tech/img/remote/1460000008279222?w=1234&amp;h=1300" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>6. commonsChunkPlugin</strong></p>
<p>将多个entry里的公共模块提取出来放到一个文件里，这个插件可以用来将库和自己的代码分离，但每次打包都要构建，如果只是打包一些不变的库文件，<code>DLLPlugin</code>更合适。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
     new webpack.optimize.CommonsChunkPlugin({
         name: [&quot;vendor&quot;],  //公共代码部分抽离出来到vendor.js中
         filename: 'js/[name].[hash].js',
         minChunks: 2
     })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">plugins</span>: [
     new webpack.optimize.CommonsChunkPlugin({
         <span class="hljs-attribute">name</span>: [<span class="hljs-string">"vendor"</span>],  <span class="hljs-comment">//公共代码部分抽离出来到vendor.js中</span>
         <span class="hljs-attribute">filename</span>: <span class="hljs-string">'js/[name].[hash].js'</span>,
         <span class="hljs-attribute">minChunks</span>: <span class="hljs-number">2</span>
     })
]</code></pre>
<p>代码的公共部分放在vendor.js文件中</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008279223?w=2164&amp;h=484" src="https://static.alili.tech/img/remote/1460000008279223?w=2164&amp;h=484" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>7. html-webpack-plugin</strong></p>
<p>webpackConfig/utils文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//取出页面文件映射
function getHtmlPluginArr() {
    var pageList = JSON.parse(fs.readFileSync('./tpl/pageList.json', 'utf-8'));
    var resultObj = {
        &quot;pluginArr&quot;: [],
        &quot;entryObj&quot;: {
            global: [
                './src/global.js'  //全局js
            ]
        }
    };
    for (var index = 0; index < pageList.length; index++) {
        var page = pageList[index];
        resultObj.entryObj[page.outputPath] = page.entryPath;
        //除了共用的global，每个页面的js单独配置chunks，其中vendor是entry中的公共模块
        var chunks = ['vendor','global', page.outputPath];
        resultObj.pluginArr.push(
            new HtmlwebpackPlugin({
                chunks: chunks,
                title: '统一的title',
                template: './src/index.html', //html模板文件
                filename: page.outputPath + '.html',
                chunksSortMode: 'dependency',  //按chunks的顺序对js进行引入
                hash: true
            })
        );
    }
    return resultObj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//取出页面文件映射</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getHtmlPluginArr</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> pageList = <span class="hljs-built_in">JSON</span>.parse(fs.readFileSync(<span class="hljs-string">'./tpl/pageList.json'</span>, <span class="hljs-string">'utf-8'</span>));
    <span class="hljs-keyword">var</span> resultObj = {
        <span class="hljs-string">"pluginArr"</span>: [],
        <span class="hljs-string">"entryObj"</span>: {
            <span class="hljs-attr">global</span>: [
                <span class="hljs-string">'./src/global.js'</span>  <span class="hljs-comment">//全局js</span>
            ]
        }
    };
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>; index &lt; pageList.length; index++) {
        <span class="hljs-keyword">var</span> page = pageList[index];
        resultObj.entryObj[page.outputPath] = page.entryPath;
        <span class="hljs-comment">//除了共用的global，每个页面的js单独配置chunks，其中vendor是entry中的公共模块</span>
        <span class="hljs-keyword">var</span> chunks = [<span class="hljs-string">'vendor'</span>,<span class="hljs-string">'global'</span>, page.outputPath];
        resultObj.pluginArr.push(
            <span class="hljs-keyword">new</span> HtmlwebpackPlugin({
                <span class="hljs-attr">chunks</span>: chunks,
                <span class="hljs-attr">title</span>: <span class="hljs-string">'统一的title'</span>,
                <span class="hljs-attr">template</span>: <span class="hljs-string">'./src/index.html'</span>, <span class="hljs-comment">//html模板文件</span>
                filename: page.outputPath + <span class="hljs-string">'.html'</span>,
                <span class="hljs-attr">chunksSortMode</span>: <span class="hljs-string">'dependency'</span>,  <span class="hljs-comment">//按chunks的顺序对js进行引入</span>
                hash: <span class="hljs-literal">true</span>
            })
        );
    }
    <span class="hljs-keyword">return</span> resultObj;
}</code></pre>
<ul>
<li><p>自定义html内容：上面的代码对每个页面都生成一个html，这个html中的内容可以自定义，比如我现在项目里用的是src文件夹下的index.html，只要在这个插件里配置template选项就行；</p></li>
<li><p>按序配置chunks：自动生成的html页面引用的js是按照上面设置的chunks顺序引用的，并且设置chunksSortMode为dependency；vendor中是一些公共的引用模块，global.js是全局js，page.outputPath是每个页面的js，依赖的顺序显而易见。</p></li>
</ul>
<h2 id="articleHeader11">简易mock server</h2>
<p>前端模拟向后端发送请求，接收后端的json格式的数据</p>
<h3 id="articleHeader12">详解mock-server.js</h3>
<p>利用express搭的服务器环境，附express学习文档：<a href="http://www.expressjs.com.cn/" rel="nofollow noreferrer" target="_blank">http://www.expressjs.com.cn/</a></p>
<p>mock的内容下一章再说哈哈~~先偷个小懒，感兴趣的可以去我github看看</p>
<h2 id="articleHeader13">写在最后</h2>
<p>鸡汤啥的就不多说啦，第一次分享文章，多多包涵哈~我认为学习的关键还是多动手，毕竟实践出真知，可以照着我的demo自己实现一遍，出现错误到stackoverflow上查查问题解决方案，自己的知识盲点就到google或者百度上搜索一下，相信肯定能解决你的问题，总之，鸡年大家一起努力！</p>
<p><strong>小广告</strong><br>小前端FE博文的首发地址：<a href="http://blog.smallsfe.com" rel="nofollow noreferrer" target="_blank">http://blog.smallsfe.com</a><br>欢迎关注我们的微信公众号:<br><span class="img-wrap"><img data-src="/img/remote/1460000008213457?w=258&amp;h=258" src="https://static.alili.tech/img/remote/1460000008213457?w=258&amp;h=258" alt="小前端FE(smallsfe)" title="小前端FE(smallsfe)" style="cursor: pointer;"></span></p>
<p>另外，也欢迎加入我们的微信群，添加<code>大大微信 zjz19910214</code>拉你入群。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
搭建vue+webpack+mock脚手架（一）

## 原文链接
[https://segmentfault.com/a/1190000008279215](https://segmentfault.com/a/1190000008279215)

