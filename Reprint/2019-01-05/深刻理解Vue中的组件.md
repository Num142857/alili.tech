---
title: '深刻理解Vue中的组件' 
date: 2019-01-05 2:30:11
hidden: true
slug: 7uhwcfdfx1j
categories: [reprint]
---

{{< raw >}}

                    
<p>2018-07-19更新:</p>
<ol>
<li>更新作用域插槽的属性: <code>scope</code> -&gt; <code>slot-scope</code>;</li>
<li>添加了对象解构。</li>
</ol>
<p>今天看了下Vue官网上关于组件的教程，感觉内容还挺多，现在把组件中基本的知识梳理一下。</p>
<hr>
<h2 id="articleHeader0">组件的基本使用</h2>
<h3 id="articleHeader1">注册组件</h3>
<p>注册组件就是利用<code>Vue.component()</code>方法，先传入一个自定义组件的名字，然后传入这个组件的配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Vue.component('mycomponent',{
    template: `<div>这是一个自定义组件</div>`,
    data () {
      return {
        message: 'hello world'
      }
    }
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> Vue.component(<span class="hljs-string">'mycomponent'</span>,{
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;这是一个自定义组件&lt;/div&gt;`</span>,
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">message</span>: <span class="hljs-string">'hello world'</span>
      }
    }
  })</code></pre>
<p>如上方式，就已经创建了一个自定义组件，然后就可以在Vue实例挂在的DOM元素中使用它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;app&quot;>
    <mycomponent></mycomponent>
    <my-component></my-component>
</div>
<script>
  var app = new Vue({
    el: '#app',
    data: {
    },
    components: {
      'my-component': {
        template: `<div>这是一个局部的自定义组件，只能在当前Vue实例中使用</div>`,
      }
    }
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> &lt;div id=<span class="hljs-string">"app"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">mycomponent</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mycomponent</span>&gt;</span></span>
    &lt;my-component&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;script&gt;
  <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">data</span>: {
    },
    <span class="hljs-attr">components</span>: {
      <span class="hljs-string">'my-component'</span>: {
        <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;这是一个局部的自定义组件，只能在当前Vue实例中使用&lt;/div&gt;`</span>,
      }
    }
  })
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>直接使用<code>Vue.component()</code>创建的组件，所有的Vue实例都可以使用。还可以在某个Vue实例中注册只有自己能使用的组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '#app',
    data: {
    },
    components: {
      'my-component': {
        template: `<div>这是一个局部的自定义组件，只能在当前Vue实例中使用</div>`,
      }
    }
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">data</span>: {
    },
    <span class="hljs-attr">components</span>: {
      <span class="hljs-string">'my-component'</span>: {
        <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;这是一个局部的自定义组件，只能在当前Vue实例中使用&lt;/div&gt;`</span>,
      }
    }
  })</code></pre>
<h3 id="articleHeader2">模板的要求</h3>
<p><strong>注意</strong>：组件的模板只能有一个根元素。下面的情况是不允许的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="template: `<div>这是一个局部的自定义组件，只能在当前Vue实例中使用</div>
            <button>hello</button>`," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">template: <span class="hljs-string">`&lt;div&gt;这是一个局部的自定义组件，只能在当前Vue实例中使用&lt;/div&gt;
            &lt;button&gt;hello&lt;/button&gt;`</span>,</code></pre>
<h3 id="articleHeader3">组件中的data必须是函数</h3>
<p>可以看出，注册组件时传入的配置和创建Vue实例差不多，但也有不同，其中一个就是<code>data</code>属性必须是一个函数。<br>这是因为如果像Vue实例那样，传入一个对象，由于JS中对象类型的变量实际上保存的是对象的<code>引用</code>，所以当存在多个这样的组件时，会共享数据，导致一个组件中数据的改变会引起其他组件数据的改变。</p>
<p>而使用一个返回对象的函数，每次使用组件都会创建一个新的对象，这样就不会出现<strong>共享数据</strong>的问题来了。</p>
<h3 id="articleHeader4">关于DOM模板的解析</h3>
<p>当使用 DOM 作为模版时 (例如，将 el 选项挂载到一个已存在的元素上), 你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模板内容。尤其像这些元素 <code>&lt;ul&gt;</code>，<code>&lt;ol&gt;</code>，<code>&lt;table&gt;</code>，<code>&lt;select&gt;</code> 限制了能被它包裹的元素，而一些像 <code>&lt;option&gt; </code>这样的元素只能出现在某些其它元素内部。</p>
<p>在自定义组件中使用这些受限制的元素时会导致一些问题，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
  <my-row>...</my-row>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-row</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">my-row</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p>自定义组件 <code>&lt;my-row&gt;</code> 被认为是无效的内容，因此在渲染的时候会导致错误。这时应使用特殊的 <code>is</code> 属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table>
  <tr is=&quot;my-row&quot;></tr>
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">is</span>=<span class="hljs-string">"my-row"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<p>也就是说，标准HTML中，一些元素中只能放置特定的子元素，另一些元素只能存在于特定的父元素中。比如<code>table</code>中不能放置<code>div</code>，<code>tr</code>的父元素不能<code>div</code>等。所以，当使用自定义标签时，标签名还是那些标签的名字，但是可以在标签的<code>is</code>属性中填写自定义组件的名字。</p>
<p><strong>应当注意，如果您使用来自以下来源之一的字符串模板，这些限制将不适用：</strong></p>
<ul>
<li><code>&lt;script type="text/x-template"&gt;</code></li>
<li>JavaScript 内联模版字符串</li>
<li>
<code>.vue</code> 组件</li>
</ul>
<p>其中，前两个模板都不是Vue官方推荐的，所以一般情况下，只有单文件组件<code>.vue</code>可以忽略这种情况。</p>
<h2 id="articleHeader5">组件的属性和事件</h2>
<p>在html中使用元素，会有一些属性，如<code>class</code>,<code>id</code>，还可以绑定事件，自定义组件也是可以的。当在一个组件中，使用了其他自定义组件时，就会利用子组件的<strong>属性</strong>和<strong>事件</strong>来和父组件进行数据交流。<br>&lt;img src="/assets/images/props-events.png"/&gt;</p>
<p>如上如所示，父子组件之间的通信就是<strong> props</strong> <strong>down,events</strong> <strong>up</strong>，父组件通过 属性<strong>props</strong>向下传递数据给子组件，子组件通过 事件<strong>events</strong> 给父组件发送消息。<br>比如，子组件需要某个数据，就在内部定义一个<code>prop</code>属性，然后父组件就像给html元素指定特性值一样，把自己的data属性传递给子组件的这个属性。<br>而当子组件内部发生了什么事情的时候，就通过<strong>自定义事件</strong>来把这个事情涉及到的数据暴露出来，供父组件处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-component v-bind:foo=&quot;baz&quot; v-on:event-a=&quot;doThis(arg1,...arg2)&quot;></my-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;my-component v-bind:foo=<span class="hljs-string">"baz"</span> v-on:event-a=<span class="hljs-string">"doThis(arg1,...arg2)"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span></span></code></pre>
<p>如上代码，</p>
<ul>
<li>
<code>foo</code>是<code>&lt;my-component&gt;</code>组件内部定义的一个<code>prop</code>属性，<code>baz</code>是父组件的一个data属性，</li>
<li>
<code>event-a</code>是子组件定义的一个事件，<code>doThis</code>是父组件的一个方法</li>
</ul>
<p>过程就是这样：</p>
<ul>
<li>父组件把<code>baz</code>数据通过<code>prop</code>传递给子组件的<code>foo</code>；</li>
<li>子组件内部得到<code>foo</code>的值，就可以进行相应的操作；</li>
<li>当子组件内部发生了一些变化，希望父组件能知道时，就利用代码触发<code>event-a</code>事件，把一些数据发送出去</li>
<li>父组件把这个事件处理器绑定为<code>doThis</code>方法，子组件发送的数据，就作为<code>doThis</code>方法的参数被传进来</li>
<li>然后父组件就可以根据这些数据，进行相应的操作</li>
</ul>
<h2 id="articleHeader6">属性Props</h2>
<p>Vue组件通过<code>props</code>属性来声明一个自己的属性，然后父组件就可以往里面传递数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('mycomponent',{
    template: '<div>这是一个自定义组件,父组件传给我的内容是："{{"myMessage"}}"</div>',
    props: ['myMessage'],
    data () {
      return {
        message: 'hello world'
      }
    }
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'mycomponent'</span>,{
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;这是一个自定义组件,父组件传给我的内容是："{{"myMessage"}}"&lt;/div&gt;'</span>,
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'myMessage'</span>],
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">message</span>: <span class="hljs-string">'hello world'</span>
      }
    }
  })</code></pre>
<p>然后调用该组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <mycomponent my-message=&quot;hello&quot;></mycomponent>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mycomponent</span> <span class="hljs-attr">my-message</span>=<span class="hljs-string">"hello"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mycomponent</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>注意</strong>，由于HTML特性是不区分大小写的，所以传递属性值时，<code>myMessage</code>应该转换成 kebab-case (短横线隔开式)<code>my-message="hello"</code>。</p>
<h3 id="articleHeader7">v-bind绑定属性值</h3>
<p>这里说一下<code>v-bind</code>绑定属性值的一个特性：一般情况下，使用<code>v-bind</code>给元素特性(attribute)传递值时，Vue会将<code>""</code>中的内容当做一个表达式。<br>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div attr=&quot;message&quot;>hello</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">attr</span>=<span class="hljs-string">"message"</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>上面这样，<code>div</code>元素的<code>attr</code>特性值就是<code>message</code>。</p>
<p>而这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-bind:attr=&quot;message&quot;>hello</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;div v-bind:attr=<span class="hljs-string">"message"</span>&gt;hello&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>这里的<code>message</code>应该是Vue实例的data的一个属性，这样<code>div</code>元素的<code>attr</code>特性值就是<code>message</code>这个属性的值。</p>
<p>之所以说是一般情况，是因为<code>class</code>和<code>style</code>特性并不是这样。用<code>v-bind:class</code>和<code>class</code>传入正常的类名，效果是一样的，因为对于这两个特性，Vue采用了合并而不是替换的原则。</p>
<h3 id="articleHeader8">动态绑定特性值</h3>
<p>根据上面，想要把父组件的属性绑定到子组件，应该使用<code>v-bind</code>，这样，父组件中数据改变时能反映到子组件。<br><strong>注意</strong>，根据父组件传递给子组件的属性类型的不同，当在子组件中更改这个属性时，会有以下两种情况：</p>
<ul>
<li>
<p>当父组件传递的属性是引用类型时，在子组件中更改相应的属性会导致父组件相应属性的更改。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <div id=&quot;app2&quot;>
     <div>这是父组件的parentArray："{{"parentArray"}}"</div>
     <my-component :child-array=&quot;parentArray&quot;></my-component>
   </div>
   <script>
     Vue.component('my-component', {
       template: `
       <div>这是接收了父组件传递值的子组件的childArray: "{{"childArray"}}" <br>
           <button type=&quot;button&quot; @click=&quot;changeArray&quot;>
           点击我改变父元素的parentArray</button>
         </div>`,
       props: ['childArray'],
       data () {
         return {
           counter: 1
         }
       },
       methods: {
         changeArray () {
           this.childArray.push(this.counter++)
         }
       }
     })
     new Vue({
       el: '#app2',
       data: {
         parentArray: []
       }
     })
   </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">   &lt;div id=<span class="hljs-string">"app2"</span>&gt;
     <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>这是父组件的parentArray："{{"parentArray"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
     &lt;my-component :child-array=<span class="hljs-string">"parentArray"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
   &lt;script&gt;
     Vue.component(<span class="hljs-string">'my-component'</span>, {
       <span class="hljs-attr">template</span>: <span class="hljs-string">`
       &lt;div&gt;这是接收了父组件传递值的子组件的childArray: "{{"childArray"}}" &lt;br&gt;
           &lt;button type="button" @click="changeArray"&gt;
           点击我改变父元素的parentArray&lt;/button&gt;
         &lt;/div&gt;`</span>,
       <span class="hljs-attr">props</span>: [<span class="hljs-string">'childArray'</span>],
       data () {
         <span class="hljs-keyword">return</span> {
           <span class="hljs-attr">counter</span>: <span class="hljs-number">1</span>
         }
       },
       <span class="hljs-attr">methods</span>: {
         changeArray () {
           <span class="hljs-keyword">this</span>.childArray.push(<span class="hljs-keyword">this</span>.counter++)
         }
       }
     })
     <span class="hljs-keyword">new</span> Vue({
       <span class="hljs-attr">el</span>: <span class="hljs-string">'#app2'</span>,
       <span class="hljs-attr">data</span>: {
         <span class="hljs-attr">parentArray</span>: []
       }
     })
   &lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
</li>
<li>
<p>当父组件传递值为基本类型时，在子组件中更改这个属性会报错。正确的做法是，在父组件中绑定属性值时，加上<code>.sync</code>修饰符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-component :child-array.sync=&quot;parentArray&quot;></my-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;my-component :child-array.sync=<span class="hljs-string">"parentArray"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span></span></code></pre>
<p>然后在子组件中改变相应的属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    methods: {
     changeArray () {
       this.counter++
       this.$emit('update:childArray', this.counter)
     }
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    methods: {
     changeArray () {
       <span class="hljs-keyword">this</span>.counter++
       <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'update:childArray'</span>, <span class="hljs-keyword">this</span>.counter)
     }
   }</code></pre>
</li>
</ul>
<h3 id="articleHeader9">子组件希望对传入的prop进行操作</h3>
<p>一般来说，是不建议在子组件中对父组件中传递来的属性进行操作的。如果真的有这种需求,可以这样:</p>
<ol>
<li>
<p>父组件传递了一个基本类型值，那么可以在子组件中创建一个新的属性，并以传递进来的值进行初始化，之后就可以操作这个新的属性了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">props: [<span class="hljs-string">'initialCounter'</span>],
<span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">counter</span>: <span class="hljs-keyword">this</span>.initialCounter }
}</code></pre>
</li>
<li>父组件传递了一个引用类型值，为了避免更改父组件中相应的数据，最好是对引用类型进行复制。复杂的情况，肯定应该是深复制。</li>
</ol>
<h3 id="articleHeader10">给子组件传递正确类型的值</h3>
<p>同样是上面的原因，静态的给子组件的特性传递值，它都会把他当做一个字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 传递了一个字符串 &quot;1&quot; -->
<comp some-prop=&quot;1&quot;></comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 传递了一个字符串 "1" --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">some-prop</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span></code></pre>
<p>子组件中，特性的值是字符串 "1" 而不是 number 1。如果想传递正确的数值，应该使用<code>v-bind</code>传递，这样就能把传递的值当做一个表达式来处理，而不是字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 传递实际的 number 1 -->
<comp v-bind:some-prop=&quot;1&quot;></comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 传递实际的 number 1 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">comp</span> <span class="hljs-attr">v-bind:some-prop</span>=<span class="hljs-string">"1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span></code></pre>
<h2 id="articleHeader11">Prop验证</h2>
<p>我们可以给组件的<code>props</code>属性添加验证，当传入的数据不符合要求时，Vue会发出警告。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('example', {
  props: {
    // 基础类型检测 (`null` 意思是任何类型都可以)
    propA: Number,
    // 多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数字，有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'example'</span>, {
  <span class="hljs-attr">props</span>: {
    <span class="hljs-comment">// 基础类型检测 (`null` 意思是任何类型都可以)</span>
    propA: <span class="hljs-built_in">Number</span>,
    <span class="hljs-comment">// 多种类型</span>
    propB: [<span class="hljs-built_in">String</span>, <span class="hljs-built_in">Number</span>],
    <span class="hljs-comment">// 必传且是字符串</span>
    propC: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-comment">// 数字，有默认值</span>
    propD: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-number">100</span>
    },
    <span class="hljs-comment">// 数组/对象的默认值应当由一个工厂函数返回</span>
    propE: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> { <span class="hljs-attr">message</span>: <span class="hljs-string">'hello'</span> }
      }
    },
    <span class="hljs-comment">// 自定义验证函数</span>
    propF: {
      <span class="hljs-attr">validator</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
        <span class="hljs-keyword">return</span> value &gt; <span class="hljs-number">10</span>
      }
    }
  }
})</code></pre>
<p><code>type</code> 可以是下面原生构造器：</p>
<ul>
<li>String</li>
<li>Number</li>
<li>Boolean</li>
<li>Function</li>
<li>Object</li>
<li>Array</li>
<li>Symbol</li>
</ul>
<p><code>type</code> 也可以是一个自定义构造器函数，使用 <code>instanceof</code> 检测。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // 自定义Person构造器
 function Person(name, age) {
    this.name = name
    this.age = age
  }
  Vue.component('my-component', {
    template: `<div>名字: "{{" person-prop.name "}}"， 年龄： "{{" person-prop.age "}}" </div>`,
    props: {
      person-prop: {
        type: Person     // 指定类型
      }
    }
  })
  new Vue({
    el: '#app2',
    data: {
      person: 2        // 传入Number类型会报错
    }
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-comment">// 自定义Person构造器</span>
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.age = age
  }
  Vue.component(<span class="hljs-string">'my-component'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;名字: "{{" person-prop.name "}}"， 年龄： "{{" person-prop.age "}}" &lt;/div&gt;`</span>,
    <span class="hljs-attr">props</span>: {
      person-prop: {
        <span class="hljs-attr">type</span>: Person     <span class="hljs-comment">// 指定类型</span>
      }
    }
  })
  <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app2'</span>,
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">person</span>: <span class="hljs-number">2</span>        <span class="hljs-comment">// 传入Number类型会报错</span>
    }
  })</code></pre>
<h2 id="articleHeader12">非Prop类型的属性</h2>
<p>也可以像在html标签中添加<code>data-</code>开头的自定义属性一样，给自定义组件添加任意的属性。而不仅限于<code>data-*</code>形式，这样做的话，Vue会把这个属性放在自定义组件的根元素上。<strong>一个自定义组件的模板只能有一个根元素</strong>。</p>
<h3 id="articleHeader13">覆盖非Prop属性</h3>
<p>如果父组件向子组件的非prop属性传递了值，那么这个值会覆盖子组件模板中的特性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app3&quot;>
    <my-component2 att=&quot;helloParent&quot;></my-component2>
</div>
<script>
  Vue.component('my-component2', {
    template: `<div att=&quot;helloChild&quot;>子组件原有的特性被覆盖了</div>`
  })
  new Vue({
    el: '#app3'
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"app3"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-component2</span> <span class="hljs-attr">att</span>=<span class="hljs-string">"helloParent"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;script&gt;
  Vue.component(<span class="hljs-string">'my-component2'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div att="helloChild"&gt;子组件原有的特性被覆盖了&lt;/div&gt;`</span>
  })
  <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app3'</span>
  })
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>上面渲染的结果是，<code>div</code>的<code>att</code>属性是<code>helloParent</code>。<br><strong>注意</strong>：前面已经提到过，覆盖原则对于<code>class</code>和<code>style</code>不适用,而是采用了合并(merge)的原则。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app3&quot;>
    <my-component2 att=&quot;helloParent&quot; class=&quot;class2&quot; style=&quot;color: red;&quot;></my-component2>
</div>
<script>
  Vue.component('my-component2', {
    template: `<div att=&quot;helloChild&quot; class=&quot;class1&quot; style=&quot;background: yellow;&quot;>子组件原有的特性被覆盖了</div>`
  })
  new Vue({
    el: '#app3'
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"app3"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-component2</span> <span class="hljs-attr">att</span>=<span class="hljs-string">"helloParent"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"class2"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: red;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;script&gt;
  Vue.component(<span class="hljs-string">'my-component2'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div att="helloChild" class="class1" style="background: yellow;"&gt;子组件原有的特性被覆盖了&lt;/div&gt;`</span>
  })
  <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app3'</span>
  })
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>上面的渲染结果是，<code>div</code>的类名是<code>class1 class2</code>，行内样式是<code>color:red; background:yellow;</code>。</p>
<h2 id="articleHeader14">自定义事件</h2>
<p>通过<code>prop</code>属性，父组件可以向子组件传递数据，而子组件的自定义事件就是用来将内部的数据报告给父组件的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app3&quot;>
    <my-component2 v-on:myclick=&quot;onClick&quot;></my-component2>
</div>
<script>
  Vue.component('my-component2', {
    template: `<div>
    <button type=&quot;button&quot; @click=&quot;childClick&quot;>点击我触发自定义事件</button>
    </div>`,
    methods: {
      childClick () {
        this.$emit('myclick', '这是我暴露出去的数据', '这是我暴露出去的数据2')
      }
    }
  })
  new Vue({
    el: '#app3',
    methods: {
      onClick () {
        console.log(arguments)
      }
    }
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"app3"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-component2</span> <span class="hljs-attr">v-on:myclick</span>=<span class="hljs-string">"onClick"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component2</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;script&gt;
  Vue.component(<span class="hljs-string">'my-component2'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;
    &lt;button type="button" @click="childClick"&gt;点击我触发自定义事件&lt;/button&gt;
    &lt;/div&gt;`</span>,
    <span class="hljs-attr">methods</span>: {
      childClick () {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'myclick'</span>, <span class="hljs-string">'这是我暴露出去的数据'</span>, <span class="hljs-string">'这是我暴露出去的数据2'</span>)
      }
    }
  })
  <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app3'</span>,
    <span class="hljs-attr">methods</span>: {
      onClick () {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">arguments</span>)
      }
    }
  })
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>如上所示，共分为以下步骤：</p>
<ol>
<li>
<p>子组件在自己的方法中将自定义事件以及需要发出的数据通过以下代码发送出去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" this.$emit('myclick', '这是我暴露出去的数据', '这是我暴露出去的数据2')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'myclick'</span>, <span class="hljs-string">'这是我暴露出去的数据'</span>, <span class="hljs-string">'这是我暴露出去的数据2'</span>)</code></pre>
<ul>
<li>第一个参数是自定义事件的名字</li>
<li>后面的参数是依次想要发送出去的数据</li>
</ul>
</li>
<li>
<p>父组件利用<code>v-on</code>为事件绑定处理器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-component2 v-on:myclick=&quot;onClick&quot;></my-component2>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">my-component2</span> <span class="hljs-attr">v-on:myclick</span>=<span class="hljs-string">"onClick"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component2</span>&gt;</span></code></pre>
<p>这样,在Vue实例的<code>methods</code>方法中就可以调用传进来的参数了</p>
</li>
</ol>
<p><strong>注意</strong>： 在使用<code>v-on</code>绑定事件处理方法时，不应该传进任何参数，而是直接写<code>v-on:myclick="onClick"</code>,不然，子组件暴露出来的数据就无法获取到了</p>
<h3 id="articleHeader15">绑定原生事件</h3>
<p>如果想在某个组件的<strong>根元素</strong>上监听一个原生事件。可以使用 <code>.native</code> 修饰 <code>v-on</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-component v-on:click.native=&quot;doTheThing&quot;></my-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;my-component v-on:click.native=<span class="hljs-string">"doTheThing"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span></span></code></pre>
<h3 id="articleHeader16">探究<code>v-model</code>
</h3>
<p><code>v-model</code>可以对表单控件实现数据的双向绑定，它的原理就是利用了绑定属性和事件来实现的。比如<code>input</code>控件。不使用<code>v-model</code>，可以这样实现数据的双向绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app4&quot;>
    <input type=&quot;text&quot; v-bind:value=&quot;text&quot; v-on:input=&quot;changeValue($event.target.value)&quot;>
    "{{"text"}}"
  </div>
  <script>
      new Vue({
        el: '#app4',
        data: {
          text: '444'
        },
        methods: {
          changeValue (value) {
            this.text = value
          }
        }
      })
  </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"app4"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-bind:value</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-on:input</span>=<span class="hljs-string">"changeValue($event.target.value)"</span>&gt;</span>
    "{{"text"}}"
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;script&gt;
      <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app4'</span>,
        <span class="hljs-attr">data</span>: {
          <span class="hljs-attr">text</span>: <span class="hljs-string">'444'</span>
        },
        <span class="hljs-attr">methods</span>: {
          changeValue (value) {
            <span class="hljs-keyword">this</span>.text = value
          }
        }
      })
  &lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>上面的代码同样实现了数据的双向绑定。其本质就是:</p>
<ul>
<li>把<code>input</code>的<code>value</code>特性绑定到Vue实例的属性<code>text</code>上，<code>text</code>改变，<code>input</code>中的内容也会改变</li>
<li>然后把表单的<code>input</code>事件处理函数设置为Vue实例的一个方法，这个方法会根据输入参数改变Vue中<code>text</code>`的值</li>
<li>相应的，在<code>input</code>中输入内容时，触发了<code>input</code>事件，把<code>event.target.value</code>传给这个方法，最后就实现了改变绑定的数据的效果。</li>
</ul>
<p>而<code>v-model</code>就是上面这种方式的语法糖，也就是把上面的写法封装了一下，方便我们使用。</p>
<h3 id="articleHeader17">使用自定义事件创建自定义的表单输入组件</h3>
<p>理解了<code>v-model</code>的内幕，也就可以把这个效果用在自定义表单组件上了。<br>来实现一个简单的只能输入<code>hello</code>的表单输入组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app5&quot;>
    <my-component3 v-model=&quot;hello&quot;></my-component3>
    <div>"{{"hello"}}"</div>
</div>
<script>
  Vue.component('my-component3', {
    template: `<input ref=&quot;input&quot; type=&quot;text&quot; :value=&quot;value&quot; @input=&quot;checkInput($event.target.value)&quot;>`,
    props: ['value'],
    methods: {
      checkInput (value) {
        var hello = 'hello'
        if (!hello.includes(value)) {
          this.$emit('input', hello)
          this.$refs.input.value = hello
        } else {
          this.$emit('input', value)
        }
      }
    }
  })
  new Vue({
    el: '#app5',
    data: {
      hello: ''
    }
  })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"app5"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-component3</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"hello"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{"hello"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;script&gt;
  Vue.component(<span class="hljs-string">'my-component3'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;input ref="input" type="text" :value="value" @input="checkInput($event.target.value)"&gt;`</span>,
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'value'</span>],
    <span class="hljs-attr">methods</span>: {
      checkInput (value) {
        <span class="hljs-keyword">var</span> hello = <span class="hljs-string">'hello'</span>
        <span class="hljs-keyword">if</span> (!hello.includes(value)) {
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, hello)
          <span class="hljs-keyword">this</span>.$refs.input.value = hello
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'input'</span>, value)
        }
      }
    }
  })
  <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app5'</span>,
    <span class="hljs-attr">data</span>: {
      <span class="hljs-attr">hello</span>: <span class="hljs-string">''</span>
    }
  })
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<h3 id="articleHeader18">定制组件的<code>v-model</code>
</h3>
<p>默认情况下，一个组件的 <code>v-model</code> 会使用 <code>value</code> 属性和 <code>input</code> 事件，但是诸如单选框、复选框之类的输入类型可能把 <code>value</code> 属性用作了别的目的。<code>model</code> 选项可以回避这样的冲突：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-checkbox', {
  model: {
    prop: 'checked',   // 将输入的特性改为checked
    event: 'change'        // 触发的自定义事件类型为change
  },
  props: {
    checked: Boolean,
    // this allows using the `value` prop for a different purpose
    value: String
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'my-checkbox'</span>, {
  <span class="hljs-attr">model</span>: {
    <span class="hljs-attr">prop</span>: <span class="hljs-string">'checked'</span>,   <span class="hljs-comment">// 将输入的特性改为checked</span>
    event: <span class="hljs-string">'change'</span>        <span class="hljs-comment">// 触发的自定义事件类型为change</span>
  },
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">checked</span>: <span class="hljs-built_in">Boolean</span>,
    <span class="hljs-comment">// this allows using the `value` prop for a different purpose</span>
    value: <span class="hljs-built_in">String</span>
  }
})</code></pre>
<p>这样设置的话，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-checkbox v-model=&quot;foo&quot; value=&quot;some value&quot;></my-checkbox>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;my-checkbox v-model=<span class="hljs-string">"foo"</span> value=<span class="hljs-string">"some value"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">my-checkbox</span>&gt;</span></span></code></pre>
<p>上面的代码就等同于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-checkbox :checked=&quot;foo&quot; @change=&quot;val => { foo = val }&quot; value=&quot;some value&quot;></my-checkbox>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">&lt;my-checkbox :checked=<span class="hljs-string">"foo"</span> @change=<span class="hljs-string">"val =&gt; { foo = val }"</span> value=<span class="hljs-string">"some value"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">my-checkbox</span>&gt;</span></span></code></pre>
<p>实际使用时，与之前不同的地方是:</p>
<ol>
<li>把子组件中接收外部数据的<code>prop</code>属性改为<code>checked</code>
</li>
<li>向父组件发出事件时，事件类型应改为<code>change</code>
</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-component3', {
    template: `<input ref=&quot;input&quot; type=&quot;text&quot; :value=&quot;checked&quot; @input=&quot;checkInput($event.target.value)&quot;>`,
    props: ['checked'],        // 属性名改变
    model: {
      prop: 'checked',
      event: 'change'
    },
    methods: {
      checkInput (value) {
        var hello = 'hello'
        if (!hello.includes(value)) {
          this.$emit('change', hello)   // 事件类型改变
          this.$refs.input.value = hello
        } else {
          this.$emit('change', value)  // 事件类型改变
        }
      }
    }
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">Vue.component(<span class="hljs-string">'my-component3'</span>, {
    <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;input ref="input" type="text" :value="checked" @input="checkInput($event.target.value)"&gt;`</span>,
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'checked'</span>],        <span class="hljs-comment">// 属性名改变</span>
    model: {
      <span class="hljs-attr">prop</span>: <span class="hljs-string">'checked'</span>,
      <span class="hljs-attr">event</span>: <span class="hljs-string">'change'</span>
    },
    <span class="hljs-attr">methods</span>: {
      checkInput (value) {
        <span class="hljs-keyword">var</span> hello = <span class="hljs-string">'hello'</span>
        <span class="hljs-keyword">if</span> (!hello.includes(value)) {
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'change'</span>, hello)   <span class="hljs-comment">// 事件类型改变</span>
          <span class="hljs-keyword">this</span>.$refs.input.value = hello
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'change'</span>, value)  <span class="hljs-comment">// 事件类型改变</span>
        }
      }
    }
  })</code></pre>
<h2 id="articleHeader19">动态组件</h2>
<p>通过使用保留的 <code>&lt;component&gt;</code> 元素，动态地绑定到它的 <code>is</code> 特性，可以让多个组件使用同一个挂载点，并动态切换：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;app6&quot;>
    <select v-model=&quot;currentComponent&quot;>
      <option value=&quot;home&quot;>home</option>
      <option value=&quot;post&quot;>post</option>
      <option value=&quot;about&quot;>about</option>
    </select>
    <component :is=&quot;currentComponent&quot;></component>
  </div>
  <script>
      new Vue({
        el: '#app6',
        data: {
          currentComponent: 'home'
        },
        components: {
          home: {
            template: `<header>这是home组件</header>`
          },
          post: {
            template: `<header>这是post组件</header>`
          },
          about: {
            template: `<header>这是about组件</header>`
          }
        }
      })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> &lt;div id=<span class="hljs-string">"app6"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"currentComponent"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"home"</span>&gt;</span>home<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"post"</span>&gt;</span>post<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"about"</span>&gt;</span>about<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span></span>
    &lt;component :is=<span class="hljs-string">"currentComponent"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/div&gt;
  &lt;script&gt;
      new Vue({
        el: '#app6',
        data: {
          currentComponent: 'home'
        },
        components: {
          home: {
            template: `&lt;header&gt;这是home组件&lt;/</span>header&gt;<span class="hljs-string">`
          },
          post: {
            template: `</span>&lt;header&gt;这是post组件&lt;<span class="hljs-regexp">/header&gt;`
          },
          about: {
            template: `&lt;header&gt;这是about组件&lt;/</span>header&gt;<span class="hljs-string">`
          }
        }
      })
&lt;/script&gt;</span></code></pre>
<p>也可以直接绑定到组件对象上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Home = {
  template: `<header>这是home组件</header>`
}
new Vue({
  el: '#app6',
  data: {
    currentComponent: Home
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var Home = {
  template: `<span class="hljs-symbol">&lt;header&gt;</span>这是home组件&lt;/header&gt;`
}
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#app6'</span>,
  dat<span class="hljs-variable">a:</span> {
    currentComponen<span class="hljs-variable">t:</span> Home
  }
})</code></pre>
<h3 id="articleHeader20">保留切换出去的组件，避免重新渲染</h3>
<p>如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 <code>keep-alive </code>指令参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive>
  <component :is=&quot;currentComponent&quot;>
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"currentComponent"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 非活动组件将被缓存！ --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span></code></pre>
<h2 id="articleHeader21">使用slot分发内容</h2>
<p>终于到了基本知识的最后一个了。<a href="https://cn.vuejs.org/v2/guide/components.html#" rel="nofollow noreferrer" target="_blank">官网</a>写的很详细。</p>
<h3 id="articleHeader22">单个slot</h3>
<p>上面用到的很多组件的使用方式是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <component></component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"> &lt;component&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span></span></code></pre>
<p>也就是说组件中是空的，没有放置任何文本或元素。但是原生的html元素都是可以进行嵌套的，<code>div</code>里面放<code>table</code><br>什么的。自定义组件开闭标签之间也可以放置内容，不过需要在定义组件时使用<code>slot</code>。</p>
<p><code>slot</code>相当于子组件设置了一个地方，如果在调用它的时候，往它的开闭标签之间放了东西，那么它就把这些东西放到<code>slot</code>中。</p>
<ol>
<li>当子组件中没有<code>slot</code>时，父组件放在子组件标签内的东西将被丢弃；</li>
<li>子组件的<code>slot</code>标签内可以放置内容，当父组件没有放置内容在子组件标签内时，<code>slot</code>中的内容会渲染出来；</li>
<li>当父组件在子组件标签内放置了内容时，<code>slot</code>中的内容被丢弃</li>
</ol>
<p>子组件的模板:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <h2>我是子组件的标题</h2>
  <slot>
    只有在没有要分发的内容时才会显示。
  </slot>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是子组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
  &lt;slot&gt;
    只有在没有要分发的内容时才会显示。
  &lt;<span class="hljs-regexp">/slot&gt;
&lt;/</span>div&gt;</code></pre>
<p>父组件模板：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <h1>我是父组件的标题</h1>
  <my-component>
    <p>这是一些初始内容</p>
  </my-component>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我是父组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
  &lt;my-component&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这是一些初始内容<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/my-component&gt;
&lt;/</span>div&gt;</code></pre>
<p>渲染结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <h1>我是父组件的标题</h1>
  <div>
    <h2>我是子组件的标题</h2>
    <p>这是一些初始内容</p>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>我是父组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
  &lt;div&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是子组件的标题<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
    &lt;p&gt;这是一些初始内容&lt;<span class="hljs-regexp">/p&gt;
  &lt;/</span>div&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<h3 id="articleHeader23">具名slot</h3>
<p><code>slot</code>可以有很多个。那么子组件对于父组件放置的多余的内容如何放到各个<code>slot</code>中呢？方法就是子组件给每个<code>slot</code>起一个名字<code>name</code>，父组件放置多余的元素时，给每个元素的<code>slot</code>属性分配一个代表<code>slot</code>的名字。到时候，多余的内容就会根据自己的<code>slot</code>属性去找具有对应名字的<code>slot</code>元素。</p>
<p><strong>注意</strong>：</p>
<ol>
<li>子组件可以有一个匿名的<code>slot</code>，当分发的多余内容找不到对应的<code>slot</code>时，就会进入这里面</li>
<li>如果子组件没有匿名的<code>slot</code>，当分发的多余内容找不到对应的<code>slot</code>时，就会被丢弃</li>
</ol>
<p>例如，假定我们有一个 app-layout 组件，它的模板为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <header>
    <slot name=&quot;header&quot;></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name=&quot;footer&quot;></slot>
  </footer>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"header"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>
  &lt;main&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/main&gt;
  &lt;footer&gt;
    &lt;slot name="footer"&gt;&lt;/</span>slot&gt;
  <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>父组件模版：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<app-layout>
  <h1 slot=&quot;header&quot;>这里可能是一个页面标题</h1>
  <p>主要内容的一个段落。</p>
  <p>另一个主要段落。</p>
  <p slot=&quot;footer&quot;>这里有一些联系信息</p>
</app-layout>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;app-layout&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"header"</span>&gt;</span>这里可能是一个页面标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
  &lt;p&gt;主要内容的一个段落。&lt;<span class="hljs-regexp">/p&gt;
  &lt;p&gt;另一个主要段落。&lt;/</span>p&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"footer"</span>&gt;</span>这里有一些联系信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/app-layout&gt;</span></code></pre>
<p>渲染结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
  </main>
  <footer>
    <p>这里有一些联系信息</p>
  </footer>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>这里可能是一个页面标题<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>
  &lt;main&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>主要内容的一个段落。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    &lt;p&gt;另一个主要段落。&lt;<span class="hljs-regexp">/p&gt;
  &lt;/m</span>ain&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>这里有一些联系信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<h3 id="articleHeader24">作用域插槽</h3>
<p>作用域插槽也是一个插槽<code>slot</code>，但是他可以把数据传递给到父组件的特定元素内，然后有父组件决定如何渲染这些数据。</p>
<ol>
<li>
<p>首先，子组件的<code>slot</code>需要有一些特性(prop)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  Vue.component('my-component4', {
     template: `<div>
       <slot :text=&quot;hello&quot; message=&quot;world&quot;></slot>
     </div>`,
     data () {
       return {
         hello: [1,'2']
       }
     }
   })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  Vue.component(<span class="hljs-string">'my-component4'</span>, {
     <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;
       &lt;slot :text="hello" message="world"&gt;&lt;/slot&gt;
     &lt;/div&gt;`</span>,
     data () {
       <span class="hljs-keyword">return</span> {
         <span class="hljs-attr">hello</span>: [<span class="hljs-number">1</span>,<span class="hljs-string">'2'</span>]
       }
     }
   })</code></pre>
</li>
<li>
<p>父组件在调用子组件时，需要在里面添加一个<code>template</code>元素，并且这个<code>template</code>元素具有<code>scope</code>特性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app7&quot;>
  <my-component4>
    <template scope=&quot;props&quot;>
    </template>
  </my-component4>
 </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;div id=<span class="hljs-string">"app7"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-component4</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">scope</span>=<span class="hljs-string">"props"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">my-component4</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p><code>scope</code>特性的值，就代表了所有子组件传过来的数据组成的对象。相当于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props = {
    text: '',
   message: ''
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">props = {
    <span class="hljs-attr">text</span>: <span class="hljs-string">''</span>,
   <span class="hljs-attr">message</span>: <span class="hljs-string">''</span>
}</code></pre>
</li>
<li>
<p>最后，父组件就可以在<code>template</code>中渲染子组件传过来的数据了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div id=&quot;app7&quot;>
   <my-component4>
     <template slot-scope=&quot;props&quot;>
       <span>"{{"props.text"}}"</span>
       <span>"{{"props.message"}}"</span>
     </template>
   </my-component4>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  &lt;div id=<span class="hljs-string">"app7"</span>&gt;
   <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-component4</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"props"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"props.text"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"props.message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">my-component4</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
</li>
<li>
<p>2018-07-19更新：<br>   最新的Vue支持将作用域插槽的属性解构。所以上述代码可以简写为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div id=&quot;app7&quot;>
   <my-component4>
     <template slot-scope=&quot;{text, message}&quot;>
       <span>"{{"text"}}"</span>
       <span>"{{"message"}}"</span>
     </template>
   </my-component4>
  </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  &lt;div id=<span class="hljs-string">"app7"</span>&gt;
   <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">my-component4</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">slot-scope</span>=<span class="hljs-string">"{text, message}"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"text"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">my-component4</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
</li>
</ol>
<p>作用域插槽也是插槽，只不过是多加了些特性，然后父组件多进行了些处理。</p>
<hr>
<p>本文首发于<a href="https://zhuqingguang.github.io/2017/08/06/VueComponent/" rel="nofollow noreferrer" target="_blank">朱庆广的博客</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深刻理解Vue中的组件

## 原文链接
[https://segmentfault.com/a/1190000010527064](https://segmentfault.com/a/1190000010527064)

