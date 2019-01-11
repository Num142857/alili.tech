---
title: 'vue项目中使用scss' 
date: 2019-01-12 2:30:24
hidden: true
slug: wljwdquo3e
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一 概述</h1>
<p><strong>随着sass/less等css预处理器的出现</strong>，编写css变的越来越有乐趣。所以现在越来越多的人在项目中喜欢使用scss或者less。（我自己就是一个）。由于最近在写一个vue项目。所以就把写项目期间每天的一些知识点写在博客里。所以最近的博客应该都会和vue有关。今天要和大家分享的就是如何在vue项目中引入scss（引入less也类似）</p>
<h1 id="articleHeader1">二 vue中引入scss</h1>
<h2 id="articleHeader2">2.1 vue-loader</h2>
<p>在讲如何在vue项目中使用scss之前，我们先来简单了解一个概念，那就是vue-loader。vue-loader是什么东西呢？vue-loader其实就是一个webpack的loader。用来把vue组件转换成可部署的js,html,css模块。所以我们如果要想再vue项目中使用scss,肯定要告诉vue-loader怎么样解析我的scss文件。<br>不了解webpack的同学可以先去自行百度。我这里就放一张图，看完大家可以也就能知道webpack能做些什么事情了。<br><span class="img-wrap"><img data-src="/img/bVPh7j?w=750&amp;h=359" src="https://static.alili.tech/img/bVPh7j?w=750&amp;h=359" alt="webpack作用" title="webpack作用" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">2.2 loader配置</h2>
<p>在webpack中，所有预处理器都要匹配相应的loader,vue-loader允许其他的webpack-loader处理组件中的一部分吗，然后它根据lang属性自动判断出要使用的loaders。所以，其实只要安装处理sass/scss的loader。就能在vue中使用scss了。<br>现在我们来安装sass/scss loader</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install sass-loader node-sass --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">npm install sass-loader <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> --save-dev</code></pre>
<h2 id="articleHeader4">2.3 为什么无需配置</h2>
<p>我们前面说到,vue-loader允许能根据lang属性自动判断出要使用的loaders。它是怎么样做到的？有这么神奇嘛？我们下面来看一看最核心部分的源代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>exports.cssLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(options)</span> {</span>
  <span class="hljs-keyword">options</span> = <span class="hljs-keyword">options</span> || {}

  var cssLoader = {
    loader: <span class="hljs-string">'css-loader'</span>,
    option<span class="hljs-variable">s:</span> {
      minimize: process.env.NODE_ENV === <span class="hljs-string">'production'</span>,
      sourceMap: <span class="hljs-keyword">options</span>.sourceMap
    }
  }

  // generate loader <span class="hljs-built_in">string</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">be</span> used with extract text plugin
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateLoaders</span> <span class="hljs-params">(loader, loaderOptions)</span> {</span>
    var loaders = [cssLoader]
    <span class="hljs-keyword">if</span> (loader) {
      loaders.push({
        loader: loader + <span class="hljs-string">'-loader'</span>,
        option<span class="hljs-variable">s:</span> Object.assign({}, loaderOptions, {
          sourceMap: <span class="hljs-keyword">options</span>.sourceMap
        })
      })
    }

    // Extract CSS when that option <span class="hljs-keyword">is</span> specified
    // (which <span class="hljs-keyword">is</span> the case during production build)
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">options</span>.extract) {
      <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
        use: loaders,
        fallback: <span class="hljs-string">'vue-style-loader'</span>
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>].concat(loaders)
    }
  }

  // http<span class="hljs-variable">s:</span>//vue-loader.vuejs.org/<span class="hljs-keyword">en</span>/configurations/extract-css.html
  <span class="hljs-keyword">return</span> {
    <span class="hljs-keyword">cs</span><span class="hljs-variable">s:</span> generateLoaders(),
    postcs<span class="hljs-variable">s:</span> generateLoaders(),
    les<span class="hljs-variable">s:</span> generateLoaders(<span class="hljs-string">'less'</span>),
    sas<span class="hljs-variable">s:</span> generateLoaders(<span class="hljs-string">'sass'</span>, { indentedSyntax: true }),
    <span class="hljs-keyword">scs</span><span class="hljs-variable">s:</span> generateLoaders(<span class="hljs-string">'sass'</span>),
    stylu<span class="hljs-variable">s:</span> generateLoaders(<span class="hljs-string">'stylus'</span>),
    sty<span class="hljs-variable">l:</span> generateLoaders(<span class="hljs-string">'stylus'</span>)
  }
}
</code></pre>
<p>就是上述这段代码让vue-loader有了这种能力，它会根据不同的文件去使用不同的loader</p>
<h2 id="articleHeader5">2.4 使用scss</h2>
<p>这样你就可以愉快的使用scss了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped lang=&quot;sass&quot;>
      xxxx
      xxxx
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"sass"</span>&gt;</span><span class="undefined">
      xxxx
      xxxx
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue项目中使用scss

## 原文链接
[https://segmentfault.com/a/1190000009802725](https://segmentfault.com/a/1190000009802725)

