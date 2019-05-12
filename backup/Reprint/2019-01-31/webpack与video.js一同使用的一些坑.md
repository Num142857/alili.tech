---
title: 'webpack与video.js一同使用的一些坑' 
date: 2019-01-31 2:31:16
hidden: true
slug: zznyicmde9
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://videojs.com/" rel="nofollow noreferrer" target="_blank">video.js</a>是一个优秀的视频播放器库，不过官网的示例中，是作为全局变量<code>videojs</code>引入的。如果我们的项目使用ES6风格的模块，用webpack来做打包的话，就需要做一些额外的工作。本文介绍我在使用的时候遇到的一些“坑”。</p>
<h4>基本使用方法</h4>
<p>直接从npm安装video.js，然后就可以在代码中使用video.js了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install video.js --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm install <span class="hljs-selector-tag">video</span><span class="hljs-selector-class">.js</span> --save</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import videojs from 'video.js';

videojs(document.getElementById('foo'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> videojs <span class="hljs-keyword">from</span> <span class="hljs-string">'video.js'</span>;

videojs(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'foo'</span>));</code></pre>
<h4>引入默认皮肤样式</h4>
<p>但是这样使用并没有引入video.js的皮肤样式文件，播放器是没有界面的。</p>
<p>所以还需要引入CSS文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'video.js/dist/video-js.css';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> 'video.js/dist/video-js.css';</span></code></pre>
<p>另外需要注意的是，因为CSS中使用了图标字体，还需要用webpack的<code>file-loader</code>处理字体文件。在webpack配置文件中添加这样的loader配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.(ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
  loader: 'file',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">test</span>: /\.(ttf|eot|svg|<span class="hljs-built_in">woff</span>(2))(\?[a-z0-<span class="hljs-number">9</span>]+)?$/,
  loader: <span class="hljs-string">'file'</span>,
}</code></pre>
<h4>引入Flash播放器的SWF文件</h4>
<p>对于一些HTML5播放器播放不了的格式，video.js回调用Flash播放器去播放器，这样就需要引入一个SWF文件。方法还是用<code>file-loader</code>。在之前的配置中加上<code>swf</code>扩展名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.(swf|ttf|eot|svg|woff(2))(\?[a-z0-9]+)?$/,
  loader: 'file',
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">test</span>: /\.(swf|ttf|eot|svg|<span class="hljs-built_in">woff</span>(2))(\?[a-z0-<span class="hljs-number">9</span>]+)?$/,
  loader: <span class="hljs-string">'file'</span>,
}</code></pre>
<p>然后在代码中配置SWF文件的路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import SWF_PATH from 'video.js/dist/video-js.swf';

videojs.options.flash.swf = SWF_PATH;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> SWF_PATH <span class="hljs-keyword">from</span> <span class="hljs-string">'video.js/dist/video-js.swf'</span>;

videojs.<span class="hljs-keyword">options</span>.flash.swf = SWF_PATH;</code></pre>
<h4>引入<a href="https://github.com/mozilla/vtt.js" rel="nofollow noreferrer" target="_blank">vtt.js</a>
</h4>
<p>如果使用Flash播放器，video.js还会异步请求一个<code>vtt.js</code>文件。这个是用来处理WebVTT文件的。</p>
<p>这个JS文件的路径的配置方法跟上面的SWF文件的配置方法是类似的。但是，webpack默认会对JS文件打包，而我们需要的是通过<code>file-loader</code>来引入这个JS文件，从而获得其形对路径，所以要在import语句中指定具体的loader：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VTTJS_PATH from 'file!videojs-vtt.js/dist/vtt.min.js';

videojs.options['vtt.js'] = VTTJS_PATH;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> VTTJS_PATH <span class="hljs-keyword">from</span> <span class="hljs-string">'file!videojs-vtt.js/dist/vtt.min.js'</span>;

videojs.<span class="hljs-keyword">options</span>[<span class="hljs-string">'vtt.js'</span>] = VTTJS_PATH;</code></pre>
<h4>引入其他语言翻译</h4>
<p>video.js包含了很多种语言的本地化，但是没有包含在库中，需要我们自己加载：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'video.js/dist/lang/zh-CN';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> 'video.js/dist/lang/zh-CN';</span></code></pre>
<p>这样加载的问题是，本地化JS代码中使用了<code>videojs</code>这个全局变量，但是webpack并没有将其暴露，所以运行会报错。</p>
<p>解决这个问题有两种方法，<a href="http://webpack.github.io/docs/shimming-modules.html#importing" rel="nofollow noreferrer" target="_blank">在webpack的文档有所提及</a>。</p>
<p>第一种方法是使用<code>imports-loader</code>，在import一个JS的时候，注入一个全局变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'imports?videojs=video.js!video.js/dist/lang/zh-CN'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> <span class="hljs-string">'imports?videojs=video.js!video.js/dist/lang/zh-CN'</span></code></pre>
<p>这样的语句，就是告诉webpack，将<code>videojs</code>这个全局变量指向<code>video.js</code>这个模块。这样就不会报错。</p>
<p>第二种方法是使用<code>ProvidePlugin</code>，直接把全局变量暴露出来。</p>
<p>在webpack的配置文件中，增加这样的plugin配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
  videojs: 'video.js',
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.ProvidePlugin</span>({
  <span class="hljs-attribute">videojs</span>: <span class="hljs-string">'video.js'</span>,
}),</code></pre>
<p>这样就表示把<code>video.js</code>模块暴露为全局变量<code>videojs</code>。</p>
<h4>使用插件</h4>
<p>video.js有很多插件，他们一般也会使用<code>videojs</code>这个全局变量。因此如果直接引入也会报错。解决方法跟上一部分“引入其他语言翻译”的方法一样，在此不赘述。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack与video.js一同使用的一些坑

## 原文链接
[https://segmentfault.com/a/1190000007603266](https://segmentfault.com/a/1190000007603266)

