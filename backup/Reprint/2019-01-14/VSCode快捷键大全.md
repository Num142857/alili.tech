---
title: 'VSCode快捷键大全' 
date: 2019-01-14 2:30:07
hidden: true
slug: 0jk9hs0lj6da
categories: [reprint]
---

{{< raw >}}

                    
<p>最近从Sublime3切换到VScode，总结下快捷键。</p>
<p>官方地址：<a href="https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf" rel="nofollow noreferrer" target="_blank">https://code.visualstudio.com...</a></p>
<p>简单的配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;files.autoSave&quot;: &quot;off&quot;, //禁用自动保存
    &quot;workbench.iconTheme&quot;: &quot;vs-minimal&quot;,
    &quot;explorer.autoReveal&quot;: false,    //禁止资源管理器在打开文件时自动显示并选择它们,类似于禁用Eclipse的link editor
    &quot;workbench.editor.enablePreviewFromQuickOpen&quot;: false, //使Ctrl+P打开的文件使用新的tab页，而不是替换已有的
    &quot;workbench.editor.enablePreview&quot;: false  //使得鼠标左键打开的文件使用新的tab页，而不是替换已有的

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
    <span class="hljs-string">"files.autoSave"</span>: <span class="hljs-string">"off"</span>, <span class="hljs-comment">//禁用自动保存</span>
    <span class="hljs-string">"workbench.iconTheme"</span>: <span class="hljs-string">"vs-minimal"</span>,
    <span class="hljs-string">"explorer.autoReveal"</span>: <span class="hljs-literal">false</span>,    <span class="hljs-comment">//禁止资源管理器在打开文件时自动显示并选择它们,类似于禁用Eclipse的link editor</span>
    <span class="hljs-string">"workbench.editor.enablePreviewFromQuickOpen"</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">//使Ctrl+P打开的文件使用新的tab页，而不是替换已有的</span>
    <span class="hljs-string">"workbench.editor.enablePreview"</span>: <span class="hljs-literal">false</span>  <span class="hljs-comment">//使得鼠标左键打开的文件使用新的tab页，而不是替换已有的</span>

}</code></pre>
<h3 id="articleHeader0">1、通用</h3>
<p><code>Ctrl+Shif+P , F1 打开命令面板   Ctrl+P 快速打开 </code><br>Ctrl+Shift+N 打开新实例窗口 Ctrl+Shift+W 关闭窗口实例</p>
<h3 id="articleHeader1">2、基础编辑</h3>
<p>Ctrl+X 剪切 Ctrl+C 复制<br>Alt+下/上 移动行  shift+Alt+上/下 复制行<br><code>Ctrl+Shift+K 删除行  ,改成Ctrl+D</code><br>Ctrl+(Shift)+Enter 插入行<br>Ctrl+Shift+ 跳转到匹配的括号<br>Ctrl+[/] 行缩进<br>Ctrl+Shift+[/] 代码折叠<br><code>Ctrl+/ 行注释，Shift+Alt+A 块注释 ,改成Ctrl+shif+/</code><br>Alt+Z 是否换行(word wrap)</p>
<p><code>Ctrl+空格键 智能提示 ,改成Alt+/</code><br>Ctrl+Shift+Space  参数提示，Tab 自动补全<br>Ctrl+K Ctrl+I 显示悬停(类似于鼠标hover悬停，一般用于触发提示)<br><code>Shift+Alt+F 格式化文档(改成Ctrl+Shift+F)，Ctrl+K Ctrl+F 格式化选中代码</code><br><code>F12 跳转定义，Alt+F12 查看定义  分别改成F3，Alt+F3</code><br>Ctrl+K F12 在侧边打开定义<br><code>Ctrl+. 快速修复</code><br>Shift+F12 显示引用<br>F2 重命名变量<br><code>Ctrl+K M 更改文件语言类型 </code></p>
<h3 id="articleHeader2">3、导航</h3>
<p>Ctrl+T 显示所有变量、函数名等 #  <br>Ctrl+G 跳转行<br>Ctrl+P 打开文件<br>Ctrl+Shift+O  跳转到变量、函数等@ <br><code>Ctrl+Shift+M 显示终端、错误等程序面板</code><br><code>F8 跳转到下一个错误或警告,改成Ctrl+,</code><br><code>Shift+F8 跳转到上一个错误或警告, 改成ctrl+shift+,</code><br><code>Ctrl+Shift+Tab 切换编辑器,我改成了Ctrl+E</code><br>Alt+左/右 向前/后<br>Ctrl+M 切换tab焦点</p>
<h3 id="articleHeader3">4、搜索和替换</h3>
<p>Ctrl+F ,  Ctrl+H , F3/SHift+F3<br>Alt+Enter 选中所有匹配搜索的</p>
<h3 id="articleHeader4">5、多光标，选择，多行编辑</h3>
<p>Ctrl+I 选中当前行<br>Alt+Click 插入多个光标<br><code>Ctrl+Alt+上/下  插入多个光标  ，改成Ctrl++Shift+Alt+上/下 </code><br>Ctrl+U 撤销上一次光标操作<br>Shift+Alt+I 在选中的所有行末尾插入光标<br>Ctrl+Shift+L ,  Ctrl+F2 都可以选中文中所有和当前的选择或单词同名的，重构重命名时很方便<br>Shift+Alt+左/右 缩小、扩大选择区块<br>Shift+Alt+鼠标拖拽 ， Ctrl+Shift+Alt+方向键   列选择<br>Ctrl+Shift+Alt+PgUp/PgDown  列页选择</p>
<h3 id="articleHeader5">6、编辑器管理</h3>
<p>Ctrl+W, Ctrl+F4 关闭当前编辑器 , Ctrl+K Ctrl+W关闭所有         <br>Ctrl+Shift+T 重新打开上一次关闭的编辑器      <br>Ctrl+K F 关闭目录       <br>Ctrl+ 分割编辑器        <br><code>Ctrl+1/2/3  转移编辑器焦点到不同编辑组 </code><br>Ctrl+K (Ctrl+)左/右 转移编辑器焦点到左右组 <br>Shift+F10显示上下文菜单</p>
<h3 id="articleHeader6">7、文件管理</h3>
<p>Ctrl+N 新建文件，Ctrl+O 打开文件<br>Ctrl+S , Ctrl+Shift+S , Ctrl+K S 保存，另存为，保存所有<br>Ctrl+K P 复制文件路径<br><code>Ctrl+K R 在资源管理器中打开文件</code><br>Ctrl+K O 在新窗口打开文件</p>
<h3 id="articleHeader7">8、显示</h3>
<p>F11 全屏<br>Shift+Alt+1 改变编辑器布局<br>Ctrl+ =/- 放大或缩小<br><code>Ctrl+B 开关侧边栏</code></p>
<p>Ctrl+Shift+E 焦点放到Explorer<br>Ctrl+Shift+F 焦点放到搜索,改成ctrl+alt+f<br>Ctrl+Shift+G 焦点放Git<br>Ctrl+Shift+D 焦点放到Debug<br>Ctrl+Shift+X 焦点放到扩展<br>Ctrl+Shift+H replace in files</p>
<h3 id="articleHeader8">9、调试</h3>
<p>F9 设置断点<br>F5 开始/继续<br>Shift+F5 停止<br>F11/Shift+F11 step into/out<br>F10 step over<br>Ctrl+K Ctrl+I show hover</p>
<h3 id="articleHeader9">10、终端集成</h3>
<p>Ctrl+` 显示集成的终端<br>Ctrl+Shift+` 创建新的终端<br>Ctrl+Shift+C 复制选中<br>Ctrl+Shift+V 粘贴到终端<br>Ctrl+↑ / ↓ Scroll up/down<br>Shift+PgUp / PgDown Scroll page up/down<br>Ctrl+Home / End Scroll to top/bottom</p>
<h3 id="articleHeader10">针对Window快捷键冲突和Eclipse习惯改造自定义的部分</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将键绑定放入此文件中以覆盖默认值
[{
        &quot;key&quot;: &quot;alt+/&quot;,
        &quot;command&quot;: &quot;editor.action.triggerSuggest&quot;,
        &quot;when&quot;: &quot;editorHasCompletionItemProvider &amp;&amp; editorTextFocus &amp;&amp; !editorReadonly&quot;
    },
    {
        &quot;key&quot;: &quot;ctrl+d&quot;,
        &quot;command&quot;: &quot;editor.action.deleteLines&quot;,
        &quot;when&quot;: &quot;editorTextFocus &amp;&amp; !editorReadonly&quot;
    },
    {
        &quot;key&quot;: &quot;ctrl+shift+/&quot;,
        &quot;command&quot;: &quot;editor.action.blockComment&quot;,
        &quot;when&quot;: &quot;editorTextFocus &amp;&amp; !editorReadonly&quot;
    },
    {
        &quot;key&quot;: &quot;ctrl+shift+f&quot;,
        &quot;command&quot;: &quot;editor.action.formatDocument&quot;,
        &quot;when&quot;: &quot;editorHasDocumentFormattingProvider &amp;&amp; editorTextFocus &amp;&amp; !editorReadonly&quot;
    },
    {
        &quot;key&quot;: &quot;f3&quot;,
        &quot;command&quot;: &quot;editor.action.goToDeclaration&quot;,
        &quot;when&quot;: &quot;editorHasDefinitionProvider &amp;&amp; editorTextFocus &amp;&amp; !isInEmbeddedEditor&quot;
    },
    {
        &quot;key&quot;: &quot;alt+f3&quot;,
        &quot;command&quot;: &quot;editor.action.goToImplementation&quot;,
        &quot;when&quot;: &quot;editorHasImplementationProvider &amp;&amp; editorTextFocus &amp;&amp; !isInEmbeddedEditor&quot;
    },
    { &quot;key&quot;: &quot;ctrl+e&quot;, &quot;command&quot;: &quot;workbench.action.openPreviousRecentlyUsedEditorInGroup&quot; },
    {
        &quot;key&quot;: &quot;ctrl+,&quot;,
        &quot;command&quot;: &quot;editor.action.marker.next&quot;,
        &quot;when&quot;: &quot;editorFocus &amp;&amp; !editorReadonly&quot;
    },
    {
        &quot;key&quot;: &quot;ctrl+shift+,&quot;,
        &quot;command&quot;: &quot;editor.action.marker.prev&quot;,
        &quot;when&quot;: &quot;editorFocus &amp;&amp; !editorReadonly&quot;
    },
    {
        &quot;key&quot;: &quot;ctrl+shift+alt+up&quot;,
        &quot;command&quot;: &quot;editor.action.insertCursorAbove&quot;,
        &quot;when&quot;: &quot;editorTextFocus&quot;
    },
    {
        &quot;key&quot;: &quot;ctrl+shift+alt+down&quot;,
        &quot;command&quot;: &quot;editor.action.insertCursorBelow&quot;,
        &quot;when&quot;: &quot;editorTextFocus&quot;
    },
    {
        &quot;key&quot;: &quot;ctrl+alt+f&quot;,
        &quot;command&quot;: &quot;search.action.focusActiveEditor&quot;,
        &quot;when&quot;: &quot;searchInputBoxFocus &amp;&amp; searchViewletVisible&quot;
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// 将键绑定放入此文件中以覆盖默认值
[{
        <span class="hljs-string">"key"</span>: <span class="hljs-string">"alt+/"</span>,
        <span class="hljs-string">"command"</span>: <span class="hljs-string">"editor.action.triggerSuggest"</span>,
        <span class="hljs-string">"when"</span>: <span class="hljs-string">"editorHasCompletionItemProvider &amp;&amp; editorTextFocus &amp;&amp; !editorReadonly"</span>
    },
    {
        <span class="hljs-string">"key"</span>: <span class="hljs-string">"ctrl+d"</span>,
        <span class="hljs-string">"command"</span>: <span class="hljs-string">"editor.action.deleteLines"</span>,
        <span class="hljs-string">"when"</span>: <span class="hljs-string">"editorTextFocus &amp;&amp; !editorReadonly"</span>
    },
    {
        <span class="hljs-string">"key"</span>: <span class="hljs-string">"ctrl+shift+/"</span>,
        <span class="hljs-string">"command"</span>: <span class="hljs-string">"editor.action.blockComment"</span>,
        <span class="hljs-string">"when"</span>: <span class="hljs-string">"editorTextFocus &amp;&amp; !editorReadonly"</span>
    },
    {
        <span class="hljs-string">"key"</span>: <span class="hljs-string">"ctrl+shift+f"</span>,
        <span class="hljs-string">"command"</span>: <span class="hljs-string">"editor.action.formatDocument"</span>,
        <span class="hljs-string">"when"</span>: <span class="hljs-string">"editorHasDocumentFormattingProvider &amp;&amp; editorTextFocus &amp;&amp; !editorReadonly"</span>
    },
    {
        <span class="hljs-string">"key"</span>: <span class="hljs-string">"f3"</span>,
        <span class="hljs-string">"command"</span>: <span class="hljs-string">"editor.action.goToDeclaration"</span>,
        <span class="hljs-string">"when"</span>: <span class="hljs-string">"editorHasDefinitionProvider &amp;&amp; editorTextFocus &amp;&amp; !isInEmbeddedEditor"</span>
    },
    {
        <span class="hljs-string">"key"</span>: <span class="hljs-string">"alt+f3"</span>,
        <span class="hljs-string">"command"</span>: <span class="hljs-string">"editor.action.goToImplementation"</span>,
        <span class="hljs-string">"when"</span>: <span class="hljs-string">"editorHasImplementationProvider &amp;&amp; editorTextFocus &amp;&amp; !isInEmbeddedEditor"</span>
    },
    { <span class="hljs-string">"key"</span>: <span class="hljs-string">"ctrl+e"</span>, <span class="hljs-string">"command"</span>: <span class="hljs-string">"workbench.action.openPreviousRecentlyUsedEditorInGroup"</span> },
    {
        <span class="hljs-string">"key"</span>: <span class="hljs-string">"ctrl+,"</span>,
        <span class="hljs-string">"command"</span>: <span class="hljs-string">"editor.action.marker.next"</span>,
        <span class="hljs-string">"when"</span>: <span class="hljs-string">"editorFocus &amp;&amp; !editorReadonly"</span>
    },
    {
        <span class="hljs-string">"key"</span>: <span class="hljs-string">"ctrl+shift+,"</span>,
        <span class="hljs-string">"command"</span>: <span class="hljs-string">"editor.action.marker.prev"</span>,
        <span class="hljs-string">"when"</span>: <span class="hljs-string">"editorFocus &amp;&amp; !editorReadonly"</span>
    },
    {
        <span class="hljs-string">"key"</span>: <span class="hljs-string">"ctrl+shift+alt+up"</span>,
        <span class="hljs-string">"command"</span>: <span class="hljs-string">"editor.action.insertCursorAbove"</span>,
        <span class="hljs-string">"when"</span>: <span class="hljs-string">"editorTextFocus"</span>
    },
    {
        <span class="hljs-string">"key"</span>: <span class="hljs-string">"ctrl+shift+alt+down"</span>,
        <span class="hljs-string">"command"</span>: <span class="hljs-string">"editor.action.insertCursorBelow"</span>,
        <span class="hljs-string">"when"</span>: <span class="hljs-string">"editorTextFocus"</span>
    },
    {
        <span class="hljs-string">"key"</span>: <span class="hljs-string">"ctrl+alt+f"</span>,
        <span class="hljs-string">"command"</span>: <span class="hljs-string">"search.action.focusActiveEditor"</span>,
        <span class="hljs-string">"when"</span>: <span class="hljs-string">"searchInputBoxFocus &amp;&amp; searchViewletVisible"</span>
    }
]</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VSCode快捷键大全

## 原文链接
[https://segmentfault.com/a/1190000009519736](https://segmentfault.com/a/1190000009519736)

