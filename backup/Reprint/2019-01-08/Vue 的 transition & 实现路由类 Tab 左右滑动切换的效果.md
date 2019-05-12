---
title: 'Vue 的 transition & 实现路由类 Tab 左右滑动切换的效果' 
date: 2019-01-08 2:30:11
hidden: true
slug: p7nhrib8zno
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue 的 transition &amp; 实现路由类 Tab 左右滑动切换的效果</h2>
<p>先说下 transition 为什么可以让你定义了 v-enter, v-enter-active 之后就可以触发transition.<br>实际过程按我的理解应该是这样:</p>
<ol>
<li><p>最开始的时候, 先给元素加上了 v-enter, v-enter-active 两个class</p></li>
<li><p>在下一帧的时候, 删掉 v-enter 这个class.</p></li>
<li><p>在过渡结束之后, 再删掉 v-enter-active.</p></li>
</ol>
<p>对于2的解释:</p>
<ul>
<li><p>这个帧的概念我刚开始没理解, 但是实际上可以理解成 '一段时间之后';</p></li>
<li><p>你删掉 v-enter 会导致什么情况?<br>  元素的样式会变化</p></li>
</ul>
<p>那么元素现在只有定义在自己身上的样式了<br>  所以要变回去<br>  然后发现有定义在 v-enter-active 上面的过渡效果<br>  就会应用过渡效果</p>
<p>复盘一下过程: <br>刚开始的时候, 元素有自己的样式, 有 v-enter, v-enter-active 中定义的样式. <br>在一段时间间隔, 比如说 100ms 之后, 删掉了 v-enter, 意味着元素的样式变化。<br>变化, 然后发现存在 transition的定义, 就应用 transition, <br>这就形成了我们最终看见的 transition效果.</p>
<p>给个demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
  height: 100px;
  width: 100px;
  background: red;
}
.v-enter {
  height: 200px;
  width: 200px;
}
.v-enter-active {
  transition: all 2s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: red;
}
<span class="hljs-selector-class">.v-enter</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
}
<span class="hljs-selector-class">.v-enter-active</span> {
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">2s</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var box = document.querySelector('.box');

    box.classList.add('v-enter');
    box.classList.add('v-enter-active');

    setTimeout(function(){
      box.classList.remove('v-enter');
    }, 100);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.box'</span>);

    box.classList.add(<span class="hljs-string">'v-enter'</span>);
    box.classList.add(<span class="hljs-string">'v-enter-active'</span>);

    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      box.classList.remove(<span class="hljs-string">'v-enter'</span>);
    }, <span class="hljs-number">100</span>);</code></pre>
<p>再说下元素从显示到消失的时候<br>我们知道, 如果过渡效果的终点是 display:none, 那么过渡效果是不会生效的, 所以我觉得 <br>v-if, v-show 对过渡效果都是有所控制的, 它们应该是在 transitionEnd 的时候才去应用<br>display:none; 或者移除元素.</p>
<p>但是元素离开和元素进入还有点不一样:</p>
<p>你的元素在离开的时候, 元素是已经存在于页面上, 是你已经能看见的<br>然后你给它加上 v-leave, v-leave-active<br>按照之前的逻辑, v-leave 有样式, v-leave-active 里面有 transition<br>元素的样式变更-&gt; 触发 transition, 所以加上就直接触发 transition, 还等个什么下一帧。<br>既然加上就触发 transition, 那你要 v-leave 干嘛, 为什么不直接把<br>样式和 transition 都加在 v-leave-active 上面呢。</p>
<p>暂时没有发现 v-leave 的作用, 感觉不是必须的, 就是对称一样. 或者为了样式分离. </p>
<p>transition 过渡效果的样式实际上是有通用规律的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".v-enter {
  opacity:0;
}
.v-enter-active {
  transition: all 1s;
}
.v-leave-active {
  opacity: 0;
  transition: all 1s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.v-enter</span> {
  <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.v-enter-active</span> {
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span>;
}
<span class="hljs-selector-class">.v-leave-active</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span>;
}</code></pre>
<p>更常见的写法是这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".v-enter {
  opacity:0;
}
.v-enter-active, .v-leave-active {
  transition: all 1s;
}
.v-leave-active {
  opacity: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.v-enter</span> {
  <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.v-enter-active</span>, <span class="hljs-selector-class">.v-leave-active</span> {
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span>;
}
<span class="hljs-selector-class">.v-leave-active</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}</code></pre>
<h2 id="articleHeader1">关于 transition 的一个应用: 实现路由 类 Tab 左右滑动切换的效果.</h2>
<p>类 Tab 左右滑动切换的效果,就是这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      [viewport]
      [router1]   [router2]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>      [viewport]
      [router1]   [router2]
</code></pre>
<p>router1,2 左右拉来拉去, 就是左右滑动切换的效果.</p>
<p>那我们的问题就可以变成:<br>把当前的路由 router1, 和下一个路由 router2, 并列放到一行, <br>用户点击跳转的的时候, 同时滑动 router1,router2</p>
<p>但是直觉都告诉我们, 路由压根就不是这么排列的, 当你在 router1 的时候, router2 根本就不存在啊.<br>不存在何来并排. </p>
<p>但是想想我们之前说的, 加上 transition 之后, 元素消失会怎么办?<br>元素先应用 transition, transitionEnd 的时候, 元素才会消失.</p>
<p>这个的意思就是说:<br>跳转的一瞬间, 当前的 route1 会开始应用 transition, 还没有消失于页面之上.<br>然后下一个 router2 已经创建, 已经存在于页面之上. <br>此时, 两个 router 都是存在的.</p>
<p>这就是时机.<br>先说下我们的 DOM 结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <transition>
      <router-view></router-view>
    <transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span>&gt;</span></code></pre>
<ol><li><p>我们要先让两个 router 并排, how ?<br>定位啊:</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".router-view {
  position: absolute;
  top: 0;
  left: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.router-view</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>按理说两个 router 都是 left:0, top:0, 应该是重叠的是不是?<br>对.<br>所以我们对要进入的那个 router 做下 translate<br>比如当前的是 router1, 点击要向前跳转到 router2, 那么对 router2 translateX(100%);<br>这样两个 router 是不是就并排了.</p>
<p>并排之后就是动起来, 也就是应用滑动效果.<br>两个组件都是被 transition 包裹起来所以只要定义相应的class就可以了.</p>
<p>先说向前进:<br>假设 transition 的 name = 'slide-forward'</p>
<p>对于 router1:<br>start: 是当前的位置<br>end:   是当前位置的 translateX(-100%), 也就是当前位置的左边.</p>
<p>对于 router2:<br>start: 是相对于当前位置的 translateX(100%);<br>end: 是当前位置.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// router1
.slide-forward-leave-active {
  transition: all 1s;
  transform: translate(-100%);
}
// router2
.v-enter {
  transform: translateX(100%);
}
.v-enter-active {
  transition: all 1s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">// <span class="hljs-selector-tag">router1</span>
<span class="hljs-selector-class">.slide-forward-leave-active</span> {
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-100%);
}
// <span class="hljs-selector-tag">router2</span>
<span class="hljs-selector-class">.v-enter</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(100%);
}
<span class="hljs-selector-class">.v-enter-active</span> {
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span>;
}</code></pre>
<p>再说后退, 设 transition 的 name = 'slide-back';<br>class就是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// router1
.v-enter {
  transfrom: translateX(-100%);
}
// router2
.v-enter-active {
  transition: all 1s;
}
.v-leave-active {
  transfrom: translateX(100%);
  transition: all 1s;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">// <span class="hljs-selector-tag">router1</span>
<span class="hljs-selector-class">.v-enter</span> {
  <span class="hljs-attribute">transfrom</span>: <span class="hljs-built_in">translateX</span>(-100%);
}
// <span class="hljs-selector-tag">router2</span>
<span class="hljs-selector-class">.v-enter-active</span> {
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span>;
}
<span class="hljs-selector-class">.v-leave-active</span> {
  <span class="hljs-attribute">transfrom</span>: <span class="hljs-built_in">translateX</span>(100%);
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span>;
}</code></pre>
<p>整理一下, 得到的两个 transition,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".slide-forward-enter {
  transform: translate(100%);
}
.slide-forward-enter-active {
  transition: all 1s ease-in-out;
}
.slide-forward-leave-active {
  transform: translate(-100%);
  transition: all  1s ease-in-out;
}


.slide-back-enter {
  transform: translate(-100%);
}
.slide-back-enter-active {
  transition: all 1s ease-in-out;
}
.slide-back-leave-active {
  transform: translate(100%);
  transition: all  1s ease-in-out;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.slide-forward-enter</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(100%);
}
<span class="hljs-selector-class">.slide-forward-enter-active</span> {
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> ease-in-out;
}
<span class="hljs-selector-class">.slide-forward-leave-active</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-100%);
  <span class="hljs-attribute">transition</span>: all  <span class="hljs-number">1s</span> ease-in-out;
}


<span class="hljs-selector-class">.slide-back-enter</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-100%);
}
<span class="hljs-selector-class">.slide-back-enter-active</span> {
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> ease-in-out;
}
<span class="hljs-selector-class">.slide-back-leave-active</span> {
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(100%);
  <span class="hljs-attribute">transition</span>: all  <span class="hljs-number">1s</span> ease-in-out;
}</code></pre>
<p>现在再讨论一下: 我们该如何判断当前是前进还是后退呢?<br>下面这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  watch: {  
    '$route' (to, from) {  
      if (!this.map[to.path]) {
        this.map[to.path] = +new Date() + 1;
      }
      if (!this.map[from.path]) {
        this.map[from.path] = +new Date();
      }

      if (this.map[to.path] > this.map[from.path]) {
        this.transitionName = 'slide-forward';
      } else {
        this.transitionName = 'slide-back'
      } 
    }  
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  watch: {  
    <span class="hljs-string">'$route'</span> (to, <span class="hljs-keyword">from</span>) {  
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.map[to.path]) {
        <span class="hljs-keyword">this</span>.map[to.path] = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() + <span class="hljs-number">1</span>;
      }
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.map[<span class="hljs-keyword">from</span>.path]) {
        <span class="hljs-keyword">this</span>.map[<span class="hljs-keyword">from</span>.path] = +<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
      }

      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.map[to.path] &gt; <span class="hljs-keyword">this</span>.map[<span class="hljs-keyword">from</span>.path]) {
        <span class="hljs-keyword">this</span>.transitionName = <span class="hljs-string">'slide-forward'</span>;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.transitionName = <span class="hljs-string">'slide-back'</span>
      } 
    }  
  }</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 的 transition & 实现路由类 Tab 左右滑动切换的效果

## 原文链接
[https://segmentfault.com/a/1190000010194832](https://segmentfault.com/a/1190000010194832)

