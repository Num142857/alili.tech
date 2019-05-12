---
title: '高性能迷你React框架 anu1.2.3 发布' 
date: 2018-12-19 2:30:07
hidden: true
slug: 8gqokfcusgw
categories: [reprint]
---

{{< raw >}}

                    
<p>本版本主要添加了renderToNodeStream的支持</p>
<ol><li>解决PropTypes的share问题</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var check = function () {
        return check;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>var<span class="hljs-built_in"> check </span>= function () {
       <span class="hljs-built_in"> return </span>check;
};</code></pre>
<ol>
<li>修复utils的inherit BUG</li>
<li>ssr模块的renderToNodeStream的支持</li>
<li>Component添加isReactCompent方法，增强对第三方的支持</li>
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
高性能迷你React框架 anu1.2.3 发布

## 原文链接
[https://segmentfault.com/a/1190000012717097](https://segmentfault.com/a/1190000012717097)

