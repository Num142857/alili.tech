---
title: 'vue cli单页模式下偶尔报错 invalid signature 的错误' 
date: 2019-01-18 2:30:34
hidden: true
slug: doykygln7f6
categories: [reprint]
---

{{< raw >}}

                    
<h4>最近遇到一个需求是调用jssdk进行语音录制的功能,功能已经开发好了,只是经常偶然性的config会报报错,大部分是报invalid signature的错误,这个错误不是必现的,只是经常性地出现.后来发现了原因.</h4>
<blockquote><ol>
<li><p>原因是使用了vue-router里面的history模式,这种模式下的url是不断变化的,而jssdk的在每一次url变化的时候都需要重新config,导致每一个跳转一个页面都需要重新去进行config,</p></li>
<li><p>而使用vue-router的默认模式,只是hash部分(#后面的内容)变化,这种变化是不需要重新进行config的</p></li>
<li><p>使用默认的vue-router的hash mode就可以,在根组件(一般是app.vue)里面配置config信息即可,代码如下</p></li>
</ol></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const wx = require('weixin-js-sdk')
// 配置微信 config信息
let data = {
  noncestr: 'Wm3WZYTPz0wzccnWsss',
  timestamp: +new Date(),
  url: window.location.href.split('#')[0],
  jsApiList: ['chooseImage', 'startRecord', 'playVoice', 'stopRecord', 'downloadVoice', 'uploadVoice', 'stopVoice']
}
// m6Get 是我自己封装的fetch方法
// 从后台获取appid和对应的signature
m6Get('getWechatSu', data).then((res) => {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: res.data.appid, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.noncestr, // 必填，生成签名的随机串
    signature: res.data.signature, // 必填，签名，见附录1
    jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>const wx = require(<span class="hljs-string">'weixin-js-sdk'</span>)
<span class="hljs-comment">// 配置微信 config信息</span>
let data = {
  noncestr: <span class="hljs-string">'Wm3WZYTPz0wzccnWsss'</span>,
  timestamp: +new Date(),
  url: window<span class="hljs-selector-class">.location</span><span class="hljs-selector-class">.href</span><span class="hljs-selector-class">.split</span>(<span class="hljs-string">'#'</span>)[<span class="hljs-number">0</span>],
  jsApiList: [<span class="hljs-string">'chooseImage'</span>, <span class="hljs-string">'startRecord'</span>, <span class="hljs-string">'playVoice'</span>, <span class="hljs-string">'stopRecord'</span>, <span class="hljs-string">'downloadVoice'</span>, <span class="hljs-string">'uploadVoice'</span>, <span class="hljs-string">'stopVoice'</span>]
}
<span class="hljs-comment">// m6Get 是我自己封装的fetch方法</span>
<span class="hljs-comment">// 从后台获取appid和对应的signature</span>
<span class="hljs-function"><span class="hljs-title">m6Get</span><span class="hljs-params">(<span class="hljs-string">'getWechatSu'</span>, data)</span></span>.then((res) =&gt; {
  wx.config({
    debug: false, <span class="hljs-comment">// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。</span>
    appId: res<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.appid</span>, <span class="hljs-comment">// 必填，公众号的唯一标识</span>
    timestamp: data<span class="hljs-selector-class">.timestamp</span>, <span class="hljs-comment">// 必填，生成签名的时间戳</span>
    nonceStr: data<span class="hljs-selector-class">.noncestr</span>, <span class="hljs-comment">// 必填，生成签名的随机串</span>
    signature: res<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.signature</span>, <span class="hljs-comment">// 必填，签名，见附录1</span>
    jsApiList: data<span class="hljs-selector-class">.jsApiList</span> <span class="hljs-comment">// 必填，需要使用的JS接口列表，所有JS接口列表见附录2</span>
  })
})</code></pre>
<blockquote><ol><li><p>之后其他页面不用再进行config配置了,可以直接使用 :)</p></li></ol></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue cli单页模式下偶尔报错 invalid signature 的错误

## 原文链接
[https://segmentfault.com/a/1190000008804738](https://segmentfault.com/a/1190000008804738)

