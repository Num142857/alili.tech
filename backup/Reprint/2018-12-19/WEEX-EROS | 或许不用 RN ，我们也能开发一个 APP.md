---
title: 'WEEX-EROS | 或许不用 RN ，我们也能开发一个 APP' 
date: 2018-12-19 2:30:07
hidden: true
slug: w3s5m8mlhvl
categories: [reprint]
---

{{< raw >}}

                    
<p>与其一堆原理，倒不如先直接介绍 <a href="https://github.com/bmfe/eros-template/wiki/eros" rel="nofollow noreferrer" target="_blank">eros</a> 到底能干什么？</p>
<blockquote>
<strong>eros 是基于 weex 的，他可以让前端同学通过 vue 的语法和 api 来写出 iOS/Android 原生应用</strong>。</blockquote>
<p>学习 weex 或者 eros 之前，请您一定要熟练使用 vue2 进行开发。</p>
<ul>
<li><a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">vue 官方文档</a></li>
<li><a href="https://github.com/bmfe/eros-template/wiki/eros" rel="nofollow noreferrer" target="_blank">eros 文档(求 star )</a></li>
</ul>
<p>本文会通过 eros 由来，优缺点评估，开发现状，环境搭建，调试等方面来介绍 eros，并会在文章后半部分与开发者一起写一个 Hello World，来更好的评估 eros。</p>
<h2 id="articleHeader0">eros 现状</h2>
<p>目前 eros 已有数十个 app 在开发中和上线的状态，其中有正在开发中的国外应用 <strong>starLife（100+页面）</strong>，也有国内正在开发的<strong>蜂觅（60+ 页面）</strong>，还有<strong>已上线的应用都在 0-50+ 页面不等</strong>，行业分布于资讯，医疗，招商，购物，政府，办公等。</p>
<p>而本木医疗（京医通）技术团队本身也基于 weex 开发了三个已上线的 app，均可在苹果商店和应用宝下载：</p>
<ul>
<li>健康首都（京医通 app版，100+页面，很多功能还未开放）</li>
<li>本木医疗助手（30+页面）</li>
<li>本木医生助理（20+页面）</li>
</ul>
<p>所以开发者大可放心，这不是一个 KPI 项目（公司没有 KPI ），已基于 MIT 协议开源。</p>
<h2 id="articleHeader1">eros 是怎么来的</h2>
<p>我们需要先从 weex 说起 ，我们直接看原理图：<br><span class="img-wrap"><img data-src="/img/remote/1460000012681853?w=1200&amp;h=806" src="https://static.alili.tech/img/remote/1460000012681853?w=1200&amp;h=806" alt="weex原理" title="weex原理" style="cursor: pointer;"></span></p>
<p>weex 原理图中分为了 Server 和 Client 两部分。</p>
<h4>Server</h4>
<p><strong>weex file:</strong> 就是我们的 .vue 文件（或官方的 .we 文件），和我们平时进行前端开发的一样。</p>
<p><strong>transformer:</strong> 以 vue 开发为例，在浏览器中我们通常都会写 <code>.vue</code>  文件和 <code>es6</code> 等浏览器目前并不支持的语法，通过前端资源打包工具 <code>webpack</code> 等通过 <code>vue-loader</code>、<code>babel-loader</code>等最终转化成为 <code>es5</code> 代码，让浏览器识别，而在 weex 最终编译出来资源文件能在浏览器跑，自然也是这个道理。</p>
<p>而浏览器端运行的 <code>es5</code> 代码是无法直接运行在客户端的（如浏览器有 BOM，DOM，客户端是没有的），所以在通过 weex 来开发客户端有很多限制的。</p>
<p>在编译客户端静态资源文件的时候，是通过 <code>weex-loader</code> 来加载这些经过限制语法编写的 weex file，最终编译成为能让客户端读懂的 <strong>JS 文件</strong>，也就是 <strong>JS Bundle</strong>。</p>
<p>有兴趣的同学可以深入了解这部分内容。<a href="http://www.jianshu.com/p/109fdece22d2" rel="nofollow noreferrer" target="_blank">深入Weex中的transformer实现原理</a></p>
<p>所以这块之所以叫 <strong>server</strong>，也就是这些静态资源文件可以在远端服务器打包生成，被客户端访问到并下载解析。</p>
<h3 id="articleHeader2">Client</h3>
<p>引用 weex 官网上的话。</p>
<blockquote>Weex 的 iOS 和 Android 客户端中都会运行一个 JavaScript 引擎，来执行 JS bundle，同时向各端的渲染层发送规范化的指令，调度客户端的渲染和其它各种能力。我们在 iOS 下选择了 JavaScriptCore 内核，而在 Android 下选择了 UC 提供的 v8 内核。无论是从性能还是稳定性方面都提供了强有力的保障。<p>为了让整个移动应用的资源利用得更好，我们在客户端提供的 JavaScript 引擎是单例的，即所有 JS bundle 公用一个 JavaScript 内核实例，同时对每个 JS bundle 在运行时进行了上下文的隔离，使得每个 JS bundle 都能够高效安全的工作。我们还把 Vue 2.0 这样的 JS Framework 做了预置，开发者不必把 JS Framework 打包在每个 JS bundle 里，从而大大减少了 JS bundle 的体积，也就进一步保障了页面打开的速度。</p>
</blockquote>
<p><strong>client</strong> 对于前端来说肯定是越了解会更好，不了解也没关系，但 weex 有个功能是很重要的，那就是 weex 搭建起了一条 JS Bridge，通过客户端自定义 <strong>module</strong> 和 <strong>component</strong>，让前端与客户端有了交互能力。</p>
<p>而自定义 <strong>module</strong> 和 <strong>component</strong> 需要一定的客户端开发知识，让很多前端开发的同学，望而却步，又因为官方的环境搭建，脚手架打包等目前还存在一些问题，把很多想学习 weex 的同学拦在了外面，所以 eros 因应而生。</p>
<p><a href="http://weex.apache.org/cn/guide/" rel="nofollow noreferrer" target="_blank">weex 官方文档</a></p>
<h2 id="articleHeader3">eros 介绍</h2>
<p>eros 是基于 weex 封装面向前端的 vue 写法的解决方案，由于 app 开发的特殊性，eros 则更偏重关心于整个 app 项目，当熟练使用了 eros 之后，您能快速通过 vue 暴露出来的方法快速构建原生 app 应用。</p>
<p>eros 流程图如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000012681854?w=1269&amp;h=1284" src="https://static.alili.tech/img/remote/1460000012681854?w=1269&amp;h=1284" alt="eros原理" title="eros原理" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">eros 能解决什么</h3>
<ul>
<li>详细的文档来解决环境搭建过程中的坑。</li>
<li>一套代码编译成 ios，android 两端原生应用。</li>
<li>封装了大量 module，让前端开发方便进行原生的操作。</li>
<li>提供 <code>appboard</code> 机制来减少包体积，并可以对其实时修改。</li>
<li>内置了一套完整的 widget ，可根据业务自行修改。</li>
<li>中介者模式来集中管理业务。</li>
<li>提供了服务器端增量发布更新逻辑。</li>
<li>脚手架可直接生成开发最新模板。</li>
<li>脚手架启动服务进行实时开发效果查看和 debug 调试。</li>
<li>脚手架更新开发平台所需 eros 依赖。</li>
<li>脚手架支持打对应平台内置包。</li>
<li>脚手架支持生成全量包，增量包，并内置与更新服务器交互逻辑。</li>
<li>脚手架支持同步更新模板内容。</li>
<li>脚手架支持 weex 的 vue 入口和 js 入口两种开发方式。</li>
<li>支持 <code>weex debug</code>
</li>
<li>支持 <code>weex-ui</code>,<code>bui-weex</code> 等组件库</li>
</ul>
<h3 id="articleHeader5">eros 不能做什么</h3>
<blockquote>eros 开发中也有很多限制，需要开发者自行斟酌。</blockquote>
<ul>
<li>weex 代码在浏览器端还有很多兼容性问题，所有 eros 目前不支持浏览器端</li>
<li>eros 不能使用 weex 市场，如果您有原生开发经验可以自行接入</li>
<li>由于 eros 对 <strong>JS Bundle</strong> 运行机制采用了 appboard 机制来减少了 js bundle 的大小，导致 weex debug 需要特定的处理。</li>
<li>eros 打出来的包体积稍大，为解决这个问题，eros 客户端动态加载依赖正在开发中。</li>
<li>如果遇到复杂的页面，如 IM 之类的，eros 建议用原生实现，weex 应付此类需求还是比较吃力。</li>
</ul>
<h3 id="articleHeader6">支持性</h3>
<ul>
<li>Android 4.1 (API 16)</li>
<li>iOS 8.0+</li>
<li>WebKit 534.30+</li>
</ul>
<h2 id="articleHeader7">开始 eros</h2>
<h3 id="articleHeader8">脚手架安装:</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i eros-cli -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-selector-tag">i</span> eros-cli -g</code></pre>
<p>如果你在中国地区，我们还是推荐您使用 cnpm 安装脚手架</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cnpm i eros-cli -g " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ cnpm <span class="hljs-selector-tag">i</span> eros-cli -g </code></pre>
<p>如果安装过程中报错，是因为 eros-cli 依赖了 node-sass，解决的方式有很多，可以自行搜索解决一下。</p>
<h3 id="articleHeader9">darwin 开发 iOS:</h3>
<ul>
<li>Xcode</li>
<li>
<p>CocoaPods</p>
<ul>
<li>升级 Ruby 环境：<code>$ sudo gem update --system</code>
</li>
<li>移除现有 Ruby 镜像：<code>$ gem sources --remove https://rubygems.org/</code>
</li>
<li>添加ruby-china镜像：<code>$ gem source -a https://gems.ruby-china.org/</code>
</li>
<li>安装 CocoaPods：<code>$ sudo gem install cocoapods</code>
</li>
<li>如果以上命令报错则执行：<code>$ sudo gem install -n /usr/local/bin cocoapods --pre</code>
</li>
<li>最后执行：<code>$ pod setup</code> 过程比较漫长，请耐心等待执行完成</li>
</ul>
</li>
</ul>
<h3 id="articleHeader10">darwin/windows/linux 开发 Android:</h3>
<ul>
<li>下载并安装 <a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html" rel="nofollow noreferrer" target="_blank">JDK</a>。</li>
<li>下载并安装 <a href="https://developer.android.google.cn/studio/index.html" rel="nofollow noreferrer" target="_blank">Android Studio</a>。</li>
</ul>
<p>JDK 是 JAVA 开发包，AndroidStudio 是 Android开发IDE，这两项不再做过多介绍。</p>
<blockquote>如果您使用虚拟机进行跨平台开发，也需要配置好对应平台的所需环境。</blockquote>
<h3 id="articleHeader11">模拟器安装</h3>
<ul>
<li>ios 开发中 xcode 已经自带了模拟器。</li>
<li>android 开发者可以下载 <code>Genymotion</code>。</li>
</ul>
<h3 id="articleHeader12">模板生成</h3>
<ol><li>首先通过脚手架自动生成开发模板(我们不推荐用sudo来执行)。</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ eros init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>eros init</code></pre>
<p>按提示选择模板，填写 app/项目名称和版本后在当前路径下会生成对应模板，然后 <code>cd</code> 到项目中。<br><span class="img-wrap"><img data-src="/img/remote/1460000012681855?w=605&amp;h=703" src="https://static.alili.tech/img/remote/1460000012681855?w=605&amp;h=703" alt="eros-init" title="eros-init" style="cursor: pointer;"></span></p>
<ol><li>下载所需依赖</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install
$ eros install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>$ npm <span class="hljs-keyword">install</span>
$ eros <span class="hljs-keyword">install</span></code></pre>
<p>eros install 会让你选择下载依赖：</p>
<ul>
<li>ios: eros ios 开发所需依赖</li>
<li>android: eros android 开发所需依赖</li>
<li>components: eros 内置了 weex-ui 和 bui 2套组件库，一般来说不用执行，当我们更新 weex-ui 和 bui 的时候可以执行。</li>
</ul>
<p><strong>每次 eros 解决了 bug 或者开发/更改了 module 和 component 时，只需要 eros install ，ios 更新前请关闭 xcode， android 会在编辑器 android studio 中弹出同步，点击即可。</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012681856?w=3044&amp;h=50" src="https://static.alili.tech/img/remote/1460000012681856?w=3044&amp;h=50" alt="安卓同步" title="安卓同步" style="cursor: pointer; display: inline;"></span></p>
<blockquote>
<code>eros install</code> 是执行 iOS/Android 目录中的 install.sh，所以 windows 系统下最好用 Git Bash 等工具，不然无法下载。</blockquote>
<ol><li>安装完依赖之后:</li></ol>
<ul>
<li>iOS: 会自动打开 <code>Xcode</code> ，然后选择一个模拟器，点击左上角的播放(运行)按钮，即可看到内置包中已经内置好的 eros demo.</li>
<li>Android:首次生成项目开发者需要多几个步骤，之后每次 eros install 都会有同步提示:</li>
</ul>
<ol><li>点击AndroidStudio上方的 <strong>File---&gt;New---&gt;Import Project。</strong>
</li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012681857?w=1236&amp;h=216" src="https://static.alili.tech/img/remote/1460000012681857?w=1236&amp;h=216" alt="" title="" style="cursor: pointer;"></span></p>
<ol><li>找到eros在你本地的地址，选择 <strong>platforms/android/WeexFrameworkWrapper</strong> ,点击<strong>OK。</strong>
</li></ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012681858?w=836&amp;h=200" src="https://static.alili.tech/img/remote/1460000012681858?w=836&amp;h=200" alt="" title="" style="cursor: pointer;"></span></p>
<ol><li>待项目构建完成，点击 AndroidStudio 上方工具栏的 <strong>Run</strong> ，即可运行项目。<span class="img-wrap"><img data-src="/img/remote/1460000012681859?w=1606&amp;h=116" src="https://static.alili.tech/img/remote/1460000012681859?w=1606&amp;h=116" alt="" title="" style="cursor: pointer;"></span>
</li></ol>
<p>注意：</p>
<blockquote>第一次打开 AndroidStuido 时，由于本地环境未配置好，AndroidStuido 会提示错误，按照 IDE 提示，大部分环境问题都可以解决。</blockquote>
<p>于是 eros 的 demo 便能在模拟器中跑起来了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012681860?w=346&amp;h=617" src="https://static.alili.tech/img/remote/1460000012681860?w=346&amp;h=617" alt="eros-demo" title="eros-demo" style="cursor: pointer;"></span></p>
<p>在 eros demo 中我们可以看到：</p>
<ul>
<li>tab1 中内置了 weex-ui 并有 demo</li>
<li>tab2 中内置了 bui 并有 demo</li>
<li>tab3 中有大部分 widget 使用的实例</li>
<li>tab4 中跑了官方的瀑布流例子和我们编写一个支持手势滑动的多个 List 的类似新闻的实例。</li>
</ul>
<blockquote>eros 的 demo 很重要，建议在开发中，首先跟随 demo 编写几个页面，并保留其代码作为使用参考。</blockquote>
<h3 id="articleHeader13">开发前</h3>
<p>我们先来介绍 eros 开发中需要知道的点：</p>
<h5>Server JS Bundle</h5>
<p>本地开发的时候（运行脚手架 <code>eros dev</code> 指令），脚手架 <code>eros-cli</code> 会通过读取配置文件来在特定端口跑一个服务，让你在本地访问到项目中 dist 下通过 webpack 打包生成的 JS Bundle。</p>
<p>假如你配置的端口号是8899，在浏览器中输入<code>localhost:8899/dist</code> 便可以看到打包生成的 JS Bundle。</p>
<p>而在不同调试载体通过 localhost 访问这些 JS Bundle 之前，<strong>都需要确保在同一局域网内</strong>，而在访问的时候，情况是不同的：</p>
<table>
<thead><tr>
<th>载体</th>
<th>hosts 文件</th>
<th>是否需要手动修改网络代理</th>
</tr></thead>
<tbody>
<tr>
<td>iOS 模拟器</td>
<td>共享电脑 hosts 文件</td>
<td>不需要</td>
</tr>
<tr>
<td>Android 模拟器</td>
<td>有</td>
<td>需要</td>
</tr>
<tr>
<td>iOS 真机</td>
<td>有</td>
<td>需要</td>
</tr>
<tr>
<td>Android 真机</td>
<td>有</td>
<td>需要</td>
</tr>
</tbody>
</table>
<p>iOS 模拟器比较特殊，是因为 iOS 模拟器和 Mac 共用一套网络设置。</p>
<blockquote>由此也能看出来，如果开发者需要进行两个端的快速开发，直接用 iOS 模拟器开发即可，开发完成之后，在适配真机和 Android 端是最快的。</blockquote>
<p><strong>所以直接修改网络代理，指向本机的 IP 地址即可访问到 JS Bundle</strong>，而我们一般为了代理软件抓包时候看这更方便，会给个新的 host ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="127.0.0.1   app.weex-eros.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span>   <span class="hljs-selector-tag">app</span><span class="hljs-selector-class">.weex-eros</span><span class="hljs-selector-class">.com</span></code></pre>
<p>设置完了之后，在不同载体的浏览器中都能访问 <code>http://app.weex-eros.com/dist</code> 下的 JS Bundle 了。</p>
<h5>Client JS Bundle</h5>
<p>上面介绍了通过服务来访问 JS Bundle，那我们拔了真机拔了数据线，断了网，没了有 JS Bundle 来源，用户打开是一片空白怎么办？<strong>答案就是 app 内置中 JS Bundle</strong>，我们也叫这部分 JS Bundle 为<code>内置包</code>，这个过程叫<code>打内置包</code>。</p>
<h5>Interceptor 拦截器</h5>
<p>那么又有问题来了，我们如何告诉 app 是访问服务包还是内置包呢？答案是 <code>Interceptor</code> 开关。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012681861?w=297&amp;h=539" src="https://static.alili.tech/img/remote/1460000012681861?w=297&amp;h=539" alt="Interceptor" title="Interceptor" style="cursor: pointer;"></span></p>
<ul>
<li>Interceptor 选中的时候，我们会拦截请求，让 app 读取内置包;</li>
<li>Interceptor 未选中的时候，不拦截请求，让 app 去配置的服务上去取服务包;</li>
</ul>
<p>第一次跑起来 demo 的开发者可以看到，拦截器是开启的，访问的是内置包，app 上线，交付测试的时候，都是走内置包。</p>
<h5>项目结构</h5>
<p>下面列出了对于开发而言关心的项目结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── config
│&nbsp;&nbsp; ├── eros.dev.js                     // 脚手架配置文件
│&nbsp;&nbsp; └── eros.native.js                  // 客户端配置文件
├── platforms                           
│&nbsp;&nbsp; ├── android                         // Android 平台主项目和依赖
│&nbsp;&nbsp; └── ios                             // iOS 平台主项目和依赖
└── src
    ├── assets                          // 本地静态资源存放，一般可存放图片
    ├── iconfont                        // 本地 iconfont 存放
    ├── js
    │&nbsp;&nbsp; ├── components                  // 组件，存放了经过修改的 weex-ui 和 bui
    │&nbsp;&nbsp; ├── config                      // 项目开发配置
    │&nbsp;&nbsp; │&nbsp;&nbsp; ├── apis.js                 // 接口别名配置
    │&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.js
    │&nbsp;&nbsp; │&nbsp;&nbsp; ├── pages.js                // 路由别名配置
    │&nbsp;&nbsp; │&nbsp;&nbsp; └── push.js                 // 个推事件处理
    │&nbsp;&nbsp; ├── css                         // 可抽离公共 css 逻辑
    │&nbsp;&nbsp; ├── mediator                    // 中介者
    │&nbsp;&nbsp; ├── pages                       // 页面开发，所有页面都放置在这里
    │&nbsp;&nbsp; └── widget                      // widget 源码
    └── mock
        └── test                        // mock 服务，在 eros.dev.js 可进行配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── config
│&nbsp;&nbsp; ├── eros<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.js</span>                     <span class="hljs-comment">// 脚手架配置文件</span>
│&nbsp;&nbsp; └── eros<span class="hljs-selector-class">.native</span><span class="hljs-selector-class">.js</span>                  <span class="hljs-comment">// 客户端配置文件</span>
├── platforms                           
│&nbsp;&nbsp; ├── android                         <span class="hljs-comment">// Android 平台主项目和依赖</span>
│&nbsp;&nbsp; └── ios                             <span class="hljs-comment">// iOS 平台主项目和依赖</span>
└── src
    ├── assets                          <span class="hljs-comment">// 本地静态资源存放，一般可存放图片</span>
    ├── iconfont                        <span class="hljs-comment">// 本地 iconfont 存放</span>
    ├── js
    │&nbsp;&nbsp; ├── components                  <span class="hljs-comment">// 组件，存放了经过修改的 weex-ui 和 bui</span>
    │&nbsp;&nbsp; ├── config                      <span class="hljs-comment">// 项目开发配置</span>
    │&nbsp;&nbsp; │&nbsp;&nbsp; ├── apis<span class="hljs-selector-class">.js</span>                 <span class="hljs-comment">// 接口别名配置</span>
    │&nbsp;&nbsp; │&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>
    │&nbsp;&nbsp; │&nbsp;&nbsp; ├── pages<span class="hljs-selector-class">.js</span>                <span class="hljs-comment">// 路由别名配置</span>
    │&nbsp;&nbsp; │&nbsp;&nbsp; └── push<span class="hljs-selector-class">.js</span>                 <span class="hljs-comment">// 个推事件处理</span>
    │&nbsp;&nbsp; ├── css                         <span class="hljs-comment">// 可抽离公共 css 逻辑</span>
    │&nbsp;&nbsp; ├── mediator                    <span class="hljs-comment">// 中介者</span>
    │&nbsp;&nbsp; ├── pages                       <span class="hljs-comment">// 页面开发，所有页面都放置在这里</span>
    │&nbsp;&nbsp; └── widget                      <span class="hljs-comment">// widget 源码</span>
    └── mock
        └── test                        <span class="hljs-comment">// mock 服务，在 eros.dev.js 可进行配置</span></code></pre>
<p>有几个需要注意的地方</p>
<ul>
<li>
<strong>eros.dev.js</strong> 中如果改变，<strong>这是如果你在跑着 <code>eros dev</code> 服务，需要断开，让脚手架重新读取配置文件。</strong>（开发中会经常添加新的打包入口）</li>
<li>
<strong>eros.native.js</strong> 是<strong>客户端读取的配置文件，目前是客户端在开启 app 的时候统一从内置包中读取</strong>，所以当此文件变动的时候，需要重新打内置包 eros pack，重新运行下 app，即可生效。</li>
</ul>
<h3 id="articleHeader14">Hello Eros</h3>
<p>我们来简单开发一个 Hello World：</p>
<p>1.首先<strong>关闭调试中的拦截器</strong>，让 app 访问服务包，这时候刷新页面肯定是空白的，因为都没有服务。</p>
<p>2.项目根目录下运行开发服务 <strong><code>eros dev</code></strong>，运行成功之后刷新出现内置的 demo 页面，这是其实你已经可以任意修改 pages/eros-demo 中代码，刷新后看效果了，有兴趣可以到处试一试。</p>
<blockquote>tips: 双击调试按钮即可刷新。</blockquote>
<p>3.在 pages 目录下新建一个 <code>Hello.vue</code> 文件。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012681862?w=506&amp;h=122" src="https://static.alili.tech/img/remote/1460000012681862?w=506&amp;h=122" alt="Hello.vue" title="Hello.vue" style="cursor: pointer;"></span><br>文件中写一些很简单的语法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div style=&quot;margin-top: 50px;&quot;>
        <text class=&quot;title&quot;>Hello，</text>
        <text class=&quot;title&quot;>developer</text>
        <bui-button class=&quot;btn-250&quot; type=&quot;primary&quot; value=&quot;show eros&quot;>show eros</bui-button>
    </div>
</template>
<script>
    import buiButton from 'Eros/bui/components/bui-button'
    export default {
        components: { buiButton }
    }
</script>
<style>
.title{
    font-size: 60;
}
.btn-250{
    width: 250;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin-top: 50px;"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>Hello，<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>developer<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">bui-button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-250"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"show eros"</span>&gt;</span>show eros<span class="hljs-tag">&lt;/<span class="hljs-name">bui-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> buiButton <span class="hljs-keyword">from</span> <span class="hljs-string">'Eros/bui/components/bui-button'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">components</span>: { buiButton }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.title</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">60</span>;
}
<span class="hljs-selector-class">.btn-250</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">250</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>4.修改 <strong><code>eros.dev.js</code></strong> 中的 exports，如果不需要，可以把 eros-demo 中的路径都删掉，只填入新的文件入口 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;exports&quot;: [
    // appBoard 
    &quot;js/config/index.js&quot;,
    // mediator
    &quot;js/mediator/index.vue&quot;,
    // home
    &quot;js/pages/Hello.vue&quot;
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">"exports"</span>: [
    <span class="hljs-comment">// appBoard </span>
    <span class="hljs-string">"js/config/index.js"</span>,
    <span class="hljs-comment">// mediator</span>
    <span class="hljs-string">"js/mediator/index.vue"</span>,
    <span class="hljs-comment">// home</span>
    <span class="hljs-string">"js/pages/Hello.vue"</span>
],</code></pre>
<p>这里注意上面两个是和 eros.native.js 中的 appBoard，mediator 一一对应的，如果这里两边修改没有对应上会导致报错，建议平时不用变动。</p>
<p>5.告诉 app 我要重新改变首页，修改 <strong>eros.native.js</strong> 中的 page.homePage 路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;page&quot;: {
    &quot;homePage&quot;: &quot;/pages/Hello.js&quot;,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">"page"</span>: {
    <span class="hljs-string">"homePage"</span>: <span class="hljs-string">"/pages/Hello.js"</span>,
}</code></pre>
<p>6.<strong>断开 <code>eros dev</code> 服务</strong>，因为要告诉脚手架配置文件的变动。</p>
<p>7.<strong><code>eros pack</code> 打内置包</strong>，因为要告诉 app 配置文件中的变动。</p>
<p>8.重新运行（run）app。</p>
<p>这时首页就已经开发好了：<br><span class="img-wrap"><img data-src="/img/remote/1460000012681863?w=728&amp;h=1298" src="https://static.alili.tech/img/remote/1460000012681863?w=728&amp;h=1298" alt="首页" title="首页" style="cursor: pointer;"></span><br>下面我们修改做一个页面间的跳转，试一试 Widget:</p>
<p>9.再在 <code>pages </code>目录下新建一个页面 <strong><code>Eros.vue</code></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div style=&quot;margin-top: 50px;&quot;>
        <text class=&quot;title&quot;>Hi!</text>
        <text class=&quot;title&quot;>Enjoy it!</text>
    </div>
</template>
<script>
    export default {
    }
</script>
<style>
.title{
    font-size: 60;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin-top: 50px;"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>Hi!<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>Enjoy it!<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.title</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">60</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>10.修改 <strong><code>eros.dev.js</code></strong> 告诉脚手架添加页面了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;exports&quot;: [
    // appBoard 
    &quot;js/config/index.js&quot;,
    // mediator
    &quot;js/mediator/index.vue&quot;,
    // home
    &quot;js/pages/Hello.vue&quot;,
    // eros
    &quot;js/pages/Eros.vue&quot;
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">"exports"</span>: [
    <span class="hljs-comment">// appBoard </span>
    <span class="hljs-string">"js/config/index.js"</span>,
    <span class="hljs-comment">// mediator</span>
    <span class="hljs-string">"js/mediator/index.vue"</span>,
    <span class="hljs-comment">// home</span>
    <span class="hljs-string">"js/pages/Hello.vue"</span>,
    <span class="hljs-comment">// eros</span>
    <span class="hljs-string">"js/pages/Eros.vue"</span>
],</code></pre>
<p>11.注册路由，修改 <strong><code>js/config/pages.js</code></strong>，清空 demo 中现有的配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    'Eros': {
        title: 'Eros',
        url: '/pages/Eros.js',
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-string">'Eros'</span>: {
        <span class="hljs-attr">title</span>: <span class="hljs-string">'Eros'</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">'/pages/Eros.js'</span>,
    },
}</code></pre>
<p>这里的 url 是填写 dist 目录中打包出来 JS Bundle 的相对路径（现在并没有这个 JS Bundle，需要重启开发服务读取配置才会有），注意因为是 JS Bundle 所以以 .js 为结尾。</p>
<p>12.重启 eros dev，刷新一下，并无任何变化，这时候还无法跳转到新建的页面，因为只是配置了路由，并未触发跳转方法，我们需要修改下 <strong><code>Hello.vue</code></strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div style=&quot;margin-top: 50px;&quot;>
        <text class=&quot;title&quot;>Hello，</text>
        <text class=&quot;title&quot;>developer</text>
        <bui-button class=&quot;btn-250&quot; type=&quot;primary&quot; value=&quot;show eros&quot; @click=&quot;showEros&quot;>show eros</bui-button>
    </div>
</template>
<script>
    import buiButton from 'Eros/bui/components/bui-button'
    export default {
        components: { buiButton },
        methods: {
            // 这里给按钮添加 showEros 事件来跳转
            showEros() {
                this.$router.open({
                    name: 'Eros'
                })
            }
        }
    }
</script>
<style>
.title{
    font-size: 60;
}
.btn-250{
    width: 250;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"margin-top: 50px;"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>Hello，<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>developer<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">bui-button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-250"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"show eros"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"showEros"</span>&gt;</span>show eros<span class="hljs-tag">&lt;/<span class="hljs-name">bui-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> buiButton <span class="hljs-keyword">from</span> <span class="hljs-string">'Eros/bui/components/bui-button'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">components</span>: { buiButton },
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-comment">// 这里给按钮添加 showEros 事件来跳转</span>
            showEros() {
                <span class="hljs-keyword">this</span>.$router.open({
                    <span class="hljs-attr">name</span>: <span class="hljs-string">'Eros'</span>
                })
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.title</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">60</span>;
}
<span class="hljs-selector-class">.btn-250</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">250</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>13.双击调试按钮刷新，跳转逻辑已经完成了！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012681864?w=361&amp;h=622" src="https://static.alili.tech/img/remote/1460000012681864?w=361&amp;h=622" alt="router" title="router" style="cursor: pointer; display: inline;"></span></p>
<p>至此 Hello world 已经编写完成，可以便根据文档来编写你的业务了。</p>
<ul>
<li><a href="https://github.com/bmfe/eros-template" rel="nofollow noreferrer" target="_blank">eros 模板地址</a></li>
<li><a href="https://github.com/bmfe/eros-template/wiki/eros" rel="nofollow noreferrer" target="_blank">eros 文档地址</a></li>
</ul>
<p>eros 还有 demo 是根据网易严选 demo 进行改编的（感谢 <a href="https://github.com/zwwill" rel="nofollow noreferrer" target="_blank">zwwill</a> 的开源和指导），开发者也可以进行参考：</p>
<ul>
<li><a href="https://github.com/bmfe/eros-yanxuan-demo-v2" rel="nofollow noreferrer" target="_blank">eros 网易严选 demo</a></li>
<li><a href="https://github.com/wennjie/weex-book" rel="nofollow noreferrer" target="_blank">weex-book</a></li>
</ul>
<p>最后开发者需要自行修改原生项目中的一些信息，就可以发 app 正式版本，对外使用了，发布的方法网上有很多介绍，就不过多赘述。</p>
<h3 id="articleHeader15">增量发布</h3>
<p>具体更新逻辑可以<a href="https://github.com/bmfe/eros-template/wiki/%E5%8F%91%E5%B8%83%E6%9B%B4%E6%96%B0" rel="nofollow noreferrer" target="_blank">点击这里</a>，这里写下简单的说明。</p>
<p>app 发布有两种情况：</p>
<ul>
<li>当 platforms ios/android 目录下的代码发生变动（包括 eros install 平台的依赖）的时候，我们是需要重新发布到市场上重新走审核逻辑的，用户需要重新去市场上面下载。</li>
<li>而当项目中的业务逻辑发生变动，如新增页面，修改当前页面逻辑等，最终导致 JS Bundle 发生变化，便可以使用增量发布，每次 app 启动会自动检测更新，下载 JS Bundle 中发生变动的部分，用户重启即生效。</li>
</ul>
<p>同时 eros-cli 也支持生成全量包和生成增量包：</p>
<p>生成全量包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ eros build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>eros build</code></pre>
<p>生成增量包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ eros build -d" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;">$ eros <span class="hljs-keyword">build </span>-d</code></pre>
<p>目前增量发布的搭建还是比较麻烦，当开发者开发完 app 之后可以参考 <a href="https://github.com/bmfe/eros-publish" rel="nofollow noreferrer" target="_blank">eros-publish</a> 来搭建增量发布的服务，有经验的同学也可以在发布机上部署 <a href="https://github.com/bmfe/eros-cli" rel="nofollow noreferrer" target="_blank">eros-cli</a>，来自行编写发布系统。</p>
<p>就如已有 eros 开发者基于 <code>eros-publish</code> 编写了的自己增量发布系统 <a href="https://github.com/hodgevk/lygtq-eros-publish" rel="nofollow noreferrer" target="_blank">lygtq-eros-publish</a>，并开源，非常感谢 <a href="https://github.com/hodgevk" rel="nofollow noreferrer" target="_blank">hodgevk</a> 的贡献。</p>
<h3 id="articleHeader16">总结</h3>
<p>就如官方文档中所说，在熟悉了 eros 之后可以快速开发中小型 app 应用，但 eros 还有很多的不足，需要更多的人加入进来完善他，最终是想给 vue 开发者们另一个舞台。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WEEX-EROS | 或许不用 RN ，我们也能开发一个 APP

## 原文链接
[https://segmentfault.com/a/1190000012681848](https://segmentfault.com/a/1190000012681848)

