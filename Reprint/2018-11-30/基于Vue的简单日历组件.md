---
title: '基于Vue的简单日历组件' 
date: 2018-11-30 2:30:11
hidden: true
slug: nm4y4ktt8fd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">日历组件</h2>
<p>由于移动端项目中需要用到日历组件，网上找了下，没看到几个合适的，就尝试着自己写一个。然后发现也不是很复杂，目前只做了最基本的功能，大家也可以拿去做做二次开发。</p>
<p>基础效果如下图：<br><span class="img-wrap"><img data-src="/img/bVbaKGx?w=535&amp;h=422" src="https://static.alili.tech/img/bVbaKGx?w=535&amp;h=422" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>然后可以接受一个起始日期参数start-date，设置日历当前显示的年月。可以监听一个点击事件click-event，回调参数为当前点击的年月日。<br><span class="img-wrap"><img data-src="/img/bVbaKKY?w=387&amp;h=35" src="https://static.alili.tech/img/bVbaKKY?w=387&amp;h=35" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<calendar 
    @click-event=&quot;getDate&quot;
    :start-date=&quot;new Date(2015,7)&quot;>
</calendar>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;calendar 
    <span class="hljs-variable">@click</span>-event=<span class="hljs-string">"getDate"</span>
    <span class="hljs-symbol">:start-date=<span class="hljs-string">"new Date(2015,7)"</span>&gt;</span>
&lt;<span class="hljs-regexp">/calendar&gt;</span></code></pre>
<p>然后具体的代码地址在这里:<br><a href="https://github.com/wsh821592197/my-library/blob/master/comments/calendar.vue" rel="nofollow noreferrer" target="_blank">https://github.com/wsh8215921...</a></p>
<p>新手上路，大家多多指教</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Vue的简单日历组件

## 原文链接
[https://segmentfault.com/a/1190000014916960](https://segmentfault.com/a/1190000014916960)

