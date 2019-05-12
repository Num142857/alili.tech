---
title: '组件改变生活_揭开Vue组件的神秘面纱' 
date: 2019-02-11 2:30:49
hidden: true
slug: 79p86m9l0rg
categories: [reprint]
---

{{< raw >}}

                    
<p>在这一节里，我们将会了解到Vue的组件，理解组件是如何工作的，并利用一系列<br>的例子证明，用组件化的思想开发项目，会给你带来不一样感受。如果我们理解了Vue的组件化思想，我们就可以利用这个思想构造一个简化的评论投票系统，一个用户可以发布评论，其他用户可以在任意的评论上面投“赞成票”或者投“反对票”。</p>
<p>如果你是第一次接触Vue的话，你可以看看我之前的文章，<a href="https://segmentfault.com/a/1190000005041030">《从零开始学Vue》</a>，了解Vue的基本语法。</p>
<h3 id="articleHeader0">理解组件</h3>
<p>利用组件能够很好的把一个你正在构建的具有复杂接口的应用拆分开来，同时，组件也具有很高的复用性，即使是在你正在开发的是不同的项目也能封装复用。</p>
<p>先创建一个简单的html页面，并将Vue实例化后挂载在我们的DOM元素上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
      <html>
            <head>
                  <title>揭开Vue组件的神秘面纱</title>
            </head>
      <body>
            //这中间就是实例挂载点的实例边界
            <div id=&quot;vueInstance&quot;></div>

            //Vue的CDN，之后会省略不写
            <script src=&quot;http://cdn.jsdelivr.net/vue/1.0.16/vue.js&quot;></script>

            <script>
                  // 创建一个新的Vue实例，并设置挂载点
                  var V = new Vue({
                        el : '#vueInstance'
                  });
            </script>
      </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;!DOCTYPE html&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>揭开Vue组件的神秘面纱<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
            //这中间就是实例挂载点的实例边界
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"vueInstance"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

            //Vue的CDN，之后会省略不写
            <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdn.jsdelivr.net/vue/1.0.16/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
                  <span class="hljs-comment">// 创建一个新的Vue实例，并设置挂载点</span>
                  <span class="hljs-keyword">var</span> V = <span class="hljs-keyword">new</span> Vue({
                        el : <span class="hljs-string">'#vueInstance'</span>
                  });
            </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>现在我们已经把在<a href="https://segmentfault.com/a/1190000005041030" target="_blank">《从零开始学Vue》</a>的基础都准备好了，然后我们将创建我们的第一个简单的，可复用的组件。在Vue中你，可以使用Vue.component()来创建和注册你的组件，这个构造器有两个参数：</p>
<blockquote><ul>
<li><p>组件的名字</p></li>
<li><p>包含组件参数的对象</p></li>
</ul></blockquote>
<p>这个对象有点像Vue()构造器里的对象，它也有类似于Vue()里的el属性和data属性，但是又有点不一样。</p>
<p>Vue()构造器的el和data可以是对象。<br>Vue.component()构造器的el和data只能是函数。</p>
<p>现在来看看第一个组件是如何运作的。我想要注册一个组件，用p标签输出一行我的自我介绍。所以我创建了一个组件，并填入两个参数：</p>
<blockquote><ul>
<li><p>组件的名字:'mine'</p></li>
<li><p>包含组件参数的对象:这个对象包含一个属性'template'</p></li>
</ul></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('mine',{
    template : '<p>My name is Appian.</p>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'mine'</span>,{
    <span class="hljs-attr">template</span> : <span class="hljs-string">'&lt;p&gt;My name is Appian.&lt;/p&gt;'</span>
})</code></pre>
<p>现在你已经有了自己的一个组件了，你可以在你的应用的任何地方使用它。只要你调用它的唯一标识(就是组件名字)，并用普通html标签的格式来书写，比如&lt;mine&gt;&lt;/mine&gt;，组件上注册的内容就会在你的自定义标签的地方插入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;vueInstance&quot;>
    <mine></mine>   //标识注册的内容会在这里插入
    <mine></mine>
    <mine></mine>   //重复插入注册内容
 </div>

 <script>
       Vue.component('mine',{   //这里就是注册的内容
           template : '<p>My name is Appian.</p>'
       });

       var V = new Vue({
             el : '#vueInstance'
       });
 </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> &lt;div id=<span class="hljs-string">"vueInstance"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">mine</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mine</span>&gt;</span></span>   <span class="hljs-comment">//标识注册的内容会在这里插入</span>
    &lt;mine&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">mine</span>&gt;</span></span>
    &lt;mine&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">mine</span>&gt;</span></span>   <span class="hljs-comment">//重复插入注册内容</span>
 &lt;<span class="hljs-regexp">/div&gt;

 &lt;script&gt;
       Vue.component('mine',{   /</span><span class="hljs-regexp">/这里就是注册的内容
           template : '&lt;p&gt;My name is Appian.&lt;/</span>p&gt;<span class="hljs-string">'
       });

       var V = new Vue({
             el : '</span>#vueInstance<span class="hljs-string">'
       });
 &lt;/script&gt;</span></code></pre>
<p>Vue使用模板Template来代替组件，并使自定义的唯一标识用html标签插入到DOM结构中去，使得html更加简洁、整齐和直观。</p>
<h3 id="articleHeader1">利用template标签处理复杂组件</h3>
<p>现在你可能会想，我写的组件怎么可能只有一行p标签？一行p标签还有必要组件这么麻烦吗？是的，组件是为了更复杂的封装复用而生的。所以，如果你只会Vue.component()构造器中的template属性定义html代码，利用字符串拼接拼出所有的代码，这样只会让你比用jq更加疲惫不堪。</p>
<p>为了避免上面的这种情况，所以我们可以用template标签（注意属性和标签是不一样的）来达到我们的目的。我们可以在页面的任何地方，定义template标签，并在template标签内，写好我们的模板。因为template标签在页面加载的时候不会渲染出来，只有在我们需要它的时候，这个标签内的内容才会被渲染出来。所以，你可以把template标签放在任何地方，并给它一个id，以便在组件注册的时候能够找到模板。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;vueInstance&quot;>
    <mine></mine>   //标识注册的内容会在这里插入
 </div>

 <template id=&quot;mineTpl&quot;>
         <p>My name is Appian.</p>
         <button>点击没有任何事件</button>
 </template>

 <script>
       Vue.component('mine',{   //这里就是注册的内容
           template : '#mineTpl'
       });

       var V = new Vue({
             el : '#vueInstance'
       });
 </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> &lt;div id=<span class="hljs-string">"vueInstance"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">mine</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mine</span>&gt;</span></span>   <span class="hljs-comment">//标识注册的内容会在这里插入</span>
 &lt;<span class="hljs-regexp">/div&gt;

 &lt;template id="mineTpl"&gt;
         &lt;p&gt;My name is Appian.&lt;/</span>p&gt;
         <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>点击没有任何事件<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
 &lt;<span class="hljs-regexp">/template&gt;

 &lt;script&gt;
       Vue.component('mine',{   /</span><span class="hljs-regexp">/这里就是注册的内容
           template : '#mineTpl'
       });

       var V = new Vue({
             el : '#vueInstance'
       });
 &lt;/</span>script&gt;</code></pre>
<p>我们现在已经可以利用这样的方法创建一个复杂的组件了。这样我们可能将复杂的代码进行功能分区之后组件化，用组件的思想避免代码一坨一坨的。组件化能够帮你更清晰的组织好你的模块，使你的组件更加vue化。</p>
<h3 id="articleHeader2">通过props向组件中传递数据</h3>
<p>每次创建组件实例的时候，这个实例都划分了自己的组件范围，这个范围导致了在这个组件区域内无法获得其父组件的数据。所以，Vue是如何处理父组件向子组件中传递数据的呢？答案是，通过props。</p>
<p>先看一个最简单，从父组件向子组件中传递data的例子。注册的mine组件是子组件，他希望从父组件那里得到‘city’这个数据的信息，所以在mine的构造器里增加了一个参数props，用来接收父组件传递过来的city的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('mine',{
    template : '<p>Appian is from "{{" city "}}".</p>',
    props : ['city']
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'mine'</span>,{
    <span class="hljs-attr">template</span> : <span class="hljs-string">'&lt;p&gt;Appian is from "{{" city "}}".&lt;/p&gt;'</span>,
    <span class="hljs-attr">props</span> : [<span class="hljs-string">'city'</span>]
});</code></pre>
<p>上面的例子中，我们定义了props作为一个数组，所以props可以用来接收多个字段，而这些字段就是子组件期望从父组件那里得到的。</p>
<p>props不一定要是数组，也可以是对象。可以在对象中详细的定义很多props的限制条件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('mine',{
    template : '<p>Appian is from "{{" city "}}".</p>',
    props : {
        city : {
            type : String,//定义字符串类型
            required : true,//该字段是必须的
            default : 'China'//设置默认值
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'mine'</span>,{
    <span class="hljs-attr">template</span> : <span class="hljs-string">'&lt;p&gt;Appian is from "{{" city "}}".&lt;/p&gt;'</span>,
    <span class="hljs-attr">props</span> : {
        <span class="hljs-attr">city</span> : {
            <span class="hljs-attr">type</span> : <span class="hljs-built_in">String</span>,<span class="hljs-comment">//定义字符串类型</span>
            required : <span class="hljs-literal">true</span>,<span class="hljs-comment">//该字段是必须的</span>
            <span class="hljs-keyword">default</span> : <span class="hljs-string">'China'</span><span class="hljs-comment">//设置默认值</span>
        }
    }
});</code></pre>
<blockquote><p>我们不需要每次都将props的限制条件都写出来，因为在这个例子中的数据是一个很简单的字段，上例中只是为了完整展示props的对象表示方法，所以才展开来写的。</p></blockquote>
<p>那父组件那里又是怎么指派字段给子组件的呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <mine city=&quot;FuJian-YongAn&quot;></mine>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">    &lt;mine city=<span class="hljs-string">"FuJian-YongAn"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">mine</span>&gt;</span></span></code></pre>
<p>这样直接在mine标签里面定义‘city’字段，就是父组件指派字段的方式之一。但是这样直接指派是很瞎的，我们需要的是动态变化的city，这个一会我们会说到的。</p>
<p>先简单介绍一下我们接下来要做的事。我们要假装我们正在搭一个博客，博客需要展示作者的基本信息，此时，我们可能会需要一些数据对象，可能是从数据库获得的，或者ajax请求到的，总之就是请求到了之后，将这个数据对象定义在父级的data中。并在html的template标签中准备渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;vueInstance&quot;>
    <mine></mine> //标识注册的内容会在这里插入，之后也要展开来说！！！
</div>

<template id=&quot;mineTpl&quot;>
     <h1>"{{" name "}}"</h1>
     <h2>"{{" title "}}"</h2>
     <h3>"{{" city "}}"</h3>
     <p>"{{" content "}}"</p>
</template>

<script>
    //Vue.component()的构造在下文中展开来说！！！

    var V = new Vue({
         el : '#vueInstance',
         data : {
            name : 'Appian',
            title : 'This is a title',
            city : 'FuJian-XiaMen',
            content : 'There are some desc about Appians Blog'
         }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"vueInstance"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">mine</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mine</span>&gt;</span></span> <span class="hljs-comment">//标识注册的内容会在这里插入，之后也要展开来说！！！</span>
&lt;<span class="hljs-regexp">/div&gt;

&lt;template id="mineTpl"&gt;
     &lt;h1&gt;"{{" name "}}"&lt;/</span>h1&gt;
     <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>"{{" title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
     &lt;h3&gt;"{{" city "}}"&lt;<span class="hljs-regexp">/h3&gt;
     &lt;p&gt;"{{" content "}}"&lt;/</span>p&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

&lt;script&gt;
    <span class="hljs-comment">//Vue.component()的构造在下文中展开来说！！！</span>

    <span class="hljs-keyword">var</span> V = <span class="hljs-keyword">new</span> Vue({
         <span class="hljs-attr">el</span> : <span class="hljs-string">'#vueInstance'</span>,
         <span class="hljs-attr">data</span> : {
            <span class="hljs-attr">name</span> : <span class="hljs-string">'Appian'</span>,
            <span class="hljs-attr">title</span> : <span class="hljs-string">'This is a title'</span>,
            <span class="hljs-attr">city</span> : <span class="hljs-string">'FuJian-XiaMen'</span>,
            <span class="hljs-attr">content</span> : <span class="hljs-string">'There are some desc about Appians Blog'</span>
         }
    });
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>准备好模板渲染之后，当然也要注册mine的构造器Vue.component()。除了基本的绑定模板id（#mineTpl）之外，还需要指定这个子组件想要的数据的字段名，并把期望得到的4个字段写在props中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('mine',{
   template : '#mineTpl',
   props : ['name','title','city','content']
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'mine'</span>,{
   <span class="hljs-attr">template</span> : <span class="hljs-string">'#mineTpl'</span>,
   <span class="hljs-attr">props</span> : [<span class="hljs-string">'name'</span>,<span class="hljs-string">'title'</span>,<span class="hljs-string">'city'</span>,<span class="hljs-string">'content'</span>]
});</code></pre>
<p>这样我们就能告诉父级，子组件需要的字段是哪些。接下来父级就可以指派字段的值给子组件了。前面的city字段是写死的，现在这里绑定的字段就是动态绑定的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<mine :name='name'
      :title='title'
      :city='city'
      :content='content'
  ></mine>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;mine :name=<span class="hljs-string">'name'</span>
      :title=<span class="hljs-string">'title'</span>
      :city=<span class="hljs-string">'city'</span>
      :content=<span class="hljs-string">'content'</span>
  &gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">mine</span>&gt;</span></span></code></pre>
<blockquote>
<p>等号左右两边的字段名称可以不一样。<br>等号左边的字段名，是指在子组件的props中声明的名字。在html写成肉串式，但是在props中写成驼峰式。<br>等号右边的字段名，是指在父级里定义的字段的名字。</p>
<p>‘:’是‘v-bind’的缩写</p>
</blockquote>
<p>这样就能把父组件的4个字段绑定到子组件上。现在，只要父组件指派的字段的值一发生改变，子组件的值也会发生相应的改变。</p>
<h3 id="articleHeader3">构建一个简易评论社区系统</h3>
<p>现在就可以利用前面学到的内容，搭建一个简易的评论社区系统，样式什么的先不管，只讲究js的具体实现。</p>
<ul>
<li><p>创建一个新的Vue实例</p></li>
<li><p>给实例挂载一个div（#vueInstance）</p></li>
<li><p>定义数据，然后渲染。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;vueInstance&quot;>
    <div class=&quot;container&quot;>
        <ul>
           //这里即将渲染出评论的投票列表
        </ul>
    </div>
</div>

<template id=&quot;postTpl&quot;>
     <li>
         <i class=&quot;up&quot;>我支持</i>
         <span>票数： "{{" post.votes "}}"</span>
         <i class=&quot;down&quot;>我反对</i>
         <a>话题： "{{" post.title "}}"</a>
       </li>
</template>


<script>
    //Vue.component()的构造在下文中展开来说！！！

    var V = new Vue({
         el : '#vueInstance',
         data : {
             posts: [{
                title: '请大大多多为我投票，我给大家发红包',
                votes: 15
             },{
                title: '投我准没错',
                votes: 53
             },{
                title: '不要投给我楼上的',
                votes: 10
             }]
         }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"vueInstance"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
           //这里即将渲染出评论的投票列表
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;

&lt;template id="postTpl"&gt;
     &lt;li&gt;
         &lt;i class="up"&gt;我支持&lt;/i</span>&gt;
         <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>票数： "{{" post.votes "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
         &lt;i <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"down"</span>&gt;我反对&lt;<span class="hljs-regexp">/i&gt;
         &lt;a&gt;话题： "{{" post.title "}}"&lt;/</span>a&gt;
       <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;


&lt;script&gt;
    /</span><span class="hljs-regexp">/Vue.component()的构造在下文中展开来说！！！

    var V = new Vue({
         el : '#vueInstance',
         data : {
             posts: [{
                title: '请大大多多为我投票，我给大家发红包',
                votes: 15
             },{
                title: '投我准没错',
                votes: 53
             },{
                title: '不要投给我楼上的',
                votes: 10
             }]
         }
    });
&lt;/</span>script&gt;</code></pre>
<p>现在先构造好数据，有投票的话题和投票人数。然后再构造好模板（template标签），这个模板值用来渲染单个话题。模板里有除了渲染话题和投票人数，还有两个按钮，用来投赞成票或者反对票。之后我们只需要在html循环模板，然后就能多次插入模板，渲染成列表。当然也可以在模板里渲染好列表再一次插入。我们先用前一种方法。</p>
<p>不管css的样式问题，现在就可以开始注册Vue.component()构造器了，以便我们渲染页面。我们在注册的时候要明确，我注册的子组件需要的props是父级的posts数组中的一个元素对象post。所以我们应该这样注册：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('post',{
    template : '#postTpl',
    props : ['post']
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'post'</span>,{
    <span class="hljs-attr">template</span> : <span class="hljs-string">'#postTpl'</span>,
    <span class="hljs-attr">props</span> : [<span class="hljs-string">'post'</span>]
});</code></pre>
<p>然后我们使用自定义的&lt;post&gt;标签插入在html中去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;vueInstance&quot;>
    <div class=&quot;container&quot;>
        <ul>
           <post v-for=&quot;post in posts&quot; :post=&quot;post&quot;></post>
        </ul>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"vueInstance"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">post</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"post in posts"</span> <span class="hljs-attr">:post</span>=<span class="hljs-string">"post"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">post</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>这样我们就已经完成了循环输出posts数组了。因为我们把数组的元素指派给了子组件，所以子组件就可以渲染title和vote。接下来要做的就是增加“赞成”和“反对”按钮的逻辑代码，并我们需要对投票状态进行锁定，就是如果我们投了某个话题的赞成票就不能再投该话题的反对票，反之亦然。<br>所以让我们开始在模板里面定义点击事件吧，投赞成票的事件叫做“upvote”，投反对票的事件叫做“downvote”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;postTpl&quot;>
     <li>
         <i class=&quot;up&quot; @click=&quot;upvote&quot;>我支持</i>
         <span>票数： "{{" post.votes "}}"</span>
         <i class=&quot;down&quot; @click=&quot;downvote&quot;>我反对</i>
         <a>话题： "{{" post.title "}}"</a>
       </li>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;template id=<span class="hljs-string">"postTpl"</span>&gt;
     <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"up"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"upvote"</span>&gt;</span>我支持<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>票数： "{{" post.votes "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"down"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"downvote"</span>&gt;</span>我反对<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>话题： "{{" post.title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('post',{
    template : '#postTpl',
    props : ['post'],
    data : function (){
        return {  //data必须为function，定义投票状态
            upvoted: false,
            downvoted: false
        }
    },
    methods : {
        upvote : function() { //点击赞成的事件
            this.upvoted = !this.upvoted;
            this.downvoted = false;
        },
        downvote: function() { //点击反对的事件
            this.downvoted = !this.downvoted;
            this.upvoted = false;
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'post'</span>,{
    <span class="hljs-attr">template</span> : <span class="hljs-string">'#postTpl'</span>,
    <span class="hljs-attr">props</span> : [<span class="hljs-string">'post'</span>],
    <span class="hljs-attr">data</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> {  <span class="hljs-comment">//data必须为function，定义投票状态</span>
            upvoted: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">downvoted</span>: <span class="hljs-literal">false</span>
        }
    },
    <span class="hljs-attr">methods</span> : {
        <span class="hljs-attr">upvote</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//点击赞成的事件</span>
            <span class="hljs-keyword">this</span>.upvoted = !<span class="hljs-keyword">this</span>.upvoted;
            <span class="hljs-keyword">this</span>.downvoted = <span class="hljs-literal">false</span>;
        },
        <span class="hljs-attr">downvote</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//点击反对的事件</span>
            <span class="hljs-keyword">this</span>.downvoted = !<span class="hljs-keyword">this</span>.downvoted;
            <span class="hljs-keyword">this</span>.upvoted = <span class="hljs-literal">false</span>;
        }
    }
});</code></pre>
<blockquote><p>注意，data里面的两个布尔值的定义是作为一个函数的返回值定义的。那是因为我们想要给每一个组件都设置一个是否投票的状态。<br>（还记得之前我说过，这次的列表渲染是循环渲染多个模板，每个模板都只是一个话题的相关信息，而现在在组件中定义的data：upvoted和downvoted，也是专属于某个模板的。）<br>这样我们如果投了某个话题的赞成票，并不会影响剩下话题的投票情况。</p></blockquote>
<p>接下来已经完成了点击事件的状态控制，那么点击“赞成”和“反对”会导致话题的票数发生变化。这个时候我们可以利用之前的教程中学过的computed属性进行计算。</p>
<blockquote><p>组件也有computed属性哦~</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('post',{
    template : '#postTpl',
    props : ['post'],
    data : function (){ //同上，略 },
    methods : {  //同上，略 },
    computed: {  //重点部分
        votes: function () {
            if (this.upvoted) {
                return this.post.votes + 1;
            } else if (this.downvoted) {
                return this.post.votes - 1;
            } else {
                return this.post.votes;
            }
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'post'</span>,{
    <span class="hljs-attr">template</span> : <span class="hljs-string">'#postTpl'</span>,
    <span class="hljs-attr">props</span> : [<span class="hljs-string">'post'</span>],
    <span class="hljs-attr">data</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{ <span class="hljs-comment">//同上，略 },</span>
    methods : {  <span class="hljs-comment">//同上，略 },</span>
    computed: {  <span class="hljs-comment">//重点部分</span>
        votes: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.upvoted) {
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.post.votes + <span class="hljs-number">1</span>;
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.downvoted) {
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.post.votes - <span class="hljs-number">1</span>;
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.post.votes;
            }
        }
    }
});</code></pre>
<p>到此为止，应该组件中的逻辑处理差不多完成了，现在要做的就是让我们在组件中修改的投票人数，能够在模板中渲染出来。因为我们现在的votes的值是在子组件中修改的，而一开始渲染的时候，我们的votes只是一味的接受父级传过来的值，所以，现在要把修改的值显示在模板上。<br>所以模板变成了这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;postTpl&quot;>
     <li>
         <i class=&quot;up&quot; @click=&quot;upvote&quot;>我支持</i>
         <span>票数： "{{" votes "}}"</span>
         <i class=&quot;down&quot; @click=&quot;downvote&quot;>我反对</i>
         <a>话题： "{{" post.title "}}"</a>
       </li>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;template id=<span class="hljs-string">"postTpl"</span>&gt;
     <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"up"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"upvote"</span>&gt;</span>我支持<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>票数： "{{" votes "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"down"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"downvote"</span>&gt;</span>我反对<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>话题： "{{" post.title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;</span></code></pre>
<p>现在我们的投票系统已经基本完成了。我们可能会希望我们的投票系统好看一点，直观一点。所以我们可以在按钮上绑定一些样式。比如当用户已经投了某个话题的赞成票或者反对票，就让这个按钮变成橙色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".disabled {
    color : orange;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">.disabled {
    <span class="hljs-attr">color</span> : orange;
}</code></pre>
<p>Vue是利用v-bind:class来进行样式绑定的，可以简写成一个‘:’。其绑定的内容是一个对象，对象里面是class的名字和class对应的状态。<br><a href="http://cn.vuejs.org/guide/class-and-style.html" rel="nofollow noreferrer" target="_blank">了解更多样式绑定的信息点这里</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;postTpl&quot;>
     <li>
         <i class=&quot;up&quot; @click=&quot;upvote&quot; :class=&quot;{disabled: upvoted}&quot;>我支持</i>
         <span>票数： "{{" votes "}}"</span>
         <i class=&quot;down&quot; @click=&quot;downvote&quot; :class=&quot;{disabled: downvoted}&quot;>我反对</i>
         <a>话题： "{{" post.title "}}"</a>
       </li>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;template id=<span class="hljs-string">"postTpl"</span>&gt;
     <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"up"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"upvote"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{disabled: upvoted}"</span>&gt;</span>我支持<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>票数： "{{" votes "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"down"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"downvote"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{disabled: downvoted}"</span>&gt;</span>我反对<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>话题： "{{" post.title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;</span></code></pre>
<p>如果我们点击了某个话题的赞成按钮，则它的upvoted就会变成true，则disabled的样式就绑定到赞成按钮上去。如果点了该话题的反对按钮，则它的upvoted就会变成false，则disabled就不会绑定到赞成按钮上。以上就是模板最终的样子。</p>
<h3 id="articleHeader4">组件的复用性的利用</h3>
<p>我们已经利用了我们对Vue的基本语法还有一些组件的基本操作，建立起了一个基本的话题投票系统。在教程的最后一部分，我们将看看，我们应该如何将这个投票系统组件进行复用。</p>
<p>复用的关键在于组件的命名，让你的命名能够复用。至少你在构建你的组件的时候，你要问自己，“是否其他地方也能用到这个组件？”</p>
<p>比如，在上面的例子中，posts的意思是，这个数据是从ajax的post请求过来的数据，为了便于理解，才取名为posts，为了让自己的组件名字一看就知道关联，所以把模板的id定义为#postTpl，tpl是template的简写，自定义标签的命名也是post。总之，就是这样的细节，不仅方便自己阅读，也方便其他人阅读你的代码。</p>
<p>现在我们的评论系统需要增加一个功能，就是增加一个发布评论的功能。就是增加了一个发布评论的区域（#commentBox）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;vueInstance&quot;>
    <div class=&quot;container&quot;>
        <ul>
           <post v-for=&quot;post in posts&quot; :post=&quot;post&quot;></post>
        </ul>

        <div id=&quot;commentBox&quot;>
            请输入评论内容并提交：
            <input type=&quot;text&quot; v-model=&quot;comment&quot; @keyup.enter=&quot;postComment&quot;>
            <button @click=&quot;postComment&quot;>提交评论</button>
        </div>
    </div>
</div>

//模板渲染不变

<script>
//Vue.component()的注册不变。

var V = new Vue({
     el : '#vueInstance',
     data : {
         posts: [{
            title: '请大大多多为我投票，我给大家发红包',
            votes: 15
         },{
            title: '投我准没错',
            votes: 53
         },{
            title: '不要投给我楼上的',
            votes: 10
         }],
          comment: ''
     },
     methods: {
         postComment: function() {
             this.posts.push({
               title: this.comment,
               votes: 0
             })
             this.comment = '';
         }
     }
});
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"vueInstance"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">post</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"post in posts"</span> <span class="hljs-attr">:post</span>=<span class="hljs-string">"post"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">post</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"commentBox"</span>&gt;</span>
            请输入评论内容并提交：
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"comment"</span> @<span class="hljs-attr">keyup.enter</span>=<span class="hljs-string">"postComment"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"postComment"</span>&gt;</span>提交评论<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

<span class="hljs-comment">//模板渲染不变</span>

&lt;script&gt;
<span class="hljs-comment">//Vue.component()的注册不变。</span>

<span class="hljs-keyword">var</span> V = <span class="hljs-keyword">new</span> Vue({
     <span class="hljs-attr">el</span> : <span class="hljs-string">'#vueInstance'</span>,
     <span class="hljs-attr">data</span> : {
         <span class="hljs-attr">posts</span>: [{
            <span class="hljs-attr">title</span>: <span class="hljs-string">'请大大多多为我投票，我给大家发红包'</span>,
            <span class="hljs-attr">votes</span>: <span class="hljs-number">15</span>
         },{
            <span class="hljs-attr">title</span>: <span class="hljs-string">'投我准没错'</span>,
            <span class="hljs-attr">votes</span>: <span class="hljs-number">53</span>
         },{
            <span class="hljs-attr">title</span>: <span class="hljs-string">'不要投给我楼上的'</span>,
            <span class="hljs-attr">votes</span>: <span class="hljs-number">10</span>
         }],
          <span class="hljs-attr">comment</span>: <span class="hljs-string">''</span>
     },
     <span class="hljs-attr">methods</span>: {
         <span class="hljs-attr">postComment</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
             <span class="hljs-keyword">this</span>.posts.push({
               <span class="hljs-attr">title</span>: <span class="hljs-keyword">this</span>.comment,
               <span class="hljs-attr">votes</span>: <span class="hljs-number">0</span>
             })
             <span class="hljs-keyword">this</span>.comment = <span class="hljs-string">''</span>;
         }
     }
});
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>输入框用v-model绑定了comment字段，为了无论用户输入什么，在提交的时候都能获得他输入的值。当用户按回车或者点击提交按钮的时候都会触发postComment方法。这里的事件绑定一个是用的回车事件 @keyup.enter，还有一个点击事件@click。postComment方法就是把话题和投票为0的对象push进posts数组中去，Vue会将新的模板自动渲染出来。</p>
<p>这样一个可复用的组件就构造完成了，组件化会节省开发者的很多时间。组件是否复用，也要结合开发的实际需求而定。</p>
<h3 id="articleHeader5">后记</h3>
<p>到此为止，你就已经能够掌握了Vue的组件的基本使用，组件通过props向下传递数据，通过使用&lt;template&gt;标签来构造模板。我们在上文中利用构建了一个评论发布投票系统来说明了组件的用法，并且简单介绍了如何复用。</p>
<blockquote><ul>
<li><p>利用 props，子组件可以定义需要父级传递的字段</p></li>
<li><p>利用 'v-bind:' 或 ':' 在自定义标签的地方绑定父级指派的字段</p></li>
<li><p>组件的 data 和 el 必须定义为function</p></li>
<li><p>不要忘记，还是需要将Vue实例化，才能使用组件。</p></li>
</ul></blockquote>
<p><a href="https://github.com/AppianZ/Close2Vue" rel="nofollow noreferrer" target="_blank">github地址</a><br><a href="https://github.com/AppianZ/Close2Vue" rel="nofollow noreferrer" target="_blank">https://github.com/AppianZ/Close2Vue</a></p>
<p>推荐一个Vue交流群：364912432</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
组件改变生活_揭开Vue组件的神秘面纱

## 原文链接
[https://segmentfault.com/a/1190000005045219](https://segmentfault.com/a/1190000005045219)

