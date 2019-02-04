---
title: '可能是东半球最好的 React + Redux 启动器，基于 Vue Cli 二次开发' 
date: 2019-02-05 2:30:08
hidden: true
slug: 24e3c0frhbc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">React 示例项目 · 简易留言板 + 待办事项（<a href="https://github.com/kenberkeley/react-demo" rel="nofollow noreferrer" target="_blank">Github 地址</a>）</h2>
<blockquote>
<h5>写在前面</h5>
<p>一直以来，我都相当纳闷：为什么 React 的那些 starter kit 都构建得那么恶心？  <br>能不能像 <a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">Vue Cli</a> 生成的<a href="http://vuejs-templates.github.io/webpack/structure" rel="nofollow noreferrer" target="_blank">项目架构</a>般优雅？说干就干，本项目就改自 <a href="https://github.com/kenberkeley/vue-demo" rel="nofollow noreferrer" target="_blank">Vue Demo</a></p>
</blockquote>
<h2 id="articleHeader1"><a>§ 技术栈</a></h2>
<blockquote><p>详情可参阅 <code>package.json</code></p></blockquote>
<ul>
<li><p>React 15.3.0</p></li>
<li><p>Redux</p></li>
<li><p>React Router</p></li>
<li><p>Ajax 请求库（Superagent / jQuery-Ajax / ...）</p></li>
<li><p>Webpack</p></li>
<li><p>ES6 + Babel</p></li>
<li><p>jQuery + BootStrap (UI)</p></li>
</ul>
<h2 id="articleHeader2"><a>§ 快速开始</a></h2>
<p>在开始前，希望您已通读如下资料</p>
<ul>
<li><p><a href="http://reactjs.cn/react/docs/getting-started-zh-CN.html" rel="nofollow noreferrer" target="_blank">React 文档</a></p></li>
<li><p><a href="http://camsong.github.io/redux-in-chinese/index.html" rel="nofollow noreferrer" target="_blank">Redux 文档</a>（看完后懵逼的请转看 <a href="https://github.com/kenberkeley/redux-simple-tutorial" rel="nofollow noreferrer" target="_blank">Redux 简明教程</a>）</p></li>
<li><p><a href="http://react-guide.github.io/react-router-cn/" rel="nofollow noreferrer" target="_blank">React Router 文档</a></p></li>
</ul>
<p>同时您还需要熟悉 ES6。例如，请把如下代码  <br><code>const foo = ({ hello: { world: bar } }) =&gt; ({ bar })</code>  <br>转译成 ES5（答案请自行到 <a href="http://babeljs.io/repl/" rel="nofollow noreferrer" target="_blank">Babel REPL</a> 在线编译验证）</p>
<h3 id="articleHeader3"><a>⊙ 安装</a></h3>
<blockquote><p>建议升级到 node 5.x/6.x + npm 3.x 环境  <br>推荐使用 <code>cnpm</code> 或手动切换到淘宝 npm 源  <br><code>npm set registry https://registry.npm.taobao.org/</code></p></blockquote>
<p>本示例项目需要结合 <a href="https://github.com/kenberkeley/msg-board-api" rel="nofollow noreferrer" target="_blank">简易留言板 RESTful API</a>  <br>模拟前后端分离开发（还为了与 <a href="https://github.com/kenberkeley/vue-demo" rel="nofollow noreferrer" target="_blank">Vue Demo</a> 共用）  <br>请分别 <code>git clone</code>，打开<strong>两个</strong>命令窗口（ Windows 下推荐使用 <code>Cygwin</code>）<strong>分别</strong>切换到两者的目录下  <br>分别敲下 <code>npm install</code> 安装依赖（为避免 Windows 下的 npm 软链接问题，可加上 <code>--no-bin-link</code> 完全解构所有依赖）</p>
<blockquote>
<p>虽然我们已经切换到了淘宝 npm 源，但安装 <code>node-sass@3.8.0</code> 的时候还是很有可能卡住  <br>因为它的安装需要从 Github 的 AWS 服务器拉取二进制文件，因此您可以为它指定源：  <br><code>npm i node-sass@3.8.0 --registry=https://registry.npm.taobao.org</code></p>
<p>如果您想简单粗暴一点，<a href="http://pan.baidu.com/s/1o8eu4t0" rel="nofollow noreferrer" target="_blank">这里</a>还提供了 <code>node_modules.zip</code>，直接解压即可</p>
</blockquote>
<h3 id="articleHeader4"><a>⊙ 启动</a></h3>
<p>先后在 <code>msg-board-api</code>、<code>react-demo</code> 的命令窗口下，敲下 <code>npm start</code>  <br>如无意外，默认浏览器就会自动打开 <code>localhost:9090</code>，您立即可以看到效果  <br>若浏览器没有自动弹出，则请自行手动访问</p>
<blockquote><p>开发过程中，通过 Webpack 处理的静态资源都由基于内存的 <code>webpack-dev-server</code> 提供  <br>P.S. 如果您还不清楚如何安装与启动，请看这个 <a href="https://github.com/kenberkeley/react-demo/issues/1" rel="nofollow noreferrer" target="_blank">issue</a></p></blockquote>
<h2 id="articleHeader5"><a>§ 项目架构</a></h2>
<h3 id="articleHeader6"><a>⊙ 目录结构</a></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├─ build/            # Webpack 配置目录
├─ dist/             # build 生成的生产环境下的项目
├─ src/              # 源码目录（开发都在这里进行）
│   ├─ components/     # 组件（COMPONENT）
│   ├─ redux/          # Redux 一箩筐
│   │   ├─ actions/      # （ACTION）
│   │   ├─ reducers/     # （REDUCER）
│   │   ├─ store/        # （STORE）
│   ├── routes/        # 路由（ROUTE）
│   ├── services/      # 服务（SERVICE，用于统一管理 XHR 请求，这是从 Vue Demo 中直接复制过来的）
│   ├── utils/         # 工具库（UTIL）
│   │   ├─ HoC/          # 高阶组件（HOC，全称 Higher Order Component）
│   │   ├─ mixins/       # 混合（MIXIN）
│   ├── views/         # 路由视图基页（VIEW）
│   │   ├─ layout/       # 全局布局
│   ├── app.js         # 启动文件
│   ├── index.html     # 静态基页
├── static/          # 放置无需经由 Webpack 处理的静态文件
├── .babelrc         # Babel 转码配置
├── .eslintignore    # （配置）ESLint 检查中需忽略的文件（夹）
├── .eslintrc        # ESLint 配置
├── .gitignore       # （配置）需被 Git 忽略的文件（夹）
├── package.json     # （这个就不用多解释了吧）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>.
├─ build/            <span class="hljs-meta"># Webpack 配置目录</span>
├─ dist/             <span class="hljs-meta"># build 生成的生产环境下的项目</span>
├─ src/              <span class="hljs-meta"># 源码目录（开发都在这里进行）</span>
│   ├─ components/     <span class="hljs-meta"># 组件（COMPONENT）</span>
│   ├─ redux/          <span class="hljs-meta"># Redux 一箩筐</span>
│   │   ├─ actions/      <span class="hljs-meta"># （ACTION）</span>
│   │   ├─ reducers/     <span class="hljs-meta"># （REDUCER）</span>
│   │   ├─ store/        <span class="hljs-meta"># （STORE）</span>
│   ├── routes/        <span class="hljs-meta"># 路由（ROUTE）</span>
│   ├── services/      <span class="hljs-meta"># 服务（SERVICE，用于统一管理 XHR 请求，这是从 Vue Demo 中直接复制过来的）</span>
│   ├── utils/         <span class="hljs-meta"># 工具库（UTIL）</span>
│   │   ├─ HoC/          <span class="hljs-meta"># 高阶组件（HOC，全称 Higher Order Component）</span>
│   │   ├─ mixins/       <span class="hljs-meta"># 混合（MIXIN）</span>
│   ├── views/         <span class="hljs-meta"># 路由视图基页（VIEW）</span>
│   │   ├─ layout/       <span class="hljs-meta"># 全局布局</span>
│   ├── app.js         <span class="hljs-meta"># 启动文件</span>
│   ├── <span class="hljs-keyword">index</span>.html     <span class="hljs-meta"># 静态基页</span>
├── <span class="hljs-keyword">static</span>/          <span class="hljs-meta"># 放置无需经由 Webpack 处理的静态文件</span>
├── .babelrc         <span class="hljs-meta"># Babel 转码配置</span>
├── .eslintignore    <span class="hljs-meta"># （配置）ESLint 检查中需忽略的文件（夹）</span>
├── .eslintrc        <span class="hljs-meta"># ESLint 配置</span>
├── .gitignore       <span class="hljs-meta"># （配置）需被 Git 忽略的文件（夹）</span>
├── package.json     <span class="hljs-meta"># （这个就不用多解释了吧）</span></code></pre>
<p>在这里您可能会问：怎么没有 <code>containers/</code> 目录？  <br>在我的理解里，木偶组件与智能组件最大的差别在于：  <br>前者的状态是通过父组件传入获得，而后者是直接<strong>连接</strong>到 <code>state</code> 获得  <br>亦即：若一个木偶组件直接<strong>连接</strong>到 <code>state</code>，那么它就是一个所谓的智能组件  <br>（详见 <a href="https://github.com/kenberkeley/react-demo/blob/master/src/utils/makeContainer.js" rel="nofollow noreferrer" target="_blank"><code>src/utils/makeContainer.js</code></a> 中对 <code>react-redux</code> 的 <a href="https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options" rel="nofollow noreferrer" target="_blank"><code>connect</code></a> 函数的封装）  <br>本示例项目唯一在组件的定义中自行使用 <code>connect</code> 函数的是 <a href="https://github.com/kenberkeley/react-demo/blob/master/src/components/Navbar/index.js" rel="nofollow noreferrer" target="_blank"><code>Navbar</code></a> 组件（且用到了 ES7 的装饰器）</p>
<blockquote><p>您可以根据业务需求改动目录结构。若目录使用频繁，建议配置 <a>路径别名</a>  <br>默认的路径别名见上面目录结构注释中大写形式的常量</p></blockquote>
<h3 id="articleHeader7"><a>⊙ 特色</a></h3>
<ul>
<li><p>本示例项目秉承最佳实践，<strong>高度洁癖</strong>地实现代码分离/复用</p></li>
<li><p>优化目录结构，更好的模块分离，更接近 Vue 的开发模式</p></li>
<li><p>Redux DevTools，可选 <a href="https://github.com/zalmoxisus/redux-devtools-extension" rel="nofollow noreferrer" target="_blank">Chrome 插件形式</a>（默认） 或 内嵌页面的<a href="https://github.com/gaearon/redux-devtools" rel="nofollow noreferrer" target="_blank">组件形式</a></p></li>
<li><p><a href="https://github.com/evgenyrodionov/redux-logger" rel="nofollow noreferrer" target="_blank">Redux Logger</a> 打印动作及前后状态变化</p></li>
<li><p><a href="https://github.com/garbles/why-did-you-update" rel="nofollow noreferrer" target="_blank">why-did-you-update</a> 检测不必要的组件重渲染（默认关闭）</p></li>
<li><p>引入服务层统一管理 XHR 请求（好处请参考 Vue Demo 中的 <a href="https://github.com/kenberkeley/vue-demo#service-layer" rel="nofollow noreferrer" target="_blank">引入服务层</a>）</p></li>
<li><p>引入 <a>路径别名</a> 实现优雅的加载模式</p></li>
<li><p>引入 <a href="https://github.com/gaearon/react-hot-loader" rel="nofollow noreferrer" target="_blank">React Hot Reload</a>，支持热替换</p></li>
<li><p>生产环境下的编译对代码进行<a href="https://github.com/thejameskyle/babel-react-optimize" rel="nofollow noreferrer" target="_blank">优化</a></p></li>
<li><p>迄今为止我见过的最完美的 starter kit</p></li>
</ul>
<blockquote><p>有关 Redux DevTools 与 why-did-you-update 的启用与禁用，见下面的 <a>开发环境全局变量</a> 配置</p></blockquote>
<h2 id="articleHeader8"><a>§ 开发</a></h2>
<h3 id="articleHeader9"><a>⊙ Webpack 配置</a></h3>
<blockquote><p>由于已经拥有相对成熟的 Webpack 配置，因此在一定程度上您可以不求甚解，但了解其配置会更能把握整体开发</p></blockquote>
<ul><li><p>前端开发服务器为 <code>localhost:9090</code>，可在 <code>build/webpack.config.dev.js</code> 中找到</p></li></ul>
<blockquote><p>后端 RESTful API 基地址写在了 <code>src/services/xhr/config.js</code> 中，请根据实际自行修改</p></blockquote>
<ul>
<li><p>框架 / 类库 须分离打包以加快开发时的编译速度并有利于缓存，详见 <code>build/webpack.base.conf.js</code> 中的 <code>vendor</code></p></li>
<li><p><a><strong>路径别名</strong></a> 的定义位于 <code>build/webpack.base.conf.js</code>，好处就是<strong>引入与重构都很方便</strong></p></li>
</ul>
<blockquote>
<p>例如，在某组件中，引入 <code>userService</code> 需要 <code>import userService from '../../../services/userService'</code>  <br>但有了路径别名后，只需要 <code>import userService from 'SERVICE/userService'</code>  <br>相比于 AngularJS 中的依赖注入，这种方式依赖于构建工具，显得更为简单  </p>
<p>您可能会说，Webpack 只需要设定了 <code>root</code>属性为 <code>src/</code>  <br>就可以 <code>import userService from 'services/userService'</code>  <br>但在这里其实是会引起歧义的（不过这属于强迫症的范畴。。。）  <br>例如，<code>import createBrowserHistory from 'history/lib/createBrowserHistory'</code>  <br>您可能会觉得这是 <code>src/history/lib/createBrowserHistory.js</code>  <br>但实际上 <a href="https://github.com/ReactTraining/history" rel="nofollow noreferrer" target="_blank">history</a> 是一个 npm package  <br>同样地，您又怎么知道 <code>services</code> 不是一个 npm package？  <br>而且重构之后，文件夹的变动会导致相对路径的变化，<code>services/</code> 目录未必仍在 <code>src/</code> 下    <br>因此，路径别名相当有必要。其<strong>常量</strong>的形式，让人一看就知道不是一个 npm package</p>
</blockquote>
<ul><li><p>开发环境<a><strong>全局变量</strong></a>，由 <code>webpack.DefinePlugin</code> 提供（详见 <code>build/webpack.base.conf.js</code>）</p></li></ul>
<blockquote>
<p>默认有 <code>__DEV__</code> / <code>__PROD__</code> / <code>__COMPONENT_DEVTOOLS__</code> / <code>__WHY_DID_YOU_UPDATE__</code> 四个全局变量  <br>若要继续添加，则还需要在 <code>.eslintrc</code> 中 <code>globals</code> 同步写入</p>
<p>在此需要提醒，在 <code>package.json</code> 中设置 <code>NODE_ENV</code> 要注意末尾空格的<a href="http://stackoverflow.com/questions/11104028/#38948727" rel="nofollow noreferrer" target="_blank">问题</a>  <br>最好就是使用前 <code>trim</code> 一下：<code>process.env.NODE_ENV.trim()</code></p>
<p>拓展阅读：<a href="http://rapheal.sinaapp.com/tag/uglifyjs/" rel="nofollow noreferrer" target="_blank">解读 UglifyJS</a>  <br>看看生产环境下编译 <code>if (__PROD__) { ... }</code> =&gt; <code>if (true) { ... }</code> 后 <a href="http://rapheal.sinaapp.com/2014/05/22/uglifyjs-squeeze/" rel="nofollow noreferrer" target="_blank">UglifyJS</a> 会如何处理</p>
</blockquote>
<h3 id="articleHeader10"><a>⊙ 规范</a></h3>
<blockquote><p>本示例项目的代码极尽详细地添加了注释，其中不乏最佳实践提示</p></blockquote>
<p>为了减少代码量，我省去了 <a href="https://facebook.github.io/react/docs/reusable-components-zh-CN.html#prop-" rel="nofollow noreferrer" target="_blank">Prop 验证</a>，建议您在往后的开发中使用</p>
<h2 id="articleHeader11"><a>§ 测试</a></h2>
<blockquote><p>请自行选择测试工具</p></blockquote>
<h2 id="articleHeader12"><a>§ 部署</a></h2>
<p>在 <code>react-demo</code> 的命令窗口下，敲下 <code>npm run build</code>，将会在项目根目录下生成 <code>dist/</code></p>
<blockquote>
<p>您可以使用命令行静态资源服务器 <a href="https://github.com/tj/serve" rel="nofollow noreferrer" target="_blank">serve</a> ( <code>npm i serve -g</code> )，敲下 <code>serve -p [端口] dist</code> 来快速查看 build 后的项目  <br>还可以 <code>cd dist</code> 后，<code>python -m SimpleHTTPServer [端口]</code> 或 <code>php -S localhost:[端口]</code> 快速便捷地实现静态资源服务器</p>
<p>关于生产环境下的部署与优化，已超出本文档的论述范围，请自行查阅相关资料  <br>在这里您可能需要全局安装 <a href="https://github.com/isaacs/rimraf" rel="nofollow noreferrer" target="_blank">rimraf</a>： <code>npm i rimraf -g</code>（或根据<a href="http://stackoverflow.com/questions/9679932" rel="nofollow noreferrer" target="_blank">指引</a>配置环境变量避免全局安装）</p>
</blockquote>
<h2 id="articleHeader13"><a>§ 参考</a></h2>
<ul>
<li><p><a href="https://github.com/kenberkeley/vue-demo" rel="nofollow noreferrer" target="_blank">Vue Demo</a></p></li>
<li><p><a href="https://github.com/davezuko/react-redux-starter-kit" rel="nofollow noreferrer" target="_blank">davezuko/react-redux-starter-kit</a></p></li>
<li><p><a href="http://marmelab.com/blog/2015/12/17/react-directory-structure.html" rel="nofollow noreferrer" target="_blank">探讨 React 项目目录结构</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
可能是东半球最好的 React + Redux 启动器，基于 Vue Cli 二次开发

## 原文链接
[https://segmentfault.com/a/1190000006737924](https://segmentfault.com/a/1190000006737924)

