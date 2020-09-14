---
title: 'Webpack实战 - 使用动态 entry 改善调试体验' 
date: 2019-01-28 2:30:09
hidden: true
slug: axs4rl6n4jf
categories: [reprint]
---

{{< raw >}}

                    
<p>本文相关代码已经存放在 <a href="https://github.com/boycgit/demos/blob/master/dynamic-entry" rel="nofollow noreferrer" target="_blank">dynamic-entry</a>，可自行下载使用</p>
<h2 id="articleHeader0">0. 多入口 (复习)</h2>
<p>webpack 的优势不言而喻，因此在实际应用中我们也常常使用它调试 <strong>多入口</strong> 应用，所谓 <strong>多入口</strong> 是指多个HTML页面会使用多个入口文件，在官方教程 <a href="https://webpack.github.io/docs/multiple-entry-points.html" rel="nofollow noreferrer" target="_blank">MULTIPLE ENTRY POINTS</a> 介绍了如何配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    entry: {
        a: &quot;./a&quot;,
        b: &quot;./b&quot;,
        c: [&quot;./c&quot;, &quot;./d&quot;]
    },
    output: {
        path: path.join(__dirname, &quot;dist&quot;),
        filename: &quot;[name].entry.js&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">a</span>: <span class="hljs-string">"./a"</span>,
        <span class="hljs-attr">b</span>: <span class="hljs-string">"./b"</span>,
        <span class="hljs-attr">c</span>: [<span class="hljs-string">"./c"</span>, <span class="hljs-string">"./d"</span>]
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">"dist"</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">"[name].entry.js"</span>
    }
}</code></pre>
<p>这里指定了 3 个入口文件，打包之后分别会在 <strong>dist</strong> 文件夹中生成 3 个打包之后的 js 文件：<strong>a.entry.js</strong>、<strong>b.entry.js</strong>、<strong>c.entry.js</strong>，可被至少 3 个不同的 HTML 页面直接引用；</p>
<p>上述是最基本的使用，实际中还可以使用 <a href="https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks" rel="nofollow noreferrer" target="_blank">multiple-commons-chunks</a> 等提高打包的速度、性能；</p>
<h2 id="articleHeader1">1. 动态 entry 的场景</h2>
<p>像上面那样直接应用 Webpack 的多入口功能，在普通的工程项目中并不存在什么问题，还简单高效；</p>
<p>然而如果你使用 Webpack 构建较大型的页面系统，遂着业务的扩大，入口的数量会逐渐增多，<strong>纵使每个入口文件都很小，在调试的时候等所有的入口文件都 ready 所耗费的时间也是非常巨大的，让用户等待太久显然很不友好</strong>；</p>
<p>用户等待时间随着模块数量而线性增加（见下图）：</p>
<p><span class="img-wrap"><img data-src="https://gw.alicdn.com/tps/TB1nxJpPXXXXXbJaXXXXXXXXXXX-1462-158.png" src="https://static.alili.techhttps://gw.alicdn.com/tps/TB1nxJpPXXXXXbJaXXXXXXXXXXX-1462-158.png" alt="等待时间随着模块数量的增加而线性增加" title="等待时间随着模块数量的增加而线性增加" style="cursor: pointer; display: inline;"></span></p>
<p>假设业务模块有100个，而当前自己仅仅需要调试 A 模块，如果使用默认的多模块入口方式，用户 <strong>必须等这100个模块启动之后才能调试 A 模块</strong>，很明显这会让用户抓狂；</p>
<p>比较合理的做法是，无论当前用户模块目录下有多少个模块，默认都只其构建一个模块，当用户想要调试另外一个模块的时候，再动态添加一个 entry 到 webpack 系统中，<strong>这就减少了用户等待的时间，提高了调试时的用户体验</strong>；</p>
<p><span class="img-wrap"><img data-src="https://gw.alicdn.com/tps/TB1u30sPXXXXXbIaXXXXXXXXXXX-1462-235.png" src="https://static.alili.techhttps://gw.alicdn.com/tps/TB1u30sPXXXXXbIaXXXXXXXXXXX-1462-235.png" alt="使用动态entry" title="使用动态entry" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">2. 实现动态 entry 的原理</h2>
<p>目前业界并没有现成的动态 entry 方案，需要自己分析 webpack 源码找到解决方案；（如果不清楚 webpack 流程的，可以参考 @七珏 同学的 <a href="http://taobaofed.org/blog/2016/09/09/webpack-flow/" rel="nofollow noreferrer" target="_blank">细说webpack之流程篇</a>）</p>
<p>2.1、先分析 webpack 源码中处理单入口的 entry 情况，在 <code>WebpackOptionsApply.js</code> 有：</p>
<p><span class="img-wrap"><img data-src="https://img.alicdn.com/tps/TB1rxSxOpXXXXb4XXXXXXXXXXXX-957-109.png" src="https://static.alili.techhttps://img.alicdn.com/tps/TB1rxSxOpXXXXb4XXXXXXXXXXXX-957-109.png" alt="WebpackOptionsApply" title="WebpackOptionsApply" style="cursor: pointer;"></span></p>
<ul>
<li>这里首先是加载 <strong>EntryOptionPlugin.js</strong> 然后触发添加 entry 入口</li>
<li>然后触发 <strong>entry-option</strong> 事件节点，将 <code>context</code> 和 <code>entry</code> 作为参数传入</li>
</ul>
<p>2.2、 继续看 <strong>EntryOptionPlugin.js</strong> 文件，在 <strong>entry-option</strong> 事件节点中调用 <code>SingleEntryPlugin</code> 构造函数构建单入口模块：</p>
<p><span class="img-wrap"><img data-src="https://img.alicdn.com/tps/TB1ga9iOpXXXXa6aXXXXXXXXXXX-604-357.png" src="https://static.alili.techhttps://img.alicdn.com/tps/TB1ga9iOpXXXXa6aXXXXXXXXXXX-604-357.png" alt="构建单入口模块" title="构建单入口模块" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>我们可以依样画葫芦，利用官方的 <code>SingleEntryPlugin</code> 的对象来完成动态添加入口的功能。</p>
<ol>
<li>我们像平常那样创建单入口文件配置文件</li>
<li>依据 <code>webpack(config)</code> 获取 <strong>compiler</strong> 实例；</li>
<li>然后调用 <code>compiler.apply(new SingleEntryPlugin(process.cwd(),...);</code> 新增一个构建入口</li>
<li>通知 webpack 让新入口生效</li>
</ol>
<h2 id="articleHeader3">3. 示例</h2>
<blockquote>本节的代码放在仓库 <a href="https://github.com/boycgit/dynamic-entry" rel="nofollow noreferrer" target="_blank">dynamic-entry</a> 中，可以到下载获取</blockquote>
<p>这里我们以 express 框架为例，讲解如何实现动态 entry ；具体操作步骤如下：</p>
<ol>
<li>下载 dynamic-entry 代码：<code>git clone https://github.com/boycgit/dynamic-entry</code>
</li>
<li><code>cd dynamic-entry &amp;&amp; npm install &amp;&amp; node server.js</code></li>
<li>启动 web 服务（可访问 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000 ），默认只会构建一个 <strong>src/index1.js</strong>
</li>
</ol>
<p><span class="img-wrap"><img data-src="http://ww3.sinaimg.cn/large/006tNbRwgw1fa0ocmyu8pj30ez0340sx.jpg" src="https://static.alili.techhttp://ww3.sinaimg.cn/large/006tNbRwgw1fa0ocmyu8pj30ez0340sx.jpg" alt="默认构建单个" title="默认构建单个" style="cursor: pointer; display: inline;"></span></p>
<ol><li>然后访问 <code>http://localhost:3000/add</code>，再去看命令行，你会发现现在会构建 <strong>src/index1.js</strong> 和 <strong>src/index2.js</strong> 这两个文件，这就是所谓的动态 entry</li></ol>
<p><span class="img-wrap"><img data-src="http://ww4.sinaimg.cn/large/006tNbRwgw1fa0odz4c2dj30f0041t92.jpg" src="https://static.alili.techhttp://ww4.sinaimg.cn/large/006tNbRwgw1fa0odz4c2dj30f0041t92.jpg" alt="动态entry" title="动态entry" style="cursor: pointer;"></span></p>
<p>简要分析一下源码，在 <strong>server.js</strong> 中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
var SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
var webpackDevMiddleware = require('webpack-dev-middleware');

...

var webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, webpackDevMiddlewareParam);
app.use(webpackDevMiddlewareInstance); // 应用针对 express 框架的 webpack 调试中间件

...

var once = true;
// 新增入口
app.get('/add', function(req, res) {
  // 应用单入口插件
  console.log('apply SingleEntryPlugin');
  compiler.apply(new SingleEntryPlugin(process.cwd(), './src/index2.js','index2'));
  once &amp;&amp; webpackDevMiddlewareInstance.invalidate(); // 强制重新构建一次，不用调用多次，后续的触发由webpack自己 hot reload
  once = false; // 置 once 就是 false
  res.send('already apply SingleEntryPlugin');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-params">...</span>
<span class="hljs-built_in">var</span> SingleEntryPlugin = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack/lib/SingleEntryPlugin'</span>);
<span class="hljs-built_in">var</span> webpackDevMiddleware = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>);

<span class="hljs-params">...</span>

<span class="hljs-built_in">var</span> webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, webpackDevMiddlewareParam);
app.use(webpackDevMiddlewareInstance); <span class="hljs-comment">// 应用针对 express 框架的 webpack 调试中间件</span>

<span class="hljs-params">...</span>

<span class="hljs-built_in">var</span> once = <span class="hljs-literal">true</span>;
<span class="hljs-comment">// 新增入口</span>
app.get(<span class="hljs-string">'/add'</span>, function(req, res) {
  <span class="hljs-comment">// 应用单入口插件</span>
  console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'apply SingleEntryPlugin'</span>);
  compiler.apply(<span class="hljs-literal">new</span> SingleEntryPlugin(process.cwd(), <span class="hljs-string">'./src/index2.js'</span>,<span class="hljs-string">'index2'</span>));
  once &amp;&amp; webpackDevMiddlewareInstance.invalidate(); <span class="hljs-comment">// 强制重新构建一次，不用调用多次，后续的触发由webpack自己 hot reload</span>
  once = <span class="hljs-literal">false</span>; <span class="hljs-comment">// 置 once 就是 false</span>
  res.send(<span class="hljs-string">'already apply SingleEntryPlugin'</span>);
});</code></pre>
<ul>
<li>这里用到了 <a href="https://github.com/webpack/webpack-dev-middleware" rel="nofollow noreferrer" target="_blank">webpack-dev-middleware</a> 模块，是 webpack 调试用的 express 中间件，它提供调试时候将构建的文件输出到文件系统，可以让用户访问获取；</li>
<li>注册 <code>/add</code> 路由，当用户访问此页面的时候会调用 <code>compiler.apply</code> <strong>新增一个构建入口</strong>
</li>
<li>调用 <code>webpackDevMiddlewareInstance.invalidate()</code> <strong>强制 webpack 重新构建一次</strong>，这个方法只需要调用1次（因此这儿由 <code>once</code> 变量进行控制），后续的触发由webpack自己 hot reload</li>
</ul>
<p>从上面的过程可见，动态 entry 实施的过程是借鉴 webpack 自身的 <strong>SingleEntryPlugin</strong> 插件进行的，在可靠性方面有很大的保障；其余的代码则是借用现有的 express 中间件获取所需要的 <code>compiler</code> 等对象协助此过程；</p>
<h2 id="articleHeader4">4. 总结</h2>
<p>目前动态 entry 之后已经运用在若干个内部构建器中，在应用动态 entry 之后，明显地改善了用户体验；</p>
<p>此篇文章希望能给有类似场景的同学提供帮助；</p>
<h2 id="articleHeader5">5. 参考文章</h2>
<ul>
<li><a href="https://webpack.github.io/docs/multiple-entry-points.html" rel="nofollow noreferrer" target="_blank">MULTIPLE ENTRY POINTS</a></li>
<li><a href="http://taobaofed.org/blog/2016/09/09/webpack-flow/" rel="nofollow noreferrer" target="_blank">细说webpack之流程篇</a></li>
<li><a href="https://lihuanghe.github.io/2016/05/30/webpack-source-analyse.html" rel="nofollow noreferrer" target="_blank">webpack 源码解析</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack实战 - 使用动态 entry 改善调试体验

## 原文链接
[https://segmentfault.com/a/1190000008055046](https://segmentfault.com/a/1190000008055046)

