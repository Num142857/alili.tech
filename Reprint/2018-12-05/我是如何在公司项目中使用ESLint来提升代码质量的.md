---
title: '我是如何在公司项目中使用ESLint来提升代码质量的' 
date: 2018-12-05 2:30:09
hidden: true
slug: cpwskp8szx4
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">ESLint：你认识我吗</h2>
<p><span class="img-wrap"><img data-src="/img/bV8Am6?w=2390&amp;h=654" src="https://static.alili.tech/img/bV8Am6?w=2390&amp;h=654" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>ESLint是一个语法规则和代码风格的检查工具。</p>
<p>和学习所有编程语言一样，想要入门ESLint，首先要去它的官网看看：<a href="https://eslint.org/" rel="nofollow noreferrer" target="_blank">https://eslint.org/</a>。</p>
<h2 id="articleHeader1">ESLint的版本问题</h2>
<p><span class="img-wrap"><img data-src="/img/bV8Am9?w=1226&amp;h=474" src="https://static.alili.tech/img/bV8Am9?w=1226&amp;h=474" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>目前ESLint的稳定版本是v4.19.1，如果你看过ESLint的官方文档，就会知道官网推出了ESLint v5.0.0-alpha.1，这是ESLint的一个主要版本升级。</p>
<p>由于这是预发布版本，ESLint尚未准备好用于生产，因此我们不会通过npm自动升级。next安装时必须指定标签：<code>$ npm i eslint@next --save-dev</code> ，这句命令从 npm 仓库安装了 ESLint CLI，如果想尝试下新功能的童鞋可以安装捣鼓一番。</p>
<h2 id="articleHeader2">为什么我们要在项目中使用ESLint</h2>
<p>ESLint可以校验我们写的代码，给代码定义一个规范，项目里的代码必须按照这个规范写。</p>
<p>加入ESLint有非常多的好处，比如说可以帮助我们避免一些非常低级的错误，一些格式上的问题导致我们在运行生产环境的时候出现一些不明所以的报错。还有就是在跟团队协作的时候，每个人都保持同一个风格进行代码书写，这样团队内部相互去看别人的代码的时候，就可以更容易的看懂。</p>
<h2 id="articleHeader3">ESLint实战小技巧全揭秘</h2>
<p>那么ESLint如何去使用呢？首先我们要去安装它：<code>$ npm install eslint</code> ，至于是本地安装还是全局安装，你们可以看项目需求。在这里，我们就不用官方提供的 eslint --init 来生成我们的配置文件了，后面我们会手动配置。规则也不用我们自己去指定，想看更多规则可以前往官网了解，这里只提供在公司项目中快速上手ESLint的技巧，以及在实战项目中碰到的问题的解决方案。</p>
<h2 id="articleHeader4">用别人的轮子开发自己的项目，省时省力</h2>
<p>第一个小技巧来了，现在网上有个叫eslint-config-standard的标准的ESLint规则，我们继承这个规则就可以了。这样的话我们项目里按照这个标准规则去开发代码就OK了。</p>
<p><span class="img-wrap"><img data-src="/img/bV8Ana?w=2866&amp;h=1662" src="https://static.alili.tech/img/bV8Ana?w=2866&amp;h=1662" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>首先我们要去安装ESLint所要用到的一大堆东西：</p>
<p><span class="img-wrap"><img data-src="/img/bV8Anb?w=1726&amp;h=684" src="https://static.alili.tech/img/bV8Anb?w=1726&amp;h=684" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">$ npm i eslint eslint-config-standard eslint-<span class="hljs-keyword">plugin</span>-standard eslint-<span class="hljs-keyword">plugin</span>-promise eslint-<span class="hljs-keyword">plugin</span>-import eslint-<span class="hljs-keyword">plugin</span>-node -<span class="hljs-built_in">D</span></code></pre>
<p>这些都是eslint-config-standard这个npm包里推荐我们去安装的，因为它的校验规则要依赖于这些plugins进行去验证。</p>
<p>然后，我们要去项目的根目录里面手动创建一个.eslintrc文件，然后在里面敲入以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;extends&quot;: &quot;standard&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"extends"</span>: <span class="hljs-string">"standard"</span>
}</code></pre>
<p>执行完以上步骤，我们就可以使用ESLint这个工具来校验项目里的代码。</p>
<p>在Vue项目里，.vue文件写的是类似于html的格式，不是标准的JavaScript文件，ESLint无法直接识别.vue文件里的JavaScript代码，那么这个时候我们需要去安装一个工具，<code>$ npm i eslint-plugin-html -D</code>，因为在vue文件里面写JavaScript代码也是写在script标签里面的，这个插件的作用就是识别一个文件里面script标签里面的JS代码，官方也是这么推荐的。所以我们要在.eslintrc文件里面新增这么一段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;extends&quot;: &quot;standard&quot;,
  &quot;plugins&quot;: [
    &quot;html&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"extends"</span>: <span class="hljs-string">"standard"</span>,
  <span class="hljs-attr">"plugins"</span>: [
    <span class="hljs-string">"html"</span>
  ]
}</code></pre>
<p>执行完以上步骤后，我们跳转到package.json文件里面的scripts里面新增一条命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;lint&quot;: &quot;eslint --ext .js --ext .jsx --ext .vue src/&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">"lint":</span> <span class="hljs-comment">"eslint</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">ext</span> <span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">ext</span> <span class="hljs-string">.</span><span class="hljs-comment">jsx</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">ext</span> <span class="hljs-string">.</span><span class="hljs-comment">vue</span> <span class="hljs-comment">src/"</span></code></pre>
<p>--ext后面需要写上指定检测文件的后缀，如.js、.jsx、 .vue等，紧接着后面要写上一个参数，这个参数就是我们要检测哪个目录下面的文件，一般项目文件都在src下面，所以在后面写上src/就好。</p>
<p>现在我们就可以到terminal里面输入 <code>$ npm run lint</code>，来检验项目里的代码是否符合ESLint的规则。</p>
<p>一般来说，我们项目在前期没有加入ESLint的时候，后期我们加入了之后跑一下，基本上都会出现非常的多报错，一执行检查就是满屏的error和warning，简直是丧心病狂不堪入目~</p>
<h2 id="articleHeader5">如何让ESLint自动修复报错，提高开发效率</h2>
<p><span class="img-wrap"><img data-src="/img/bV8Anc?w=2872&amp;h=1542" src="https://static.alili.tech/img/bV8Anc?w=2872&amp;h=1542" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在报这么多的错误之后，如果我们一条一条地去修复，就会变的非常的麻烦，相信刚接触ESLint的童鞋都深有体会。其实这些错误都可以让ESLint帮助我们自动地修复。</p>
<p>那么我们该怎么做呢？继续在package.json文件里面的scripts里面新增一条命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;lint-fix&quot;: &quot;eslint --fix --ext .js --ext .jsx --ext .vue src/&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">"lint</span><span class="hljs-literal">-</span><span class="hljs-comment">fix":</span> <span class="hljs-comment">"eslint</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">fix</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">ext</span> <span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">ext</span> <span class="hljs-string">.</span><span class="hljs-comment">jsx</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">ext</span> <span class="hljs-string">.</span><span class="hljs-comment">vue</span> <span class="hljs-comment">src/"</span></code></pre>
<p>只需要在ESLint后面加上一个参数--fix，它就会自动修复Lint出来的问题。当我们再去terminal里面跑一下：<code>$ npm run lint-fix</code> ，你会发现，世界一下安静了许多，没有那么多飘红的报错，没有满屏的error和warning。</p>
<p>当然，还有一种万能方法，就是在报错的JS文件中第一行写上 <code>/* eslint-disable */</code><br>，详情可见官网的User guide（用户指南）。</p>
<p><span class="img-wrap"><img data-src="/img/bV8Anf?w=2356&amp;h=1386" src="https://static.alili.tech/img/bV8Anf?w=2356&amp;h=1386" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>至此，曾经令人抓狂的ESLint报错此刻却温柔的像只小绵羊。</p>
<p>不过，你以为事情到这儿就结束了？NO，NO，NO，我们希望ESLint能够做的更多。</p>
<h2 id="articleHeader6">怎么在项目中预处理错误，eslint-loader来帮忙</h2>
<p>我希望在项目开发的过程当中，每次修改代码，它都能够自动进行ESLint的检查。因为在我们改代码的过程中去做一次检查，如果有错误，我们就能够很快地去定位到这个问题，由于是我们刚刚改过的，因此立马把它修复掉就OK了。这就避免了我们每次改了一大堆代码之后，要去提交的时候，再去跑一次ESLint，有可能有很多地方要去改，浪费我们的时间，因为你一下子就定位不到这个问题在哪里了。同时我们每次改代码的时候去检测，也能改善我们写代码的规范性，让我们慢慢养成规范写代码的习惯。</p>
<p><span class="img-wrap"><img data-src="/img/bV8Anf?w=2356&amp;h=1386" src="https://static.alili.tech/img/bV8Anf?w=2356&amp;h=1386" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个时候我们又要在terminal里面安装东西了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm i eslint-loader babel-eslint -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-selector-tag">i</span> eslint-loader babel-eslint -D</code></pre>
<p>执行完上述操作后，我们需要跳转到.eslintrc文件里面配置一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;extends&quot;: &quot;standard&quot;,
  &quot;plugins&quot;: [
    &quot;html&quot;
  ],
  &quot;parser&quot;: &quot;babel-eslint&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"extends"</span>: <span class="hljs-string">"standard"</span>,
  <span class="hljs-attr">"plugins"</span>: [
    <span class="hljs-string">"html"</span>
  ],
  <span class="hljs-attr">"parser"</span>: <span class="hljs-string">"babel-eslint"</span>
}</code></pre>
<p>为什么我们要配置parser呢？因为我们的项目是基于webpack的，项目里的代码都是需要经过babel去处理的。babel处理的这种语法可能对ESLint不是特别的支持，然后我们使用loader处理ESLint的时候就会出现一些问题。所以一般来说，我们用webpack和babel来进行开发的项目，都会指定它的parser使用babel-eslint。</p>
<p>执行完以上步骤之后，在build目录下找到我前几篇文章里讲到的webpack.config.base.js，然后在module下面的rules里面添加一个对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rules: [
  {
    test: /\.(vue|js|jsx)$/,
    loader: 'eslint-loader',
    exclude: /node_modules/,
    enforce: 'pre'
  },
  ......
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>rules: [
  {
    test: /\.(vue|js|jsx)$/,
    loader: <span class="hljs-string">'eslint-loader'</span>,
    exclude: /node_modules/,
    enforce: <span class="hljs-string">'pre'</span>
  },
  ......
]</code></pre>
<p>此时大家可能心里纳闷了，闰土啊你写的前面三个我们都能看懂，最后一个 <code>enforece: 'pre'</code> 这是什么鬼？</p>
<p>别急，且听我慢慢道来。因为.vue文件已经被vue-loader处理过了，而eslint-loader只是做代码检测，肯定不能让它去默认处理.vue文件。所以我们希望vue-loader在处理.vue文件之前，让eslint-loader先进行一次代码检测。如果代码检测都通过不了的话，那么vue-loader就不需要处理了，直接报错就OK了。所以需要加上 <code>enforece: 'pre'</code>，这叫预处理。</p>
<p>执行完上述步骤之后，我们就可以去terminal里面尽情地跑一下 <code>$ npm run dev</code> ，等运行成功后，我们可以在项目里找一个js文件，故意报个错保存一下，比如说多加个空格之类的，然后我们的terminal里面就会马上报错，此刻我猜想terminal的内心活动应该是：“TMD，写的什么烂代码，天天写bug气得我每次脸都涨的通红”~~~</p>
<p><span class="img-wrap"><img data-src="/img/bV8Ang?w=1514&amp;h=218" src="https://static.alili.tech/img/bV8Ang?w=1514&amp;h=218" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>幸运的是，机器是没有感情的，我们却可以嗨皮地立马定位到错误，然后把它改掉就可以了。至此，ESLint无师自通，真正做到了内心无惧。</p>
<h2 id="articleHeader7">写在最后</h2>
<p>这就是ESLint，辅助编码规范的执行，有效控制项目代码的质量。更多操作指南可以前往官网了解，这里只提供在公司项目中快速上手ESLint的技巧，以及在实战项目中碰到的问题的解决方案。</p>
<p>不积跬步无以至千里，不积小流无以成江海。希望每一位童鞋都可以在平凡的岗位上积累经验，沉淀技术，早日成为公司团队里的技术骨干！Good luck！</p>
<h3 id="articleHeader8">预告：更多关于前端工程工作流构建的文章，都会第一时间更新在我的公众号：闰土大叔，欢迎关注！</h3>
<p><span class="img-wrap"><img data-src="/img/bV8ufS?w=258&amp;h=258" src="https://static.alili.tech/img/bV8ufS?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我是如何在公司项目中使用ESLint来提升代码质量的

## 原文链接
[https://segmentfault.com/a/1190000014400437](https://segmentfault.com/a/1190000014400437)

