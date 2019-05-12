---
title: '用css3做一个求婚小动画' 
date: 2019-01-12 2:30:24
hidden: true
slug: 1fv4zg48gx1
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">首先放张效果图</h2>
<p><span class="img-wrap"><img data-src="/img/bVNy8t?w=360&amp;h=240" src="https://static.alili.tech/img/bVNy8t?w=360&amp;h=240" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/sunweiling/wedding" rel="nofollow noreferrer" target="_blank">github地址</a></p>
<h2 id="articleHeader1">然后一步步分析一下</h2>
<h2 id="articleHeader2">首先是刚出现的新郎的动画</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".w-m img{
    margin-right: 0;
    float: right;
    margin-top: 60px;
    animation: toWoman 0.5s ease .5s both;
}
@keyframes toWoman{
    0%{
        opacity: 0;
        transform: translate(-200px);
    }
    100%{
        opacity: 1;
        transform: translate(0);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.w-m</span> <span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">animation</span>: toWoman <span class="hljs-number">0.5s</span> ease .<span class="hljs-number">5s</span> both;
}
@<span class="hljs-keyword">keyframes</span> toWoman{
    0%{
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-200px);
    }
    100%{
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0);
    }
}</code></pre>
<p>里面用到的知识点：</p>
<ul>
<li>
<p>animation：<strong>是一个简写属性，用于设置六个动画属性</strong></p>
<ul>
<li><p>animation-name 规定需要绑定到选择器的 keyframe 名称</p></li>
<li><p>animation-duration 规定完成动画所花费的时间，以秒或毫秒计</p></li>
<li><p>animation-timing-function  规定动画的速度曲线</p></li>
<li><p>animation-delay  规定在动画开始之前的延迟</p></li>
<li><p>animation-iteration-count  规定动画应该播放的次数</p></li>
<li><p>animation-direction  规定是否应该轮流反向播放动画</p></li>
</ul>
</li>
<li><p>keyframes：<strong>让开发者通过指定动画中特定时间点必须展现的关键帧样式（或者说停留点）来控制CSS动画的中间环节。这让开发者能够控制动画中的更多细节而不是全部让浏览器自动处理</strong></p></li>
<li><p>transform <strong>向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜</strong></p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVPg3J?w=813&amp;h=694" src="https://static.alili.tech/img/bVPg3J?w=813&amp;h=694" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><a href="http://www.w3school.com.cn/cssref/pr_transform.asp" rel="nofollow noreferrer" target="_blank">具体上述图片的网址</a></p>
<h2 id="articleHeader3">然后是那朵花的css</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".w-f{
    position: absolute;
    z-index: 20;
    left: 50%;
    margin-left: -30px;
    margin-top: 75px;
}
.w-f img{
    width: 60px;
    animation: show 0.4s ease 1s both;
}

@keyframes show{
    0%{
        opacity: 0;
        transform: scale(0.1,0.1);
    }
    100%{
        opacity: 1;
        transform: scale(1,1);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.w-f</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">20</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">30px</span>;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">75px</span>;
}
<span class="hljs-selector-class">.w-f</span> <span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">animation</span>: show <span class="hljs-number">0.4s</span> ease <span class="hljs-number">1s</span> both;
}

@<span class="hljs-keyword">keyframes</span> show{
    0%{
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0.1,0.1);
    }
    100%{
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1,1);
    }
}
</code></pre>
<h2 id="articleHeader4">文字部分的css</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".w-t-m{
    position: absolute;
    left: 50%;
    z-index: 10;
    line-height: 80px;
    color: #ff720a;
    letter-spacing: 5px;
    opacity: 0;
    animation: titleBloom 1s linear 1s both;
    font-size: 26px;
    margin-left: -125px;
}
@keyframes titleBloom{
    0% {
        transform: translate(-50px);
    }
    100% {
        opacity: 1;
        transform: translate(0);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.w-t-m</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">10</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">80px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#ff720a</span>;
    <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">animation</span>: titleBloom <span class="hljs-number">1s</span> linear <span class="hljs-number">1s</span> both;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">26px</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">125px</span>;
}
@<span class="hljs-keyword">keyframes</span> titleBloom{
    0% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50px);
    }
    100% {
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0);
    }
}
</code></pre>
<h2 id="articleHeader5">文字边烟花的效果</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".w-t img{
    opacity: 0;
    animation: bloom 2s ease 1.2s infinite;
}
.w-t img.boom2{
    float: right;
    animation: bloom 2s ease 1.5s infinite;
}
.w-t img.boom3{
    position: absolute;
    margin-top: 40px;
    animation: bloom 2s ease 1.4s infinite;
}
@keyframes bloom{
    0% {
        transform: scale(0,0);
    }
    100% {
        opacity: 1;
        transform: scale(1,1);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.w-t</span> <span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">animation</span>: bloom <span class="hljs-number">2s</span> ease <span class="hljs-number">1.2s</span> infinite;
}
<span class="hljs-selector-class">.w-t</span> <span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.boom2</span>{
    <span class="hljs-attribute">float</span>: right;
    <span class="hljs-attribute">animation</span>: bloom <span class="hljs-number">2s</span> ease <span class="hljs-number">1.5s</span> infinite;
}
<span class="hljs-selector-class">.w-t</span> <span class="hljs-selector-tag">img</span><span class="hljs-selector-class">.boom3</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">animation</span>: bloom <span class="hljs-number">2s</span> ease <span class="hljs-number">1.4s</span> infinite;
}
@<span class="hljs-keyword">keyframes</span> bloom{
    0% {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(0,0);
    }
    100% {
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1,1);
    }
}
</code></pre>
<h2 id="articleHeader6">最后几束花的效果</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".w-fls{
    width: 820px;
    margin: 0 auto;
}
.w-fls img{
    height: 120px;
    z-index: 400;
    animation: showFlows 0.4s ease 2.3s both;
}
@keyframes showFlows{
    0%{
        opacity: 0;
        transform: translate(0,200px);
    }
    100%{
        opacity: 1;
        transform: translate(0);
    }
}
.w-2{
    margin-top: -130px;
    padding-left: 100px;
}
.w-2 img{
    animation: showFlows 0.4s ease 2.7s both;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.w-fls</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">820px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}
<span class="hljs-selector-class">.w-fls</span> <span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">120px</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">400</span>;
    <span class="hljs-attribute">animation</span>: showFlows <span class="hljs-number">0.4s</span> ease <span class="hljs-number">2.3s</span> both;
}
@<span class="hljs-keyword">keyframes</span> showFlows{
    0%{
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0,200px);
    }
    100%{
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0);
    }
}
<span class="hljs-selector-class">.w-2</span>{
    <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">130px</span>;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.w-2</span> <span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">animation</span>: showFlows <span class="hljs-number">0.4s</span> ease <span class="hljs-number">2.7s</span> both;
}
</code></pre>
<h2 id="articleHeader7">最后</h2>
<p>我的更多文章内容：微信公众号搜索 有一个姑娘在coding 跟我头像的那个就是了<br>一起学前端，共同进步</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用css3做一个求婚小动画

## 原文链接
[https://segmentfault.com/a/1190000009798046](https://segmentfault.com/a/1190000009798046)

