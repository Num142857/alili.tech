---
title: '白浅教你CSS的垂直居中方法' 
date: 2019-01-26 2:30:18
hidden: true
slug: sytqgxe7gt
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVJcnS?w=377&amp;h=83" src="https://static.alili.tech/img/bVJcnS?w=377&amp;h=83" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="placeholder: 我是一个不正经的属性.
                                                                          ----题记" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>placeholder: 我是一个不正经的属性.
                                                                          <span class="hljs-comment">----题记</span></code></pre>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;说道页面垂直居中, 在大家的思维中, 很快就能有若干个(常用/用过)解决方法, 但是在很多面试题中, 都会出现这么一个题, <code>写出多个垂直居中的方法</code>, (其实掌握比较通用的, 兼容性好的方法就行了, 其他的就当看着玩, 有遗漏的欢迎补充 ps: 最好私信我给我留点面子 /坏笑). 那么下面就介绍几种垂直居中的方法:</p>
<h2 id="articleHeader0">默认的样式</h2>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;首先我先有一些默认的样式(都是一些比较常规的样式表, 一看就懂, 对本文核心影响不大).</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.ex{
  width:100% ;
  height: 100px;
  background: #eee;
  text-align: center;
  margin: 10px 0;
}
.ex_1{
  background-color: lightgreen;
}
/* 本来想用多个, 后来考虑没什么用, 就留下了一个子元素 */

.ex > div{
  margin: 0 auto;
  width: 100px;
  height: 30px;
  line-height: 30px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>*{
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
}
<span class="hljs-selector-class">.ex</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span> ;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.ex_1</span>{
  <span class="hljs-attribute">background-color</span>: lightgreen;
}
<span class="hljs-comment">/* 本来想用多个, 后来考虑没什么用, 就留下了一个子元素 */</span>

<span class="hljs-selector-class">.ex</span> &gt; <span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
}</code></pre>
<h2 id="articleHeader1">方法一</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="父元素设置{ display: flex; align-items: center; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">父元素设置{ <span class="hljs-attribute">display</span>: flex; <span class="hljs-attribute">align-items</span>: center; }</code></pre>
<p>原理是运用了flex布局, 同时使用css3的属性align-items, 兼容性较差.</p>
<p><span class="img-wrap"><img data-src="/img/bVJiV4?w=764&amp;h=210" src="https://static.alili.tech/img/bVJiV4?w=764&amp;h=210" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>展示效果:</p>
<p><span class="img-wrap"><img data-src="/img/bVJiWg?w=665&amp;h=106" src="https://static.alili.tech/img/bVJiWg?w=665&amp;h=106" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">方法二</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="父元素设置{ display: flex; } 子元素设置{ align-self: center; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">父元素设置{ <span class="hljs-attribute">display</span>: flex; } 子元素设置{ <span class="hljs-attribute">align-self</span>: center; }</code></pre>
<p>与方法一相同, 只是垂直居中的属性添加到了子元素当中(调皮的由item换成了一个self).</p>
<p>展示效果:</p>
<p><span class="img-wrap"><img data-src="/img/bVJiWS?w=667&amp;h=106" src="https://static.alili.tech/img/bVJiWS?w=667&amp;h=106" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">方法三</h2>
<p>如果在一段块元素包裹的行内元素中有某个元素比较特殊, 比如: <strong>大写加粗的文字</strong> 、 <strong>乱入的图片图标</strong>, 垂直居中:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="该元素设置 { vertical-align: middle; }
/* 同时对应 text-bottom/text-top 为下对齐/上对齐 */
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>该元素设置 { <span class="hljs-attribute">vertical-align</span>: middle; }
<span class="hljs-comment">/* 同时对应 text-bottom/text-top 为下对齐/上对齐 */</span>
</code></pre>
<p>兼容性:</p>
<p><span class="img-wrap"><img data-src="/img/bVJiZy?w=758&amp;h=158" src="https://static.alili.tech/img/bVJiZy?w=758&amp;h=158" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//xxx(请原谅我不想提他的名字), 竟然支持到了4.0 惊艳到我了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">//xxx(请原谅我不想提他的名字), 竟然支持到了4.0 惊艳到我了</span></code></pre>
<p>展示效果:</p>
<p><span class="img-wrap"><img data-src="/img/bVJiZM?w=671&amp;h=76" src="https://static.alili.tech/img/bVJiZM?w=671&amp;h=76" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">方法四</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="父元素相对定位(或其他定位){ position: relative; }
子元素绝对定位{ position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>父元素相对定位(或其他定位){ <span class="hljs-attribute">position</span>: relative; }
子元素绝对定位{ <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">margin</span>: auto }
</code></pre>
<p>关键点在于: <code>margin: auto</code><br>兼容性方面, 我稍有疑问,<br>top为例:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi0z?w=746&amp;h=91" src="https://static.alili.tech/img/bVJi0z?w=746&amp;h=91" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>而position:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi0Q?w=755&amp;h=93" src="https://static.alili.tech/img/bVJi0Q?w=755&amp;h=93" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>那么请问: 5.0~6.9999999之间top等元素做了什么?(欢迎大(lao)神(niao)解答 /坏笑)</p>
<p>展示效果:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi2s?w=672&amp;h=111" src="https://static.alili.tech/img/bVJi2s?w=672&amp;h=111" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">方法五</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="父元素设置{ padding: xxpx; height: auto !important;/*替换了我的默认样式*/ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">父元素设置{ <span class="hljs-attribute">padding</span>: xxpx; <span class="hljs-attribute">height</span>: auto <span class="hljs-meta">!important</span>;<span class="hljs-comment">/*替换了我的默认样式*/</span> }</code></pre>
<p>当有高度不固定的内容时.</p>
<p>兼容性:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi2e?w=749&amp;h=102" src="https://static.alili.tech/img/bVJi2e?w=749&amp;h=102" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>展示效果:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi2j?w=674&amp;h=118" src="https://static.alili.tech/img/bVJi2j?w=674&amp;h=118" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">方法六</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    line-height/height设置为等值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-built_in">line</span>-<span class="hljs-built_in">height</span>/<span class="hljs-built_in">height</span>设置为等值</code></pre>
<p>适用于子元素为内联元素或文字的块元素.</p>
<p>兼容性:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi2L?w=751&amp;h=98" src="https://static.alili.tech/img/bVJi2L?w=751&amp;h=98" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>展示效果:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi2P?w=669&amp;h=110" src="https://static.alili.tech/img/bVJi2P?w=669&amp;h=110" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">方法七</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="父元素设置{ display: table-cell; vertical-align: middle; }
/* 缺点元素宽度不能设置为百分比, 可以为固定像素值 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>父元素设置{ <span class="hljs-attribute">display</span>: table-cell; <span class="hljs-attribute">vertical-align</span>: middle; }
<span class="hljs-comment">/* 缺点元素宽度不能设置为百分比, 可以为固定像素值 */</span></code></pre>
<p>兼容性:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi3z?w=749&amp;h=114" src="https://static.alili.tech/img/bVJi3z?w=749&amp;h=114" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>展示效果:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi3G?w=673&amp;h=110" src="https://static.alili.tech/img/bVJi3G?w=673&amp;h=110" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">方法八</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="父元素设置{ position: relative; }
中间元素{ position: absolute; top: 50%; left: 50%; }
子元素{ position: relative; top: -50%; left: -50% }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>父元素设置{ <span class="hljs-attribute">position</span>: relative; }
中间元素{ <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>; <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>; }
子元素{ <span class="hljs-attribute">position</span>: relative; <span class="hljs-attribute">top</span>: -<span class="hljs-number">50%</span>; <span class="hljs-attribute">left</span>: -<span class="hljs-number">50%</span> }</code></pre>
<p>原理是, 中间元素左上角, 位于父元素中心点, 子元素相对中间元素top/left位移-50%, 使子元素中心与中间元素左上角重合, 同时与父元素中心重合( 垂直/水平居中 ).</p>
<p>兼容性:(同方法四)</p>
<p>展示效果:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi4j?w=672&amp;h=108" src="https://static.alili.tech/img/bVJi4j?w=672&amp;h=108" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">方法九</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="父元素设置{ display: box; box-pack: center; box-align: center; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">父元素设置{ <span class="hljs-attribute">display</span>: box; <span class="hljs-attribute">box-pack</span>: center; <span class="hljs-attribute">box-align</span>: center; }</code></pre>
<p>其中box-pack为x轴, box-align为y轴.</p>
<p>兼容性(完(pou)美(gai)):</p>
<p><span class="img-wrap"><img data-src="/img/bVJi4J?w=271&amp;h=46" src="https://static.alili.tech/img/bVJi4J?w=271&amp;h=46" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="目前主流浏览器都不支持box-pack属性。
Internet Explorer 10 使用 -ms-flex-pack property 属性来代替支持。
Firefox通过私有属性- MOZ-box-pack支持。
Safari, Opera, 和 Chrome 通过私有属性 -webkit-box-pack 支持.
注意： Internet Explorer 9及更早IE版本不支持弹性框." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>目前主流浏览器都不支持box-<span class="hljs-built_in">pack</span>属性。
Internet Explorer <span class="hljs-number">10</span> 使用 -ms-flex-<span class="hljs-built_in">pack</span> property 属性来代替支持。
Firefox通过私有属性- MOZ-box-<span class="hljs-built_in">pack</span>支持。
Safari, Opera, 和 Chrome 通过私有属性 -webkit-box-<span class="hljs-built_in">pack</span> 支持.
注意： Internet Explorer <span class="hljs-number">9</span>及更早IE版本不支持弹性框.</code></pre>
<p>展示效果:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi4S?w=668&amp;h=114" src="https://static.alili.tech/img/bVJi4S?w=668&amp;h=114" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader10">方法十</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="父元素设置{ position: relative; }
子元素设置{ position: absolute; top: 50%; left: 50%; transform: translate: (-50%, 50%) }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>父元素设置{ <span class="hljs-attribute">position</span>: relative; }
子元素设置{ <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>; <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>; <span class="hljs-attribute">transform</span>: translate: (-<span class="hljs-number">50%</span>, <span class="hljs-number">50%</span>) }
</code></pre>
<p>与方法八有异曲同工之妙, 但是是运用了css3的属性 transform.<br>兼容性:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi5D?w=741&amp;h=163" src="https://static.alili.tech/img/bVJi5D?w=741&amp;h=163" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>展示效果:</p>
<p><span class="img-wrap"><img data-src="/img/bVJi5M?w=666&amp;h=105" src="https://static.alili.tech/img/bVJi5M?w=666&amp;h=105" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可能还会有其他方法, 欢迎补充.</p>
<p>出发点:<br>想起来一次面试的时候, 第一题貌似就是这个,<br>好像见过很多次, 如果你能列出来5种, 8种, 10种甚至更多, 面试官会不会吓死?<br>希望试过的同学记得告诉我结果... ( 纯属扯淡, 如有雷同, 就是事实. )</p>
<blockquote><p>声明: 点下推荐不会怀孕.</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVKdKd?w=560&amp;h=351" src="https://static.alili.tech/img/bVKdKd?w=560&amp;h=351" alt="浅浅" title="浅浅" style="cursor: pointer; display: inline;"></span></p>
<p>以上.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
白浅教你CSS的垂直居中方法

## 原文链接
[https://segmentfault.com/a/1190000008375897](https://segmentfault.com/a/1190000008375897)

