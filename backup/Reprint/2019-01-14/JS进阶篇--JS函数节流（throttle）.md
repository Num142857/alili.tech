---
title: 'JS进阶篇--JS函数节流（throttle）' 
date: 2019-01-14 2:30:07
hidden: true
slug: khqj38wd39k
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是函数节流？</h2>
<p>介绍前，先说下背景。在前端开发中，有时会为页面绑定resize事件，或者为一个页面元素绑定拖拽事件（其核心就是绑定mousemove），这种事件有一个特点，就是用户不必特地捣乱，他在一个正常的操作中，都有可能在一个短的时间内触发非常多次事件绑定程序。而大家知道，DOM操作时很消耗性能的，这个时候，如果你为这些事件绑定一些操作DOM节点的操作的话，那就会引发大量的计算，在用户看来，页面可能就一时间没有响应，这个页面一下子变卡了变慢了。甚至在IE下，如果你绑定的resize事件进行较多DOM操作，其高频率可能直接就使得浏览器崩溃。</p>
<p>怎么解决？函数节流就是一种办法。话说第一次接触函数节流(throttle)，还是在看impress源代码的时候，impress在播放的时候，如果窗口大小发生改变(resize)，它会对整体进行缩放(scale)，使得每一帧都完整显示在屏幕上：<br><span class="img-wrap"><img data-src="/img/bVNUlu?w=300&amp;h=188" src="https://static.alili.tech/img/bVNUlu?w=300&amp;h=188" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>稍微留心，你会发现，当你改变窗体大小的时候，不管你怎么拉，怎么拽，都没有立刻生效，而是在你改变完大小后的一会儿，它的内容才进行缩放适应。看了源代码，它用的就是函数节流的方法。</p>
<p>函数节流，简单地讲，就是让一个函数无法在很短的时间间隔内连续调用，只有当上一次函数执行后过了你规定的时间间隔，才能进行下一次该函数的调用。以impress上面的例子讲，就是让缩放内容的操作在你不断改变窗口大小的时候不会执行，只有你停下来一会儿，才会开始执行。</p>
<h2 id="articleHeader1">函数节流的原理</h2>
<p>函数节流的原理挺简单的，估计大家都想到了，那就是定时器。当我触发一个时间时，先setTimout让这个事件延迟一会再执行，如果在这个时间间隔内又触发了事件，那我们就clear掉原来的定时器，再setTimeout一个新的定时器延迟一会执行，就这样。</p>
<h2 id="articleHeader2">代码实现</h2>
<p>明白了原理，那就可以在代码里用上了，但每次都要手动去新建清除定时器毕竟麻烦，于是需要封装。在《JavaScript高级程序设计》一书有介绍函数节流，里面封装了这样一个函数节流函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function throttle(method, context) {
     clearTimeout(methor.tId);
     method.tId = setTimeout(function(){
         method.call(context);
     }， 100);
 }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs monkey"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">throttle</span>(</span><span class="hljs-function"><span class="hljs-keyword">method</span>, <span class="hljs-title">context</span>) {</span>
     clearTimeout(methor.tId);
     <span class="hljs-function"><span class="hljs-keyword">method</span>.<span class="hljs-title">tId</span> =</span> setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(</span>){
         <span class="hljs-function"><span class="hljs-keyword">method</span>.<span class="hljs-title">call</span>(</span>context);
     }， <span class="hljs-number">100</span>);
 }
</code></pre>
<p>它把定时器ID存为函数的一个属性（= =个人的世界观不喜欢这种写法）。而调用的时候就直接写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onresize = function(){
    throttle(myFunc);
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onresize = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    throttle(myFunc);
}
</code></pre>
<p>这样两次函数调用之间至少间隔100ms。</p>
<p>而impress用的是另一个封装函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var throttle = function(fn, delay){
     var timer = null;
     return function(){
         var context = this, args = arguments;
         clearTimeout(timer);
         timer = setTimeout(function(){
             fn.apply(context, args);
         }, delay);
     };
 };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> throttle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn, delay</span>)</span>{
     <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;
     <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
         <span class="hljs-keyword">var</span> context = <span class="hljs-keyword">this</span>, args = <span class="hljs-built_in">arguments</span>;
         clearTimeout(timer);
         timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
             fn.apply(context, args);
         }, delay);
     };
 };
</code></pre>
<p>它使用闭包的方法形成一个私有的作用域来存放定时器变量timer。而调用方法为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onresize = throttle(myFunc, 100);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">window</span>.onresize = throttle(myFunc, <span class="hljs-number">100</span>);
</code></pre>
<p>两种方法各有优劣，前一个封装函数的优势在把上下文变量当做函数参数，直接可以定制执行函数的this变量；后一个函数优势在于把延迟时间当做变量（当然，前一个函数很容易做这个拓展），而且个人觉得使用闭包代码结构会更优，且易于拓展定制其他私有变量，缺点就是虽然使用apply把调用throttle时的this上下文传给执行函数，但毕竟不够灵活。</p>
<h2 id="articleHeader3">深化函数节流</h2>
<p>函数节流让一个函数只有在你不断触发后停下来歇会才开始执行，中间你操作得太快它直接无视你。这样做就有点太绝了。resize一般还好，但假如你写一个拖拽元素位置的程序，然后直接使用函数节流，那恭喜你，你会发现你拖动时元素是不动的，你拖完了，它直接闪到终点去。</p>
<p>其实函数节流的出发点，就是让一个函数不要执行得太频繁，减少一些过快的调用来节流。当你改变浏览器大小，浏览器触发resize事件的时间间隔是多少？我不清楚，个人猜测是16ms（每秒64次），反正跟mousemove一样非常太频繁，一个很小的时间段内必定执行，这是浏览器设好的，你无法直接改。而真正的节流应该是在可接受的范围内尽量延长这个调用时间，也就是我们自己控制这个执行频率，让函数减少调用以达到减少计算、提升性能的目的。假如原来是16ms执行一次，我们如果发现resize时每50ms一次也可以接受，那肯定用50ms做时间间隔好一点。</p>
<p>而上面介绍的函数节流，它这个频率就不是50ms之类的，它就是无穷大，只要你能不间断resize，刷个几年它也一次都不执行处理函数。我们可以对上面的节流函数做拓展：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var throttleV2 = function(fn, delay, mustRunDelay){
     var timer = null;
     var t_start;
     return function(){
         var context = this, args = arguments, t_curr = +new Date();
         clearTimeout(timer);
         if(!t_start){
             t_start = t_curr;
         }
         if(t_curr - t_start >= mustRunDelay){
             fn.apply(context, args);
             t_start = t_curr;
         }
         else {
             timer = setTimeout(function(){
                 fn.apply(context, args);
             }, delay);
         }
     };
 };
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> throttleV2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn, delay, mustRunDelay</span>)</span>{
     <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;
     <span class="hljs-keyword">var</span> t_start;
     <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
         <span class="hljs-keyword">var</span> context = <span class="hljs-keyword">this</span>, args = <span class="hljs-built_in">arguments</span>, t_curr = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
         clearTimeout(timer);
         <span class="hljs-keyword">if</span>(!t_start){
             t_start = t_curr;
         }
         <span class="hljs-keyword">if</span>(t_curr - t_start &gt;= mustRunDelay){
             fn.apply(context, args);
             t_start = t_curr;
         }
         <span class="hljs-keyword">else</span> {
             timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                 fn.apply(context, args);
             }, delay);
         }
     };
 };
</code></pre>
<p>在这个拓展后的节流函数升级版，我们可以设置第三个参数，即必然触发执行的时间间隔。如果用下面的方法调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onresize = throttleV2(myFunc, 50, 100);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>window.onresize = throttleV2(myFunc, <span class="hljs-number">50</span>, <span class="hljs-number">100</span>);
</code></pre>
<p>则意味着，50ms的间隔内连续触发的调用，后一个调用会把前一个调用的等待处理掉，但每隔100ms至少执行一次。原理也很简单，打时间tag，一开始记录第一次调用的时间戳，然后每次调用函数都去拿最新的时间跟记录时间比，超出给定的时间就执行一次，更新记录时间。</p>
<p>到现在为止呢，当我们在开发中遇到类似的问题，一个函数可能非常频繁地调用，我们有了几个选择：一呢，还是用原来的写法，频繁执行就频繁执行吧，哥的电脑好；二是用原始的函数节流；三则是用函数节流升级版。不是说第一种就不好，这要看实际项目的要求，有些就是对实时性要求高。而如果要求没那么苛刻，我们可以视具体情况使用第二种或第三种方法，理论上第二种方法执行的函数调用最少，性能应该节省最多，而第三种方法则更加地灵活，你可以在性能与体验上探索一个平衡点。</p>
<p>转载自AlloyTeam：<a href="http://www.alloyteam.com/2012/11/javascript-throttle/" rel="nofollow noreferrer" target="_blank"></a><a href="http://www.alloyteam.com/2012/11/javascript-throttle/" rel="nofollow noreferrer" target="_blank">http://www.alloyteam.com/2012...</a><br>扩展阅读：<a href="http://www.cnblogs.com/fsjohnhuang/p/4147810.html" rel="nofollow noreferrer" target="_blank">JS魔法堂：函数节流（throttle）与函数去抖（debounce）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS进阶篇--JS函数节流（throttle）

## 原文链接
[https://segmentfault.com/a/1190000009472348](https://segmentfault.com/a/1190000009472348)

