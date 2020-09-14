---
title: 'vscode一格式化就报错？各种风格问题各种报错烦不胜烦，教你如何用好vue的eslint风格配置' 
date: 2018-12-05 2:30:09
hidden: true
slug: aca8zcmi9sg
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>感觉搭建一个舒服的前端开发环境，十分的重要定制化的格式化，编辑器自带的格式化各种报错，手动改真的会死人，因此搭建一个编辑器环境必不可少，现在要讲的是vscode中如何定制vue</p>
<p><strong>vs code的配置文件</strong>:</p>
<p><span class="img-wrap"><img data-src="/img/bV8ox2?w=656&amp;h=244" src="https://static.alili.tech/img/bV8ox2?w=656&amp;h=244" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>format相关:搜索format，你会看到很多默认的格式化配置项。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV8ox8?w=654&amp;h=777" src="https://static.alili.tech/img/bV8ox8?w=654&amp;h=777" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>更改format配置你可以选择想要更改的内容，复制到右边进行更改，当然，有些配置项是装好插件才会出来的。后面所说的设置配置文件都是修改右边这里哦～</p>
<p><span class="img-wrap"><img data-src="/img/bV8oya?w=648&amp;h=153" src="https://static.alili.tech/img/bV8oya?w=648&amp;h=153" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>安装插件:非常简单咯，点击左侧图标，然后输入你想搜索的名字就好了。当然有些插件可能没有被官方采纳。你也可以去github上下载。</p>
<p><span class="img-wrap"><img data-src="/img/bV8oyb?w=397&amp;h=303" src="https://static.alili.tech/img/bV8oyb?w=397&amp;h=303" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>所以:你想要一个什么样的格式化基本上都可以实现，阅读一下不同插件的github里面的readme就可以了。</p>
<hr>
<h3 id="articleHeader1">1 ESLint格式化</h3>
<blockquote><strong>安装插件：ESLint</strong></blockquote>
<p>如果题主认真读了ESLint的Readme的话，应该可以写出下面的配置了。不过我还是写一下好了。<br>用来格式化和提示格式错误。设置文件类型:<br><span class="img-wrap"><img data-src="/img/bV8oyc?w=443&amp;h=201" src="https://static.alili.tech/img/bV8oyc?w=443&amp;h=201" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>设置配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;workbench.startupEditor&quot;: &quot;welcomePage&quot;,
  &quot;editor.tabSize&quot;: 2,
  &quot;eslint.autoFixOnSave&quot;: true,
  &quot;eslint.validate&quot;: [
    &quot;javascript&quot;,
    &quot;javascriptreact&quot;,
    {
      &quot;language&quot;: &quot;html&quot;,
      &quot;autoFix&quot;: true
    },
    {
      &quot;language&quot;: &quot;vue&quot;,
      &quot;autoFix&quot;: true
    }
  ]
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"workbench.startupEditor"</span>: <span class="hljs-string">"welcomePage"</span>,
  <span class="hljs-attr">"editor.tabSize"</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">"eslint.autoFixOnSave"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">"eslint.validate"</span>: [
    <span class="hljs-string">"javascript"</span>,
    <span class="hljs-string">"javascriptreact"</span>,
    {
      <span class="hljs-attr">"language"</span>: <span class="hljs-string">"html"</span>,
      <span class="hljs-attr">"autoFix"</span>: <span class="hljs-literal">true</span>
    },
    {
      <span class="hljs-attr">"language"</span>: <span class="hljs-string">"vue"</span>,
      <span class="hljs-attr">"autoFix"</span>: <span class="hljs-literal">true</span>
    }
  ]
}

</code></pre>
<hr>
<h3 id="articleHeader2">2 在Vue项目中的ESLint</h3>
<blockquote>安装插件：Vetur</blockquote>
<p>其实在工作中，我们往往不喜欢常常去按保存键，或者在保存之前想先格式化一下再继续写。因此，我采用了下面的方式：  默认自带了格式化的功能，快捷键是shift+option+f（mac）。主要用来格式化复制粘贴的代码。ESLint  在编码过程中提示格式错误，养成良好的编码习惯。</p>
<p><strong>设置文件类型:</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV8oyg?w=394&amp;h=193" src="https://static.alili.tech/img/bV8oyg?w=394&amp;h=193" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>设置配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;vetur.format.defaultFormatter.html&quot;: &quot;prettier&quot; //这是vue中html的格式化
  &quot;workbench.startupEditor&quot;: &quot;welcomePage&quot;,
  &quot;vetur.format.defaultFormatter.js&quot;: &quot;vscode-typescript&quot;,
  &quot;javascript.format.insertSpaceBeforeFunctionParenthesis&quot;: true,
  &quot;editor.quickSuggestions&quot;: {
    &quot;strings&quot;: true
  },
  &quot;editor.tabSize&quot;: 2,
  &quot;eslint.validate&quot;: [
    &quot;javascript&quot;,
    &quot;javascriptreact&quot;,
    &quot;html&quot;,
    &quot;vue&quot;,
    {
      &quot;language&quot;: &quot;html&quot;,
      &quot;autoFix&quot;: true
    }
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"vetur.format.defaultFormatter.html"</span>: <span class="hljs-string">"prettier"</span> //这是vue中html的格式化
  <span class="hljs-string">"workbench.startupEditor"</span>: <span class="hljs-string">"welcomePage"</span>,
  <span class="hljs-attr">"vetur.format.defaultFormatter.js"</span>: <span class="hljs-string">"vscode-typescript"</span>,
  <span class="hljs-attr">"javascript.format.insertSpaceBeforeFunctionParenthesis"</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">"editor.quickSuggestions"</span>: {
    <span class="hljs-attr">"strings"</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">"editor.tabSize"</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">"eslint.validate"</span>: [
    <span class="hljs-string">"javascript"</span>,
    <span class="hljs-string">"javascriptreact"</span>,
    <span class="hljs-string">"html"</span>,
    <span class="hljs-string">"vue"</span>,
    {
      <span class="hljs-attr">"language"</span>: <span class="hljs-string">"html"</span>,
      <span class="hljs-attr">"autoFix"</span>: <span class="hljs-literal">true</span>
    }
  ]
}
</code></pre>
<h3 id="articleHeader3">3 JS中的格式化</h3>
<blockquote>安装插件：Javascript Standard Style</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV8oyj?w=500&amp;h=360" src="https://static.alili.tech/img/bV8oyj?w=500&amp;h=360" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>设置文件类型:</strong><br><span class="img-wrap"><img data-src="/img/bV8oyk?w=500&amp;h=122" src="https://static.alili.tech/img/bV8oyk?w=500&amp;h=122" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">4 废话少说，装好上面三个插件，大家可以参考我的配置，直接复制进去就行了</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;editor.fontSize&quot;: 19,
    &quot;workbench.colorTheme&quot;: &quot;Monokai&quot;,
    &quot;workbench.startupEditor&quot;: &quot;welcomePage&quot;,
    &quot;editor.tabSize&quot;: 2,
    &quot;eslint.autoFixOnSave&quot;: true,
    &quot;vetur.format.defaultFormatter.js&quot;: &quot;vscode-typescript&quot;,
    &quot;javascript.format.insertSpaceBeforeFunctionParenthesis&quot;: true,
    &quot;editor.quickSuggestions&quot;: {
        &quot;strings&quot;: true
    },
    &quot;eslint.validate&quot;: [
        &quot;javascript&quot;,
        &quot;javascriptreact&quot;,
        &quot;html&quot;,
        &quot;vue&quot;,
        {
            &quot;language&quot;: &quot;html&quot;,
            &quot;autoFix&quot;: true
        }
    ],
    &quot;files.autoSave&quot;: &quot;afterDelay&quot;,
    &quot;vetur.format.defaultFormatter.html&quot;: &quot;prettier&quot;  
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"editor.fontSize"</span>: <span class="hljs-number">19</span>,
    <span class="hljs-attr">"workbench.colorTheme"</span>: <span class="hljs-string">"Monokai"</span>,
    <span class="hljs-attr">"workbench.startupEditor"</span>: <span class="hljs-string">"welcomePage"</span>,
    <span class="hljs-attr">"editor.tabSize"</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">"eslint.autoFixOnSave"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"vetur.format.defaultFormatter.js"</span>: <span class="hljs-string">"vscode-typescript"</span>,
    <span class="hljs-attr">"javascript.format.insertSpaceBeforeFunctionParenthesis"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">"editor.quickSuggestions"</span>: {
        <span class="hljs-attr">"strings"</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">"eslint.validate"</span>: [
        <span class="hljs-string">"javascript"</span>,
        <span class="hljs-string">"javascriptreact"</span>,
        <span class="hljs-string">"html"</span>,
        <span class="hljs-string">"vue"</span>,
        {
            <span class="hljs-attr">"language"</span>: <span class="hljs-string">"html"</span>,
            <span class="hljs-attr">"autoFix"</span>: <span class="hljs-literal">true</span>
        }
    ],
    <span class="hljs-attr">"files.autoSave"</span>: <span class="hljs-string">"afterDelay"</span>,
    <span class="hljs-attr">"vetur.format.defaultFormatter.html"</span>: <span class="hljs-string">"prettier"</span>  
}
</code></pre>
<p>[原文]参考</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vscode一格式化就报错？各种风格问题各种报错烦不胜烦，教你如何用好vue的eslint风格配置

## 原文链接
[https://segmentfault.com/a/1190000014354996](https://segmentfault.com/a/1190000014354996)

