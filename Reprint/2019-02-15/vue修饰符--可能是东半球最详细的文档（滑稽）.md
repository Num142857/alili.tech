---
title: 'vue修饰符--可能是东半球最详细的文档（滑稽）' 
date: 2019-02-15 2:30:44
hidden: true
slug: bts8n6wk8p
categories: [reprint]
---

{{< raw >}}

                    
<p>为了方便大家写代码，vue.js给大家提供了很多方便的修饰符，比如我们经常用到的取消冒泡，阻止默认事件等等~</p>
<h2 id="articleHeader0">目录</h2>
<ul>
<li>表单修饰符</li>
<li>事件修饰符</li>
<li>鼠标按键修饰符</li>
<li>键值修饰符</li>
<li>v-bind修饰符（实在不知道叫啥名字）</li>
</ul>
<h2 id="articleHeader1">表单修饰符</h2>
<p>填写表单，最常用的是什么？input！v-model~而我们的修饰符正是为了简化这些东西而存在的</p>
<ul><li><strong>.lazy</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
   <input type=&quot;text&quot; v-model=&quot;value&quot;>
   <p>"{{"value"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"value"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"value"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiwcG?w=263&amp;h=89" src="https://static.alili.tech/img/bVbiwcG?w=263&amp;h=89" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>从这里我们可以看到，我们还在输入的时候，光标还在的时候，下面的值就已经出来了，可以说是非常地实时。<br>但是有时候我们希望，在我们输入完所有东西，光标离开才更新视图。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
   <input type=&quot;text&quot; v-model.lazy=&quot;value&quot;>
   <p>"{{"value"}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model.lazy</span>=<span class="hljs-string">"value"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"value"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>这样即可~这样只有当我们光标离开输入框的时候，它才会更新视图，相当于在onchange事件触发更新。</p>
<ul><li><strong>.trim</strong></li></ul>
<p>在我们的输入框中，我们经常需要过滤一下一些输入完密码不小心多敲了一下空格的兄弟输入的内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; v-model.trim=&quot;value&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span> v-model.<span class="hljs-keyword">trim</span>=<span class="hljs-string">"value"</span>&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbiwdV?w=353&amp;h=65" src="https://static.alili.tech/img/bVbiwdV?w=353&amp;h=65" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>为了让你更清楚的看到，我改了一下样式，不过问题不大，相信你已经清楚看到这个大大的hello左右两边没有空格，尽管你在input框里敲烂了空格键。<br>需要注意的是，它只能<strong>过滤首尾的空格</strong>！首尾，中间的是不会过滤的</p>
<ul><li><strong>.number</strong></li></ul>
<p>看这个名字就知道，应该是限制输入数字或者输入的东西转换成数字，but不是辣么赶单。</p>
<p><span class="img-wrap"><img data-src="/img/bVbiztt?w=386&amp;h=73" src="https://static.alili.tech/img/bVbiztt?w=386&amp;h=73" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbiztV?w=457&amp;h=55" src="https://static.alili.tech/img/bVbiztV?w=457&amp;h=55" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果你先输入数字，那它就会限制你输入的只能是数字。<br>如果你先输入字符串，那它就相当于没有加.number</p>
<h2 id="articleHeader2">事件修饰符</h2>
<ul><li><strong>.stop</strong></li></ul>
<p>由于事件冒泡的机制，我们给元素绑定点击事件的时候，也会触发父级的点击事件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div @click=&quot;shout(2)&quot;>
  <button @click=&quot;shout(1)&quot;>ok</button>
</div>

//js
shout(e){
  console.log(e)
}
//1
//2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> @click=<span class="hljs-string">"shout(2)"</span>&gt;
  &lt;<span class="hljs-selector-tag">button</span> @click=<span class="hljs-string">"shout(1)"</span>&gt;ok&lt;/button&gt;
&lt;/div&gt;

<span class="hljs-comment">//js</span>
<span class="hljs-function"><span class="hljs-title">shout</span><span class="hljs-params">(e)</span></span>{
  console.log(e)
}
<span class="hljs-comment">//1</span>
<span class="hljs-comment">//2</span></code></pre>
<p>一键阻止事件冒泡，简直方便得不行。相当于调用了event.stopPropagation()方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div @click=&quot;shout(2)&quot;>
  <button @click.stop=&quot;shout(1)&quot;>ok</button>
</div>
//只输出1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> @click=<span class="hljs-string">"shout(2)"</span>&gt;
  &lt;<span class="hljs-selector-tag">button</span> @click.stop=<span class="hljs-string">"shout(1)"</span>&gt;ok&lt;/button&gt;
&lt;/div&gt;
<span class="hljs-comment">//只输出1</span></code></pre>
<ul><li><strong>.prevent</strong></li></ul>
<p>用于阻止事件的默认行为，例如，当点击提交按钮时阻止对表单的提交。相当于调用了event.preventDefault()方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent=&quot;onSubmit&quot;></form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 提交事件不再重载页面 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">v-on:submit.prevent</span>=<span class="hljs-string">"onSubmit"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre>
<p><strong>注意：</strong>修饰符可以同时使用多个,但是可能会因为顺序而有所不同。<br>用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。<br>也就是<strong>从左往右判断~</strong></p>
<ul><li><strong>.self</strong></li></ul>
<p>只当事件是从事件绑定的元素本身触发时才触发回调。像下面所示，刚刚我们从.stop时候知道子元素会冒泡到父元素导致触发父元素的点击事件，当我们加了这个.self以后，我们点击button不会触发父元素的点击事件shout，只有当点击到父元素的时候（蓝色背景）才会shout~从这个self的英文翻译过来就是‘自己，本身’可以看出这个修饰符的用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;blue&quot; @click.self=&quot;shout(2)&quot;>
  <button @click=&quot;shout(1)&quot;>ok</button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"blue"</span> @click.self=<span class="hljs-string">"shout(2)"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"shout(1)"</span>&gt;</span>ok<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbizKd?w=657&amp;h=53" src="https://static.alili.tech/img/bVbizKd?w=657&amp;h=53" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ul><li><strong>.once</strong></li></ul>
<p>这个修饰符的用法也是和名字一样简单粗暴，只能用一次，绑定了事件以后只能触发一次，第二次就不会触发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//键盘按坏都只能shout一次
<button @click.once=&quot;shout(1)&quot;>ok</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code><span class="hljs-comment">//键盘按坏都只能shout一次</span>
&lt;<span class="hljs-keyword">button</span> @click.once=<span class="hljs-string">"shout(1)"</span>&gt;ok&lt;/<span class="hljs-keyword">button</span>&gt;</code></pre>
<ul><li><strong>.capture</strong></li></ul>
<p>从上面我们知道了事件的冒泡，其实完整的事件机制是：捕获阶段--目标阶段--冒泡阶段。<br>默认的呢，是事件触发是从目标开始往上冒泡。<br>当我们加了这个.capture以后呢，我们就反过来了，事件触发从包含这个元素的顶层开始往下触发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <div @click.capture=&quot;shout(1)&quot;>
      obj1
      <div @click.capture=&quot;shout(2)&quot;>
        obj2
        <div @click=&quot;shout(3)&quot;>
          obj3
          <div @click=&quot;shout(4)&quot;>
            obj4
          </div>
        </div>
      </div>
    </div>
    // 1 2 4 3 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>   &lt;<span class="hljs-keyword">div</span> @click.capture=<span class="hljs-string">"shout(1)"</span>&gt;
      obj1
      &lt;<span class="hljs-keyword">div</span> @click.capture=<span class="hljs-string">"shout(2)"</span>&gt;
        obj2
        &lt;<span class="hljs-keyword">div</span> @click=<span class="hljs-string">"shout(3)"</span>&gt;
          obj3
          &lt;<span class="hljs-keyword">div</span> @click=<span class="hljs-string">"shout(4)"</span>&gt;
            obj4
          &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    <span class="hljs-comment">// 1 2 4 3 </span></code></pre>
<p>从上面这个例子我们点击obj4的时候，就可以清楚地看出区别，obj1，obj2在捕获阶段就触发了事件，因此是先1后2，后面的obj3，obj4是默认的冒泡阶段触发，因此是先4然后冒泡到3~</p>
<ul><li><strong>.passive</strong></li></ul>
<p>当我们在监听元素滚动事件的时候，会一直触发onscroll事件，在pc端是没啥问题的，但是在移动端，会让我们的网页变卡，因此我们使用这个修饰符的时候，相当于给onscroll事件整了一个.lazy修饰符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive=&quot;onScroll&quot;>...</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 --&gt;</span>
<span class="hljs-comment">&lt;!-- 而不会等待 `onScroll` 完成  --&gt;</span>
<span class="hljs-comment">&lt;!-- 这其中包含 `event.preventDefault()` 的情况 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-on:scroll.passive</span>=<span class="hljs-string">"onScroll"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<ul><li><strong>.native</strong></li></ul>
<p>我们经常会写很多的小组件，有些小组件可能会绑定一些事件，但是，像下面这样绑定事件是不会触发的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<My-component @click=&quot;shout(3)&quot;></My-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">My-component</span> @<span class="hljs-keyword">click</span>="<span class="hljs-keyword">shout</span>(<span class="hljs-keyword">3</span>)"&gt;&lt;/<span class="hljs-keyword">My</span>-<span class="hljs-keyword">component</span>&gt;</code></pre>
<p>必须使用.native来修饰这个click事件（即&lt;My-component @click.native="shout(3)"&gt;&lt;/My-component&gt;），可以理解为该修饰符的作用就是把一个vue组件转化为一个普通的HTML标签，<br>注意：<strong>使用.native修饰符来操作普通HTML标签是会令事件失效的</strong></p>
<h2 id="articleHeader3">鼠标按钮修饰符</h2>
<p>刚刚我们讲到这个click事件，我们一般是会用左键触发，有时候我们需要更改右键菜单啥的，就需要用到右键点击或者中间键点击，这个时候就要用到鼠标按钮修饰符</p>
<ul>
<li>.left   左键点击</li>
<li>.right  右键点击</li>
<li>.middle 中键点击</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button @click.right=&quot;shout(1)&quot;>ok</button>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>&lt;<span class="hljs-selector-tag">button</span> @<span class="hljs-keyword">click</span>.<span class="hljs-keyword">right</span>="<span class="hljs-keyword">shout</span>(<span class="hljs-keyword">1</span>)"&gt;<span class="hljs-keyword">ok</span>&lt;/<span class="hljs-keyword">button</span>&gt;
</code></pre>
<h2 id="articleHeader4">键值修饰符</h2>
<p>其实这个也算是事件修饰符的一种，因为它都是用来修饰键盘事件的。<br>比如onkeyup，onkeydown啊</p>
<ul><li><strong>.keyCode</strong></li></ul>
<p>如果不用keyCode修饰符，那我们每次按下键盘都会触发shout，当我们想指定按下某一个键才触发这个shout的时候，这个修饰符就有用了，具体键码查看<a href="https://zhidao.baidu.com/question/266291349.html" rel="nofollow noreferrer" target="_blank">键码对应表</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; @keyup.keyCode=&quot;shout(4)&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> <span class="hljs-meta">@keyup</span>.keyCode=<span class="hljs-string">"shout(4)"</span>&gt;</code></pre>
<p>为了方便我们使用，vue给一些常用的键提供了别名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//普通键
.enter 
.tab
.delete //(捕获“删除”和“退格”键)
.space
.esc
.up
.down
.left
.right
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//普通键</span>
<span class="hljs-selector-class">.enter</span> 
<span class="hljs-selector-class">.tab</span>
<span class="hljs-selector-class">.delete</span> <span class="hljs-comment">//(捕获“删除”和“退格”键)</span>
<span class="hljs-selector-class">.space</span>
<span class="hljs-selector-class">.esc</span>
<span class="hljs-selector-class">.up</span>
<span class="hljs-selector-class">.down</span>
<span class="hljs-selector-class">.left</span>
<span class="hljs-selector-class">.right</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//系统修饰键
.ctrl
.alt
.meta
.shift" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//系统修饰键</span>
<span class="hljs-selector-class">.ctrl</span>
<span class="hljs-selector-class">.alt</span>
<span class="hljs-selector-class">.meta</span>
.shift</code></pre>
<p>可以通过全局 config.keyCodes 对象自定义按键修饰符别名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 可以使用 `v-on:keyup.f1`</span>
Vue<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.keyCodes</span><span class="hljs-selector-class">.f1</span> = <span class="hljs-number">112</span></code></pre>
<p>我们从上面看到，键分成了普通常用的键和系统修饰键，区别是什么呢？<br>当我们写如下代码的时候,我们会发现如果<strong>仅仅</strong>使用系统修饰键是无法触发keyup事件的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; @keyup.ctrl=&quot;shout(4)&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> <span class="hljs-meta">@keyup</span>.ctrl=<span class="hljs-string">"shout(4)"</span>&gt;</code></pre>
<p>那该如何呢？我们需要将系统修饰键和其他键码链接起来使用，比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; @keyup.ctrl.67=&quot;shout(4)&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"text"</span> @keyup<span class="hljs-selector-class">.ctrl</span>.<span class="hljs-number">67</span>=<span class="hljs-string">"shout(4)"</span>&gt;</code></pre>
<p>这样当我们同时按下ctrl+c时，就会触发keyup事件。<br>另，如果是鼠标事件，那就可以单独使用系统修饰符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      <button @mouseover.ctrl=&quot;shout(1)&quot;>ok</button>
      <button @mousedown.ctrl=&quot;shout(1)&quot;>ok</button>
      <button @click.ctrl.67=&quot;shout(1)&quot;>ok</button>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>      &lt;<span class="hljs-selector-tag">button</span> @mouseover.ctrl=<span class="hljs-string">"shout(1)"</span>&gt;ok&lt;/button&gt;
      &lt;<span class="hljs-selector-tag">button</span> @mousedown.ctrl=<span class="hljs-string">"shout(1)"</span>&gt;ok&lt;/button&gt;
      &lt;<span class="hljs-selector-tag">button</span> @click<span class="hljs-selector-class">.ctrl</span>.<span class="hljs-number">67</span>=<span class="hljs-string">"shout(1)"</span>&gt;ok&lt;/button&gt;
</code></pre>
<p>大概是什么意思呢，就是你不能<strong>单手指使用系统修饰键的修饰符</strong>（最少两个手指，可以多个）。你可以一个手指按住系统修饰键一个手指按住另外一个键来实现键盘事件。也可以用一个手指按住系统修饰键，另一只手按住鼠标来实现鼠标事件。</p>
<ul><li>
<strong>.exact</strong> (2.5新增)</li></ul>
<p>我们上面说了这个系统修饰键，当我们像这样&lt;button type="text" @click.ctrl="shout(4)"&gt;&lt;/button&gt;绑定了click键按下的事件，惊奇的是，我们同时按下几个系统修饰键，比如ctrl shift点击，也能触发，可能有些场景我们<strong>只需要或者只能</strong>按一个系统修饰键来触发（像制作一些快捷键的时候），而当我们按下ctrl和其他键的时候则无法触发。那就这样写。<br>注意：这个<strong>只是限制系统修饰键</strong>的，像下面这样书写以后你还是可以按下ctrl + c，ctrl+v或者ctrl+普通键 来触发，但是不能按下ctrl + shift +普通键来触发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button type=&quot;text&quot; @click.ctrl.exact=&quot;shout(4)&quot;>ok</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">button</span> type=<span class="hljs-string">"text"</span> @click<span class="hljs-selector-class">.ctrl</span><span class="hljs-selector-class">.exact</span>=<span class="hljs-string">"shout(4)"</span>&gt;ok&lt;/button&gt;</code></pre>
<p>然后下面这个你可以同时按下enter+普通键来触发，但是不能按下系统修饰键+enter来触发。相信你已经能听懂了8~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; @keydown.enter.exact=&quot;shout('我被触发了')&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"text"</span> @keydown<span class="hljs-selector-class">.enter</span><span class="hljs-selector-class">.exact</span>=<span class="hljs-string">"shout('我被触发了')"</span>&gt;</code></pre>
<h2 id="articleHeader5">v-bind修饰符</h2>
<ul><li>
<strong>.sync</strong>(2.3.0+ 新增)</li></ul>
<p>在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以修改父组件，且在父组件和子组件都没有明显的改动来源。我们通常的做法是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//父亲组件
<comp :myMessage=&quot;bar&quot; @update:myMessage=&quot;func&quot;></comp>
//js
func(e){
 this.bar = e;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//父亲组件</span>
&lt;comp :myMessage=<span class="hljs-string">"bar"</span> @update:myMessage=<span class="hljs-string">"func"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span></span>
<span class="hljs-comment">//js</span>
func(e){
 <span class="hljs-keyword">this</span>.bar = e;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//子组件js
func2(){
  this.$emit('update:myMessage',params);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">//子组件js</span>
func2(){
  <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'update:myMessage'</span>,<span class="hljs-keyword">params</span>);
}</code></pre>
<p>现在这个.sync修饰符就是简化了上面的步骤</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//父组件
<comp :myMessage.sync=&quot;bar&quot;></comp> 
//子组件
this.$emit('update:myMessage',params);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//父组件</span>
&lt;comp :myMessage.sync=<span class="hljs-string">"bar"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span></span> 
<span class="hljs-comment">//子组件</span>
<span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'update:myMessage'</span>,params);</code></pre>
<p>这样确实会方便很多，但是也有很多需要<strong>注意</strong>的点</p>
<ol>
<li>使用sync的时候，子组件传递的事件名必须为update:value，其中value必须与子组件中props中声明的名称完全一致(如上例中的myMessage，不能使用my-message)</li>
<li>注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的属性名，类似 v-model。</li>
<li>将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。</li>
</ol>
<ul><li><strong>.prop</strong></li></ul>
<p>要学习这个修饰符，我们首先要搞懂两个东西的区别。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Property：节点对象在内存中存储的属性，可以访问和设置。
Attribute：节点对象的其中一个属性( property )，值是一个对象。
可以通过点访问法 document.getElementById('xx').attributes 或者 document.getElementById('xx').getAttributes('xx') 读取，通过 document.getElementById('xx').setAttribute('xx',value) 新增和修改。
在标签里定义的所有属性包括 HTML 属性和自定义属性都会在 attributes 对象里以键值对的方式存在。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Property</span>：节点对象在内存中存储的属性，可以访问和设置。
<span class="hljs-selector-tag">Attribute</span>：节点对象的其中一个属性( property )，值是一个对象。
可以通过点访问法 <span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(<span class="hljs-string">'xx'</span>)<span class="hljs-selector-class">.attributes</span> 或者 <span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(<span class="hljs-string">'xx'</span>)<span class="hljs-selector-class">.getAttributes</span>(<span class="hljs-string">'xx'</span>) 读取，通过 <span class="hljs-selector-tag">document</span><span class="hljs-selector-class">.getElementById</span>(<span class="hljs-string">'xx'</span>)<span class="hljs-selector-class">.setAttribute</span>(<span class="hljs-string">'xx'</span>,value) 新增和修改。
在标签里定义的所有属性包括 <span class="hljs-selector-tag">HTML</span> 属性和自定义属性都会在 <span class="hljs-selector-tag">attributes</span> 对象里以键值对的方式存在。</code></pre>
<p>其实attribute和property两个单词，翻译出来都是属性，但是《javascript高级程序设计》将它们翻译为特性和属性，以示区分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这里的id,value,style都属于property
//index属于attribute
//id、title等既是属性，也是特性。修改属性，其对应的特性会发生改变；修改特性，属性也会改变
<input id=&quot;uid&quot; title=&quot;title1&quot; value=&quot;1&quot; :index=&quot;index&quot;>
//input.index === undefined
//input.attributes.index === this.index" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>//这里的id,value,style都属于property
//<span class="hljs-built_in">index</span>属于attribute
//id、title等既是属性，也是特性。修改属性，其对应的特性会发生改变；修改特性，属性也会改变
&lt;<span class="hljs-built_in">input</span> id=<span class="hljs-string">"uid"</span> title=<span class="hljs-string">"title1"</span> value=<span class="hljs-string">"1"</span> :<span class="hljs-built_in">index</span>=<span class="hljs-string">"index"</span>&gt;
//<span class="hljs-built_in">input</span>.<span class="hljs-built_in">index</span> === undefined
//<span class="hljs-built_in">input</span>.attributes.<span class="hljs-built_in">index</span> === this.<span class="hljs-built_in">index</span></code></pre>
<p>从上面我们可以看到如果直接使用v-bind绑定，则默认会绑定到dom节点的attribute。<br>为了</p>
<ul>
<li>通过自定义属性存储变量，避免暴露数据</li>
<li>防止污染 HTML 结构</li>
</ul>
<p>我们可以使用这个修饰符，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input id=&quot;uid&quot; title=&quot;title1&quot; value=&quot;1&quot; :index.prop=&quot;index&quot;>
//input.index === this.index
//input.attributes.index === undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>&lt;<span class="hljs-built_in">input</span> id=<span class="hljs-string">"uid"</span> title=<span class="hljs-string">"title1"</span> value=<span class="hljs-string">"1"</span> :<span class="hljs-built_in">index</span>.prop=<span class="hljs-string">"index"</span>&gt;
//<span class="hljs-built_in">input</span>.<span class="hljs-built_in">index</span> === this.<span class="hljs-built_in">index</span>
//<span class="hljs-built_in">input</span>.attributes.<span class="hljs-built_in">index</span> === undefined</code></pre>
<ul><li><strong>.camel</strong></li></ul>
<p>由于HTML 特性是不区分大小写的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg :viewBox=&quot;viewBox&quot;></svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;svg <span class="hljs-symbol">:viewBox=<span class="hljs-string">"viewBox"</span>&gt;&lt;/svg&gt;</span></code></pre>
<p>实际上会渲染为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg viewbox=&quot;viewBox&quot;></svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">viewbox</span>=<span class="hljs-string">"viewBox"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<p>这将导致渲染失败，因为 SVG 标签只认 viewBox，却不知道 viewbox 是什么。<br>如果我们使用.camel修饰符，那它就会被渲染为驼峰名。<br>另，如果你使用字符串模版，则没有这些限制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  template: '<svg :viewBox=&quot;viewBox&quot;></svg>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">template</span>: <span class="hljs-string">'&lt;svg :viewBox="viewBox"&gt;&lt;/svg&gt;'</span>
})</code></pre>
<h2 id="articleHeader6">最后</h2>
<p>不知道有没有漏的，如果有漏的麻烦在评论区告知一声，有建议或者意见也可以提一下，谢谢~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue修饰符--可能是东半球最详细的文档（滑稽）

## 原文链接
[https://segmentfault.com/a/1190000016786254](https://segmentfault.com/a/1190000016786254)

