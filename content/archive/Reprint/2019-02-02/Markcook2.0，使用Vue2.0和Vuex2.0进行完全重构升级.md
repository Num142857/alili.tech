---
title: 'Markcook2.0，使用Vue2.0和Vuex2.0进行完全重构升级' 
date: 2019-02-02 2:30:11
hidden: true
slug: fpk9tyls8sb
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVDNjH?w=513&amp;h=170" src="https://static.alili.tech/img/bVDNjH?w=513&amp;h=170" alt="Logo" title="Logo" style="cursor: pointer; display: inline;"></span></p>
<p>随着Vue2.0的正式推出，我也正好籍此机会对我的开源项目Markcook进行重构。这一次重构既打发了我在高速路上堵车的无聊时光，又加深了对Vue2.0和Vuex2.0使用的认识，可谓一举多得。</p>
<hr>
<blockquote><p>项目地址：<a href="https://github.com/jrainlau/markcook" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/jrainlau/markcook" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/m...</a><br>在线地址：<a href="http://jrainlau.github.io/markcook/" rel="nofollow noreferrer" target="_blank"></a><a href="http://jrainlau.github.io/markcook/" rel="nofollow noreferrer" target="_blank">http://jrainlau.github.io/mar...</a><br>桌面程序下载（仅windows）：<a href="https://coding.net/s/2138109d-89e4-4791-ac02-eeb2d4294b3e" rel="nofollow noreferrer" target="_blank">markcook2.0-win32-x64.zip</a></p></blockquote>
<h2 id="articleHeader0">什么是Markcook？</h2>
<p>在上一个版本中我写了一篇文章，叫做<a href="https://segmentfault.com/a/1190000004938777">Markcook 1.2，超轻的开源markdown编辑器</a>，但是仍然缺乏对Markcook的一个完整的定义。在2.0版本中，Markcook的定义是：</p>
<blockquote>
<p>A smart and beautiful markdown editor.</p>
<p>一个聪明且好看的markdown编辑器。</p>
</blockquote>
<h2 id="articleHeader1">更新内容</h2>
<p>2.0版本使用了Google的<a href="https://design.google.com/" rel="nofollow noreferrer" target="_blank">Material Design</a>作为设计规范，对UI部分进行了完全的重构，提供了更加方便的操作，同时在视觉上也更加舒适。对于用户体验也有着更为详细和人性化的设计，在最大限度上提供最舒适的编辑环境。</p>
<p>新版本允许多任务操作，这意味着你可以通过Markcook同时打开多个markdown文件，在侧边栏中可以方便地进行切换：<br><span class="img-wrap"><img data-src="/img/bVDNlH?w=1099&amp;h=529" src="https://static.alili.tech/img/bVDNlH?w=1099&amp;h=529" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>你可以通过拖拽文件的方式把文件直接添加到Markcook的工作空间当中：<br><span class="img-wrap"><img data-src="/img/bVDNlN?w=1218&amp;h=535" src="https://static.alili.tech/img/bVDNlN?w=1218&amp;h=535" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>最大的变化，在于工具栏的升级。你可以通过点击工具栏的按钮，在页面中插入markdown格式的语句，或者直接把一段文字变成markdown格式：<br><span class="img-wrap"><img data-src="/img/bVDNlS?w=1104&amp;h=533" src="https://static.alili.tech/img/bVDNlS?w=1104&amp;h=533" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>你可能会好奇为什么Markcook并没有像其他的编辑器一样提供“保存进度”的功能。其实Markcook会在你输入的过程中自动地为你保存内容，这样即使你把页面关掉，在下一次打开Markcook的时候，你会发现你之前的内容仍然留在原地。<br><span class="img-wrap"><img data-src="/img/bVDNl7?w=691&amp;h=510" src="https://static.alili.tech/img/bVDNl7?w=691&amp;h=510" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">深入Markcook</h2>
<p>2.0版本使用了<a href="https://vuex.vuejs.org/en/index.html" rel="nofollow noreferrer" target="_blank">Vuex2.0</a>作为全局的状态管理工具，组件之间完全解耦，可以方便地进行维护和定制，其主要目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|__ index.html
   |__ src
     |__ App.vue
     |__ components
       |__ inputer.vue
       |__ navBar.vue
       |__ outputer.vue
       |__ sideMenu.vue
     |__ main.js
   |__ vuex
     |__ store.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>|<span class="hljs-symbol">__</span> index.html
   |<span class="hljs-symbol">__</span> src
     |<span class="hljs-symbol">__</span> App.vue
     |<span class="hljs-symbol">__</span> <span class="hljs-built_in">components</span>
       |<span class="hljs-symbol">__</span> inputer.vue
       |<span class="hljs-symbol">__</span> navBar.vue
       |<span class="hljs-symbol">__</span> outputer.vue
       |<span class="hljs-symbol">__</span> sideMenu.vue
     |<span class="hljs-symbol">__</span> main.js
   |<span class="hljs-symbol">__</span> vuex
     |<span class="hljs-symbol">__</span> store.js</code></pre>
<p>可以看到，Markcook被拆分成了5个组件，包括一个根组件<code>App.vue</code>以及4个放在<code>/components</code>文件夹下的功能性组件。组件之间的状态完全通过<code>/vuex/store.js</code>进行管理，其过程可以通过下面的架构图说明：<br><span class="img-wrap"><img data-src="/img/bVDNmT?w=568&amp;h=224" src="https://static.alili.tech/img/bVDNmT?w=568&amp;h=224" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>关键逻辑也是放在<code>store.js</code>里面进行，下面简要分析一些关键功能的实现原理：</p>
<ul>
<li><p>输入的内容进入<code>store.js</code>，经过处理后实时输出到<code>output.vue</code>，以实现同步输入输出的效果。</p></li>
<li>
<p>每一篇文章都是一个对象，里面有三个属性：<code>id</code>，<code>content</code>，<code>current</code>。在<code>store.js</code>内部有一个<code>articleList</code>数组，专门用来存放文章对象。每次新建文件，都会往数组内添加一个新的文章对象，在切换文件的时候，只需要根据对应的ID切换文章对象的<code>current</code>属性即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="articleList: [
  {
    id: createID(),
    content: 'Untitled\n---\n',
    current: true
  }
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">articleList:</span> <span class="hljs-string">[</span>
  <span class="hljs-string">{</span>
<span class="hljs-attr">    id:</span> <span class="hljs-string">createID(),</span>
<span class="hljs-attr">    content:</span> <span class="hljs-string">'Untitled\n---\n'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    current:</span> <span class="hljs-literal">true</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">]</span>
</code></pre>
</li>
<li><p>文章的自动保存进度功能，是通过<code>localStorage</code>实现的。每一篇文章都在<code>localStorage</code>里面根据ID分配了位置，在输入的过程中会实时更新对应ID下的内容。同时在<code>localStorage</code>里面有一个叫<code>idArr</code>的对象，专门用于存放文章的ID。文章的自动读取等操作，都是根据<code>idArr</code>获取文章ID，再获取对应ID下的文章内容来实现的。<span class="img-wrap"><img data-src="/img/bVDNon?w=667&amp;h=454" src="https://static.alili.tech/img/bVDNon?w=667&amp;h=454" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p></li>
</ul>
<p>更详细的内容请直接阅读<a href="https://github.com/jrainlau/markcook" rel="nofollow noreferrer" target="_blank">源码</a>，由于篇幅有限，在这里就不作过多的介绍了。</p>
<h2 id="articleHeader3">后记</h2>
<p>在高速公路上一遍堵车一边coding的感觉真的很神奇，在完全没有网络没法google的情况下，反而大大激发了独立思考的能力，真是受益良多。</p>
<p>最想多说的反而是UI设计。Material Design是我最喜欢的设计风格，在上一版本中已经有所使用了，但还是丑。这一版虽然和专业设计师比起来还是会有很大差距，但是对我来说，着实是顺眼了很多，也不枉我即使在睡觉也在思考Markcook2.0应该长什么样。</p>
<p>升级到Vue2.0，在开发体验上并没有太大的变化，反而是Vuex2.0的使用让我稍微有些不习惯，因为它和旧版本的用法有着比较大的不同。不过得益于文档的详细，在仔细阅读了文档以后，遇到的问题基本都能够得以解决。经过一定的开发摸索，发现Vuex2.0其实会更容易理解和使用，因为它把<code>store</code>，<code>mutation</code>，<code>action</code>和<code>getter</code>都放在了一起，在组件中只需要通过<code>this.$store</code>就能够对<code>store</code>进行操作，逻辑非常清晰易懂，所以也很容易理解为什么我项目中每一个组件的逻辑都非常简单，代码量也非常少。</p>
<p>由于水平有限，项目代码难免会有错漏和不完美的地方，非常期待能够得到大家能够建议，后续也将继续对Markcook进行维护。</p>
<p>谢谢大家~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Markcook2.0，使用Vue2.0和Vuex2.0进行完全重构升级

## 原文链接
[https://segmentfault.com/a/1190000007062371](https://segmentfault.com/a/1190000007062371)

