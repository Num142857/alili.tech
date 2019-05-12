---
title: '高性能迷你React框架anujs1.1.0发布' 
date: 2019-01-02 2:30:09
hidden: true
slug: jze31uw597d
categories: [reprint]
---

{{< raw >}}

                    
<p>本版本对setState与forceUpdate内部依赖的setStateImpl进行了重构，性能稳定在60pfs之上。并且将组件实例的所有内部方法与属性都改成以<code>___</code>开头。</p>
<p><span class="img-wrap"><img data-src="/img/bVTQUW?w=600&amp;h=492" src="https://static.alili.tech/img/bVTQUW?w=600&amp;h=492" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVTVnz?w=876&amp;h=536" src="https://static.alili.tech/img/bVTVnz?w=876&amp;h=536" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/RubyLouvre/anu" rel="nofollow noreferrer" target="_blank">https://github.com/RubyLouvre...</a></p>
<ol>
<li><p>disabled的元素不能触发点击事件</p></li>
<li><p>修正mouseenter/mouseleave在IE6－8中的BUG，涉及到relatedTarget的正确获取与LCA处理</p></li>
<li><p>简化alignVnode的逻辑，减少插入列队的生成</p></li>
<li><p>重构setStateImpl,实现以列队为基础的异步更新</p></li>
<li><p><code>_component</code>更名为<code>__component</code>, <code>_currentElement</code>更名为<code>__current</code></p></li>
<li><p>react/lib中添加一些简用的外围模块，如ReactComponentWithPureRenderMixin，shallowCompare，sliceChildren</p></li>
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
高性能迷你React框架anujs1.1.0发布

## 原文链接
[https://segmentfault.com/a/1190000010889145](https://segmentfault.com/a/1190000010889145)

