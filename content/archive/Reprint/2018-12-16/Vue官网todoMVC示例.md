---
title: 'Vue官网todoMVC示例' 
date: 2018-12-16 2:30:10
hidden: true
slug: t5g9fohw6p
categories: [reprint]
---

{{< raw >}}

                    
<p>这个示例是模仿官网示例样式和功能用我自己的方式写的，基本上没有看官网的源码，只参考自定义指令。让我们一步步来探讨一下。<a href="https://cn.vuejs.org/v2/examples/todomvc.html" rel="nofollow noreferrer" target="_blank">官网demo</a></p>
<h1 id="articleHeader0">要实现的功能</h1>
<ol>
<li>单条添加todo</li>
<li>单条删除todo</li>
<li>双击编辑todo</li>
<li>单条todo已完成相应样式状态改变</li>
<li>全部todo是已完成相应样式状态改变</li>
<li>清除全部已完成todos</li>
<li>待办todos数量显示</li>
<li>所有todos，已完成todos，未完成todos筛选</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013026726" src="https://static.alili.tech/img/remote/1460000013026726" alt="todoMVC.gif" title="todoMVC.gif" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">单条添加todo</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; class=&quot;todos_add&quot; placeholder=&quot;What needs to be done?&quot; 
@keyup.enter=&quot;addTodo($event.target)&quot; //绑定enter事件
ref=&quot;currentInput&quot;>//操作input元素使enter一下之后清空输入框内容" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"todos_add"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"What needs to be done?"</span> 
@<span class="hljs-attr">keyup.enter</span>=<span class="hljs-string">"addTodo($event.target)"</span> //绑定<span class="hljs-attr">enter</span>事件
<span class="hljs-attr">ref</span>=<span class="hljs-string">"currentInput"</span>&gt;</span>//操作input元素使enter一下之后清空输入框内容</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {//一些初始化数据
    return {
        todolists: [],
        dataStatus: [&quot;All&quot;, &quot;Active&quot;, &quot;Completed&quot;],
        dataStatusIndex: 0,
        whichShow: true,
        defaultShow: true
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">data() {<span class="hljs-comment">//一些初始化数据</span>
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">todolists</span>: [],
        <span class="hljs-attr">dataStatus</span>: [<span class="hljs-string">"All"</span>, <span class="hljs-string">"Active"</span>, <span class="hljs-string">"Completed"</span>],
        <span class="hljs-attr">dataStatusIndex</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">whichShow</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">defaultShow</span>: <span class="hljs-literal">true</span>
    }
},</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addTodo(e) { //添加todo
    var val = e.value
    if (val === &quot;&quot;) {return} //如果输入内容为空则立即返回
    this.todoLists = this.todoLists.concat({//使用concat这个api添加todo
        value: val, //输入内容
        isEditing: false, //是否在编辑状态
        isActive: false, //删除X图标是否激活
        isChecked: false //是否已完成
    })
    this.$refs.currentInput.value = &quot;&quot; //按下enter添加todo之后把输入框value清零
    window.localStorage.setItem(&quot;content&quot;,JSON.stringify(this.todoLists))//使用localStorage以JSON格式存储数据
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">addTodo(e) { <span class="hljs-comment">//添加todo</span>
    <span class="hljs-keyword">var</span> val = e.value
    <span class="hljs-keyword">if</span> (val === <span class="hljs-string">""</span>) {<span class="hljs-keyword">return</span>} <span class="hljs-comment">//如果输入内容为空则立即返回</span>
    <span class="hljs-keyword">this</span>.todoLists = <span class="hljs-keyword">this</span>.todoLists.concat({<span class="hljs-comment">//使用concat这个api添加todo</span>
        value: val, <span class="hljs-comment">//输入内容</span>
        isEditing: <span class="hljs-literal">false</span>, <span class="hljs-comment">//是否在编辑状态</span>
        isActive: <span class="hljs-literal">false</span>, <span class="hljs-comment">//删除X图标是否激活</span>
        isChecked: <span class="hljs-literal">false</span> <span class="hljs-comment">//是否已完成</span>
    })
    <span class="hljs-keyword">this</span>.$refs.currentInput.value = <span class="hljs-string">""</span> <span class="hljs-comment">//按下enter添加todo之后把输入框value清零</span>
    <span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">"content"</span>,<span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.todoLists))<span class="hljs-comment">//使用localStorage以JSON格式存储数据</span>
},</code></pre>
<p>把每条todo的对应状态都存在同一个对象当中，在操作改变todo状态的时候不会被统一处理，使得每条todo都有单独的状态。</p>
<h1 id="articleHeader2">单条删除todo</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <li  class=&quot;content_todoList&quot;
 v-for=&quot;(list,index) in todoLists&quot; 
 @mouseover=&quot;list.isActive = true&quot; //鼠标移入todo改变对应todo的isActive状态
 @mouseleave=&quot;list.isActive=false&quot; //鼠标移出todo改变对应todo的isActive状态
    <span class=&quot;el-icon-close content_todoList_delete&quot; 
    :class=&quot;{show: list.isActive}&quot; //动态绑定class使鼠标移动到某一todo显示X图标
    @click=&quot;deleteTodo(index)&quot;> //绑定删除单条todo事件
    </span>
</li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-tag">&lt;<span class="hljs-name">li</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">"content_todoList"</span>
 <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(list,index) in todoLists"</span> 
 @<span class="hljs-attr">mouseover</span>=<span class="hljs-string">"list.isActive = true"</span> //鼠标移入<span class="hljs-attr">todo</span>改变对应<span class="hljs-attr">todo</span>的<span class="hljs-attr">isActive</span>状态
 @<span class="hljs-attr">mouseleave</span>=<span class="hljs-string">"list.isActive=false"</span> //鼠标移出<span class="hljs-attr">todo</span>改变对应<span class="hljs-attr">todo</span>的<span class="hljs-attr">isActive</span>状态
    &lt;<span class="hljs-attr">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-close content_todoList_delete"</span> 
    <span class="hljs-attr">:class</span>=<span class="hljs-string">"{show: list.isActive}"</span> //动态绑定<span class="hljs-attr">class</span>使鼠标移动到某一<span class="hljs-attr">todo</span>显示<span class="hljs-attr">X</span>图标
    @<span class="hljs-attr">click</span>=<span class="hljs-string">"deleteTodo(index)"</span>&gt;</span> //绑定删除单条todo事件
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="deleteTodo(index) { //删除单条todo
        this.todoLists.splice(index, 1)//使用splice的api
        window.localStorage.setItem(&quot;content&quot;,JSON.stringify(todoLists)) //以JSON格式存储数据//localStorage存储数据
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">deleteTodo(index) { <span class="hljs-comment">//删除单条todo</span>
        <span class="hljs-keyword">this</span>.todoLists.splice(index, <span class="hljs-number">1</span>)<span class="hljs-comment">//使用splice的api</span>
        <span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">"content"</span>,<span class="hljs-built_in">JSON</span>.stringify(todoLists)) <span class="hljs-comment">//以JSON格式存储数据//localStorage存储数据</span>
},</code></pre>
<p>在每个<code>li</code>元素上绑定了鼠标移入和移除的事件来动态的改变每个todo的isActive，然后再使用isActive动态显示class。</p>
<h1 id="articleHeader3">双击编辑todo&amp;&amp;单条todo已完成</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;checkbox&quot; class=&quot;checkBox&quot; 
v-model=&quot;list.isChecked&quot;>//双向绑定isChecked

<div class=&quot;content_todoList_main&quot; 
@dblclick=&quot;toEdit(list)&quot; //双击事件
v-show=&quot;!list.isEditing&quot; //切换元素
:class=&quot;{deleted:list.isChecked}&quot;> //动态绑定class该表已完成todo样式
"{{"list.value"}}"
</div>

<input type=&quot;text&quot; class=&quot;content_todoList_main main_input&quot; 
v-model=&quot;list.value&quot; //双向绑定可输入value
v-show=&quot;list.isEditing&quot; //切换元素
v-todo-focus=&quot;list.value&quot; //自定义指令，双击之后自动focus对焦
@blur=&quot;unEdit(list)&quot;> //绑定blur失去焦点事件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checkBox"</span> 
<span class="hljs-attr">v-model</span>=<span class="hljs-string">"list.isChecked"</span>&gt;</span>//双向绑定isChecked

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content_todoList_main"</span> 
@<span class="hljs-attr">dblclick</span>=<span class="hljs-string">"toEdit(list)"</span> //双击事件
<span class="hljs-attr">v-show</span>=<span class="hljs-string">"!list.isEditing"</span> //切换元素
<span class="hljs-attr">:class</span>=<span class="hljs-string">"{deleted:list.isChecked}"</span>&gt;</span> //动态绑定class该表已完成todo样式
"{{"list.value"}}"
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content_todoList_main main_input"</span> 
<span class="hljs-attr">v-model</span>=<span class="hljs-string">"list.value"</span> //双向绑定可输入<span class="hljs-attr">value</span>
<span class="hljs-attr">v-show</span>=<span class="hljs-string">"list.isEditing"</span> //切换元素
<span class="hljs-attr">v-todo-focus</span>=<span class="hljs-string">"list.value"</span> //自定义指令，双击之后自动<span class="hljs-attr">focus</span>对焦
@<span class="hljs-attr">blur</span>=<span class="hljs-string">"unEdit(list)"</span>&gt;</span> //绑定blur失去焦点事件</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    toEdit(obj) { //使添加的todothing可编辑
        obj.isEditing = true
    },
    
    unEdit(obj) { //使添加的todothing不可编辑
        obj.isEditing = false
    },
}

directives: { //自定义focus指令,需要一个binding参数做判断
    &quot;todo-focus&quot;: function (el, binding) {
        if (binding.value) {
            el.focus()
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">methods: {
    toEdit(obj) { <span class="hljs-comment">//使添加的todothing可编辑</span>
        obj.isEditing = <span class="hljs-literal">true</span>
    },
    
    unEdit(obj) { <span class="hljs-comment">//使添加的todothing不可编辑</span>
        obj.isEditing = <span class="hljs-literal">false</span>
    },
}

directives: { <span class="hljs-comment">//自定义focus指令,需要一个binding参数做判断</span>
    <span class="hljs-string">"todo-focus"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, binding</span>) </span>{
        <span class="hljs-keyword">if</span> (binding.value) {
            el.focus()
        }
    }
}</code></pre>
<p>通过每个todo里的isEditing属性控制show和是否可编辑两个状态，双击div之后改变当前todo的isEditing为true，从而显示为input，input失去焦点之后再通过blur事件改为false。<br>通过todo的idChecked来控制是否已完成，从而动态改变样式。</p>
<h1 id="articleHeader4">全部todos已完成</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span 
class=&quot;icon-down el-icon-arrow-down&quot; //使用element库做向下箭头icon
v-show=&quot;todoLists.length>0&quot; //通过todoLists控制是否显示向下箭头icon
@click=&quot;selectAllTodos&quot;></span> //全部已完成事件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> 
<span class="hljs-attr">class</span>=<span class="hljs-string">"icon-down el-icon-arrow-down"</span> //使用<span class="hljs-attr">element</span>库做向下箭头<span class="hljs-attr">icon</span>
<span class="hljs-attr">v-show</span>=<span class="hljs-string">"todoLists.length&gt;0"</span> //通过<span class="hljs-attr">todoLists</span>控制是否显示向下箭头<span class="hljs-attr">icon</span>
@<span class="hljs-attr">click</span>=<span class="hljs-string">"selectAllTodos"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> //全部已完成事件</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selectAllTodos() { //设置所有todo为已完成,使用map的api通过todo的isChecked属性操作
    this.todoLists.map(todo => todo.isChecked = todo.isChecked ? false : true)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">selectAllTodos() { <span class="hljs-comment">//设置所有todo为已完成,使用map的api通过todo的isChecked属性操作</span>
    <span class="hljs-keyword">this</span>.todoLists.map(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> todo.isChecked = todo.isChecked ? <span class="hljs-literal">false</span> : <span class="hljs-literal">true</span>)
}</code></pre>
<h1 id="articleHeader5">待办todos数量显示</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;data_times&quot; v-show=&quot;times === 0&quot;> //times为0显示item，大于0显示items，细节注定成败
    <span>"{{"times"}}"</span>&amp;nbsp item left
</div>
<div class=&quot;data_times&quot; v-show=&quot;times > 0&quot;>
<span>"{{"times"}}"</span>&amp;nbsp items left</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"data_times"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"times === 0"</span>&gt;</span> //times为0显示item，大于0显示items，细节注定成败
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"times"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>&amp;nbsp item left
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"data_times"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"times &gt; 0"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"times"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>&amp;nbsp items left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
    times() { //使用计算属性计算待办todos的次数 
        let todoArr = this.todoLists
        let times = 0
        for (let i = 0; i < todoArr.length; i++) {
            if (todoArr[i].isChecked === false) {
                times++
            }
        }
        return times
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">computed: {
    times() { <span class="hljs-comment">//使用计算属性计算待办todos的次数 </span>
        <span class="hljs-keyword">let</span> todoArr = <span class="hljs-keyword">this</span>.todoLists
        <span class="hljs-keyword">let</span> times = <span class="hljs-number">0</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; todoArr.length; i++) {
            <span class="hljs-keyword">if</span> (todoArr[i].isChecked === <span class="hljs-literal">false</span>) {
                times++
            }
        }
        <span class="hljs-keyword">return</span> times
    }
},</code></pre>
<p>使用了计算属性对todoLists计算，用for循环刷选出idChecked为true的累加，最后返回times。</p>
<h1 id="articleHeader6">清除全部已完成todos</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;data_clearTodos&quot; 
@click=&quot;clearTodos&quot; 
v-show=&quot;times < todoLists.length&quot;> //如果待办事件次数小于总todoLists长度就显示“clear completed”
    <a href=&quot;#&quot;>clear completed</a>
</div>

<div class=&quot;data_clearTodos&quot; 
@click=&quot;clearTodos&quot; 
v-show=&quot;times === todoLists.length&quot;> //如果待办事件次数等于总todoLists长度就显示“clear completed”
    <a href=&quot;#&quot;></a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"data_clearTodos"</span> 
@<span class="hljs-attr">click</span>=<span class="hljs-string">"clearTodos"</span> 
<span class="hljs-attr">v-show</span>=<span class="hljs-string">"times &lt; todoLists.length"</span>&gt;</span> //如果待办事件次数小于总todoLists长度就显示“clear completed”
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>clear completed<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"data_clearTodos"</span> 
@<span class="hljs-attr">click</span>=<span class="hljs-string">"clearTodos"</span> 
<span class="hljs-attr">v-show</span>=<span class="hljs-string">"times === todoLists.length"</span>&gt;</span> //如果待办事件次数等于总todoLists长度就显示“clear completed”
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="clearTodos() { //清空已完成的todoLists，使用filter的api进行筛选
    this.todoLists = this.todoLists.filter(todo => todo.isChecked === false)
    window.localStorage.setItem(&quot;content&quot;,JSON.stringify(this.todoLists)) //以json格式存储数据
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">clearTodos() { <span class="hljs-comment">//清空已完成的todoLists，使用filter的api进行筛选</span>
    <span class="hljs-keyword">this</span>.todoLists = <span class="hljs-keyword">this</span>.todoLists.filter(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> todo.isChecked === <span class="hljs-literal">false</span>)
    <span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">"content"</span>,<span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.todoLists)) <span class="hljs-comment">//以json格式存储数据</span>
},</code></pre>
<p>如果待办todos的times小于todoLists长度，就证明有已完成的todo，就可以显示“clear completed”，如果相等就说明没有已完成的todo。</p>
<h1 id="articleHeader7">三种状态筛选</h1>
<p>所有todos，已完成todos，未完成todos筛选</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li class=&quot;content_todoList&quot; 
v-show=&quot;defaultShow || (whichShow?list.isChecked:!list.isChecked)&quot;>

<div class=&quot;data_status&quot;>
    <a href=&quot;#&quot; 
    :class=&quot;{active: index === dataStatusIndex}&quot; //动态class实现tab切换
    v-for=&quot;(item ,index) in dataStatus&quot; v-for循环
    @click=&quot;switchStatus(index)&quot; //切换不同tab显示内容
    :key=&quot;index&quot;>
        "{{"item"}}"
    </a>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content_todoList"</span> 
<span class="hljs-attr">v-show</span>=<span class="hljs-string">"defaultShow || (whichShow?list.isChecked:!list.isChecked)"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"data_status"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> 
    <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: index === dataStatusIndex}"</span> //动态<span class="hljs-attr">class</span>实现<span class="hljs-attr">tab</span>切换
    <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item ,index) in dataStatus"</span> <span class="hljs-attr">v-for</span>循环
    @<span class="hljs-attr">click</span>=<span class="hljs-string">"switchStatus(index)"</span> //切换不同<span class="hljs-attr">tab</span>显示内容
    <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>&gt;</span>
        "{{"item"}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="switchStatus(index) { //通过if条件判断操作
    this.dataStatusIndex = index
    if (this.dataStatus[index] === &quot;Active&quot;) {
        this.defaultShow = false
        this.whichShow = false
    } else if (this.dataStatus[index] === &quot;Completed&quot;) {
        this.defaultShow = false
        this.whichShow = true
    } else if (this.dataStatus[index] === &quot;All&quot;) {
        this.defaultShow = true
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">switchStatus(index) { <span class="hljs-comment">//通过if条件判断操作</span>
    <span class="hljs-keyword">this</span>.dataStatusIndex = index
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.dataStatus[index] === <span class="hljs-string">"Active"</span>) {
        <span class="hljs-keyword">this</span>.defaultShow = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.whichShow = <span class="hljs-literal">false</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.dataStatus[index] === <span class="hljs-string">"Completed"</span>) {
        <span class="hljs-keyword">this</span>.defaultShow = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.whichShow = <span class="hljs-literal">true</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.dataStatus[index] === <span class="hljs-string">"All"</span>) {
        <span class="hljs-keyword">this</span>.defaultShow = <span class="hljs-literal">true</span>
    }
},</code></pre>
<p>我这里是同时if条件句判断操作，有点麻烦，目前还没有想出来其他方案。在<code>li</code>元素使用三元运算符和或运算符进行操作显示不同状态的todos。</p>
<h1 id="articleHeader8">完整代码</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    input {
        outline: none;
    }

    ul,
    li,
    ol {
        list-style: none;
    }

    #app {
        width: 800px;
        height: 900px;
        margin: 0 auto;
        text-align: center;
        background-color: rgb(245, 245, 245);
        padding: 24px 0;
    }

    #app .header {
        font-size: 48px;
    }

    .content {
        width: 72%;
        margin: 0 auto;
        box-shadow: 0 3px 3px 2px rgba(0, 0, 0, 0.25);
        position: relative;
    }

    .icon-down {
        position: absolute;
        font-size: 24px;
        top: 16px;
        left: 16px;
        cursor: pointer;
    }

    #app .content .todos_add {
        width: 100%;
        height: 56px;
        padding: 16px 56px;
        font-size: 24px;
        border: 1px solid transparent;
    }

    .content_todoLists {
        position: relative;
        z-index: 3;
    }

    .content_todoList {
        display: flex;
        flex-direction: row;
        border-top: 1px solid #ccc;
        font-size: 24px;
        padding: 8px;
        background-color: white;
        align-items: center;
    }

    .checkBox {
        width: 20px;
        height: 20px;
        margin-left: 10px;
    }

    .content_todoList_main {
        flex: 1;
        text-align: left;
        margin-left: 16px;
        font-size: 20px;
        padding: 6px 0;
    }

    .main_input {
        position: relative;
        z-index: 1;
    }

    .content_todoList_delete {
        position: absolute;
        right: 16px;
        color: rgb(252, 55, 55);
        font-weight: 500;
        display: none;
        cursor: pointer;
    }

    .show {
        display: block;
    }

    .deleted {
        text-decoration-line: line-through;
        color: #bbb;
    }

    .show:hover {
        color: rgb(255, 0, 0);
        font-weight: 700;
    }

    ::-moz-placeholder {
        color: rgb(221, 218, 218);
    }

    ::-webkit-input-placeholder {
        color: rgb(221, 218, 218);
    }

    :-ms-input-placeholder {
        color: rgb(221, 218, 218);
    }

    .data {
        display: flex;
        justify-content: space-between;
        padding: 8px;
        font-size: 14px;
        font-weight: 300;
        color: rgb(145, 145, 145);
    }

    a {
        text-decoration: none;
        color: rgb(145, 145, 145);
    }

    .data_times {
        width: 73px;
    }

    .data_clearTodos {
        width: 142px;
    }

    .data_status a {
        display: inline-block;
        border: 1px solid transparent;
        border-radius: 2px;
        padding: 1px 4px;
        margin: 0 2px;
    }

    .data_status a:hover {
        border-color: #bbb;
    }

    .data_clearTodos a:hover {
        text-decoration-line: underline;
    }

    .active {
        box-shadow: 0 0 1px black;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">&lt;<span class="hljs-selector-tag">style</span>&gt;
    * {
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">box-sizing</span>: border-box;
    }

    <span class="hljs-selector-tag">input</span> {
        <span class="hljs-attribute">outline</span>: none;
    }

    <span class="hljs-selector-tag">ul</span>,
    <span class="hljs-selector-tag">li</span>,
    <span class="hljs-selector-tag">ol</span> {
        <span class="hljs-attribute">list-style</span>: none;
    }

    <span class="hljs-selector-id">#app</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">900px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgb</span>(245, 245, 245);
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">24px</span> <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-id">#app</span> <span class="hljs-selector-class">.header</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">48px</span>;
    }

    <span class="hljs-selector-class">.content</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">72%</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">3px</span> <span class="hljs-number">3px</span> <span class="hljs-number">2px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.25);
        <span class="hljs-attribute">position</span>: relative;
    }

    <span class="hljs-selector-class">.icon-down</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }

    <span class="hljs-selector-id">#app</span> <span class="hljs-selector-class">.content</span> <span class="hljs-selector-class">.todos_add</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">56px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">16px</span> <span class="hljs-number">56px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid transparent;
    }

    <span class="hljs-selector-class">.content_todoLists</span> {
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">3</span>;
    }

    <span class="hljs-selector-class">.content_todoList</span> {
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">flex-direction</span>: row;
        <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">8px</span>;
        <span class="hljs-attribute">background-color</span>: white;
        <span class="hljs-attribute">align-items</span>: center;
    }

    <span class="hljs-selector-class">.checkBox</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;
    }

    <span class="hljs-selector-class">.content_todoList_main</span> {
        <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
        <span class="hljs-attribute">text-align</span>: left;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">6px</span> <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.main_input</span> {
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
    }

    <span class="hljs-selector-class">.content_todoList_delete</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">right</span>: <span class="hljs-number">16px</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(252, 55, 55);
        <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">500</span>;
        <span class="hljs-attribute">display</span>: none;
        <span class="hljs-attribute">cursor</span>: pointer;
    }

    <span class="hljs-selector-class">.show</span> {
        <span class="hljs-attribute">display</span>: block;
    }

    <span class="hljs-selector-class">.deleted</span> {
        <span class="hljs-attribute">text-decoration-line</span>: line-through;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#bbb</span>;
    }

    <span class="hljs-selector-class">.show</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(255, 0, 0);
        <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">700</span>;
    }

    <span class="hljs-selector-pseudo">::-moz-placeholder</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(221, 218, 218);
    }

    <span class="hljs-selector-pseudo">::-webkit-input-placeholder</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(221, 218, 218);
    }

    <span class="hljs-selector-pseudo">:-ms-input-placeholder</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(221, 218, 218);
    }

    <span class="hljs-selector-class">.data</span> {
        <span class="hljs-attribute">display</span>: flex;
        <span class="hljs-attribute">justify-content</span>: space-between;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">8px</span>;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">300</span>;
        <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(145, 145, 145);
    }

    <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">color</span>: <span class="hljs-built_in">rgb</span>(145, 145, 145);
    }

    <span class="hljs-selector-class">.data_times</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">73px</span>;
    }

    <span class="hljs-selector-class">.data_clearTodos</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">142px</span>;
    }

    <span class="hljs-selector-class">.data_status</span> <span class="hljs-selector-tag">a</span> {
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid transparent;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">1px</span> <span class="hljs-number">4px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">2px</span>;
    }

    <span class="hljs-selector-class">.data_status</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#bbb</span>;
    }

    <span class="hljs-selector-class">.data_clearTodos</span> <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">text-decoration-line</span>: underline;
    }

    <span class="hljs-selector-class">.active</span> {
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1px</span> black;
    }
&lt;/<span class="hljs-selector-tag">style</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <div id=&quot;app&quot;>
        <header class=&quot;header&quot;>todos</header>
        <div class=&quot;content&quot;>
            <span class=&quot;icon-down el-icon-arrow-down&quot; 
            v-show=&quot;todoLists.length>0&quot; 
            @click=&quot;selectAllTodos&quot;>
            </span>
            <input type=&quot;text&quot; class=&quot;todos_add&quot; placeholder=&quot;What needs to be done?&quot; 
            @keyup.enter=&quot;addTodo($event.target)&quot; 
            ref=&quot;currentInput&quot;>
            <ul class=&quot;content_todoLists&quot;>
                <li v-for=&quot;(list,index) in todoLists&quot; class=&quot;content_todoList&quot; 
                @mouseover=&quot;list.isActive = true&quot; 
                @mouseleave=&quot;list.isActive=false&quot;
                v-show=&quot;defaultShow || (whichShow?list.isChecked:!list.isChecked)&quot;>
                    <input type=&quot;checkbox&quot; class=&quot;checkBox&quot; v-model=&quot;list.isChecked&quot;>
                    <div class=&quot;content_todoList_main&quot; @dblclick=&quot;toEdit(list)&quot; v-show=&quot;!list.isEditing&quot; :class=&quot;{deleted:list.isChecked}&quot;>
                        "{{"list.value"}}"
                    </div>
                    <input type=&quot;text&quot; class=&quot;content_todoList_main main_input&quot; 
                    v-model=&quot;list.value&quot; 
                    v-show=&quot;list.isEditing&quot; 
                    v-todo-focus=&quot;list.value&quot;
                    @blur=&quot;unEdit(list)&quot;>
                    <span class=&quot;el-icon-close content_todoList_delete&quot; :class=&quot;{show: list.isActive}&quot; @click=&quot;deleteTodo(index)&quot;></span>
                </li>
            </ul>
            <div class=&quot;data&quot; v-show=&quot;todoLists.length>0&quot;>
                <div class=&quot;data_times&quot; v-show=&quot;times === 0&quot;>
                    <span>"{{"times"}}"</span>&amp;nbspitem left
                </div>
                <div class=&quot;data_times&quot; v-show=&quot;times > 0&quot;>
                    <span>"{{"times"}}"</span>&amp;nbspitems left
                </div>
                <div class=&quot;data_status&quot;>
                    <a href=&quot;#&quot; :class=&quot;{active:index === dataStatusIndex}&quot; v-for=&quot;(item,index) in dataStatus&quot; @click=&quot;switchStatus(index)&quot; :key=&quot;index&quot;>
                        "{{"item"}}"
                    </a>
                </div>
                <div class=&quot;data_clearTodos&quot; @click=&quot;clearTodos&quot; v-show=&quot;times < todoLists.length&quot;>
                    <a href=&quot;#&quot;>clear completed</a>
                </div>
                <div class=&quot;data_clearTodos&quot; @click=&quot;clearTodos&quot; v-show=&quot;times === todoLists.length&quot;>
                    <a href=&quot;#&quot;></a>
                </div>
            </div>
        </div>
    </div>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>todos<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"icon-down el-icon-arrow-down"</span> 
            <span class="hljs-attr">v-show</span>=<span class="hljs-string">"todoLists.length&gt;0"</span> 
            @<span class="hljs-attr">click</span>=<span class="hljs-string">"selectAllTodos"</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"todos_add"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"What needs to be done?"</span> 
            @<span class="hljs-attr">keyup.enter</span>=<span class="hljs-string">"addTodo($event.target)"</span> 
            <span class="hljs-attr">ref</span>=<span class="hljs-string">"currentInput"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content_todoLists"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(list,index) in todoLists"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content_todoList"</span> 
                @<span class="hljs-attr">mouseover</span>=<span class="hljs-string">"list.isActive = true"</span> 
                @<span class="hljs-attr">mouseleave</span>=<span class="hljs-string">"list.isActive=false"</span>
                <span class="hljs-attr">v-show</span>=<span class="hljs-string">"defaultShow || (whichShow?list.isChecked:!list.isChecked)"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"checkBox"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"list.isChecked"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content_todoList_main"</span> @<span class="hljs-attr">dblclick</span>=<span class="hljs-string">"toEdit(list)"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"!list.isEditing"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{deleted:list.isChecked}"</span>&gt;</span>
                        "{{"list.value"}}"
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content_todoList_main main_input"</span> 
                    <span class="hljs-attr">v-model</span>=<span class="hljs-string">"list.value"</span> 
                    <span class="hljs-attr">v-show</span>=<span class="hljs-string">"list.isEditing"</span> 
                    <span class="hljs-attr">v-todo-focus</span>=<span class="hljs-string">"list.value"</span>
                    @<span class="hljs-attr">blur</span>=<span class="hljs-string">"unEdit(list)"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-close content_todoList_delete"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{show: list.isActive}"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"deleteTodo(index)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"data"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"todoLists.length&gt;0"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"data_times"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"times === 0"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"times"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>&amp;nbspitem left
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"data_times"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"times &gt; 0"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>"{{"times"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>&amp;nbspitems left
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"data_status"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active:index === dataStatusIndex}"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in dataStatus"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"switchStatus(index)"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>&gt;</span>
                        "{{"item"}}"
                    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"data_clearTodos"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"clearTodos"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"times &lt; todoLists.length"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>clear completed<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"data_clearTodos"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"clearTodos"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"times === todoLists.length"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    let vm = new Vue({
        el: &quot;#app&quot;,
        data() {
            return {
                todoLists: [],
                dataStatus: [&quot;All&quot;, &quot;Active&quot;, &quot;Completed&quot;],
                dataStatusIndex: 0,
                whichShow: true,
                defaultShow: true
            }
        },
        computed: {
            times() { //使用计算属性计算待办todos的次数 
                let todoArr = this.todoLists
                let times = 0
                for (let i = 0; i < todoArr.length; i++) {
                    if (todoArr[i].isChecked === false) {
                        times++
                    }
                }
                return times
            }
        },
        methods: {
            toEdit(obj) { //使添加的todo可编辑
                obj.isEditing = true
            },
            unEdit(obj) { //使添加的todo不可编辑
                obj.isEditing = false
            },
            addTodo(e) { //添加todo
                var val = e.value
                if (val === &quot;&quot;) {
                    return
                } //如果输入内容为空则立即返回
                this.todoLists = this.todoLists.concat({ //使用concat这个api添加todo
                    value: val, //输入内容
                    isEditing: false, //是否在编辑状态
                    isActive: false, //删除X图标是否激活
                    isChecked: false //是否已完成
                })
                this.$refs.currentInput.value = &quot;&quot; //按下enter添加todo之后把输入框value清零
                window.localStorage.setItem(&quot;content&quot;, JSON.stringify(this.todoLists)) //使用localStorage以JSON格式存储数据
            },
            deleteTodo(index) { //删除todo
                this.todoLists.splice(index, 1)
                window.localStorage.setItem(&quot;content&quot;, JSON.stringify(this.todoLists)) //以json格式存储数据
            },
            switchStatus(index) { //试下下方三个状态切换，略麻烦
                this.dataStatusIndex = index
                if (this.dataStatus[index] === &quot;Active&quot;) {
                    this.defaultShow = false
                    this.whichShow = false
                } else if (this.dataStatus[index] === &quot;Completed&quot;) {
                    this.defaultShow = false
                    this.whichShow = true
                } else if (this.dataStatus[index] === &quot;All&quot;) {
                    this.defaultShow = true
                }
            },
            clearTodos() { //清空已完成的todoLists
                this.todoLists = this.todoLists.filter(todo => todo.isChecked === false)
                window.localStorage.setItem(&quot;content&quot;, JSON.stringify(this.todoLists)) //以json格式存储数据
            },
            selectAllTodos() { //设置所有todo为已完成
                this.todoLists.map(todo => todo.isChecked = todo.isChecked ? false : true)
            }
        },
        directives: { //自定义focus指令
            &quot;todo-focus&quot;: function (el, binding) {
                if (binding.value) {
                    el.focus()
                }
            }
        },
        created() {
            let myStorage = window.localStorage.getItem('content')
            this.todoLists = JSON.parse(myStorage) || [] //因为todoLists初始值是null,使用或运算符，如果为null设为空数组
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script&gt;
    <span class="hljs-keyword">let</span> vm = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">"#app"</span>,
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">todoLists</span>: [],
                <span class="hljs-attr">dataStatus</span>: [<span class="hljs-string">"All"</span>, <span class="hljs-string">"Active"</span>, <span class="hljs-string">"Completed"</span>],
                <span class="hljs-attr">dataStatusIndex</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">whichShow</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">defaultShow</span>: <span class="hljs-literal">true</span>
            }
        },
        <span class="hljs-attr">computed</span>: {
            times() { <span class="hljs-comment">//使用计算属性计算待办todos的次数 </span>
                <span class="hljs-keyword">let</span> todoArr = <span class="hljs-keyword">this</span>.todoLists
                <span class="hljs-keyword">let</span> times = <span class="hljs-number">0</span>
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; todoArr.length; i++) {
                    <span class="hljs-keyword">if</span> (todoArr[i].isChecked === <span class="hljs-literal">false</span>) {
                        times++
                    }
                }
                <span class="hljs-keyword">return</span> times
            }
        },
        <span class="hljs-attr">methods</span>: {
            toEdit(obj) { <span class="hljs-comment">//使添加的todo可编辑</span>
                obj.isEditing = <span class="hljs-literal">true</span>
            },
            unEdit(obj) { <span class="hljs-comment">//使添加的todo不可编辑</span>
                obj.isEditing = <span class="hljs-literal">false</span>
            },
            addTodo(e) { <span class="hljs-comment">//添加todo</span>
                <span class="hljs-keyword">var</span> val = e.value
                <span class="hljs-keyword">if</span> (val === <span class="hljs-string">""</span>) {
                    <span class="hljs-keyword">return</span>
                } <span class="hljs-comment">//如果输入内容为空则立即返回</span>
                <span class="hljs-keyword">this</span>.todoLists = <span class="hljs-keyword">this</span>.todoLists.concat({ <span class="hljs-comment">//使用concat这个api添加todo</span>
                    value: val, <span class="hljs-comment">//输入内容</span>
                    isEditing: <span class="hljs-literal">false</span>, <span class="hljs-comment">//是否在编辑状态</span>
                    isActive: <span class="hljs-literal">false</span>, <span class="hljs-comment">//删除X图标是否激活</span>
                    isChecked: <span class="hljs-literal">false</span> <span class="hljs-comment">//是否已完成</span>
                })
                <span class="hljs-keyword">this</span>.$refs.currentInput.value = <span class="hljs-string">""</span> <span class="hljs-comment">//按下enter添加todo之后把输入框value清零</span>
                <span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">"content"</span>, <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.todoLists)) <span class="hljs-comment">//使用localStorage以JSON格式存储数据</span>
            },
            deleteTodo(index) { <span class="hljs-comment">//删除todo</span>
                <span class="hljs-keyword">this</span>.todoLists.splice(index, <span class="hljs-number">1</span>)
                <span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">"content"</span>, <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.todoLists)) <span class="hljs-comment">//以json格式存储数据</span>
            },
            switchStatus(index) { <span class="hljs-comment">//试下下方三个状态切换，略麻烦</span>
                <span class="hljs-keyword">this</span>.dataStatusIndex = index
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.dataStatus[index] === <span class="hljs-string">"Active"</span>) {
                    <span class="hljs-keyword">this</span>.defaultShow = <span class="hljs-literal">false</span>
                    <span class="hljs-keyword">this</span>.whichShow = <span class="hljs-literal">false</span>
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.dataStatus[index] === <span class="hljs-string">"Completed"</span>) {
                    <span class="hljs-keyword">this</span>.defaultShow = <span class="hljs-literal">false</span>
                    <span class="hljs-keyword">this</span>.whichShow = <span class="hljs-literal">true</span>
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.dataStatus[index] === <span class="hljs-string">"All"</span>) {
                    <span class="hljs-keyword">this</span>.defaultShow = <span class="hljs-literal">true</span>
                }
            },
            clearTodos() { <span class="hljs-comment">//清空已完成的todoLists</span>
                <span class="hljs-keyword">this</span>.todoLists = <span class="hljs-keyword">this</span>.todoLists.filter(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> todo.isChecked === <span class="hljs-literal">false</span>)
                <span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">"content"</span>, <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.todoLists)) <span class="hljs-comment">//以json格式存储数据</span>
            },
            selectAllTodos() { <span class="hljs-comment">//设置所有todo为已完成</span>
                <span class="hljs-keyword">this</span>.todoLists.map(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> todo.isChecked = todo.isChecked ? <span class="hljs-literal">false</span> : <span class="hljs-literal">true</span>)
            }
        },
        <span class="hljs-attr">directives</span>: { <span class="hljs-comment">//自定义focus指令</span>
            <span class="hljs-string">"todo-focus"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">el, binding</span>) </span>{
                <span class="hljs-keyword">if</span> (binding.value) {
                    el.focus()
                }
            }
        },
        created() {
            <span class="hljs-keyword">let</span> myStorage = <span class="hljs-built_in">window</span>.localStorage.getItem(<span class="hljs-string">'content'</span>)
            <span class="hljs-keyword">this</span>.todoLists = <span class="hljs-built_in">JSON</span>.parse(myStorage) || [] <span class="hljs-comment">//因为todoLists初始值是null,使用或运算符，如果为null设为空数组</span>
        }
    })
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue官网todoMVC示例

## 原文链接
[https://segmentfault.com/a/1190000013026721](https://segmentfault.com/a/1190000013026721)

