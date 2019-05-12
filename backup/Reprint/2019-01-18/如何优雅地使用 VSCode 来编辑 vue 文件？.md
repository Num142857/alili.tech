---
title: '如何优雅地使用 VSCode 来编辑 vue 文件？' 
date: 2019-01-18 2:30:35
hidden: true
slug: oftc9qcee9h
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>注：本文首发在 <a href="https://www.clarencep.com/2017/03/18/edit-vue-file-via-vscode/" rel="nofollow noreferrer" target="_blank">我的个人博客</a></p></blockquote>
<p>最近有个项目使用了 <a href="http://cn.vuejs.org" rel="nofollow noreferrer" target="_blank">Vue.js</a> ，本来一直使用的是 PHPStorm 来进行开发，可是遇到了很多问题。</p>
<p>后来，果断放弃收费的 PHPStorm ，改用 <a href="https://code.visualstudio.com" rel="nofollow noreferrer" target="_blank">vscode (Visual Stdio Code)</a>.<br>当然 vscode 对 vue 也不是原生支持的，今天来扒一扒如何配置 vscode 以便优雅地编辑 vue 文件</p>
<h2 id="articleHeader0">先来扒一扒使用 PHPStorm 遇到的问题：</h2>
<ol>
<li><p>vue文件虽然可以通过插件来解决高亮问题，但是 <code>&lt;script&gt;</code> 标签中的 ES6 代码的识别老是出问题，箭头函数有的时候能正确识别，有的时候会报错</p></li>
<li><p>无法正确识别 vue 文件中的 jsx 语法</p></li>
<li><p>无法正确识别和高亮 vue 文件 <code>&lt;style&gt;</code> 标签中使用的 less 语法</p></li>
<li><p>vue文件中 <code>&lt;template&gt;</code> 部分使用了大量的自定义标签（自定义组件）和自定义属性，会报一堆 warning</p></li>
<li><p>经常性卡死</p></li>
<li><p>webpack实时编译的错误不能直接展示在代码编辑器内，还得自己到控制台中查看</p></li>
</ol>
<h2 id="articleHeader1">如何安装 vscode</h2>
<p>很简单，传送门：<a href="https://code.visualstudio.com/Download" rel="nofollow noreferrer" target="_blank">官网下载安装</a></p>
<h2 id="articleHeader2">第一步，要支持 vue 文件的基本语法高亮</h2>
<p>这里，我试过好3个插件： <code>vue</code>, <code>VueHelper</code> 和 <code>vetur</code> ，最终选择使用 <code>vetur</code> 。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008749634?w=375&amp;h=78" src="https://static.alili.tech/img/remote/1460000008749634?w=375&amp;h=78" alt="" title="" style="cursor: pointer;"></span></p>
<p>安装插件： <code>Ctrl + P</code> 然后输入 <code>ext install vetur</code> 然后回车点安装即可。</p>
<p>p.s: vscode 的插件安装比 PHPStorm 的插件安装更快捷方便，安装完成后还不用重启整个程序，只要重新加载下工作区窗口就可以了。</p>
<p>安装完 <code>vetur</code> 后还需要加上这样一段配置下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;emmet.syntaxProfiles&quot;: {
  &quot;vue-html&quot;: &quot;html&quot;,
  &quot;vue&quot;: &quot;html&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"emmet.syntaxProfiles"</span>: {
  <span class="hljs-string">"vue-html"</span>: <span class="hljs-string">"html"</span>,
  <span class="hljs-string">"vue"</span>: <span class="hljs-string">"html"</span>
}</code></pre>
<p>这时可以打开一个vue文件试试，注意下右下角状态栏是否正确识别为 <code>vue</code> 类型：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008749635?w=124&amp;h=35" src="https://static.alili.tech/img/remote/1460000008749635?w=124&amp;h=35" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果被识别为 <code>text</code> 或 <code>html</code> ，则记得要点击切换下。</p>
<h2 id="articleHeader3">第二步，要支持 vue 文件的 ESLint</h2>
<p>可能还有人会问为什么要 ESLint ？没有 lint 的代码虽然也可能可以正确运行，但是 lint 作为编译前的一道检测成本更小，而且更快。此外， ESLint 还有很多规范是帮助我们写出更加优雅而不容易出错的代码的。</p>
<p>jshint 本来也是个不错的选择，但是 ESLint 对 jsx 的支持让我还是选择了 ESLint.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008749636?w=377&amp;h=67" src="https://static.alili.tech/img/remote/1460000008749636?w=377&amp;h=67" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>安装插件： <code>Ctrl + P</code> 然后输入 <code>ext install eslint</code> 然后回车点安装即可。</p>
<p>ESLint 不是安装后就可以用的，还需要一些环境和配置：</p>
<p>首先，需要全局的 ESLint , 如果没有安装可以使用 <code>npm install -g eslint </code> 来安装。</p>
<p>其次，vue文件是类 HTML 的文件，为了支持对 vue 文件的 ESLint ，需要 <code>eslint-plugin-html</code> 这个插件。可以使用 <code>npm install -g eslint-plugin-html</code> 来安装</p>
<p>接着，安装了 HTML 插件后，还需要在 vscode 中配置下 ESLint：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;eslint.validate&quot;: [
        &quot;javascript&quot;,
        &quot;javascriptreact&quot;,
        &quot;html&quot;,
        &quot;vue&quot;
    ],
    &quot;eslint.options&quot;: {
        &quot;plugins&quot;: [&quot;html&quot;]
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>    <span class="hljs-string">"eslint.validate"</span>: [
        <span class="hljs-string">"javascript"</span>,
        <span class="hljs-string">"javascriptreact"</span>,
        <span class="hljs-string">"html"</span>,
        <span class="hljs-string">"vue"</span>
    ],
    <span class="hljs-string">"eslint.options"</span>: {
        <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"html"</span>]
    },</code></pre>
<p>最后，别忘了在项目根目录下创建 <code>.eslintrc.json</code> , 如果还没创建，还可以使用下面快捷命令来创建：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008749637?w=427&amp;h=109" src="https://static.alili.tech/img/remote/1460000008749637?w=427&amp;h=109" alt="" title="" style="cursor: pointer;"></span></p>
<p>这样一来 vue 中写的 js 代码也能正确地被 lint 了。</p>
<p>要是不小心少个括号之类的都可以有对应的报错:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008749638?w=633&amp;h=288" src="https://static.alili.tech/img/remote/1460000008749638?w=633&amp;h=288" alt="" title="" style="cursor: pointer;"></span></p>
<p>多余 import 也都能报错:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008749639?w=628&amp;h=452" src="https://static.alili.tech/img/remote/1460000008749639?w=628&amp;h=452" alt="" title="" style="cursor: pointer;"></span></p>
<p>还是蛮智能的。</p>
<h2 id="articleHeader4">第三步，配置构建任务</h2>
<p>vue 项目的构建我选择用 webpack ，不过，并不是直接使用命令行下的 webpack 而是使用了 webpack 的 API 写的 node 脚本。 脚本主要有两个，一个是 <code>build/bin/build.js</code> 另一个是 <code>build/bin/watch.js</code> 分别是单次构建和实时构建。</p>
<p>于是乎，对应 vscode 中的 tasks 也是有两个： <code>build</code> 和 <code>watch</code> ，简单配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    // use `Ctrl+P` and type `task` + SPACE + <taskName> to run a task
    &quot;version&quot;: &quot;0.1.0&quot;,
    &quot;tasks&quot;: [
        {
            &quot;taskName&quot;: &quot;build&quot;,
            &quot;echoCommand&quot;: true,
            &quot;command&quot;: &quot;node&quot;,
            &quot;args&quot;: [
                &quot;build/bin/build.js&quot;
            ],
            &quot;suppressTaskName&quot;: true,
            &quot;isBuildCommand&quot;: true
        },
        {
            &quot;taskName&quot;: &quot;watch&quot;,
            &quot;echoCommand&quot;: true,
            &quot;command&quot;: &quot;node&quot;,
            &quot;args&quot;: [
                &quot;build/bin/watch.js&quot;
            ],
            &quot;suppressTaskName&quot;: true,
            &quot;isBackground&quot;: true
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
    <span class="hljs-comment">// See https://go.microsoft.com/fwlink/?LinkId=733558</span>
    <span class="hljs-comment">// for the documentation about the tasks.json format</span>
    <span class="hljs-comment">// use `Ctrl+P` and type `task` + SPACE + &lt;taskName&gt; to run a task</span>
    <span class="hljs-string">"version"</span>: <span class="hljs-string">"0.1.0"</span>,
    <span class="hljs-string">"tasks"</span>: [
        {
            <span class="hljs-string">"taskName"</span>: <span class="hljs-string">"build"</span>,
            <span class="hljs-string">"echoCommand"</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">"command"</span>: <span class="hljs-string">"node"</span>,
            <span class="hljs-string">"args"</span>: [
                <span class="hljs-string">"build/bin/build.js"</span>
            ],
            <span class="hljs-string">"suppressTaskName"</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">"isBuildCommand"</span>: <span class="hljs-literal">true</span>
        },
        {
            <span class="hljs-string">"taskName"</span>: <span class="hljs-string">"watch"</span>,
            <span class="hljs-string">"echoCommand"</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">"command"</span>: <span class="hljs-string">"node"</span>,
            <span class="hljs-string">"args"</span>: [
                <span class="hljs-string">"build/bin/watch.js"</span>
            ],
            <span class="hljs-string">"suppressTaskName"</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-string">"isBackground"</span>: <span class="hljs-literal">true</span>
        }
    ]
}</code></pre>
<p>这样配置好后，按 <code>Ctrl + Shift + B</code> 即可开始单次构建。 不过单次构建比较慢（要10秒+），一般我都用实时构建：<code>Ctrl + P</code> 然后输入 <code>task watch &lt;回车&gt;</code> 即可开始实时构建。实时构建除了第一次比较慢，其他时候还是非常快的，一般1秒内就可以构建好。</p>
<h2 id="articleHeader5">最后，webpack 构建错误提示</h2>
<p>webpack 构建失败后一般都会有错误提示，会显示在输出窗口中：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008749640?w=788&amp;h=193" src="https://static.alili.tech/img/remote/1460000008749640?w=788&amp;h=193" alt="" title="" style="cursor: pointer;"></span></p>
<p>为啥是彩色的？ 因为装了 <code>Output Colorizer</code> 这个插件。<br><span class="img-wrap"><img data-src="/img/remote/1460000008749641?w=386&amp;h=74" src="https://static.alili.tech/img/remote/1460000008749641?w=386&amp;h=74" alt="" title="" style="cursor: pointer;"></span></p>
<p>当然，这样还是不够方便 -- 实时构建是后台运行的，“输出”窗口一般也都是在后台，每次保存完文件还得点开岂不麻烦。</p>
<p>要是能做到像 ESLint 一样直接把错误标到编辑器上面就好了。真的可以吗？翻了下 vscode 的文档，发现有神奇的 <code>problemMatcher</code> -- 可以对任务输出进行解析，解析出的问题会显示在“问题”窗口中，如果还有文件名行号和列号，则会在源代码编辑窗口中对应的位置标出来。</p>
<p>先放个最终效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008749642?w=613&amp;h=212" src="https://static.alili.tech/img/remote/1460000008749642?w=613&amp;h=212" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在这个文件的第32行，import 了一个不存在的模块，这样的错误在 ESLint 中当然是检查不出来的，然而在 webpack 的实时构建中会报错：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008749643?w=1113&amp;h=83" src="https://static.alili.tech/img/remote/1460000008749643?w=1113&amp;h=83" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这个事情的困难在于两点：</p>
<ol>
<li><p>如何通过 <code>problemMatcher</code> 把这个错误给抓出来？</p></li>
<li><p>如何找到错误对应的行号？（如果可能的话，还有列号）</p></li>
</ol>
<p>webpack的错误输出格式并不是完全统一的，而且有些还没有行号 -- 一方面可能是 webpack 的 bug ，另一方面 vue 文件在构建的时候会拆成 template, script 和 style 三个方面进行构建，报错的行号可能对不上。</p>
<p>最终我的解决方案是对 webpack 的错误重新格式化输出，然后匹配：</p>
<p>首先，重新格式化输出需要 <code>format-webpack-stats-errors-warnings</code> 这个包（偶新写的）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev format-webpack-stats-errors-warnings" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-dev format-webpack-stats-<span class="hljs-built_in">errors</span>-<span class="hljs-built_in">warnings</span></code></pre>
<p>然后，到 <code>build/bin/build.js</code> 和 <code>build/bin/watch.js</code> 中在 webpack 构建完成的回调函数中增加这个格式化后的输出：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008749644?w=808&amp;h=392" src="https://static.alili.tech/img/remote/1460000008749644?w=808&amp;h=392" alt="" title="" style="cursor: pointer;"></span></p>
<p>更多使用介绍见 <a href="https://github.com/Clarence-pan/format-webpack-stats-errors-warnings" rel="nofollow noreferrer" target="_blank">github</a></p>
<p>最后，在 <code>.vscode/tasks.json</code> 中，每个任务下添加 <code>problemWatcher</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
{
    &quot;taskName&quot;: &quot;build&quot;,
    // ...
    // build 任务的:
    &quot;problemMatcher&quot;: {
        &quot;owner&quot;: &quot;webpack&quot;,
        &quot;fileLocation&quot;: [
            &quot;relative&quot;,
            &quot;${workspaceRoot}&quot;
        ],
        &quot;pattern&quot;: {
            &quot;regexp&quot;: &quot;^!>(\\w+): (\\S+)?:(\\d+),(\\d+)(?:~(?:(\\d+),)?(\\d+))?: (.*)$&quot;,
            &quot;severity&quot;: 1,
            &quot;file&quot;: 2,
            &quot;line&quot;: 3,
            &quot;column&quot;: 4,
            &quot;endLine&quot;: 5,
            &quot;endColumn&quot;: 6,
            &quot;message&quot;: 7
        }
    }
}

{
    &quot;taskName&quot;: &quot;watch&quot;,
    // ...
    // watch 任务的：
    &quot;problemMatcher&quot;: {
        &quot;owner&quot;: &quot;webpack&quot;,
        &quot;fileLocation&quot;: [
            &quot;relative&quot;,
            &quot;${workspaceRoot}&quot;
        ],
        &quot;pattern&quot;: {
            &quot;regexp&quot;: &quot;^!>(\\w+): (\\S+)?:(\\d+),(\\d+)(?:~(?:(\\d+),)?(\\d+))?: (.*)$&quot;,
            &quot;severity&quot;: 1,
            &quot;file&quot;: 2,
            &quot;line&quot;: 3,
            &quot;column&quot;: 4,
            &quot;endLine&quot;: 5,
            &quot;endColumn&quot;: 6,
            &quot;message&quot;: 7
        },
        &quot;watching&quot;: {
            &quot;activeOnStart&quot;: true,
            &quot;beginsPattern&quot;: &quot;^\\s*Webpack begin run&quot;,
            &quot;endsPattern&quot;: &quot;^\\s*Build complete at&quot;
        }
    }
    // ...
}
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// ...</span>
{
    <span class="hljs-string">"taskName"</span>: <span class="hljs-string">"build"</span>,
    <span class="hljs-comment">// ...</span>
    <span class="hljs-comment">// build 任务的:</span>
    <span class="hljs-string">"problemMatcher"</span>: {
        <span class="hljs-string">"owner"</span>: <span class="hljs-string">"webpack"</span>,
        <span class="hljs-string">"fileLocation"</span>: [
            <span class="hljs-string">"relative"</span>,
            <span class="hljs-string">"<span class="hljs-subst">${workspaceRoot}</span>"</span>
        ],
        <span class="hljs-string">"pattern"</span>: {
            <span class="hljs-string">"regexp"</span>: <span class="hljs-string">"^!&gt;(\\w+): (\\S+)?:(\\d+),(\\d+)(?:~(?:(\\d+),)?(\\d+))?: (.*)$"</span>,
            <span class="hljs-string">"severity"</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">"file"</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">"line"</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">"column"</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">"endLine"</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">"endColumn"</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">"message"</span>: <span class="hljs-number">7</span>
        }
    }
}

{
    <span class="hljs-string">"taskName"</span>: <span class="hljs-string">"watch"</span>,
    <span class="hljs-comment">// ...</span>
    <span class="hljs-comment">// watch 任务的：</span>
    <span class="hljs-string">"problemMatcher"</span>: {
        <span class="hljs-string">"owner"</span>: <span class="hljs-string">"webpack"</span>,
        <span class="hljs-string">"fileLocation"</span>: [
            <span class="hljs-string">"relative"</span>,
            <span class="hljs-string">"<span class="hljs-subst">${workspaceRoot}</span>"</span>
        ],
        <span class="hljs-string">"pattern"</span>: {
            <span class="hljs-string">"regexp"</span>: <span class="hljs-string">"^!&gt;(\\w+): (\\S+)?:(\\d+),(\\d+)(?:~(?:(\\d+),)?(\\d+))?: (.*)$"</span>,
            <span class="hljs-string">"severity"</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">"file"</span>: <span class="hljs-number">2</span>,
            <span class="hljs-string">"line"</span>: <span class="hljs-number">3</span>,
            <span class="hljs-string">"column"</span>: <span class="hljs-number">4</span>,
            <span class="hljs-string">"endLine"</span>: <span class="hljs-number">5</span>,
            <span class="hljs-string">"endColumn"</span>: <span class="hljs-number">6</span>,
            <span class="hljs-string">"message"</span>: <span class="hljs-number">7</span>
        },
        <span class="hljs-string">"watching"</span>: {
            <span class="hljs-string">"activeOnStart"</span>: <span class="hljs-keyword">true</span>,
            <span class="hljs-string">"beginsPattern"</span>: <span class="hljs-string">"^\\s*Webpack begin run"</span>,
            <span class="hljs-string">"endsPattern"</span>: <span class="hljs-string">"^\\s*Build complete at"</span>
        }
    }
    <span class="hljs-comment">// ...</span>
}
<span class="hljs-comment">// ...</span></code></pre>
<p>注：在 watch 任务中，为了匹配何时开始和何时结束，我在 webpack 构建的 run 和 watch 时增加了一个 <code>console.log('Webpack begin run')</code> 的打印，而在构建完成后增加了一个 <code>console.log("Build complete at ..")</code> 的打印。</p>
<p>OK，终于基本搞定了 vscode ，可以愉快地开发 vue 应用了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何优雅地使用 VSCode 来编辑 vue 文件？

## 原文链接
[https://segmentfault.com/a/1190000008749631](https://segmentfault.com/a/1190000008749631)

