---
title: 'canvas绘制海报+二维码，满足绝大部分场景' 
date: 2018-12-18 2:30:11
hidden: true
slug: otygbcd0mbc
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><a href="https://github.com/sayll/canvas_x" rel="nofollow noreferrer" target="_blank">canvas_x</a></h1>
<p>无需任何第三方依赖，轻型工具库。<br>canvas绘制海报，生成带logo的二维码。也可生成编辑界面，用户自定义输入，一键生成等等</p>
<h2 id="articleHeader1">项目地址</h2>
<blockquote><a href="https://github.com/sayll/canvas_x" rel="nofollow noreferrer" target="_blank">https://github.com/sayll/canvas_x</a></blockquote>
<h2 id="articleHeader2">使用方法</h2>
<p>可直接通过script标签引入<code>lib/canvas_x.js</code>，也可当第三方模块引入。</p>
<blockquote>通过script引入，可通过全局变量<code>canvas_x</code>直接使用。详情可见demo。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012737308?w=362&amp;h=622" src="https://static.alili.tech/img/remote/1460000012737308?w=362&amp;h=622" alt="预览" title="预览" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">接口</h2>
<table>
<thead><tr>
<th>函数</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>makeImage(options, ...)</td>
<td>绘制一个图片</td>
</tr>
<tr>
<td>renderEditor(container, options, callback)</td>
<td>创建编辑节点DOM</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader4">makeImage：高阶合成图片</h2>
<blockquote>可以接受三个类型：图片，文字，二维码</blockquote>
<table>
<thead><tr>
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>options</td>
<td>object</td>
<td>MakeImageOptions（详情请见，核心配置项）</td>
</tr>
<tr>
<td>callback</td>
<td>function</td>
<td>回调参数：(error?: string, data?: string) =&gt; void</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader5">renderEditor：生成编辑界面</h2>
<blockquote>可以接受三个类型：图片，文字，二维码</blockquote>
<table>
<thead><tr>
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>container</td>
<td>HTMLElement</td>
<td>一个容器元素节点</td>
</tr>
<tr>
<td>options</td>
<td>object</td>
<td>MakeImageOptions（详情请见，核心配置项</td>
</tr>
<tr>
<td>callback</td>
<td>function</td>
<td>回调参数：(base64: string) =&gt; void</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader6">MakeImageOptions: 核心配置项</h2>
<table>
<thead><tr>
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>parts</td>
<td>array</td>
<td>各组成部分(ImageEntry , TextEntry , QRCodeEntry): 详细见基础类型参数</td>
</tr>
<tr>
<td>width</td>
<td>number</td>
<td>最终图片宽度，建议为显示容器的二倍</td>
</tr>
<tr>
<td>height</td>
<td>number</td>
<td>最终图片高度，建议为显示容器的二倍</td>
</tr>
<tr>
<td>buttonText</td>
<td>string</td>
<td>编辑模式下，绘制画布按钮文案：null时，隐藏按钮。默认：'绘制画布'</td>
</tr>
<tr>
<td>resetButtonText</td>
<td>string</td>
<td>编辑模式下，重新编辑按钮文案：为空或null时，隐藏按钮。默认：'重新编辑'</td>
</tr>
<tr>
<td>compress</td>
<td>number</td>
<td>最终图片压缩比，默认0.8</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader7">基础类型参数</h2>
<ul><li>ImageEntry: 表示一个图片部分。</li></ul>
<table>
<thead><tr>
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>type</td>
<td>string</td>
<td>指定为图片类型：'image'</td>
</tr>
<tr>
<td>url</td>
<td>string</td>
<td>要绘制的图片地址，可以是 http: 或 data: 格式</td>
</tr>
<tr>
<td>radius</td>
<td>number</td>
<td>半径率，0-1之间</td>
</tr>
<tr>
<td>padding</td>
<td>number</td>
<td>内边距。通过background控制边框颜色，默认为'#fff'</td>
</tr>
<tr>
<td>background</td>
<td>string</td>
<td>默认为'#fff'</td>
</tr>
<tr>
<td>width</td>
<td>number</td>
<td>绘制的宽度</td>
</tr>
<tr>
<td>height</td>
<td>number</td>
<td>绘制的高度</td>
</tr>
<tr>
<td>editable</td>
<td>boolean</td>
<td>能否编辑，编辑模式下使用</td>
</tr>
<tr>
<td>selectImage</td>
<td>function</td>
<td>如需替换自己的资源为替换图片，可使用此参数； 参数返回一个 callback 接受你替换的图片 (base64或url) 注：当 editable 设置为 true 时，selectImage 将阻止默认 input[type=file]选取图片的默认行为</td>
</tr>
<tr>
<td>x</td>
<td>number</td>
<td>相对于左上角的水平坐标</td>
</tr>
<tr>
<td>y</td>
<td>number</td>
<td>相对于左上角的垂直坐标</td>
</tr>
<tr>
<td>opacity</td>
<td>number</td>
<td>透明度。0-1 之间</td>
</tr>
</tbody>
</table>
<ul><li>TextEntry: 表示一个文本部分。</li></ul>
<table>
<thead><tr>
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>type</td>
<td>string</td>
<td>指定为文本类型：'text'</td>
</tr>
<tr>
<td>text</td>
<td>string</td>
<td>要绘制的内容。使用 n 换行</td>
</tr>
<tr>
<td>size</td>
<td>string</td>
<td>字体大小</td>
</tr>
<tr>
<td>color</td>
<td>string</td>
<td>字体颜色</td>
</tr>
<tr>
<td>bold</td>
<td>boolean</td>
<td>是否加粗</td>
</tr>
<tr>
<td>editable</td>
<td>boolean</td>
<td>能否编辑，编辑模式下使用</td>
</tr>
<tr>
<td>x</td>
<td>number</td>
<td>相对于左上角的水平坐标</td>
</tr>
<tr>
<td>y</td>
<td>number</td>
<td>相对于左上角的垂直坐标</td>
</tr>
<tr>
<td>opacity</td>
<td>number</td>
<td>透明度。0-1 之间</td>
</tr>
</tbody>
</table>
<ul><li>QRCodeEntry: 表示一个二维码部分</li></ul>
<table>
<thead><tr>
<th>参数</th>
<th>类型</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>type</td>
<td>string</td>
<td>指定为二维码类型：'qrcode'</td>
</tr>
<tr>
<td>text</td>
<td>string</td>
<td>要绘制的内容。网址需要使用 http: 开头</td>
</tr>
<tr>
<td>padding</td>
<td>number</td>
<td>内边距。通过background控制边框颜色，默认为'#fff'</td>
</tr>
<tr>
<td>background</td>
<td>string</td>
<td>默认为'#fff'</td>
</tr>
<tr>
<td>level</td>
<td>number</td>
<td>容错等级。1-5，数值越大容错越高</td>
</tr>
<tr>
<td>logo</td>
<td>string</td>
<td>二维码logo的地址,可以是 http: 或 data: 格式</td>
</tr>
<tr>
<td>width</td>
<td>number</td>
<td>绘制的宽度</td>
</tr>
<tr>
<td>height</td>
<td>number</td>
<td>绘制的高度</td>
</tr>
<tr>
<td>x</td>
<td>number</td>
<td>相对于左上角的水平坐标</td>
</tr>
<tr>
<td>y</td>
<td>number</td>
<td>相对于左上角的垂直坐标</td>
</tr>
<tr>
<td>opacity</td>
<td>number</td>
<td>透明度。0-1 之间</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader8">开发命令</h2>
<table>
<thead><tr>
<th><code>npm run &lt;script&gt;</code></th>
<th>note</th>
</tr></thead>
<tbody>
<tr>
<td><code>build</code></td>
<td>打包文件</td>
</tr>
<tr>
<td><code>build:dev</code></td>
<td>监听修改</td>
</tr>
<tr>
<td><code>browse</code></td>
<td>启动server</td>
</tr>
<tr>
<td><code>start</code></td>
<td>start 整个项目server服务</td>
</tr>
</tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
canvas绘制海报+二维码，满足绝大部分场景

## 原文链接
[https://segmentfault.com/a/1190000012737303](https://segmentfault.com/a/1190000012737303)

