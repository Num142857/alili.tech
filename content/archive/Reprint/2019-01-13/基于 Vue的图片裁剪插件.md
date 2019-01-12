---
title: '基于 Vue的图片裁剪插件' 
date: 2019-01-13 2:30:11
hidden: true
slug: 9ye7kgumlsi
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-crpopper</h1>
<p><a href="http://xyxiao.cn/vue-cropper/example/" rel="nofollow noreferrer" target="_blank">预览</a><br><a href="https://github.com/xyxiao001/vue-cropper" rel="nofollow noreferrer" target="_blank">项目地址</a></p>
<h2 id="articleHeader1">一些想法</h2>
<p>网上看了看基于vue的图片裁剪的插件很少，刚刚好项目需要使用到图片裁剪，于是便有了这个插件的<br>诞生。</p>
<h3 id="articleHeader2">实现的原理</h3>
<p>通过canvas生成新的图片， 可以上传到后台保存。</p>
<h2 id="articleHeader3">效果图</h2>
<p><span class="img-wrap"><img data-src="/img/bVOSVA?w=1202&amp;h=498" src="https://static.alili.tech/img/bVOSVA?w=1202&amp;h=498" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>安装 npm install vue-cropper</h4>
<h4>使用  import VueCropper from vue-cropper</h4>
<table>
<thead><tr>
<td>名称</td>
        <td>功能</td>
        <td>默认值</td>
        <td>可选值</td>
    </tr></thead>
<tbody>
<tr>
<td>img</td>
        <td>裁剪图片的地址</td>
        <td>空</td>
        <td>url 地址 || base64 || blob</td>
    </tr>
<tr>
<td>outputSize</td>
        <td>裁剪生成图片的质量</td>
        <td>1</td>
        <td>0.1 - 1</td>
    </tr>
<tr>
<td>outputType</td>
        <td>裁剪生成图片的格式</td>
        <td>jpg (jpg 需要传入jpeg)</td>
        <td>jpeg || png || web</td>
    </tr>
</tbody>
</table>
<h3 id="articleHeader4">内置方法  通过this.$refs.cropper 调用</h3>
<h5>this.$refs.cropper.startCrop()  开始截图</h5>
<h5>this.$refs.cropper.stopCrop()  停止截图</h5>
<h5>this.$refs.cropper.clearCrop()  清除截图</h5>
<h5>this.$refs.cropper.getCropData()  获取截图信息</h5>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 Vue的图片裁剪插件

## 原文链接
[https://segmentfault.com/a/1190000009705227](https://segmentfault.com/a/1190000009705227)

