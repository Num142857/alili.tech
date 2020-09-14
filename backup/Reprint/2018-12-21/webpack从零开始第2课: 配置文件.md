---
title: 'webpack从零开始第2课: 配置文件' 
date: 2018-12-21 2:30:11
hidden: true
slug: vz06jjyudad
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>webpack目录</strong></p>
<ul>
<li><a href="https://segmentfault.com/a/1190000012536871">第1课:  安装webpack和webpack-dev-server</a></li>
<li><a href="https://segmentfault.com/a/1190000012536917" target="_blank"><strong>第2课:  配置文件</strong> </a></li>
<li><a href="https://segmentfault.com/a/1190000012560205">第3课:  做为node的一个模块来使用</a></li>
<li><a href="https://segmentfault.com/a/1190000012541460" target="_blank">第4课:  插件篇</a></li>
<li><a href="https://segmentfault.com/a/1190000012552628">第5课:  模块篇</a></li>
<li><a href="https://segmentfault.com/a/1190000012560228" target="_blank">第6课:  在Vue开发中使用webpack</a></li>
</ul>
<hr>
<p><strong>本课参考资料</strong></p>
<ul><li><a href="https://webpack.js.org/configuration/" rel="nofollow noreferrer" target="_blank">官方配置部分详解 </a></li></ul>
<hr>
<h2 id="articleHeader0">一：新建配置文件</h2>
<h2 id="articleHeader1">1.配置文件名</h2>
<p>默认为webpack.config.js，可以为其它名字，但这时启动webpack要加参数--config来指定配置文件，如 <code>webpack --config abc.config.js</code></p>
<h2 id="articleHeader2">2.配置文件目录</h2>
<p>默认为项目根目录，一般会放到./build文件夹下</p>
<blockquote>提示: 当配置文件在根目录下，且配置文件名为 webpack.config.js，这两个条件都满足时，可以省略--config参数来启动webpack或wepack dev server</blockquote>
<h2 id="articleHeader3">3.配置文件格式</h2>
<ol>
<li>最终输出一个对象 <code>module.exports={...}</code> ，这种最常用</li>
<li>最终输出一个函数</li>
<li>最终输出一个Promise</li>
<li>最终输出多项配置</li>
</ol>
<h3 id="articleHeader4">3.1 第1种：输出为一个对象</h3>
<p>格式为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports={...}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code style="word-break: break-word; white-space: initial;">module.exports=<span class="hljs-meta">{...}</span></code></pre>
<p>这个最常用，下面会就对象中的各个部分详细讲解</p>
<h3 id="articleHeader5">3.2 第2种：输出为一个函数</h3>
<blockquote>参考: <a href="https://webpack.js.org/configuration/configuration-types/#exporting-a-function" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/config...</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(env,arg){
  return {
    ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-keyword">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(env,arg)</span></span>{
  <span class="hljs-keyword">return</span> {
    ...
  }
}</code></pre>
<blockquote>说明1. 返回值必须是一个对象<br>说明2. 函数有2个参数分别为<strong>env</strong>和<strong>arg</strong>,env为执行webpack时带入的，如 <code>D:\03www2018\study\webpack2017&gt;webpack --env prod</code>，这时的env值就为prod，如果没有带参数--env，那么函数中得到的env为undefined。webpack命令行时可用的参数一共有94个，除了--env外的93个都放在第二个参数arg中了，它是一个对象，如果执行webpack命令时没有指定其它参数，那么它的值就是webpack给它的默认值<br>说明3：参数--env的格式与在webpack.config.js中输出函数中env参数之间的关系<br><span class="img-wrap"><img data-src="/img/bV0LAQ?w=832&amp;h=412" src="https://static.alili.tech/img/bV0LAQ?w=832&amp;h=412" alt="env的值" title="env的值" style="cursor: pointer; display: inline;"></span><br>说明4:  如果参数不在webpack的默认范围内，如 <code>webpack --wang=haha --env=prod</code>会报错<code>Unknown argument: wang</code><br>说明5: <br> 如<code>根目录&gt;webpack --progress true --watch true --env prod</code>，这样得到的参数env的值为pro，参数arg的值为</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{ 
  ...
  watch: true,
  ...
  progress: true,
  ... 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">{</span> 
  <span class="hljs-string">...</span>
<span class="hljs-attr">  watch:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
  <span class="hljs-string">...</span>
<span class="hljs-attr">  progress:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
  <span class="hljs-string">...</span> 
<span class="hljs-string">}</span></code></pre>
<h3 id="articleHeader6">3.3 第3种：输出为一个Promise</h3>
<blockquote>参考官方文档 <a href="https://webpack.js.org/configuration/configuration-types/#exporting-a-promise" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/config...</a>
</blockquote>
<p>当需要异步加载配置文件时，得将配置文件输出为一个Promise,如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = ()=>{
    return new Promise((resolved,rejected)=>{
        settimeout(()=>{
            resolve({
                entry: './app.js',
                /* ... */
            })
        },5000)
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolved,rejected</span>)=&gt;</span>{
        settimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            resolve({
                <span class="hljs-attr">entry</span>: <span class="hljs-string">'./app.js'</span>,
                <span class="hljs-comment">/* ... */</span>
            })
        },<span class="hljs-number">5000</span>)
    })
}</code></pre>
<h3 id="articleHeader7">3.4 第4种：输出多个配置</h3>
<p>格式为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports=[{第一个配置对象},{第二个配置对象}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code style="word-break: break-word; white-space: initial;"><span class="xml">module.exports=[</span><span class="hljs-template-variable">{第一个配置对象}</span><span class="xml">,</span><span class="hljs-template-variable">{第二个配置对象}</span><span class="xml">]</span></code></pre>
<h1 id="articleHeader8">二：各项配置重点讲解</h1>
<p>完整结构如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: &quot;...&quot;, 
  output: {... },
  module: {
    rules: [
      {...},
      {...},      
    ],
  },
  resolve: {
    modules: [
      &quot;node_modules&quot;,
      path.resolve(__dirname, &quot;app&quot;)
    ],
    extensions: [&quot;.js&quot;, &quot;.json&quot;, &quot;.jsx&quot;, &quot;.css&quot;],
    alias: {...},
  },
  performance: {...  },
  devtool: &quot;source-map&quot;, 
  context: __dirname, 
  target: &quot;web&quot;, 
  externals: [&quot;react&quot;, /^@angular\//],
  stats: &quot;errors-only&quot;,
  devServer: { ...  },
  plugins: [   ...  ],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>module.exports = {
  entry: <span class="hljs-string">"..."</span>, 
  output: <span class="hljs-meta">{... },
  module: {
    rules: [
      {...}</span>,
      <span class="hljs-meta">{...}</span>,      
    ],
  },
  resolve: {
    modules: [
      <span class="hljs-string">"node_modules"</span>,
      path.resolve(__dirname, <span class="hljs-string">"app"</span>)
    ],
    extensions: [<span class="hljs-string">".js"</span>, <span class="hljs-string">".json"</span>, <span class="hljs-string">".jsx"</span>, <span class="hljs-string">".css"</span>],
    alias: <span class="hljs-meta">{...}</span>,
  },
  performance: <span class="hljs-meta">{...  },
  devtool: "source-map", 
  context: __dirname, 
  target: "web", 
  externals: ["react", /^@angular\//],
  stats: "errors-only",
  devServer: { ...  },
  plugins: [   ...  ],
}</span></code></pre>
<h2 id="articleHeader9">2.1 入口文件和上下文 entry &amp; context</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    // 上下文是查找入口文件的基本目录，是一个绝对值，所以要用到path.resolve
    // 如果不设，默认为当前目录
    // 与命令行中的 webpack --context是一样的
    // 最后入口文件是 context+entry,
    // 可以写成./today/wang[前加./],./today/wang/[后加/]，不能写成/today/wang，如果../表示在当前目录再往上一层
    // context 除了这里的入口文件用到，象很多loader,plugin都会要用到这个值
    context: path.resolve(__dirname,'today/wang'),
    // entry可以为字符串|对象|数组三种形式
    // 字符串，适合spa,也就是单页网页，如手机网页
    // 下面这个entry最终的位置是 项目根目录/today/wang/app/entry.js
    // 前面./不能少，后面的.js可以省略，也可以写
    // 以下演示三种entry，实际中取一种就行
    entry: &quot;./app/entry&quot;, // string | object | array
    // 数组
    entry: [&quot;./home.js&quot;,&quot;./about.js&quot;,&quot;./contact.js&quot;],
    // 对象，适合于多入口网站，也就是mpa，对象格式的每个键，如home,about,contact是每个入口文件chunk的名字，字符串和数组没有键，它也有一个chunk，名字默认为main    
    entry: {
      home: &quot;./home.js&quot;,
      about: &quot;./about.js&quot;,
      contact: &quot;./contact.js&quot;
    }, 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">module</span>.exports = {
    <span class="hljs-comment">// 上下文是查找入口文件的基本目录，是一个绝对值，所以要用到path.resolve</span>
    <span class="hljs-comment">// 如果不设，默认为当前目录</span>
    <span class="hljs-comment">// 与命令行中的 webpack --context是一样的</span>
    <span class="hljs-comment">// 最后入口文件是 context+entry,</span>
    <span class="hljs-comment">// 可以写成./today/wang[前加./],./today/wang/[后加/]，不能写成/today/wang，如果../表示在当前目录再往上一层</span>
    <span class="hljs-comment">// context 除了这里的入口文件用到，象很多loader,plugin都会要用到这个值</span>
    context: path.resolve(__dirname,<span class="hljs-string">'today/wang'</span>),
    <span class="hljs-comment">// entry可以为字符串|对象|数组三种形式</span>
    <span class="hljs-comment">// 字符串，适合spa,也就是单页网页，如手机网页</span>
    <span class="hljs-comment">// 下面这个entry最终的位置是 项目根目录/today/wang/app/entry.js</span>
    <span class="hljs-comment">// 前面./不能少，后面的.js可以省略，也可以写</span>
    <span class="hljs-comment">// 以下演示三种entry，实际中取一种就行</span>
    entry: <span class="hljs-string">"./app/entry"</span>, <span class="hljs-comment">// string | object | array</span>
    <span class="hljs-comment">// 数组</span>
    entry: [<span class="hljs-string">"./home.js"</span>,<span class="hljs-string">"./about.js"</span>,<span class="hljs-string">"./contact.js"</span>],
    <span class="hljs-comment">// 对象，适合于多入口网站，也就是mpa，对象格式的每个键，如home,about,contact是每个入口文件chunk的名字，字符串和数组没有键，它也有一个chunk，名字默认为main    </span>
    entry: {
      <span class="hljs-built_in">home</span>: <span class="hljs-string">"./home.js"</span>,
      about: <span class="hljs-string">"./about.js"</span>,
      contact: <span class="hljs-string">"./contact.js"</span>
    }, 
}</code></pre>
<h2 id="articleHeader10">2.2 输出 output</h2>
<p>输出的配置比较多，是重点</p>
<blockquote>参考: <a href="https://webpack.js.org/configuration/output/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/config...</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
       output:{
           //最后生成的打包文件所在的目录，是一个绝对值，，如果不指定，表示当前目录。如果文件夹不存在，会自动创建
           //这个路径除了这里会用到之外，象html插件,file-loader加载器也会用到
           // 最后生成的打包文件是 path+ filename
            path:path.resolve(__dirname,'../dist/'), 
            //filename中可以使用[name],[id],[hash],[chunkhash][query]五种变量
            // filename中可以含子文件夹，如如filename: &quot;a/b/c/[id]app.js&quot;
            filename: 'wang.js', // 如果entry是个对象且有多个chunkname，那么这里会报错，但会生成一个wang.js,它的内容是第一个chunk的，建议entry是多个chunk的对象时，不要写固定名字，要带[name]变量
            filename: '[name]wang.js', // 此处的[name]与entry中的chunk名字对应，象上面entry是字符串和数组时，最后输出的文件名是mainwang.js，entry是对象，最后输出的文件名是 homewang.js,aboutwang.js,ccontact123wang.js
            filename: '[id]wang.js', //id从0,1这么增长的，象上面会生成0wang.js,1wang.js,2wang.js三个文件
            filename: &quot;[name].[hash].bundle.js&quot; //会打包成about.bab6d0fe556449a9229e.bundle,contact123.bab6d0fe556449a9229e.bundle,home.bab6d0fe556449a9229e.bundle，尤其要记住的是[hash]不要单独用，要与[name]或[id]配合用
            filename: &quot;[chunkhash].yes.js&quot;, //78f16d7b19ff7ec1fd3a.yes.js,e12898a66041f68c1959.yes.js,f590b1f2de7b72dea5b3.yes.js，20位hash值
            hashDigestLength: 8  //指定最后chunkhash和hash变量生成字符串的长度，默认是20个字符
    }    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>module.exports = {
       <span class="hljs-attribute">output</span>:{
           //最后生成的打包文件所在的目录，是一个绝对值，，如果不指定，表示当前目录。如果文件夹不存在，会自动创建
           //这个路径除了这里会用到之外，象html插件,file-loader加载器也会用到
           // 最后生成的打包文件是 path+ filename
            path:path<span class="hljs-variable">.resolve</span>(__dirname,'../dist/'), 
            //filename中可以使用[name],[id],[hash],[chunkhash][query]五种变量
            // filename中可以含子文件夹，如如filename: "a/b/c/[id]app<span class="hljs-variable">.js</span>"
            filename: 'wang<span class="hljs-variable">.js</span>', // 如果entry是个对象且有多个chunkname，那么这里会报错，但会生成一个wang<span class="hljs-variable">.js</span>,它的内容是第一个chunk的，建议entry是多个chunk的对象时，不要写固定名字，要带[name]变量
            filename: '[name]wang<span class="hljs-variable">.js</span>', // 此处的[name]与entry中的chunk名字对应，象上面entry是字符串和数组时，最后输出的文件名是mainwang<span class="hljs-variable">.js</span>，entry是对象，最后输出的文件名是 homewang<span class="hljs-variable">.js</span>,aboutwang<span class="hljs-variable">.js</span>,ccontact123wang<span class="hljs-variable">.js</span>
            filename: '[id]wang<span class="hljs-variable">.js</span>', //id从0,1这么增长的，象上面会生成0wang<span class="hljs-variable">.js</span>,1wang<span class="hljs-variable">.js</span>,2wang<span class="hljs-variable">.js</span>三个文件
            filename: "[name].[hash]<span class="hljs-variable">.bundle</span><span class="hljs-variable">.js</span>" //会打包成about<span class="hljs-variable">.bab</span>6d0fe556449a9229e<span class="hljs-variable">.bundle</span>,contact123<span class="hljs-variable">.bab</span>6d0fe556449a9229e<span class="hljs-variable">.bundle</span>,home<span class="hljs-variable">.bab</span>6d0fe556449a9229e<span class="hljs-variable">.bundle</span>，尤其要记住的是[hash]不要单独用，要与[name]或[id]配合用
            filename: "[chunkhash]<span class="hljs-variable">.yes</span><span class="hljs-variable">.js</span>", //78f16d7b19ff7ec1fd3a<span class="hljs-variable">.yes</span><span class="hljs-variable">.js</span>,e12898a66041f68c1959<span class="hljs-variable">.yes</span><span class="hljs-variable">.js</span>,f590b1f2de7b72dea5b3<span class="hljs-variable">.yes</span><span class="hljs-variable">.js</span>，20位hash值
            hashDigestLength: 8  //指定最后chunkhash和hash变量生成字符串的长度，默认是20个字符
    }    
}</code></pre>
<p>与hash有关的几个配置分别是hashDigest,hashDigestLength,hashFunction,hashSalt知道就行，</p>
<h2 id="articleHeader11">2.3 模块 modules</h2>
<p>这个是重点，但比较简单，后面的教程中会涉及到,只要记住结构就行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
        {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                //name: '[path][name].[ext]',
                name: '[name]2.[ext]', //最后生成的文件名是 output.path+ outputPaht+ name，[name],[ext],[path]表示原来的文件名字，扩展名，路径
                //useRelativePath:true,
                outputPath: 'img/' // 后面的/不能少
            }  
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
    <span class="hljs-attribute">rules</span>: [
      {
        test: /\.vue$/,
        loader: <span class="hljs-string">'vue-loader'</span>,
        options: vueLoaderConfig
      },
        {
        <span class="hljs-attribute">test</span>: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: <span class="hljs-string">'file-loader'</span>,
            options: {
                //name: <span class="hljs-string">'[path][name].[ext]'</span>,
                name: <span class="hljs-string">'[name]2.[ext]'</span>, //最后生成的文件名是 output.path+ outputPaht+ name，[name],[ext],[path]表示原来的文件名字，扩展名，路径
                //useRelativePath:true,
                outputPath: <span class="hljs-string">'img/'</span> // 后面的/不能少
            }  
          }
        ]
      },
      {
        <span class="hljs-attribute">test</span>: /\.js$/,
        loader: <span class="hljs-string">'babel-loader'</span>,
        include: [<span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src'</span>), <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'test'</span>)]
      },
      {
        <span class="hljs-attribute">test</span>: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: <span class="hljs-string">'url-loader'</span>,
        options: {
          limit: <span class="hljs-number">10000</span>,
          name: utils.<span class="hljs-built_in">assetsPath</span>(<span class="hljs-string">'img/[name].[hash:7].[ext]'</span>)
        }
      },
      {
        <span class="hljs-attribute">test</span>: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: <span class="hljs-string">'url-loader'</span>,
        options: {
          limit: <span class="hljs-number">10000</span>,
          name: utils.<span class="hljs-built_in">assetsPath</span>(<span class="hljs-string">'media/[name].[hash:7].[ext]'</span>)
        }
      },
      {
        <span class="hljs-attribute">test</span>: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: <span class="hljs-string">'url-loader'</span>,
        options: {
          limit: <span class="hljs-number">10000</span>,
          name: utils.<span class="hljs-built_in">assetsPath</span>(<span class="hljs-string">'fonts/[name].[hash:7].[ext]'</span>)
        }
      }
    ]
  },</code></pre>
<h2 id="articleHeader12">2.4 解析 resolve</h2>
<p>这个实用，必须掌握</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  resolve: {
    extensions: ['.js', '.vue', '.json'], //扩展名为.js,.vue,.json的可以忽略，如 import App from './app'，先在当前目录中找app.js，没有再找app.vue，没找到，再找.json，如果还没找到，报错
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 别名，这是一个正则的写法，表示以vue结尾的，如import Vue from 'vue' 表示 import Vue from 'vue/dist/vue.esm.js'
      '@': path.resolve('src'),// 这也是为懒人服务的,import HelloWorld from '@/components/HelloWorld'这里的@其实就是代表src这个目录 
      '#': path.resolve('src/ui/components') import Table from '#/table'
    }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  resolve: {
    extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>], <span class="hljs-regexp">//</span>扩展名为.js,.vue,.json的可以忽略，如 <span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>，先在当前目录中找app.js，没有再找app.vue，没找到，再找.json，如果还没找到，报错
    alias: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>, <span class="hljs-regexp">//</span> 别名，这是一个正则的写法，表示以vue结尾的，如<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span> 表示 <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue/dist/vue.esm.js'</span>
      <span class="hljs-string">'@'</span>: path.resolve(<span class="hljs-string">'src'</span>),<span class="hljs-regexp">//</span> 这也是为懒人服务的,<span class="hljs-keyword">import</span> HelloWorld <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/HelloWorld'</span>这里的@其实就是代表src这个目录 
      <span class="hljs-string">'#'</span>: path.resolve(<span class="hljs-string">'src/ui/components'</span>) <span class="hljs-keyword">import</span> Table <span class="hljs-keyword">from</span> <span class="hljs-string">'#/table'</span>
    }
  },</code></pre>
<h2 id="articleHeader13">2.5 插件 plugins</h2>
<p>模块和插件是重点，用单独的张姐讲</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    plugins: [
        new HtmlWebpackPlugin(HtmlWebpackPluginConfig), // 生成首页html5文件
        new webpack.DefinePlugin({BJ: JSON.stringify('北京'),})

    ]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>    plugins: <span class="hljs-type"></span>[
        <span class="hljs-keyword">new</span> <span class="hljs-type">HtmlWebpackPlugin</span>(HtmlWebpackPluginConfig), <span class="hljs-comment">// 生成首页html5文件</span>
        <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.DefinePlugin({BJ: <span class="hljs-type">JSON</span>.stringify(<span class="hljs-string">'北京'</span>),})

    ],</code></pre>
<h2 id="articleHeader14">2.6 开发服务器 DevServer</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    devServer: {
     //progress只在命令行用，不在配置文件中配
      contentBase: path.resolve(__dirname, &quot;../dist/&quot;), //网站的根目录为 根目录/dist，如果没有指定，使用process.cwd()函数取当前工作目录，工作目录>npm run dev
      port: 9000, //端口改为9000
      open:true, // 自动打开浏览器
      index:'front.html', // 与HtmlWebpackPlugin中配置filename一样
      inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
      hot:false,
      publicPath: '/static456/',它与output.publicPath的值应该是一样的，值为上面contentBase目录的子目录，是放js,css,图片等资源的文件夹，记得打包时，将图片等拷贝或打包到该文件下
      compress:true //压缩
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-attribute">devServer</span>: {
     <span class="hljs-comment">//progress只在命令行用，不在配置文件中配</span>
      <span class="hljs-attribute">contentBase</span>: path.resolve(__dirname, <span class="hljs-string">"../dist/"</span>), <span class="hljs-comment">//网站的根目录为 根目录/dist，如果没有指定，使用process.cwd()函数取当前工作目录，工作目录&gt;npm run dev</span>
      <span class="hljs-attribute">port</span>: <span class="hljs-number">9000</span>, <span class="hljs-comment">//端口改为9000</span>
      <span class="hljs-attribute">open</span>:true, <span class="hljs-comment">// 自动打开浏览器</span>
      <span class="hljs-attribute">index</span>:<span class="hljs-string">'front.html'</span>, <span class="hljs-comment">// 与HtmlWebpackPlugin中配置filename一样</span>
      <span class="hljs-attribute">inline</span>:true, <span class="hljs-comment">// 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中</span>
      <span class="hljs-attribute">hot</span>:false,
      <span class="hljs-attribute">publicPath</span>: <span class="hljs-string">'/static456/'</span>,它与output.publicPath的值应该是一样的，值为上面contentBase目录的子目录，是放js,css,图片等资源的文件夹，记得打包时，将图片等拷贝或打包到该文件下
      <span class="hljs-attribute">compress</span>:true <span class="hljs-comment">//压缩</span>
    }</code></pre>
<h2 id="articleHeader15">2.7 开发工具 DevTool</h2>
<h2 id="articleHeader16">2.8 目标 target</h2>
<h2 id="articleHeader17">2.9 监控和监控选项 Watch and WatchOptions</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch:true,  // 会监视被导入的文件是否有改动，如果有改动，自动打包，但配置文件的改动不会被监视" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">watch:</span><span class="hljs-literal">true</span>,  <span class="hljs-comment">// 会监视被导入的文件是否有改动，如果有改动，自动打包，但配置文件的改动不会被监视</span></code></pre>
<h2 id="articleHeader18">2.10 外部 External</h2>
<h1 id="articleHeader19">路径</h1>
<p>剪不断，理还乱的路径</p>
<h1 id="articleHeader20">未完成，在整理中</h1>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack从零开始第2课: 配置文件

## 原文链接
[https://segmentfault.com/a/1190000012536917](https://segmentfault.com/a/1190000012536917)

