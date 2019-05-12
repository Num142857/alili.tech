---
title: 'js 日期对象 31 号 setMonth 的锅' 
date: 2019-02-14 2:30:37
hidden: true
slug: z7csoly2zrj
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000016873908" src="https://static.alili.tech/img/remote/1460000016873908" alt="BiaoChenXuYing" title="BiaoChenXuYing" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">前言</h1>
<p>需求：获取当前日期的前一个月份</p>
<p><strong>当月有 31 天时，JS 日期对象 setMonth 问题</strong></p>
<h2 id="articleHeader1">1. 一般做法</h2>
<p>当前日期如果不是 31 号, 是没问题的，是 31 号就会有问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 比如今天是 2018-09-30 号，前一个月应该是 2018-08-30 
let now = new Date(new Date(&quot;2018-09-30&quot;).setMonth(new Date(&quot;2018-09-30&quot;).getMonth() - 1))
console.log('now :', now.toLocaleString())
// now : 2018/8/30 上午8:00:00

// 比如今天是 2018-10-31 号，前一个月没有 31 号，所以结果 2018-10-01：
let now = new Date(new Date(&quot;2018-10-31&quot;).setMonth(new Date(&quot;2018-10-31&quot;).getMonth() - 1))
console.log('now :', now.toLocaleString())
// now : 2018/10/1 上午8:00:00" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 比如今天是 2018-09-30 号，前一个月应该是 2018-08-30 </span>
<span class="hljs-keyword">let</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">"2018-09-30"</span>).setMonth(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">"2018-09-30"</span>).getMonth() - <span class="hljs-number">1</span>))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'now :'</span>, now.toLocaleString())
<span class="hljs-comment">// now : 2018/8/30 上午8:00:00</span>

<span class="hljs-comment">// 比如今天是 2018-10-31 号，前一个月没有 31 号，所以结果 2018-10-01：</span>
<span class="hljs-keyword">let</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">"2018-10-31"</span>).setMonth(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">"2018-10-31"</span>).getMonth() - <span class="hljs-number">1</span>))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'now :'</span>, now.toLocaleString())
<span class="hljs-comment">// now : 2018/10/1 上午8:00:00</span></code></pre>
<h2 id="articleHeader2">2. 正确的方法：</h2>
<h4>2.1 方法一</h4>
<p>原理： 当前时间减去当前时间的天数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function initLastMonth(date) {
            let monthDate = new Date(date);
            let newDate = new Date(monthDate.getTime() - 24 * 60 * 60 * 1000 * monthDate.getDate())
            console.log('newDate :', newDate.toLocaleString())
          return newDate
}
initLastMonth(&quot;2018-10-31&quot;)
//  newDate : 2018/9/30 上午8:00:00" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initLastMonth</span></span>(date) {
            let monthDate = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(date);
            let <span class="hljs-keyword">new</span><span class="hljs-type">Date</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>(monthDate.getTime() - <span class="hljs-number">24</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span> * monthDate.getDate())
            console.log(<span class="hljs-string">'newDate :'</span>, <span class="hljs-keyword">new</span><span class="hljs-type">Date</span>.toLocaleString())
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Date</span>
}
initLastMonth(<span class="hljs-string">"2018-10-31"</span>)
<span class="hljs-comment">//  newDate : 2018/9/30 上午8:00:00</span></code></pre>
<h4>2.2 方法二</h4>
<p>原理： setMonth 之前先 setDate(1)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function initLastMonth(date) {
            const now = new Date(date);
            now.setDate(1)
            now.setMonth(now.getMonth() - 1)
            console.log(now.toLocaleString()) 
            return now
        }
initLastMonth(&quot;2018-10-31&quot;)
// 2018/9/1 上午8:00:00" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initLastMonth</span>(<span class="hljs-params">date</span>) </span>{
            <span class="hljs-keyword">const</span> now = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-built_in">date</span>);
            now.setDate(<span class="hljs-number">1</span>)
            now.setMonth(now.getMonth() - <span class="hljs-number">1</span>)
            <span class="hljs-built_in">console</span>.log(now.toLocaleString()) 
            <span class="hljs-keyword">return</span> now
        }
initLastMonth(<span class="hljs-string">"2018-10-31"</span>)
<span class="hljs-comment">// 2018/9/1 上午8:00:00</span></code></pre>
<h1 id="articleHeader3">最后</h1>
<p>技术文章更新地址：<a href="https://github.com/biaochenxuying/blog" rel="nofollow noreferrer" target="_blank">github</a></p>
<p>对 <strong>全栈开发</strong> 有兴趣的朋友可以扫下方二维码关注我的公众号，我会不定期更新有价值的内容。</p>
<blockquote>微信公众号：<strong>BiaoChenXuYing</strong><br>分享 前端、后端开发等相关的技术文章，热点资源，全栈程序员的成长之路。</blockquote>
<p>关注公众号并回复 <strong>福利</strong> 便免费送你视频资源，绝对干货。</p>
<p>福利详情请点击：  <a href="https://mp.weixin.qq.com/s?__biz=MzA4MDU1MDExMg==&amp;mid=2247483711&amp;idx=1&amp;sn=1ffb576159805e92fc57f5f1120fce3a&amp;chksm=9fa3c0b0a8d449a664f36f6fdd017ac7da71b6a71c90261b06b4ea69b42359255f02d0ffe7b3&amp;token=1560489745&amp;lang=zh_CN#rd" rel="nofollow noreferrer" target="_blank">免费资源分享--Python、Java、Linux、Go、node、vue、react、javaScript</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016505245" src="https://static.alili.tech/img/remote/1460000016505245" alt="BiaoChenXuYing" title="BiaoChenXuYing" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js 日期对象 31 号 setMonth 的锅

## 原文链接
[https://segmentfault.com/a/1190000016873905](https://segmentfault.com/a/1190000016873905)

