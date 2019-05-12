---
title: '基于weex的有赞无线开发框架' 
date: 2019-03-02 2:30:07
hidden: true
slug: ugtp4prqq8
categories: [reprint]
---

{{< raw >}}

                    
<p>出于对开发效率和动态化的要求，无线端的开发框架也一直在更新，从 Hybrid、结构化 Native View、React Native、Weex，再到现在正在大受关注的 Flutter。什么样的框架才是适合自己的团队？不仅要有技术追求，而且要考虑实际业务需要。最近，有赞移动选择了 weex 作为无线开发框架，搭建了从开发、Debug、构建、发布、数据一个闭环的流程。本文将对此进行分享。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016850044?w=359&amp;h=349" src="https://static.alili.tech/img/remote/1460000016850044?w=359&amp;h=349" alt="开发闭环" title="开发闭环" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">一、什么是 weex</h2>
<p>Weex 是阿里巴巴开源的一套构建高性能、可扩展的原生应用跨平台开发方案。首先总结一下 weex 的特点：</p>
<ol>
<li>
<strong>页面的开发目前支持<a href="https://alibaba.github.io/rax/" rel="nofollow noreferrer" target="_blank">Rax</a>和<a href="https://vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue</a></strong><p>Weex 也不是只支持 Vue 和 Rax，你也可以把自己喜欢的前端框架集成到 Weex 中，有一个文档<a href="https://weex.incubator.apache.org/cn/guide/extend-js-framework.html" rel="nofollow noreferrer" target="_blank">扩展前端框架</a>描述了如何实现，但是这个过程仍然非常复杂和棘手，你需要了解关于 js-native 之间通信和原生渲染引擎的许多底层细节。</p>
</li>
<li>
<strong>一次编写，三端（Android、iOS、前端）运行</strong><p>前提是都集成了 weex sdk，另外视觉表现做不到完全一样，有的会有一些差异，需要做一下适配。所以写 weex 页面的时候，如果支持三端，便需要在三端都进行自测。</p>
</li>
<li>
<strong>UI 的绘制通过 native 的组件，JavaScript 逻辑在 JS 引擎里运行，两者通过 JavaScriptCore 通信</strong><p>weex 里使用组件都需要在 native 端注册，这样 weex 里才可以使用，运行的时候通过注册时记录的 map 进行查找。weex sdk 内置注册了一些基础的组件，包括 list、text、input 等。WXJSCoreBridge 封装了 JavaScriptCore 实现 native 和 js 之间的通信。</p>
</li>
<li>
<strong>支持 Native 扩展</strong><p>可以将 native 的 UI 组件封装成 component，将 native 的逻辑代码封装成 module。从而在 weex 里可以进行使用。这里的 natiev UI 组件包括 modal、webview、image 等，这里的 native 逻辑代码包括 storage、network 等。</p>
</li>
<li>
<strong>每个 weex 页面会被打包成一个 js 文件，weex sdk 将 js 文件渲染成一个 view</strong><br>weex 的打包通过 webpack，将每个页面打包成独立的一个 js 文件，weex sdk 会将 js 进行解析，将 UI 部分绘制成一个 view, 再绑定 view 的事件与 js 代码绑定。</li>
</ol>
<h2 id="articleHeader1">二、为什么要使用weex进行无线开发</h2>
<h3 id="articleHeader2">1. 效率问题</h3>
<p>1）开发的人力成本</p>
<p>如果不算 web 端，一个页面本来需要 Android 和 iOS <strong>2</strong> 个人开发；使用 weex 后只需要 <strong>1</strong> 个开发页面。</p>
<p>2）开发的编译速度</p>
<p>随着项目渐渐变得庞大，Android 项目一次编译需要 <strong>2-3 分钟</strong>，机器不好的还需要 <strong>10 分钟</strong>，iOS 可能会快一点，也需要 <strong>1-2 分钟</strong>。使用 weex 后，界面修改，只需要<strong>十几秒</strong>。</p>
<p>3）测试效率</p>
<p>提测之后，发现 bug，修复完成，测试总需要重新下载一个包进行安装；使用 weex 后，跟原生无关的 bug，只要测试重启 App 就可以进行验证。</p>
<h3 id="articleHeader3">2. 动态化</h3>
<p>weex 页面最后打包完是一个 js 文件，只要能做到动态下发 JavaScript，那便可以实现动态化，可以热修复，甚至可以热部署，完全替换或者新增页面。</p>
<h3 id="articleHeader4">3. 成熟度</h3>
<p>在 2016 年阿里双十一中，Weex 在阿里双十一会场中的覆盖率接近 99%，页面数量接近 2000，覆盖了包括主会场、分会场、分分会场、人群会场在内几乎所有的阿里双十一会场业务。阿里双十一主会场秒开率97%，全部会场页面达到 93%。<br>2016 年 12 月 15 日，阿里巴巴宣布将移动开源项目 Weex 捐赠给 Apache 基金会开始孵化。<br>2017 年，weex 在阿里业务里增长如下图，来自 WeexConf 2018。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016850045" src="https://static.alili.tech/img/remote/1460000016850045" alt="阿里业务增长" title="阿里业务增长" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">4. 接入成本</h3>
<p>经过实践，一个移动端开发，一周时间就可以开始进行使用 weex 进行业务开发。</p>
<h2 id="articleHeader6">三、如何使用 weex 进行无线开发</h2>
<p>weex 其实是一套方案，各个流程很多东西需要自己建设，把它建设得让小伙伴可以以较小成本开始使用 weex，把它建设得融入已有的系统。这方面，我们目前做了下面这几个方面，还任重道远。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016850046" src="https://static.alili.tech/img/remote/1460000016850046" alt="zanweex 建设" title="zanweex 建设" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">1. 开发工具 zweex-toolkit</h3>
<p>这是一个脚手架工具，基于 weex 官方的 weex-toolkit，用于新建 weex 工程，目前只支持 vue。</p>
<p>随着页面的增多，业务的复杂，工程会慢慢变得庞大，每次运行的时候如果全部页面都运行起来比较慢。为了解决这个问题，使用 zweex-toolkit 创建建的工程模板支持运行的时候，支持只运行指定目录下的页面，只要在 npm start 后加上参数即可，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run start hi,helloworld" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> start hi,helloworld</span></code></pre>
<p>这样就表示只运行 hi 目录下和 helloworld 下的页面。<br>另外，我们支持：</p>
<ul>
<li>新增页面<code>zweex page</code>
</li>
<li>开启调试<code>zweex debug</code>
</li>
</ul>
<h3 id="articleHeader8">2. ZanWeex SDK 的实现</h3>
<p>官方 weex sdk 做的事情，就是输入一个 js 文件，然后返回一个view。考虑到每个应用的路由和个性化的需要，这一点，ZanWeex SDK 没有做其他工作，也还是返回了一个view，业务方可以根据自己的需要将view添加到自己想要展示的地方。ZanWeex SDK 做的事情主要有如下几方面：</p>
<p>1）<strong>支持下发配置，支持动态化，可以完成整个页面的替换</strong></p>
<p>weex 页面打包后的结果是一个 js 文件，所以可以进行下发进行动态更新，那么就需要有一份配置，来关联页面路由和 js 文件的关系，于是我们设计了这样的数据结构：</p>
<p>h5：页面路由地址，可以直接使用发布平台生成的 h5 地址</p>
<p>js：打包后的 js 文件地址</p>
<p>version：支持的最低 App 版本，因为新页面如果需要 native 扩展，那就需要发布新版本进行支持</p>
<p>md5：为了校验完整性，我们在配置里添加每个 js 文件的 md5。</p>
<p>2）<strong>支持多模块独立配置，互不影响</strong><br> 一个App里会有多个模块，每个模块可能由独立的团队进行负责，所以为了减少耦合，我们将配置独立，每个模块可以独立管理自己的配置，独立接入weex，不依赖于宿主App。</p>
<p>3）<strong>预加载页面模板，支持页面模板缓存和配置缓存</strong></p>
<ul><li>如果没有缓存，每次都从服务端拉取页面模板，那么是不可能达到秒开的，跟没有做缓存的H5页面就区别不大了。我们SDK会预加载页面模板到本地，打开过的页面会缓存到内存。这样渲染的时间就更接近原生的渲染时间了。</li></ul>
<p>4）<strong>支持开发时的hot  reloading，前端开发般的体验</strong></p>
<ul>
<li>如果没有hot  reloading，那么每次修改完页面，都得退出页面重新进入。为了省去这个操作，hot reloading是必须的。</li>
<li>weex 工程里本地开发时候，通过webpack-dev-server来启动一个websocket，zan weex sdk 打开一个weex页面后，去与它建立连接。webpack-dev-server将工程的编译状态发送给ZanWeex SDK，当接收到渲染完成的指令时，就重新渲染页面，从而达到 hot reloading的目的。</li>
</ul>
<p>5）<strong>支持页面的适配，提供环境变量</strong><br>ZanWeex SDK 会提供以下四个变量共 weex 页面使用，方便完成页面配置。</p>
<ul>
<li>容器的高度：weex.config.yzenv.viewHeight</li>
<li>容器的宽度：weex.config.yzenv.viewWidth</li>
<li>状态栏高度：weex.config.yzenv.statusBarHeight</li>
<li>底部栏高度（针对iPhone X，其他为0)：weex.config.yzenv.bottomHeight</li>
</ul>
<p>6）<strong>开发阶段日志的查看</strong><br>在开发阶段，weex sdk 源码里输出的日志以及 js 里通过 console.log 输出的日志，还有 js 运行的报错，都只能通过 XCode 和 Android Studio 进行查看。这对于一个只了解一端的开发人员是非常不方便的。于是我们做了一个入口，在打开 weex 页面的时候，会显示该入口，点击即可查看所输出的日志。</p>
<p>7）<strong>参数传递</strong><br>正向传参：从 A 页面跳转到 B 页面，参数传递是开发过程肯定会遇见的一个场景。SDK  对外提供的渲染接口 renderByH5 的参数包括 url，params，data。业务方进行渲染的时候，可以将参数直接跟在 url 后面，或者通过 params、data 传入，不同方式，取的方式也不一样：</p>
<ul>
<li>url 后面的参数，会传入 data，weex 页面里直接在 data 里定义参数就会自动赋值；</li>
<li>params的参数，在 weex 页面里可以通过 weex.config.name 来获取；</li>
<li>data 传入的参数，获取方式同第一种。</li>
<li>反向传参：从 B 页面返回到 A 页面的时候，携带参数返回也是很常见的一个场景。SDK  提供了统一的存储类 ZParamStorage 来临时存储参数。页面 B 要返回的时候先把数据存入存储区，A 页面显示的时候再从存储区获取，然后清空存储区。</li>
<li>非跳转的参数传递：weex 页面之间，可以采用 BroadcastChannel 进行传参，weex 与 native 之间的传递可以通过自己封装 Module 进行实现。</li>
</ul>
<h3 id="articleHeader9">3. 页面的开发</h3>
<p>前面有提到，weex 的页面目前可以采用 vue 或者 Rax 编写。对于 Vue 和 Rax 的语法这里不做陈述。这里主要总结了容易在实际开发中卡住小伙伴的几个问题。</p>
<p>1）<strong>如何判断一个页面是否用 weex 来实现？</strong></p>
<p>可以认为所有的新页面都可以采取 weex 来开发，区别在于这个页面使用的 native 能力有多少。可以通过自定义 Module 来调用 native 的能力，通过自定义 component 来使用 native 的组件；</p>
<p>2）<strong>什么时候需要自定义 Module？</strong></p>
<ul>
<li>
<p>需要原生的能力的时候，比如：</p>
<ul>
<li>要调用系统选择图片的接口</li>
<li>调用打电话、发短信的功能</li>
<li>打开其他应用</li>
</ul>
</li>
<li>
<p>调用已有的业务逻辑，比如：</p>
<ul>
<li>加密、解密逻辑</li>
<li>登录逻辑</li>
</ul>
</li>
</ul>
<p>3）<strong>什么时候需要自定义 component？</strong></p>
<ul>
<li>如果一个组件已经使用 native 实现，为了保持统一一致，那么可以将原有的组件封装成 component</li>
<li>如果一个组件不能使用 weex 实现，比如地图组件、超长图显示等</li>
</ul>
<p>4）<strong>多个弹层的布局如何实现？</strong></p>
<p>weex 页面渲染的层级，是从上而下的，越在下面的布局，显示越上层。所以要作为弹层的布局，就把它放到最下面。</p>
<p>5）<strong>页面的动画如何实现？</strong></p>
<p>官方 weex sdk 已经封装了 animation 的 module 可以直接使用，复杂的动画可以使用 BindingX 实现。</p>
<p>6）<strong>weex 的代码如何复用？</strong></p>
<p>代码都可以抽离出组件。</p>
<ul>
<li>作为一个 UI 组件，抽离成一个组件，向外暴露属性参数和事件接口；</li>
<li>作为独立的 js 函数，抽离成一个 js 供其他页面引入；</li>
<li>css 样式也可以抽离成一个 css 文件，供其他页面引入；</li>
<li>如果包含多个组件形式，可以通过 mixins 来引入。</li>
</ul>
<h3 id="articleHeader10">4. 构建和打包平台</h3>
<p>我们开发了以项目为单位的构建平台：</p>
<ul>
<li>每个项目可以添加多个分支，可以是不同仓库的分支。因为一个项目有可能是跨团队跨模块的，但是需要一起发布。</li>
<li>构建通过 webpack 构建，构建之后，支持发布线下存储和线上 cdn</li>
</ul>
<p>我们还开发了以应用为单位的 weex 发布平台：</p>
<ul>
<li>这里的应用是一个抽象概念，不是传统的“应用”，可以理解成模块</li>
<li>业务方可以在构建平台构建完成后，一键跳转到发布平台进行发布，除了需要第一次填写最低支持的版本号，其他均无需操作。</li>
<li>发布平台支持灰度发布、全量发布和回滚。</li>
<li>发布平台会展示 weex 在端上的使用情况，渲染时间、渲染错误、下载时间等</li>
</ul>
<h2 id="articleHeader11">四、遇到的问题以及解决方案</h2>
<p>在开发过程中，很多问题，可以通过阅读源码来解决，比如：</p>
<ul>
<li>使用 iconfont 的时候，是否已支持缓存?<p>答：已支持，包括内存缓存和文件缓存，内存缓存使用 familyname 来做 key，文件缓存使用 md5(url) 来做本地文件名</p>
</li>
<li>module实现的函数能不能返回参数？<p>答：module 的函数氛围 UIThread 和 JSThread，JSThread 对于 js 线程来说是同步的，支持直接返回参数；UIThread 对于 JS 线程来说是异步的，不支持直接返回参数，只能使用 callback</p>
</li>
</ul>
<p>另外，很多常见的问题，我们已经在 ZanWeexSDK 进行了解决，包括实现动态化、多模块的支持、缓存管理、Hot Reloading、日志查看、页面适配、参数传递等。</p>
<p>此外，还会有一些常见的问题，在此罗列一下：</p>
<ol>
<li>配置的更新机制是怎样的？更新失败，如何打开 weex 页面？<p>答： 配置的更新接口开放给业务方调用，由业务方决定什么时候调用更新接口；SDK 里做了三种处理，来尽量保证配置可以更新成功：</p>
<p>1）配置接口拉取失败后，会有三次重试；</p>
<p>2）网络从无网变成有网时，sdk 会检查配置是否已拉取，如果未拉取就主动拉取</p>
<p>3）允许业务方内置配置和 js 文件，当拉取失败后，SDK里会从内置配置里读取</p>
</li>
<li>配置的版本管理是怎样的？<p>答：配置每次发布的时候，都会指定该发布支持的 App 最低版本号。每次请求，会携带 App 版本号，服务端只会返回符合该版本号的最新配置。</p>
</li>
<li>支持不支持屏幕旋转？<p>答：答案是支持的。旋转之后，屏幕变成了横屏，weex 就按照横屏的尺寸来渲染，问题是只要你写的页面符合这种变化就可以了，跟 native 来实现页面没有什么区别。</p>
</li>
</ol>
<h2 id="articleHeader12">五、未来还要继续做的事情</h2>
<ol>
<li>组件库的建设</li>
<li>性能统计，比如帧率、内存、CPU</li>
<li>配置和js文件的增量更新、推送更新</li>
<li>降级处理</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bV50Mk?w=640&amp;h=400" src="https://static.alili.tech/img/bV50Mk?w=640&amp;h=400" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于weex的有赞无线开发框架

## 原文链接
[https://segmentfault.com/a/1190000016850041](https://segmentfault.com/a/1190000016850041)

