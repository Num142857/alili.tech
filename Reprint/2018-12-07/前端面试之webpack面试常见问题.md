---
title: '前端面试之webpack面试常见问题' 
date: 2018-12-07 2:30:10
hidden: true
slug: 8ow8wfvxo46
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">概念问题一：什么是webpack和grunt和gulp有什么不同</h2>
<blockquote>答案：Webpack是一个模块打包器，他可以递归的打包项目中的所有模块，最终生成几个打包后的文件。他和其他的工具最大的不同在于他支持code-splitting、模块化(AMD，ESM，CommonJs)、全局分析。</blockquote>
<h2 id="articleHeader1">概念问题二：什么是bundle,什么是chunk，什么是module?</h2>
<blockquote>答案：bundle是由webpack打包出来的文件，chunk是指webpack在进行模块的依赖分析的时候，代码分割出来的代码块。module是开发中的单个模块。</blockquote>
<h2 id="articleHeader2">概念问题三：什么是Loader?什么是Plugin?</h2>
<blockquote>答案：<br>1）Loaders是用来告诉webpack如何转化处理某一类型的文件，并且引入到打包出的文件中<br>2）Plugin是用来自定义webpack打包过程的方式，一个插件是含有apply方法的一个对象，通过这个方法可以参与到整个webpack打包的各个流程(生命周期)。</blockquote>
<h2 id="articleHeader3">配置问题:如何可以自动生成webpack配置？</h2>
<blockquote>答案： webpack-cli /vue-cli /etc ...脚手架工具</blockquote>
<h2 id="articleHeader4">开发问题一：webpack-dev-server和http服务器如nginx有什么区别?</h2>
<blockquote>答案：webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，他比传统的http服务对开发更加简单高效。</blockquote>
<h2 id="articleHeader5">开发问题二:什么 是模块热更新？</h2>
<blockquote>答案:模块热更新是webpack的一个功能，他可以使得代码修改过后不用刷新浏览器就可以更新，是高级版的自动刷新浏览器。</blockquote>
<h2 id="articleHeader6">优化问题一：什么是长缓存？在webpack中如何做到长缓存优化？</h2>
<blockquote>答案：浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，但是每一次代码升级或是更新，都需要浏览器去下载新的代码，最方便和简单的更新方式就是引入新的文件名称。在webpack中可以在output纵输出的文件指定chunkhash,并且分离经常更新的代码和框架代码。通过NameModulesPlugin或是HashedModuleIdsPlugin使再次打包文件名不变。</blockquote>
<h2 id="articleHeader7">优化问题二：什么是Tree-shaking?CSS可以Tree-shaking吗</h2>
<blockquote>答案：Tree-shaking是指在打包中去除那些引入了，但是在代码中没有被用到的那些死代码。在webpack中Tree-shaking是通过uglifySPlugin来Tree-shaking<br>JS。Css需要使用Purify-CSS。</blockquote>
<blockquote><strong>愿你成为终身学习者</strong></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试之webpack面试常见问题

## 原文链接
[https://segmentfault.com/a/1190000014148611](https://segmentfault.com/a/1190000014148611)

