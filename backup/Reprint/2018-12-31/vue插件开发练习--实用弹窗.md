---
title: 'vue插件开发练习--实用弹窗' 
date: 2018-12-31 2:30:30
hidden: true
slug: 2948i2vxgda
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>上回说了组件（<a href="https://segmentfault.com/a/1190000011141625">vue组件开发练习--焦点图切换</a>）的一个练习项目，这次换下口味，说下vue的插件练手的项目。相对于现在之前的焦点图切换的组件，这个可能就更简单了，基本就是熟悉下插件开发的步骤就可以了！这个项目，我更建议大家动手练习了，这个弹窗比之前的焦点图更加的实用性，也更常用。同时也能让大家熟悉下vue的插件开发的流程。代码同样，我会上传到github（<a href="https://github.com/chenhuiYj/ec-dialog" rel="nofollow noreferrer" target="_blank">ec-dialog</a>），需要的可以直接去看代码！</p>
<blockquote>
<strong>建议</strong><br><strong> 1.下面的步骤，最好在自己本地上跑起来，根据文章的步骤，逐步完成，如果只看代码，很容易懵逼的。 </strong><br><strong>2.如果不清楚哪个代码有什么作用，可能自己调试下，把代码去掉后，看下有什么影响，就很容易想出代码有什么作用了！ </strong>
</blockquote>
<h2 id="articleHeader1">2.项目目录</h2>
<p><span class="img-wrap"><img data-src="/img/bVUS2K?w=648&amp;h=629" src="https://static.alili.tech/img/bVUS2K?w=648&amp;h=629" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>还是一个很简单的目录，各个目录不知道有什么用的，可以移步去看我上一篇文章。和组件开发的目录相比，区别就在于<code>src/js/components</code>这个文件夹上。</p>
<h2 id="articleHeader2">3.开发过程</h2>
<h3 id="articleHeader3">3-1.把项目跑起来</h3>
<p>首先，先弄<code>src/js/components/alert</code>这个组件。还是一样，，先在<code>src/js/components/alert/src/main.vue</code>。输出‘守候’。代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <transition name=&quot;ec&quot;>
        <div class=&quot;ec&quot;>
            守候
        </div>
    </transition>
</template>
<script>
    export default {
        data () {
            return {
                name: 'ec-alert',
            }
        },
        computed: {},
        mounted () {
        },
        methods: {
        }
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"ec"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ec"</span>&gt;</span>
            守候
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
        data () {
            return {
                name: 'ec-alert',
            }</span><span class="xml"><span class="undefined">
        },
        computed: </span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="undefined">,
        mounted () </span></span><span class="hljs-template-variable">{
        }</span><span class="xml"><span class="undefined">,
        methods: </span></span><span class="hljs-template-variable">{
        }</span><span class="xml"><span class="undefined">
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>然后来到<code>'alert/index.js'</code>。这个术语叫什么什么文件，我不太清楚，暂时就叫，插件配置文件吧！代码如下（注意看注释）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import AlertComponent from './src/main.vue'
//合并对象函数，这个方法是会改变，第一个参数的值的
function merge(target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }
    return target;
};
let instance;
//extend 是构造一个组件的语法器.传入参数，返回一个组件
let AlertConstructor = Vue.extend(AlertComponent);

let initInstance = ()=>{
    //实例化ConfirmConstructor组件
    instance = new AlertConstructor({
        el: document.createElement('div')
    });
    //添加到boby
    document.body.appendChild(instance.$el);
}

let Alert = (options={}) => {
    //初始化
    initInstance();
    // 将单个 confirm instance 的配置合并到默认值（instance.$data，就是main.vue里面的data）中
    merge(instance.$data, options);
    //返回Promise
    return new Promise((resolve, reject)=>{
        instance.show = true;
        let success = instance.success;
        let cancel = instance.cancel;
        instance.success = () => {
            //先执行instance.success（main.vue里面的success函数）
            success();
            //再执行自定义函数
            resolve('ok');
        }
    });

}
export default Alert;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> AlertComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/main.vue'</span>
<span class="hljs-comment">//合并对象函数，这个方法是会改变，第一个参数的值的</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">merge</span>(<span class="hljs-params">target</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>, j = <span class="hljs-built_in">arguments</span>.length; i &lt; j; i++) {
        <span class="hljs-keyword">let</span> source = <span class="hljs-built_in">arguments</span>[i] || {};
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> prop <span class="hljs-keyword">in</span> source) {
            <span class="hljs-keyword">if</span> (source.hasOwnProperty(prop)) {
                <span class="hljs-keyword">let</span> value = source[prop];
                <span class="hljs-keyword">if</span> (value !== <span class="hljs-literal">undefined</span>) {
                    target[prop] = value;
                }
            }
        }
    }
    <span class="hljs-keyword">return</span> target;
};
<span class="hljs-keyword">let</span> instance;
<span class="hljs-comment">//extend 是构造一个组件的语法器.传入参数，返回一个组件</span>
<span class="hljs-keyword">let</span> AlertConstructor = Vue.extend(AlertComponent);

<span class="hljs-keyword">let</span> initInstance = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-comment">//实例化ConfirmConstructor组件</span>
    instance = <span class="hljs-keyword">new</span> AlertConstructor({
        <span class="hljs-attr">el</span>: <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>)
    });
    <span class="hljs-comment">//添加到boby</span>
    <span class="hljs-built_in">document</span>.body.appendChild(instance.$el);
}

<span class="hljs-keyword">let</span> Alert = <span class="hljs-function">(<span class="hljs-params">options={}</span>) =&gt;</span> {
    <span class="hljs-comment">//初始化</span>
    initInstance();
    <span class="hljs-comment">// 将单个 confirm instance 的配置合并到默认值（instance.$data，就是main.vue里面的data）中</span>
    merge(instance.$data, options);
    <span class="hljs-comment">//返回Promise</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>)=&gt;</span>{
        instance.show = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">let</span> success = instance.success;
        <span class="hljs-keyword">let</span> cancel = instance.cancel;
        instance.success = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">//先执行instance.success（main.vue里面的success函数）</span>
            success();
            <span class="hljs-comment">//再执行自定义函数</span>
            resolve(<span class="hljs-string">'ok'</span>);
        }
    });

}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Alert;</code></pre>
<p>然后来到<code>components/js/index.js</code>这个文件，配置组件和API，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import alert from './alert/index.js'

const install = function(Vue) {
    //注册全局组件
    Vue.component(alert.name, alert)
    //添加全局API
    Vue.prototype.$alert = alert
}
export default install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> alert <span class="hljs-keyword">from</span> <span class="hljs-string">'./alert/index.js'</span>

<span class="hljs-keyword">const</span> install = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>) </span>{
    <span class="hljs-comment">//注册全局组件</span>
    Vue.component(alert.name, alert)
    <span class="hljs-comment">//添加全局API</span>
    Vue.prototype.$alert = alert
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> install</code></pre>
<p>然后在模板文件，<code>index.html</code>里面设置一个div,方便挂载测试</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<meta name=&quot;viewport&quot; content=&quot;width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
</head>
<body>
<div id=&quot;app&quot;>
</div>
</body>
</html>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>  </code></pre>
<p>然后在入口文件<code>index.js</code>里面，使用插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./index.html&quot;);
//引入sass
require(&quot;./src/sass/com.scss&quot;);
import Vue from 'vue'
import dialog from './src/js/components/index';
Vue.use(dialog)
let App = new Vue({
    el: '#app',
    data(){
        return {
            'name': 'index'
        }
    },
    mounted(){
        this.$alert();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">"./index.html"</span>);
<span class="hljs-comment">//引入sass</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">"./src/sass/com.scss"</span>);
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> dialog <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/js/components/index'</span>;
Vue.use(dialog)
<span class="hljs-keyword">let</span> App = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-string">'name'</span>: <span class="hljs-string">'index'</span>
        }
    },
    mounted(){
        <span class="hljs-keyword">this</span>.$alert();
    }
});</code></pre>
<p>然后，命令行 <code>$ npm run dev</code>，结果完美</p>
<p><span class="img-wrap"><img data-src="/img/bVUTfw?w=1197&amp;h=383" src="https://static.alili.tech/img/bVUTfw?w=1197&amp;h=383" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">3-2.样式修改</h3>
<p>完成了上一步，这个插件的一大半就算完成了！剩下的工作主要开发的就是在<code>components/../main.vue</code>这文件开发。<br>首先，先别急写代码，想一下，一个弹窗大概需要什么字段。</p>
<p><span class="img-wrap"><img data-src="/img/bVUTh4?w=416&amp;h=174" src="https://static.alili.tech/img/bVUTh4?w=416&amp;h=174" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>参考上面，发现有一个标题，一个内容，一个按钮文字。最后还需要一个变量，控制弹窗是否显示。然后一个点击按钮的操作函数。然后还有样式，大概如下</p>
<p><span class="img-wrap"><img data-src="/img/bVUTiz?w=373&amp;h=444" src="https://static.alili.tech/img/bVUTiz?w=373&amp;h=444" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>样式这个不多说，其他的字段，一个萝卜一个坑的填进去就好，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <transition name=&quot;ec&quot;>
        <div v-if=&quot;show&quot; class=&quot;ec&quot;>
            <div class=&quot;ec-box&quot;>
                <div class=&quot;ec-box-inner&quot;>
                    <div class=&quot;ec-title&quot; v-if=&quot;title&quot;>"{{"title"}}"</div>
                    <div class=&quot;ec-content&quot;>"{{"content"}}"</div>
                </div>
                <div class=&quot;ec-box-buttons&quot;>
                    <span class=&quot;ec-btn-success&quot; @click=&quot;success&quot;>"{{"submitText"}}"</span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        data () {
            return {
                name:'ec-alert',
                show: false,
                title: '提示',
                content: '',
                submitText: '确定',
                cancelText: '取消'
            }
        },
        computed: {},
        mounted () {
        },
        methods: {
            success () {
                this.show = false;
            }
        }
    }
</script>
<style lang=&quot;scss&quot; scoped>

    .ec {
        background: rgba(00, 00, 00, .5);
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .ec-box {
            width: 80%;
            max-width: 400px;
            top: 200px;
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            background: #fff;
            box-sizing: border-box;
            padding: 20px;
            border-radius: 6px;

        }
        .ec-title {
            padding-left: 0;
            margin-bottom: 0;
            font-size: 16px;
            font-weight: 700;
            height: 18px;
            color: #333;
        }
        .ec-content {
            padding: 14px 0;
            line-height: 24px;
            color: #48576a;
            font-size: 14px;
        }
        .ec-box-buttons {
            text-align: right;
        }
        .ec-btn-success {
            background: #20a0ff;
            border-color: #20a0ff;
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            color: #fff;
            margin: 0;
            padding: 10px 15px;
            border-radius: 4px;
        }
        .ec-btn-cancel {
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            background: #fff;
            border: 1px solid #c4c4c4;
            color: #1f2d3d;
            margin: 0;
            padding: 10px 15px;
            border-radius: 4px;
        }
    }
    .ec-enter {
        opacity: 0;
        .ec-box {
            transform:scale(0);
        }
    }

    .ec-enter-active {
        transition: opacity .4s;
        .ec-box {
            transition: transform .4s;
        }
    }
    .ec-leave-active{
        transition: opacity .2s;
        .ec-box {
            transition: transform .2s;
        }
    }
    .ec-leave-active {
        opacity: 0;
    }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">&lt;template&gt;</span>
    <span class="hljs-string">&lt;transition</span> <span class="hljs-string">name="ec"&gt;</span>
        <span class="hljs-string">&lt;div</span> <span class="hljs-string">v-if="show"</span> <span class="hljs-string">class="ec"&gt;</span>
            <span class="hljs-string">&lt;div</span> <span class="hljs-string">class="ec-box"&gt;</span>
                <span class="hljs-string">&lt;div</span> <span class="hljs-string">class="ec-box-inner"&gt;</span>
                    <span class="hljs-string">&lt;div</span> <span class="hljs-string">class="ec-title"</span> <span class="hljs-string">v-if="title"&gt;"{{"title"}}"&lt;/div&gt;</span>
                    <span class="hljs-string">&lt;div</span> <span class="hljs-string">class="ec-content"&gt;"{{"content"}}"&lt;/div&gt;</span>
                <span class="hljs-string">&lt;/div&gt;</span>
                <span class="hljs-string">&lt;div</span> <span class="hljs-string">class="ec-box-buttons"&gt;</span>
                    <span class="hljs-string">&lt;span</span> <span class="hljs-string">class="ec-btn-success"</span> <span class="hljs-string">@click="success"&gt;"{{"submitText"}}"&lt;/span&gt;</span>
                <span class="hljs-string">&lt;/div&gt;</span>
            <span class="hljs-string">&lt;/div&gt;</span>
        <span class="hljs-string">&lt;/div&gt;</span>
    <span class="hljs-string">&lt;/transition&gt;</span>
<span class="hljs-string">&lt;/template&gt;</span>
<span class="hljs-string">&lt;script&gt;</span>
    <span class="hljs-string">export</span> <span class="hljs-string">default</span> <span class="hljs-string">{</span>
        <span class="hljs-string">data</span> <span class="hljs-string">()</span> <span class="hljs-string">{</span>
            <span class="hljs-string">return</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                name:</span><span class="hljs-string">'ec-alert'</span><span class="hljs-string">,</span>
<span class="hljs-attr">                show:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">                title:</span> <span class="hljs-string">'提示'</span><span class="hljs-string">,</span>
<span class="hljs-attr">                content:</span> <span class="hljs-string">''</span><span class="hljs-string">,</span>
<span class="hljs-attr">                submitText:</span> <span class="hljs-string">'确定'</span><span class="hljs-string">,</span>
<span class="hljs-attr">                cancelText:</span> <span class="hljs-string">'取消'</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        computed:</span> <span class="hljs-string">{},</span>
        <span class="hljs-string">mounted</span> <span class="hljs-string">()</span> <span class="hljs-string">{</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        methods:</span> <span class="hljs-string">{</span>
            <span class="hljs-string">success</span> <span class="hljs-string">()</span> <span class="hljs-string">{</span>
                <span class="hljs-string">this.show</span> <span class="hljs-string">=</span> <span class="hljs-literal">false</span><span class="hljs-string">;</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">&lt;/script&gt;</span>
<span class="hljs-string">&lt;style</span> <span class="hljs-string">lang="scss"</span> <span class="hljs-string">scoped&gt;</span>

    <span class="hljs-string">.ec</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        background:</span> <span class="hljs-string">rgba(00,</span> <span class="hljs-number">00</span><span class="hljs-string">,</span> <span class="hljs-number">00</span><span class="hljs-string">,</span> <span class="hljs-number">.5</span><span class="hljs-string">);</span>
<span class="hljs-attr">        position:</span> <span class="hljs-string">fixed;</span>
<span class="hljs-attr">        left:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">        top:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">        width:</span> <span class="hljs-number">100</span><span class="hljs-string">%;</span>
<span class="hljs-attr">        height:</span> <span class="hljs-number">100</span><span class="hljs-string">%;</span>
        <span class="hljs-string">.ec-box</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            width:</span> <span class="hljs-number">80</span><span class="hljs-string">%;</span>
<span class="hljs-attr">            max-width:</span> <span class="hljs-number">400</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            top:</span> <span class="hljs-number">200</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            position:</span> <span class="hljs-string">absolute;</span>
<span class="hljs-attr">            left:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            right:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            margin:</span> <span class="hljs-string">auto;</span>
<span class="hljs-attr">            background:</span> <span class="hljs-comment">#fff;</span>
<span class="hljs-attr">            box-sizing:</span> <span class="hljs-string">border-box;</span>
<span class="hljs-attr">            padding:</span> <span class="hljs-number">20</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            border-radius:</span> <span class="hljs-number">6</span><span class="hljs-string">px;</span>

        <span class="hljs-string">}</span>
        <span class="hljs-string">.ec-title</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            padding-left:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            margin-bottom:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            font-size:</span> <span class="hljs-number">16</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            font-weight:</span> <span class="hljs-number">700</span><span class="hljs-string">;</span>
<span class="hljs-attr">            height:</span> <span class="hljs-number">18</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            color:</span> <span class="hljs-comment">#333;</span>
        <span class="hljs-string">}</span>
        <span class="hljs-string">.ec-content</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            padding:</span> <span class="hljs-number">14</span><span class="hljs-string">px</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            line-height:</span> <span class="hljs-number">24</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            color:</span> <span class="hljs-comment">#48576a;</span>
<span class="hljs-attr">            font-size:</span> <span class="hljs-number">14</span><span class="hljs-string">px;</span>
        <span class="hljs-string">}</span>
        <span class="hljs-string">.ec-box-buttons</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            text-align:</span> <span class="hljs-string">right;</span>
        <span class="hljs-string">}</span>
        <span class="hljs-string">.ec-btn-success</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            background:</span> <span class="hljs-comment">#20a0ff;</span>
<span class="hljs-attr">            border-color:</span> <span class="hljs-comment">#20a0ff;</span>
<span class="hljs-attr">            display:</span> <span class="hljs-string">inline-block;</span>
<span class="hljs-attr">            line-height:</span> <span class="hljs-number">1</span><span class="hljs-string">;</span>
<span class="hljs-attr">            white-space:</span> <span class="hljs-string">nowrap;</span>
<span class="hljs-attr">            cursor:</span> <span class="hljs-string">pointer;</span>
<span class="hljs-attr">            color:</span> <span class="hljs-comment">#fff;</span>
<span class="hljs-attr">            margin:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            padding:</span> <span class="hljs-number">10</span><span class="hljs-string">px</span> <span class="hljs-number">15</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            border-radius:</span> <span class="hljs-number">4</span><span class="hljs-string">px;</span>
        <span class="hljs-string">}</span>
        <span class="hljs-string">.ec-btn-cancel</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            display:</span> <span class="hljs-string">inline-block;</span>
<span class="hljs-attr">            line-height:</span> <span class="hljs-number">1</span><span class="hljs-string">;</span>
<span class="hljs-attr">            white-space:</span> <span class="hljs-string">nowrap;</span>
<span class="hljs-attr">            cursor:</span> <span class="hljs-string">pointer;</span>
<span class="hljs-attr">            background:</span> <span class="hljs-comment">#fff;</span>
<span class="hljs-attr">            border:</span> <span class="hljs-number">1</span><span class="hljs-string">px</span> <span class="hljs-string">solid</span> <span class="hljs-comment">#c4c4c4;</span>
<span class="hljs-attr">            color:</span> <span class="hljs-comment">#1f2d3d;</span>
<span class="hljs-attr">            margin:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            padding:</span> <span class="hljs-number">10</span><span class="hljs-string">px</span> <span class="hljs-number">15</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            border-radius:</span> <span class="hljs-number">4</span><span class="hljs-string">px;</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
    <span class="hljs-string">.ec-enter</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        opacity:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
        <span class="hljs-string">.ec-box</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            transform:</span><span class="hljs-string">scale(0);</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>

    <span class="hljs-string">.ec-enter-active</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        transition:</span> <span class="hljs-string">opacity</span> <span class="hljs-number">.4</span><span class="hljs-string">s;</span>
        <span class="hljs-string">.ec-box</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            transition:</span> <span class="hljs-string">transform</span> <span class="hljs-number">.4</span><span class="hljs-string">s;</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
    <span class="hljs-string">.ec-leave-active{</span>
<span class="hljs-attr">        transition:</span> <span class="hljs-string">opacity</span> <span class="hljs-number">.2</span><span class="hljs-string">s;</span>
        <span class="hljs-string">.ec-box</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            transition:</span> <span class="hljs-string">transform</span> <span class="hljs-number">.2</span><span class="hljs-string">s;</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
    <span class="hljs-string">.ec-leave-active</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        opacity:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">&lt;/style&gt;</span>
</code></pre>
<p>运行效果</p>
<p><span class="img-wrap"><img data-src="/img/bVUTiP?w=374&amp;h=273" src="https://static.alili.tech/img/bVUTiP?w=374&amp;h=273" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">3-3.使用插件</h3>
<p>大家知道，在前面步骤，<code>'alert/index.js'</code>这里就已经返回的一个Promise。所以，用法就是像Promise那样使用！</p>
<p><span class="img-wrap"><img data-src="/img/bVUVPY?w=765&amp;h=410" src="https://static.alili.tech/img/bVUVPY?w=765&amp;h=410" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>所以在入口文件，<code>index.js</code>里面直接写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted(){
    this.$alert({
        title:'提示2',
        content:'这里是提示内容2'
    }).then(()=>{
        this.name='守候'
        alert(this.name)
    })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>mounted(){
    <span class="hljs-keyword">this</span>.$alert({
        title:<span class="hljs-string">'提示2'</span>,
        content:<span class="hljs-string">'这里是提示内容2'</span>
    }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-keyword">this</span>.name=<span class="hljs-string">'守候'</span>
        alert(<span class="hljs-keyword">this</span>.name)
    })
}
</code></pre>
<p>运行效果</p>
<p><span class="img-wrap"><img data-src="/img/bVUTkb?w=1097&amp;h=861" src="https://static.alili.tech/img/bVUTkb?w=1097&amp;h=861" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">4.其它弹窗</h2>
<p>还是那句话，程序员不会满足于现状，只有一种弹窗，怎么够，下面我再增加一种，和上面那个基本一样，就是多了一个取消按钮而已。<br>这里我就再讲一个简单的栗子，至于弹窗的样式，太多了，我在这里就不展开说了，大家需要的可进行拓展。</p>
<p>首先，创建这个目录（可以直接把alert那个目录拷贝过来，然后再修改几下就完事了）</p>
<p><span class="img-wrap"><img data-src="/img/bVUTkL?w=514&amp;h=227" src="https://static.alili.tech/img/bVUTkL?w=514&amp;h=227" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后，针对<code>comfirm/src/main.vue</code>文件，添加下面的代码（下面的代码基本就是从<code>alert/src/main.vue</code>拷贝过来的，就是增加一个取消按钮的对应一个字段和操作函数）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <transition name=&quot;ec&quot;>
        <div v-if=&quot;show&quot; class=&quot;ec&quot;>
            <div class=&quot;ec-box&quot;>
                <div class=&quot;ec-box-inner&quot;>
                    <div class=&quot;ec-title&quot; v-if=&quot;title&quot;>"{{"title"}}"</div>
                    <div class=&quot;ec-content&quot;>"{{"content"}}"</div>
                </div>
                <div class=&quot;ec-box-buttons&quot;>
                    <span class=&quot;ec-btn-success&quot; @click=&quot;success&quot;>"{{"submitText"}}"</span>
                    <span class=&quot;ec-btn-cancel&quot; @click=&quot;cancel&quot;>"{{"cancelText"}}"</span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        data () {
            return {
                name:'ec-comfirm',
                show: false,
                title: '提示',
                content: '',
                submitText: '确定',
                cancelText: '取消'
            }
        },
        computed: {},
        mounted () {
        },
        methods: {
            success () {
                this.show = false;
            },
            cancel () {
                this.show = false;
            }
        }
    }
</script>
<style lang=&quot;scss&quot; scoped>
    .ec {
        background: rgba(00, 00, 00, .5);
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        .ec-box {
            width: 80%;
            max-width: 400px;
            top: 200px;
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            background: #fff;
            box-sizing: border-box;
            padding: 20px;
            border-radius: 6px;

        }
        .ec-title {
            padding-left: 0;
            margin-bottom: 0;
            font-size: 16px;
            font-weight: 700;
            height: 18px;
            color: #333;
        }
        .ec-content {
            padding: 14px 0;
            line-height: 24px;
            color: #48576a;
            font-size: 14px;
        }
        .ec-box-buttons {
            text-align: right;
        }
        .ec-btn-success {
            background: #20a0ff;
            border-color: #20a0ff;
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            color: #fff;
            margin: 0;
            padding: 10px 15px;
            border-radius: 4px;
        }
        .ec-btn-cancel {
            display: inline-block;
            line-height: 1;
            white-space: nowrap;
            cursor: pointer;
            background: #fff;
            border: 1px solid #c4c4c4;
            color: #1f2d3d;
            margin: 0;
            padding: 10px 15px;
            border-radius: 4px;
        }
    }
    .ec-enter {
        opacity: 0;
        .ec-box {
            transform:scale(0);
        }
    }

    .ec-enter-active {
        transition: opacity .4s;
        .ec-box {
            transition: transform .4s;
        }
    }
    .ec-leave-active{
        transition: opacity .2s;
        .ec-box {
            transition: transform .2s;
        }
    }
    .ec-leave-active {
        opacity: 0;
    }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">&lt;template&gt;</span>
    <span class="hljs-string">&lt;transition</span> <span class="hljs-string">name="ec"&gt;</span>
        <span class="hljs-string">&lt;div</span> <span class="hljs-string">v-if="show"</span> <span class="hljs-string">class="ec"&gt;</span>
            <span class="hljs-string">&lt;div</span> <span class="hljs-string">class="ec-box"&gt;</span>
                <span class="hljs-string">&lt;div</span> <span class="hljs-string">class="ec-box-inner"&gt;</span>
                    <span class="hljs-string">&lt;div</span> <span class="hljs-string">class="ec-title"</span> <span class="hljs-string">v-if="title"&gt;"{{"title"}}"&lt;/div&gt;</span>
                    <span class="hljs-string">&lt;div</span> <span class="hljs-string">class="ec-content"&gt;"{{"content"}}"&lt;/div&gt;</span>
                <span class="hljs-string">&lt;/div&gt;</span>
                <span class="hljs-string">&lt;div</span> <span class="hljs-string">class="ec-box-buttons"&gt;</span>
                    <span class="hljs-string">&lt;span</span> <span class="hljs-string">class="ec-btn-success"</span> <span class="hljs-string">@click="success"&gt;"{{"submitText"}}"&lt;/span&gt;</span>
                    <span class="hljs-string">&lt;span</span> <span class="hljs-string">class="ec-btn-cancel"</span> <span class="hljs-string">@click="cancel"&gt;"{{"cancelText"}}"&lt;/span&gt;</span>
                <span class="hljs-string">&lt;/div&gt;</span>
            <span class="hljs-string">&lt;/div&gt;</span>
        <span class="hljs-string">&lt;/div&gt;</span>
    <span class="hljs-string">&lt;/transition&gt;</span>
<span class="hljs-string">&lt;/template&gt;</span>
<span class="hljs-string">&lt;script&gt;</span>
    <span class="hljs-string">export</span> <span class="hljs-string">default</span> <span class="hljs-string">{</span>
        <span class="hljs-string">data</span> <span class="hljs-string">()</span> <span class="hljs-string">{</span>
            <span class="hljs-string">return</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                name:</span><span class="hljs-string">'ec-comfirm'</span><span class="hljs-string">,</span>
<span class="hljs-attr">                show:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">                title:</span> <span class="hljs-string">'提示'</span><span class="hljs-string">,</span>
<span class="hljs-attr">                content:</span> <span class="hljs-string">''</span><span class="hljs-string">,</span>
<span class="hljs-attr">                submitText:</span> <span class="hljs-string">'确定'</span><span class="hljs-string">,</span>
<span class="hljs-attr">                cancelText:</span> <span class="hljs-string">'取消'</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        computed:</span> <span class="hljs-string">{},</span>
        <span class="hljs-string">mounted</span> <span class="hljs-string">()</span> <span class="hljs-string">{</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        methods:</span> <span class="hljs-string">{</span>
            <span class="hljs-string">success</span> <span class="hljs-string">()</span> <span class="hljs-string">{</span>
                <span class="hljs-string">this.show</span> <span class="hljs-string">=</span> <span class="hljs-literal">false</span><span class="hljs-string">;</span>
            <span class="hljs-string">},</span>
            <span class="hljs-string">cancel</span> <span class="hljs-string">()</span> <span class="hljs-string">{</span>
                <span class="hljs-string">this.show</span> <span class="hljs-string">=</span> <span class="hljs-literal">false</span><span class="hljs-string">;</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">&lt;/script&gt;</span>
<span class="hljs-string">&lt;style</span> <span class="hljs-string">lang="scss"</span> <span class="hljs-string">scoped&gt;</span>
    <span class="hljs-string">.ec</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        background:</span> <span class="hljs-string">rgba(00,</span> <span class="hljs-number">00</span><span class="hljs-string">,</span> <span class="hljs-number">00</span><span class="hljs-string">,</span> <span class="hljs-number">.5</span><span class="hljs-string">);</span>
<span class="hljs-attr">        position:</span> <span class="hljs-string">fixed;</span>
<span class="hljs-attr">        left:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">        top:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">        width:</span> <span class="hljs-number">100</span><span class="hljs-string">%;</span>
<span class="hljs-attr">        height:</span> <span class="hljs-number">100</span><span class="hljs-string">%;</span>
<span class="hljs-attr">        z-index:</span> <span class="hljs-number">9999</span><span class="hljs-string">;</span>
        <span class="hljs-string">.ec-box</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            width:</span> <span class="hljs-number">80</span><span class="hljs-string">%;</span>
<span class="hljs-attr">            max-width:</span> <span class="hljs-number">400</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            top:</span> <span class="hljs-number">200</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            position:</span> <span class="hljs-string">absolute;</span>
<span class="hljs-attr">            left:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            right:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            margin:</span> <span class="hljs-string">auto;</span>
<span class="hljs-attr">            background:</span> <span class="hljs-comment">#fff;</span>
<span class="hljs-attr">            box-sizing:</span> <span class="hljs-string">border-box;</span>
<span class="hljs-attr">            padding:</span> <span class="hljs-number">20</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            border-radius:</span> <span class="hljs-number">6</span><span class="hljs-string">px;</span>

        <span class="hljs-string">}</span>
        <span class="hljs-string">.ec-title</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            padding-left:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            margin-bottom:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            font-size:</span> <span class="hljs-number">16</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            font-weight:</span> <span class="hljs-number">700</span><span class="hljs-string">;</span>
<span class="hljs-attr">            height:</span> <span class="hljs-number">18</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            color:</span> <span class="hljs-comment">#333;</span>
        <span class="hljs-string">}</span>
        <span class="hljs-string">.ec-content</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            padding:</span> <span class="hljs-number">14</span><span class="hljs-string">px</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            line-height:</span> <span class="hljs-number">24</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            color:</span> <span class="hljs-comment">#48576a;</span>
<span class="hljs-attr">            font-size:</span> <span class="hljs-number">14</span><span class="hljs-string">px;</span>
        <span class="hljs-string">}</span>
        <span class="hljs-string">.ec-box-buttons</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            text-align:</span> <span class="hljs-string">right;</span>
        <span class="hljs-string">}</span>
        <span class="hljs-string">.ec-btn-success</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            background:</span> <span class="hljs-comment">#20a0ff;</span>
<span class="hljs-attr">            border-color:</span> <span class="hljs-comment">#20a0ff;</span>
<span class="hljs-attr">            display:</span> <span class="hljs-string">inline-block;</span>
<span class="hljs-attr">            line-height:</span> <span class="hljs-number">1</span><span class="hljs-string">;</span>
<span class="hljs-attr">            white-space:</span> <span class="hljs-string">nowrap;</span>
<span class="hljs-attr">            cursor:</span> <span class="hljs-string">pointer;</span>
<span class="hljs-attr">            color:</span> <span class="hljs-comment">#fff;</span>
<span class="hljs-attr">            margin:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            padding:</span> <span class="hljs-number">10</span><span class="hljs-string">px</span> <span class="hljs-number">15</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            border-radius:</span> <span class="hljs-number">4</span><span class="hljs-string">px;</span>
        <span class="hljs-string">}</span>
        <span class="hljs-string">.ec-btn-cancel</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            display:</span> <span class="hljs-string">inline-block;</span>
<span class="hljs-attr">            line-height:</span> <span class="hljs-number">1</span><span class="hljs-string">;</span>
<span class="hljs-attr">            white-space:</span> <span class="hljs-string">nowrap;</span>
<span class="hljs-attr">            cursor:</span> <span class="hljs-string">pointer;</span>
<span class="hljs-attr">            background:</span> <span class="hljs-comment">#fff;</span>
<span class="hljs-attr">            border:</span> <span class="hljs-number">1</span><span class="hljs-string">px</span> <span class="hljs-string">solid</span> <span class="hljs-comment">#c4c4c4;</span>
<span class="hljs-attr">            color:</span> <span class="hljs-comment">#1f2d3d;</span>
<span class="hljs-attr">            margin:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
<span class="hljs-attr">            padding:</span> <span class="hljs-number">10</span><span class="hljs-string">px</span> <span class="hljs-number">15</span><span class="hljs-string">px;</span>
<span class="hljs-attr">            border-radius:</span> <span class="hljs-number">4</span><span class="hljs-string">px;</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
    <span class="hljs-string">.ec-enter</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        opacity:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
        <span class="hljs-string">.ec-box</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            transform:</span><span class="hljs-string">scale(0);</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>

    <span class="hljs-string">.ec-enter-active</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        transition:</span> <span class="hljs-string">opacity</span> <span class="hljs-number">.4</span><span class="hljs-string">s;</span>
        <span class="hljs-string">.ec-box</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            transition:</span> <span class="hljs-string">transform</span> <span class="hljs-number">.4</span><span class="hljs-string">s;</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
    <span class="hljs-string">.ec-leave-active{</span>
<span class="hljs-attr">        transition:</span> <span class="hljs-string">opacity</span> <span class="hljs-number">.2</span><span class="hljs-string">s;</span>
        <span class="hljs-string">.ec-box</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            transition:</span> <span class="hljs-string">transform</span> <span class="hljs-number">.2</span><span class="hljs-string">s;</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
    <span class="hljs-string">.ec-leave-active</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        opacity:</span> <span class="hljs-number">0</span><span class="hljs-string">;</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">&lt;/style&gt;</span>
</code></pre>
<p>然后就是<code>comfirm/index.js</code>(也是基本拷贝的，我就截图，告诉大家改哪里吧，这个得稍微细看才知道改哪里)</p>
<p><span class="img-wrap"><img data-src="/img/bVUTmc?w=644&amp;h=871" src="https://static.alili.tech/img/bVUTmc?w=644&amp;h=871" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVUTmz?w=513&amp;h=526" src="https://static.alili.tech/img/bVUTmz?w=513&amp;h=526" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后<code>components/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import comfirm from './comfirm/index.js'
import alert from './alert/index.js'

const install = function(Vue) {
    //注册全局组件
    Vue.component(comfirm.name, comfirm)
    Vue.component(alert.name, alert)
    //添加全局API
    Vue.prototype.$confirm = comfirm
    Vue.prototype.$alert = alert
}
export default install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> comfirm <span class="hljs-keyword">from</span> <span class="hljs-string">'./comfirm/index.js'</span>
<span class="hljs-keyword">import</span> alert <span class="hljs-keyword">from</span> <span class="hljs-string">'./alert/index.js'</span>

<span class="hljs-keyword">const</span> install = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>) </span>{
    <span class="hljs-comment">//注册全局组件</span>
    Vue.component(comfirm.name, comfirm)
    Vue.component(alert.name, alert)
    <span class="hljs-comment">//添加全局API</span>
    Vue.prototype.$confirm = comfirm
    Vue.prototype.$alert = alert
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> install</code></pre>
<p>最后在入口文件，<code>index.js</code>使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./index.html&quot;);
//引入sass
require(&quot;./src/sass/com.scss&quot;);
import Vue from 'vue'
import dialog from './src/js/components/index';
Vue.use(dialog)
let App = new Vue({
    el: '#app',
    data(){
        return {
            'name': 'index'
        }
    },
    mounted(){
        this.$confirm({
            title:'提示',
            content:'这里是提示内容',
            submitText:'提交',
            cancelText:'返回'
        }).then(()=>{
            this.$alert({
                title:'提示2',
                content:'这里是提示内容2'
            }).then(()=>{
                this.name='守候'
                alert(this.name)
            })
        }).catch((err)=>{
            alert(err)
        })
    }
}); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">"./index.html"</span>);
<span class="hljs-regexp">//</span>引入sass
<span class="hljs-built_in">require</span>(<span class="hljs-string">"./src/sass/com.scss"</span>);
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> dialog <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/js/components/index'</span>;
Vue.use(dialog)
let App = <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-string">'name'</span>: <span class="hljs-string">'index'</span>
        }
    },
    mounted(){
        <span class="hljs-keyword">this</span>.$confirm({
            title:<span class="hljs-string">'提示'</span>,
            content:<span class="hljs-string">'这里是提示内容'</span>,
            submitText:<span class="hljs-string">'提交'</span>,
            cancelText:<span class="hljs-string">'返回'</span>
        }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-keyword">this</span>.$alert({
                title:<span class="hljs-string">'提示2'</span>,
                content:<span class="hljs-string">'这里是提示内容2'</span>
            }).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                <span class="hljs-keyword">this</span>.name=<span class="hljs-string">'守候'</span>
                alert(<span class="hljs-keyword">this</span>.name)
            })
        }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(err)</span>=&gt;</span>{
            alert(err)
        })
    }
}); 
</code></pre>
<p>运行结果，就是这样</p>
<p><span class="img-wrap"><img data-src="/img/bVUTpD?w=1097&amp;h=861" src="https://static.alili.tech/img/bVUTpD?w=1097&amp;h=861" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">5.小结</h2>
<p>一个简单的弹窗就到这里了，很简单，但是在我开发那里还是能用，能暂时满足。但是这个肯定是需要维护的，毕竟很多的项目都需要弹窗。大家也根据自己的需要进行拓展！以上的案例也很简单，容易懂。基本都是记流程。但是这个我很建议大家边动手，边看文章。这个可以让自己练习下基于vue开发插件，是一个不错的练习，希望能帮到大家学习到新的知识！最后，如果觉得文章那里写的不好或者写错了，欢迎指出！      </p>
<p>-------------------------华丽的分割线--------------------<br>想了解更多，关注关注我的微信公众号：守候书阁</p>
<p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue插件开发练习--实用弹窗

## 原文链接
[https://segmentfault.com/a/1190000011148159](https://segmentfault.com/a/1190000011148159)

