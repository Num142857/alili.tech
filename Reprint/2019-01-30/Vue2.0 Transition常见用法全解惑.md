---
title: 'Vue2.0 Transition常见用法全解惑' 
date: 2019-01-30 2:30:23
hidden: true
slug: ikumg4afi7
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue2.0的过渡系统（transition）有了很大的改变，想把1.0的项目迁移到2.0，着实需要费一些功夫，今天我就要把vue2.0的过渡系统的用法搞清楚，因为之前确实踩了不少坑。这里只涉及单元素/组件的过渡实现，<a href="http://cn.vuejs.org/v2/guide/transitions.html#" rel="nofollow noreferrer" target="_blank">vue2.0的文档</a>中还讲到了初始渲染的过渡、多个元素的过渡、多个组件的过渡和列表过渡，他们的过渡效果实现方式和单元素/组件的类似，我感觉实际项目中用的不太多吧，有兴趣的同学可以去了解一下，文档这里说的多个元素和多个组件<strong>和我们的理解可能不太一样</strong>，一定要仔细阅读文档，搞清楚到底说的是什么样的情况。</p>
<h1 id="articleHeader0">什么是过渡</h1>
<p>Vue只有在插入，更新或者移除DOM元素时才会应用过渡效果，过渡效果的应用可以通过不同方式实现，官方文档中提到了如下几种：</p>
<ol>
<li><p>在CSS过渡和动画中自动应用class；</p></li>
<li><p>配合使用第三方的CSS动画库，如Animate.css；</p></li>
<li><p>在过渡钩子函数中使用JavaScript直接操作DOM；</p></li>
<li><p>配合使用第三方JavaScript动画库，如Velocity；</p></li>
</ol>
<p>上面四种方式其实主要就是两种，一个是利用CSS过渡或者动画，另一个是利用JavaScript钩子函数。</p>
<h2 id="articleHeader1">怎么应用过渡到元素/组件上</h2>
<p>要想使元素或者组件应用到我们所写的过渡动画，需要使用vue提供的transition来封装组件成为过渡组件，transition需要与如下情景中的任一种一起使用：</p>
<ul>
<li><p>v-if（条件渲染）</p></li>
<li><p>v-show（条件展示）</p></li>
<li><p>动态组件</p></li>
<li><p>在组建的根节点上，并且被vue实例DOM方法触发，如appendTo方法把组件添加到某个根节点上</p></li>
</ul>
<p>当需要插入或者删除封装成过渡元素的元素时，vue将做如下事情：</p>
<ol>
<li><p>查找目标元素是否有CSS过渡或者动画，如果有就在适当的时候进行处理；</p></li>
<li><p>如果过渡组件设置了JavaScript钩子函数，vue会在相应阶段调用钩子函数；</p></li>
<li><p>如果以上两者都没有，DOM操作（插入或者删除）就在下一帧立即执行。</p></li>
</ol>
<h1 id="articleHeader2">CSS过渡</h1>
<p>先举一个典型的CSS过渡的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 首先将要过渡的元素用transition包裹，并设置过渡的name，然后添加触发这个元素过渡的按钮（实际项目中不一定是按钮，任何能触发过渡组件的DOM操作的操作都可以） -->
<div>
  <button @click=&quot;show=!show&quot;>show</button>
  <transition name=&quot;fade&quot;>
    <p v-show=&quot;show&quot;>hello</p>
  </transition>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 首先将要过渡的元素用transition包裹，并设置过渡的name，然后添加触发这个元素过渡的按钮（实际项目中不一定是按钮，任何能触发过渡组件的DOM操作的操作都可以） --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show=!show"</span>&gt;</span>show<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"fade"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"show"</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 接着为过渡类名添加规则
&amp;.fade-enter-active, &amp;.fade-leave-active
  transition: all 0.5s ease     
&amp;.fade-enter, &amp;.fade-leave-active
  opacity: 0 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 接着为过渡类名添加规则</span>
&amp;<span class="hljs-selector-class">.fade-enter-active</span>, &amp;<span class="hljs-selector-class">.fade-leave-active</span>
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.5s</span> ease     
&amp;<span class="hljs-selector-class">.fade-enter</span>, &amp;<span class="hljs-selector-class">.fade-leave-active</span>
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span> </code></pre>
<p>封装上面的代码，就可以实现一个简单的动画了，CSS的transition属性是用来设置过渡总体效果的，具体可参考：<a href="http://www.w3cplus.com/content/css3-transition" rel="nofollow noreferrer" target="_blank">http://www.w3cplus.com/content/css3-transition</a>。</p>
<h2 id="articleHeader3">CSS过渡类名</h2>
<p>组件过渡过程中，会有四个CSS类名进行切换，这四个类名与上面transition的name属性有关，比如name="fade"，会有如下四个CSS类名：</p>
<ol>
<li><p>fade-enter：进入过渡的开始状态，元素被插入时生效，只应用一帧后立即删除；</p></li>
<li><p>fade-enter-active：进入过渡的结束状态，元素被插入时就生效，在过渡过程完成之后移除；</p></li>
<li><p>fade-leave：离开过渡的开始状态，元素被删除时触发，只应用一帧后立即删除；</p></li>
<li><p>fade-leave-active：离开过渡的结束状态，元素被删除时生效，离开过渡完成之后被删除；</p></li>
</ol>
<p>从上面四个类名可以看出，fade-enter-active和fade-leave-active在整个进入或离开过程中都有效，所以CSS的transition属性在这两个类下进行设置。     <br>上面示例中，fade-enter和fade-leave-active类设置CSS为opacity:0，说明过渡刚进入和离开的时候透明度为0，即不显示。当然还可以设置其他的CSS属性，transform属性是除了opacity之外经常在这里被用到的，transform用法可参考<a href="http://www.w3cplus.com/content/css3-transition" rel="nofollow noreferrer" target="_blank">http://www.w3cplus.com/content/css3-transition</a></p>
<h2 id="articleHeader4">CSS动画</h2>
<p>组件过渡的实现不仅可以通过CSS过渡还可以通过CSS动画(animation)实现，建议先了解一下<a href="http://www.w3cplus.com/content/css3-animation" rel="nofollow noreferrer" target="_blank">CSS3 Animation</a>，这里还是给个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <button @click=&quot;show=!show&quot;>show</button>
  <transition name=&quot;fold&quot;>
    <p v-show=&quot;show&quot;>hello</p>
  </transition>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show=!show"</span>&gt;</span>show<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"fold"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"show"</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fold-enter-active {
  animation-name: fold-in;
  animation-duration: .5s;
}
.fold-leave-active {
  animation-name: fold-out;
  animation-duration: .5s;
}
@keyframes fold-in {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  50% {
    transform: translate3d(0, 50%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 50%, 0);
  }
  100% {
    transform: translate3d(0, 100%, 0);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fold-enter-active</span> {
  <span class="hljs-attribute">animation-name</span>: fold-in;
  <span class="hljs-attribute">animation-duration</span>: .<span class="hljs-number">5s</span>;
}
<span class="hljs-selector-class">.fold-leave-active</span> {
  <span class="hljs-attribute">animation-name</span>: fold-out;
  <span class="hljs-attribute">animation-duration</span>: .<span class="hljs-number">5s</span>;
}
@<span class="hljs-keyword">keyframes</span> fold-in {
  0% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 100%, 0);
  }
  50% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 50%, 0);
  }
  100% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
  }
}
@<span class="hljs-keyword">keyframes</span> fold-out {
  0% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
  }
  50% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 50%, 0);
  }
  100% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 100%, 0);
  }
}</code></pre>
<p>如果预先了解了CSS动画（上面给了链接），上面代码还是很好理解的，要注意的是CSS动画中，fold-enter类名在节点插入DOM后不会立即删除，而是在animationed事件触发时删除。</p>
<h2 id="articleHeader5">自定义过渡类名</h2>
<p>上面的四个过渡类名都是根据transition的name属性自动生成的，那么能否自己定义这四个类名呢？答案是可以的，通过enter-class、enter-active-class、leave-class、leave-active-class这四个特性来定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <button @click=&quot;show=!show&quot;>show</button>
  <transition 
    name=&quot;fade&quot;
    enter-class=&quot;fade-in-enter&quot;
    enter-active-class=&quot;fade-in-active&quot;
    leave-class=&quot;fade-out-enter&quot;
    leave-active-class=&quot;fade-out-active&quot;
  >
    <p v-show=&quot;show&quot;>hello</p>
  </transition>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show=!show"</span>&gt;</span>show<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> 
    <span class="hljs-attr">name</span>=<span class="hljs-string">"fade"</span>
    <span class="hljs-attr">enter-class</span>=<span class="hljs-string">"fade-in-enter"</span>
    <span class="hljs-attr">enter-active-class</span>=<span class="hljs-string">"fade-in-active"</span>
    <span class="hljs-attr">leave-class</span>=<span class="hljs-string">"fade-out-enter"</span>
    <span class="hljs-attr">leave-active-class</span>=<span class="hljs-string">"fade-out-active"</span>
  &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"show"</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&amp;.fade-in-active, &amp;.fade-out-active
  transition: all 0.5s ease     
&amp;.fade-in-enter, &amp;.fade-out-active
  opacity: 0 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&amp;<span class="hljs-selector-class">.fade-in-active</span>, &amp;<span class="hljs-selector-class">.fade-out-active</span>
  <span class="hljs-attribute">transition</span>: all <span class="hljs-number">0.5s</span> ease     
&amp;<span class="hljs-selector-class">.fade-in-enter</span>, &amp;<span class="hljs-selector-class">.fade-out-active</span>
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span> </code></pre>
<p>上面代码中，原来默认的fade-enter类对应fade-in-enter，fade-enter-active类对应fade-in-active，依次类推。</p>
<h1 id="articleHeader6">JavaScript钩子函数</h1>
<p>除了用CSS过渡的动画来实现vue的组件过渡，还可以用JavaScript的钩子函数来实现，在钩子函数中直接操作DOM。我们可以在属性中声明以下钩子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition
  v-on:before-enter=&quot;beforeEnter&quot;
  v-on:enter=&quot;enter&quot;
  v-on:after-enter=&quot;afterEnter&quot;
  v-on:enter-cancelled=&quot;enterCancelled&quot;
  v-on:before-leave=&quot;beforeLeave&quot;
  v-on:leave=&quot;leave&quot;
  v-on:after-leave=&quot;afterLeave&quot;
  v-on:leave-cancelled=&quot;leaveCancelled&quot;
>
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">transition</span>
  <span class="hljs-attr">v-on:before-enter</span>=<span class="hljs-string">"beforeEnter"</span>
  <span class="hljs-attr">v-on:enter</span>=<span class="hljs-string">"enter"</span>
  <span class="hljs-attr">v-on:after-enter</span>=<span class="hljs-string">"afterEnter"</span>
  <span class="hljs-attr">v-on:enter-cancelled</span>=<span class="hljs-string">"enterCancelled"</span>
  <span class="hljs-attr">v-on:before-leave</span>=<span class="hljs-string">"beforeLeave"</span>
  <span class="hljs-attr">v-on:leave</span>=<span class="hljs-string">"leave"</span>
  <span class="hljs-attr">v-on:after-leave</span>=<span class="hljs-string">"afterLeave"</span>
  <span class="hljs-attr">v-on:leave-cancelled</span>=<span class="hljs-string">"leaveCancelled"</span>
&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
  // 过渡进入
  // 设置过渡进入之前的组件状态
  beforeEnter: function (el) {
    // ...
  },
  // 设置过渡进入完成时的组件状态
  enter: function (el, done) {
    // ...
    done()
  },
  // 设置过渡进入完成之后的组件状态
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },
  // 过渡离开
  // 设置过渡离开之前的组件状态
  beforeLeave: function (el) {
    // ...
  },
  // 设置过渡离开完成时地组件状态
  leave: function (el, done) {
    // ...
    done()
  },
  // 设置过渡离开完成之后的组件状态
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">methods: {
  <span class="hljs-comment">// 过渡进入</span>
  <span class="hljs-comment">// 设置过渡进入之前的组件状态</span>
  beforeEnter: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
    <span class="hljs-comment">// ...</span>
  },
  <span class="hljs-comment">// 设置过渡进入完成时的组件状态</span>
  enter: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, done</span>) </span>{
    <span class="hljs-comment">// ...</span>
    done()
  },
  <span class="hljs-comment">// 设置过渡进入完成之后的组件状态</span>
  afterEnter: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
    <span class="hljs-comment">// ...</span>
  },
  <span class="hljs-attr">enterCancelled</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
    <span class="hljs-comment">// ...</span>
  },
  <span class="hljs-comment">// 过渡离开</span>
  <span class="hljs-comment">// 设置过渡离开之前的组件状态</span>
  beforeLeave: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
    <span class="hljs-comment">// ...</span>
  },
  <span class="hljs-comment">// 设置过渡离开完成时地组件状态</span>
  leave: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, done</span>) </span>{
    <span class="hljs-comment">// ...</span>
    done()
  },
  <span class="hljs-comment">// 设置过渡离开完成之后的组件状态</span>
  afterLeave: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
    <span class="hljs-comment">// ...</span>
  },
  <span class="hljs-comment">// leaveCancelled 只用于 v-show 中</span>
  leaveCancelled: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el</span>) </span>{
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<p>上面的钩子函数中可以进行任何你想做的DOM操作。    <br><strong>小技巧</strong>：如果你只想设置组件过渡进入的效果而不想有组件过渡离开的效果，这时你就可以用钩子函数，只设置beforeEnter、enter、afterEnter这几个钩子函数就可以了。</p>
<p>目前接触到的关于vue transition相关的就这么多了，当然vue transition的用法可不止这么点，这需要我以后的慢慢积累。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0 Transition常见用法全解惑

## 原文链接
[https://segmentfault.com/a/1190000007738518](https://segmentfault.com/a/1190000007738518)

