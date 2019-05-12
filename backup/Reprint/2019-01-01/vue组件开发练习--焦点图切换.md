---
title: 'vue组件开发练习--焦点图切换' 
date: 2019-01-01 2:30:07
hidden: true
slug: b233ycx93nl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>vue用了有一段时间了，开发的后台管理系统也趋于完善，现在时间比较算是有点空闲吧！这个空闲时间我在研究vue的另外的一些玩法，比如组件，插件等。今天，我就分享一个组件的练手项目--焦点图切换组件。这个项目是我用于vue组件练习的一个项目，当然了，代码也会提交到github（<a href="https://github.com/chenhuiYj/ec-slider" rel="nofollow noreferrer" target="_blank">ec-slider</a>），有空也会维护。我也想我开发的东西好用一点！现在，就是建议有需要的伙伴，可以来玩下这个项目，当练习的作用！另外，如果大家有什么建议，欢迎指点！</p>
<blockquote>
<strong>建议</strong><br><strong> 1.下面的步骤，最好在自己本地上跑起来，根据文章的步骤，逐步完成，如果只看代码，很容易懵逼的。 </strong><br><strong>2.如果不清楚哪个代码有什么作用，可能自己调试下，把代码去掉后，看下有什么影响，就很容易想出代码有什么作用了！ </strong>
</blockquote>
<h2 id="articleHeader1">2.项目目录</h2>
<p><span class="img-wrap"><img data-src="/img/bVUOQG?w=636&amp;h=608" src="https://static.alili.tech/img/bVUOQG?w=636&amp;h=608" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>很普通，很好理解的一个目录，但还是简单的解释一下吧</p>
<p><code>node_modules</code>:文件依赖模块（自动生成）<br><code>dist</code>:打包文件产出目录（自动生成）<br><code>src</code>:开发文件目录<br><code>src/components</code>:组件文件目录<br><code>.babelrc</code>:babel编译es6的配置文件<br><code>.gitnore</code>:不提交到git的文件（目录）的配置文件<br><code>fontSize</code>:设置rem算法的文件（现在没用到，忽略）<br><code>index.html</code>：模板文件<br><code>index.js</code>:入口文件<br><code>package.json</code>:配置文件<br><code>README.md</code>:说明文档<br><code>webpack.config.babel.js</code>:webpack配置文件</p>
<h2 id="articleHeader2">3.步骤详解</h2>
<h3 id="articleHeader3">3-1跑起来</h3>
<p>这是项目的第一步（项目搭建这个，我不多说，之前的文章已经说了几次了！），现在<code>src/components/ec-slider.vue</code>这里输出一个‘守候’<br>1.首先，在<code>src/components/ec-slider.vue</code>里面输出‘守候’，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        守候
    </div>
</template>
<script type=&quot;text/javascript&quot;>
    export default {
        data () {
            return {

            }
        },
        computed: {

        },
        mounted(){

        },
        props: [],
        methods: {

        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        守候
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
        data () {
            return {

            }</span><span class="xml"><span class="undefined">
        },
        computed: </span></span><span class="hljs-template-variable">{

        }</span><span class="xml"><span class="undefined">,
        mounted()</span></span><span class="hljs-template-variable">{

        }</span><span class="xml"><span class="undefined">,
        props: [],
        methods: </span></span><span class="hljs-template-variable">{

        }</span><span class="xml"><span class="undefined">
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>2.然后，在<code>src/components/index.js</code>里面设置注册组件（要带一个install方法），代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import SlideImg from './ec-slider.vue'
const ecslide={
    install:function (Vue) {
        Vue.component('ec-slide',SlideImg)
    }
}
export default ecslide;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> SlideImg <span class="hljs-keyword">from</span> <span class="hljs-string">'./ec-slider.vue'</span>
<span class="hljs-keyword">const</span> ecslide={
    <span class="hljs-attr">install</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue</span>) </span>{
        Vue.component(<span class="hljs-string">'ec-slide'</span>,SlideImg)
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ecslide;</code></pre>
<p>3.在入口文件，index.js里面引入并且使用组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./index.html&quot;);
require(&quot;./src/sass/index.scss&quot;);
import Vue from 'vue'
//引入并且使用组件
import ecslide from './src/js/components/index';
Vue.use(ecslide);
let app6 = new Vue({
    el: &quot;#app6&quot;,
    data: {

    },
    mounted(){
        
    }

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">"./index.html"</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">"./src/sass/index.scss"</span>);
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-comment">//引入并且使用组件</span>
<span class="hljs-keyword">import</span> ecslide <span class="hljs-keyword">from</span> <span class="hljs-string">'./src/js/components/index'</span>;
Vue.use(ecslide);
<span class="hljs-keyword">let</span> app6 = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">"#app6"</span>,
    <span class="hljs-attr">data</span>: {

    },
    mounted(){
        
    }

});</code></pre>
<p>4.在index.html（模板文件），输出组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no&quot;>
        <title>Title</title>
    </head>
    <body>
    <div id=&quot;app6&quot;>
        <ec-slide></ec-slide>
    </div>
    </body>
</html>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app6"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ec-slide</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ec-slide</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>  </code></pre>
<p>5.命令行输入<code>$ npm run dev</code>跑起来，结果完美！这几步的原理貌似没什么可多说的，都是固定式的步骤。</p>
<p><span class="img-wrap"><img data-src="/img/bVUQUn?w=839&amp;h=342" src="https://static.alili.tech/img/bVUQUn?w=839&amp;h=342" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">3-2开发准备</h3>
<p>经过上一步之后，基础就已经打好了，那么接下来就是一个开发的过程，大部分都是修改<code>src/components/ec-slider.vue</code>这个文件。<br>开发之前，大家不要急着写代码，先分析下当中的运行流程！<br>首先，一个焦点图切换，需要什么参数？根据下面的一个淘宝栗子，我简单分析下，就是下面这几个！<br><span class="img-wrap"><img data-src="/img/bVUQZh?w=509&amp;h=293" src="https://static.alili.tech/img/bVUQZh?w=509&amp;h=293" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><code>list</code>-图片列表[{src:'url',href:'<a href="https://www.baidu.com" rel="nofollow noreferrer" target="_blank">https://www.baidu.com</a>'},{src:'url',href:'<a href="http://www.163.com" rel="nofollow noreferrer" target="_blank">http://www.163.com</a>'}]（src:图片的src，href:跳转连接，点击图片的时候）<br><code>autoplay</code>-是否自动播放 布尔 （默认false）<br><code>type</code>-轮播方式‘transparent’（透明度切换）， 'slide'（滑动切换） （默认slide）<br><code>option</code>-对应切换 （默认false，不显示）<br><code>time</code>-轮播间隔时间，毫秒 （默认4000）<br><code>sildetype</code>-过渡效果 （默认'ease'慢速开始，然后变快，然后慢速结束的过渡效果,参考：<a href="http://www.w3school.com.cn/cssref/pr_transition-timing-function.asp" rel="nofollow noreferrer" target="_blank">transition-timing-function</a>）<br><code>arrowurl</code>-箭头图片链接<br><code>arrowsize</code>-箭头尺寸‘width,height’<br><code>direction</code>-切换方向'left'（左右） 'top'（上下） （默认：左右）</p>
<p>分析完了之后，就知道暂时需要这么多参数，那么接下来就是在<code>ec-slider.vue</code>里面，接收这些参数。父子组件传参方式，我想大家知道--<code>props</code>。代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        守候
    </div>
</template>
<script type=&quot;text/javascript&quot;>
    export default {
        data () {
            return {

            }
        },
        computed: {

        },
        mounted(){

        },
        props: ['list', 'autoplay', 'type', 'time', 'sildetype', 'arrowurl','arrowsize','option','direction'],
        methods: {

        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        守候
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
        data () {
            return {

            }</span><span class="xml"><span class="undefined">
        },
        computed: </span></span><span class="hljs-template-variable">{

        }</span><span class="xml"><span class="undefined">,
        mounted()</span></span><span class="hljs-template-variable">{

        }</span><span class="xml"><span class="actionscript">,
        props: [<span class="hljs-string">'list'</span>, <span class="hljs-string">'autoplay'</span>, <span class="hljs-string">'type'</span>, <span class="hljs-string">'time'</span>, <span class="hljs-string">'sildetype'</span>, <span class="hljs-string">'arrowurl'</span>,<span class="hljs-string">'arrowsize'</span>,<span class="hljs-string">'option'</span>,<span class="hljs-string">'direction'</span>],
        methods: </span></span><span class="hljs-template-variable">{

        }</span><span class="xml"><span class="undefined">
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>有地方接收参数，肯定要有地方传参数，就是<code>index.html</code>模板文件里面传</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;slider-left&quot;>
    <ec-slide :list='list' :autoplay=&quot;true&quot; :type=&quot;'slide'&quot; :option=&quot;true&quot; :time=&quot;4000&quot; :sildetype=&quot;'ease'&quot; :arrowurl=&quot;'http://i1.buimg.com/1949/4d860a3067fab23b.jpg'&quot; :arrowsize=&quot;'20,40'&quot; :direction=&quot;'left'&quot;></ec-slide>
</div>    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;div class=<span class="hljs-string">"slider-left"</span>&gt;
    &lt;ec-slide <span class="hljs-symbol">:list=<span class="hljs-string">'list'</span></span> <span class="hljs-symbol">:autoplay=<span class="hljs-string">"true"</span></span> <span class="hljs-symbol">:type=<span class="hljs-string">"'slide'"</span></span> <span class="hljs-symbol">:option=<span class="hljs-string">"true"</span></span> <span class="hljs-symbol">:time=<span class="hljs-string">"4000"</span></span> <span class="hljs-symbol">:sildetype=<span class="hljs-string">"'ease'"</span></span> <span class="hljs-symbol">:arrowurl=<span class="hljs-string">"'http://i1.buimg.com/1949/4d860a3067fab23b.jpg'"</span></span> <span class="hljs-symbol">:arrowsize=<span class="hljs-string">"'20,40'"</span></span> <span class="hljs-symbol">:direction=<span class="hljs-string">"'left'"</span>&gt;&lt;/ec-slide&gt;</span>
&lt;<span class="hljs-regexp">/div&gt;    </span></code></pre>
<h3 id="articleHeader5">3-3样式布局</h3>
<p>既然知道了，会接收什么参数，那下面先把样式布局，给弄好先，这个不多说，代码如下！（有些解释我也是直接打到代码上）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;switch-img-box&quot; id=&quot;ec-slide-box&quot;>
        <div class=&quot;switch-img-type switch-img-left&quot;>
            <ul :style=&quot;{'width':ulWidth,'transition-timing-function':slideChange}&quot;>
                <li v-for=&quot;(li,index) in list&quot; :style=&quot;{'width':listWidth+'%'}&quot;>
                    <a :href=&quot;li.href?li.href:'javascript:;'&quot;>
                        <img :src=&quot;li.src&quot; class=&quot;slider-img&quot;/>
                    </a>
                </li>
            </ul>
        </div>
        <!--如果需要显示对应的点-->
        <div class=&quot;switch-option&quot; v-if=&quot;option&quot;>
            <div>
                <span v-for=&quot;(li,index) in list&quot;></span>
            </div>
        </div>
        <!--如果需要显示箭头-->
        <div class=&quot;switch-arrow&quot; v-if=&quot;arrowurl&amp;&amp;arrowsize&quot;>
            <div :class=&quot;{'arrow-left':direction==='left','arrow-top':direction==='top'}&quot;
                 :style=&quot;{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}&quot;></div>
            <div :class=&quot;{'arrow-right':direction==='left','arrow-bottom':direction==='top'}&quot;
                 :style=&quot;{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}&quot;></div>
        </div>
    </div>
</template>
<script type=&quot;text/javascript&quot;>
    export default {
        data () {
            return {
                slideChange: '',
                arrowWidth: '',
                arrowHeight: '',
            }
        },
        computed: {
            //ul宽度
            ulWidth: function () {
                return (this.list.length) + &quot;00%&quot;;

            },
            //li宽度
            listWidth: function () {
                return 100 / (this.list.length)
            }
        },
        mounted(){
            //设置各个数据初始值
            this.slideChange = this.sildetype || 'ease';
            if (this.arrowsize &amp;&amp; this.arrowurl) {
                this.arrowWidth = this.arrowsize.split(',')[0];
                this.arrowHeight = this.arrowsize.split(',')[1];
            }
        },
        props: ['list', 'autoplay', 'type', 'time', 'sildetype', 'arrowurl', 'arrowsize', 'option', 'direction'],
        methods: {
        }
    }
</script>
<style lang=&quot;scss&quot;>
    .ec-slide-img-box {
        width: 100%;
        height: 100%;
        position: relative;
        touch-action: none;
    }

    .ec-slide-img-type {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        &amp;.ec-slide-img-top {
        }
        &amp;.ec-slide-img-left {
            li {
                display: inline-block;
                font-size: 0;
            }
        }
        &amp;.ec-slide-img-transparent {
            li {
                opacity: 0;
                transition: opacity 1s;
                width: 0;
                &amp;.cur {
                    width: auto;
                }
                &amp;.show {
                    opacity: 1;
                }
            }
        }
        ul {
            font-size: 0;
            &amp;.tran {
                transition: all .4s;
            }
            li {
                text-align: center;
            }

            img {
                vertical-align: middle;
                max-width: 100%;
                max-height: 100%;
            }
        }
    }

    .ec-slide-arrow {
        div {
            position: absolute;
            z-index: 2;
            margin: auto;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            opacity: .5;
            &amp;:hover {
                opacity: 1;
            }
            &amp;.arrow-left {
                left: 10px;
                right: auto;
            }
            &amp;.arrow-right {
                right: 10px;
                left: auto;
                transform: rotate(180deg);
            }
            &amp;.arrow-top {
                top: 10px;
                bottom: auto;
            }
            &amp;.arrow-bottom {
                bottom: 10px;
                top: auto;
                transform: rotate(180deg);
            }
        }
    }

    .ec-slide-option {
        position: absolute;
        font-size: 0;
        bottom: 10px;
        text-align: center;
        width: 100%;
        z-index: 5;
        &amp;.isFirst {
            span:first-child {
                display: none;
            }
        }
        &amp;.isLast {
            span:last-child {
                display: none;
            }
        }
        span {
            border-radius: 100%;
            margin: 0 5px;
            background: #fff;
            display: inline-block;
            width: 10px;
            height: 10px;
            &amp;.active {
                background: #09f;
            }
        }
        &amp;.ec-slide-option-top {
            display: table;
            width: 10px;
            height: 100%;
            top: 0;
            right: 10px;
            margin: auto;
            bottom: 0;
            span {
                margin: 5px 0;
            }
            div {
                display: table-cell;
                vertical-align: middle;
            }
        }
    }
</style> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch-img-box"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ec-slide-box"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch-img-type switch-img-left"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'width':ulWidth,'transition-timing-function':slideChange}"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(li,index) in list"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'width':listWidth+'%'}"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"li.href?li.href:'javascript:;'"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"li.src"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-img"</span>/&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!--如果需要显示对应的点--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch-option"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"option"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(li,index) in list"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!--如果需要显示箭头--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch-arrow"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"arrowurl&amp;&amp;arrowsize"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'arrow-left':direction==='left','arrow-top':direction==='top'}"</span>
                 <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'arrow-right':direction==='left','arrow-bottom':direction==='top'}"</span>
                 <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">slideChange</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attr">arrowWidth</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attr">arrowHeight</span>: <span class="hljs-string">''</span>,
            }
        },
        <span class="hljs-attr">computed</span>: {
            <span class="hljs-comment">//ul宽度</span>
            ulWidth: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.list.length) + <span class="hljs-string">"00%"</span>;

            },
            <span class="hljs-comment">//li宽度</span>
            listWidth: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-number">100</span> / (<span class="hljs-keyword">this</span>.list.length)
            }
        },
        mounted(){
            <span class="hljs-comment">//设置各个数据初始值</span>
            <span class="hljs-keyword">this</span>.slideChange = <span class="hljs-keyword">this</span>.sildetype || <span class="hljs-string">'ease'</span>;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.arrowsize &amp;&amp; <span class="hljs-keyword">this</span>.arrowurl) {
                <span class="hljs-keyword">this</span>.arrowWidth = <span class="hljs-keyword">this</span>.arrowsize.split(<span class="hljs-string">','</span>)[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">this</span>.arrowHeight = <span class="hljs-keyword">this</span>.arrowsize.split(<span class="hljs-string">','</span>)[<span class="hljs-number">1</span>];
            }
        },
        <span class="hljs-attr">props</span>: [<span class="hljs-string">'list'</span>, <span class="hljs-string">'autoplay'</span>, <span class="hljs-string">'type'</span>, <span class="hljs-string">'time'</span>, <span class="hljs-string">'sildetype'</span>, <span class="hljs-string">'arrowurl'</span>, <span class="hljs-string">'arrowsize'</span>, <span class="hljs-string">'option'</span>, <span class="hljs-string">'direction'</span>],
        <span class="hljs-attr">methods</span>: {
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="undefined">
    .ec-slide-img-box {
        width: 100%;
        height: 100%;
        position: relative;
        touch-action: none;
    }

    .ec-slide-img-type {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        &amp;.ec-slide-img-top {
        }
        &amp;.ec-slide-img-left {
            li {
                display: inline-block;
                font-size: 0;
            }
        }
        &amp;.ec-slide-img-transparent {
            li {
                opacity: 0;
                transition: opacity 1s;
                width: 0;
                &amp;.cur {
                    width: auto;
                }
                &amp;.show {
                    opacity: 1;
                }
            }
        }
        ul {
            font-size: 0;
            &amp;.tran {
                transition: all .4s;
            }
            li {
                text-align: center;
            }

            img {
                vertical-align: middle;
                max-width: 100%;
                max-height: 100%;
            }
        }
    }

    .ec-slide-arrow {
        div {
            position: absolute;
            z-index: 2;
            margin: auto;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            opacity: .5;
            &amp;:hover {
                opacity: 1;
            }
            &amp;.arrow-left {
                left: 10px;
                right: auto;
            }
            &amp;.arrow-right {
                right: 10px;
                left: auto;
                transform: rotate(180deg);
            }
            &amp;.arrow-top {
                top: 10px;
                bottom: auto;
            }
            &amp;.arrow-bottom {
                bottom: 10px;
                top: auto;
                transform: rotate(180deg);
            }
        }
    }

    .ec-slide-option {
        position: absolute;
        font-size: 0;
        bottom: 10px;
        text-align: center;
        width: 100%;
        z-index: 5;
        &amp;.isFirst {
            span:first-child {
                display: none;
            }
        }
        &amp;.isLast {
            span:last-child {
                display: none;
            }
        }
        span {
            border-radius: 100%;
            margin: 0 5px;
            background: #fff;
            display: inline-block;
            width: 10px;
            height: 10px;
            &amp;.active {
                background: #09f;
            }
        }
        &amp;.ec-slide-option-top {
            display: table;
            width: 10px;
            height: 100%;
            top: 0;
            right: 10px;
            margin: auto;
            bottom: 0;
            span {
                margin: 5px 0;
            }
            div {
                display: table-cell;
                vertical-align: middle;
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span> 
</code></pre>
<p>运行结果，就是下面这样</p>
<p><span class="img-wrap"><img data-src="/img/bVURy9?w=408&amp;h=205" src="https://static.alili.tech/img/bVURy9?w=408&amp;h=205" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">3-4执行动画</h3>
<p>布局搞定了，下面就可以写动画，让轮播动起来！这里也需要增加几个变量，一个是nowIndex,记录当前索引。一个是timer定时器！<br>首先，我用<code>transform:translate3d()</code>这个方式控制<code>ul</code>的滑动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul :style=&quot;{'width':ulWidth,'transform':'translate3d(-'+(listWidth*(nowIndex))+'%,0,0)','transition-timing-function':slideChange,'transition': 'all .4s'}&quot;>
    <li v-for=&quot;(li,index) in list&quot; :style=&quot;{'width':listWidth+'%'}&quot;>
        <a :href=&quot;li.href?li.href:'javascript:;'&quot;>
            <img :src=&quot;li.src&quot; class=&quot;slider-img&quot;/>
        </a>
    </li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>&lt;ul :style=<span class="hljs-string">"{'</span>width':ulWidth,<span class="hljs-string">'transform'</span>:<span class="hljs-string">'translate3d(-'</span>+(listWidth*(nowIndex))+<span class="hljs-string">'%,0,0)'</span>,<span class="hljs-string">'transition-timing-function'</span>:slideChange,<span class="hljs-string">'transition'</span>: <span class="hljs-string">'all .4s'</span>}<span class="hljs-string">"&gt;
    &lt;li v-for="</span>(li,index) in <span class="hljs-built_in">list</span><span class="hljs-string">" :style="</span>{<span class="hljs-string">'width'</span>:listWidth+<span class="hljs-string">'%'</span>}<span class="hljs-string">"&gt;
        &lt;a :href="</span>li.href?li.href:<span class="hljs-string">'javascript:;'</span><span class="hljs-string">"&gt;
            &lt;img :src="</span>li.src<span class="hljs-string">" class="</span>slider-img<span class="hljs-string">"/&gt;
        &lt;/a&gt;
    &lt;/li&gt;
&lt;/ul&gt;</span></code></pre>
<p>然后，根据nowIndex，设置对应点的class。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;switch-option&quot; v-if=&quot;option&quot;>
    <div>
        <!--如果当前索引index等于nowIndex。则添加active这个class，点就会变成蓝色-->
        <span v-for=&quot;(li,index) in list&quot; :class=&quot;{'active':index===nowIndex}&quot;></span>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"switch-option"</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"option"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!--如果当前索引index等于nowIndex。则添加active这个class，点就会变成蓝色--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(li,index) in list"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'active':index===nowIndex}"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>js代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    export default {
        data () {
            return {
                nowIndex: 0,
                timer: null,
                slideChange: '',
                arrowWidth: '',
                arrowHeight: '',
            }
        },
        computed: {
            //ul宽度
            ulWidth: function () {
                return (this.list.length) + &quot;00%&quot;;

            },
            //li宽度
            listWidth: function () {
                return 100 / (this.list.length)
            }
        },
        mounted(){
            //是否自动播放
            if (this.autoplay) {
                this.autoSwitch();
            }
            //设置初始值
            this.slideChange = this.sildetype || 'ease';
            if (this.arrowsize &amp;&amp; this.arrowurl) {
                this.arrowWidth = this.arrowsize.split(',')[0];
                this.arrowHeight = this.arrowsize.split(',')[1];
            }
        },
        props: ['list', 'autoplay', 'type', 'time', 'sildetype', 'arrowurl', 'arrowsize', 'option', 'direction'],
        methods: {
            //滑动操作
            switchDo(reduce){
                clearInterval(this.timer);
                //根据reduce判断this.nowIndex的增加或者减少！
                //如果是减少模式reduce=‘reduce’
                if (reduce === 'reduce') {
                    //如果nowIndex等于0，已经是第一个了，就回到最后一个
                    if (this.nowIndex === 0) {
                        this.nowIndex = this.list.length - 1;
                    }
                    else {
                        this.nowIndex--;
                    }
                }
                //如果是增加模式reduce=undefined
                else {
                    //如果nowIndex等于this.list.length-1，已经是最后一个了，就回到第一个
                    if (this.nowIndex === this.list.length-1) {
                        this.nowIndex = 0;
                    }
                    else{
                        this.nowIndex++;
                    }
                }
                //如果需要自动播放
                if (this.autoplay) {
                    this.autoSwitch();
                }

            },
            //自动播放函数
            autoSwitch(){
                let time = this.time || 4000;
                this.timer = setInterval(() => {
                    this.switchDo();
                }, time);
            }
        }
    }
</script>    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;script type=<span class="hljs-string">"text/javascript"</span>&gt;
    export <span class="hljs-keyword">default</span> {
        <span class="hljs-keyword">data</span> () {
            <span class="hljs-keyword">return</span> {
                nowIndex: <span class="hljs-number">0</span>,
                timer: <span class="hljs-literal">null</span>,
                slideChange: <span class="hljs-string">''</span>,
                arrowWidth: <span class="hljs-string">''</span>,
                arrowHeight: <span class="hljs-string">''</span>,
            }
        },
        computed: {
            <span class="hljs-comment">//ul宽度</span>
            ulWidth: function () {
                <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.list.length) + <span class="hljs-string">"00%"</span>;

            },
            <span class="hljs-comment">//li宽度</span>
            listWidth: function () {
                <span class="hljs-keyword">return</span> <span class="hljs-number">100</span> / (<span class="hljs-keyword">this</span>.list.length)
            }
        },
        mounted(){
            <span class="hljs-comment">//是否自动播放</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.autoplay) {
                <span class="hljs-keyword">this</span>.autoSwitch();
            }
            <span class="hljs-comment">//设置初始值</span>
            <span class="hljs-keyword">this</span>.slideChange = <span class="hljs-keyword">this</span>.sildetype || <span class="hljs-string">'ease'</span>;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.arrowsize &amp;&amp; <span class="hljs-keyword">this</span>.arrowurl) {
                <span class="hljs-keyword">this</span>.arrowWidth = <span class="hljs-keyword">this</span>.arrowsize.split(<span class="hljs-string">','</span>)[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">this</span>.arrowHeight = <span class="hljs-keyword">this</span>.arrowsize.split(<span class="hljs-string">','</span>)[<span class="hljs-number">1</span>];
            }
        },
        props: [<span class="hljs-string">'list'</span>, <span class="hljs-string">'autoplay'</span>, <span class="hljs-string">'type'</span>, <span class="hljs-string">'time'</span>, <span class="hljs-string">'sildetype'</span>, <span class="hljs-string">'arrowurl'</span>, <span class="hljs-string">'arrowsize'</span>, <span class="hljs-string">'option'</span>, <span class="hljs-string">'direction'</span>],
        methods: {
            <span class="hljs-comment">//滑动操作</span>
            switchDo(reduce){
                clearInterval(<span class="hljs-keyword">this</span>.timer);
                <span class="hljs-comment">//根据reduce判断this.nowIndex的增加或者减少！</span>
                <span class="hljs-comment">//如果是减少模式reduce=‘reduce’</span>
                <span class="hljs-keyword">if</span> (reduce === <span class="hljs-string">'reduce'</span>) {
                    <span class="hljs-comment">//如果nowIndex等于0，已经是第一个了，就回到最后一个</span>
                    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.nowIndex === <span class="hljs-number">0</span>) {
                        <span class="hljs-keyword">this</span>.nowIndex = <span class="hljs-keyword">this</span>.list.length - <span class="hljs-number">1</span>;
                    }
                    <span class="hljs-keyword">else</span> {
                        <span class="hljs-keyword">this</span>.nowIndex--;
                    }
                }
                <span class="hljs-comment">//如果是增加模式reduce=undefined</span>
                <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">//如果nowIndex等于this.list.length-1，已经是最后一个了，就回到第一个</span>
                    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.nowIndex === <span class="hljs-keyword">this</span>.list.length<span class="hljs-number">-1</span>) {
                        <span class="hljs-keyword">this</span>.nowIndex = <span class="hljs-number">0</span>;
                    }
                    <span class="hljs-keyword">else</span>{
                        <span class="hljs-keyword">this</span>.nowIndex++;
                    }
                }
                <span class="hljs-comment">//如果需要自动播放</span>
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.autoplay) {
                    <span class="hljs-keyword">this</span>.autoSwitch();
                }

            },
            <span class="hljs-comment">//自动播放函数</span>
            autoSwitch(){
                let time = <span class="hljs-keyword">this</span>.time || <span class="hljs-number">4000</span>;
                <span class="hljs-keyword">this</span>.timer = setInterval(() =&gt; {
                    <span class="hljs-keyword">this</span>.switchDo();
                }, time);
            }
        }
    }
&lt;/script&gt;    </code></pre>
<p>到了这里，剩下的就只有点击两个箭头，执行相应动画，这个就相对简单，无非就是调用switchDo函数，唯一区别在于，点击左边的箭头，是减少模式，右边箭头的增加模式。代码如下，很好理解。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--判断是否需要显示箭头-->
<div class=&quot;switch-arrow&quot; v-if=&quot;arrowurl&amp;&amp;arrowsize&quot;>
    <div :class=&quot;{'arrow-left':direction==='left','arrow-top':direction==='top'}&quot;
         :style=&quot;{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}&quot; @click.stop=&quot;switchDo('reduce')&quot;></div>
    <div :class=&quot;{'arrow-right':direction==='left','arrow-bottom':direction==='top'}&quot;
         :style=&quot;{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}&quot; @click.stop=&quot;switchDo&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>&lt;!--判断是否需要显示箭头--&gt;
&lt;div class=<span class="hljs-string">"switch-arrow"</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"arrowurl&amp;&amp;arrowsize"</span>&gt;
    &lt;div :class=<span class="hljs-string">"{'</span>arrow-left':direction===<span class="hljs-string">'left'</span>,<span class="hljs-string">'arrow-top'</span>:direction===<span class="hljs-string">'top'</span>}<span class="hljs-string">"
         :style="</span>{<span class="hljs-string">'width'</span>:arrowWidth+<span class="hljs-string">'px'</span>,<span class="hljs-string">'height'</span>:arrowHeight+<span class="hljs-string">'px'</span>,<span class="hljs-string">'background'</span>:<span class="hljs-string">'url('</span>+arrowurl+<span class="hljs-string">') no-repeat'</span>,<span class="hljs-string">'background-size'</span>:<span class="hljs-string">'100%'</span>}<span class="hljs-string">" @click.stop="</span>switchDo(<span class="hljs-string">'reduce'</span>)<span class="hljs-string">"&gt;&lt;/div&gt;
    &lt;div :class="</span>{<span class="hljs-string">'arrow-right'</span>:direction===<span class="hljs-string">'left'</span>,<span class="hljs-string">'arrow-bottom'</span>:direction===<span class="hljs-string">'top'</span>}<span class="hljs-string">"
         :style="</span>{<span class="hljs-string">'width'</span>:arrowWidth+<span class="hljs-string">'px'</span>,<span class="hljs-string">'height'</span>:arrowHeight+<span class="hljs-string">'px'</span>,<span class="hljs-string">'background'</span>:<span class="hljs-string">'url('</span>+arrowurl+<span class="hljs-string">') no-repeat'</span>,<span class="hljs-string">'background-size'</span>:<span class="hljs-string">'100%'</span>}<span class="hljs-string">" @click.stop="</span>switchDo<span class="hljs-string">"&gt;&lt;/div&gt;
&lt;/div&gt;</span></code></pre>
<p>到了这里，对交互有强迫症的开发者就受不了了，到了最后一张，再点击右边箭头，就会出现下面的情况！</p>
<p><span class="img-wrap"><img data-src="/img/bVURVo?w=452&amp;h=227" src="https://static.alili.tech/img/bVURVo?w=452&amp;h=227" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>到了第一张，再点击左边箭头也是类似的情况，这样就很不好。理想情况是下面这样</p>
<p><span class="img-wrap"><img data-src="/img/bVURYg?w=557&amp;h=307" src="https://static.alili.tech/img/bVURYg?w=557&amp;h=307" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">3-5细节优化</h3>
<p>要想做上面的效果，改的地方会比较多，先说下原理吧，到了最后一张，这个时候，再点击右边箭头，像淘宝那样，回到第一张。到了第一张，再点击左边箭头类似效果回到最后一张。那么最后的布局是这样</p>
<p><span class="img-wrap"><img data-src="/img/bVUR7z?w=1200&amp;h=301" src="https://static.alili.tech/img/bVUR7z?w=1200&amp;h=301" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这样布局能实现效果，到了最后一张，这个时候，再点击右边箭头，像淘宝那样，回到第一张。就像下面</p>
<p><span class="img-wrap"><img data-src="/img/bVUR70?w=1162&amp;h=298" src="https://static.alili.tech/img/bVUR70?w=1162&amp;h=298" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这个时候，就需要多做一步，滚动到这里的时候，瞬间拉回去。而且这个拉回去，要把ul的过渡效果<code>transition</code>去掉，不然就会看到拉回去的过渡效果！同时要改变nowIndex。</p>
<p><span class="img-wrap"><img data-src="/img/bVUR9u?w=1201&amp;h=297" src="https://static.alili.tech/img/bVUR9u?w=1201&amp;h=297" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>1.首先，ul布局方面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;switch-img-type switch-img-left&quot; v-if=&quot;type==='slide'&amp;&amp;direction==='left'&quot;>
    <!--用tran这个class控制ul是否含有过渡效果，样式已经写好-->
    <ul :style=&quot;{'width':ulWidth,'transform':'translate3d(-'+(listWidth*(nowIndex+1))+'%,0,0)','transition-timing-function':slideChange}&quot;
        :class=&quot;{'tran':noLast}&quot;>
        <!--最后一张图片-->
        <li :style=&quot;{'width':listWidth+'%'}&quot;>
            <a :href=&quot;list[list.length-1].href?list[list.length-1].href:'javascript:;'&quot;>
                <img :src=&quot;list[list.length-1].src&quot; class=&quot;slider-img&quot;/>
            </a>
        </li>
        <!--遍历出来的图片-->
        <li v-for=&quot;(li,index) in list&quot; :style=&quot;{'width':listWidth+'%'}&quot;>
            <a :href=&quot;li.href?li.href:'javascript:;'&quot;>
                <img :src=&quot;li.src&quot; class=&quot;slider-img&quot;/>
            </a>
        </li>
        <!--第一张图片-->
        <li :style=&quot;{'width':listWidth+'%'}&quot;>
            <a :href=&quot;list[0].href?list[0].href:'javascript:;'&quot;>
                <img :src=&quot;list[0].src&quot; class=&quot;slider-img&quot;/>
            </a>
        </li>
    </ul>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch-img-type switch-img-left"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"type==='slide'&amp;&amp;direction==='left'"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--用tran这个class控制ul是否含有过渡效果，样式已经写好--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'width':ulWidth,'transform':'translate3d(-'+(listWidth*(nowIndex+1))+'%,0,0)','transition-timing-function':slideChange}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>
        <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'tran':noLast}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
        <span class="hljs-comment">&lt;!--最后一张图片--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'width':listWidth+'%'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"list[list.length-1].href?list[list.length-1].href:'javascript:;'"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"list[list.length-1].src"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-img"</span>/&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-comment">&lt;!--遍历出来的图片--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(li,index) in list"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'width':listWidth+'%'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"li.href?li.href:'javascript:;'"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"li.src"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-img"</span>/&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-comment">&lt;!--第一张图片--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'width':listWidth+'%'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"list[0].href?list[0].href:'javascript:;'"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"list[0].src"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-img"</span>/&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>2.然后，对应的点修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--isLast:隐藏最后一个span，isFirst隐藏第一个span-->
<div class=&quot;switch-option&quot; v-if=&quot;option&quot;
     :class=&quot;{'isLast':nowIndex===list.length, 'isFirst':nowIndex===-1,'switch-option-top':direction==='top'}&quot;>
    <div>
        <span class=&quot;active span1&quot; v-if=&quot;nowIndex===list.length&quot;></span>
        <span v-for=&quot;(li,index) in list&quot; :class=&quot;{'active':index===nowIndex}&quot;></span>
        <span class=&quot;active span2&quot; v-if=&quot;nowIndex===-1&quot;></span>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!--isLast:隐藏最后一个span，isFirst隐藏第一个span--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"switch-option"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"option"</span>
     <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'isLast':nowIndex===list.length, 'isFirst':nowIndex===-1,'switch-option-top':direction==='top'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active span1"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"nowIndex===list.length"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(li,index) in list"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{'active':index===nowIndex}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active span2"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"nowIndex===-1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>这个可能会有点绕，我解释下，比如滚动最后一张了，再点击右边箭头，向右滑动到第一张的时候，如下图</p>
<p><span class="img-wrap"><img data-src="/img/bVUSgY?w=703&amp;h=260" src="https://static.alili.tech/img/bVUSgY?w=703&amp;h=260" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这个时候又要把第一个点变成蓝色，但是对应点的索引和nowIndex对不上，这个时候用一个技巧。把第一个（.span1）点显示出来，然后把最后一个点隐藏。这样还是用户看到还是看到4个点在屏幕！等动画执行完了，拉回去第一张的时候。把.span1隐藏，正常显示对应的点！这个大家细想一下就知道了。到了第一张，再点击左边箭头类似效果回到最后一张也是相同的处理方式！</p>
<p><span class="img-wrap"><img data-src="/img/bVUSfM?w=450&amp;h=172" src="https://static.alili.tech/img/bVUSfM?w=450&amp;h=172" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>到这里，功能就基本完成了，下面给出这部分代码！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;ec-slide-img-box&quot; id=&quot;ec-slide-box&quot;>
        <div class=&quot;ec-slide-img-type ec-slide-img-left&quot; v-if=&quot;type==='slide'&amp;&amp;direction==='left'&quot;>
            <!--用tran这个class控制ul是否含有过渡效果，样式已经写好-->
            <ul :style=&quot;{'width':ulWidth,'transform':'translate3d(-'+(listWidth*(nowIndex+1))+'%,0,0)','transition-timing-function':slideChange}&quot;
                :class=&quot;{'tran':noLast}&quot;>
                <!--最后一张图片-->
                <li :style=&quot;{'width':listWidth+'%'}&quot;>
                    <a :href=&quot;list[list.length-1].href?list[list.length-1].href:'javascript:;'&quot;>
                        <img :src=&quot;list[list.length-1].src&quot; class=&quot;slider-img&quot;/>
                    </a>
                </li>
                <!--遍历出来的图片-->
                <li v-for=&quot;(li,index) in list&quot; :style=&quot;{'width':listWidth+'%'}&quot;>
                    <a :href=&quot;li.href?li.href:'javascript:;'&quot;>
                        <img :src=&quot;li.src&quot; class=&quot;slider-img&quot;/>
                    </a>
                </li>
                <!--第一张图片-->
                <li :style=&quot;{'width':listWidth+'%'}&quot;>
                    <a :href=&quot;list[0].href?list[0].href:'javascript:;'&quot;>
                        <img :src=&quot;list[0].src&quot; class=&quot;slider-img&quot;/>
                    </a>
                </li>
            </ul>
        </div>
        <!--isLast:隐藏最后一个span，isFirst隐藏第一个span-->
        <div class=&quot;ec-slide-option&quot; v-if=&quot;option&quot;
             :class=&quot;{'isLast':nowIndex===list.length, 'isFirst':nowIndex===-1,'ec-slide-option-top':direction==='top'}&quot;>
            <div>
                <span class=&quot;active&quot; v-if=&quot;nowIndex===list.length&quot;></span>
                <span v-for=&quot;(li,index) in list&quot; :class=&quot;{'active':index===nowIndex}&quot;></span>
                <span class=&quot;active&quot; v-if=&quot;nowIndex===-1&quot;></span>
            </div>
        </div>
        <div class=&quot;ec-slide-arrow&quot; v-if=&quot;arrowurl&amp;&amp;arrowsize&quot;>
            <div :class=&quot;{'arrow-left':direction==='left','arrow-top':direction==='top'}&quot;
                 :style=&quot;{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}&quot;
                 @click.stop=&quot;switchDo('reduce')&quot;></div>
            <div :class=&quot;{'arrow-right':direction==='left','arrow-bottom':direction==='top'}&quot;
                 :style=&quot;{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}&quot;
                 @click.stop=&quot;switchDo&quot;></div>
        </div>
    </div>
</template>
<script type=&quot;text/javascript&quot;>
    export default {
        data () {
            return {
                nowIndex: 0,
                noLast: true,
                timer: null,
                slideChange: '',
                arrowWidth: '',
                arrowHeight: ''
            }
        },
        computed: {
            ulWidth: function () {
                return (this.list.length + 2) + &quot;00%&quot;;

            },
            listWidth: function () {
                return 100 / (this.list.length + 2)
            }
        },
        mounted(){
            if (this.autoplay) {
                this.autoSwitch();
            }
            this.slideChange = this.sildetype || 'ease';
            if (this.arrowsize &amp;&amp; this.arrowurl) {
                this.arrowWidth = this.arrowsize.split(',')[0];
                this.arrowHeight = this.arrowsize.split(',')[1];
            }
        },
        props: ['list', 'autoplay', 'type', 'time', 'sildetype', 'arrowurl', 'arrowsize', 'option', 'direction'],
        methods: {
            //滑动操作
            switchDo(reduce){
                clearInterval(this.timer);
                //根据reduce判断this.nowIndex的增加或者减少！
                if (reduce === 'reduce') {
                    if (this.nowIndex === 0) {
                        //如果是滑动切换
                        this.nowIndex--;
                        //执行完了这次动画之后，去除过渡效果
                        setTimeout(() => {
                            this.nowIndex = this.list.length - 1;
                            this.noLast = false;
                        }, 400)
                    }
                    else {
                        this.nowIndex--;
                    }
                }
                else {
                    this.nowIndex++;
                }
                if (this.nowIndex === this.list.length) {

                    //执行完了这次动画之后，去除过渡效果
                    setTimeout(() => {
                        this.nowIndex = 0;
                        this.noLast = false;
                    }, 400)

                }
                //如果需要自动播放
                if (this.autoplay) {
                    this.autoSwitch();
                }
                //如果是滑动切换，设置this.noLast，增加过渡效果
                this.noLast = true;

            },
            //自动播放函数
            autoSwitch(){
                let time = this.time || 4000;
                this.timer = setInterval(() => {
                    this.switchDo();
                }, time);
            }
        }
    }
</script>
<style lang=&quot;scss&quot;>
    .ec-slide-img-box {
        width: 100%;
        height: 100%;
        position: relative;
        touch-action: none;
    }

    .ec-slide-img-type {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        &amp;.ec-slide-img-top {
        }
        &amp;.ec-slide-img-left {
            li {
                display: inline-block;
                font-size: 0;
            }
        }
        &amp;.ec-slide-img-transparent {
            li {
                opacity: 0;
                transition: opacity 1s;
                width: 0;
                &amp;.cur {
                    width: auto;
                }
                &amp;.show {
                    opacity: 1;
                }
            }
        }
        ul {
            font-size: 0;
            &amp;.tran {
                transition: all .4s;
            }
            li {
                text-align: center;
            }

            img {
                vertical-align: middle;
                max-width: 100%;
                max-height: 100%;
            }
        }
    }

    .ec-slide-arrow {
        div {
            position: absolute;
            z-index: 2;
            margin: auto;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            opacity: .5;
            &amp;:hover {
                opacity: 1;
            }
            &amp;.arrow-left {
                left: 10px;
                right: auto;
            }
            &amp;.arrow-right {
                right: 10px;
                left: auto;
                transform: rotate(180deg);
            }
            &amp;.arrow-top {
                top: 10px;
                bottom: auto;
            }
            &amp;.arrow-bottom {
                bottom: 10px;
                top: auto;
                transform: rotate(180deg);
            }
        }
    }

    .ec-slide-option {
        position: absolute;
        font-size: 0;
        bottom: 10px;
        text-align: center;
        width: 100%;
        z-index: 5;
        &amp;.isFirst {
            span:first-child {
                display: none;
            }
        }
        &amp;.isLast {
            span:last-child {
                display: none;
            }
        }
        span {
            border-radius: 100%;
            margin: 0 5px;
            background: #fff;
            display: inline-block;
            width: 10px;
            height: 10px;
            &amp;.active {
                background: #09f;
            }
        }
        &amp;.ec-slide-option-top {
            display: table;
            width: 10px;
            height: 100%;
            top: 0;
            right: 10px;
            margin: auto;
            bottom: 0;
            span {
                margin: 5px 0;
            }
            div {
                display: table-cell;
                vertical-align: middle;
            }
        }
    }
</style> 
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ec-slide-img-box"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ec-slide-box"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ec-slide-img-type ec-slide-img-left"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"type==='slide'&amp;&amp;direction==='left'"</span>&gt;</span>
            <span class="hljs-comment">&lt;!--用tran这个class控制ul是否含有过渡效果，样式已经写好--&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'width':ulWidth,'transform':'translate3d(-'+(listWidth*(nowIndex+1))+'%,0,0)','transition-timing-function':slideChange}"</span>
                <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'tran':noLast}"</span>&gt;</span>
                <span class="hljs-comment">&lt;!--最后一张图片--&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'width':listWidth+'%'}"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"list[list.length-1].href?list[list.length-1].href:'javascript:;'"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"list[list.length-1].src"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-img"</span>/&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-comment">&lt;!--遍历出来的图片--&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(li,index) in list"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'width':listWidth+'%'}"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"li.href?li.href:'javascript:;'"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"li.src"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-img"</span>/&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-comment">&lt;!--第一张图片--&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'width':listWidth+'%'}"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">:href</span>=<span class="hljs-string">"list[0].href?list[0].href:'javascript:;'"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"list[0].src"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-img"</span>/&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!--isLast:隐藏最后一个span，isFirst隐藏第一个span--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ec-slide-option"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"option"</span>
             <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'isLast':nowIndex===list.length, 'isFirst':nowIndex===-1,'ec-slide-option-top':direction==='top'}"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"nowIndex===list.length"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(li,index) in list"</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'active':index===nowIndex}"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"nowIndex===-1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ec-slide-arrow"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"arrowurl&amp;&amp;arrowsize"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'arrow-left':direction==='left','arrow-top':direction==='top'}"</span>
                 <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}"</span>
                 @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"switchDo('reduce')"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'arrow-right':direction==='left','arrow-bottom':direction==='top'}"</span>
                 <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}"</span>
                 @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"switchDo"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data () {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">nowIndex</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attr">noLast</span>: <span class="hljs-literal">true</span>,
                <span class="hljs-attr">timer</span>: <span class="hljs-literal">null</span>,
                <span class="hljs-attr">slideChange</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attr">arrowWidth</span>: <span class="hljs-string">''</span>,
                <span class="hljs-attr">arrowHeight</span>: <span class="hljs-string">''</span>
            }
        },
        <span class="hljs-attr">computed</span>: {
            <span class="hljs-attr">ulWidth</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>.list.length + <span class="hljs-number">2</span>) + <span class="hljs-string">"00%"</span>;

            },
            <span class="hljs-attr">listWidth</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-number">100</span> / (<span class="hljs-keyword">this</span>.list.length + <span class="hljs-number">2</span>)
            }
        },
        mounted(){
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.autoplay) {
                <span class="hljs-keyword">this</span>.autoSwitch();
            }
            <span class="hljs-keyword">this</span>.slideChange = <span class="hljs-keyword">this</span>.sildetype || <span class="hljs-string">'ease'</span>;
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.arrowsize &amp;&amp; <span class="hljs-keyword">this</span>.arrowurl) {
                <span class="hljs-keyword">this</span>.arrowWidth = <span class="hljs-keyword">this</span>.arrowsize.split(<span class="hljs-string">','</span>)[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">this</span>.arrowHeight = <span class="hljs-keyword">this</span>.arrowsize.split(<span class="hljs-string">','</span>)[<span class="hljs-number">1</span>];
            }
        },
        <span class="hljs-attr">props</span>: [<span class="hljs-string">'list'</span>, <span class="hljs-string">'autoplay'</span>, <span class="hljs-string">'type'</span>, <span class="hljs-string">'time'</span>, <span class="hljs-string">'sildetype'</span>, <span class="hljs-string">'arrowurl'</span>, <span class="hljs-string">'arrowsize'</span>, <span class="hljs-string">'option'</span>, <span class="hljs-string">'direction'</span>],
        <span class="hljs-attr">methods</span>: {
            <span class="hljs-comment">//滑动操作</span>
            switchDo(reduce){
                clearInterval(<span class="hljs-keyword">this</span>.timer);
                <span class="hljs-comment">//根据reduce判断this.nowIndex的增加或者减少！</span>
                <span class="hljs-keyword">if</span> (reduce === <span class="hljs-string">'reduce'</span>) {
                    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.nowIndex === <span class="hljs-number">0</span>) {
                        <span class="hljs-comment">//如果是滑动切换</span>
                        <span class="hljs-keyword">this</span>.nowIndex--;
                        <span class="hljs-comment">//执行完了这次动画之后，去除过渡效果</span>
                        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                            <span class="hljs-keyword">this</span>.nowIndex = <span class="hljs-keyword">this</span>.list.length - <span class="hljs-number">1</span>;
                            <span class="hljs-keyword">this</span>.noLast = <span class="hljs-literal">false</span>;
                        }, <span class="hljs-number">400</span>)
                    }
                    <span class="hljs-keyword">else</span> {
                        <span class="hljs-keyword">this</span>.nowIndex--;
                    }
                }
                <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">this</span>.nowIndex++;
                }
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.nowIndex === <span class="hljs-keyword">this</span>.list.length) {

                    <span class="hljs-comment">//执行完了这次动画之后，去除过渡效果</span>
                    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                        <span class="hljs-keyword">this</span>.nowIndex = <span class="hljs-number">0</span>;
                        <span class="hljs-keyword">this</span>.noLast = <span class="hljs-literal">false</span>;
                    }, <span class="hljs-number">400</span>)

                }
                <span class="hljs-comment">//如果需要自动播放</span>
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.autoplay) {
                    <span class="hljs-keyword">this</span>.autoSwitch();
                }
                <span class="hljs-comment">//如果是滑动切换，设置this.noLast，增加过渡效果</span>
                <span class="hljs-keyword">this</span>.noLast = <span class="hljs-literal">true</span>;

            },
            <span class="hljs-comment">//自动播放函数</span>
            autoSwitch(){
                <span class="hljs-keyword">let</span> time = <span class="hljs-keyword">this</span>.time || <span class="hljs-number">4000</span>;
                <span class="hljs-keyword">this</span>.timer = setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    <span class="hljs-keyword">this</span>.switchDo();
                }, time);
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="undefined">
    .ec-slide-img-box {
        width: 100%;
        height: 100%;
        position: relative;
        touch-action: none;
    }

    .ec-slide-img-type {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        &amp;.ec-slide-img-top {
        }
        &amp;.ec-slide-img-left {
            li {
                display: inline-block;
                font-size: 0;
            }
        }
        &amp;.ec-slide-img-transparent {
            li {
                opacity: 0;
                transition: opacity 1s;
                width: 0;
                &amp;.cur {
                    width: auto;
                }
                &amp;.show {
                    opacity: 1;
                }
            }
        }
        ul {
            font-size: 0;
            &amp;.tran {
                transition: all .4s;
            }
            li {
                text-align: center;
            }

            img {
                vertical-align: middle;
                max-width: 100%;
                max-height: 100%;
            }
        }
    }

    .ec-slide-arrow {
        div {
            position: absolute;
            z-index: 2;
            margin: auto;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            opacity: .5;
            &amp;:hover {
                opacity: 1;
            }
            &amp;.arrow-left {
                left: 10px;
                right: auto;
            }
            &amp;.arrow-right {
                right: 10px;
                left: auto;
                transform: rotate(180deg);
            }
            &amp;.arrow-top {
                top: 10px;
                bottom: auto;
            }
            &amp;.arrow-bottom {
                bottom: 10px;
                top: auto;
                transform: rotate(180deg);
            }
        }
    }

    .ec-slide-option {
        position: absolute;
        font-size: 0;
        bottom: 10px;
        text-align: center;
        width: 100%;
        z-index: 5;
        &amp;.isFirst {
            span:first-child {
                display: none;
            }
        }
        &amp;.isLast {
            span:last-child {
                display: none;
            }
        }
        span {
            border-radius: 100%;
            margin: 0 5px;
            background: #fff;
            display: inline-block;
            width: 10px;
            height: 10px;
            &amp;.active {
                background: #09f;
            }
        }
        &amp;.ec-slide-option-top {
            display: table;
            width: 10px;
            height: 100%;
            top: 0;
            right: 10px;
            margin: auto;
            bottom: 0;
            span {
                margin: 5px 0;
            }
            div {
                display: table-cell;
                vertical-align: middle;
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span> 
  </code></pre>
<h3 id="articleHeader8">3-6其它切换方式</h3>
<p>码农怎么会满足于现状，只有一种切换方式，怎么行，所以我又完善了些，1.一个透明度的切换方式。2.当传进的list长度为1的时候只显示图片，不进行任何动画。3.左右滑动事件的处理（不规范处理）！虽然也是很少功能，但是我在日常开发可以满足！<br>完整代码如下，大家也可以去github上面看代码<a href="https://github.com/chenhuiYj/ec-slider" rel="nofollow noreferrer" target="_blank">ec-slider</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;ec-slide-img-box&quot; id=&quot;ec-slide-box&quot;>
        <!--只有一张图片的时候，只显示，不做任何操作-->
        <div class=&quot;ec-slide-img&quot; v-if=&quot;list.length===1&quot;>
            <a :href=&quot;list[0].href?list[0].href:'javascript:;'&quot;>
                <img :src=&quot;list[0].src&quot;/>
            </a>
        </div>
        <!--左右滑动方式-->
        <div class=&quot;ec-slide-img-type ec-slide-img-left&quot; v-if=&quot;type==='slide'&amp;&amp;direction==='left'&amp;&amp;list.length>1&quot;>
            <!--用tran这个class控制ul是否含有过渡效果，样式已经写好-->
            <ul :style=&quot;{'width':ulWidth,'transform':'translate3d(-'+(listWidth*(nowIndex+1))+'%,0,0)','transition-timing-function':slideChange}&quot;
                :class=&quot;{'tran':noLast}&quot; @touchstart=&quot;touchStar&quot; @touchend=&quot;touchEnd&quot;>
                <!--最后一张图片-->
                <li :style=&quot;{'width':listWidth+'%'}&quot;>
                    <a :href=&quot;list[list.length-1].href?list[list.length-1].href:'javascript:;'&quot;>
                        <img :src=&quot;list[list.length-1].src&quot; class=&quot;slider-img&quot;/>
                    </a>
                </li>
                <!--遍历出来的图片-->
                <li v-for=&quot;(li,index) in list&quot;:style=&quot;{'width':listWidth+'%'}&quot;>
                    <a :href=&quot;li.href?li.href:'javascript:;'&quot;>
                        <img :src=&quot;li.src&quot; class=&quot;slider-img&quot;/>
                    </a>
                </li>
                <!--第一张图片-->
                <li :style=&quot;{'width':listWidth+'%'}&quot;>
                    <a :href=&quot;list[0].href?list[0].href:'javascript:;'&quot;>
                        <img :src=&quot;list[0].src&quot; class=&quot;slider-img&quot;/>
                    </a>
                </li>
            </ul>
        </div>
        <!--上下滑动方式-->
        <div class=&quot;ec-slide-img-type ec-slide-img-top&quot; v-if=&quot;type==='slide'&amp;&amp;direction==='top'&amp;&amp;list.length>1&quot; :style=&quot;{'height':boxHeight}&quot;>
            <ul :style=&quot;{'transform':'translate3d(0,-'+(listWidth*(nowIndex+1))+'%,0)','transition-timing-function':slideChange}&quot;
                :class=&quot;{'tran':noLast}&quot; @touchstart=&quot;touchStar&quot; @touchend=&quot;touchEnd&quot;>
                <li>
                    <a :href=&quot;list[list.length-1].href?list[list.length-1].href:'javascript:;'&quot;>
                        <img :src=&quot;list[list.length-1].src&quot; class=&quot;slider-img&quot; @load=&quot;imgLoad&quot;/>
                    </a>
                </li>
                <li v-for=&quot;(li,index) in list&quot;>
                    <a :href=&quot;li.href?li.href:'javascript:;'&quot;>
                        <img :src=&quot;li.src&quot; class=&quot;slider-img&quot; @load=&quot;imgLoad&quot;/>
                    </a>
                </li>
                <li>
                    <a :href=&quot;list[0].href?list[0].href:'javascript:;'&quot;>
                        <img :src=&quot;list[0].src&quot; class=&quot;slider-img&quot; @load=&quot;imgLoad&quot;/>
                    </a>
                </li>
            </ul>
        </div>
        <!--透明度滑动方式-->
        <div class=&quot;ec-slide-img-type ec-slide-img-transparent&quot; v-if=&quot;type==='transparent'&amp;&amp;list.length>1&quot;>
            <ul @touchstart=&quot;touchStar&quot; @touchend=&quot;touchEnd&quot;>
                <li v-for=&quot;(li,index) in list&quot; :class=&quot;{'cur':index===nowIndex,'show':index===nowIndexShow}&quot;>
                    <a :href=&quot;li.href?li.href:'javascript:;'&quot;>
                        <img :src=&quot;li.src&quot; class=&quot;slider-img&quot;/>
                    </a>
                </li>
            </ul>
        </div>
        <!--isLast:隐藏最后一个span，isFirst隐藏第一个span-->
        <div class=&quot;ec-slide-option&quot; v-if=&quot;option&amp;&amp;list.length>1&quot; :class=&quot;{'isLast':nowIndex===list.length, 'isFirst':nowIndex===-1,'ec-slide-option-top':direction==='top'}&quot;>
            <div>
                <span class=&quot;active span1&quot; v-if=&quot;nowIndex===list.length&quot;></span>
                <span v-for=&quot;(li,index) in list&quot; :class=&quot;{'active':index===nowIndex}&quot;></span>
                <span class=&quot;active span2&quot; v-if=&quot;nowIndex===-1&quot;></span>
            </div>
        </div>
        <div class=&quot;ec-slide-arrow&quot; v-if=&quot;arrowurl&amp;&amp;arrowsize&amp;&amp;list.length>1&quot;>
            <div :class=&quot;{'arrow-left':direction==='left','arrow-top':direction==='top'}&quot; :style=&quot;{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}&quot; @click.stop=&quot;switchDo('reduce')&quot;></div>
            <div :class=&quot;{'arrow-right':direction==='left','arrow-bottom':direction==='top'}&quot; :style=&quot;{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}&quot;  @click.stop=&quot;switchDo&quot;></div>
        </div>
    </div>
</template>
<script type=&quot;text/javascript&quot;>
    export default {
        data () {
            return {
                nowIndex: 0,
                nowIndexShow:0,
                noLast: true,
                timer: null,
                slideChange: '',
                arrowWidth:'',
                arrowHeight:'',
                startX:0,
                startY:0,
                boxHeight:0
            }
        },
        computed: {
            ulWidth: function () {
                return (this.list.length + 2) + &quot;00%&quot;;

            },
            listWidth:function () {
                return 100/(this.list.length+2)
            }
        },
        mounted(){
            if (this.autoplay) {
                this.autoSwitch();
            }
            this.slideChange = this.sildetype || 'ease';
            if(this.arrowsize&amp;&amp;this.arrowurl){
                this.arrowWidth=this.arrowsize.split(',')[0];
                this.arrowHeight=this.arrowsize.split(',')[1];
            }
        },
        props: ['list', 'autoplay', 'type', 'time', 'sildetype', 'arrowurl','arrowsize','option','direction'],
        methods: {
            //开始滑动
            touchStar(e){
                //e.preventDefault();
                this.startX=e.changedTouches[0].clientX;
                this.startY=e.changedTouches[0].clientY;
            },
            //滑动结束
            touchEnd(e){
                //e.preventDefault();
                if(this.direction==='left'){
                    if(e.changedTouches[0].clientX-this.startX>50){
                        this.switchDo('reduce')
                    }
                    else if(e.changedTouches[0].clientX-this.startX<-50){
                        this.switchDo()
                    }
                }
                else if(this.direction==='top'){
                    if(e.changedTouches[0].clientY-this.startY>50){
                        this.switchDo('reduce')
                    }
                    else if(e.changedTouches[0].clientY-this.startY<-50){
                        this.switchDo()
                    }
                }
            },
            //滑动操作
            switchDo(reduce){
                clearInterval(this.timer);
                //根据reduce判断this.nowIndex的增加或者减少！
                if(reduce==='reduce'){
                    if(this.nowIndex===0){
                        //如果是滑动切换
                        if(this.type==='slide'){
                            this.nowIndex--;
                            //执行完了这次动画之后，去除过渡效果
                            setTimeout(() => {
                                this.nowIndex = this.list.length-1;
                                this.noLast = false;
                            }, 400)
                        }
                        else{
                            this.nowIndex = this.list.length-1;
                        }
                    }
                    else{
                        this.nowIndex--;
                    }
                }
                else{
                    this.nowIndex++;
                }
                if (this.nowIndex === this.list.length) {
                    if(this.type==='slide') {
                        //执行完了这次动画之后，去除过渡效果
                        setTimeout(() => {
                            this.nowIndex = 0;
                            this.noLast = false;
                        }, 400)
                    }
                    else{
                        this.nowIndex = 0;
                    }
                }
                //是否显示图片，只针对透明度切换的情况！
                setTimeout(()=>{
                    this.nowIndexShow=this.nowIndex;
                },1)
                //如果需要自动播放
                if (this.autoplay) {
                    this.autoSwitch();
                }
                //如果是滑动切换，设置this.noLast，增加过渡效果
                if(this.type==='slide') {
                    this.noLast = true;
                }

            },
            //自动播放函数
            autoSwitch(){
                let time = this.time || 4000;
                this.timer = setInterval(() => {
                    this.switchDo();
                }, time);
            },
            //获取最大的高度，针对上下方向，滑动切换方式的处理
            imgLoad(e){
                if(parseInt(this.boxHeight)<e.path[0].offsetHeight){
                    this.boxHeight=e.path[0].offsetHeight+'px';
                }
            }
        }
    }
</script>
<style lang=&quot;scss&quot;>
    .ec-slide-img-box {
        width: 100%;
        height: 100%;
        position: relative;
        touch-action: none;
    }
    .ec-slide-img{
        width: 100%;
        height: 100%;
        img{
            max-width: 100%;
            max-height: 100%;
        }
    }
    .ec-slide-img-type{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        &amp;.ec-slide-img-top{
        }
        &amp;.ec-slide-img-left{
            li {
                display: inline-block;
                font-size: 0;
            }
        }
        &amp;.ec-slide-img-transparent {
            li {
                opacity: 0;
                transition: opacity 1s;
                width: 0;
                &amp;.cur {
                    width: auto;
                }
                &amp;.show{
                    opacity: 1;
                }
            }
        }
        ul {
            font-size: 0;
            &amp;.tran {
                transition: all .4s;
            }
            li{
                text-align: center;
            }

            img {
                vertical-align: middle;
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
    .ec-slide-arrow {
        div {
            position: absolute;
            z-index: 2;
            margin: auto;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            opacity: .5;
            &amp;:hover{
                opacity: 1;
            }
            &amp;.arrow-left {
                left: 10px;
                right: auto;
            }
            &amp;.arrow-right {
                right: 10px;
                left: auto;
                transform: rotate(180deg);
            }
            &amp;.arrow-top {
                top: 10px;
                bottom: auto;
            }
            &amp;.arrow-bottom {
                bottom: 10px;
                top: auto;
                transform: rotate(180deg);
            }
        }
    }
    .ec-slide-option {
        position: absolute;
        font-size: 0;
        bottom: 10px;
        text-align: center;
        width: 100%;
        z-index: 5;
        &amp;.isFirst {
            span:first-child {
                display: none;
            }
        }
        &amp;.isLast {
            span:last-child {
                display: none;
            }
        }
        span {
            border-radius: 100%;
            margin: 0 5px;
            background: #fff;
            display: inline-block;
            width: 10px;
            height: 10px;
            &amp;.active {
                background: #09f;
            }
        }
        &amp;.ec-slide-option-top{
            display: table;
            width: 10px;
            height: 100%;
            top: 0;
            right: 10px;
            margin: auto;
            bottom: 0;
            span{
                margin:5px 0;
            }
            div{display: table-cell;vertical-align: middle;}
        }
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>&lt;template&gt;
    &lt;div class="ec-slide-img-box" id="ec-slide-box"&gt;
        &lt;!--只有一张图片的时候，只显示，不做任何操作--&gt;
        &lt;div class="ec-slide-img" v-if="list.length===1"&gt;
            &lt;a :href="list[0].href?list[0].href:'javascript:;'"&gt;
                &lt;img :src="list[0].src"/&gt;
            &lt;/a&gt;
        &lt;/div&gt;
        &lt;!--左右滑动方式--&gt;
        &lt;div class="ec-slide-img-type ec-slide-img-left" v-if="type==='slide'&amp;&amp;direction==='left'&amp;&amp;list.length&gt;1"&gt;
            &lt;!--用tran这个class控制ul是否含有过渡效果，样式已经写好--&gt;
            &lt;ul :style="{'width':ulWidth,'transform':'translate3d(-'+(listWidth*(nowIndex+1))+'%,0,0)','transition-timing-function':slideChange}"
                :class="{'tran':noLast}" @touchstart="touchStar" @touchend="touchEnd"&gt;
                &lt;!--最后一张图片--&gt;
                &lt;li :style="{'width':listWidth+'%'}"&gt;
                    &lt;a :href="list[list.length-1].href?list[list.length-1].href:'javascript:;'"&gt;
                        &lt;img :src="list[list.length-1].src" class="slider-img"/&gt;
                    &lt;/a&gt;
                &lt;/li&gt;
                &lt;!--遍历出来的图片--&gt;
                &lt;li v-for="(li,index) in list":style="{'width':listWidth+'%'}"&gt;
                    &lt;a :href="li.href?li.href:'javascript:;'"&gt;
                        &lt;img :src="li.src" class="slider-img"/&gt;
                    &lt;/a&gt;
                &lt;/li&gt;
                &lt;!--第一张图片--&gt;
                &lt;li :style="{'width':listWidth+'%'}"&gt;
                    &lt;a :href="list[0].href?list[0].href:'javascript:;'"&gt;
                        &lt;img :src="list[0].src" class="slider-img"/&gt;
                    &lt;/a&gt;
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
        &lt;!--上下滑动方式--&gt;
        &lt;div class="ec-slide-img-type ec-slide-img-top" v-if="type==='slide'&amp;&amp;direction==='top'&amp;&amp;list.length&gt;1" :style="{'height':boxHeight}"&gt;
            &lt;ul :style="{'transform':'translate3d(0,-'+(listWidth*(nowIndex+1))+'%,0)','transition-timing-function':slideChange}"
                :class="{'tran':noLast}" @touchstart="touchStar" @touchend="touchEnd"&gt;
                &lt;li&gt;
                    &lt;a :href="list[list.length-1].href?list[list.length-1].href:'javascript:;'"&gt;
                        &lt;img :src="list[list.length-1].src" class="slider-img" @load="imgLoad"/&gt;
                    &lt;/a&gt;
                &lt;/li&gt;
                &lt;li v-for="(li,index) in list"&gt;
                    &lt;a :href="li.href?li.href:'javascript:;'"&gt;
                        &lt;img :src="li.src" class="slider-img" @load="imgLoad"/&gt;
                    &lt;/a&gt;
                &lt;/li&gt;
                &lt;li&gt;
                    &lt;a :href="list[0].href?list[0].href:'javascript:;'"&gt;
                        &lt;img :src="list[0].src" class="slider-img" @load="imgLoad"/&gt;
                    &lt;/a&gt;
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
        &lt;!--透明度滑动方式--&gt;
        &lt;div class="ec-slide-img-type ec-slide-img-transparent" v-if="type==='transparent'&amp;&amp;list.length&gt;1"&gt;
            &lt;ul @touchstart="touchStar" @touchend="touchEnd"&gt;
                &lt;li v-for="(li,index) in list" :class="{'cur':index===nowIndex,'show':index===nowIndexShow}"&gt;
                    &lt;a :href="li.href?li.href:'javascript:;'"&gt;
                        &lt;img :src="li.src" class="slider-img"/&gt;
                    &lt;/a&gt;
                &lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
        &lt;!--isLast:隐藏最后一个span，isFirst隐藏第一个span--&gt;
        &lt;div class="ec-slide-option" v-if="option&amp;&amp;list.length&gt;1" :class="{'isLast':nowIndex===list.length, 'isFirst':nowIndex===-1,'ec-slide-option-top':direction==='top'}"&gt;
            &lt;div&gt;
                &lt;span class="active span1" v-if="nowIndex===list.length"&gt;&lt;/span&gt;
                &lt;span v-for="(li,index) in list" :class="{'active':index===nowIndex}"&gt;&lt;/span&gt;
                &lt;span class="active span2" v-if="nowIndex===-1"&gt;&lt;/span&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="ec-slide-arrow" v-if="arrowurl&amp;&amp;arrowsize&amp;&amp;list.length&gt;1"&gt;
            &lt;div :class="{'arrow-left':direction==='left','arrow-top':direction==='top'}" :style="{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}" @click.stop="switchDo('reduce')"&gt;&lt;/div&gt;
            &lt;div :class="{'arrow-right':direction==='left','arrow-bottom':direction==='top'}" :style="{'width':arrowWidth+'px','height':arrowHeight+'px','background':'url('+arrowurl+') no-repeat','background-size':'100%'}"  @click.stop="switchDo"&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;script type="text/javascript"&gt;
    export default {
        data () {
            return {
                nowIndex: 0,
                nowIndexShow:0,
                noLast: true,
                timer: null,
                slideChange: '',
                arrowWidth:'',
                arrowHeight:'',
                startX:0,
                startY:0,
                boxHeight:0
            }
        },
        computed: {
            ulWidth: function () {
                return (this.list.length + 2) + "00%";

            },
            listWidth:function () {
                return 100/(this.list.length+2)
            }
        },
        mounted(){
            if (this.autoplay) {
                this.autoSwitch();
            }
            this.slideChange = this.sildetype || 'ease';
            if(this.arrowsize&amp;&amp;this.arrowurl){
                this.arrowWidth=this.arrowsize.split(',')[0];
                this.arrowHeight=this.arrowsize.split(',')[1];
            }
        },
        props: ['list', 'autoplay', 'type', 'time', 'sildetype', 'arrowurl','arrowsize','option','direction'],
        methods: {
            //开始滑动
            touchStar(e){
                //e.preventDefault();
                this.startX=e.changedTouches[0].clientX;
                this.startY=e.changedTouches[0].clientY;
            },
            //滑动结束
            touchEnd(e){
                //e.preventDefault();
                if(this.direction==='left'){
                    if(e.changedTouches[0].clientX-this.startX&gt;50){
                        this.switchDo('reduce')
                    }
                    else if(e.changedTouches[0].clientX-this.startX&lt;-50){
                        this.switchDo()
                    }
                }
                else if(this.direction==='top'){
                    if(e.changedTouches[0].clientY-this.startY&gt;50){
                        this.switchDo('reduce')
                    }
                    else if(e.changedTouches[0].clientY-this.startY&lt;-50){
                        this.switchDo()
                    }
                }
            },
            //滑动操作
            switchDo(reduce){
                clearInterval(this.timer);
                //根据reduce判断this.nowIndex的增加或者减少！
                if(reduce==='reduce'){
                    if(this.nowIndex===0){
                        //如果是滑动切换
                        if(this.type==='slide'){
                            this.nowIndex--;
                            //执行完了这次动画之后，去除过渡效果
                            setTimeout(() =&gt; {
                                this.nowIndex = this.list.length-1;
                                this.noLast = false;
                            }, 400)
                        }
                        else{
                            this.nowIndex = this.list.length-1;
                        }
                    }
                    else{
                        this.nowIndex--;
                    }
                }
                else{
                    this.nowIndex++;
                }
                if (this.nowIndex === this.list.length) {
                    if(this.type==='slide') {
                        //执行完了这次动画之后，去除过渡效果
                        setTimeout(() =&gt; {
                            this.nowIndex = 0;
                            this.noLast = false;
                        }, 400)
                    }
                    else{
                        this.nowIndex = 0;
                    }
                }
                //是否显示图片，只针对透明度切换的情况！
                setTimeout(()=&gt;{
                    this.nowIndexShow=this.nowIndex;
                },1)
                //如果需要自动播放
                if (this.autoplay) {
                    this.autoSwitch();
                }
                //如果是滑动切换，设置this.noLast，增加过渡效果
                if(this.type==='slide') {
                    this.noLast = true;
                }

            },
            //自动播放函数
            autoSwitch(){
                let time = this.time || 4000;
                this.timer = setInterval(() =&gt; {
                    this.switchDo();
                }, time);
            },
            //获取最大的高度，针对上下方向，滑动切换方式的处理
            imgLoad(e){
                if(parseInt(this.boxHeight)&lt;e.path[0].offsetHeight){
                    this.boxHeight=e.path[0].offsetHeight+'px';
                }
            }
        }
    }
&lt;/script&gt;
&lt;style lang="scss"&gt;
    .ec-slide-img-box {
        width: 100%;
        height: 100%;
        position: relative;
        touch-action: none;
    }
    .ec-slide-img{
        width: 100%;
        height: 100%;
        img{
            max-width: 100%;
            max-height: 100%;
        }
    }
    .ec-slide-img-type{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        &amp;.ec-slide-img-top{
        }
        &amp;.ec-slide-img-left{
            li {
                display: inline-block;
                font-size: 0;
            }
        }
        &amp;.ec-slide-img-transparent {
            li {
                opacity: 0;
                transition: opacity 1s;
                width: 0;
                &amp;.cur {
                    width: auto;
                }
                &amp;.show{
                    opacity: 1;
                }
            }
        }
        ul {
            font-size: 0;
            &amp;.tran {
                transition: all .4s;
            }
            li{
                text-align: center;
            }

            img {
                vertical-align: middle;
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
    .ec-slide-arrow {
        div {
            position: absolute;
            z-index: 2;
            margin: auto;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            opacity: .5;
            &amp;:hover{
                opacity: 1;
            }
            &amp;.arrow-left {
                left: 10px;
                right: auto;
            }
            &amp;.arrow-right {
                right: 10px;
                left: auto;
                transform: rotate(180deg);
            }
            &amp;.arrow-top {
                top: 10px;
                bottom: auto;
            }
            &amp;.arrow-bottom {
                bottom: 10px;
                top: auto;
                transform: rotate(180deg);
            }
        }
    }
    .ec-slide-option {
        position: absolute;
        font-size: 0;
        bottom: 10px;
        text-align: center;
        width: 100%;
        z-index: 5;
        &amp;.isFirst {
            span:first-child {
                display: none;
            }
        }
        &amp;.isLast {
            span:last-child {
                display: none;
            }
        }
        span {
            border-radius: 100%;
            margin: 0 5px;
            background: #fff;
            display: inline-block;
            width: 10px;
            height: 10px;
            &amp;.active {
                background: #09f;
            }
        }
        &amp;.ec-slide-option-top{
            display: table;
            width: 10px;
            height: 100%;
            top: 0;
            right: 10px;
            margin: auto;
            bottom: 0;
            span{
                margin:5px 0;
            }
            div{display: table-cell;vertical-align: middle;}
        }
    }
&lt;/style&gt;</code></pre>
<p>index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no&quot;>
    <title>Title</title>
    <style>
        body{

        }
        .transparent-left{
            margin-bottom: 20px;
            width: 500px;
        }
        .transparent-top{
            max-width: 1000px;
            margin-bottom: 20px;

        }
        .slider-left{
            width: 80%;
            margin: 20px auto;
            max-width: 1000px;
        }
        .slider-top{
            width: 1000px;
            height: 500px;
        }
        .slider-one{
            margin: 20px auto;
            width: 500px;
        }
    </style>
</head>
<body>
<div id=&quot;app6&quot;>
    <!--http://i2.kiimg.com/1949/098c291e8db16ab5.jpg          http://i1.buimg.com/1949/4d860a3067fab23b.jpg-->
    <div class=&quot;transparent-top&quot;>
        <ec-slide :list='list' :autoplay=&quot;true&quot; :type=&quot;'transparent'&quot; :option=&quot;true&quot; :time=&quot;4000&quot; :sildetype=&quot;'ease'&quot; :arrowurl=&quot;'http://i2.kiimg.com/1949/098c291e8db16ab5.jpg'&quot; :arrowsize=&quot;'40,20'&quot; :direction=&quot;'top'&quot;></ec-slide>
    </div>
    <div class=&quot;transparent-left&quot;>
        <ec-slide :list='list' :autoplay=&quot;true&quot; :type=&quot;'transparent'&quot; :option=&quot;true&quot; :time=&quot;4000&quot; :sildetype=&quot;'ease'&quot; :arrowurl=&quot;'http://i1.buimg.com/1949/4d860a3067fab23b.jpg'&quot; :arrowsize=&quot;'20,40'&quot; :direction=&quot;'left'&quot;></ec-slide>
    </div>
    <div class=&quot;slider-left&quot;>
        <ec-slide :list='list' :autoplay=&quot;true&quot; :type=&quot;'slide'&quot; :option=&quot;true&quot; :time=&quot;4000&quot; :sildetype=&quot;'ease'&quot; :arrowurl=&quot;'http://i1.buimg.com/1949/4d860a3067fab23b.jpg'&quot; :arrowsize=&quot;'20,40'&quot; :direction=&quot;'left'&quot;></ec-slide>
    </div>
    <div class=&quot;slider-top&quot;>
        <ec-slide :list='list' :autoplay=&quot;true&quot; :type=&quot;'slide'&quot; :option=&quot;true&quot; :time=&quot;4000&quot; :sildetype=&quot;'ease'&quot; :arrowurl=&quot;'http://i2.kiimg.com/1949/098c291e8db16ab5.jpg'&quot; :arrowsize=&quot;'40,20'&quot; :direction=&quot;'top'&quot;></ec-slide>
    </div>
    <div class=&quot;slider-one&quot;>
        <ec-slide :list='list2'></ec-slide>
    </div>
</div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span>{

        }
        <span class="hljs-selector-class">.transparent-left</span>{
            <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">20px</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        }
        <span class="hljs-selector-class">.transparent-top</span>{
            <span class="hljs-attribute">max-width</span>: <span class="hljs-number">1000px</span>;
            <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">20px</span>;

        }
        <span class="hljs-selector-class">.slider-left</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">80%</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
            <span class="hljs-attribute">max-width</span>: <span class="hljs-number">1000px</span>;
        }
        <span class="hljs-selector-class">.slider-top</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">1000px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">500px</span>;
        }
        <span class="hljs-selector-class">.slider-one</span>{
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> auto;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app6"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--http://i2.kiimg.com/1949/098c291e8db16ab5.jpg          http://i1.buimg.com/1949/4d860a3067fab23b.jpg--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"transparent-top"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ec-slide</span> <span class="hljs-attr">:list</span>=<span class="hljs-string">'list'</span> <span class="hljs-attr">:autoplay</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">:type</span>=<span class="hljs-string">"'transparent'"</span> <span class="hljs-attr">:option</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">:time</span>=<span class="hljs-string">"4000"</span> <span class="hljs-attr">:sildetype</span>=<span class="hljs-string">"'ease'"</span> <span class="hljs-attr">:arrowurl</span>=<span class="hljs-string">"'http://i2.kiimg.com/1949/098c291e8db16ab5.jpg'"</span> <span class="hljs-attr">:arrowsize</span>=<span class="hljs-string">"'40,20'"</span> <span class="hljs-attr">:direction</span>=<span class="hljs-string">"'top'"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ec-slide</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"transparent-left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ec-slide</span> <span class="hljs-attr">:list</span>=<span class="hljs-string">'list'</span> <span class="hljs-attr">:autoplay</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">:type</span>=<span class="hljs-string">"'transparent'"</span> <span class="hljs-attr">:option</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">:time</span>=<span class="hljs-string">"4000"</span> <span class="hljs-attr">:sildetype</span>=<span class="hljs-string">"'ease'"</span> <span class="hljs-attr">:arrowurl</span>=<span class="hljs-string">"'http://i1.buimg.com/1949/4d860a3067fab23b.jpg'"</span> <span class="hljs-attr">:arrowsize</span>=<span class="hljs-string">"'20,40'"</span> <span class="hljs-attr">:direction</span>=<span class="hljs-string">"'left'"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ec-slide</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-left"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ec-slide</span> <span class="hljs-attr">:list</span>=<span class="hljs-string">'list'</span> <span class="hljs-attr">:autoplay</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">:type</span>=<span class="hljs-string">"'slide'"</span> <span class="hljs-attr">:option</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">:time</span>=<span class="hljs-string">"4000"</span> <span class="hljs-attr">:sildetype</span>=<span class="hljs-string">"'ease'"</span> <span class="hljs-attr">:arrowurl</span>=<span class="hljs-string">"'http://i1.buimg.com/1949/4d860a3067fab23b.jpg'"</span> <span class="hljs-attr">:arrowsize</span>=<span class="hljs-string">"'20,40'"</span> <span class="hljs-attr">:direction</span>=<span class="hljs-string">"'left'"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ec-slide</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-top"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ec-slide</span> <span class="hljs-attr">:list</span>=<span class="hljs-string">'list'</span> <span class="hljs-attr">:autoplay</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">:type</span>=<span class="hljs-string">"'slide'"</span> <span class="hljs-attr">:option</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">:time</span>=<span class="hljs-string">"4000"</span> <span class="hljs-attr">:sildetype</span>=<span class="hljs-string">"'ease'"</span> <span class="hljs-attr">:arrowurl</span>=<span class="hljs-string">"'http://i2.kiimg.com/1949/098c291e8db16ab5.jpg'"</span> <span class="hljs-attr">:arrowsize</span>=<span class="hljs-string">"'40,20'"</span> <span class="hljs-attr">:direction</span>=<span class="hljs-string">"'top'"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ec-slide</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slider-one"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ec-slide</span> <span class="hljs-attr">:list</span>=<span class="hljs-string">'list2'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ec-slide</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader9">4.小结</h2>
<p>好了，今天的开发就到此为止了。起初这个项目我是打算当练手用的，但是后来在项目上使用了，虽然这个写得比较简单，但是效果还不错。现在情况还不是很好，以后有需要也会维护。目前来说，也是建议大家可以玩下这个项目，虽然文章有点长，但是直接看下，边动手写代码，边看文章，会发现。一下子就看完了！这个应该是不错的练手项目，可以熟悉使用vue开发组件！最后，如果大家觉得有哪里写错了，写得不好，欢迎指点！</p>
<p>-------------------------华丽的分割线--------------------<br>想了解更多，关注关注我的微信公众号：守候书阁</p>
<p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue组件开发练习--焦点图切换

## 原文链接
[https://segmentfault.com/a/1190000011141625](https://segmentfault.com/a/1190000011141625)

