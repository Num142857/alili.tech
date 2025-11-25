---
title: '从零开始搭建vue-ssr系列之六：一个完整的Vue-SSR项目' 
date: 2019-01-13 2:30:11
hidden: true
slug: bi4y6q5ygcm
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>怎么取数据?</blockquote>
<ul>
<li>我们首先得先通过node端来获取数据, 然后放到vuex里面保存起来, 放到Context中, 达到前后端共享数据的目的</li>
<li>在<code>server-index.js</code>中, 增加如下代码:</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.axios.get('http://localhost:5000/data').then((response) => {
    // 获取数据
    const list = response.data.data.liveWodList
    // 把数据存到Vuex里面
    store.commit(LIST.GET_DATA, list)
    // 把state存放到context中
    context.state = store.state
    resolve(app)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Vue<span class="hljs-selector-class">.axios</span><span class="hljs-selector-class">.get</span>(<span class="hljs-string">'http://localhost:5000/data'</span>).then((response) =&gt; {
    <span class="hljs-comment">// 获取数据</span>
    const list = response<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.liveWodList</span>
    <span class="hljs-comment">// 把数据存到Vuex里面</span>
    store.commit(LIST<span class="hljs-selector-class">.GET_DATA</span>, list)
    <span class="hljs-comment">// 把state存放到context中</span>
    context<span class="hljs-selector-class">.state</span> = store<span class="hljs-selector-class">.state</span>
    resolve(app)
})</code></pre>
<ul><li>在<code>/src/index.js</code>(也就是client的入口文件中), 增加如下代码:</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.__INITIAL_STATE__) {
    store.replaceState(<span class="hljs-built_in">window</span>.__INITIAL_STATE__)
}</code></pre>
<ul><li>通过以上步骤, 数据就已经在前后端共存了</li></ul>
<blockquote>编译</blockquote>
<ul><li>在实际生产中, 我们会用<code>webpack</code>的插件<code>vue-ssr-webpack-plugin</code>来生成<code>build/vue-ssr-bundle.json</code>文件, webpack配置文件如下:</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new VueSSRPlugin({
        filename: './build/vue-ssr-bundle.json'
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">plugins:</span> [
    <span class="hljs-keyword">new</span> VueSSRPlugin({
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">'./build/vue-ssr-bundle.json'</span>
    })
]</code></pre>
<ul>
<li>在<code>/server.js</code>中我们动态的读取<code>build/vue-ssr-bundle.json</code>, 生成html字符串, 返回到前端. 这里我们会用到<code>createBundleRenderer</code>函数的别外一个参数, 该方法的第一个参数是上面的<code>bundle.json</code>文件, 第二个参数是一个对象, 我们用的是<code>{template:'xxx'}</code>, 这个template的值为通过Client打包生成的HTML文件, 再通过node读取, 传递到参数中, <strong>注意:该HTML必须包含<code>&lt;!--vue-ssr-outlet--&gt;</code></strong>, 这个<code>createBundleRenderer</code>函数把这行代码替换成HTML.</li>
<li>至此, 真正的<code>Vue-ssr</code>就搭建完成了!!</li>
</ul>
<h4><a href="https://github.com/sunhaikuo/vue-ssr-4" rel="nofollow noreferrer" target="_blank">码上GitHub</a></h4>
<hr>
<blockquote>Vue-SSR系列目录</blockquote>
<p><a href="https://segmentfault.com/a/1190000009352740">从零开始搭建vue-ssr系列之一：写在前面的话</a></p>
<p><a href="https://segmentfault.com/a/1190000009372772" target="_blank">从零开始搭建vue-ssr系列之二：纯client端渲染以及webpack2+vue2注意事项</a></p>
<p><a href="https://segmentfault.com/a/1190000009373793">从零开始搭建vue-ssr系列之三：服务器渲染的奥秘</a></p>
<p><a href="https://segmentfault.com/a/1190000009452832" target="_blank">从零开始搭建vue-ssr系列之四：Vuex详解</a></p>
<p><a href="https://segmentfault.com/a/1190000009510509">从零开始搭建vue-ssr系列之五：开始第一个简单的server-render</a></p>
<p><a href="https://segmentfault.com/a/1190000009554693" target="_blank">从零开始搭建vue-ssr系列之六：一个完整的Vue-SSR项目</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始搭建vue-ssr系列之六：一个完整的Vue-SSR项目

## 原文链接
[https://segmentfault.com/a/1190000009554693](https://segmentfault.com/a/1190000009554693)

