---
title: '简单说 CSS滤镜 filter属性' 
date: 2018-12-27 2:30:12
hidden: true
slug: 5f5kq7rxqmh
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">说明</h3>
<p>滤镜主要是用来实现图像的各种特殊效果，css的滤镜是很神奇的。</p>
<h3 id="articleHeader1">解释</h3>
<p>css的滤镜，也就是filter属性，主要有下面这几个属性值   </p>
<p><strong>blur（模糊）</strong>       </p>
<p><span class="img-wrap"><img data-src="/img/bVXLfC?w=1232&amp;h=359" src="https://static.alili.tech/img/bVXLfC?w=1232&amp;h=359" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>brightness（亮度）</strong>    </p>
<p><span class="img-wrap"><img data-src="/img/bVXLfE?w=1234&amp;h=361" src="https://static.alili.tech/img/bVXLfE?w=1234&amp;h=361" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>注意：</strong>值是100%，图像无变化。超过100%，变亮，小于100%，变暗。  </p>
<p><strong>contrast（对比度）</strong>   </p>
<p><span class="img-wrap"><img data-src="/img/bVXLfG?w=1234&amp;h=364" src="https://static.alili.tech/img/bVXLfG?w=1234&amp;h=364" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>与brightness 一样 contrast 100%，图片无变化。  </p>
<p><strong>drop-shadow（阴影）</strong>    </p>
<p><span class="img-wrap"><img data-src="/img/bVXLfF?w=1231&amp;h=373" src="https://static.alili.tech/img/bVXLfF?w=1231&amp;h=373" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>注意：</strong>  这个 drop-shadow  与 box-shadow 都是在说阴影，但还是有区别的，看下图。    </p>
<p><span class="img-wrap"><img data-src="/img/bVXLfb?w=944&amp;h=266" src="https://static.alili.tech/img/bVXLfb?w=944&amp;h=266" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>图中火焰的图片，是一张png图片，除了火焰以外，其他部分是透明的，我们能看见，box-shadow 是给整个图片加阴影，而 drop-shadow 只是给不透明的部分加阴影，这是他们最重要的区别了。    </p>
<p><strong>grayscale（灰度）</strong>    </p>
<p><span class="img-wrap"><img data-src="/img/bVXLfD?w=1255&amp;h=359" src="https://static.alili.tech/img/bVXLfD?w=1255&amp;h=359" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>注意：</strong>值为100%则完全转为灰度图像，值为0%图像无变化。</p>
<p><strong>hue-rotate（色调）</strong>   </p>
<p><span class="img-wrap"><img data-src="/img/bVXLfc?w=1257&amp;h=363" src="https://static.alili.tech/img/bVXLfc?w=1257&amp;h=363" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>invert（反转）</strong>    </p>
<p><span class="img-wrap"><img data-src="/img/bVXLfa?w=1253&amp;h=361" src="https://static.alili.tech/img/bVXLfa?w=1253&amp;h=361" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>opacity（透明度）</strong>    </p>
<p><span class="img-wrap"><img data-src="/img/bVXLe9?w=1253&amp;h=360" src="https://static.alili.tech/img/bVXLe9?w=1253&amp;h=360" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>saturate（饱和度）</strong>   </p>
<p><span class="img-wrap"><img data-src="/img/bVXLe8?w=1253&amp;h=359" src="https://static.alili.tech/img/bVXLe8?w=1253&amp;h=359" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>注意：</strong>值为100%，图像无变化    </p>
<p><strong>sepia（深褐色）</strong>   </p>
<p><span class="img-wrap"><img data-src="/img/bVXLe7?w=1254&amp;h=360" src="https://static.alili.tech/img/bVXLe7?w=1254&amp;h=360" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>注意：</strong>值为0%，图像无变化      </p>
<p>上面都只是把每种滤镜单独拿出来，展示效果，但是其实他们是可以一起使用的，比如这样   </p>
<p><span class="img-wrap"><img data-src="/img/bVXLe6?w=674&amp;h=363" src="https://static.alili.tech/img/bVXLe6?w=674&amp;h=363" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>注意:</strong> 顺序是非常重要的，如果顺序变了，最后的效果也会发生变化。</p>
<h3 id="articleHeader2">总结</h3>
<p>css滤镜，还是很有必要知道的，用它实现的效果，也往往很让人惊艳，这次说了点最基础的东西，如果想知道，更多 filter属性 细节的事情，就到<a href="http://www.runoob.com/cssref/css3-pr-filter.html" rel="nofollow noreferrer" target="_blank">这里</a>吧！<br><a href="http://www.runoob.com/cssref/css3-pr-filter.html" rel="nofollow noreferrer" target="_blank">http://www.runoob.com/cssref/...</a>  </p>
<p>下次我们用css滤镜来做一个火焰的效果。    <br><a href="https://segmentfault.com/a/1190000011826691">简单说 通过CSS的滤镜 实现 火焰效果</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单说 CSS滤镜 filter属性

## 原文链接
[https://segmentfault.com/a/1190000011820571](https://segmentfault.com/a/1190000011820571)

