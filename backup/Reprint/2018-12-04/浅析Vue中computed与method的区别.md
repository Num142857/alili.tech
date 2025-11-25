---
title: '浅析Vue中computed与method的区别' 
date: 2018-12-04 2:30:05
hidden: true
slug: kixzsnwhzq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>其实官方文档对这个已经说的很清楚了，笔者不过是在其基础上进行归纳总结，各位看官还是先去<a href="https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7%E7%BC%93%E5%AD%98-vs-%E6%96%B9%E6%B3%95" rel="nofollow noreferrer">读一下官方文档</a>吧</blockquote>
<h2>1.computed区别于method的两个核心</h2>
<p>在官方文档中，强调了computed区别于method最重要的两点</p>
<ol>
<li>computed是<strong>属性调用</strong>，而methods是<strong>函数调用</strong>
</li>
<li>computed带有<strong>缓存功能</strong>，而methods不是</li>
</ol>
<p>OK，下面我们看一个具体的例子</p>
<pre><code>&lt;!--HTML部分--&gt;
&lt;div id="app"&gt;
    &lt;h1&gt;"{{"message"}}"&lt;/h1&gt;
    &lt;p class="test1"&gt;"{{"methodTest"}}"&lt;/p&gt;
    &lt;p class="test2-1"&gt;"{{"methodTest()"}}"&lt;/p&gt;
    &lt;p class="test2-2"&gt;"{{"methodTest()"}}"&lt;/p&gt;
    &lt;p class="test2-3"&gt;"{{"methodTest()"}}"&lt;/p&gt;
    &lt;p class="test3-1"&gt;"{{"computedTest"}}"&lt;/p&gt;
    &lt;p class="test3-2"&gt;"{{"computedTest"}}"&lt;/p&gt;
&lt;/div&gt;

&lt;!--script部分--&gt;
let vm = new Vue({
    el: '#app',
    data: {
        message: '我是消息，'
    },
    methods: {
        methodTest() {
            return this.message + '现在我用的是methods'
        }
    },
    computed: {
        computedTest() {
            return this.message + '现在我用的是computed'
        }
    }
})
</code></pre>
<h2>2. computed的属性调用</h2>
<p>细心的朋友可能已经发现了，在<code>HTML</code>的插值里</p>
<ol>
<li>computed定义的方法我们是以属性访问的形式调用的，<code>"{{"computedTest"}}"</code>
</li>
<li>但是methods定义的方法，我们必须要加上<code>()</code>来调用，如<code>"{{"methodTest()"}}"</code>，<strong>否则，视图会出现<code>test1</code>的情况</strong>，见下图</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bV8UtL?w=480&amp;h=76" src="https://static.alili.tech/img/bV8UtL?w=480&amp;h=76" alt="clipboard.png" title="clipboard.png"></span></p>
<h2>3. computed的缓存功能</h2>
<p>首先，我们要明白<strong>缓存</strong>究竟有什么用？<br>相比大家都知道<code>HTTP缓存</code>，其核心作用就是<strong>对一些服务端未更新的资源进行复用，避免一些无谓的请求，优化了用户的体验</strong></p>
<blockquote>对于computed也是一样的：</blockquote>
<p>在上面的例子中，<code>methods</code>定义的方法是以<strong>函数调用</strong>的形式来访问的，那么<code>test2-1,test2-2,test2-3</code>是<strong>反复地将<code>methodTest</code>方法运行了三遍</strong>，如果我们碰到一个场景，需要1000个<code>methodTest的返回值</code>，那么毫无疑问，这势必造成大量的<strong>浪费</strong><br>更恐怖的是，如果你更改了message的值，那么这1000个<code>methodTest</code>方法每一个又会重新计算。。。。</p>
<p>所以，官方文档才反复强调<strong>对于任何复杂逻辑，你都应当使用<code>计算属性</code></strong></p>
<blockquote><strong>computed依赖于data中的数据，只有在它的相关依赖数据发生改变时才会重新求值</strong></blockquote>
<p>如上例，在Vue实例化的时候，computed定义computedTest方法会做一次计算，返回一个值，<strong>在随后的代码编写中，只要<code>computedTest方法</code>依赖的<code>message数据</code>不发生改变，<code>computedTest方法</code>是不会重新计算的</strong>，也就是说<code>test3-1,test3-2</code>是直接拿到了<strong>返回值</strong>，而非是computedTest方法重新计算的结果。</p>
<p>这样的好处也是显而易见的，同样的，如果我们碰到一个场景，需要1000个<code>computedTest的返回值</code>，那么毫无疑问，这相对于<code>methods</code>而言，将大大地节约内存<br>哪怕你改变了message的值，<code>computedTest</code>也只会计算一次而已</p>
<h2>4. computed的其它说明</h2>
<ul>
<li>computed其实是既可以当做<strong>属性</strong>访问也可以当做<strong>方法</strong>访问</li>
<li>computed的由来有一个重要原因，就是防止文本插值中逻辑过重，导致不易维护</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅析Vue中computed与method的区别

## 原文链接
[https://segmentfault.com/a/1190000014478664](https://segmentfault.com/a/1190000014478664)

