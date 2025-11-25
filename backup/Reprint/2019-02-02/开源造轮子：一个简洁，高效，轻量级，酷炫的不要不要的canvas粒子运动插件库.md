---
title: '开源造轮子：一个简洁，高效，轻量级，酷炫的不要不要的canvas粒子运动插件库' 
date: 2019-02-02 2:30:11
hidden: true
slug: v37dcshzod
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一：开篇</h2>
<p>哈哈哈，感谢标题党的莅临~</p>
<p>虽然标题有点夸张的感觉，但实际上，插件库确实是简洁，高效，轻量级，酷炫酷炫的咯。<br>废话不多说，先来看个标配例子吧：</p>
<p><a href="http://codepen.io/barrior/pen/XjEEBz" rel="nofollow noreferrer" target="_blank">http://codepen.io/barrior/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="barrior/pen/XjEEBz" data-typeid="3">点击预览</button></p>
<p>是吧，应该是酷炫酷炫的吧，不喜欢的话可以向下看更多的例子哦~</p>
<h2 id="articleHeader1">二：说说我(们)的理念：</h2>
<blockquote><p>厌倦市场上眼花缭乱，百花齐放，百鸟争鸣的繁荣景象，我心憔悴... <br>像我这种头脑简单，四肢也简单的人就适合简单的API，简单人和物 (。・_・)/~~~<br>好吧，还是说回代码吧，API设计希翼<code>"The Write Less, Do More"</code>和<code>"Keep it Simple and Stupid"</code>的形式，拒绝绕弯子API，崇尚简洁，简约！<br>所以你会跟作者一样，使用起这个插件会感觉到很爽，很轻松，嘎嘎嘎~ 不信看看接下来的所有效果展示。</p></blockquote>
<h2 id="articleHeader2">三：所有效果展示</h2>
<blockquote><p>目前插件库提供了三种特效：粒子无序运动，波浪运动，雪花飘落特效。 <br>当然，配置不同的API参数值，或许可以得到挺多不同的特效呢！<br>上面已经演示过标配的粒子无序运动啦，下面演示后面两种。</p></blockquote>
<h3 id="articleHeader3">1、波浪运动·标配</h3>
<p><a href="http://codepen.io/barrior/pen/BLAAPa" rel="nofollow noreferrer" target="_blank">http://codepen.io/barrior/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="barrior/pen/BLAAPa" data-typeid="3">点击预览</button></p>
<p>js代码（效果参考QQ电话）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Particleground.wave( '#demo', {
    num: 3,
    // 三条线依次的颜色
    lineColor: ['rgba(0, 190, 112, .5)', 'rgba(0, 190, 112, .7)', 'rgba(0, 190, 112, .9)'],
    // 三条线依次的宽度
    lineWidth: [.5, .7, .9],
    // 三条线依次的向左偏移值
    offsetLeft: [2, 1, 0],
    // 三条线都向上偏移容器高度的0.75倍
    offsetTop: .75,
    // 三条线依次的波峰高度
    crestHeight: [10, 14, 18],
    // 三条线都只有两个波峰（波纹）
    rippleNum: 2,
    speed: .1,
    // 隐藏填充，默认false
    fill: false,
    // 显示边框，即线条效果，默认true
    stroke: true
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Particleground</span><span class="hljs-selector-class">.wave</span>( <span class="hljs-string">'#demo'</span>, {
    <span class="hljs-attribute">num</span>: <span class="hljs-number">3</span>,
    <span class="hljs-comment">// 三条线依次的颜色</span>
    <span class="hljs-attribute">lineColor</span>: [<span class="hljs-string">'rgba(0, 190, 112, .5)'</span>, <span class="hljs-string">'rgba(0, 190, 112, .7)'</span>, <span class="hljs-string">'rgba(0, 190, 112, .9)'</span>],
    <span class="hljs-comment">// 三条线依次的宽度</span>
    <span class="hljs-attribute">lineWidth</span>: [.<span class="hljs-number">5</span>, .<span class="hljs-number">7</span>, .<span class="hljs-number">9</span>],
    <span class="hljs-comment">// 三条线依次的向左偏移值</span>
    <span class="hljs-attribute">offsetLeft</span>: [<span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>],
    <span class="hljs-comment">// 三条线都向上偏移容器高度的0.75倍</span>
    <span class="hljs-attribute">offsetTop</span>: .<span class="hljs-number">75</span>,
    <span class="hljs-comment">// 三条线依次的波峰高度</span>
    <span class="hljs-attribute">crestHeight</span>: [<span class="hljs-number">10</span>, <span class="hljs-number">14</span>, <span class="hljs-number">18</span>],
    <span class="hljs-comment">// 三条线都只有两个波峰（波纹）</span>
    <span class="hljs-attribute">rippleNum</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attribute">speed</span>: .<span class="hljs-number">1</span>,
    <span class="hljs-comment">// 隐藏填充，默认false</span>
    <span class="hljs-attribute">fill</span>: false,
    <span class="hljs-comment">// 显示边框，即线条效果，默认true</span>
    <span class="hljs-attribute">stroke</span>: true
});
</code></pre>
<p>如果你英语可以的话，相信看属性名结合效果就大概知道配置是什么意思啦，不然的话你可以看看官网对这几个API的描述，<a href="http://particleground.duapp.com/examples/wave" rel="nofollow noreferrer" target="_blank">戳这里哈</a>。</p>
<h3 id="articleHeader4">2、波浪运动·loading动画</h3>
<p><a href="http://codepen.io/barrior/pen/rrddQw" rel="nofollow noreferrer" target="_blank">http://codepen.io/barrior/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="barrior/pen/rrddQw" data-typeid="3">点击预览</button></p>
<p>这个js代码就不贴啦，需要自己写加载的进度，然后设置到效果上哈。</p>
<h3 id="articleHeader5">3、雪花飘落特效</h3>
<p><a href="http://codepen.io/barrior/pen/mAxxdG" rel="nofollow noreferrer" target="_blank">http://codepen.io/barrior/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="barrior/pen/mAxxdG" data-typeid="3">点击预览</button></p>
<p>极简单的js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Particleground.snow('#demo');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">new</span> <span class="hljs-type">Particleground</span>.snow(<span class="hljs-string">'#demo'</span>);
</code></pre>
<h2 id="articleHeader6">四：解释标题</h2>
<blockquote><p>好啦，效果看完啦，现在解释一下标题的那几个宣传字眼，虽然好像并没有什么用<span class="img-wrap"><img data-src="/img/bVD9Eo?w=23&amp;h=23" src="https://static.alili.tech/img/bVD9Eo?w=23&amp;h=23" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>...</p></blockquote>
<h5>简洁：</h5>
<ul>
<li><p>就像前面的粒子运动例子，只需要一行简单的代码 <code>new Particleground.particle('#demo')</code> 就可以实现啦。</p></li>
<li><p>然后就是“洁”：这个需要阅读源码咯，相信从源码中你会看到代码的简洁优雅的，<a href="https://github.com/Barrior/Particleground.js/blob/master/pjs-dev/pjs/particleground.all.js#L42" rel="nofollow noreferrer" target="_blank">具体请戳这里啦</a>~</p></li>
<li><p>当然，特效也是简洁美观的啦，对不起视觉的效果为什么还要用代码去实现它呢<span class="img-wrap"><img data-src="/img/bVD9Eo?w=23&amp;h=23" src="https://static.alili.tech/img/bVD9Eo?w=23&amp;h=23" alt="图片描述" title="图片描述" style="cursor: pointer;"></span>...</p></li>
</ul>
<h5>高效：</h5>
<ul>
<li><p>在作者的能力基础之上，代码能优化的地方作者都想尽了方法去优化它(包括性能的优化，代码的简化)。</p></li>
<li><p>比如：this关键字的在另一个函数内储存成变量参数使用，多次使用到的深度属性或方法储存成变量使用，既达到压缩时可减少体积，又达到减少变量查找的耗时。</p></li>
<li><p>比如：粒子无序运动的连线功能处理，嵌套for循环，O(n²)的问题，作者优化了三次(git commit有记录咯)，最后使用(学习借鉴)了《HTML5+JavaScript动画基础》这本书的一个思想和优化方式，达到既不冗余代码或占用内存，又提升了一倍的执行效率。<a href="https://github.com/Barrior/Particleground.js/blob/master/pjs-dev/pjs/particle.js#L160" rel="nofollow noreferrer" target="_blank">具体可点击这里，源码第160行哦</a>。</p></li>
</ul>
<h5>轻量级：</h5>
<ul>
<li><p>由于前面说到的两点，轻量级自然就孕育而生啦。</p></li>
<li><p>另一个就是特效之间都是以独立的插件形式使用的，不存在相互依赖的问题，只依赖一个公共的功能文件，这样就可以达到想加载什么就加载什么，按需加载的不臃肿体验啦，也可以偷懒直接使用包含所有特效的压缩包文件咯。</p></li>
</ul>
<h2 id="articleHeader7">五：最后</h2>
<ul>
<li><p>一个良好的官网及文档是一个良好的开始，插件库官网：<a href="http://particleground.duapp.com/" rel="nofollow noreferrer" target="_blank">particleground.duapp.com</a>, 先用着这个域名咯，等时机成熟了，再换回正式的 <em>pjs.barrior.me</em> 域名~</p></li>
<li><p>贡献总是受欢迎的，无论它多么大或小！只要你与作者的观念，理念，志同道合的话，那就太希望你<a href="https://github.com/Barrior/Particleground.js" rel="nofollow noreferrer" target="_blank">加入组织的怀抱</a>啦，做一件自己喜欢的事，做一个自己都喜欢自己的人。</p></li>
<li><p>如果你喜欢这个插件库并能帮助到你的实际工作中，希望它能发展的更好，提供更多有趣实用的特效，支持我(们)，烦请点个 <a href="https://github.com/Barrior/Particleground.js" rel="nofollow noreferrer" target="_blank">Star</a> 吧<span class="img-wrap"><img data-src="/img/bVD9DF?w=24&amp;h=24" src="https://static.alili.tech/img/bVD9DF?w=24&amp;h=24" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>。</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
开源造轮子：一个简洁，高效，轻量级，酷炫的不要不要的canvas粒子运动插件库

## 原文链接
[https://segmentfault.com/a/1190000007171179](https://segmentfault.com/a/1190000007171179)

