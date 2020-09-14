---
title: '微信小程序图片预加载组件 wxapp-img-loader' 
date: 2019-02-13 2:31:22
hidden: true
slug: 15jzzubufsa
categories: [reprint]
---

{{< raw >}}

                    
<p>由于微信小程序没有提供类似 Image 这样的 JS 对象，要实现图片的预加载要麻烦一些， wxapp-img-loader自定义组件可以在微信小程序中实现图片预加载功能。</p>
<h2>使用</h2>
<p>1、下载 wxapp-img-loader项目源代码（<a href="https://github.com/o2team/wxapp-img-loader" rel="nofollow noreferrer">https://github.com/o2team/wxa...</a>），将 img-loader 目录拷贝到你的项目中</p>
<p>2、在页面的 WXML 文件中添加以下代码，将组件模板引入</p>
<pre><code>&lt;import src="../../img-loader/img-loader.wxml"/&gt;
&lt;template is="img-loader" data=""{{" imgLoadList "}}""&gt;&lt;/template&gt;
</code></pre>
<p>3、在页面的 JS 文件中引入组件脚本</p>
<pre><code>const ImgLoader = require('../../img-loader/img-loader.js')

</code></pre>
<p>4、实例化一个 ImgLoader 对象，将 this(当前 Page 对象) 传入，第二个参数可选，为默认的图片加载完成的回调方法</p>
<pre><code>this.imgLoader = new ImgLoader(this)

</code></pre>
<p>5、调用 ImgLoader 实例的 load 方法进行图片加载，第一个参数为图片链接，第二个参数可选，为该张图片加载完成时的回调方法。图片加载完成的回调方法的第一个参数为错误信息（加载成功则为 null），第二个参数为图片信息（Object 类型，包括 src、width 及 height）。</p>
<pre><code>this.imgLoader.load(imgUrlOriginal, (err, data) =&gt; {    console.log('图片加载完成', err, data.src, data.width, data.height)
})
</code></pre>
<p>wxapp-img-loader组件可以加载单张图片、也可以加载多张图片。</p>
<p>运行效果：<br><span class="img-wrap"><img data-src="/img/bVbijDU?w=485&amp;h=717" src="https://static.alili.tech/img/bVbijDU?w=485&amp;h=717" alt="图片描述" title="图片描述"></span><br><span class="img-wrap"><img data-src="/img/bVbijEt?w=502&amp;h=737" src="https://static.alili.tech/img/bVbijEt?w=502&amp;h=737" alt="图片描述" title="图片描述"></span></p>
<h2>其他</h2>
<p>wxapp-img-loader项目地址：<a href="https://github.com/o2team/wxapp-img-loader" rel="nofollow noreferrer">https://github.com/o2team/wxa...</a></p>
<h2>【小程序推荐】百科知识词典</h2>
<p><span class="img-wrap"><img data-src="/img/bVbigfT?w=640&amp;h=360" src="https://static.alili.tech/img/bVbigfT?w=640&amp;h=360" alt="图片描述" title="图片描述"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序图片预加载组件 wxapp-img-loader

## 原文链接
[https://segmentfault.com/a/1190000016719405](https://segmentfault.com/a/1190000016719405)

