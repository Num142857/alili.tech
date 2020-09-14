---
title: '深度解析`create-react-app`源码' 
date: 2018-12-16 2:30:10
hidden: true
slug: w8acu7sa0dr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<strong><em>2018-06-13</em></strong> 更新。昨天突然好奇在Google上搜了一波关于<code>create-react-app 源码</code>的关键词，发现掘金出现好几篇仿文，就连我开头前沿瞎几把啰嗦的话都抄，我还能说什么是吧？以后博客还是首发在<code>Github</code>上，<a href="https://github.com/mintsweet/blog" rel="nofollow noreferrer" target="_blank">地址戳这里戳这里</a>！！转载求你们注明出处、改编求你们贴一下参考链接...<p><strong><em>2018-01-26</em></strong> 更新。这两天我边读边思考我是不是真的懂了，我发现我有个重大的失误，我弄错了学习的顺序，学习一个新的东西，我们应该是先学会熟练的使用它，然后在去探究它的原理，我居然把第一步忽略了，这明显是错误的，所以我今天在开头新补充一节<code>使用说明</code>，同时对后面做一些修改和补充。</p>
<p>之前写了几篇关于搭建<code>react</code>环境的文，一直还没有完善它，这次撸完这波源码在重新完善之前的从零搭建完美的<code>react</code>开发打包测试环境，如果你对如何从零搭建一个<code>react</code>项目有兴趣，或者是还没有经验的小白，可以期待一下，作为我看完源码的成果作品。</p>
<p>如果后续有更正或者更新的地方，会在顶部加以说明。</p>
</blockquote>
<h2 id="articleHeader0">前言</h2>
<p>这段时间公司的事情变得比较少，空下了很多时间，作为一个刚刚毕业初入职场的菜鸟级程序员，一点都不敢放松，秉持着我为人人的思想也想为开源社区做点小小的贡献，但是一直又没有什么明确的目标，最近在努力的准备吃透<code>react</code>，加上<code>react</code>的脚手架工具<code>create-react-app</code>已经很成熟了，初始化一个<code>react</code>项目根本看不到它到底是怎么给我搭建的这个开发环境，又是怎么做到的，我还是想知道知道，所以就把他拖出来溜溜。</p>
<p><strong>文中若有错误或者需要指正的地方，多多指教，共同进步。</strong></p>
<h2 id="articleHeader1">使用说明</h2>
<p>就像我开头说的那样，学习一个新的东西，应该是先知道如何用，然后在来看他是怎么实现的。<code>create-react-app</code>到底是个什么东西，总结一句话来说，就是官方提供的快速搭建一个新的<code>react</code>项目的脚手架工具，类似于<code>vue</code>的<code>vue-cli</code>和<code>angular</code>的<code>angular-cli</code>，至于为什么不叫<code>react-cli</code>是一个值得深思的问题...哈哈哈，有趣！</p>
<p>不说废话了，贴个图，直接看<code>create-react-app</code>的命令帮助。</p>
<p><span class="img-wrap"><img data-src="http://p15hswd24.bkt.clouddn.com//create-react-app/cli-pic.png" src="https://static.alili.techhttp://p15hswd24.bkt.clouddn.com//create-react-app/cli-pic.png" alt="create-react-app" title="create-react-app" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">概略说明</h3>
<p>毕竟它已经是一个很成熟的工具了，说明也很完善，重点对其中<code>--scripts-version</code>说一下，其他比较简单，大概说一下，注意有一行<code>Only &lt;project-directory&gt; is required</code>，直译一下，仅仅只有项目名称是必须的，也就是说你在用<code>create-react-app</code>命令的时候，必须在其后跟上你的项目名称，其实这里说的不准确，像<code>--version --info --help</code>这三个选项是不需要带项目名称的，具体看下面：</p>
<ul>
<li>
<code>create-react-app -V(or --version)</code>：这个选项可以单独使用，打印版本信息，每个工具基本都有吧？</li>
<li>
<code>create-react-app --info</code>：这个选项也可以单独使用，打印当前系统跟<code>react</code>相关的开发环境参数，也就是操作系统是什么啊，<code>Node</code>版本啊之类的，可以自己试一试。</li>
<li>
<code>create-react-app -h(or --help)</code>：这个肯定是可以单独使用的，不然怎么打印帮助信息，不然就没有上面的截图了。</li>
</ul>
<p>也就是说除了上述三个参数选项是可以脱离必须参数项目名称以外来单独使用的，因为它们都跟你要初始化的<code>react</code>项目无关，然后剩下的参数就是对要初始化的<code>react</code>项目进行配置的，也就是说三个参数是可以同时出现的，来看一下它们分别的作用：</p>
<ul>
<li>
<code>create-react-app &lt;my-project&gt; --verbose</code>：看上图，打印本地日志，其实他是<code>npm</code>和<code>yarn</code>安装外部依赖包可以加的选项，可以打印安装有错时的信息。</li>
<li>
<code>create-react-app &lt;my-project&gt; --scripts-version</code>：由于它本身把创建目录初始化步骤和控制命令分离了，用来控制<code>react</code>项目的开发、打包和测试都放在了<code>react-scripts</code>里面，所以这里可以单独来配置控制的选项，可能这样你还不是很明白，我下面具体说。</li>
<li>
<code>create-react-app &lt;my-project&gt; --use-npm</code>：这个选项看意思就知道了，<code>create-react-app</code>默认使用<code>yarn</code>来安装，运行，如果你没有使用<code>yarn</code>，你可能就需要这个配置了，指定使用<code>npm</code>。</li>
</ul>
<h3 id="articleHeader3">定制选项</h3>
<p>关于<code>--scripts-version</code>我还要多说一点，其实在上述截图中我们已经可以看到，<code>create-react-app</code>本身已经对其中选项进行了说明，一共有四种情况，我并没有一一去试他，因为还挺麻烦的，以后如果用到了再来补，我先来大概推测一下他们的意思：</p>
<ul>
<li>指定版本为0.8.2</li>
<li>在<code>npm</code>发布自己的<code>react-scripts</code>
</li>
<li>在自己的网站上设置一个<code>.tgz</code>的下载包</li>
<li>在自己的网站上设置一个<code>.tar.gz</code>的下载包</li>
</ul>
<p>从上述看的出来<code>create-react-app</code>对于开发者还是很友好的，可以自己去定义很多东西，如果你不想这么去折腾，它也提供了标准的<code>react-scripts</code>供开发者使用，我一直也很好奇这个，之后我在来单独说官方标准的<code>react</code>配置是怎么做的。</p>
<h2 id="articleHeader4">目录分析</h2>
<p>随着它版本的迭代，源码肯定是会发生变化的，我这里下载的是<code>v1.1.0</code>，大家可以自行在<code>github</code>上下载这个版本，找不到的<a href="https://github.com/facebookincubator/create-react-app/tags" rel="nofollow noreferrer" target="_blank">戳链接</a>。</p>
<h3 id="articleHeader5">主要说明</h3>
<p>我们来看一下它的目录结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── .github
├── packages
├── tasks
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .travis.yml
├── .yarnrc
├── appveyor.cleanup-cache.txt
├── appveyor.yml
├── CHANGELOG-0.x.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── lerna.json
├── LICENSE
├── package.json
├── README.md
└── screencast.svg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── <span class="hljs-selector-class">.github</span>
├── packages
├── tasks
├── <span class="hljs-selector-class">.eslintignore</span>
├── <span class="hljs-selector-class">.eslintrc</span>
├── <span class="hljs-selector-class">.gitignore</span>
├── <span class="hljs-selector-class">.travis</span><span class="hljs-selector-class">.yml</span>
├── <span class="hljs-selector-class">.yarnrc</span>
├── appveyor<span class="hljs-selector-class">.cleanup-cache</span><span class="hljs-selector-class">.txt</span>
├── appveyor<span class="hljs-selector-class">.yml</span>
├── CHANGELOG-<span class="hljs-number">0</span><span class="hljs-selector-class">.x</span><span class="hljs-selector-class">.md</span>
├── CHANGELOG<span class="hljs-selector-class">.md</span>
├── CODE_OF_CONDUCT<span class="hljs-selector-class">.md</span>
├── CONTRIBUTING<span class="hljs-selector-class">.md</span>
├── lerna<span class="hljs-selector-class">.json</span>
├── LICENSE
├── package<span class="hljs-selector-class">.json</span>
├── README<span class="hljs-selector-class">.md</span>
└── screencast.svg</code></pre>
<p>咋一看好多啊，我的天啊，到底要怎么看，其实仔细一晃，好像很多一眼就能看出来是什么意思，大概说一下每个文件都是干嘛的，具体的我也不知道啊，往下看，一步一步来。</p>
<ul>
<li>
<code>.github</code>：这里面放着当你在这个项目提<code>issue</code>和<code>pr</code>时候的规范</li>
<li>
<code>packages</code>：字面意思就是包们.....暂时不管，后面详说 ----&gt; <strong>重点</strong>
</li>
<li>
<code>tasks</code>：字面意思就是任务们.....暂时不管，后面详说  ----&gt; <strong>重点</strong>
</li>
<li>
<code>.eslintignore</code>: <code>eslint</code>检查时忽略文件</li>
<li>
<code>.eslintrc</code>：<code>eslint</code>检查配置文件</li>
<li>
<code>.gitignore</code>：<code>git</code>提交时忽略文件</li>
<li>
<code>.travis.yml</code>：<code>travis</code>配置文件</li>
<li>
<code>.yarnrc</code>：<code>yarn</code>配置文件</li>
<li>
<code>appveyor.cleanup-cache.txt</code>：里面有一行<code>Edit this file to trigger a cache rebuild</code>编辑此文件触发缓存，具体干嘛的，暂时不议</li>
<li>
<code>appveyor.yml</code>： <code>appveyor</code>配置文件</li>
<li>
<code>CHANGELOG-0.x.md</code>：版本0.X开头的变更说明文件</li>
<li>
<code>CHANGELOG.md</code>：当前版本变更说明文件</li>
<li>
<code>CODE_OF_CONDUCT.md</code>：<code>facebook</code>代码行为准则说明</li>
<li>
<code>CONTRIBUTING.md</code>：项目的核心说明</li>
<li>
<code>lerna.json</code>：<code>lerna</code>配置文件</li>
<li>
<code>LICENSE</code>：开源协议</li>
<li>
<code>package.json</code>：项目配置文件</li>
<li>
<code>README.md</code>：项目使用说明</li>
<li>
<code>screencast.svg</code>：图片...</li>
</ul>
<p>看了这么多文件，是不是打退堂鼓了？哈哈哈哈，好了好了，进入正题，其实上述对于我们阅读源码有用的只有<code>packages</code>、<code>tasks</code>、<code>package.json</code>三个文件而已，而且本篇能用到的也就<code>packages</code>和<code>package.json</code>，是不是想打我.....我也只是想告诉大家这些文件有什么用，它们都是有各自的作用的，如果还不了解，参考下面的参考链接。</p>
<h3 id="articleHeader6">参考链接</h3>
<p><code>eslint</code>相关的：<a href="https://eslint.org/" rel="nofollow noreferrer" target="_blank">eslint官网</a><br><code>travis</code>相关的：<a href="https://www.travis-ci.org/" rel="nofollow noreferrer" target="_blank">travis官网</a>  <a href="https://www.liaoxuefeng.com/article/0014631488240837e3633d3d180476cb684ba7c10fda6f6000" rel="nofollow noreferrer" target="_blank">travis入门</a><br><code>yarn</code>相关的：<a href="https://yarnpkg.com/en/" rel="nofollow noreferrer" target="_blank">yarn官网</a><br><code>appveyor</code>相关的：<a href="https://www.appveyor.com/" rel="nofollow noreferrer" target="_blank">appveyor官网</a><br><code>lerna</code>相关的：<a href="https://lernajs.io/" rel="nofollow noreferrer" target="_blank">lerna官网</a></p>
<p>工具自行了解，本文只说源码相关的<code>packages</code>、<code>package.json</code>。</p>
<h2 id="articleHeader7">寻找入口</h2>
<p>现在的前端项目大多数都有很多别的依赖，不在像以前那些原生<code>javascript</code>的工具库，拿到源码文件，就可以开始看了，像<code>jQuery</code>、<code>underscore</code>等等，一个两个文件包含了它所有的内容，虽然也有很框架会有<code>umd</code>规范的文件可以直接阅读，像<code>better-scroll</code>等等，但是其实他在书写源码的时候还是拆分成了很多块，最后在用打包工具整合在一起了。但是像<code>create-react-app</code>这样的脚手架工具好像不能像之前那种方法来看了，必须找到整个程序的入口，在逐步突破，所以最开始的工具肯定是寻找入口。</p>
<h3 id="articleHeader8">开始关注</h3>
<p>拿到一个项目我们应该从哪个文件开始看起呢？只要是基于<code>npm</code>管理的，我都推荐从<code>package.json</code>文件开始看，人家是项目的介绍文件，你不看它看啥。</p>
<p>它里面理论上应该是有名称、版本等等一些说明性信息，但是都没用，看几个重要的配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;workspaces&quot;: [
    &quot;packages/*&quot;
]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"workspaces"</span>: [
    <span class="hljs-string">"packages/*"</span>
],</code></pre>
<p>关于<code>workspaces</code>一开始我在<code>npm</code>的说明文档里面没找到，虽然从字面意思我们也能猜到它的意思是实际工作的目录是<code>packages</code>，后来我查了一下是<code>yarn</code>里面的东东，具体看<a href="https://www.poorren.com/npm-link-yarn-link-and-yarn-workspaces" rel="nofollow noreferrer" target="_blank">这篇文章</a>，用于在本地测试，具体不关注，只是从这里我们知道了真正的起作用的文件都在<code>packages</code>里面。</p>
<h3 id="articleHeader9">重点关注</h3>
<p>从上述我们知道现在真正需要关注的内容都在<code>packages</code>里面，我们来看看它里面都是有什么东东：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── babel-preset-react-app    --> 暂不关注
├── create-react-app
├── eslint-config-react-app   --> 暂不关注
├── react-dev-utils           --> 暂不关注
├── react-error-overlay       --> 暂不关注
└── react-scripts             --> 核心啊，还是暂不关注" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code>├── <span class="hljs-string">babel-preset-</span><span class="hljs-string">react-app </span>   --&gt; 暂不关注
├── <span class="hljs-built_in">create-react-app</span>
├── <span class="hljs-string">eslint-config-</span><span class="hljs-string">react-app </span>  --&gt; 暂不关注
├── <span class="hljs-string">react-dev-</span><span class="hljs-string">utils </span>          --&gt; 暂不关注
├── <span class="hljs-string">react-error-</span><span class="hljs-string">overlay </span>      --&gt; 暂不关注
└── <span class="hljs-string">react-scripts </span>            --&gt; 核心啊，还是暂不关注</code></pre>
<p>里面有六个文件夹，哇塞，又是6个单独的项目，这要看到何年何月.....是不是有这种感触，放宽心大胆的看，先想一下我们在安装了<code>create-react-app</code>后在，在命令行输入的是<code>create-react-app</code>的命令，所以我们大胆的推测关于这个命令应该都是存在了<code>create-react-app</code>下，在这个目录下同样有<code>package.json</code>文件，现在我们把这6个文件拆分成6个项目来分析，上面也说了，看一个项目首先看<code>package.json</code>文件，找到其中的重点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;bin&quot;: {
    &quot;create-react-app&quot;: &quot;./index.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"bin"</span>: {
    <span class="hljs-string">"create-react-app"</span>: <span class="hljs-string">"./index.js"</span>
}</code></pre>
<p>找到重点了，<code>package.json</code>文件中的<code>bin</code>就是在命令行中可以运行的命令，也就是说我们在执行<code>create-react-app</code>命令的时候，就是执行<code>create-react-app</code>目录下的<code>index.js</code>文件。</p>
<h3 id="articleHeader10">多说两句</h3>
<p>关于<code>package.json</code>中的<code>bin</code>选项，其实是基于<code>node</code>环境运行之后的内容。举个简单的例子，在我们安装<code>create-react-app</code>后，执行<code>create-react-app</code>等价于执行<code>node index.js</code>。</p>
<h2 id="articleHeader11">create-react-app目录解析</h2>
<p>经过以上一系列的查找，我们终于艰难的找到了<code>create-react-app</code>命令的中心入口，其他的都先不管，我们打开<code>packages/create-react-app</code>目录，仔细一瞅，噢哟，只有四个文件，四个文件我们还搞不定吗？除了<code>package.json</code>、<code>README.md</code>就只剩两个能看的文件了，我们来看看这两个文件。</p>
<h3 id="articleHeader12">index.js</h3>
<p>既然之前已经看到<code>packages/create-react-app/package.json</code>中关于<code>bin</code>的设置，就是执行<code>index.js</code>文件，我们就从<code>index.js</code>入手，开始瞅瞅源码到底都有些虾米。</p>
<p>除了一大串的注释以外，代码其实很少，全贴上来了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var chalk = require('chalk');

var currentNodeVersion = process.versions.node; // 返回Node版本信息，如果有多个版本返回多个版本
var semver = currentNodeVersion.split('.'); // 所有Node版本的集合
var major = semver[0]; // 取出第一个Node版本信息

// 如果当前版本小于4就打印以下信息并终止进程
if (major < 4) {
  console.error(
    chalk.red(
      'You are running Node ' +
        currentNodeVersion +
        '.\n' +
        'Create React App requires Node 4 or higher. \n' +
        'Please update your version of Node.'
    )
  );
  process.exit(1); // 终止进程
}

// 没有小于4就引入以下文件继续执行
require('./createReactApp');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>);

<span class="hljs-keyword">var</span> currentNodeVersion = process.versions.node; <span class="hljs-comment">// 返回Node版本信息，如果有多个版本返回多个版本</span>
<span class="hljs-keyword">var</span> semver = currentNodeVersion.split(<span class="hljs-string">'.'</span>); <span class="hljs-comment">// 所有Node版本的集合</span>
<span class="hljs-keyword">var</span> major = semver[<span class="hljs-number">0</span>]; <span class="hljs-comment">// 取出第一个Node版本信息</span>

<span class="hljs-comment">// 如果当前版本小于4就打印以下信息并终止进程</span>
<span class="hljs-keyword">if</span> (major &lt; <span class="hljs-number">4</span>) {
  <span class="hljs-built_in">console</span>.error(
    chalk.red(
      <span class="hljs-string">'You are running Node '</span> +
        currentNodeVersion +
        <span class="hljs-string">'.\n'</span> +
        <span class="hljs-string">'Create React App requires Node 4 or higher. \n'</span> +
        <span class="hljs-string">'Please update your version of Node.'</span>
    )
  );
  process.exit(<span class="hljs-number">1</span>); <span class="hljs-comment">// 终止进程</span>
}

<span class="hljs-comment">// 没有小于4就引入以下文件继续执行</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./createReactApp'</span>);</code></pre>
<p>咋一眼看过去其实你就知道它大概是什么意思了....检查<code>Node.js</code>的版本，小于<code>4</code>就不执行了，我们分开来看一下，这里他用了一个库<code>chalk </code>，理解起来并不复杂，一行一行的解析。</p>
<ul><li>
<code>chalk</code>：这个对这段代码的实际影响就是在命令行中，将输出的信息变色。也就引出了这个库的作用改变命令行中输出信息的样式。<a href="https://www.npmjs.com/package/chalk" rel="nofollow noreferrer" target="_blank">npm地址</a>
</li></ul>
<p>其中有几个<code>Node</code>自身的<code>API</code>：</p>
<ul>
<li>
<code>process.versions</code> 返回一个对象，包含<code>Node</code>以及它的依赖信息</li>
<li>
<code>process.exit</code> 结束<code>Node</code>进程，<code>1</code>是状态码，表示有异常没有处理</li>
</ul>
<p>在我们经过<code>index.js</code>后，就来到了<code>createReactApp.js</code>，下面再继续看。</p>
<h3 id="articleHeader13">createReactApp.js</h3>
<p>当我们本机上的<code>Node</code>版本大于<code>4</code>的时候就要继续执行这个文件了，打开这个文件，代码还不少，大概<code>700</code>多行吧，我们慢慢拆解。</p>
<blockquote>这里放个小技巧，在读源码的时候，可以在开一个写代码的窗口，跟着写一遍，执行过的代码可以在源文件中先删除，这样<code>700行</code>代码，当你读了<code>200行</code>的时候，源文件就只剩<code>500行</code>了，不仅有成就感继续阅读，也把不执行的逻辑先删除了，影响不到你读其他地方。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const validateProjectName = require('validate-npm-package-name');
const chalk = require('chalk');
const commander = require('commander');
const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn');
const semver = require('semver');
const dns = require('dns');
const tmp = require('tmp');
const unpack = require('tar-pack').unpack;
const url = require('url');
const hyperquest = require('hyperquest');
const envinfo = require('envinfo');

const packageJson = require('./package.json');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> validateProjectName = <span class="hljs-built_in">require</span>(<span class="hljs-string">'validate-npm-package-name'</span>);
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>);
<span class="hljs-keyword">const</span> commander = <span class="hljs-built_in">require</span>(<span class="hljs-string">'commander'</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs-extra'</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> execSync = <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).execSync;
<span class="hljs-keyword">const</span> spawn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cross-spawn'</span>);
<span class="hljs-keyword">const</span> semver = <span class="hljs-built_in">require</span>(<span class="hljs-string">'semver'</span>);
<span class="hljs-keyword">const</span> dns = <span class="hljs-built_in">require</span>(<span class="hljs-string">'dns'</span>);
<span class="hljs-keyword">const</span> tmp = <span class="hljs-built_in">require</span>(<span class="hljs-string">'tmp'</span>);
<span class="hljs-keyword">const</span> unpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'tar-pack'</span>).unpack;
<span class="hljs-keyword">const</span> url = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>);
<span class="hljs-keyword">const</span> hyperquest = <span class="hljs-built_in">require</span>(<span class="hljs-string">'hyperquest'</span>);
<span class="hljs-keyword">const</span> envinfo = <span class="hljs-built_in">require</span>(<span class="hljs-string">'envinfo'</span>);

<span class="hljs-keyword">const</span> packageJson = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./package.json'</span>);</code></pre>
<p>打开代码一排依赖，懵逼....我不可能挨着去查一个个依赖是用来干嘛的吧？所以，我的建议就是先不管，用到的时候在回来看它是干嘛的，理解更加透彻一些，继续往下看。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let projectName; // 定义了一个用来存储项目名称的变量

const program = new commander.Command(packageJson.name)
  .version(packageJson.version) // 输入版本信息，使用`create-react-app -v`的时候就用打印版本信息
  .arguments('<project-directory>') // 使用`create-react-app <my-project>` 尖括号中的参数
  .usage(`${chalk.green('<project-directory>')} [options]`) //  使用`create-react-app`第一行打印的信息，也就是使用说明
  .action(name => {
    projectName = name; // 此处action函数的参数就是之前argument中的<project-directory> 初始化项目名称 --> 此处影响后面
  })
  .option('--verbose', 'print additional logs') // option配置`create-react-app -[option]`的选项，类似 --help -V
  .option('--info', 'print environment debug info') // 打印本地相关开发环境，操作系统，`Node`版本等等
  .option(
    '--scripts-version <alternative-package>',
    'use a non-standard version of react-scripts'
  ) // 这我之前就说过了，指定特殊的`react-scripts`
  .option('--use-npm') // 默认使用`yarn`，指定使用`npm`
  .allowUnknownOption() // 这个我没有在文档上查到，直译就是允许无效的option 大概意思就是我可以这样`create-react-app <my-project> -la` 其实 -la 并没有定义，但是我还是可以这么做而不会保存
  .on('--help', () => {
    // 此处省略了一些打印信息
  }) // on('--help') 用来定制打印帮助信息 当使用`create-react-app -h(or --help)`的时候就会执行其中的代码，基本都是些打印信息
  .parse(process.argv); // 这个就是解析我们正常的`Node`进程，可以这么理解没有这个东东，`commander`就不能接管`Node`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> projectName; <span class="hljs-comment">// 定义了一个用来存储项目名称的变量</span>

<span class="hljs-keyword">const</span> program = <span class="hljs-keyword">new</span> commander.Command(packageJson.name)
  .version(packageJson.version) <span class="hljs-comment">// 输入版本信息，使用`create-react-app -v`的时候就用打印版本信息</span>
  .arguments(<span class="hljs-string">'&lt;project-directory&gt;'</span>) <span class="hljs-comment">// 使用`create-react-app &lt;my-project&gt;` 尖括号中的参数</span>
  .usage(<span class="hljs-string">`<span class="hljs-subst">${chalk.green(<span class="hljs-string">'&lt;project-directory&gt;'</span>)}</span> [options]`</span>) <span class="hljs-comment">//  使用`create-react-app`第一行打印的信息，也就是使用说明</span>
  .action(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> {
    projectName = name; <span class="hljs-comment">// 此处action函数的参数就是之前argument中的&lt;project-directory&gt; 初始化项目名称 --&gt; 此处影响后面</span>
  })
  .option(<span class="hljs-string">'--verbose'</span>, <span class="hljs-string">'print additional logs'</span>) <span class="hljs-comment">// option配置`create-react-app -[option]`的选项，类似 --help -V</span>
  .option(<span class="hljs-string">'--info'</span>, <span class="hljs-string">'print environment debug info'</span>) <span class="hljs-comment">// 打印本地相关开发环境，操作系统，`Node`版本等等</span>
  .option(
    <span class="hljs-string">'--scripts-version &lt;alternative-package&gt;'</span>,
    <span class="hljs-string">'use a non-standard version of react-scripts'</span>
  ) <span class="hljs-comment">// 这我之前就说过了，指定特殊的`react-scripts`</span>
  .option(<span class="hljs-string">'--use-npm'</span>) <span class="hljs-comment">// 默认使用`yarn`，指定使用`npm`</span>
  .allowUnknownOption() <span class="hljs-comment">// 这个我没有在文档上查到，直译就是允许无效的option 大概意思就是我可以这样`create-react-app &lt;my-project&gt; -la` 其实 -la 并没有定义，但是我还是可以这么做而不会保存</span>
  .on(<span class="hljs-string">'--help'</span>, () =&gt; {
    <span class="hljs-comment">// 此处省略了一些打印信息</span>
  }) <span class="hljs-comment">// on('--help') 用来定制打印帮助信息 当使用`create-react-app -h(or --help)`的时候就会执行其中的代码，基本都是些打印信息</span>
  .parse(process.argv); <span class="hljs-comment">// 这个就是解析我们正常的`Node`进程，可以这么理解没有这个东东，`commander`就不能接管`Node`</span></code></pre>
<p>在上面的代码中，我把无关紧要打印信息省略了，这段代码算是这个文件的关键入口地此处他<code>new</code>了一个<code>commander</code>，这是个啥东东呢？这时我们就返回去看它的依赖，找到它是一个外部依赖，这时候怎么办呢？不可能打开<code>node_modules</code>去里面找撒，很简单，打开<code>npm</code>官网查一下这个外部依赖。</p>
<ul><li>
<code>commander</code>：概述一下，<code>Node</code>命令接口，也就是可以用它代管<code>Node</code>命令。<a href="https://www.npmjs.com/package/commander" rel="nofollow noreferrer" target="_blank">npm地址</a>
</li></ul>
<p>上述只是<code>commander</code>用法的一种实现，没有什么具体好说的，了解了<code>commander</code>就不难，这里的定义也就是我们在命令行中看到的那些东西，比如参数，比如打印信息等等，我们继续往下来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 判断在命令行中执行`create-react-app <name>` 有没有name，如果没有就继续
if (typeof projectName === 'undefined') {
  // 当没有传name的时候，如果带了 --info 的选项继续执行下列代码，这里配置了--info时不会报错
  if (program.info) {
    // 打印当前环境信息和`react`、`react-dom`, `react-scripts`三个包的信息
    envinfo.print({
      packages: ['react', 'react-dom', 'react-scripts'],
      noNativeIDE: true,
      duplicates: true,
    });
    process.exit(0); // 正常退出进程
  }
  // 在没有带项目名称又没带 --info 选项的时候就会打印一堆错误信息，像--version 和 --help 是commander自带的选项，所以不用单独配置
  console.error('Please specify the project directory:');
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
  );
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-react-app')}`);
  console.log();
  console.log(
    `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
  );
  process.exit(1); // 抛出异常退出进程
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 判断在命令行中执行`create-react-app &lt;name&gt;` 有没有name，如果没有就继续</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> projectName === <span class="hljs-string">'undefined'</span>) {
  <span class="hljs-comment">// 当没有传name的时候，如果带了 --info 的选项继续执行下列代码，这里配置了--info时不会报错</span>
  <span class="hljs-keyword">if</span> (program.info) {
    <span class="hljs-comment">// 打印当前环境信息和`react`、`react-dom`, `react-scripts`三个包的信息</span>
    envinfo.print({
      <span class="hljs-attr">packages</span>: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'react-dom'</span>, <span class="hljs-string">'react-scripts'</span>],
      <span class="hljs-attr">noNativeIDE</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">duplicates</span>: <span class="hljs-literal">true</span>,
    });
    process.exit(<span class="hljs-number">0</span>); <span class="hljs-comment">// 正常退出进程</span>
  }
  <span class="hljs-comment">// 在没有带项目名称又没带 --info 选项的时候就会打印一堆错误信息，像--version 和 --help 是commander自带的选项，所以不用单独配置</span>
  <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Please specify the project directory:'</span>);
  <span class="hljs-built_in">console</span>.log(
    <span class="hljs-string">`  <span class="hljs-subst">${chalk.cyan(program.name())}</span> <span class="hljs-subst">${chalk.green(<span class="hljs-string">'&lt;project-directory&gt;'</span>)}</span>`</span>
  );
  <span class="hljs-built_in">console</span>.log();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'For example:'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`  <span class="hljs-subst">${chalk.cyan(program.name())}</span> <span class="hljs-subst">${chalk.green(<span class="hljs-string">'my-react-app'</span>)}</span>`</span>);
  <span class="hljs-built_in">console</span>.log();
  <span class="hljs-built_in">console</span>.log(
    <span class="hljs-string">`Run <span class="hljs-subst">${chalk.cyan(<span class="hljs-string">`<span class="hljs-subst">${program.name()}</span> --help`</span>)}</span> to see all options.`</span>
  );
  process.exit(<span class="hljs-number">1</span>); <span class="hljs-comment">// 抛出异常退出进程</span>
}</code></pre>
<p>还记得上面把<code>create-react-app &lt;my-project&gt;</code>中的项目名称赋予了<code>projectName </code>变量吗？此处的作用就是看看用户有没有传这个<code>&lt;my-project&gt;</code>参数，如果没有就会报错，并显示一些帮助信息，这里用到了另外一个外部依赖<code>envinfo</code>。</p>
<ul><li>
<code>envinfo</code>：可以打印当前操作系统的环境和指定包的信息。 <a href="https://www.npmjs.com/package/envinfo" rel="nofollow noreferrer" target="_blank">npm地址</a>
</li></ul>
<blockquote>到这里我还要吐槽一下<code>segmentfault</code>的编辑器...我同时打开视图和编辑好卡...捂脸.png！</blockquote>
<p>这里我之前省略了一个东西，还是拿出来说一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const hiddenProgram = new commander.Command()
  .option(
    '--internal-testing-template <path-to-template>',
    '(internal usage only, DO NOT RELY ON THIS) ' +
      'use a non-standard application template'
  )
  .parse(process.argv);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> hiddenProgram = <span class="hljs-keyword">new</span> commander.Command()
  .option(
    <span class="hljs-string">'--internal-testing-template &lt;path-to-template&gt;'</span>,
    <span class="hljs-string">'(internal usage only, DO NOT RELY ON THIS) '</span> +
      <span class="hljs-string">'use a non-standard application template'</span>
  )
  .parse(process.argv);</code></pre>
<p><code>create-react-app</code>在初始化一个项目的时候，会生成一个标准的文件夹，这里有一个隐藏的选项<code>--internal-testing-template</code>，用来更改初始化目录的模板，这里他已经说了，供内部使用，应该是开发者们开发时候用的，所以不建议大家使用这个选项。</p>
<p>我们继续往下看，有几个提前定义的函数，我们不管，直接找到第一个被执行的函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createApp(
  projectName,
  program.verbose,
  program.scriptsVersion,
  program.useNpm,
  hiddenProgram.internalTestingTemplate
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">createApp(
  projectName,
  program.verbose,
  program.scriptsVersion,
  program.useNpm,
  hiddenProgram.internalTestingTemplate
);</code></pre>
<p>一个<code>createAPP</code>函数，接收了5个参数</p>
<ul>
<li>
<code>projectName</code>: 执行<code>create-react-app &lt;name&gt;</code> name的值，也就是初始化项目的名称</li>
<li>
<code>program.verbose</code>：这里在说一下<code>commander</code>的<code>option</code>选项，如果加了这个选项这个值就是<code>true</code>，否则就是<code>false</code>，也就是说这里如果加了<code>--verbose</code>，那这个参数就是<code>true</code>，至于<code>verbose</code>是什么，我之前也说过了，在<code>yarn</code>或者<code>npm</code>安装的时候打印本地信息，也就是如果安装过程中出错，我们可以找到额外的信息。</li>
<li>
<code>program.scriptsVersion</code>：与上述同理，指定<code>react-scripts</code>版本</li>
<li>
<code>program.useNpm</code>：以上述同理，指定是否使用<code>npm</code>，默认使用<code>yarn</code>
</li>
<li>
<code>hiddenProgram.internalTestingTemplate</code>：这个东东，我之前给他省略了，我在前面已经补充了，指定初始化的模板，人家说了内部使用，大家可以忽略了，应该是用于开发测试模板目录的时候使用。</li>
</ul>
<p>找到了第一个执行的函数<code>createApp</code>，我们就来看看<code>createApp</code>函数到底做了什么？</p>
<h4><code>createApp()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createApp(name, verbose, version, useNpm, template) {
  const root = path.resolve(name); // 获取当前进程运行的位置，也就是文件目录的绝对路径
  const appName = path.basename(root); // 返回root路径下最后一部分

  checkAppName(appName); // 执行 checkAppName 函数 检查文件名是否合法
  fs.ensureDirSync(name); // 此处 ensureDirSync 方法是外部依赖包 fs-extra 而不是 node本身的fs模块，作用是确保当前目录下有指定文件名，没有就创建
  // isSafeToCreateProjectIn 函数 判断文件夹是否安全
  if (!isSafeToCreateProjectIn(root, name)) {
    process.exit(1); // 不合法结束进程
  }
  // 到这里打印成功创建了一个`react`项目在指定目录下
  console.log(`Creating a new React app in ${chalk.green(root)}.`);
  console.log();
  // 定义package.json基础内容
  const packageJson = {
    name: appName,
    version: '0.1.0',
    private: true,
  };
  // 往我们创建的文件夹中写入package.json文件
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  // 定义常量 useYarn 如果传参有 --use-npm useYarn就是false，否则执行 shouldUseYarn() 检查yarn是否存在
  // 这一步就是之前说的他默认使用`yarn`，但是可以指定使用`npm`，如果指定使用了`npm`，`useYarn`就是`false`，不然执行 shouldUseYarn 函数
  // shouldUseYarn 用于检测本机是否安装了`yarn`
  const useYarn = useNpm ? false : shouldUseYarn();
  // 取得当前node进程的目录，之前还懂为什么要单独取一次，之后也明白了，下一句代码将会改变这个值，所以如果我后面要用这个值，后续其实取得值将不是这个
  // 所以这里的目的就是提前存好，免得我后续使用的时候不好去找，这个地方就是我执行初始化项目的目录，而不是初始化好的目录，是初始化的上级目录，有点绕..
  const originalDirectory = process.cwd();
  // 修改进程目录为底下子进程目录
  // 在这里就把进程目录修改为了我们创建的目录
  process.chdir(root);
  // 如果不使用yarn 并且checkThatNpmCanReadCwd()函数 这里之前说的不是很对，在重新说一次
  // checkThatNpmCanReadCwd 这个函数的作用是检查进程目录是否是我们创建的目录，也就是说如果进程不在我们创建的目录里面，后续再执行`npm`安装的时候就会出错，所以提前检查
  if (!useYarn &amp;&amp; !checkThatNpmCanReadCwd()) {
    process.exit(1);
  }
  // 比较 node 版本，小于6的时候发出警告
  // 之前少说了一点，小于6的时候指定`react-scripts`标准版本为0.9.x，也就是标准的`react-scripts@1.0.0`以上的版本不支持`node`在6版本之下
  if (!semver.satisfies(process.version, '>=6.0.0')) {
    console.log(
      chalk.yellow(
        `You are using Node ${process.version} so the project will be bootstrapped with an old unsupported version of tools.\n\n` +
          `Please update to Node 6 or higher for a better, fully supported experience.\n`
      )
    );
    // Fall back to latest supported react-scripts on Node 4
    version = 'react-scripts@0.9.x';
  }
  // 如果没有使用yarn 也发出警告
  // 这里之前也没有说全，还判断了`npm`的版本是不是在3以上，如果没有依然指定安装`react-scripts@0.9.x`版本
  if (!useYarn) {
    const npmInfo = checkNpmVersion();
    if (!npmInfo.hasMinNpm) {
      if (npmInfo.npmVersion) {
        console.log(
          chalk.yellow(
            `You are using npm ${npmInfo.npmVersion} so the project will be boostrapped with an old unsupported version of tools.\n\n` +
              `Please update to npm 3 or higher for a better, fully supported experience.\n`
          )
        );
      }
      // Fall back to latest supported react-scripts for npm 3
      version = 'react-scripts@0.9.x';
    }
  }
  // 传入这些参数执行run函数
  // 执行完毕上述代码以后，将执行`run`函数，但是我还是先把上述用到的函数全部说完，在来下一个核心函数`run`
  run(root, appName, version, verbose, originalDirectory, template, useYarn);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createApp</span>(<span class="hljs-params">name, verbose, version, useNpm, template</span>) </span>{
  <span class="hljs-keyword">const</span> root = path.resolve(name); <span class="hljs-comment">// 获取当前进程运行的位置，也就是文件目录的绝对路径</span>
  <span class="hljs-keyword">const</span> appName = path.basename(root); <span class="hljs-comment">// 返回root路径下最后一部分</span>

  checkAppName(appName); <span class="hljs-comment">// 执行 checkAppName 函数 检查文件名是否合法</span>
  fs.ensureDirSync(name); <span class="hljs-comment">// 此处 ensureDirSync 方法是外部依赖包 fs-extra 而不是 node本身的fs模块，作用是确保当前目录下有指定文件名，没有就创建</span>
  <span class="hljs-comment">// isSafeToCreateProjectIn 函数 判断文件夹是否安全</span>
  <span class="hljs-keyword">if</span> (!isSafeToCreateProjectIn(root, name)) {
    process.exit(<span class="hljs-number">1</span>); <span class="hljs-comment">// 不合法结束进程</span>
  }
  <span class="hljs-comment">// 到这里打印成功创建了一个`react`项目在指定目录下</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Creating a new React app in <span class="hljs-subst">${chalk.green(root)}</span>.`</span>);
  <span class="hljs-built_in">console</span>.log();
  <span class="hljs-comment">// 定义package.json基础内容</span>
  <span class="hljs-keyword">const</span> packageJson = {
    <span class="hljs-attr">name</span>: appName,
    <span class="hljs-attr">version</span>: <span class="hljs-string">'0.1.0'</span>,
    <span class="hljs-attr">private</span>: <span class="hljs-literal">true</span>,
  };
  <span class="hljs-comment">// 往我们创建的文件夹中写入package.json文件</span>
  fs.writeFileSync(
    path.join(root, <span class="hljs-string">'package.json'</span>),
    <span class="hljs-built_in">JSON</span>.stringify(packageJson, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>)
  );
  <span class="hljs-comment">// 定义常量 useYarn 如果传参有 --use-npm useYarn就是false，否则执行 shouldUseYarn() 检查yarn是否存在</span>
  <span class="hljs-comment">// 这一步就是之前说的他默认使用`yarn`，但是可以指定使用`npm`，如果指定使用了`npm`，`useYarn`就是`false`，不然执行 shouldUseYarn 函数</span>
  <span class="hljs-comment">// shouldUseYarn 用于检测本机是否安装了`yarn`</span>
  <span class="hljs-keyword">const</span> useYarn = useNpm ? <span class="hljs-literal">false</span> : shouldUseYarn();
  <span class="hljs-comment">// 取得当前node进程的目录，之前还懂为什么要单独取一次，之后也明白了，下一句代码将会改变这个值，所以如果我后面要用这个值，后续其实取得值将不是这个</span>
  <span class="hljs-comment">// 所以这里的目的就是提前存好，免得我后续使用的时候不好去找，这个地方就是我执行初始化项目的目录，而不是初始化好的目录，是初始化的上级目录，有点绕..</span>
  <span class="hljs-keyword">const</span> originalDirectory = process.cwd();
  <span class="hljs-comment">// 修改进程目录为底下子进程目录</span>
  <span class="hljs-comment">// 在这里就把进程目录修改为了我们创建的目录</span>
  process.chdir(root);
  <span class="hljs-comment">// 如果不使用yarn 并且checkThatNpmCanReadCwd()函数 这里之前说的不是很对，在重新说一次</span>
  <span class="hljs-comment">// checkThatNpmCanReadCwd 这个函数的作用是检查进程目录是否是我们创建的目录，也就是说如果进程不在我们创建的目录里面，后续再执行`npm`安装的时候就会出错，所以提前检查</span>
  <span class="hljs-keyword">if</span> (!useYarn &amp;&amp; !checkThatNpmCanReadCwd()) {
    process.exit(<span class="hljs-number">1</span>);
  }
  <span class="hljs-comment">// 比较 node 版本，小于6的时候发出警告</span>
  <span class="hljs-comment">// 之前少说了一点，小于6的时候指定`react-scripts`标准版本为0.9.x，也就是标准的`react-scripts@1.0.0`以上的版本不支持`node`在6版本之下</span>
  <span class="hljs-keyword">if</span> (!semver.satisfies(process.version, <span class="hljs-string">'&gt;=6.0.0'</span>)) {
    <span class="hljs-built_in">console</span>.log(
      chalk.yellow(
        <span class="hljs-string">`You are using Node <span class="hljs-subst">${process.version}</span> so the project will be bootstrapped with an old unsupported version of tools.\n\n`</span> +
          <span class="hljs-string">`Please update to Node 6 or higher for a better, fully supported experience.\n`</span>
      )
    );
    <span class="hljs-comment">// Fall back to latest supported react-scripts on Node 4</span>
    version = <span class="hljs-string">'react-scripts@0.9.x'</span>;
  }
  <span class="hljs-comment">// 如果没有使用yarn 也发出警告</span>
  <span class="hljs-comment">// 这里之前也没有说全，还判断了`npm`的版本是不是在3以上，如果没有依然指定安装`react-scripts@0.9.x`版本</span>
  <span class="hljs-keyword">if</span> (!useYarn) {
    <span class="hljs-keyword">const</span> npmInfo = checkNpmVersion();
    <span class="hljs-keyword">if</span> (!npmInfo.hasMinNpm) {
      <span class="hljs-keyword">if</span> (npmInfo.npmVersion) {
        <span class="hljs-built_in">console</span>.log(
          chalk.yellow(
            <span class="hljs-string">`You are using npm <span class="hljs-subst">${npmInfo.npmVersion}</span> so the project will be boostrapped with an old unsupported version of tools.\n\n`</span> +
              <span class="hljs-string">`Please update to npm 3 or higher for a better, fully supported experience.\n`</span>
          )
        );
      }
      <span class="hljs-comment">// Fall back to latest supported react-scripts for npm 3</span>
      version = <span class="hljs-string">'react-scripts@0.9.x'</span>;
    }
  }
  <span class="hljs-comment">// 传入这些参数执行run函数</span>
  <span class="hljs-comment">// 执行完毕上述代码以后，将执行`run`函数，但是我还是先把上述用到的函数全部说完，在来下一个核心函数`run`</span>
  run(root, appName, version, verbose, originalDirectory, template, useYarn);
}</code></pre>
<p>我这里先来总结一下这个函数都做了哪些事情，再来看看他用到的依赖有哪些，先说做了哪些事情，在我们的目录下创建了一个项目目录，并且校验了这个目录的名称是否合法，这个目录是否安全，然后往其中写入了一个<code>package.json</code>的文件，并且判断了当前环境下应该使用的<code>react-scripts</code>的版本，然后执行了<code>run</code>函数。我们在来看看这个函数用了哪些外部依赖：</p>
<ul>
<li>
<code>fs-extra</code>：外部依赖，<code>Node</code>自带文件模块的外部扩展模块 <a href="https://www.npmjs.com/package/fs-extra" rel="nofollow noreferrer" target="_blank">npm地址</a>
</li>
<li>
<code>semver</code>：外部依赖，用于比较<code>Node</code>版本 <a href="https://www.npmjs.com/package/semver" rel="nofollow noreferrer" target="_blank">npm地址</a>
</li>
</ul>
<p>之后函数的函数依赖我都会进行详细的解析，除了少部分特别简单的函数，然后我们来看看这个函数的函数依赖：</p>
<ul>
<li>
<code>checkAppName()</code>：用于检测文件名是否合法，</li>
<li>
<code>isSafeToCreateProjectIn()</code>：用于检测文件夹是否安全</li>
<li>
<code>shouldUseYarn()</code>：用于检测<code>yarn</code>在本机是否已经安装</li>
<li>
<code>checkThatNpmCanReadCwd()</code>：用于检测<code>npm</code>是否在正确的目录下执行</li>
<li>
<code>checkNpmVersion()</code>：用于检测<code>npm</code>在本机是否已经安装了</li>
</ul>
<h4><code>checkAppName()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkAppName(appName) {
  // 使用 validateProjectName 检查包名是否合法返回结果，这个validateProjectName是外部依赖的引用，见下面说明
  const validationResult = validateProjectName(appName); 
  // 如果对象中有错继续，这里就是外部依赖的具体用法
  if (!validationResult.validForNewPackages) {
    console.error(
      `Could not create a project called ${chalk.red(
        `&quot;${appName}&quot;`
      )} because of npm naming restrictions:`
    );
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(1);
  }
  
  // 定义了三个开发依赖的名称
  const dependencies = ['react', 'react-dom', 'react-scripts'].sort();
  // 如果项目使用了这三个名称都会报错，而且退出进程
  if (dependencies.indexOf(appName) >= 0) {
    console.error(
      chalk.red(
        `We cannot create a project called ${chalk.green(
          appName
        )} because a dependency with the same name exists.\n` +
          `Due to the way npm works, the following names are not allowed:\n\n`
      ) +
        chalk.cyan(dependencies.map(depName => `  ${depName}`).join('\n')) +
        chalk.red('\n\nPlease choose a different project name.')
    );
    process.exit(1);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkAppName</span>(<span class="hljs-params">appName</span>) </span>{
  <span class="hljs-comment">// 使用 validateProjectName 检查包名是否合法返回结果，这个validateProjectName是外部依赖的引用，见下面说明</span>
  <span class="hljs-keyword">const</span> validationResult = validateProjectName(appName); 
  <span class="hljs-comment">// 如果对象中有错继续，这里就是外部依赖的具体用法</span>
  <span class="hljs-keyword">if</span> (!validationResult.validForNewPackages) {
    <span class="hljs-built_in">console</span>.error(
      <span class="hljs-string">`Could not create a project called <span class="hljs-subst">${chalk.red(
        <span class="hljs-string">`"<span class="hljs-subst">${appName}</span>"`</span>
      )}</span> because of npm naming restrictions:`</span>
    );
    printValidationResults(validationResult.errors);
    printValidationResults(validationResult.warnings);
    process.exit(<span class="hljs-number">1</span>);
  }
  
  <span class="hljs-comment">// 定义了三个开发依赖的名称</span>
  <span class="hljs-keyword">const</span> dependencies = [<span class="hljs-string">'react'</span>, <span class="hljs-string">'react-dom'</span>, <span class="hljs-string">'react-scripts'</span>].sort();
  <span class="hljs-comment">// 如果项目使用了这三个名称都会报错，而且退出进程</span>
  <span class="hljs-keyword">if</span> (dependencies.indexOf(appName) &gt;= <span class="hljs-number">0</span>) {
    <span class="hljs-built_in">console</span>.error(
      chalk.red(
        <span class="hljs-string">`We cannot create a project called <span class="hljs-subst">${chalk.green(
          appName
        )}</span> because a dependency with the same name exists.\n`</span> +
          <span class="hljs-string">`Due to the way npm works, the following names are not allowed:\n\n`</span>
      ) +
        chalk.cyan(dependencies.map(<span class="hljs-function"><span class="hljs-params">depName</span> =&gt;</span> <span class="hljs-string">`  <span class="hljs-subst">${depName}</span>`</span>).join(<span class="hljs-string">'\n'</span>)) +
        chalk.red(<span class="hljs-string">'\n\nPlease choose a different project name.'</span>)
    );
    process.exit(<span class="hljs-number">1</span>);
  }
}</code></pre>
<p>它这个函数其实还蛮简单的，用了一个外部依赖来校验文件名是否符合<code>npm</code>包文件名的规范，然后定义了三个不能取得名字<code>react</code>、<code>react-dom</code>、<code>react-scripts</code>，外部依赖：</p>
<ul><li>
<code>validate-npm-package-name</code>：外部依赖，检查包名是否合法。<a href="https://www.npmjs.com/package/validate-npm-package-name" rel="nofollow noreferrer" target="_blank">npm地址</a>
</li></ul>
<p>其中的函数依赖：</p>
<ul><li>
<code>printValidationResults()</code>：函数引用，这个函数就是我说的特别简单的类型，里面就是把接收到的错误信息循环打印出来，没什么好说的。</li></ul>
<h4><code>isSafeToCreateProjectIn()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isSafeToCreateProjectIn(root, name) {
  // 定义了一堆文件名
  // 我今天早上仔细的看了一些，以下文件的来历就是我们这些开发者在`create-react-app`中提的一些文件
  const validFiles = [
    '.DS_Store',
    'Thumbs.db',
    '.git',
    '.gitignore',
    '.idea',
    'README.md',
    'LICENSE',
    'web.iml',
    '.hg',
    '.hgignore',
    '.hgcheck',
    '.npmignore',
    'mkdocs.yml',
    'docs',
    '.travis.yml',
    '.gitlab-ci.yml',
    '.gitattributes',
  ];
  console.log();

  // 这里就是在我们创建好的项目文件夹下，除了上述文件以外不包含其他文件就会返回true
  const conflicts = fs
    .readdirSync(root)
    .filter(file => !validFiles.includes(file));
  if (conflicts.length < 1) {
    return true;
  }
  // 否则这个文件夹就是不安全的，并且挨着打印存在哪些不安全的文件
  console.log(
    `The directory ${chalk.green(name)} contains files that could conflict:`
  );
  console.log();
  for (const file of conflicts) {
    console.log(`  ${file}`);
  }
  console.log();
  console.log(
    'Either try using a new directory name, or remove the files listed above.'
  );
  // 并且返回false
  return false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isSafeToCreateProjectIn</span>(<span class="hljs-params">root, name</span>) </span>{
  <span class="hljs-comment">// 定义了一堆文件名</span>
  <span class="hljs-comment">// 我今天早上仔细的看了一些，以下文件的来历就是我们这些开发者在`create-react-app`中提的一些文件</span>
  <span class="hljs-keyword">const</span> validFiles = [
    <span class="hljs-string">'.DS_Store'</span>,
    <span class="hljs-string">'Thumbs.db'</span>,
    <span class="hljs-string">'.git'</span>,
    <span class="hljs-string">'.gitignore'</span>,
    <span class="hljs-string">'.idea'</span>,
    <span class="hljs-string">'README.md'</span>,
    <span class="hljs-string">'LICENSE'</span>,
    <span class="hljs-string">'web.iml'</span>,
    <span class="hljs-string">'.hg'</span>,
    <span class="hljs-string">'.hgignore'</span>,
    <span class="hljs-string">'.hgcheck'</span>,
    <span class="hljs-string">'.npmignore'</span>,
    <span class="hljs-string">'mkdocs.yml'</span>,
    <span class="hljs-string">'docs'</span>,
    <span class="hljs-string">'.travis.yml'</span>,
    <span class="hljs-string">'.gitlab-ci.yml'</span>,
    <span class="hljs-string">'.gitattributes'</span>,
  ];
  <span class="hljs-built_in">console</span>.log();

  <span class="hljs-comment">// 这里就是在我们创建好的项目文件夹下，除了上述文件以外不包含其他文件就会返回true</span>
  <span class="hljs-keyword">const</span> conflicts = fs
    .readdirSync(root)
    .filter(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> !validFiles.includes(file));
  <span class="hljs-keyword">if</span> (conflicts.length &lt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
  <span class="hljs-comment">// 否则这个文件夹就是不安全的，并且挨着打印存在哪些不安全的文件</span>
  <span class="hljs-built_in">console</span>.log(
    <span class="hljs-string">`The directory <span class="hljs-subst">${chalk.green(name)}</span> contains files that could conflict:`</span>
  );
  <span class="hljs-built_in">console</span>.log();
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> file <span class="hljs-keyword">of</span> conflicts) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`  <span class="hljs-subst">${file}</span>`</span>);
  }
  <span class="hljs-built_in">console</span>.log();
  <span class="hljs-built_in">console</span>.log(
    <span class="hljs-string">'Either try using a new directory name, or remove the files listed above.'</span>
  );
  <span class="hljs-comment">// 并且返回false</span>
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}</code></pre>
<p>他这个函数也算比较简单，就是判断创建的这个目录是否包含除了上述<code>validFiles</code>里面的文件，至于这里面的文件是怎么来的，就是<code>create-react-app</code>在发展至今，开发者们提出来的。</p>
<h4><code>shouldUseYarn()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function shouldUseYarn() {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shouldUseYarn</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    execSync(<span class="hljs-string">'yarnpkg --version'</span>, { <span class="hljs-attr">stdio</span>: <span class="hljs-string">'ignore'</span> });
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
}</code></pre>
<p>就三行...其中<code>execSync</code>是由<code>node</code>自身模块<code>child_process</code>引用而来，就是用来执行命令的，这个函数就是执行一下<code>yarnpkg --version</code>来判断我们是否正确安装了<code>yarn</code>，如果没有正确安装<code>yarn</code>的话，<code>useYarn</code>依然为<code>false</code>，不管指没有指定<code>--use-npm</code>。</p>
<ul><li>
<code>execSync</code>：引用自<code>child_process.execSync</code>，用于执行需要执行的子进程</li></ul>
<h4><code>checkThatNpmCanReadCwd()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkThatNpmCanReadCwd() {
  const cwd = process.cwd(); // 这里取到当前的进程目录
  let childOutput = null; // 定义一个变量来保存`npm`的信息
  try {
    // 相当于执行`npm config list`并将其输出的信息组合成为一个字符串
    childOutput = spawn.sync('npm', ['config', 'list']).output.join('');
  } catch (err) {
    return true;
  }
  // 判断是否是一个字符串
  if (typeof childOutput !== 'string') {
    return true;
  }
  // 将整个字符串以换行符分隔
  const lines = childOutput.split('\n');
  // 定义一个我们需要的信息的前缀
  const prefix = '; cwd = ';
  // 去整个lines里面的每个line查找有没有这个前缀的一行
  const line = lines.find(line => line.indexOf(prefix) === 0);
  if (typeof line !== 'string') {
    return true;
  }
  // 取出后面的信息，这个信息大家可以自行试一试，就是`npm`执行的目录
  const npmCWD = line.substring(prefix.length);
  // 判断当前目录和执行目录是否是一致的
  if (npmCWD === cwd) {
    return true;
  }
  // 不一致就打印以下信息，大概意思就是`npm`进程没有在正确的目录下执行
  console.error(
    chalk.red(
      `Could not start an npm process in the right directory.\n\n` +
        `The current directory is: ${chalk.bold(cwd)}\n` +
        `However, a newly started npm process runs in: ${chalk.bold(
          npmCWD
        )}\n\n` +
        `This is probably caused by a misconfigured system terminal shell.`
    )
  );
  // 这里他对windows的情况作了一些单独的判断，没有深究这些信息
  if (process.platform === 'win32') {
    console.error(
      chalk.red(`On Windows, this can usually be fixed by running:\n\n`) +
        `  ${chalk.cyan(
          'reg'
        )} delete &quot;HKCU\\Software\\Microsoft\\Command Processor&quot; /v AutoRun /f\n` +
        `  ${chalk.cyan(
          'reg'
        )} delete &quot;HKLM\\Software\\Microsoft\\Command Processor&quot; /v AutoRun /f\n\n` +
        chalk.red(`Try to run the above two lines in the terminal.\n`) +
        chalk.red(
          `To learn more about this problem, read: https://blogs.msdn.microsoft.com/oldnewthing/20071121-00/?p=24433/`
        )
    );
  }
  return false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkThatNpmCanReadCwd</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> cwd = process.cwd(); <span class="hljs-comment">// 这里取到当前的进程目录</span>
  <span class="hljs-keyword">let</span> childOutput = <span class="hljs-literal">null</span>; <span class="hljs-comment">// 定义一个变量来保存`npm`的信息</span>
  <span class="hljs-keyword">try</span> {
    <span class="hljs-comment">// 相当于执行`npm config list`并将其输出的信息组合成为一个字符串</span>
    childOutput = spawn.sync(<span class="hljs-string">'npm'</span>, [<span class="hljs-string">'config'</span>, <span class="hljs-string">'list'</span>]).output.join(<span class="hljs-string">''</span>);
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
  <span class="hljs-comment">// 判断是否是一个字符串</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> childOutput !== <span class="hljs-string">'string'</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
  <span class="hljs-comment">// 将整个字符串以换行符分隔</span>
  <span class="hljs-keyword">const</span> lines = childOutput.split(<span class="hljs-string">'\n'</span>);
  <span class="hljs-comment">// 定义一个我们需要的信息的前缀</span>
  <span class="hljs-keyword">const</span> prefix = <span class="hljs-string">'; cwd = '</span>;
  <span class="hljs-comment">// 去整个lines里面的每个line查找有没有这个前缀的一行</span>
  <span class="hljs-keyword">const</span> line = lines.find(<span class="hljs-function"><span class="hljs-params">line</span> =&gt;</span> line.indexOf(prefix) === <span class="hljs-number">0</span>);
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> line !== <span class="hljs-string">'string'</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
  <span class="hljs-comment">// 取出后面的信息，这个信息大家可以自行试一试，就是`npm`执行的目录</span>
  <span class="hljs-keyword">const</span> npmCWD = line.substring(prefix.length);
  <span class="hljs-comment">// 判断当前目录和执行目录是否是一致的</span>
  <span class="hljs-keyword">if</span> (npmCWD === cwd) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
  <span class="hljs-comment">// 不一致就打印以下信息，大概意思就是`npm`进程没有在正确的目录下执行</span>
  <span class="hljs-built_in">console</span>.error(
    chalk.red(
      <span class="hljs-string">`Could not start an npm process in the right directory.\n\n`</span> +
        <span class="hljs-string">`The current directory is: <span class="hljs-subst">${chalk.bold(cwd)}</span>\n`</span> +
        <span class="hljs-string">`However, a newly started npm process runs in: <span class="hljs-subst">${chalk.bold(
          npmCWD
        )}</span>\n\n`</span> +
        <span class="hljs-string">`This is probably caused by a misconfigured system terminal shell.`</span>
    )
  );
  <span class="hljs-comment">// 这里他对windows的情况作了一些单独的判断，没有深究这些信息</span>
  <span class="hljs-keyword">if</span> (process.platform === <span class="hljs-string">'win32'</span>) {
    <span class="hljs-built_in">console</span>.error(
      chalk.red(<span class="hljs-string">`On Windows, this can usually be fixed by running:\n\n`</span>) +
        <span class="hljs-string">`  <span class="hljs-subst">${chalk.cyan(
          <span class="hljs-string">'reg'</span>
        )}</span> delete "HKCU\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n`</span> +
        <span class="hljs-string">`  <span class="hljs-subst">${chalk.cyan(
          <span class="hljs-string">'reg'</span>
        )}</span> delete "HKLM\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n\n`</span> +
        chalk.red(<span class="hljs-string">`Try to run the above two lines in the terminal.\n`</span>) +
        chalk.red(
          <span class="hljs-string">`To learn more about this problem, read: https://blogs.msdn.microsoft.com/oldnewthing/20071121-00/?p=24433/`</span>
        )
    );
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}</code></pre>
<p>这个函数我之前居然贴错了，实在是不好意思。我之前没有弄懂这个函数的意思，今天再来看的时候已经豁然开朗了，它的意思上述代码已经解析了，其中用到了一个外部依赖：</p>
<ul><li>
<code>cross-spawn</code>：这个我之前说到了没有？忘了，用来执行<code>node</code>进程。<a href="https://www.npmjs.com/package/cross-spawn" rel="nofollow noreferrer" target="_blank">npm地址</a>
</li></ul>
<p>为什么用单独用一个外部依赖，而不是用<code>node</code>自身的呢？来看一下<code>cross-spawn</code>它自己对自己的说明，<code>Node</code>跨平台解决方案，解决在<code>windows</code>下各种问题。</p>
<h4><code>checkNpmVersion()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkNpmVersion() {
  let hasMinNpm = false;
  let npmVersion = null;
  try {
    npmVersion = execSync('npm --version')
      .toString()
      .trim();
    hasMinNpm = semver.gte(npmVersion, '3.0.0');
  } catch (err) {
    // ignore
  }
  return {
    hasMinNpm: hasMinNpm,
    npmVersion: npmVersion,
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkNpmVersion</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> hasMinNpm = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">let</span> npmVersion = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">try</span> {
    npmVersion = execSync(<span class="hljs-string">'npm --version'</span>)
      .toString()
      .trim();
    hasMinNpm = semver.gte(npmVersion, <span class="hljs-string">'3.0.0'</span>);
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-comment">// ignore</span>
  }
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">hasMinNpm</span>: hasMinNpm,
    <span class="hljs-attr">npmVersion</span>: npmVersion,
  };
}</code></pre>
<p>这个能说的也比较少，一眼看过去就知道什么意思了，返回一个对象，对象上面有两个对对，一个是<code>npm</code>的版本号，一个是是否有最小<code>npm</code>版本的限制，其中一个外部依赖，一个<code>Node</code>自身的API我之前也都说过了，不说了。</p>
<p>看到到这里<code>createApp()</code>函数的依赖和执行都结束了，接着执行了<code>run()</code>函数，我们继续来看<code>run()</code>函数都是什么，我又想吐槽了，算了，忍住！！！</p>
<p><code>run()</code>函数在<code>createApp()</code>函数的所有内容执行完毕后执行，它接收7个参数，先来看看。</p>
<ul>
<li>
<code>root</code>：我们创建的目录的绝对路径</li>
<li>
<code>appName</code>：我们创建的目录名称</li>
<li>
<code>version</code>；<code>react-scripts</code>的版本</li>
<li>
<code>verbose</code>：继续传入<code>verbose</code>，在<code>createApp</code>中没有使用到</li>
<li>
<code>originalDirectory</code>：原始目录，这个之前说到了，到<code>run</code>函数中就有用了</li>
<li>
<code>tempalte</code>：模板，这个参数之前也说过了，不对外使用</li>
<li>
<code>useYarn</code>：是否使用<code>yarn</code>
</li>
</ul>
<p>具体的来看下面<code>run()</code>函数。</p>
<h4><code>run()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function run(
  root,
  appName,
  version,
  verbose,
  originalDirectory,
  template,
  useYarn
) {
  // 这里对`react-scripts`做了大量的处理
  const packageToInstall = getInstallPackage(version, originalDirectory); // 获取依赖包信息
  const allDependencies = ['react', 'react-dom', packageToInstall]; // 所有的开发依赖包

  console.log('Installing packages. This might take a couple of minutes.');
  getPackageName(packageToInstall) // 获取依赖包原始名称并返回
    .then(packageName =>
      // 检查是否离线模式，并返回结果和包名
      checkIfOnline(useYarn).then(isOnline => ({
        isOnline: isOnline,
        packageName: packageName,
      }))
    )
    .then(info => {
      // 接收到上述的包名和是否为离线模式
      const isOnline = info.isOnline;
      const packageName = info.packageName;
      console.log(
        `Installing ${chalk.cyan('react')}, ${chalk.cyan(
          'react-dom'
        )}, and ${chalk.cyan(packageName)}...`
      );
      console.log();
      // 安装依赖
      return install(root, useYarn, allDependencies, verbose, isOnline).then(
        () => packageName
      );
    })
    .then(packageName => {
      // 检查当前`Node`版本是否支持包
      checkNodeVersion(packageName);
      // 检查`package.json`的开发依赖是否正常
      setCaretRangeForRuntimeDeps(packageName);
      // `react-scripts`脚本的目录
      const scriptsPath = path.resolve(
        process.cwd(),
        'node_modules',
        packageName,
        'scripts',
        'init.js'
      );
      // 引入`init`函数
      const init = require(scriptsPath);
      // 执行目录的拷贝
      init(root, appName, verbose, originalDirectory, template);
      // 当`react-scripts`的版本为0.9.x发出警告
      if (version === 'react-scripts@0.9.x') {
        console.log(
          chalk.yellow(
            `\nNote: the project was boostrapped with an old unsupported version of tools.\n` +
              `Please update to Node >=6 and npm >=3 to get supported tools in new projects.\n`
          )
        );
      }
    })
    // 异常处理
    .catch(reason => {
      console.log();
      console.log('Aborting installation.');
      // 根据命令来判断具体的错误
      if (reason.command) {
        console.log(`  ${chalk.cyan(reason.command)} has failed.`);
      } else {
        console.log(chalk.red('Unexpected error. Please report it as a bug:'));
        console.log(reason);
      }
      console.log();

      // 出现异常的时候将删除目录下的这些文件
      const knownGeneratedFiles = [
        'package.json',
        'npm-debug.log',
        'yarn-error.log',
        'yarn-debug.log',
        'node_modules',
      ];
      // 挨着删除
      const currentFiles = fs.readdirSync(path.join(root));
      currentFiles.forEach(file => {
        knownGeneratedFiles.forEach(fileToMatch => {
          if (
            (fileToMatch.match(/.log/g) &amp;&amp; file.indexOf(fileToMatch) === 0) ||
            file === fileToMatch
          ) {
            console.log(`Deleting generated file... ${chalk.cyan(file)}`);
            fs.removeSync(path.join(root, file));
          }
        });
      });
      // 判断当前目录下是否还存在文件
      const remainingFiles = fs.readdirSync(path.join(root));
      if (!remainingFiles.length) {
        console.log(
          `Deleting ${chalk.cyan(`${appName} /`)} from ${chalk.cyan(
            path.resolve(root, '..')
          )}`
        );
        process.chdir(path.resolve(root, '..'));
        fs.removeSync(path.join(root));
      }
      console.log('Done.');
      process.exit(1);
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">
  root,
  appName,
  version,
  verbose,
  originalDirectory,
  template,
  useYarn
</span>) </span>{
  <span class="hljs-comment">// 这里对`react-scripts`做了大量的处理</span>
  <span class="hljs-keyword">const</span> packageToInstall = getInstallPackage(version, originalDirectory); <span class="hljs-comment">// 获取依赖包信息</span>
  <span class="hljs-keyword">const</span> allDependencies = [<span class="hljs-string">'react'</span>, <span class="hljs-string">'react-dom'</span>, packageToInstall]; <span class="hljs-comment">// 所有的开发依赖包</span>

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Installing packages. This might take a couple of minutes.'</span>);
  getPackageName(packageToInstall) <span class="hljs-comment">// 获取依赖包原始名称并返回</span>
    .then(<span class="hljs-function"><span class="hljs-params">packageName</span> =&gt;</span>
      <span class="hljs-comment">// 检查是否离线模式，并返回结果和包名</span>
      checkIfOnline(useYarn).then(<span class="hljs-function"><span class="hljs-params">isOnline</span> =&gt;</span> ({
        <span class="hljs-attr">isOnline</span>: isOnline,
        <span class="hljs-attr">packageName</span>: packageName,
      }))
    )
    .then(<span class="hljs-function"><span class="hljs-params">info</span> =&gt;</span> {
      <span class="hljs-comment">// 接收到上述的包名和是否为离线模式</span>
      <span class="hljs-keyword">const</span> isOnline = info.isOnline;
      <span class="hljs-keyword">const</span> packageName = info.packageName;
      <span class="hljs-built_in">console</span>.log(
        <span class="hljs-string">`Installing <span class="hljs-subst">${chalk.cyan(<span class="hljs-string">'react'</span>)}</span>, <span class="hljs-subst">${chalk.cyan(
          <span class="hljs-string">'react-dom'</span>
        )}</span>, and <span class="hljs-subst">${chalk.cyan(packageName)}</span>...`</span>
      );
      <span class="hljs-built_in">console</span>.log();
      <span class="hljs-comment">// 安装依赖</span>
      <span class="hljs-keyword">return</span> install(root, useYarn, allDependencies, verbose, isOnline).then(
        <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> packageName
      );
    })
    .then(<span class="hljs-function"><span class="hljs-params">packageName</span> =&gt;</span> {
      <span class="hljs-comment">// 检查当前`Node`版本是否支持包</span>
      checkNodeVersion(packageName);
      <span class="hljs-comment">// 检查`package.json`的开发依赖是否正常</span>
      setCaretRangeForRuntimeDeps(packageName);
      <span class="hljs-comment">// `react-scripts`脚本的目录</span>
      <span class="hljs-keyword">const</span> scriptsPath = path.resolve(
        process.cwd(),
        <span class="hljs-string">'node_modules'</span>,
        packageName,
        <span class="hljs-string">'scripts'</span>,
        <span class="hljs-string">'init.js'</span>
      );
      <span class="hljs-comment">// 引入`init`函数</span>
      <span class="hljs-keyword">const</span> init = <span class="hljs-built_in">require</span>(scriptsPath);
      <span class="hljs-comment">// 执行目录的拷贝</span>
      init(root, appName, verbose, originalDirectory, template);
      <span class="hljs-comment">// 当`react-scripts`的版本为0.9.x发出警告</span>
      <span class="hljs-keyword">if</span> (version === <span class="hljs-string">'react-scripts@0.9.x'</span>) {
        <span class="hljs-built_in">console</span>.log(
          chalk.yellow(
            <span class="hljs-string">`\nNote: the project was boostrapped with an old unsupported version of tools.\n`</span> +
              <span class="hljs-string">`Please update to Node &gt;=6 and npm &gt;=3 to get supported tools in new projects.\n`</span>
          )
        );
      }
    })
    <span class="hljs-comment">// 异常处理</span>
    .catch(<span class="hljs-function"><span class="hljs-params">reason</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log();
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Aborting installation.'</span>);
      <span class="hljs-comment">// 根据命令来判断具体的错误</span>
      <span class="hljs-keyword">if</span> (reason.command) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`  <span class="hljs-subst">${chalk.cyan(reason.command)}</span> has failed.`</span>);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(chalk.red(<span class="hljs-string">'Unexpected error. Please report it as a bug:'</span>));
        <span class="hljs-built_in">console</span>.log(reason);
      }
      <span class="hljs-built_in">console</span>.log();

      <span class="hljs-comment">// 出现异常的时候将删除目录下的这些文件</span>
      <span class="hljs-keyword">const</span> knownGeneratedFiles = [
        <span class="hljs-string">'package.json'</span>,
        <span class="hljs-string">'npm-debug.log'</span>,
        <span class="hljs-string">'yarn-error.log'</span>,
        <span class="hljs-string">'yarn-debug.log'</span>,
        <span class="hljs-string">'node_modules'</span>,
      ];
      <span class="hljs-comment">// 挨着删除</span>
      <span class="hljs-keyword">const</span> currentFiles = fs.readdirSync(path.join(root));
      currentFiles.forEach(<span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> {
        knownGeneratedFiles.forEach(<span class="hljs-function"><span class="hljs-params">fileToMatch</span> =&gt;</span> {
          <span class="hljs-keyword">if</span> (
            (fileToMatch.match(<span class="hljs-regexp">/.log/g</span>) &amp;&amp; file.indexOf(fileToMatch) === <span class="hljs-number">0</span>) ||
            file === fileToMatch
          ) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Deleting generated file... <span class="hljs-subst">${chalk.cyan(file)}</span>`</span>);
            fs.removeSync(path.join(root, file));
          }
        });
      });
      <span class="hljs-comment">// 判断当前目录下是否还存在文件</span>
      <span class="hljs-keyword">const</span> remainingFiles = fs.readdirSync(path.join(root));
      <span class="hljs-keyword">if</span> (!remainingFiles.length) {
        <span class="hljs-built_in">console</span>.log(
          <span class="hljs-string">`Deleting <span class="hljs-subst">${chalk.cyan(<span class="hljs-string">`<span class="hljs-subst">${appName}</span> /`</span>)}</span> from <span class="hljs-subst">${chalk.cyan(
            path.resolve(root, <span class="hljs-string">'..'</span>)
          )}</span>`</span>
        );
        process.chdir(path.resolve(root, <span class="hljs-string">'..'</span>));
        fs.removeSync(path.join(root));
      }
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Done.'</span>);
      process.exit(<span class="hljs-number">1</span>);
    });
}</code></pre>
<p>他这里对<code>react-script</code>做了很多处理，大概是由于<code>react-script</code>本身是有<code>node</code>版本的依赖的，而且在用<code>create-react-app init &lt;project&gt;</code>初始化一个项目的时候，是可以指定<code>react-script</code>的版本或者是外部自身定义的东东。</p>
<p>他在<code>run()</code>函数中的引用都是用<code>Promise</code>回调的方式来完成的，从我正式接触<code>Node</code>开始就习惯用<code>async/await</code>，所以对<code>Promise</code>还真不熟，恶补了一番，下面我们来拆解其中的每一句和每一个函数的作用，先来看一下用到外部依赖还是之前那些不说了，来看看函数列表：</p>
<ul>
<li>
<code>getInstallPackage()</code>：获取要安装的<code>react-scripts</code>版本或者开发者自己定义的<code>react-scripts</code>
</li>
<li>
<code>getPackageName()</code>：获取到正式的<code>react-scripts</code>的包名</li>
<li>
<code>checkIfOnline()</code>：检查网络连接是否正常</li>
<li>
<code>install()</code>：安装开发依赖包</li>
<li>
<code>checkNodeVersion()</code>：检查<code>Node</code>版本信息</li>
<li>
<code>setCaretRangeForRuntimeDeps()</code>：检查发开依赖是否正确安装，版本是否正确</li>
<li>
<code>init()</code>：将事先定义好的目录文件拷贝到我的项目中</li>
</ul>
<p>知道了个大概，我们在来逐一分析每个函数的作用：</p>
<h4><code>getInstallPackage()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getInstallPackage(version, originalDirectory) {
  let packageToInstall = 'react-scripts'; // 定义常量 packageToInstall，默认就是标准`react-scripts`包名
  const validSemver = semver.valid(version); // 校验版本号是否合法
  if (validSemver) {
    packageToInstall += `@${validSemver}`; // 合法的话执行，就安装指定版本，在`npm install`安装的时候指定版本为加上`@x.x.x`版本号，安装指定版本的`react-scripts`
  } else if (version &amp;&amp; version.match(/^file:/)) {
    // 不合法并且版本号参数带有`file:`执行以下代码，作用是指定安装包为我们自身定义的包
    packageToInstall = `file:${path.resolve(
      originalDirectory,
      version.match(/^file:(.*)?$/)[1]
    )}`;
  } else if (version) {
    // 不合法并且没有`file:`开头，默认为在线的`tar.gz`文件
    // for tar.gz or alternative paths
    packageToInstall = version;
  }
  // 返回最终需要安装的`react-scripts`的信息，或版本号或本地文件或线上`.tar.gz`资源
  return packageToInstall;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getInstallPackage</span>(<span class="hljs-params">version, originalDirectory</span>) </span>{
  <span class="hljs-keyword">let</span> packageToInstall = <span class="hljs-string">'react-scripts'</span>; <span class="hljs-comment">// 定义常量 packageToInstall，默认就是标准`react-scripts`包名</span>
  <span class="hljs-keyword">const</span> validSemver = semver.valid(version); <span class="hljs-comment">// 校验版本号是否合法</span>
  <span class="hljs-keyword">if</span> (validSemver) {
    packageToInstall += <span class="hljs-string">`@<span class="hljs-subst">${validSemver}</span>`</span>; <span class="hljs-comment">// 合法的话执行，就安装指定版本，在`npm install`安装的时候指定版本为加上`@x.x.x`版本号，安装指定版本的`react-scripts`</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (version &amp;&amp; version.match(<span class="hljs-regexp">/^file:/</span>)) {
    <span class="hljs-comment">// 不合法并且版本号参数带有`file:`执行以下代码，作用是指定安装包为我们自身定义的包</span>
    packageToInstall = <span class="hljs-string">`file:<span class="hljs-subst">${path.resolve(
      originalDirectory,
      version.match(<span class="hljs-regexp">/^file:(.*)?$/</span>)[<span class="hljs-number">1</span>]
    )}</span>`</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (version) {
    <span class="hljs-comment">// 不合法并且没有`file:`开头，默认为在线的`tar.gz`文件</span>
    <span class="hljs-comment">// for tar.gz or alternative paths</span>
    packageToInstall = version;
  }
  <span class="hljs-comment">// 返回最终需要安装的`react-scripts`的信息，或版本号或本地文件或线上`.tar.gz`资源</span>
  <span class="hljs-keyword">return</span> packageToInstall;
}</code></pre>
<p>这个方法接收两个参数<code>version</code>版本号，<code>originalDirectory</code>原始目录，主要的作用是判断<code>react-scripts</code>应该安装的信息，具体看每一行。</p>
<p>这里<code>create-react-app</code>本身提供了安装<code>react-scripts</code>的三种机制，一开始初始化的项目是可以指定<code>react-scripts</code>的版本或者是自定义这个东西的，所以在这里他就提供了这几种机制，其中用到的外部依赖只有一个<code>semver</code>，之前就说过了，不多说。</p>
<h4><code>getPackageName()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getPackageName(installPackage) {
  // 函数进来就根据上面的那个判断`react-scripts`的信息来安装这个包，用于返回正规的包名
  // 此处为线上`tar.gz`包的情况
  if (installPackage.match(/^.+\.(tgz|tar\.gz)$/)) {
    // 里面这段创建了一个临时目录，具体它是怎么设置了线上.tar.gz包我没试就不乱说了
    return getTemporaryDirectory()
      .then(obj => {
        let stream;
        if (/^http/.test(installPackage)) {
          stream = hyperquest(installPackage);
        } else {
          stream = fs.createReadStream(installPackage);
        }
        return extractStream(stream, obj.tmpdir).then(() => obj);
      })
      .then(obj => {
        const packageName = require(path.join(obj.tmpdir, 'package.json')).name;
        obj.cleanup();
        return packageName;
      })
      .catch(err => {
        console.log(
          `Could not extract the package name from the archive: ${err.message}`
        );
        const assumedProjectName = installPackage.match(
          /^.+\/(.+?)(?:-\d+.+)?\.(tgz|tar\.gz)$/
        )[1];
        console.log(
          `Based on the filename, assuming it is &quot;${chalk.cyan(
            assumedProjectName
          )}&quot;`
        );
        return Promise.resolve(assumedProjectName);
      });
  // 此处为信息中包含`git+`信息的情况
  } else if (installPackage.indexOf('git+') === 0) {
    return Promise.resolve(installPackage.match(/([^/]+)\.git(#.*)?$/)[1]);
  // 此处为只有版本信息的时候的情况
  } else if (installPackage.match(/.+@/)) {
    return Promise.resolve(
      installPackage.charAt(0) + installPackage.substr(1).split('@')[0]
    );
  // 此处为信息中包含`file:`开头的情况
  } else if (installPackage.match(/^file:/)) {
    const installPackagePath = installPackage.match(/^file:(.*)?$/)[1];
    const installPackageJson = require(path.join(installPackagePath, 'package.json'));
    return Promise.resolve(installPackageJson.name);
  }
  // 什么都没有直接返回包名
  return Promise.resolve(installPackage);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPackageName</span>(<span class="hljs-params">installPackage</span>) </span>{
  <span class="hljs-comment">// 函数进来就根据上面的那个判断`react-scripts`的信息来安装这个包，用于返回正规的包名</span>
  <span class="hljs-comment">// 此处为线上`tar.gz`包的情况</span>
  <span class="hljs-keyword">if</span> (installPackage.match(<span class="hljs-regexp">/^.+\.(tgz|tar\.gz)$/</span>)) {
    <span class="hljs-comment">// 里面这段创建了一个临时目录，具体它是怎么设置了线上.tar.gz包我没试就不乱说了</span>
    <span class="hljs-keyword">return</span> getTemporaryDirectory()
      .then(<span class="hljs-function"><span class="hljs-params">obj</span> =&gt;</span> {
        <span class="hljs-keyword">let</span> stream;
        <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/^http/</span>.test(installPackage)) {
          stream = hyperquest(installPackage);
        } <span class="hljs-keyword">else</span> {
          stream = fs.createReadStream(installPackage);
        }
        <span class="hljs-keyword">return</span> extractStream(stream, obj.tmpdir).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> obj);
      })
      .then(<span class="hljs-function"><span class="hljs-params">obj</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> packageName = <span class="hljs-built_in">require</span>(path.join(obj.tmpdir, <span class="hljs-string">'package.json'</span>)).name;
        obj.cleanup();
        <span class="hljs-keyword">return</span> packageName;
      })
      .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(
          <span class="hljs-string">`Could not extract the package name from the archive: <span class="hljs-subst">${err.message}</span>`</span>
        );
        <span class="hljs-keyword">const</span> assumedProjectName = installPackage.match(
          <span class="hljs-regexp">/^.+\/(.+?)(?:-\d+.+)?\.(tgz|tar\.gz)$/</span>
        )[<span class="hljs-number">1</span>];
        <span class="hljs-built_in">console</span>.log(
          <span class="hljs-string">`Based on the filename, assuming it is "<span class="hljs-subst">${chalk.cyan(
            assumedProjectName
          )}</span>"`</span>
        );
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(assumedProjectName);
      });
  <span class="hljs-comment">// 此处为信息中包含`git+`信息的情况</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (installPackage.indexOf(<span class="hljs-string">'git+'</span>) === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(installPackage.match(<span class="hljs-regexp">/([^/]+)\.git(#.*)?$/</span>)[<span class="hljs-number">1</span>]);
  <span class="hljs-comment">// 此处为只有版本信息的时候的情况</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (installPackage.match(<span class="hljs-regexp">/.+@/</span>)) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(
      installPackage.charAt(<span class="hljs-number">0</span>) + installPackage.substr(<span class="hljs-number">1</span>).split(<span class="hljs-string">'@'</span>)[<span class="hljs-number">0</span>]
    );
  <span class="hljs-comment">// 此处为信息中包含`file:`开头的情况</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (installPackage.match(<span class="hljs-regexp">/^file:/</span>)) {
    <span class="hljs-keyword">const</span> installPackagePath = installPackage.match(<span class="hljs-regexp">/^file:(.*)?$/</span>)[<span class="hljs-number">1</span>];
    <span class="hljs-keyword">const</span> installPackageJson = <span class="hljs-built_in">require</span>(path.join(installPackagePath, <span class="hljs-string">'package.json'</span>));
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(installPackageJson.name);
  }
  <span class="hljs-comment">// 什么都没有直接返回包名</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(installPackage);
}</code></pre>
<p>他这个函数的目标就是返回一个正常的依赖包名，比如我们什么都不带就返回<code>react-scripts</code>，在比如我们是自己定义的包就返回<code>my-react-scripts</code>，继续到了比较关键的函数了，接收一个<code>installPackage</code>参数,从这函数开始就采用<code>Promise</code>回调的方式一直执行到最后，我们来看看这个函数都做了什么，具体看上面每一行的注释。</p>
<p>总结一句话，这个函数的作用就是返回正常的包名，不带任何符号的，来看看它的外部依赖：</p>
<ul><li>
<code>hyperquest</code>：这个用于将http请求流媒体传输。<a href="https://www.npmjs.com/package/hyperquest" rel="nofollow noreferrer" target="_blank">npm地址</a>
</li></ul>
<p>他本身还有函数依赖，这两个函数依赖我都不单独再说，函数的意思很好理解，至于为什么这么做我还没想明白：</p>
<ul>
<li>
<code>getTemporaryDirectory()</code>：不难，他本身是一个回调函数，用来创建一个临时目录。</li>
<li>
<code>extractStream()</code>：主要用到<code>node</code>本身的一个流，这里我真没懂为什么药改用流的形式，就不发表意见了，在看其实我还是没懂，要真正的明白是要去试一次，但是真的有点麻烦，不想去关注。</li>
</ul>
<blockquote>PS：其实这个函数很好理解就是返回正常的包名，但是里面的有些处理我都没想通，以后理解深刻了在回溯一下。</blockquote>
<h4><code>checkIfOnline()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkIfOnline(useYarn) {
  if (!useYarn) {
    return Promise.resolve(true);
  }

  return new Promise(resolve => {
    dns.lookup('registry.yarnpkg.com', err => {
      let proxy;
      if (err != null &amp;&amp; (proxy = getProxy())) {
        dns.lookup(url.parse(proxy).hostname, proxyErr => {
          resolve(proxyErr == null);
        });
      } else {
        resolve(err == null);
      }
    });
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkIfOnline</span>(<span class="hljs-params">useYarn</span>) </span>{
  <span class="hljs-keyword">if</span> (!useYarn) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-literal">true</span>);
  }

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    dns.lookup(<span class="hljs-string">'registry.yarnpkg.com'</span>, err =&gt; {
      <span class="hljs-keyword">let</span> proxy;
      <span class="hljs-keyword">if</span> (err != <span class="hljs-literal">null</span> &amp;&amp; (proxy = getProxy())) {
        dns.lookup(url.parse(proxy).hostname, proxyErr =&gt; {
          resolve(proxyErr == <span class="hljs-literal">null</span>);
        });
      } <span class="hljs-keyword">else</span> {
        resolve(err == <span class="hljs-literal">null</span>);
      }
    });
  });
}</code></pre>
<p>这个函数本身接收一个是否使用<code>yarn</code>的参数来判断是否进行后续，如果使用的是<code>npm</code>就直接返回<code>true</code>了，为什么会有这个函数是由于<code>yarn</code>本身有个功能叫离线安装，这个函数来判断是否离线安装，其中用到了外部依赖：</p>
<ul><li>
<code>dns</code>：用来检测是否能够请求到指定的地址。<a href="https://www.npmjs.com/package/dns" rel="nofollow noreferrer" target="_blank">npm地址</a>
</li></ul>
<h4><code>install()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function install(root, useYarn, dependencies, verbose, isOnline) {
  // 封装在一个回调函数中
  return new Promise((resolve, reject) => {
    let command; // 定义一个命令
    let args;  // 定义一个命令的参数
    // 如果使用yarn
    if (useYarn) {
      command = 'yarnpkg';  // 命令名称
      args = ['add', '--exact']; // 命令参数的基础
      if (!isOnline) {
        args.push('--offline');  // 此处接上面一个函数判断是否是离线模式
      }
      [].push.apply(args, dependencies); // 组合参数和开发依赖 `react` `react-dom` `react-scripts`
      args.push('--cwd'); // 指定命令执行目录的地址
      args.push(root); // 地址的绝对路径
      // 在使用离线模式时候会发出警告
      if (!isOnline) {
        console.log(chalk.yellow('You appear to be offline.'));
        console.log(chalk.yellow('Falling back to the local Yarn cache.'));
        console.log();
      }
    // 不使用yarn的情况使用npm
    } else {
      // 此处于上述一样，命令的定义 参数的组合
      command = 'npm';
      args = [
        'install',
        '--save',
        '--save-exact',
        '--loglevel',
        'error',
      ].concat(dependencies);
    }
    // 因为`yarn`和`npm`都可以带这个参数，所以就单独拿出来了拼接到上面
    if (verbose) {
      args.push('--verbose');
    }
    // 这里就把命令组合起来执行
    const child = spawn(command, args, { stdio: 'inherit' });
    // 命令执行完毕后关闭
    child.on('close', code => {
      // code 为0代表正常关闭，不为零就打印命令执行错误的那条
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        });
        return;
      }
      // 正常继续往下执行
      resolve();
    });
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">install</span>(<span class="hljs-params">root, useYarn, dependencies, verbose, isOnline</span>) </span>{
  <span class="hljs-comment">// 封装在一个回调函数中</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> command; <span class="hljs-comment">// 定义一个命令</span>
    <span class="hljs-keyword">let</span> args;  <span class="hljs-comment">// 定义一个命令的参数</span>
    <span class="hljs-comment">// 如果使用yarn</span>
    <span class="hljs-keyword">if</span> (useYarn) {
      command = <span class="hljs-string">'yarnpkg'</span>;  <span class="hljs-comment">// 命令名称</span>
      args = [<span class="hljs-string">'add'</span>, <span class="hljs-string">'--exact'</span>]; <span class="hljs-comment">// 命令参数的基础</span>
      <span class="hljs-keyword">if</span> (!isOnline) {
        args.push(<span class="hljs-string">'--offline'</span>);  <span class="hljs-comment">// 此处接上面一个函数判断是否是离线模式</span>
      }
      [].push.apply(args, dependencies); <span class="hljs-comment">// 组合参数和开发依赖 `react` `react-dom` `react-scripts`</span>
      args.push(<span class="hljs-string">'--cwd'</span>); <span class="hljs-comment">// 指定命令执行目录的地址</span>
      args.push(root); <span class="hljs-comment">// 地址的绝对路径</span>
      <span class="hljs-comment">// 在使用离线模式时候会发出警告</span>
      <span class="hljs-keyword">if</span> (!isOnline) {
        <span class="hljs-built_in">console</span>.log(chalk.yellow(<span class="hljs-string">'You appear to be offline.'</span>));
        <span class="hljs-built_in">console</span>.log(chalk.yellow(<span class="hljs-string">'Falling back to the local Yarn cache.'</span>));
        <span class="hljs-built_in">console</span>.log();
      }
    <span class="hljs-comment">// 不使用yarn的情况使用npm</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 此处于上述一样，命令的定义 参数的组合</span>
      command = <span class="hljs-string">'npm'</span>;
      args = [
        <span class="hljs-string">'install'</span>,
        <span class="hljs-string">'--save'</span>,
        <span class="hljs-string">'--save-exact'</span>,
        <span class="hljs-string">'--loglevel'</span>,
        <span class="hljs-string">'error'</span>,
      ].concat(dependencies);
    }
    <span class="hljs-comment">// 因为`yarn`和`npm`都可以带这个参数，所以就单独拿出来了拼接到上面</span>
    <span class="hljs-keyword">if</span> (verbose) {
      args.push(<span class="hljs-string">'--verbose'</span>);
    }
    <span class="hljs-comment">// 这里就把命令组合起来执行</span>
    <span class="hljs-keyword">const</span> child = spawn(command, args, { <span class="hljs-attr">stdio</span>: <span class="hljs-string">'inherit'</span> });
    <span class="hljs-comment">// 命令执行完毕后关闭</span>
    child.on(<span class="hljs-string">'close'</span>, code =&gt; {
      <span class="hljs-comment">// code 为0代表正常关闭，不为零就打印命令执行错误的那条</span>
      <span class="hljs-keyword">if</span> (code !== <span class="hljs-number">0</span>) {
        reject({
          <span class="hljs-attr">command</span>: <span class="hljs-string">`<span class="hljs-subst">${command}</span> <span class="hljs-subst">${args.join(<span class="hljs-string">' '</span>)}</span>`</span>,
        });
        <span class="hljs-keyword">return</span>;
      }
      <span class="hljs-comment">// 正常继续往下执行</span>
      resolve();
    });
  });
}</code></pre>
<p>又到了比较关键的地方了，仔细看每一行代码注释，此处函数的作用就是组合一个<code>yarn</code>或者<code>npm</code>的安装命令，把这些模块安装到项目的文件夹中，其中用到的外部依赖<code>cross-spawn</code>前面有说了，就不说了。</p>
<p>其实执行到这里，<code>create-react-app</code>已经帮我们创建好了目录，<code>package.json</code>并且安装了所有的依赖，<code>react</code>、<code>react-dom</code>和<code>react-scrpts</code>，复杂的部分已经结束，继续往下走。</p>
<h4><code>checkNodeVersion()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkNodeVersion(packageName) {
  // 找到`react-scripts`的`package.json`路径
  const packageJsonPath = path.resolve(
    process.cwd(),
    'node_modules',
    packageName,
    'package.json'
  );
  // 引入`react-scripts`的`package.json`
  const packageJson = require(packageJsonPath);
  // 在`package.json`中定义了一个`engines`其中放着`Node`版本的信息，大家可以打开源码`packages/react-scripts/package.json`查看
  if (!packageJson.engines || !packageJson.engines.node) {
    return;
  }
  // 比较进程的`Node`版本信息和最小支持的版本，如果比他小的话，会报错然后退出进程
  if (!semver.satisfies(process.version, packageJson.engines.node)) {
    console.error(
      chalk.red(
        'You are running Node %s.\n' +
          'Create React App requires Node %s or higher. \n' +
          'Please update your version of Node.'
      ),
      process.version,
      packageJson.engines.node
    );
    process.exit(1);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkNodeVersion</span>(<span class="hljs-params">packageName</span>) </span>{
  <span class="hljs-comment">// 找到`react-scripts`的`package.json`路径</span>
  <span class="hljs-keyword">const</span> packageJsonPath = path.resolve(
    process.cwd(),
    <span class="hljs-string">'node_modules'</span>,
    packageName,
    <span class="hljs-string">'package.json'</span>
  );
  <span class="hljs-comment">// 引入`react-scripts`的`package.json`</span>
  <span class="hljs-keyword">const</span> packageJson = <span class="hljs-built_in">require</span>(packageJsonPath);
  <span class="hljs-comment">// 在`package.json`中定义了一个`engines`其中放着`Node`版本的信息，大家可以打开源码`packages/react-scripts/package.json`查看</span>
  <span class="hljs-keyword">if</span> (!packageJson.engines || !packageJson.engines.node) {
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-comment">// 比较进程的`Node`版本信息和最小支持的版本，如果比他小的话，会报错然后退出进程</span>
  <span class="hljs-keyword">if</span> (!semver.satisfies(process.version, packageJson.engines.node)) {
    <span class="hljs-built_in">console</span>.error(
      chalk.red(
        <span class="hljs-string">'You are running Node %s.\n'</span> +
          <span class="hljs-string">'Create React App requires Node %s or higher. \n'</span> +
          <span class="hljs-string">'Please update your version of Node.'</span>
      ),
      process.version,
      packageJson.engines.node
    );
    process.exit(<span class="hljs-number">1</span>);
  }
}</code></pre>
<p>这个函数直译一下，检查<code>Node</code>版本，为什么要检查了？之前我已经说过了<code>react-scrpts</code>是需要依赖<code>Node</code>版本的，也就是说低版本的<code>Node</code>不支持，其实的外部依赖也是之前的几个，没什么好说的。</p>
<h4><code>setCaretRangeForRuntimeDeps()</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function setCaretRangeForRuntimeDeps(packageName) {
  const packagePath = path.join(process.cwd(), 'package.json');  // 取出创建项目的目录中的`package.json`路径
  const packageJson = require(packagePath); // 引入`package.json`
  // 判断其中`dependencies`是否存在，不存在代表我们的开发依赖没有成功安装
  if (typeof packageJson.dependencies === 'undefined') {
    console.error(chalk.red('Missing dependencies in package.json'));
    process.exit(1);
  }
  // 拿出`react-scripts`或者是自定义的看看`package.json`中是否存在
  const packageVersion = packageJson.dependencies[packageName];
  if (typeof packageVersion === 'undefined') {
    console.error(chalk.red(`Unable to find ${packageName} in package.json`));
    process.exit(1);
  }
  // 检查`react` `react-dom` 的版本 
  makeCaretRange(packageJson.dependencies, 'react');
  makeCaretRange(packageJson.dependencies, 'react-dom');
  // 重新写入文件`package.json`
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setCaretRangeForRuntimeDeps</span>(<span class="hljs-params">packageName</span>) </span>{
  <span class="hljs-keyword">const</span> packagePath = path.join(process.cwd(), <span class="hljs-string">'package.json'</span>);  <span class="hljs-comment">// 取出创建项目的目录中的`package.json`路径</span>
  <span class="hljs-keyword">const</span> packageJson = <span class="hljs-built_in">require</span>(packagePath); <span class="hljs-comment">// 引入`package.json`</span>
  <span class="hljs-comment">// 判断其中`dependencies`是否存在，不存在代表我们的开发依赖没有成功安装</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> packageJson.dependencies === <span class="hljs-string">'undefined'</span>) {
    <span class="hljs-built_in">console</span>.error(chalk.red(<span class="hljs-string">'Missing dependencies in package.json'</span>));
    process.exit(<span class="hljs-number">1</span>);
  }
  <span class="hljs-comment">// 拿出`react-scripts`或者是自定义的看看`package.json`中是否存在</span>
  <span class="hljs-keyword">const</span> packageVersion = packageJson.dependencies[packageName];
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> packageVersion === <span class="hljs-string">'undefined'</span>) {
    <span class="hljs-built_in">console</span>.error(chalk.red(<span class="hljs-string">`Unable to find <span class="hljs-subst">${packageName}</span> in package.json`</span>));
    process.exit(<span class="hljs-number">1</span>);
  }
  <span class="hljs-comment">// 检查`react` `react-dom` 的版本 </span>
  makeCaretRange(packageJson.dependencies, <span class="hljs-string">'react'</span>);
  makeCaretRange(packageJson.dependencies, <span class="hljs-string">'react-dom'</span>);
  <span class="hljs-comment">// 重新写入文件`package.json`</span>
  fs.writeFileSync(packagePath, <span class="hljs-built_in">JSON</span>.stringify(packageJson, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>));
}</code></pre>
<p>这个函数我也不想说太多了，他的作用并没有那么大，就是用来检测我们之前安装的依赖是否写入了<code>package.json</code>里面，并且对依赖的版本做了检测，其中一个函数依赖：</p>
<ul><li>
<code>makeCaretRange()</code>：用来对依赖的版本做检测</li></ul>
<p>我没有单独对其中的子函数进行分析，是因为我觉得不难，而且对主线影响不大，我不想贴太多说不完。</p>
<p>到这里<code>createReactApp.js</code>里面的源码都分析完了，咦！你可能会说你都没说<code>init()</code>函数，哈哈哈，看到这里说明你很认真哦，<code>init()</code>函数是放在<code>packages/react-scripts/script</code>目录下的，但是我还是要给他说了，因为它其实跟<code>react-scripts</code>包联系不大，就是个<code>copy</code>他本身定义好的模板目录结构的函数。</p>
<h4><code>init()</code></h4>
<p>它本身接收<code>5</code>个参数：</p>
<ul>
<li>
<code>appPath</code>：之前的<code>root</code>，项目的绝对路径</li>
<li>
<code>appName</code>：项目的名称</li>
<li>
<code>verbose</code>：这个参数我之前说过了，<code>npm</code>安装时额外的信息</li>
<li>
<code>originalDirectory</code>：原始目录，命令执行的目录</li>
<li>
<code>template</code>：其实其中只有一种类型的模板，这个选项的作用就是配置之前我说过的那个函数，测试模板</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当前的包名，也就是这个命令的包
const ownPackageName = require(path.join(__dirname, '..', 'package.json')).name;
// 当前包的路径
const ownPath = path.join(appPath, 'node_modules', ownPackageName);
// 项目的`package.json`
const appPackage = require(path.join(appPath, 'package.json'));
// 检查项目中是否有`yarn.lock`来判断是否使用`yarn`
const useYarn = fs.existsSync(path.join(appPath, 'yarn.lock'));

appPackage.dependencies = appPackage.dependencies || {};

// 定义其中`scripts`的
appPackage.scripts = {
  start: 'react-scripts start',
  build: 'react-scripts build',
  test: 'react-scripts test --env=jsdom',
  eject: 'react-scripts eject',
};
// 重新写入`package.json`
fs.writeFileSync(
  path.join(appPath, 'package.json'),
  JSON.stringify(appPackage, null, 2)
);

// 判断项目目录是否有`README.md`，模板目录中已经定义了`README.md`防止冲突
const readmeExists = fs.existsSync(path.join(appPath, 'README.md'));
if (readmeExists) {
  fs.renameSync(
    path.join(appPath, 'README.md'),
    path.join(appPath, 'README.old.md')
  );
}
// 是否有模板选项，默认为当前执行命令包目录下的`template`目录，也就是`packages/react-scripts/tempalte`
const templatePath = template
  ? path.resolve(originalDirectory, template)
  : path.join(ownPath, 'template');
if (fs.existsSync(templatePath)) {
  // 拷贝目录到项目目录
  fs.copySync(templatePath, appPath);
} else {
  console.error(
    `Could not locate supplied template: ${chalk.green(templatePath)}`
  );
  return;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 当前的包名，也就是这个命令的包</span>
<span class="hljs-keyword">const</span> ownPackageName = <span class="hljs-built_in">require</span>(path.join(__dirname, <span class="hljs-string">'..'</span>, <span class="hljs-string">'package.json'</span>)).name;
<span class="hljs-comment">// 当前包的路径</span>
<span class="hljs-keyword">const</span> ownPath = path.join(appPath, <span class="hljs-string">'node_modules'</span>, ownPackageName);
<span class="hljs-comment">// 项目的`package.json`</span>
<span class="hljs-keyword">const</span> appPackage = <span class="hljs-built_in">require</span>(path.join(appPath, <span class="hljs-string">'package.json'</span>));
<span class="hljs-comment">// 检查项目中是否有`yarn.lock`来判断是否使用`yarn`</span>
<span class="hljs-keyword">const</span> useYarn = fs.existsSync(path.join(appPath, <span class="hljs-string">'yarn.lock'</span>));

appPackage.dependencies = appPackage.dependencies || {};

<span class="hljs-comment">// 定义其中`scripts`的</span>
appPackage.scripts = {
  <span class="hljs-attr">start</span>: <span class="hljs-string">'react-scripts start'</span>,
  <span class="hljs-attr">build</span>: <span class="hljs-string">'react-scripts build'</span>,
  <span class="hljs-attr">test</span>: <span class="hljs-string">'react-scripts test --env=jsdom'</span>,
  <span class="hljs-attr">eject</span>: <span class="hljs-string">'react-scripts eject'</span>,
};
<span class="hljs-comment">// 重新写入`package.json`</span>
fs.writeFileSync(
  path.join(appPath, <span class="hljs-string">'package.json'</span>),
  <span class="hljs-built_in">JSON</span>.stringify(appPackage, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>)
);

<span class="hljs-comment">// 判断项目目录是否有`README.md`，模板目录中已经定义了`README.md`防止冲突</span>
<span class="hljs-keyword">const</span> readmeExists = fs.existsSync(path.join(appPath, <span class="hljs-string">'README.md'</span>));
<span class="hljs-keyword">if</span> (readmeExists) {
  fs.renameSync(
    path.join(appPath, <span class="hljs-string">'README.md'</span>),
    path.join(appPath, <span class="hljs-string">'README.old.md'</span>)
  );
}
<span class="hljs-comment">// 是否有模板选项，默认为当前执行命令包目录下的`template`目录，也就是`packages/react-scripts/tempalte`</span>
<span class="hljs-keyword">const</span> templatePath = template
  ? path.resolve(originalDirectory, template)
  : path.join(ownPath, <span class="hljs-string">'template'</span>);
<span class="hljs-keyword">if</span> (fs.existsSync(templatePath)) {
  <span class="hljs-comment">// 拷贝目录到项目目录</span>
  fs.copySync(templatePath, appPath);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-built_in">console</span>.error(
    <span class="hljs-string">`Could not locate supplied template: <span class="hljs-subst">${chalk.green(templatePath)}</span>`</span>
  );
  <span class="hljs-keyword">return</span>;
}</code></pre>
<p>这个函数我就不把代码贴全了，里面的东西也蛮好理解，基本上就是对目录结构的修改和重名了那些，挑了一些来说，到这里，<code>create-react-app</code>从零到目录依赖的安装完毕的源码已经分析完毕，但是其实这只是个初始化目录和依赖，其中控制环境的代码都存在<code>react-scripts</code>中，所以其实离我想知道的关键的地方还有点远，但是本篇已经很长了，不打算现在说了，多多包涵。</p>
<p>希望本篇对大家有所帮助吧。</p>
<h2 id="articleHeader14">啰嗦两句</h2>
<p>本来这篇我是打算把<code>create-react-app</code>中所有的源码的拿出来说一说，包括其中的<code>webpack</code>的配置啊，<code>eslint</code>的配置啊，<code>babel</code>的配置啊.....等等，但是实在是有点多，他自己本身把初始化的命令和控制<code>react</code>环境的命令分离成了<code>packages/create-react-app</code>和<code>packages/react-script</code>两边，这个篇幅才把<code>packages/create-react-app</code>说完，更复杂的<code>packages/react-script</code>在说一下这篇幅都不知道有多少了，所以我打算之后空了，在单独写一篇关于<code>packages/react-script</code>的源码分析的文。</p>
<p><strong>码字不易，可能出现错别字什么的，说的不清楚的，说错的，欢迎指正，多多包涵！</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深度解析`create-react-app`源码

## 原文链接
[https://segmentfault.com/a/1190000012952498](https://segmentfault.com/a/1190000012952498)

