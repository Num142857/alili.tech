---
title: '假如测试说你的网站在iOS 10有问题' 
date: 2018-12-15 2:30:11
hidden: true
slug: pjgbxv8z9gm
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>这篇文章不那么有趣，只是解决了一个<code>bug</code>。但对我来讲，因为后面还要用<code>Vue</code>做很多项目，而且可以预见几乎每一个项目都会遇到这个问题，所以记录在案是有用的。</blockquote>
<h4>一个bug</h4>
<p>你用<code>Vue</code>做了一个单页面应用，它在一切设备上都工作正常，但是突然有一天，你的测试和你说，这个网站在<code>iOS 10</code>上跑不起来，怎么办？</p>
<p>于是你打开你电脑上的<code>Chrome</code>浏览器，工作正常；打开<code>Safari</code>浏览器，工作正常；打开<code>iOS 11</code>手机，工作正常；打开各种安卓手机，工作正常。但是在<code>iOS 10</code>的手机上，不论是微信浏览器，还是<code>Safari</code>浏览器，都只能看见一个白白的屏幕。</p>
<p>于是你把手机连上电脑，在电脑端的<code>Safari</code>里，看到了如下的错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SyntaxError: Cannot declare a let variable twice: 'e'." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">SyntaxError</span>: Cannot <span class="hljs-keyword">declare</span> a <span class="hljs-keyword">let</span> variable twice: <span class="hljs-string">'e'</span>.</code></pre>
<p>可是你没有写过这样的代码，你怎么可能把一个名为<code>e</code>的变量定义两次？你打开代码，看到了这样美丽的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let e = e => {
    console.log(e);
    for (let e of [1, 2, 3])
        console.log(e);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> e = <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(e);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> e <span class="hljs-keyword">of</span> [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>])
        <span class="hljs-built_in">console</span>.log(e);
};</code></pre>
<p>虽然这段代码看上去比较奇怪，但是语法上有任何问题吗？哥就愿意定义一个名为<code>e</code>的函数，而这个函数的唯一入参名称也为<code>e</code>，并且哥的<code>for</code>循环体里还愿意再定义一个名称为<code>e</code>的变量，<code>es6</code>的变量作用域允许我们这样做，此<code>e</code>和彼<code>e</code>互不干扰，不对吗？况且很显然，这段代码不是人写的，而是我们在执行<code>npm run build</code>的时候编译产生的。</p>
<p>其实我们都没有错，我们也没写错，<code>uglify</code>也没搞错，错的是<code>Safari</code>本身。他们在<a href="https://bugs.webkit.org/show_bug.cgi?id=171041" rel="nofollow noreferrer" target="_blank">第十七万一千零四十一号bug</a>中承认了自己的错误：</p>
<blockquote>We incorrectly throw a syntax error when declaring a top level for-loop iteration variable the same as a parameter<br>当你定义一个与参数同名的for循环迭代变量时，我们错误地认为这是一个语法错误。</blockquote>
<p>看，多么谦逊的态度。所以你也不用太纠结于一个白屏幕，只要找到解决方法就好了。方法其实很简单：</p>
<ol>
<li>进入<code>build</code>文件夹；</li>
<li>找到<code>webpack.prod.conf.js</code>文件；</li>
<li>在<code>UglifyPlugin</code>的定义里添加关于<code>mangle</code>的选项，使它变成下面这个样子：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        },
        mangle: {
          safari10: true
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    })," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>    <span class="hljs-string">new</span> <span class="hljs-string">UglifyJsPlugin({</span>
<span class="hljs-attr">      uglifyOptions:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        compress:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">          warnings:</span> <span class="hljs-literal">false</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        mangle:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">          safari10:</span> <span class="hljs-literal">true</span>
        <span class="hljs-string">}</span>
      <span class="hljs-string">},</span>
<span class="hljs-attr">      sourceMap:</span> <span class="hljs-string">config.build.productionSourceMap,</span>
<span class="hljs-attr">      parallel:</span> <span class="hljs-literal">true</span>
    <span class="hljs-string">}),</span></code></pre>
<p>然后这个世界就太平了。</p>
<p>为了避免所有这些不必要的麻烦，我给<code>vue-cli</code>提的一个<code>PR</code>已被接受，在工具里缺省加入了这个选项，这样大家以后就不会遇到这个问题了。</p>
<p>关于这个<code>bug</code>的问题描述在<a href="https://github.com/mishoo/UglifyJS2/issues/1753" rel="nofollow noreferrer" target="_blank">这里</a>，解决方案在<a href="https://github.com/mishoo/UglifyJS2/pull/1851" rel="nofollow noreferrer" target="_blank">这里</a>，给<code>vue-cli</code>提的<code>PR</code>在<a href="https://github.com/vuejs/vue-cli/pull/755" rel="nofollow noreferrer" target="_blank">这里</a>，供深挖细掘的人参考。</p>
<h4>另一个bug</h4>
<p>实际上，除此之外，还有另外一个<code>bug</code>也会影响到<code>vue</code>网页在<code>iOS 10</code>上的展现，特别是当你用到广为流传的<a href="https://github.com/nolimits4web/swiper" rel="nofollow noreferrer" target="_blank">Swiper</a>插件的时候。这是因为<code>Swiper</code>插件中用到了<code>ES6</code>的语法<code>a = b ** c</code>，<code>a</code>是<code>b</code>的<code>c</code>次方，而<code>iOS 10</code>的<code>Safari</code>里不认识这样的语法，认为这是一个错误，所以你需要让<code>Swiper</code>经过<code>babel</code>的包装，而缺省状态下<code>babel</code>是不对<code>node_modules</code>里的模块进行编译的。相关的<code>issue</code>见<a href="https://github.com/nolimits4web/swiper/issues/2263" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p>解决方法是在项目根目录下新建一个文件<code>vue.config.js</code>，在里面添加如下语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  chainWebpack: config => {
    config.rule('js').include.add(/node_modules\/(dom7|swiper)\/.*/)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">chainWebpack</span>: <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
    config.rule(<span class="hljs-string">'js'</span>).include.add(<span class="hljs-regexp">/node_modules\/(dom7|swiper)\/.*/</span>)
  }
}</code></pre>
<p>至止为止，通常情况下你的<code>vue</code>网页已经可以完美地在<code>iOS 10</code>上的<code>Safari</code>里展现了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
假如测试说你的网站在iOS 10有问题

## 原文链接
[https://segmentfault.com/a/1190000013075464](https://segmentfault.com/a/1190000013075464)

