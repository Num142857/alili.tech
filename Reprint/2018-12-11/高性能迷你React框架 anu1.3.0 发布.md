---
title: '高性能迷你React框架 anu1.3.0 发布' 
date: 2018-12-11 2:30:10
hidden: true
slug: jih1hq1cf37
categories: [reprint]
---

{{< raw >}}

                    
<p>anujs1.3.0是一款高性能React-like框架，是目前世界上对React16兼容最好的迷你库。</p>
<p>自React16起，相继推出createContext，createPortal, createRef与createResource等新API，表明官方正积极由纯view库向大而全的框架演变，它将会越来越好用。一些迷你库可能跟不上步伐，现在也只有anujs有这实力跟进。</p>
<p>1.3.0的改进如下：</p>
<ol>
<li>支持React16.3的createContext new API</li>
<li>添加大量React.Fragment测试，修正一些边缘的BUG</li>
<li>升级diff机制，由新旧vnode进行比较，改成fiber与新vnode进行比较，用新vnode的数据更新fiber与视图</li>
<li>添加input[type=search]的onChange事件支持</li>
<li>修正传送门在antd3.0的一个边缘BUG（重复插入两次，导致文本节点消失）</li>
<li>
<p>属性名与方法名大改动，与React16的Fiber靠近</p>
<ul>
<li>
<code>vnode.vtype</code> --&gt; fiber.tag</li>
<li>
<code>instance.__isStateless</code> --&gt; fiber._isStateless</li>
<li>
<code>updater</code> --&gt; fiber</li>
<li>
<code>updater.vnode</code> --&gt; fiber._reactInternalFiber</li>
<li>
<code>updater.willReceive</code> --&gt; fiber._willReceive</li>
<li>
<code>updater.children</code> --&gt; fiber._children</li>
<li>
<code>updater.isMounted()</code> --&gt; fiber._isMounted()</li>
<li>
<code>updater.insertCarrier</code> --&gt; fiber._mountCarrier</li>
<li>
<code>updater.insertPoint</code> --&gt; fiber._mountPoint</li>
<li>
<code>updater.parentContext</code> --&gt; fiber._unmaskedContext</li>
<li>
<code>getChildContext</code> --&gt; getUnmaskedContext</li>
<li>
<code>getContextByTypes</code> --&gt; 为getMaskedContext</li>
<li>
<code>CompositeUpdater.js</code> --&gt; ComponentFiber.js`</li>
<li>
<code>DOMUpdater.js</code> --&gt; HostFiber.js</li>
</ul>
</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bV1cTd?w=198&amp;h=173" src="https://static.alili.tech/img/bV1cTd?w=198&amp;h=173" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
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
        // 若要兼容 IE 请使用以下配置
        // 'react': 'anujs/dist/ReactIE',
        // 'react-dom': 'anujs/dist/ReactIE',
    
        // 如果引用了 prop-types 或 create-react-class
        // 需要添加如下别名
        'prop-types': 'anujs/lib/ReactPropTypes',
        'create-react-class': 'anujs/lib/createClass'
        //如果你在移动端用到了onTouchTap事件
        'react-tap-event-plugin': 'anujs/lib/injectTapEventPlugin',  
   }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code><span class="hljs-string">resolve:</span> {
   <span class="hljs-string">alias:</span> {
      <span class="hljs-string">'react'</span>: <span class="hljs-string">'anujs'</span>,
      <span class="hljs-string">'react-dom'</span>: <span class="hljs-string">'anujs'</span>,
        // 若要兼容 <span class="hljs-string">IE </span>请使用以下配置
        // <span class="hljs-string">'react'</span>: <span class="hljs-string">'anujs/dist/ReactIE'</span>,
        // <span class="hljs-string">'react-dom'</span>: <span class="hljs-string">'anujs/dist/ReactIE'</span>,
    
        // 如果引用了 <span class="hljs-string">prop-types </span>或 <span class="hljs-built_in">create-react-class</span>
        // 需要添加如下别名
        <span class="hljs-string">'prop-types'</span>: <span class="hljs-string">'anujs/lib/ReactPropTypes'</span>,
        <span class="hljs-string">'create-react-class'</span>: <span class="hljs-string">'anujs/lib/createClass'</span>
        //如果你在移动端用到了<span class="hljs-string">onTouchTap事</span>件
        <span class="hljs-string">'react-tap-event-plugin'</span>: <span class="hljs-string">'anujs/lib/injectTapEventPlugin'</span>,  
   }
},</code></pre>
<p>欢迎大家为anujs加星星与试用！！！</p>
<p><a href="https://github.com/RubyLouvre/anu" rel="nofollow noreferrer" target="_blank">https://github.com/RubyLouvre...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高性能迷你React框架 anu1.3.0 发布

## 原文链接
[https://segmentfault.com/a/1190000013560673](https://segmentfault.com/a/1190000013560673)

