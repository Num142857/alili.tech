---
title: 'vuex 入门教程' 
date: 2019-01-15 2:30:12
hidden: true
slug: gm21xyc50x
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vuex是什么？
想必大家已经看过官方文档。就我的理解来说，可以把它当成一个全局对象，可以在全局对其操作state." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>vuex是什么？
想必大家已经看过官方文档。就我的理解来说，可以把它当成一个全局对象，可以在全局对其操作<span class="hljs-keyword">state</span>.</code></pre>
<h1 id="articleHeader0">vuex项目目录</h1>
<p><span class="img-wrap"><img data-src="/img/bVMX3G?w=189&amp;h=517" src="https://static.alili.tech/img/bVMX3G?w=189&amp;h=517" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1"><strong>State</strong></h1>
<p>保存了整个对象的状态，数据的格式需要根据业务需求给定。</p>
<p><span class="img-wrap"><img data-src="/img/bVMXUD?w=244&amp;h=107" src="https://static.alili.tech/img/bVMXUD?w=244&amp;h=107" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在这个小demo中a,b组件分别向c组件发送数据，所以定义了2个初始化数据；</p>
<h1 id="articleHeader2"><strong>Getters</strong></h1>
<p>一些简单或通用的操作可以抽取到getters上来，方便在应用中引用</p>
<p><span class="img-wrap"><img data-src="/img/bVMXUW?w=387&amp;h=248" src="https://static.alili.tech/img/bVMXUW?w=387&amp;h=248" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>比如：从c组件直接获取a,b组件发送过来的数据；分别定义了2个方法用来接收；<br><span class="img-wrap"><img data-src="/img/bVMXVk?w=485&amp;h=203" src="https://static.alili.tech/img/bVMXVk?w=485&amp;h=203" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以通过...mapGetters得到这2个方法发送的数据，也可以通过...mapState直接获取state里面的状态（图中注释部分）</p>
<h1 id="articleHeader3"><strong>Actions</strong></h1>
<p>所有数据的提交都在actions</p>
<p><span class="img-wrap"><img data-src="/img/bVMXV9?w=414&amp;h=184" src="https://static.alili.tech/img/bVMXV9?w=414&amp;h=184" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以通过图中方法触发子组件提交事件<br><span class="img-wrap"><img data-src="/img/bVMX0Y?w=485&amp;h=46" src="https://static.alili.tech/img/bVMX0Y?w=485&amp;h=46" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>commit是从对象解构出来方法，</p>
<p><span class="img-wrap"><img data-src="/img/bVMXWP?w=648&amp;h=206" src="https://static.alili.tech/img/bVMXWP?w=648&amp;h=206" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>通过commit把提交的数据传递给mutations</p>
<h1 id="articleHeader4"><strong>Mutations</strong></h1>
<p>通过commit提交过来的方法在<br><span class="img-wrap"><img data-src="/img/bVMXXd?w=396&amp;h=198" src="https://static.alili.tech/img/bVMXXd?w=396&amp;h=198" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>mutations继续加工（执行同步操作）</p>
<p>通过vuex的一个全局对象进行暴露</p>
<p><span class="img-wrap"><img data-src="/img/bVMXXu?w=487&amp;h=606" src="https://static.alili.tech/img/bVMXXu?w=487&amp;h=606" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>再把vuex.Store生成的实例挂载到根节点中<br><span class="img-wrap"><img data-src="/img/bVMXXy?w=603&amp;h=312" src="https://static.alili.tech/img/bVMXXy?w=603&amp;h=312" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader5">github源码地址:</h1>
<blockquote><p><a href="https://github.com/jeromehan/vuex-demo" rel="nofollow noreferrer" target="_blank">https://github.com/jeromehan/...</a> 如果您喜欢点个赞，您的点赞是我写下去的动力！</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuex 入门教程

## 原文链接
[https://segmentfault.com/a/1190000009248036](https://segmentfault.com/a/1190000009248036)

