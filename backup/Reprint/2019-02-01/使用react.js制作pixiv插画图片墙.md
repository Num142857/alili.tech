---
title: '使用react.js制作pixiv插画图片墙' 
date: 2019-02-01 2:30:10
hidden: true
slug: 9ci508i9qye
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>学习了一段时间的react，完成了一个WebApp。<br>这是一个<code>pixiv.net</code>的插画图片墙，我把它叫做<code>pixivの「ラブライブ」発見</code>，意思就是发现<code>pixiv.net</code>上有关<code>ラブライブ LoveLive!学园偶像祭</code>的作品。</p></blockquote>
<p>项目很简单，就是一个瀑布流无限加载的列表，主要用到的技术栈：</p>
<ul>
<li><p><strong>react</strong></p></li>
<li><p><strong>react-router</strong></p></li>
<li><p><strong>react-mdl</strong> google的material design lite框架在react上的组装</p></li>
<li><p><strong>react-masonry-component</strong> jquery.masonry瀑布流布局插件在react上的实现</p></li>
</ul>
<p>关于AJAX请求，有很多选择：<code>fetch</code>、<code>superagent</code>、<code>axios</code>，甚至是'jQuery.ajax'。综合比较，符合标准规范的<code>fetch</code>无疑是最好的选择。在不支持的浏览器上可以使用<a href="https://github.com/github/fetch" rel="nofollow noreferrer" target="_blank">fetch-polyfill</a>。</p>
<p>其他应该没什么好说的，主要是性能问题也花了一段时间。<br>这个应用中有一个长列表，每一个图片组件上都绑定了一个<code>onClick</code>事件，如果列表数量上来了，性能问题就很明显，解决方案主要有以下两点：</p>
<ul>
<li><p>不要在<code>onClick</code>中进行<code>bind(this)</code>操作，因为这样每次render都会生成一个新的函数，性能影响可想而知。同样的，使用箭头函数<code>()=&gt;{}</code>也是一样的道理，它也会自动bind一次。比较好的方案是在<code>constructor</code>中事先bind好，<a href="https://daveceddia.com/avoid-bind-when-passing-props/" rel="nofollow noreferrer" target="_blank">Don't Use Bind When Passing Props</a> 这篇文章提到了共9种解决方案，各有利弊。</p></li>
<li><p>我们都知道，react循环中的列表必须赋予一个<code>key</code>属性，这个属性不是给用户自己用的，而是给 React 自己用的。你必须为数组中的元素提供唯一的 <code>key</code> 属性，我们可能会直接使用数组的<code>index</code>作为<code>key</code>，这其实是多次一举的，因为你不提供<code>key</code>的话，react默认采用的正是<code>index</code>。比较好的方案是使用<a href="https://www.npmjs.com/package/shortid" rel="nofollow noreferrer" target="_blank">shortid</a>这个包来生成，主要参考了<a href="https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318#.kxj9ttkx4" rel="nofollow noreferrer" target="_blank">Index as a key is an anti-pattern</a></p></li>
</ul>
<p>其它的一些微小的优化：</p>
<ul>
<li><p>把javascript缓存在localStorage里，版本变动后才会去服务器下载新的js，解决方案来自 <a href="https://imququ.com/post/wpo-of-mobile-web-1.html" rel="nofollow noreferrer" target="_blank">移动 WEB 通用优化策略介绍（一）</a>。localStorage缓存静态资源，在移动端和高版本的浏览器上还是值得尝试的的。虽然可以通过浏览器缓存静态文件，但在一些情况下（比如f5刷新），还是会发起 cache-control:max-age=0 的请求。出于节约请求的目的，可以改造一下静态资源的请求方式，将所有的静态资源都通过一个请求来加载。这样的话，无论如何，页面都只会发这一个请求，如果静态文件有更新，则服务端返回更新的文件内容，通过js插入到页面中并缓存在localStorage中；如果静态文件没有更新，则直接从localStorage中取出来，插入到页面中就可以了。对于移动端来说，将js和css这些静态文件的请求缩减成一个，还是很有效果的，具体可以参考一下百度移动版，使用的就是这个方案。对于单页面应用来说，使用localStorage储存模板也是个很好的选择。</p></li>
<li><p>把ajax请求也缓存，当数据过期后，再去请求api。</p></li>
</ul>
<p>另外推荐一个react各种问题集合：<a href="https://github.com/timarney/react-faq" rel="nofollow noreferrer" target="_blank">react-faq</a></p>
<p>项目地址在这里：<br><a href="https://pixiv.moe" rel="nofollow noreferrer" target="_blank">https://pixiv.moe</a><br><a href="https://github.com/LoveLiveSunshine/pixiv.moe" rel="nofollow noreferrer" target="_blank">https://github.com/LoveLiveSunshine/pixiv.moe</a></p>
<p>放一张GIF预览图：<br><span class="img-wrap"><img data-src="https://ws4.sinaimg.cn/large/0060lm7Tgw1f9kwxn3unug30ks0cfkjn.gif" src="https://static.alili.techhttps://ws4.sinaimg.cn/large/0060lm7Tgw1f9kwxn3unug30ks0cfkjn.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用react.js制作pixiv插画图片墙

## 原文链接
[https://segmentfault.com/a/1190000007421196](https://segmentfault.com/a/1190000007421196)

