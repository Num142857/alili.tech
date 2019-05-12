---
title: 'Vue 过渡实现轮播图' 
date: 2019-01-18 2:30:34
hidden: true
slug: 3j5xlr2k1lo
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue 过渡实现轮播图</h1>
<h2 id="articleHeader1">Vue 过渡</h2>
<p>Vue 的过渡系统是内置的，在元素从 DOM 中插入或移除时自动应用过渡效果。</p>
<p>过渡的实现要在目标元素上使用 transition 属性，具体实现参考<a href="https://cn.vuejs.org/v2/guide/transitions.html" rel="nofollow noreferrer" target="_blank">Vue2 过渡</a></p>
<p>下面例子中我们用到<a href="https://cn.vuejs.org/v2/guide/transitions.html#" rel="nofollow noreferrer" target="_blank">列表过渡</a>，可以先学习一下官方的例子</p>
<p>要同时渲染整个列表，比如使用 v-for，我们需要用到 &lt;transition-group&gt; 组件</p>
<h2 id="articleHeader2">Vue 轮播图</h2>
<p><a href="https://codepen.io/koucxz/pen/vxVGMG" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="koucxz/pen/vxVGMG" data-typeid="3">点击预览</button><br>我们先看这样一个列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <li v-for=&quot;list in slideList&quot;>
    <img :src=&quot;list.image&quot; :alt=&quot;list.desc&quot;>
  </li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"list in slideList"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"list.image"</span> <span class="hljs-attr">:alt</span>=<span class="hljs-string">"list.desc"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
</code></pre>
<p>这个列表要从实例(见文章末尾)中获取了三张图片，要使其中的图片产生轮播，我们需要用 &lt;transition-group&gt; 组件替换其中的 ul 标签，从而实现过渡组件的功能，完整的组件 DOM 内容如下，下面分段解释一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;carousel-wrap&quot; id=&quot;carousel&quot;>
    // 轮播图列表
    <transition-group tag=&quot;ul&quot; class='slide-ul' name=&quot;list&quot;>
      <li v-for=&quot;(list,index) in slideList&quot; :key=&quot;index&quot; v-show=&quot;index===currentIndex&quot; @mouseenter=&quot;stop&quot; @mouseleave=&quot;go&quot;>
        <a :href=&quot;list.clickUrl&quot; >
          <img :src=&quot;list.image&quot; :alt=&quot;list.desc&quot;>
        </a>
      </li>
    </transition-group>
    // 轮播图位置指示
    <div class=&quot;carousel-items&quot;>
      <span v-for=&quot;(item,index) in slideList.length&quot; :class=&quot;{'active':index===currentIndex}&quot; @mouseover=&quot;change(index)&quot;></span>
    </div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"carousel-wrap"</span> id=<span class="hljs-string">"carousel"</span>&gt;
    <span class="hljs-comment">// 轮播图列表</span>
    &lt;<span class="hljs-attribute">transition</span>-group tag=<span class="hljs-string">"ul"</span> class=<span class="hljs-string">'slide-ul'</span> name=<span class="hljs-string">"list"</span>&gt;
      &lt;<span class="hljs-selector-tag">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(list,index) in slideList"</span> :key=<span class="hljs-string">"index"</span> v-show=<span class="hljs-string">"index===currentIndex"</span> @mouseenter=<span class="hljs-string">"stop"</span> @mouseleave=<span class="hljs-string">"go"</span>&gt;
        &lt;<span class="hljs-selector-tag">a</span> :href=<span class="hljs-string">"list.clickUrl"</span> &gt;
          &lt;<span class="hljs-selector-tag">img</span> :src=<span class="hljs-string">"list.image"</span> :alt=<span class="hljs-string">"list.desc"</span>&gt;
        &lt;/a&gt;
      &lt;/li&gt;
    &lt;/<span class="hljs-attribute">transition</span>-group&gt;
    <span class="hljs-comment">// 轮播图位置指示</span>
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"carousel-items"</span>&gt;
      &lt;<span class="hljs-selector-tag">span</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item,index) in slideList.length"</span> :class=<span class="hljs-string">"{'active':index===currentIndex}"</span> @mouseover=<span class="hljs-string">"change(index)"</span>&gt;&lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre>
<p>对应的数据结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
data: {
    slideList: [
        {
            &quot;clickUrl&quot;: &quot;#&quot;,
            &quot;desc&quot;: &quot;nhwc&quot;,
            &quot;image&quot;: &quot;http://dummyimage.com/1745x492/f1d65b&quot;
        },
        {
            &quot;clickUrl&quot;: &quot;#&quot;,
            &quot;desc&quot;: &quot;hxrj&quot;,
            &quot;image&quot;: &quot;http://dummyimage.com/1745x492/40b7ea&quot;
        },
        {
            &quot;clickUrl&quot;: &quot;#&quot;,
            &quot;desc&quot;: &quot;rsdh&quot;,
            &quot;image&quot;: &quot;http://dummyimage.com/1745x492/e3c933&quot;
        }
    ],
    currentIndex: 0,
    timer: ''
},
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>
data: {
    slideList: [
        {
            <span class="hljs-string">"clickUrl"</span>: <span class="hljs-string">"#"</span>,
            <span class="hljs-string">"desc"</span>: <span class="hljs-string">"nhwc"</span>,
            <span class="hljs-string">"image"</span>: <span class="hljs-string">"http://dummyimage.com/1745x492/f1d65b"</span>
        },
        {
            <span class="hljs-string">"clickUrl"</span>: <span class="hljs-string">"#"</span>,
            <span class="hljs-string">"desc"</span>: <span class="hljs-string">"hxrj"</span>,
            <span class="hljs-string">"image"</span>: <span class="hljs-string">"http://dummyimage.com/1745x492/40b7ea"</span>
        },
        {
            <span class="hljs-string">"clickUrl"</span>: <span class="hljs-string">"#"</span>,
            <span class="hljs-string">"desc"</span>: <span class="hljs-string">"rsdh"</span>,
            <span class="hljs-string">"image"</span>: <span class="hljs-string">"http://dummyimage.com/1745x492/e3c933"</span>
        }
    ],
    currentIndex: <span class="hljs-number">0</span>,
    timer: <span class="hljs-string">''</span>
},
    </code></pre>
<p>在使用 v-for 时，应给对应的元素绑定一个 key 属性，相当于 index 标识，在 &lt;transition-group&gt; 组件中，key 是必须的，这样一个轮播图的 DOM 结构就完成了</p>
<p>接下来我们看看轮播函数的实现，再来看组件中的 li 元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<li v-for=&quot;(list,index) in slideList&quot; :key=&quot;index&quot;>
    <a :href=&quot;list.clickUrl&quot; >
      <img :src=&quot;list.image&quot; :alt=&quot;list.desc&quot;>
    </a>
</li>
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
&lt;<span class="hljs-selector-tag">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(list,index) in slideList"</span> :key=<span class="hljs-string">"index"</span>&gt;
    &lt;<span class="hljs-selector-tag">a</span> :href=<span class="hljs-string">"list.clickUrl"</span> &gt;
      &lt;<span class="hljs-selector-tag">img</span> :src=<span class="hljs-string">"list.image"</span> :alt=<span class="hljs-string">"list.desc"</span>&gt;
    &lt;/a&gt;
&lt;/li&gt;
  </code></pre>
<p>上面通过 v-for 渲染了 li 列表，并在其中插入了包含可点击跳转的图片，接下来看看如何实现轮播，轮播图的样式直接在后面给出大家 sass 代码，父元素 ul 设置 <code>position: relative;overflow: hidden</code> 后，li 大小设为和父元素相同，absolute 定位固定在父元素中，要让 li 按照顺序显示，需要用到 v-show 或 v-if 处理，通过 index 值来改变当前显示的 li ，本例 v-show 绑定条件 <code>index===currentIndex</code>，用定时器改变 currentIndex 实现轮播</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;(list,index) in slideList&quot; :key=&quot;index&quot; v-show=&quot;index===currentIndex&quot; @mouseenter=&quot;stop&quot; @mouseleave=&quot;go&quot;>
    <a :href=&quot;list.clickUrl&quot; >
      <img :src=&quot;list.image&quot; :alt=&quot;list.desc&quot;>
    </a>
</li>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">li</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(list,index) in slideList"</span> :key=<span class="hljs-string">"index"</span> v-show=<span class="hljs-string">"index===currentIndex"</span> @mouseenter=<span class="hljs-string">"stop"</span> @mouseleave=<span class="hljs-string">"go"</span>&gt;
    &lt;<span class="hljs-selector-tag">a</span> :href=<span class="hljs-string">"list.clickUrl"</span> &gt;
      &lt;<span class="hljs-selector-tag">img</span> :src=<span class="hljs-string">"list.image"</span> :alt=<span class="hljs-string">"list.desc"</span>&gt;
    &lt;/a&gt;
&lt;/li&gt;
</code></pre>
<p>实例中的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created() {
    //在DOM加载完成后，下个tick中开始轮播
    this.$nextTick(() => {
        this.timer = setInterval(() => {
            this.autoPlay()
        }, 4000)
    })
},
go() {
    this.timer = setInterval(() => {
        this.autoPlay()
    }, 4000)
},
stop() {
    clearInterval(this.timer)
    this.timer = null
},
change(index) {
    this.currentIndex = index
},
autoPlay() {
    this.currentIndex++
    if (this.currentIndex > this.slideList.length - 1) {
        this.currentIndex = 0
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">created</span><span class="hljs-params">()</span></span> {
    <span class="hljs-comment">//在DOM加载完成后，下个tick中开始轮播</span>
    this.<span class="hljs-variable">$nextTick</span>(() =&gt; {
        this<span class="hljs-selector-class">.timer</span> = setInterval(() =&gt; {
            this.autoPlay()
        }, <span class="hljs-number">4000</span>)
    })
},
<span class="hljs-function"><span class="hljs-title">go</span><span class="hljs-params">()</span></span> {
    this<span class="hljs-selector-class">.timer</span> = setInterval(() =&gt; {
        this.autoPlay()
    }, <span class="hljs-number">4000</span>)
},
<span class="hljs-function"><span class="hljs-title">stop</span><span class="hljs-params">()</span></span> {
    clearInterval(this.timer)
    this<span class="hljs-selector-class">.timer</span> = null
},
<span class="hljs-function"><span class="hljs-title">change</span><span class="hljs-params">(index)</span></span> {
    this<span class="hljs-selector-class">.currentIndex</span> = index
},
<span class="hljs-function"><span class="hljs-title">autoPlay</span><span class="hljs-params">()</span></span> {
    this.currentIndex++
    <span class="hljs-keyword">if</span> (this<span class="hljs-selector-class">.currentIndex</span> &gt; this<span class="hljs-selector-class">.slideList</span><span class="hljs-selector-class">.length</span> - <span class="hljs-number">1</span>) {
        this<span class="hljs-selector-class">.currentIndex</span> = <span class="hljs-number">0</span>
    }
}
</code></pre>
<p>DOM 中为每个轮播 li 元素绑定事件 <code>@mouseenter="stop" @mouseleave="go"</code> 事件,使轮播鼠标移入时停止，移出时再次开始。</p>
<p>轮播图现在位置指示，绑定类名 active 改变颜色，绑定 change() 方法，鼠标移到指示点时跳转轮播图</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;carousel-items&quot;>
  <span v-for=&quot;(item,index) in slideList.length&quot; :class=&quot;{'active':index===currentIndex}&quot; @mouseover=&quot;change(index)&quot;></span>
</div>


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"carousel-items"</span>&gt;
  &lt;span v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item,index) in slideList.length"</span> :<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"{'active':index===currentIndex}"</span> <span class="hljs-meta">@mouseover</span>=<span class="hljs-string">"change(index)"</span>&gt;&lt;/span&gt;
&lt;/div&gt;


</code></pre>
<p>sass 样式代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".carousel-wrap {
  position: relative;
  height: 453px;
  width: 100%;
  overflow: hidden;
  // 删除
  background-color: #fff;
}

.slide-ul {
  width: 100%;
  height: 100%;
  li {
    position: absolute;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.carousel-items {
  position: absolute;
  z-index: 10;
  top: 380px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-size: 0;
  span {
    display: inline-block;
    height: 6px;
    width: 30px;
    margin: 0 3px;
    background-color: #b2b2b2;
    cursor: pointer;
  }
  .active {
    background-color: $btn-color;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.carousel-wrap</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">453px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-comment">// 删除</span>
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
}

<span class="hljs-selector-class">.slide-ul</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-selector-tag">li</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-selector-tag">img</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    }
  }
}

<span class="hljs-selector-class">.carousel-items</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">10</span>;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">380px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
  <span class="hljs-selector-tag">span</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">3px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#b2b2b2</span>;
    <span class="hljs-attribute">cursor</span>: pointer;
  }
  <span class="hljs-selector-class">.active</span> {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-variable">$btn-color</span>;
  }
}
</code></pre>
<p>滑动动画设置，知识点详见 Vue 教程中的 <a href="https://cn.vuejs.org/v2/guide/transitions.html#" rel="nofollow noreferrer" target="_blank">过渡 css 类名</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}

.list-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%)
}

.list-enter {
  transform: translateX(100%)
}

.list-leave {
  transform: translateX(0)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code>.<span class="hljs-built_in">list-enter-to</span> {
  <span class="hljs-string">transition:</span> <span class="hljs-string">all </span><span class="hljs-string">1s </span><span class="hljs-string">ease;</span>
  <span class="hljs-string">transform:</span> <span class="hljs-string">translateX(</span>0);
}

.<span class="hljs-built_in">list-leave-active</span> {
  <span class="hljs-string">transition:</span> <span class="hljs-string">all </span><span class="hljs-string">1s </span><span class="hljs-string">ease;</span>
  <span class="hljs-string">transform:</span> <span class="hljs-string">translateX(</span>-<span class="hljs-string">100%</span>)
}

.<span class="hljs-built_in">list-enter</span> {
  <span class="hljs-string">transform:</span> <span class="hljs-string">translateX(</span><span class="hljs-string">100%</span>)
}

.<span class="hljs-built_in">list-leave</span> {
  <span class="hljs-string">transform:</span> <span class="hljs-string">translateX(</span>0)
}
</code></pre>
<p>完整 Vue 实例如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el: '#carousel',
    data: {
        slideList: [
            {
                &quot;clickUrl&quot;: &quot;#&quot;,
                &quot;desc&quot;: &quot;nhwc&quot;,
                &quot;image&quot;: &quot;http://dummyimage.com/1745x492/f1d65b&quot;
            },
            {
                &quot;clickUrl&quot;: &quot;#&quot;,
                &quot;desc&quot;: &quot;hxrj&quot;,
                &quot;image&quot;: &quot;http://dummyimage.com/1745x492/40b7ea&quot;
            },
            {
                &quot;clickUrl&quot;: &quot;#&quot;,
                &quot;desc&quot;: &quot;rsdh&quot;,
                &quot;image&quot;: &quot;http://dummyimage.com/1745x492/e3c933&quot;
            }
        ],
        currentIndex: 0,
        timer: ''
    },
    methods: {
        go() {
            this.timer = setInterval(() => {
                this.autoPlay()
            }, 4000)
        },
        stop() {
            clearInterval(this.timer)
            this.timer = null
        },
        change(index) {
            this.currentIndex = index
        },
        autoPlay() {
            this.currentIndex++
            if (this.currentIndex > this.slideList.length - 1) {
                this.currentIndex = 0
            }
        }
    },
    created() {
        this.$nextTick(() => {
            this.timer = setInterval(() => {
                this.autoPlay()
            }, 4000)
        })
    }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>new Vue({
    el: <span class="hljs-string">'#carousel'</span>,
    <span class="hljs-keyword">data</span>: {
        slideList: [
            {
                <span class="hljs-string">"clickUrl"</span>: <span class="hljs-string">"#"</span>,
                <span class="hljs-string">"desc"</span>: <span class="hljs-string">"nhwc"</span>,
                <span class="hljs-string">"image"</span>: <span class="hljs-string">"http://dummyimage.com/1745x492/f1d65b"</span>
            },
            {
                <span class="hljs-string">"clickUrl"</span>: <span class="hljs-string">"#"</span>,
                <span class="hljs-string">"desc"</span>: <span class="hljs-string">"hxrj"</span>,
                <span class="hljs-string">"image"</span>: <span class="hljs-string">"http://dummyimage.com/1745x492/40b7ea"</span>
            },
            {
                <span class="hljs-string">"clickUrl"</span>: <span class="hljs-string">"#"</span>,
                <span class="hljs-string">"desc"</span>: <span class="hljs-string">"rsdh"</span>,
                <span class="hljs-string">"image"</span>: <span class="hljs-string">"http://dummyimage.com/1745x492/e3c933"</span>
            }
        ],
        currentIndex: <span class="hljs-number">0</span>,
        timer: <span class="hljs-string">''</span>
    },
    methods: {
        go() {
            <span class="hljs-keyword">this</span>.timer = setInterval(() =&gt; {
                <span class="hljs-keyword">this</span>.autoPlay()
            }, <span class="hljs-number">4000</span>)
        },
        stop() {
            clearInterval(<span class="hljs-keyword">this</span>.timer)
            <span class="hljs-keyword">this</span>.timer = <span class="hljs-literal">null</span>
        },
        change(index) {
            <span class="hljs-keyword">this</span>.currentIndex = index
        },
        autoPlay() {
            <span class="hljs-keyword">this</span>.currentIndex++
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.currentIndex &gt; <span class="hljs-keyword">this</span>.slideList.length - <span class="hljs-number">1</span>) {
                <span class="hljs-keyword">this</span>.currentIndex = <span class="hljs-number">0</span>
            }
        }
    },
    created() {
        <span class="hljs-keyword">this</span>.$nextTick(() =&gt; {
            <span class="hljs-keyword">this</span>.timer = setInterval(() =&gt; {
                <span class="hljs-keyword">this</span>.autoPlay()
            }, <span class="hljs-number">4000</span>)
        })
    }
})
</code></pre>
<p>以上就是 Vue 过渡实现的轮播图，喜欢的话请关注，点赞，收藏~谢谢</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 过渡实现轮播图

## 原文链接
[https://segmentfault.com/a/1190000008828755](https://segmentfault.com/a/1190000008828755)

