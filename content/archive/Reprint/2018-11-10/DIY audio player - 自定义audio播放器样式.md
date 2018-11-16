---
title: DIY audio player - 自定义audio播放器样式
hidden: true
categories: [reprint]
slug: 1628a46f
date: 2018-11-10 02:30:10
---

{{< raw >}}
<p>&#x4E4B;&#x524D;&#x4E5F;&#x6709;&#x7528;&#x5230;audio&#xFF0C;&#x5927;&#x6982;&#x662F;&#x751F;&#x65E5;&#x8D3A;&#x5361;&#xFF0C;&#x535A;&#x5BA2;&#x97F3;&#x4E50;&#xFF0C;&#x64AD;&#x653E;&#x8BED;&#x97F3;&#x7B49;&#x573A;&#x666F;&#x3002;<br>&#x573A;&#x666F;&#x4E5F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#x52A0;&#x4E00;&#x70B9;&#x52A8;&#x753B;&#xFF0C;&#x518D;&#x7528;&#x4E0A;Audio&#x7684;API&#xFF0C;&#x57FA;&#x672C;&#x4E0A;&#x5C31;&#x53EF;&#x4EE5;&#x641E;&#x5B9A;&#x4E86;&#x3002;<br>&#x54E6;&#xFF0C;&#x53EF;&#x80FD;&#x8FD8;&#x4F1A;&#x6D89;&#x53CA;&#x5230;&#x81EA;&#x52A8;&#x64AD;&#x653E;&#x3002;<a href="https://xiaohuazheng.github.io/2017/04/18/audio-player/" rel="nofollow noreferrer" target="_blank">&#x3010;&#x8FD9;&#x91CC;&#x3011;</a></p><h3 id="articleHeader0">DIY</h3><p>&#x4EE5;&#x4E0A;&#x573A;&#x666F;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x90FD;&#x770B;&#x4E0D;&#x5230;Audio&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x57FA;&#x672C;&#x90FD;&#x88AB;&#x9690;&#x85CF;&#x4E86;&#x3002;&#x56E0;&#x4E3A;&#x5BF9;&#x4E8E;&#x65B0;&#x65F6;&#x4EE3;&#x7684;&#x6211;&#x4EEC;&#x6765;&#x8BF4;&#xFF0C;&#x6682;&#x65F6;&#x8FD8;&#x6CA1;&#x6709;get&#x5B83;&#x7684;&#x7F8E;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x63A7;&#x5236;&#x97F3;&#x9891;&#x7684;&#x64AD;&#x653E;&#xFF0C;&#x76F4;&#x89C2;&#x7684;&#x770B;&#x5230;&#x65F6;&#x95F4;&#x8FDB;&#x5EA6;&#x7B49;&#xFF0C;&#x90A3;&#x5C31;&#x9700;&#x8981;&#x5C55;&#x793A;&#x8FD9;&#x4E1C;&#x897F;&#x4E86;&#x3002;&#x4E16;&#x4E0A;&#x6CA1;&#x6709;&#x4E11;audio&#xFF0C;&#x53EA;&#x6709;&#x61D2;audio.</p><p>&#x6211;&#x4EEC;&#x7ED9;&#x5B83;&#x5316;&#x4E2A;&#x5986;&#x5C31;&#x597D;&#x4E86;&#x3002;&#x6DE1;&#x5986;&#xFF0C;&#x6DE1;&#x5986;&#x3002;</p><p><a href="https://github.com/xiaohuazheng/audioplayer" rel="nofollow noreferrer" target="_blank">&#x3010;code here&#x3011;</a></p><h3 id="articleHeader1">&#x8D44;&#x6599;</h3><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio" rel="nofollow noreferrer" target="_blank">HTML/Element/audio</a></p><p><a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events" rel="nofollow noreferrer" target="_blank">Media_events</a></p><h3 id="articleHeader2">Use</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(selector).initAudioPlayer();  // select &#x4E3A;audio&#x5143;&#x7D20;&#xFF0C;&#x53EF;&#x4EE5;&#x521D;&#x59CB;&#x5316;&#x591A;&#x4E2A;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code>$(<span class="hljs-keyword">selector).initAudioPlayer(); </span> // <span class="hljs-keyword">select </span>&#x4E3A;audio&#x5143;&#x7D20;&#xFF0C;&#x53EF;&#x4EE5;&#x521D;&#x59CB;&#x5316;&#x591A;&#x4E2A;
</code></pre><p>&#x64AD;&#x653E;&#x5668;&#x6837;&#x5F0F;&#x662F;&#x5199;&#x5728;js&#x4EE3;&#x7801;&#x91CC;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x9700;&#x8981;&#xFF0C;&#x53EF;&#x4EE5;&#x628A;&#x4EE3;&#x7801;&#x62A0;&#x51FA;&#x6765;&#x653E;&#x5728;CSS&#x6587;&#x4EF6;&#x91CC;&#x3002;&#x7136;&#x540E;&#x518D;&#x5316;&#x6210;&#x81EA;&#x5DF1;&#x559C;&#x6B22;&#x7684;&#x6837;&#x5B50;&#x3002;&#x6216;&#x8005;&#x4F60;&#x4EA7;&#x54C1;&#x7ECF;&#x7406;&#x559C;&#x6B22;&#x7684;&#x6837;&#x5B50;&#x3002;</p><h3 id="articleHeader3">DEMO</h3><p><a href="https://xiaohuazheng.github.io/demos/2018-06-02-audio-player-demo.html" rel="nofollow noreferrer" target="_blank">&#x6765;&#x4E2A;demo</a>&#xFF0C;PC &#x6253;&#x5F00;&#x4E3A;&#x79FB;&#x52A8;&#x7AEF;&#x6A21;&#x5F0F;&#x3002;</p><p>&#x624B;&#x673A;&#x626B;&#x63CF;&#x4E8C;&#x7EF4;&#x7801;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016381263" src="https://static.alili.tech/img/remote/1460000016381263" alt="audio-player" title="audio-player" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
DIY audio player - 自定义audio播放器样式

## 原文链接
[https://segmentfault.com/a/1190000016381260](https://segmentfault.com/a/1190000016381260)

