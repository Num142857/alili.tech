---
title: '高性能迷你React框架anujs1.1.1发布' 
date: 2019-01-01 2:30:07
hidden: true
slug: rp56ucie7ja
categories: [reprint]
---

{{< raw >}}

                    
<p>anujs1.1.1为了兼容国内最著名的UI库antd，在虚拟DOM树结构，ref机制，owner机制，svg的兼容上做了大量改进。到目前为止，只差两个组件没有兼容，相信下一个版本会搞定的。antd内部使用了大量的旧API与hack react的实现，因此兼容了antd，对其他比较正规的UI库，anujs也肯定能支持的。</p>
<p><span class="img-wrap"><img data-src="/img/bVUGb8?w=1140&amp;h=1148" src="https://static.alili.tech/img/bVUGb8?w=1140&amp;h=1148" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVUGba?w=1188&amp;h=738" src="https://static.alili.tech/img/bVUGba?w=1188&amp;h=738" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/RubyLouvre/anu" rel="nofollow noreferrer" target="_blank">https://github.com/RubyLouvre...</a></p>
<p>主要改良点：</p>
<ol>
<li><p>简化createClass</p></li>
<li><p>修正flattenHooks BUG， 如果hooks中只有一个函数，就不用再包一层</p></li>
<li><p>修改虚拟DOM树的实现，与官方React保持一致，即props.children现在是多种形态，延迟到diff时才创建用于比较的vchildren</p></li>
<li><p>修正disposeElement，如果存在dangerouslySetInnerHTML的情况，需要清空元素内部，不走遍历子虚拟DOM的分支</p></li>
<li><p>修正diffProps, SVG的元素是区分大小写 如viewBox preserveAspectRation</p></li>
<li><p>组件更新时，要检测context是否改变</p></li>
<li><p>为事件对象实现persist方法</p></li>
<li><p>修正unstable_renderSubtreeIntoContainer的回调的this指向问题</p></li>
<li><p>修正unmountComponentAtNode BUG， #text改为 #comment</p></li>
<li><p>修正cloneElement BUG， 确保children与_owner正确传入</p></li>
<li><p>修正ref机制，如果为字符串时，通过createStringRef方法将当前ref, owner传入，返回一个curry方法，在cloneElement时createStringRef创建的方法会再被整合到新ref方法的内部，确保旧的owner再次被更新</p></li>
<li><p>修正getNs方法的实现（原先是使用hash表进行穷举，但svg文档也有a, script ,style元素，导致无法区分）</p></li>
<li><p>用户在componentDidUpdate使用setState是不当操作，导致进入死循环，改用定时器减缓调用频率，防止页面卡死（官方React也存在类似的机制）</p></li>
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
高性能迷你React框架anujs1.1.1发布

## 原文链接
[https://segmentfault.com/a/1190000011086184](https://segmentfault.com/a/1190000011086184)

