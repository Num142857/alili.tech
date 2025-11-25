---
title: 'vue 实践心得和技巧（一）' 
date: 2019-02-06 2:30:08
hidden: true
slug: fksofk0s2mm
categories: [reprint]
---

{{< raw >}}

                    
<p>原文： <a href="https://github.com/Coffcer/Blog/issues/2" rel="nofollow noreferrer" target="_blank">https://github.com/Coffcer/Bl...</a></p>
<p>这个系列记录我在一年vue开发中总结的一些经验和技巧。</p>
<h2 id="articleHeader0">利用Object.freeze()提升性能</h2>
<p>Object.freeze()是ES5新增的特性，可以冻结一个对象，防止对象被修改。</p>
<p>vue 1.0.18+对其提供了支持，对于data或vuex里使用freeze冻结了的对象，vue不会做getter和setter的转换。</p>
<p>如果你有一个巨大的数组或Object，并且确信数据不会修改，使用Object.freeze()可以让性能大幅提升。在我的实际开发中，这种提升大约有5~10倍，倍数随着数据量递增。</p>
<p>并且，Object.freeze()冻结的是值，你仍然可以将变量的引用替换掉。举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p v-for=&quot;item in list&quot;>"{{" item.value "}}"</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list"</span>&gt;</span>"{{" item.value "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    data: {
        // vue不会对list里的object做getter、setter绑定
        list: Object.freeze([
            { value: 1 },
            { value: 2 }
        ])
    },
    created () {
        // 界面不会有响应
        this.list[0].value = 100;

        // 下面两种做法，界面都会响应
        this.list = [
            { value: 100 },
            { value: 200 }
        ];
        this.list = Object.freeze([
            { value: 100 },
            { value: 200 }
        ]);
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">data</span>: {
        <span class="hljs-comment">// vue不会对list里的object做getter、setter绑定</span>
        list: <span class="hljs-built_in">Object</span>.freeze([
            { <span class="hljs-attr">value</span>: <span class="hljs-number">1</span> },
            { <span class="hljs-attr">value</span>: <span class="hljs-number">2</span> }
        ])
    },
    created () {
        <span class="hljs-comment">// 界面不会有响应</span>
        <span class="hljs-keyword">this</span>.list[<span class="hljs-number">0</span>].value = <span class="hljs-number">100</span>;

        <span class="hljs-comment">// 下面两种做法，界面都会响应</span>
        <span class="hljs-keyword">this</span>.list = [
            { <span class="hljs-attr">value</span>: <span class="hljs-number">100</span> },
            { <span class="hljs-attr">value</span>: <span class="hljs-number">200</span> }
        ];
        <span class="hljs-keyword">this</span>.list = <span class="hljs-built_in">Object</span>.freeze([
            { <span class="hljs-attr">value</span>: <span class="hljs-number">100</span> },
            { <span class="hljs-attr">value</span>: <span class="hljs-number">200</span> }
        ]);
    }
})</code></pre>
<p>vue的文档没有写上这个特性，但这是个非常实用的做法，对于纯展示的大数据，都可以使用Object.freeze提升性能。</p>
<h2 id="articleHeader1">使用 vm.$compile 编译dom</h2>
<p>$compile函数可以用来手动调用vue的方式来编译dom。在你需要处理某个jQuery插件生成的html或者服务端返回的html的时候，这个函数可以派上用场。但注意这是个私有api，随时都有可能变动，并且这种做法有违vue的理念。仅在不得已的时候使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    data: {
        value: 'demo'
    },
    created () {
        let dom = document.createElement('div');
        dom.innerHTML = '"{{" value "}}"';
        this.$compile(dom);
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-string">'demo'</span>
    },
    created () {
        <span class="hljs-keyword">let</span> dom = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
        dom.innerHTML = <span class="hljs-string">'"{{" value "}}"'</span>;
        <span class="hljs-keyword">this</span>.$compile(dom);
    }
})</code></pre>
<h2 id="articleHeader2">合理使用track-by="$index"</h2>
<p>track-by是vue为循环提供的优化方法，可以复用多次v-for中id相同的dom。如果你的数据没有一个唯一的id，也可以选择使用track-by="$index"，但必须注意一些副作用。</p>
<p>举个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    data: {
        list: [1, 2, 3]
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">list</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
    }
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;demo-1&quot;>
    <p v-for=&quot;item in list&quot;>"{{" item "}}"</p>
</div>
<div id=&quot;demo-2&quot;>
    <p v-for=&quot;item in list&quot; track-by=&quot;$index&quot;>"{{" item "}}"</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo-1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list"</span>&gt;</span>"{{" item "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"demo-2"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list"</span> <span class="hljs-attr">track-by</span>=<span class="hljs-string">"$index"</span>&gt;</span>"{{" item "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>这时候执行<code>this.list = [4, 5, 6]</code>，可以通过F12观察到，demo-1里的dom被全部删除，然后重新循环list生成dom，而demo-2不会删除dom，只是把他们的text格子修改为4，5，6。这就是track-by="$index"的效果，复用了两次v-for中$index相同的dom。</p>
<p>这是一个很好的优化方法，但不是所有场景都适用，比如循环中包含表单控件或子组件时，由于dom并不会被删除重新生成，会导致第二次执行的v-for，原有表单控件的值不会改变，可以看这个例子：<br><a href="https://jsfiddle.net/jysboza9/1/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/jysboza9/1/</a><button class="btn btn-xs btn-default ml10 preview" data-url="jysboza9/1/" data-typeid="0">点击预览</button></p>
<h2 id="articleHeader3">不要滥用Directive</h2>
<p>网上有一种说法，认为dom操作都应该封装在指令中。实际开发中，我认为并不应该遵循这种教条。是否使用指令应该看你实现的是什么功能，而不是看是否操作了dom。比如说你想用vue封装一个jQuery插件，来看看下面哪种封装方法比较好：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- component -->
<datepicker></datepicker>
<!-- directive -->
<div v-datepicker=&quot;{options}&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">datepicker</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">datepicker</span>&gt;</span>
<span class="hljs-comment">&lt;!-- directive --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-datepicker</span>=<span class="hljs-string">"{options}"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>个人认为无疑是第一种方法更好，datepicker是一个独立的组件，你并不需要关心他的内部是否操作了dom，是否封装了jQuery插件。</p>
<p>那么什么时候使用指令呢？来看一下浏览器原生提供的指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a title=&quot;这是一个指令&quot;></a>
<p title=&quot;这是一个指令&quot;></p>
<div title=&quot;这是一个指令&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"这是一个指令"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"这是一个指令"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"这是一个指令"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>title属性为不同的标签提供tooltip功能，这就是一个指令。一个指令应该表示一个独立的功能，可以为不同的标签和组件提供相同的功能。</p>
<p>（待续...）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 实践心得和技巧（一）

## 原文链接
[https://segmentfault.com/a/1190000006191558](https://segmentfault.com/a/1190000006191558)

