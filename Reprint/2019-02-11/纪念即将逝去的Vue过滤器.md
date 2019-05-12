---
title: '纪念即将逝去的Vue过滤器' 
date: 2019-02-11 2:30:49
hidden: true
slug: r87uphs8k4g
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000006766247" src="https://static.alili.tech/img/remote/1460000006766247" alt="pic" title="pic" style="cursor: pointer; display: inline;"></span></p>
<p>在这个教程中，我们将会通过几个例子，了解和学习VueJs的过滤器。我们参考了一些比较完善的过滤器，比如orderBy 和 filterBy。而且我们可以链式调用过滤器，一个接一个过滤。因此，我们可以定义我们自己的过滤器在我们的Vue实例中。</p>
<p>阅读这个教程的前提是你对Vue已经有了基本的语法基础。</p>
<h3 id="articleHeader0">VueJs中的过滤器基础</h3>
<p>过滤器是一个通过输入数据，能够及时对数据进行处理并返回一个数据结果的简单函数。Vue有很多很便利的过滤器，可以参考官方文档，<a href="http://cn.vuejs.org/api/#%E8%BF%87%E6%BB%A4%E5%99%A8" rel="nofollow noreferrer" target="_blank">http://cn.vuejs.org/api/#过滤器</a>，过滤器通常会使用管道标志 “ | ”， 比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" "{{" msg | uppercase  "}}"

  // 'abc' => 'ABC'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> "{{" msg | uppercase  "}}"

  <span class="hljs-comment">// 'abc' =&gt; 'ABC'</span></code></pre>
<p>在上述的例子中，在插值的时候，使用了Vue的一个uppercase过滤器，msg可以是直接写死，写成"{{" ‘abc’ | uppercase  "}}"，也可以利用用户输入来改变msg的值。</p>
<blockquote><p>uppercase过滤器 : 将输入的字符串转换成大写字母的过滤器。</p></blockquote>
<h3 id="articleHeader1">链式过滤</h3>
<p>VueJs允许你链式调用过滤器，简单的来说，就是一个过滤器的输出成为下一个过滤器的输入，然后再次过滤。接下来，我们可以想象一个比较简答的例子，使用了Vue的 filterBy + orderBy 过滤器来过滤所有商品products。过滤出来的产品是属于电器类商品，并且按电器字母排序。</p>
<blockquote>
<p>filterBy过滤器 : 过滤器的值必须是一个数组，filterBy + 过滤条件。<br>过滤条件是：‘string || function’ + in ‘optionKeyName’</p>
<p>orderBy过滤器 : 过滤器的值必须是一个数组，orderBy + 过滤条件。<br>过滤条件是：‘string || array ||function’ +  ‘order ≥ 0 为升序 ||  order &lt; 0 为降序’</p>
</blockquote>
<p>接下来，我们可以看下第二个例子：<br>我们有一个商品数组products，我们希望遍历这个数组，并把他们打印成一张清单，这个用v-for很容易实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;product in products&quot;>
      "{{" product.name | capitalize "}}" - "{{" product.price | currency "}}"
</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"product in products"</span>&gt;
      "{{" product.name | capitalize "}}" - "{{" product.price | currency "}}"
&lt;<span class="hljs-regexp">/li&gt;</span></code></pre>
<blockquote><p>capitalize过滤器 : 将输入的字符串首字母转换成大写字母的过滤器。<br> currency过滤器 : 将输入的数字转换成现金的过滤器。可以跟上货币符号（默认$）和保留的小数位（默认2）。</p></blockquote>
<p>利用上面的两个过滤器，能够很好的把一个json数组的商品清单格式化成通熟易懂的商品价格清单。</p>
<p>如果只想要电器类商品，可以在v-for上加过滤条件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;product in products | filterBy 'electronics' in 'category' &quot;>
      "{{" product.name | capitalize "}}" - "{{" product.price | currency "}}"
</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"product in products | filterBy 'electronics' in 'category' "</span>&gt;
      "{{" product.name | capitalize "}}" - "{{" product.price | currency "}}"
&lt;<span class="hljs-regexp">/li&gt;</span></code></pre>
<p>上面的例子，就是用filterBy 过滤在 'category'中含有'electronics' 关键字的列表，返回的列表就是只含有 'electronics' 关键字的列表。</p>
<p>如果想要多个搜索条件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;product in products | filterBy 'electronics' in 'category'  'name' &quot;>
      "{{" product.name | capitalize "}}" - "{{" product.price | currency "}}"
</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"product in products | filterBy 'electronics' in 'category'  'name' "</span>&gt;
      "{{" product.name | capitalize "}}" - "{{" product.price | currency "}}"
&lt;<span class="hljs-regexp">/li&gt;</span></code></pre>
<p>上面的例子，就是用filterBy 过滤在 'category' 和 'name' 中含有'electronics' 关键字的列表。</p>
<p>最后我们还需要将这个列表用字母进行排序。我们可以在 filterBy 过滤器的基础上，链式调用orderBy 过滤器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
       <li v-for=&quot;product in products
                   | filterBy 'electronics' in 'category'
                   | orderBy  'name' &quot;
       >
            "{{" product.name | capitalize "}}" - "{{" product.price | currency "}}"
      </li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;ul&gt;
       <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"product in products
                   | filterBy 'electronics' in 'category'
                   | orderBy  'name' "</span>
       &gt;</span>
            "{{" product.name | capitalize "}}" - "{{" product.price | currency "}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/ul&gt;</span></code></pre>
<p>orderBy 的排序方式默认是升序，如果想要降序，只需要加一个小于0的参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;product in products
           | filterBy 'electronics' in 'category'
           | orderBy  'name'  -1 &quot;
>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"product in products
           | filterBy 'electronics' in 'category'
           | orderBy  'name'  -1 "</span>
&gt;</code></pre>
<h3 id="articleHeader2">自定义过滤器</h3>
<p>虽然VueJs给我们提供了很多强有力的过滤器，但有时候还是不够。值得庆幸的，Vue给我们提供了一个干净简洁的方式来定义我们自己的过滤器，之后我们就可以利用管道 “ | ” 来完成过滤。</p>
<p>定义一个全局的自定义过滤器，需要使用Vue.filter()构造器。这个构造器需要两个参数。</p>
<blockquote><p>Vue.filter() Constructor Parameters:<br>1.filterId: 过滤器ID，用来做为你的过滤器的唯一标识；<br>2.filter function: 过滤器函数，用一个function来接收一个参数，之后再将接收到的参数格式化为想要的数据结果。</p></blockquote>
<p>回到之前的例子：<br>现在设想我们有一个网上商城，并给我们的所有商品打五折。</p>
<p>为了完成这个例子，我们需要完成的是</p>
<ul>
<li><p>使用Vue.filter()构造器创建一个过滤器叫做discount</p></li>
<li><p>输入商品的原价，能够返回其打五折之后的折扣价</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  Vue.filter( 'discount' , function(value) {
        return value  * .5 ;
  });

  new Vue({
        el : 'body',
        data : {
              products : [
                    {name: 'microphone', price: 25, category: 'electronics'},
                    {name: 'laptop case', price: 15, category: 'accessories'},
                    {name: 'screen cleaner', price: 17, category: 'accessories'},
                    {name: 'laptop charger', price: 70, category: 'electronics'},
                    {name: 'mouse', price: 40, category: 'electronics'},
                    {name: 'earphones', price: 20, category: 'electronics'},
                    {name: 'monitor', price: 120, category: 'electronics'}
              ]
        }
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  Vue.filter( <span class="hljs-string">'discount'</span> , <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> value  * <span class="hljs-number">.5</span> ;
  });

  <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span> : <span class="hljs-string">'body'</span>,
        <span class="hljs-attr">data</span> : {
              <span class="hljs-attr">products</span> : [
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'microphone'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'electronics'</span>},
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'laptop case'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">15</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'accessories'</span>},
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'screen cleaner'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">17</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'accessories'</span>},
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'laptop charger'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">70</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'electronics'</span>},
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'mouse'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">40</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'electronics'</span>},
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'earphones'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">20</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'electronics'</span>},
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'monitor'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">120</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'electronics'</span>}
              ]
        }
  });</code></pre>
<p>现在就可以像使用Vue自带的过滤器一样使用自定义过滤器了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
      <li v-for=&quot;product in products&quot;>
           "{{" product.name | capitalize "}}" - "{{" product.price | discount | currency "}}"
      </li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;ul&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"product in products"</span>&gt;</span>
           "{{" product.name | capitalize "}}" - "{{" product.price | discount | currency "}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/ul&gt;</span></code></pre>
<p>上面的html代码将会输出打了五折之后的所有商品的清单列表。</p>
<p>那如果我们想要的是任意折扣呢？我们应该在discount过滤器里增加一个折扣数值参数，改造一下我们的过滤器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  Vue.filter( 'discount' , function(value,discount) {
        return value  * ( discount / 100 ) ;
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  Vue.filter( <span class="hljs-string">'discount'</span> , <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,discount</span>) </span>{
        <span class="hljs-keyword">return</span> value  * ( discount / <span class="hljs-number">100</span> ) ;
  });</code></pre>
<p>然后重新调用我们的过滤器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
      <li v-for=&quot;product in products&quot;>
           "{{" product.name | capitalize "}}" - "{{" product.price | discount 25 | currency "}}"
      </li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;ul&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"product in products"</span>&gt;</span>
           "{{" product.name | capitalize "}}" - "{{" product.price | discount 25 | currency "}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/ul&gt;</span></code></pre>
<p>我们也可以在我们Vue实例里构造我们的过滤器，这样构造的好处是，这样就不会影响到其他不需要用到这个过滤器的Vue实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  new Vue({
        el : 'body',
        data : {
              products : [
                    {name: 'microphone', price: 25, category: 'electronics'},
                    {name: 'laptop case', price: 15, category: 'accessories'},
                    {name: 'screen cleaner', price: 17, category: 'accessories'},
                    {name: 'laptop charger', price: 70, category: 'electronics'},
                    {name: 'mouse', price: 40, category: 'electronics'},
                    {name: 'earphones', price: 20, category: 'electronics'},
                    {name: 'monitor', price: 120, category: 'electronics'}
              ]
        },
        filters: {
              discount : function(value, discount){
                    return value * ( discount / 100 );
              }
        }
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span> : <span class="hljs-string">'body'</span>,
        <span class="hljs-attr">data</span> : {
              <span class="hljs-attr">products</span> : [
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'microphone'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">25</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'electronics'</span>},
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'laptop case'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">15</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'accessories'</span>},
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'screen cleaner'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">17</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'accessories'</span>},
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'laptop charger'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">70</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'electronics'</span>},
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'mouse'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">40</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'electronics'</span>},
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'earphones'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">20</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'electronics'</span>},
                    {<span class="hljs-attr">name</span>: <span class="hljs-string">'monitor'</span>, <span class="hljs-attr">price</span>: <span class="hljs-number">120</span>, <span class="hljs-attr">category</span>: <span class="hljs-string">'electronics'</span>}
              ]
        },
        <span class="hljs-attr">filters</span>: {
              <span class="hljs-attr">discount</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value, discount</span>)</span>{
                    <span class="hljs-keyword">return</span> value * ( discount / <span class="hljs-number">100</span> );
              }
        }
  });</code></pre>
<p>定义在全局就能在所有的实例中调用过滤器，如果定义在了实例里就在实例里调用过滤器。</p>
<h3 id="articleHeader3">结束语</h3>
<p>多亏了简洁的管道过滤器构造器，我们不仅可以调用它原生的过滤器，也可以自定义属于我们自己的过滤器。最近Vue2.0引起来前端一波热烈的讨论。从尤大的github上看到了<a href="https://github.com/vuejs/vue/wiki/2.0-features" rel="nofollow noreferrer" target="_blank">2.0和1.0的区别</a> </p>
<p>Vue2.0想要把filter去掉。不过我想，如果是用1.0的朋友还是很需要用到过滤器的 : )</p>
<p><a href="https://github.com/AppianZ/Close2Vue" rel="nofollow noreferrer" target="_blank">github地址</a><br><a href="https://github.com/AppianZ/Close2Vue" rel="nofollow noreferrer" target="_blank">https://github.com/AppianZ/Close2Vue</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
纪念即将逝去的Vue过滤器

## 原文链接
[https://segmentfault.com/a/1190000005027001](https://segmentfault.com/a/1190000005027001)

