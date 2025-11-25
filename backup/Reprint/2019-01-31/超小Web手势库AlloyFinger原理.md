---
title: '超小Web手势库AlloyFinger原理' 
date: 2019-01-31 2:31:16
hidden: true
slug: jmf7pc7iihm
categories: [reprint]
---

{{< raw >}}

                    
<p>目前<a href="https://github.com/AlloyTeam/AlloyFinger" rel="nofollow noreferrer" target="_blank">AlloyFinger</a>作为腾讯手机QQ web手势解决方案，在各大项目中都发挥着作用。<br>感兴趣的同学可以去Github看看：</p>
<p><a href="https://github.com/AlloyTeam/AlloyFinger" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/AlloyFinger</a></p>
<p>在腾讯，如：兴趣部落、QQ群、QQ动漫、腾讯学院、TEDxTencent、 AlloyTeam、腾讯CDC等多个部门、团队和项目都在使用AlloyFinger。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448811?w=701&amp;h=521" src="https://static.alili.tech/img/remote/1460000007448811?w=701&amp;h=521" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>基本上只要有图像裁剪、图像查看的地方都会使用到AlloyFinger。因此AlloyFinger也入选了腾讯code平台的精品组件：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448812?w=373&amp;h=115" src="https://static.alili.tech/img/remote/1460000007448812?w=373&amp;h=115" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>除了国内外的项目团队都在使用AlloyFinger，国内外的各大IT网站也进行了转载报道，作为超级小的手势库，腾讯的web项目为什么不选择hammerjs而选择<a href="https://github.com/AlloyTeam/AlloyFinger" rel="nofollow noreferrer" target="_blank">AlloyFinger</a>?下面从各个角度、架构、原理上进行一下分析。</p>
<h2 id="articleHeader0">体积</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448813?w=427&amp;h=236" src="https://static.alili.tech/img/remote/1460000007448813?w=427&amp;h=236" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到hammerjs体积远远大于AlloyFinger，对于手机QQ web加载速度性能追求极致的同学来说，使用hammerjs的大小是不可以接受的！<br>那么，为什么hammerjs这么大？看下架构设计便可知晓。</p>
<h2 id="articleHeader1">架构设计</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448814?w=886&amp;h=440" src="https://static.alili.tech/img/remote/1460000007448814?w=886&amp;h=440" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448815?w=767&amp;h=448" src="https://static.alili.tech/img/remote/1460000007448815?w=767&amp;h=448" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>其实，hammerjs抽象出的Class还没有列举全，还有许多。所以过度工程化，导致其体积特别大。<br>一个好的设计并不需要把每个逻辑点都抽象出来，局部过程化，整体OO是可以。如AlloyFinger的设计。仅仅只有Vector2和AlloyFinger，在touchstart、touchmove、touchend是可以trigger出相关的手势事件的，简单、直接！hammerjs能支持的手势，AlloyFinger都能支持。</p>
<h2 id="articleHeader2">具体实现</h2>
<p>众所周知，浏览器暴露了四个事件给开发者，touchstart touchmove touchend touchcancel，在这四个事件的回调函数可以拿到TouchEvent。<br>TouchEvent:<br>touches：当前位于屏幕上的所有手指动作的列表<br>targetTouches：位于当前 DOM 元素上的手指动作的列表<br>changedTouches：涉及当前事件的手指动作的列表<br>TouchEvent里可以拿到各个手指的坐标，那么可编程性就这么产生了。</p>
<h2 id="articleHeader3">Tap点按</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448816?w=119&amp;h=156" src="https://static.alili.tech/img/remote/1460000007448816?w=119&amp;h=156" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>移动端click有300毫秒延时，tap的本质其实就是touchend。但是要判断touchstart的手的坐标和touchend时候手的坐标x、y方向偏移要小于30。小于30才会去触发tap。</p>
<h2 id="articleHeader4">longTap长按</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448817?w=112&amp;h=148" src="https://static.alili.tech/img/remote/1460000007448817?w=112&amp;h=148" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>touchstart开启一个750毫秒的settimeout，如果750ms内有touchmove或者touchend都会清除掉该定时器。超过750ms没有touchmove或者touchend就会触发longTap</p>
<h2 id="articleHeader5">swipe划</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448818?w=173&amp;h=193" src="https://static.alili.tech/img/remote/1460000007448818?w=173&amp;h=193" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这里需要注意，当touchstart的手的坐标和touchend时候手的坐标x、y方向偏移要大于30，判断swipe，小于30会判断tap。那么用户到底是从上到下，还是从下到上，或者从左到右、从右到左滑动呢？可以根据上面三个判断得出，具体的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_swipeDirection: function (x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">_swipeDirection: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x1, x2, y1, y2</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.abs(x1 - x2) &gt;= <span class="hljs-built_in">Math</span>.abs(y1 - y2) ? (x1 - x2 &gt; <span class="hljs-number">0</span> ? <span class="hljs-string">'Left'</span> : <span class="hljs-string">'Right'</span>) : (y1 - y2 &gt; <span class="hljs-number">0</span> ? <span class="hljs-string">'Up'</span> : <span class="hljs-string">'Down'</span>)
}</code></pre>
<h2 id="articleHeader6">pinch捏</h2>
<p>这个手势是使用频率非常高的，如图像裁剪的时候放大或者缩小图片，就需要pinch。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448819?w=456&amp;h=279" src="https://static.alili.tech/img/remote/1460000007448819?w=456&amp;h=279" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示，两点之间的距离比值求pinch的scale。这个scale会挂载在event上，让用户反馈给dom的transform或者其他元素的scale属性。</p>
<h2 id="articleHeader7">rotate旋转</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448820?w=633&amp;h=265" src="https://static.alili.tech/img/remote/1460000007448820?w=633&amp;h=265" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如上图所示，利用内积，可以求出两次手势状态之间的夹角θ。但是这里怎么求旋转方向呢？那么就要使用差乘（Vector Cross）。<br>利用cross结果的正负来判断旋转的方向。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448821?w=737&amp;h=358" src="https://static.alili.tech/img/remote/1460000007448821?w=737&amp;h=358" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>cross本质其实是面积，可以看下面的推导：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448822?w=598&amp;h=519" src="https://static.alili.tech/img/remote/1460000007448822?w=598&amp;h=519" alt="" title="" style="cursor: pointer;"></span></p>
<p>所以，物理引擎里经常用cross来计算转动惯量，因为力矩其实要是力乘矩相当于面积：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007448823?w=863&amp;h=480" src="https://static.alili.tech/img/remote/1460000007448823?w=863&amp;h=480" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader8">总结</h1>
<p>主要的一些事件触发原理已经在上面讲解，还有如multipointStart、doubleTap、singleTap、multipointEnd可以看源码，不到200行的代码应该很容易消化。trigger手势事件的同时，touchStart、touchMove、touchEnd和touchCancel同样也可以监听。<br>详细的Vector2和AlloyFinger代码可以去Github上查阅：<br><a href="https://github.com/AlloyTeam/AlloyFinger" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/AlloyFinger</a><br>任何意见或者建议欢迎提issue：<br><a href="https://github.com/AlloyTeam/AlloyFinger/issues" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/AlloyFinger/issues</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
超小Web手势库AlloyFinger原理

## 原文链接
[https://segmentfault.com/a/1190000007448808](https://segmentfault.com/a/1190000007448808)

