---
title: 'Vue官方文档——详解' 
date: 2018-12-04 2:30:05
hidden: true
slug: xlffks8nyt
categories: [reprint]
---

{{< raw >}}

                    
<h3>Vue官方文档——详解 ( Vue 2.*版本 )</h3>
<h4>〇、Vue中不能使用箭头函数地方</h4>
<p><strong>1、生命周期函数中不能使用箭头函数</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9e4M?w=1246&amp;h=278" src="https://static.alili.tech/img/bV9e4M?w=1246&amp;h=278" alt="图片描述" title="图片描述"></span></p>
<p><strong>2、data函数不能使用箭头函数</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9e5M?w=1220&amp;h=252" src="https://static.alili.tech/img/bV9e5M?w=1220&amp;h=252" alt="图片描述" title="图片描述"></span></p>
<p><strong>3、watch中不能使用箭头函数</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9e6A?w=1246&amp;h=272" src="https://static.alili.tech/img/bV9e6A?w=1246&amp;h=272" alt="图片描述" title="图片描述"></span></p>
<p><strong>4、methods中不能使用箭头函数</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9e6P?w=1244&amp;h=252" src="https://static.alili.tech/img/bV9e6P?w=1244&amp;h=252" alt="图片描述" title="图片描述"></span></p>
<p><strong>5、computed不能使用箭头函数</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9fuE?w=1242&amp;h=332" src="https://static.alili.tech/img/bV9fuE?w=1242&amp;h=332" alt="图片描述" title="图片描述"></span></p>
<h4>一、全局配置</h4>
<p>Vue.config 是一个对象，包含 Vue 的全局配置，vue.config的配置全部在在main.js中设置的，如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV89Q6?w=1010&amp;h=866" src="https://static.alili.tech/img/bV89Q6?w=1010&amp;h=866" alt="图片描述" title="图片描述"></span></p>
<p>官网中给出的常用配置如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV89Pl?w=318&amp;h=598" src="https://static.alili.tech/img/bV89Pl?w=318&amp;h=598" alt="图片描述" title="图片描述"></span></p>
<p><strong>(1)、devtools</strong></p>
<pre><code>//用法
// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = true

//devtools可以通过开发环境配置
Vue.config.devTools = process.env.NODE_ENV !== 'production'
</code></pre>
<p>配置是否允许 vue-devtools 检查代码。开发版本默认为 true，生产版本默认为 false。生产版本设为 true 可以启用检查。</p>
<p><strong>(2)、errorHandler</strong></p>
<pre><code>//用法
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
}
</code></pre>
<blockquote>实例如下：</blockquote>
<p>首先在全局中配置errorHandler，并输出全部参数项。</p>
<p><span class="img-wrap"><img data-src="/img/bV893d?w=1474&amp;h=1048" src="https://static.alili.tech/img/bV893d?w=1474&amp;h=1048" alt="图片描述" title="图片描述"></span></p>
<p>然后，在组件中的beforeCreate周期时调用methods中的方法，这样操作肯定会报错</p>
<p><span class="img-wrap"><img data-src="/img/bV893w?w=496&amp;h=396" src="https://static.alili.tech/img/bV893w?w=496&amp;h=396" alt="图片描述" title="图片描述"></span></p>
<p>最后，得到的报错信息如下：（这样是我们通过errorHandler抓到的错误信息啦，so easy ~~~）</p>
<p><span class="img-wrap"><img data-src="/img/bV893g?w=1436&amp;h=450" src="https://static.alili.tech/img/bV893g?w=1436&amp;h=450" alt="图片描述" title="图片描述"></span></p>
<p><strong><code>注意：info 是 Vue 特定的错误信息，比如错误所在的生命周期钩子，即控制台中显示的：“@@@ beforeCreate hook" </code></strong></p>
<p><strong>(3)、productionTip</strong></p>
<p>对于开发版本，会默认向控制台打印：</p>
<p><span class="img-wrap"><img data-src="/img/bV9bcX?w=1434&amp;h=156" src="https://static.alili.tech/img/bV9bcX?w=1434&amp;h=156" alt="图片描述" title="图片描述"></span></p>
<pre><code>//设置为false就不会提示了
Vue.config.productionTip = false;
</code></pre>
<p><strong>(4)、performance</strong></p>
<pre><code>
//通过环境配置 performance是否可用
Vue.config.performance = process.env.NODE_ENV !== 'production'
</code></pre>
<p>Chrome需要安装插件：</p>
<p><span class="img-wrap"><img data-src="/img/bV9bqt?w=1132&amp;h=774" src="https://static.alili.tech/img/bV9bqt?w=1132&amp;h=774" alt="图片描述" title="图片描述"></span></p>
<p>通过插件Vue performance可以看到每个组件的时间分配：</p>
<p><span class="img-wrap"><img data-src="/img/bV9bq4?w=2570&amp;h=398" src="https://static.alili.tech/img/bV9bq4?w=2570&amp;h=398" alt="图片描述" title="图片描述"></span></p>
<p>描述：</p>
<pre><code>Init：在beforeCreate和created周期花费的总时长。
Render: 在js中创建实例的时长。
Patch: 页面渲染的时长。
</code></pre>
<h4>二、全局API</h4>
<blockquote>
<strong>定义：</strong><br> 全局API并不在构造器里，而是先声明全局变量或者直接在Vue上定义一些新功能，Vue内置了一些全局API，简而言之就是，在构造器外部用Vue提供给我们的API函数来定义新的功能。</blockquote>
<p><strong><code>1、Vue.extend用于创建一个子类Vue,用$mount来挂载</code></strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9fvj?w=678&amp;h=470" src="https://static.alili.tech/img/bV9fvj?w=678&amp;h=470" alt="图片描述" title="图片描述"></span></p>
<blockquote>注意：Vue.extend()中的data是函数。</blockquote>
<p><strong><code>2、Vue.nextTick([callback,context])在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的DOM。</code></strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9goR?w=844&amp;h=699" src="https://static.alili.tech/img/bV9goR?w=844&amp;h=699" alt="图片描述" title="图片描述"></span></p>
<p><strong><code>3、Vue.set( target, key, value) :设置对象的属性，确保属性被创建后是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。</code></strong></p>
<blockquote>Vue.set为什么存在？原因：由于Javascript的限制，Vue不能自动检测以下变动的数组。改变下标的时候vue不能再检测到。因此Vue.set可以检测到并更新视图。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV9gEZ?w=586&amp;h=652" src="https://static.alili.tech/img/bV9gEZ?w=586&amp;h=652" alt="图片描述" title="图片描述"></span></p>
<blockquote>注意：（1）、普通方式直接改属性值，数据并不会更新，DOM也不会更新。</blockquote>
<pre><code>//普通方式如下
methods：{
    setFunction (){
        //这种修改方式,控制台通过Vue扩展工具不能得到最新的data.
        this.arr[0] = '北京紫禁城'
    }
}
</code></pre>
<blockquote>（2）、Vue 不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property)。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上。<br>即Vue.set 不能直接在给data添加新的属性，只能在data已有属性上进行嵌套。</blockquote>
<p><strong><code>4、Vue.delete(target,key):删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制。</code></strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9haZ?w=630&amp;h=653" src="https://static.alili.tech/img/bV9haZ?w=630&amp;h=653" alt="图片描述" title="图片描述"></span></p>
<p><strong><code>5、Vue.delete(target,key):删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制。</code></strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9haZ?w=630&amp;h=653" src="https://static.alili.tech/img/bV9haZ?w=630&amp;h=653" alt="图片描述" title="图片描述"></span></p>
<p><strong><code>6、Vue. directive :注册全局指令</code></strong></p>
<blockquote>定义的指令中 "el" 属性指所绑定的元素，可以用来直接操作DOM。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV9kH0?w=629&amp;h=215" src="https://static.alili.tech/img/bV9kH0?w=629&amp;h=215" alt="图片描述" title="图片描述"></span></p>
<p><strong>bind：只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9kJk?w=504&amp;h=466" src="https://static.alili.tech/img/bV9kJk?w=504&amp;h=466" alt="图片描述" title="图片描述"></span></p>
<p><strong>inserted:被绑定元素插入父节点是调用（父节点存在即可调用，不必存在于document中）。【插入完之后调用】</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9kKK?w=504&amp;h=462" src="https://static.alili.tech/img/bV9kKK?w=504&amp;h=462" alt="图片描述" title="图片描述"></span></p>
<p><strong>update:被绑定元素所在模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。【常用】</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9kYn?w=732&amp;h=813" src="https://static.alili.tech/img/bV9kYn?w=732&amp;h=813" alt="图片描述" title="图片描述"></span></p>
<p><strong>componentUpdated：被绑定元素所在模板完成一次更新周期时调用。</strong></p>
<p><strong>unbind: 只调用一次， 指令与元素解绑时调用。</strong></p>
<p><strong><code>7、Vue.filter注册全局过滤器</code></strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9la2?w=583&amp;h=701" src="https://static.alili.tech/img/bV9la2?w=583&amp;h=701" alt="图片描述" title="图片描述"></span></p>
<p><strong>过滤器可以管道式链接过滤，管道符："|"</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9lew?w=560&amp;h=650" src="https://static.alili.tech/img/bV9lew?w=560&amp;h=650" alt="图片描述" title="图片描述"></span></p>
<p><strong><code>8、Vue.component注册全局组件</code></strong></p>
<blockquote>全局注册的组件可以在多个构造器中使用，但是局部注册的组件只能在组件注册的作用域里进行使用，其他作用域使用无效。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV9lpj?w=656&amp;h=866" src="https://static.alili.tech/img/bV9lpj?w=656&amp;h=866" alt="图片描述" title="图片描述"></span></p>
<blockquote>从代码中你可以看出，局部注册其实就是写在构造器。但是需要注意，构造器里的components 是加s的，而全局注册是不加s的。</blockquote>
<p><strong><code>9、Vue.use安装Vue插件</code></strong></p>
<p>比如：使用vue-router,首先npm install vue-router --save-dev,然后在main.js文件中通过import引入vue,vue-router模块和需要使用的组件，必须通过Vue.use()安装相应功能，如：Vue.use(VueRouter)。</p>
<p><span class="img-wrap"><img data-src="/img/bV9lsU?w=501&amp;h=352" src="https://static.alili.tech/img/bV9lsU?w=501&amp;h=352" alt="图片描述" title="图片描述"></span></p>
<p><strong><code>10、Vue.version获取安装的Vue版本号</code></strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9lwF?w=591&amp;h=417" src="https://static.alili.tech/img/bV9lwF?w=591&amp;h=417" alt="图片描述" title="图片描述"></span></p>
<p><strong><code>11、Vue.compile</code></strong><br><strong><code>12、Vue.mixin</code></strong></p>
<h4>三、选项/数据</h4>
<p><strong>1、data 数据</strong></p>
<pre><code>//直接创建一个实例
var vm = new Vue({
    //data为对象
    data:{a:1}
})

//Vue.extend中data是函数
var myVue = Vue.extend({
    data:function(){
        return{a:1}
    }
})

//vue-cli搭建的项目中单个组件的data是函数
&lt;template&gt;
    &lt;div class="one"&gt;
        &lt;h1&gt;我是："{{"msg"}}"&lt;/h1&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  name: "One",
  data() {
    return {
      msg: "One"
    };
  }
};
&lt;/script&gt;
&lt;style scoped&gt;
    *{ margin:0; }
&lt;/style&gt;
</code></pre>
<p><strong>2、props : 父传子信息</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV9msy?w=505&amp;h=598" src="https://static.alili.tech/img/bV9msy?w=505&amp;h=598" alt="图片描述" title="图片描述"></span></p>
<p><strong>3、propsData </strong></p>
<p>propsData在实际开发中我们使用的并不多，我们在后边会学到Vuex的应用，他的作用就是在单页应用中保持状态和数据的。</p>
<p><strong>4、computed</strong></p>
<blockquote>computed有 get和 set属性</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV9naN?w=717&amp;h=895" src="https://static.alili.tech/img/bV9naN?w=717&amp;h=895" alt="图片描述" title="图片描述"></span></p>
<p><strong>5、methods</strong></p>
<blockquote>定义方法</blockquote>
<p><strong>6、watch</strong></p>
<blockquote>watch 监听data属性变化</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV9nhl?w=680&amp;h=1002" src="https://static.alili.tech/img/bV9nhl?w=680&amp;h=1002" alt="图片描述" title="图片描述"></span></p>
<h4>四、选项/DOM</h4>
<p><strong>1、el</strong></p>
<p>为实例提供挂载元素</p>
<p><strong>2、template</strong></p>
<blockquote>模版三种方法:</blockquote>
<p>(1)、直接在构造器的template中编写，其中，模板的标识符使用的是tab键上的键：``</p>
<pre><code>var app=new Vue({
 el:'#app',
 data:{
     message:'hello Vue!'
  },
 template:`&lt;h1 style="color:red"&gt;我是选项模板&lt;/h1&gt;`
})</code></pre>
<p>(2)、写在&lt;Template&gt;标签里的模板：</p>
<pre><code>&lt;template id="demo2"&gt;
   &lt;h2 style="color:red"&gt;我是template标签模板&lt;/h2&gt;
&lt;/template&gt;
&lt;script type="text/javascript"&gt;
    var app=new Vue({
        el:'#app',
        data:{
            message:'hello Vue!'
        },
        template:'#demo2'
    })
&lt;/script&gt;</code></pre>
<p>（3）、script标签模板：</p>
<pre><code> &lt;script type="x-template" id="demo3"&gt;
    &lt;h2 style="color:red"&gt;我是script标签模板&lt;/h2&gt;
&lt;/script&gt;
&lt;script type="text/javascript"&gt;
    var app=new Vue({
        el:'#app',
        data:{
            message:'hello Vue!'
        },
        template:'#demo3'
    })
&lt;/script&gt;
</code></pre>
<p><strong>3、render</strong></p>
<p>官方文档：<a href="https://vuefe.cn/v2/guide/render-function.html" rel="nofollow noreferrer">https://vuefe.cn/v2/guide/ren...</a></p>
<p>（1）、 createElement参数：{String | Object | Function}，string必选。基础用法如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV9Fbe?w=521&amp;h=569" src="https://static.alili.tech/img/bV9Fbe?w=521&amp;h=569" alt="图片描述" title="图片描述"></span></p>
<p>得到的前端页面结构如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV9Fb9?w=478&amp;h=278" src="https://static.alili.tech/img/bV9Fb9?w=478&amp;h=278" alt="图片描述" title="图片描述"></span></p>
<p>（2）、Object参数，可选</p>
<pre><code>&lt;body&gt;
    &lt;div id="app"&gt;
        &lt;elem&gt;&lt;/elem&gt;
    &lt;/div&gt;
    &lt;script&gt;
        Vue.component("elem", {
            render: function (createElement) {
                return createElement("strong", 
                //设置object对象中包含的属性
                {
                    // 和 `v-bind:class` 的 API 相同
                    "class": {
                        foo: true,
                        bar: false
                    },
                    // 和 `v-bind:style` 的 API 相同
                    style: {
                        color: "red",
                        fontSize: "20px"
                    },
                    // 普通的 HTML 属性
                    attrs: {
                        id: "foo"
                    },
                    // DOM 属性
                    domProps: {
                        innerHTML: "我是测试，我是测试，我是测试"
                    }
                })
            }
        });
        new Vue({
            el: "#app"
        })
    &lt;/script&gt;
&lt;/body&gt;</code></pre>
<p>这样得到的结果如下：（标签属性值已设置）</p>
<p><span class="img-wrap"><img data-src="/img/bV9Fim?w=1634&amp;h=634" src="https://static.alili.tech/img/bV9Fim?w=1634&amp;h=634" alt="图片描述" title="图片描述"></span></p>
<p>（3）、createElement函数构建而成的数组</p>
<pre><code>&lt;body&gt;
    &lt;div id="app"&gt;
        &lt;elem&gt;&lt;/elem&gt;
    &lt;/div&gt;
    &lt;script&gt;
        Vue.component("elem", {
            render: function (createElement) {
                 //使用字符串生成文本节点
                // return createElement('div', '文本');
                return createElement("div", 
                    //由createElement函数构建而成的数组
                    [
                        //createElement函数返回VNode对象
                        createElement("h1", "主标题"),
                        createElement("h2", "副标题")
                    ])
            }
        });
        new Vue({
            el: "#app"
        })
    &lt;/script&gt;
&lt;/body&gt;</code></pre>
<p>这样得到的结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV9Fro?w=480&amp;h=796" src="https://static.alili.tech/img/bV9Fro?w=480&amp;h=796" alt="图片描述" title="图片描述"></span></p>
<p>（4）、两种组件写法</p>
<p><span class="img-wrap"><img data-src="/img/bV9Fxq?w=1586&amp;h=1590" src="https://static.alili.tech/img/bV9Fxq?w=1586&amp;h=1590" alt="图片描述" title="图片描述"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue官方文档——详解

## 原文链接
[https://segmentfault.com/a/1190000014542373](https://segmentfault.com/a/1190000014542373)

