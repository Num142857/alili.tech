---
title: 'Vue系列（三）：组件及数据传递、路由、单文件组件、vue-cli脚手架' 
date: 2018-12-16 2:30:10
hidden: true
slug: 3999wtqrnk9
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0"><a href="https://segmentfault.com/a/1190000012967337"><strong>上一篇：</strong>Vue系列（二）：发送Ajax、JSONP请求、Vue生命周期及实例属性和方法、自定义指令与过渡</a></h3>
<h2 id="articleHeader1">一、 组件component</h2>
<h3 id="articleHeader2">1. 什么是组件？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="组件（Component）是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码
组件是自定义元素（对象）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>组件（Component）是 Vue<span class="hljs-selector-class">.js</span> 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码
组件是自定义元素（对象）
</code></pre>
<h3 id="articleHeader3">2. 定义组件的方式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="方式1：先创建组件构造器，然后由组件构造器创建组件
方式2：直接创建组件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>方式<span class="hljs-number">1</span>：先创建组件构造器，然后由组件构造器创建组件
方式<span class="hljs-number">2</span>：直接创建组件</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;itany&quot;>
        <hello></hello>
        <my-world></my-world>
    </div>

    <script>
        /**
         * 方式1：先创建组件构造器，然后由组件构造器创建组件
         */
        //1.使用Vue.extend()创建一个组件构造器
        var MyComponent=Vue.extend({
            template:'<h3>Hello World</h3>'
        });
        //2.使用Vue.component(标签名,组件构造器)，根据组件构造器来创建组件
        Vue.component('hello',MyComponent);
        
        /**
         * 方式2：直接创建组件(推荐)
         */
        // Vue.component('world',{
        Vue.component('my-world',{
            template:'<h1>你好，世界</h1>'
        });
        var vm=new Vue({ //这里的vm也是一个组件，称为根组件Root
            el:'#itany',
            data:{
                msg:'网博'
            }
        });    
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"itany"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">hello</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-world</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-world</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-comment">/**
         * 方式1：先创建组件构造器，然后由组件构造器创建组件
         */</span>
        <span class="hljs-comment">//1.使用Vue.extend()创建一个组件构造器</span>
        <span class="hljs-keyword">var</span> MyComponent=Vue.extend({
            template:<span class="hljs-string">'&lt;h3&gt;Hello World&lt;/h3&gt;'</span>
        });
        <span class="hljs-comment">//2.使用Vue.component(标签名,组件构造器)，根据组件构造器来创建组件</span>
        Vue.component(<span class="hljs-string">'hello'</span>,MyComponent);
        
        <span class="hljs-comment">/**
         * 方式2：直接创建组件(推荐)
         */</span>
        <span class="hljs-comment">// Vue.component('world',{</span>
        Vue.component(<span class="hljs-string">'my-world'</span>,{
            template:<span class="hljs-string">'&lt;h1&gt;你好，世界&lt;/h1&gt;'</span>
        });
        <span class="hljs-keyword">var</span> vm=<span class="hljs-keyword">new</span> Vue({ <span class="hljs-comment">//这里的vm也是一个组件，称为根组件Root</span>
            el:<span class="hljs-string">'#itany'</span>,
            data:{
                msg:<span class="hljs-string">'网博'</span>
            }
        });    
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day03/01.html" rel="nofollow noreferrer" target="_blank">定义组件</a></p>
<h3 id="articleHeader4">3. 组件的分类</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="分类：全局组件、局部组件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">分类：全局组件、局部组件</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;itany&quot;>
        <my-hello></my-hello>
        <my-world></my-world>
    </div>

    <script>
        /**
         * 全局组件，可以在所有vue实例中使用
         */
        Vue.component('my-hello',{
            template:'<h3>"{{"name"}}"</h3>',
            data:function(){ //在组件中存储数据时，必须以函数形式，函数返回一个对象
                return {
                    name:'alice'
                }
            }
        });
        /**
         * 局部组件，只能在当前vue实例中使用
         */
        var vm=new Vue({
            el:'#itany',
            data:{
                name:'tom'
            },
            components:{ //局部组件
                'my-world':{
                    template:'<h3>"{{"age"}}"</h3>',
                    data(){
                        return {
                            age:25
                        }
                    }
                }
            }
        });    
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"itany"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-hello</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-hello</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-world</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-world</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-comment">/**
         * 全局组件，可以在所有vue实例中使用
         */</span>
        Vue.component(<span class="hljs-string">'my-hello'</span>,{
            template:<span class="hljs-string">'&lt;h3&gt;"{{"name"}}"&lt;/h3&gt;'</span>,
            data:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ <span class="hljs-comment">//在组件中存储数据时，必须以函数形式，函数返回一个对象</span>
                <span class="hljs-keyword">return</span> {
                    name:<span class="hljs-string">'alice'</span>
                }
            }
        });
        <span class="hljs-comment">/**
         * 局部组件，只能在当前vue实例中使用
         */</span>
        <span class="hljs-keyword">var</span> vm=<span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">'#itany'</span>,
            data:{
                name:<span class="hljs-string">'tom'</span>
            },
            components:{ <span class="hljs-comment">//局部组件</span>
                <span class="hljs-string">'my-world'</span>:{
                    template:<span class="hljs-string">'&lt;h3&gt;"{{"age"}}"&lt;/h3&gt;'</span>,
                    data(){
                        <span class="hljs-keyword">return</span> {
                            age:<span class="hljs-number">25</span>
                        }
                    }
                }
            }
        });    
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day03/02.html" rel="nofollow noreferrer" target="_blank">组件的分类</a></p>
<h3 id="articleHeader5">4. 引用模板</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="将组件内容放到模板<template>中并引用,必须有且只有一个根元素" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code style="word-break: break-word; white-space: initial;">将组件内容放到模板&lt;<span class="hljs-keyword">template</span>&gt;中并引用,必须有且只有一个根元素</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;itany&quot;>
        <my-hello></my-hello>
        <my-hello></my-hello>
    </div>

    <template id=&quot;wbs&quot;>
        <!-- <template>必须有且只有一个根元素 -->
        <div>
            <h3>"{{"msg"}}"</h3>
            <ul>
                <li v-for=&quot;value in arr&quot;>"{{"value"}}"</li>
            </ul>
        </div>
    </template>

    <script>
        var vm=new Vue({
            el:'#itany',
            components:{
                'my-hello':{
                    name:'wbs17022',  //指定组件的名称，默认为标签名，可以不设置
                    template:'#wbs',
                    data(){
                        return {
                            msg:'欢迎来到南京网博',
                            arr:['tom','jack','mike']
                        }
                    }
                }
                
            }
        });    
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"itany"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-hello</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-hello</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-hello</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-hello</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wbs"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;template&gt;必须有且只有一个根元素 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"value in arr"</span>&gt;</span></span><span class="hljs-template-variable">"{{"value"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">var</span> vm=<span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">'#itany'</span>,
            components:{
                <span class="hljs-string">'my-hello'</span>:{
                    name:<span class="hljs-string">'wbs17022'</span>,  <span class="hljs-comment">//指定组件的名称，默认为标签名，可以不设置</span>
                    template:<span class="hljs-string">'#wbs'</span>,
                    data(){
                        <span class="hljs-keyword">return</span> {
                            msg:<span class="hljs-string">'欢迎来到南京网博'</span>,
                            arr:[<span class="hljs-string">'tom'</span>,<span class="hljs-string">'jack'</span>,<span class="hljs-string">'mike'</span>]
                        }
                    }
                }
                
            }
        });    
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day03/03.html" rel="nofollow noreferrer" target="_blank">引用模板</a></p>
<h3 id="articleHeader6">5. 动态组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<component :is=&quot;&quot;>组件
    多个组件使用同一个挂载点，然后动态的在它们之间切换    

<keep-alive>组件    

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">""</span>&gt;</span>组件
    多个组件使用同一个挂载点，然后动态的在它们之间切换    

<span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>组件    

</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;itany&quot;>
        <button @click=&quot;flag='my-hello'&quot;>显示hello组件</button>
        <button @click=&quot;flag='my-world'&quot;>显示world组件</button>


        <div>
            <!-- 使用keep-alive组件缓存非活动组件，可以保留状态，避免重新渲染，默认每次都会销毁非活动组件并重新创建 -->
            <keep-alive>
                <component :is=&quot;flag&quot;></component>    
            </keep-alive>
        </div>
    </div>

    <script>
        var vm=new Vue({
            el:'#itany',
            data:{
                flag:'my-hello'
            },
            components:{
                'my-hello':{
                    template:'<h3>我是hello组件："{{"x"}}"</h3>',
                    data(){
                        return {
                            x:Math.random()
                        }
                    }
                },
                'my-world':{
                    template:'<h3>我是world组件："{{"y"}}"</h3>',
                    data(){
                        return {
                            y:Math.random()
                        }
                    }
                }
            }
        });    
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"itany"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"flag='my-hello'"</span>&gt;</span>显示hello组件<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"flag='my-world'"</span>&gt;</span>显示world组件<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>


        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 使用keep-alive组件缓存非活动组件，可以保留状态，避免重新渲染，默认每次都会销毁非活动组件并重新创建 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">"flag"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>    
            <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> vm=<span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>:<span class="hljs-string">'#itany'</span>,
            <span class="hljs-attr">data</span>:{
                <span class="hljs-attr">flag</span>:<span class="hljs-string">'my-hello'</span>
            },
            <span class="hljs-attr">components</span>:{
                <span class="hljs-string">'my-hello'</span>:{
                    <span class="hljs-attr">template</span>:<span class="hljs-string">'&lt;h3&gt;我是hello组件："{{"x"}}"&lt;/h3&gt;'</span>,
                    data(){
                        <span class="hljs-keyword">return</span> {
                            <span class="hljs-attr">x</span>:<span class="hljs-built_in">Math</span>.random()
                        }
                    }
                },
                <span class="hljs-string">'my-world'</span>:{
                    <span class="hljs-attr">template</span>:<span class="hljs-string">'&lt;h3&gt;我是world组件："{{"y"}}"&lt;/h3&gt;'</span>,
                    data(){
                        <span class="hljs-keyword">return</span> {
                            <span class="hljs-attr">y</span>:<span class="hljs-built_in">Math</span>.random()
                        }
                    }
                }
            }
        });    
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day03/04.html" rel="nofollow noreferrer" target="_blank">动态组件</a></p>
<h2 id="articleHeader7">二、 组件间数据传递</h2>
<h3 id="articleHeader8">1. 父子组件</h3>
<p>在一个组件内部定义另一个组件，称为父子组件 <br><strong>子组件只能在父组件内部使用</strong><br><strong>默认情况下，子组件无法访问父组件中的数据，每个组件实例的作用域是独立的</strong></p>
<h3 id="articleHeader9">2. 组件间数据传递 （通信）</h3>
<h4>2.1 子组件访问父组件的数据</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a)在调用子组件时，绑定想要获取的父组件中的数据
b)在子组件内部，使用props选项声明获取的数据，即接收来自父组件的数据
总结：父组件通过props向下传递数据给子组件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>a)在调用子组件时，绑定想要获取的父组件中的数据
b)在子组件内部，使用<span class="hljs-built_in">props</span>选项声明获取的数据，即接收来自父组件的数据
总结：父组件通过<span class="hljs-built_in">props</span>向下传递数据给子组件</code></pre>
<p><strong>注：组件中的数据共有三种形式：</strong><code>data</code>、<code>props</code>、<code>computed</code></p>
<h4>2.2 父组件访问子组件的数据</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a)在子组件中使用vm.$emit(事件名,数据)触发一个自定义事件，事件名自定义
b)父组件在使用子组件的地方监听子组件触发的事件，并在父组件中定义方法，用来获取数据
总结：子组件通过events给父组件发送消息，实际上就是子组件把自己的数据发送到父组件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>a)在子组件中使用vm.$emit(事件名,数据)触发一个自定义事件，事件名自定义
<span class="hljs-keyword">b)父组件在使用子组件的地方监听子组件触发的事件，并在父组件中定义方法，用来获取数据
</span>总结：子组件通过events给父组件发送消息，实际上就是子组件把自己的数据发送到父组件
</code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day03/05.html" rel="nofollow noreferrer" target="_blank">父子组件及组件间数据传递</a></p>
<h3 id="articleHeader10">3. 单向数据流</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props是单向绑定的，当父组件的属性变化时，将传导给子组件，但是不会反过来
而且不允许子组件直接修改父组件中的数据，报错
解决方式：
    方式1：如果子组件想把它作为局部数据来使用，可以将数据存入另一个变量中再操作，不影响父组件中的数据
    方式2：如果子组件想修改数据并且同步更新到父组件，两个方法：
        a.使用.sync（1.0版本中支持，2.0版本中不支持，2.3版本又开始支持）
            需要显式地触发一个更新事件
        b.可以将父组件中的数据包装成对象，然后在子组件中修改对象的属性(因为对象是引用类型，指向同一个内存空间)，推荐    
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>props是单向绑定的，当父组件的属性变化时，将传导给子组件，但是不会反过来
而且不允许子组件直接修改父组件中的数据，报错
解决方式：
    方式<span class="hljs-number">1</span>：如果子组件想把它作为局部数据来使用，可以将数据存入另一个变量中再操作，不影响父组件中的数据
    方式<span class="hljs-number">2</span>：如果子组件想修改数据并且同步更新到父组件，两个方法：
        a.使用.sync（<span class="hljs-number">1.0</span>版本中支持，<span class="hljs-number">2.0</span>版本中不支持，<span class="hljs-number">2.3</span>版本又开始支持）
            需要显式地触发一个更新事件
        b.可以将父组件中的数据包装成对象，然后在子组件中修改对象的属性(因为对象是引用类型，指向同一个内存空间)，推荐    
        </code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day03/06.html" rel="nofollow noreferrer" target="_blank">单向数据流</a></p>
<h3 id="articleHeader11">4. 非父子组件间的通信</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="非父子组件间的通信，可以通过一个空的Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件

var Event=new Vue();
Event.$emit(事件名,数据);
Event.$on(事件名,data => {});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>非父子组件间的通信，可以通过一个空的Vue实例作为中央事件总线（事件中心），用它来触发事件和监听事件

<span class="hljs-built_in">var</span> Event=<span class="hljs-literal">new</span> Vue();
Event.$emit(事件名,数据);
Event.$on(事件名,<span class="hljs-built_in">data</span> =&gt; {});
</code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day03/07.html" rel="nofollow noreferrer" target="_blank">非父子组件间的通信</a></p>
<h2 id="articleHeader12">三、 slot内容分发</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="本意：位置、槽
作用：用来获取组件中的原内容，类似angular中的transclude指令
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>本意：位置、槽
作用：用来获取组件中的原内容，类似angular中的transclude指令
</code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day03/08.html" rel="nofollow noreferrer" target="_blank">slot内容分发</a></p>
<h2 id="articleHeader13">四、 vue-router路由</h2>
<h3 id="articleHeader14">1. 简介</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="使用Vue.js开发SPA（Single Page Application）单页面应用
根据不同url地址，显示不同的内容，但显示在同一个页面中，称为单页面应用
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>使用<span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.js</span>开发<span class="hljs-selector-tag">SPA</span>（<span class="hljs-selector-tag">Single</span> <span class="hljs-selector-tag">Page</span> <span class="hljs-selector-tag">Application</span>）单页面应用
根据不同<span class="hljs-selector-tag">url</span>地址，显示不同的内容，但显示在同一个页面中，称为单页面应用
</code></pre>
<p><a href="https://router.vuejs.org/zh-cn" rel="nofollow noreferrer" target="_blank">参考</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bower info vue-router
cnpm install vue-router -S
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-keyword">bower </span><span class="hljs-meta">info</span> vue-router
<span class="hljs-symbol">cnpm</span> install vue-router -S
</code></pre>
<h3 id="articleHeader15">2. 基本用法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.布局
b.配置路由" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">a</span>.布局
<span class="hljs-selector-tag">b</span>.配置路由</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;itany&quot;>
        <div>
            <!-- 使用router-link组件来定义导航，to属性指定链接url -->
            <router-link to=&quot;/home&quot;>主页</router-link>
            <router-link to=&quot;/news&quot;>新闻</router-link>
        </div>
        <div>
            <!-- 路由出口 -->
            <!-- 路由匹配到的组件将渲染在这里 -->
            <!-- router-view用来显示路由内容 -->
            <router-view></router-view>
        </div>
</div>

<script>
        //1.定义组件
        var Home={
            template:'<h3>我是主页</h3>'
        }
        var News={
            template:'<h3>我是新闻</h3>'
        }
        //2.配置路由
        const routes=[
            {path:'/home',component:Home},
            {path:'/news',component:News},
            {path:'*',redirect:'/home'} //重定向
        ]
        //3.创建路由实例
        const router=new VueRouter({
            routes, //简写，相当于routes:routes
            // mode:'history', //更改模式
            linkActiveClass:'active' //更新活动链接的class类名
        });
        //4.创建根实例并将路由挂载到Vue实例上
        new Vue({
            el:'#itany',
            router //注入路由
        });
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"itany"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 使用router-link组件来定义导航，to属性指定链接url --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/home"</span>&gt;</span>主页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/news"</span>&gt;</span>新闻<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 路由出口 --&gt;</span>
            <span class="hljs-comment">&lt;!-- 路由匹配到的组件将渲染在这里 --&gt;</span>
            <span class="hljs-comment">&lt;!-- router-view用来显示路由内容 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-comment">//1.定义组件</span>
        <span class="hljs-keyword">var</span> Home={
            template:<span class="hljs-string">'&lt;h3&gt;我是主页&lt;/h3&gt;'</span>
        }
        <span class="hljs-keyword">var</span> News={
            template:<span class="hljs-string">'&lt;h3&gt;我是新闻&lt;/h3&gt;'</span>
        }
        <span class="hljs-comment">//2.配置路由</span>
        <span class="hljs-keyword">const</span> routes=[
            {path:<span class="hljs-string">'/home'</span>,component:Home},
            {path:<span class="hljs-string">'/news'</span>,component:News},
            {path:<span class="hljs-string">'*'</span>,redirect:<span class="hljs-string">'/home'</span>} <span class="hljs-comment">//重定向</span>
        ]
        <span class="hljs-comment">//3.创建路由实例</span>
        <span class="hljs-keyword">const</span> router=<span class="hljs-keyword">new</span> VueRouter({
            routes, <span class="hljs-comment">//简写，相当于routes:routes</span>
            <span class="hljs-comment">// mode:'history', //更改模式</span>
            linkActiveClass:<span class="hljs-string">'active'</span> <span class="hljs-comment">//更新活动链接的class类名</span>
        });
        <span class="hljs-comment">//4.创建根实例并将路由挂载到Vue实例上</span>
        <span class="hljs-keyword">new</span> Vue({
            el:<span class="hljs-string">'#itany'</span>,
            router <span class="hljs-comment">//注入路由</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day03/09.html" rel="nofollow noreferrer" target="_blank">路由基本用法</a></p>
<h3 id="articleHeader16">3. 路由嵌套和参数传递</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="传参的两种形式：
    a.查询字符串：login?name=tom&amp;pwd=123
        "{{"$route.query"}}"
    b.rest风格url：regist/alice/456
        "{{"$route.params"}}"
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>传参的两种形式：
    a.查询字符串：login?name=tom&amp;pwd=<span class="hljs-number">123</span>
        "{{"$route.query"}}"
    b.rest风格url：regist/alice/<span class="hljs-number">456</span>
        "{{"$route.params"}}"
</code></pre>
<h3 id="articleHeader17">4. 路由实例的方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.push()  添加路由，功能上与<route-link>相同
router.replace() 替换路由，不产生历史记录    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.push</span>()  添加路由，功能上与&lt;<span class="hljs-selector-tag">route-link</span>&gt;相同
<span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.replace</span>() 替换路由，不产生历史记录    
</code></pre>
<h3 id="articleHeader18">5. 路由结合动画</h3>
<p><a href="https://github.com/tcyfree/VueLearn/blob/master/day03/10.html" rel="nofollow noreferrer" target="_blank">路由嵌套和参数传递、动画</a></p>
<h2 id="articleHeader19">五、 单文件组件</h2>
<h3 id="articleHeader20">1. .vue文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".vue文件，称为单文件组件，是Vue.js自定义的一种文件格式，一个.vue文件就是一个单独的组件，在文件内封装了组件相关的代码：html、css、js

.vue文件由三部分组成：<template>、<style>、<script>
    <template>
        html
    </template>

    <style>
        css
    </style>

    <script>
        js
    </script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>.vue文件，称为单文件组件，是Vue.js自定义的一种文件格式，一个.vue文件就是一个单独的组件，在文件内封装了组件相关的代码：html、css、js

.vue文件由三部分组成：<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>、<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="xml">、<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
        html
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
        css
    </span></span></span></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">
        js
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h3 id="articleHeader21">2. vue-loader</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="浏览器本身并不认为.vue文件，所以必须对.vue文件进行加载解析，此时需要vue-loader
类似的loader还有许多，如：html-loader、css-loader、style-loader、babel-loader等
需要注意的是vue-loader是基于webpack的     
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>浏览器本身并不认为<span class="hljs-selector-class">.vue</span>文件，所以必须对<span class="hljs-selector-class">.vue</span>文件进行加载解析，此时需要<span class="hljs-selector-tag">vue-loader</span>
类似的<span class="hljs-selector-tag">loader</span>还有许多，如：<span class="hljs-selector-tag">html-loader</span>、<span class="hljs-selector-tag">css-loader</span>、<span class="hljs-selector-tag">style-loader</span>、<span class="hljs-selector-tag">babel-loader</span>等
需要注意的是<span class="hljs-selector-tag">vue-loader</span>是基于<span class="hljs-selector-tag">webpack</span>的     
</code></pre>
<h3 id="articleHeader22">3. webpack</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack是一个前端资源模板化加载器和打包工具，它能够把各种资源都作为模块来使用和处理
实际上，webpack是通过不同的loader将这些资源加载后打包，然后输出打包后文件 
简单来说，webpack就是一个模块加载器，所有资源都可以作为模块来加载，最后打包输出
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>webpack是一个前端资源模板化加载器和打包工具，它能够把各种资源都作为模块来使用和处理
实际上，webpack是通过不同的loader将这些资源加载后打包，然后输出打包后文件 
简单来说，webpack就是一个模块加载器，所有资源都可以作为模块来加载，最后打包输出
</code></pre>
<p><a href="http://webpack.github.io/" rel="nofollow noreferrer" target="_blank">webpack官网</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack版本：v1.x v2.x

webpack有一个核心配置文件：webpack.config.js，必须放在项目根目录下
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>webpack版本：v1<span class="hljs-selector-class">.x</span> v2<span class="hljs-selector-class">.x</span>

webpack有一个核心配置文件：webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>，必须放在项目根目录下
</code></pre>
<h3 id="articleHeader23">4. 示例，步骤：</h3>
<h4>4.1 创建项目，目录结构 如下：</h4>
<p>webpack-demo</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-index.html
|-main.js   入口文件       
|-App.vue   vue文件
|-package.json  工程文件 //npm init --yes
|-webpack.config.js  webpack配置文件
|-.babelrc   Babel配置文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|-index.html</span>
<span class="hljs-string">|-main.js   入口文件       </span>
<span class="hljs-string">|-App.vue   vue文件</span>
<span class="hljs-string">|-package.json  工程文件 //npm init --yes</span>
<span class="hljs-string">|-webpack.config.js  webpack配置文件</span>
<span class="hljs-string">|-.babelrc   Babel配置文件</span>
</code></pre>
<h3 id="articleHeader24">4.2 编写App.vue</h3>
<h3 id="articleHeader25">4.3 安装相关模板</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install vue -S

cnpm install webpack -D
cnpm install webpack-dev-server -D

cnpm install vue-loader -D
cnpm install vue-html-loader -D
cnpm install css-loader -D
cnpm install vue-style-loader -D
cnpm install file-loader -D

cnpm install babel-loader -D
cnpm install babel-core -D
cnpm install babel-preset-env -D  //根据配置的运行环境自动启用需要的babel插件
cnpm install vue-template-compiler -D //预编译模板

合并：cnpm install -D webpack webpack-dev-server vue-loader vue-html-loader css-loader vue-style-loader file-loader babel-loader babel-core babel-preset-env  vue-template-compiler
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>cnpm <span class="hljs-keyword">install</span> vue -S

cnpm <span class="hljs-keyword">install</span> webpack -D
cnpm <span class="hljs-keyword">install</span> webpack-dev-<span class="hljs-keyword">server</span> -D

cnpm <span class="hljs-keyword">install</span> vue-loader -D
cnpm <span class="hljs-keyword">install</span> vue-html-loader -D
cnpm <span class="hljs-keyword">install</span> css-loader -D
cnpm <span class="hljs-keyword">install</span> vue-<span class="hljs-keyword">style</span>-loader -D
cnpm <span class="hljs-keyword">install</span> <span class="hljs-keyword">file</span>-loader -D

cnpm <span class="hljs-keyword">install</span> babel-loader -D
cnpm <span class="hljs-keyword">install</span> babel-core -D
cnpm <span class="hljs-keyword">install</span> babel-preset-env -D  //根据配置的运行环境自动启用需要的babel插件
cnpm <span class="hljs-keyword">install</span> vue-<span class="hljs-keyword">template</span>-compiler -D //预编译模板

合并：cnpm <span class="hljs-keyword">install</span> -D webpack webpack-dev-<span class="hljs-keyword">server</span> vue-loader vue-html-loader css-loader vue-<span class="hljs-keyword">style</span>-loader <span class="hljs-keyword">file</span>-loader babel-loader babel-core babel-preset-env  vue-<span class="hljs-keyword">template</span>-compiler
</code></pre>
<h3 id="articleHeader26">4.4 编写main.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue' //引入内置模块
import App from './App.vue' //引入自定义模块，需要加./

render:function(h){ //使用render函数（推荐）渲染组件,和compnents一样
        return h(App);
    }

/* scoped表示该样式只在当前组件中有效 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span> <span class="hljs-comment">//引入内置模块</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span> <span class="hljs-comment">//引入自定义模块，需要加./</span>

render:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">h</span>)</span>{ <span class="hljs-comment">//使用render函数（推荐）渲染组件,和compnents一样</span>
        <span class="hljs-keyword">return</span> h(App);
    }

<span class="hljs-comment">/* scoped表示该样式只在当前组件中有效 */</span></code></pre>
<h3 id="articleHeader27">4.5 编写webpack.config.js</h3>
<h3 id="articleHeader28">4.6 编写.babelrc</h3>
<h3 id="articleHeader29">4.7 编写package.json</h3>
<h3 id="articleHeader30">4.8 运行测试</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev    </span></code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/tree/master/day03/webpack-demo" rel="nofollow noreferrer" target="_blank">webpack-demo</a></p>
<h2 id="articleHeader31">六、 vue-cli脚手架</h2>
<h3 id="articleHeader32">1. 简介</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue-cli是一个vue脚手架，可以快速构造项目结构
vue-cli本身集成了多种项目模板：
    simple  很少简单
    webpack 包含ESLint代码规范检查和unit单元测试等
    webpack-simple 没有代码规范检查和单元测试
    browserify 使用的也比较多
    browserify-simple
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>vue-cli是一个vue脚手架，可以快速构造项目结构
vue-cli本身集成了多种项目模板：
    <span class="hljs-built_in">simple</span>  很少简单
    webpack 包含ESLint代码规范检查和unit单元测试等
    webpack-<span class="hljs-built_in">simple</span> 没有代码规范检查和单元测试
    browserify 使用的也比较多
    browserify-<span class="hljs-built_in">simple</span>
</code></pre>
<h3 id="articleHeader33">2. 示例，步骤：</h3>
<p><a href="https://cn.vuejs.org/v2/guide/installation.html#%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%B7%A5%E5%85%B7-CLI" rel="nofollow noreferrer" target="_blank">官网安装示例</a></p>
<h4>2.1 安装vue-cli，配置vue命令环境</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install vue-cli -g
vue --version
vue list
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>cnpm <span class="hljs-keyword">install</span> vue-cli -g
vue <span class="hljs-comment">--version</span>
vue <span class="hljs-keyword">list</span>
</code></pre>
<h4>2.2 初始化项目，生成项目模板</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="语法：vue init 模板名  项目名
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>语法：vue <span class="hljs-keyword">init</span> 模板名  项目名
</code></pre>
<h4>2.3 进入生成的项目目录，安装模块包</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd vue-cli-demo
cnpm install
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">cd</span> vue-<span class="hljs-keyword">cli</span>-demo
cnpm install
</code></pre>
<h4>2.4 运行</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev  //启动测试服务
npm run build //将项目打包输出dist目录，项目上线的话要将dist目录拷贝到服务器上
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev  //启动测试服务
</span>npm <span class="hljs-keyword">run</span><span class="bash"> build //将项目打包输出dist目录，项目上线的话要将dist目录拷贝到服务器上
</span></code></pre>
<h3 id="articleHeader34">3. 使用webpack模板</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack vue-cli-demo2

ESLint是用来统一代码规范和风格的工具，如缩进、空格、符号等，要求比较严格" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code>vue init webpack vue-<span class="hljs-keyword">cli</span>-demo2

ESLint是用来统一代码规范和风格的工具，如缩进、空格、符号等，要求比较严格</code></pre>
<p><a href="http://eslint.org" rel="nofollow noreferrer" target="_blank">官网</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="问题Bug：如果版本升级到node 8.0 和 npm 5.0，控制台会报错：
    GET http://localhost:8080/__webpack_hmr net::ERR_INCOMPLETE_CHUNKED_ENCODING
解决方法：
    a)降低Node版本到7.9或以下
    b)修改build/dev-server.js文件，如下：
        var hotMiddleware = require('webpack-hot-middleware')(compiler, {
          log: () => {},
          heartbeat:2000 //添加此行
        })
    参考：https://github.com/vuejs-templates/webpack/issues/731    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>问题Bug：如果版本升级到node <span class="hljs-number">8.0</span> 和 npm <span class="hljs-number">5.0</span>，控制台会报错：
    GET http://localhos<span class="hljs-variable">t:8080</span>/__webpack_hmr ne<span class="hljs-variable">t:</span>:ERR_INCOMPLETE_CHUNKED_ENCODING
解决方法：
    <span class="hljs-keyword">a</span>)降低Node版本到<span class="hljs-number">7.9</span>或以下
    <span class="hljs-keyword">b</span>)修改build/dev-server.js文件，如下：
        var hotMiddleware = require(<span class="hljs-string">'webpack-hot-middleware'</span>)(<span class="hljs-keyword">compiler</span>, {
          <span class="hljs-keyword">lo</span><span class="hljs-variable">g:</span> () =&gt; {},
          heartbea<span class="hljs-variable">t:2000</span> //添加此行
        })
    参考：http<span class="hljs-variable">s:</span>//github.<span class="hljs-keyword">com</span>/vuejs-templates/webpack/issues/<span class="hljs-number">731</span>    
</code></pre>
<h3 id="articleHeader35"><a href="https://segmentfault.com/a/1190000013036608"><strong>下一篇：</strong>Vue系列（四）：模块化开发、Elment UI、自定义全局组件（插件）、Vuex</a></h3>
<p>参考Vue教学视频：<a href="http://edu.51cto.com/course/10543.html" rel="nofollow noreferrer" target="_blank">Vue.js 2.0之全家桶系列视频课程（vue、vue-router、axios、vuex）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue系列（三）：组件及数据传递、路由、单文件组件、vue-cli脚手架

## 原文链接
[https://segmentfault.com/a/1190000013009026](https://segmentfault.com/a/1190000013009026)

