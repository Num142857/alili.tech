---
title: 'vue.js原生组件化开发（二）——父子组件' 
date: 2019-01-14 2:30:07
hidden: true
slug: 8p6myf3314
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>在了解父子组件之前应先掌握<a href="http://www.jianshu.com/p/3504a1edba42" rel="nofollow noreferrer" target="_blank">组件开发基础</a>。在实际开发过程中，组件之间可以嵌套，也因此生成父子组件。</p>
<h1 id="articleHeader1">父子组件创建流程</h1>
<h2 id="articleHeader2">1.构建父子组件</h2>
<h3 id="articleHeader3">1.1 全局注册</h3>
<p><strong>(1)构建注册子组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//构建子组件child
var child = Vue.extend({
    template: '<div>这是子组件</div>'
});
//注册名为'child'的组件
Vue.component('child',child);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//构建子组件child</span>
<span class="hljs-keyword">var</span> child = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;这是子组件&lt;/div&gt;'</span>
});
<span class="hljs-comment">//注册名为'child'的组件</span>
Vue.component(<span class="hljs-string">'child'</span>,child);</code></pre>
<p><strong>(2)构建注册父组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//构建父组件parent,在其中嵌套child组件
var parent = Vue.extend({
    template: '<div>这是父组件<child></child></div>'
});

Vue.component('parent',parent);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">//构建父组件parent,在其中嵌套child组件</span>
<span class="hljs-built_in">var</span> <span class="hljs-keyword">parent</span> = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;这是父组件&lt;child&gt;&lt;/child&gt;&lt;/div&gt;'</span>
});

Vue.component(<span class="hljs-string">'parent'</span>,<span class="hljs-keyword">parent</span>);</code></pre>
<p><strong>(3)定义vue实例</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '#app'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>({
    el: <span class="hljs-type"></span>'<span class="hljs-meta">#app'</span>
})</code></pre>
<p><strong>(4)使用父组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <parent></parent>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">parent</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">parent</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>打开浏览器查看</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009435885?w=431&amp;h=150" src="https://static.alili.tech/img/remote/1460000009435885?w=431&amp;h=150" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">1.2 局部注册</h3>
<p><strong>(1)构建子组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child = Vue.extend({
    template: '<div>这是子组件</div>'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">var</span> child = <span class="hljs-type">Vue</span>.extend({
    <span class="hljs-keyword">template</span>: '&lt;<span class="hljs-keyword">div</span>&gt;这是子组件&lt;/<span class="hljs-keyword">div</span>&gt;'
});</code></pre>
<p><strong>(2)构建父组件</strong><br>在父组件中局部注册子组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var parent = Vue.extend({
    template: '<div>这是父组件<child></child></div>',
    components:{
        'child':child
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>var parent = Vue.extend({
    template: '<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>这是父组件<span class="hljs-tag">&lt;<span class="hljs-name">child</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>',
    components:{
        'child':child
    }
});</code></pre>
<p><strong>(3)定义vue实例</strong><br>在vue实例中局部注册父组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '#app',
    components:{
        'parent':parent
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>({
    el: <span class="hljs-type"></span>'<span class="hljs-meta">#app',</span>
    components:<span class="hljs-type"></span>{
        <span class="hljs-string">'parent'</span>:<span class="hljs-type">parent</span>
    }
})</code></pre>
<p><strong>(4)使用父组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <parent></parent>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">parent</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">parent</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader5">2.父子组件间通信</h2>
<h3 id="articleHeader6">2.1 父传子</h3>
<p>父组件传消息到子组件使用<code>props</code>，并且这传递是单向的，只能由父组件传到子组件。我们将上面例子中的父组件增加一个数据传递到子组件中渲染显示。如果父组件需要传多个数据给子组件，依次在后面加即可。<br><strong>(1)在父组件中增加data，并绑定到子组件上</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var parent = Vue.extend({
    template: '<div>这是父组件<child :pdata=data></child></div>',
    data(){
        return{
            data:'这是父组件传来的数据'
        }
    },
    components:{
        'child':child
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> parent = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;这是父组件&lt;child :pdata=data&gt;&lt;/child&gt;&lt;/div&gt;'</span>,
    <span class="hljs-keyword">data</span>(){
        <span class="hljs-keyword">return</span>{
            <span class="hljs-keyword">data</span>:<span class="hljs-string">'这是父组件传来的数据'</span>
        }
    },
    components:{
        <span class="hljs-string">'child'</span>:child
    }
});</code></pre>
<p>其中<code>&lt;child :pdata=data&gt;&lt;/child&gt;</code>，<code>:pdata</code>是<code>v-bind:pdata</code>的缩写，<code>pdata</code>是自定义传递数据的命名，子组件中也是用该名字获取数据，<code>data</code>是父组件中数据的命名。<br><strong>(2)在子组件中通过props获取数据，并渲染出来</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child = Vue.extend({
    template: '<div>这是子组件 "{{"pdata"}}"</div>',
    props:['pdata']
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var child</span> = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;这是子组件 "{{"pdata"}}"&lt;/div&gt;'</span>,
    props:[<span class="hljs-string">'pdata'</span>]
});</code></pre>
<p>查看浏览器</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009435886?w=509&amp;h=135" src="https://static.alili.tech/img/remote/1460000009435886?w=509&amp;h=135" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote><p>父组件中数据发生变化，子组件中自动更新<br>子组件不可直接修改通过<code>props</code>获取到的父组件中的数据</p></blockquote>
<p>下面我们通过一个例子更好的理解上面两句话<br><strong>(1)使用<code>&lt;template&gt;</code>标签创建子组件</strong><br>为方便书写，我们使用<code>&lt;template&gt;</code>标签创建组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;child&quot;>
    <div>
        <p>这是子组件</p>
        <table>
            <tr>
                <td>name</td>
                <td>"{{"name"}}"</td>
                <td><input type=&quot;text&quot; v-model=&quot;name&quot;></td>
            </tr>
            <tr>
                <td>age</td>
                <td>"{{"age"}}"</td>
                <td><input type=&quot;text&quot; v-model=&quot;age&quot;></td>
            </tr>
        </table>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"child"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是子组件<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>name<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"name"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>age<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"age"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"age"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>这里使用<code>v-model</code>指令来双向绑定从父组件中获取到的数据<br><strong>(2)使用<code>&lt;template&gt;</code>标签创建父组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;parent&quot;>
    <div>
        <p>这是父组件</p>
        <table>
            <tr>
                <td>name</td>
                <td>"{{"name"}}"</td>
                <td><input type=&quot;text&quot; v-model=&quot;name&quot;></td>
            </tr>
            <tr>
                <td>age</td>
                <td>"{{"age"}}"</td>
                <td><input type=&quot;text&quot; v-model=&quot;age&quot;></td>
            </tr>
        </table>
        //给子组件传递2个数据
        <child :name=&quot;name&quot; :age=&quot;age&quot;></child>
    </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"parent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是父组件<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>name<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"name"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>age<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"age"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"age"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
        //给子组件传递2个数据
        <span class="hljs-tag">&lt;<span class="hljs-name">child</span> <span class="hljs-attr">:name</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">:age</span>=<span class="hljs-string">"age"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p><strong>(3)构建子组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child = Vue.extend({
    template: '#child',
    props:['name','age']
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var child</span> = Vue.extend({
    template: <span class="hljs-string">'#child'</span>,
    props:[<span class="hljs-string">'name'</span>,<span class="hljs-string">'age'</span>]
});</code></pre>
<p><strong>(4)构建父组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var parent = Vue.extend({
    template: '#parent',
    data(){
        return{
            age:16,
            name:'乔巴'
        }
    },
    components:{
        'child':child
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> parent = Vue.extend({
    template: <span class="hljs-string">'#parent'</span>,
    <span class="hljs-keyword">data</span>(){
        <span class="hljs-keyword">return</span>{
            age:<span class="hljs-number">16</span>,
            name:<span class="hljs-string">'乔巴'</span>
        }
    },
    components:{
        <span class="hljs-string">'child'</span>:child
    }
});</code></pre>
<p>查看浏览器</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009435887?w=396&amp;h=302" src="https://static.alili.tech/img/remote/1460000009435887?w=396&amp;h=302" alt="" title="" style="cursor: pointer;"></span><br>接着，我们在父组件中修改输入框的值，这会引起<code>v-model</code>绑定的值变化，同时也会改变子组件中的值<br><span class="img-wrap"><img data-src="/img/remote/1460000009435888?w=759&amp;h=460" src="https://static.alili.tech/img/remote/1460000009435888?w=759&amp;h=460" alt="" title="" style="cursor: pointer;"></span><br>然后我们试着修改子组件中输入框的值，vue会警告不能直接修改父组件传过来的值。<br><span class="img-wrap"><img data-src="/img/remote/1460000009435889?w=759&amp;h=460" src="https://static.alili.tech/img/remote/1460000009435889?w=759&amp;h=460" alt="" title="" style="cursor: pointer;"></span><br>如果我们需要修改从父组件中props传过来的值，最好一开始把这个值赋给另外一个data。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child = Vue.extend({
    template: '#child',
    props:['name','age'],
    data(){
        return{
            name1: '',
            age1: ''
        }
    },
    //页面挂载时将props的值赋给子组件中的data
    mounted:function(){
        this.name1 = this.name
        this.age1 = this.age
    },
    //同时增加监听，当props的值发生变化时，也立即赋值给子组件的data
    watch:{
        name:function(val){
            this.name1 = this.name
        },
        age:function(val){
            this.age1 = this.name
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> child = Vue.extend({
    template: <span class="hljs-string">'#child'</span>,
    props:[<span class="hljs-string">'name'</span>,<span class="hljs-string">'age'</span>],
    <span class="hljs-keyword">data</span>(){
        <span class="hljs-keyword">return</span>{
            name1: <span class="hljs-string">''</span>,
            age1: <span class="hljs-string">''</span>
        }
    },
    <span class="hljs-comment">//页面挂载时将props的值赋给子组件中的data</span>
    mounted:function(){
        <span class="hljs-keyword">this</span>.name1 = <span class="hljs-keyword">this</span>.name
        <span class="hljs-keyword">this</span>.age1 = <span class="hljs-keyword">this</span>.age
    },
    <span class="hljs-comment">//同时增加监听，当props的值发生变化时，也立即赋值给子组件的data</span>
    watch:{
        name:function(<span class="hljs-keyword">val</span>){
            <span class="hljs-keyword">this</span>.name1 = <span class="hljs-keyword">this</span>.name
        },
        age:function(<span class="hljs-keyword">val</span>){
            <span class="hljs-keyword">this</span>.age1 = <span class="hljs-keyword">this</span>.name
        }
    }
});</code></pre>
<p>同时修改<code>v-model</code>绑定的<code>name</code>值为<code>name1</code>，<code>age</code>为<code>age1</code><br>现在修改子组件中的值，就不会报错了，这是因为子组件中修改的是<code>name1</code>，并不是props传递过来的<code>name</code>值<br><span class="img-wrap"><img data-src="/img/remote/1460000009435890?w=759&amp;h=460" src="https://static.alili.tech/img/remote/1460000009435890?w=759&amp;h=460" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">2.1 子传父</h3>
<p>子组件给父组件传值通过<code>emit</code>。父组件需在子组件标签上绑定<code>emit</code>事件。<br>例子：<br><strong>(1)构建子组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var child = Vue.extend({
    template: '<div><button @click=&quot;change&quot;>点击给父组件传值</button></div>',
    methods:{
        change: function(){
            this.$emit('posttoparent',10)
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> child = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;&lt;button @click="change"&gt;点击给父组件传值&lt;/button&gt;&lt;/div&gt;'</span>,
    methods:{
        change: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'posttoparent'</span>,<span class="hljs-number">10</span>)
        }
    }
});</code></pre>
<p>子组件按钮绑定了一个<code>click</code>事件，当点击按钮执行<code>change</code>方法，该方法触发<code>emit</code>事件，事件名为<code>posttoparent</code>，并且带了一个参数10。<br>(2)构建父组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var parent = Vue.extend({
    template: '<div>来自子组件的值为："{{"datafromchild"}}" <child v-on:posttoparent=&quot;getfromchild&quot;></child></div>',
    data(){
        return{
            datafromchild:''
        }
    },
    components:{
        'child':child
    },
    methods: {
        getfromchild: function(val){
            this.datafromchild = val
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> parent = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;来自子组件的值为："{{"datafromchild"}}" &lt;child v-on:posttoparent="getfromchild"&gt;&lt;/child&gt;&lt;/div&gt;'</span>,
    <span class="hljs-keyword">data</span>(){
        <span class="hljs-keyword">return</span>{
            datafromchild:<span class="hljs-string">''</span>
        }
    },
    components:{
        <span class="hljs-string">'child'</span>:child
    },
    methods: {
        getfromchild: function(<span class="hljs-keyword">val</span>){
            <span class="hljs-keyword">this</span>.datafromchild = <span class="hljs-keyword">val</span>
        }
    }
});</code></pre>
<p>父组件接收emit事件通过v-on指令，格式为：</p>
<blockquote><p>v-on:emit方法名="父组件方法"</p></blockquote>
<p>父组件将接收到的参数赋值给<code>datafromchild </code><br>查看浏览器<br><span class="img-wrap"><img data-src="/img/remote/1460000009435891?w=537&amp;h=460" src="https://static.alili.tech/img/remote/1460000009435891?w=537&amp;h=460" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">3.兄弟组件间通信</h2>
<p>兄弟组件间通信也是用的<code>emit</code>。但原生vue.js需要新建一个空的vue实例来当桥梁。<br>下面直接贴代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//新建一个空的vue实例bus
var bus = new Vue();

var myCom1 = Vue.extend({
    template: '<div><button @click=&quot;change&quot;>点击给兄弟组件传值</button></div>',
    methods:{
        change: function(){
            //通过空实例去触发emit
            bus.$emit('posttobro',10)
        }
    }
});

var myCom2 = Vue.extend({
    template: '<div>来自兄弟组件的值为："{{"datafrombro"}}"</div>',
    data(){
        return{
            datafrombro:''
        }
    },
    mounted:function(){
      //接收emit事件
        bus.$on('posttobro',function(val){
            this.datafrombro = val
        }.bind(this))
    }
});

Vue.component('my-com1',myCom1);
Vue.component('my-com2',myCom2);

var app = new Vue({
    el: '#app'
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//新建一个空的vue实例bus</span>
<span class="hljs-keyword">var</span> bus = <span class="hljs-keyword">new</span> Vue();

<span class="hljs-keyword">var</span> myCom1 = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;&lt;button @click="change"&gt;点击给兄弟组件传值&lt;/button&gt;&lt;/div&gt;'</span>,
    methods:{
        change: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-comment">//通过空实例去触发emit</span>
            bus.$emit(<span class="hljs-string">'posttobro'</span>,<span class="hljs-number">10</span>)
        }
    }
});

<span class="hljs-keyword">var</span> myCom2 = Vue.extend({
    template: <span class="hljs-string">'&lt;div&gt;来自兄弟组件的值为："{{"datafrombro"}}"&lt;/div&gt;'</span>,
    data(){
        <span class="hljs-keyword">return</span>{
            datafrombro:<span class="hljs-string">''</span>
        }
    },
    mounted:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
      <span class="hljs-comment">//接收emit事件</span>
        bus.$on(<span class="hljs-string">'posttobro'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(val)</span></span>{
            <span class="hljs-keyword">this</span>.datafrombro = val
        }.bind(<span class="hljs-keyword">this</span>))
    }
});

Vue.component(<span class="hljs-string">'my-com1'</span>,myCom1);
Vue.component(<span class="hljs-string">'my-com2'</span>,myCom2);

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>
});</code></pre>
<p>使用组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <my-com1></my-com1>
    <my-com2></my-com2>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"app"</span>&gt;
    &lt;<span class="hljs-keyword">my</span>-com1&gt;&lt;/<span class="hljs-keyword">my</span>-com1&gt;
    &lt;<span class="hljs-keyword">my</span>-com2&gt;&lt;/<span class="hljs-keyword">my</span>-com2&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>查看浏览器<br><span class="img-wrap"><img data-src="/img/remote/1460000009436412?w=537&amp;h=460" src="https://static.alili.tech/img/remote/1460000009436412?w=537&amp;h=460" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js原生组件化开发（二）——父子组件

## 原文链接
[https://segmentfault.com/a/1190000009435882](https://segmentfault.com/a/1190000009435882)

