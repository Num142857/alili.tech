---
title: '基于手淘 flexible 的 Vue 组件：TextScroll -- 文字滚动' 
date: 2018-12-22 2:30:10
hidden: true
slug: 2lmczmipudq
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-flexible-components</h1>
<blockquote>
<p>基于手淘 flexible.js 的 Vue 组件</p>
<p><strong>前言：</strong></p>
<ul>
<li>目前手头的移动端Vue项目是用手淘的 <a href="https://github.com/amfe/lib-flexible/tree/master" rel="nofollow noreferrer" target="_blank">lib-flexible</a> 作适配的，并用 <a href="https://www.npmjs.com/package/px2rem" rel="nofollow noreferrer" target="_blank">px2rem</a> 来自动转换成rem。关于lib-flexible和px2rem的配置，请移步 <em><a href="https://segmentfault.com/a/1190000011883121">vue-cli 配置 flexible</a></em>。</li>
<li>由于使用rem作适配，导致现有的很多移动端UI框架不能与之很好的配合，往往需要大动干戈更改UI框架的样式，背离了使用UI框架达到快速开发的初衷。</li>
<li>为了以后项目的组件复用，以及提高开发可复用组件的能力，特把平时项目中<em>常用的、简单的</em> 组件单独拎出来。</li>
<li>此为小白之作，论代码质量、难易程度、复用度，远不及各位大佬之杰作，求轻喷。同时，也恳请各位，提出意见和建议，不胜感激！</li>
<li>GitHub地址：<a href="https://github.com/bingyang519/vueFlexibleComponents" rel="nofollow noreferrer" target="_blank">vue-flexible-components</a>
</li>
</ul>
</blockquote>
<h2 id="articleHeader1">TextScroll -- 文字滚动</h2>
<ul><li>
<h3 id="articleHeader2">效果展示</h3>
<p>&nbsp;<br><span class="img-wrap"><img data-src="/img/bV0j6L?w=274&amp;h=277" src="https://static.alili.tech/img/bV0j6L?w=274&amp;h=277" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
</li></ul>
<p>&nbsp;</p>
<ul>
<li>
<h3 id="articleHeader3">代码分析</h3>
<blockquote>利用vue的列表过渡<a href="https://cn.vuejs.org/v2/guide/transitions.html#" rel="nofollow noreferrer" target="_blank">transition-group</a>来进行动画渲染。滚动元素都是相对于滚动视口绝对定位，利用定时器循环更改当前显示索引，配合Vue的过渡属性，达到这种滚动效果。</blockquote>
<ul>
<li>
<h4>dom结构</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;TextScroll&quot;>
    <transition-group tag=&quot;ul&quot; :name=&quot;scrollType&quot;>
      <li
        v-for=&quot;(item,index) in dataList&quot;
        :key='index'
        v-show=&quot;index==count&quot;
      >
          <!-- <router-link to=&quot;&quot;> -->
              <p>"{{"item.text"}}"</p>     // 因各项目数据结构不一样，需手动修改此处结构和属性值
          <!-- </router-link> -->
      </li>
    </transition-group>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"TextScroll"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transition-group</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">"ul"</span> <span class="hljs-attr">:name</span>=<span class="hljs-string">"scrollType"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
        <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in dataList"</span>
        <span class="hljs-attr">:key</span>=<span class="hljs-string">'index'</span>
        <span class="hljs-attr">v-show</span>=<span class="hljs-string">"index==count"</span>
      &gt;</span>
          <span class="hljs-comment">&lt;!-- &lt;router-link to=""&gt; --&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>     // 因各项目数据结构不一样，需手动修改此处结构和属性值
          <span class="hljs-comment">&lt;!-- &lt;/router-link&gt; --&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition-group</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
</li>
<li>
<h4>data数据</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
    return {
        count: 0, // 当前索引  当v-for中的index等于count时 v-show=true 即显示当前元素
        intervalId: null, // 定时器ID
        playTime: 2000, // 定时器执行间隔

    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>data() {
    <span class="hljs-class">return </span>{
<span class="hljs-symbol">        count:</span> <span class="hljs-number">0</span>, <span class="hljs-comment">// 当前索引  当v-for中的index等于count时 v-show=true 即显示当前元素</span>
<span class="hljs-symbol">        intervalId:</span> null, <span class="hljs-comment">// 定时器ID</span>
<span class="hljs-symbol">        playTime:</span> <span class="hljs-number">2000</span>, <span class="hljs-comment">// 定时器执行间隔</span>

    }
},</code></pre>
</li>
<li>
<h4>methods方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    getText() {
        let len = this.dataList.length; // 获取数组长度
        if (len == 0) {
            return // 当数组为空时，直接返回
        }
        if (this.count == len - 1) { // 当前为最后一个时
            this.count = 0 // 从第一个开始
        } else {
            this.count++ // 自增
        }
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>methods: {
    getText() {
        let len = <span class="hljs-keyword">this</span>.dataList.length; <span class="hljs-comment">// 获取数组长度</span>
        <span class="hljs-keyword">if</span> (len == <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-comment">// 当数组为空时，直接返回</span>
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.count == len - <span class="hljs-number">1</span>) { <span class="hljs-comment">// 当前为最后一个时</span>
            <span class="hljs-keyword">this</span>.count = <span class="hljs-number">0</span> <span class="hljs-comment">// 从第一个开始</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.count++ <span class="hljs-comment">// 自增</span>
        }
    }
},</code></pre>
</li>
<li>
<h4>created时开启定时器执行上面的方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created() {
    this.intervalId = setInterval(()=>{ // 定义定时器
        this.getText();
    }, this.playTime)
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>created() {
    <span class="hljs-keyword">this</span>.intervalId = setInterval(()=&gt;{ <span class="hljs-comment">// 定义定时器</span>
        <span class="hljs-keyword">this</span>.getText();
    }, <span class="hljs-keyword">this</span>.playTime)
},</code></pre>
</li>
<li>
<h4>destroyed 时清除定时器，尤其spa页面要注意，否则会一直跑下去</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="destroyed() {
    clearInterval(this.intervalId) // 清除定时器
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">destroyed</span><span class="hljs-params">()</span></span> {
    clearInterval(this.intervalId) <span class="hljs-comment">// 清除定时器</span>
}</code></pre>
</li>
<li>
<h4>CSS 样式。还是比较重要的，想要什么样的动画效果，全靠这来控制</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 向上滚动动画 */
.scroll-up-enter-active,
.scroll-up-leave-active{
    transition: all .5s ease;
}
.scroll-up-enter{
    transform: translate3d(0,100%,0);
}
.scroll-up-leave-to{
    transform: translate3d(0,-100%,0);
}



/* 向上匀速滚动动画 */
.scroll-up-linear-enter-active,
.scroll-up-linear-leave-active{
    transition: all 1s linear;  /*此时间必须和 playTime 保持一致*/
}
.scroll-up-linear-enter{
    transform: translate3d(0,100%,0);
}
.scroll-up-linear-leave-to{
    transform: translate3d(0,-100%,0);
}



/* 向左滚动动画 */
.scroll-left-enter-active,
.scroll-left-leave-active{
    transition: all 1s ease;
}
.scroll-left-enter{
    transform: translate3d(100%,0,0);
}
.scroll-left-leave-to{
    transform: translate3d(-100%,0,0);
}



/* 向左匀速滚动动画 */
.scroll-left-linear-enter-active,
.scroll-left-linear-leave-active{
    transition: all 4s linear;   /*此时间必须和 playTime 保持一致*/
}
.scroll-left-linear-enter{
    transform: translate3d(100%,0,0);
}
.scroll-left-linear-leave-to{
    transform: translate3d(-100%,0,0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/* 向上滚动动画 */</span>
<span class="hljs-selector-class">.scroll-up-enter-active</span>,
<span class="hljs-selector-class">.scroll-up-leave-active</span>{
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span> ease;
}
<span class="hljs-selector-class">.scroll-up-enter</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0,100%,0);
}
<span class="hljs-selector-class">.scroll-up-leave-to</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0,-100%,0);
}



<span class="hljs-comment">/* 向上匀速滚动动画 */</span>
<span class="hljs-selector-class">.scroll-up-linear-enter-active</span>,
<span class="hljs-selector-class">.scroll-up-linear-leave-active</span>{
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> linear;  <span class="hljs-comment">/*此时间必须和 playTime 保持一致*/</span>
}
<span class="hljs-selector-class">.scroll-up-linear-enter</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0,100%,0);
}
<span class="hljs-selector-class">.scroll-up-linear-leave-to</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0,-100%,0);
}



<span class="hljs-comment">/* 向左滚动动画 */</span>
<span class="hljs-selector-class">.scroll-left-enter-active</span>,
<span class="hljs-selector-class">.scroll-left-leave-active</span>{
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">1s</span> ease;
}
<span class="hljs-selector-class">.scroll-left-enter</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(100%,0,0);
}
<span class="hljs-selector-class">.scroll-left-leave-to</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-100%,0,0);
}



<span class="hljs-comment">/* 向左匀速滚动动画 */</span>
<span class="hljs-selector-class">.scroll-left-linear-enter-active</span>,
<span class="hljs-selector-class">.scroll-left-linear-leave-active</span>{
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">4s</span> linear;   <span class="hljs-comment">/*此时间必须和 playTime 保持一致*/</span>
}
<span class="hljs-selector-class">.scroll-left-linear-enter</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(100%,0,0);
}
<span class="hljs-selector-class">.scroll-left-linear-leave-to</span>{
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-100%,0,0);
}</code></pre>
</li>
</ul>
</li>
<li>
<h3 id="articleHeader4">使用说明</h3>
<p>&nbsp;</p>
<ul>
<li><h4>组件地址：<a href="https://github.com/bingyang519/vueFlexibleComponents/tree/master/src/components" rel="nofollow noreferrer" target="_blank">src/components/TextScroll.vue</a>  （不能npm，只能手动下载使用）</h4></li>
<li><h4>下载并放入自己项目中 —— import 引入组件 —— components中注册组件 —— 使用</h4></li>
<li>
<h4>props</h4>
<table>
<thead><tr>
<th>props</th>
<th>说明</th>
<th>类型</th>
<th>可选值</th>
<th>默认值</th>
</tr></thead>
<tbody>
<tr>
<td>dataList</td>
<td>滚动文字数据<br>(由于数据结构不同，需更改组件内的dom结构)</td>
<td>Array</td>
<td> </td>
<td>[ ]</td>
</tr>
<tr>
<td>scrollType</td>
<td>滚动效果</td>
<td>String</td>
<td>'scroll-up''scroll-up-linear''scroll-left''scroll-left-linear'</td>
<td>'scroll-up'</td>
</tr>
</tbody>
</table>
</li>
<li>
<h4>示例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <text-scroll
      :dataList=&quot;data&quot;
      scrollType=&quot;scroll-up&quot;
  >
  </text-scroll>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>  &lt;text-<span class="hljs-keyword">scroll</span>
      :<span class="hljs-built_in">dataList</span>=<span class="hljs-string">"data"</span>
      scrollType=<span class="hljs-string">"scroll-up"</span>
  &gt;
  &lt;/text-<span class="hljs-keyword">scroll</span>&gt;</code></pre>
</li>
</ul>
</li>
<li>
<h3 id="articleHeader5">存在问题</h3>
<p>&nbsp;</p>
<ul>
<li>
<h4>复用性差</h4>
<p>虽说作了简单的封装，但是复用性还是比较差。比如：对dataList的处理比较粗糙，由于每个项目的数据结构不同，每次需手动修改组件内的dom结构。水平有限，暂时还想不出不用修改组件dom结构的方法，实现高度复用性。<br>&nbsp;</p>
</li>
<li>
<h4>PC 端，当滚动时，文字比较模糊</h4>
<p>尤其那两个匀速滚动，在pc上显示时，文字比较模糊，移动端稍微好些，难道是position:absolute导致的？可是不用这种定位方式又该怎么做呢？纠结中...<br>&nbsp;</p>
</li>
<li>
<h4>样式叠加，错乱</h4>
<p>在pc端测试时，当浏览器打开多个窗口（其中一个是本组件展示页）。从本组件展示页切换到其它窗口，在其它窗口再回到此页面时，会发生短暂的样式错位，一两秒后又恢复正常。<br><span class="img-wrap"><img data-src="/img/bV0knp?w=326&amp;h=405" src="https://static.alili.tech/img/bV0knp?w=326&amp;h=405" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>&nbsp;</p>
</li>
</ul>
</li>
<li>
<h3 id="articleHeader6">结束语</h3>
<blockquote>
<h4>第一次封装Vue组件，战战兢兢,虽说是很简单的组件，到我手中也是问题不断。但是，我却很享受这个过程，因为我始终坚信，能力就是在不断探索中提高的，没有挫折，哪能进步！</h4>
<h4>同时,也恳请各位大佬，对上述问题，提出意见和建议，祝我一臂之力，不胜感激！</h4>
<h4>其它组件也将会在GitHub <a href="https://github.com/bingyang519/vueFlexibleComponents" rel="nofollow noreferrer" target="_blank">vue-flexible-components</a> 中陆续更新，敬请关注。</h4>
</blockquote>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于手淘 flexible 的 Vue 组件：TextScroll -- 文字滚动

## 原文链接
[https://segmentfault.com/a/1190000012432631](https://segmentfault.com/a/1190000012432631)

