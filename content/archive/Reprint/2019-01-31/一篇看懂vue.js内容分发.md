---
title: '一篇看懂vue.js内容分发' 
date: 2019-01-31 2:31:16
hidden: true
slug: qaos9pn64oe
categories: [reprint]
---

{{< raw >}}

                    
<p>vue.js内容分发把组件上下文的内容注入到组件。</p>
<h2 id="articleHeader0">定义解析</h2>
<p>现在我们看一个架空的例子，帮助理解刚刚说过的严谨而难懂的定义。假设有一个组件名为my-component，其使用上下文如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <my-component>
    <p>hi,slots</p>
  </my-component>  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>hi,slots<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>  
</code></pre>
<p>再假设此组件的模板为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div>
    <slot></slot>
  <div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code>  <span class="hljs-section">&lt;div&gt;</span>
    <span class="hljs-section">&lt;slot&gt;</span><span class="hljs-section">&lt;/slot&gt;</span>
  <span class="hljs-section">&lt;div&gt;</span>
</code></pre>
<p>那么注入后的组件HTML相当于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div>
     <p>hi,slots</p>
  <div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>hi,slots<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>标签&lt;slot&gt;会把组件使用上下文的内容注入到此标签所占据的位置上。组件分发的概念简单而强大，因为它意味着对一个隔离的组件除了通过属性、事件交互之外，还可以注入内容。</p>
<p>此案例变成可以执行的代码，就是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
<div class=&quot;&quot; id=&quot;app&quot;>
  <my-component>
    <p>hi,slots</p>
  </my-component>  
</div>
<script>
   Vue.component('my-component', {
      template: `
      <div>
        <slot></slot>
      <div>
    `
    });


    new Vue({
      el: &quot;#app&quot;
  });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>hi,slots<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
   Vue.component(<span class="hljs-string">'my-component'</span>, {
      <span class="hljs-attr">template</span>: <span class="hljs-string">`
      &lt;div&gt;
        &lt;slot&gt;&lt;/slot&gt;
      &lt;div&gt;
    `</span>
    });


    <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>: <span class="hljs-string">"#app"</span>
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>一个组件如果需要外部传入简单数据如数字、字符串等等的时候，可以使用property，如果需要传入js表达式或者对象时，可以使用事件，如果希望传入的是HTML标签，那么使用内容分发就再好不过了。所以，尽管内容分发这个概念看起来极为复杂，而实际上可以简化了解为把HTML标签传入组件的一种方法。所以归根结底，内容分发是一种为组件传递参数的方法。</p>
<h2 id="articleHeader1">命名插槽</h2>
<p>刚刚的案例通过slot标签，一股脑的把组件上下文的内容全部注入到组件内的规定位置。vue.js也提供了命名插槽（named slot）的技术，可以把上下文内的内容分成多个有名字的部分，然后插入到组件的不同位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
<div class=&quot;&quot; id=&quot;app&quot;>
  <my-component>
    <p slot='slot1'>hi,slot1</p>
    <p slot='slot2'>hi,slot2</p>
  </my-component>  
</div>
<script>
   Vue.component('my-component', {
      template: `
      <div>
        <slot name='slot1'></slot>
        <slot name='slot2'></slot>
      <div>
    `
    });

    new Vue({
      el: &quot;#app&quot;
  });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">'slot1'</span>&gt;</span>hi,slot1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">'slot2'</span>&gt;</span>hi,slot2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
   Vue.component('my-component', {
      template: `
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'slot1'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">'slot2'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    `
    });

    new Vue({
      el: "#app"
  });
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>此案例使用了两个插槽分别为slot1，slot2，并且把它们放到组件的不同位置。</p>
<h2 id="articleHeader2">综合案例</h2>
<p>现在我们看一个高级的案例，我来做一个即时贴(sticky)组件，用来显示一个有标题和主体的即时贴。组件会定义好即时贴的结构，外观，而具体的标题和内容，而使用内容分发技术传入的HTML标签：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
<div class=&quot;&quot; id=&quot;app&quot;>
  <sticky>
    <div slot=&quot;title&quot;>
    <h3>Title</h3></div>
    <div slot=&quot;body&quot;><p>
      Body foo bar baz  ddd
    </p></div>
  </sticky>
</div>
<script>
  Vue.component('sticky', {
    template: `
  <div>
    <div class=&quot;wrapper&quot;>  
      <div>
        <div class=&quot;title&quot;>
            <slot name=&quot;title&quot;></slot>
        </div>
        <div class=&quot;body&quot;>
            <slot name=&quot;body&quot;></slot>
        </div>
      </div>
    </div>
  </div>`
});

new Vue({
    el: &quot;#app&quot;
});
</script>
<style>
.wrapper {
  display: flex;
  width: 180px;
  height: 150px;
  background: yellow;
  border-radius: 10px;
}

.title {
  border-bottom:1px solid red
}
.body {
  border-bottom:1px solid blue
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">sticky</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"body"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
      Body foo bar baz  ddd
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">sticky</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
  Vue.component('sticky', {
    template: `
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>  
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"body"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"body"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>`
});

new Vue({
    el: "#app"
});
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.wrapper</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">180px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
  <span class="hljs-attribute">background</span>: yellow;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
}

<span class="hljs-selector-class">.title</span> {
  <span class="hljs-attribute">border-bottom</span>:<span class="hljs-number">1px</span> solid red
}
<span class="hljs-selector-class">.body</span> {
  <span class="hljs-attribute">border-bottom</span>:<span class="hljs-number">1px</span> solid blue
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>本案例内，使用上下文通过属性slot创建了两个插槽，分别为title和body，在组件的模板内（template成员）通过&lt;slot&gt;标签的name属性引用title和body，并把它注入且放入到合适的位置上。</p>
<h2 id="articleHeader3">关于</h2>
<p>作者：刘传君</p>
<p>创建过产品，创过业。好读书，求甚解。<br>可以通过 1000copy#gmail.com 联系到我</p>
<h2 id="articleHeader4">出品</h2>
<p>bootstrap小书 <a href="https://www.gitbook.com/book/1000copy/bootstrap/details" rel="nofollow noreferrer" target="_blank">https://www.gitbook.com/book/...</a><br>http小书 <a href="http://www.ituring.com.cn/book/1791" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a><br>Git小书  <a href="http://www.ituring.com.cn/book/1870" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一篇看懂vue.js内容分发

## 原文链接
[https://segmentfault.com/a/1190000007591093](https://segmentfault.com/a/1190000007591093)

