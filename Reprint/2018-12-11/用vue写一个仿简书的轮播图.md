---
title: '用vue写一个仿简书的轮播图' 
date: 2018-12-11 2:30:10
hidden: true
slug: 1cmcv50674k
categories: [reprint]
---

{{< raw >}}

                    
<p>原文地址：<a href="http://bougieblog.cn/article/Qk9VNkdJRQ.html" rel="nofollow noreferrer" target="_blank">Bougie的博客</a></p>
<h2 id="articleHeader0">1.先展示最终效果：</h2>
<p><span class="img-wrap"><img data-src="/img/bV5vD2?w=823&amp;h=317" src="https://static.alili.tech/img/bV5vD2?w=823&amp;h=317" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">2.解决思路</h2>
<p>Vue的理念是以数据驱动视图，所以拒绝通过改变元素的margin-top来实现滚动效果。写好css样式，只需改变每张图片的class即可实现轮播效果。动画效果交给transition完成。可以将轮播图看成两个（mainSlide和extraSlide），各个图片的位置如图所示：<br><span class="img-wrap"><img data-src="/img/bV5vFy?w=1457&amp;h=1091" src="https://static.alili.tech/img/bV5vFy?w=1457&amp;h=1091" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">3.代码实现</h2>
<p>各个slide的样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$width: 800px;      // 容器宽度
$height: 300px;     // 容器高度
$bWidth: 500px;     // 大图片宽度
$sWidth: $width - $bWidth;  // 小图片宽度
$sHeight: $height / 2;  // 小图片高度
#slider-wrapper{
    width: $width;
    height: $height;
    margin: 0 auto;
    cursor: pointer;
    background: #ddd;
    border-radius: 5px;
    box-shadow: 0 1px 6px rgba(0,0,0,0.117647), 0 1px 4px rgba(0,0,0,0.117647);
    display: flex;
    overflow: hidden;
    div{
        display: inline-block;
    }
}
.main-slide{
    width: $bWidth;
    height: $height;
    float: left;
    transition: all .4s ease;
}
.extra-slide{
    width: $sWidth;
    position: relative;
    .extra-slide-item{
        position: absolute;
        width: $sWidth;
        height: $sHeight;
        left: 0;
        transition: .4s ease-out;
    }
    .extra-slide-top{
        top: -$sHeight;
    }
    .extra-slide-middle-first{
        top: 0;
        z-index: 2
    }
    .extra-slide-middle-second{
        top: $sHeight;
        z-index: 2
    }
    .extra-slide-bottom{
        top: $height
    }
    .extra-slide-hide{
        display: none!important;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-variable">$width</span>: <span class="hljs-number">800px</span>;      <span class="hljs-comment">// 容器宽度</span>
<span class="hljs-variable">$height</span>: <span class="hljs-number">300px</span>;     <span class="hljs-comment">// 容器高度</span>
<span class="hljs-variable">$bWidth</span>: <span class="hljs-number">500px</span>;     <span class="hljs-comment">// 大图片宽度</span>
<span class="hljs-variable">$sWidth</span>: <span class="hljs-variable">$width</span> - <span class="hljs-variable">$bWidth</span>;  <span class="hljs-comment">// 小图片宽度</span>
<span class="hljs-variable">$sHeight</span>: <span class="hljs-variable">$height</span> / <span class="hljs-number">2</span>;  <span class="hljs-comment">// 小图片高度</span>
<span class="hljs-selector-id">#slider-wrapper</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-variable">$width</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-variable">$height</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ddd</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">6px</span> rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0.117647</span>), <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">4px</span> rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0.117647</span>);
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">display</span>: inline-block;
    }
}
<span class="hljs-selector-class">.main-slide</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-variable">$bWidth</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-variable">$height</span>;
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">4s</span> ease;
}
<span class="hljs-selector-class">.extra-slide</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-variable">$sWidth</span>;
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-selector-class">.extra-slide-item</span>{
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">width</span>: <span class="hljs-variable">$sWidth</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-variable">$sHeight</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">transition</span>: .<span class="hljs-number">4s</span> ease-out;
    }
    <span class="hljs-selector-class">.extra-slide-top</span>{
        <span class="hljs-attribute">top</span>: -<span class="hljs-variable">$sHeight</span>;
    }
    <span class="hljs-selector-class">.extra-slide-middle-first</span>{
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>
    }
    .extra-slide-middle-second{
        top: <span class="hljs-variable">$sHeight</span>;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">2</span>
    }
    .extra-slide-bottom{
        top: <span class="hljs-variable">$height</span>
    }
    .extra-slide-hide{
        display: none<span class="hljs-meta">!important</span>;
    }
}</code></pre>
<p>模板包含两个轮播图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;slider-wrapper&quot; @mouseover=&quot;stop&quot; @mouseout=&quot;start&quot;>
    <!-- 轮播图1，mainSlide -->
    <div class=&quot;main-slide&quot; :style=&quot;`background: url(${slideConfig[nowIndex].src})`&quot;></div>
    <!-- 轮播图2，extraSlide -->
    <div class=&quot;extra-slide&quot;>
        <div class=&quot;extra-slide-item&quot; :class=&quot;slideClass(i)&quot; v-for=&quot;(v, i) in slideConfig&quot; :key=&quot;i&quot; :style=&quot;`background: url(${v.src}); background-size: cover`&quot;></div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slider-wrapper"</span> @<span class="hljs-attr">mouseover</span>=<span class="hljs-string">"stop"</span> @<span class="hljs-attr">mouseout</span>=<span class="hljs-string">"start"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 轮播图1，mainSlide --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main-slide"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"`background: url($</span></span></span><span class="hljs-template-variable">{slideConfig[nowIndex].src}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">)`"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 轮播图2，extraSlide --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"extra-slide"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"extra-slide-item"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"slideClass(i)"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(v, i) in slideConfig"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"i"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"`background: url($</span></span></span><span class="hljs-template-variable">{v.src}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">); background-size: cover`"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>scripts部分，设置一个nowIndex，定时改变nowIndex。所有图片的class根据这个nowIndex来变化，这里使用了es6的map类型，详情点击：<a href="http://es6.ruanyifeng.com/#docs/set-map" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#do...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    name: 'slider',
    data: function() {    
        return {
            slideInterval: null,
            nowIndex: 0,
            slideLength: this.slideConfig.length
        }
    },
    props: {
        slideConfig: {
            type: Array
        }
    },
    methods: {
        // 限制index不能超出图片列表长度
        resetIndex(i) {
            return i > this.slideLength - 1 ? i - this.slideLength : i
        },
        slideClass(i) {
            let nowIndex = this.nowIndex
            // Map就是key也可以是非字符串的对象，不用Map多写几个 if else 也可以
            let map = new Map([
                [this.resetIndex(nowIndex), 'extra-slide-top'],
                [this.resetIndex(nowIndex + 1), 'extra-slide-middle-first'],
                [this.resetIndex(nowIndex + 2), 'extra-slide-middle-second'],
                [this.resetIndex(nowIndex + 3), 'extra-slide-bottom']
            ])
            // 图片的class根据nowIndex的变化而变化
            return map.get(i) ? map.get(i) : 'extra-slide-hide'
        },
        start() {
            // 定时改变nowIndex
            this.slideInterval = setInterval(() => {
                this.nowIndex = this.nowIndex > this.slideLength - 2 ? 0 : this.nowIndex + 1
                console.log(this.nowIndex)
            }, 2000)
        },
        stop() {
            clearInterval(this.slideInterval)
            this.slideInterval = null
        }
    },
    mounted() {
        this.start()
    },
    destroyed() {
        this.stop()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>export <span class="hljs-keyword">default</span> {
    name: <span class="hljs-string">'slider'</span>,
    <span class="hljs-keyword">data</span>: function() {    
        <span class="hljs-keyword">return</span> {
            slideInterval: <span class="hljs-literal">null</span>,
            nowIndex: <span class="hljs-number">0</span>,
            slideLength: <span class="hljs-keyword">this</span>.slideConfig.length
        }
    },
    props: {
        slideConfig: {
            type: Array
        }
    },
    methods: {
        <span class="hljs-comment">// 限制index不能超出图片列表长度</span>
        resetIndex(i) {
            <span class="hljs-keyword">return</span> i &gt; <span class="hljs-keyword">this</span>.slideLength - <span class="hljs-number">1</span> ? i - <span class="hljs-keyword">this</span>.slideLength : i
        },
        slideClass(i) {
            let nowIndex = <span class="hljs-keyword">this</span>.nowIndex
            <span class="hljs-comment">// Map就是key也可以是非字符串的对象，不用Map多写几个 if else 也可以</span>
            let map = new Map([
                [<span class="hljs-keyword">this</span>.resetIndex(nowIndex), <span class="hljs-string">'extra-slide-top'</span>],
                [<span class="hljs-keyword">this</span>.resetIndex(nowIndex + <span class="hljs-number">1</span>), <span class="hljs-string">'extra-slide-middle-first'</span>],
                [<span class="hljs-keyword">this</span>.resetIndex(nowIndex + <span class="hljs-number">2</span>), <span class="hljs-string">'extra-slide-middle-second'</span>],
                [<span class="hljs-keyword">this</span>.resetIndex(nowIndex + <span class="hljs-number">3</span>), <span class="hljs-string">'extra-slide-bottom'</span>]
            ])
            <span class="hljs-comment">// 图片的class根据nowIndex的变化而变化</span>
            <span class="hljs-keyword">return</span> map.<span class="hljs-keyword">get</span>(i) ? map.<span class="hljs-keyword">get</span>(i) : <span class="hljs-string">'extra-slide-hide'</span>
        },
        start() {
            <span class="hljs-comment">// 定时改变nowIndex</span>
            <span class="hljs-keyword">this</span>.slideInterval = setInterval(() =&gt; {
                <span class="hljs-keyword">this</span>.nowIndex = <span class="hljs-keyword">this</span>.nowIndex &gt; <span class="hljs-keyword">this</span>.slideLength - <span class="hljs-number">2</span> ? <span class="hljs-number">0</span> : <span class="hljs-keyword">this</span>.nowIndex + <span class="hljs-number">1</span>
                console.log(<span class="hljs-keyword">this</span>.nowIndex)
            }, <span class="hljs-number">2000</span>)
        },
        stop() {
            clearInterval(<span class="hljs-keyword">this</span>.slideInterval)
            <span class="hljs-keyword">this</span>.slideInterval = <span class="hljs-literal">null</span>
        }
    },
    mounted() {
        <span class="hljs-keyword">this</span>.start()
    },
    destroyed() {
        <span class="hljs-keyword">this</span>.stop()
    }
}</code></pre>
<p>slideConfig，组件的props：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const prefix = '/src/assets/'
const slideConfig = [{
  src: prefix + 's1.jpg',
  title: '图1',
  desc: '说明1'
}, {
  src: prefix + 's2.jpg',
  title: '图2',
  desc: '说明2'
}, {
  src: prefix + 's3.jpg',
  title: '图3',
  desc: '说明3'
}, {
  src: prefix + 's4.jpg',
  title: '图4',
  desc: '说明4'
}, {
  src: prefix + 's5.jpg',
  title: '图5',
  desc: '说明5'
}, {
  src: prefix + 's6.jpg',
  title: '图6',
  desc: '说明6'
}]
export default slideConfig" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>const <span class="hljs-keyword">prefix</span> = <span class="hljs-string">'/src/assets/'</span>
const slideConfig = [{
  src: <span class="hljs-keyword">prefix</span> + <span class="hljs-string">'s1.jpg'</span>,
  <span class="hljs-built_in">title</span>: <span class="hljs-string">'图1'</span>,
  desc: <span class="hljs-string">'说明1'</span>
}, {
  src: <span class="hljs-keyword">prefix</span> + <span class="hljs-string">'s2.jpg'</span>,
  <span class="hljs-built_in">title</span>: <span class="hljs-string">'图2'</span>,
  desc: <span class="hljs-string">'说明2'</span>
}, {
  src: <span class="hljs-keyword">prefix</span> + <span class="hljs-string">'s3.jpg'</span>,
  <span class="hljs-built_in">title</span>: <span class="hljs-string">'图3'</span>,
  desc: <span class="hljs-string">'说明3'</span>
}, {
  src: <span class="hljs-keyword">prefix</span> + <span class="hljs-string">'s4.jpg'</span>,
  <span class="hljs-built_in">title</span>: <span class="hljs-string">'图4'</span>,
  desc: <span class="hljs-string">'说明4'</span>
}, {
  src: <span class="hljs-keyword">prefix</span> + <span class="hljs-string">'s5.jpg'</span>,
  <span class="hljs-built_in">title</span>: <span class="hljs-string">'图5'</span>,
  desc: <span class="hljs-string">'说明5'</span>
}, {
  src: <span class="hljs-keyword">prefix</span> + <span class="hljs-string">'s6.jpg'</span>,
  <span class="hljs-built_in">title</span>: <span class="hljs-string">'图6'</span>,
  desc: <span class="hljs-string">'说明6'</span>
}]
export default slideConfig</code></pre>
<p>使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<slider :slideConfig=&quot;slideConfig&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">slider</span> <span class="hljs-attr">:slideConfig</span>=<span class="hljs-string">"slideConfig"</span> /&gt;</span></code></pre>
<p>2018/3/12 16:55 : slideConfig已修改成Props，提取slider.vue就可以直接用了</p>
<p>gitHub传送门：<a href="https://github.com/bougieL/jianshuslider" rel="nofollow noreferrer" target="_blank">https://github.com/bougieL/ji...</a></p>
<p>个人博客网站：<a href="http://www.bougieblog.cn" rel="nofollow noreferrer" target="_blank">http://www.bougieblog.cn</a>，欢迎大佬们关注</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue写一个仿简书的轮播图

## 原文链接
[https://segmentfault.com/a/1190000013667648](https://segmentfault.com/a/1190000013667648)

