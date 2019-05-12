---
title: '2018 年了，你还是只会 npm install 吗' 
date: 2018-12-09 2:30:08
hidden: true
slug: q4bszhf0v8
categories: [reprint]
---

{{< raw >}}

                    
<p>nodejs 社区乃至 Web 前端工程化领域发展到今天，作为 node 自带的包管理工具的 npm 已经成为每个前端开发者必备的工具。但是现实状况是，我们很多人对这个nodejs基础设施的使用和了解还停留在: 会用 <code>npm install</code> 这里（一言不合就删除整个 node_modules 目录然后重新 install 这种事你没做过吗？）</p>
<p>当然 npm 能成为现在世界上最大规模的<strong>包管理系统</strong>，很大程度上确实归功于它足够<strong>用户友好</strong>，你看即使我只会执行 install 也不必太担心出什么大岔子. 但是 npm 的功能远不止于 install 一下那么简单，这篇文章帮你扒一扒那些你可能不知道的 npm 原理、特性、技巧，以及（我认为的）最佳实践。</p>
<p><del>你懒得读的 npm 文档，我帮你翻译然后试验整理过来了 ???</del></p>
<h2 id="articleHeader0">1. npm init</h2>
<p>我们都知道 package.json 文件是用来定义一个 package 的描述文件, 也知道<code>npm init</code> 命令用来初始化一个简单的 package.json 文件，执行该命令后终端会依次询问 name, version, description 等字段。</p>
<h3 id="articleHeader1">1.1 npm init 执行默认行为</h3>
<p><br>而如果想要偷懒步免去一直按 enter，在命令后追加 --yes 参数即可，其作用与一路下一步相同。</p>
<p><code>npm init --yes</code></p>
<h3 id="articleHeader2">1.2 自定义 npm init 行为</h3>
<p>npm init 命令的原理并不复杂，调用脚本，输出一个初始化的 package.json 文件就是了。所以相应地，定制 npm init 命令的实现方式也很简单，在 Home 目录创建一个 <code>.npm-init.js</code> 即可，该文件的 module.exports 即为 package.json 配置内容，需要获取用户输入时候，使用 <code>prompt()</code> 方法即可。</p>
<p>例如编写这样的 ~/.npm-init.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const desc = prompt('description?', 'A new package...')
const bar = prompt('bar?', '')
const count = prompt('count?', '42')

module.exports = {
  key: 'value',
  foo: {
    bar: bar,
    count: count
  },
  name: prompt('name?', process.cwd().split('/').pop()),
  version: prompt('version?', '0.1.0'),
  description: desc,
  main: 'index.js',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> desc = prompt(<span class="hljs-string">'description?'</span>, <span class="hljs-string">'A new package...'</span>)
<span class="hljs-keyword">const</span> bar = prompt(<span class="hljs-string">'bar?'</span>, <span class="hljs-string">''</span>)
<span class="hljs-keyword">const</span> count = prompt(<span class="hljs-string">'count?'</span>, <span class="hljs-string">'42'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">key</span>: <span class="hljs-string">'value'</span>,
  <span class="hljs-attr">foo</span>: {
    <span class="hljs-attr">bar</span>: bar,
    <span class="hljs-attr">count</span>: count
  },
  <span class="hljs-attr">name</span>: prompt(<span class="hljs-string">'name?'</span>, process.cwd().split(<span class="hljs-string">'/'</span>).pop()),
  <span class="hljs-attr">version</span>: prompt(<span class="hljs-string">'version?'</span>, <span class="hljs-string">'0.1.0'</span>),
  <span class="hljs-attr">description</span>: desc,
  <span class="hljs-attr">main</span>: <span class="hljs-string">'index.js'</span>,
}</code></pre>
<p>此时在 ~/hello 目录下执行 <code>npm init</code> 将会得到这样的 package.json:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;key&quot;: &quot;value&quot;,
  &quot;foo&quot;: {
    &quot;bar&quot;: &quot;&quot;,
    &quot;count&quot;: &quot;42&quot;
  },
  &quot;name&quot;: &quot;hello&quot;,
  &quot;version&quot;: &quot;0.1.0&quot;,
  &quot;description&quot;: &quot;A new package...&quot;,
  &quot;main&quot;: &quot;index.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"key"</span>: <span class="hljs-string">"value"</span>,
  <span class="hljs-attr">"foo"</span>: {
    <span class="hljs-attr">"bar"</span>: <span class="hljs-string">""</span>,
    <span class="hljs-attr">"count"</span>: <span class="hljs-string">"42"</span>
  },
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"hello"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.1.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"A new package..."</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>
}</code></pre>
<p>除了生成 package.json, 因为 .npm-init.js 是一个常规的模块，意味着我们可以执行随便什么 node 脚本可以执行的任务。例如通过 fs 创建 README, .eslintrc 等项目必需文件，实现项目脚手架的作用。</p>
<h2 id="articleHeader3">2. 依赖包安装</h2>
<p>依赖管理是 npm 的核心功能，原理就是执行 <code>npm install</code> 从 package.json 中的 dependencies, devDependencies 将依赖包安装到当前目录的 ./node_modules 文件夹中。</p>
<h3 id="articleHeader4">2.1 package定义</h3>
<p>我们都知道要手动安装一个包时，执行 <code>npm install &lt;package&gt;</code> 命令即可。这里的第三个参数 package 通常就是我们所要安装的包名，默认配置下 npm 会从默认的源 (Registry) 中查找该包名对应的包地址，并下载安装。但在 npm 的世界里，除了简单的指定包名, package 还可以是一个指向有效包名的 http url/git url/文件夹路径。</p>
<p>阅读 <a href="https://docs.npmjs.com/getting-started/packages#what-is-a-package-" rel="nofollow noreferrer" target="_blank">npm的文档</a>， 我们会发现package 准确的定义，只要符合以下 a) 到 g) 其中之一条件，就是一个 package:</p>
<table>
<thead><tr>
<th>#</th>
<th>说明</th>
<th>例子</th>
</tr></thead>
<tbody>
<tr>
<td>a)</td>
<td>一个包含了程序和描述该程序的 package.json 文件 的 <strong>文件夹</strong>
</td>
<td>./local-module/</td>
</tr>
<tr>
<td>b)</td>
<td>一个包含了 (a) 的 <strong>gzip 压缩文件</strong>
</td>
<td>./module.tar.gz</td>
</tr>
<tr>
<td>c)</td>
<td>一个可以下载得到 (b) 资源的 <strong>url</strong> (通常是 http(s) url)</td>
<td><a href="https://registry.npmjs.org/webpack/-/webpack-4.1.0.tgz" rel="nofollow noreferrer" target="_blank">https://registry.npmjs.org/we...</a></td>
</tr>
<tr>
<td>d)</td>
<td>一个格式为 <code>&lt;name&gt;@&lt;version&gt;</code> 的字符串，可指向 npm 源(通常是官方源 npmjs.org)上已发布的可访问 url，且该 url 满足条件 (c)</td>
<td>webpack@4.1.0</td>
</tr>
<tr>
<td>e)</td>
<td>一个格式为 <code>&lt;name&gt;@&lt;tag&gt;</code> 的字符串，在 npm 源上该<code>&lt;tag&gt;</code>指向某 <code>&lt;version&gt;</code> 得到 <code>&lt;name&gt;@&lt;version&gt;</code>，后者满足条件 (d)</td>
<td>webpack@latest</td>
</tr>
<tr>
<td>f)</td>
<td>一个格式为 <code>&lt;name&gt;</code> 的字符串，默认添加 <code>latest</code> 标签所得到的 <code>&lt;name&gt;@latest</code> 满足条件 (e)</td>
<td>webpack</td>
</tr>
<tr>
<td>g)</td>
<td>一个 <strong>git url</strong>, 该 url 所指向的代码库满足条件 (a)</td>
<td>git@github.com:webpack/webpack.git</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader5">2.2 安装本地包/远程git仓库包</h3>
<p>上面表格的定义意味着，我们在共享依赖包时，并不是非要将包发表到 npm 源上才可以提供给使用者来安装。这对于私有的不方便 publish 到远程源（即使是私有源），或者需要对某官方源进行改造，但依然需要把包共享出去的场景来说非常实用。</p>
<p><strong>场景1: 本地模块引用</strong></p>
<p>nodejs 应用开发中不可避免有模块间调用，例如在实践中经常会把需要被频繁引用的配置模块放到应用根目录；于是在创建了很多层级的目录、文件后，很可能会遇到这样的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const config = require('../../../../config.js');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../../../config.js'</span>);</code></pre>
<p>除了看上去很丑以外，这样的路径引用也不利于代码的重构。并且身为程序员的自我修养告诉我们，这样重复的代码多了也就意味着是时候把这个模块分离出来供应用内其他模块共享了。例如这个例子里的 config.js 非常适合封装为 package 放到 node_modules 目录下，共享给同应用内其他模块。</p>
<p>无需手动拷贝文件或者创建软链接到 node_modules 目录，npm 有更优雅的解决方案。</p>
<p><strong>方案：</strong></p>
<ol>
<li>
<p>创建 config 包:   <br>新增 config 文件夹; 重命名 config.js 为 config/index.js 文件; 创建 package.json 定义 config 包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;name&quot;: &quot;config&quot;,
    &quot;main&quot;: &quot;index.js&quot;,
    &quot;version&quot;: &quot;0.1.0&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"name"</span>: <span class="hljs-string">"config"</span>,
    <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.1.0"</span>
}</code></pre>
</li>
<li>
<p>在应用层 package.json 文件中新增依赖项，然后执行 <code>npm install</code>; 或直接执行第 3 步</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;dependencies&quot;: {
        &quot;config&quot;: &quot;file:./config&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"dependencies"</span>: {
        <span class="hljs-attr">"config"</span>: <span class="hljs-string">"file:./config"</span>
    }
}</code></pre>
</li>
<li>（等价于第 2 步）直接在应用目录执行 <code>npm install file:./config</code><p>此时，查看 <code>node_modules</code> 目录我们会发现多出来一个名为 <code>config</code>，指向上层 <code>config/</code> 文件夹的软链接。这是因为 npm 识别 <code>file:</code> 协议的url，得知这个包需要直接从文件系统中获取，会自动创建软链接到 node_modules 中，完成“安装”过程。</p>
<p>相比手动软链，我们既不需要关心 windows 和 linux 命令差异，又可以显式地将依赖信息固化到 dependencies 字段中，开发团队其他成员可以执行 <code>npm install</code> 后直接使用。</p>
</li>
</ol>
<p><strong>场景2: 私有 git 共享 package</strong></p>
<p>有些时候，我们一个团队内会有一些代码/公用库需要在团队内<strong>不同项目间</strong>共享，但可能由于包含了敏感内容，或者代码太烂拿不出手等原因，不方便发布到源。</p>
<p>这种情况下，我们可以简单地将被依赖的包托管在私有的 git 仓库中，然后将该  git url 保存到 dependencies 中. npm 会直接调用系统的 git 命令从 git 仓库拉取包的内容到 node_modules 中。</p>
<p><a href="https://docs.npmjs.com/files/package.json#git-urls-as-dependencies" rel="nofollow noreferrer" target="_blank">npm 支持的 git url 格式</a>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">protocol</span>&gt;</span></span>://[<span class="hljs-string">&lt;user&gt;[:&lt;password&gt;</span>]@]<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">hostname</span>&gt;</span></span>[<span class="hljs-string">:&lt;port&gt;</span>][<span class="hljs-symbol">:</span>][<span class="hljs-string">/</span>]<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">path</span>&gt;</span></span>[#<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">commit-ish</span>&gt;</span></span> | #semver:<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">semver</span>&gt;</span></span>]</code></pre>
<p>git 路径后可以使用 # 指定特定的 git branch/commit/tag, 也可以 #semver: 指定特定的 semver range.</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git+ssh://git@github.com:npm/npm.git#v1.0.27
git+ssh://git@github.com:npm/npm#semver:^5.0
git+https://isaacs@github.com/npm/npm.git
git://github.com/npm/npm.git#v1.0.27" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>git+ssh:<span class="hljs-regexp">//gi</span>t@github.com:<span class="hljs-built_in">npm</span>/<span class="hljs-built_in">npm</span>.git<span class="hljs-comment">#v1.0.27</span>
git+ssh:<span class="hljs-regexp">//gi</span>t@github.com:<span class="hljs-built_in">npm</span>/<span class="hljs-built_in">npm</span><span class="hljs-comment">#semver:^5.0</span>
git+https:<span class="hljs-regexp">//i</span>saacs@github.com/<span class="hljs-built_in">npm</span>/<span class="hljs-built_in">npm</span>.git
git:<span class="hljs-regexp">//gi</span>thub.com/<span class="hljs-built_in">npm</span>/<span class="hljs-built_in">npm</span>.git<span class="hljs-comment">#v1.0.27</span></code></pre>
<p><strong>场景3: 开源 package 问题修复</strong></p>
<p>使用某个 npm 包时发现它有某个严重bug，但也许最初作者已不再维护代码了，也许我们工作紧急，没有足够的时间提 issue 给作者再慢慢等作者发布新的修复版本到 npm 源。</p>
<p>此时我们可以手动进入 node_modules 目录下修改相应的包内容，也许修改了一行代码就修复了问题。但是这种做法非常不明智！</p>
<p>首先 node_modules 本身不应该放进版本控制系统，对 node_modules  文件夹中内容的修改不会被记录进 git 提交记录；其次，就算我们非要反模式，把 node_modules 放进版本控制中，你的修改内容也很容易在下次 team 中某位成员执行 <code>npm install</code> 或 <code>npm update</code> 时被覆盖，而这样的一次提交很可能包含了几十几百个包的更新，你自己所做的修改很容易就被淹没在庞大的 diff 文件列表中了。</p>
<p><strong>方案</strong>:</p>
<p>最好的办法应当是 fork 原作者的 git 库，在自己所属的 repo 下修复问题后，将 dependencies 中相应的依赖项更改为自己修复后版本的 git url 即可解决问题。（Fork 代码库后，也便于向原作者提交 PR 修复问题。上游代码库修复问题后，再次更新我们的依赖配置也不迟。）</p>
<h2 id="articleHeader6">3. npm install 如何工作 —— node_modules 目录结构</h2>
<p>npm install 执行完毕后，我们可以在 node_modules 中看到所有依赖的包。虽然使用者无需关注这个目录里的文件夹结构细节，只管在业务代码中引用依赖包即可，但了解 node_modules 的内容可以帮我们更好理解 npm 如何工作，了解从 npm 2 到 npm 5 有哪些变化和改进。</p>
<p>为简单起见，我们假设应用目录为 app, 用两个流行的包 <code>webpack</code>, <code>nconf</code> 作为依赖包做示例说明。并且为了正常安装，使用了“上古” npm 2 时期的版本 <code>webpack@1.15.0</code>, <code>nconf@0.8.5</code>.</p>
<h3 id="articleHeader7">3.1 npm 2</h3>
<p>npm 2 在安装依赖包时，采用简单的递归安装方法。执行 <code>npm install</code> 后，npm 2 依次递归安装 <code>webpack</code> 和 <code>nconf</code> 两个包到 node_modules 中。执行完毕后，我们会看到 ./node_modules 这层目录只含有这两个子目录。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node_modules/
├── nconf/
└── webpack/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>node_modules/
├── nconf/
└── webpack/</code></pre>
<p>进入更深一层 nconf 或 webpack 目录，将看到这两个包各自的 node_modules 中，已经由 npm 递归地安装好自身的依赖包。包括 <code>./node_modules/webpack/node_modules/webpack-core</code> , <code>./node_modules/conf/node_modules/async</code> 等等。而每一个包都有自己的依赖包，每个包自己的依赖都安装在了自己的 node_modules 中。依赖关系层层递进，构成了一整个依赖树，这个依赖树与文件系统中的文件结构树刚好层层对应。</p>
<p>最方便的查看依赖树的方式是直接在 app 目录下执行 <code>npm ls</code> 命令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app@0.1.0
├─┬ nconf@0.8.5
│ ├── async@1.5.2
│ ├── ini@1.3.5
│ ├── secure-keys@1.0.0
│ └── yargs@3.32.0
└─┬ webpack@1.15.0
  ├── acorn@3.3.0
  ├── async@1.5.2
  ├── clone@1.0.3
  ├── ...
  ├── optimist@0.6.1
  ├── supports-color@3.2.3
  ├── tapable@0.1.10
  ├── uglify-js@2.7.5
  ├── watchpack@0.2.9
  └─┬ webpack-core@0.6.9
    ├── source-list-map@0.1.8
    └── source-map@0.4.4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>app@<span class="hljs-number">0.1</span><span class="hljs-number">.0</span>
├─┬ nconf@<span class="hljs-number">0.8</span><span class="hljs-number">.5</span>
│ ├── async@<span class="hljs-number">1.5</span><span class="hljs-number">.2</span>
│ ├── ini@<span class="hljs-number">1.3</span><span class="hljs-number">.5</span>
│ ├── secure-keys@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>
│ └── yargs@<span class="hljs-number">3.32</span><span class="hljs-number">.0</span>
└─┬ webpack@<span class="hljs-number">1.15</span><span class="hljs-number">.0</span>
  ├── acorn@<span class="hljs-number">3.3</span><span class="hljs-number">.0</span>
  ├── async@<span class="hljs-number">1.5</span><span class="hljs-number">.2</span>
  ├── clone@<span class="hljs-number">1.0</span><span class="hljs-number">.3</span>
  ├── ...
  ├── optimist@<span class="hljs-number">0.6</span><span class="hljs-number">.1</span>
  ├── supports-color@<span class="hljs-number">3.2</span><span class="hljs-number">.3</span>
  ├── tapable@<span class="hljs-number">0.1</span><span class="hljs-number">.10</span>
  ├── uglify-js@<span class="hljs-number">2.7</span><span class="hljs-number">.5</span>
  ├── watchpack@<span class="hljs-number">0.2</span><span class="hljs-number">.9</span>
  └─┬ webpack-core@<span class="hljs-number">0.6</span><span class="hljs-number">.9</span>
    ├── source-<span class="hljs-type">list</span>-map@<span class="hljs-number">0.1</span><span class="hljs-number">.8</span>
    └── source-map@<span class="hljs-number">0.4</span><span class="hljs-number">.4</span></code></pre>
<p>这样的目录结构优点在于层级结构明显，便于进行傻瓜式的管理:</p>
<ol>
<li>例如新装一个依赖包，可以立即在第一层 node_modules 中看到子目录</li>
<li>在已知所需包名和版本号时，甚至可以从别的文件夹手动拷贝需要的包到 node_modules 文件夹中，再手动修改 package.json 中的依赖配置</li>
<li>要删除这个包，也可以简单地手动删除这个包的子目录，并删除 package.json 文件中相应的一行即可</li>
</ol>
<p>实际上，很多人在 npm 2 时代也的确都这么实践过，的确也都可以安装和删除成功，并不会导致什么差错。</p>
<p>但这样的文件结构也有很明显的问题：</p>
<ol>
<li>对复杂的工程, node_modules 内目录结构可能会太深，导致深层的文件路径过长而触发 windows 文件系统中，文件路径不能超过 260 个字符长的错误</li>
<li>部分被多个包所依赖的包，很可能在应用 node_modules 目录中的很多地方被重复安装。随着工程规模越来越大，依赖树越来越复杂，这样的包情况会越来越多，造成大量的冗余。</li>
</ol>
<p>——在我们的示例中就有这个问题，<code>webpack</code> 和 <code>nconf</code> 都依赖 <code>async</code> 这个包，所以在文件系统中，webpack 和 nconf 的 node_modules 子目录中都安装了相同的 async 包，并且是相同的版本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+-------------------------------------------+
|                   app/                    |
+----------+------------------------+-------+
           |                        |
           |                        |
+----------v------+       +---------v-------+
|                 |       |                 |
|  webpack@1.15.0 |       |  nconf@0.8.5    |
|                 |       |                 |
+--------+--------+       +--------+--------+
         |                         |
   +-----v-----+             +-----v-----+
   |async@1.5.2|             |async@1.5.2|
   +-----------+             +-----------+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>+-------------------------------------------+
|<span class="hljs-string">                   app/                    </span>|
+----------+------------------------+-------+
           |<span class="hljs-string">                        </span>|
           |<span class="hljs-string">                        </span>|
+----------v------+       +---------v-------+
|<span class="hljs-string">                 </span>|<span class="hljs-string">       </span>|<span class="hljs-string">                 </span>|
|<span class="hljs-string">  webpack@1.15.0 </span>|<span class="hljs-string">       </span>|<span class="hljs-string">  nconf@0.8.5    </span>|
|<span class="hljs-string">                 </span>|<span class="hljs-string">       </span>|<span class="hljs-string">                 </span>|
+--------+--------+       +--------+--------+
         |<span class="hljs-string">                         </span>|
   +-----v-----+             +-----v-----+
   |<span class="hljs-string">async@1.5.2</span>|<span class="hljs-string">             </span>|<span class="hljs-string">async@1.5.2</span>|
   +-----------+             +-----------+</code></pre>
<h3 id="articleHeader8">3.2 npm 3 - 扁平结构</h3>
<p>主要为了解决以上问题，npm 3 的 node_modules 目录改成了更加扁平状的层级结构。文件系统中 <code>webpack</code>, <code>nconf</code>, <code>async</code> 的层级关系变成了平级关系，处于同一级目录中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         +-------------------------------------------+
         |                   app/                    |
         +-+---------------------------------------+-+
           |                                       |
           |                                       |
+----------v------+    +-------------+   +---------v-------+
|                 |    |             |   |                 |
|  webpack@1.15.0 |    | async@1.5.2 |   |  nconf@0.8.5    |
|                 |    |             |   |                 |
+-----------------+    +-------------+   +-----------------+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>         +-------------------------------------------+
         |<span class="hljs-string">                   app/                    </span>|
         +-+---------------------------------------+-+
           |<span class="hljs-string">                                       </span>|
           |<span class="hljs-string">                                       </span>|
+----------v------+    +-------------+   +---------v-------+
|<span class="hljs-string">                 </span>|<span class="hljs-string">    </span>|<span class="hljs-string">             </span>|<span class="hljs-string">   </span>|<span class="hljs-string">                 </span>|
|<span class="hljs-string">  webpack@1.15.0 </span>|<span class="hljs-string">    </span>|<span class="hljs-string"> async@1.5.2 </span>|<span class="hljs-string">   </span>|<span class="hljs-string">  nconf@0.8.5    </span>|
|<span class="hljs-string">                 </span>|<span class="hljs-string">    </span>|<span class="hljs-string">             </span>|<span class="hljs-string">   </span>|<span class="hljs-string">                 </span>|
+-----------------+    +-------------+   +-----------------+</code></pre>
<p>虽然这样一来 webpack/node_modules 和 nconf/node_modules 中都不再有 async 文件夹，但得益于 node 的模块加载机制，他们都可以在上一级 node_modules 目录中找到 async 库。所以 webpack 和 nconf 的库代码中 <code>require('async')</code> 语句的执行都不会有任何问题。</p>
<p>这只是最简单的例子，实际的工程项目中，依赖树不可避免地会有很多层级，很多依赖包，其中会有很多同名但版本不同的包存在于不同的依赖层级，对这些复杂的情况, npm 3 都会在安装时遍历整个依赖树，计算出最合理的文件夹安装方式，使得所有被重复依赖的包都可以去重安装。</p>
<p>npm 文档提供了更直观的例子解释这种情况：</p>
<blockquote>假如 <code>package{dep}</code> 写法代表包和包的依赖，那么  <code>A{B,C}</code>, <code>B{C}</code>, <code>C{D}</code> 的依赖结构在安装之后的 node_modules 是这样的结构：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A
+-- B
+-- C
+-- D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>A
+<span class="hljs-comment">-- B</span>
+<span class="hljs-comment">-- C</span>
+<span class="hljs-comment">-- D</span></code></pre>
<p>这里之所以 D 也安装到了与 B C 同一级目录，是因为 npm 会默认会在无冲突的前提下，尽可能将包安装到较高的层级。</p>
<blockquote>如果是 <code>A{B,C}</code>, <code>B{C,D@1}</code>, <code>C{D@2}</code> 的依赖关系，得到的安装后结构是：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="A
+-- B
+-- C
   `-- D@2
+-- D@1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>A
+<span class="hljs-comment">-- B</span>
+<span class="hljs-comment">-- C</span>
   `<span class="hljs-comment">-- D@2</span>
+<span class="hljs-comment">-- D@1</span></code></pre>
<p>这里是因为，对于 npm 来说同名但不同版本的包是两个独立的包，而同层不能有两个同名子目录，所以其中的 D@2 放到了 C 的子目录而另一个 D@1 被放到了再上一层目录。</p>
<p>很明显在 npm 3 之后 npm 的依赖树结构不再与文件夹层级一一对应了。想要查看 app 的直接依赖项，要通过 <code>npm ls</code> 命令指定 <code>--depth</code> 参数来查看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm ls --depth 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">npm ls <span class="hljs-comment">--depth 1</span></code></pre>
<blockquote>PS: 与本地依赖包不同，如果我们通过 <code>npm install --global</code> 全局安装包到全局目录时，得到的目录依然是“传统的”目录结构。而如果使用 npm 3 想要得到“传统”形式的本地 node_modules 目录，使用 <code>npm install --global-style</code> 命令即可。</blockquote>
<h3 id="articleHeader9">3.3 npm 5 - package-lock 文件</h3>
<p>npm 5 发布于 2017 年也是目前最新的 npm 版本，这一版本依然沿用 npm 3 之后扁平化的依赖包安装方式，此外最大的变化是增加了 <code>package-lock.json</code> 文件。</p>
<p>package-lock.json 的作用是<strong>锁定</strong>依赖安装结构，如果查看这个 json 的结构，会发现与 node_modules 目录的文件层级结构是一一对应的。</p>
<p>以依赖关系为: <code>app{webpack}</code> 的 'app' 项目为例, 其 package-lock 文件包含了这样的片段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;name&quot;:  &quot;app&quot;,
    &quot;version&quot;:  &quot;0.1.0&quot;,
    &quot;lockfileVersion&quot;:  1,
    &quot;requires&quot;:  true,
    &quot;dependencies&quot;: {
        // ... 其他依赖包
        &quot;webpack&quot;: {
            &quot;version&quot;: &quot;1.8.11&quot;,
            &quot;resolved&quot;: &quot;https://registry.npmjs.org/webpack/-/webpack-1.8.11.tgz&quot;,
            &quot;integrity&quot;: &quot;sha1-Yu0hnstBy/qcKuanu6laSYtgkcI=&quot;,
            &quot;requires&quot;: {
                &quot;async&quot;: &quot;0.9.2&quot;,
                &quot;clone&quot;: &quot;0.1.19&quot;,
                &quot;enhanced-resolve&quot;: &quot;0.8.6&quot;,
                &quot;esprima&quot;: &quot;1.2.5&quot;,
                &quot;interpret&quot;: &quot;0.5.2&quot;,
                &quot;memory-fs&quot;: &quot;0.2.0&quot;,
                &quot;mkdirp&quot;: &quot;0.5.1&quot;,
                &quot;node-libs-browser&quot;: &quot;0.4.3&quot;,
                &quot;optimist&quot;: &quot;0.6.1&quot;,
                &quot;supports-color&quot;: &quot;1.3.1&quot;,
                &quot;tapable&quot;: &quot;0.1.10&quot;,
                &quot;uglify-js&quot;: &quot;2.4.24&quot;,
                &quot;watchpack&quot;: &quot;0.2.9&quot;,
                &quot;webpack-core&quot;: &quot;0.6.9&quot;
            }
        },
        &quot;webpack-core&quot;: {
            &quot;version&quot;: &quot;0.6.9&quot;,
            &quot;resolved&quot;: &quot;https://registry.npmjs.org/webpack-core/-/webpack-core-0.6.9.tgz&quot;,
            &quot;integrity&quot;: &quot;sha1-/FcViMhVjad76e+23r3Fo7FyvcI=&quot;,
            &quot;requires&quot;: {
                &quot;source-list-map&quot;: &quot;0.1.8&quot;,
                &quot;source-map&quot;: &quot;0.4.4&quot;
            },
            &quot;dependencies&quot;: {
                &quot;source-map&quot;: {
                    &quot;version&quot;: &quot;0.4.4&quot;,
                    &quot;resolved&quot;: &quot;https://registry.npmjs.org/source-map/-/source-map-0.4.4.tgz&quot;,
                    &quot;integrity&quot;: &quot;sha1-66T12pwNyZneaAMti092FzZSA2s=&quot;,
                    &quot;requires&quot;: {
                        &quot;amdefine&quot;: &quot;1.0.1&quot;
                    }
                }
            }
        },
        //... 其他依赖包
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"name"</span>:  <span class="hljs-string">"app"</span>,
    <span class="hljs-attr">"version"</span>:  <span class="hljs-string">"0.1.0"</span>,
    <span class="hljs-attr">"lockfileVersion"</span>:  <span class="hljs-number">1</span>,
    <span class="hljs-attr">"requires"</span>:  <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"dependencies"</span>: {
        // ... 其他依赖包
        <span class="hljs-attr">"webpack"</span>: {
            <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.8.11"</span>,
            <span class="hljs-attr">"resolved"</span>: <span class="hljs-string">"https://registry.npmjs.org/webpack/-/webpack-1.8.11.tgz"</span>,
            <span class="hljs-attr">"integrity"</span>: <span class="hljs-string">"sha1-Yu0hnstBy/qcKuanu6laSYtgkcI="</span>,
            <span class="hljs-attr">"requires"</span>: {
                <span class="hljs-attr">"async"</span>: <span class="hljs-string">"0.9.2"</span>,
                <span class="hljs-attr">"clone"</span>: <span class="hljs-string">"0.1.19"</span>,
                <span class="hljs-attr">"enhanced-resolve"</span>: <span class="hljs-string">"0.8.6"</span>,
                <span class="hljs-attr">"esprima"</span>: <span class="hljs-string">"1.2.5"</span>,
                <span class="hljs-attr">"interpret"</span>: <span class="hljs-string">"0.5.2"</span>,
                <span class="hljs-attr">"memory-fs"</span>: <span class="hljs-string">"0.2.0"</span>,
                <span class="hljs-attr">"mkdirp"</span>: <span class="hljs-string">"0.5.1"</span>,
                <span class="hljs-attr">"node-libs-browser"</span>: <span class="hljs-string">"0.4.3"</span>,
                <span class="hljs-attr">"optimist"</span>: <span class="hljs-string">"0.6.1"</span>,
                <span class="hljs-attr">"supports-color"</span>: <span class="hljs-string">"1.3.1"</span>,
                <span class="hljs-attr">"tapable"</span>: <span class="hljs-string">"0.1.10"</span>,
                <span class="hljs-attr">"uglify-js"</span>: <span class="hljs-string">"2.4.24"</span>,
                <span class="hljs-attr">"watchpack"</span>: <span class="hljs-string">"0.2.9"</span>,
                <span class="hljs-attr">"webpack-core"</span>: <span class="hljs-string">"0.6.9"</span>
            }
        },
        <span class="hljs-attr">"webpack-core"</span>: {
            <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.6.9"</span>,
            <span class="hljs-attr">"resolved"</span>: <span class="hljs-string">"https://registry.npmjs.org/webpack-core/-/webpack-core-0.6.9.tgz"</span>,
            <span class="hljs-attr">"integrity"</span>: <span class="hljs-string">"sha1-/FcViMhVjad76e+23r3Fo7FyvcI="</span>,
            <span class="hljs-attr">"requires"</span>: {
                <span class="hljs-attr">"source-list-map"</span>: <span class="hljs-string">"0.1.8"</span>,
                <span class="hljs-attr">"source-map"</span>: <span class="hljs-string">"0.4.4"</span>
            },
            <span class="hljs-attr">"dependencies"</span>: {
                <span class="hljs-attr">"source-map"</span>: {
                    <span class="hljs-attr">"version"</span>: <span class="hljs-string">"0.4.4"</span>,
                    <span class="hljs-attr">"resolved"</span>: <span class="hljs-string">"https://registry.npmjs.org/source-map/-/source-map-0.4.4.tgz"</span>,
                    <span class="hljs-attr">"integrity"</span>: <span class="hljs-string">"sha1-66T12pwNyZneaAMti092FzZSA2s="</span>,
                    <span class="hljs-attr">"requires"</span>: {
                        <span class="hljs-attr">"amdefine"</span>: <span class="hljs-string">"1.0.1"</span>
                    }
                }
            }
        },
        //... 其他依赖包
    }
}</code></pre>
<p>看懂 package-lock 文件并不难，其结构是同样类型的几个字段嵌套起来的，主要是 <code>version</code>, <code>resolved</code>, <code>integrity</code>, <code>requires</code>, <code>dependencies</code> 这几个字段而已。</p>
<ul>
<li>
<code>version</code>, <code>resolved</code>, <code>integrity</code> 用来记录包的准确版本号、内容hash、安装源的，决定了要安装的包的准确“身份”信息</li>
<li>假设盖住其他字段，只关注文件中的 <code>dependencies: {}</code> 我们会发现，整个文件的 JSON 配置里的 dependencies 层次结构与文件系统中 node_modules 的文件夹层次结构是完全对照的</li>
<li>只关注 <code>requires: {}</code> 字段又会发现，除最外层的 <code>requires</code> 属性为 true 以外, 其他层的 requires 属性都对应着这个包的 package.json 里记录的自己的依赖项</li>
</ul>
<p>因为这个文件记录了 node_modules 里所有包的结构、层级和版本号甚至安装源，它也就事实上提供了 “保存” node_modules 状态的能力。只要有这样一个 lock 文件，不管在那一台机器上执行 npm install 都会得到完全相同的 node_modules 结果。</p>
<p>这就是 package-lock 文件致力于优化的场景：在从前仅仅用 package.json 记录依赖，由于 semver range 的机制；一个月前由 A 生成的 package.json 文件，B 在一个月后根据它执行 npm install 所得到的 node_modules 结果很可能许多包都存在不同的差异，虽然 semver 机制的限制使得同一份 package.json 不会得到大版本不同的依赖包，但同一份代码在不同环境安装出不同的依赖包，依然是可能导致意外的潜在因素。</p>
<p>相同作用的文件在 npm 5 之前就有，称为 npm shrinkwrap 文件，二者作用完全相同，不同的是后者需要手动生成，而 npm 5 默认会在执行 npm install 后就生成 package-lock 文件，并且建议你提交到 git/svn 代码库中。</p>
<p>package-lock.json 文件在最初 npm 5.0 默认引入时也引起了相当大的<a href="https://github.com/npm/npm/issues/16866" rel="nofollow noreferrer" target="_blank">争议</a>。在 npm 5.0 中，如果已有 package-lock 文件存在，若手动在 package.json 文件新增一条依赖，再执行 npm install, 新增的依赖并不会被安装到 node_modules 中, package-lock.json 也不会做相应的更新。这样的表现与使用者的自然期望表现不符。在 npm 5.1 的首个 <a href="https://github.com/npm/npm/issues/16866" rel="nofollow noreferrer" target="_blank">Release</a> 版本中这个问题得以修复。这个事情告诉我们，要升级，不要使用 5.0。</p>
<p>——但依然有反对的声音认为 package-lock 太复杂，对此 npm 也提供了禁用配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set package-lock false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm config <span class="hljs-keyword">set</span> <span class="hljs-keyword">package</span>-<span class="hljs-keyword">lock</span> <span class="hljs-literal">false</span></code></pre>
<h2 id="articleHeader10">4. 依赖包版本管理</h2>
<p>依赖包安装完并不意味着就万事大吉了，版本的维护和更新也很重要。这一章介绍依赖包升级管理相关知识，太长不看版本请直接跳到 <a href="#4.3">4.3 最佳实践</a></p>
<h3 id="articleHeader11">4.1 semver</h3>
<p>npm 依赖管理的一个重要特性是采用了<a href="https://semver.org/lang/zh-CN/" rel="nofollow noreferrer" target="_blank">语义化版本 (semver)</a> 规范，作为依赖<strong>版本</strong>管理方案。</p>
<p>semver 约定一个包的版本号必须包含3个数字，格式必须为 <code>MAJOR.MINOR.PATCH</code>, 意为 <code>主版本号.小版本号.修订版本号</code>.</p>
<ul>
<li>MAJOR 对应大的版本号迭代，做了不兼容旧版的修改时要更新 MAJOR 版本号</li>
<li>MINOR 对应小版本迭代，发生兼容旧版API的修改或功能更新时，更新MINOR版本号</li>
<li>PATCH 对应修订版本号，一般针对修复 BUG 的版本号</li>
</ul>
<p>对于包作者（发布者），npm 要求在 publish 之前，必须更新版本号。npm 提供了 <code>npm version</code> 工具，执行 <code>npm version major|minor|patch</code> 可以简单地将版本号中相应的数字加1.</p>
<blockquote>如果包是一个 git 仓库，<code>npm version</code> 还会自动创建一条注释为更新后版本号的 git commit 和名为该版本号的 tag</blockquote>
<p>对于包的引用者来说，我们需要在 dependencies 中使用 semver 约定的 semver range 指定所需依赖包的版本号或版本范围。npm 提供了网站 <a href="https://semver.npmjs.com" rel="nofollow noreferrer" target="_blank">https://semver.npmjs.com</a> 可方便地计算所输入的表达式的匹配范围。常用的规则示例如下表：</p>
<table>
<thead><tr>
<th>range</th>
<th>含义</th>
<th>例</th>
</tr></thead>
<tbody>
<tr>
<td><code>^2.2.1</code></td>
<td>指定的 MAJOR 版本号下, 所有更新的版本</td>
<td>匹配 <code>2.2.3</code>, <code>2.3.0</code>; 不匹配 <code>1.0.3</code>, <code>3.0.1</code>
</td>
</tr>
<tr>
<td><code>~2.2.1</code></td>
<td>指定 MAJOR.MINOR 版本号下，所有更新的版本</td>
<td>匹配 <code>2.2.3</code>, <code>2.2.9</code> ; 不匹配 <code>2.3.0</code>, <code>2.4.5</code>
</td>
</tr>
<tr>
<td><code>&gt;=2.1</code></td>
<td>版本号大于或等于 <code>2.1.0</code>
</td>
<td>匹配 <code>2.1.2</code>, <code>3.1</code>
</td>
</tr>
<tr>
<td><code>&lt;=2.2</code></td>
<td>版本号小于或等于 <code>2.2</code>
</td>
<td>匹配 <code>1.0.0</code>, <code>2.2.1</code>, <code>2.2.11</code>
</td>
</tr>
<tr>
<td><code>1.0.0 - 2.0.0</code></td>
<td>版本号从 1.0.0 (含) 到 2.0.0 (含)</td>
<td>匹配 <code>1.0.0</code>, <code>1.3.4</code>, <code>2.0.0</code>
</td>
</tr>
</tbody>
</table>
<p>任意两条规则，通过 <code>||</code> 连接起来，则表示两条规则的并集:</p>
<p>如 <code>^2 &gt;=2.3.1 || ^3 &gt;3.2</code> 可以匹配:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* `2.3.1`, `2,8.1`, `3.3.1`
* 但不匹配 `1.0.0`, `2.2.0`, `3.1.0`, `4.0.0`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>* `2.<span class="hljs-number">3.1</span>`, `2,<span class="hljs-number">8.1</span>`, `3.<span class="hljs-number">3.1</span>`
* 但不匹配 `1.<span class="hljs-number">0.0</span>`, `2.<span class="hljs-number">2.0</span>`, `3.<span class="hljs-number">1.0</span>`, `4.<span class="hljs-number">0.0</span>`
</code></pre>
<p>PS: 除了这几种，还有如下更直观的表示版本号范围的写法:</p>
<ul>
<li>
<code>*</code> 或 <code>x</code> 匹配所有主版本</li>
<li>
<code>1</code> 或 <code>1.x</code> 匹配 主版本号为 1 的所有版本</li>
<li>
<code>1.2</code> 或 <code>1.2.x</code> 匹配 版本号为 1.2 开头的所有版本</li>
</ul>
<p>PPS: 在常规仅包含数字的版本号之外，semver 还允许在 <code>MAJOR.MINOR.PATCH</code> 后追加 <code>-</code> 后跟点号分隔的标签，作为预发布版本标签 - <a href="https://github.com/npm/node-semver#prerelease-tags" rel="nofollow noreferrer" target="_blank">Prerelese Tags</a>，通常被视为不稳定、不建议生产使用的版本。例如：</p>
<ul>
<li><code>1.0.0-alpha</code></li>
<li><code>1.0.0-beta.1</code></li>
<li><code>1.0.0-rc.3</code></li>
</ul>
<p>上表中我们最常见的是 <code>^1.8.11</code> 这种格式的 range, 因为我们在使用 <code>npm install &lt;package name&gt;</code> 安装包时，npm 默认安装当前最新版本，例如 <code>1.8.11</code>, 然后在所安装的版本号前加<code>^</code>号, 将 <code>^1.8.11</code> 写入 package.json 依赖配置，意味着可以匹配 1.8.11 以上，2.0.0 以下的所有版本。</p>
<h3 id="articleHeader12">4.2 依赖版本升级</h3>
<p>问题来了，在安装完一个依赖包之后有新版本发布了，如何使用 npm 进行版本升级呢？——答案是简单的 <code>npm install</code> 或 <code>npm update</code>，但在不同的 npm 版本，不同的 package.json, package-lock.json 文件，安装/升级的表现也不同。</p>
<p>我们不妨还以 webpack 举例，做如下的<strong>前提假设</strong>:</p>
<ul>
<li>我们的工程项目 <code>app</code> 依赖 webpack</li>
<li>项目最初初始化时，安装了当时最新的包 webpack@1.8.0，并且 package.json 中的依赖配置为: <code>"webpack": "^1.8.0"</code>
</li>
<li>当前（2018年3月） webpack 最新版本为 <code>4.2.0</code>, webpack 1.x 最新子版本为 <code>1.15.0</code>
</li>
</ul>
<p>如果我们使用的是 npm 3, 并且项目不含 package-lock.json, 那么根据 node_modules 是否为空，执行 install/update 的结果如下 (<strong>node 6.13.1, npm 3.10.10</strong> 环境下试验):</p>
<table>
<thead><tr>
<th>#</th>
<th>package.json (BEFORE)</th>
<th>node_modules (BEFORE)</th>
<th>command (npm 3)</th>
<th>package.json (AFTER)</th>
<th>node_modules (AFTER)</th>
</tr></thead>
<tbody>
<tr>
<td>a)</td>
<td><code>webpack: ^1.8.0</code></td>
<td>webpack@1.8.0</td>
<td><code>install</code></td>
<td><code>webpack: ^1.8.0</code></td>
<td>webpack@1.8.0</td>
</tr>
<tr>
<td>b)</td>
<td><code>webpack: ^1.8.0</code></td>
<td>空</td>
<td><code>install</code></td>
<td><code>webpack: ^1.8.0</code></td>
<td>webpack@1.15.0</td>
</tr>
<tr>
<td>c)</td>
<td><code>webpack: ^1.8.0</code></td>
<td>webpack@1.8.0</td>
<td><code>update</code></td>
<td><code>webpack: ^1.8.0</code></td>
<td>webpack@1.15.0</td>
</tr>
<tr>
<td>d)</td>
<td><code>webpack: ^1.8.0</code></td>
<td>空</td>
<td><code>update</code></td>
<td><code>webpack: ^1.8.0</code></td>
<td>webpack@1.15.0</td>
</tr>
</tbody>
</table>
<p>根据这个表我们可以对 npm 3 得出以下结论：</p>
<ul>
<li>如果本地 node_modules 已安装，再次执行 install 不会更新包版本, 执行 update 才会更新; 而如果本地 node_modules 为空时，执行 install/update 都会直接安装更新包;</li>
<li>npm update 总是会把包更新到符合 package.json 中指定的 semver 的<strong>最新</strong>版本号——本例中符合 <code>^1.8.0</code> 的最新版本为 <code>1.15.0</code>
</li>
<li>一旦给定 package.json, 无论后面执行 npm install 还是 update, package.json 中的 webpack 版本一直顽固地保持 一开始的 <code>^1.8.0</code> 岿然不动</li>
</ul>
<p>这里不合理的地方在于，如果最开始团队中第一个人安装了 <code>webpack@1.8.0</code>, 而新加入项目的成员, checkout 工程代码后执行 <code>npm install</code> 会安装得到不太一样的 <code>1.15.0</code> 版本。虽然 semver 约定了小版本号应当保持向下兼容（相同大版本号下的小版本号）兼容，但万一有不熟悉不遵循此约定的包发布者，发布了不兼容的包，此时就可能出现因依赖环境不同导致的 bug。</p>
<p>下面由 npm 5 带着 package-lock.json 闪亮登场，执行 install/update 的效果是这样的 (<strong>node 9.8.0, npm 5.7.1</strong> 环境下试验):</p>
<blockquote>下表为表述简单，省略了包名 webpack, install 简写 i, update 简写为 up</blockquote>
<table>
<thead><tr>
<th>#</th>
<th>package.json (BEFORE)</th>
<th>node_modules (BEFORE)</th>
<th>package-lock (BEFORE)</th>
<th>command</th>
<th>package.json (AFTER)</th>
<th>node_modules (AFTER)</th>
</tr></thead>
<tbody>
<tr>
<td>a)</td>
<td><code>^1.8.0</code></td>
<td>@1.8.0</td>
<td>@1.8.0</td>
<td><code>i</code></td>
<td><code>^1.8.0</code></td>
<td>@1.8.0</td>
</tr>
<tr>
<td>b)</td>
<td><code>^1.8.0</code></td>
<td>空</td>
<td>@1.8.0</td>
<td><code>i</code></td>
<td><code>^1.8.0</code></td>
<td>@1.8.0</td>
</tr>
<tr>
<td>c)</td>
<td><code>^1.8.0</code></td>
<td>@1.8.0</td>
<td>@1.8.0</td>
<td><strong><code>up</code></strong></td>
<td><strong><code>^1.15.0</code></strong></td>
<td><strong>@1.15.0</strong></td>
</tr>
<tr>
<td>d)</td>
<td><code>^1.8.0</code></td>
<td>空</td>
<td>@1.8.0</td>
<td><code>up</code></td>
<td><code>^1.8.0</code></td>
<td>@1.15.0</td>
</tr>
<tr>
<td>e)</td>
<td><code>^1.15.0</code></td>
<td>@1.8.0 (旧)</td>
<td>@1.15.0</td>
<td><strong><code>i</code></strong></td>
<td><strong><code>^1.15.0</code></strong></td>
<td><strong>@1.15.0</strong></td>
</tr>
<tr>
<td>f)</td>
<td><code>^1.15.0</code></td>
<td>@1.8.0 (旧)</td>
<td>@1.15.0</td>
<td><strong><code>up</code></strong></td>
<td><strong><code>^1.15.0</code></strong></td>
<td><strong>@1.15.0</strong></td>
</tr>
</tbody>
</table>
<p>与 npm 3 相比，在安装和更新依赖版本上主要的区别为：</p>
<ul>
<li>无论何时执行 install, npm 都会优先按照 package-lock 中指定的版本来安装 webpack; 避免了 npm 3 表中情形 b) 的状况;</li>
<li>无论何时完成安装/更新, package-lock 文件总会跟着 node_modules 更新 —— (因此可以视 package-lock 文件为 node_modules 的 JSON 表述)</li>
<li>已安装 node_modules 后若执行 npm update，package.json 中的版本号也会随之更改为 <code>^1.15.0</code>
</li>
</ul>
<p>由此可见 npm 5.1 使得 package.json 和 package-lock.json 中所保存的版本号更加统一，解决了 npm 之前的各种问题。只要遵循好的实践习惯，团队成员可以很方便地维护一套应用代码和 node_modules 依赖都一致的环境。</p>
<p>皆大欢喜。</p>
<h3 id="articleHeader13">4.3 最佳实践</h3>
<p>总结起来，在 2018 年 (node 9.8.0, npm 5.7.1) 时代，我认为的依赖版本管理应当是:</p>
<ul>
<li>使用 npm: <code>&gt;=5.1</code> 版本, 保持 <code>package-lock.json</code> 文件默认开启配置</li>
<li>初始化：第一作者初始化项目时使用 <code>npm install &lt;package&gt;</code> 安装依赖包, 默认保存 <code>^X.Y.Z</code> 依赖 range 到 package.json中; 提交 <code>package.json</code>, <code>package-lock.json</code>, <strong>不要提交</strong> <code>node_modules</code> 目录</li>
<li>初始化：项目成员<strong>首次</strong> checkout/clone 项目代码后，执行<strong>一次</strong> <code>npm install</code> 安装依赖包</li>
<li>
<strong>不要</strong>手动修改 package-lock.json</li>
<li>
<p>升级依赖包:</p>
<ul>
<li>升级小版本: 本地执行 <code>npm update</code> 升级到新的小版本</li>
<li>升级大版本: 本地执行 <code>npm install &lt;package-name&gt;@&lt;version&gt;</code> 升级到新的大版本</li>
<li>也可手动修改 package.json 中版本号为要<strong>升级</strong>的版本(大于现有版本号)并指定所需的 semver, 然后执行 <code>npm install</code>
</li>
<li>本地验证升级后新版本无问题后，<strong>提交</strong>新的 <code>package.json</code>, <code>package-lock.json</code> 文件</li>
</ul>
</li>
<li>
<p>降级依赖包:</p>
<ul>
<li>
<strong>正确</strong>: <code>npm install &lt;package-name&gt;@&lt;old-version&gt;</code> 验证无问题后，<strong>提交</strong> package.json 和 package-lock.json 文件</li>
<li>
<strong>错误</strong>: 手动修改 <code>package.json</code> 中的版本号为更低版本的 semver, 这样修改并不会生效，因为再次执行 <code>npm install</code> 依然会安装 <code>package-lock.json</code> 中的锁定版本</li>
</ul>
</li>
<li>
<p>删除依赖包:</p>
<ul>
<li>Plan A: <code>npm uninstall &lt;package&gt;</code> 并提交 <code>package.json</code> 和 <code>package-lock.json</code>
</li>
<li>Plan B: 把要卸载的包从 package.json 中 dependencies 字段删除, 然后执行 <code>npm install</code> 并提交 <code>package.json</code> 和 <code>package-lock.json</code>
</li>
</ul>
</li>
<li>任何时候有人提交了 package.json, package-lock.json 更新后，团队其他成员应在 svn update/git pull 拉取更新后执行 <code>npm install</code> 脚本安装更新后的依赖包</li>
</ul>
<p><del>恭喜你终于可以跟 <strong><code>rm -rf node_modules</code> &amp;&amp; <code>npm install</code></strong> 这波操作说拜拜了（其实并不会）</del></p>
<h2 id="articleHeader14">5. npm scripts</h2>
<h3 id="articleHeader15">5.1 基本使用</h3>
<p>npm scripts 是 npm 另一个很重要的特性。通过在 package.json 中 scripts 字段定义一个脚本，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;scripts&quot;: {
        &quot;echo&quot;: &quot;echo HELLO WORLD&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"scripts"</span>: {
        <span class="hljs-attr">"echo"</span>: <span class="hljs-string">"echo HELLO WORLD"</span>
    }
}</code></pre>
<p>我们就可以通过 <code>npm run echo</code> 命令来执行这段脚本，像在 shell 中执行该命令 <code>echo HELLO WORLD</code> 一样，看到终端输出 <code>HELLO WORLD</code>.</p>
<p>—— npm scripts 的基本使用就是这么简单，它提供了一个简单的接口用来调用工程相关的脚本。关于更详细的相关信息，可以参考阮一峰老师的文章 <a href="http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html" rel="nofollow noreferrer" target="_blank">npm script 使用指南 (2016年10月)</a>.</p>
<p>简要总结阮老师文章内容：</p>
<ol>
<li>
<code>npm run</code> 命令执行时，会把 <code>./node_modules/.bin/</code> 目录添加到执行环境的 <code>PATH</code> 变量中，因此如果某个<strong>命令行包</strong>未全局安装，而只安装在了当前项目的 node_modules 中，通过 <code>npm run</code> 一样可以调用该命令。</li>
<li>执行 npm 脚本时要传入参数，需要在命令后加 <code>--</code> 标明, 如 <code>npm run test -- --grep="pattern"</code> 可以将 <code>--grep="pattern"</code> 参数传给 <code>test</code> 命令</li>
<li>npm 提供了 pre 和 post 两种钩子机制，可以定义某个脚本前后的执行脚本</li>
<li>
<p>运行时变量：在 <code>npm run</code> 的脚本执行环境内，可以通过环境变量的方式获取许多运行时相关信息，以下都可以通过 <code>process.env</code> 对象访问获得：</p>
<ul>
<li>
<code>npm_lifecycle_event</code> - 正在运行的脚本名称</li>
<li>
<code>npm_package_&lt;key&gt;</code> - 获取当前包 package.json 中某个字段的配置值：如 <code>npm_package_name</code> 获取包名</li>
<li>
<code>npm_package_&lt;key&gt;_&lt;sub-key&gt;</code> - package.json 中嵌套字段属性：如 <code>npm_pacakge_dependencies_webpack</code> 可以获取到 package.json 中的 <code>dependencies.webpack</code> 字段的值，即 webpack 的版本号</li>
</ul>
</li>
</ol>
<h3 id="articleHeader16">5.2 node_modules/.bin 目录</h3>
<p>上面所说的 <code>node_modules/.bin</code> 目录，保存了依赖目录中所安装的可供调用的命令行包。</p>
<p>何谓命令行包？例如 <code>webpack</code> 就属于一个命令行包。如果我们在安装 webpack 时添加 <code>--global</code> 参数，就可以在终端直接输入 <code>webpack</code> 进行调用。但如果不加 <code>--global</code> 参数，我们会在 <code>node_modules/.bin</code> 目录里看到名为 webpack 的文件，如果在终端直接输入 <code>./node_modules/.bin/webpack</code> 命令，一样可以执行。</p>
<p>这是因为 <code>webpack</code> 在 <code>package.json</code> 文件中定义了 <code>bin</code> 字段为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;bin&quot;: {
        &quot;webpack&quot;: &quot;./bin/webpack.js&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"bin"</span>: {
        <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"./bin/webpack.js"</span>
    }
}</code></pre>
<p>bin 字段的配置格式为: <code>&lt;command&gt;: &lt;file&gt;</code>, 即 <code>命令名: 可执行文件</code>. npm 执行 install 时，会分析每个依赖包的 package.json 中的 <code>bin</code> 字段，并将其包含的条目安装到 <code>./node_modules/.bin</code> 目录中，文件名为 <code>&lt;command&gt;</code>。而如果是全局模式安装，则会在 npm 全局安装路径的 bin 目录下创建指向 <code>&lt;file&gt;</code> 名为 <code>&lt;command&gt;</code> 的软链。因此，<code>./node_modules/.bin/webpack</code> 文件在通过命令行调用时，实际上就是在执行 <code>node ./node_modules/.bin/webpack.js</code> 命令。</p>
<p>正如上一节所说，<code>npm run</code> 命令在执行时会把 <code>./node_modules/.bin</code> 加入到 <code>PATH</code> 中，使我们可直接调用所有提供了命令行调用接口的依赖包。所以这里就引出了一个最佳实践：</p>
<blockquote>将项目依赖的命令行工具安装到项目依赖文件夹中，然后通过 npm scripts 调用；而非全局安装</blockquote>
<p>举例而言 <code>webpack</code> 作为前端工程标配的构建工具，虽然我们都习惯了全局安装并直接使用命令行调用，但不同的项目依赖的 webpack 版本可能不同，相应的 <code>webpack.config.js</code> 配置文件也可能只兼容了特定版本的 webpack. 如果我们仅全局安装了最新的 webpack 4.x 并使用 webpack 命令调用，在一个依赖 webpack 3.x 的工程中就会无法成功执行构建。</p>
<p>但如果这类工具总是本地安装，我们要调用一个命令，要手动添加 <code>./node_modules/.bin</code> 这个长长的前缀，未免也太麻烦了，我们 nodejs 开发者都很懒的。于是 npm 从5.2 开始自带了一个新的工具 <code>npx</code>.</p>
<h3 id="articleHeader17">5.3 npx</h3>
<p>npx 的使用很简单，就是执行 <code>npx &lt;command&gt;</code> 即可，这里的 <code>&lt;command&gt;</code> 默认就是 <code>./node_modules</code> 目录中安装的可执行脚本名。例如上面本地安装好的 webpack 包，我们可以直接使用 <code>npx webpack</code> 执行即可。</p>
<p>除了这种最简单的场景, npm cli 团队开发者 Kat Marchán 还在这篇文章中介绍了其他几种 npx 的神奇用法:  <a href="https://bit.ly/2uzuIHv" rel="nofollow noreferrer" target="_blank">Introducing npx: an npm package runner</a>, 国内有位开发者 robin.law 将原文翻译为中文 <a href="https://robin-front.github.io/2017/07/14/introducing-npx-an-npm-package-runner/" rel="nofollow noreferrer" target="_blank">npx是什么，为什么需要npx?</a>.</p>
<p>有兴趣的可以戳链接了解，懒得点链接的，看总结：</p>
<h4>场景a) 一键执行远程 npm 源的二进制包</h4>
<p>除了在 package 中执行 ./node_modules/.bin 中已安装的命令, 还可以直接指定未安装的二进制包名执行。例如我们在一个没有 package.json 也没有 node_modules 的目录下，执行:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npx cowsay hello" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">npx cowsay hello</span></code></pre>
<p>npx 将会从 npm 源下载 <code>cowsay</code> 这个包（但并不安装）并执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" _______ 
< hello >
 ------- 
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tex"><code> _______ 
&lt; hello &gt;
 ------- 
        <span class="hljs-tag">\<span class="hljs-name"> </span></span>  ^__^
         <span class="hljs-tag">\<span class="hljs-name"> </span></span> (oo)<span class="hljs-tag">\<span class="hljs-name">_</span></span>______
            (__)<span class="hljs-tag">\<span class="hljs-name"> </span></span>      )<span class="hljs-tag">\<span class="hljs-name">/</span></span><span class="hljs-tag">\<span class="hljs-name">
</span></span>                ||----w |
                ||     ||</code></pre>
<p>这种用途非常适合 1. 在本地简单测试或调试 npm 源上这些二进制包的功能；2. 调用 create-react-app 或 yeoman 这类往往每个项目只需要使用一次的脚手架工具</p>
<p>PS: 此处有彩蛋，执行这条命令试试:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npx workin-hard" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">npx workin-hard</span></code></pre>
<h4>场景b) 一键执行 GitHub Gist</h4>
<p>还记得前面提到的 <a href="#2.1">2.1 package定义</a> 么，<code>npm install &lt;package&gt;</code> 可以是包含了有效 package.json 的 git url.</p>
<p>刚好 GitHub Gist 也是 git 仓库 的一种，集合 npx 就可以方便地将简单的脚本共享给其他人，拥有该链接的人无需将脚本安装到本地工作目录即可执行。将 package.json 和 需执行的二进制脚本上传至 gist, 在运行 <code>npx &lt;gist url&gt;</code> 就可以方便地执行该 gist 定义的命令。</p>
<p>原文作者 Kat Marchán 提供了<a href="https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32" rel="nofollow noreferrer" target="_blank">这个</a><button class="btn btn-xs btn-default ml10 preview" data-url="zkat/4bc19503fe9e9309e2bfaa2c58074d32" data-typeid="1">点击预览</button>示例 gist, 执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">npx https:<span class="hljs-regexp">//gi</span>st.github.com<span class="hljs-regexp">/zkat/</span><span class="hljs-number">4</span>bc19503fe9e9309e2bfaa2c58074d32</code></pre>
<p>可得到一个来自 GitHubGist 的 hello world 问候。</p>
<h4>场景c) 使用不同版本 node 执行命令</h4>
<p>将 npx 与 Aria Stewart 创建的 <code>node</code> 包 (<a href="https://www.npmjs.com/package/node)" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a> 结合，可以实现在一行命令中使用指定版本的 node 执行命令。</p>
<p>例如先后执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npx node@4 -e &quot;console.log(process.version)&quot;
npx node@6 -e &quot;console.log(process.version)&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>npx <span class="hljs-keyword">node</span><span class="hljs-title">@4</span> -e <span class="hljs-string">"console.log(process.version)"</span>
npx <span class="hljs-keyword">node</span><span class="hljs-title">@6</span> -e <span class="hljs-string">"console.log(process.version)"</span></code></pre>
<p>将分别输出 <code>v4.8.7</code> 和 <code>v6.13.0</code>.</p>
<p>往常这种工作是由 <code>nvm</code> 这类 node 版本管理工具来做的，但 <code>npx node@4</code> 这种方式免去 nvm 手动切换配置的步骤，更加简洁简单。</p>
<h2 id="articleHeader18">6. npm 配置</h2>
<h3 id="articleHeader19">6.1 npm config</h3>
<p>npm cli 提供了 <code>npm config</code> 命令进行 npm 相关配置，通过 <code>npm config ls -l</code> 可查看 npm 的所有配置，包括默认配置。npm 文档页为每个配置项提供了详细的说明 <a href="https://docs.npmjs.com/misc/config" rel="nofollow noreferrer" target="_blank">https://docs.npmjs.com/misc/c...</a> .</p>
<p>修改配置的命令为 <code>npm config set &lt;key&gt; &lt;value&gt;</code>, 我们使用相关的常见重要配置:</p>
<ul>
<li>
<code>proxy</code>, <code>https-proxy</code>: 指定 npm 使用的代理</li>
<li>
<code>registry</code> 指定 npm 下载安装包时的源，默认为 <code>https://registry.npmjs.org/</code> 可以指定为私有 Registry 源</li>
<li>
<code>package-lock</code> 指定是否默认生成 package-lock 文件，建议保持默认 true</li>
<li>
<code>save</code> true/false 指定是否在 npm install 后保存包为 dependencies, npm 5 起默认为 true</li>
</ul>
<p>删除指定的配置项命令为 <code>npm config delete &lt;key&gt;</code>.</p>
<h3 id="articleHeader20">6.2 npmrc 文件</h3>
<p>除了使用 CLI 的 <code>npm config</code> 命令显示更改 npm 配置，还可以通过 npmrc 文件直接修改配置。</p>
<p>这样的 npmrc 文件优先级由高到低包括：</p>
<ul>
<li>工程内配置文件: <code>/path/to/my/project/.npmrc</code>
</li>
<li>用户级配置文件: <code>~/.npmrc</code>
</li>
<li>全局配置文件: <code>$PREFIX/etc/npmrc</code> (即<code>npm config get globalconfig</code> 输出的路径)</li>
<li>npm内置配置文件: <code>/path/to/npm/npmrc</code>
</li>
</ul>
<p>通过这个机制，我们可以方便地在工程跟目录创建一个 <code>.npmrc</code> 文件来共享需要在团队间共享的 npm 运行相关配置。比如如果我们在公司内网环境下需通过代理才可访问 registry.npmjs.org 源，或需访问内网的 registry, 就可以在工作项目下新增 .npmrc 文件并提交代码库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxy = http://proxy.example.com/
https-proxy = http://proxy.example.com/
registry = http://registry.example.com/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>proxy = <span class="hljs-string">http:</span><span class="hljs-comment">//proxy.example.com/</span>
https-proxy = <span class="hljs-string">http:</span><span class="hljs-comment">//proxy.example.com/</span>
registry = <span class="hljs-string">http:</span><span class="hljs-comment">//registry.example.com/</span></code></pre>
<p>因为项目级 .npmrc 文件的作用域只在本项目下，所以在非本目录下，这些配置并不生效。对于使用笔记本工作的开发者，可以很好地隔离公司的工作项目、在家学习研究项目两种不同的环境。</p>
<p>将这个功能与 <code>~/.npm-init.js</code> 配置相结合，可以将特定配置的 .npmrc 跟 .gitignore, README 之类文件一起做到 npm init 脚手架中，进一步减少手动配置。</p>
<h3 id="articleHeader21">6.3 node 版本约束</h3>
<p>虽然一个项目的团队都共享了相同的代码，但每个人的开发机器可能安装了不同的 node 版本，此外服务器端的也可能与本地开发机不一致。</p>
<p>这又是一个可能带来不一致性的因素 —— 但也不是很难解决，声明式约束+脚本限制即可。</p>
<p><strong>声明</strong>：通过 <code>package.json</code> 的 <code>engines</code> 属性声明应用运行所需的版本运行时要求。例如我们的项目中使用了 <code>async</code>, <code>await</code> 特性，<a href="https://node.green" rel="nofollow noreferrer" target="_blank">查阅兼容性表格</a>得知最低支持版本为 7.6.0，因此指定 engines 配置为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;engines&quot;: { &quot;node&quot;: &quot;>=7.6.0&quot;}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"engines"</span>: { <span class="hljs-attr">"node"</span>: <span class="hljs-string">"&gt;=7.6.0"</span>}
}</code></pre>
<p><strong>强约束</strong>(可选)：在 npm 中以上字段内容仅作为建议字段使用，若要在私有项目中添加强约束，需要自己写脚本钩子，读取并解析 engines 字段的 semver range 并与运行时环境做对比校验并适当提醒。</p>
<h2 id="articleHeader22">7. 小结 npm 最佳实践</h2>
<ul>
<li>使用 npm-init 初始化新项目</li>
<li>统一项目配置: 需团队共享的 npm config 配置项，固化到 .npmrc 文件中</li>
<li>统一运行环境，统一 package.json，统一 package-lock 文件</li>
<li>合理使用多样化的源安装依赖包: <code>npm install &lt;git url&gt;|&lt;local file&gt;</code>
</li>
<li>使用 npm: &gt;=5.2 版本</li>
<li>使用 npm scripts 与 npx (npm: &gt;=5.2) 脚本管理应用相关脚本</li>
</ul>
<h2 id="articleHeader23">8. 更多资料</h2>
<p><strong>参考</strong></p>
<ul>
<li>
<p>npm team 成员 Ashley Williams 在 2016 年 Node.js Live 上的 talk: <em>You Don't Know npm</em>, 当时还没有 npm 5</p>
<ul>
<li>YouTube 视频链接: <a href="https://www.youtube.com/watch?v=hopWbVKmiVQ&amp;t=537s" rel="nofollow noreferrer" target="_blank">Node.js Live (Paris) - Ashley Williams, You Don't Know npm</a>
</li>
<li>演讲用的 slides: <a href="http://ashleygwilliams.github.io/you-dont-know-npm" rel="nofollow noreferrer" target="_blank">the ag_deck</a>
</li>
</ul>
</li>
<li>这篇 2015 年的文章介绍了如何使用把本地模块打包到 node_modules 依赖中: <a href="https://bit.ly/2DLnaCd" rel="nofollow noreferrer" target="_blank">Build modular application with npm local modules</a>
</li>
<li>一篇很好的介绍 package-lock.json 的文章: <a href="https://bit.ly/2Fiok9Z" rel="nofollow noreferrer" target="_blank">Everything you wanted to know about package-lock.json</a>
</li>
<li>阮一峰 <a href="http://ruanyifeng.com/blog/2016/10/npm_scripts.html" rel="nofollow noreferrer" target="_blank">npm scripts 使用指南</a>
</li>
<li>
<p>Kat Marchán 介绍npx:</p>
<ul>
<li>原文 <a href="http://t.cn/RKIYHBA" rel="nofollow noreferrer" target="_blank">Introducing npx: an npm package runner</a>
</li>
<li>中文 <a href="https://robin-front.github.io/2017/07/14/introducing-npx-an-npm-package-runner/" rel="nofollow noreferrer" target="_blank">npx是什么，为什么需要npx?</a>
</li>
</ul>
</li>
</ul>
<p><strong>文档</strong></p>
<ul>
<li>
<p>npm 官方文档, 无中文翻译</p>
<ul>
<li><a href="https://docs.npmjs.com/files/package.json" rel="nofollow noreferrer" target="_blank">package.json 文件</a></li>
<li><a href="https://docs.npmjs.com/misc/config" rel="nofollow noreferrer" target="_blank">npm config 配置</a></li>
<li><a href="https://semver.npmjs.com" rel="nofollow noreferrer" target="_blank">npm semver 计算器</a></li>
<li><a href="https://docs.npmjs.com/cli/install" rel="nofollow noreferrer" target="_blank">node_modules 目录扁平化</a></li>
</ul>
</li>
<li>
<p>yarn 中文文档，虽然是 npm 竞争者但兼容 package.json 和 node_modules 目录，因此这两部分一样可参考：</p>
<ul>
<li><a href="https://yarnpkg.com/zh-Hans/docs/package-json" rel="nofollow noreferrer" target="_blank">package.json - 中文</a></li>
<li><a href="https://yarnpkg.com/zh-Hans/docs/dependencies" rel="nofollow noreferrer" target="_blank">依赖与版本 - 中文</a></li>
</ul>
</li>
</ul>
<p><strong>延伸阅读</strong></p>
<ul><li>sam boyer 《所以你想开发一个包管理系统》，从无关特定语言的角度，介绍一个包管理系统的方面: <a href="https://bit.ly/2G36U1e" rel="nofollow noreferrer" target="_blank">So you want to write a package manager</a>
</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
2018 年了，你还是只会 npm install 吗

## 原文链接
[https://segmentfault.com/a/1190000013962514](https://segmentfault.com/a/1190000013962514)

