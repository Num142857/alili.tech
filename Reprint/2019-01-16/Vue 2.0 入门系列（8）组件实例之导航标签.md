---
title: 'Vue 2.0 入门系列（8）组件实例之导航标签' 
date: 2019-01-16 2:30:07
hidden: true
slug: 1oba2xfc9pz
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">效果</h2>
<p>本节要实现的是导航标签切换功能：</p>
<p><span class="img-wrap"><img data-src="/img/bVMMG6?w=419&amp;h=168" src="https://static.alili.tech/img/bVMMG6?w=419&amp;h=168" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html
<div class=&quot;tabs&quot;>
  <ul>
    <li class=&quot;is-active&quot;><a>Pictures</a></li>
    <li><a>Music</a></li>
    <li><a>Videos</a></li>
    <li><a>Documents</a></li>
  </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>html
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"tabs"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"is-active"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>Pictures<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>Music<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>Videos<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>Documents<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<h2 id="articleHeader1">实现</h2>
<p>首先来考虑标签如何实现，我们使用 <code>name</code> 属性让用户定义标签：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tab name=&quot;图片&quot;></tab>
<tab name=&quot;音乐&quot;></tab>
<tab name=&quot;文档&quot;></tab>
<tab name=&quot;视频&quot;></tab>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"图片"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"音乐"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"文档"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"视频"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span></code></pre>
<p>定义具体的 <code>tab</code> 组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('tab',{
    template:`
        <div></div>
    `,
    mounted(){
        console.log(this);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">Vue.component('tab',{
    template:`
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    `,
    mounted(){
        console.log(this);
    }
});</code></pre>
<p>我们打印出组件的对象，发现 <code>name</code> 的值并没有传递进来：</p>
<p><span class="img-wrap"><img data-src="/img/bVMMFt?w=518&amp;h=320" src="https://static.alili.tech/img/bVMMFt?w=518&amp;h=320" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>其实就是之前讲过的，组件的实例要传递数据给组件，必须在 <code>props</code> 中声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('tab',{
    props:['name'],
    template:`
        <div></div>
    `,
    mounted(){
        console.log(this);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'tab'</span>,{
    <span class="hljs-attr">props</span>:[<span class="hljs-string">'name'</span>],
    <span class="hljs-attr">template</span>:<span class="hljs-string">`
        &lt;div&gt;&lt;/div&gt;
    `</span>,
    mounted(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
    }
});</code></pre>
<p>现在，组件对象里就可以看到 <code>name</code> 传递进来了。</p>
<p><span class="img-wrap"><img data-src="/img/bVMMFt?w=518&amp;h=320" src="https://static.alili.tech/img/bVMMFt?w=518&amp;h=320" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>接下来是 <code>zen-tabs</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('zen-tabs',{
    template:`
        <div><slot></slot></div>
    `
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">Vue.component('zen-tabs',{
    template:`
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    `
});</code></pre>
<p>里面定义了一个 <code>slot</code> ，以便用于自定义 <code>tab</code>，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<zen-tabs>
    <tab name=&quot;图片&quot;></tab>
    <tab name=&quot;音乐&quot;></tab>
    <tab name=&quot;文档&quot;></tab>
    <tab name=&quot;视频&quot;></tab>
</zen-tabs>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">zen-tabs</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"图片"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"音乐"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"文档"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"视频"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">zen-tabs</span>&gt;</span></code></pre>
<p>现在的问题是，<code>zen-tabs</code> 组件如何获取 <code>name</code> 数据呢?我们不妨打印出来看看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('zen-tabs',{
    template:`
        <div><slot></slot></div>
    `,
    mounted(){
        console.log(this);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">Vue.component('zen-tabs',{
    template:`
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    `,
    mounted(){
        console.log(this);
    }
});</code></pre>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVMMFL?w=746&amp;h=582" src="https://static.alili.tech/img/bVMMFL?w=746&amp;h=582" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>也就是说，如果一个组件(<code>zen-tabs</code>，称之为父组件)里面使用了另外一个组件(<code>tab</code>，称之为子组件)，那么可以通过 <code>$children</code> 获取子组件的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('zen-tabs',{
    template:`
        <div><slot></slot></div>
    `,
    mounted(){
        this.tabs = this.$children;
    },
    data(){
        return {
            tabs:[]
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'zen-tabs'</span>,{
    <span class="hljs-attr">template</span>:<span class="hljs-string">`
        &lt;div&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/div&gt;
    `</span>,
    mounted(){
        <span class="hljs-keyword">this</span>.tabs = <span class="hljs-keyword">this</span>.$children;
    },
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">tabs</span>:[]
        }
    }
});</code></pre>
<p>现在，我们将子组件的数据赋值给了 <code>tabs</code> 变量了，然后就可以使用了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('zen-tabs',{
    template:`
        <div>
            <div class=&quot;tabs&quot;>
                <ul>
                    <li v-for=&quot;tab in tabs&quot;><a href=&quot;#&quot;>"{{"tab.name"}}"</a></li>
                </ul>
            </div>
            <div><slot></slot></div>
        </div>
        
    `,
    mounted(){
        this.tabs = this.$children;
    },
    data(){
        return {
            tabs:[]
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'zen-tabs'</span>,{
    <span class="hljs-attr">template</span>:<span class="hljs-string">`
        &lt;div&gt;
            &lt;div class="tabs"&gt;
                &lt;ul&gt;
                    &lt;li v-for="tab in tabs"&gt;&lt;a href="#"&gt;"{{"tab.name"}}"&lt;/a&gt;&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
            &lt;div&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/div&gt;
        &lt;/div&gt;
        
    `</span>,
    mounted(){
        <span class="hljs-keyword">this</span>.tabs = <span class="hljs-keyword">this</span>.$children;
    },
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">tabs</span>:[]
        }
    }
});</code></pre>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVMMFO?w=664&amp;h=126" src="https://static.alili.tech/img/bVMMFO?w=664&amp;h=126" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>接下来标签的激活功能。首先，我们为第一个标签添加激活功能看看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;root&quot; class=&quot;container&quot;>    
    <zen-tabs>
        <tab name=&quot;图片&quot; selected=&quot;true&quot;></tab>
        <tab name=&quot;音乐&quot;></tab>
        <tab name=&quot;文档&quot;></tab>
        <tab name=&quot;视频&quot;></tab>
    </zen-tabs>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>    
    <span class="hljs-tag">&lt;<span class="hljs-name">zen-tabs</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"图片"</span> <span class="hljs-attr">selected</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"音乐"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"文档"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"视频"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">zen-tabs</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><code>tab</code> 组件中在 <code>props</code> 中定义 <code>selected</code>，并赋予默认值:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('tab',{
    props: {
        name:{require:true},
        selected: {default:false}
    },
    template:`
        <div></div>
    `
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'tab'</span>,{
    <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">name</span>:{<span class="hljs-attr">require</span>:<span class="hljs-literal">true</span>},
        <span class="hljs-attr">selected</span>: {<span class="hljs-attr">default</span>:<span class="hljs-literal">false</span>}
    },
    <span class="hljs-attr">template</span>:<span class="hljs-string">`
        &lt;div&gt;&lt;/div&gt;
    `</span>
});</code></pre>
<p>最后，可以通过 <code>selected</code> 的值来决定是否添加激活类 <code>is-active</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('zen-tabs',{
    template:`
        <div>
            <div class=&quot;tabs&quot;>
                <ul>
                    <li v-for=&quot;tab in tabs&quot; :class=&quot;{'is-active':tab.selected === true}&quot;>
                        <a href=&quot;#&quot;>"{{"tab.name"}}"</a>
                    </li>
                </ul>
            </div>
            <div><slot></slot></div>
        </div>
        
    `,
    mounted(){
        this.tabs = this.$children;
    },
    data(){
        return {
            tabs:[]
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'zen-tabs'</span>,{
    <span class="hljs-attr">template</span>:<span class="hljs-string">`
        &lt;div&gt;
            &lt;div class="tabs"&gt;
                &lt;ul&gt;
                    &lt;li v-for="tab in tabs" :class="{'is-active':tab.selected === true}"&gt;
                        &lt;a href="#"&gt;"{{"tab.name"}}"&lt;/a&gt;
                    &lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
            &lt;div&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/div&gt;
        &lt;/div&gt;
        
    `</span>,
    mounted(){
        <span class="hljs-keyword">this</span>.tabs = <span class="hljs-keyword">this</span>.$children;
    },
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">tabs</span>:[]
        }
    }
});</code></pre>
<p>发现没效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVMMFO?w=664&amp;h=126" src="https://static.alili.tech/img/bVMMFO?w=664&amp;h=126" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这是因为，我们使用的的是 <code>selected = "true"</code>，这种写法只能传递字面量，因此，传递的是字符串 <code>"true"</code>，而我们使用了 <code>===</code> 来判断传入的到底是不是布尔值 <code>true</code>，结果就返回 <code>false</code> 了。</p>
<p>因此，如果要动态的传递属性，需要使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<tab name=&quot;图片&quot; :selected=&quot;true&quot;></tab>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"图片"</span> <span class="hljs-attr">:selected</span>=<span class="hljs-string">"true"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span></code></pre>
<p>这样话 <code>"true"</code> 就被当成表达式来解析了，就为布尔值 <code>true</code> 了。修改之后，效果就出来了：</p>
<p><span class="img-wrap"><img data-src="/img/bVMMFY?w=594&amp;h=132" src="https://static.alili.tech/img/bVMMFY?w=594&amp;h=132" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>接下来，就可以根据用户的点击来动态切换标签了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="component('zen-tabs',{
    template:`
        <div>
            <div class=&quot;tabs&quot;>
                <ul>
                    <li v-for=&quot;tab in tabs&quot; :class=&quot;{'is-active':tab.selected === true}&quot; @click=&quot;selectTab(tab)&quot;>
                        <a href=&quot;#&quot;>"{{"tab.name"}}"</a>
                    </li>
                </ul>
            </div>
            <div><slot></slot></div>
        </div>
        
    `,
    mounted(){
        this.tabs = this.$children;
    },
    data(){
        return {
            tabs:[]
        }
    },
    methods:{
        selectTab(selectedTab){
            this.tabs.forEach(function(tab){
                tab.selected= (selectedTab.name == tab.name);
            })
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">component(<span class="hljs-string">'zen-tabs'</span>,{
    <span class="hljs-attr">template</span>:<span class="hljs-string">`
        &lt;div&gt;
            &lt;div class="tabs"&gt;
                &lt;ul&gt;
                    &lt;li v-for="tab in tabs" :class="{'is-active':tab.selected === true}" @click="selectTab(tab)"&gt;
                        &lt;a href="#"&gt;"{{"tab.name"}}"&lt;/a&gt;
                    &lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
            &lt;div&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/div&gt;
        &lt;/div&gt;
        
    `</span>,
    mounted(){
        <span class="hljs-keyword">this</span>.tabs = <span class="hljs-keyword">this</span>.$children;
    },
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">tabs</span>:[]
        }
    },
    <span class="hljs-attr">methods</span>:{
        selectTab(selectedTab){
            <span class="hljs-keyword">this</span>.tabs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tab</span>)</span>{
                tab.selected= (selectedTab.name == tab.name);
            })
        }
    }
});</code></pre>
<p>这样做，理论上是没问题的，实际上，会报错：</p>
<blockquote><p>Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "selected"</p></blockquote>
<p>为什么 Vue 不提倡这样做，因为我们在组件里面修改 <code>selected</code> 的值，这样可能会对外部造成影响，为了保持松耦合，请将 <code>props</code> 仅仅当成是一种传递数据（而非改变数据）的方式。我们可以自己在内部定义变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('tab',{
    props: {
        name:{require:true},
        selected: {default:false}
    },
    template:`
        <div></div>
    `,
    mounted(){
        this.isActive = this.selected;
    },
    data(){
        return {
            isActive:false
        }
    }
});
Vue.component('zen-tabs',{
    template:`
        <div>
            <div class=&quot;tabs&quot;>
                <ul>
                    <li v-for=&quot;tab in tabs&quot; :class=&quot;{'is-active':tab.isActive=== true}&quot; @click=&quot;selectTab(tab)&quot;>
                        <a href=&quot;#&quot;>"{{"tab.name"}}"</a>
                    </li>
                </ul>
            </div>
            <div><slot></slot></div>
        </div>
        
    `,
    mounted(){
        this.tabs = this.$children;
    },
    data(){
        return {
            tabs:[]
        }
    },
    methods:{
        selectTab(selectedTab){
            this.tabs.forEach(function(tab){
                tab.isActive= (selectedTab.name == tab.name);
            })
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'tab'</span>,{
    <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">name</span>:{<span class="hljs-attr">require</span>:<span class="hljs-literal">true</span>},
        <span class="hljs-attr">selected</span>: {<span class="hljs-attr">default</span>:<span class="hljs-literal">false</span>}
    },
    <span class="hljs-attr">template</span>:<span class="hljs-string">`
        &lt;div&gt;&lt;/div&gt;
    `</span>,
    mounted(){
        <span class="hljs-keyword">this</span>.isActive = <span class="hljs-keyword">this</span>.selected;
    },
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">isActive</span>:<span class="hljs-literal">false</span>
        }
    }
});
Vue.component(<span class="hljs-string">'zen-tabs'</span>,{
    <span class="hljs-attr">template</span>:<span class="hljs-string">`
        &lt;div&gt;
            &lt;div class="tabs"&gt;
                &lt;ul&gt;
                    &lt;li v-for="tab in tabs" :class="{'is-active':tab.isActive=== true}" @click="selectTab(tab)"&gt;
                        &lt;a href="#"&gt;"{{"tab.name"}}"&lt;/a&gt;
                    &lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
            &lt;div&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/div&gt;
        &lt;/div&gt;
        
    `</span>,
    mounted(){
        <span class="hljs-keyword">this</span>.tabs = <span class="hljs-keyword">this</span>.$children;
    },
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">tabs</span>:[]
        }
    },
    <span class="hljs-attr">methods</span>:{
        selectTab(selectedTab){
            <span class="hljs-keyword">this</span>.tabs.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tab</span>)</span>{
                tab.isActive= (selectedTab.name == tab.name);
            })
        }
    }
});</code></pre>
<p>最后，优化一下该组件，首先是允许用户自定义视图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<zen-tabs>
    <tab name=&quot;图片&quot; :selected=&quot;true&quot;>图片视图</tab>
    <tab name=&quot;音乐&quot;>音乐视图</tab>
    <tab name=&quot;文档&quot;>文档视图</tab>
    <tab name=&quot;视频&quot;>视频视图</tab>
</zen-tabs>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">zen-tabs</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"图片"</span> <span class="hljs-attr">:selected</span>=<span class="hljs-string">"true"</span>&gt;</span>图片视图<span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"音乐"</span>&gt;</span>音乐视图<span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"文档"</span>&gt;</span>文档视图<span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tab</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"视频"</span>&gt;</span>视频视图<span class="hljs-tag">&lt;/<span class="hljs-name">tab</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">zen-tabs</span>&gt;</span></code></pre>
<p>只需要稍微修改下 <code>tab</code> 的模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('tab',{
    template:`
        <div v-show=&quot;isActive&quot;>
            <slot></slot>
        </div>
    `" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'tab'</span>,{
    <span class="hljs-attr">template</span>:<span class="hljs-string">`
        &lt;div v-show="isActive"&gt;
            &lt;slot&gt;&lt;/slot&gt;
        &lt;/div&gt;
    `</span></code></pre>
<p>最后是超链接功能，用计算属性来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('tab',{
    computed:{
        href(){
            return '#' + this.name.toLowerCase().replace(/ /g,'-');
        }
    }
});

Vue.component('zen-tabs',{
    template:`
        <div>
            <div class=&quot;tabs&quot;>
                <ul>
                    <li v-for=&quot;tab in tabs&quot; :class=&quot;{'is-active':tab.isActive=== true}&quot; @click=&quot;selectTab(tab)&quot;>
                        <a :href=&quot;tab.href&quot;>"{{"tab.name"}}"</a>
                    </li>
                </ul>
            </div>
            <div><slot></slot></div>
        </div>    
    `,
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'tab'</span>,{
    <span class="hljs-attr">computed</span>:{
        href(){
            <span class="hljs-keyword">return</span> <span class="hljs-string">'#'</span> + <span class="hljs-keyword">this</span>.name.toLowerCase().replace(<span class="hljs-regexp">/ /g</span>,<span class="hljs-string">'-'</span>);
        }
    }
});

Vue.component(<span class="hljs-string">'zen-tabs'</span>,{
    <span class="hljs-attr">template</span>:<span class="hljs-string">`
        &lt;div&gt;
            &lt;div class="tabs"&gt;
                &lt;ul&gt;
                    &lt;li v-for="tab in tabs" :class="{'is-active':tab.isActive=== true}" @click="selectTab(tab)"&gt;
                        &lt;a :href="tab.href"&gt;"{{"tab.name"}}"&lt;/a&gt;
                    &lt;/li&gt;
                &lt;/ul&gt;
            &lt;/div&gt;
            &lt;div&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/div&gt;
        &lt;/div&gt;    
    `</span>,
</code></pre>
<p>通过计算属性，让超链接返回 <code>#</code> + <code>标签名</code> 的方式，如果标签名中存在空格，就用 <code>-</code> 来代替。</p>
<hr>
<p>附录：</p>
<ul><li><p><a href="https://gist.github.com/ihuangmx/9cb773f38991e35e784cf96436ee71b9" rel="nofollow noreferrer" target="_blank">源码</a><button class="btn btn-xs btn-default ml10 preview" data-url="ihuangmx/9cb773f38991e35e784cf96436ee71b9" data-typeid="1">点击预览</button></p></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 2.0 入门系列（8）组件实例之导航标签

## 原文链接
[https://segmentfault.com/a/1190000009204581](https://segmentfault.com/a/1190000009204581)

