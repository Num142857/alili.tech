---
title: 'React系列——shouldComponentUpdate避免组件无意义渲染' 
date: 2019-01-18 2:30:35
hidden: true
slug: 4qz3pao72t3
categories: [reprint]
---

{{< raw >}}

                    
<p>state有时候很不听话，在某些时候，我不想他渲染，偏偏react非常智能的帮我们重复渲染。</p>
<p>比如最常见的就是传递的对象为空，组件依旧渲染了一次或者多次。</p>
<p>更多场景不举例了，对症下药。</p>
<p>shouldComponentUpdate是react提供的生命周期函数，他发生在接收到新的props的时候。<br>简单介绍一下各个生命周期函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillMount：组件挂载之前执行，只执行一次

componentDidMount: 组件渲染完成，只执行一次

=======================================================

componentWillRecevieProps: 组件将要接收新的props执行

shouldComponentUpdate: 判断组件是否应该重新渲染，默认是true

componentWillUpdate: 组件将要重新渲染

componentDidUpdate: 组件重新渲染完成

=======================================================

componentWillUnmount: 卸载组件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>componentWillMount：组件挂载之前执行，只执行一次

componentDidMount: 组件渲染完成，只执行一次

=======================================================

componentWillRecevieProps: 组件将要接收新的props执行

shouldComponentUpdate: 判断组件是否应该重新渲染，默认是true

componentWillUpdate: 组件将要重新渲染

componentDidUpdate: 组件重新渲染完成

=======================================================

componentWillUnmount: 卸载组件
</code></pre>
<p>组件生命周期是有顺序的，首先挂载组件，挂载成功完成第一次渲染，然后传递新的props，则会触发componentWillRecevieProps，执行重新渲染的周期，直至渲染完成。</p>
<h3 id="articleHeader0">简单版本</h3>
<p>在你的组件内部加上这段代码</p>
<p>component.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="shouldComponentUpdate(nextProps, nextState) {
    if (_.isEqual(this.props, nextProps) || !_.isEmpty(this.props)) {
        return false
    }
    return true
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>shouldComponentUpdate(nextProps, nextState) {
    <span class="hljs-keyword">if</span> (_.isEqual(<span class="hljs-keyword">this</span>.props, nextProps) || !_.isEmpty(<span class="hljs-keyword">this</span>.props)) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
}
</code></pre>
<p>这里用到了_.isEqual和_.isEmpty，_.isEqual判断当前传进来的值和下一次传递的值是不是相等，是则返回true，_.isEmpty判断当前传递进来的对象是不是为空，为空则返回true。</p>
<p>_.isEqual和_.isEmpty是 <a href="http://lodashjs.com/docs/#_isemptyvalue" rel="nofollow noreferrer" target="_blank">lodash</a> 插件里面的函数，这是个轻巧的JavaScript函数插件，可以处理多种常见的数据操作，当然还有一个更多功能的插件。</p>
<p>在你的react项目的入口js导入lodash，因为lodash函数是全局的，所以只需要在入口导入一次即可。</p>
<p>安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save lodash" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save lodash</span></code></pre>
<p>app.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ‘lodash’" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> ‘lodash’</code></pre>
<h3 id="articleHeader1">高级版本</h3>
<p>还有一种更加高级好用的写法，除了比较props之外，我们同时需要比较state是否更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
   return true
} else {
   return false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!_.isEqual(<span class="hljs-keyword">this</span>.props, nextProps) || !_.isEqual(<span class="hljs-keyword">this</span>.state, nextState)) {
   <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
} <span class="hljs-keyword">else</span> {
   <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}</code></pre>
<h3 id="articleHeader2">其他写法</h3>
<p>如果组件结构比较简单，你可以使用React.PureComponent的方式创建组件。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——shouldComponentUpdate避免组件无意义渲染

## 原文链接
[https://segmentfault.com/a/1190000008656863](https://segmentfault.com/a/1190000008656863)

