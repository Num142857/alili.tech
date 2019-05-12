---
title: 'Vue 初始化性能优化' 
date: 2019-02-04 2:30:57
hidden: true
slug: vlrq7c9zm39
categories: [reprint]
---

{{< raw >}}

                    
<p>原文： <a href="https://github.com/Coffcer/Blog/issues/3" rel="nofollow noreferrer" target="_blank">https://github.com/Coffcer/Bl...</a></p>
<h2 id="articleHeader0">前言</h2>
<p>一般来说，你不需要太关心vue的运行时性能，它在运行时非常快，但付出的代价是初始化时相对较慢。在最近开发的一个Hybrid APP里，Android Webview初始化一个较重的vue页面竟然用了1200ms ~ 1400ms，这让我开始重视vue的初始化性能，并最终优化到200 ~ 300ms，这篇文章分享我的优化思路。</p>
<h2 id="articleHeader1">性能瓶颈在哪里？</h2>
<p>先看一下常见的vue写法：在html里放一个app组件，app组件里又引用了其他的子组件，形成一棵以app为根节点的组件树。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <app></app> 
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">app</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>而正是这种做法引发了性能问题，要初始化一个父组件，必然需要先初始化它的子组件，而子组件又有它自己的子组件。那么要初始化根标签<code>&lt;app&gt;</code>，就需要从底层开始冒泡，将页面所有组件都初始化完。所以我们的页面会在所有组件都初始化完才开始显示。</p>
<p>这个结果显然不是我们要的，更好的结果是页面可以从上到下按顺序流式渲染，这样可能总体时间增长了，但首屏时间缩减，在用户看来，页面打开速度就更快了。</p>
<p>要实现这种渲染模式，我总结了下有3种方式实现。第3种方式是我认为最合适的，也是我在项目中实际使用的优化方法。</p>
<h2 id="articleHeader2">第一种：不使用根组件</h2>
<p>这种方式非常简单，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
    <A></A>
    <B></B>
    <C></C>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">A</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">A</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">B</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">B</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">C</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">C</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p>抛弃了根组件<code>&lt;app&gt;</code>，从而使A、B、C每一个组件初始化完都立刻展示。但根组件在SPA里是非常必要的，所以这种方式只适用小型页面。</p>
<h2 id="articleHeader3">第二种：异步组件</h2>
<p>异步组件在官方文档已有说明，使用非常简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<app>
    <A></A>
    <B></B>
</app>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">app</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">A</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">A</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">B</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">B</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">app</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    components: {
        A: { /*component-config*/ },
        B (resolve) {
            setTimeout(() => {
                resolve({ /*component-config*/ })
            }, 0);
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">components</span>: {
        <span class="hljs-attr">A</span>: { <span class="hljs-comment">/*component-config*/</span> },
        B (resolve) {
            setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                resolve({ <span class="hljs-comment">/*component-config*/</span> })
            }, <span class="hljs-number">0</span>);
        }
    }
})</code></pre>
<p>这里<code>&lt;B&gt;</code>组件是一个异步组件，会等到手动调用resolve函数时才开始初始化，而父组件<code>&lt;app&gt;</code>也不必等待<code>&lt;B&gt;</code>先初始化完。</p>
<p>我们利用setTimeout(fn, 0)将<code>&lt;B&gt;</code>的初始化放在队列最后，结果就是页面会在<code>&lt;A&gt;</code>初始化完后立刻显示，然后再显示<code>&lt;B&gt;</code>。如果你的页面有几十个组件，那么把非首屏的组件全设成异步组件，页面显示速度会有明显的提升。</p>
<p>你可以封装一个简单的函数来简化这个过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function deferLoad (component, time = 0) {
    return (resolve) => {
        window.setTimeout(() => resolve(component), time)
    };
}

new Vue({
    components: {
        B: deferLoad( /*component-config*/ ),
        // 100ms后渲染
        C: deferLoad( /*component-config*/, 100 )
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">deferLoad</span> (<span class="hljs-params">component, time = <span class="hljs-number">0</span></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
        <span class="hljs-built_in">window</span>.setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve(component), time)
    };
}

<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">components</span>: {
        <span class="hljs-attr">B</span>: deferLoad( <span class="hljs-comment">/*component-config*/</span> ),
        <span class="hljs-comment">// 100ms后渲染</span>
        C: deferLoad( <span class="hljs-comment">/*component-config*/</span>, <span class="hljs-number">100</span> )
    }
})</code></pre>
<p>看起来很美好，但这种方式也有问题，考虑下这样的结构:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<app>
    <title></title>
    <A></A>
    <title></title>
    <B></B>
    <title></title>
    <C></C>
</app>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">app</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">A</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">A</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">B</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">B</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">C</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">C</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">app</span>&gt;</span></code></pre>
<p>还是按照上面的异步组件做法，这时候就需要考虑把哪些组件设成异步的了。如果把A、B、C都设成异步的，那结果就是3个<code>&lt;title&gt;</code>会首先渲染出来，页面渲染的过程在用户看来非常奇怪，并不是预期中的从上到下顺序渲染。</p>
<h2 id="articleHeader4">第三种：v-if 和 terminal指令</h2>
<p>这是我推荐的一种做法，简单有效。还是那个结构，我们给要延迟渲染的组件加上v-if：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<app>
    <A></A>
    <B v-if=&quot;showB&quot;></B>
    <C v-if=&quot;showC&quot;></C>
</app>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">app</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">A</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">A</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">B</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"showB"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">B</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">C</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"showC"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">C</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">app</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    data: {
        showB: false,
        showC: false
    },
    created () {
        // 显示B
        setTimeout(() => {
            this.showB = true;
        }, 0);
        // 显示C
        setTimeout(() => {
            this.showC = true;
        }, 0);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">showB</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">showC</span>: <span class="hljs-literal">false</span>
    },
    created () {
        <span class="hljs-comment">// 显示B</span>
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>.showB = <span class="hljs-literal">true</span>;
        }, <span class="hljs-number">0</span>);
        <span class="hljs-comment">// 显示C</span>
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>.showC = <span class="hljs-literal">true</span>;
        }, <span class="hljs-number">0</span>);
    }
});</code></pre>
<p>这个示例写起来略显啰嗦，但它已经实现了我们想要的顺序渲染的效果。页面会在A组件初始化完后显示，然后再按顺序渲染其余的组件，整个页面渲染方式看起来是流式的。</p>
<p>有些人可能会担心<code>v-if</code>存在一个编译/卸载过程，会有性能影响。但这里并不需要担心，因为<code>v-if</code>是惰性的，只有当第一次值为true时才会开始初始化。</p>
<p>这种写法看起来很麻烦，如果我们能实现一个类似<code>v-if</code>的组件，然后直接指定多少秒后渲染，那就更好了，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<app>
    <A></A>
    <B v-lazy=&quot;0&quot;></B>
    <C v-lazy=&quot;100&quot;></C>
</app>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">app</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">A</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">A</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">B</span> <span class="hljs-attr">v-lazy</span>=<span class="hljs-string">"0"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">B</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">C</span> <span class="hljs-attr">v-lazy</span>=<span class="hljs-string">"100"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">C</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">app</span>&gt;</span></code></pre>
<p>一个简单的指令即可，不需要js端任何配合，并且可以用在普通dom上面，Nice！</p>
<p>在vue里，类似<code>v-if</code>和<code>v-for</code>这种是terminal指令，会在指令内部编译组件。如果你想要自己实现一个terminal指令，需要加上<code>terminal: true</code>，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.directive('lazy', {
    terminal: true,
    bind () {},
    update () {},
    unbind () {}
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Vue.directive(<span class="hljs-string">'lazy'</span>, {
    <span class="hljs-attr">terminal</span>: <span class="hljs-literal">true</span>,
    bind () {},
    update () {},
    unbind () {}
});</code></pre>
<p>这是vue在1.0.19+新增的功能，由于比较冷门，文档也没有特别详细的叙述，最好的方式是参照着<code>v-if</code>和<code>v-for</code>的源码来写。</p>
<p>我已经为此封装了一个terminal指令，你可以直接使用：<br><a href="https://github.com/Coffcer/vue-lazy-component" rel="nofollow noreferrer" target="_blank">https://github.com/Coffcer/vu...</a></p>
<h2 id="articleHeader5">其他的优化点</h2>
<p>除了组件上的优化，我们还可以对vue的依赖改造入手。初始化时，vue会对data做getter、setter改造，在现代浏览器里，这个过程实际上挺快的，但仍然有优化空间。</p>
<p><code>Object.freeze()</code>是ES5新增的API，用来冻结一个对象，禁止对象被修改。vue 1.0.18+以后，不会对已冻结的data做getter、setter转换。</p>
<p>如果你确保某个data不需要跟踪依赖，可以使用Object.freeze将其冻结。但请注意，被冻结的是对象的值，你仍然可以将引用整个替换调。看下面例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p v-for=&quot;item in list&quot;>"{{" item.value "}}"</p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in list"</span>&gt;</span>"{{" item.value "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
    data: {
        // vue不会对list里的object做getter、setter绑定
        list: Object.freeze([
            { value: 1 },
            { value: 2 }
        ])
    },
    created () {
        // 界面不会有响应
        this.list[0].value = 100;

        // 下面两种做法，界面都会响应
        this.list = [
            { value: 100 },
            { value: 200 }
        ];
        this.list = Object.freeze([
            { value: 100 },
            { value: 200 }
        ]);
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">data</span>: {
        <span class="hljs-comment">// vue不会对list里的object做getter、setter绑定</span>
        list: <span class="hljs-built_in">Object</span>.freeze([
            { <span class="hljs-attr">value</span>: <span class="hljs-number">1</span> },
            { <span class="hljs-attr">value</span>: <span class="hljs-number">2</span> }
        ])
    },
    created () {
        <span class="hljs-comment">// 界面不会有响应</span>
        <span class="hljs-keyword">this</span>.list[<span class="hljs-number">0</span>].value = <span class="hljs-number">100</span>;

        <span class="hljs-comment">// 下面两种做法，界面都会响应</span>
        <span class="hljs-keyword">this</span>.list = [
            { <span class="hljs-attr">value</span>: <span class="hljs-number">100</span> },
            { <span class="hljs-attr">value</span>: <span class="hljs-number">200</span> }
        ];
        <span class="hljs-keyword">this</span>.list = <span class="hljs-built_in">Object</span>.freeze([
            { <span class="hljs-attr">value</span>: <span class="hljs-number">100</span> },
            { <span class="hljs-attr">value</span>: <span class="hljs-number">200</span> }
        ]);
    }
})</code></pre>
<h2 id="articleHeader6">后记</h2>
<p>vue 1.0+ 的组件其实不算轻量，初始化一个组件包括依赖收集、转换等过程，但其实有些是可以放在编译时提前完成的。vue 2.0+ 已经在这方面做了不少的改进：分离了编译时和运行时、提供函数组件等，可以预见，vue 2.0的性能将有很大的提升。</p>
<p>v-lazy-component: <a href="https://github.com/Coffcer/vue-lazy-component" rel="nofollow noreferrer" target="_blank">https://github.com/Coffcer/vu...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 初始化性能优化

## 原文链接
[https://segmentfault.com/a/1190000006893428](https://segmentfault.com/a/1190000006893428)

