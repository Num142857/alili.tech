---
title: 'Vue组件之全局组件与局部组件' 
date: 2018-12-29 2:30:10
hidden: true
slug: 5xyr8k7kco3
categories: [reprint]
---

{{< raw >}}

                    
<p>组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。个人认为就是一个可以重复利用的结构层代码片段。</p>
<p>全局组件注册方式：Vue.component(组件名,{方法})</p>
<p>eg:</p>
<pre><code>&lt;body&gt;
&lt;div id="app"&gt;
&lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;
&lt;div id="app1"&gt;
    &lt;my-component&gt;&lt;/my-component&gt;

&lt;/div&gt;
&lt;script&gt;
Vue.component("my-component",{
    template:"&lt;h1&gt;我是全局组件&lt;/h1&gt;"
});
new Vue({
    el:"#app"
});
new Vue({
    el:"#app1"
})
&lt;/script&gt;
&lt;/body&gt;
</code></pre>
<p>渲染结果：</p>
<pre><code>&lt;div id="app"&gt;
    &lt;h1&gt;我是全局组件&lt;/h1&gt;
&lt;/div&gt;
&lt;div id="app1"&gt;
    &lt;h1&gt;我是全局组件&lt;/h1&gt;
&lt;/div&gt;
</code></pre>
<p>这里需要注意：</p>
<p>1.全局组件必须写在Vue实例创建之前，才在该根元素下面生效；</p>
<p>eg:</p>
<pre><code>&lt;body&gt;
&lt;div id="app"&gt;
    &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;
&lt;div id="app1"&gt;
    &lt;my-component&gt;&lt;/my-component&gt;

&lt;/div&gt;
&lt;script&gt;
    new Vue({
        el: "#app"
    });
    Vue.component("my-component", {
        template: "&lt;h1&gt;我是全局组件&lt;/h1&gt;"
    });
    new Vue({
        el: "#app1"
    })
&lt;/script&gt;
&lt;/body&gt;
</code></pre>
<p>这样只会渲染app1根元素下面的，并不会渲染app根元素下面的，并且会报错。</p>
<p>2.模板里面第一级只能有一个标签，不能并行；</p>
<pre><code>&lt;body&gt;
&lt;div id="app"&gt;
    &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;
&lt;script&gt;
    new Vue({
        el: "#app"
    });
    Vue.component("my-component", {
        template: "&lt;h1&gt;我是全局组件&lt;/h1&gt;" +
        "&lt;p&gt;我是全局组件内标签&lt;/p&gt;"
    });
    new Vue({
        el: "#app1"
    })
&lt;/script&gt;
&lt;/body&gt;
</code></pre>
<p>这样子会报错，并且只会渲染第一个标签h1;我们应该这样子写：</p>
<pre><code>&lt;body&gt;
&lt;div id="app"&gt;
    &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;
&lt;script&gt;
    new Vue({
        el: "#app"
    });
    Vue.component("my-component", {
        template: "&lt;h1&gt;我是全局组件&lt;p&gt;" +
        "我是全局组件内标签&lt;/p&gt;&lt;/h1&gt;"
    });
    new Vue({
        el: "#app1"
    })
&lt;/script&gt;
&lt;/body&gt;
</code></pre>
<p>局部组件注册方式，直接在Vue实例里面注册</p>
<p>eg:</p>
<pre><code>&lt;body&gt;
&lt;div id="app1"&gt;
    &lt;child-component&gt;&lt;/child-component&gt;
&lt;/div&gt;
&lt;script&gt;
    new Vue({
        el: "#app1",
        components:{
            "child-component":{
                template:"&lt;h1&gt;我是局部组件&lt;/h1&gt;"
            }
        }
    });
&lt;/script&gt;
</code></pre>
<p>局部组件需要注意：</p>
<p>1.属性名为components，s千万别忘了;</p>
<p>2.套路比较深，所以建议模板定义在一个全局变量里，代码看起来容易一点，如下：（模板标签比较多的时候，这样子写更加简洁规整）</p>
<pre><code>&lt;body&gt;
&lt;div id="app1"&gt;
    &lt;child-component&gt;&lt;/child-component&gt;
&lt;/div&gt;
&lt;script&gt;
    var child={
        template:"&lt;h1&gt;我是局部组件&lt;/h1&gt;"
    };
    new Vue({
        el: "#app1",
        components:{
            "child-component":child
        }
    });
&lt;/script&gt;
&lt;/body&gt;
</code></pre>
<p>关于组件中的其他属性，可以和实例中的一样，但是data属性必须是一个函数：</p>
<p>eg:</p>
<pre><code>&lt;body&gt;
&lt;div id="app1"&gt;
    &lt;child-component&gt;&lt;/child-component&gt;
&lt;/div&gt;
&lt;script&gt;
    var child={
        template:"&lt;button @click='add2'&gt;我是局部组件:"{{"m2"}}"&lt;/button&gt;",
        data:function(){
            return {m2:1}
        },
        methods:{
            add2:function(){
                this.m2++
            }
        }
    };
    new Vue({
        el: "#app1",
        components:{
            "child-component":child
        }
    })
&lt;/script&gt;
&lt;/body&gt;
</code></pre>
<p>显示结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVWgRD?w=114&amp;h=30" src="https://static.alili.tech/img/bVWgRD?w=114&amp;h=30" alt="clipboard.png" title="clipboard.png"></span></p>
<p>全局组件和局部组件一样，data也必须是一个函数：</p>
<pre><code>&lt;body&gt;
&lt;div id="app1"&gt;
    &lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;
&lt;script&gt;
    Vue.component("my-component",{
        template:"&lt;button @click='add1'&gt;全局组件："{{"m1"}}"&lt;/button&gt;",
        data:function(){
            return {
                m1:10
            }
        },
        methods:{
            add1:function(){
                this.m1++
            }
        }
    });
    new Vue({
        el:"#app1"
    })
&lt;/script&gt;
&lt;/body&gt;
</code></pre>
<p>显示结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVWgRI?w=109&amp;h=31" src="https://static.alili.tech/img/bVWgRI?w=109&amp;h=31" alt="clipboard.png" title="clipboard.png"></span></p>
<p>当使用 DOM 作为模板时 (例如，将 el 选项挂载到一个已存在的元素上)，你会受到 HTML 的一些限制，因为 Vue 只有在浏览器解析和标准化 HTML 后才能获取模板内容。尤其像这些元素 &lt;ul&gt;，&lt;ol&gt;，&lt;table&gt;，&lt;select&gt; 限制了能被它包裹的元素，而一些像&lt;option&gt; 这样的元素只能出现在某些其它元素内部。</p>
<p>自定义组件 &lt;my-row&gt; 被认为是无效的内容，因此在渲染的时候会导致错误。变通的方案是使用特殊的 is 属性：</p>
<p>eg:</p>
<pre><code>&lt;body&gt;
&lt;div id="app1"&gt;
&lt;ul&gt;
    &lt;li is="my-component"&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;/div&gt;
&lt;script&gt;
 Vue.component("my-component",{
     template:"&lt;h1&gt;"{{"message"}}"&lt;/h1&gt;",
     data:function(){
         return {
             message:"hello world"
         }
     }
 });
 new Vue({
     el:"#app1"
 })
&lt;/script&gt;
&lt;/body&gt;
</code></pre>
<p>渲染结果为：</p>
<p><span class="img-wrap"><img data-src="/img/bVWgRK?w=436&amp;h=229" src="https://static.alili.tech/img/bVWgRK?w=436&amp;h=229" alt="clipboard.png" title="clipboard.png"></span></p>
<p>对于全局与局部的作用域问题，我们可以这样理解，只要变量是在组件内部用的，这些变量必须是组件内部的，而在外部html结构中引用的变量，都引用的是该挂载下的实例里面的变量</p>
<p>eg:</p>
<pre><code>&lt;body&gt;
&lt;div id="app1"&gt;
&lt;my-component&gt;&lt;/my-component&gt;
&lt;/div&gt;
&lt;script&gt;
 Vue.component("my-component",{
     template:"&lt;button @click='add3'&gt;" +
     ""{{"message"}}"&lt;/button&gt;",
     data:function(){
         return {
             message:"hello world"
         }
     },
     methods:{
         add3:function(){
             alert("我是局部")
         }
     }
 });
 new Vue({
     el:"#app1",
     methods:{
         add3:function(){
             alert("我是全局")
         }
     }
 })
&lt;/script&gt;
&lt;/body&gt;
</code></pre>
<p>弹出框显示：我是局部</p>
<p>Vue中所谓的全局指的是该挂载下的区域；</p>
<p>下面这种做法是错误的，按我的想法觉得应该会弹出：我是全局，但是却报错，也就是说组件处于全局下不可以添加默认事件，要用全局的事件函数，必须父子通信</p>
<pre><code>&lt;body&gt;
&lt;div id="app1"&gt;
&lt;my-component @click="add3"&gt;&lt;/my-component&gt;
&lt;/div&gt;
&lt;script&gt;
 Vue.component("my-component",{
     template:"&lt;button @click='add3'&gt;" +
     ""{{"message"}}"&lt;/button&gt;",
     data:function(){
         return {
             message:"hello world"
         }
     }
 });
 new Vue({
     el:"#app1",
     methods:{
         add3:function(){
             alert("我是全局")
         }
     }
 })
&lt;/script&gt;
&lt;/body&gt;
</code></pre>
<p>额外话题：</p>
<p>1.函数return后面必须跟返回的内容，不能换行写</p>
<p>eg:</p>
<p><span class="img-wrap"><img data-src="/img/bVWgRP?w=152&amp;h=110" src="https://static.alili.tech/img/bVWgRP?w=152&amp;h=110" alt="clipboard.png" title="clipboard.png"></span></p>
<p>下面这种写法不会返值回来：</p>
<p><span class="img-wrap"><img data-src="/img/bVWgRQ?w=149&amp;h=78" src="https://static.alili.tech/img/bVWgRQ?w=149&amp;h=78" alt="clipboard.png" title="clipboard.png"></span></p>
<p>2.Vue和小程序等一样，采用es6的函数写法，this指向是不一样的</p>
<pre><code>&lt;body&gt;
&lt;div id="app1"&gt;
    &lt;button @click="f"&gt;ES5&lt;/button&gt;
    &lt;button @click="f1"&gt;ES6&lt;/button&gt;
&lt;/div&gt;
&lt;script&gt;
new Vue({
    el:"#app1",
    methods:{
        f:function(){
          console.log(this)
        },
        f1:()=&gt;{
            console.log(this)
        }
    }
})
&lt;/script&gt;
&lt;/body&gt;
</code></pre>
<p>结果：</p>
<p>第一个this指的是Vue实例</p>
<p>第二个this指的是Window</p>
<p><span class="img-wrap"><img data-src="/img/bVWgRS?w=817&amp;h=54" src="https://static.alili.tech/img/bVWgRS?w=817&amp;h=54" alt="clipboard.png" title="clipboard.png"></span></p>
<p>由于它和小程序不一样，我发现在data里面this指的是window，在methods里面this才是Vue实例</p>
<p>所以建议大家用es5写吧</p>
<pre><code>new Vue({
    el:"#app1",
    data:{that:this},
})
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVWgRT?w=593&amp;h=154" src="https://static.alili.tech/img/bVWgRT?w=593&amp;h=154" alt="clipboard.png" title="clipboard.png"></span></p>
<p><a href="http://www.cnblogs.com/douyaer/p/7637093.html" rel="nofollow noreferrer">博文地址：</a><a href="http://www.cnblogs.com/douyaer/p/7637093.html" rel="nofollow noreferrer">http://www.cnblogs.com/douyae...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue组件之全局组件与局部组件

## 原文链接
[https://segmentfault.com/a/1190000011465462](https://segmentfault.com/a/1190000011465462)

