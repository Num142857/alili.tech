---
title: '高性能迷你React框架 anu1.2 发布，支持React16的三大特性' 
date: 2018-12-21 2:30:11
hidden: true
slug: hakp0dj68h8
categories: [reprint]
---

{{< raw >}}

                    
<p>anu已经有两个月没有发布了，经过1.1.5-pre, 1.1.5-pre2, 1.1.5-pre3, 1.1.5-pre4, 1.1.5-pre5, 1.1.5-pre6, 最终放弃了1.1.5, 改成1.2. 因为内部变动非常多，受控组件与非受控组件那块完全重写，只差一个case没有跑通（这部分的测试代码有2000多行）。支持React1.6&nbsp;的三大特征，组件支持返回数组，传送门与错误边界。</p>
<p>下面是新支持的React16特性</p>
<ol>
<li>ReactDOM.render的第一个参数可以是数组，字符串，数字，undefined, null, true, false。</li>
<li>React组件的render方法可以返回数组，字符串，数字，undefined, null, true, false.</li>
<li>对于undefined, null, true, false， React15是生成一个占位用的注释节点（nodeType为8），现在什么也不生成，完全靠算法实现对齐。</li>
<li>相邻的数字与字任串会合并成一个文本节点，比如说<code>&lt;div&gt;xxx{111}yyy&lt;/div&gt;</code>在React15中，div里面有3个文本节点，两个分界用的注释点，现在只有一个文本节点，其nodeValue为xxx111yyy，用于真实DOM的减少，性能大幅提升。</li>
<li>setState/forceUpdate的回调函数以前总在更新周期后才执行，现在提前到每个组件的componentDidMount/Update后执行。</li>
<li>生命周期顺序改变，先A.componentWillMount-&gt;B.componentWillUnmount-&gt;A.compountDidMount.</li>
<li>createPortal的事件冒泡是基于虚拟DOM进行冒泡的</li>
<li>跑通错误边界的1900多行的测试，这里的规则非常多，有空才详细介绍。有了它，React16成为对错误处理最完善的框架。</li>
<li>虚拟DOM的结构发生变化，每个节点都有return, child, sibling等描述自己位置的属性。<br>-return 指向父节点，类似于浏览器的parentNode, 取代之前的_hostParent<br>-child 指向第一个子节点，类似于浏览器的firstChild<br>-sibling 指向下一个节点，类拟于浏览器的nextSibling</li>
<li>componentDidUpdate现在只保留两个参数，lastProps与lastState</li>
</ol>
<p>其他变化与完善</p>
<ol>
<li>React.options添加了大量钩子，埋点于vnode与组件的各个生命周期之中。</li>
<li>重构findDOMNode,遇到注释节点返回null</li>
<li>重写受控组件（基于事件绑定）与非受控组件（基于属性监控）。</li>
<li>模仿React16，使用<code>stateNode属性</code>代替旧有的_hostNode与_instance。</li>
<li>React.Children与flattenChilden底层依赖的方法由<code>_flattenChildren</code>改为operateChildren，让其更具通用性，<br>flattenChilden更名为fiberizeChildren，产出一个<code>带链表结构的数组</code>。</li>
<li>新的架构：元素虚拟DOM与组件虚拟DOM都有自己的更新对象，简化匹配算法</li>
<li>简化Refs模块</li>
<li>修复更新虚拟DOM时，namespaceURI丢失的BUG</li>
<li>升级SSR版本</li>
<li>升级lib下的ReactTestUtils</li>
<li>测试case多达524个。</li>
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
        // 若要兼容 IE 请使用以下配置
        // 'react': 'qreact/dist/ReactIE',
        // 'react-dom': 'qreact/dist/ReactIE',
    
        // 如果引用了 prop-types 或 create-react-class
        // 需要添加如下别名
        'prop-types': 'qreact/lib/ReactPropTypes',
        'create-react-class': 'qreact/lib/createClass'
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
        // <span class="hljs-string">'react'</span>: <span class="hljs-string">'qreact/dist/ReactIE'</span>,
        // <span class="hljs-string">'react-dom'</span>: <span class="hljs-string">'qreact/dist/ReactIE'</span>,
    
        // 如果引用了 <span class="hljs-string">prop-types </span>或 <span class="hljs-built_in">create-react-class</span>
        // 需要添加如下别名
        <span class="hljs-string">'prop-types'</span>: <span class="hljs-string">'qreact/lib/ReactPropTypes'</span>,
        <span class="hljs-string">'create-react-class'</span>: <span class="hljs-string">'qreact/lib/createClass'</span>
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
高性能迷你React框架 anu1.2 发布，支持React16的三大特性

## 原文链接
[https://segmentfault.com/a/1190000012456079](https://segmentfault.com/a/1190000012456079)

