---
title: 在 Linux 命令行中自定义文本颜色
reprint: true
categories: reprint
abbrlink: a3140e25
date: 2018-10-21 00:00:00
---

{{% raw %}}

            <h1><a href="#在-linux-命令行中自定义文本颜色"></a>在 Linux 命令行中自定义文本颜色</h1>
<blockquote>
<p>在 Linux 命令行当中使用不同颜色以期提供一种根据文件类型来识别文件的简单方式。你可以修改这些颜色，但是在做之前应该对你做的事情有充分的理由。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/2908469e429d257f10077bd38351187ca3ec11f2/68747470733a2f2f696d616765732e6964676573672e6e65742f696d616765732f61727469636c652f323031382f30352f6e756d626572732d3130303735363435372d6c617267652e6a7067"><img src="https://p0.ssl.qhimg.com/t015cc813d36f22a214.jpg" alt=""></a></p>
<p>如果你在 Linux 命令行上花费了大量的时间（如果没有，那么你可能不会读这篇文章），你无疑注意到了 <code>ls</code> 以多种不同的颜色显示文件。你可能也注意到了一些区别 —— 目录是一种颜色，可执行文件是另一种颜色等等。</p>
<p>这一切是如何发生的呢？以及，你可以选择哪些选项来改变颜色分配可能就不是很多人都知道的。</p>
<p>一种方法是运行 <code>dircolors</code> 命令得到一大堆展示了如何指定这些颜色的数据。它会显示以下这些东西：</p>
<pre><code class="hljs jboss-cli">$ dircolors
LS_COLORS='rs=0<span class="hljs-function">:di</span>=01;34<span class="hljs-function">:ln</span>=01;36<span class="hljs-function">:mh</span>=00<span class="hljs-function">:pi</span>=40;33<span class="hljs-function">:so</span>=01;35<span class="hljs-function">:do</span>
=01;35<span class="hljs-function">:bd</span>=40;33;01<span class="hljs-function">:cd</span>=40;33;01<span class="hljs-function">:or</span>=40;31;01<span class="hljs-function">:mi</span>=00<span class="hljs-function">:su</span>=37;41<span class="hljs-function">:sg</span>
=30;43<span class="hljs-function">:ca</span>=30;41<span class="hljs-function">:tw</span>=30;42<span class="hljs-function">:ow</span>=34;42<span class="hljs-function">:st</span>=37;44<span class="hljs-function">:ex</span>=01;32:*<span class="hljs-string">.tar=01</span>
;31:*<span class="hljs-string">.tgz=01</span>;31:*<span class="hljs-string">.arc=01</span>;31:*<span class="hljs-string">.arj=01</span>;31:*<span class="hljs-string">.taz=01</span>;31:*<span class="hljs-string">.lha=01</span>
;31:*<span class="hljs-string">.lz4=01</span>;31:*<span class="hljs-string">.lzh=01</span>;31:*<span class="hljs-string">.lzma=01</span>;31:*<span class="hljs-string">.tlz=01</span>;31:*<span class="hljs-string">.txz=0</span>
1;31:*<span class="hljs-string">.tzo=01</span>;31:*<span class="hljs-string">.t7z=01</span>;31:*<span class="hljs-string">.zip=01</span>;31:*<span class="hljs-string">.z=01</span>;31:*<span class="hljs-string">.Z=01</span>;31
:*<span class="hljs-string">.dz=01</span>;31:*<span class="hljs-string">.gz=01</span>;31:*<span class="hljs-string">.lrz=01</span>;31:*<span class="hljs-string">.lz=01</span>;31:*<span class="hljs-string">.lzo=01</span>;31:*.
xz=01;31:*<span class="hljs-string">.zst=01</span>;31:*<span class="hljs-string">.tzst=01</span>;31:*<span class="hljs-string">.bz2=01</span>;31:*<span class="hljs-string">.bz=01</span>;31:*<span class="hljs-string">.t</span>
bz=01;31:*<span class="hljs-string">.tbz2=01</span>;31:*<span class="hljs-string">.tz=01</span>;31:*<span class="hljs-string">.deb=01</span>;31:*<span class="hljs-string">.rpm=01</span>;31:*<span class="hljs-string">.j</span>
ar=01;31:*<span class="hljs-string">.war=01</span>;31:*<span class="hljs-string">.ear=01</span>;31:*<span class="hljs-string">.sar=01</span>;31:*<span class="hljs-string">.rar=01</span>;31:*<span class="hljs-string">.a</span>
lz=01;31:*<span class="hljs-string">.ace=01</span>;31:*<span class="hljs-string">.zoo=01</span>;31:*<span class="hljs-string">.cpio=01</span>;31:*<span class="hljs-string">.7z=01</span>;31:*<span class="hljs-string">.r</span>
z=01;31:*<span class="hljs-string">.cab=01</span>;31:*<span class="hljs-string">.jpg=01</span>;35:*<span class="hljs-string">.jpeg=01</span>;35:*<span class="hljs-string">.mjpg=01</span>;35:*.
mjpeg=01;35:*<span class="hljs-string">.gif=01</span>;35:*<span class="hljs-string">.bmp=01</span>;35:*<span class="hljs-string">.pbm=01</span>;35:*<span class="hljs-string">.pgm=01</span>;35:
*<span class="hljs-string">.ppm=01</span>;35:*<span class="hljs-string">.tga=01</span>;35:*<span class="hljs-string">.xbm=01</span>;35:*<span class="hljs-string">.xpm=01</span>;35:*<span class="hljs-string">.tif=01</span>;35:
*<span class="hljs-string">.tiff=01</span>;35:*<span class="hljs-string">.png=01</span>;35:*<span class="hljs-string">.svg=01</span>;35:*<span class="hljs-string">.svgz=01</span>;35:*<span class="hljs-string">.mng=01</span>;3
5:*<span class="hljs-string">.pcx=01</span>;35:*<span class="hljs-string">.mov=01</span>;35:*<span class="hljs-string">.mpg=01</span>;35:*<span class="hljs-string">.mpeg=01</span>;35:*<span class="hljs-string">.m2v=01</span>;
35:*<span class="hljs-string">.mkv=01</span>;35:*<span class="hljs-string">.webm=01</span>;35:*<span class="hljs-string">.ogm=01</span>;35:*<span class="hljs-string">.mp4=01</span>;35:*<span class="hljs-string">.m4v=01</span>
;35:*<span class="hljs-string">.mp4v=01</span>;35:*<span class="hljs-string">.vob=01</span>;35:*<span class="hljs-string">.qt=01</span>;35:*<span class="hljs-string">.nuv=01</span>;35:*<span class="hljs-string">.wmv=01</span>
;35:*<span class="hljs-string">.asf=01</span>;35:*<span class="hljs-string">.rm=01</span>;35:*<span class="hljs-string">.rmvb=01</span>;35:*<span class="hljs-string">.flc=01</span>;35:*<span class="hljs-string">.avi=01</span>
;35:*<span class="hljs-string">.fli=01</span>;35:*<span class="hljs-string">.flv=01</span>;35:*<span class="hljs-string">.gl=01</span>;35:*<span class="hljs-string">.dl=01</span>;35:*<span class="hljs-string">.xcf=01</span>;3
5:*<span class="hljs-string">.xwd=01</span>;35:*<span class="hljs-string">.yuv=01</span>;35:*<span class="hljs-string">.cgm=01</span>;35:*<span class="hljs-string">.emf=01</span>;35:*<span class="hljs-string">.ogv=01</span>;3
5:*<span class="hljs-string">.ogx=01</span>;35:*<span class="hljs-string">.aac=00</span>;36:*<span class="hljs-string">.au=00</span>;36:*<span class="hljs-string">.flac=00</span>;36:*<span class="hljs-string">.m4a=00</span>;3
6:*<span class="hljs-string">.mid=00</span>;36:*<span class="hljs-string">.midi=00</span>;36:*<span class="hljs-string">.mka=00</span>;36:*<span class="hljs-string">.mp3=00</span>;36:*<span class="hljs-string">.mpc=00</span>;
36:*<span class="hljs-string">.ogg=00</span>;36:*<span class="hljs-string">.ra=00</span>;36:*<span class="hljs-string">.wav=00</span>;36:*<span class="hljs-string">.oga=00</span>;36:*<span class="hljs-string">.opus=00</span>;
36:*<span class="hljs-string">.spx=00</span>;36:*<span class="hljs-string">.xspf=00</span>;36:';
export LS_COLORS

</code></pre><p>如果你擅长解析文件，那么你可能会注意到这个列表有一种模式patten。用冒号分隔开，你会看到这样的东西：</p>
<pre><code class="hljs lsl">$ dircolors | tr <span class="hljs-string">":"</span> <span class="hljs-string">"<span class="hljs-subst">\n</span>"</span> | head <span class="hljs-number">-10</span>
LS_COLORS='rs=<span class="hljs-number">0</span>
di=<span class="hljs-number">01</span>;<span class="hljs-number">34</span>
ln=<span class="hljs-number">01</span>;<span class="hljs-number">36</span>
mh=<span class="hljs-number">00</span>
pi=<span class="hljs-number">40</span>;<span class="hljs-number">33</span>
so=<span class="hljs-number">01</span>;<span class="hljs-number">35</span>
do=<span class="hljs-number">01</span>;<span class="hljs-number">35</span>
bd=<span class="hljs-number">40</span>;<span class="hljs-number">33</span>;<span class="hljs-number">01</span>
cd=<span class="hljs-number">40</span>;<span class="hljs-number">33</span>;<span class="hljs-number">01</span>
or=<span class="hljs-number">40</span>;<span class="hljs-number">31</span>;<span class="hljs-number">01</span>

</code></pre><p>OK，这里有一个模式 —— 一系列定义，有一到三个数字组件。我们来看看其中的一个定义。</p>
<pre><code class="hljs abnf"><span class="hljs-attribute">pi</span>=<span class="hljs-number">40</span><span class="hljs-comment">;33</span>

</code></pre><p>有些人可能会问的第一个问题是“pi 是什么？”在这里，我们研究的是颜色和文件类型，所以这显然不是以 3.14 开头的那个有趣的数字。当然不是，这个 “pi” 代表 “pipe（管道）” —— Linux 系统上的一种特殊类型的文件，它可以将数据从一个程序传递给另一个程序。所以，让我们建立一个管道。</p>
<pre><code class="hljs jboss-cli">$ mknod <span class="hljs-string">/tmp/mypipe</span> p
$ <span class="hljs-keyword">ls</span> -l <span class="hljs-string">/tmp/mypipe</span>
prw-rw-r-- 1 shs shs 0 May 1 14<span class="hljs-function">:00</span> <span class="hljs-string">/tmp/mypipe</span>

</code></pre><p>当我们在终端窗口中查看我们的管道和其他几个文件时，颜色差异非常明显。</p>
<p><a href="https://camo.githubusercontent.com/07a55162849a81f8a1d8788d9f711eaab04dc76b/68747470733a2f2f696d616765732e6964676573672e6e65742f696d616765732f61727469636c652f323031382f30352f666f6e742d636f6c6f72732d3130303735363438332d6c617267652e6a7067"><img src="https://p0.ssl.qhimg.com/t016c9ca9c9ab71cf39.jpg" alt="font colors"></a></p>
<p>在 <code>pi</code> 的定义中（如上所示），“40” 使文件在终端（或 PuTTY）窗口中使用黑色背景显示，31 使字体颜色变红。管道是特殊的文件，这种特殊的处理使它们在目录列表中突出显示。</p>
<p><code>bd</code> 和 <code>cd</code> 定义是相同的 —— <code>40;33;01</code>，它有一个额外的设置。这个设置会导致 块设备block device（bd）和 字符设备character device（cd）以黑色背景，橙色字体和另一种效果显示 —— 字符将以粗体显示。</p>
<p>以下列表显示由文件类型file type所指定的颜色和字体分配：</p>
<pre><code class="hljs routeros">setting         file<span class="hljs-built_in"> type
</span>=======         =========
<span class="hljs-attribute">rs</span>=0            reset <span class="hljs-keyword">to</span> <span class="hljs-literal">no</span> color
<span class="hljs-attribute">di</span>=01;34        directory
<span class="hljs-attribute">ln</span>=01;36        link
<span class="hljs-attribute">mh</span>=00           multi-hard link
<span class="hljs-attribute">pi</span>=40;33        pipe
<span class="hljs-attribute">so</span>=01;35        socket
<span class="hljs-attribute">do</span>=01;35        door
<span class="hljs-attribute">bd</span>=40;33;01     block device
<span class="hljs-attribute">cd</span>=40;33;01     character device
<span class="hljs-attribute">or</span>=40;31;01     orphan
<span class="hljs-attribute">mi</span>=00           missing?
<span class="hljs-attribute">su</span>=37;41        setuid
<span class="hljs-attribute">sg</span>=30;43        setgid
<span class="hljs-attribute">ca</span>=30;41        file with capability
<span class="hljs-attribute">tw</span>=30;42        directory with sticky bit <span class="hljs-keyword">and</span> world writable
<span class="hljs-attribute">ow</span>=34;42        directory that is world writable
<span class="hljs-attribute">st</span>=37;44        directory with sticky bit
<span class="hljs-attribute">ex</span>=01;93        executable

</code></pre><p>你可能已经注意到，在 <code>dircolors</code> 命令输出中，我们的大多数定义都以星号开头（例如，<code>*.wav=00;36</code>）。这些按文件扩展名file extension而不是文件类型定义显示属性。这有一个示例：</p>
<pre><code class="hljs lsl">$ dircolors | tr <span class="hljs-string">":"</span> <span class="hljs-string">"<span class="hljs-subst">\n</span>"</span> | tail <span class="hljs-number">-10</span>
*.mpc=<span class="hljs-number">00</span>;<span class="hljs-number">36</span>
*.ogg=<span class="hljs-number">00</span>;<span class="hljs-number">36</span>
*.ra=<span class="hljs-number">00</span>;<span class="hljs-number">36</span>
*.wav=<span class="hljs-number">00</span>;<span class="hljs-number">36</span>
*.oga=<span class="hljs-number">00</span>;<span class="hljs-number">36</span>
*.opus=<span class="hljs-number">00</span>;<span class="hljs-number">36</span>
*.spx=<span class="hljs-number">00</span>;<span class="hljs-number">36</span>
*.xspf=<span class="hljs-number">00</span>;<span class="hljs-number">36</span>
';
export LS_COLORS

</code></pre><p>这些设置（上面列表中所有的 <code>00;36</code>）将使这些文件名以青色显示。可用的颜色如下所示。</p>
<p><a href="https://camo.githubusercontent.com/731978a8249e8ac385684e1bfddfd1e30af0428e/68747470733a2f2f696d616765732e74656368686976652e636f6d2f696d616765732f61727469636c652f323031362f31312f616c6c2d636f6c6f72732d3130303639313939302d6c617267652e6a7067"><img src="https://p0.ssl.qhimg.com/t01a7dbf95e6fe7ef54.jpg" alt="all colors"></a></p>
<h3><a href="#如何改变设置"></a>如何改变设置</h3>
<p>你要使用 <code>ls</code> 的别名来打开颜色显示功能。这通常是 Linux 系统上的默认设置，看起来是这样的：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-keyword">alias</span> <span class="hljs-keyword">ls</span>='<span class="hljs-keyword">ls</span> <span class="hljs-params">--color=auto</span>'

</code></pre><p>如果要关闭字体颜色，可以运行 <code>unalias ls</code> 命令，然后文件列表将仅以默认字体颜色显示。</p>
<p>你可以通过修改 <code>$LS_COLORS</code> 设置和导出修改后的设置来更改文本颜色。</p>
<pre><code class="hljs routeros">$ <span class="hljs-builtin-name">export</span> <span class="hljs-attribute">LS_COLORS</span>=<span class="hljs-string">'rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;...

</span></code></pre><p>注意：上面的命令由于太长被截断了。</p>
<p>如果希望文本颜色的修改是永久性的，则需要将修改后的 <code>$LS_COLORS</code> 定义添加到一个启动文件中，例如 <code>.bashrc</code>。</p>
<h3><a href="#更多关于命令行文本"></a>更多关于命令行文本</h3>
<p>你可以在 NetworkWorld 的 <a href="https://www.networkworld.com/article/3138909/linux/coloring-your-world-with-ls-colors.html">2016 年 11 月</a>的帖子中找到有关文本颜色的其他信息。</p>
<hr>
<p>via: <a href="https://www.networkworld.com/article/3269587/linux/customizing-your-text-colors-on-the-linux-command-line.html">https://www.networkworld.com/article/3269587/linux/customizing-your-text-colors-on-the-linux-command-line.html</a></p>
<p>作者：<a href="https://www.networkworld.com/author/Sandra-Henry_Stocker/">Sandra Henry-Stocker</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/MjSeven">MjSeven</a> 校对：<a href="https://github.com/pityonline">pityonline</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/customizing-your-text-colors-on-the-linux-command-line](https://www.zcfy.cc/article/customizing-your-text-colors-on-the-linux-command-line)
原文标题: 在 Linux 命令行中自定义文本颜色
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
