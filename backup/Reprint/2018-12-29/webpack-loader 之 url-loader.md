---
title: 'webpack-loader 之 url-loader' 
date: 2018-12-29 2:30:10
hidden: true
slug: eus7wlek3mp
categories: [reprint]
---

{{< raw >}}

                    
<h4>url-loader vs file-loader</h4>
<p><strong>既生瑜，何生亮？</strong></p>
<p>人家当然不是以卖萌为生的，卖萌不可耻，但是url-loader是有它的用处的。url-loader对未设置或者小于limit设置的图片进行转换，以base64的格式被img的src所使用；而对于大于limit byte的图片用file-loader进行解析。</p>
<p><span class="img-wrap"><img data-src="/img/bVWmmU?w=1002&amp;h=612" src="https://static.alili.tech/img/bVWmmU?w=1002&amp;h=612" alt="url-loader-code-part" title="url-loader-code-part" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVWmnB?w=693&amp;h=374" src="https://static.alili.tech/img/bVWmnB?w=693&amp;h=374" alt="file-loader-code-part" title="file-loader-code-part" style="cursor: pointer; display: inline;"></span></p>
<p>over~~,稍微瞄一下代码，是不是很简单，自己都在偷偷笑了，哇咔咔</p>
<p>不过虽然寥寥几行，还是有不懂得腻：</p>
<ul>
<li>
<p>模块入参content是个Buffer类型？</p>
<ul>
<li>Buffer是啥？是node处理二进制数据的接口哦，toString()方法可以帮你把二进制转化成base64格式，<a href="http://javascript.ruanyifeng.com/nodejs/buffer.html" rel="nofollow noreferrer" target="_blank">Buffer可以吃么，看我</a>
</li>
<li>为啥是Buffer类型？这个webpack处理有关系喽~，默认情况下，资源文件会被转换成utf-8字符串传给loader处理。这个代码里我们看到它设置了raw，翻译一下：loader这样就可以接受原始的Buffer了。<a href="http://www.css88.com/doc/webpack/api/loaders/" rel="nofollow noreferrer" target="_blank">如何写一个Loader?难道你不想知道么？</a>
</li>
</ul>
</li>
<li>
<p>file-loader最后一步干了啥？</p>
<ul>
<li>
<code>emitFile(name: string, content: Buffer|String, sourceMap: {...})</code> 这是 webpack loader context提供的内部方法，根据路径和内容生成一个新的图片，供html以绝对路径的方式进行请求和使用。</li>
<li>在file-loader的option配置中可以将emitFile设置为false，文件不再被重新创建，多用于在服务端模块的使用，图片直接使用服务端的即可。</li>
</ul>
</li>
</ul>
<h4>url-loader 配置</h4>
<p><strong>工欲善其事,必先利其器。</strong></p>
<p>看一下官网webpack给出的url-loader的配置参数吧。<br><a href="https://webpack.js.org/loaders/url-loader/" rel="nofollow noreferrer" target="_blank">戳我</a></p>
<table>
<thead><tr>
<th align="left">配置名称</th>
<th align="center">类型</th>
<th>默认值</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="left">limit</td>
<td align="center">{Number}</td>
<td>undefined</td>
<td align="left">转化为data-url内联使用的文件带下阈值</td>
</tr>
<tr>
<td align="left">mimetype</td>
<td align="center">{String}</td>
<td>文件扩展名</td>
<td align="left">文件的mimetype类型（默认使用文件扩展类型）</td>
</tr>
<tr>
<td align="left">fallback</td>
<td align="center">{String}</td>
<td>file-loader</td>
<td align="left">在文件大于limit时，交于处理的加载器</td>
</tr>
</tbody>
</table>
<p>在webpack中配置可如下：<br><span class="img-wrap"><img data-src="/img/bVWmG7?w=442&amp;h=232" src="https://static.alili.tech/img/bVWmG7?w=442&amp;h=232" alt="url-loader配置" title="url-loader配置" style="cursor: pointer; display: inline;"></span></p>
<h4>编码base64的姿势是什么呢？</h4>
<p><strong>知其然之其所以然。</strong></p>
<p>通过url-loader将小图片转换为base64后，面对一长串的它，你是否困惑了呢？它是谁？它又是怎么出现的？</p>
<p>带着这个问题，我们顺路看一下这个小东西的原理吧：</p>
<p>[<strong>名字的由来</strong>]：通过下面64个可打印的字符来表示二进制数据<br><span class="img-wrap"><img data-src="/img/bVWmHh?w=497&amp;h=645" src="https://static.alili.tech/img/bVWmHh?w=497&amp;h=645" alt="base64对照表" title="base64对照表" style="cursor: pointer; display: inline;"></span></p>
<p>[<strong>它的原理</strong>]：64=2的6次方，因此每6位都可以用一个base64字符表示。而每1个<br>字节是8位，那么<code>3个字节 = 3 * 8 = 24bit = 6 * 4 = 4个base64字符</code>(这样看来，用base64<br>表示二进制，比原来二进制表示多了1/3倍的字节)。</p>
<p>[<strong>它的步骤</strong>]</p>
<ul>
<li>按照字符长度，每3个8bit的字符为一组（不过3的倍数的字符组，用“=”进行填充）</li>
<li>根据分组，将每个字符用ASCII进行编码，并将其转换为8bit的二进制，从而得到一组3*8=24bit的字节<br> （如果不够24bit，用0进行填充）</li>
<li>将24bit划为4个6bit，转换成10进制值，在base64表中查找对应的符号，转换后的字符拼接起来就是最后的结果了.</li>
</ul>
<p>看一下这个小例子，练练手吧~<br>“Girl” =&gt; “JGlybA==”<br><span class="img-wrap"><img data-src="/img/bVWmHF?w=952&amp;h=134" src="https://static.alili.tech/img/bVWmHF?w=952&amp;h=134" alt="小栗子" title="小栗子" style="cursor: pointer; display: inline;"></span></p>
<h4>用了它，会变得美好一点么？</h4>
<p>说了这么多原理，那用了它，对我们有什么实际的好处呢？这个分情况讨论呢。</p>
<p>首先我们要了解一下它的优缺点，这样就好判断使用场景了。</p>
<p>优点 vs 缺点</p>
<ul>
<li>对于比较小的图片，使用base64编码，可以减少一次图片的网络请求；那么对于比较大的图片,使用base64就不适合了，编码会和html混在一起，一方面可读性差，另一方面加大了html页面的大小，反而加大了下载页面的大小，得不偿失了呢，因此设置一个合理的limit是非常有必要的；</li>
<li>另一方面，base64编码的图片不能像正常的图片可以进行缓存，因此写在css里面可以让浏览器对css文件进行缓存也不错哦；</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack-loader 之 url-loader

## 原文链接
[https://segmentfault.com/a/1190000011487980](https://segmentfault.com/a/1190000011487980)

