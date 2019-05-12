---
title: 'vscode个人配置' 
date: 2019-01-06 2:30:10
hidden: true
slug: 4ctgk29pkfe
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">VSCode 的个人配置</h1>
<p>从事前端开发的这段期间,主要用过webstorm、sublime、vscode。对这三个编辑器不能说很熟悉，但也深有体会。有很多论坛或者群里的小伙伴经常讨论他们哪个更好，我觉得，各有各的好处，自己喜欢就好。webstorm集成了很多插件，功能很丰富，但是运行环境要求高，机子不好很容易卡。sublime很轻，感觉有点像nodepad++轻巧，打开文件很快，自从使用vscode后，我就把它当作单文件编辑器使用。个人感觉vscode用起来确实很方便，自带git，也比较轻巧，集合了webstorm和sublime的优点。下面是我对vscode的个人配置，以此记录，方便以后换环境后重新配置。针对vue开发，很多部分部分不完善，仅供参考（持续更新...）</p>
<h2 id="articleHeader1">Vue相关插件:</h2>
<ul>
<li>
<h3 id="articleHeader2">Vetur</h3>
<ul>
<li>语法错误检查，包括 CSS/SCSS/LESS/Javascript/TypeScript</li>
<li>语法高亮，包括 html/jade/pug css/sass/scss/less/stylus js/ts</li>
<li>emmet 支持</li>
<li>代码自动补全（目前还是初级阶段），包括 HTML/CSS/SCSS/LESS/JavaScript/TypeScript</li>
</ul>
</li>
<li>
<h3 id="articleHeader3">VueHelper</h3>
<ul><li>Vue2代码段（包括Vue2 api、vue-router2、vuex2）</li></ul>
</li>
<li>
<h3 id="articleHeader4">wpy-beautify</h3>
<ul><li>Vue代码格式化插件，非常好用</li></ul>
</li>
<li>
<h3 id="articleHeader5">fileHeader</h3>
<ul><li>在文件中插入作者、时间等信息</li></ul>
</li>
<li>
<h3 id="articleHeader6">ESLint</h3>
<ul><li>配合vue-cli中的eslint,检查代码</li></ul>
</li>
</ul>
<h2 id="articleHeader7">其他插件:</h2>
<ul>
<li>
<h3 id="articleHeader8">Code Runner</h3>
<ul><li>VsCode安装包默认内置的node debug插件需要配置工程调试运行文件才能正常运行，对于想要运行一个简单的js文件或者就是一段js代码时比较麻烦，为此可以安装Code Runner插件</li></ul>
</li>
<li>
<h3 id="articleHeader9">Auto Close Tag</h3>
<ul><li>不知道最近更新后的版本中有没有自带闭合标签的功能,如果没有,装一个auto close tag是个不错的选择</li></ul>
</li>
<li>
<h3 id="articleHeader10">Auto Rename Tag</h3>
<ul><li>修改标签时,闭合标签自动修改</li></ul>
</li>
<li>
<h3 id="articleHeader11">Path Autocomplete</h3>
<ul><li>路径自动补全插件</li></ul>
</li>
<li><h3 id="articleHeader12">Betutify</h3></li>
<li><h3 id="articleHeader13">colorize</h3></li>
<li><h3 id="articleHeader14">Git History</h3></li>
</ul>
<h2 id="articleHeader15">vscode设置中的个人配置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // 选择使用的集成终端,根据个人喜好
  &quot;terminal.integrated.shell.windows&quot;: &quot;D:\\Git\\git-cmd.exe&quot;,

  // 一个制表符等于的空格数
  &quot;editor.tabSize&quot;: 2,
  // 呈现空白字符的方式
  &quot;editor.renderWhitespace&quot;: &quot;boundary&quot;,
  // 自带的字体挺好的,不过个人更喜欢Monaco字体
  &quot;editor.fontFamily&quot;: &quot;Monaco&quot;,
  &quot;editor.fontSize&quot;: 13,

  // 启用后，保存文件时在文件末尾插入一个最终新行。
  &quot;files.insertFinalNewline&quot;: true,
  // 启用后，将在保存文件时剪裁尾随空格。
  &quot;files.trimTrailingWhitespace&quot;: true,
  // 加载和侧边栏显示时,忽略的文件/文件夹
  &quot;files.exclude&quot;: {
    &quot;**/.svn&quot;: true,
    &quot;**/.hg&quot;: true,
    &quot;**/.DS_Store&quot;: true,
    // &quot;**/_posts&quot;:true,
    &quot;**/.sass-cache&quot;: true,
    &quot;**/.vscode&quot;: true,
    &quot;**/node_modules&quot;: true,
    &quot;**/.idea&quot;: true
  },

  // vue相关的设置
  &quot;files.associations&quot;: {
    &quot;*.vue&quot;: &quot;vue&quot;
  },
  &quot;emmet.showAbbreviationSuggestions&quot;: true,
  &quot;emmet.showExpandedAbbreviation&quot;: &quot;always&quot;,
  &quot;emmet.includeLanguages&quot;: {
    &quot;vue-html&quot;: &quot;html&quot;,
    &quot;vue&quot;: &quot;html&quot;
  },
  &quot;emmet.syntaxProfiles&quot;: {
    &quot;vue-html&quot;: &quot;html&quot;,
    &quot;vue&quot;: &quot;html&quot;
  },


  // ESLint插件的配置
  &quot;files.autoSave&quot;: &quot;off&quot;,
  &quot;eslint.validate&quot;: [
    &quot;javascript&quot;,
    &quot;javascriptreact&quot;,
    &quot;html&quot;,
    {
      &quot;language&quot;: &quot;vue&quot;,
      &quot;autoFix&quot;: true
    }
  ],
  &quot;eslint.options&quot;: {
    &quot;plugins&quot;: [&quot;html&quot;]
  },

  // fileHeader插件的配置
  &quot;fileheader.Author&quot;: &quot;fmain&quot;,
  &quot;fileheader.LastModifiedBy&quot;: &quot;fmain&quot;,
  &quot;fileheader.tpl&quot;: &quot;<-- Created on {createTime} By {author} -->\n&quot;,
  &quot;fileHeaderComment.parameter&quot;: {
    &quot;*&quot;: {
      &quot;author&quot;: &quot;fmain&quot;,
      &quot;company&quot;: &quot;CAICT&quot;
    }
  },
  &quot;fileHeaderComment.template&quot;: {
    &quot;*&quot;: [
      &quot;/*&quot;,
      &quot;* @Author: ${author}&quot;,
      &quot;* Created on ${datetime24h}&quot;,
      &quot;* Copyright (c) ${year} ${company}&quot;,
      &quot;*/&quot;
    ],
    &quot;-&quot;: [
      &quot;<-- Created by ${author} on ${date} -->&quot;
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>{
  <span class="hljs-comment">// 选择使用的集成终端,根据个人喜好</span>
  <span class="hljs-string">"terminal.integrated.shell.windows"</span>: <span class="hljs-string">"D:\\Git\\git-cmd.exe"</span>,

  <span class="hljs-comment">// 一个制表符等于的空格数</span>
  <span class="hljs-string">"editor.tabSize"</span>: <span class="hljs-number">2</span>,
  <span class="hljs-comment">// 呈现空白字符的方式</span>
  <span class="hljs-string">"editor.renderWhitespace"</span>: <span class="hljs-string">"boundary"</span>,
  <span class="hljs-comment">// 自带的字体挺好的,不过个人更喜欢Monaco字体</span>
  <span class="hljs-string">"editor.fontFamily"</span>: <span class="hljs-string">"Monaco"</span>,
  <span class="hljs-string">"editor.fontSize"</span>: <span class="hljs-number">13</span>,

  <span class="hljs-comment">// 启用后，保存文件时在文件末尾插入一个最终新行。</span>
  <span class="hljs-string">"files.insertFinalNewline"</span>: <span class="hljs-keyword">true</span>,
  <span class="hljs-comment">// 启用后，将在保存文件时剪裁尾随空格。</span>
  <span class="hljs-string">"files.trimTrailingWhitespace"</span>: <span class="hljs-keyword">true</span>,
  <span class="hljs-comment">// 加载和侧边栏显示时,忽略的文件/文件夹</span>
  <span class="hljs-string">"files.exclude"</span>: {
    <span class="hljs-string">"**/.svn"</span>: <span class="hljs-keyword">true</span>,
    <span class="hljs-string">"**/.hg"</span>: <span class="hljs-keyword">true</span>,
    <span class="hljs-string">"**/.DS_Store"</span>: <span class="hljs-keyword">true</span>,
    <span class="hljs-comment">// "**/_posts":true,</span>
    <span class="hljs-string">"**/.sass-cache"</span>: <span class="hljs-keyword">true</span>,
    <span class="hljs-string">"**/.vscode"</span>: <span class="hljs-keyword">true</span>,
    <span class="hljs-string">"**/node_modules"</span>: <span class="hljs-keyword">true</span>,
    <span class="hljs-string">"**/.idea"</span>: <span class="hljs-keyword">true</span>
  },

  <span class="hljs-comment">// vue相关的设置</span>
  <span class="hljs-string">"files.associations"</span>: {
    <span class="hljs-string">"*.vue"</span>: <span class="hljs-string">"vue"</span>
  },
  <span class="hljs-string">"emmet.showAbbreviationSuggestions"</span>: <span class="hljs-keyword">true</span>,
  <span class="hljs-string">"emmet.showExpandedAbbreviation"</span>: <span class="hljs-string">"always"</span>,
  <span class="hljs-string">"emmet.includeLanguages"</span>: {
    <span class="hljs-string">"vue-html"</span>: <span class="hljs-string">"html"</span>,
    <span class="hljs-string">"vue"</span>: <span class="hljs-string">"html"</span>
  },
  <span class="hljs-string">"emmet.syntaxProfiles"</span>: {
    <span class="hljs-string">"vue-html"</span>: <span class="hljs-string">"html"</span>,
    <span class="hljs-string">"vue"</span>: <span class="hljs-string">"html"</span>
  },


  <span class="hljs-comment">// ESLint插件的配置</span>
  <span class="hljs-string">"files.autoSave"</span>: <span class="hljs-string">"off"</span>,
  <span class="hljs-string">"eslint.validate"</span>: [
    <span class="hljs-string">"javascript"</span>,
    <span class="hljs-string">"javascriptreact"</span>,
    <span class="hljs-string">"html"</span>,
    {
      <span class="hljs-string">"language"</span>: <span class="hljs-string">"vue"</span>,
      <span class="hljs-string">"autoFix"</span>: <span class="hljs-keyword">true</span>
    }
  ],
  <span class="hljs-string">"eslint.options"</span>: {
    <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"html"</span>]
  },

  <span class="hljs-comment">// fileHeader插件的配置</span>
  <span class="hljs-string">"fileheader.Author"</span>: <span class="hljs-string">"fmain"</span>,
  <span class="hljs-string">"fileheader.LastModifiedBy"</span>: <span class="hljs-string">"fmain"</span>,
  <span class="hljs-string">"fileheader.tpl"</span>: <span class="hljs-string">"&lt;-- Created on {createTime} By {author} --&gt;\n"</span>,
  <span class="hljs-string">"fileHeaderComment.parameter"</span>: {
    <span class="hljs-string">"*"</span>: {
      <span class="hljs-string">"author"</span>: <span class="hljs-string">"fmain"</span>,
      <span class="hljs-string">"company"</span>: <span class="hljs-string">"CAICT"</span>
    }
  },
  <span class="hljs-string">"fileHeaderComment.template"</span>: {
    <span class="hljs-string">"*"</span>: [
      <span class="hljs-string">"/*"</span>,
      <span class="hljs-string">"* @Author: <span class="hljs-subst">${author}</span>"</span>,
      <span class="hljs-string">"* Created on <span class="hljs-subst">${datetime24h}</span>"</span>,
      <span class="hljs-string">"* Copyright (c) <span class="hljs-subst">${year}</span> <span class="hljs-subst">${company}</span>"</span>,
      <span class="hljs-string">"*/"</span>
    ],
    <span class="hljs-string">"-"</span>: [
      <span class="hljs-string">"&lt;-- Created by <span class="hljs-subst">${author}</span> on <span class="hljs-subst">${date}</span> --&gt;"</span>
    ]
  }
}</code></pre>
<p>传送门: <a href="http://m.blog.csdn.net/i10630226/article/details/75175120" rel="nofollow noreferrer" target="_blank">VSCode使用技巧</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vscode个人配置

## 原文链接
[https://segmentfault.com/a/1190000010434986](https://segmentfault.com/a/1190000010434986)

