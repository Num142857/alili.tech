---
title: 'VS Code插件开发指南(view-readme)' 
date: 2019-01-17 2:30:25
hidden: true
slug: nh209k995ud
categories: [reprint]
---

{{< raw >}}

                    
<p>本次给大家带来的分享是关于VS Code插件的一些经验，分享的内容是我写的一个插件：<a href="https://marketplace.visualstudio.com/items?itemName=ansenhuang.vscode-view-readme" rel="nofollow noreferrer" target="_blank">view-readme</a>。</p>
<h3 id="articleHeader0">开发背景</h3>
<p>在本地安装好所有npm包后，有的时候想看看某个模块的文档，了解其特性以及如何使用。于是打开node_modules文件夹，大家都知道，这个文件夹里面的文件是非常多的，很难定位到我们想看的模块，并且这么多的目录树展开后，严重影响到编辑的使用。</p>
<p>为了解决上面这个问题，我开发了<code>view-readme</code>这个插件。在任何时候你想查看npm包的文档时，按快捷键并输入想要查看的模块名称，自动为你打开该模块的README.md文档。</p>
<h3 id="articleHeader1">环境准备</h3>
<p>1.安装Yeoman和VS Code脚手架</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g yo generator-code" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install -g yo generator-code</code></pre>
<p>2.生成项目模版</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yo code" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">yo code</code></pre>
<p>3.配置选项</p>
<ul>
<li><p>选择第二项（JavaScript）</p></li>
<li><p>扩展名称</p></li>
<li><p>扩展唯一标识</p></li>
<li><p>扩展描述</p></li>
<li><p>发布作者</p></li>
<li><p>是否创建git仓库</p></li>
</ul>
<p>4.模版目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
|____.eslintrc.json       
|____.gitignore                
|____.vscode                     // vscode配置目录
| |____extensions.json
| |____launch.json
| |____settings.json
|____.vscodeignore               // 发布时过滤掉的文件
|____CHANGELOG.md                // 发布记录
|____extension.js                // 插件入口
|____jsconfig.json               // js规则
|____package.json                // 资源配置
|____README.md                   // 文档
|____test                        // 自动化测试目录
| |____extension.test.js
| |____index.js
|____vsc-extension-quickstart.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>.
|<span class="hljs-variable">____</span>.eslintrc.json       
|<span class="hljs-variable">____</span>.gitignore                
|<span class="hljs-variable">____</span>.vscode                     <span class="hljs-comment">// vscode配置目录</span>
| |<span class="hljs-variable">____extensions</span>.json
| |<span class="hljs-variable">____launch</span>.json
| |<span class="hljs-variable">____settings</span>.json
|<span class="hljs-variable">____</span>.vscodeignore               <span class="hljs-comment">// 发布时过滤掉的文件</span>
|<span class="hljs-variable">____CHANGELOG</span>.md                <span class="hljs-comment">// 发布记录</span>
|<span class="hljs-variable">____extension</span>.js                <span class="hljs-comment">// 插件入口</span>
|<span class="hljs-variable">____jsconfig</span>.json               <span class="hljs-comment">// js规则</span>
|<span class="hljs-variable">____package</span>.json                <span class="hljs-comment">// 资源配置</span>
|<span class="hljs-variable">____README</span>.md                   <span class="hljs-comment">// 文档</span>
|<span class="hljs-variable">____test</span>                        <span class="hljs-comment">// 自动化测试目录</span>
| |<span class="hljs-variable">____extension</span>.test.js
| |<span class="hljs-variable">____index</span>.js
|<span class="hljs-variable">____vsc</span>-extension-quickstart.md</code></pre>
<p>5.运行</p>
<ul>
<li><p>打开新窗口</p></li>
<li><p>加载插件目录</p></li>
<li><p>进入调试</p></li>
<li><p>Launch Extension</p></li>
<li><p>打开命令面板（cmd+shift+p）</p></li>
<li><p>输入hello world，回车</p></li>
<li><p>弹窗Hello World提示</p></li>
</ul>
<h3 id="articleHeader2">插件代码</h3>
<p>资源配置介绍</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;name&quot;: &quot;vscode-view-readme&quot;,
    &quot;displayName&quot;: &quot;view-readme&quot;,
    &quot;description&quot;: &quot;Open readme.md at nearly path of node_modules quickly. &quot;,
    &quot;version&quot;: &quot;0.1.3&quot;,
    &quot;publisher&quot;: &quot;ansenhuang&quot;,
    &quot;icon&quot;: &quot;images/logo128.png&quot;,
    &quot;engines&quot;: {
        &quot;vscode&quot;: &quot;^1.10.0&quot;
    },
    &quot;galleryBanner&quot;: {                     // 发布后的预览页配置
        &quot;color&quot;: &quot;#eff1f3&quot;,                // banner颜色
        &quot;theme&quot;: &quot;light&quot;                   // 主题（light, dark）
    },
    &quot;categories&quot;: [
        &quot;Other&quot;                            // 插件分类
    ],
    &quot;activationEvents&quot;: [                  // 启动项
        &quot;onCommand:viewReadme.showLocal&quot;   // 触发这个命令时启动
    ],
    &quot;main&quot;: &quot;./src/extension&quot;,             // 插件入口
    &quot;contributes&quot;: {                       // 配置
        &quot;configuration&quot;: {                 // 定义默认参数
            &quot;type&quot;: &quot;object&quot;,
            &quot;title&quot;: &quot;View readme configuration&quot;,
            &quot;properties&quot;: {                // 这里定义的参数可以在vscode中取到
                &quot;view-readme.savePath&quot;: {
                    &quot;type&quot;: &quot;string&quot;,
                    &quot;default&quot;: &quot;&quot;,
                    &quot;description&quot;: &quot;Save in local path when request remote.&quot;
                },
                &quot;view-readme.npmUrl&quot;: {
                    &quot;type&quot;: &quot;string&quot;,
                    &quot;default&quot;: &quot;https://registry.npmjs.org/&quot;,
                    &quot;description&quot;: &quot;Get data from remote url.&quot;
                }
            }
        },
        &quot;commands&quot;: [                                 // 命令配置
            {
                &quot;command&quot;: &quot;viewReadme.showLocal&quot;,    // 注册的命令
                &quot;title&quot;: &quot;Readme: Open markdown file&quot; // 命令显示在面板的标题
            }
        ],
        &quot;keybindings&quot;: [                              // 快捷键配置
            {
                &quot;command&quot;: &quot;viewReadme.showLocal&quot;,    // 要触发的命令
                &quot;key&quot;: &quot;ctrl+shift+l&quot;,                // windows系统的快捷键
                &quot;mac&quot;: &quot;cmd+shift+l&quot;                  // mac系统的快捷键
            }
        ]
    },
    &quot;scripts&quot;: {
        &quot;postinstall&quot;: &quot;node ./node_modules/vscode/bin/install&quot;
    },
    &quot;devDependencies&quot;: {
        &quot;@types/mocha&quot;: &quot;^2.2.32&quot;,
        &quot;@types/node&quot;: &quot;^6.0.40&quot;,
        &quot;eslint&quot;: &quot;^3.6.0&quot;,
        &quot;mocha&quot;: &quot;^2.3.3&quot;,
        &quot;typescript&quot;: &quot;^2.0.3&quot;,
        &quot;vscode&quot;: &quot;^1.0.0&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"vscode-view-readme"</span>,
    <span class="hljs-string">"displayName"</span>: <span class="hljs-string">"view-readme"</span>,
    <span class="hljs-string">"description"</span>: <span class="hljs-string">"Open readme.md at nearly path of node_modules quickly. "</span>,
    <span class="hljs-string">"version"</span>: <span class="hljs-string">"0.1.3"</span>,
    <span class="hljs-string">"publisher"</span>: <span class="hljs-string">"ansenhuang"</span>,
    <span class="hljs-string">"icon"</span>: <span class="hljs-string">"images/logo128.png"</span>,
    <span class="hljs-string">"engines"</span>: {
        <span class="hljs-string">"vscode"</span>: <span class="hljs-string">"^1.10.0"</span>
    },
    <span class="hljs-string">"galleryBanner"</span>: {                     <span class="hljs-comment">// 发布后的预览页配置</span>
        <span class="hljs-string">"color"</span>: <span class="hljs-string">"#eff1f3"</span>,                <span class="hljs-comment">// banner颜色</span>
        <span class="hljs-string">"theme"</span>: <span class="hljs-string">"light"</span>                   <span class="hljs-comment">// 主题（light, dark）</span>
    },
    <span class="hljs-string">"categories"</span>: [
        <span class="hljs-string">"Other"</span>                            <span class="hljs-comment">// 插件分类</span>
    ],
    <span class="hljs-string">"activationEvents"</span>: [                  <span class="hljs-comment">// 启动项</span>
        <span class="hljs-string">"onCommand:viewReadme.showLocal"</span>   <span class="hljs-comment">// 触发这个命令时启动</span>
    ],
    <span class="hljs-string">"main"</span>: <span class="hljs-string">"./src/extension"</span>,             <span class="hljs-comment">// 插件入口</span>
    <span class="hljs-string">"contributes"</span>: {                       <span class="hljs-comment">// 配置</span>
        <span class="hljs-string">"configuration"</span>: {                 <span class="hljs-comment">// 定义默认参数</span>
            <span class="hljs-string">"type"</span>: <span class="hljs-string">"object"</span>,
            <span class="hljs-string">"title"</span>: <span class="hljs-string">"View readme configuration"</span>,
            <span class="hljs-string">"properties"</span>: {                <span class="hljs-comment">// 这里定义的参数可以在vscode中取到</span>
                <span class="hljs-string">"view-readme.savePath"</span>: {
                    <span class="hljs-string">"type"</span>: <span class="hljs-string">"string"</span>,
                    <span class="hljs-string">"default"</span>: <span class="hljs-string">""</span>,
                    <span class="hljs-string">"description"</span>: <span class="hljs-string">"Save in local path when request remote."</span>
                },
                <span class="hljs-string">"view-readme.npmUrl"</span>: {
                    <span class="hljs-string">"type"</span>: <span class="hljs-string">"string"</span>,
                    <span class="hljs-string">"default"</span>: <span class="hljs-string">"https://registry.npmjs.org/"</span>,
                    <span class="hljs-string">"description"</span>: <span class="hljs-string">"Get data from remote url."</span>
                }
            }
        },
        <span class="hljs-string">"commands"</span>: [                                 <span class="hljs-comment">// 命令配置</span>
            {
                <span class="hljs-string">"command"</span>: <span class="hljs-string">"viewReadme.showLocal"</span>,    <span class="hljs-comment">// 注册的命令</span>
                <span class="hljs-string">"title"</span>: <span class="hljs-string">"Readme: Open markdown file"</span> <span class="hljs-comment">// 命令显示在面板的标题</span>
            }
        ],
        <span class="hljs-string">"keybindings"</span>: [                              <span class="hljs-comment">// 快捷键配置</span>
            {
                <span class="hljs-string">"command"</span>: <span class="hljs-string">"viewReadme.showLocal"</span>,    <span class="hljs-comment">// 要触发的命令</span>
                <span class="hljs-string">"key"</span>: <span class="hljs-string">"ctrl+shift+l"</span>,                <span class="hljs-comment">// windows系统的快捷键</span>
                <span class="hljs-string">"mac"</span>: <span class="hljs-string">"cmd+shift+l"</span>                  <span class="hljs-comment">// mac系统的快捷键</span>
            }
        ]
    },
    <span class="hljs-string">"scripts"</span>: {
        <span class="hljs-string">"postinstall"</span>: <span class="hljs-string">"node ./node_modules/vscode/bin/install"</span>
    },
    <span class="hljs-string">"devDependencies"</span>: {
        <span class="hljs-string">"@types/mocha"</span>: <span class="hljs-string">"^2.2.32"</span>,
        <span class="hljs-string">"@types/node"</span>: <span class="hljs-string">"^6.0.40"</span>,
        <span class="hljs-string">"eslint"</span>: <span class="hljs-string">"^3.6.0"</span>,
        <span class="hljs-string">"mocha"</span>: <span class="hljs-string">"^2.3.3"</span>,
        <span class="hljs-string">"typescript"</span>: <span class="hljs-string">"^2.0.3"</span>,
        <span class="hljs-string">"vscode"</span>: <span class="hljs-string">"^1.0.0"</span>
    }
}</code></pre>
<p>src/extension.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vscode = require('vscode');
var Local = require('./Local');
var { INPUT_PROMPT } = require('./config');

function activate (context) {
    // 注册命令
    var disposableLocal = vscode.commands.registerCommand('viewReadme.showLocal', function () {
        vscode.window.showInputBox({  // 调出输入框
            prompt: INPUT_PROMPT
        }).then(function (moduleName) {
            new Local(moduleName);    // 回车后执行
        });
    });

    context.subscriptions.push(disposableLocal);
}

function deactivate () {}

// exports
exports.activate = activate;
exports.deactivate = deactivate;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> vscode = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vscode'</span>);
<span class="hljs-keyword">var</span> Local = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./Local'</span>);
<span class="hljs-keyword">var</span> { INPUT_PROMPT } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">activate</span> (<span class="hljs-params">context</span>) </span>{
    <span class="hljs-comment">// 注册命令</span>
    <span class="hljs-keyword">var</span> disposableLocal = vscode.commands.registerCommand(<span class="hljs-string">'viewReadme.showLocal'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        vscode.window.showInputBox({  <span class="hljs-comment">// 调出输入框</span>
            prompt: INPUT_PROMPT
        }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">moduleName</span>) </span>{
            <span class="hljs-keyword">new</span> Local(moduleName);    <span class="hljs-comment">// 回车后执行</span>
        });
    });

    context.subscriptions.push(disposableLocal);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deactivate</span> (<span class="hljs-params"></span>) </span>{}

<span class="hljs-comment">// exports</span>
exports.activate = activate;
exports.deactivate = deactivate;</code></pre>
<p>src/Local.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require('fs');
var path = require('path');
var vscode = require('vscode');
var {
    MARKDOWN_PREVIEW,
    README_NAMES,
    NO_FILE,
    NOT_FOUND
} = require('./config');

function Local (moduleName) {
    this.moduleName = moduleName;

    moduleName &amp;&amp; this.init();
}

Local.prototype = {
    init: function () {
        var files = vscode.workspace.textDocuments; // 获取当前打开的文件路径
        if (files.length) {
            var last = files.length - 1;
            this.handlePath(path.dirname(files[last].fileName)); // 取最后打开的文件目录，基于这个路径去查找node_modules目录
        } else {
            vscode.window.showInformationMessage(NO_FILE); // 弹出提示信息
        }
    },
    handlePath: function (dir) {
        if (dir === '/') { // 已到达根目录
            vscode.window.showInformationMessage(NOT_FOUND);
            return;
        }

        var modulePath = path.join(dir, 'node_modules', this.moduleName);
        if (fs.existsSync(modulePath)) {
            this.handleReadme(modulePath); // 找到了模块目录
        } else {
            this.handlePath(path.dirname(dir)); // 未找到则继续向上查找
        }
    },
    handleReadme: function (modulePath) {
        var readmeName = README_NAMES.find(function (name) {
            return fs.existsSync(path.join(modulePath, name));
        });

        if (readmeName) {
            var readmePath = path.join(modulePath, readmeName);
            vscode.commands.executeCommand(MARKDOWN_PREVIEW, vscode.Uri.parse('file://' + readmePath)); // 执行markdown命令，打开文件
        } else {
            vscode.window.showInformationMessage(NOT_FOUND);
        }
    }
};

module.exports = Local;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> vscode = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vscode'</span>);
<span class="hljs-keyword">var</span> {
    MARKDOWN_PREVIEW,
    README_NAMES,
    NO_FILE,
    NOT_FOUND
} = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Local</span> (<span class="hljs-params">moduleName</span>) </span>{
    <span class="hljs-keyword">this</span>.moduleName = moduleName;

    moduleName &amp;&amp; <span class="hljs-keyword">this</span>.init();
}

Local.prototype = {
    <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> files = vscode.workspace.textDocuments; <span class="hljs-comment">// 获取当前打开的文件路径</span>
        <span class="hljs-keyword">if</span> (files.length) {
            <span class="hljs-keyword">var</span> last = files.length - <span class="hljs-number">1</span>;
            <span class="hljs-keyword">this</span>.handlePath(path.dirname(files[last].fileName)); <span class="hljs-comment">// 取最后打开的文件目录，基于这个路径去查找node_modules目录</span>
        } <span class="hljs-keyword">else</span> {
            vscode.window.showInformationMessage(NO_FILE); <span class="hljs-comment">// 弹出提示信息</span>
        }
    },
    <span class="hljs-attr">handlePath</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">dir</span>) </span>{
        <span class="hljs-keyword">if</span> (dir === <span class="hljs-string">'/'</span>) { <span class="hljs-comment">// 已到达根目录</span>
            vscode.window.showInformationMessage(NOT_FOUND);
            <span class="hljs-keyword">return</span>;
        }

        <span class="hljs-keyword">var</span> modulePath = path.join(dir, <span class="hljs-string">'node_modules'</span>, <span class="hljs-keyword">this</span>.moduleName);
        <span class="hljs-keyword">if</span> (fs.existsSync(modulePath)) {
            <span class="hljs-keyword">this</span>.handleReadme(modulePath); <span class="hljs-comment">// 找到了模块目录</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.handlePath(path.dirname(dir)); <span class="hljs-comment">// 未找到则继续向上查找</span>
        }
    },
    <span class="hljs-attr">handleReadme</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">modulePath</span>) </span>{
        <span class="hljs-keyword">var</span> readmeName = README_NAMES.find(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name</span>) </span>{
            <span class="hljs-keyword">return</span> fs.existsSync(path.join(modulePath, name));
        });

        <span class="hljs-keyword">if</span> (readmeName) {
            <span class="hljs-keyword">var</span> readmePath = path.join(modulePath, readmeName);
            vscode.commands.executeCommand(MARKDOWN_PREVIEW, vscode.Uri.parse(<span class="hljs-string">'file://'</span> + readmePath)); <span class="hljs-comment">// 执行markdown命令，打开文件</span>
        } <span class="hljs-keyword">else</span> {
            vscode.window.showInformationMessage(NOT_FOUND);
        }
    }
};

<span class="hljs-built_in">module</span>.exports = Local;</code></pre>
<p>src/config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.MARKDOWN_PREVIEW = 'markdown.showPreview';
exports.README_NAMES = ['README.md', 'readme.md', 'Readme.md', 'README', 'readme'];
exports.INPUT_PROMPT = 'Enter module name';
exports.NO_FILE = 'Please open file firstly.';
exports.NOT_FOUND = 'Module not found!';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">exports.MARKDOWN_PREVIEW = <span class="hljs-string">'markdown.showPreview'</span>;
exports.README_NAMES = [<span class="hljs-string">'README.md'</span>, <span class="hljs-string">'readme.md'</span>, <span class="hljs-string">'Readme.md'</span>, <span class="hljs-string">'README'</span>, <span class="hljs-string">'readme'</span>];
exports.INPUT_PROMPT = <span class="hljs-string">'Enter module name'</span>;
exports.NO_FILE = <span class="hljs-string">'Please open file firstly.'</span>;
exports.NOT_FOUND = <span class="hljs-string">'Module not found!'</span>;</code></pre>
<p>插件编写完成，重新运行一下试试效果吧。</p>
<h3 id="articleHeader3">发布插件</h3>
<h5>账号</h5>
<ul>
<li><p><a href="https://www.visualstudio.com/products/visual-studio-team-services-vs" rel="nofollow noreferrer" target="_blank">账号注册</a></p></li>
<li><p>Create new account</p></li>
<li><p>添加Personal Access Token（地址：<a href="https://%5Byour" rel="nofollow noreferrer" target="_blank">https://[your</a> name].visualstudio.com/_details/security/tokens，注意Token只显示一次，最好自己保存一份）</p></li>
</ul>
<h5>发布工具</h5>
<p>安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vsce" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install -g vsce</code></pre>
<p>创建发布作者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vsce create-publisher (publisher name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">vsce create-publisher (publisher name)</code></pre>
<p>发布</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vsce publish" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">vsce publish</code></pre>
<p>打包成二进制文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vsce package" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">vsce package</code></pre>
<h3 id="articleHeader4">结尾</h3>
<p>大家可以在VS Code插件中搜索<code>view-readme</code>来安装这个插件。</p>
<p>项目仓库：<a href="https://github.com/ansenhuang/vscode-view-readme" rel="nofollow noreferrer" target="_blank">https://github.com/ansenhuang/vscode-view-readme</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VS Code插件开发指南(view-readme)

## 原文链接
[https://segmentfault.com/a/1190000008968904](https://segmentfault.com/a/1190000008968904)

