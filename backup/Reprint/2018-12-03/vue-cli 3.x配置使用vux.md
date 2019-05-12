---
title: 'vue-cli 3.x配置使用vux' 
date: 2018-12-03 2:30:08
hidden: true
slug: 6up31lj07bm
categories: [reprint]
---

{{< raw >}}

                    
<h2>在vue-cli3.x中配置使用VUX</h2>
<h2>写在前面</h2>
<p>正常按照下面给定的配置，因官方更新过vue/cli3.x更新过vue-loader，导致的加载错误。之前因端午在家，未仔细查看错误，也没有去调试而武断的认为是webpack的问题，希望没有给大家造成困扰。<a href="https://github.com/vuejs/vue-loader/releases" rel="nofollow noreferrer">vue-loader</a>的版本更新之后，vux-loader的依赖版本还是之前版本，因而导致的下面评论区出现的错误。大家可以手动指定vue-loader的版本来解决此加载问题。</p>
<pre><code>yarn add vue-loader@14.2.2 -D
or
npm install vue-loader@14.2.2 -D</code></pre>
<p>2018/6/25更新</p>
<hr>
<p>当时写此帖时，<a href="https://cli.vuejs.org/" rel="nofollow noreferrer">vue/cli3.x</a>所使用的<a href="https://webpack.js.org/" rel="nofollow noreferrer">webpack</a>版本和vux所使用的<a href="https://webpack.js.org/" rel="nofollow noreferrer">webpack</a>大版本一致，现今<a href="https://cli.vuejs.org/" rel="nofollow noreferrer">vue/cli3.x</a>所使用的<a href="https://webpack.js.org/" rel="nofollow noreferrer">webpack</a>为4.x，与vux不一致，因此一些loader可能会出错。而且当时vue/cli3.x的文档并没有，故此写这篇自记和帮助大家，现在vue/cli3.x已进入RC，相应文档也已放出，各位可以通过<a href="https://cli.vuejs.org/" rel="nofollow noreferrer">vue/cli</a>的文档来进行配置。</p>
<p>2018/6/18更新</p>
<hr>
<p><a href="https://github.com/airyland/vux" rel="nofollow noreferrer">vux</a>是基于WeUI和Vue(2.x)开发的移动端UI组件库，主要服务于微信页面(官方介绍)。<br>这些天闲来无事用<a href="https://developers.douban.com/wiki/?title=api_v2" rel="nofollow noreferrer">豆瓣开放的api</a>练习一下vue-cli3.x，但是对于一些组件的实现自己写的实在太粗糙和功能不全，故而想引用一些优秀的三方UI组件。<br><a href="https://github.com/airyland/vux" rel="nofollow noreferrer">vux</a>算是我知道的较早的一个基于vuejs的UI组件库吧。但是当时没有需求，所以一直没有使用这个组件库，直到最近又重新关注了一下。<br>对于我的第一印象，就是vux的一些集成度太高了，虽然极大地方便一些开发者，使用vux-loader来按需加载组件库。对于之前的我来说，倒是很乐意这样的一个组件库产生，但是对于现在喜欢折腾一些新东西，就显得并不是非常的友好了（特别是对于我这种文档看的不那么细致的人来说）。<br>vue-cli3.x的一些服务配置整个的结构都迁移到<a href="https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md" rel="nofollow noreferrer">CLI Service</a>里面了，对于一些基础配置和一些扩展配置提供了<a href="https://github.com/vuejs/vue-cli/blob/dev/docs/config.md" rel="nofollow noreferrer"><code>vue.config.js</code></a>。那么问题来了，对于这么一个入口，肯定不能直接按照<a href="https://doc.vux.li/zh-CN/vux-loader/install.html" rel="nofollow noreferrer">vux-loader</a>的方法直接在配置文件置空webpackConfig了。而单独组件引用的话又被告知使用错误（事实上都直接报错了，因为没有正确对于组件的load）。<br>参照vux-loader文档的配置说明，那么就是merge以下vux-loader的配置到webpackConfig里面呗，接下来就简单了。我们只需要在<code>vue.config.js</code>文件中的webpackConfig的配置中mergevux-loader就行了。</p>
<pre><code class="js">module.exports = {
    configureWebpack: config =&gt; {
        require('vux-loader').merge(config, {
            options: {},
            plugins: ['vux-ui']
        })
    }
}</code></pre>
<p>只要在<code>vue.config.js</code>配置中这样配置，那么你就可以正常的在你的项目中使用vux这个组件库了。</p>
<h2>题后说明</h2>
<p>本人文中所提到的仅代表本人个人使用感受，并不能说明事物实际属性，大家仅在乎配置相关即可。<br><code>vux</code>作为非大团队维护的UI组件库，是一款非常优秀的基于<code>vuejs</code>的UI组件库。对于移动端的一些组件可以说是最全（仅在我的认知内）的，而且还提供了一些常用而实用的lib，在<code>github</code>上的star数已经超过12k，可以说是非常受欢迎的了。<br>还有一点.......不要在意文笔，实在不会写文章，求轻喷。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli 3.x配置使用vux

## 原文链接
[https://segmentfault.com/a/1190000014586699](https://segmentfault.com/a/1190000014586699)

