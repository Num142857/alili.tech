---
title: '【JS实用技巧】利用冒泡机制，减少事件绑定，优化页面性能' 
date: 2019-01-26 2:30:18
hidden: true
slug: snwp9z2qe4
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">引言</h2>
<blockquote><p>无论新手老手，在前端开发中，经常要为DOM元素绑定事件，以实现某些功能。<br>如何通过一些JS技巧，达到减少事件绑定，优化页面性能的目的呢？<br>接下来介绍一下我个人对优化事件绑定的实践。</p></blockquote>
<p>我尽量写得通俗易懂一些，希望能为刚入门前端的人们带来帮助。<br>也欢迎大家踊跃评论和指正，一起分享建议和想法哦。</p>
<h2 id="articleHeader1">事件绑定利器：利用事件冒泡机制</h2>
<p>哈哈，放心，我不会强行地科普一堆浏览器事件机制晦涩的理论，</p>
<p>事件传播机制在各种浏览器或版本上可能会有差异，在差异中寻找平衡点，冒泡机制是个突破口。</p>
<p>这里直接给出<strong>最佳实践：利用事件冒泡机制来为DOM元素绑定事件</strong>。</p>
<ul>
<li><p>理由一：早期IE只有冒泡机制，统一使用冒泡机制来绑定事件，就解决了最棘手的IE浏览器兼容性问题了。</p></li>
<li><p>理由二：事件传播的冒泡阶段，最接近页面UI上看到的实际情况，由子元素逐级向父元素传播，更加直观并且容易理解。</p></li>
<li><p>理由三：对于动态添加的DOM元素，要直接为其绑定事件，只能推到元素创建后进行。但如果利用事件冒泡机制，不需要再为这个时间点所纠结。</p></li>
</ul>
<h2 id="articleHeader2">实例</h2>
<p>话不多说，直接上实例（下面的示例都不造轮子，直接用jquery了哈）。</p>
<p>假如现在有一个无序列表，需要在点击具体列表项时，于控制台打印该项的HTML内容。<br>思路是：想办法为DOM元素绑定事件 -&gt; 获取元素HTML -&gt; 输出到控制台。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul class=&quot;list&quot;>
    <li class=&quot;list-item&quot;>1</li>
    <li class=&quot;list-item&quot;>2</li>
    ...
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-item"</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-item"</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    ...
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<h2 id="articleHeader3">差劲的事件绑定：使用老掉牙的onclick属性</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul class=&quot;list&quot;>
    <li class=&quot;list-item&quot; onclick=&quot;handler(this)&quot;></li>
    <li class=&quot;list-item&quot; onclick=&quot;handler(this)&quot;></li>
    ...
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-item"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"handler(this)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-item"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"handler(this)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    ...
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function handler(e) {
    console.log($(e).html());
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handler</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log($(e).html());
}</code></pre>
<p>一不留神懒惰先生跑了出来：OK搞定，完成任务！就这样吧，能实现功能就可以了。</p>
<p><strong>思考：</strong><br>这是种最古老的事件绑定方式，没有做到JS和HTML的分离，非常不利于维护，是随着潮流要被淘汰的糟糕做法。</p>
<p>可是不禁感叹，如今还是会在某些中小型网站、教材、还有大学课堂上看到它们的身影。然后新手们纷纷模仿，从起点开始就走了不少弯路，我也是过来人（捂脸）。</p>
<h2 id="articleHeader4">不错的事件绑定：获取元素集合并绑定事件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.list-item').on('click', function() { // 获取元素集合并绑定事件
    console.log($(this).html());
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'.list-item'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 获取元素集合并绑定事件</span>
    <span class="hljs-built_in">console</span>.log($(<span class="hljs-keyword">this</span>).html());
};</code></pre>
<p>这次做到了JS和HTML的分离，先获取元素集合，再利用<code>jquery</code>的事件绑定方法<code>on()</code>，解决浏览器事件API的差异问题。</p>
<p><strong>思考：</strong><br>如果有100个列表项的话，<code>jquery</code>就会遍历100次，为匹配的元素集合都绑定一个<code>click</code>事件。<br>光这100次遍历和绑定操作，就是件非常消耗资源的事情。<br>再加上由于创建太多的事件监听，也会对页面性能有影响。</p>
<h2 id="articleHeader5">更好的事件绑定：利用冒泡机制监听父元素</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.list').on('click', 'li', function(event) { // 绑定事件到父节点
    console.log($(event.target).html()); // 注意操作对象是event.target还是this，下面会有详细说明哦
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'.list'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-string">'li'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{ <span class="hljs-comment">// 绑定事件到父节点</span>
    <span class="hljs-built_in">console</span>.log($(event.target).html()); <span class="hljs-comment">// 注意操作对象是event.target还是this，下面会有详细说明哦</span>
});</code></pre>
<p>优化后，将监听函数放到了父元素上，通过只监听父元素的一个事件，掌控了千千万万的列表项。<br>借助冒泡机制，事件绑定由100优化到1，就是这么愉快，哈哈哈。</p>
<h2 id="articleHeader6">注意点&amp;细节解析：</h2>
<p><strong>使用<code>on()</code>方法的筛选器</strong></p>
<p>这里用到了<code>on()</code>方法的第二个参数，这个参数是个筛选器，例如<code>li</code>，<code>&gt;li</code>，<code>.list-item</code>，<code>li.list-item</code>等。<br>当检测到点击事件是由这个筛选器匹配的元素传来的，就触发这个父节点的click事件回调函数。</p>
<p><strong>筛选器没有用<code>.list-item</code>而是<code>li</code></strong></p>
<p>因为如果把css类作为筛选器的话，<code>jquery</code>在执行时要把每个<code>event.target</code>的<code>class</code>属性去查一查，然后拆分后看看是不是有叫<code>list-item</code>。判断步奏多了很多。<br>本示例中，只使用<code>li</code>来筛选就已经满足我们的需求了，优化要从细节开始哦。</p>
<p><strong>注意回调函数中操作的是<code>this</code>还是<code>event.target</code></strong></p>
<p>因为当前是在父元素中绑定的事件，所以<code>this</code>默认指向的是父元素，并不是我们的列表项。</p>
<p><strong>但是这里要强调一点：</strong>如果使用<code>on()</code>方法中的筛选器自动筛选的话，<code>jquery</code>也会自动帮我们把<code>this</code>指向改成<code>event.target</code>，这时候<code>this</code>和<code>event.target</code>都同样指向的是列表项了，两个都可以用哦。</p>
<p>建议使用<code>event.target</code>，避免混淆，也可以让代码更加清晰啦。</p>
<p>如果不使用<code>jquery</code>在<code>on()</code>方法中提供的筛选器的话，也可以自己去判断冒泡过来的是不是li：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.list').on('click', function(event) {
    if (event.target.tagName === 'LI') { // 判断标签是不是li，注意tagName属性返回的是大写
        console.log($(event.target).html());
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'.list'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">if</span> (event.target.tagName === <span class="hljs-string">'LI'</span>) { <span class="hljs-comment">// 判断标签是不是li，注意tagName属性返回的是大写</span>
        <span class="hljs-built_in">console</span>.log($(event.target).html());
    }
});</code></pre>
<p>这样子无论是用<code>on()</code>方法的自动筛选，还是直接自己写代码判断，都可以统一使用<code>event.target</code>来获取冒泡阶段传播到此的具体列表项，我们就可以开心的去操作它啦。</p>
<h2 id="articleHeader7">结语：一切重在不满足于现状的精神</h2>
<p>这里介绍的只是几个小点，在前端开发中能优化的地方还有很多很多。<br>重要的是精神层面上的东西，必须不满足于现状、多思考、多注重细节，才能逼着自己一点点向前爬过去。</p>
<p>谢谢你看到了最后，大家一起加油！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【JS实用技巧】利用冒泡机制，减少事件绑定，优化页面性能

## 原文链接
[https://segmentfault.com/a/1190000008349969](https://segmentfault.com/a/1190000008349969)

