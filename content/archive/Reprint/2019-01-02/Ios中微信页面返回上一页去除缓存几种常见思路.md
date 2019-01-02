---
title: 'Ios中微信页面返回上一页去除缓存几种常见思路' 
date: 2019-01-02 2:30:09
hidden: true
slug: n6vhq3ra3wq
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>这篇文章主要讲解决思路，不对各种概念进行过多讲解。</p>
<h3 id="articleHeader1">问题描述</h3>
<p>开发微信H5页面的时候，在Ios微信内置浏览器中点击返回按钮返回上一页时，上一页面不会被刷新。<br>在浏览器缓存机制中，在返回上一页的操作中， html/js/css/接口等动静态资源不会重新请求，但是js会重新加载。但在Ios微信页面中js也会保存上一页面最后执行的状态，不会重新执行js。<br>使用这种模式缓存机制可以加快渲染速度，但是部分数据需要经常展示和编辑的情况下回导致不同步。比如“详情页”跳转到“编辑页”，在“编辑页”中修改数据后返回到详情页中，“详情页”数据展示并未进行同步修改。</p>
<h3 id="articleHeader2">产生原因</h3>
<p>这里提到一个概念，<em>浏览器前进/后退缓存</em>，（Backward/Forward Cache，BF Cache），当然也有人叫disk Cache。<br>BF Cache 是一种浏览器优化，HTML标准并未指定其如何进行缓存，因此缓存行为是各浏览器实现不尽相同。<br>由于不是Http缓存，所以通过头文件缓存设置no-cache是无效的。当然也不能以Http缓存机制来理解BF Cache。</p>
<h3 id="articleHeader3">解决思路</h3>
<p>从网上看了几种比较常见的解决思路，下面简单讲解。</p>
<h4>设置浏览历史当前记录</h4>
<p>history.replaceState方法的参数与pushState方法一模一样，区别是它修改浏览历史中当前纪录。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var href = location.href;
var time = new Date().getTime();
href += href.indexOf('?') > -1 ? ('&amp;time='+time) : ('?time=' + time);

history.replaceState({}, &quot;title&quot;, href);
// 比如当前页面地址为http://www.a.com; 通过history.replaceState修改后当前地址会变为http://www.a.com?time=xxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tcl"><code>var href = location.href;
var <span class="hljs-keyword">time</span> = new Date().getTime();
href += href.indexOf(<span class="hljs-string">'?'</span>) &gt; <span class="hljs-number">-1</span> ? (<span class="hljs-string">'&amp;time='</span>+<span class="hljs-keyword">time</span>) : (<span class="hljs-string">'?time='</span> + <span class="hljs-keyword">time</span>);

<span class="hljs-keyword">history</span>.replaceState({}, <span class="hljs-string">"title"</span>, href);
// 比如当前页面地址为<span class="hljs-keyword">http</span>://www.a.com; 通过<span class="hljs-keyword">history</span>.replaceState修改后当前地址会变为<span class="hljs-keyword">http</span>://www.a.com?<span class="hljs-keyword">time</span>=xxx</code></pre>
<p>网上这种解决思路比较多，实际情况中并不可行。<br>原因：Ios微信中调整到下一页面后并未将上一页面修改的url保持在历史记录中，以代码为例，返回上一页并未返回到<strong> <a href="http://www.a.com?time=xxx" rel="nofollow noreferrer" target="_blank">http://www.a.com?time=xxx</a> </strong>， <br>而是返回到<strong> <a href="http://www.a.com" rel="nofollow noreferrer" target="_blank">http://www.a.com</a> </strong>中。</p>
<h4>通过时间差来判断是否需要重置</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var prev = parseInt(new Date().getTime() / 1000);
var now = prev;

window.setInterval(function() {
    now = parseInt(new Date().getTime() / 1000);
    
    // 当前步骤与上一步骤时间差超过1秒，表示页面已经跳转过
    // 时间差需要与间隔时间相对应
    if (now - prev > 1) {
        location.reload();
    } else {
        prev = now;
    }
// 间隔时间设置为1秒
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> prev = <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() / <span class="hljs-number">1000</span>);
<span class="hljs-keyword">var</span> now = prev;

<span class="hljs-built_in">window</span>.setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    now = <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() / <span class="hljs-number">1000</span>);
    
    <span class="hljs-comment">// 当前步骤与上一步骤时间差超过1秒，表示页面已经跳转过</span>
    <span class="hljs-comment">// 时间差需要与间隔时间相对应</span>
    <span class="hljs-keyword">if</span> (now - prev &gt; <span class="hljs-number">1</span>) {
        location.reload();
    } <span class="hljs-keyword">else</span> {
        prev = now;
    }
<span class="hljs-comment">// 间隔时间设置为1秒</span>
}, <span class="hljs-number">1000</span>);</code></pre>
<p>原理：通过判断当前步骤与上一步骤的时间差来判断是否需要更新<br>缺点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="间隔轮询时间差长度设置为多久比较好，不好掌控；
通过setInterval设置的间隔时间差并不是很精确；
并且两个页面之间的反复切换速度非常迅速的情况下也许会出现监测不到的现象。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>间隔轮询时间差长度设置为多久比较好，不好掌控；
通过<span class="hljs-built_in">set</span>Interval设置的间隔时间差并不是很精确；
并且两个页面之间的反复切换速度非常迅速的情况下也许会出现监测不到的现象。
</code></pre>
<h4>通过localStorage控制是否需要刷新</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localStorage.setItem(&quot;need-refresh&quot;, true);
$(function () {
    var needRefresh = localStorage.getItem(&quot;need-refresh&quot;);
    if(needRefresh) {
        localStorage.removeItem(&quot;need-refresh&quot;);
        location.reload();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>localStorage.setItem(<span class="hljs-string">"need-refresh"</span>, <span class="hljs-literal">true</span>);
$(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> needRefresh = localStorage.getItem(<span class="hljs-string">"need-refresh"</span>);
    <span class="hljs-keyword">if</span>(needRefresh) {
        localStorage.removeItem(<span class="hljs-string">"need-refresh"</span>);
        location.reload();
    }
});</code></pre>
<p>原理：通过获取浏览器保存的key来决定页面是否需要刷新<br>缺点：当页面关闭再重新打开时，key（也就是代码中的need-refresh）key值为true，会导致页面加载两次，造成重复渲染</p>
<h4>通过pageshow事件决定是否需要刷新页面</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('pageshow', function(e) {
    // 通过persisted属性判断是否存在 BF Cache
    if (e.persisted) {
        location.reload();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'pageshow'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">// 通过persisted属性判断是否存在 BF Cache</span>
    <span class="hljs-keyword">if</span> (e.persisted) {
        location.reload();
    }
});</code></pre>
<p>原理：pageShow事件在页面显示即会触发，无论页面是否来自BF Cache。通过检测persisted属性即可判断是否存在 BF Cache 行为。<br>优点：大部分浏览器都支持pageShow方法与persisted属性，并且需要的代码量只需要短短4行即可。<br>缺点：每种浏览器中BF Cache的机制是不同的，部分浏览器中的Bf Cache还是会重新执行js代码，会造成重复渲染效果。当然这篇文章中我们只考虑Ios中的微信页面， 所以是不存在问题。</p>
<h3 id="articleHeader4">参考资料</h3>
<p><a href="https://segmentfault.com/a/1190000004486640">关于浏览器缓存</a><br><a href="http://harttle.com/2017/03/12/backward-forward-cache.html" rel="nofollow noreferrer" target="_blank">浏览器前进/后退缓存（BF Cache）</a><br><a href="http://frontenddev.org/link/browser-page-to-enter-and-leave-the-event-pageshow-pagehide.html" rel="nofollow noreferrer" target="_blank">浏览器页面进入、离开事件：pageshow/pagehide</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ios中微信页面返回上一页去除缓存几种常见思路

## 原文链接
[https://segmentfault.com/a/1190000010934250](https://segmentfault.com/a/1190000010934250)

