---
title: '高性能迷你React框架anujs1.1.2发布' 
date: 2018-12-29 2:30:10
hidden: true
slug: 94pxxd0te57
categories: [reprint]
---

{{< raw >}}

                    
<p>anujs1.1.2在兼容官方React比以往更进一步，一共跑通293套测试，其中179套是官方React的测试。</p>
<p>在ref机制，owner机制，虚拟DOM更新机制，context传递机制，SVG生成策略上大大重构。是有史以来最多的更新级。但工作还没有完成，只是怕更新太多做了一次短暂的休整。</p>
<p>主要更新点：</p>
<ol>
<li>修正 onChange 事件</li>
<li>重构 diffProps 模块的实现</li>
<li>支持组件的isMounted方法</li>
<li>添加beforePatch , afterPatch钩子</li>
<li>添加lib/ReactInputSelection.js</li>
<li>统一所有操作虚拟DOM的方法的参数(mountXXX, updateXXX, alignXXX系列)</li>
</ol>
<blockquote><p>1 第一个参数为旧真实DOM或旧虚拟DOM<br>2 第二个参数为新虚拟DOM<br>3 第三个参数为父虚拟DOM(可能不存在，那么后面直接跟第四，第五)<br>4 第四个参数为上下文对象<br>5 第五个参数为任务调度系系统的列队</p></blockquote>
<ol>
<li>使用全新的方式获取元素的命名空间</li>
<li>上线全新的节点排序算法(diffChildren)</li>
<li>renderByAnu在全局渲染后应该置空CurrentOwner.cur, 防止影响其他虚拟DOM</li>
<li>完善createStringRef方法，应该能抛错与删除无用数据</li>
<li>上线全新的任务调度系统</li>
<li>重构unmountComponentAtNode方法</li>
<li>添加对两个虚拟DOM的引用都相同的情况下，检测子组件的contextType决定是否更新的策略</li>
<li>无状态组件支持模块模式（返回一个带生命周期钩子的纯对象，这些方法会像有状态组件那样被调用）</li>
<li>放松shouldComponentUpdate的限制，返回任何假值都阻止子孙更新</li>
<li>修正ref的更新方式</li>
<li>shouldComponentUpdate返回假值时，当前的虚拟DOM应该吸纳旧虚拟DOM的有用信息</li>
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
高性能迷你React框架anujs1.1.2发布

## 原文链接
[https://segmentfault.com/a/1190000011432444](https://segmentfault.com/a/1190000011432444)

