---
title: 'Vue 组件通信的解决方案' 
date: 2019-01-09 2:30:11
hidden: true
slug: 890j1ohj2dv
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">数据通信</h2>
<p>首先, 我们通常说数据传递, 组件通信什么什么的, 我认为可以分成两种场景:</p>
<ul>
<li><p>页面和页面之间</p></li>
<li><p>组件和组件之间</p></li>
</ul>
<h2 id="articleHeader1">通信方案</h2>
<p>不管什么场景, 在使用 Vue 的时候, 一般我们有下面 5 种选择去实现数据通信.</p>
<ol>
<li><p>vuex</p></li>
<li><p>storage</p></li>
<li><p>props</p></li>
<li><p>event</p></li>
<li><p>URL queryString</p></li>
</ol>
<h2 id="articleHeader2">选择通信方案</h2>
<p>我们在选择通信方案的时候, 比如说确定 列表页如何把每一项的 id 传递给 详情页的时候, <br>一般要考虑什么问题? 你是直接全套都是 vuex, 还是说喜欢使用 sessionStorage?</p>
<p>一般我们要考虑下面的几个问题:</p>
<ol>
<li><p>页面是否可以刷新</p></li>
<li><p>页面是否可以分享 (或者说URL 是否要求 RESTful)</p></li>
<li><p>数据更新之后, 所有使用此数据的组件是否都需要响应更新</p></li>
</ol>
<h2 id="articleHeader3">分析</h2>
<p>先说 '页面和页面之间的通信场景', 首先上面的 5 种方案, 我们可选的有:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vuex, storage, URL queryString.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code>vuex, storage, URL <span class="hljs-keyword">query</span>String.
</code></pre>
<p>然后分析一下, 每一种方案, 它对上面的 3个问题, 是不是很好的解决掉了:<br>备注:<br>页面通信场景不会要求实时响应, 因为就算下个页面的确是实时响应, 你也看不见, <br>所以主要看 '刷新' 和 '分享'</p>
<p>vuex: 不能刷新, 不能分享<br>storage: 不能分享<br>url: 能刷新, 能分享</p>
<p>这样看来, url queryString 的方式是 '页面通信场景' 中的最佳选择, 但是我依旧有疑虑:</p>
<ol>
<li><p>我始终觉得把跳转信息, 暴露给用户, 是很不好的事情; (心理问题, 可以克服)</p></li>
<li><p>url 的长度限制;  这个无所谓的, 2k, 你再怎么传递, 我都不会觉得你会出现超过 2k 的情况</p></li>
<li><p>url 需要拼接, 这个拼接是否麻烦?   也不麻烦, 只是对象转字符串.</p></li>
<li><p>这样每个页面都需要在进入的时候先解析一下 queryString, 这样是不是增加了麻烦的程度<br>   也可以通过 mixins 来操作. 聚合到 mixins, 况且也不一定很多.</p></li>
</ol>
<p>所以我们可以选择 'url queryString' 作为 '页面和页面通信场景' 中的通信方案. <br>以后你就可以这样用了:</p>
<p>比如列表页面跳转到详情页要带一个 id</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.$router.push({
        path: 'detail',
        query: {
            id
        }
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-keyword">this</span>.$router.push({
        <span class="hljs-attr">path</span>: <span class="hljs-string">'detail'</span>,
        <span class="hljs-attr">query</span>: {
            id
        }
    })</code></pre>
<p>你的 url 会始终长这样:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://abc.com/#/?id=123
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>http<span class="hljs-variable">s:</span>//<span class="hljs-keyword">abc</span>.<span class="hljs-keyword">com</span>/#/?id=<span class="hljs-number">123</span>
</code></pre>
<p>备注: 如果你的页面不能刷新和分享, 你完全可以三种方案随便选, 爱谁谁. </p>
<p>重点: url queryString 的方式, 有一个问题解决不了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="从详情页到订单页, 通过 queryString 带了商品信息过来, 假设此时 url 长这样:
    order/?goods=xxx
订单页面有一个收货地址栏, 点击可以进入地址编辑页面, 此时的 url 不会带参数的(你可以试试带一下看多麻烦)
    address-edit/
地址编辑页面有一个保存按钮, 点击会返回到订单页面
    order/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>从详情页到订单页, 通过 queryString 带了商品信息过来, 假设此时 url 长这样:
    <span class="hljs-keyword">order</span>/?goods=xxx
订单页面有一个收货地址栏, 点击可以进入地址编辑页面, 此时的 url 不会带参数的(你可以试试带一下看多麻烦)
    address-<span class="hljs-keyword">edit</span>/
地址编辑页面有一个保存按钮, 点击会返回到订单页面
    <span class="hljs-keyword">order</span>/
</code></pre>
<p>so, url queryString 丢了. </p>
<p>我目前的解决方案: <br>针对这种存在多入口的页面, 一定要在进入它的第一时间, 先把 queryString 存起来. <br>并且做如下判断:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (// 存在 queryString) {
    // use queryString
} else {
    // use storage
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">if</span> (<span class="hljs-comment">// 存在 queryString) {</span>
    <span class="hljs-comment">// use queryString</span>
} <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// use storage</span>
}
</code></pre>
<p>但是这种方式还是搞不定 从地址编辑页返回到订单页, 用户此时分享订单页, 分享出去的玩意肯定会是错的.</p>
<hr>
<p>现在来说下 '组件和组件之间的通信场景'<br>上面的 5 种方案, 可以选择 vuex, event, props, storage</p>
<p>先看下 刷新, 分享和实时响应<br>vuex, 不能刷新<br>event, props 能刷新能分享<br>storage 不能分享 &amp; 实时. </p>
<p>解释: <br>为什么 vuex 在这里还是不能刷新<br>因为如果使用的 state 里面的值是其他页面设置的而不是 init 就存在的, 刷新丢值.<br>为什么 event, props 可以做到防刷新防分享<br>因为这两个玩意是程序运行它就生效的, 它也可以做到实时更新. <br>storage 虽然在存的时候有一个事件, 但是这太 trick 了. </p>
<p>所以我们选择的是 event, props?</p>
<p>分析一下吧. <br>组件通信可以分成两种, 父子, 同辈.</p>
<p>父子之间呢:<br>父传子: props<br>子传父: $emit(event)</p>
<p>这就是 'props down, events up';</p>
<p>但是其实还有:<br>父传子: this.$refs.xxx<br>子传父: this.$parent.xxx</p>
<p>还有: 自定义 v-model</p>
<p>还有: 让 props 是一个对象. </p>
<p>同辈之间: event-bus.</p>
<p>所以这就完了? 啥都没有了? 嗯, 就这样.</p>
<h2 id="articleHeader4">思考</h2>
<ol>
<li>
<p>关于 vuex 的应用场景的考虑<br>不是应该所有的组件, 路由之间的数据传递都应该通过 vuex, 当同时存在两种方式可以选择的时候,选择 vuex 的唯一理由只有一个:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="需要响应式的状态" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">需要响应式的状态</code></pre>
<p>why?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="因为 vuex 虽然有辅助函数, 但是用起来还是要 引入, 定义. 而且真的是一刷新页面就挂了. " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">因为 vuex 虽然有辅助函数, 但是用起来还是要 引入, 定义. 而且真的是一刷新页面就挂了. </code></pre>
</li>
<li><p>可以通过监听 beforeunload 事件, 在其中缓存 state, 然后在 onload 事件再恢复, 这样可以避免掉vuex 的丢值.</p></li>
<li><p>没有必要追求全项目统一的一种通信方式, 理论上你不考虑刷新分享, 全项目都用 vuex, 什么事情也不会有的.</p></li>
<li><p>vuex 是状态管理, 不是保存常量的地方.</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 组件通信的解决方案

## 原文链接
[https://segmentfault.com/a/1190000010162012](https://segmentfault.com/a/1190000010162012)

