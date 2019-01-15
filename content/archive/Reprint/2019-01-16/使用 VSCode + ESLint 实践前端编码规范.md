---
title: '使用 VSCode + ESLint 实践前端编码规范' 
date: 2019-01-16 2:30:08
hidden: true
slug: tg1p346hvz
categories: [reprint]
---

{{< raw >}}

                    
<p>在团队的项目开发过程中，代码维护所占的时间比重往往大于新功能的开发。因此编写符合团队编码规范的代码是至关重要的，这样做不仅可以很大程度地避免基本语法错误，也保证了代码的可读性，毕竟：</p>
<blockquote><p>程序是写给人读的，只是偶尔让计算机执行一下。—— Donald Knuth</p></blockquote>
<p>本文将讲解如何在 VSCode 中配合 ESLint 扩展来实践团队内部的前端编码规范。</p>
<ul>
<li><p><a href="https://github.com/fedesigner/styleguide" rel="nofollow noreferrer" target="_blank">前端编码规范</a></p></li>
<li><p><a href="https://github.com/fedesigner/styleguide/blob/master/eslint/.eslintrc.js" rel="nofollow noreferrer" target="_blank">ESLint 完整配置文件</a></p></li>
</ul>
<h2 id="articleHeader0">什么是 ESLint</h2>
<p><a href="http://eslint.org/" rel="nofollow noreferrer" target="_blank">ESLint</a>（<a href="http://eslint.cn/" rel="nofollow noreferrer" target="_blank">中文站点</a>）是一个开源的 JavaScript 代码检查工具，使用 Node.js 编写，由 Nicholas C. Zakas 于 2013 年 6 月创建。ESLint 的初衷是为了让程序员可以创建自己的检测规则，使其可以在编码的过程中发现问题而不是在执行的过程中。ESLint 的所有规则都被设计成可插入的，为了方便使用，ESLint 内置了一些规则，在这基础上也可以增加自定义规则。</p>
<h2 id="articleHeader1">安装 ESLint 扩展</h2>
<h3 id="articleHeader2">安装环境</h3>
<ul>
<li><p><a href="https://code.visualstudio.com/Download" rel="nofollow noreferrer" target="_blank">VSCode V1.11.1</a></p></li>
<li><p>Windows 10</p></li>
</ul>
<h3 id="articleHeader3">安装 ESLint 扩展</h3>
<p>首先，打开 VSCode 扩展面板并搜索 ESLint 扩展，然后点击安装</p>
<p><span class="img-wrap"><img data-src="/img/bVMeLp?w=1010&amp;h=761" src="https://static.alili.tech/img/bVMeLp?w=1010&amp;h=761" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>安装完毕之后点击 <code>重新加载</code> 以激活扩展，但想要让扩展进行工作，我们还需要先进行 ESLint 的安装配置。</p>
<h2 id="articleHeader4">安装 ESLint</h2>
<p>如果你仅仅想让 ESLint 成为你项目构建系统的一部分，我们可以在项目根目录进行本地安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install eslint --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">$ npm install eslint --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>如果想使 ESLint 适用于你所有的项目，我们建议使用全局安装，使用全局安装 ESLint 后，你使用的任何 ESLint 插件或可分享的配置也都必须在全局安装。</p>
<p>这里我们使用全局安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g eslint" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> -g eslint</code></pre>
<p>安装完毕后，我们使用 <code>eslint --init</code> 命令在用户目录中生成一个配置文件（也可以在任何你喜欢的位置进行生成）</p>
<p><span class="img-wrap"><img data-src="/img/bVMePL?w=576&amp;h=271" src="https://static.alili.tech/img/bVMePL?w=576&amp;h=271" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们在第一个选项中选择自定义代码风格，之后根据需要自行选择。</p>
<p>设置完成后我们会得到一份文件名为 <code>.eslintrc.js</code> 的配置文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    &quot;env&quot;: {
        &quot;browser&quot;: true,
        &quot;commonjs&quot;: true,
        &quot;es6&quot;: true
    },
    &quot;extends&quot;: &quot;eslint:recommended&quot;,
    &quot;parserOptions&quot;: {
        &quot;sourceType&quot;: &quot;module&quot;
    },
    &quot;rules&quot;: {
        &quot;indent&quot;: [
            &quot;error&quot;,
            4
        ],
        &quot;linebreak-style&quot;: [
            &quot;error&quot;,
            &quot;windows&quot;
        ],
        &quot;quotes&quot;: [
            &quot;error&quot;,
            &quot;single&quot;
        ],
        &quot;semi&quot;: [
            &quot;error&quot;,
            &quot;never&quot;
        ]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-string">"env"</span>: {
        <span class="hljs-string">"browser"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-string">"commonjs"</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-string">"es6"</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-string">"extends"</span>: <span class="hljs-string">"eslint:recommended"</span>,
    <span class="hljs-string">"parserOptions"</span>: {
        <span class="hljs-string">"sourceType"</span>: <span class="hljs-string">"module"</span>
    },
    <span class="hljs-string">"rules"</span>: {
        <span class="hljs-string">"indent"</span>: [
            <span class="hljs-string">"error"</span>,
            <span class="hljs-number">4</span>
        ],
        <span class="hljs-string">"linebreak-style"</span>: [
            <span class="hljs-string">"error"</span>,
            <span class="hljs-string">"windows"</span>
        ],
        <span class="hljs-string">"quotes"</span>: [
            <span class="hljs-string">"error"</span>,
            <span class="hljs-string">"single"</span>
        ],
        <span class="hljs-string">"semi"</span>: [
            <span class="hljs-string">"error"</span>,
            <span class="hljs-string">"never"</span>
        ]
    }
};</code></pre>
<h2 id="articleHeader5">配置 ESLint</h2>
<p>配置文件生成之后，我们接着可以进行自定义修改，这里我们只粗略讲解常用的配置项，完整的可配置项可访问<a href="http://eslint.cn/docs/user-guide/configuring" rel="nofollow noreferrer" target="_blank">官方文档</a></p>
<h3 id="articleHeader6">配置环境</h3>
<p>在上文生成的配置文件中可以使用 <code>env</code> 属性来指定要启用的环境，将其设置为 <code>true</code>，以保证在进行代码检测时不会把<a href="http://eslint.cn/docs/user-guide/configuring#specifying-environments" rel="nofollow noreferrer" target="_blank">这些环境</a>预定义的全局变量识别成未定义的变量而报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;env&quot;: {
    &quot;browser&quot;: true,
    &quot;commonjs&quot;: true,
    &quot;es6&quot;: true,
    &quot;jquery&quot;: true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"env"</span>: {
    <span class="hljs-string">"browser"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"commonjs"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"es6"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"jquery"</span>: <span class="hljs-literal">true</span>
}</code></pre>
<h3 id="articleHeader7">设置语言选项</h3>
<p>默认情况下，ESLint 支持 ECMAScript 5 语法，如果你想启用对 ECMAScript 其它版本和 JSX 等的支持，ESLint 允许你使用 <code>parserOptions</code> 属性进行指定想要支持的 JavaScript <a href="http://eslint.cn/docs/user-guide/configuring#specifying-parser-options" rel="nofollow noreferrer" target="_blank">语言选项</a>，不过你可能需要自行安装 <code>eslint-plugin-react</code> 等插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;parserOptions&quot;: {
    &quot;ecmaVersion&quot;: 6,
    &quot;sourceType&quot;: &quot;module&quot;,
    &quot;ecmaFeatures&quot;: {
        &quot;jsx&quot;: true
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"parserOptions"</span>: {
    <span class="hljs-string">"ecmaVersion"</span>: <span class="hljs-number">6</span>,
    <span class="hljs-string">"sourceType"</span>: <span class="hljs-string">"module"</span>,
    <span class="hljs-string">"ecmaFeatures"</span>: {
        <span class="hljs-string">"jsx"</span>: <span class="hljs-literal">true</span>
    }
}</code></pre>
<h3 id="articleHeader8">配置规则</h3>
<p>在上文的配置文件中， <code>"extends": "eslint:recommended"</code> 选项表示启用推荐规则，在推荐规则的基础上我们还可以根据需要使用 <code>rules</code> 新增自定义规则，每个规则的第一个值都是代表该规则检测后显示的错误级别：</p>
<ul>
<li><p><code>"off"</code> 或 <code>0</code> - 关闭规则</p></li>
<li><p><code>"warn"</code> 或 <code>1</code> - 将规则视为一个警告</p></li>
<li><p><code>"error"</code> 或 <code>2</code> - 将规则视为一个错误</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;rules&quot;: {
    &quot;indent&quot;: [
        &quot;error&quot;,
        4
    ],
    &quot;linebreak-style&quot;: [
        &quot;error&quot;,
        &quot;windows&quot;
    ],
    &quot;quotes&quot;: [
        &quot;error&quot;,
        &quot;single&quot;
    ],
    &quot;semi&quot;: [
        &quot;error&quot;,
        &quot;never&quot;
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"rules"</span>: {
    <span class="hljs-string">"indent"</span>: [
        <span class="hljs-string">"error"</span>,
        <span class="hljs-number">4</span>
    ],
    <span class="hljs-string">"linebreak-style"</span>: [
        <span class="hljs-string">"error"</span>,
        <span class="hljs-string">"windows"</span>
    ],
    <span class="hljs-string">"quotes"</span>: [
        <span class="hljs-string">"error"</span>,
        <span class="hljs-string">"single"</span>
    ],
    <span class="hljs-string">"semi"</span>: [
        <span class="hljs-string">"error"</span>,
        <span class="hljs-string">"never"</span>
    ]
}</code></pre>
<p>完整的可配置规则列表可访问：<a href="http://eslint.cn/docs/rules/" rel="nofollow noreferrer" target="_blank">http://eslint.cn/docs/rules/</a></p>
<p>其中带 <code>√</code> 标记的表示该规则为推荐规则。</p>
<h2 id="articleHeader9">设置 ESLint 扩展</h2>
<p>安装并配置完成 ESLint 后，我们继续回到 VSCode 进行扩展设置，依次点击 <code>文件 &gt; 首选项 &gt; 设置</code> 打开 VSCode 配置文件</p>
<p><span class="img-wrap"><img data-src="/img/bVMeTj?w=1011&amp;h=763" src="https://static.alili.tech/img/bVMeTj?w=1011&amp;h=763" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVMeVd?w=1920&amp;h=1040" src="https://static.alili.tech/img/bVMeVd?w=1920&amp;h=1040" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>从左侧系统设置中可以看到，ESLint 扩展默认已经启用，我们现在只需在右侧用户设置中添加配置来指定我们创建的 <code>.eslintrc.js</code> 配置文件路径即可启用自定义规则检测，ESLint 会查找并自动读取它们：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;eslint.options&quot;: {
    &quot;configFile&quot;: &quot;E:/git/github/styleguide/eslint/.eslintrc.js&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"eslint.options"</span>: {
    <span class="hljs-attr">"configFile"</span>: <span class="hljs-string">"E:/git/github/styleguide/eslint/.eslintrc.js"</span>
},</code></pre>
<p>至此，我们已经可以使用 ESLint 扩展来检测我们的 js 文件了。</p>
<h3 id="articleHeader10">让 ESLint 支持 Vue 单文件组件</h3>
<p>由于 ESLint 默认只支持 js 文件的脚本检测，如果我们需要支持类 <code>html</code> 文件（如 <code>vue</code>）的内联脚本检测，还需要安装 <code>eslint-plugin-html</code> 插件。</p>
<p>因为我们使用全局安装了 ESLint，所以 <code>eslint-plugin-html</code> 插件也必须进行全局安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g eslint-plugin-html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> -g eslint-<span class="hljs-keyword">plugin</span>-html</code></pre>
<p>安装完成后，我们再次打开 <code>文件 &gt; 首选项 &gt; 设置</code>，在右侧用户设置中修改 ESLint 的相关配置并保存：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;eslint.options&quot;: {
    &quot;configFile&quot;: &quot;E:/git/github/styleguide/eslint/.eslintrc.js&quot;,
    &quot;plugins&quot;: [&quot;html&quot;]
},
&quot;eslint.validate&quot;: [
    &quot;javascript&quot;,
    &quot;javascriptreact&quot;,
    &quot;html&quot;,
    &quot;vue&quot;
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"eslint.options"</span>: {
    <span class="hljs-attr">"configFile"</span>: <span class="hljs-string">"E:/git/github/styleguide/eslint/.eslintrc.js"</span>,
    <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"html"</span>]
},
<span class="hljs-string">"eslint.validate"</span>: [
    <span class="hljs-string">"javascript"</span>,
    <span class="hljs-string">"javascriptreact"</span>,
    <span class="hljs-string">"html"</span>,
    <span class="hljs-string">"vue"</span>
]</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVMeX7?w=1010&amp;h=761" src="https://static.alili.tech/img/bVMeX7?w=1010&amp;h=761" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>最后，我们打开一个 <code>vue</code> 文件，可以发现 ESLint 扩展已经正常工作了，嗯，enjoy yourself (●ˇ∀ˇ●)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 VSCode + ESLint 实践前端编码规范

## 原文链接
[https://segmentfault.com/a/1190000009077086](https://segmentfault.com/a/1190000009077086)

