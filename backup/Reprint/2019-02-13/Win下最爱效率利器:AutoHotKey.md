---
title: 'Win下最爱效率利器:AutoHotKey' 
date: 2019-02-13 2:31:22
hidden: true
slug: kkkaoeg8x4o
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://autohotkey.com/" rel="nofollow noreferrer" target="_blank">AutoHotkey</a> 是一个windows下的开源、免费、自动化软件工具。它由最初旨在提供键盘快捷键的脚本语言驱动(称为：<strong>热键</strong>)，随着时间的推移演变成一个完整的脚本语言。但你不需要把它想得太深，你只需要知道它可以简化你的重复性工作，一键自动化启动或运行程序等等；以此提高我们的<strong>工作效率</strong>，改善<strong>生活品质</strong>；通过按键映射，鼠标模拟，定义宏等。</p>
<p>如觉此处排版不尽如你意，可移步<a href="http://www.jeffjade.com/2016/03/11/2016-03-11-autohotkey/#" rel="nofollow noreferrer" target="_blank"><strong>Win下最爱效率神器:AutoHotKey</strong></a>查看，(^^)。</p>
<hr>
<p><strong>『有则推荐』</strong>: 自 2017 年初，就有开始利用闲余时光，打磨个人最新作品——<a href="https://nicelinks.site?from=sf-autohotkey" rel="nofollow noreferrer" target="_blank">「倾城之链」 </a>，有意将其打造成优良开放型平台，旨在云集全球优秀网站，让您更为便捷地探索互联网中那更广阔的世界；在这里，您可以轻松发现、学习、分享更多有用或有趣的事物。目前仍在不断迭代、优化中，如果您对此感兴趣，不妨先尝试一下： <a href="https://nicelinks.site?from=sf-autohotkey" rel="nofollow noreferrer" target="_blank">「倾城之链」 </a>；亦十分欢迎提出您宝贵意见或建议。 (Upade@2018-01-23 于深圳.南山)。</p>
<hr>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004847822?w=1280&amp;h=853" src="https://static.alili.tech/img/remote/1460000004847822?w=1280&amp;h=853" alt="图片来自：zoommyapp.com" title="图片来自：zoommyapp.com" style="cursor: pointer;"></span></p>
<p>如要问__AutoHotKey__是什么？这是一个仁者见仁，智者见智的问题。你可以将其看作是一个热键增添器，也可以当成改键器/屏幕录制器，或者是游戏热键外挂等等。你可以在<a href="https://autohotkey.com/boards/viewtopic.php?f=29&amp;t=4199" rel="nofollow noreferrer" target="_blank">AutoHotkey 擅长什么？</a>得到一个方向；笔者这里只是介绍一些粗浅却很实用的用法，与诸君分享。</p>
<h2 id="articleHeader0">下载安装AutoHotkey</h2>
<p>在浏览器中输入网址 <a href="http://www.autohotkey.com/" rel="nofollow noreferrer" target="_blank">http://www.autohotkey.com/</a> 进入AutoHotkey的官网，点击“download”下载即可将AutoHotkey保存到本地磁盘。接着双击点击安装就可以了。</p>
<h2 id="articleHeader1"><strong>建立AutoHotkey脚本</strong></h2>
<p>安装完成后默认会在系统盘的“本地文档”下创建一个"AutoHotkey.ahk"脚本，双击以后我们会看到任务栏右下角有个图标，就表示它在运行了[如下图标注处所示]。我们在里面写入相应的映射代码然后右击选择"<strong>reload this script</strong>"执行它就可以开始使用AutoHotkey里面设置好的功能了。<br><span class="img-wrap"><img data-src="/img/remote/1460000004847823" src="https://static.alili.tech/img/remote/1460000004847823" alt="AutoHotKey" title="AutoHotKey" style="cursor: pointer; display: inline;"></span></p>
<p>如果我们想在其他地方放置脚本怎么办呢？很简单，只要新建一个文本文档，将其后缀名改为.ahk然后执行它就行了。所以，在同一台电脑中，你甚至可以存放多个脚本。当用不到该脚本了只需要，鼠标移到该图标处，右键选择<strong>exit</strong>即可，很是方便。</p>
<p>为了方便修改该脚本，你可以将其放置于你觉得方便的位置，丝毫不影响，双击可运行之。我们还可以为该脚本设置开机自启动，只需要将该脚本生成一个“快捷方式”，然后将此快捷方式放置到程序自启动文件夹之下即可,一般都在这儿：</p>
<blockquote>C:ProgramDataMicrosoftWindowsStart MenuProgramsStartUp</blockquote>
<p>如此一开机，就可以使用脚本中所配置的功能，大为便捷。</p>
<h2 id="articleHeader2">简单实用的实例</h2>
<p>这里简单说明下脚本中常用符号代表的含义：</p>
<blockquote>
<strong>#</strong> 号代表 <strong><em>Win</em></strong> 键；<br><strong>!</strong> 号代表 <strong><em>Alt</em></strong> 键；<br><strong>^</strong> 号代表 <strong><em>Ctrl</em></strong> 键；<br><strong>+</strong> 号代表 <strong><em>shift</em></strong> 键；<br><strong>::</strong> 号(两个英文冒号)起分隔作用；<br><strong>run</strong>，非常常用 的 AHK 命令之一;<br><strong>;</strong> 号代表 注释后面一行内容；</blockquote>
<p><strong>run</strong>它的后面是要运行的程序完整路径（比如我的<strong>Sublime</strong>的完整路径是：D:Program Files (x86)Sublime Text 3sublime_text.exe）或网址。为什么第一行代码只是写着“notepad”，没有写上完整路径？因为“notepad”是“运行”对话框中的命令之一。</p>
<p>如果你想按下“Ctrl + Alt + Shift + Win + Q”（这个快捷键真拉风啊。(￣▽￣)）来启动 QQ 的话，可以这样写：</p>
<blockquote>^!+#q::run  QQ所在完整路径地址。</blockquote>
<p><strong>AutoHotKey</strong>的强大，有类似Mac下的<strong>Alfred2</strong>之风，可以自我定制(当然啦，后者还是强大太多)。所以可以说，她强大与否，在于使用者的你爱或者不爱<code>折腾</code>。学以致用，如果简单的折腾下，可以使得我们工作效率大幅提升，何乐不为？况且，在见识的增长中，这可以给我们思维带来极大的营养。以下是笔者常用功能的脚本配置：</p>
<h3 id="articleHeader3">极速打开网页</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";Notes: #==win !==Alt 2015-05-20  ^==Ctr  +==shift

;=========================================================================
#j::Run www.jeffjade.com
#b::Run https://www.baidu.com/
#c::Run https://www.google.com/
#y::Run http://www.cnblogs.com/jadeboy/
#0::Run https://tinypng.com/
#v::Run https://www.v2ex.com/
;-------------------------------------------------------------------------" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>;Notes: #==win !==Alt <span class="hljs-number">2015</span><span class="hljs-number">-05</span><span class="hljs-number">-20</span>  ^==Ctr  +==shift

;=========================================================================
#j::Run www.jeffjade.com
#b::Run https:<span class="hljs-comment">//www.baidu.com/</span>
#c::Run https:<span class="hljs-comment">//www.google.com/</span>
#y::Run http:<span class="hljs-comment">//www.cnblogs.com/jadeboy/</span>
#<span class="hljs-number">0</span>::Run https:<span class="hljs-comment">//tinypng.com/</span>
#v::Run https:<span class="hljs-comment">//www.v2ex.com/</span>
;-------------------------------------------------------------------------</code></pre>
<p>这是特常用的功能；如上脚本，<strong>Win+J</strong>即可打开自己个人博客，<strong>Win+0</strong>则打开熊猫网址去压缩图片... ...。不管pc焦点何在，使用自己配置的快捷键，即可达到所想，方便而快捷，大慰我心。网上冲浪，自然选取了Chrome，配之以<strong>Vimium</strong>插件<a href="http://www.jeffjade.com/2015/10/19/2015-10-18-chrome-vimium/" rel="nofollow noreferrer" target="_blank">Vimium~让您的Chrome起飞</a>，分分钟甩掉鼠标；生命聊聊不过百年，如此短暂，在鼠标经常性滑过去来做一些可以更高便捷的事儿，所不必要消耗的一秒半秒，我没那么慷慨(即使我会花费更多时间去发发呆)。</p>
<blockquote>__温馨提示__： 以下几个系统默认的 Win 快捷键：<br>Win + E：打开资源管理器； <br>Win + D：显示桌面； <br>Win + F：打开查找对话框； <br>Win + R：打开运行对话框； <br>Win + L：锁定电脑； <br>Win + PauseBreak：打开系统属性对话框;<br>Win + Q: 本地文件/网页等搜索;<br>Win + U: 打开控制面板－轻松使用设置中心;</blockquote>
<h3 id="articleHeader4">便捷呼出程序</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="!n::run notepad
!c::run, D:\SoftwareKit\_jade_new_soft\cmd_markdown_win64\Cmd Markdown.exe
!r:: run, D:\SoftwareKit\_jade_new_soft\cmder_mini\Cmder.exe
!q::run, D:\Program Files (x86)\Tencent\QQIntl\QQUninst.exe
!space::run, D:\Program Files (x86)\Sublime Text 3\sublime_text.exe
;==========================================================================" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>!n::<span class="hljs-keyword">run</span><span class="bash"> notepad
</span>!c::<span class="hljs-keyword">run</span><span class="bash">, D:\SoftwareKit\_jade_new_soft\cmd_markdown_win64\Cmd Markdown.exe
</span>!r:: <span class="hljs-keyword">run</span><span class="bash">, D:\SoftwareKit\_jade_new_soft\cmder_mini\Cmder.exe
</span>!q::<span class="hljs-keyword">run</span><span class="bash">, D:\Program Files (x86)\Tencent\QQIntl\QQUninst.exe
</span>!space::<span class="hljs-keyword">run</span><span class="bash">, D:\Program Files (x86)\Sublime Text 3\sublime_text.exe
</span>;==========================================================================</code></pre>
<p>以上为<strong>Alt</strong>外加一些键来打开本地应用程序。即便完全可以自己配置<strong>热键</strong>，但是一旦多了，不常用的话记起来也略显麻烦。所以选择<strong>Alt</strong>键组合来打开本地应用程序。<strong>Win</strong>键来呼出网页。在有了<strong>Launchy</strong>这类软件之后，也就不怎么过为本地程序配置快捷键了。</p>
<p>之前一段时间认为，珍爱生命，就当远离Windows。在给其配了SSD硬盘，在不断折腾应用一些软件，在不断了解&amp;熟悉Windows之后，这一想法倒也缓和了不少。Windows下的<strong>AutoHotKey</strong> + <strong>Listary</strong> + <strong>Launchy</strong> 组合，倒也有了点Mac下 <code>Alfred2</code>免费功能部分。这一点在<a href="http://www.jeffjade.com/2015/10/19/2015-10-18-Efficacious-win-software/" rel="nofollow noreferrer" target="_blank">Windows下效率必备软件</a>中有过记载。</p>
<h3 id="articleHeader5">一键拷贝文件路径</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="^+c::
; null= 
send ^c
sleep,200
clipboard=%clipboard% ;%null%
tooltip,%clipboard%
sleep,500
tooltip,
return" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>^+c::
; null= 
<span class="hljs-keyword">send</span> ^c
<span class="hljs-keyword">sleep</span>,<span class="hljs-number">200</span>
clipboard=%clipboard% ;%null%
tooltip,%clipboard%
<span class="hljs-keyword">sleep</span>,<span class="hljs-number">500</span>
tooltip,
<span class="hljs-keyword">return</span></code></pre>
<p>只需要<strong>Ctrl+shift+c</strong>即可拷贝文件路径；方便快捷，爽！。</p>
<h3 id="articleHeader6">改掉大写键为Enter</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";replace CapsLock to LeftEnter; CapsLock = Alt CapsLock
$CapsLock::Enter

LAlt &amp; Capslock::SetCapsLockState, % GetKeyState(&quot;CapsLock&quot;, &quot;T&quot;) ? &quot;Off&quot; : &quot;On&quot;

!u::Send ^c !{tab} ^v" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>;replace CapsLock <span class="hljs-keyword">to</span> LeftEnter; CapsLock = Alt CapsLock
$CapsLock<span class="hljs-type">::Enter</span>

LAlt &amp; Capslock<span class="hljs-type">::SetCapsLockState</span>, % GetKeyState(<span class="hljs-string">"CapsLock"</span>, <span class="hljs-string">"T"</span>) ? <span class="hljs-string">"Off"</span> : <span class="hljs-string">"On"</span>

!u<span class="hljs-type">::Send</span> ^c !{tab} ^v</code></pre>
<p>看网上朋友说<strong>CapsLock</strong>(大写切换按键)没怎么大用处；想来也是，个人每次需要输入大写字符，也是配合Shift来实现。那么此按键意义何在？那就改成<strong>Enter</strong>键好了。有时候右手需要操纵鼠标时候，左手小拇指按此键来实现换行，蛮好；既然大写切换不怎么常用，那么用<strong>Alt+CapsLock</strong>来组合实现也无不妥；以上脚本即为此意。</p>
<h3 id="articleHeader7">缩写快速打出常用语</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="::/mail::gmail@gmail.com
::/jeff::http://www.jeffjade.com/
::/con::console.log();
::/js::javascript:;
::/fk::轩先生这会子肯定在忙，请骚后。thx。祝君：天天开心，日日欣悦。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-meta">::/mail::gmail@gmail.com</span>
<span class="hljs-meta">::/jeff::http://www.jeffjade.com/</span>
<span class="hljs-meta">::/con::console.log();</span>
<span class="hljs-meta">::/js::javascript:;</span>
<span class="hljs-meta">::/fk::轩先生这会子肯定在忙，请骚后。thx。祝君：天天开心，日日欣悦。</span></code></pre>
<p><strong>AutoHotKey</strong>一个很强大之处，在任何能正常显示 <strong>unicode</strong>字符的程序中（比如浏览器的地址栏、MS Word Rtx）；如以上代码，键入<code>/jeff</code> 后，再加<strong>空格</strong>、或 <strong>tab</strong>、或<strong>回车</strong>，就可以触发缩写；根据输入不同方式（空格，tab，回车）输出的内容后也相应附加了[空格/tab/回车，用起来很是舒爽]; 当然了这里<code>/jeff</code>也可以配置其他如<code>:jeff</code>，按照个人喜好了。</p>
<h3 id="articleHeader8">颜色神偷</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="^#c::
MouseGetPos, mouseX, mouseY
; 获得鼠标所在坐标，把鼠标的 X 坐标赋值给变量 mouseX ，同理 mouseY
PixelGetColor, color, %mouseX%, %mouseY%, RGB
; 调用 PixelGetColor 函数，获得鼠标所在坐标的 RGB 值，并赋值给 color
StringRight color,color,6
; 截取 color（第二个 color）右边的6个字符，因为获得的值是这样的：#RRGGBB，一般我们只需要 RRGGBB 部分。把截取到的值再赋给 color（第一个 color）。
clipboard = %color%
; 把 color 的值发送到剪贴板
return" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>^#c::
MouseGetPos, <span class="hljs-built_in">mouseX</span>, <span class="hljs-built_in">mouseY</span>
; 获得鼠标所在坐标，把鼠标的 X 坐标赋值给变量 <span class="hljs-built_in">mouseX</span> ，同理 <span class="hljs-built_in">mouseY</span>
PixelGetColor, <span class="hljs-built_in">color</span>, %<span class="hljs-built_in">mouseX</span>%, %<span class="hljs-built_in">mouseY</span>%, RGB
; 调用 PixelGetColor 函数，获得鼠标所在坐标的 RGB 值，并赋值给 <span class="hljs-built_in">color</span>
StringRight <span class="hljs-built_in">color</span>,<span class="hljs-built_in">color</span>,<span class="hljs-number">6</span>
; 截取 <span class="hljs-built_in">color</span>（第二个 <span class="hljs-built_in">color</span>）右边的<span class="hljs-number">6</span>个字符，因为获得的值是这样的：#RRGGBB，一般我们只需要 RRGGBB 部分。把截取到的值再赋给 <span class="hljs-built_in">color</span>（第一个 <span class="hljs-built_in">color</span>）。
clipboard = %<span class="hljs-built_in">color</span>%
; 把 <span class="hljs-built_in">color</span> 的值发送到剪贴板
<span class="hljs-keyword">return</span></code></pre>
<p>这个功能，搞Web端还是可以备着的。很好用，按下配置好快捷键，即可取得鼠标所在光标处颜色色值到剪切版中－爽啊。(个人用<code>Win+C</code>呼出了 __Chrome__，<code>Alt+C</code>调出作业部落客户端__Cmd Markdown__,所以这里就用了<code>Ctrl+Win+c</code>来取色，也还算方便)</p>
<h3 id="articleHeader9">神速激活/打开/隐藏程序</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#c::
IfWinNotExist ahk_class Chrome_WidgetWin_1
{
    Run &quot;C:\Users\Administrator\AppData\Local\Google\Chrome\Application\chrome.exe&quot;
    WinActivate
}
Else IfWinNotActive ahk_class Chrome_WidgetWin_1
{
    WinActivate
}
Else
{
    WinMinimize
}
Return" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs puppet"><code><span class="hljs-comment">#c::</span>
IfWinNotExist ahk_class <span class="hljs-keyword">Chrome_WidgetWin_1</span>
{
    Run <span class="hljs-string">"C:\Users\Administrator\AppData\Local\Google\Chrome\Application\chrome.exe"</span>
    WinActivate
}
<span class="hljs-keyword">Else</span> <span class="hljs-keyword">IfWinNotActive</span> <span class="hljs-keyword">ahk_class</span> <span class="hljs-keyword">Chrome_WidgetWin_1</span>
{
    WinActivate
}
<span class="hljs-keyword">Else</span>
{
    WinMinimize
}
<span class="hljs-keyword">Return</span></code></pre>
<p>以上这段脚本可以做到，Chrome的各种状态切换：<strong>Win+C</strong>,Chrome没打开状态时候 --&gt; 打开；打开没激活状态时候 --&gt; 激活；打开处在激活状态时候 ---&gt; 隐藏。恩，我用着挺爽的，你也试试？</p>
<h2 id="articleHeader10">折腾AutoHotKey总结</h2>
<p><strong>折腾</strong>是奔着实用才去做的，所以笔者也只是看下可以常用功能而已。其实<strong>AutoHotKey</strong>远不止如此；<a href="https://autohotkey.com/boards/viewtopic.php?t=1099" rel="nofollow noreferrer" target="_blank">AutoHotkey 学习指南</a>这里可见一斑。网络上也可以搜出<strong>AutoHotKey 懒人包</strong>，里面有二十余脚本，如：<em>“计时器”</em>，<em>“禁止Win键”</em>，<em>“秒杀窗口，左键加右键”</em>云云；需要的话下载即可使用；知乎有一专栏<a href="http://zhuanlan.zhihu.com/autohotkey" rel="nofollow noreferrer" target="_blank">AutoHotkey 之美</a>，粗略扫了下，算是一可以扩充见识之门；<a href="http://nicejade.github.io/2016/03/12/share-autohotkey-script.html" rel="nofollow noreferrer" target="_blank">AutoHotKey实用脚本分享</a>一文介绍了一些常用脚本实例，有兴趣更多了解<strong>AutoHotKey</strong>的朋友们，可参看下。</p>
<p><strong>AutoHotKey</strong>定有很多好用的功能，此文仅作简单介绍，抛砖以引美玉。希望知道更多有用玩法的朋友可以慷慨分享，让我等Coder效率可以提一提，节省那么些时间：去学习，去把妹(/泡哥)，去享受生活。如果可以，也殷切希望，以此篇介绍给不怎么爱折腾的朋友带来一点参考。王小波在《思维的乐趣》中引用罗素一言：<strong>「须知参差多态，乃是幸福的本源」</strong>；如果您不喜欢折腾，这里并无勉强之意；生活之事，快乐就好。</p>
<p>最后自荐简书一专题<a href="http://www.jianshu.com/collection/2f6a49e22121" rel="nofollow noreferrer" target="_blank">《折腾之美》</a>：工欲善其事，必先利其器。大道至简：<strong>因为折腾，所以简洁</strong>；为爱折腾的你而生，欢请你的入盟(专题起源可参见<a href="http://www.jeffjade.com/2016/02/22/2016-02-22-beautiful-of-toss/#more" rel="nofollow noreferrer" target="_blank">折腾之美-序</a>)。</p>
<p>-----2016-03-11晚---于深圳------</p>
<blockquote>文章来源：<a href="http://www.jeffjade.com" rel="nofollow noreferrer" target="_blank">http://www.jeffjade.com</a><br>原文链接：<a href="http://www.jeffjade.com/2016/03/11/2016-03-11-autohotkey/#" rel="nofollow noreferrer" target="_blank">http://www.jeffjade.com/2016/...</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Win下最爱效率利器:AutoHotKey

## 原文链接
[https://segmentfault.com/a/1190000004611125](https://segmentfault.com/a/1190000004611125)

