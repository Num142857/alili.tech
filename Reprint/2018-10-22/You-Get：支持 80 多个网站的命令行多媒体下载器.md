---
title: You-Get：支持 80 多个网站的命令行多媒体下载器
hidden: true
categories: [reprint]
slug: fa871c5d
date: 2018-10-22 00:00:00
---

{{< raw >}}

            <h1><a href="#you-get支持-80-多个网站的命令行多媒体下载器"></a>You-Get：支持 80 多个网站的命令行多媒体下载器</h1>
<p>你们大多数人可能用过或听说过 <strong>Youtube-dl</strong>，这个命令行程序可以从包括 Youtube 在内的 100+ 网站下载视频。我偶然发现了一个类似的工具，名字叫做 <strong>You-Get</strong>。这是一个 Python 编写的命令行下载器，可以让你从 Youtube、Facebook、Twitter 等很多热门网站下载图片，音频和视频（LCTT 译注：首先，它们得是存在的网站）。目前该下载器支持 80+ 站点，点击<a href="https://you-get.org/#supported-sites">这里</a>查看所有支持的网站。</p>
<p>You-Get 不仅仅是一个下载器，它还可以将在线视频导流至你的视频播放器。更进一步，它还允许你在 Google 上搜索视频，只要给出搜索项，You-Get 使用 Google 搜索并下载相关度最高的视频。另外值得一提的特性是，它允许你暂停和恢复下载过程。它是一个完全自由、开源及跨平台的应用，适用于 Linux、MacOS 及 Windows。</p>
<h3><a href="#安装-you-get"></a>安装 You-Get</h3>
<p>确保你已经安装如下依赖项：</p>
<ul>
<li>Python 3</li>
<li>FFmpeg (强烈推荐) 或 Libav</li>
<li>(可选) RTMPDump</li>
</ul>
<p>有多种方式安装 You-Get，其中官方推荐采用 pip 包管理器安装。如果你还没有安装 pip，可以参考如下链接：</p>
<ul>
<li><a href="https://www.ostechnix.com/manage-python-packages-using-pip/">如何使用 pip 管理 Python 软件包</a></li>
</ul>
<p>需要注意的是，你需要安装 Python 3 版本的 <code>pip</code>。</p>
<p>接下来，运行如下命令安装 You-Get：</p>
<pre><code class="hljs routeros">$ pip3 install you-<span class="hljs-builtin-name">get</span>

</code></pre><p>可以使用命令升级 You-Get 至最新版本：</p>
<pre><code class="hljs sql">$ pip3 <span class="hljs-keyword">install</span> <span class="hljs-comment">--upgrade you-get</span>

</code></pre><h3><a href="#开始使用-you-get"></a>开始使用 You-Get</h3>
<p>使用方式与 Youtube-dl 工具基本一致。</p>
<h4><a href="#下载视频"></a>下载视频</h4>
<p>下载视频，只需运行：</p>
<pre><code class="hljs vim">$ you-<span class="hljs-built_in">get</span> http<span class="hljs-variable">s:</span>//www.youtube.<span class="hljs-keyword">com</span>/watch?v=HXaglTFJLMc

</code></pre><p>输出示例：</p>
<pre><code class="hljs yaml"><span class="hljs-attr">site:</span> <span class="hljs-string">YouTube</span>
<span class="hljs-attr">title:</span> <span class="hljs-string">The</span> <span class="hljs-string">Last</span> <span class="hljs-string">of</span> <span class="hljs-string">The</span> <span class="hljs-string">Mohicans</span> <span class="hljs-string">by</span> <span class="hljs-string">Alexandro</span> <span class="hljs-string">Querevalú</span>
<span class="hljs-attr">stream:</span>
<span class="hljs-attr"> - itag:</span> <span class="hljs-number">22</span>
<span class="hljs-attr"> container:</span> <span class="hljs-string">mp4</span>
<span class="hljs-attr"> quality:</span> <span class="hljs-string">hd720</span>
<span class="hljs-attr"> size:</span> <span class="hljs-number">56.9</span> <span class="hljs-string">MiB</span> <span class="hljs-string">(59654303</span> <span class="hljs-string">bytes)</span>
 <span class="hljs-comment"># download-with: you-get --itag=22 [URL]</span>

<span class="hljs-string">Downloading</span> <span class="hljs-string">The</span> <span class="hljs-string">Last</span> <span class="hljs-string">of</span> <span class="hljs-string">The</span> <span class="hljs-string">Mohicans</span> <span class="hljs-string">by</span> <span class="hljs-string">Alexandro</span> <span class="hljs-string">Querevalú.mp4</span> <span class="hljs-string">...</span>
 <span class="hljs-number">100</span><span class="hljs-string">%</span> <span class="hljs-string">(</span> <span class="hljs-number">56.9</span><span class="hljs-string">/</span> <span class="hljs-number">56.9</span><span class="hljs-string">MB)</span> <span class="hljs-string">├███████████████████████████████████████████████████████┤[1/1]</span> <span class="hljs-number">752</span> <span class="hljs-string">kB/s</span>

</code></pre><p>下载视频前，你可能希望查看视频的细节信息。You-Get 提供了 <code>–info</code> 或 <code>-i</code> 参数，使用该参数可以获得给定视频所有可用的分辨率和格式。</p>
<pre><code class="hljs stylus">$ you-get -<span class="hljs-selector-tag">i</span> https:<span class="hljs-comment">//www.youtube.com/watch?v=HXaglTFJLMc</span>

</code></pre><p>或者</p>
<pre><code class="hljs vim">$ you-<span class="hljs-built_in">get</span> --info http<span class="hljs-variable">s:</span>//www.youtube.<span class="hljs-keyword">com</span>/watch?v=HXaglTFJLMc

</code></pre><p>输出示例如下：</p>
<pre><code class="hljs yaml"><span class="hljs-attr">site:</span> <span class="hljs-string">YouTube</span>
<span class="hljs-attr">title:</span> <span class="hljs-string">The</span> <span class="hljs-string">Last</span> <span class="hljs-string">of</span> <span class="hljs-string">The</span> <span class="hljs-string">Mohicans</span> <span class="hljs-string">by</span> <span class="hljs-string">Alexandro</span> <span class="hljs-string">Querevalú</span>
<span class="hljs-attr">streams:</span> <span class="hljs-comment"># Available quality and codecs</span>
 <span class="hljs-string">[</span> <span class="hljs-string">DASH</span> <span class="hljs-string">]</span> <span class="hljs-string">`________________________________`</span> 
<span class="hljs-attr"> - itag:</span> <span class="hljs-number">137</span>
<span class="hljs-attr"> container:</span> <span class="hljs-string">mp4</span>
<span class="hljs-attr"> quality:</span> <span class="hljs-number">1920</span><span class="hljs-string">x1080</span>
<span class="hljs-attr"> size:</span> <span class="hljs-number">101.9</span> <span class="hljs-string">MiB</span> <span class="hljs-string">(106816582</span> <span class="hljs-string">bytes)</span>
 <span class="hljs-comment"># download-with: you-get --itag=137 [URL]</span>

<span class="hljs-attr">- itag:</span> <span class="hljs-number">248</span>
<span class="hljs-attr"> container:</span> <span class="hljs-string">webm</span>
<span class="hljs-attr"> quality:</span> <span class="hljs-number">1920</span><span class="hljs-string">x1080</span>
<span class="hljs-attr"> size:</span> <span class="hljs-number">90.3</span> <span class="hljs-string">MiB</span> <span class="hljs-string">(94640185</span> <span class="hljs-string">bytes)</span>
 <span class="hljs-comment"># download-with: you-get --itag=248 [URL]</span>

<span class="hljs-attr">- itag:</span> <span class="hljs-number">136</span>
<span class="hljs-attr"> container:</span> <span class="hljs-string">mp4</span>
<span class="hljs-attr"> quality:</span> <span class="hljs-number">1280</span><span class="hljs-string">x720</span>
<span class="hljs-attr"> size:</span> <span class="hljs-number">56.9</span> <span class="hljs-string">MiB</span> <span class="hljs-string">(59672392</span> <span class="hljs-string">bytes)</span>
 <span class="hljs-comment"># download-with: you-get --itag=136 [URL]</span>

<span class="hljs-attr">- itag:</span> <span class="hljs-number">247</span>
<span class="hljs-attr"> container:</span> <span class="hljs-string">webm</span>
<span class="hljs-attr"> quality:</span> <span class="hljs-number">1280</span><span class="hljs-string">x720</span>
<span class="hljs-attr"> size:</span> <span class="hljs-number">52.6</span> <span class="hljs-string">MiB</span> <span class="hljs-string">(55170859</span> <span class="hljs-string">bytes)</span>
 <span class="hljs-comment"># download-with: you-get --itag=247 [URL]</span>

<span class="hljs-attr">- itag:</span> <span class="hljs-number">135</span>
<span class="hljs-attr"> container:</span> <span class="hljs-string">mp4</span>
<span class="hljs-attr"> quality:</span> <span class="hljs-number">854</span><span class="hljs-string">x480</span>
<span class="hljs-attr"> size:</span> <span class="hljs-number">32.2</span> <span class="hljs-string">MiB</span> <span class="hljs-string">(33757856</span> <span class="hljs-string">bytes)</span>
 <span class="hljs-comment"># download-with: you-get --itag=135 [URL]</span>

<span class="hljs-attr">- itag:</span> <span class="hljs-number">244</span>
<span class="hljs-attr"> container:</span> <span class="hljs-string">webm</span>
<span class="hljs-attr"> quality:</span> <span class="hljs-number">854</span><span class="hljs-string">x480</span>
<span class="hljs-attr"> size:</span> <span class="hljs-number">28.0</span> <span class="hljs-string">MiB</span> <span class="hljs-string">(29369484</span> <span class="hljs-string">bytes)</span>
 <span class="hljs-comment"># download-with: you-get --itag=244 [URL]</span>

<span class="hljs-string">[</span> <span class="hljs-string">DEFAULT</span> <span class="hljs-string">]</span> <span class="hljs-string">`_____________________________`</span> 
<span class="hljs-attr"> - itag:</span> <span class="hljs-number">22</span>
<span class="hljs-attr"> container:</span> <span class="hljs-string">mp4</span>
<span class="hljs-attr"> quality:</span> <span class="hljs-string">hd720</span>
<span class="hljs-attr"> size:</span> <span class="hljs-number">56.9</span> <span class="hljs-string">MiB</span> <span class="hljs-string">(59654303</span> <span class="hljs-string">bytes)</span>
 <span class="hljs-comment"># download-with: you-get --itag=22 [URL]</span>

</code></pre><p>默认情况下，You-Get 会下载标记为 “DEFAULT” 的格式。如果你对格式或分辨率不满意，可以选择你喜欢的格式，使用格式对应的 itag 值即可。</p>
<pre><code class="hljs vim">$ you-<span class="hljs-built_in">get</span> --itag=<span class="hljs-number">244</span> http<span class="hljs-variable">s:</span>//www.youtube.<span class="hljs-keyword">com</span>/watch?v=HXaglTFJLMc

</code></pre><h4><a href="#下载音频"></a>下载音频</h4>
<p>执行下面的命令，可以从 soundcloud 网站下载音频：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> you-get <span class="hljs-string">'https://soundcloud.com/uiceheidd/all-girls-are-same-999-prod-nick-mira'</span>
Site: SoundCloud.com
Title: <span class="hljs-keyword">ALL</span> GIRLS ARE THE SAME (<span class="hljs-keyword">PROD</span>. NICK MIRA)
Type: MP3 (audio/mpeg)
Size: <span class="hljs-number">2.58</span> MiB (<span class="hljs-number">2710046</span> Bytes)

Downloading <span class="hljs-keyword">ALL</span> GIRLS ARE THE SAME (<span class="hljs-keyword">PROD</span>. NICK MIRA).mp3 ...
 <span class="hljs-number">100</span>% ( <span class="hljs-number">2.6</span>/ <span class="hljs-number">2.6</span>MB) ├███████████████████████████████████████████████████████┤[<span class="hljs-number">1</span>/<span class="hljs-number">1</span>] <span class="hljs-number">983</span> kB/s


</code></pre><p>查看音频文件细节，使用 <code>-i</code> 参数：</p>
<pre><code class="hljs q">$ you-<span class="hljs-built_in">get</span> -i 'https:<span class="hljs-comment">//soundcloud.com/uiceheidd/all-girls-are-same-999-prod-nick-mira'</span>

</code></pre><h4><a href="#下载图片"></a>下载图片</h4>
<p>运行如下命令下载图片：</p>
<pre><code class="hljs vim">$ you-<span class="hljs-built_in">get</span> http<span class="hljs-variable">s:</span>//pixabay.<span class="hljs-keyword">com</span>/<span class="hljs-keyword">en</span>/mountain-crumpled-cyanus-montanus-<span class="hljs-number">3393209</span>/

</code></pre><p>You-Get 也可以下载网页中的全部图片：</p>
<pre><code class="hljs vim">$ you-<span class="hljs-built_in">get</span> http<span class="hljs-variable">s:</span>//www.ostechnix.<span class="hljs-keyword">com</span>/pacvim-<span class="hljs-keyword">a</span>-cli-game-<span class="hljs-keyword">to</span>-learn-<span class="hljs-keyword">vim</span>-commands/

</code></pre><h4><a href="#搜索视频"></a>搜索视频</h4>
<p>你只需向 You-Get 传递一个任意的搜索项，而无需给出有效的 URL；You-Get 会使用 Google 搜索并下载与你给出搜索项最相关的视频。(LCTT 译注：Google 的机器人检测机制可能导致 503 报错导致该功能无法使用）。</p>
<pre><code class="hljs armasm">$ you-<span class="hljs-meta">get</span> <span class="hljs-string">'Micheal Jackson'</span>
<span class="hljs-symbol">Google</span> Videos search:
<span class="hljs-keyword">Best </span>matched result:
<span class="hljs-symbol">site</span>: YouTube
<span class="hljs-symbol">title</span>: Michael Jackson - <span class="hljs-keyword">Beat </span><span class="hljs-keyword">It </span>(Official Video)
<span class="hljs-keyword">stream:
</span> - <span class="hljs-keyword">itag: </span><span class="hljs-number">43</span>
<span class="hljs-symbol"> container:</span> webm
<span class="hljs-symbol"> quality:</span> medium
<span class="hljs-symbol"> size:</span> <span class="hljs-number">29</span>.<span class="hljs-number">4</span> MiB (<span class="hljs-number">30792050</span> <span class="hljs-keyword">bytes)
</span> # download-with: you-<span class="hljs-meta">get</span> --<span class="hljs-keyword">itag=43 </span>[URL]

<span class="hljs-symbol">Downloading</span> Michael Jackson - <span class="hljs-keyword">Beat </span><span class="hljs-keyword">It </span>(Official Video).webm ...
 <span class="hljs-number">100</span>% ( <span class="hljs-number">29</span>.<span class="hljs-number">4</span>/ <span class="hljs-number">29</span>.<span class="hljs-number">4</span>MB) ├███████████████████████████████████████████████████████┤[<span class="hljs-number">1</span>/<span class="hljs-number">1</span>] <span class="hljs-number">2</span> MB/s

</code></pre><h4><a href="#观看视频"></a>观看视频</h4>
<p>You-Get 可以将在线视频导流至你的视频播放器或浏览器，跳过广告和评论部分。（LCTT 译注：使用 <code>-p</code> 参数需要对应的 vlc/chrominum 命令可以调用，一般适用于具有图形化界面的操作系统）。</p>
<p>以 VLC 视频播放器为例，使用如下命令在其中观看视频：</p>
<pre><code class="hljs stylus">$ you-get -<span class="hljs-selector-tag">p</span> vlc https:<span class="hljs-comment">//www.youtube.com/watch?v=HXaglTFJLMc</span>

</code></pre><p>或者</p>
<pre><code class="hljs vim">$ you-<span class="hljs-built_in">get</span> --player vlc http<span class="hljs-variable">s:</span>//www.youtube.<span class="hljs-keyword">com</span>/watch?v=HXaglTFJLMc

</code></pre><p>类似地，将视频导流至以 chromium 为例的浏览器中，使用如下命令：</p>
<pre><code class="hljs stylus">$ you-get -<span class="hljs-selector-tag">p</span> chromium https:<span class="hljs-comment">//www.youtube.com/watch?v=HXaglTFJLMc</span>

</code></pre><p><a href="https://camo.githubusercontent.com/bc53815f911c3aa4266f48536d806c696074c017/687474703a2f2f7777772e6f73746563686e69782e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031382f30352f796f752d6765742e6a7067"><img src="https://p0.ssl.qhimg.com/t01b4413471c2fbcb31.jpg" alt=""></a></p>
<p>在上述屏幕截图中，可以看到并没有广告和评论部分，只是一个包含视频的简单页面。</p>
<h4><a href="#设置下载视频的路径及文件名"></a>设置下载视频的路径及文件名</h4>
<p>默认情况下，使用视频标题作为默认文件名，下载至当前工作目录。当然，你可以按照你的喜好进行更改，使用 <code>–output-dir</code> 或 <code>-o</code> 参数可以指定路径，使用 <code>–output-filename</code> 或 <code>-O</code> 参数可以指定下载文件的文件名。</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>you-get -o ~<span class="hljs-regexp">/Videos -O output.mp4 https:/</span><span class="hljs-regexp">/www.youtube.com/watch</span>?v=HXaglTFJLMc

</code></pre><h4><a href="#暂停和恢复下载"></a>暂停和恢复下载</h4>
<p>按 <code>CTRL+C</code> 可以取消下载。一个以 <code>.download</code> 为扩展名的临时文件会保存至输出路径。下次你使用相同的参数下载时，下载过程将延续上一次的过程。</p>
<p>当文件下载完成后，以 <code>.download</code> 为扩展名的临时文件会自动消失。如果这时你使用同样参数下载，You-Get 会跳过下载；如果你想强制重新下载，可以使用 <code>–force</code> 或 <code>-f</code> 参数。</p>
<p>查看命令的帮助部分可以获取更多细节，命令如下：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> you-get --<span class="hljs-built_in">help</span></span>

</code></pre><p>这次的分享到此结束，后续还会介绍更多的优秀工具，敬请期待！</p>
<p>感谢各位阅读！</p>
<hr>
<p>via: <a href="https://www.ostechnix.com/you-get-a-cli-downloader-to-download-media-from-80-websites/">https://www.ostechnix.com/you-get-a-cli-downloader-to-download-media-from-80-websites/</a></p>
<p>作者：<a href="https://www.ostechnix.com/author/sk/">SK</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/pinewall">pinewall</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://www.zcfy.cc/article/you-get-a-cli-downloader-to-download-media-from-80-websites](https://www.zcfy.cc/article/you-get-a-cli-downloader-to-download-media-from-80-websites)

## 原文标题
You-Get：支持 80 多个网站的命令行多媒体下载器
