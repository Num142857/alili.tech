---
title: 'vue 组件使用中的细节点(你极有可能遇到但却不知所措小问题)' 
date: 2018-12-03 2:30:08
hidden: true
slug: ljy77yoqabh
categories: [reprint]
---

{{< raw >}}

                    
<h2>细节一</h2>
<h3>基础例子</h3>
<p><span class="img-wrap"><img data-src="/img/bV9jwk?w=481&amp;h=261" src="https://static.alili.tech/img/bV9jwk?w=481&amp;h=261" alt="clipboard.png" title="clipboard.png"></span></p>
<h3>运行结果</h3>
<p><span class="img-wrap"><img data-src="/img/bV9jwp?w=398&amp;h=171" src="https://static.alili.tech/img/bV9jwp?w=398&amp;h=171" alt="clipboard.png" title="clipboard.png"></span></p>
<p>以上大家都懂，这边就不多说，回到代码里，有时候我们需要 &lt;tbody&gt; 里面每一行是一个子组件，那我们代码可以怎么写呢？我们可以这样写，定义一个全局组件，如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV9jxz?w=487&amp;h=127" src="https://static.alili.tech/img/bV9jxz?w=487&amp;h=127" alt="clipboard.png" title="clipboard.png"></span></p>
<p>然后我们在 body 里面可以这么调用:</p>
<p><span class="img-wrap"><img data-src="/img/bV9jyb?w=402&amp;h=202" src="https://static.alili.tech/img/bV9jyb?w=402&amp;h=202" alt="clipboard.png" title="clipboard.png"></span></p>
<h3>运行结果</h3>
<p><span class="img-wrap"><img data-src="/img/bV9jyQ?w=925&amp;h=372" src="https://static.alili.tech/img/bV9jyQ?w=925&amp;h=372" alt="clipboard.png" title="clipboard.png"></span></p>
<p>可以看到 row 是有打印出来了，但它实际上里面没有任务内容，那我们的问题出在哪呢？回到代码我们发现我们在创建 vue 实例的时候没有指定要挂载的点，所以我们通过 el 来指定 vue 接管的 Dom ,如下:</p>
<p><span class="img-wrap"><img data-src="/img/bV9jz5?w=499&amp;h=148" src="https://static.alili.tech/img/bV9jz5?w=499&amp;h=148" alt="clipboard.png" title="clipboard.png"></span></p>
<h3>运行结果</h3>
<p><span class="img-wrap"><img data-src="/img/bV9jz6?w=857&amp;h=289" src="https://static.alili.tech/img/bV9jz6?w=857&amp;h=289" alt="clipboard.png" title="clipboard.png"></span></p>
<p>感觉上没有问题，但真的是这样吗？我们通过检查元素，查看DOM结构:</p>
<p><span class="img-wrap"><img data-src="/img/bV9jAA?w=1002&amp;h=489" src="https://static.alili.tech/img/bV9jAA?w=1002&amp;h=489" alt="clipboard.png" title="clipboard.png"></span></p>
<p>大家可以看到出错啦？正常的三个 &lt;tr&gt; 应该是在 &lt;tbody&gt;里面， 而现在跑到跟 &lt;tbody&gt; 同一层了，这是怎么回事呢？</p>
<p><strong>在H5的规范里面，要求我们 &lt;table&gt; 里面有 &lt;tbody&gt;, &lt;tbody&gt;里面必须得放 &lt;tr&gt;,而现在我们使用子组件里面写成 &lt;row&gt;, 所以我们的浏览器在解析的时候就会出问题。</strong></p>
<p>那么我们一旦遇到这种情况出现 bug 要怎么解呢？ 这时候我们可以借助 vue 提供的 is 属性来解决这个问题。很简单， &lt;tbody&gt; 里面只能写 &lt;tr&gt;, 那我们就都写 &lt;tr&gt;，可是实际上我们要显示 &lt;tr&gt; 并不是就真的只显示 &lt;tr&gt; 空的内容，我们需要显示 row 组件的内容，那怎么做？</p>
<p>我们可以在 &lt;tr&gt; 多一个属性is 让它等于 row, 如下:</p>
<p><span class="img-wrap"><img data-src="/img/bV9jCX?w=351&amp;h=218" src="https://static.alili.tech/img/bV9jCX?w=351&amp;h=218" alt="clipboard.png" title="clipboard.png"></span></p>
<p>这段代码的意思是:我要用一个组件，但是我不能直接写这个组件，所以我们写了一个 &lt;tr&gt;, 我们用 is 表示虽然我写的是 &lt;tr&gt;, 但它表示是 row 组件，这样能既能符合 H5 的规范又能显示我们组件的内容 ，程序就不会有 bug 了。</p>
<h3>运行结果</h3>
<p><span class="img-wrap"><img data-src="/img/bV9jEe?w=1150&amp;h=479" src="https://static.alili.tech/img/bV9jEe?w=1150&amp;h=479" alt="clipboard.png" title="clipboard.png"></span></p>
<p>一切正常。</p>
<blockquote>同样我们使用 ul, select 标签的时候，也可以用这种方法。</blockquote>
<h2>细节二</h2>
<h3>基础例子</h3>
<p><span class="img-wrap"><img data-src="/img/bV9jF5?w=439&amp;h=255" src="https://static.alili.tech/img/bV9jF5?w=439&amp;h=255" alt="clipboard.png" title="clipboard.png"></span></p>
<p>我们定义了一个组件 row，里面有段文本，如果我们想把这段文本单独提取出来用变量表示 ，那么你很有可能会这样写:</p>
<p><span class="img-wrap"><img data-src="/img/bV9jG3?w=408&amp;h=214" src="https://static.alili.tech/img/bV9jG3?w=408&amp;h=214" alt="clipboard.png" title="clipboard.png"></span></p>
<p>看似完美，在打开浏览器运行你会发现，bug 正向你招手:</p>
<p><span class="img-wrap"><img data-src="/img/bV9jHj?w=1358&amp;h=409" src="https://static.alili.tech/img/bV9jHj?w=1358&amp;h=409" alt="clipboard.png" title="clipboard.png"></span></p>
<p>主要意思是 data 是要一个函数，而不是一个对象，什么情况，在根组件，也就是最外层 vue 的实例，我们通过对象定义是 ok 的，但是在非根组件的子组件这样定义是不行滴。data 定义要求是一个函数，同时这个函数要求返回一个对象，如下:</p>
<p><span class="img-wrap"><img data-src="/img/bV9jH7?w=417&amp;h=252" src="https://static.alili.tech/img/bV9jH7?w=417&amp;h=252" alt="clipboard.png" title="clipboard.png"></span></p>
<h3>运行结果</h3>
<p><span class="img-wrap"><img data-src="/img/bV9jId?w=1239&amp;h=363" src="https://static.alili.tech/img/bV9jId?w=1239&amp;h=363" alt="clipboard.png" title="clipboard.png"></span></p>
<p>这样问题就解决啦。</p>
<blockquote>之所以这么定义，原因是一个子组件不像根组件只被调用一次，而是可以多次调用，那么每一个子组件的数据我们不希望和其它的子组件产生冲突或者说每个子组件都应该有一个自己的数据域，通过函数返回一个对象就可以实现这个需求。</blockquote>
<h2>细节三</h2>
<h3>基础例子</h3>
<p><span class="img-wrap"><img data-src="/img/bV9jJb?w=536&amp;h=321" src="https://static.alili.tech/img/bV9jJb?w=536&amp;h=321" alt="clipboard.png" title="clipboard.png"></span></p>
<p>运行，点击弹出click，没毛病。vue 不建议我们在代码里面操作 Dom, 但是在处理一些极其复杂的动画效果，我们还真得操作 Dom, 那么在 vue 中如何操作 Dom 呢？ 我们可以通过  ref 引用的方式，如下:</p>
<p><span class="img-wrap"><img data-src="/img/bV9jJ0?w=528&amp;h=89" src="https://static.alili.tech/img/bV9jJ0?w=528&amp;h=89" alt="clipboard.png" title="clipboard.png"></span></p>
<p>这时候我们有个需求，就是点击div 的时候，把里面的内容打印出来，我们可以通过引用获取div节点，然后打印div 里面的内容即可:</p>
<p><span class="img-wrap"><img data-src="/img/bV9jKX?w=536&amp;h=291" src="https://static.alili.tech/img/bV9jKX?w=536&amp;h=291" alt="clipboard.png" title="clipboard.png"></span></p>
<h3>运行结果</h3>
<p><span class="img-wrap"><img data-src="/img/bV9jK2?w=801&amp;h=170" src="https://static.alili.tech/img/bV9jK2?w=801&amp;h=170" alt="clipboard.png" title="clipboard.png"></span></p>
<blockquote>愿你成为终身学习者</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 组件使用中的细节点(你极有可能遇到但却不知所措小问题)

## 原文链接
[https://segmentfault.com/a/1190000014575076](https://segmentfault.com/a/1190000014575076)

