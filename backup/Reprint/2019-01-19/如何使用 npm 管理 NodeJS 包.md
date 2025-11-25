---
title: '如何使用 npm 管理 NodeJS 包' 
date: 2019-01-19 2:30:10
hidden: true
slug: urfwk9xy2f8
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何使用-npm-管理-nodejs-包"></a>如何使用 npm 管理 NodeJS 包</h1>
<p>前一段时间，我们发布了一个<a href="https://docs.npmjs.com/getting-started/">使用 pip 管理 Python 包</a>的指南。今天，我们将讨论如何使用 npm 管理 NodeJS 包。npm 是最大的软件注册中心，包含 600,000 多个包。每天，世界各地的开发人员通过 npm 共享和下载软件包。在本指南中，我将解释使用 npm 基础知识，例如安装包（本地和全局）、安装特定版本的包、更新、删除和管理 NodeJS 包等等。</p>
<h3><a href="#安装-npm"></a>安装 npm</h3>
<p>用于 npm 是用 NodeJS 编写的，我们需要安装 NodeJS 才能使用 npm。要在不同的 Linux 发行版上安装 NodeJS，请参考下面的链接。</p>
<ul>
<li><a href="https://www.ostechnix.com/install-node-js-linux/">在 Linux 上安装 NodeJS</a></li>
</ul>
<p>检查 node 安装的位置：</p>
<pre><code class="hljs crmsh">$ which <span class="hljs-keyword">node</span>
<span class="hljs-title">/home</span>/sk/.nvm/versions/<span class="hljs-keyword">node</span><span class="hljs-title">/v9</span>.<span class="hljs-number">4.0</span>/bin/<span class="hljs-keyword">node</span>

<span class="hljs-title"></span></code></pre><p>检查它的版本：</p>
<pre><code class="hljs crmsh">$ <span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>
v9.<span class="hljs-number">4.0</span>

</code></pre><p>进入 Node 交互式解释器：</p>
<pre><code class="hljs stylus">$ node
&gt; <span class="hljs-selector-class">.help</span>
<span class="hljs-selector-class">.break</span> Sometimes you get stuck, this gets you out
<span class="hljs-selector-class">.clear</span> Alias <span class="hljs-keyword">for</span> <span class="hljs-selector-class">.break</span>
<span class="hljs-selector-class">.editor</span> Enter editor mode
<span class="hljs-selector-class">.exit</span> Exit the repl
<span class="hljs-selector-class">.help</span> Print this help message
<span class="hljs-selector-class">.load</span> Load JS from <span class="hljs-selector-tag">a</span> file into the REPL session
<span class="hljs-selector-class">.save</span> Save all evaluated commands <span class="hljs-keyword">in</span> this REPL session to <span class="hljs-selector-tag">a</span> file
&gt; <span class="hljs-selector-class">.exit</span>

</code></pre><p>检查 npm 安装的位置：</p>
<pre><code class="hljs awk">$ which npm
<span class="hljs-regexp">/home/</span>sk<span class="hljs-regexp">/.nvm/</span>versions<span class="hljs-regexp">/node/</span>v9.<span class="hljs-number">4.0</span><span class="hljs-regexp">/bin/</span>npm

</code></pre><p>还有版本：</p>
<pre><code class="hljs lsl">$ npm -v
<span class="hljs-number">5.6</span><span class="hljs-number">.0</span>

</code></pre><p>棒极了！Node 和 npm 已安装好！正如你可能已经注意到，我已经在我的 <code>$HOME</code> 目录中安装了 NodeJS 和 NPM，这样是为了避免在全局模块时出现权限问题。这是 NodeJS 团队推荐的方法。</p>
<p>那么，让我们继续看看如何使用 npm 管理 NodeJS 模块（或包）。</p>
<h3><a href="#安装-nodejs-模块"></a>安装 NodeJS 模块</h3>
<p>NodeJS 模块可以安装在本地或全局（系统范围）。现在我将演示如何在本地安装包（LCTT 译注：即将包安装到一个 NodeJS 项目当中，所以下面会先创建一个空项目做演示）。</p>
<h4><a href="#在本地安装包"></a>在本地安装包</h4>
<p>为了在本地管理包，我们通常使用 <code>package.json</code> 文件来管理。</p>
<p>首先，让我们创建我们的项目目录。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> mkdir demo</span>
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> demo</span>

</code></pre><p>在项目目录中创建一个 <code>package.json</code> 文件。为此，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm init</span>

</code></pre><p>输入你的包的详细信息，例如名称、版本、作者、GitHub 页面等等，或者按下回车键接受默认值并键入 <code>yes</code> 确认。</p>
<pre><code class="hljs vim">This utility will walk you through creating <span class="hljs-keyword">a</span> package.json <span class="hljs-keyword">file</span>.
It <span class="hljs-keyword">only</span> covers the most common <span class="hljs-built_in">items</span>, <span class="hljs-built_in">and</span> tries <span class="hljs-keyword">to</span> guess sensible defaults.

See `npm <span class="hljs-keyword">help</span> json` <span class="hljs-keyword">for</span> definitive documentation <span class="hljs-keyword">on</span> these fields
<span class="hljs-built_in">and</span> exactly what they <span class="hljs-keyword">do</span>.

Use `npm install <span class="hljs-symbol">&lt;pkg&gt;</span>` afterwards <span class="hljs-keyword">to</span> install <span class="hljs-keyword">a</span> package <span class="hljs-built_in">and</span>
save it <span class="hljs-keyword">as</span> <span class="hljs-keyword">a</span> dependency in the package.json <span class="hljs-keyword">file</span>.

Press ^C at any time <span class="hljs-keyword">to</span> <span class="hljs-keyword">quit</span>.
package name: (demo)
<span class="hljs-keyword">version</span>: (<span class="hljs-number">1.0</span>.<span class="hljs-number">0</span>)
description: demo nodejs app
entry poin<span class="hljs-variable">t:</span> (<span class="hljs-built_in">index</span>.js)
test <span class="hljs-keyword">command</span>:
git repository:
keyword<span class="hljs-variable">s:</span>
author:
license: (ISC)
About <span class="hljs-keyword">to</span> <span class="hljs-keyword">write</span> <span class="hljs-keyword">to</span> /home/sk/demo/package.json:

{
 <span class="hljs-string">"name"</span>: <span class="hljs-string">"demo"</span>,
 <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
 <span class="hljs-string">"description"</span>: <span class="hljs-string">"demo nodejs app"</span>,
 <span class="hljs-string">"main"</span>: <span class="hljs-string">"index.js"</span>,
 <span class="hljs-string">"scripts"</span>: {
 <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>
 },
 <span class="hljs-string">"author"</span>: <span class="hljs-string">""</span>,
 <span class="hljs-string">"license"</span>: <span class="hljs-string">"ISC"</span>
}

Is this ok? (yes) yes

</code></pre><p>上面的命令初始化你的项目并创建了 <code>package.json</code> 文件。</p>
<p>你也可以使用命令以非交互式方式执行此操作：</p>
<pre><code class="hljs ada">npm init <span class="hljs-comment">--y</span>

</code></pre><p>现在让我们安装名为 <a href="https://www.npmjs.com/package/commander">commander</a> 的包。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm install commander</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs kotlin">npm notice created a lockfile <span class="hljs-keyword">as</span> <span class="hljs-keyword">package</span>-lock.json. You should commit <span class="hljs-keyword">this</span> file.
npm WARN <span class="hljs-symbol">demo@</span><span class="hljs-number">1.0</span><span class="hljs-number">.0</span> No repository field.

+ <span class="hljs-symbol">commander@</span><span class="hljs-number">2.13</span><span class="hljs-number">.0</span>
added <span class="hljs-number">1</span> <span class="hljs-keyword">package</span> <span class="hljs-keyword">in</span> <span class="hljs-number">2.519</span>s

</code></pre><p>这将在项目的根目录中创建一个名为 <code>node_modules</code> 的目录（如果它不存在的话），并在其中下载包。</p>
<p>让我们检查 <code>pachage.json</code> 文件。</p>
<pre><code class="hljs stata">$ <span class="hljs-keyword">cat</span> package.json 
{
 <span class="hljs-string">"name"</span>: <span class="hljs-string">"demo"</span>,
 <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
 <span class="hljs-string">"description"</span>: <span class="hljs-string">"demo nodejs app"</span>,
 <span class="hljs-string">"main"</span>: <span class="hljs-string">"index.js"</span>,
 <span class="hljs-string">"scripts"</span>: {
 <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">" &amp;&amp; exit 1"</span>
 },
 <span class="hljs-string">"author"</span>: <span class="hljs-string">""</span>,
 <span class="hljs-string">"license"</span>: <span class="hljs-string">"ISC"</span>,
 <span class="hljs-string">"dependencies"</span>: {
 <span class="hljs-string">"commander"</span>: <span class="hljs-string">"^2.13.0"</span>
 }
}

</code></pre><p>你会看到添加了依赖文件，版本号前面的插入符号 ( <code>^</code> ) 表示在安装时，npm 将取出它可以找到的最高版本的包。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ls node_modules/</span>
commander

</code></pre><p><code>package.json</code> 文件的优点是，如果你的项目目录中有 <code>package.json</code> 文件，只需键入 <code>npm install</code>，那么 <code>npm</code> 将查看文件中列出的依赖关系并下载它们。你甚至可以与其他开发人员共享它或将其推送到你的 GitHub 仓库。因此，当他们键入 <code>npm install</code> 时，他们将获得你拥有的所有相同的包。</p>
<p>你也可能会注意到另一个名为 <code>package-lock.json</code> 的文件，该文件确保在项目安装的所有系统上都保持相同的依赖关系。</p>
<p>要在你的程序中使用已安装的包，使用实际代码在项目目录中创建一个 <code>index.js</code>（或者其他任何名称）文件，然后使用以下命令运行它：</p>
<pre><code class="hljs crmsh">$ <span class="hljs-keyword">node</span> <span class="hljs-title">index</span>.js

</code></pre><h4><a href="#在全局安装包"></a>在全局安装包</h4>
<p>如果你想使用一个包作为命令行工具，那么最好在全局安装它。这样，无论你的当前目录是哪个目录，它都能正常工作。</p>
<pre><code class="hljs lsl">$ npm install async -g
+ async@<span class="hljs-number">2.6</span><span class="hljs-number">.0</span>
added <span class="hljs-number">2</span> packages in <span class="hljs-number">4.695</span>s

</code></pre><p>或者</p>
<pre><code class="hljs coffeescript">$ <span class="hljs-built_in">npm</span> install async --<span class="hljs-built_in">global</span>

</code></pre><p>要安装特定版本的包，我们可以：</p>
<pre><code class="hljs autoit">$ npm install async<span class="hljs-symbol">@2</span><span class="hljs-number">.6</span><span class="hljs-number">.0</span> --<span class="hljs-keyword">global</span>

</code></pre><h3><a href="#更新-nodejs-模块"></a>更新 NodeJS 模块</h3>
<p>要更新本地包，转到 <code>package.json</code> 所在的项目目录并运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm update</span>

</code></pre><p>然后，运行以下命令确保所有包都更新了。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm outdated</span>

</code></pre><p>如果没有需要更新的，那么它返回空。</p>
<p>要找出哪一个全局包需要更新，运行：</p>
<pre><code class="hljs routeros">$ npm outdated -g <span class="hljs-attribute">--depth</span>=0

</code></pre><p>如果没有输出，意味着所有包都已更新。</p>
<p>更新单个全局包，运行：</p>
<pre><code class="hljs sql">$ npm <span class="hljs-keyword">update</span> -g &lt;<span class="hljs-keyword">package</span>-<span class="hljs-keyword">name</span>&gt;

</code></pre><p>更新所有的全局包，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm update -g</span>

</code></pre><h3><a href="#列出-nodejs-模块"></a>列出 NodeJS 模块</h3>
<p>列出本地包，转到项目目录并运行：</p>
<pre><code class="hljs lsl">$ npm <span class="hljs-type">list</span>
demo@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span> /home/sk/demo
└── commander@<span class="hljs-number">2.13</span><span class="hljs-number">.0</span>

</code></pre><p>如你所见，我在本地安装了 <code>commander</code> 这个包。</p>
<p>要列出全局包，从任何位置都可以运行以下命令：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm list -g</span>

</code></pre><p>示例输出：</p>
<pre><code class="hljs lsl">/home/sk/.nvm/versions/node/v9<span class="hljs-number">.4</span><span class="hljs-number">.0</span>/lib
├─┬ async@<span class="hljs-number">2.6</span><span class="hljs-number">.0</span>
│ └── lodash@<span class="hljs-number">4.17</span><span class="hljs-number">.4</span>
└─┬ npm@<span class="hljs-number">5.6</span><span class="hljs-number">.0</span>
 ├── abbrev@<span class="hljs-number">1.1</span><span class="hljs-number">.1</span>
 ├── ansi-regex@<span class="hljs-number">3.0</span><span class="hljs-number">.0</span>
 ├── ansicolors@<span class="hljs-number">0.3</span><span class="hljs-number">.2</span>
 ├── ansistyles@<span class="hljs-number">0.1</span><span class="hljs-number">.3</span>
 ├── aproba@<span class="hljs-number">1.2</span><span class="hljs-number">.0</span>
 ├── archy@<span class="hljs-number">1.0</span><span class="hljs-number">.0</span>
[...]

</code></pre><p>该命令将列出所有模块及其依赖关系。</p>
<p>要仅仅列出顶级模块，使用 <code>-depth=0</code> 选项：</p>
<pre><code class="hljs crystal">$ npm list -g --depth=<span class="hljs-number">0</span>
/home/sk/.nvm/versions/node/v9.<span class="hljs-number">4.0</span>/<span class="hljs-class"><span class="hljs-keyword">lib</span></span>
├── async@<span class="hljs-number">2.6</span>.<span class="hljs-number">0</span>
└── npm@<span class="hljs-number">5.6</span>.<span class="hljs-number">0</span>

</code></pre><h4><a href="#寻找-nodejs-模块"></a>寻找 NodeJS 模块</h4>
<p>要搜索一个模块，使用 <code>npm search</code> 命令：</p>
<pre><code class="hljs excel">npm <span class="hljs-built_in">search</span> &lt;<span class="hljs-built_in">search</span>-string&gt;

</code></pre><p>例如：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm search request</span>

</code></pre><p>该命令将显示包含搜索字符串 <code>request</code> 的所有模块。</p>
<h5><a href="#移除-nodejs-模块"></a>移除 NodeJS 模块</h5>
<p>要删除本地包，转到项目目录并运行以下命令，这会从 <code>node_modules</code> 目录中删除包：</p>
<pre><code class="hljs sql">$ npm <span class="hljs-keyword">uninstall</span> &lt;<span class="hljs-keyword">package</span>-<span class="hljs-keyword">name</span>&gt;

</code></pre><p>要从 <code>package.json</code> 文件中的依赖关系中删除它，使用如下所示的 <code>save</code> 选项：</p>
<pre><code class="hljs fortran">$ npm uninstall --<span class="hljs-keyword">save</span> &lt;package-<span class="hljs-keyword">name</span>&gt;

</code></pre><p>要删除已安装的全局包，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm uninstall -g &lt;package&gt;</span>

</code></pre><h3><a href="#清除-npm-缓存"></a>清除 npm 缓存</h3>
<p>默认情况下，npm 在安装包时，会将其副本保存在 <code>$HOME</code> 目录中名为 <code>.npm</code> 的缓存文件夹中。所以，你可以在下次安装时不必再次下载。</p>
<p>查看缓存模块：</p>
<pre><code class="hljs jboss-cli">$ <span class="hljs-keyword">ls</span> ~<span class="hljs-string">/.npm</span>

</code></pre><p>随着时间的推移，缓存文件夹会充斥着大量旧的包。所以不时清理缓存会好一些。</p>
<p>从 npm@5 开始，npm 缓存可以从 corruption 问题中自行修复，并且保证从缓存中提取的数据有效。如果你想确保一切都一致，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm cache verify</span>

</code></pre><p>清除整个缓存，运行：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm cache clean --force</span>

</code></pre><h3><a href="#查看-npm-配置"></a>查看 npm 配置</h3>
<p>要查看 npm 配置，键入：</p>
<pre><code class="hljs routeros">$ npm<span class="hljs-built_in"> config </span>list

</code></pre><p>或者：</p>
<pre><code class="hljs routeros">$ npm<span class="hljs-built_in"> config </span>ls

</code></pre><p>示例输出：</p>
<pre><code class="hljs crmsh">; cli configs
metrics-registry = <span class="hljs-string">"https://registry.npmjs.org/"</span>
scope = <span class="hljs-string">""</span>
user-agent = <span class="hljs-string">"npm/5.6.0 node/v9.4.0 linux x64"</span>

; <span class="hljs-keyword">node</span> <span class="hljs-title">bin</span> <span class="hljs-keyword">location</span> <span class="hljs-title">= /home</span>/sk/.nvm/versions/<span class="hljs-keyword">node</span><span class="hljs-title">/v9</span>.<span class="hljs-number">4.0</span>/bin/<span class="hljs-keyword">node</span>
<span class="hljs-title">; cwd</span> = /home/sk
; HOME = /home/sk
; <span class="hljs-string">"npm config ls -l"</span> to show all defaults.

</code></pre><p>要显示当前的全局位置：</p>
<pre><code class="hljs routeros">$ npm<span class="hljs-built_in"> config </span><span class="hljs-builtin-name">get</span><span class="hljs-built_in"> prefix
</span>/home/sk/.nvm/versions/node/v9.4.0

</code></pre><p>好吧，这就是全部了。我们刚才介绍的只是基础知识，npm 是一个广泛话题。有关更多详细信息，参阅 <a href="https://docs.npmjs.com/getting-started/"><strong>NPM Getting Started</strong></a> 指南。</p>
<p>希望这对你有帮助。更多好东西即将来临，敬请关注！</p>
<p>干杯！</p>
<hr>
<p>via: <a href="https://www.ostechnix.com/manage-nodejs-packages-using-npm/">https://www.ostechnix.com/manage-nodejs-packages-using-npm/</a></p>
<p>作者：<a href="https://www.ostechnix.com/author/sk/">SK</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用 npm 管理 NodeJS 包

## 原文链接
[https://www.zcfy.cc/article/how-to-manage-nodejs-packages-using-npm](https://www.zcfy.cc/article/how-to-manage-nodejs-packages-using-npm)

