---
title: '用 Electron 打造 Win/Mac 应用，从「代码」到可下载的「安装包」，可能比你想得麻烦一点' 
date: 2018-12-26 2:30:14
hidden: true
slug: gy01jgdooc5
categories: [reprint]
---

{{< raw >}}

                    
<p>首发于<a href="https://webfe.kujiale.com/build-electron-app-gulp-workflow/" rel="nofollow noreferrer" target="_blank">酷家乐前端博客</a>，作者@摘星（segmentfault @StinsonZhao）</p>
<blockquote>
<p>我们能从很多地方学习到怎么起一个 Electron 项目，有些还会介绍怎么打包或构建你的代码，但距离「真正地发行一款 Electron 产品」这一目标，还有很多工作需要做...</p>
<p>这是 Electron 系列文章的第二篇，这一篇文章将和大家分享我是怎么去构建<strong>自动化的 Electron 开发构建工程</strong>的，说白了，就是<strong>怎么把敲的代码变成一个用户可以下载安装的包</strong>，当然随着之后应用复杂度的提升和技术再选型，工程体系可能随时会重构或演进，但至少可以给大家一些参考，欢迎留言交流。</p>
</blockquote>
<p>这是一篇很长的文章（手册），写得比较「唐僧」（知我者可以说我写得比较用心），至少会花你一天时间（没开玩笑），适用场景是「用 Electron 打造 <strong>Windows 或 Mac</strong> 应用」，是的，你没看错，同时会讲清楚兼容 Win 和 Mac 两个系统的流程。文中提及的技术方案绝对不是最佳的（我保证），因为几乎每隔几天我都会发现某个环节可以做得更好，但要明白<strong>要唱多大的戏，就先搭多大的台，够用就好，不要为了搭台耽误演出时间</strong>。</p>
<p>工程自动化，应该是所有开发者的一种基础追求，当你搭建建好工程体系，以后你将专注于产品功能的开发，而不会花大量不必要的时间去手动构建。作为前端，可能我们已经熟悉了 web 应用的构建和部署，但是客户端程序有其本身的特点，相比较 web 应用最大也是我认为最根本的一点区别在于「<strong>你的应用是被用户下载过去安装在用户本地再跑起来的</strong>」。</p>
<p>这一区别对工程的影响在于，你不可能把你的代码部署到「用户的电脑」，你需要构建安装包，你需要针对不同的用户系统构建不同的安装包，你需要让你的应用被系统认为是安全的... </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011908327?w=1280&amp;h=600" src="https://static.alili.tech/img/remote/1460000011908327?w=1280&amp;h=600" alt="本文目的" title="本文目的" style="cursor: pointer; display: inline;"></span></p>
<p>本文需要做的是，<strong>把客户端的打包构建发行这一流程做到像「把大象放进冰箱」一样的简单：打开命令行，敲一个 <code>npm run xxx</code>，喝一口咖啡，咪哩嘛哩哄，安装包出现</strong>（一开始打造这个流程时，剧本可能是「喝一口咖啡，啪，Error 了，又 Error 了」，take it easy，生活需要慢慢品味 —— 来自一位25岁的仙风道骨白胡子程序员）。</p>
<p>本文将分以下小节和大家分享「从本地的代码到云端可下载的安装包」这一路的风景，你会有漫步月球般的感觉（因为月球全是坑啊，还没氧气）：</p>
<ul>
<li>第一节是关于目录结构的讨论，合适的目录结构会是一个良好的开端</li>
<li>第二节是之后几个小节的概述，阐述了怎么把这一整个过程分成多个环节，每个环节又大致要做什么事</li>
<li>第三到七节分别详细描述了「配置」、「打包」、「代码签名」、「构建安装包」、「发行安装包」这几个环节要做哪些事，有什么讲究</li>
<li>第八节是简述一些可进一步研究或优化的点</li>
<li>附：这样设计的 gulpfile 文件结构</li>
</ul>
<p>下面一一展开进行阐述，再次强调，文中很多依赖的技术或包，你都可以尝试替换成自己相中的，不必在意是选「翠花」还是「桂花」，多处处就知道了。</p>
<h2 id="articleHeader0">一、目录结构</h2>
<p>以下目录结构供参考，没有很详细地展开，因为每个应用可能不同，最想表达的是这是一个「<strong>双 package.json 结构</strong>」，你可以看到根目录下有一个<code>package.json</code>，<code>app</code>目录下还有一个<code>package.json</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/       // 项目根目录
├── app/                // 应用源码目录，打包就针对app目录进行打包
│   ├── assets/                     // 应用需要的图片、icon等资源
│   ├── config/                     // 配置文件存放
│   ├── consts/                     // 应用运行需要的常量，如ipcChanel
│   ├── lib/                        // 引入的库文件，如jquery
│   ├── plugins/                    // 应用运行需要的插件，如flash
│   ├── utils/                      // 常用的工具方法
│   ├── view/                       // 视图，html、css和js
│   ├── app_config.js               // 整个app的配置，引入config文件夹下文件
│   ├── main.js                     // 应用入口
│   ├── package.json                // 内部的package，定义应用的版本、运行依赖等
│   └── yarn.lock                   
├── build_resource/     // 构建需要的一些工具、资源或者脚本的目录
├── config/             // 环境配置文件目录，会选择一个写入到app/config
├── deploy/             // 部署脚本，用户部署文件到cdn或上传文件到OSS
├── reserve/            // 保留目录，存放一些文件用于写入到app内
├── dist/               // 打包和构建的目标目录
├── release/            // 发行的目标目录
├── .gitignore
├── gulpfile.js         // gulp配置
├── package.json        // 外部package.json，用于定义开发依赖和脚本
└── yarn.lock" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">/       <span class="hljs-comment">// 项目根目录</span>
├── app/                <span class="hljs-comment">// 应用源码目录，打包就针对app目录进行打包</span>
│   ├── assets/                     <span class="hljs-comment">// 应用需要的图片、icon等资源</span>
│   ├── config/                     <span class="hljs-comment">// 配置文件存放</span>
│   ├── consts/                     <span class="hljs-comment">// 应用运行需要的常量，如ipcChanel</span>
│   ├── lib/                        <span class="hljs-comment">// 引入的库文件，如jquery</span>
│   ├── plugins/                    <span class="hljs-comment">// 应用运行需要的插件，如flash</span>
│   ├── utils/                      <span class="hljs-comment">// 常用的工具方法</span>
│   ├── view/                       <span class="hljs-comment">// 视图，html、css和js</span>
│   ├── app_config.js               <span class="hljs-comment">// 整个app的配置，引入config文件夹下文件</span>
│   ├── main.js                     <span class="hljs-comment">// 应用入口</span>
│   ├── package.json                <span class="hljs-comment">// 内部的package，定义应用的版本、运行依赖等</span>
│   └── yarn.lock                   
├── build_resource/     <span class="hljs-comment">// 构建需要的一些工具、资源或者脚本的目录</span>
├── config/             <span class="hljs-comment">// 环境配置文件目录，会选择一个写入到app/config</span>
├── deploy/             <span class="hljs-comment">// 部署脚本，用户部署文件到cdn或上传文件到OSS</span>
├── reserve/            <span class="hljs-comment">// 保留目录，存放一些文件用于写入到app内</span>
├── dist/               <span class="hljs-comment">// 打包和构建的目标目录</span>
├── release/            <span class="hljs-comment">// 发行的目标目录</span>
├── .gitignore
├── gulpfile.js         <span class="hljs-comment">// gulp配置</span>
├── package.json        <span class="hljs-comment">// 外部package.json，用于定义开发依赖和脚本</span>
└── yarn.lock</code></pre>
<p>这是因为，我们的应用在运行时需要一些第三方依赖，这些依赖我们需要打包到应用内，也就是说<code>/app/node_modules</code>目录内的内容是要被打包到应用内的，用户使用的时候才不会缺失「运行时依赖」，而如果我们只有一个<code>package.json</code>，那么所有的依赖都被下载和安装到同一个<code>node_modules</code>文件夹下，我们没法把我们需要打包进去的依赖树提取出来。所以这样双 <code>package.json</code>的结构最清晰明了和简单易用，<code>dependencies</code>和<code>devDependencies</code>有了明确划分。</p>
<p>再大致解释下其他目录的作用：</p>
<ul>
<li>
<p><code>app</code>目录：是我们应用的源码目录，我们所说的打包针对的就是这个目录，其他目录和文件不会被打包进去，而<code>app</code>目录内的子目录和文件就见仁见智了，在不同的复杂度下有不同的设置，这里还有一些东西是需要从外面复制进来的，因为不同的平台下你可能需要打包进去的东西是不同的。</p>
<ul>
<li>
<code>config</code>：配置文件目录，可能因为你想打包的应用所处的阶段（开发、内测、众测、正式发行）和平台（Windows、Mac），那么可能需要不同的配置，比如一些资源的名称和路径等，这里你可以把不同情况下都一样的配置写到一个配置文件，而根据情况不一样的配置文件是从外部脚本写进来的，这就是为什么你会在<code>app</code>目录外面看到一个config文件夹的原因</li>
<li>
<code>plugins</code>：是插件文件夹，你可能需要给自己的应用加一些插件，比如 flash，而一个 flash 插件有 40M 左右，Win（32bit）、Win（64bit） 和 Mac 需要的 flash 插件文件都是不一样的，所以如果全部打包进你的应用，再用「if - else」去选显然是不科学的，Mac 下的应用肯定是用不到 Win 版本的插件的，所以这里的文件也是从外面脚本写进来的</li>
<li>
<code>view</code>：是视图文件夹，也可以说是渲染进程对应的代码文件夹</li>
</ul>
</li>
<li>
<code>build_resource</code>：构建资源或工具文件夹，这个文件夹下放打包到发行这一流程中需要用到的资源和工具，比如程序主图标、构建安装包的配置脚本（win）、代码签名工具等</li>
<li>
<code>deploy</code>：存放部署脚本的文件夹，这里的脚本负责把你的应用安装包上传到云存储（OSS），我们会在 gulp 中的发行环节引入这里写的脚本进行自动上传安装包</li>
<li>
<code>dist</code>和<code>release</code>：前者是打包和构建安装包这两步的 output 目录，后者是最终我们会上传到云端的安装包目录，构建和发行环节的差别我们后面会讲到</li>
</ul>
<h2 id="articleHeader1">二、把整个流程拆分成段</h2>
<p>这个部分没法正向推导，我是从一个乱七八糟的 windows 开发流程开始的，然后修改成一个合适的 windows 开发流程，再因为要兼容 Mac 的开发，再改成现在这样的流程设计的，所以我没法从一开始就说因为什么所以要考虑什么，然后慢慢构建出一个合适的工作流，这是上帝视角，这个偏实践经验的过程一定是实践越多，感受越多的。</p>
<p>所以我会先说我的做法，再说这么做的好处，所用的工具是 gulp（如果不熟悉，可以去 gulp 官网看一下，很容易上手），利用 gulp 的 task 串起整条流程，<strong>我把工程中的一个阶段称为一个环节，是为了和应用本身的阶段（开发、内测、众测或正式发行）做一个区分，不然都不知道说的阶段是指啥</strong>：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011908328?w=1456&amp;h=1419" src="https://static.alili.tech/img/remote/1460000011908328?w=1456&amp;h=1419" alt="流程概览" title="流程概览" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<strong>配置环节</strong>：设定需要打包构建针对的系统、位数（Mac 版不考虑 32 bit）和这个版本所处的阶段（开发、内存、众测或正式发行）这些变量，然后把相关配置写入配置文件模板，再导入 app 文件夹内相应位置，把其他相应的文件也写入 app 文件夹内相应位置，如此 app 文件夹就 <strong>Ready</strong> 了。</li>
<li>
<strong>打包环节</strong>：根据不同的平台打出不同的可执行程序，这一步输出的是可运行的程序</li>
<li>
<strong>代码签名环节</strong>：客户端特殊的一步，你的应用需要被系统所信任，那就需要代码签名，获取对应平台下的代码签名 CA 然后进行应用签名，这样你的应用才能被系统信任</li>
<li>
<strong>构建安装包环节</strong>：根据不同的系统利用不同的技术和依赖构建安装包，Windows 下的 <code>.exe</code> 和 Mac下的 <code>.dmg</code>，并且对这两个安装包也需要代码签名，这一步后你的应用可以被分发安装啦</li>
<li>
<strong>发行环节</strong>：对构建的安装包进行最后一步修饰，比如修改合适的文件名，然后上传到云存储服务器，获取到可下载的链接，如此，你的应用已经可以经获取到的 url 访问进行下载安装了</li>
</ul>
<p>以上每一步，Mac 版和 Windows 版的开发都需要经历，只是所用的方法不同，这样做的好处，一是统一了 Mac 和 Win 下开发工作流的生命周期，二是简单和直观，每一环节目的是什么，输出是什么很明确。</p>
<p>如此，我在<code>package.json</code>中的<code>script</code>就可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="... ...
&quot;start&quot;: &quot;cross-env NODE_ENV=dev gulp dev&quot;,
&quot;packDev&quot;: &quot;cross-env NODE_ENV=dev gulp pack&quot;,
&quot;buildDev&quot;: &quot;cross-env NODE_ENV=dev gulp build&quot;,
&quot;releaseDev&quot;: &quot;cross-env NODE_ENV=dev gulp release&quot;,
... ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">... ...
<span class="hljs-string">"start"</span>: <span class="hljs-string">"cross-env NODE_ENV=dev gulp dev"</span>,
<span class="hljs-string">"packDev"</span>: <span class="hljs-string">"cross-env NODE_ENV=dev gulp pack"</span>,
<span class="hljs-string">"buildDev"</span>: <span class="hljs-string">"cross-env NODE_ENV=dev gulp build"</span>,
<span class="hljs-string">"releaseDev"</span>: <span class="hljs-string">"cross-env NODE_ENV=dev gulp release"</span>,
... ...</code></pre>
<p>当然这里的<code>NODE_ENV</code>你也可以写成命令行参数（我只是习惯了用这个），利用这个参数去指定需要针对的应用阶段，像以上这样就配好了「dev」阶段的相关脚本，可以用<code>npm run packDev -- --platform="xxxx" --arch="xxxx" --sign</code>这样形式的命令行去执行不同的 gulp 任务，后面的参数，是需要我们在 gulpfile 文件中解析的，以上3个参数分别表示「系统平台」、「系统位数」、「是否需要代码签名」，我们可以在 gulpfile 文件中给这些参数合适的默认值，使操作更人性化。</p>
<h2 id="articleHeader2">三、配置环节</h2>
<p><strong>目的</strong>：一是为之后的环节初始化工作流参数，二是准备好应用文件夹内容（即要打包的目标文件夹 —— app）</p>
<p><strong>做的事</strong>：解析命令行参数，初始化工作参数，填充配置文件，把配置文件和相关依赖文件导入到<code>app</code>文件夹内合适的地方</p>
<h3 id="articleHeader3">1. 初始化工作参数</h3>
<p><strong>所用工具</strong>：yargs</p>
<p>yargs 是一款优秀的命令行参数解析工具，我们要初始化的工作参数包括以下 3 个：「系统平台」、「系统位数」、「需不需要签名」，你也可以把应用的所处阶段（开发、内测、众测、正式）设计成参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以下 3 个变量在 gulpfile 内全局声明

// 这里的 detectPlatform() 需要自己写，利用 node 的 os 模块去检测开发机环境从而给出
// 为了理解上直观一些，把 32 位的 win 写成 win32，64 位的 win 写成 win64
// node os.platform() 没有 win64 的返回的，只有在返回 win32 基础上，你再使用 os.arch() 去确定是否是win64
// 可能的合法值：darwin、win64、win32
platform = yargs.argv.platform || detectPlatform() || 'win32';

// 系统位数，如果是 Mac OS X，不考虑 32位
// 可能的合法值：x64、ia32
arch = platform === 'darwin' ? 'x64' : (yargs.argv.arch || 'ia32');

// 布尔值，指定是否需要代码签名
needSign = yargs.argv.sign || process.env.NODE_ENV === 'prod' || platform === 'darwin';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 以下 3 个变量在 gulpfile 内全局声明</span>

<span class="hljs-comment">// 这里的 detectPlatform() 需要自己写，利用 node 的 os 模块去检测开发机环境从而给出</span>
<span class="hljs-comment">// 为了理解上直观一些，把 32 位的 win 写成 win32，64 位的 win 写成 win64</span>
<span class="hljs-comment">// node os.platform() 没有 win64 的返回的，只有在返回 win32 基础上，你再使用 os.arch() 去确定是否是win64</span>
<span class="hljs-comment">// 可能的合法值：darwin、win64、win32</span>
platform = yargs.argv.platform || detectPlatform() || <span class="hljs-string">'win32'</span>;

<span class="hljs-comment">// 系统位数，如果是 Mac OS X，不考虑 32位</span>
<span class="hljs-comment">// 可能的合法值：x64、ia32</span>
arch = platform === <span class="hljs-string">'darwin'</span> ? <span class="hljs-string">'x64'</span> : (yargs.argv.arch || <span class="hljs-string">'ia32'</span>);

<span class="hljs-comment">// 布尔值，指定是否需要代码签名</span>
needSign = yargs.argv.sign || process.env.NODE_ENV === <span class="hljs-string">'prod'</span> || platform === <span class="hljs-string">'darwin'</span>;</code></pre>
<p>看到上面的参数初始化，可能会有疑问，既然已经在<code>platform</code>中区分了 win32（32bit） 和 win64（64bit），而且<code>darwin</code>下不考虑 32bit（因为 OS X 10.6 之后就全是 64 位的），<code>arch</code>参数是否多余？这是可以认为是多余的，但是有的话更完整，而且如果你以后又想兼容 linux 了呢？</p>
<h3 id="articleHeader4">2. 填充并导入配置文件</h3>
<p><strong>所用工具</strong>：gulp API、gulp-replace、gulp-rename</p>
<p>首先我会在根目录下的 config 文件夹下放几个不同的配置文件模板，分别对应应用不同的阶段的配置（比如dev.js、alpha.js、beta.js、prod.js），然后利用<code>gulp-replace</code>去替换掉里面的一些占位字符串（也就是填充模板），最后利用<code>gulp-rename</code>重命名为比如<code>env.js</code>后，利用<code>gulp.dest</code>写入文件到 app/config 目录下，于是配置文件 Ready。</p>
<h3 id="articleHeader5">3. 二进制文件导入（以 flash 为例）</h3>
<p><strong>所用工具</strong>：gulp API、del</p>
<p>以 flash 插件为例，首先你要找到需要的插件文件，electron 官网所说的打开<code>chrome://plugins</code>已经没法用了，从 chrome 的某个版本开始，<code>chrome://plugins</code> Is Not Available。</p>
<p>所以用系统的搜索功能吧，记得先装下 chrome 浏览器，Mac 搜索「PepperFlashPlayer.plugin」，Windows 搜索「pepflashplayer」，Windows下如果搜到多个，记得选择和 chrome 目录有关的那个「.dll」文件，此外 win32bit 和 win64bit 所用的 flash 也是不同的，Mac 下的「PepperFlashPlayer.plugin」本质是一个文件夹，整个文件夹都需要。所有的3个插件放进根目录下 reserve 文件夹。</p>
<p>接下来需要做的就是，根据不同的平台读不同的 flash 插件（ .dll 文件或 .plugin 文件夹）到 app/plugin 文件夹下。</p>
<p>这里有一个需要注意的是，每次你构建时，如果 app/plugin 下的 flash 不是你要的，那么你需要先删除那个旧的，否则你的 app/plugin 文件夹下会躺着一个你不会用的 flash 插件，但会被打包进去，你的文件大小突然多了 40M，我这里用的删除工具是 del。</p>
<p>经过配置环节，<code>app</code>文件夹已经准备就绪，所以以开发模式（不需要打包）运行应用也就没啥大问题，可以另写一个「dev」的 gulp task，利用 node 的<code>child_process</code>模块下的<code>exec</code>调用下<code>electron app --debug</code>就可以运行应用了，没啥可以多说的，我们继续进入下一步 —— 打包。</p>
<h2 id="articleHeader6">四、打包环节</h2>
<p><strong>目的</strong>：产出一个可执行程序，简单来说，就是能有一个应用，双击能运行起来</p>
<p><strong>做的事</strong>：利用<code>electron-packager</code>打包，补充应用信息（only for win）</p>
<h3 id="articleHeader7">1. 利用<code>electron-packager</code>打包</h3>
<p>利用<code>electron-packager</code>打包，只需要针对不同系统平台给出不同的配置，然后调用其 API 就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Mac
const options = {
    dir: './app',
    name: '应用名字',
    platform: 'darwin',
    arch: arch, // 这就是工作参数 arch
    overwrite: true,
    appVersion: 'Copyright(C) 2017 Qunhe',
    asar: {
        unpackDir: 'plugins' // plugins 内的文件我们不希望打进 asar 格式包内
    },
    out: './dist',
    icon: './build_resource/logo.icns' // Mac 下 icon 格式是 .icns
};

// Win
const options = {
    dir: './app',
    platform: 'win32', // 不管是 32bit 还是 64bit 的 win，这里都是 win32
    arch: arch, // 这里依靠 x64 或 ia32 去区分位数
    overwrite: true,
    asar: {
        unpackDir: 'plugins'
    },
    out: './dist',
    icon: './build_resource/logo.ico' // Win 下 icon 格式是 .ico
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Mac</span>
<span class="hljs-keyword">const</span> options = {
    <span class="hljs-attr">dir</span>: <span class="hljs-string">'./app'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'应用名字'</span>,
    <span class="hljs-attr">platform</span>: <span class="hljs-string">'darwin'</span>,
    <span class="hljs-attr">arch</span>: arch, <span class="hljs-comment">// 这就是工作参数 arch</span>
    overwrite: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">appVersion</span>: <span class="hljs-string">'Copyright(C) 2017 Qunhe'</span>,
    <span class="hljs-attr">asar</span>: {
        <span class="hljs-attr">unpackDir</span>: <span class="hljs-string">'plugins'</span> <span class="hljs-comment">// plugins 内的文件我们不希望打进 asar 格式包内</span>
    },
    <span class="hljs-attr">out</span>: <span class="hljs-string">'./dist'</span>,
    <span class="hljs-attr">icon</span>: <span class="hljs-string">'./build_resource/logo.icns'</span> <span class="hljs-comment">// Mac 下 icon 格式是 .icns</span>
};

<span class="hljs-comment">// Win</span>
<span class="hljs-keyword">const</span> options = {
    <span class="hljs-attr">dir</span>: <span class="hljs-string">'./app'</span>,
    <span class="hljs-attr">platform</span>: <span class="hljs-string">'win32'</span>, <span class="hljs-comment">// 不管是 32bit 还是 64bit 的 win，这里都是 win32</span>
    arch: arch, <span class="hljs-comment">// 这里依靠 x64 或 ia32 去区分位数</span>
    overwrite: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">asar</span>: {
        <span class="hljs-attr">unpackDir</span>: <span class="hljs-string">'plugins'</span>
    },
    <span class="hljs-attr">out</span>: <span class="hljs-string">'./dist'</span>,
    <span class="hljs-attr">icon</span>: <span class="hljs-string">'./build_resource/logo.ico'</span> <span class="hljs-comment">// Win 下 icon 格式是 .ico</span>
};</code></pre>
<p>Mac 下各处（Dock、任务栏、进程名等地）展示的应用名字只要指定了<code>name</code>选项，就是处处一样的，所以你可以用 name 指定一个中午名字，而且 Mac 下默认编码都是 UTF-8，问题不大。</p>
<p>而对于 Windows，首先其中文默认编码是 GBK 的，而所以如果指定中文名字可能会有奇怪的问题，所以 Windows 应用一般我不填<code>name</code>项，这样它会去找你 app 目录下的 package.json 文件中的<code>productName</code>或<code>name</code>字段值，这个字段一般设置是英文的，第二个不去设置中文的原因是，Windows 下应用的展示名字是 exe 主程序的<code>FileDescription</code>配置项决定的，如果不去设置，那么可能你的应用用任务管理器打开，显示的进程是「Electron」，而不是你的应用名字。</p>
<p>关于应用的实际名字和展示名字，Win 和 Mac 下都有自己的一套，这里不细展开。<strong>而基于目前的实践，我给的建议是，Mac 下的开发，你可以直接指定<code>name</code>为一个你要的中文应用名，而对于 Win，你最好像下面那样操作。</strong></p>
<h3 id="articleHeader8">2. 补充应用信息（for win）</h3>
<p><strong>所用工具</strong>：rcedit</p>
<p>Command line tool to edit resources of exe file on Windows. 翻译过来就是一个用于编辑 exe 文件信息的windows 命令行工具，当然它已经有了 node 版本，叫 node-rcedit，也就是说你可以用 node 子进程的<code>exec</code>去执行，也可以调用 node 版本的 API。</p>
<p>可以这么用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="execSync(`
.\\node_modules\\rcedit\\bin\\rcedit  // 调用rcedit
./dist/xxxxxx.exe  // 目标文件（刚打包出来的主程序）
--set-version-string &quot;LegalCopyright&quot; &quot;Copyright(C) 2017 Health&quot; // 版权信息
--set-version-string &quot;CompanyName&quot; &quot;仙风道骨养生俱乐部&quot;  // 公司名字
--set-version-string &quot;ProductName&quot; &quot;养生&quot; // 产品名字
--set-version-string &quot;FileDescription&quot; &quot;养生宝典&quot; // 这个很重要，因为这个就是你打开任务管理器看到的进程名字
`);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">execSync(<span class="hljs-string">`
.\\node_modules\\rcedit\\bin\\rcedit  // 调用rcedit
./dist/xxxxxx.exe  // 目标文件（刚打包出来的主程序）
--set-version-string "LegalCopyright" "Copyright(C) 2017 Health" // 版权信息
--set-version-string "CompanyName" "仙风道骨养生俱乐部"  // 公司名字
--set-version-string "ProductName" "养生" // 产品名字
--set-version-string "FileDescription" "养生宝典" // 这个很重要，因为这个就是你打开任务管理器看到的进程名字
`</span>);</code></pre>
<p>大部分信息，你可以右键主程序(.exe)文件，「属性 —— 详细信息」中看到，这么做还有一个考虑是，这样你的应用看上去会更加规范。</p>
<p>这里肯定有人说，为什么不用<code>electron-builder</code>，因为我首先接触到的是<code>electron-packager</code>，我觉得够用（因为我有一台 win 和一台 mac，跨平台打包，不存在的），第二，<code>electron-packager</code>完成打包的事就够了，后面构建安装包等过程可以让我们有更多的选择，符合本文的工作流设定，每个环节做每个环节该做的事就好，当然你也可以选择<code>electron-builder</code>，能达到目的就好。</p>
<h2 id="articleHeader9">五、代码签名环节</h2>
<p><strong>目的</strong>：使应用被系统所认可，能正常安装</p>
<p><strong>做的事</strong>：给应用进行代码签名</p>
<h3 id="articleHeader10">1. 为什么需要代码签名，没有会怎样</h3>
<p>代码签名的目的就是为了安全，你的应用一旦经过了代码签名，如果发行过程中被篡改，你的用户会看到系统给出的警告提示，而对于发行方而言，代码签名后，应用才能被系统认可，很大概率不会被杀毒软件做掉，而且如果你要提交一些软件市场，一些软件市场要求应用需要有合法的代码签名。</p>
<p>而如果作为铁头娃的你铁定不签名，这应用就不能跑了么？不是的，还是可以跑的，只不过对你的用户来说很不友好。</p>
<h4>1.1 Windows 下有和没有代码签名的差别</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011908329" src="https://static.alili.tech/img/remote/1460000011908329" alt="签名对比" title="签名对比" style="cursor: pointer; display: inline;"></span></p>
<p>Windows 下代码签名的限制没有 Mac 那么严，你选择「是」都是可以安装使用的，但是从你产品的用户角度，有一个代码签名会更可靠，此外，这样的没有签名的安装包在一些软件市场可能都提交不上去。</p>
<h4>1.2 Mac 下有和没有代码签名的差别</h4>
<p>Mac 下有和没有代码签名的差别就很大了，没有合法的代码签名，你的 .dmg 安装包根本没法打开。</p>
<p>如果没有代码签名，Mac 下的 .dmg 安装包打开，首先会提示你「该应用来自身份不明的开发者，是否确认打开」，然后你点「确认」，再根据你的安全设定（系统偏好设置 —— 安全和隐私 —— 允许从以下位置的应用下的设置）去决定，而绝大部分的 Mac 用户都是勾选「App Store 和 被认证的开发者」，于是就算你点了「打开」，直接会告诉你「打不开XXX，因为它来自身份不明的开发者」，这个时候只能去改变「系统偏好设置 —— 安全和隐私 —— 允许从以下位置的应用下的设置」才能打开。</p>
<p>典型的盗版软件安装方式啊，所以作为一款要发行的产品，我们一定是需要代码签名的。</p>
<h3 id="articleHeader11">2. Windows 下的代码签名</h3>
<p>总体建议：个人的小项目就不用 Windows 代码签名了，因为很贵，2K+/年，而且 Windows 下代码签名没有问题不是非常大（和 Mac 相比），公司的产品，那就必须要的。</p>
<h4>2.1 购买微软代码签名证书</h4>
<p>可以向权威的 CA 机构购买代码签名证书，这里就我了解的做一个建议：建议向赛门铁克购买签名普通软件（非驱动）的微软代码签名证书，大概几百刀一年。</p>
<p>背景说明：目前我们用的是沃通的代码签名证书，赛门铁克的只是咨询过，没用过。</p>
<p>就以上的建议做一个解释，为什么我这么建议：</p>
<ul>
<li>我们需要代码签名，进一步，需要把 Windows 代码签名这一环节也做到自动化流程中，这是我们的需求</li>
<li>沃通的代码签名证书是封死在 U 盘里，所以可认为这是物理证书，更安全，但很不方便，不可能导出来进行签名的</li>
<li>了解到的，赛门铁克颁发的如果是针对普通软件（非驱动的），那么是可以给颁发文件格式的真·电子证书的</li>
<li>意味着沃通的证书我们要签名，需要依靠一个物理U盘</li>
<li>
<strong>最坑爹的</strong>：沃通的代码签名时，要手输密码，如果一个 Windows 应用我们选择 SHA1 + SHA256 的签名方式，那么应用和安装包，我们需要输4次密码，气到拉闸，他们官方说有自己的命令行，实际是命令行唤起他们的 GUI 图形界面来签名，还不是需要人工操作</li>
<li>所以，显然这和我们的「自动化」目标相去甚远，我建议普通的应用，没有涉及到高度安全的，不要选择购买封死在 U 盘中的 Windows 代码签名证书。</li>
</ul>
<h4>2.2 签名</h4>
<p>当你购买了证书后，就可以利用<code>signtool</code> 命令行进行签名了，命令怎么写，这些都在你购买证书的 CA 网站上找到或者 google 一下，这里要说的就两点：</p>
<ul>
<li>Windows 代码签名我们目前选择 SHA1 签名后再追加 SHA2（SHA256） 签名，这样的组合方式，安全和兼容性最好</li>
<li>代码签名可以在 gulpfile 文件中封装成一个方法（参数是需要签名的文件路径），因为我们会多次调用</li>
</ul>
<h4>2.3 查看签名信息</h4>
<p>查看 Windows 代码签名信息很简单，右键你签名的文件，签名后的文件，属性打开会有一个「数字签名」的 tab，点击切换到「数字签名」可以看到代码签名信息。</p>
<h3 id="articleHeader12">3. Mac 下的代码签名</h3>
<p>总体建议：Mac 下应用要代码签名，因为很方便，也不是很贵，个人开发者 99 USD 一年，如果公司有 Apple Develop Team，你可以直接加入，关键是 Mac 下如果你不进行可供分发的代码签名，你的应用很难被他人安装啊。</p>
<h4>3.1 利用 Xcode 申请证书，各个证书间差别</h4>
<p>证书是可以在 Xcode 下申请的，Xcode —— Preference —— Account 下，选择一个Team（之前要先加入），如果是独立开发者，就选自己 Apple ID 的那个，点击「Manage Certificates」，弹出的弹窗中左下角点加号，可以选择需要的证书。</p>
<p>我看到之后的第一反应是：尼玛，哪些是我要的啊。下面简单说明下（摘自<a href="https://sspai.com/post/40269" rel="nofollow noreferrer" target="_blank">Mac App 发布的最后 1km</a>）：</p>
<ul>
<li>
<p>Developer Certificate</p>
<ul><li>Mac Development ：这个只用来开发，Debug，不是正式发布的版本</li></ul>
</li>
<li>
<p>Production Certificate</p>
<ul>
<li>
<p>Mac App Store</p>
<ul>
<li>Mac App Distribution ：这个用于 Xcode 自己把 .app 文件上传到 Mac App Store</li>
<li>Mac Installer Distribution ：这个没用过，但可以肯定的，也是上传 Mac App Store 用的</li>
</ul>
</li>
<li>
<p>Developer ID</p>
<ul>
<li>
<strong>Developer ID Application</strong>：这个用于开发者使用开发者帐号签名，导出一个线下发布版本的 .app 文件，脱离了苹果的 Mac App Store。</li>
<li>Developer ID Installer：用于开发者打包，同时加上开发者帐号签名，打包工具在下面介绍。</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>我们主要需要的就是「Developer ID Application」这个类型的证书，「Mac Development」只是用于开发的，而前者可以供分发，也就是签名后，别人下载安装，就是来自「被认证的开发者」的应用啦。</p>
<p><strong>如果是在一个 Team 中，不是个人独立开发者</strong>，那么这个「Developer ID Application」证书的申请你是没有权限的，就算你们 Team 的 Agent 设置你为 admin（管理员），你还是没有权限的，因为一个「Developer ID Application」只有一个 Team 的 agent（owner） 才能申请，你需要做的是利用你 Mac 上的钥匙串工具（具体怎么做，google 下就可以了），生成「CertificateSigningRequest」（简称 CSR），然后发给你的 team agent，让他帮你生成证书，发回给你，你再安装到自己机子上，搞定。</p>
<p>你可以在终端调用<code>security find-identity -p codesigning -v</code>来看一下你可用的代码签名证书，其中那个<code>Developer ID Application</code>开头的就是我们要的。</p>
<h4>3.2 签名</h4>
<p><strong>所用工具</strong>：electron-osx-sign</p>
<p>Mac 下的签名简直是红红火火开开心心嘿嘿哈哈啊，你可以从<a href="https://mintkit.net/electron-userland/electron-osx-sign/guide/" rel="nofollow noreferrer" target="_blank">electron-osx-sign 指导</a>这里获得完全的指导，你在这个页面右边可以根据你的项目进行填写，页面最后会根据你的配置，给你一段你都可以直接复制的签名代码，完美。</p>
<p>而且签名还能集成到打包阶段，不过我建议还是拿出来好，比较清真。</p>
<h4>3.3 查看签名信息</h4>
<p>Mac 下查看文件签名信息，你可以终端运行<code>codesign --display --verbose=4 "文件路径"</code>。</p>
<h2 id="articleHeader13">六、构建安装包环节</h2>
<p><strong>目的</strong>：使你的应用可以被安装（如果没有这一步，你能怎么办，压缩整个应用文件夹，然后分发这个压缩包，呃，你能接受也可以啊）</p>
<p><strong>做的事</strong>：把经历了打包和签名环节后的应用程序文件夹（Mac 下的<code>.app</code>其实也是文件夹）打成一个安装包文件</p>
<p>为什么要构建安装包，这有很多的原因，可能你也会想到很多，其中值得强调的两点，一是构建安装包会直接便利于应用的自动更新，具体我们下一篇文章里再说，二是 Win 下安装包的体积相比原先的文件夹，体积明显小很多，在硬盘容积很大的时代，下载体积才是最影响用户体验的，而安装后的体积不是最需要考虑的体积。</p>
<p>安装包这个事和代码签名类似，两个不同的系统（Win 和 Mac）实现完全不同，Windows 下我们习惯<code>.exe</code>或<code>.msi</code>这样的安装包格式，习惯点下一步到完成或一键安装，而 Mac 下除了 Store 下载安装的，我们习惯的<code>.dmg</code>格式的，挂载后打开，将里面的应用拖入到<code>Application</code>文件夹就完成了安装。</p>
<p>这里我们实现的就是经典的 Windows exe 安装和 Mac dmg 安装，相比较而言，Windows 下的繁琐得多得多。</p>
<h3 id="articleHeader14">1. Windows 下利用 inno setup 进行安装包构建</h3>
<h4>1.1 为什么用这个 inno setup</h4>
<p>最终说服我使用 inno setup 来构建应用安装包的理由是，VS Code 也是这么做的。因为按照程序这个领域离一个小前端已经很遥远了，对于跨度大的未知东西，一般都会做充足的调研，最后发现 VS Code 也是这么做的，好，干！</p>
<p>而使用了一段时间后，我可以说几点不后悔的理由（当然我没使用过其他的安装包构建工具，所以仅一些偏见）：</p>
<ul>
<li>inno setup 应该是 windows 下构建安装程序的老牌工具了，你可以去进他们的官网，一股「老牌可靠」的风格扑面而来，可靠</li>
<li>它有 GUI 和 命令行工具，有 unicode 版本（意味着完全支持中文），gulp 有别人写好的现成的插件（对于中文应用需要修改）</li>
<li>基本使用的话，学习成本不大，基本去找一些案例配置文件去学一下就可以了</li>
<li>进阶使用，需要写 pascal 脚本，但是功能是真的强大</li>
<li>还有一点我感受很好的是，这个工具的支持很好，stackoverflow 上有足够的问答资源，如果还是没有你满意的，官网有一个看上去很很很简陋的论坛，但是很有用啊，我问过 2 个问题，睡一觉起来都有回应了</li>
</ul>
<h4>1.2 怎么学习 inno setup</h4>
<p>先可以自己去搜一下 inno setup，进入官网逛一逛，下载安装一下（记得安装 unicode 版本，即括号里有 u 的版本），浏览后有几个基本认知需要具备：</p>
<ul>
<li>inno setup 是<strong>完全根据配置文件（.iss）来构建安装程序</strong>的，你用 GUI 其实也是去编写 .iss 文件，然后利用这个配置构建的</li>
<li>inno setup 可以用 pascal 脚本控制安装向导的行为，这是进阶的使用方式，足够你安装自己的设想优化安装程序了</li>
<li>inno setup 构建出来的安装包运行时可以添加参数，使安装有不同的表现，比如完全静默的后台安装（Amazing，这里的参数对于自动更新很有用）</li>
</ul>
<p>有了上面的几点认知，可以给出「学习和使用 inno setup 路径」的建议：</p>
<ol>
<li>下载安装后，找几篇 inno setup GUI 使用教程，尝试构建一个安装包（要可以安装的）</li>
<li>找一些 inno setup 配置文件的案例，对于 inno setup 配置方式有一个印象，分多个[section]，每个[section]有很多配置项，每个配置项可能有多个字段</li>
<li>可以把 <a href="http://www.jrsoftware.org/ishelp/" rel="nofollow noreferrer" target="_blank">inno setup 官方文档</a> 浏览一遍，跳过「pascal scripting」部分</li>
<li>到这里，你应该能看得懂他人的 .iss 文件里除了 [code] 这个 section 外的配置了</li>
<li>把安装向导的语言换成中文（先要导入中文语言包，再改配置，具体做法也有一些文章说到了，不多说，这一步对于你之后步骤也是有用的）</li>
<li>可以尝试正式结合到你的 gulp 工作流了</li>
</ol>
<h4>1.3 怎么结合到 gulp 工作流中</h4>
<p><strong>所用工具</strong>：修改后的 gulp-inno</p>
<p>如果按照之前的步骤花了个把小时大概学习了下 inno setup 的话，那么到这里你应该可以尝试把 inno setup 构建安装包做到你的 gulp 工作流中了，如果还不熟悉 inno setup 配置文件，没关系，你可以从仿照开始，不要怂，就是干，都到这一步了，谁怂谁尴尬。</p>
<p>配置文件的详解不是这里的重点，所以不再展开，把 inno setup 整合进脚本中，因为它本身提供命令行工具，勤快和好学的你可以根据官方或其他渠道的指导自己封装一个 node 模块，而我就比较懒了，搜到一个已有的 gulp 插件 —— 「gulp-inno」，高兴地一匹。</p>
<p>然而，事情总不会那么顺利，该吃的shi躲不掉，该经历的坑绕不过，这才叫「历shi」。我利用「gulp-inno」根据其指导怎么都不能正确编译，大概提示是有不合法的字符的意思。</p>
<p>明白了，绝壁是「gulp-inno」里包的 inno setup 不是 unicode 版本，所以一旦有中文等字符，就出错了，我看到这个包里的 inno 文件夹完全就是和我的 inno setup 文件夹没差嘛，于是我把我本地安装的 inno setup 文件夹里内容复制替换到 gulp-inno 的 inno 的文件夹内，问题解决。</p>
<p>因为我之前导入过中文语言包，所以我复制过去的时候，中文语言包也复制过去了，可以愉快地配置安装向导界面为中文了。</p>
<p>一旦修改好「gulp-inno」包（替换成 unicode 版本 &amp; 加入简体中文语言包），就可以怎么操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 1. 准备 iss 文件：填充你的 iss 配置文件模板，并输出到 dist 目录下

const appInfo = require('./app/package.json'); // 所有和应用相关的信息从 package.json 读取
const bom = require('gulp-bom'); // 这是为了解析中文的
const outputName = 
`${appInfo.name}-${platform}-${appInfo.version}-${process.env.NODE_ENV}`;
const outputIssName = 
`${appInfo.name}-${platform}-${process.env.NODE_ENV}.iss`

gulp
    .src(`./build_resource/installer_win_config_${platform}.iss`)
    .pipe(bom())
    .pipe(replace('${version}', appInfo.version))
    .pipe(replace('${appExe}', `${appInfo.name}.exe`))
    .pipe(replace('${sourcePath}', `${appInfo.name}-${platform}`))
    .pipe(replace('${outputName}',outputName))
    .pipe(rename(outputIssName))
    .pipe(gulp.dest('./dist'))
    .on('end', () => {
        // .iss file is ready
    })

// 2. 交给 inno setup

const inno = require('my-gulp-inno'); // 修改后的 gulp-inno

gulp
    .src(`./dist/${outputIssName}`)
    .pipe(inno())
    .on('end', () => {
        // you have an installer now
    });
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// 1. 准备 iss 文件：填充你的 iss 配置文件模板，并输出到 dist 目录下</span>

<span class="hljs-keyword">const</span> appInfo = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./app/package.json'</span>); <span class="hljs-comment">// 所有和应用相关的信息从 package.json 读取</span>
<span class="hljs-keyword">const</span> bom = <span class="hljs-built_in">require</span>(<span class="hljs-string">'gulp-bom'</span>); <span class="hljs-comment">// 这是为了解析中文的</span>
<span class="hljs-keyword">const</span> outputName = 
<span class="hljs-string">`<span class="hljs-subst">${appInfo.name}</span>-<span class="hljs-subst">${platform}</span>-<span class="hljs-subst">${appInfo.version}</span>-<span class="hljs-subst">${process.env.NODE_ENV}</span>`</span>;
<span class="hljs-keyword">const</span> outputIssName = 
<span class="hljs-string">`<span class="hljs-subst">${appInfo.name}</span>-<span class="hljs-subst">${platform}</span>-<span class="hljs-subst">${process.env.NODE_ENV}</span>.iss`</span>

gulp
    .src(<span class="hljs-string">`./build_resource/installer_win_config_<span class="hljs-subst">${platform}</span>.iss`</span>)
    .pipe(bom())
    .pipe(replace(<span class="hljs-string">'${version}'</span>, appInfo.version))
    .pipe(replace(<span class="hljs-string">'${appExe}'</span>, <span class="hljs-string">`<span class="hljs-subst">${appInfo.name}</span>.exe`</span>))
    .pipe(replace(<span class="hljs-string">'${sourcePath}'</span>, <span class="hljs-string">`<span class="hljs-subst">${appInfo.name}</span>-<span class="hljs-subst">${platform}</span>`</span>))
    .pipe(replace(<span class="hljs-string">'${outputName}'</span>,outputName))
    .pipe(rename(outputIssName))
    .pipe(gulp.dest(<span class="hljs-string">'./dist'</span>))
    .on(<span class="hljs-string">'end'</span>, () =&gt; {
        <span class="hljs-comment">// .iss file is ready</span>
    })

<span class="hljs-comment">// 2. 交给 inno setup</span>

<span class="hljs-keyword">const</span> inno = <span class="hljs-built_in">require</span>(<span class="hljs-string">'my-gulp-inno'</span>); <span class="hljs-comment">// 修改后的 gulp-inno</span>

gulp
    .src(<span class="hljs-string">`./dist/<span class="hljs-subst">${outputIssName}</span>`</span>)
    .pipe(inno())
    .on(<span class="hljs-string">'end'</span>, () =&gt; {
        <span class="hljs-comment">// you have an installer now</span>
    });
</code></pre>
<h4>1.4 未来可以做什么</h4>
<p>当时还有一个看中 inno setup 的理由是，它可以让我们定制我们的安装向导步骤和外观，也就是说你可以让你的应用也像其他一些优秀的产品一样，在安装的时候可以定制酷炫的外观，可以优化安装流程，支持一键安装，inno setup 还是可以玩出一些花样的，enjoy。</p>
<h4>1.5 对安装包也进行代码签名</h4>
<p>同样的，安装包也需要代码签名，利用之前封装的签名方法进行签名就行了。</p>
<h3 id="articleHeader15">2. Mac 下的构建 dmg 安装包</h3>
<p><strong>所用工具</strong>：appdmg</p>
<p>相比于 windows 的安装包构建，Mac 下的构建安装包又是美滋滋啊，你看我下面小标题都没有就知道了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 因为 appdmg 在 windows 下不能下载安装的，所以放在外部 package.json 的 optionalDependencies 下
// 在 gulp 脚本中需要做 try...catch 处理，否则当你回到 windows 下使用这份 gulp 时会出报错
let appdmg;
try {
    appdmg = require('appdmg');
} catch (err) {
    appdmg = null;
}

const dmg = appdmg({
    // 打出的目标 dmg
    target: `dist/balabala.dmg`,
    // 基准目录，以下的资源都基于这个目录
    basepath: __dirname,
    // 具体的选项
    specification: {
        // dmg 打开后的窗口名字
        // 注意不要给中文，给中文会导致下面的 background 无效，不明白, github 上也有人提了这个 issue
        title: `myapp`,
        // dmg 挂载后的图标，出现在桌面上
        icon: &quot;xxx.icns&quot;,
        // 背景图，如果同时存在 bg.png 和 bg@2x.png，appdmg 会根据用户屏幕自己找合适的图
        background: &quot;bg.png&quot;,
        // 里面所有icon的尺寸
        'icon-size': 96,
        // 窗口设置
        window: {
            size: {
                width: 550,
                height: 320
            }
        },
        // 里面的内容，x 是指这个 icon 中心距离窗口最左边的距离，y 是指这个 icon 中心距离窗口顶部的距离
        // 这里可以指定一个name项，不要给中文，会导致图标异常
        contents: [
            { &quot;x&quot;: 400, &quot;y&quot;: 128, &quot;type&quot;: &quot;link&quot;, &quot;path&quot;: &quot;/Applications&quot; },
            { &quot;x&quot;: 150, &quot;y&quot;: 128, &quot;type&quot;: &quot;file&quot;, &quot;path&quot;: &quot;你的应用.app&quot; }
        ],
        // 对 dmg 进行代码签名
        'code-sign': {
            'signing-identity': '你的代码签名证书'
        }
    }
});
dmg.on('finish', function () {
    // you have a dmg now
});
dmg.on('error', function (err) {
    // error
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 因为 appdmg 在 windows 下不能下载安装的，所以放在外部 package.json 的 optionalDependencies 下</span>
<span class="hljs-comment">// 在 gulp 脚本中需要做 try...catch 处理，否则当你回到 windows 下使用这份 gulp 时会出报错</span>
<span class="hljs-keyword">let</span> appdmg;
<span class="hljs-keyword">try</span> {
    appdmg = <span class="hljs-built_in">require</span>(<span class="hljs-string">'appdmg'</span>);
} <span class="hljs-keyword">catch</span> (err) {
    appdmg = <span class="hljs-literal">null</span>;
}

<span class="hljs-keyword">const</span> dmg = appdmg({
    <span class="hljs-comment">// 打出的目标 dmg</span>
    target: <span class="hljs-string">`dist/balabala.dmg`</span>,
    <span class="hljs-comment">// 基准目录，以下的资源都基于这个目录</span>
    basepath: __dirname,
    <span class="hljs-comment">// 具体的选项</span>
    specification: {
        <span class="hljs-comment">// dmg 打开后的窗口名字</span>
        <span class="hljs-comment">// 注意不要给中文，给中文会导致下面的 background 无效，不明白, github 上也有人提了这个 issue</span>
        title: <span class="hljs-string">`myapp`</span>,
        <span class="hljs-comment">// dmg 挂载后的图标，出现在桌面上</span>
        icon: <span class="hljs-string">"xxx.icns"</span>,
        <span class="hljs-comment">// 背景图，如果同时存在 bg.png 和 bg@2x.png，appdmg 会根据用户屏幕自己找合适的图</span>
        background: <span class="hljs-string">"bg.png"</span>,
        <span class="hljs-comment">// 里面所有icon的尺寸</span>
        <span class="hljs-string">'icon-size'</span>: <span class="hljs-number">96</span>,
        <span class="hljs-comment">// 窗口设置</span>
        <span class="hljs-built_in">window</span>: {
            <span class="hljs-attr">size</span>: {
                <span class="hljs-attr">width</span>: <span class="hljs-number">550</span>,
                <span class="hljs-attr">height</span>: <span class="hljs-number">320</span>
            }
        },
        <span class="hljs-comment">// 里面的内容，x 是指这个 icon 中心距离窗口最左边的距离，y 是指这个 icon 中心距离窗口顶部的距离</span>
        <span class="hljs-comment">// 这里可以指定一个name项，不要给中文，会导致图标异常</span>
        contents: [
            { <span class="hljs-string">"x"</span>: <span class="hljs-number">400</span>, <span class="hljs-string">"y"</span>: <span class="hljs-number">128</span>, <span class="hljs-string">"type"</span>: <span class="hljs-string">"link"</span>, <span class="hljs-string">"path"</span>: <span class="hljs-string">"/Applications"</span> },
            { <span class="hljs-string">"x"</span>: <span class="hljs-number">150</span>, <span class="hljs-string">"y"</span>: <span class="hljs-number">128</span>, <span class="hljs-string">"type"</span>: <span class="hljs-string">"file"</span>, <span class="hljs-string">"path"</span>: <span class="hljs-string">"你的应用.app"</span> }
        ],
        <span class="hljs-comment">// 对 dmg 进行代码签名</span>
        <span class="hljs-string">'code-sign'</span>: {
            <span class="hljs-string">'signing-identity'</span>: <span class="hljs-string">'你的代码签名证书'</span>
        }
    }
});
dmg.on(<span class="hljs-string">'finish'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// you have a dmg now</span>
});
dmg.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
    <span class="hljs-comment">// error</span>
});</code></pre>
<p>其余的配置和所以配置影响的内容可以参加 <a href="https://github.com/LinusU/node-appdmg" rel="nofollow noreferrer" target="_blank">appdmg githug 主页</a>，然后就是自己试试看了。</p>
<h2 id="articleHeader16">七、发行环节</h2>
<p><strong>目的</strong>：使应用可以被下载（上一步只是能被安装，但并不能被下载）</p>
<p><strong>做的事</strong>：重命名应用安装包供发行，上传应用安装包到云存储服务器供下载</p>
<p>这一步根据每个人使用的云存储方式不同而需要利用卖方提供的 API 编写合适的脚本去上传你的安装包，因此具体的脚本不做展开，只是有几点最佳实践可以参考：</p>
<ul>
<li>上传前，把你的安装包文件重命名成符合一定规范的，可能是「应用名-版本-阶段-系统-尾数」，可能是「应用名-版本-系统-构建号」，可能是...这个就自己定，但一定要有一个合适的命名，这样一看到名字就知道这个是啥，不会弄错</li>
<li>你的 OSS 服务器上要针对应用安装包的不同阶段建立不同的文件夹，一方面可以方面管理，另一方面也便于做权限管理</li>
</ul>
<p>当你上传了你的安装包后，也就意味着这个安装包有了一个下载链接，你可以分发这个链接供用户下载啦，至此终于走完了「代码」到可下载「安装包」的过程，鼓掌。</p>
<h2 id="articleHeader17">八、路漫漫</h2>
<p>这一路走来看上去已经很有成就感，但实际上还有许多事可以做得更好，不过工程化的东西，逻辑清晰、流程自动化、能满足需求就可以了，而搭好工程，我们需要开始专注于 Electron 应用的功能开发了，才刚刚要迈上红地毯，路还有很长，下期见。</p>
<h2 id="articleHeader18">附：gulp 文件和脚本看上去会是怎样的</h2>
<p>对之前的工作流做一个小结（如果遇到有一些旧文件覆盖不了，可以自己加一个清理环节或方法，去清理旧文件）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
/* gulpfile.js START */
// 此处省略一堆需要引入的依赖

// 工作参数
let platform = 'win32';
let arch = 'ia32';
let needSign = false;

// 配置环节
gulp.task('env', (cb) => {
    // ...
});

// 开发调试
gulp.task('dev', ['env'], (cb) => {
    exec('electron app --debug', (err) => {
        if (err) return cb(err);
        cb();
    });
});

// 打包环节
gulp.task('pack',['env'], (cb) => {
    if (platform === 'darwin') {
        // ...
    } else {
        // ...
    }
});

// 签名环节
gulp.task('sign-pack', ['pack'], (cb) => {
    if (needSign) {
        if (platform === 'win32' || platform === 'win64') {
            // ...
        } else if (platform === 'darwin') {
            // ...
        }
    } else {
        cb();
    }
});

// 构建环节
gulp.task('build', ['sign-pack'], (cb) => {
    if (platform === 'darwin') {
        // ...
    } else {
        // ...
    }
});

// 发行环节
gulp.task('release', ['build'], (cb) => {
    // ...
});

const codeSignForWin = (filePath) => {...};

const codeSignForMac = (filePath) => {...};

const detectPlatform = () => {...};
/* gulpfile.js END */


// package.json 中配脚本
 &quot;scripts&quot;: {
    &quot;yarnall&quot;: &quot;yarn &amp;&amp; (cd app &amp;&amp; yarn)&quot;,
    &quot;start&quot;: &quot;cross-env NODE_ENV=dev gulp dev&quot;,
    &quot;packDev&quot;: &quot;cross-env NODE_ENV=dev gulp pack&quot;,
    &quot;packAlpha&quot;: &quot;cross-env NODE_ENV=alpha gulp pack&quot;,
    &quot;packProd&quot;: &quot;cross-env NODE_ENV=prod gulp pack&quot;,
    &quot;buildDev&quot;: &quot;cross-env NODE_ENV=dev gulp build&quot;,
    &quot;buildAlpha&quot;: &quot;cross-env NODE_ENV=alpha gulp build&quot;,
    &quot;buildProd&quot;: &quot;cross-env NODE_ENV=prod gulp build&quot;,
    &quot;releaseDev&quot;: &quot;cross-env NODE_ENV=dev gulp release&quot;,
    &quot;releaseAlpha&quot;: &quot;cross-env NODE_ENV=alpha gulp release&quot;,
    &quot;releaseProd&quot;: &quot;cross-env NODE_ENV=prod gulp release&quot;
  }
// 可选命令行参数：
//      sign: 是否签名
//      platform: 系统平台
//      arch: 系统位数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">/* gulpfile.js START */</span>
<span class="hljs-comment">// 此处省略一堆需要引入的依赖</span>

<span class="hljs-comment">// 工作参数</span>
<span class="hljs-keyword">let</span> platform = <span class="hljs-string">'win32'</span>;
<span class="hljs-keyword">let</span> arch = <span class="hljs-string">'ia32'</span>;
<span class="hljs-keyword">let</span> needSign = <span class="hljs-literal">false</span>;

<span class="hljs-comment">// 配置环节</span>
gulp.task(<span class="hljs-string">'env'</span>, (cb) =&gt; {
    <span class="hljs-comment">// ...</span>
});

<span class="hljs-comment">// 开发调试</span>
gulp.task(<span class="hljs-string">'dev'</span>, [<span class="hljs-string">'env'</span>], (cb) =&gt; {
    exec(<span class="hljs-string">'electron app --debug'</span>, (err) =&gt; {
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> cb(err);
        cb();
    });
});

<span class="hljs-comment">// 打包环节</span>
gulp.task(<span class="hljs-string">'pack'</span>,[<span class="hljs-string">'env'</span>], (cb) =&gt; {
    <span class="hljs-keyword">if</span> (platform === <span class="hljs-string">'darwin'</span>) {
        <span class="hljs-comment">// ...</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// ...</span>
    }
});

<span class="hljs-comment">// 签名环节</span>
gulp.task(<span class="hljs-string">'sign-pack'</span>, [<span class="hljs-string">'pack'</span>], (cb) =&gt; {
    <span class="hljs-keyword">if</span> (needSign) {
        <span class="hljs-keyword">if</span> (platform === <span class="hljs-string">'win32'</span> || platform === <span class="hljs-string">'win64'</span>) {
            <span class="hljs-comment">// ...</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (platform === <span class="hljs-string">'darwin'</span>) {
            <span class="hljs-comment">// ...</span>
        }
    } <span class="hljs-keyword">else</span> {
        cb();
    }
});

<span class="hljs-comment">// 构建环节</span>
gulp.task(<span class="hljs-string">'build'</span>, [<span class="hljs-string">'sign-pack'</span>], (cb) =&gt; {
    <span class="hljs-keyword">if</span> (platform === <span class="hljs-string">'darwin'</span>) {
        <span class="hljs-comment">// ...</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// ...</span>
    }
});

<span class="hljs-comment">// 发行环节</span>
gulp.task(<span class="hljs-string">'release'</span>, [<span class="hljs-string">'build'</span>], (cb) =&gt; {
    <span class="hljs-comment">// ...</span>
});

<span class="hljs-keyword">const</span> codeSignForWin = <span class="hljs-function">(<span class="hljs-params">filePath</span>) =&gt;</span> {...};

<span class="hljs-keyword">const</span> codeSignForMac = <span class="hljs-function">(<span class="hljs-params">filePath</span>) =&gt;</span> {...};

<span class="hljs-keyword">const</span> detectPlatform = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {...};
<span class="hljs-comment">/* gulpfile.js END */</span>


<span class="hljs-comment">// package.json 中配脚本</span>
 <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"yarnall"</span>: <span class="hljs-string">"yarn &amp;&amp; (cd app &amp;&amp; yarn)"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"cross-env NODE_ENV=dev gulp dev"</span>,
    <span class="hljs-string">"packDev"</span>: <span class="hljs-string">"cross-env NODE_ENV=dev gulp pack"</span>,
    <span class="hljs-string">"packAlpha"</span>: <span class="hljs-string">"cross-env NODE_ENV=alpha gulp pack"</span>,
    <span class="hljs-string">"packProd"</span>: <span class="hljs-string">"cross-env NODE_ENV=prod gulp pack"</span>,
    <span class="hljs-string">"buildDev"</span>: <span class="hljs-string">"cross-env NODE_ENV=dev gulp build"</span>,
    <span class="hljs-string">"buildAlpha"</span>: <span class="hljs-string">"cross-env NODE_ENV=alpha gulp build"</span>,
    <span class="hljs-string">"buildProd"</span>: <span class="hljs-string">"cross-env NODE_ENV=prod gulp build"</span>,
    <span class="hljs-string">"releaseDev"</span>: <span class="hljs-string">"cross-env NODE_ENV=dev gulp release"</span>,
    <span class="hljs-string">"releaseAlpha"</span>: <span class="hljs-string">"cross-env NODE_ENV=alpha gulp release"</span>,
    <span class="hljs-string">"releaseProd"</span>: <span class="hljs-string">"cross-env NODE_ENV=prod gulp release"</span>
  }
<span class="hljs-comment">// 可选命令行参数：</span>
<span class="hljs-comment">//      sign: 是否签名</span>
<span class="hljs-comment">//      platform: 系统平台</span>
<span class="hljs-comment">//      arch: 系统位数</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 Electron 打造 Win/Mac 应用，从「代码」到可下载的「安装包」，可能比你想得麻烦一点

## 原文链接
[https://segmentfault.com/a/1190000011908324](https://segmentfault.com/a/1190000011908324)

