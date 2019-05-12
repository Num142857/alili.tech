---
title: 'vue 实现 ios 原生picker 效果（实现思路分析）' 
date: 2019-01-15 2:30:12
hidden: true
slug: gxlmtpvrm4i
categories: [reprint]
---

{{< raw >}}

                    
<p>以前最早实现了一个类似的时间选择插件，但是适用范围太窄，索性最近要把这个实现方式发布出来，就重写了一个高复用的vue组件。</p>
<p>支持安卓4.0以上，safari 7以上 <br><span class="img-wrap"><img data-src="/img/bVNbFO?w=371&amp;h=664" src="https://static.alili.tech/img/bVNbFO?w=371&amp;h=664" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0"><a href="http://www.k186studio.com/demos/iosPicker/" rel="nofollow noreferrer" target="_blank">效果预览</a></h1>
<h1 id="articleHeader1"><a href="https://github.com/k186/iosSelect/tree/master" rel="nofollow noreferrer" target="_blank">gitHub</a></h1>
<h3 id="articleHeader2">滚轮部分主要dom结构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;pd-select-item&quot;>
    <div class=&quot;pd-select-line&quot;></div>
    <ul class=&quot;pd-select-list&quot;>
      <li class=&quot;pd-select-list-item&quot;>1</li>
    </ul>
    <ul class=&quot;pd-select-wheel&quot;>
      <li class=&quot;pd-select-wheel-item&quot;>1</li>
    </ul>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-item"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-line"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-list"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-list-item"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-wheel"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-wheel-item"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h3 id="articleHeader3">props</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" props: {
      data: {
        type: Array,
        required: true
      },
      type: {
        type: String,
        default: 'cycle'
      },
      value: {}
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"> props: {
      data: {
        type: Array,
        required: <span class="hljs-literal">true</span>
      },
      type: {
        type: String,
        default: 'cycle'
      },
      value: {}
    }</code></pre>
<h3 id="articleHeader4">设置css样式 使其垂直居中</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pd-select-line, .pd-select-list, .pd-select-wheel {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
.pd-select-list {
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.pd-select-line</span>, <span class="hljs-selector-class">.pd-select-list</span>, <span class="hljs-selector-class">.pd-select-wheel</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
}
<span class="hljs-selector-class">.pd-select-list</span> {
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<h3 id="articleHeader5">滚轮3d样式设置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 滚轮盒子 */
.pd-select-wheel {
    transform-style: preserve-3d;
    height: 30px;
}
/* 滚轮单项 */
.pd-select-wheel-item {
    white-space: nowrap;
    text-overflow: ellipsis;
    backface-visibility: hidden;
    position: absolute;
    top: 0px;
    width: 100%;
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* 滚轮盒子 */</span>
<span class="hljs-selector-class">.pd-select-wheel</span> {
    <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
}
<span class="hljs-comment">/* 滚轮单项 */</span>
<span class="hljs-selector-class">.pd-select-wheel-item</span> {
    <span class="hljs-attribute">white-space</span>: nowrap;
    <span class="hljs-attribute">text-overflow</span>: ellipsis;
    <span class="hljs-attribute">backface-visibility</span>: hidden;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVM5sd?w=400&amp;h=400" src="https://static.alili.tech/img/bVM5sd?w=400&amp;h=400" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>主要注意2个属性 <code> transform-style: preserve-3d;</code> <code>  backface-visibility: hidden;</code><br>第一个是3d布局，让界面3D化，第二个是让滚轮背后自动隐藏(上图红色部分,背面的dom节点 会自动隐藏)</p>
<h3 id="articleHeader6">如何实现3D 滚轮</h3>
<p>盒子主要这句css <code>transform: rotate3d(1, 0, 0, x deg);</code><br>item主要运用这句css <code>transform: rotate3d(1, 0, 0, xdeg) translate3d(0px, 0px, [x]px);</code></p>
<p><span class="img-wrap"><img data-src="/img/bVM5sy?w=399&amp;h=402" src="https://static.alili.tech/img/bVM5sy?w=399&amp;h=402" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVM5s7?w=798&amp;h=402" src="https://static.alili.tech/img/bVM5s7?w=798&amp;h=402" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVM5tb?w=797&amp;h=405" src="https://static.alili.tech/img/bVM5tb?w=797&amp;h=405" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>上面2张图展示了<code>translate3d(0px, 0px, [x]px);</code>这句话的效果 <code>[x]</code>就是圆的半径</p>
<p><span class="img-wrap"><img data-src="/img/bVM5tj?w=802&amp;h=400" src="https://static.alili.tech/img/bVM5tj?w=802&amp;h=400" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>从上面的图可以看见，我们只需旋转每个dom自身，然后利用<code>translate3d(0px, 0px, [x]px);</code>把每个dom扩展开<br>就形成了圆环.α就是每个dom自身旋转的角度，因为这里只用了0到180°，所以用了个盒子在装这些dom</p>
<p>行高 和角度计算</p>
<p><span class="img-wrap"><img data-src="/img/bVM5tm?w=400&amp;h=400" src="https://static.alili.tech/img/bVM5tm?w=400&amp;h=400" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>已知两边和夹角 算第三边长度 ~=34px <br><a href="http://tool.520101.com/calculator/sanjiaoxingjiaodu/" rel="nofollow noreferrer" target="_blank">http://tool.520101.com/calcul...</a></p>
<h3 id="articleHeader7">无限滚轮实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 滚轮展示大小限定 */
spin: {start: 0, end: 9, branch: 9}

/* 获取spin 数据 */
 getSpinData (index) {
   index = index % this.listData.length
   return this.listData[index >= 0 ? index : index + this.listData.length]
 }
 /* 模运算 获取数组有的索引 这样就构成 圆环了 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 滚轮展示大小限定 */</span>
spin: {<span class="hljs-attr">start</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">end</span>: <span class="hljs-number">9</span>, <span class="hljs-attr">branch</span>: <span class="hljs-number">9</span>}

<span class="hljs-comment">/* 获取spin 数据 */</span>
 getSpinData (index) {
   index = index % <span class="hljs-keyword">this</span>.listData.length
   <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.listData[index &gt;= <span class="hljs-number">0</span> ? index : index + <span class="hljs-keyword">this</span>.listData.length]
 }
 <span class="hljs-comment">/* 模运算 获取数组有的索引 这样就构成 圆环了 */</span></code></pre>
<h3 id="articleHeader8">touchend做特殊处理</h3>
<p>在touchend 里设置setCSS类型 把滚动数据取整，这样停止的时候就是<br>一格一格的准确转动到位</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // other code ....
 /* 计算touchEnd移动的整数距离 */
        let endMove = margin
        let endDeg = Math.round(updateDeg / deg) * deg
        if (type === 'end') {
          this.setListTransform(endMove, margin)
          this.setWheelDeg(endDeg)
        } else {
          this.setListTransform(updateMove, margin)
          this.setWheelDeg(updateDeg)
        }
  // other code ...." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-comment">// other code ....</span>
 <span class="hljs-comment">/* 计算touchEnd移动的整数距离 */</span>
        <span class="hljs-keyword">let</span> endMove = margin
        <span class="hljs-keyword">let</span> endDeg = <span class="hljs-built_in">Math</span>.round(updateDeg / deg) * deg
        <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'end'</span>) {
          <span class="hljs-keyword">this</span>.setListTransform(endMove, margin)
          <span class="hljs-keyword">this</span>.setWheelDeg(endDeg)
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.setListTransform(updateMove, margin)
          <span class="hljs-keyword">this</span>.setWheelDeg(updateDeg)
        }
  <span class="hljs-comment">// other code ....</span></code></pre>
<h3 id="articleHeader9">惯性缓动</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// other code ....
setWheelDeg (updateDeg, type, time = 1000) {
        if (type === 'end') {
          this.$refs.wheel.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
          this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
        } else {
          this.$refs.wheel.style.webkitTransition = ''
          this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`
        }
      }
setListTransform (translateY = 0, marginTop = 0, type, time = 1000) {
        if (type === 'end') {
          this.$refs.list.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`
          this.$refs.list.style.webkitTransform = `translateY(${translateY - this.spin.branch * 34}px)`
          this.$refs.list.style.marginTop = `${-marginTop}px`
          this.$refs.list.setAttribute('scroll', translateY)
          console.log('end')
        } else {
          this.$refs.list.style.webkitTransition = ''
          this.$refs.list.style.webkitTransform = `translateY(${translateY - this.spin.branch * 34}px)`
          this.$refs.list.style.marginTop = `${-marginTop}px`
          this.$refs.list.setAttribute('scroll', translateY)
        }
}
// other code ...." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// other code ....</span>
setWheelDeg (updateDeg, type, time = <span class="hljs-number">1000</span>) {
        <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'end'</span>) {
          <span class="hljs-keyword">this</span>.$refs.wheel.style.webkitTransition = <span class="hljs-string">`transform <span class="hljs-subst">${time}</span>ms cubic-bezier(0.19, 1, 0.22, 1)`</span>
          <span class="hljs-keyword">this</span>.$refs.wheel.style.webkitTransform = <span class="hljs-string">`rotate3d(1, 0, 0, <span class="hljs-subst">${updateDeg}</span>deg)`</span>
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.$refs.wheel.style.webkitTransition = <span class="hljs-string">''</span>
          <span class="hljs-keyword">this</span>.$refs.wheel.style.webkitTransform = <span class="hljs-string">`rotate3d(1, 0, 0, <span class="hljs-subst">${updateDeg}</span>deg)`</span>
        }
      }
setListTransform (translateY = <span class="hljs-number">0</span>, marginTop = <span class="hljs-number">0</span>, type, time = <span class="hljs-number">1000</span>) {
        <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'end'</span>) {
          <span class="hljs-keyword">this</span>.$refs.list.style.webkitTransition = <span class="hljs-string">`transform <span class="hljs-subst">${time}</span>ms cubic-bezier(0.19, 1, 0.22, 1)`</span>
          <span class="hljs-keyword">this</span>.$refs.list.style.webkitTransform = <span class="hljs-string">`translateY(<span class="hljs-subst">${translateY - <span class="hljs-keyword">this</span>.spin.branch * <span class="hljs-number">34</span>}</span>px)`</span>
          <span class="hljs-keyword">this</span>.$refs.list.style.marginTop = <span class="hljs-string">`<span class="hljs-subst">${-marginTop}</span>px`</span>
          <span class="hljs-keyword">this</span>.$refs.list.setAttribute(<span class="hljs-string">'scroll'</span>, translateY)
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end'</span>)
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.$refs.list.style.webkitTransition = <span class="hljs-string">''</span>
          <span class="hljs-keyword">this</span>.$refs.list.style.webkitTransform = <span class="hljs-string">`translateY(<span class="hljs-subst">${translateY - <span class="hljs-keyword">this</span>.spin.branch * <span class="hljs-number">34</span>}</span>px)`</span>
          <span class="hljs-keyword">this</span>.$refs.list.style.marginTop = <span class="hljs-string">`<span class="hljs-subst">${-marginTop}</span>px`</span>
          <span class="hljs-keyword">this</span>.$refs.list.setAttribute(<span class="hljs-string">'scroll'</span>, translateY)
        }
}
<span class="hljs-comment">// other code ....</span></code></pre>
<h3 id="articleHeader10">获取当前选中值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
 /* 在设置完css后获取值  */
 
setStyle (move, type, time) {
   // ...other code
   /* 设置$emit 延迟 */
   setTimeout(() => this.getPickValue(endMove), 1000)
  // ...other code
}

/* 获取选中值 */
      getPickValue (move) {
        let index = Math.abs(move / 34)
        let pickValue = this.getSpinData(index)
        this.$emit('input', pickValue)
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
 <span class="hljs-comment">/* 在设置完css后获取值  */</span>
 
setStyle (move, type, time) {
   <span class="hljs-comment">// ...other code</span>
   <span class="hljs-comment">/* 设置$emit 延迟 */</span>
   setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.getPickValue(endMove), <span class="hljs-number">1000</span>)
  <span class="hljs-comment">// ...other code</span>
}

<span class="hljs-comment">/* 获取选中值 */</span>
      getPickValue (move) {
        <span class="hljs-keyword">let</span> index = <span class="hljs-built_in">Math</span>.abs(move / <span class="hljs-number">34</span>)
        <span class="hljs-keyword">let</span> pickValue = <span class="hljs-keyword">this</span>.getSpinData(index)
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, pickValue)
      }</code></pre>
<h3 id="articleHeader11">初始化设置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" mounted () {
      /* 事件绑定 */
      this.$el.addEventListener('touchstart', this.itemTouchStart)
      this.$el.addEventListener('touchmove', this.itemTouchMove)
      this.$el.addEventListener('touchend', this.itemTouchEnd)
      /* 初始化状态 */
      let index = this.listData.indexOf(this.value)
      if (index === -1) {
        console.warn('当前初始值不存在，请检查后listData范围！！')
        this.setListTransform()
        this.getPickValue(0)
      } else {
        let move = index * 34
        /* 因为往上滑动所以是负 */
        this.setStyle(-move)
        this.setListTransform(-move, -move)
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> mounted () {
      <span class="hljs-comment">/* 事件绑定 */</span>
      <span class="hljs-keyword">this</span>.$el.addEventListener(<span class="hljs-string">'touchstart'</span>, <span class="hljs-keyword">this</span>.itemTouchStart)
      <span class="hljs-keyword">this</span>.$el.addEventListener(<span class="hljs-string">'touchmove'</span>, <span class="hljs-keyword">this</span>.itemTouchMove)
      <span class="hljs-keyword">this</span>.$el.addEventListener(<span class="hljs-string">'touchend'</span>, <span class="hljs-keyword">this</span>.itemTouchEnd)
      <span class="hljs-comment">/* 初始化状态 */</span>
      <span class="hljs-keyword">let</span> index = <span class="hljs-keyword">this</span>.listData.indexOf(<span class="hljs-keyword">this</span>.value)
      <span class="hljs-keyword">if</span> (index === <span class="hljs-number">-1</span>) {
        <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">'当前初始值不存在，请检查后listData范围！！'</span>)
        <span class="hljs-keyword">this</span>.setListTransform()
        <span class="hljs-keyword">this</span>.getPickValue(<span class="hljs-number">0</span>)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">let</span> move = index * <span class="hljs-number">34</span>
        <span class="hljs-comment">/* 因为往上滑动所以是负 */</span>
        <span class="hljs-keyword">this</span>.setStyle(-move)
        <span class="hljs-keyword">this</span>.setListTransform(-move, -move)
      }</code></pre>
<h3 id="articleHeader12">当展示为非无限滚轮的时</h3>
<p>这里我们很好判断，就是滚动的距离不能超过原始数的数组长度*34，且不能小于0（实际代码中涉及方向）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 根据滚轮类型 line or cycle 判断 updateMove最大距离 */
        if (this.type === 'line') {
          if (updateMove > 0) {
            updateMove = 0
          }
          if (updateMove < -(this.listData.length - 1) * singleHeight) {
            updateMove = -(this.listData.length - 1) * singleHeight
          }
        }
 /* 根据type 控制滚轮显示效果 */
      setHidden (index) {
        if (this.type === 'line') {
          return index < 0 || index > this.listData.length - 1
        } else {
          return false
        }
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 根据滚轮类型 line or cycle 判断 updateMove最大距离 */</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.type === <span class="hljs-string">'line'</span>) {
          <span class="hljs-keyword">if</span> (updateMove &gt; <span class="hljs-number">0</span>) {
            updateMove = <span class="hljs-number">0</span>
          }
          <span class="hljs-keyword">if</span> (updateMove &lt; -(<span class="hljs-keyword">this</span>.listData.length - <span class="hljs-number">1</span>) * singleHeight) {
            updateMove = -(<span class="hljs-keyword">this</span>.listData.length - <span class="hljs-number">1</span>) * singleHeight
          }
        }
 <span class="hljs-comment">/* 根据type 控制滚轮显示效果 */</span>
      setHidden (index) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.type === <span class="hljs-string">'line'</span>) {
          <span class="hljs-keyword">return</span> index &lt; <span class="hljs-number">0</span> || index &gt; <span class="hljs-keyword">this</span>.listData.length - <span class="hljs-number">1</span>
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
        }
      },</code></pre>
<p>dom结构也增加了对应的响应</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;pd-select-item&quot;>
    <div class=&quot;pd-select-line&quot;></div>
    <div class=&quot;pd-select-list&quot;>
      <ul class=&quot;pd-select-ul&quot; ref=&quot;list&quot;>
        <li class=&quot;pd-select-list-item&quot; v-for=&quot;el,index in renderData &quot; :class=&quot;{'hidden':setHidden(el.index)}&quot; :key=&quot;index&quot;>"{{"el.value"}}"</li>
      </ul>
    </div>
    <ul class=&quot;pd-select-wheel&quot; ref=&quot;wheel&quot;>
      <li class=&quot;pd-select-wheel-item&quot; :class=&quot;{'hidden':setHidden(el.index)}&quot; :style=&quot;setWheelItemDeg(el.index)&quot; :index=&quot;el.index&quot; v-for=&quot;el,index in renderData &quot; :key=&quot;index&quot;>"{{"el.value"}}"</li>
    </ul>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-item"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-line"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-list"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-ul"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"list"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-list-item"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"el,index in renderData "</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'hidden':setHidden(el.index)}"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>&gt;</span>"{{"el.value"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-wheel"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"wheel"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pd-select-wheel-item"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'hidden':setHidden(el.index)}"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"setWheelItemDeg(el.index)"</span> <span class="hljs-attr">:index</span>=<span class="hljs-string">"el.index"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"el,index in renderData "</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>&gt;</span>"{{"el.value"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>如有不明白的地方，请在下方留言，或者邮箱联系.k1868548@163.com</p>
<p>代码还有优化空间，欢迎提出 谢谢</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 实现 ios 原生picker 效果（实现思路分析）

## 原文链接
[https://segmentfault.com/a/1190000009276918](https://segmentfault.com/a/1190000009276918)

