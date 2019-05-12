---
title: 'antd（蚂蚁金服使用过程中遇到的小坑）' 
date: 2019-01-29 2:30:10
hidden: true
slug: gsepvhxuxvf
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">一、版本（^2.5.2）</h3>
<h4>1、引入antd.css（^2.5.2）</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { PropTypes } from 'react'
import 'antd/dist/antd.css'
function CoreLayout ({ children }) {
  return (
    <div className='user-content'>
      <div>
        {children}
      </div>
    </div>
  )
}
export default CoreLayout" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { PropTypes } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'antd/dist/antd.css'</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CoreLayout</span> (<span class="hljs-params">{ children }</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">'user-content'</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        {children}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  )
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> CoreLayout</code></pre>
<p><code>(1)</code>.可能会出现压缩运行不成功问题 比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="in ./~/css-loader!./~/style-loader!./~/css-loader?sourceMap!./~/postcss-loader!./~/antd/dist/antd.css Module build failed: Unknown word (5:1)`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">in</span> .<span class="hljs-regexp">/~/</span>css-loader!.<span class="hljs-regexp">/~/</span>style-loader!.<span class="hljs-regexp">/~/</span>css-loader?sourceMap!.<span class="hljs-regexp">/~/</span>postcss-loader!.<span class="hljs-regexp">/~/</span>antd<span class="hljs-regexp">/dist/</span>antd.css Module build failed: Unknown word (<span class="hljs-number">5</span>:<span class="hljs-number">1</span>)`</code></pre>
<p>其实是因为 在webpack.config中没有设置好css引入的目录，因为默认情况下我们只会引入<code>/src/</code>目录下的css，<br>但是antd的官方教程是要冲node_modules目录去引入的<br>所以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpackConfig.module.loaders.push({
  test: /\.css$/,
  include: [
    /src/,
    '/node_modules/antd/dist/'   //增加此项
  ],
  loader: 'style!css'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">webpackConfig</span><span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.loaders</span><span class="hljs-selector-class">.push</span>({
  <span class="hljs-attribute">test</span>: /\.css$/,
  include: [
    /src/,
    <span class="hljs-string">'/node_modules/antd/dist/'</span>   //增加此项
  ],
  loader: <span class="hljs-string">'style!css'</span>
})</code></pre>
<h4>2、时间设置方式（datePicker）（^2.5.2）</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<DatePicker ref='beginCreateTime' 
   value={beginCreateTimeValue ? moment(beginCreateTimeValue) : null} 
   onChange={this.getBeginCreateTime} size='default' 
/>
// 需要注意项： 1.dataPicker的value或者defaultValue都只接受 moment对象或者接受null
// 传入 null表示空值
// 控件本身自带的删除时间按钮可以清空pickerdate的值，我们手动传入null也能清空pickerdate的值
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;DatePicker <span class="hljs-keyword">ref</span>=<span class="hljs-string">'beginCreateTime'</span> 
   <span class="hljs-keyword">value</span>={beginCreateTimeValue ? moment(beginCreateTimeValue) : <span class="hljs-literal">null</span>} 
   onChange={<span class="hljs-keyword">this</span>.getBeginCreateTime} size=<span class="hljs-string">'default'</span> 
/&gt;
<span class="hljs-comment">// 需要注意项： 1.dataPicker的value或者defaultValue都只接受 moment对象或者接受null</span>
<span class="hljs-comment">// 传入 null表示空值</span>
<span class="hljs-comment">// 控件本身自带的删除时间按钮可以清空pickerdate的值，我们手动传入null也能清空pickerdate的值</span>
</code></pre>
<h4>3、defaultExpandAllRows={true} 不起作用（<a href="https://github.com/ant-design/ant-design/issues/4145" rel="nofollow noreferrer" target="_blank">github讨论地址</a>） （^2.6.0）</h4>
<p>应该是类似<code>value</code>和<code>defaultValue</code>的相似问题，而这个里<code>defaultExpandAllRows </code><br>就是像<code>defaultValue</code>那样 只在第一次渲染的时候起作用<br>而很多时候我们的数据初始是空的<br>解决方案如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {dataSource &amp;&amp; dataSource.length 
    ? <Table columns={columns} dataSource={dataSource} defaultExpandAllRows={true} indentSize={0}/> 
    : '暂无数据' }
//保证有数据的时候再渲染table
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code> {dataSource &amp;&amp; dataSource.length 
    ? &lt;Table columns={columns} dataSource={dataSource} defaultExpandAllRows={true} indentSize={<span class="hljs-number">0</span>}/&gt; 
    : <span class="hljs-string">'暂无数据'</span> }
//保证有数据的时候再渲染table
</code></pre>
<h4>3、设置在树形table中设置 colSpan出现排版异常（<a href="http://codepen.io/spademan/pen/JEoVrr" rel="nofollow noreferrer" target="_blank">demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="spademan/pen/JEoVrr" data-typeid="3">点击预览</button>）（^2.6.0）</h4>
<p>目前的解决方案是给相应的tr和td加指定的类<br>（1）设置跨行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  const columns = [{
    ...
    render: (text, row, index) => {
        const obj = {}
        obj.children = <span>{text}</span>
        if (xxx) {
            obj.props = {
              rowSpan: // 输入需要夸多少行的数字
            }
        }
        return obj
    }
 ....
  }]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-keyword">const</span> columns = [{
    ...
    render: <span class="hljs-function">(<span class="hljs-params">text, row, index</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> obj = {}
        obj.children = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
        <span class="hljs-keyword">if</span> (xxx) {
            obj.props = {
              <span class="hljs-attr">rowSpan</span>: <span class="hljs-comment">// 输入需要夸多少行的数字</span>
            }
        }
        <span class="hljs-keyword">return</span> obj
    }
 ....
  }]</code></pre>
<p>（2）第（1）个方案 可能在默认展开状态下是没有什么问题的<br>但是一旦 收起来 或者展开树形结构 就可能有问题<br> 这个时候就要结合</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const onExpand = (expaned, record) => {
      // 当前行的展开和关闭
      record.isChildExpand = expaned
    }
    
    // 然后 render函数中根据 isChildExpand来动态设置是否需要跨行 正常来说 收起来的时候是不需要跨行的，所以 设置colSpan = 0
    const columns = [{
    ...
    render: (text, row, index) => {
        const obj = {}
        obj.children = <span>{text}</span>
        if (xxx &amp;&amp; isChildExpand) {
           obj.props = {
              rowSpan: // 输入需要夸多少行的数字
            }
        }
        return obj
    }
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">const</span> onExpand = <span class="hljs-function">(<span class="hljs-params">expaned, record</span>) =&gt;</span> {
      <span class="hljs-comment">// 当前行的展开和关闭</span>
      record.isChildExpand = expaned
    }
    
    <span class="hljs-comment">// 然后 render函数中根据 isChildExpand来动态设置是否需要跨行 正常来说 收起来的时候是不需要跨行的，所以 设置colSpan = 0</span>
    <span class="hljs-keyword">const</span> columns = [{
    ...
    render: <span class="hljs-function">(<span class="hljs-params">text, row, index</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> obj = {}
        obj.children = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{text}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
        <span class="hljs-keyword">if</span> (xxx &amp;&amp; isChildExpand) {
           obj.props = {
              <span class="hljs-attr">rowSpan</span>: <span class="hljs-comment">// 输入需要夸多少行的数字</span>
            }
        }
        <span class="hljs-keyword">return</span> obj
    }
  </code></pre>
<p><code>解决方案暂时没有demo,上面的demo是排版有问题的demo,等官方解决吧</code><br><a href="https://github.com/ant-design/ant-design/issues/4485" rel="nofollow noreferrer" target="_blank">github讨论地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
antd（蚂蚁金服使用过程中遇到的小坑）

## 原文链接
[https://segmentfault.com/a/1190000007830998](https://segmentfault.com/a/1190000007830998)

