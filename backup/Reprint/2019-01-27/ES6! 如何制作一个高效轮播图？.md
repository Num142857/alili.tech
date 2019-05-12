---
title: 'ES6! 如何制作一个高效轮播图？' 
date: 2019-01-27 2:30:59
hidden: true
slug: vsnaqjrizb
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVIHHG?w=1800&amp;h=770" src="https://static.alili.tech/img/bVIHHG?w=1800&amp;h=770" alt="Make a lún'bō'tú works" title="Make a lún'bō'tú works" style="cursor: pointer; display: inline;"></span></p>
<p>轮播图千种万种，怎样才能做出符合要求的轮播图？原理上天入地，如何优化才能达到极限丝滑？本文作者将解答这一切，通过现场制作一个轮播图，带你详细了解、理解，制作 <strong>All</strong> kinds of 高性能轮播图 ！</p>
<p>仿自 Google Play</p>
<p>不过，在事实上，轮播图的点击率通常都很低，很少能引起用户的注意，而却往往占用了页面某个极重要的位置。你的网站真的需要一个轮播图吗？轻轻问自己三声，谷歌一下对轮播图效果的相关调查和建议，再决定是否要着手制作你的轮播图。</p>
<p><strong>2017.8.20 更新</strong>——————————<br><strong>1.</strong> 代码简洁化 &amp; 语言精简<br><strong>2.</strong> 删去不被推荐的有限部分<br><strong>3.</strong> API 重写</p>
<p><strong>! ES6 API 重写</strong><br>ES6 啊，，牛逼啊！我TM要火啊！！<br>然而并没有。</p>
<h2 id="articleHeader0">开始</h2>
<p><strong>1. 结构</strong></p>
<p><code>div.father</code>包裹图片。<code>div.viewport</code>为视口部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;viewport&quot; id=&quot;example&quot;>
  <div class=&quot;father&quot;>
    <div>A</div><!-- 1 -->
    <div>B</div>
    <div>C</div><!-- 3 -->
    <div>D</div>
    <div>E</div><!-- 5 -->
  </div>
  <div class=&quot;mother&quot;>左</div>
  <div class=&quot;mother&quot;>右</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"father"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!-- 1 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>C<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!-- 3 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>D<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>E<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!-- 5 --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mother"</span>&gt;</span>左<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mother"</span>&gt;</span>右<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".viewport {
  width: 900px;
  height: 300px;
  overflow: hidden;
  position: relative;
}
.father {
  height: inherit;
  width: 3000%; /* 子元素 float 无法撑开 */
  transform: translate3d(0, 0, 0);
  transition: transform 0.3s ease-in-out;
}
.father > div {
  width: 550px;
  height: inherit;
  float: left;
}
.mother {
  width: 30px;
  height: inherit;
  line-height: 300px;
  text-align: center;
  cursor: pointer;
  user-select:none;
  background: rgba(0,0,0,0.15);
  position: absolute;top: 0;
} .mother.left { left: 0 } .mother.right { right: 0 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.viewport</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">900px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.father</span> {
  <span class="hljs-attribute">height</span>: inherit;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">3000%</span>; <span class="hljs-comment">/* 子元素 float 无法撑开 */</span>
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
  <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">0.3s</span> ease-in-out;
}
<span class="hljs-selector-class">.father</span> &gt; <span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">550px</span>;
  <span class="hljs-attribute">height</span>: inherit;
  <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.mother</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">height</span>: inherit;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">cursor</span>: pointer;
  <span class="hljs-attribute">user-select</span>:none;
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0,0,0,0.15);
  <span class="hljs-attribute">position</span>: absolute;<span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
} <span class="hljs-selector-class">.mother</span><span class="hljs-selector-class">.left</span> { <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span> } <span class="hljs-selector-class">.mother</span><span class="hljs-selector-class">.right</span> { <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span> }</code></pre>
<p><code>transform: translate3d()</code>使用 GPU 加速。</p>
<p><strong>2. 代码实现</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Lunbo {
  constructor(element) {
    this.viewport = element;
    this.father = element.children[0];
    this.photos = this.father.children;
    // 自设的图片宽, 包括 margin
    this.photoWidth = this.photos[0].offsetWidth + parseInt(getComputedStyle(this.photos[0]).marginLeft) + parseInt(getComputedStyle(this.photos[0]).marginRight);

    // 注册移动事件
    element.children[1].addEventListener('click', this.left.bind(this));
    element.children[2].addEventListener('click', this.right.bind(this));
  }

  load() {

  }

  left() {
    this.load(this.showingId - 1);
  }

  right() {
    this.load(this.showingId + 1);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Lunbo</span> </span>{
  <span class="hljs-keyword">constructor</span>(element) {
    <span class="hljs-keyword">this</span>.viewport = element;
    <span class="hljs-keyword">this</span>.father = element.children[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">this</span>.photos = <span class="hljs-keyword">this</span>.father.children;
    <span class="hljs-comment">// 自设的图片宽, 包括 margin</span>
    <span class="hljs-keyword">this</span>.photoWidth = <span class="hljs-keyword">this</span>.photos[<span class="hljs-number">0</span>].offsetWidth + <span class="hljs-built_in">parseInt</span>(getComputedStyle(<span class="hljs-keyword">this</span>.photos[<span class="hljs-number">0</span>]).marginLeft) + <span class="hljs-built_in">parseInt</span>(getComputedStyle(<span class="hljs-keyword">this</span>.photos[<span class="hljs-number">0</span>]).marginRight);

    <span class="hljs-comment">// 注册移动事件</span>
    element.children[<span class="hljs-number">1</span>].addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.left.bind(<span class="hljs-keyword">this</span>));
    element.children[<span class="hljs-number">2</span>].addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.right.bind(<span class="hljs-keyword">this</span>));
  }

  load() {

  }

  left() {
    <span class="hljs-keyword">this</span>.load(<span class="hljs-keyword">this</span>.showingId - <span class="hljs-number">1</span>);
  }

  right() {
    <span class="hljs-keyword">this</span>.load(<span class="hljs-keyword">this</span>.showingId + <span class="hljs-number">1</span>);
  }
}</code></pre>
<ol>
<li>
<strong>页面加载时</strong>：选取一张作为焦点<br><strong>切换时</strong>：<code>fatherGo(to)</code>负责跳转到指定的焦点图；</li>
<li>
<strong>高效 &amp; 无限</strong>轮播</li>
</ol>
<p>（此处以下所有代码仅显示添加 / 修改部分）<br>思路也是难点。一题，这样解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Lunbo {
  constructor(element) {
    // (可视宽 -焦点图片宽) / 2，焦点图到视口左或右的距离
    this.partnerWidth = (this.viewport.clientWidth - this.photoWidth) / 2;
  }

  // 计算移动距离
  countX(id) {
    return -id * this.photoWidth + this.partnerWidth;
  }

  // 切换 / 载入 / 移动图片。无参数则除法求整，仅用来切换到一个瞎选的初始焦点
  load(newId = parseInt(this.photos.length / 2) - 1) {
    this.father.style.transform = `translate3d(${this.countX(newId)}px, 0, 0)`;
    this.showingId = newId;
  }
}
// 切换至初始焦点
const Example = new Lunbo(document.getElementById(&quot;example&quot;));
Example.load();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Lunbo</span> </span>{
  <span class="hljs-keyword">constructor</span>(element) {
    <span class="hljs-comment">// (可视宽 -焦点图片宽) / 2，焦点图到视口左或右的距离</span>
    <span class="hljs-keyword">this</span>.partnerWidth = (<span class="hljs-keyword">this</span>.viewport.clientWidth - <span class="hljs-keyword">this</span>.photoWidth) / <span class="hljs-number">2</span>;
  }

  <span class="hljs-comment">// 计算移动距离</span>
  countX(id) {
    <span class="hljs-keyword">return</span> -id * <span class="hljs-keyword">this</span>.photoWidth + <span class="hljs-keyword">this</span>.partnerWidth;
  }

  <span class="hljs-comment">// 切换 / 载入 / 移动图片。无参数则除法求整，仅用来切换到一个瞎选的初始焦点</span>
  load(newId = <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.photos.length / <span class="hljs-number">2</span>) - <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">this</span>.father.style.transform = <span class="hljs-string">`translate3d(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.countX(newId)}</span>px, 0, 0)`</span>;
    <span class="hljs-keyword">this</span>.showingId = newId;
  }
}
<span class="hljs-comment">// 切换至初始焦点</span>
<span class="hljs-keyword">const</span> Example = <span class="hljs-keyword">new</span> Lunbo(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"example"</span>));
Example.load();</code></pre>
<p><strong><code>countX(id)</code> 解释：</strong></p>
<p>若将 Id = 2 对应图片（第 3 张）作焦点，向左挪过去两张（此时该图靠最左），后加回<code>partnerWidth</code></p>
<p>二题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;father&quot; id=&quot;father&quot;>
  <div>A</div><div>B</div><div>C</div><div>D</div><div>E</div>

  <div>A</div>
  <div>B</div>
  <div>C</div>
  <div>D</div>
  <div>E</div>

  <div>A</div><div>B</div><div>C</div><div>D</div><div>E</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"father"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"father"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>C<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>D<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>E<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>C<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>D<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>E<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>C<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>D<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>E<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>三倍于展示图，JS 动态生成亦可。称之三个块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".moving { transition: none }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.moving</span> { <span class="hljs-attribute">transition</span>: none }</code></pre>
<p>在<strong>接近</strong>块间距时<strong>关闭动画</strong>移至另一块相应位置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Lunbo {
  constructor(element) {
    // 表示接近边缘的图片 Id。接近左边缘的即第2 张图，右边缘的则为倒数第二张
    this.closeLeftId = 1;
    this.closeRightId = this.photos.length - 2;

    this.photosQuantity = this.photos.length / 3;

    // 当运动到上面两个 Id 时默默移动到的对应 Id
    // 接近左边时跳转到右边块的第二张
    // 接近右边则跳转到左边块的倒数第二张
    this.backLeftId = this.photosQuantity - 2;
    this.backRightId = this.photosQuantity * 2 + 1;
  }

  load(newId = parseInt(this.photos.length / 2) - 1) {
    this.father.style.transform = `translate3d(${this.countX(newId)}px, 0, 0)`;

    if (newId === this.closeLeftId){
      newId = this.backRightId;
    } else if (newId === this.closeRightId){
      newId = this.backLeftId;
    } else {
      this.showingId = newId;
      return;
    }
    this.father.addEventListener('transitionend', this.backMove.bind(this, newId), {once: true});
  }

  backMove(newId) {
    this.father.classList.add(&quot;moving&quot;);
    this.father.clientWidth();
    this.father.style.transform = `translate3d(${this.countX(newId)}px, 0, 0)`;
    this.father.clientWidth();
    this.father.classList.remove(&quot;moving&quot;);
    this.showingId = newId;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Lunbo</span> </span>{
  <span class="hljs-keyword">constructor</span>(element) {
    <span class="hljs-comment">// 表示接近边缘的图片 Id。接近左边缘的即第2 张图，右边缘的则为倒数第二张</span>
    <span class="hljs-keyword">this</span>.closeLeftId = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">this</span>.closeRightId = <span class="hljs-keyword">this</span>.photos.length - <span class="hljs-number">2</span>;

    <span class="hljs-keyword">this</span>.photosQuantity = <span class="hljs-keyword">this</span>.photos.length / <span class="hljs-number">3</span>;

    <span class="hljs-comment">// 当运动到上面两个 Id 时默默移动到的对应 Id</span>
    <span class="hljs-comment">// 接近左边时跳转到右边块的第二张</span>
    <span class="hljs-comment">// 接近右边则跳转到左边块的倒数第二张</span>
    <span class="hljs-keyword">this</span>.backLeftId = <span class="hljs-keyword">this</span>.photosQuantity - <span class="hljs-number">2</span>;
    <span class="hljs-keyword">this</span>.backRightId = <span class="hljs-keyword">this</span>.photosQuantity * <span class="hljs-number">2</span> + <span class="hljs-number">1</span>;
  }

  load(newId = <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.photos.length / <span class="hljs-number">2</span>) - <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">this</span>.father.style.transform = <span class="hljs-string">`translate3d(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.countX(newId)}</span>px, 0, 0)`</span>;

    <span class="hljs-keyword">if</span> (newId === <span class="hljs-keyword">this</span>.closeLeftId){
      newId = <span class="hljs-keyword">this</span>.backRightId;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (newId === <span class="hljs-keyword">this</span>.closeRightId){
      newId = <span class="hljs-keyword">this</span>.backLeftId;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.showingId = newId;
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">this</span>.father.addEventListener(<span class="hljs-string">'transitionend'</span>, <span class="hljs-keyword">this</span>.backMove.bind(<span class="hljs-keyword">this</span>, newId), {<span class="hljs-attr">once</span>: <span class="hljs-literal">true</span>});
  }

  backMove(newId) {
    <span class="hljs-keyword">this</span>.father.classList.add(<span class="hljs-string">"moving"</span>);
    <span class="hljs-keyword">this</span>.father.clientWidth();
    <span class="hljs-keyword">this</span>.father.style.transform = <span class="hljs-string">`translate3d(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.countX(newId)}</span>px, 0, 0)`</span>;
    <span class="hljs-keyword">this</span>.father.clientWidth();
    <span class="hljs-keyword">this</span>.father.classList.remove(<span class="hljs-string">"moving"</span>);
    <span class="hljs-keyword">this</span>.showingId = newId;
  }
}</code></pre>
<p><strong>4. 整理代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html><html><head>
<title>17.8.20</title>
<style>
html,body { height: 100% }
.viewport {
  width: 900px;height: 300px;
  overflow: hidden;
  position: relative;
}
.father {
  height: inherit;
  width: 3000%;
  transform: translate3d(0, 0, 0);
  transition: transform 0.3s ease-in-out;
} .father.moving { transition: none }
.father > div {
  width: 550px;height: inherit;background: #aaa;
  float: left;
}
.mother {
  width: 30px;
  height: inherit;
  line-height: 300px;
  text-align: center;
  cursor: pointer;
  user-select:none;
  background: rgba(0,0,0,0.15);
  position: absolute;top: 0;
} .mother.left { left: 0 } .mother.right { right: 0 }
</style></head><body>
<div class=&quot;viewport&quot; id=&quot;example&quot;>
  <div class=&quot;father&quot;>
    <div>A</div><div>B</div><div>C</div><div>D</div><div>E</div>

    <div>A</div>
    <div>B</div>
    <div>C</div>
    <div>D</div>
    <div>E</div>

    <div>A</div><div>B</div><div>C</div><div>D</div><div>E</div>
  </div>
  <div class=&quot;mother left&quot;>左</div>
  <div class=&quot;mother right&quot;>右</div>
</div>
<script>
class Lunbo {
  constructor(element) {
    this.viewport = element;
    this.father = element.children[0];
    this.photos = this.father.children;
    // 自设的图片宽, 包括 margin
    this.photoWidth = this.photos[0].offsetWidth + parseInt(getComputedStyle(this.photos[0]).marginLeft) + parseInt(getComputedStyle(this.photos[0]).marginRight);

    // (可视宽 -焦点图片宽) / 2，焦点图到视口左或右的距离
    this.partnerWidth = (this.viewport.clientWidth - this.photoWidth) / 2;

    // 表示接近边缘的图片 Id。接近左边缘的即第2 张图，右边缘的则为倒数第二张
    this.closeLeftId = 1;
    this.closeRightId = this.photos.length - 2;

    this.photosQuantity = this.photos.length / 3;

    // 当运动到上面两个 Id 时默默移动到的对应 Id
    // 接近左边时跳转到右边块的第二张
    // 接近右边则跳转到左边块的倒数第二张
    this.backLeftId = this.photosQuantity - 2;
    this.backRightId = this.photosQuantity * 2 + 1;

    // 注册移动事件
    element.children[1].addEventListener('click', this.left.bind(this));
    element.children[2].addEventListener('click', this.right.bind(this));
  }

  // 计算移动距离
  countX(id) {
    return -id * this.photoWidth + this.partnerWidth;
  }

  // 切换 / 载入 / 移动图片。无参数则除法求整，仅用来切换到一个瞎选的初始焦点
  load(newId = parseInt(this.photos.length / 2) - 1) {
    this.father.style.transform = `translate3d(${this.countX(newId)}px, 0, 0)`;

    if (newId === this.closeLeftId){
      newId = this.backRightId;
    } else if (newId === this.closeRightId){
      newId = this.backLeftId;
    } else {
      this.showingId = newId;
      return;
    }
    this.father.addEventListener('transitionend', this.backMove.bind(this, newId), {once: true});
  }

  backMove(newId) {
    this.father.classList.add(&quot;moving&quot;);
    this.father.style.transform = `translate3d(${this.countX(newId)}px, 0, 0)`;

    this.father.clientWidth;

    this.father.classList.remove(&quot;moving&quot;);
    this.showingId = newId;
  }

  left() {
    this.load(this.showingId - 1);
  }

  right() {
    this.load(this.showingId + 1);
  }
}

// 切换至初始焦点
const Example = new Lunbo(document.getElementById(&quot;example&quot;));
Example.load();
</script></body></html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>17.8.20<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span> { <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span> }
<span class="hljs-selector-class">.viewport</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">900px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.father</span> {
  <span class="hljs-attribute">height</span>: inherit;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">3000%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
  <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">0.3s</span> ease-in-out;
} <span class="hljs-selector-class">.father</span><span class="hljs-selector-class">.moving</span> { <span class="hljs-attribute">transition</span>: none }
<span class="hljs-selector-class">.father</span> &gt; <span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">550px</span>;<span class="hljs-attribute">height</span>: inherit;<span class="hljs-attribute">background</span>: <span class="hljs-number">#aaa</span>;
  <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.mother</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
  <span class="hljs-attribute">height</span>: inherit;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">300px</span>;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">cursor</span>: pointer;
  <span class="hljs-attribute">user-select</span>:none;
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(0,0,0,0.15);
  <span class="hljs-attribute">position</span>: absolute;<span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
} <span class="hljs-selector-class">.mother</span><span class="hljs-selector-class">.left</span> { <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span> } <span class="hljs-selector-class">.mother</span><span class="hljs-selector-class">.right</span> { <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span> }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"father"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>C<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>D<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>E<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>C<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>D<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>E<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>A<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>B<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>C<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>D<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>E<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mother left"</span>&gt;</span>左<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mother right"</span>&gt;</span>右<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Lunbo</span> </span>{
  <span class="hljs-keyword">constructor</span>(element) {
    <span class="hljs-keyword">this</span>.viewport = element;
    <span class="hljs-keyword">this</span>.father = element.children[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">this</span>.photos = <span class="hljs-keyword">this</span>.father.children;
    <span class="hljs-comment">// 自设的图片宽, 包括 margin</span>
    <span class="hljs-keyword">this</span>.photoWidth = <span class="hljs-keyword">this</span>.photos[<span class="hljs-number">0</span>].offsetWidth + <span class="hljs-built_in">parseInt</span>(getComputedStyle(<span class="hljs-keyword">this</span>.photos[<span class="hljs-number">0</span>]).marginLeft) + <span class="hljs-built_in">parseInt</span>(getComputedStyle(<span class="hljs-keyword">this</span>.photos[<span class="hljs-number">0</span>]).marginRight);

    <span class="hljs-comment">// (可视宽 -焦点图片宽) / 2，焦点图到视口左或右的距离</span>
    <span class="hljs-keyword">this</span>.partnerWidth = (<span class="hljs-keyword">this</span>.viewport.clientWidth - <span class="hljs-keyword">this</span>.photoWidth) / <span class="hljs-number">2</span>;

    <span class="hljs-comment">// 表示接近边缘的图片 Id。接近左边缘的即第2 张图，右边缘的则为倒数第二张</span>
    <span class="hljs-keyword">this</span>.closeLeftId = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">this</span>.closeRightId = <span class="hljs-keyword">this</span>.photos.length - <span class="hljs-number">2</span>;

    <span class="hljs-keyword">this</span>.photosQuantity = <span class="hljs-keyword">this</span>.photos.length / <span class="hljs-number">3</span>;

    <span class="hljs-comment">// 当运动到上面两个 Id 时默默移动到的对应 Id</span>
    <span class="hljs-comment">// 接近左边时跳转到右边块的第二张</span>
    <span class="hljs-comment">// 接近右边则跳转到左边块的倒数第二张</span>
    <span class="hljs-keyword">this</span>.backLeftId = <span class="hljs-keyword">this</span>.photosQuantity - <span class="hljs-number">2</span>;
    <span class="hljs-keyword">this</span>.backRightId = <span class="hljs-keyword">this</span>.photosQuantity * <span class="hljs-number">2</span> + <span class="hljs-number">1</span>;

    <span class="hljs-comment">// 注册移动事件</span>
    element.children[<span class="hljs-number">1</span>].addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.left.bind(<span class="hljs-keyword">this</span>));
    element.children[<span class="hljs-number">2</span>].addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">this</span>.right.bind(<span class="hljs-keyword">this</span>));
  }

  <span class="hljs-comment">// 计算移动距离</span>
  countX(id) {
    <span class="hljs-keyword">return</span> -id * <span class="hljs-keyword">this</span>.photoWidth + <span class="hljs-keyword">this</span>.partnerWidth;
  }

  <span class="hljs-comment">// 切换 / 载入 / 移动图片。无参数则除法求整，仅用来切换到一个瞎选的初始焦点</span>
  load(newId = <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.photos.length / <span class="hljs-number">2</span>) - <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">this</span>.father.style.transform = <span class="hljs-string">`translate3d(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.countX(newId)}</span>px, 0, 0)`</span>;

    <span class="hljs-keyword">if</span> (newId === <span class="hljs-keyword">this</span>.closeLeftId){
      newId = <span class="hljs-keyword">this</span>.backRightId;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (newId === <span class="hljs-keyword">this</span>.closeRightId){
      newId = <span class="hljs-keyword">this</span>.backLeftId;
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.showingId = newId;
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">this</span>.father.addEventListener(<span class="hljs-string">'transitionend'</span>, <span class="hljs-keyword">this</span>.backMove.bind(<span class="hljs-keyword">this</span>, newId), {<span class="hljs-attr">once</span>: <span class="hljs-literal">true</span>});
  }

  backMove(newId) {
    <span class="hljs-keyword">this</span>.father.classList.add(<span class="hljs-string">"moving"</span>);
    <span class="hljs-keyword">this</span>.father.style.transform = <span class="hljs-string">`translate3d(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.countX(newId)}</span>px, 0, 0)`</span>;

    <span class="hljs-keyword">this</span>.father.clientWidth;

    <span class="hljs-keyword">this</span>.father.classList.remove(<span class="hljs-string">"moving"</span>);
    <span class="hljs-keyword">this</span>.showingId = newId;
  }

  left() {
    <span class="hljs-keyword">this</span>.load(<span class="hljs-keyword">this</span>.showingId - <span class="hljs-number">1</span>);
  }

  right() {
    <span class="hljs-keyword">this</span>.load(<span class="hljs-keyword">this</span>.showingId + <span class="hljs-number">1</span>);
  }
}

<span class="hljs-comment">// 切换至初始焦点</span>
<span class="hljs-keyword">const</span> Example = <span class="hljs-keyword">new</span> Lunbo(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"example"</span>));
Example.load();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>代码已通过测试。你需要码更多的代码，兼容各个浏览器，以及让它可以被更好地维护，然后做得更好（装）看（B）一些。</p>
<h2 id="articleHeader1">高级选项</h2>
<p>一味把<code>&lt;script&gt;</code>放到<code>&lt;/body&gt;</code>前只会<strong>适得其反</strong>——你需要 “加载优化” ；焦点图没有<strong>特别样式</strong>不够突出——你在想 “突出焦点” ；需要给予用户更多<strong>自主选择</strong>——去看看 “位置指示”</p>
<h3 id="articleHeader2">加载优化（重要）</h3>
<p>我们会在页面载入后看到轮播图从第<strong>一</strong>张转到焦点 —— 非常有损体验。可把一部分<code>&lt;script&gt;</code>放到<code>&lt;head&gt;</code>里或轮播图前，阻塞渲染。最好是提前计算 translateX 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;father&quot; id=&quot;father&quot; style=&quot;transform: translate3d(-3125px, 0px, 0px)&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"father"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"father"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"transform: translate3d(-3125px, 0px, 0px)"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>然后删去多余初始移动代码。</p>
<h3 id="articleHeader3">突出焦点</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="焦点 { 放大到110% }
其他 { 半透明;正常大小 }
.focusing { opacity: 1;transform: scale3d(1.1, 1.1, 1) }
.father > div { opacity: 0.4;background: #bbb;transition: inherit; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">焦点 { 放大到110% }
其他 { 半透明;正常大小 }
<span class="hljs-selector-class">.focusing</span> { <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;<span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale3d</span>(1.1, 1.1, 1) }
<span class="hljs-selector-class">.father</span> &gt; <span class="hljs-selector-tag">div</span> { <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.4</span>;<span class="hljs-attribute">background</span>: <span class="hljs-number">#bbb</span>;<span class="hljs-attribute">transition</span>: inherit; }</code></pre>
<p>为<code>Lunbo.load(newId)</code>及<code>backMove(newId)</code>添加‘焦点样式更改’行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Lunbo {
  ...(前后文省略)
  load(newId) {
    ...
    this.photos[showingId].classList.remove(&quot;focusing&quot;);
    this.photos[newId].classList.add(&quot;focusing&quot;);
    ...
  }
  ...
  backMove(newId) {
    this.father.classList.add(&quot;moving&quot;);
    this.photos[newId].classList.add(&quot;focusing&quot;);
    this.father.style.transform = `translate3d(${this.countX(newId)}px, 0, 0)`;

    this.father.clientWidth;

    this.father.classList.remove(&quot;moving&quot;);
    this.photos[showingId].classList.remove(&quot;focusing&quot;);
    this.showingId = newId;
  }
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Lunbo</span> </span>{
  ...(前后文省略)
  load(newId) {
    ...
    this.photos[showingId].classList.remove(<span class="hljs-string">"focusing"</span>);
    <span class="hljs-keyword">this</span>.photos[newId].classList.add(<span class="hljs-string">"focusing"</span>);
    ...
  }
  ...
  backMove(newId) {
    <span class="hljs-keyword">this</span>.father.classList.add(<span class="hljs-string">"moving"</span>);
    <span class="hljs-keyword">this</span>.photos[newId].classList.add(<span class="hljs-string">"focusing"</span>);
    <span class="hljs-keyword">this</span>.father.style.transform = <span class="hljs-string">`translate3d(<span class="hljs-subst">${<span class="hljs-keyword">this</span>.countX(newId)}</span>px, 0, 0)`</span>;

    <span class="hljs-keyword">this</span>.father.clientWidth;

    <span class="hljs-keyword">this</span>.father.classList.remove(<span class="hljs-string">"moving"</span>);
    <span class="hljs-keyword">this</span>.photos[showingId].classList.remove(<span class="hljs-string">"focusing"</span>);
    <span class="hljs-keyword">this</span>.showingId = newId;
  }
  ...
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class = &quot;father&quot; id=&quot;father&quot; style=&quot;transform: translate3d(-3125px, 0px, 0px);&quot;>
  ...
  <div class=&quot;focusing&quot;>..</div><!--提前选择焦点 -->
  ...
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span> = <span class="hljs-string">"father"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"father"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"transform: translate3d(-3125px, 0px, 0px);"</span>&gt;</span>
  ...
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"focusing"</span>&gt;</span>..<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!--提前选择焦点 --&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader4">位置指示 &amp; 切换</h3>
<p>（在更新 ES6 之前，）这里的代码经过了测试。</p>
<p><strong>1. 显示</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".seter {
  width: 400px;height: 20px;
  position: absolute;bottom: 0;left: calc(50% - 200px);
  cursor: pointer;
}
.seter > div {
  width: 80px;height: 28px;
  background: orange;
  float: left;
} .seter > .on { margin-top: -8px;transition: margin 0.5s ease-in-out; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.seter</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">position</span>: absolute;<span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">left</span>: <span class="hljs-built_in">calc</span>(50% - 200px);
  <span class="hljs-attribute">cursor</span>: pointer;
}
<span class="hljs-selector-class">.seter</span> &gt; <span class="hljs-selector-tag">div</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">28px</span>;
  <span class="hljs-attribute">background</span>: orange;
  <span class="hljs-attribute">float</span>: left;
} <span class="hljs-selector-class">.seter</span> &gt; <span class="hljs-selector-class">.on</span> { <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">8px</span>;<span class="hljs-attribute">transition</span>: margin <span class="hljs-number">0.5s</span> ease-in-out; }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;viewport&quot; id=&quot;example&quot;>
  <div class=&quot;father&quot; ...>
    ...
  </div>
  <div class=&quot;mother&quot; id=&quot;left&quot; left>左</div>
  <div class=&quot;mother&quot; id=&quot;right&quot; right>右</div>
  <div class=&quot;seter&quot; id=&quot;seter&quot;>
    <div data-seter-id=&quot;0&quot;></div>
    <div class=&quot;on&quot; data-seter-id=&quot;1&quot;></div>
    <div data-seter-id=&quot;2&quot;></div>
    <div data-seter-id=&quot;3&quot;></div>
    <div data-seter-id=&quot;4&quot;></div>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"example"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"father"</span> <span class="hljs-attr">...</span>&gt;</span>
    ...
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mother"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">left</span>&gt;</span>左<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mother"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">right</span>&gt;</span>右<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"seter"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"seter"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-seter-id</span>=<span class="hljs-string">"0"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"on"</span> <span class="hljs-attr">data-seter-id</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-seter-id</span>=<span class="hljs-string">"2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-seter-id</span>=<span class="hljs-string">"3"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-seter-id</span>=<span class="hljs-string">"4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<ul><li>函数 toSeterId 通过给予的图片 Id 计算对应的 seterId；</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Lunbo {
  constructor(element) {
    ...
    this.seters = element.children[3].children;
    ...

    // 注册移动事件
    ...
    element.children[3].addEventListener('click', function (event) {
      if (!event.target.hasAttribute('data-seter-id')) return;
      this.load(Number(event.target.getAttribute('data-seter-id')));
    }.bind(this))
  }
  ...
  load(newId) {
    ...
    this.seters[this.toSeterId(showingId)].className = '';
    this.seters[this.toSeterId(newId)].className = 'on';
    ...
  }
  ...
  toSeterId(id) {
    let seterId;
    if(id >= this.photosQuantity * 2) {
      seterId = id - 2 * this.photosQuantity;
    } else if(id >= this.photosQuantity) {
      seterId = id - this.photosQuantity;
    }
    return seterId;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Lunbo</span> </span>{
  <span class="hljs-keyword">constructor</span>(element) {
    ...
    this.seters = element.children[<span class="hljs-number">3</span>].children;
    ...

    <span class="hljs-comment">// 注册移动事件</span>
    ...
    element.children[<span class="hljs-number">3</span>].addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
      <span class="hljs-keyword">if</span> (!event.target.hasAttribute(<span class="hljs-string">'data-seter-id'</span>)) <span class="hljs-keyword">return</span>;
      <span class="hljs-keyword">this</span>.load(<span class="hljs-built_in">Number</span>(event.target.getAttribute(<span class="hljs-string">'data-seter-id'</span>)));
    }.bind(<span class="hljs-keyword">this</span>))
  }
  ...
  load(newId) {
    ...
    this.seters[<span class="hljs-keyword">this</span>.toSeterId(showingId)].className = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">this</span>.seters[<span class="hljs-keyword">this</span>.toSeterId(newId)].className = <span class="hljs-string">'on'</span>;
    ...
  }
  ...
  toSeterId(id) {
    <span class="hljs-keyword">let</span> seterId;
    <span class="hljs-keyword">if</span>(id &gt;= <span class="hljs-keyword">this</span>.photosQuantity * <span class="hljs-number">2</span>) {
      seterId = id - <span class="hljs-number">2</span> * <span class="hljs-keyword">this</span>.photosQuantity;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(id &gt;= <span class="hljs-keyword">this</span>.photosQuantity) {
      seterId = id - <span class="hljs-keyword">this</span>.photosQuantity;
    }
    <span class="hljs-keyword">return</span> seterId;
  }
}</code></pre>
<p><strong>2. 可切换</strong></p>
<ul>
<li>每次通过指示切换时先<code>backMove</code>至中间块，后再进行移动；</li>
<li>避免从第一张晃过中间数张至最后一张（最短路径）。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 继上文 “显示” 进一步更改
class Lunbo {
  constructor(element) {
    ...
    this.magicNumber = parseInt(this.photosQuantity / 2);
    ...
    // 注册移动事件
    ...
    element.children[3].addEventListener('click', function (event) {
      if (!event.target.hasAttribute('data-seter-id')) return;

      const newId = Number(event.target.getAttribute('data-seter-id')) + this.photosQuantity;

      // 切换至中间块
      this.backMove(toSeterId(showingId) + this.photosQuantity);

      // 最短路径选择
      if (newId > this.showingId + this.magicNumber) {
        // XXXX则移至左块
        this.load(newId - this.photosQuantity);
      } else if (newId < this.showingId - this.magicNumber) {
        // XXXX则移至右块
        this.load(newId + this.photosQuantity);
      } else {
        // 中间块不变
        this.load(newId);
      }
    }.bind(this))
  }
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 继上文 “显示” 进一步更改</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Lunbo</span> </span>{
  <span class="hljs-keyword">constructor</span>(element) {
    ...
    this.magicNumber = <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.photosQuantity / <span class="hljs-number">2</span>);
    ...
    <span class="hljs-comment">// 注册移动事件</span>
    ...
    element.children[<span class="hljs-number">3</span>].addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
      <span class="hljs-keyword">if</span> (!event.target.hasAttribute(<span class="hljs-string">'data-seter-id'</span>)) <span class="hljs-keyword">return</span>;

      <span class="hljs-keyword">const</span> newId = <span class="hljs-built_in">Number</span>(event.target.getAttribute(<span class="hljs-string">'data-seter-id'</span>)) + <span class="hljs-keyword">this</span>.photosQuantity;

      <span class="hljs-comment">// 切换至中间块</span>
      <span class="hljs-keyword">this</span>.backMove(toSeterId(showingId) + <span class="hljs-keyword">this</span>.photosQuantity);

      <span class="hljs-comment">// 最短路径选择</span>
      <span class="hljs-keyword">if</span> (newId &gt; <span class="hljs-keyword">this</span>.showingId + <span class="hljs-keyword">this</span>.magicNumber) {
        <span class="hljs-comment">// XXXX则移至左块</span>
        <span class="hljs-keyword">this</span>.load(newId - <span class="hljs-keyword">this</span>.photosQuantity);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (newId &lt; <span class="hljs-keyword">this</span>.showingId - <span class="hljs-keyword">this</span>.magicNumber) {
        <span class="hljs-comment">// XXXX则移至右块</span>
        <span class="hljs-keyword">this</span>.load(newId + <span class="hljs-keyword">this</span>.photosQuantity);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 中间块不变</span>
        <span class="hljs-keyword">this</span>.load(newId);
      }
    }.bind(<span class="hljs-keyword">this</span>))
  }
  ...
}</code></pre>
<h3 id="articleHeader5">(°_°ノ)</h3>
<p>我突然知道<strong>为什么越牛的大牛会越越来越牛</strong>了 !!!∑(ﾟДﾟノ)ノ</p>
<p>其实他们本来是想写一个文档来说明，写一个动态图演示给新手的！('▽'〃)</p>
<p>但是……</p>
<p>做完后他们一定会腰酸背痛……(;｀O´)o</p>
<p>// 本文不再更新，除非作者开心</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6! 如何制作一个高效轮播图？

## 原文链接
[https://segmentfault.com/a/1190000008255568](https://segmentfault.com/a/1190000008255568)

