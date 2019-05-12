---
title: '谈谈JS中的函数劫持' 
date: 2019-02-03 2:30:39
hidden: true
slug: 8txeuyn3gb
categories: [reprint]
---

{{< raw >}}

                    
<p>说到劫持，第一反应可能是什么不好的东西。函数劫持并不邪恶，关键是看使用的人。虽然这个概念在前端领域使用较少，但是在安全领域、自定义业务等场景下还是有一定的使用价值的。所以，这一篇文章将会和大家一起去了解一下JS中的函数劫持是什么，有什么用。</p>
<h2 id="articleHeader0">基本概念</h2>
<p>函数劫持，顾名思义，即在一个函数运行之前把它劫持下来，添加我们想要的功能。当这个函数实际运行的时候，它已经不是原本的函数了，而是带上了被我们添加上去的功能。这也是我们常见的<code>钩子函数</code>的原理之一。</p>
<p>乍一看上去，这很像是函数的改写。函数的改写也可以理解为是函数劫持的一种，但是这种方式太恶心了。作为一个劫持者，在绑票获得好处以后也应该遵守职业道德，把人原封不动地还回去，所以我们得在合适的地方把函数原本的功能给重新调用回来。</p>
<p>推而广之，其实“劫持”这一概念我们经常会遇到，比方说某网站被运营商劫持了，在浏览该网站的时候会弹出运营商的广告。</p>
<h2 id="articleHeader1">举例分析</h2>
<p>现在我们来举个简单的例子，劫持一下<code>alert()</code>函数，为它增添一点小小的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let warn = alert
window.alert = (t) => {
    if (confirm('How are you?')) warn(t)
}

alert('Help me...!!!')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>let warn = alert
window<span class="hljs-selector-class">.alert</span> = (t) =&gt; {
    <span class="hljs-keyword">if</span> (confirm(<span class="hljs-string">'How are you?'</span>)) warn(t)
}

<span class="hljs-function"><span class="hljs-title">alert</span><span class="hljs-params">(<span class="hljs-string">'Help me...!!!'</span>)</span></span></code></pre>
<p>可以打开开发者工具尝试一下这个例子，你会发现只有你在<code>confirm</code>里面点击了OK，才会弹出<code>Help me...!!!</code>。</p>
<p>接下来我们把这部分的内容封装一下，成为一个通用的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const hijack = (obj, method, fun) => {
  let orig = obj[method]
  obj[method] = fun(orig)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>const hijack = (obj, method, <span class="hljs-function"><span class="hljs-keyword">fun</span>) =<span class="hljs-title">&gt;</span></span> {
  let orig = obj[method]
  obj[method] = <span class="hljs-function"><span class="hljs-keyword">fun</span>(<span class="hljs-title">orig</span></span>)
}</code></pre>
<p>首先我们定义了一个<code>hijack</code>函数，它会先把原函数给保存下来，然后执行自定义函数，而原函数将会在自定义函数内部进行调用。</p>
<p>然后我们来劫持<code>confirm()</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hijack(window, 'confirm', (orig) => {
  return (text) => {
    alert('HELP ME PLZ!!!')
    if (orig.call(this, text)) {
      alert('YOU SEEMS FINE AND I AM LEAVING, GOOD BYE!')
    } else {
      alert('HOLD ON! I AM COMING!!')
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>hijack(<span class="hljs-name">window</span>, 'confirm', (<span class="hljs-name">orig</span>) =&gt; {
  return (<span class="hljs-name">text</span>) =&gt; {
    alert('HELP ME PLZ!!!')
    if (<span class="hljs-name">orig</span>.call(<span class="hljs-name">this</span>, text)) {
      alert('YOU SEEMS FINE AND I AM LEAVING, GOOD BYE!')
    } else {
      alert('HOLD ON! I AM COMING!!')
    }
  }
})</code></pre>
<p>这段函数的功能很简单就不详细说明了，直接调用<code>confirm()</code>你就知道了：<br><a href="http://codepen.io/jrainlau/pen/LRbOVm" rel="nofollow noreferrer" target="_blank">codepen例子</a><button class="btn btn-xs btn-default ml10 preview" data-url="jrainlau/pen/LRbOVm" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader2">反劫持</h2>
<p>新建一个页面，打开你的开发者工具控制台，输入<code>alert</code>，你会看到这样的输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function alert() { [native code] }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">alert</span><span class="hljs-params">()</span> </span>{ [<span class="hljs-keyword">native</span> code] }</code></pre>
<p>然后使用本文开头的那段代码，把<code>alert()</code>劫持一下，再重新在控制台输入<code>alert</code>，你会看到这样的输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function (t) => {
    if (confirm('How are you?')) warn(t)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">t</span>) =&gt; </span>{
    <span class="hljs-keyword">if</span> (confirm(<span class="hljs-string">'How are you?'</span>)) warn(t)
}</code></pre>
<p>通过上述的例子可以知道，要看一个函数是否被劫持了，只需要直接把它打印出来即可。针对系统原生的函数，<code>[native code]</code>即代表它是纯净无污染的。</p>
<h2 id="articleHeader3">函数劫持的作用</h2>
<p>除了为函数增加功能以外，还能够利用函数劫持去追踪恶意用户的信息。一般的XSS攻击会先利用<code>alert()</code>等能够输出信息的方法进行测试，这时候我们可以先对原生<code>alert()</code>进行劫持，向其输入追踪信息的代码，最后才把原函数释放出去。当恶意用户在测试<code>alert()</code>的时候就会立即被我们追踪，而他本人却无从察觉。</p>
<h2 id="articleHeader4">后记</h2>
<p>关于JS的函数劫持，也不是什么新鲜的东西，只是在最近的工作中遇到了这个知识点感觉比较陌生，所以花了一些时间进行了研究，并把结果记录下来。如果发现有什么错漏的地方欢迎指正！</p>
<p>感谢你的阅读，欢迎关注我的专栏，我将不定期分享自己的学习体验，开发心得，搬运墙外的干货。下次见啦！</p>
<hr>
<blockquote><p>参考资料：<br><a href="http://blog.shenqh.com/2015/02/12/the-Italian-job-hijacked-the-javascript-function/" rel="nofollow noreferrer" target="_blank">javascript 函数劫持 | 神奇辉</a><br><a href="http://www.cnblogs.com/st-leslie/p/5391465.html" rel="nofollow noreferrer" target="_blank">JavaScript函数劫持- 谢灿勇</a><br><a href="http://stackoverflow.com/questions/10273309/need-to-hook-into-a-javascript-function-call-any-way-to-do-this" rel="nofollow noreferrer" target="_blank">Need to hook into a javascript function call, any way to do this?</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
谈谈JS中的函数劫持

## 原文链接
[https://segmentfault.com/a/1190000006967018](https://segmentfault.com/a/1190000006967018)

