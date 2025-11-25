---
title: '详解CommonsChunkPlugin的配置和用法' 
date: 2018-12-17 2:30:07
hidden: true
slug: dd9l6mjzw0f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>简介</strong></h2>
<p>CommonsChunkPlugin主要是用来提取第三方库和公共模块，避免首屏加载的bundle文件或者按需加载的bundle文件体积过大，从而导致加载时间过长，着实是优化的一把利器。</p>
<p>先来说一下各种教程以及文档中CommonsChunkPlugin提及到chunk有哪几种，主要有以下三种：</p>
<ol>
<li>webpack当中配置的入口文件（entry）是chunk，可以理解为entry chunk</li>
<li>入口文件以及它的依赖文件通过code split（代码分割）出来的也是chunk，可以理解为children chunk</li>
<li>通过CommonsChunkPlugin创建出来的文件也是chunk，可以理解为commons chunk</li>
</ol>
<h2 id="articleHeader1">
<strong>CommonsChunkPlugin可配置的属性</strong>：</h2>
<ul>
<li>name：可以是已经存在的chunk（一般指入口文件）对应的name，那么就会把公共模块代码合并到这个chunk上；否则，会创建名字为name的commons chunk进行合并</li>
<li>filename：指定commons chunk的文件名</li>
<li>chunks：指定source chunk，即指定从哪些chunk当中去找公共模块，省略该选项的时候，默认就是entry chunks</li>
<li>minChunks：既可以是数字，也可以是函数，还可以是Infinity，具体用法和区别下面会说</li>
</ul>
<p>children和async属于异步中的应用，放在了最后讲解。</p>
<p>可能这么说，大家会云里雾里，下面用demo来检验上面的属性。</p>
<h2 id="articleHeader2"><strong>实战应用</strong></h2>
<p>以下几个demo主要是测试以下几种情况：</p>
<ul>
<li>不分离出第三方库和自定义公共模块</li>
<li>分离出第三方库、自定义公共模块、webpack运行文件，但它们在同一个文件中</li>
<li>单独分离第三方库、自定义公共模块、webpack运行文件，各自在不同文件</li>
</ul>
<h3 id="articleHeader3"><strong>不分离出第三方库和自定义公共模块</strong></h3>
<p>项目初始结构，后面打包后会生成dist目录：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012828884?w=240&amp;h=175" src="https://static.alili.tech/img/remote/1460000012828884?w=240&amp;h=175" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>src目录下各个文件内容都很简洁的，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="common.js
export const common = 'common file';

first.js
import {common} from './common';
import $ from 'jquery';
console.log($，`first  ${common}`);

second.js
import {common} from './common';
import $ from 'jquery';
console.log($，`second ${common}`);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>common.js
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> common = <span class="hljs-string">'common file'</span>;

first.js
<span class="hljs-keyword">import</span> {common} <span class="hljs-keyword">from</span> <span class="hljs-string">'./common'</span>;
<span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span>;
<span class="hljs-built_in">console</span>.log($，<span class="hljs-string">`first  <span class="hljs-subst">${common}</span>`</span>);

second.js
<span class="hljs-keyword">import</span> {common} <span class="hljs-keyword">from</span> <span class="hljs-string">'./common'</span>;
<span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span>;
<span class="hljs-built_in">console</span>.log($，<span class="hljs-string">`second <span class="hljs-subst">${common}</span>`</span>);</code></pre>
<p>package.json文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;test&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;build&quot;: &quot;rimraf dist &amp;&amp; webpack&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;devDependencies&quot;: {
    &quot;rimraf&quot;: &quot;^2.6.2&quot;,
    &quot;webpack&quot;: &quot;^3.10.0&quot;,
    &quot;webpack-dev-server&quot;: &quot;^2.10.1&quot;
  },
  &quot;dependencies&quot;: {
    &quot;jquery&quot;: &quot;^3.2.1&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"test"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"rimraf dist &amp;&amp; webpack"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>,
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"rimraf"</span>: <span class="hljs-string">"^2.6.2"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^3.10.0"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^2.10.1"</span>
  },
  <span class="hljs-attr">"dependencies"</span>: {
    <span class="hljs-attr">"jquery"</span>: <span class="hljs-string">"^3.2.1"</span>
  }
}
</code></pre>
<p>webpack.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&quot;path&quot;);
const webpack = require(&quot;webpack&quot;);

const config = {
    entry: {
        first: './src/first.js',
        second: './src/second.js'
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].js'
    },
}

module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">const</span> webpack = require(<span class="hljs-string">"webpack"</span>);

<span class="hljs-keyword">const</span> <span class="hljs-built_in">config</span> = {
    entry: {
        first: <span class="hljs-string">'./src/first.js'</span>,
        second: <span class="hljs-string">'./src/second.js'</span>
    },
    output: {
        path: path.resolve(__dirname,<span class="hljs-string">'./dist'</span>),
        filename: <span class="hljs-string">'[name].js'</span>
    },
}

<span class="hljs-keyword">module</span>.exports = <span class="hljs-built_in">config</span>;</code></pre>
<p>接着在命令行npm run build，此时项目中多了dist目录：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012828885?w=243&amp;h=240" src="https://static.alili.tech/img/remote/1460000012828885?w=243&amp;h=240" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>再来查看一下命令行中webpack的打包信息：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012828886?w=525&amp;h=75" src="https://static.alili.tech/img/remote/1460000012828886?w=525&amp;h=75" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>查看first.js和second.js，会发现共同引用的common.js文件和jquery都被打包进去了，这肯定不合理，公共模块重复打包，体积过大。</p>
<h3 id="articleHeader4"><strong>分离出第三方库、自定义公共模块、webpack运行文件</strong></h3>
<p>这时候修改webpack.config.js新增一个入口文件vendor和CommonsChunkPlugin插件进行公共模块的提取：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&quot;path&quot;);
const webpack = require(&quot;webpack&quot;);
const packagejson = require(&quot;./package.json&quot;);

const config = {
    entry: {
        first: './src/first.js',
        second: './src/second.js',
        vendor: Object.keys(packagejson.dependencies)//获取生产环境依赖的库
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js'
        }),
    ]
}

module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-keyword">const</span> packagejson = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./package.json"</span>);

<span class="hljs-keyword">const</span> config = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">first</span>: <span class="hljs-string">'./src/first.js'</span>,
        <span class="hljs-attr">second</span>: <span class="hljs-string">'./src/second.js'</span>,
        <span class="hljs-attr">vendor</span>: <span class="hljs-built_in">Object</span>.keys(packagejson.dependencies)<span class="hljs-comment">//获取生产环境依赖的库</span>
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: path.resolve(__dirname,<span class="hljs-string">'./dist'</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
        }),
    ]
}

<span class="hljs-built_in">module</span>.exports = config;</code></pre>
<p>查看dist目录下，新增了一个vendor.js的文件：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012828887?w=248&amp;h=256" src="https://static.alili.tech/img/remote/1460000012828887?w=248&amp;h=256" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>再来查看一下命令行中webpack的打包信息：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012828888?w=542&amp;h=97" src="https://static.alili.tech/img/remote/1460000012828888?w=542&amp;h=97" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>通过查看vendor.js文件，发现first.js和second.js文件中依赖的jquery和common.js都被打包进vendor.js中，同时还有webpack的运行文件。总的来说，我们初步的目的达到，提取公共模块，但是它们都在同一个文件中。</p>
<p>到这里，肯定有人希望自家的vendor.js纯白无瑕，只包含第三方库，不包含自定义的公共模块和webpack运行文件，又或者希望包含第三方库和公共模块，不包含webpack运行文件。</p>
<p>其实，这种想法是对，特别是分离出webpack运行文件，因为每次打包webpack运行文件都会变，如果你不分离出webpack运行文件，每次打包生成vendor.js对应的哈希值都会变化，导致vendor.js改变，但实际上你的第三方库其实是没有变，然而浏览器会认为你原来缓存的vendor.js就失效，要重新去服务器中获取，其实只是webpack运行文件变化而已，就要人家重新加载，好冤啊~</p>
<p>OK，接下来就针对这种情况来测试。</p>
<h3 id="articleHeader5"><strong>单独分离出第三方库、自定义公共模块、webpack运行文件</strong></h3>
<p>这里我们分两步走：</p>
<ol>
<li>先单独抽离出webpack运行文件</li>
<li>接着单独抽离第三方库和自定义公共模块，这里利用minChunks有两种方法可以完成，往后看就知道了</li>
</ol>
<h4><strong>1、抽离webpack运行文件</strong></h4>
<p>先来抽离webpack运行文件，修改webpack配置文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','runtime'],
            filename: '[name].js'
        }),
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">plugins</span>: [
        new webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attribute">name</span>: [<span class="hljs-string">'vendor'</span>,<span class="hljs-string">'runtime'</span>],
            <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].js'</span>
        }),
    ]</code></pre>
<p>其实上面这段代码，等价于下面这段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
            filename: '[name].js',
            chunks: ['vendor']
        }),
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> <span class="hljs-attribute">plugins</span>: [
        new webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attribute">name</span>: <span class="hljs-string">'vendor'</span>,
            <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].js'</span>
        }),
        new webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attribute">name</span>: <span class="hljs-string">'runtime'</span>,
            <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].js'</span>,
            <span class="hljs-attribute">chunks</span>: [<span class="hljs-string">'vendor'</span>]
        }),
    ]</code></pre>
<p>上面两段抽离webpack运行文件代码的意思是创建一个名为runtime的commons chunk进行webpack运行文件的抽离，其中source chunks是vendor.js。</p>
<p>查看dist目录下，新增了一个runtime.js的文件，其实就是webpack的运行文件：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012828889?w=231&amp;h=275" src="https://static.alili.tech/img/remote/1460000012828889?w=231&amp;h=275" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>再来查看一下命令行中webpack的打包信息，你会发现vendor.js的体积已经减小，说明已经把webpack运行文件提取出来了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012828890?w=566&amp;h=112" src="https://static.alili.tech/img/remote/1460000012828890?w=566&amp;h=112" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>可是，vendor.js中还有自定义的公共模块common.js，人家只想vendor.js拥有项目依赖的第三方库而已（这里是jquery），这个时候把minChunks这个属性引进来。</p>
<p>minChunks可以设置为数字、函数和Infinity，<strong>默认值是2，并不是官方文档说的入口文件的数量</strong>，下面解释下minChunks含义：</p>
<ul>
<li>数字：模块被多少个chunk公共引用才被抽取出来成为commons chunk</li>
<li>函数：接受 (module, count) 两个参数，返回一个布尔值，你可以在函数内进行你规定好的逻辑来决定某个模块是否提取成为commons chunk</li>
<li>Infinity：<strong>只有当入口文件（entry chunks） &gt;= 3 才生效，用来在第三方库中分离自定义的公共模块</strong>
</li>
</ul>
<h4><strong>2、抽离第三方库和自定义公共模块</strong></h4>
<p>要在vendor.js中把第三方库单独抽离出来，上面也说到了有两种方法。</p>
<p><strong>第一种方法</strong>minChunks设为Infinity，修改webpack配置文件如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','runtime'],
            filename: '[name].js',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].js',
            chunks: ['first','second']//从first.js和second.js中抽取commons chunk
        }),
    ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">plugins</span>: [
        new webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attribute">name</span>: [<span class="hljs-string">'vendor'</span>,<span class="hljs-string">'runtime'</span>],
            <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].js'</span>,
            <span class="hljs-attribute">minChunks</span>: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attribute">name</span>: <span class="hljs-string">'common'</span>,
            <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].js'</span>,
            <span class="hljs-attribute">chunks</span>: [<span class="hljs-string">'first'</span>,<span class="hljs-string">'second'</span>]<span class="hljs-comment">//从first.js和second.js中抽取commons chunk</span>
        }),
    ]</code></pre>
<p>查看dist目录下，新增了一个common.js的文件：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012828891?w=236&amp;h=302" src="https://static.alili.tech/img/remote/1460000012828891?w=236&amp;h=302" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>再来查看一下命令行中webpack的打包信息，自定义的公共模块分离出来：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012828892?w=563&amp;h=140" src="https://static.alili.tech/img/remote/1460000012828892?w=563&amp;h=140" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>这时候的vendor.js就纯白无瑕，只包含第三方库文件，common.js就是自定义的公共模块，runtime.js就是webpack的运行文件。</p>
<p><strong>第二种方法</strong>把它们分离开来，就是利用minChunks作为函数的时候，说一下minChunks作为函数两个参数的含义：</p>
<ul>
<li>module：当前chunk及其包含的模块</li>
<li>count：当前chunk及其包含的模块被引用的次数</li>
</ul>
<p>minChunks作为函数会遍历每一个入口文件及其依赖的模块，返回一个布尔值，为true代表当前正在处理的文件（module.resource）合并到commons chunk中，为false则不合并。</p>
<p>继续修改我们的webpack配置文件，把vendor入口文件注释掉，用minChunks作为函数实现vendor只包含第三方库，达到和上面一样的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const config = {
    entry: {
        first: './src/first.js',
        second: './src/second.js',
        //vendor: Object.keys(packagejson.dependencies)//获取生产环境依赖的库
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].js'
    },
     plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js',
            minChunks: function (module,count) {
                console.log(module.resource,`引用次数${count}`);
                //&quot;有正在处理文件&quot; + &quot;这个文件是 .js 后缀&quot; + &quot;这个文件是在 node_modules 中&quot;
                return (
                    module.resource &amp;&amp;
                    /\.js$/.test(module.resource) &amp;&amp;
                    module.resource.indexOf(path.join(__dirname, './node_modules')) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
            filename: '[name].js',
            chunks: ['vendor']
        }),
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> config = {
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">first</span>: <span class="hljs-string">'./src/first.js'</span>,
        <span class="hljs-attr">second</span>: <span class="hljs-string">'./src/second.js'</span>,
        <span class="hljs-comment">//vendor: Object.keys(packagejson.dependencies)//获取生产环境依赖的库</span>
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: path.resolve(__dirname,<span class="hljs-string">'./dist'</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
    },
     <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
            <span class="hljs-attr">minChunks</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module,count</span>) </span>{
                <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">module</span>.resource,<span class="hljs-string">`引用次数<span class="hljs-subst">${count}</span>`</span>);
                <span class="hljs-comment">//"有正在处理文件" + "这个文件是 .js 后缀" + "这个文件是在 node_modules 中"</span>
                <span class="hljs-keyword">return</span> (
                    <span class="hljs-built_in">module</span>.resource &amp;&amp;
                    <span class="hljs-regexp">/\.js$/</span>.test(<span class="hljs-built_in">module</span>.resource) &amp;&amp;
                    <span class="hljs-built_in">module</span>.resource.indexOf(path.join(__dirname, <span class="hljs-string">'./node_modules'</span>)) === <span class="hljs-number">0</span>
                )
            }
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
            <span class="hljs-attr">name</span>: <span class="hljs-string">'runtime'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
            <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'vendor'</span>]
        }),
    ]
}</code></pre>
<p>上面的代码其实就是生成一个叫做vendor的commons chunk，那么有哪些模块会被加入到vendor中呢？就对入口文件及其依赖的模块进行遍历，如果该模块是js文件并且在node_modules中，就会加入到vendor当中，其实这也是一种让vendor只保留第三方库的办法。</p>
<p>再来查看一下命令行中webpack的打包信息：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012828893?w=762&amp;h=294" src="https://static.alili.tech/img/remote/1460000012828893?w=762&amp;h=294" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>你会发现，和上面minChunks设为Infinity的结果是一致的。</p>
<h2 id="articleHeader6"><strong>children和async属性</strong></h2>
<p>这两个属性主要是在code split（代码分割）和异步加载当中应用。</p>
<ul>
<li>
<p>children</p>
<ul>
<li>指定为true的时候，就代表source chunks是通过entry chunks（入口文件）进行code split出来的children chunks</li>
<li><strong>children和chunks不能同时设置，因为它们都是指定source chunks的</strong></li>
<li>children 可以用来把 entry chunk 创建的 children chunks 的共用模块合并到自身，但这会导致初始加载时间较长</li>
</ul>
</li>
<li>async：即解决children:true时合并到entry chunks自身时初始加载时间过长的问题。async设为true时，commons chunk 将不会合并到自身，而是使用一个新的异步的commons chunk。当这个children chunk 被下载时，自动并行下载该commons chunk</li>
</ul>
<p>修改webpack配置文件，增加chunkFilename，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" output: {
        ...........
        chunkFilename: &quot;[name].[hash:5].chunk.js&quot;,
    },
plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor','runtime'],
        filename: '[name].js',
        minChunks: Infinity
    }),
   new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: 'children-async'
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code> <span class="hljs-attribute">output</span>: {
        ...........
        <span class="hljs-attribute">chunkFilename</span>: <span class="hljs-string">"[name].[hash:5].chunk.js"</span>,
    },
<span class="hljs-attribute">plugins</span>: [
    new webpack.optimize.CommonsChunkPlugin({
        <span class="hljs-attribute">name</span>: [<span class="hljs-string">'vendor'</span>,<span class="hljs-string">'runtime'</span>],
        <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].js'</span>,
        <span class="hljs-attribute">minChunks</span>: Infinity
    }),
   new webpack.optimize.CommonsChunkPlugin({
        <span class="hljs-attribute">children</span>: true,
        <span class="hljs-attribute">async</span>: <span class="hljs-string">'children-async'</span>
    })
]</code></pre>
<p>chunkFilename用来指定异步加载的模块名字，异步加载模块中的共同引用到的模块就会被合并到async中指定名字，上面就是children-async。</p>
<p>修改成异步截图出来太麻烦了，就简单说明一下：first和second是异步加载模块，同时它们共同引用了common.js这个模块，如果你不设置这一步：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" new webpack.optimize.CommonsChunkPlugin({
        children: true,
        async: 'children-async'
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.CommonsChunkPlugin</span>({
        <span class="hljs-attribute">children</span>: true,
        async: <span class="hljs-string">'children-async'</span>
    })</code></pre>
<p>那么共同引用的common.js都被打包进各自的模块当中，就重复打包了。</p>
<p>OK，你设置之后，也得看children的脸色怎么来划分：</p>
<ul>
<li>children为true，共同引用的模块就会被打包合并到名为children-async的公共模块，当你懒加载first或者second的时候并行加载这和children-async公共模块</li>
<li>children为false，共同引用的模块就会被打包到首屏加载的app.bundle当中，这就会导致首屏加载过长了，而且也不要用到，所以最好还是设为true</li>
</ul>
<h2 id="articleHeader7"><strong>浏览器缓存的实现</strong></h2>
<p>先来说一下哈希值的不同：</p>
<ul>
<li>hash 是 build-specific ，即每次编译都不同——适用于开发阶段</li>
<li>chunkhash 是 chunk-specific，是根据每个 chunk 的内容计算出的 hash——适用于生产</li>
</ul>
<p>所以，在生产环境，要把文件名改成'[name].[chunkhash]'，最大限度的利用浏览器缓存。</p>
<p>最后，写这篇文章，自己测试了很多demo，当然不可能全部贴上，但还是希望自己多动手测试以下，真的坑中带坑。</p>
<p>也参考了很多文章：</p>
<ul>
<li><a href="https://github.com/creeperyang/blog/issues/37" rel="nofollow noreferrer" target="_blank">https://github.com/creeperyan...</a></li>
<li><a href="https://segmentfault.com/q/1010000008726439/revision">https://segmentfault.com/q/10...</a></li>
<li><a href="https://segmentfault.com/q/1010000009070061" target="_blank">https://segmentfault.com/q/10...</a></li>
<li><a href="https://www.jianshu.com/p/2b81262898a4" rel="nofollow noreferrer" target="_blank">https://www.jianshu.com/p/2b8...</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
详解CommonsChunkPlugin的配置和用法

## 原文链接
[https://segmentfault.com/a/1190000012828879](https://segmentfault.com/a/1190000012828879)

