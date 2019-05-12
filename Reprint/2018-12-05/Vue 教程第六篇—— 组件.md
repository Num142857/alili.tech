---
title: 'Vue 教程第六篇—— 组件' 
date: 2018-12-05 2:30:09
hidden: true
slug: yrgiu6soopc
categories: [reprint]
---

{{< raw >}}

                    
<h1>组件</h1>
<p>组件（Component）是前端在单页面应用（SPA）上最好的一种实现方式，把所有功能模块拆解成单独的组件，每个组件都有独立的作用域，且还可以相互通信</p>
<h1>认识单页面应用（SPA）</h1>
<p>在传统的页面之间跳转，是通过刷新，重新渲染一个页面而实现，在渲染的过程中势必要加载外部资源文件，页面在服务器中渲染出来是通过一系列的生命周期，在这个过程中会因为网速等硬件问题直接影响页面的加载速度，为解决这一问题，前端在新的设计模式上引入了组件的概念，页面之间的跳转变成了组件之间的切换，不需要重新加载整个页面，也不用考虑页面的生命周期，换成组件的生命周期，在性能上大大的提升了。</p>
<h1>Vue 的组件实现</h1>
<h2>全局组件</h2>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;!--组件的使用--&gt;
        &lt;global-component&gt;&lt;/global-component&gt;
    &lt;/div&gt;</code></pre>
<pre><code class="javascript">    //组件的定义 Vue.component(组件名称, {template})
    Vue.component('global-component', {
        template: '&lt;h1&gt;全局组件&lt;/h1&gt;'
    })

    var vm = new Vue({
        el: '#app'
    })</code></pre>
<p>最终渲染的效果</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;h1&gt;全局组件&lt;/h1&gt;
    &lt;/div&gt;</code></pre>
<h2>局部组件</h2>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;!--组件的使用--&gt;
        &lt;private-component&gt;&lt;/private-component&gt;
    &lt;/div&gt;</code></pre>
<pre><code class="javascript">    //组件的定义 Vue.component(组件名称, {template})
    var vm = new Vue({
        el: '#app',
        components:{
            'private-component': {
                template: '&lt;h1&gt;局部组件&lt;/h1&gt;'
            }
        }
    })</code></pre>
<p>最终渲染的效果</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;h1&gt;局部组件&lt;/h1&gt;
    &lt;/div&gt;</code></pre>
<h2>组件是一个单独的作用域</h2>
<p>每个组件都有单独的作用域</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;p&gt;"{{"count"}}"&lt;/p&gt;
        &lt;component1/&gt;
    &lt;/div&gt;    </code></pre>
<pre><code class="javascript">    var vm = new Vue({
        el: '#app',
        data: {
            count: 10
        },
        methods: {
            increment: function(){
                this.count += 1;
            }
        },
        components:{
            'component1': {
                template: '&lt;button v-on:click="increment"&gt;"{{" count "}}"&lt;/button&gt;',
                data: function(){
                    //在组件里面 data 一定是 function 并返回一个对象
                    return {
                        count: 0
                    }
                },
                methods: {
                    increment: function(){
                        this.count += 1;
                    }
                }
            }
        }
    })</code></pre>
<p>渲染结果为</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;p&gt;10&lt;/p&gt;
        &lt;!--
            此按钮每次点击都会自增 1，而 p 标签永远都是为 10
            原因为组件的作用域是单独的
        --&gt;
        &lt;button&gt;0&lt;/button&gt;
    &lt;/div&gt;    </code></pre>
<p><a href="https://dk-lan.github.io/vue/VueBasic/Component/component.html" rel="nofollow noreferrer">效果预览</a></p>
<h2>特殊的 HTML 结构中使用 is</h2>
<p>比如在下拉列表（select）元素里面，子元素必须为 option，则在使用组件的时候用 is</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;select&gt;
            &lt;option is="privateOption"&gt;&lt;/option&gt;
        &lt;/select&gt;
    &lt;/div&gt;</code></pre>
<pre><code class="javascript">    var vm = new Vue({
        el: '#app',
        components: {
            'privateOption': {
                template: '&lt;option value=1&gt;1&lt;/otpion&gt;'
            }
        }
    })</code></pre>
<p>渲染结果</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;select&gt;
            &lt;option value="1"&gt;1&lt;/option&gt;
        &lt;/select&gt;
    &lt;/div&gt;</code></pre>
<h2>动态组件 - :is</h2>
<pre><code class="html">&lt;div id="app" style="display: none;"&gt;
    &lt;input type="button" value="changeLight" @click="changeLight" /&gt;
    &lt;br/&gt;
    &lt;p :is="show"&gt;&lt;/p&gt;
&lt;/div&gt;

&lt;script type="text/javascript"&gt;
    var vm = new Vue({
        el: '#app',
        data: {
            show: 'red',
        },
        methods:{
            changeLight: function(){
                this.show = this.show == 'red' ? 'green' : 'red';
            }
        },
        components: {
            red: {
                template: '&lt;h1&gt;Red&lt;/h1&gt;'
            },
            green: {
                template: '&lt;h1&gt;Green&lt;/h1&gt;'
            }
        }
    })
&lt;/script&gt;</code></pre>
<h2>组件属性</h2>
<p>组件的属性要先声明后使用，props: ['属性名'...]</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;!--组件的使用--&gt;
        &lt;private-component title="组件属性" :text="mess"&gt;&lt;/private-component&gt;
    &lt;/div&gt;</code></pre>
<pre><code class="javascript">    //组件的定义 Vue.component(组件名称, {template})
    var vm = new Vue({
        el: '#app',
        data: {
            mess: '-动态属性'
        }
        components:{
            'private-component': {
                template: '&lt;h1&gt;"{{"title + text"}}"&lt;/h1&gt;',
                props: ['title', 'text']
            }
        }
    })</code></pre>
<p>最终渲染的效果</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;h1&gt;组件属性-动态属性&lt;/h1&gt;
    &lt;/div&gt;</code></pre>
<h2>组件自定义事件</h2>
<p>和组件属性不一样的在于 &lt;组件名 v-bind:属性名=""&gt;，属性名要在组件中先声明再使用：props: ['属性名']<br>自定义事件：&lt;组件名 v-on:自定义事件名=""&gt;，自定义事件名不需要声明，直接用 $emit() 触发</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;p&gt;"{{"total"}}"&lt;/p&gt;
        &lt;increment-total v-on:count="incrementTotal"&gt;&lt;/increment-total&gt;
    &lt;/div&gt;</code></pre>
<pre><code class="javascript">    var vm = new Vue({
        el: '#app',
        data: {
            total: 0
        },
        methods: {
            incrementTotal: function(){
                this.total += 1;
            }
        },
        components: {
            'incrementTotal': {
                template: '&lt;input type="button" @click="incrementTotal" value="Total" /&gt;',
                data: function(){
                    return {
                        total: 0
                    }
                },
                methods: {
                    incrementTotal: function(){
                        this.total += 1;
                        this.$emit('count')
                    }
                }
            }
        }
    })</code></pre>
<h2>slot 分发内容</h2>
<p>Vue 组件默认是覆盖渲染，为了解决这一问题，Vue 提出了 slot 分发内容</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;component1&gt;
            &lt;h1&gt;Sam&lt;/h1&gt;
            &lt;h1&gt;Lucy&lt;/h1&gt;
        &lt;/component1&gt;
    &lt;/div&gt;</code></pre>
<pre><code class="javascript">    Vue.component('component1', {
        template: `
            &lt;div&gt;
                &lt;h1&gt;Tom&lt;/h1&gt;
                &lt;slot&gt;&lt;/slot&gt;
            &lt;/div&gt;
        `
    })</code></pre>
<p>最终渲染的效果</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;component1&gt;
            &lt;h1&gt;Tom&lt;/h1&gt;
            &lt;!--
                如果在组件定义的 template 当中没有 &lt;slot&gt;&lt;/slot&gt;，那么下面两个 h1 标签将不会存在
                换句话说就是 &lt;slot&gt;&lt;/slot&gt; = &lt;h1&gt;Sam&lt;/h1&gt;&lt;h1&gt;Lucy&lt;/h1&gt;
                &lt;slot&gt;&lt;/slot&gt;可以放到 &lt;h1&gt;Tom&lt;/h1&gt; 上面进行位置调换
            --&gt;
            &lt;h1&gt;Sam&lt;/h1&gt;
            &lt;h1&gt;Lucy&lt;/h1&gt;
        &lt;/component1&gt;
    &lt;/div&gt;</code></pre>
<h3>具名 slot</h3>
<p>如果要将组件里面不同的子元素放到不同的地方，那就为子元素加上一个属性 slot="名称"，然后在组件定义的时候用名称对应位置 &lt;slot name="名称"&gt;&lt;/slot&gt;，其它没有 slot 属性的子元素将统一分发到 &lt;slot&gt;&lt;/slot&gt; 里面</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;component1&gt;
            &lt;h1&gt;Sam&lt;/h1&gt;
            &lt;h1 slot="lucy"&gt;Lucy&lt;/h1&gt;
        &lt;/component1&gt;
    &lt;/div&gt;</code></pre>
<pre><code class="javascript">    Vue.component('component1', {
        template: `
            &lt;div&gt;
                &lt;slot name="lucy"&gt;&lt;/slot&gt;
                &lt;h1&gt;Tom&lt;/h1&gt;
                &lt;slot&gt;&lt;/slot&gt;
            &lt;/div&gt;
        `
    })</code></pre>
<p>最终渲染的效果</p>
<pre><code class="html">    &lt;div id="app"&gt;
        &lt;component1&gt;
            &lt;!--&lt;slot name="lucy"&gt;&lt;/slot&gt; = &lt;h1 slot="lucy"&gt;Lucy&lt;/h1&gt;--&gt;
            &lt;h1&gt;Lucy&lt;/h1&gt;
            &lt;h1&gt;Tom&lt;/h1&gt;
            &lt;!--其它没有 slot 属性的子元素将全部分发到 &lt;slot&gt;&lt;/slot&gt; 标签--&gt;
            &lt;h1&gt;Sam&lt;/h1&gt;
        &lt;/component1&gt;
    &lt;/div&gt;</code></pre>
<h2>模版写法</h2>
<pre><code class="html">    &lt;template id="component1"&gt;
        &lt;div&gt;
            &lt;input type="text" v-model="name"/&gt;
            &lt;p&gt;"{{"name"}}"&lt;/p&gt;            
        &lt;/div&gt;
    &lt;/template&gt;

    &lt;div id="app"&gt;
        &lt;component1/&gt;
    &lt;/div&gt;     </code></pre>
<pre><code class="javascript">    var vm = new Vue({
        el: '#app',
        components: {
            'component1': {
                template: '#component1',
                data: function(){
                    return {name: 'Tom'};
                }
            }
        }
    })</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 教程第六篇—— 组件

## 原文链接
[https://segmentfault.com/a/1190000014462971](https://segmentfault.com/a/1190000014462971)

