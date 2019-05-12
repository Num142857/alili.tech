---
title: 'Vue系列（一）：简介、起步、常用指令、事件和属性、模板、过滤器' 
date: 2018-12-16 2:30:10
hidden: true
slug: b4vmw8jyfmf
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、 Vue.js简介</h2>
<h3 id="articleHeader1">1. Vue.js是什么</h3>
<p><strong>Vue.js</strong>也称为Vue，读音/vju:/，类似view，<strong><code>错误读音</code></strong><code>v-u-e</code></p>
<ul>
<li>是一个轻量级<code>MVVM</code>（Model-View-ViewModel）框架，和angular、react类似，其实就是所谓的<strong><code>数据双向绑定</code></strong>
</li>
<li>
<strong>数据驱动</strong>+<strong>组件化</strong>的前端开发（核心思想）</li>
<li>更容易上手、小巧</li>
</ul>
<p>vue2.0和1.0相比，最大的变化就是引入了<code>Virtual DOM（虚拟DOM）</code>,页面更新效率更高，速度更快。</p>
<p>参考：<a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">官网</a></p>
<h3 id="articleHeader2">2.vue和angular的区别</h3>
<h4>2.1 angular</h4>
<ul>
<li>上手较难</li>
<li>指令以ng-xxx开头</li>
<li>所有属性和方法都存储在$scope中</li>
<li>由google维护</li>
</ul>
<h4>2.2 vue</h4>
<ul>
<li>简单、易学、更轻量</li>
<li>指令以v-xxx开头</li>
<li>HTML代码+JSON数据，再创建一个vue实例</li>
<li>由个人维护：<strong>尤雨溪</strong>，华人，目前就职于阿里巴巴，2014.2开源了vue.js库</li>
</ul>
<p>共同点：<code>都不兼容低版本IE</code></p>
<h2 id="articleHeader3">二、起步</h2>
<h3 id="articleHeader4">1. Hello World</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Hello World</title>
    <script src=&quot;https://cdn.jsdelivr.net/npm/vue&quot;></script>
    <script>
        window.onload=function(){
            //配置是否允许vue-devtools检查代码，方便调试，生产环境中需要设置为false，默认为true
            Vue.config.devtools=false;
            Vue.config.productionTip=false; //阻止vue启动时生成生产消息

            var vm=new Vue({
                el:'#itany', //指定关联的元素
                data:{ //存储数据
                    msg:'Hello World'
                }
            });
        }
    </script>
</head>
<body>
    <div id=&quot;itany&quot;>
        "{{"msg"}}" <!-- 两对大括号"{{""}}"称为模板，用来进行数据的绑定显示在页面中 -->
    </div>

    <h3>
        "{{"msg"}}"
    </h3>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-comment">//配置是否允许vue-devtools检查代码，方便调试，生产环境中需要设置为false，默认为true</span>
            Vue.config.devtools=<span class="hljs-literal">false</span>;
            Vue.config.productionTip=<span class="hljs-literal">false</span>; <span class="hljs-comment">//阻止vue启动时生成生产消息</span>

            <span class="hljs-keyword">var</span> vm=<span class="hljs-keyword">new</span> Vue({
                <span class="hljs-attr">el</span>:<span class="hljs-string">'#itany'</span>, <span class="hljs-comment">//指定关联的元素</span>
                data:{ <span class="hljs-comment">//存储数据</span>
                    msg:<span class="hljs-string">'Hello World'</span>
                }
            });
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"itany"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml"> <span class="hljs-comment">&lt;!-- 两对大括号</span></span><span class="hljs-template-variable">"{{""}}"</span><span class="xml"><span class="hljs-comment">称为模板，用来进行数据的绑定显示在页面中 --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<h3 id="articleHeader5">2. 安装vue-devtools插件，便于在chrome中调试vue</h3>
<p><a href="https://github.com/vuejs/vue-devtools" rel="nofollow noreferrer" target="_blank">vue-devtools下载地址</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="直接将vue-devtools解压缩，然后将文件夹中的chrome拖放到扩展程序中

//配置是否允许vue-devtools检查代码，方便调试，生产环境中需要设置为false
    Vue.config.devtools=false;
    Vue.config.productionTip=false; //阻止vue启动时生成生产消息
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs protobuf"><code>直接将vue-devtools解压缩，然后将文件夹中的chrome拖放到扩展程序中

<span class="hljs-comment">//配置是否允许vue-devtools检查代码，方便调试，生产环境中需要设置为false</span>
    Vue.config.devtools=<span class="hljs-literal">false</span>;
    Vue.config.productionTip=<span class="hljs-literal">false</span>; <span class="hljs-comment">//阻止vue启动时生成生产消息</span>
</code></pre>
<h2 id="articleHeader6">三、 常用指令</h2>
<h3 id="articleHeader7">1. 什么是指令？</h3>
<p><strong><code>用来扩展html标签的功能</code></strong>。</p>
<h3 id="articleHeader8">2. vue中常用的指令</h3>
<ul><li>v-model<br>  双向数据绑定，一般用于表单元素</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>常用指令：v-model</title>
    <script src=&quot;https://cdn.jsdelivr.net/npm/vue&quot;></script>
    <script>
        window.onload=function(){
            new Vue({
                // el:'.itany',
                el:'div', //vue2.0中不允许将vue实例挂载到<html>或<body>元素，在vue1.0中是可以的
                data:{
                    name:'', //即使没有值，也不能省略，报错
                    age:21,
                    flag:true,
                    nums:[12,4,23,5],
                    user:{id:9527,name:'唐伯虎'}
                }
            });
        }
    </script>
</head>
<body>
    <!-- <div id=&quot;itany&quot;> -->
    <!-- <div class=&quot;itany&quot;> -->
    <div>
        用户名：<input type=&quot;text&quot; v-model=&quot;name&quot;>
        <br>

        "{{"name"}}" <br>
        "{{"age"}}" <br>
        "{{"flag"}}" <br>
        "{{"nums"}}" <br>
        "{{"user"}}"
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>常用指令：v-model<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">new</span> Vue({
                <span class="hljs-comment">// el:'.itany',</span>
                el:<span class="hljs-string">'div'</span>, <span class="hljs-comment">//vue2.0中不允许将vue实例挂载到&lt;html&gt;或&lt;body&gt;元素，在vue1.0中是可以的</span>
                data:{
                    <span class="hljs-attr">name</span>:<span class="hljs-string">''</span>, <span class="hljs-comment">//即使没有值，也不能省略，报错</span>
                    age:<span class="hljs-number">21</span>,
                    <span class="hljs-attr">flag</span>:<span class="hljs-literal">true</span>,
                    <span class="hljs-attr">nums</span>:[<span class="hljs-number">12</span>,<span class="hljs-number">4</span>,<span class="hljs-number">23</span>,<span class="hljs-number">5</span>],
                    <span class="hljs-attr">user</span>:{<span class="hljs-attr">id</span>:<span class="hljs-number">9527</span>,<span class="hljs-attr">name</span>:<span class="hljs-string">'唐伯虎'</span>}
                }
            });
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;div id="itany"&gt; --&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;div class="itany"&gt; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        用户名：<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"name"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>

        </span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"age"}}"</span><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"flag"}}"</span><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"nums"}}"</span><span class="xml"> <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"user"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<ul><li>
<p>v-for<br>  对数组或对象进行循环操作，使用的是v-for，不是v-repeat<br>  注：在vue1.0中提供了隐式变量，如$index、$key</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  在vue2.0中去除了隐式变量，已被废除            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">  在<span class="hljs-selector-tag">vue2</span><span class="hljs-selector-class">.0</span>中去除了隐式变量，已被废除            </code></pre>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>常用指令：v-for</title>
    <script src=&quot;https://cdn.jsdelivr.net/npm/vue&quot;></script>
    <script>
        window.onload=function(){
            new Vue({
                el:'#itany',
                data:{
                    arr:[12,4,5,34,2,11],
                    user:{id:9527,name:'唐伯虎',age:25},
                    arr2:[12,4,5,34,2,11,12],
                    users:[
                        {id:9527,name:'唐伯虎',age:25},
                        {id:1001,name:'秋香',age:22},
                        {id:1002,name:'石榴姐',age:24}
                    ]
                }
            });
        }
    </script>
</head>
<body>
    <div id=&quot;itany&quot;>
        <!-- "{{"arr"}}" -->

        <ul>
            <!-- 普通循环 -->
            <!-- <li v-for=&quot;value in arr&quot;>"{{"value"}}"</li> -->
            <!-- <li v-for=&quot;value in user&quot;>"{{"value"}}"</li> -->

            <!-- 键值循环 -->
            <!-- <li v-for=&quot;(v,k) in arr&quot;>"{{"k"}}"="{{"v"}}"</li> -->
            <!-- <li v-for=&quot;(v,k) in user&quot;>"{{"k"}}"="{{"v"}}"</li> -->

            <!-- 可以直接循环包含重复数据的集合，可以通过指定:key属性绑定唯一key，当更新元素时可重用元素，提高效率，类似于vue1.0中track-by -->
            <!-- <li v-for=&quot;(v,k) in arr2&quot; :key=&quot;k&quot;>"{{"v"}}"</li> -->

            <li v-for=&quot;(user,index) in users&quot;>
                "{{"index+1"}}","{{"user.id"}}","{{"user.name"}}","{{"user.age"}}"
            </li>
        </ul>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>常用指令：v-for<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">new</span> Vue({
                <span class="hljs-attr">el</span>:<span class="hljs-string">'#itany'</span>,
                <span class="hljs-attr">data</span>:{
                    <span class="hljs-attr">arr</span>:[<span class="hljs-number">12</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">34</span>,<span class="hljs-number">2</span>,<span class="hljs-number">11</span>],
                    <span class="hljs-attr">user</span>:{<span class="hljs-attr">id</span>:<span class="hljs-number">9527</span>,<span class="hljs-attr">name</span>:<span class="hljs-string">'唐伯虎'</span>,<span class="hljs-attr">age</span>:<span class="hljs-number">25</span>},
                    <span class="hljs-attr">arr2</span>:[<span class="hljs-number">12</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">34</span>,<span class="hljs-number">2</span>,<span class="hljs-number">11</span>,<span class="hljs-number">12</span>],
                    <span class="hljs-attr">users</span>:[
                        {<span class="hljs-attr">id</span>:<span class="hljs-number">9527</span>,<span class="hljs-attr">name</span>:<span class="hljs-string">'唐伯虎'</span>,<span class="hljs-attr">age</span>:<span class="hljs-number">25</span>},
                        {<span class="hljs-attr">id</span>:<span class="hljs-number">1001</span>,<span class="hljs-attr">name</span>:<span class="hljs-string">'秋香'</span>,<span class="hljs-attr">age</span>:<span class="hljs-number">22</span>},
                        {<span class="hljs-attr">id</span>:<span class="hljs-number">1002</span>,<span class="hljs-attr">name</span>:<span class="hljs-string">'石榴姐'</span>,<span class="hljs-attr">age</span>:<span class="hljs-number">24</span>}
                    ]
                }
            });
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"itany"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- </span></span><span class="hljs-template-variable">"{{"arr"}}"</span><span class="xml"><span class="hljs-comment"> --&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 普通循环 --&gt;</span>
            <span class="hljs-comment">&lt;!-- &lt;li v-for="value in arr"&gt;</span></span><span class="hljs-template-variable">"{{"value"}}"</span><span class="xml"><span class="hljs-comment">&lt;/li&gt; --&gt;</span>
            <span class="hljs-comment">&lt;!-- &lt;li v-for="value in user"&gt;</span></span><span class="hljs-template-variable">"{{"value"}}"</span><span class="xml"><span class="hljs-comment">&lt;/li&gt; --&gt;</span>

            <span class="hljs-comment">&lt;!-- 键值循环 --&gt;</span>
            <span class="hljs-comment">&lt;!-- &lt;li v-for="(v,k) in arr"&gt;</span></span><span class="hljs-template-variable">"{{"k"}}"</span><span class="xml"><span class="hljs-comment">=</span></span><span class="hljs-template-variable">"{{"v"}}"</span><span class="xml"><span class="hljs-comment">&lt;/li&gt; --&gt;</span>
            <span class="hljs-comment">&lt;!-- &lt;li v-for="(v,k) in user"&gt;</span></span><span class="hljs-template-variable">"{{"k"}}"</span><span class="xml"><span class="hljs-comment">=</span></span><span class="hljs-template-variable">"{{"v"}}"</span><span class="xml"><span class="hljs-comment">&lt;/li&gt; --&gt;</span>

            <span class="hljs-comment">&lt;!-- 可以直接循环包含重复数据的集合，可以通过指定:key属性绑定唯一key，当更新元素时可重用元素，提高效率，类似于vue1.0中track-by --&gt;</span>
            <span class="hljs-comment">&lt;!-- &lt;li v-for="(v,k) in arr2" :key="k"&gt;</span></span><span class="hljs-template-variable">"{{"v"}}"</span><span class="xml"><span class="hljs-comment">&lt;/li&gt; --&gt;</span>

            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(user,index) in users"</span>&gt;</span>
                </span><span class="hljs-template-variable">"{{"index+1"}}"</span><span class="xml">,</span><span class="hljs-template-variable">"{{"user.id"}}"</span><span class="xml">,</span><span class="hljs-template-variable">"{{"user.name"}}"</span><span class="xml">,</span><span class="hljs-template-variable">"{{"user.age"}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+ v-on
 用来绑定事件，用法：v-on:事件=&quot;函数&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>+ v-<span class="hljs-keyword">on</span>
 用来绑定事件，用法：v-<span class="hljs-keyword">on</span>:事件=<span class="hljs-string">"函数"</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>常用指令：v-on</title>
    <script src=&quot;https://cdn.jsdelivr.net/npm/vue&quot;></script>
    <script>
        window.onload=function(){
            let vm=new Vue({
                el:'#itany',
                data:{  //存储数据
                    arr:[12,34,45,23,5]
                },
                methods:{ //存储方法
                    show:function(){
                        console.log('show方法');
                    },
                    add(){
                        // console.log(this); //this表示当前vue实例
                        // console.log(this===vm); //true
                        this.arr.push(666); //使用this访问当前实例中的成员
                        // this.show();
                    }
                }
            });
        }
    </script>
</head>
<body>
    <div id=&quot;itany&quot;>
        <!-- <button onclick=&quot;show()&quot;>点我</button> -->
        <button v-on:click=&quot;show&quot;>点我</button>
        <button v-on:click=&quot;add()&quot;>向数组中添加一个元素</button>
        <br>
        "{{"arr"}}"
        <hr>
        
        <button v-on:mouseover=&quot;show&quot;>鼠标经过</button>
        <button v-on:dblclick=&quot;show&quot;>鼠标双击</button>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>常用指令：v-on<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">let</span> vm=<span class="hljs-keyword">new</span> Vue({
                <span class="hljs-attr">el</span>:<span class="hljs-string">'#itany'</span>,
                <span class="hljs-attr">data</span>:{  <span class="hljs-comment">//存储数据</span>
                    arr:[<span class="hljs-number">12</span>,<span class="hljs-number">34</span>,<span class="hljs-number">45</span>,<span class="hljs-number">23</span>,<span class="hljs-number">5</span>]
                },
                <span class="hljs-attr">methods</span>:{ <span class="hljs-comment">//存储方法</span>
                    show:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'show方法'</span>);
                    },
                    add(){
                        <span class="hljs-comment">// console.log(this); //this表示当前vue实例</span>
                        <span class="hljs-comment">// console.log(this===vm); //true</span>
                        <span class="hljs-keyword">this</span>.arr.push(<span class="hljs-number">666</span>); <span class="hljs-comment">//使用this访问当前实例中的成员</span>
                        <span class="hljs-comment">// this.show();</span>
                    }
                }
            });
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"itany"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;button onclick="show()"&gt;点我&lt;/button&gt; --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"show"</span>&gt;</span>点我<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"add()"</span>&gt;</span>向数组中添加一个元素<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"arr"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:mouseover</span>=<span class="hljs-string">"show"</span>&gt;</span>鼠标经过<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:dblclick</span>=<span class="hljs-string">"show"</span>&gt;</span>鼠标双击<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<ul><li>v-show/v-if   <br>  用来显示或隐藏元素，v-show是通过display实现，v-if是每次删除后再重新创建，与angular中类似</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>常用指令：v-show</title>
    <script src=&quot;https://cdn.jsdelivr.net/npm/vue&quot;></script>
    <script>
        window.onload=function(){
            let vm=new Vue({
                el:'#itany',
                data:{ 
                    flag:true
                },
                methods:{ 
                    change(){
                        this.flag=!this.flag;
                    }
                }
            });
        }
    </script>
</head>
<body>
    <div id=&quot;itany&quot;>
        <!-- <button v-on:click=&quot;change&quot;>隐藏</button> -->
        <button v-on:click=&quot;flag=!flag&quot;>隐藏</button>

        <hr>
        <div style=&quot;width: 100px;height: 100px; background-color: red&quot; v-if=&quot;flag&quot;>欢迎来到南京网博</div>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>常用指令：v-show<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">let</span> vm=<span class="hljs-keyword">new</span> Vue({
                <span class="hljs-attr">el</span>:<span class="hljs-string">'#itany'</span>,
                <span class="hljs-attr">data</span>:{ 
                    <span class="hljs-attr">flag</span>:<span class="hljs-literal">true</span>
                },
                <span class="hljs-attr">methods</span>:{ 
                    change(){
                        <span class="hljs-keyword">this</span>.flag=!<span class="hljs-keyword">this</span>.flag;
                    }
                }
            });
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"itany"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;button v-on:click="change"&gt;隐藏&lt;/button&gt; --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"flag=!flag"</span>&gt;</span>隐藏<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100px;height: 100px; background-color: red"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"flag"</span>&gt;</span>欢迎来到南京网博<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader9">四、 事件和属性</h2>
<h3 id="articleHeader10">1. 事件</h3>
<h4>1.1 事件简写</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-on:click=&quot;&quot;    
简写方式 @click=&quot;&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>v-<span class="hljs-keyword">on</span>:click=<span class="hljs-string">""</span>    
简写方式 @click=<span class="hljs-string">""</span>
</code></pre>
<h4>1.2 事件对象<strong><code>$</code></strong>event</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(e.target.innerHTML); //DOM对象
console.log(this); //当前Vue实例
包含事件相关信息，如事件源、事件类型、偏移量
target、type、offsetx
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">console</span>.log(e.target.innerHTML); <span class="hljs-comment">//DOM对象</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">//当前Vue实例</span>
包含事件相关信息，如事件源、事件类型、偏移量
target、<span class="hljs-keyword">type</span>、offsetx
</code></pre>
<h4>1.3 事件冒泡</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="阻止事件冒泡：
    a)原生js方式:e.stopPropagation();依赖于事件对象
    b)vue方式，不依赖于事件对象
        @click.stop
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>阻止事件冒泡：
    <span class="hljs-selector-tag">a</span>)原生<span class="hljs-selector-tag">js</span>方式<span class="hljs-selector-pseudo">:e.stopPropagation()</span>;依赖于事件对象
    <span class="hljs-selector-tag">b</span>)<span class="hljs-selector-tag">vue</span>方式，不依赖于事件对象
        @<span class="hljs-keyword">click</span>.<span class="hljs-keyword">stop</span>
</code></pre>
<h4>1.4 事件默认行为</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="阻止默认行为：
    a)原生js方式:e.preventDefault();依赖于事件对象
    b)vue方式：@click.prevent
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>阻止默认行为：
    <span class="hljs-selector-tag">a</span>)原生<span class="hljs-selector-tag">js</span>方式<span class="hljs-selector-pseudo">:e.preventDefault()</span>;依赖于事件对象
    <span class="hljs-selector-tag">b</span>)<span class="hljs-selector-tag">vue</span>方式：@<span class="hljs-keyword">click</span>.<span class="hljs-keyword">prevent</span>
</code></pre>
<h4>1.5 键盘事件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="原生：console.log(e.keyCode);
     if(e.keyCode==13){
        console.log('您按了回车');
     }
回车：@keydown.13 或@keydown.enter
上：@keydown.38 或@keydown.up

默认没有@keydown.a/b/c...事件，可以自定义键盘事件，也称为自定义键码或自定义键位别名
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>原生：console.<span class="hljs-built_in">log</span>(e.keyCode)<span class="hljs-comment">;</span>
     <span class="hljs-keyword">if</span>(e.keyCode==<span class="hljs-number">13</span>){
        console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'您按了回车'</span>)<span class="hljs-comment">;</span>
     }
回车：<span class="hljs-symbol">@keydown</span><span class="hljs-number">.13</span> 或<span class="hljs-symbol">@keydown</span>.enter
上：<span class="hljs-symbol">@keydown</span><span class="hljs-number">.38</span> 或<span class="hljs-symbol">@keydown</span>.up

默认没有<span class="hljs-symbol">@keydown</span>.a/b/c...事件，可以自定义键盘事件，也称为自定义键码或自定义键位别名
</code></pre>
<h4>1.6 事件修饰符</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".stop - 调用 event.stopPropagation()。
.prevent - 调用 event.preventDefault()。
.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
.native - 监听组件根元素的原生事件。
.once - 只触发一次回调。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-title">.stop - 调用 event.stopPropagation()。</span>
<span class="hljs-title">.prevent - 调用 event.preventDefault()。</span>
.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
<span class="hljs-title">.native - 监听组件根元素的原生事件。</span>
<span class="hljs-title">.once - 只触发一次回调。</span>
</code></pre>
<h3 id="articleHeader11">2. 属性</h3>
<h4>2.1 属性绑定和属性的简写</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-bind 用于属性绑定， v-bind:属性=&quot;&quot;

属性的简写：
    v-bind:src=&quot;&quot; 简写为 :src=&quot;&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>v-<span class="hljs-keyword">bind</span> 用于属性绑定， v-<span class="hljs-keyword">bind</span>:属性=<span class="hljs-string">""</span>

属性的简写：
    v-<span class="hljs-keyword">bind</span>:src=<span class="hljs-string">""</span> 简写为 :src=<span class="hljs-string">""</span>
</code></pre>
<h4>2.2 class和style属性</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="绑定class和style属性时语法比较复杂：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">绑定<span class="hljs-class"><span class="hljs-keyword">class</span>和<span class="hljs-title">style</span>属性时语法比较复杂：</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>class和style属性</title>
    <script src=&quot;https://cdn.jsdelivr.net/npm/vue&quot;></script>
    <script>
        window.onload=function(){
            let vm=new Vue({
                el:'#itany',
                data:{
                    bb:'aa',
                    dd:'cc',
                    flag:true,
                    num:-2,
                    hello:{aa:true,cc:true},
                    xx:{color:'blue',fontSize:'30px'},
                    yy:{backgroundColor:'#ff7300'}
                }
            });
        }
    </script>
    <style>
        .aa{
            color:red;
            font-size:20px;
        }
        .cc{
            background-color:#ccc;
        }
    </style>
</head>
<body>
    <div id=&quot;itany&quot;>
        <!-- 
            class属性
         -->
        <!-- <p class=&quot;aa&quot;>南京网博</p> -->  <!-- 可以访问，普通css方式 -->

        <!-- <p :class=&quot;aa&quot;>南京网博</p> --> <!-- 不可以，Vue的属性绑定时不能直接css样式 -->

        <!-- 方式1:变量形式 -->
        <!-- <p :class=&quot;bb&quot;>南京网博</p> -->

        <!-- 方式2：数组形式，同时引用多个 -->
        <!-- <p :class=&quot;[bb,dd]&quot;>南京网博</p> -->

        <!-- 方式3：json形式，常用！！！ -->
        <!-- <p :class=&quot;{aa:true,cc:flag}&quot;>南京网博</p> -->
        <!-- <p :class=&quot;{aa:num>0}&quot;>南京网博</p> -->

        <!-- 方式4：变量引用json形式 -->
        <!-- <p :class=&quot;hello&quot;>南京网博</p> -->
        
        <!-- 
            style属性
         -->
         <p :style=&quot;[xx,yy]&quot;>itany</p>

    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>class和style属性<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-built_in">window</span>.onload=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">let</span> vm=<span class="hljs-keyword">new</span> Vue({
                <span class="hljs-attr">el</span>:<span class="hljs-string">'#itany'</span>,
                <span class="hljs-attr">data</span>:{
                    <span class="hljs-attr">bb</span>:<span class="hljs-string">'aa'</span>,
                    <span class="hljs-attr">dd</span>:<span class="hljs-string">'cc'</span>,
                    <span class="hljs-attr">flag</span>:<span class="hljs-literal">true</span>,
                    <span class="hljs-attr">num</span>:<span class="hljs-number">-2</span>,
                    <span class="hljs-attr">hello</span>:{<span class="hljs-attr">aa</span>:<span class="hljs-literal">true</span>,<span class="hljs-attr">cc</span>:<span class="hljs-literal">true</span>},
                    <span class="hljs-attr">xx</span>:{<span class="hljs-attr">color</span>:<span class="hljs-string">'blue'</span>,<span class="hljs-attr">fontSize</span>:<span class="hljs-string">'30px'</span>},
                    <span class="hljs-attr">yy</span>:{<span class="hljs-attr">backgroundColor</span>:<span class="hljs-string">'#ff7300'</span>}
                }
            });
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.aa</span>{
            <span class="hljs-attribute">color</span>:red;
            <span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span>;
        }
        <span class="hljs-selector-class">.cc</span>{
            <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#ccc</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"itany"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 
            class属性
         --&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;p class="aa"&gt;南京网博&lt;/p&gt; --&gt;</span>  <span class="hljs-comment">&lt;!-- 可以访问，普通css方式 --&gt;</span>

        <span class="hljs-comment">&lt;!-- &lt;p :class="aa"&gt;南京网博&lt;/p&gt; --&gt;</span> <span class="hljs-comment">&lt;!-- 不可以，Vue的属性绑定时不能直接css样式 --&gt;</span>

        <span class="hljs-comment">&lt;!-- 方式1:变量形式 --&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;p :class="bb"&gt;南京网博&lt;/p&gt; --&gt;</span>

        <span class="hljs-comment">&lt;!-- 方式2：数组形式，同时引用多个 --&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;p :class="[bb,dd]"&gt;南京网博&lt;/p&gt; --&gt;</span>

        <span class="hljs-comment">&lt;!-- 方式3：json形式，常用！！！ --&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;p :class="{aa:true,cc:flag}"&gt;南京网博&lt;/p&gt; --&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;p :class="{aa:num&gt;0}"&gt;南京网博&lt;/p&gt; --&gt;</span>

        <span class="hljs-comment">&lt;!-- 方式4：变量引用json形式 --&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;p :class="hello"&gt;南京网博&lt;/p&gt; --&gt;</span>
        
        <span class="hljs-comment">&lt;!-- 
            style属性
         --&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"[xx,yy]"</span>&gt;</span>itany<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader12">五、 模板</h2>
<h3 id="articleHeader13">1. 简介</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.js使用基于HTML的模板语法，可以将DOM绑定到Vue实例中的数据
模板就是"{{""}}"，用来进行数据绑定，显示在页面中
也称为Mustache语法
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>Vue.js使用基于HTML的模板语法，可以将DOM绑定到Vue实例中的数据
模板就是"{{""}}"，用来进行数据绑定，显示在页面中
也称为Mustache语法
</code></pre>
<h3 id="articleHeader14">2. 数据绑定的方式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.双向绑定
    v-model
b.单向绑定    
    方式1：使用两对大括号"{{""}}"，可能会出现闪烁的问题，可以使用v-cloak解决
    /* 必须配置css样式，否则不生效 */
    [v-cloak]{ //属性选择器
        display:none;
    }
    <h3>aaa<span v-cloak>"{{"msg"}}"</span></h3>
    
    方式2：使用v-text（等价 "{{""}}"，但不会出现闪烁问题 ）、v-html
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">a</span>.双向绑定
    v-model
<span class="hljs-selector-tag">b</span>.单向绑定    
    方式<span class="hljs-number">1</span>：使用两对大括号"{{""}}"，可能会出现闪烁的问题，可以使用v-cloak解决
    <span class="hljs-comment">/* 必须配置css样式，否则不生效 */</span>
    [v-cloak]{ <span class="hljs-comment">//属性选择器</span>
        <span class="hljs-attribute">display</span>:none;
    }
    &lt;h3&gt;aaa&lt;<span class="hljs-selector-tag">span</span> v-cloak&gt;"{{"msg"}}"&lt;/span&gt;&lt;/h3&gt;
    
    方式<span class="hljs-number">2</span>：使用v-text（等价 "{{""}}"，但不会出现闪烁问题 ）、v-<span class="hljs-selector-tag">html</span>
</code></pre>
<h3 id="articleHeader15">3. 其他指令</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-once 数据只绑定一次
v-pre 不编译，直接原样显示

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>v-<span class="hljs-built_in">once</span> 数据只绑定一次
v-pre 不编译，直接原样显示

</code></pre>
<h2 id="articleHeader16">六、 过滤器</h2>
<h3 id="articleHeader17">1. 简介</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="用来过滤模型数据，在显示之前进行数据处理和筛选
语法："{{" data | filter1(参数) | filter2(参数)"}}"
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code>用来过滤模型数据，在显示之前进行数据处理和筛选
语法："{{" <span class="hljs-class"><span class="hljs-keyword">data</span> | filter1(参数) | filter2(参数)"}}"</span>
</code></pre>
<h3 id="articleHeader18">2. 关于内置过滤器</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue1.0中内置许多过滤器，如：
    currency、uppercase、lowercase
    limitBy
    orderBy
    filterBy
vue2.0中已经删除了所有内置过滤器，全部被废除
如何解决：
    a.使用第三方工具库，如lodash、date-fns日期格式化、accounting.js货币格式化等
    b.使用自定义过滤器
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>vue1.<span class="hljs-number">0</span>中内置许多过滤器，如：
    currency、uppercase、lowercase
    limitBy
    orderBy
    filterBy
vue2.<span class="hljs-number">0</span>中已经删除了所有内置过滤器，全部被废除
如何解决：
    <span class="hljs-selector-tag">a</span>.使用第三方工具库，如lodash、date-fns日期格式化、accounting.js货币格式化等
    <span class="hljs-selector-tag">b</span>.使用自定义过滤器
</code></pre>
<h3 id="articleHeader19">3. 自定义过滤器</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="分类：全局过滤器、局部过滤器
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>分类：全局过滤器、局部过滤器
</code></pre>
<h4>3.l 自定义全局过滤器</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="使用全局方法Vue.filter(过滤器ID,过滤器函数)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>使用全局方法<span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.filter</span>(过滤器<span class="hljs-selector-tag">ID</span>,过滤器函数)
</code></pre>
<h4>3.2 自定义局部过滤器</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>自定义过滤器</title>
    <script src=&quot;https://cdn.jsdelivr.net/npm/vue&quot;></script>
    <script>
        /**
         * 自定义全局过滤器
         */
        Vue.filter('addZero',function(data){
            // console.log(data);
            return data<10?'0'+data:data;
        });
        /*Vue.filter('number',(data,n) => {
            // console.log(data,n);
            return data.toFixed(n);
        });*/
        Vue.filter('date',data => {
            let d=new Date(data);
            return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
        });
        

        window.onload=function(){
            let vm=new Vue({
                el:'#itany',
                data:{
                    currentTime:Date.now()
                },
                filters:{ //局部过滤器
                    number:(data,n) => {
                        return data.toFixed(n);
                    }
                }
            });
        }
    </script>
</head>
<body>
    <div id=&quot;itany&quot;>
        <!-- <h3>"{{"3 | addZero"}}"</h3> -->
        
        <!-- 课后作业：自己实现toFiexed()四舍五入的功能 ，toFixed 不稳定-->
        <h3>"{{"12.345678 | number(2)"}}"</h3>
        <!-- <h3>"{{"12.045 | number(2)"}}"</h3> -->

        <h3>"{{"currentTime | date"}}"</h3>
    
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs twig"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>自定义过滤器<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.jsdelivr.net/npm/vue"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">/**
         * 自定义全局过滤器
         */</span>
        Vue.filter(<span class="hljs-string">'addZero'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
            <span class="hljs-comment">// console.log(data);</span>
            <span class="hljs-keyword">return</span> data&lt;<span class="hljs-number">10</span>?<span class="hljs-string">'0'</span>+data:data;
        });
        <span class="hljs-comment">/*Vue.filter('number',(data,n) =&gt; {
            // console.log(data,n);
            return data.toFixed(n);
        });*/</span>
        Vue.filter(<span class="hljs-string">'date'</span>,data =&gt; {
            <span class="hljs-keyword">let</span> d=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(data);
            <span class="hljs-keyword">return</span> d.getFullYear()+<span class="hljs-string">'-'</span>+(d.getMonth()+<span class="hljs-number">1</span>)+<span class="hljs-string">'-'</span>+d.getDate()+<span class="hljs-string">' '</span>+d.getHours()+<span class="hljs-string">':'</span>+d.getMinutes()+<span class="hljs-string">':'</span>+d.getSeconds();
        });
        

        <span class="hljs-built_in">window</span>.onload=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">let</span> vm=<span class="hljs-keyword">new</span> Vue({
                <span class="hljs-attr">el</span>:<span class="hljs-string">'#itany'</span>,
                <span class="hljs-attr">data</span>:{
                    <span class="hljs-attr">currentTime</span>:<span class="hljs-built_in">Date</span>.now()
                },
                <span class="hljs-attr">filters</span>:{ <span class="hljs-comment">//局部过滤器</span>
                    number:<span class="hljs-function">(<span class="hljs-params">data,n</span>) =&gt;</span> {
                        <span class="hljs-keyword">return</span> data.toFixed(n);
                    }
                }
            });
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"itany"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;h3&gt;</span></span><span class="hljs-template-variable">"{{"3 | addZero"}}"</span><span class="xml"><span class="hljs-comment">&lt;/h3&gt; --&gt;</span>
        
        <span class="hljs-comment">&lt;!-- 课后作业：自己实现toFiexed()四舍五入的功能 ，toFixed 不稳定--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span></span><span class="hljs-template-variable">"{{"12.345678 | number(2)"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;h3&gt;</span></span><span class="hljs-template-variable">"{{"12.045 | number(2)"}}"</span><span class="xml"><span class="hljs-comment">&lt;/h3&gt; --&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span></span><span class="hljs-template-variable">"{{"currentTime | <span class="hljs-name">date</span>"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<h3 id="articleHeader20"><a href="https://segmentfault.com/a/1190000012967337"><strong>下一篇</strong>：Vue系列（二）：发送Ajax、JSONP请求、Vue生命周期及实例属性和方法、自定义指令与过渡</a></h3>
<p>参考Vue教学视频：<a href="http://edu.51cto.com/course/10543.html" rel="nofollow noreferrer" target="_blank">Vue.js 2.0之全家桶系列视频课程（vue、vue-router、axios、vuex）</a><br><a href="https://github.com/tcyfree/VueLearn.git" rel="nofollow noreferrer" target="_blank">笔记代码</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue系列（一）：简介、起步、常用指令、事件和属性、模板、过滤器

## 原文链接
[https://segmentfault.com/a/1190000012934686](https://segmentfault.com/a/1190000012934686)

