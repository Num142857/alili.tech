---
title: '移动端弹性滑动以及vue记录滑动位置' 
date: 2018-12-17 2:30:07
hidden: true
slug: mmyhu6j59h
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">-webkit-overflow-scrolling介绍</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-overflow-scrolling: auto  |  touch;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">-webkit-<span class="hljs-built_in">overflow</span>-scrolling: <span class="hljs-keyword">auto</span>  |  touch;</code></pre>
<p><code>auto</code>： 普通滚动，当手指从触摸屏上移开，滚动立即停止<br><code>touch</code>：滚动回弹效果，当手指从触摸屏上移开，内容会保持一段时间的滚动效果，继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文。</p>
<h2 id="articleHeader1">兼容写法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="over-flow: auto;     /* winphone8和android4+ */
-webkit-overflow-scrolling: touch;    /* ios5+ */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>over-flow: auto;     <span class="hljs-comment">/* winphone8和android4+ */</span>
-webkit-<span class="hljs-attribute">overflow</span>-scrolling: touch;    <span class="hljs-comment">/* ios5+ */</span></code></pre>
<h2 id="articleHeader2">如何使用</h2>
<p>上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;scrollContainer&quot;>
     <ul>
       <li>1</li>
       <li>2</li>
       <li>3</li>
       <li>4</li>
       <li>5</li>
       <li>6</li>
       <li>7</li>
       <li>8</li>
       <li>9</li>
       <li>10</li>  
     </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"scrollContainer"</span>&gt;
     <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>7<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>8<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>9<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>10<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>  
     <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".scrollContainer{
    width: 100px;
    height: 50px;   
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;       
    overflow-x: hidden;    
}
.scrollContainer>ul>li{
    height: 20px;
    width: 100%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.scrollContainer</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;   
    <span class="hljs-attribute">-webkit-overflow-scrolling</span>: touch;
    <span class="hljs-attribute">overflow-y</span>: auto;       
    <span class="hljs-attribute">overflow-x</span>: hidden;    
}
<span class="hljs-selector-class">.scrollContainer</span>&gt;<span class="hljs-selector-tag">ul</span>&gt;<span class="hljs-selector-tag">li</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}</code></pre>
<h2 id="articleHeader3">可能会出现的bug</h2>
<ol>
<li>父级元素<code>scrollContainer</code>加上定位<code>position: absolute|relative</code>，滑动几次后可滚动区域会卡主，不能在滑动</li>
<li>快速滑动页面会出现空白，滑动停止后内容才显示</li>
</ol>
<p>此时，你应该给父级元素<code>scrollContainer</code>加上如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//解决第一个bug
z-index:1;    

//解决第二个bug
-webkit-backface-visibility: hidden;    
-webkit-transform: translate3d(0,0,0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">//解决第一个bug</span>
<span class="hljs-attribute">z-index</span>:<span class="hljs-number">1</span>;    

<span class="hljs-comment">//解决第二个bug</span>
-webkit-<span class="hljs-attribute">backface-visibility</span>: hidden;    
-webkit-<span class="hljs-attribute">transform</span>: translate3d(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);</code></pre>
<h2 id="articleHeader4">需求</h2>
<p>在vue项目中，我们可能会遇到这样的需求，例如：</p>
<p>商品列表页中，点击某一商品，进入到详情页。</p>
<p>从详情页中返回到商品列表页，页面应当显示的页面应当是之前的样子。</p>
<p>也就是说，滚动条的位置应该缓存下来；</p>
<h2 id="articleHeader5">思路</h2>
<ol>
<li>商品列表需要被缓存下来,页面的缓存方式请查看vue官方文档<a href="https://cn.vuejs.org/v2/api/#keep-alive" rel="nofollow noreferrer" target="_blank">keep-alive</a>来缓存页面，这样，在详情页面返回的时候，页面不至于重新加载。</li>
<li>在商品列表生命周期<code>activated</code>中，监听当前<code>scrollContainer</code>父元素的滚动事件，滚动时的回调中，获取到<code>scrollTop</code>(滚动条距离滚动元素即<code>scrollContainer</code>的距离)的值，存入到以及在<code>deactivated</code>中移除掉当前滚动事件的监听。</li>
<li>在商品列表中，点击进入详情页中的时候，将滚动条位置被缓存下来了，你可以放到<code>sessionStorage|localStorage</code>中。当然，如果你使用了vuex，可以直接将值放入vuex中进行管理；</li>
<li>从详情页中返回的时候，同时要做这样的操作，将你存入缓存中的<code>scrollTop</code>值重新赋予给当前div的滚动条</li>
<li>Ok，思路就是这样子，大功告成。</li>
</ol>
<h2 id="articleHeader6">vue中具体实现</h2>
<p>我是用的vuex进行管理的滚动条位置，实现代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;scrollContainer&quot; ref=&quot;scroll&quot;>    //加了一个ref，用于获取当前dom 
     <ul>
       <li>1</li>
       <li>2</li>
       <li>3</li>
       <li>4</li>
       <li>5</li>
       <li>6</li>
       <li>7</li>
       <li>8</li>
       <li>9</li>
       <li>10</li>  
     </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"scrollContainer"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"scroll"</span>&gt;</span>    //加了一个ref，用于获取当前dom 
     <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>4<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>5<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>6<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>7<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>8<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>9<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>10<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>  
     <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed:{
    ...mapGetters([
          &quot;home_list_top&quot;    //vuex中的存放的滚动条的位置
    ])
}
...
methods:{
    recordScrollPosition(e) {
      this.$store.dispatch(&quot;setHomeListTop&quot;,e.target.scrollTop);    //实时存入到vuex中
    }
}
...
activated(){  //滚动条位置的监听放到activated是因为此页面被keep-alive缓存了
    this.$refs.scroll.scrollTop = this.home_list_top;        //this.$refs.scroll拿到滚动的dom，即scrollContainer，this.home_list_top是存入到vuex里的值
    this.$refs.scroll.addEventListener(&quot;scroll&quot;,this.recordScrollPosition);    //添加绑定事件
},
deactivated(){  //keep-alive 的页面跳转时，移除scroll事件
    this.$refs.scroll.removeEventListener(&quot;scroll&quot;,this.recordScrollPosition);  //清除绑定的scroll事件
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>computed:{
    ...mapGetters([
          <span class="hljs-string">"home_list_top"</span>    <span class="hljs-comment">//vuex中的存放的滚动条的位置</span>
    ])
}
...
methods:{
    recordScrollPosition(e) {
      <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">"setHomeListTop"</span>,e.target.scrollTop);    <span class="hljs-comment">//实时存入到vuex中</span>
    }
}
...
activated(){  <span class="hljs-comment">//滚动条位置的监听放到activated是因为此页面被keep-alive缓存了</span>
    <span class="hljs-keyword">this</span>.$refs.scroll.scrollTop = <span class="hljs-keyword">this</span>.home_list_top;        <span class="hljs-comment">//this.$refs.scroll拿到滚动的dom，即scrollContainer，this.home_list_top是存入到vuex里的值</span>
    <span class="hljs-keyword">this</span>.$refs.scroll.addEventListener(<span class="hljs-string">"scroll"</span>,<span class="hljs-keyword">this</span>.recordScrollPosition);    <span class="hljs-comment">//添加绑定事件</span>
},
deactivated(){  <span class="hljs-comment">//keep-alive 的页面跳转时，移除scroll事件</span>
    <span class="hljs-keyword">this</span>.$refs.scroll.removeEventListener(<span class="hljs-string">"scroll"</span>,<span class="hljs-keyword">this</span>.recordScrollPosition);  <span class="hljs-comment">//清除绑定的scroll事件</span>
}</code></pre>
<h2 id="articleHeader7">后话</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果有更好的办法，互相交流。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>如果有更好的办法，互相交流。
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端弹性滑动以及vue记录滑动位置

## 原文链接
[https://segmentfault.com/a/1190000012857661](https://segmentfault.com/a/1190000012857661)

