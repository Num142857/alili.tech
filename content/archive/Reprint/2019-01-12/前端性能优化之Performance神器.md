---
title: '前端性能优化之Performance神器' 
date: 2019-01-12 2:30:24
hidden: true
slug: pls4tvl43ur
categories: [reprint]
---

{{< raw >}}

                    
<p>　　对Chrome控制台有一定的了解的朋友都在知道，Network面板会包括很多网络请求方面的东西，包括Http相关的Request信息，Response信息，以及Cookies等等，都是前端开发需要密切关注的问题。<br>　　这些信息都是属于功能性的，那么当我们的功能需求满足后，势必需要对于性能进行优化，有什么工具可以帮助我们进行分析呢？答案就是Chrome控制台的Performance面板。<br>　　需要注意的一点是，Performance面板下的功能，是对于细节中的细节进行的优化。其中包含：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.FPS,CPU和NET的使用情况？
2.页面的前1毫秒和后1毫秒网络任务是怎样？
3.Javascript代码的执行消耗时间，显卡负载情况等？
4.浏览器对页面的绘制精确到毫秒级的情况？" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>FPS,CPU和NET的使用情况？
<span class="hljs-number">2.</span>页面的前<span class="hljs-number">1</span>毫秒和后<span class="hljs-number">1</span>毫秒网络任务是怎样？
<span class="hljs-number">3.</span>Javascript代码的执行消耗时间，显卡负载情况等？
<span class="hljs-number">4.</span>浏览器对页面的绘制精确到毫秒级的情况？</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009845284" src="https://static.alili.tech/img/remote/1460000009845284" alt="" title="" style="cursor: pointer; display: inline;"></span><br>　　这幅图中，1，2包括了FPS，CPU，NET以及网页渲染快照以及流式Network图，直观地浅显地回答了1和2两个问题，3回答了Javascript代码的执行消耗时间，显卡负载情况等，4则回答了浏览器对页面的绘制精确到毫秒级的情况。<br> 　　上一篇博客中也提到了，第4步，也就是我们最关心的一步，是浏览器对页面的绘制精确到毫秒级的情况，准确的为我们剖析了浏览器加载渲染页面的全过程。<br><span class="img-wrap"><img data-src="/img/remote/1460000009845285?w=666&amp;h=95" src="https://static.alili.tech/img/remote/1460000009845285?w=666&amp;h=95" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>　　因此下文我们主要对4进行剖析，它包括4个分析面板，肯定有各自的意思在其中。<br><span class="img-wrap"><img data-src="/img/remote/1460000009845286?w=349&amp;h=194" src="https://static.alili.tech/img/remote/1460000009845286?w=349&amp;h=194" alt="" title="" style="cursor: pointer; display: inline;"></span><br> 　　先来分析Summary面板，和其字面意思一样，这是总结面板。从宏观层面概括了浏览器加载的总时间，包括:</p>
<table>
<thead><tr>
<th>颜色</th>
<th>英文</th>
<th>中文</th>
</tr></thead>
<tbody>
<tr>
<td>蓝色</td>
<td>Loading</td>
<td>记载</td>
</tr>
<tr>
<td>黄色</td>
<td>Scripting</td>
<td>脚本</td>
</tr>
<tr>
<td>紫色</td>
<td>Rendering</td>
<td>渲染</td>
</tr>
<tr>
<td>绿色</td>
<td>Painting</td>
<td>绘制</td>
</tr>
<tr>
<td>深灰</td>
<td>Other</td>
<td>其他</td>
</tr>
<tr>
<td>浅灰</td>
<td>其他</td>
<td>未熄火（空闲）</td>
</tr>
</tbody>
</table>
<p>　　再来分析Bottom-Up面板，直接翻译成上下很愚蠢，索性翻译成刨根问底得了，这样更合适。<br>　　Self Time和Total Time以及Activity，其中的Self Time代表函数本身执行消耗时间，Total Time则是函数本身消耗再加上在调用它的函数中消耗的总时间，Activity不用解释，就是浏览器活动的意思。<br><span class="img-wrap"><img data-src="/img/remote/1460000009845287?w=394&amp;h=307" src="https://static.alili.tech/img/remote/1460000009845287?w=394&amp;h=307" alt="" title="" style="cursor: pointer;"></span><br>　　值得注意的是，这里的Group面板非常有用。我们可以很清晰明了得分析按照活动，目录，域，子域，URL和Frame进行分组的前端性能。对于开发非常有帮助。<br><span class="img-wrap"><img data-src="/img/remote/1460000009845288?w=435&amp;h=303" src="https://static.alili.tech/img/remote/1460000009845288?w=435&amp;h=303" alt="" title="" style="cursor: pointer;"></span><br>　　其实Bottom-Up和Call Tree都有各自的意思，前者是The Heavy (Bottom Up) view is available in the Bottom-Up tab，后者是And the Tree (Top Down) view is available in the Call Tree tab。个人理解的话，前者类似事件冒泡，后者类似事件捕获。要知道，Nodejs是事件驱动型，这对于以后学习Nodejs有很大的帮助。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009845289?w=1240&amp;h=270" src="https://static.alili.tech/img/remote/1460000009845289?w=1240&amp;h=270" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000009845290?w=1240&amp;h=256" src="https://static.alili.tech/img/remote/1460000009845290?w=1240&amp;h=256" alt="" title="" style="cursor: pointer; display: inline;"></span><br>　　看一下二者的对比图，很明显可以看出，自上而下的Call-Tree更符合我们的人类正常思维，可以更直观地分析浏览器对页面的build精确到毫秒级的情况。<br>　　就以百度首页进行分析。<br><strong>1. 绘制阶段</strong><br>综合视窗，绘制<br><span class="img-wrap"><img data-src="/img/remote/1460000009845291?w=362&amp;h=146" src="https://static.alili.tech/img/remote/1460000009845291?w=362&amp;h=146" alt="" title="" style="cursor: pointer; display: inline;"></span><br><strong>2. 加载阶段</strong><br>解析样式表，解析HTML（评估脚本，事件）<br><span class="img-wrap"><img data-src="/img/remote/1460000009845292?w=423&amp;h=237" src="https://static.alili.tech/img/remote/1460000009845292?w=423&amp;h=237" alt="" title="" style="cursor: pointer; display: inline;"></span><br><strong>3.脚本阶段</strong><br>　　DOM GC（DOM垃圾回收），评估脚本，事件，Major GC（清理年老区（Tenured space）），Minor GC（每次Minor GC只会清理年轻代），Run Microtasks（运行微服务），Timer Fired（销毁计时器） ，XMR Load（异步加载对象加载）。<br><span class="img-wrap"><img data-src="/img/remote/1460000009845293?w=464&amp;h=234" src="https://static.alili.tech/img/remote/1460000009845293?w=464&amp;h=234" alt="" title="" style="cursor: pointer;"></span><br><strong>4.渲染阶段</strong><br>　　视窗，升级视图树，重新计算样式。<br><span class="img-wrap"><img data-src="/img/remote/1460000009845294?w=524&amp;h=161" src="https://static.alili.tech/img/remote/1460000009845294?w=524&amp;h=161" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>　　最后说一下Event Log ，顾名思义就是事件日志的意思，可以很方便的选择想查看的某一阶段的日志。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009845400?w=932&amp;h=295" src="https://static.alili.tech/img/remote/1460000009845400?w=932&amp;h=295" alt="" title="" style="cursor: pointer; display: inline;"></span><br>　　<br>　　其实我的这篇博客没有特别深入的讲解了浏览器渲染机制，只是简单介绍了一下Performance如何使用，大家可以先看下Alon大牛的这篇<a href="http://jinlong.github.io/2017/05/08/optimising-the-front-end-for-the-browser/" rel="nofollow noreferrer" target="_blank">浏览器前端优化</a>，这篇博客干货非常多。<br>　　大家也都注意到了，Performance工具当中，包含了许多方便Nodejs开发的工具。我斗胆猜想，这可能真的是大前端的味道。前端不再是传统的UI层面或者操作DOM，而是担任了更多的角色。前端热潮中的mvvm三框架，vue，react以及angular，都有很多后端的思想。<br>　　有心的同学可以发现，饿了么大前端团队的文章，大多都是nodejs相关，对于后端了解较少的同学学起来会非常困难。同学在点我达，他们正在筹划改组成大前端团队。我们公司都没有ios和安卓，而是有一个类似大前端的开发支持部。所以说，这呈现出一个趋势，未来优秀的的前端工程师，后端Nodejs必不可少。<br>　　关于Performance，暂时浅尝辄止到这里，我想这对自己，以及每个阅读了这篇博客的前端工程师，将来会有或多或少的帮助。<br>参考文档：<br><a href="https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool?hl=zh-cn" rel="nofollow noreferrer" target="_blank">https://developers.google.com...</a><br><a href="https://stackoverflow.com/questions/7127671/difference-between-self-and-total-in-chrome-cpu-profile-of-js" rel="nofollow noreferrer" target="_blank">https://stackoverflow.com/que...</a><br><a href="https://developers.google.com/web/updates/2016/12/devtools-javascript-cpu-profile-migration" rel="nofollow noreferrer" target="_blank">https://developers.google.com...</a><br><a href="http://colobu.com/2015/04/07/minor-gc-vs-major-gc-vs-full-gc/" rel="nofollow noreferrer" target="_blank">http://colobu.com/2015/04/07/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端性能优化之Performance神器

## 原文链接
[https://segmentfault.com/a/1190000009845281](https://segmentfault.com/a/1190000009845281)

