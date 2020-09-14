---
title: 'eslint prettier的配置选项（参数）官网直译' 
date: 2018-12-17 2:30:06
hidden: true
slug: j4yewobfx9n
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">prettier的配置选项（参数）官网直译</h1>
<p>ATTENTION PLEASE:<br>本翻译仅用于学习交流，禁止商业用途。请参考<a href="https://prettier.io/docs/en/options.html" rel="nofollow noreferrer" target="_blank">prettier官网</a></p>
<p>我刚刚接触文档翻译，英语自打大学英语六级（CET-6）通过后就在没有提升过，现在基本上都快还给我的英语老师了@_@。直至发稿时，全网（百度）搜索没有发现一片像样的文档，好事心又开始作怪，发出来就当祭天了（估计老天爷都嫌弃文笔差，最近看《明朝那些事儿》才知道祭天得用一种叫做“青词”的专用文章，这事大奸臣严嵩的儿子做得好。。。。。）。好啦，不啰嗦了，如果有大神发现有错误，或者更好的翻译，欢迎带锤子来读（万分感激！）</p>
<h2 id="articleHeader1">参数</h2>
<p>Prettier工具少数几个可以定制的参数，在CLI命令行和配置文件中均可用。</p>
<h3 id="articleHeader2">Print Width</h3>
<p>设置prettier单行输出（不折行）的（最大）长度。</p>
<p>出于代码的可读性，我们不推荐（单行）超过80个字符的coding方式。</p>
<p>在代码的书写手册中，单行最大长度常被设置为100或120。但是，人们写代码时，不会刻意的使每行都达到这个上限值。为便于阅读，开发者们通常使用空格将过长的单行变成多行。最佳实践是，每行的平均长度应当小于这个上限值。<br>另一方面，Prettier 会尽力让代码在一行（所以链式调用就都被搞到一行了，不得不吐槽了^~^）。当print width被设置成120时，工具有可能产出过于紧凑的或是其他不尽人意的代码。</p>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>80</td>
<td>--print-width &nbsp;&lt;int&gt;</td>
<td>printWidth: &lt;int&gt;</td>
</tr></tbody>
</table>
<p>注：如果在格式markdown时，不想折行，请设置 prose wrap参数来禁止这一行为。</p>
<h3 id="articleHeader3">Tab Width</h3>
<p>设置工具每一个水平缩进的空格数</p>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>2</td>
<td>--tab-width &nbsp;&lt;int&gt;</td>
<td>tabWidth: &lt;int&gt;</td>
</tr></tbody>
</table>
<h3 id="articleHeader4">Tabs</h3>
<p>使用tab（制表位）缩进而非空格；</p>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>false</td>
<td>--use-tabs</td>
<td>useTabs: &lt;bool&gt;</td>
</tr></tbody>
</table>
<h3 id="articleHeader5">Semicolons</h3>
<p>在语句末尾添加分号；</p>
<p>有效参数：</p>
<ul>
<li>true - 在每一条语句后面添加分号</li>
<li>false - 只在有可能导致ASI错误的行首添加分号</li>
</ul>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>true</td>
<td>--mo-semi</td>
<td>semi: &lt;bool&gt;</td>
</tr></tbody>
</table>
<h3 id="articleHeader6">Quotes</h3>
<p>使用单引号而非双引号；</p>
<p>提示：</p>
<ul>
<li>在JSX语法中，所有引号均为双引号，该设置在JSX中被自动忽略</li>
<li>在字符串中，如果一种引号在数量上超过另一种引号，数量少的引号，将被用于格式化字符串；示例："I 'm double quoted "被格式化后是："I 'm double quoted "(我觉得这里好像有点问题，但是亲测例子结果就是这样，按理说被较少使用的是单引号，但是例子就是双引号包裹的，尊重原文吧) ；再例："This \"example\" is single quoted "格式化过后：'This "example" is single quoted '</li>
</ul>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>false</td>
<td>--single-quote</td>
<td>singleQuote: &lt;bool&gt;</td>
</tr></tbody>
</table>
<h3 id="articleHeader7">Trailing Commas (尾逗号[a,b,c,d,] 数组项d后面的逗号就是尾逗号)</h3>
<p>在任何可能的多行中输入尾逗号。</p>
<p>有效参数：</p>
<ul>
<li>&nbsp;none&nbsp; - 无尾逗号；</li>
<li>&nbsp;es5&nbsp; - 添加es5中被支持的尾逗号；</li>
<li>&nbsp;all&nbsp; - 所有可能的地方都被添加尾逗号；（包括函数参数），这个参数需要安装nodejs8或更高版本；</li>
</ul>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>none</td>
<td>--trailing-comma  &lt;none \ es5 \ all &gt;</td>
<td>trailingCommas: &lt;none \ es5 \ all&gt;</td>
</tr></tbody>
</table>
<h3 id="articleHeader8">Bracket Spacing (括号空格)</h3>
<p>在对象字面量声明所使用的的花括号后（{）和前（}）输出空格</p>
<p>有效参数：</p>
<ul>
<li>true - Example: { &nbsp; foo:&nbsp;bar &nbsp;}</li>
<li>false - Example: {foo:&nbsp;bar}</li>
</ul>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>true</td>
<td>--none-bracket-spacing</td>
<td>bracketSpacing: &lt;bool&gt;</td>
</tr></tbody>
</table>
<h3 id="articleHeader9">JSX Bracket上</h3>
<p>在多行JSX元素最后一行的末尾添加 &gt; 而使 &gt; 单独一行（不适用于自闭和元素）</p>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>false</td>
<td>--jsx-bracket-same-line</td>
<td>jsxBracketSameLinte: &lt;bool&gt;</td>
</tr></tbody>
</table>
<h3 id="articleHeader10">Arrow Function Parentheses (适用于v1.9.0+)</h3>
<p>为单行箭头函数的参数添加圆括号。</p>
<p>有效参数：</p>
<ul>
<li>" avoid " - 尽可能不添加圆括号，示例：x =&gt; x</li>
<li>" always " - 总是添加圆括号，示例： (x) =&gt; x</li>
</ul>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>" avoid "</td>
<td>--arrow-parens &lt; avoid \ always &gt;</td>
<td>alwaysParens: &lt;avoid \ always&gt;</td>
</tr></tbody>
</table>
<h3 id="articleHeader11">Range</h3>
<p>只格式化某个文件的一部分；</p>
<p>这两个参数可以用于从指定起止偏移字符(单独指定开始或结束、两者同时指定、分别指定)格式化代码。<br>一下情况，范围将会扩展：</p>
<ul>
<li>回退至包含选中语句的第一行的开始</li>
<li>向前直到选中语句的末尾</li>
</ul>
<p>注意：这些参数不可以同cursorOffset共用；</p>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody>
<tr>
<td>0</td>
<td>--range-start-&lt; int &gt;</td>
<td>rangeStart: &lt; int &gt;</td>
</tr>
<tr>
<td>Infinity</td>
<td>--range-end-&lt; int &gt;</td>
<td>rangeEnd: &lt; int &gt;</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader12">Parser</h3>
<p>指定使用哪一种解析器。</p>
<p>babylon和flow都支持同一套JavaScript特性（包括Flow）.Prettier将自动根据文件的输入路径选择解析器，如非必要，不要修改该项设置。</p>
<p>内置的解析器包含：</p>
<ul>
<li>babylon</li>
<li>flow</li>
<li>typescript v1.4.0+（是指Prettier的版本，并包含该版本，下同）</li>
<li>postcss v1.4.0+</li>
<li>json v1.5.0+</li>
<li>graphql v1.5.0+</li>
<li>markdown v1.8.0+</li>
<li>用户自定义解析器 v1.5.0+</li>
</ul>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>babylon</td>
<td>--parser &lt; string  &lt;br/&gt; --parser ./my-parser</td>
<td>parser: " &lt;string&gt; " &lt;br/&gt; parser: require(" ./my-parserrr ")</td>
</tr></tbody>
</table>
<h3 id="articleHeader13">FilePath</h3>
<p>指定文件的输入路径，这将被用于解析器参照。<br>示例：下面的将使用postcss解析器</p>
<p><code>cat foo | prettier --stdin-filepath foo.css</code></p>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>None</td>
<td>--stdin-filepath &lt;string&gt;</td>
<td>filePath: " &lt;string&gt; "</td>
</tr></tbody>
</table>
<h3 id="articleHeader14">Require pragma (v1.7.0+)</h3>
<p>Prettier可以严格按照按照文件顶部的一些特殊的注释格式化代码，这些注释称为“require pragma”(必须杂注)。这在逐步格式化一些大型、未经格式化过的代码是十分有用的。<br>例如，一个带有下面注释的文件将在执行带有 --require-pragma的cli指令（api配置文件亦可）时被格式化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
        /**
        *@prettier
        */

    或

        /**
        *@format
        */
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>
        <span class="hljs-comment">/**
        *<span class="hljs-doctag">@prettier</span>
        */</span>

    或

        <span class="hljs-comment">/**
        *<span class="hljs-doctag">@format</span>
        */</span>
</code></pre>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>false</td>
<td>--require-pragma</td>
<td>requirePragma: &lt;bool&gt;</td>
</tr></tbody>
</table>
<h3 id="articleHeader15">Insert Pragma (v1.8.0+)</h3>
<p>Prettier可以在文件的顶部插入一个 @format的特殊注释，以表明改文件已经被Prettier格式化过了。在使用 --require-pragma参数处理一连串的文件时这个功能将十分有用。如果文件顶部已经有一个doclock，这个选项将新建一行注释，并打上@format标记。</p>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>false</td>
<td>--insert-pragma</td>
<td>insertPragma: &lt;bool&gt;</td>
</tr></tbody>
</table>
<h3 id="articleHeader16">Prose Wrap(v1.8.2+)</h3>
<p>默认情况下，Prettier会因为使用了一些折行敏感型的渲染器（如GitHub comment 和 BitBucket）而按照markdown文本样式进行折行，但在某些情况下，你可能只是希望这个文本在编译器或查看器中soft-wrapping（是当屏幕放不下时发生的软折行），所以这一参数允许设置为 " never "</p>
<p>有效参数：</p>
<ul>
<li>" always " - 当超出print width（上面有这个参数）时就折行</li>
<li>" never " - 不折行</li>
<li>" perserve " - 按照文件原样折行 （v1.9.0+）</li>
</ul>
<table>
<thead><tr>
<th>默认值</th>
<th>CLI(命令行参数)重写（覆盖）默认值</th>
<th>API重写(配置文件)</th>
</tr></thead>
<tbody><tr>
<td>" preserve "</td>
<td>--prose-wrap &lt;always \ neve \preserver &gt;</td>
<td>proseWrap:&lt;always \ never \ preserver &gt;</td>
</tr></tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
eslint prettier的配置选项（参数）官网直译

## 原文链接
[https://segmentfault.com/a/1190000012909159](https://segmentfault.com/a/1190000012909159)

