---
title: '好用的Vue状态管理模式：浅谈Vuet在实际应用中解决的问题' 
date: 2019-01-03 2:30:11
hidden: true
slug: 8kgw62s7sl2
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">父子组件通信</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010761687" src="https://static.alili.tech/img/remote/1460000010761687" alt="Alt text" title="Alt text" style="cursor: pointer; display: inline;"></span></p>
<p>Vuet提供了模块化的状态管理，通过对一个组件的注入，再向其子组件进行分发，使得我们可以在任何一个子组件，通过模块的方法对当前模块的状态进行更新，再由和vuet连接的父组件对子组件进行单向数据流动。这样我们就可以轻易的解决了父子组件的通信问题，也使得状态测试变得异常简单。</p>
<h3 id="articleHeader1">状态测试</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

    import test from 'ava'
    
    // 假设这是我们应用程序的代码 start
    import Vue from 'vue'
    import Vuet from 'vuet'
    
    Vue.use(Vuet)
    
    const vuet = new Vuet({
        modules: {
            test: {
                data() {
                    return {
                        count: 0
                    }
                },
                plus() {
                    this.count++
                },
                delay() {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            this.count = 1000
                            resolve()
                        }, 100)
                    })
                }
            }
        }
    })
    
    new Vue({
        vuet
    })
    // 假设这是我们应用程序的代码 end
    
    // 接下来我们可以写vuet的状态测试
    test('test', async t => {
        const vtm = vuet.getModule('test')
    
        t.is(vtm.count, 0)
    
        vtm.plus()
        t.is(vtm.count, 1)
    
        await vtm.delay()
        t.is(vtm.count, 1000)
    })


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">

    <span class="hljs-keyword">import</span> test <span class="hljs-keyword">from</span> <span class="hljs-string">'ava'</span>
    
    <span class="hljs-comment">// 假设这是我们应用程序的代码 start</span>
    <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
    <span class="hljs-keyword">import</span> Vuet <span class="hljs-keyword">from</span> <span class="hljs-string">'vuet'</span>
    
    Vue.use(Vuet)
    
    <span class="hljs-keyword">const</span> vuet = <span class="hljs-keyword">new</span> Vuet({
        <span class="hljs-attr">modules</span>: {
            <span class="hljs-attr">test</span>: {
                data() {
                    <span class="hljs-keyword">return</span> {
                        <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
                    }
                },
                plus() {
                    <span class="hljs-keyword">this</span>.count++
                },
                delay() {
                    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
                        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                            <span class="hljs-keyword">this</span>.count = <span class="hljs-number">1000</span>
                            resolve()
                        }, <span class="hljs-number">100</span>)
                    })
                }
            }
        }
    })
    
    <span class="hljs-keyword">new</span> Vue({
        vuet
    })
    <span class="hljs-comment">// 假设这是我们应用程序的代码 end</span>
    
    <span class="hljs-comment">// 接下来我们可以写vuet的状态测试</span>
    test(<span class="hljs-string">'test'</span>, <span class="hljs-keyword">async</span> t =&gt; {
        <span class="hljs-keyword">const</span> vtm = vuet.getModule(<span class="hljs-string">'test'</span>)
    
        t.is(vtm.count, <span class="hljs-number">0</span>)
    
        vtm.plus()
        t.is(vtm.count, <span class="hljs-number">1</span>)
    
        <span class="hljs-keyword">await</span> vtm.delay()
        t.is(vtm.count, <span class="hljs-number">1000</span>)
    })


</code></pre>
<p>上面是一个简单的状态测试的例子，在实际项目中，还应该包含很多http请求，我们可以使用<code>axios</code>模块来和服务器进行交互，好处就是它也支持在node环境中运行，这样我们编写http请求相关的状态测试变成了可能。在如今版本快递迭代的大环境中，写测试几乎变成了一种很稀罕的事情，前端的测试更是少之又少。往往一个页面中，又拆分成很多子组件，这使得测试的工作量成指数级增长，面临着需求的频繁改动而无能为力。而Vuet的状态测试更类似于单元测试，和组件的依赖较低，组件只会存在调用Vuet模块的方法或者读取状态，在组件频繁的改动中，而Vuet的改动相对会较小，所以状态测试便会存在一定的价值。</p>
<h3 id="articleHeader2">规则</h3>
<p>在生活中，我们每天都会进行着一些重复的工作，比如每天起床之后都会刷牙、洗脸、吃早餐，这些重复而单调的工作，在Vuet中则可以教给<code>规则</code>来处理。<br>比如：<br>页面url发生改变，重新请求一下数据，<br>模块的状态发生变化时，使用<code> localStorage</code>做持久化处理，<br>组件初始化时，请求一下数据，<br>组件销毁时，重置一下状态，<br>每隔一段时间，帮我请求一下数据，<br>等等......<br>我们可以将这些简单重复的工作，封装成一个规则，然后可以使用这个规则去更新模块的状态</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="


    export default {
      rule ({ path }) {
        return {
          destroyed () {
            this.$vuet.getModule(path).reset()
          }
        }
      }
    }

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">


    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      rule ({ path }) {
        <span class="hljs-keyword">return</span> {
          destroyed () {
            <span class="hljs-keyword">this</span>.$vuet.getModule(path).reset()
          }
        }
      }
    }

</code></pre>
<p>上面是一个非常简单的例子，它的工作就是在组件销毁时，重置模块的状态，以节省内存的占用。如果需要，我们还可以优化这个规则，在组件初始化时从<code>localStorage</code>中还原状态，在组件销毁时使用<code>localStorage</code>存储状态，然后在重置状态。</p>
<h3 id="articleHeader3">总结</h3>
<p>Vuet可以很好的解决了Vue.js中组件通信的问题，而且合理的运用规则，可以让我们事半功倍。<br>Vuet官网：<a href="https://github.com/medatc/vuet" rel="nofollow noreferrer" target="_blank">传送门</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
好用的Vue状态管理模式：浅谈Vuet在实际应用中解决的问题

## 原文链接
[https://segmentfault.com/a/1190000010761682](https://segmentfault.com/a/1190000010761682)

