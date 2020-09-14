---
title: '为什么使用v-for时必须添加唯一的key?' 
date: 2018-12-10 2:30:07
hidden: true
slug: poxbcn4n6pp
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>首次发表在<a href="http://wangyaxing.top/2018/03/18/2018-03-18-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8v-for%E6%97%B6%E5%BF%85%E9%A1%BB%E6%B7%BB%E5%8A%A0%E5%94%AF%E4%B8%80%E7%9A%84key/#more" rel="nofollow noreferrer" target="_blank">个人博客</a>
</blockquote>
<h2 id="articleHeader0">v-for中的key</h2>
<p>使用<code>v-for</code>更新已渲染的元素列表时,默认用<code>就地复用</code>策略;列表数据修改的时候,他会根据key值去判断某个值是否修改,如果修改,则重新渲染这一项,否则复用之前的元素;<br>我们在使用的使用经常会使用<code>index</code>(即数组的下标)来作为<code>key</code>,但其实这是不推荐的一种使用方法;</p>
<p>举个🌰</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const list = [
    {
        id: 1,
        name: 'test1',
    },
    {
        id: 2,
        name: 'test2',
    },
    {
        id: 3,
        name: 'test3',
    },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> list = [
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'test1'</span>,
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'test2'</span>,
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'test3'</span>,
    },
]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-for=&quot;(item, index) in list&quot; :key=&quot;index&quot; >"{{"item.name"}}"</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;div v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item, index) in list"</span> :key=<span class="hljs-string">"index"</span> &gt;"{{"item.name"}}"&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>上面这种是我们做项目中常用到的一种场景,因为不加key,vue现在直接报错,所以我使用index作为key;下面列举两种常见的数据更新情况</p>
<h3 id="articleHeader1">1.在最后一条数据后再加一条数据</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const list = [
    {
        id: 1,
        name: 'test1',
    },
    {
        id: 2,
        name: 'test2',
    },
    {
        id: 3,
        name: 'test3',
    },
    {
        id: 4,
        name: '我是在最后添加的一条数据',
    },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> list = [
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'test1'</span>,
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'test2'</span>,
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'test3'</span>,
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">4</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'我是在最后添加的一条数据'</span>,
    },
]</code></pre>
<p>此时前三条数据直接复用之前的,新渲染最后一条数据,此时用<code>index</code>作为<code>key</code>,没有任何问题;</p>
<h3 id="articleHeader2">2.在中间插入一条数据</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const list = [
    {
        id: 1,
        name: 'test1',
    },
    {
        id: 4,
        name: '我是插队的那条数据',
    }
    {
        id: 2,
        name: 'test2',
    },
    {
        id: 3,
        name: 'test3',
    },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> list = [
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'test1'</span>,
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">4</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'我是插队的那条数据'</span>,
    }
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'test2'</span>,
    },
    {
        <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'test3'</span>,
    },
]</code></pre>
<p>此时更新渲染数据,通过<code>index</code>定义的<code>key</code>去进行前后数据的对比,发现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="之前的数据                         之后的数据

key: 0  index: 0 name: test1     key: 0  index: 0 name: test1
key: 1  index: 1 name: test2     key: 1  index: 1 name: 我是插队的那条数据
key: 2  index: 2 name: test3     key: 2  index: 2 name: test2
                                                 key: 3  index: 3 name: test3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">之前的数据                         之后的数据

key: <span class="hljs-number">0</span>  index: <span class="hljs-number">0</span> name: test1     key: <span class="hljs-number">0</span>  index: <span class="hljs-number">0</span> name: test1
key: <span class="hljs-number">1</span>  index: <span class="hljs-number">1</span> name: test2     key: <span class="hljs-number">1</span>  index: <span class="hljs-number">1</span> name: 我是插队的那条数据
key: <span class="hljs-number">2</span>  index: <span class="hljs-number">2</span> name: test3     key: <span class="hljs-number">2</span>  index: <span class="hljs-number">2</span> name: test2
                                                 key: <span class="hljs-number">3</span>  index: <span class="hljs-number">3</span> name: test3</code></pre>
<p>通过上面清晰的对比,发现除了第一个数据可以复用之前的之外,另外三条数据都需要重新渲染;</p>
<p>是不是很惊奇,我明明只是插入了一条数据,怎么三条数据都要重新渲染?而我想要的只是新增的那一条数据新渲染出来就行了</p>
<p>最好的办法是使用数组中不会变化的那一项作为<code>key</code>值,对应到项目中,即每条数据都有一个唯一的<code>id</code>,来标识这条数据的唯一性;使用<code>id</code>作为<code>key</code>值,我们再来对比一下向中间插入一条数据,此时会怎么去渲染</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="之前的数据                         之后的数据

key: 1  id: 1 index: 0 name: test1     key: 1  id: 1 index: 0  name: test1
key: 2  id: 2 index: 1 name: test2     key: 4  id: 4 index: 1  name: 我是插队的那条数据
key: 3  id: 3 index: 2 name: test3     key: 2  id: 2 index: 2  name: test2
                                                         key: 3  id: 3 index: 3  name: test3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">之前的数据                         之后的数据

key: <span class="hljs-number">1</span>  id: <span class="hljs-number">1</span> index: <span class="hljs-number">0</span> name: test1     key: <span class="hljs-number">1</span>  id: <span class="hljs-number">1</span> index: <span class="hljs-number">0</span>  name: test1
key: <span class="hljs-number">2</span>  id: <span class="hljs-number">2</span> index: <span class="hljs-number">1</span> name: test2     key: <span class="hljs-number">4</span>  id: <span class="hljs-number">4</span> index: <span class="hljs-number">1</span>  name: 我是插队的那条数据
key: <span class="hljs-number">3</span>  id: <span class="hljs-number">3</span> index: <span class="hljs-number">2</span> name: test3     key: <span class="hljs-number">2</span>  id: <span class="hljs-number">2</span> index: <span class="hljs-number">2</span>  name: test2
                                                         key: <span class="hljs-number">3</span>  id: <span class="hljs-number">3</span> index: <span class="hljs-number">3</span>  name: test3</code></pre>
<p>现在对比发现只有一条数据变化了,就是<code>id</code>为4的那条数据,因此只要新渲染这一条数据就可以了,其他都是就复用之前的;</p>
<p>同理在react中使用map渲染列表时,也是必须加key,且推荐做法也是使用<code>id</code>,也是这个原因;</p>
<p>其实,真正的原因并不是vue和react怎么怎么,而是因为Virtual DOM 使用Diff算法实现的原因,</p>
<blockquote>下面大致从虚拟DOM的Diff算法实现的角度去解释一下</blockquote>
<p>vue和react的虚拟DOM的Diff算法大致相同，其核心是基于两个简单的假设：</p>
<ol>
<li>两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构。</li>
<li>同一层级的一组节点，他们可以通过唯一的id进行区分。基于以上这两点假设，使得虚拟DOM的Diff算法的复杂度从O(n^3)降到了O(n)。</li>
</ol>
<p>引用<a href="https://calendar.perfplanet.com/2013/diff/" rel="nofollow noreferrer" target="_blank">React’s diff algorithm</a>中的例子:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015299325" src="https://static.alili.tech/img/remote/1460000015299325" alt="diff1.jpg" title="diff1.jpg" style="cursor: pointer; display: inline;"></span><br>当某一层有很多相同的节点时，也就是列表节点时，Diff算法的更新过程默认情况下也是遵循以上原则。<br>比如一下这个情况：<br><span class="img-wrap"><img data-src="/img/remote/1460000015299326" src="https://static.alili.tech/img/remote/1460000015299326" alt="diff2.jpg" title="diff2.jpg" style="cursor: pointer; display: inline;"></span><br>我们希望可以在B和C之间加一个F，Diff算法默认执行起来是这样的：<br><span class="img-wrap"><img data-src="/img/remote/1460000015299327" src="https://static.alili.tech/img/remote/1460000015299327" alt="diff3.jpg" title="diff3.jpg" style="cursor: pointer; display: inline;"></span><br>即把C更新成F，D更新成C，E更新成D，最后再插入E，是不是很没有效率？</p>
<p>所以我们需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。<br><span class="img-wrap"><img data-src="/img/remote/1460000015299328" src="https://static.alili.tech/img/remote/1460000015299328" alt="diff4.jpg" title="diff4.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>所以一句话，key的作用主要是为了高效的更新虚拟DOM。另外vue中在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。</p>
<h2 id="articleHeader3">参考</h2>
<ul>
<li><a href="https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B" rel="nofollow noreferrer" target="_blank">vue官方文档</a></li>
<li><a href="https://reactjs.org/docs/lists-and-keys.html" rel="nofollow noreferrer" target="_blank">react官方文档</a></li>
<li><a href="https://github.com/livoras/blog/issues/13" rel="nofollow noreferrer" target="_blank">深度剖析：如何实现一个 Virtual DOM 算法</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为什么使用v-for时必须添加唯一的key?

## 原文链接
[https://segmentfault.com/a/1190000013810844](https://segmentfault.com/a/1190000013810844)

