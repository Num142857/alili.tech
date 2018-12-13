---
title: 'Vue 使用 Font Awesome 5' 
date: 2018-12-14 2:30:11
hidden: true
slug: tumsml4fbgb
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue 使用 Font Awesome 5</h1>
<blockquote>Font Awesome 官网：<a href="https://fontawesome.com/" rel="nofollow noreferrer" target="_blank">https://fontawesome.com/</a>
</blockquote>
<p>前端小伙伴们都知道Font Awesome图标库，它具有丰富的常用图标，笔者开发时也经常使用，省却了自己到处找图标的困扰，当然阿里的iconfont也不错，不过它比较杂乱，找的图标有时候不是配套的，尺寸和比例上有些偏差，即使你只使用某一个图标库的图标难免也会有收录不全的情况（这是笔者的使用体验，绝对没有贬低iconfont的意思，勿喷），Font Awesome通过几年的发展已经收录了互联网最常用的图标，绝对能满足大多数人的开发需求（有美工还用自己动手？！！）当然，看标题就知道Font Awesome已经进入5时代，使用方法上也和4以前的版本有所不同，而且还增加了收费版。。。当然免费版已经足够大家使用啦！下面笔者就给大伙儿讲讲如何在自己的vue开发项目中使用Font Awesome 5</p>
<h2 id="articleHeader1">安装依赖</h2>
<h3 id="articleHeader2">1. 安装基础依赖</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i --save @fortawesome/fontawesome
$ npm i --save @fortawesome/vue-fontawesome" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>$ <span class="hljs-built_in">npm</span> i --save @fortawesome/fontawesome
$ <span class="hljs-built_in">npm</span> i --save @fortawesome/vue-fontawesome</code></pre>
<h3 id="articleHeader3">2. 安装样式依赖</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i --save @fortawesome/fontawesome-free-solid
$ npm i --save @fortawesome/fontawesome-free-regular
$ npm i --save @fortawesome/fontawesome-free-brands" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>$ <span class="hljs-built_in">npm</span> i --save @fortawesome/fontawesome-free-solid
$ <span class="hljs-built_in">npm</span> i --save @fortawesome/fontawesome-free-regular
$ <span class="hljs-built_in">npm</span> i --save @fortawesome/fontawesome-free-brands</code></pre>
<h3 id="articleHeader4">注意：</h3>
<ul>
<li>免费版支持三种样式：solid、regular和brands，后面在使用图标时根据样式的不同也会有不同的前缀</li>
<li>如果下载依赖失败，试试cnpm，不赘述了！</li>
</ul>
<h2 id="articleHeader5">配置</h2>
<p>进入main.js文件配置Font Awesome，配置方式比起4以前多了一些代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> fontawesome <span class="hljs-keyword">from</span> <span class="hljs-string">'@fortawesome/fontawesome'</span>
<span class="hljs-keyword">import</span> FontAwesomeIcon <span class="hljs-keyword">from</span> <span class="hljs-string">'@fortawesome/vue-fontawesome'</span>
<span class="hljs-keyword">import</span> solid <span class="hljs-keyword">from</span> <span class="hljs-string">'@fortawesome/fontawesome-free-solid'</span>
<span class="hljs-keyword">import</span> regular <span class="hljs-keyword">from</span> <span class="hljs-string">'@fortawesome/fontawesome-free-regular'</span>
<span class="hljs-keyword">import</span> brands <span class="hljs-keyword">from</span> <span class="hljs-string">'@fortawesome/fontawesome-free-brands'</span>

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component(<span class="hljs-string">'font-awesome-icon'</span>, FontAwesomeIcon)</code></pre>
<h2 id="articleHeader6">使用</h2>
<p>ok，配置完成之后你就可以随心所欲的在你的项目上使用Font Awesome了，使用方法如下：<br>例如，我们想使用 “用户” 这个图标：</p>
<h3 id="articleHeader7">1. 进入图标搜索页</h3>
<p>搜索地址： <a href="https://fontawesome.com/icons?d=gallery" rel="nofollow noreferrer" target="_blank">https://fontawesome.com/icons...</a><br><span class="img-wrap"><img data-src="/img/remote/1460000013229013?w=2330&amp;h=1734" src="https://static.alili.tech/img/remote/1460000013229013?w=2330&amp;h=1734" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">2. 输入想使用的图标的英文，例如用户的英文是 user</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229014?w=2421&amp;h=1893" src="https://static.alili.tech/img/remote/1460000013229014?w=2421&amp;h=1893" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">3. 过滤收费图标</h3>
<p>搜索结果有些是灰色的表示是收费版的，我们可以在左边点击筛选项Free来过滤掉收费版<br><span class="img-wrap"><img data-src="/img/remote/1460000013229015?w=400&amp;h=540" src="https://static.alili.tech/img/remote/1460000013229015?w=400&amp;h=540" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">4.点击图标查看</h3>
<p>选择一个自己满意的图标点进去查看内容</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013229016?w=2750&amp;h=1692" src="https://static.alili.tech/img/remote/1460000013229016?w=2750&amp;h=1692" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>右边是选取哪种样式，这里可以看到这个图标支持solid和regular和light（收费样式），然后下面就是我们熟悉的使用代码了，不过在Vue里不能这样直接使用了，要改为以下的写法：<br>&lt;font-awesome-icon :icon="['fas','user]"/&gt;<br>往icon属性里传入一个数组，第一个参数是样式，第二个就是图标名，看起来好像节省了写 “fa-” 这几个字符，但是结构感觉比以前复杂(⊙o⊙)…</p>
<h3 id="articleHeader11">5. 查看结果</h3>
<p>OK，是时候查看我们辛苦工作的结果了，打开浏览器查看图标效果，引入成功！<br><span class="img-wrap"><img data-src="/img/remote/1460000013229017?w=1144&amp;h=572" src="https://static.alili.tech/img/remote/1460000013229017?w=1144&amp;h=572" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader12">总结</h2>
<p>Font Awesome 5比之前的版本在图标优化上绝对是完美级别的，而且图标库内容也丰富了很多，不过在配置上相对以前要繁琐，需要花一点时间， 总体来说是一个很棒的图标库，如果觉得有用的小伙伴儿麻烦点个赞哦！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 使用 Font Awesome 5

## 原文链接
[https://segmentfault.com/a/1190000013173840](https://segmentfault.com/a/1190000013173840)

