---
title: '基于 Vue 的直播播放器实战' 
date: 2019-01-31 2:31:16
hidden: true
slug: v9si6l7jimf
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVFwFZ?w=2328&amp;h=764" src="https://static.alili.tech/img/bVFwFZ?w=2328&amp;h=764" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前言</h2>
<p>时下直播的盛行让很多人对直播技术产生浓厚的兴趣，orange 本人也不例外，本文借着实战的目的完成一个 demo，并没有深入的讲解直播技术的实现原理以及推流和拉流的实现，为什么不深入讲解直播的底层技术，原因很简单大公司没必要看我的文章去了解如何搭建直播服务器，小企业又没有不要去搭建自己的直播服务器，因为涉及到的技术繁杂又琐碎，感兴趣的直接谷歌，各位大神有不同深度的讲解怎么去搭建自己的直播服务器，那么小企业人员、资金和技术有限怎么办，没错！买服务！！！</p>
<p>直播云服务也是今年的一个亮点，各大云平台都在做直播的服务，至于快慢选择的话 orange 只用过七牛云直播，没办法拿数据给大家建议</p>
<p>七牛的文档给的比较详细，如何获得自己的直播空间，如何绑定备案域名，如何解析域名，如何创建直播间以及整个的工作流程先上<a href="http://developer.qiniu.com/article/index.html#pili" rel="nofollow noreferrer" target="_blank">七牛官网</a>，其次看 <a href="https://github.com/pili-engineering" rel="nofollow noreferrer" target="_blank">github 上的库</a></p>
<p>整个过程相信大家都能顺利完成，说到我们的播放器拉流，那么播放的来源怎么获取呢？有安卓和ios开发经验的可以用移动端推流，没有经验的也不要紧推荐一个<a href="https://www.douyu.com/cms/zhibo/201311/13/250.shtml" rel="nofollow noreferrer" target="_blank">斗鱼的 OBS 教程</a></p>
<blockquote>注：以上的直播空间的搭建没有完成也可以看本文，更希望大家可以做成一个完整的 demo，我们的重点还是在于播放器的实现。</blockquote>
<h2 id="articleHeader1">直播协议</h2>
<p>首先，需要知道直播的常用协议，RTMP 和 HLS，经过测试在七牛云直播平台不采用加速的情况下 RTMP 的延时在 10s 内，HLS 在 10-20s。经过优化后的还没测试过。</p>
<p>至于这两个协议的选择还需要根据实际情况而定（只看延时大小是不对滴），还是给链接<a href="http://www.samirchen.com/ios-rtmp-vs-hls/" rel="nofollow noreferrer" target="_blank">直播协议的选择：RTMP vs. HLS</a></p>
<h2 id="articleHeader2">Vue 结合</h2>
<p>做过 H5 播放器的对与 video.js 并不陌生，实现的出发点也是在 video.js 上，默认大家都有 Vue 搭建和简单运用能力了，没有经验的可以看 orange 之前写的入门文章。</p>
<p>首先我们要新建一个组件，这个组件就是播放器的组件，组件名随意，最初的想法是直接使用 video.js，但是踩的坑比较深所以不推荐直接使用。</p>
<blockquote>坑：首次载入不会有问题，路由跳转后再回来如果不刷新页面，import 进来的 videojs 并不会执行，所以需要在 mounted 里执行 videojs() 函数，然后传对应的参数进去，最后需要加入下面代码防止监听函数在切换路由后继续执行。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeDestroy: function() {
  this.dispose()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">beforeDestroy: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.dispose()
}</code></pre>
<p>坑也踩完了，于是逛了一圈 github，发现了一个项目叫 <a href="https://github.com/surmon-china/vue-video-player" rel="nofollow noreferrer" target="_blank">vue-video-player</a></p>
<p>先安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-video-player --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install vue-video-player --save</code></pre>
<p>引用依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// import with ES6
import Vue from 'vue'
...
import VideoPlayer from 'vue-video-player'


// require with Node.js/Webpack
var Vue = require('vue')
...
var VideoPlayer = require('vue-video-player')

// The default is to turn off some of the features, you can choose according to their use of certain features enabled, do not enable the introduction will not require the corresponding file. 默认有些功能是不开启的，比如youtube国内不能用，则默认是关闭的，如果不启用对应的功能，则不会引入对应的包，减少项目代码体积，当然也有可能意味着对应的功能可能会出错，true 是开启，false是关闭，正常情况使用者不需要care就可以。

// Example(Only applies to the current global mode). 用配置项的话仅支持全局模式来配置，否则不会生效
VideoPlayer.config({
  youtube: true, // default false
  switcher: false, // default true
  hls: false // default true
})

// use
Vue.use(VideoPlayer)

// --------------------------------------

// or use with component(ES6)
import Vue from 'vue'
// ...
import { videoPlayer } from 'vue-video-player'

// use
export default {
  components: {
    videoPlayer
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// import with ES6</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
...
import VideoPlayer <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-video-player'</span>


<span class="hljs-comment">// require with Node.js/Webpack</span>
<span class="hljs-keyword">var</span> Vue = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue'</span>)
...
var VideoPlayer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-video-player'</span>)

<span class="hljs-comment">// The default is to turn off some of the features, you can choose according to their use of certain features enabled, do not enable the introduction will not require the corresponding file. 默认有些功能是不开启的，比如youtube国内不能用，则默认是关闭的，如果不启用对应的功能，则不会引入对应的包，减少项目代码体积，当然也有可能意味着对应的功能可能会出错，true 是开启，false是关闭，正常情况使用者不需要care就可以。</span>

<span class="hljs-comment">// Example(Only applies to the current global mode). 用配置项的话仅支持全局模式来配置，否则不会生效</span>
VideoPlayer.config({
  <span class="hljs-attr">youtube</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// default false</span>
  switcher: <span class="hljs-literal">false</span>, <span class="hljs-comment">// default true</span>
  hls: <span class="hljs-literal">false</span> <span class="hljs-comment">// default true</span>
})

<span class="hljs-comment">// use</span>
Vue.use(VideoPlayer)

<span class="hljs-comment">// --------------------------------------</span>

<span class="hljs-comment">// or use with component(ES6)</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">import</span> { videoPlayer } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-video-player'</span>

<span class="hljs-comment">// use</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    videoPlayer
  }
}</code></pre>
<h3 id="articleHeader3">HLS</h3>
<p>这里默认给出了 HLS 的方案，我们先去全局引入，到 main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VideoPlayer from 'vue-video-player';

VideoPlayer.config({
  youtube: true,
  switcher: true,
  hls: true
})

Vue.use(VideoPlayer)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> VideoPlayer <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-video-player'</span>;

VideoPlayer.config({
  <span class="hljs-attr">youtube</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">switcher</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">hls</span>: <span class="hljs-literal">true</span>
})

Vue.use(VideoPlayer)</code></pre>
<p>下面看下我的 component</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <video-player :options=&quot;videoOptions&quot;></video-player>
</template>

<script>
export default {
  name: 'Play',
  data () {
    return {
      videoOptions: {
        source: {
          type: &quot;application/x-mpegURL&quot;,
          src: 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8',
          withCredentials: false
        },
        language: 'zh-CN',
        live: true,
        autoplay: true,
        height: 540
      }
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">video-player</span> <span class="hljs-attr">:options</span>=<span class="hljs-string">"videoOptions"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video-player</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Play'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">videoOptions</span>: {
        <span class="hljs-attr">source</span>: {
          <span class="hljs-attr">type</span>: <span class="hljs-string">"application/x-mpegURL"</span>,
          <span class="hljs-attr">src</span>: <span class="hljs-string">'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8'</span>,
          <span class="hljs-attr">withCredentials</span>: <span class="hljs-literal">false</span>
        },
        <span class="hljs-attr">language</span>: <span class="hljs-string">'zh-CN'</span>,
        <span class="hljs-attr">live</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoplay</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-number">540</span>
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>到这里你的播放器就可以播放 HLS 链接了</p>
<h3 id="articleHeader4">RTMP</h3>
<p>上面说到库底层还是依赖 video.js， 所以呢我们不妨直接这样使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  name: 'Play',
  data () {
    return {
      videoOptions: {
        source: {
          type: &quot;rtmp/mp4&quot;,
          src: 'rtmp://your.streaming.provider.net/cfx/st/&amp;mp4:path/to/video.mp4',
          withCredentials: false
        },
        language: 'zh-CN',
        live: true,
        autoplay: true,
        height: 540
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'Play'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">videoOptions</span>: {
        <span class="hljs-attr">source</span>: {
          <span class="hljs-attr">type</span>: <span class="hljs-string">"rtmp/mp4"</span>,
          <span class="hljs-attr">src</span>: <span class="hljs-string">'rtmp://your.streaming.provider.net/cfx/st/&amp;mp4:path/to/video.mp4'</span>,
          <span class="hljs-attr">withCredentials</span>: <span class="hljs-literal">false</span>
        },
        <span class="hljs-attr">language</span>: <span class="hljs-string">'zh-CN'</span>,
        <span class="hljs-attr">live</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoplay</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-number">540</span>
      }
    }
  }
}</code></pre>
<h2 id="articleHeader5">总结</h2>
<p>两种方法均可尝试，上面给出的 src 换成自己的链接就实现拉流播放啦，当然你如果不用 vue 的话也没关系，直接参照 <a href="http://videojs.com/" rel="nofollow noreferrer" target="_blank">video.js 的官网</a>，单是 RTMP 的话不需要第三方库，如果是 HLS 的话需要引入<a href="https://github.com/videojs/videojs-contrib-hls" rel="nofollow noreferrer" target="_blank">videojs-contrib-hls</a>，看具体情况而定。</p>
<blockquote>文章出自 orange 的 个人博客 <a href="http://orangexc.xyz/" rel="nofollow noreferrer" target="_blank">http://orangexc.xyz/</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 Vue 的直播播放器实战

## 原文链接
[https://segmentfault.com/a/1190000007474673](https://segmentfault.com/a/1190000007474673)

