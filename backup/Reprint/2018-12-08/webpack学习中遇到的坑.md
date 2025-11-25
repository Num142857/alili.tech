---
title: 'webpack学习中遇到的坑' 
date: 2018-12-08 2:30:30
hidden: true
slug: j8kbhbjx75
categories: [reprint]
---

{{< raw >}}

                    
<p>最近由于项目中使用了vuejs，所以顺带学习相关的知识，webpack作为目前广泛使用的一种前端编译工具，也一起进行学习。本文记录了在学习中遇到的一些问题。持续更新中……</p>
<h1 id="articleHeader0">一、使用webpack-dev-server时无法更改端口号</h1>
<p>问题描述：<br>最近在学习webpack，尝试使用webpack-dev-server，想更换接口，但是更改了webpack的devServer配置，发现一直无法生效。具体配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer: {
    contentBase: path.join(__dirname, &quot;dist&quot;),
    port:8999
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">devServer</span>: {
    <span class="hljs-attribute">contentBase</span>: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">"dist"</span>),
    port:<span class="hljs-number">8999</span>
},</code></pre>
<p>解决方式：<br>经过排查问题发现在使用webpack时配置了多环境，所以修改了配置文件的名称，具体如下图所示：<br><span class="img-wrap"><img data-src="/img/bV6TKn?w=189&amp;h=76" src="https://static.alili.tech/img/bV6TKn?w=189&amp;h=76" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>在使用npm的sripts时，并没有配置该文件信息，所以无法读取配置文件，导致配置无法生效。<br>修改scripts，加入配置信息后生效。<br><span class="img-wrap"><img data-src="/img/bV6TKu?w=678&amp;h=32" src="https://static.alili.tech/img/bV6TKu?w=678&amp;h=32" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">二、webpack使用tree shaking 无法显示未引入的方法【已解决】</h1>
<p>问题描述：<br>使用webpack4时，并没有引入相应的的function，但是在生成的bundle文件中，并没有提示unused harmony export信息。具体代码如下：<br>index.js代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { sum } from &quot;./math.js&quot;;

function component() {
    var element = document.createElement('div');
    element.innerHTML = [&quot;3+2=&quot; + sum(3)].join(&quot;\n&quot;);
    element.classList.add('hello');
    return element;
}
document.body.appendChild(component());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { sum } <span class="hljs-keyword">from</span> <span class="hljs-string">"./math.js"</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">component</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
    element.innerHTML = [<span class="hljs-string">"3+2="</span> + sum(<span class="hljs-number">3</span>)].join(<span class="hljs-string">"\n"</span>);
    element.classList.add(<span class="hljs-string">'hello'</span>);
    <span class="hljs-keyword">return</span> element;
}
<span class="hljs-built_in">document</span>.body.appendChild(component());</code></pre>
<p>math.js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function square(x) {
    return x*x;
}

export function sum(x) {
    return x + x;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>export <span class="hljs-keyword">function</span> <span class="hljs-title">square</span>(x) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">x*x</span>;
}

export <span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(x) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">x</span> + x;
}</code></pre>
<p>解决方式：<br>webpack4中mode=development时,将不进行tree-shaking和Scope hoisting，在使用production时才会进行这些操作。webpack4的新特性参见<a href="https://segmentfault.com/a/1190000013970017">https://segmentfault.com/a/11...</a></p>
<h1 id="articleHeader2">三、webpack4.0中使用“extract-text-webpack-plugin”报错</h1>
<p>具体报错信息如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    (node:12712) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
    E:\***\myproject\webpack-vue-elementUi\node_modules\webpack\lib\Chunk.js:460
                    throw new Error(
                    ^
    
    Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
        at Chunk.get (E:\***\myproject\webpack-vue-elementUi\node_modules\webpack\lib\Chunk.js:460:9)
        at E:\***\myproject\webpack-vue-elementUi\node_modules\extract-text-webpack-plugin\dist\index.js:176:48
        at Array.forEach (<anonymous>)
        at E:\***\myproject\webpack-vue-elementUi\node_modules\extract-text-webpack-plugin\dist\index.js:171:18" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>
    (node:12712) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead
    E:<span class="hljs-symbol">\*</span>**<span class="hljs-symbol">\m</span>yproject<span class="hljs-symbol">\w</span>ebpack-vue-elementUi<span class="hljs-symbol">\n</span>ode_modules<span class="hljs-symbol">\w</span>ebpack<span class="hljs-symbol">\l</span>ib<span class="hljs-symbol">\C</span>hunk.js:460
                    throw new Error(
                    ^
    
    Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof Entrypoint instead
        at Chunk.get (E:<span class="hljs-symbol">\*</span>**<span class="hljs-symbol">\m</span>yproject<span class="hljs-symbol">\w</span>ebpack-vue-elementUi<span class="hljs-symbol">\n</span>ode_modules<span class="hljs-symbol">\w</span>ebpack<span class="hljs-symbol">\l</span>ib<span class="hljs-symbol">\C</span>hunk.js:460:9)
        at E:<span class="hljs-symbol">\*</span>**<span class="hljs-symbol">\m</span>yproject<span class="hljs-symbol">\w</span>ebpack-vue-elementUi<span class="hljs-symbol">\n</span>ode_modules<span class="hljs-symbol">\e</span>xtract-text-webpack-plugin<span class="hljs-symbol">\d</span>ist<span class="hljs-symbol">\i</span>ndex.js:176:48
        at Array.forEach (&lt;anonymous&gt;)
        at E:<span class="hljs-symbol">\*</span>**<span class="hljs-symbol">\m</span>yproject<span class="hljs-symbol">\w</span>ebpack-vue-elementUi<span class="hljs-symbol">\n</span>ode_modules<span class="hljs-symbol">\e</span>xtract-text-webpack-plugin<span class="hljs-symbol">\d</span>ist<span class="hljs-symbol">\i</span>ndex.js:171:18</code></pre>
<p>解决方式：<br>经过排查发现是由于extract-text-webpack-plugin目前还没有webpack4版本。可以使用该方式npm install extract-text-webpack-plugin@next解决 具体问题描述： <a href="https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/701" rel="nofollow noreferrer" target="_blank">https://github.com/webpack-co...</a></p>
<h1 id="articleHeader3">四、extract-text-webpack-plugin 提取css文件时url()解析问题</h1>
<p>问题描述：<br>使用extract-text-webpack-plugin提取css文件时，url()解析出来的路径是相对于css文件地址的，导致图片无法查找到。<br>提取的css如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hello {
    color: red;
    background: url(img/shop-logo.png);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.hello</span> {
    <span class="hljs-attribute">color</span>: red;
    <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(img/shop-logo.png);
}</code></pre>
<p>解决方式：<br>经过网上搜索，定位问题是extract-text-webpack-plugin使用css-loader解析css时出现的问题，更改css-laoder的配置即可。具体配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test:/\.css$/,
    use : ExtractTextPlugin.extract({
        fallback : &quot;style-loader&quot;,
        //这样使用会出现url()解析路径错误的问题
        //use : &quot;css-loader&quot;
        use:[
            {
                loader:&quot;css-loader&quot;,
                options:{
                    //用于解决url()路径解析错误
                    url:false,
                    minimize:true,
                    sourceMap:true
                }
            }
        ]
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>:/\.css$/,
    use : ExtractTextPlugin.<span class="hljs-built_in">extract</span>({
        fallback : <span class="hljs-string">"style-loader"</span>,
        //这样使用会出现url()解析路径错误的问题
        //use : <span class="hljs-string">"css-loader"</span>
        use:[
            {
                loader:<span class="hljs-string">"css-loader"</span>,
                options:{
                    //用于解决<span class="hljs-built_in">url</span>()路径解析错误
                    url:false,
                    minimize:true,
                    sourceMap:true
                }
            }
        ]
    })
}</code></pre>
<p><a href="https://github.com/webpack-contrib/extract-text-webpack-plugin/blob/master/README.md" rel="nofollow noreferrer" target="_blank">https://github.com/webpack-co...</a></p>
<h1 id="articleHeader4">五、SplitChunkPlugin使用遇到的问题</h1>
<p>问题描述：由于CommonChunkPlugin已被webpack4废弃，webpack4推荐使用SplitChunkPlugin来提取公共模块。由于webpack官网(<a href="https://webpack.js.org)%E4%B8%8A%E9%9D%A2%E8%AF%A5%E6%8F%92%E4%BB%B6%E8%BF%98%E6%B2%A1%E6%9C%89%E6%9B%B4%E6%96%B0" rel="nofollow noreferrer" target="_blank">https://webpack.js.org)上面该...</a>，网上资料介绍又不是很详细，综合网上搜索结果，终于实现了公共模块的分离，但是还是有很多疑问没有解决，后面还需要在查找相关资料。<br>可以参考官方的例子：<a href="https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk" rel="nofollow noreferrer" target="_blank">https://github.com/webpack/we...</a><br>解决方式：<br>使用SplitChunkPlugin有两种方式：<br><strong>一、optimization.splitChunks</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="optimization: {
        //提取公共模块，webpack4去除了CommonsChunkPlugin，使用SplitChunksPlugin作为替代
        //主要用于多页面
        //例子代码 https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk
        //SplitChunksPlugin配置，其中缓存组概念目前不是很清楚
        splitChunks: {
            // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
            chunks: &quot;all&quot;,
            // 表示在压缩前的最小模块大小，默认为0；
            minSize: 30000,
            //表示被引用次数，默认为1
            minChunks: 1,
            //最大的按需(异步)加载次数，默认为1；
            maxAsyncRequests: 3,
            //最大的初始化加载次数，默认为1；
            maxInitialRequests: 3,
            // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值
            name: true,
            //缓存组，目前在项目中设置cacheGroup可以抽取公共模块，不设置则不会抽取
            cacheGroups: {
                //缓存组信息，名称可以自己定义
                commons: {
                    //拆分出来块的名字,默认是缓存组名称+&quot;~&quot; + [name].js
                    name: &quot;test&quot;,
                    // 同上
                    chunks: &quot;all&quot;,
                    // 同上
                    minChunks: 3,
                    // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
                    enforce: true,
                    //test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
                    test:&quot;&quot;
                },
                //设置多个缓存规则
                vendor: {
                    test: /node_modules/,
                    chunks: &quot;all&quot;,
                    name: &quot;vendor&quot;,
                    //表示缓存的优先级
                    priority: 10,
                    enforce: true
                }
            }
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">optimization:</span> {
        <span class="hljs-comment">//提取公共模块，webpack4去除了CommonsChunkPlugin，使用SplitChunksPlugin作为替代</span>
        <span class="hljs-comment">//主要用于多页面</span>
        <span class="hljs-comment">//例子代码 https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk</span>
        <span class="hljs-comment">//SplitChunksPlugin配置，其中缓存组概念目前不是很清楚</span>
<span class="hljs-symbol">        splitChunks:</span> {
            <span class="hljs-comment">// 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;</span>
<span class="hljs-symbol">            chunks:</span> <span class="hljs-string">"all"</span>,
            <span class="hljs-comment">// 表示在压缩前的最小模块大小，默认为0；</span>
<span class="hljs-symbol">            minSize:</span> <span class="hljs-number">30000</span>,
            <span class="hljs-comment">//表示被引用次数，默认为1</span>
<span class="hljs-symbol">            minChunks:</span> <span class="hljs-number">1</span>,
            <span class="hljs-comment">//最大的按需(异步)加载次数，默认为1；</span>
<span class="hljs-symbol">            maxAsyncRequests:</span> <span class="hljs-number">3</span>,
            <span class="hljs-comment">//最大的初始化加载次数，默认为1；</span>
<span class="hljs-symbol">            maxInitialRequests:</span> <span class="hljs-number">3</span>,
            <span class="hljs-comment">// 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值</span>
<span class="hljs-symbol">            name:</span> true,
            <span class="hljs-comment">//缓存组，目前在项目中设置cacheGroup可以抽取公共模块，不设置则不会抽取</span>
<span class="hljs-symbol">            cacheGroups:</span> {
                <span class="hljs-comment">//缓存组信息，名称可以自己定义</span>
<span class="hljs-symbol">                commons:</span> {
                    <span class="hljs-comment">//拆分出来块的名字,默认是缓存组名称+"~" + [name].js</span>
<span class="hljs-symbol">                    name:</span> <span class="hljs-string">"test"</span>,
                    <span class="hljs-comment">// 同上</span>
<span class="hljs-symbol">                    chunks:</span> <span class="hljs-string">"all"</span>,
                    <span class="hljs-comment">// 同上</span>
<span class="hljs-symbol">                    minChunks:</span> <span class="hljs-number">3</span>,
                    <span class="hljs-comment">// 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize</span>
<span class="hljs-symbol">                    enforce:</span> true,
                    <span class="hljs-comment">//test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；</span>
<span class="hljs-symbol">                    test:</span><span class="hljs-string">""</span>
                },
                <span class="hljs-comment">//设置多个缓存规则</span>
<span class="hljs-symbol">                vendor:</span> {
<span class="hljs-symbol">                    test:</span> /node_modules/,
<span class="hljs-symbol">                    chunks:</span> <span class="hljs-string">"all"</span>,
<span class="hljs-symbol">                    name:</span> <span class="hljs-string">"vendor"</span>,
                    <span class="hljs-comment">//表示缓存的优先级</span>
<span class="hljs-symbol">                    priority:</span> <span class="hljs-number">10</span>,
<span class="hljs-symbol">                    enforce:</span> true
                }
            }
        }
    }</code></pre>
<p><strong>第二种：new webpack.optimize.SplitChunksPlugin</strong><br>具体配置同optimization.splitChunks</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack学习中遇到的坑

## 原文链接
[https://segmentfault.com/a/1190000013998339](https://segmentfault.com/a/1190000013998339)

