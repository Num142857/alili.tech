---
title: 能让你开发效率翻倍的 VSCode 插件配置（上）
hidden: true
categories: [reprint]
slug: f2752c38
date: 2018-10-23 00:00:00
---

{{< raw >}}

                    
<p>工欲善其事必先利其器，软件工程师每天打交道最多的可能就是编辑器了。入行几年来，先后折腾过的编辑器有 EditPlus、UltraEdit、Visual Studio、EClipse、WebStorm、Vim、SublimeText、Atom、VSCode，现在仍高频使用的就是 <a href="https://code.visualstudio.com" rel="nofollow noreferrer" target="_blank">VSCode</a> 和 <a href="http://www.vim.org" rel="nofollow noreferrer" target="_blank">Vim</a> 了。实际上我在 VSCode 里面安装了 Vim 插件，用 Vim 的按键模式编码，因为自从发现双手不离键盘带来的效率提升之后，就尽可能的不去摸鼠标。</p>
<p>折腾过 Atom 的我，首次试用 VSCode 就有种 Vim 的轻量感，试用之后果断弃坑 Atom。Atom 之前，我还使用过 SublimeText，但它在保存文件时会不时弹出购买授权的弹窗，实在是令人烦恼。</p>
<p>每每上手新的编辑器，我都会根据自己的开发习惯把它调较到理想状态，加上熟悉编辑器各种特性，这个过程通常需要几周的时间。接下来，我就从外观配置、风格检查、编码效率、功能增强等 4 方面来侃侃怎么配置 VSCode 来提高工作幸福感。</p>
<h2 id="articleHeader0">外观配置</h2>
<p>外观是最先考虑的部分，从配置的角度，无非是配色、图标、字体等，俗话说萝卜白菜各有所爱，我目前的配色、图标、字体从下图基本都能看出来，供大家参考：</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000011982047?w=2872&amp;h=1754" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="" title="" style="cursor: pointer;"></span></p>
<ul>
<li><p>配色：<a href="http://ethanschoonover.com/solarized" rel="nofollow noreferrer" target="_blank">Solarized Dark</a>，VSCode 已经内置，使用了至少 5 年以上的主题，Vim 下的配置完全相同；</p></li>
<li><p>图标：<a href="https://marketplace.visualstudio.com/items?itemName=emmanuelbeziat.vscode-great-icons" rel="nofollow noreferrer" target="_blank">VSCode Great Icons</a>，给不同类型的文件配置不同的图标，非常直观；</p></li>
<li><p>字体：<a href="https://github.com/tonsky/FiraCode/wiki/VS-Code-Instructions" rel="nofollow noreferrer" target="_blank">Fira Code</a>，自从发现并开始使用 <a href="https://github.com/tonsky/FiraCode" rel="nofollow noreferrer" target="_blank">Fira Code</a>，我就再也没多看自其它字体一眼，字体如果比较优雅，尤其是对数学运算符的处理，写代码时你真的会感觉在写诗，哈哈，Fira Code 的安装过程稍微复杂点，但是效果绝对是值当的；</p></li>
</ul>
<p>配色、图标、字体以及其他外观配置项具体如下（注意，如果不安装上述插件，部分配置项如果直接使用是无效的）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;editor.cursorStyle&quot;: &quot;block&quot;,
  &quot;editor.fontFamily&quot;: &quot;Fira Code&quot;,
  &quot;editor.fontLigatures&quot;: true,
  &quot;editor.fontSize&quot;: 16,
  &quot;editor.lineHeight&quot;: 24,
  &quot;editor.lineNumbers&quot;: &quot;on&quot;,
  &quot;editor.minimap.enabled&quot;: false,
  &quot;editor.renderIndentGuides&quot;: false,
  &quot;editor.rulers&quot;: [120],
  &quot;workbench.colorTheme&quot;: &quot;Solarized Dark&quot;,
  &quot;workbench.iconTheme&quot;: &quot;vscode-great-icons&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"editor.cursorStyle"</span>: <span class="hljs-string">"block"</span>,
  <span class="hljs-attr">"editor.fontFamily"</span>: <span class="hljs-string">"Fira Code"</span>,
  <span class="hljs-attr">"editor.fontLigatures"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">"editor.fontSize"</span>: <span class="hljs-number">16</span>,
  <span class="hljs-attr">"editor.lineHeight"</span>: <span class="hljs-number">24</span>,
  <span class="hljs-attr">"editor.lineNumbers"</span>: <span class="hljs-string">"on"</span>,
  <span class="hljs-attr">"editor.minimap.enabled"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">"editor.renderIndentGuides"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">"editor.rulers"</span>: [<span class="hljs-number">120</span>],
  <span class="hljs-attr">"workbench.colorTheme"</span>: <span class="hljs-string">"Solarized Dark"</span>,
  <span class="hljs-attr">"workbench.iconTheme"</span>: <span class="hljs-string">"vscode-great-icons"</span>
}</code></pre>
<h2 id="articleHeader1">风格检查</h2>
<p>之前我写过一篇在 Git 提交环节保障代码风格的文章：<a href="https://juejin.im/post/592615580ce463006bf19aa0" rel="nofollow noreferrer" target="_blank">《使用 husky 和 lint-staged 打造超溜的代码检查工作流》</a>。如果编辑器在编码时实时给出反馈，对开发者个人而言才是最高效的，在提交时做强制检查只是从团队的视角保证编码风格的规范性和一致性。前端工程师会书写的代码无非是：HTML、CSS、Javascript、Markdown、TypeScript、JSON，对应的 Lint 工具就显而易见：</p>
<ul>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" rel="nofollow noreferrer" target="_blank">ESLint</a>：插件式架构，有多种主流的编码风格规则集可供选择，典型的有 <a href="https://www.npmjs.com/package/eslint-config-airbnb" rel="nofollow noreferrer" target="_blank">Airbnb</a>、<a href="https://github.com/google/eslint-config-google" rel="nofollow noreferrer" target="_blank">Google</a> 等，你甚至可以攒个自己的，按下不表；</p></li>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint" rel="nofollow noreferrer" target="_blank">StyleLint</a>，同样插件式架构的样式检查工具，不过我在配置其检查 <a href="https://facebook.github.io/react-native" rel="nofollow noreferrer" target="_blank">react-native</a> 中 <a href="https://styled-components.com" rel="nofollow noreferrer" target="_blank">styled-components</a> 组件样式时确实费了不小的功夫，可以单独写篇文章了；</p></li>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=eg2.tslint" rel="nofollow noreferrer" target="_blank">TSLint</a>：TypeScript 目前不是我的主要编程语言，但也早早的准备好了；</p></li>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint" rel="nofollow noreferrer" target="_blank">MarkdownLint</a>：Markdown 如果不合法，可能在某些场合导致解析器异常，因为 Markdown 有好几套标准，在不同标准间部分语法支持可能是不兼容的；</p></li>
</ul>
<p>除上面列的 Lint 工具之外，非常值得拥有的还有 <a href="https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig" rel="nofollow noreferrer" target="_blank">EditorConfig</a> 插件，几乎所有主流 IDE 都有支持，我们可以通过简单的配置文件在不同团队成员、不同 IDE、不同平台下约定好文件的缩进方式、编码格式，避免出现混乱，下面是我常用的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[*]
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = false
insert_final_newline = true
indent_style = space
indent_size = 2

[{*.yml,*.json}]
indent_style = space
indent_size = 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="ini hljs"><code class="ini"><span class="hljs-section">[*]</span>
<span class="hljs-attr">end_of_line</span> = lf
<span class="hljs-attr">charset</span> = utf-<span class="hljs-number">8</span>
<span class="hljs-attr">trim_trailing_whitespace</span> = <span class="hljs-literal">false</span>
<span class="hljs-attr">insert_final_newline</span> = <span class="hljs-literal">true</span>
<span class="hljs-attr">indent_style</span> = space
<span class="hljs-attr">indent_size</span> = <span class="hljs-number">2</span>
<span class="hljs-section">
[{*.yml,*.json}]</span>
<span class="hljs-attr">indent_style</span> = space
<span class="hljs-attr">indent_size</span> = <span class="hljs-number">2</span></code></pre>
<p>有了风格检查，自然就会产生按配置好的风格规则做文件格式化的需求，格式化的工具试用了好多，现在还在用的如下：</p>
<ul>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" rel="nofollow noreferrer" target="_blank">Prettier</a>，实际上已经是代码格式化的<a href="https://prettier.io" rel="nofollow noreferrer" target="_blank">工具标准</a>，支持格式化几乎所有的前端代码，并且类似于 EditorConfig 支持用文件来配置格式规则；</p></li>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" rel="nofollow noreferrer" target="_blank">Vetur</a>，格式化 .vue 文件，包括里面的 CSS、JS，至于模板即 HTML 部分，官方维护者说没有比较好的工具支持，默认是不格式化的；</p></li>
</ul>
<h2 id="articleHeader2">编码效率</h2>
<p>说到编码效率，连续六年几乎每天都编码的我目前最大的感受是：击键的速度越来越跟不上思维的速度，这种情况下，就需要在编码时设置适当的快捷键，组合使用智能建议、代码片段、自动补全来达到速度的最大化。</p>
<p>VSCode 内置的智能建议已经非常强大，不过我对默认的配置做了如下修改，以达到类似于在 Vim 中那样在任何地方都启用智能提示（尤其是注释和字符串里面）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;editor.quickSuggestions&quot;: {
    &quot;other&quot;: true,
    &quot;comments&quot;: true,
    &quot;strings&quot;: true
  },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"editor.quickSuggestions"</span>: {
    <span class="hljs-attr">"other"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"comments"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"strings"</span>: <span class="hljs-literal">true</span>
  },
}</code></pre>
<p>接下来，重点说说代码片段和自动补全两个效率提升利器。</p>
<h3 id="articleHeader3">代码片段</h3>
<p>英文叫做 <a href="https://code.visualstudio.com/docs/editor/userdefinedsnippets" rel="nofollow noreferrer" target="_blank">Snippets</a>，市面上主流的编辑器也都支持，其基本思想就是把常见的代码模式抽出来，通过 2~3 个键就能展开 N 行代码，代码片段的积累一方面是根据个人习惯，另一方面是学习社区里面积累出来的好的编码模式，如果觉得不适合你，可以改（找个现有的插件依葫芦画瓢），我常用的代码片段插件如下：</p>
<ul>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=abusaidm.html-snippets" rel="nofollow noreferrer" target="_blank">HTML Snippets</a>，各种 HTML 标签片段，如果你 Emmet 玩的熟，完全可以忽略这个；</p></li>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets" rel="nofollow noreferrer" target="_blank">Javascript (ES6) Code Snippets</a>，常用的类声明、ES 模块声明、CMD 模块导入等，支持的缩写不下 20 种；</p></li>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=nikhilkumar80.js-patterns-snippets" rel="nofollow noreferrer" target="_blank">Javascript Patterns Snippets</a>，常见的编码模式，比如 IIFE；</p></li>
</ul>
<h3 id="articleHeader4">自动补全</h3>
<p>自动补全本质上和代码片段类似，不过是在特殊场合下以你的键入做为启发式信息提供最有可能要输入的建议，我常用的自动补全工具有：</p>
<ul>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag" rel="nofollow noreferrer" target="_blank">Auto Close Tag</a>，适用于 JSX、Vue、HTML，在打开标签并且键入 <code>&lt;/</code> 的时候，能自动补全要闭合的标签；</p></li>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag" rel="nofollow noreferrer" target="_blank">Auto Rename Tag</a>，适用于 JSX、Vue、HTML，在修改标签名时，能在你修改开始（结束）标签的时候修改对应的结束（开始）标签，帮你减少 50% 的击键；</p></li>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense" rel="nofollow noreferrer" target="_blank">Path Intellisense</a>，文件路径补全，在你用任何方式引入文件系统中的路径时提供智能提示和自动完成；</p></li>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense" rel="nofollow noreferrer" target="_blank">NPM Intellisense</a>，NPM 依赖补全，在你引入任何 node_modules 里面的依赖包时提供智能提示和自动完成；</p></li>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion" rel="nofollow noreferrer" target="_blank">IntelliSense for CSS class names</a>，CSS 类名补全，会自动扫描整个项目里面的 CSS 类名并在你输入类名时做智能提示；</p></li>
<li><p><a href="https://emmet.io" rel="nofollow noreferrer" target="_blank">Emmet</a>，以前叫做 Zen Coding，我发现后，也是爱不释手，可以把类 CSS 选择符的字符串展开成 HTML 标签，VSCode 已经内置，官方介绍文档<a href="https://code.visualstudio.com/docs/editor/emmet" rel="nofollow noreferrer" target="_blank">参见</a>，你需要做的就是熟悉他的语法，并勤加练习；</p></li>
</ul>
<p>当然，如果你还用 VSCode 编写其他语言的代码，比如 PHP，就去市场上搜索 “PHP Intellisense” 好了。</p>
<h2 id="articleHeader5">功能增强</h2>
<p>在效率提升方面除了上面的代码片段、自动补全之外，我还安装了下面几个插件，方便快速的浏览和理解代码，并且在不同项目之间切换。</p>
<ul>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight" rel="nofollow noreferrer" target="_blank">Color Highlight</a>，识别代码中的颜色，包括各种颜色格式；</p></li>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer" rel="nofollow noreferrer" target="_blank">Bracket Pair Colorizer</a>，识别代码中的各种括号，并且标记上不同的颜色，方便你扫视到匹配的括号，在括号使用非常多的情况下能环节眼部压力，编辑器快捷键固然好用，但是在临近嵌套多的情况下却有些力不从心；</p></li>
<li><p><a href="https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager" rel="nofollow noreferrer" target="_blank">Project Manager</a>，项目管理，让我们方便的在命令面板中切换项目文件夹，当然，你也可以直接打开包含多个项目的父级文件夹，但这样可能会让 VSCode 变慢；</p></li>
</ul>
<h2 id="articleHeader6">结语</h2>
<p>说了这么多，相信读到这里的你也期望用工具来提高自己的效率。</p>
<p>提高效率有没有法门？是有的，简单的事情重复化，重复的事情标准化，标准的事情自动化，发现一个痛点，用插件解决一个痛点，你的效率自然就上来了。</p>
<p>你都用了哪些插件呢？欢迎留言交流！</p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000011982042](https://segmentfault.com/a/1190000011982042)

## 原文标题
能让你开发效率翻倍的 VSCode 插件配置（上）
