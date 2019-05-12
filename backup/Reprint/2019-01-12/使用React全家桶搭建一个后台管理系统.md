---
title: '使用React全家桶搭建一个后台管理系统' 
date: 2019-01-12 2:30:24
hidden: true
slug: 48noaa42g1f
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009785709" src="https://static.alili.tech/img/remote/1460000009785709" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>本文首发在我的个人博客：<a href="http://muyunyun.cn/posts/9bfbdbf4/" rel="nofollow noreferrer" target="_blank">http://muyunyun.cn/posts/9bfb...</a></p></blockquote>
<p>使用React技术栈搭建一个后台管理系统最初是为了上手公司的业务，后来发现这个项目还能把平时遇到的有趣的demo给整合进去。此文尝试对相关的技术栈以及如何在该项目中引人Redux进行分析。</p>
<h2 id="articleHeader0">项目地址以及局部展示</h2>
<ul>
<li><p><a href="https://github.com/MuYunyun/reactSPA" rel="nofollow noreferrer" target="_blank">项目地址</a></p></li>
<li><p>小模块展示：<br><span class="img-wrap"><img data-src="/img/remote/1460000009785710" src="https://static.alili.tech/img/remote/1460000009785710" alt="" title="" style="cursor: pointer;"></span></p></li>
<li><p>redux在项目中的运用demo展示<br><span class="img-wrap"><img data-src="/img/remote/1460000009785711" src="https://static.alili.tech/img/remote/1460000009785711" alt="" title="" style="cursor: pointer;"></span></p></li>
</ul>
<h2 id="articleHeader1">项目目录结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── build.js                   项目打包后的文件
├── config                     webpack配置文件
│   ├──...
│   ├──webpack.config.dev.js   开发环境配置
│   ├──webpack.config.prod.js  生产环境配置
├── node_modules               node模块目录
├── public
│&nbsp;&nbsp; └──index.html
├── scripts
│&nbsp;&nbsp; ├── build.js               打包项目文件
│&nbsp;&nbsp; ├── start.js               启动项目文件
│&nbsp;&nbsp; └── test.js                测试项目文件
├── src
│&nbsp;&nbsp; ├── client                 汇聚(入口)目录
│&nbsp;&nbsp; ├── common                 核心目录
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── actions            redux中的action
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── components         通用功能组件
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── container          通用样式组件
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── images
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── pages              页面模块
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── reducers           redux中的reducer
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── utils              工具类
│&nbsp;&nbsp; │&nbsp;&nbsp; │   ├── config.js      通用配置
│&nbsp;&nbsp; │&nbsp;&nbsp; │   ├── menu.js        菜单配置
│&nbsp;&nbsp; │&nbsp;&nbsp; │   └── ajax.js        ajax模块(日后用到)
│&nbsp;&nbsp; │&nbsp;&nbsp; └── routes.js          前端路由
│&nbsp;&nbsp; └── server                 服务端目录(日后用到)
│&nbsp;&nbsp;     └── controller
├── .gitignore
├── package.json
├── README.md
└── yarn.lock" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── build<span class="hljs-selector-class">.js</span>                   项目打包后的文件
├── config                     webpack配置文件
│   ├──...
│   ├──webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.js</span>   开发环境配置
│   ├──webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.js</span>  生产环境配置
├── node_modules               node模块目录
├── public
│&nbsp;&nbsp; └──index<span class="hljs-selector-class">.html</span>
├── scripts
│&nbsp;&nbsp; ├── build<span class="hljs-selector-class">.js</span>               打包项目文件
│&nbsp;&nbsp; ├── start<span class="hljs-selector-class">.js</span>               启动项目文件
│&nbsp;&nbsp; └── test<span class="hljs-selector-class">.js</span>                测试项目文件
├── src
│&nbsp;&nbsp; ├── client                 汇聚(入口)目录
│&nbsp;&nbsp; ├── common                 核心目录
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── actions            redux中的action
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── components         通用功能组件
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── container          通用样式组件
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── images
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── pages              页面模块
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── reducers           redux中的reducer
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── utils              工具类
│&nbsp;&nbsp; │&nbsp;&nbsp; │   ├── config<span class="hljs-selector-class">.js</span>      通用配置
│&nbsp;&nbsp; │&nbsp;&nbsp; │   ├── <span class="hljs-selector-tag">menu</span><span class="hljs-selector-class">.js</span>        菜单配置
│&nbsp;&nbsp; │&nbsp;&nbsp; │   └── ajax<span class="hljs-selector-class">.js</span>        ajax模块(日后用到)
│&nbsp;&nbsp; │&nbsp;&nbsp; └── routes<span class="hljs-selector-class">.js</span>          前端路由
│&nbsp;&nbsp; └── server                 服务端目录(日后用到)
│&nbsp;&nbsp;     └── controller
├── <span class="hljs-selector-class">.gitignore</span>
├── package<span class="hljs-selector-class">.json</span>
├── README<span class="hljs-selector-class">.md</span>
└── yarn.lock</code></pre>
<p>项目的初始结构和构造原因已罗列如上，由于过些日子会引人ts，所以项目结构必然还会改动，但肯定基于这基本雏形扩展的。</p>
<p>下面对目录结构作以下说明</p>
<ul>
<li><p>项目最初始是用 <a href="https://github.com/facebookincubator/create-react-app" rel="nofollow noreferrer" target="_blank">create-react-app</a> 初始化的，create-react-app 是Facebook官方提供的 React 脚手架，也是业界最优秀的 React 应用开发工具之一;</p></li>
<li><p>client 作为入口目录，到时候可以把第三方中间件也放在此处;</p></li>
<li><p>container 和 components 存放的都是 react 组件,区别如下表。但是我把和样式有关的组件就放在container中，把和功能有关的模块(比如自己分装的表格组件、弹出输入框组件等)就放到components中，若日后有需要，container 和 component 组件都是可以在 Redux 数据流中的。</p></li>
</ul>
<table>
<thead><tr>
<th align="center"> </th>
<th align="center">container</th>
<th align="center">component</th>
</tr></thead>
<tbody>
<tr>
<td align="center">目的</td>
<td align="center">如何工作(数据获取,状态更新)</td>
<td align="center">如何显示(样式，布局)</td>
</tr>
<tr>
<td align="center">是否在 Redux 数据流中</td>
<td align="center">是</td>
<td align="center">否</td>
</tr>
<tr>
<td align="center">读取数据</td>
<td align="center">从 Redux 获取 state</td>
<td align="center">从 props 获取数据</td>
</tr>
<tr>
<td align="center">修改数据</td>
<td align="center">向 Redux 派发 actions</td>
<td align="center">从 props 调用回调函数</td>
</tr>
<tr>
<td align="center">实现方式</td>
<td align="center">向react-redux生成</td>
<td align="center">手写</td>
</tr>
</tbody>
</table>
<ul>
<li><p>ajax 模块到时候计划用 fetch 封装一个ajax，感觉使用 fetch 还是蛮便利的。</p></li>
<li><p>server 层就是作为网关层，日后计划用来写 node 的。</p></li>
</ul>
<h2 id="articleHeader2">技术栈相关</h2>
<p>虽然用到的技术栈众多，但是自己也谈不上熟练运用，多半是边查API边用的，所以只罗列些自己用相关的技术栈解决的点;</p>
<h3 id="articleHeader3">webpack(2.x)</h3>
<p>4月的时候 create-react-app 还是基于 webpack(1.x) 构建的，5月27号升到了webpack(2.6),于是我也进行了 webpack 的版本升级。</p>
<h4>按需加载</h4>
<p><a href="https://github.com/ant-design/babel-plugin-import" rel="nofollow noreferrer" target="_blank">babel-plugin-import</a> 是一个用于按需加载组件代码和样式的 babel 插件，使用此插件后，在引人 antd 相应模块就能实现按需引人，在config/webpack.config.dev.js 文件中作如下修改:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          plugins: [
            &quot;transform-decorators-legacy&quot;,  // 引人 ES7 的装饰器 @
            ['import', [{ libraryName: 'antd', style: true }]],
          ],
          cacheDirectory: true,
        },
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
        <span class="hljs-attr">include</span>: paths.appSrc,
        <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'babel-loader'</span>),
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">plugins</span>: [
            <span class="hljs-string">"transform-decorators-legacy"</span>,  <span class="hljs-comment">// 引人 ES7 的装饰器 @</span>
            [<span class="hljs-string">'import'</span>, [{ <span class="hljs-attr">libraryName</span>: <span class="hljs-string">'antd'</span>, <span class="hljs-attr">style</span>: <span class="hljs-literal">true</span> }]],
          ],
          <span class="hljs-attr">cacheDirectory</span>: <span class="hljs-literal">true</span>,
        },
      },</code></pre>
<h4>引人less</h4>
<p>首先引人 <a href="https://github.com/webpack-contrib/less-loader" rel="nofollow noreferrer" target="_blank">less-loader</a> 来加载 less 样式，同时修改 config/webpack.config.dev.js 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
        test: /\.less$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss', //https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              modifyVars: { &quot;@primary-color&quot;: &quot;#1DA57A&quot; },  // 这里利用了 less-loader 的 modifyVars 来进行主题配置， 变量和其他配置方式可以参考 [配置主题](https://user-gold-cdn.xitu.io/2017/6/15/e8ba356d7b10cec196d48159e41b6e6e) 文档。
            },
          },
        ],
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
        test: <span class="hljs-regexp">/\.less$/</span>,
        <span class="hljs-attr">use</span>: [
          <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'style-loader'</span>),
          <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'css-loader'</span>),
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'postcss-loader'</span>),
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">ident</span>: <span class="hljs-string">'postcss'</span>, <span class="hljs-comment">//https://webpack.js.org/guides/migrating/#complex-options</span>
              plugins: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> [
                <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-flexbugs-fixes'</span>),
                autoprefixer({
                  <span class="hljs-attr">browsers</span>: [
                    <span class="hljs-string">'&gt;1%'</span>,
                    <span class="hljs-string">'last 4 versions'</span>,
                    <span class="hljs-string">'Firefox ESR'</span>,
                    <span class="hljs-string">'not ie &lt; 9'</span>, <span class="hljs-comment">// React doesn't support IE8 anyway</span>
                  ],
                  <span class="hljs-attr">flexbox</span>: <span class="hljs-string">'no-2009'</span>,
                }),
              ],
            },
          },
          {
            <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'less-loader'</span>),
            <span class="hljs-attr">options</span>: {
              <span class="hljs-attr">modifyVars</span>: { <span class="hljs-string">"@primary-color"</span>: <span class="hljs-string">"#1DA57A"</span> },  <span class="hljs-comment">// 这里利用了 less-loader 的 modifyVars 来进行主题配置， 变量和其他配置方式可以参考 [配置主题](https://user-gold-cdn.xitu.io/2017/6/15/e8ba356d7b10cec196d48159e41b6e6e) 文档。</span>
            },
          },
        ],
      },</code></pre>
<h4>一键发布到 gh-pages</h4>
<p>用到了 <a href="https://github.com/tschaub/gh-pages" rel="nofollow noreferrer" target="_blank">gh-pages</a> ,使用 npm run deploy 一键发布到自己的gh-pages上，姑且把gh-pages当成生产环境吧，所以在修改config/webpack.config.dev.js 文件的同时也要对 config/webpack.config.prod.js 作出一模一样的修改。</p>
<h4>引用路径的缩写</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alias: {
      'react-native': 'react-native-web',
      components: path.resolve(__dirname, '..') + '/src/common/components',
      container: path.resolve(__dirname, '..') + '/src/common/container',
      images: path.resolve(__dirname, '..') + '/src/common/images',
      pages: path.resolve(__dirname, '..') + '/src/common/pages',
      utils: path.resolve(__dirname, '..') + '/src/common/utils',
      data: path.resolve(__dirname, '..') + '/src/server/data',
      actions: path.resolve(__dirname, '..') + '/src/common/actions',
      reducers: path.resolve(__dirname, '..') + '/src/common/reducers',
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">alias: {
      <span class="hljs-string">'react-native'</span>: <span class="hljs-string">'react-native-web'</span>,
      <span class="hljs-attr">components</span>: path.resolve(__dirname, <span class="hljs-string">'..'</span>) + <span class="hljs-string">'/src/common/components'</span>,
      <span class="hljs-attr">container</span>: path.resolve(__dirname, <span class="hljs-string">'..'</span>) + <span class="hljs-string">'/src/common/container'</span>,
      <span class="hljs-attr">images</span>: path.resolve(__dirname, <span class="hljs-string">'..'</span>) + <span class="hljs-string">'/src/common/images'</span>,
      <span class="hljs-attr">pages</span>: path.resolve(__dirname, <span class="hljs-string">'..'</span>) + <span class="hljs-string">'/src/common/pages'</span>,
      <span class="hljs-attr">utils</span>: path.resolve(__dirname, <span class="hljs-string">'..'</span>) + <span class="hljs-string">'/src/common/utils'</span>,
      <span class="hljs-attr">data</span>: path.resolve(__dirname, <span class="hljs-string">'..'</span>) + <span class="hljs-string">'/src/server/data'</span>,
      <span class="hljs-attr">actions</span>: path.resolve(__dirname, <span class="hljs-string">'..'</span>) + <span class="hljs-string">'/src/common/actions'</span>,
      <span class="hljs-attr">reducers</span>: path.resolve(__dirname, <span class="hljs-string">'..'</span>) + <span class="hljs-string">'/src/common/reducers'</span>,
    },</code></pre>
<p>配置了引用路径的缩写后，就可以在任意地方如这样引用，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Table from 'components/table'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> Table <span class="hljs-keyword">from</span> <span class="hljs-string">'components/table'</span></code></pre>
<h3 id="articleHeader4">Antd(2.x)</h3>
<p>antd是（蚂蚁金服体验技术部）经过大量的项目实践和总结，沉淀出的一个中台设计语言 Ant Design，使用者包括蚂蚁金服、阿里巴巴、口碑、美团、滴滴等一系列知名公司，而且我从他们的<a href="https://ant.design/docs/spec/introduce-cn" rel="nofollow noreferrer" target="_blank">设计理念</a>也学到了很多关于UI、UX的知识。<br>该项目采用的是antd最新的版本2.10.0,由于2.x的版本和1.x的版本还是相差蛮大的，之前参考的项目(基于1.x)改起来太费劲，所以在组件那块就干脆自己重新封装了一遍。这部分知识点建议多看文档，官方更新还是非常勤快的。</p>
<h3 id="articleHeader5">React-router(4.x)</h3>
<p>react-router 4.x和2.x的差异又是特别的大，召唤<a href="https://reacttraining.com/react-router/web/guides/quick-start" rel="nofollow noreferrer" target="_blank">文档</a>,网上基本上都还是2.x的教程，看过文档之后，反正简而言之其就是要让使用者更容易上手。印象最深的是以前嵌套路由写法在4.x中写到同层了。如下示例他们的效果是相同的。</p>
<p>2.x:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;/&quot; component={App}>
    <Route path=&quot;/aaaa&quot; component={AAAA} />
    <Route path=&quot;/bbbb&quot; component={BBBB} />
</Route>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;Route path=<span class="hljs-string">"/"</span> component={App}&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/aaaa"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{AAAA}</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/bbbb"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{BBBB}</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span></span></code></pre>
<p>4.x:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;/&quot; component={App} />
<Route path=&quot;/aaaa&quot; component={AAAA} />
<Route path=&quot;/bbbb&quot; component={BBBB} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;Route path=<span class="hljs-string">"/"</span> component={App} /&gt;
&lt;Route path="/aaaa" component={AAAA} /&gt;
&lt;Route path="/bbbb" component={BBBB} /&gt;</code></pre>
<h3 id="articleHeader6">Fetch</h3>
<p>fetch 使用比较简单，基本的 promise 用法如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url).then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log(&quot;Oops, error&quot;, e))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fetch(url).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data))
  .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Oops, error"</span>, e))</code></pre>
<p>此外还能这样用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
} catch(e) {
  console.log(&quot;Oops, error&quot;, e);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">let</span> response = <span class="hljs-keyword">await</span> fetch(url);
  <span class="hljs-keyword">let</span> data = <span class="hljs-keyword">await</span> response.json();
  <span class="hljs-built_in">console</span>.log(data);
} <span class="hljs-keyword">catch</span>(e) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Oops, error"</span>, e);
}</code></pre>
<p>但是其简洁的特点是为了让我们可以自定义其扩展，还是其本身就还不完善呢？我在调用 JSONP 的请求时，发现其不支持对 JSONP 的调用，所幸社区还是很给力地找到了 <a href="https://www.npmjs.com/package/fetch-jsonp" rel="nofollow noreferrer" target="_blank">fetch-jsonp</a> 这个模块，实现了对百度音乐接口调用。fetch-jsonp使用也和 fetch 类似，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetchJsonp(url,{method: 'GET'})
　　.then((res) =>res.json())
　　.then((data) => {})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fetchJsonp(url,{<span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>})
　　.then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span>res.json())
　　.then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {})</code></pre>
<h3 id="articleHeader7">Redux</h3>
<p>使用了redux也已经有段时日了，我对redux的定义就是更好的管理组件的状态，一旦应用的逻辑复杂起来，各种组件状态、界面耦合起来，就容易出岔子，redux就是为了解决这个而诞生的，让我们可以更多地关注UI层，而降低对状态的关注。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009785712" src="https://static.alili.tech/img/remote/1460000009785712" alt="" title="" style="cursor: pointer;"></span></p>
<p>画了一幅比较简陋的图来说明 redux 的大致流程，假设首先通过鼠标点击页面上的按钮触发了一个行为(action)，这时我们叫了一辆出租车 dispatch() 将这个 action 带到了终点站 store。这时候 store 就会通过 reducer 函数返回一个新的状态 state，从而改变 UI 显示。之前也写了篇<a href="http://www.cnblogs.com/MuYunyun/p/6530715.html" rel="nofollow noreferrer" target="_blank">深入Redux架构</a></p>
<p>下面通过把 <a href="https://github.com/MuYunyun/todoList" rel="nofollow noreferrer" target="_blank">代办事项</a> 这个demo运用到后台管理系统中来讲解 Redux 在其中的运用。</p>
<p>首先，在入口目录创建 store</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    { routes }
  </Provider>,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> store = createStore(rootReducer)

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
    { routes }
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
);</code></pre>
<p>接着，我使用了 <a href="https://github.com/acdlite/redux-actions" rel="nofollow noreferrer" target="_blank">redux-actions</a> 这个模块。使用 redux-actions 的好处是能简化大量对 action 的声明，以及能简化 reducer 的写法。</p>
<p>代办事项的 actions 文件片段(拿展示全部任务、已完成任务、未完成任务的 action 举例):</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createAction } from 'redux-actions'

export const setVisibility = createAction('SET_VISIBILITY')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { createAction } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-actions'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> setVisibility = createAction(<span class="hljs-string">'SET_VISIBILITY'</span>)</code></pre>
<p>没使用 redux-actions 时，actions 写法如下，可看出着实麻烦了不少，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const setVisibility = (filter) => {
    return {
        type: &quot;SET_VISIBILITY&quot;,
        filter
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> setVisibility = <span class="hljs-function">(<span class="hljs-params">filter</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">type</span>: <span class="hljs-string">"SET_VISIBILITY"</span>,
        filter
    }
}</code></pre>
<p>相应的代办事项的 reducers 文件片段:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const setVisibility = handleActions({
  'SET_VISIBILITY'(state, action) {
    return { ...state, ...action.payload}
  }
}, 'SHOW_ALL')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> setVisibility = handleActions({
  <span class="hljs-string">'SET_VISIBILITY'</span>(state, action) {
    <span class="hljs-keyword">return</span> { ...state, ...action.payload}
  }
}, <span class="hljs-string">'SHOW_ALL'</span>)</code></pre>
<p>使用 redux-actions 后，只要进行如下调用,reducers文件里的<code>SET_VISIBILITY</code>的 action 就能捕获到<code>SHOW_ALL</code>这个状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { setVisibility } from 'actions/todoList'
@connect(
    (state) => ({
        setVisibility: state.setVisibility, // 这个 setVisibility 是取自 reducers 的
    })
)

dispatch(this.props.dispatch(setVisibility('SHOW_ALL')))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { setVisibility } <span class="hljs-keyword">from</span> <span class="hljs-string">'actions/todoList'</span>
@connect(
    <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> ({
        <span class="hljs-attr">setVisibility</span>: state.setVisibility, <span class="hljs-comment">// 这个 setVisibility 是取自 reducers 的</span>
    })
)

dispatch(<span class="hljs-keyword">this</span>.props.dispatch(setVisibility(<span class="hljs-string">'SHOW_ALL'</span>)))</code></pre>
<p>connect 来自 <a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">react-redux</a>，这里的 @ 是 ES7里的装饰器的用法，使用它之后又能减少不少的代码量，原来还要写 <code>mapStateToProps</code>、<code>mapDispatchToProps</code>。</p>
<h2 id="articleHeader8">项目的一些扩展计划</h2>
<p>计划在该项目把平时工作、学习中遇到的react案例抽离成demo展现出来，所以以后还会多出一些模块。另外过段时间会在该项目中引人 typescript，如果还有精力的话，可以在这个项目上折腾下网关层。喜欢这个项目的话，<a href="https://github.com/MuYunyun/reactSPA" rel="nofollow noreferrer" target="_blank">点我 Star</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用React全家桶搭建一个后台管理系统

## 原文链接
[https://segmentfault.com/a/1190000009785704](https://segmentfault.com/a/1190000009785704)

