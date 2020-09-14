---
title: 'webpack学习（四）— code splitting' 
date: 2019-01-31 2:31:16
hidden: true
slug: 6rinevblqcq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是<code>code splitting</code>
</h2>
<p>首先说，<code>code splitting</code>指什么。我们打包时通常会生成一个大的<code>bundle.js</code>(或者<code>index</code>,看你如何命名)文件，这样所有的模块都会打包到这个<code>bundle.js</code>文件中，最终生成的文件往往比较大。<code>code splitting</code>就是指将文件分割为块(<code>chunk</code>)，<code>webpack</code>使我们可以定义一些分割点(<code>split point</code>)，根据这些分割点对文件进行分块，并实现按需加载。</p>
<h2 id="articleHeader1">
<code>code splitting</code>的意义</h2>
<ol>
<li><p>第三方类库单独打包。由于第三方类库的内容基本不会改变，可以将其与业务代码分离出来，这样就可以将类库代码缓存在客户端，减少请求。</p></li>
<li><p>按需加载。<code>webpack</code>支持定义分割点，通过<code>require.ensure</code>进行按需加载。</p></li>
<li><p>通用模块单独打包。我们代码中可能会有一些通用模块，比如弹窗、分页、通用的方法等等。其他业务代码模块常常会有引用这些通用模块。若按照<code>2</code>中做，则会造成通用模块重复打包。这时可以将通用模块单独打包出来。</p></li>
</ol>
<p>下文将详细说明。</p>
<h2 id="articleHeader2">如何进行<code>code spliting</code>
</h2>
<h3 id="articleHeader3">第三方类库</h3>
<p>我们项目中常常会用到一些第三方的类库，比如<code>jquery</code>,<code>bootstrap</code>等。可以配置多入口来将第三方类库单独打包，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在entry中添加入口
entry: {
    index: './index',
    vendor: ['jquery', 'bootstrap']
},

//在plugins中配置
plugins: [
    new webpack.optimize.CommonsChunkPlugin(&quot;vendor&quot;, &quot;vendor.bundle.js&quot;),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//在entry中添加入口</span>
<span class="hljs-attribute">entry</span>: {
    <span class="hljs-attribute">index</span>: <span class="hljs-string">'./index'</span>,
    <span class="hljs-attribute">vendor</span>: [<span class="hljs-string">'jquery'</span>, <span class="hljs-string">'bootstrap'</span>]
},

<span class="hljs-comment">//在plugins中配置</span>
<span class="hljs-attribute">plugins</span>: [
    new webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">"vendor"</span>, <span class="hljs-string">"vendor.bundle.js"</span>),
]</code></pre>
<p><strong> 说明 </strong><br><code>CommonsChunkPlugin</code>提供两个参数，第一个参数为对应的<code>chunk</code>名（<code>chunk</code>指文件块，对应<code>entry</code>中的属性名），第二个参数为生成的文件名。<br>这个插件做了两件事：</p>
<ol>
<li><p>将<code>vendor</code>配置的模块（<code>jquery</code>,<code>bootstrap</code>）打包到<code>vendor.bundle.js</code>中。</p></li>
<li><p>将<code>index</code>中存在的<code>jquery</code>, <code>bootstrap</code>模块从文件中移除。这样<code>index</code>中则只留下纯净的业务代码。</p></li>
</ol>
<h3 id="articleHeader4">按需加载</h3>
<p>以基于<code>backbone</code>的单页面应用为例，可以在<code>router</code>中进行配置实现按需加载，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.js

var Router = Backbone.Router.extend({
    routes: {
        'a': 'a',
        'b': 'b'
    },
    
    a: function() {
        require.ensure(['./a'], (require) => {
            let a = require('./a');
            //do something
        })
    },
    
    b: function() {
        require.ensure(['./b'], (require) => {
            let b = require('./b');
            //do something
        })
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>router.js

<span class="hljs-keyword">var</span> Router = Backbone.Router.extend({
    routes: {
        <span class="hljs-string">'a'</span>: <span class="hljs-string">'a'</span>,
        <span class="hljs-string">'b'</span>: <span class="hljs-string">'b'</span>
    },
    
    a: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'./a'</span>], <span class="hljs-function">(<span class="hljs-params"><span class="hljs-built_in">require</span></span>) =&gt;</span> {
            <span class="hljs-keyword">let</span> a = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./a'</span>);
            <span class="hljs-comment">//do something</span>
        })
    },
    
    b: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">require</span>.ensure([<span class="hljs-string">'./b'</span>], <span class="hljs-function">(<span class="hljs-params"><span class="hljs-built_in">require</span></span>) =&gt;</span> {
            <span class="hljs-keyword">let</span> b = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./b'</span>);
            <span class="hljs-comment">//do something</span>
        })
    }
})</code></pre>
<p><strong> 说明 </strong><br>如上方式将打出两个文件，<code>a.js</code>和<code>b.js</code>（当然名字会有所不同），且为按需加载。只有在访问<code>a</code>时，<code>a.js</code>才会被加载，<code>b</code>同理。但是这种做法存在两个问题：</p>
<ol>
<li><p>若路由分配不合理，会打包出很多很小的文件，每个文件或许只有几<code>k</code>，却多了很多网络请求，得不偿失。</p></li>
<li><p>会造成通用模块的重复打包，比如<code>a</code>模块和<code>b</code>模块都引用了<code>c</code>模块，</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a
import 'c' from './c'

b
import 'c' from './c'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>a
<span class="hljs-keyword">import</span> <span class="hljs-string">'c'</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'./c'</span>

b
<span class="hljs-keyword">import</span> <span class="hljs-string">'c'</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'./c'</span></code></pre>
<p>这样我们会发现打包出的<code>a.js</code>和<code>b.js</code>中都包含<code>c</code>模块的代码，造成了代码冗余。</p>
<p>对于问题<code>1</code>，可以通过<code>webpack</code>提供的插件来解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在plugins中添加该插件：
plugins: [
    new webpack.optimize.AggressiveMergingPlugin()
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//在plugins中添加该插件：</span>
plugins: [
    new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.AggressiveMergingPlugin</span>()
]</code></pre>
<p>对于问题<code>2</code>:<br>可以按照下文中所说方式解决。</p>
<h3 id="articleHeader5">通用模块打包</h3>
<blockquote><p>这个问题我再网上查阅了一些资料，没有发现特别好的方案，以下所述为自己的一些尝试，但是也并非最优解，希望有更好解决方案的同学能够指出。</p></blockquote>
<p>同样是利用<code>entry</code>和<code>commonsChunkPlugin</code>来处理的。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在entry中添加入口
entry: {
    index: './index',
    common: ['./c', './d'],  //其中c,d模块为通用功能模块
    vendor: ['jquery', 'bootstrap']
},

//在plugin中
plugins: [
    new webpack.optimize.CommonsChunkPlugin([&quot;common&quot;, &quot;vendor&quot;], &quot;[name].js&quot;)  //[name]对应'common'和'vendor'
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//在entry中添加入口</span>
<span class="hljs-attribute">entry</span>: {
    <span class="hljs-attribute">index</span>: <span class="hljs-string">'./index'</span>,
    <span class="hljs-attribute">common</span>: [<span class="hljs-string">'./c'</span>, <span class="hljs-string">'./d'</span>],  <span class="hljs-comment">//其中c,d模块为通用功能模块</span>
    <span class="hljs-attribute">vendor</span>: [<span class="hljs-string">'jquery'</span>, <span class="hljs-string">'bootstrap'</span>]
},

<span class="hljs-comment">//在plugin中</span>
<span class="hljs-attribute">plugins</span>: [
    new webpack.optimize.CommonsChunkPlugin([<span class="hljs-string">"common"</span>, <span class="hljs-string">"vendor"</span>], <span class="hljs-string">"[name].js"</span>)  <span class="hljs-comment">//[name]对应'common'和'vendor'</span>
]</code></pre>
<p>这样则会打包出<code>common.js</code>和<code>vendor.js</code>两个文件。<code>common</code>为通用功能模块。</p>
<p>但是这种方式在项目依赖复杂情况下的效果还是不太理想，无法做到某段代码只加载一次。<br>希望有更好方案的同学能够不吝赐教。</p>
<p>（本文完）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack学习（四）— code splitting

## 原文链接
[https://segmentfault.com/a/1190000007479892](https://segmentfault.com/a/1190000007479892)

