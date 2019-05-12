---
title: 'vue引入新版 swiper,vue-awesome-swiper填坑' 
date: 2018-12-16 2:30:10
hidden: true
slug: j3f65d2pv5
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">关于新版 swiper,vue-awesome-swiper</h1>
<h2 id="articleHeader1">问题</h2>
<ul>
<li>为什么我的swiper,vue-awesome-swiper组件pagination小圆点不显示问题?</li>
<li>为什么我的swiper不会自动播放？</li>
<li>为什么我的swiper没有css？</li>
</ul>
<h2 id="articleHeader2">使用</h2>
<h3 id="articleHeader3">引入（前面的步骤和往常一样）</h3>
<ol>
<li><code>npm install vue-awesome-swiper --save</code></li>
<li>在 main,js 里引入（全局）:<br><code>import VueAwesomeSwiper from 'vue-awesome-swiper'</code><br><code>Vue.use(VueAwesomeSwiper)</code><br><code>import 'swiper/dist/css/swiper.css'</code><strong>(css 不显示的问题可能就在这)</strong>
</li>
<li>
<p>组件里引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'swiper/dist/css/swiper.css'    //在全局没引入，这里记得要！
import { swiper, swiperSlide } from 'vue-awesome-swiper'
 
export default {
  components: {
    swiper,
    swiperSlide
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'swiper/dist/css/swiper.css'</span>    <span class="hljs-comment">//在全局没引入，这里记得要！</span>
<span class="hljs-keyword">import</span> { swiper, swiperSlide } <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-awesome-swiper'</span>
 
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    swiper,
    swiperSlide
  }
}</code></pre>
</li>
</ol>
<h3 id="articleHeader4">配置</h3>
<p><strong>template：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<swiper :options=&quot;swiperOption&quot;>
    <swiper-slide>I'm Slide 1</swiper-slide>
    <swiper-slide>I'm Slide 2</swiper-slide>
    <swiper-slide>I'm Slide 3</swiper-slide>
    <div class=&quot;swiper-pagination&quot;  slot=&quot;pagination&quot;></div>
  </swiper>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">swiper</span> <span class="hljs-attr">:options</span>=<span class="hljs-string">"swiperOption"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 1<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 2<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span>&gt;</span>I'm Slide 3<span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-pagination"</span>  <span class="hljs-attr">slot</span>=<span class="hljs-string">"pagination"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">swiper</span>&gt;</span></code></pre>
<p><strong>script：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    data() {
      return {
        swiperOption: {
          // 所有的参数同 swiper 官方 api 参数一样
          // 
        }
      }
    },
    ...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-class"><span class="hljs-keyword">data</span>() {
      <span class="hljs-title">return</span> {
        <span class="hljs-title">swiperOption</span>: {
          // 所有的参数同 <span class="hljs-title">swiper</span> 官方 <span class="hljs-title">api</span> 参数一样
          // 
        }</span>
      }
    },
    ...
  }</code></pre>
<p><strong>重点在于 swiperOption 里面的变化</strong>，区别看下图：<br><span class="img-wrap"><img data-src="/img/bV2COa?w=796&amp;h=522" src="https://static.alili.tech/img/bV2COa?w=796&amp;h=522" alt="swiper区别" title="swiper区别" style="cursor: pointer; display: inline;"></span></p>
<p><strong>原来 pagination 和 autoplay 要这样配置！</strong><br>我原来就是在这两处错了，导致 pagination 不显示，图片不轮播。</p>
<p>出错前：<br><span class="img-wrap"><img data-src="/img/bV2COC?w=611&amp;h=262" src="https://static.alili.tech/img/bV2COC?w=611&amp;h=262" alt="之前的版本" title="之前的版本" style="cursor: pointer; display: inline;"></span><br>纠正后：<br><span class="img-wrap"><img data-src="/img/bV2COH?w=608&amp;h=381" src="https://static.alili.tech/img/bV2COH?w=608&amp;h=381" alt="之后的版本" title="之后的版本" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">总结</h2>
<ol>
<li>vue-awesome-swiper官网其实早放出说明来了，但自己一看全是英文，就没想看下去。后来发其实很容易看懂得，吸取教训自己多去看看文档，不要找 demo 去抄。</li>
<li>还是少依靠插件，有些插件随时更新，等有能力，自己造！</li>
</ol>
<p>弄到晚上12点，才弄明白原来 Swiper 版本区分了组件和普通版本，不能看照原来的经验写了。<br>发现网上关于最新 vue-awesome-swiper就两三篇，而且没说清楚。于是写下这篇，希望对大家有帮助。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue引入新版 swiper,vue-awesome-swiper填坑

## 原文链接
[https://segmentfault.com/a/1190000012979981](https://segmentfault.com/a/1190000012979981)

