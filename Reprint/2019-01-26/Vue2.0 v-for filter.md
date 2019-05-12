---
title: 'Vue2.0 v-for filter' 
date: 2019-01-26 2:30:18
hidden: true
slug: us8olg5mpy
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue2.0 v-for filter列表过滤功能</h1>
<p>习惯使用angularjs的一定知道angularjs有一个ng-repeat filter的例子，可以很简单的过滤一个循环列表。而在使用VUE2.0的时候发现不能在v-for中使用filter功能。所以这里就来讨论一下如何实现这个列表过滤功能。</p>
<h2 id="articleHeader1">解决思路使用计算属性</h2>
<p>使用计算属性<br>app.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app5 = new Vue({
    el: '#app5',
    data: {
        shoppingList: [
            &quot;Milk&quot;, &quot;Donuts&quot;, &quot;Cookies&quot;, &quot;Chocolate&quot;, &quot;Peanut Butter&quot;, &quot;Pepto Bismol&quot;, &quot;Pepto Bismol (Chocolate flavor)&quot;, &quot;Pepto Bismol (Cookie flavor)&quot;
        ],
        key: &quot;&quot;
    },
    computed: {
        filterShoppingList: function () {
            // `this` points to the vm instance
            var key = this.key;
            var shoppingList = this.shoppingList;
            return shoppingList.filter(function (item) {
                return item.toLowerCase().indexOf(key.toLowerCase()) != -1
            });;
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> app5 = <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app5'</span>,
    data: {
        shoppingList: [
            <span class="hljs-string">"Milk"</span>, <span class="hljs-string">"Donuts"</span>, <span class="hljs-string">"Cookies"</span>, <span class="hljs-string">"Chocolate"</span>, <span class="hljs-string">"Peanut Butter"</span>, <span class="hljs-string">"Pepto Bismol"</span>, <span class="hljs-string">"Pepto Bismol (Chocolate flavor)"</span>, <span class="hljs-string">"Pepto Bismol (Cookie flavor)"</span>
        ],
        key: <span class="hljs-string">""</span>
    },
    computed: {
        filterShoppingList: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
            <span class="hljs-comment">// `this` points to the vm instance</span>
            <span class="hljs-keyword">var</span> key = <span class="hljs-keyword">this</span>.key;
            <span class="hljs-keyword">var</span> shoppingList = <span class="hljs-keyword">this</span>.shoppingList;
            <span class="hljs-keyword">return</span> shoppingList.filter(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(item)</span> </span>{
                <span class="hljs-keyword">return</span> item.toLowerCase().indexOf(key.toLowerCase()) != <span class="hljs-number">-1</span>
            });;
        }
    }
})</code></pre>
<p>app.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app5&quot;>
        <h2>Vue-for</h2>
        <ul>
            <li v-for=&quot;item in shoppingList&quot;>
                "{{" item "}}"
            </li>
        </ul>
        <h2>Vue-for filter实现</h2>
        <ul>
            Filter Key<input type=&quot;text&quot; v-model=&quot;key&quot;>   
            <li v-for=&quot;item in filterShoppingList&quot;>
                "{{" item "}}"
            </li>
        </ul>        
    </div>    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app5"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Vue-for<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in shoppingList"</span>&gt;</span>
                </span><span class="hljs-template-variable">"{{" item "}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Vue-for filter实现<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            Filter Key<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"key"</span>&gt;</span>   
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in filterShoppingList"</span>&gt;</span>
                </span><span class="hljs-template-variable">"{{" item "}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>        
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>    </span></code></pre>
<p>最终效果实现了根据关键字来过滤列表的功能。<br><span class="img-wrap"><img data-src="/img/bVJzSu?w=432&amp;h=103" src="https://static.alili.tech/img/bVJzSu?w=432&amp;h=103" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0 v-for filter

## 原文链接
[https://segmentfault.com/a/1190000008441958](https://segmentfault.com/a/1190000008441958)

