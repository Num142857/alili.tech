---
title: 'vue中慎用style的scoped属性' 
date: 2018-12-24 2:30:07
hidden: true
slug: s7tz3mkcti
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文发布在我的博客<a href="https://2ue.github.io/2017/11/15/vue-style-scoped/" rel="nofollow noreferrer" target="_blank">vue中慎用style的scoped属性</a><br>许可协议: 署名-非商业性使用-禁止演绎4.0国际    转载请保留原文链接及作者。</p></blockquote>
<hr>
<blockquote><p>在vue组件中，在style标签上添加scoped属性，以表示它的样式作用于当下的模块，很好的实现了样式私有化的目的，这是一个非常好的机制。但是为什么要慎用呢？在实际业务中我们往往会对公共组件样式做细微的调整，如果添加了scoped属性，那么样式将会变得不易修改。初写这篇文章时，本人没有找到一个好的方法去解决这个问题，后来经过大伙的解答，才让我恍然大悟。</p></blockquote>
<h2 id="articleHeader0">何为谨慎使用</h2>
<p>谨慎使用不是不用，而是持一种审视的目光去看待它。<code>scoped</code>肯定是解决了样式私有化的问题，但同时也引入了新的问题---样式不易（可）修改，而很多时候，我们是需要对公共组件的样式做微调的。所以我才说要谨慎使用</p>
<h2 id="articleHeader1">解决方案</h2>
<p>首先要说明的问题是，最开始我以为这是一个<code>BUG</code>或者说一个弊端(因为当时没有搞明白scoped的真正作用)，就很英勇的去提了一个<code>issue</code>，然后理所当然的被关闭了，关闭的理由是：<code>scoped</code>设计的初衷就是让样式变得不可修改。但是由于我在业务中经常遇到需要修改有<code>scoped</code>属性的组件，我就写了一篇文章记录一下这个问题，希望大家谨慎的使用这个属性。<br>然而事实再一次证明了我的愚蠢，在<code>vue-loader</code>的文档中已经详细的对这个问题做了分析，并且对我遇到这种问题给出了解决方法：vue-loader的深度作用选择器。<br>因为我并没有去深入了解这些问题，所以注定这篇文章被大伙拍砖，??????</p>
<p>解决方案：<a href="https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html" rel="nofollow noreferrer" target="_blank">vue-loader之scoped-css</a></p>
<h3 id="articleHeader2">鉴于此，虽然这篇文章没有什么价值，但为了提醒我自己深究的意义，我对后面的内容做了保留，以下内容是最开始文章的原文，请大家忽略，上面的内容才是正文，没错，正文就是这么少。</h3>
<p>--------------------------------<b>正文分割线，以下是无营养的内容</b>--------------------------------</p>
<hr>
<h2 id="articleHeader3">scoped实现私有化样式的原理</h2>
<p>为什么会说，会增加复杂度？那么我们先从的实现模块的原理说起。为了方便称呼，我们假设把这种组件叫做<code>模块私有组件</code>，其他的未加<code>scoped</code>的叫做<code>模块一般组件</code>。<br>通过查看<code>DOM</code>结构发现：<code>vue</code>通过在DOM结构以及<code>css</code>样式上加唯一不重复的标记，以保证唯一，达到样式私有化模块化的目的。具体的渲染结果是怎样的，通过一个例子来说明。</p>
<h3 id="articleHeader4">公共组件button组件</h3>
<p>一个公共组件<code>button</code>，为了样式模块化，给其加上<code>scoped</code>属性，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//button.vue
<template>
    <div class=&quot;button-warp&quot;>
        <button class=&quot;button&quot;>text</button>
    </div>
</template>
...
<style scoped>
    .button-warp{
        display:inline-block;
    }
    .button{
        padding: 5px 10px;
        font-size: 12px;
        border-radus: 2px;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue">//button.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button-warp"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button"</span>&gt;</span>text<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
...
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.button-warp</span>{
        <span class="hljs-attribute">display</span>:inline-block;
    }
    <span class="hljs-selector-class">.button</span>{
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span> <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">border-radus</span>: <span class="hljs-number">2px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader5">浏览器渲染button组件</h3>
<p><code>button</code>组件在浏览器渲染出的<code>html</code>部分和<code>css</code>部分分别为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div data-v-2311c06a class=&quot;button-warp&quot;>
    <button data-v-2311c06a class=&quot;button&quot;>text</button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-v-2311c06a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button-warp"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">data-v-2311c06a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button"</span>&gt;</span>text<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".button-warp[data-v-2311c06a]{
    display:inline-block;
}
.button[data-v-2311c06a]{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.button-warp</span><span class="hljs-selector-attr">[data-v-2311c06a]</span>{
    <span class="hljs-attribute">display</span>:inline-block;
}
<span class="hljs-selector-class">.button</span><span class="hljs-selector-attr">[data-v-2311c06a]</span>{
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
    <span class="hljs-attribute">border-radus</span>: <span class="hljs-number">2px</span>;
}</code></pre>
<p>从上面的字可以看出，添加了<code>scoped</code>属性的组件，为了达到组件样式模块化，做了两个处理：</p>
<ul>
<li>给<code>HTML</code>的<code>DOM</code>节点加一个不重复<code>data</code>属性(形如：data-v-2311c06a)来表示他的唯一性</li>
<li>在每句<code>css</code>选择器的末尾（编译后的生成的css语句）加一个当前组件的<code>data</code>属性选择器（如[data-v-2311c06a]）来私有化样式</li>
</ul>
<p>大家都知道<code>css</code>样式有一个优先级的说法，<code>scoped</code>的这一操作，虽然达到了组件样式模块化的目的，但是会造成一种后果：每个样式的权重加重了：理论上我们要去修改这个样式，需要更高的权重去覆盖这个样式。这是增加复杂度的其中一个维度。</p>
<h2 id="articleHeader6">其他组件引用button组件</h2>
<p>上面分析了单个组件渲染后的结果,那么组件互相调用之后会出现什么样的结果呢？，具体分两种情况：模块一般组件引用模块私有组件（本质和模块私有组件引用模块一般组件一样）；模块私有组件引用模块私有组件。</p>
<p>举个例子：在组件<code>content.vue</code>中使用了<code>button</code>组件，那么<code>content.vue</code>组件是否添加<code>scoped</code>属性渲染出来的结果有什么区别呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//content.vue
<template>
    <div class=&quot;content&quot;>
        <p class=&quot;title&quot;></p>
        <!-- v-button假设是上面定义的组件 -->
        <v-button></v-button>
    </div>
</template>
...
<style>
    .content{
        width: 1200px;
        margin: 0 auto;
    }
    .content .button{
        border-raduis: 5px;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue">//content.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- v-button假设是上面定义的组件 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">v-button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">v-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
...
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.content</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">1200px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    }
    <span class="hljs-selector-class">.content</span> <span class="hljs-selector-class">.button</span>{
        <span class="hljs-attribute">border-raduis</span>: <span class="hljs-number">5px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader7">模块一般组件（未添加scoped）引用模块私有组件</h3>
<p>如果<code>style</code>上没有加<code>scoped</code>属性，那么渲染出来<code>html</code>和<code>css</code>分别就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;content&quot;>
    <p class=&quot;title&quot;></p>
    <!-- v-button假设是上面定义的组件 -->
    <div data-v-2311c06a class=&quot;button-warp&quot;>
        <button data-v-2311c06a class=&quot;button&quot;>text</button>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- v-button假设是上面定义的组件 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-v-2311c06a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button-warp"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">data-v-2311c06a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button"</span>&gt;</span>text<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*button.vue渲染出来的css*/
.button-warp[data-v-2311c06a]{
    display:inline-block;
}
.button[data-v-2311c06a]{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
}
/*content.vue渲染出来的css*/
.content{
    width: 1200px;
    margin: 0 auto;
}
.content .button{
    border-raduis: 5px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*button.vue渲染出来的css*/</span>
<span class="hljs-selector-class">.button-warp</span><span class="hljs-selector-attr">[data-v-2311c06a]</span>{
    <span class="hljs-attribute">display</span>:inline-block;
}
<span class="hljs-selector-class">.button</span><span class="hljs-selector-attr">[data-v-2311c06a]</span>{
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
    <span class="hljs-attribute">border-radus</span>: <span class="hljs-number">2px</span>;
}
<span class="hljs-comment">/*content.vue渲染出来的css*/</span>
<span class="hljs-selector-class">.content</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1200px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}
<span class="hljs-selector-class">.content</span> <span class="hljs-selector-class">.button</span>{
    <span class="hljs-attribute">border-raduis</span>: <span class="hljs-number">5px</span>;
}</code></pre>
<p>可以看出，虽然在<code>content</code>组件中，修改了<code>button</code>的<code>border-raduis</code>属性，但是由于权重关系，生效的依然是组件内部的样式（此时是外部的样式被覆盖）。所以如果要达到修改样式的目的，就必须加重我们要修改样式的权重（增加选择器层级，ID选择器，并列选择器，impotant等）</p>
<h3 id="articleHeader8">模块私有组件（添加scoped）引用模块私有组件</h3>
<p>如果加了<code>scoped</code>属性呢？按照开始分析出来的规则（事实也是这么的）：<br>首先是在所有的<code>DOM</code>节点加上<code>data</code>属性<br>然后在css选择器尾部加上<code>data</code>属性选择器</p>
<p>那么渲染出来<code>html</code>和<code>css</code>分别就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div data-v-57bc25a0 class=&quot;content&quot;>
    <p data-v-57bc25a0 class=&quot;title&quot;></p>
    <!-- v-button假设是上面定义的组件 -->
    <div data-v-57bc25a0 data-v-2311c06a class=&quot;button-warp&quot;>
        <button data-v-2311c06a class=&quot;button&quot;>text</button>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-v-57bc25a0</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">data-v-57bc25a0</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- v-button假设是上面定义的组件 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-v-57bc25a0</span> <span class="hljs-attr">data-v-2311c06a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button-warp"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">data-v-2311c06a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button"</span>&gt;</span>text<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*button.vue渲染出来的css*/
.button-warp[data-v-2311c06a]{
    display:inline-block;
}
.button[data-v-2311c06a]{
    padding: 5px 10px;
    font-size: 12px;
    border-radus: 2px;
}
/*content.vue渲染出来的css*/
.content[data-v-57bc25a0]{
    width: 1200px;
    margin: 0 auto;
}
.content .button[data-v-57bc25a0]{
    border-raduis: 5px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*button.vue渲染出来的css*/</span>
<span class="hljs-selector-class">.button-warp</span><span class="hljs-selector-attr">[data-v-2311c06a]</span>{
    <span class="hljs-attribute">display</span>:inline-block;
}
<span class="hljs-selector-class">.button</span><span class="hljs-selector-attr">[data-v-2311c06a]</span>{
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">5px</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
    <span class="hljs-attribute">border-radus</span>: <span class="hljs-number">2px</span>;
}
<span class="hljs-comment">/*content.vue渲染出来的css*/</span>
<span class="hljs-selector-class">.content</span><span class="hljs-selector-attr">[data-v-57bc25a0]</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1200px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}
<span class="hljs-selector-class">.content</span> <span class="hljs-selector-class">.button</span><span class="hljs-selector-attr">[data-v-57bc25a0]</span>{
    <span class="hljs-attribute">border-raduis</span>: <span class="hljs-number">5px</span>;
}</code></pre>
<p>对于上面的两种情况，可以明显看出来渲染后的结果大不相同。<br>虽然我们在<code>content</code>添加了想要修改<code>button</code>组件的样式的代码，但是仔细看，由于<code>.content .button</code>这句在末尾加的是<code>content</code>组件的<code>scoped</code>标记，最后这句其实根本作用不到我们想要的<code>DOM</code>节点上，所以这种情况我们在<code>content</code>内部写的任何样式都不会影响到<code>button.vue</code>组件，所以这就尴尬了。。。。<br>当然这个问题也是可以解决的，就是直接加全局样式可以修改到，但这势必会影响全部地方的组件；所以需要另外一种方法在<code>content.vue</code>组件内再加一个不带<code>scoped</code>属性的<code>style</code>标签，也就意味着要加两个<code>style</code>，一个用于私有样式，一个用于共有样式。这肯定是有点shit的，并且这两种解决方案都回避不了一个问题：权重！！！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//content.vue
<template>
    <div class=&quot;content&quot;>
        <p class=&quot;title&quot;></p>
        <!-- v-button假设是上面定义的组件 -->
        <v-button></v-button>
    </div>
</template>
...
<style scoped>
    .content{
        width: 1200px;
        margin: 0 auto;
    }
</style>
<style>
    .content .button{
        border-raduis: 5px;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue">//content.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- v-button假设是上面定义的组件 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">v-button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">v-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
...
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.content</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">1200px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.content</span> <span class="hljs-selector-class">.button</span>{
        <span class="hljs-attribute">border-raduis</span>: <span class="hljs-number">5px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这样符合规范么？貌似没看到不能这么写，并且这么写也确实生效了。。。但这样确实增加了思维的复杂度，有点苦恼啊。</p>
<h2 id="articleHeader9">总结scoped的渲染规则</h2>
<p>总结一下<code>scoped</code>三条渲染规则</p>
<ul>
<li>给<code>HTML</code>的<code>DOM</code>节点加一个不重复<code>data</code>属性(形如：data-v-2311c06a)来表示他的唯一性</li>
<li>在每句<code>css</code>选择器的末尾（编译后的生成的css语句）加一个当前组件的<code>data</code>属性选择器（如[data-v-2311c06a]）来私有化样式</li>
<li>如果组件内部包含有其他组件，只会给其他组件的最外层标签加上当前组件的data属性</li>
</ul>
<h2 id="articleHeader10">解决方案</h2>
<p>对于引用的三方库，如果对方使用了<code>scoped</code>，我们无力改变什么，如果确实需要修改他的样式最能在不加<code>scoped</code>的组件中修改样式，或者全局样式直接修改，这很粗暴！<br>对于自己维护的组件，一定要想清楚，组件的样式能否满足所有的情况。如果确实需要加，无疑会增加使用这个组件的开发同学的工作！</p>
<p>当然对于这个问题，如果诸君有更好的解决方案，请诸君TELL ME一下下！</p>
<h2 id="articleHeader11">趣事</h2>
<p>在使用scoped一定要谨慎scoped的这个特性，本人以为这是一个BUG，就去提了<a href="https://github.com/vuejs/vue/issues/7067" rel="nofollow noreferrer" target="_blank">issue</a> ，结果尤大很霸气的回复<br><code>scoped</code>设计的初衷就是不能让当前组件的样式修改其他任何地方的样式，因为设计如此。所以理所当然的这个<code>issue</code>已被干掉。。。??????</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue中慎用style的scoped属性

## 原文链接
[https://segmentfault.com/a/1190000012184604](https://segmentfault.com/a/1190000012184604)

