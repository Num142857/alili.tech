---
title: '关于this.setState更新的问题' 
date: 2019-01-14 2:30:07
hidden: true
slug: 11e6yio83a7
categories: [reprint]
---

{{< raw >}}

                    
<p>this.setState是异步，所以在this.setState之后立即调用this.state是获取不到最新的数据的，那么怎么获取最新的数据呢？下面介绍三个方法：</p>
<p>1.回调函数callback</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({
  val: this.state.val+1
}, () => {
  console.log(this.state.val)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>this.<span class="hljs-built_in">set</span>State({
  val: this.<span class="hljs-keyword">state</span>.val+<span class="hljs-number">1</span>
}, () =&gt; {
  console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>.val)
});</code></pre>
<p>2.componentDidUpdate</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidUpdate(){
    console.log(this.state.val);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>componentDidUpdate(){
    console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>.val);
}</code></pre>
<p>在this.setState之后去componentDidUpdate函数中调用，此时的this.state已经更新</p>
<p>3.将this.setState放入setTimeout函数中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let self = this;
setTimeout(function () {
  self.setState({
    val:self.state.val+1
  });
  console.log(self.state.val);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>let <span class="hljs-literal">self</span> = this;
<span class="hljs-built_in">set</span>Timeout(function () {
  <span class="hljs-literal">self</span>.<span class="hljs-built_in">set</span>State({
    val:<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span>.val+<span class="hljs-number">1</span>
  });
  console.<span class="hljs-keyword">log</span>(<span class="hljs-literal">self</span>.<span class="hljs-keyword">state</span>.val);
})</code></pre>
<p>在setTimeout函数中，在this.setState之后this.state是立即更新的，所以也可以获取到更新后的数据。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于this.setState更新的问题

## 原文链接
[https://segmentfault.com/a/1190000009373718](https://segmentfault.com/a/1190000009373718)

