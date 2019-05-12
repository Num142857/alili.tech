---
title: 'GSAP - 专业的 Web 动画库' 
date: 2019-02-09 2:30:59
hidden: true
slug: zp3et1eo1b
categories: [reprint]
---

{{< raw >}}

                    
<p>说到在网页里创建动画，你可能很快会想到jQuery的<code>animate()</code>方法，或者css3的<code>animation</code>和<code>transition</code>。现在，本文将介绍另一个web动画的可选方案，GSAP。</p>
<p><a href="http://greensock.com/gsap" rel="nofollow noreferrer" target="_blank">GSAP</a>的全名是GreenSock Animation Platform，这个名字是有些怪异（官网还在各种安利你加入它的Club），但它的确是一个从flash时代一直发展到今天的专业动画库。</p>
<h2 id="articleHeader0">组成简介</h2>
<p>在官网选择Download zip就可以拿到GSAP源码，解压后可以看到有这些文件：</p>
<p><span class="img-wrap"><img data-src="/img/bVwF8Z" src="https://static.alili.tech/img/bVwF8Z" alt="GSAP的文件组成" title="GSAP的文件组成" style="cursor: pointer; display: inline;"></span></p>
<p>这里的<code>TweenLite.js</code>、<code>TweenMax.js</code>、<code>TimelineLite.js</code>和<code>TimelineMax.js</code>4个文件就是GSAP的一般引用库文件，不过，这几个文件还有一些重叠和包含的关系，如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVwF8X" src="https://static.alili.tech/img/bVwF8X" alt="GSAP的源文件关系" title="GSAP的源文件关系" style="cursor: pointer; display: inline;"></span></p>
<p>因此，如果想要简单地引入GSAP的主体功能，使用<code>TweenMax.js</code>这一个文件即可（请看前一张图中反映出的这个文件的大小）。而如果要争取更小的库文件大小，应该使用<code>TweenLite.js</code>（必需）+ 其他文件的组合。</p>
<p>这4个文件分别包含了什么东西呢？</p>
<ul>
<li><p><code>TweenLite</code>是GSAP的主体核心，它用于创建基本动画，是其他各类模块的基础。一般都会搭配<code>plugins/CSSPlugin</code>以实现DOM元素的动画（也就是我们最熟悉的动画了）。</p></li>
<li><p><code>TimelineLite</code>是一个叫做时间轴的动画容器，它用于对多个动画进行有序的组织与控制。</p></li>
<li><p><code>TimeLineMax</code>是<code>TimelineLite</code>的升级版，在<code>TimelineLite</code>的基础之上，可以有更高级的组织与控制。</p></li>
<li><p><code>TweenMax</code>是GSAP集合包，除前面3个之外，还包括<code>plugins</code>里的常用插件以及<code>easing</code>里的缓动函数补充。</p></li>
</ul>
<p>GSAP在Customize里是这样描述自己拥有的模块的：</p>
<p><span class="img-wrap"><img data-src="/img/bVwF80" src="https://static.alili.tech/img/bVwF80" alt="GSAP的模块组成" title="GSAP的模块组成" style="cursor: pointer;"></span></p>
<p>默认勾选的<code>TweenLite</code> + <code>css plugin</code>是最简单的应用组合，本文就先从它们开始（v1.18.4）。</p>
<h2 id="articleHeader1">TweenLite的基本动画</h2>
<h3 id="articleHeader2">值动画</h3>
<p>一切动画，都从值的变化开始。</p>
<p>TweenLite作为主体核心，做的就是这件事。TweenLite具体如何使用呢？请看下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    myProp: 0
};

TweenLite.to(obj, 0.2, {
    myProp: 1,
    onUpdate: function() {
        console.log(&quot;[update] obj.myProp = &quot;, obj.myProp);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">myProp</span>: <span class="hljs-number">0</span>
};

TweenLite.to(obj, <span class="hljs-number">0.2</span>, {
    <span class="hljs-attr">myProp</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">onUpdate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"[update] obj.myProp = "</span>, obj.myProp);
    }
});</code></pre>
<p><code>TweenLite.to(target, duration, vars)</code>是TweenLite最常用的方法，<code>target</code>指定动画元素，<code>duration</code>指定动画持续时间，<code>vars</code>指定动画的目标值。请注意，这里并没有操作任何DOM元素，所以和我们一般写的动画不太一样。运行一下：</p>
<p><span class="img-wrap"><img data-src="/img/bVwF82" src="https://static.alili.tech/img/bVwF82" alt="TweenLIte为object创建动画" title="TweenLIte为object创建动画" style="cursor: pointer;"></span></p>
<p>可以看到，TweenLite的作用是，让<code>obj</code>的属性<code>myProp</code>从初始值<code>0</code>，变化到目标值<code>1</code>。虽然没有视觉效果，但这就是基本的值动画。</p>
<h3 id="articleHeader3">有视觉效果的css动画</h3>
<p>TweenLite加上<code>plugins/CSSPlugin</code>后，就可以做我们熟悉的DOM元素的动画了。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.to(&quot;#ball1&quot;, 2, {
  x: 200
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">TweenLite.to(<span class="hljs-string">"#ball1"</span>, <span class="hljs-number">2</span>, {
  <span class="hljs-attr">x</span>: <span class="hljs-number">200</span>
});</code></pre>
<p>效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVwF83" src="https://static.alili.tech/img/bVwF83" alt="TweenLite的css动画" title="TweenLite的css动画" style="cursor: pointer;"></span></p>
<p>GSAP用<code>x</code>、<code>y</code>表示transform的<code>translateX</code>和<code>translateY</code>。<code>TweenLite.to(target, duration, vars)</code>的第一个参数<code>target</code>可以是选择符，因此这里就是选取id为<code>ball1</code>的元素，执行时长为2s的动画，从当前位置移动到<code>translateX(200px)</code>的位置。</p>
<p>你可以在的第3个参数<code>vars</code>内添加任意css属性，它们都会被用作被选取元素的动画目标值。</p>
<h3 id="articleHeader4">延迟、缓动及动画事件</h3>
<p>第3个参数<code>vars</code>内除了css属性之外，还可以指定许多具有特定意义的属性，用于配置动画。GSAP会自动根据名字来区分它们。</p>
<p>例如，<code>delay</code>和<code>ease</code>分别用于设置动画延迟及缓动函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.to(&quot;#ball1&quot;, 2, {
  x: 200,
  delay: 2,
  ease: Linear.easeNone
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">TweenLite.to(<span class="hljs-string">"#ball1"</span>, <span class="hljs-number">2</span>, {
  <span class="hljs-attr">x</span>: <span class="hljs-number">200</span>,
  <span class="hljs-attr">delay</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">ease</span>: Linear.easeNone
});</code></pre>
<p>这里的动画将延迟2s运行，而且改为线性变化（默认为<code>Quad.easeOut</code>）。</p>
<p>如果想要在动画开始，动画运行的每一帧，动画结束时分别执行对应的事件函数，使用<code>onStart</code>、<code>onUpdate</code>、<code>onComplete</code>。前文的值动画的例子就是通过<code>onUpdate</code>把值的变化打印出来的。</p>
<p>GSAP有<a href="http://greensock.com/ease-visualizer" rel="nofollow noreferrer" target="_blank">专门的位置</a>可以查询缓动函数。更多的可用特定属性，请参考<a href="http://greensock.com/docs/#/HTML5/GSAP/TweenLite/" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p>
<h3 id="articleHeader5">相对值</h3>
<p>有些时候我们可能不清楚元素当前是否已经有<code>translate</code>，但就是想让元素相对它原本的位置移动一段距离。这时可以用相对值，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.to(&quot;#ball1&quot;, 2, {
  x: &quot;+=200px&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">TweenLite.to(<span class="hljs-string">"#ball1"</span>, <span class="hljs-number">2</span>, {
  <span class="hljs-attr">x</span>: <span class="hljs-string">"+=200px"</span>
});</code></pre>
<p>类似的还有<code>-=</code>，按照以上写法，无论元素当前的<code>translateX</code>是多少，都会相对偏移<code>200px</code>。</p>
<h3 id="articleHeader6">其他动画方法</h3>
<p>除<code>to()</code>之外，还有<code>from()</code>和<code>fromTo()</code>。单词都很简单，对吧？</p>
<p><code>from()</code>和<code>to()</code>的参数及用法完全一样，只是<code>vars</code>里的属性定义的是动画初始值，而元素原本的属性用作动画目标值。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.from(&quot;#ball1&quot;, 2, {
  x: &quot;+=200px&quot;,
  backgroundColor: &quot;#2196f3&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">TweenLite.from(<span class="hljs-string">"#ball1"</span>, <span class="hljs-number">2</span>, {
  <span class="hljs-attr">x</span>: <span class="hljs-string">"+=200px"</span>,
  <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">"#2196f3"</span>
});</code></pre>
<p>效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVwF87" src="https://static.alili.tech/img/bVwF87" alt="TweenLite.from()" title="TweenLite.from()" style="cursor: pointer;"></span></p>
<p>这里可以看到，颜色动画也是可用的。</p>
<p><code>TweenLite.fromTo(target, duration, fromVars, toVars)</code>的参数要多1个，不过从字面意思就很容易理解，即分别让你指定动画的初始和结尾。需要注意的是，前面提到的具有特定意义的属性，如<code>delay</code>，<code>ease</code>，都要写在<code>toVars</code>里，在<code>fromVars</code>里定义的无效。</p>
<h3 id="articleHeader7">动画保存及控制</h3>
<p>和<code>jQuery.animate()</code>的风格不同，GSAP以动画为主体，你可以这样保存动画：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tween = TweenLite.to(&quot;#ball1&quot;, 2, {
  x: &quot;+=200px&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> tween = TweenLite.to(<span class="hljs-string">"#ball1"</span>, <span class="hljs-number">2</span>, {
  <span class="hljs-attr">x</span>: <span class="hljs-string">"+=200px"</span>
});</code></pre>
<p>然后你可以做精细的控制：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 暂停
tween.pause();

// 继续播放
tween.resume();

// 反转播放
tween.reverse();

// 跳转到1s进度处开始播放
tween.seek(1);

// 重播
tween.restart();

// 动画变为三倍速
tween.timeScale(3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 暂停</span>
tween.pause();

<span class="hljs-comment">// 继续播放</span>
tween.resume();

<span class="hljs-comment">// 反转播放</span>
tween.reverse();

<span class="hljs-comment">// 跳转到1s进度处开始播放</span>
tween.seek(<span class="hljs-number">1</span>);

<span class="hljs-comment">// 重播</span>
tween.restart();

<span class="hljs-comment">// 动画变为三倍速</span>
tween.timeScale(<span class="hljs-number">3</span>);</code></pre>
<p>这些可以看做GSAP作为专业动画库的体现。</p>
<h3 id="articleHeader8">选择器</h3>
<p>前面的例子中反复用到了类似jQuery的选择器，但GSAP并没有自带选择器，相关源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.selector = window.$ || window.jQuery || function(e) {
    var selector = window.$ || window.jQuery;
    if (selector) {
        TweenLite.selector = selector;
        return selector(e);
    }
    return (typeof(document) === &quot;undefined&quot;) ? e 
    : (document.querySelectorAll ? document.querySelectorAll(e) 
        : document.getElementById((e.charAt(0) === &quot;#&quot;) ? e.substr(1) 
            : e));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">TweenLite.selector = <span class="hljs-built_in">window</span>.$ || <span class="hljs-built_in">window</span>.jQuery || <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">var</span> selector = <span class="hljs-built_in">window</span>.$ || <span class="hljs-built_in">window</span>.jQuery;
    <span class="hljs-keyword">if</span> (selector) {
        TweenLite.selector = selector;
        <span class="hljs-keyword">return</span> selector(e);
    }
    <span class="hljs-keyword">return</span> (<span class="hljs-keyword">typeof</span>(<span class="hljs-built_in">document</span>) === <span class="hljs-string">"undefined"</span>) ? e 
    : (<span class="hljs-built_in">document</span>.querySelectorAll ? <span class="hljs-built_in">document</span>.querySelectorAll(e) 
        : <span class="hljs-built_in">document</span>.getElementById((e.charAt(<span class="hljs-number">0</span>) === <span class="hljs-string">"#"</span>) ? e.substr(<span class="hljs-number">1</span>) 
            : e));
};</code></pre>
<p>GSAP不依赖jQuery，但如果引入了jQuery，GSAP会使用jQuery的选择器，否则回退到<code>document.querySelectorAll()</code>及<code>document.getElementById()</code>。</p>
<h2 id="articleHeader9">TimelineLite的动画管理</h2>
<p>好像<code>TweenLite</code> + <code>css plugin</code>就已经足够用了，这个Timeline系列是做什么的呢？</p>
<p>想象你是一个动画的导演，你要按剧本安排演员在一个CUT里依次上场和退场。在前文的例子里，我们只有一个演员（<code>#ball1</code>），但现在，我们要拍一个有20+演员的动画大片，要怎么办呢？</p>
<p>你也许曾用css3的<code>animation</code>做过类似的事情，做法是，当转换到一个场景（CUT）后，为场景里的所有演员依次设定适当的<code>delay</code>。只要<code>delay</code>计划好，看起来就是漂亮精彩的大片。</p>
<p>不过，这可没有那么简单，假如你已经安排好了20位演员的上场时间，现在改了下剧本，来了第21位演员要在最开始上场，你会发现你可能要依次调整在它之后的所有演员的<code>delay</code>...</p>
<p>GSAP的TweenLite也会有同样的问题，因此，我们需要有一个工具来统一管理多个元素的多个动画，这就是TimelineLite。</p>
<h3 id="articleHeader10">时间轴</h3>
<p>如果你做过视频编辑，你一定很熟悉“时间轴”这个概念。简单来说，每一个元素的单次动画都是一段素材，我们需要把它们分别放置到同一个时间轴的适当位置，才能集合在一起得到有序的动画大片。</p>
<p>现在我们引入<code>TimelineLite</code>。下面是一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tl = new TimelineLite();
tl.from(&quot;#ball1&quot;, 1, {
    y: &quot;-=60px&quot;,
    autoAlpha: 0
}).from(&quot;#ball2&quot;, 1, {
    x: &quot;+=60px&quot;,
    autoAlpha: 0
}).from(&quot;#ball3&quot;, 1, {
    y: &quot;+=60px&quot;,
    autoAlpha: 0
}).from(&quot;#ball4&quot;, 1, {
    x: &quot;-=60px&quot;,
    autoAlpha: 0
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> tl = <span class="hljs-keyword">new</span> TimelineLite();
tl.from(<span class="hljs-string">"#ball1"</span>, <span class="hljs-number">1</span>, {
    <span class="hljs-attr">y</span>: <span class="hljs-string">"-=60px"</span>,
    <span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>
}).from(<span class="hljs-string">"#ball2"</span>, <span class="hljs-number">1</span>, {
    <span class="hljs-attr">x</span>: <span class="hljs-string">"+=60px"</span>,
    <span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>
}).from(<span class="hljs-string">"#ball3"</span>, <span class="hljs-number">1</span>, {
    <span class="hljs-attr">y</span>: <span class="hljs-string">"+=60px"</span>,
    <span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>
}).from(<span class="hljs-string">"#ball4"</span>, <span class="hljs-number">1</span>, {
    <span class="hljs-attr">x</span>: <span class="hljs-string">"-=60px"</span>,
    <span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>
});</code></pre>
<p>效果是：</p>
<p><span class="img-wrap"><img data-src="/img/bVwF9e" src="https://static.alili.tech/img/bVwF9e" alt="TimelineLite顺序动画" title="TimelineLite顺序动画" style="cursor: pointer;"></span></p>
<p>以上的<code>tl.from()</code>等同于以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tl.add(TweenLite.from(&quot;#ball1&quot;, 1, {
    y: &quot;-=60px&quot;,
    autoAlpha: 0
}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">tl.add(TweenLite.from(<span class="hljs-string">"#ball1"</span>, <span class="hljs-number">1</span>, {
    <span class="hljs-attr">y</span>: <span class="hljs-string">"-=60px"</span>,
    <span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>
}));</code></pre>
<p>可见，TimelineLite像一个容器，它可以通过<code>add()</code>方法将TweenLite动画添加到自己的时间轴上。然后，动画将以时间轴为整体，进行播放。</p>
<p>在默认情况下，TimelineLite会这样按添加顺序依次排列它们的位置，就这样，我们不借助<code>delay</code>做出了这种较复杂的动画组合。</p>
<p>如果画一下这里的时间轴，是这样的：</p>
<p><span class="img-wrap"><img data-src="/img/bVwF9g" src="https://static.alili.tech/img/bVwF9g" alt="时间轴图示 - 顺序动画" title="时间轴图示 - 顺序动画" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">调整放置位置</h3>
<p>如果要让第2个动画不是在第1个刚结束时播放，而是更提前一点，看起来更连贯的话？</p>
<p>这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tl = new TimelineLite();
tl.from(&quot;#ball1&quot;, 1, {
    y: &quot;-=60px&quot;,
    autoAlpha: 0
}).from(&quot;#ball2&quot;, 1, {
    x: &quot;+=60px&quot;,
    autoAlpha: 0
}, &quot;-=0.7&quot;).from(&quot;#ball3&quot;, 1, {
    y: &quot;+=60px&quot;,
    autoAlpha: 0
}, &quot;-=0.7&quot;).from(&quot;#ball4&quot;, 1, {
    x: &quot;-=60px&quot;,
    autoAlpha: 0
}, &quot;-=0.7&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> tl = <span class="hljs-keyword">new</span> TimelineLite();
tl.from(<span class="hljs-string">"#ball1"</span>, <span class="hljs-number">1</span>, {
    <span class="hljs-attr">y</span>: <span class="hljs-string">"-=60px"</span>,
    <span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>
}).from(<span class="hljs-string">"#ball2"</span>, <span class="hljs-number">1</span>, {
    <span class="hljs-attr">x</span>: <span class="hljs-string">"+=60px"</span>,
    <span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>
}, <span class="hljs-string">"-=0.7"</span>).from(<span class="hljs-string">"#ball3"</span>, <span class="hljs-number">1</span>, {
    <span class="hljs-attr">y</span>: <span class="hljs-string">"+=60px"</span>,
    <span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>
}, <span class="hljs-string">"-=0.7"</span>).from(<span class="hljs-string">"#ball4"</span>, <span class="hljs-number">1</span>, {
    <span class="hljs-attr">x</span>: <span class="hljs-string">"-=60px"</span>,
    <span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>
}, <span class="hljs-string">"-=0.7"</span>);</code></pre>
<p>其中<code>tl.from(target, duration, vars, position)</code>等同于<code>tl.add(TweenLite.from(target, duration, vars), position);</code>，这里的<code>position</code>参数指定动画在时间轴上的位置，默认为<code>+=0</code>也就是取前一个动画的结束点。以上的<code>-=0.7</code>就是相对这个位置再提前0.7s，这样就让动画互相之间有了重叠，看起来更连贯流畅一些。</p>
<p>效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVwF9i" src="https://static.alili.tech/img/bVwF9i" alt="TimelineLite调整动画" title="TimelineLite调整动画" style="cursor: pointer; display: inline;"></span></p>
<p>时间轴像这样：</p>
<p><span class="img-wrap"><img data-src="/img/bVwF9j" src="https://static.alili.tech/img/bVwF9j" alt="时间轴图示 - 调整动画" title="时间轴图示 - 调整动画" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader12">时间轴控制</h3>
<p>把多个动画装进时间轴的重要作用是，可以当做一个整体进行控制和调整。时间轴的这些方法类似TweenLite：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 在1s时间进度位置暂停
tl.pause(1);

// ... （和前面tween一样）

// 跳转到50%进度处
tl.progess(0.5);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// 在1s时间进度位置暂停</span>
tl.pause(<span class="hljs-number">1</span>);

<span class="hljs-comment">// ... （和前面tween一样）</span>

<span class="hljs-comment">// 跳转到50%进度处</span>
tl.progess(<span class="hljs-number">0.5</span>);
</code></pre>
<h3 id="articleHeader13">相同动画的简便方法</h3>
<p>如果多个元素的动画是一样的，而且它们需要有规律地安排在时间轴的不同位置，那么非常适合用<code>staggerFrom()</code>、<code>staggerTo()</code>及<code>staggerFromTo()</code>。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tl.staggerFrom([&quot;#ball1&quot;, &quot;#ball2&quot;, &quot;#ball3&quot;, &quot;#ball4&quot;, ], 1, {
    scale: &quot;-=0.5&quot;,
    autoAlpha: 0
}, 2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">tl.staggerFrom([<span class="hljs-string">"#ball1"</span>, <span class="hljs-string">"#ball2"</span>, <span class="hljs-string">"#ball3"</span>, <span class="hljs-string">"#ball4"</span>, ], <span class="hljs-number">1</span>, {
    <span class="hljs-attr">scale</span>: <span class="hljs-string">"-=0.5"</span>,
    <span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>
}, <span class="hljs-number">2</span>);</code></pre>
<p>这样使用数组，就可以同时选中多个元素。</p>
<p>效果是：</p>
<p><span class="img-wrap"><img data-src="/img/bVwF9n" src="https://static.alili.tech/img/bVwF9n" alt="间隔规律动画" title="间隔规律动画" style="cursor: pointer;"></span></p>
<p>可以看到，每一个元素按照顺序依次执行动画，间隔2s。</p>
<h2 id="articleHeader14">TimelineMax和TweenMax</h2>
<p>如果你觉得还需要一些动画和时间轴的更高级功能（如同一动画间隔重复），可以选择TimelineMax和TweenMax。它们并不需要更多的学习成本，如字面意思所示，TweenMax是TweenLite的升级版，拥有其全部特性，只是增加了一些额外的高级控制。它们的语法完全一致，你可以试试用全局搜索把所有TweenLite替换成TweenMax，不会有任何影响。TimelineMax和TimelineLite的关系也是如此。</p>
<h2 id="articleHeader15">补充信息</h2>
<h3 id="articleHeader16">浏览器兼容性</h3>
<p>可以到IE6（使用jQuery1.x的选择器）。</p>
<p>另外，不要期望在不支持的浏览器上做3d transform动画。</p>
<h3 id="articleHeader17">指定默认缓动</h3>
<p>如果你大部分动画都使用同一种缓动函数，那么用<code>TweenLite.defaultEase</code>会很方便，比如修改为<code>Expo.easeOut</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.defaultEase = Expo.easeOut;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">TweenLite.defaultEase = Expo.easeOut;</code></pre>
<h3 id="articleHeader18">动画结束后清空style属性</h3>
<p>默认情况下，执行过动画的元素会留下<code>style</code>的内联样式，如果你担心这可能造成额外影响，可以设定<code>clearProps</code>参数清空它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TweenLite.to(&quot;#ball1&quot;, 2, {
    x: 200,
    clearProps: &quot;all&quot;,
    autoAlpha: 0
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">TweenLite.to(<span class="hljs-string">"#ball1"</span>, <span class="hljs-number">2</span>, {
    <span class="hljs-attr">x</span>: <span class="hljs-number">200</span>,
    <span class="hljs-attr">clearProps</span>: <span class="hljs-string">"all"</span>,
    <span class="hljs-attr">autoAlpha</span>: <span class="hljs-number">0</span>
});</code></pre>
<p>如果只需要清理个别样式，单独写出来即可，如<code>clearProps: "opacity"</code>。</p>
<h3 id="articleHeader19">autoAlpha的作用</h3>
<p>前文反复用到的<code>autoAlpha</code>并不是css属性，而是GSAP给定的一个特殊属性。<code>autoAlpha</code>是<code>opacity</code>和<code>visibility</code>这2个css属性的结合。</p>
<p>为什么要结合起来呢？一般来说，<code>opacity</code>为<code>0</code>的不可见元素，我们会认为它也是不可交互的（比如<code>onclick</code>不触发），因此附加<code>visibility: hidden</code>可以保证这一点。GSAP会正确处理动画过程中这2个css属性的变化。</p>
<h3 id="articleHeader20">备忘单</h3>
<p>GSAP有一份包含丰富参考代码的<a href="https://ihatetomatoes.net/greensock-cheat-sheet/" rel="nofollow noreferrer" target="_blank">备忘单</a>（Cheat Sheet），可以帮助你节约时间。</p>
<h2 id="articleHeader21">结语</h2>
<p>GSAP里的很多概念和API设计可以追溯到flash时代。虽然flash在今天已经很少被使用，但“flash动画”一词能够深入人心是有它的原因的。</p>
<p>GSAP是专业动画库，在大部分情况下，它也具备更好的动画性能。如果你打算在网页里制作一个动画大片，那你现在应该知道什么可以帮助你了 :) 。</p>
<p>（重新编辑自我的博客，原文地址：<a href="http://acgtofe.com/posts/2016/05/gsap-for-animation-pro" rel="nofollow noreferrer" target="_blank">http://acgtofe.com/posts/2016/05/gsap-for-animation-pro</a>）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
GSAP - 专业的 Web 动画库

## 原文链接
[https://segmentfault.com/a/1190000005366176](https://segmentfault.com/a/1190000005366176)

