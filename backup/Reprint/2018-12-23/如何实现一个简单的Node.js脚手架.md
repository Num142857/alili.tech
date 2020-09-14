---
title: '如何实现一个简单的Node.js脚手架' 
date: 2018-12-23 2:30:07
hidden: true
slug: 704tpf4xy44
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">原因</h1>
<p>在工作中，需要开发一个脚手架，用于给相关用户提供相关的开发便利性。</p>
<h1 id="articleHeader1">适合人群</h1>
<p>对前端、Node操作有一定的了解，同时向了解脚手架开发过程或者需要自己实现一个脚手架的开发者。</p>
<h1 id="articleHeader2">目标</h1>
<ol>
<li>开发一个简单的脚手架，能够提供给用户进行安装。</li>
<li>能够输出相关提示。</li>
<li>对用户文件进行读写操作。</li>
<li>在脚手架中使用Shell脚本。</li>
</ol>
<p>更多与用户交互和文件操作等进阶内容可以查看同系列第二篇：<a href="https://segmentfault.com/a/1190000013091099">如何实现一个脚手架进阶版（Vue-cli v2.9学习篇）</a></p>
<h1 id="articleHeader3">步骤</h1>
<h2 id="articleHeader4">开发脚手架</h2>
<p>脚手架的开发最开始过程与普通的前端项目相同，需要一个入口文件<code>command.js</code>和配置文件<code>package.json</code>。</p>
<p>与其他配置文件不同的是，你需要在<code>command.js</code>文件第一行增加如下声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#! /usr/bin/env node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs d"><code style="word-break: break-word; white-space: initial;"><span class="hljs-meta">#! /usr/bin/env node</span></code></pre>
<p>同时需要在<code>package.json</code>文件中加上一下一项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  ...,
  &quot;bin&quot;: {
       &quot;cm-cli&quot;: &quot;command.js&quot;
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  ...,
  <span class="hljs-string">"bin"</span>: {
       <span class="hljs-string">"cm-cli"</span>: <span class="hljs-string">"command.js"</span>
   }
}</code></pre>
<p>在配置文件中增加了此项后，只需要在配置文件根目录下执行<code>npm link</code>命令，即可使用<code>cm-cli --help</code>命令来查看加载的cm-cli脚手架。</p>
<p>如果你发布了你的脚手架，那么在其他用户使用命令<code>npm install -g cm-cli</code>之后，便可以在全局下使用你的脚手架了。</p>
<h2 id="articleHeader5">对用户进行提示</h2>
<p>在对注释和命令进行提示中，我们需要使用到<code>commander</code>包，使用<code>npm install commander</code>即可进行安装。（如果NPM版本低于5，则需要添加--save参数保证更新<code>package.json</code>配置文件）。</p>
<p><code>commander</code>是一个提供用户命令行输入和参数解析的强大功能。有需要的可以阅读相关的库文档。在这里我介绍两个用的最多的方法。</p>
<h3 id="articleHeader6">option</h3>
<p>能够初始化自定义的参数对象，设置关键字和描述，同时还可以设置读取用户输入的参数。具体用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const commander = require('commander');

commander.version('1.0.0')
    .option('-a, --aaa', 'aaaaa')
    .option('-b, --bbb', 'bbbbb')
    .option('-c, --ccc [name]', 'ccccc')
    .parse(process.argv);


if (commander.aaa) {
    console.log('aaa');
}

if (commander.bbb) {
    console.log('bbb');
}

if (commander.ccc) {
    console.log('ccc', commander.ccc);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> commander = <span class="hljs-built_in">require</span>(<span class="hljs-string">'commander'</span>);

commander.version(<span class="hljs-string">'1.0.0'</span>)
    .option(<span class="hljs-string">'-a, --aaa'</span>, <span class="hljs-string">'aaaaa'</span>)
    .option(<span class="hljs-string">'-b, --bbb'</span>, <span class="hljs-string">'bbbbb'</span>)
    .option(<span class="hljs-string">'-c, --ccc [name]'</span>, <span class="hljs-string">'ccccc'</span>)
    .parse(process.argv);


<span class="hljs-keyword">if</span> (commander.aaa) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'aaa'</span>);
}

<span class="hljs-keyword">if</span> (commander.bbb) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bbb'</span>);
}

<span class="hljs-keyword">if</span> (commander.ccc) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'ccc'</span>, commander.ccc);
}</code></pre>
<p>具体展示如下：</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVZB2r" src="https://static.alili.techhttps://segmentfault.com/img/bVZB2r" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">command</h3>
<p>该方法能够在命令行增加一个命令。用户在执行此命令后，能够执行回调中的逻辑。具体用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="commander
    .command('init <extensionId>')
    .description('init extension project')
    .action((extensionId) => {
        console.log(`init Extension Project &quot;${extensionId}&quot;`);
        // todo something you need
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">commander
    .command(<span class="hljs-string">'init &lt;extensionId&gt;'</span>)
    .description(<span class="hljs-string">'init extension project'</span>)
    .action(<span class="hljs-function">(<span class="hljs-params">extensionId</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`init Extension Project "<span class="hljs-subst">${extensionId}</span>"`</span>);
        <span class="hljs-comment">// todo something you need</span>
    });</code></pre>
<p>具体展示效果如下：</p>
<p><span class="img-wrap"><img data-src="https://segmentfault.com/img/bVZB24" src="https://static.alili.techhttps://segmentfault.com/img/bVZB24" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">对用户文件进行读写操作</h2>
<p>通过上面的步骤，我们已经能够完成一个简单的脚手架了。下面，我们需要读取用户配置，同时为用户生成一些模板文件。</p>
<h3 id="articleHeader9">读取文件</h3>
<p>现在，我们需要读取用户的<code>cm-cli.json</code>配置文件来进行一些配置。</p>
<p>我们可以使用Node.js的fs文件模块来对文件进度读操作，由于此处没有太多难点，因此略去。</p>
<h3 id="articleHeader10">写入文件模板</h3>
<p>我们提前将模板文件存储在CDN上，再根据本地读取到的相关脚手架配置文件来进行模板的下载。</p>
<p><strong>注：脚手架中读取的路径为使用者使用时当前路径，因此没有办法将模板文件存储在脚手架中进行读取。</strong></p>
<p>我们可以使用诸如<code>request</code>这种库来帮助我们进行文件下载，简化操作步骤。执行npm install request`即可进行安装。</p>
<p><strong>注：在文件写入时建议先判断文件是否存在，再进行覆盖。</strong></p>
<h2 id="articleHeader11">使用Shell脚本</h2>
<p>与Node.js提供的API函数来看，有些人更加倾向于使用Shell脚本来进行文件操作。幸运的是，我们也可以在我们的脚手架中引入<code>node-cmd</code>来启用对Shell脚本的支持。执行<code>npm install node-cmd</code>即可进行安装。</p>
<p>具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="commander
    .command('init <extensionId>')
    .description('init extension project')
    .action((extensionId) => {
        id = extensionId;
        console.log(`init Extension Project &quot;${extensionId}&quot;`);

        cmd.get(
            `
            mkdir -p static/${extensionId}

            mkdir tmp
            mkdir tmp/source-file
            mkdir tmp/build-file
            curl -o tmp/source-file/index.js https://xxxxxxxx.com?filename=index.js
            touch tmp/source-file/index.css

            curl -o tmp/build-file/server.js https://xxxxxxxx.com?filename=server.js
            curl -o tmp/build-file/router.js https://xxxxxxxx.com?filename=router.js
            curl -o tmp/build-file/package.json https://xxxxxxxx.com?filename=package.json
            
            cp  tmp/source-file/* static/${extensionId}
            cp tmp/build-file/* ./
            rm -fr tmp
            npm install
            `,
            (err, data) => {
                console.log(data)
                if (!err) {
                    console.log('init success');
                    return;
                }

                console.error('init error');
            });
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tcl"><code>commander
    .command(<span class="hljs-string">'init &lt;extensionId&gt;'</span>)
    .description(<span class="hljs-string">'init extension project'</span>)
    .action((extensionId) =&gt; {
        id = extensionId;
        console.log(`init Extension Project <span class="hljs-string">"${extensionId}"</span>`);

        cmd.get(
            `
            mkdir -p static/${extensionId}

            mkdir tmp
            mkdir tmp/<span class="hljs-keyword">source</span>-<span class="hljs-keyword">file</span>
            mkdir tmp/build-<span class="hljs-keyword">file</span>
            curl -o tmp/<span class="hljs-keyword">source</span>-<span class="hljs-keyword">file</span>/index.js https://xxxxxxxx.com?<span class="hljs-keyword">filename</span>=index.js
            touch tmp/<span class="hljs-keyword">source</span>-<span class="hljs-keyword">file</span>/index.css

            curl -o tmp/build-<span class="hljs-keyword">file</span>/server.js https://xxxxxxxx.com?<span class="hljs-keyword">filename</span>=server.js
            curl -o tmp/build-<span class="hljs-keyword">file</span>/router.js https://xxxxxxxx.com?<span class="hljs-keyword">filename</span>=router.js
            curl -o tmp/build-<span class="hljs-keyword">file</span>/<span class="hljs-keyword">package</span>.json https://xxxxxxxx.com?<span class="hljs-keyword">filename</span>=<span class="hljs-keyword">package</span>.json
            
            cp  tmp/<span class="hljs-keyword">source</span>-<span class="hljs-keyword">file</span>/* static/${extensionId}
            cp tmp/build-<span class="hljs-keyword">file</span>/* ./
            rm -fr tmp
            npm install
            `,
            (err, data) =&gt; {
                console.log(data)
                <span class="hljs-keyword">if</span> (!err) {
                    console.log(<span class="hljs-string">'init success'</span>);
                    <span class="hljs-keyword">return</span>;
                }

                console.<span class="hljs-keyword">error</span>(<span class="hljs-string">'init error'</span>);
            });
    });</code></pre>
<p>我们可以快速的使用Shell脚本来进行文件夹的创建和文件模板的下载。</p>
<h1 id="articleHeader12">总结</h1>
<p>脚手架想要在终端能够快速执行，可以在<code>package.json</code>配置文件中增加相关字段。</p>
<p>脚手架需要能够读取相关终端输入，可以使用<code>commander</code>库来快速开发。</p>
<p>脚手架需要能够执行Shell脚本，可以使用<code>node-cmd</code>库来快速实现需求。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何实现一个简单的Node.js脚手架

## 原文链接
[https://segmentfault.com/a/1190000012262311](https://segmentfault.com/a/1190000012262311)

