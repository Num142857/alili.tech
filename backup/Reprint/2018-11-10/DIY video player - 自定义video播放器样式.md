---
title: DIY video player - 自定义video播放器样式
hidden: true
categories: [reprint]
slug: 6b1e07a2
date: 2018-11-10 02:30:10
---

{{< raw >}}
<h3 id="articleHeader0">DIY</h3><p>&#x672C;&#x6587;&#x57FA;&#x4E8E;HTML5 Video API&#xFF0C;&#x81EA;&#x5B9A;&#x4E49;Web&#x89C6;&#x9891;&#x64AD;&#x653E;&#x5668;&#x6837;&#x5F0F;&#x3002;</p><p>&#x5176;&#x5B9E;&#x5427;&#xFF0C;&#x539F;&#x751F;&#x7684;video &#x6807;&#x7B7E;&#x6837;&#x5F0F;&#x633A;&#x597D;&#x770B;&#x7684;&#xFF0C;&#x4F46;&#x6BCF;&#x4E2A;&#x4EBA;&#x7684;&#x89C6;&#x89C9;&#x611F;&#x53D7;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x4F1A;&#x6709;&#x9700;&#x8981;&#x6539;&#x53D8;&#x539F;&#x751F;&#x6837;&#x5F0F;&#x7684;&#x65F6;&#x5019;&#x3002;</p><p>&#x90A3;&#x5C31;&#x7ED9;&#x5B83;&#x5316;&#x4E2A;&#x5986;&#x54AF;&#x3002;&#x6DE1;&#x5986;&#xFF0C;&#x6DE1;&#x5986;&#x3002;</p><p><a href="https://github.com/xiaohuazheng/videoplayer" rel="nofollow noreferrer" target="_blank">&#x3010;code here&#x3011;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;video class=&quot;ppq-video video-hidden&quot; src=&quot;https://zhuanjia4v-1252768022.cossh.myqcloud.com/hualv/437D2592787911E8862FD89EF30F789D.mp4&quot;
       webkit-playsinline=&quot;true&quot;
       playsinline=&quot;true&quot;
       x-webkit-airplay=&quot;allow&quot; // &#x4F7F;video&#x652F;&#x6301;ios&#x7684;AirPlay&#x529F;&#x80FD;&#xFF0C;&#x9700;&#x8981;&#x7EC8;&#x7AEF;&#x652F;&#x6301;
       x5-playsinline 
       poster=&quot;https://img02.sogoucdn.com/app/a/200692/42345752787911E8BB8FD89EF30F789D?m-wh=960*540&quot; 
    &gt;&lt;/video&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;video <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;ppq-video video-hidden&quot;</span> src=<span class="hljs-string">&quot;https://zhuanjia4v-1252768022.cossh.myqcloud.com/hualv/437D2592787911E8862FD89EF30F789D.mp4&quot;</span>
       webkit-playsinline=<span class="hljs-string">&quot;true&quot;</span>
       playsinline=<span class="hljs-string">&quot;true&quot;</span>
       x-webkit-airplay=<span class="hljs-string">&quot;allow&quot;</span> <span class="hljs-comment">// &#x4F7F;video&#x652F;&#x6301;ios&#x7684;AirPlay&#x529F;&#x80FD;&#xFF0C;&#x9700;&#x8981;&#x7EC8;&#x7AEF;&#x652F;&#x6301;</span>
       x5-playsinline 
       poster=<span class="hljs-string">&quot;https://img02.sogoucdn.com/app/a/200692/42345752787911E8BB8FD89EF30F789D?m-wh=960*540&quot;</span> 
    &gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></span>
</code></pre><p>&#x6DFB;&#x52A0;playsinline&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webkit-playsinline=&quot;true&quot;
playsinline=&quot;true&quot;
x5-playsinline 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code><span class="hljs-attribute">webkit-playsinline</span>=<span class="hljs-string">&quot;true&quot;</span>
<span class="hljs-attribute">playsinline</span>=<span class="hljs-string">&quot;true&quot;</span>
x5-playsinline 
</code></pre><p>&#x8FD9;&#x4E2A;playsinline&#x5C5E;&#x6027;&#x662F;&#x8BA9;video&#x5185;&#x655B;&#x5230;&#x6D4F;&#x89C8;&#x5668;webview&#x91CC;&#x9762;&#xFF0C;&#x800C;&#x4E0D;&#x4F7F;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x7684;video&#x6837;&#x5F0F;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x8BA4;&#x8FD9;&#x4E2A;&#xFF0C;&#x5C31;&#x662F;&#x5F3A;&#x5236;&#x8981;&#x7528;&#x81EA;&#x5DF1;&#x7684;&#x3002;&#x6BD4;&#x5982;UC&#xFF0C;&#x4F60;&#x8981;&#x7528;&#x7684;&#x8BDD;&#x5C31;&#x9700;&#x8981;&#x5B83;&#x7ED9;&#x4F60;&#x914D;&#x7F6E;&#x767D;&#x540D;&#x5355;&#x3002;&#x6709;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x5C31;&#x662F;&#x4E0D;&#x652F;&#x6301;&#xFF0C;&#x767D;&#x540D;&#x5355;&#x90FD;&#x6CA1;&#x6709;&#x3002;</p><p>&#x5173;&#x4E8E;&#x817E;&#x8BAF;&#x7684;x5&#x7B49;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x770B;&#x4ED6;&#x4EEC;&#x7684;&#x6587;&#x7AE0;<a href="https://x5.tencent.com/tbs/guide/video.html" rel="nofollow noreferrer" target="_blank">&#x3010;&#x817E;&#x8BAF;&#x6D4F;&#x89C8;&#x670D;&#x52A1;-H5&#x540C;&#x5C42;&#x64AD;&#x653E;&#x5668;&#x63A5;&#x5165;&#x89C4;&#x8303;&#x3011;</a></p><h3 id="articleHeader1">&#x8D44;&#x6599;</h3><p><a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content" rel="nofollow noreferrer" target="_blank">Video/Audio</a></p><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video" rel="nofollow noreferrer" target="_blank">HTML/Element/video</a></p><p><a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events" rel="nofollow noreferrer" target="_blank">Media_events</a></p><h3 id="articleHeader2">Use</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(selector).initVideoPlayer();  // select &#x4E3A;video&#x5143;&#x7D20;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code>$(<span class="hljs-keyword">selector).initVideoPlayer(); </span> // <span class="hljs-keyword">select </span>&#x4E3A;video&#x5143;&#x7D20;
</code></pre><p>&#x64AD;&#x653E;&#x5668;&#x6837;&#x5F0F;&#x5728;<a href="https://github.com/xiaohuazheng/videoplayer" rel="nofollow noreferrer" target="_blank">git code</a>&#x9879;&#x76EE;&#x7684;demo&#x6587;&#x4EF6;&#x5939;&#x6709;&#x5355;&#x72EC;&#x7684;css&#xFF0C;&#x53EF;&#x6839;&#x636E;&#x9700;&#x8981;&#x6539;&#x6210;&#x81EA;&#x5DF1;&#x559C;&#x6B22;&#x7684;&#x6837;&#x5B50;&#xFF0C;&#x6216;&#x8005;&#x4F60;&#x4EA7;&#x54C1;&#x7ECF;&#x7406;&#x559C;&#x6B22;&#x7684;&#x6837;&#x5B50;&#x3002;</p><h3 id="articleHeader3">DEMO</h3><p><a href="https://xiaohuazheng.github.io/demos/2018-07-28-video-player-demo.html" rel="nofollow noreferrer" target="_blank">&#x6765;&#x4E2A;demo</a>&#xFF0C;PC &#x6253;&#x5F00;&#x4E3A;&#x79FB;&#x52A8;&#x7AEF;&#x6A21;&#x5F0F;&#xFF0C;PC&#x7684;&#x4E8B;&#x4EF6;&#x662F;&#x652F;&#x6301;&#x7684;&#xFF0C;&#x53EA;&#x662F;&#x6837;&#x5F0F;&#x9700;&#x8981;&#x81EA;&#x4E2A;&#x513F;&#x6765;&#x3002;</p><p>&#x624B;&#x673A;&#x626B;&#x63CF;&#x4E8C;&#x7EF4;&#x7801;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016381357?w=200&amp;h=200" src="https://static.alili.tech/img/remote/1460000016381357?w=200&amp;h=200" alt="video-player" title="video-player" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
DIY video player - 自定义video播放器样式

## 原文链接
[https://segmentfault.com/a/1190000016381354](https://segmentfault.com/a/1190000016381354)

