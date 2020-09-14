---
title: '不能错过的web前端性能优化总结' 
date: 2018-12-04 2:30:05
hidden: true
slug: kvwb7xez0hm
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>web前端性能优化主要分为以下几个板块:</strong></p>
<ul>
<li>
<p>加载优化</p>
<ul>
<li>DNS预解析</li>
<li>合并img、css、javascript文件，减少http请求</li>
<li>缓存一切可缓存资源</li>
<li>使用长Cache</li>
<li>使用外联式引用css、javascript文件</li>
<li>压缩HTML、css、javascript文件</li>
<li>启用GZip</li>
<li>使用首屏加载(比如同构)</li>
<li>使用按需加载资源文件</li>
<li>使用滚屏记载资源文件</li>
<li>资源懒加载</li>
<li>通过Media Query加载css文件</li>
<li>增加Loading进度条</li>
<li>减少Cookie</li>
<li>避免重点向</li>
</ul>
</li>
<li>
<p>图片优化</p>
<ul>
<li>在保证图片质量的情况下，压缩图片，减少图片大小</li>
<li>使用Css3、svg、iconfont代替图片</li>
<li>首次加载不大于1024KB的图片</li>
<li>图片宽不大于640px(移动端)</li>
</ul>
</li>
<li>
<p>脚本优化</p>
<ul>
<li>减少重回和回流操作</li>
<li>缓存DOM元素、DOM列表长度length、属性值</li>
<li>使用事件委托，避免批量绑定事件</li>
<li>尽量使用ID选择器</li>
<li>使用touch事件代替click事件</li>
<li>使用节流函数减少性能消耗</li>
</ul>
</li>
<li>
<p>HTML优化</p>
<ul>
<li>css文件写在头部，javascript放在尾部</li>
<li>避免层级深嵌套</li>
<li>避免img、iframe、a等元素的空src</li>
<li>避免行内样式和事件绑定</li>
<li>大图片避免使用base64</li>
</ul>
</li>
<li>
<p>css优化</p>
<ul>
<li>移除空的css规则</li>
<li>正确使用display的属性</li>
<li>不滥用float</li>
<li>不声明过多的font-size</li>
<li>值为0时不要使用单位</li>
<li>标准化各种浏览器前缀</li>
</ul>
</li>
<li>
<p>渲染优化</p>
<ul>
<li>HTML使用viewport(移动端)</li>
<li>减少DOM节点</li>
<li>尽量使用CSS3 3d动画来触发GPU渲染</li>
<li>使用requestAnimationFrame代替setTimeInter和setTimeout</li>
<li>适当使用canvas动画</li>
<li>对于resize、mousemove事件使用节流处理，较少DOM回流和重绘次数</li>
</ul>
</li>
</ul>
<p><strong>重点提示:</strong></p>
<ul>
<li>
<strong>首屏加载</strong><p>首屏的快速显示，可以大大提升用户对页面速度的感知，因此应尽量针对首屏的快速显示做优化，比如使用Loading等待动画、服务器渲染首屏(同构)...</p>
</li>
<li>
<p><strong>DNS预解析</strong></p>
<p>DNS 作为互联网的基础协议，其解析的速度似乎容易被网站优化人员忽视。现在大多数新浏览器已经针对DNS解    析进行了优化，典型的一次DNS解析耗费20-120 毫秒，减少DNS解析时间和次数是个很好的优化方式。DNS Prefetching是具有此属性的域名不需要用户点击链接就在后台解析，而域名解析和内容载入是串行的网络操作，所以这个方式能减少用户的等待时间，提升用户体验。</p>
<blockquote>浏览器对网站第一次的域名DNS解析查找流程依次为：</blockquote>
<p><strong>浏览器缓存-系统缓存-路由器缓存-ISP DNS缓存-递归搜索</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014518072?w=459&amp;h=374" src="https://static.alili.tech/img/remote/1460000014518072?w=459&amp;h=374" alt="DNS预解析" title="DNS预解析"></span></p>
<blockquote>DNS预解析的实现：</blockquote>
<p>用meta信息来告知浏览器, 当前页面要做DNS预解析:</p>
<pre><code>&lt;meta http-equiv="x-dns-prefetch-control" content="on" /&gt;</code></pre>
<p>在页面header中使用link标签来强制对DNS预解析:</p>
<pre><code>&lt;link rel="dns-prefetch" href="http://bdimg.share.baidu.com" /&gt;</code></pre>
<p>示例</p>
<pre><code>&lt;meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"&gt;
&lt;meta http-equiv="x-dns-prefetch-control" content="on" /&gt;
&lt;link rel="dns-prefetch" href="http://mat1.gtimg.com"/&gt;
&lt;link rel="dns-prefetch" href="http://tajs.qq.com" /&gt;</code></pre>
<p><em>注：dns-prefetch需慎用，多页面重复DNS预解析会增加重复DNS查询次数。</em></p>
<p>PS：DNS预解析主要是用于网站前端页面优化，在SEO中的作用湛蓝还未作验证，但作为增强用户体验的一部分rel="dns-prefetch"或许值得大家慢慢发现。</p>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
不能错过的web前端性能优化总结

## 原文链接
[https://segmentfault.com/a/1190000014518067](https://segmentfault.com/a/1190000014518067)

