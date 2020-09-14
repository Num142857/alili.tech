---
title: '微信小程序脚手架及html转译GUI工具' 
date: 2019-02-01 2:30:10
hidden: true
slug: xexypirx1w9
categories: [reprint]
---

{{< raw >}}

                    
<p>微信小程序出现引发了很多讨论，许多开发者都跃跃欲试尝试了小程序的开发。它重新定义了自身的一套开发规范，对于现有的html页面是不支持了。</p>
<p>为此我们设想了一套方案，怎么最快速的把现有的开发流接入到小程序中，并能快速的修改现有html项目以符合微信小程序的规范？于是写了一套html暴力转译成wxml的方案，以及搭配了初始模板的脚手架。结构沿用<a href="https://segmentfault.com/a/1190000005879164">feWorkflow</a>，大部分改动是针对目录的gulp工作流。</p>
<h2 id="articleHeader0">1. 脚手架</h2>
<p>小程序有一套默认的文件结构，根目录下必须存放有以下3个文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├──app.js
├──app.json
├──app.wxss" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├──app<span class="hljs-selector-class">.js</span>
├──app<span class="hljs-selector-class">.json</span>
├──app.wxss</code></pre>
<p>而页面则由4个文件构成:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├──js
├──wxml
├──wxss
├──json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-bullet">.
</span>├──js
├──wxml
├──wxss
├──json</code></pre>
<p>根据这套规则，通过GUI工具新建的模板，这个脚手架会默认创建一个源码<code>src</code>目录：</p>
<p><span class="img-wrap"><img data-src="/img/bVFfc5?w=1458&amp;h=236" src="https://static.alili.tech/img/bVFfc5?w=1458&amp;h=236" alt="![template](docs/template.png)" title="![template](docs/template.png)" style="cursor: pointer; display: inline;"></span></p>
<p>点击<em>开发</em> ，会创建<code>dist</code>文件目录，将编译后的<code>less</code>（或在设置中配置成sass）文件转换成<code>wxss</code>文件，其他html,js, css文件的更改也会同步处理到<code>dist</code>目录中，图片资源则会通过<code>imagemin</code>进行压缩，抛出到<code>dist/image</code>目录中。<code>src</code>源码目录和<code>dist</code>目录（两者均可以通过配置项修改名称）的划分是为了保持源代码的完整性，以及维持图片的原始文件(psd等)，而不会在编译过程中被破坏。</p>
<p>到目前的微信开发者工具的版本（0.10.101100），已经附带自动刷新页面的功能，所以src目录中的所有改动，会同步修改dist目录下的文件并刷新，可以无缝在熟悉的编辑器中进行操作。</p>
<p><strong>脚手架示例：</strong><br>新建项目：<br><span class="img-wrap"><img data-src="/img/remote/1460000007409564?w=1920&amp;h=1080" src="https://static.alili.tech/img/remote/1460000007409564?w=1920&amp;h=1080" alt="http://ww1.sinaimg.cn/large/65e4f1e6gw1f9jsqaip9ug21hc0u04qr.gif" title="http://ww1.sinaimg.cn/large/65e4f1e6gw1f9jsqaip9ug21hc0u04qr.gif" style="cursor: pointer; display: inline;"></span></p>
<p>开发项目：<br><span class="img-wrap"><img data-src="/img/remote/1460000007409362?w=1280&amp;h=720" src="https://static.alili.tech/img/remote/1460000007409362?w=1280&amp;h=720" alt="http://ww4.sinaimg.cn/large/65e4f1e6gw1f9jr8uzjcvg20zk0k01l0.gif" title="http://ww4.sinaimg.cn/large/65e4f1e6gw1f9jr8uzjcvg20zk0k01l0.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">HTML to WXML转译工具</h2>
<p>demo:<br><span class="img-wrap"><img data-src="/img/remote/1460000007409363?w=1280&amp;h=720" src="https://static.alili.tech/img/remote/1460000007409363?w=1280&amp;h=720" alt="http://ww3.sinaimg.cn/large/65e4f1e6gw1f9jraxy76eg20zk0k0npe.gif" title="http://ww3.sinaimg.cn/large/65e4f1e6gw1f9jraxy76eg20zk0k0npe.gif" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">1.目录结构</h3>
<p>上文提到了小程序有默认的一套脚手架结构，编译工具会将源码目录下的所有html文件进行转译，并创建一个<code>当前目录名-build</code>的文件夹，将所有编译后的wxml存放到<code>page/文件名/文件名.wxml</code>。<code>app.json</code>全局配置的<code>pages</code>也会默认创建。根据创建的目录名，将同名的<code>css</code>文件，重命名为<code>wxss</code>文件，并存放到同名目录中，当css与文件名不符，则合并不符的css文件，存放到全局目录的<code>app.wxss</code>中。而因为小程序不再支持jQuery等等通用库，源码目录下的js会全部忽略，页面级的js，则会复制到同名目录中，这个js则包括注册页面的Page函数基础模板。</p>
<p>举个例子：<br>源码<code>test</code>目录文件结构如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├──test
|   └──css
|       └──index.css
|       └──global.css
|   └──js
|       └──index.js
|   └── index.html
|   └── other.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>├──test
<span class="hljs-string">|   └──css</span>
<span class="hljs-string">|       └──index.css</span>
<span class="hljs-string">|       └──global.css</span>
<span class="hljs-string">|   └──js</span>
<span class="hljs-string">|       └──index.js</span>
<span class="hljs-string">|   └── index.html</span>
<span class="hljs-string">|   └── other.html</span></code></pre>
<p>编译后的目录结构会改变为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├──test-build
|   └──app.wxss
|   └──page
|       └── index
|           └── index.wxml
|           └── index.wxss
|           └── index.js
|       └── other
|           └── other.wxml" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>├──test-build
<span class="hljs-string">|   └──app.wxss</span>
<span class="hljs-string">|   └──page</span>
<span class="hljs-string">|       └── index</span>
<span class="hljs-string">|           └── index.wxml</span>
<span class="hljs-string">|           └── index.wxss</span>
<span class="hljs-string">|           └── index.js</span>
<span class="hljs-string">|       └── other</span>
<span class="hljs-string">|           └── other.wxml</span></code></pre>
<h3 id="articleHeader3">2. HTML</h3>
<p>先来看一下wxml和html的标签大致的对比图：<br><span class="img-wrap"><img data-src="/img/bVFfFd?w=541&amp;h=286" src="https://static.alili.tech/img/bVFfFd?w=541&amp;h=286" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>根据图中标签的的匹配规则，在编译过程中，遍历html文件，先转换成xml，保证img等包含闭合标签，再通过正则匹配符合的标签来替换或者删除。这个替换标签可以在<code>设置</code>中更改。<br>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html -->
<div class=&quot;flow-form_tips&quot;>
  <div class=&quot;address&quot;>
    <span>广东联通</span>
    <span>立即生效</span>
    <span>月底失效</span>
    <span>全国可用</span>
  </div>
  <p class=&quot;desc&quot;>河南联通维护中，流量充值缓慢</p>
  <div class=&quot;tips hide&quot;>当地运营商维护中，请稍后再试</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flow-form_tips"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>广东联通<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>立即生效<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>月底失效<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>全国可用<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"desc"</span>&gt;</span>河南联通维护中，流量充值缓慢<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tips hide"</span>&gt;</span>当地运营商维护中，请稍后再试<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>编译后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- wxml -->
<view class=&quot;flow-form_tips&quot;>
  <view class=&quot;address&quot;>
  <text>广东联通</text> 
  <text>立即生效</text> 
  <text>月底失效</text> 
  <text>全国可用</text></view>
  <view class=&quot;desc&quot;>河南联通维护中，流量充值缓慢</view>
  <view class=&quot;tips hide&quot;>当地运营商维护中，请稍后再试</view>
</view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- wxml --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"flow-form_tips"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"address"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span>广东联通<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span> 
  <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span>立即生效<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span> 
  <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span>月底失效<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span> 
  <span class="hljs-tag">&lt;<span class="hljs-name">text</span>&gt;</span>全国可用<span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"desc"</span>&gt;</span>河南联通维护中，流量充值缓慢<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tips hide"</span>&gt;</span>当地运营商维护中，请稍后再试<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></code></pre>
<h3 id="articleHeader4">3. css</h3>
<p><strong>尺寸单位</strong><br>小程序推出了自身的计量单位<code>rpx</code>，并推荐使用<code>750</code>的设计稿作为开发标准，而目前组内开发普遍使用<code>640</code>的设计稿进行设计，同时使用<code>rem</code>进行适配。<br>所以在转义过程中，添加了设计稿尺寸的设置，默认设置，是<code>640</code>设计稿，<code>100</code>px计算<code>rem</code>，默认乘以<code>2</code>倍。<br>这个设置的意思是：我们在开发过程中使用640的设计稿，并使用rem兼容，iphone4屏幕320px的html font-size为<code>100px</code>，css中表现为：<code>640 / 2 / 100rem</code>， 即<code>640px == 3.2rem</code>;<br>css中会去遍历所有匹配<code>rem</code>的属性，获取数值，通过<code>(match * fontSize * (750 / viewport)).toFixed(2) * times</code>来计算rpx，即<code>(匹配数值 * fontSize * (750 / 640)).toFixed(2) * 2</code>。<br>而px转rpx则是由<code>(match * (750 / viewport) * times).toFixed(2)</code>来转换。</p>
<p>wxss支持大部分css的属性，但是仍有些情况下不兼容，但编译工具没有做处理，免得出现误删的情况，假如页面中写了<code>a</code>选择器，则需要手动改成<code>navigator</code>选择器。</p>
<h3 id="articleHeader5">4. image</h3>
<p>所有png|jpg|gif|svg格式图片统一进行压缩并复制到个目录下的<code>image</code>目录中，并将wxml中image的src，和wxss中的background-url修改为<code>../../image/</code></p>
<h2 id="articleHeader6">写在最后</h2>
<p>小程序的开发语言已经与日常开发的语言有所不同，一套通用的方案已经是不可行了，还是有很多东西需要手工去处理，比如<code>template</code>等。转译工具是在内部的产品环境下测试的，可能会有许多考虑不周的地方，欢迎大家斧正。</p>
<h2 id="articleHeader7">下载：</h2>
<p><a href="https://github.com/whatifhappen/feWorkflow/releases" rel="nofollow noreferrer" target="_blank">github</a><br>mac: <a href="https://github.com/whatifhappen/feWorkflow/releases/download/v0.0.1/feWorkflow-wechat-app-v0.0.1.dmg" rel="nofollow noreferrer" target="_blank">feWorkflow-wechat-app-v0.0.1.dmg</a><br>windows: <a href="https://github.com/whatifhappen/feWorkflow/releases/download/v0.0.1/feWorkflow-wechat-app-win.7z" rel="nofollow noreferrer" target="_blank">feWorkflow-wechat-app-win.7z</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序脚手架及html转译GUI工具

## 原文链接
[https://segmentfault.com/a/1190000007409359](https://segmentfault.com/a/1190000007409359)

