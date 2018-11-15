---
title: 关于Babel6你需要了解的六件事
reprint: true
categories: reprint
abbrlink: 2ef1009
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p>在过去的一年中，Babel已经成为将ES2015和JSX转变成枯燥的旧JavaScript的前沿工具。但是看起来在一夜之间，<em>Babel 6</em>改变了一切。 babel包被弃用，运行的babel实际上并没有将ES2015转换成ES5，而且旧的文档基本上已经<a href="https://github.com/babel/babel.github.io/tree/862b43db93e48762671267034a50c30c00e433e2">消失</a></p>
<p>但不要惊慌！为了让您迅速了解，我列出了六个最重要的变化的简要列表。如果你需要更多的帮助，我的<a href="http://jamesknelson.com/the-complete-guide-to-es6-with-babel-6/">ES6与Babel 6</a> 完全指南将会引导你完成实际的细节;包括CLI，Webpack，Mocha和Gulp。</p>
<ol>
<li><p><strong>babel npm软件包不再存在</strong>。相反，babel 别被分成多个包：</p>
<ul>
<li><a href="http://npmjs.com/package/babel-cli">babel-cli</a>, 其中包含babel命令行界面</li>
<li><a href="https://www.npmjs.com/package/babel-core">babel-core</a>, 其中包含Node API并需要hook</li>
<li><a href="https://www.npmjs.com/package/babel-polyfill">babel-polyfill</a>, 当需要时，您可以使用完整的ES2015-ish环境</li>
</ul>
</li>
</ol>
<p>为避免意外冲突，请确保从package.json中删除任何以前的Babel包，如babel，babel-core等，然后使用npm将其卸载。</p>
<ol>
<li><strong>现在每个转换都是一个插件，包括ES2015和JSX。</strong>这样的默认情况下不会发生任何事情 - 所以您需要安装正确的插件。实际上，ES2015包含大约_20_插件。你不想手动安装每一个，这就是Babel添加预设的原因。</li>
</ol>
<p>3.<strong> Babel 6添加了预设或插件集合。</strong>它为Babel 5中默认提供的功能提供了两个预设：</p>
<pre><code class="hljs applescript">```
  npm install babel-preset-es2015 babel-preset-react <span class="hljs-comment">--save-dev</span>

```

But even <span class="hljs-keyword">after</span> installing a preset, you need <span class="hljs-keyword">to</span> <span class="hljs-keyword">tell</span> Babel <span class="hljs-keyword">to</span> use <span class="hljs-keyword">it</span>.
</code></pre><ol>
<li><p><strong>.babelrc现在还不错。</strong>由于Babel默认不再使用ES2015和React转换，因此gulpfile.babel.js和<a href="https://mochajs.org/">mocha</a>使用的require hook实际上不会做任何事情。通过在您的项目目录中创建一个.babelrc来解决这个问题：</p>
<pre><code class="hljs json">{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"react"</span>]
}

</code></pre></li>
<li><p><strong>Stage 0 现在是一个单独的预设，而不是一个选项。</strong>以前，你可以通过设置--stage 0到babel来启用ES7特性，如装饰器和async/await 。现在，您安装并加载babel-preset-stage-0软件包就可以了。</p>
</li>
<li><p><strong>--external-helpers选项现在是一个插件。</strong>为避免重复包含Babel的辅助函数，现在需要安装并应用babel-plugin-transform-runtime软件包，然后在代码中需要babel-runtime软件包（是的，即使您使用的是polyfill ）。</p>
</li>
</ol>
<p>现在你已经拥有它了，你现在可以加速Babel 6的packages, plugins, 预设和选项！但是Webpack呢？通过CLI传递预设值怎么样？我试图尽可能简洁地列出这个列表，为此，我把我的<a href="http://jamesknelson.com/the-complete-guide-to-es6-with-babel-6/">完全指南与Babel 6一起保存为一个独立的系列</a> - 包括CLI，Webpack，Gulp和Mocha。</p>
<h2>阅读更多</h2>
<ul>
<li><a href="http://jamesknelson.com/the-complete-guide-to-es6-with-babel-6/">ES6与Babel的完整指南</a></li>
<li><a href="http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/">学习Raw React</a></li>
<li><a href="http://jamesknelson.com/webpack-made-simple-build-es6-less-with-autorefresh-in-26-lines/">
Webpack变得简单：使用Autorefresh构建ES6 / LESS</a></li>
</ul>
<h2>相关项目</h2>
<ul>
<li><a href="https://github.com/unicorn-standard/starter-kit">See Babel and Webpack in action in the Unicorn Standard Starter Kit</a></li>
</ul>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/the-six-things-you-need-to-know-about-babel-6](https://www.zcfy.cc/article/the-six-things-you-need-to-know-about-babel-6)
原文标题: 关于Babel6你需要了解的六件事
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
