---
title: 'Vue学习笔记（一）' 
date: 2018-12-28 2:30:11
hidden: true
slug: 050a6jpasfkg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一、Vue.js介绍</h1>
<p><strong>Vue.js</strong>也称为Vue，读音类似view，错误读音v-u-e，由华人尤雨溪开源并维护。</p>
<p>Vue有以下特点：</p>
<ul>
<li>是一个构建用户界面的框架</li>
<li>是一个轻量级MVVM（Model-View-ViewModel）框架，和angular、react类似</li>
<li>数据驱动+组件化的前端开发（核心思想）</li>
<li>通过简单的API实现<strong>响应式的数据绑定</strong>和<strong>组合的视图组件</strong>
</li>
<li>更容易上手、小巧</li>
</ul>
<p>参考：<a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">官网文档</a></p>
<h1 id="articleHeader1">二、第一个vue程序</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;main&quot;>
    "{{"msg"}}"  //字符串模板
</div>

<script src=&quot;./js/vue.js&quot;></script>   //引入vue文件
<script>
    new Vue({   //创建vue实例
        el: '#main',  //绑定元素
        data: {
            msg: 'hello Vue.js'
        },
        methods:{  //用于存放方法
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main"</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml">  //字符串模板
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>   //引入vue文件
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({   <span class="hljs-comment">//创建vue实例</span>
        el: <span class="hljs-string">'#main'</span>,  <span class="hljs-comment">//绑定元素</span>
        data: {
            msg: <span class="hljs-string">'hello Vue.js'</span>
        },
        methods:{  <span class="hljs-comment">//用于存放方法</span>
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>以上就是一个非常简单的vue程序。绑定元素这里不但可以使用id选择器，我们还可以使用类选择器或者标签选择器。但是，vue2.0中不允许将vue实例挂在到html或者body元素上。</p>
<h1 id="articleHeader2">三、常用指令</h1>
<p>指令用来扩展HTML功能。vue内置了很多指令。</p>
<h2 id="articleHeader3">1、v-model</h2>
<p>实现双向数据绑定，实时监控数据变化，一般用于表单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;main&quot;>
    <input type=&quot;text&quot; v-model=&quot;content&quot;>
    
    <br> "{{"content"}}"
</div>

<script src=&quot;./js/vue.js&quot;></script>
<script>
    new Vue({
        el: '#main',
        data: {
            content: ''
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"content"</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span> </span><span class="hljs-template-variable">"{{"content"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#main'</span>,
        data: {
            content: <span class="hljs-string">''</span>
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>在这里，使用<code>v-model</code>指令将输入框的值与vue实例中的content进行绑定。此后，二者中的任一值发生变化，另一个值都会跟随变化。</p>
<h2 id="articleHeader4">2、v-for</h2>
<p>用于遍历数组、对象等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;main&quot;>
    <ul>
        <li v-for=&quot;item in arr&quot;>  //遍历数组
            "{{"item"}}"
        </li>
    </ul>
    
    <ul>
        <li v-for=&quot;item in obj&quot;>   //遍历对象
            "{{"item"}}"
        </li>
    </ul>
    
    <ul>      
        <li v-for=&quot;(value,key) in obj&quot;>   //键值循环，数组也适用，注意key在后面
            "{{"key"}}"----"{{"value"}}"
        </li>
    </ul>
</div>

<script src=&quot;./js/vue.js&quot;></script>
<script>
    new Vue({
        el: '#main',
        data: {
            arr: [1, 2, 3, 4, 5, 6],
            obj: {
                name: 'hedawei',
                age: 22,
                gender: 'man'
            }
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in arr"</span>&gt;</span>  //遍历数组
            </span><span class="hljs-template-variable">"{{"item"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in obj"</span>&gt;</span>   //遍历对象
            </span><span class="hljs-template-variable">"{{"item"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>      
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(value,key) in obj"</span>&gt;</span>   //键值循环，数组也适用，注意key在后面
            </span><span class="hljs-template-variable">"{{"key"}}"</span><span class="xml">----</span><span class="hljs-template-variable">"{{"value"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#main'</span>,
        data: {
            arr: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>],
            obj: {
                name: <span class="hljs-string">'hedawei'</span>,
                age: <span class="hljs-number">22</span>,
                gender: <span class="hljs-string">'man'</span>
            }
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader5">3、v-on</h2>
<p>用于绑定事件，用法：v-on:事件="函数"。</p>
<p>示例：点击事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;main&quot;>
        <button type=&quot;button&quot; v-on:click=&quot;showHello()&quot;>点击显示</button>
        <br>
        "{{"msg"}}"
</div>

<script src=&quot;./js/vue.js&quot;></script>
<script>
    new Vue({
        el: '#main',
        data: {
            msg:''
        },
        methods: {
            showHello() {
                this.msg = 'Hello Vue.js';
            }
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"showHello()"</span>&gt;</span>点击显示<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#main'</span>,
        data: {
            msg:<span class="hljs-string">''</span>
        },
        methods: {
            showHello() {
                <span class="hljs-keyword">this</span>.msg = <span class="hljs-string">'Hello Vue.js'</span>;
            }
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p><code>this</code>指向当前vue实例，由此可获取实例的其他属性。除了点击事件外还有很多其他事件，具体参考官网API。</p>
<h2 id="articleHeader6">4、v-show</h2>
<p>用来显示或隐藏元素，v-show是通过display实现。当<code>v-show</code>的值为true时显示，为false时隐藏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;main&quot;>
    <button type=&quot;button&quot; v-on:click=&quot;change()&quot;>隐藏</button>
    <div style=&quot;width:100px;height:100px;background:red&quot; v-show=&quot;flag&quot;></div>
</div>

<script src=&quot;./js/vue.js&quot;></script>
<script>
    new Vue({
        el: '#main',
        data: {
            flag: true
        },
        methods: {
            change() {
                this.flag = !this.flag;
            }
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"change()"</span>&gt;</span>隐藏<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:100px;height:100px;background:red"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"flag"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#main'</span>,
        data: {
            flag: <span class="hljs-literal">true</span>
        },
        methods: {
            change() {
                <span class="hljs-keyword">this</span>.flag = !<span class="hljs-keyword">this</span>.flag;
            }
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h1 id="articleHeader7">四、事件</h1>
<p>之前说了一些关于事件的指令，这里详细学习一下事件的相关知识。</p>
<h2 id="articleHeader8">1、事件简写</h2>
<p>之前的事件都是这样的写法：<code>v-on:click="showHello()"</code>，vue提供了一种简写方式：<br><code>@click="showHello()"</code></p>
<h2 id="articleHeader9">2、事件对象$event</h2>
<p>我们可以通过事件对象取得事件相关信息，如事件源、事件类型、偏移量。</p>
<p>下面这个例子通过事件对象取得按钮的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <div id=&quot;main&quot;>
    <button type=&quot;button&quot; @click=&quot;print($event)&quot;>点击显示按钮的值</button>
        <br> "{{"msg"}}"
    </div>

    <script src=&quot;./js/vue.js&quot;></script>
    <script>
        new Vue({
            el: '#main',
            data: {
                msg: ''
            },
            methods: {
                print(e) {
                    this.msg = e.target.innerHTML;
                }
            }
        })
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"print($event)"</span>&gt;</span>点击显示按钮的值<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span> </span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#main'</span>,
            data: {
                msg: <span class="hljs-string">''</span>
            },
            methods: {
                print(e) {
                    <span class="hljs-keyword">this</span>.msg = e.target.innerHTML;
                }
            }
        })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader10">3、事件冒泡与事件默认行为</h2>
<p>这里需要讨论阻止事件冒泡与阻止默认行为，原生js阻止事件冒泡首先得取得事件对象，然后调用事件对象的<code>stopPropagation</code>方法。在vue里，则不需要依赖于事件对象，只需要调用相应的事件修饰符<code>stop</code>即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@click.stop = &quot;print()&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">@<span class="hljs-built_in">click</span>.<span class="hljs-built_in">stop</span> = <span class="hljs-string">"print()"</span></code></pre>
<p>阻止事件默认行为和阻止事件冒泡基本一致，在vue里也有十分便利的操作方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@click.prevent = &quot;print()&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">@<span class="hljs-keyword">click</span>.<span class="hljs-keyword">prevent</span> = <span class="hljs-string">"print()"</span></code></pre>
<h2 id="articleHeader11">4、键盘事件</h2>
<p>vue里内置了一些键盘事件，便于开发者操作。语法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keydown.13 = &quot;print()&quot;
@keydown.enter = &quot;print()&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-variable">@keydown</span>.<span class="hljs-number">13</span> = <span class="hljs-string">"print()"</span>
<span class="hljs-variable">@keydown</span>.enter = <span class="hljs-string">"print()"</span></code></pre>
<p>除了回车事件外，还有很多其他键盘事件，例如下：<code>@keydown.38="print()"</code>。还有一些其他键盘事件，具体参考官方文档。</p>
<p>默认没有@keydown.a/b/c...事件，可以全局自定义键盘事件，也称为自定义键码或自定义键位别名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // camelCase 不可用
  mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  &quot;media-play-pause&quot;: 179,
  up: [38, 87]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>Vue.config.keyCodes = {
<span class="hljs-symbol">  v:</span> <span class="hljs-number">86</span>,
<span class="hljs-symbol">  f1:</span> <span class="hljs-number">112</span>,
  <span class="hljs-comment">// camelCase 不可用</span>
<span class="hljs-symbol">  mediaPlayPause:</span> <span class="hljs-number">179</span>,
  <span class="hljs-comment">// 取而代之的是 kebab-case 且用双引号括起来</span>
  <span class="hljs-string">"media-play-pause"</span>: <span class="hljs-number">179</span>,
<span class="hljs-symbol">  up:</span> [<span class="hljs-number">38</span>, <span class="hljs-number">87</span>]
}</code></pre>
<p>除了<code>stop</code>、<code>prevent</code>、<code>keyCode</code>这些事件修饰符以外，还有一些比较常用：</p>
<ul>
<li>.native - 监听组件根元素的原生事件。</li>
<li>.once - 只触发一次回调。</li>
</ul>
<h1 id="articleHeader12">五、属性</h1>
<p>vue提供了绑定属性的方法：<code>v-bind:属性名=""</code>，这样我们即可动态的改变属性值。</p>
<h2 id="articleHeader13">1、属性简写</h2>
<p>属性和事件一样，也有简写方式：<code>:属性名=""</code></p>
<h2 id="articleHeader14">2、class属性和style属性</h2>
<p>绑定class和style属性时的语法比较复杂。</p>
<h3 id="articleHeader15">（1）变量形式</h3>
<p>html部分：</p>
<p><code>&lt;p :class="myClass"&gt;Hello vue.js&lt;/p&gt;</code></p>
<p>对应的vue的data部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data:{
    myClass:className
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">data</span>:{
    <span class="hljs-attribute">myClass</span>:className
}</code></pre>
<h3 id="articleHeader16">（2）数组形式，同时引入多个类</h3>
<p>html部分：  <br><code>&lt;p :class="[myClass1,myClass2]"&gt;Hello vue.js&lt;/p&gt;</code></p>
<p>对应的vue的data部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data:{
    myClass1:className1,
    myClass2:className2,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">data:</span>{
<span class="hljs-symbol">    myClass1:</span>className1,
<span class="hljs-symbol">    myClass2:</span>className2,
}</code></pre>
<h3 id="articleHeader17">（3）json形式（常用）</h3>
<p>html部分：  <br><code>&lt;p :class="{className1:true,className2:false}"&gt;Hello vue.js&lt;/p&gt;</code></p>
<h3 id="articleHeader18">（4）变量引用json形式</h3>
<p>html部分：  <br><code>&lt;p :class="myClass"&gt;Hello vue.js&lt;/p&gt;</code></p>
<p>对应的vue的data部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data:{
    myClass:{
        className:true
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">data:</span><span class="hljs-string">{</span>
<span class="hljs-attr">    myClass:</span><span class="hljs-string">{</span>
<span class="hljs-attr">        className:</span><span class="hljs-literal">true</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">}</span></code></pre>
<p>style的用法和class的用法基本一致，但是不常用。</p>
<h1 id="articleHeader19">六、模板</h1>
<p>Vue.js使用基于HTML的模板语法，可以将DOM绑定到Vue实例中的数据。模板就是<code>"{{""}}"</code>，用来进行数据绑定，显示在页面中，也称为Mustache语法。</p>
<h2 id="articleHeader20">1、数据绑定的方式</h2>
<h3 id="articleHeader21">（1）双向数据绑定</h3>
<p>使用<code>v-model</code>指令，前面已经学习过。</p>
<h3 id="articleHeader22">（2）单向数据绑定</h3>
<h4>a.使用两对大括号"{{""}}"</h4>
<p>这个在之前也经常使用，但是有一个缺点，就是vue实例需要长时间编译时会在页面中出现<code>"{{""}}"</code>（闪烁现象）。vue提供了一个解决办法：使用<code>v-cloak</code>配合css。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//html内容
<div id=&quot;app&quot; v-cloak>
  "{{"msg"}}"
</div>

//css内容
[v-cloak] {
 display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//html内容</span>
&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"app"</span> v-cloak&gt;
  "{{"msg"}}"
&lt;/div&gt;

<span class="hljs-comment">//css内容</span>
[v-cloak] {
 <span class="hljs-attribute">display</span>: none;
}</code></pre>
<h4>b.使用指令v-text、v-html</h4>
<p><code>v-text</code>也可达到与使用<code>v-cloak</code>相同的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//html内容
<div id=&quot;app&quot; v-text=&quot;msg&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">//html内容</span>
&lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">"app"</span> v-text=<span class="hljs-string">"msg"</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p><code>v-html</code>会将文本中的html解析为html标签，然后渲染到页面中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//html内容
<div id=&quot;app&quot; v-html=&quot;msg&quot;>
</div>

//vue实例中data部分内容
 data: {
    msg: 'hello<mark>vue.js<mark>'
 }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">//html内容</span>
&lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">"app"</span> v-html=<span class="hljs-string">"msg"</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;

<span class="hljs-comment">//vue实例中data部分内容</span>
 data: {
    msg: <span class="hljs-string">'hello&lt;mark&gt;vue.js&lt;mark&gt;'</span>
 },</code></pre>
<p>这里的vue.js会有一个黄色的背景颜色。</p>
<h1 id="articleHeader23">七、过滤器</h1>
<p>过滤器用来过滤模型数据，在显示之前进行数据处理和筛选。语法：<code>"{{" data | filter1(参数) | filter2(参数)"}}"</code>。</p>
<p>vue1.0中内置了很多过滤器，但是在2.0中全部删除了。使用过滤器我们可以通过使用第三方库：lodash、date-fns日期格式化、accounting.js货币格式化。或者我们可以自定义过滤器。</p>
<h2 id="articleHeader24">1、自定义过滤器</h2>
<p>过滤器分为全局过滤器和局部过滤器。</p>
<h3 id="articleHeader25">（1）全局过滤器</h3>
<p>使用全局方法<code>Vue.filter(过滤器ID,过滤器函数)</code>。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>"{{"8|addZero"}}"</p>//数据会自动作为传过去

 Vue.filter('addZero', data => {
    return data > 10 ? data : '0' + data;
 });
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;p&gt;"{{"<span class="hljs-number">8</span>|addZero"}}"&lt;/p&gt;<span class="hljs-comment">//数据会自动作为传过去</span>

 Vue.filter(<span class="hljs-string">'addZero'</span>, <span class="hljs-keyword">data</span> =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">data</span> &gt; <span class="hljs-number">10</span> ? <span class="hljs-keyword">data</span> : <span class="hljs-string">'0'</span> + <span class="hljs-keyword">data</span>;
 });
 </code></pre>
<p>有时过滤器也要传递自己的参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p>"{{"12.3456|number(3)"}}"</p>

 Vue.filter('number', (data,n) => {
    return data.toFixed(n);
 });
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>&lt;p&gt;"{{"<span class="hljs-number">12.3456</span>|number(<span class="hljs-number">3</span>)"}}"&lt;/p&gt;

 Vue.filter(<span class="hljs-string">'number'</span>, <span class="hljs-function"><span class="hljs-params">(data,n)</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> data.toFixed(n);
 });
 </code></pre>
<h3 id="articleHeader26">（2）局部过滤器</h3>
<p>局部过滤器的使用方法与全局过滤器的使用方法一致。</p>
<p>不过过滤器写在vue实例中filters选项中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    el:'#app',
    data:{},
    filters:{
        number:data => {
            //具体操作
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
    <span class="hljs-attribute">el</span>:<span class="hljs-string">'#app'</span>,
    data:{},
    <span class="hljs-selector-tag">filters</span>:{
        <span class="hljs-attribute">number</span>:data =&gt; {
            //具体操作
        }
    }
})</code></pre>
<p>未完待续。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue学习笔记（一）

## 原文链接
[https://segmentfault.com/a/1190000011590661](https://segmentfault.com/a/1190000011590661)

