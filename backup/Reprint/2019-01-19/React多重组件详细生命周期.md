---
title: 'React多重组件详细生命周期' 
date: 2019-01-19 2:30:09
hidden: true
slug: vzuq2l30jj
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">目标</h3>
<p>React中内部组件生命周期的运行方式。</p>
<h3 id="articleHeader1">生命周期</h3>
<p><strong>类调用:</strong><br>此过程仅在类创建时被一次，即无论创建多少个ReactElement，此过程均只会执行一次</p>
<ul><li><p>getDefaultProps</p></li></ul>
<p><strong>实例化:</strong><br>此过程仅执行一次，执行完毕后，React组件真正被渲染到DOM中<br>期间执行生命周期函数如下：</p>
<ul>
<li><p>getInitialState</p></li>
<li><p>componentWillMount</p></li>
<li><p>render</p></li>
<li><p>componentDidMount</p></li>
</ul>
<p><strong>变更</strong> </p>
<p>此过程会在<code>this.state</code>或<code>this.props</code>变更时执行<br>期间执行生命周期函数如下：</p>
<p><code>this.state</code>变更</p>
<ul>
<li><p>shouldComponentUpdate</p></li>
<li><p>componentWillUpdate</p></li>
<li><p>render</p></li>
<li><p>componentDidUpdate</p></li>
</ul>
<p><code>this.props</code>变更</p>
<ul>
<li><p>componentWillReceiveProps</p></li>
<li><p>shouldComponentUpdate</p></li>
<li><p>componentWillUpdate</p></li>
<li><p>render</p></li>
<li><p>componentDidUpdate</p></li>
</ul>
<p><strong>卸载</strong><br>此过程在组件销毁前调用一次期间执行生命周期函数如下：</p>
<ul><li><p>componentWillUnmount</p></li></ul>
<p>整个生命周期所涉及的方法如图所示：<br><span class="img-wrap"><img data-src="/img/bVKqAV?w=673&amp;h=725" src="https://static.alili.tech/img/bVKqAV?w=673&amp;h=725" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">测试多组件生命周期转换</h3>
<h4>实例</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Super>
    <Sub_1 />
    <Sub_2 />
</Super>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;Super&gt;</span>
    <span class="hljs-section">&lt;Sub_1 /&gt;</span>
    <span class="hljs-section">&lt;Sub_2 /&gt;</span>
<span class="hljs-section">&lt;/Super&gt;</span></code></pre>
<h4>页面加载后：</h4>
<p><span class="img-wrap"><img data-src="/img/bVKqCm?w=243&amp;h=285" src="https://static.alili.tech/img/bVKqCm?w=243&amp;h=285" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>更新期</h4>
<p><span class="img-wrap"><img data-src="/img/bVKqCI?w=250&amp;h=271" src="https://static.alili.tech/img/bVKqCI?w=250&amp;h=271" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>卸载期</h4>
<p><span class="img-wrap"><img data-src="/img/bVKqCS?w=257&amp;h=196" src="https://static.alili.tech/img/bVKqCS?w=257&amp;h=196" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>原文来自：<a href="http://www.cnblogs.com/hhhyaaon/p/5807310.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/hhhyaa...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React多重组件详细生命周期

## 原文链接
[https://segmentfault.com/a/1190000008643109](https://segmentfault.com/a/1190000008643109)

