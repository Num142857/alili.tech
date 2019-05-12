---
title: '移动Web触摸与运动解决方案AlloyTouch开源啦' 
date: 2019-01-30 2:30:23
hidden: true
slug: osdrnb7vmb
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">传送门</h2>
<p>Github地址：<a href="https://github.com/AlloyTeam/AlloyTouch" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/...</a></p>
<h2 id="articleHeader1">简介</h2>
<p>AlloyTouch的本质是运动一个数字，把数字的物理变化映射到你想映射的任何属性上。所以带来了广泛的应用场景。不论实在应用、游戏、操作系统等许多层面，监听用户触摸，给用户真实的运动反馈是很常见的应用场景。如王者荣耀里，旋转用户角色，抽奖程序滚动转盘、页面滚动、局部滚动等。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007697116?w=768&amp;h=512" src="https://static.alili.tech/img/remote/1460000007697116?w=768&amp;h=512" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>上面的那些场景，都会使用到下面三种过程之一：</p>
<ul>
<li><p>触摸、运动、减速、停止</p></li>
<li><p>触摸、运动、减速、回弹、停止</p></li>
<li><p>触摸、回弹、停止</p></li>
</ul>
<p>上面的运动可以是任何形式，如旋转、平移、zoom等运动形式。当然，在上面过程执行的过程中，如果有其他用户交互介入，会停止当前的过程，继而反馈用户新的触摸手势。AlloyTouch正是为了解决这类问题而生。同时做到了:</p>
<ul>
<li><p>极小的文件大小（不到300行代码）</p></li>
<li><p>与页面布局无关</p></li>
<li><p>运动属性无关，能运动对象字量（如｛x:100｝）</p></li>
<li><p>渲染无关的设计（dom、canvas、webgl、svg都能使用）</p></li>
<li><p>真实的物理运动轨迹</p></li>
<li><p>高效的运动方式</p></li>
<li><p>极简的API设计</p></li>
</ul>
<h2 id="articleHeader2">安装</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install alloytouch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">npm install alloytouch</code></pre>
<h2 id="articleHeader3">使用姿势</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new AlloyTouch({
    touch:&quot;#wrapper&quot;,//反馈触摸的dom
    target: target, //运动的对象
    property: &quot;translateY&quot;,  //被运动的属性
    min: 100, //不必需,运动属性的最小值,越界会回弹
    max: 2000, //不必需,滚动属性的最大值,越界会回弹
    vertical: true,//不必需，默认是true代表监听竖直方向touch
    sensitivity: 1,//不必需,触摸区域的灵敏度，默认值为1，可以为负数
    factor: 1,//不必需,表示触摸位移与被运动属性映射关系，默认值是1
    step: 45,//不必需，用于校正到step的整数倍
    change:function(){  }, //不必需，属性改变的回调。alloytouch.css版本不支持该事件
    touchStart:function(value){  },
    touchMove:function(value){  },
    touchEnd:function(value){  },
    animationEnd:function(value){  } //运动结束
 })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> AlloyTouch({
    <span class="hljs-attr">touch</span>:<span class="hljs-string">"#wrapper"</span>,<span class="hljs-comment">//反馈触摸的dom</span>
    target: target, <span class="hljs-comment">//运动的对象</span>
    property: <span class="hljs-string">"translateY"</span>,  <span class="hljs-comment">//被运动的属性</span>
    min: <span class="hljs-number">100</span>, <span class="hljs-comment">//不必需,运动属性的最小值,越界会回弹</span>
    max: <span class="hljs-number">2000</span>, <span class="hljs-comment">//不必需,滚动属性的最大值,越界会回弹</span>
    vertical: <span class="hljs-literal">true</span>,<span class="hljs-comment">//不必需，默认是true代表监听竖直方向touch</span>
    sensitivity: <span class="hljs-number">1</span>,<span class="hljs-comment">//不必需,触摸区域的灵敏度，默认值为1，可以为负数</span>
    factor: <span class="hljs-number">1</span>,<span class="hljs-comment">//不必需,表示触摸位移与被运动属性映射关系，默认值是1</span>
    step: <span class="hljs-number">45</span>,<span class="hljs-comment">//不必需，用于校正到step的整数倍</span>
    change:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{  }, <span class="hljs-comment">//不必需，属性改变的回调。alloytouch.css版本不支持该事件</span>
    touchStart:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{  },
    <span class="hljs-attr">touchMove</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{  },
    <span class="hljs-attr">touchEnd</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{  },
    <span class="hljs-attr">animationEnd</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{  } <span class="hljs-comment">//运动结束</span>
 })</code></pre>
<p>比如上面是运动target的translateY属性，必须要target拥有translateY属性才能正常工作。<br>你可以使用<a href="https://github.com/AlloyTeam/AlloyTouch/tree/master/transformjs" rel="nofollow noreferrer" target="_blank">transformjs</a>赋予dom的快速tranformation能力。所以一般需要AlloyTouch dom元素的话，可以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var target = document.querySelector(&quot;#scroller&quot;);
//给element注入transform属性
Transform(target,true);

new AlloyTouch({
...
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> target = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">"#scroller"</span>);
<span class="hljs-comment">//给element注入transform属性</span>
Transform(target,<span class="hljs-literal">true</span>);

<span class="hljs-keyword">new</span> AlloyTouch({
...
...</code></pre>
<h2 id="articleHeader4">功能演示</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007697117?w=234&amp;h=302" src="https://static.alili.tech/img/remote/1460000007697117?w=234&amp;h=302" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007697118?w=205&amp;h=195" src="https://static.alili.tech/img/remote/1460000007697118?w=205&amp;h=195" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007697119?w=239&amp;h=218" src="https://static.alili.tech/img/remote/1460000007697119?w=239&amp;h=218" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">在线Demo</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007697120?w=761&amp;h=596" src="https://static.alili.tech/img/remote/1460000007697120?w=761&amp;h=596" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">开始AlloyTouch吧</h2>
<p>Github地址：<a href="https://github.com/AlloyTeam/AlloyTouch" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/AlloyTouch</a><br>欢迎issues:<a href="https://github.com/AlloyTeam/AlloyTouch/issues" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/AlloyTouch/issues</a><br>我们会在第一时间响应你的意见和建议。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动Web触摸与运动解决方案AlloyTouch开源啦

## 原文链接
[https://segmentfault.com/a/1190000007697113](https://segmentfault.com/a/1190000007697113)

