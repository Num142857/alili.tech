---
title: '关于Vue.js2.0生命周期的研究与理解' 
date: 2019-01-07 2:30:11
hidden: true
slug: ca0ouhz2l3v
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>写在前面：进行一些项目实践的时候，总会涉及到关于生命周期钩子或多或少的使用。因此觉得有必要单独梳理一下相关的知识点，如有理解错误的地方恳请告知修改。</p></blockquote>
<h3 id="articleHeader0">总体感知</h3>
<p>首先贴一张Vue文档给出的生命周期图示，并添加了一些注释<br><span class="img-wrap"><img data-src="/img/remote/1460000010336183" src="https://static.alili.tech/img/remote/1460000010336183" alt="lifecycle.fw.png" title="lifecycle.fw.png" style="cursor: pointer; display: inline;"></span><br>Vue2.0的生命周期钩子一共有10个，同样结合官方文档作出了下表</p>
<table>
<thead><tr>
<th>生命周期钩子</th>
<th>详细</th>
</tr></thead>
<tbody>
<tr>
<td>beforeCreate</td>
<td>在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。</td>
</tr>
<tr>
<td>created</td>
<td>实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。</td>
</tr>
<tr>
<td>beforeMount</td>
<td>在挂载开始之前被调用：相关的 render 函数首次被调用。</td>
</tr>
<tr>
<td>mounted</td>
<td>el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。</td>
</tr>
<tr>
<td>beforeUpdate</td>
<td>数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。</td>
</tr>
<tr>
<td>updated</td>
<td>由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。</td>
</tr>
<tr>
<td>activated</td>
<td>keep-alive 组件激活时调用。</td>
</tr>
<tr>
<td>deactivated</td>
<td>keep-alive 组件停用时调用。</td>
</tr>
<tr>
<td>beforeDestroy</td>
<td>实例销毁之前调用。在这一步，实例仍然完全可用。</td>
</tr>
<tr>
<td>destroyed</td>
<td>Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。</td>
</tr>
</tbody>
</table>
<p>（除了beforeCreate和created钩子之外，其他钩子均在服务器端渲染期间不被调用。）</p>
<h3 id="articleHeader1">实际操作</h3>
<p>我们来可视化的观察一下生命周期钩子函数执行时状态变化的情况</p>
<blockquote><p>测试过程基于以下代码执行，引入vue.js后可直接执行</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
    <script src=&quot;./vue.js&quot;></script>
</head>
<body>
<div id=&quot;app&quot;>
    <p>"{{"message"}}"</p>
    <keep-alive>
        <my-components msg=&quot;hello&quot; v-if=&quot;show&quot;></my-components>
    </keep-alive>
</div>
</body>
<script>
    var child = {
        template: '<div>from child: "{{"msg"}}"</div>',
        props: ['msg'],
        data: function () {
            return {
                childMsg: 'child'
            };
        },
        deactivated: function () {
            console.log('component deactivated!');
        },
        activated: function () {
            console.log('component activated');
        }
    };
    var app = new Vue({
        el: '#app',
        data: function () {
            return {
                message: 'father',
                show: true
            };
        },
        beforeCreate: function () {
            console.group('beforeCreate 创建前状态===============》');
            var state = {
                'el': this.$el,
                'data': this.$data,
                'message': this.message
            }
            console.log(state);
        },
        created: function () {
            console.group('created 创建完毕状态===============》');
            var state = {
                'el': this.$el,
                'data': this.$data,
                'message': this.message
            }
            console.log(state);
        },
        beforeMount: function () {
            console.group('beforeMount 挂载前状态===============》');
            var state = {
                'el': this.$el,
                'data': this.$data,
                'message': this.message
            }
            console.log(this.$el);
            console.log(state);
        },
        mounted: function () {
            console.group('mounted 挂载结束状态===============》');
            var state = {
                'el': this.$el,
                'data': this.$data,
                'message': this.message
            }
            console.log(this.$el);
            console.log(state);
            // this.message = 'change';
        },
        beforeUpdate: function () {
            console.group('beforeUpdate 更新前状态===============》');
            var state = {
                'el': this.$el,
                'data': this.$data,
                'message': this.message
            }
            console.log(this.$el);
            console.log(state);
            // this.message = 'change2';
        },
        updated: function () {
            console.group('updated 更新完成状态===============》');
            var state = {
                'el': this.$el,
                'data': this.$data,
                'message': this.message
            }
            console.log(this.$el);
            console.log(state);
        },
        beforeDestroy: function () {
            console.group('beforeDestroy 销毁前状态===============》');
            var state = {
                'el': this.$el,
                'data': this.$data,
                'message': this.message
            }
            console.log(this.$el);
            console.log(state);
        },
        destroyed: function () {
            console.group('destroyed 销毁完成状态===============》');
            var state = {
                'el': this.$el,
                'data': this.$data,
                'message': this.message
            }
            console.log(this.$el);
            console.log(state);
        },
        components: {
            'my-components': child
        }
    });
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{"message"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">my-components</span> <span class="hljs-attr">msg</span>=<span class="hljs-string">"hello"</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"show"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-components</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> child = {
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;from child: "{{"msg"}}"&lt;/div&gt;'</span>,
        <span class="hljs-attr">props</span>: [<span class="hljs-string">'msg'</span>],
        <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">childMsg</span>: <span class="hljs-string">'child'</span>
            };
        },
        <span class="hljs-attr">deactivated</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'component deactivated!'</span>);
        },
        <span class="hljs-attr">activated</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'component activated'</span>);
        }
    };
    <span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
        <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">message</span>: <span class="hljs-string">'father'</span>,
                <span class="hljs-attr">show</span>: <span class="hljs-literal">true</span>
            };
        },
        <span class="hljs-attr">beforeCreate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'beforeCreate 创建前状态===============》'</span>);
            <span class="hljs-keyword">var</span> state = {
                <span class="hljs-string">'el'</span>: <span class="hljs-keyword">this</span>.$el,
                <span class="hljs-string">'data'</span>: <span class="hljs-keyword">this</span>.$data,
                <span class="hljs-string">'message'</span>: <span class="hljs-keyword">this</span>.message
            }
            <span class="hljs-built_in">console</span>.log(state);
        },
        <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'created 创建完毕状态===============》'</span>);
            <span class="hljs-keyword">var</span> state = {
                <span class="hljs-string">'el'</span>: <span class="hljs-keyword">this</span>.$el,
                <span class="hljs-string">'data'</span>: <span class="hljs-keyword">this</span>.$data,
                <span class="hljs-string">'message'</span>: <span class="hljs-keyword">this</span>.message
            }
            <span class="hljs-built_in">console</span>.log(state);
        },
        <span class="hljs-attr">beforeMount</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'beforeMount 挂载前状态===============》'</span>);
            <span class="hljs-keyword">var</span> state = {
                <span class="hljs-string">'el'</span>: <span class="hljs-keyword">this</span>.$el,
                <span class="hljs-string">'data'</span>: <span class="hljs-keyword">this</span>.$data,
                <span class="hljs-string">'message'</span>: <span class="hljs-keyword">this</span>.message
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(state);
        },
        <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'mounted 挂载结束状态===============》'</span>);
            <span class="hljs-keyword">var</span> state = {
                <span class="hljs-string">'el'</span>: <span class="hljs-keyword">this</span>.$el,
                <span class="hljs-string">'data'</span>: <span class="hljs-keyword">this</span>.$data,
                <span class="hljs-string">'message'</span>: <span class="hljs-keyword">this</span>.message
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(state);
            <span class="hljs-comment">// this.message = 'change';</span>
        },
        <span class="hljs-attr">beforeUpdate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'beforeUpdate 更新前状态===============》'</span>);
            <span class="hljs-keyword">var</span> state = {
                <span class="hljs-string">'el'</span>: <span class="hljs-keyword">this</span>.$el,
                <span class="hljs-string">'data'</span>: <span class="hljs-keyword">this</span>.$data,
                <span class="hljs-string">'message'</span>: <span class="hljs-keyword">this</span>.message
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(state);
            <span class="hljs-comment">// this.message = 'change2';</span>
        },
        <span class="hljs-attr">updated</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'updated 更新完成状态===============》'</span>);
            <span class="hljs-keyword">var</span> state = {
                <span class="hljs-string">'el'</span>: <span class="hljs-keyword">this</span>.$el,
                <span class="hljs-string">'data'</span>: <span class="hljs-keyword">this</span>.$data,
                <span class="hljs-string">'message'</span>: <span class="hljs-keyword">this</span>.message
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(state);
        },
        <span class="hljs-attr">beforeDestroy</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'beforeDestroy 销毁前状态===============》'</span>);
            <span class="hljs-keyword">var</span> state = {
                <span class="hljs-string">'el'</span>: <span class="hljs-keyword">this</span>.$el,
                <span class="hljs-string">'data'</span>: <span class="hljs-keyword">this</span>.$data,
                <span class="hljs-string">'message'</span>: <span class="hljs-keyword">this</span>.message
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(state);
        },
        <span class="hljs-attr">destroyed</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.group(<span class="hljs-string">'destroyed 销毁完成状态===============》'</span>);
            <span class="hljs-keyword">var</span> state = {
                <span class="hljs-string">'el'</span>: <span class="hljs-keyword">this</span>.$el,
                <span class="hljs-string">'data'</span>: <span class="hljs-keyword">this</span>.$data,
                <span class="hljs-string">'message'</span>: <span class="hljs-keyword">this</span>.message
            }
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el);
            <span class="hljs-built_in">console</span>.log(state);
        },
        <span class="hljs-attr">components</span>: {
            <span class="hljs-string">'my-components'</span>: child
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>首先来梳理一下结构：<br>1.我们创建了一个Vue根实例命名为app，将其挂载到页面id为app的dom元素上。<br>2.局部注册的一个组件child并在根实例中将其注册使其可以在根实例的作用域中使用。<br>3.将子组件用&lt;keep-alive&gt; 包裹，为接下来的测试作准备。<br>在谷歌浏览器打开开发者工具，开始测试！</p>
<h4>create 和 mounted 相关</h4>
<p>测试效果图如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010336184" src="https://static.alili.tech/img/remote/1460000010336184" alt="test1.jpg" title="test1.jpg" style="cursor: pointer;"></span><br>根据测试结果，可以看出</p>
<blockquote><p>1.beforeCreate执行时：data和el均未初始化，值为undefined</p></blockquote>
<p>2.created执行时：Vue 实例观察的数据对象data已经配置好，已经可以得到app.message的值，但Vue 实例使用的根 DOM 元素el还未初始化<br>3.beforeMount执行时：data和el均已经初始化，但从"{{"message"}}"等现象可以看出此时el并没有渲染进数据，el的值为“虚拟”的元素节点<br>4.mounted执行时：此时el已经渲染完成并挂载到实例上</p>
<h4>activated 和 destroyed相关</h4>
<p>  在前面的测试图中，我们发现了activated周期钩子已经被触发，这是因为子组件my-components被&lt;keep-alive&gt; 包裹，随el的挂载触发。<br>  现在我们将此组件停用进行测试：由于子组件具有一个v-if指令v-if="show"，因此我们可以通过将show的值置为false将其销毁。<br>  控制台输入 app.show = false;测试结果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010336185" src="https://static.alili.tech/img/remote/1460000010336185" alt="test2.jpg" title="test2.jpg" style="cursor: pointer;"></span></p>
<blockquote><p>由于在这里我们修改了data的值，所以会触发beforeUpdate和updated钩子，这里先不讨论这一组钩子，我们看到deactivated钩子已经触发，表示&lt;keep-alive&gt;已经停用，符合预期结果。</p></blockquote>
<p>  </p>
<p>现在我们对Vue实例进行销毁，调用app.$destroy()方法即可将其销毁，控制台测试如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010336186" src="https://static.alili.tech/img/remote/1460000010336186" alt="test3.jpg" title="test3.jpg" style="cursor: pointer;"></span></p>
<blockquote><p>我们发现实例依然存在，但是此时变化已经发生在了其他地方，根据官方文档描述：Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。</p></blockquote>
<p>继续测试，现在修改 data中的数据查看结果，如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010336187" src="https://static.alili.tech/img/remote/1460000010336187" alt="test4.jpg" title="test4.jpg" style="cursor: pointer;"></span></p>
<blockquote><p>这里我们将data中的message属性改成了'world'，发现dom并没有进行相应的响应，这证实了之前的说法。同样，如果你在子组件也加入destroyed钩子，发现该钩子也会被触发，这也证明了子实例也会被一起销毁。这里的销毁并不指代'抹去'，而是表示'解绑'。</p></blockquote>
<h4>updated相关</h4>
<p>beforeUpdate和updated是最后一对周期钩子了。<br>为了能看出测试的具体效果，我们需要在原来的代码上添加两行代码：</p>
<blockquote><p>在c钩子和updated钩子中分别加上</p></blockquote>
<p><code>console.log('beforeUpdate == ' + document.getElementsByTagName('p')[0].innerHTML);</code></p>
<p>控制台输入app.message = 'abc';效果如下：<br><span class="img-wrap"><img data-src="/img/remote/1460000010336188" src="https://static.alili.tech/img/remote/1460000010336188" alt="test5.jpg" title="test5.jpg" style="cursor: pointer;"></span></p>
<blockquote><p>我们发现beforeUpdate和updated触发时，el中的数据都已经渲染完成，但根据beforeUpdate == father而updated == abc可知，只有updated钩子被调用时候，组件dom才被更新。</p></blockquote>
<h3 id="articleHeader2">一些应用的想法</h3>
<ol>
<li><p>在created钩子中可以对data数据进行操作，这个时候可以进行ajax请求将返回的数据赋给data</p></li>
<li><p>在mounted钩子对挂载的dom进行操作</p></li>
<li><p>在使用vue-router时有时需要使用&lt;keep-alive&gt;&lt;/keep-alive&gt;来缓存组件状态，这个时候created钩子就不会被重复调用了，如果我们的子组件需要在每次加载的时候进行某些操作，可以使用activated钩子触发。</p></li>
</ol>
<h3 id="articleHeader3">结尾</h3>
<p>到这里已经总结完成了，感觉只有理解的生命周期钩子的使用，才能更好配合其他方法事件使用。如果您发现错误的地方，请告诉我及时修改，谢谢！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于Vue.js2.0生命周期的研究与理解

## 原文链接
[https://segmentfault.com/a/1190000010336178](https://segmentfault.com/a/1190000010336178)

