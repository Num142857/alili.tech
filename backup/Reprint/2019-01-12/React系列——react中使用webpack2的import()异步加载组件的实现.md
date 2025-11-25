---
title: 'React系列——react中使用webpack2的import()异步加载组件的实现' 
date: 2019-01-12 2:30:24
hidden: true
slug: 9nl40hbsqrp
categories: [reprint]
---

{{< raw >}}

                    
<p>你还在用require.ensure()？？？</p>
<p>low了！！</p>
<p>import()的大名听过没？？</p>
<p>下面隆重介绍webpack代码切割新方案。</p>
<p>官网教程在这里：<a href="https://doc.webpack-china.org/guides/code-splitting-async/#system-import-" rel="nofollow noreferrer" target="_blank"></a><a href="https://doc.webpack-china.org/guides/code-splitting-async/#system-import-" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<p><strong>先别去看官网教程，因为webpack官网教程通常都比较不靠谱，写的云里雾里。</strong></p>
<p>webpack中，从v1到v2，v3暂且不提，一共有3种代码切割加载的方案。</p>
<p>1、System.import()； 已废除，不推荐</p>
<p>2、require.ensure()； v1和v2均可使用</p>
<p>3、import()；v2支持，v1不支持</p>
<h4>System.import()</h4>
<p>已废除，就不做介绍了</p>
<h4>require.ensure()</h4>
<p>从v1时代，使用过webpack的同学对这种用法应该不会陌生，比较网上可以搜到很多关于require.ensure()的用法的demo。</p>
<p>在百度输入require.ensure()，搜到几个关键的教程。</p>
<p><a href="http://www.css88.com/doc/webpack2/guides/code-splitting-require/" rel="nofollow noreferrer" target="_blank">webpack2.2文档关于require.ensure使用的介绍</a></p>
<p>简单介绍下require.ensure的经典使用方法，你若是没用过，别担心，看下面的代码就足够了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Foo = require.ensure([], () => {
    require(&quot;a&quot;);
}, err => {
    console.error(&quot;We failed to load chunk: &quot; + err);
}, &quot;chunk-name&quot;);

//react-router2 or 3
<Route path=&quot;/xx&quot; getComponent={Foo} />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> Foo = <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">require</span>(<span class="hljs-string">"a"</span>);
}, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"We failed to load chunk: "</span> + err);
}, <span class="hljs-string">"chunk-name"</span>);

<span class="hljs-comment">//react-router2 or 3</span>
&lt;Route path=<span class="hljs-string">"/xx"</span> getComponent={Foo} /&gt;
</code></pre>
<h4>import()</h4>
<p>这是我们今天的主角，使用场景是react-router4，你会发现在react-router4中，route的getComponent不见了。</p>
<p>怎么办，这时候你可以去看一下最上面给你的官方代码切割教程，列举了3种使用情况。</p>
<p>1、导入局部模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function determineDate() {
  import('moment').then(function(moment) {
    console.log(moment().format());
  }).catch(function(err) {
    console.log('Failed to load moment', err);
  });
}

determineDate();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">determineDate</span><span class="hljs-params">()</span> {</span>
  import(<span class="hljs-string">'moment'</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(moment)</span> {</span>
    console.<span class="hljs-built_in">log</span>(moment().format());
  }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err)</span> {</span>
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'Failed to load moment'</span>, err);
  });
}

determineDate();
</code></pre>
<p>2、导入整个模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import('./component').then(Component => /* ... */);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span>(<span class="hljs-string">'./component'</span>).then(<span class="hljs-function"><span class="hljs-params">Component</span> =&gt;</span> <span class="hljs-comment">/* ... */</span>);
</code></pre>
<p>3、使用await</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function determineDate() {
  const moment = await import('moment');
  return moment().format('LLLL');
}

determineDate().then(str => console.log(str));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">determineDate</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> moment = <span class="hljs-keyword">await</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">'moment'</span>);
  <span class="hljs-keyword">return</span> moment().format(<span class="hljs-string">'LLLL'</span>);
}

determineDate().then(<span class="hljs-function"><span class="hljs-params">str</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(str));
</code></pre>
<p>这3个官方例子都有一个共同点，那就是：import(name) -&gt; Promise</p>
<p>我们发现import()方法返回的是一个Promise，啥？Promise？有人会问，Promise咋了。我直接赋给变量就可以用了啊。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Foo = import(&quot;./xx&quot;) // 错误的写法

<Route path=&quot;/xx&quot; component={import(&quot;./xxx&quot;)} /> //错误的写法
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">const</span> Foo = <span class="hljs-keyword">import</span>(<span class="hljs-string">"./xx"</span>) <span class="hljs-comment">// 错误的写法</span>

&lt;Route path=<span class="hljs-string">"/xx"</span> component={<span class="hljs-keyword">import</span>(<span class="hljs-string">"./xxx"</span>)} /&gt; <span class="hljs-comment">//错误的写法</span>
</code></pre>
<p>少年，别太天真，Promise的返回值只能通过then()来读取，所以你会发现官方的3种使用场景全都是在then()里面操作，那怎么办？我想把import()获取到的组件赋给一个变量或常量。</p>
<p>通过我坚持不懈的chrome，终于发现了一个“惊天函数”。</p>
<p>懂行的人也许会问，react-router4官网文档不是有个<a href="https://reacttraining.cn/web/guides/code-splitting" rel="nofollow noreferrer" target="_blank">Bundle组件</a>可以实现代码切割吗？</p>
<p>是啊，官方的这个方法我复制过来使用了之后，一堆红色报错啊，被欺骗的❤️。</p>
<p>不废话，直接上可用代码。</p>
<p>1、asyncComponent函数（惊天函数）：函数很好理解，loadComponent参数表示需要代码切割的路径，函数返回值是一个react组件，组件内部帮你做好了then()方法的操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
export const asyncComponent = loadComponent => (
    class AsyncComponent extends React.Component {
        state = {
            Component: null,
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }

            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    this.setState({ Component });
                })
                .catch((err) => {
                    console.error(`Cannot load component in <AsyncComponent />`);
                    throw err;
                });
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const { Component } = this.state;
            return (Component) ? <Component {...this.props} /> : null;
        }
    }
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">export</span> const asyncComponent = loadComponent =&gt; (
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> {</span>
        state = {
            Component: <span class="hljs-literal">null</span>,
        }

        componentWillMount() {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.hasLoadedComponent()) {
                <span class="hljs-keyword">return</span>;
            }

            loadComponent()
                .<span class="hljs-keyword">then</span>(<span class="hljs-built_in">module</span> =&gt; <span class="hljs-built_in">module</span>.<span class="hljs-keyword">default</span>)
                .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(Component)</span> =&gt;</span> {
                    <span class="hljs-keyword">this</span>.setState({ Component });
                })
                .<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(err)</span> =&gt;</span> {
                    <span class="hljs-built_in">console</span>.error(`<span class="javascript">Cannot load component <span class="hljs-keyword">in</span> &lt;AsyncComponent /&gt;</span>`);
                    <span class="hljs-keyword">throw</span> err;
                });
        }

        hasLoadedComponent() {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.state.Component !== <span class="hljs-literal">null</span>;
        }

        render() {
            const { Component } = <span class="hljs-keyword">this</span>.state;
            <span class="hljs-keyword">return</span> (Component) ? &lt;Component {...<span class="hljs-keyword">this</span>.props} /&gt; : <span class="hljs-literal">null</span>;
        }
    }
);
</code></pre>
<p>2、在react中使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { asyncComponent } from './AsyncComponent'

const Foo = asyncComponent(() => import(/* webpackChunkName: &quot;foo&quot; */ &quot;./foo&quot;))

<Route path=&quot;/xx&quot; component={Foo} />
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { asyncComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">'./AsyncComponent'</span>

<span class="hljs-keyword">const</span> Foo = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-comment">/* webpackChunkName: "foo" */</span> <span class="hljs-string">"./foo"</span>))

&lt;Route path=<span class="hljs-string">"/xx"</span> component={Foo} /&gt;
</code></pre>
<p>3、好了，这样你就成功了，但是，请注意下面几个问题：</p>
<p><strong>webpack2的配置文件中，需要配置chunkName。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chunkFilename: '[name].js'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">chunkFilename:</span> <span class="hljs-string">'[name].js'</span>
</code></pre>
<p><strong>如果你的异步加载组件有导入样式，请把样式移植到全局js文件导入。</strong></p>
<p>好了，本文到此结束。</p>
<p>“小朋友，等等，你有demo吗？看文字我看不懂啊！”</p>
<p>我回头问道：“你想看demo？那就请看 <a href="https://github.com/hyy1115/react-redux-webpack2/blob/master/src/App.js" rel="nofollow noreferrer" target="_blank">二月的import()切割实现</a>，感兴趣可以持续关注，如果webpack出了更好的玩意，我会持续跟进应用到项目中。”</p>
<p><strong>如果文章对你有帮助，请点击一下推荐。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——react中使用webpack2的import()异步加载组件的实现

## 原文链接
[https://segmentfault.com/a/1190000009820646](https://segmentfault.com/a/1190000009820646)

