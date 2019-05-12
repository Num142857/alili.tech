---
title: 'vue.js原生组件化开发（一）——组件开发基础' 
date: 2019-01-15 2:30:12
hidden: true
slug: kw0r9i1laae
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>vue作为一个轻量级前端框架，其核心就是组件化开发。我们一般常用的是用脚手架vue-cli来进行开发和管理，一个个组件即为一个个vue页面，这种叫单文件组件。我们在引用组件之时只需将组件页面引入，再注册即可使用。那么不用脚手架，如何进行组件开发呢，本文先介绍一下基础知识吧。</p>
<h1 id="articleHeader1">组件使用流程</h1>
<h2 id="articleHeader2">1.组件构建</h2>
<h3 id="articleHeader3">1.1 extend构建法</h3>
<p>调用Vue.extend()方法，构建一个名字为myCom的组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var myCom = Vue.extend({
    template: '<div>这是我的组件</div>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-keyword">var</span> myCom = <span class="hljs-type">Vue</span>.extend({
    <span class="hljs-keyword">template</span>: '&lt;<span class="hljs-keyword">div</span>&gt;这是我的组件&lt;/<span class="hljs-keyword">div</span>&gt;'
})</code></pre>
<p>其中template定义模板的标签，模板的内容需写在该标签下</p>
<h3 id="articleHeader4">1.2 template标签构建法</h3>
<p>template标签构建，需在标签上加id属性用以后期注册</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template id=&quot;myCom&quot;>
    <div>这是template标签构建的组件</div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>&lt;<span class="hljs-keyword">template</span> id=<span class="hljs-string">"myCom"</span>&gt;
    &lt;<span class="hljs-keyword">div</span>&gt;这是<span class="hljs-keyword">template</span>标签构建的组件&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">template</span>&gt;</code></pre>
<h3 id="articleHeader5">1.3 script标签构建法</h3>
<p>script标签同样需加id属性，同时还得加type="text/x-template"，加这个是为了告诉浏览器不执行编译里面的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/x-template&quot; id=&quot;myCom1&quot;>
    <div>这是script标签构建的组件</div>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">script</span> type=<span class="hljs-string">"text/x-template"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"myCom1"</span>&gt;
    &lt;<span class="hljs-keyword">div</span>&gt;这是<span class="hljs-keyword">script</span>标签构建的组件&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">script</span>&gt;</code></pre>
<h2 id="articleHeader6">2.注册组件</h2>
<p><strong>（1）全局注册：</strong>一次注册，可在多个vue实例中使用，需调用Vue.component()方法，这个方法需传2个参数，第一个参数为组件名称，第二个参数为组件构造时定义的变量。</p>
<p>我们先用全局注册注册上面例子中创建的myCom组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-com',myCom)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.component</span>(<span class="hljs-string">'my-com'</span>,myCom)</code></pre>
<p><strong>还有一种不需构建直接注册的写法——注册语法糖</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-com',{
    'template':'<div>这是我的组件</div>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>Vue.component(<span class="hljs-string">'my-com'</span>,{
    <span class="hljs-string">'template'</span>:<span class="hljs-string">'&lt;div&gt;这是我的组件&lt;/div&gt;'</span>
})</code></pre>
<p>'my-com'为给组件自定义的名字，在使用时会用到，后面myCom对应的就是上面构建的组件变量。</p>
<blockquote><p>注意命名规范，一般组件名字以短横线分隔或一个小写单词。<br>例：footer-nav，footernav</p></blockquote>
<p>如果是用template及script标签构建的组件，第二个参数就改为它们标签上的id值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component('my-com',{
    template: '#myCom'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>Vue.component(<span class="hljs-string">'my-com'</span>,{
    <span class="hljs-keyword">template</span>: <span class="hljs-string">'#myCom'</span>
})</code></pre>
<p><strong>（2）局部注册：</strong>只能在注册该组件的实例中使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '#app',
    components: {
        'my-com': myCom
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>({
    el: <span class="hljs-type"></span>'<span class="hljs-meta">#app',</span>
    components: <span class="hljs-type"></span>{
        <span class="hljs-string">'my-com'</span>: <span class="hljs-type">myCom</span>
    }
})</code></pre>
<p><strong>注册语法糖</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '#app',
    components: {
        'my-com': {
           template: '<div>这是我的组件</div>'
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>var app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">'#app'</span>,
    component<span class="hljs-variable">s:</span> {
        <span class="hljs-string">'my-com'</span>: {
           template: <span class="hljs-string">'&lt;div&gt;这是我的组件&lt;/div&gt;'</span>
        }
    }
})</code></pre>
<p><strong>template及script构建的组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = new Vue({
    el: '#app',
    components: {
        'my-com': {
           template: '#myCom'
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>({
    el: <span class="hljs-type"></span>'<span class="hljs-meta">#app',</span>
    components: <span class="hljs-type"></span>{
        <span class="hljs-string">'my-com'</span>: <span class="hljs-type"></span>{
           template: <span class="hljs-type"></span>'<span class="hljs-meta">#myCom'</span>
        }
    }
})</code></pre>
<h2 id="articleHeader7">3.调用组件</h2>
<p>我们只需在需要调用组件的地方写上组件名字的标签即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    /*调用组件*/
    <my-com></my-com>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;div&gt;</span>
    <span class="hljs-comment">/*调用组件*/</span>
    <span class="hljs-params">&lt;my-com&gt;</span><span class="hljs-params">&lt;/my-com&gt;</span>
<span class="hljs-params">&lt;/div&gt;</span></code></pre>
<h2 id="articleHeader8">4.例子</h2>
<h3 id="articleHeader9">4.1 全局注册</h3>
<p>新建一个html文件，引入vue.js，并且定义2个vue实例app1和app2</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>vue组件</title>
    <script src=&quot;js/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app1&quot;>
        <my-com></my-com>
    </div>
    <div id=&quot;app2&quot;>
        <my-com></my-com>
    </div>

    <script>
        /*构建组件*/
        var myCom = Vue.extend({
            template: '<div>这是我的组件</div>'
        });
        /*全局注册组件*/
        Vue.component('my-com',myCom);

        /*定义vue实例app1*/
        var app1 = new Vue({
            el: '#app1'
        });

        /*定义vue实例app2*/
        var app2 = new Vue({
            el: '#app2'
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue组件<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-com</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-com</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app2"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-com</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-com</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-comment">/*构建组件*/</span>
        <span class="hljs-keyword">var</span> myCom = Vue.extend({
            template: <span class="hljs-string">'&lt;div&gt;这是我的组件&lt;/div&gt;'</span>
        });
        <span class="hljs-comment">/*全局注册组件*/</span>
        Vue.component(<span class="hljs-string">'my-com'</span>,myCom);

        <span class="hljs-comment">/*定义vue实例app1*/</span>
        <span class="hljs-keyword">var</span> app1 = <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app1'</span>
        });

        <span class="hljs-comment">/*定义vue实例app2*/</span>
        <span class="hljs-keyword">var</span> app2 = <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app2'</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>打开浏览器查看效果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009344946?w=464&amp;h=178" src="https://static.alili.tech/img/remote/1460000009344946?w=464&amp;h=178" alt="" title="" style="cursor: pointer; display: inline;"></span><br>可以看到全局注册的组件在实例app1和实例app2中都可以被调用</p>
<blockquote><p>一次注册，多处使用</p></blockquote>
<h3 id="articleHeader10">4.2 局部注册</h3>
<p>修改上面例子的html代码，将全局注册的组件改为局部注册，注册到实例app1下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>vue组件</title>
    <script src=&quot;js/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app1&quot;>
        <my-com></my-com>
    </div>
    <div id=&quot;app2&quot;>
        <my-com></my-com>
    </div>

    <script>
        var myCom = Vue.extend({
            template: '<div>这是我的组件</div>'
        });

        // Vue.component('my-com',myCom);
        /*局部注册组件*/
        var app1 = new Vue({
            el: '#app1',
            components:{
                'my-com':myCom
            }
        });

        var app2 = new Vue({
            el: '#app2'
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue组件<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-com</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-com</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app2"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-com</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-com</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        <span class="hljs-keyword">var</span> myCom = Vue.extend({
            template: <span class="hljs-string">'&lt;div&gt;这是我的组件&lt;/div&gt;'</span>
        });

        <span class="hljs-comment">// Vue.component('my-com',myCom);</span>
        <span class="hljs-comment">/*局部注册组件*/</span>
        <span class="hljs-keyword">var</span> app1 = <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app1'</span>,
            components:{
                <span class="hljs-string">'my-com'</span>:myCom
            }
        });

        <span class="hljs-keyword">var</span> app2 = <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app2'</span>
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>打开浏览器查看效果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009344947?w=1240&amp;h=335" src="https://static.alili.tech/img/remote/1460000009344947?w=1240&amp;h=335" alt="" title="" style="cursor: pointer;"></span><br>可以看到只渲染了app1实例下的组件，app2实例虽然调用了该组件，但是因为这个组件没有在其内部注册，也没有全局注册，所以报错说找不到该组件。</p>
<blockquote><p>一次注册，一处使用</p></blockquote>
<h3 id="articleHeader11">4.3 template及script标签构建组件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>vue组件</title>
    <script src=&quot;js/vue.js&quot;></script>
</head>
<body>
    <div id=&quot;app1&quot;>
        <my-com></my-com>
        <my-com1></my-com1>
    </div>

    <template id=&quot;myCom&quot;>
        <div>这是template标签构建的组件</div>
    </template>

    <script type=&quot;text/x-template&quot; id=&quot;myCom1&quot;>
        <div>这是script标签构建的组件</div>
    </script>

    <script>
        Vue.component('my-com1',{
            template: '#myCom1'
        });

        var app1 = new Vue({
            el: '#app1',
            components:{
                'my-com':{
                    template: '#myCom'
                }
            }
        });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue组件<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-com</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-com</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-com1</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-com1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myCom"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>这是template标签构建的组件<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/x-template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myCom1"</span>&gt;</span><span class="handlebars"><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>这是script标签构建的组件<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
        Vue.component(<span class="hljs-string">'my-com1'</span>,{
            template: <span class="hljs-string">'#myCom1'</span>
        });

        <span class="hljs-keyword">var</span> app1 = <span class="hljs-keyword">new</span> Vue({
            el: <span class="hljs-string">'#app1'</span>,
            components:{
                <span class="hljs-string">'my-com'</span>:{
                    template: <span class="hljs-string">'#myCom'</span>
                }
            }
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>打开浏览器查看效果<br><span class="img-wrap"><img data-src="/img/remote/1460000009344948?w=391&amp;h=78" src="https://static.alili.tech/img/remote/1460000009344948?w=391&amp;h=78" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader12">异步组件</h1>
<p>当项目比较大型，结构比较复杂时，我们一般选用vue-cli脚手架去构建项目。因为vue-cli集成了webpack环境，使用单文件组件，开发更简单，易上手，尤其是在对组件的处理上。对于原生vue.js，我们就得将组件构建在同一个html的script标签下或者html的外部js中，所有组件集中在一块，不容易管理，这也是原生vue,js的一点不便之处。<br>当然，在不使用脚手架的情况下想将一个个组件分别独立成一个个html文件，再去引用注册它们，也是可以实现的，但一般不推荐这样做。<br>vue.js可以将异步组件定义为一个工厂函数。<br><strong>例子</strong><br>新建一个head.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    这是头部
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;
    这是头部
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>在index.html中异步引入head.html作为组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>vue组件</title>
    <script src=&quot;js/vue.js&quot;></script>
    <script src=&quot;js/jquery.min.js&quot;></script>
</head>
<body>
    <div id=&quot;app1&quot;>
        <head-com></head-com>
    </div>
    <script>
        Vue.component('head-com', function (resolve, reject) {
            $.get(&quot;./head.html&quot;).then(function (res) {
                resolve({
                    template: res
                })
            });
        });

        var app1 = new Vue({
            el: '#app1'
        });

    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue组件<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">head-com</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head-com</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        Vue.component(<span class="hljs-string">'head-com'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
            $.get(<span class="hljs-string">"./head.html"</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
                resolve({
                    <span class="hljs-attr">template</span>: res
                })
            });
        });

        <span class="hljs-keyword">var</span> app1 = <span class="hljs-keyword">new</span> Vue({
            <span class="hljs-attr">el</span>: <span class="hljs-string">'#app1'</span>
        });

    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<blockquote><p>当然要注意一点，使用$.get获取本地文件是会跨域的，所以我们要把项目部署到服务器环境中。</p></blockquote>
<p>我这里用的是xampp集成环境，将项目文件夹component放置在xampp/htdocs下，然后访问localhost/component/index.html，<br>效果如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009344949?w=637&amp;h=269" src="https://static.alili.tech/img/remote/1460000009344949?w=637&amp;h=269" alt="" title="" style="cursor: pointer; display: inline;"></span><br>可以看到在index.html中引入的head.html里的内容已经被添加进去</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js原生组件化开发（一）——组件开发基础

## 原文链接
[https://segmentfault.com/a/1190000009344943](https://segmentfault.com/a/1190000009344943)

