---
title: '煦涵说Webpack-IE低版本兼容指南' 
date: 2019-01-13 2:30:11
hidden: true
slug: z5hk43ua46d
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">Webpack</a>，Webpack 是一个前端资源加载/打包工具，现在版本已经 release 到 v2.6.1，今天的文章不支持介绍Webpack的API及使用，而是对最近项目开发中使用Webpack打包时处理IE低版本(IE8及以下)浏览器兼容问题做一次总结。<a href="https://github.com/zuojj/fedlab/issues/5" rel="nofollow noreferrer" target="_blank">issue直达</a>，如果<a href="http://www.fedlab.tech/archives/2157.html" rel="nofollow noreferrer" target="_blank">文章</a>对您有帮助欢迎 star !!!</p>
<p><span class="img-wrap"><img data-src="/img/bVOBOf?w=900&amp;h=500" src="https://static.alili.tech/img/bVOBOf?w=900&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>PC端项目前端基础技术选型jQuery + ES6 + EJS + Babel + Webpack：</p>
<ul>
<li>jQuery：提供选择器和ajax接口兼容支持；</li>
<li>ES6：跟进前端趋势，方便向后兼容；</li>
<li>EJS：提供前端模板引擎支持；</li>
<li>Babel：提供 ES6 转码支持；</li>
<li>Webpack: 提高前端资源加载/打包；</li>
</ul>
<p>项目开发过程都在 Chrome 浏览器中，一切都OK，没有任何问题，当在IE9以下浏览器中调试发现好多坑，现总结如下，以后新手参考。</p>
<h2 id="articleHeader0">Case One: <code>default</code> 、 <code>class</code>、<code>catch</code> ES3中保留字问题</h2>
<p>报错信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SCRIPT1048: 缺少标识符" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">SCRIPT1048:</span> 缺少标识符</code></pre>
<p>对应代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="e.n = function (t) {
    var n = t &amp;&amp; t.__esModule ? function () {
        return t.default
    } : function () {
        return t
    };
    return e.d(n, &quot;a&quot;, n), n
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">e.n = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">t</span>) </span>{
    <span class="hljs-keyword">var</span> n = t &amp;&amp; t.__esModule ? <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> t.default
    } : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> t
    };
    <span class="hljs-keyword">return</span> e.d(n, <span class="hljs-string">"a"</span>, n), n
}</code></pre>
<p>网上查找资料，webpack有一款loader插件<a href="https://www.npmjs.com/package/es3ify-loader" rel="nofollow noreferrer" target="_blank">es3ify-loader</a>来处理ES3的兼容问题，修改webpack配置，问题解决，添加规则如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    rules: [{
            test: /.js$/,
            enforce: 'post', // post-loader处理
            loader: 'es3ify-loader'
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/.js$/</span>,
            <span class="hljs-attr">enforce</span>: <span class="hljs-string">'post'</span>, <span class="hljs-comment">// post-loader处理</span>
            loader: <span class="hljs-string">'es3ify-loader'</span>
        }
    ]
}</code></pre>
<p>这个loader是干啥用的捏，就是把这些保留字给你加上引号，使用字符串的形式引用，请看实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 编译前
function(t) { return t.default; }

// 编译后
function(t) { return t[&quot;default&quot;]; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 编译前</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t</span>) </span>{ <span class="hljs-keyword">return</span> t.default; }

<span class="hljs-comment">// 编译后</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t</span>) </span>{ <span class="hljs-keyword">return</span> t[<span class="hljs-string">"default"</span>]; }</code></pre>
<h2 id="articleHeader1">Case Two: uglify-js产生问题</h2>
<p>重新构建，在IE低版本浏览器预览，使用 <code>webpack.optimize.UglifyJsPlugin</code> 压缩时，又报上面同样的错误了，重新采用 beauty:true, build 发现引号被压缩掉了，究其原因，研究了下uglify-js默认配置，发现了 <code>compress.properties</code> 属性，增加build options如下，问题解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.UglifyJsPlugin({
    compress: {
        properties: false,
        warnings: false
    },
    output: {
        beautify: true
    },
    sourceMap: false
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
    <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">properties</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">beautify</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">false</span>
})</code></pre>
<h2 id="articleHeader2">Case Three: uglify-js问题</h2>
<p>重新构建，在IE低版本浏览器预览，使用 <code>webpack.optimize.UglifyJsPlugin</code> 压缩时，又报上面同样的错误了，报错代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    catch: function (t) {
        return this.then(null, t)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">catch</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">t</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.then(<span class="hljs-literal">null</span>, t)
    }
}</code></pre>
<p>继续查找uglify-js配置，发现 <code>output.quote_keys</code>，修改build options，问题解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.UglifyJsPlugin({
    compress: {
        properties: false,
        warnings: false
    },
    output: {
        beautify: true,
        quote_keys: true
    },
    sourceMap: false
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
    <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">properties</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">beautify</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">quote_keys</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">false</span>
}),</code></pre>
<p>编译后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;catch&quot;: function(t) {
        return this.then(null, t);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">"catch"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.then(<span class="hljs-literal">null</span>, t);
    }
}</code></pre>
<h2 id="articleHeader3">Case Four: uglify-js问题</h2>
<p>重新构建，在IE低版本浏览器预览，报错信息如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SCRIPT3126: 无法设置未定义或 null 引用的属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;">SCRIPT3126: 无法设置未定义或 null 引用的属性</code></pre>
<p>继续分析压缩后代码，发现还是uglify-js问题，其mangle 配置属性 <code>mangle.screw_ie8</code> 默认为 true， 什么意思捏，意思就是把支持IE8的代码clear掉，screw you =&gt; 去你的，修改压缩配置项，重新编译，问题解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.UglifyJsPlugin({
    compress: {
        properties: false,
        warnings: false
    },
    output: {
        beautify: true,
        quote_keys: true
    },
    mangle: {
        screw_ie8: false
    },
    sourceMap: false
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
    <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">properties</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">beautify</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">quote_keys</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">mangle</span>: {
        <span class="hljs-attr">screw_ie8</span>: <span class="hljs-literal">false</span>
    },
    <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">false</span>
})</code></pre>
<h2 id="articleHeader4">Case Five: ES5的API兼容报错</h2>
<p>在 webpack 的 entry 入口文件top引入 <code>es5-shim</code> 问题解决</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('es5-shim');
require('es5-shim/es5-sham');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">require</span>(<span class="hljs-string">'es5-shim'</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">'es5-shim/es5-sham'</span>);</code></pre>
<h2 id="articleHeader5">Case Six: Console.log 问题</h2>
<p>在 webpack 的 entry 入口文件top引入 <code>console-polyfill</code> 问题解决</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('console-polyfill');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'console-polyfill'</span>);</code></pre>
<h2 id="articleHeader6">Case Seven: Promise 兼容</h2>
<p>在 webpack 的 entry 入口文件top引入 <code>es6-promise</code> 问题解决</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('es6-promise');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'es6-promise'</span>);</code></pre>
<h2 id="articleHeader7">Case Eight: Object.defineProperty 问题</h2>
<p>这个case 应该说是最难搞的一个case了，耗时也比较长，关键点在于使用 <code>es5-shim</code>/<code>es5-sham</code>也有问题，查看你官网发现在低版本浏览器也会有问题，官网描述如下：</p>
<blockquote>⚠️ Object.defineProperty<br>In the worst of circumstances, IE 8 provides a version of this method that only works on DOM objects. This sham will not be installed. The given version of defineProperty will throw an exception if used on non-DOM objects.<br>In slightly better circumstances, this method will silently fail to set "writable", "enumerable", and "configurable" properties.<br>Providing a getter or setter with "get" or "set" on a descriptor will silently fail on engines that lack "defineGetter" and "defineSetter", which include all versions of IE.<br><a href="https://github.com/es-shims/es5-shim/issues#issue/5" rel="nofollow noreferrer" target="_blank">https://github.com/es-shims/e...</a>
</blockquote>
<p>那这个Object.defineProperty 是如何产生的呢，这个是babel编译后产生的，当我们在代码使用 <code>import</code> <code>export</code> ES6 Module时出现的，那你可能最直接的想法就是我不用ES6 Module了，改用Commonjs规范，OK，修改后编译，确实解决了问题，但是查看代码里还是有一段代码的，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="e.d = function(t, n, r) {
    e.o(t, n) || Object.defineProperty(t, n, {
        &quot;configurable&quot;: !1,
        &quot;enumerable&quot;: !0,
        &quot;get&quot;: r
    });
}, e.n = function(t) {
    var n = t &amp;&amp; t.__esModule ? function() {
        return t[&quot;default&quot;];
    } : function() {
        return t;
    };
    return e.d(n, &quot;a&quot;, n), n;
}, e.o = function(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">e.d = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t, n, r</span>) </span>{
    e.o(t, n) || <span class="hljs-built_in">Object</span>.defineProperty(t, n, {
        <span class="hljs-string">"configurable"</span>: !<span class="hljs-number">1</span>,
        <span class="hljs-string">"enumerable"</span>: !<span class="hljs-number">0</span>,
        <span class="hljs-string">"get"</span>: r
    });
}, e.n = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t</span>) </span>{
    <span class="hljs-keyword">var</span> n = t &amp;&amp; t.__esModule ? <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> t[<span class="hljs-string">"default"</span>];
    } : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> t;
    };
    <span class="hljs-keyword">return</span> e.d(n, <span class="hljs-string">"a"</span>, n), n;
}, e.o = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">t, e</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(t, e);
}</code></pre>
<p>看代码已经做了容错判断。</p>
<h2 id="articleHeader8">Case Nine: Object.defineProperty 问题</h2>
<p>重新构建，加入 <code>json3</code> 处理 JSON 对象兼容时，代码在此处抛出了异常：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hasGetter = 'get' in descriptor;
var hasSetter = 'set' in descriptor;
if (!supportsAccessors &amp;&amp; (hasGetter || hasSetter)) {
    throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> hasGetter = <span class="hljs-string">'get'</span> <span class="hljs-keyword">in</span> descriptor;
<span class="hljs-keyword">var</span> hasSetter = <span class="hljs-string">'set'</span> <span class="hljs-keyword">in</span> descriptor;
<span class="hljs-keyword">if</span> (!supportsAccessors &amp;&amp; (hasGetter || hasSetter)) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(ERR_ACCESSORS_NOT_SUPPORTED);
}</code></pre>
<p>分析supportsAccessors代码逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var supportsAccessors = owns(prototypeOfObject, '__defineGetter__');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> supportsAccessors = owns(prototypeOfObject, <span class="hljs-string">'__defineGetter__'</span>);</code></pre>
<p>通过断点调试，supportsAccessors值为false且hasGetter或者hasSetter时抛出了异常，也就是说当前js引擎不支持访问器属性，却在属性描述符中设置了get，set,那么就会抛出异常。查看 <a href="#">defineGetter</a> 的兼容情况，只兼容IE11，虽然IE9、IE10同样不支持defineGetter,不过他们直接支持Object.defineProperty方法和get语法，无需sham，所以代码并不会走到异常这里。但是IE8以下就扯淡了。解决这种情况只能修改源代码了。</p>
<p>至此，Webpack打包时，IE低版本浏览器(IE8及以下)遇到的兼容问题就总结这里，如果你有新的问题，欢迎留言。</p>
<p>感谢您的阅读</p>
<p>--eof--</p>
<p>作者[煦涵]<br>2017年05月28日</p>
<p>下面是「FED实验室」的微信公众号二维码，欢迎长按、扫描关注：<br><span class="img-wrap"><img data-src="/img/remote/1460000009590306?w=344&amp;h=344" src="https://static.alili.tech/img/remote/1460000009590306?w=344&amp;h=344" alt="关注FED实验室" title="关注FED实验室" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
煦涵说Webpack-IE低版本兼容指南

## 原文链接
[https://segmentfault.com/a/1190000009613296](https://segmentfault.com/a/1190000009613296)

