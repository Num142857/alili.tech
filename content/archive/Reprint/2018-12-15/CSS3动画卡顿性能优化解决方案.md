---
title: 'CSS3动画卡顿性能优化解决方案' 
date: 2018-12-15 2:30:11
hidden: true
slug: 285fkjon3jg
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000013045038" src="https://static.alili.tech/img/remote/1460000013045038" alt="CSS3 Transition" title="CSS3 Transition" style="cursor: pointer; display: inline;"></span></p>
<p>最近在开发小程序，与vue类似，它们都有生命周期这回事。</p>
<blockquote>onLoad  监听页面加载<br>onReady 监听页面初次渲染完成<br>onShow 监听页面显示</blockquote>
<p>到底是什么意思？</p>
<p>所以这又触碰到了我的知识盲区，不过项目在磕磕绊绊中完成的差不多了，但是遇到了CSS3动画渲染的性能问题，所以我也是被逼的，再回过头来从浏览器渲染网页的流程出发，去找动画卡顿的症结。</p>
<p>浏览器渲染网页的流程如下：</p>
<blockquote>使用 HTML 创建文档对象模型（DOM）<br>使用 CSS 创建 CSS 对象模型（CSSOM）<br>基于 DOM 和 CSSOM 执行脚本（Scripts）<br>合并 DOM 和 CSSOM 形成渲染树（Render Tree）<br>使用渲染树布局（Layout）所有元素<br>渲染（Paint）所有元素</blockquote>
<p>可以结合Alon的这篇<a href="http://jinlong.github.io/2017/05/08/optimising-the-front-end-for-the-browser/" rel="nofollow noreferrer" target="_blank">前端性能优化</a>和安卓开发者选项的显示页面布局。</p>
<p>安卓开发者选项的显示页面布局</p>
<blockquote>如何判断手机app是native，webview还是hybird?<br>简单说下，app中的一大块是白色的没有红线标记出来的，但是上面有按钮，图片等时，就是webview，也就是通过一个伪浏览器去请求到的数据，断网时打开app没有任何东西显示在上面</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013045039" src="https://static.alili.tech/img/remote/1460000013045039" alt="小程序为hybird式开发" title="小程序为hybird式开发" style="cursor: pointer;"></span></p>
<p><strong>onLoad 监听页面加载</strong><br>在渲染完界面之后，也就是通过.json中的配置项生成native界面后，开始渲染webview的部分，一个页面只会调用一次。<br><strong>onReady 监听页面初次渲染完成</strong><br>一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。<br><strong>onShow 监听页面显示</strong><br>每次打开页面都会去调用其中的函数。</p>
<h3 id="articleHeader0">我们的动画应该放在哪里？</h3>
<p>应该放在onShow里，因为这样我每次打开都能看到动画。</p>
<h3 id="articleHeader1">为什么会卡顿？</h3>
<p>有一个前提必须要提，前端开发者们都知道，浏览器是单线程运行的。<br>但是我们要明确以下几个概念：单线程，主线程和合成线程。</p>
<p>虽然说浏览器执行js是单线程执行（注意，是执行，并不是说浏览器只有1个线程，而是运行时，runing），但实际上浏览器的2个重要的执行线程，这 2 个线程协同工作来渲染一个网页：主线程和合成线程。</p>
<p>一般情况下，主线程负责：运行 JavaScript；计算 HTML 元素的 CSS 样式；页面的布局；将元素绘制到一个或多个位图中；将这些位图交给合成线程。</p>
<p>相应地，合成线程负责：通过 GPU 将位图绘制到屏幕上；通知主线程更新页面中可见或即将变成可见的部分的位图；计算出页面中哪部分是可见的；计算出当你在滚动页面时哪部分是即将变成可见的；当你滚动页面时将相应位置的元素移动到可视区域。</p>
<h3 id="articleHeader2">那么为什么会造成动画卡顿呢？</h3>
<p>原因就是主线程和合成线程的调度不合理。</p>
<p>下面来详细说一下调度不合理的原因。</p>
<blockquote>在使用height，width，margin，padding作为transition的值时，会造成浏览器主线程的工作量较重，例如从margin-left：-20px渲染到margin-left:0，主线程需要计算样式margin-left:-19px,margin-left:-18px，一直到margin-left:0，而且每一次主线程计算样式后，合成进程都需要绘制到GPU然后再渲染到屏幕上，前后总共进行20次主线程渲染，20次合成线程渲染，20+20次，总计40次计算。</blockquote>
<p>主线程的渲染流程，可以参考浏览器渲染网页的流程：</p>
<blockquote>使用 HTML 创建文档对象模型（DOM）<br>使用 CSS 创建 CSS 对象模型（CSSOM）<br>**基于 DOM 和 CSSOM 执行脚本（Scripts）<br>合并 DOM 和 CSSOM 形成渲染树（Render Tree）<br>使用渲染树布局（Layout）所有元素<br>渲染（Paint）所有元素**</blockquote>
<p>也就是说，主线程每次都需要执行Scripts，Render Tree ,Layout和Paint这四个阶段的计算。</p>
<blockquote>而如果使用transform的话，例如tranform:translate(-20px,0)到transform:translate(0,0)，主线程只需要进行一次tranform:translate(-20px,0)到transform:translate(0,0)，然后合成线程去一次将-20px转换到0px，这样的话，总计1+20计算。</blockquote>
<p>可能会有人说，这才提升了19次，有什么好性能提升的？</p>
<p>假设一次10ms。</p>
<p>那么就减少了约190ms的耗时。</p>
<p>会有人说，辣鸡，才190ms，无所谓。</p>
<p>那么如果margin-left是从-200px到0呢，一次10ms，10ms*199≈2s。</p>
<p>还会有人说，辣鸡，也就2s，无所谓。</p>
<p>你忘了单线程这回事了吗？</p>
<p>如果网页有3个动画，3*2s=6s，就是6s的性能提升。<br>由于数据是猜测的，所以暂时不考虑其真实性，文章后面我使用chrome devtools的performance做了一个实验。</p>
<p>要知道，在"客户至上"的今天，好的用户体验是所有产品的必须遵守的一条规则，无论是对于开发者还是产品经理，追求极致的性能都是我们打造一个好的产品所必备的品质。</p>
<p>可能看了我的略不专业的分析后，大家对主线程，合成线程以及它们在2种性能不同动画方案上的工作流程还不是很了解，可以去看一篇翻译过来的博客（英文原版链接已经失效了）：<a href="http://sy-tang.github.io/2014/05/14/CSS%20animations%20and%20transitions%20performance-%20looking%20inside%20the%20browser/" rel="nofollow noreferrer" target="_blank">深入浏览器理解CSS animations 和 transitions的性能问题</a></p>
<p>这篇文章完美讲述了浏览器主线程和合成线程的区别，并且举了一个高度从100px变化到200px的2种动画方案的对比，对主线程和合成线程的整个工作流程做了很详尽的讲解，真心建议认真阅读一遍。</p>
<p>回过头来总结下，css3动画卡顿的解决方案：<br><strong>在使用css3 transtion做动画效果时，优先选择transform，尽量不要使用height，width，margin和padding。</strong></p>
<p>transform为我们提供了丰富的api，例如scale，translate，rotate等等，但是在使用时需要考虑兼容性。但其实对于大多数css3来说，mobile端支持性较好，desktop端支持性需要格外注意。</p>
<hr>
<p>补充：为了增强本文的说服力，特地回家做了一个实验，代码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot; />
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;>
  <title>Page Title</title>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;>
  <style>
    .margin-transition{
      /* margin-left: 0; */
      background: rgba(0,0,255,0.3);
      transition: margin-left 1s;
    }
    .transform-transition{
      /* transform: translate(0,0); */
      background: rgba(0,255,0,0.3);
      transition: transform 1s;
    }
    .common{
      height: 300px;
      width: 300px;
    }
  </style>
</head>
<body>
  <div class=&quot;margin-transition common&quot; id=&quot;marginTransition&quot;>
    <p>transition:margin-left 1s</p>
  </div>
  <div class=&quot;transform-transition common&quot; id=&quot;transformTransition&quot;>
      <p>transition:tranform 1s</p>
  </div>
  <button id=&quot;control&quot;>见证奇迹</button>
  <script>
      var btn = document.getElementById('control');
      var marginTransition = document.getElementById('marginTransition');
      var transformTransition = document.getElementById('transformTransition');
      btn.addEventListener(&quot;click&quot;,function(){
        console.log(marginTransition.style,transformTransition.style)
        marginTransition.style.marginLeft = &quot;500px&quot;;
        transformTransition.style.transform = &quot;translate(500px,0)&quot;
      })
  </script>  
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Page Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.margin-transition</span>{
      <span class="hljs-comment">/* margin-left: 0; */</span>
      <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0,0,255,0.3);
      <span class="hljs-attribute">transition</span>: margin-left <span class="hljs-number">1s</span>;
    }
    <span class="hljs-selector-class">.transform-transition</span>{
      <span class="hljs-comment">/* transform: translate(0,0); */</span>
      <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0,255,0,0.3);
      <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">1s</span>;
    }
    <span class="hljs-selector-class">.common</span>{
      <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"margin-transition common"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"marginTransition"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>transition:margin-left 1s<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"transform-transition common"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"transformTransition"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>transition:tranform 1s<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"control"</span>&gt;</span>见证奇迹<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
      <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'control'</span>);
      <span class="hljs-keyword">var</span> marginTransition = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'marginTransition'</span>);
      <span class="hljs-keyword">var</span> transformTransition = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'transformTransition'</span>);
      btn.addEventListener(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(marginTransition.style,transformTransition.style)
        marginTransition.style.marginLeft = <span class="hljs-string">"500px"</span>;
        transformTransition.style.transform = <span class="hljs-string">"translate(500px,0)"</span>
      })
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>我将主要借助chrome devtools的performance工具对比二者的性能差异。<br>先来看margin动画，动态修改DOM节点的margin-left值从0到500px;。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transition: margin-left 1s;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">transition</span>: margin-left <span class="hljs-number">1s</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013045040" src="https://static.alili.tech/img/remote/1460000013045040" alt="margin动画实验" title="margin动画实验" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013045041" src="https://static.alili.tech/img/remote/1460000013045041" alt="margin动画总耗时" title="margin动画总耗时" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013045042" src="https://static.alili.tech/img/remote/1460000013045042" alt="margin动画GPU使用率" title="margin动画GPU使用率" style="cursor: pointer;"></span></p>
<p>再来看下transform动画，动态修改DOM节点的transform值从translate(0,0)到translate(500px,0)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transition: transform 1s;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">transition</span>: transform <span class="hljs-number">1s</span>;</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013045043" src="https://static.alili.tech/img/remote/1460000013045043" alt="transform动画实验" title="transform动画实验" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013045044" src="https://static.alili.tech/img/remote/1460000013045044" alt="transform动画总耗时" title="transform动画总耗时" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013045045" src="https://static.alili.tech/img/remote/1460000013045045" alt="transform动画GPU使用率" title="transform动画GPU使用率" style="cursor: pointer;"></span></p>
<p>可能图片不是很好地能说明性能差异，那么我们来列一张耗时对比表，方便我们计算。</p>
<table>
<thead><tr>
<th>耗时</th>
<th align="center">margin</th>
<th align="right">transform</th>
</tr></thead>
<tbody>
<tr>
<td>Summery</td>
<td align="center">3518ms</td>
<td align="right">2286ms</td>
</tr>
<tr>
<td>Scripting</td>
<td align="center">1.8ms</td>
<td align="right">2.9ms</td>
</tr>
<tr>
<td>Rendering</td>
<td align="center">22.5ms</td>
<td align="right">6.9ms</td>
</tr>
<tr>
<td>Painting</td>
<td align="center">9.7ms</td>
<td align="right">1.6ms</td>
</tr>
<tr>
<td>Other</td>
<td align="center">39.3ms</td>
<td align="right">25.2ms</td>
</tr>
<tr>
<td>Idle( browser is waiting on the CPU or GPU to do some processing)</td>
<td align="center">3444.4ms</td>
<td align="right">2249.8ms</td>
</tr>
<tr>
<td><strong>GPU使用率</strong></td>
<td align="center">4.1MB</td>
<td align="right">1.7MB</td>
</tr>
</tbody>
</table>
<p>通过上表我们可以计算出明margin，transform与transition组合实现CSS3动画效果时的性能差异参数。</p>
<table>
<thead><tr>
<th>关键性能参数</th>
<th align="center">margin</th>
<th align="right">transform</th>
</tr></thead>
<tbody><tr>
<td><strong>实际动画耗时（总时间 减去 空闲时间）</strong></td>
<td align="center">73.6ms</td>
<td align="right">36.2ms</td>
</tr></tbody>
</table>
<p>计算得出，transform动画耗时约等于margin动画耗时的0.49倍，性能优化50%。</p>
<p>由于我对Other的所做的具体事情不是很清楚，所以这里的实际动画时间也有可能还要减掉Other中的时间，下表是我们减掉后的数据。</p>
<table>
<thead><tr>
<th>关键性能参数</th>
<th align="center">margin</th>
<th align="right">transform</th>
</tr></thead>
<tbody><tr>
<td><strong>实际动画耗时（总时间 减去 其他时间和空闲时间）</strong></td>
<td align="center">34.3ms</td>
<td align="right">11ms</td>
</tr></tbody>
</table>
<p>计算得出，transform动画耗时约等于margin动画耗时的0.32倍，性能优化接近70%。</p>
<p>也就是说，无论我们减去还是不减去Other的时间，我们采用transform实现动画的方式都比margin动画快。</p>
<p>不精确的得出一个小结论：<strong>transform比margin性能好50%~70%</strong>。</p>
<p>虽然会有50%~70%的性能提升，但是需要注意硬件差异，硬件好的情况下可能不能发现卡顿或者其他的一些性能上的问题。<br>例如在开发小程序的过程中，模拟器是位于desktop端的，因此它的硬件性能性能更好，例如CPU，GPU。但是一旦在mobile端运行，例如ios或者android上运行时，就可能会出现性能问题，这就是因为移动端的硬件条件逊于PC端导致的。</p>
<p>所以说，性能问题是一直存在的，只不过硬件差异会导致性能影响的程度不同。</p>
<p>所以我们再次回过头来，总结出css3动画卡顿的解决方案：<br><strong>在使用css3 transtion做动画效果时，优先选择transform，尽量不要使用height，width，margin和padding。</strong></p>
<p>That's it !</p>
<p>参考：<br><a href="http://sy-tang.github.io/2014/05/14/CSS%20animations%20and%20transitions%20performance-%20looking%20inside%20the%20browser/" rel="nofollow noreferrer" target="_blank">http://sy-tang.github.io/2014...</a><br><a href="http://jinlong.github.io/2017/05/08/optimising-the-front-end-for-the-browser/" rel="nofollow noreferrer" target="_blank">http://jinlong.github.io/2017...</a><br><a href="http://blog.csdn.net/yeana1/article/details/52756871" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/yeana1/a...</a><br><a href="https://www.jianshu.com/p/b70b72de3c32" rel="nofollow noreferrer" target="_blank">https://www.jianshu.com/p/b70...</a><br><a href="https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/" rel="nofollow noreferrer" target="_blank">https://developers.google.com...</a><br><a href="http://blogs.adobe.com/webplatform/2014/03/18/css-animations-and-transitions-performance/" rel="nofollow noreferrer" target="_blank">http://blogs.adobe.com/webpla...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS3动画卡顿性能优化解决方案

## 原文链接
[https://segmentfault.com/a/1190000013045035](https://segmentfault.com/a/1190000013045035)

