---
title: 'WEB直播技术入门及在 Vue 中应用 video.js' 
date: 2018-12-30 2:30:10
hidden: true
slug: 8vqpse4i3l9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">简介</h1>
<p>视频直播服务目前支持三种直播协议，分别是RTMP、HLS、FLV <a href="https://m.aliyun.com/doc/document_detail/49785.html" rel="nofollow noreferrer" target="_blank">以下内容来自阿里云帮助中心</a></p>
<ul>
<li>RTMP <code>实时消息传输协议，由Adobe公司研发，但当前还没有收入国际标准（wikipedia）</code>。协议比较全能，既可以用来推送又可以用来直播，其核心理念是将大块的视频帧和音频帧“剁碎”，然后以小数据包的形式在互联网上进行传输，且支持加密，因此隐私性相对比较理想，但拆包组包的过程比较复杂，所以在海量并发时容易出现一些不可预期的稳定性问题。</li>
<li>HLS 协议：<code>基于HTTP协议的流直播（wikipedia）</code>。苹果推出的解决方案，将视频分成 5-10 秒的视频小分片，然后用 m3u8 索引表进行管理。由于客户端下载到的视频都是 5-10 秒的完整数据，故视频的流畅性很好，但也同样引入了很大的延迟（HLS 的一般延迟在 10-30s 左右）。相比于 FLV， HLS 在iPhone 和大部分 Android 手机浏览器上的支持非常给力，所以常用于 QQ 和微信朋友圈的 URL 分享。</li>
<li>HTTP-FLV 协议由 Adobe 公司主推，格式极其简单，只是在大块的视频帧和音视频头部加入一些标记头信息，由于这种极致的简洁，在延迟表现和大规模并发方面都很成熟。唯一的不足就是在手机浏览器上的支持非常有限，但是用作手机端 APP 直播协议却异常合适。</li>
</ul>
<p>下面看一下三种技术的对比：<br><span class="img-wrap"><img data-src="/img/remote/1460000011346602" src="https://static.alili.tech/img/remote/1460000011346602" alt="live-tech-table.png" title="live-tech-table.png" style="cursor: pointer;"></span></p>
<h1 id="articleHeader1">在 Vue 中应用</h1>
<p>我们做的直播项目用 Vue 编写，后台主要输出 RTMP 和 HLS 的直播流</p>
<p>播放器使用的是 <a href="https://github.com/surmon-china/vue-video-player" rel="nofollow noreferrer" target="_blank">vue-video-player</a>，其实就是 <a href="https://github.com/videojs/video.js" rel="nofollow noreferrer" target="_blank">video.js</a> 集成到 vue 中</p>
<h2 id="articleHeader2">注意点</h2>
<p>下面说说用这个插件来直播的一些坑和注意点吧：</p>
<p>首先，常用的 demo 在 <code>vue-video-player</code> 中官方已经给出了，按要求来就可以，其中</p>
<ol>
<li>如果需要播放 HLS 流，需要安装 <a href="https://github.com/videojs/videojs-contrib-hls" rel="nofollow noreferrer" target="_blank">videojs-contrib-hls</a> 插件，非原生支持的浏览器，直播服务端需要开启 CORS（后面会讲到）</li>
<li>如果需要播放 RTMP 流，需要安装 <a href="https://github.com/videojs/videojs-flash" rel="nofollow noreferrer" target="_blank">videojs-flash</a> 插件</li>
<li>如果两个流都需要播放，flash 插件需要安装到 hls 插件之前</li>
</ol>
<h2 id="articleHeader3">兼容性</h2>
<p>下面说下这两个直播流的兼容性问题</p>
<ol>
<li>RTMP: 上面说了 RTMP 是 Adobe 公司研发的协议，目前主要的直播服务都主推 RTMP 流，它延时小，但是需要 flash 插件的支持，也需要的上面提到的安装 <code>videojs-flash</code> 的插件。但是在 MAC 下对 flash 插件支持不友好，而且 MAC 下的 flash 插件 firefox 浏览器和 chrome 还是两个插件。。这就很尴尬。</li>
<li>HLS: 这个协议兼容性较好，但是最大的缺点是延迟较高，大概 20s 左右，所以只能当做备选方案。</li>
</ol>
<p>说 HLS 兼容性较好，主要是指可以通过 JS 让用户免配置（不必安装flash），可以在 caniuse 看下 HLS 的支持程度：<a href="http://caniuse.com/#search=HLS" rel="nofollow noreferrer" target="_blank">http://caniuse.com/#search=HLS</a></p>
<p>只有 <code>Edge</code> 和 <code>Safari</code> 提供原生支持，其他浏览器都需要 JS 插件支持。那是不是只要引了 <code>videojs-contrib-hls</code> 就 ok 了呢？❌，这里面还有个坑。这个坑在该插件的官方文档有说明：</p>
<blockquote><p>Unlike a native HLS implementation, the HLS tech has to comply with the browser's security policies. That means that all the files that make up the stream must be served from the same domain as the page hosting the video player or from a server that has appropriate CORS headers configured. Easy instructions are available for popular webservers and most CDNs should have no trouble turning CORS on for your account.</p></blockquote>
<p>简单的意思就是：<code>除了原生支持 HLS 的浏览器，其他浏览器要想播 HLS，需要直播流服务端开启 CORS。</code></p>
<p>最后我们使用的方案是。优先使用 RTMP 流，如果不支持，就切换到 HLS 流。好在这个切换过程 video.js 会自动替我们做。下面贴一下相关配置代码。</p>
<h2 id="articleHeader4">配置代码</h2>
<p>Vue 实例中的播放器 options，更多代码见 <a href="https://github.com/savokiss/vue-videojs-demo" rel="nofollow noreferrer" target="_blank">https://github.com/savokiss/vue-videojs-demo</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      playerOptions: {
        autoplay: false, // 自动播放
        controls: true, // 是否显示控制栏
        techOrder: ['flash', 'html5'], // 兼容顺序
        sourceOrder: true, // 
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
          type: 'rtmp/mp4',
          src: 'rtmp://184.72.239.149/vod/&amp;mp4:BigBuckBunny_115k.mov'
        }, {
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
        }],
        poster: &quot;/static/img/no_data.png&quot;, // 播放器默认图片
        // controlBar: { // 配置控制栏
        //   timeDivider: false, // 时间分割线
        //   durationDisplay: false, // 总时间
        //   progressControl: true, // 进度条
        //   customControlSpacer: true, // 未知
        //   fullscreenToggle: true // 全屏
        // },
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">      playerOptions: {
        <span class="hljs-attr">autoplay</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 自动播放</span>
        controls: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 是否显示控制栏</span>
        techOrder: [<span class="hljs-string">'flash'</span>, <span class="hljs-string">'html5'</span>], <span class="hljs-comment">// 兼容顺序</span>
        sourceOrder: <span class="hljs-literal">true</span>, <span class="hljs-comment">// </span>
        flash: { <span class="hljs-attr">hls</span>: { <span class="hljs-attr">withCredentials</span>: <span class="hljs-literal">false</span> } },
        <span class="hljs-attr">html5</span>: { <span class="hljs-attr">hls</span>: { <span class="hljs-attr">withCredentials</span>: <span class="hljs-literal">false</span> } },
        <span class="hljs-attr">sources</span>: [{ <span class="hljs-comment">// 流配置，数组形式，会根据兼容顺序自动切换</span>
          type: <span class="hljs-string">'rtmp/mp4'</span>,
          <span class="hljs-attr">src</span>: <span class="hljs-string">'rtmp://184.72.239.149/vod/&amp;mp4:BigBuckBunny_115k.mov'</span>
        }, {
          <span class="hljs-attr">withCredentials</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">type</span>: <span class="hljs-string">'application/x-mpegURL'</span>,
          <span class="hljs-attr">src</span>: <span class="hljs-string">'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'</span>
        }],
        <span class="hljs-attr">poster</span>: <span class="hljs-string">"/static/img/no_data.png"</span>, <span class="hljs-comment">// 播放器默认图片</span>
        <span class="hljs-comment">// controlBar: { // 配置控制栏</span>
        <span class="hljs-comment">//   timeDivider: false, // 时间分割线</span>
        <span class="hljs-comment">//   durationDisplay: false, // 总时间</span>
        <span class="hljs-comment">//   progressControl: true, // 进度条</span>
        <span class="hljs-comment">//   customControlSpacer: true, // 未知</span>
        <span class="hljs-comment">//   fullscreenToggle: true // 全屏</span>
        <span class="hljs-comment">// },</span>
      },</code></pre>
<h1 id="articleHeader5">最后</h1>
<p>以上是最近研究直播项目的一些小的总结吧，直播中其他的技术暂时还没有涉及到，以后涉及到也会总结出来，如果有问题可以拍砖交流~<br>最后欢迎给我的 demo 项目 star 啊啊啊啊~</p>
<h1 id="articleHeader6">参考文档</h1>
<ul>
<li><a href="https://github.com/savokiss/vue-videojs-demo" rel="nofollow noreferrer" target="_blank">My GitHub Demo</a></li>
<li><a href="https://surmon-china.github.io/vue-video-player/" rel="nofollow noreferrer" target="_blank">vue-video-player Demo</a></li>
<li><a href="https://m.aliyun.com/doc/document_detail/49787.html?spm=5176.app49785.0.0.bgDTlk" rel="nofollow noreferrer" target="_blank">常见推流协议</a></li>
<li><a href="https://enable-cors.org/server.html" rel="nofollow noreferrer" target="_blank">开启CORS</a></li>
<li><a href="https://savokiss.com/tech/web-live-tech-with-vue.html" rel="nofollow noreferrer" target="_blank">原文链接</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WEB直播技术入门及在 Vue 中应用 video.js

## 原文链接
[https://segmentfault.com/a/1190000011346597](https://segmentfault.com/a/1190000011346597)

