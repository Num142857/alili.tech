---
title: '从零开始搭建vue-ssr系列之二：纯client端渲染以及webpack2+vue2注意事项' 
date: 2019-01-14 2:30:07
hidden: true
slug: r5gq8brmlt
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>要实现什么效果？</blockquote>
<ul>
<li>咱们就实现一个项目中常用并且简单的效果：通过Ajax从后端取数据，前端做展示，点列表的每一项，alert出这一项的标题</li>
<li>效果如下：</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVNuqX?w=1225&amp;h=560" src="https://static.alili.tech/img/bVNuqX?w=1225&amp;h=560" alt="&amp;gt; 为什么要说" title="&amp;gt; 为什么要说" style="cursor: pointer; display: inline;"></span>Client端的渲染？</p>
<ul><li>因为Client端的渲染是ssr渲染的一部分，这一块是必须要说的，同时，Client端的渲染在我做的时候，也有一些问题和一些坑，尤其是使用webpack2的时候，之前webpack1时代的东西大部分都不好使了，只能重新学，重新试，正好在这也分享给大家</li></ul>
<blockquote>项目目录树</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|____.gitignore
|____build
| |____client
| | |____css
| | | |____main.css
| | |____script
| | | |____main.js
| | | |____vendors.js
| |____index.html
|____package.json
|____postcss.config.js
|____readme.md
|____server.js
|____src
| |____component
| | |____List.vue
| |____index.js
|____tools
| |____dev.js
| |____webpack.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">____.gitignore
</span>|____build
|<span class="hljs-string"> </span>|____client
|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|____css
|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string">____main.css
</span>|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|____script
|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string">____main.js
</span>|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string">____vendors.js
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">____index.html
</span>|<span class="hljs-string">____package.json
</span>|<span class="hljs-string">____postcss.config.js
</span>|<span class="hljs-string">____readme.md
</span>|<span class="hljs-string">____server.js
</span>|____src
|<span class="hljs-string"> </span>|____component
|<span class="hljs-string"> </span>|<span class="hljs-string"> </span>|<span class="hljs-string">____List.vue
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">____index.js
</span>|____tools
|<span class="hljs-string"> </span>|<span class="hljs-string">____dev.js
</span>|<span class="hljs-string"> </span>|<span class="hljs-string">____webpack.js</span></code></pre>
<blockquote>各目录的用处</blockquote>
<ul>
<li>
<code>build</code>目录为webpack打包好的静态资源文件，css、js、image等</li>
<li>
<code>src</code>目录下存放源码</li>
<li>
<code>tools</code>目录下为编译相关的文件</li>
<li>
<code>package.json</code>文件为包依赖</li>
<li>
<code>postcss.config.js</code>这个<strong>文件很重要</strong>，vue-loader和这个文件，能解决css前缀问题（这里用的是webpack2的解决方案，目测为唯一的解决方案，webpack1有其他解决方案）。</li>
<li>
<code>server.js</code>为服务启动文件，用的是<code>express</code>
</li>
<li>使用的是webpack的nodeAPI进行打包，不是通过config文件打包</li>
</ul>
<blockquote>这个webpack打包能实现哪些功能？</blockquote>
<ul><li>可以把共用的js库打到一个单独的文件里，代码在这：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将vue等框架/库进行单独打包, 并输入到vendors.js文件当中
new webpack.optimize.CommonsChunkPlugin({
    names: ['vendors']
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 将vue等框架/库进行单独打包, 并输入到vendors.js文件当中</span>
new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.CommonsChunkPlugin</span>({
    names: [<span class="hljs-string">'vendors'</span>]
})</code></pre>
<ul><li>可以把.vue文件里面的style都打包到一个css文件中，代码在这：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new ExtractTextPlugin('css/[name].css')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">new</span> <span class="hljs-type">ExtractTextPlugin</span>(<span class="hljs-string">'css/[name].css'</span>)</code></pre>
<blockquote>有哪些坑？</blockquote>
<ul>
<li>
<code>alias</code>里面其他的可以不要，但是<code>vue</code>是必填，就是<code>'vue$': 'vue/dist/vue.common.js'</code>，要不然会报错，因为你<code>import vue</code>的时候，不写这个引用文件不是同一个，只有<code>vue2</code>里会出这个问题，<code>vue1</code>不会</li>
<li>
<code>webpack2</code>里面想把<code>.vue</code>文件的css抽取出来，只有一个<code>loader</code>是不好使的，这个我找了好久，<code>webpack.js</code>里面的方案好使</li>
<li>在<code>dev.js</code>里面，<code>webpack</code>的<code>nodeAPI</code>里面提供2个方法，一个<code>run</code>， 一个是<code>watch</code>，开发的时候用watch，要上线了得用run这个方法</li>
</ul>
<blockquote>怎么看效果？</blockquote>
<ul>
<li>
<code>cd vue-ssr-1</code>：切换到项目目录</li>
<li>
<code>yarn install</code>：安装所有依赖</li>
<li>
<code>npm start</code>：编译并自动打开浏览器查看效果</li>
</ul>
<blockquote><a href="https://github.com/sunhaikuo/vue-ssr-1" rel="nofollow noreferrer" target="_blank">Github源码请点我</a></blockquote>
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
从零开始搭建vue-ssr系列之二：纯client端渲染以及webpack2+vue2注意事项

## 原文链接
[https://segmentfault.com/a/1190000009372772](https://segmentfault.com/a/1190000009372772)

