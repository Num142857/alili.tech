---
title: '如何解决 VLC 视频嵌入字幕中遇到的错误' 
date: 2019-01-22 2:30:08
hidden: true
slug: 4ks15a9h05e
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何解决-vlc-视频嵌入字幕中遇到的错误"></a>如何解决 VLC 视频嵌入字幕中遇到的错误</h1>
<p>这会是一个有点奇怪的教程。背景故事如下。最近，我创作了一堆 <a href="https://www.youtube.com/watch?v=cDphUib5iG4">Risitas y las paelleras</a> 素材中<a href="https://www.youtube.com/watch?v=MpDdGOKZ3dg">sweet</a> <a href="https://www.youtube.com/watch?v=KHG6fXEba0A">parody</a> <a href="https://www.youtube.com/watch?v=TXw5lRi97YY">的片段</a>，以主角 Risitas 疯狂的笑声而闻名。和往常一样，我把它们上传到了 Youtube，但是从当我决定使用字幕起，到最终在网上可以观看时，我经历了一个漫长而曲折的历程。</p>
<p>在本指南中，我想介绍几个你可能会在创作自己的媒体时会遇到的典型问题，主要是使用字幕，然后上传到媒体共享门户网站，特别是 Youtube 中，以及如何解决这些问题。跟我来。</p>
<h3><a href="#背景故事"></a>背景故事</h3>
<p>我选择的视频编辑软件是 Kdenlive，当我创建那愚蠢的 <a href="http://www.dedoimedo.com/computers/frankenstein-media.html">Frankenstein</a> 片段时开始使用这个软件，从那以后它一直是我的忠实伙伴。通常，我将文件交给带有 VP8 视频编解码器和 Vorbis 音频编解码器的 WebM 容器来渲染，因为这是 Google 所喜欢的格式。事实上，我在过去七年里上传的大约 40 个不同的片段中都没有问题。</p>
<p><a href="https://camo.githubusercontent.com/d177eb1db94ee6413b9618ab83989de6c56bb00e/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f766c632d737562732d6572726f72732d6b64656e6c6976652d6372656174652d70726f6a6563742e6a7067"><img src="https://p0.ssl.qhimg.com/t016c48b89d11b0a5f5.jpg" alt="Kdenlive, create project"></a></p>
<p><a href="https://camo.githubusercontent.com/27f4af4da04bb6e1e0f2d95c64380f195b948589/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f766c632d737562732d6572726f72732d6b64656e6c6976652d72656e6465722e706e67"><img src="https://p0.ssl.qhimg.com/t0176a14887bc312a91.png" alt="Kdenlive, render"></a></p>
<p>但是，在完成了我的 Risitas＆Linux 项目之后，我遇到了一个困难。视频文件和字幕文件仍然是两个独立的实体，我需要以某种方式将它们放在一起。我最初关于字幕的文章提到了 Avidemux 和 Handbrake，这两个都是有效的选项。</p>
<p>但是，我对它们任何一个的输出都并不满意，而且由于种种原因，有些东西有所偏移。 Avidemux 不能很好处理视频编码，而 Handbrake 在最终输出中省略了几行字幕，而且字体是丑陋的。这个可以解决，但这不是今天的话题。</p>
<p>因此，我决定使用 VideoLAN（VLC） 将字幕嵌入视频。有几种方法可以做到这一点。你可以使用 “Media &gt; Convert/Save” 选项，但这不能达到我们需要的。相反，你应该使用 “Media &gt; Stream”，它带有一个更完整的向导，它还提供了一个我们需要的可编辑的代码转换选项 - 请参阅我的<a href="http://www.dedoimedo.com/computers/vlc-subtitles.html">教程</a>关于字幕的部分。</p>
<h3><a href="#错误"></a>错误！</h3>
<p>嵌入字幕的过程并没那么简单的。你有可能遇到几个问题。本指南应该能帮助你解决这些问题，所以你可以专注于你的工作，而不是浪费时间调试怪异的软件错误。无论如何，在使用 VLC 中的字幕时，你将会遇到一小部分可能会遇到的问题。尝试以及出错，还有书呆子的设计。</p>
<h3><a href="#没有可播放的流"></a>没有可播放的流</h3>
<p>你可能选择了奇怪的输出设置。你要仔细检查你是否选择了正确的视频和音频编解码器。另外，请记住，一些媒体播放器可能没有所有的编解码器。此外，确保在所有要播放的系统中都测试过了。</p>
<p><a href="https://camo.githubusercontent.com/e223446cc99f2ca897aec3c311539d34d478b34b/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f766c632d737562732d6572726f72732d6e6f2d706c617961626c652d73747265616d732e706e67"><img src="https://p0.ssl.qhimg.com/t012bf63e22da964fe9.png" alt="No playable streams"></a></p>
<h3><a href="#字幕叠加两次"></a>字幕叠加两次</h3>
<p>如果在第一步的流媒体向导中选择了 “Use a subtitle file”，则可能会发生这种情况。只需选择所需的文件，然后单击 “Stream”。取消选中该框。</p>
<p><a href="https://camo.githubusercontent.com/0cba03de441e8e07830ffa7468013f7346467f83/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f766c632d737562732d73656c6563742e706e67"><img src="https://p0.ssl.qhimg.com/t014bc8cc43f5dca68c.png" alt="Select file"></a></p>
<h3><a href="#字幕没有输出"></a>字幕没有输出</h3>
<p>这可能是两个主要原因。一、你选择了错误的封装格式。在进行编辑之前，请确保在配置文件页面上正确标记了字幕。如果格式不支持字幕，它可能无法正常工作。</p>
<p><a href="https://camo.githubusercontent.com/2cd0232bf110729fb8af1e861a2b2e9315644de9/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f766c632d737562732d656e6361702e706e67"><img src="https://p0.ssl.qhimg.com/t0131540c0e92a263c7.png" alt="Encapsulation"></a></p>
<p>二、你可能已经在最终输出中启用了字幕编解码器渲染功能。你不需要这个。你只需要将字幕叠加到视频片段上。在单击 “Stream” 按钮之前，请检查生成的流输出字符串并删除 “scodec=” 的选项。</p>
<p><a href="https://camo.githubusercontent.com/9c1004f03e53c61ab13804e730da05db3505c2ef/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f766c632d737562732d72656d6f76652d746578742e706e67"><img src="https://p0.ssl.qhimg.com/t01dc596ab896d5b0e3.png" alt="Remove text from output string"></a></p>
<h3><a href="#缺少编解码器的解决方法"></a>缺少编解码器的解决方法</h3>
<p>这是一个常见的 <a href="https://trac.videolan.org/vlc/ticket/6184">bug</a>，取决于编码器的实现的实验性，如果你选择以下配置文件，你将很有可能会看到它：“Video - H.264 + AAC (MP4)”。该文件将被渲染，如果你选择了字幕，它们也会被叠加上，但没有任何音频。但是，我们可以用技巧来解决这个问题。</p>
<p><a href="https://camo.githubusercontent.com/73c8166a6d8865526bc53e255ebb88ecdaf6dcfe/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f766c632d737562732d6572726f72732d6161632d636f6465632e706e67"><img src="https://p0.ssl.qhimg.com/t0130e1af3c91ef9937.png" alt="AAC codec"></a></p>
<p><a href="https://camo.githubusercontent.com/ca8433a43375703c87d6d21b0707059b92967bb2/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f766c632d737562732d6572726f72732d6d7034612e706e67"><img src="https://p0.ssl.qhimg.com/t018a5fc788d56cc525.png" alt="MP4A error"></a></p>
<p>一个可能的技巧是从命令行使用 “--sout-ffmpeg-strict=-2” 选项（可能有用）启动 VLC。另一个更安全的解决方法是采用无音频视频，但是带有字幕叠加，并将不带字幕的原始项目作为音频源用 Kdenlive 渲染。听上去很复杂，下面是详细步骤：</p>
<ul>
<li>将现有片段（包含音频）从视频移动到音频。删除其余的。</li>
<li>或者，使用渲染过的 WebM 文件作为你的音频源。</li>
<li>添加新的片段 - 带有字幕，并且没有音频。</li>
<li>将片段放置为新视频。</li>
<li>再次渲染为 WebM。</li>
</ul>
<p><a href="https://camo.githubusercontent.com/87ca4c15d04e2052f1d727554326e650ef8bd47c/687474703a2f2f7777772e6465646f696d65646f2e636f6d2f696d616765732f636f6d7075746572732d79656172732f323031362d322f766c632d737562732d6572726f72732d6b64656e6c6976652d7265706561742d72656e6465722e6a7067"><img src="https://p0.ssl.qhimg.com/t0140394611c45a5c14.jpg" alt="Repeat render"></a></p>
<p>使用其他类型的音频编解码器将很有可能可用（例如 MP3），你将拥有一个包含视频、音频和字幕的完整项目。如果你很高兴没有遗漏，你可以现在上传到 Youtube 上。但是之后 ...</p>
<h3><a href="#youtube-视频管理器和未知格式"></a>Youtube 视频管理器和未知格式</h3>
<p>如果你尝试上传非 WebM 片段（例如 MP4），则可能会收到未指定的错误，你的片段不符合媒体格式要求。我不知道为什么 VLC 会生成一个不符合 YouTube 规定的文件。但是，修复很容易。使用 Kdenlive 重新创建视频，将会生成带有所有正确的元字段和 Youtube 喜欢的文件。回到我原来的故事，我有 40 多个片段使用 Kdenlive 以这种方式创建。</p>
<p>P.S. 如果你的片段有有效的音频，则只需通过 Kdenlive 重新运行它。如果没有，重做视频/音频。根据需要将片段静音。最终，这就像叠加一样，除了你使用的视频来自于一个片段，而音频来自于另一个片段。工作完成。</p>
<h3><a href="#更多阅读"></a>更多阅读</h3>
<p>我不想用链接重复自己或垃圾信息。在“软件与安全”部分，我有 VLC 上的片段，因此你可能需要咨询。前面提到的关于 VLC 和字幕的文章已经链接到大约六个相关教程，涵盖了其他主题，如流媒体、日志记录、视频旋转、远程文件访问等等。我相信你可以像专业人员一样使用搜索引擎。</p>
<h3><a href="#总结"></a>总结</h3>
<p>我希望你觉得本指南有帮助。它涵盖了很多，我试图使其直接而简单，并解决流媒体爱好者和字幕爱好者在使用 VLC 时可能遇到的许多陷阱。这都与容器和编解码器相关，而且媒体世界几乎没有标准的事实，当你从一种格式转换到另一种格式时，有时你可能会遇到边际情况。</p>
<p>如果你遇到了一些错误，这里的提示和技巧应该可以至少帮助你解决一些，包括无法播放的流、丢失或重复的字幕、缺少编解码器和 Kdenlive 解决方法、YouTube 上传错误、隐藏的 VLC 命令行选项，还有一些其他东西。是的，这些对于一段文字来说是很多的。幸运的是，这些都是好东西。保重，互联网的孩子们。如果你有任何其他要求，我将来的 VLC 文章应该会涵盖，请随意给我发邮件。</p>
<p>干杯。</p>
<hr>
<p>via: <a href="http://www.dedoimedo.com/computers/vlc-subtitles-errors.html">http://www.dedoimedo.com/computers/vlc-subtitles-errors.html</a></p>
<p>作者：<a href="http://www.dedoimedo.com/faq.html">Dedoimedo</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何解决 VLC 视频嵌入字幕中遇到的错误

## 原文链接
[https://www.zcfy.cc/article/how-to-work-around-video-and-subtitle-embed-errors](https://www.zcfy.cc/article/how-to-work-around-video-and-subtitle-embed-errors)

