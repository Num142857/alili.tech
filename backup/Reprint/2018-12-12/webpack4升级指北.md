---
title: 'webpack4升级指北' 
date: 2018-12-12 2:30:10
hidden: true
slug: c3wx67873h
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>最近发现还是有听过人看这篇文章，所以再来更新一下。首先现在webpack4已经稳定，各个插件和loader基本上直接装都可以版本匹配，比如<code>html-webpack-plugin</code>，如果有不匹配的看<code>peerDependencies</code>提醒，会提示你需要安装新的版本。还有就是<code>extract-text-webpack-plugin</code>作者好像不想维护了，现在可以用<code>mini-css-extract-plugin</code>，webpack5据说会集成css打包，就不需要插件了</strong></p>
<blockquote>2018年2月25日，刚过完年webpack就给了一个加班红包。webpack4经过1个月的缓冲期，终于发布了正式版，那么抛给广大开发者的问题又来了，我是不是要升级了呢？本文就站在一个之前用webpack3开发项目，现在打算升级到4的角度上，来讲一讲需要升级的内容。</blockquote>
<h1 id="articleHeader0">安装</h1>
<p>首先你要重新安装以下的依赖包：</p>
<ol>
<li>webpack4</li>
<li>webpack-cli（用来启动webpack）</li>
<li>html-webpack-plugin还没有更新，会出现<code>compilation.templatesPlugin is not a function</code>的错误，目前需要<code>npm i webpack-contrib/html-webpack-plugin -D</code>安装，官方说法是因为作者这段时间没空更新，所以他们自己fork了一份改了，现在先用这种方式用着，等作者有空了再合并进去。</li>
<li>其他各种配件升级，dev-server升级到3，各种loader你们自己看着办，如果是新装的应该是已经支持了的，如果在编译过程中报<code>can not find xxx</code>的错误，说明xxx对应的loader可能需要升级了，因为webpack4去掉了<code>this.options</code>的支持</li>
<li>看一下有没有peerDependencies的提醒，有的话升级以下插件。目前来说我剩下一个<code>ajv-keywords@3.1.0 requires a peer of ajv@^6.0.0 but none is installed. You must install peer dependencies yourself.</code>的莫名其妙提醒，暂时没什么影响，也没查到解决方法，所以先放着，你们如果重新安装包可能就没这个错了。</li>
</ol>
<p>以上这些就是安装包的工作，基本就差不多了。</p>
<h1 id="articleHeader1">配置</h1>
<h3 id="articleHeader2">mode</h3>
<p>webpack加了一个<code>mode</code>配置，只有两个值<code>development | production</code>，对不同的环境他会提供不同的一些默认配置，比如开发环境下面默认启用<code>optimization.namedModules</code>（原NamedModulesPlugin，现已弃用），而生产环境默认使用<code>optimization.noEmitOnErrors</code>（原NoEmitOnErrorsPlugin，现已弃用）。</p>
<p>不同模式下的默认配置如下：</p>
<ol>
<li>生产环境默认开启了很多代码优化（minify，splite等）</li>
<li>开发时开启注视和验证，并且自动加上了eval devtool</li>
<li>生产环境不支持watching，开发环境优化了重新打包的速度</li>
<li>生产环境开启模块串联（原ModuleConcatenationPlugin），没用过不多说</li>
<li>自动设置<code>process.env.NODE_ENV</code>到不同环境，也就是不需要<code>DefinePlugin</code>来做这个了</li>
<li>如果你给mode设置为<code>none</code>，所有默认配置都去掉了</li>
</ol>
<p>如果不加这个配置webpack会出现提醒，所以还是加上吧</p>
<h3 id="articleHeader3">CommonsChunkPlugin</h3>
<p>相信大家如果听说过webpack4的更新，最大的感触应该就是去除了CommonsChunkPlugin，毕竟官方<code>change log</code>写的篇幅最多的就是这个</p>
<p>CommonsChunkPlugin删除之后，改成使用<code>optimization.splitChunks</code>进行模块划分，详细文档<a href="https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693" rel="nofollow noreferrer" target="_blank">看这里</a><button class="btn btn-xs btn-default ml10 preview" data-url="sokra/1522d586b8e5c0f5072d7565c2bee693" data-typeid="1">点击预览</button></p>
<p>官方的说法是默认设置已经对大部分用户来说非常棒了，但是需要注意一个问题，默认配置只会对异步请求的模块进行提取拆分，如果要对entry进行拆分，需要设置<code>optimization.splitChunks.chunks = 'all'</code>。其他的内容大家就自己研究吧。</p>
<p>对应之前我们拆分runtime的情况，现在也有一个配置<code>optimization.runtimeChunk</code>，设置为true就会自动拆分runtime文件</p>
<h3 id="articleHeader4">UglifyJsPlugin</h3>
<p>现在也不需要使用这个plugin了，只需要使用<code>optimization.minimize</code>为true就行，production mode下面自动为true</p>
<p><code>optimization.minimizer</code>可以配置你自己的压缩程序</p>
<h3 id="articleHeader5">其他</h3>
<p>还有很多是我们平时使用不太到的升级，更多的是一些性能上的优化和功能上的升级，附上官方<a href="https://github.com/webpack/webpack/releases" rel="nofollow noreferrer" target="_blank">change log</a>，希望官方文档赶紧出来吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4升级指北

## 原文链接
[https://segmentfault.com/a/1190000013420383](https://segmentfault.com/a/1190000013420383)

