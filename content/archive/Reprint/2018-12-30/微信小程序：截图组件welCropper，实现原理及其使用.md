---
title: '微信小程序：截图组件welCropper，实现原理及其使用' 
date: 2018-12-30 2:30:10
hidden: true
slug: hfcycbgu0op
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2158535-2c383e1129188a2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2158535-2c383e1129188a2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/400" alt="封面" title="封面" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2158535-32d08cf020285001.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2158535-32d08cf020285001.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240" alt="截图" title="截图" style="cursor: pointer; display: inline;"></span></p>
<p>最近做项目的时候，需要做一个截图功能。用了一个别人写的截图工具，发现截出的<strong>图质量下降了</strong>，但是我们图片要用来做识别, 需要保证截出的图质量不下降。而且也不支持通过拖动来调整截图框的大小。所以这个截图工具无法满足需求。因为所以，就自己动手写了一个截图组件。</p>
<p>下面介绍一下实现原理和使用方法。</p>
<h2 id="articleHeader0">实现原理</h2>
<p>组件<code>wxml</code>的层次结构图如下：</p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2158535-e8bad56fc67e707d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2158535-e8bad56fc67e707d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700" alt="hierarchy.png" title="hierarchy.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<code>original canvas</code> 用来绘制原图大小的图片，这样能保证截图后的质量不会下降，这个canvas是隐藏的。</li>
<li>
<code>movable-area</code>是<code>movable-view</code>的容器，是官方提供的拖拽移动组件，用来移动截取框的四个角。这个组件支持多个点同时移动。</li>
<li>
<code>scale canvas</code>用来绘制适应屏幕比例大小的图片（aspectFit），因为通常原图大小是超过屏幕长宽的。（一开始白线框和图片都在这一层，但后来发现每次移动都要绘制一次图片，这样会造成卡顿、性能下降。所以就想到通过增加一个<code>move canvas</code>来专门绘制白线框来降低绘制图片带来的资源消耗，因为图片是静止的，不需要重复绘制。）</li>
<li>
<code>move canvas</code>是根据四个<code>movable-view</code>的位置绘制出截图框。</li>
</ul>
<p>最后截图，通过四个点的位置计算出截图框的位置，然后放大对应原图大小的位置，得到在原图中的<code>(x, y, width, height)</code>，最后通过官方提供的<code>canvas</code>接口截图。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wx.canvasToTempFilePath({
  x: x,
  y: y,
  width: w,
  height: h,
  destWidth: w,
  destHeight: h,
  canvasId: 'originalCanvas',
  success: function (res) {
  }
)}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.canvasToTempFilePath</span>({
  <span class="hljs-attribute">x</span>: x,
  <span class="hljs-attribute">y</span>: y,
  <span class="hljs-attribute">width</span>: w,
  <span class="hljs-attribute">height</span>: h,
  <span class="hljs-attribute">destWidth</span>: w,
  <span class="hljs-attribute">destHeight</span>: h,
  <span class="hljs-attribute">canvasId</span>: <span class="hljs-string">'originalCanvas'</span>,
  <span class="hljs-attribute">success</span>: function (res) {
  }
)}</code></pre>
<h3 id="articleHeader1">旋转原理</h3>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2158535-77c109cfd849e99b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2158535-77c109cfd849e99b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/600" alt="设置旋转圆点" title="设置旋转圆点" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2158535-8b6ee48d13920bd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2158535-8b6ee48d13920bd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300" alt="旋转" title="旋转" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">特点</h2>
<ul>
<li>保证截图质量不会被压缩（也可以选择压缩图）</li>
<li>截图框能够通过拖拽四个角来调整选区大小</li>
</ul>
<h2 id="articleHeader3">使用</h2>
<p>假设我们的应用文件结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
./
├── app.js
├── app.json
├── app.wxss
├── pages
│&nbsp;&nbsp; └── index
│&nbsp;&nbsp;  &nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp;  &nbsp;&nbsp; ├── index.json
│&nbsp;&nbsp;  &nbsp;&nbsp; ├── index.wxml
│&nbsp;&nbsp;  &nbsp;&nbsp; └── index.wxss
└── welCropper
    ├── welCropper.js
    ├── welCropper.wxml
    └── welCropper.wxss" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
./
├── app<span class="hljs-selector-class">.js</span>
├── app<span class="hljs-selector-class">.json</span>
├── app<span class="hljs-selector-class">.wxss</span>
├── pages
│&nbsp;&nbsp; └── index
│&nbsp;&nbsp;  &nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp;  &nbsp;&nbsp; ├── index<span class="hljs-selector-class">.json</span>
│&nbsp;&nbsp;  &nbsp;&nbsp; ├── index<span class="hljs-selector-class">.wxml</span>
│&nbsp;&nbsp;  &nbsp;&nbsp; └── index<span class="hljs-selector-class">.wxss</span>
└── welCropper
    ├── welCropper<span class="hljs-selector-class">.js</span>
    ├── welCropper<span class="hljs-selector-class">.wxml</span>
    └── welCropper.wxss</code></pre>
<p>调用组件时，需要传入<code>cropperData</code>、<code>cropperMovableItems</code>、<code>cropperChangableData</code>，因为数据和事件都是绑定在<code>Page</code>上的，所以要避免使用组件里面已经被占用的命名。<br><em><strong>/pages/index/index.wxml</strong></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 引入组件 -->
<import src=&quot;/welCropper/welCropper.wxml&quot; />

<!-- 调用组件 -->
<template is=&quot;welCropper&quot; data=&quot;"{{"data:cropperData, cropperMovableItems:cropperMovableItems, cropperChangableData:cropperChangableData"}}"&quot;></template>

<!-- 用于选择图片，传入cropper中 -->
<button bindtap='selectTap'>select image</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!-- 引入组件 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">import</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/welCropper/welCropper.wxml"</span> /&gt;</span>

<span class="hljs-comment">&lt;!-- 调用组件 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"welCropper"</span> <span class="hljs-attr">data</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"data:cropperData, cropperMovableItems:cropperMovableItems, cropperChangableData:cropperChangableData"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 用于选择图片，传入cropper中 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">bindtap</span>=<span class="hljs-string">'selectTap'</span>&gt;</span>select image<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span></code></pre>
<p><em><strong>/pages/index/index.js</strong></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取显示区域长宽
const device = wx.getSystemInfoSync()
const W = device.windowWidth
const H = device.windowHeight - 50

let cropper = require('../../welCropper/welCropper.js');

console.log(device)

Page({
    data: {
    },
    onLoad: function () {
        var that = this
        // 初始化组件数据和绑定事件
        cropper.init.apply(that, [W, H]);
    },
    selectTap() {
        var that = this

        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success(res) {
                const tempFilePath = res.tempFilePaths[0]
                console.log(tempFilePath)
                
                // 将选取图片传入cropper，并显示cropper
                // mode=rectangle 返回图片path
                // mode=quadrangle 返回4个点的坐标，并不返回图片。这个模式需要配合后台使用，用于perspective correction
                let modes = [&quot;rectangle&quot;, &quot;quadrangle&quot;]
                let mode = modes[0]   //rectangle, quadrangle
                that.showCropper({
                    src: tempFilePath,
                    mode: mode,
                    sizeType: ['original', 'compressed'],   //'original'(default) | 'compressed'
                    callback: (res) => {
                        if (mode == 'rectangle') {
                            console.log(&quot;crop callback:&quot; + res)
                            wx.previewImage({
                                current: '',
                                urls: [res]
                            })
                        }
                        else {
                            wx.showModal({
                                title: '',
                                content: JSON.stringify(res),
                            })

                            console.log(res)
                        }

                        // that.hideCropper() //隐藏，我在项目里是点击完成就上传，所以如果回调是上传，那么隐藏掉就行了，不用previewImage
                    }
                })
            }
        })
    }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 获取显示区域长宽</span>
<span class="hljs-keyword">const</span> device = wx.getSystemInfoSync()
<span class="hljs-keyword">const</span> W = device.windowWidth
<span class="hljs-keyword">const</span> H = device.windowHeight - <span class="hljs-number">50</span>

<span class="hljs-keyword">let</span> cropper = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../welCropper/welCropper.js'</span>);

<span class="hljs-built_in">console</span>.log(device)

Page({
    <span class="hljs-attr">data</span>: {
    },
    <span class="hljs-attr">onLoad</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>
        <span class="hljs-comment">// 初始化组件数据和绑定事件</span>
        cropper.init.apply(that, [W, H]);
    },
    selectTap() {
        <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>

        wx.chooseImage({
            <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">// 默认9</span>
            sizeType: [<span class="hljs-string">'original'</span>, <span class="hljs-string">'compressed'</span>], <span class="hljs-comment">// 可以指定是原图还是压缩图，默认二者都有</span>
            sourceType: [<span class="hljs-string">'album'</span>, <span class="hljs-string">'camera'</span>], <span class="hljs-comment">// 可以指定来源是相册还是相机，默认二者都有</span>
            success(res) {
                <span class="hljs-keyword">const</span> tempFilePath = res.tempFilePaths[<span class="hljs-number">0</span>]
                <span class="hljs-built_in">console</span>.log(tempFilePath)
                
                <span class="hljs-comment">// 将选取图片传入cropper，并显示cropper</span>
                <span class="hljs-comment">// mode=rectangle 返回图片path</span>
                <span class="hljs-comment">// mode=quadrangle 返回4个点的坐标，并不返回图片。这个模式需要配合后台使用，用于perspective correction</span>
                <span class="hljs-keyword">let</span> modes = [<span class="hljs-string">"rectangle"</span>, <span class="hljs-string">"quadrangle"</span>]
                <span class="hljs-keyword">let</span> mode = modes[<span class="hljs-number">0</span>]   <span class="hljs-comment">//rectangle, quadrangle</span>
                that.showCropper({
                    <span class="hljs-attr">src</span>: tempFilePath,
                    <span class="hljs-attr">mode</span>: mode,
                    <span class="hljs-attr">sizeType</span>: [<span class="hljs-string">'original'</span>, <span class="hljs-string">'compressed'</span>],   <span class="hljs-comment">//'original'(default) | 'compressed'</span>
                    callback: <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
                        <span class="hljs-keyword">if</span> (mode == <span class="hljs-string">'rectangle'</span>) {
                            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"crop callback:"</span> + res)
                            wx.previewImage({
                                <span class="hljs-attr">current</span>: <span class="hljs-string">''</span>,
                                <span class="hljs-attr">urls</span>: [res]
                            })
                        }
                        <span class="hljs-keyword">else</span> {
                            wx.showModal({
                                <span class="hljs-attr">title</span>: <span class="hljs-string">''</span>,
                                <span class="hljs-attr">content</span>: <span class="hljs-built_in">JSON</span>.stringify(res),
                            })

                            <span class="hljs-built_in">console</span>.log(res)
                        }

                        <span class="hljs-comment">// that.hideCropper() //隐藏，我在项目里是点击完成就上传，所以如果回调是上传，那么隐藏掉就行了，不用previewImage</span>
                    }
                })
            }
        })
    }
})
</code></pre>
<p>最后引入组件的样式<br><em><strong>/pages/index/index.wxss</strong></em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import &quot;/welCropper/welCropper.wxss&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">@<span class="hljs-keyword">import</span> <span class="hljs-string">"/welCropper/welCropper.wxss"</span>;</code></pre>
<h2 id="articleHeader4">注意</h2>
<ul><li>因为<code>wx.canvasToTempFilePath</code>输出的是<code>.png</code>图片，截出来的图有可能远远大于原图（比如3通道图变成4通道的图）</li></ul>
<h2 id="articleHeader5">源代码</h2>
<ul>
<li>
<a href="https://github.com/tomfriwel/welCropper" rel="nofollow noreferrer" target="_blank">Github:tomfriwel/welCropper</a>，将<code>welCropper</code>文件夹复制到自己项目，引入调用就行了。</li>
<li><a href="https://github.com/callmesoul/wepy-corpper" rel="nofollow noreferrer" target="_blank">wepy 版本：github: callmesoul/wepy-corpper</a></li>
</ul>
<h4><strong><em>如果出现什么bug、问题或者建议可以告诉我，我会尽量改进。</em></strong></h4>
<h2 id="articleHeader6">效果图</h2>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2158535-bedf30dc0d9ca735.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2158535-bedf30dc0d9ca735.gif?imageMogr2/auto-orient/strip" alt="效果动图mode=rectangle" title="效果动图mode=rectangle" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2158535-b24ca97a376501aa.gif?imageMogr2/auto-orient/strip" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2158535-b24ca97a376501aa.gif?imageMogr2/auto-orient/strip" alt="效果动图mode=quadrangle" title="效果动图mode=quadrangle" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2158535-160c32c03e14a938.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2158535-160c32c03e14a938.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300" alt="效果图mode=rectangle" title="效果图mode=rectangle" style="cursor: pointer; display: inline;"></span></p>
<h4>如果将<code>movable-view</code>显示出来是这样的：</h4>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2158535-06e62d35b74b0f04.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2158535-06e62d35b74b0f04.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300" alt="显示movable-view后" title="显示movable-view后" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="http://upload-images.jianshu.io/upload_images/2158535-7a45c633faa6e908.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300" src="https://static.alili.techhttp://upload-images.jianshu.io/upload_images/2158535-7a45c633faa6e908.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/300" alt="mode=quadrangle" title="mode=quadrangle" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序：截图组件welCropper，实现原理及其使用

## 原文链接
[https://segmentfault.com/a/1190000011307688](https://segmentfault.com/a/1190000011307688)

