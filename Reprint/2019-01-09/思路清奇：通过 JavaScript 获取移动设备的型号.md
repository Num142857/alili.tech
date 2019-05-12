---
title: '思路清奇：通过 JavaScript 获取移动设备的型号' 
date: 2019-01-09 2:30:11
hidden: true
slug: nrj6dt1s5e
categories: [reprint]
---

{{< raw >}}

                    
<p>我们一般在浏览器里识别用户的访问设备都是通过 <code>User Agent</code> 这个字段来获取的，但是通过它我们只能获取一个大概的信息，比如你用的是 Mac 还是 Windows，用的是 iPhone 还是 iPad。如果我想知道你用的是第几代 iPhone，这个方法就不行了，前段时间我正好有这个需求，识别移动客户端的具体型号（主要是 iOS 设备），于是思考了下这个问题的实现。</p>
<p>首先，我跟大家一样想到了 UA，不过事实证明这路走不通。就在我无聊一个一个摆弄浏览器的 API 时，突然一篇文章里的某段代码提醒了了我。这篇文章讲的是怎样通过 js 获取图形设备信息的，因为 HTML5 支持了 canvas，所以可以通过 API 获取图形设备的型号，比如显卡的型号。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function () {
    var canvas = document.createElement('canvas'),
        gl = canvas.getContext('experimental-webgl'),
        debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

    console.log(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>),
        gl = canvas.getContext(<span class="hljs-string">'experimental-webgl'</span>),
        debugInfo = gl.getExtension(<span class="hljs-string">'WEBGL_debug_renderer_info'</span>);

    <span class="hljs-built_in">console</span>.log(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
})();</code></pre>
<p>运行这段代码就可以获取显卡的型号了，如果你在iOS的设备里运行，会获取到诸如 <code>Apple A9 GPU</code> 之类的信息。<strong>而我们知道每一代 iOS 设备的 GPU 型号都是不同的，比如 iPhone 6 是 A8，而 iPhone 6s 就是 A9。</strong>看到这里，你应该大概知道我的思路了，就是通过识别 GPU 的型号来辨别设备的型号。</p>
<p>不过这还有个小瑕疵，有些设备是同一代，也就是 GPU 型号完全相同，比如 iPhone 6s, iPhone 6s Plus, iPhone SE。它们用的都是 <code>Apple A9 GPU</code>，怎么区分开它们呢？你会发现它们最大的不同不就是分辨率不同吗？而通过 JavaScript 我们又可以方便地获取屏幕分辨率，这样把两个手段综合应用一下就可以获取设备的准确型号了。</p>
<p>这里有个示例网址，大家可以用手机访问<br><a href="https://joyqi.github.io/mobile-device-js/example.html" rel="nofollow noreferrer" target="_blank">https://joyqi.github.io/mobil...</a></p>
<p>我的代码都放在了 GitHub 上<br><a href="https://github.com/joyqi/mobile-device-js" rel="nofollow noreferrer" target="_blank">https://github.com/joyqi/mobi...</a></p>
<p>这次思考给了我一些解决问题的启发，我们在思考解决方案的时候从侧面入手说不定会有新的发现。就比如我们的这个代码，目前还无法识别同一代的 iPad Air 和 iPad mini，因为它们的 GPU 和分辨率均相同，但是延续这个思路其实是有很多解决方案的，比如大家可以研究下这两个设备的话筒和喇叭个数，而这个数量也是可以通过 JS 获取的 :P</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
思路清奇：通过 JavaScript 获取移动设备的型号

## 原文链接
[https://segmentfault.com/a/1190000010157682](https://segmentfault.com/a/1190000010157682)

