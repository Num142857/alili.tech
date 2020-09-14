---
title: 'JParticles 2.0 发布，打造炫酷的粒子特效' 
date: 2019-01-13 2:30:11
hidden: true
slug: 6dnfjv0dzyb
categories: [reprint]
---

{{< raw >}}

                    
<p>JParticles 2.0 发布，打造炫酷的粒子特效。<br>不好意思哈，在这么繁花似锦的世界里，标题不得不取得吸引眼球一点哈，<br>不然...还是不啰嗦了，我们进入正题吧<span class="img-wrap"><img data-src="/img/bVOSVB?w=23&amp;h=23" src="https://static.alili.tech/img/bVOSVB?w=23&amp;h=23" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">简单介绍一下</h3>
<p><code>JParticles 2.0</code> 版本之前还叫 <code>Particleground.js</code>，相信在用的朋友应该不会陌生，关于 <code>1.x</code> 版本的宣传文案可以移步看<a href="https://segmentfault.com/a/1190000007171179">这里</a>哈，或许可以帮助你了解 <code>JParticles 2.0</code> 的一些东西。</p>
<h3 id="articleHeader1">我们一贯的理念</h3>
<p>我们（我/笑哭）一贯的理念是信仰：<code>"The Write Less, Do More"</code> 和 <code>"Keep It Simple And Stupid"</code>。<br>希望插件工具什么的使用起来非常的简单便捷，上手快，不耽误人们宝贵的时间，尤其是在变化迅速的前端，<br>希望我们的 <code>代码写得简洁，简单，易懂</code>，<code>API设计的简洁，简单，易用</code>， 最后 <code>强大，易扩展</code>！</p>
<h3 id="articleHeader2">此次版本更新日志</h3>
<p>看看我们这次版本更新了哪些东西吧，biubiu...贴图：</p>
<p><span class="img-wrap"><img data-src="/img/bVOSXV?w=542&amp;h=413" src="https://static.alili.tech/img/bVOSXV?w=542&amp;h=413" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>貌似挺多的，主要我们还是只讲三点吧，剩下的可以看<a href="https://jparticles.js.org/" rel="nofollow noreferrer" target="_blank">官网</a>慢慢了解，哈哈。</p>
<h3 id="articleHeader3">第一点：视差粒子</h3>
<p><a href="https://codepen.io/barrior/pen/gRbrLw" rel="nofollow noreferrer" target="_blank">https://codepen.io/barrior/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="barrior/pen/gRbrLw" data-typeid="3">点击预览</button></p>
<p>几行 <code>JavaScript</code> 代码：</p>
<blockquote><p>为了看起来更简洁，定义视差粒子层数的属性就省略了，因为本身它就是 <code>3</code> 层，也挺好的。<br>CodePen 演示四层，为了让大家能更了解属性的使用方法。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new JParticles.particle('#demo', {
  // 开启视差效果
  parallax: true,
  
  // 定义视差强度
  parallaxStrength: 1
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">new</span> JParticles.particle(<span class="hljs-string">'#demo'</span>, {
  <span class="hljs-comment">// 开启视差效果</span>
  parallax: <span class="hljs-literal">true</span>,
  
  <span class="hljs-comment">// 定义视差强度</span>
  parallaxStrength: <span class="hljs-number">1</span>
});</code></pre>
<p>是不是好少...少到想哭有木有，但是很酷炫~</p>
<h3 id="articleHeader4">第二点：模拟语音搜索</h3>
<blockquote><p>学习于京东APP的搜索，上图：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVOTbw?w=582&amp;h=1036" src="https://static.alili.tech/img/bVOTbw?w=582&amp;h=1036" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://codepen.io/barrior/pen/VWwPxx" rel="nofollow noreferrer" target="_blank">https://codepen.io/barrior/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="barrior/pen/VWwPxx" data-typeid="3">点击预览</button></p>
<p>上  <code>JavaScript</code> 代码：</p>
<blockquote><p>如果你使用过 <code>1.x</code>, 相信你对 <code>wave</code> 的参数配置很理解，<br>我们删除了之前的旧方法 <code>setOffsetTop()</code>，添加了新方法：<code>setOptions()</code>，<br>这个方法就更加强大与自由了，可以控制更多的属性的变化，达到我们想要的效果。<br>这里我们主要的控制就是这个方法了，只是按住这个自定义事件是用户自己的行为，<br>所以这里贴上自定义代码把我们简洁的 <code>API</code>，弄的好像很复杂了一样，冤枉~<br>其实一共就两处，见下面标注。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var settings = {
  crestHeight: [10, 14, 18],
  speed: .1
};

// 这里是第 ① 处
// JParticles.utils.extend 等同于 jQuery.extend，你也可以使用 Object.assign 替代。
var effect = new JParticles.wave('.instance .demo', JParticles.utils.extend({
  num: 3,
  lineColor: ['#e53d27', '#42e527', '#27C9E5'],
  lineWidth: [.7, .9, 1],
  offsetTop: .65,
  rippleNum: 2
}, settings));

// 线条波动效果
document.querySelector('.voice').onmousedown = function () {
  clearInterval(this.timer);
  this.timer = setInterval(function () {
    var crestHeight = settings.crestHeight.map(function (item) {

      // 获取随机波动值
      item += JParticles.utils.limitRandom(20, -20);

      // 处理 (0, 1) 之间的值为整数
      if (item < 1 &amp;&amp; item > 0) {
        item = Math.ceil(item);
      }

      return item;
    });

    // 这里是第 ② 处
    // 通过 setOptions() 来控制线条的波动
    effect.setOptions({
      crestHeight: crestHeight,
      speed: [.2, .14, .1]
    });
  }, 100);

  // 复原
  var self = this;
  document.onmouseup = function () {
    document.onmouseup = null;
    clearInterval(self.timer);
    effect.setOptions(settings);
  };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> settings = {
  <span class="hljs-attr">crestHeight</span>: [<span class="hljs-number">10</span>, <span class="hljs-number">14</span>, <span class="hljs-number">18</span>],
  <span class="hljs-attr">speed</span>: <span class="hljs-number">.1</span>
};

<span class="hljs-comment">// 这里是第 ① 处</span>
<span class="hljs-comment">// JParticles.utils.extend 等同于 jQuery.extend，你也可以使用 Object.assign 替代。</span>
<span class="hljs-keyword">var</span> effect = <span class="hljs-keyword">new</span> JParticles.wave(<span class="hljs-string">'.instance .demo'</span>, JParticles.utils.extend({
  <span class="hljs-attr">num</span>: <span class="hljs-number">3</span>,
  <span class="hljs-attr">lineColor</span>: [<span class="hljs-string">'#e53d27'</span>, <span class="hljs-string">'#42e527'</span>, <span class="hljs-string">'#27C9E5'</span>],
  <span class="hljs-attr">lineWidth</span>: [<span class="hljs-number">.7</span>, <span class="hljs-number">.9</span>, <span class="hljs-number">1</span>],
  <span class="hljs-attr">offsetTop</span>: <span class="hljs-number">.65</span>,
  <span class="hljs-attr">rippleNum</span>: <span class="hljs-number">2</span>
}, settings));

<span class="hljs-comment">// 线条波动效果</span>
<span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.voice'</span>).onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  clearInterval(<span class="hljs-keyword">this</span>.timer);
  <span class="hljs-keyword">this</span>.timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> crestHeight = settings.crestHeight.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{

      <span class="hljs-comment">// 获取随机波动值</span>
      item += JParticles.utils.limitRandom(<span class="hljs-number">20</span>, <span class="hljs-number">-20</span>);

      <span class="hljs-comment">// 处理 (0, 1) 之间的值为整数</span>
      <span class="hljs-keyword">if</span> (item &lt; <span class="hljs-number">1</span> &amp;&amp; item &gt; <span class="hljs-number">0</span>) {
        item = <span class="hljs-built_in">Math</span>.ceil(item);
      }

      <span class="hljs-keyword">return</span> item;
    });

    <span class="hljs-comment">// 这里是第 ② 处</span>
    <span class="hljs-comment">// 通过 setOptions() 来控制线条的波动</span>
    effect.setOptions({
      <span class="hljs-attr">crestHeight</span>: crestHeight,
      <span class="hljs-attr">speed</span>: [<span class="hljs-number">.2</span>, <span class="hljs-number">.14</span>, <span class="hljs-number">.1</span>]
    });
  }, <span class="hljs-number">100</span>);

  <span class="hljs-comment">// 复原</span>
  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
  <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">document</span>.onmouseup = <span class="hljs-literal">null</span>;
    clearInterval(self.timer);
    effect.setOptions(settings);
  };
};</code></pre>
<h3 id="articleHeader5">第三点：waveLoading 模拟进度条加载</h3>
<blockquote><p>这是一个封装好的，简单易用的模拟加载进度条动画。</p></blockquote>
<p><code>1.x</code> 版本是通过 <code>wave</code> 这个波浪运动来手写加载进度条的内容，并不是很方便，参数的控制也麻烦，<br>于是 <code>2.0</code> 着重封装了这个模拟加载进度条的动画，这个特效在单页应用首次加载什么的还是很需要的吧。<br>又高大上，又可以缓解加载的等待心情。</p>
<p>现在就来看看是怎么简单的使用这个功能特效吧，我们以加载 <code>baidu.com</code> 首页为示例，貌似其他的不允许 <code>iframe</code> 加载:</p>
<p><a href="https://codepen.io/barrior/pen/xrxqVz" rel="nofollow noreferrer" target="_blank">https://codepen.io/barrior/pe...</a><button class="btn btn-xs btn-default ml10 preview" data-url="barrior/pen/xrxqVz" data-typeid="3">点击预览</button></p>
<p>简单的 <code>JavaScript</code> 代码（CodePen 的代码是有对细节进行调整，而核心内容就是下面这么简单）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var demo = document.querySelector('.demo');

// 生成 loading 动画
var loading = new JParticles.waveLoading(demo);

// 当你告诉 loading 加载完了，loading 就加载结束，并触发这个事件
loading.onFinished(function () {
    
    // 这时，你就可以删除 loading 动画了，让页面显示出来
    demo.parentNode.removeChild(demo);
});

// 加载完，告诉 loading 加载完了，让 loading 结束
// 因为这是模拟进度条，所以你得告诉 loading，它才知道页面此时已经加载完了
window.onload = function () {
    loading.done();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> demo = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.demo'</span>);

<span class="hljs-comment">// 生成 loading 动画</span>
<span class="hljs-keyword">var</span> loading = <span class="hljs-keyword">new</span> JParticles.waveLoading(demo);

<span class="hljs-comment">// 当你告诉 loading 加载完了，loading 就加载结束，并触发这个事件</span>
loading.onFinished(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    
    <span class="hljs-comment">// 这时，你就可以删除 loading 动画了，让页面显示出来</span>
    demo.parentNode.removeChild(demo);
});

<span class="hljs-comment">// 加载完，告诉 loading 加载完了，让 loading 结束</span>
<span class="hljs-comment">// 因为这是模拟进度条，所以你得告诉 loading，它才知道页面此时已经加载完了</span>
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    loading.done();
};</code></pre>
<h3 id="articleHeader6">致歉</h3>
<p>这个还是得致歉，之前承诺的会在新版<code>增加QQ登录背景效果（Delaunay三角的实现）</code>，由于时间也挺赶的，<br>现在还没研究出<code>Delaunay三角的实现</code>，当然其实也可以用等研究好三角函数做出效果来了再发，但是这样就耽误的新版的发布，还不如先把能用的发出来，先用着能用的，后续再慢慢添加其他有意思的东西进来。<br>此处，对看过更新日志并满怀期待的同志表示深深的歉意！</p>
<h3 id="articleHeader7">最后</h3>
<p>官网（我想这应该是一个非常棒的文档，因为很用心在写）：<a href="https://jparticles.js.org/" rel="nofollow noreferrer" target="_blank">jparticles.js.org</a><br>如果你喜欢这个插件库并能帮助到你的实际工作中，希望它能发展的更好，提供更多有趣实用的特效，支持作者，烦请点个 <a href="https://github.com/Barrior/JParticles" rel="nofollow noreferrer" target="_blank">Star</a> O(∩_∩)O谢谢~。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JParticles 2.0 发布，打造炫酷的粒子特效

## 原文链接
[https://segmentfault.com/a/1190000009707074](https://segmentfault.com/a/1190000009707074)

