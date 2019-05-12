---
title: '使用Vue.js实现列表选中效果' 
date: 2019-02-09 2:30:59
hidden: true
slug: lsb2slwt0op
categories: [reprint]
---

{{< raw >}}

                    
<p>  实际项目中，我们会遇到很多类似的需求，一个列表，需要点击其中一条高亮显示。熟悉JQuery的同学说这个太简单了。可以给这个选中的element设置一个active的class。配合Css样式，让active有选中高亮效果。但是谁说一定要用到jQuery呢。</p>
<p>  最近在做的项目中，我尝试脱离JQuery，绕过JQuery，我所接触的大部分项目中好像不使用JQuery无法进行开发一样。它确实给开发者提供了太多便利。以至于大部分web网站都依赖它运行着。据<a href="http://w3techs.com/technologies/details/js-jquery/all/all" rel="nofollow noreferrer" target="_blank">w3Techs统计</a>，JQuery的市场份额高达94.9%，是时候脱离JQuery的束缚了。使用<code>Vue.js</code>更简洁，快速地实现。</p>
<p>  选中效果实现的核心实现逻辑是拷贝一份当前状态作为快照。比对列表的快照和当前的唯一索引，如果相同则视为选中。</p>
<h3 id="articleHeader0">Demo</h3>
<hr>
<p><span class="img-wrap"><img data-src="/img/bVxE7E" src="https://static.alili.tech/img/bVxE7E" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">使用Vue.js实现</h3>
<hr>
<p><strong>javascript</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: &quot;#app&quot;,
  data: {
    gameNames: ['魔兽世界', '暗黑破坏神Ⅲ', '星际争霸Ⅱ', '炉石传说', '风暴英雄',
      '守望先锋'
    ],
    activeName: ''
  },
  methods: {
    selected: function(gameName) {
      this.activeName = gameName
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">"#app"</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">gameNames</span>: [<span class="hljs-string">'魔兽世界'</span>, <span class="hljs-string">'暗黑破坏神Ⅲ'</span>, <span class="hljs-string">'星际争霸Ⅱ'</span>, <span class="hljs-string">'炉石传说'</span>, <span class="hljs-string">'风暴英雄'</span>,
      <span class="hljs-string">'守望先锋'</span>
    ],
    <span class="hljs-attr">activeName</span>: <span class="hljs-string">''</span>
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">selected</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">gameName</span>) </span>{
      <span class="hljs-keyword">this</span>.activeName = gameName
    }
  }
})</code></pre>
<p><strong>html</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
  <div class=&quot;collection&quot;>
    <a href=&quot;#!&quot; class=&quot;collection-item&quot;
       v-for=&quot;gameName in gameNames&quot;
       @click=&quot;selected(gameName)&quot;
       :class=&quot;{active: activeName == gameName}&quot;>"{{"gameName"}}"</a>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"collection"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#!"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"collection-item"</span>
       <span class="hljs-attr">v-for</span>=<span class="hljs-string">"gameName in gameNames"</span>
       @<span class="hljs-attr">click</span>=<span class="hljs-string">"selected(gameName)"</span>
       <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: activeName == gameName}"</span>&gt;</span>"{{"gameName"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>It's done. 非常简洁的代码就实现了选中高亮。View on <a href="http://jsfiddle.net/xiaoluoboding/23fuxx47/?utm_source=website&amp;utm_medium=embed&amp;utm_campaign=23fuxx47" rel="nofollow noreferrer" target="_blank">jsfiddle</a><button class="btn btn-xs btn-default ml10 preview" data-url="xiaoluoboding/23fuxx47/" data-typeid="0">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Vue.js实现列表选中效果

## 原文链接
[https://segmentfault.com/a/1190000005600481](https://segmentfault.com/a/1190000005600481)

