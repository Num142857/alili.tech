---
title: '从零开始搭建vue-ssr系列之五：开始第一个简单的server-render' 
date: 2019-01-14 2:30:07
hidden: true
slug: orojtutt8o
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>开始一个简单的server-render</blockquote>
<ul><li>客户端打包需要的文件是这个：<code>tools/webpack.js</code>，很显然，既然vue在服务端渲染，那就需要有一个服务器的webpack文件，所以有<code>tools</code>下面就多出一个<code>webpack.server.js</code>的文件，里面的内容很简单，如下：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
//  获取项目根目录
const projectRoot = path.resolve(__dirname, '..');
module.exports = {
    target: 'node', // 这里必须是node，因为打包完成的运行环境是node
    entry: path.join(projectRoot, 'src/server-index.js'),
    output: {
        libraryTarget: 'commonjs2', // !different
        // 打包出的路径
        path: path.join(projectRoot, 'build'),
        // 打包最终的文件名
        filename: 'bundle.server.js',
    },
    module: {
        // 因为使用webpack2，这里必须是rules，如果使用use， 
        // 会报个错：vue this._init is not a function
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: projectRoot,
                // 这里会把node_modules里面的东西排除在外，提高打包效率
                exclude: /node_modules/,
            }
        ]
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-comment">//  获取项目根目录</span>
<span class="hljs-keyword">const</span> projectRoot = path.resolve(__dirname, <span class="hljs-string">'..'</span>);
<span class="hljs-built_in">module</span>.exports = {
    target: <span class="hljs-string">'node'</span>, <span class="hljs-comment">// 这里必须是node，因为打包完成的运行环境是node</span>
    entry: path.join(projectRoot, <span class="hljs-string">'src/server-index.js'</span>),
    output: {
        libraryTarget: <span class="hljs-string">'commonjs2'</span>, <span class="hljs-comment">// !different</span>
        <span class="hljs-comment">// 打包出的路径</span>
        path: path.join(projectRoot, <span class="hljs-string">'build'</span>),
        <span class="hljs-comment">// 打包最终的文件名</span>
        filename: <span class="hljs-string">'bundle.server.js'</span>,
    },
    <span class="hljs-keyword">module</span>: {
        <span class="hljs-comment">// 因为使用webpack2，这里必须是rules，如果使用use， </span>
        <span class="hljs-comment">// 会报个错：vue this._init is not a function</span>
        rules: [{
                test: <span class="hljs-regexp">/\.vue$/</span>,
                loader: <span class="hljs-string">'vue-loader'</span>,
            },
            {
                test: <span class="hljs-regexp">/\.js$/</span>,
                loader: <span class="hljs-string">'babel-loader'</span>,
                include: projectRoot,
                <span class="hljs-comment">// 这里会把node_modules里面的东西排除在外，提高打包效率</span>
                exclude: <span class="hljs-regexp">/node_modules/</span>,
            }
        ]
    },
}</code></pre>
<p><strong>注：具体里面的功能，请看注释</strong></p>
<ul><li>有了这个webpack.server.js之后，里面的入口文件是<code>server-index.js</code>，和前端打包一样，服务端打包可得有一个入口文件，里面最主要的内容就是<strong>你要打包哪个.vue文件</strong>，里面的内容是</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这个文件里面除了定义入口的.vue，其他的都不用配置
import Vue from 'vue';
// 引入.vue入口文件
import App from './component/List.vue';
const app = new Vue(App);
// 你问我这块代码是啥意思，其实我也不知道，想要打包server端代码，这个代码块是必须的
// 以后会在这段代码里面加入其他一些配置信息
export default function (context) {
    return new Promise((resolve, reject) => {
        resolve(app);
    });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 这个文件里面除了定义入口的.vue，其他的都不用配置</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-comment">// 引入.vue入口文件</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./component/List.vue'</span>;
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue(App);
<span class="hljs-comment">// 你问我这块代码是啥意思，其实我也不知道，想要打包server端代码，这个代码块是必须的</span>
<span class="hljs-comment">// 以后会在这段代码里面加入其他一些配置信息</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
        resolve(app);
    });
};</code></pre>
<ul>
<li>现在你使用<code>webpack</code>来打包文件，在<code>build</code>目录下面会生成一个<code>bundle.server.js</code>文件，详见<code>tools/dev.js</code>
</li>
<li>
<p>接下来就是比较关健的一步了，如何把<code>bundle.server.js</code>里面的内容，转成HTML。这个项目里面，我们使用的express</p>
<ul>
<li>第一步：我们增加<code>app.get('/', function (req, resp) {...})</code>，这样我们就可以在访问localhost:5000时能看到效果</li>
<li>第二步：<code>npm install vue-server-renderer --save</code>，其实这个包我们现在才开始用，<em>*</em>注：这个包必须和vue的版本必须一致，目前都是2.3.2，不管哪个版本，版本号必须严格一致，否则会报warning*</li>
<li>第三步：读取<code>bundle.server.js</code>，</li>
<li>第四步：把上面读取的js文件，传递给vue-ssr，代码: <code>const bundleRenderer = vueServerRenderer.createBundleRenderer(code);</code>这步的作用是解析<code>bundle.server.js</code>，然后生成HTML，注：vueServerRenderer提供两个方法，分别为：<code>createBundleRenderer</code>和<code>createRenderer</code>，使用webpack打包的Component代码，必须作用<code>createBundleRenderer</code>这个方法，具体参照：<a href="https://ssr.vuejs.org/en/api.html#createrendereroptions" rel="nofollow noreferrer" target="_blank">官方文档</a>，参数就是上面读取的js文件</li>
<li>第五步：渲染，最终生成HTML，<code>bundleRenderer.renderToString((err, html) =&gt; {console.log(html)})</code>
</li>
</ul>
</li>
<li>server.js代码完整版本</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    const filePath = path.join(__dirname, './build/bundle.server.js')
    const code = fs.readFileSync(filePath, 'utf8');
    const bundleRenderer = vueServerRenderer.createBundleRenderer(code);
    bundleRenderer.renderToString((err, html) => {
        if (err) {
            console.log(err.message);
            console.log(err.stack);
        }
        console.log(html);
        resp.send(html)
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>    <span class="hljs-keyword">const</span> filePath = path.join(__dirname, './build/bundle.server.js')
    <span class="hljs-keyword">const</span> code = fs.readFileSync(filePath, 'utf8');
    <span class="hljs-keyword">const</span> bundleRenderer = vueServerRenderer.createBundleRenderer(code);
    bundleRenderer.renderToString((<span class="hljs-keyword">err</span>, html) =&gt; {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) {
            console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">err</span>.message);
            console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">err</span>.<span class="hljs-keyword">stack</span>);
        }
        console.<span class="hljs-built_in">log</span>(html);
        resp.send(html)
    });</code></pre>
<ul>
<li>
<p>总结下生成HTML的步骤</p>
<ul>
<li>1.有一个你想打包.vue文件的入口文件，就是<code>src/server-index.js</code>
</li>
<li>2.在webpack的配置文件中，把入口文件指向他</li>
<li>3.使用webpack对文件进行打包，会生成<code>build/bundle.server.js</code>文件</li>
<li>4.使用<code>vue-server-renderer</code>包解析这个文件，最终渲染成HTML</li>
</ul>
</li>
<li>最终效果(浏览器端)：</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVN4gw?w=675&amp;h=444" src="https://static.alili.tech/img/bVN4gw?w=675&amp;h=444" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li>最终效果（console端）：</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV8s6J?w=904&amp;h=249" src="https://static.alili.tech/img/bV8s6J?w=904&amp;h=249" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/sunhaikuo/vue-ssr-3" rel="nofollow noreferrer" target="_blank">码上GitHub</a></p>
<hr>
<blockquote>Vue-SSR系列目录</blockquote>
<p><a href="https://segmentfault.com/a/1190000009352740">从零开始搭建vue-ssr系列之一：写在前面的话</a></p>
<p><a href="https://segmentfault.com/a/1190000009372772" target="_blank">从零开始搭建vue-ssr系列之二：纯client端渲染以及webpack2+vue2注意事项</a></p>
<p><a href="https://segmentfault.com/a/1190000009373793">从零开始搭建vue-ssr系列之三：服务器渲染的奥秘</a></p>
<p><a href="https://segmentfault.com/a/1190000009452832" target="_blank">从零开始搭建vue-ssr系列之四：Vuex详解</a></p>
<p><a href="https://segmentfault.com/a/1190000009510509">从零开始搭建vue-ssr系列之五：开始第一个简单的server-render</a></p>
<p><a href="https://segmentfault.com/a/1190000009554693" target="_blank">从零开始搭建vue-ssr系列之六：一个完整的项目</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始搭建vue-ssr系列之五：开始第一个简单的server-render

## 原文链接
[https://segmentfault.com/a/1190000009510509](https://segmentfault.com/a/1190000009510509)

