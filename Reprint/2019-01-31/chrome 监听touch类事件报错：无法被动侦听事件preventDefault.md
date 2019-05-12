---
title: 'chrome 监听touch类事件报错：无法被动侦听事件preventDefault' 
date: 2019-01-31 2:31:16
hidden: true
slug: wcpq8hjw1us
categories: [reprint]
---

{{< raw >}}

                    
<p>先上错误信息：</p>
<blockquote><p>Unable to preventDefault inside passive event listener due to target being treated as passive. See <a href="https://www.chromestatus.com/features/5093566007214080" rel="nofollow noreferrer" target="_blank">https://www.chromestatus.com/...</a></p></blockquote>
<p>一个简单的页面只有这么段js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener('touchstart', function(event) {
    event.preventDefault();
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'touchstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    event.preventDefault();
}, <span class="hljs-literal">false</span>);</code></pre>
<p>报的一个好错误，真是日了狗了，一直这么写的代码，什么情况？<br>原来，是新版chrome，给这个preventDefault返回了naive，不再是清除浏览器默认行为了。<br>那这怎么搞？<br>现在mdn上搜索一番：<br>event.cancelable 浏览器默认行为是否可以被禁用<br>event.defaultPrevented 浏览器默认行为是否已经被禁用<br>好像mdn上的event.preventDefault()方法还没更新到最新<br>那这就可以解决问题了，如果event.cancelable=false，是什么意思？不让开发者主动去禁用么？<br>但是event.defaultPrevented也是false，这个又怎么说？明明是没有清除默认行为，却又禁止清除默认行为！！！</p>
<p>好吧，我是一个渺小的开发者，我只能该自己的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener('touchstart', function(event) {
    // 判断默认行为是否可以被禁用
    if (event.cancelable) {
        // 判断默认行为是否已经被禁用
        if (!event.defaultPrevented) {
            event.preventDefault();
        }
    }
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>document.addEventListener(<span class="hljs-string">'touchstart'</span>, function(<span class="hljs-keyword">event</span>) {
    <span class="hljs-comment">// 判断默认行为是否可以被禁用</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">event</span>.cancelable) {
        <span class="hljs-comment">// 判断默认行为是否已经被禁用</span>
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">event</span>.defaultPrevented) {
            <span class="hljs-keyword">event</span>.preventDefault();
        }
    }
}, <span class="hljs-literal">false</span>);</code></pre>
<p>本人资历尚浅，无法给各大社区提这个小意见</p>
<p>不过，这样一来，好像不用我们在手动清除默认行为了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
chrome 监听touch类事件报错：无法被动侦听事件preventDefault

## 原文链接
[https://segmentfault.com/a/1190000007621605](https://segmentfault.com/a/1190000007621605)

