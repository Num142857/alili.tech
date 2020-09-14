---
title: 'Vue2.x踩坑与总结' 
date: 2019-01-27 2:30:59
hidden: true
slug: v5qb9pyd2zs
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>年前就打算学习并总结一下vue2.x，但是因为年前工作比较多，所以进展十分缓慢，现在终于学了一大部分，而且自己在学习开发中也踩了不少坑也总结了不少，所以将自己踩过的坑总结一下分享出来。因为在项目中使用了webpack2.x，所以对于webpack2.x也有一个踩坑总结，<a href="https://segmentfault.com/a/1190000008279459">点击链接</a>。</p></blockquote>
<p>原文链接：<a href="http://mrzhang123.github.io/2017/02/07/vue2/" rel="nofollow noreferrer" target="_blank">http://mrzhang123.github.io/2...</a><br>项目地址：<a href="https://github.com/MrZhang123/Vue_project/tree/master/vue2.x" rel="nofollow noreferrer" target="_blank">https://github.com/MrZhang123...</a></p>
<h1 id="articleHeader0">vue2.x</h1>
<h2 id="articleHeader1">1.独立构建vs运行时构建</h2>
<p>在按照vue1.0的配置配置好webpack后，会出现<code>Failed to mount component: template or render function not defined. (found in root instance) </code>的错误，这里涉及到vue2.0与vue1.0的第一个不同的地方。具体区别<a href="https://vuefe.cn/v2/guide/installation.html#" rel="nofollow noreferrer" target="_blank">独立构建 vs 运行时构建</a>。解决方法为在webpack配置文件中添加如下配置项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
  alias: {
    'vue$': 'vue/dist/vue.common.js'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">resolve: {
  <span class="hljs-attr">alias</span>: {
    <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.common.js'</span>
  }
}</code></pre>
<h2 id="articleHeader2">2.挂载点的选择</h2>
<p>在原来的vue1.0的项目中我使用<code>body</code>元素作为挂载点，但是在vue2.0中，如果使用<code>body</code>或者<code>html</code>作为挂载点，则会报以下警告：<code>Do not mount Vue to &lt;html&gt; or &lt;body&gt; - mount to normal elements instead.</code></p>
<p>&lt;font color='red'&gt;在vue1.0中允许开发者以<code>body</code>或者<code>html</code>作为根实体的挂载点，但是到了2.0后，只能通过<strong>独立的节点挂载</strong>，例如：div等，否则报警告&lt;/font&gt;</p>
<h2 id="articleHeader3">3.动态组件渲染（跟1.x类似）</h2>
<p>多个组件可以使用同一个挂载点，然后动态地在它们之间切换。<strong>使用保留的 &lt;component&gt; 元素</strong>，动态地绑定到它的 is 特性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 动态组件由 vm 实例的属性值 `componentId` 控制 -->
<component :is=&quot;componentId&quot;></component>
<!-- 也能够渲染注册过的组件或 prop 传入的组件 -->
<component :is=&quot;$options.components.child&quot;></component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 动态组件由 vm 实例的属性值 `componentId` 控制 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"componentId"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 也能够渲染注册过的组件或 prop 传入的组件 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"$options.components.child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span></code></pre>
<h3 id="articleHeader4"><code>keep-alive</code></h3>
<p>如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染。为此可以添加一个 <code>keep-alive</code> 指令参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive>
  <component :is=&quot;currentView&quot;>
    <!-- 非活动组件将被缓存！ -->
  </component>
</keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"currentView"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 非活动组件将被缓存！ --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span></code></pre>
<h2 id="articleHeader5">4.ref</h2>
<p>有时候需要直接在父组件中访问子组件实例，或者直接操作DOM元素，此时需要使用<code>ref</code>。</p>
<p><code>ref</code>被用来给元素或子元素注册引用信息。引用信息会根据父组件的<code>$refs</code>对象进行注册。如果在普通的DOM元素上使用，引用信息就是元素，如果用在子组件上，引用信息就是组件实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- vm.$refs.p will be the DOM node -->
<p ref=&quot;p&quot;>hello</p>
<!-- vm.$refs.child will be the child comp instance -->
<child-comp ref=&quot;child&quot;></child-comp>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- vm.$refs.p will be the DOM node --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"p"</span>&gt;</span>hello<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-comment">&lt;!-- vm.$refs.child will be the child comp instance --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child-comp</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"child"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-comp</span>&gt;</span></code></pre>
<p>当 <code>v-for</code> 用于元素或组件的时候，引用信息将是包含DOM节点或组件实例数组。</p>
<p>关于ref注册时间的重要说明: 因为ref本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！<strong><code>$refs</code> 也不是响应式的</strong>，因此你不应该试图用它在模版中做数据绑定。</p>
<h2 id="articleHeader6">5.自定义事件</h2>
<p>在vue自定义事件使用<code>$on</code>与<code>$emit</code>，前者用于触发监听，后者用于触发，监听可以有两种方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--使用v-on在html中监听-->
<my-component v-on:test=&quot;callbackFun&quot;></my-component>
<script>
  //直接用$on监听
  vm.$on('text',function(){})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--使用v-on在html中监听--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">v-on:test</span>=<span class="hljs-string">"callbackFun"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-comment">//直接用$on监听</span>
  vm.$on(<span class="hljs-string">'text'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader7">6.组件命名的约定</h2>
<p>当注册组件（或者 props）时，可以使用 kebab-case ，camelCase ，或 TitleCase</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在组件定义中
components: {
  // 使用 kebab-case 形式注册
  'kebab-cased-component': { /* ... */ },
  // register using camelCase
  'camelCasedComponent': { /* ... */ },
  // register using TitleCase
  'TitleCasedComponent': { /* ... */ }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在组件定义中</span>
components: {
  <span class="hljs-comment">// 使用 kebab-case 形式注册</span>
  <span class="hljs-string">'kebab-cased-component'</span>: { <span class="hljs-comment">/* ... */</span> },
  <span class="hljs-comment">// register using camelCase</span>
  <span class="hljs-string">'camelCasedComponent'</span>: { <span class="hljs-comment">/* ... */</span> },
  <span class="hljs-comment">// register using TitleCase</span>
  <span class="hljs-string">'TitleCasedComponent'</span>: { <span class="hljs-comment">/* ... */</span> }
}</code></pre>
<p>在 HTML 模版中，只能使用 kebab-case 形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 在HTML模版中始终使用 kebab-case -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<title-cased-component></title-cased-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 在HTML模版中始终使用 kebab-case --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">kebab-cased-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">kebab-cased-component</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">camel-cased-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">camel-cased-component</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title-cased-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title-cased-component</span>&gt;</span></code></pre>
<p>当使用<strong>字符串模式</strong>时可以使用 camelCase 、 TitleCase 或者 kebab-case 来引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 在字符串模版中可以用任何你喜欢的方式! -->
<my-component></my-component>
<myComponent></myComponent>
<MyComponent></MyComponent>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 在字符串模版中可以用任何你喜欢的方式! --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">my-component</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">myComponent</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">myComponent</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">MyComponent</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">MyComponent</span>&gt;</span></code></pre>
<h2 id="articleHeader8">7.子组件中使用<code>this</code>
</h2>
<p>有时候子组件简单，可以在父组件中直接注册，此时在子组件内使用<code>this</code>就是子组件实例并不是父组件，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default{
    data(){
        return{
            parentMsg:'hello!'
        }
    },
    components:{
        child:{
            props:['inputMessage'],
            template:'<span>"{{"inputMessage"}}"</span>'
        },
        'child-secound':{
            props:['inputMessage'],
            template:'<span>"{{"upperCase"}}"</span>',
            computed:{
                upperCase(){
                    return this.inputMessage.toUpperCase();
                }
            }    
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    data(){
        <span class="hljs-keyword">return</span>{
            <span class="hljs-attr">parentMsg</span>:<span class="hljs-string">'hello!'</span>
        }
    },
    <span class="hljs-attr">components</span>:{
        <span class="hljs-attr">child</span>:{
            <span class="hljs-attr">props</span>:[<span class="hljs-string">'inputMessage'</span>],
            <span class="hljs-attr">template</span>:<span class="hljs-string">'&lt;span&gt;"{{"inputMessage"}}"&lt;/span&gt;'</span>
        },
        <span class="hljs-string">'child-secound'</span>:{
            <span class="hljs-attr">props</span>:[<span class="hljs-string">'inputMessage'</span>],
            <span class="hljs-attr">template</span>:<span class="hljs-string">'&lt;span&gt;"{{"upperCase"}}"&lt;/span&gt;'</span>,
            <span class="hljs-attr">computed</span>:{
                upperCase(){
                    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.inputMessage.toUpperCase();
                }
            }    
        }
    }
}</code></pre>
<h2 id="articleHeader9">8.<code>key</code>的使用</h2>
<p>一般情况下，vue在渲染完成后，如果数据发生变化，只会重新渲染数据，不会重新渲染整个元素，但是有时候我们需要元素被重新渲染，此时就需要使用<code>key</code>关键字，使用<code>v-bind</code>绑定<code>key</code>关键字，可以实现在数据发生变化时候重新渲染整个元素。<strong>注：</strong>同一父级元素下所有子元素如果都要在数据变化后重新渲染元素，则需要被绑定的<code>key</code></p>
<h2 id="articleHeader10">9.<code>v-move</code>的使用</h2>
<p>在使用<code>&lt;transition-group&gt;</code>时候，不仅可以定义进入离开动画，还可以使用新增的<code>v-move</code>特性，与过渡一样，默认为<code>v-move</code>，可以用<code>name</code>进行自定义前缀，也可以用<code>move-class</code>属性手动设定。用了这个之后就可以实现移动过程中的动画。</p>
<h2 id="articleHeader11">10.跳过css检测</h2>
<p>对于只使用js过度的元素使用<code>v-bind:css="false"</code>跳过vue对css的检测。</p>
<h2 id="articleHeader12">render函数的使用</h2>
<p>createElement接受三个参数：</p>
<ul>
<li><p>{String | Object | Function}即一个HTML标签 | 组件选项 | 一个函数，必须返回上述其中一个</p></li>
<li><p>{Object}一个对应HTML标签属性的数据对象（可选）</p></li>
<li><p>{String | Array}子节点（VNode）（可选）</p></li>
</ul>
<p>⚠️ 关于第三个参数的说明</p>
<ul>
<li><p>createElement第三个参数，如果是String，则类似于innerHTML，如果是Array，则可以写入一个执行函数，这个函数用于创建另一个DOM结构（而且这里如果想写入一个执行函数，必须是数组！！）</p></li>
<li><p>每个createElement只能创建一个元素，所以如果是创建多个元素相互嵌套，需要多个createElement函数相互嵌套，最后再render，这个跟原生js创建DOM元素类似</p></li>
<li><p>如果需要同时渲染多个元素，则需要在第三个参数的数组中，分别写入需要渲染的元素，此时Vue会按照数组中<strong>顺序</strong>进行渲染</p></li>
</ul>
<p>完整数据对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // 和`v-bind:class`一样的 API
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 正常的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器基于 &quot;on&quot;
  // 所以不再支持如 v-on:keyup.enter 修饰器
  // 需要手动匹配 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅对于组件，用于监听原生事件，而不是组件使用 vm.$emit 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令. 注意事项：不能对绑定的旧值设值
  // Vue 会为您持续追踨
  directives: [
    {
      name: 'my-custom-directive',
      value: '2'
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // Scoped slots in the form of
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => h('span', props.text)
  },
  // 如果子组件有定义 slot 的名称
  slot: 'name-of-slot'
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-comment">// 和`v-bind:class`一样的 API</span>
  <span class="hljs-string">'class'</span>: {
    <span class="hljs-attr">foo</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">bar</span>: <span class="hljs-literal">false</span>
  },
  <span class="hljs-comment">// 和`v-bind:style`一样的 API</span>
  style: {
    <span class="hljs-attr">color</span>: <span class="hljs-string">'red'</span>,
    <span class="hljs-attr">fontSize</span>: <span class="hljs-string">'14px'</span>
  },
  <span class="hljs-comment">// 正常的 HTML 特性</span>
  attrs: {
    <span class="hljs-attr">id</span>: <span class="hljs-string">'foo'</span>
  },
  <span class="hljs-comment">// 组件 props</span>
  props: {
    <span class="hljs-attr">myProp</span>: <span class="hljs-string">'bar'</span>
  },
  <span class="hljs-comment">// DOM 属性</span>
  domProps: {
    <span class="hljs-attr">innerHTML</span>: <span class="hljs-string">'baz'</span>
  },
  <span class="hljs-comment">// 事件监听器基于 "on"</span>
  <span class="hljs-comment">// 所以不再支持如 v-on:keyup.enter 修饰器</span>
  <span class="hljs-comment">// 需要手动匹配 keyCode。</span>
  on: {
    <span class="hljs-attr">click</span>: <span class="hljs-keyword">this</span>.clickHandler
  },
  <span class="hljs-comment">// 仅对于组件，用于监听原生事件，而不是组件使用 vm.$emit 触发的事件。</span>
  nativeOn: {
    <span class="hljs-attr">click</span>: <span class="hljs-keyword">this</span>.nativeClickHandler
  },
  <span class="hljs-comment">// 自定义指令. 注意事项：不能对绑定的旧值设值</span>
  <span class="hljs-comment">// Vue 会为您持续追踨</span>
  directives: [
    {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'my-custom-directive'</span>,
      <span class="hljs-attr">value</span>: <span class="hljs-string">'2'</span>
      expression: <span class="hljs-string">'1 + 1'</span>,
      <span class="hljs-attr">arg</span>: <span class="hljs-string">'foo'</span>,
      <span class="hljs-attr">modifiers</span>: {
        <span class="hljs-attr">bar</span>: <span class="hljs-literal">true</span>
      }
    }
  ],
  <span class="hljs-comment">// Scoped slots in the form of</span>
  <span class="hljs-comment">// { name: props =&gt; VNode | Array&lt;VNode&gt; }</span>
  scopedSlots: {
    <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> h(<span class="hljs-string">'span'</span>, props.text)
  },
  <span class="hljs-comment">// 如果子组件有定义 slot 的名称</span>
  slot: <span class="hljs-string">'name-of-slot'</span>
  <span class="hljs-comment">// 其他特殊顶层属性</span>
  key: <span class="hljs-string">'myKey'</span>,
  <span class="hljs-attr">ref</span>: <span class="hljs-string">'myRef'</span>
}</code></pre>
<h1 id="articleHeader13">vue-router2.x</h1>
<h2 id="articleHeader14">1.router-view</h2>
<p>在vue-router2中<code>&lt;router-view&gt;</code>是最顶层的出口，渲染最高级路由匹配到组件。同样地，一个被渲染组件同样可以包含自己的嵌套<code>&lt;router-view&gt;</code>。</p>
<h2 id="articleHeader15">2.挂载</h2>
<p>在router1.0中，挂载节点的方式为<code>router.start()</code>而在router2.0中使用vue自己的<code>$mount</code>手动挂载</p>
<h2 id="articleHeader16">3.给link添加事件</h2>
<p>在vue-router1中使用<code>v-link</code>写入路由，但是在vue-router2中要使用<code>router-link</code>写入路由，在浏览器渲染的时候会把<code>router-link</code>渲染成<code>a</code>。</p>
<p>有时候需要为<code>router-link</code>注册事件，对于一般的html元素，直接使用<code>@click="eventFun"</code>即可，但是对于<code>router-link</code>，像普通html元素那样注册事件后并不管用，<strong>需要添加<code>.native</code>才会成功注册</strong>。</p>
<p>事实上给<strong>组件绑定原生事件</strong>就需要<code>.native</code>修饰<code>v-on</code>，否则无法注册成功。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<my-component v-on:click.native=&quot;doTheThing&quot;></my-component>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">v-on:click.native</span>=<span class="hljs-string">"doTheThing"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span></code></pre>
<h2 id="articleHeader17">4.利用vue-router做导航</h2>
<p>在利用vue-router做导航的时候，需要用到<code>redirect</code>关键字的重定向功能，具体写法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
    routes : [
        {path:'/',redirect:'/ZY'},
        {path:'/ZY',component:ZY}
    ]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
    <span class="hljs-attr">routes</span> : [
        {<span class="hljs-attr">path</span>:<span class="hljs-string">'/'</span>,<span class="hljs-attr">redirect</span>:<span class="hljs-string">'/ZY'</span>},
        {<span class="hljs-attr">path</span>:<span class="hljs-string">'/ZY'</span>,<span class="hljs-attr">component</span>:ZY}
    ]
});</code></pre>
<h2 id="articleHeader18">5.路由嵌套</h2>
<p>vue-router的路由嵌套指的是<strong>子组件会在父组件中渲染出来</strong>，必须是子组件的父组件，祖先不可以实现，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code class="shell">/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
|<span class="hljs-string"> User             </span>|<span class="hljs-string">                  </span>|<span class="hljs-string"> User            </span>|
|<span class="hljs-string"> +--------------+ </span>|<span class="hljs-string">                  </span>|<span class="hljs-string"> +-------------+ </span>|
|<span class="hljs-string"> </span>|<span class="hljs-string"> Profile      </span>|<span class="hljs-string"> </span>|<span class="hljs-string">  +------------&gt;  </span>|<span class="hljs-string"> </span>|<span class="hljs-string"> Posts       </span>|<span class="hljs-string"> </span>|
|<span class="hljs-string"> </span>|<span class="hljs-string">              </span>|<span class="hljs-string"> </span>|<span class="hljs-string">                  </span>|<span class="hljs-string"> </span>|<span class="hljs-string">             </span>|<span class="hljs-string"> </span>|
|<span class="hljs-string"> +--------------+ </span>|<span class="hljs-string">                  </span>|<span class="hljs-string"> +-------------+ </span>|
+------------------+                  +-----------------+</code></pre>
<h1 id="articleHeader19">参考：</h1>
<p><a href="https://cn.vuejs.org/v2/guide/" rel="nofollow noreferrer" target="_blank">Vue.js官方文档</a><br><a href="http://router.vuejs.org/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">vue-router 2官方文档</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.x踩坑与总结

## 原文链接
[https://segmentfault.com/a/1190000008279436](https://segmentfault.com/a/1190000008279436)

