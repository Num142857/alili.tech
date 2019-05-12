---
title: '轴动效果插件，类似Github404页面' 
date: 2019-02-14 2:30:37
hidden: true
slug: 873d3czgfuv
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">轴动效果 axial3d</h1>
<blockquote>3D效果页插件，类似 Github404 页面动画。</blockquote>
<h2 id="articleHeader1">安装引入 Install</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install axial3d" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> axial3d</code></pre>
<p>or</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/axial3d&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/axial3d"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader2">例子 Example</h2>
<p><a href="https://bestvist.github.io/axial3d/demo/" rel="nofollow noreferrer" target="_blank">Demo</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
    <title>Demo - Axial3d</title>
</head>
<body>
    <script src=&quot;https://unpkg.com/axial3d&quot;></script>
    <div id=&quot;axial3d&quot;></div>
    <script>
        (function () {
            var options = {
                selector: '#axial3d',
                imgs: [
                    {src: 'https://bestvist.github.io/axial3d/public/demo1/bg.png', left: '50px', top: '10px'},
                    {src: 'https://bestvist.github.io/axial3d/public/demo1/2.png', left: '150px', top: '10px'},
                    {src: 'https://bestvist.github.io/axial3d/public/demo1/3.png', left: '50px', top: '300px'},
                    {src: 'https://bestvist.github.io/axial3d/public/demo1/4.png', left: '300px', top: '300px'}
                ]
            }
            var effect = new Axial3d(options);
        })()
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Demo - Axial3d<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/axial3d"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"axial3d"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">var</span> options = {
                selector: <span class="hljs-string">'#axial3d'</span>,
                imgs: [
                    {src: <span class="hljs-string">'https://bestvist.github.io/axial3d/public/demo1/bg.png'</span>, left: <span class="hljs-string">'50px'</span>, top: <span class="hljs-string">'10px'</span>},
                    {src: <span class="hljs-string">'https://bestvist.github.io/axial3d/public/demo1/2.png'</span>, left: <span class="hljs-string">'150px'</span>, top: <span class="hljs-string">'10px'</span>},
                    {src: <span class="hljs-string">'https://bestvist.github.io/axial3d/public/demo1/3.png'</span>, left: <span class="hljs-string">'50px'</span>, top: <span class="hljs-string">'300px'</span>},
                    {src: <span class="hljs-string">'https://bestvist.github.io/axial3d/public/demo1/4.png'</span>, left: <span class="hljs-string">'300px'</span>, top: <span class="hljs-string">'300px'</span>}
                ]
            }
            <span class="hljs-keyword">var</span> effect = <span class="hljs-keyword">new</span> Axial3d(options);
        })()
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016855648?w=420&amp;h=196" src="https://static.alili.tech/img/remote/1460000016855648?w=420&amp;h=196" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">属性 Props</h2>
<h3 id="articleHeader4">options</h3>
<table>
<thead><tr>
<th>属性</th>
<th>说明</th>
<th>类型</th>
<th>可选值</th>
<th>默认值</th>
</tr></thead>
<tbody>
<tr>
<td>selector</td>
<td>元素选择器</td>
<td>String</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>imgs</td>
<td>图片组</td>
<td>Array</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>transform</td>
<td>动画形式</td>
<td>String</td>
<td>translate / rotate</td>
<td>translate</td>
</tr>
<tr>
<td>swing</td>
<td>动画幅度</td>
<td>Number</td>
<td>-</td>
<td>5</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader5">imgs options</h3>
<table>
<thead><tr>
<th>属性</th>
<th>说明</th>
<th>类型</th>
<th>可选值</th>
<th>默认值</th>
</tr></thead>
<tbody>
<tr>
<td>src</td>
<td>图像路径</td>
<td>String</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>top</td>
<td>图片顶部定位</td>
<td>String</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>bottom</td>
<td>图片底部定位</td>
<td>String</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>left</td>
<td>图片左侧定位</td>
<td>String</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>right</td>
<td>图片右侧定位</td>
<td>String</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>static</td>
<td>图片是否静态，不随鼠标转动</td>
<td>Boolean</td>
<td>true / false</td>
<td>false</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader6">方法 Methods</h2>
<table>
<thead><tr>
<th>事件名称</th>
<th>说明</th>
<th>回调参数</th>
</tr></thead>
<tbody><tr>
<td>destory</td>
<td>取消事件监听</td>
<td>-</td>
</tr></tbody>
</table>
<p><strong><a href="https://github.com/bestvist/axial3d" rel="nofollow noreferrer" target="_blank">项目地址</a></strong><br><strong> 喜欢的欢迎star<span style="font-weight:normal;">👏</span><span style="font-weight:normal;">👏</span> </strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
轴动效果插件，类似Github404页面

## 原文链接
[https://segmentfault.com/a/1190000016855645](https://segmentfault.com/a/1190000016855645)

