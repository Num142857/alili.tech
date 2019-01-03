---
title: '高性能迷你React框架anujs1.0.8发布' 
date: 2019-01-04 2:30:10
hidden: true
slug: b5vove72ugo
categories: [reprint]
---

{{< raw >}}

                    
<p>本版本由于得到业务线同学的大力支持，掀出许多问题，因此改进地方良多，为anujs在完美替换React的道路上前进了不少。现在anujs经测试可以运行于IE7中。至少怎么做可以参看官网，<a href="https://rubylouvre.github.io/anu/" rel="nofollow noreferrer" target="_blank">https://rubylouvre.github.io/...</a>， 而它在高级浏览器上使用了requestAnimationFrame，性能更进一步，真实反映本文的标题，又快又小。体积比之前更少了。</p>
<p><span class="img-wrap"><img data-src="/img/bVTcsT?w=744&amp;h=526" src="https://static.alili.tech/img/bVTcsT?w=744&amp;h=526" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>event.originalEvent更名为 event.nativeEvent</li>
<li>修正polyfill中forEach的BUG</li>
<li>移除scheduler模块</li>
<li>移除instanceMap模块</li>
<li>修正typeNumber在iE6－8下的BUG</li>
<li>eventSystem.addGlobalEventListener更名为eventSystem.addGlobalEvent</li>
<li>规避insertBfore在IE8下第二参数不能为 undefined的问题</li>
<li>修正ref延迟执行的BUG，组件所在的vnode如果有ref属性，那么它应该放到此组件的__pendingRefs数组中，而不是放在父组件的__pendingRefs数组<br>   此外__pendingRefs数组里的元素由对象改成函数</li>
<li>确保组件在componentDidMount钩子执行setState后，所有回调应延迟到componentDidUpdate外执行</li>
<li>确保mountComponent中实例应该尽快保存到vnode中</li>
<li>修正updateElement方法中只执行一次dangerouslySetInnerHTML的BUG</li>
<li>处理mouseenter/mouseleave的兼容问题</li>
<li>处理focus/blur的兼容问题</li>
</ol>
<p>使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i anujs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> anujs</code></pre>
<p>或者使用架手架 <a href="https://github.com/Levan-Du/anu-cli" rel="nofollow noreferrer" target="_blank">https://github.com/Levan-Du/a...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g anu-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> -g anu-cli</code></pre>
<p>webpack.config中如何代替原来用React编写的项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
   alias: {
      'react': 'anujs',
      'react-dom': 'anujs',
      'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',  //如果你在移动端用到了onTouchTap事件
   }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
   <span class="hljs-attribute">alias</span>: {
      <span class="hljs-string">'react'</span>: <span class="hljs-string">'anujs'</span>,
      <span class="hljs-string">'react-dom'</span>: <span class="hljs-string">'anujs'</span>,
      <span class="hljs-string">'react-tap-event-plugin'</span>: <span class="hljs-string">'anujs/lib/injectTapEventPlugin'</span>,  //如果你在移动端用到了onTouchTap事件
   }
},</code></pre>
<p>欢迎大家为anujs加星星与试用！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高性能迷你React框架anujs1.0.8发布

## 原文链接
[https://segmentfault.com/a/1190000010733637](https://segmentfault.com/a/1190000010733637)

